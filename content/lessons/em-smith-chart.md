# Smith Chart

> Reading the chart: special points, the direction of rotation, distance per revolution, and finding VSWR or admittance.

## Intuition

The Smith chart plots the reflection coefficient Γ in the complex plane (inside the unit circle), overlaid with curves of constant normalised resistance $r$ and reactance $x$. Moving along a lossless line only rotates Γ, so line transformations become **rotations** about the centre.

## Layout ($z = Z/Z_0 = r + jx$)

| Point | Meaning |
|---|---|
| centre | $z = 1$: matched, $\Gamma = 0$ |
| right end | $z = \infty$: open circuit, $\Gamma = +1$ |
| left end | $z = 0$: short circuit, $\Gamma = -1$ |
| upper half | inductive ($x > 0$) |
| lower half | capacitive ($x < 0$) |
| outer circle | $|\Gamma| = 1$: purely reactive loads |

## Key operations

- **Moving toward the generator:** clockwise rotation; **toward the load:** counter-clockwise.
- **One full revolution = $\lambda/2$** (Γ rotates by $2\beta\ell$).
- **Constant-$|\Gamma|$ circles** (VSWR circles) are centred on the chart centre. The **VSWR** equals the value of $r$ where the circle crosses the real axis to the right of the centre ($r > 1$).
- **Admittance:** the point diametrically opposite $z$ (a 180° rotation, i.e. $\lambda/4$) gives $y = 1/z$.
- The voltage maximum is at the right-hand real-axis crossing; the voltage minimum at the left-hand crossing.

## Worked examples

**Example 1.** $z = 2$ (real): the circle crosses the real axis at $r = 2$, so VSWR = 2 and $|\Gamma| = 1/3$.

**Example 2.** Moving $\lambda/4$ from $z = 2$ gives $z = 0.5$ — the impedance inversion of a quarter-wave line.

**Example 3.** $z = 1 + j1$ lies on the $r = 1$ circle in the upper (inductive) half; its admittance is $y = 0.5 - j0.5$.

## Common GATE traps

- Using λ instead of λ/2 for a full revolution.
- Getting the rotation direction wrong (toward the generator is clockwise).

## Summary

- Centre = match; right = open; left = short; upper half inductive.
- Clockwise toward the generator; one revolution = λ/2; opposite point = admittance.
