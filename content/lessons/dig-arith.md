# Arithmetic Circuits

> Adders (half, full, ripple-carry, carry-lookahead), subtractors and comparators: logic expressions and delay calculations.

## Intuition

Binary addition works column by column. Each column adds two bits plus a carry from the column to its right. A **ripple-carry adder** chains full adders, so the carry must ripple through every stage — slow for wide words. **Carry lookahead** computes carries in parallel.

## Key results

**Half adder:** $S = A \oplus B$, $C = AB$.

**Full adder:** $S = A \oplus B \oplus C_{in}$, $C_{out} = AB + C_{in}(A \oplus B) = AB + BC_{in} + AC_{in}$. It can be built from two half adders plus an OR gate.

**Ripple-carry adder ($n$ bits):** worst-case delay $\approx n\times t_{carry}$ (plus the final sum delay).

**Carry lookahead:**
- generate $G_i = A_iB_i$, propagate $P_i = A_i \oplus B_i$;
- $C_{i+1} = G_i + P_iC_i$; e.g. $C_2 = G_1 + P_1G_0 + P_1P_0C_0$.
- Every carry comes from a two-level expression, so the delay is roughly constant (it grows only logarithmically for hierarchical designs), at the cost of more gates.

**Subtractor:** $A - B = A + \bar B + 1$ — an adder with B inverted and $C_{in} = 1$. An XOR on each B input under a control line gives an adder/subtractor.

**Magnitude comparator** (1 bit): $A > B$: $A\bar B$; $A < B$: $\bar AB$; $A = B$: $\overline{A \oplus B}$. Multi-bit comparators decide from the MSB down.

## Worked examples

**Example 1.** A 16-bit ripple adder with 2 ns per carry stage has a worst-case carry delay of 32 ns.

**Example 2.** $1011 + 0110 = 10001_2 = 17$ ($11 + 6$).

**Example 3.** Lookahead with $A = 1$, $B = 1$ in bit 0: $G_0 = 1$ ⇒ $C_1 = 1$, regardless of $C_0$.

## Common GATE traps

- Writing $C_{out} = A \oplus B$.
- Assuming a ripple adder's delay is constant.

## Summary

- FA: $S = A \oplus B \oplus C$, $C_{out} = AB + C(A \oplus B)$.
- Ripple delay ∝ $n$; lookahead uses $G = AB$, $P = A \oplus B$, $C_{i+1} = G_i + P_iC_i$.
