# Definite Integrals and the Theorems of Integral Calculus

> Definite integrals appear directly in the Mathematics section and indirectly everywhere else — energy of signals, convolution, Fourier coefficients, probability, and average power.

## Intuition

$\int_a^b f(x)\,dx$ is the **signed area** between the curve and the x-axis from $a$ to $b$ — area above the axis counts positive, area below counts negative. It is also the **accumulated total** of a rate: integrating velocity gives displacement, and integrating current gives charge.

## Formal definition

For a continuous $f$ on $[a,b]$, the definite integral is the limit of Riemann sums:

$$
\int_a^b f(x)\,dx = \lim_{n\to\infty}\sum_{i=1}^{n} f(x_i^*)\,\Delta x, \qquad \Delta x = \frac{b-a}{n}.
$$

## Key results

**Fundamental theorem of calculus.**
1. If $F' = f$, then $\int_a^b f(x)\,dx = F(b) - F(a)$.
2. $\dfrac{d}{dx}\displaystyle\int_a^x f(t)\,dt = f(x)$.

**Leibniz rule** (variable limits):
$$
\frac{d}{dx}\int_{a(x)}^{b(x)} f(t)\,dt = f(b(x))\,b'(x) - f(a(x))\,a'(x).
$$

**Properties**

| Property | Statement |
|---|---|
| Reversing limits | $\int_a^b f = -\int_b^a f$ |
| Splitting | $\int_a^b f = \int_a^c f + \int_c^b f$ |
| King's rule | $\int_0^a f(x)\,dx = \int_0^a f(a - x)\,dx$ |
| Even function | $\int_{-a}^{a} f = 2\int_0^a f$ |
| Odd function | $\int_{-a}^{a} f = 0$ |
| Periodic, period $T$ | $\int_0^{nT} f = n\int_0^T f$ |

**Integration by parts:** $\int_a^b u\,dv = [uv]_a^b - \int_a^b v\,du$. Choose $u$ by **LIATE** order (Log, Inverse trig, Algebraic, Trig, Exponential).

**Integrals worth knowing by heart**

$$
\int_0^\infty e^{-at}\,dt = \frac{1}{a},\qquad
\int_0^\infty t^n e^{-at}\,dt = \frac{n!}{a^{n+1}},\qquad
\int_0^{\pi/2}\sin^2 x\,dx = \int_0^{\pi/2}\cos^2 x\,dx = \frac{\pi}{4}.
$$

**Integrals with a parameter.** In $\int_0^t f(t, \tau)\,d\tau$, the variable $t$ is a **constant** during integration. This is exactly the situation in convolution.

## Visual picture

$\int_{-1}^{2} x\,dx$: a triangle below the axis on $[-1, 0]$ (area $-\tfrac12$) plus a triangle above on $[0, 2]$ (area $+2$). Net $= 1.5$, which matches $[x^2/2]_{-1}^{2} = 2 - 0.5$.

## Worked examples

**Example 1.** $\int_0^1 t\,e^{t}\,dt$. Use parts with $u = t$, $dv = e^t\,dt$:
$[t e^t]_0^1 - \int_0^1 e^t\,dt = e - (e - 1) = 1.$

**Example 2.** $\int_{-\pi}^{\pi} x^2 \sin x\,dx = 0$, because $x^2$ is even and $\sin x$ is odd, so the integrand is odd.

**Example 3 (the convolution integral).** $g(t) = \int_0^t e^{-(t-\tau)}\,d\tau$.
Since $e^{-(t-\tau)} = e^{-t}e^{\tau}$ and $e^{-t}$ is constant in $\tau$:
$g(t) = e^{-t}\,[e^{\tau}]_0^t = e^{-t}(e^t - 1) = 1 - e^{-t}$. At $t = 1$, $g = 0.632$.

**Example 4 (King's rule).** $I = \int_0^{\pi/2} \dfrac{\sin x}{\sin x + \cos x}\,dx$. Replacing $x \to \pi/2 - x$ swaps sin and cos; adding the two forms gives $2I = \int_0^{\pi/2} 1\,dx = \pi/2$, so $I = \pi/4$.

## Common GATE traps

- **Treating the parameter as the variable** in $\int_0^t f(t-\tau)\,d\tau$.
- **Applying the even-function rule to non-even functions.**
- **Sign errors when the curve dips below the axis** — the integral gives *signed* area; total geometric area needs $|f|$.

## Summary

- $\int_a^b f = F(b) - F(a)$; $\frac{d}{dx}\int_a^x f = f(x)$; Leibniz rule for variable limits.
- Use symmetry (even/odd, King's rule) before grinding.
- In parametric integrals, the outer variable is a constant.
