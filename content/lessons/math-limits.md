# Limits, Continuity and Differentiability

> Limits appear directly (standard forms, L'Hôpital) and as a prerequisite for every calculus topic.

## Intuition

A **limit** asks what value $f(x)$ approaches as $x$ gets close to $a$ — not what happens exactly at $a$. **Continuity** means there is no jump or hole: the limit equals the function value. **Differentiability** means the graph has a well-defined tangent: no corners and no vertical tangents.

## Formal definitions

- $\lim_{x\to a}f(x) = L$ exists iff the left and right limits both equal $L$.
- Continuous at $a$: $\lim_{x\to a}f(x) = f(a)$.
- Differentiable at $a$: $f'(a) = \lim_{h\to0}\dfrac{f(a+h) - f(a)}{h}$ exists (left and right derivatives are equal).
- Differentiable ⇒ continuous. The converse fails: $|x|$ at 0.

## Key results

**Standard limits** ($x \to 0$ unless stated):
$$
\frac{\sin x}{x} \to 1,\quad \frac{1 - \cos x}{x^2} \to \frac12,\quad \frac{e^x - 1}{x} \to 1,\quad \frac{\ln(1+x)}{x} \to 1,\quad \frac{a^x - 1}{x} \to \ln a
$$
$$
\lim_{x\to\infty}\left(1 + \frac{a}{x}\right)^x = e^a, \qquad \lim_{x\to0}(1 + ax)^{1/x} = e^a .
$$

**L'Hôpital's rule:** for $0/0$ or $\infty/\infty$ forms, $\lim f/g = \lim f'/g'$. Convert other indeterminate forms first:
- $0\cdot\infty$: rewrite as a quotient;
- $1^\infty$, $0^0$, $\infty^0$: take logarithms.

**Rational functions at infinity:** compare degrees — equal degrees give the ratio of leading coefficients.

**Squeeze theorem:** $x\sin(1/x) \to 0$ as $x \to 0$, because $|x\sin(1/x)| \le |x|$.

## Worked examples

**Example 1.** $\lim_{x\to0}\dfrac{1 - \cos x}{x^2} = \lim\dfrac{\sin x}{2x} = \dfrac12$.

**Example 2.** $\lim_{x\to\infty}(1 + 2/x)^x = e^2 \approx 7.389$.

**Example 3.** $f(x) = |x|$ at 0: left derivative $-1$, right derivative $+1$ ⇒ continuous but not differentiable.

**Example 4.** $\lim_{x\to0}x\ln x$ ($0\cdot\infty$): write as $\dfrac{\ln x}{1/x}$; L'Hôpital gives $\dfrac{1/x}{-1/x^2} = -x \to 0$.

## Common GATE traps

- Applying L'Hôpital to a form that is not indeterminate.
- Missing one-sided behaviour (e.g. $1/x$ at 0, or functions defined piecewise).
- Assuming continuity implies differentiability.

## Summary

- Limit exists ⇔ the left and right limits agree; continuity ⇔ limit = value.
- Learn the standard limits; use L'Hôpital only for $0/0$ and $\infty/\infty$.
