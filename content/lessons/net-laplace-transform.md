# Laplace Transform and Its Inverse

> The Laplace transform is used in Networks, Control and Signals. Know the pairs, the properties, partial fractions and the initial/final value theorems.

## Intuition

The Laplace transform turns differentiation into multiplication by $s$ and builds the initial conditions in automatically. Differential equations become algebraic equations in $s$. After solving, partial fractions take you back to the time domain.

## Formal definition (one-sided)

$$
F(s) = \int_{0^-}^{\infty} f(t)\,e^{-st}\,dt .
$$

## Key pairs

| $f(t)$ ($t \ge 0$) | $F(s)$ |
|---|---|
| $\delta(t)$ | $1$ |
| $u(t)$ | $1/s$ |
| $t^n$ | $n!/s^{n+1}$ |
| $e^{-at}$ | $\dfrac{1}{s + a}$ |
| $te^{-at}$ | $\dfrac{1}{(s + a)^2}$ |
| $\sin\omega t$ | $\dfrac{\omega}{s^2 + \omega^2}$ |
| $\cos\omega t$ | $\dfrac{s}{s^2 + \omega^2}$ |
| $e^{-at}\sin\omega t$ | $\dfrac{\omega}{(s + a)^2 + \omega^2}$ |
| $e^{-at}\cos\omega t$ | $\dfrac{s + a}{(s + a)^2 + \omega^2}$ |

## Key properties

| Property | Statement |
|---|---|
| Time shift | $f(t - a)u(t - a) \to e^{-as}F(s)$ |
| Frequency shift | $e^{-at}f(t) \to F(s + a)$ |
| Differentiation | $f' \to sF - f(0^-)$; $f'' \to s^2F - sf(0^-) - f'(0^-)$ |
| Integration | $\int_0^t f\,d\tau \to F(s)/s$ |
| Multiplication by $t$ | $tf(t) \to -F'(s)$ |
| Convolution | $f * g \to FG$ |
| Initial value | $f(0^+) = \lim_{s\to\infty}sF(s)$ |
| Final value | $f(\infty) = \lim_{s\to0}sF(s)$ — valid only if all poles of $sF(s)$ are in the open LHP |

**Partial fractions:** for distinct poles, $\dfrac{N(s)}{(s - p_1)(s - p_2)} = \dfrac{K_1}{s - p_1} + \dfrac{K_2}{s - p_2}$ with $K_i = (s - p_i)F(s)|_{s = p_i}$.

## Worked examples

**Example 1.** $F = \dfrac{2s + 3}{s^2 + 4s + 5}$: $f(0^+) = \lim sF = 2$.

**Example 2.** $F = \dfrac{10}{s(s + 5)}$: $f(\infty) = \lim_{s\to0}\dfrac{10}{s + 5} = 2$.

**Example 3.** $\dfrac{1}{(s + 1)(s + 2)} = \dfrac{1}{s + 1} - \dfrac{1}{s + 2}$ ⇒ $f = e^{-t} - e^{-2t}$, so $f(1) = 0.2325$.

**Example 4.** $F = \dfrac{s + 2}{(s + 2)^2 + 9}$ ⇒ $f = e^{-2t}\cos3t$.

## Common GATE traps

- Applying the final value theorem to an oscillatory or unstable $F(s)$ (for example $\frac{1}{s^2 + 1}$).
- Forgetting the initial-condition terms in the derivative property.

## Summary

- Learn the pairs; shifts in $t$ ↔ $e^{-as}$; shifts in $s$ ↔ $e^{-at}$.
- IVT: $s \to \infty$; FVT: $s \to 0$ (stable only). Partial fractions with the cover-up method.
