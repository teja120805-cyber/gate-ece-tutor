import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { MasteryStatus } from "@shared/types";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function fmtDuration(ms: number) {
  const s = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${sec}s`;
  return `${sec}s`;
}
export function fmtClock(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return h ? `${h}:${p(m)}:${p(sec)}` : `${p(m)}:${p(sec)}`;
}
export function fmtDate(iso: string | null | undefined, withTime = false) {
  if (!iso) return "—";
  const d = new Date(iso);
  return withTime ? d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : d.toLocaleDateString(undefined, { dateStyle: "medium" });
}
export function relDays(iso: string) {
  const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (days <= 0) return days === 0 ? "today" : `${-days}d overdue`;
  return days === 1 ? "tomorrow" : `in ${days} days`;
}
export const pct = (x: number | null | undefined, digits = 0) => (x == null ? "—" : `${(x * 100).toFixed(digits)}%`);

/** Whole days from today (local) to a YYYY-MM-DD date; negative if past. */
export function daysUntil(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  const target = new Date(y, m - 1, d).getTime();
  const now = new Date(); const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((target - today) / 86_400_000);
}

export function greeting(d = new Date()) {
  const h = d.getHours();
  return h < 5 ? "Burning the midnight oil" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

// Mastery stages. Colours come from CSS variables (validated palette, see index.css);
// a stage is always shown with its text label or a legend, never by colour alone.
export const STATUS_STYLE: Record<MasteryStatus, { label: string; chip: string; color: string; tile: string }> = {
  not_started: { label: "Not Started", chip: "bg-muted text-muted-foreground ring-border", color: "var(--stage-none)", tile: "bg-[var(--stage-none)]" },
  learning: { label: "Learning", chip: "bg-amber-50 text-amber-800 ring-amber-200/70 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-500/25", color: "var(--stage-learning)", tile: "bg-[var(--stage-learning)]" },
  practicing: { label: "Practicing", chip: "bg-blue-50 text-blue-800 ring-blue-200/70 dark:bg-blue-500/15 dark:text-blue-200 dark:ring-blue-500/25", color: "var(--stage-practicing)", tile: "bg-[var(--stage-practicing)]" },
  mastered: { label: "Mastered", chip: "bg-emerald-50 text-emerald-800 ring-emerald-200/70 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-500/25", color: "var(--stage-mastered)", tile: "bg-[var(--stage-mastered)]" },
};
export const STAGE_ORDER: MasteryStatus[] = ["mastered", "practicing", "learning", "not_started"];

/** Sequential level 1–5 for a mastery score (0 = untouched). Used with var(--seq-N). */
export function seqLevel(score: number, touched: boolean) {
  if (!touched) return 0;
  return score >= 80 ? 5 : score >= 60 ? 4 : score >= 40 ? 3 : score >= 20 ? 2 : 1;
}
export const SEQ_BANDS = [
  { level: 1, label: "0–19" }, { level: 2, label: "20–39" }, { level: 3, label: "40–59" }, { level: 4, label: "60–79" }, { level: 5, label: "80–100" },
];

export function sourceLabel(source: string, ref?: string | null) {
  switch (source) {
    case "official-pyq": return { text: ref ? `Official PYQ · ${ref}` : "Official PYQ", cls: "bg-amber-50 text-amber-900 ring-1 ring-inset ring-amber-300/70 border-transparent dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-500/30" };
    case "ai-generated": return { text: "AI-generated", cls: "bg-violet-50 text-violet-800 ring-1 ring-inset ring-violet-200 border-transparent dark:bg-violet-500/15 dark:text-violet-200 dark:ring-violet-500/30" };
    case "user": return { text: "Imported", cls: "bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 border-transparent dark:bg-teal-500/15 dark:text-teal-200 dark:ring-teal-500/30" };
    default: return { text: "Practice · original", cls: "bg-card text-muted-foreground" };
  }
}

export function download(url: string) {
  const a = document.createElement("a");
  a.href = url; a.download = ""; document.body.appendChild(a); a.click(); a.remove();
}

/** Stable id for a heading, used by the lesson table of contents. */
export function slugify(s: string) {
  return "h-" + s.toLowerCase().replace(/\$[^$]*\$/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}
