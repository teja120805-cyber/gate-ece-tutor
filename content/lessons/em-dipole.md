# Dipole and Monopole Antennas

> Radiation resistance, directivity and the radiation pattern of Hertzian and half-wave dipoles and of monopoles are asked regularly.

## Intuition

An oscillating current radiates. A short (Hertzian) dipole radiates most strongly broadside — perpendicular to its axis — and not at all along the axis, giving a doughnut-shaped pattern. A half-wave dipole resonates and presents a convenient, mostly resistive impedance. A monopole over a ground plane behaves like half of a dipole (by image theory).

## Key results

| Antenna | Radiation resistance | Directivity |
|---|---|---|
| Hertzian (short, uniform current), length $dl \ll \lambda$ | $R_r = 80\pi^2\left(\dfrac{dl}{\lambda}\right)^2$ | 1.5 (1.76 dBi) |
| short dipole (triangular current) | $\frac14$ of the Hertzian value | 1.5 |
| half-wave dipole | $\approx 73\,\Omega$ (input $\approx 73 + j42.5\,\Omega$; shortened slightly to resonate) | 1.64 (2.15 dBi) |
| quarter-wave monopole over ground | $\approx 36.5\,\Omega$ (half the dipole) | twice the dipole: 3.28 (5.16 dBi) |

**General antenna relations:**
- Radiation efficiency $\eta = \dfrac{R_r}{R_r + R_{loss}}$; gain $G = \eta D$.
- Effective aperture $A_e = \dfrac{\lambda^2}{4\pi}G$.
- Friis transmission: $P_r = P_tG_tG_r\left(\dfrac{\lambda}{4\pi R}\right)^2$.
- **Far field:** $E \propto 1/r$, power density $\propto 1/r^2$. Far-field distance $r > 2D^2/\lambda$.
- Hertzian pattern $\propto\sin\theta$ (half-power beamwidth 90°); half-wave dipole beamwidth 78°.

## Worked examples

**Example 1.** $dl = \lambda/50$: $R_r = 80\pi^2(0.02)^2 = 0.316\,\Omega$ — tiny, so short antennas are inefficient.

**Example 2.** A half-wave dipole has $D = 1.64$, i.e. 2.15 dBi.

**Example 3.** A lossless half-wave dipole at 300 MHz ($\lambda = 1$ m): $A_e = \frac{1}{4\pi}\times1.64 = 0.13$ m².

## Common GATE traps

- Thinking the radiation resistance of a short dipole grows as it gets shorter (it falls as $(dl/\lambda)^2$).
- Expecting maximum radiation along the dipole axis (that is a null).

## Summary

- Hertzian: $R_r = 80\pi^2(dl/\lambda)^2$, $D = 1.5$. Half-wave: 73 Ω, $D = 1.64$. Monopole: 36.5 Ω.
- Null along the axis; far-field $E \propto 1/r$.
