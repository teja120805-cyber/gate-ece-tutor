// Serves the built web app: from dist/ when running from source, or from the files embedded in GATE-Tutor.exe.
import fs from "node:fs";
import path from "node:path";
import { getAsset, getAssetKeys } from "node:sea";
import express from "express";
import { IS_EXE } from "./runtime.ts";
import { DIST_DIR } from "./paths.ts";

/** Text of every embedded asset whose key starts with `prefix` (keys are "dist/...", "lessons/...", ...). Exe only. */
export function embeddedFiles(prefix: string): Map<string, Buffer> {
  const out = new Map<string, Buffer>();
  if (!IS_EXE) return out;
  for (const key of getAssetKeys()) {
    if (key.startsWith(prefix)) out.set(key.slice(prefix.length), Buffer.from(getAsset(key)));
  }
  return out;
}

/** One embedded asset by its exact key, or undefined (always undefined when running from source). */
export function embeddedFile(key: string): Buffer | undefined {
  if (!IS_EXE || !getAssetKeys().includes(key)) return undefined;
  return Buffer.from(getAsset(key));
}

/** Mounts the web app on `app`. Returns false when there is no built web app to serve. */
export function mountWebApp(app: express.Express): boolean {
  if (!IS_EXE) {
    if (!fs.existsSync(path.join(DIST_DIR, "index.html"))) return false;
    app.use(express.static(DIST_DIR, { index: false, maxAge: "1h" }));
    app.get(/^(?!\/api\/).*/, (_req, res) => res.sendFile(path.join(DIST_DIR, "index.html")));
    return true;
  }

  const files = embeddedFiles("dist/");
  const index = files.get("index.html");
  if (!index) return false;
  app.use((req, res, next) => {
    if ((req.method !== "GET" && req.method !== "HEAD") || req.path.startsWith("/api/")) return next();
    let rel: string;
    try { rel = decodeURIComponent(req.path).replace(/^\/+/, ""); } catch { return next(); }
    const body = files.get(rel);
    if (body && rel !== "index.html") {
      res.type(path.extname(rel)).setHeader("Cache-Control", "public, max-age=3600");
      return res.send(body);
    }
    // Client-side routes (and "/") get the app shell.
    res.type("html").setHeader("Cache-Control", "no-cache");
    res.send(index);
  });
  return true;
}
