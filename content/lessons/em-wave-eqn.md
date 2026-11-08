# Wave Equation

> Deriving the wave equation from Maxwell's equations, identifying the direction of propagation, and computing wave speed and phase constant.

## Intuition

Faraday's law says that a changing **B** creates **E**; Ampère–Maxwell says that a changing **E** creates **B**. Each field regenerates the other as it moves, so a self-sustaining disturbance travels through space at speed $1/\sqrt{\mu\varepsilon}$ — the speed of light in vacuum.

## Derivation (source-free, lossless)

Take the curl of Faraday's law and substitute Ampère–Maxwell (with $\mathbf J = 0$), using $\nabla\times\nabla\times\mathbf E = \nabla(\nabla\cdot\mathbf E) - \nabla^2\mathbf E$ and $\nabla\cdot\mathbf E = 0$:
$$
\nabla^2\mathbf E = \mu\varepsilon\frac{\partial^2\mathbf E}{\partial t^2}, \qquad \nabla^2\mathbf H = \mu\varepsilon\frac{\partial^2\mathbf H}{\partial t^2}.
$$

**Phasor (Helmholtz) form:** $\nabla^2\mathbf E + k^2\mathbf E = 0$ with $k = \omega\sqrt{\mu\varepsilon}$. In lossy media, $\gamma = \sqrt{j\omega\mu(\sigma + j\omega\varepsilon)} = \alpha + j\beta$.

## Key results

- Speed $v = \dfrac{1}{\sqrt{\mu\varepsilon}} = \dfrac{c}{\sqrt{\mu_r\varepsilon_r}}$, with $c = 3\times10^8$ m/s.
- A solution $f(t - z/v)$ travels in $+z$; $g(t + z/v)$ travels in $-z$.
- $\cos(\omega t - \beta z)$ travels in $+z$: to keep the phase constant, $z$ must increase with $t$.
- $\beta = \omega/v = 2\pi/\lambda$, $\lambda = v/f$.

## Worked examples

**Example 1.** $\varepsilon_r = 4$, $\mu_r = 1$: $v = 1.5\times10^8$ m/s.

**Example 2.** $\mathbf E = 10\cos(2\pi\times10^8t - \beta z)$ in free space: $\beta = \omega/c = 2\pi\times10^8/3\times10^8 = 2.09$ rad/m; $\lambda = 3$ m.

**Example 3.** $\cos(\omega t + 5y)$ travels in the $-y$ direction.

## Common GATE traps

- Getting the direction from the sign wrong: $(\omega t - \beta z)$ means $+z$.
- Forgetting $\mu_r$ in magnetic media.

## Summary

- $\nabla^2\mathbf E = \mu\varepsilon\,\partial^2\mathbf E/\partial t^2$; $v = 1/\sqrt{\mu\varepsilon}$.
- $\cos(\omega t - \beta z)$ travels in $+z$; $\beta = \omega\sqrt{\mu\varepsilon}$.
