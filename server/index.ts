// GATE ECE Tutor — local server. Serves the API and the built web app on http://localhost:PORT.
// Runs from source (npm start / GATE-Tutor.bat) or as the packaged GATE-Tutor.exe (npm run build:exe).
import { loadEnv } from "./env.ts"; // must stay the first import: it loads .env before other modules read it
import fs from "node:fs";
import path from "node:path";
import { exec, spawnSync } from "node:child_process";
import express from "express";
import { IS_EXE } from "./runtime.ts";
import { DATA_DIR, DB_PATH, BACKUP_DIR, ENV_FILE } from "./paths.ts";
import { openDb, closeDb } from "./db.ts";
import { seedContent } from "./seed.ts";
import { autoBackup } from "./lib/backup.ts";
import { sweepExpiredTests } from "./lib/exams.ts";
import { aiStatus } from "./lib/ai.ts";
import { api } from "./routes.ts";
import { mountWebApp, embeddedFile } from "./webapp.ts";

if (IS_EXE) {
  process.title = "GATE ECE Tutor";
  // Give the .exe an editable settings file in its data folder on first run (all values blank = offline).
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const template = embeddedFile("env.example");
    if (template && !fs.existsSync(path.join(DATA_DIR, ".env"))) fs.writeFileSync(path.join(DATA_DIR, ".env"), template);
  } catch { /* optional */ }
  loadEnv(path.join(DATA_DIR, ".env"));
}

const PORT = Number(process.env.PORT) || 3210; // blank or invalid PORT -> default
const URL_ = `http://localhost:${PORT}`;

/** In the .exe, keep the console window open so the message can be read before it closes. */
function pauseIfExe() {
  if (IS_EXE && process.platform === "win32" && process.stdout.isTTY) {
    spawnSync("cmd.exe", ["/d", "/c", "pause"], { stdio: "inherit" });
  }
}

function fail(msg: string, err?: unknown): never {
  console.error(`\n[ERROR] ${msg}`);
  if (err) console.error(err instanceof Error ? err.message : err);
  pauseIfExe();
  process.exit(1);
}

if (IS_EXE) {
  process.on("uncaughtException", (e) => fail("GATE ECE Tutor stopped unexpectedly.", e));
}

try { openDb(); } catch (e) { fail(`Could not open the database at ${DB_PATH}.`, e); }
let seeded: ReturnType<typeof seedContent>;
try { seeded = seedContent(); } catch (e) { fail("Could not load built-in content.", e); }
try { const b = autoBackup(); if (b) console.log(`Automatic daily backup saved: ${path.join(BACKUP_DIR, b.name)}`); } catch (e) { console.warn("Automatic backup skipped:", (e as Error).message); }
sweepExpiredTests();

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "100mb" }));
app.use("/api", api);

if (!mountWebApp(app)) {
  app.get("/", (_req, res) => res.type("text").send(
    "The web app has not been built yet. Run `npm run build` (GATE-Tutor.bat does this automatically), or use `npm run dev` and open http://localhost:5173."));
}

function openBrowser() {
  // GATE-Tutor.bat sets GATE_OPEN_BROWSER=1; the .exe opens the browser unless GATE_OPEN_BROWSER=0.
  const flag = process.env.GATE_OPEN_BROWSER ?? (IS_EXE ? "1" : "0");
  if (flag !== "1") return;
  const cmd = process.platform === "win32" ? `start "" "${URL_}"` : process.platform === "darwin" ? `open "${URL_}"` : `xdg-open "${URL_}"`;
  exec(cmd, () => { /* ignore — the URL is printed anyway */ });
}

const server = app.listen(PORT, "127.0.0.1", async () => {
  const ai = await aiStatus();
  console.log("\n  GATE ECE Tutor is running");
  console.log(`  -> Open:      ${URL_}`);
  console.log(`  -> Database:  ${DB_PATH}`);
  console.log(`  -> Content:   ${seeded.subjects} subjects, ${seeded.lessons} lessons, ${seeded.questions} built-in questions`);
  console.log(`  -> AI:        ${ai.configured ? `${ai.provider} (${ai.model})` : "not configured (all offline features available)"}`);
  if (IS_EXE) console.log(`  -> Settings:  ${ENV_FILE}`);
  console.log(IS_EXE
    ? "\n  Keep this window open while you study - closing it stops GATE ECE Tutor.\n  Your progress is saved continuously.\n"
    : "\n  Press Ctrl+C to stop. Your progress is saved continuously.\n");
  openBrowser();
});
server.on("error", async (e: NodeJS.ErrnoException) => {
  if (e.code === "EADDRINUSE") {
    // If it is this app that is already running, just open it instead of failing.
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/api/health`, { signal: AbortSignal.timeout(2000) });
      const j = (await r.json()) as { app?: string };
      if (j.app === "gate-ece-tutor") {
        console.log(`  GATE ECE Tutor is already running at ${URL_} - opening it.`);
        closeDb();
        openBrowser();
        setTimeout(() => process.exit(0), 1500);
        return;
      }
    } catch { /* not ours */ }
    fail(`Port ${PORT} is already in use by another program. Close it, or set a different PORT in ${ENV_FILE} (e.g. PORT=3311).`);
  }
  fail("Server error", e);
});

const shutdown = () => { server.close(); closeDb(); process.exit(0); };
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGHUP", shutdown); // console window closed (Windows)
