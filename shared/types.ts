// Types shared between the server and the browser client.

export type QType = "MCQ" | "MSQ" | "NAT";
export type QuestionSource = "practice" | "ai-generated" | "official-pyq" | "user";
export type MasteryStatus = "not_started" | "learning" | "practicing" | "mastered";
export type StudyMode = "learning" | "exam";
export type AttemptMode = "learning" | "exam" | "diagnostic" | "revision";
export type TestKind = "topic" | "subject" | "mixed" | "full";

/** A question as sent to the browser. Answer/solution fields are only present when allowed. */
export interface QuestionPublic {
  id: string;
  conceptId: string;
  conceptName?: string;
  subjectId?: string;
  type: QType;
  difficulty: 1 | 2 | 3;
  marks: 1 | 2;
  pattern: string;
  stem: string;
  options: string[] | null;
  source: QuestionSource;
  sourceRef: string | null;
  hintCount: number;
  // revealed only after answering (learning/revision) or after test submission
  answer?: number[] | null;
  range?: [number, number] | null;
  solution?: string;
}

/** A response to a question: option indices for MCQ/MSQ, a number for NAT. */
export interface QResponse {
  selected?: number[];
  value?: number | null;
}

export interface AttemptResult {
  correct: boolean;
  answer: number[] | null;
  range: [number, number] | null;
  solution: string;
  mastery: { score: number; status: MasteryStatus; previousStatus: MasteryStatus };
}

export interface ProgressInfo {
  status: MasteryStatus;
  score: number;
  distinctQuestions: number;
  patterns: number;
  retentionVerified: boolean;
  readyForRetention: boolean;
  needsRelearn: boolean;
  lessonCompleted: boolean;
  lastPosition: number;
}

export interface ConceptNode {
  id: string;
  name: string;
  summary: string;
  weight: number;
  prereqs: string[];
  hasLesson: boolean;
  lessonSource: string | null;
  questionCount: number;
  pyqCount: number;
  progress: ProgressInfo;
}

export interface Rollup {
  score: number;
  counts: Record<MasteryStatus, number>;
  total: number;
}

export interface TopicNode { id: string; name: string; concepts: ConceptNode[]; rollup: Rollup }
export interface ChapterNode { id: string; name: string; topics: TopicNode[]; rollup: Rollup }
export interface SubjectNode {
  id: string;
  name: string;
  short: string;
  gateSection: string;
  description: string;
  examWeight: number;
  chapters: ChapterNode[];
  rollup: Rollup;
}

export interface Recommendation {
  kind: "gap" | "revision" | "relearn" | "continue" | "practice" | "new" | "retention";
  conceptId: string;
  conceptName: string;
  subjectName: string;
  reason: string;
}

export interface AIStatus {
  configured: boolean;
  provider: string;
  model: string | null;
  reachable: boolean | null;
  message: string;
}

export const STATUS_LABEL: Record<MasteryStatus, string> = {
  not_started: "Not Started",
  learning: "Learning",
  practicing: "Practicing",
  mastered: "Mastered",
};
