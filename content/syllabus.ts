// Complete GATE Electronics & Communication Engineering (EC) syllabus as a
// subject -> chapter -> topic -> concept tree with a cross-subject prerequisite graph.
// Section wording follows the official GATE EC syllabus (General Aptitude + Sections 1–8).
// "Networks, Signals and Systems" is one official section; it is split into two subjects here
// for finer progress tracking. A few foundation concepts (marked "foundation") are not listed
// verbatim in the syllabus but are required to understand listed topics.

import type { ConceptDef, SubjectDef, TopicDef, ChapterDef } from "./types.ts";

const c = (id: string, name: string, summary: string, prereqs: string[] = [], weight: 1 | 2 | 3 = 2): ConceptDef =>
  ({ id, name, summary, prereqs, weight });
const t = (id: string, name: string, concepts: ConceptDef[]): TopicDef => ({ id, name, concepts });
const ch = (id: string, name: string, topics: TopicDef[]): ChapterDef => ({ id, name, topics });

export const SYLLABUS: SubjectDef[] = [
  // ───────────────────────────── GENERAL APTITUDE ─────────────────────────────
  {
    id: "ga", name: "General Aptitude", short: "GA", gateSection: "General Aptitude (GA)", examWeight: 15,
    description: "Common to all GATE papers: 10 questions, 15 marks. Verbal, quantitative, analytical and spatial aptitude.",
    chapters: [
      ch("ga-verbal", "Verbal Aptitude", [
        t("ga-verbal-lang", "English grammar & vocabulary", [
          c("ga-grammar", "Basic English grammar", "Tenses, articles, adjectives, prepositions, conjunctions and verb–noun agreement.", [], 2),
          c("ga-vocab", "Vocabulary: words, idioms and phrases", "Meaning of words, idioms and phrases in context; parts of speech.", [], 2),
        ]),
        t("ga-verbal-reading", "Reading & verbal reasoning", [
          c("ga-reading", "Reading and comprehension", "Extract the main idea, inferences and assumptions from a passage.", [], 2),
          c("ga-narrative", "Narrative sequencing", "Order sentences or events into a coherent paragraph.", [], 1),
        ]),
      ]),
      ch("ga-quant", "Quantitative Aptitude", [
        t("ga-quant-data", "Data interpretation", [
          c("ga-data-interp", "Data graphs, tables and charts", "Bar graphs, pie charts, 2- and 3-dimensional plots, maps and tables.", ["ga-ratios"], 2),
        ]),
        t("ga-quant-arith", "Numerical computation & estimation", [
          c("ga-ratios", "Ratios, percentages, powers, exponents & logarithms", "Proportional reasoning, percentage change, exponent and logarithm rules.", [], 3),
          c("ga-permutations", "Permutations and combinations", "Counting arrangements and selections; the multiplication principle.", [], 2),
          c("ga-series", "Series and numerical estimation", "Arithmetic and geometric progressions, number patterns, approximation.", [], 1),
        ]),
        t("ga-quant-geo", "Mensuration & geometry", [
          c("ga-mensuration", "Mensuration and geometry", "Areas, perimeters, volumes; properties of triangles, circles and polygons.", [], 2),
        ]),
        t("ga-quant-stat", "Elementary statistics & probability", [
          c("ga-elem-prob", "Elementary statistics and probability", "Averages, spread and simple probability of events.", ["ga-permutations"], 2),
        ]),
      ]),
      ch("ga-analytical", "Analytical Aptitude", [
        t("ga-logic", "Logical reasoning", [
          c("ga-deduction", "Logic: deduction and induction", "Valid conclusions from statements; syllogisms; inductive generalisation.", [], 2),
          c("ga-analogy", "Analogy", "Identify the relationship between word or figure pairs.", [], 1),
          c("ga-num-reasoning", "Numerical relations and reasoning", "Seating arrangements, ordering, blood relations and number puzzles.", [], 2),
        ]),
      ]),
      ch("ga-spatial", "Spatial Aptitude", [
        t("ga-spatial-tx", "Spatial transformations", [
          c("ga-shapes", "Transformation of shapes", "Translation, rotation, scaling and mirroring of 2D figures.", [], 1),
          c("ga-paper-folding", "Paper folding, cutting & 3D patterns", "Assembling, grouping, paper folding and cutting, patterns in 2D and 3D.", [], 1),
        ]),
      ]),
    ],
  },

  // ───────────────────────────── ENGINEERING MATHEMATICS ─────────────────────────────
  {
    id: "math", name: "Engineering Mathematics", short: "Math", gateSection: "Section 1: Engineering Mathematics", examWeight: 13,
    description: "Linear algebra, calculus, differential equations, vector analysis, complex analysis, probability and statistics.",
    chapters: [
      ch("math-la", "Linear Algebra", [
        t("math-la-matrix", "Matrix algebra", [
          c("math-matrix-algebra", "Matrix algebra & determinants", "Matrix operations, inverse, determinants and their properties.", [], 2),
          c("math-rank", "Rank of a matrix", "Row-echelon form, rank, and rank via minors.", ["math-matrix-algebra"], 2),
        ]),
        t("math-la-vs", "Vector spaces", [
          c("math-vector-space", "Vector space and basis", "Vector spaces, subspaces, span, basis and dimension.", ["math-matrix-algebra"], 1),
          c("math-lin-indep", "Linear dependence and independence", "Testing sets of vectors for linear independence.", ["math-vector-space", "math-rank"], 2),
        ]),
        t("math-la-systems", "Linear systems", [
          c("math-linear-systems", "Solution of linear equations: existence & uniqueness", "Consistency via rank (Rouché–Capelli); unique, infinite or no solutions.", ["math-rank"], 3),
        ]),
        t("math-la-eigen", "Eigen analysis", [
          c("math-eigen", "Eigenvalues and eigenvectors", "Characteristic equation, properties of eigenvalues, trace/determinant relations, Cayley–Hamilton.", ["math-matrix-algebra"], 3),
        ]),
      ]),
      ch("math-calc", "Calculus", [
        t("math-calc-diff", "Differential calculus", [
          c("math-limits", "Limits, continuity and differentiability", "Foundation: evaluating limits, L'Hôpital's rule, continuity and derivatives.", [], 2),
          c("math-mvt", "Mean value theorems", "Rolle's theorem, Lagrange and Cauchy mean value theorems.", ["math-limits"], 2),
          c("math-partial", "Partial derivatives", "Partial differentiation, chain rule, Euler's theorem on homogeneous functions.", ["math-limits"], 1),
          c("math-maxmin", "Maxima and minima", "Extrema of functions of one and two variables (rt − s² test).", ["math-limits", "math-partial"], 2),
          c("math-taylor", "Taylor series", "Taylor and Maclaurin expansions and approximations.", ["math-limits"], 2),
        ]),
        t("math-calc-int", "Integral calculus", [
          c("math-definite-int", "Definite integrals & theorems of integral calculus", "Evaluating definite integrals, area interpretation, properties (even/odd, shifting), Leibniz rule.", ["math-limits"], 3),
          c("math-improper", "Improper integrals", "Integrals with infinite limits or unbounded integrands; convergence.", ["math-definite-int"], 1),
          c("math-multiple-int", "Multiple integrals", "Double and triple integrals, change of order, polar coordinates.", ["math-definite-int"], 2),
          c("math-line-surface", "Line, surface and volume integrals", "Integrals of scalar and vector fields along curves, over surfaces and volumes.", ["math-multiple-int", "math-vectors"], 2),
        ]),
      ]),
      ch("math-de", "Differential Equations", [
        t("math-de-first", "First-order equations", [
          c("math-ode-first", "First-order linear and nonlinear ODEs", "Separable, exact, linear (integrating factor) and Bernoulli equations.", ["math-definite-int"], 2),
        ]),
        t("math-de-higher", "Higher-order linear equations", [
          c("math-ode-higher", "Higher-order linear ODEs: CF and PI", "Constant-coefficient equations: complementary function and particular integral.", ["math-ode-first", "math-complex-numbers"], 3),
          c("math-cauchy-euler", "Cauchy's and Euler's equations", "Equidimensional equations reduced to constant coefficients by x = eᶻ.", ["math-ode-higher"], 1),
          c("math-var-params", "Variation of parameters", "Particular solution using the Wronskian.", ["math-ode-higher"], 1),
        ]),
        t("math-de-pde", "PDEs & boundary value problems", [
          c("math-pde", "Partial differential equations & separation of variables", "Classification of PDEs; variable-separable method for heat/wave/Laplace equations.", ["math-ode-higher", "math-partial"], 1),
          c("math-ivp-bvp", "Initial and boundary value problems", "Applying initial and boundary conditions to fix constants.", ["math-ode-higher"], 1),
        ]),
      ]),
      ch("math-vec", "Vector Analysis", [
        t("math-vec-ops", "Vector operations", [
          c("math-vectors", "Vectors in plane and space", "Vector algebra, dot and cross products, scalar and vector triple products.", [], 1),
        ]),
        t("math-vec-calc", "Vector calculus", [
          c("math-grad-div-curl", "Gradient, divergence and curl", "Directional derivative, divergence, curl and their physical meaning.", ["math-vectors", "math-partial"], 3),
          c("math-vector-theorems", "Gauss's, Green's and Stokes' theorems", "Converting between line, surface and volume integrals.", ["math-grad-div-curl", "math-line-surface"], 2),
        ]),
      ]),
      ch("math-complex", "Complex Analysis", [
        t("math-cx-functions", "Complex functions", [
          c("math-complex-numbers", "Complex numbers and complex exponentials", "Foundation: polar form, Euler's formula, roots of unity.", [], 3),
          c("math-analytic", "Analytic functions", "Cauchy–Riemann equations, harmonic functions, constructing analytic functions.", ["math-complex-numbers", "math-partial"], 2),
        ]),
        t("math-cx-integration", "Complex integration", [
          c("math-cauchy-integral", "Cauchy's integral theorem and formula", "Contour integrals of analytic functions; Cauchy's integral formula for derivatives.", ["math-analytic"], 2),
          c("math-residue", "Residue theorem", "Poles, residues and evaluating contour integrals.", ["math-cauchy-integral", "math-laurent"], 3),
        ]),
        t("math-cx-series", "Series", [
          c("math-sequences-series", "Sequences, series and convergence tests", "Convergence of sequences and series: ratio, root and comparison tests.", ["math-limits"], 1),
          c("math-laurent", "Taylor and Laurent series", "Power-series expansions of complex functions; region of convergence; singularities.", ["math-sequences-series", "math-analytic"], 2),
        ]),
      ]),
      ch("math-prob", "Probability and Statistics", [
        t("math-prob-stats", "Descriptive statistics", [
          c("math-central-tendency", "Mean, median, mode and standard deviation", "Measures of central tendency and dispersion.", [], 1),
        ]),
        t("math-prob-basics", "Probability fundamentals", [
          c("math-combinatorial-prob", "Combinatorial probability", "Classical probability using counting.", ["ga-permutations"], 2),
          c("math-conditional-prob", "Joint and conditional probability", "Conditional probability, independence, total probability and Bayes' theorem.", ["math-combinatorial-prob"], 3),
        ]),
        t("math-prob-dist", "Probability distributions", [
          c("math-random-variables", "Random variables, PDF/CDF and expectation", "Discrete and continuous random variables, mean, variance, functions of RVs.", ["math-conditional-prob", "math-definite-int"], 3),
          c("math-binomial-poisson", "Binomial and Poisson distributions", "PMFs, mean and variance; Poisson as a limit of binomial.", ["math-random-variables"], 2),
          c("math-exp-normal", "Exponential and normal distributions", "Memoryless property, Gaussian PDF, standardisation and Q-function.", ["math-random-variables"], 2),
        ]),
      ]),
    ],
  },

  // ───────────────────────────── NETWORKS ─────────────────────────────
  {
    id: "net", name: "Networks", short: "Networks", gateSection: "Section 2: Networks, Signals and Systems", examWeight: 9,
    description: "Circuit analysis, network theorems, sinusoidal steady state, transients, Laplace analysis and two-port networks.",
    chapters: [
      ch("net-dc", "Circuit Analysis", [
        t("net-basics", "Circuit laws", [
          c("net-kcl-kvl", "KCL, KVL and source transformations", "Foundation: Kirchhoff's laws, series/parallel reduction, dependent sources, source transformation.", [], 2),
          c("net-nodal-mesh", "Node and mesh analysis", "Systematic nodal and mesh equations including supernodes, supermeshes and dependent sources.", ["net-kcl-kvl", "math-linear-systems"], 3),
        ]),
        t("net-theorems", "Network theorems", [
          c("net-superposition", "Superposition theorem", "Response of linear circuits with multiple independent sources.", ["net-nodal-mesh"], 2),
          c("net-thevenin-norton", "Thevenin's and Norton's theorems", "Equivalent circuits, finding R_th with dependent sources.", ["net-nodal-mesh", "net-superposition"], 3),
          c("net-reciprocity", "Reciprocity theorem", "Interchanging excitation and response in reciprocal networks.", ["net-nodal-mesh"], 1),
          c("net-wye-delta", "Wye–delta transformation", "Converting between star and delta resistor networks.", ["net-kcl-kvl"], 1),
        ]),
      ]),
      ch("net-ac", "Sinusoidal Steady-State Analysis", [
        t("net-phasor-t", "Phasor analysis", [
          c("net-phasors", "Phasors and impedance", "Phasor representation, impedance and admittance, AC circuit analysis.", ["math-complex-numbers", "net-nodal-mesh"], 3),
        ]),
        t("net-power-t", "AC power", [
          c("net-complex-power", "Complex power and power factor", "Real, reactive, apparent and complex power; power factor correction.", ["net-phasors"], 2),
          c("net-max-power", "Maximum power transfer", "Load conditions for maximum power in DC and AC circuits.", ["net-thevenin-norton", "net-phasors"], 2),
        ]),
      ]),
      ch("net-transient", "Time and Frequency Domain Analysis", [
        t("net-transient-t", "Transient response", [
          c("net-rc-rl", "First-order RC and RL circuits", "Time constants, initial/final values, switching transients.", ["net-kcl-kvl", "math-ode-first"], 3),
          c("net-rlc", "Second-order RLC circuits", "Overdamped, critically damped and underdamped responses.", ["net-rc-rl", "math-ode-higher"], 2),
          c("net-resonance", "Resonance and quality factor", "Series and parallel resonance, bandwidth and Q.", ["net-phasors"], 2),
        ]),
        t("net-laplace-t", "Laplace-domain analysis", [
          c("net-laplace-transform", "Laplace transform and its inverse", "Laplace transform pairs and properties, partial fractions, initial/final value theorems.", ["math-definite-int", "math-complex-numbers", "ss-elementary"], 3),
          c("net-laplace-circuits", "Solving network equations using Laplace transform", "s-domain circuit models with initial conditions; transfer functions of circuits.", ["net-laplace-transform", "net-rc-rl"], 3),
        ]),
      ]),
      ch("net-2port", "Two-Port Networks", [
        t("net-2port-t", "Two-port parameters", [
          c("net-2port-params", "Z, Y, h and ABCD parameters", "Defining and converting between two-port parameter sets; reciprocity and symmetry conditions.", ["net-nodal-mesh"], 2),
          c("net-2port-interconnect", "Interconnection of two-port networks", "Series, parallel and cascade connections.", ["net-2port-params"], 1),
        ]),
      ]),
    ],
  },

  // ───────────────────────────── SIGNALS & SYSTEMS ─────────────────────────────
  {
    id: "ss", name: "Signals and Systems", short: "S&S", gateSection: "Section 2: Networks, Signals and Systems", examWeight: 10,
    description: "Continuous- and discrete-time signals, LTI systems, convolution, Fourier, sampling, DTFT, DFT and z-transform.",
    chapters: [
      ch("ss-basics", "Signal Fundamentals", [
        t("ss-signals", "Signals and operations", [
          c("ss-elementary", "Elementary signals and basic operations", "Unit step, ramp, rectangular and exponential signals; amplitude scaling, addition and multiplication of signals.", [], 3),
          c("ss-time-shift", "Time shifting", "x(t − t₀): delay and advance, and how shifting moves every feature of a signal.", ["ss-elementary"], 3),
          c("ss-time-scale", "Time scaling and reversal", "x(at) and x(−t); correct order when combining shift, scale and reversal.", ["ss-time-shift"], 3),
          c("ss-graphical", "Graphical interpretation of signals", "Sketching piecewise signals, reading signals from plots, expressing plots with steps and ramps.", ["ss-elementary", "ss-time-shift", "ss-time-scale"], 3),
          c("ss-impulse", "The unit impulse and its properties", "Dirac delta: sifting, sampling and scaling properties; relation to the unit step.", ["ss-elementary", "math-definite-int"], 3),
          c("ss-signal-classes", "Energy, power, even/odd and periodic signals", "Classifying signals; computing energy, power and fundamental period.", ["ss-elementary", "math-definite-int"], 2),
        ]),
      ]),
      ch("ss-lti", "LTI Systems", [
        t("ss-lti-t", "LTI systems and convolution", [
          c("ss-system-props", "System properties", "Linearity, time invariance, causality, stability and memory: definitions and tests.", ["ss-time-shift", "ss-time-scale"], 3),
          c("ss-convolution", "Continuous-time convolution", "Convolution integral, flip-and-slide method, properties, and the output of an LTI system.", ["ss-elementary", "ss-time-shift", "ss-time-scale", "ss-graphical", "math-definite-int", "ss-impulse", "ss-system-props"], 3),
          c("ss-dt-convolution", "Discrete-time convolution", "Convolution sum, tabular/flip-and-slide method, output length of finite sequences.", ["ss-convolution"], 3),
          c("ss-impulse-response", "Impulse response, causality and stability of LTI systems", "Characterising an LTI system by h(t)/h[n]; causality and BIBO stability conditions.", ["ss-convolution", "ss-system-props"], 3),
        ]),
      ]),
      ch("ss-ct", "Continuous-Time Fourier Analysis", [
        t("ss-fourier-t", "Fourier representations", [
          c("ss-fourier-series", "Fourier series", "Trigonometric and exponential Fourier series, Parseval's theorem, symmetry shortcuts.", ["math-complex-numbers", "ss-signal-classes", "math-definite-int"], 3),
          c("ss-fourier-transform", "Fourier transform and its properties", "CTFT pairs and properties (shift, scaling, duality, convolution, modulation).", ["ss-fourier-series", "ss-impulse"], 3),
          c("ss-freq-response", "Frequency response, poles and zeros", "H(jω), magnitude/phase, pole–zero plots and their effect on response.", ["ss-fourier-transform", "net-laplace-transform", "ss-impulse-response"], 2),
          c("ss-group-delay", "Group delay and phase delay", "τ_g = −dφ/dω and τ_p = −φ/ω; distortionless transmission.", ["ss-freq-response"], 2),
        ]),
        t("ss-sampling-t", "Sampling", [
          c("ss-sampling", "Sampling theorem and applications", "Nyquist rate, aliasing, ideal reconstruction, bandpass sampling.", ["ss-fourier-transform"], 3),
        ]),
      ]),
      ch("ss-dt", "Discrete-Time Signal Analysis", [
        t("ss-dt-transforms", "Discrete-time transforms", [
          c("ss-dtft", "Discrete-time Fourier transform (DTFT)", "DTFT definition, periodicity in ω, properties and common pairs.", ["ss-dt-convolution", "ss-fourier-transform"], 2),
          c("ss-dft", "DFT and FFT", "N-point DFT, circular convolution, properties, FFT computational savings.", ["ss-dtft"], 3),
          c("ss-z-transform", "z-transform and region of convergence", "z-transform pairs, ROC rules, inverse z-transform.", ["ss-dt-convolution", "math-complex-numbers", "math-sequences-series"], 3),
          c("ss-dt-systems", "Discrete-time LTI systems in the z-domain", "System functions, difference equations, causality and stability from ROC/poles.", ["ss-z-transform", "ss-impulse-response"], 2),
        ]),
        t("ss-dt-proc", "Discrete-time processing", [
          c("ss-dt-processing", "Discrete-time processing of continuous-time signals", "C/D and D/C conversion; equivalent analog frequency response.", ["ss-sampling", "ss-dtft"], 1),
        ]),
      ]),
    ],
  },

  // ───────────────────────────── ELECTRONIC DEVICES ─────────────────────────────
  {
    id: "edc", name: "Electronic Devices", short: "Devices", gateSection: "Section 3: Electronic Devices", examWeight: 7,
    description: "Semiconductor physics, carrier transport, P-N junction, BJT, MOS capacitor, MOSFET and optoelectronic devices.",
    chapters: [
      ch("edc-semi", "Semiconductor Physics", [
        t("edc-bands-t", "Energy bands and carriers", [
          c("edc-energy-bands", "Energy bands; intrinsic and extrinsic semiconductors", "Band diagrams, donors and acceptors, n-type and p-type materials.", [], 2),
          c("edc-carrier-conc", "Equilibrium carrier concentration", "Mass-action law n·p = nᵢ², charge neutrality, Fermi level position.", ["edc-energy-bands"], 3),
          c("edc-bandgap", "Direct and indirect band-gap semiconductors", "E–k diagrams; why direct gaps emit light efficiently.", ["edc-energy-bands"], 1),
        ]),
        t("edc-transport-t", "Carrier transport", [
          c("edc-drift", "Drift current, mobility and resistivity", "J = q(nμₙ + pμₚ)E, conductivity and resistivity.", ["edc-carrier-conc"], 3),
          c("edc-diffusion", "Diffusion current and Einstein relation", "J = qD dn/dx, D/μ = kT/q.", ["edc-drift"], 2),
          c("edc-gen-recomb", "Generation and recombination of carriers", "Excess carriers, lifetime, low-level injection.", ["edc-carrier-conc"], 2),
          c("edc-continuity", "Poisson and continuity equations", "Carrier continuity, diffusion length, Poisson's equation in semiconductors.", ["edc-diffusion", "edc-gen-recomb", "math-ode-higher"], 2),
        ]),
      ]),
      ch("edc-devices", "Semiconductor Devices", [
        t("edc-junction-t", "Junction diodes", [
          c("edc-pn", "P-N junction", "Built-in potential, depletion width, capacitance and the diode I–V equation.", ["edc-carrier-conc", "edc-diffusion"], 3),
          c("edc-zener", "Zener diode and breakdown", "Zener and avalanche breakdown; Zener regulator basics.", ["edc-pn"], 2),
        ]),
        t("edc-bjt-t", "Bipolar transistors", [
          c("edc-bjt", "Bipolar junction transistor (BJT)", "Operating regions, current gains α and β, Early effect.", ["edc-pn"], 2),
        ]),
        t("edc-mos-t", "MOS devices", [
          c("edc-moscap", "MOS capacitor", "Accumulation, depletion, inversion; threshold voltage and C–V characteristics.", ["edc-carrier-conc", "edc-continuity"], 2),
          c("edc-mosfet", "MOSFET", "Linear and saturation regions, square-law model, channel-length modulation, body effect.", ["edc-moscap"], 3),
        ]),
        t("edc-opto-t", "Optoelectronic devices", [
          c("edc-opto", "LED, photodiode and solar cell", "Light emission and detection; solar cell I–V, fill factor and efficiency.", ["edc-pn", "edc-bandgap"], 2),
        ]),
      ]),
    ],
  },

  // ───────────────────────────── ANALOG CIRCUITS ─────────────────────────────
  {
    id: "analog", name: "Analog Circuits", short: "Analog", gateSection: "Section 4: Analog Circuits", examWeight: 9,
    description: "Diode circuits, BJT/MOSFET amplifiers, current mirrors, differential amplifiers and op-amp circuits.",
    chapters: [
      ch("an-diode", "Diode Circuits", [
        t("an-diode-t", "Diode applications", [
          c("an-rectifiers", "Rectifiers", "Half-wave and full-wave rectifiers, capacitor filters and ripple.", ["edc-pn", "net-rc-rl"], 2),
          c("an-clip-clamp", "Clipping and clamping circuits", "Wave-shaping with diodes; transfer characteristics.", ["edc-pn"], 2),
        ]),
      ]),
      ch("an-amp", "Transistor Amplifiers", [
        t("an-bias-t", "Biasing", [
          c("an-bjt-bias", "BJT biasing", "Fixed, collector-feedback and voltage-divider bias; operating point and stability.", ["edc-bjt", "net-thevenin-norton"], 2),
          c("an-mos-bias", "MOSFET biasing", "Gate-divider and source-degeneration bias; ensuring saturation.", ["edc-mosfet", "net-thevenin-norton"], 2),
        ]),
        t("an-small-signal-t", "Small-signal analysis", [
          c("an-ss-bjt", "BJT small-signal amplifiers", "Hybrid-π model; CE, CB and CC gain, input and output resistance.", ["an-bjt-bias"], 3),
          c("an-ss-mos", "MOSFET small-signal amplifiers", "gm, rₒ; CS, CG and CD amplifier analysis.", ["an-mos-bias"], 3),
          c("an-freq-response", "Frequency response of amplifiers", "AC coupling, low- and high-frequency cut-offs, Miller effect.", ["an-ss-bjt", "an-ss-mos", "ss-freq-response"], 2),
        ]),
        t("an-diff-t", "Current mirrors & differential amplifiers", [
          c("an-current-mirror", "Current mirrors", "Basic BJT/MOS mirrors, output resistance, current ratios.", ["an-ss-mos", "an-ss-bjt"], 2),
          c("an-diff-amp", "Differential amplifiers", "Differential and common-mode gain, CMRR, active loads.", ["an-current-mirror"], 2),
        ]),
      ]),
      ch("an-opamp", "Op-Amp Circuits", [
        t("an-opamp-linear", "Linear op-amp circuits", [
          c("an-opamp-basic", "Ideal op-amp: inverting and non-inverting amplifiers", "Virtual short, inverting/non-inverting gain, voltage follower.", ["net-kcl-kvl"], 3),
          c("an-summer-diff", "Summers and difference amplifiers", "Weighted summing, subtractor, instrumentation amplifier.", ["an-opamp-basic", "net-superposition"], 2),
          c("an-integrator", "Integrators and differentiators", "Op-amp integrator and differentiator; practical limitations.", ["an-opamp-basic", "net-phasors"], 2),
          c("an-active-filters", "Active filters", "First- and second-order active low-pass, high-pass and band-pass filters.", ["an-integrator", "ss-freq-response"], 2),
        ]),
        t("an-opamp-nonlinear", "Nonlinear op-amp circuits", [
          c("an-schmitt", "Comparators and Schmitt triggers", "Hysteresis, threshold voltages, regenerative feedback.", ["an-opamp-basic"], 2),
          c("an-oscillators", "Oscillators", "Barkhausen criterion; RC phase-shift and Wien-bridge oscillators.", ["an-opamp-basic", "net-phasors"], 2),
        ]),
      ]),
    ],
  },

  // ───────────────────────────── DIGITAL CIRCUITS ─────────────────────────────
  {
    id: "dig", name: "Digital Circuits", short: "Digital", gateSection: "Section 5: Digital Circuits", examWeight: 9,
    description: "Number representation, combinational and sequential circuits, data converters, memories and computer organisation.",
    chapters: [
      ch("dig-comb", "Number Systems & Combinational Circuits", [
        t("dig-numbers", "Number representations", [
          c("dig-number-systems", "Binary and integer representations", "Radix conversion, signed magnitude, 1's and 2's complement, overflow.", [], 3),
          c("dig-floating", "Floating-point numbers", "IEEE-754 format: sign, biased exponent and mantissa.", ["dig-number-systems"], 1),
        ]),
        t("dig-boolean-t", "Boolean logic", [
          c("dig-boolean", "Boolean algebra and logic gates", "Identities, De Morgan's laws, SOP/POS forms, universal gates.", [], 3),
          c("dig-kmap", "Minimisation using Karnaugh maps", "Prime implicants, essential prime implicants, don't-cares.", ["dig-boolean"], 3),
          c("dig-cmos-gates", "Static CMOS logic gates", "Pull-up/pull-down networks, CMOS inverter, NAND/NOR and complex gates.", ["dig-boolean", "edc-mosfet"], 2),
        ]),
        t("dig-comb-blocks", "Combinational building blocks", [
          c("dig-arith", "Arithmetic circuits", "Half/full adders, ripple-carry and carry-lookahead adders, subtractors, comparators.", ["dig-boolean", "dig-number-systems"], 2),
          c("dig-mux-decoder", "Multiplexers, decoders and code converters", "Implementing functions with MUXes and decoders; code conversion.", ["dig-boolean"], 3),
        ]),
      ]),
      ch("dig-seq", "Sequential Circuits", [
        t("dig-ff-t", "Storage elements and timing", [
          c("dig-latches-ff", "Latches and flip-flops", "SR, D, JK and T flip-flops; characteristic and excitation tables.", ["dig-boolean"], 3),
          c("dig-timing", "Propagation delay, setup/hold time and critical path", "Maximum clock frequency and timing constraints.", ["dig-latches-ff"], 2),
        ]),
        t("dig-seq-blocks", "Sequential building blocks", [
          c("dig-counters", "Counters", "Asynchronous and synchronous counters, mod-N counters, ring and Johnson counters.", ["dig-latches-ff"], 3),
          c("dig-shift-registers", "Shift registers", "SISO/SIPO/PISO/PIPO registers and applications.", ["dig-latches-ff"], 1),
          c("dig-fsm", "Finite state machines", "Moore and Mealy machines; state diagrams, sequence detectors.", ["dig-latches-ff", "dig-kmap"], 2),
        ]),
      ]),
      ch("dig-conv", "Data Converters & Memories", [
        t("dig-converters", "Data converters", [
          c("dig-sample-hold", "Sample-and-hold circuits", "Acquisition, droop and aperture time.", ["an-opamp-basic"], 1),
          c("dig-dac", "Digital-to-analog converters", "Weighted-resistor and R-2R ladder DACs; resolution.", ["an-summer-diff", "dig-number-systems"], 2),
          c("dig-adc", "Analog-to-digital converters", "Flash, successive approximation, dual-slope and counter ADCs; conversion time.", ["dig-dac", "dig-sample-hold"], 2),
        ]),
        t("dig-memory-t", "Semiconductor memories", [
          c("dig-memories", "ROM, SRAM and DRAM", "Memory organisation, cell structures, address/data lines.", ["dig-mux-decoder", "dig-latches-ff"], 1),
        ]),
      ]),
      ch("dig-co", "Computer Organisation", [
        t("dig-co-isa", "Instruction set", [
          c("dig-instructions", "Machine instructions and addressing modes", "Instruction formats, immediate/direct/indirect/indexed addressing.", ["dig-number-systems"], 1),
        ]),
        t("dig-co-dp", "Datapath and pipelining", [
          c("dig-datapath", "ALU, data-path and control unit", "Datapath organisation, hardwired vs micro-programmed control.", ["dig-arith", "dig-instructions"], 1),
          c("dig-pipelining", "Instruction pipelining", "Pipeline speed-up, hazards and stalls.", ["dig-datapath", "dig-timing"], 2),
        ]),
      ]),
    ],
  },

  // ───────────────────────────── CONTROL SYSTEMS ─────────────────────────────
  {
    id: "ctrl", name: "Control Systems", short: "Control", gateSection: "Section 6: Control Systems", examWeight: 9,
    description: "Feedback, transfer functions, block diagrams, time and frequency response, stability, compensation and state space.",
    chapters: [
      ch("ctrl-model", "Modelling of Control Systems", [
        t("ctrl-basics", "Fundamentals", [
          c("ctrl-feedback", "Control system components and the feedback principle", "Open- vs closed-loop, effect of feedback on gain, sensitivity and disturbance.", [], 2),
          c("ctrl-transfer-function", "Transfer function", "Transfer function from differential equations; poles, zeros, order and type.", ["net-laplace-transform", "ctrl-feedback"], 3),
        ]),
        t("ctrl-reps", "Graphical representations", [
          c("ctrl-block-diagram", "Block diagram representation", "Block diagram reduction rules.", ["ctrl-transfer-function"], 3),
          c("ctrl-sfg", "Signal flow graphs", "Mason's gain formula, loops and non-touching loops.", ["ctrl-block-diagram"], 3),
        ]),
      ]),
      ch("ctrl-time", "Time-Domain Analysis", [
        t("ctrl-response", "Transient and steady-state response", [
          c("ctrl-transient", "Transient response of first and second order systems", "ζ, ωₙ, rise time, peak time, overshoot and settling time.", ["ctrl-transfer-function", "net-laplace-transform"], 3),
          c("ctrl-steady-state", "Steady-state error and error constants", "System type, Kp, Kv, Ka and steady-state error for standard inputs.", ["ctrl-transfer-function"], 3),
        ]),
        t("ctrl-stability", "Stability analysis", [
          c("ctrl-routh", "Routh–Hurwitz stability criterion", "Routh array, special cases, range of K for stability.", ["ctrl-transfer-function"], 3),
          c("ctrl-root-locus", "Root locus", "Rules for sketching root locus: asymptotes, breakaway points, jω-axis crossings.", ["ctrl-routh"], 3),
        ]),
      ]),
      ch("ctrl-freq", "Frequency-Domain Analysis", [
        t("ctrl-freq-t", "Frequency response methods", [
          c("ctrl-freq-specs", "Frequency response specifications", "Resonant peak, resonant frequency and bandwidth for second-order systems.", ["ctrl-transient", "ss-freq-response"], 2),
          c("ctrl-bode", "Bode plots, gain and phase margins", "Asymptotic Bode plots, gain/phase crossover, stability margins.", ["ctrl-freq-specs"], 3),
          c("ctrl-nyquist", "Nyquist stability criterion", "Nyquist plot, encirclements, N = Z − P.", ["ctrl-bode", "math-complex-numbers"], 3),
        ]),
        t("ctrl-comp-t", "Compensation", [
          c("ctrl-compensation", "Lag, lead and lag-lead compensation", "Compensator transfer functions, maximum phase lead and design intuition.", ["ctrl-bode"], 2),
        ]),
      ]),
      ch("ctrl-state", "State-Space Analysis", [
        t("ctrl-ss-t", "State variable models", [
          c("ctrl-state-model", "State variable model", "State equations, transfer function from state space, controllability/observability basics.", ["ctrl-transfer-function", "math-matrix-algebra"], 2),
          c("ctrl-state-solution", "Solution of state equations", "State transition matrix e^{At} and its properties.", ["ctrl-state-model", "math-eigen", "net-laplace-transform"], 2),
        ]),
      ]),
    ],
  },

  // ───────────────────────────── COMMUNICATIONS ─────────────────────────────
  {
    id: "comm", name: "Communications", short: "Comm", gateSection: "Section 7: Communications", examWeight: 10,
    description: "Random processes, analog modulation, information theory, digital communication and error control coding.",
    chapters: [
      ch("comm-random", "Random Processes", [
        t("comm-rp-t", "Random processes", [
          c("comm-random-process", "Random processes and autocorrelation", "Stationarity (WSS), autocorrelation and its properties.", ["math-random-variables"], 2),
          c("comm-psd", "Power spectral density and white noise", "Wiener–Khinchin theorem; properties of white noise.", ["comm-random-process", "ss-fourier-transform"], 3),
          c("comm-lti-filtering", "Filtering of random signals through LTI systems", "S_Y(f) = |H(f)|² S_X(f); output noise power.", ["comm-psd", "ss-impulse-response"], 3),
        ]),
      ]),
      ch("comm-analog", "Analog Communications", [
        t("comm-am-t", "Amplitude modulation", [
          c("comm-am", "Amplitude modulation and demodulation", "DSB-FC, DSB-SC, SSB; modulation index, power and efficiency, envelope and coherent detection.", ["ss-fourier-transform"], 3),
        ]),
        t("comm-fm-t", "Angle modulation", [
          c("comm-fm", "Angle modulation and demodulation", "FM/PM, frequency deviation, Carson's rule, spectra and demodulation.", ["comm-am"], 3),
        ]),
        t("comm-rx-t", "Receivers", [
          c("comm-superhet", "Superheterodyne receivers", "Intermediate frequency, image frequency and image rejection.", ["comm-am"], 2),
        ]),
      ]),
      ch("comm-info", "Information Theory", [
        t("comm-info-t", "Information measures", [
          c("comm-entropy", "Entropy", "Self-information, source entropy, information rate.", ["math-conditional-prob"], 3),
          c("comm-capacity", "Mutual information and channel capacity", "Mutual information, BSC capacity, Shannon–Hartley theorem.", ["comm-entropy"], 3),
        ]),
      ]),
      ch("comm-digital", "Digital Communications", [
        t("comm-baseband", "Baseband transmission", [
          c("comm-pcm", "PCM and DPCM", "Quantisation, bit rate, quantisation noise and SQNR; differential PCM.", ["ss-sampling"], 3),
          c("comm-isi", "Bandwidth and inter-symbol interference", "Nyquist criterion for zero ISI, raised-cosine pulses, bandwidth.", ["ss-fourier-transform", "comm-pcm"], 2),
        ]),
        t("comm-mod-t", "Digital modulation", [
          c("comm-digital-mod", "Digital modulation schemes", "ASK, PSK, FSK, QAM: constellations and bandwidth.", ["comm-am", "comm-isi"], 3),
        ]),
        t("comm-detect-t", "Detection", [
          c("comm-map-ml", "MAP and ML detection", "Decision rules, likelihood ratios and thresholds.", ["math-conditional-prob", "math-exp-normal"], 2),
          c("comm-matched-filter", "Matched filter receiver", "Impulse response, maximum output SNR = 2E/N₀.", ["ss-convolution", "comm-lti-filtering"], 3),
          c("comm-ber", "SNR and bit error rate", "BER of BPSK, BFSK, QPSK in AWGN using the Q-function.", ["comm-matched-filter", "comm-map-ml"], 3),
        ]),
        t("comm-coding-t", "Error control coding", [
          c("comm-hamming", "Error correction and Hamming codes", "Hamming distance, detection/correction capability, (7,4) Hamming code.", ["dig-boolean"], 2),
          c("comm-crc", "Cyclic redundancy check (CRC)", "Polynomial division over GF(2), CRC generation and checking.", ["comm-hamming"], 1),
        ]),
      ]),
    ],
  },

  // ───────────────────────────── ELECTROMAGNETICS ─────────────────────────────
  {
    id: "em", name: "Electromagnetics", short: "EM", gateSection: "Section 8: Electromagnetics", examWeight: 9,
    description: "Maxwell's equations, plane waves, transmission lines, waveguides, optical fibres and antennas.",
    chapters: [
      ch("em-maxwell", "Maxwell's Equations", [
        t("em-maxwell-t", "Maxwell's equations", [
          c("em-maxwell-eqns", "Maxwell's equations: differential and integral forms", "Physical interpretation of each equation; displacement current.", ["math-grad-div-curl", "math-vector-theorems"], 3),
          c("em-boundary", "Boundary conditions", "Tangential E and H, normal D and B across interfaces.", ["em-maxwell-eqns"], 2),
          c("em-wave-eqn", "Wave equation", "Deriving the wave equation from Maxwell's equations.", ["em-maxwell-eqns", "math-pde"], 2),
          c("em-poynting", "Poynting vector", "Power flow density and time-average power.", ["em-maxwell-eqns", "math-vectors"], 2),
        ]),
      ]),
      ch("em-waves", "Plane Waves", [
        t("em-plane-t", "Plane-wave propagation", [
          c("em-plane-waves", "Uniform plane waves and propagation in media", "Propagation constant, intrinsic impedance in lossless and lossy media.", ["em-wave-eqn", "math-complex-numbers"], 3),
          c("em-skin-depth", "Propagation in conductors and skin depth", "Good conductors, attenuation, skin depth δ = 1/√(πfμσ).", ["em-plane-waves"], 2),
          c("em-polarization", "Polarisation", "Linear, circular and elliptical polarisation; handedness.", ["em-plane-waves"], 2),
          c("em-phase-group", "Phase and group velocity", "v_p = ω/β, v_g = dω/dβ; dispersion.", ["em-plane-waves"], 2),
          c("em-reflection", "Reflection and refraction", "Normal and oblique incidence, Snell's law, Brewster angle, total internal reflection.", ["em-plane-waves", "em-boundary"], 3),
        ]),
      ]),
      ch("em-tl", "Transmission Lines", [
        t("em-tl-t", "Transmission line theory", [
          c("em-tl-equations", "Transmission line equations and characteristic impedance", "Telegrapher's equations, Z₀, propagation constant, lossless lines.", ["net-phasors", "math-ode-higher"], 3),
          c("em-tl-reflection", "Reflection coefficient, VSWR and impedance transformation", "Γ, VSWR, input impedance of terminated lines.", ["em-tl-equations"], 3),
          c("em-matching", "Impedance matching", "Quarter-wave transformers and stub matching.", ["em-tl-reflection"], 2),
          c("em-smith-chart", "Smith chart", "Reading impedance and admittance on the Smith chart.", ["em-tl-reflection"], 2),
          c("em-s-params", "S-parameters", "Scattering matrix, reciprocity and losslessness.", ["em-tl-reflection", "net-2port-params"], 2),
        ]),
      ]),
      ch("em-guided", "Waveguides, Optical Fibres and Antennas", [
        t("em-wg-t", "Guided waves", [
          c("em-rect-waveguide", "Rectangular waveguides", "TE/TM modes, cut-off frequency, dominant mode, guide wavelength.", ["em-plane-waves", "em-boundary", "em-phase-group"], 3),
          c("em-circ-waveguide", "Circular waveguides", "Modes and cut-off using Bessel-function roots; dominant TE₁₁ mode.", ["em-rect-waveguide"], 1),
          c("em-optical-fiber", "Light propagation in optical fibres", "Numerical aperture, acceptance angle, modes, total internal reflection.", ["em-reflection"], 2),
        ]),
        t("em-ant-t", "Antennas", [
          c("em-dipole", "Dipole and monopole antennas", "Hertzian and half-wave dipoles, radiation resistance, directivity, monopoles.", ["em-poynting"], 2),
          c("em-arrays", "Linear antenna arrays", "Array factor, broadside and end-fire arrays.", ["em-dipole", "math-complex-numbers"], 2),
        ]),
      ]),
    ],
  },
];

export function allConcepts(): { concept: ConceptDef; subjectId: string; chapterId: string; topicId: string }[] {
  const out: { concept: ConceptDef; subjectId: string; chapterId: string; topicId: string }[] = [];
  for (const s of SYLLABUS) for (const chp of s.chapters) for (const tp of chp.topics) for (const cc of tp.concepts)
    out.push({ concept: cc, subjectId: s.id, chapterId: chp.id, topicId: tp.id });
  return out;
}
