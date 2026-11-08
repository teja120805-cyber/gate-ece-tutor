# Propagation in Conductors and Skin Depth

> Skin depth, attenuation and surface resistance of good conductors are common numericals.

## Intuition

In a good conductor, a wave induces currents that oppose it, so the fields decay exponentially within a thin surface layer. At high frequencies, current crowds into this "skin", raising the effective resistance of wires.

## Key results (good conductor, $\sigma \gg \omega\varepsilon$)

$$
\alpha = \beta = \sqrt{\pi f\mu\sigma}, \qquad \delta = \frac{1}{\alpha} = \frac{1}{\sqrt{\pi f\mu\sigma}}.
$$

- Fields fall by a factor $e^{-z/\delta}$: to 37% at $z = \delta$ and about 0.7% at $5\delta$.
- $\delta \propto 1/\sqrt f$ and $\delta \propto 1/\sqrt\sigma$.
- Wavelength inside the conductor: $\lambda = 2\pi\delta$; phase velocity $v_p = \omega\delta$ (very slow).
- $\eta = (1 + j)\dfrac{1}{\sigma\delta}$: **E and H are 45° out of phase**.
- **Surface resistance** $R_s = \dfrac{1}{\sigma\delta} = \sqrt{\dfrac{\pi f\mu}{\sigma}}$ (Ω per square).
- AC resistance of a round wire of radius $a \gg \delta$: $R_{ac} \approx \dfrac{L}{\sigma\cdot2\pi a\delta}$.
- Copper ($\sigma = 5.8\times10^7$ S/m): $\delta \approx 66\ \mu\text{m}/\sqrt{f(\text{MHz})}$ — 8.5 mm at 60 Hz, 2.1 µm at 1 GHz.

## Worked examples

**Example 1.** Copper at 1 MHz: $\delta = \dfrac{1}{\sqrt{\pi\times10^6\times4\pi\times10^{-7}\times5.8\times10^7}} = 66\ \mu$m.

**Example 2.** Quadrupling the frequency halves the skin depth.

**Example 3.** After 3 skin depths the field is $e^{-3} = 0.0498$ (about 5%) of its surface value.

## Common GATE traps

- Using $\delta = 1/\sqrt{2\pi f\mu\sigma}$ — the correct expression is $1/\sqrt{\pi f\mu\sigma}$, equivalently $\sqrt{2/(\omega\mu\sigma)}$.
- Applying good-conductor formulas when $\sigma/\omega\varepsilon$ is not large.

## Summary

- $\delta = 1/\sqrt{\pi f\mu\sigma} = 1/\alpha$; it shrinks with frequency and conductivity.
- E and H are 45° out of phase; $R_s = 1/(\sigma\delta)$.
