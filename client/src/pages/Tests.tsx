import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardList, Play, FileText, Trash2, Timer, AlertTriangle, Target, BookOpen, Shuffle, Trophy, Clock3, Scale, CheckCircle2 } from "lucide-react";
import type { SubjectNode, TestKind } from "@shared/types";
import { api } from "@/lib/api";
import { useLoad, useApp } from "@/lib/app";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Select, Input, PageLoader, ErrorBox, Badge, PageHeader, IconChip, Callout, Field, Tabs, Ring, Empty, type Tone } from "@/components/ui";
import { subjectMeta } from "@/lib/subjects";
import { fmtDate, cn } from "@/lib/utils";

interface TestRow { id: number; title: string; kind: string; status: string; created_at: string; submitted_at: string | null; score: number | null; max_score: number | null; duration_sec: number; n: number }

const KINDS: { value: TestKind; title: string; desc: string; icon: React.ComponentType<{ className?: string }>; tone: Tone }[] = [
  { value: "topic", title: "Topic test", desc: "Pick specific concepts", icon: Target, tone: "indigo" },
  { value: "subject", title: "Subject test", desc: "One whole subject", icon: BookOpen, tone: "sky" },
  { value: "mixed", title: "Mixed", desc: "Several subjects together", icon: Shuffle, tone: "violet" },
  { value: "full", title: "Full-length GATE", desc: "65 Q · 100 marks · 3 h", icon: Trophy, tone: "amber" },
];
const KIND_ICON: Record<string, { icon: React.ComponentType<{ className?: string }>; tone: Tone }> = Object.fromEntries(KINDS.map((k) => [k.value, { icon: k.icon, tone: k.tone }]));

export function TestsPage() {
  const nav = useNavigate();
  const { toast } = useApp();
  const { data: syl } = useLoad<SubjectNode[]>("/syllabus");
  const { data: list, error, reload } = useLoad<{ tests: TestRow[]; active: { id: number; title: string } | null }>("/tests");
  const [kind, setKind] = React.useState<TestKind>("topic");
  const [subject, setSubject] = React.useState("ss");
  const [concepts, setConcepts] = React.useState<string[]>([]);
  const [subjects, setSubjects] = React.useState<string[]>(["ss", "net"]);
  const [count, setCount] = React.useState(10);
  const [duration, setDuration] = React.useState<string>("");
  const [source, setSource] = React.useState<"all" | "official" | "generated">("all");
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  if (!syl || !list) return error ? <ErrorBox error={error} onRetry={reload} /> : <PageLoader />;
  const subj = syl.find((s) => s.id === subject)!;
  const qCount = (s: SubjectNode) => s.chapters.reduce((a, ch) => a + ch.topics.reduce((b, t) => b + t.concepts.reduce((c, x) => c + x.questionCount, 0), 0), 0);
  const done = list.tests.filter((t) => t.status === "submitted");
  const best = done.reduce((a, t) => Math.max(a, t.max_score ? (t.score ?? 0) / t.max_score : 0), 0);

  const create = async () => {
    setBusy(true); setMsg(null);
    try {
      const body: Record<string, unknown> = { kind, count, source };
      if (duration) body.durationMin = Number(duration);
      if (kind === "topic") body.conceptIds = concepts;
      if (kind === "subject") body.subjectIds = [subject];
      if (kind === "mixed") body.subjectIds = subjects;
      const r = await api.post<{ id: number; warnings: string[] }>("/tests", body);
      if (r.warnings.length) sessionStorage.setItem(`test-warn-${r.id}`, JSON.stringify(r.warnings));
      nav(`/tests/${r.id}/take`);
    } catch (e) { setMsg((e as Error).message); } finally { setBusy(false); }
  };
  const disabled = (kind === "topic" && !concepts.length) || (kind === "mixed" && !subjects.length);

  return (
    <div className="space-y-6">
      <PageHeader icon={Timer} tone="rose" eyebrow="Exam mode" title="Tests & mock papers"
        description="GATE conditions: countdown, MCQ/MSQ/NAT, mark for review, question palette and auto-submit. MCQ wrong answers lose ⅓ of their marks; MSQ and NAT have no negative marking; MSQ has no partial credit."
        actions={done.length > 0 ? <Badge tone="emerald" className="px-3 py-1 text-xs"><Trophy className="h-3.5 w-3.5" />Best score {Math.round(best * 100)}% · {done.length} taken</Badge> : undefined} />

      {list.active && (
        <Callout tone="rose" icon={Timer} title={<>In progress: {list.active.title}</>}
          action={<Button variant="danger" size="sm" onClick={() => nav(`/tests/${list.active!.id}/take`)}>Resume</Button>}>
          The timer keeps running while you're away.
        </Callout>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Create a test</CardTitle>
          <CardDescription>Questions you have never attempted are chosen first.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="radiogroup" aria-label="Test type">
            {KINDS.map((k) => (
              <button key={k.value} role="radio" aria-checked={kind === k.value} onClick={() => setKind(k.value)}
                className={cn("relative flex items-start gap-3 rounded-xl border p-3.5 text-left transition cursor-pointer",
                  kind === k.value ? "border-primary bg-accent/50 ring-2 ring-primary/15" : "border-border-strong/60 hover:border-primary/40 hover:bg-card-soft")}>
                <IconChip icon={k.icon} tone={k.tone} />
                <span><span className="block text-sm font-semibold">{k.title}</span><span className="block text-xs text-muted-foreground">{k.desc}</span></span>
                {kind === k.value && <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>

          {kind === "topic" && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Select value={subject} onChange={(e) => { setSubject(e.target.value); setConcepts([]); }}>
                  {syl.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Select>
                <span className="text-sm text-muted-foreground">{concepts.length} concept{concepts.length === 1 ? "" : "s"} selected</span>
                {concepts.length > 0 && <Button size="sm" variant="ghost" onClick={() => setConcepts([])}>Clear</Button>}
              </div>
              <div className="max-h-80 space-y-4 overflow-y-auto rounded-xl border bg-card-soft p-3">
                {subj.chapters.map((ch) => {
                  const ids = ch.topics.flatMap((t) => t.concepts).filter((c) => c.questionCount).map((c) => c.id);
                  const all = ids.length > 0 && ids.every((i) => concepts.includes(i));
                  return (
                    <div key={ch.id}>
                      <div className="mb-1.5 flex items-center justify-between px-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{ch.name}</p>
                        <button className="text-xs font-medium text-primary hover:underline cursor-pointer"
                          onClick={() => setConcepts((x) => all ? x.filter((i) => !ids.includes(i)) : [...new Set([...x, ...ids])])}>{all ? "Clear chapter" : "Select chapter"}</button>
                      </div>
                      <div className="grid gap-1 sm:grid-cols-2">
                        {ch.topics.flatMap((t) => t.concepts).map((c) => (
                          <label key={c.id} className={cn("flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm", c.questionCount ? "cursor-pointer hover:bg-card" : "opacity-40",
                            concepts.includes(c.id) && "bg-card shadow-card")}>
                            <input type="checkbox" disabled={!c.questionCount} checked={concepts.includes(c.id)}
                              onChange={(e) => setConcepts((x) => (e.target.checked ? [...x, c.id] : x.filter((y) => y !== c.id)))} />
                            <span className="flex-1 truncate">{c.name}</span><span className="text-xs tabular-nums text-muted-foreground">{c.questionCount}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {kind === "subject" && (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {syl.map((s) => {
                const m = subjectMeta(s.id);
                return (
                  <button key={s.id} onClick={() => setSubject(s.id)}
                    className={cn("flex items-center gap-3 rounded-xl border p-3 text-left transition cursor-pointer", subject === s.id ? "border-primary bg-accent/50 ring-2 ring-primary/15" : "border-border-strong/60 hover:bg-card-soft")}>
                    <IconChip icon={m.icon} tone={m.tone} size="sm" />
                    <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{s.name}</span><span className="block text-xs text-muted-foreground">{qCount(s)} questions</span></span>
                  </button>
                );
              })}
            </div>
          )}
          {kind === "mixed" && (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {syl.map((s) => {
                const m = subjectMeta(s.id);
                const on = subjects.includes(s.id);
                return (
                  <label key={s.id} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition", on ? "border-primary bg-accent/50" : "border-border-strong/60 hover:bg-card-soft")}>
                    <input type="checkbox" checked={on} onChange={(e) => setSubjects((x) => (e.target.checked ? [...x, s.id] : x.filter((y) => y !== s.id)))} />
                    <IconChip icon={m.icon} tone={m.tone} size="sm" />
                    <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{s.name}</span><span className="block text-xs text-muted-foreground">{qCount(s)} questions</span></span>
                  </label>
                );
              })}
            </div>
          )}
          {kind === "full" && (
            <div className="rounded-xl border bg-card-soft p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {[{ icon: ClipboardList, v: "65", l: "questions" }, { icon: Scale, v: "100", l: "marks" }, { icon: Clock3, v: "180", l: "minutes" }].map((x) => (
                  <div key={x.l} className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-card"><IconChip icon={x.icon} tone="amber" size="sm" /><p><b className="text-lg tabular-nums">{x.v}</b> <span className="text-sm text-muted-foreground">{x.l}</span></p></div>
                ))}
              </div>
              <p className="mt-3 text-sm text-foreground/80">General Aptitude: 10 questions (15 marks). Technical: 55 questions (85 marks), spread across subjects by typical weight, including Engineering Mathematics.</p>
              <p className="mt-1 text-xs text-muted-foreground">If the local bank is too small for a subject, the paper is filled from other subjects and the shortfall is reported.</p>
            </div>
          )}

          <div className="flex flex-wrap items-end gap-4 border-t pt-5">
            {kind !== "full" && <Field label="Questions"><Input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-24" /></Field>}
            {kind !== "full" && <Field label="Duration (min)"><Input type="number" min={1} placeholder="auto" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-28" /></Field>}
            <Field label="Question source">
              <Tabs size="sm" value={source} onChange={setSource} items={[{ value: "all", label: "All" }, { value: "official", label: "Official PYQs" }, { value: "generated", label: "Practice & AI" }]} />
            </Field>
            <Button size="lg" onClick={create} loading={busy} disabled={disabled} className="ml-auto">
              <Play className="h-4 w-4" />Create &amp; open
            </Button>
          </div>
          {msg && <p className="flex items-center gap-2 text-sm text-danger"><AlertTriangle className="h-4 w-4" />{msg}</p>}
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Your tests</h2>
        {!list.tests.length ? <Empty icon={<ClipboardList />} title="No tests yet">Create one above. Reports include subject-wise marks, time per question and the concepts to revise.</Empty> : (
          <div className="grid gap-3">
            {list.tests.map((t) => {
              const ki = KIND_ICON[t.kind] ?? KIND_ICON.topic;
              const p = t.max_score ? Math.round(((t.score ?? 0) / t.max_score) * 100) : 0;
              return (
                <Card key={t.id} className="flex flex-wrap items-center gap-4 p-4">
                  <IconChip icon={ki.icon} tone={ki.tone} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.n} questions · {Math.round(t.duration_sec / 60)} min · {fmtDate(t.created_at, true)}</p>
                  </div>
                  {t.status === "submitted" ? (
                    <>
                      <div className="flex items-center gap-3">
                        <Ring value={Math.max(0, p)} size={44} stroke={5} color={p >= 60 ? "var(--good)" : p >= 35 ? "var(--stage-learning)" : "var(--critical)"} label={`${p}%`}>
                          <span className="text-[11px] font-semibold tabular-nums">{p}%</span>
                        </Ring>
                        <span className="text-sm font-semibold tabular-nums">{t.score}<span className="font-normal text-muted-foreground">/{t.max_score}</span></span>
                      </div>
                      <Link to={`/tests/${t.id}/report`}><Button size="sm" variant="outline"><FileText className="h-4 w-4" />Report</Button></Link>
                    </>
                  ) : (
                    <>
                      <Badge tone={t.status === "in_progress" ? "rose" : undefined}>{t.status === "in_progress" ? "In progress" : "Not started"}</Badge>
                      <Link to={`/tests/${t.id}/take`}><Button size="sm" variant={t.status === "in_progress" ? "danger" : "default"}><Play className="h-4 w-4" />{t.status === "in_progress" ? "Resume" : "Start"}</Button></Link>
                    </>
                  )}
                  {t.status !== "in_progress" && (
                    <Button size="icon-sm" variant="ghost" title="Delete test" onClick={async () => { if (confirm("Delete this test? Your answers stay in your question history.")) { await api.del(`/tests/${t.id}`); reload(); toast("Test deleted", "info"); } }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
