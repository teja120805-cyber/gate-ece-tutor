# Ratios, Percentages, Powers, Exponents and Logarithms

> General Aptitude is 15 marks — the easiest marks in the paper. Ratio and percentage reasoning underlies most quantitative GA questions, including data interpretation.

## Intuition

Ratios and percentages are both **multiplicative comparisons**. The most reliable habit is to convert every percentage change into a **multiplying factor**: +20% → ×1.2, −15% → ×0.85. Successive changes then simply multiply.

## Key results

**Percentages**
- Change of $r\%$ ⇒ factor $(1 + r/100)$.
- Successive changes $a\%$ then $b\%$: net factor $(1 + a/100)(1 + b/100)$; net change $= a + b + ab/100$ %.
- +x% then −x% is always a net loss of $x^2/100$ %.
- To keep a product constant (e.g. expenditure = price × quantity) after one factor rises by $r\%$, the other must fall by $\dfrac{r}{100 + r} \times 100\%$.
- "A is $x\%$ more than B" ⇒ B is $\dfrac{x}{100+x}\times 100\%$ less than A.

**Ratios**
- Combine $A:B$ and $B:C$ by making $B$ equal (LCM).
- Dividing a quantity $Q$ in the ratio $a : b$ gives $\dfrac{a}{a+b}Q$ and $\dfrac{b}{a+b}Q$.
- Mixtures (alligation): mixing items priced $c_1$ and $c_2$ to reach mean price $m$ needs the ratio $(c_2 - m) : (m - c_1)$.

**Exponents**
$a^m a^n = a^{m+n}$, $(a^m)^n = a^{mn}$, $a^{-n} = 1/a^n$, $a^{1/n} = \sqrt[n]{a}$, $a^0 = 1$.
Useful anchor: $2^{10} = 1024 \approx 10^3$.

**Logarithms**
$\log(ab) = \log a + \log b$, $\log(a/b) = \log a - \log b$, $\log a^n = n\log a$,
change of base $\log_b a = \dfrac{\log a}{\log b}$, and $\log_b b = 1$, $\log_b 1 = 0$.
$\log_{10} 2 \approx 0.301$, $\log_{10} 3 \approx 0.477$.
**Number of digits** in $N$ is $\lfloor\log_{10}N\rfloor + 1$.

## Visual picture — factor table

| change | factor |
|---|---|
| +25% | 1.25 |
| −20% | 0.80 |
| +50% | 1.50 |
| −33⅓% | 0.667 |
| doubling | 2.00 |

Note that +25% is undone by −20% (since $1.25 \times 0.8 = 1$), and +50% by −33⅓%.

## Worked examples

**Example 1.** Price +20% then −20%: $1.2 \times 0.8 = 0.96$, a 4% decrease.

**Example 2.** $A:B = 2:3$, $B:C = 4:5$ ⇒ $8:12:15$.

**Example 3.** Sugar price rises 25%: consumption must fall by $25/125 = 20\%$.

**Example 4.** Number of digits in $2^{50}$: $50\log_{10}2 = 15.05$ ⇒ 16 digits.

**Example 5.** If $\log_{10}x = 2.5$, then $x = 10^{2.5} = 316.2$.

## Common GATE traps

- **Adding percentages** of successive changes.
- **Base confusion** — a percentage is always "of" something; find the base first.
- **Ratio of differences** — when quantities change, write new ratios with a common variable.

## Summary

- Convert percentages to factors and multiply.
- Constant product: compensating change $= r/(100 + r)$.
- Exponent and log rules; $2^{10} \approx 10^3$; digits $= \lfloor\log_{10}N\rfloor + 1$.
