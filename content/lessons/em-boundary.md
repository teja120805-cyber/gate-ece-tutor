# Boundary Conditions

> Finding field components on the other side of an interface is a common 1- or 2-mark numerical.

## Intuition

At an interface between two materials, Maxwell's equations applied to a thin pillbox (for normal components) and a thin loop (for tangential components) tell us which components are continuous and which jump by the surface charge or surface current.

## The conditions

| Component | Condition |
|---|---|
| tangential $\mathbf E$ | continuous: $E_{t1} = E_{t2}$ |
| tangential $\mathbf H$ | $\hat{\mathbf n}\times(\mathbf H_1 - \mathbf H_2) = \mathbf J_s$; continuous if there is no surface current |
| normal $\mathbf D$ | $D_{n1} - D_{n2} = \rho_s$; continuous if there is no surface charge |
| normal $\mathbf B$ | continuous: $B_{n1} = B_{n2}$ |

**Consequences:**
- Dielectric–dielectric: $\varepsilon_1E_{n1} = \varepsilon_2E_{n2}$ and $E_{t1} = E_{t2}$, so the field refracts: $\dfrac{\tan\theta_1}{\tan\theta_2} = \dfrac{\varepsilon_1}{\varepsilon_2}$.
- Magnetic: $\mu_1H_{n1} = \mu_2H_{n2}$ and $H_{t1} = H_{t2}$ (no surface current).
- **Perfect conductor:** $\mathbf E = 0$ inside; $E_t = 0$ at the surface; $D_n = \rho_s$; $H_t = J_s$; $B_n = 0$.

## Worked examples

**Example 1.** Medium 1 ($\varepsilon_r = 2$) has $E_{n1} = 6$ V/m. With no surface charge, medium 2 ($\varepsilon_r = 3$) has $E_{n2} = 2\times6/3 = 4$ V/m.

**Example 2.** $\mu_{r1} = 1$, $\mu_{r2} = 4$, $H_{n1} = 8$ A/m: $B_n$ is continuous ⇒ $H_{n2} = 8/4 = 2$ A/m.

**Example 3.** $\mathbf E_1 = 3\hat x + 4\hat z$ V/m in medium 1 ($\varepsilon_{r1} = 2$) with the interface at $z = 0$ (normal $\hat z$), and $\varepsilon_{r2} = 4$: $E_{x2} = 3$ (tangential), $E_{z2} = 2\times4/4 = 2$, so $\mathbf E_2 = 3\hat x + 2\hat z$.

## Common GATE traps

- Mixing up which components are continuous: tangential E and H, normal D and B.
- Forgetting that $E_t = 0$ at a perfect conductor.

## Summary

- $E_t$ and $B_n$ are continuous; $D_n$ jumps by $\rho_s$; $H_t$ jumps by $J_s$.
- At a perfect conductor, $E_t = 0$ and $B_n = 0$.
