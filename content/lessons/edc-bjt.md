# Bipolar Junction Transistor (BJT)

> Operating regions, current gains, the Early effect and basic current relations appear in Devices and feed directly into Analog Circuits.

## Intuition

In an npn BJT, the forward-biased base–emitter junction injects electrons into a **thin, lightly doped base**. Almost all of them diffuse across the base before recombining and are swept into the collector by the reverse-biased collector–base junction. A small base current therefore controls a much larger collector current.

## Operating regions (npn)

| Region | BE junction | BC junction | Use |
|---|---|---|---|
| active (forward-active) | forward | reverse | amplifier |
| saturation | forward | forward | closed switch ($V_{CE,sat} \approx 0.2$ V) |
| cut-off | reverse | reverse | open switch |
| reverse-active | reverse | forward | rarely used |

## Key results

$$
I_E = I_B + I_C, \qquad I_C = \beta I_B = \alpha I_E, \qquad \alpha = \frac{\beta}{1 + \beta}, \quad \beta = \frac{\alpha}{1 - \alpha}.
$$

- $I_C = I_Se^{V_{BE}/V_T}$ in the active region; $V_{BE} \approx 0.7$ V for Si.
- **High β** requires a thin base, light base doping and heavy emitter doping (high emitter injection efficiency).
- **Early effect:** raising $V_{CE}$ widens the CB depletion region and narrows the effective base, so $I_C$ rises slightly. Modelled by the output resistance $r_o = V_A/I_C$.
- **Breakdown:** punch-through (the base is fully depleted) and avalanche; $BV_{CEO} < BV_{CBO}$.
- **Saturation test:** if the computed $I_C = \beta I_B$ exceeds the maximum the circuit allows, $(V_{CC} - V_{CE,sat})/R_C$, the transistor is saturated.

## Worked examples

**Example 1.** $\beta = 100$ ⇒ $\alpha = 100/101 = 0.990$.

**Example 2.** $I_B = 20\ \mu$A, $\beta = 150$ ⇒ $I_C = 3$ mA and $I_E = 3.02$ mA.

**Example 3.** $V_A = 100$ V at $I_C = 1$ mA ⇒ $r_o = 100\,\text{k}\Omega$.

**Example 4.** $V_{CC} = 10$ V, $R_C = 1\,\text{k}\Omega$, $\beta = 100$, $I_B = 0.2$ mA: $\beta I_B = 20$ mA, but at most $(10 - 0.2)/1\text{k} = 9.8$ mA can flow ⇒ saturated.

## Common GATE traps

- Using $I_C = \beta I_B$ in saturation.
- Confusing $\alpha$ (slightly below 1) with $\beta$ (large).

## Summary

- Active: BE forward, BC reverse; $I_C = \beta I_B$, $\alpha = \beta/(1 + \beta)$.
- The Early effect gives $r_o = V_A/I_C$; in saturation both junctions are forward biased.
