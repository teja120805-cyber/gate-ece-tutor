# Oscillators

> The Barkhausen criterion, and the frequency and required gain of RC phase-shift, Wien-bridge and LC oscillators, appear almost every year.

## Intuition

An oscillator is an amplifier that feeds back exactly enough of its own output, **in phase**, to sustain itself with no input. At one frequency the loop returns the signal with the same amplitude and phase, so it keeps circulating. In practice the loop gain is set slightly above 1 to start the oscillation, and non-linearity limits the amplitude.

## Barkhausen criterion

For a loop gain $A\beta(j\omega)$:
$$
|A\beta| = 1, \qquad \angle A\beta = 0° \ (\text{or } 360°).
$$

## Key results

| Oscillator | Frequency | Required amplifier gain |
|---|---|---|
| RC phase-shift (3 identical RC sections, high-pass type) | $f = \dfrac{1}{2\pi RC\sqrt6}$ | $|A| = 29$ (inverting) |
| Wien bridge | $f = \dfrac{1}{2\pi RC}$ | $A = 3$ (non-inverting, $1 + R_f/R_1 = 3$) |
| Colpitts (capacitive divider) | $f = \dfrac{1}{2\pi\sqrt{LC_{eq}}}$, $C_{eq} = \dfrac{C_1C_2}{C_1 + C_2}$ | $g_mR \ge C_2/C_1$ (configuration-dependent) |
| Hartley (inductive divider) | $f = \dfrac{1}{2\pi\sqrt{(L_1 + L_2 + 2M)C}}$ | — |
| Crystal | very stable (high Q); between the series and parallel resonances | — |

- The RC phase-shift network gives 180°, and the inverting amplifier gives the other 180°.
- The Wien network has zero phase shift and a transfer ratio of $1/3$ at $f_0$.

## Worked examples

**Example 1.** Wien bridge with $R = 10\,\text{k}\Omega$, $C = 10$ nF: $f = 1591.5$ Hz; it needs $R_f = 2R_1$ (gain 3).

**Example 2.** RC phase-shift with $R = 10\,\text{k}\Omega$, $C = 10$ nF: $f = \dfrac{1591.5}{\sqrt6} = 650$ Hz; the amplifier needs a gain magnitude of at least 29.

**Example 3.** Colpitts with $L = 10\ \mu$H and $C_1 = C_2 = 2$ nF: $C_{eq} = 1$ nF, so $f = \dfrac{1}{2\pi\sqrt{10^{-14}}} = 1.59$ MHz.

## Common GATE traps

- Using $C_1 + C_2$ instead of the series combination in Colpitts.
- Wrong gain values: Wien needs 3, phase-shift needs 29.

## Summary

- Barkhausen: loop gain 1 at 0° phase.
- Wien: $1/(2\pi RC)$, gain 3. RC phase-shift: $1/(2\pi RC\sqrt6)$, gain 29. LC: $1/(2\pi\sqrt{LC})$.
