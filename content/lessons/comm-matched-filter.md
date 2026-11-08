# Matched Filter Receiver

> Impulse response, peak output SNR $2E/N_0$, and the equivalence with a correlator are tested almost every year.

## Intuition

To detect a known pulse buried in white noise, use a filter shaped like the pulse itself, reversed in time. At the sampling instant, the filter adds up all of the signal's energy coherently, while the noise adds up incoherently. This maximises the signal-to-noise ratio at that one instant.

## Key results

For a signal $s(t)$ on $[0, T]$ in white noise of PSD $N_0/2$:

$$
h(t) = k\,s(T - t), \qquad H(f) = kS^*(f)e^{-j2\pi fT}.
$$

$$
\text{SNR}_{max} = \frac{2E}{N_0}, \qquad E = \int_0^T s^2(t)\,dt .
$$

- The output peaks at $t = T$, with value proportional to $E$.
- The maximum SNR depends only on the signal **energy**, not its shape.
- **Correlator equivalence:** $\int_0^T r(t)s(t)\,dt$ equals the matched-filter output sampled at $T$.
- The matched-filter output is the autocorrelation of $s(t)$, shifted by $T$; a rectangular pulse gives a triangle peaking at $T$.
- For coloured noise, whiten first, then match.

## Worked examples

**Example 1.** A 1 V rectangular pulse lasting 1 ms: $E = 10^{-3}$ J. With $N_0 = 10^{-4}$ W/Hz: SNR $= 2\times10^{-3}/10^{-4} = 20$ (13 dB).

**Example 2.** For $s(t) = t$ on $[0, T]$: $h(t) = T - t$ on $[0, T]$.

## Common GATE traps

- Using $E/N_0$ instead of $2E/N_0$ (that depends on the PSD convention; with two-sided $N_0/2$ it is $2E/N_0$).
- Sampling the output at the wrong time (it must be $t = T$).

## Summary

- $h(t) = s(T - t)$; sample at $T$; $\text{SNR}_{max} = 2E/N_0$.
- Equivalent to correlating with $s(t)$.
