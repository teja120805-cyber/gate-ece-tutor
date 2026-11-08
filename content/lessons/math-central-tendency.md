# Mean, Median, Mode and Standard Deviation

> Quick numerical questions; also the basis for the mean and variance of random variables.

## Intuition

Measures of **central tendency** summarise where the data sits; measures of **dispersion** summarise how spread out it is. The mean is pulled by outliers; the median is robust to them.

## Definitions

For data $x_1, \dots, x_n$:

- Mean $\bar x = \frac1n\sum x_i$.
- Median: the middle value of the sorted data (the average of the two middle values when $n$ is even).
- Mode: the most frequent value.
- Variance (population) $\sigma^2 = \frac1n\sum(x_i - \bar x)^2 = \overline{x^2} - \bar x^2$; standard deviation $\sigma = \sqrt{\sigma^2}$.
- Sample variance uses $\frac{1}{n-1}$. GATE usually specifies which; if not, the population form is common.

## Key results

| Transformation $y = ax + b$ | Effect |
|---|---|
| mean, median, mode | $a(\cdot) + b$ |
| standard deviation | $|a|\sigma$ |
| variance | $a^2\sigma^2$ |

- Shifting all values by a constant does not change the spread.
- Empirical relation for moderately skewed data: mode ≈ 3 median − 2 mean.
- Grouped data: $\bar x = \frac{\sum f_ix_i}{\sum f_i}$.

## Worked examples

**Example 1.** $\{2, 4, 6, 8\}$: mean 5; median $(4 + 6)/2 = 5$.

**Example 2.** $\{3, 9, 1, 7, 5\}$: sorted $\{1, 3, 5, 7, 9\}$, median 5.

**Example 3.** $\{2, 4, 4, 4, 5, 5, 7, 9\}$: mean 5; squared deviations $9, 1, 1, 1, 0, 0, 4, 16$ sum to 32, so $\sigma^2 = 4$ and $\sigma = 2$.

**Example 4.** Multiplying every value by 3 turns variance 4 into $9 \times 4 = 36$.

## Common GATE traps

- Forgetting to sort before taking the median.
- Using $\sigma$ instead of $\sigma^2$ when scaling the variance.

## Summary

- Mean, median (sorted middle), mode (most frequent).
- $\sigma^2 = \overline{x^2} - \bar x^2$; under $y = ax + b$ the SD becomes $|a|\sigma$.
