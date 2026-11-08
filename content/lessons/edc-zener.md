# Zener Diode and Breakdown

> Breakdown mechanisms, their temperature coefficients, and Zener regulator design are standard questions.

## Intuition

Under large reverse bias a junction **breaks down** and conducts heavily at an almost constant voltage. A Zener diode is designed to operate there safely, holding its voltage steady — a simple voltage regulator.

## Breakdown mechanisms

| | Zener (tunnelling) | Avalanche (impact ionisation) |
|---|---|---|
| Doping | heavy (thin depletion region) | lighter |
| Breakdown voltage | low (below about 5 V) | higher (above about 7 V) |
| Temperature coefficient | **negative** | **positive** |

Diodes rated around 5–6 V combine both effects and have a near-zero temperature coefficient.

## Zener shunt regulator

Source $V_s$ with series resistor $R_s$; the Zener ($V_Z$) is in parallel with the load $R_L$:
$$
I_s = \frac{V_s - V_Z}{R_s}, \qquad I_L = \frac{V_Z}{R_L}, \qquad I_Z = I_s - I_L .
$$

- Regulation requires $I_Z \ge I_{Z,min}$ (staying in breakdown) and $I_ZV_Z \le P_{Z,max}$.
- The worst case for staying in breakdown is the minimum $V_s$ with the maximum load current.
- The worst case for Zener power is the maximum $V_s$ with no load.
- Line regulation is improved by the Zener's small dynamic resistance $r_z$.

## Worked examples

**Example 1.** $V_s = 20$ V, $R_s = 100\,\Omega$, $V_Z = 10$ V, $R_L = 500\,\Omega$: $I_s = 0.1$ A, $I_L = 0.02$ A ⇒ $I_Z = 80$ mA.

**Example 2.** In the same circuit, the minimum $R_L$ that keeps regulation (with $I_{Z,min} \approx 0$) occurs when $I_L = I_s = 0.1$ A, giving $R_{L,min} = 100\,\Omega$.

**Example 3.** Without the load: $I_Z = 0.1$ A and $P_Z = 1$ W, so the Zener must be rated for at least 1 W.

## Common GATE traps

- Assuming the Zener regulates when the load draws more than $I_s$ — it then drops out of breakdown.
- Mixing up the signs of the temperature coefficients.

## Summary

- Zener breakdown: heavy doping, low voltage, negative tempco. Avalanche: light doping, high voltage, positive tempco.
- Regulator: $I_Z = (V_s - V_Z)/R_s - V_Z/R_L \ge I_{Z,min}$.
