# Resonance and Quality Factor

> Resonant frequency, Q, bandwidth and voltage magnification are frequent numerical questions, and they connect to filters and tuned amplifiers.

## Intuition

At one frequency the inductive and capacitive reactances are equal and cancel. The circuit then looks purely resistive. In a series circuit the current peaks; in a parallel circuit the impedance peaks. **Q** measures how sharp that peak is — the ratio of energy stored to energy lost per cycle.

## Series RLC

$$
\omega_0 = \frac{1}{\sqrt{LC}}, \qquad Q = \frac{\omega_0L}{R} = \frac{1}{\omega_0CR} = \frac1R\sqrt{\frac LC}, \qquad BW = \frac{\omega_0}{Q} = \frac RL .
$$

- At resonance: $Z = R$ (minimum), current is maximum ($V/R$), and the power factor is 1.
- Voltage magnification: $|V_L| = |V_C| = Q|V_s|$.
- Half-power frequencies satisfy $\omega_1\omega_2 = \omega_0^2$ and $\omega_2 - \omega_1 = BW$.
- Below resonance the circuit is capacitive; above, inductive.

## Parallel RLC

$\omega_0 = 1/\sqrt{LC}$; $Q = R\sqrt{C/L} = \omega_0RC$; $BW = \frac{1}{RC}$.
At resonance: $Z = R$ (maximum), line current is minimum, and the branch currents are $Q$ times the line current (current magnification).

**Practical tank** (coil resistance $r$ in series with L, in parallel with C): $\omega_0 = \sqrt{\frac{1}{LC} - \frac{r^2}{L^2}}$, and the dynamic resistance at resonance is $\frac{L}{rC}$.

## Worked examples

**Example 1.** $L = 10$ mH, $C = 1\,\mu$F: $\omega_0 = 10^4$ rad/s, $f_0 = 1591.5$ Hz.

**Example 2.** With $R = 10\,\Omega$: $Q = \frac{1}{10}\sqrt{10^{-2}/10^{-6}} = 10$; $BW = f_0/Q = 159$ Hz (or $R/L = 1000$ rad/s).

**Example 3.** With a 2 V source at resonance: $|V_L| = |V_C| = 20$ V — larger than the source.

## Common GATE traps

- Mixing rad/s and Hz for bandwidth.
- Using the series Q formula for a parallel circuit (the two are reciprocal in R).

## Summary

- $\omega_0 = 1/\sqrt{LC}$; series: $Q = \frac1R\sqrt{L/C}$, minimum Z, voltage magnification.
- Parallel: $Q = R\sqrt{C/L}$, maximum Z, current magnification; $BW = \omega_0/Q$.
