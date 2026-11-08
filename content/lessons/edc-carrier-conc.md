# Equilibrium Carrier Concentration

> Every device calculation — conductivity, junction built-in potential, MOSFET threshold — starts from $n$, $p$ and the Fermi level. Expect a direct 1-mark question and several indirect uses.

## Intuition

In a pure (intrinsic) semiconductor, thermal energy breaks bonds and creates electron–hole pairs, so $n = p = n_i$. Doping adds many carriers of one type. Because electrons and holes keep meeting and recombining, **more of one type means fewer of the other** — their product stays fixed at a given temperature.

The **Fermi level** $E_F$ is the energy where the probability of occupation is ½. It rises towards the conduction band when there are many electrons and falls towards the valence band when there are many holes.

## Formal definition

Non-degenerate semiconductor in equilibrium:

$$
n = N_C\,e^{-(E_C - E_F)/kT}, \qquad p = N_V\,e^{-(E_F - E_V)/kT}
$$

Using the intrinsic level $E_i$:

$$
n = n_i\,e^{(E_F - E_i)/kT}, \qquad p = n_i\,e^{(E_i - E_F)/kT}.
$$

## Key results

**Mass-action law:** $\;n\,p = n_i^2\;$ (independent of doping).

**Charge neutrality:** $\;p + N_D^+ = n + N_A^-$.

**Majority/minority carriers** (complete ionisation, $N \gg n_i$):

| Type | Majority | Minority |
|---|---|---|
| n-type | $n \approx N_D$ | $p = n_i^2/N_D$ |
| p-type | $p \approx N_A$ | $n = n_i^2/N_A$ |
| compensated ($N_D > N_A$) | $n \approx N_D - N_A$ | $p = n_i^2/n$ |

**Fermi level position:**
$$
E_F - E_i = kT\ln\frac{n}{n_i}\ \ (\text{n-type}),\qquad E_i - E_F = kT\ln\frac{p}{n_i}\ \ (\text{p-type}).
$$

**Temperature:** $n_i \propto T^{3/2}e^{-E_g/2kT}$ grows rapidly with temperature. At high enough $T$, $n_i$ exceeds the doping and the material behaves intrinsically.

Values for silicon at 300 K: $n_i \approx 1.5\times10^{10}\ \text{cm}^{-3}$ (some texts use $10^{10}$), $E_g = 1.12$ eV, $kT = 0.0259$ eV.

## Visual picture

| | $E_F$ location |
|---|---|
| intrinsic | at $E_i$ (near mid-gap) |
| n-type, $N_D = 10^{16}$ | $0.347$ eV above $E_i$ |
| p-type, $N_A = 10^{16}$ | $0.347$ eV below $E_i$ |
| heavier doping | closer to the band edge (logarithmically) |

## Worked examples

**Example 1.** Si, $N_D = 10^{16}\ \text{cm}^{-3}$: $n = 10^{16}$, $p = (1.5\times10^{10})^2/10^{16} = 2.25\times10^{4}\ \text{cm}^{-3}$.

**Example 2.** $E_F - E_i = 0.0259\ln(10^{16}/1.5\times10^{10}) = 0.0259 \times 13.41 = 0.347$ eV.

**Example 3 (compensation).** $N_D = 10^{17}$, $N_A = 4\times10^{16}$: $n = 6\times10^{16}$, $p = 3.75\times10^3\ \text{cm}^{-3}$ — n-type.

**Example 4 (doping by 10×).** Increasing $N_D$ tenfold raises $E_F$ by $kT\ln10 = 0.0596$ eV ≈ 60 meV.

## Common GATE traps

- **Adding instead of subtracting** for compensated material.
- **Using $n_i$ for the majority carrier** — the majority concentration is set by the doping.
- **Ignoring which $n_i$ value the question gives** ($10^{10}$ vs $1.5\times10^{10}$).
- **Linear thinking about $E_F$**: it moves with the *logarithm* of the doping.

## Summary

- $np = n_i^2$; majority ≈ net doping; minority $= n_i^2/\text{majority}$.
- $E_F - E_i = kT\ln(n/n_i)$; 10× doping ≈ 60 meV shift at 300 K.
- $n_i$ rises steeply with temperature.
