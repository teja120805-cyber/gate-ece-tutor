# Vectors in Plane and Space

> Dot and cross products are prerequisites for vector calculus and electromagnetics (force, flux, the Poynting vector).

## Intuition

The **dot product** measures how much two vectors point the same way, giving a scalar. The **cross product** produces a vector perpendicular to both, with magnitude equal to the area of the parallelogram they span.

## Formal definitions

For $\mathbf a = (a_1, a_2, a_3)$ and $\mathbf b = (b_1, b_2, b_3)$:

$$
\mathbf a\cdot\mathbf b = a_1b_1 + a_2b_2 + a_3b_3 = |\mathbf a||\mathbf b|\cos\theta
$$

$$
\mathbf a\times\mathbf b = \begin{vmatrix}\hat i & \hat j & \hat k\\ a_1 & a_2 & a_3\\ b_1 & b_2 & b_3\end{vmatrix}, \qquad |\mathbf a\times\mathbf b| = |\mathbf a||\mathbf b|\sin\theta .
$$

## Key results

- $\mathbf a\cdot\mathbf b = 0$ ⇔ perpendicular; $\mathbf a\times\mathbf b = \mathbf 0$ ⇔ parallel.
- $\mathbf a\times\mathbf b = -\mathbf b\times\mathbf a$; $\hat i\times\hat j = \hat k$ (cyclic order).
- Projection of $\mathbf a$ onto $\mathbf b$: $\dfrac{\mathbf a\cdot\mathbf b}{|\mathbf b|}$.
- **Scalar triple product** $\mathbf a\cdot(\mathbf b\times\mathbf c) = \det[\mathbf a; \mathbf b; \mathbf c]$ = volume of the parallelepiped; it is 0 iff the vectors are coplanar.
- **Vector triple product:** $\mathbf a\times(\mathbf b\times\mathbf c) = \mathbf b(\mathbf a\cdot\mathbf c) - \mathbf c(\mathbf a\cdot\mathbf b)$ ("BAC − CAB").
- Triangle area $= \frac12|\mathbf a\times\mathbf b|$.

## Worked examples

**Example 1.** $(1, 2, 3)\cdot(4, -5, 6) = 4 - 10 + 18 = 12$.

**Example 2.** The angle between $(1, 1, 0)$ and $(0, 1, 1)$: $\cos\theta = \frac{1}{\sqrt2\sqrt2} = \frac12$ ⇒ $60°$.

**Example 3.** $(1, 0, 0)\times(0, 2, 0) = (0, 0, 2)$, magnitude 2.

**Example 4.** The volume spanned by $(1, 0, 0)$, $(0, 2, 0)$, $(0, 0, 3)$ is $\det = 6$.

## Common GATE traps

- Order matters in the cross product (it is anti-commutative).
- Confusing the triple product with a product of magnitudes.

## Summary

- Dot product: $|\mathbf a||\mathbf b|\cos\theta$; cross product: $|\mathbf a||\mathbf b|\sin\theta\,\hat{\mathbf n}$.
- Triple product = signed volume; zero ⇔ coplanar.
