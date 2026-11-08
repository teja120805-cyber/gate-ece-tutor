// Shared chart styling for Recharts: recessive axes and grid, a themed tooltip, and an activity calendar.
import * as React from "react";
import { cn } from "@/lib/utils";

export const AXIS = { tick: { fontSize: 11, fill: "var(--viz-axis)" }, tickLine: false, axisLine: false } as const;

/** Tooltip that follows the app theme. `format` renders each value; text stays in text colours. */
export function ChartTooltip({ active, payload, label, format, labelFormat }: {
  active?: boolean; payload?: { name?: string; value?: number | string; color?: string; payload?: Record<string, unknown> }[]; label?: string | number;
  format?: (v: number | string, p: Record<string, unknown>) => React.ReactNode; labelFormat?: (l: string | number | undefined, p: Record<string, unknown> | undefined) => React.ReactNode;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border bg-card px-3 py-2 text-xs shadow-raised">
      <p className="mb-1 font-semibold text-foreground">{labelFormat ? labelFormat(label, payload[0]?.payload) : label}</p>
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-2 text-muted-foreground">
          <span className="h-2 w-2 rounded-sm" style={{ background: p.color }} />
          {p.name}: <b className="font-semibold text-foreground tabular-nums">{format ? format(p.value ?? 0, p.payload ?? {}) : p.value}</b>
        </p>
      ))}
    </div>
  );
}

/** GitHub-style study calendar: one cell per day, weeks as columns, sequential blue by minutes. */
export function ActivityCalendar({ days, className }: { days: { day: string; minutes: number; questions: number }[]; className?: string }) {
  const [hover, setHover] = React.useState<{ i: number; x: number; y: number } | null>(null);
  if (!days.length) return null;
  const max = Math.max(1, ...days.map((d) => d.minutes));
  const level = (m: number) => (m <= 0 ? 0 : Math.min(5, 1 + Math.floor((m / max) * 4.999)));
  // Pad the front so the first column starts on Monday.
  const first = new Date(days[0].day + "T00:00");
  const pad = (first.getDay() + 6) % 7;
  const cells: ({ day: string; minutes: number; questions: number } | null)[] = [...Array(pad).fill(null), ...days];
  const weeks: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  const months = weeks.map((w, i) => {
    const d = w.find(Boolean);
    if (!d) return "";
    const m = new Date(d.day + "T00:00").toLocaleDateString(undefined, { month: "short" });
    const prev = i > 0 ? weeks[i - 1].find(Boolean) : null;
    return !prev || new Date(prev.day + "T00:00").getMonth() !== new Date(d.day + "T00:00").getMonth() ? m : "";
  });
  const active = hover != null ? cells[hover.i] : null;

  return (
    <div className={cn("relative", className)} onMouseLeave={() => setHover(null)}>
      <div className="overflow-x-auto pb-1">
        <div className="inline-flex gap-2">
          <div className="mt-5 grid grid-rows-7 gap-[3px] text-[10px] text-muted-foreground">
            {["Mon", "", "Wed", "", "Fri", "", ""].map((d, i) => <span key={i} className="h-[13px] leading-[13px]">{d}</span>)}
          </div>
          <div>
            <div className="mb-1 flex gap-[3px] text-[10px] text-muted-foreground">
              {months.map((m, i) => <span key={i} className="w-[13px] overflow-visible whitespace-nowrap">{m}</span>)}
            </div>
            <div className="flex gap-[3px]">
              {weeks.map((w, wi) => (
                <div key={wi} className="grid grid-rows-7 gap-[3px]">
                  {Array.from({ length: 7 }, (_, di) => {
                    const c = w[di];
                    const idx = wi * 7 + di;
                    if (!c) return <span key={di} className="h-[13px] w-[13px]" />;
                    return (
                      <span key={di} className="h-[13px] w-[13px] rounded-[3px] ring-inset hover:ring-2 hover:ring-foreground/40"
                        style={{ background: `var(--seq-${level(c.minutes)})` }}
                        onMouseEnter={(e) => {
                          const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                          const host = (e.currentTarget as HTMLElement).closest(".relative")!.getBoundingClientRect();
                          setHover({ i: idx, x: r.left - host.left + r.width / 2, y: r.top - host.top });
                        }} />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1.5 text-[11px] text-muted-foreground">
        Less{[0, 1, 2, 3, 4, 5].map((l) => <span key={l} className="h-[11px] w-[11px] rounded-[3px]" style={{ background: `var(--seq-${l})` }} />)}More
      </div>
      {hover && active && (
        <div className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-stone-900 px-2.5 py-1.5 text-[11px] text-white shadow-raised dark:bg-stone-100 dark:text-stone-900"
          style={{ left: hover.x, top: hover.y - 6 }}>
          <b>{active.minutes} min</b> · {active.questions} question{active.questions === 1 ? "" : "s"}
          <span className="block opacity-70">{new Date(active.day + "T00:00").toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      )}
    </div>
  );
}
