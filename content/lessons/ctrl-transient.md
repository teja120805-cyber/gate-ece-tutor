# Transient Response of First- and Second-Order Systems

> Questions on $\zeta$, $\omega_n$, overshoot, peak time and settling time appear every year. Learn the standard forms and the handful of formulas below.

## Intuition

A **first-order** system (an RC circuit, say) approaches its final value smoothly — fast at first, then slower. A **second-order** system (a mass on a spring, an RLC circuit) can overshoot and ring before settling. The **damping ratio** $\zeta$ says how much it rings; the **natural frequency** $\omega_n$ says how fast everything happens.

## Formal definition

**First order:** $\displaystyle G(s) = \frac{K}{\tau s + 1}$. Unit-step response $c(t) = K(1 - e^{-t/\tau})$.

**Standard second order:**
$$
G(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2},\qquad s_{1,2} = -\zeta\omega_n \pm j\omega_n\sqrt{1-\zeta^2}.
$$

| $\zeta$ | poles | step response |
|---|---|---|
| $0$ | $\pm j\omega_n$ | undamped, sustained oscillation |
| $0 < \zeta < 1$ | complex conjugate | underdamped, overshoot |
| $1$ | repeated real | critically damped, fastest without overshoot |
| $> 1$ | distinct real | overdamped, sluggish |

## Key results (underdamped, unit step)

With $\omega_d = \omega_n\sqrt{1 - \zeta^2}$ (damped frequency) and $\theta = \cos^{-1}\zeta$:

$$
c(t) = 1 - \frac{e^{-\zeta\omega_n t}}{\sqrt{1-\zeta^2}}\sin(\omega_d t + \theta)
$$

| Specification | Formula |
|---|---|
| Peak time | $t_p = \dfrac{\pi}{\omega_d}$ |
| Peak overshoot | $M_p = e^{-\zeta\pi/\sqrt{1-\zeta^2}}$ |
| Rise time (0–100%) | $t_r = \dfrac{\pi - \theta}{\omega_d}$ |
| Settling time (2%) | $t_s \approx \dfrac{4}{\zeta\omega_n}$ (5%: $3/\zeta\omega_n$) |
| Number of oscillations before settling | $\approx t_s / (2\pi/\omega_d)$ |

**First order:** reaches 63.2% at $t = \tau$, 98% at $4\tau$; rise time (10–90%) $= 2.2\tau$; no overshoot.

**Pole geometry.** Real part $-\zeta\omega_n$ sets the decay (settling); imaginary part $\omega_d$ sets the oscillation; the distance from the origin is $\omega_n$; the angle from the negative real axis is $\theta = \cos^{-1}\zeta$. Lines of constant overshoot are radial lines.

## Visual picture

| $\zeta$ | 0.2 | 0.4 | 0.6 | 0.707 | 0.8 |
|---|---|---|---|---|---|
| overshoot | 52.7% | 25.4% | 9.5% | 4.3% | 1.5% |

## Worked examples

**Example 1.** $G = \dfrac{25}{s^2 + 6s + 25}$: $\omega_n = 5$, $\zeta = 0.6$, $\omega_d = 4$.
$t_p = \pi/4 = 0.785$ s, $M_p = e^{-0.6\pi/0.8} = 9.5\%$, $t_s = 4/3 = 1.33$ s.

**Example 2 (find K).** Unity feedback with $G = \dfrac{K}{s(s+4)}$; choose $K$ for $\zeta = 0.5$.
Closed loop: $s^2 + 4s + K$ ⇒ $\omega_n = \sqrt K$, $2\zeta\omega_n = 4 \Rightarrow \omega_n = 4 \Rightarrow K = 16$.

**Example 3 (first order).** $G = \dfrac{1}{2s + 1}$: $\tau = 2$ s, $c(2) = 0.632$, $t_s(2\%) \approx 8$ s.

## Common GATE traps

- **Using $\omega_n$ where $\omega_d$ belongs** (peak time, rise time).
- **Non-unity DC gain** — $\dfrac{10}{s^2 + 2s + 5}$ settles at 2, and overshoot is measured relative to that final value.
- **Extra poles or zeros** — the formulas are exact only for the standard form (approximately valid with dominant poles).
- **Forgetting to form the closed loop** before reading $\zeta$ and $\omega_n$.

## Summary

- Standard form gives $\omega_n$ and $\zeta$; $\omega_d = \omega_n\sqrt{1-\zeta^2}$.
- $t_p = \pi/\omega_d$, $M_p = e^{-\zeta\pi/\sqrt{1-\zeta^2}}$, $t_s \approx 4/\zeta\omega_n$.
- First order: $\tau$ = time to reach 63.2%; never overshoots.
