# Discrete-Time Convolution

> GATE often asks for one output sample, the output length, or a full short sequence. With the right bookkeeping these take under a minute.

## Intuition

Exactly as in continuous time: each input sample $x[k]$ launches a scaled, delayed copy $x[k]\,h[n-k]$ of the impulse response, and the output adds all the copies. Integrals become sums.

## Formal definition

$$
y[n] = (x * h)[n] = \sum_{k=-\infty}^{\infty} x[k]\,h[n-k] = \sum_{k=-\infty}^{\infty} h[k]\,x[n-k].
$$

For each output index $n$, sum the products of pairs whose indices add up to $n$.

## Methods

**1. Polynomial multiplication (fastest for short sequences).** Treat the sequences as coefficient lists and multiply. The power of the variable tracks the index:
$x = \{1, 2, 3\}$, $h = \{1, 1\}$ → $(1 + 2z^{-1} + 3z^{-2})(1 + z^{-1}) = 1 + 3z^{-1} + 5z^{-2} + 3z^{-3}$ → $y = \{1, 3, 5, 3\}$.

**2. Tabular / sliding method.** Write $x[k]$ along one row; write $h$ reversed beneath it and slide one step at a time; each output sample is the sum of the overlapping products.

**3. Formula method** for closed-form sequences (geometric sums).

## Key results

- **Starting index:** $n_{\text{start}} = n_{x,\text{start}} + n_{h,\text{start}}$.
- **Length:** $L_y = L_x + L_h - 1$.
- **Sum property:** $\sum_n y[n] = \left(\sum_n x[n]\right)\left(\sum_n h[n]\right)$ — a quick check.
- $x[n] * \delta[n - n_0] = x[n - n_0]$.
- **Step response** $= \sum_{k=-\infty}^{n} h[k]$ (running sum of $h$).
- **Geometric sum:** $\displaystyle\sum_{k=0}^{n} a^k = \frac{1 - a^{n+1}}{1 - a}$, $a \ne 1$.

## Visual picture

Tabular computation of $x = \{1, -1, 2\}$ ($n = -1, 0, 1$) and $h = \{2, 1\}$ ($n = 0, 1$):

| $n$ | products | $y[n]$ |
|---|---|---|
| −1 | $1\cdot2$ | 2 |
| 0 | $(-1)\cdot2 + 1\cdot1$ | −1 |
| 1 | $2\cdot2 + (-1)\cdot1$ | 3 |
| 2 | $2\cdot1$ | 2 |

Check: $\sum y = 6 = (2)(3)$ ✓; length $3 + 2 - 1 = 4$ ✓; start index $-1 + 0 = -1$ ✓.

## Worked examples

**Example 1.** $x[n] = u[n]$, $h[n] = (0.5)^n u[n]$. For $n \ge 0$:
$$
y[n] = \sum_{k=0}^{n} (0.5)^k = \frac{1 - 0.5^{n+1}}{0.5} = 2 - 0.5^{n}.
$$
So $y[2] = 2 - 0.25 = 1.75$, and $y[n] \to 2$ as $n \to \infty$.

**Example 2.** $x[n] = a^n u[n]$, $h[n] = b^n u[n]$ with $a \ne b$:
$$
y[n] = \sum_{k=0}^{n} a^k b^{n-k} = \frac{b^{n+1} - a^{n+1}}{b - a}\,u[n].
$$

**Example 3.** A length-5 sequence convolved with a length-4 sequence has length 8.

## Common GATE traps

- **Losing track of the time origin.** Always compute the starting index first.
- **Linear vs circular convolution.** DFT-based (circular) convolution of length $N$ wraps around; it equals linear convolution only if $N \ge L_x + L_h - 1$.
- **Off-by-one lengths:** $L_x + L_h - 1$, not $L_x + L_h$.

## Summary

- $y[n] = \sum_k x[k]h[n-k]$ — products of index pairs adding to $n$.
- Start index adds; length $= L_x + L_h - 1$; sum of $y$ = product of sums.
- Polynomial multiplication is the fastest hand method.
