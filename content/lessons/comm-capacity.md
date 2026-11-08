# Mutual Information and Channel Capacity

> Mutual information, BSC capacity and the Shannon–Hartley theorem are frequently tested.

## Intuition

**Mutual information** $I(X;Y)$ measures how much observing the channel output $Y$ reduces your uncertainty about the input $X$. **Channel capacity** is the most information per use you can push through, maximised over input distributions. Shannon showed that error-free communication is possible at any rate below capacity, and impossible above it.

## Formal definitions

$$
I(X;Y) = H(X) - H(X|Y) = H(Y) - H(Y|X) = H(X) + H(Y) - H(X,Y) \ \ge 0,
$$
$$
C = \max_{p(x)}I(X;Y).
$$

## Key results

**Binary symmetric channel** (crossover probability $p$):
$$
C = 1 - H_b(p), \qquad H_b(p) = -p\log_2p - (1-p)\log_2(1-p).
$$
$C = 1$ at $p = 0$ or $p = 1$, and $C = 0$ at $p = 0.5$.

**Binary erasure channel** (erasure probability $\epsilon$): $C = 1 - \epsilon$.

**Shannon–Hartley** (AWGN, bandwidth $B$):
$$
C = B\log_2\left(1 + \frac{S}{N}\right)\ \text{bits/s}, \qquad N = N_0B .
$$
- As $B \to \infty$: $C \to \frac{S}{N_0}\log_2e \approx 1.44\frac{S}{N_0}$ (it saturates).
- **Shannon limit:** $E_b/N_0 \ge \ln2 = -1.59$ dB for reliable communication.
- Bandwidth and SNR can be traded against each other.

## Worked examples

**Example 1.** $B = 3$ kHz, SNR $= 1023$: $C = 3000\times10 = 30$ kbps.

**Example 2.** BSC with $p = 0.1$: $H_b = 0.469$, so $C = 0.531$ bits/use.

**Example 3.** An SNR of 30 dB ($= 1000$) over 1 MHz: $C \approx 10^6\log_21001 \approx 9.97$ Mbps.

## Common GATE traps

- Using SNR in dB inside the logarithm (convert to linear first).
- Expecting capacity to grow without bound with bandwidth.

## Summary

- $I(X;Y) = H(X) - H(X|Y)$; $C = \max I$.
- BSC: $1 - H_b(p)$. AWGN: $B\log_2(1 + S/N)$; Shannon limit $-1.6$ dB.
