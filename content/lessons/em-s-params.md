# S-Parameters

> Meaning of $S_{11}$ and $S_{21}$, return and insertion loss in dB, and the reciprocity and losslessness conditions.

## Intuition

At microwave frequencies, open and short terminations are hard to realise and voltages are hard to measure. Instead we describe a network by how incident waves are **scattered**: how much comes back (reflection) and how much passes through (transmission), with the ports terminated in matched loads.

## Definitions

With incident waves $a_i$ and outgoing waves $b_i$ (normalised to $Z_0$): $\mathbf b = S\mathbf a$.

| Parameter | Meaning |
|---|---|
| $S_{11} = b_1/a_1\,(a_2 = 0)$ | input reflection coefficient with port 2 matched |
| $S_{21} = b_2/a_1\,(a_2 = 0)$ | forward transmission coefficient (gain or loss) |
| $S_{22}$, $S_{12}$ | output reflection, reverse transmission |

**In dB:**
- return loss $RL = -20\log_{10}|S_{11}|$;
- insertion loss $IL = -20\log_{10}|S_{21}|$;
- gain $= 20\log_{10}|S_{21}|$.

## Key results

- **Reciprocal** network: $S = S^T$ ($S_{12} = S_{21}$).
- **Lossless** network: $S$ is unitary ($S^{\dagger}S = I$). For a two-port: $|S_{11}|^2 + |S_{21}|^2 = 1$.
- A **matched** port has $S_{ii} = 0$.
- An ideal matched attenuator of $L$ dB: $S_{11} = S_{22} = 0$, $|S_{21}| = 10^{-L/20}$.
- An ideal isolator: $S_{21} \ne 0$, $S_{12} = 0$ (non-reciprocal).
- $|S_{11}|$ relates to VSWR: $\text{VSWR} = \dfrac{1 + |S_{11}|}{1 - |S_{11}|}$.

## Worked examples

**Example 1.** $|S_{21}| = 0.5$ ⇒ IL $= 6.02$ dB.

**Example 2.** $|S_{11}| = 0.2$ ⇒ RL $= 13.98$ dB, VSWR $= 1.5$.

**Example 3.** A lossless reciprocal two-port with $|S_{11}| = 0.6$ has $|S_{21}| = 0.8$.

## Common GATE traps

- Using $10\log$ instead of $20\log$ for the magnitudes of S-parameters.
- Thinking S-parameters need open or short terminations (they use matched loads).

## Summary

- $S_{11}$ = reflection with matched output; $S_{21}$ = transmission.
- Reciprocal: $S_{12} = S_{21}$; lossless: unitary; RL and IL in dB use $-20\log|S|$.
