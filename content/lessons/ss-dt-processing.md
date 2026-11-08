# Discrete-Time Processing of Continuous-Time Signals

> Questions map analog frequencies to digital ones, or find the analog filter equivalent to a digital system between an A/D and a D/A converter.

## Intuition

Sample an analog signal (C/D conversion), process it digitally, then reconstruct (D/C conversion). If the input is band-limited and sampled fast enough, the whole chain behaves like a single **analog LTI filter** whose response is the digital response with the frequency axis rescaled.

## Formal relations

With sampling period $T = 1/f_s$:

$$
x[n] = x_c(nT), \qquad \omega = \Omega T = 2\pi\frac{f}{f_s}
$$

($\Omega$ in rad/s, $f$ in Hz, $\omega$ in rad/sample). Digital $\omega = \pi$ corresponds to $f_s/2$.

**Effective analog response** (band-limited input, no aliasing, ideal D/C):
$$
H_{\text{eff}}(j\Omega) = \begin{cases} H(e^{j\Omega T}), & |\Omega| < \pi/T \\ 0, & |\Omega| > \pi/T \end{cases}
$$

## Key results

- A digital cutoff $\omega_c$ corresponds to an analog cutoff $f_c = \dfrac{\omega_c}{2\pi}f_s$.
- A delay of $M$ samples corresponds to $MT$ seconds.
- Frequencies above $f_s/2$ alias: a tone at $f_0$ appears at digital frequency $2\pi f_0/f_s$ folded into $(-\pi, \pi]$, i.e. at $|f_0 - kf_s|$ Hz.
- Changing $f_s$ changes the analog response of the same digital filter (cutoffs scale with $f_s$).
- The overall system is LTI only for band-limited inputs without aliasing.

## Worked examples

**Example 1.** $f_s = 10$ kHz, a 2.5 kHz tone: $\omega = 2\pi(0.25) = \pi/2$.

**Example 2.** An ideal digital LPF with $\omega_c = \pi/4$ at $f_s = 8$ kHz acts as an analog LPF with cutoff $\frac{1}{8}\times 8 = 1$ kHz.

**Example 3.** $y[n] = x[n - 4]$ at $f_s = 2$ kHz delays the analog signal by $4 \times 0.5 = 2$ ms.

**Example 4.** A 7 kHz tone sampled at 10 kHz: $\omega = 1.4\pi \equiv -0.6\pi$, so it is reconstructed as 3 kHz (aliasing).

## Common GATE traps

- Mixing up rad/s, Hz and rad/sample.
- Forgetting that digital $\pi$ ↔ $f_s/2$, not $f_s$.
- Ignoring aliasing when the input exceeds $f_s/2$.

## Summary

- $\omega = 2\pi f/f_s$; $\pi$ ↔ $f_s/2$.
- $H_{\text{eff}}(j\Omega) = H(e^{j\Omega T})$ inside the Nyquist band; delays scale by $T$.
