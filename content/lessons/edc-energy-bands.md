# Energy Bands; Intrinsic and Extrinsic Semiconductors

> The band picture explains conductors, insulators, semiconductors and doping — the starting point for every device topic.

## Intuition

When atoms bond in a crystal, their discrete energy levels spread into **bands**. The **valence band** is full of bonding electrons; the **conduction band** is empty at 0 K. The **band gap** $E_g$ between them decides everything:
- **metals:** the bands overlap, so electrons move freely;
- **insulators:** a large gap (above about 4 eV);
- **semiconductors:** a moderate gap (about 0.5–3 eV), so heat or light can lift some electrons across.

## Formal picture

- An electron lifted to the conduction band leaves a **hole** in the valence band. Both carry current: electrons in the CB, holes (positive) in the VB.
- **Intrinsic** (pure) semiconductor: $n = p = n_i$, with the Fermi level $E_i$ near mid-gap.
- **n-type:** group V donors (P, As, Sb) with levels just **below $E_C$** (about 0.05 eV in Si). Each donates an electron: $n \approx N_D$.
- **p-type:** group III acceptors (B, Al, Ga) with levels just **above $E_V$**. Each accepts an electron, creating a hole: $p \approx N_A$.

| Material (300 K) | $E_g$ (eV) | Type of gap |
|---|---|---|
| Ge | 0.66 | indirect |
| Si | 1.12 | indirect |
| GaAs | 1.42 | direct |

## Key results

- $E_g$ decreases slightly with temperature.
- Dopant concentration from parts per million: $N = (\text{atoms per cm}^3)\times(\text{fraction})$. Si has $5\times10^{22}$ atoms/cm³, so 1 ppm gives $5\times10^{16}$ cm⁻³.
- At room temperature dopants are essentially fully ionised. At very high temperature intrinsic generation dominates; at very low temperature dopants "freeze out".

## Worked examples

**Example 1.** Si doped with 1 ppm phosphorus: $N_D = 5\times10^{22}\times10^{-6} = 5\times10^{16}$ cm⁻³ — n-type with $n \approx 5\times10^{16}$.

**Example 2.** Boron in silicon is an acceptor (group III), producing p-type material with holes as majority carriers.

## Common GATE traps

- Confusing donor (group V, n-type) with acceptor (group III, p-type).
- Thinking holes are physical particles flowing in the conduction band — they live in the valence band.

## Summary

- The band gap separates the valence and conduction bands; semiconductors have moderate gaps.
- Donors sit just below $E_C$ (n-type); acceptors just above $E_V$ (p-type).
- Si 1.12 eV, Ge 0.66 eV, GaAs 1.42 eV.
