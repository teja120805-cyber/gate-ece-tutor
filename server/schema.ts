// Versioned schema migrations. Append new migrations; never edit applied ones.
// Content tables (subjects..formulas) are re-seeded from /content on every start.
// All other tables hold the learner's data and are included in exports/backups.

export const USER_TABLES = [
  "concept_progress", "mastery_events", "attempts", "diagnostics", "diagnostic_items", "prereq_gaps",
  "review_schedule", "revision_sessions", "tests", "test_items", "bookmarks", "formula_notes", "notes",
  "daily_stats", "settings", "ai_messages", "ai_usage",
] as const;

export const MIGRATIONS: string[] = [
  /* 1 */ `
  CREATE TABLE subjects (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, short TEXT NOT NULL, gate_section TEXT NOT NULL,
    description TEXT NOT NULL, exam_weight REAL NOT NULL, ord INTEGER NOT NULL);
  CREATE TABLE chapters (id TEXT PRIMARY KEY, subject_id TEXT NOT NULL, name TEXT NOT NULL, ord INTEGER NOT NULL);
  CREATE TABLE topics (id TEXT PRIMARY KEY, chapter_id TEXT NOT NULL, name TEXT NOT NULL, ord INTEGER NOT NULL);
  CREATE TABLE concepts (
    id TEXT PRIMARY KEY, topic_id TEXT NOT NULL, name TEXT NOT NULL, summary TEXT NOT NULL,
    weight INTEGER NOT NULL DEFAULT 2, ord INTEGER NOT NULL);
  CREATE TABLE concept_prereqs (concept_id TEXT NOT NULL, prereq_id TEXT NOT NULL, PRIMARY KEY (concept_id, prereq_id));
  CREATE TABLE lessons (
    concept_id TEXT PRIMARY KEY, content TEXT NOT NULL, source TEXT NOT NULL, model TEXT, updated_at TEXT NOT NULL);
  CREATE TABLE questions (
    id TEXT PRIMARY KEY, concept_id TEXT NOT NULL, type TEXT NOT NULL CHECK (type IN ('MCQ','MSQ','NAT')),
    difficulty INTEGER NOT NULL, marks INTEGER NOT NULL, pattern TEXT NOT NULL, stem TEXT NOT NULL,
    options TEXT, answer TEXT, range_min REAL, range_max REAL, solution TEXT NOT NULL,
    hints TEXT NOT NULL DEFAULT '[]', diagnostic INTEGER NOT NULL DEFAULT 0,
    source TEXT NOT NULL, source_ref TEXT, builtin INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL);
  CREATE INDEX idx_questions_concept ON questions(concept_id);
  CREATE TABLE formulas (
    id TEXT PRIMARY KEY, concept_id TEXT NOT NULL, title TEXT NOT NULL, latex TEXT NOT NULL, note TEXT, ord INTEGER NOT NULL);

  CREATE TABLE concept_progress (
    concept_id TEXT PRIMARY KEY, status TEXT NOT NULL DEFAULT 'not_started', score REAL NOT NULL DEFAULT 0,
    distinct_questions INTEGER NOT NULL DEFAULT 0, patterns INTEGER NOT NULL DEFAULT 0,
    retention_verified INTEGER NOT NULL DEFAULT 0, needs_relearn INTEGER NOT NULL DEFAULT 0,
    lesson_opened_at TEXT, lesson_completed_at TEXT, last_position REAL NOT NULL DEFAULT 0,
    last_studied_at TEXT, mastered_at TEXT, updated_at TEXT NOT NULL);
  CREATE TABLE mastery_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT, concept_id TEXT NOT NULL, from_status TEXT NOT NULL,
    to_status TEXT NOT NULL, score REAL NOT NULL, reason TEXT NOT NULL, created_at TEXT NOT NULL);
  CREATE TABLE attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, question_id TEXT NOT NULL, concept_id TEXT NOT NULL,
    mode TEXT NOT NULL, correct INTEGER NOT NULL, response TEXT NOT NULL, time_ms INTEGER NOT NULL DEFAULT 0,
    hints_used INTEGER NOT NULL DEFAULT 0, ref_id TEXT, created_at TEXT NOT NULL);
  CREATE INDEX idx_attempts_concept ON attempts(concept_id, created_at);
  CREATE INDEX idx_attempts_question ON attempts(question_id);
  CREATE TABLE diagnostics (
    id INTEGER PRIMARY KEY AUTOINCREMENT, target_id TEXT NOT NULL, scope TEXT NOT NULL,
    status TEXT NOT NULL, score REAL, result TEXT, created_at TEXT NOT NULL, completed_at TEXT);
  CREATE TABLE diagnostic_items (
    diagnostic_id INTEGER NOT NULL, idx INTEGER NOT NULL, question_id TEXT NOT NULL, prereq_id TEXT NOT NULL,
    response TEXT, correct INTEGER, PRIMARY KEY (diagnostic_id, idx));
  CREATE TABLE prereq_gaps (
    concept_id TEXT NOT NULL, for_concept_id TEXT NOT NULL, diagnostic_id INTEGER,
    detected_at TEXT NOT NULL, resolved_at TEXT, PRIMARY KEY (concept_id, for_concept_id));
  CREATE TABLE review_schedule (
    concept_id TEXT PRIMARY KEY, ease REAL NOT NULL DEFAULT 2.5, interval_days REAL NOT NULL DEFAULT 0,
    reps INTEGER NOT NULL DEFAULT 0, lapses INTEGER NOT NULL DEFAULT 0, due_at TEXT NOT NULL,
    last_review_at TEXT, last_accuracy REAL);
  CREATE TABLE revision_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT, items TEXT NOT NULL, result TEXT, created_at TEXT NOT NULL, completed_at TEXT);
  CREATE TABLE tests (
    id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, kind TEXT NOT NULL, config TEXT NOT NULL,
    duration_sec INTEGER NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL, started_at TEXT,
    submitted_at TEXT, auto_submitted INTEGER NOT NULL DEFAULT 0, score REAL, max_score REAL, report TEXT);
  CREATE TABLE test_items (
    test_id INTEGER NOT NULL, idx INTEGER NOT NULL, question_id TEXT NOT NULL, section TEXT NOT NULL,
    marks INTEGER NOT NULL, negative REAL NOT NULL, response TEXT, state TEXT NOT NULL DEFAULT 'not_visited',
    time_ms INTEGER NOT NULL DEFAULT 0, correct INTEGER, awarded REAL, PRIMARY KEY (test_id, idx));
  CREATE TABLE bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, ref_id TEXT NOT NULL, note TEXT,
    created_at TEXT NOT NULL, UNIQUE (kind, ref_id));
  CREATE TABLE formula_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT, concept_id TEXT, title TEXT NOT NULL, latex TEXT NOT NULL,
    note TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
  CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT, concept_id TEXT, title TEXT NOT NULL, body TEXT NOT NULL,
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
  CREATE TABLE daily_stats (
    day TEXT PRIMARY KEY, study_seconds INTEGER NOT NULL DEFAULT 0, questions INTEGER NOT NULL DEFAULT 0,
    correct INTEGER NOT NULL DEFAULT 0, lessons_completed INTEGER NOT NULL DEFAULT 0,
    concepts_mastered INTEGER NOT NULL DEFAULT 0);
  CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
  CREATE TABLE ai_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT, concept_id TEXT, role TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL);
  CREATE TABLE ai_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT, provider TEXT, model TEXT, purpose TEXT,
    input_tokens INTEGER, output_tokens INTEGER, created_at TEXT NOT NULL);
  `,
];
