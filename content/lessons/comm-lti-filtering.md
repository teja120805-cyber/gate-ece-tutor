# Filtering of Random Signals through LTI Systems

> Output noise power through filters (ideal and RC) and output mean are standard numericals.

## Intuition

A filter reshapes the spectrum of whatever passes through it — including noise. Power at each frequency is multiplied by the **squared** magnitude response, so the output PSD is the input PSD sculpted by $|H(f)|^2$.

## Key results

For a WSS input $X$ to a stable LTI system $h(t) \leftrightarrow H(f)$:

$$
\mu_Y = \mu_XH(0), \qquad S_Y(f) = |H(f)|^2S_X(f), \qquad R_Y(\tau) = h(\tau) * h(-\tau) * R_X(\tau).
$$

Output power: $P_Y = \int|H(f)|^2S_X(f)\,df$.

**White noise ($N_0/2$) through common filters:**

| Filter | Output noise power |
|---|---|
| ideal LPF, gain 1, bandwidth $B$ | $N_0B$ |
| ideal BPF, bandwidth $B$ | $N_0B$ |
| RC low-pass $\frac{1}{1 + j2\pi fRC}$ | $\dfrac{N_0}{4RC}$ |

**Noise-equivalent bandwidth:** $B_N = \dfrac{\int_0^\infty|H(f)|^2df}{|H(0)|^2}$. For an RC low-pass, $B_N = \frac{1}{4RC} = \frac{\pi}{2}f_{3dB}$.

Gaussian input ⇒ Gaussian output.

## Worked examples

**Example 1.** $N_0/2 = 10^{-3}$ W/Hz through an ideal LPF with $B = 1$ kHz: $P = 10^{-3}\times2000 = 2$ W.

**Example 2.** $N_0 = 2\times10^{-6}$ through an RC LPF with $RC = 1$ ms: $P = \frac{2\times10^{-6}}{4\times10^{-3}} = 0.5$ mW.

**Example 3.** Input mean 2 through a filter with $H(0) = 3$: output mean 6.

## Common GATE traps

- Using $|H|$ instead of $|H|^2$.
- One-sided versus two-sided PSD conventions.

## Summary

- $S_Y = |H|^2S_X$, $\mu_Y = \mu_XH(0)$.
- White noise: ideal filter $N_0B$; RC filter $N_0/(4RC)$.
