# Machine Instructions and Addressing Modes

> Computing effective addresses, instruction-format field sizes, and identifying addressing modes.

## Intuition

A machine instruction tells the processor **what** to do (the opcode) and **where** the operands are. Addressing modes are the different ways an instruction can specify an operand's location — inside the instruction, in a register, or at a memory address computed in various ways.

## Addressing modes

| Mode | Operand location | Memory accesses for the operand |
|---|---|---|
| immediate | in the instruction itself | 0 |
| register | in a register | 0 |
| direct (absolute) | memory address given in the instruction | 1 |
| indirect | the instruction points to a memory word holding the operand address | 2 |
| register indirect | address held in a register | 1 |
| indexed / base + offset | EA = base (register) + displacement | 1 |
| PC-relative | EA = PC + offset (branches, position-independent code) | 1 |
| auto-increment/decrement | register indirect, then update the register (arrays, stacks) | 1 |

## Key results

- **Instruction-format field sizes:** with $2^k$ opcodes, the opcode needs $k$ bits; $R$ registers need $\lceil\log_2R\rceil$ bits per register field; the remaining bits form the address or immediate field.
- **Instruction types:** data transfer, arithmetic/logic, control (branch, call/return), I/O.
- **Instruction formats:** 0-address (stack), 1-address (accumulator), 2-address, 3-address.
- RISC uses fixed-length instructions with few modes (load/store); CISC uses variable lengths with many modes.

## Worked examples

**Example 1.** A 16-bit instruction with a 6-bit opcode and two equal register fields: each field has 5 bits ⇒ 32 registers.

**Example 2.** Indexed addressing with base 2000 and index 50: EA $= 2050$.

**Example 3.** A 32-bit instruction with an 8-bit opcode, two 5-bit register fields and the rest immediate: the immediate field has $32 - 18 = 14$ bits.

## Common GATE traps

- Counting memory accesses for indirect addressing (one extra to fetch the address).
- Confusing direct with register-indirect addressing.

## Summary

- Immediate (in the instruction), register, direct, indirect (pointer in memory), indexed (base + offset), PC-relative.
- Field width $= \lceil\log_2(\text{choices})\rceil$.
