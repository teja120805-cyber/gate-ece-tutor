# Transfer Function

> Deriving transfer functions, identifying poles, zeros, order and type, and computing DC gain are foundation skills for all of control.

## Intuition

The transfer function is the ratio of output to input in the Laplace domain, with zero initial conditions. It packages the entire input–output behaviour of an LTI system into one rational function of $s$.

## Formal definition

$$
G(s) = \frac{C(s)}{R(s)}\Big|_{\text{zero ICs}} = \mathcal L\{g(t)\}, \qquad G(s) = K\frac{(s - z_1)\cdots(s - z_m)}{(s - p_1)\cdots(s - p_n)}.
$$
$g(t)$ is the impulse response.

## Key results

- **Poles** (roots of the denominator) determine the natural response and stability; **zeros** shape the response amplitudes.
- **Order** = number of poles (highest power of $s$ in the denominator).
- **Type** = number of open-loop poles at the origin (pure integrators) in $G(s)H(s)$. Type sets the steady-state error behaviour.
- **DC gain** $= G(0)$ for a stable system (the steady-state response to a unit step).
- **Time-constant form:** $G(s) = \dfrac{K(1 + sT_a)\cdots}{s^N(1 + sT_1)\cdots}$, where $K$ is the Bode gain and $N$ the type.
- **From a differential equation:** $a_2\ddot y + a_1\dot y + a_0y = b_0u$ ⇒ $G = \dfrac{b_0}{a_2s^2 + a_1s + a_0}$.
- **Proper:** numerator degree ≤ denominator degree (physically realisable).

## Worked examples

**Example 1.** $\ddot y + 3\dot y + 2y = x$ ⇒ $G = \dfrac{1}{(s + 1)(s + 2)}$, DC gain $0.5$.

**Example 2.** $G(s)H(s) = \dfrac{10}{s^2(s + 2)}$: type 2, order 3.

**Example 3.** $G = \dfrac{10(s + 2)}{(s + 1)(s + 5)}$: DC gain $= \dfrac{10\times2}{1\times5} = 4$.

**Example 4.** Impulse response $e^{-2t}u(t)$ ⇒ $G = \dfrac{1}{s + 2}$.

## Common GATE traps

- Using the closed-loop TF to find the type (use the open-loop $GH$).
- Mixing pole-zero form and time-constant form gains.

## Summary

- $G(s) = \mathcal L\{\text{impulse response}\}$ with zero initial conditions.
- Order = number of poles; type = number of poles at $s = 0$ of $GH$; DC gain $= G(0)$.
