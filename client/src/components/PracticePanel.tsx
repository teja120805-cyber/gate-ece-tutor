// Learning-mode practice: adaptive question selection, progressive hints, immediate feedback,
// step-by-step solutions, keyboard shortcuts and a hand-off to the AI tutor.
import * as React from "react";
import { Link } from "react-router-dom";
import { Lightbulb, Timer, ArrowRight, Sparkles, MessageCircle, Bookmark, BookmarkCheck, TrendingUp, TrendingDown, CheckCircle2, XCircle, SkipForward, Gauge, ListOrdered } from "lucide-react";
import type { QuestionPublic, QResponse, AttemptResult } from "@shared/types";
import { api, ApiError } from "@/lib/api";
import { useApp, isTypingTarget } from "@/lib/app";
import { QuestionCard, QuestionMeta, isAnswered } from "./QuestionCard";
import { Markdown } from "./Markdown";
import { Button, Card, ErrorBox, Empty, Kbd, Skeleton, Badge, Callout } from "./ui";
import { StatusBadge } from "./Status";
import { cn } from "@/lib/utils";

interface NextResp { question: QuestionPublic | null; exhausted: boolean; total: number; targetDifficulty: number; unseenRemaining: number }

export function PracticePanel({ conceptId, onAskTutor, onProgress }: {
  conceptId: string; onAskTutor: (text: string, questionId: string) => void; onProgress: () => void;
}) {
  const { ai, toast } = useApp();
  const [next, setNext] = React.useState<NextResp | null>(null);
  const [resp, setResp] = React.useState<QResponse>({});
  const [hints, setHints] = React.useState<string[]>([]);
  const [result, setResult] = React.useState<AttemptResult | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<unknown>(null);
  const [session, setSession] = React.useState({ n: 0, ok: 0, seen: [] as string[], history: [] as boolean[] });
  const [genBusy, setGenBusy] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  const started = React.useRef(Date.now());
  const resultRef = React.useRef<HTMLDivElement>(null);

  const load = React.useCallback(async (exclude: string[] = []) => {
    setErr(null); setResult(null); setResp({}); setHints([]); setBookmarked(false);
    try {
      const r = await api.get<NextResp>(`/practice/${conceptId}/next${exclude.length ? `?exclude=${exclude.slice(-3).join(",")}` : ""}`);
      setNext(r);
      started.current = Date.now();
    } catch (e) { setErr(e); }
  }, [conceptId]);
  React.useEffect(() => { load(); setSession({ n: 0, ok: 0, seen: [], history: [] }); }, [load]);

  const q = next?.question ?? null;
  const showHint = React.useCallback(async () => {
    if (!q || hints.length >= q.hintCount || result) return;
    const r = await api.get<{ hints: string[] }>(`/questions/${q.id}/hints?n=${hints.length + 1}`);
    setHints(r.hints);
  }, [q, hints.length, result]);
  const submit = React.useCallback(async () => {
    if (!q || busy || result || !isAnswered(q, resp)) return;
    setBusy(true);
    try {
      const r = await api.post<AttemptResult>(`/questions/${q.id}/attempt`, { response: resp, timeMs: Date.now() - started.current, hintsUsed: hints.length });
      setResult(r);
      setSession((s) => ({ n: s.n + 1, ok: s.ok + (r.correct ? 1 : 0), seen: [...s.seen, q.id], history: [...s.history, r.correct] }));
      onProgress();
      window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
    } catch (e) { setErr(e); } finally { setBusy(false); }
  }, [q, busy, result, resp, hints.length, onProgress]);
  const goNext = React.useCallback(() => { load(q ? [...session.seen, q.id] : session.seen); }, [load, q, session.seen]);

  // Keyboard: A–D / 1–4 pick, Enter check/next, H hint, S skip.
  React.useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (!q || e.ctrlKey || e.metaKey || e.altKey) return;
      const typing = isTypingTarget(e);
      if (e.key === "Enter" && (!typing || (e.target as HTMLElement).hasAttribute("data-nat-input"))) {
        e.preventDefault();
        if (result) goNext(); else submit();
        return;
      }
      if (typing || result) return;
      const key = e.key.toLowerCase();
      const idx = "abcd".indexOf(key) >= 0 ? "abcd".indexOf(key) : "1234".indexOf(key);
      if (idx >= 0 && q.options && idx < q.options.length) {
        e.preventDefault();
        if (q.type === "MCQ") setResp({ selected: [idx] });
        else setResp((r) => { const s = r.selected ?? []; return { selected: s.includes(idx) ? s.filter((x) => x !== idx) : [...s, idx].sort() }; });
      } else if (key === "h") { e.preventDefault(); showHint(); }
      else if (key === "s") { e.preventDefault(); goNext(); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [q, result, submit, goNext, showHint]);

  if (err instanceof ApiError && err.status === 423) {
    // An exam is running: practice, hints and the tutor stay locked until it is submitted.
    return (
      <Callout tone="rose" icon={Timer} title="Practice is paused while an exam is in progress"
        action={<><Link to="/tests"><Button variant="danger" size="sm">Go to the exam</Button></Link><Button size="sm" variant="outline" onClick={() => load()}>Check again</Button></>}>
        {err.message}
      </Callout>
    );
  }
  if (err) return <ErrorBox error={err} onRetry={() => load()} />;
  if (!next) return <Card className="space-y-4 p-6"><Skeleton className="h-5 w-48" /><Skeleton className="h-20" /><Skeleton className="h-12" /><Skeleton className="h-12" /></Card>;

  const generate = async () => {
    setGenBusy(true);
    try { await api.post(`/ai/questions/${conceptId}`, { count: 5 }); await load(session.seen); toast("5 new questions saved for offline use"); }
    catch (e) { setErr(e); } finally { setGenBusy(false); }
  };

  if (!q) {
    return (
      <Empty icon={<ListOrdered />} title="No practice questions for this concept yet">
        {ai?.configured
          ? <><p>Generate a fresh set with AI — they are stored locally so you can reuse them offline.</p><Button className="mt-4" onClick={generate} loading={genBusy}><Sparkles className="h-4 w-4" />Generate 5 questions</Button></>
          : <p>Connect an AI provider in Settings to generate questions, or import a question bank (Settings → Data).</p>}
      </Empty>
    );
  }

  const toggleBookmark = async () => {
    if (bookmarked) await api.del(`/bookmarks/question/${q.id}`); else await api.post("/bookmarks", { kind: "question", refId: q.id });
    setBookmarked(!bookmarked);
    toast(bookmarked ? "Bookmark removed" : "Question bookmarked", bookmarked ? "info" : "success");
  };

  return (
    <div className="space-y-4">
      {/* Session strip */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-border/80 bg-card px-4 py-2.5 text-sm shadow-card">
        <span className="font-medium">Session <b className="tabular-nums">{session.ok}/{session.n}</b> correct</span>
        <div className="flex items-center gap-1" aria-label="Answers this session">
          {session.history.slice(-12).map((ok, i) => (
            <span key={i} className={cn("h-2.5 w-2.5 rounded-full", ok ? "bg-[var(--good)]" : "bg-[var(--critical)]")} title={ok ? "Correct" : "Incorrect"} />
          ))}
        </div>
        <span className="flex items-center gap-1.5 text-muted-foreground"><Gauge className="h-4 w-4" />Adaptive level: <b className="font-medium text-foreground">{["", "easy", "medium", "hard"][next.targetDifficulty]}</b></span>
        <span className="text-muted-foreground">{next.total} in bank · {next.unseenRemaining} unseen</span>
        {next.exhausted && ai?.configured && <Button size="sm" variant="secondary" onClick={generate} loading={genBusy} className="ml-auto"><Sparkles className="h-4 w-4" />More questions (AI)</Button>}
      </div>

      <Card className="p-5 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-2">
          <QuestionMeta q={q} />
          <button onClick={toggleBookmark} title={bookmarked ? "Remove bookmark" : "Bookmark question"} className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-primary cursor-pointer">
            {bookmarked ? <BookmarkCheck className="h-5 w-5 text-primary" /> : <Bookmark className="h-5 w-5" />}
          </button>
        </div>
        <QuestionCard q={q} response={resp} onChange={setResp} disabled={!!result}
          reveal={result ? { answer: result.answer, range: result.range, correct: result.correct } : null} />

        {hints.length > 0 && !result && (
          <div className="mt-5 space-y-2">
            {hints.map((h, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-amber-200/80 bg-amber-50/80 p-3.5 text-sm dark:border-amber-500/25 dark:bg-amber-500/10 animate-fade-in">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
                <div className="min-w-0"><p className="mb-0.5 text-xs font-semibold text-amber-800 dark:text-amber-200">Hint {i + 1}</p><Markdown compact>{h}</Markdown></div>
              </div>
            ))}
          </div>
        )}

        {!result ? (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Button onClick={submit} loading={busy} disabled={!isAnswered(q, resp)} size="lg">Check answer</Button>
            {hints.length < q.hintCount && <Button variant="outline" size="lg" onClick={showHint}><Lightbulb className="h-4 w-4" />Hint {hints.length + 1} of {q.hintCount}</Button>}
            <Button variant="ghost" size="lg" onClick={goNext}><SkipForward className="h-4 w-4" />Skip</Button>
            <span className="ml-auto hidden items-center gap-1.5 text-[11px] text-muted-foreground lg:flex">
              {q.options && <><Kbd>A</Kbd>–<Kbd>D</Kbd> choose</>}<Kbd>Enter</Kbd> check{q.hintCount > 0 && <><Kbd>H</Kbd> hint</>}<Kbd>S</Kbd> skip
            </span>
          </div>
        ) : (
          <div ref={resultRef} className="mt-6 space-y-4 animate-fade-in">
            <div className={cn("flex items-center gap-3 rounded-xl p-3.5 font-medium",
              result.correct ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200" : "bg-red-50 text-red-800 dark:bg-red-500/10 dark:text-red-200")}>
              {result.correct ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <XCircle className="h-5 w-5 shrink-0" />}
              {result.correct ? (hints.length ? "Correct — with hints, so it counts a little less toward mastery." : "Correct! Nicely done.") : "Not quite. Walk through the solution below."}
            </div>
            <div className="rounded-xl border border-border/80 bg-card-soft p-4 md:p-5">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold"><span className="h-4 w-1 rounded-full bg-primary" />Step-by-step solution</p>
              <Markdown>{result.solution}</Markdown>
            </div>
            <MasteryDelta m={result.mastery} />
            <div className="flex flex-wrap items-center gap-2">
              <Button size="lg" onClick={goNext}>Next question <ArrowRight className="h-4 w-4" /></Button>
              {ai?.configured && (
                <Button size="lg" variant="outline" onClick={() => onAskTutor(result.correct ? "Can you explain a faster way to solve this question?" : "I got this question wrong. Where did my reasoning likely go wrong?", q.id)}>
                  <MessageCircle className="h-4 w-4" />Ask the tutor about this
                </Button>
              )}
              <span className="ml-auto hidden items-center gap-1.5 text-[11px] text-muted-foreground lg:flex"><Kbd>Enter</Kbd> next question</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export function MasteryDelta({ m }: { m: AttemptResult["mastery"] }) {
  const rank = ["not_started", "learning", "practicing", "mastered"];
  const changed = m.status !== m.previousStatus;
  const down = changed && rank.indexOf(m.status) < rank.indexOf(m.previousStatus);
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      {down ? <TrendingDown className="h-4 w-4 text-danger" /> : <TrendingUp className="h-4 w-4 text-primary" />}
      Mastery now <b className="text-foreground tabular-nums">{m.score}/100</b>
      <StatusBadge status={m.status} />
      {changed && <Badge tone={down ? "rose" : "emerald"}>{down ? "dropped from" : "up from"} {m.previousStatus.replace("_", " ")}</Badge>}
    </div>
  );
}
