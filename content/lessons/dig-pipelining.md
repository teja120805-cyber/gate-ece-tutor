# Instruction Pipelining

> Pipeline cycle counts, speed-up, clock period from stage delays, and hazards are frequently asked.

## Intuition

Like an assembly line, a pipeline splits instruction execution into stages (for example fetch, decode, execute, memory, write-back) and works on several instructions at once, each in a different stage. Each instruction still takes the same time, but **throughput** approaches one instruction per cycle.

## Key results

- **Cycles for $n$ instructions on a $k$-stage pipeline** (no stalls): $k + (n - 1)$.
- **Speed-up** over a non-pipelined machine that takes $k$ cycles per instruction:
$$
S = \frac{nk}{k + n - 1} \to k \ \text{as}\ n \to \infty .
$$
- **Clock period** = slowest stage delay + latch (register) overhead. Unbalanced stages waste time.
- With stalls: CPI $= 1 + $ stall cycles per instruction.

## Hazards

| Hazard | Cause | Remedies |
|---|---|---|
| structural | two instructions need the same resource | duplicate resources (e.g. separate instruction and data memories) |
| data | an instruction needs the result of an earlier one still in the pipeline (RAW; WAR/WAW in out-of-order designs) | forwarding (bypassing), stalls, compiler scheduling |
| control | branches change the PC | prediction, delayed branches, flushing |

A **load-use** hazard needs one stall even with forwarding (in the classic 5-stage pipeline).

## Worked examples

**Example 1.** A 5-stage pipeline running 100 instructions takes $5 + 99 = 104$ cycles.

**Example 2.** Speed-up $= 500/104 = 4.81$.

**Example 3.** Stage delays 10, 20, 15 and 25 ns with a 5 ns latch: clock $= 25 + 5 = 30$ ns. Non-pipelined time per instruction $= 70$ ns; asymptotic speed-up $= 70/30 = 2.33$.

**Example 4.** With 20% branches and a 2-cycle penalty: CPI $= 1 + 0.2\times2 = 1.4$.

## Common GATE traps

- Using $nk$ cycles for a pipeline.
- Ignoring latch overhead in the clock period.

## Summary

- $k + n - 1$ cycles; speed-up → $k$.
- Clock = slowest stage + latch. Data, control and structural hazards cause stalls; forwarding and prediction reduce them.
