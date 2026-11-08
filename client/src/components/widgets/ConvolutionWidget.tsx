// Interactive flip-and-slide convolution: y(t) = ∫ x(τ) h(t − τ) dτ
import * as React from "react";
import { Plot, sample, Slider } from "./plot";
import { Select } from "../ui";

const SIGNALS: Record<string, { label: string; f: (t: number) => number }> = {
  rect1: { label: "rect: 1 on [0, 1)", f: (t) => (t >= 0 && t < 1 ? 1 : 0) },
  rect2: { label: "rect: 1 on [0, 2)", f: (t) => (t >= 0 && t < 2 ? 1 : 0) },
  tri: { label: "triangle on [0, 2], peak 1", f: (t) => (t >= 0 && t <= 1 ? t : t > 1 && t <= 2 ? 2 - t : 0) },
  exp: { label: "e^(−t) u(t)", f: (t) => (t >= 0 ? Math.exp(-t) : 0) },
  ramp: { label: "t on [0, 1]", f: (t) => (t >= 0 && t <= 1 ? t : 0) },
  step: { label: "u(t)", f: (t) => (t >= 0 ? 1 : 0) },
};
const T_MIN = -3, T_MAX = 7, DT = 0.01;

export function ConvolutionWidget() {
  const [xk, setXk] = React.useState("rect2");
  const [hk, setHk] = React.useState("rect1");
  const [t, setT] = React.useState(1.5);
  const x = SIGNALS[xk].f, h = SIGNALS[hk].f;

  const conv = React.useCallback((tt: number) => {
    let s = 0;
    for (let tau = -4; tau <= 8; tau += DT) s += x(tau) * h(tt - tau) * DT;
    return s;
  }, [x, h]);
  const yCurve = React.useMemo(() => sample(conv, T_MIN, T_MAX, 250), [conv]);
  const yMax = Math.max(1, ...yCurve.map((p) => p[1])) * 1.1;
  const yNow = conv(t);
  const product = sample((tau) => x(tau) * h(t - tau), T_MIN, T_MAX, 700);

  return (
    <div className="not-prose my-6 rounded-xl border bg-card p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">Interactive: flip and slide</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <label className="flex items-center gap-1"><span className="text-sky-600 font-semibold">x(t)</span>
            <Select value={xk} onChange={(e) => setXk(e.target.value)}>{Object.entries(SIGNALS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}</Select></label>
          <label className="flex items-center gap-1"><span className="text-rose-600 font-semibold">h(t)</span>
            <Select value={hk} onChange={(e) => setHk(e.target.value)}>{Object.entries(SIGNALS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}</Select></label>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Top: <span className="text-sky-600">x(τ)</span> and the flipped, shifted <span className="text-rose-600">h(t − τ)</span>. The shaded area is the product — its area is y(t).</p>
      <Plot xMin={T_MIN} xMax={T_MAX} yMin={0} yMax={1.2} xLabel="τ" marker={{ x: t, color: "#e11d48" }}
        series={[
          { points: product, color: "transparent", fill: "rgba(139,92,246,0.35)", width: 0 },
          { points: sample(x, T_MIN, T_MAX, 700), color: "#0284c7" },
          { points: sample((tau) => h(t - tau), T_MIN, T_MAX, 700), color: "#e11d48", dashed: true },
        ]} />
      <Slider label={<>Shift <b>t</b></>} value={t} min={T_MIN} max={T_MAX} step={0.05} onChange={setT} format={(v) => v.toFixed(2)} />
      <p className="mt-3 text-xs text-muted-foreground">Bottom: the output y(t) = (x * h)(t). The dot moves as you slide.</p>
      <Plot xMin={T_MIN} xMax={T_MAX} yMin={0} yMax={yMax} xLabel="t" marker={{ x: t, color: "#7c3aed" }}
        series={[{ points: yCurve, color: "#7c3aed", width: 2.5 }]} />
      <p className="mt-1 text-sm">At t = <b>{t.toFixed(2)}</b>: overlap area y(t) ≈ <b className="font-mono">{yNow.toFixed(3)}</b></p>
    </div>
  );
}
