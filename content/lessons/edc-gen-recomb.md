# Generation and Recombination of Carriers

> Excess carriers, minority-carrier lifetime and low-level injection underpin diode, BJT and photodetector behaviour.

## Intuition

Light, heat or forward bias can create **extra** electron–hole pairs beyond equilibrium. These excess carriers do not last: they recombine, and the population decays exponentially with a characteristic **lifetime** $\tau$. Under constant generation, a steady state is reached where generation balances recombination.

## Formal definitions

Excess carriers: $\Delta n = n - n_0$, $\Delta p = p - p_0$ (equal for pair generation).

**Low-level injection:** the excess is much smaller than the majority concentration. The majority density barely changes, and the recombination rate is set by the minority carriers:
$$
R = \frac{\Delta p}{\tau_p}\ \ (\text{n-type}), \qquad \frac{d\Delta p}{dt} = G - \frac{\Delta p}{\tau_p}.
$$

## Key results

- After the generation stops: $\Delta p(t) = \Delta p(0)e^{-t/\tau_p}$.
- Steady state under uniform generation $G$: $\Delta p = G\tau_p$.
- **Mechanisms:** direct (band-to-band, radiative — strong in direct-gap materials); indirect via traps (Shockley–Read–Hall — dominant in Si); Auger (at high densities).
- Deep-level impurities such as gold in Si act as recombination centres: they **reduce** the lifetime, which makes switching diodes faster.
- Photoconductivity: $\Delta\sigma = q(\mu_n + \mu_p)\Delta n$ with $\Delta n = G\tau$.

## Worked examples

**Example 1.** With $\tau = 1\ \mu$s, the fraction of excess carriers remaining after 2 µs is $e^{-2} = 0.135$.

**Example 2.** $G = 10^{20}$ cm⁻³s⁻¹ and $\tau = 1\ \mu$s: $\Delta n = 10^{14}$ cm⁻³ in steady state.

## Common GATE traps

- Using the majority-carrier lifetime instead of the minority one.
- Assuming that more recombination centres increase the lifetime (they decrease it).

## Summary

- Excess carriers decay as $e^{-t/\tau}$; steady state $\Delta = G\tau$.
- Low-level injection: minority carriers control recombination; SRH dominates in Si.
