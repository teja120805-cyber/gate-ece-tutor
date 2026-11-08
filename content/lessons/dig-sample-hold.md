# Sample-and-Hold Circuits

> Droop, acquisition time and aperture effects, and why an ADC needs a sample-and-hold.

## Intuition

An ADC needs a **steady** input while it converts — a changing input would corrupt a successive-approximation search. A sample-and-hold (S/H) circuit tracks the signal, then **freezes** it on a capacitor for the duration of the conversion.

## Circuit

An input buffer drives a switch (typically a MOSFET), which feeds a hold capacitor $C_H$ followed by an output buffer (a high-impedance op-amp follower).
- **Sample (track) mode:** switch closed; $C_H$ charges to the input.
- **Hold mode:** switch open; $C_H$ keeps the voltage.

## Key specifications

| Spec | Meaning | Dependence |
|---|---|---|
| Acquisition time | time to charge $C_H$ to within the required accuracy | ∝ $R_{on}C_H$ (larger C is slower) |
| Droop rate | voltage decay during hold: $\dfrac{dV}{dt} = \dfrac{I_{leak}}{C_H}$ | larger C means less droop |
| Aperture time | delay or uncertainty between the hold command and the switch actually opening | — |
| Aperture jitter | random variation in aperture time; limits the maximum input frequency: $\Delta V \approx 2\pi fA\,t_{aj}$ | — |
| Feedthrough | input leaking to the output during hold | — |

There is a trade-off: a larger $C_H$ means lower droop but slower acquisition.

## Worked examples

**Example 1.** Leakage 1 nA with $C_H = 1$ nF: droop $= 1$ V/s $= 1$ mV/ms.

**Example 2.** For at most 1 mV of droop in 10 µs with 10 nA leakage: $C \ge \dfrac{10^{-8}\times10^{-5}}{10^{-3}} = 100$ pF.

## Common GATE traps

- Thinking a larger hold capacitor increases droop (it decreases it).
- Ignoring the acquisition-time penalty of a large capacitor.

## Summary

- S/H freezes the input during conversion; droop $= I_{leak}/C_H$.
- Larger C: less droop, slower acquisition; aperture jitter limits high-frequency accuracy.
