# Superposition Theorem

> Useful when a circuit has several independent sources — especially sources at different frequencies (including DC plus AC).

## Intuition

In a **linear** circuit, the response to several sources acting together is the sum of the responses to each source acting alone. Switch on one source at a time, solve the simpler circuit, then add.

## Formal statement

In a linear network containing several independent sources, any voltage or current equals the algebraic sum of the contributions from each independent source acting alone, with all other **independent** sources deactivated:
- voltage source → short circuit ($V = 0$);
- current source → open circuit ($I = 0$);
- **dependent sources stay active.**

## Key results

- Superposition applies to voltages and currents, **not to power**: $P \propto i^2$, and $(i_1 + i_2)^2 \ne i_1^2 + i_2^2$ in general.
- **Different frequencies:** solve each frequency separately with its own phasor impedances, then add the results in the time domain (never add phasors of different frequencies).
- **Power with different frequencies:** average powers do add (cross terms average to zero), e.g. $P = I_{DC}^2R + \frac{I_m^2}{2}R$.

## Worked examples

**Example 1.** 10 V with series $5\,\Omega$ into node X; X to ground via $5\,\Omega$; 2 A into X.
Voltage source alone: 5 V. Current source alone: $2\times(5\|5) = 5$ V. Total $V_X = 10$ V.

**Example 2.** 6 V with series $3\,\Omega$, node to ground via $6\,\Omega$, 1.5 A into the node:
$6\cdot\frac69 = 4$ V, plus $1.5\times(3\|6) = 3$ V, gives 7 V.

**Example 3 (mixed frequency).** $v_s = 4 + 3\cos t$ V across a series $R = 1\,\Omega$, $C = 1$ F (output across $C$):
DC: the capacitor is open, so $v_C = 4$ V. AC: $\frac{1/j}{1 + 1/j} = \frac{1}{1 + j}$, magnitude $0.707$ at $-45°$.
So $v_C = 4 + 2.12\cos(t - 45°)$.

## Common GATE traps

- Deactivating dependent sources.
- Summing powers from individual sources at the same frequency.
- Adding phasors of different frequencies.

## Summary

- One independent source at a time; V → short, I → open; dependent sources stay.
- Superpose voltages and currents, not power (except for different frequencies, on average).
