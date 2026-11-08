# Rectangular Waveguides

> Cut-off frequency, the dominant mode, guide wavelength and the propagating modes are asked almost every year.

## Intuition

A hollow metal pipe guides waves by bouncing them between its walls. A mode can propagate only if the guide is wide enough to fit a half-wavelength pattern across it. Below a **cut-off frequency** the mode dies out exponentially (it is **evanescent**). A hollow guide cannot carry TEM waves, because it has only one conductor.

## Key results (inner dimensions $a > b$, filled with $\mu, \varepsilon$)

$$
f_{c,mn} = \frac{v}{2}\sqrt{\left(\frac{m}{a}\right)^2 + \left(\frac{n}{b}\right)^2}, \qquad v = \frac{1}{\sqrt{\mu\varepsilon}}.
$$

- **TE$_{mn}$:** $m, n = 0, 1, 2, \ldots$ but not both 0. **TM$_{mn}$:** $m, n \ge 1$, so TM$_{11}$ is the lowest TM mode.
- **Dominant mode TE$_{10}$:** $f_c = \dfrac{v}{2a}$, $\lambda_c = 2a$.
- **Propagation** for $f > f_c$:
$$
\beta = \beta_0\sqrt{1 - (f_c/f)^2}, \qquad \lambda_g = \frac{\lambda}{\sqrt{1 - (f_c/f)^2}} > \lambda, \qquad v_p = \frac{v}{\sqrt{1 - (f_c/f)^2}}, \qquad v_g = v\sqrt{1 - (f_c/f)^2}.
$$
- Wave impedance: $Z_{TE} = \dfrac{\eta}{\sqrt{1 - (f_c/f)^2}}$, $Z_{TM} = \eta\sqrt{1 - (f_c/f)^2}$.
- **Single-mode band:** between $f_{c,10}$ and the next cut-off (TE$_{20}$ at $v/a$ or TE$_{01}$ at $v/2b$). With $a = 2b$ these coincide, giving an octave of bandwidth.

## Worked examples

**Example 1.** WR-90 ($a = 2.286$ cm): $f_{c,10} = \frac{3\times10^{10}}{2\times2.286} = 6.56$ GHz.

**Example 2.** $a = 3$ cm, $f = 10$ GHz: $f_c = 5$ GHz, $\lambda = 3$ cm, $\lambda_g = 3/\sqrt{0.75} = 3.46$ cm.

**Example 3.** TE$_{20}$ with $a = 2$ cm: $f_c = c/a = 15$ GHz.

## Common GATE traps

- Listing TM$_{10}$ or TM$_{01}$ (they do not exist).
- Using free-space $c$ for a dielectric-filled guide.

## Summary

- $f_c = \frac{v}{2}\sqrt{(m/a)^2 + (n/b)^2}$; dominant TE$_{10}$ with $f_c = v/2a$.
- $\lambda_g = \lambda/\sqrt{1 - (f_c/f)^2}$; there is no TEM mode in a hollow guide.
