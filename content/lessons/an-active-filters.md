# Active Filters

> Cutoff frequency, gain and Q of first- and second-order op-amp filters, and filter-response families, are tested regularly.

## Intuition

Op-amps let RC circuits act like filters with gain and no loading effects, with no inductors needed. A first-order section gives a 20 dB/decade roll-off. Second-order sections (such as Sallen–Key) give 40 dB/decade, with a **Q** that sets the shape near the cutoff.

## Key results

**First-order low-pass** (inverting: $R_1$ in, $R_2 \| C$ in feedback):
$$
H(j\omega) = -\frac{R_2}{R_1}\cdot\frac{1}{1 + j\omega R_2C}, \qquad f_c = \frac{1}{2\pi R_2C}.
$$
The high-pass version puts the capacitor in series with the input resistor.

**Second-order standard forms** (natural frequency $\omega_0$, quality factor $Q$):
$$
H_{LP} = \frac{K\omega_0^2}{s^2 + \frac{\omega_0}{Q}s + \omega_0^2}, \qquad H_{BP} = \frac{K\frac{\omega_0}{Q}s}{s^2 + \frac{\omega_0}{Q}s + \omega_0^2}.
$$
- **Unity-gain Sallen–Key low-pass:** $\omega_0 = \dfrac{1}{\sqrt{R_1R_2C_1C_2}}$. With equal R and equal C, $Q = 0.5$.
- **Equal-component Sallen–Key with gain $K$:** $Q = \dfrac{1}{3 - K}$; it is unstable for $K \ge 3$.

**Response families**

| Family | Passband | Transition | Second-order $Q$ |
|---|---|---|---|
| Butterworth | maximally flat | moderate | 0.707 |
| Chebyshev | ripple | sharper | above 0.707 |
| Bessel | flat group delay | gentle | 0.577 |

An $n$-th order filter rolls off at $20n$ dB/decade.
**Band-pass** bandwidth $= f_0/Q$. A **band-stop (notch)** filter rejects a band and passes everything else.

## Worked examples

**Example 1.** $R = 10\,\text{k}\Omega$, $C = 10$ nF: $f_c = \frac{1}{2\pi\times10^{-4}} = 1591.5$ Hz.

**Example 2.** An inverting low-pass with DC gain $-10$ has magnitude $10/\sqrt2 = 7.07$ at $f_c$.

**Example 3.** An equal-component Sallen–Key with $K = 1.586$ gives $Q = 1/1.414 = 0.707$ (Butterworth).

## Common GATE traps

- Using $R_1$ instead of the feedback resistor in $f_c$.
- Confusing a band-stop filter with a band-pass filter.

## Summary

- First order: $f_c = 1/(2\pi RC)$, 20 dB/decade. Second order: 40 dB/decade; Butterworth $Q = 0.707$.
- Sallen–Key equal components: $Q = 1/(3 - K)$.
