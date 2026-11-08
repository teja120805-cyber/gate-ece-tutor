# Reciprocity Theorem

> Short questions: apply reciprocity to swap the source and the measurement, or test two-port parameters for reciprocity.

## Intuition

In a network of ordinary R, L, C elements (and transformers), the "transfer" from point A to point B equals the transfer from B to A. Swap the source and the ammeter, and the reading stays the same.

## Formal statement

In a linear, bilateral network **without dependent sources** (or with only special ones):
- an ideal voltage source $V$ in branch 1 producing current $I$ in branch 2 (short-circuited) will, when moved to branch 2, produce the same current $I$ in branch 1;
- similarly with a current source and an open-circuit voltage.

The ratio (response/excitation) is invariant under interchange of the excitation and response positions.

## Key results

**Two-port reciprocity conditions:**

| Parameters | Condition |
|---|---|
| Z | $z_{12} = z_{21}$ |
| Y | $y_{12} = y_{21}$ |
| h | $h_{12} = -h_{21}$ |
| ABCD | $AD - BC = 1$ |

- Networks containing dependent sources (e.g. transistor models) are generally **not** reciprocal.
- Reciprocity needs the ratio $V/I$ to be measured with the correct terminations: a voltage source with short-circuit current, or a current source with open-circuit voltage.

## Worked examples

**Example 1.** 10 V at port 1 gives 2 A short-circuit current at port 2. Then 25 V at port 2 gives $2\times\frac{25}{10} = 5$ A at port 1 (by linearity and reciprocity).

**Example 2.** A two-port with $z_{11} = 5$, $z_{12} = z_{21} = 2$, $z_{22} = 4\,\Omega$: injecting 1 A at port 2 with port 1 open gives $V_1 = z_{12}\cdot1 = 2$ V — the same as $V_2$ when 1 A is injected at port 1.

## Common GATE traps

- Applying reciprocity to circuits with dependent sources.
- Swapping the source without also swapping the termination type.

## Summary

- Passive linear bilateral networks are reciprocal: transfer A→B = transfer B→A.
- Two-port tests: $z_{12} = z_{21}$, $y_{12} = y_{21}$, $h_{12} = -h_{21}$, $AD - BC = 1$.
