// Revision sessions: spaced-repetition reviews and retention checks (no hints, immediate feedback).
import { all, get, run, nowIso } from "../db.ts";
import { dueConcepts, applyReview } from "./srs.ts";
import { HttpError, questionRow, toPublic, recordAttempt } from "./questions.ts";
import { progressRow, readyForRetentionSet } from "./progress.ts";
import type { QResponse } from "../../shared/types.ts";

const DAY = 86_400_000;

function pickQuestions(conceptId: string, n: number): string[] {
  const recent = new Date(Date.now() - 3 * DAY).toISOString();
  return all<{ id: string; last: string | null; n: number }>(
    `SELECT q.id, (SELECT MAX(created_at) FROM attempts a WHERE a.question_id = q.id) AS last,
       (SELECT COUNT(*) FROM attempts a WHERE a.question_id = q.id) AS n
     FROM questions q WHERE q.concept_id = ? AND q.active = 1`, conceptId)
    .map((q) => ({ ...q, k: (q.last && q.last > recent ? 100 : 0) + (q.n === 0 ? -5 : 0) + (q.last ? new Date(q.last).getTime() / 1e13 : 0) + Math.random() }))
    .sort((a, b) => a.k - b.k).slice(0, n).map((q) => q.id);
}

export function createRevision(kind: "due" | "weak" = "due", limit = 6, perConcept = 2) {
  let concepts: string[];
  if (kind === "due") {
    const ready = readyForRetentionSet();
    concepts = [...new Set([...dueConcepts(100).map((d) => d.concept_id)])]
      .sort((a, b) => Number(ready.has(b)) - Number(ready.has(a)));
  } else {
    concepts = all<{ concept_id: string }>(
      "SELECT concept_id FROM concept_progress WHERE distinct_questions >= 1 AND status <> 'mastered' ORDER BY score ASC LIMIT 20")
      .map((r) => r.concept_id);
  }
  const items: { questionId: string; conceptId: string }[] = [];
  for (const cid of concepts) {
    if (items.length >= limit * perConcept) break;
    for (const qid of pickQuestions(cid, perConcept)) items.push({ questionId: qid, conceptId: cid });
  }
  if (!items.length) throw new HttpError(409, kind === "due" ? "Nothing is due for revision right now." : "No practised concepts to revise yet.");
  const r = run("INSERT INTO revision_sessions(items, created_at) VALUES(?, ?)", items, nowIso());
  return getRevision(r.lastId);
}

export function getRevision(id: number) {
  const s = get<{ id: number; items: string; result: string | null; completed_at: string | null }>("SELECT * FROM revision_sessions WHERE id = ?", id);
  if (!s) throw new HttpError(404, "Revision session not found");
  const items = JSON.parse(s.items) as { questionId: string; conceptId: string }[];
  const answered = new Map(all<{ question_id: string; correct: number }>(
    "SELECT question_id, correct FROM attempts WHERE ref_id = ?", `rev:${id}`).map((a) => [a.question_id, a.correct]));
  return {
    id: s.id, completed: !!s.completed_at, result: s.result ? JSON.parse(s.result) : null,
    items: items.map((it, idx) => {
      const q = questionRow(it.questionId)!;
      const done = answered.has(it.questionId);
      const cn = get<{ name: string }>("SELECT name FROM concepts WHERE id = ?", it.conceptId)?.name;
      return { idx, conceptId: it.conceptId, conceptName: cn, answered: done, correct: done ? !!answered.get(it.questionId) : null,
        question: toPublic(q, done, { conceptName: cn }) };
    }),
  };
}

export function answerRevision(id: number, idx: number, response: QResponse, timeMs: number) {
  const s = get<{ items: string; completed_at: string | null }>("SELECT items, completed_at FROM revision_sessions WHERE id = ?", id);
  if (!s) throw new HttpError(404, "Revision session not found");
  const items = JSON.parse(s.items) as { questionId: string; conceptId: string }[];
  const it = items[idx];
  if (!it) throw new HttpError(400, "Invalid item");
  if (get("SELECT 1 FROM attempts WHERE ref_id = ? AND question_id = ?", `rev:${id}`, it.questionId)) throw new HttpError(409, "Already answered");
  const before = progressRow(it.conceptId)?.status ?? "not_started";
  const { q, correct, mastery } = recordAttempt({ questionId: it.questionId, response, mode: "revision", timeMs, refId: `rev:${id}` });
  return { correct, question: toPublic(q, true), mastery: { score: mastery!.score, status: mastery!.status, previousStatus: before } };
}

export function completeRevision(id: number) {
  const s = get<{ items: string; completed_at: string | null }>("SELECT items, completed_at FROM revision_sessions WHERE id = ?", id);
  if (!s) throw new HttpError(404, "Revision session not found");
  if (s.completed_at) return getRevision(id);
  const rows = all<{ concept_id: string; correct: number }>("SELECT concept_id, correct FROM attempts WHERE ref_id = ?", `rev:${id}`);
  const per = new Map<string, { ok: number; n: number }>();
  for (const r of rows) { const p = per.get(r.concept_id) ?? { ok: 0, n: 0 }; p.n++; if (r.correct) p.ok++; per.set(r.concept_id, p); }
  const concepts = [...per].map(([cid, p]) => {
    const acc = p.ok / p.n;
    const nextDue = applyReview(cid, acc);
    const pr = progressRow(cid);
    const name = get<{ name: string }>("SELECT name FROM concepts WHERE id = ?", cid)?.name ?? cid;
    return { conceptId: cid, name, accuracy: acc, nextDue, status: pr?.status, score: pr?.score, needsRelearn: !!pr?.needs_relearn };
  });
  run("UPDATE revision_sessions SET result = ?, completed_at = ? WHERE id = ?", { concepts }, nowIso(), id);
  return getRevision(id);
}
