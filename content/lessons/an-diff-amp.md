# Differential Amplifiers

> Differential gain, common-mode gain and CMRR of BJT/MOS pairs are standard questions; the differential pair is the input stage of every op-amp.

## Intuition

A differential pair amplifies the **difference** between two inputs and rejects what they have in **common** (noise and interference picked up equally on both lines). The shared tail current source keeps the total current constant, so a common-mode change shifts both sides equally and does not alter the currents much.

## Definitions

$v_d = v_1 - v_2$, $v_{cm} = \dfrac{v_1 + v_2}{2}$, $v_o = A_dv_d + A_{cm}v_{cm}$.

$\text{CMRR} = \left|\dfrac{A_d}{A_{cm}}\right|$, in dB: $20\log_{10}\text{CMRR}$.

## Key results (resistive loads $R_C$ or $R_D$, tail resistance $R_{EE}$ or $R_{SS}$)

| | BJT pair | MOS pair |
|---|---|---|
| $g_m$ of each device | $\dfrac{I_{EE}/2}{V_T}$ | $\sqrt{k_nI_{SS}}$ (with $I_D = I_{SS}/2$) |
| $A_d$, differential output | $g_mR_C$ | $g_mR_D$ |
| $A_d$, single-ended output | $g_mR_C/2$ | $g_mR_D/2$ |
| $A_{cm}$, single-ended | $\approx -\dfrac{R_C}{2R_{EE}}$ | $\approx -\dfrac{R_D}{2R_{SS}}$ |
| CMRR (single-ended) | $\approx g_mR_{EE}$ | $\approx g_mR_{SS}$ |

- With differential output and a perfectly matched circuit, $A_{cm} = 0$ (infinite CMRR); mismatch makes it finite.
- An **active load** (current-mirror load) converts to single-ended output with the full gain $g_m(r_{o2}\|r_{o4})$.
- The BJT pair switches almost completely for $|v_d| \gtrsim 4V_T \approx 100$ mV (linear only for small $v_d$).

## Worked examples

**Example 1.** $A_d = 1000$, $A_{cm} = 0.1$: CMRR $= 10^4$ = 80 dB.

**Example 2.** BJT pair with $I_{EE} = 2$ mA (1 mA each), $V_T = 25$ mV ⇒ $g_m = 40$ mA/V; with $R_C = 10\,\text{k}\Omega$, the differential-output gain is 400 (single-ended 200).

**Example 3.** $R_C = 10\,\text{k}$, $R_{EE} = 100\,\text{k}$: $|A_{cm}| \approx 10/200 = 0.05$, so the single-ended CMRR is $200/0.05 = 4000$ (72 dB).

## Common GATE traps

- Using the total tail current instead of the per-device current in $g_m$.
- Mixing single-ended and differential-output gains.

## Summary

- $A_d = g_mR_C$ (differential output) or $g_mR_C/2$ (single-ended); $A_{cm} \approx -R_C/2R_{EE}$.
- CMRR $= |A_d/A_{cm}|$; a large tail resistance gives high CMRR.
