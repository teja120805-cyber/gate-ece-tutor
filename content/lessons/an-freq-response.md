# Frequency Response of Amplifiers

> Low-frequency cut-off from coupling and bypass capacitors, high-frequency cut-off and the Miller effect, and gain–bandwidth product appear regularly.

## Intuition

- **Low frequencies:** coupling and bypass capacitors (large, external) have high reactance, which blocks or reduces the signal.
- **Mid-band:** they act as shorts and the gain is flat.
- **High frequencies:** small internal device capacitances ($C_\pi$, $C_\mu$, $C_{gs}$, $C_{gd}$) shunt the signal away.

## Key results

**Low-frequency poles:** each capacitor gives a corner at $f = \dfrac{1}{2\pi R_{eq}C}$, where $R_{eq}$ is the resistance seen by that capacitor (other capacitors shorted).
- Coupling capacitor: $R_{eq} = R_s + R_{in}$ (or $R_C + R_L$ at the output).
- Emitter bypass capacitor: $R_{eq} = R_E \| \left(r_e + \frac{R_s\|R_B}{\beta + 1}\right)$ — small, so it usually sets the highest low-frequency pole.
- The overall $f_L$ is approximately the largest pole (if it is dominant), or $\sqrt{\sum f_i^2}$.

**Miller effect:** a capacitance $C$ between the input and output of an inverting stage with gain $-A$ appears at the input as
$$
C_{in} = C(1 + A).
$$
The large CE/CS gain multiplies $C_\mu$ (or $C_{gd}$), lowering $f_H$. **CB/CG and cascode** stages avoid this, giving better high-frequency response.

**BJT unity-gain frequency:** $f_T = \dfrac{g_m}{2\pi(C_\pi + C_\mu)}$; $f_\beta = f_T/\beta$.

**Gain–bandwidth product:** for a single dominant pole, $|A_{mid}|\times BW = $ constant. Op-amps with negative feedback trade gain for bandwidth ($A_{CL}f_{CL} = f_T$).

**Cascaded identical stages:** $f_{H,n} = f_H\sqrt{2^{1/n} - 1}$.

## Worked examples

**Example 1.** A 10 µF coupling capacitor with $R_{eq} = 1.59\,\text{k}\Omega$: $f_L = \dfrac{1}{2\pi\times1590\times10^{-5}} = 10$ Hz.

**Example 2.** $C_\mu = 2$ pF, gain $-100$: Miller input capacitance $= 2(101) = 202$ pF.

**Example 3.** Mid-band gain 100 and $f_H = 1$ MHz: GBW $= 100$ MHz. A closed-loop gain of 10 then gives about 10 MHz of bandwidth.

## Common GATE traps

- Using the wrong $R_{eq}$ for the bypass capacitor.
- Applying the Miller multiplication to non-inverting stages.

## Summary

- Low-frequency corners: $1/(2\pi R_{eq}C)$ for each coupling/bypass capacitor.
- Miller: $C(1 + A)$ at the input; CB/CG/cascode avoid it. GBW is constant for a single pole.
