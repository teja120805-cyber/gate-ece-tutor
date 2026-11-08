# Digital-to-Analog Converters

> Resolution, output for a given code, and weighted-resistor versus R-2R ladder DACs are standard questions.

## Intuition

A DAC outputs a voltage proportional to a binary number. Each bit contributes a weight that doubles from the LSB to the MSB, and the contributions are summed — typically by an op-amp summing amplifier.

## Key results

**Output of an $n$-bit DAC** (reference $V_{ref}$, code $D$):
$$
V_o = V_{ref}\frac{D}{2^n}\ \ (\text{or } V_{FS}\frac{D}{2^n - 1}\ \text{when full scale is defined at the maximum code}).
$$
Read the question's definition carefully.

- **Resolution (step size)** = $V_{ref}/2^n$ (one LSB). Percentage resolution = $\dfrac{100}{2^n - 1}\%$.
- **Binary-weighted resistor DAC:** resistors $R, 2R, 4R, \dots, 2^{n-1}R$ (MSB has the smallest resistor). The resistor spread grows as $2^{n-1}$, which is hard to make accurately.
- **R-2R ladder:** only two resistor values ($R$ and $2R$), so it is easily matched. Each node splits the current in half.
- **Specifications:** monotonicity, settling time, DNL/INL, offset and gain errors.

## Worked examples

**Example 1.** An 8-bit DAC with $V_{ref} = 2.56$ V: step $= 2.56/256 = 10$ mV.

**Example 2.** A 4-bit DAC with 1 V per LSB and input 1010: $V_o = 10$ V.

**Example 3.** An 8-bit weighted-resistor DAC with MSB resistor $10\,\text{k}\Omega$: LSB resistor $= 10\,\text{k}\times2^7 = 1.28\,\text{M}\Omega$.

**Example 4.** A 10-bit DAC has percentage resolution $100/1023 \approx 0.098\%$.

## Common GATE traps

- Using $2^n$ versus $2^n - 1$ inconsistently.
- Thinking the R-2R ladder needs $n$ different resistor values.

## Summary

- Step $= V_{ref}/2^n$; $V_o = $ code × step.
- Weighted-resistor: wide resistor spread. R-2R: two values, preferred.
