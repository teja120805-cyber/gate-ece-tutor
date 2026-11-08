# Lag, Lead and Lag–Lead Compensation

> Maximum phase lead, the frequency of maximum lead, and the effects of each compensator on transient and steady-state behaviour.

## Intuition

- A **lead** compensator adds positive phase near the crossover frequency. It raises the phase margin, speeds up the response and widens the bandwidth (like a PD controller).
- A **lag** compensator boosts low-frequency gain relative to high-frequency gain. It improves steady-state accuracy without disturbing the transient much, but slows the response slightly (like a PI controller).
- **Lag–lead** combines both.

## Formulas

**Lead:** $G_c(s) = \dfrac{1 + aTs}{1 + Ts}$ with $a > 1$ (zero at $-1/aT$, pole at $-1/T$; the zero is closer to the origin).
$$
\phi_{max} = \sin^{-1}\frac{a - 1}{a + 1}, \qquad \omega_m = \frac{1}{T\sqrt a}, \qquad |G_c(j\omega_m)| = \sqrt a\ (10\log a\ \text{dB}).
$$

**Lag:** $G_c(s) = \dfrac{1 + Ts}{1 + bTs}$ with $b > 1$ (the pole is closer to the origin). It gives high-frequency attenuation of $1/b$ ($-20\log b$ dB). Place its corners well below the gain crossover so the phase lag there is small.

## Comparison

| | Lead | Lag |
|---|---|---|
| Phase | adds positive phase | adds negative phase (kept away from crossover) |
| PM and stability | improves | can improve by lowering the crossover frequency |
| Bandwidth | increases | decreases |
| Speed | faster | slower |
| Steady-state error | little effect | reduces (higher low-frequency gain) |
| Noise | more high-frequency noise | filters noise |

## Worked examples

**Example 1.** $a = 4$: $\phi_{max} = \sin^{-1}(3/5) = 36.87°$.

**Example 2.** $T = 0.1$, $a = 4$: $\omega_m = \frac{1}{0.1\times2} = 5$ rad/s.

**Example 3.** To add 30° of lead: $\sin30° = \frac{a - 1}{a + 1}$ ⇒ $a = 3$.

## Common GATE traps

- Swapping the pole/zero order between lead and lag.
- Thinking a lag compensator adds phase lead.

## Summary

- Lead: $\phi_{max} = \sin^{-1}\frac{a - 1}{a + 1}$ at $\omega_m = 1/(T\sqrt a)$; improves PM and speed.
- Lag: improves steady-state error and reduces bandwidth.
