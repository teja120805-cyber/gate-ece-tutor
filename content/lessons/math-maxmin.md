# Maxima and Minima

> Single-variable extrema on intervals and two-variable extrema with the $rt - s^2$ test are both standard GATE questions.

## Intuition

At a smooth peak or valley the tangent is flat, so the derivative is zero. The second derivative tells which it is: curving up (a valley, minimum) or curving down (a peak, maximum). On a closed interval the extreme value may also sit at an **endpoint**.

## One variable

1. Solve $f'(x) = 0$ (and note points where $f'$ does not exist).
2. Second-derivative test: $f'' > 0$ ⇒ local minimum; $f'' < 0$ ⇒ local maximum; $f'' = 0$ ⇒ inconclusive (use the sign change of $f'$, or higher derivatives).
3. **Global extrema on $[a, b]$:** compare $f$ at the critical points **and** at both endpoints.

## Two variables

1. Solve $f_x = 0$, $f_y = 0$ for the stationary points.
2. Let $r = f_{xx}$, $s = f_{xy}$, $t = f_{yy}$ at each point:

| Condition | Conclusion |
|---|---|
| $rt - s^2 > 0$, $r > 0$ | local minimum |
| $rt - s^2 > 0$, $r < 0$ | local maximum |
| $rt - s^2 < 0$ | saddle point |
| $rt - s^2 = 0$ | test fails |

**Constrained extrema (Lagrange multipliers):** to extremise $f$ subject to $g = 0$, solve $\nabla f = \lambda\nabla g$ together with $g = 0$.

## Worked examples

**Example 1.** $f(x) = x(6 - x)$: $f' = 6 - 2x = 0$ ⇒ $x = 3$; $f'' = -2 < 0$ ⇒ maximum $f(3) = 9$.

**Example 2.** $f(x) = x^3 - 3x$ on $[0, 2]$: $f' = 3x^2 - 3 = 0$ ⇒ $x = 1$ (inside). Values: $f(0) = 0$, $f(1) = -2$, $f(2) = 2$. Global max 2 (endpoint), min $-2$.

**Example 3.** $f(x, y) = x^2 + y^2 - 2x + 4y$: stationary point $(1, -2)$; $r = 2$, $t = 2$, $s = 0$ ⇒ minimum, value $1 + 4 - 2 - 8 = -5$.

**Example 4.** $f = x^2 - y^2$ at $(0, 0)$: $rt - s^2 = (2)(-2) - 0 < 0$ ⇒ saddle.

**Example 5.** Maximise $xy$ subject to $x + y = 10$: $y = \lambda$, $x = \lambda$ ⇒ $x = y = 5$, maximum 25.

## Common GATE traps

- Ignoring endpoints for global extrema on closed intervals.
- Reading $rt - s^2 > 0$ as "minimum" without checking the sign of $r$.

## Summary

- Critical points: $f' = 0$; classify with $f''$; on $[a, b]$ also check the endpoints.
- Two variables: $rt - s^2 > 0$ is an extremum (sign of $r$ decides which), $< 0$ is a saddle.
