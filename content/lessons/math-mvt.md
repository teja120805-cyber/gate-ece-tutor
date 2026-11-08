# Mean Value Theorems

> GATE asks for the value of $c$ guaranteed by Rolle's or Lagrange's theorem, or checks whether the theorem's conditions hold.

## Intuition

If you drive 120 km in 2 hours, at some instant your speedometer read exactly 60 km/h. **Lagrange's mean value theorem** says the instantaneous rate equals the average rate somewhere in between. **Rolle's theorem** is the special case where you return to your starting value, so the rate is zero somewhere.

## Formal statements

Let $f$ be **continuous on $[a, b]$** and **differentiable on $(a, b)$**.

- **Rolle:** if $f(a) = f(b)$, there is $c \in (a, b)$ with $f'(c) = 0$.
- **Lagrange (LMVT):** there is $c \in (a, b)$ with $f'(c) = \dfrac{f(b) - f(a)}{b - a}$.
- **Cauchy:** for $f, g$ satisfying the hypotheses with $g' \ne 0$: $\dfrac{f'(c)}{g'(c)} = \dfrac{f(b) - f(a)}{g(b) - g(a)}$.

## Key results

- For a quadratic $f(x) = px^2 + qx + r$, the LMVT point is always the midpoint $c = \frac{a + b}{2}$.
- If any hypothesis fails, the conclusion may fail. Example: $|x|$ on $[-1, 1]$ has $f(-1) = f(1)$ but $f'(x) = \pm1$, never 0.
- Consequences: $f' = 0$ on an interval ⇒ $f$ is constant; $f' > 0$ ⇒ $f$ is increasing; $|f(b) - f(a)| \le M|b - a|$ when $|f'| \le M$.

## Worked examples

**Example 1.** $f(x) = x^2$ on $[1, 3]$: average slope $= (9 - 1)/2 = 4 = 2c$ ⇒ $c = 2$ (the midpoint).

**Example 2.** $f(x) = x^3$ on $[0, 3]$: $3c^2 = 27/3 = 9$ ⇒ $c = \sqrt3 \approx 1.732$.

**Example 3.** Rolle for $x^2 - 4x + 3$ on $[1, 3]$: $f(1) = f(3) = 0$; $f'(c) = 2c - 4 = 0$ ⇒ $c = 2$.

## Common GATE traps

- Forgetting to check continuity on the **closed** interval and differentiability on the **open** interval.
- Giving a $c$ outside $(a, b)$ — discard roots outside the interval.

## Summary

- Rolle: equal end values ⇒ $f'(c) = 0$.
- Lagrange: $f'(c) = $ average slope; for quadratics, $c$ is the midpoint.
- Check the hypotheses first.
