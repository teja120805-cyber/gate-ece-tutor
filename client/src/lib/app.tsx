// App-wide state: study mode (Learning/Exam), theme, exam date, AI status, toasts, plus a small data-loading hook.
import * as React from "react";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { api } from "./api";
import { cn } from "./utils";
import type { AIStatus, StudyMode } from "@shared/types";

export type Theme = "system" | "light" | "dark";
export interface Prefs { mode: StudyMode; dailyGoalMinutes: number; theme: Theme; examDate: string | null }
type ToastKind = "success" | "info" | "error";
interface AppCtx {
  prefs: Prefs;
  setPrefs: (p: Partial<Prefs>) => Promise<void>;
  ai: AIStatus | null;
  refreshAi: (probe?: boolean) => Promise<void>;
  toast: (text: string, kind?: ToastKind) => void;
}

const Ctx = React.createContext<AppCtx | null>(null);

function applyTheme(t: Theme) {
  const dark = t === "dark" || (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  try { localStorage.setItem("theme", t); } catch { /* ignore */ }
}

function initialTheme(): Theme {
  try { const t = localStorage.getItem("theme"); if (t === "light" || t === "dark" || t === "system") return t; } catch { /* ignore */ }
  return "light";
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setP] = React.useState<Prefs>({ mode: "learning", dailyGoalMinutes: 120, theme: initialTheme(), examDate: null });
  const [ai, setAi] = React.useState<AIStatus | null>(null);
  const [toasts, setToasts] = React.useState<{ id: number; text: string; kind: ToastKind }[]>([]);

  React.useEffect(() => {
    api.get<Prefs>("/settings").then((p) => { setP(p); applyTheme(p.theme); }).catch(() => {});
    api.get<AIStatus>("/ai/status").then(setAi).catch(() => {});
  }, []);
  // Follow the OS when the theme is "system".
  React.useEffect(() => {
    if (prefs.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const f = () => applyTheme("system");
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, [prefs.theme]);

  const setPrefs = React.useCallback(async (p: Partial<Prefs>) => {
    setP((old) => ({ ...old, ...p }));
    if (p.theme) applyTheme(p.theme);
    const saved = await api.put<Prefs>("/settings", p);
    setP(saved);
  }, []);
  const refreshAi = React.useCallback(async (probe = false) => {
    setAi(await api.get<AIStatus>(`/ai/status${probe ? "?probe=1" : ""}`));
  }, []);
  const toast = React.useCallback((text: string, kind: ToastKind = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-3), { id, text, kind }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  return (
    <Ctx.Provider value={{ prefs, setPrefs, ai, refreshAi, toast }}>
      {children}
      <div className="no-print pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2" aria-live="polite">
        {toasts.map((t) => {
          const Icon = t.kind === "success" ? CheckCircle2 : t.kind === "error" ? XCircle : Info;
          return (
            <div key={t.id} className="pointer-events-auto flex max-w-sm items-center gap-2.5 rounded-xl border bg-card px-3.5 py-2.5 text-sm shadow-float animate-pop">
              <Icon className={cn("h-4 w-4 shrink-0", t.kind === "success" ? "text-success" : t.kind === "error" ? "text-danger" : "text-primary")} />
              {t.text}
            </div>
          );
        })}
      </div>
    </Ctx.Provider>
  );
}

export function useApp() {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("useApp outside AppProvider");
  return c;
}

/** Load data from the API; returns { data, error, loading, reload }. */
export function useLoad<T>(url: string | null, deps: React.DependencyList = []) {
  const [state, setState] = React.useState<{ data: T | null; error: unknown; loading: boolean }>({ data: null, error: null, loading: !!url });
  const reload = React.useCallback(async () => {
    if (!url) return;
    setState((s) => ({ ...s, loading: true, error: null }));
    try { const data = await api.get<T>(url); setState({ data, error: null, loading: false }); }
    catch (error) { setState((s) => ({ ...s, error, loading: false })); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]);
  React.useEffect(() => { reload(); }, [reload]);
  return { ...state, reload, setData: (d: T) => setState((s) => ({ ...s, data: d })) };
}

/** Counts active study time: posts a heartbeat every 30 s while the tab is visible and the learner is active. */
export function useStudyHeartbeat() {
  React.useEffect(() => {
    let lastActivity = Date.now();
    const mark = () => { lastActivity = Date.now(); };
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((e) => window.addEventListener(e, mark, { passive: true }));
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible" && Date.now() - lastActivity < 3 * 60_000) {
        api.post("/stats/heartbeat", { seconds: 30 }).catch(() => {});
      }
    }, 30_000);
    return () => { window.clearInterval(id); events.forEach((e) => window.removeEventListener(e, mark)); };
  }, []);
}

/** True when the user is typing in a field (so single-key shortcuts should be ignored). */
export function isTypingTarget(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null;
  if (!t) return false;
  const tag = t.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t.isContentEditable;
}
