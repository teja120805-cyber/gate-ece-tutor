# Boolean Algebra and Logic Gates

> Simplification with identities, De Morgan's laws, canonical forms and universal gates appear every year.

## Intuition

Boolean algebra is algebra on the values 0 and 1 with AND (·), OR (+) and NOT ('). Its identities let you simplify logic — fewer gates means cheaper and faster circuits.

## Key identities

| Name | AND form | OR form |
|---|---|---|
| identity | $A\cdot1 = A$ | $A + 0 = A$ |
| null | $A\cdot0 = 0$ | $A + 1 = 1$ |
| idempotent | $AA = A$ | $A + A = A$ |
| complement | $A\bar A = 0$ | $A + \bar A = 1$ |
| absorption | $A(A + B) = A$ | $A + AB = A$ |
| | $A(\bar A + B) = AB$ | $A + \bar AB = A + B$ |
| De Morgan | $\overline{AB} = \bar A + \bar B$ | $\overline{A + B} = \bar A\bar B$ |
| distributive | $A(B + C) = AB + AC$ | $A + BC = (A + B)(A + C)$ |
| consensus | $(A + B)(\bar A + C)(B + C) = (A + B)(\bar A + C)$ | $AB + \bar AC + BC = AB + \bar AC$ |

**Duality:** swapping AND ↔ OR and 0 ↔ 1 in any identity gives another valid identity.

## Key results

- **Canonical forms:** SOP = sum of minterms ($\sum m$); POS = product of maxterms ($\prod M$). The minterm and maxterm indices are complementary sets.
- **Universal gates:** NAND alone, or NOR alone, can build any function. NOT needs 1 gate, AND 2, OR 3 and XOR 4 (all 2-input NAND).
- **XOR:** $A \oplus B = A\bar B + \bar AB$; $A \oplus A = 0$, $A \oplus 1 = \bar A$; XNOR is the equivalence function.
- The number of distinct Boolean functions of $n$ variables is $2^{2^n}$.

## Worked examples

**Example 1.** $\overline{A + B} = \bar A\bar B$.

**Example 2.** $A + \bar AB = (A + \bar A)(A + B) = A + B$.

**Example 3.** $AB + \bar AC + BC = AB + \bar AC$, since $BC = BC(A + \bar A)$ is absorbed.

**Example 4.** There are 16 functions of 2 variables.

## Common GATE traps

- Applying De Morgan without complementing every literal.
- Forgetting the second distributive law $A + BC = (A + B)(A + C)$.

## Summary

- Absorption, De Morgan and consensus do most of the work.
- NAND and NOR are universal; XOR needs 4 NANDs; $2^{2^n}$ functions of $n$ variables.
