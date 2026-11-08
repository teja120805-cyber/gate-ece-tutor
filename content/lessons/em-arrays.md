# Linear Antenna Arrays

> Array factor, broadside versus end-fire phasing, pattern multiplication and beamwidth are asked frequently.

## Intuition

Several antennas fed together interfere: in some directions their fields add (beams); in others they cancel (nulls). By choosing the spacing $d$ and the progressive phase $\alpha$ between elements, you shape and steer the beam without moving anything — that is how phased arrays work.

## Array factor (N identical isotropic elements, uniform amplitude)

$$
\psi = kd\cos\theta + \alpha, \qquad AF(\psi) = \frac{\sin(N\psi/2)}{N\sin(\psi/2)}\ \ (\text{normalised}).
$$
$\theta$ is measured from the array axis; $k = 2\pi/\lambda$. The maximum occurs at $\psi = 0$, where the unnormalised AF equals $N$ — a field gain of $N$, or $20\log N$ dB relative to one element.

## Key results

| Array type | Condition | Main beam |
|---|---|---|
| broadside | $\alpha = 0$ | perpendicular to the axis ($\theta = 90°$) |
| end-fire | $\alpha = -kd$ (for $\theta = 0$) | along the axis |
| phased (scanned) | $\alpha = -kd\cos\theta_0$ | steered to $\theta_0$ |

- **Nulls:** $N\psi/2 = \pm m\pi$, i.e. $\psi = \pm 2\pi m/N$ ($m = 1, 2, \ldots$).
- **Broadside first-null beamwidth:** $\text{FNBW} = 2\sin^{-1}\left(\dfrac{\lambda}{Nd}\right)$ (measured about broadside), approximately $\dfrac{2\lambda}{Nd}$ rad for a long array.
- **Grating lobes** (extra main beams) appear when $d \ge \lambda$ (broadside) or $d \ge \lambda/2$ (end-fire). Keep $d < \lambda$, typically $\lambda/2$.
- **Pattern multiplication:** total pattern = element pattern × array factor. The AF depends only on the geometry and excitation, not on the element type.
- Increasing $N$ narrows the beam and increases directivity (broadside $D \approx 2Nd/\lambda$).

## Worked examples

**Example 1.** End-fire with $d = \lambda/4$: $\alpha = -kd = -90°$.

**Example 2.** An 8-element array: maximum AF $= 8$, i.e. $20\log8 = 18.1$ dB above a single element (in field).

**Example 3.** Broadside with $N = 10$, $d = \lambda/2$: the first nulls are at $\sin^{-1}(1/5) = 11.5°$ from broadside, so FNBW $= 23.1°$.

## Common GATE traps

- Using the end-fire phase for a broadside array (broadside has $\alpha = 0$).
- Measuring θ from broadside in formulas written for θ measured from the axis.

## Summary

- $\psi = kd\cos\theta + \alpha$; broadside $\alpha = 0$; end-fire $\alpha = -kd$.
- Total pattern = element × AF; avoid grating lobes with $d < \lambda$ (broadside).
