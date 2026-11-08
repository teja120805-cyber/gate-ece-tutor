# Integrators and Differentiators

> Output waveforms of op-amp integrators and differentiators for step, square and ramp inputs are common questions.

## Intuition

In an inverting amplifier, replace a resistor with a capacitor. The capacitor current is $C\,dv/dt$. If the capacitor is in the **feedback** path, the input current $v_i/R$ charges it, and the output becomes the running **integral** of the input. If the capacitor is at the **input**, the current is proportional to $dv_i/dt$, so the output is the **derivative**.

## Key results

**Integrator** ($R$ in, $C$ in feedback):
$$
v_o(t) = -\frac{1}{RC}\int_0^t v_i\,d\tau + v_o(0), \qquad H(j\omega) = -\frac{1}{j\omega RC}.
$$
- Gain falls at 20 dB/decade; $|H| = 1$ at $f = \dfrac{1}{2\pi RC}$.
- Square-wave input → triangular output; constant input → ramp output.
- **Practical integrator:** a resistor $R_f$ in parallel with $C$ limits the DC gain to $-R_f/R$ (otherwise offsets saturate the output). It behaves as an integrator only above $f = \frac{1}{2\pi R_fC}$.

**Differentiator** ($C$ in, $R$ in feedback):
$$
v_o = -RC\frac{dv_i}{dt}, \qquad H(j\omega) = -j\omega RC.
$$
- Gain rises with frequency, so it amplifies noise. A practical version adds a small series resistor at the input to limit the high-frequency gain.
- Ramp input → constant output; triangle → square; square → spikes.

## Worked examples

**Example 1.** Integrator with $R = 10\,\text{k}\Omega$, $C = 1\ \mu$F ($RC = 10$ ms), input 1 V for 5 ms from $v_o(0) = 0$: $v_o = -\frac{1}{0.01}\times1\times0.005 = -0.5$ V.

**Example 2.** With $RC = 1$ ms, the unity-gain frequency is $\frac{1}{2\pi\times10^{-3}} = 159$ Hz.

**Example 3.** Differentiator with $RC = 0.01$ s and a 2 V/ms ramp input: $v_o = -0.01\times2000 = -20$ V (if the supply allows).

## Common GATE traps

- Forgetting the negative sign (both circuits are inverting).
- Ignoring saturation: the output cannot exceed the supply rails.

## Summary

- Integrator: $-\frac{1}{RC}\int v_i$; differentiator: $-RC\frac{dv_i}{dt}$.
- Practical versions add resistors to tame the DC gain or the noise gain.
