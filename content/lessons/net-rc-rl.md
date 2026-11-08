# First-Order RC and RL Circuits

> Switching transients in RC and RL circuits appear almost every year. One formula solves nearly all of them.

## Intuition

Capacitors store energy in voltage; inductors store energy in current. Neither can change its stored energy instantly, so after a switch operates the circuit glides **exponentially** from its old state to its new steady state. The **time constant** $\tau$ sets the speed: after $\tau$ the transition is 63% complete, and after $5\tau$ it is practically finished.

## Key results

**Continuity:** $v_C(0^+) = v_C(0^-)$ and $i_L(0^+) = i_L(0^-)$ (in the absence of impulses).

**DC steady state:** a capacitor acts as an **open circuit**; an inductor as a **short circuit**.

**Universal first-order solution** (any voltage or current $x$ in the circuit):
$$
x(t) = x(\infty) + \big[x(0^+) - x(\infty)\big]e^{-t/\tau}, \qquad \tau = R_{th}C \ \text{ or } \ \frac{L}{R_{th}},
$$
where $R_{th}$ is the Thevenin resistance seen by the capacitor or inductor, with independent sources deactivated.

**Energy:** $W_C = \frac12Cv^2$, $W_L = \frac12Li^2$.

| Time | Fraction of the transition completed |
|---|---|
| $\tau$ | 63.2% |
| $2\tau$ | 86.5% |
| $3\tau$ | 95.0% |
| $5\tau$ | 99.3% |

## Procedure

1. Find $v_C(0^-)$ or $i_L(0^-)$ from the circuit **before** switching (DC steady state).
2. Find $x(0^+)$ using continuity.
3. Find $x(\infty)$ from the circuit **after** switching (DC steady state).
4. Find $R_{th}$ seen by C or L ⇒ $\tau$.
5. Substitute into the universal formula.

## Worked examples

**Example 1.** $R = 2\,\text{k}\Omega$, $C = 5\,\mu$F: $\tau = 10$ ms.

**Example 2.** An uncharged $1\,\mu$F capacitor is charged from 10 V through $1\,\text{k}\Omega$: $v_C(t) = 10(1 - e^{-t/1\text{ms}})$, so $v_C(1\text{ ms}) = 6.32$ V.

**Example 3.** RL: $L = 2$ H, $R = 4\,\Omega$, 12 V step: $\tau = 0.5$ s, $i(\infty) = 3$ A, so $i(t) = 3(1 - e^{-2t})$ and $i(0.5) = 1.896$ A.

## Common GATE traps

- Using a capacitor **current** or inductor **voltage** as if it were continuous (they can jump).
- Using the wrong resistance for $\tau$ — it is the Thevenin resistance seen by the energy-storage element after switching.

## Summary

- $x(t) = x(\infty) + [x(0^+) - x(\infty)]e^{-t/\tau}$, with $\tau = RC$ or $L/R$.
- $v_C$ and $i_L$ are continuous; at DC steady state, C is open and L is a short.
