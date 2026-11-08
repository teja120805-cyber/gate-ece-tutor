# Nyquist Stability Criterion

> Counting encirclements to find closed-loop RHP poles, and finding critical gain from the real-axis crossing, are standard questions.

## Intuition

Map the whole right half of the s-plane (the "D-contour") through the open-loop function $G(s)H(s)$. Each closed-loop pole in the RHP makes the image curve wrap around the point $-1$ in a particular way. Counting the wraps — without solving any polynomial — tells you whether the closed loop is stable, even for systems that are unstable in open loop or have time delays.

## Statement

$$
N = Z - P
$$

- $N$: net **clockwise** encirclements of $-1 + j0$ by the Nyquist plot of $GH$.
- $P$: open-loop poles in the RHP (known).
- $Z$: closed-loop poles in the RHP (zeros of $1 + GH$) — stability requires $Z = 0$.

So the system is stable ⇔ $N = -P$ (that is, $P$ **counter-clockwise** encirclements). For an open-loop stable system ($P = 0$): stable ⇔ no encirclement of $-1$.

## Key results

- Open-loop poles on the $j\omega$ axis (e.g. integrators) need small indentations around them. These map to large arcs in the $GH$ plane.
- **Real-axis crossing:** if the plot crosses the negative real axis at $-a$, then gain margin $= 1/a$, and the system becomes marginally stable when the gain is multiplied by $1/a$.
- **Relative stability:** distance from $-1$ — GM along the real axis, PM on the unit circle.

## Worked examples

**Example 1.** $P = 0$, $N = 2$ (two clockwise encirclements) ⇒ $Z = 2$: unstable, with two RHP poles.

**Example 2.** $P = 1$, one counter-clockwise encirclement ($N = -1$) ⇒ $Z = 0$: stable.

**Example 3.** $G = \dfrac{K}{s(s + 1)(s + 2)}$: at $\omega = \sqrt2$ the plot crosses the real axis at $-K/6$; critical $K = 6$.

## Common GATE traps

- Sign conventions: clockwise versus counter-clockwise, and whether $N$ counts encirclements of $-1$ or of the origin (of $1 + GH$).
- Forgetting the indentation around poles at the origin.

## Summary

- $N = Z - P$ with clockwise encirclements of $-1$; stable ⇔ $Z = 0$.
- A crossing at $-a$ gives GM $= 1/a$.
