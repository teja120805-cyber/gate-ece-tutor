# Permutations and Combinations

> Counting arrangements and selections underlies GA quantitative questions and probability.

## Intuition

- **Permutation** — order matters (arranging people in seats).
- **Combination** — order doesn't matter (choosing a team).

Count by filling positions one at a time (the multiplication principle), then divide out arrangements that are indistinguishable.

## Key results

- **Multiplication principle:** if task 1 can be done in $m$ ways and task 2 in $n$ ways, both together can be done in $mn$ ways.
- **Addition principle:** mutually exclusive alternatives add.
- ${}^nP_r = \dfrac{n!}{(n-r)!}$ (ordered); ${}^nC_r = \dfrac{n!}{r!(n-r)!}$ (unordered); ${}^nC_r = {}^nC_{n-r}$.
- **Arrangements with repeated items:** $\dfrac{n!}{p!\,q!\cdots}$.
- **Circular arrangements:** $(n - 1)!$; for necklaces/garlands (which can be flipped), $\frac{(n-1)!}{2}$.
- **"At least one":** total minus "none".
- **Items always together:** treat the group as one unit, then multiply by its internal arrangements.
- **Items never together:** total minus "together".
- **Distributing identical items** into $r$ groups: ${}^{n+r-1}C_{r-1}$.

## Worked examples

**Example 1.** Arrangements of GATE: $4! = 24$.

**Example 2.** Arrangements of BANANA (A×3, N×2): $\dfrac{6!}{3!\,2!} = 60$.

**Example 3.** 6 people around a round table: $5! = 120$.

**Example 4.** Committees of 3 from 5 men and 4 women with at least one woman: $\binom93 - \binom53 = 84 - 10 = 74$.

**Example 5.** 5 people in a row with A and B always together: $4!\times2! = 48$.

## Common traps

- Using permutations when the order doesn't matter (or vice versa).
- Forgetting to divide by the repeats.
- Circular versus linear arrangements.

## Summary

- Order matters ⇒ $P$; order doesn't ⇒ $C$; repeats ⇒ divide by factorials.
- Circular: $(n - 1)!$; "at least one" = total − none.
