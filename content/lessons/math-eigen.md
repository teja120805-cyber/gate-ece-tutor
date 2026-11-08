# Eigenvalues and Eigenvectors

> One of the most reliably asked Mathematics topics: 1- and 2-mark questions on eigenvalues of special matrices, trace/determinant shortcuts and Cayley–Hamilton. It also underpins state-space analysis in Control.

## Intuition

Most vectors change direction when multiplied by a matrix $A$. **Eigenvectors** are the special directions that $A$ only stretches or shrinks: $A\mathbf{v}$ points along $\mathbf{v}$. The stretch factor is the **eigenvalue** $\lambda$. A negative $\lambda$ flips the direction; $\lambda = 0$ squashes that direction to zero (so $A$ is singular).

## Formal definition

$$
A\mathbf{v} = \lambda\mathbf{v}, \qquad \mathbf{v} \neq \mathbf{0}.
$$

Rewrite as $(A - \lambda I)\mathbf{v} = \mathbf{0}$. A non-zero solution exists only if $A - \lambda I$ is singular:

$$
\det(A - \lambda I) = 0 \qquad \text{(characteristic equation)}.
$$

For a $2\times2$ matrix: $\lambda^2 - (\operatorname{tr} A)\,\lambda + \det A = 0$.

## Key results

| Result | Statement |
|---|---|
| Sum | $\sum \lambda_i = \operatorname{tr}(A)$ |
| Product | $\prod \lambda_i = \det(A)$ ⇒ singular iff some $\lambda = 0$ |
| Triangular/diagonal | eigenvalues = diagonal entries |
| Powers | $A^k$ has eigenvalues $\lambda^k$ (same eigenvectors) |
| Inverse | $A^{-1}$ has eigenvalues $1/\lambda$ |
| Shift | $A + cI$ has eigenvalues $\lambda + c$ |
| Polynomial | $p(A)$ has eigenvalues $p(\lambda)$ |
| Transpose | $A^T$ has the same eigenvalues |
| Real symmetric | real eigenvalues; eigenvectors of distinct eigenvalues are orthogonal |
| Skew-symmetric (real) | eigenvalues are 0 or purely imaginary |
| Orthogonal | $|\lambda| = 1$ |
| Idempotent ($A^2 = A$) | $\lambda \in \{0, 1\}$ |

**Cayley–Hamilton theorem.** Every square matrix satisfies its own characteristic equation. For $2\times2$: $A^2 - (\operatorname{tr}A)A + (\det A)I = 0$. Use it to compute $A^{-1}$ or high powers without multiplying matrices.

**Diagonalisation.** If $A$ has $n$ independent eigenvectors (always true for distinct eigenvalues), $A = PDP^{-1}$, so $A^k = PD^kP^{-1}$.

## Visual picture

For $A = \begin{bmatrix}2 & 0\\0 & 3\end{bmatrix}$ the x-axis is stretched by 2 and the y-axis by 3 — the axes are the eigenvectors. A general vector such as $(1,1)$ becomes $(2,3)$, which has changed direction, so it is not an eigenvector.

## Worked examples

**Example 1.** $A = \begin{bmatrix}4 & 1\\2 & 3\end{bmatrix}$.
$\lambda^2 - 7\lambda + 10 = 0 \Rightarrow \lambda = 5, 2$.
For $\lambda = 5$: $(A - 5I)\mathbf v = \begin{bmatrix}-1 & 1\\2 & -2\end{bmatrix}\mathbf v = 0 \Rightarrow \mathbf v = (1, 1)^T$.

**Example 2.** A $3\times3$ matrix has eigenvalues $1, -1, 2$. Then $\operatorname{tr}A = 2$, $\det A = -2$, $A^2$ has eigenvalues $1, 1, 4$, and $\det(A^2 + I) = (2)(2)(5) = 20$.

**Example 3 (Cayley–Hamilton).** $A = \begin{bmatrix}1 & 2\\0 & 3\end{bmatrix}$: $A^2 - 4A + 3I = 0$.
So $A^{-1} = \tfrac13(4I - A) = \tfrac13\begin{bmatrix}3 & -2\\0 & 1\end{bmatrix}$.

**Example 4.** Eigenvalues of $\begin{bmatrix}0 & 1\\-1 & 0\end{bmatrix}$ (rotation by 90°): $\lambda^2 + 1 = 0 \Rightarrow \lambda = \pm j$. No real direction is preserved by a rotation.

## Common GATE traps

- **Using row operations to find eigenvalues.** Row reduction changes eigenvalues; it is only valid on $A - \lambda I$ when finding eigenvectors.
- **Assuming eigenvalues of $A + B$ are sums of eigenvalues** — only true in special cases (e.g. $B = cI$).
- **Rank vs eigenvalues:** a rank-1 $n\times n$ matrix has $n-1$ zero eigenvalues and one eigenvalue equal to its trace.

## Summary

- $\det(A - \lambda I) = 0$; for $2\times2$, use trace and determinant.
- Trace = sum, determinant = product; functions of $A$ act on the eigenvalues.
- Cayley–Hamilton converts high powers and inverses into a few matrix terms.
