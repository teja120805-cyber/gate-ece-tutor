# Summers and Difference Amplifiers

> Weighted summing amplifiers, difference amplifiers and the instrumentation amplifier are routinely tested.

## Intuition

At the virtual-ground node of an inverting op-amp, input currents simply **add**: each input contributes $v_i/R_i$, and all of it flows through $R_f$. For a difference amplifier, superposition of the inverting and non-inverting paths gives an output proportional to $v_2 - v_1$ when the resistor ratios match.

## Key results

**Inverting summer:**
$$
v_o = -R_f\left(\frac{v_1}{R_1} + \frac{v_2}{R_2} + \cdots\right).
$$
Equal resistors give $v_o = -(v_1 + v_2 + \cdots)$.

**Non-inverting summer:** the inputs connect through equal resistors to the $+$ terminal, so $v_+ = \frac{v_1 + v_2 + \cdots + v_n}{n}$ (the average), and $v_o = \left(1 + \frac{R_f}{R_g}\right)v_+$.

**Difference amplifier** ($v_1$ through $R_1$ to the $-$ input, $R_2$ feedback; $v_2$ through $R_3$ to the $+$ input, $R_4$ to ground):
$$
v_o = \frac{R_4}{R_3 + R_4}\left(1 + \frac{R_2}{R_1}\right)v_2 - \frac{R_2}{R_1}v_1 .
$$
With $R_2/R_1 = R_4/R_3$: $v_o = \dfrac{R_2}{R_1}(v_2 - v_1)$. A ratio mismatch causes common-mode gain (finite CMRR).

**Three-op-amp instrumentation amplifier:**
$$
v_o = \left(1 + \frac{2R}{R_G}\right)\frac{R_2}{R_1}(v_2 - v_1).
$$
It has very high input impedance (buffered inputs), gain set by a single resistor $R_G$, and high CMRR.

## Worked examples

**Example 1.** $R_f = 10\,\text{k}$, $R_1 = 10\,\text{k}$, $R_2 = 5\,\text{k}$, $v_1 = 1$ V, $v_2 = 0.5$ V: $v_o = -(1 + 2\times0.5) = -2$ V.

**Example 2.** Difference amplifier with $R_2/R_1 = R_4/R_3 = 5$, $v_2 = 1.2$ V, $v_1 = 1.0$ V: $v_o = 1.0$ V.

**Example 3.** Non-inverting summer averaging 1 V and 3 V ($v_+ = 2$ V) with gain 2: $v_o = 4$ V.

## Common GATE traps

- Forgetting the divider at the $+$ input of a difference amplifier when the ratios don't match.
- Treating the non-inverting summer as a simple sum (it averages before amplifying).

## Summary

- Inverting summer: $-R_f\sum v_i/R_i$. Difference amp: $\frac{R_2}{R_1}(v_2 - v_1)$ with matched ratios.
- The instrumentation amplifier gives high $Z_{in}$ and high CMRR, with gain set by $R_G$.
