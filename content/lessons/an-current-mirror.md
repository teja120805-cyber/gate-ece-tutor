# Current Mirrors

> Mirror ratios, the effect of finite β, and output resistance are common questions in the differential-amplifier/IC section.

## Intuition

A **diode-connected** transistor converts a reference current into a gate (or base) voltage. A second, matched transistor driven by the **same** $V_{GS}$ (or $V_{BE}$) must carry the same current — or a scaled copy if its size differs. The output current "mirrors" the reference.

## Key results

**MOS mirror** (both in saturation, $\lambda = 0$):
$$
I_{out} = I_{REF}\,\frac{(W/L)_2}{(W/L)_1}.
$$

**BJT mirror** with finite β (identical transistors):
$$
I_{out} = \frac{I_{REF}}{1 + 2/\beta}.
$$
The base currents are taken from the reference. A **β-helper** transistor reduces the error to $\approx \frac{2}{\beta(\beta + 1)}$.

**Setting the reference:** $I_{REF} = \dfrac{V_{DD} - V_{GS}}{R}$ (or $\dfrac{V_{CC} - V_{BE}}{R}$).

**Output resistance:**

| Mirror | $R_{out}$ |
|---|---|
| basic | $r_o$ |
| cascode (MOS) | $\approx g_mr_o^2$ |
| Wilson (BJT) | $\approx \beta r_o/2$ |
| Widlar | $\approx r_o(1 + g_mR_E)$; produces small currents with modest resistors |

**Channel-length modulation** causes a mismatch: $I_{out}/I_{REF} \approx \dfrac{1 + \lambda V_{DS2}}{1 + \lambda V_{DS1}}$.

**Compliance:** the output transistor must stay in saturation (MOS: $V_{out} \ge V_{GS} - V_T$; BJT: $V_{out} \ge V_{CE,sat}$).

## Worked examples

**Example 1.** $(W/L)_2 = 2(W/L)_1$, $I_{REF} = 50\ \mu$A ⇒ $I_{out} = 100\ \mu$A.

**Example 2.** BJT mirror, $\beta = 100$, $I_{REF} = 1$ mA ⇒ $I_{out} = 1/1.02 = 0.980$ mA.

**Example 3.** $V_{DD} = 5$ V, $V_{GS} = 1$ V, $R = 40\,\text{k}\Omega$ ⇒ $I_{REF} = 100\ \mu$A.

## Common GATE traps

- Inverting the W/L ratio.
- Ignoring the base-current error in BJT mirrors when β is given.

## Summary

- MOS: $I_{out} = I_{REF}\frac{(W/L)_2}{(W/L)_1}$. BJT: $I_{out} = I_{REF}/(1 + 2/\beta)$.
- Cascode and Wilson mirrors raise the output resistance; keep the output device saturated.
