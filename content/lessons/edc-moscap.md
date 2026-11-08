# MOS Capacitor

> Accumulation, depletion and inversion; the threshold voltage; and the C–V curve are tested regularly. This is the heart of MOSFET operation.

## Intuition

A MOS capacitor is a metal gate, a thin oxide insulator and a semiconductor substrate. For a **p-type** substrate:
- **negative gate voltage:** attracts holes to the surface — **accumulation**;
- **small positive voltage:** pushes holes away, leaving negative acceptor ions — **depletion**;
- **larger positive voltage:** attracts enough electrons to form an n-type layer at the surface — **inversion**. That layer is the channel of an nMOSFET.

## Key results

**Oxide capacitance per area:** $C_{ox} = \dfrac{\varepsilon_{ox}}{t_{ox}}$, with $\varepsilon_{ox} = 3.9\varepsilon_0 = 3.45\times10^{-13}$ F/cm.

**Onset of strong inversion:** surface potential $\phi_s = 2\phi_F$, where $\phi_F = V_T\ln(N_A/n_i)$.

**Threshold voltage:**
$$
V_T = V_{FB} + 2\phi_F + \frac{\sqrt{2\varepsilon_s qN_A(2\phi_F)}}{C_{ox}}, \qquad V_{FB} = \phi_{ms} - \frac{Q_{ox}}{C_{ox}} .
$$

- $V_T$ increases with substrate doping and oxide thickness.
- Positive oxide charge lowers $V_T$ (for nMOS on a p-substrate).
- Maximum depletion width at inversion: $W_{max} = \sqrt{2\varepsilon_s(2\phi_F)/(qN_A)}$.

**C–V characteristic** (p-substrate):

| Region | Capacitance |
|---|---|
| accumulation | $\approx C_{ox}$ |
| depletion | $C_{ox}$ in series with $C_{dep}$ (falls as the gate voltage rises) |
| inversion, high frequency | minimum: $C_{ox}$ in series with $C_{dep,min}$ |
| inversion, low frequency | returns to $\approx C_{ox}$ |

## Worked examples

**Example 1.** $t_{ox} = 10$ nm: $C_{ox} = 3.45\times10^{-13}/10^{-6} = 3.45\times10^{-7}$ F/cm² (345 nF/cm²).

**Example 2.** $N_A = 10^{16}$: $\phi_F = 0.347$ V, so strong inversion begins at $\phi_s = 0.695$ V.

## Common GATE traps

- Getting the polarity wrong for n-type substrates (everything reverses).
- Forgetting that high-frequency inversion capacitance stays at its minimum.

## Summary

- Accumulation → depletion → inversion as the gate voltage increases (p-substrate).
- Strong inversion at $\phi_s = 2\phi_F$; $C_{ox} = \varepsilon_{ox}/t_{ox}$; $V_T$ rises with $N_A$ and $t_{ox}$.
