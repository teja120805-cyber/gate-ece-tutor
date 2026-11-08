import type { MasteryStatus, Rollup } from "@shared/types";
import { STATUS_STYLE, STAGE_ORDER, cn } from "@/lib/utils";
import { Tip } from "./ui";

export function StatusBadge({ status, className }: { status: MasteryStatus; className?: string }) {
  const s = STATUS_STYLE[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset", s.chip, className)}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />{s.label}
    </span>
  );
}

/** Score bar (0–100). Length carries the value; the number is always printed beside it. */
export function MasteryBar({ score, touched = true, className, showValue = true }: { score: number; touched?: boolean; className?: string; showValue?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-500 dark:from-indigo-400 dark:to-violet-400"
          style={{ width: `${touched ? Math.max(3, score) : 0}%` }} />
      </div>
      {showValue && <span className="w-7 text-right text-xs tabular-nums text-muted-foreground">{touched ? Math.round(score) : "–"}</span>}
    </div>
  );
}

/** Stacked bar of concepts per mastery stage, with a 2px gap between segments. */
export function StageBar({ rollup, className, height = "h-2" }: { rollup: Rollup; className?: string; height?: string }) {
  const parts = STAGE_ORDER.filter((k) => rollup.counts[k] > 0);
  return (
    <div className={cn("flex w-full gap-[2px]", height, className)}>
      {parts.map((k, i) => (
        <Tip key={k} text={`${STATUS_STYLE[k].label}: ${rollup.counts[k]} of ${rollup.total}`} className="h-full"
          style={{ width: `${(rollup.counts[k] / Math.max(1, rollup.total)) * 100}%`, minWidth: 3 }}>
          <span className={cn("block h-full w-full", i === 0 && "rounded-l-full", i === parts.length - 1 && "rounded-r-full")} style={{ background: STATUS_STYLE[k].color }} />
        </Tip>
      ))}
    </div>
  );
}

export function StatusLegend({ counts, className }: { counts?: Record<MasteryStatus, number>; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground", className)}>
      {STAGE_ORDER.map((k) => (
        <span key={k} className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: STATUS_STYLE[k].color }} />
          {STATUS_STYLE[k].label}{counts && <b className="font-semibold text-foreground tabular-nums">{counts[k]}</b>}
        </span>
      ))}
    </div>
  );
}
