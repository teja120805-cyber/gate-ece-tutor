# Rectifiers

> Average output, PIV, ripple and efficiency of half-wave, full-wave and bridge rectifiers are standard numericals.

## Intuition

A rectifier lets current flow in only one direction, turning AC into pulsating DC. A **capacitor filter** then smooths the pulses: it charges near each peak and discharges slowly through the load in between, leaving a small **ripple**.

## Key results (ideal diodes, peak input $V_m$)

| Quantity | Half-wave | Full-wave (centre-tap) | Bridge |
|---|---|---|---|
| $V_{DC}$ | $V_m/\pi$ | $2V_m/\pi$ | $2V_m/\pi$ |
| $V_{rms}$ | $V_m/2$ | $V_m/\sqrt2$ | $V_m/\sqrt2$ |
| Ripple frequency | $f$ | $2f$ | $2f$ |
| Ripple factor | 1.21 | 0.482 | 0.482 |
| Maximum efficiency | 40.6% | 81.2% | 81.2% |
| Diode PIV | $V_m$ | $2V_m$ | $V_m$ |
| Diodes | 1 | 2 | 4 |

The centre-tapped circuit needs a centre-tapped transformer, with $V_m$ measured on each half of the secondary. With real diodes, subtract about 0.7 V per conducting diode (two in series for a bridge).

**Capacitor filter** (large $RC$, load current $I_{DC}$):
$$
V_{r(pp)} \approx \frac{I_{DC}}{fC}\ (\text{half-wave}), \qquad \frac{I_{DC}}{2fC}\ (\text{full-wave}), \qquad V_{DC} \approx V_m - \frac{V_{r(pp)}}{2}.
$$
With $I_{DC} \approx V_m/R$: $V_{r(pp)} \approx \frac{V_m}{fRC}$ (HW) or $\frac{V_m}{2fRC}$ (FW).

## Worked examples

**Example 1.** Bridge with $V_m = 10$ V: $V_{DC} = 20/\pi = 6.37$ V (unfiltered).

**Example 2.** Full-wave, $V_m = 10$ V, $f = 50$ Hz, $R = 1\,\text{k}\Omega$, $C = 1000\ \mu$F: $V_{r(pp)} \approx \frac{10}{2\times50\times1000\times10^{-3}} = 0.1$ V.

**Example 3.** Centre-tapped full-wave with 10 V peak per half: PIV $= 20$ V.

## Common GATE traps

- Using a bridge PIV of $2V_m$ (it is $V_m$).
- Forgetting that full-wave ripple is at $2f$, which halves the ripple voltage.

## Summary

- HW: $V_m/\pi$; FW and bridge: $2V_m/\pi$.
- Ripple $\approx I/(fC)$ for HW and $I/(2fC)$ for FW. PIV: HW $V_m$, centre-tap $2V_m$, bridge $V_m$.
