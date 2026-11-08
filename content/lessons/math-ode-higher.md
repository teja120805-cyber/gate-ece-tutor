# Higher-Order Linear ODEs: CF and PI

> Constant-coefficient linear ODEs model RLC circuits and second-order control systems. They are asked almost every year.

## Intuition

The full solution is **natural response + forced response**. The **complementary function (CF)** solves the equation with zero input — how the system behaves on its own. The **particular integral (PI)** is one solution that follows the input. Initial conditions are applied to the **sum**.

## The complementary function

For $a y'' + b y' + c y = 0$, try $y = e^{mx}$, which gives the auxiliary equation $am^2 + bm + c = 0$:

| Roots | CF |
|---|---|
| real, distinct $m_1, m_2$ | $C_1e^{m_1x} + C_2e^{m_2x}$ |
| real, repeated $m$ | $(C_1 + C_2x)e^{mx}$ |
| complex $\alpha \pm j\beta$ | $e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$ |

## The particular integral (undetermined coefficients)

| Right-hand side | Trial PI |
|---|---|
| constant $k$ | constant $A$ |
| polynomial of degree $n$ | polynomial of degree $n$ |
| $e^{ax}$ | $Ae^{ax}$ |
| $\sin bx$, $\cos bx$ | $A\cos bx + B\sin bx$ |

**Resonance rule:** if the trial form already appears in the CF, multiply it by $x$ (or by $x^2$ for a double root).
Operator shortcut: $y_p = \dfrac{e^{ax}}{F(a)}$ when $F(a) \ne 0$, where $F(D)$ is the differential operator.

## Worked examples

**Example 1.** $y'' - 5y' + 6y = 0$: $m = 2, 3$ ⇒ $y = C_1e^{2x} + C_2e^{3x}$.

**Example 2.** $y'' + 4y = 0$ ⇒ $y = C_1\cos2x + C_2\sin2x$. And $y'' - 2y' + y = 0$ ⇒ $(C_1 + C_2x)e^x$.

**Example 3.** $y'' + y' - 2y = 4$: a constant PI gives $-2A = 4$ ⇒ $y_p = -2$.

**Example 4.** $y'' + 3y' + 2y = 0$ with $y(0) = 1$, $y'(0) = 0$: $y = Ae^{-x} + Be^{-2x}$, $A + B = 1$, $-A - 2B = 0$ ⇒ $A = 2$, $B = -1$, so $y(1) = 2e^{-1} - e^{-2} \approx 0.600$.

**Example 5 (resonance).** $y'' + y = \sin x$: $\sin x$ is in the CF, so try $x(A\cos x + B\sin x)$, which gives $y_p = -\frac{x}{2}\cos x$.

## Common GATE traps

- Applying the initial conditions to the CF alone instead of to CF + PI.
- Missing the resonance case.
- Getting the sign of the real part wrong for complex roots.

## Summary

- Auxiliary equation ⇒ CF (distinct / repeated / complex roots).
- PI by trial form; multiply by $x$ on resonance.
- Total solution = CF + PI, then apply the initial conditions.
