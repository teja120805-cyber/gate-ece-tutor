# First-Order Linear and Nonlinear ODEs

> First-order ODEs model RC/RL circuits and growth or decay. GATE asks for solutions, integrating factors and exactness checks.

## Intuition

A first-order ODE $dy/dx = f(x, y)$ prescribes a slope at every point. A solution is a curve that follows these slopes; an initial condition picks out one curve from the family.

## Methods

| Type | Form | Method |
|---|---|---|
| Separable | $\dfrac{dy}{dx} = g(x)h(y)$ | $\int\dfrac{dy}{h(y)} = \int g(x)\,dx$ |
| Linear | $y' + P(x)y = Q(x)$ | IF $= e^{\int P\,dx}$; then $y\cdot\text{IF} = \int Q\cdot\text{IF}\,dx + C$ |
| Exact | $M\,dx + N\,dy = 0$ with $M_y = N_x$ | find $\phi$ with $\phi_x = M$, $\phi_y = N$; solution $\phi = C$ |
| Bernoulli | $y' + Py = Qy^n$ | substitute $v = y^{1-n}$ ⇒ linear in $v$ |
| Homogeneous | $y' = F(y/x)$ | substitute $y = vx$ |

## Key results

- $y' = ky$ ⇒ $y = Ce^{kx}$: growth for $k > 0$, decay for $k < 0$.
- $y' + ay = b$ (constant $a, b$) ⇒ $y = \frac{b}{a} + \left(y_0 - \frac{b}{a}\right)e^{-ax}$. This is exactly the RC-circuit form, with time constant $1/a$.
- If $M\,dx + N\,dy = 0$ is not exact: when $(M_y - N_x)/N$ depends only on $x$, the integrating factor is $e^{\int (M_y - N_x)/N\,dx}$.

## Worked examples

**Example 1.** $y' + y = 0$, $y(0) = 2$ ⇒ $y = 2e^{-x}$, so $y(1) = 0.736$.

**Example 2.** $y' + 2y = 4$, $y(0) = 0$ ⇒ $y = 2(1 - e^{-2x})$, so $y(0.5) = 2(1 - e^{-1}) = 1.264$.

**Example 3.** $y' + \frac{1}{x}y = x^2$: IF $= e^{\ln x} = x$; $(xy)' = x^3$ ⇒ $xy = \frac{x^4}{4} + C$.

**Example 4.** $(2xy + 3)\,dx + (x^2 + 4y)\,dy = 0$: $M_y = 2x = N_x$ (exact). $\phi = x^2y + 3x + 2y^2$, so the solution is $x^2y + 3x + 2y^2 = C$.

## Common GATE traps

- Computing the integrating factor before putting the equation in the standard form $y' + Py = Q$.
- Losing the constant of integration before applying the initial condition.

## Summary

- Identify the type: separable, linear (integrating factor), exact, Bernoulli or homogeneous.
- $y' + ay = b$: exponential approach to $b/a$ with time constant $1/a$.
