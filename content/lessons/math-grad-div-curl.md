# Gradient, Divergence and Curl

> A high-yield Mathematics topic and the language of Maxwell's equations.

## Intuition

- **Gradient** $\nabla\phi$: points in the direction of steepest increase of a scalar field; its magnitude is that maximum rate.
- **Divergence** $\nabla\cdot\mathbf F$: net outflow per unit volume — a source (positive) or sink (negative) density.
- **Curl** $\nabla\times\mathbf F$: local rotation — how much a tiny paddle wheel would spin, and about which axis.

## Formal definitions (Cartesian)

$$
\nabla\phi = \left(\frac{\partial\phi}{\partial x}, \frac{\partial\phi}{\partial y}, \frac{\partial\phi}{\partial z}\right), \qquad
\nabla\cdot\mathbf F = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}
$$

$$
\nabla\times\mathbf F = \begin{vmatrix}\hat i & \hat j & \hat k\\ \partial_x & \partial_y & \partial_z\\ F_x & F_y & F_z\end{vmatrix}, \qquad \nabla^2\phi = \nabla\cdot\nabla\phi .
$$

## Key results

- **Directional derivative** along a unit vector $\hat{\mathbf u}$: $D_u\phi = \nabla\phi\cdot\hat{\mathbf u}$. Its maximum value is $|\nabla\phi|$, along $\nabla\phi$.
- $\nabla\phi$ is normal to the level surface $\phi = c$.
- **Identities:** $\nabla\times(\nabla\phi) = \mathbf 0$; $\nabla\cdot(\nabla\times\mathbf F) = 0$; $\nabla\times(\nabla\times\mathbf F) = \nabla(\nabla\cdot\mathbf F) - \nabla^2\mathbf F$.
- **Solenoidal:** $\nabla\cdot\mathbf F = 0$ (e.g. the magnetic field). **Irrotational:** $\nabla\times\mathbf F = \mathbf 0$ (e.g. the electrostatic field).
- $\nabla\cdot\mathbf r = 3$, $\nabla\times\mathbf r = \mathbf 0$, $\nabla r = \hat{\mathbf r}$, $\nabla(1/r) = -\mathbf r/r^3$.

## Worked examples

**Example 1.** $\phi = x^2 + y^2 + z^2$ at $(1, 1, 1)$: $\nabla\phi = (2, 2, 2)$. The directional derivative along $\hat i$ is 2; the maximum rate is $2\sqrt3$.

**Example 2.** $\phi = xyz$ at $(1, 2, 3)$: $\nabla\phi = (yz, xz, xy) = (6, 3, 2)$, with magnitude $\sqrt{49} = 7$.

**Example 3.** $\mathbf F = (-y, x, 0)$: $\nabla\times\mathbf F = (0, 0, 1 - (-1)) = (0, 0, 2)$ — uniform rotation. $\nabla\cdot\mathbf F = 0$.

## Common GATE traps

- Using a non-unit direction vector in the directional derivative.
- Applying Cartesian formulas in cylindrical or spherical coordinates without the scale factors.

## Summary

- Gradient → steepest ascent; divergence → source density; curl → rotation.
- curl grad = 0 and div curl = 0; $D_u\phi = \nabla\phi\cdot\hat{\mathbf u}$.
