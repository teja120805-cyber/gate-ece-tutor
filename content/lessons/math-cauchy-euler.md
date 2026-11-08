# Cauchy's and Euler's Equations

> Equidimensional ODEs are converted to constant coefficients; GATE typically asks for the general solution or a value after applying conditions.

## Intuition

In $x^2y'' + axy' + by = 0$, each derivative is multiplied by a matching power of $x$, so trying a power $y = x^m$ makes every term a multiple of $x^m$. Equivalently, the substitution $x = e^z$ turns it into a constant-coefficient equation in $z$.

## Formal method

**Cauchy–Euler equation:** $x^2y'' + axy' + by = f(x)$.

Try $y = x^m$: $m(m - 1) + am + b = 0$, i.e. $m^2 + (a - 1)m + b = 0$.

| Roots | Solution ($x > 0$) |
|---|---|
| distinct real $m_1, m_2$ | $C_1x^{m_1} + C_2x^{m_2}$ |
| repeated $m$ | $(C_1 + C_2\ln x)\,x^m$ |
| complex $\alpha \pm j\beta$ | $x^\alpha[C_1\cos(\beta\ln x) + C_2\sin(\beta\ln x)]$ |

With $x = e^z$ and $D = d/dz$: $xy' = Dy$, $x^2y'' = D(D - 1)y$.

**Legendre's form** $(ax + b)^2y'' + \cdots$: substitute $ax + b = e^z$.

## Worked examples

**Example 1.** $x^2y'' - 2xy' + 2y = 0$: $m^2 - 3m + 2 = 0$ ⇒ $m = 1, 2$, so $y = C_1x + C_2x^2$.

**Example 2.** $x^2y'' + xy' - 4y = 0$: $m^2 - 4 = 0$ ⇒ $y = C_1x^2 + C_2x^{-2}$. With $y(1) = 2$, $y'(1) = 0$: $C_1 + C_2 = 2$ and $2C_1 - 2C_2 = 0$ ⇒ $C_1 = C_2 = 1$, so $y(2) = 4 + 0.25 = 4.25$.

**Example 3.** $x^2y'' - xy' + y = 0$: $m^2 - 2m + 1 = 0$ ⇒ $m = 1$ (double), so $y = (C_1 + C_2\ln x)x$.

## Common GATE traps

- Writing the indicial equation as $m^2 + am + b$ — the correct form is $m(m-1) + am + b$.
- Using $e^{mx}$ (constant-coefficient habit) instead of $x^m$.

## Summary

- Try $y = x^m$: $m(m - 1) + am + b = 0$.
- Repeated root ⇒ multiply by $\ln x$; complex roots ⇒ $\cos/\sin$ of $\beta\ln x$.
