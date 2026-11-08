# Minimisation Using Karnaugh Maps

> A guaranteed Digital Circuits topic: minimal SOP/POS forms, counting prime implicants, and using don't-cares.

## Intuition

The identity $AB + A\bar B = A$ says that two terms differing in one variable merge and drop that variable. A **Karnaugh map** arranges minterms so that any two neighbouring cells differ in exactly one variable (**Gray-code order**: 00, 01, 11, 10). Grouping neighbouring 1s visually performs these merges.

## Formal setup

For $n$ variables the map has $2^n$ cells. A legal group:
- contains $2^k$ cells (1, 2, 4, 8, …),
- is a rectangle (edges **wrap around**, like a torus),
- eliminates $k$ variables — those that change within the group.

**Definitions**
- **Implicant:** any legal group of 1s (and don't-cares).
- **Prime implicant (PI):** a group that cannot be enlarged.
- **Essential prime implicant (EPI):** a PI that covers some 1 that no other PI covers.

## Procedure for a minimal SOP

1. Mark the 1s (and the don't-cares X).
2. Find all prime implicants — make every group as large as possible.
3. Select all essential prime implicants.
4. Cover any remaining 1s with as few (and as large) PIs as possible.
5. Don't-cares may be included in groups if that helps, but never need covering.

For a **minimal POS**, group the 0s instead and write each group as a sum term (variable = 0 → uncomplemented literal).

## Key results

- Group of $2^k$ cells in an $n$-variable map → product of $n - k$ literals.
- The four corners of a 4-variable map form one group (both edges wrap).
- A function may have **several** minimal forms; questions often ask "which of the following are minimal".
- **Cyclic functions** have no essential PIs (e.g. $\sum m(0,1,2,5,6,7)$, with 6 PIs and two minimal covers).

## Visual picture — 4-variable map layout

| AB \ CD | 00 | 01 | 11 | 10 |
|---|---|---|---|---|
| **00** | m0 | m1 | m3 | m2 |
| **01** | m4 | m5 | m7 | m6 |
| **11** | m12 | m13 | m15 | m14 |
| **10** | m8 | m9 | m11 | m10 |

Rows and columns follow Gray code, so m2 is adjacent to m0 (wrap), and m8 to m0 (wrap).

## Worked examples

**Example 1.** $F = \sum m(0, 2, 8, 10)$: the four corners → $\bar B\bar D$.

**Example 2.** $F(A,B,C) = \sum m(0,2,4,6)$: every cell with $C = 0$ → $\bar C$.

**Example 3 (don't-cares).** $F = \sum m(1,3,7,11,15) + d(0,2,5)$.
$CD$ covers 3, 7, 11, 15 (the $CD = 11$ column). Minterm 1 remains; it can be covered by $\bar A\bar B$ (top row, using d0 and d2) or by $\bar A D$ (using d5). Two minimal forms: $CD + \bar A\bar B$ and $CD + \bar A D$.

**Example 4 (counting PIs).** $\sum m(0,1,2,5,6,7)$ forms a ring 0–1–5–7–6–2–0 with no group of four, so the PIs are the six pairs.

## Common GATE traps

- **Binary order instead of Gray order** on the axes.
- **Missing wrap-around groups** (edges and corners).
- **Groups of 3 or 6** — not allowed.
- **Covering don't-cares unnecessarily** or assuming they must be 1.
- **Counting EPIs vs PIs** — read the question carefully.

## Summary

- Gray-coded map; groups are $2^k$ rectangles with wrap-around.
- Biggest groups first; take EPIs, then cover what remains.
- Don't-cares are optional helpers; several minimal forms can exist.
