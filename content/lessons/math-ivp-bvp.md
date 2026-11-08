# Initial and Boundary Value Problems

> After finding a general solution, conditions fix the constants. Boundary value problems can have no solution, exactly one, or infinitely many — a common trick question.

## Intuition

A general solution is a family of curves. An **initial value problem (IVP)** gives the value (and slopes) at a **single** point — like launching a ball with a known position and velocity. A **boundary value problem (BVP)** gives values at **two** points — like a string fixed at both ends.

## Key results

- **IVP:** for a linear ODE with continuous coefficients, an $n$-th order IVP with $n$ conditions at one point has a **unique** solution (existence–uniqueness theorem).
- **BVP:** uniqueness is not guaranteed. Example: $y'' + y = 0$ with $y(0) = 0$, $y(\pi) = 0$ is satisfied by $y = C\sin x$ for every $C$ (infinitely many solutions), while $y(\pi) = 1$ instead has no solution.
- **Eigenvalue problems:** $y'' + \lambda y = 0$, $y(0) = y(L) = 0$ has non-trivial solutions only for $\lambda = (n\pi/L)^2$.

## Procedure

1. Find the general solution (CF + PI).
2. Substitute each condition to obtain equations for the constants.
3. Solve. Check whether that system has a unique solution, none, or infinitely many.

## Worked examples

**Example 1 (IVP).** $y' = 2x$, $y(0) = 3$ ⇒ $y = x^2 + 3$, so $y(2) = 7$.

**Example 2 (BVP).** $y'' = 6x$, $y(0) = 0$, $y(1) = 0$: $y = x^3 + C_1x + C_2$; $C_2 = 0$; $1 + C_1 = 0$ ⇒ $y = x^3 - x$, so $y(0.5) = -0.375$.

**Example 3.** $y'' + 4y = 0$, $y(0) = 1$, $y'(0) = 0$ ⇒ $y = \cos2x$, so $y(\pi/6) = 0.5$.

## Common GATE traps

- Assuming every BVP has a unique solution.
- Applying the conditions before adding the particular integral.

## Summary

- IVP: conditions at one point ⇒ a unique solution (for linear ODEs).
- BVP: conditions at two points ⇒ a unique solution, none, or infinitely many.
