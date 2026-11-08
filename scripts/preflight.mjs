// Used by GATE-Tutor.bat. Exit code 1 means the step is needed.
//   node scripts/preflight.mjs node     -> Node.js too old
//   node scripts/preflight.mjs install  -> dependencies missing or package.json changed
//   node scripts/preflight.mjs build    -> web app not built or sources changed since last build
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mtime = (p) => { try { return fs.statSync(p).mtimeMs; } catch { return 0; } };
function newest(dir) {
  let m = 0;
  if (!fs.existsSync(dir)) return 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    m = Math.max(m, e.isDirectory() ? newest(p) : mtime(p));
  }
  return m;
}

const step = process.argv[2];
if (step === "node") {
  const [maj, min] = process.versions.node.split(".").map(Number);
  process.exit(maj > 22 || (maj === 22 && min >= 13) ? 0 : 1);
}
if (step === "install") {
  const marker = path.join(root, "node_modules", ".package-lock.json");
  process.exit(!fs.existsSync(marker) || mtime(path.join(root, "package.json")) > mtime(marker) ? 1 : 0);
}
if (step === "build") {
  const built = mtime(path.join(root, "dist", "index.html"));
  const src = Math.max(newest(path.join(root, "client")), newest(path.join(root, "shared")), mtime(path.join(root, "vite.config.ts")));
  process.exit(!built || src > built ? 1 : 0);
}
process.exit(0);
