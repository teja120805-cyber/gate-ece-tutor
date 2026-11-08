# BJT Biasing

> Finding the Q-point ($I_C$, $V_{CE}$) of fixed and voltage-divider bias circuits is a guaranteed numerical topic.

## Intuition

Biasing sets the DC operating point so that the transistor stays in the active region for the whole signal swing. A good bias point should also stay put when β or temperature changes. **Emitter degeneration** ($R_E$) provides negative feedback: if $I_C$ rises, $V_E$ rises, $V_{BE}$ falls, and $I_C$ is pulled back.

## Circuits and formulas ($V_{BE} \approx 0.7$ V)

**Fixed bias** ($R_B$ from $V_{CC}$ to the base):
$I_B = \dfrac{V_{CC} - V_{BE}}{R_B}$, $I_C = \beta I_B$, $V_{CE} = V_{CC} - I_CR_C$. Strongly β-dependent, so poor stability.

**Collector-feedback bias** ($R_B$ from the collector to the base): $I_B = \dfrac{V_{CC} - V_{BE}}{R_B + (\beta + 1)R_C}$. Better stability.

**Voltage-divider bias** ($R_1$ top, $R_2$ bottom, $R_E$ in the emitter): the most stable.
- Thevenin equivalent: $V_{TH} = V_{CC}\dfrac{R_2}{R_1 + R_2}$, $R_{TH} = R_1 \| R_2$.
- $I_B = \dfrac{V_{TH} - V_{BE}}{R_{TH} + (\beta + 1)R_E}$.
- If $\beta R_E \gg R_{TH}$: $V_E \approx V_{TH} - 0.7$ and $I_C \approx I_E = V_E/R_E$, independent of β.
- $V_{CE} \approx V_{CC} - I_C(R_C + R_E)$.

## Key results

- **Stability factor** $S = \partial I_C/\partial I_{CO}$ (smaller is better): fixed bias $S = 1 + \beta$; voltage divider $S \approx 1 + R_{TH}/R_E$.
- $I_{CO}$ doubles about every 10 °C; $V_{BE}$ falls about 2.5 mV/°C. Both push $I_C$ up (risk of thermal runaway).
- Check the active region: $V_{CE} > V_{CE,sat} \approx 0.2$ V.

## Worked examples

**Example 1.** Fixed bias: $V_{CC} = 12$ V, $R_B = 565\,\text{k}\Omega$, $\beta = 100$: $I_B = 11.3/565\text{k} = 20\ \mu$A, $I_C = 2$ mA.

**Example 2.** Divider: $V_{CC} = 12$ V, $R_1 = 40\,\text{k}$, $R_2 = 10\,\text{k}$, $R_E = 1\,\text{k}$, $R_C = 4\,\text{k}$, large β:
$V_B = 2.4$ V, $V_E = 1.7$ V, $I_C \approx 1.7$ mA, $V_{CE} = 12 - 1.7\times5 = 3.5$ V (active).

## Common GATE traps

- Ignoring the base current when $\beta R_E$ is not much larger than $R_{TH}$ — use the exact formula.
- Not checking for saturation.

## Summary

- Fixed bias is β-sensitive; voltage-divider bias with $R_E$ is stable: $I_C \approx (V_{TH} - 0.7)/R_E$.
- $V_{CE} = V_{CC} - I_C(R_C + R_E)$; verify the active region.
