# Solution of Linear Equations: Existence and Uniqueness

> Almost every GATE paper asks whether a system has no solution, a unique solution or infinitely many — often depending on a parameter.

## Intuition

Each equation is a constraint (a line in 2D, a plane in 3D). Solutions are the points satisfying all constraints at once. The constraints might meet at a point (unique), coincide along a line or plane (infinitely many), or contradict each other (none, e.g. parallel lines).

## Formal statement (Rouché–Capelli)

For $A\mathbf x = \mathbf b$ with $n$ unknowns and augmented matrix $[A|\mathbf b]$:

| Condition | Result |
|---|---|
| $\rho(A) < \rho([A|\mathbf b])$ | **no solution** (inconsistent) |
| $\rho(A) = \rho([A|\mathbf b]) = n$ | **unique solution** |
| $\rho(A) = \rho([A|\mathbf b]) = r < n$ | **infinitely many** ($n - r$ free parameters) |

**Square systems:** $\det A \ne 0$ ⇒ unique solution $\mathbf x = A^{-1}\mathbf b$. If $\det A = 0$, the system has either no solution or infinitely many — check consistency.

**Homogeneous systems** $A\mathbf x = \mathbf 0$ are always consistent. There is only the trivial solution iff $\rho(A) = n$ (for square $A$: $\det A \ne 0$); otherwise there are infinitely many.

## Worked examples

**Example 1.** $x + y = 2$, $2x + 2y = 5$: the left sides are proportional but the right sides are not ⇒ no solution.

**Example 2.** $x + 2y = 3$, $2x + ky = 6$: $\det = k - 4$. For $k \ne 4$, a unique solution. For $k = 4$ the second equation is exactly twice the first ⇒ infinitely many.

**Example 3.** $x + y + z = 6$, $x + 2y + 3z = 14$, $x + 4y + \lambda z = \mu$:
$\det = \lambda - 7$. A unique solution exists iff $\lambda \ne 7$. For $\lambda = 7$, row reduction shows there are infinitely many solutions iff $\mu = 30$, and none otherwise.

## Common GATE traps

- Concluding "no solution" from $\det A = 0$ alone.
- Forgetting that homogeneous systems are never inconsistent.
- Counting free parameters as $\rho$ instead of $n - \rho$.

## Summary

- Compare $\rho(A)$ and $\rho([A|\mathbf b])$ with $n$.
- Square: $\det A \ne 0$ ⇔ unique; otherwise check consistency.
- Homogeneous: a non-trivial solution exists ⇔ $\rho(A) < n$.
