# Frequency Response, Poles and Zeros

> "Find the steady-state output for a sinusoidal input" and "identify the filter type from the pole–zero plot" are standard GATE questions.

## Intuition

Feed a stable LTI system a sinusoid and, after transients die out, the output is a sinusoid at the **same frequency** — only scaled and phase-shifted. The frequency response $H(j\omega)$ records that scale ($|H|$) and shift ($\angle H$) for every frequency.

## Formal definition

$$
H(j\omega) = H(s)\big|_{s = j\omega} = \int_{-\infty}^{\infty}h(t)e^{-j\omega t}dt \quad (\text{stable systems}).
$$

$$
x(t) = A\cos(\omega_0 t + \theta) \;\Longrightarrow\; y_{ss}(t) = A\,|H(j\omega_0)|\cos\big(\omega_0 t + \theta + \angle H(j\omega_0)\big).
$$

## Poles, zeros and geometry

Write $H(s) = K\dfrac{\prod (s - z_i)}{\prod (s - p_i)}$. At $s = j\omega$:

$$
|H(j\omega)| = |K|\frac{\prod |j\omega - z_i|}{\prod |j\omega - p_i|}, \qquad \angle H = \sum\angle(j\omega - z_i) - \sum\angle(j\omega - p_i) \ (+\angle K).
$$

- A pole close to the $j\omega$ axis creates a **peak** near that frequency.
- A zero on the $j\omega$ axis creates a **null** (complete rejection).
- Zeros mirroring the poles in the right half-plane give an **all-pass** filter: $|H| = $ constant, only the phase changes.

## Key results

| $H(s)$ | Type | Notes |
|---|---|---|
| $\dfrac{\omega_c}{s + \omega_c}$ | low-pass | DC gain 1, $-3$ dB at $\omega_c$, phase $-45°$ there |
| $\dfrac{s}{s + \omega_c}$ | high-pass | 0 at DC, 1 at $\infty$ |
| $\dfrac{s - a}{s + a}$ | all-pass | $|H| = 1$, phase $180° - 2\tan^{-1}(\omega/a)$ |
| $\dfrac{s}{s^2 + (\omega_0/Q)s + \omega_0^2}$ | band-pass | peak at $\omega_0$, bandwidth $\omega_0/Q$ |
| $\dfrac{s^2 + \omega_0^2}{s^2 + (\omega_0/Q)s + \omega_0^2}$ | notch | null at $\omega_0$ |

Decibels: $20\log_{10}|H|$; a factor of $1/\sqrt2$ is $-3$ dB.

## Worked examples

**Example 1.** $H(s) = \dfrac{1}{s + 1}$, input $\cos t$: $|H(j1)| = 1/\sqrt2 = 0.707$, $\angle H = -45°$. So $y_{ss} = 0.707\cos(t - 45°)$.

**Example 2.** $H(s) = \dfrac{10}{s + 10}$ with input $2 + \cos 10t$: DC passes with gain 1 (output 2); at $\omega = 10$ the gain is $0.707$ at $-45°$. So $y_{ss} = 2 + 0.707\cos(10t - 45°)$.

**Example 3.** $H(s) = \dfrac{s - 1}{s + 1}$: $|H(j\omega)| = 1$ for all $\omega$ — all-pass.

## Common GATE traps

- Applying $H(j\omega)$ to an **unstable** system — no steady state exists.
- Forgetting that the phase of $K < 0$ adds $180°$.
- Computing the response to $\sin$ inputs as if they were $\cos$ — keep the same function, just add the phase.

## Summary

- Sinusoid in ⇒ same-frequency sinusoid out, scaled by $|H(j\omega_0)|$ and shifted by $\angle H(j\omega_0)$.
- Poles near the axis give peaks, zeros on the axis give nulls; mirrored zeros give all-pass.
