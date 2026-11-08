import * as React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Stethoscope, CheckCircle2, XCircle, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";
import type { QuestionPublic, QResponse } from "@shared/types";
import { api } from "@/lib/api";
import { useLoad } from "@/lib/app";
import { Card, Button, PageLoader, ErrorBox, Ring, Progress, Badge } from "@/components/ui";
import { QuestionCard, QuestionMeta, isAnswered } from "@/components/QuestionCard";
import { Markdown } from "@/components/Markdown";
import { cn } from "@/lib/utils";

interface Diag {
  id: number; targetId: string; targetName: string; scope: "concept" | "chapter"; status: string;
  items: { idx: number; prereqId: string; prereqName: string; question: QuestionPublic }[];
  result: null | {
    score: number; correct: number; total: number; ready: boolean;
    gaps: { conceptId: string; conceptName: string }[]; solid: { conceptId: string; conceptName: string }[];
    recommendations: { conceptId: string; conceptName: string; deeper: { conceptId: string; conceptName: string }[] }[];
  };
}

export function DiagnosticPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { data, error, loading, reload, setData } = useLoad<Diag>(`/diagnostics/${id}`, [id]);
  const [resp, setResp] = React.useState<Record<number, QResponse>>({});
  const [busy, setBusy] = React.useState(false);
  const times = React.useRef<Record<number, number>>({});
  const started = React.useRef(Date.now());
  if (loading && !data) return <PageLoader />;
  if (error) return <ErrorBox error={error} onRetry={reload} />;
  const d = data!;
  const done = d.status === "completed";
  const answered = d.items.filter((it) => isAnswered(it.question, resp[it.idx] ?? {})).length;
  const backTo = d.scope === "concept" ? `/concept/${d.targetId}` : "/syllabus";

  const submit = async () => {
    setBusy(true);
    try {
      const total = Date.now() - started.current;
      d.items.forEach((it) => { times.current[it.idx] = Math.round(total / d.items.length); });
      setData(await api.post<Diag>(`/diagnostics/${d.id}/submit`, { responses: resp, timeMs: times.current }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally { setBusy(false); }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Card className="hero-wash p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary"><Stethoscope className="h-4 w-4" />Prerequisite check</p>
        <h1 className="mt-1 text-[26px] font-bold leading-tight tracking-tight">Before: {d.targetName}</h1>
        <p className="mt-1.5 text-sm text-foreground/75">{d.items.length} short questions on the foundations this {d.scope} relies on. No hints — answer honestly so the recommendations are accurate.</p>
        {!done && (
          <div className="mt-4 flex items-center gap-3">
            <Progress value={(answered / Math.max(1, d.items.length)) * 100} className="flex-1" />
            <span className="text-sm tabular-nums text-muted-foreground">{answered}/{d.items.length} answered</span>
          </div>
        )}
      </Card>

      {done && d.result && (
        <Card className="space-y-5 p-6 animate-fade-in">
          <div className="flex flex-wrap items-center gap-5">
            <Ring value={(d.result.correct / Math.max(1, d.result.total)) * 100} size={92} stroke={9}
              color={d.result.ready ? "var(--good)" : "var(--stage-learning)"} label={`${d.result.correct} of ${d.result.total} correct`}>
              <span className="text-xl font-bold tabular-nums">{d.result.correct}/{d.result.total}</span>
            </Ring>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-lg font-semibold">
                {d.result.ready ? <ShieldCheck className="h-5 w-5 text-success" /> : <AlertTriangle className="h-5 w-5 text-warning" />}
                {d.result.ready ? "Your foundations look solid — go ahead." : "Some foundations need attention first."}
              </p>
              {d.result.solid.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">{d.result.solid.map((s) => <Badge key={s.conceptId} tone="emerald"><CheckCircle2 className="h-3 w-3" />{s.conceptName}</Badge>)}</div>
              )}
            </div>
          </div>
          {d.result.gaps.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold">Learn only these missing prerequisites:</p>
              <div className="space-y-2">
                {d.result.recommendations.map((r) => (
                  <div key={r.conceptId} className="rounded-xl border border-rose-200 bg-rose-50/60 p-3.5 dark:border-rose-500/30 dark:bg-rose-500/10">
                    <Link to={`/concept/${r.conceptId}`} className="flex items-center justify-between font-medium hover:underline">{r.conceptName}<ArrowRight className="h-4 w-4" /></Link>
                    {r.deeper.length > 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">If that lesson feels hard, it builds on: {r.deeper.map((x, i) => (
                        <React.Fragment key={x.conceptId}>{i > 0 && ", "}<Link className="underline" to={`/concept/${x.conceptId}`}>{x.conceptName}</Link></React.Fragment>))}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {d.result.gaps[0] && <Button size="lg" onClick={() => nav(`/concept/${d.result!.gaps[0].conceptId}`)}>Start with {d.result.gaps[0].conceptName}<ArrowRight className="h-4 w-4" /></Button>}
            <Button size="lg" variant={d.result.gaps.length ? "outline" : "default"} onClick={() => nav(backTo)}>{d.scope === "concept" ? `Continue to ${d.targetName}` : "Back to syllabus"}</Button>
          </div>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            {d.result.ready ? <CheckCircle2 className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-danger" />}
            Results are saved and used for future recommendations on your dashboard.
          </p>
        </Card>
      )}

      {d.items.map((it, i) => {
        const r = resp[it.idx] ?? {};
        const q = it.question;
        return (
          <Card key={it.idx} className={cn("p-5 md:p-6", !done && isAnswered(q, r) && "ring-1 ring-primary/20")}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <Badge tone="indigo">Checks: {it.prereqName}</Badge>
              <QuestionMeta q={q} showDifficulty={false} />
            </div>
            <QuestionCard q={q} number={i + 1} response={r} onChange={(v) => setResp((s) => ({ ...s, [it.idx]: v }))} disabled={done}
              reveal={done ? { answer: q.answer, range: q.range } : null} />
            {done && q.solution && (
              <div className="mt-5 rounded-xl border border-border/80 bg-card-soft p-4">
                <p className="mb-1 text-sm font-semibold">Solution</p>
                <Markdown compact>{q.solution}</Markdown>
              </div>
            )}
          </Card>
        );
      })}

      {!done && (
        <Card className="sticky bottom-4 flex flex-wrap items-center gap-3 p-4 shadow-raised">
          <Button size="lg" onClick={submit} loading={busy}>Submit check</Button>
          <span className="text-sm text-muted-foreground">{answered} of {d.items.length} answered · unanswered questions count as gaps.</span>
        </Card>
      )}
    </div>
  );
}
