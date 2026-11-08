# Poisson and Continuity Equations

> These equations describe charge and carrier distributions in devices. GATE asks for diffusion lengths, exponential minority-carrier profiles and field/potential from charge density.

## Intuition

- **Poisson's equation:** charge creates fields; the curvature of the potential follows the charge density.
- **Continuity equation:** carrier bookkeeping — the change in carrier density equals the inflow minus the outflow, plus generation, minus recombination.

## Formal definitions

**Poisson:** $\dfrac{d^2V}{dx^2} = -\dfrac{\rho}{\varepsilon}$, $\dfrac{dE}{dx} = \dfrac{\rho}{\varepsilon}$, with $\rho = q(p - n + N_D^+ - N_A^-)$.

**Hole continuity** (in n-type material):
$$
\frac{\partial p}{\partial t} = -\frac1q\frac{\partial J_p}{\partial x} + G - \frac{\Delta p}{\tau_p}.
$$

## Key results

**Steady state, no field, no generation** (minority-carrier diffusion equation):
$$
D_p\frac{d^2\Delta p}{dx^2} = \frac{\Delta p}{\tau_p} \;\Rightarrow\; \Delta p(x) = \Delta p(0)e^{-x/L_p}, \qquad L_p = \sqrt{D_p\tau_p}.
$$

- The **diffusion length** $L$ is the average distance a minority carrier diffuses before recombining.
- For a **short region** ($W \ll L$), the profile is approximately linear (as in a BJT base).
- Uniform charge density gives a linearly varying field and a parabolic potential (as in a depletion region).

## Worked examples

**Example 1.** $D_p = 10$ cm²/s, $\tau_p = 1\ \mu$s: $L_p = \sqrt{10^{-5}}$ cm $= 31.6\ \mu$m.

**Example 2.** At $x = 2L_p$ the excess is $e^{-2} \approx 13.5\%$ of its injected value.

**Example 3.** A uniform $\rho$ in a depletion region gives a triangular $E(x)$ peaking at the junction and a parabolic $V(x)$.

## Common GATE traps

- Using $L = D\tau$ instead of $\sqrt{D\tau}$.
- Forgetting that the continuity equation is per carrier type.

## Summary

- Poisson: $d^2V/dx^2 = -\rho/\varepsilon$.
- Steady-state minority diffusion: $\Delta p \propto e^{-x/L}$, $L = \sqrt{D\tau}$.
