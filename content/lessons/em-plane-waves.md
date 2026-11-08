# Uniform Plane Waves and Propagation in Media

> Propagation constant, intrinsic impedance, wavelength in media and loss tangent appear regularly.

## Intuition

Far from its source, a wave looks locally like a **plane wave**: E and H are uniform over planes perpendicular to the direction of travel, perpendicular to each other and to the direction of travel, and in a fixed ratio $\eta$. The medium sets the speed, the impedance and the losses.

## Key results

**General medium:**
$$
\gamma = \alpha + j\beta = \sqrt{j\omega\mu(\sigma + j\omega\varepsilon)}, \qquad \eta = \sqrt{\frac{j\omega\mu}{\sigma + j\omega\varepsilon}}.
$$
Fields vary as $e^{-\alpha z}\cos(\omega t - \beta z)$.

| Medium | Condition | Results |
|---|---|---|
| lossless | $\sigma = 0$ | $\alpha = 0$, $\beta = \omega\sqrt{\mu\varepsilon}$, $\eta = \sqrt{\mu/\varepsilon}$ (real) |
| free space | — | $\eta_0 = 120\pi \approx 377\,\Omega$, $v = c$ |
| low-loss dielectric | $\sigma/\omega\varepsilon \ll 1$ | $\alpha \approx \dfrac{\sigma}{2}\sqrt{\dfrac{\mu}{\varepsilon}}$, $\beta \approx \omega\sqrt{\mu\varepsilon}$ |
| good conductor | $\sigma/\omega\varepsilon \gg 1$ | $\alpha = \beta = \sqrt{\pi f\mu\sigma}$, $\eta = (1 + j)\sqrt{\dfrac{\pi f\mu}{\sigma}}$ (45° phase) |

- In a dielectric: $\lambda = \dfrac{\lambda_0}{\sqrt{\varepsilon_r}}$ and $\eta = \dfrac{\eta_0}{\sqrt{\varepsilon_r}}$ (for $\mu_r = 1$).
- Loss tangent $\tan\delta = \dfrac{\sigma}{\omega\varepsilon}$.
- Attenuation in dB $= 8.686\,\alpha z$ (1 neper = 8.686 dB).

## Worked examples

**Example 1.** $\varepsilon_r = 4$: $\eta = 377/2 = 188.5\,\Omega$.

**Example 2.** 3 GHz in $\varepsilon_r = 9$: $\lambda = 10\text{ cm}/3 = 3.33$ cm.

**Example 3.** $\sigma = 10^{-3}$ S/m, $\varepsilon_r = 4$, $f = 1$ MHz: $\tan\delta = \frac{10^{-3}}{2\pi\times10^6\times4\times8.854\times10^{-12}} = 4.49$ — the material behaves more like a conductor at this frequency.

## Common GATE traps

- Using $\lambda_0$ inside a dielectric.
- Assuming $\eta$ is real in a lossy medium.

## Summary

- Lossless: $\beta = \omega\sqrt{\mu\varepsilon}$, $\eta = \sqrt{\mu/\varepsilon}$; dielectric: $\eta_0/\sqrt{\varepsilon_r}$, $\lambda_0/\sqrt{\varepsilon_r}$.
- Good conductor: $\alpha = \beta = \sqrt{\pi f\mu\sigma}$, $\eta$ at 45°.
