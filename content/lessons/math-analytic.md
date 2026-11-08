# Analytic Functions

> Cauchy–Riemann equations, harmonic functions, and finding a harmonic conjugate are standard GATE questions.

## Intuition

A complex function is **analytic** where it has a derivative that does not depend on the direction of approach. This is a strong condition: it ties the real and imaginary parts tightly together and makes both of them harmonic.

## Formal definitions

$f(z) = u(x, y) + jv(x, y)$ is analytic in a region if it is differentiable at every point there. With continuous partial derivatives, this is equivalent to the **Cauchy–Riemann (CR) equations**:

$$
u_x = v_y, \qquad u_y = -v_x .
$$

Then $f'(z) = u_x + jv_x$.

## Key results

- If $f$ is analytic, $u$ and $v$ are **harmonic**: $\nabla^2u = \nabla^2v = 0$. $v$ is the **harmonic conjugate** of $u$.
- Polar form of the CR equations: $u_r = \frac{1}{r}v_\theta$, $v_r = -\frac1r u_\theta$.
- Analytic everywhere (entire): polynomials, $e^z$, $\sin z$, $\cos z$.
- Analytic nowhere: $\bar z$, $|z|^2$ (differentiable only at 0), $\operatorname{Re}z$.
- $1/z$ is analytic except at $z = 0$.
- **Milne–Thomson:** to build $f$ from $u$, set $f'(z) = u_x(z, 0) - ju_y(z, 0)$ and integrate.
- The level curves $u = c_1$ and $v = c_2$ are orthogonal.

## Worked examples

**Example 1.** $f = z^2 = (x^2 - y^2) + j2xy$: $u_x = 2x = v_y$ and $u_y = -2y = -v_x$ ✓. Analytic, with $f' = 2z$.

**Example 2.** $u = x^2 - y^2$: from $v_y = u_x = 2x$, $v = 2xy + g(x)$; then $v_x = 2y + g' = -u_y = 2y$ ⇒ $g = C$. So $v = 2xy + C$, and $v(1, 1) = 2$ when $C = 0$.

**Example 3.** $u = e^x\cos y$ ⇒ $v = e^x\sin y$ and $f = e^z$.

**Example 4.** $f = \bar z = x - jy$: $u_x = 1$, $v_y = -1$ ⇒ the CR equations fail everywhere.

## Common GATE traps

- A sign error in the second CR equation ($u_y = -v_x$).
- Concluding that $|f|$ or $\operatorname{Re}f$ is analytic because $f$ is.

## Summary

- Analytic ⇔ CR equations (with continuous partials); $f' = u_x + jv_x$.
- Real and imaginary parts are harmonic conjugates.
