# Analog-to-Digital Converters

> Comparator count for flash ADCs, conversion times for SAR, counter and dual-slope ADCs, and output codes are asked regularly.

## Intuition

An ADC finds the digital code whose DAC level best matches the input. The architectures differ in how they search:
- **flash** compares against every level at once;
- **SAR** does a binary search;
- **counter** tries the levels one by one;
- **dual-slope** measures time instead of voltage.

## Comparison of architectures ($n$ bits, clock period $T$)

| Type | Hardware | Conversion time | Notes |
|---|---|---|---|
| flash | $2^n - 1$ comparators | 1 clock (fastest) | comparator count doubles per bit |
| successive approximation (SAR) | 1 comparator + DAC | $n$ clocks, independent of the input | most common |
| counter (ramp) | counter + DAC | up to $(2^n - 1)$ clocks | slow, input-dependent |
| tracking (servo) | up/down counter | fast for slowly varying signals | — |
| dual-slope (integrating) | integrator | $2^nT$ (run-up) + up to $2^nT$ (run-down) | slow; excellent noise and mains rejection; used in DMMs |

## Key results

- **Quantisation step** $\Delta = V_{FS}/2^n$; code $= \lfloor V_{in}/\Delta\rfloor$ (or rounded, depending on the converter).
- **Quantisation error:** $\pm\Delta/2$ (rounding) or $0$ to $\Delta$ (truncation).
- **SQNR** for a full-scale sine $\approx 6.02n + 1.76$ dB.
- Sampling must satisfy Nyquist; use a sample-and-hold for SAR converters.

## Worked examples

**Example 1.** An 8-bit flash ADC needs $2^8 - 1 = 255$ comparators.

**Example 2.** A 10-bit SAR at 1 µs per bit converts in 10 µs.

**Example 3.** An 8-bit counter ADC with a 1 MHz clock: the worst-case conversion time is $255\ \mu$s.

**Example 4.** An 8-bit ADC over 0–5.12 V ($\Delta = 20$ mV) with a 2.00 V input: code $= 100$.

## Common GATE traps

- Using $2^n$ comparators for flash (it is $2^n - 1$).
- Thinking the SAR conversion time depends on the input.

## Summary

- Flash: $2^n - 1$ comparators, fastest. SAR: $n$ clocks. Counter: up to $2^n - 1$ clocks.
- Dual-slope: slow, with good noise rejection. $\Delta = V_{FS}/2^n$.
