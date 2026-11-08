# MOSFET Small-Signal Amplifiers (CS, CG, CD)

> CS gain with $r_o$, the source follower, and CG input resistance are standard GATE questions.

## Intuition

In saturation, a small change in $v_{gs}$ changes the drain current by $g_mv_{gs}$. The gate draws no current, so the input resistance at the gate is essentially infinite. As with BJTs, the choice of common terminal sets gain and impedances.

## Small-signal model

$$
g_m = k_n(V_{GS} - V_T) = \sqrt{2k_nI_D} = \frac{2I_D}{V_{GS} - V_T}, \qquad r_o = \frac{1}{\lambda I_D}.
$$
With the body effect, an extra transconductance $g_{mb} = \chi g_m$ (where $\chi \approx 0.1$–$0.3$) appears for CG and CD stages.

## Configurations

| | CS | CS with $R_S$ | CG | CD (source follower) |
|---|---|---|---|---|
| Voltage gain | $-g_m(R_D\|r_o)$ | $\approx -\dfrac{g_mR_D}{1 + g_mR_S}$ | $+g_mR_D$ | $\dfrac{g_mR_S}{1 + g_mR_S}$ (< 1) |
| Input resistance | $\infty$ | $\infty$ | $\approx 1/g_m$ | $\infty$ |
| Output resistance | $R_D\|r_o$ | $\approx R_D$ | $\approx R_D$ | $\approx 1/g_m$ |

- **Intrinsic gain** (maximum CS gain): $g_mr_o = \dfrac{2}{\lambda V_{ov}}$.
- CS with an active load: $-g_m(r_{o1}\|r_{o2})$.

## Worked examples

**Example 1.** $g_m = 2$ mA/V, $R_D = 5\,\text{k}\Omega$: $A_v = -10$.

**Example 2.** $g_m = 2$ mA/V, $R_D = r_o = 20\,\text{k}\Omega$: $A_v = -2\times10 = -20$.

**Example 3.** Source follower with $g_m = 2$ mA/V, $R_S = 2\,\text{k}\Omega$: $A_v = 4/5 = 0.8$; $R_{out} \approx 1/g_m = 500\,\Omega$ (in parallel with $R_S$).

## Common GATE traps

- Ignoring $r_o$ when it is given.
- Treating the CG stage as inverting (it is non-inverting).

## Summary

- $g_m = 2I_D/V_{ov}$; CS gain $-g_m(R_D\|r_o)$.
- CG: $R_{in} \approx 1/g_m$, non-inverting. CD: gain < 1, $R_{out} \approx 1/g_m$.
