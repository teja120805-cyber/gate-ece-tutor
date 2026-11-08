# Second-Order RLC Circuits

> Classifying the response (over-, critically or under-damped) and finding $\alpha$, $\omega_0$ and $\omega_d$ are standard questions. The same mathematics drives second-order control systems.

## Intuition

An inductor and a capacitor trade energy back and forth like a spring and a mass, so the circuit wants to oscillate at $\omega_0 = 1/\sqrt{LC}$. The resistor is friction: it drains energy. Too much friction gives a slow, non-oscillating return (**overdamped**); too little gives ringing (**underdamped**).

## Characteristic equation

$$
s^2 + 2\alpha s + \omega_0^2 = 0, \qquad \omega_0 = \frac{1}{\sqrt{LC}}
$$

| Circuit | $\alpha$ (neper frequency) |
|---|---|
| series RLC | $\dfrac{R}{2L}$ |
| parallel RLC | $\dfrac{1}{2RC}$ |

Damping ratio $\zeta = \alpha/\omega_0$; roots $s = -\alpha \pm\sqrt{\alpha^2 - \omega_0^2}$.

| Condition | Response | Form |
|---|---|---|
| $\alpha > \omega_0$ ($\zeta > 1$) | overdamped | $A_1e^{s_1t} + A_2e^{s_2t}$ |
| $\alpha = \omega_0$ ($\zeta = 1$) | critically damped | $(A_1 + A_2t)e^{-\alpha t}$ |
| $\alpha < \omega_0$ ($\zeta < 1$) | underdamped | $e^{-\alpha t}(B_1\cos\omega_dt + B_2\sin\omega_dt)$, $\omega_d = \sqrt{\omega_0^2 - \alpha^2}$ |

**Critical resistance:** series $R_c = 2\sqrt{L/C}$; parallel $R_c = \frac12\sqrt{L/C}$. A larger series R means more damping; a larger parallel R means **less** damping.

## Procedure

1. Find the initial conditions $x(0^+)$ and $x'(0^+)$ from $v_C(0)$ and $i_L(0)$, using $C\,dv_C/dt = i_C$ and $L\,di_L/dt = v_L$.
2. Find the final value $x(\infty)$.
3. Write the form for the damping case and fit the constants.

## Worked examples

**Example 1.** Series $R = 4\,\Omega$, $L = 1$ H, $C = 1$ F: $\alpha = 2$, $\omega_0 = 1$ ⇒ $\zeta = 2$, overdamped.

**Example 2.** $L = 1$ H, $C = 0.25$ F ⇒ $\omega_0 = 2$ rad/s.

**Example 3.** Series $R = L = C = 1$: $s^2 + s + 1$, $\zeta = 0.5$, underdamped.

**Example 4.** Parallel $R = 1\,\Omega$, $L = 1$ H, $C = 1$ F: $\alpha = 0.5$, $\omega_d = \sqrt{1 - 0.25} = 0.866$ rad/s.

## Common GATE traps

- Using the series $\alpha$ formula for a parallel circuit.
- Forgetting that the initial **derivative** comes from the capacitor current or inductor voltage.

## Summary

- $\omega_0 = 1/\sqrt{LC}$; $\alpha = R/2L$ (series) or $1/2RC$ (parallel); $\zeta = \alpha/\omega_0$.
- $\zeta > 1$ overdamped, $= 1$ critical, $< 1$ underdamped with $\omega_d = \sqrt{\omega_0^2 - \alpha^2}$.
