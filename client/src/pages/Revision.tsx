import * as React from "react";
import { Link } from "react-router-dom";
import { Repeat, CalendarClock, ShieldCheck, TrendingDown, ArrowRight, Target, X, CheckCircle2, XCircle, PartyPopper } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { QuestionPublic, QResponse, MasteryStatus } from "@shared/types";
import { api } from "@/lib/api";
import { useLoad } from "@/lib/app";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, PageLoader, ErrorBox, Progress, Empty, PageHeader, IconChip, Badge } from "@/components/ui";
import { QuestionCard, QuestionMeta, isAnswered } from "@/components/QuestionCard";
import { Markdown } from "@/components/Markdown";
import { StatusBadge, MasteryBar } from "@/components/Status";
import { MasteryDelta } from "@/components/PracticePanel";
import { ChartTooltip, AXIS } from "@/components/charts";
import { fmtDate, relDays, pct, cn } from "@/lib/utils";

interface Summary {
  due: { concept_id: string; name: string; subject: string; due_at: string; score: number; status: MasteryStatus; retentionCheck: boolean; reps: number }[];
  upcoming: { day: string; count: number }[];
  recent: { id: number; created_at: string; completed_at: string | null; result: { concepts: { name: string; accuracy: number }[] } | null }[];
}
interface Session {
  id: number; completed: boolean;
  items: { idx: number; conceptId: string; conceptName: string; answered: boolean; correct: boolean | null; question: QuestionPublic }[];
  result: { concepts: { conceptId: string; name: string; accuracy: number; nextDue: string; status: MasteryStatus; score: number; needsRelearn: boolean }[] } | null;
}

export function RevisionPage() {
  const { data, error, loading, reload } = useLoad<Summary>("/revision/summary");
  const [session, setSession] = React.useState<Session | null>(null);
  const [startErr, setStartErr] = React.useState<string | null>(null);
  const [starting, setStarting] = React.useState<"due" | "weak" | null>(null);

  const start = async (kind: "due" | "weak") => {
    setStartErr(null); setStarting(kind);
    try { setSession(await api.post<Session>("/revision", { kind })); } catch (e) { setStartErr((e as Error).message); } finally { setStarting(null); }
  };

  if (session) return <RevisionSession s={session} onExit={() => { setSession(null); reload(); }} />;
  if (loading && !data) return <PageLoader />;
  if (error) return <ErrorBox error={error} onRetry={reload} />;
  const d = data!;
  const retention = d.due.filter((x) => x.retentionCheck);
  const todayKey = new Date().toISOString().slice(0, 10);
  const forecast = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(Date.now() + i * 86_400_000);
    const day = date.toISOString().slice(0, 10);
    const n = d.upcoming.filter((u) => (i === 0 ? u.day <= day : u.day === day)).reduce((a, u) => a + u.count, 0);
    return { label: i === 0 ? "Today" : date.toLocaleDateString(undefined, { weekday: "short", day: "numeric" }), n, day };
  });

  return (
    <div className="space-y-6">
      <PageHeader icon={Repeat} tone="violet" title="Revision"
        description="Spaced repetition per concept. Each review uses questions you haven't seen recently, with no hints. Strong results push the next review further out; weak ones bring it back sooner and can downgrade mastery." />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="hero-wash p-6 lg:col-span-2">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-card shadow-card ring-1 ring-border/80">
              <span className="text-3xl font-bold tabular-nums">{d.due.length}</span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">due</span>
            </div>
            <div>
              <p className="text-lg font-semibold">{d.due.length ? `${d.due.length} concept${d.due.length === 1 ? "" : "s"} ready for review` : "You're all caught up"}</p>
              {retention.length > 0
                ? <p className="mt-0.5 flex items-center gap-1.5 text-sm text-success"><ShieldCheck className="h-4 w-4" />{retention.length} retention check{retention.length > 1 ? "s" : ""} — pass to reach Mastered</p>
                : <p className="mt-0.5 text-sm text-muted-foreground">Reviews keep what you've learned from fading.</p>}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button size="lg" onClick={() => start("due")} disabled={!d.due.length} loading={starting === "due"}><Repeat className="h-4 w-4" />Start revision session</Button>
            <Button size="lg" variant="outline" onClick={() => start("weak")} loading={starting === "weak"}><Target className="h-4 w-4" />Practise weakest</Button>
          </div>
          {startErr && <p className="mt-3 text-sm text-muted-foreground">{startErr}</p>}
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader className="pb-1"><CardTitle><CalendarClock className="h-4 w-4 text-muted-foreground" />Next 14 days</CardTitle><CardDescription>Reviews scheduled per day (today includes overdue)</CardDescription></CardHeader>
          <CardContent className="h-44 pb-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecast} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
                <XAxis dataKey="label" {...AXIS} interval={1} /><YAxis {...AXIS} allowDecimals={false} width={44} />
                <Tooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltip format={(v) => `${v} review${v === 1 ? "" : "s"}`} />} />
                <Bar dataKey="n" name="Scheduled" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Due concepts</CardTitle><CardDescription>Oldest first</CardDescription></CardHeader>
        <CardContent>
          {!d.due.length ? <Empty icon={<CalendarClock />} title="Nothing due right now">Concepts enter the schedule once you've practised them. Keep learning — reviews will appear here.</Empty> : (
            <div className="overflow-hidden rounded-xl border">
              {d.due.map((x, i) => (
                <Link key={x.concept_id} to={`/concept/${x.concept_id}`} className={cn("flex items-center gap-3 px-4 py-3 transition hover:bg-card-soft", i > 0 && "border-t")}>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-medium">{x.name}{x.retentionCheck && <Badge tone="emerald"><ShieldCheck className="h-3 w-3" />retention check</Badge>}</p>
                    <p className="text-xs text-muted-foreground">{x.subject} · <span className={x.due_at.slice(0, 10) < todayKey ? "text-warning" : ""}>{relDays(x.due_at)}</span></p>
                  </div>
                  <MasteryBar score={x.score} className="hidden w-32 sm:flex" />
                  <StatusBadge status={x.status ?? "not_started"} />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {d.recent.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Recent sessions</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {d.recent.map((r) => (
              <div key={r.id} className="flex flex-wrap justify-between gap-3 border-b pb-2 last:border-0">
                <span className="font-medium">{fmtDate(r.created_at, true)}</span>
                <span className="text-muted-foreground">{r.result ? r.result.concepts.map((c) => `${c.name} ${pct(c.accuracy)}`).join(" · ") : "not finished"}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function RevisionSession({ s: initial, onExit }: { s: Session; onExit: () => void }) {
  const [s, setS] = React.useState(initial);
  const [i, setI] = React.useState(() => Math.max(0, initial.items.findIndex((x) => !x.answered)));
  const [resp, setResp] = React.useState<QResponse>({});
  const [feedback, setFeedback] = React.useState<null | { correct: boolean; question: QuestionPublic; mastery: { score: number; status: MasteryStatus; previousStatus: MasteryStatus } }>(null);
  const [busy, setBusy] = React.useState(false);
  const started = React.useRef(Date.now());
  const item = s.items[i];
  const doneCount = s.items.filter((x) => x.answered).length;

  const answer = async () => {
    setBusy(true);
    try {
      const r = await api.post(`/revision/${s.id}/answer`, { idx: i, response: resp, timeMs: Date.now() - started.current });
      setFeedback(r);
      setS((old) => ({ ...old, items: old.items.map((x, k) => (k === i ? { ...x, answered: true, correct: r.correct } : x)) }));
    } finally { setBusy(false); }
  };
  const next = async () => {
    setFeedback(null); setResp({}); started.current = Date.now();
    if (i + 1 < s.items.length) setI(i + 1);
    else setS(await api.post<Session>(`/revision/${s.id}/complete`));
  };

  if (s.completed && s.result) {
    return (
      <div className="mx-auto max-w-3xl space-y-5 animate-fade-in">
        <Card className="hero-wash flex items-center gap-4 p-6">
          <IconChip icon={PartyPopper} tone="violet" size="lg" />
          <div><h1 className="text-2xl font-bold tracking-tight">Revision complete</h1><p className="text-sm text-muted-foreground">Your schedule has been updated from these results.</p></div>
        </Card>
        <Card className="overflow-hidden">
          {s.result.concepts.map((c, k) => (
            <div key={c.conceptId} className={cn("flex flex-wrap items-center gap-3 p-4", k > 0 && "border-t")}>
              <div className="min-w-0 flex-1">
                <Link to={`/concept/${c.conceptId}`} className="font-medium hover:underline">{c.name}</Link>
                <p className="text-xs text-muted-foreground">Accuracy {pct(c.accuracy)} · next review {relDays(c.nextDue)}</p>
                {c.needsRelearn && <p className="mt-1 flex items-center gap-1 text-xs text-danger"><TrendingDown className="h-3 w-3" />Performance dropped — relearn recommended</p>}
              </div>
              <StatusBadge status={c.status} />
              <span className="w-10 text-right text-sm font-semibold tabular-nums">{Math.round(c.score)}</span>
            </div>
          ))}
        </Card>
        <Button size="lg" onClick={onExit}>Back to revision</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 animate-fade-in">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-300">Revision session</p>
          <h1 className="text-xl font-bold tracking-tight">{item.conceptName}</h1>
        </div>
        <Button variant="ghost" onClick={onExit}><X className="h-4 w-4" />Exit</Button>
      </div>
      <div className="flex items-center gap-3">
        <Progress value={(doneCount / s.items.length) * 100} className="flex-1" />
        <span className="text-sm tabular-nums text-muted-foreground">{i + 1} / {s.items.length}</span>
      </div>
      <div className="flex gap-1">
        {s.items.map((x, k) => (
          <span key={k} className={cn("h-1.5 flex-1 rounded-full", x.correct === true ? "bg-[var(--good)]" : x.correct === false ? "bg-[var(--critical)]" : k === i ? "bg-primary/50" : "bg-muted")} />
        ))}
      </div>
      <Card className="p-5 md:p-6">
        <div className="mb-5"><QuestionMeta q={item.question} /></div>
        <QuestionCard q={item.question} response={resp} onChange={setResp} disabled={!!feedback}
          reveal={feedback ? { answer: feedback.question.answer, range: feedback.question.range, correct: feedback.correct } : null} />
        {!feedback ? (
          <Button className="mt-6" size="lg" onClick={answer} loading={busy} disabled={!isAnswered(item.question, resp)}>Check</Button>
        ) : (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className={cn("flex items-center gap-2.5 rounded-xl p-3.5 font-medium", feedback.correct ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200" : "bg-red-50 text-red-800 dark:bg-red-500/10 dark:text-red-200")}>
              {feedback.correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}{feedback.correct ? "Correct — retained." : "Incorrect — this concept will come back sooner."}
            </div>
            {feedback.question.solution && <div className="rounded-xl border border-border/80 bg-card-soft p-4"><Markdown compact>{feedback.question.solution}</Markdown></div>}
            <MasteryDelta m={feedback.mastery} />
            <Button size="lg" onClick={next}>{i + 1 < s.items.length ? "Next" : "Finish"} <ArrowRight className="h-4 w-4" /></Button>
          </div>
        )}
      </Card>
    </div>
  );
}
