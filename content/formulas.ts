import { md, type FormulaDef } from "./types.ts";
import { FORMULAS2 } from "./formulas2.ts";

// Built-in formula reference. Learners add their own formulas in the Formula Notebook.
const FORMULAS1: FormulaDef[] = [
  // Signals & Systems
  { id: "f-ss-step-ramp", concept: "ss-elementary", title: "Step, ramp and rectangular pulse", latex: md`r(t) = t\,u(t),\quad \frac{dr}{dt} = u(t),\quad \operatorname{rect}\!\left(\tfrac{t}{T}\right) = u\!\left(t+\tfrac{T}{2}\right) - u\!\left(t-\tfrac{T}{2}\right)` },
  { id: "f-ss-shift", concept: "ss-time-shift", title: "Time shift", latex: md`x(t - t_0):\ \text{delay by } t_0 \ (t_0>0),\qquad x(t + t_0):\ \text{advance}` },
  { id: "f-ss-scale", concept: "ss-time-scale", title: "Combined transformation", latex: md`y(t) = x(at + b) = x\!\left(a\left(t + \tfrac{b}{a}\right)\right)`, note: "Shift by −b/a, scale by 1/|a| (compress if |a|>1), reverse if a<0." },
  { id: "f-ss-scale-energy", concept: "ss-time-scale", title: "Energy under scaling", latex: md`E\{x(at+b)\} = \frac{1}{|a|}E\{x(t)\}` },
  { id: "f-ss-sift", concept: "ss-impulse", title: "Sifting property", latex: md`\int_{-\infty}^{\infty} x(t)\,\delta(t - t_0)\,dt = x(t_0)` },
  { id: "f-ss-delta-scale", concept: "ss-impulse", title: "Impulse scaling", latex: md`\delta(at) = \frac{1}{|a|}\delta(t),\qquad x(t)\delta(t-t_0) = x(t_0)\delta(t-t_0)` },
  { id: "f-ss-energy-power", concept: "ss-signal-classes", title: "Energy and power", latex: md`E = \int_{-\infty}^{\infty}|x(t)|^2dt,\qquad P = \lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}|x(t)|^2dt` },
  { id: "f-ss-conv", concept: "ss-convolution", title: "Convolution integral", latex: md`y(t) = x(t)*h(t) = \int_{-\infty}^{\infty} x(\tau)\,h(t-\tau)\,d\tau` },
  { id: "f-ss-conv-props", concept: "ss-convolution", title: "Convolution shortcuts", latex: md`x*\delta(t-t_0) = x(t-t_0),\quad x*u(t) = \int_{-\infty}^{t}x(\tau)d\tau,\quad \text{Area}(y) = \text{Area}(x)\cdot\text{Area}(h)` },
  { id: "f-ss-conv-duration", concept: "ss-convolution", title: "Support of the output", latex: md`[a_1, b_1] * [a_2, b_2] \Rightarrow [a_1 + a_2,\ b_1 + b_2]` },
  { id: "f-ss-dconv", concept: "ss-dt-convolution", title: "Convolution sum", latex: md`y[n] = \sum_{k=-\infty}^{\infty} x[k]\,h[n-k],\qquad L_y = L_x + L_h - 1` },
  { id: "f-ss-stability", concept: "ss-impulse-response", title: "LTI causality and stability", latex: md`\text{causal} \iff h(t) = 0,\ t<0;\qquad \text{BIBO stable} \iff \int_{-\infty}^{\infty}|h(t)|\,dt < \infty` },
  { id: "f-ss-fs", concept: "ss-fourier-series", title: "Exponential Fourier series", latex: md`x(t) = \sum_{k=-\infty}^{\infty} c_k e^{jk\omega_0 t},\qquad c_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt` },
  { id: "f-ss-ft", concept: "ss-fourier-transform", title: "Fourier transform pair", latex: md`X(\omega) = \int_{-\infty}^{\infty} x(t)e^{-j\omega t}dt,\qquad x(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} X(\omega)e^{j\omega t}d\omega` },
  { id: "f-ss-nyquist", concept: "ss-sampling", title: "Nyquist rate", latex: md`f_s \ge 2 f_{\max}` },
  { id: "f-ss-zt", concept: "ss-z-transform", title: "z-transform", latex: md`X(z) = \sum_{n=-\infty}^{\infty} x[n] z^{-n},\qquad a^n u[n] \leftrightarrow \frac{1}{1 - a z^{-1}},\ |z| > |a|` },
  { id: "f-ss-dft", concept: "ss-dft", title: "N-point DFT", latex: md`X[k] = \sum_{n=0}^{N-1} x[n] e^{-j2\pi kn/N}` },
  { id: "f-ss-gd", concept: "ss-group-delay", title: "Group and phase delay", latex: md`\tau_g(\omega) = -\frac{d\phi(\omega)}{d\omega},\qquad \tau_p(\omega) = -\frac{\phi(\omega)}{\omega}` },

  // Engineering Mathematics
  { id: "f-m-ftc", concept: "math-definite-int", title: "Fundamental theorem & Leibniz rule", latex: md`\frac{d}{dx}\int_{a(x)}^{b(x)} f(t)\,dt = f(b(x))\,b'(x) - f(a(x))\,a'(x)` },
  { id: "f-m-even-odd", concept: "math-definite-int", title: "Symmetric limits", latex: md`\int_{-a}^{a} f = \begin{cases} 2\int_0^a f & f \text{ even} \\ 0 & f \text{ odd}\end{cases}` },
  { id: "f-m-parts", concept: "math-definite-int", title: "Integration by parts", latex: md`\int_a^b u\,dv = \big[uv\big]_a^b - \int_a^b v\,du` },
  { id: "f-m-eig", concept: "math-eigen", title: "Eigenvalue relations", latex: md`\sum\lambda_i = \operatorname{tr}A,\quad \prod\lambda_i = \det A,\quad \lambda(A^k) = \lambda^k,\quad \lambda(A^{-1}) = 1/\lambda` },
  { id: "f-m-char", concept: "math-eigen", title: "2×2 characteristic equation", latex: md`\lambda^2 - (\operatorname{tr}A)\,\lambda + \det A = 0` },
  { id: "f-m-bayes", concept: "math-conditional-prob", title: "Bayes' theorem", latex: md`P(A_i\mid B) = \frac{P(B\mid A_i)P(A_i)}{\sum_j P(B\mid A_j)P(A_j)}` },
  { id: "f-m-cond", concept: "math-conditional-prob", title: "Conditional probability", latex: md`P(A\mid B) = \frac{P(A\cap B)}{P(B)},\quad \text{independent} \iff P(A\cap B) = P(A)P(B)` },
  { id: "f-m-euler", concept: "math-complex-numbers", title: "Euler's formula", latex: md`e^{j\theta} = \cos\theta + j\sin\theta,\qquad z = re^{j\theta},\ z^n = r^n e^{jn\theta}` },
  // Networks
  { id: "f-n-th", concept: "net-thevenin-norton", title: "Thevenin / Norton", latex: md`V_{th} = V_{oc},\quad I_N = I_{sc},\quad R_{th} = \frac{V_{oc}}{I_{sc}}` },
  { id: "f-n-mpt", concept: "net-max-power", title: "Maximum power transfer", latex: md`R_L = R_{th}\ \Rightarrow\ P_{max} = \frac{V_{th}^2}{4R_{th}};\qquad Z_L = Z_{th}^*` },
  { id: "f-n-rc", concept: "net-rc-rl", title: "First-order response", latex: md`x(t) = x(\infty) + \big[x(0^+) - x(\infty)\big]e^{-t/\tau},\quad \tau = RC \text{ or } L/R` },
  { id: "f-n-res", concept: "net-resonance", title: "Series resonance", latex: md`\omega_0 = \frac{1}{\sqrt{LC}},\quad Q = \frac{\omega_0 L}{R} = \frac{1}{R}\sqrt{\frac{L}{C}},\quad BW = \frac{\omega_0}{Q}` },
  // Electronic devices
  { id: "f-e-mass", concept: "edc-carrier-conc", title: "Mass-action law & Fermi level", latex: md`np = n_i^2,\qquad E_F - E_i = kT\ln\frac{n}{n_i}` },
  { id: "f-e-cond", concept: "edc-drift", title: "Conductivity", latex: md`\sigma = q(n\mu_n + p\mu_p),\qquad \rho = 1/\sigma` },
  { id: "f-e-einstein", concept: "edc-diffusion", title: "Einstein relation", latex: md`\frac{D}{\mu} = \frac{kT}{q} = V_T` },
  { id: "f-e-vbi", concept: "edc-pn", title: "Built-in potential", latex: md`V_{bi} = V_T\ln\frac{N_A N_D}{n_i^2}` },
  { id: "f-e-diode", concept: "edc-pn", title: "Diode equation", latex: md`I = I_S\left(e^{V/\eta V_T} - 1\right),\qquad W \propto \sqrt{V_{bi} + V_R}` },
  // Analog
  { id: "f-a-inv", concept: "an-opamp-basic", title: "Inverting / non-inverting gain", latex: md`A_{inv} = -\frac{R_f}{R_1},\qquad A_{non} = 1 + \frac{R_f}{R_1}` },
  // Digital
  { id: "f-d-demorgan", concept: "dig-boolean", title: "De Morgan's theorems", latex: md`\overline{A+B} = \bar A\,\bar B,\qquad \overline{AB} = \bar A + \bar B` },
  { id: "f-d-2c", concept: "dig-number-systems", title: "2's complement range", latex: md`-2^{n-1} \le N \le 2^{n-1} - 1` },
  // Control
  { id: "f-c-cl", concept: "ctrl-transfer-function", title: "Closed-loop transfer function", latex: md`T(s) = \frac{G(s)}{1 + G(s)H(s)}` },
  { id: "f-c-2nd", concept: "ctrl-transient", title: "Second-order specifications", latex: md`\omega_d = \omega_n\sqrt{1-\zeta^2},\ \ t_p = \frac{\pi}{\omega_d},\ \ M_p = e^{-\zeta\pi/\sqrt{1-\zeta^2}},\ \ t_s \approx \frac{4}{\zeta\omega_n}` },
  { id: "f-c-routh", concept: "ctrl-routh", title: "Cubic stability condition", latex: md`s^3 + a_1s^2 + a_2s + a_3:\ \text{stable} \iff a_i > 0,\ a_1a_2 > a_3` },
  // Communications
  { id: "f-co-am", concept: "comm-am", title: "AM power & efficiency", latex: md`\mu = \frac{A_{max} - A_{min}}{A_{max} + A_{min}},\quad P_t = P_c\left(1 + \frac{\mu^2}{2}\right),\quad \eta = \frac{\mu^2}{2 + \mu^2}` },
  { id: "f-co-carson", concept: "comm-fm", title: "Carson's rule", latex: md`B_T \approx 2(\Delta f + f_m) = 2f_m(\beta + 1)` },
  { id: "f-co-h", concept: "comm-entropy", title: "Entropy", latex: md`H = \sum_i p_i\log_2\frac{1}{p_i},\quad 0 \le H \le \log_2 M,\quad R = rH` },
  { id: "f-co-shannon", concept: "comm-capacity", title: "Shannon–Hartley", latex: md`C = B\log_2\left(1 + \frac{S}{N}\right)` },
  { id: "f-co-pcm", concept: "comm-pcm", title: "PCM SQNR (sinusoid)", latex: md`\text{SQNR} \approx 1.76 + 6.02\,n\ \text{dB}` },
  // Electromagnetics
  { id: "f-em-z0", concept: "em-tl-equations", title: "Lossless line", latex: md`Z_0 = \sqrt{\frac{L}{C}},\qquad v_p = \frac{1}{\sqrt{LC}}` },
  { id: "f-em-gamma", concept: "em-tl-reflection", title: "Reflection & VSWR", latex: md`\Gamma = \frac{Z_L - Z_0}{Z_L + Z_0},\qquad S = \frac{1 + |\Gamma|}{1 - |\Gamma|}` },
  { id: "f-em-zin", concept: "em-tl-reflection", title: "Input impedance", latex: md`Z_{in} = Z_0\frac{Z_L + jZ_0\tan\beta\ell}{Z_0 + jZ_L\tan\beta\ell},\quad Z_{in}\big|_{\lambda/4} = \frac{Z_0^2}{Z_L}` },
  { id: "f-em-skin", concept: "em-skin-depth", title: "Skin depth", latex: md`\delta = \frac{1}{\sqrt{\pi f\mu\sigma}}` },
  // General Aptitude
  { id: "f-ga-pct", concept: "ga-ratios", title: "Successive percentage change", latex: md`\text{net} = a + b + \frac{ab}{100}\ \%,\qquad \text{compensating cut} = \frac{r}{100 + r}\times 100\%` },
  { id: "f-m-rank", concept: "math-linear-systems", title: "Consistency (Rouché–Capelli)", latex: md`\rho(A) = \rho([A|b]) = n \Rightarrow \text{unique};\ \ \rho(A) = \rho([A|b]) < n \Rightarrow \infty;\ \ \rho(A) < \rho([A|b]) \Rightarrow \text{none}` },
];

export const FORMULAS: FormulaDef[] = [...FORMULAS1, ...FORMULAS2];
