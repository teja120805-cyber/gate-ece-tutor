# Diffusion Current and the Einstein Relation

> Diffusion drives current in p-n junctions and BJTs. GATE asks for diffusion current densities and $D$ from $\mu$.

## Intuition

Carriers wander randomly. Where they are crowded, more of them wander out than wander in, so there is a net flow from high to low concentration — **diffusion** — even without any electric field. A concentration **gradient** is required.

## Formal definitions

$$
J_{n,diff} = qD_n\frac{dn}{dx}, \qquad J_{p,diff} = -qD_p\frac{dp}{dx}.
$$

Electrons diffuse down the gradient but carry negative charge, so the electron diffusion current points **up** the gradient of $n$. Holes diffuse down the gradient and their current points down the gradient of $p$.

**Total current:** $J_n = qn\mu_nE + qD_n\frac{dn}{dx}$, $J_p = qp\mu_pE - qD_p\frac{dp}{dx}$.

## Key results

**Einstein relation** (non-degenerate semiconductors):
$$
\frac{D}{\mu} = \frac{kT}{q} = V_T \approx 25.9\ \text{mV at 300 K}.
$$
For Si: $D_n \approx 35$ cm²/s and $D_p \approx 12.4$ cm²/s.

- In equilibrium, drift and diffusion cancel exactly (zero net current), which is why a built-in field appears in a p-n junction.
- Diffusion and drift both respond to the same scattering, which is why $D$ and $\mu$ are linked.

## Worked examples

**Example 1.** $\mu_n = 1350$ cm²/V·s: $D_n = 0.0259\times1350 = 35.0$ cm²/s.

**Example 2.** $n$ falls linearly from $10^{16}$ to 0 over 1 µm, with $D_n = 35$:
$|J| = qD_n\left|\frac{dn}{dx}\right| = 1.6\times10^{-19}\times35\times\frac{10^{16}}{10^{-4}} = 560$ A/cm².
The electrons move toward lower $n$; the current flows the opposite way.

## Common GATE traps

- Sign conventions for electron versus hole diffusion currents.
- Applying the Einstein relation to degenerate (very heavily doped) material.

## Summary

- Diffusion needs a gradient: $J_n = qD_n\,dn/dx$, $J_p = -qD_p\,dp/dx$.
- $D/\mu = V_T$.
