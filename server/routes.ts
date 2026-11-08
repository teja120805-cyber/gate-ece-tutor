import express, { type Request, type Response, type NextFunction } from "express";
import { all, get, run, nowIso, getSetting, setSetting, dbFileInfo } from "./db.ts";
import { syllabusTree, streaks, today, analytics } from "./lib/stats.ts";
import { progressRow, toProgressInfo, markLesson, bumpDaily, readyForRetentionSet } from "./lib/progress.ts";
import { HttpError, nextQuestion, questionRow, recordAttempt, toPublic, conceptMeta } from "./lib/questions.ts";
import { prereqCheck, createDiagnostic, getDiagnostic, submitDiagnostic, skipDiagnostic, diagnosticHistory } from "./lib/diagnostics.ts";
import { createRevision, getRevision, answerRevision, completeRevision } from "./lib/revision.ts";
import { dueConcepts, upcoming } from "./lib/srs.ts";
import { createTest, startTest, takeView, saveState, submitTest, reportView, listTests, deleteTest, activeTest } from "./lib/exams.ts";
import { recommendations, lastLocation } from "./lib/recommend.ts";
import { aiStatus, chat, extractJson, AIError } from "./lib/ai.ts";
import { TUTOR_SYSTEM, LESSON_SYSTEM, QUESTIONS_SYSTEM } from "./lib/prompts.ts";
import { validateQuestion } from "./lib/validate.ts";
import { exportAll, importAll, createBackup, listBackups, backupPath, restoreBackup, saveUploadedBackup, performanceCsv } from "./lib/backup.ts";
import type { QResponse } from "../shared/types.ts";
import { IS_EXE, DATA_DIR, ENV_FILE } from "./paths.ts";

export const api = express.Router();
type H = (req: Request, res: Response) => unknown;
const wrap = (fn: H) => async (req: Request, res: Response, next: NextFunction) => {
  try { const out = await fn(req, res); if (!res.headersSent) res.json(out ?? { ok: true }); } catch (e) { next(e); }
};
const p = (req: Request, k: string) => String(req.params[k]);
const num = (v: unknown, d: number) => (Number.isFinite(Number(v)) ? Number(v) : d);

function assertNoActiveExam() {
  const t = activeTest();
  if (t) throw new HttpError(423, `Exam in progress ("${t.title}"). Hints and AI assistance are disabled until you submit.`);
}

function conceptsFull(id: string) {
  return get<{ id: string; name: string; summary: string; weight: number; topic_id: string; topic_name: string; chapter_id: string;
    chapter_name: string; subject_id: string; subject_name: string }>(
    `SELECT c.id, c.name, c.summary, c.weight, t.id AS topic_id, t.name AS topic_name, ch.id AS chapter_id, ch.name AS chapter_name,
       s.id AS subject_id, s.name AS subject_name
     FROM concepts c JOIN topics t ON t.id = c.topic_id JOIN chapters ch ON ch.id = t.chapter_id JOIN subjects s ON s.id = ch.subject_id
     WHERE c.id = ?`, id);
}

// ───────── overview / syllabus ─────────
api.get("/health", wrap(() => ({ ok: true, app: "gate-ece-tutor", time: nowIso() })));

api.get("/overview", wrap(async () => {
  const tree = syllabusTree();
  return {
    streak: streaks(), today: today(), recommendations: recommendations(8), lastLocation: lastLocation(),
    dueCount: dueConcepts(500).length, activeTest: activeTest(),
    subjects: tree.map((s) => ({ id: s.id, name: s.name, short: s.short, rollup: s.rollup })),
    prefs: prefs(), ai: await aiStatus(),
  };
}));

api.get("/syllabus", wrap(() => syllabusTree()));

api.get("/concepts/:id", wrap((req) => {
  const id = p(req, "id");
  const c = conceptsFull(id);
  if (!c) throw new HttpError(404, "Concept not found");
  const nameStatus = (cid: string) => {
    const n = get<{ name: string }>("SELECT name FROM concepts WHERE id = ?", cid);
    const pr = progressRow(cid);
    return { id: cid, name: n?.name ?? cid, status: pr?.status ?? "not_started", score: pr?.score ?? 0 };
  };
  const lesson = get<{ content: string; source: string; model: string | null; updated_at: string }>("SELECT * FROM lessons WHERE concept_id = ?", id);
  const counts = get<{ n: number; pyq: number; ai: number }>(
    "SELECT COUNT(*) AS n, SUM(source = 'official-pyq') AS pyq, SUM(source = 'ai-generated') AS ai FROM questions WHERE concept_id = ? AND active = 1", id)!;
  return {
    ...c,
    prereqs: all<{ prereq_id: string }>("SELECT prereq_id FROM concept_prereqs WHERE concept_id = ?", id).map((r) => nameStatus(r.prereq_id)),
    dependents: all<{ concept_id: string }>("SELECT concept_id FROM concept_prereqs WHERE prereq_id = ?", id).map((r) => nameStatus(r.concept_id)),
    lesson: lesson ? { content: lesson.content, source: lesson.source, model: lesson.model, updatedAt: lesson.updated_at } : null,
    formulas: all("SELECT id, title, latex, note FROM formulas WHERE concept_id = ? ORDER BY ord", id),
    progress: toProgressInfo(progressRow(id), { readyForRetention: readyForRetentionSet().has(id) }),
    questionCount: counts.n, pyqCount: counts.pyq ?? 0, aiQuestionCount: counts.ai ?? 0,
    bookmarked: !!get("SELECT 1 FROM bookmarks WHERE kind = 'concept' AND ref_id = ?", id),
    review: get("SELECT due_at, interval_days, reps, last_accuracy FROM review_schedule WHERE concept_id = ?", id) ?? null,
    gaps: all<{ concept_id: string }>("SELECT concept_id FROM prereq_gaps WHERE for_concept_id = ? AND resolved_at IS NULL", id)
      .map((g) => nameStatus(g.concept_id)),
    siblings: all<{ id: string; name: string }>("SELECT id, name FROM concepts WHERE topic_id = ? ORDER BY ord", c.topic_id),
  };
}));

api.post("/concepts/:id/lesson-event", wrap((req) => {
  const id = p(req, "id");
  if (!conceptsFull(id)) throw new HttpError(404, "Concept not found");
  const { event, position } = req.body ?? {};
  if (!["open", "complete", "position"].includes(event)) throw new HttpError(400, "Invalid event");
  markLesson(id, event, position);
  setSetting("last_location", { conceptId: id, at: nowIso() });
  return { ok: true, progress: toProgressInfo(progressRow(id)) };
}));

// ───────── prerequisites & diagnostics ─────────
api.get("/concepts/:id/prereq-check", wrap((req) => prereqCheck(p(req, "id"), "concept")));
api.get("/chapters/:id/prereq-check", wrap((req) => prereqCheck(p(req, "id"), "chapter")));
api.get("/diagnostics", wrap(() => diagnosticHistory()));
api.post("/diagnostics", wrap((req) => createDiagnostic(String(req.body?.targetId), req.body?.scope === "chapter" ? "chapter" : "concept")));
api.post("/diagnostics/skip", wrap((req) => skipDiagnostic(String(req.body?.targetId), req.body?.scope === "chapter" ? "chapter" : "concept")));
api.get("/diagnostics/:id", wrap((req) => getDiagnostic(num(p(req, "id"), 0))));
api.post("/diagnostics/:id/submit", wrap((req) => submitDiagnostic(num(p(req, "id"), 0), req.body?.responses ?? {}, req.body?.timeMs ?? {})));

// ───────── learning-mode practice ─────────
api.get("/practice/:conceptId/next", wrap((req) => {
  const exclude = String(req.query.exclude ?? "").split(",").filter(Boolean);
  const r = nextQuestion(p(req, "conceptId"), exclude);
  return { ...r, question: r.question ? toPublic(r.question, false) : null };
}));

api.get("/questions/:id/hints", wrap((req) => {
  assertNoActiveExam();
  const q = questionRow(p(req, "id"));
  if (!q) throw new HttpError(404, "Question not found");
  const hints = JSON.parse(q.hints) as string[];
  return { hints: hints.slice(0, Math.max(1, num(req.query.n, 1))), total: hints.length };
}));

api.post("/questions/:id/attempt", wrap((req) => {
  assertNoActiveExam();
  const id = p(req, "id");
  const before = progressRow(questionRow(id)?.concept_id ?? "")?.status ?? "not_started";
  const { response, timeMs, hintsUsed } = req.body ?? {};
  const { q, correct, mastery } = recordAttempt({ questionId: id, response: (response ?? {}) as QResponse, mode: "learning", timeMs, hintsUsed });
  const pub = toPublic(q, true);
  return { correct, answer: pub.answer, range: pub.range, solution: pub.solution,
    mastery: { score: mastery!.score, status: mastery!.status, previousStatus: before } };
}));

api.get("/questions/:id", wrap((req) => {
  const q = questionRow(p(req, "id"));
  if (!q) throw new HttpError(404, "Question not found");
  // Answers are revealed only for questions already attempted outside an in-progress exam.
  const attempted = !!get("SELECT 1 FROM attempts WHERE question_id = ?", q.id);
  return toPublic(q, attempted && !activeTest(), { conceptName: conceptMeta(q.concept_id)?.name });
}));

// ───────── revision ─────────
api.get("/revision/summary", wrap(() => {
  const ready = readyForRetentionSet();
  const due = dueConcepts(200).map((d) => {
    const c = conceptMeta(d.concept_id);
    const pr = progressRow(d.concept_id);
    return { ...d, name: c?.name ?? d.concept_id, subject: c?.subject_name, score: pr?.score ?? 0, status: pr?.status, retentionCheck: ready.has(d.concept_id) };
  });
  const recent = all("SELECT id, created_at, completed_at, result FROM revision_sessions ORDER BY id DESC LIMIT 10")
    .map((r: any) => ({ ...r, result: r.result ? JSON.parse(r.result) : null }));
  return { due, upcoming: upcoming(14), recent };
}));
api.post("/revision", wrap((req) => createRevision(req.body?.kind === "weak" ? "weak" : "due", num(req.body?.limit, 6))));
api.get("/revision/:id", wrap((req) => getRevision(num(p(req, "id"), 0))));
api.post("/revision/:id/answer", wrap((req) => {
  assertNoActiveExam();
  return answerRevision(num(p(req, "id"), 0), num(req.body?.idx, -1), req.body?.response ?? {}, num(req.body?.timeMs, 0));
}));
api.post("/revision/:id/complete", wrap((req) => completeRevision(num(p(req, "id"), 0))));

// ───────── exam mode ─────────
api.get("/tests", wrap(() => ({ tests: listTests(), active: activeTest() })));
api.post("/tests", wrap((req) => createTest(req.body ?? {})));
api.post("/tests/:id/start", wrap((req) => startTest(num(p(req, "id"), 0))));
api.get("/tests/:id", wrap((req) => takeView(num(p(req, "id"), 0))));
api.put("/tests/:id/state", wrap((req) => saveState(num(p(req, "id"), 0), Array.isArray(req.body?.items) ? req.body.items : [])));
api.post("/tests/:id/submit", wrap((req) => submitTest(num(p(req, "id"), 0), !!req.body?.auto)));
api.get("/tests/:id/report", wrap((req) => reportView(num(p(req, "id"), 0))));
api.delete("/tests/:id", wrap((req) => deleteTest(num(p(req, "id"), 0))));

// ───────── analytics ─────────
api.get("/analytics", wrap((req) => ({ ...analytics(Math.min(365, Math.max(7, num(req.query.days, 30)))), streak: streaks() })));
api.post("/stats/heartbeat", wrap((req) => {
  const s = Math.max(0, Math.min(90, Math.round(num(req.body?.seconds, 0))));
  if (s > 0) bumpDaily("study_seconds", s);
  return { ok: true };
}));

// ───────── notebook: bookmarks, notes, formulas ─────────
api.get("/bookmarks", wrap(() => all<{ id: number; kind: string; ref_id: string; note: string | null; created_at: string }>(
  "SELECT * FROM bookmarks ORDER BY id DESC").map((b) => {
    let label = b.ref_id, conceptId: string | null = null;
    if (b.kind === "concept") { label = get<{ name: string }>("SELECT name FROM concepts WHERE id = ?", b.ref_id)?.name ?? b.ref_id; conceptId = b.ref_id; }
    if (b.kind === "question") { const q = questionRow(b.ref_id); conceptId = q?.concept_id ?? null; label = q ? q.stem.slice(0, 140) : b.ref_id; }
    if (b.kind === "formula") { const f = get<{ title: string; concept_id: string }>("SELECT title, concept_id FROM formulas WHERE id = ?", b.ref_id); label = f?.title ?? b.ref_id; conceptId = f?.concept_id ?? null; }
    return { ...b, label, conceptId };
  })));
api.post("/bookmarks", wrap((req) => {
  const { kind, refId, note } = req.body ?? {};
  if (!["concept", "question", "formula"].includes(kind) || !refId) throw new HttpError(400, "kind and refId are required");
  run("INSERT INTO bookmarks(kind, ref_id, note, created_at) VALUES(?,?,?,?) ON CONFLICT(kind, ref_id) DO UPDATE SET note = excluded.note",
    kind, String(refId), note ?? null, nowIso());
  return { ok: true };
}));
api.delete("/bookmarks/:kind/:refId", wrap((req) => { run("DELETE FROM bookmarks WHERE kind = ? AND ref_id = ?", p(req, "kind"), p(req, "refId")); }));

api.get("/notes", wrap((req) => req.query.concept
  ? all("SELECT * FROM notes WHERE concept_id = ? ORDER BY updated_at DESC", String(req.query.concept))
  : all("SELECT n.*, c.name AS concept_name FROM notes n LEFT JOIN concepts c ON c.id = n.concept_id ORDER BY n.updated_at DESC")));
api.post("/notes", wrap((req) => {
  const { conceptId, title, body } = req.body ?? {};
  const now = nowIso();
  return { id: run("INSERT INTO notes(concept_id, title, body, created_at, updated_at) VALUES(?,?,?,?,?)",
    conceptId ?? null, String(title || "Untitled note"), String(body ?? ""), now, now).lastId };
}));
api.put("/notes/:id", wrap((req) => {
  const { title, body } = req.body ?? {};
  run("UPDATE notes SET title = COALESCE(?, title), body = COALESCE(?, body), updated_at = ? WHERE id = ?", title ?? null, body ?? null, nowIso(), num(p(req, "id"), 0));
}));
api.delete("/notes/:id", wrap((req) => { run("DELETE FROM notes WHERE id = ?", num(p(req, "id"), 0)); }));

api.get("/formulas", wrap(() => all(
  `SELECT f.id, f.title, f.latex, f.note, f.concept_id, c.name AS concept_name, s.id AS subject_id, s.name AS subject_name
   FROM formulas f JOIN concepts c ON c.id = f.concept_id JOIN topics t ON t.id = c.topic_id JOIN chapters ch ON ch.id = t.chapter_id
   JOIN subjects s ON s.id = ch.subject_id ORDER BY s.ord, ch.ord, t.ord, c.ord, f.ord`)));
api.get("/formula-notes", wrap(() => all(
  "SELECT f.*, c.name AS concept_name FROM formula_notes f LEFT JOIN concepts c ON c.id = f.concept_id ORDER BY f.updated_at DESC")));
api.post("/formula-notes", wrap((req) => {
  const { conceptId, title, latex, note } = req.body ?? {};
  if (!latex) throw new HttpError(400, "LaTeX is required");
  const now = nowIso();
  return { id: run("INSERT INTO formula_notes(concept_id, title, latex, note, created_at, updated_at) VALUES(?,?,?,?,?,?)",
    conceptId || null, String(title || "Formula"), String(latex), note ?? null, now, now).lastId };
}));
api.put("/formula-notes/:id", wrap((req) => {
  const { title, latex, note, conceptId } = req.body ?? {};
  run(`UPDATE formula_notes SET title = COALESCE(?, title), latex = COALESCE(?, latex), note = COALESCE(?, note),
       concept_id = COALESCE(?, concept_id), updated_at = ? WHERE id = ?`, title ?? null, latex ?? null, note ?? null, conceptId ?? null, nowIso(), num(p(req, "id"), 0));
}));
api.delete("/formula-notes/:id", wrap((req) => { run("DELETE FROM formula_notes WHERE id = ?", num(p(req, "id"), 0)); }));

// ───────── preferences ─────────
const DEFAULT_PREFS: { mode: string; dailyGoalMinutes: number; theme: string; examDate: string | null } = { mode: "learning", dailyGoalMinutes: 120, theme: "light", examDate: null };
function prefs() { return { ...DEFAULT_PREFS, ...getSetting<Record<string, unknown>>("prefs", {}) }; }
api.get("/settings", wrap(() => prefs()));
api.put("/settings", wrap((req) => {
  const cur = prefs();
  const b = req.body ?? {};
  if (b.mode && ["learning", "exam"].includes(b.mode)) cur.mode = b.mode;
  if (Number.isFinite(b.dailyGoalMinutes)) cur.dailyGoalMinutes = Math.max(10, Math.min(720, b.dailyGoalMinutes));
  if (b.theme && ["system", "light", "dark"].includes(b.theme)) cur.theme = b.theme;
  // Target exam day for the dashboard countdown (YYYY-MM-DD), or null to hide it.
  if (b.examDate === null || b.examDate === "") cur.examDate = null;
  else if (typeof b.examDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(b.examDate) && !Number.isNaN(Date.parse(b.examDate))) cur.examDate = b.examDate;
  setSetting("prefs", cur);
  return cur;
}));

// ───────── AI ─────────
api.get("/ai/status", wrap(async (req) => {
  const usage = get("SELECT COUNT(*) AS calls, COALESCE(SUM(input_tokens),0) AS input_tokens, COALESCE(SUM(output_tokens),0) AS output_tokens FROM ai_usage");
  return { ...(await aiStatus(req.query.probe === "1")), usage };
}));
api.get("/ai/history/:conceptId", wrap((req) => all("SELECT id, role, content, created_at FROM ai_messages WHERE concept_id = ? ORDER BY id", p(req, "conceptId"))));
api.delete("/ai/history/:conceptId", wrap((req) => { run("DELETE FROM ai_messages WHERE concept_id = ?", p(req, "conceptId")); }));

api.post("/ai/tutor", wrap(async (req) => {
  assertNoActiveExam();
  const { conceptId, message, questionId } = req.body ?? {};
  if (!message?.trim()) throw new HttpError(400, "Message is empty");
  const c = conceptsFull(String(conceptId));
  if (!c) throw new HttpError(404, "Concept not found");
  const lesson = get<{ content: string }>("SELECT content FROM lessons WHERE concept_id = ?", c.id)?.content ?? "";
  let qctx: string | undefined;
  if (questionId) {
    const q = questionRow(String(questionId));
    if (q && get("SELECT 1 FROM attempts WHERE question_id = ?", q.id)) {
      const opts = q.options ? (JSON.parse(q.options) as string[]).map((o, i) => `(${"ABCD"[i]}) ${o}`).join("\n") : "";
      qctx = `${q.stem}\n${opts}\nCorrect answer: ${q.answer ? (JSON.parse(q.answer) as number[]).map((i) => "ABCD"[i]).join(", ") : `${q.range_min} to ${q.range_max}`}\nReference solution: ${q.solution}`;
    }
  }
  const history = all<{ role: "user" | "assistant"; content: string }>(
    "SELECT role, content FROM ai_messages WHERE concept_id = ? ORDER BY id DESC LIMIT 12", c.id).reverse();
  const reply = await chat([...history, { role: "user", content: String(message) }], {
    system: TUTOR_SYSTEM({ concept: c.name, subject: c.subject_name, summary: c.summary, lesson, question: qctx }),
    maxTokens: 1500, purpose: "tutor",
  });
  const now = nowIso();
  run("INSERT INTO ai_messages(concept_id, role, content, created_at) VALUES(?,?,?,?)", c.id, "user", String(message), now);
  run("INSERT INTO ai_messages(concept_id, role, content, created_at) VALUES(?,?,?,?)", c.id, "assistant", reply, nowIso());
  return { reply };
}));

api.post("/ai/lesson/:conceptId", wrap(async (req) => {
  assertNoActiveExam();
  const c = conceptsFull(p(req, "conceptId"));
  if (!c) throw new HttpError(404, "Concept not found");
  const existing = get<{ source: string }>("SELECT source FROM lessons WHERE concept_id = ?", c.id);
  if (existing?.source === "builtin") throw new HttpError(409, "This concept already has a built-in lesson.");
  const prereqNames = all<{ name: string }>("SELECT c2.name FROM concept_prereqs p JOIN concepts c2 ON c2.id = p.prereq_id WHERE p.concept_id = ?", c.id).map((r) => r.name);
  const text = await chat([{ role: "user", content:
    `Write the lesson for the concept "${c.name}" in ${c.subject_name} → ${c.chapter_name} → ${c.topic_name}.\nScope: ${c.summary}\n` +
    (prereqNames.length ? `The student has already studied: ${prereqNames.join(", ")}.` : "") }],
    { system: LESSON_SYSTEM, maxTokens: 4000, purpose: "lesson" });
  if (text.trim().length < 300) throw new AIError(502, "The AI returned an unusually short lesson; please try again.");
  const st = await aiStatus();
  run(`INSERT INTO lessons(concept_id, content, source, model, updated_at) VALUES(?,?,'ai',?,?)
       ON CONFLICT(concept_id) DO UPDATE SET content = excluded.content, source = 'ai', model = excluded.model, updated_at = excluded.updated_at`,
    c.id, text.trim(), `${st.provider}:${st.model}`, nowIso());
  return { ok: true };
}));

api.post("/ai/questions/:conceptId", wrap(async (req) => {
  assertNoActiveExam();
  const c = conceptsFull(p(req, "conceptId"));
  if (!c) throw new HttpError(404, "Concept not found");
  const count = Math.max(1, Math.min(10, num(req.body?.count, 5)));
  const existing = all<{ stem: string }>("SELECT stem FROM questions WHERE concept_id = ? AND active = 1 LIMIT 12", c.id).map((q) => q.stem.slice(0, 160));
  const text = await chat([{ role: "user", content:
    `Concept: "${c.name}" (${c.subject_name} → ${c.chapter_name}). Scope: ${c.summary}\n` +
    `Write ${count} new GATE-level questions: include at least one NAT and one MSQ if ${count} ≥ 3, and at least two different patterns.\n` +
    (existing.length ? `Avoid duplicating these existing questions:\n- ${existing.join("\n- ")}` : "") }],
    { system: QUESTIONS_SYSTEM, maxTokens: 6000, json: true, purpose: "questions", temperature: 0.7 });
  let parsed = extractJson(text) as any;
  if (!Array.isArray(parsed)) parsed = parsed?.questions ?? [parsed];
  const accepted: string[] = [], rejected: string[] = [];
  const ts = Date.now();
  parsed.forEach((raw: any, i: number) => {
    const q = { ...raw, id: `ai-${c.id}-${ts}-${i}`, concept: c.id, difficulty: Number(raw.difficulty), marks: Number(raw.marks),
      answer: raw.answer?.map?.(Number), range: raw.range?.map?.(Number) };
    if (q.type === "NAT") { delete q.options; delete q.answer; } else delete q.range;
    const errs = validateQuestion(q);
    if (errs.length) { rejected.push(errs.join("; ")); return; }
    run(`INSERT INTO questions(id, concept_id, type, difficulty, marks, pattern, stem, options, answer, range_min, range_max, solution,
           hints, diagnostic, source, source_ref, builtin, active, created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,0,'ai-generated',?,0,1,?)`,
      q.id, c.id, q.type, q.difficulty, q.marks, String(q.pattern), String(q.stem), q.options ?? null, q.answer ?? null,
      q.range?.[0] ?? null, q.range?.[1] ?? null, String(q.solution), q.hints ?? [], null, nowIso());
    accepted.push(q.id);
  });
  if (!accepted.length) throw new AIError(502, `No usable questions were generated. ${rejected.slice(0, 2).join(" | ")}`);
  return { accepted: accepted.length, rejected: rejected.length, rejectedReasons: rejected.slice(0, 5) };
}));

api.delete("/questions/:id", wrap((req) => {
  const q = questionRow(p(req, "id"));
  if (!q) throw new HttpError(404, "Question not found");
  if (q.builtin) throw new HttpError(400, "Built-in questions cannot be deleted.");
  run("UPDATE questions SET active = 0 WHERE id = ?", q.id);
}));

// ───────── data portability ─────────
api.get("/data/info", wrap(() => ({
  app: { mode: IS_EXE ? "exe" : "source", dataDir: DATA_DIR, envFile: ENV_FILE },
  db: dbFileInfo(),
  counts: get(`SELECT (SELECT COUNT(*) FROM attempts) AS attempts, (SELECT COUNT(*) FROM tests) AS tests,
     (SELECT COUNT(*) FROM notes) AS notes, (SELECT COUNT(*) FROM bookmarks) AS bookmarks,
     (SELECT COUNT(*) FROM formula_notes) AS formula_notes, (SELECT COUNT(*) FROM questions WHERE builtin = 0) AS custom_questions,
     (SELECT COUNT(*) FROM questions WHERE active = 1) AS questions, (SELECT COUNT(*) FROM lessons) AS lessons,
     (SELECT COUNT(*) FROM concepts) AS concepts`),
  backups: listBackups(),
})));
api.get("/data/export", (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", `attachment; filename="gate-progress-${new Date().toISOString().slice(0, 10)}.json"`);
    res.json(exportAll());
  } catch (e) { next(e); }
});
api.post("/data/import", wrap((req) => importAll(req.body)));
api.post("/data/backup", wrap(() => createBackup("manual")));
api.get("/data/backups", wrap(() => listBackups()));
api.get("/data/backups/:name", (req, res, next) => {
  try { res.download(backupPath(p(req, "name"))); } catch (e) { next(e); }
});
api.post("/data/restore", wrap((req) => restoreBackup(String(req.body?.name))));
api.post("/data/restore-upload", express.raw({ type: "application/octet-stream", limit: "500mb" }), wrap((req) => {
  if (!Buffer.isBuffer(req.body)) throw new HttpError(400, "Send the backup file as application/octet-stream");
  return restoreBackup(saveUploadedBackup(req.body));
}));
api.post("/data/import-questions", wrap((req) => {
  const list = Array.isArray(req.body) ? req.body : req.body?.questions;
  if (!Array.isArray(list)) throw new HttpError(400, "Expected a JSON array of questions.");
  const conceptIds = new Set(all<{ id: string }>("SELECT id FROM concepts").map((r) => r.id));
  let imported = 0;
  const errors: string[] = [];
  list.forEach((raw: any, i: number) => {
    const source = raw.source === "official-pyq" ? "official-pyq" : "user";
    const id = String(raw.id || `imp-${Date.now()}-${i}`);
    const q = { ...raw, id };
    const errs = validateQuestion(q, conceptIds);
    if (source === "official-pyq" && !raw.sourceRef) errs.push(`${id}: official PYQs need a sourceRef such as "GATE EC 2023 Q12"`);
    if (errs.length) { errors.push(...errs); return; }
    if (questionRow(id)?.builtin) { errors.push(`${id}: id clashes with a built-in question`); return; }
    run(`INSERT OR REPLACE INTO questions(id, concept_id, type, difficulty, marks, pattern, stem, options, answer, range_min, range_max,
           solution, hints, diagnostic, source, source_ref, builtin, active, created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,1,?)`,
      id, q.concept, q.type, q.difficulty, q.marks, q.pattern, q.stem, q.options ?? null, q.answer ?? null,
      q.range?.[0] ?? null, q.range?.[1] ?? null, q.solution, q.hints ?? [], q.diagnostic ? 1 : 0, source, raw.sourceRef ?? null, nowIso());
    imported++;
  });
  return { imported, errors: errors.slice(0, 50), errorCount: errors.length };
}));
api.get("/reports/performance.csv", (req, res, next) => {
  try {
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="gate-performance-${new Date().toISOString().slice(0, 10)}.csv"`);
    res.send(performanceCsv());
  } catch (e) { next(e); }
});

// ───────── errors ─────────
api.use((req, res) => { res.status(404).json({ error: `No API route for ${req.method} ${req.path}` }); });
api.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const status = err instanceof HttpError || err instanceof AIError ? err.status : err?.type === "entity.too.large" ? 413 : 500;
  if (status === 500) console.error("[api error]", req.method, req.path, err);
  res.status(status).json({ error: err?.message ?? "Internal error" });
});
