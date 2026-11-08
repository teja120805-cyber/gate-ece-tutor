import * as React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Bookmark, BookmarkCheck, BookOpen, PenLine, Sigma, NotebookPen, Bot, Stethoscope, ArrowRight, Sparkles, CheckCircle2, Circle, AlertTriangle, Timer, Star, ChevronLeft, ChevronRight, Flame, ListChecks, CalendarClock, Lock, Unlock, TextQuote } from "lucide-react";
import type { ProgressInfo, MasteryStatus } from "@shared/types";
import { api } from "@/lib/api";
import { useApp, useLoad } from "@/lib/app";
import { Card, CardHeader, CardTitle, CardContent, Button, Tabs, PageLoader, ErrorBox, Textarea, Input, Ring, IconChip, Badge, Callout, Empty, TONE } from "@/components/ui";
import { StatusBadge } from "@/components/Status";
import { Markdown, TeX, lessonHeadings } from "@/components/Markdown";
import { PracticePanel } from "@/components/PracticePanel";
import { TutorPanel } from "@/components/TutorPanel";
import { subjectMeta } from "@/lib/subjects";
import { STATUS_STYLE, cn, fmtDate, relDays } from "@/lib/utils";

interface Ref { id: string; name: string; status: MasteryStatus; score: number }
interface ConceptDetail {
  id: string; name: string; summary: string; weight: number; topic_id: string; topic_name: string; chapter_id: string; chapter_name: string;
  subject_id: string; subject_name: string; prereqs: Ref[]; dependents: Ref[]; gaps: Ref[];
  lesson: { content: string; source: string; model: string | null; updatedAt: string } | null;
  formulas: { id: string; title: string; latex: string; note: string | null }[];
  progress: ProgressInfo; questionCount: number; pyqCount: number; aiQuestionCount: number; bookmarked: boolean;
  review: { due_at: string; interval_days: number; reps: number; last_accuracy: number | null } | null;
  siblings: { id: string; name: string }[];
}
interface PrereqCheck {
  prereqs: { id: string; name: string; status: MasteryStatus; score: number; questionCount: number; strong: boolean; gap: boolean; recentlyVerified: boolean }[];
  recommended: boolean; assessable: number; lastDiagnostic: { id: number; status: string; score: number | null } | null;
}
type Tab = "lesson" | "practice" | "formulas" | "notes" | "tutor";

export function ConceptPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { prefs, ai, toast } = useApp();
  const { data: c, error, loading, reload } = useLoad<ConceptDetail>(`/concepts/${id}`, [id]);
  const { data: check, reload: reloadCheck } = useLoad<PrereqCheck>(`/concepts/${id}/prereq-check`, [id]);
  const [tab, setTab] = React.useState<Tab>("lesson");
  const [tutorSeed, setTutorSeed] = React.useState<{ text: string; questionId?: string } | null>(null);
  const [dismissed, setDismissed] = React.useState(false);
  React.useEffect(() => { setTab("lesson"); setDismissed(false); window.scrollTo(0, 0); }, [id]);

  if (loading && !c) return <PageLoader />;
  if (error) return <ErrorBox error={error} onRetry={reload} />;
  if (!c) return null;
  const exam = prefs.mode === "exam";
  const m = subjectMeta(c.subject_id);

  const toggleBookmark = async () => {
    if (c.bookmarked) await api.del(`/bookmarks/concept/${c.id}`); else await api.post("/bookmarks", { kind: "concept", refId: c.id });
    toast(c.bookmarked ? "Bookmark removed" : "Concept bookmarked", c.bookmarked ? "info" : "success");
    reload();
  };
  const startDiagnostic = async () => {
    const d = await api.post<{ id: number }>("/diagnostics", { targetId: c.id, scope: "concept" });
    nav(`/diagnostic/${d.id}`);
  };
  const skipDiagnostic = async () => { await api.post("/diagnostics/skip", { targetId: c.id, scope: "concept" }); setDismissed(true); reloadCheck(); };
  const startTimedTest = async () => {
    const t = await api.post<{ id: number }>("/tests", { kind: "topic", conceptIds: [c.id], count: Math.min(10, c.questionCount) });
    nav(`/tests/${t.id}/take`);
  };
  const idx = c.siblings.findIndex((s) => s.id === c.id);
  const prev = idx > 0 ? c.siblings[idx - 1] : null;
  const next = idx >= 0 && idx < c.siblings.length - 1 ? c.siblings[idx + 1] : null;
  const touched = c.progress.status !== "not_started";

  return (
    <div className="space-y-5">
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/syllabus" className="hover:text-foreground">Syllabus</Link><ChevronRight className="h-3 w-3" />
        <Link to={`/syllabus/${c.subject_id}`} className="hover:text-foreground">{c.subject_name}</Link><ChevronRight className="h-3 w-3" />
        <span>{c.chapter_name}</span><ChevronRight className="h-3 w-3" />
        <span className="text-foreground/80">{c.topic_name}</span>
      </nav>

      {/* Hero */}
      <Card className="hero-wash p-6">
        <div className="flex flex-wrap items-start gap-5">
          <IconChip icon={m.icon} tone={m.tone} size="lg" className="hidden sm:inline-flex" />
          <div className="min-w-[15rem] flex-1">
            <p className={cn("text-xs font-semibold uppercase tracking-wider", TONE[m.tone].text)}>{c.subject_name}</p>
            <h1 className="mt-1 text-2xl font-bold leading-tight tracking-tight sm:text-[28px]">{c.name}</h1>
            <p className="mt-2 max-w-3xl text-[15px] text-foreground/75">{c.summary}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={c.progress.status} />
              {c.weight === 3 && <Badge tone="amber"><Flame className="h-3 w-3" />High yield</Badge>}
              <Badge><ListChecks className="h-3 w-3" />{c.questionCount} questions</Badge>
              {c.pyqCount > 0 && <Badge tone="amber">{c.pyqCount} official PYQs</Badge>}
              {c.formulas.length > 0 && <Badge><Sigma className="h-3 w-3" />{c.formulas.length} formulas</Badge>}
              {c.review && <Badge tone="violet"><CalendarClock className="h-3 w-3" />Review {relDays(c.review.due_at)}</Badge>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Ring value={touched ? c.progress.score : 0} size={88} stroke={8} label={`Mastery ${Math.round(c.progress.score)} of 100`}>
              <span className="text-xl font-bold tabular-nums">{touched ? Math.round(c.progress.score) : "–"}</span>
              <span className="text-[10px] text-muted-foreground">mastery</span>
            </Ring>
            <Button variant="outline" size="icon" onClick={toggleBookmark} title={c.bookmarked ? "Remove bookmark" : "Bookmark concept"} className="self-start">
              {c.bookmarked ? <BookmarkCheck className="h-[18px] w-[18px] text-primary" /> : <Bookmark className="h-[18px] w-[18px]" />}
            </Button>
          </div>
        </div>
      </Card>

      {/* Prerequisite detection */}
      {!exam && c.gaps.length > 0 && (
        <Callout tone="rose" icon={AlertTriangle} title="Your diagnostic found gaps in these prerequisites — learn just these first">
          <div className="mt-2 flex flex-wrap gap-2">
            {c.gaps.map((g) => <Link key={g.id} to={`/concept/${g.id}`} className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-card px-3 py-1 text-[13px] font-medium hover:border-rose-300 dark:border-rose-500/30">{g.name}<ArrowRight className="h-3.5 w-3.5" /></Link>)}
          </div>
        </Callout>
      )}
      {!exam && !dismissed && check?.recommended && c.gaps.length === 0 && (
        <Callout tone="indigo" icon={Stethoscope} title="Check your foundations before starting"
          action={<>{check.assessable > 0 && <Button onClick={startDiagnostic}>Start quick check</Button>}<Button variant="outline" onClick={skipDiagnostic}>Skip — I'm confident</Button></>}>
          This concept builds on {check.prereqs.length} prerequisite{check.prereqs.length > 1 ? "s" : ""}. A 3–5 question check finds any gaps so you only revisit what is missing.
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {check.prereqs.map((p) => (
              <Link key={p.id} to={`/concept/${p.id}`} className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                p.strong ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200" : "bg-card")}>
                {p.strong && <CheckCircle2 className="h-3 w-3" />}{p.name}
              </Link>
            ))}
          </div>
        </Callout>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0 space-y-4">
          <Tabs value={tab} onChange={setTab} items={[
            { value: "lesson", label: <><BookOpen />Lesson</> },
            { value: "practice", label: <>{exam ? <Timer /> : <PenLine />}{exam ? "Timed test" : "Practice"}</> },
            { value: "formulas", label: <><Sigma />Formulas</>, count: c.formulas.length || undefined },
            { value: "notes", label: <><NotebookPen />My notes</> },
            { value: "tutor", label: <><Bot />AI tutor</>, hidden: exam },
          ]} />
          {tab === "lesson" && <LessonView c={c} onDone={() => { reload(); setTab("practice"); }} onRegenerated={reload} />}
          {tab === "practice" && (exam ? (
            <Card className="exam-wash p-6">
              <IconChip icon={Timer} tone="rose" />
              <p className="mt-3 text-lg font-semibold">Exam mode: timed topic test</p>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">Questions from this concept under GATE conditions — countdown timer, no hints, no AI, negative marking for MCQs. Solutions appear in the report after you submit.</p>
              <Button className="mt-4" size="lg" variant="danger" onClick={startTimedTest} disabled={!c.questionCount}><Timer className="h-4 w-4" />Start timed test ({Math.min(10, c.questionCount)} questions)</Button>
              {!c.questionCount && <p className="mt-2 text-sm text-muted-foreground">No questions stored for this concept yet.</p>}
            </Card>
          ) : (
            <PracticePanel conceptId={c.id} onProgress={reload} onAskTutor={(text, questionId) => { setTutorSeed({ text, questionId }); setTab("tutor"); }} />
          ))}
          {tab === "formulas" && <FormulaView c={c} />}
          {tab === "notes" && <NotesView conceptId={c.id} />}
          {tab === "tutor" && !exam && <TutorPanel conceptId={c.id} conceptName={c.name} seed={tutorSeed} onSeedUsed={() => setTutorSeed(null)} />}

          {(prev || next) && (
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {prev ? (
                <Link to={`/concept/${prev.id}`} className="group flex items-center gap-3 rounded-2xl border border-border/80 bg-card p-4 shadow-card transition hover:border-border-strong">
                  <ChevronLeft className="h-5 w-5 text-muted-foreground transition group-hover:-translate-x-0.5" />
                  <span className="min-w-0"><span className="block text-xs text-muted-foreground">Previous in topic</span><span className="block truncate text-sm font-medium">{prev.name}</span></span>
                </Link>
              ) : <span />}
              {next && (
                <Link to={`/concept/${next.id}`} className="group flex items-center justify-end gap-3 rounded-2xl border border-border/80 bg-card p-4 text-right shadow-card transition hover:border-border-strong sm:col-start-2">
                  <span className="min-w-0"><span className="block text-xs text-muted-foreground">Next in topic</span><span className="block truncate text-sm font-medium">{next.name}</span></span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pb-2">
          <MasteryCard c={c} />
          {tab === "lesson" && c.lesson && <LessonToc content={c.lesson.content} />}
          <RefCard title="Builds on" icon={Lock} refs={c.prereqs} empty="Nothing — a foundation concept." />
          {c.dependents.length > 0 && <RefCard title="Unlocks" icon={Unlock} refs={c.dependents} />}
          {!ai?.configured && (
            <p className="px-1 text-xs text-muted-foreground">AI features (tutor, generation) are off — <Link className="text-primary hover:underline" to="/settings">connect a provider</Link>.</p>
          )}
        </aside>
      </div>
    </div>
  );
}

function RefCard({ title, icon: Icon, refs, empty }: { title: string; icon: React.ComponentType<{ className?: string }>; refs: Ref[]; empty?: string }) {
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-sm"><Icon className="h-4 w-4 text-muted-foreground" />{title}</CardTitle></CardHeader>
      <CardContent className="space-y-0.5 pb-3">
        {!refs.length && <p className="text-xs text-muted-foreground">{empty}</p>}
        {refs.map((r) => (
          <Link key={r.id} to={`/concept/${r.id}`} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] transition hover:bg-muted">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: STATUS_STYLE[r.status].color }} title={STATUS_STYLE[r.status].label} />
            <span className="min-w-0 flex-1 truncate">{r.name}</span>
            <span className={cn("shrink-0 text-xs tabular-nums", r.status === "mastered" ? "font-medium text-success" : "text-muted-foreground")}>
              {r.status === "mastered" ? <CheckCircle2 className="h-3.5 w-3.5" /> : r.status === "not_started" ? "–" : Math.round(r.score)}
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

function MasteryCard({ c }: { c: ConceptDetail }) {
  const p = c.progress;
  const items = [
    { ok: p.lessonCompleted, label: "Lesson studied", hint: "Reading alone never makes a concept Mastered" },
    { ok: p.distinctQuestions >= 5, label: `Different questions · ${Math.min(p.distinctQuestions, 5)}/5` },
    { ok: p.patterns >= 2, label: `Question patterns · ${Math.min(p.patterns, 2)}/2` },
    { ok: p.score >= 80, label: "80%+ weighted accuracy" },
    { ok: p.retentionVerified, label: p.readyForRetention ? "Retention check due — open Revision" : "Retention check on a later day" },
  ];
  const done = items.filter((i) => i.ok).length;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="justify-between text-sm">Road to mastery<span className="text-xs font-medium text-muted-foreground">{done}/5</span></CardTitle>
        <div className="mt-1 flex gap-1">{items.map((i, k) => <span key={k} className={cn("h-1.5 flex-1 rounded-full", i.ok ? "bg-primary" : "bg-muted")} />)}</div>
      </CardHeader>
      <CardContent className="space-y-2 pb-4">
        {items.map((i) => (
          <div key={i.label} className="flex items-start gap-2 text-[13px]" title={i.hint}>
            {i.ok ? <CheckCircle2 className="mt-px h-4 w-4 shrink-0 text-success" /> : <Circle className="mt-px h-4 w-4 shrink-0 text-border-strong" />}
            <span className={i.ok ? "" : "text-muted-foreground"}>{i.label}</span>
          </div>
        ))}
        {p.needsRelearn && <p className="rounded-lg bg-danger/10 p-2 text-xs text-danger">Performance dropped — re-read the lesson, then practise.</p>}
        {c.review && <p className="border-t pt-2 text-xs text-muted-foreground">Next revision {relDays(c.review.due_at)} · {fmtDate(c.review.due_at)}</p>}
      </CardContent>
    </Card>
  );
}

function LessonToc({ content }: { content: string }) {
  const heads = React.useMemo(() => lessonHeadings(content), [content]);
  const [active, setActive] = React.useState<string | null>(null);
  React.useEffect(() => {
    const onScroll = () => {
      let cur: string | null = null;
      for (const h of heads) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top < 140) cur = h.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heads]);
  if (heads.length < 2) return null;
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-sm"><TextQuote className="h-4 w-4 text-muted-foreground" />On this page</CardTitle></CardHeader>
      <CardContent className="pb-3">
        <nav className="relative space-y-0.5 border-l border-border">
          {heads.map((h) => (
            <button key={h.id} onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className={cn("-ml-px block w-full border-l-2 py-1 text-left text-[13px] leading-snug transition-colors cursor-pointer",
                h.level === 3 ? "pl-6" : "pl-3",
                active === h.id ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>
              {h.text}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}

function LessonView({ c, onDone, onRegenerated }: { c: ConceptDetail; onDone: () => void; onRegenerated: () => void }) {
  const { ai } = useApp();
  const ref = React.useRef<HTMLDivElement>(null);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<unknown>(null);
  const [readPct, setReadPct] = React.useState(0);
  const lastSent = React.useRef(0);

  React.useEffect(() => { if (c.lesson) api.post(`/concepts/${c.id}/lesson-event`, { event: "open" }).catch(() => {}); }, [c.id, !!c.lesson]); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (!c.lesson) return;
    let timer: number | undefined;
    const onScroll = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (window.innerHeight - r.top) / r.height));
      setReadPct(Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - window.innerHeight * 0.6))));
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (pos > lastSent.current + 0.02 || pos < lastSent.current - 0.1) {
          lastSent.current = pos;
          api.post(`/concepts/${c.id}/lesson-event`, { event: "position", position: Math.max(pos, c.progress.lastPosition) }).catch(() => {});
        }
      }, 800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); window.clearTimeout(timer); };
  }, [c.id, c.lesson, c.progress.lastPosition]);

  const generate = async () => {
    setBusy(true); setErr(null);
    try { await api.post(`/ai/lesson/${c.id}`); onRegenerated(); } catch (e) { setErr(e); } finally { setBusy(false); }
  };
  const resume = () => {
    const el = ref.current; if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + el.offsetHeight * c.progress.lastPosition - window.innerHeight * 0.6, behavior: "smooth" });
  };

  if (!c.lesson) {
    return (
      <Empty icon={<BookOpen />} title="No built-in lesson for this concept yet">
        <p>Scope: {c.summary}</p>
        {ai?.configured ? (
          <>
            <p className="mt-3">Generate a structured lesson (intuition, derivation, worked examples, GATE traps). It is saved locally so it stays available offline.</p>
            <Button className="mt-4" onClick={generate} loading={busy}><Sparkles className="h-4 w-4" />Generate lesson with AI</Button>
          </>
        ) : (
          <p className="mt-3">Connect an AI provider in Settings to generate a lesson here. You can still practise stored questions, write notes and track mastery.</p>
        )}
        {err != null && <div className="mt-3 text-left"><ErrorBox error={err} /></div>}
      </Empty>
    );
  }
  return (
    <div className="space-y-4">
      <div className="no-print fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent" aria-hidden="true">
        <div className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 transition-[width] duration-150" style={{ width: `${readPct * 100}%` }} />
      </div>
      {c.lesson.source !== "builtin" && (
        <Callout tone="violet" icon={Sparkles} action={ai?.configured ? <Button size="sm" variant="outline" onClick={generate} loading={busy}>Regenerate</Button> : undefined}>
          AI-generated lesson ({c.lesson.model}) — cross-check key results with a standard textbook.
        </Callout>
      )}
      {c.progress.lastPosition > 0.08 && c.progress.lastPosition < 0.95 && (
        <Button variant="secondary" size="sm" onClick={resume}>Jump to where you left off · {Math.round(c.progress.lastPosition * 100)}%</Button>
      )}
      <Card className="px-5 py-6 md:px-10 md:py-9">
        <div ref={ref}><Markdown anchors>{c.lesson.content}</Markdown></div>
      </Card>
      <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-3">
          <IconChip icon={c.progress.lessonCompleted ? CheckCircle2 : PenLine} tone={c.progress.lessonCompleted ? "emerald" : "indigo"} />
          <p className="max-w-md text-sm text-muted-foreground">{c.progress.lessonCompleted ? "You've studied this lesson. Mastery comes from varied practice and a later retention check." : "Finished reading? Mark it, then prove it with practice."}</p>
        </div>
        <Button size="lg" onClick={async () => { await api.post(`/concepts/${c.id}/lesson-event`, { event: "complete" }); onDone(); }}>
          {c.progress.lessonCompleted ? "Go to practice" : "I've understood this — practise"} <ArrowRight className="h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
}

function FormulaView({ c }: { c: ConceptDetail }) {
  const { toast } = useApp();
  const [saved, setSaved] = React.useState<Record<string, boolean>>({});
  if (!c.formulas.length) return <Empty icon={<Sigma />} title="No built-in formulas for this concept">Add your own in the <Link className="text-primary underline" to="/notebook">Formula notebook</Link>.</Empty>;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {c.formulas.map((f) => (
        <Card key={f.id} className="flex flex-col p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">{f.title}</p>
            <button title="Bookmark formula" className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-amber-500 cursor-pointer"
              onClick={async () => { await api.post("/bookmarks", { kind: "formula", refId: f.id }); setSaved((s) => ({ ...s, [f.id]: true })); toast("Formula saved to bookmarks"); }}>
              <Star className={cn("h-4 w-4", saved[f.id] && "fill-amber-400 text-amber-500")} />
            </button>
          </div>
          <div className="my-3 rounded-xl border border-border/70 bg-card-soft px-3 py-2.5"><TeX latex={f.latex} /></div>
          {f.note && <p className="text-xs text-muted-foreground">{f.note}</p>}
        </Card>
      ))}
    </div>
  );
}

function NotesView({ conceptId }: { conceptId: string }) {
  const { toast } = useApp();
  const { data, reload } = useLoad<{ id: number; title: string; body: string; updated_at: string }[]>(`/notes?concept=${conceptId}`, [conceptId]);
  const [editing, setEditing] = React.useState<{ id?: number; title: string; body: string } | null>(null);
  const save = async () => {
    if (!editing) return;
    if (editing.id) await api.put(`/notes/${editing.id}`, editing); else await api.post("/notes", { ...editing, conceptId });
    setEditing(null); reload(); toast("Note saved");
  };
  return (
    <div className="space-y-3">
      {!editing && <Button variant="outline" onClick={() => setEditing({ title: "", body: "" })}><PenLine className="h-4 w-4" />New note</Button>}
      {editing && (
        <Card className="space-y-3 p-4">
          <Input placeholder="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          <div className="grid gap-3 md:grid-cols-2">
            <Textarea rows={10} placeholder="Markdown with LaTeX, e.g. $y = x * h$" value={editing.body} onChange={(e) => setEditing({ ...editing, body: e.target.value })} className="font-mono text-[13px]" />
            <div className="rounded-lg border bg-card-soft p-3"><p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Preview</p><Markdown compact>{editing.body || "*Nothing yet*"}</Markdown></div>
          </div>
          <div className="flex gap-2"><Button onClick={save}>Save note</Button><Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button></div>
        </Card>
      )}
      {data?.map((n) => (
        <Card key={n.id} className="p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium">{n.title || "Untitled note"}</p>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => setEditing(n)}>Edit</Button>
              <Button size="sm" variant="ghost" onClick={async () => { if (confirm("Delete this note?")) { await api.del(`/notes/${n.id}`); reload(); } }}>Delete</Button>
            </div>
          </div>
          <Markdown compact className="mt-2">{n.body}</Markdown>
          <p className="mt-2 text-xs text-muted-foreground">Updated {fmtDate(n.updated_at, true)}</p>
        </Card>
      ))}
      {data && !data.length && !editing && <Empty icon={<NotebookPen />} title="No notes for this concept yet">Notes support Markdown and LaTeX, are saved in your local database and are included in backups.</Empty>}
    </div>
  );
}
