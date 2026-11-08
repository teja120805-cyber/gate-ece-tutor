# State Variable Model

> State-space representation, transfer function from state space, eigenvalues as poles, and controllability/observability tests.

## Intuition

The state is the minimum set of variables (such as capacitor voltages and inductor currents) that, together with future inputs, completely determines future behaviour. State-space form writes an $n$-th order system as $n$ first-order equations in matrix form. It handles multiple inputs and outputs and internal behaviour naturally.

## Formal model

$$
\dot{\mathbf x} = A\mathbf x + B\mathbf u, \qquad \mathbf y = C\mathbf x + D\mathbf u .
$$

$A$ is $n\times n$ (system), $B$ is $n\times m$ (input), $C$ is $p\times n$ (output), $D$ is $p\times m$ (feedthrough).

## Key results

- **Transfer function:** $G(s) = C(sI - A)^{-1}B + D$.
- **Poles = eigenvalues of $A$** (roots of $\det(sI - A) = 0$). The characteristic polynomial has $\operatorname{tr}A$ and $\det A$ in it: for $2\times2$, $s^2 - (\operatorname{tr}A)s + \det A$.
- **Controllable canonical form** for $\dfrac{1}{s^2 + a_1s + a_0}$: $A = \begin{bmatrix}0 & 1\\ -a_0 & -a_1\end{bmatrix}$, $B = \begin{bmatrix}0\\1\end{bmatrix}$, $C = \begin{bmatrix}1 & 0\end{bmatrix}$.
- **Controllability** (Kalman): $\mathcal{C} = [B\ AB\ \cdots\ A^{n-1}B]$ has rank $n$.
- **Observability:** $\mathcal{O} = [C;\ CA;\ \cdots;\ CA^{n-1}]$ has rank $n$.
- The state representation is not unique: a similarity transform $\mathbf x = P\mathbf z$ keeps the eigenvalues and the transfer function unchanged.
- **Pole–zero cancellation** in $G(s)$ indicates uncontrollable or unobservable modes.

## Worked examples

**Example 1.** $A = \begin{bmatrix}0 & 1\\ -2 & -3\end{bmatrix}$: $s^2 + 3s + 2$ ⇒ poles $-1, -2$; the sum of the eigenvalues $= \operatorname{tr}A = -3$.

**Example 2.** With $B = [0; 1]$ and $C = [1\ 0]$: $G = \frac{1}{s^2 + 3s + 2}$, DC gain 0.5.

**Example 3.** $[B\ AB] = \begin{bmatrix}0 & 1\\ 1 & -3\end{bmatrix}$ with $\det = -1 \ne 0$ ⇒ rank 2: controllable.

## Common GATE traps

- Matrix order in $C(sI - A)^{-1}B$.
- Assuming every state-space model is controllable.

## Summary

- $G(s) = C(sI - A)^{-1}B + D$; poles = eigenvalues of $A$.
- Controllable ⇔ rank$[B, AB, \ldots] = n$; observable ⇔ rank$[C; CA; \ldots] = n$.
