# Direct and Indirect Band-Gap Semiconductors

> Why GaAs makes LEDs and lasers while Si does not, and how to compute the emission or cutoff wavelength from $E_g$.

## Intuition

An electron has both energy and **crystal momentum** ($k$). To drop from the conduction band to the valence band and emit a photon, it must conserve both. A photon carries almost no momentum.
- **Direct gap:** the CB minimum and VB maximum are at the **same** $k$, so the electron can drop straight down, emitting light efficiently.
- **Indirect gap:** they occur at **different** $k$, so a **phonon** (lattice vibration) must also take part. That is unlikely, so light emission is weak and recombination happens mostly through traps, producing heat.

## Key results

| Type | Examples | Uses |
|---|---|---|
| direct | GaAs, InP, GaN, InGaAs | LEDs, laser diodes |
| indirect | Si, Ge, GaP | ICs, photodetectors, solar cells (they absorb light well enough when thick) |

**Photon energy and wavelength:**
$$
\lambda\ (\mu\text{m}) = \frac{1.24}{E\ (\text{eV})}, \qquad E = h\nu = \frac{hc}{\lambda}.
$$

- **Emission wavelength** of an LED $\approx 1.24/E_g$.
- **Cutoff wavelength** of a detector: photons need $E \ge E_g$, so $\lambda \le \lambda_c = 1.24/E_g$. Longer wavelengths are not absorbed.
- Absorption is strong near the gap in direct materials and weaker in indirect ones (indirect absorption needs phonon assistance).

## Worked examples

**Example 1.** GaAs ($E_g = 1.42$ eV) emits at $\lambda = 1.24/1.42 = 0.873\ \mu$m (873 nm, near-infrared).

**Example 2.** The Si detector cutoff is $\lambda_c = 1.24/1.12 = 1.107\ \mu$m, so Si cannot detect 1.55 µm fibre-optic light. InGaAs is used instead.

## Common GATE traps

- Mixing up eV and J (1 eV $= 1.6\times10^{-19}$ J).
- Thinking that indirect semiconductors cannot absorb light — they can, just less efficiently near the edge.

## Summary

- Direct gap ⇒ efficient radiative recombination (LEDs/lasers); indirect gap ⇒ a phonon is needed (Si, Ge).
- $\lambda(\mu\text{m}) = 1.24/E(\text{eV})$; detectors cut off above $1.24/E_g$.
