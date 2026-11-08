# Gauss's, Green's and Stokes' Theorems

> These theorems turn hard surface or line integrals into easy volume or area integrals. They are tested in Mathematics and underlie the integral forms of Maxwell's equations.

## Intuition

Each theorem says that **the total of the "derivative" inside a region equals the flow across its boundary**:
- the sources inside a volume equal the net flux out through its closed surface (Gauss);
- the rotation inside a surface equals the circulation around its edge (Stokes; Green is the planar case).

## Formal statements

**Gauss (divergence) theorem** — $V$ bounded by a closed surface $S$ with outward normal:
$$
\oiint_S \mathbf F\cdot d\mathbf S = \iiint_V \nabla\cdot\mathbf F\,dV .
$$

**Stokes' theorem** — an open surface $S$ with boundary curve $C$ (right-hand rule orientation):
$$
\oint_C \mathbf F\cdot d\mathbf r = \iint_S (\nabla\times\mathbf F)\cdot d\mathbf S .
$$

**Green's theorem** — a plane region $R$ with counter-clockwise boundary $C$:
$$
\oint_C (M\,dx + N\,dy) = \iint_R\left(\frac{\partial N}{\partial x} - \frac{\partial M}{\partial y}\right)dA .
$$

## Key results

- If $\nabla\cdot\mathbf F = k$ (a constant), the flux out of any closed surface is $k\times$ the volume.
- The flux of $\mathbf r = (x, y, z)$ through a sphere of radius $R$ is $3\cdot\frac43\pi R^3 = 4\pi R^3$.
- Area $= \frac12\oint(x\,dy - y\,dx)$ (Green with $N = x/2$, $M = -y/2$).
- Curl-free fields have zero circulation around every closed loop (in a simply connected domain).

## Worked examples

**Example 1.** Flux of $\mathbf F = (x, y, z)$ out of the unit sphere: $\iiint 3\,dV = 3\cdot\frac43\pi = 4\pi \approx 12.57$.

**Example 2.** $\mathbf F = (2x, 3y, z)$ over the unit cube: $\nabla\cdot\mathbf F = 6$, so the flux is $6 \times 1 = 6$.

**Example 3.** Green: $\oint\frac12(x\,dy - y\,dx)$ around a circle of radius 2 equals the area $4\pi$.

## Common GATE traps

- Orientation: outward normal for Gauss, counter-clockwise for Green.
- Applying Gauss's theorem to an open surface — close it first, then subtract the added faces.

## Summary

- Gauss: flux = $\iiint\nabla\cdot\mathbf F$. Stokes: circulation = $\iint(\nabla\times\mathbf F)\cdot d\mathbf S$.
- Green: $\oint M\,dx + N\,dy = \iint(N_x - M_y)\,dA$.
