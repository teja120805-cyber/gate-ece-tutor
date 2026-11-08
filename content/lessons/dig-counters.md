# Counters

> Mod-N design, ripple versus synchronous counters, ring and Johnson counters, and frequency division are classic questions.

## Intuition

A counter is a register that steps through a fixed sequence of states, one per clock pulse. Each flip-flop stage of a binary counter toggles at half the rate of the previous one, so a counter is also a frequency divider.

## Key results

- An $n$-bit binary counter has $2^n$ states (mod $2^n$). A mod-$N$ counter needs at least $\lceil\log_2N\rceil$ flip-flops.
- **Ripple (asynchronous) counter:** each FF is clocked by the previous FF's output. Simple, but the delays accumulate: $f_{max} \approx \dfrac{1}{n\,t_{pd}}$ (for all outputs to settle). Decoding glitches can occur.
- **Synchronous counter:** all FFs share the clock. Faster: $f_{max} = 1/(t_{cq} + t_{logic} + t_{su})$.
- **Frequency division:** the $k$-th stage output has frequency $f_{clk}/2^k$; the MSB of a mod-$N$ counter runs at $f_{clk}/N$.
- **Mod-N by reset:** detect count $N$ and reset the counter. For example, mod-6 resets at 110. An asynchronous reset gives a brief glitch state.
- **Ring counter** ($n$ FFs, a single circulating 1): $n$ states, self-decoding.
- **Johnson (twisted-ring) counter** ($n$ FFs, inverted feedback): $2n$ states.
- **Up/down counters** and the **BCD (decade) counter** (mod 10, resets after 1001).

## Worked examples

**Example 1.** A mod-10 counter needs 4 flip-flops.

**Example 2.** A 4-bit ripple counter clocked at 16 MHz: the MSB toggles at 1 MHz.

**Example 3.** A 4-FF Johnson counter cycles through 8 states; a 5-FF ring counter is mod 5.

**Example 4.** A 4-stage ripple counter with 10 ns per stage: $f_{max} \approx 1/40\text{ ns} = 25$ MHz.

## Common GATE traps

- Mixing up the Johnson ($2n$) and ring ($n$) state counts.
- Applying the synchronous $f_{max}$ formula to ripple counters.

## Summary

- Mod-$N$ needs $\lceil\log_2 N\rceil$ FFs; each stage divides the frequency by 2.
- Ring: $n$ states; Johnson: $2n$; ripple delays accumulate.
