# Node and Mesh Analysis

> A systematic method for any linear circuit — and the fastest route through most 2-mark circuit problems.

## Intuition

Instead of tracking every branch current, choose a few unknowns that determine everything else:
- **node voltages** (relative to a reference node) for nodal analysis;
- **mesh currents** circulating in each window of a planar circuit for mesh analysis.

## Nodal analysis

1. Pick a reference (ground) node. The unknowns are the $n - 1$ other node voltages.
2. Write KCL at each non-reference node, expressing each resistor current as $(V_a - V_b)/R$.
3. **Voltage source between two non-reference nodes:** form a **supernode** — write one KCL for the combined region plus the constraint $V_a - V_b = V_s$.
4. **Dependent sources:** express the controlling variable in terms of the node voltages.

## Mesh analysis

1. Assign clockwise mesh currents. There are $b - n + 1$ meshes.
2. Write KVL around each mesh; a shared resistor carries $I_1 - I_2$.
3. **Current source on a shared branch:** form a **supermesh** (KVL around both meshes, ignoring the source) plus the constraint $I_1 - I_2 = I_s$.
4. A current source on an outer branch directly fixes that mesh current.

## Key results

- For circuits with only resistors and independent sources, the conductance matrix is symmetric: the diagonal holds the sum of conductances at each node; the off-diagonal holds minus the shared conductance.
- Choose nodal analysis when there are fewer nodes than meshes (or many current sources); mesh analysis in the opposite case.

## Worked examples

**Example 1.** 10 V with series $2\,\Omega$ into node A; A to ground via $3\,\Omega$; 2 A injected into A:
$\frac{V - 10}{2} + \frac V3 = 2$ ⇒ $\frac56V = 7$ ⇒ $V = 8.4$ V.

**Example 2.** Meshes: $12 = 6I_1 - 4I_2$ and $0 = -4I_1 + 8I_2$ ⇒ $I_2 = 1.5$ A, $I_1 = 3$ A; the shared $4\,\Omega$ carries 1.5 A.

**Example 3 (dependent source).** 3 A enters a node that has $2\,\Omega$ to ground and a dependent source drawing $0.25V$:
$3 = V/2 + 0.25V$ ⇒ $V = 4$ V.

## Common GATE traps

- Sign errors in shared-branch terms.
- Writing KCL at a node that sits inside a supernode separately.
- Forgetting the constraint equation for supernodes and supermeshes.

## Summary

- Nodal: KCL with node voltages; supernode for floating voltage sources.
- Mesh: KVL with mesh currents; supermesh for shared current sources.
