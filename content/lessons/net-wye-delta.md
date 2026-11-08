# Wye–Delta Transformation

> Needed for bridge networks and three-terminal blocks that cannot be reduced by series/parallel rules alone.

## Intuition

A **delta** (Δ, triangle) and a **wye** (Y, star) of three resistors can be made equivalent: they present identical resistance between every pair of terminals. Converting one to the other often turns an irreducible network into a series–parallel one.

## Formulas

**Δ → Y** (resistances $R_{ab}$, $R_{bc}$, $R_{ca}$ between terminals):
$$
R_a = \frac{R_{ab}R_{ca}}{R_{ab} + R_{bc} + R_{ca}}, \quad R_b = \frac{R_{ab}R_{bc}}{\Sigma}, \quad R_c = \frac{R_{bc}R_{ca}}{\Sigma}.
$$
Each Y arm = product of the two adjacent Δ sides ÷ the sum of all three.

**Y → Δ:**
$$
R_{ab} = \frac{R_aR_b + R_bR_c + R_cR_a}{R_c}, \quad R_{bc} = \frac{\cdots}{R_a}, \quad R_{ca} = \frac{\cdots}{R_b}.
$$
Each Δ side = (sum of pairwise products) ÷ the **opposite** Y arm.

**Balanced case:** $R_Y = R_\Delta/3$ and $R_\Delta = 3R_Y$. (The same holds for impedances in balanced three-phase circuits.)

## Key results

- **Balanced bridge:** if $R_1/R_2 = R_3/R_4$, the middle branch carries no current and can be removed.
- **Unbalanced bridge:** use a Δ–Y transformation, or nodal analysis.

## Worked examples

**Example 1.** Δ with $R_{ab} = 10$, $R_{bc} = 20$, $R_{ca} = 30$: $\Sigma = 60$, so $R_a = 300/60 = 5$, $R_b = 200/60 = 3.33$, $R_c = 600/60 = 10\,\Omega$.

**Example 2.** Y with $R_a = 1$, $R_b = 2$, $R_c = 3$: sum of products $= 2 + 6 + 3 = 11$, so $R_{ab} = 11/3 = 3.67\,\Omega$.

**Example 3 (unbalanced bridge).** A–C $1\,\Omega$, A–D $2\,\Omega$, C–B $2\,\Omega$, D–B $1\,\Omega$, C–D $1\,\Omega$. Apply 1 V at A with B grounded. Nodal analysis gives $V_C = 4/7$ and $V_D = 3/7$, so the source current is $3/7 + 2/7 = 5/7$ A and $R_{AB} = 1.4\,\Omega$.

## Common GATE traps

- Mixing "adjacent" (Δ→Y) with "opposite" (Y→Δ) in the formulas.
- Forgetting to check for a balanced bridge first.

## Summary

- Δ→Y: product of the adjacent sides ÷ sum. Y→Δ: sum of products ÷ the opposite arm.
- Balanced: $R_Y = R_\Delta/3$.
