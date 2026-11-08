# Thevenin's and Norton's Theorems

> Asked nearly every year, often with a dependent source. Thevenin equivalents also drive maximum-power-transfer, bias and amplifier problems.

## Intuition

From the point of view of a load, **any linear two-terminal network behaves like one source and one resistor**. However complicated the circuit behind the terminals, the load cannot tell the difference. Thevenin uses a voltage source in series with a resistor; Norton uses a current source in parallel with a resistor. They are two views of the same network.

## Formal statement

A linear network seen at terminals a–b is equivalent to:

- **Thevenin:** $V_{th}$ in series with $R_{th}$, where $V_{th} = V_{oc}$ (open-circuit voltage at a–b).
- **Norton:** $I_N$ in parallel with $R_{th}$, where $I_N = I_{sc}$ (short-circuit current a→b).

$$
R_{th} = \frac{V_{oc}}{I_{sc}}, \qquad V_{th} = I_N R_{th}.
$$

## How to find $R_{th}$

| Network contains | Method |
|---|---|
| Independent sources + resistors only | Deactivate sources (V → short, I → open) and combine resistors |
| Dependent sources (with or without independent ones) | Deactivate **independent** sources only, apply a test source $V_t$ (or $I_t$), then $R_{th} = V_t/I_t$ |
| Anything | $R_{th} = V_{oc}/I_{sc}$ (needs no deactivation) |

Never deactivate a dependent source — its value is set by the circuit itself. With dependent sources $R_{th}$ can even be negative.

## Key results

**Maximum power transfer.** A load $R_L$ receives maximum power when $R_L = R_{th}$:
$$
P_{max} = \frac{V_{th}^2}{4R_{th}} .
$$
For AC circuits the load must be the conjugate, $Z_L = Z_{th}^*$. Efficiency at maximum power is only 50%.

**Source transformation.** $V$ in series with $R$ ⇔ $V/R$ in parallel with $R$ — the Thevenin–Norton conversion applied locally.

## Visual picture

| Original network | ⇒ | Thevenin | ⇔ | Norton |
|---|---|---|---|---|
| sources + resistors behind a–b | | $V_{th}$ — $R_{th}$ — a | | $I_N \parallel R_{th}$ across a–b |

## Worked examples

**Example 1.** A 12 V source with series $4\,\Omega$, and a shunt $4\,\Omega$ across a–b.
$V_{th}$ by divider: 6 V. $R_{th} = 4 \| 4 = 2\,\Omega$. $I_N = 12/4 = 3$ A $= 6/2$ ✓.
Maximum power to a load: $R_L = 2\,\Omega$, $P = 36/8 = 4.5$ W.

**Example 2 (dependent source).** Between the terminals, a test current $i_x$ flows through $2\,\Omega$, a CCVS with drop $3i_x$, and $4\,\Omega$ in series.
$V_t = 2i_x + 3i_x + 4i_x = 9i_x \Rightarrow R_{th} = 9\,\Omega$.

**Example 3 (bridge).** 10 V across two arms: left $4\,\Omega$/$6\,\Omega$, right $6\,\Omega$/$4\,\Omega$ (top/bottom). Between the midpoints:
$V_{th} = 6 - 4 = 2$ V, and $R_{th} = (4\|6) + (6\|4) = 4.8\,\Omega$. A $5.2\,\Omega$ meter draws $2/10 = 0.2$ A.

## Common GATE traps

- **Deactivating dependent sources.** Never do it.
- **Sign of $V_{oc}$** — keep track of the terminal polarity (a positive with respect to b).
- **Using $V_{oc}/I_{sc}$ when both are zero.** This happens in networks with only dependent sources; then you must use a test source.
- **Maximum-power condition for AC** is $Z_L = Z_{th}^*$, not $Z_L = Z_{th}$.

## Summary

- $V_{th} = V_{oc}$, $I_N = I_{sc}$, $R_{th} = V_{oc}/I_{sc}$.
- Independent sources only: deactivate and combine. Dependent sources: use a test source.
- Maximum power at $R_L = R_{th}$, giving $V_{th}^2/4R_{th}$.
