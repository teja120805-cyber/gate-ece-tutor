# Multiplexers, Decoders and Code Converters

> Implementing functions with MUXes and decoders, and counting the components needed for larger units, are frequent questions.

## Intuition

- A **multiplexer** is a data selector: the select lines choose which of $2^n$ inputs reaches the output.
- A **decoder** activates exactly one of $2^n$ outputs for each $n$-bit input — each output is one **minterm**.
- A **demultiplexer** routes one input to one of many outputs.

## Key results

- A $2^n{:}1$ MUX has $n$ select lines: $Y = \sum_k m_k I_k$ (minterm of the selects ANDed with data input $k$).
- **Function implementation with a MUX:**
  - An $n$-variable function fits a $2^n{:}1$ MUX directly (data inputs = truth-table values).
  - It also fits a $2^{n-1}{:}1$ MUX: use $n - 1$ variables as selects and drive each data input with 0, 1, $x$ or $\bar x$ (the remaining variable).
- **Building larger MUXes from 2:1 MUXes:** an $N{:}1$ MUX needs $N - 1$ of them (a binary tree).
- **Decoder + OR gates** implement any SOP: OR together the outputs for the required minterms.
- **Decoder trees:** a 6-to-64 decoder from 3-to-8 decoders with enables needs 8 output decoders + 1 enabling decoder = 9.
- **Code converters:** binary → Gray $g_i = b_{i+1} \oplus b_i$ ($g_{n-1} = b_{n-1}$); Gray → binary $b_i = b_{i+1} \oplus g_i$. BCD → 7-segment uses a decoder with segment logic.
- A **priority encoder** outputs the index of the highest-priority active input.

## Worked examples

**Example 1.** A 4:1 MUX with selects $(A, B)$ and data inputs $I_0..I_3 = 0, 1, 1, 0$ implements $A \oplus B$.

**Example 2.** A 16:1 MUX built from 2:1 MUXes needs $8 + 4 + 2 + 1 = 15$.

**Example 3.** $F(A,B,C) = \sum m(1, 2, 6, 7)$ with a 4:1 MUX (selects A, B):
- AB = 00 → minterm 1 only ⇒ $C$;
- AB = 01 → minterm 2 ⇒ $\bar C$;
- AB = 10 → none ⇒ 0;
- AB = 11 → minterms 6, 7 ⇒ 1.

## Common GATE traps

- Confusing a MUX (many in, one out) with a DEMUX (one in, many out).
- Off-by-one errors when counting MUXes in a tree.

## Summary

- A $2^n{:}1$ MUX implements any $n$-variable function (or $n + 1$ variables using the extra variable at the data inputs).
- Decoder outputs are minterms; an $N{:}1$ MUX needs $N - 1$ 2:1 MUXes.
