# Amplitude Modulation and Demodulation

> AM power, efficiency, modulation index, bandwidth and detection appear regularly in GATE, often as quick 1-mark numericals.

## Intuition

To send a low-frequency message $m(t)$ over radio, we let it control the **amplitude** of a high-frequency carrier $\cos\omega_c t$. Multiplication by the carrier shifts the message spectrum up to $\pm f_c$, creating two mirror-image **sidebands** around the carrier.

## Formal definitions

**DSB-FC (conventional AM):**
$$
s(t) = A_c[1 + \mu\,m_n(t)]\cos\omega_c t, \qquad |m_n(t)| \le 1 .
$$
For a single tone, $s(t) = A_c[1 + \mu\cos\omega_m t]\cos\omega_c t$, which expands into carrier $+$ USB at $f_c + f_m$ $+$ LSB at $f_c - f_m$, each sideband with amplitude $\mu A_c/2$.

**DSB-SC:** $s(t) = A_c\,m(t)\cos\omega_c t$ (no carrier term).

**SSB:** only one sideband is transmitted (Hilbert transform or filtering).

## Key results

**Modulation index from the envelope:**
$$
\mu = \frac{A_{max} - A_{min}}{A_{max} + A_{min}} .
$$

**Power (single tone, DSB-FC):**
$$
P_t = P_c\left(1 + \frac{\mu^2}{2}\right), \qquad \eta = \frac{\mu^2}{2 + \mu^2}\ \ (\le 33.3\% \text{ at } \mu = 1).
$$
Multiple tones: $\mu_{eff} = \sqrt{\mu_1^2 + \mu_2^2 + \dots}$.
Current form: $I_t = I_c\sqrt{1 + \mu^2/2}$.

**Bandwidth** for a message bandwidth $W$:

| Scheme | Bandwidth | Detection |
|---|---|---|
| DSB-FC | $2W$ | envelope detector (needs $\mu \le 1$) |
| DSB-SC | $2W$ | coherent (synchronous) |
| SSB | $W$ | coherent |
| VSB | slightly more than $W$ | coherent, or envelope with a carrier added |

**Envelope detector RC choice:** $\dfrac{1}{f_c} \ll RC \ll \dfrac{1}{W}$. If $RC$ is too large, the output cannot follow the envelope (**diagonal clipping**).

**Coherent detection:** multiply by $\cos(\omega_c t + \phi)$ and low-pass filter, which gives $\tfrac{1}{2}A_c\,m(t)\cos\phi$. A phase error attenuates the output (zero at $\phi = 90°$); a frequency error causes beating.

## Visual picture

| Spectrum of a single-tone AM signal | |
|---|---|
| $f_c - f_m$ | LSB, amplitude $\mu A_c/2$ |
| $f_c$ | carrier, amplitude $A_c$ |
| $f_c + f_m$ | USB, amplitude $\mu A_c/2$ |

## Worked examples

**Example 1.** $P_c = 100$ W, $\mu = 1$: $P_t = 150$ W; sidebands carry 50 W (33.3%).

**Example 2.** Envelope between 5 V and 15 V: $\mu = 10/20 = 0.5$; $\eta = 0.25/2.25 = 11.1\%$.

**Example 3.** Two tones with $\mu_1 = 0.3$, $\mu_2 = 0.4$: $\mu_{eff} = 0.5$, $P_t = P_c(1.125)$.

**Example 4.** A 5 kHz message: DSB needs 10 kHz, SSB 5 kHz.

## Common GATE traps

- **Overmodulation** ($\mu > 1$) — the envelope detector distorts the output.
- **Using $\mu^2/2$ for DSB-SC** — DSB-SC has no carrier; all of its power is in the sidebands.
- **Bandwidth of DSB = $W$** — wrong; DSB is $2W$.
- **Coherent detector phase error** — output scales with $\cos\phi$.

## Summary

- $\mu = (A_{max} - A_{min})/(A_{max} + A_{min})$; $P_t = P_c(1 + \mu^2/2)$; $\eta = \mu^2/(2 + \mu^2)$.
- DSB bandwidth $2W$, SSB $W$.
- Envelope detection only for DSB-FC with $\mu \le 1$; DSB-SC and SSB need coherent detection.
