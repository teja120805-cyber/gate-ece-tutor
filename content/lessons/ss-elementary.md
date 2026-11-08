# Elementary Signals and Basic Operations

> Almost every GATE signals question starts by writing a sketch as a sum of steps and ramps — or by reading such a sum back as a sketch. This lesson gives you that vocabulary.

## Intuition

Think of elementary signals as **building blocks**:

- the **unit step** $u(t)$ is a switch that turns on at $t=0$ and stays on;
- the **unit ramp** $r(t)$ is a value that starts growing at slope 1 at $t=0$;
- a **rectangular pulse** is a switch turned on and later turned off;
- an **exponential** $e^{-at}u(t)$ is something that starts at 1 and decays.

Any piecewise-linear signal can be assembled from shifted, scaled steps and ramps, just like a shape built from LEGO bricks.

## Formal definition

$$
u(t) = \begin{cases} 1, & t \ge 0 \\ 0, & t < 0 \end{cases}
\qquad
r(t) = t\,u(t) = \begin{cases} t, & t \ge 0 \\ 0, & t < 0 \end{cases}
$$

$$
\operatorname{rect}\!\left(\frac{t}{T}\right) = u\!\left(t + \tfrac{T}{2}\right) - u\!\left(t - \tfrac{T}{2}\right)
\quad \text{(height 1, width } T\text{, centred at 0)}
$$

Relations you will use constantly:

$$
\frac{d}{dt}r(t) = u(t), \qquad \int_{-\infty}^{t} u(\tau)\,d\tau = r(t)
$$

(The value of $u(0)$ is a convention — 1 here, sometimes ½ — and never affects integrals.)

**Basic amplitude operations** act point by point on the signal value:

| Operation | Meaning |
|---|---|
| $A\,x(t)$ | amplitude scaling (negative $A$ also flips it upside down) |
| $x_1(t) + x_2(t)$ | add the values at each instant |
| $x_1(t)\,x_2(t)$ | multiply values at each instant — multiplying by a pulse **windows** a signal |

## Key results

**1. Slope rule for ramps.** $a\,r(t - t_0)$ adds slope $a$ from $t = t_0$ onward. So a piecewise-linear signal is

$$
x(t) = \sum_k (\text{change of slope at } t_k)\; r(t - t_k) + \sum_k (\text{jump at } t_k)\; u(t - t_k).
$$

**2. Windowing.** $x(t)\,[u(t - a) - u(t - b)]$ keeps $x(t)$ on $[a, b)$ and makes it zero elsewhere.

**3. Exponentials.** $e^{-at}u(t)$ with $a > 0$ decays; its value falls to $e^{-1} \approx 0.37$ at $t = 1/a$ (the *time constant*).

## Visual picture

A trapezoid that rises from 0 at $t=0$ to 1 at $t=1$, stays flat until $t=3$, and falls back to 0 at $t=4$:

| interval | value | slope |
|---|---|---|
| $t<0$ | 0 | 0 |
| $0 \le t < 1$ | $t$ | +1 |
| $1 \le t < 3$ | 1 | 0 |
| $3 \le t < 4$ | $4 - t$ | −1 |
| $t \ge 4$ | 0 | 0 |

Slope changes: $+1$ at 0, $-1$ at 1, $-1$ at 3, $+1$ at 4, so
$x(t) = r(t) - r(t-1) - r(t-3) + r(t-4)$.

## Worked examples

**Example 1.** Evaluate $x(t) = 2u(t) - 3u(t-1) + u(t-4)$ on each interval.

- $t < 0$: $0$
- $0 \le t < 1$: $2$
- $1 \le t < 4$: $2 - 3 = -1$
- $t \ge 4$: $2 - 3 + 1 = 0$

So it is a pulse of height 2 on $[0,1)$ followed by a pulse of height $-1$ on $[1,4)$. Its area is $2(1) + (-1)(3) = -1$.

**Example 2.** Write the triangle with peak 2 at $t = 1$ and zeros at $t = 0$ and $t = 2$.

Slope is $+2$ on $(0,1)$ and $-2$ on $(1,2)$. Slope changes: $+2$ at 0, $-4$ at 1, $+2$ at 2:
$$x(t) = 2r(t) - 4r(t-1) + 2r(t-2).$$
Check at $t = 3$: $6 - 8 + 2 = 0$ ✓.

## Common GATE traps

- **Forgetting to cancel a ramp.** After a ramp is turned on, it grows forever unless a later ramp cancels its slope. Always check the value for large $t$.
- **Confusing $u(t-a)$ and $u(a-t)$.** $u(a - t) = 1$ for $t \le a$ — it is a step that switches **off** at $t=a$.
- **Mixing up height and slope.** A step changes the *value*; a ramp changes the *slope*.

## Summary

- $u(t)$ switches on, $r(t)$ starts a slope, $\delta(t)$ (next lessons) is a unit-area spike.
- $r' = u$ and $u' = \delta$.
- Build piecewise-linear signals with ramps at slope changes and steps at jumps; verify by evaluating each interval.
