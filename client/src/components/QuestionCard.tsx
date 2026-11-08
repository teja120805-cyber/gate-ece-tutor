// Renders a question (MCQ / MSQ / NAT) with controlled response and optional answer reveal.
import * as React from "react";
import { Check, X } from "lucide-react";
import type { QuestionPublic, QResponse } from "@shared/types";
import { Markdown } from "./Markdown";
import { Badge } from "./ui";
import { cn, sourceLabel } from "@/lib/utils";

export function SourceBadge({ source, sourceRef }: { source: string; sourceRef?: string | null }) {
  const s = sourceLabel(source, sourceRef);
  return <Badge className={s.cls}>{s.text}</Badge>;
}

const DIFF = ["", "Easy", "Medium", "Hard"];
export function QuestionMeta({ q, showDifficulty = true }: { q: QuestionPublic; showDifficulty?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs">
      <Badge tone="indigo" className="font-semibold">{q.type}</Badge>
      <Badge>{q.marks} mark{q.marks > 1 ? "s" : ""}</Badge>
      {showDifficulty && <Badge>{DIFF[q.difficulty]}</Badge>}
      <SourceBadge source={q.source} sourceRef={q.sourceRef} />
      {q.type === "MSQ" && <span className="text-muted-foreground">· one or more options may be correct</span>}
      {q.type === "NAT" && <span className="text-muted-foreground">· enter a numerical answer</span>}
    </div>
  );
}

export function QuestionCard({ q, response, onChange, disabled, reveal, number }: {
  q: QuestionPublic; response: QResponse; onChange: (r: QResponse) => void; disabled?: boolean;
  reveal?: { answer?: number[] | null; range?: [number, number] | null; correct?: boolean | null } | null; number?: number;
}) {
  const sel = response.selected ?? [];
  const [natText, setNatText] = React.useState(response.value != null ? String(response.value) : "");
  React.useEffect(() => { setNatText(response.value != null ? String(response.value) : ""); }, [q.id]); // eslint-disable-line react-hooks/exhaustive-deps
  // Keep the text box in sync when the response is cleared from outside (e.g. "Clear response").
  // (A half-typed "-" or "1e" also has no value, so only clear when the box holds a complete number.)
  React.useEffect(() => { if (response.value == null && Number.isFinite(parseFloat(natText))) setNatText(""); }, [response.value]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (i: number) => {
    if (disabled) return;
    if (q.type === "MCQ") onChange({ selected: [i] });
    else onChange({ selected: sel.includes(i) ? sel.filter((x) => x !== i) : [...sel, i].sort() });
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        {number != null && <span className="mt-0.5 flex h-7 min-w-7 items-center justify-center rounded-lg bg-muted px-1.5 text-xs font-bold tabular-nums text-muted-foreground">Q{number}</span>}
        <Markdown className="min-w-0 flex-1 text-[15.5px]">{q.stem}</Markdown>
      </div>
      {q.options && (
        <div className="grid gap-2.5" role={q.type === "MCQ" ? "radiogroup" : "group"}>
          {q.options.map((opt, i) => {
            const chosen = sel.includes(i);
            const isAns = !!reveal?.answer?.includes(i);
            const wrongPick = !!reveal && chosen && !isAns;
            return (
              <button key={i} type="button" onClick={() => toggle(i)} disabled={disabled}
                role={q.type === "MCQ" ? "radio" : "checkbox"} aria-checked={chosen}
                className={cn("group flex w-full items-start gap-3 rounded-xl border bg-card p-3.5 text-left transition-all",
                  !disabled && "cursor-pointer hover:border-primary/40 hover:bg-accent/30",
                  !reveal && chosen && "border-primary bg-accent/60 ring-2 ring-primary/15",
                  !reveal && !chosen && "border-border-strong/60",
                  reveal && isAns && "border-emerald-500/60 bg-emerald-50 ring-2 ring-emerald-500/10 dark:bg-emerald-500/10",
                  wrongPick && "border-red-400/70 bg-red-50 dark:bg-red-500/10",
                  reveal && !isAns && !chosen && "border-border opacity-75")}>
                <span className={cn("mt-px flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-bold transition-colors",
                  q.type === "MSQ" ? "rounded-lg" : "rounded-full",
                  reveal && isAns ? "border-emerald-600 bg-emerald-600 text-white"
                    : wrongPick ? "border-red-500 bg-red-500 text-white"
                      : chosen ? "border-primary bg-primary text-primary-foreground" : "border-border-strong bg-card text-muted-foreground group-hover:border-primary/50 group-hover:text-primary")}>
                  {reveal && isAns ? <Check className="h-4 w-4" /> : wrongPick ? <X className="h-4 w-4" /> : "ABCD"[i]}
                </span>
                <Markdown compact className="min-w-0 flex-1 pt-0.5">{opt}</Markdown>
                {reveal && isAns && <span className="shrink-0 pt-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Correct</span>}
                {wrongPick && <span className="shrink-0 pt-1 text-[11px] font-semibold uppercase tracking-wide text-red-600 dark:text-red-300">Your pick</span>}
              </button>
            );
          })}
        </div>
      )}
      {q.type === "NAT" && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input inputMode="decimal" value={natText} disabled={disabled} placeholder="Your answer" aria-label="Numerical answer"
              data-nat-input
              onChange={(e) => {
                const t = e.target.value.replace(/[^0-9eE.+\-]/g, "");
                setNatText(t);
                const v = parseFloat(t);
                onChange({ value: t.trim() === "" || !Number.isFinite(v) ? null : v });
              }}
              className={cn("h-12 w-56 rounded-xl border border-border-strong/70 bg-card px-4 font-mono text-lg shadow-[inset_0_1px_1px_rgb(22_26_46/0.03)] outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/12",
                reveal && (reveal.correct ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "border-red-400 bg-red-50 dark:bg-red-500/10"))} />
          </div>
          {reveal?.range && (
            <span className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200">
              Accepted: <b className="font-mono">{reveal.range[0] === reveal.range[1] ? reveal.range[0] : `${reveal.range[0]} to ${reveal.range[1]}`}</b>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function isAnswered(q: QuestionPublic, r: QResponse) {
  return q.type === "NAT" ? typeof r.value === "number" && Number.isFinite(r.value) : (r.selected?.length ?? 0) > 0;
}
