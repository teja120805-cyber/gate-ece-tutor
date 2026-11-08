import { test } from "node:test";
import assert from "node:assert/strict";
import { isCorrect, gateMarks, isAnswered } from "../lib/scoring.ts";
import { computeMastery, type AttemptLite, type QuestionLite, type PrevState } from "../lib/mastery-core.ts";
import { checkContent } from "../seed.ts";

const DAY = 86_400_000;
const prev = (status: PrevState["status"] = "not_started"): PrevState =>
  ({ status, lessonOpened: true, needsRelearn: false, lessonCompletedAt: null, relearnFlaggedAt: null });

test("built-in content validates (ids, prerequisites DAG, questions)", () => {
  assert.deepEqual(checkContent(), []);
});

test("GATE marking: MCQ negative 1/3, MSQ/NAT no negative, MSQ no partial credit", () => {
  const mcq = { type: "MCQ" as const, answer: [2], range_min: null, range_max: null, marks: 2 };
  assert.equal(gateMarks(mcq, { selected: [2] }), 2);
  assert.ok(Math.abs(gateMarks(mcq, { selected: [1] }) + 2 / 3) < 1e-12);
  assert.equal(gateMarks(mcq, {}), 0);
  const msq = { type: "MSQ" as const, answer: [0, 2], range_min: null, range_max: null, marks: 2 };
  assert.equal(gateMarks(msq, { selected: [2, 0] }), 2);
  assert.equal(gateMarks(msq, { selected: [0] }), 0); // partial → zero, not negative
  assert.equal(gateMarks(msq, { selected: [0, 1, 2] }), 0);
  const nat = { type: "NAT" as const, answer: null, range_min: 0.86, range_max: 0.87, marks: 1 };
  assert.equal(gateMarks(nat, { value: 0.865 }), 1);
  assert.equal(gateMarks(nat, { value: 0.9 }), 0);
  assert.equal(isAnswered("NAT", { value: null }), false);
  assert.equal(isCorrect(nat, { value: 0.87 }), true);
});

function attempts(spec: { q: string; ok: boolean; day: number; mode?: AttemptLite["mode"]; hints?: number }[]): AttemptLite[] {
  const base = Date.now() - 30 * DAY;
  return spec.map((s) => ({ questionId: s.q, correct: s.ok, hintsUsed: s.hints ?? 0, mode: s.mode ?? "learning", at: new Date(base + s.day * DAY) }));
}
const meta = (n: number, patterns = ["a", "b"]): Map<string, QuestionLite> =>
  new Map(Array.from({ length: n }, (_, i) => [`q${i}`, { difficulty: 2, pattern: patterns[i % patterns.length], type: "MCQ" }]));

test("reading alone never masters; a single correct answer gives a low score", () => {
  assert.equal(computeMastery([], meta(0), prev()).status, "learning");
  const r = computeMastery(attempts([{ q: "q0", ok: true, day: 29 }]), meta(1), prev());
  assert.equal(r.status, "learning");
  assert.ok(r.score <= 45, `score ${r.score}`);
});

test("repeating the same question correctly does not inflate mastery", () => {
  const once = computeMastery(attempts([{ q: "q0", ok: true, day: 29 }]), meta(1), prev());
  const many = computeMastery(attempts(Array.from({ length: 20 }, () => ({ q: "q0", ok: true, day: 29 }))), meta(1), prev());
  assert.equal(many.distinct, 1);
  assert.equal(many.score, once.score);
  assert.notEqual(many.status, "mastered");
});

test("mastery requires accuracy, variety AND a later-day retention check", () => {
  const practice = Array.from({ length: 6 }, (_, i) => ({ q: `q${i}`, ok: true, day: 20 }));
  const noRetention = computeMastery(attempts(practice), meta(8), prev("practicing"));
  assert.equal(noRetention.meetsCriteria, true);
  assert.equal(noRetention.readyForRetention, true);
  assert.equal(noRetention.status, "practicing");
  assert.ok(noRetention.score <= 89, "score stays below 90 until retention is shown");
  const withRetention = computeMastery(attempts([...practice,
    { q: "q6", ok: true, day: 23, mode: "revision" }, { q: "q7", ok: true, day: 23, mode: "revision" }]), meta(8), prev("practicing"));
  assert.equal(withRetention.status, "mastered");
});

test("only one question pattern caps the score below mastery", () => {
  const r = computeMastery(attempts(Array.from({ length: 6 }, (_, i) => ({ q: `q${i}`, ok: true, day: 20 }))), meta(6, ["same"]), prev());
  assert.ok(r.score <= 79);
  assert.equal(r.meetsCriteria, false);
});

test("failing revision after mastery downgrades the concept", () => {
  const spec = [
    ...Array.from({ length: 6 }, (_, i) => ({ q: `q${i}`, ok: true, day: 10 })),
    { q: "q6", ok: true, day: 12, mode: "revision" as const }, { q: "q7", ok: true, day: 12, mode: "revision" as const },
    { q: "q8", ok: false, day: 25, mode: "revision" as const }, { q: "q9", ok: false, day: 25, mode: "revision" as const },
    { q: "q10", ok: false, day: 25, mode: "revision" as const },
  ];
  const r = computeMastery(attempts(spec), meta(11), prev("mastered"));
  assert.notEqual(r.status, "mastered");
  assert.ok(r.changeReason && /Retention|dropped/.test(r.changeReason));
});

test("hints reduce credit", () => {
  const clean = computeMastery(attempts(Array.from({ length: 5 }, (_, i) => ({ q: `q${i}`, ok: true, day: 29 }))), meta(5), prev());
  const hinted = computeMastery(attempts(Array.from({ length: 5 }, (_, i) => ({ q: `q${i}`, ok: true, day: 29, hints: 2 }))), meta(5), prev());
  assert.ok(hinted.accuracy < clean.accuracy);
});
