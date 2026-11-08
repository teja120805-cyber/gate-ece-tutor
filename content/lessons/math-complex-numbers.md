# Complex Numbers and Complex Exponentials

> The foundation for phasors, Fourier analysis, z-transforms and complex analysis. GATE uses polar form and Euler's formula constantly.

## Intuition

A complex number is a point (or arrow) in a plane. Multiplying two complex numbers **multiplies their lengths and adds their angles**. That is why rotations, oscillations and sinusoids are so natural with complex exponentials: $e^{j\theta}$ is a unit arrow at angle $\theta$.

## Formal definitions

$$
z = x + jy = r e^{j\theta} = r(\cos\theta + j\sin\theta), \qquad r = |z| = \sqrt{x^2 + y^2},\quad \theta = \arg z .
$$

Conjugate $z^* = x - jy = re^{-j\theta}$; $zz^* = |z|^2$.

## Key results

- **Euler:** $e^{j\theta} = \cos\theta + j\sin\theta$; $\cos\theta = \frac{e^{j\theta} + e^{-j\theta}}{2}$, $\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}$.
- **Multiplication/division:** $r_1r_2e^{j(\theta_1 + \theta_2)}$ and $\frac{r_1}{r_2}e^{j(\theta_1 - \theta_2)}$.
- **De Moivre:** $z^n = r^ne^{jn\theta}$.
- **n-th roots** of $w = Re^{j\phi}$: $R^{1/n}e^{j(\phi + 2\pi k)/n}$, $k = 0, \dots, n - 1$. They are equally spaced on a circle and sum to 0 (for $n \ge 2$).
- **Principal argument** in $(-\pi, \pi]$. Take care with the quadrant: $\arg(-1 - j) = -135°$, not $45°$.
- Special values: $j^2 = -1$, $e^{j\pi} = -1$, $e^{j\pi/2} = j$, $|e^{j\theta}| = 1$.

## Worked examples

**Example 1.** $|3 + 4j| = 5$; $\arg = \tan^{-1}(4/3) = 53.13°$.

**Example 2.** $(1 + j)^4 = (\sqrt2e^{j\pi/4})^4 = 4e^{j\pi} = -4$.

**Example 3.** $z = 2e^{j\pi/3}$: $z^2 = 4e^{j2\pi/3}$, $z^* = 2e^{-j\pi/3}$, $\operatorname{Re}z = 1$.

**Example 4.** The cube roots of 1 are $1, e^{j2\pi/3}, e^{j4\pi/3}$; their sum is 0.

## Common GATE traps

- Quadrant errors when computing $\arg$ with $\tan^{-1}$.
- Forgetting there are $n$ distinct $n$-th roots.

## Summary

- Polar form makes products, powers and roots easy.
- $e^{j\theta}$ is a unit rotation; cosine and sine are sums of exponentials.
