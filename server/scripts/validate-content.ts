// Validates built-in content without touching the database: npm run validate-content
import { checkContent, loadLessonFiles } from "../seed.ts";
import { QUESTIONS } from "../../content/questions/index.ts";
import { allConcepts } from "../../content/syllabus.ts";

const errors = checkContent();
const concepts = allConcepts();
const lessons = loadLessonFiles();
const qByConcept = new Map<string, number>();
for (const q of QUESTIONS) qByConcept.set(q.concept, (qByConcept.get(q.concept) ?? 0) + 1);

console.log(`Concepts: ${concepts.length}  Lessons: ${lessons.size}  Questions: ${QUESTIONS.length}`);
const thin = [...lessons.keys()].filter((id) => (qByConcept.get(id) ?? 0) < 5);
if (thin.length) console.log(`Lessons with fewer than 5 questions (mastery needs 5 distinct): ${thin.join(", ")}`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n - ${errors.join("\n - ")}`);
  process.exit(1);
}
console.log("Content OK");
