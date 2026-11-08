# KCL, KVL and Source Transformations

> Every circuit question starts here: series/parallel reduction, voltage and current dividers, source transformation and dependent sources.

## Intuition

- **KCL** is conservation of charge: whatever current flows into a node must flow out.
- **KVL** is conservation of energy: going around any closed loop, the voltage rises and drops cancel.

## Formal statements

$$
\text{KCL: } \sum_{\text{node}} i_{\text{in}} = \sum i_{\text{out}}, \qquad \text{KVL: } \sum_{\text{loop}} v = 0 .
$$

## Key results

| Tool | Formula |
|---|---|
| Series resistors | $R_{eq} = R_1 + R_2 + \cdots$ |
| Parallel resistors | $\frac{1}{R_{eq}} = \sum\frac{1}{R_i}$; two resistors: $\frac{R_1R_2}{R_1 + R_2}$ |
| Voltage divider | $v_1 = v\,\dfrac{R_1}{R_1 + R_2}$ |
| Current divider | $i_1 = i\,\dfrac{R_2}{R_1 + R_2}$ (the current in $R_1$ uses the **other** resistor) |
| Source transformation | $V_s$ in series with $R$ ⇔ $V_s/R$ in parallel with $R$ |

- **Ideal sources:** a voltage source fixes the voltage (any current); a current source fixes the current (any voltage). Never short an ideal voltage source or open an ideal current source.
- **Dependent sources** (VCVS, CCVS, VCCS, CCCS) are treated like ordinary sources in KCL/KVL, plus one extra equation for the controlling variable.
- **Passive sign convention:** power absorbed $p = vi$ when current enters the $+$ terminal. The total power in a circuit sums to zero.

## Worked examples

**Example 1.** $2\,\Omega \| 3\,\Omega \| 6\,\Omega$: $\frac12 + \frac13 + \frac16 = 1$ ⇒ $1\,\Omega$.

**Example 2.** 12 V across $2\,\Omega + 4\,\Omega$ in series: $v_{4\Omega} = 12\cdot\frac46 = 8$ V.

**Example 3.** 6 A into $3\,\Omega \| 6\,\Omega$: $i_{3\Omega} = 6\cdot\frac{6}{9} = 4$ A.

**Example 4 (dependent source).** A loop with a 20 V source, $4\,\Omega$, a dependent source dropping $2i$, and $4\,\Omega$: KVL gives $20 = 4i + 2i + 4i$ ⇒ $i = 2$ A.

## Common GATE traps

- Using the wrong resistor in the current divider.
- Applying source transformation to an ideal source with no series or parallel resistor.
- Losing the sign convention when computing power.

## Summary

- KCL at nodes, KVL around loops.
- Dividers and source transformation simplify most circuits.
- Dependent sources add one equation for their controlling variable.
