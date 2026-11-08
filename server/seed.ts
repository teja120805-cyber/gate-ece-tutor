// Loads built-in content (syllabus, lessons, questions, formulas) into SQLite on every start.
// Learner data is never touched; AI-generated and imported content is preserved.
import fs from "node:fs";
import path from "node:path";
import { run, tx, nowIso, all } from "./db.ts";
import { LESSON_DIR, IS_EXE } from "./paths.ts";
import { embeddedFiles } from "./webapp.ts";
import { SYLLABUS } from "../content/syllabus.ts";
import { QUESTIONS } from "../content/questions/index.ts";
import { FORMULAS } from "../content/formulas.ts";
import { validateContent } from "./lib/validate.ts";

export function loadLessonFiles(): Map<string, string> {
  const m = new Map<string, string>();
  if (IS_EXE) {
    // The .exe carries the lessons inside it (see scripts/build-exe.mjs).
    for (const [f, buf] of embeddedFiles("lessons/")) if (f.endsWith(".md")) m.set(f.slice(0, -3), buf.toString("utf8"));
    return m;
  }
  if (!fs.existsSync(LESSON_DIR)) return m;
  for (const f of fs.readdirSync(LESSON_DIR)) {
    if (!f.endsWith(".md")) continue;
    m.set(f.slice(0, -3), fs.readFileSync(path.join(LESSON_DIR, f), "utf8"));
  }
  return m;
}

export function checkContent(): string[] {
  const lessons = loadLessonFiles();
  return validateContent(SYLLABUS, QUESTIONS, FORMULAS, [...lessons.keys()]);
}

export function seedContent() {
  const errors = checkContent();
  if (errors.length) {
    throw new Error(`Built-in content failed validation:\n  - ${errors.slice(0, 30).join("\n  - ")}${errors.length > 30 ? `\n  ...and ${errors.length - 30} more` : ""}`);
  }
  const lessons = loadLessonFiles();
  const now = nowIso();
  tx(() => {
    for (const tbl of ["concept_prereqs", "formulas", "concepts", "topics", "chapters", "subjects"]) run(`DELETE FROM ${tbl}`);
    SYLLABUS.forEach((s, si) => {
      run("INSERT INTO subjects(id, name, short, gate_section, description, exam_weight, ord) VALUES(?,?,?,?,?,?,?)",
        s.id, s.name, s.short, s.gateSection, s.description, s.examWeight, si);
      s.chapters.forEach((ch, ci) => {
        run("INSERT INTO chapters(id, subject_id, name, ord) VALUES(?,?,?,?)", ch.id, s.id, ch.name, ci);
        ch.topics.forEach((t, ti) => {
          run("INSERT INTO topics(id, chapter_id, name, ord) VALUES(?,?,?,?)", t.id, ch.id, t.name, ti);
          t.concepts.forEach((c, k) => {
            run("INSERT INTO concepts(id, topic_id, name, summary, weight, ord) VALUES(?,?,?,?,?,?)", c.id, t.id, c.name, c.summary, c.weight ?? 2, k);
            for (const p of c.prereqs ?? []) run("INSERT INTO concept_prereqs(concept_id, prereq_id) VALUES(?,?)", c.id, p);
          });
        });
      });
    });
    FORMULAS.forEach((f, i) => run("INSERT INTO formulas(id, concept_id, title, latex, note, ord) VALUES(?,?,?,?,?,?)",
      f.id, f.concept, f.title, f.latex, f.note ?? null, i));

    // Built-in lessons replace earlier built-in versions; AI/user lessons are kept unless a built-in now exists.
    for (const [cid, content] of lessons) {
      run(`INSERT INTO lessons(concept_id, content, source, model, updated_at) VALUES(?,?,'builtin',NULL,?)
           ON CONFLICT(concept_id) DO UPDATE SET content = excluded.content, source = 'builtin', model = NULL, updated_at = excluded.updated_at
           WHERE lessons.source = 'builtin' OR lessons.content <> excluded.content`, cid, content, now);
    }
    const keep = new Set(lessons.keys());
    for (const r of all<{ concept_id: string }>("SELECT concept_id FROM lessons WHERE source = 'builtin'"))
      if (!keep.has(r.concept_id)) run("DELETE FROM lessons WHERE concept_id = ?", r.concept_id);

    // Built-in questions are upserted; removed ones are deactivated (attempt history stays valid).
    run("UPDATE questions SET active = 0 WHERE builtin = 1");
    for (const q of QUESTIONS) {
      run(`INSERT INTO questions(id, concept_id, type, difficulty, marks, pattern, stem, options, answer, range_min, range_max,
             solution, hints, diagnostic, source, source_ref, builtin, active, created_at)
           VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,1,?)
           ON CONFLICT(id) DO UPDATE SET concept_id = excluded.concept_id, type = excluded.type, difficulty = excluded.difficulty,
             marks = excluded.marks, pattern = excluded.pattern, stem = excluded.stem, options = excluded.options,
             answer = excluded.answer, range_min = excluded.range_min, range_max = excluded.range_max,
             solution = excluded.solution, hints = excluded.hints, diagnostic = excluded.diagnostic,
             source = excluded.source, source_ref = excluded.source_ref, builtin = 1, active = 1`,
        q.id, q.concept, q.type, q.difficulty, q.marks, q.pattern, q.stem.trim(),
        q.options ? JSON.stringify(q.options) : null, q.answer ? JSON.stringify(q.answer) : null,
        q.range?.[0] ?? null, q.range?.[1] ?? null, q.solution.trim(), JSON.stringify(q.hints ?? []),
        q.diagnostic ? 1 : 0, q.source ?? "practice", q.sourceRef ?? null, now);
    }
  });
  return { subjects: SYLLABUS.length, lessons: lessons.size, questions: QUESTIONS.length, formulas: FORMULAS.length };
}
