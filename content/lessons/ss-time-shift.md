# Time Shifting

> Delays are everywhere in GATE — in convolution, in system tests for time-invariance, and in Fourier/Laplace shift properties. Getting the direction right is non-negotiable.

## Intuition

Imagine a recording of a signal. Playing it **2 seconds later** gives $x(t-2)$: every event happens 2 seconds later, so the graph moves **right**. Playing it 2 seconds earlier gives $x(t+2)$: the graph moves **left**.

The minus sign feels backwards at first. The fix is to ask: *at what new time $t$ does the argument equal the old event time?* If $x$ peaks at $t=4$, then $x(t-2)$ peaks where $t - 2 = 4$, i.e. at $t = 6$.

## Formal definition

For a constant $t_0$:

$$
y(t) = x(t - t_0)
\quad\Longrightarrow\quad
\begin{cases} t_0 > 0: & \text{delay (shift right by } t_0) \\ t_0 < 0: & \text{advance (shift left by } |t_0|) \end{cases}
$$

If $x(t)$ is non-zero on $[a, b]$, then $x(t - t_0)$ is non-zero on $[a + t_0,\ b + t_0]$.

## Key results

**Shifting moves everything rigidly.** Peaks, zero-crossings, discontinuities and the support all move by the same amount; shape, height and width are unchanged.

**Energy and area are unchanged.** Substituting $\tau = t - t_0$:

$$
\int_{-\infty}^{\infty} |x(t-t_0)|^2\,dt = \int_{-\infty}^{\infty} |x(\tau)|^2\,d\tau.
$$

**Shifting a step or ramp:** $u(t - 3)$ switches on at $t = 3$; $r(t-3) = (t-3)\,u(t-3)$ starts its slope at $t=3$. Note that $t\,u(t-3)$ is **not** a shifted ramp — it jumps from 0 to 3 at $t = 3$.

**Discrete time:** $x[n - n_0]$ shifts by an integer $n_0$ samples, with the same direction rule.

## Visual picture

Try it yourself: set $a = 1$ in the widget below and move only $b$. Since $x(t + b)$ is a shift by $-b$, positive $b$ moves the signal left.

```widget
signal-transform
```

## Worked examples

**Example 1.** $x(t) = t$ for $0 \le t \le 2$ (zero elsewhere). Find $y(t) = x(t - 1)$ and $y(2.5)$.

$y(t) = t - 1$ for $1 \le t \le 3$. Then $y(2.5) = 1.5$.
(Equivalently $y(2.5) = x(1.5) = 1.5$ — substituting is always the safest method.)

**Example 2.** Is $y(t) = x(t-2) + x(t+2)$ causal?

$y(t)$ depends on $x(t + 2)$, a **future** value, so the system is non-causal — even though one term is a delay.

## Common GATE traps

- **Shifting the wrong way.** Always solve "argument = old location".
- **Shifting only part of an expression.** To delay $x(t) = e^{-t}u(t)$ by 3, replace **every** $t$: $e^{-(t-3)}u(t-3)$, not $e^{-t}u(t-3)$.
- **Shifts combined with scaling** — the shift amount changes. That is the next lesson.

## Summary

- $x(t - t_0)$ is $x$ delayed by $t_0$ (right shift for $t_0 > 0$).
- Replace every $t$ with $t - t_0$.
- Support $[a,b] \to [a + t_0, b + t_0]$; energy, area and shape are unchanged.
