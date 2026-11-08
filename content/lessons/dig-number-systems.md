# Binary and Integer Representations

> Radix conversion, 2's complement arithmetic and overflow detection are asked almost every year.

## Intuition

A number system with base $r$ weights each digit by a power of $r$. Computers use base 2. To represent negative integers, **2's complement** is used because ordinary binary addition then works for signed numbers without any special cases.

## Formal definitions

- Value of $(d_{n-1}\dots d_1d_0.d_{-1}\dots)_r = \sum d_ir^i$.
- **Conversions:** decimal → binary by repeated division by 2 (integer part) and repeated multiplication by 2 (fraction part). Binary ↔ octal and hexadecimal by grouping bits in 3s and 4s.

**Signed representations** ($n$ bits):

| System | Negative of $x$ | Range | Zeros |
|---|---|---|---|
| sign-magnitude | flip the MSB | $-(2^{n-1}-1)$ to $2^{n-1}-1$ | two |
| 1's complement | invert all bits | $-(2^{n-1}-1)$ to $2^{n-1}-1$ | two |
| 2's complement | invert and add 1 | $-2^{n-1}$ to $2^{n-1}-1$ | one |

In 2's complement the MSB has weight $-2^{n-1}$.

## Key results

- **Sign extension:** replicate the MSB to widen a number.
- **Overflow** (2's complement addition): occurs only when two operands with the same sign give a result of the opposite sign. Equivalently, the carry **into** the MSB differs from the carry **out of** it.
- The carry out of the MSB is **not** an overflow indicator for signed arithmetic (it is for unsigned).
- **Subtraction:** $A - B = A + (\text{2's complement of } B)$.
- **BCD:** each decimal digit uses 4 bits; when a sum exceeds 9, add 6 to correct it.
- **Gray code:** adjacent values differ in one bit; $g_i = b_{i+1} \oplus b_i$.

## Worked examples

**Example 1.** $-5$ in 8 bits: $00000101 \to 11111010 \to 11111011$.

**Example 2.** $10000001_2$ (2's complement) $= -128 + 1 = -127$.

**Example 3.** $(1011.101)_2 = 8 + 2 + 1 + 0.5 + 0.125 = 11.625$.

**Example 4.** In 4 bits, $0111 + 0001 = 1000$: positive + positive gives a negative result ⇒ overflow ($7 + 1 = 8$ is outside the range $-8$ to $7$).

## Common GATE traps

- Treating the carry-out as signed overflow.
- Forgetting the asymmetric range of 2's complement (one more negative value).

## Summary

- 2's complement: invert and add 1; range $-2^{n-1}$ to $2^{n-1} - 1$; MSB weight $-2^{n-1}$.
- Overflow ⇔ carry into the MSB ≠ carry out of the MSB.
