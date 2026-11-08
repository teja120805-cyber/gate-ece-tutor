# Digital Modulation Schemes

> Bits per symbol, symbol rate, bandwidth and the relative performance of ASK, PSK, FSK and QAM are frequent questions.

## Intuition

Digital modulation maps groups of bits to waveform "symbols" by changing a carrier's amplitude (ASK), phase (PSK), frequency (FSK), or amplitude and phase together (QAM). Packing more bits into each symbol saves bandwidth, but the symbols sit closer together in the **constellation**, so noise causes more errors for the same energy.

## Key results

- $M$-ary scheme: $k = \log_2M$ bits per symbol; symbol rate $R_s = R_b/k$.

| Scheme | Constellation | Notes |
|---|---|---|
| BASK (OOK) | 0 and $A$ | simple, poor noise performance |
| BPSK | $\pm A$ (antipodal) | best binary scheme |
| QPSK | 4 phases (2 bits) | same BER vs $E_b/N_0$ as BPSK, at **half** the bandwidth |
| $M$-PSK | constant envelope | error rate rises with $M$ |
| BFSK | two tones | coherent: needs 3 dB more $E_b/N_0$ than BPSK (orthogonal) |
| $M$-QAM | grid (16, 64, ...) | spectrally efficient; not constant envelope |

**Bandwidth** (rectangular pulses, null-to-null): BPSK/BASK $2R_b$; QPSK $R_b$; $M$-ary PSK/QAM $2R_s = 2R_b/\log_2M$. With raised-cosine pulses: $B = R_s(1 + \alpha)$ (passband).

**Spectral efficiency** $R_b/B$ grows with $\log_2M$ for PSK and QAM. $M$-ary FSK is the opposite: it uses more bandwidth but less power.

## Worked examples

**Example 1.** 16-QAM carries 4 bits/symbol; at 10 Mbps the symbol rate is 2.5 Mbaud.

**Example 2.** BPSK at 1 Mbps with rectangular pulses: null-to-null bandwidth 2 MHz (QPSK would need 1 MHz).

**Example 3.** 64-QAM carries 6 bits/symbol; at 6 Msymbols/s that is 36 Mbps.

## Common GATE traps

- Assuming QPSK has a worse bit error rate than BPSK at the same $E_b/N_0$ (they are equal).
- Calling QAM constant-envelope.

## Summary

- $k = \log_2M$, $R_s = R_b/k$.
- BPSK and QPSK have the same BER; QPSK halves the bandwidth. FSK costs 3 dB; QAM is the most bandwidth-efficient.
