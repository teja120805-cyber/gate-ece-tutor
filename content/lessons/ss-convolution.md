# Continuous-Time Convolution

> For any LTI system, output = input ∗ impulse response. Convolution links every later topic: Fourier and Laplace multiply transforms, matched filters, PSD through LTI systems, and more.

## Intuition

Write the input as a stack of impulses: at each instant $\tau$ there is an impulse of strength $x(\tau)\,d\tau$. An LTI system answers each impulse with a scaled, delayed copy of its impulse response, $x(\tau)\,h(t - \tau)\,d\tau$. By linearity the output is the sum (integral) of all these echoes:

$$
y(t) = \int_{-\infty}^{\infty} x(\tau)\,h(t - \tau)\,d\tau .
$$

So $y(t)$ at a given instant is a **weighted memory** of the input: $h(t - \tau)$ says how much the input at time $\tau$ still matters at time $t$.

## Formal definition

$$
y(t) = (x * h)(t) = \int_{-\infty}^{\infty} x(\tau)\,h(t - \tau)\,d\tau = \int_{-\infty}^{\infty} h(\tau)\,x(t-\tau)\,d\tau .
$$

$\tau$ is the integration variable; $t$ is a fixed parameter for each output value.

## The flip-and-slide method

1. Plot $x(\tau)$ against $\tau$.
2. **Flip** $h$: plot $h(-\tau)$ (time reversal — uses the *Time scaling and reversal* lesson).
3. **Slide** by $t$: $h(t - \tau) = h(-(\tau - t))$ is the flipped pulse shifted to the right by $t$ (*Time shifting*).
4. **Multiply** $x(\tau)\,h(t-\tau)$ and **integrate** over the overlap (*Definite integrals*).
5. Repeat for each range of $t$ where the overlap changes shape.

The overlap intervals come straight from the supports: if $x$ lives on $[a_1, b_1]$ and $h$ on $[a_2, b_2]$, then $h(t-\tau)$ lives on $\tau \in [t - b_2,\ t - a_2]$, and the integration limits are
$$
\max(a_1,\ t - b_2) \le \tau \le \min(b_1,\ t - a_2).
$$

```widget
convolution
```

Use the widget: choose two rectangles of widths 2 and 1 and slide $t$. Watch the output ramp up as the overlap grows, stay flat while the short pulse is fully inside the long one, and ramp down.

## Key results

| Property | Statement |
|---|---|
| Commutative | $x * h = h * x$ |
| Associative | $(x * h_1) * h_2 = x * (h_1 * h_2)$ — cascaded systems |
| Distributive | $x * (h_1 + h_2) = x*h_1 + x*h_2$ — parallel systems |
| Identity | $x * \delta(t) = x(t)$ |
| Shift | $x * \delta(t - t_0) = x(t - t_0)$; if $y = x*h$ then $x(t-t_1) * h(t-t_2) = y(t - t_1 - t_2)$ |
| Step | $x * u(t) = \int_{-\infty}^{t} x(\tau)\,d\tau$ (running integral) |
| Area | $\int y = \left(\int x\right)\left(\int h\right)$ |
| Support | $[a_1, b_1] * [a_2, b_2] \to [a_1 + a_2,\ b_1 + b_2]$; durations add |
| Derivative | $\frac{d}{dt}(x * h) = x' * h = x * h'$ |

**Two equal rectangles** (height 1, width $T$) convolve to a **triangle** of base $2T$ and peak $T$. Unequal widths $T_1 < T_2$ give a **trapezoid** with flat top of height $T_1$ lasting $T_2 - T_1$.

## Worked examples

**Example 1.** $u(t) * u(t)$. For $t \ge 0$ the overlap is $0 \le \tau \le t$, so $y(t) = \int_0^t d\tau = t$: the result is $r(t)$.

**Example 2.** $x(t) = e^{-t}u(t)$, $h(t) = u(t)$. Overlap: $0 \le \tau \le t$ (for $t \ge 0$):
$$
y(t) = \int_0^t e^{-\tau}\,d\tau = (1 - e^{-t})\,u(t).
$$
(An integrator accumulates the input's area, which tends to 1.)

**Example 3.** $x(t) = u(t) - u(t-1)$, $h(t) = t[u(t) - u(t-1)]$. Find $y(1.5)$.
Supports $[0,1]$ and $[0,1]$; the limits are $\max(0, 0.5) = 0.5$ to $\min(1, 1.5) = 1$. On that range $h(1.5 - \tau) = 1.5 - \tau$:
$$
y(1.5) = \int_{0.5}^{1}(1.5 - \tau)\,d\tau = \left[1.5\tau - \tfrac{\tau^2}{2}\right]_{0.5}^{1} = 1 - 0.625 = 0.375 .
$$

**Example 4 (shortcut).** $x(t) = \operatorname{rect}$ on $[0,2]$, $h(t) = \delta(t-1) + \delta(t-3)$. Then $y(t) = x(t-1) + x(t-3)$: pulses on $[1,3]$ and $[3,5]$ that join into one pulse on $[1,5]$.

## Common GATE traps

- **Flipping the wrong signal or forgetting to flip.** Without the flip you compute *correlation*, not convolution.
- **Wrong limits.** Always use $\max$ of the lower ends and $\min$ of the upper ends; when the max exceeds the min, the output is 0.
- **Using $(x*h)(0) = x(0)h(0)$.** Convolution at a point is an integral, never a product of samples.
- **Ignoring the area and support checks** — they catch most algebra slips in seconds.

## Summary

- $y(t) = \int x(\tau)h(t-\tau)\,d\tau$: flip $h$, slide by $t$, multiply, integrate the overlap.
- Limits: $\max(a_1, t - b_2) \le \tau \le \min(b_1, t - a_2)$.
- Check: support $[a_1 + a_2, b_1 + b_2]$, area $= $ product of areas.
- Impulses shift, steps integrate, rectangles give triangles or trapezoids.
