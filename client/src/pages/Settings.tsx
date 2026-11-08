import * as React from "react";
import { Link } from "react-router-dom";
import { Download, Upload, Database, RotateCcw, Save, Bot, FileJson, Printer, CheckCircle2, XCircle, Settings as SettingsIcon, Sun, Moon, Monitor, SlidersHorizontal, CalendarClock, FileUp, RefreshCw, HardDrive } from "lucide-react";
import { api } from "@/lib/api";
import { useApp, useLoad, type Theme } from "@/lib/app";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, PageLoader, Modal, PageHeader, IconChip, Field, Badge } from "@/components/ui";
import { ModeSwitch } from "@/components/Layout";
import { download, fmtDate, cn, daysUntil } from "@/lib/utils";

interface Info {
  app: { mode: "exe" | "source"; dataDir: string; envFile: string };
  db: { path: string; sizeBytes: number };
  counts: Record<string, number>;
  backups: { name: string; sizeBytes: number; createdAt: string }[];
}
const kb = (b: number) => (b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`);
const THEMES: { value: Theme; label: string; icon: React.ComponentType<{ className?: string }>; preview: string }[] = [
  { value: "light", label: "Light", icon: Sun, preview: "bg-[#f5efe4]" },
  { value: "dark", label: "Dark", icon: Moon, preview: "bg-[#0d0f17]" },
  { value: "system", label: "System", icon: Monitor, preview: "bg-gradient-to-r from-[#f5efe4] from-50% to-[#0d0f17] to-50%" },
];

export function SettingsPage() {
  const { prefs, setPrefs, ai, refreshAi, toast } = useApp();
  const { data: info, reload } = useLoad<Info>("/data/info");
  const { data: usage, reload: reloadUsage } = useLoad<{ usage: { calls: number; input_tokens: number; output_tokens: number } }>("/ai/status");
  const [msg, setMsg] = React.useState<{ ok: boolean; text: string } | null>(null);
  const [restoreName, setRestoreName] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [checking, setChecking] = React.useState(false);
  const [goal, setGoal] = React.useState(String(prefs.dailyGoalMinutes));
  React.useEffect(() => { setGoal(String(prefs.dailyGoalMinutes)); }, [prefs.dailyGoalMinutes]);
  const jsonRef = React.useRef<HTMLInputElement>(null);
  const dbRef = React.useRef<HTMLInputElement>(null);
  const qRef = React.useRef<HTMLInputElement>(null);

  const run = async (fn: () => Promise<string>) => {
    setBusy(true); setMsg(null);
    try { setMsg({ ok: true, text: await fn() }); reload(); } catch (e) { setMsg({ ok: false, text: (e as Error).message }); } finally { setBusy(false); }
  };
  const readJson = async (f: File) => JSON.parse(await f.text());
  const examIn = prefs.examDate ? daysUntil(prefs.examDate) : null;

  return (
    <div className="space-y-6">
      <PageHeader icon={SettingsIcon} tone="slate" title="Settings & data" description="Everything is stored on this computer. Nothing here needs an account." />
      {msg && (
        <div className={cn("flex items-start gap-2.5 rounded-2xl border p-4 text-sm animate-fade-in", msg.ok ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10" : "border-red-200 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10")}>
          {msg.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />}{msg.text}
        </div>
      )}

      <Card>
        <CardHeader className="flex-row items-center gap-3"><IconChip icon={SlidersHorizontal} tone="indigo" /><div><CardTitle>Study preferences</CardTitle><CardDescription>Appearance, goals and your exam date</CardDescription></div></CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="mb-2 text-[13px] font-medium">Theme</p>
            <div className="grid max-w-xl grid-cols-3 gap-3">
              {THEMES.map((t) => (
                <button key={t.value} onClick={() => setPrefs({ theme: t.value })} aria-pressed={prefs.theme === t.value}
                  className={cn("overflow-hidden rounded-xl border text-left transition cursor-pointer", prefs.theme === t.value ? "border-primary ring-2 ring-primary/20" : "border-border-strong/60 hover:border-border-strong")}>
                  <div className={cn("h-14 border-b", t.preview)}>
                    <div className="flex h-full items-end gap-1.5 p-2">
                      <span className="h-6 w-8 rounded-md bg-[#fffcf6] shadow-sm ring-1 ring-black/5" /><span className="h-4 w-10 rounded-md bg-indigo-500/80" />
                    </div>
                  </div>
                  <p className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium"><t.icon className="h-4 w-4 text-muted-foreground" />{t.label}{prefs.theme === t.value && <CheckCircle2 className="ml-auto h-4 w-4 text-primary" />}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-6">
            <Field label="Default mode"><ModeSwitch compact /></Field>
            <Field label="Daily goal (minutes)" hint="Shown as the ring on your dashboard">
              <Input type="number" min={10} max={720} className="w-28" value={goal} onChange={(e) => setGoal(e.target.value)}
                onBlur={() => { const v = Number(goal); if (Number.isFinite(v) && v >= 10) { setPrefs({ dailyGoalMinutes: v }); toast("Daily goal updated"); } else setGoal(String(prefs.dailyGoalMinutes)); }} />
            </Field>
            <Field label={<span className="flex items-center gap-1.5"><CalendarClock className="h-3.5 w-3.5" />GATE exam date</span>}
              hint={examIn != null ? (examIn >= 0 ? `${examIn} day${examIn === 1 ? "" : "s"} to go — shown in the header and dashboard` : "That date has passed") : "Optional — adds a countdown"}>
              <div className="flex gap-2">
                <Input type="date" className="w-44" value={prefs.examDate ?? ""} onChange={(e) => setPrefs({ examDate: e.target.value || null })} />
                {prefs.examDate && <Button variant="ghost" size="sm" className="h-9" onClick={() => setPrefs({ examDate: null })}>Clear</Button>}
              </div>
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center gap-3">
          <IconChip icon={Bot} tone="violet" />
          <div><CardTitle>AI connection <Badge tone={ai?.configured ? "emerald" : undefined}>{ai?.configured ? "connected" : "optional"}</Badge></CardTitle>
            <CardDescription>API keys are read from the <code>.env</code> file by the local server only — they never reach the browser.</CardDescription></div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/80 bg-card-soft p-3">
            <span className={cn("h-2.5 w-2.5 rounded-full", ai?.configured && ai.reachable !== false ? "bg-emerald-500" : "bg-stone-300 dark:bg-stone-600")} />
            <span className="flex-1">{ai?.message ?? "Checking…"}</span>
            <Button size="sm" variant="outline" loading={checking} onClick={async () => { setChecking(true); try { await refreshAi(true); reloadUsage(); } finally { setChecking(false); } }}><RefreshCw className="h-4 w-4" />Re-check</Button>
          </div>
          {usage && usage.usage.calls > 0 && <p className="text-muted-foreground">Usage logged so far: {usage.usage.calls} calls · {usage.usage.input_tokens.toLocaleString()} input / {usage.usage.output_tokens.toLocaleString()} output tokens.</p>}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-border/80 p-4"><p className="flex items-center gap-2 font-medium"><CheckCircle2 className="h-4 w-4 text-success" />Works without AI</p><p className="mt-1 text-muted-foreground">Built-in lessons, stored questions, hints and solutions, diagnostics, tests, mastery, revision, analytics, notebook, backups.</p></div>
            <div className="rounded-xl border border-border/80 p-4"><p className="flex items-center gap-2 font-medium"><Bot className="h-4 w-4 text-violet-500" />Needs AI</p><p className="mt-1 text-muted-foreground">AI tutor chat, generating lessons for concepts without one, generating extra practice questions.</p></div>
          </div>
          <details className="rounded-xl border border-border/80 bg-card-soft p-4">
            <summary className="cursor-pointer font-medium">How to connect</summary>
            <p className="mt-2 text-xs text-muted-foreground">Open <code className="break-all rounded bg-muted px-1">{info?.app.envFile ?? ".env"}</code> in Notepad, fill in one of the blocks below, save, then close and restart GATE Tutor.</p>
            <pre className="mt-3 overflow-x-auto rounded-lg border bg-card p-3 font-mono text-xs">{`# Cheapest: free local models with Ollama (https://ollama.com)
AI_PROVIDER=ollama
OLLAMA_MODEL=qwen3:8b

# Anthropic Claude
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-haiku-5-5

# Any OpenAI-compatible API (OpenAI, OpenRouter, Groq, Gemini, DeepSeek, LM Studio...)
AI_PROVIDER=openai
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_API_KEY=...
OPENAI_MODEL=<model name from your provider>`}</pre>
            <p className="mt-2 text-xs text-muted-foreground">See README.md for cost guidance. Generated lessons and questions are cached in your database, so each is paid for only once.</p>
          </details>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center gap-3">
          <IconChip icon={Database} tone="emerald" />
          <div className="min-w-0"><CardTitle>Your data</CardTitle>
            <CardDescription className="break-all">Database: <code className="rounded bg-muted px-1">{info?.db.path}</code> ({info ? kb(info.db.sizeBytes) : "…"}). Survives browser closes, app restarts and reboots.</CardDescription></div>
        </CardHeader>
        <CardContent className="space-y-5">
          {info && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[["answers", info.counts.attempts], ["tests", info.counts.tests], ["notes", info.counts.notes], ["bookmarks", info.counts.bookmarks],
                ["my formulas", info.counts.formula_notes], ["imported / AI Qs", info.counts.custom_questions], ["lessons", info.counts.lessons], ["active questions", info.counts.questions]].map(([l, v]) => (
                <div key={l} className="rounded-xl border border-border/80 bg-card-soft px-3 py-2"><p className="text-lg font-semibold tabular-nums">{v}</p><p className="text-xs text-muted-foreground">{l}</p></div>
              ))}
            </div>
          )}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2 rounded-xl border border-border/80 p-4">
              <p className="text-[13px] font-semibold">Back up &amp; export</p>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => run(async () => { const b = await api.post<{ name: string }>("/data/backup"); return `Backup saved: ${b.name}`; })} loading={busy}><Save className="h-4 w-4" />Create backup</Button>
                <Button variant="outline" onClick={() => download("/api/data/export")}><FileJson className="h-4 w-4" />Export JSON</Button>
                <Button variant="outline" onClick={() => download("/api/reports/performance.csv")}><Download className="h-4 w-4" />Report CSV</Button>
                <Link to="/report"><Button variant="outline"><Printer className="h-4 w-4" />Print / PDF</Button></Link>
              </div>
            </div>
            <div className="space-y-2 rounded-xl border border-border/80 p-4">
              <p className="text-[13px] font-semibold">Restore</p>
              <p className="text-xs text-muted-foreground">A safety backup of the current state is always made first.</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => jsonRef.current?.click()} disabled={busy}><Upload className="h-4 w-4" />From JSON export</Button>
                <Button variant="outline" onClick={() => dbRef.current?.click()} disabled={busy}><HardDrive className="h-4 w-4" />From .db file</Button>
              </div>
            </div>
          </div>
          <input ref={jsonRef} type="file" accept=".json,application/json" hidden onChange={(e) => {
            const f = e.target.files?.[0]; e.target.value = "";
            if (f && confirm("Replace ALL current progress with this export? A safety backup is created first."))
              run(async () => { const r = await api.post<{ safetyBackup: string }>("/data/import", await readJson(f)); return `Progress restored. Safety backup of the previous state: ${r.safetyBackup}. Reload the page to see everything.`; });
          }} />
          <input ref={dbRef} type="file" accept=".db" hidden onChange={(e) => {
            const f = e.target.files?.[0]; e.target.value = "";
            if (f && confirm("Replace the current database with this backup file? A safety backup is created first."))
              run(async () => { const r = await api.upload<{ safetyBackup: string }>("/data/restore-upload", f); return `Database restored. Safety backup: ${r.safetyBackup}. Reload the page.`; });
          }} />

          <div>
            <p className="mb-2 text-[13px] font-semibold">Backups <span className="font-normal text-muted-foreground">· automatic daily backup on start, last 14 kept</span></p>
            {!info ? <PageLoader /> : !info.backups.length ? <p className="text-sm text-muted-foreground">No backups yet.</p> : (
              <div className="max-h-72 overflow-y-auto rounded-xl border">
                {info.backups.map((b, i) => (
                  <div key={b.name} className={cn("flex flex-wrap items-center gap-3 px-3 py-2.5 text-sm", i > 0 && "border-t")}>
                    <span className="min-w-0 flex-1 truncate font-mono text-xs">{b.name}</span>
                    <span className="text-xs text-muted-foreground">{fmtDate(b.createdAt, true)} · {kb(b.sizeBytes)}</span>
                    <Button size="icon-sm" variant="ghost" title="Download" onClick={() => download(`/api/data/backups/${encodeURIComponent(b.name)}`)}><Download className="h-4 w-4" /></Button>
                    <Button size="sm" variant="outline" onClick={() => setRestoreName(b.name)}><RotateCcw className="h-4 w-4" />Restore</Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center gap-3">
          <IconChip icon={FileUp} tone="amber" />
          <div><CardTitle>Import a question bank</CardTitle>
            <CardDescription>Add official previous-year questions (from the official GATE papers) or your own. They are labelled by source everywhere in the app.</CardDescription></div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <Button variant="outline" onClick={() => qRef.current?.click()} disabled={busy}><Upload className="h-4 w-4" />Import questions (JSON)</Button>
          <input ref={qRef} type="file" accept=".json,application/json" hidden onChange={(e) => {
            const f = e.target.files?.[0]; e.target.value = "";
            if (f) run(async () => {
              const r = await api.post<{ imported: number; errors: string[]; errorCount: number }>("/data/import-questions", await readJson(f));
              return `Imported ${r.imported} questions.${r.errorCount ? ` ${r.errorCount} rejected: ${r.errors.slice(0, 3).join(" | ")}` : ""}`;
            });
          }} />
          <details className="rounded-xl border border-border/80 bg-card-soft p-4">
            <summary className="cursor-pointer font-medium">JSON format</summary>
            <pre className="mt-3 overflow-x-auto rounded-lg border bg-card p-3 font-mono text-xs">{`[
  {
    "concept": "ss-convolution",          // concept id (shown in the concept page URL)
    "type": "MCQ",                         // MCQ | MSQ | NAT
    "difficulty": 2, "marks": 1,           // difficulty 1-3, marks 1 or 2
    "pattern": "numerical",
    "stem": "Markdown with $LaTeX$ ...",
    "options": ["A", "B", "C", "D"],       // MCQ/MSQ: exactly 4
    "answer": [1],                         // 0-based option indices
    "solution": "Step-by-step ...",
    "hints": ["optional"],
    "source": "official-pyq",              // or omit for your own questions
    "sourceRef": "GATE EC 2023 Q12"        // required for official PYQs
  },
  { "concept": "ss-sampling", "type": "NAT", "difficulty": 2, "marks": 2,
    "pattern": "numerical", "stem": "...", "range": [399.5, 400.5], "solution": "..." }
]`}</pre>
          </details>
        </CardContent>
      </Card>

      <Modal open={!!restoreName} onClose={() => setRestoreName(null)} title="Restore this backup?"
        footer={<><Button variant="ghost" onClick={() => setRestoreName(null)}>Cancel</Button>
          <Button variant="danger" loading={busy} onClick={() => { const n = restoreName!; setRestoreName(null); run(async () => { const r = await api.post<{ safetyBackup: string }>("/data/restore", { name: n }); return `Restored ${n}. Safety backup of the previous state: ${r.safetyBackup}. Reload the page.`; }); }}>Restore</Button></>}>
        <p className="text-sm">Your current database will be replaced by <b className="font-mono">{restoreName}</b>. A safety backup of the current state is made first, so this can be undone.</p>
      </Modal>
    </div>
  );
}
