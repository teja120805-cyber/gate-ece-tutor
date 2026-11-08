# Vector Space and Basis

> Questions ask whether a set is a subspace, or for the dimension of a space such as symmetric matrices or a null space.

## Intuition

A **vector space** is a set where you can add elements and scale them without ever leaving the set. A **basis** is a minimal set of building blocks: every element is a *unique* combination of them. The number of blocks needed is the **dimension**.

## Formal definitions

- **Subspace test:** a non-empty subset $W$ is a subspace iff it is closed under addition and scalar multiplication. Equivalently, $a\mathbf{u} + b\mathbf{v} \in W$ for all $\mathbf{u}, \mathbf{v} \in W$. In particular $\mathbf{0} \in W$.
- **Span** of a set: all linear combinations of its vectors.
- **Basis:** a linearly independent spanning set. **Dimension** = number of basis vectors.

## Key results

| Space | Dimension |
|---|---|
| $\mathbb{R}^n$ | $n$ |
| $m\times n$ matrices | $mn$ |
| $n\times n$ symmetric matrices | $n(n+1)/2$ |
| $n\times n$ skew-symmetric matrices | $n(n-1)/2$ |
| polynomials of degree $\le n$ | $n + 1$ |
| null space of $A$ ($m\times n$) | $n - \rho(A)$ |
| column space of $A$ | $\rho(A)$ |

- In an $n$-dimensional space, any $n$ independent vectors form a basis, and any $n+1$ vectors are dependent.
- Typical subspaces: $\{\mathbf x : A\mathbf x = \mathbf 0\}$, planes and lines **through the origin**.
- Not subspaces: $\{x + y + z = 1\}$ (no zero vector), $\{x \ge 0\}$ (fails under negative scaling), $\{xy = 0\}$ (fails under addition).

## Worked examples

**Example 1.** $\{(x, y, z): x + y + z = 0\}$ is a plane through the origin: a subspace of dimension 2.

**Example 2.** $3\times3$ symmetric matrices: 3 diagonal + 3 off-diagonal free entries = 6.

**Example 3.** $\{(1,1), (1,-1)\}$ is a basis of $\mathbb{R}^2$ (independent, and two vectors in 2D). $\{(1,0), (0,1), (1,1)\}$ spans $\mathbb{R}^2$ but is not a basis (it is dependent).

## Common GATE traps

- Forgetting to check that the zero vector belongs to the set.
- Confusing "spanning" with "basis" — a basis must also be independent.

## Summary

- Subspace: closed under linear combinations (contains $\mathbf 0$).
- Basis: independent + spanning; dimension = its size.
- Symmetric $n\times n$: $n(n+1)/2$; null space: $n - \rho$.
