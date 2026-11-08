# The z-Transform and Region of Convergence

> z-transform pairs, ROC reasoning and inverse transforms appear every year, often as "which sequence has this $X(z)$ and ROC?".

## Intuition

The z-transform generalises the DTFT by adding a decay or growth factor: with $z = re^{j\omega}$, it computes the DTFT of $x[n]r^{-n}$. That lets us handle growing sequences. The **ROC** — the values of $|z|$ where the sum converges — is part of the answer: the same algebraic $X(z)$ can describe different sequences with different ROCs.

## Formal definition

$$
X(z) = \sum_{n=-\infty}^{\infty}x[n]\,z^{-n}.
$$

## ROC rules

- The ROC is a ring $r_1 < |z| < r_2$ and contains no poles.
- Right-sided sequence ⇒ $|z| > $ the outermost pole (it includes $\infty$ if the sequence is causal).
- Left-sided ⇒ $|z| < $ the innermost pole.
- Two-sided ⇒ an annulus between poles.
- Finite-length ⇒ the whole plane, except possibly $z = 0$ and/or $z = \infty$.
- The DTFT exists ⇔ the ROC contains the unit circle.

## Key pairs

| $x[n]$ | $X(z)$ | ROC |
|---|---|---|
| $\delta[n]$ | $1$ | all $z$ |
| $u[n]$ | $\dfrac{1}{1 - z^{-1}}$ | $|z| > 1$ |
| $a^n u[n]$ | $\dfrac{1}{1 - az^{-1}}$ | $|z| > |a|$ |
| $-a^n u[-n-1]$ | $\dfrac{1}{1 - az^{-1}}$ | $|z| < |a|$ |
| $na^n u[n]$ | $\dfrac{az^{-1}}{(1 - az^{-1})^2}$ | $|z| > |a|$ |
| $r^n\cos(\omega_0 n)u[n]$ | $\dfrac{1 - r\cos\omega_0 z^{-1}}{1 - 2r\cos\omega_0 z^{-1} + r^2z^{-2}}$ | $|z| > r$ |

## Key properties

Shift $x[n - k] \to z^{-k}X(z)$; scaling $a^n x[n] \to X(z/a)$; $n\,x[n] \to -z\,\frac{dX}{dz}$; convolution → product.
Initial value (causal): $x[0] = \lim_{z\to\infty}X(z)$. Final value: $\lim_{n\to\infty}x[n] = \lim_{z\to1}(1 - z^{-1})X(z)$, valid when the poles of $(1 - z^{-1})X$ are inside the unit circle.

**Inverse transform:** partial fractions in $z^{-1}$, then match each term to a pair using the ROC; or long division for a few samples.

## Worked examples

**Example 1.** $x[n] = (0.5)^n u[n] - 2^n u[-n-1]$: $X(z) = \frac{1}{1 - 0.5z^{-1}} + \frac{1}{1 - 2z^{-1}}$, ROC $0.5 < |z| < 2$.

**Example 2.** $X(z) = \frac{2 + z^{-1}}{1 - 0.5z^{-1}}$ (causal): $x[0] = 2$.

**Example 3.** $X(z) = \frac{1}{(1 - 0.5z^{-1})(1 - 0.25z^{-1})}$ (causal): multiplying the series gives $x[0] = 1$, $x[1] = 0.5 + 0.25 = 0.75$.

**Example 4.** $X(z) = \frac{1}{(1 - z^{-1})(1 - 0.5z^{-1})}$: final value $= \frac{1}{1 - 0.5} = 2$.

## Common GATE traps

- Giving a sequence without considering the ROC.
- Applying the final value theorem when there is a pole outside (or a repeated pole on) the unit circle.
- Mixing powers of $z$ and $z^{-1}$ during partial fractions.

## Summary

- $X(z) = \sum x[n]z^{-n}$, and the ROC is part of the transform.
- Right-sided: outside the outermost pole; left-sided: inside the innermost; stable: contains $|z| = 1$.
- Initial value at $z \to \infty$; final value via $(1 - z^{-1})X(z)$ at $z = 1$.
