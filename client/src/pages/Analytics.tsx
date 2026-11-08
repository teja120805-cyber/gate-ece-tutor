import * as React from "react";
import { Link } from "react-router-dom";
import { Download, Printer, TrendingDown, TrendingUp, Flame, BarChart3, Clock, Target, Timer, CalendarDays } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useLoad } from "@/lib/app";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, PageLoader, ErrorBox, Stat, Tabs, Button, PageHeader } from "@/components/ui";
import { MasteryBar } from "@/components/Status";
import { ChartTooltip, AXIS, ActivityCalendar } from "@/components/charts";
import { fmtDate, download, pct } from "@/lib/utils";

interface A {
  daily: { day: string; study_seconds: number; questions: number; correct: number }[];
  bySubject: { subject_id: string; name: string; n: number; ok: number; avg_ms: number | null }[];
  byDifficulty: { difficulty: number; n: number; ok: number }[];
  byType: { type: string; n: number; ok: number }[];
  byMode: { mode: string; n: number; ok: number }[];
  tests: { id: number; title: string; submitted_at: string; score: number; max_score: number }[];
  weakest: { concept_id: string; name: string; subject: string; score: number; status: string; distinct_questions: number }[];
  events: { concept_id: string; name: string; from_status: string; to_status: string; score: number; reason: string; created_at: string }[];
  totals: { n: number; ok: number; ms: number; studySeconds: number };
  streak: { current: number; longest: number };
}

const RANK = ["not_started", "learning", "practicing", "mastered"];
const dayLabel = (d: string) => new Date(d + "T00:00").toLocaleDateString(undefined, { day: "numeric", month: "short" });

export function Analytics() {
  const [days, setDays] = React.useState<"30" | "90">("30");
  const { data, error, loading, reload } = useLoad<A>(`/analytics?days=${days}`, [days]);
  const { data: year } = useLoad<A>("/analytics?days=364");
  if (loading && !data) return <PageLoader />;
  if (error) return <ErrorBox error={error} onRetry={reload} />;
  const d = data!;
  const daily = d.daily.map((x) => ({ day: dayLabel(x.day), minutes: Math.round(x.study_seconds / 60), questions: x.questions, accuracy: x.questions ? Math.round((x.correct / x.questions) * 100) : null }));
  const tests = d.tests.map((t, i) => ({ i: i + 1, title: t.title, pct: t.max_score ? Math.round((t.score / t.max_score) * 100) : 0, date: fmtDate(t.submitted_at) }));
  const subj = d.bySubject.map((s) => ({ name: s.name, accuracy: Math.round((s.ok / s.n) * 100), n: s.n, avg: s.avg_ms ? Math.round(s.avg_ms / 1000) : null }));
  const cal = (year?.daily ?? []).map((x) => ({ day: x.day, minutes: Math.round(x.study_seconds / 60), questions: x.questions }));
  const activeDays = cal.filter((x) => x.minutes > 0 || x.questions > 0).length;

  return (
    <div className="space-y-6">
      <PageHeader icon={BarChart3} tone="sky" title="Performance analytics"
        description="Every number comes from your local question history, tests and study-time log."
        actions={<>
          <Button variant="outline" size="sm" onClick={() => download("/api/reports/performance.csv")}><Download className="h-4 w-4" />Concept report (CSV)</Button>
          <Link to="/report"><Button variant="outline" size="sm"><Printer className="h-4 w-4" />Printable report</Button></Link>
        </>} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Total study time" icon={Clock} tone="violet" value={`${(d.totals.studySeconds / 3600).toFixed(1)} h`} />
        <Stat label="Questions answered" icon={Target} tone="sky" value={d.totals.n} sub={`${pct(d.totals.n ? d.totals.ok / d.totals.n : null)} overall accuracy`} />
        <Stat label="Avg time per question" icon={Timer} tone="indigo" value={d.totals.n ? `${Math.round(d.totals.ms / d.totals.n / 1000)} s` : "—"} />
        <Stat label="Streak" icon={Flame} tone="orange" value={`${d.streak.current} day${d.streak.current === 1 ? "" : "s"}`} sub={`Longest ${d.streak.longest} days`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle><CalendarDays className="h-4 w-4 text-muted-foreground" />Study calendar</CardTitle>
          <CardDescription>{activeDays} active day{activeDays === 1 ? "" : "s"} in the last 12 months · darker means more minutes</CardDescription>
        </CardHeader>
        <CardContent>{cal.length ? <ActivityCalendar days={cal} /> : <div className="h-32" />}</CardContent>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">Trends</h2>
        <Tabs value={days} onChange={setDays} items={[{ value: "30", label: "Last 30 days" }, { value: "90", label: "Last 90 days" }]} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Study time" desc="Minutes of active study per day">
          <BarChart data={daily} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
            <XAxis dataKey="day" {...AXIS} minTickGap={24} /><YAxis {...AXIS} width={44} allowDecimals={false} />
            <Tooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltip format={(v) => `${v} min`} />} />
            <Bar dataKey="minutes" name="Study time" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={16} />
          </BarChart>
        </ChartCard>
        <ChartCard title="Questions per day" desc="All modes: learning, revision, diagnostics and tests">
          <BarChart data={daily} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
            <XAxis dataKey="day" {...AXIS} minTickGap={24} /><YAxis {...AXIS} width={44} allowDecimals={false} />
            <Tooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltip />} />
            <Bar dataKey="questions" name="Questions" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={16} />
          </BarChart>
        </ChartCard>
        <ChartCard title="Daily accuracy" desc="% correct on days you practised">
          <LineChart data={daily} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
            <XAxis dataKey="day" {...AXIS} minTickGap={24} /><YAxis {...AXIS} width={44} domain={[0, 100]} unit="%" />
            <Tooltip content={<ChartTooltip format={(v) => `${v}%`} />} />
            <Line dataKey="accuracy" name="Accuracy" stroke="var(--primary)" strokeWidth={2} dot={{ r: 3, strokeWidth: 2, fill: "var(--card)" }} activeDot={{ r: 5 }} connectNulls />
          </LineChart>
        </ChartCard>
        <ChartCard title="Mock test scores" desc="Percentage of maximum marks, in the order taken">
          {tests.length ? (
            <LineChart data={tests} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
              <XAxis dataKey="i" {...AXIS} /><YAxis {...AXIS} width={44} domain={[0, 100]} unit="%" />
              <Tooltip content={<ChartTooltip format={(v) => `${v}%`} labelFormat={(_l, p) => p ? `${p.title} · ${p.date}` : ""} />} />
              <Line dataKey="pct" name="Score" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: "var(--card)" }} activeDot={{ r: 6 }} />
            </LineChart>
          ) : <EmptyChart text="Take a test in Exam mode to see your score trend." />}
        </ChartCard>
      </div>

      <Card>
        <CardHeader><CardTitle>Accuracy by subject</CardTitle><CardDescription>% correct across all attempts · average time per question</CardDescription></CardHeader>
        <CardContent>
          {!subj.length ? <p className="text-sm text-muted-foreground">No attempts yet.</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted-foreground"><tr><th className="pb-2 font-medium">Subject</th><th className="w-1/2 pb-2 font-medium">Accuracy</th><th className="pb-2 text-right font-medium">Attempts</th><th className="pb-2 text-right font-medium">Avg time</th></tr></thead>
                <tbody>{subj.map((s) => (
                  <tr key={s.name} className="border-t"><td className="py-2.5 pr-3">{s.name}</td><td className="pr-3"><MasteryBar score={s.accuracy} /></td><td className="text-right tabular-nums">{s.n}</td><td className="text-right tabular-nums">{s.avg ?? "—"}{s.avg ? " s" : ""}</td></tr>
                ))}</tbody>
              </table>
            </div>
          )}
          <div className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
            <MiniTable title="By difficulty" rows={d.byDifficulty.map((x) => [["", "Easy", "Medium", "Hard"][x.difficulty], x.ok, x.n])} />
            <MiniTable title="By question type" rows={d.byType.map((x) => [x.type, x.ok, x.n])} />
            <MiniTable title="By mode" rows={d.byMode.map((x) => [x.mode, x.ok, x.n])} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Weakest practised concepts</CardTitle><CardDescription>Lowest mastery among concepts with 2+ questions answered</CardDescription></CardHeader>
          <CardContent className="space-y-1">
            {!d.weakest.length && <p className="text-sm text-muted-foreground">Practise a few concepts to see weak areas.</p>}
            {d.weakest.map((w) => (
              <Link key={w.concept_id} to={`/concept/${w.concept_id}`} className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-muted">
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{w.name}</p><p className="text-xs text-muted-foreground">{w.subject} · {w.distinct_questions} questions</p></div>
                <MasteryBar score={w.score} className="w-28" />
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Mastery changes</CardTitle><CardDescription>Promotions and downgrades from the mastery engine</CardDescription></CardHeader>
          <CardContent className="max-h-80 space-y-3 overflow-y-auto">
            {!d.events.length && <p className="text-sm text-muted-foreground">No status changes yet.</p>}
            {d.events.map((e, i) => {
              const down = RANK.indexOf(e.to_status) < RANK.indexOf(e.from_status);
              return (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className={down ? "mt-0.5 rounded-md bg-red-50 p-1 text-danger dark:bg-red-500/10" : "mt-0.5 rounded-md bg-emerald-50 p-1 text-success dark:bg-emerald-500/10"}>
                    {down ? <TrendingDown className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
                  </span>
                  <div className="min-w-0">
                    <Link to={`/concept/${e.concept_id}`} className="font-medium hover:underline">{e.name}</Link>
                    <span className="text-muted-foreground"> {e.from_status.replace("_", " ")} → {e.to_status.replace("_", " ")}</span>
                    <p className="text-xs text-muted-foreground">{e.reason} · {fmtDate(e.created_at, true)}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ChartCard({ title, desc, children }: { title: string; desc: string; children: React.ReactElement }) {
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle>{title}</CardTitle><CardDescription>{desc}</CardDescription></CardHeader>
      <CardContent className="h-56"><ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer></CardContent>
    </Card>
  );
}
function EmptyChart({ text }: { text: string }) {
  return <div className="flex h-full items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">{text}</div>;
}
function MiniTable({ title, rows }: { title: string; rows: (string | number)[][] }) {
  return (
    <div className="rounded-xl border border-border/80 bg-card-soft p-3">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      {!rows.length && <p className="text-xs text-muted-foreground">—</p>}
      {rows.map((r) => (
        <div key={String(r[0])} className="flex justify-between border-b py-1.5 text-[13px] last:border-0">
          <span className="capitalize">{r[0]}</span><span className="tabular-nums text-muted-foreground">{r[1]}/{r[2]} · <b className="font-medium text-foreground">{Math.round((Number(r[1]) / Number(r[2])) * 100)}%</b></span>
        </div>
      ))}
    </div>
  );
}
