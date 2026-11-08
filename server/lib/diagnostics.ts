// Prerequisite detection engine.
// 1. Find prerequisites from the dependency graph (direct prereqs of a concept, or the external
//    prereqs of every concept in a chapter).
// 2. Build a 3–5 question diagnostic from the weakest prerequisites.
// 3. Grade it, record gaps, and recommend ONLY the missing prerequisite lessons.
import { all, get, run, tx, nowIso } from "../db.ts";
import { HttpError, questionRow, recordAttempt, toPublic, parseAnswer } from "./questions.ts";
import { isCorrect } from "./scoring.ts";
import { allProgress, recomputeConcept } from "./progress.ts";
import type { QResponse } from "../../shared/types.ts";

const DAY = 86_400_000;

export function prereqsOf(conceptId: string): string[] {
  return all<{ prereq_id: string }>("SELECT prereq_id FROM concept_prereqs WHERE concept_id = ?", conceptId).map((r) => r.prereq_id);
}

function chapterExternalPrereqs(chapterId: string): string[] {
  const inChapter = new Set(all<{ id: string }>(
    "SELECT c.id FROM concepts c JOIN topics t ON t.id = c.topic_id WHERE t.chapter_id = ?", chapterId).map((r) => r.id));
  const out = new Set<string>();
  for (const id of inChapter) for (const p of prereqsOf(id)) if (!inChapter.has(p)) out.add(p);
  return [...out];
}

function conceptName(id: string) {
  return get<{ name: string }>("SELECT name FROM concepts WHERE id = ?", id)?.name ?? id;
}

/** Was this prerequisite answered correctly in a diagnostic in the last 30 days? */
function recentlyVerified(prereqId: string): boolean {
  const since = new Date(Date.now() - 30 * DAY).toISOString();
  const r = get<{ ok: number; n: number }>(
    `SELECT SUM(di.correct) AS ok, COUNT(*) AS n FROM diagnostic_items di JOIN diagnostics d ON d.id = di.diagnostic_id
     WHERE di.prereq_id = ? AND d.status = 'completed' AND d.completed_at >= ?`, prereqId, since);
  return !!r && r.n > 0 && r.ok / r.n >= 0.5;
}

export function prereqCheck(targetId: string, scope: "concept" | "chapter" = "concept") {
  const ids = scope === "concept" ? prereqsOf(targetId) : chapterExternalPrereqs(targetId);
  const prog = allProgress();
  const openGaps = new Set(all<{ concept_id: string }>(
    "SELECT concept_id FROM prereq_gaps WHERE resolved_at IS NULL").map((r) => r.concept_id));
  const prereqs = ids.map((id) => {
    const p = prog.get(id);
    const qn = get<{ n: number }>("SELECT COUNT(*) AS n FROM questions WHERE concept_id = ? AND active = 1", id)!.n;
    const verified = recentlyVerified(id);
    const strong = p?.status === "mastered" || (p?.score ?? 0) >= 70 || verified;
    return {
      id, name: conceptName(id), status: p?.status ?? "not_started", score: p?.score ?? 0,
      questionCount: qn, recentlyVerified: verified, strong, gap: openGaps.has(id),
    };
  });
  const lastDiag = get<{ id: number; status: string; created_at: string; completed_at: string | null; score: number | null }>(
    "SELECT id, status, created_at, completed_at, score FROM diagnostics WHERE target_id = ? ORDER BY id DESC LIMIT 1", targetId);
  const recentlyHandled = lastDiag && (lastDiag.status === "completed" || lastDiag.status === "skipped") &&
    Date.now() - new Date(lastDiag.created_at).getTime() < 14 * DAY;
  const weak = prereqs.filter((p) => !p.strong);
  return {
    targetId, scope, prereqs,
    recommended: weak.length > 0 && !recentlyHandled,
    assessable: weak.filter((p) => p.questionCount > 0).length,
    openGaps: prereqs.filter((p) => p.gap),
    lastDiagnostic: lastDiag ?? null,
  };
}

export function createDiagnostic(targetId: string, scope: "concept" | "chapter") {
  const check = prereqCheck(targetId, scope);
  // Weakest first; prefer prerequisites not yet verified.
  const candidates = check.prereqs.filter((p) => p.questionCount > 0)
    .sort((a, b) => Number(a.strong) - Number(b.strong) || a.score - b.score);
  if (!candidates.length) throw new HttpError(409, "No diagnostic questions are available for these prerequisites yet.");

  const chosen: { questionId: string; prereqId: string }[] = [];
  const used = new Set<string>();
  const pickFor = (prereqId: string) => {
    const qs = all<{ id: string; diagnostic: number; difficulty: number; seen: number }>(
      `SELECT q.id, q.diagnostic, q.difficulty, (SELECT COUNT(*) FROM attempts a WHERE a.question_id = q.id) AS seen
       FROM questions q WHERE q.concept_id = ? AND q.active = 1`, prereqId)
      .filter((q) => !used.has(q.id))
      .sort((a, b) => (b.diagnostic - a.diagnostic) || (a.seen - b.seen) || (a.difficulty - b.difficulty) || (Math.random() - 0.5));
    if (!qs.length) return false;
    used.add(qs[0].id);
    chosen.push({ questionId: qs[0].id, prereqId });
    return true;
  };
  for (const p of candidates.slice(0, 5)) pickFor(p.id);
  // Reach at least 3 questions when there are only one or two prerequisites.
  let guard = 0;
  while (chosen.length < 3 && guard++ < 10) {
    let added = false;
    for (const p of candidates) { if (chosen.length >= 3) break; if (pickFor(p.id)) added = true; }
    if (!added) break;
  }

  const id = tx(() => {
    const d = run("INSERT INTO diagnostics(target_id, scope, status, created_at) VALUES(?,?,?,?)", targetId, scope, "in_progress", nowIso());
    chosen.forEach((c, i) => run("INSERT INTO diagnostic_items(diagnostic_id, idx, question_id, prereq_id) VALUES(?,?,?,?)",
      d.lastId, i, c.questionId, c.prereqId));
    return d.lastId;
  });
  return getDiagnostic(id);
}

export function getDiagnostic(id: number) {
  const d = get<{ id: number; target_id: string; scope: string; status: string; result: string | null }>(
    "SELECT * FROM diagnostics WHERE id = ?", id);
  if (!d) throw new HttpError(404, "Diagnostic not found");
  const items = all<{ idx: number; question_id: string; prereq_id: string }>(
    "SELECT idx, question_id, prereq_id FROM diagnostic_items WHERE diagnostic_id = ? ORDER BY idx", id);
  const done = d.status === "completed";
  return {
    id: d.id, targetId: d.target_id, targetName: d.scope === "concept" ? conceptName(d.target_id) :
      get<{ name: string }>("SELECT name FROM chapters WHERE id = ?", d.target_id)?.name ?? d.target_id,
    scope: d.scope, status: d.status,
    items: items.map((it) => ({ idx: it.idx, prereqId: it.prereq_id, prereqName: conceptName(it.prereq_id),
      question: toPublic(questionRow(it.question_id)!, done) })),
    result: d.result ? JSON.parse(d.result) : null,
  };
}

export function submitDiagnostic(id: number, responses: Record<number, QResponse>, timeMs: Record<number, number> = {}) {
  const d = get<{ id: number; target_id: string; status: string }>("SELECT * FROM diagnostics WHERE id = ?", id);
  if (!d) throw new HttpError(404, "Diagnostic not found");
  if (d.status !== "in_progress") throw new HttpError(409, "Diagnostic already finished");
  const items = all<{ idx: number; question_id: string; prereq_id: string }>(
    "SELECT idx, question_id, prereq_id FROM diagnostic_items WHERE diagnostic_id = ? ORDER BY idx", id);

  const perPrereq = new Map<string, { ok: number; n: number }>();
  const touched = new Set<string>();
  tx(() => {
    for (const it of items) {
      const r = responses[it.idx] ?? {};
      const q = questionRow(it.question_id)!;
      const ok = isCorrect(parseAnswer(q), r);
      run("UPDATE diagnostic_items SET response = ?, correct = ? WHERE diagnostic_id = ? AND idx = ?", r, ok, id, it.idx);
      recordAttempt({ questionId: q.id, response: r, mode: "diagnostic", timeMs: timeMs[it.idx], refId: `diag:${id}`, recompute: false });
      touched.add(q.concept_id);
      const s = perPrereq.get(it.prereq_id) ?? { ok: 0, n: 0 };
      s.n++; if (ok) s.ok++;
      perPrereq.set(it.prereq_id, s);
    }
  });
  for (const c of touched) recomputeConcept(c);

  const now = nowIso();
  const gaps: string[] = [], solid: string[] = [];
  for (const [pid, s] of perPrereq) (s.ok / s.n >= 0.5 ? solid : gaps).push(pid);
  const prog = allProgress();
  const recommendations = gaps.map((g) => ({
    conceptId: g, conceptName: conceptName(g),
    // If the gap itself rests on weak foundations, point one level further down.
    deeper: prereqsOf(g).filter((p) => (prog.get(p)?.score ?? 0) < 60 && prog.get(p)?.status !== "mastered")
      .map((p) => ({ conceptId: p, conceptName: conceptName(p) })),
  }));
  const total = items.length, correct = [...perPrereq.values()].reduce((a, s) => a + s.ok, 0);
  const result = {
    score: total ? correct / total : 0, correct, total,
    gaps: gaps.map((g) => ({ conceptId: g, conceptName: conceptName(g) })),
    solid: solid.map((s) => ({ conceptId: s, conceptName: conceptName(s) })),
    recommendations,
    ready: gaps.length === 0,
  };
  tx(() => {
    for (const g of gaps) run(`INSERT INTO prereq_gaps(concept_id, for_concept_id, diagnostic_id, detected_at) VALUES(?,?,?,?)
       ON CONFLICT(concept_id, for_concept_id) DO UPDATE SET diagnostic_id = excluded.diagnostic_id, detected_at = excluded.detected_at, resolved_at = NULL`,
      g, d.target_id, id, now);
    for (const s of solid) run("UPDATE prereq_gaps SET resolved_at = ? WHERE concept_id = ? AND resolved_at IS NULL", now, s);
    run("UPDATE diagnostics SET status = 'completed', score = ?, result = ?, completed_at = ? WHERE id = ?", result.score, result, now, id);
  });
  return getDiagnostic(id);
}

export function skipDiagnostic(targetId: string, scope: "concept" | "chapter") {
  const now = nowIso();
  run("INSERT INTO diagnostics(target_id, scope, status, created_at, completed_at, result) VALUES(?,?,?,?,?,?)",
    targetId, scope, "skipped", now, now, { skipped: true });
  return { ok: true };
}

export function diagnosticHistory(limit = 30) {
  return all<{ id: number; target_id: string; scope: string; status: string; score: number | null; created_at: string }>(
    "SELECT id, target_id, scope, status, score, created_at FROM diagnostics ORDER BY id DESC LIMIT ?", limit)
    .map((d) => ({ ...d, target_name: d.scope === "concept" ? conceptName(d.target_id) :
      get<{ name: string }>("SELECT name FROM chapters WHERE id = ?", d.target_id)?.name ?? d.target_id }));
}
