# Clipping and Clamping Circuits

> Sketching the output of diode wave-shaping circuits and finding the output levels are common 1- and 2-mark questions.

## Intuition

- A **clipper** cuts off the part of a waveform above (or below) a set level — like a ceiling.
- A **clamper** shifts the entire waveform up or down without changing its shape: a capacitor charges to a DC offset, then holds it.

## Clippers

- **Shunt clipper** (diode + battery $V_B$ across the output, with a series resistor): when the diode conducts, the output is held at $V_B + V_\gamma$ (with $V_\gamma = 0$ for an ideal diode, about 0.7 V for Si); otherwise output = input.
- **Series clipper:** the diode in series passes only part of the waveform.
- **Double clipper:** two diode–battery branches limit both peaks.

**Method:** find the input value at which each diode switches state, then draw the transfer characteristic $v_o$ versus $v_i$ (piecewise linear).

## Clampers

- A capacitor in series and a diode across the output. On the first peak, the capacitor charges to the peak (minus any battery or diode drop).
- **Positive clamper** (diode conducts on the negative half): the output's **minimum** is clamped near 0 V, so a $\pm V_m$ input becomes $0$ to $2V_m$.
- **Negative clamper:** the maximum is clamped near 0 V, giving $-2V_m$ to $0$.
- With a battery $V_B$ in series with the diode, the clamp level shifts by $V_B$.
- Requirement: $RC \gg T$ (the signal period), so the capacitor barely discharges.
- The peak-to-peak value is unchanged by clamping.

## Worked examples

**Example 1.** An ideal positive clamper with a $\pm5$ V square wave: the output swings from 0 to +10 V.

**Example 2.** A shunt clipper with an ideal diode and a 2 V battery, input $5\sin\omega t$: the output follows the input up to 2 V and is clipped at 2 V.

**Example 3.** The same clipper with a Si diode (0.7 V) and a 3 V battery: clipped at $3 + 0.7 = 3.7$ V.

## Common GATE traps

- Forgetting the diode drop with practical diodes.
- Thinking a clamper changes the peak-to-peak amplitude.

## Summary

- Clipper: the diode switches at $V_B + V_\gamma$; use the transfer characteristic.
- Clamper: shifts the DC level (positive: min ≈ 0; negative: max ≈ 0); $RC \gg T$.
