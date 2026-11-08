# Z, Y, h and ABCD Parameters

> Two-port parameters of T and π networks, conversions, and the reciprocity/symmetry conditions are asked regularly.

## Intuition

A two-port is a black box with an input pair and an output pair. Four variables ($V_1, I_1, V_2, I_2$) are tied by two linear equations. Each parameter set picks two variables as inputs and expresses the other two in terms of them. Each parameter is measured by opening or shorting a port.

## Definitions (currents into the ports)

| Set | Equations | Measurement |
|---|---|---|
| Z (open-circuit impedance) | $V_1 = z_{11}I_1 + z_{12}I_2$, $V_2 = z_{21}I_1 + z_{22}I_2$ | $z_{11} = V_1/I_1$ with $I_2 = 0$ |
| Y (short-circuit admittance) | $I_1 = y_{11}V_1 + y_{12}V_2$, $I_2 = y_{21}V_1 + y_{22}V_2$ | $y_{11} = I_1/V_1$ with $V_2 = 0$ |
| h (hybrid) | $V_1 = h_{11}I_1 + h_{12}V_2$, $I_2 = h_{21}I_1 + h_{22}V_2$ | $h_{11}$: input impedance (output shorted); $h_{21}$: current gain; $h_{12}$: reverse voltage gain; $h_{22}$: output admittance (input open) |
| ABCD (transmission) | $V_1 = AV_2 - BI_2$, $I_1 = CV_2 - DI_2$ | $A = V_1/V_2$ with $I_2 = 0$ |

## Key results

- $[Y] = [Z]^{-1}$.
- **Reciprocal:** $z_{12} = z_{21}$, $y_{12} = y_{21}$, $h_{12} = -h_{21}$, $AD - BC = 1$.
- **Symmetric:** $z_{11} = z_{22}$, $y_{11} = y_{22}$, $\Delta h = 1$, $A = D$.
- **T network** (series arms $Z_1$, $Z_2$, shunt $Z_3$): $z_{11} = Z_1 + Z_3$, $z_{22} = Z_2 + Z_3$, $z_{12} = z_{21} = Z_3$.
- **π network** (shunt $Y_a$, $Y_b$, series $Y_c$): $y_{11} = Y_a + Y_c$, $y_{22} = Y_b + Y_c$, $y_{12} = y_{21} = -Y_c$.
- A series impedance $Z$ alone has Y parameters $\frac1Z\begin{bmatrix}1&-1\\-1&1\end{bmatrix}$; its Z parameters do not exist.
- ABCD of a series $Z$: $\begin{bmatrix}1&Z\\0&1\end{bmatrix}$; of a shunt $Y$: $\begin{bmatrix}1&0\\Y&1\end{bmatrix}$.

## Worked examples

**Example 1.** T network with $Z_1 = 2$, $Z_2 = 3$, $Z_3 = 4\,\Omega$: $z_{11} = 6$, $z_{22} = 7$, $z_{12} = z_{21} = 4$.

**Example 2.** A series $2\,\Omega$ between the ports: $y_{11} = y_{22} = 0.5$ S, $y_{12} = y_{21} = -0.5$ S.

**Example 3.** $[Z] = \begin{bmatrix}6&4\\4&7\end{bmatrix}$: $\Delta Z = 26$, so $y_{11} = 7/26$ and $y_{12} = -4/26$.

## Common GATE traps

- Sign conventions: $I_2$ flows **into** port 2; ABCD uses $-I_2$.
- Units: $h_{11}$ is in Ω, $h_{22}$ in S, and $h_{12}$, $h_{21}$ are dimensionless.

## Summary

- Measure each parameter with the specified port opened or shorted.
- Reciprocity: $z_{12} = z_{21}$; symmetry: $z_{11} = z_{22}$; for a T network, $z_{12} = Z_3$.
