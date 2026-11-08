# System Properties

> "Which of the following systems is linear and time-invariant?" appears in some form almost every year. Each property has a mechanical test — learn the tests, not the examples.

## Intuition

A **system** maps an input signal $x(t)$ to an output $y(t)$. Properties describe how it behaves:

- **Linear:** responds proportionally and additively — double the input, double the output.
- **Time-invariant:** behaves the same today as tomorrow — a delayed input gives an equally delayed output.
- **Causal:** cannot react before it is stimulated — uses only present and past input.
- **Memoryless:** output depends only on the input at the same instant.
- **BIBO stable:** every bounded input produces a bounded output.

## Formal definition and tests

**Linearity** (superposition):
$$
x_1 \to y_1,\ x_2 \to y_2 \ \Longrightarrow\ a x_1 + b x_2 \to a y_1 + b y_2 .
$$
Quick tests: (i) zero input must give zero output; (ii) look for nonlinear operations on $x$ — squares, $|x|$, $\sin x$, constant offsets, $x$ in an exponent.

**Time invariance:**
1. Find the response to the shifted input $x(t - t_0)$: call it $y_1(t)$.
2. Shift the original output: $y(t - t_0)$.
3. TI if $y_1(t) = y(t - t_0)$ for every $x$ and $t_0$.

Red flags: $t$ appearing **outside** $x(\cdot)$ (e.g. $t\,x(t)$), and scaled or reversed time inside $x$ (e.g. $x(2t)$, $x(-t)$).

**Causality:** check every argument of $x$ in the expression; the system is causal if for all $t$ each argument is $\le t$. Test a positive and a negative $t$ (for $x(-t)$, $t = -1$ needs $x(1)$, the future).

**Memoryless:** every argument equals exactly $t$.

**BIBO stability:** assume $|x(t)| \le M$ and check whether $|y(t)|$ stays bounded. For LTI systems: stable $\iff \int |h(t)|\,dt < \infty$.

## Key results — a reference table

| System | Lin. | TI | Causal | Stable |
|---|---|---|---|---|
| $x(t - 2)$ | ✓ | ✓ | ✓ | ✓ |
| $x(t + 2)$ | ✓ | ✓ | ✗ | ✓ |
| $t\,x(t)$ | ✓ | ✗ | ✓ | ✗ |
| $x(2t)$ | ✓ | ✗ | ✗ | ✓ |
| $x(-t)$ | ✓ | ✗ | ✗ | ✓ |
| $x^2(t)$ | ✗ | ✓ | ✓ | ✓ |
| $x(t) + 3$ | ✗ | ✓ | ✓ | ✓ |
| $\int_{-\infty}^{t} x(\tau)d\tau$ | ✓ | ✓ | ✓ | ✗ |
| $e^{x(t)}$ | ✗ | ✓ | ✓ | ✓ |
| $x(t)\cos(\omega_0 t)$ | ✓ | ✗ | ✓ | ✓ |

## Visual picture

Time invariance as a commuting diagram: *delay then system* must equal *system then delay*. For $y(t) = x(2t)$, delaying the input by 1 gives $x(2t - 1)$ (shift of ½ in the output), whereas delaying the output gives $x(2t - 2)$. The two paths disagree, so the system is time-varying.

## Worked examples

**Example 1.** $y(t) = t\,x(t)$.
Linear: $t(ax_1 + bx_2) = a\,tx_1 + b\,tx_2$ ✓.
TI: input $x(t - t_0)$ gives $t\,x(t-t_0)$; shifted output is $(t - t_0)\,x(t - t_0)$. Different ⇒ time-varying.
Stable? $x = 1$ (bounded) gives $y = t$, unbounded ⇒ unstable.

**Example 2.** The accumulator $y[n] = \sum_{k=-\infty}^{n} x[k]$.
Linear, TI and causal. Its impulse response is $h[n] = u[n]$, and $\sum |h[n]| = \infty$ ⇒ not BIBO stable (a step input produces a ramp).

**Example 3.** $y(t) = x(t) + 3$ — the zero input gives $y = 3 \ne 0$, so it is not linear (it is *incrementally linear*).

## Common GATE traps

- **"Straight line ⇒ linear."** An affine map with an offset is not linear.
- **Testing TI by shifting only $t$ outside.** Shift the *input*, then compare with the shifted *output*.
- **Causality of $x(-t)$**: causal-looking for $t > 0$? Check $t < 0$.
- **Stability of the integrator** — a classic "linear, TI, causal but unstable" example.

## Summary

- Linear: superposition; zero in → zero out.
- TI: response to $x(t - t_0)$ equals $y(t - t_0)$; watch for explicit $t$ and scaled arguments.
- Causal: all arguments $\le t$. Memoryless: all arguments $= t$.
- LTI stability: $h$ absolutely integrable/summable.
