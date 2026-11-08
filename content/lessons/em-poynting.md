# Poynting Vector

> Power density of plane waves, and the time-average Poynting vector, are standard numericals.

## Intuition

Electromagnetic waves carry energy. The **Poynting vector** $\mathbf S = \mathbf E\times\mathbf H$ gives the direction and density (W/m²) of that energy flow. For a plane wave it points along the direction of propagation.

## Key results

**Instantaneous:** $\mathbf S = \mathbf E\times\mathbf H$ (W/m²).

**Poynting's theorem** (energy conservation): power flowing into a volume = rate of increase of stored energy + ohmic loss.

**Time-average** (phasors with peak amplitudes):
$$
\langle\mathbf S\rangle = \frac12\operatorname{Re}\{\mathbf E\times\mathbf H^*\}.
$$

**Uniform plane wave** in a lossless medium with intrinsic impedance $\eta$ ($H_0 = E_0/\eta$):
$$
\langle S\rangle = \frac{E_0^2}{2\eta} = \frac12\eta H_0^2 .
$$
With RMS amplitudes, drop the ½. In free space $\eta_0 = 120\pi \approx 377\,\Omega$.

- Total power through an area $A$ (uniform): $P = \langle S\rangle A$.
- An isotropic source of power $P_t$ gives power density $\dfrac{P_t}{4\pi r^2}$ at distance $r$.

## Worked examples

**Example 1.** $E_0 = 377$ V/m in free space: $H_0 = 1$ A/m and $\langle S\rangle = 377^2/754 = 188.5$ W/m².

**Example 2.** For $\langle S\rangle = 1$ W/m² in free space: $E_0 = \sqrt{2\times377} = 27.5$ V/m.

**Example 3.** A 1 kW isotropic transmitter at 1 km: $\langle S\rangle = \frac{1000}{4\pi10^6} = 79.6\ \mu$W/m².

## Common GATE traps

- Using peak values without the ½ factor (or RMS values with it).
- Getting the direction of $\mathbf E\times\mathbf H$ wrong (use the right-hand rule).

## Summary

- $\mathbf S = \mathbf E\times\mathbf H$; time average $\frac12\operatorname{Re}\{\mathbf E\times\mathbf H^*\}$.
- Plane wave: $E_0^2/2\eta$ with peak values.
