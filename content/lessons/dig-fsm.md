# Finite State Machines

> Moore versus Mealy machines, state counts for sequence detectors, and state assignment are standard questions.

## Intuition

A finite state machine remembers "where it is" in a process using a few flip-flops (its state). On each clock edge it moves to a next state determined by the current state and the inputs, and it produces outputs. Designing an FSM means drawing the state diagram, then implementing next-state and output logic.

## Moore vs Mealy

| | Moore | Mealy |
|---|---|---|
| Outputs depend on | the present state only | the present state **and** the inputs |
| States needed | usually more | usually fewer |
| Output timing | changes only after a clock edge (glitch-free) | can change immediately with the inputs (asynchronously) |

## Key results

- **Number of flip-flops:** binary encoding $\lceil\log_2N\rceil$; one-hot encoding $N$ (simpler, faster logic, common in FPGAs); Gray encoding minimises bit changes.
- **Sequence detectors** for an $n$-bit pattern: a Mealy machine needs $n$ states; a Moore machine needs $n + 1$ (the extra state signals detection). Decide whether overlapping matches are allowed.
- **State minimisation:** merge equivalent states (same outputs and equivalent next states) — row matching or partitioning.
- **Design steps:** state diagram → state table → state assignment → flip-flop excitation → K-map simplification → circuit.

## Worked examples

**Example 1.** A 6-state FSM with binary encoding needs 3 flip-flops (one-hot needs 6).

**Example 2.** An overlapping "101" detector: Mealy needs 3 states (S0, S1 = seen 1, S2 = seen 10). Moore needs 4 (adding S3 = seen 101, output 1). From S3, input 0 goes to S2 (overlap) and input 1 goes to S1.

## Common GATE traps

- Mixing up which machine type has input-dependent outputs.
- Ignoring overlap when counting sequence-detector states.

## Summary

- Moore: outputs from the state; Mealy: from state + input (fewer states).
- Binary encoding needs $\lceil\log_2N\rceil$ FFs; an $n$-bit detector needs $n$ (Mealy) or $n + 1$ (Moore) states.
