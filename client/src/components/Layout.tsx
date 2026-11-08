import * as React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, Grid3x3, Repeat, ClipboardList, BarChart3, NotebookPen, Settings, GraduationCap, Timer, Moon, Sun, Bot, Menu, X, Search, Flame, CalendarClock } from "lucide-react";
import { useApp, isTypingTarget } from "@/lib/app";
import { api } from "@/lib/api";
import { cn, daysUntil } from "@/lib/utils";
import { Kbd, Ring } from "./ui";
import { CommandPalette } from "./CommandPalette";

interface Shell { streak: { current: number; activeToday: boolean }; today: { study_seconds: number }; dueCount: number; activeTest: { id: number; title: string } | null }

const NAV: { group: string; items: { to: string; label: string; icon: React.ComponentType<{ className?: string }>; end?: boolean; badge?: "due" }[] }[] = [
  { group: "Learn", items: [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/syllabus", label: "Syllabus & lessons", icon: BookOpen },
    { to: "/mastery", label: "Mastery map", icon: Grid3x3 },
    { to: "/revision", label: "Revision", icon: Repeat, badge: "due" },
  ] },
  { group: "Practice", items: [{ to: "/tests", label: "Exam mode · tests", icon: ClipboardList }] },
  { group: "Track", items: [
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/notebook", label: "Notebook", icon: NotebookPen },
  ] },
];

/** The app mark: an indigo tile with a white signal trace (same as the .exe icon and favicon). */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6366f1" /><stop offset="1" stopColor="#4f46e5" /></linearGradient></defs>
      <rect width="32" height="32" rx="8" fill="url(#lg)" />
      <path d="M7 20 L12 12 L17 20 L22 9 L25 14" stroke="white" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ModeSwitch({ compact }: { compact?: boolean }) {
  const { prefs, setPrefs } = useApp();
  const nav = useNavigate();
  return (
    <div className="inline-flex rounded-xl border border-border/80 bg-muted/70 p-1 text-[13px]" role="radiogroup" aria-label="Study mode">
      {(["learning", "exam"] as const).map((m) => (
        <button key={m} role="radio" aria-checked={prefs.mode === m}
          onClick={() => { setPrefs({ mode: m }); if (m === "exam" && !compact) nav("/tests"); }}
          className={cn("flex items-center gap-1.5 rounded-lg px-3 py-1 font-medium transition-all cursor-pointer",
            prefs.mode === m
              ? m === "exam" ? "bg-rose-600 text-white shadow-sm" : "bg-card text-foreground shadow-card ring-1 ring-border/80"
              : "text-muted-foreground hover:text-foreground")}>
          {m === "learning" ? <GraduationCap className="h-4 w-4" /> : <Timer className="h-4 w-4" />}
          <span className={compact ? "" : "hidden sm:inline"}>{m === "learning" ? "Learning" : "Exam"}</span>
        </button>
      ))}
    </div>
  );
}

function ThemeButton() {
  const { prefs, setPrefs } = useApp();
  const dark = document.documentElement.classList.contains("dark");
  return (
    <button title={dark ? "Switch to light theme" : "Switch to dark theme"} onClick={() => setPrefs({ theme: dark ? "light" : "dark" })}
      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer" aria-label="Toggle theme" data-theme={prefs.theme}>
      {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}

export function Layout() {
  const { prefs, ai } = useApp();
  const loc = useLocation();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [shell, setShell] = React.useState<Shell | null>(null);

  // Light summary for the sidebar (due reviews, today's minutes, streak); refreshed on navigation.
  React.useEffect(() => { api.get<Shell>("/overview").then(setShell).catch(() => {}); }, [loc.pathname]);
  React.useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [loc.pathname]);
  React.useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(true); }
      else if (e.key === "/" && !isTypingTarget(e)) { e.preventDefault(); setSearch(true); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const minutes = Math.round((shell?.today.study_seconds ?? 0) / 60);
  const goalPct = (minutes / Math.max(1, prefs.dailyGoalMinutes)) * 100;
  const examIn = prefs.examDate ? daysUntil(prefs.examDate) : null;

  return (
    <div className="flex min-h-screen">
      <aside className={cn("no-print fixed inset-y-0 left-0 z-40 flex w-[264px] shrink-0 flex-col border-r border-border/80 bg-card/85 backdrop-blur-xl transition-transform duration-200 md:sticky md:top-0 md:h-screen md:translate-x-0",
        open ? "translate-x-0 shadow-float" : "-translate-x-full")}>
        <div className="flex h-16 items-center gap-2.5 px-5">
          <Logo className="h-9 w-9 drop-shadow-sm" />
          <div className="leading-tight">
            <p className="text-[15px] font-semibold tracking-tight">GATE ECE Tutor</p>
            <p className="text-[11px] text-muted-foreground">Electronics &amp; Communication</p>
          </div>
          <button className="ml-auto rounded-md p-1 md:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4 pt-2">
          {NAV.map((g) => (
            <div key={g.group}>
              <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">{g.group}</p>
              <div className="space-y-0.5">
                {g.items.map((n) => (
                  <NavLink key={n.to} to={n.to} end={n.end}
                    className={({ isActive }) => cn("group flex items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] font-medium transition-colors",
                      isActive ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:bg-muted hover:text-foreground")}>
                    {({ isActive }) => (<>
                      <n.icon className={cn("h-[18px] w-[18px]", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                      <span className="flex-1">{n.label}</span>
                      {n.badge === "due" && !!shell?.dueCount && (
                        <span className="rounded-full bg-primary px-1.5 py-px text-[10px] font-semibold tabular-nums text-primary-foreground">{shell.dueCount}</span>
                      )}
                    </>)}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="space-y-2 border-t border-border/80 p-3">
          <NavLink to="/" className="flex items-center gap-3 rounded-xl bg-card-soft p-3 ring-1 ring-border/70 hover:ring-border-strong">
            <Ring value={goalPct} size={44} stroke={5} label={`${minutes} of ${prefs.dailyGoalMinutes} minutes today`}>
              <span className="text-[11px] font-semibold tabular-nums">{Math.min(999, Math.round(goalPct))}%</span>
            </Ring>
            <div className="min-w-0 text-xs">
              <p className="font-semibold text-foreground">Today · {minutes} min</p>
              <p className="text-muted-foreground">Goal {prefs.dailyGoalMinutes} min</p>
              <p className="mt-0.5 flex items-center gap-1 text-muted-foreground">
                <Flame className={cn("h-3.5 w-3.5", shell?.streak.activeToday ? "text-orange-500" : "text-muted-foreground")} />
                {shell?.streak.current ?? 0}-day streak
              </p>
            </div>
          </NavLink>
          <div className="flex items-center gap-1">
            <NavLink to="/settings" className={({ isActive }) => cn("flex flex-1 items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium",
              isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
              <Settings className="h-4 w-4" />Settings &amp; data
            </NavLink>
            <NavLink to="/settings" title={ai?.message ?? "AI status"} className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs text-muted-foreground hover:bg-muted">
              <Bot className="h-4 w-4" />
              <span className={cn("h-2 w-2 rounded-full", ai?.configured && ai.reachable !== false ? "bg-emerald-500" : "bg-stone-300 dark:bg-stone-600")} />
              {ai?.configured ? "AI" : "Offline"}
            </NavLink>
          </div>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-stone-900/30 backdrop-blur-[1px] md:hidden" onClick={() => setOpen(false)} />}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className={cn("no-print sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border/70 bg-background/75 px-4 backdrop-blur-xl md:px-6",
          prefs.mode === "exam" && "border-b-rose-300/70 dark:border-b-rose-500/40")}>
          <button className="rounded-lg p-1.5 hover:bg-muted md:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
          <button onClick={() => setSearch(true)}
            aria-label="Search concepts" className="flex h-9 items-center gap-2.5 rounded-xl border border-border-strong/60 bg-card px-2.5 text-sm text-muted-foreground shadow-card transition hover:border-border-strong sm:min-w-0 sm:max-w-sm sm:flex-1 sm:px-3 cursor-pointer">
            <Search className="h-4 w-4 shrink-0" /><span className="hidden truncate sm:inline">Search concepts…</span>
            <span className="ml-auto hidden items-center gap-1 sm:flex"><Kbd>Ctrl</Kbd><Kbd>K</Kbd></span>
          </button>
          <div className="ml-auto flex items-center gap-2">
            {examIn != null && examIn >= 0 && (
              <NavLink to="/settings" title="Days left until your exam (change in Settings)"
                className="hidden items-center gap-1.5 rounded-xl border border-border/80 bg-card px-2.5 py-1.5 text-xs font-medium shadow-card lg:flex">
                <CalendarClock className="h-4 w-4 text-primary" />
                {examIn === 0 ? "Exam day — good luck!" : <><b className="tabular-nums">{examIn}</b> day{examIn === 1 ? "" : "s"} to GATE</>}
              </NavLink>
            )}
            <ModeSwitch />
            <ThemeButton />
          </div>
        </header>
        {prefs.mode === "exam" && (
          <div className="no-print border-b border-rose-200/70 bg-rose-50/80 px-4 py-1.5 text-center text-xs text-rose-800 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200 md:px-6">
            Exam mode: timed, no hints, no AI tutor, GATE marking applied.
          </div>
        )}
        <main key={loc.pathname} className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6 animate-fade-in md:px-8 md:py-8"><Outlet /></main>
      </div>
      <CommandPalette open={search} onClose={() => setSearch(false)} />
    </div>
  );
}
