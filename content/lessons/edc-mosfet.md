# MOSFET

> The square-law model, region checks, transconductance, channel-length modulation and the body effect appear every year.

## Intuition

The gate voltage creates an inversion channel between source and drain (see the MOS capacitor lesson). A small drain voltage makes the channel act like a resistor whose conductance is set by the gate (**linear/triode region**). A larger drain voltage **pinches off** the channel near the drain, after which the current stops rising (**saturation**) — set by the gate, nearly independent of the drain.

## Square-law model (nMOS, $k_n = \mu_nC_{ox}W/L$)

| Region | Condition | $I_D$ |
|---|---|---|
| cut-off | $V_{GS} < V_T$ | 0 |
| linear (triode) | $V_{GS} > V_T$, $V_{DS} < V_{GS} - V_T$ | $k_n\left[(V_{GS} - V_T)V_{DS} - \frac{V_{DS}^2}{2}\right]$ |
| saturation | $V_{DS} \ge V_{GS} - V_T$ | $\frac{k_n}{2}(V_{GS} - V_T)^2(1 + \lambda V_{DS})$ |

For pMOS, reverse all the voltage polarities (and $\mu_p \approx \mu_n/2.5$).

## Key results

- **Transconductance** in saturation: $g_m = k_n(V_{GS} - V_T) = \sqrt{2k_nI_D} = \dfrac{2I_D}{V_{GS} - V_T}$.
- **Output resistance:** $r_o = \dfrac{1}{\lambda I_D}$ (channel-length modulation).
- For small $V_{DS}$, the channel resistance is $R_{on} = \dfrac{1}{k_n(V_{GS} - V_T)}$.
- **Body effect:** $V_T = V_{T0} + \gamma\left(\sqrt{2\phi_F + V_{SB}} - \sqrt{2\phi_F}\right)$, which rises with $V_{SB}$.
- **Enhancement** devices have $V_T > 0$ (nMOS); **depletion** devices have $V_T < 0$ (conduct at $V_{GS} = 0$).
- A **diode-connected** MOSFET (gate tied to drain) is always in saturation if it conducts.

## Worked examples

**Example 1.** $k_n = 2$ mA/V², $V_T = 1$ V, $V_{GS} = 3$ V in saturation: $I_D = \frac22(2)^2 = 4$ mA and $g_m = 2\times2 = 4$ mA/V.

**Example 2.** Same device with $V_{DS} = 0.5$ V (triode): $I_D = 2[(2)(0.5) - 0.125] = 1.75$ mA.

**Example 3.** $\lambda = 0.02$ V⁻¹ at $I_D = 1$ mA: $r_o = 50\,\text{k}\Omega$.

## Common GATE traps

- Not checking the region before choosing the formula; always verify the assumption afterwards.
- A factor-of-2 confusion: some texts write $I_D = k(V_{GS} - V_T)^2$ with $k = \frac12\mu C_{ox}W/L$ — read the definition given.

## Summary

- Saturation $I_D = \frac{k_n}{2}(V_{GS} - V_T)^2$ when $V_{DS} \ge V_{GS} - V_T$.
- $g_m = 2I_D/V_{ov}$, $r_o = 1/\lambda I_D$; body effect raises $V_T$.
