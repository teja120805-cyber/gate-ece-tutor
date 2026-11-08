# Multiple Integrals

> Double integrals over regions, change of order, and polar coordinates are tested regularly; triple integrals appear for volumes.

## Intuition

A double integral adds up $f(x, y)$ over a region. If $f = 1$ it gives the area; otherwise it is the volume under the surface $z = f(x, y)$. You can slice the region either way — vertical strips or horizontal strips — and the answer is the same.

## Formal definitions

$$
\iint_R f\,dA = \int_{x=a}^{b}\int_{y=g_1(x)}^{g_2(x)} f(x, y)\,dy\,dx .
$$

The inner limits may depend on the outer variable; the outer limits must be constants.

**Change of variables:** $dx\,dy = |J|\,du\,dv$ with $J = \dfrac{\partial(x, y)}{\partial(u, v)}$.
- Polar: $x = r\cos\theta$, $y = r\sin\theta$, $dA = r\,dr\,d\theta$.
- Cylindrical: $dV = r\,dr\,d\theta\,dz$. Spherical: $dV = r^2\sin\theta\,dr\,d\theta\,d\phi$.

## Key results

- **Change of order:** sketch the region, then re-describe it with the other variable outermost. Example: $\int_0^1\int_x^1 f\,dy\,dx = \int_0^1\int_0^y f\,dx\,dy$ (the triangle $0 \le x \le y \le 1$).
- Area between curves: $\int_a^b[g_2(x) - g_1(x)]\,dx$.
- Separable integrand over a rectangle: $\iint f(x)g(y) = \left(\int f\right)\left(\int g\right)$.

## Worked examples

**Example 1.** $\int_0^1\int_0^2 xy\,dy\,dx = \int_0^1 2x\,dx = 1$.

**Example 2.** The area between $y = x$ and $y = x^2$: $\int_0^1(x - x^2)\,dx = \frac16$.

**Example 3.** $\iint_{x^2 + y^2 \le 1}(x^2 + y^2)\,dA = \int_0^{2\pi}\int_0^1 r^2\cdot r\,dr\,d\theta = 2\pi\cdot\frac14 = \frac{\pi}{2}$.

**Example 4.** The volume under $z = 4 - x^2 - y^2$ above $z = 0$: $\int_0^{2\pi}\int_0^2(4 - r^2)r\,dr\,d\theta = 2\pi[2r^2 - r^4/4]_0^2 = 8\pi$.

## Common GATE traps

- Forgetting the Jacobian $r$ in polar coordinates.
- Keeping the original limits after changing the order of integration.

## Summary

- Inner limits may depend on the outer variable; sketch the region before changing order.
- Polar: $dA = r\,dr\,d\theta$; circular regions become rectangles in $(r, \theta)$.
