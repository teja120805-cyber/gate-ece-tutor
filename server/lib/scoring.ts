// Answer checking and the GATE marking scheme.
// GATE: MCQ wrong answers lose 1/3 of the question's marks; MSQ and NAT have no negative
// marking; MSQ gives no partial credit (all and only the correct options must be chosen).
import type { QResponse, QType } from "../../shared/types.ts";

export interface Gradable {
  type: QType;
  answer: number[] | null;
  range_min: number | null;
  range_max: number | null;
}

export function isAnswered(type: QType, r: QResponse | null | undefined): boolean {
  if (!r) return false;
  if (type === "NAT") return typeof r.value === "number" && Number.isFinite(r.value);
  return Array.isArray(r.selected) && r.selected.length > 0;
}

export function isCorrect(q: Gradable, r: QResponse | null | undefined): boolean {
  if (!isAnswered(q.type, r)) return false;
  if (q.type === "NAT") {
    if (q.range_min == null || q.range_max == null) return false;
    const v = r!.value as number;
    const eps = 1e-9 * Math.max(1, Math.abs(q.range_max));
    return v >= q.range_min - eps && v <= q.range_max + eps;
  }
  const sel = [...new Set(r!.selected!)].sort((a, b) => a - b);
  const ans = [...new Set(q.answer ?? [])].sort((a, b) => a - b);
  if (q.type === "MCQ") return sel.length === 1 && ans.length === 1 && sel[0] === ans[0];
  return sel.length === ans.length && sel.every((v, i) => v === ans[i]);
}

export function negativeMarks(type: QType, marks: number): number {
  return type === "MCQ" ? marks / 3 : 0;
}

/** Marks awarded for a response under GATE rules. */
export function gateMarks(q: Gradable & { marks: number }, r: QResponse | null | undefined): number {
  if (!isAnswered(q.type, r)) return 0;
  if (isCorrect(q, r)) return q.marks;
  const neg = negativeMarks(q.type, q.marks);
  return neg > 0 ? -neg : 0;
}

export function round2(n: number) { return Math.round(n * 100) / 100; }
