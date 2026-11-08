// Packages GATE ECE Tutor into one Windows program: release/GATE-Tutor.exe
//
// Uses Node's built-in Single Executable Applications support (https://nodejs.org/api/single-executable-applications.html):
//   1. build the web app (Vite)                    -> dist/
//   2. bundle the server + built-in content         -> build/exe/server.cjs (one CommonJS file, esbuild)
//   3. embed the web app, the lessons and the .env template as SEA assets, generate the SEA blob
//   4. copy this machine's node.exe, give it the app's icon and name (rcedit), inject the blob (postject)
//   5. smoke-test the result on a throwaway data folder
//
// Run: npm run build:exe        (needs Node >= 22.13 on Windows; no internet needed after npm install)
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { spawn, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUILD = path.join(ROOT, "build", "exe");
const RELEASE = path.join(ROOT, "release");
const IS_WIN = process.platform === "win32";
const EXE = path.join(RELEASE, IS_WIN ? "GATE-Tutor.exe" : "GATE-Tutor");
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

process.chdir(ROOT); // vite.config.ts resolves root: "client" against the working directory

const step = (msg) => console.log(`\n> ${msg}`);
const die = (msg) => { console.error(`\n[build-exe] ${msg}`); process.exit(1); };

const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 13)) die(`Node ${process.versions.node} is too old; install Node 22.13+ (24 LTS recommended).`);

fs.rmSync(BUILD, { recursive: true, force: true });
fs.mkdirSync(BUILD, { recursive: true });
fs.mkdirSync(RELEASE, { recursive: true });

// ── 1. web app ──────────────────────────────────────────────────────────────
step("Building the web app (vite build)");
const { build: viteBuild } = await import("vite");
await viteBuild({ configFile: path.join(ROOT, "vite.config.ts"), logLevel: "warn" });
const DIST = path.join(ROOT, "dist");
if (!fs.existsSync(path.join(DIST, "index.html"))) die("vite build did not produce dist/index.html");

// ── 2. server bundle ────────────────────────────────────────────────────────
step("Bundling the server and built-in content (esbuild)");
const esbuild = await import("esbuild");
// node:sqlite prints an ExperimentalWarning on load; the source build hides it with --disable-warning.
const hideExperimentalWarning =
  `(()=>{const e=process.emitWarning;process.emitWarning=function(w,...a){const t=typeof a[0]==="string"?a[0]:a[0]&&a[0].type;` +
  `if(t==="ExperimentalWarning"||(w&&w.name==="ExperimentalWarning"))return;return e.call(process,w,...a)}})();`;
const SERVER = path.join(BUILD, "server.cjs");
await esbuild.build({
  entryPoints: [path.join(ROOT, "server", "index.ts")],
  outfile: SERVER,
  bundle: true,
  platform: "node",
  format: "cjs",
  target: `node${major}`,
  banner: { js: hideExperimentalWarning },
  legalComments: "none",
  logLevel: "warning",
  logOverride: { "empty-import-meta": "silent" }, // only used when running from source (see server/runtime.ts)
});

// ── 3. assets + SEA blob ────────────────────────────────────────────────────
step("Embedding the web app, lessons and settings template");
const assets = {};
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
  d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]);
for (const f of walk(DIST)) assets[`dist/${path.relative(DIST, f).split(path.sep).join("/")}`] = f;
const LESSONS = path.join(ROOT, "content", "lessons");
const lessonFiles = fs.readdirSync(LESSONS).filter((f) => f.endsWith(".md"));
for (const f of lessonFiles) assets[`lessons/${f}`] = path.join(LESSONS, f);
assets["env.example"] = path.join(ROOT, ".env.example");
console.log(`  ${Object.keys(assets).length - lessonFiles.length - 1} web-app files, ${lessonFiles.length} lessons`);

const BLOB = path.join(BUILD, "sea-prep.blob");
const seaConfig = path.join(BUILD, "sea-config.json");
fs.writeFileSync(seaConfig, JSON.stringify({
  main: SERVER,
  output: BLOB,
  disableExperimentalSEAWarning: true,
  useSnapshot: false,
  useCodeCache: true, // faster start-up
  assets,
}, null, 2));
const gen = spawnSync(process.execPath, ["--experimental-sea-config", seaConfig], { cwd: ROOT, stdio: "inherit" });
if (gen.status !== 0 || !fs.existsSync(BLOB)) die("Generating the SEA blob failed (see above).");

// ── 4. executable ───────────────────────────────────────────────────────────
step(`Creating ${path.relative(ROOT, EXE)}`);
try {
  fs.copyFileSync(process.execPath, EXE);
} catch (e) {
  die(e.code === "EBUSY" || e.code === "EPERM"
    ? `${EXE} is in use. Close the GATE ECE Tutor window (or end GATE-Tutor.exe in Task Manager) and run this again.`
    : `Could not copy node.exe: ${e.message}`);
}

if (IS_WIN) {
  // Icon + name shown in Explorer and Task Manager (instead of Node.js's). Done before injection.
  const ico = path.join(BUILD, "GATE-Tutor.ico");
  fs.writeFileSync(ico, makeIco([16, 20, 24, 32, 40, 48, 64, 128, 256]));
  const { rcedit } = await import("rcedit");
  const v = `${pkg.version}.0`;
  await rcedit(EXE, {
    icon: ico,
    "file-version": v,
    "product-version": v,
    "version-string": {
      ProductName: "GATE ECE Tutor",
      FileDescription: "GATE ECE Tutor",
      CompanyName: "GATE ECE Tutor",
      InternalFilename: "GATE-Tutor",
      OriginalFilename: "GATE-Tutor.exe",
      LegalCopyright: "Personal use",
    },
  });
}

const { inject } = require("postject");
await inject(EXE, "NODE_SEA_BLOB", fs.readFileSync(BLOB), {
  sentinelFuse: "NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2",
  machoSegmentName: process.platform === "darwin" ? "NODE_SEA" : undefined,
});

// ── 5. smoke test ───────────────────────────────────────────────────────────
step("Smoke-testing the executable on a temporary data folder");
await smokeTest();

const mb = (fs.statSync(EXE).size / 1048576).toFixed(0);
console.log(`\nDone: ${EXE} (${mb} MB)`);
console.log("Double-click it to start. Your progress is stored in %APPDATA%\\GATE-Tutor (shown in Settings).");

// ────────────────────────────────────────────────────────────────────────────

async function smokeTest() {
  const port = await new Promise((resolve) => { const s = net.createServer().listen(0, "127.0.0.1", () => { const p = s.address().port; s.close(() => resolve(p)); }); });
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "gate-exe-test-"));
  const child = spawn(EXE, [], {
    env: { ...process.env, GATE_DATA_DIR: dataDir, PORT: String(port), GATE_OPEN_BROWSER: "0" },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  let log = "";
  child.stdout.on("data", (d) => { log += d; });
  child.stderr.on("data", (d) => { log += d; });
  const base = `http://127.0.0.1:${port}`;
  const getText = async (p) => { const r = await fetch(base + p); return { status: r.status, type: r.headers.get("content-type") ?? "", text: await r.text() }; };
  try {
    let up = false;
    for (let i = 0; i < 120 && !up && child.exitCode === null; i++) {
      try { up = (await fetch(`${base}/api/health`)).ok; } catch { await new Promise((r) => setTimeout(r, 250)); }
    }
    if (!up) throw new Error("the server did not start");
    const checks = [];
    const check = (ok, what) => { checks.push(`${ok ? "ok  " : "FAIL"} ${what}`); if (!ok) throw new Error(what); };

    const home = await getText("/");
    check(home.status === 200 && home.type.includes("text/html") && home.text.includes('id="root"'), "web app shell served");
    const js = home.text.match(/src="(\/assets\/[^"]+\.js)"/)?.[1];
    const css = home.text.match(/href="(\/assets\/[^"]+\.css)"/)?.[1];
    const jsRes = js && await getText(js);
    check(!!jsRes && jsRes.status === 200 && jsRes.type.includes("javascript"), `script served (${js})`);
    const cssRes = css && await getText(css);
    check(!!cssRes && cssRes.status === 200 && cssRes.type.includes("css"), `stylesheet served (${css})`);
    const deep = await getText("/concept/ss-convolution");
    check(deep.status === 200 && deep.text.includes('id="root"'), "client-side routes fall back to the app shell");

    const info = JSON.parse((await getText("/api/data/info")).text);
    check(info.app?.mode === "exe", "server reports exe mode");
    check(path.resolve(info.db?.path ?? "").startsWith(path.resolve(dataDir)), "database lives in the chosen data folder");
    check(info.counts?.lessons === lessonFiles.length, `all ${lessonFiles.length} lessons loaded from the embedded copy (got ${info.counts?.lessons})`);
    check(info.counts?.questions > 0, `${info.counts?.questions} questions loaded`);
    check(fs.existsSync(path.join(dataDir, ".env")), "settings template written to the data folder");
    check(!/ExperimentalWarning/.test(log), "no experimental-feature warnings in the console");
    console.log(checks.map((c) => `  ${c}`).join("\n"));
  } catch (e) {
    console.error(`\n--- executable output ---\n${log}\n-------------------------`);
    child.kill();
    die(`Smoke test failed: ${e.message}`);
  } finally {
    child.kill();
    await new Promise((r) => setTimeout(r, 500));
    try { fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch { /* temp folder; harmless */ }
  }
}

// The app's icon (same as the browser-tab icon): an indigo rounded square with a white signal trace.
// Rendered here with 4x4 supersampling and written as a multi-size .ico of PNG images, so no image files
// or extra tools are needed.
function makeIco(sizes) {
  const pngs = sizes.map((s) => png(s, s, renderIcon(s)));
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((s, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(s >= 256 ? 0 : s, e); header.writeUInt8(s >= 256 ? 0 : s, e + 1);
    header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(pngs[i].length, e + 8); header.writeUInt32LE(offset, e + 12);
    offset += pngs[i].length;
  });
  return Buffer.concat([header, ...pngs]);
}

function renderIcon(size) {
  const BG = [0x4f, 0x46, 0xe5];
  const pts = [[7, 20], [12, 12], [17, 20], [22, 9], [25, 14]]; // in a 32x32 box, as in client/index.html
  const half = (size <= 24 ? 3.4 : 2.6) / 2;                     // thicker trace at tiny sizes
  const segDist = (x, y, [ax, ay], [bx, by]) => {
    const dx = bx - ax, dy = by - ay;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(x - ax - t * dx, y - ay - t * dy);
  };
  const inRoundRect = (x, y) => {
    const r = 7, qx = Math.abs(x - 16) - (16 - r), qy = Math.abs(y - 16) - (16 - r);
    return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r <= 0;
  };
  const N = 4, px = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let a = 0, r = 0, g = 0, b = 0;
    for (let sy = 0; sy < N; sy++) for (let sx = 0; sx < N; sx++) {
      const u = ((x + (sx + 0.5) / N) * 32) / size, v = ((y + (sy + 0.5) / N) * 32) / size;
      if (!inRoundRect(u, v)) continue;
      let d = Infinity;
      for (let i = 0; i < pts.length - 1; i++) d = Math.min(d, segDist(u, v, pts[i], pts[i + 1]));
      const c = d <= half ? [255, 255, 255] : BG;
      a++; r += c[0]; g += c[1]; b += c[2];
    }
    const o = (y * size + x) * 4;
    if (a) { px[o] = Math.round(r / a); px[o + 1] = Math.round(g / a); px[o + 2] = Math.round(b / a); px[o + 3] = Math.round((255 * a) / (N * N)); }
  }
  return px;
}

function png(w, h, rgba) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(zlib.crc32(td) >>> 0);
    return Buffer.concat([len, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr.writeUInt8(8, 8); ihdr.writeUInt8(6, 9);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}
