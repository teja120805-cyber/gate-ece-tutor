# Steady-State Error and Error Constants

> Error constants and system type are among the most-asked control topics.

## Intuition

After transients die out, does the output track the input exactly? It depends on how many **integrators** the loop contains (its **type**) and on the input. Each integrator lets the system follow one more "order" of input (step → ramp → parabola) with zero error.

## Formulas (unity negative feedback, open-loop $G(s)$; stable closed loop)

$$
e_{ss} = \lim_{s\to0}\frac{sR(s)}{1 + G(s)}.
$$

| Constant | Definition |
|---|---|
| position | $K_p = \lim_{s\to0}G(s)$ |
| velocity | $K_v = \lim_{s\to0}sG(s)$ |
| acceleration | $K_a = \lim_{s\to0}s^2G(s)$ |

| Type | Step $u(t)$ | Ramp $tu(t)$ | Parabola $\frac{t^2}{2}u(t)$ |
|---|---|---|---|
| 0 | $\dfrac{1}{1 + K_p}$ | ∞ | ∞ |
| 1 | 0 | $\dfrac{1}{K_v}$ | ∞ |
| 2 | 0 | 0 | $\dfrac{1}{K_a}$ |

Scale by the input amplitude ($A$ for $Au(t)$, and so on). For non-unity feedback $H$, convert to an equivalent unity-feedback system, or use $E = R - C$ directly.

**Always check closed-loop stability first** — error formulas are meaningless for unstable systems.

## Worked examples

**Example 1.** $G = \dfrac{10}{s + 2}$ (type 0), unit step: $K_p = 5$, $e_{ss} = 1/6 = 0.167$.

**Example 2.** $G = \dfrac{20}{s(s + 4)}$ (type 1), unit ramp: $K_v = 5$, $e_{ss} = 0.2$.

**Example 3.** $G = \dfrac{K}{s(s + 5)}$ with a required ramp error of 0.05: $K_v = K/5 = 20$ ⇒ $K = 100$.

## Common GATE traps

- Applying the formulas to an unstable closed loop.
- Forgetting the input amplitude, e.g. $5t$ instead of $t$.

## Summary

- Type = number of integrators in $G$.
- Step: $1/(1 + K_p)$; ramp: $1/K_v$; parabola: $1/K_a$ — zero for higher types, ∞ for lower.
