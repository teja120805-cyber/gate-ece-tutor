# Light Propagation in Optical Fibres

> Numerical aperture, acceptance angle, V-number and the single-mode condition are standard numericals.

## Intuition

An optical fibre has a glass **core** surrounded by a **cladding** of slightly lower refractive index. Light hitting the core–cladding boundary beyond the critical angle undergoes total internal reflection and stays trapped. Only rays entering within a certain cone — the **acceptance cone** — are guided.

## Key results (core index $n_1$, cladding index $n_2 < n_1$)

$$
\text{NA} = \sqrt{n_1^2 - n_2^2} = n_0\sin\theta_a \approx n_1\sqrt{2\Delta}, \qquad \Delta = \frac{n_1 - n_2}{n_1}.
$$

- $\theta_a$ is the maximum acceptance (half-) angle in the outside medium ($n_0 = 1$ for air).
- Critical angle at the core–cladding boundary: $\sin\theta_c = n_2/n_1$.
- **Normalised frequency:** $V = \dfrac{2\pi a}{\lambda}\text{NA}$ ($a$ = core radius).
  - Single-mode condition: $V < 2.405$.
  - Number of modes for step index with large $V$: $M \approx V^2/2$ (graded index: $V^2/4$).
- **Dispersion:**
  - modal (multimode) dispersion is reduced by graded-index profiles and eliminated in single-mode fibre;
  - chromatic (material + waveguide) dispersion is near zero at about 1.31 µm in standard fibre.
- **Loss windows:** 0.85, 1.31 and 1.55 µm (minimum loss ≈ 0.2 dB/km at 1.55 µm).

## Worked examples

**Example 1.** $n_1 = 1.5$, $n_2 = 1.48$: NA $= \sqrt{2.25 - 2.1904} = 0.244$; $\theta_a = \sin^{-1}0.244 = 14.1°$.

**Example 2.** $a = 4\ \mu$m, NA = 0.1, $\lambda = 1.3\ \mu$m: $V = \frac{2\pi\times4\times0.1}{1.3} = 1.93 < 2.405$ ⇒ single mode.

**Example 3.** A step-index fibre with $V = 20$ supports about $V^2/2 = 200$ modes.

## Common GATE traps

- Making the core index lower than the cladding index (guidance would fail).
- Using the diameter instead of the radius in $V$.

## Summary

- NA $= \sqrt{n_1^2 - n_2^2} = \sin\theta_a$.
- $V = 2\pi a\,\text{NA}/\lambda$; single mode if $V < 2.405$; modes $\approx V^2/2$.
