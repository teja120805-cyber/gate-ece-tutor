// Pure mastery computation (no database access) so it can be unit-tested.
//
// Design goals from the spec:
//  • Reading a lesson never makes a concept "Mastered" by itself.
//  • Mastery needs ≥80% accuracy over enough DIFFERENT questions, more than one question pattern,
//    and a later retention check (revision or exam attempt on a later day).
//  • Re-answering the same question does not inflate the score: each distinct question contributes
//    one data point built from its first attempt (and, if re-tested on a later day, its latest attempt).
//  • Recency, difficulty, hints, repeated mistakes and revision performance all move the score.
//  • If performance drops during revision, the concept is downgraded.
import type { MasteryStatus, AttemptMode } from "../../shared/types.ts";

export const MASTERY = {
  MIN_DISTINCT: 5,
  MIN_PATTERNS: 2,
  ACCURACY_THRESHOLD: 0.8,
  SCORE_THRESHOLD: 80,
  HALF_LIFE_DAYS: 30,
  RETENTION_GAP_HOURS: 20,
  RETENTION_WINDOW: 4,
  RETENTION_PASS: 0.7,
  RETENTION_FAIL: 0.6,
  RELEARN_BELOW: 50,
} as const;

export interface AttemptLite {
  questionId: string;
  correct: boolean;
  hintsUsed: number;
  mode: AttemptMode;
  at: Date;
}
export interface QuestionLite { difficulty: number; pattern: string; type: string }

export interface PrevState {
  status: MasteryStatus;
  lessonOpened: boolean;
  needsRelearn: boolean;
  lessonCompletedAt: Date | null;
  relearnFlaggedAt: Date | null;
}

export interface MasteryResult {
  score: number;
  accuracy: number;
  status: MasteryStatus;
  distinct: number;
  patterns: number;
  meetsCriteria: boolean;
  retentionVerified: boolean;
  retentionFailed: boolean;
  readyForRetention: boolean;
  needsRelearn: boolean;
  changeReason: string | null;
}

const DAY = 86_400_000;
const DIFF_WEIGHT: Record<number, number> = { 1: 0.7, 2: 1.0, 3: 1.4 };
const MODE_WEIGHT: Record<AttemptMode, number> = { learning: 1, exam: 1, revision: 1, diagnostic: 0.6 };

function credit(a: AttemptLite) {
  if (!a.correct) return 0;
  return a.hintsUsed > 0 ? Math.max(0.5, 1 - 0.2 * a.hintsUsed) : 1;
}

export function computeMastery(
  attempts: AttemptLite[],
  questions: Map<string, QuestionLite>,
  prev: PrevState,
  now: Date = new Date(),
): MasteryResult {
  const sorted = [...attempts].sort((a, b) => a.at.getTime() - b.at.getTime());
  const byQ = new Map<string, AttemptLite[]>();
  for (const a of sorted) {
    if (!byQ.has(a.questionId)) byQ.set(a.questionId, []);
    byQ.get(a.questionId)!.push(a);
  }

  let sumW = 0, sumWC = 0, diffCorrectSum = 0, diffCorrectN = 0, repeatedMistakes = 0;
  const goodPatterns = new Set<string>();
  const goodTypes = new Set<string>();

  for (const [qid, list] of byQ) {
    const meta = questions.get(qid) ?? { difficulty: 2, pattern: "general", type: "MCQ" };
    const first = list[0];
    const last = list[list.length - 1];
    let eff: number;
    if (list.length === 1) eff = credit(first);
    else {
      const spaced = last.at.getTime() - first.at.getTime() >= MASTERY.RETENTION_GAP_HOURS * 3_600_000;
      eff = spaced ? 0.5 * credit(first) + 0.5 * credit(last) : 0.8 * credit(first) + 0.2 * credit(last);
    }
    const ageDays = Math.max(0, (now.getTime() - last.at.getTime()) / DAY);
    const recency = Math.max(0.25, Math.pow(0.5, ageDays / MASTERY.HALF_LIFE_DAYS));
    const w = (DIFF_WEIGHT[meta.difficulty] ?? 1) * recency * MODE_WEIGHT[first.mode];
    sumW += w;
    sumWC += w * eff;
    if (eff >= 0.5) {
      goodPatterns.add(meta.pattern);
      goodTypes.add(meta.type);
      diffCorrectSum += meta.difficulty;
      diffCorrectN++;
    }
    const recentWrong = list.filter((a) => !a.correct && now.getTime() - a.at.getTime() < 60 * DAY).length;
    if (recentWrong >= 2) repeatedMistakes++;
  }

  const distinct = byQ.size;
  const patterns = Math.max(goodPatterns.size, goodTypes.size);
  const accuracy = sumW > 0 ? sumWC / sumW : 0;

  // Retention: no-hint assessments (revision/exam) made on a later day than the first attempt.
  const firstAt = sorted[0]?.at.getTime() ?? 0;
  const retentionAttempts = sorted.filter(
    (a) => (a.mode === "revision" || a.mode === "exam") && a.at.getTime() - firstAt >= MASTERY.RETENTION_GAP_HOURS * 3_600_000,
  ).slice(-MASTERY.RETENTION_WINDOW);
  const retAcc = retentionAttempts.length ? retentionAttempts.filter((a) => a.correct).length / retentionAttempts.length : null;
  const retentionVerified = retentionAttempts.length >= 2 && retAcc! >= MASTERY.RETENTION_PASS;
  const retentionFailed = retentionAttempts.length >= 2 && retAcc! < MASTERY.RETENTION_FAIL;

  // Score
  const evidence = Math.min(1, distinct / MASTERY.MIN_DISTINCT);
  let score = 100 * accuracy * (0.25 + 0.75 * evidence);
  if (diffCorrectN > 0) score += 5 * Math.min(1, Math.max(0, (diffCorrectSum / diffCorrectN - 1.5) / 1.5));
  if (retAcc !== null && retentionAttempts.length >= 2) score += (retAcc - 0.7) * 20;
  score -= Math.min(16, repeatedMistakes * 4);
  const last3 = sorted.slice(-3);
  if (last3.length === 3 && last3.every((a) => !a.correct)) score -= 8;
  if (distinct < MASTERY.MIN_DISTINCT || patterns < MASTERY.MIN_PATTERNS) score = Math.min(score, 79);
  // Without proof of retention on a later day the score cannot reach the 90s.
  if (!retentionVerified) score = Math.min(score, 89);
  score = Math.round(Math.max(0, Math.min(100, score)));

  const meetsCriteria =
    distinct >= MASTERY.MIN_DISTINCT && accuracy >= MASTERY.ACCURACY_THRESHOLD &&
    patterns >= MASTERY.MIN_PATTERNS && score >= MASTERY.SCORE_THRESHOLD;

  // Relearn flag: set when a practised concept collapses; cleared by re-reading the lesson or recovering.
  let needsRelearn = prev.needsRelearn;
  const practised = distinct >= 3;
  if (practised && score < MASTERY.RELEARN_BELOW && (prev.status === "mastered" || retentionFailed)) needsRelearn = true;
  if (needsRelearn && (score >= 65 ||
      (prev.lessonCompletedAt && prev.relearnFlaggedAt && prev.lessonCompletedAt > prev.relearnFlaggedAt))) needsRelearn = false;

  let status: MasteryStatus;
  if (distinct === 0) status = prev.lessonOpened ? "learning" : "not_started";
  else if (meetsCriteria && retentionVerified) status = "mastered";
  else if (distinct >= 2 && !needsRelearn) status = "practicing";
  else status = "learning";

  let changeReason: string | null = null;
  if (prev.status === "mastered" && status !== "mastered") {
    changeReason = retentionFailed
      ? `Retention check failed (${Math.round((retAcc ?? 0) * 100)}% on recent revision/exam questions)`
      : `Mastery score dropped to ${score}`;
  } else if (status === "mastered" && prev.status !== "mastered") {
    changeReason = "Met accuracy, variety and retention criteria";
  }

  return {
    score, accuracy, status, distinct, patterns, meetsCriteria, retentionVerified, retentionFailed,
    readyForRetention: meetsCriteria && !retentionVerified, needsRelearn, changeReason,
  };
}
