import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { APP_DIR, IS_EXE } from "./runtime.ts";

export { IS_EXE };
export const ROOT = APP_DIR;

// Source mode keeps data in <project>/data. The .exe keeps it in %APPDATA%\GATE-Tutor so it survives
// moving or replacing the .exe. GATE_DATA_DIR (relative paths are resolved against the app folder) overrides both.
function defaultDataDir(): string {
  if (!IS_EXE) return path.join(ROOT, "data");
  const base = process.env.APPDATA || process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Roaming");
  return path.join(base, "GATE-Tutor");
}

export const DATA_DIR = process.env.GATE_DATA_DIR ? path.resolve(ROOT, process.env.GATE_DATA_DIR) : defaultDataDir();
export const DB_PATH = path.join(DATA_DIR, "gate.db");
export const BACKUP_DIR = path.join(DATA_DIR, "backups");
export const DIST_DIR = path.join(ROOT, "dist");
export const LESSON_DIR = path.join(ROOT, "content", "lessons");

/** The .env file the user should edit. For the .exe: next to the .exe if one exists there, else in the data folder. */
export const ENV_FILE = !IS_EXE || fs.existsSync(path.join(APP_DIR, ".env"))
  ? path.join(APP_DIR, ".env")
  : path.join(DATA_DIR, ".env");
