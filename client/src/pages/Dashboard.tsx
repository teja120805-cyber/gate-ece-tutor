import { Link, useNavigate } from "react-router-dom";
import { Flame, Target, CheckCircle2, Repeat, ArrowRight, BookOpen, Sparkles, Timer, Stethoscope, RotateCcw, ShieldCheck, PenLine, CalendarClock, ClipboardList, Rocket, Bot, Grid3x3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { Recommendation, Rollup, AIStatus } from "@shared/types";
import { useLoad, useApp } from "@/lib/app";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, PageLoader, ErrorBox, Stat, Ring, IconChip, Callout, type Tone } from "@/components/ui";
import { StageBar, StatusLegend } from "@/components/Status";
import { ChartTooltip, AXIS } from "@/components/charts";
import { subjectMeta } from "@/lib/subjects";
import { daysUntil, greeting } from "@/lib/utils";

interface Overview {
  streak: { current: number; longest: number; activeToday: boolean };
  today: { study_seconds: number; questions: number; correct: number; lessons_completed: number; concepts_mastered: number };
  recommendations: Recommendation[];
  lastLocation: { conceptId: string; conceptName: string; position: number } | null;
  dueCount: number;
  activeTest: { id: number; title: string } | null;
  subjects: { id: string; name: string; short: string; rollup: Rollup }[];
  ai: AIStatus;
}
interface Week { daily: { day: string; study_seconds: number; questions: number; correct: number }[] }

const REC: Record<Recommendation["kind"], { label: string; tone: Tone; icon: React.ComponentType<{ className?: string }> }> = {
  gap: { label: "Fix foundation", tone: "rose", icon: Stethoscope },
  relearn: { label: "Relearn", tone: "rose", icon: RotateCcw },
  retention: { label: "Retention check", tone: "emerald", icon: ShieldCheck },
  revision: { label: "Revise", tone: "violet", icon: Repeat },
  continue: { label: "Continue", tone: "sky", icon: BookOpen },
  practice: { label: "Practise", tone: "amber", icon: PenLine },
  new: { label: "Start new", tone: "indigo", icon: Sparkles },
};

export function Dashboard() {
  const { data, error, loading, reload } = useLoad<Overview>("/overview");
  const { data: week } = useLoad<Week>("/analytics?days=7");
  const { prefs } = useApp();
  const nav = useNavigate();
  if (loading && !data) return <PageLoader />;
  if (error) return <ErrorBox error={error} onRetry={reload} />;
  const d = data!;
  const minutes = Math.round(d.today.study_seconds / 60);
  const goalPct = (minutes / Math.max(1, prefs.dailyGoalMinutes)) * 100;
  const total = d.subjects.reduce((a, s) => a + s.rollup.total, 0);
  const counts = d.subjects.reduce((a, s) => { (Object.keys(a) as (keyof typeof a)[]).forEach((k) => (a[k] += s.rollup.counts[k])); return a; },
    { not_started: 0, learning: 0, practicing: 0, mastered: 0 });
  const fresh = counts.not_started === total;
  const examIn = prefs.examDate ? daysUntil(prefs.examDate) : null;
  const weekData = (week?.daily ?? []).map((x) => ({
    day: new Date(x.day + "T00:00").toLocaleDateString(undefined, { weekday: "short" }), minutes: Math.round(x.study_seconds / 60), questions: x.questions,
  }));
  const weekMinutes = weekData.reduce((a, x) => a + x.minutes, 0);
  const recs = d.recommendations.filter((r) => r.kind !== "continue").slice(0, d.lastLocation ? 5 : 6);
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card className="hero-wash overflow-hidden p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-muted-foreground">{today}</p>
            <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight md:text-[32px]">
              {greeting()}{fresh ? " — welcome!" : "!"}
            </h1>
            <p className="mt-2 text-[15px] text-foreground/75">
              {fresh
                ? "183 concepts, 940 practice questions and full-length mocks are ready offline. Start anywhere — the prerequisite check fills any gaps."
                : d.streak.activeToday
                  ? `You're on a ${d.streak.current}-day streak. ${d.dueCount ? `${d.dueCount} review${d.dueCount === 1 ? "" : "s"} waiting.` : "Keep the momentum going."}`
                  : d.streak.current ? `Study today to extend your ${d.streak.current}-day streak.` : "Pick up where you left off — a few focused minutes count."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {d.lastLocation ? (
                <Button size="lg" className="max-w-full" onClick={() => nav(`/concept/${d.lastLocation!.conceptId}`)}>
                  <BookOpen className="h-4 w-4" />Continue: <span className="min-w-0 max-w-[9rem] truncate sm:max-w-[16rem]">{d.lastLocation.conceptName}</span>
                </Button>
              ) : (
                <Button size="lg" onClick={() => nav(recs[0] ? `/concept/${recs[0].conceptId}` : "/syllabus")}><Rocket className="h-4 w-4" />Start learning</Button>
              )}
              <Button size="lg" variant="outline" onClick={() => nav("/revision")}>
                <Repeat className="h-4 w-4" />Revision{d.dueCount ? <span className="rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">{d.dueCount}</span> : null}
              </Button>
              <Button size="lg" variant="ghost" onClick={() => nav("/tests")}><ClipboardList className="h-4 w-4" />Mock test</Button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Ring value={goalPct} size={124} stroke={11} label={`${minutes} of ${prefs.dailyGoalMinutes} minutes studied today`}>
              <span className="text-2xl font-bold tabular-nums">{minutes}</span>
              <span className="mt-1 text-[11px] text-muted-foreground">of {prefs.dailyGoalMinutes} min</span>
            </Ring>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5">
                <IconChip icon={Flame} tone="orange" size="sm" className={d.streak.activeToday ? "" : "opacity-60"} />
                <div><p className="font-semibold tabular-nums">{d.streak.current} day{d.streak.current === 1 ? "" : "s"}</p><p className="text-xs text-muted-foreground">streak · best {d.streak.longest}</p></div>
              </div>
              <div className="flex items-center gap-2.5">
                <IconChip icon={CalendarClock} tone="indigo" size="sm" />
                {examIn != null && examIn >= 0
                  ? <div><p className="font-semibold tabular-nums">{examIn} day{examIn === 1 ? "" : "s"}</p><p className="text-xs text-muted-foreground">until GATE</p></div>
                  : <Link to="/settings" className="text-xs text-primary hover:underline">Set your exam date →</Link>}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {d.activeTest && (
        <Callout tone="rose" icon={Timer} title={<>Exam in progress: {d.activeTest.title}</>}
          action={<Button size="sm" variant="danger" onClick={() => nav(`/tests/${d.activeTest!.id}/take`)}>Resume exam</Button>}>
          The clock is still running. Hints and the AI tutor stay locked until you submit.
        </Callout>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Questions today" icon={Target} tone="sky" value={d.today.questions}
          sub={d.today.questions ? `${Math.round((d.today.correct / d.today.questions) * 100)}% correct` : "None yet today"} />
        <Stat label="Lessons studied today" icon={BookOpen} tone="violet" value={d.today.lessons_completed}
          sub={d.today.concepts_mastered ? `${d.today.concepts_mastered} newly mastered` : "Mark lessons as understood"} />
        <Stat label="Concepts mastered" icon={CheckCircle2} tone="emerald" value={<>{counts.mastered}<span className="text-base font-medium text-muted-foreground"> / {total}</span></>}
          sub={`${counts.practicing} practising · ${counts.learning} learning`} />
        <Stat label="Reviews due" icon={Repeat} tone="amber" value={d.dueCount} sub={d.dueCount ? "Spaced repetition is ready" : "All caught up"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Up next for you</CardTitle>
              <CardDescription>Ordered from your diagnostics, review schedule, mastery and the prerequisite graph.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {d.lastLocation && (
              <Link to={`/concept/${d.lastLocation.conceptId}`} className="group flex items-center gap-3 rounded-xl border border-primary/25 bg-accent/60 p-3 transition hover:border-primary/40">
                <IconChip icon={BookOpen} tone="indigo" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">Continue reading: {d.lastLocation.conceptName}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1 w-32 overflow-hidden rounded-full bg-card"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.round(d.lastLocation.position * 100)}%` }} /></div>
                    <span className="text-xs text-muted-foreground">{Math.round(d.lastLocation.position * 100)}% read</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
            {recs.map((r) => {
              const k = REC[r.kind];
              return (
                <Link key={r.conceptId + r.kind} to={`/concept/${r.conceptId}`} className="group flex items-center gap-3 rounded-xl border border-border/80 p-3 transition hover:border-border-strong hover:bg-card-soft hover:shadow-card">
                  <IconChip icon={k.icon} tone={k.tone} />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-medium"><span className="truncate">{r.conceptName}</span></p>
                    <p className="truncate text-xs text-muted-foreground"><span className="font-medium text-foreground/70">{k.label}</span> · {r.subjectName} · {r.reason}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                </Link>
              );
            })}
            {!recs.length && !d.lastLocation && <p className="py-6 text-center text-sm text-muted-foreground">Open any concept from the syllabus to get personalised suggestions.</p>}
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader className="pb-1">
              <CardTitle>This week</CardTitle>
              <CardDescription>{weekMinutes} min of active study over 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-44 pb-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
                  <XAxis dataKey="day" {...AXIS} />
                  <YAxis {...AXIS} allowDecimals={false} width={44} />
                  <Tooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltip format={(v) => `${v} min`} />} />
                  <Bar dataKey="minutes" name="Study time" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={26} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <IconChip icon={Bot} tone={d.ai.configured ? "emerald" : "slate"} />
              <div className="min-w-0 text-sm">
                <p className="font-semibold">{d.ai.configured ? "AI tutor connected" : "Offline mode"}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {d.ai.configured ? `${d.ai.provider} · ${d.ai.model}. Tutor chat and generation are available in Learning mode.` : "Everything works without AI. Connect a provider to unlock tutor chat and question generation."}
                </p>
                {!d.ai.configured && <Link to="/settings" className="mt-1.5 inline-block text-xs font-medium text-primary hover:underline">How to connect →</Link>}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Subjects</h2>
            <p className="text-[13px] text-muted-foreground">Average mastery per subject, and how many concepts sit at each stage.</p>
          </div>
          <Link to="/mastery" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"><Grid3x3 className="h-4 w-4" />Open mastery map</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {d.subjects.map((s) => {
            const m = subjectMeta(s.id);
            const touched = s.rollup.total - s.rollup.counts.not_started;
            return (
              <Link key={s.id} to={`/syllabus/${s.id}`} className="group rounded-2xl border border-border/80 bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-raised">
                <div className="flex items-center gap-3">
                  <IconChip icon={m.icon} tone={m.tone} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.rollup.counts.mastered} of {s.rollup.total} mastered{touched ? ` · ${touched} started` : ""}</p>
                  </div>
                  <Ring value={s.rollup.score} size={46} stroke={5} label={`Average mastery ${s.rollup.score} of 100`}>
                    <span className="text-xs font-semibold tabular-nums">{s.rollup.score}</span>
                  </Ring>
                </div>
                <StageBar rollup={s.rollup} className="mt-4" />
              </Link>
            );
          })}
        </div>
        <StatusLegend counts={counts} />
      </section>

      {fresh && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold tracking-tight">How to get the most out of it</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { icon: Stethoscope, tone: "rose" as Tone, title: "1 · Check prerequisites", body: <>Open a concept like <Link className="text-primary underline" to="/concept/ss-convolution">Convolution</Link>. A 3–5 question check finds gaps so you only revisit what's missing.</> },
              { icon: PenLine, tone: "amber" as Tone, title: "2 · Learn, then practise", body: "Read the lesson, then answer varied questions. Mastery needs 80%+ across different question patterns." },
              { icon: ShieldCheck, tone: "emerald" as Tone, title: "3 · Prove retention", body: "Revision brings concepts back on later days. Passing that check is what makes a concept Mastered." },
            ].map((x) => (
              <div key={x.title} className="rounded-xl border border-border/80 bg-card-soft p-4">
                <IconChip icon={x.icon} tone={x.tone} />
                <p className="mt-3 text-sm font-semibold">{x.title}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{x.body}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

