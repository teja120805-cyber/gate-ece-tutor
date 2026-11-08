// Database-backed concept progress + mastery bookkeeping.
import { all, get, run, tx, nowIso, localDay } from "../db.ts";
import { computeMastery, type AttemptLite, type QuestionLite, type MasteryResult } from "./mastery-core.ts";
import type { MasteryStatus, ProgressInfo, AttemptMode } from "../../shared/types.ts";
import { ensureSchedule } from "./srs.ts";

export interface ProgressRow {
  concept_id: string; status: MasteryStatus; score: number; distinct_questions: number; patterns: number;
  retention_verified: number; needs_relearn: number; lesson_opened_at: string | null;
  lesson_completed_at: string | null; last_position: number; last_studied_at: string | null;
  mastered_at: string | null; updated_at: string;
}

export function progressRow(conceptId: string): ProgressRow | undefined {
  return get<ProgressRow>("SELECT * FROM concept_progress WHERE concept_id = ?", conceptId);
}

function ensureRow(conceptId: string) {
  run("INSERT OR IGNORE INTO concept_progress(concept_id, updated_at) VALUES(?, ?)", conceptId, nowIso());
}

export function toProgressInfo(r: ProgressRow | undefined, extra?: Partial<MasteryResult>): ProgressInfo {
  return {
    status: r?.status ?? "not_started",
    score: r?.score ?? 0,
    distinctQuestions: r?.distinct_questions ?? 0,
    patterns: r?.patterns ?? 0,
    retentionVerified: !!r?.retention_verified,
    readyForRetention: extra?.readyForRetention ?? false,
    needsRelearn: !!r?.needs_relearn,
    lessonCompleted: !!r?.lesson_completed_at,
    lastPosition: r?.last_position ?? 0,
  };
}

export function bumpDaily(field: "questions" | "correct" | "lessons_completed" | "concepts_mastered" | "study_seconds", by = 1) {
  run(`INSERT INTO daily_stats(day, ${field}) VALUES(?, ?) ON CONFLICT(day) DO UPDATE SET ${field} = ${field} + excluded.${field}`, localDay(), by);
}

export function markLesson(conceptId: string, event: "open" | "complete" | "position", position?: number) {
  ensureRow(conceptId);
  const now = nowIso();
  const r = progressRow(conceptId)!;
  if (event === "open" && !r.lesson_opened_at) run("UPDATE concept_progress SET lesson_opened_at = ? WHERE concept_id = ?", now, conceptId);
  if (event === "complete") {
    if (!r.lesson_completed_at) bumpDaily("lessons_completed");
    run("UPDATE concept_progress SET lesson_completed_at = ?, lesson_opened_at = COALESCE(lesson_opened_at, ?) WHERE concept_id = ?", now, now, conceptId);
  }
  if (event === "position" && typeof position === "number" && Number.isFinite(position)) {
    run("UPDATE concept_progress SET last_position = ? WHERE concept_id = ?", Math.max(0, Math.min(1, position)), conceptId);
  }
  run("UPDATE concept_progress SET last_studied_at = ? WHERE concept_id = ?", now, conceptId);
  if (event !== "position") recomputeConcept(conceptId);
}

/** Recalculate mastery for one concept from its full attempt history. */
export function recomputeConcept(conceptId: string): MasteryResult {
  return tx(() => {
    ensureRow(conceptId);
    const r = progressRow(conceptId)!;
    const attempts = all<{ question_id: string; correct: number; hints_used: number; mode: AttemptMode; created_at: string }>(
      "SELECT question_id, correct, hints_used, mode, created_at FROM attempts WHERE concept_id = ? ORDER BY created_at, id", conceptId,
    ).map<AttemptLite>((a) => ({ questionId: a.question_id, correct: !!a.correct, hintsUsed: a.hints_used, mode: a.mode, at: new Date(a.created_at) }));
    const qs = new Map<string, QuestionLite>();
    for (const q of all<{ id: string; difficulty: number; pattern: string; type: string }>(
      "SELECT id, difficulty, pattern, type FROM questions WHERE id IN (SELECT DISTINCT question_id FROM attempts WHERE concept_id = ?)", conceptId))
      qs.set(q.id, { difficulty: q.difficulty, pattern: q.pattern, type: q.type });

    const relearnEvt = get<{ created_at: string }>(
      "SELECT created_at FROM mastery_events WHERE concept_id = ? AND reason LIKE 'Relearn%' ORDER BY id DESC LIMIT 1", conceptId);
    const res = computeMastery(attempts, qs, {
      status: r.status,
      lessonOpened: !!r.lesson_opened_at,
      needsRelearn: !!r.needs_relearn,
      lessonCompletedAt: r.lesson_completed_at ? new Date(r.lesson_completed_at) : null,
      relearnFlaggedAt: relearnEvt ? new Date(relearnEvt.created_at) : null,
    });

    const now = nowIso();
    if (res.status !== r.status) {
      run("INSERT INTO mastery_events(concept_id, from_status, to_status, score, reason, created_at) VALUES(?,?,?,?,?,?)",
        conceptId, r.status, res.status, res.score, res.changeReason ?? "Progress update", now);
      if (res.status === "mastered") bumpDaily("concepts_mastered");
    }
    if (res.needsRelearn && !r.needs_relearn) {
      run("INSERT INTO mastery_events(concept_id, from_status, to_status, score, reason, created_at) VALUES(?,?,?,?,?,?)",
        conceptId, r.status, res.status, res.score, "Relearn recommended: performance collapsed after practice", now);
    }
    run(`UPDATE concept_progress SET status = ?, score = ?, distinct_questions = ?, patterns = ?, retention_verified = ?,
         needs_relearn = ?, mastered_at = CASE WHEN ? = 'mastered' THEN COALESCE(mastered_at, ?) ELSE NULL END, updated_at = ?
         WHERE concept_id = ?`,
      res.status, res.score, res.distinct, res.patterns, res.retentionVerified, res.needsRelearn, res.status, now, now, conceptId);

    if (res.distinct >= 2) ensureSchedule(conceptId, res.readyForRetention);
    // A prerequisite gap is resolved once the learner shows reasonable command of that concept.
    if (res.score >= 60 || res.status === "mastered") {
      run("UPDATE prereq_gaps SET resolved_at = ? WHERE concept_id = ? AND resolved_at IS NULL", now, conceptId);
    }
    return res;
  });
}

export function allProgress(): Map<string, ProgressRow> {
  const m = new Map<string, ProgressRow>();
  for (const r of all<ProgressRow>("SELECT * FROM concept_progress")) m.set(r.concept_id, r);
  return m;
}

/** Concepts that currently satisfy every mastery criterion except the later-day retention check. */
export function readyForRetentionSet(): Set<string> {
  const rows = all<{ concept_id: string }>(
    "SELECT concept_id FROM concept_progress WHERE status = 'practicing' AND score >= 80 AND distinct_questions >= 5 AND patterns >= 2 AND retention_verified = 0");
  return new Set(rows.map((r) => r.concept_id));
}
