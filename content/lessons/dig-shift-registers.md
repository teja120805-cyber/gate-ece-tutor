# Shift Registers

> Register types, shifting operations and their use in serial–parallel conversion and arithmetic.

## Intuition

A shift register is a chain of D flip-flops: at each clock edge every bit moves one position along. Data can enter serially (one bit per clock) or in parallel (all bits at once), and leave either way.

## Types

| Type | Input | Output | Typical use |
|---|---|---|---|
| SISO | serial | serial | delay line ($n$ clocks of delay) |
| SIPO | serial | parallel | serial-to-parallel conversion (receivers) |
| PISO | parallel | serial | parallel-to-serial conversion (transmitters) |
| PIPO | parallel | parallel | storage buffer |

## Key results

- Loading $n$ bits serially takes $n$ clock pulses. Shifting them out of a SISO takes another $n$ (or $n - 1$, until the first bit appears).
- **Shift left** multiplies an unsigned number by 2; **shift right** divides by 2 (logical). An **arithmetic shift right** keeps the sign bit (dividing signed numbers).
- A **universal shift register** offers shift left, shift right, parallel load and hold.
- **Ring and Johnson counters** are shift registers with feedback.
- **LFSR:** XOR feedback creates pseudo-random sequences (a maximal-length $n$-bit LFSR has $2^n - 1$ states) — used in CRC and scrambling.

## Worked examples

**Example 1.** An 8-bit SIPO needs 8 clock pulses to receive one byte.

**Example 2.** 4-bit register 1011 shifted right twice with serial input 0: $1011 \to 0101 \to 0010$ (decimal 2 = ⌊11/4⌋).

**Example 3.** $0011 \ll 1 = 0110$ (3 → 6).

## Common GATE traps

- Logical versus arithmetic right shift for negative numbers.
- Counting clock pulses for serial transfer.

## Summary

- SISO, SIPO, PISO, PIPO; serial loading takes $n$ clocks.
- Left shift ×2, right shift ÷2; with feedback they become counters or LFSRs.
