# Solution of State Equations

> The state transition matrix, its properties, and computing $e^{At}$ by Laplace or by diagonalisation.

## Intuition

For a scalar system $\dot x = ax$ the solution is $x(t) = e^{at}x(0)$. In matrix form the same idea holds: the **state transition matrix** $\Phi(t) = e^{At}$ carries the initial state forward in time. A forced input adds a convolution term.

## Key results

$$
\mathbf x(t) = \Phi(t)\mathbf x(0) + \int_0^t\Phi(t - \tau)B\mathbf u(\tau)\,d\tau, \qquad \Phi(t) = e^{At} = \mathcal L^{-1}\{(sI - A)^{-1}\}.
$$

**Properties of $\Phi$:**
- $\Phi(0) = I$;
- $\Phi^{-1}(t) = \Phi(-t)$;
- $\Phi(t_1 + t_2) = \Phi(t_1)\Phi(t_2)$;
- $\dot\Phi = A\Phi$.

**Computing $e^{At}$:**
- **Diagonal** $A = \operatorname{diag}(\lambda_i)$: $e^{At} = \operatorname{diag}(e^{\lambda_it})$.
- **Diagonalisable** $A = PDP^{-1}$: $e^{At} = Pe^{Dt}P^{-1}$.
- **Laplace:** inverse transform of $(sI - A)^{-1}$ entry by entry.
- **Cayley–Hamilton:** $e^{At} = \alpha_0(t)I + \alpha_1(t)A$ (for $2\times2$), with the $\alpha$'s fitted from $e^{\lambda_it}$.
- Nilpotent case, e.g. $A = \begin{bmatrix}0 & 1\\0 & 0\end{bmatrix}$: $e^{At} = I + At = \begin{bmatrix}1 & t\\0 & 1\end{bmatrix}$.

## Worked examples

**Example 1.** $A = \operatorname{diag}(-1, -2)$: $\Phi(t) = \operatorname{diag}(e^{-t}, e^{-2t})$, so $\Phi_{22}(1) = e^{-2} = 0.135$.

**Example 2.** $\dot x = -2x$, $x(0) = 3$: $x(1) = 3e^{-2} = 0.406$.

**Example 3.** $A = \begin{bmatrix}0 & 1\\ -2 & -3\end{bmatrix}$: $(sI - A)^{-1} = \frac{1}{(s + 1)(s + 2)}\begin{bmatrix}s + 3 & 1\\ -2 & s\end{bmatrix}$, so $\Phi_{12}(t) = e^{-t} - e^{-2t}$.

## Common GATE traps

- Writing $e^{At}$ entrywise as $e^{a_{ij}t}$ — that is wrong unless $A$ is diagonal.
- Thinking $e^{At} = I + A$ in general (true only in special nilpotent cases, as $I + At$).

## Summary

- $\Phi(t) = e^{At} = \mathcal L^{-1}\{(sI - A)^{-1}\}$, with $\Phi(0) = I$ and $\Phi^{-1}(t) = \Phi(-t)$.
- Diagonal $A$ ⇒ $e^{\lambda_it}$ on the diagonal.
