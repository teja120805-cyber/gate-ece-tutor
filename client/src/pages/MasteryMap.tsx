import * as React from "react";
import { Link } from "react-router-dom";
import { Grid3x3, AlertTriangle } from "lucide-react";
import type { SubjectNode, ConceptNode } from "@shared/types";
import { useLoad } from "@/lib/app";
import { Card, PageLoader, ErrorBox, Tabs, PageHeader, IconChip, Ring, Tip } from "@/components/ui";
import { StatusLegend, MasteryBar, StatusBadge } from "@/components/Status";
import { subjectMeta } from "@/lib/subjects";
import { STATUS_STYLE, SEQ_BANDS, cn, seqLevel } from "@/lib/utils";

type ColorBy = "score" | "status";

export function MasteryMap() {
  const { data, error, loading, reload } = useLoad<SubjectNode[]>("/syllabus");
  const [colorBy, setColorBy] = React.useState<ColorBy>("score");
  if (loading && !data) return <PageLoader />;
  if (error) return <ErrorBox error={error} onRetry={reload} />;
  const subjects = data!;
  const all = subjects.flatMap((s) => s.chapters.flatMap((ch) => ch.topics.flatMap((t) => t.concepts.map((c) => ({ c, s })))));
  const weak = all.filter(({ c }) => c.progress.status !== "not_started" && c.progress.status !== "mastered")
    .sort((a, b) => a.c.progress.score - b.c.progress.score).slice(0, 8);
  const counts = all.reduce((a, { c }) => { a[c.progress.status]++; return a; }, { not_started: 0, learning: 0, practicing: 0, mastered: 0 });

  const tileStyle = (c: ConceptNode): React.CSSProperties => {
    const touched = c.progress.status !== "not_started";
    if (!touched) return { background: "transparent", boxShadow: "inset 0 0 0 1.5px var(--border-strong)" };
    return { background: colorBy === "status" ? STATUS_STYLE[c.progress.status].color : `var(--seq-${seqLevel(c.progress.score, true)})` };
  };

  return (
    <div className="space-y-6">
      <PageHeader icon={Grid3x3} tone="emerald" title="Mastery map"
        description="Every square is one concept. Hover for details, click to study. Outlined squares are not started yet."
        actions={<Tabs value={colorBy} onChange={setColorBy} items={[{ value: "score", label: "Colour by score" }, { value: "status", label: "Colour by stage" }]} />} />

      <Card className="flex flex-wrap items-center justify-between gap-4 p-4">
        {colorBy === "status" ? <StatusLegend counts={counts} /> : (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Mastery score</span>
            {SEQ_BANDS.map((b) => (
              <span key={b.level} className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-[3px]" style={{ background: `var(--seq-${b.level})` }} />{b.label}</span>
            ))}
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-[3px]" style={{ boxShadow: "inset 0 0 0 1.5px var(--border-strong)" }} />not started</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-[3px] bg-[var(--seq-2)] ring-2 ring-red-500" />relearn</span>
          </div>
        )}
        <span className="text-xs text-muted-foreground"><b className="text-foreground">{counts.mastered}</b> of {all.length} mastered</span>
      </Card>

      {weak.length > 0 && (
        <Card className="p-5">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold"><AlertTriangle className="h-4 w-4 text-warning" />Weakest concepts in progress</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {weak.map(({ c, s }) => (
              <Link key={c.id} to={`/concept/${c.id}`} className="flex items-center gap-3 rounded-xl border border-border/80 p-2.5 transition hover:border-border-strong hover:bg-card-soft">
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{s.name}</p></div>
                <MasteryBar score={c.progress.score} className="w-24" />
              </Link>
            ))}
          </div>
        </Card>
      )}

      <div className="grid gap-5 xl:grid-cols-2">
        {subjects.map((s) => {
          const m = subjectMeta(s.id);
          const touched = s.rollup.total > s.rollup.counts.not_started;
          return (
            <Card key={s.id} className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <IconChip icon={m.icon} tone={m.tone} />
                <div className="min-w-0 flex-1">
                  <Link to={`/syllabus/${s.id}`} className="font-semibold hover:underline">{s.name}</Link>
                  <p className="text-xs text-muted-foreground">{s.rollup.counts.mastered}/{s.rollup.total} mastered</p>
                </div>
                <Ring value={touched ? s.rollup.score : 0} size={46} stroke={5} label={`Average mastery ${s.rollup.score}`}>
                  <span className="text-xs font-semibold tabular-nums">{touched ? s.rollup.score : "–"}</span>
                </Ring>
              </div>
              <div className="space-y-3">
                {s.chapters.map((ch) => (
                  <div key={ch.id} className="rounded-xl border border-border/70 bg-card-soft/70 p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <p className="min-w-0 flex-1 truncate text-[13px] font-medium">{ch.name}</p>
                      <MasteryBar score={ch.rollup.score} touched={ch.rollup.total > ch.rollup.counts.not_started} className="w-24" />
                    </div>
                    <div className="space-y-1.5">
                      {ch.topics.map((t) => (
                        <div key={t.id} className="flex items-center gap-3">
                          <span className="w-32 shrink-0 truncate text-[11px] text-muted-foreground" title={`${t.name} — topic score ${t.rollup.score}`}>{t.name}</span>
                          <div className="flex flex-wrap gap-1.5">
                            {t.concepts.map((c) => (
                              <Tip key={c.id} text={`${c.name}\n${STATUS_STYLE[c.progress.status].label}${c.progress.status !== "not_started" ? ` · score ${Math.round(c.progress.score)}` : ""}${c.progress.needsRelearn ? " · relearn recommended" : ""}`}>
                                <Link to={`/concept/${c.id}`} aria-label={`${c.name}: ${STATUS_STYLE[c.progress.status].label}`}
                                  className={cn("block h-[22px] w-[22px] rounded-[5px] transition-transform hover:scale-125 hover:shadow-raised", c.progress.needsRelearn && "ring-2 ring-red-500 ring-offset-1 ring-offset-card")}
                                  style={tileStyle(c)} />
                              </Tip>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">Topic, chapter and subject scores are the average of their concept scores (not-started concepts count as 0). <StatusBadge status="mastered" className="mx-1" /> requires 80%+ accuracy over 5+ different questions in 2+ patterns, plus a passed retention check on a later day.</p>
    </div>
  );
}
