# Binomial and Poisson Distributions

> Bit-error counts, defective items and arrivals per interval are modelled with these distributions. Expect direct probability calculations.

## Intuition

- **Binomial:** count the successes in $n$ independent tries, each succeeding with probability $p$.
- **Poisson:** count rare events in a fixed interval when they occur at an average rate $\lambda$ — the limit of the binomial for many trials with a tiny $p$.

## Formal definitions

$$
\text{Binomial: } P(X = k) = \binom nk p^k(1 - p)^{n-k},\quad E = np,\ \operatorname{Var} = np(1 - p).
$$
$$
\text{Poisson: } P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!},\quad E = \operatorname{Var} = \lambda .
$$

## Key results

- Poisson approximation to the binomial: $n$ large, $p$ small, $\lambda = np$ moderate.
- The sum of independent Poissons is Poisson with $\lambda_1 + \lambda_2$.
- Binomial variance is less than its mean; Poisson variance equals its mean.
- The mode of a binomial is near $np$.

## Worked examples

**Example 1.** $\text{Bin}(10, 0.3)$: mean 3, variance 2.1.

**Example 2.** $\text{Bin}(4, 0.5)$: $P(X = 2) = 6/16 = 0.375$.

**Example 3.** Poisson with $\lambda = 2$: $P(0) = e^{-2} = 0.135$.

**Example 4.** Poisson with $\lambda = 3$: $P(X \le 1) = e^{-3}(1 + 3) = 0.199$.

**Example 5.** 1000 bits with error probability 0.002: approximately Poisson with $\lambda = 2$, so $P(\text{no error}) \approx e^{-2} = 0.135$.

## Common GATE traps

- Using the binomial when trials are not independent (sampling without replacement — use the hypergeometric).
- Confusing $\lambda$ with the rate per unit time — scale it to the interval asked about.

## Summary

- Binomial: $\binom nkp^kq^{n-k}$, mean $np$, variance $npq$.
- Poisson: $e^{-\lambda}\lambda^k/k!$, mean = variance = $\lambda$; it approximates the binomial when $p$ is small.
