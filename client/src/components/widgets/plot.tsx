// Minimal SVG plotting helpers for interactive lesson widgets.
import * as React from "react";

export interface Series { points: [number, number][]; color: string; dashed?: boolean; fill?: string; width?: number }

export function Plot({ xMin, xMax, yMin, yMax, series, height = 180, marker, xLabel, children }: {
  xMin: number; xMax: number; yMin: number; yMax: number; series: Series[]; height?: number;
  marker?: { x: number; color: string }; xLabel?: string; children?: React.ReactNode;
}) {
  const W = 640, H = height, pad = { l: 34, r: 12, t: 10, b: 24 };
  const sx = (x: number) => pad.l + ((x - xMin) / (xMax - xMin)) * (W - pad.l - pad.r);
  const sy = (y: number) => pad.t + (1 - (y - yMin) / (yMax - yMin)) * (H - pad.t - pad.b);
  const ticks: number[] = [];
  for (let x = Math.ceil(xMin); x <= xMax; x++) ticks.push(x);
  const yTicks = [yMin, (yMin + yMax) / 2, yMax].filter((v, i, a) => a.indexOf(v) === i);
  const path = (pts: [number, number][]) => pts.map((p, i) => `${i ? "L" : "M"}${sx(p[0]).toFixed(1)},${sy(Math.max(yMin, Math.min(yMax, p[1]))).toFixed(1)}`).join("");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full select-none" role="img">
      {ticks.map((x) => (
        <g key={x}>
          <line x1={sx(x)} x2={sx(x)} y1={pad.t} y2={H - pad.b} stroke="currentColor" strokeOpacity={x === 0 ? 0.35 : 0.08} />
          <text x={sx(x)} y={H - 8} fontSize="10" textAnchor="middle" fill="currentColor" opacity={0.6}>{x}</text>
        </g>
      ))}
      {yTicks.map((y) => (
        <g key={y}>
          <line x1={pad.l} x2={W - pad.r} y1={sy(y)} y2={sy(y)} stroke="currentColor" strokeOpacity={y === 0 ? 0.35 : 0.08} />
          <text x={pad.l - 6} y={sy(y) + 3} fontSize="10" textAnchor="end" fill="currentColor" opacity={0.6}>{+y.toFixed(2)}</text>
        </g>
      ))}
      {series.filter((s) => s.fill).map((s, i) => (
        <path key={`f${i}`} d={`${path(s.points)}L${sx(s.points[s.points.length - 1][0])},${sy(0)}L${sx(s.points[0][0])},${sy(0)}Z`} fill={s.fill} stroke="none" />
      ))}
      {series.map((s, i) => (
        <path key={i} d={path(s.points)} fill="none" stroke={s.color} strokeWidth={s.width ?? 2} strokeDasharray={s.dashed ? "5 4" : undefined} />
      ))}
      {marker && <line x1={sx(marker.x)} x2={sx(marker.x)} y1={pad.t} y2={H - pad.b} stroke={marker.color} strokeWidth={1.5} strokeDasharray="3 3" />}
      {xLabel && <text x={W - pad.r} y={pad.t + 10} fontSize="11" textAnchor="end" fill="currentColor" opacity={0.7}>{xLabel}</text>}
      {children}
    </svg>
  );
}

export function sample(f: (x: number) => number, a: number, b: number, n = 600): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i <= n; i++) { const x = a + ((b - a) * i) / n; out.push([x, f(x)]); }
  return out;
}

export function Slider({ label, value, min, max, step, onChange, format }: {
  label: React.ReactNode; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format?: (v: number) => string;
}) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="w-28 shrink-0 text-muted-foreground">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="flex-1 accent-[var(--primary)]" />
      <span className="w-14 text-right font-mono tabular-nums">{format ? format(value) : value}</span>
    </label>
  );
}
