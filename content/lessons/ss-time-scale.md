# Time Scaling and Reversal

> Expressions like $x(2t - 3)$ or $x(4 - 2t)$ appear constantly in GATE. The classic mistake is shifting by the wrong amount; this lesson gives you a method that never fails.

## Intuition

**Scaling** changes playback speed. $x(2t)$ plays the recording twice as fast, so everything happens in half the time — the signal is **compressed** by 2. $x(t/2)$ plays at half speed — **expanded** by 2.

**Reversal** $x(-t)$ plays the recording backwards — the graph is mirrored about $t = 0$.

## Formal definition

For $a \ne 0$:

$$
y(t) = x(at) \quad \Rightarrow \quad
\begin{cases} |a| > 1: & \text{compressed by } |a| \\ |a| < 1: & \text{expanded by } 1/|a| \\ a < 0: & \text{also reversed} \end{cases}
$$

If $x$ lives on $[p, q]$ and $a > 0$, then $x(at)$ lives on $[p/a,\ q/a]$.

## Key results

**The general transformation.** Factor out the scale:

$$
x(at + b) = x\!\left(a\left(t + \frac{b}{a}\right)\right).
$$

So $x(at+b)$ is $x(at)$ shifted by $-b/a$ — **not** by $-b$.

**Two safe procedures:**

1. *Shift first, then scale.* Replace $t \to t + b$ (shift by $-b$), then replace $t \to at$. Each step is a substitution into the previous expression.
2. *Solve inequalities.* If $x$ is non-zero for $p \le \text{argument} \le q$, solve $p \le at + b \le q$ for $t$. To place a specific point, solve $at + b = t_{\text{old}}$.

Method 2 is the fastest and least error-prone in exams.

**Effect on energy and area** (substitute $\tau = at + b$, $dt = d\tau/|a|$):

$$
\int |x(at+b)|^2\,dt = \frac{1}{|a|}\int |x(\tau)|^2\,d\tau,
\qquad
\int x(at+b)\,dt = \frac{1}{|a|}\int x(\tau)\,d\tau .
$$

**Discrete time.** $x[2n]$ keeps only even-indexed samples (**decimation** — information can be lost). $x[n/2]$ is defined only when $n$ is even (**interpolation**, zeros or interpolated values elsewhere).

## Visual picture

The base signal below is asymmetric (a ramp, then a flat top) so you can see reversal clearly. Try $a = -2$, $b = 4$: the result is compressed, mirrored, and its support is $1 \le t \le 2$.

```widget
signal-transform
```

## Worked examples

**Example 1.** $x(t)$ is non-zero on $[0, 4]$. Find the support of $y(t) = x(2t - 2)$.

$0 \le 2t - 2 \le 4 \Rightarrow 1 \le t \le 3$. The shift is **1**, not 2, because $x(2t-2) = x(2(t-1))$.

**Example 2.** $x(t) = t$ on $[0, 2]$. Sketch $y(t) = x(4 - 2t)$.

Support: $0 \le 4 - 2t \le 2 \Rightarrow 1 \le t \le 2$.
Endpoints: at $t = 1$, $y = x(2) = 2$; at $t = 2$, $y = x(0) = 0$.
So $y(t) = 4 - 2t$ on $[1, 2]$: a ramp **falling** from 2 to 0 (it was reversed) over half the width (it was compressed).

**Example 3.** $x(t)$ has energy 12. The energy of $x(3t - 1)$ is $12/3 = 4$. The shift does nothing; compression by 3 divides energy by 3.

## Common GATE traps

- **Shifting by $b$ instead of $b/a$.** Always factor out $a$ or solve inequalities.
- **Order of operations.** "Scale, then shift by $b$" gives $x(a(t + b)) = x(at + ab)$ — a different signal. If you scale first, the shift must be $b/a$.
- **Reversal of support.** When $a<0$ the endpoints swap; solving the inequality handles this automatically.

## Summary

- $x(at)$: compress for $|a| > 1$, expand for $|a| < 1$, reverse if $a < 0$.
- $x(at + b) = x(a(t + b/a))$; support from $p \le at + b \le q$.
- Energy and area scale by $1/|a|$; shifts change neither.
