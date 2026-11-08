// Ctrl+K / "/" quick search: jump to any concept or page.
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Search, CornerDownLeft, LayoutDashboard, BookOpen, Grid3x3, Repeat, ClipboardList, BarChart3, NotebookPen, Settings, ArrowRight } from "lucide-react";
import type { SubjectNode, MasteryStatus } from "@shared/types";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { subjectMeta } from "@/lib/subjects";
import { Kbd, TONE } from "./ui";
import { StatusBadge } from "./Status";

interface Entry { kind: "page" | "concept"; id: string; title: string; sub: string; to: string; status?: MasteryStatus; subjectId?: string; hay: string; icon?: React.ComponentType<{ className?: string }> }

const PAGES: Entry[] = [
  { kind: "page", id: "p-dash", title: "Dashboard", sub: "Today, streak and what to study next", to: "/", icon: LayoutDashboard, hay: "dashboard home today" },
  { kind: "page", id: "p-syl", title: "Syllabus & lessons", sub: "All subjects, chapters and concepts", to: "/syllabus", icon: BookOpen, hay: "syllabus lessons subjects" },
  { kind: "page", id: "p-map", title: "Mastery map", sub: "Every concept at a glance", to: "/mastery", icon: Grid3x3, hay: "mastery map heatmap" },
  { kind: "page", id: "p-rev", title: "Revision", sub: "Spaced-repetition reviews due", to: "/revision", icon: Repeat, hay: "revision review spaced repetition due" },
  { kind: "page", id: "p-tests", title: "Exam mode · tests", sub: "Topic, subject, mixed and full-length mocks", to: "/tests", icon: ClipboardList, hay: "tests exam mock full length paper" },
  { kind: "page", id: "p-an", title: "Analytics", sub: "Charts and performance trends", to: "/analytics", icon: BarChart3, hay: "analytics stats charts performance" },
  { kind: "page", id: "p-nb", title: "Notebook", sub: "Formulas, notes and bookmarks", to: "/notebook", icon: NotebookPen, hay: "notebook formulas notes bookmarks" },
  { kind: "page", id: "p-set", title: "Settings & data", sub: "Theme, AI, backups, import", to: "/settings", icon: Settings, hay: "settings data backup theme ai export import" },
];

let cache: Entry[] | null = null;
async function loadConcepts(): Promise<Entry[]> {
  if (cache) return cache;
  const syl = await api.get<SubjectNode[]>("/syllabus");
  cache = syl.flatMap((s) => s.chapters.flatMap((ch) => ch.topics.flatMap((t) => t.concepts.map((c) => ({
    kind: "concept" as const, id: c.id, title: c.name, sub: `${s.name} › ${ch.name}`, to: `/concept/${c.id}`,
    status: c.progress.status, subjectId: s.id, hay: `${c.name} ${t.name} ${ch.name} ${s.name} ${s.short} ${c.summary}`.toLowerCase(),
  })))));
  return cache;
}

function score(e: Entry, q: string) {
  const title = e.title.toLowerCase();
  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  const words = q.split(/\s+/).filter(Boolean);
  if (words.every((w) => e.hay.includes(w))) return 40 - Math.min(20, e.hay.indexOf(words[0]) / 20);
  return -1;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const nav = useNavigate();
  const [q, setQ] = React.useState("");
  const [concepts, setConcepts] = React.useState<Entry[]>([]);
  const [sel, setSel] = React.useState(0);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    setQ(""); setSel(0);
    cache = null; // refresh statuses each time it opens
    loadConcepts().then(setConcepts).catch(() => {});
  }, [open]);

  const needle = q.trim().toLowerCase();
  const results = React.useMemo(() => {
    if (!needle) return [...PAGES.slice(0, 6)];
    return [...PAGES, ...concepts].map((e) => ({ e, s: score(e, needle) })).filter((x) => x.s >= 0)
      .sort((a, b) => b.s - a.s).slice(0, 40).map((x) => x.e);
  }, [needle, concepts]);

  React.useEffect(() => { setSel(0); }, [needle]);
  React.useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  if (!open) return null;
  const go = (e: Entry) => { onClose(); nav(e.to); };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-stone-900/25 p-4 pt-[12vh] backdrop-blur-[2px] animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border bg-card shadow-float animate-pop" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Search">
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search 183 concepts and pages…"
            className="h-13 flex-1 bg-transparent py-4 text-[15px] outline-none placeholder:text-muted-foreground/70"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(results.length - 1, s + 1)); }
              else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
              else if (e.key === "Enter" && results[sel]) { e.preventDefault(); go(results[sel]); }
              else if (e.key === "Escape") onClose();
            }} />
          <Kbd>Esc</Kbd>
        </div>
        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {!needle && <p className="px-2.5 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Go to</p>}
          {needle && !results.length && <p className="px-3 py-8 text-center text-sm text-muted-foreground">No concepts match “{q}”.</p>}
          {results.map((e, i) => {
            const meta = e.kind === "concept" ? subjectMeta(e.subjectId) : null;
            const Icon = e.icon ?? meta?.icon ?? ArrowRight;
            return (
              <button key={e.id} data-idx={i} onMouseMove={() => setSel(i)} onClick={() => go(e)}
                className={cn("flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left cursor-pointer", i === sel ? "bg-accent" : "hover:bg-muted")}>
                <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset [&_svg]:h-4 [&_svg]:w-4",
                  meta ? TONE[meta.tone].chip : "bg-muted text-muted-foreground ring-border")}><Icon /></span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{e.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">{e.sub}</span>
                </span>
                {e.status && e.status !== "not_started" && <StatusBadge status={e.status} />}
                {i === sel && <CornerDownLeft className="h-4 w-4 text-muted-foreground" />}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-4 border-t bg-card-soft px-4 py-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><Kbd>↑</Kbd><Kbd>↓</Kbd> move</span>
          <span className="flex items-center gap-1"><Kbd>Enter</Kbd> open</span>
          <span className="ml-auto flex items-center gap-1"><Kbd>Ctrl</Kbd><Kbd>K</Kbd> anywhere</span>
        </div>
      </div>
    </div>
  );
}
