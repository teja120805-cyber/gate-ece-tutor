# Taylor Series

> Series coefficients and small-value approximations appear regularly, and series are used to evaluate limits quickly.

## Intuition

Near a point, any smooth function looks like a polynomial: first a line (the tangent), then a parabola, and so on. The Taylor series matches the function's value and all its derivatives at that point.

## Formal definition

$$
f(x) = \sum_{n=0}^{\infty}\frac{f^{(n)}(a)}{n!}(x - a)^n = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \cdots
$$

With $a = 0$ it is the **Maclaurin series**. Truncating after the $(x-a)^n$ term leaves an error of about $\frac{f^{(n+1)}(\xi)}{(n+1)!}(x - a)^{n+1}$.

## Key series

| Function | Series | Valid for |
|---|---|---|
| $e^x$ | $1 + x + \dfrac{x^2}{2!} + \dfrac{x^3}{3!} + \cdots$ | all $x$ |
| $\sin x$ | $x - \dfrac{x^3}{3!} + \dfrac{x^5}{5!} - \cdots$ | all $x$ |
| $\cos x$ | $1 - \dfrac{x^2}{2!} + \dfrac{x^4}{4!} - \cdots$ | all $x$ |
| $\ln(1 + x)$ | $x - \dfrac{x^2}{2} + \dfrac{x^3}{3} - \cdots$ | $-1 < x \le 1$ |
| $\dfrac{1}{1 - x}$ | $1 + x + x^2 + \cdots$ | $|x| < 1$ |
| $(1 + x)^n$ | $1 + nx + \dfrac{n(n-1)}{2!}x^2 + \cdots$ | $|x| < 1$ |
| $\tan x$ | $x + \dfrac{x^3}{3} + \cdots$ | $|x| < \pi/2$ |

## Key results

- Even functions have only even powers; odd functions only odd powers.
- Series can be substituted, multiplied and differentiated term by term, e.g. $e^{-x^2} = 1 - x^2 + x^4/2 - \cdots$.
- Using series for limits: $\dfrac{x - \sin x}{x^3} \to \dfrac{1}{6}$.

## Worked examples

**Example 1.** The coefficient of $x^3$ in $\sin x$ is $-\frac{1}{6} \approx -0.167$.

**Example 2.** $\ln x$ about $x = 1$: $(x - 1) - \frac{(x-1)^2}{2} + \cdots$, so the coefficient of $(x - 1)^2$ is $-0.5$.

**Example 3.** $\cos(0.2) \approx 1 - 0.04/2 = 0.98$ (the true value is 0.98007).

**Example 4.** $\sqrt{1 + x} \approx 1 + \frac{x}{2} - \frac{x^2}{8}$, so $\sqrt{1.02} \approx 1.00995$.

## Common GATE traps

- Forgetting the factorials.
- Using a series outside its interval of convergence.
- Sign patterns in $\sin$, $\cos$ and $\ln(1 + x)$.

## Summary

- $f(x) = \sum f^{(n)}(a)(x - a)^n/n!$.
- Memorise the standard series; combine them by substitution.
- Truncation error is of the order of the first omitted term.
