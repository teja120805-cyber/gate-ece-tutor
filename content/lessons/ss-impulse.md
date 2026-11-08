# The Unit Impulse and Its Properties

> The impulse is why convolution works: every signal is a sum of shifted impulses, and an LTI system is completely described by its response to one impulse.

## Intuition

Take a rectangular pulse of width $\varepsilon$ and height $1/\varepsilon$ — its area is always 1. As $\varepsilon \to 0$ it gets narrower and taller, but keeps unit area. The limiting object is the **Dirac delta** $\delta(t)$: zero everywhere except at $t = 0$, with total area 1.

Physically it models a very short, very strong kick — a hammer blow or a lightning strike — whose duration is irrelevant and only its total "strength" (area) matters.

## Formal definition

$\delta(t)$ is defined by how it acts inside an integral:

$$
\delta(t) = 0 \ \text{ for } t \ne 0, \qquad \int_{-\infty}^{\infty} \delta(t)\,dt = 1 .
$$

An impulse of **strength** (area) $A$ at $t_0$ is written $A\,\delta(t - t_0)$ and drawn as an arrow labelled $A$. The arrow's length shows area, not height.

## Key results

**1. Sifting property** (the most used result):
$$
\int_{-\infty}^{\infty} x(t)\,\delta(t - t_0)\,dt = x(t_0)
$$
provided $t_0$ lies inside the integration limits (otherwise the integral is 0).

**2. Sampling (product) property:**
$$
x(t)\,\delta(t - t_0) = x(t_0)\,\delta(t - t_0) .
$$
The result is still an impulse — not a number.

**3. Scaling:**
$$
\delta(at) = \frac{1}{|a|}\,\delta(t), \qquad \delta(at - b) = \frac{1}{|a|}\,\delta\!\left(t - \frac{b}{a}\right).
$$
*Derivation:* substitute $\tau = at$ in $\int \delta(at)\,dt$ — the area becomes $1/|a|$.

**4. Relation to the step:**
$$
\int_{-\infty}^{t} \delta(\tau)\,d\tau = u(t), \qquad \frac{d}{dt}u(t) = \delta(t).
$$

**5. Even:** $\delta(-t) = \delta(t)$.

**6. Building block of every signal:**
$$
x(t) = \int_{-\infty}^{\infty} x(\tau)\,\delta(t - \tau)\,d\tau .
$$
This says $x(t)$ is a continuum of impulses of strength $x(\tau)\,d\tau$. Feed it to an LTI system with impulse response $h(t)$ and linearity plus time invariance give the convolution integral.

**Discrete time:** $\delta[n] = 1$ at $n = 0$ and 0 otherwise — an ordinary sequence, no limits needed. $\sum_n x[n]\delta[n - n_0] = x[n_0]$.

## Visual picture

| object | drawn as | meaning |
|---|---|---|
| $\delta(t)$ | arrow at 0, label 1 | unit area at $t=0$ |
| $3\delta(t-2)$ | arrow at 2, label 3 | area 3 at $t = 2$ |
| $\delta(2t-4) = \tfrac12\delta(t-2)$ | arrow at 2, label ½ | scaling halves the area |

## Worked examples

**Example 1.** $\displaystyle\int_{-\infty}^{\infty}(t^2+1)\,\delta(t-2)\,dt = 2^2 + 1 = 5.$

**Example 2.** $\displaystyle\int_{-\infty}^{\infty} e^{-t}\,\delta(2t - 4)\,dt$.
Rewrite $\delta(2t-4) = \tfrac12\delta(t-2)$, so the integral is $\tfrac12 e^{-2} \approx 0.0677$.

**Example 3.** $\displaystyle\int_{0}^{5} \cos(\pi t)\,[\delta(t-1) + \delta(t-6)]\,dt$.
Only $t=1$ lies in $[0,5]$: the result is $\cos\pi = -1$.

## Common GATE traps

- **Ignoring the limits.** An impulse outside the integration range contributes nothing.
- **Forgetting the $1/|a|$** when the argument is scaled.
- **Treating $\delta(0)$ as 1.** The impulse has unit *area*; its "height" is undefined.
- **Writing $x(t)\delta(t-t_0) = x(t_0)$.** Without an integral the result is an impulse.

## Summary

- $\delta(t)$: zero width, unit area; strength = area.
- Sifting: $\int x(t)\delta(t-t_0)\,dt = x(t_0)$; product: $x(t)\delta(t-t_0) = x(t_0)\delta(t-t_0)$.
- $\delta(at) = \delta(t)/|a|$; $u' = \delta$.
- Every signal is a sum of shifted impulses — the foundation of convolution.
