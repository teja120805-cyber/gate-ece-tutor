# Maxwell's Equations: Differential and Integral Forms

> Interpreting each equation, displacement current, and the conduction-to-displacement current ratio are standard EM questions.

## Intuition

Four laws describe all classical electromagnetism:
- electric charges are sources of electric flux (Gauss);
- there are no magnetic charges (no monopoles);
- a changing magnetic field induces a circulating electric field (Faraday);
- currents **and changing electric fields** induce a circulating magnetic field (Ampère–Maxwell).

Maxwell's **displacement current** term is what makes electromagnetic waves possible.

## The equations

| Law | Differential form | Integral form |
|---|---|---|
| Gauss (electric) | $\nabla\cdot\mathbf D = \rho_v$ | $\oint\mathbf D\cdot d\mathbf S = Q_{enc}$ |
| Gauss (magnetic) | $\nabla\cdot\mathbf B = 0$ | $\oint\mathbf B\cdot d\mathbf S = 0$ |
| Faraday | $\nabla\times\mathbf E = -\dfrac{\partial\mathbf B}{\partial t}$ | $\oint\mathbf E\cdot d\mathbf l = -\dfrac{d}{dt}\int\mathbf B\cdot d\mathbf S$ |
| Ampère–Maxwell | $\nabla\times\mathbf H = \mathbf J + \dfrac{\partial\mathbf D}{\partial t}$ | $\oint\mathbf H\cdot d\mathbf l = I_{enc} + \dfrac{d}{dt}\int\mathbf D\cdot d\mathbf S$ |

Constitutive relations: $\mathbf D = \varepsilon\mathbf E$, $\mathbf B = \mu\mathbf H$, $\mathbf J = \sigma\mathbf E$.

## Key results

- **Displacement current density** $\mathbf J_d = \partial\mathbf D/\partial t$; in phasor form $j\omega\varepsilon\mathbf E$.
- **Ratio of conduction to displacement current** $= \sigma/(\omega\varepsilon)$ (the loss tangent):
  - $\gg 1$: good conductor;
  - $\ll 1$: good dielectric.
- **Continuity equation** $\nabla\cdot\mathbf J = -\partial\rho_v/\partial t$ follows from taking the divergence of Ampère–Maxwell.
- Phasor (time-harmonic) form: replace $\partial/\partial t$ with $j\omega$.
- The integral forms come from the differential forms via the divergence and Stokes theorems.

## Worked examples

**Example 1.** Sea water ($\sigma = 4$ S/m, $\varepsilon_r = 81$) at 1 MHz: $\omega\varepsilon = 2\pi\times10^6\times81\times8.854\times10^{-12} = 4.51\times10^{-3}$, so the ratio is $\approx 888$ — a good conductor.

**Example 2.** A capacitor being charged: the conduction current in the wires continues as displacement current between the plates.

## Common GATE traps

- Forgetting the displacement current in Ampère's law (it fails for time-varying fields without it).
- Misreading $\nabla\cdot\mathbf B = 0$ as saying $\mathbf B = 0$.

## Summary

- $\nabla\cdot\mathbf D = \rho$, $\nabla\cdot\mathbf B = 0$, $\nabla\times\mathbf E = -\dot{\mathbf B}$, $\nabla\times\mathbf H = \mathbf J + \dot{\mathbf D}$.
- Loss tangent $\sigma/\omega\varepsilon$ separates conductors from dielectrics.
