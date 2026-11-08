# Static CMOS Logic Gates

> Identifying the function of a CMOS transistor network, counting transistors, and estimating dynamic power are standard questions.

## Intuition

Every static CMOS gate has a **pull-down network (PDN)** of nMOS transistors to ground and a **pull-up network (PUN)** of pMOS transistors to $V_{DD}$. For any input combination exactly one network conducts, so the output is firmly driven to 0 or 1 with (ideally) no static current.

## Rules

- nMOS conducts when its gate is 1; pMOS conducts when its gate is 0.
- PDN: series nMOS = AND, parallel nMOS = OR. The output is the **complement** of the PDN function: $Y = \overline{f_{PDN}}$.
- PUN = the **dual** of the PDN (series ↔ parallel), built with pMOS.
- A static CMOS gate is inherently **inverting**. AND and OR need an extra inverter stage.
- An $n$-input gate needs $2n$ transistors (excluding output inverters).

## Common gates

| Gate | PDN | PUN | Transistors |
|---|---|---|---|
| inverter | 1 nMOS | 1 pMOS | 2 |
| NAND-$n$ | $n$ nMOS in series | $n$ pMOS in parallel | $2n$ |
| NOR-$n$ | $n$ nMOS in parallel | $n$ pMOS in series | $2n$ |
| $Y = \overline{AB + C}$ | (A series B) parallel C | (A parallel B) series C | 6 |

NAND is usually preferred over NOR because series pMOS (slow, with low mobility) is avoided.

## Key results

- **Dynamic power:** $P = \alpha CV_{DD}^2f$ ($\alpha$ = activity factor). Static power is ideally zero (leakage in practice).
- **Inverter switching threshold** $V_M$: equals $V_{DD}/2$ when the pull-up and pull-down are matched (pMOS sized about 2–3× wider).
- Noise margins: $NM_H = V_{OH} - V_{IH}$, $NM_L = V_{IL} - V_{OL}$; for CMOS, $V_{OH} = V_{DD}$ and $V_{OL} = 0$.

## Worked examples

**Example 1.** A PDN with A and B in series, in parallel with C, gives $Y = \overline{AB + C}$: 6 transistors.

**Example 2.** A 3-input NOR: 3 parallel nMOS + 3 series pMOS = 6 transistors.

**Example 3.** $C = 10$ pF, $V_{DD} = 2$ V, $f = 100$ MHz, $\alpha = 1$: $P = 10^{-11}\times4\times10^8 = 4$ mW.

## Common GATE traps

- Forgetting the output inversion (reading the PDN function directly as $Y$).
- Using the same topology for the PUN instead of its dual.

## Summary

- $Y = \overline{\text{PDN function}}$; the PUN is its dual with pMOS; $2n$ transistors.
- Dynamic power $\alpha CV^2f$.
