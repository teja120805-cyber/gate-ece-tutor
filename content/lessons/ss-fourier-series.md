# Fourier Series

> Fourier series questions — coefficients, power via Parseval, harmonic content from symmetry — appear regularly and underpin sampling, modulation and PSD.

## Intuition

Any reasonable periodic signal is a sum of sinusoids at the **fundamental** $\omega_0 = 2\pi/T_0$ and its **harmonics** $k\omega_0$. The coefficient of each harmonic measures how much the signal "looks like" that sinusoid over one period.

## Formal definition

**Exponential form**
$$
x(t) = \sum_{k=-\infty}^{\infty} c_k\,e^{jk\omega_0 t}, \qquad c_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt .
$$

**Trigonometric form**: $x(t) = a_0 + \sum_{k\ge1}[a_k\cos k\omega_0 t + b_k\sin k\omega_0 t]$ with
$a_0 = c_0$ (the average), $a_k = 2\,\mathrm{Re}\,c_k$, $b_k = -2\,\mathrm{Im}\,c_k$.

For real $x$: $c_{-k} = c_k^*$, and the amplitude of the $k$-th harmonic is $2|c_k|$.

## Key results

**Parseval:** $P = \dfrac{1}{T_0}\int_{T_0}|x|^2dt = \sum_k |c_k|^2 = a_0^2 + \sum_{k\ge1}\dfrac{a_k^2 + b_k^2}{2}$.

**Symmetry shortcuts**

| Symmetry | Consequence |
|---|---|
| even $x(-t) = x(t)$ | $b_k = 0$ (cosines only), $c_k$ real |
| odd $x(-t) = -x(t)$ | $a_0 = a_k = 0$ (sines only), $c_k$ imaginary |
| half-wave $x(t + T_0/2) = -x(t)$ | only **odd** harmonics, $a_0 = 0$ |

**Standard series**
- Square wave ($\pm A$, odd symmetry): $x(t) = \dfrac{4A}{\pi}\left(\sin\omega_0 t + \tfrac13\sin3\omega_0 t + \tfrac15\sin5\omega_0 t + \cdots\right)$.
- Rectangular pulse train (height $A$, width $\tau$, period $T_0$, centred at 0): $c_k = \dfrac{A\tau}{T_0}\,\mathrm{sinc}\!\left(\dfrac{k\tau}{T_0}\right)$ with $\mathrm{sinc}(x) = \dfrac{\sin\pi x}{\pi x}$.
- Impulse train $\sum_n\delta(t - nT_0)$: $c_k = 1/T_0$ for all $k$.

**Properties:** time shift $x(t - t_0) \to c_k e^{-jk\omega_0 t_0}$ (magnitudes unchanged); differentiation $\to jk\omega_0 c_k$. Near a jump the partial sums overshoot by about 9% (**Gibbs phenomenon**).

## Worked examples

**Example 1.** $x(t) = 3 + 4\cos\omega_0 t + 2\sin 3\omega_0 t$: $P = 9 + 8 + 2 = 19$.

**Example 2.** 25%-duty pulse train, $A = 1$: $c_1 = 0.25\,\mathrm{sinc}(0.25) = \dfrac{\sin(\pi/4)}{\pi} \approx 0.225$, and $c_4 = 0.25\,\mathrm{sinc}(1) = 0$ (every 4th harmonic vanishes).

**Example 3.** The odd square wave $\pm1$ has third-harmonic amplitude $b_3 = \frac{4}{3\pi} \approx 0.424$.

## Common GATE traps

- Confusing $c_k$ with the harmonic amplitude $2|c_k|$.
- Using $\mathrm{sinc}(x) = \sin x / x$ when the question uses the normalised definition.
- Forgetting the DC term in Parseval's sum.

## Summary

- $c_k = \frac{1}{T_0}\int x e^{-jk\omega_0 t}dt$; real signals have $c_{-k} = c_k^*$.
- Parseval: power $= \sum|c_k|^2$.
- Even → cosines, odd → sines, half-wave symmetry → odd harmonics only.
