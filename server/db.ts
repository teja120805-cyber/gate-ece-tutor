// SQLite access layer (Node's built-in node:sqlite — no native compilation required).
import { DatabaseSync, type StatementSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { DATA_DIR, DB_PATH } from "./paths.ts";
import { MIGRATIONS } from "./schema.ts";

type Param = string | number | bigint | null | Uint8Array;
let conn: DatabaseSync | null = null;
let stmtCache = new Map<string, StatementSync>();
let txDepth = 0;

function sanitize(params: unknown[]): Param[] {
  return params.map((p) => {
    if (p === undefined) return null;
    if (typeof p === "boolean") return p ? 1 : 0;
    if (p !== null && typeof p === "object" && !(p instanceof Uint8Array)) return JSON.stringify(p);
    return p as Param;
  });
}

export function openDb(): DatabaseSync {
  if (conn) return conn;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  conn = new DatabaseSync(DB_PATH);
  conn.exec("PRAGMA journal_mode = WAL;");
  conn.exec("PRAGMA synchronous = NORMAL;"); // durable across app restarts; WAL is fsynced at checkpoints
  conn.exec("PRAGMA foreign_keys = ON;");
  conn.exec("PRAGMA busy_timeout = 5000;");
  migrate(conn);
  return conn;
}

export function closeDb() {
  if (!conn) return;
  try { conn.exec("PRAGMA wal_checkpoint(TRUNCATE);"); } catch { /* ignore */ }
  conn.close();
  conn = null;
  stmtCache = new Map();
}

function migrate(d: DatabaseSync) {
  const row = d.prepare("PRAGMA user_version").get() as { user_version: number };
  let version = Number(row.user_version);
  for (let i = version; i < MIGRATIONS.length; i++) {
    d.exec("BEGIN");
    try {
      d.exec(MIGRATIONS[i]);
      d.exec(`PRAGMA user_version = ${i + 1}`);
      d.exec("COMMIT");
      version = i + 1;
    } catch (e) {
      d.exec("ROLLBACK");
      throw new Error(`Database migration ${i + 1} failed: ${(e as Error).message}`);
    }
  }
}

function stmt(sql: string): StatementSync {
  const d = openDb();
  let s = stmtCache.get(sql);
  if (!s) { s = d.prepare(sql); stmtCache.set(sql, s); }
  return s;
}

export function all<T = Record<string, any>>(sql: string, ...params: unknown[]): T[] {
  return stmt(sql).all(...sanitize(params)) as T[];
}
export function get<T = Record<string, any>>(sql: string, ...params: unknown[]): T | undefined {
  return stmt(sql).get(...sanitize(params)) as T | undefined;
}
export function run(sql: string, ...params: unknown[]) {
  const r = stmt(sql).run(...sanitize(params));
  return { changes: Number(r.changes), lastId: Number(r.lastInsertRowid) };
}
export function exec(sql: string) { openDb().exec(sql); }

/** Run fn inside a transaction (nested calls use savepoints). */
export function tx<T>(fn: () => T): T {
  const d = openDb();
  const sp = `sp${txDepth}`;
  d.exec(txDepth === 0 ? "BEGIN IMMEDIATE" : `SAVEPOINT ${sp}`);
  txDepth++;
  try {
    const out = fn();
    txDepth--;
    d.exec(txDepth === 0 ? "COMMIT" : `RELEASE ${sp}`);
    return out;
  } catch (e) {
    txDepth--;
    d.exec(txDepth === 0 ? "ROLLBACK" : `ROLLBACK TO ${sp}; RELEASE ${sp}`);
    throw e;
  }
}

export function tableColumns(table: string): string[] {
  return all<{ name: string }>(`PRAGMA table_info(${JSON.stringify(table)})`).map((r) => r.name);
}

export function nowIso() { return new Date().toISOString(); }
/** Local calendar day (YYYY-MM-DD) — streaks follow the user's own clock. */
export function localDay(d = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function getSetting<T>(key: string, fallback: T): T {
  const r = get<{ value: string }>("SELECT value FROM settings WHERE key = ?", key);
  if (!r) return fallback;
  try { return JSON.parse(r.value) as T; } catch { return fallback; }
}
export function setSetting(key: string, value: unknown) {
  run("INSERT INTO settings(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", key, JSON.stringify(value));
}

export function dbFileInfo() {
  const stat = fs.existsSync(DB_PATH) ? fs.statSync(DB_PATH) : null;
  return { path: path.resolve(DB_PATH), sizeBytes: stat?.size ?? 0 };
}
