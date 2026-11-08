import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Clock, Target, AlertTriangle, ArrowRight, Bookmark, CircleSlash, Trophy, CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import type { QuestionPublic, QResponse } from "@shared/types";
import { api } from "@/lib/api";
import { useLoad, useApp } from "@/lib/app";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, PageLoader, ErrorBox, Stat, Tabs, Badge, Button, Ring, Callout } from "@/components/ui";
import { QuestionCard, QuestionMeta } from "@/components/QuestionCard";
import { Markdown } from "@/components/Markdown";
import { ChartTooltip, AXIS } from "@/components/charts";
import { subjectMeta } from "@/lib/subjects";
import { fmtDuration, pct, fmtDate, cn } from "@/lib/utils";

interface Summ { total: number; attempted: number; correct: number; incorrect: number; unattempted: number; score: number; max: number; accuracy: number | null; timeMs: number }
interface Report {
  id: number; title: string; kind: string; submittedAt: string; startedAt: string; durationSec: number;
  report: {
    score: number; maxScore: number; percentage: number; accuracy: number; positiveMarks: number; negativeMarks: number; autoSubmitted: boolean;
    counts: { total: number; attempted: number; correct: number; incorrect: number; unattempted: number; markedForReview: number };
    time: { totalMs: number; avgMsPerAttempted: number; perQuestion: { idx: number; timeMs: number; correct: number | null }[] };
    bySection: (Summ & { section: string })[]; bySubject: (Summ & { subjectId: string; name: string })[];
    byType: (Summ & { type: string })[]; bySource: (Summ & { source: string })[];
    weakConcepts: (Summ & { conceptId: string; name: string; subjectName: string })[];
    recommendations: { conceptId: string; name: string; subjectName: string; reason: string }[];
  };
  items: { idx: number; section: string; marks: number; state: string; timeMs: number; correct: number | null; awarded: number; response: QResponse | null; question: QuestionPublic }[];
}
type Filter = "all" | "incorrect" | "unattempted" | "correct" | "marked";
const OUTCOME = {
  correct: { label: "Correct", color: "var(--good)" },
  incorrect: { label: "Incorrect", color: "var(--critical)" },
  skipped: { label: "Unattempted", color: "var(--neutral)" },
};

export function TestReport() {
  const { id } = useParams();
  const { toast } = useApp();
  const { data, error, loading, reload } = useLoad<Report>(`/tests/${id}/report`, [id]);
  const [filter, setFilter] = React.useState<Filter>("all");
  if (loading && !data) return <PageLoader />;
  if (error) return <ErrorBox error={error} onRetry={reload} />;
  const d = data!, r = d.report;
  const items = d.items.filter((i) => filter === "all" ? true : filter === "incorrect" ? i.correct === 0 : filter === "unattempted" ? i.correct === null
    : filter === "correct" ? i.correct === 1 : i.state === "marked" || i.state === "answered_marked");
  const timeData = r.time.perQuestion.map((p) => ({ q: p.idx + 1, sec: Math.round(p.timeMs / 1000), correct: p.correct }));
  const used = d.startedAt && d.submittedAt ? new Date(d.submittedAt).getTime() - new Date(d.startedAt).getTime() : r.time.totalMs;
  const p = Math.max(0, r.percentage);
  const verdict = p >= 70 ? "Excellent work" : p >= 50 ? "Solid attempt" : p >= 30 ? "Good practice — keep going" : "A tough one — the review below shows exactly what to fix";

  return (
    <div className="space-y-6">
      <Link to="/tests" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ChevronLeft className="h-4 w-4" />All tests</Link>

      <Card className="hero-wash p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-6">
          <Ring value={p} size={132} stroke={12} color={p >= 50 ? "var(--good)" : p >= 30 ? "var(--stage-learning)" : "var(--critical)"} label={`Score ${Math.round(r.percentage)}%`}>
            <span className="text-3xl font-bold tabular-nums">{Math.round(r.percentage)}%</span>
            <span className="mt-1 text-[11px] text-muted-foreground">of max marks</span>
          </Ring>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground"><Trophy className="h-4 w-4 text-amber-500" />{verdict}</p>
            <h1 className="mt-1 text-[26px] font-bold leading-tight tracking-tight">{d.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Submitted {fmtDate(d.submittedAt, true)}{r.autoSubmitted ? " · auto-submitted when time ran out" : ""}</p>
            <p className="mt-3 text-3xl font-bold tabular-nums">{r.score}<span className="text-lg font-medium text-muted-foreground"> / {r.maxScore} marks</span></p>
            <p className="text-sm text-muted-foreground">+{r.positiveMarks} earned · −{r.negativeMarks} negative marking</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Accuracy" icon={Target} tone="sky" value={pct(r.accuracy)} sub={`${r.counts.correct} correct · ${r.counts.incorrect} wrong`} />
        <Stat label="Attempted" icon={CheckCircle2} tone="emerald" value={<>{r.counts.attempted}<span className="text-base font-medium text-muted-foreground"> / {r.counts.total}</span></>} sub={`${r.counts.markedForReview} marked for review`} />
        <Stat label="Unattempted" icon={CircleSlash} tone="slate" value={r.counts.unattempted} sub="No marks lost on these" />
        <Stat label="Time used" icon={Clock} tone="violet" value={fmtDuration(Math.min(used, d.durationSec * 1000))} sub={`avg ${fmtDuration(r.time.avgMsPerAttempted)} per attempt`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Subject-wise performance</CardTitle><CardDescription>Marks, right/wrong/skipped and accuracy per subject</CardDescription></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted-foreground"><tr><th className="pb-2 font-medium">Subject</th><th className="pb-2 font-medium">Marks</th><th className="pb-2 text-center font-medium" title="Correct">✓</th><th className="pb-2 text-center font-medium" title="Incorrect">✗</th><th className="pb-2 text-center font-medium" title="Unattempted">—</th><th className="pb-2 text-right font-medium">Accuracy</th></tr></thead>
                <tbody>
                  {r.bySubject.map((s) => {
                    const m = subjectMeta(s.subjectId);
                    return (
                      <tr key={s.subjectId} className="border-t">
                        <td className="py-2 pr-2"><span className="flex items-center gap-2"><m.icon className="h-4 w-4 text-muted-foreground" />{s.name}</span></td>
                        <td className="tabular-nums">{s.score}/{s.max}</td>
                        <td className="text-center tabular-nums text-success">{s.correct}</td><td className="text-center tabular-nums text-danger">{s.incorrect}</td><td className="text-center tabular-nums text-muted-foreground">{s.unattempted}</td>
                        <td className="text-right tabular-nums">{pct(s.accuracy)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {r.byType.map((t) => <Badge key={t.type}>{t.type}: {t.correct}/{t.total} correct</Badge>)}
              {r.bySource.map((s) => <Badge key={s.source}>{s.source === "official-pyq" ? "Official PYQ" : s.source === "ai-generated" ? "AI-generated" : s.source === "user" ? "Imported" : "Practice"}: {s.correct}/{s.total}</Badge>)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Time per question</CardTitle>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              {Object.values(OUTCOME).map((o) => <span key={o.label} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: o.color }} />{o.label}</span>)}
            </div>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData} barCategoryGap={2} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
                <XAxis dataKey="q" {...AXIS} minTickGap={8} /><YAxis {...AXIS} width={44} unit="s" />
                <Tooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltip labelFormat={(l) => `Question ${l}`}
                  format={(v, pl) => `${v}s · ${pl.correct === 1 ? "correct" : pl.correct === 0 ? "incorrect" : "unattempted"}`} />} />
                <Bar dataKey="sec" name="Time" radius={[4, 4, 0, 0]} maxBarSize={24}>
                  {timeData.map((t) => <Cell key={t.q} fill={t.correct === 1 ? OUTCOME.correct.color : t.correct === 0 ? OUTCOME.incorrect.color : OUTCOME.skipped.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {r.recommendations.length > 0 && (
        <Card>
          <CardHeader><CardTitle><AlertTriangle className="h-4 w-4 text-warning" />Conceptual weaknesses — revise these next</CardTitle></CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {r.recommendations.map((w) => (
              <Link key={w.conceptId} to={`/concept/${w.conceptId}`} className="group flex items-center gap-3 rounded-xl border border-border/80 p-3 transition hover:border-border-strong hover:bg-card-soft">
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{w.name}</p><p className="text-xs text-muted-foreground">{w.subjectName} · {w.reason}</p></div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight">Solutions &amp; review</h2>
          <Tabs value={filter} onChange={setFilter} items={[
            { value: "all", label: "All", count: d.items.length }, { value: "incorrect", label: "Incorrect", count: r.counts.incorrect },
            { value: "unattempted", label: "Unattempted", count: r.counts.unattempted }, { value: "correct", label: "Correct", count: r.counts.correct },
            { value: "marked", label: "Marked", count: r.counts.markedForReview },
          ]} />
        </div>
        {!items.length && <Callout tone="slate">No questions in this filter.</Callout>}
        {items.map((it) => {
          const Icon = it.correct === 1 ? CheckCircle2 : it.correct === 0 ? XCircle : MinusCircle;
          return (
            <Card key={it.idx} className={cn("overflow-hidden border-l-4", it.correct === 1 ? "border-l-emerald-500" : it.correct === 0 ? "border-l-red-500" : "border-l-stone-300 dark:border-l-stone-600")}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-card-soft px-5 py-2.5">
                <QuestionMeta q={it.question} />
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-muted-foreground">{it.question.conceptName} · {fmtDuration(it.timeMs)}</span>
                  <span className={cn("flex items-center gap-1 font-semibold tabular-nums", it.correct === 1 ? "text-success" : it.correct === 0 ? "text-danger" : "text-muted-foreground")}>
                    <Icon className="h-4 w-4" />{it.awarded > 0 ? "+" : ""}{Number(it.awarded.toFixed(2))} marks
                  </span>
                  <button title="Bookmark question" className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-primary cursor-pointer"
                    onClick={async () => { await api.post("/bookmarks", { kind: "question", refId: it.question.id }); toast("Question bookmarked"); }}><Bookmark className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="p-5">
                <QuestionCard q={it.question} number={it.idx + 1} response={it.response ?? {}} onChange={() => {}} disabled
                  reveal={{ answer: it.question.answer, range: it.question.range, correct: it.correct === 1 }} />
                {it.question.type === "NAT" && it.response?.value != null && <p className="mt-3 text-sm">Your answer: <b className="font-mono">{it.response.value}</b></p>}
                {it.correct === null && <p className="mt-3 text-sm text-muted-foreground">Not attempted.</p>}
                <details className="mt-4 rounded-xl border border-border/80 bg-card-soft p-4" open={it.correct !== 1}>
                  <summary className="cursor-pointer text-sm font-semibold">Solution</summary>
                  <div className="mt-2"><Markdown compact>{it.question.solution ?? ""}</Markdown></div>
                  <Link to={`/concept/${it.question.conceptId}`}><Button size="sm" variant="secondary" className="mt-3">Study {it.question.conceptName} <ArrowRight className="h-4 w-4" /></Button></Link>
                </details>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
