# Line, Surface and Volume Integrals

> Work done by a force, circulation, and flux through a surface are the physical meanings tested; these integrals lead straight into Gauss's and Stokes' theorems and Maxwell's equations.

## Intuition

- A **line integral** $\int_C \mathbf F\cdot d\mathbf r$ adds up the component of a field along a path — the work done moving through a force field.
- A **surface integral** $\iint_S \mathbf F\cdot d\mathbf S$ measures how much field passes **through** a surface — the flux.
- A **volume integral** adds a scalar density over a volume (total charge or mass).

## Formal definitions

With the curve parametrised as $\mathbf r(t)$, $t \in [a, b]$:
$$
\int_C \mathbf F\cdot d\mathbf r = \int_a^b \mathbf F(\mathbf r(t))\cdot\mathbf r'(t)\,dt = \int_C (F_1\,dx + F_2\,dy + F_3\,dz).
$$

Surface integral: $\iint_S \mathbf F\cdot\hat{\mathbf n}\,dS$, where $\hat{\mathbf n}$ is the unit normal (outward for closed surfaces).

## Key results

**Conservative fields** (on a simply connected domain), equivalent conditions:
- $\nabla\times\mathbf F = \mathbf 0$;
- $\mathbf F = \nabla\phi$ for some potential $\phi$;
- $\int_A^B \mathbf F\cdot d\mathbf r = \phi(B) - \phi(A)$ (independent of path);
- $\oint \mathbf F\cdot d\mathbf r = 0$ around every closed loop.

**Area from a line integral:** $\text{Area} = \frac12\oint(x\,dy - y\,dx)$.

**Flux shortcuts:** for a flat face with constant normal component, flux = (normal component) × area.

## Worked examples

**Example 1.** $\int_C (x\,dx + y\,dy)$ from $(0, 0)$ to $(1, 2)$: the field is $\nabla\left(\frac{x^2 + y^2}{2}\right)$, so the answer is $\frac{1 + 4}{2} = 2.5$ for any path.

**Example 2.** $\oint(-y\,dx + x\,dy)$ counter-clockwise around the unit circle: with $x = \cos t$, $y = \sin t$, the integrand is $\sin^2t + \cos^2t = 1$, giving $2\pi$ (twice the enclosed area).

**Example 3.** Flux of $\mathbf F = z\,\hat{\mathbf k}$ through the top face $z = 1$ of the unit cube: $F_z = 1$ over area 1 ⇒ flux 1.

## Common GATE traps

- Orientation: reversing the path direction flips the sign of a line integral.
- Assuming path independence without checking that the curl is zero.

## Summary

- Line integral = work/circulation; surface integral = flux.
- Curl-free ⇒ conservative ⇒ path independent; use the potential.
- $\frac12\oint(x\,dy - y\,dx)$ = enclosed area.
