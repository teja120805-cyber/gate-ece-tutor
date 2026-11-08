# Phase Velocity and Group Velocity

> The definitions, the waveguide relation $v_pv_g = c^2$, and dispersion are short, frequent questions.

## Intuition

The **phase velocity** is how fast the crests of a single-frequency wave move. The **group velocity** is how fast the envelope of a wave packet — and normally the energy and information — moves. In a **dispersive** medium the two differ.

## Definitions

$$
v_p = \frac{\omega}{\beta}, \qquad v_g = \frac{d\omega}{d\beta}.
$$

## Key results

- **Non-dispersive** medium (β proportional to ω): $v_p = v_g = 1/\sqrt{\mu\varepsilon}$.
- **Hollow waveguide:** $\beta = \dfrac{\omega}{c}\sqrt{1 - (f_c/f)^2}$, so
$$
v_p = \frac{c}{\sqrt{1 - (f_c/f)^2}} > c, \qquad v_g = c\sqrt{1 - (f_c/f)^2} < c, \qquad v_pv_g = c^2 .
$$
  A phase velocity above $c$ carries no information, so relativity is not violated.
- **Dispersion** (frequency-dependent velocity) spreads pulses — important in fibres and waveguides.
- Group delay over a length $L$: $\tau_g = L/v_g$.

## Worked examples

**Example 1.** $\omega = 2\pi\times10^9$ rad/s, $\beta = 20$ rad/m: $v_p = \frac{6.283\times10^9}{20} = 3.14\times10^8$ m/s (a dispersive guide, since $v_p > c$).

**Example 2.** In a waveguide with $v_p = 4\times10^8$ m/s: $v_g = \frac{9\times10^{16}}{4\times10^8} = 2.25\times10^8$ m/s.

**Example 3.** At $f = 2f_c$: $v_g = c\sqrt{0.75} = 0.866c$.

## Common GATE traps

- Saying that energy travels at the phase velocity.
- Thinking the group velocity in a hollow waveguide can exceed $c$.

## Summary

- $v_p = \omega/\beta$, $v_g = d\omega/d\beta$; they are equal in non-dispersive media.
- Waveguide: $v_p > c > v_g$ with $v_pv_g = c^2$.
