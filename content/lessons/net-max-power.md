# Maximum Power Transfer

> A frequent 1- or 2-mark question, usually combined with finding a Thevenin equivalent first.

## Intuition

A load that is too small draws a large current but has little voltage across it; a load that is too large has voltage but little current. The power peaks in between — when the load **matches** the source's internal resistance.

## Formal statements

With the Thevenin equivalent $V_{th}$, $R_{th}$:

$$
P_L = \frac{V_{th}^2R_L}{(R_{th} + R_L)^2}\ \text{is maximised at}\ R_L = R_{th}, \qquad P_{max} = \frac{V_{th}^2}{4R_{th}} .
$$

**AC sources** ($Z_{th} = R_{th} + jX_{th}$):

| Allowed load | Condition | $P_{max}$ |
|---|---|---|
| any $Z_L$ | $Z_L = Z_{th}^*$ (conjugate match) | $\dfrac{|V_{th}|^2}{4R_{th}}$ (RMS) |
| pure resistance $R_L$ | $R_L = |Z_{th}|$ | smaller than the conjugate-match value |
| $R_L$ with fixed $X_L$ | $R_L = \sqrt{R_{th}^2 + (X_{th} + X_L)^2}$ | — |

## Key results

- Efficiency at maximum power transfer is **50%** — half the power is lost in $R_{th}$. Power systems therefore do not operate at this point; communication circuits do, to maximise received signal power.
- With peak-value phasors, $P_{max} = |V_m|^2/(8R_{th})$.

## Worked examples

**Example 1.** $V_{th} = 12$ V, $R_{th} = 3\,\Omega$: $R_L = 3\,\Omega$, $P_{max} = 144/12 = 12$ W.

**Example 2.** $Z_{th} = 3 + j4\,\Omega$, $V_{th} = 10$ V RMS: $Z_L = 3 - j4\,\Omega$, $P_{max} = 100/12 = 8.33$ W.

**Example 3.** For the same source but a purely resistive load: $R_L = |Z_{th}| = 5\,\Omega$; $|I| = \frac{10}{|8 + j4|} = 1.118$ A; $P = 1.118^2\times5 = 6.25$ W (less than 8.33 W).

## Common GATE traps

- Using $Z_L = Z_{th}$ instead of the conjugate.
- Peak versus RMS in $P_{max}$.
- Assuming 100% efficiency at maximum power.

## Summary

- $R_L = R_{th}$ ⇒ $P_{max} = V_{th}^2/4R_{th}$; AC: $Z_L = Z_{th}^*$.
- Resistive-only load: $R_L = |Z_{th}|$. Efficiency at maximum power is 50%.
