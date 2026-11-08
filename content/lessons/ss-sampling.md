# Sampling Theorem and Applications

> Nyquist rate, aliasing and reconstruction are asked almost every year, usually as quick numericals.

## Intuition

Sampling multiplies a signal by an impulse train. In frequency, that **copies the spectrum** at every multiple of the sampling rate $f_s$. If the copies don't overlap, an ideal low-pass filter recovers the original exactly. If they overlap, high frequencies masquerade as low ones — **aliasing** — and the information is lost for good.

## Formal statement

A signal band-limited to $f_m$ (no content above $f_m$) is uniquely determined by its samples if

$$
f_s > 2f_m \qquad (\text{Nyquist rate } 2f_m,\ \text{Nyquist interval } 1/2f_m).
$$

Sampled spectrum: $X_s(f) = f_s\sum_{k}X(f - kf_s)$.

Ideal reconstruction: low-pass filter with gain $T_s$ and cutoff $f_c$ satisfying $f_m \le f_c \le f_s - f_m$:
$$
x(t) = \sum_n x(nT_s)\,\mathrm{sinc}\!\left(\frac{t - nT_s}{T_s}\right).
$$

## Key results

- **Aliasing:** a tone at $f_0$ sampled at $f_s$ appears at the value of $|f_0 - kf_s|$ that lies in $[0, f_s/2]$.
- **Bandwidth of combinations** (needed for the Nyquist rate):
  - $x_1 + x_2$: $\max(f_1, f_2)$;
  - $x_1 x_2$ and $x^2$: $f_1 + f_2$ and $2f_m$;
  - $x(at)$: $|a| f_m$;
  - $x_1 * x_2$: $\min(f_1, f_2)$.
- A sinusoid sampled at exactly $2f_0$ may produce all-zero samples, so the strict inequality matters.
- **Bandpass sampling** (band $f_L$ to $f_H$, width $B$): minimum rate $f_s = 2f_H/k$ with $k = \lfloor f_H/B\rfloor$. It equals $2B$ when $f_H$ is an integer multiple of $B$.
- **Practical (flat-top) sampling** adds an aperture effect: the spectrum is weighted by $\mathrm{sinc}(f\tau)$; an equaliser corrects it.
- **Anti-aliasing filter:** a low-pass filter applied before sampling.

## Worked examples

**Example 1.** $x(t) = \cos 200\pi t + \sin 500\pi t$: components at 100 Hz and 250 Hz, so the Nyquist rate is 500 Hz.

**Example 2.** A 100 Hz tone sampled at 150 Hz appears at $|100 - 150| = 50$ Hz.

**Example 3.** $m(t)$ band-limited to 4 kHz: $m^2(t)$ occupies 8 kHz, so its Nyquist rate is 16 kHz.

**Example 4.** A band from 20 to 25 kHz ($B = 5$ kHz): $k = \lfloor 25/5\rfloor = 5$, so $f_{s,\min} = 50/5 = 10$ kHz.

## Common GATE traps

- Using the *highest* frequency of a product as the bandwidth (it is the sum).
- Confusing the Nyquist rate (minimum sampling rate) with the Nyquist frequency ($f_s/2$).
- Forgetting that ideal sinc reconstruction is non-causal; practical systems oversample.

## Summary

- $f_s > 2f_m$; the spectrum repeats at multiples of $f_s$.
- An alias of $f_0$ is $|f_0 - kf_s|$ folded into $[0, f_s/2]$.
- Products add bandwidths; bandpass signals can be sampled below $2f_H$.
