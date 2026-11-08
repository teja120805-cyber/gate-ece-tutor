# DFT and FFT

> GATE asks for DFT values of short sequences, circular convolution, DFT symmetry, and FFT operation counts.

## Intuition

The DTFT is continuous in $\omega$ — impossible to store. The DFT takes $N$ equally spaced samples of it, at $\omega_k = 2\pi k/N$. Sampling in frequency makes the time sequence implicitly **periodic with period $N$**, which is why DFT shifts and convolutions are **circular**.

## Formal definition

$$
X[k] = \sum_{n=0}^{N-1}x[n]\,W_N^{kn}, \qquad x[n] = \frac{1}{N}\sum_{k=0}^{N-1}X[k]\,W_N^{-kn}, \qquad W_N = e^{-j2\pi/N}.
$$

Useful values: $W_N^{N/2} = -1$, $W_4 = -j$, $W_N^{k+N} = W_N^k$.

## Key results

- $X[0] = \sum x[n]$; for even $N$, $X[N/2] = \sum (-1)^n x[n]$.
- **Real input:** $X[N - k] = X^*[k]$; $X[0]$ and $X[N/2]$ are real.
- Parseval: $\sum|x[n]|^2 = \frac{1}{N}\sum|X[k]|^2$.
- Circular shift: $x[(n - m)_N] \to W_N^{km}X[k]$.
- **Circular convolution** of length $N$ ↔ $X[k]H[k]$. It equals linear convolution only if $N \ge L_x + L_h - 1$; otherwise the tail **wraps around** onto the start.
- Zero padding samples the same DTFT more finely; it does **not** improve true resolution. Resolution is $\Delta f = f_s/N$ over the actual data length.
- **Complexity:** a direct DFT needs $N^2$ complex multiplications; radix-2 FFT needs $\frac{N}{2}\log_2N$ multiplications and $N\log_2N$ additions, using $\log_2N$ stages of $N/2$ butterflies. Decimation in time needs bit-reversed input order.

## Worked examples

**Example 1.** 4-point DFT of $\delta[n]$: $\{1, 1, 1, 1\}$.

**Example 2.** $x = \{1, 2, 3, 4\}$: $X[0] = 10$, $X[2] = 1 - 2 + 3 - 4 = -2$,
$X[1] = 1 + 2(-j) + 3(-1) + 4(j) = -2 + 2j$, $X[3] = X^*[1] = -2 - 2j$.

**Example 3.** 3-point circular convolution of $\{1, 2, 3\}$ and $\{1, 1, 0\}$: the linear result $\{1, 3, 5, 3\}$ wraps its last sample onto index 0, giving $\{4, 3, 5\}$.

**Example 4.** $N = 1024$: FFT uses $512 \times 10 = 5120$ multiplications versus $1{,}048{,}576$ directly.

## Common GATE traps

- Forgetting the $1/N$ in the inverse DFT or in Parseval's theorem.
- Treating circular convolution as linear.
- Confusing the symmetry $X[N - k] = X^*[k]$ with $X[-k]$ in the DTFT sense — they are the same thing modulo $N$.

## Summary

- The DFT samples the DTFT at $2\pi k/N$; everything is modulo $N$.
- Real input ⇒ conjugate symmetry; $X[0] = \sum x$.
- Linear convolution via DFT needs $N \ge L_x + L_h - 1$; FFT cost is $\frac{N}{2}\log_2N$.
