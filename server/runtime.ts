// How the app is running: from the source tree (npm start / GATE-Tutor.bat) or as the packaged
// GATE-Tutor.exe (a Node single-executable application with the web app and lessons embedded).
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isSea } from "node:sea";

export const IS_EXE = isSea();

/** Folder holding the app: the project root from source, or the folder containing GATE-Tutor.exe. */
export const APP_DIR = IS_EXE
  ? path.dirname(process.execPath)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
