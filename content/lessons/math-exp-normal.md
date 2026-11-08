# Exponential and Normal Distributions

> The exponential models waiting times and lifetimes; the normal (Gaussian) models noise. Both are central to probability and communications questions.

## Intuition

- **Exponential:** the time until the next random event when events occur at a constant rate. It is **memoryless** — having waited already does not change the remaining wait.
- **Normal:** the bell curve. The sum of many small independent effects tends to be Gaussian (central limit theorem), which is why thermal noise is Gaussian.

## Formal definitions

**Exponential** with rate $\lambda$: $f(x) = \lambda e^{-\lambda x}$ for $x \ge 0$, $F(x) = 1 - e^{-\lambda x}$, $P(X > x) = e^{-\lambda x}$, mean $1/\lambda$, variance $1/\lambda^2$.

**Normal** $N(\mu, \sigma^2)$: $f(x) = \dfrac{1}{\sigma\sqrt{2\pi}}e^{-(x - \mu)^2/2\sigma^2}$.
Standardise with $Z = (X - \mu)/\sigma \sim N(0, 1)$; $\Phi(z) = P(Z \le z)$ and $Q(z) = 1 - \Phi(z)$.

## Key results

- Memoryless property: $P(X > s + t \mid X > s) = P(X > t)$.
- Normal: symmetric about $\mu$; mean = median = mode.
- Rule of thumb: $P(|Z| < 1) \approx 0.683$, $P(|Z| < 2) \approx 0.954$, $P(|Z| < 3) \approx 0.997$.
- $Q(-z) = 1 - Q(z)$; $Q(0) = 0.5$.
- A linear combination of independent normals is normal: means add, variances add (with squared coefficients).

## Worked examples

**Example 1.** $\lambda = 0.5$: $P(X > 2) = e^{-1} \approx 0.368$.

**Example 2.** Bulb lifetimes are exponential with mean 1000 h. $P(\text{lasts beyond } 1500\text{ h} \mid \text{survived } 500\text{ h}) = P(X > 1000) = e^{-1}$.

**Example 3.** $X \sim N(50, 10^2)$: $P(X > 70) = Q(2) = 1 - 0.9772 = 0.0228$.

**Example 4.** $X \sim N(0, 1)$ and $Y \sim N(0, 4)$ independent: $X + Y \sim N(0, 5)$.

## Common GATE traps

- Using the mean instead of the rate in $e^{-\lambda x}$.
- Mixing up $\sigma$ and $\sigma^2$ in $N(\mu, \sigma^2)$ notation.

## Summary

- Exponential: $P(X > x) = e^{-\lambda x}$, mean $1/\lambda$, memoryless.
- Normal: standardise to $Z$; use $\Phi$ and $Q$; 68–95–99.7 rule.
