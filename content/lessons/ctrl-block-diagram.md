# Block Diagram Representation

> Reducing block diagrams to a single transfer function appears every year.

## Intuition

A block diagram shows how signals flow through system components. Reduction rules let you collapse it, step by step, into one block — like simplifying a resistor network.

## Reduction rules

| Configuration | Equivalent |
|---|---|
| cascade $G_1$, $G_2$ | $G_1G_2$ |
| parallel $G_1 \pm G_2$ | $G_1 \pm G_2$ |
| negative feedback loop | $\dfrac{G}{1 + GH}$ |
| positive feedback loop | $\dfrac{G}{1 - GH}$ |
| unity feedback | $\dfrac{G}{1 + G}$ |

**Moving points across a block $G$** (to keep every signal unchanged):

| Move | Compensation |
|---|---|
| summing point from after $G$ to before $G$ | divide the other input by $G$ |
| summing point from before $G$ to after $G$ | multiply the other input by $G$ |
| pick-off point from before $G$ to after $G$ | add $1/G$ in the branch |
| pick-off point from after $G$ to before $G$ | add $G$ in the branch |

## Strategy

1. Reduce innermost loops first.
2. Move summing or pick-off points to separate interlocking loops.
3. Combine cascades and parallels; repeat.
4. For complex diagrams, convert to a signal flow graph and use Mason's formula.

## Worked examples

**Example 1.** $G_1 = 2$ and $G_2 = 3$ in cascade with unity negative feedback: $T = 6/7 = 0.857$.

**Example 2.** An inner loop $G_2 = 1/s$ with unity feedback gives $\frac{1}{s + 1}$. Cascading $G_1 = 10$ inside an outer unity loop: $\frac{10/(s+1)}{1 + 10/(s+1)} = \frac{10}{s + 11}$, a pole at $-11$.

## Common GATE traps

- The sign in the feedback formula (positive versus negative feedback).
- Forgetting compensation blocks when moving points.

## Summary

- Cascade multiplies, parallel adds, a loop gives $G/(1 \pm GH)$.
- Move summing/pick-off points with $G$ or $1/G$ compensation; reduce inner loops first.
