# Solving Network Equations Using Laplace Transform

> Transform the circuit itself into the s-domain, including initial conditions, and analyse it like a resistive circuit.

## Intuition

Instead of writing differential equations and then transforming them, transform each **element**. Inductors and capacitors become impedances $sL$ and $1/sC$, and their stored energy appears as extra sources. Then nodal analysis, mesh analysis and network theorems apply directly.

## s-domain element models

| Element | Impedance | Initial condition modelled as |
|---|---|---|
| R | $R$ | — |
| L with $i_L(0^-) = I_0$ | $sL$ | a voltage source $LI_0$ in series (opposing the change), or a current source $I_0/s$ in parallel |
| C with $v_C(0^-) = V_0$ | $\dfrac{1}{sC}$ | a voltage source $V_0/s$ in series, or a current source $CV_0$ in parallel |

## Key results

- **Transfer function** $H(s) = \dfrac{Y(s)}{X(s)}$ with zero initial conditions; the impulse response is $h(t) = \mathcal L^{-1}\{H\}$.
- Poles of $H(s)$ are the natural frequencies of the circuit; their real parts set the decay, their imaginary parts the oscillation.
- **Zero-input + zero-state:** the total response is the response to the initial conditions plus the response to the inputs.

## Worked examples

**Example 1.** Series RC with output across C ($R = 1$, $C = 1$): $H(s) = \dfrac{1/s}{1 + 1/s} = \dfrac{1}{s + 1}$, a pole at $s = -1$.

**Example 2.** A 1 F capacitor charged to 5 V discharges through $2\,\Omega$:
$V(s) = \dfrac{5/s\cdot2}{2 + 1/s} = \dfrac{5}{s + 0.5}$ ⇒ $v(t) = 5e^{-0.5t}$, so $v(2) = 1.84$ V.

**Example 3.** Series RLC ($R = 3$, $L = 1$, $C = 0.5$) with a 1 V step and zero initial conditions:
$I(s) = \dfrac{1/s}{3 + s + 2/s} = \dfrac{1}{s^2 + 3s + 2} = \dfrac{1}{s + 1} - \dfrac{1}{s + 2}$.
$i(t) = e^{-t} - e^{-2t}$, which peaks at $t = \ln2$ with value $0.5 - 0.25 = 0.25$ A.

## Common GATE traps

- The polarity of the initial-condition sources.
- Mixing up $i_L(0^-)$ and $i_L(0^+)$ when the circuit contains impulses.

## Summary

- L → $sL$ with $LI_0$ in series; C → $1/sC$ with $V_0/s$ in series.
- Solve algebraically in $s$, then use partial fractions to return to time.
