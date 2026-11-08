// Data portability: JSON export/import, SQLite file backups and restore.
import fs from "node:fs";
import path from "node:path";
import { all, run, tx, exec, tableColumns, closeDb, openDb, nowIso, getSetting, setSetting } from "../db.ts";
import { BACKUP_DIR, DB_PATH } from "../paths.ts";
import { USER_TABLES } from "../schema.ts";
import { HttpError } from "./questions.ts";

const stamp = () => new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);

export function exportAll() {
  const data: Record<string, unknown[]> = {};
  for (const t of USER_TABLES) data[t] = all(`SELECT * FROM ${t}`);
  // Content created by the learner or by AI is not in /content, so it must travel with the export.
  data.custom_questions = all("SELECT * FROM questions WHERE builtin = 0");
  data.custom_lessons = all("SELECT * FROM lessons WHERE source <> 'builtin'");
  return { app: "gate-ece-tutor", format: 1, exportedAt: nowIso(), data };
}

export function importAll(payload: any) {
  if (!payload || payload.app !== "gate-ece-tutor" || !payload.data) throw new HttpError(400, "Not a GATE ECE Tutor export file.");
  const safety = createBackup("pre-import");
  const insertRows = (table: string, rows: any[]) => {
    const cols = new Set(tableColumns(table));
    for (const row of rows ?? []) {
      const keys = Object.keys(row).filter((k) => cols.has(k));
      if (!keys.length) continue;
      run(`INSERT OR REPLACE INTO ${table}(${keys.join(",")}) VALUES(${keys.map(() => "?").join(",")})`, ...keys.map((k) => row[k]));
    }
  };
  tx(() => {
    for (const t of USER_TABLES) run(`DELETE FROM ${t}`);
    for (const t of USER_TABLES) insertRows(t, payload.data[t]);
    run("DELETE FROM questions WHERE builtin = 0");
    insertRows("questions", payload.data.custom_questions);
    run("DELETE FROM lessons WHERE source <> 'builtin'");
    insertRows("lessons", (payload.data.custom_lessons ?? []).filter((l: any) => l.source !== "builtin"));
  });
  return { ok: true, safetyBackup: safety.name };
}

export function createBackup(label = "manual") {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const name = `gate-${label}-${stamp()}.db`;
  const file = path.join(BACKUP_DIR, name);
  exec(`VACUUM INTO '${file.replace(/'/g, "''")}'`);
  return { name, sizeBytes: fs.statSync(file).size };
}

export function listBackups() {
  if (!fs.existsSync(BACKUP_DIR)) return [];
  return fs.readdirSync(BACKUP_DIR).filter((f) => f.endsWith(".db"))
    .map((f) => { const s = fs.statSync(path.join(BACKUP_DIR, f)); return { name: f, sizeBytes: s.size, createdAt: s.mtime.toISOString() }; })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function backupPath(name: string) {
  if (!/^[\w.-]+\.db$/.test(name)) throw new HttpError(400, "Invalid backup name");
  const p = path.join(BACKUP_DIR, name);
  if (!fs.existsSync(p)) throw new HttpError(404, "Backup not found");
  return p;
}

function isSqliteFile(p: string) {
  const fd = fs.openSync(p, "r");
  const buf = Buffer.alloc(16);
  fs.readSync(fd, buf, 0, 16, 0);
  fs.closeSync(fd);
  return buf.toString("latin1") === "SQLite format 3\u0000";
}

export function restoreBackup(name: string) {
  const src = backupPath(name);
  if (!isSqliteFile(src)) throw new HttpError(400, "That file is not a SQLite database.");
  const safety = createBackup("pre-restore");
  closeDb();
  for (const ext of ["-wal", "-shm"]) { try { fs.rmSync(DB_PATH + ext, { force: true }); } catch { /* ignore */ } }
  fs.copyFileSync(src, DB_PATH);
  openDb(); // runs any newer migrations on the restored file
  return { ok: true, restored: name, safetyBackup: safety.name };
}

export function saveUploadedBackup(buf: Buffer) {
  if (buf.length < 100 || buf.subarray(0, 16).toString("latin1") !== "SQLite format 3\u0000")
    throw new HttpError(400, "Upload a .db backup file created by this app.");
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const name = `gate-uploaded-${stamp()}.db`;
  fs.writeFileSync(path.join(BACKUP_DIR, name), buf);
  return name;
}

/** One automatic backup per day at startup; keeps the 14 most recent automatic backups. */
export function autoBackup() {
  const last = getSetting<string | null>("last_auto_backup", null);
  if (last && Date.now() - new Date(last).getTime() < 20 * 3_600_000) return null;
  const hasData = all<{ n: number }>("SELECT (SELECT COUNT(*) FROM attempts) + (SELECT COUNT(*) FROM concept_progress) AS n")[0].n > 0;
  if (!hasData) return null;
  const b = createBackup("auto");
  setSetting("last_auto_backup", nowIso());
  const autos = listBackups().filter((x) => x.name.startsWith("gate-auto-"));
  for (const old of autos.slice(14)) fs.rmSync(path.join(BACKUP_DIR, old.name), { force: true });
  return b;
}

export function performanceCsv() {
  const rows = all<Record<string, unknown>>(
    `SELECT s.name AS subject, ch.name AS chapter, t.name AS topic, c.name AS concept,
       COALESCE(p.status, 'not_started') AS status, COALESCE(p.score, 0) AS mastery_score,
       (SELECT COUNT(*) FROM attempts a WHERE a.concept_id = c.id) AS attempts,
       (SELECT ROUND(100.0 * AVG(a.correct), 1) FROM attempts a WHERE a.concept_id = c.id) AS accuracy_pct,
       COALESCE(p.distinct_questions, 0) AS distinct_questions, p.last_studied_at, p.mastered_at,
       r.due_at AS next_revision
     FROM concepts c JOIN topics t ON t.id = c.topic_id JOIN chapters ch ON ch.id = t.chapter_id JOIN subjects s ON s.id = ch.subject_id
     LEFT JOIN concept_progress p ON p.concept_id = c.id LEFT JOIN review_schedule r ON r.concept_id = c.id
     ORDER BY s.ord, ch.ord, t.ord, c.ord`);
  const headers = Object.keys(rows[0] ?? { subject: "" });
  const esc = (v: unknown) => { const s = v == null ? "" : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}
