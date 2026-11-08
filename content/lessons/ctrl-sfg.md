# Signal Flow Graphs and Mason's Gain Formula

> Mason's formula questions (identifying loops and non-touching loops) appear almost every year.

## Intuition

A signal flow graph (SFG) represents the same equations as a block diagram, but with nodes as signals and directed branches as gains. Mason's formula gives the overall transfer function directly, with no step-by-step reduction.

## Definitions

- **Forward path:** from the input node to the output node, visiting no node twice. Gain $P_k$.
- **Loop:** a closed path that starts and ends at the same node, visiting no other node twice. Gain $L_i$.
- **Non-touching loops:** loops with no node in common.

## Mason's gain formula

$$
T = \frac{\sum_k P_k\Delta_k}{\Delta}, \qquad \Delta = 1 - \sum L_i + \sum L_iL_j - \sum L_iL_jL_k + \cdots
$$

- $\sum L_i$: the sum of all individual loop gains.
- $\sum L_iL_j$: the sum of products of all pairs of **non-touching** loops (and so on for triples).
- $\Delta_k$: $\Delta$ computed using only the loops that do **not** touch forward path $k$ (equal to 1 if every loop touches it).

## Worked examples

**Example 1.** One forward path of gain 10 and one loop of gain $-0.5$ touching it: $T = \frac{10}{1 + 0.5} = 6.67$.

**Example 2.** Two non-touching loops $L_1 = -2$, $L_2 = -3$, and one forward path of gain 5 touching both:
$\Delta = 1 - (-2 - 3) + (-2)(-3) = 1 + 5 + 6 = 12$, $\Delta_1 = 1$, so $T = 5/12 = 0.417$.

**Example 3.** If the forward path touches $L_1$ but not $L_2$: $\Delta_1 = 1 - L_2 = 4$, so $T = 5\times4/12 = 1.67$.

## Common GATE traps

- Including touching loop pairs in $\sum L_iL_j$.
- Using the full $\Delta$ for $\Delta_k$ instead of removing the touching loops.
- Signs: the loop gains already include the minus sign for negative feedback.

## Summary

- $T = \sum P_k\Delta_k/\Delta$; $\Delta = 1 - \sum L + \sum(\text{non-touching pairs}) - \cdots$.
- $\Delta_k$ keeps only the loops that do not touch path $k$.
