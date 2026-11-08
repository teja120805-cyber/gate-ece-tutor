# Taylor and Laurent Series

> Expanding a function in a given region and classifying its singularities are standard tasks; they feed directly into residues.

## Intuition

A **Taylor series** expands an analytic function in positive powers inside a disc where it is analytic. When the region surrounds a singularity — an annulus — you also need **negative powers**: that is the **Laurent series**. The negative-power part (the principal part) describes the singular behaviour.

## Formal definitions

**Taylor** (analytic in $|z - a| < R$): $f(z) = \sum_{n\ge0}\dfrac{f^{(n)}(a)}{n!}(z - a)^n$. The radius of convergence $R$ is the distance from $a$ to the nearest singularity.

**Laurent** (analytic in $r < |z - a| < R$): $f(z) = \sum_{n=-\infty}^{\infty}c_n(z - a)^n$.

## Classifying isolated singularities

| Principal part | Type | Example |
|---|---|---|
| none | removable | $\dfrac{\sin z}{z}$ at 0 |
| finitely many terms (lowest power $-m$) | pole of order $m$ | $\dfrac{1}{z^2}$ at 0 (order 2) |
| infinitely many terms | essential singularity | $e^{1/z}$ at 0 |

## Technique

Use the geometric series $\frac{1}{1 - w} = \sum w^n$ for $|w| < 1$, choosing $w$ to suit the region:
- in $|z| < 1$: $\dfrac{1}{1 - z} = \sum z^n$;
- in $|z| > 1$: $\dfrac{1}{1 - z} = -\dfrac{1}{z}\cdot\dfrac{1}{1 - 1/z} = -\sum_{n\ge1}z^{-n}$.

## Worked examples

**Example 1.** $f = \dfrac{1}{z(z - 1)}$ in $0 < |z| < 1$: $= -\dfrac1z\cdot\dfrac{1}{1 - z} = -\dfrac1z - 1 - z - z^2 - \cdots$; the residue at 0 is $-1$.

**Example 2.** $\dfrac{\sin z}{z^2} = \dfrac1z - \dfrac{z}{6} + \cdots$ — a simple pole with residue 1.

**Example 3.** $e^{1/z} = 1 + \dfrac1z + \dfrac{1}{2!z^2} + \cdots$ — an essential singularity with residue 1.

**Example 4.** $\dfrac{1}{1 - z}$ about 0 has radius of convergence 1 (the singularity is at $z = 1$).

## Common GATE traps

- Using the $|z| < 1$ expansion in a $|z| > 1$ region.
- Calling $\sin z/z$ a pole (it is removable).

## Summary

- Taylor: positive powers in a disc; radius = distance to the nearest singularity.
- Laurent: both powers in an annulus; the principal part classifies the singularity; $c_{-1}$ is the residue.
