# Residue Theorem

> Residues evaluate contour integrals, and many real integrals, quickly. Asked frequently in GATE.

## Intuition

Near an isolated singularity, a function's Laurent series has a $\frac{c_{-1}}{z - a}$ term. Around a loop, every other term integrates to zero, so only $c_{-1}$ — the **residue** — survives, contributing $2\pi j\,c_{-1}$.

## Formal statement

If $f$ is analytic inside and on $C$ except at isolated singularities $a_1, \dots, a_k$ inside $C$:
$$
\oint_C f(z)\,dz = 2\pi j\sum_{i}\operatorname{Res}_{z = a_i}f(z).
$$

## Computing residues

| Pole type | Formula |
|---|---|
| simple pole at $a$ | $\lim_{z\to a}(z - a)f(z)$ |
| $f = p/q$, simple zero of $q$ at $a$ | $\dfrac{p(a)}{q'(a)}$ |
| pole of order $m$ | $\dfrac{1}{(m-1)!}\lim_{z\to a}\dfrac{d^{m-1}}{dz^{m-1}}\big[(z - a)^mf(z)\big]$ |
| any (essential included) | the coefficient $c_{-1}$ of the Laurent series |

## Real integrals

For a rational $R(x)$ with denominator degree at least 2 more than the numerator, and no real poles:
$$
\int_{-\infty}^{\infty}R(x)\,dx = 2\pi j\sum \text{residues in the upper half-plane}.
$$

## Worked examples

**Example 1.** $\operatorname{Res}_{z=0}\dfrac{e^z}{z^2}$: $\dfrac{e^z}{z^2} = \dfrac{1}{z^2} + \dfrac{1}{z} + \cdots$ ⇒ residue 1.

**Example 2.** $\operatorname{Res}_{z=j}\dfrac{1}{z^2 + 1} = \dfrac{1}{2j} = -\dfrac{j}{2}$.

**Example 3.** $\displaystyle\int_{-\infty}^{\infty}\frac{dx}{x^2 + 1} = 2\pi j\cdot\frac{1}{2j} = \pi$.

**Example 4.** $\oint_{|z|=2}\dfrac{dz}{z(z - 1)}$: the residues are $-1$ (at 0) and $+1$ (at 1), so the integral is $2\pi j(0) = 0$.

## Common GATE traps

- Including poles that lie outside the contour.
- Using the simple-pole formula on a higher-order pole.

## Summary

- $\oint f = 2\pi j\sum$ (residues inside).
- Simple pole: $\lim(z - a)f$ or $p/q'$; higher order: derivative formula; otherwise read $c_{-1}$.
