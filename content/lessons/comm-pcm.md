# PCM and DPCM

> Bit rate, number of levels, SQNR (6 dB per bit), and delta-modulation slope overload are standard questions.

## Intuition

Pulse-code modulation digitises an analog signal in three steps: **sample** (at or above the Nyquist rate), **quantise** each sample to one of $L = 2^n$ levels, and **encode** each level in $n$ bits. Quantisation adds an error that behaves like noise; each extra bit halves the step size, improving the SNR by about 6 dB.

## Key results

- **Bit rate:** $R_b = nf_s$; the minimum transmission bandwidth is $R_b/2$ (Nyquist).
- **Step size** $\Delta = \dfrac{2m_p}{L}$ for a range $\pm m_p$; quantisation-noise power $= \Delta^2/12$.
- **SQNR** for a full-scale sinusoid: $\approx 6.02n + 1.76$ dB. For a uniformly distributed signal: $6.02n$ dB.
- **Companding** (μ-law, A-law) gives a nearly constant SQNR over a wide dynamic range.
- **DPCM:** quantise the difference between a sample and its prediction. The difference is smaller, so fewer bits are needed for the same quality.
- **Delta modulation (DM):** 1 bit per sample (step $\pm\Delta$), with a high sampling rate.
  - **Slope overload** occurs when $\Delta f_s < \max\left|\frac{dm}{dt}\right|$ (the step is too small). For a tone $A_m\cos2\pi f_mt$, avoiding it needs $\Delta f_s \ge 2\pi f_mA_m$.
  - **Granular noise** appears when $\Delta$ is too large.
  - Adaptive DM varies $\Delta$.

## Worked examples

**Example 1.** A 4 kHz message sampled at 8 kHz with 8 bits: $R_b = 64$ kbps.

**Example 2.** 8 bits: SQNR $\approx 1.76 + 48.16 = 49.9$ dB.

**Example 3.** For SQNR ≥ 40 dB: $6.02n + 1.76 \ge 40$ ⇒ $n \ge 6.35$ ⇒ 7 bits.

**Example 4.** DM with $f_s = 64$ kHz, tone $f_m = 1$ kHz with $A_m = 1$ V: the minimum $\Delta$ is $\frac{2\pi\times1000\times1}{64000} = 0.098$ V.

## Common GATE traps

- Using $L$ instead of $n = \log_2 L$ for bits.
- Thinking slope overload means the step is too big (it is too small).

## Summary

- $R_b = nf_s$; SQNR ≈ $6.02n + 1.76$ dB for a sinusoid.
- DPCM sends prediction errors; DM is 1-bit, with slope overload if $\Delta f_s <$ the signal slope.
