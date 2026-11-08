# Interconnection of Two-Port Networks

> Know which parameter set adds or multiplies for each type of connection.

## Intuition

Choose the parameter set whose **shared** variables line up with the connection:
- in a series connection the currents are common and the voltages add, so Z adds;
- in a parallel connection the voltages are common and the currents add, so Y adds;
- in a cascade, the output of one network is the input of the next, so ABCD matrices multiply.

## Rules

| Connection (input / output) | Parameters that combine | Operation |
|---|---|---|
| series / series | Z | $[Z] = [Z_a] + [Z_b]$ |
| parallel / parallel | Y | $[Y] = [Y_a] + [Y_b]$ |
| series / parallel | h | $[h] = [h_a] + [h_b]$ |
| parallel / series | g | $[g] = [g_a] + [g_b]$ |
| cascade | ABCD | $[T] = [T_a][T_b]$ (in order) |

The addition rules hold only if each sub-network still satisfies the port condition (equal and opposite currents at each port) after connection — the **Brune test**. Cascades always work.

## Worked examples

**Example 1.** Two identical networks, each with $A = 2$, $B = 1$, $C = 1$, $D = 1$, in cascade:
$\begin{bmatrix}2&1\\1&1\end{bmatrix}^2 = \begin{bmatrix}5&3\\3&2\end{bmatrix}$ ⇒ $A = 5$.

**Example 2.** A series $Z = 2$ followed by a shunt $Y = 0.5$:
$\begin{bmatrix}1&2\\0&1\end{bmatrix}\begin{bmatrix}1&0\\0.5&1\end{bmatrix} = \begin{bmatrix}2&2\\0.5&1\end{bmatrix}$ ⇒ $A = 2$, $B = 2\,\Omega$, $C = 0.5$ S, $D = 1$. Check: $AD - BC = 2 - 1 = 1$ (reciprocal).

**Example 3.** Two networks in parallel, each with $y_{11} = 1$ S: the combined $y_{11} = 2$ S.

## Common GATE traps

- Multiplying ABCD matrices in the wrong order (matrix multiplication is not commutative).
- Adding Z parameters for a parallel connection.

## Summary

- Series → Z adds; parallel → Y adds; series–parallel → h adds; cascade → ABCD multiplies.
