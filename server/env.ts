// Loads .env before any other module reads process.env. Import this first.
// Keys stay on this machine and are never sent to the browser.
// Precedence: real environment variables > the first .env loaded > later ones (loadEnvFile never overwrites).
import fs from "node:fs";
import path from "node:path";
import { APP_DIR } from "./runtime.ts";

export function loadEnv(file: string) {
  if (!fs.existsSync(file)) return;
  try { process.loadEnvFile(file); } catch (e) { console.error(`Could not read ${file}: ${(e as Error).message}`); }
}

loadEnv(path.join(APP_DIR, ".env"));
