# Cyclic Redundancy Check (CRC)

> Computing a CRC by modulo-2 division and knowing its detection properties.

## Intuition

Treat the message bits as the coefficients of a polynomial over GF(2), where addition is XOR. The sender appends a remainder chosen so that the whole transmitted word is exactly divisible by an agreed **generator polynomial** $g(x)$. If the receiver's division leaves a non-zero remainder, the word was corrupted.

## Procedure (generator of degree $r$)

1. Append $r$ zeros to the message, which multiplies $m(x)$ by $x^r$.
2. Divide by $g(x)$ using modulo-2 long division (XOR, no borrows).
3. The $r$-bit remainder is the CRC. Transmit the message followed by the CRC.
4. **Receiver:** divide the received word by $g(x)$. Remainder 0 ⇒ no error detected.

## Detection properties

- All single-bit errors (if $g(x)$ has at least two terms).
- All odd numbers of errors if $(x + 1)$ is a factor of $g(x)$.
- All burst errors of length $\le r$.
- Most longer bursts: undetected with probability about $2^{-r}$.
- CRC detects errors only — it does not correct them; retransmission is used (ARQ).

Common generators include CRC-8, CRC-16-CCITT ($x^{16} + x^{12} + x^5 + 1$) and CRC-32.

## Worked example

Message 1101 with $g(x) = x^3 + x + 1$ (1011), $r = 3$. Append zeros: 1101000.

| Step | Working | Result |
|---|---|---|
| 1 | 1101 ⊕ 1011 | 0110 |
| 2 | bring down 0: 1100 ⊕ 1011 | 0111 |
| 3 | bring down 0: 1110 ⊕ 1011 | 0101 |
| 4 | bring down 0: 1010 ⊕ 1011 | 0001 |

Remainder (CRC) = **001**. Transmit **1101001**. Check: 1101001 ÷ 1011 leaves remainder 0.

## Common GATE traps

- Using ordinary subtraction instead of XOR.
- Appending the wrong number of zeros (it is the degree of $g$, not the number of bits in $g$).

## Summary

- Append $r$ zeros, divide modulo 2 by $g(x)$, append the remainder.
- Detects all bursts of length $\le r$; detects all odd-weight errors when $(x + 1)$ divides $g$.
