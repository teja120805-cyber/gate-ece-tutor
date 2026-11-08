# Matrix Algebra and Determinants

> Determinant and inverse properties give quick 1-mark answers and are the foundation for rank, eigenvalues and linear systems.

## Intuition

A matrix is a linear transformation. Its **determinant** is the factor by which it scales area (2D) or volume (3D), with a sign for orientation. $\det A = 0$ means the transformation squashes space into a lower dimension, so it cannot be undone — $A$ has no inverse.

## Formal definitions

- $2\times2$: $\det\begin{bmatrix}a&b\\c&d\end{bmatrix} = ad - bc$, and $A^{-1} = \dfrac{1}{ad - bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}$.
- General: cofactor expansion along any row or column; $A^{-1} = \dfrac{\operatorname{adj}A}{\det A}$.
- Products: $(AB)^T = B^TA^T$, $(AB)^{-1} = B^{-1}A^{-1}$; matrix multiplication is **not** commutative.

## Key results

| Property | Statement ($A$ is $n\times n$) |
|---|---|
| Product | $\det(AB) = \det A\,\det B$ |
| Scalar | $\det(kA) = k^n\det A$ |
| Transpose | $\det A^T = \det A$ |
| Inverse | $\det A^{-1} = 1/\det A$ |
| Adjoint | $\det(\operatorname{adj}A) = (\det A)^{n-1}$ |
| Row swap | changes the sign |
| Add a multiple of one row to another | no change |
| Triangular matrix | product of the diagonal entries |
| Two equal or proportional rows | $\det = 0$ |

$\det(A + B) \ne \det A + \det B$ in general.

**Special matrices:** symmetric $A^T = A$; skew-symmetric $A^T = -A$ (an odd-order skew-symmetric matrix has $\det = 0$); orthogonal $A^TA = I$ ($\det = \pm1$).

## Worked examples

**Example 1.** $\det\begin{bmatrix}2&3\\1&4\end{bmatrix} = 8 - 3 = 5$.

**Example 2.** $3\times3$ with $\det A = 4$: $\det(2A) = 2^3 \cdot 4 = 32$; $\det(\operatorname{adj}A) = 4^2 = 16$.

**Example 3.** $A = \begin{bmatrix}4&7\\2&6\end{bmatrix}$: $\det = 10$, $A^{-1} = \frac{1}{10}\begin{bmatrix}6&-7\\-2&4\end{bmatrix}$, so $(A^{-1})_{11} = 0.6$.

## Common GATE traps

- Using $\det(kA) = k\det A$ (the power $n$ is missing).
- Writing $(AB)^{-1} = A^{-1}B^{-1}$ (the order must reverse).
- Expanding without exploiting zeros or row operations.

## Summary

- $\det(AB) = \det A\det B$, $\det(kA) = k^n\det A$, $\det(\operatorname{adj}A) = (\det A)^{n-1}$.
- $A^{-1} = \operatorname{adj}A/\det A$; it exists iff $\det A \ne 0$.
