// Authoring types for built-in content (syllabus, questions, formulas).

export interface ConceptDef {
  id: string;
  name: string;
  /** One- or two-sentence scope statement shown even when no lesson exists. */
  summary: string;
  /** Concept ids that should be understood first (may be in other subjects). */
  prereqs?: string[];
  /** Relative GATE importance 1 (occasional) .. 3 (asked almost every year). */
  weight?: 1 | 2 | 3;
}

export interface TopicDef { id: string; name: string; concepts: ConceptDef[] }
export interface ChapterDef { id: string; name: string; topics: TopicDef[] }

export interface SubjectDef {
  id: string;
  name: string;
  short: string;
  /** The section name used in the official GATE EC syllabus. */
  gateSection: string;
  description: string;
  /** Approximate marks out of 100 in recent papers; used to build full-length tests. */
  examWeight: number;
  chapters: ChapterDef[];
}

export interface QuestionDef {
  id: string;
  concept: string;
  type: "MCQ" | "MSQ" | "NAT";
  difficulty: 1 | 2 | 3;
  marks: 1 | 2;
  /** Short tag describing the question pattern, e.g. "graphical", "numerical", "conceptual". */
  pattern: string;
  stem: string;
  /** MCQ: exactly 4 options, MSQ: 4 options. Omit for NAT. */
  options?: string[];
  /** Indices (0-based) of correct options for MCQ/MSQ. */
  answer?: number[];
  /** Accepted inclusive range for NAT answers. */
  range?: [number, number];
  solution: string;
  hints?: string[];
  /** Suitable as a quick prerequisite diagnostic question. */
  diagnostic?: boolean;
  /** "practice" (written for this app) unless explicitly an official paper question. */
  source?: "practice" | "official-pyq";
  sourceRef?: string;
}

export interface FormulaDef {
  id: string;
  concept: string;
  title: string;
  latex: string;
  note?: string;
}

/** String.raw alias so LaTeX backslashes survive in template literals. */
export const md = String.raw;
