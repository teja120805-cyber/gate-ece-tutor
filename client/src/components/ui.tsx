// Shared UI primitives (Tailwind + class-variance-authority). Soft light theme by default.
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ───────────── Buttons ─────────────
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_1px_2px_rgb(79_70_229/0.25),inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-primary-strong",
        outline: "border border-border-strong/70 bg-card text-foreground shadow-card hover:bg-muted hover:border-border-strong",
        ghost: "text-foreground/80 hover:bg-muted hover:text-foreground",
        secondary: "bg-accent text-accent-foreground hover:bg-accent/70",
        danger: "bg-danger text-white shadow-sm hover:opacity-90 dark:text-black",
        success: "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400",
        link: "h-auto px-0 text-primary underline-offset-4 hover:underline",
      },
      size: { default: "h-9 px-4", sm: "h-8 px-3 text-xs", lg: "h-11 px-6 text-[15px]", icon: "h-9 w-9", "icon-sm": "h-8 w-8" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, loading, children, disabled, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} disabled={disabled || loading} {...props}>
    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
    {children}
  </button>
));
Button.displayName = "Button";

// ───────────── Cards ─────────────
export function Card({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-border/80 bg-card shadow-card", className)} {...p} />;
}
export function CardHeader({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 p-5 pb-3", className)} {...p} />;
}
export function CardTitle({ className, ...p }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("flex items-center gap-2 text-[15px] font-semibold leading-tight tracking-tight", className)} {...p} />;
}
export function CardDescription({ className, ...p }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-[13px] text-muted-foreground", className)} {...p} />;
}
export function CardContent({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-0", className)} {...p} />;
}

// ───────────── Tones (decorative colour families for icon chips and badges) ─────────────
export type Tone = "indigo" | "violet" | "sky" | "blue" | "cyan" | "teal" | "emerald" | "amber" | "orange" | "rose" | "fuchsia" | "slate";
export const TONE: Record<Tone, { chip: string; text: string; soft: string; solid: string }> = {
  indigo: { chip: "bg-indigo-50 text-indigo-600 ring-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-300 dark:ring-indigo-500/20", text: "text-indigo-600 dark:text-indigo-300", soft: "bg-indigo-50 dark:bg-indigo-500/10", solid: "bg-indigo-500" },
  violet: { chip: "bg-violet-50 text-violet-600 ring-violet-100 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-500/20", text: "text-violet-600 dark:text-violet-300", soft: "bg-violet-50 dark:bg-violet-500/10", solid: "bg-violet-500" },
  sky: { chip: "bg-sky-50 text-sky-600 ring-sky-100 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-500/20", text: "text-sky-600 dark:text-sky-300", soft: "bg-sky-50 dark:bg-sky-500/10", solid: "bg-sky-500" },
  blue: { chip: "bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/20", text: "text-blue-600 dark:text-blue-300", soft: "bg-blue-50 dark:bg-blue-500/10", solid: "bg-blue-500" },
  cyan: { chip: "bg-cyan-50 text-cyan-700 ring-cyan-100 dark:bg-cyan-500/15 dark:text-cyan-300 dark:ring-cyan-500/20", text: "text-cyan-700 dark:text-cyan-300", soft: "bg-cyan-50 dark:bg-cyan-500/10", solid: "bg-cyan-500" },
  teal: { chip: "bg-teal-50 text-teal-700 ring-teal-100 dark:bg-teal-500/15 dark:text-teal-300 dark:ring-teal-500/20", text: "text-teal-700 dark:text-teal-300", soft: "bg-teal-50 dark:bg-teal-500/10", solid: "bg-teal-500" },
  emerald: { chip: "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/20", text: "text-emerald-700 dark:text-emerald-300", soft: "bg-emerald-50 dark:bg-emerald-500/10", solid: "bg-emerald-500" },
  amber: { chip: "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/20", text: "text-amber-700 dark:text-amber-300", soft: "bg-amber-50 dark:bg-amber-500/10", solid: "bg-amber-500" },
  orange: { chip: "bg-orange-50 text-orange-600 ring-orange-100 dark:bg-orange-500/15 dark:text-orange-300 dark:ring-orange-500/20", text: "text-orange-600 dark:text-orange-300", soft: "bg-orange-50 dark:bg-orange-500/10", solid: "bg-orange-500" },
  rose: { chip: "bg-rose-50 text-rose-600 ring-rose-100 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-500/20", text: "text-rose-600 dark:text-rose-300", soft: "bg-rose-50 dark:bg-rose-500/10", solid: "bg-rose-500" },
  fuchsia: { chip: "bg-fuchsia-50 text-fuchsia-600 ring-fuchsia-100 dark:bg-fuchsia-500/15 dark:text-fuchsia-300 dark:ring-fuchsia-500/20", text: "text-fuchsia-600 dark:text-fuchsia-300", soft: "bg-fuchsia-50 dark:bg-fuchsia-500/10", solid: "bg-fuchsia-500" },
  slate: { chip: "bg-stone-100 text-stone-600 ring-stone-200 dark:bg-stone-500/15 dark:text-stone-300 dark:ring-stone-500/20", text: "text-stone-600 dark:text-stone-300", soft: "bg-stone-100 dark:bg-stone-500/10", solid: "bg-stone-500" },
};

/** A rounded, tinted square holding an icon. */
export function IconChip({ icon: Icon, tone = "indigo", size = "md", className }: {
  icon: React.ComponentType<{ className?: string }>; tone?: Tone; size?: "sm" | "md" | "lg"; className?: string;
}) {
  const s = size === "sm" ? "h-7 w-7 rounded-lg [&_svg]:h-3.5 [&_svg]:w-3.5" : size === "lg" ? "h-12 w-12 rounded-2xl [&_svg]:h-6 [&_svg]:w-6" : "h-9 w-9 rounded-xl [&_svg]:h-[18px] [&_svg]:w-[18px]";
  return <span className={cn("inline-flex shrink-0 items-center justify-center ring-1 ring-inset", s, TONE[tone].chip, className)}><Icon /></span>;
}

export function Badge({ className, tone, ...p }: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-4",
      tone ? cn("border-transparent ring-1 ring-inset", TONE[tone].chip) : "border-border bg-card text-muted-foreground", className)} {...p} />
  );
}

// ───────────── Progress ─────────────
export function Progress({ value, className, barClassName }: { value: number; className?: string; barClassName?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)} role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
      <div className={cn("h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-500 dark:from-indigo-400 dark:to-violet-400", barClassName)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

/** Circular progress ring. `value` is 0–100. Children render in the middle. */
export function Ring({ value, size = 64, stroke = 7, className, color = "var(--primary)", track = "var(--muted)", children, label }: {
  value: number; size?: number; stroke?: number; className?: string; color?: string; track?: string; children?: React.ReactNode; label?: string;
}) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("relative inline-flex shrink-0 items-center justify-center", className)} style={{ width: size, height: size }} role="img" aria-label={label ?? `${Math.round(v)}%`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">{children}</div>
    </div>
  );
}

// ───────────── Form controls ─────────────
const field = "w-full rounded-lg border border-border-strong/70 bg-card text-sm shadow-[inset_0_1px_1px_rgb(74_56_28/0.04)] outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/12 disabled:opacity-60";
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...p }, ref) => (
  <input ref={ref} className={cn(field, "h-9 px-3", className)} {...p} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...p }, ref) => (
  <textarea ref={ref} className={cn(field, "px-3 py-2", className)} {...p} />
));
Textarea.displayName = "Textarea";

export function Select({ className, ...p }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(field, "h-9 w-auto cursor-pointer px-2.5 pr-8", className)} {...p} />;
}

export function Field({ label, hint, children, className }: { label: React.ReactNode; hint?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block text-sm", className)}>
      <span className="mb-1.5 block text-[13px] font-medium text-foreground/90">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

// ───────────── Tabs ─────────────
/** Segmented pill tabs (default) or an underline strip. */
export function Tabs<T extends string>({ value, onChange, items, className, variant = "pill", size = "md" }: {
  value: T; onChange: (v: T) => void; items: { value: T; label: React.ReactNode; hidden?: boolean; count?: number }[];
  className?: string; variant?: "pill" | "underline"; size?: "sm" | "md";
}) {
  const shown = items.filter((i) => !i.hidden);
  if (variant === "underline") {
    return (
      <div className={cn("flex gap-1 overflow-x-auto border-b", className)} role="tablist">
        {shown.map((i) => (
          <button key={i.value} role="tab" aria-selected={value === i.value} onClick={() => onChange(i.value)}
            className={cn("-mb-px flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
              value === i.value ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>
            {i.label}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className={cn("max-w-full overflow-x-auto", className)}>
      <div className="inline-flex gap-0.5 rounded-xl border border-border/80 bg-muted/70 p-1" role="tablist">
        {shown.map((i) => (
          <button key={i.value} role="tab" aria-selected={value === i.value} onClick={() => onChange(i.value)}
            className={cn("flex items-center gap-1.5 whitespace-nowrap rounded-lg font-medium transition-all cursor-pointer [&_svg]:h-4 [&_svg]:w-4",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-[13px]",
              value === i.value ? "bg-card text-foreground shadow-card ring-1 ring-border/80" : "text-muted-foreground hover:text-foreground")}>
            {i.label}
            {i.count != null && <span className={cn("rounded-full px-1.5 text-[10px] tabular-nums", value === i.value ? "bg-accent text-accent-foreground" : "bg-card/70")}>{i.count}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ───────────── Feedback ─────────────
export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn("h-5 w-5 animate-spin text-muted-foreground", className)} />;
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-muted", className)} />;
}

export function PageLoader() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-4 w-96 max-w-full" />
      <div className="grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-4">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}</div>
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  );
}

export function ErrorBox({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const msg = error instanceof Error ? error.message : String(error);
  return (
    <div className="flex gap-3 rounded-2xl border border-danger/30 bg-danger/5 p-4 text-sm">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
      <div>
        <p className="font-medium text-danger">Something went wrong</p>
        <p className="mt-1 text-foreground/80">{msg}</p>
        {onRetry && <Button size="sm" variant="outline" className="mt-3" onClick={onRetry}>Try again</Button>}
      </div>
    </div>
  );
}

export function Empty({ icon, title, children, className }: { icon?: React.ReactNode; title: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong/80 bg-card-soft/60 px-6 py-10 text-center", className)}>
      {icon && <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground [&_svg]:h-6 [&_svg]:w-6">{icon}</div>}
      <p className="font-medium">{title}</p>
      {children && <div className="mt-1 max-w-md text-sm text-muted-foreground">{children}</div>}
    </div>
  );
}

/** Callout strip for notices inside pages. */
export function Callout({ tone = "indigo", icon: Icon, title, children, className, action }: {
  tone?: Tone; icon?: React.ComponentType<{ className?: string }>; title?: React.ReactNode; children?: React.ReactNode; className?: string; action?: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-wrap items-start gap-3 rounded-2xl border p-4 text-sm", TONE[tone].soft, "border-border/70", className)}>
      {Icon && <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", TONE[tone].text)} />}
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cn("text-foreground/80", title && "mt-0.5")}>{children}</div>}
      </div>
      {action && <div className="flex shrink-0 flex-wrap gap-2">{action}</div>}
    </div>
  );
}

export function Modal({ open, onClose, title, children, footer, className }: {
  open: boolean; onClose: () => void; title: React.ReactNode; children: React.ReactNode; footer?: React.ReactNode; className?: string;
}) {
  React.useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 p-4 backdrop-blur-[2px] animate-fade-in" onClick={onClose}>
      <div className={cn("w-full max-w-lg rounded-2xl border bg-card shadow-float animate-pop", className)} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="flex items-center justify-between border-b px-5 py-3.5">
          <p className="font-semibold">{title}</p>
          <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer" aria-label="Close"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 rounded-b-2xl border-t bg-card-soft px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}

// ───────────── Layout helpers ─────────────
export function PageHeader({ icon, tone = "indigo", eyebrow, title, description, actions, className }: {
  icon?: React.ComponentType<{ className?: string }>; tone?: Tone; eyebrow?: React.ReactNode; title: React.ReactNode;
  description?: React.ReactNode; actions?: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="flex min-w-0 items-start gap-3.5">
        {icon && <IconChip icon={icon} tone={tone} size="lg" className="hidden sm:inline-flex" />}
        <div className="min-w-0">
          {eyebrow && <p className={cn("mb-0.5 text-xs font-semibold uppercase tracking-wider", TONE[tone].text)}>{eyebrow}</p>}
          <h1 className="text-[26px] font-bold leading-tight tracking-tight">{title}</h1>
          {description && <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Stat({ label, value, sub, icon, tone = "indigo", className }: {
  label: string; value: React.ReactNode; sub?: React.ReactNode; icon?: React.ComponentType<{ className?: string }>; tone?: Tone; className?: string;
}) {
  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
        {icon && <IconChip icon={icon} tone={tone} size="sm" />}
      </div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </Card>
  );
}

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return <kbd className={cn("inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-border-strong/80 bg-card px-1.5 font-sans text-[10px] font-semibold text-muted-foreground shadow-[0_1px_0_var(--border-strong)]", className)}>{children}</kbd>;
}

/** Pure-CSS hover tip. Wrap any small element. */
export function Tip({ text, children, className, side = "top", style }: {
  text: React.ReactNode; children: React.ReactNode; className?: string; side?: "top" | "bottom"; style?: React.CSSProperties;
}) {
  return (
    <span className={cn("group/tip relative inline-flex", className)} style={style}>
      {children}
      <span role="tooltip" className={cn("pointer-events-none absolute left-1/2 z-30 hidden w-max max-w-64 -translate-x-1/2 whitespace-pre-line rounded-lg bg-stone-900 px-2.5 py-1.5 text-[11px] font-medium leading-snug text-white shadow-raised group-hover/tip:block dark:bg-stone-100 dark:text-stone-900",
        side === "top" ? "bottom-full mb-2" : "top-full mt-2")}>{text}</span>
    </span>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-border", className)} />;
}
