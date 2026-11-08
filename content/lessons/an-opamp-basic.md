# Ideal Op-Amp: Inverting and Non-Inverting Amplifiers

> Op-amp circuits appear in nearly every GATE paper. Two rules — the virtual short and zero input current — solve almost all of them.

## Intuition

An op-amp has enormous gain (≈10⁵ or more). With **negative feedback**, the output adjusts itself until the difference between its two inputs is almost zero — any tiny difference would drive the output to whatever value cancels it. So the circuit around the op-amp, not the op-amp itself, sets the gain.

## The ideal op-amp model

| Parameter | Ideal value |
|---|---|
| Open-loop gain $A$ | $\infty$ |
| Input impedance | $\infty$ ⇒ input currents $i_+ = i_- = 0$ |
| Output impedance | 0 |
| Bandwidth | $\infty$ |

**Golden rules (negative feedback only):**
1. $v_+ = v_-$ (virtual short).
2. No current flows into either input.

## Key results

**Inverting amplifier** ($R_1$ from input to $v_-$, $R_f$ from $v_-$ to output, $v_+$ grounded):
$v_- = 0$ (virtual ground), so the current $v_{in}/R_1$ must flow through $R_f$:
$$
\frac{v_o}{v_{in}} = -\frac{R_f}{R_1}, \qquad R_{in} = R_1 .
$$

**Non-inverting amplifier** (input at $v_+$; $R_1$ from $v_-$ to ground, $R_f$ from $v_-$ to output):
$v_- = v_{in}$ and the divider gives $v_- = v_o\,R_1/(R_1 + R_f)$:
$$
\frac{v_o}{v_{in}} = 1 + \frac{R_f}{R_1}, \qquad R_{in} \to \infty .
$$

**Voltage follower** ($R_f = 0$, $R_1 = \infty$): gain 1 — a buffer that isolates a high-impedance source from a load.

**Finite open-loop gain:** non-inverting gain $= \dfrac{A}{1 + A\beta}$ with $\beta = R_1/(R_1 + R_f)$, which tends to $1/\beta$ as $A \to \infty$.

**Saturation:** the output cannot exceed the supply rails. If the computed $v_o$ is beyond them, the output clips at about the rail voltage.

## Visual picture

| Circuit | Gain | Input resistance | Phase |
|---|---|---|---|
| Inverting | $-R_f/R_1$ | $R_1$ | 180° |
| Non-inverting | $1 + R_f/R_1$ | very high | 0° |
| Follower | 1 | very high | 0° |

## Worked examples

**Example 1.** Inverting with $R_1 = 2.2\,\text{k}\Omega$, $R_f = 22\,\text{k}\Omega$, $v_{in} = 0.5$ V: $v_o = -5$ V.

**Example 2.** Non-inverting with $R_1 = 10\,\text{k}\Omega$, $R_f = 40\,\text{k}\Omega$: gain 5.

**Example 3 (T-network).** $R_1 = 10\,\text{k}$, feedback T of $R_2 = 100\,\text{k}$, $R_3 = 100\,\text{k}$, $R_4 = 10\,\text{k}$ to ground.
The T-node sits at $v_T = -(R_2/R_1)v_{in} = -10v_{in}$; KCL at the node gives
$$\frac{v_o}{v_{in}} = -\frac{R_2}{R_1}\left(1 + \frac{R_3}{R_2} + \frac{R_3}{R_4}\right) = -120.$$

**Example 4 (saturation).** Gain $-20$ with ±12 V supplies and $v_{in} = 1$ V: the ideal answer is $-20$ V, but the output saturates near $-12$ V.

## Common GATE traps

- **Applying the virtual short without negative feedback** (comparators and Schmitt triggers use positive feedback).
- **Forgetting the "1 +"** in the non-inverting gain.
- **Ignoring the rails** when a question gives supply voltages.
- **Assuming the ideal op-amp has infinite output impedance** — it is zero.

## Summary

- Negative feedback ⇒ $v_+ = v_-$ and $i_\pm = 0$.
- Inverting: $-R_f/R_1$; non-inverting: $1 + R_f/R_1$; follower: 1.
- Check the supply rails.
