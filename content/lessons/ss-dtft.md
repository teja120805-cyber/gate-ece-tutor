# Discrete-Time Fourier Transform (DTFT)

> The DTFT is the frequency-domain view of sequences and the bridge to the DFT and digital filters.

## Intuition

A sequence can be built from complex exponentials $e^{j\omega n}$. Because $e^{j(\omega + 2\pi)n} = e^{j\omega n}$ for integer $n$, frequencies $\omega$ and $\omega + 2\pi$ are **the same** in discrete time. So the spectrum is periodic with period $2\pi$, and only $-\pi < \omega \le \pi$ matters. $\omega = \pi$ is the fastest possible oscillation, $(-1)^n$.

## Formal definition

$$
X(e^{j\omega}) = \sum_{n=-\infty}^{\infty}x[n]\,e^{-j\omega n}, \qquad x[n] = \frac{1}{2\pi}\int_{-\pi}^{\pi}X(e^{j\omega})\,e^{j\omega n}\,d\omega .
$$

The sum converges for absolutely summable $x[n]$.

## Key pairs

| $x[n]$ | $X(e^{j\omega})$ |
|---|---|
| $\delta[n]$ | $1$ |
| $\delta[n - n_0]$ | $e^{-j\omega n_0}$ |
| $a^n u[n]$, $|a| < 1$ | $\dfrac{1}{1 - ae^{-j\omega}}$ |
| rectangle, $n = 0..N-1$ | $e^{-j\omega(N-1)/2}\dfrac{\sin(\omega N/2)}{\sin(\omega/2)}$ |
| $\dfrac{\sin\omega_c n}{\pi n}$ | ideal LPF: 1 for $|\omega| < \omega_c$ |
| $e^{j\omega_0 n}$ | $2\pi\sum_k\delta(\omega - \omega_0 - 2\pi k)$ |

## Key properties

- Shift: $x[n - n_0] \to e^{-j\omega n_0}X$. Modulation: $e^{j\omega_0 n}x[n] \to X(e^{j(\omega - \omega_0)})$.
- Convolution ↔ product; multiplication ↔ periodic convolution $\frac{1}{2\pi}\int_{2\pi}$.
- $X(e^{j0}) = \sum_n x[n]$; $X(e^{j\pi}) = \sum_n (-1)^n x[n]$; $x[0] = \frac{1}{2\pi}\int_{-\pi}^{\pi}X\,d\omega$.
- Parseval: $\sum|x[n]|^2 = \frac{1}{2\pi}\int_{-\pi}^{\pi}|X|^2d\omega$.
- Real $x$: $X(e^{-j\omega}) = X^*(e^{j\omega})$, so $|X|$ is even and the phase is odd.
- Relation to the z-transform: $X(e^{j\omega}) = X(z)|_{z = e^{j\omega}}$ when the ROC contains the unit circle.

## Worked examples

**Example 1.** $x = \{1, 2, 3\}$ ($n = 0, 1, 2$): $X(e^{j0}) = 6$, $X(e^{j\pi}) = 1 - 2 + 3 = 2$.

**Example 2.** $x[n] = (0.5)^n u[n]$: $\frac{1}{2\pi}\int|X|^2d\omega = \sum 0.25^n = \frac{1}{1 - 0.25} = 1.333$.

**Example 3.** $x[n] = \delta[n] + \delta[n - 2]$: $X = 1 + e^{-j2\omega} = 2\cos\omega\, e^{-j\omega}$, so $|X| = 2|\cos\omega|$, with nulls at $\omega = \pm\pi/2$.

## Common GATE traps

- Treating the DTFT as non-periodic.
- Using $(1/N)$ DFT-style normalisation in DTFT Parseval — the DTFT uses $\frac{1}{2\pi}\int$.
- Forgetting that $a^n u[n]$ has a DTFT only for $|a| < 1$.

## Summary

- Periodic in $\omega$ with period $2\pi$; $\omega = \pi$ is the highest frequency.
- $X(e^{j0}) = \sum x$, $X(e^{j\pi}) = \sum(-1)^n x$.
- It is the z-transform evaluated on the unit circle.
