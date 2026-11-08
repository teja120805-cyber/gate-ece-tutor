// Spaced repetition at the concept level (SM-2 style). Each practised concept gets a review
// schedule; revision sessions and exam results move the next due date.
import { all, get, run, nowIso } from "../db.ts";

const DAY = 86_400_000;

export function ensureSchedule(conceptId: string, readyForRetention: boolean) {
  const existing = get<{ due_at: string; reps: number }>("SELECT due_at, reps FROM review_schedule WHERE concept_id = ?", conceptId);
  if (!existing) {
    run("INSERT INTO review_schedule(concept_id, due_at) VALUES(?, ?)", conceptId, new Date(Date.now() + DAY).toISOString());
    return;
  }
  // A concept that just became ready for its retention check should be reviewed within a day.
  if (readyForRetention && existing.reps === 0) {
    const soon = new Date(Date.now() + DAY).toISOString();
    if (existing.due_at > soon) run("UPDATE review_schedule SET due_at = ? WHERE concept_id = ?", soon, conceptId);
  }
}

/** Apply the result of a review (accuracy 0..1) and return the next due date. */
export function applyReview(conceptId: string, accuracy: number): string {
  const s = get<{ ease: number; interval_days: number; reps: number; lapses: number }>(
    "SELECT ease, interval_days, reps, lapses FROM review_schedule WHERE concept_id = ?", conceptId,
  ) ?? { ease: 2.5, interval_days: 0, reps: 0, lapses: 0 };
  const q = Math.round(accuracy * 5);
  let { ease, interval_days: interval, reps, lapses } = s;
  if (accuracy >= 0.7) {
    reps += 1;
    interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(Math.max(interval, 1) * ease);
    ease = Math.max(1.3, ease + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  } else {
    lapses += 1;
    reps = 0;
    interval = 1;
    ease = Math.max(1.3, ease - 0.2);
  }
  interval = Math.min(interval, 120);
  const due = new Date(Date.now() + interval * DAY).toISOString();
  run(`INSERT INTO review_schedule(concept_id, ease, interval_days, reps, lapses, due_at, last_review_at, last_accuracy)
       VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(concept_id) DO UPDATE SET ease = excluded.ease, interval_days = excluded.interval_days,
       reps = excluded.reps, lapses = excluded.lapses, due_at = excluded.due_at, last_review_at = excluded.last_review_at,
       last_accuracy = excluded.last_accuracy`,
    conceptId, ease, interval, reps, lapses, due, nowIso(), accuracy);
  return due;
}

export interface DueItem { concept_id: string; due_at: string; reps: number; lapses: number; last_accuracy: number | null }

export function dueConcepts(limit = 50): DueItem[] {
  return all<DueItem>(
    "SELECT concept_id, due_at, reps, lapses, last_accuracy FROM review_schedule WHERE due_at <= ? ORDER BY due_at LIMIT ?",
    nowIso(), limit);
}

export function upcoming(days = 7): { day: string; count: number }[] {
  const until = new Date(Date.now() + days * DAY).toISOString();
  return all<{ day: string; count: number }>(
    "SELECT substr(due_at, 1, 10) AS day, COUNT(*) AS count FROM review_schedule WHERE due_at <= ? GROUP BY day ORDER BY day", until);
}
