# Joint and Conditional Probability

> Conditional probability and Bayes' theorem appear in Mathematics every year and again in Communications (MAP detection, channel transition probabilities, information theory).

## Intuition

Conditioning means **updating your sample space with new information**. If you know event $B$ happened, outcomes outside $B$ are impossible, so you rescale probabilities within $B$:

$$
P(A \mid B) = \frac{\text{"how much of } B \text{ is also } A\text{"}}{\text{"how big is } B\text{"}}.
$$

## Formal definition

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(B) > 0 .
$$

**Multiplication rule:** $P(A \cap B) = P(A \mid B)\,P(B) = P(B \mid A)\,P(A)$.

**Independence:** $A$ and $B$ are independent if $P(A \cap B) = P(A)\,P(B)$, equivalently $P(A \mid B) = P(A)$.

## Key results

**Total probability.** If $B_1, \dots, B_n$ partition the sample space:
$$
P(A) = \sum_{i} P(A \mid B_i)\,P(B_i).
$$

**Bayes' theorem.**
$$
P(B_i \mid A) = \frac{P(A \mid B_i)\,P(B_i)}{\sum_j P(A \mid B_j)\,P(B_j)} .
$$
Read it as **posterior ∝ likelihood × prior**.

**Useful identities**
- $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
- If $A, B$ are independent, so are $A^c$ and $B$, $A$ and $B^c$, and $A^c$ and $B^c$.
- Mutually exclusive events with non-zero probabilities are **never** independent: $P(A\cap B) = 0 \neq P(A)P(B)$.
- Without replacement: $P(\text{1st red, 2nd red}) = P(\text{1st red})\,P(\text{2nd red} \mid \text{1st red})$.

## Visual picture — a probability tree

Fault detection: $P(F) = 0.01$, $P(+ \mid F) = 0.99$, $P(+ \mid F^c) = 0.05$.

| branch | probability |
|---|---|
| $F$ and $+$ | $0.01 \times 0.99 = 0.0099$ |
| $F$ and $-$ | $0.01 \times 0.01 = 0.0001$ |
| $F^c$ and $+$ | $0.99 \times 0.05 = 0.0495$ |
| $F^c$ and $-$ | $0.99 \times 0.95 = 0.9405$ |

$P(F \mid +) = \dfrac{0.0099}{0.0099 + 0.0495} \approx 0.167$. Even an accurate test produces mostly false alarms when the event is rare.

## Worked examples

**Example 1.** Two dice; given that the sum is 8, what is the probability that one die shows 3?
Outcomes with sum 8: (2,6), (3,5), (4,4), (5,3), (6,2) — 5 outcomes. Those with a 3: (3,5), (5,3). Answer: $2/5$.

**Example 2 (binary channel).** A bit is 0 with probability 0.6. The channel flips 0→1 with probability 0.1 and 1→0 with probability 0.2. Given that 1 is received, what is the probability that 1 was sent?
$P(R{=}1) = 0.4(0.8) + 0.6(0.1) = 0.32 + 0.06 = 0.38$.
$P(S{=}1 \mid R{=}1) = 0.32 / 0.38 \approx 0.842$.

**Example 3.** $P(A) = 0.3$, $P(B) = 0.5$, independent: $P(A \cap B) = 0.15$, $P(A \cup B) = 0.65$, $P(A \mid B) = 0.3$.

## Common GATE traps

- **Confusing $P(A \mid B)$ with $P(B \mid A)$** — Bayes exists precisely because they differ.
- **Equating independent with mutually exclusive.**
- **Forgetting the denominator** in Bayes (use total probability).
- **Counting unordered outcomes** when the sample space is ordered (dice, sequences).

## Summary

- $P(A\mid B) = P(A\cap B)/P(B)$; multiplication rule and total probability.
- Bayes: posterior = likelihood × prior / evidence.
- Independence: $P(A\cap B) = P(A)P(B)$; it is not the same as mutual exclusivity.
