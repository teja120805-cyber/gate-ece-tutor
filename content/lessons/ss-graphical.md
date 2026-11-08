# Graphical Interpretation of Signals

> GATE gives a sketch and asks for an expression, an area, a derivative, or a transformed sketch. Moving fluently between pictures and formulas is the core skill behind convolution.

## Intuition

A signal plot answers three questions at every time: **what is the value**, **what is the slope**, and **is there a jump**? If you can read those three things off a graph, you can write the formula, differentiate it, integrate it, and transform it.

## Formal definition

A **piecewise signal** is defined interval by interval:

$$
x(t) = \begin{cases} f_1(t), & t_0 \le t < t_1 \\ f_2(t), & t_1 \le t < t_2 \\ \;\vdots \end{cases}
$$

Using steps as on/off gates, the same signal is

$$
x(t) = f_1(t)\,[u(t-t_0) - u(t-t_1)] + f_2(t)\,[u(t-t_1) - u(t-t_2)] + \cdots
$$

## Key results

**1. Reading a graph as steps and ramps.** Scan left to right; at each breakpoint $t_k$ note the **jump** $J_k$ and the **change in slope** $S_k$:

$$
x(t) = \sum_k J_k\,u(t - t_k) + \sum_k S_k\,r(t - t_k).
$$

**2. Derivative from the graph.** The derivative is the slope on each interval, plus an impulse of area $J_k$ at each jump:

$$
\frac{dx}{dt} = \text{(piecewise slope)} + \sum_k J_k\,\delta(t - t_k).
$$

**3. Area from the graph.** Integrals become geometry — rectangles, triangles and trapezoids. Area below the axis counts negative.

**4. Even and odd parts.**
$$
x_e(t) = \tfrac12[x(t) + x(-t)], \qquad x_o(t) = \tfrac12[x(t) - x(-t)].
$$
Graphically: mirror the signal, then average (even part) or take half the difference (odd part).

**5. Transforming a sketch.** For $x(at+b)$, transform the **breakpoints**: each old breakpoint $t_k$ moves to $t = (t_k - b)/a$, and the value at that point is unchanged. Then join the points with the same kind of segments.

## Visual picture

Example signal: rises from 0 to 2 over $[0,1]$, stays at 2 until $t=3$, then drops to 0.

| breakpoint | jump $J$ | slope change $S$ |
|---|---|---|
| $t=0$ | 0 | $+2$ |
| $t=1$ | 0 | $-2$ |
| $t=3$ | $-2$ | 0 |

$\Rightarrow x(t) = 2r(t) - 2r(t-1) - 2u(t-3)$, and
$\dfrac{dx}{dt} = 2[u(t) - u(t-1)] - 2\delta(t-3)$.

## Worked examples

**Example 1 (area).** $x(t) = 1 + t$ on $[-1, 0)$, $1$ on $[0, 2)$, $0$ elsewhere.
Triangle area $\tfrac12(1)(1) = 0.5$ plus rectangle $2$: total $2.5$.

**Example 2 (transforming a sketch).** $x(t)$ is a triangle with vertices $(-1, 0), (0, 1), (1, 0)$. Sketch $x(2 - t)$.

Each breakpoint $t_k$ maps to $t = 2 - t_k$: $(-1 \to 3)$, $(0 \to 2)$, $(1 \to 1)$. So $x(2-t)$ is a triangle with vertices $(1,0), (2,1), (3,0)$ — peak at $t = 2$.

**Example 3 (even part).** $x(t) = t$ on $[0, 2]$, zero elsewhere. Then $x_e(1) = \tfrac12[x(1) + x(-1)] = \tfrac12(1 + 0) = 0.5$, and $x_e(t) = |t|/2$ for $|t| \le 2$.

## Common GATE traps

- **Missing a jump when differentiating.** A vertical edge in the graph is an impulse in the derivative.
- **Losing the sign of area** below the axis.
- **Transforming values instead of times.** $x(at+b)$ moves points horizontally only; heights stay the same.

## Summary

- Breakpoints carry jumps (steps) and slope changes (ramps).
- Derivative = slopes + impulses at jumps; integral = signed geometric area.
- To transform a sketch, map each breakpoint with $t = (t_k - b)/a$ and keep its height.
