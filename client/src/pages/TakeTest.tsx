// GATE-style exam interface: countdown, sections, palette, mark-for-review, auto-submit.
// Like the real exam, a changed answer is stored only when you press "Save & Next" or
// "Mark for Review & Next"; jumping away via the palette discards unsaved changes.
import * as React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Clock, Lock, AlertTriangle, ChevronLeft, ClipboardList, Scale, Clock3, Grid3x3, Flag, Eraser, Save, Play, Info } from "lucide-react";
import type { QuestionPublic, QResponse } from "@shared/types";
import { api, ApiError } from "@/lib/api";
import { Button, Modal, PageLoader, ErrorBox, Card, IconChip, Callout } from "@/components/ui";
import { QuestionCard, QuestionMeta, isAnswered } from "@/components/QuestionCard";
import { Logo } from "@/components/Layout";
import { cn, fmtClock } from "@/lib/utils";

type QState = "not_visited" | "not_answered" | "answered" | "marked" | "answered_marked";
interface Item { idx: number; section: string; marks: number; negative: number; state: QState; timeMs: number; response: QResponse | null; question: QuestionPublic }
interface View { id: number; title: string; kind: string; status: string; durationSec: number; startedAt: string | null; deadline: number | null; serverNow: number; sections: string[]; items: Item[]; config: { warnings?: string[] } }

// Shapes mirror the official GATE palette so the real exam feels familiar.
const STATE_STYLE: Record<QState, { cls: string; label: string }> = {
  not_visited: { cls: "bg-card text-foreground/80 border-border-strong rounded-md", label: "Not visited" },
  not_answered: { cls: "bg-red-500 text-white border-red-600 [clip-path:polygon(0_0,100%_0,100%_75%,50%_100%,0_75%)]", label: "Not answered" },
  answered: { cls: "bg-green-600 text-white border-green-700 [clip-path:polygon(0_25%,50%_0,100%_25%,100%_100%,0_100%)]", label: "Answered" },
  marked: { cls: "bg-violet-600 text-white border-violet-700 rounded-full", label: "Marked for review" },
  answered_marked: { cls: "bg-violet-600 text-white border-violet-700 rounded-full ring-2 ring-green-500 ring-offset-1 ring-offset-card", label: "Answered & marked (will be evaluated)" },
};

export function TakeTest() {
  const { id } = useParams();
  const nav = useNavigate();
  const [view, setView] = React.useState<View | null>(null);
  const [err, setErr] = React.useState<unknown>(null);
  const [items, setItems] = React.useState<Item[]>([]);
  const [cur, setCur] = React.useState(0);
  const [draft, setDraft] = React.useState<QResponse>({});
  const [now, setNow] = React.useState(Date.now());
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [starting, setStarting] = React.useState(false);
  const offset = React.useRef(0);
  const enteredAt = React.useRef(Date.now());
  const submittedRef = React.useRef(false);
  const itemsRef = React.useRef<Item[]>([]);
  itemsRef.current = items;

  const load = React.useCallback(async () => {
    try {
      const v = await api.get<View>(`/tests/${id}`);
      if (v.status === "submitted") return nav(`/tests/${id}/report`, { replace: true });
      offset.current = v.serverNow - Date.now();
      setView(v); setItems(v.items);
      if (v.status === "in_progress") {
        const first = Math.max(0, v.items.findIndex((i) => i.state === "not_visited"));
        visit(first, v.items);
      }
    } catch (e) { setErr(e); }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => { load(); }, [load]);

  const remaining = view?.deadline ? view.deadline - (now + offset.current) : 0;

  const persist = React.useCallback(async (updates: { idx: number; response?: QResponse | null; state?: QState; timeMs?: number }[]) => {
    if (!updates.length || submittedRef.current) return;
    try { await api.put(`/tests/${id}/state`, { items: updates }); }
    catch (e) { if (e instanceof ApiError && e.status === 409) { submittedRef.current = true; nav(`/tests/${id}/report`, { replace: true }); } }
  }, [id, nav]);

  const elapsedOnCurrent = () => Date.now() - enteredAt.current;
  const flushTime = (list = itemsRef.current) => {
    const ms = elapsedOnCurrent();
    enteredAt.current = Date.now();
    return list.map((it) => (it.idx === curRef.current ? { ...it, timeMs: it.timeMs + ms } : it));
  };
  const curRef = React.useRef(0);

  function visit(idx: number, list = itemsRef.current) {
    let next = flushTime(list);
    const target = next[idx];
    const changed: { idx: number; state?: QState; timeMs?: number }[] = [];
    const prev = next.find((x) => x.idx === curRef.current);
    if (prev) changed.push({ idx: prev.idx, timeMs: prev.timeMs });
    if (target.state === "not_visited") {
      next = next.map((x) => (x.idx === idx ? { ...x, state: "not_answered" } : x));
      changed.push({ idx, state: "not_answered" });
    }
    curRef.current = idx;
    setItems(next); setCur(idx); setDraft(target.response ?? {});
    persist(changed);
  }

  // Timer tick + periodic autosave of time spent.
  React.useEffect(() => {
    if (view?.status !== "in_progress") return;
    const t = window.setInterval(() => setNow(Date.now()), 500);
    const s = window.setInterval(() => {
      const it = itemsRef.current.find((x) => x.idx === curRef.current);
      if (it) persist([{ idx: it.idx, timeMs: it.timeMs + elapsedOnCurrent() }]);
    }, 15_000);
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => { window.clearInterval(t); window.clearInterval(s); window.removeEventListener("beforeunload", warn); };
  }, [view?.status, persist]);

  const submit = React.useCallback(async (auto: boolean) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    const list = flushTime();
    try {
      await api.put(`/tests/${id}/state`, { items: list.map((x) => ({ idx: x.idx, timeMs: x.timeMs })) }).catch(() => {});
      await api.post(`/tests/${id}/submit`, { auto });
      nav(`/tests/${id}/report`, { replace: true });
    } catch (e) { setErr(e); submittedRef.current = false; setSubmitting(false); }
  }, [id, nav]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (view?.status === "in_progress" && view.deadline && remaining <= 0 && !submittedRef.current) submit(true);
  }, [remaining, view, submit]);

  if (err) return <div className="mx-auto max-w-3xl p-6"><ErrorBox error={err} onRetry={() => { setErr(null); load(); }} /></div>;
  if (!view) return <div className="mx-auto max-w-5xl p-6"><PageLoader /></div>;

  if (view.status === "ready") {
    const warnings: string[] = JSON.parse(sessionStorage.getItem(`test-warn-${view.id}`) ?? "null") ?? view.config.warnings ?? [];
    const marks = view.items.reduce((a, i) => a + i.marks, 0);
    return (
      <div className="mx-auto max-w-3xl space-y-5 p-6 animate-fade-in">
        <Link to="/tests" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ChevronLeft className="h-4 w-4" />Back to tests</Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-300">Exam mode</p>
          <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight">{view.title}</h1>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[{ icon: ClipboardList, v: view.items.length, l: "questions" }, { icon: Scale, v: marks, l: "marks" }, { icon: Clock3, v: Math.round(view.durationSec / 60), l: "minutes" }].map((x) => (
            <Card key={x.l} className="flex items-center gap-3 p-4"><IconChip icon={x.icon} tone="rose" /><p><b className="text-xl tabular-nums">{x.v}</b> <span className="text-sm text-muted-foreground">{x.l}</span></p></Card>
          ))}
        </div>
        <Card className="exam-wash space-y-4 p-6 text-sm">
          <p className="flex items-center gap-2 font-semibold"><Info className="h-4 w-4 text-rose-600" />Instructions</p>
          <ul className="space-y-2.5">
            {[
              "The clock starts when you press Start and keeps running if you close the window.",
              "MCQ: one correct option; a wrong answer deducts ⅓ of the question's marks. MSQ: one or more correct options; no negative marks and no partial credit. NAT: type a number; no negative marks.",
              <>Use <b>Save &amp; Next</b> to store an answer. <b>Mark for Review &amp; Next</b> flags a question; an answered-and-marked question is still evaluated.</>,
              "Changing an answer and jumping elsewhere through the palette without saving discards the change (as in the real exam).",
              "No hints, solutions or AI assistance until you submit. The test submits automatically when time runs out.",
            ].map((t, i) => (
              <li key={i} className="flex gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-card text-[11px] font-bold text-muted-foreground ring-1 ring-border">{i + 1}</span><span className="text-foreground/85">{t}</span></li>
            ))}
          </ul>
          {warnings.length > 0 && <Callout tone="amber" icon={AlertTriangle}>{warnings.join(" ")}</Callout>}
          <Button size="lg" variant="danger" loading={starting} onClick={async () => {
            setStarting(true);
            try { const v = await api.post<View>(`/tests/${id}/start`); offset.current = v.serverNow - Date.now(); setView(v); setItems(v.items); enteredAt.current = Date.now(); visit(0, v.items); }
            catch (e) { setErr(e); } finally { setStarting(false); }
          }}>
            <Play className="h-4 w-4" />Start test
          </Button>
        </Card>
      </div>
    );
  }

  const item = items[cur];
  const sectionItems = items.filter((i) => i.section === item.section);
  const saved = item.response ?? {};
  const dirty = JSON.stringify(draft.selected ?? null) !== JSON.stringify(saved.selected ?? null) || (draft.value ?? null) !== (saved.value ?? null);
  const counts = (Object.keys(STATE_STYLE) as QState[]).reduce((a, k) => ({ ...a, [k]: items.filter((i) => i.state === k).length }), {} as Record<QState, number>);
  const nextIdx = Math.min(items.length - 1, cur + 1);
  const low = remaining < 5 * 60_000;
  const answeredN = counts.answered + counts.answered_marked;

  const commit = (mark: boolean) => {
    const answered = isAnswered(item.question, draft);
    const state: QState = mark ? (answered ? "answered_marked" : "marked") : answered ? "answered" : "not_answered";
    const response = answered ? draft : null;
    const list = itemsRef.current.map((x) => (x.idx === item.idx ? { ...x, state, response } : x));
    itemsRef.current = list;
    persist([{ idx: item.idx, state, response }]);
    if (cur < items.length - 1) visit(nextIdx, list);
    else setItems(list);
  };
  const clear = () => {
    setDraft({});
    const list = items.map((x) => (x.idx === item.idx ? { ...x, state: "not_answered" as QState, response: null } : x));
    setItems(list);
    persist([{ idx: item.idx, state: "not_answered", response: null }]);
  };

  const palette = (
    <>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 border-b p-4 text-[11px]">
        {(Object.keys(STATE_STYLE) as QState[]).map((k) => (
          <div key={k} className={cn("flex items-center gap-2", k === "answered_marked" && "col-span-2")}>
            <span className={cn("flex h-7 w-8 shrink-0 items-center justify-center border text-[11px] font-semibold", STATE_STYLE[k].cls)}>{counts[k]}</span>
            <span className="leading-tight text-muted-foreground">{STATE_STYLE[k].label}</span>
          </div>
        ))}
      </div>
      <p className="px-4 pt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{item.section}</p>
      <div className="grid grid-cols-5 gap-2.5 overflow-y-auto p-4">
        {sectionItems.map((it) => (
          <div key={it.idx} className="flex flex-col items-center gap-1">
            <button onClick={() => { visit(it.idx); setPaletteOpen(false); }} title={STATE_STYLE[it.state].label} aria-current={it.idx === cur ? "true" : undefined}
              className={cn("flex h-10 w-full items-center justify-center border text-sm font-semibold transition-transform hover:scale-105 cursor-pointer", STATE_STYLE[it.state].cls)}>
              {it.idx + 1}
            </button>
            <span className={cn("h-1 w-6 rounded-full", it.idx === cur ? "bg-primary" : "bg-transparent")} />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center gap-3 border-b border-border/80 bg-card px-4 py-2.5 shadow-card">
        <Logo className="hidden h-8 w-8 sm:block" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{view.title}</p>
          <p className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:flex"><Lock className="h-3 w-3" />Exam mode · hints &amp; AI disabled · {answeredN}/{items.length} answered</p>
        </div>
        <div className={cn("ml-auto flex items-center gap-2 rounded-xl px-3 py-1.5 font-mono text-lg font-semibold tabular-nums transition-colors",
          low ? "bg-red-600 text-white animate-pulse" : "bg-accent text-accent-foreground")} role="timer" aria-label="Time remaining">
          <Clock className="h-4 w-4" />{fmtClock(remaining)}
        </div>
        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setPaletteOpen(true)} aria-label="Question palette"><Grid3x3 className="h-4 w-4" /></Button>
        <Button variant="danger" onClick={() => setConfirmOpen(true)} loading={submitting}>Submit</Button>
      </header>

      <div className="flex gap-1.5 overflow-x-auto border-b border-border/80 bg-card-soft px-3 py-2">
        {view.sections.map((s) => {
          const n = items.filter((i) => i.section === s);
          const a = n.filter((i) => i.state === "answered" || i.state === "answered_marked").length;
          return (
            <button key={s} onClick={() => visit(items.find((i) => i.section === s)!.idx)}
              className={cn("whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-medium transition cursor-pointer",
                s === item.section ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/75 hover:bg-card hover:shadow-card")}>
              {s} <span className={cn("ml-1 text-[11px] tabular-nums", s === item.section ? "opacity-80" : "text-muted-foreground")}>{a}/{n.length}</span>
            </button>
          );
        })}
      </div>

      <div className="flex min-h-0 flex-1">
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 bg-card px-5 py-2.5 text-sm">
            <span className="font-semibold">Question {cur + 1} <span className="font-normal text-muted-foreground">of {items.length}</span></span>
            <span className="flex items-center gap-2 text-xs">
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-medium text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200">+{item.marks} correct</span>
              <span className={cn("rounded-md px-2 py-0.5 font-medium", item.negative ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-200" : "bg-muted text-muted-foreground")}>
                {item.negative ? `−${item.negative.toFixed(2)} wrong` : "no negative marking"}
              </span>
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl p-5 md:p-8">
              <div className="mb-5"><QuestionMeta q={item.question} showDifficulty={false} /></div>
              <QuestionCard q={item.question} response={draft} onChange={setDraft} />
              {dirty && <p className="mt-5 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-200"><AlertTriangle className="h-4 w-4" />Unsaved change — press “Save &amp; Next” or “Mark for Review &amp; Next” to keep it.</p>}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-border/80 bg-card px-5 py-3">
            <Button variant="outline" onClick={() => commit(true)} className="border-violet-300 text-violet-700 hover:bg-violet-50 dark:border-violet-500/40 dark:text-violet-200 dark:hover:bg-violet-500/10"><Flag className="h-4 w-4" />Mark for Review &amp; Next</Button>
            <Button variant="outline" onClick={clear}><Eraser className="h-4 w-4" />Clear Response</Button>
            <div className="ml-auto flex gap-2">
              <Button variant="ghost" disabled={cur === 0} onClick={() => visit(cur - 1)}><ChevronLeft className="h-4 w-4" />Previous</Button>
              <Button variant="success" onClick={() => commit(false)}><Save className="h-4 w-4" />Save &amp; Next</Button>
            </div>
          </div>
        </main>

        <aside className="hidden w-80 shrink-0 flex-col border-l border-border/80 bg-card md:flex">{palette}</aside>
      </div>

      <Modal open={paletteOpen} onClose={() => setPaletteOpen(false)} title="Question palette" className="max-w-sm">
        <div className="-m-5">{palette}</div>
      </Modal>
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Submit test?"
        footer={<><Button variant="ghost" onClick={() => setConfirmOpen(false)}>Keep working</Button><Button variant="danger" loading={submitting} onClick={() => submit(false)}>Submit now</Button></>}>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-500/10"><p className="text-2xl font-bold tabular-nums text-emerald-700 dark:text-emerald-300">{answeredN}</p><p className="text-xs text-muted-foreground">answered</p></div>
          <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10"><p className="text-2xl font-bold tabular-nums text-violet-700 dark:text-violet-300">{counts.marked + counts.answered_marked}</p><p className="text-xs text-muted-foreground">marked</p></div>
          <div className="rounded-xl bg-muted p-3"><p className="text-2xl font-bold tabular-nums">{counts.not_answered + counts.not_visited}</p><p className="text-xs text-muted-foreground">unanswered</p></div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Time remaining: <b className="font-mono text-foreground">{fmtClock(remaining)}</b>. You cannot change answers after submitting.</p>
      </Modal>
    </div>
  );
}
