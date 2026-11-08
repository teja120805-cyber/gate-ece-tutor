# Series and Numerical Estimation

> Find the next term of number or letter series, sum progressions, and estimate quickly.

## Intuition

Series questions hide a simple rule — a constant difference, a constant ratio, squares or cubes, alternating patterns, or growing gaps. Test the common rules in order of simplicity.

## Checklist for number series

1. **Differences:** constant ⇒ arithmetic progression (AP). If the differences themselves form a pattern, check the second differences.
2. **Ratios:** constant ⇒ geometric progression (GP).
3. **Squares, cubes, primes:** 1, 4, 9, 16…; 1, 8, 27…; 2, 3, 5, 7, 11…
4. **$n(n + 1)$, $n^2 \pm 1$** and similar forms.
5. **Alternating series:** two interleaved series.
6. **Letter series:** convert letters to positions (A = 1 … Z = 26) and apply the same tests.

## Key formulas

- **AP:** $a_n = a + (n - 1)d$; $S_n = \frac n2[2a + (n - 1)d] = \frac n2(\text{first} + \text{last})$.
- **GP:** $a_n = ar^{n-1}$; $S_n = a\dfrac{r^n - 1}{r - 1}$; infinite sum $\dfrac{a}{1 - r}$ for $|r| < 1$.
- $\sum k = \dfrac{n(n+1)}{2}$, $\sum k^2 = \dfrac{n(n+1)(2n+1)}{6}$, $\sum k^3 = \left[\dfrac{n(n+1)}{2}\right]^2$.

**Estimation:** round to convenient numbers, keep track of the direction of the error, and use $2^{10} \approx 10^3$ and $\sqrt2 \approx 1.414$.

## Worked examples

**Example 1.** 2, 6, 12, 20, 30, ? — differences 4, 6, 8, 10 ⇒ next 12 ⇒ **42** (the terms are $n(n+1)$).

**Example 2.** 3, 9, 27, 81, ? — ratio 3 ⇒ **243**.

**Example 3.** A, C, F, J, ? — positions 1, 3, 6, 10 (gaps 2, 3, 4) ⇒ next gap 5 ⇒ 15 = **O**.

**Example 4.** $1 + 2 + \cdots + 20 = 20\times21/2 = 210$.

## Summary

- Test differences, then ratios, then special sequences; use letter positions for alphabet series.
- AP/GP sums and the $\sum k$ formulas.
