# BJT Small-Signal Amplifiers (CE, CB, CC)

> The hybrid-π model and gains/impedances of the three configurations are among the most-asked Analog topics.

## Intuition

Around the bias point, the BJT behaves linearly for small signals: a small change in $v_{be}$ produces a proportional change in $i_c$. The **transconductance** $g_m$ measures that sensitivity. Each configuration — which terminal is common to input and output — trades gain against input and output impedance.

## Hybrid-π model

$$
g_m = \frac{I_C}{V_T}, \qquad r_\pi = \frac{\beta}{g_m}, \qquad r_e = \frac{\alpha}{g_m} \approx \frac{1}{g_m}, \qquad r_o = \frac{V_A}{I_C}.
$$
At $I_C = 1$ mA: $g_m \approx 38.5$ mA/V ($V_T = 26$ mV).

## Configurations (with $R_C$ load, $r_o$ neglected unless stated)

| | CE | CE with unbypassed $R_E$ | CB | CC (emitter follower) |
|---|---|---|---|---|
| Voltage gain | $-g_mR_C$ | $\approx -\dfrac{R_C}{r_e + R_E}$ | $+g_mR_C$ | $\dfrac{R_E}{r_e + R_E} \approx 1$ |
| Input resistance | $r_\pi$ | $r_\pi + (\beta + 1)R_E$ | $\approx r_e$ (low) | $r_\pi + (\beta + 1)R_E$ (high) |
| Output resistance | $R_C\|r_o$ | $\approx R_C$ | $\approx R_C$ | $\approx r_e + \dfrac{R_s}{\beta + 1}$ (low) |
| Phase | inverting | inverting | non-inverting | non-inverting |

- The full CE gain including $r_o$ is $-g_m(R_C\|r_o\|R_L)$.
- With source resistance $R_s$: overall gain = $\dfrac{R_{in}}{R_{in} + R_s}\times A_v$.
- CB has a current gain of about $\alpha \approx 1$; CC has a current gain of about $\beta + 1$.

## Worked examples

**Example 1.** $I_C = 1$ mA: $g_m = 1/0.026 = 38.5$ mA/V; with $\beta = 100$, $r_\pi = 2.6\,\text{k}\Omega$.

**Example 2.** CE: $g_m = 40$ mA/V, $R_C = 5\,\text{k}\Omega$ ⇒ $A_v = -200$.

**Example 3.** With an unbypassed $R_E = 500\,\Omega$: $A_v \approx -\dfrac{200}{1 + 40\times0.5} = -9.5$ — much more stable, but lower gain.

## Common GATE traps

- Forgetting the $(\beta + 1)$ factor when reflecting $R_E$ into the base.
- Getting the sign of the CE gain wrong.

## Summary

- $g_m = I_C/V_T$, $r_\pi = \beta/g_m$.
- CE: $-g_mR_C$ (inverting); CB: low $R_{in}$, non-inverting; CC: gain ≈ 1, high $R_{in}$, low $R_{out}$.
