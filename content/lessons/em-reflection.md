# Reflection and Refraction

> Reflection and transmission coefficients at normal incidence, Snell's law, the Brewster angle and total internal reflection are asked every year.

## Intuition

When a wave meets a boundary between media with different impedances, part of it reflects and part transmits — just as on a mismatched transmission line. At oblique incidence the transmitted wave bends (refraction). For one polarisation there is an angle with no reflection at all (Brewster), and going from a denser to a rarer medium beyond a critical angle, everything reflects (total internal reflection).

## Normal incidence

$$
\Gamma = \frac{\eta_2 - \eta_1}{\eta_2 + \eta_1}, \qquad \tau = 1 + \Gamma = \frac{2\eta_2}{\eta_2 + \eta_1}.
$$

- Reflected power fraction $|\Gamma|^2$; transmitted power fraction $1 - |\Gamma|^2$.
- For non-magnetic dielectrics, $\eta \propto 1/n$, so $\Gamma = \dfrac{n_1 - n_2}{n_1 + n_2}$.
- A perfect conductor gives $\Gamma = -1$: a standing wave with E nulls at $\lambda/2$ spacing from the wall.
- Standing-wave ratio $S = \dfrac{1 + |\Gamma|}{1 - |\Gamma|}$.

## Oblique incidence

- **Snell's law:** $n_1\sin\theta_1 = n_2\sin\theta_2$; the reflection angle equals the incidence angle.
- **Brewster angle** (parallel/TM polarisation only, non-magnetic media): $\tan\theta_B = n_2/n_1$, where $\Gamma_\parallel = 0$. Unpolarised light reflected at $\theta_B$ is linearly polarised (perpendicular).
- **Critical angle** ($n_1 > n_2$): $\sin\theta_c = n_2/n_1$. Beyond it, total internal reflection occurs ($|\Gamma| = 1$) with an evanescent field in medium 2.

## Worked examples

**Example 1.** Air → $\varepsilon_r = 4$: $\eta_2 = \eta_0/2$, so $\Gamma = \frac{0.5 - 1}{1.5} = -\frac13$. Transmitted power $= 1 - \frac19 = 0.889$.

**Example 2.** Brewster angle from air into $\varepsilon_r = 3$: $\tan\theta_B = \sqrt3$ ⇒ $60°$.

**Example 3.** Glass ($n = 1.5$) to air: $\theta_c = \sin^{-1}(1/1.5) = 41.8°$.

## Common GATE traps

- Getting the sign of Γ wrong (it is negative when going into a denser dielectric).
- Saying the Brewster angle exists for perpendicular polarisation (it does not, for non-magnetic media).
- Writing Snell's law with cosines.

## Summary

- $\Gamma = (\eta_2 - \eta_1)/(\eta_2 + \eta_1)$; power reflected $|\Gamma|^2$.
- Snell's law with sines; $\tan\theta_B = n_2/n_1$ (TM only); $\sin\theta_c = n_2/n_1$.
