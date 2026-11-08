// Markdown + LaTeX renderer. A fenced block ```widget <name>``` embeds an interactive visual.
// With `anchors`, every ## / ### heading gets an id from its source line (sec-<line>), matching lessonHeadings().
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import katex from "katex";
import { ConvolutionWidget } from "./widgets/ConvolutionWidget";
import { SignalTransformWidget } from "./widgets/SignalTransformWidget";
import { cn } from "@/lib/utils";

const WIDGETS: Record<string, () => React.ReactElement> = {
  convolution: () => <ConvolutionWidget />,
  "signal-transform": () => <SignalTransformWidget />,
};

export function Markdown({ children, className, compact, anchors }: { children: string; className?: string; compact?: boolean; anchors?: boolean }) {
  return (
    <div className={cn(compact ? "prose-compact" : "prose-lesson", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: false }]]}
        components={{
          h2: ({ node, children: kids }) => <h2 id={anchors ? `sec-${node?.position?.start.line}` : undefined}>{kids}</h2>,
          h3: ({ node, children: kids }) => <h3 id={anchors ? `sec-${node?.position?.start.line}` : undefined}>{kids}</h3>,
          code({ className: cls, children: kids, ...rest }) {
            const lang = /language-(\S+)/.exec(cls ?? "")?.[1];
            if (lang === "widget") {
              const name = String(kids).trim();
              const W = WIDGETS[name];
              return W ? <W /> : <span className="text-danger">Unknown widget “{name}”</span>;
            }
            return <code className={cls} {...rest}>{kids}</code>;
          },
          pre({ children: kids }) {
            // Let widgets render without the <pre> wrapper.
            const child: any = Array.isArray(kids) ? kids[0] : kids;
            if (child?.props?.className?.includes("language-widget")) return <>{kids}</>;
            return <pre>{kids}</pre>;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

/** ## and ### headings of a lesson in document order (code fences skipped); ids match <Markdown anchors>. */
export function lessonHeadings(md: string) {
  const out: { id: string; level: 2 | 3; text: string }[] = [];
  let fence = false;
  md.split("\n").forEach((line, li) => {
    if (/^\s*```/.test(line)) { fence = !fence; return; }
    if (fence) return;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) return;
    const text = m[2].replace(/\$([^$]*)\$/g, (_s, t: string) => t.replace(/\\[a-zA-Z]+/g, (c) => GREEK[c] ?? "").replace(/[{}^_\\]/g, ""))
      .replace(/[*_`]/g, "").trim();
    out.push({ id: `sec-${li + 1}`, level: m[1].length as 2 | 3, text });
  });
  return out;
}
const GREEK: Record<string, string> = { "\\omega": "ω", "\\Omega": "Ω", "\\alpha": "α", "\\beta": "β", "\\theta": "θ", "\\phi": "φ", "\\pi": "π", "\\sigma": "σ", "\\tau": "τ", "\\lambda": "λ", "\\mu": "μ", "\\delta": "δ", "\\Delta": "Δ", "\\epsilon": "ε", "\\zeta": "ζ", "\\gamma": "γ" };

/** Render a bare LaTeX expression (formula cards). */
export function TeX({ latex, display = true, className }: { latex: string; display?: boolean; className?: string }) {
  const html = katex.renderToString(latex, { displayMode: display, throwOnError: false, strict: false });
  return <span className={cn(display && "block overflow-x-auto", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
