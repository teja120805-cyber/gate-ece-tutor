# LED, Photodiode and Solar Cell

> Optoelectronic devices are p-n junctions interacting with light. GATE asks about operating modes, solar-cell efficiency and fill factor, and photodiode responsivity.

## Intuition

- An **LED** turns current into light: forward-biased electrons and holes recombine radiatively (efficient in direct-gap materials), emitting photons of energy close to $E_g$.
- A **photodiode** turns light into current: absorbed photons create electron–hole pairs, and the field in the reverse-biased depletion region sweeps them out as a photocurrent.
- A **solar cell** is a large photodiode operated with **no external bias**, delivering power to a load (the fourth quadrant of the I–V curve).

## Key results

**LED:** $\lambda \approx 1.24/E_g$ µm. Colour is set by the material (GaAs infrared, GaAsP red, GaN blue).

**Photodiode** (reverse biased; the photocurrent is proportional to optical power):
$$
\mathcal R = \frac{I_{ph}}{P_{opt}} = \frac{\eta q\lambda}{hc} = \frac{\eta\,\lambda(\mu\text{m})}{1.24}\ \text{A/W}.
$$
- PIN photodiodes have a wide intrinsic layer for better speed and efficiency.
- Avalanche photodiodes (APDs) add internal gain $M$.

**Solar cell:** $I = I_{ph} - I_S(e^{V/V_T} - 1)$ (taking generation as positive).
- Open-circuit voltage: $V_{oc} = V_T\ln\left(1 + \dfrac{I_{sc}}{I_S}\right)$.
- Fill factor: $FF = \dfrac{V_mI_m}{V_{oc}I_{sc}}$, so $P_{max} = FF\cdot V_{oc}I_{sc}$.
- Efficiency: $\eta = \dfrac{P_{max}}{P_{in}}$.

## Worked examples

**Example 1.** $V_{oc} = 0.6$ V, $I_{sc} = 3$ A, $FF = 0.75$: $P_{max} = 1.35$ W. With 10 W incident, $\eta = 13.5\%$.

**Example 2.** A photodiode with $\eta = 0.8$ at $\lambda = 0.85\ \mu$m: $\mathcal R = 0.8\times0.85/1.24 = 0.548$ A/W.

## Common GATE traps

- Biasing a photodiode forward (it is operated in reverse, or at zero bias as a solar cell).
- Forgetting that photons with $E < E_g$ are not absorbed.

## Summary

- LED: forward bias, radiative recombination. Photodiode: reverse bias, $\mathcal R = \eta\lambda/1.24$.
- Solar cell: no bias; $P_{max} = FF\cdot V_{oc}I_{sc}$.
