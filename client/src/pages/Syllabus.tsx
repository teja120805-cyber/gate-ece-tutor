import * as React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronDown, BookOpen, Sparkles, Search, Stethoscope, Flame, ListChecks, Layers, X } from "lucide-react";
import type { SubjectNode } from "@shared/types";
import { useLoad } from "@/lib/app";
import { api } from "@/lib/api";
import { Card, PageLoader, ErrorBox, Input, Badge, Button, IconChip, Ring, PageHeader, Callout, Tip, TONE } from "@/components/ui";
import { StatusBadge, MasteryBar, StageBar } from "@/components/Status";
import { subjectMeta } from "@/lib/subjects";
import { STATUS_STYLE, cn } from "@/lib/utils";

export function Syllabus() {
  const { subjectId } = useParams();
  const nav = useNavigate();
  const { data, error, loading, reload } = useLoad<SubjectNode[]>("/syllabus");
  const [q, setQ] = React.useState("");
  const [openCh, setOpenCh] = React.useState<Record<string, boolean>>({});
  const [checkMsg, setCheckMsg] = React.useState<string | null>(null);

  const chapterCheck = async (chapterId: string, name: string) => {
    setCheckMsg(null);
    try {
      const r = await api.get<{ prereqs: { name: string; strong: boolean; questionCount: number }[]; assessable: number }>(`/chapters/${chapterId}/prereq-check`);
      const weak = r.prereqs.filter((p) => !p.strong);
      if (!r.prereqs.length) return setCheckMsg(`“${name}” has no prerequisites outside its own chapter — you can start right away.`);
      if (!weak.length) return setCheckMsg(`Your foundations for “${name}” look solid (${r.prereqs.length} prerequisites already strong).`);
      if (!r.assessable) return setCheckMsg(`Prerequisites to review first: ${weak.map((w) => w.name).join(", ")}. (No diagnostic questions are stored for them yet.)`);
      const d = await api.post<{ id: number }>("/diagnostics", { targetId: chapterId, scope: "chapter" });
      nav(`/diagnostic/${d.id}`);
    } catch (e) { setCheckMsg((e as Error).message); }
  };
  React.useEffect(() => { setCheckMsg(null); }, [subjectId]);

  if (loading && !data) return <PageLoader />;
  if (error) return <ErrorBox error={error} onRetry={reload} />;
  const subjects = data!;
  const active = subjects.find((s) => s.id === subjectId) ?? subjects[0];
  const needle = q.trim().toLowerCase();
  const totalConcepts = subjects.reduce((a, s) => a + s.rollup.total, 0);
  const allConcepts = subjects.flatMap((s) => s.chapters.flatMap((c) => c.topics.flatMap((t) => t.concepts)));
  const lessons = allConcepts.filter((c) => c.hasLesson).length;
  const totalQ = allConcepts.reduce((a, c) => a + c.questionCount, 0);

  const matches = needle ? subjects.flatMap((s) => s.chapters.flatMap((ch) => ch.topics.flatMap((t) => t.concepts
    .filter((c) => (c.name + " " + c.summary + " " + t.name + " " + ch.name).toLowerCase().includes(needle))
    .map((c) => ({ c, s, ch }))))) : [];
  const am = subjectMeta(active.id);
  const activeConcepts = active.chapters.flatMap((c) => c.topics.flatMap((t) => t.concepts));

  return (
    <div className="space-y-6">
      <PageHeader icon={BookOpen} title="GATE EC syllabus"
        description={`${subjects.length} subjects · ${totalConcepts} concepts · ${lessons} lessons · ${totalQ} practice questions. Every concept tracks its own mastery.`}
        actions={
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9 pr-8" placeholder="Filter concepts…" value={q} onChange={(e) => setQ(e.target.value)} />
            {q && <button className="absolute right-2 top-2 rounded p-0.5 text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => setQ("")} aria-label="Clear"><X className="h-4 w-4" /></button>}
          </div>
        } />

      {needle ? (
        <Card className="overflow-hidden">
          <div className="border-b bg-card-soft px-4 py-2.5 text-xs font-medium text-muted-foreground">{matches.length} concept{matches.length === 1 ? "" : "s"} match “{q}”</div>
          {matches.length === 0 && <p className="p-6 text-center text-sm text-muted-foreground">Try a broader word, e.g. “transform” or “amplifier”.</p>}
          <div className="divide-y">
            {matches.slice(0, 80).map(({ c, s, ch }) => {
              const m = subjectMeta(s.id);
              return (
                <Link key={c.id} to={`/concept/${c.id}`} className="flex items-center gap-3 px-4 py-3 transition hover:bg-card-soft">
                  <IconChip icon={m.icon} tone={m.tone} size="sm" />
                  <div className="min-w-0 flex-1"><p className="text-sm font-medium">{c.name}</p><p className="truncate text-xs text-muted-foreground">{s.name} › {ch.name}</p></div>
                  <StatusBadge status={c.progress.status} />
                </Link>
              );
            })}
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
          {/* Subject rail */}
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:flex-col lg:gap-1 lg:self-start lg:overflow-y-auto lg:pb-0">
            {subjects.map((s) => {
              const m = subjectMeta(s.id);
              const on = s.id === active.id;
              return (
                <button key={s.id} onClick={() => nav(`/syllabus/${s.id}`)}
                  className={cn("flex shrink-0 items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition cursor-pointer lg:w-full",
                    on ? "border-primary/30 bg-card shadow-card ring-1 ring-primary/15" : "border-transparent hover:bg-card hover:shadow-card")}>
                  <IconChip icon={m.icon} tone={m.tone} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className={cn("truncate text-[13px] font-medium", on && "text-foreground")}>{s.name}</p>
                    <div className="mt-1 hidden lg:block"><MasteryBar score={s.rollup.score} touched={s.rollup.total - s.rollup.counts.not_started > 0} /></div>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="min-w-0 space-y-4">
            {/* Subject hero */}
            <Card className="hero-wash p-6">
              <div className="flex flex-wrap items-start gap-5">
                <IconChip icon={am.icon} tone={am.tone} size="lg" className="hidden sm:inline-flex" />
                <div className="min-w-[15rem] flex-1">
                  <p className={cn("text-xs font-semibold uppercase tracking-wider", TONE[am.tone].text)}>{active.gateSection}</p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight">{active.name}</h2>
                  <p className="mt-1.5 max-w-2xl text-sm text-foreground/75">{active.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge><Layers className="h-3 w-3" />{active.chapters.length} chapters · {active.rollup.total} concepts</Badge>
                    <Badge><ListChecks className="h-3 w-3" />{activeConcepts.reduce((a, c) => a + c.questionCount, 0)} questions</Badge>
                    <Badge tone="amber"><Flame className="h-3 w-3" />≈ {active.examWeight} of 100 marks</Badge>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Ring value={active.rollup.score} size={84} stroke={8} label={`Average mastery ${active.rollup.score}`}>
                    <span className="text-xl font-bold tabular-nums">{active.rollup.score}</span>
                    <span className="text-[10px] text-muted-foreground">mastery</span>
                  </Ring>
                  <span className="text-xs text-muted-foreground">{active.rollup.counts.mastered}/{active.rollup.total} mastered</span>
                </div>
              </div>
              <StageBar rollup={active.rollup} className="mt-5" />
            </Card>
            {checkMsg && <Callout tone="indigo" icon={Stethoscope}>{checkMsg}</Callout>}

            {active.chapters.map((ch, ci) => {
              const isOpen = openCh[ch.id] ?? true;
              const touched = ch.rollup.total - ch.rollup.counts.not_started > 0;
              return (
                <Card key={ch.id} className="overflow-hidden">
                  <div className="flex items-center gap-3 p-4">
                    <button onClick={() => setOpenCh((o) => ({ ...o, [ch.id]: !isOpen }))} className="flex min-w-0 flex-1 items-center gap-3 text-left cursor-pointer" aria-expanded={isOpen}>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold tabular-nums text-muted-foreground">{String(ci + 1).padStart(2, "0")}</span>
                      <span className="min-w-0">
                        <span className="block truncate font-semibold">{ch.name}</span>
                        <span className="block text-xs text-muted-foreground">{ch.rollup.total} concepts · {ch.rollup.counts.mastered} mastered</span>
                      </span>
                      <ChevronDown className={cn("ml-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform", !isOpen && "-rotate-90")} />
                    </button>
                    <MasteryBar score={ch.rollup.score} touched={touched} className="hidden w-36 md:flex" />
                    <Button size="sm" variant="outline" title="Check prerequisites from other chapters before starting this one" onClick={() => chapterCheck(ch.id, ch.name)}>
                      <Stethoscope className="h-4 w-4" /><span className="hidden md:inline">Readiness check</span>
                    </Button>
                  </div>
                  {isOpen && (
                    <div className="space-y-4 border-t bg-card-soft/60 px-4 pb-4 pt-3">
                      {ch.topics.map((t) => (
                        <div key={t.id}>
                          <div className="mb-2 flex items-center justify-between px-1">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{t.name}</p>
                            <span className="text-[11px] tabular-nums text-muted-foreground">topic score {t.rollup.score}</span>
                          </div>
                          <div className="overflow-hidden rounded-xl border bg-card">
                            {t.concepts.map((c, i) => (
                              <Link key={c.id} to={`/concept/${c.id}`} className={cn("group flex items-center gap-3 px-3.5 py-3 transition hover:bg-accent/40", i > 0 && "border-t")}>
                                <span className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-card" style={{ background: STATUS_STYLE[c.progress.status].color }} />
                                <div className="min-w-0 flex-1">
                                  <p className="flex flex-wrap items-center gap-2 text-sm font-medium group-hover:text-primary">
                                    {c.name}
                                    {c.weight === 3 && <Badge tone="amber" className="text-[10px]"><Flame className="h-3 w-3" />high yield</Badge>}
                                    {c.progress.needsRelearn && <Badge tone="rose" className="text-[10px]">relearn</Badge>}
                                  </p>
                                  <p className="line-clamp-1 text-xs text-muted-foreground">{c.summary}</p>
                                </div>
                                <div className="hidden items-center gap-3 text-xs text-muted-foreground md:flex">
                                  {c.hasLesson && (c.lessonSource === "builtin"
                                    ? <Tip text="Built-in lesson"><BookOpen className="h-4 w-4 text-primary/80" /></Tip>
                                    : <Tip text="AI-generated lesson"><Sparkles className="h-4 w-4 text-violet-500" /></Tip>)}
                                  <span className="tabular-nums" title="Questions available">{c.questionCount} Q</span>
                                  {c.pyqCount > 0 && <span className="text-amber-700 dark:text-amber-300" title="Official PYQs">{c.pyqCount} PYQ</span>}
                                </div>
                                <MasteryBar score={c.progress.score} touched={c.progress.status !== "not_started"} className="hidden w-24 sm:flex" />
                                <StatusBadge status={c.progress.status} className="hidden w-[5.75rem] justify-center sm:inline-flex" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
