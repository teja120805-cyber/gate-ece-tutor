# Paper Folding, Cutting and 3D Patterns

> Hole-punch patterns, painted-cube counting, and dice/net reasoning.

## Paper folding and punching

- Each fold doubles the number of layers. A single punch through $k$ layers produces $k$ holes when unfolded: one fold gives 2 holes, two folds give 4, three folds give 8.
- The holes are **mirror images** across each fold line. Unfold step by step, reflecting the holes across the most recent fold first.

## Painted cubes

A large cube is painted on all faces and cut into $n\times n\times n$ small cubes:

| Painted faces | Location | Count |
|---|---|---|
| 3 | corners | 8 (for $n \ge 2$) |
| 2 | edges excluding corners | $12(n - 2)$ |
| 1 | face centres | $6(n - 2)^2$ |
| 0 | interior | $(n - 2)^3$ |

The four counts add up to $n^3$.

## Dice and nets

- On a standard die, **opposite faces sum to 7**: 1–6, 2–5, 3–4.
- In a cube net (a cross shape), faces separated by exactly one face in a straight line are **opposite**; adjacent faces in the net are adjacent on the cube.
- Faces that touch a given face cannot be opposite to it.

## Worked examples

**Example 1.** A square sheet folded in half twice (into quarters), then punched once: 4 holes when unfolded.

**Example 2.** A $3\times3\times3$ painted cube: corners 8, exactly 2 faces $12(1) = 12$, exactly 1 face $6(1) = 6$, none 1. Total 27 ✓.

**Example 3.** On a standard die with 1 on top, the bottom face shows 6.

**Example 4.** A $4\times4\times4$ cube has $(4 - 2)^3 = 8$ unpainted cubes.

## Summary

- Each fold doubles the holes; holes mirror across the fold lines.
- Painted cube: 8 corners, $12(n-2)$ edges, $6(n-2)^2$ faces, $(n-2)^3$ hidden.
- Die: opposite faces sum to 7.
