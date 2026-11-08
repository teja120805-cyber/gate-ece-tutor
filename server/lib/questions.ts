// Question access, adaptive selection and attempt recording.
import { all, get, run, nowIso, tx } from "../db.ts";
import type { QuestionPublic, QResponse, AttemptMode, QType, QuestionSource } from "../../shared/types.ts";
import { isCorrect } from "./scoring.ts";
import { recomputeConcept, bumpDaily } from "./progress.ts";

export interface QuestionRow {
  id: string; concept_id: string; type: QType; difficulty: 1 | 2 | 3; marks: 1 | 2; pattern: string; stem: string;
  options: string | null; answer: string | null; range_min: number | null; range_max: number | null; solution: string;
  hints: string; diagnostic: number; source: QuestionSource; source_ref: string | null; builtin: number; active: number;
}

export function questionRow(id: string) {
  return get<QuestionRow>("SELECT * FROM questions WHERE id = ?", id);
}

export function parseAnswer(q: QuestionRow) {
  return { type: q.type, answer: q.answer ? (JSON.parse(q.answer) as number[]) : null, range_min: q.range_min, range_max: q.range_max };
}

export function toPublic(q: QuestionRow, reveal: boolean, extra?: { conceptName?: string; subjectId?: string }): QuestionPublic {
  const pub: QuestionPublic = {
    id: q.id, conceptId: q.concept_id, type: q.type, difficulty: q.difficulty, marks: q.marks, pattern: q.pattern,
    stem: q.stem, options: q.options ? JSON.parse(q.options) : null, source: q.source, sourceRef: q.source_ref,
    hintCount: (JSON.parse(q.hints) as string[]).length, ...extra,
  };
  if (reveal) {
    pub.answer = q.answer ? JSON.parse(q.answer) : null;
    pub.range = q.range_min != null && q.range_max != null ? [q.range_min, q.range_max] : null;
    pub.solution = q.solution;
  }
  return pub;
}

export function conceptMeta(conceptId: string) {
  return get<{ id: string; name: string; subject_id: string; subject_name: string }>(
    `SELECT c.id, c.name, s.id AS subject_id, s.name AS subject_name FROM concepts c JOIN topics t ON t.id = c.topic_id
     JOIN chapters ch ON ch.id = t.chapter_id JOIN subjects s ON s.id = ch.subject_id WHERE c.id = ?`, conceptId);
}

/**
 * Adaptive next question for learning-mode practice:
 * unseen questions first, nearest to a target difficulty that rises after consecutive successes
 * and falls after consecutive mistakes; then previously-missed questions; then least recently seen.
 */
export function nextQuestion(conceptId: string, excludeIds: string[] = []) {
  const qs = all<QuestionRow>("SELECT * FROM questions WHERE concept_id = ? AND active = 1", conceptId)
    .filter((q) => !excludeIds.includes(q.id));
  const total = all<{ n: number }>("SELECT COUNT(*) AS n FROM questions WHERE concept_id = ? AND active = 1", conceptId)[0].n;
  if (!qs.length) return { question: null, exhausted: true, total, targetDifficulty: 1, unseenRemaining: 0 };

  const history = all<{ question_id: string; correct: number; created_at: string; difficulty: number }>(
    `SELECT a.question_id, a.correct, a.created_at, q.difficulty FROM attempts a JOIN questions q ON q.id = a.question_id
     WHERE a.concept_id = ? ORDER BY a.created_at DESC, a.id DESC`, conceptId);
  let target = history.length ? history[0].difficulty : 1;
  const last3 = history.slice(0, 3);
  if (last3.length >= 2 && last3[0].correct && last3.filter((h) => h.correct).length >= 2) target = Math.min(3, target + 1);
  else if (last3.length >= 2 && !last3[0].correct && !last3[1].correct) target = Math.max(1, target - 1);

  const lastSeen = new Map<string, { at: string; correct: number }>();
  for (const h of history) if (!lastSeen.has(h.question_id)) lastSeen.set(h.question_id, { at: h.created_at, correct: h.correct });

  const unseen = qs.filter((q) => !lastSeen.has(q.id));
  const rand = () => Math.random() * 0.5;
  let pick: QuestionRow | undefined;
  if (unseen.length) {
    pick = unseen.map((q) => ({ q, k: Math.abs(q.difficulty - target) + rand() })).sort((a, b) => a.k - b.k)[0].q;
  } else {
    const missed = qs.filter((q) => lastSeen.get(q.id)?.correct === 0)
      .sort((a, b) => lastSeen.get(a.id)!.at.localeCompare(lastSeen.get(b.id)!.at));
    pick = missed[0] ?? [...qs].sort((a, b) => lastSeen.get(a.id)!.at.localeCompare(lastSeen.get(b.id)!.at))[0];
  }
  return { question: pick, exhausted: unseen.length <= 1, total, targetDifficulty: target, unseenRemaining: Math.max(0, unseen.length - 1) };
}

export function recordAttempt(opts: {
  questionId: string; response: QResponse; mode: AttemptMode; timeMs?: number; hintsUsed?: number; refId?: string | null;
  recompute?: boolean;
}) {
  const q = questionRow(opts.questionId);
  if (!q) throw new HttpError(404, "Question not found");
  const correct = isCorrect(parseAnswer(q), opts.response);
  tx(() => {
    run(`INSERT INTO attempts(question_id, concept_id, mode, correct, response, time_ms, hints_used, ref_id, created_at)
         VALUES(?,?,?,?,?,?,?,?,?)`,
      q.id, q.concept_id, opts.mode, correct, opts.response, Math.max(0, Math.round(opts.timeMs ?? 0)),
      opts.hintsUsed ?? 0, opts.refId ?? null, nowIso());
    bumpDaily("questions");
    if (correct) bumpDaily("correct");
    run("UPDATE concept_progress SET last_studied_at = ? WHERE concept_id = ?", nowIso(), q.concept_id);
  });
  const mastery = opts.recompute === false ? null : recomputeConcept(q.concept_id);
  return { q, correct, mastery };
}

export class HttpError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
