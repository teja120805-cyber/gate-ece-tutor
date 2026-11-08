# Propagation Delay, Setup/Hold Time and Critical Path

> Maximum clock frequency and hold-time checks are asked frequently.

## Intuition

Data launched from one flip-flop at a clock edge must travel through combinational logic and arrive at the next flip-flop **early enough** (setup time) before the next edge, and must not change **too soon** after an edge (hold time). The slowest path between registers — the **critical path** — limits the clock speed.

## Definitions

- $t_{pd}$: propagation delay of a gate or path; $t_{cq}$: clock-to-Q delay of a flip-flop.
- **Setup time** $t_{su}$: data must be stable this long **before** the clock edge.
- **Hold time** $t_h$: data must remain stable this long **after** the clock edge.

## Key results

**Setup constraint** (determines the maximum frequency):
$$
T_{clk} \ge t_{cq} + t_{comb,max} + t_{su} \;(-\ t_{skew}\ \text{if the capture clock arrives later}), \qquad f_{max} = \frac{1}{T_{clk,min}}.
$$

**Hold constraint** (independent of the clock period):
$$
t_{cq} + t_{comb,min} \ge t_h \;(+\ t_{skew}).
$$

- Setup violations are fixed by slowing the clock or shortening the critical path (e.g. by pipelining).
- Hold violations **cannot** be fixed by slowing the clock — add delay to the short path.
- **Pipelining** splits long paths with registers: a higher clock rate, but more latency.

## Worked examples

**Example 1.** $t_{cq} = 2$ ns, $t_{comb} = 6$ ns, $t_{su} = 2$ ns: $T_{min} = 10$ ns, so $f_{max} = 100$ MHz.

**Example 2.** $t_{cq} = 1$ ns, $t_h = 2$ ns: the minimum combinational delay must be at least $2 - 1 = 1$ ns.

**Example 3.** Two paths of 6 ns and 9 ns between the same registers: the 9 ns path is critical.

## Common GATE traps

- Using the shortest path for $f_{max}$ (use the longest).
- Thinking a slower clock fixes hold violations.

## Summary

- $T_{clk} \ge t_{cq} + t_{comb,max} + t_{su}$; hold: $t_{cq} + t_{comb,min} \ge t_h$.
- The critical path is the longest register-to-register delay.
