# Circular Waveguides

> Cut-off frequencies using Bessel-function roots, the dominant TE₁₁ mode, and the special low-loss TE₀₁ mode.

## Intuition

A circular pipe guides waves like a rectangular one, but the field patterns follow Bessel functions in the radial direction. Each mode's cut-off is set by a root of a Bessel function (or of its derivative) divided by the radius.

## Key results (radius $a$)

$$
f_{c} = \frac{v\,\chi}{2\pi a},
$$
where $\chi$ is the relevant root:
- **TE$_{nm}$:** $\chi = p'_{nm}$, the $m$-th root of $J_n'$;
- **TM$_{nm}$:** $\chi = p_{nm}$, the $m$-th root of $J_n$.

| Mode | $\chi$ | Notes |
|---|---|---|
| TE$_{11}$ | 1.841 | **dominant** (lowest cut-off) |
| TM$_{01}$ | 2.405 | next mode up |
| TE$_{21}$ | 3.054 | — |
| TE$_{01}$ | 3.832 | wall losses **decrease** with frequency — used for low-loss long runs |
| TM$_{11}$ | 3.832 | degenerate with TE$_{01}$ |

- Single-mode (TE$_{11}$) operation: $\dfrac{1.841v}{2\pi a} < f < \dfrac{2.405v}{2\pi a}$.
- A larger radius gives a lower cut-off frequency.
- The guide wavelength, $v_p$ and $v_g$ follow the same formulas as for rectangular guides.
- Circular guides are used in rotary joints and in feeds for circular polarisation (TE$_{11}$ supports two orthogonal polarisations).

## Worked examples

**Example 1.** $a = 1$ cm, air-filled: $f_{c,TE11} = \frac{1.841\times3\times10^{10}}{2\pi\times1} = 8.79$ GHz.

**Example 2.** The same guide: $f_{c,TM01} = \frac{2.405}{1.841}\times8.79 = 11.48$ GHz, so single-mode operation spans 8.79–11.48 GHz.

## Common GATE traps

- Using the rectangular formula $v/2a$ for a circular guide.
- Calling TM$_{01}$ or TE$_{01}$ the dominant mode — it is TE$_{11}$.

## Summary

- $f_c = \chi v/(2\pi a)$; TE$_{11}$ ($\chi = 1.841$) is dominant, then TM$_{01}$ (2.405).
- TE$_{01}$ has attenuation that decreases with frequency.
