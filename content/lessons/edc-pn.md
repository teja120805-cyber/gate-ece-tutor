# P-N Junction

> Built-in potential, depletion width, junction capacitance and the diode equation are asked almost every year.

## Intuition

Join p-type and n-type material. Electrons diffuse into the p side and holes into the n side, leaving behind fixed ionised dopants: positive donors on the n side, negative acceptors on the p side. This **depletion region** sets up a field that opposes further diffusion. Equilibrium is reached at the **built-in potential** $V_{bi}$.
- Forward bias lowers the barrier, so diffusion current grows exponentially.
- Reverse bias raises it, leaving only a tiny saturation current.

## Key results

**Built-in potential:** $V_{bi} = V_T\ln\dfrac{N_AN_D}{n_i^2}$.

**Depletion width** (abrupt junction, reverse bias $V_R$):
$$
W = \sqrt{\frac{2\varepsilon(V_{bi} + V_R)}{q}\left(\frac{1}{N_A} + \frac{1}{N_D}\right)}, \qquad N_Ax_p = N_Dx_n .
$$
- The depletion region extends mostly into the **lightly doped** side.
- One-sided $p^+n$: $W \approx \sqrt{2\varepsilon(V_{bi} + V_R)/(qN_D)}$.

**Peak field:** $E_{max} = \dfrac{qN_Dx_n}{\varepsilon} = \dfrac{2(V_{bi} + V_R)}{W}$.

**Junction (depletion) capacitance:** $C_j = \dfrac{\varepsilon A}{W} \propto (V_{bi} + V_R)^{-1/2}$. It **decreases** with reverse bias (the basis of varactor diodes).

**Diode equation:** $I = I_S\left(e^{V/\eta V_T} - 1\right)$, with $\eta = 1$ for an ideal diode.
- About 60 mV per decade of current at 300 K.
- $I_S$ roughly doubles for every 10 °C rise in temperature.
- At fixed current, $V_F$ falls by about 2 mV/°C.

**Diffusion capacitance** (forward bias): $C_d = \tau I/V_T$, which dominates in forward bias.

**Small-signal resistance:** $r_d = \eta V_T/I$ (about 26 Ω at 1 mA).

## Worked examples

**Example 1.** $N_A = 10^{17}$, $N_D = 10^{16}$: $V_{bi} = 0.0259\ln(10^{33}/2.25\times10^{20}) = 0.754$ V.

**Example 2.** Raising the forward voltage by 60 mV multiplies the current by $e^{60/26} \approx 10$.

**Example 3.** $p^+n$ with $N_D = 10^{15}$ and $V_{bi} + V_R = 1$ V ($\varepsilon_{Si} = 1.04\times10^{-12}$ F/cm): $W = \sqrt{\frac{2\times1.04\times10^{-12}}{1.6\times10^{-19}\times10^{15}}} \approx 1.14\ \mu$m.

## Common GATE traps

- Assuming the depletion region lies mostly on the heavily doped side.
- Saying that $C_j$ increases with reverse bias.

## Summary

- $V_{bi} = V_T\ln(N_AN_D/n_i^2)$; $W \propto \sqrt{V_{bi} + V_R}$, mostly on the lightly doped side.
- $C_j \propto 1/W$; $I = I_S(e^{V/V_T} - 1)$; 60 mV per decade.
