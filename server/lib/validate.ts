// Validation for built-in content, imported question banks and AI-generated questions.
import type { QuestionDef, SubjectDef, FormulaDef } from "../../content/types.ts";

export function validateQuestion(q: Partial<QuestionDef>, conceptIds?: Set<string>): string[] {
  const e: string[] = [];
  const id = q.id ?? "(new question)";
  if (!q.concept || (conceptIds && !conceptIds.has(q.concept))) e.push(`${id}: unknown concept "${q.concept}"`);
  if (!["MCQ", "MSQ", "NAT"].includes(q.type as string)) e.push(`${id}: type must be MCQ, MSQ or NAT`);
  if (![1, 2, 3].includes(q.difficulty as number)) e.push(`${id}: difficulty must be 1, 2 or 3`);
  if (![1, 2].includes(q.marks as number)) e.push(`${id}: marks must be 1 or 2`);
  if (!q.stem?.trim()) e.push(`${id}: empty stem`);
  if (!q.solution?.trim()) e.push(`${id}: empty solution`);
  if (!q.pattern?.trim()) e.push(`${id}: missing pattern`);
  if (q.type === "MCQ" || q.type === "MSQ") {
    if (!Array.isArray(q.options) || q.options.length !== 4 || q.options.some((o) => typeof o !== "string" || !o.trim()))
      e.push(`${id}: ${q.type} needs exactly 4 non-empty options`);
    const a = q.answer;
    if (!Array.isArray(a) || !a.length || a.some((i) => !Number.isInteger(i) || i < 0 || i > 3)) e.push(`${id}: answer must list option indices 0–3`);
    else if (new Set(a).size !== a.length) e.push(`${id}: duplicate answer indices`);
    else if (q.type === "MCQ" && a.length !== 1) e.push(`${id}: MCQ must have exactly one correct option`);
    if (q.range) e.push(`${id}: ${q.type} must not have a range`);
  }
  if (q.type === "NAT") {
    const r = q.range;
    if (!Array.isArray(r) || r.length !== 2 || !r.every((x) => typeof x === "number" && Number.isFinite(x)) || r[0] > r[1])
      e.push(`${id}: NAT needs range [low, high] with low ≤ high`);
    if (q.options?.length) e.push(`${id}: NAT must not have options`);
  }
  if (q.hints && (!Array.isArray(q.hints) || q.hints.some((h) => typeof h !== "string"))) e.push(`${id}: hints must be strings`);
  return e;
}

export function validateContent(subjects: SubjectDef[], questions: QuestionDef[], formulas: FormulaDef[], lessonIds: string[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const conceptIds = new Set<string>();
  const prereqs = new Map<string, string[]>();
  const dup = (id: string) => { if (ids.has(id)) errors.push(`Duplicate id "${id}"`); ids.add(id); };
  for (const s of subjects) {
    dup(s.id);
    for (const ch of s.chapters) {
      dup(ch.id);
      for (const t of ch.topics) {
        dup(t.id);
        for (const c of t.concepts) { dup(c.id); conceptIds.add(c.id); prereqs.set(c.id, c.prereqs ?? []); }
      }
    }
  }
  for (const [id, ps] of prereqs) for (const p of ps) {
    if (!conceptIds.has(p)) errors.push(`Concept "${id}" has unknown prerequisite "${p}"`);
    if (p === id) errors.push(`Concept "${id}" lists itself as a prerequisite`);
  }
  // Cycle detection (the prerequisite graph must be a DAG).
  const state = new Map<string, 0 | 1 | 2>();
  const visit = (id: string, path: string[]) => {
    const st = state.get(id) ?? 0;
    if (st === 2) return;
    if (st === 1) { errors.push(`Prerequisite cycle: ${[...path, id].join(" → ")}`); return; }
    state.set(id, 1);
    for (const p of prereqs.get(id) ?? []) if (conceptIds.has(p)) visit(p, [...path, id]);
    state.set(id, 2);
  };
  for (const id of conceptIds) visit(id, []);

  const qids = new Set<string>();
  for (const q of questions) {
    if (qids.has(q.id)) errors.push(`Duplicate question id "${q.id}"`);
    qids.add(q.id);
    errors.push(...validateQuestion(q, conceptIds));
  }
  const fids = new Set<string>();
  for (const f of formulas) {
    if (fids.has(f.id)) errors.push(`Duplicate formula id "${f.id}"`);
    fids.add(f.id);
    if (!conceptIds.has(f.concept)) errors.push(`Formula "${f.id}" has unknown concept "${f.concept}"`);
  }
  for (const l of lessonIds) if (!conceptIds.has(l)) errors.push(`Lesson file "${l}.md" does not match any concept id`);
  return errors;
}
