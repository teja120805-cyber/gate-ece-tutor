# Bode Plots, Gain Margin and Phase Margin

> Asymptotic Bode plots, crossover frequencies and stability margins are asked every year.

## Intuition

A Bode plot shows $20\log|G(j\omega)|$ and $\angle G(j\omega)$ against $\log\omega$. On log axes, products become sums, so each factor's straight-line approximation can be added. The margins measure how far the loop is from the critical point (gain 1 at −180°).

## Asymptotic contributions

| Factor | Magnitude | Phase |
|---|---|---|
| constant $K$ | flat at $20\log K$ | 0° (or 180° if $K < 0$) |
| $1/s^N$ | slope $-20N$ dB/dec through 0 dB at $\omega = 1$ | $-90N°$ |
| $\dfrac{1}{1 + s/\omega_c}$ | 0 dB, then $-20$ dB/dec beyond $\omega_c$ | 0 → −90° ($-45°$ at $\omega_c$) |
| $1 + s/\omega_c$ (zero) | $+20$ dB/dec beyond $\omega_c$ | 0 → +90° |
| quadratic pole | $-40$ dB/dec beyond $\omega_n$; peak near $\omega_n$ when $\zeta$ is small | 0 → −180° |

- The maximum asymptotic error for a first-order factor is 3 dB at the corner.
- In time-constant form $K/s^N\cdots$, the low-frequency line passes through $20\log K$ at $\omega = 1$.

## Margins

- **Gain crossover** $\omega_{gc}$: where $|GH| = 1$ (0 dB). **Phase margin** $\text{PM} = 180° + \angle GH(j\omega_{gc})$.
- **Phase crossover** $\omega_{pc}$: where $\angle GH = -180°$. **Gain margin** $\text{GM} = \dfrac{1}{|GH(j\omega_{pc})|}$, or $-20\log|GH(j\omega_{pc})|$ dB.
- For a minimum-phase system: stable ⇔ GM > 0 dB and PM > 0°.

## Worked examples

**Example 1.** $G = \dfrac{10}{s}$: crosses 0 dB at $\omega = 10$; PM $= 90°$.

**Example 2.** $G = \dfrac{10}{s(s + 1)}$: $\omega\sqrt{\omega^2 + 1} = 10$ ⇒ $\omega_{gc} \approx 3.08$; phase $= -90° - \tan^{-1}3.08 = -162°$ ⇒ PM $\approx 18°$.

**Example 3.** $G = \dfrac{1}{s(s + 1)(s + 2)}$: phase is $-180°$ at $\omega = \sqrt2$; $|G| = \frac{1}{\sqrt2\sqrt3\sqrt6} = \frac16$ ⇒ GM $= 6$ (15.6 dB).

## Common GATE traps

- Reading GM at the gain crossover instead of the phase crossover.
- Using the asymptotic magnitude when an exact crossover is needed.
- Applying margin criteria to non-minimum-phase or open-loop-unstable systems (use Nyquist).

## Summary

- Add factor asymptotes: poles −20 dB/dec, zeros +20 dB/dec, integrators −20 dB/dec through $\omega = 1$.
- PM $= 180° + \angle GH(\omega_{gc})$; GM $= 1/|GH(\omega_{pc})|$.
