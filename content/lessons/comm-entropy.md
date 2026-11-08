# Entropy

> Information theory questions (entropy, information rate, capacity) are short and scoring. Entropy is the starting point for all of them.

## Intuition

**Information is surprise.** Being told that a near-certain event happened tells you almost nothing; learning that a rare event happened tells you a lot. So information should be large when probability is small, and the information from independent events should add — which leads to the logarithm.

**Entropy** is the *average* surprise of a source — the average number of bits per symbol that an ideal code needs.

## Formal definition

Self-information of a symbol with probability $p$:
$$
I = \log_2\frac{1}{p}\ \text{bits}.
$$

Entropy of a discrete memoryless source with probabilities $p_1, \dots, p_M$:
$$
H(X) = \sum_{i=1}^{M} p_i \log_2\frac{1}{p_i}\ \text{bits/symbol}.
$$

Information rate: $R = r\,H$ bits/s, where $r$ is the symbol rate.

## Key results

- $0 \le H \le \log_2 M$. The maximum occurs when all symbols are equally likely; $H = 0$ when one symbol is certain.
- **Binary entropy:** $H_b(p) = -p\log_2 p - (1-p)\log_2(1-p)$, maximum 1 bit at $p = 0.5$, symmetric about 0.5.
- **Extension:** for a memoryless source, $n$-symbol blocks have entropy $nH$.
- **Joint entropy** of independent sources adds: $H(X, Y) = H(X) + H(Y)$.
- **Source coding theorem:** the average codeword length satisfies $\bar L \ge H$; coding efficiency $= H/\bar L$. Huffman coding achieves $H \le \bar L < H + 1$.
- Units: $\log_2$ gives bits, $\ln$ gives nats ($1\ \text{nat} = 1.443$ bits).

## Visual picture

| $p$ | 0 | 0.1 | 0.25 | 0.5 | 0.75 | 0.9 | 1 |
|---|---|---|---|---|---|---|---|
| $H_b(p)$ (bits) | 0 | 0.469 | 0.811 | 1 | 0.811 | 0.469 | 0 |

## Worked examples

**Example 1.** Probabilities $\tfrac12, \tfrac14, \tfrac18, \tfrac18$:
$H = \tfrac12(1) + \tfrac14(2) + 2\cdot\tfrac18(3) = 1.75$ bits/symbol. At 1000 symbols/s, $R = 1750$ bits/s.
The Huffman code $\{0, 10, 110, 111\}$ has $\bar L = 1.75$ — 100% efficient, because every probability is a power of ½.

**Example 2.** A die: $H = \log_2 6 = 2.585$ bits.

**Example 3.** A binary source with $P(1) = 0.1$: $H = 0.469$ bits/symbol, so on average less than half a bit of information per binary digit.

## Common GATE traps

- **Mixing log bases** — use $\log_2$ unless the question says nats.
- **Information rate vs symbol rate** — multiply by $H$, not $\log_2 M$, unless the symbols are equiprobable.
- **Believing entropy can exceed $\log_2 M$** or be negative.

## Summary

- $I = \log_2(1/p)$; $H = \sum p\log_2(1/p)$; $R = rH$.
- $0 \le H \le \log_2 M$; maximum for equiprobable symbols.
- $H_b(0.5) = 1$ bit; source coding needs $\bar L \ge H$.
