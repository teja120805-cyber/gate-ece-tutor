# Improper Integrals

> Convergence of $\int x^{-p}$ and the Gamma and Gaussian integrals are the main tested ideas.

## Intuition

An integral is **improper** when its range is infinite or the integrand blows up inside the range. We define it as a limit. It **converges** if that limit is finite — the "area" stays finite even though the region is unbounded.

## Formal definitions

$$
\int_a^\infty f(x)\,dx = \lim_{b\to\infty}\int_a^b f(x)\,dx, \qquad \int_0^1 f(x)\,dx = \lim_{\varepsilon\to0^+}\int_\varepsilon^1 f(x)\,dx \ \ (f \text{ singular at } 0).
$$

For $\int_{-\infty}^{\infty}$, split at a point; **both** halves must converge.

## Key results

**p-tests**
$$
\int_1^\infty \frac{dx}{x^p} \text{ converges} \iff p > 1, \qquad \int_0^1 \frac{dx}{x^p} \text{ converges} \iff p < 1 .
$$

**Comparison test:** if $0 \le f \le g$ and $\int g$ converges, so does $\int f$. If $\int f$ diverges, so does $\int g$. **Limit comparison** with $x^{-p}$ handles rational functions.

**Gamma function:** $\Gamma(n) = \int_0^\infty x^{n-1}e^{-x}\,dx$, with $\Gamma(n + 1) = n\Gamma(n)$, $\Gamma(n + 1) = n!$ for integers, and $\Gamma(\tfrac12) = \sqrt\pi$.

**Gaussian:** $\int_{-\infty}^{\infty}e^{-x^2}dx = \sqrt\pi$; $\int_{-\infty}^{\infty}e^{-ax^2}dx = \sqrt{\pi/a}$.

**Others:** $\int_0^\infty e^{-ax}dx = 1/a$; $\int_{-\infty}^{\infty}\frac{dx}{1 + x^2} = \pi$; $\int_0^\infty \frac{\sin x}{x}dx = \frac{\pi}{2}$.

## Worked examples

**Example 1.** $\int_1^\infty x^{-2}dx = [-1/x]_1^\infty = 1$ (converges); $\int_1^\infty x^{-1}dx = \lim\ln b = \infty$ (diverges).

**Example 2.** $\int_0^1 x^{-1/2}dx = [2\sqrt x]_0^1 = 2$.

**Example 3.** $\int_0^\infty x\,e^{-x}dx = \Gamma(2) = 1$; $\int_0^\infty x^3e^{-2x}dx = \frac{3!}{2^4} = 0.375$.

## Common GATE traps

- Treating $\int_{-1}^{1}dx/x$ as 0 by symmetry — it diverges (non-integrable singularity at 0).
- Mixing up the direction of the p-test at 0 versus at ∞.

## Summary

- Improper = limit of proper integrals; converges if the limit is finite.
- $x^{-p}$: converges at ∞ iff $p > 1$, at 0 iff $p < 1$.
- $\Gamma(n+1) = n!$; $\int e^{-x^2} = \sqrt\pi$.
