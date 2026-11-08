# Logic: Deduction and Induction

> Syllogisms, conditional statements, and distinguishing valid deduction from inductive generalisation.

## Intuition

- **Deduction** draws conclusions that are **guaranteed** if the premises are true.
- **Induction** generalises from observations to a conclusion that is likely but **not certain** — one counterexample can overturn it.

## Syllogisms (use Venn diagrams)

| Statement | Meaning |
|---|---|
| All A are B | circle A inside circle B |
| No A is B | disjoint circles |
| Some A are B | overlapping circles (at least one element in common) |
| Some A are not B | part of A outside B |

**Valid patterns**
- All A are B; all B are C ⇒ all A are C.
- All A are B; X is A ⇒ X is B.
- No A is B; some C are A ⇒ some C are not B.
- "Some A are B" ⇔ "some B are A" (conversion is valid for "some", not for "all").

**Method:** draw the **least committal** diagram that satisfies the premises. A conclusion follows only if it holds in **every** possible diagram.

## Conditionals ("If P then Q")

| Form | Validity |
|---|---|
| modus ponens: P, therefore Q | valid |
| modus tollens: not Q, therefore not P | valid (contrapositive) |
| affirming the consequent: Q, therefore P | **invalid** |
| denying the antecedent: not P, therefore not Q | **invalid** |

## Worked examples

**Example 1.** All engineers are graduates; Ravi is an engineer ⇒ Ravi is a graduate (valid).

**Example 2.** All resistors are passive; some passive elements are inductors ⇒ "some resistors are inductors" does **not** follow (the inductors may lie outside the resistor circle). "Some inductors are passive" does follow (conversion).

**Example 3.** No cats are dogs; some pets are cats ⇒ some pets are not dogs.

**Example 4.** "Every swan observed so far is white, so all swans are white" is inductive — it is overturned by one black swan.

## Summary

- Use Venn diagrams; a conclusion must hold in every diagram.
- Valid: modus ponens and modus tollens. Invalid: affirming the consequent, denying the antecedent.
