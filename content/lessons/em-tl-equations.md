# Transmission Line Equations and Characteristic Impedance

> $Z_0$, propagation constant, phase velocity and the distortionless condition are standard questions.

## Intuition

A transmission line is a long chain of tiny series inductances and resistances with tiny shunt capacitances and conductances (per unit length: $R$, $L$, $G$, $C$). Voltage and current travel along it as waves. Their ratio for a single travelling wave is the **characteristic impedance** $Z_0$.

## Telegrapher's equations (phasor form)

$$
\frac{dV}{dz} = -(R + j\omega L)I, \qquad \frac{dI}{dz} = -(G + j\omega C)V
$$
$$
\Rightarrow \frac{d^2V}{dz^2} = \gamma^2V, \qquad \gamma = \alpha + j\beta = \sqrt{(R + j\omega L)(G + j\omega C)}, \qquad Z_0 = \sqrt{\frac{R + j\omega L}{G + j\omega C}}.
$$

Solution: $V(z) = V^+e^{-\gamma z} + V^-e^{\gamma z}$.

## Key results

| Line type | Results |
|---|---|
| lossless ($R = G = 0$) | $Z_0 = \sqrt{L/C}$, $\beta = \omega\sqrt{LC}$, $v_p = 1/\sqrt{LC}$, $\alpha = 0$ |
| low-loss | $\alpha \approx \dfrac{R}{2Z_0} + \dfrac{GZ_0}{2}$ |
| distortionless ($R/L = G/C$) | $\alpha = \sqrt{RG}$ (frequency-independent), $v_p = 1/\sqrt{LC}$, $Z_0 = \sqrt{L/C}$ (real) — no dispersion |

- $\lambda = v_p/f$. In a dielectric-filled line, $v_p = c/\sqrt{\varepsilon_r}$.
- Coaxial line: $Z_0 = \dfrac{60}{\sqrt{\varepsilon_r}}\ln\dfrac{b}{a}$ Ω.

## Worked examples

**Example 1.** $L = 250$ nH/m and $C = 100$ pF/m: $Z_0 = \sqrt{2500} = 50\,\Omega$ and $v_p = 1/\sqrt{2.5\times10^{-17}} = 2\times10^8$ m/s.

**Example 2.** With $v_p = 2\times10^8$ m/s at 100 MHz: $\lambda = 2$ m.

**Example 3.** Air coax with $b/a = e$: $Z_0 = 60\,\Omega$.

## Common GATE traps

- Confusing $Z_0$ with the input impedance (they are equal only for a matched line).
- Using $\sqrt{LC}$ for $Z_0$ — the correct expression is $\sqrt{L/C}$.

## Summary

- $Z_0 = \sqrt{(R + j\omega L)/(G + j\omega C)}$; lossless: $\sqrt{L/C}$, $v_p = 1/\sqrt{LC}$.
- Distortionless: $R/L = G/C$.
