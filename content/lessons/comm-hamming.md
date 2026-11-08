# Error Correction Fundamentals and Hamming Codes

> Hamming distance, detection/correction capability and the (7,4) Hamming code are standard questions.

## Intuition

Add redundancy so that valid codewords are spread far apart. A few bit errors then turn a codeword into an invalid word that is still **closer** to the original than to any other codeword, so the receiver can detect — or even correct — the errors.

## Key results

- **Hamming distance** $d(\mathbf a, \mathbf b)$: the number of positions where the words differ. **Hamming weight**: the number of 1s.
- **Minimum distance** $d_{min}$ of a code determines its power:
  - detects up to $d_{min} - 1$ errors;
  - corrects up to $t = \left\lfloor\dfrac{d_{min} - 1}{2}\right\rfloor$ errors.
  - For a linear code, $d_{min}$ = minimum weight of a non-zero codeword.
- **Code rate** $R = k/n$ for an $(n, k)$ block code.
- **Single parity bit:** $d_{min} = 2$ — detects any single error (any odd number), but corrects none.
- **Hamming codes:** $(n, k) = (2^m - 1,\ 2^m - 1 - m)$ with $d_{min} = 3$, correcting single errors. They are "perfect": $2^m = n + 1$. Examples: (7,4), (15,11), (31,26).
- **Syndrome decoding:** $\mathbf s = \mathbf rH^T$. A non-zero syndrome equals the column of $H$ at the error position. In the classic positional (7,4) code, the syndrome directly gives the error position in binary.
- **Hamming bound:** $2^{n-k} \ge \sum_{i=0}^{t}\binom ni$.

## Worked examples

**Example 1.** $d(1011010, 1001100) = 3$ (positions 3, 5 and 6 differ).

**Example 2.** The (7,4) code has rate $4/7 = 0.571$.

**Example 3.** With $m = 4$ parity bits: $n = 15$, $k = 11$.

**Example 4.** A code with $d_{min} = 5$ detects 4 errors or corrects 2.

## Common GATE traps

- Confusing detection capability ($d - 1$) with correction capability ($\lfloor(d - 1)/2\rfloor$).
- Thinking a single parity bit can correct errors.

## Summary

- Detect $d_{min} - 1$, correct $\lfloor(d_{min} - 1)/2\rfloor$.
- Hamming code: $(2^m - 1, 2^m - 1 - m)$, $d_{min} = 3$, corrects single errors; the syndrome locates the error.
