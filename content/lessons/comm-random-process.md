# Random Processes and Autocorrelation

> Wide-sense stationarity, autocorrelation properties and the random-phase sinusoid are core Communications material.

## Intuition

A random process is a random signal — an ensemble of possible waveforms, such as noise voltages. We cannot predict a single waveform, but we can describe its statistics: its average, and how strongly values at two different times are related (the **autocorrelation**). If those statistics don't change with time, the process is **stationary**.

## Formal definitions

- Mean: $\mu_X(t) = E[X(t)]$.
- Autocorrelation: $R_X(t_1, t_2) = E[X(t_1)X(t_2)]$.
- **Wide-sense stationary (WSS):** the mean is constant and $R_X$ depends only on $\tau = t_1 - t_2$: $R_X(\tau) = E[X(t + \tau)X(t)]$.
- **Ergodic:** time averages equal ensemble averages, so one long recording reveals the statistics.

## Properties of $R_X(\tau)$ (WSS)

- $R_X(0) = E[X^2]$ = average power.
- $R_X(-\tau) = R_X(\tau)$ (even).
- $|R_X(\tau)| \le R_X(0)$.
- If $X$ has non-zero mean and no periodic component, $R_X(\infty) = \mu_X^2$.
- Periodic components in $X$ give periodic components in $R_X$.

## Key examples

- **Random-phase sinusoid** $X(t) = A\cos(\omega_0t + \Theta)$, $\Theta \sim U[0, 2\pi)$: mean 0, $R_X(\tau) = \frac{A^2}{2}\cos\omega_0\tau$, power $A^2/2$. It is WSS.
- **Cross-correlation** $R_{XY}(\tau)$; uncorrelated means $E[XY] = E[X]E[Y]$.
- **Gaussian process:** WSS implies strictly stationary, and linear filtering keeps it Gaussian.

## Worked examples

**Example 1.** $A = 2$: $R_X(0) = 2$ W.

**Example 2.** $R_X(\tau) = 4e^{-|\tau|} + 9$: power $= R(0) = 13$; the mean squared is $R(\infty) = 9$, so $|\mu| = 3$ and the variance is 4.

## Common GATE traps

- Assuming that a constant mean alone means WSS.
- Forgetting that a DC component shows up as a constant in $R_X(\tau)$.

## Summary

- WSS: constant mean, $R_X(\tau)$ depends only on the lag.
- $R(0)$ = power; $R$ is even and maximal at 0; $R(\infty) = \mu^2$.
