# Cauchy's Integral Theorem and Formula

> Contour integrals are evaluated in seconds with these results — a favourite 1- and 2-mark topic.

## Intuition

For an analytic function, the integral around a closed loop is zero: there is nothing inside to "catch". When the integrand has a singularity inside the loop, the integral captures information about the function **at that point** — its value, or its derivatives.

## Formal statements

**Cauchy's theorem:** if $f$ is analytic inside and on a simple closed contour $C$, then
$$
\oint_C f(z)\,dz = 0 .
$$

**Cauchy's integral formula:** if $f$ is analytic inside and on $C$ and $a$ is inside $C$ (counter-clockwise), then
$$
\oint_C \frac{f(z)}{z - a}\,dz = 2\pi j\,f(a), \qquad \oint_C\frac{f(z)}{(z - a)^{n+1}}\,dz = \frac{2\pi j}{n!}f^{(n)}(a) .
$$

## Key results

- If $a$ is **outside** $C$, the integrand is analytic inside, so the integral is 0.
- $\oint_{|z|=r}\dfrac{dz}{z} = 2\pi j$; $\oint\dfrac{dz}{z^n} = 0$ for $n \ne 1$.
- For several singularities inside $C$, use partial fractions or the residue theorem.
- A clockwise contour flips the sign.

## Worked examples

**Example 1.** $\dfrac{1}{2\pi j}\oint_{|z|=1}\dfrac{e^z}{z}dz = e^0 = 1$.

**Example 2.** $\dfrac{1}{2\pi j}\oint_{|z|=3}\dfrac{z^2 + 1}{z - 2}dz = 2^2 + 1 = 5$.

**Example 3.** $\dfrac{1}{2\pi j}\oint_{|z|=1}\dfrac{e^{2z}}{z^2}dz = \dfrac{d}{dz}e^{2z}\Big|_0 = 2$.

**Example 4.** $\oint_{|z|=1}\dfrac{dz}{z - 3} = 0$, because $z = 3$ is outside the unit circle.

## Common GATE traps

- Forgetting the $n!$ in the derivative formula.
- Not checking whether the singular point lies inside the contour.
- Leaving a factor inside $f$ that is itself singular inside $C$.

## Summary

- Analytic inside ⇒ the integral is 0.
- $\oint\frac{f}{z - a} = 2\pi jf(a)$; $\oint\frac{f}{(z - a)^{n+1}} = \frac{2\pi j}{n!}f^{(n)}(a)$.
