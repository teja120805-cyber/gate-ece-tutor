# Superheterodyne Receivers

> Local-oscillator frequency, image frequency and image-rejection ratio are classic numericals.

## Intuition

Building sharp, tunable filters at every RF frequency is hard. A superheterodyne receiver instead **mixes** the incoming signal with a tunable local oscillator (LO), shifting every station to the same fixed **intermediate frequency (IF)**, where excellent fixed filters and amplifiers do the work.

## Key results

- $f_{IF} = |f_{LO} - f_{RF}|$. Usually high-side injection: $f_{LO} = f_{RF} + f_{IF}$.
- **Image frequency:** another frequency that also mixes to the IF:
$$
f_{image} = f_{RF} + 2f_{IF}\ \ (\text{high-side LO}).
$$
  It must be rejected **before** the mixer, by the RF stage.
- **Image-rejection ratio** of a single tuned circuit with quality factor $Q$:
$$
\alpha = \sqrt{1 + Q^2\rho^2}, \qquad \rho = \frac{f_{si}}{f_s} - \frac{f_s}{f_{si}}.
$$
  Cascaded stages multiply their $\alpha$ values.
- A **higher IF** gives better image rejection (the image is further away); a **lower IF** gives better adjacent-channel selectivity and gain. Double conversion gets both.
- Standard values: AM broadcast IF = 455 kHz; FM broadcast IF = 10.7 MHz.
- **Tracking:** the LO and RF tuning must move together (ganged capacitors).

## Worked examples

**Example 1.** $f_{RF} = 1000$ kHz, IF 455 kHz: $f_{LO} = 1455$ kHz and the image is at 1910 kHz.

**Example 2.** With $Q = 50$: $\rho = 1.91 - 0.5236 = 1.386$, so $\alpha = \sqrt{1 + (69.3)^2} \approx 69.3$ (36.8 dB).

## Common GATE traps

- Image $= f_{RF} + 2f_{IF}$, not $f_{RF} + f_{IF}$.
- The IF filter cannot remove the image — after mixing, it sits exactly at the IF.

## Summary

- Mix to a fixed IF; $f_{LO} = f_{RF} + f_{IF}$.
- Image $= f_{RF} + 2f_{IF}$, rejected by RF selectivity: $\alpha = \sqrt{1 + Q^2\rho^2}$.
