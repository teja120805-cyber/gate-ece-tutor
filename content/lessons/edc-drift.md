# Drift Current, Mobility and Resistivity

> Conductivity and resistivity of doped semiconductors and drift-velocity calculations are frequent 1-mark numericals.

## Intuition

An electric field pushes carriers, but they keep colliding with the lattice and with impurities. The result is an average **drift velocity** proportional to the field. The proportionality constant is the **mobility** $\mu$: how easily carriers move.

## Formal definitions

$$
v_d = \mu E, \qquad J_{drift} = q(n\mu_n + p\mu_p)E = \sigma E, \qquad \sigma = q(n\mu_n + p\mu_p),\quad \rho = \frac{1}{\sigma}.
$$

Both electrons and holes contribute **positively** to current: they move in opposite directions but carry opposite charges.

Resistance of a bar: $R = \rho\dfrac{L}{A}$.

## Key results

- In Si at 300 K (lightly doped): $\mu_n \approx 1350$ and $\mu_p \approx 480$ cm²/V·s. Electrons are about 3× more mobile.
- **Doped material:** use only the majority carriers, e.g. n-type $\sigma \approx qN_D\mu_n$.
- **Intrinsic:** $\sigma_i = qn_i(\mu_n + \mu_p)$.
- Mobility **decreases** with increasing doping (impurity scattering) and with increasing temperature (lattice scattering dominates near room temperature).
- At high fields the drift velocity **saturates** (about $10^7$ cm/s in Si).
- Hall effect: the sign of the Hall voltage reveals the carrier type; $R_H = \frac{1}{qp}$ (p-type) or $-\frac{1}{qn}$ (n-type), and $\mu = \sigma|R_H|$.

## Worked examples

**Example 1.** n-Si with $N_D = 10^{16}$: $\rho = \frac{1}{1.6\times10^{-19}\times10^{16}\times1350} = 0.463\ \Omega\cdot$cm.

**Example 2.** $E = 100$ V/cm, $\mu_n = 1350$: $v_d = 1.35\times10^5$ cm/s.

**Example 3.** Intrinsic Si: $\sigma = 1.6\times10^{-19}\times1.5\times10^{10}\times1830 = 4.39\times10^{-6}$ S/cm, i.e. $\rho \approx 2.3\times10^5\ \Omega\cdot$cm.

## Common GATE traps

- Including minority carriers in doped-material conductivity (it is negligible).
- Assuming higher doping always increases mobility — it increases $\sigma$ but **decreases** $\mu$.
- Unit consistency: keep cm with cm.

## Summary

- $v_d = \mu E$; $\sigma = q(n\mu_n + p\mu_p)$; doped: $\sigma \approx qN\mu_{\text{majority}}$.
- Mobility falls with doping and temperature; velocity saturates at high fields.
