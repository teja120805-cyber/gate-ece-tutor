# ROM, SRAM and DRAM

> Address/data line counts, building larger memories from smaller chips, and the properties of each memory type.

## Intuition

A memory is a large array of storage cells. The address selects a word (through a decoder), and the data lines carry that word in or out. The types differ in **how** each bit is stored, which trades speed against density and volatility.

## Organisation

A memory of $2^k\times m$ has $k$ address lines and $m$ data lines; capacity $= 2^k\cdot m$ bits.

**Building bigger memories from $a\times b$ chips** to make an $A\times B$ memory:
$$
\text{chips} = \frac{A}{a}\times\frac{B}{b}.
$$
Width expansion places chips in parallel (sharing addresses); depth expansion uses a decoder on the extra address lines to drive chip selects.

## Memory types

| Type | Cell | Volatile | Notes |
|---|---|---|---|
| SRAM | 6 transistors (cross-coupled inverters) | yes | fast, no refresh, used for caches |
| DRAM | 1 transistor + 1 capacitor | yes | dense and cheap; charge leaks, so it needs periodic **refresh**; reads are destructive |
| ROM / PROM / EPROM / EEPROM / Flash | — | **no** | ROM is mask-programmed; EPROM is UV-erasable; EEPROM/Flash are electrically erasable |

A ROM can implement combinational logic: the address is the input, the stored word is the truth-table output.

## Worked examples

**Example 1.** A 1K × 8 memory needs 10 address lines and 8 data lines.

**Example 2.** A 4K × 8 memory from 1K × 4 chips: $4\times2 = 8$ chips, plus a 2-to-4 decoder for chip select.

**Example 3.** A 64K × 16 memory holds $64\text{K}\times2$ bytes $= 128$ KB.

## Common GATE traps

- Confusing bytes and bits in capacity questions.
- Saying SRAM needs refresh.

## Summary

- $2^k\times m$: $k$ address lines, $m$ data lines; chips needed $= (A/a)(B/b)$.
- SRAM: 6T, fast. DRAM: 1T1C, dense, refresh. ROM family: non-volatile.
