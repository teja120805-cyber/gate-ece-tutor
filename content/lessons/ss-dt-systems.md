# Discrete-Time LTI Systems in the z-Domain

> Difference equations, system functions, and causality/stability from poles and ROC are standard GATE material.

## Intuition

A digital filter is a recipe: each output sample combines current and past inputs, and possibly past outputs. The z-transform turns this recipe into a rational function $H(z)$. Its poles tell you whether the system rings, decays or blows up.

## Formal definition

$$
y[n] + \sum_{k=1}^{N}a_k\,y[n - k] = \sum_{k=0}^{M}b_k\,x[n - k]
\quad\Longrightarrow\quad
H(z) = \frac{Y(z)}{X(z)} = \frac{\sum b_k z^{-k}}{1 + \sum a_k z^{-k}} .
$$

- **FIR:** no feedback ($a_k = 0$), $h[n]$ = the $b_k$ coefficients; always stable.
- **IIR:** with feedback; $h[n]$ is infinitely long.

## Key results

| Property | Condition |
|---|---|
| Causal | ROC is outside the outermost pole (including $\infty$) |
| Stable | ROC includes the unit circle $|z| = 1$ |
| Causal **and** stable | all poles strictly inside the unit circle |

- Frequency response: $H(e^{j\omega}) = H(z)|_{z = e^{j\omega}}$. DC gain $= H(1)$; gain at $\omega = \pi$ is $H(-1)$.
- **First-order recursion** $y[n] = a\,y[n-1] + x[n]$: $h[n] = a^n u[n]$, pole at $z = a$. It is a low-pass for $0 < a < 1$ and a high-pass for $-1 < a < 0$.
- A pole near the unit circle at angle $\omega_0$ produces a resonance at $\omega_0$; a zero on the unit circle produces a null.
- **Moving average** of length $M$: zeros on the unit circle at $\omega = 2\pi k/M$, $k \ne 0$.

## Worked examples

**Example 1.** $y[n] = 0.5y[n-1] + x[n]$: $H(z) = \frac{1}{1 - 0.5z^{-1}}$, $H(1) = 2$, $H(-1) = 2/3$, $h[3] = 0.125$.

**Example 2.** $H(z) = \frac{1}{1 - 1.5z^{-1}}$: if causal (ROC $|z| > 1.5$) it is unstable; the stable choice (ROC $|z| < 1.5$) is anti-causal. It cannot be both causal and stable.

**Example 3.** $y[n] = x[n] + x[n-1] + x[n-2]$: $h = \{1, 1, 1\}$ (FIR), $H(e^{j\omega}) = e^{-j\omega}(1 + 2\cos\omega)$, with nulls where $\cos\omega = -1/2$, i.e. $\omega = \pm 2\pi/3$.

## Common GATE traps

- Concluding stability from poles alone without considering causality and the ROC.
- Sign errors moving the $a_k$ terms to the other side of the equation.
- Assuming every IIR filter is unstable.

## Summary

- $H(z)$ = ratio of the coefficient polynomials; FIR is always stable.
- Causal + stable ⇔ all poles inside the unit circle.
- $H(1)$ is the DC gain and $H(-1)$ the Nyquist-frequency gain.
