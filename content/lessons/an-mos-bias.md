# MOSFET Biasing

> Solving for the operating point with a gate divider and source resistor (a quadratic equation), and checking saturation, are standard questions.

## Intuition

The gate draws no DC current, so a resistive divider fixes $V_G$ exactly. A **source resistor** $R_S$ adds negative feedback: more drain current raises $V_S$, which lowers $V_{GS}$ and limits the current. This stabilises the bias against variations in $V_T$ and $k_n$.

## Method (nMOS, saturation assumed, $I_D = \frac{k_n}{2}(V_{GS} - V_T)^2$)

1. $V_G = V_{DD}\dfrac{R_2}{R_1 + R_2}$ (no gate current, so the divider is unloaded).
2. $V_{GS} = V_G - I_DR_S$.
3. Substitute into the square law and solve the quadratic. Keep the root with $V_{GS} > V_T$.
4. $V_D = V_{DD} - I_DR_D$. Check saturation: $V_{DS} \ge V_{GS} - V_T$ (equivalently $V_D \ge V_G - V_T$).

## Key results

- **Self-bias for depletion MOSFETs/JFETs** ($V_G = 0$): $V_{GS} = -I_DR_S$.
- **Diode-connected** MOSFET (gate tied to drain): $V_{DS} = V_{GS}$, always saturated when conducting. Used in current mirrors.
- **Constant-current biasing** with a current source in the source gives the best stability.
- A larger $R_S$ gives lower $I_D$ and better stability but less headroom (and less gain unless bypassed).

## Worked examples

**Example 1.** $V_{DD} = 10$ V, equal divider ⇒ $V_G = 5$ V, $R_S = 0$, $V_T = 1$ V, $\frac{k_n}{2} = 0.5$ mA/V²: $I_D = 0.5(4)^2 = 8$ mA.

**Example 2.** $V_G = 3$ V, $R_S = 1\,\text{k}\Omega$, $\frac{k_n}{2} = 1$ mA/V², $V_T = 1$ V:
$I_D = (V_{GS} - 1)^2$ (mA) and $V_{GS} = 3 - I_D$. Let $x = V_{GS} - 1$: $x^2 + x - 2 = 0$ ⇒ $x = 1$ (reject $-2$). So $V_{GS} = 2$ V and $I_D = 1$ mA.

**Example 3.** For saturation in Example 2 with $V_{DD} = 10$ V: we need $V_D \ge V_G - V_T = 2$ V, so $R_D \le (10 - 2)/1\,\text{mA} = 8\,\text{k}\Omega$.

## Common GATE traps

- Keeping the quadratic root with $V_{GS} < V_T$.
- Forgetting the saturation check.

## Summary

- $V_G$ from the divider; $V_{GS} = V_G - I_DR_S$; solve the square law; keep $V_{GS} > V_T$.
- Saturation: $V_D \ge V_G - V_T$. A source resistor stabilises $I_D$.
