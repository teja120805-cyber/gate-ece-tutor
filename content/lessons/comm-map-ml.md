# MAP and ML Detection

> Decision thresholds for binary signals in Gaussian noise, with equal or unequal priors.

## Intuition

The receiver sees a noisy value $r$ and must decide which symbol was sent.
- **MAP** (maximum a posteriori): choose the symbol most likely **given** $r$ — the posterior. This minimises the error probability.
- **ML** (maximum likelihood): choose the symbol under which $r$ is most likely (ignoring priors). With equal priors, ML = MAP.

## Decision rules

$$
\text{MAP: } \hat s = \arg\max_i P(s_i)\,p(r|s_i), \qquad \text{ML: } \hat s = \arg\max_i p(r|s_i).
$$

**Binary signals $s_1 > s_0$ in Gaussian noise (variance $\sigma^2$):** decide $s_1$ when $r > \gamma$, with
$$
\gamma = \frac{s_0 + s_1}{2} + \frac{\sigma^2}{s_1 - s_0}\ln\frac{P(s_0)}{P(s_1)}.
$$

- Equal priors: $\gamma$ is the **midpoint**. For antipodal $\pm A$, $\gamma = 0$.
- The threshold moves **toward the less likely symbol**, enlarging the decision region of the more likely one.
- In AWGN, ML is equivalent to minimum-distance detection: choose the nearest constellation point.

**Error probability** for equal priors and binary signals at distance $d$: $P_e = Q\left(\dfrac{d}{2\sigma}\right)$.

## Worked examples

**Example 1.** Antipodal $\pm1$, equal priors: threshold 0.

**Example 2.** Unipolar 0 and 2 V, equal priors: threshold 1 V.

**Example 3.** $\pm1$ with $\sigma^2 = 0.5$, $P(+1) = 0.8$, $P(-1) = 0.2$:
$\gamma = 0 + \frac{0.5}{2}\ln\frac{0.2}{0.8} = 0.25\times(-1.386) = -0.347$. The threshold moves toward $-1$.

**Example 4.** $\pm1$ with $\sigma = 0.5$, equal priors: $P_e = Q(1/0.5) = Q(2) \approx 0.0228$.

## Common GATE traps

- Moving the threshold in the wrong direction with unequal priors.
- Using ML when the priors are unequal and the question asks for the minimum error probability.

## Summary

- MAP maximises prior × likelihood (minimum $P_e$); ML maximises likelihood; equal priors make them the same.
- Gaussian threshold: midpoint $+\frac{\sigma^2}{s_1 - s_0}\ln\frac{P_0}{P_1}$.
