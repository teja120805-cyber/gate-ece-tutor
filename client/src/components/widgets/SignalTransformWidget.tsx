// Explore y(t) = x(a·t + b): shifting, scaling and reversal together.
import * as React from "react";
import { Plot, sample, Slider } from "./plot";

// Deliberately asymmetric so reversal is visible: ramp up on [0,1], flat at 1 on [1,2].
const x = (t: number) => (t >= 0 && t < 1 ? t : t >= 1 && t <= 2 ? 1 : 0);

export function SignalTransformWidget() {
  const [a, setA] = React.useState(2);
  const [b, setB] = React.useState(-2);
  const aa = a === 0 ? 0.5 : a;
  const lo = Math.min((0 - b) / aa, (2 - b) / aa), hi = Math.max((0 - b) / aa, (2 - b) / aa);
  return (
    <div className="not-prose my-6 rounded-xl border bg-card p-4 shadow-sm">
      <p className="font-semibold">Interactive: y(t) = x(a·t + b)</p>
      <p className="text-xs text-muted-foreground">Dashed grey: original x(t) (ramp on [0,1], flat on [1,2]). Solid: y(t).</p>
      <Plot xMin={-5} xMax={5} yMin={0} yMax={1.3} xLabel="t"
        series={[
          { points: sample(x, -5, 5, 800), color: "#94a3b8", dashed: true },
          { points: sample((t) => x(aa * t + b), -5, 5, 800), color: "#4f46e5", width: 2.5 },
        ]} />
      <div className="space-y-1">
        <Slider label={<>scale <b>a</b></>} value={a} min={-3} max={3} step={0.5} onChange={(v) => setA(v === 0 ? 0.5 : v)} />
        <Slider label={<>offset <b>b</b></>} value={b} min={-4} max={4} step={0.5} onChange={setB} />
      </div>
      <div className="mt-3 rounded-lg bg-muted p-3 text-sm">
        <p>y(t) = x({aa}t {b >= 0 ? "+" : "−"} {Math.abs(b)}) = x({aa}(t {(-b / aa) >= 0 ? "−" : "+"} {Math.abs(b / aa).toFixed(2)}))</p>
        <p className="mt-1 text-muted-foreground">
          Support: 0 ≤ {aa}t {b >= 0 ? "+" : "−"} {Math.abs(b)} ≤ 2 ⇒ <b className="text-foreground">{lo.toFixed(2)} ≤ t ≤ {hi.toFixed(2)}</b>
          {" · "}{Math.abs(aa) > 1 ? `compressed ×${Math.abs(aa)}` : Math.abs(aa) < 1 ? `expanded ×${(1 / Math.abs(aa)).toFixed(1)}` : "same width"}
          {aa < 0 ? " · time-reversed" : ""}
        </p>
      </div>
    </div>
  );
}
