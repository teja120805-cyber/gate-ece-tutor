# Random Variables, PDF/CDF and Expectation

> Normalising a PDF, finding a mean or variance, and properties of expectation appear every year. They are essential for random processes in Communications.

## Intuition

A random variable assigns a number to each outcome. Its distribution says how likely each value (or range of values) is. The **mean** is the balance point of the distribution; the **variance** measures the spread around it.

## Formal definitions

- Discrete: PMF $p(x_i)$ with $\sum p = 1$. Continuous: PDF $f(x) \ge 0$ with $\int f = 1$, and $P(a < X \le b) = \int_a^b f$.
- CDF $F(x) = P(X \le x)$: non-decreasing, from 0 to 1, right-continuous; $f = F'$.
- $E[X] = \sum x\,p(x)$ or $\int x f(x)\,dx$; $E[g(X)] = \int g(x)f(x)\,dx$.
- $\operatorname{Var}(X) = E[X^2] - (E[X])^2$.

## Key results

- $E[aX + b] = aE[X] + b$; $\operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)$.
- $E[X + Y] = E[X] + E[Y]$ **always**.
- $\operatorname{Var}(X + Y) = \operatorname{Var}X + \operatorname{Var}Y + 2\operatorname{Cov}(X, Y)$, which reduces to the sum when $X$ and $Y$ are uncorrelated (e.g. independent).
- Independent ⇒ $E[XY] = E[X]E[Y]$.

| Distribution | Mean | Variance |
|---|---|---|
| Uniform $(a, b)$ | $\frac{a + b}{2}$ | $\frac{(b - a)^2}{12}$ |
| Bernoulli $(p)$ | $p$ | $p(1 - p)$ |

- Function of an RV: for monotonic $y = g(x)$, $f_Y(y) = f_X(x)\left|\frac{dx}{dy}\right|$.

## Worked examples

**Example 1.** $f(x) = kx$ on $[0, 2]$: $\int_0^2 kx\,dx = 2k = 1$ ⇒ $k = 0.5$.

**Example 2.** For that PDF, $E[X] = \int_0^2 0.5x^2\,dx = 4/3$ and $E[X^2] = \int_0^2 0.5x^3\,dx = 2$, so $\operatorname{Var} = 2 - 16/9 = 2/9$.

**Example 3.** Uniform on $[0, 6]$: variance $36/12 = 3$.

## Common GATE traps

- Forgetting to normalise the PDF before computing moments.
- Writing $\operatorname{Var}(X + Y) = \operatorname{Var}X + \operatorname{Var}Y$ for dependent variables.

## Summary

- $\int f = 1$; $E[X] = \int xf$; $\operatorname{Var} = E[X^2] - E[X]^2$.
- Expectation is always linear; variances add only for uncorrelated variables.
