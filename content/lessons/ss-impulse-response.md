# Impulse Response, Causality and Stability of LTI Systems

> The impulse response is the complete "fingerprint" of an LTI system. GATE tests reading causality, stability and memory directly from $h(t)$ or $h[n]$.

## Intuition

Hit an LTI system with one unit impulse and record the output: that recording, $h(t)$, tells you everything. Every input is a sum of shifted, scaled impulses, so every output is the same sum of shifted, scaled copies of $h$ — that is convolution, $y = x * h$.

## Formal definitions and tests

| Property | Condition on $h$ |
|---|---|
| Causal | $h(t) = 0$ for $t < 0$ ($h[n] = 0$ for $n < 0$) |
| BIBO stable | $\int_{-\infty}^{\infty}|h(t)|\,dt < \infty$ ($\sum|h[n]| < \infty$) |
| Memoryless | $h(t) = K\delta(t)$ ($h[n] = K\delta[n]$) |
| Invertible | an $h_{inv}$ exists with $h * h_{inv} = \delta$ |

If $|x| \le M$ then $|y| \le M\int|h|$ — this bound is why absolute integrability is the stability test.

## Key results

- **Step response** $s(t) = \int_{-\infty}^{t}h(\tau)\,d\tau$, so $h(t) = \dfrac{ds}{dt}$. In DT: $s[n] = \sum_{k\le n}h[k]$, $h[n] = s[n] - s[n-1]$.
- **Cascade:** $h = h_1 * h_2$ (order does not matter). **Parallel:** $h = h_1 + h_2$.
- **Eigenfunctions:** $e^{st} \to H(s)e^{st}$ with $H(s) = \int h(t)e^{-st}dt$. So sinusoids pass through LTI systems unchanged in shape.
- **Transform view:** causal and stable ⇔ all poles of $H(s)$ in the open left half-plane (DT: inside the unit circle).

## Worked examples

**Example 1.** $h(t) = e^{-2t}u(t)$: causal; $\int|h| = 1/2$ ⇒ stable.

**Example 2.** $h(t) = e^{2t}u(-t)$: non-causal (non-zero for $t<0$) but $\int_{-\infty}^{0}e^{2t}dt = 1/2$ ⇒ stable.

**Example 3.** $h(t) = u(t)$ (integrator): causal but $\int|h| = \infty$ ⇒ unstable.

**Example 4.** Step response $s(t) = (1 - e^{-3t})u(t)$ ⇒ $h(t) = 3e^{-3t}u(t)$, so $h(0^+) = 3$.

**Example 5.** $h[n] = (0.5)^n u[n]$: $\sum|h| = 2$. Any input with $|x[n]| \le 3$ gives $|y[n]| \le 6$.

## Common GATE traps

- Calling a system unstable just because it is non-causal (they are independent properties).
- Forgetting that $h(t) = \delta(t - 1)$ (a pure delay) has memory.
- Differentiating the step response but missing an impulse when $s(t)$ jumps at $t = 0$.

## Summary

- Causal: $h = 0$ before 0. Stable: $h$ absolutely integrable/summable. Memoryless: $h = K\delta$.
- $h = ds/dt$; cascades convolve, parallels add.
