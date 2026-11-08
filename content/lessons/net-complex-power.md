# Complex Power and Power Factor

> Real, reactive and apparent power, power factor, and power-factor correction are frequent numerical questions.

## Intuition

In AC circuits, some energy is actually consumed (heat, mechanical work) — that is **real power** $P$. Some sloshes back and forth between the source and the inductors or capacitors without being consumed — that is **reactive power** $Q$. The source must still supply the combined **apparent power** $|S|$, so cables and generators are rated in VA.

## Formal definitions

With RMS phasors $\mathbf V$ and $\mathbf I$, and $\theta = \angle V - \angle I$:

$$
\mathbf S = \mathbf V\mathbf I^* = P + jQ, \qquad P = |V||I|\cos\theta\ (\text{W}),\quad Q = |V||I|\sin\theta\ (\text{VAR}),\quad |S| = |V||I|\ (\text{VA}).
$$

Power factor $= \cos\theta = P/|S|$: **lagging** for inductive loads ($Q > 0$), **leading** for capacitive loads ($Q < 0$).

## Key results

- For an impedance $Z = R + jX$: $P = |I|^2R$, $Q = |I|^2X$, $\mathbf S = |I|^2Z = |V|^2/Z^*$.
- Pure R: $Q = 0$. Pure L: $P = 0$, $Q > 0$. Pure C: $P = 0$, $Q < 0$.
- Complex power is conserved: $\sum \mathbf S_{\text{sources}} = \sum \mathbf S_{\text{loads}}$.
- **Power-factor correction:** a parallel capacitor supplies $Q_C = P(\tan\theta_1 - \tan\theta_2)$, with $C = \dfrac{Q_C}{\omega V_{rms}^2}$.
- With peak-value phasors, $P = \frac12V_mI_m\cos\theta$.

## Worked examples

**Example 1.** $\mathbf V = 100\angle0°$, $\mathbf I = 5\angle{-30°}$ (RMS): $\mathbf S = 500\angle30°$, so $P = 433$ W and $Q = 250$ VAR (lagging).

**Example 2.** A 10 kW load at pf 0.8 lagging: $Q = 10\tan(\cos^{-1}0.8) = 7.5$ kVAR. Correcting to unity needs a 7.5 kVAR capacitor bank.

**Example 3.** $|V| = 230$ V across $Z = 23\angle60°\,\Omega$: $|I| = 10$ A, $P = 2300\cos60° = 1150$ W.

## Common GATE traps

- Using $\mathbf{VI}$ instead of $\mathbf{VI^*}$.
- Peak versus RMS: the factor ½ matters.
- Leading versus lagging conventions.

## Summary

- $\mathbf S = \mathbf{VI}^* = P + jQ$; pf $= \cos\theta$.
- Inductive loads absorb $+Q$, capacitive loads $-Q$; correct the pf with shunt capacitors.
