# Sequences, Series and Convergence Tests

> GATE asks whether a series converges and for limits of sequences; these ideas also underpin power series and z-transform ROCs.

## Intuition

A series $\sum a_n$ converges if its partial sums settle to a finite value. The terms must shrink to zero, but shrinking is **not enough**: $\sum 1/n$ grows without bound even though $1/n \to 0$.

## Key results

**n-th term test:** if $a_n \not\to 0$, the series diverges. (If $a_n \to 0$, there is no conclusion.)

**Standard series**
- Geometric $\sum_{n\ge0} r^n = \dfrac{1}{1 - r}$ for $|r| < 1$; it diverges otherwise.
- p-series $\sum 1/n^p$: converges iff $p > 1$ (so the harmonic series $p = 1$ diverges).

**Tests**

| Test | Rule |
|---|---|
| Ratio | $L = \lim|a_{n+1}/a_n|$: $L < 1$ converges, $L > 1$ diverges, $L = 1$ inconclusive |
| Root | $L = \lim|a_n|^{1/n}$: same rule |
| Comparison / limit comparison | compare with a known series (usually a p-series) |
| Integral | $\sum f(n)$ and $\int f$ behave alike for positive decreasing $f$ |
| Leibniz (alternating) | $\sum(-1)^na_n$ converges if $a_n$ decreases to 0 |

**Absolute vs conditional:** $\sum|a_n|$ converging ⇒ $\sum a_n$ converges (absolutely). $\sum(-1)^n/n$ converges only conditionally.

**Limits of sequences:** for rational expressions, compare the highest powers: $\dfrac{3n^2 + 2}{n^2 + 5n} \to 3$. Also $\left(1 + \frac1n\right)^n \to e$ and $n^{1/n} \to 1$.

## Worked examples

**Example 1.** $\sum_{n\ge0}(1/3)^n = \dfrac{1}{1 - 1/3} = 1.5$.

**Example 2.** $\sum\dfrac{n}{n+1}$: the terms tend to 1, so it diverges.

**Example 3.** $\sum\dfrac{n!}{n^n}$: the ratio is $\left(\frac{n}{n+1}\right)^n \to 1/e < 1$ ⇒ converges.

## Common GATE traps

- Concluding convergence just because $a_n \to 0$.
- Using the ratio test when $L = 1$ (e.g. p-series), where it says nothing.

## Summary

- Terms not tending to 0 ⇒ divergence. Geometric: $|r| < 1$; p-series: $p > 1$.
- Ratio/root test with $L < 1$ ⇒ convergence; alternating series with decreasing terms converge.
