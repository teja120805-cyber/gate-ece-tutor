# Angle Modulation and Demodulation

> FM/PM deviation, modulation index, Carson's rule and spectra are asked almost every year.

## Intuition

In angle modulation the message varies the carrier's **phase** (PM) or **frequency** (FM), and the amplitude stays constant. Constant amplitude makes it robust to amplitude noise and non-linear amplifiers, at the cost of more bandwidth.

## Formal definitions

$s(t) = A_c\cos[2\pi f_ct + \phi(t)]$:
- **PM:** $\phi(t) = k_pm(t)$.
- **FM:** instantaneous frequency $f_i = f_c + k_fm(t)$, so $\phi(t) = 2\pi k_f\int m\,dt$.

For a single tone $m(t) = A_m\cos2\pi f_mt$:
- frequency deviation $\Delta f = k_fA_m$ (FM);
- modulation index $\beta = \Delta f/f_m$;
- $s(t) = A_c\cos(2\pi f_ct + \beta\sin2\pi f_mt)$.

## Key results

- **Spectrum** (tone): $s(t) = A_c\sum_n J_n(\beta)\cos2\pi(f_c + nf_m)t$ (Bessel functions). In principle there are infinitely many sidebands.
- **Carson's rule:** $B_T \approx 2(\Delta f + f_m) = 2f_m(\beta + 1)$.
- **Narrowband FM** ($\beta \ll 1$): $B_T \approx 2f_m$, like AM.
- **Power** $= A_c^2/2$, independent of $\beta$ (power is redistributed among the sidebands).
- **PM vs FM:** PM's frequency deviation is proportional to $dm/dt$. FM of $m$ equals PM of $\int m$.
- **Demodulation:** frequency discriminator (slope detector, Foster–Seeley), PLL, zero-crossing detector. A limiter removes amplitude variations first.
- **Pre-emphasis / de-emphasis** improve the SNR of high-frequency audio.
- **Frequency multiplication** by $n$ multiplies both $f_c$ and $\Delta f$ by $n$.

## Worked examples

**Example 1.** $\Delta f = 75$ kHz, $f_m = 15$ kHz: $\beta = 5$, $B_T = 2(75 + 15) = 180$ kHz.

**Example 2.** $k_f = 10$ kHz/V, $A_m = 2$ V, $f_m = 5$ kHz: $\Delta f = 20$ kHz, $\beta = 4$, $B_T = 50$ kHz.

**Example 3.** $\phi(t) = 3\sin(2\pi\cdot10^3t)$: peak phase deviation 3 rad; peak frequency deviation $= 3\times1$ kHz $= 3$ kHz.

## Common GATE traps

- Using $\beta$ in Carson's rule without the $+1$.
- Thinking FM power depends on $\beta$.

## Summary

- $\beta = \Delta f/f_m$; Carson $B_T = 2(\Delta f + f_m)$.
- Constant power $A_c^2/2$; PM ↔ FM through differentiation and integration.
