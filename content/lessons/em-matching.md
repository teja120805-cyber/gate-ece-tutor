# Impedance Matching

> Quarter-wave transformers and stub matching: impedance values, lengths and their limitations.

## Intuition

Reflections waste power and can damage sources, so we insert a lossless network that makes the load look like $Z_0$ to the line. A **quarter-wave transformer** inverts the impedance; a **stub** — a short- or open-circuited line section — adds a reactance that cancels the load's reactance.

## Quarter-wave transformer

For a real load $R_L$ on a line $Z_0$, insert a $\lambda/4$ section with
$$
Z_1 = \sqrt{Z_0R_L} .
$$
- It matches perfectly only at the design frequency (narrowband). Multi-section designs widen the bandwidth.
- A complex load is first moved to a point where its impedance is real (a voltage maximum or minimum), or its reactance is cancelled.

## Stub matching

**Stub input impedances:**
- short-circuited stub: $Z = jZ_0\tan\beta\ell$ — inductive for $\ell < \lambda/4$;
- open-circuited stub: $Z = -jZ_0\cot\beta\ell$ — capacitive for $\ell < \lambda/4$.

**Single shunt stub:**
1. Move a distance $d$ from the load until the normalised admittance is $y = 1 + jb$.
2. Add a shunt stub with susceptance $-jb$, leaving $y = 1$ (matched).

The Smith chart makes this geometric. Double-stub tuners use fixed stub positions with variable stub lengths.

## Worked examples

**Example 1.** Matching $100\,\Omega$ to a $50\,\Omega$ line: $Z_1 = \sqrt{5000} = 70.7\,\Omega$.

**Example 2.** At 1 GHz with $v_p = 2\times10^8$ m/s: $\lambda = 20$ cm, so the transformer is 5 cm long.

**Example 3.** A short-circuited stub of length $\lambda/8$ gives $Z = jZ_0\tan45° = jZ_0$ — an inductive reactance equal to $Z_0$.

## Common GATE traps

- Using $Z_1 = (Z_0 + R_L)/2$ instead of the geometric mean.
- Thinking a quarter-wave transformer matches complex loads directly.

## Summary

- Quarter-wave transformer: $Z_1 = \sqrt{Z_0R_L}$, narrowband, real loads.
- Short stub: $jZ_0\tan\beta\ell$; open stub: $-jZ_0\cot\beta\ell$; use them to cancel susceptance.
