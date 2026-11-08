// "What should I study next?" — combines diagnostic gaps, spaced repetition, mastery and syllabus order.
import { all, get, getSetting } from "../db.ts";
import { allProgress, readyForRetentionSet } from "./progress.ts";
import { dueConcepts } from "./srs.ts";
import type { Recommendation } from "../../shared/types.ts";

interface CRow { id: string; name: string; subject_name: string; weight: number; ord_key: string }

export function recommendations(limit = 8): Recommendation[] {
  const concepts = all<CRow>(
    `SELECT c.id, c.name, s.name AS subject_name, c.weight,
       printf('%03d-%03d-%03d-%03d', s.ord, ch.ord, t.ord, c.ord) AS ord_key
     FROM concepts c JOIN topics t ON t.id = c.topic_id JOIN chapters ch ON ch.id = t.chapter_id JOIN subjects s ON s.id = ch.subject_id
     ORDER BY ord_key`);
  const byId = new Map(concepts.map((c) => [c.id, c]));
  const prog = allProgress();
  const out: Recommendation[] = [];
  const seen = new Set<string>();
  const add = (kind: Recommendation["kind"], id: string, reason: string) => {
    const c = byId.get(id);
    if (!c || seen.has(id)) return;
    seen.add(id);
    out.push({ kind, conceptId: id, conceptName: c.name, subjectName: c.subject_name, reason });
  };

  // 1. Unresolved prerequisite gaps found by diagnostics.
  for (const g of all<{ concept_id: string; for_concept_id: string }>(
    "SELECT concept_id, for_concept_id FROM prereq_gaps WHERE resolved_at IS NULL ORDER BY detected_at DESC")) {
    add("gap", g.concept_id, `Foundation gap found by diagnostic — needed for ${byId.get(g.for_concept_id)?.name ?? "a later concept"}`);
  }
  // 2. Concepts flagged for relearning after a collapse.
  for (const [id, p] of prog) if (p.needs_relearn) add("relearn", id, `Performance dropped (score ${Math.round(p.score)}) — re-read the lesson, then practise`);
  // 3. Retention checks + due reviews.
  const ready = readyForRetentionSet();
  for (const d of dueConcepts(20)) {
    add(ready.has(d.concept_id) ? "retention" : "revision", d.concept_id,
      ready.has(d.concept_id) ? "Retention check due — pass it to reach Mastered" : "Spaced revision due");
  }
  // 4. Continue the lesson you were reading.
  const last = getSetting<{ conceptId: string } | null>("last_location", null);
  if (last && prog.get(last.conceptId)?.status !== "mastered") add("continue", last.conceptId, "Continue where you left off");
  // 5. Weak practised concepts.
  [...prog.values()].filter((p) => p.status === "practicing" || (p.status === "learning" && p.distinct_questions > 0))
    .sort((a, b) => a.score - b.score).slice(0, 3)
    .forEach((p) => add("practice", p.concept_id, `Mastery ${Math.round(p.score)}/100 — practise with new questions`));
  // 6. Next new concepts whose prerequisites are in reasonable shape, prioritising high-weight topics.
  const prereqs = new Map<string, string[]>();
  for (const r of all<{ concept_id: string; prereq_id: string }>("SELECT concept_id, prereq_id FROM concept_prereqs")) {
    if (!prereqs.has(r.concept_id)) prereqs.set(r.concept_id, []);
    prereqs.get(r.concept_id)!.push(r.prereq_id);
  }
  const hasLesson = new Set(all<{ concept_id: string }>("SELECT concept_id FROM lessons").map((r) => r.concept_id));
  const unlocked = concepts.filter((c) => (prog.get(c.id)?.status ?? "not_started") === "not_started" &&
    (prereqs.get(c.id) ?? []).every((p) => {
      const pp = prog.get(p);
      return pp && (pp.status === "mastered" || pp.status === "practicing" || pp.score >= 50);
    }));
  unlocked.sort((a, b) => Number(hasLesson.has(b.id)) - Number(hasLesson.has(a.id)) || b.weight - a.weight || a.ord_key.localeCompare(b.ord_key));
  for (const c of unlocked.slice(0, 4)) {
    const pr = prereqs.get(c.id) ?? [];
    add("new", c.id, pr.length ? "All prerequisites are in place" : "Foundation concept — a good place to start");
  }
  return out.slice(0, limit);
}

export function lastLocation() {
  const last = getSetting<{ conceptId: string; at: string } | null>("last_location", null);
  if (!last) return null;
  const c = get<{ name: string }>("SELECT name FROM concepts WHERE id = ?", last.conceptId);
  if (!c) return null;
  const p = get<{ last_position: number }>("SELECT last_position FROM concept_progress WHERE concept_id = ?", last.conceptId);
  return { conceptId: last.conceptId, conceptName: c.name, position: p?.last_position ?? 0, at: last.at };
}
