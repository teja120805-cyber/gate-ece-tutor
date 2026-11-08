# Energy, Power, Even/Odd and Periodic Signals

> Classifying a signal (energy vs power, periodic or not, fundamental period) is a frequent 1-mark question and a prerequisite for Fourier series and PSD.

## Intuition

- An **energy signal** is a "burst": finite total energy, so its average power over all time is zero (a decaying pulse).
- A **power signal** goes on forever with finite average power, so its total energy is infinite (a sinusoid).
- A **periodic** signal repeats exactly; the smallest repeat interval is its **fundamental period**.

## Formal definitions

$$
E = \int_{-\infty}^{\infty}|x(t)|^2\,dt, \qquad P = \lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}|x(t)|^2\,dt
$$

Discrete time: $E = \sum_n |x[n]|^2$, $P = \lim_{N\to\infty}\frac{1}{2N+1}\sum_{-N}^{N}|x[n]|^2$.

- Energy signal: $0 < E < \infty$ (then $P = 0$). Power signal: $0 < P < \infty$ (then $E = \infty$). Some signals are neither (e.g. $t\,u(t)$).
- For a periodic signal, $P = \frac{1}{T_0}\int_{T_0}|x(t)|^2dt$.
- Even: $x(-t) = x(t)$; odd: $x(-t) = -x(t)$. Every signal splits uniquely as $x = x_e + x_o$ with $x_e = \frac12[x(t) + x(-t)]$, $x_o = \frac12[x(t) - x(-t)]$.

## Key results

| Signal | Classification / value |
|---|---|
| $e^{-at}u(t)$, $a>0$ | energy, $E = \frac{1}{2a}$ |
| $A\cos(\omega_0 t + \phi)$ | power, $P = \frac{A^2}{2}$ |
| $A e^{j\omega_0 t}$ | power, $P = |A|^2$ |
| $u(t)$ | power, $P = \frac12$ |
| $\sum_k A_k\cos(\omega_k t + \phi_k)$, distinct $\omega_k$ | $P = \sum A_k^2/2$ (DC term contributes $A_0^2$) |

**Periodicity of sums (CT).** $x_1 + x_2$ is periodic iff $T_1/T_2$ is rational; then $T_0 = \text{LCM}(T_1, T_2)$.

**Periodicity in DT.** $\cos(\omega_0 n)$ is periodic iff $\omega_0/2\pi = k/N$ is rational; the period is the smallest such $N$. So $\cos(n/4)$ is **not** periodic, while $\cos(\pi n/4)$ has $N = 8$.

**Properties.** even × even = even, odd × odd = even, even × odd = odd; $\int_{-a}^{a}x_o = 0$; the energy of $x$ equals the energy of $x_e$ plus the energy of $x_o$.

## Worked examples

**Example 1.** $E\{e^{-2t}u(t)\} = \int_0^\infty e^{-4t}dt = \tfrac14$.

**Example 2.** $x(t) = 3\cos 2t + 4\sin 3t$: periods $\pi$ and $2\pi/3$, ratio $3/2$ (rational), so $T_0 = 2\pi$. Power $= 9/2 + 16/2 = 12.5$.

**Example 3.** $x[n] = \cos(\pi n/4) + \sin(\pi n/6)$: periods 8 and 12, so $N = 24$.

**Example 4.** $x(t) = \cos t + \cos(\sqrt2\,t)$ is **not** periodic (irrational ratio), but it is still a power signal with $P = 1$.

## Common GATE traps

- Assuming every DT sinusoid is periodic.
- Adding powers of sinusoids **at the same frequency** — those must be combined as phasors first.
- Calling $u(t)$ an energy signal.

## Summary

- Energy: $\int|x|^2$; power: time-average of $|x|^2$. A signal cannot be both.
- Sinusoid power $A^2/2$; different frequencies add in power.
- CT sum periodic iff period ratio rational; DT sinusoid periodic iff $\omega_0/2\pi$ rational.
