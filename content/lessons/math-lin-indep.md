# Linear Dependence and Independence

> "For what value of $k$ are these vectors dependent?" is a classic GATE question — a determinant set to zero.

## Intuition

Vectors are **dependent** if at least one of them is redundant — it can be built from the others. Geometrically: two dependent vectors lie on one line; three dependent vectors in 3D lie in one plane.

## Formal definition

$\mathbf v_1, \dots, \mathbf v_k$ are **linearly independent** if
$$
c_1\mathbf v_1 + \cdots + c_k\mathbf v_k = \mathbf 0 \;\Longrightarrow\; c_1 = \cdots = c_k = 0 .
$$
Otherwise they are dependent.

## Key results

- Put the vectors as rows (or columns) of a matrix: they are independent ⇔ rank $= k$.
- $n$ vectors in $\mathbb{R}^n$: independent ⇔ $\det \ne 0$.
- More than $n$ vectors in $\mathbb{R}^n$ are always dependent.
- Any set containing $\mathbf 0$ is dependent.
- Two vectors are dependent ⇔ one is a scalar multiple of the other.
- Mutually orthogonal non-zero vectors are always independent.
- Eigenvectors for distinct eigenvalues are independent.
- Functions: if the **Wronskian** is non-zero at some point, the functions are independent.

## Worked examples

**Example 1.** $(1, 2)$ and $(2, 4)$: the second is $2\times$ the first ⇒ dependent.

**Example 2.** For what $k$ are $(1,1,0)$, $(0,1,1)$, $(1,0,k)$ dependent?
$\det\begin{bmatrix}1&1&0\\0&1&1\\1&0&k\end{bmatrix} = 1(k - 0) - 1(0 - 1) + 0 = k + 1 = 0 \Rightarrow k = -1$.

**Example 3.** The rows of $\begin{bmatrix}1&2&1\\2&4&2\\3&6&4\end{bmatrix}$: rank 2, so at most 2 rows are independent.

## Common GATE traps

- Using a determinant when the matrix is not square — use rank instead.
- Assuming independence because no vector is a multiple of *one* other vector (it could be a combination of two others).

## Summary

- Independent ⇔ only the trivial combination gives $\mathbf 0$ ⇔ full rank.
- Square case: $\det \ne 0$. More vectors than dimensions ⇒ dependent.
