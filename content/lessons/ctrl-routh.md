# Routh–Hurwitz Stability Criterion

> Finding the range of $K$ for stability, or the number of right-half-plane roots, is asked almost every year — usually solvable in under two minutes with the Routh array.

## Intuition

A linear system is stable when every pole (root of the characteristic equation) lies in the left half of the s-plane. Solving a cubic or quartic is slow; the Routh array tells you **how many roots lie in the right half-plane** using only arithmetic on the coefficients — without finding the roots.

## Formal statement

For $a_0 s^n + a_1 s^{n-1} + \dots + a_n = 0$ with $a_0 > 0$:

1. **Necessary condition:** all coefficients present and positive. If one is missing or negative, the system is **not** stable (it may still be marginal, but it is not asymptotically stable).
2. Build the Routh array. **The number of sign changes in the first column equals the number of right-half-plane roots.** The system is stable iff the first column has no sign changes (all entries positive).

## Building the array

$$
\begin{array}{c|ccc}
s^n & a_0 & a_2 & a_4 \\
s^{n-1} & a_1 & a_3 & a_5 \\
s^{n-2} & b_1 & b_2 & \\
s^{n-3} & c_1 & & \\
\vdots & & &
\end{array}
\qquad
b_1 = \frac{a_1a_2 - a_0a_3}{a_1},\quad b_2 = \frac{a_1a_4 - a_0a_5}{a_1},\quad c_1 = \frac{b_1a_3 - a_1b_2}{b_1}
$$

Each new entry is −(determinant of the 2×2 block formed by the two rows above, using the first column and the next column) divided by the first-column entry just above.

**Cubic shortcut.** For $s^3 + a_1s^2 + a_2s + a_3$ (all coefficients positive), the system is stable iff $a_1a_2 > a_3$.

## Special cases

**Zero in the first column only.** Replace it with a small $\varepsilon > 0$, continue, and examine signs as $\varepsilon \to 0^+$.

**Entire row of zeros.** This means the roots are symmetric about the origin (pairs $\pm j\omega$, $\pm\sigma$, or quadruples).
- Form the **auxiliary polynomial** $A(s)$ from the row above (it has only even or only odd powers).
- Replace the zero row with the coefficients of $dA/ds$ and continue.
- Roots of $A(s) = 0$ are actual roots of the system. Non-repeated $j\omega$ roots with no RHP roots ⇒ **marginally stable**, oscillating at those frequencies.

## Worked examples

**Example 1.** $s^3 + 2s^2 + 3s + 10$: rows $1, 3$ | $2, 10$ | $(6 - 10)/2 = -2$ | $10$. First column $1, 2, -2, 10$: two sign changes ⇒ 2 RHP roots. (Cubic shortcut: $2\cdot3 = 6 < 10$ ⇒ unstable.)

**Example 2 (range of K).** $s^3 + 3s^2 + 2s + K$: rows $1, 2$ | $3, K$ | $(6-K)/3$ | $K$.
Stable for $0 < K < 6$. At $K = 6$: auxiliary $3s^2 + 6 = 0 \Rightarrow \omega = \sqrt2$ rad/s.

**Example 3 (row of zeros).** $s^4 + 2s^3 + 3s^2 + 2s + 2$: rows $1, 3, 2$ | $2, 2$ | $2, 2$ | $0$.
$A(s) = 2s^2 + 2$ ⇒ roots $\pm j$; $A'(s) = 4s$ ⇒ row $4$; last row $2$. No sign changes ⇒ marginally stable. Check: $(s^2+1)(s^2+2s+2)$.

## Common GATE traps

- **Forgetting the necessary condition** — a missing term settles the question instantly.
- **Counting sign changes in a row** instead of the first column.
- **Calling a system with $j\omega$ poles "stable"** — it is marginally stable (bounded oscillation, not BIBO stable).
- **Range of K:** also require $K > 0$ from the last row.

## Summary

- RHP roots = sign changes in the first column.
- Cubic: stable iff all coefficients are positive and $a_1a_2 > a_3$.
- Zero row ⇒ auxiliary polynomial ⇒ symmetric roots, oscillation frequency.
