# Rank of a Matrix

> Rank decides whether a linear system has solutions and how many; it also counts independent rows and columns.

## Intuition

Rank is the number of **genuinely independent directions** in a matrix: the dimension of the space its columns (equivalently, its rows) span. Redundant rows — those that are combinations of others — add nothing.

## Formal definition

$\rho(A)$ is:
- the number of non-zero rows in a row-echelon form of $A$; or
- the order of the largest non-vanishing minor; or
- the maximum number of linearly independent rows (= columns).

## Key results

- $\rho(A) = \rho(A^T)$; $\rho(A) \le \min(m, n)$ for an $m\times n$ matrix.
- An $n\times n$ matrix is invertible ⇔ $\rho = n$ ⇔ $\det \ne 0$.
- $\rho(AB) \le \min(\rho(A), \rho(B))$; multiplying by an invertible matrix leaves the rank unchanged.
- **Rank–nullity:** $\rho(A) + \text{nullity}(A) = n$ (number of columns).
- A non-zero outer product $\mathbf{u}\mathbf{v}^T$ has rank 1. The all-ones $n\times n$ matrix has rank 1.
- Row operations do not change rank.

## Visual picture

$\begin{bmatrix}1&2&3\\2&4&6\\1&0&1\end{bmatrix} \xrightarrow{R_2 - 2R_1,\ R_3 - R_1} \begin{bmatrix}1&2&3\\0&0&0\\0&-2&-2\end{bmatrix}$: two non-zero rows ⇒ rank 2.

## Worked examples

**Example 1.** $\begin{bmatrix}1&2\\2&4\end{bmatrix}$: row 2 = 2 × row 1 ⇒ rank 1.

**Example 2.** A $4\times6$ matrix has rank at most 4. If its rank is 3, the null space has dimension $6 - 3 = 3$.

**Example 3.** $\begin{bmatrix}1&2&1\\2&4&2\\3&6&4\end{bmatrix}$: $R_2 = 2R_1$ and $R_3 - 3R_1 = (0, 0, 1)$ ⇒ rank 2.

## Common GATE traps

- Counting rows instead of independent rows.
- Using column operations and row operations inconsistently while solving systems (both are fine for rank alone).
- Forgetting that rank is the same for $A$ and $A^T$.

## Summary

- Rank = independent rows = independent columns = non-zero rows in echelon form.
- Rank–nullity: $\rho + \text{nullity} = n$.
