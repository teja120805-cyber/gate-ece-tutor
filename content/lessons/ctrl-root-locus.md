# Root Locus

> Asymptotes, centroid, breakaway points and $j\omega$-axis crossings are frequent questions.

## Intuition

As the loop gain $K$ rises from 0 to ∞, the closed-loop poles move through the s-plane. The root locus is the map of those paths. It shows at a glance how gain affects stability and transient response.

## Construction rules for $1 + KG(s)H(s) = 0$ ($n$ poles, $m$ zeros)

1. **Start/end:** branches start at the open-loop poles ($K = 0$) and end at the open-loop zeros or at infinity ($K \to \infty$). There are $n$ branches.
2. **Symmetry:** symmetric about the real axis.
3. **Real axis:** a point is on the locus if the total number of real poles and zeros **to its right** is odd.
4. **Asymptotes:** $n - m$ of them, at angles $\dfrac{(2q + 1)180°}{n - m}$, meeting at the centroid $\sigma_A = \dfrac{\sum p_i - \sum z_j}{n - m}$.
5. **Breakaway/break-in points:** solve $dK/ds = 0$ (keep the roots that lie on the locus).
6. **$j\omega$-axis crossing:** from the Routh array (the $K$ that makes a row zero) or by substituting $s = j\omega$.
7. **Angles of departure/arrival** at complex poles/zeros: from the angle condition.
8. **Angle condition:** $\angle KG(s)H(s) = \pm180°(2q + 1)$. **Magnitude condition:** $K = \dfrac{1}{|G(s)H(s)|}$.

## Worked examples

**Example 1.** $G = \dfrac{K}{s(s + 2)(s + 4)}$: 3 asymptotes at 60°, 180°, 300°; centroid $\frac{0 - 2 - 4}{3} = -2$.

**Example 2.** Breakaway for $G = \dfrac{K}{s(s + 2)}$: $K = -s^2 - 2s$, $dK/ds = -2s - 2 = 0$ ⇒ $s = -1$.

**Example 3.** The $j\omega$ crossing for Example 1: $s^3 + 6s^2 + 8s + K$; Routh: $(48 - K)/6 = 0$ ⇒ $K = 48$, with $\omega = \sqrt8 = 2.83$ rad/s.

## Common GATE traps

- The real-axis rule counts poles **and** zeros to the right.
- Asymptote angles use $n - m$, not $n$.

## Summary

- $n$ branches from the poles to the zeros or infinity; real-axis segments to the left of an odd count.
- Asymptotes: $(2q + 1)180°/(n - m)$ from $\sigma_A$; breakaway from $dK/ds = 0$; $j\omega$ crossing from Routh.
