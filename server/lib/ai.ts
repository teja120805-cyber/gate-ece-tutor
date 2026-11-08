// Optional AI integration. Keys live only in the server's environment (.env), never in the browser.
// Providers:
//   anthropic — Anthropic Messages API (ANTHROPIC_API_KEY)
//   openai    — any OpenAI-compatible Chat Completions endpoint (OpenAI, OpenRouter, Groq, Gemini's
//               OpenAI-compatible endpoint, LM Studio, ...) via OPENAI_BASE_URL + OPENAI_API_KEY
//   ollama    — local models through Ollama (free, offline)
// When nothing is configured every non-AI feature keeps working.
import { run, nowIso } from "../db.ts";
import type { AIStatus } from "../../shared/types.ts";

export interface ChatMsg { role: "user" | "assistant"; content: string }
interface ChatOpts { system: string; maxTokens?: number; json?: boolean; purpose: string; temperature?: number }

type Provider = "anthropic" | "openai" | "ollama" | "none";

function config() {
  const env = process.env;
  let provider = (env.AI_PROVIDER ?? "").trim().toLowerCase() as Provider;
  if (!provider) provider = env.ANTHROPIC_API_KEY ? "anthropic" : env.OPENAI_API_KEY ? "openai" : "none";
  switch (provider) {
    case "anthropic":
      return { provider, key: env.ANTHROPIC_API_KEY ?? "", model: env.ANTHROPIC_MODEL || "claude-haiku-5-5", base: "https://api.anthropic.com" };
    case "openai":
      return { provider, key: env.OPENAI_API_KEY ?? "", model: env.OPENAI_MODEL || "", base: (env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "") };
    case "ollama":
      return { provider, key: "", model: env.OLLAMA_MODEL || "qwen3:8b", base: (env.OLLAMA_BASE_URL || "http://localhost:11434").replace(/\/$/, "") };
    default:
      return { provider: "none" as Provider, key: "", model: null as string | null, base: "" };
  }
}

export class AIError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

let cachedReach: { at: number; ok: boolean; msg: string } | null = null;

export async function aiStatus(probe = false): Promise<AIStatus> {
  const c = config();
  if (c.provider === "none") {
    return { configured: false, provider: "none", model: null, reachable: null,
      message: "No AI provider configured. Lessons, questions, tests and progress tracking all work offline. Add a key to .env to enable the AI tutor and content generation." };
  }
  if ((c.provider === "anthropic" || c.provider === "openai") && !c.key) {
    return { configured: false, provider: c.provider, model: c.model, reachable: null,
      message: `AI_PROVIDER is "${c.provider}" but its API key is missing in .env.` };
  }
  if (!c.model) {
    return { configured: false, provider: c.provider, model: null, reachable: null, message: "Set OPENAI_MODEL in .env (the model name your provider expects)." };
  }
  let reachable: boolean | null = null, message = `Using ${c.provider} (${c.model}).`;
  if (c.provider === "ollama" && (probe || !cachedReach || Date.now() - cachedReach.at > 60_000)) {
    try {
      const r = await fetch(`${c.base}/api/tags`, { signal: AbortSignal.timeout(2500) });
      const j = (await r.json()) as { models?: { name: string }[] };
      const has = j.models?.some((m) => m.name === c.model || m.name.startsWith(c.model + ":")) ?? false;
      cachedReach = { at: Date.now(), ok: has, msg: has ? `Ollama is running with ${c.model}.` : `Ollama is running but model "${c.model}" is not pulled. Run: ollama pull ${c.model}` };
    } catch {
      cachedReach = { at: Date.now(), ok: false, msg: `Cannot reach Ollama at ${c.base}. Start Ollama, or change AI_PROVIDER in .env.` };
    }
  }
  if (c.provider === "ollama" && cachedReach) { reachable = cachedReach.ok; message = cachedReach.msg; }
  return { configured: true, provider: c.provider, model: c.model, reachable, message };
}

function logUsage(provider: string, model: string, purpose: string, input?: number, output?: number) {
  try {
    run("INSERT INTO ai_usage(provider, model, purpose, input_tokens, output_tokens, created_at) VALUES(?,?,?,?,?,?)",
      provider, model, purpose, input ?? null, output ?? null, nowIso());
  } catch { /* usage logging must never break a request */ }
}

export async function chat(messages: ChatMsg[], opts: ChatOpts): Promise<string> {
  const c = config();
  if (c.provider === "none" || !c.model || ((c.provider === "anthropic" || c.provider === "openai") && !c.key)) {
    throw new AIError(503, "AI is not configured. Add an API key (or Ollama settings) to .env and restart.");
  }
  const maxTokens = opts.maxTokens ?? 2000;
  const timeout = AbortSignal.timeout(c.provider === "ollama" ? 300_000 : 120_000);
  try {
    if (c.provider === "anthropic") {
      const r = await fetch(`${c.base}/v1/messages`, {
        method: "POST", signal: timeout,
        headers: { "content-type": "application/json", "x-api-key": c.key, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: c.model, max_tokens: maxTokens, system: opts.system, messages }),
      });
      const j = (await r.json()) as any;
      if (!r.ok) throw new AIError(502, `Anthropic API error (${r.status}): ${j?.error?.message ?? "unknown error"}`);
      logUsage(c.provider, c.model!, opts.purpose, j.usage?.input_tokens, j.usage?.output_tokens);
      return (j.content ?? []).filter((b: any) => b.type === "text").map((b: any) => b.text).join("");
    }
    if (c.provider === "openai") {
      const body: any = { model: c.model, max_tokens: maxTokens, messages: [{ role: "system", content: opts.system }, ...messages] };
      if (opts.temperature !== undefined) body.temperature = opts.temperature;
      const r = await fetch(`${c.base}/chat/completions`, {
        method: "POST", signal: timeout,
        headers: { "content-type": "application/json", authorization: `Bearer ${c.key}` },
        body: JSON.stringify(body),
      });
      const j = (await r.json()) as any;
      if (!r.ok) throw new AIError(502, `AI API error (${r.status}): ${j?.error?.message ?? JSON.stringify(j).slice(0, 200)}`);
      logUsage(c.provider, c.model!, opts.purpose, j.usage?.prompt_tokens, j.usage?.completion_tokens);
      return j.choices?.[0]?.message?.content ?? "";
    }
    // ollama
    const r = await fetch(`${c.base}/api/chat`, {
      method: "POST", signal: timeout, headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: c.model, stream: false, ...(opts.json ? { format: "json" } : {}),
        options: { num_predict: maxTokens, temperature: opts.temperature ?? 0.4 },
        messages: [{ role: "system", content: opts.system }, ...messages],
      }),
    });
    const j = (await r.json()) as any;
    if (!r.ok) throw new AIError(502, `Ollama error (${r.status}): ${j?.error ?? "unknown error"}`);
    logUsage(c.provider, c.model!, opts.purpose, j.prompt_eval_count, j.eval_count);
    // Some local reasoning models wrap their thinking in <think> tags — strip it.
    return String(j.message?.content ?? "").replace(/<think>[\s\S]*?<\/think>/g, "").trim();
  } catch (e) {
    if (e instanceof AIError) throw e;
    const msg = (e as Error).name === "TimeoutError" ? "The AI request timed out." : `Could not reach the AI provider: ${(e as Error).message}`;
    throw new AIError(502, msg);
  }
}

/** Extract the first JSON value from a model reply (tolerates ```json fences and stray prose). */
export function extractJson(text: string): unknown {
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = (fence ? fence[1] : text).trim();
  try { return JSON.parse(body); } catch { /* fall through */ }
  const start = body.search(/[\[{]/);
  if (start >= 0) {
    for (let end = body.length; end > start; end--) {
      const ch = body[end - 1];
      if (ch !== "]" && ch !== "}") continue;
      try { return JSON.parse(body.slice(start, end)); } catch { /* keep shrinking */ }
    }
  }
  throw new AIError(502, "The AI reply was not valid JSON. Try again (smaller local models sometimes struggle with structured output).");
}
