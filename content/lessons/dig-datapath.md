# ALU, Data-Path and Control Unit

> The organisation of a simple processor: datapath components, the instruction cycle, and hardwired versus microprogrammed control.

## Intuition

A processor has two halves:
- the **datapath** — registers, the ALU and the buses that move and transform data;
- the **control unit** — which, for each instruction, generates the sequence of control signals telling the datapath what to do at each step.

## Components

- **Program counter (PC):** the address of the next instruction.
- **Instruction register (IR):** the instruction currently executing.
- **MAR / MDR:** the memory address and memory data registers.
- **Register file** and **ALU** (arithmetic and logic operations, with status flags Z, N, C, V).
- **Buses:** a single-bus datapath is cheaper but needs more steps per instruction than multi-bus designs.

## Instruction cycle

Fetch (MAR ← PC; IR ← M[MAR]; PC ← PC + 1) → decode → operand fetch → execute → write back → interrupt check.

## Control unit design

| | Hardwired | Microprogrammed |
|---|---|---|
| Implementation | combinational logic + a state counter | control words stored in a control memory |
| Speed | faster | slower |
| Flexibility | hard to modify | easy to modify or extend |
| Typical use | RISC | CISC |

**Microinstruction formats:**
- **horizontal:** one bit per control signal — wide but parallel;
- **vertical:** encoded fields — narrow, needs decoding. $k$ mutually exclusive signals need $\lceil\log_2(k + 1)\rceil$ bits (or $\lceil\log_2k\rceil$ if one of them is always asserted).

Control memory with $N$ microinstructions needs $\lceil\log_2N\rceil$ address bits.

## Worked examples

**Example 1.** A control memory of 256 words needs an 8-bit control address register.

**Example 2.** Encoding 20 mutually exclusive control signals needs $\lceil\log_2 20\rceil = 5$ bits (vertical) versus 20 bits (horizontal).

## Common GATE traps

- Thinking microprogrammed control is faster than hardwired.
- Confusing the PC (next instruction) with the IR (current instruction).

## Summary

- The datapath executes; the control unit sequences.
- Hardwired: fast and fixed. Microprogrammed: flexible and slower. Horizontal versus vertical microcode trades width for decoding.
