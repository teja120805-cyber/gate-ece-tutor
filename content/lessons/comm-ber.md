# SNR and Bit Error Rate

> BER expressions for BPSK, BFSK, QPSK and OOK, and converting SNR to $E_b/N_0$, are frequent questions.

## Intuition

Errors happen when noise pushes a received sample across the decision threshold. What matters is the distance between constellation points relative to the noise: in normalised terms, the energy per bit $E_b$ compared with the noise PSD $N_0$.

## Key results (coherent detection, AWGN, optimum receiver)

| Scheme | BER | Comment |
|---|---|---|
| BPSK / antipodal | $Q\left(\sqrt{2E_b/N_0}\right)$ | best binary |
| QPSK (Gray coded, per bit) | $Q\left(\sqrt{2E_b/N_0}\right)$ | same as BPSK |
| coherent BFSK / orthogonal | $Q\left(\sqrt{E_b/N_0}\right)$ | 3 dB worse |
| OOK (average $E_b$) | $Q\left(\sqrt{E_b/N_0}\right)$ | — |
| non-coherent BFSK | $\frac12e^{-E_b/2N_0}$ | worse than coherent |
| DPSK | $\frac12e^{-E_b/N_0}$ | — |

- $Q(x) = P(Z > x)$ for a standard normal $Z$. Useful values: $Q(1) \approx 0.159$, $Q(2) \approx 0.0228$, $Q(3) \approx 1.35\times10^{-3}$, $Q(4) \approx 3.2\times10^{-5}$.
- **SNR ↔ $E_b/N_0$:** $\dfrac{E_b}{N_0} = \text{SNR}\times\dfrac{B}{R_b}$.
- Conversions: dB $= 10\log_{10}(\text{ratio})$; 3 dB ≈ ×2; 10 dB = ×10.

## Worked examples

**Example 1.** BPSK with $E_b/N_0 = 4.5$ (6.5 dB): BER $= Q(\sqrt9) = Q(3) \approx 1.35\times10^{-3}$.

**Example 2.** Coherent BFSK at the same $E_b/N_0$: $Q(\sqrt{4.5}) = Q(2.12) \approx 0.017$ — much worse.

**Example 3.** SNR = 20 (13 dB), $B = 1$ MHz, $R_b = 2$ Mbps: $E_b/N_0 = 20\times0.5 = 10$ (10 dB).

## Common GATE traps

- Forgetting the factor 2 inside the square root for antipodal signals.
- Mixing dB and linear values inside $Q(\cdot)$.

## Summary

- BPSK/QPSK: $Q(\sqrt{2E_b/N_0})$; BFSK/OOK: $Q(\sqrt{E_b/N_0})$ (3 dB worse).
- $E_b/N_0 = \text{SNR}\cdot B/R_b$.
