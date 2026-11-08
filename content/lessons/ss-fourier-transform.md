# The Fourier Transform and Its Properties

> The CTFT is the language of filters, modulation and sampling. Most GATE questions are solved with a small table of pairs plus the properties — not by integrating.

## Intuition

A non-periodic signal can be seen as a periodic one whose period has grown to infinity: the harmonics merge into a continuous spectrum $X(\omega)$. $|X(\omega)|$ says how much of frequency $\omega$ the signal contains; $\angle X(\omega)$ says how that component is shifted in time.

## Formal definition

$$
X(\omega) = \int_{-\infty}^{\infty}x(t)\,e^{-j\omega t}\,dt, \qquad x(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty}X(\omega)\,e^{j\omega t}\,d\omega .
$$

## Key pairs

| $x(t)$ | $X(\omega)$ |
|---|---|
| $\delta(t)$ | $1$ |
| $1$ | $2\pi\delta(\omega)$ |
| $e^{-at}u(t)$, $a>0$ | $\dfrac{1}{a + j\omega}$ |
| $e^{-a|t|}$ | $\dfrac{2a}{a^2 + \omega^2}$ |
| $\mathrm{rect}(t/\tau)$ (width $\tau$) | $\tau\,\dfrac{\sin(\omega\tau/2)}{\omega\tau/2}$ |
| $\dfrac{\sin Wt}{\pi t}$ | $\mathrm{rect}\!\left(\dfrac{\omega}{2W}\right)$ (1 for $|\omega| < W$) |
| $e^{j\omega_0 t}$ | $2\pi\delta(\omega - \omega_0)$ |
| $\cos\omega_0 t$ | $\pi[\delta(\omega - \omega_0) + \delta(\omega + \omega_0)]$ |
| $\mathrm{sgn}(t)$ | $\dfrac{2}{j\omega}$ |
| $u(t)$ | $\pi\delta(\omega) + \dfrac{1}{j\omega}$ |

## Key properties

| Property | $x(t)$ | $X(\omega)$ |
|---|---|---|
| Time shift | $x(t - t_0)$ | $e^{-j\omega t_0}X(\omega)$ |
| Frequency shift | $e^{j\omega_0 t}x(t)$ | $X(\omega - \omega_0)$ |
| Scaling | $x(at)$ | $\frac{1}{|a|}X(\omega/a)$ |
| Duality | $X(t)$ | $2\pi\,x(-\omega)$ |
| Convolution | $x * h$ | $X H$ |
| Multiplication | $x\,h$ | $\frac{1}{2\pi}X * H$ |
| Differentiation | $dx/dt$ | $j\omega X$ |
| Modulation | $x(t)\cos\omega_0 t$ | $\frac12[X(\omega - \omega_0) + X(\omega + \omega_0)]$ |

**Values and energy:** $X(0) = \int x\,dt$; $x(0) = \frac{1}{2\pi}\int X\,d\omega$; Parseval $\int|x|^2dt = \frac{1}{2\pi}\int|X|^2d\omega$.
**Symmetry:** real $x$ ⇒ $X(-\omega) = X^*(\omega)$; real and even ⇒ $X$ real and even; real and odd ⇒ $X$ imaginary and odd.

## Worked examples

**Example 1.** A rectangular pulse of height 3 and width 2: $X(0) = $ area $= 6$.

**Example 2.** $x(t) = e^{-t}u(t)$: $E = 1/2$, so $\int|X|^2d\omega = 2\pi E = \pi$.

**Example 3.** $x(t) = e^{-2(t-1)}u(t - 1)$: $X(\omega) = \dfrac{e^{-j\omega}}{2 + j\omega}$.

**Example 4 (duality).** $\mathrm{rect}$ ↔ sinc, so sinc ↔ rect: an ideal low-pass filter has a sinc impulse response.

## Common GATE traps

- Mixing up $\omega$ and $f$ conventions — with $f$ the $2\pi$ factors move ($\cos 2\pi f_0 t \leftrightarrow \frac12[\delta(f - f_0) + \delta(f + f_0)]$).
- The $\frac{1}{|a|}$ in scaling: compress in time ⇔ expand in frequency.
- Forgetting $\frac{1}{2\pi}$ in the multiplication property and in Parseval's theorem.

## Summary

- Learn the table; derive everything else with properties.
- Convolution ↔ multiplication; shifts ↔ linear phase; compression ↔ spectral spreading.
- $X(0)$ is the area; Parseval links time and frequency energy.
