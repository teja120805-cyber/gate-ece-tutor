// AI tutor chat for a concept (Learning mode only).
import * as React from "react";
import { Link } from "react-router-dom";
import { Send, Trash2, Bot, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { useApp } from "@/lib/app";
import { Markdown } from "./Markdown";
import { Button, Textarea, ErrorBox, Empty, IconChip } from "./ui";

interface Msg { role: "user" | "assistant"; content: string }

export function TutorPanel({ conceptId, conceptName, seed, onSeedUsed }: {
  conceptId: string; conceptName: string; seed?: { text: string; questionId?: string } | null; onSeedUsed?: () => void;
}) {
  const { ai } = useApp();
  const [msgs, setMsgs] = React.useState<Msg[]>([]);
  const [text, setText] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<unknown>(null);
  const [questionId, setQuestionId] = React.useState<string | undefined>();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    api.get<Msg[]>(`/ai/history/${conceptId}`).then(setMsgs).catch(() => {});
  }, [conceptId]);
  React.useEffect(() => { if (seed) { setText(seed.text); setQuestionId(seed.questionId); onSeedUsed?.(); inputRef.current?.focus(); } }, [seed]); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => { const el = scrollRef.current; if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }); }, [msgs, busy]);

  if (!ai?.configured) {
    return (
      <Empty icon={<Bot />} title="The AI tutor needs an AI connection">
        <p>{ai?.message ?? "No AI provider configured."} Everything else — lessons, practice, tests and progress — works without it.</p>
        <Link to="/settings" className="mt-3 inline-block font-medium text-primary hover:underline">How to connect an AI provider →</Link>
      </Empty>
    );
  }

  const send = async (override?: string) => {
    const m = (override ?? text).trim();
    if (!m || busy) return;
    setBusy(true); setErr(null);
    setMsgs((x) => [...x, { role: "user", content: m }]);
    setText("");
    try {
      const r = await api.post<{ reply: string }>("/ai/tutor", { conceptId, message: m, questionId });
      setMsgs((x) => [...x, { role: "assistant", content: r.reply }]);
      setQuestionId(undefined);
    } catch (e) { setErr(e); setMsgs((x) => x.slice(0, -1)); setText(m); }
    finally { setBusy(false); }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card">
      <div className="flex items-center justify-between gap-3 border-b bg-card-soft px-4 py-3 text-sm">
        <span className="flex min-w-0 items-center gap-2.5">
          <IconChip icon={Sparkles} tone="violet" size="sm" />
          <span className="min-w-0"><span className="block truncate font-semibold">AI tutor · {conceptName}</span><span className="block text-xs text-muted-foreground">{ai.provider} · {ai.model}</span></span>
        </span>
        {msgs.length > 0 && (
          <Button size="sm" variant="ghost" title="Clear conversation" onClick={async () => { await api.del(`/ai/history/${conceptId}`); setMsgs([]); }}>
            <Trash2 className="h-4 w-4" />Clear
          </Button>
        )}
      </div>
      <div ref={scrollRef} className="max-h-[58vh] min-h-64 space-y-4 overflow-y-auto p-4 md:p-5">
        {!msgs.length && (
          <div className="py-4 text-center text-sm text-muted-foreground">
            <p>Ask anything about <b className="text-foreground">{conceptName}</b>. Try one of these:</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {["Explain the intuition in simpler words", "Give me a GATE-style example and solve it step by step", "What are the common mistakes here?", "Give me only a hint for the last question I got wrong"].map((s) => (
                <button key={s} onClick={() => send(s)} className="rounded-full border border-border-strong/60 bg-card px-3 py-1.5 text-xs transition hover:border-primary/40 hover:bg-accent/40 hover:text-foreground cursor-pointer">{s}</button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m, i) => m.role === "user" ? (
          <div key={i} className="flex justify-end animate-fade-in">
            <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-sm">{m.content}</p>
          </div>
        ) : (
          <div key={i} className="flex gap-3 animate-fade-in">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300"><Bot className="h-4 w-4" /></span>
            <div className="min-w-0 max-w-[90%] rounded-2xl rounded-tl-md border border-border/80 bg-card-soft px-4 py-3"><Markdown compact>{m.content}</Markdown></div>
          </div>
        ))}
        {busy && (
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300"><Bot className="h-4 w-4" /></span>
            <span className="flex gap-1 rounded-2xl border border-border/80 bg-card-soft px-4 py-3">
              {[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: `${d * 0.15}s` }} />)}
            </span>
          </div>
        )}
      </div>
      {err != null && <div className="px-4 pb-2"><ErrorBox error={err} /></div>}
      <div className="border-t bg-card-soft p-3">
        <div className="flex items-end gap-2 rounded-xl border border-border-strong/60 bg-card p-1.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/12">
          <Textarea ref={inputRef} rows={2} value={text} placeholder={questionId ? "Ask about the question you just answered…" : "Ask the tutor… (Enter to send, Shift+Enter for a new line)"}
            onChange={(e) => setText(e.target.value)} className="resize-none border-0 shadow-none focus:ring-0"
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
          <Button onClick={() => send()} loading={busy} disabled={!text.trim()} size="icon" aria-label="Send"><Send className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}
