// Exam mode: GATE-style tests (topic / subject / mixed / full-length), marking and reports.
import { all, get, run, tx, nowIso } from "../db.ts";
import { HttpError, questionRow, toPublic, parseAnswer, recordAttempt, type QuestionRow } from "./questions.ts";
import { isAnswered, isCorrect, gateMarks, negativeMarks, round2 } from "./scoring.ts";
import { recomputeConcept } from "./progress.ts";
import { applyReview } from "./srs.ts";
import type { QResponse, TestKind } from "../../shared/types.ts";

export interface TestConfig {
  kind: TestKind;
  title?: string;
  conceptIds?: string[];
  subjectIds?: string[];
  count?: number;
  durationMin?: number;
  source?: "all" | "official" | "generated";
}

const GRACE_MS = 10_000;

interface PoolQ extends QuestionRow { subject_id: string; subject_name: string; subject_ord: number; seen: number }

function pool(where: string, params: unknown[], source: TestConfig["source"]): PoolQ[] {
  const srcClause = source === "official" ? " AND q.source = 'official-pyq'" : source === "generated" ? " AND q.source <> 'official-pyq'" : "";
  return all<PoolQ>(
    `SELECT q.*, s.id AS subject_id, s.name AS subject_name, s.ord AS subject_ord,
       (SELECT COUNT(*) FROM attempts a WHERE a.question_id = q.id) AS seen
     FROM questions q JOIN concepts c ON c.id = q.concept_id JOIN topics t ON t.id = c.topic_id
     JOIN chapters ch ON ch.id = t.chapter_id JOIN subjects s ON s.id = ch.subject_id
     WHERE q.active = 1 AND ${where}${srcClause}`, ...params);
}

/** Prefer questions never attempted, then least attempted; random within ties. */
function pickFrom(list: PoolQ[], n: number, taken: Set<string>): PoolQ[] {
  const out = list.filter((q) => !taken.has(q.id))
    .map((q) => ({ q, k: q.seen + Math.random() * 0.9 }))
    .sort((a, b) => a.k - b.k).slice(0, n).map((x) => x.q);
  out.forEach((q) => taken.add(q.id));
  return out;
}

/** Pick n questions aiming for a ratio of 1-mark to 2-mark questions. */
function pickByMarks(list: PoolQ[], n: number, oneMarkShare: number, taken: Set<string>): PoolQ[] {
  const n1 = Math.round(n * oneMarkShare);
  const a = pickFrom(list.filter((q) => q.marks === 1), n1, taken);
  const b = pickFrom(list.filter((q) => q.marks === 2), n - a.length, taken);
  const rest = n - a.length - b.length;
  return [...a, ...b, ...(rest > 0 ? pickFrom(list, rest, taken) : [])];
}

export function createTest(cfg: TestConfig) {
  const source = cfg.source ?? "all";
  const taken = new Set<string>();
  const warnings: string[] = [];
  let items: { q: PoolQ; section: string }[] = [];
  let title = cfg.title?.trim() || "";
  let durationSec: number;

  if (cfg.kind === "full") {
    const subjects = all<{ id: string; name: string; exam_weight: number }>("SELECT id, name, exam_weight FROM subjects ORDER BY ord");
    const ga = pool("s.id = 'ga'", [], source);
    const gaPick = pickByMarks(ga, 10, 0.5, taken);
    if (gaPick.length < 10) warnings.push(`Only ${gaPick.length}/10 General Aptitude questions available.`);
    items.push(...gaPick.map((q) => ({ q, section: "General Aptitude" })));
    const tech = subjects.filter((s) => s.id !== "ga");
    const totalW = tech.reduce((a, s) => a + s.exam_weight, 0);
    // Largest-remainder apportionment by subject weight, done separately for 1-mark and 2-mark
    // questions, so the technical section has exactly 25 × 1 mark + 30 × 2 marks = 85 marks.
    const apportion = (total: number) => {
      const raw = tech.map((s) => (total * s.exam_weight) / totalW);
      const base = raw.map(Math.floor);
      let left = total - base.reduce((a, b) => a + b, 0);
      raw.map((r, i) => ({ i, f: r - base[i] })).sort((a, b) => b.f - a.f)
        .forEach(({ i }) => { if (left > 0) { base[i]++; left--; } });
      return base;
    };
    const quota1 = apportion(25), quota2 = apportion(30);
    const techPicks: PoolQ[] = [];
    tech.forEach((s, i) => {
      const list = pool("s.id = ?", [s.id], source);
      techPicks.push(...pickFrom(list.filter((q) => q.marks === 1), quota1[i], taken));
      techPicks.push(...pickFrom(list.filter((q) => q.marks === 2), quota2[i], taken));
    });
    // Fill any per-subject shortfall from the whole technical pool, keeping the marks split.
    const allTech = pool("s.id <> 'ga'", [], source);
    const have1 = techPicks.filter((q) => q.marks === 1).length;
    const have2 = techPicks.length - have1;
    if (have1 < 25) techPicks.push(...pickFrom(allTech.filter((q) => q.marks === 1), 25 - have1, taken));
    if (have2 < 30) techPicks.push(...pickFrom(allTech.filter((q) => q.marks === 2), 30 - have2, taken));
    if (techPicks.length < 55) techPicks.push(...pickFrom(allTech, 55 - techPicks.length, taken));
    const techFinal = techPicks.slice(0, 55).sort((a, b) => a.subject_ord - b.subject_ord);
    if (techFinal.length < 55) warnings.push(`Only ${techFinal.length}/55 technical questions available — add questions (AI generation or import) for a true full-length paper.`);
    const totalMarks = [...gaPick, ...techFinal].reduce((a, q) => a + q.marks, 0);
    if (techFinal.length === 55 && gaPick.length === 10 && totalMarks !== 100)
      warnings.push(`This paper totals ${totalMarks} marks (not enough 1- or 2-mark questions to match GATE's 100-mark split exactly).`);
    items.push(...techFinal.map((q) => ({ q, section: "Technical" })));
    durationSec = 180 * 60;
    title ||= "Full-length GATE EC simulation";
  } else {
    let list: PoolQ[];
    if (cfg.kind === "topic") {
      if (!cfg.conceptIds?.length) throw new HttpError(400, "Choose at least one concept for a topic test.");
      list = pool(`q.concept_id IN (${cfg.conceptIds.map(() => "?").join(",")})`, cfg.conceptIds, source);
    } else {
      if (!cfg.subjectIds?.length) throw new HttpError(400, "Choose at least one subject.");
      list = pool(`s.id IN (${cfg.subjectIds.map(() => "?").join(",")})`, cfg.subjectIds, source);
    }
    const count = Math.max(1, Math.min(cfg.count ?? 10, 100));
    let picked: PoolQ[];
    if (cfg.kind === "mixed" && cfg.subjectIds!.length > 1) {
      // Spread questions evenly across the chosen subjects.
      picked = [];
      const per = Math.ceil(count / cfg.subjectIds!.length);
      for (const sid of cfg.subjectIds!) picked.push(...pickFrom(list.filter((q) => q.subject_id === sid), per, taken));
      if (picked.length < count) picked.push(...pickFrom(list, count - picked.length, taken));
      picked = picked.slice(0, count).sort((a, b) => a.subject_ord - b.subject_ord);
    } else picked = pickFrom(list, count, taken);
    if (!picked.length) throw new HttpError(409, "No questions match this selection yet. Generate questions with AI or import a question bank.");
    if (picked.length < count) warnings.push(`Only ${picked.length} matching questions available (requested ${count}).`);
    items = picked.map((q) => ({ q, section: cfg.kind === "topic" ? "Questions" : q.subject_name }));
    const marks = picked.reduce((a, q) => a + q.marks, 0);
    durationSec = Math.round((cfg.durationMin ?? Math.max(5, Math.round(marks * 1.8))) * 60);
    if (!title) {
      if (cfg.kind === "topic") {
        const names = all<{ name: string }>(`SELECT name FROM concepts WHERE id IN (${cfg.conceptIds!.map(() => "?").join(",")})`, ...cfg.conceptIds!);
        title = names.length === 1 ? `Topic test: ${names[0].name}` : `Topic test (${names.length} concepts)`;
      } else {
        const names = all<{ name: string }>(`SELECT name FROM subjects WHERE id IN (${cfg.subjectIds!.map(() => "?").join(",")})`, ...cfg.subjectIds!);
        title = cfg.kind === "subject" && names.length === 1 ? `Subject test: ${names[0].name}` : `Mixed test: ${names.map((n) => n.name).join(", ")}`;
      }
    }
  }

  const id = tx(() => {
    const t = run("INSERT INTO tests(title, kind, config, duration_sec, status, created_at) VALUES(?,?,?,?,?,?)",
      title, cfg.kind, { ...cfg, warnings }, durationSec, "ready", nowIso());
    items.forEach((it, i) => run(
      "INSERT INTO test_items(test_id, idx, question_id, section, marks, negative) VALUES(?,?,?,?,?,?)",
      t.lastId, i, it.q.id, it.section, it.q.marks, negativeMarks(it.q.type, it.q.marks)));
    return t.lastId;
  });
  return { id, warnings };
}

interface TestRow {
  id: number; title: string; kind: TestKind; config: string; duration_sec: number; status: string;
  created_at: string; started_at: string | null; submitted_at: string | null; auto_submitted: number;
  score: number | null; max_score: number | null; report: string | null;
}

function testRow(id: number) {
  const t = get<TestRow>("SELECT * FROM tests WHERE id = ?", id);
  if (!t) throw new HttpError(404, "Test not found");
  return t;
}
function deadlineOf(t: TestRow) { return t.started_at ? new Date(t.started_at).getTime() + t.duration_sec * 1000 : null; }

/** Auto-submits tests whose time ran out (e.g. the browser was closed mid-exam). */
export function sweepExpiredTests() {
  for (const t of all<TestRow>("SELECT * FROM tests WHERE status = 'in_progress'")) {
    const dl = deadlineOf(t);
    if (dl && Date.now() > dl + GRACE_MS) submitTest(t.id, true);
  }
}

export function activeTest(): { id: number; title: string } | null {
  sweepExpiredTests();
  return get<{ id: number; title: string }>("SELECT id, title FROM tests WHERE status = 'in_progress' ORDER BY id DESC LIMIT 1") ?? null;
}

export function startTest(id: number) {
  const t = testRow(id);
  if (t.status === "ready") {
    const other = activeTest();
    if (other && other.id !== id) throw new HttpError(409, `Finish or submit "${other.title}" first.`);
    run("UPDATE tests SET status = 'in_progress', started_at = ? WHERE id = ?", nowIso(), id);
  }
  return takeView(id);
}

export function takeView(id: number) {
  let t = testRow(id);
  const dl = deadlineOf(t);
  if (t.status === "in_progress" && dl && Date.now() > dl + GRACE_MS) { submitTest(id, true); t = testRow(id); }
  const items = all<{ idx: number; question_id: string; section: string; marks: number; negative: number; response: string | null; state: string; time_ms: number }>(
    "SELECT idx, question_id, section, marks, negative, response, state, time_ms FROM test_items WHERE test_id = ? ORDER BY idx", id);
  return {
    id: t.id, title: t.title, kind: t.kind, status: t.status, durationSec: t.duration_sec,
    startedAt: t.started_at, deadline: deadlineOf(t), serverNow: Date.now(),
    config: JSON.parse(t.config),
    sections: [...new Set(items.map((i) => i.section))],
    items: items.map((i) => ({
      idx: i.idx, section: i.section, marks: i.marks, negative: i.negative, state: i.state, timeMs: i.time_ms,
      response: i.response ? JSON.parse(i.response) : null,
      question: toPublic(questionRow(i.question_id)!, false),
    })),
  };
}

export function saveState(id: number, updates: { idx: number; response?: QResponse | null; state?: string; timeMs?: number }[]) {
  const t = testRow(id);
  if (t.status !== "in_progress") throw new HttpError(409, "This test is not in progress.");
  const dl = deadlineOf(t)!;
  if (Date.now() > dl + GRACE_MS) { submitTest(id, true); throw new HttpError(409, "Time is up — the test was submitted automatically."); }
  const states = new Set(["not_visited", "not_answered", "answered", "marked", "answered_marked"]);
  tx(() => {
    for (const u of updates) {
      if (u.state && !states.has(u.state)) continue;
      run(`UPDATE test_items SET response = COALESCE(?, response), state = COALESCE(?, state),
           time_ms = MAX(time_ms, COALESCE(?, 0)) WHERE test_id = ? AND idx = ?`,
        u.response === undefined ? null : u.response, u.state ?? null, u.timeMs ?? null, id, u.idx);
      if (u.response === null) run("UPDATE test_items SET response = NULL WHERE test_id = ? AND idx = ?", id, u.idx);
    }
  });
  return { ok: true, serverNow: Date.now(), deadline: dl };
}

export function submitTest(id: number, auto = false) {
  const t = testRow(id);
  if (t.status === "submitted") return reportView(id);
  if (t.status === "ready") throw new HttpError(409, "Test has not started.");
  const items = all<{ idx: number; question_id: string; section: string; marks: number; negative: number; response: string | null; state: string; time_ms: number }>(
    "SELECT * FROM test_items WHERE test_id = ? ORDER BY idx", id);

  const concepts = new Map<string, { ok: number; n: number }>();
  let score = 0, max = 0;
  tx(() => {
    for (const it of items) {
      const q = questionRow(it.question_id)!;
      const resp: QResponse | null = it.response ? JSON.parse(it.response) : null;
      const answered = isAnswered(q.type, resp);
      const g = parseAnswer(q);
      const ok = answered && isCorrect(g, resp);
      const awarded = gateMarks({ ...g, marks: it.marks }, resp);
      score += awarded; max += it.marks;
      run("UPDATE test_items SET correct = ?, awarded = ? WHERE test_id = ? AND idx = ?", answered ? ok : null, awarded, id, it.idx);
      if (answered) {
        recordAttempt({ questionId: q.id, response: resp!, mode: "exam", timeMs: it.time_ms, refId: `test:${id}`, recompute: false });
        const c = concepts.get(q.concept_id) ?? { ok: 0, n: 0 };
        c.n++; if (ok) c.ok++;
        concepts.set(q.concept_id, c);
      }
    }
    run("UPDATE tests SET status = 'submitted', submitted_at = ?, auto_submitted = ?, score = ?, max_score = ? WHERE id = ?",
      nowIso(), auto, round2(score), max, id);
  });
  for (const [cid, c] of concepts) { recomputeConcept(cid); applyReview(cid, c.ok / c.n); }
  const report = buildReport(id);
  run("UPDATE tests SET report = ? WHERE id = ?", report, id);
  return reportView(id);
}

function buildReport(id: number) {
  const t = testRow(id);
  const items = all<{ idx: number; question_id: string; section: string; marks: number; negative: number; response: string | null;
    state: string; time_ms: number; correct: number | null; awarded: number; type: string; concept_id: string; concept_name: string;
    subject_id: string; subject_name: string; source: string }>(
    `SELECT ti.*, q.type, q.concept_id, q.source, c.name AS concept_name, s.id AS subject_id, s.name AS subject_name
     FROM test_items ti JOIN questions q ON q.id = ti.question_id JOIN concepts c ON c.id = q.concept_id
     JOIN topics tp ON tp.id = c.topic_id JOIN chapters ch ON ch.id = tp.chapter_id JOIN subjects s ON s.id = ch.subject_id
     WHERE ti.test_id = ? ORDER BY ti.idx`, id);

  const attempted = items.filter((i) => i.correct !== null);
  const correct = attempted.filter((i) => i.correct === 1);
  const incorrect = attempted.filter((i) => i.correct === 0);
  const totalMs = items.reduce((a, i) => a + i.time_ms, 0);
  const avgMs = attempted.length ? attempted.reduce((a, i) => a + i.time_ms, 0) / attempted.length : 0;

  const group = <K extends string>(key: (i: typeof items[number]) => K) => {
    const m = new Map<K, typeof items>();
    for (const i of items) { const k = key(i); if (!m.has(k)) m.set(k, []); m.get(k)!.push(i); }
    return m;
  };
  const summarize = (list: typeof items) => {
    const att = list.filter((i) => i.correct !== null);
    const ok = att.filter((i) => i.correct === 1).length;
    return {
      total: list.length, attempted: att.length, correct: ok, incorrect: att.length - ok, unattempted: list.length - att.length,
      score: round2(list.reduce((a, i) => a + i.awarded, 0)), max: list.reduce((a, i) => a + i.marks, 0),
      accuracy: att.length ? ok / att.length : null, timeMs: list.reduce((a, i) => a + i.time_ms, 0),
    };
  };

  const bySubject = [...group((i) => i.subject_id)].map(([sid, list]) => ({ subjectId: sid, name: list[0].subject_name, ...summarize(list) }));
  const bySection = [...group((i) => i.section)].map(([section, list]) => ({ section, ...summarize(list) }));
  const byType = [...group((i) => i.type)].map(([type, list]) => ({ type, ...summarize(list) }));
  const bySource = [...group((i) => i.source)].map(([source, list]) => ({ source, ...summarize(list) }));
  const weakConcepts = [...group((i) => i.concept_id)]
    .map(([cid, list]) => ({ conceptId: cid, name: list[0].concept_name, subjectName: list[0].subject_name, ...summarize(list) }))
    .filter((c) => c.incorrect > 0 || c.unattempted > 0)
    .sort((a, b) => (b.incorrect * 2 + b.unattempted) - (a.incorrect * 2 + a.unattempted));
  const recommendations = weakConcepts.slice(0, 8).map((c) => ({
    conceptId: c.conceptId, name: c.name, subjectName: c.subjectName,
    reason: c.incorrect > 0 ? `${c.incorrect} incorrect of ${c.total}` : `${c.unattempted} left unattempted`,
  }));

  return {
    score: round2(t.score ?? 0), maxScore: t.max_score ?? 0,
    percentage: t.max_score ? round2(((t.score ?? 0) / t.max_score) * 100) : 0,
    counts: { total: items.length, attempted: attempted.length, correct: correct.length, incorrect: incorrect.length,
      unattempted: items.length - attempted.length, markedForReview: items.filter((i) => i.state === "marked" || i.state === "answered_marked").length },
    accuracy: attempted.length ? correct.length / attempted.length : 0,
    positiveMarks: round2(correct.reduce((a, i) => a + i.awarded, 0)),
    negativeMarks: round2(-incorrect.reduce((a, i) => a + Math.min(0, i.awarded), 0)),
    time: { totalMs, avgMsPerAttempted: Math.round(avgMs), perQuestion: items.map((i) => ({ idx: i.idx, timeMs: i.time_ms, correct: i.correct })) },
    bySection, bySubject, byType, bySource, weakConcepts, recommendations,
    autoSubmitted: !!t.auto_submitted,
  };
}

export function reportView(id: number) {
  const t = testRow(id);
  if (t.status !== "submitted") throw new HttpError(409, "Report is available after submission.");
  const items = all<{ idx: number; question_id: string; section: string; marks: number; response: string | null; state: string;
    time_ms: number; correct: number | null; awarded: number }>("SELECT * FROM test_items WHERE test_id = ? ORDER BY idx", id);
  return {
    id: t.id, title: t.title, kind: t.kind, submittedAt: t.submitted_at, startedAt: t.started_at, durationSec: t.duration_sec,
    report: t.report ? JSON.parse(t.report) : buildReport(id),
    items: items.map((i) => {
      const q = questionRow(i.question_id)!;
      const cn = get<{ name: string }>("SELECT name FROM concepts WHERE id = ?", q.concept_id)?.name;
      return { idx: i.idx, section: i.section, marks: i.marks, state: i.state, timeMs: i.time_ms, correct: i.correct,
        awarded: i.awarded, response: i.response ? JSON.parse(i.response) : null, question: toPublic(q, true, { conceptName: cn }) };
    }),
  };
}

export function listTests() {
  sweepExpiredTests();
  return all<{ id: number; title: string; kind: string; status: string; created_at: string; submitted_at: string | null;
    score: number | null; max_score: number | null; duration_sec: number; n: number }>(
    `SELECT t.id, t.title, t.kind, t.status, t.created_at, t.submitted_at, t.score, t.max_score, t.duration_sec,
       (SELECT COUNT(*) FROM test_items ti WHERE ti.test_id = t.id) AS n FROM tests t ORDER BY t.id DESC LIMIT 200`);
}

export function deleteTest(id: number) {
  const t = testRow(id);
  if (t.status === "in_progress") throw new HttpError(409, "Submit the test before deleting it.");
  tx(() => { run("DELETE FROM test_items WHERE test_id = ?", id); run("DELETE FROM tests WHERE id = ?", id); });
  return { ok: true };
}
