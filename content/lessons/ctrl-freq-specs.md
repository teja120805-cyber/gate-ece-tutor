# Frequency Response Specifications

> Resonant peak, resonant frequency and bandwidth of second-order systems, and their links to time-domain specifications.

## Intuition

Drive a closed-loop system with sinusoids of increasing frequency. A lightly damped system shows a **resonant peak** (it rings in the time domain); the **bandwidth** — how high in frequency it still responds — indicates speed (rise time).

## Standard second-order closed loop

$T(j\omega) = \dfrac{\omega_n^2}{(j\omega)^2 + 2\zeta\omega_n(j\omega) + \omega_n^2}$.

| Specification | Formula |
|---|---|
| Resonant frequency | $\omega_r = \omega_n\sqrt{1 - 2\zeta^2}$ (exists only for $\zeta < 0.707$) |
| Resonant peak | $M_r = \dfrac{1}{2\zeta\sqrt{1 - \zeta^2}}$ (for $\zeta < 0.707$; otherwise $M_r = 1$, at $\omega = 0$) |
| Bandwidth (−3 dB) | $\omega_B = \omega_n\sqrt{1 - 2\zeta^2 + \sqrt{4\zeta^4 - 4\zeta^2 + 2}}$ |

**Special values:** at $\zeta = 0.707$, $\omega_B = \omega_n$ and there is no peak. At $\zeta = 0.5$, $M_r = 1.155$ and $\omega_r = 0.707\omega_n$.

## Key relations

- Larger bandwidth ⇒ faster response: $t_r \approx$ (a constant)$/\omega_B$.
- Larger $M_r$ ⇒ smaller $\zeta$ ⇒ larger overshoot.
- First-order $\dfrac{1}{\tau s + 1}$: bandwidth $= 1/\tau$, no peak.
- Phase margin ↔ damping (approximately): $\zeta \approx \text{PM}/100$ for PM below about 70°.

## Worked examples

**Example 1.** $\zeta = 0.5$: $M_r = \frac{1}{2(0.5)(0.866)} = 1.155$.

**Example 2.** $\omega_n = 10$, $\zeta = 0.5$: $\omega_r = 10\sqrt{0.5} = 7.07$ rad/s.

**Example 3.** $\zeta = 0.707$, $\omega_n = 5$: bandwidth $= 5$ rad/s.

## Common GATE traps

- Using $\omega_r$ when $\zeta > 0.707$ (no resonance exists).
- Confusing $\omega_r$ with $\omega_d$ ($\omega_d = \omega_n\sqrt{1 - \zeta^2}$ is the damped frequency in the time domain).

## Summary

- $\omega_r = \omega_n\sqrt{1 - 2\zeta^2}$ and $M_r = 1/(2\zeta\sqrt{1 - \zeta^2})$ for $\zeta < 0.707$.
- Bandwidth sets the speed; a larger peak means less damping.
