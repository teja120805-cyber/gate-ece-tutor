# Control System Components and the Feedback Principle

> The effects of feedback on gain, sensitivity, bandwidth and disturbance rejection are short, frequent questions.

## Intuition

An **open-loop** system applies a fixed input and hopes for the best — like a toaster on a timer. A **closed-loop** system measures the output, compares it with the desired value and corrects the error — like a thermostat. Feedback trades raw gain for accuracy and robustness.

## Basic structure

Reference $R$ → summing junction (error $E = R - HC$) → controller/plant $G$ → output $C$; a sensor $H$ feeds the output back.

$$
T(s) = \frac{C}{R} = \frac{G}{1 + GH}\ \ (\text{negative feedback}), \qquad \frac{G}{1 - GH}\ \ (\text{positive feedback}).
$$

$GH$ is the **loop gain** (open-loop transfer function).

## Effects of negative feedback

| Property | Effect |
|---|---|
| Overall gain | reduced by the factor $1 + GH$ |
| Sensitivity to $G$ | $S_G^T = \dfrac{\partial T/T}{\partial G/G} = \dfrac{1}{1 + GH}$ — reduced |
| Sensitivity to $H$ | $S_H^T = \dfrac{-GH}{1 + GH} \approx -1$ — the sensor must be accurate |
| Bandwidth | increased (gain–bandwidth trade-off) |
| Disturbances and noise inside the loop | reduced by $1 + GH$ |
| Stability | can improve **or worsen** — high loop gain with phase lag can cause oscillation |

**Components:** sensors (potentiometers, tachogenerators, encoders, synchros), actuators (DC/AC servomotors), error detectors and amplifiers.

## Worked examples

**Example 1.** $G = 100$, $H = 0.1$: $T = 100/11 = 9.09$ — close to $1/H = 10$ for large loop gain.

**Example 2.** The sensitivity to $G$ is $1/11 = 0.091$: a 10% change in $G$ changes $T$ by only about 0.9%.

## Common GATE traps

- Assuming feedback always improves stability.
- Forgetting that accuracy then depends on the sensor $H$.

## Summary

- $T = G/(1 + GH)$; for large loop gain, $T \approx 1/H$.
- Feedback reduces sensitivity and disturbances and increases bandwidth, at the cost of gain and possible instability.
