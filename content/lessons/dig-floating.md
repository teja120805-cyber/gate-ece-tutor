# Floating-Point Numbers

> Decoding IEEE-754 bit patterns and knowing the special values are the usual questions.

## Intuition

Floating point is scientific notation in binary: a **sign**, a **significand** (mantissa) and an **exponent**. It trades uniform precision for a huge dynamic range.

## IEEE-754 formats

| Format | Sign | Exponent | Fraction | Bias |
|---|---|---|---|---|
| single (32-bit) | 1 | 8 | 23 | 127 |
| double (64-bit) | 1 | 11 | 52 | 1023 |

**Normalised value:** $(-1)^s\times1.f\times2^{E - \text{bias}}$ (the leading 1 is implicit).

**Special exponent values:**

| Exponent field | Fraction | Meaning |
|---|---|---|
| all 0s | 0 | ±0 |
| all 0s | ≠ 0 | denormal: $(-1)^s\times0.f\times2^{1 - \text{bias}}$ |
| all 1s | 0 | ±∞ |
| all 1s | ≠ 0 | NaN |

## Key results

- Single-precision normalised range ≈ $1.18\times10^{-38}$ to $3.4\times10^{38}$, with about 7 decimal digits of precision.
- **Machine epsilon** (spacing at 1.0) $= 2^{-23}$ for single precision.
- **Encoding a number:** write it as $1.f\times2^e$, store $E = e + 127$, and store the fraction bits after the binary point.

## Worked examples

**Example 1.** `0x40A00000` = `0 10000001 0100…0`: $E = 129 \Rightarrow e = 2$; significand $1.01_2 = 1.25$; value $= 1.25\times4 = 5$.

**Example 2.** `0xC1200000` = `1 10000010 0100…0`: $e = 130 - 127 = 3$; value $= -1.25\times8 = -10$.

**Example 3.** Encode $-0.75 = -1.1_2\times2^{-1}$: $s = 1$, $E = 126 = 01111110_2$, fraction $= 100\ldots0$ ⇒ `0xBF400000`.

## Common GATE traps

- Forgetting the implicit leading 1.
- Using bias 128 instead of 127.

## Summary

- Single precision: 1 + 8 + 23 bits, bias 127, value $(-1)^s 1.f\times2^{E - 127}$.
- Exponent all 0s: zero/denormal; all 1s: ∞ or NaN.
