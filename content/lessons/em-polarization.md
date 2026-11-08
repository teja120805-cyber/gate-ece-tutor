# Polarisation

> Identifying linear, circular and elliptical polarisation and the sense of rotation is asked regularly.

## Intuition

Polarisation describes the path traced by the tip of the **E** vector at a fixed point as time passes:
- along a line → linear;
- around a circle → circular;
- around an ellipse → elliptical (the general case).

It depends on the amplitudes and the relative phase of two perpendicular field components.

## Classification

For a wave travelling in $+z$: $\mathbf E = \hat xE_x\cos(\omega t - kz) + \hat yE_y\cos(\omega t - kz + \phi)$.

| Condition | Polarisation |
|---|---|
| $\phi = 0$ or $\pi$ (any amplitudes) | linear |
| $E_x = E_y$ and $\phi = \pm90°$ | circular |
| otherwise | elliptical |

- **Axial ratio** = major/minor axis: 1 for circular, ∞ for linear.
- **Sense of rotation** (IEEE convention, looking along the direction of propagation): with $\phi = -90°$ (Ey lags Ex) for propagation in $+z$, the field rotates from $x$ toward $y$ — **right-hand circular (RHCP)**. With $\phi = +90°$ it is **left-hand (LHCP)**. Texts differ in convention, so state yours.
- Any polarisation can be split into two orthogonal linear components or into RHCP + LHCP components.
- Circularly polarised antennas receive linear polarisation with a 3 dB loss; orthogonal polarisations (e.g. RHCP vs LHCP) ideally do not couple.

## Worked examples

**Example 1.** $\mathbf E = \hat x\cos(\omega t - kz) + \hat y\cos(\omega t - kz)$: linear, at 45°.

**Example 2.** $\mathbf E = \hat x\cos(\omega t - kz) + \hat y\sin(\omega t - kz)$: equal amplitudes, and $\sin = \cos(\cdot - 90°)$, so $\phi = -90°$ ⇒ circular (RHCP by the IEEE convention).

**Example 3.** $\hat x\cos(\cdot) + 2\hat y\cos(\cdot + 90°)$: elliptical, axial ratio 2.

## Common GATE traps

- Calling unequal amplitudes with a 90° phase difference "circular" — that is elliptical.
- Sense-of-rotation conventions (IEEE versus optics).

## Summary

- In phase ⇒ linear; equal amplitudes and 90° ⇒ circular; otherwise elliptical.
- Axial ratio: 1 for circular, ∞ for linear.
