# Comparators and Schmitt Triggers

> Threshold voltages, hysteresis width and output waveforms of Schmitt triggers are frequent questions.

## Intuition

A **comparator** (an op-amp with no feedback) switches its output to $+V_{sat}$ or $-V_{sat}$ depending on which input is larger. Near the threshold, noise makes it chatter. A **Schmitt trigger** adds **positive feedback**: once the output switches, the threshold moves away from the input, so small noise cannot switch it back. The two thresholds form a **hysteresis** loop.

## Key results

**Inverting Schmitt trigger** (input to the $-$ terminal; output fed back to $+$ through $R_2$, with $R_1$ from $+$ to ground or a reference $V_R$):
$$
V_{UT} = \beta V_{sat} + (1 - \beta)V_R, \quad V_{LT} = -\beta V_{sat} + (1 - \beta)V_R, \quad \beta = \frac{R_1}{R_1 + R_2}.
$$
Hysteresis width $V_H = V_{UT} - V_{LT} = 2\beta V_{sat}$ (with symmetric saturation).

**Non-inverting Schmitt trigger** (input through $R_1$ to $+$; output through $R_2$ to $+$; $-$ grounded):
$$
V_{UT} = +\frac{R_1}{R_2}V_{sat}, \qquad V_{LT} = -\frac{R_1}{R_2}V_{sat}.
$$

- A sine wave into a Schmitt trigger produces a square wave whose switching points are delayed by the hysteresis.
- Adding an RC timing network gives an astable multivibrator (square-wave generator) with period $T = 2RC\ln\dfrac{1 + \beta}{1 - \beta}$.

## Worked examples

**Example 1.** Inverting Schmitt with $\pm10$ V saturation and $R_1 = R_2$ ($\beta = 0.5$): thresholds $\pm5$ V, hysteresis 10 V.

**Example 2.** Non-inverting Schmitt with $R_1 = 10\,\text{k}$, $R_2 = 30\,\text{k}$, $V_{sat} = 12$ V: thresholds $\pm4$ V.

**Example 3.** Astable with $\beta = 0.5$: $T = 2RC\ln3 = 2.197RC$.

## Common GATE traps

- Using the virtual-short assumption — it does **not** hold with positive feedback.
- Mixing up the threshold formulas for the inverting and non-inverting configurations.

## Summary

- Positive feedback gives two thresholds (hysteresis) and noise immunity.
- Inverting: $\pm\beta V_{sat}$ with $\beta = R_1/(R_1 + R_2)$. Non-inverting: $\pm(R_1/R_2)V_{sat}$.
