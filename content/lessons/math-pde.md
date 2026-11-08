# Partial Differential Equations and Separation of Variables

> GATE asks you to classify second-order PDEs and to solve the heat or wave equation by separation of variables.

## Intuition

PDEs describe fields that vary in space and time — temperature in a rod, a vibrating string, potential in a region. **Separation of variables** guesses that the solution is a product of one-variable functions, which splits the PDE into ODEs.

## Classification

For $Au_{xx} + Bu_{xy} + Cu_{yy} + (\text{lower-order terms}) = 0$:

| $B^2 - 4AC$ | Type | Example |
|---|---|---|
| $< 0$ | elliptic | Laplace $u_{xx} + u_{yy} = 0$ |
| $= 0$ | parabolic | heat $u_t = c^2u_{xx}$ |
| $> 0$ | hyperbolic | wave $u_{tt} = c^2u_{xx}$ |

## Separation of variables (heat equation)

$u_t = c^2u_{xx}$ on $0 < x < L$ with $u(0, t) = u(L, t) = 0$.

1. Let $u = X(x)T(t)$: $\dfrac{T'}{c^2T} = \dfrac{X''}{X} = -\lambda$ (a separation constant).
2. $X'' + \lambda X = 0$ with $X(0) = X(L) = 0$ ⇒ $\lambda_n = (n\pi/L)^2$, $X_n = \sin(n\pi x/L)$.
3. $T_n = e^{-c^2\lambda_n t}$.
4. $u = \sum b_n\sin(n\pi x/L)\,e^{-c^2(n\pi/L)^2t}$, with the $b_n$ taken from the Fourier sine series of $u(x, 0)$.

**Wave equation** with fixed ends: $u = \sum\sin(n\pi x/L)\left[A_n\cos\frac{n\pi ct}{L} + B_n\sin\frac{n\pi ct}{L}\right]$. D'Alembert's general solution is $u = F(x - ct) + G(x + ct)$.

## Worked examples

**Example 1.** $u_{xx} + 4u_{xy} + 4u_{yy} = 0$: $16 - 16 = 0$ ⇒ parabolic.

**Example 2.** $u_{xx} - u_{yy} = 0$: $0 + 4 > 0$ ⇒ hyperbolic.

**Example 3.** $u_t = u_{xx}$ on $(0, \pi)$, zero ends, $u(x, 0) = \sin x$: only $n = 1$ appears, so $u = e^{-t}\sin x$ and $u(\pi/2, 1) = e^{-1} \approx 0.368$.

## Common GATE traps

- Using $B^2 - AC$ instead of $B^2 - 4AC$ (some texts write $2B$ for the $u_{xy}$ coefficient — read the form carefully).
- Choosing a positive separation constant that yields only the trivial solution under the boundary conditions.

## Summary

- $B^2 - 4AC$: $<0$ elliptic, $=0$ parabolic, $>0$ hyperbolic.
- Separate, solve the eigenvalue problem from the boundary conditions, then superpose the modes.
