# Partial Derivatives

> Partial derivatives feed into maxima/minima, the gradient, Cauchy–Riemann equations and PDEs. Euler's theorem gives quick 1-mark answers.

## Intuition

For $f(x, y)$, the partial derivative $\partial f/\partial x$ is the slope when you walk in the $x$ direction **holding $y$ fixed**. Each partial derivative is an ordinary derivative with the other variables frozen.

## Formal definitions

$$
f_x = \frac{\partial f}{\partial x} = \lim_{h\to0}\frac{f(x+h, y) - f(x, y)}{h}, \qquad f_{xy} = \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right).
$$

**Clairaut:** if the mixed partials are continuous, $f_{xy} = f_{yx}$.

## Key results

**Chain rule.** For $z = f(x, y)$ with $x = x(t)$, $y = y(t)$:
$$
\frac{dz}{dt} = f_x\frac{dx}{dt} + f_y\frac{dy}{dt}.
$$

**Total differential:** $dz = f_x\,dx + f_y\,dy$, used for error estimates: $\dfrac{\Delta z}{z} \approx$ the sum of the relative errors weighted by the exponents (for products of powers).

**Euler's theorem.** If $f$ is homogeneous of degree $n$, i.e. $f(tx, ty) = t^nf(x, y)$:
$$
xf_x + yf_y = nf, \qquad x^2f_{xx} + 2xyf_{xy} + y^2f_{yy} = n(n-1)f .
$$

**Laplace equation:** $u_{xx} + u_{yy} = 0$ (harmonic functions, e.g. $e^x\cos y$, $x^2 - y^2$).

## Worked examples

**Example 1.** $f = x^2y$: $f_x = 2xy$, $f_y = x^2$, $f_{xy} = 2x$, $f_{xx} = 2y$.

**Example 2.** $f = x^3y^2$: $f_{xy} = 6x^2y$, which is 12 at $(1, 2)$.

**Example 3.** $f$ is homogeneous of degree 3 with $f(2, 1) = 5$: $xf_x + yf_y = 15$ at $(2, 1)$.

**Example 4.** $u = e^x\cos y$: $u_{xx} = e^x\cos y$ and $u_{yy} = -e^x\cos y$ ⇒ $u$ is harmonic.

## Common GATE traps

- Forgetting to hold the other variables constant (for $f = xy$, $f_x = y$, not 1).
- Applying Euler's theorem to non-homogeneous functions.

## Summary

- Partial derivative = ordinary derivative with the other variables frozen; mixed partials commute.
- Chain rule adds a term for each path; Euler: $xf_x + yf_y = nf$.
