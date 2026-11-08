# GATE ECE Tutor

A local-first, adaptive learning platform for **GATE Electronics & Communication Engineering (EC)**.
It runs entirely on your own computer: one Node.js process serves the app at `http://localhost:3210`
and keeps all your progress in a local SQLite database. No accounts, no cloud, no Docker.

---

## Quick start (Windows)

### Option A: one program, GATE-Tutor.exe (recommended)

`release/GATE-Tutor.exe` is the whole app in a single file (about 90 MB): the server, the web app, all lessons,
questions and formulas. It does not need Node.js or an internet connection.

1. Copy **`GATE-Tutor.exe`** anywhere you like (Desktop, Documents, a USB stick, another laptop).
   Right-click it, then **Pin to Start** / **Send to → Desktop (create shortcut)** if you want a shortcut.
2. Double-click it. A small console window opens and your browser opens at **http://localhost:3210**.
3. Keep the console window open while you study; close it to stop. Double-clicking again while it runs just
   reopens the browser.

Progress is stored in **`%APPDATA%GATE-Tutor`** (paste that into the Explorer address bar to open it), so you
can move, rename or replace the .exe without losing anything. Settings → Your data shows the exact paths.

**Building or updating the .exe** (after editing content or code, or on a new machine with Node installed):
run `npm run build:exe`. It writes `release/GATE-Tutor.exe` and smoke-tests it. Close the running app first.

### Option B: run from source with GATE-Tutor.bat

1. Install **Node.js 22.13 or newer** (the current LTS is recommended) from <https://nodejs.org>. Keep the default options.
2. Double-click **`GATE-Tutor.bat`** in this folder.
   - First run: it installs dependencies (needs internet, about a minute), builds the web app and creates the database.
   - Later runs: it starts in a couple of seconds and opens your browser automatically.
3. Study at **http://localhost:3210**. Keep the console window open; close it (or press Ctrl+C) to stop.

Double-clicking `GATE-Tutor.bat` while the app is already running simply opens the browser again.
`GATE-Tutor.bat rebuild` forces a rebuild of the web app (normally automatic when the source changes).

---

## What works offline and what needs AI

| Works with no AI connection | Needs an AI connection |
|---|---|
| Built-in lessons, formulas and interactive visuals | AI tutor chat (Learning mode only) |
| All stored questions with hints and step-by-step solutions | Generating a lesson for a concept that has no built-in lesson |
| Prerequisite diagnostics, mastery tracking, spaced revision | Generating extra practice questions |
| Exam mode: topic, subject, mixed and full-length tests | |
| Analytics, notebook, bookmarks, notes, backups and exports | |

Anything the AI generates is saved in your database, so it stays available offline afterwards.
Features that need AI are labelled in the app and are disabled with an explanation when no provider is configured.

---

## Connecting an AI provider (optional)

Edit the **`.env`** file, then restart. Keys are read only by the local server and are never sent to the browser.

- **GATE-Tutor.exe:** `%APPDATA%GATE-Tutor.env` (created on first run, with every setting blank). A `.env` placed
  next to the .exe takes priority, which is handy for a portable USB setup.
- **GATE-Tutor.bat:** `.env` in this folder (created from `.env.example` on first run).

Settings → AI connection → "How to connect" shows the exact file to edit.

```ini
# Free, offline, private: Ollama (https://ollama.com), then run:  ollama pull qwen3:8b
AI_PROVIDER=ollama
OLLAMA_MODEL=qwen3:8b

# Anthropic Claude
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-haiku-5-5

# Any OpenAI-compatible API: OpenAI, OpenRouter, Groq, Google Gemini (OpenAI-compatible endpoint), LM Studio...
AI_PROVIDER=openai
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_API_KEY=...
OPENAI_MODEL=<the model name your provider uses>
```

### Cost guidance

How the app spends tokens:

- **Lesson and question generation is a one-time cost.** Each generated lesson or question set is stored in SQLite and never generated again unless you ask.
- **Tutor chat is the only recurring cost.** Each message sends the concept's lesson excerpt plus the last 12 messages, so clearing old conversations keeps requests small.
- **Every call is logged** with its token counts (Settings → AI connection), so you can see exactly what you have used.

Options, cheapest first:

1. **Ollama (free).** Runs on your PC. An 8B-parameter model needs about 8 GB of free RAM and is much faster with a GPU. Quality is fine for explanations, but weaker on multi-step numericals: double-check generated answers.
2. **A small hosted model** such as Claude Haiku or the low-cost models on OpenRouter, Groq or Gemini. Typical study use (tens of tutor messages a day plus occasional generation) usually costs very little. **Check current per-token prices on the provider's pricing page**, because they change often.
3. **Larger hosted models.** Best for deriving and verifying tricky numericals, but several times the price. Switch `*_MODEL` in `.env` only when you need them.

A practical setup: use a cheap hosted model day to day, and switch the model name temporarily when generating question sets you want to be especially reliable.

---

## How the learning engine works

### 1. Complete syllabus and prerequisite graph
`content/syllabus.ts` contains the full GATE EC syllabus: General Aptitude plus Sections 1–8, organised as
**subject → chapter → topic → concept** (10 subjects, 183 concepts). Each concept lists its prerequisites,
including ones in other subjects (for example, Convolution depends on time shifting, time scaling, graphical
interpretation, definite integrals, the impulse and system properties). The graph is validated as a DAG on every start.

### 2. Prerequisite detection
When you open a concept whose prerequisites are not yet strong, the app offers a **3–5 question check** drawn
from the weakest prerequisites (preferring questions marked as diagnostic, and ones you have not seen).
- You can **skip** it if you are confident; you won't be asked again for 14 days.
- Wrong answers create **prerequisite gaps**. The app then recommends *only those missing concepts*, plus one
  level deeper if that concept also rests on weak foundations, rather than the whole chapter.
- Chapters have a **Readiness check** (Syllabus page) covering prerequisites that live outside the chapter.
- Results are stored and feed the dashboard's "What to study next" list. A gap is resolved automatically once
  that concept reaches a mastery score of 60.

### 3. Learning mode vs Exam mode
Switch at the top of every page.
- **Learning:** lessons with derivations, worked examples and interactive visuals, adaptive practice (difficulty rises
  after consecutive successes and falls after mistakes), progressive hints, immediate feedback, step-by-step solutions
  and the AI tutor.
- **Exam:** GATE conditions. There is a countdown timer, MCQ/MSQ/NAT questions, mark-for-review, a question
  palette with GATE's status shapes, section tabs and auto-submit at time-out. **No hints, solutions or AI**: the
  server refuses hint and AI requests while a test is in progress. As in the real exam, a changed answer is kept only
  when you press *Save & Next* or *Mark for Review & Next*.
- **Marking:** MCQ wrong answers lose ⅓ of the question's marks; MSQ and NAT have no negative marking; MSQ gets no
  partial credit.
- **Test types:** topic, subject, mixed-subject, and full-length (65 questions, 100 marks, 180 min: GA 10 questions
  for 15 marks, technical 55 questions for 85 marks, distributed by typical subject weight).
- **Report:** total marks, correct/incorrect/unattempted, accuracy, negative marks, time per question,
  subject/section/type/source breakdowns, conceptual weaknesses, solutions, and recommended revision topics.
- **Source filter:** tests can use all questions, official PYQs only, or practice/AI questions only. Each question's
  source is labelled everywhere.

### 4. Concept mastery engine
Each concept has a status (**Not Started → Learning → Practicing → Mastered**) and a **mastery score from 0 to 100**.

- **Reading a lesson never makes a concept Mastered.**
- **Mastered** requires all of the following:
  - at least 5 *different* questions;
  - at least 2 question patterns or types;
  - at least 80% weighted accuracy;
  - a **retention check**: ≥70% on at least 2 revision or exam questions answered at least 20 hours after you first
    practised the concept.
- **What moves the score:**
  - Each distinct question contributes **one** data point: its first attempt, blended with its latest attempt only if
    you re-tested it on a later day. Answering the same question correctly over and over does not raise the score.
  - Recent attempts count more (30-day half-life).
  - Harder questions count more.
  - Hints reduce credit.
  - Repeated mistakes and a streak of misses are penalised.
  - Revision performance moves the score up or down.
- **Caps:** the score stays at or below 79 until the variety criteria are met, and at or below 89 until retention is proven.
- **Downgrades:** if revision or exam performance falls (below 60% on recent retention questions, or the score drops
  under 80), a Mastered concept is downgraded automatically. If it collapses below 50 after practice, it is flagged
  **Relearn**. Every change is recorded and shown in Analytics.
- **Visibility:** mastery is shown per concept, topic, chapter and subject. The **Mastery Map** colours every concept
  so weak areas stand out.

### 5. Spaced repetition
Once practised, each concept gets an SM-2-style schedule (1 day, 3 days, then interval × ease). Revision sessions
use questions you have not seen in the last 3 days, without hints. Good results push the next review out; poor
results bring it back and lower the ease. Exam results update the schedule too.

---

## Your data

- **Location:** `%APPDATA%GATE-Tutorgate.db` for GATE-Tutor.exe, or `data/gate.db` inside this folder for
  GATE-Tutor.bat (SQLite in WAL mode). The two are separate databases. To carry progress across, export JSON in
  one and import it in the other (Settings → Your data). Set `GATE_DATA_DIR` to use a folder of your choice. Everything is saved as you go:
  progress, reading position, mastery, diagnostics, attempts, tests, bookmarks, notes, formula sheet, revision
  schedule, daily statistics and streaks. It survives browser closes, app restarts and reboots.
- **Automatic backups:** one per day when the app starts (the newest 14 are kept) in the `backups` folder next to the database.
- **Settings → Your data:**
  - export all progress to JSON, and restore from a JSON export;
  - create a database backup, and download, restore or upload `.db` backups (a safety backup is always taken
    before any restore or import);
  - export a concept-level performance CSV, or print or save a PDF performance report.
- **Moving to another computer:** copy `GATE-Tutor.exe` plus `gate.db` from the data folder (put it in
  `%APPDATA%GATE-Tutor` on the new machine), or use Settings → export JSON / import JSON.
- **Resetting:** stop the app and delete the data folder.

---

## Content status

The whole GATE EC syllabus is covered offline. No AI is needed for any lesson or question.

| Subject | Lessons | Questions |
|---|---|---|
| General Aptitude | 15/15 | 75 |
| Engineering Mathematics | 36/36 | 185 |
| Networks | 16/16 | 81 |
| Signals and Systems | 20/20 | 105 |
| Electronic Devices | 13/13 | 66 |
| Analog Circuits | 15/15 | 76 |
| Digital Circuits | 19/19 | 97 |
| Control Systems | 14/14 | 74 |
| Communications | 16/16 | 81 |
| Electromagnetics | 19/19 | 100 |
| **Total** | **183/183** | **940** |

- **Lessons:** every concept has a lesson with intuition, formal definitions, key results/derivations, a visual or
  tabular picture, worked examples, common GATE traps and a summary. Two interactive widgets are included:
  flip-and-slide convolution, and shifting/scaling/reversal.
- **Questions:** 940 original practice questions (351 MCQ, 133 MSQ, 456 NAT; a mix of 1- and 2-mark), each with
  hints and a step-by-step solution. Every concept has at least 5 different questions in 2+ patterns, so it can reach
  Mastered offline; every concept has at least one question tagged for prerequisite diagnostics.
- **Mock tests:** full-length papers draw exactly 65 questions and 100 marks — GA 5 × 1 + 5 × 2 marks; technical
  25 × 1 + 30 × 2 marks, spread by subject weight.
- **Formula reference:** 167 key formulas linked to their concepts, plus your own formula notebook.
- **Quality checks:** every numerical answer in the bank was recomputed during authoring, and
  `npm run validate-content` / `npm run check-math` verify structure and render every formula.

With an AI provider connected you can still generate *additional* questions or an alternative explanation for any
concept; generated items are labelled "AI-generated".

**Official previous-year questions are not bundled.** The built-in questions are original and labelled "Practice
(original)". To add official papers, import them (Settings → Import a question bank) with `"source": "official-pyq"`
and a `"sourceRef"` such as `"GATE EC 2023 Q12"`. The JSON format is shown in the app. Imported PYQs are labelled as
official everywhere and can be selected on their own in Exam mode.

### Adding your own content
- **Lessons:** add `content/lessons/<concept-id>.md` (Markdown + LaTeX; a fenced block ```` ```widget convolution ```` embeds a widget).
- **Questions:** add entries in `content/questions/*.ts`; **formulas:** `content/formulas.ts`.
- Run `npm run validate-content` and `npm run check-math`. Content is loaded into the database on every start,
  and your progress data is never touched.

---

## Developer notes

| Command | Purpose |
|---|---|
| `npm start` | Run the server (serves the built app from `dist/`) |
| `npm run dev` | API on :3210 with auto-restart, plus Vite dev server with hot reload on :5173 |
| `npm run build` | Build the web app into `dist/` |
| `npm run build:exe` | Package everything into `release/GATE-Tutor.exe` and smoke-test it (`scripts/build-exe.mjs`) |
| `npm test` | Unit tests: GATE marking, mastery rules, content validation |
| `npm run typecheck` | TypeScript check for client and server |
| `npm run validate-content` / `npm run check-math` | Validate syllabus/questions; render all LaTeX and report errors |

**Architecture**

| Part | Technology |
|---|---|
| Frontend (`client/`) | React 19, TypeScript, Vite, Tailwind CSS 4, shadcn-style components, KaTeX, Recharts |
| Backend (`server/`) | Node.js + Express 5, run with `tsx` (no compile step) |
| Database | Node's built-in `node:sqlite`, so no native modules to compile on Windows. Versioned migrations in `server/schema.ts`, raw SQL in small modules |
| Content (`content/`) | Syllabus, lessons, questions and formulas as plain files, loaded into SQLite on start |
| Packaging | Node's built-in single-executable support. esbuild bundles the server into one CommonJS file; the web app, lessons and `.env` template are embedded as SEA assets (`server/webapp.ts` serves them); `rcedit` sets the icon and name; `postject` injects the bundle into a copy of `node.exe` |
| Engines (`server/lib/`) | `mastery-core.ts` (pure, unit-tested), `diagnostics.ts`, `srs.ts`, `exams.ts`, `recommend.ts`, `ai.ts` |

Why not FastAPI or Next.js: a single Node process with built-in SQLite gives one install step, one startup command,
and no Python environment or native-module builds to break on Windows.

**Adding authentication later:** the app is single-user by design. To add users, create a `users` table, add a
`user_id` column to the learner tables listed in `server/schema.ts` (`USER_TABLES`) via a new migration, and scope
queries by the session user. Content tables are already shared and need no changes.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Node.js was not found" / "too old" | Install Node.js 22.13+ from nodejs.org, then reopen the script. |
| "Port 3210 is already in use by another program" | Set `PORT=3311` (or any free port) in `.env` (the error message names the file). |
| Windows shows "Windows protected your PC" for GATE-Tutor.exe | Happens only if the .exe was downloaded or emailed (it is not code-signed). Click **More info → Run anyway**, or build it yourself with `npm run build:exe`. |
| Antivirus quarantines GATE-Tutor.exe | It is a renamed Node.js with the app embedded; unsigned repackaged programs sometimes trip heuristics. Restore it and add an exception, or use GATE-Tutor.bat. |
| The .exe shows old content after you edited lessons or questions | Rebuild it with `npm run build:exe` (content is baked into the .exe). |
| Browser shows an old version after updating files | Run `GATE-Tutor.bat rebuild`. |
| AI shows "not configured" | Check `.env`; for Ollama make sure it is running and the model is pulled (Settings → Re-check). |
| Something looks wrong with your data | Settings → Backups → restore yesterday's automatic backup. |
