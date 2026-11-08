# Combinatorial Probability

> Classical probability via counting — coins, dice, cards, committees and arrangements — appears in both Mathematics and General Aptitude.

## Intuition

When all outcomes are equally likely, probability is just **favourable outcomes ÷ total outcomes**. The challenge is counting both correctly and consistently (ordered vs unordered).

## Key results

$$
P(E) = \frac{|E|}{|S|}, \qquad {}^nP_r = \frac{n!}{(n-r)!}, \qquad {}^nC_r = \binom{n}{r} = \frac{n!}{r!(n-r)!}.
$$

- Arrangements of $n$ objects with repeats $n_1, n_2, \dots$: $\dfrac{n!}{n_1!n_2!\cdots}$.
- Complement: $P(\text{at least one}) = 1 - P(\text{none})$.
- Addition: $P(A\cup B) = P(A) + P(B) - P(A\cap B)$.
- Exactly $k$ successes in $n$ independent trials: $\binom nk p^k(1 - p)^{n-k}$ (binomial).
- Selection without replacement (hypergeometric): $\dfrac{\binom{K}{k}\binom{N-K}{n-k}}{\binom Nn}$.

## Worked examples

**Example 1.** Exactly 2 heads in 3 tosses: $\binom32/8 = 3/8$.

**Example 2.** Two people chosen from 4 men and 3 women; P(both women) $= \binom32/\binom72 = 3/21 = 1/7$.

**Example 3.** A random 4-digit PIN has all digits different with probability $\dfrac{10\cdot9\cdot8\cdot7}{10^4} = 0.504$.

**Example 4.** Two dice, at least one six: $1 - (5/6)^2 = 11/36$.

**Example 5.** The letters of LEVEL arranged at random: $5!/(2!2!) = 30$ arrangements. A palindrome needs V in the middle and matching outer and inner pairs (LEVEL or ELVLE), so the probability is $2/30 = 1/15$.

## Common GATE traps

- Mixing ordered counting in the numerator with unordered counting in the denominator.
- Forgetting the complement shortcut for "at least one".

## Summary

- Probability = favourable/total, counted consistently.
- Use permutations when order matters, combinations when it doesn't, and the complement for "at least".
