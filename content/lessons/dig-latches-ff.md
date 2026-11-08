# Latches and Flip-Flops

> Characteristic equations, excitation tables and converting one flip-flop type into another are standard questions.

## Intuition

A **latch** is a 1-bit memory that is **level-sensitive**: while enabled it is transparent (the output follows the input). A **flip-flop** is **edge-triggered**: it samples its input only at a clock edge, which makes synchronous design predictable.

## Key results

**SR latch (NOR):** S = 1 sets, R = 1 resets, S = R = 0 holds, and **S = R = 1 is forbidden**. (The NAND latch uses active-low inputs; there $\bar S = \bar R = 0$ is forbidden.)

| FF | Characteristic equation | Behaviour |
|---|---|---|
| D | $Q^+ = D$ | copies D at the edge |
| JK | $Q^+ = J\bar Q + \bar KQ$ | 00 hold, 01 reset, 10 set, 11 **toggle** |
| T | $Q^+ = T \oplus Q$ | T = 1 toggles |
| SR | $Q^+ = S + \bar RQ$ (with $SR = 0$) | — |

**Excitation tables** (the inputs needed for a transition $Q \to Q^+$):

| $Q \to Q^+$ | D | T | J K |
|---|---|---|---|
| 0 → 0 | 0 | 0 | 0 X |
| 0 → 1 | 1 | 1 | 1 X |
| 1 → 0 | 0 | 1 | X 1 |
| 1 → 1 | 1 | 0 | X 0 |

- **Race-around** in a level-triggered JK latch with J = K = 1 is avoided by master–slave or edge-triggered designs.
- A T flip-flop with T = 1 divides the clock frequency by 2.
- **Conversion:** D from JK: J = D, K = $\bar D$. T from D: D = $T \oplus Q$.

## Worked examples

**Example 1.** A JK with J = K = 1 toggles at every clock edge.

**Example 2.** A T flip-flop (T = 1) clocked at 1 MHz outputs a 500 kHz square wave.

**Example 3.** To build JK behaviour from a D flip-flop: $D = J\bar Q + \bar KQ$.

## Common GATE traps

- Calling a latch edge-triggered.
- Forgetting the forbidden SR state (it differs for NAND and NOR latches).

## Summary

- D: $Q^+ = D$; JK: $J\bar Q + \bar KQ$ (11 toggles); T: $T \oplus Q$.
- Latch = level-sensitive; flip-flop = edge-triggered; use excitation tables for design.
