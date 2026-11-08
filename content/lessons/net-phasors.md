# Phasors and Impedance

> Sinusoidal steady-state analysis is the core of AC circuits, filters and transmission lines.

## Intuition

In a linear circuit driven by a sinusoid, every voltage and current in steady state is a sinusoid at the **same frequency**. Only amplitudes and phases differ. A **phasor** is a complex number that stores that amplitude and phase, so differential equations become algebra.

## Formal definitions

$v(t) = V_m\cos(\omega t + \theta) \;\leftrightarrow\; \mathbf V = V_m\angle\theta$ (or the RMS value $V_m/\sqrt2\,\angle\theta$).
Since $\frac{d}{dt} \to j\omega$:

| Element | Impedance $Z$ | Phase of $V$ relative to $I$ |
|---|---|---|
| R | $R$ | in phase |
| L | $j\omega L$ | V leads by 90° |
| C | $\dfrac{1}{j\omega C} = -\dfrac{j}{\omega C}$ | V lags by 90° |

$Z = R + jX$; admittance $Y = 1/Z = G + jB$. KCL, KVL, dividers and network theorems all work with impedances.

## Key results

- Inductive circuits: current **lags** voltage. Capacitive circuits: current **leads** ("ELI the ICE man").
- $|Z| = \sqrt{R^2 + X^2}$, $\angle Z = \tan^{-1}(X/R)$; the current's phase is $\angle V - \angle Z$.
- Convert $\sin$ to $\cos$ consistently: $\sin\omega t = \cos(\omega t - 90°)$.
- Phasors apply only at a single frequency in steady state.

## Worked examples

**Example 1.** $R = 3\,\Omega$ in series with $X_L = 4\,\Omega$: $|Z| = 5\,\Omega$, $\angle Z = 53.13°$.

**Example 2.** $v = 10\cos100t$ across $R = 10\,\Omega$ and $L = 0.1$ H in series: $Z = 10 + j10$, $|I| = 10/14.14 = 0.707$ A, lagging by 45°.

**Example 3.** $R = 4\,\Omega$ in series with $X_C = 3\,\Omega$: $Z = 4 - j3$, $\angle Z = -36.87°$, so the current **leads** the voltage by 36.87°.

## Common GATE traps

- Mixing peak and RMS phasors in power calculations.
- A sign error in capacitive reactance.
- Using phasors for transients (use Laplace instead).

## Summary

- Phasor = amplitude∠phase; $d/dt \to j\omega$.
- $Z_L = j\omega L$, $Z_C = 1/(j\omega C)$; inductive lags, capacitive leads.
