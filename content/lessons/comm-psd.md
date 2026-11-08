# Power Spectral Density and White Noise

> The Wiener–Khinchin theorem and white-noise power within a bandwidth are standard calculations.

## Intuition

The power spectral density (PSD) shows how a random signal's power is distributed over frequency. Integrating the PSD over a band gives the power in that band. **White noise** has the same PSD at all frequencies — "white" by analogy with white light.

## Key results

**Wiener–Khinchin:** for a WSS process,
$$
S_X(f) = \int_{-\infty}^{\infty}R_X(\tau)e^{-j2\pi f\tau}d\tau, \qquad R_X(\tau) = \int S_X(f)e^{j2\pi f\tau}df .
$$

**Properties:**
- $S_X(f) \ge 0$ and real; even for real processes.
- Power $= R_X(0) = \int_{-\infty}^{\infty}S_X(f)\,df$.
- $S_X(0) = \int R_X(\tau)\,d\tau$.

**White noise:** $S_N(f) = N_0/2$ (two-sided), $R_N(\tau) = \frac{N_0}{2}\delta(\tau)$: samples at different times are uncorrelated. Over a band of width $B$ (from $-B$ to $B$), the power is $N_0B$. Thermal noise has $N_0 = kT$.

**Common pairs:**

| $R_X(\tau)$ | $S_X(f)$ |
|---|---|
| $e^{-a|\tau|}$ | $\dfrac{2a}{a^2 + (2\pi f)^2}$ |
| $\dfrac{A^2}{2}\cos2\pi f_0\tau$ | $\dfrac{A^2}{4}[\delta(f - f_0) + \delta(f + f_0)]$ |
| $\operatorname{sinc}$-type (band-limited white) | rectangular |

## Worked examples

**Example 1.** $N_0/2 = 10^{-6}$ W/Hz over $|f| < 1$ kHz: power $= 2\times10^3\times10^{-6} = 2$ mW.

**Example 2.** $R(\tau) = e^{-2|\tau|}$: $S(f) = \frac{4}{4 + (2\pi f)^2}$, so $S(0) = 1$.

## Common GATE traps

- Confusing one-sided ($N_0$) and two-sided ($N_0/2$) PSDs.
- Integrating only over positive frequencies with a two-sided PSD.

## Summary

- PSD = Fourier transform of $R_X$; power = $\int S_X\,df$.
- White noise: flat $N_0/2$, impulse autocorrelation; power in $\pm B$ is $N_0B$.
