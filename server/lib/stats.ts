// Study statistics, streaks, mastery rollups and analytics.
import { all, get, localDay } from "../db.ts";
import { allProgress, readyForRetentionSet, toProgressInfo } from "./progress.ts";
import type { SubjectNode, Rollup, MasteryStatus, ConceptNode } from "../../shared/types.ts";

const ACTIVE_DAY = "(study_seconds >= 120 OR questions >= 1)";

export function streaks() {
  const days = new Set(all<{ day: string }>(`SELECT day FROM daily_stats WHERE ${ACTIVE_DAY}`).map((d) => d.day));
  const d = new Date();
  if (!days.has(localDay(d))) d.setDate(d.getDate() - 1); // today not done yet: streak is still alive from yesterday
  let current = 0;
  while (days.has(localDay(d))) { current++; d.setDate(d.getDate() - 1); }
  const sorted = [...days].sort();
  let longest = 0, run = 0, prev: Date | null = null;
  for (const s of sorted) {
    const cur = new Date(s + "T00:00:00");
    run = prev && Math.round((cur.getTime() - prev.getTime()) / 86_400_000) === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = cur;
  }
  return { current, longest, activeToday: days.has(localDay()) };
}

export function today() {
  return get<{ study_seconds: number; questions: number; correct: number; lessons_completed: number; concepts_mastered: number }>(
    "SELECT study_seconds, questions, correct, lessons_completed, concepts_mastered FROM daily_stats WHERE day = ?", localDay(),
  ) ?? { study_seconds: 0, questions: 0, correct: 0, lessons_completed: 0, concepts_mastered: 0 };
}

const emptyCounts = (): Record<MasteryStatus, number> => ({ not_started: 0, learning: 0, practicing: 0, mastered: 0 });
function rollup(concepts: { progress: { status: MasteryStatus; score: number } }[]): Rollup {
  const counts = emptyCounts();
  let sum = 0;
  for (const c of concepts) { counts[c.progress.status]++; sum += c.progress.score; }
  return { score: concepts.length ? Math.round(sum / concepts.length) : 0, counts, total: concepts.length };
}

/** Full syllabus tree with progress at concept, topic, chapter and subject level. */
export function syllabusTree(): SubjectNode[] {
  const subjects = all<{ id: string; name: string; short: string; gate_section: string; description: string; exam_weight: number }>(
    "SELECT * FROM subjects ORDER BY ord");
  const chapters = all<{ id: string; subject_id: string; name: string }>("SELECT * FROM chapters ORDER BY ord");
  const topics = all<{ id: string; chapter_id: string; name: string }>("SELECT * FROM topics ORDER BY ord");
  const concepts = all<{ id: string; topic_id: string; name: string; summary: string; weight: number }>("SELECT * FROM concepts ORDER BY ord");
  const prereqs = new Map<string, string[]>();
  for (const r of all<{ concept_id: string; prereq_id: string }>("SELECT * FROM concept_prereqs")) {
    if (!prereqs.has(r.concept_id)) prereqs.set(r.concept_id, []);
    prereqs.get(r.concept_id)!.push(r.prereq_id);
  }
  const lessons = new Map(all<{ concept_id: string; source: string }>("SELECT concept_id, source FROM lessons").map((l) => [l.concept_id, l.source]));
  const qCounts = new Map<string, { n: number; pyq: number }>();
  for (const r of all<{ concept_id: string; n: number; pyq: number }>(
    "SELECT concept_id, COUNT(*) AS n, SUM(source = 'official-pyq') AS pyq FROM questions WHERE active = 1 GROUP BY concept_id"))
    qCounts.set(r.concept_id, { n: r.n, pyq: r.pyq });
  const prog = allProgress();
  const ready = readyForRetentionSet();

  const conceptNode = (c: typeof concepts[number]): ConceptNode => ({
    id: c.id, name: c.name, summary: c.summary, weight: c.weight, prereqs: prereqs.get(c.id) ?? [],
    hasLesson: lessons.has(c.id), lessonSource: lessons.get(c.id) ?? null,
    questionCount: qCounts.get(c.id)?.n ?? 0, pyqCount: qCounts.get(c.id)?.pyq ?? 0,
    progress: toProgressInfo(prog.get(c.id), { readyForRetention: ready.has(c.id) }),
  });

  return subjects.map((s) => {
    const chs = chapters.filter((ch) => ch.subject_id === s.id).map((ch) => {
      const tps = topics.filter((t) => t.chapter_id === ch.id).map((t) => {
        const cs = concepts.filter((c) => c.topic_id === t.id).map(conceptNode);
        return { id: t.id, name: t.name, concepts: cs, rollup: rollup(cs) };
      });
      return { id: ch.id, name: ch.name, topics: tps, rollup: rollup(tps.flatMap((t) => t.concepts)) };
    });
    return {
      id: s.id, name: s.name, short: s.short, gateSection: s.gate_section, description: s.description,
      examWeight: s.exam_weight, chapters: chs, rollup: rollup(chs.flatMap((ch) => ch.topics.flatMap((t) => t.concepts))),
    };
  });
}

export function analytics(days = 30) {
  const since = new Date(); since.setDate(since.getDate() - days + 1);
  const daily = all<{ day: string; study_seconds: number; questions: number; correct: number; lessons_completed: number; concepts_mastered: number }>(
    "SELECT * FROM daily_stats WHERE day >= ? ORDER BY day", localDay(since));
  const filled: typeof daily = [];
  const map = new Map(daily.map((d) => [d.day, d]));
  for (let i = 0; i < days; i++) {
    const d = new Date(since); d.setDate(since.getDate() + i);
    const k = localDay(d);
    filled.push(map.get(k) ?? { day: k, study_seconds: 0, questions: 0, correct: 0, lessons_completed: 0, concepts_mastered: 0 });
  }
  const subjectJoin = `FROM attempts a JOIN concepts c ON c.id = a.concept_id JOIN topics t ON t.id = c.topic_id
    JOIN chapters ch ON ch.id = t.chapter_id JOIN subjects s ON s.id = ch.subject_id`;
  const bySubject = all<{ subject_id: string; name: string; n: number; ok: number; avg_ms: number }>(
    `SELECT s.id AS subject_id, s.name, COUNT(*) AS n, SUM(a.correct) AS ok, AVG(NULLIF(a.time_ms, 0)) AS avg_ms ${subjectJoin}
     GROUP BY s.id ORDER BY s.ord`);
  const byDifficulty = all<{ difficulty: number; n: number; ok: number }>(
    "SELECT q.difficulty, COUNT(*) AS n, SUM(a.correct) AS ok FROM attempts a JOIN questions q ON q.id = a.question_id GROUP BY q.difficulty ORDER BY q.difficulty");
  const byType = all<{ type: string; n: number; ok: number }>(
    "SELECT q.type, COUNT(*) AS n, SUM(a.correct) AS ok FROM attempts a JOIN questions q ON q.id = a.question_id GROUP BY q.type");
  const byMode = all<{ mode: string; n: number; ok: number }>("SELECT mode, COUNT(*) AS n, SUM(correct) AS ok FROM attempts GROUP BY mode");
  const tests = all<{ id: number; title: string; kind: string; submitted_at: string; score: number; max_score: number }>(
    "SELECT id, title, kind, submitted_at, score, max_score FROM tests WHERE status = 'submitted' ORDER BY submitted_at");
  const weakest = all<{ concept_id: string; name: string; subject: string; score: number; status: string; distinct_questions: number }>(
    `SELECT p.concept_id, c.name, s.name AS subject, p.score, p.status, p.distinct_questions FROM concept_progress p
     JOIN concepts c ON c.id = p.concept_id JOIN topics t ON t.id = c.topic_id JOIN chapters ch ON ch.id = t.chapter_id
     JOIN subjects s ON s.id = ch.subject_id WHERE p.distinct_questions >= 2 AND p.status <> 'mastered' ORDER BY p.score ASC LIMIT 10`);
  const events = all<{ concept_id: string; name: string; from_status: string; to_status: string; score: number; reason: string; created_at: string }>(
    `SELECT e.concept_id, c.name, e.from_status, e.to_status, e.score, e.reason, e.created_at FROM mastery_events e
     JOIN concepts c ON c.id = e.concept_id ORDER BY e.id DESC LIMIT 25`);
  const totals = get<{ n: number; ok: number; ms: number }>("SELECT COUNT(*) AS n, SUM(correct) AS ok, SUM(time_ms) AS ms FROM attempts")!;
  const studySeconds = get<{ s: number }>("SELECT COALESCE(SUM(study_seconds), 0) AS s FROM daily_stats")!.s;
  return { daily: filled, bySubject, byDifficulty, byType, byMode, tests, weakest, events, totals: { ...totals, studySeconds } };
}
