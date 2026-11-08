# Reflection Coefficient, VSWR and Impedance Transformation

> Transmission-line questions on $\Gamma$, VSWR, $\lambda/4$ and $\lambda/2$ sections, and input impedance appear every year in Electromagnetics.

## Intuition

A wave travelling down a line "expects" to see the line's characteristic impedance $Z_0$. If the load differs, part of the wave reflects. The incident and reflected waves interfere to form a **standing-wave pattern** of voltage maxima and minima. Because the reflected wave's phase changes with distance, the impedance seen looking into the line **changes along the line** — the line acts as an impedance transformer.

## Formal definitions

Load reflection coefficient:
$$
\Gamma_L = \frac{Z_L - Z_0}{Z_L + Z_0}, \qquad |\Gamma_L| \le 1 \ \text{for passive loads}.
$$

At distance $\ell$ from the load (lossless line): $\Gamma(\ell) = \Gamma_L e^{-j2\beta\ell}$, with $\beta = 2\pi/\lambda$.

Voltage standing-wave ratio:
$$
\text{VSWR} = S = \frac{V_{max}}{V_{min}} = \frac{1 + |\Gamma|}{1 - |\Gamma|}, \qquad |\Gamma| = \frac{S - 1}{S + 1}.
$$

Input impedance of a lossless line of length $\ell$:
$$
Z_{in} = Z_0\,\frac{Z_L + jZ_0\tan\beta\ell}{Z_0 + jZ_L\tan\beta\ell}.
$$

## Key results

| Case | Result |
|---|---|
| Matched, $Z_L = Z_0$ | $\Gamma = 0$, VSWR = 1, $Z_{in} = Z_0$ everywhere |
| Short, $Z_L = 0$ | $\Gamma = -1$, $Z_{in} = jZ_0\tan\beta\ell$ (pure reactance) |
| Open, $Z_L = \infty$ | $\Gamma = +1$, $Z_{in} = -jZ_0\cot\beta\ell$ |
| $\ell = \lambda/4$ | $Z_{in} = Z_0^2/Z_L$ (impedance inverter) |
| $\ell = \lambda/2$ | $Z_{in} = Z_L$ (repeats the load) |
| Resistive $Z_L = R_L$ | VSWR $= R_L/Z_0$ if $R_L > Z_0$; $Z_0/R_L$ if $R_L < Z_0$ |

**Power:** reflected/incident $= |\Gamma|^2$; delivered fraction $= 1 - |\Gamma|^2$. Return loss $= -20\log_{10}|\Gamma|$ dB.

**Standing-wave positions:** voltage maxima and minima are $\lambda/4$ apart; adjacent maxima are $\lambda/2$ apart. For $R_L > Z_0$ there is a voltage maximum at the load; for $R_L < Z_0$ a minimum.

**Quarter-wave transformer:** to match $R_L$ to $Z_0$, use a $\lambda/4$ section with $Z_1 = \sqrt{Z_0 R_L}$ (exact only at the design frequency).

## Visual picture

| Distance from load | $Z_{in}$ for a short-circuited line |
|---|---|
| 0 | 0 (short) |
| $< \lambda/4$ | inductive ($+jX$) |
| $\lambda/4$ | open circuit |
| $\lambda/4$ to $\lambda/2$ | capacitive ($-jX$) |
| $\lambda/2$ | short again |

## Worked examples

**Example 1.** $Z_0 = 50\,\Omega$, $Z_L = 150\,\Omega$: $\Gamma = 0.5$, VSWR = 3, delivered power 75%.

**Example 2.** $\lambda/4$ of $50\,\Omega$ line terminated in $100\,\Omega$: $Z_{in} = 2500/100 = 25\,\Omega$.

**Example 3.** Matching $100\,\Omega$ to a $50\,\Omega$ line with a quarter-wave section: $Z_1 = \sqrt{5000} = 70.7\,\Omega$.

**Example 4.** $Z_L = 25 + j25\,\Omega$ on $50\,\Omega$: $\Gamma = \dfrac{-25 + j25}{75 + j25}$, $|\Gamma| = \dfrac{35.36}{79.06} = 0.447$, VSWR $= 1.447/0.553 \approx 2.62$.

## Common GATE traps

- **Sign of $\Gamma$** — loads smaller than $Z_0$ give negative (or obtuse-angled) $\Gamma$.
- **Using $\lambda$ in free space** when the line has a dielectric — use $\lambda = v_p/f$ on the line.
- **VSWR from complex $\Gamma$** — use its magnitude.
- **Quarter-wave transformer for complex loads** — it only matches real impedances directly.

## Summary

- $\Gamma = (Z_L - Z_0)/(Z_L + Z_0)$; VSWR $= (1 + |\Gamma|)/(1 - |\Gamma|)$.
- $\lambda/4$: $Z_0^2/Z_L$; $\lambda/2$: $Z_L$; short/open lines give pure reactances.
- Delivered power fraction $1 - |\Gamma|^2$.
