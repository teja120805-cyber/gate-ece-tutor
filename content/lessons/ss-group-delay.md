# Group Delay and Phase Delay

> Short but frequent: compute $\tau_g$ or $\tau_p$ from a phase expression, or decide whether a system is distortionless.

## Intuition

A narrowband signal is a carrier with a slowly varying envelope. A system can delay these two parts differently: the **envelope** (the information) is delayed by the **group delay**, and the **carrier** phase by the **phase delay**. If every frequency is delayed equally, the waveform passes undistorted.

## Formal definitions

For $H(\omega) = |H(\omega)|e^{j\phi(\omega)}$:

$$
\tau_g(\omega) = -\frac{d\phi(\omega)}{d\omega}, \qquad \tau_p(\omega) = -\frac{\phi(\omega)}{\omega}.
$$

## Key results

**Distortionless transmission:** $y(t) = K\,x(t - t_0)$ ⇔ $H(\omega) = K e^{-j\omega t_0}$:
- constant magnitude $|H| = K$ over the signal band;
- linear phase $\phi = -\omega t_0$, so $\tau_g = \tau_p = t_0$.

A phase $\phi = -\omega t_0 + \phi_0$ (linear but with an offset) still gives constant group delay, so the envelope is undistorted, but $\tau_p \ne \tau_g$.

**Narrowband input** $x(t) = m(t)\cos\omega_c t$ through $H$:
$$
y(t) \approx |H(\omega_c)|\; m(t - \tau_g)\cos\big(\omega_c(t - \tau_p)\big).
$$

**First-order system** $H = \dfrac{1}{1 + j\omega\tau}$: $\phi = -\tan^{-1}\omega\tau$, so $\tau_g = \dfrac{\tau}{1 + \omega^2\tau^2}$.

**DT:** $\tau_g(\omega) = -d\phi/d\omega$ in samples. A symmetric FIR filter of length $N$ has linear phase with constant delay $(N-1)/2$ samples.

## Worked examples

**Example 1.** $H(\omega) = 2e^{-j3\omega}$ ⇒ $y(t) = 2x(t - 3)$; $\tau_g = \tau_p = 3$.

**Example 2.** $\phi(\omega) = -2\omega - \pi/4$: $\tau_g = 2$. At $\omega = \pi/4$: $\tau_p = (2\cdot\frac{\pi}{4} + \frac{\pi}{4})/\frac{\pi}{4} = 3$.

**Example 3.** $\tau = 0.5$, $\omega = 2$: $\tau_g = 0.5/(1 + 1) = 0.25$.

**Example 4.** $\phi(\omega) = -\omega^3$: $\tau_g = 3\omega^2$ — frequency dependent, so there is dispersion.

## Common GATE traps

- Forgetting the minus signs in both definitions.
- Assuming zero phase is required for distortionless transmission — any linear phase works.
- Computing group delay from $\tan\phi$ instead of $\phi$.

## Summary

- $\tau_g = -d\phi/d\omega$ (envelope); $\tau_p = -\phi/\omega$ (carrier).
- Distortionless ⇔ flat magnitude and linear phase over the band.
