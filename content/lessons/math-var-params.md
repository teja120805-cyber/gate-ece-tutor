# Variation of Parameters

> Use this method when the forcing term is not of a "nice" form (such as $\sec x$ or $\tan x$). GATE asks for the Wronskian or the parameter functions.

## Intuition

The complementary function $C_1y_1 + C_2y_2$ solves the homogeneous equation. To fit a forcing term, let the constants **vary**: $y_p = u_1(x)y_1 + u_2(x)y_2$. Two convenient conditions make $u_1'$ and $u_2'$ easy to solve for.

## Formal method

For $y'' + P(x)y' + Q(x)y = f(x)$ (leading coefficient 1) with CF solutions $y_1, y_2$:

$$
W = \begin{vmatrix}y_1 & y_2\\ y_1' & y_2'\end{vmatrix} = y_1y_2' - y_1'y_2,
\qquad u_1' = -\frac{y_2 f}{W},\quad u_2' = \frac{y_1 f}{W}.
$$

Then $y_p = u_1y_1 + u_2y_2$ and $y = C_1y_1 + C_2y_2 + y_p$.

## Key results

- $W \ne 0$ ⇔ $y_1, y_2$ are independent solutions.
- Abel's formula: $W = Ce^{-\int P\,dx}$, so $W$ is either never zero or identically zero.
- Standard Wronskians: $W(\cos bx, \sin bx) = b$; $W(e^{ax}, e^{bx}) = (b - a)e^{(a+b)x}$; $W(e^{ax}, xe^{ax}) = e^{2ax}$.
- The method works for **any** continuous $f$, unlike undetermined coefficients.

## Worked examples

**Example 1.** $W(e^x, e^{2x}) = e^x\cdot2e^{2x} - e^x\cdot e^{2x} = e^{3x}$, which is 1 at $x = 0$.

**Example 2.** $y'' + y = \sec x$: $y_1 = \cos x$, $y_2 = \sin x$, $W = 1$.
$u_1' = -\sin x\sec x = -\tan x$ ⇒ $u_1 = \ln|\cos x|$.
$u_2' = \cos x\sec x = 1$ ⇒ $u_2 = x$.
So $y_p = \cos x\ln|\cos x| + x\sin x$.

**Example 3.** $W(x, x^2) = x\cdot2x - 1\cdot x^2 = x^2$, which is 1 at $x = 1$.

## Common GATE traps

- Forgetting to divide the equation by the leading coefficient before identifying $f(x)$.
- Swapping the signs of $u_1'$ and $u_2'$.

## Summary

- $W = y_1y_2' - y_1'y_2$; $u_1' = -y_2f/W$, $u_2' = y_1f/W$.
- Works for any continuous forcing term.
