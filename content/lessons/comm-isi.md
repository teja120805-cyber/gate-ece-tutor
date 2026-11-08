# Bandwidth and Inter-Symbol Interference

> The Nyquist zero-ISI criterion, minimum bandwidth, and raised-cosine bandwidth are asked regularly.

## Intuition

A band-limited channel smears each transmitted pulse in time, so pulses spill into their neighbours' time slots — **inter-symbol interference (ISI)**. The fix is to use pulse shapes that, although spread out, pass through **zero** at every other symbol's sampling instant.

## Key results

**Nyquist criterion for zero ISI:** $p(nT_s) = 0$ for all $n \ne 0$ (with $p(0) = 1$). Equivalently, the folded spectrum $\sum_kP(f - k/T_s)$ is constant.

**Minimum (Nyquist) bandwidth:** $B_{min} = \dfrac{R_s}{2}$, achieved by the sinc pulse — ideal, but impractical (slowly decaying tails, sensitive to timing).

**Raised-cosine pulses** with roll-off $\alpha$ ($0 \le \alpha \le 1$):
$$
B_T = \frac{R_s}{2}(1 + \alpha).
$$
A larger $\alpha$ means more bandwidth but faster-decaying tails and more tolerance to timing errors. $\alpha = 1$ gives $B_T = R_s$.

**Maximum symbol rate** over a channel of bandwidth $B$: $R_s = \frac{2B}{1 + \alpha}$. For $M$-ary symbols, $R_b = R_s\log_2M$.

**Eye diagram:** the vertical opening shows the noise margin; the horizontal opening shows timing tolerance; the slope shows sensitivity to timing errors. ISI closes the eye.

**Equalisers** (for example zero-forcing) compensate channel distortion to reduce ISI.

## Worked examples

**Example 1.** $R_s = 10$ kbaud with $\alpha = 0.5$: $B_T = 5\times1.5 = 7.5$ kHz.

**Example 2.** A 4 kHz channel with ideal Nyquist pulses and binary signalling: $R_b = 8$ kbps. With 16-level symbols: 32 kbps.

## Common GATE traps

- Thinking a sinc pulse needs bandwidth $R_s$ (it is $R_s/2$).
- Mixing up the bit rate and the symbol rate.

## Summary

- Zero ISI: pulse zero at the other sampling instants; $B_{min} = R_s/2$.
- Raised cosine: $B_T = \frac{R_s}{2}(1 + \alpha)$.
