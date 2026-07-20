const SITE_NAME = "Kaizen Maths";
const SITE_TITLE = "Kaizen Maths | Complete Mathematics Workspace for Teachers";
const SITE_DESCRIPTION = "Kaizen Maths is a complete mathematics workspace and virtual textbook for teachers. Generate unlimited curriculum-aligned questions, worked examples, bespoke worksheets, assessments, and classroom practice in minutes.";
const CLASSROOM_STANDARD_VERSION = "classroom-standard-2";

function addQueryParam(url, key, value) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

function classroomToolPath(toolPath) {
  return addQueryParam(toolPath, "classroomStandard", CLASSROOM_STANDARD_VERSION);
}

function classroomSharedAsset(fileName) {
  return new URL(`tools/_shared/${fileName}?v=${CLASSROOM_STANDARD_VERSION}`, window.location.href).href;
}

function updateMetaTag(selector, attribute, value) {
  const tag = document.head.querySelector(selector);
  if (tag) tag.setAttribute(attribute, value);
}

function setPageSeo(title = SITE_TITLE, description = SITE_DESCRIPTION) {
  document.title = title;
  updateMetaTag('meta[name="description"]', "content", description);
  updateMetaTag('meta[property="og:title"]', "content", title);
  updateMetaTag('meta[property="og:description"]', "content", description);
  updateMetaTag('meta[name="twitter:title"]', "content", title);
  updateMetaTag('meta[name="twitter:description"]', "content", description);
}

function titleWithSite(pageTitle) {
  return pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_TITLE;
}

const tools = [
  {
    slug: "substitution",
    title: "Algebraic Substitution",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Pilot",
    description: "Generate substitution questions with answers, worked steps, a timer, and teacher notes.",
    tags: ["algebra", "substitution", "expressions", "worked steps"],
    toolPath: "tools/substitution/index.html?v=substitution-expression-wording-1",
    imported: true,
    legacyUrl: "https://www.kaizen-maths.com/substitution",
    teacherNotes: [
      "Designed for board-led infinite practice with levels and instant regeneration.",
      "Keep the original question tool intact; the main site organises access, guidance, and navigation.",
      "Good candidate for saved seeds and printable problem sets later."
    ]
  },
  {
    slug: "quadratic-equations",
    title: "Quadratic Equations",
    category: "Algebra",
    level: "GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate quadratic-equation practice across square-root, factorable, formula, non-standard, and disguised forms.",
    tags: ["algebra", "quadratics", "factorising", "quadratic formula", "discriminant", "disguised quadratics"],
    toolPath: "tools/quadratic-equations/index.html?v=quadratic-formula-subscripts-1",
    imported: true,
    teacherNotes: [
      "Builds from square-root equations into factorisation, the quadratic formula, and non-standard forms.",
      "Includes mixed sets at every level for retrieval practice and method selection.",
      "Formula-based answers are rounded to 2 decimal places, while factorable answers stay exact."
    ]
  },
  {
    slug: "algebraic-fractions",
    title: "Algebraic Fractions",
    category: "Algebra",
    level: "GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate GCSE algebraic-fraction practice for simplifying, multiplying, dividing, adding, subtracting, and solving equations.",
    tags: ["algebra", "algebraic fractions", "simplifying fractions", "factorising", "common denominator", "equations"],
    toolPath: "tools/algebraic-fractions/index.html?v=algebraic-fractions-ingenuity-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on factorising and cancelling common factors.",
      "Level 2 covers multiplying and dividing algebraic fractions.",
      "Level 3 combines fractions using common denominators.",
      "Level 4 solves equations involving algebraic fractions and checks excluded values."
    ]
  },
  {
    slug: "straight-lines",
    title: "Straight Line Graphs and Gradients",
    category: "Algebra",
    level: "GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate straight-line graph questions covering gradients, intercepts, line equations, intersections, and parallel or perpendicular lines.",
    tags: ["algebra", "coordinate geometry", "straight lines", "gradient", "intercepts", "linear graphs"],
    toolPath: "tools/straight-lines/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Four levels move from gradient and intercept fluency into equation finding and line relationships.",
      "Fractional gradients and intercepts are displayed as stacked fractions for classroom readability.",
      "Useful bridge between algebraic rearrangement and coordinate geometry graph work."
    ]
  },
  {
    slug: "linear-programming",
    title: "Linear Programming",
    category: "Algebra",
    level: "GCSE / A-Level / IB / CSEC",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate linear programming practice covering constraints, feasible regions, vertices, objective functions, optimisation, contextual profit and cost problems, and integer solutions.",
    tags: ["algebra", "linear programming", "inequalities", "feasible region", "objective function", "optimisation", "optimization", "vertices", "constraints", "coordinate geometry", "GCSE", "A-Level", "IB", "CSEC", "CAPE"],
    toolPath: "tools/linear-programming/index.html?v=linear-programming-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on reading constraints, identifying feasible regions, listing vertices, and testing points.",
      "Level 2 maximises or minimises linear objective functions by testing every feasible vertex.",
      "Level 3 applies linear programming to contextual profit, cost, and whole-number solution problems.",
      "Worked steps emphasise that the optimum of a linear objective over a polygonal feasible region occurs at a vertex."
    ]
  },
  {
    slug: "conic-intersections",
    title: "Line and Curve Intersections",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate two-problem challenge sets for intersections of lines with circles, parabolas, hyperbolas, and mixed curve problems.",
    tags: ["algebra", "coordinate geometry", "conics", "circles", "parabolas", "hyperbolas", "intersections"],
    toolPath: "tools/conic-intersections/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Uses substitution to reduce line-conic intersections to a quadratic equation.",
      "Includes two-point, tangent, no-intersection, and mixed conic cases.",
      "Challenge sets use two longer problems with complete worked solutions."
    ]
  },
  {
    slug: "differentiation-polynomials",
    title: "Basic Differentiation of Polynomials",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate polynomial differentiation questions using the power rule, gradients, tangent lines, and normal lines.",
    tags: ["algebra", "calculus", "differentiation", "derivatives", "polynomials", "tangents", "normals"],
    toolPath: "tools/differentiation-polynomials/index.html?v=poly-diff-one-line-3",
    imported: true,
    teacherNotes: [
      "Builds from single-term power rule fluency into multi-term polynomials.",
      "Applications connect derivative functions to gradients, tangent lines, and normal lines.",
      "Step highlighting isolates current terms, coefficient multiplication, and power reduction."
    ]
  },
  {
    slug: "integration",
    title: "Basic Integration and Definite Integrals",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate foundation integration practice covering reverse differentiation, indefinite integrals, definite integrals, and the trapezium rule.",
    tags: ["algebra", "calculus", "integration", "integrals", "trapezium rule", "area under curve"],
    toolPath: "tools/integration/index.html?v=calculus-algebra-steps-1",
    imported: true,
    teacherNotes: [
      "Starts with integration as reverse differentiation and the constant of integration.",
      "Definite integral sets emphasise antiderivatives, bounds, and careful substitution.",
      "Trapezium rule sets include table setup, equal strips, and final rounded approximations."
    ]
  },
  {
    slug: "advanced-integration",
    title: "Integration by Substitution and Parts",
    category: "Algebra",
    level: "A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate advanced integration practice for substitution, definite substitution, logarithmic derivative forms, and integration by parts.",
    tags: ["algebra", "calculus", "integration", "substitution", "integration by parts", "A-Level Pure", "Further Maths"],
    toolPath: "tools/advanced-integration/index.html?v=advanced-integration-1",
    imported: true,
    teacherNotes: [
      "Substitution sets show the choice of u, calculation of du/dx, replacement of dx, integration in u, and return to x.",
      "Definite substitution sets include changing limits before evaluating.",
      "Integration by parts sets show the full setup of u, dv, du, and v before applying the formula."
    ]
  },
  {
    slug: "volumes-of-revolution",
    title: "Volumes of Revolution",
    category: "Algebra",
    level: "A-Level / Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate integration practice for volumes of revolution, including the disc method, expanded radius expressions, washers between curves, y-axis rotation, and parameter problems.",
    tags: ["algebra", "calculus", "integration", "volumes of revolution", "disc method", "washer method", "A-Level Pure", "Further Maths"],
    toolPath: "tools/volumes-of-revolution/index.html?v=volumes-revolution-1",
    imported: true,
    teacherNotes: [
      "Students identify the radius first, then use the correct volume formula for the axis of rotation.",
      "Worked steps show the squared radius, expansion or simplification, integration, substitution of bounds, and multiplication by pi.",
      "Washer questions emphasise outer radius squared minus inner radius squared.",
      "The y-axis questions use x as the radius and integrate with respect to y."
    ]
  },
  {
    slug: "integration-algebraic-fractions",
    title: "Integration of Algebraic Fractions",
    category: "Algebra",
    level: "A-Level / Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate integration practice for algebraic fractions, including logarithmic forms, simplification, polynomial division, partial fractions, and quadratic denominator forms.",
    tags: ["algebra", "calculus", "integration", "algebraic fractions", "rational functions", "partial fractions", "logarithms", "inverse tangent", "polynomial division", "A-Level", "Further Maths"],
    toolPath: "tools/integration-algebraic-fractions/index.html?v=integration-algebraic-fractions-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers linear denominator logarithmic forms and numerator-as-derivative structures.",
      "Level 2 covers cancelling factors and polynomial division before integration.",
      "Level 3 covers integration after partial fraction decomposition.",
      "Level 4 covers quadratic denominators, completing the square, logarithm forms, and inverse tangent forms."
    ]
  },
  {
    slug: "partial-fractions",
    title: "Partial Fractions: Decomposition",
    category: "Algebra",
    level: "A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate partial-fractions practice with clear worked steps for linear factors, repeated factors, improper fractions, and quadratic factors.",
    tags: ["algebra", "partial fractions", "rational functions", "improper fractions", "quadratic factors", "A-Level"],
    toolPath: "tools/partial-fractions/index.html?v=batch1-steps-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers distinct linear factors using substitution values.",
      "Level 2 covers repeated linear factors and coefficient comparison.",
      "Level 3 includes improper fractions where division is required first.",
      "Level 4 introduces an irreducible quadratic factor with a linear numerator."
    ]
  },
  {
    slug: "matrices",
    title: "Matrices: Operations, Determinants and Inverses",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate matrix questions covering addition, subtraction, scalar multiplication, multiplication, determinants, inverses, and algebraic matrix problems.",
    tags: ["algebra", "matrices", "determinants", "inverse matrices", "matrix multiplication", "singular matrices", "A-Level"],
    toolPath: "tools/matrices/index.html?v=matrix-multi-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on matrix operations: addition, subtraction, and scalar multiplication.",
      "Level 2 develops determinant, inverse, and multiplication fluency for 2 by 2 and 3 by 3 matrices.",
      "Level 3 uses unknown entries, singular matrices, and matrix equalities with several variables."
    ]
  },
  {
    slug: "advanced-matrices",
    title: "Advanced Matrices: Transformations and Eigenvalues",
    category: "Algebra",
    level: "A-Level Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate advanced matrix practice covering transformations, eigenvalues, eigenvectors, diagonalisation, Cayley-Hamilton, powers, and matrix systems.",
    tags: ["algebra", "further maths", "advanced matrices", "eigenvalues", "eigenvectors", "diagonalisation", "Cayley-Hamilton", "matrix transformations", "systems"],
    toolPath: "tools/advanced-matrices/index.html?v=advanced-matrices-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers matrix transformations, composite transformations, and fixed lines.",
      "Level 2 develops characteristic equations, eigenvalues, eigenvectors, and diagonalisation.",
      "Level 3 uses Cayley-Hamilton to form relations, find inverses, and calculate powers.",
      "Level 4 solves matrix equations and systems, including triangular 3 by 3 systems."
    ]
  },
  {
    slug: "linear-algebra",
    title: "Linear Algebra: Systems, Span, Basis and Transformations",
    category: "Algebra",
    level: "A-Level Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate linear algebra practice covering row operations, systems, span, linear independence, basis, kernel, image, rank-nullity, linear transformations, and change of basis.",
    tags: ["algebra", "further maths", "linear algebra", "row operations", "Gaussian elimination", "span", "basis", "linear independence", "kernel", "image", "rank", "nullity", "linear transformations", "change of basis", "A-Level Further Maths"],
    toolPath: "tools/linear-algebra/index.html?v=linear-algebra-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers systems of equations, augmented matrices, row operations, and back substitution.",
      "Level 2 develops span, linear combinations, linear independence, bases, and dimension.",
      "Level 3 focuses on linear transformations, kernel, image, rank, and nullity.",
      "Level 4 introduces change of basis, basis coordinates, and linear maps defined by basis images."
    ]
  },
  {
    slug: "further-vectors",
    title: "Further Vectors: Lines, Planes and Products",
    category: "Algebra",
    level: "A-Level Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate Further Maths vector practice covering 3D vectors, scalar products, vector equations of lines, planes, cross products, projections, and intersections.",
    tags: ["algebra", "further maths", "vectors", "3D vectors", "scalar product", "dot product", "cross product", "planes", "vector lines", "projections"],
    toolPath: "tools/further-vectors/index.html?v=further-vectors-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers 3D position vectors, displacement vectors, magnitudes, unit vectors, and ratio points.",
      "Level 2 develops scalar product, angles between vectors, perpendicularity, and vector projections.",
      "Level 3 covers vector equations of lines, line intersections, point-on-line tests, and distances from points to lines.",
      "Level 4 covers cross products, planes, normals, and line-plane intersections."
    ]
  },
  {
    slug: "proof-by-induction",
    title: "Proof by Induction",
    category: "Algebra",
    level: "A-Level Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate Further Maths proof by induction practice covering sums, divisibility, inequalities, recurrence relations, and matrix powers.",
    tags: ["algebra", "further maths", "proof", "proof by induction", "mathematical induction", "sums", "divisibility", "inequalities", "recurrence relations", "matrix powers"],
    toolPath: "tools/proof-by-induction/index.html?v=proof-by-induction-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers induction proofs for arithmetic, odd-number, square, and geometric sums.",
      "Level 2 covers divisibility proofs using powers, differences of powers, and polynomial expressions.",
      "Level 3 covers inequalities and closed forms for recurrence relations.",
      "Level 4 covers induction proofs for powers of 2 by 2 matrices."
    ]
  },
  {
    slug: "roots-of-equations",
    title: "Roots of Equations and Transformations of Roots",
    category: "Algebra",
    level: "A-Level Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate Further Maths roots of equations practice covering quadratic roots, cubic roots, transformed roots, repeated roots, parameters, and complex conjugate roots.",
    tags: ["algebra", "further maths", "roots of equations", "polynomial roots", "Vieta", "quadratic roots", "cubic roots", "transformed roots", "complex roots"],
    toolPath: "tools/roots-of-equations/index.html?v=roots-of-equations-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers roots and coefficients for quadratics, forming equations, unknown coefficients, and symmetric expressions.",
      "Level 2 covers cubic Vieta relationships, forming cubics, unknown coefficients, and cubic symmetric expressions.",
      "Level 3 covers shifted, scaled, reciprocal, and squared roots.",
      "Level 4 covers repeated roots, parameter questions, complex conjugate roots, and exam-style mixed root relationships."
    ]
  },
  {
    slug: "series-expansions",
    title: "Taylor and Maclaurin Series",
    category: "Algebra",
    level: "A-Level Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate Further Maths series expansion practice covering Maclaurin series, Taylor series, substitution, products of series, approximations, limits, coefficients, and simple power-series solutions.",
    tags: ["algebra", "calculus", "further maths", "series", "Maclaurin series", "Taylor series", "power series", "approximations", "limits"],
    toolPath: "tools/series-expansions/index.html?v=series-expansions-2",
    imported: true,
    teacherNotes: [
      "Level 1 covers standard Maclaurin series, derivative values at zero, simple expansions, and conditions of validity.",
      "Level 2 covers substitution into standard series, products, reciprocal or quotient expansions, and numerical approximations.",
      "Level 3 covers Taylor polynomials, Taylor expansions about a point, approximations near the expansion point, and reading derivative values from a series.",
      "Level 4 covers limits using series, coefficients in products of series, and simple power-series solutions to differential equations."
    ]
  },
  {
    slug: "numerical-methods",
    title: "Numerical Methods: Iteration, Newton-Raphson and Trapezium Rule",
    category: "Algebra",
    level: "A-Level / Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate numerical methods practice covering sign changes, bisection, fixed-point iteration, Newton-Raphson, the trapezium rule, and Euler's method.",
    tags: ["algebra", "calculus", "numerical methods", "iteration", "Newton-Raphson", "bisection", "sign change", "trapezium rule", "Euler method", "roots", "A-Level", "Further Maths"],
    toolPath: "tools/numerical-methods/index.html?v=numerical-methods-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers sign changes, bisection, and fixed-point iteration.",
      "Level 2 develops Newton-Raphson, including substituted one-step and two-step iterations.",
      "Level 3 covers the trapezium rule from tables, functions, and interval information.",
      "Level 4 introduces Euler's method for numerical solutions of first-order differential equations."
    ]
  },
  {
    slug: "complex-numbers",
    title: "Complex Numbers",
    category: "Algebra",
    level: "A-Level Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate Further Maths complex number practice covering Cartesian arithmetic, conjugates, modulus, argument, polar form, De Moivre's theorem, roots, equations, and Argand loci.",
    tags: ["algebra", "further maths", "complex numbers", "imaginary numbers", "Argand diagram", "modulus", "argument", "polar form", "De Moivre", "roots"],
    toolPath: "tools/complex-numbers/index.html?v=complex-numbers-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers Cartesian arithmetic, multiplication, division by conjugates, conjugates, and modulus.",
      "Level 2 covers modulus, principal argument, Cartesian-polar conversion, and polar multiplication or division.",
      "Level 3 covers De Moivre's theorem, nth roots, complex quadratics, and simple complex equations.",
      "Level 4 covers circle loci, perpendicular bisectors, argument loci, and mixed exam-style questions."
    ]
  },
  {
    slug: "polar-coordinates",
    title: "Polar Coordinates and Polar Curves",
    category: "Algebra",
    level: "A-Level Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate Further Maths polar coordinates practice covering coordinate conversion, equivalent points, polar curves, intersections, gradients, and area using the polar area formula.",
    tags: ["algebra", "further maths", "polar coordinates", "polar curves", "area", "intersections", "gradients", "calculus"],
    toolPath: "tools/polar-coordinates/index.html?v=polar-coordinates-2",
    imported: true,
    teacherNotes: [
      "Level 1 covers polar plotting, equivalent coordinates, and conversion between polar and Cartesian form.",
      "Level 2 covers standard polar curves, circles, and substitution into polar equations.",
      "Level 3 covers intersections of polar curves and gradients using dy/dx in polar form.",
      "Level 4 covers areas using one half integral r squared d theta."
    ]
  },
  {
    slug: "hyperbolic-functions",
    title: "Hyperbolic Functions",
    category: "Algebra",
    level: "A-Level Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate Further Maths hyperbolic functions practice covering definitions, identities, equations, calculus, and inverse hyperbolic functions.",
    tags: ["algebra", "further maths", "hyperbolic functions", "sinh", "cosh", "tanh", "inverse hyperbolic functions", "calculus", "identities"],
    toolPath: "tools/hyperbolic-functions/index.html?v=hyperbolic-functions-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers exponential definitions, exact values at logarithms, and core hyperbolic identities.",
      "Level 2 solves hyperbolic equations using exponential form, inverse functions, and cosh x plus or minus sinh x shortcuts.",
      "Level 3 covers differentiation, integration, product rule, and second derivatives.",
      "Level 4 covers logarithmic forms and derivatives of inverse hyperbolic functions."
    ]
  },
  {
    slug: "differential-equations",
    title: "Differential Equations: First and Second Order",
    category: "Algebra",
    level: "A-Level / Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate differential equations practice covering first-order separable equations, first-order linear equations, second-order constant coefficient equations, and modelling problems.",
    tags: ["algebra", "calculus", "differential equations", "separable equations", "first-order linear", "second-order differential equations", "modelling", "A-Level", "Further Maths"],
    toolPath: "tools/differential-equations/index.html?v=differential-equations-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers first-order separable equations, including initial conditions.",
      "Level 2 covers first-order linear equations using integrating factors.",
      "Level 3 covers second-order constant coefficient equations with real, repeated, complex, and simple forced cases.",
      "Level 4 covers modelling problems such as growth, decay, cooling, and mixing."
    ]
  },
  {
    slug: "differentiation-rules",
    title: "Product, Quotient and Chain Rule",
    category: "Algebra",
    level: "A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate general differentiation practice for product rule, quotient rule, chain rule, trigonometric, logarithmic, tangent, normal, and turning-point problems.",
    tags: ["algebra", "calculus", "differentiation", "power rule", "product rule", "quotient rule", "chain rule", "trigonometry", "logarithms"],
    toolPath: "tools/differentiation-rules-general/index.html?v=diff-rules-one-line-1",
    imported: true,
    teacherNotes: [
      "Extends polynomial differentiation into product, quotient, chain, trigonometric, and logarithmic rules.",
      "Application sets connect derivatives with tangents, normals, and turning-point classification.",
      "Worked steps focus on rule recognition, substitution into formulas, and algebraic simplification."
    ]
  },
  {
    slug: "trig-differentiation-rules",
    title: "Trigonometric Differentiation",
    category: "Algebra",
    level: "A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate trigonometric differentiation practice with chain rule, product rule, quotient rule, and mixed-rule challenges.",
    tags: ["algebra", "calculus", "differentiation", "trigonometry", "chain rule", "product rule", "quotient rule"],
    toolPath: "tools/differentiation-rules/index.html?v=batch1-steps-1",
    imported: true,
    teacherNotes: [
      "Focuses on trigonometric differentiation from core derivatives through composite, product, and quotient rule tasks.",
      "Mixed challenge sets require deliberate rule selection and simplification of constants and signs.",
      "Worked steps emphasize identifying inner functions and retaining squared trig factors such as sec^2 and csc^2."
    ]
  },
  {
    slug: "inverse-trig-differentiation",
    title: "Inverse Trig Differentiation",
    category: "Algebra",
    level: "A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Practise derivatives of inverse trigonometric functions, including chain rule, evaluated gradients, tangents, and normals.",
    tags: ["algebra", "calculus", "differentiation", "inverse trigonometry", "chain rule", "tangents", "normals"],
    toolPath: "tools/inverse-trig-differentiation/index.html?v=batch1-steps-1",
    imported: true,
    teacherNotes: [
      "Covers sin^-1, cos^-1, tan^-1, cot^-1, sec^-1, and csc^-1 derivative forms.",
      "Evaluation questions reinforce substitution into inverse trig derivative formulae.",
      "Line-equation sets connect gradients with tangents and normals at specified points."
    ]
  },
  {
    slug: "trig-equation-solver",
    title: "Trigonometric Equation Solver",
    category: "Algebra",
    level: "A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate trigonometric equation solving practice in radians on 0 <= x < 2pi, including linear and quadratic trig equations.",
    tags: ["algebra", "trigonometry", "equations", "radians", "quadratic trig", "unit circle"],
    toolPath: "tools/trig-equation-solver/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Covers sine, cosine, and tangent equations with multiple-angle and shifted-angle forms.",
      "Quadratic sets use a substitution such as t = sin(theta) or t = cos(theta), then return to trig solutions.",
      "Worked steps emphasize all solutions in the interval 0 <= x < 2pi."
    ]
  },
  {
    slug: "trig-graphs-transformations",
    title: "Trigonometric Graphs and Transformations",
    category: "Algebra",
    level: "GCSE / A-Level / IB / CAPE",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate graph-led trigonometry practice covering sine, cosine, tangent, amplitude, period, phase shift, midline, reflections, combined transformations, and tangent asymptotes.",
    tags: ["algebra", "trigonometry", "trig graphs", "sine graph", "cosine graph", "tangent graph", "graph transformations", "amplitude", "period", "phase shift", "midline", "asymptotes", "GCSE", "A-Level", "IB", "CAPE"],
    toolPath: "tools/trig-graphs-transformations/index.html?v=trig-graphs-transformations-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers standard sine, cosine, and tangent graphs over 0 degrees to 360 degrees.",
      "Level 2 covers single transformations including amplitude changes, period changes, vertical shifts, and reflections.",
      "Level 3 covers combined sine and cosine transformations, including phase shift, midline, and graph-to-equation reasoning.",
      "Level 4 covers transformed tangent graphs, tangent asymptotes, mixed transformations, and comparing trig graphs."
    ]
  },
  {
    slug: "trigonometric-functions",
    title: "Trig Identities, Proofs and Equations",
    category: "Algebra",
    level: "A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate A-level trigonometry practice covering reciprocal graphs, sec, cosec, cot equations, identities, proofs, and hence-solve questions.",
    tags: ["algebra", "trigonometry", "trigonometric functions", "sec", "cosec", "cot", "identities", "proof", "A-Level"],
    toolPath: "tools/trigonometric-functions/index.html?v=factorisation-steps-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers reciprocal graph sketching, definitions, and simple reciprocal equations.",
      "Level 2 develops equations involving sec, cosec, cot, identities, quadratics, and transformed angles.",
      "Level 3 includes reciprocal quotient proofs, factorised identity proofs, linked hence-solve problems, and no-real-solution arguments."
    ]
  },
  {
    slug: "sequences-series",
    title: "Arithmetic and Geometric Sequences and Series",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate arithmetic and geometric sequence and series practice, including nth terms, sums, inverse problems, sigma notation, and sums to infinity.",
    tags: ["algebra", "sequences", "series", "arithmetic", "geometric", "sigma notation", "sum to infinity"],
    toolPath: "tools/sequences-series/index.html?v=sigma-worksheet-limits-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers arithmetic nth terms, common differences, partial sums, inverse term problems, and sigma notation.",
      "Level 2 covers geometric nth terms, ratios, finite sums, sums to infinity, and sigma notation.",
      "Worked steps use formula substitution and exact fractional arithmetic where appropriate."
    ]
  },
  {
    slug: "advanced-differentiation",
    title: "Advanced Differentiation",
    category: "Algebra",
    level: "A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate implicit and parametric differentiation practice, including second derivatives, tangent and normal lines, related rates, and parameter slope analysis.",
    tags: ["algebra", "calculus", "differentiation", "implicit differentiation", "parametric differentiation", "tangents", "normals"],
    toolPath: "tools/advanced-differentiation/index.html?v=advanced-diff-implicit-variety-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers implicit dy/dx, slopes at points, second derivatives, tangent lines, and related rates.",
      "Level 2 covers parametric dy/dx, second derivatives, tangents and normals, and horizontal or vertical tangent conditions.",
      "Worked examples reinforce when to differentiate before substituting and how to convert parameter derivatives into Cartesian slopes."
    ]
  },
  {
    slug: "hcf-lcm",
    title: "HCF, LCM and Prime Factorisation",
    category: "Numbers",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate HCF and LCM practice for integers, algebraic expressions, mixed drills, and word problems with worked factorisation steps.",
    tags: ["numbers", "hcf", "lcm", "factors", "multiples", "prime factorisation", "algebra"],
    toolPath: "tools/hcf-lcm/index.html?v=hcf-shared-factor-1",
    imported: true,
    teacherNotes: [
      "Level 1 builds fluency with HCF and LCM of two integers.",
      "Level 2 extends factor reasoning to algebraic expressions with powers of x and y.",
      "Level 3 mixes numerical and algebraic prompts, while Level 4 applies HCF and LCM to short word problems."
    ]
  },
  {
    slug: "decimals-practice-lab",
    title: "Decimal Place Value and Operations",
    category: "Numbers",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate decimal fluency practice covering place value, comparing and ordering, rounding, terminating fractions, operations, multi-step contexts, and error spotting.",
    tags: ["numbers", "decimals", "place value", "rounding", "operations", "fractions", "word problems"],
    toolPath: "tools/decimals-practice-lab/index.html?v=decimal-column-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers decimal foundations: place value, comparison, ordering, rounding, fraction conversion, and expanded form.",
      "Level 2 covers decimal operations, including add/subtract, powers of 10, multiplication, and division by whole numbers.",
      "Level 3 applies decimal reasoning through multi-step expressions, money contexts, and error analysis."
    ]
  },
  {
    slug: "powers-of-10",
    title: "Powers of 10 and Standard Form",
    category: "Numbers",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate practice for multiplying and dividing by powers of 10, expressing numbers in standard form, evaluating standard form, and using index laws.",
    tags: ["numbers", "powers of 10", "standard form", "scientific notation", "decimals", "indices"],
    toolPath: "tools/powers-of-10/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers multiplication by powers of 10 with whole numbers, decimals, and mixed values.",
      "Level 2 covers division by powers of 10 and decimal place movement to the left.",
      "Level 3 covers standard form conversion, evaluation, and products or quotients using index laws."
    ]
  },
  {
    slug: "number-bases-number-sets",
    title: "Number Bases and Number Sets",
    category: "Numbers",
    level: "CSEC / GCSE / IGCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate practice for number-set classification, base conversion, place value in bases, base operations, and simple unknowns involving bases.",
    tags: ["numbers", "number bases", "number systems", "number sets", "natural numbers", "integers", "rational numbers", "irrational numbers", "real numbers", "CSEC", "GCSE", "IGCSE"],
    toolPath: "tools/number-bases-number-sets/index.html?v=number-bases-sets-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers classifying numbers into natural, whole, integer, rational, irrational, and real sets.",
      "Level 2 covers converting to and from denary using place-value expansion and repeated division.",
      "Level 3 covers base addition, subtraction, multiplication, finding an unknown base, and finding a missing digit.",
      "Level 4 mixes number-set reasoning with base conversion and operations in exam-style practice."
    ]
  },
  {
    slug: "upper-lower-bounds",
    title: "Upper and Lower Bounds",
    category: "Numbers",
    level: "GCSE / IGCSE / CSEC",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate upper and lower bounds practice covering error intervals, bounds in calculations, formulae, compound measures, percentage error, and exam-style contexts.",
    tags: ["numbers", "upper bounds", "lower bounds", "error intervals", "rounding", "compound measures", "percentage error", "GCSE", "IGCSE", "CSEC"],
    toolPath: "tools/upper-lower-bounds/index.html?v=upper-lower-bounds-1",
    imported: true,
    teacherNotes: [
      "Level 1 builds error interval fluency from rounded values and reverse intervals.",
      "Level 2 focuses on choosing the correct lower or upper values for sums, differences, products, quotients, and mixed expressions.",
      "Level 3 applies bounds to area, perimeter, speed, density, and formula substitution.",
      "Level 4 includes maximum percentage error, reverse bounds, and mixed exam-style contexts."
    ]
  },
  {
    slug: "four-operations",
    title: "Addition, Subtraction, Multiplication and Division",
    category: "Numbers",
    level: "KS2 / KS3",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate practice for addition, subtraction, multiplication, and division from single-digit fluency through larger calculations and real-world contexts.",
    tags: ["numbers", "addition", "subtraction", "multiplication", "division", "arithmetic", "word problems"],
    toolPath: "tools/four-operations/index.html?v=four-operations-wordproblem-2",
    imported: true,
    teacherNotes: [
      "Level 1 builds single-digit operation fluency and related multiplication or division facts.",
      "Level 2 moves into two-digit addition, subtraction, multiplication by a single digit, and division by a single digit.",
      "Level 3 focuses on larger multiplication and division with estimation and checking.",
      "Level 4 applies operation choice to shopping, measurement, and everyday word problems."
    ]
  },
  {
    slug: "fractions-practice",
    title: "Fraction Arithmetic and Mixed Numbers",
    category: "Numbers",
    level: "KS2 / KS3",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate fraction practice from equivalent fractions and simplifying through same-denominator operations, different-denominator operations, and mixed numbers.",
    tags: ["numbers", "fractions", "equivalent fractions", "simplifying", "mixed numbers", "operations"],
    toolPath: "tools/fractions-practice/index.html?v=fractions-complex-1",
    imported: true,
    teacherNotes: [
      "Level 1 develops equivalent fraction reasoning using multiplication, division, and cross multiplication.",
      "Level 2 focuses on simplifying fractions by identifying common factors.",
      "Level 3 practises adding and subtracting fractions with the same denominator.",
      "Level 4 brings together all four operations with proper fractions, mixed numbers, and complex BIDMAS fraction expressions."
    ]
  },
  {
    slug: "simple-percentage-tasks",
    title: "Percentage Fluency",
    category: "Numbers",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate percentage practice across conversions, expressing quantities as percentages, percentage of amounts, percentage change, and reverse percentage problems.",
    tags: ["numbers", "percentages", "conversions", "percentage change", "reverse percentages"],
    toolPath: "tools/simple-percentage-tasks/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Level 1 practises percentage, decimal, and fraction conversions.",
      "Level 2 converts fractions and quantities into percentages and introduces basic percentage-of calculations.",
      "Level 3 focuses on percentage of quantities, increases, and decreases.",
      "Level 4 develops multi-step, reverse percentage, and combined discount or VAT scenarios."
    ]
  },
  {
    slug: "ratio-proportion",
    title: "Ratio and Proportion",
    category: "Numbers",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate ratio and proportion practice covering simplifying ratios, sharing in a ratio, scale, recipes, exchange rates, direct proportion, and inverse proportion.",
    tags: ["numbers", "ratio", "proportion", "scale", "recipes", "exchange rates", "direct proportion", "inverse proportion"],
    toolPath: "tools/ratio-proportion/index.html?v=ratio-worksheet-text-1",
    imported: true,
    teacherNotes: [
      "Level 1 builds core ratio fluency through simplification and sharing into two-part ratios.",
      "Level 2 applies ratio to maps, recipes, mixtures, and exchange rates.",
      "Level 3 contrasts direct and inverse proportional relationships.",
      "Worked steps highlight known quantities, unknown quantities, and the proportion setup."
    ]
  },
  {
    slug: "area-rectangles",
    title: "Area and Perimeter of Rectangles",
    category: "Geometry",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate diagram-based practice for rectangle area, reverse side problems, compound rectilinear shapes, and algebraic area equations.",
    tags: ["geometry", "area", "rectangles", "compound shapes", "perimeter", "algebra", "reverse problems"],
    toolPath: "tools/area-rectangles/index.html?v=area-rectangles-2",
    imported: true,
    teacherNotes: [
      "Level 1 builds area fluency for rectangles, reverse area problems, and links to perimeter.",
      "Level 2 uses compound rectilinear shapes split into rectangles, including missing dimensions.",
      "Level 3 introduces algebraic side lengths, simplified expressions, and equations formed from area."
    ]
  },
  {
    slug: "pythagoras-theorem",
    title: "Pythagoras' Theorem",
    category: "Geometry",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate right-triangle practice for finding hypotenuses, shorter sides, exact surd answers, decimal answers, and area or perimeter applications.",
    tags: ["geometry", "pythagoras", "right triangles", "hypotenuse", "surd form", "area", "perimeter"],
    toolPath: "tools/pythagoras-theorem/index.html?v=pythagoras-6",
    imported: true,
    teacherNotes: [
      "Level 1 builds from hypotenuse questions to shorter-side questions using integer triples.",
      "Level 2 introduces exact surd form, simplified square roots, decimal approximations, and varied units.",
      "Level 3 uses Pythagoras as a step inside perimeter and area problems."
    ]
  },
  {
    slug: "scale-drawing-similar-shapes",
    title: "Scale Drawings and Similar Shapes",
    category: "Geometry",
    level: "KS3 / GCSE / IGCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate scale drawing and similarity practice covering map scales, similar shapes, similar triangles, perimeter ratios, area ratios, and volume ratios.",
    tags: ["geometry", "scale drawing", "map scale", "similar shapes", "similar triangles", "scale factor", "area ratio", "volume ratio", "perimeter ratio"],
    toolPath: "tools/scale-drawing-similar-shapes/index.html?v=scale-similar-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers scale drawings and map scale problems with unit conversion.",
      "Level 2 covers missing lengths, scale factors, and perimeter ratios in similar shapes.",
      "Level 3 covers similar triangles, including nested triangle problems formed by parallel lines.",
      "Level 4 covers area and volume ratio problems using squared and cubed length scale factors."
    ]
  },
  {
    slug: "area-triangles",
    title: "Area and Perimeter of Triangles",
    category: "Geometry",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate diagram-based practice for triangle perimeter and area using right triangles, internal altitudes, external altitudes, and reverse area problems.",
    tags: ["geometry", "area", "triangles", "perimeter", "altitude", "height", "compound measure"],
    toolPath: "tools/area-triangles/index.html?v=area-triangles-1",
    imported: true,
    teacherNotes: [
      "Level 1 warms up with perimeter and right-triangle area using base and height.",
      "Level 2 focuses on internal dashed altitudes across varied triangle shapes.",
      "Level 3 introduces external altitudes and reverse area problems."
    ]
  },
  {
    slug: "circles-area-circumference",
    title: "Area and Circumference of Circles",
    category: "Geometry",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate circle practice for circumference, area, reverse radius or diameter problems, and links between area and circumference.",
    tags: ["geometry", "circles", "area", "circumference", "radius", "diameter", "pi"],
    toolPath: "tools/circles-area-circumference/index.html?v=circles-4",
    imported: true,
    teacherNotes: [
      "Level 1 covers circumference from radius or diameter and reverse circumference questions.",
      "Level 2 covers area from radius or diameter and reverse area questions.",
      "Level 3 connects area and circumference in both directions using full circles only."
    ]
  },
  {
    slug: "equation-of-a-circle",
    title: "Equation of a Circle",
    category: "Geometry",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate coordinate-geometry practice for circle equations, centres, radii, intersections, and tangents.",
    tags: ["geometry", "coordinate geometry", "circles", "equation of a circle", "intersections", "tangents"],
    toolPath: "tools/equation-of-a-circle/index.html?v=equation-circle-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on identifying the centre and radius from standard and expanded forms.",
      "Level 2 forms equations from centres, radii, and diameter endpoints.",
      "Level 3 covers intersections with lines and other circles, while Level 4 introduces tangents."
    ]
  },
  {
    slug: "transformations",
    title: "Transformations",
    category: "Geometry",
    level: "KS3 / GCSE / IGCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate coordinate-grid transformation practice for translations, reflections, rotations, enlargements, describing transformations, and combined transformations.",
    tags: ["geometry", "transformations", "translation", "reflection", "rotation", "enlargement", "coordinate grid", "vectors", "scale factor"],
    toolPath: "tools/transformations/index.html?v=transformations-2",
    imported: true,
    teacherNotes: [
      "Level 1 covers translations and reflections using coordinate rules and mirror lines.",
      "Level 2 covers rotations and enlargements from a centre, including fractional scale factors.",
      "Level 3 asks students to describe transformations fully from object and image diagrams.",
      "Level 4 introduces negative scale factors and combined transformations."
    ]
  },
  {
    slug: "loci-constructions",
    title: "Loci and Constructions",
    category: "Geometry",
    level: "GCSE / IGCSE / CSEC",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate diagram-led loci and construction practice covering perpendicular bisectors, angle bisectors, fixed-distance loci, equidistant loci, construction arcs, and region problems.",
    tags: ["geometry", "loci", "constructions", "perpendicular bisector", "angle bisector", "compass", "straightedge", "equidistant", "fixed distance", "regions", "GCSE", "IGCSE", "CSEC"],
    toolPath: "tools/loci-constructions/index.html?v=loci-constructions-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on standard ruler-and-compass constructions, including perpendicular bisectors, angle bisectors, perpendiculars, and SSS triangles.",
      "Level 2 develops the main loci: fixed distance from a point, fixed distance from a line, equidistant from two points, and equidistant from two lines.",
      "Level 3 combines two locus conditions to form regions and possible-position problems.",
      "Worked steps keep the given diagram separate from the completed construction so teachers can reveal the method at the right moment."
    ]
  },
  {
    slug: "sectors-arc-length",
    title: "Sectors, Arc Length and Area",
    category: "Geometry",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate sector practice for arc length, sector area, reverse angle or radius questions, and links between arc length and area.",
    tags: ["geometry", "circles", "sectors", "arc length", "sector area", "radius", "angle", "pi"],
    toolPath: "tools/sectors-arc-length/index.html?v=sectors-2",
    imported: true,
    teacherNotes: [
      "Level 1 covers arc length from radius and angle, then reverses the arc length formula.",
      "Level 2 covers sector area from radius and angle, then reverses the sector area formula.",
      "Level 3 links arc length and sector area using the same sector diagram."
    ]
  },
  {
    slug: "trigonometric-ratios",
    title: "Right-Angled Trigonometry",
    category: "Geometry",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate right-triangle trigonometry practice for SOH-CAH-TOA, missing sides, and missing angles using inverse trig.",
    tags: ["geometry", "trigonometry", "right triangles", "sine", "cosine", "tangent", "SOH CAH TOA", "angles"],
    toolPath: "tools/trigonometric-ratios/index.html?v=trig-ratios-6",
    imported: true,
    teacherNotes: [
      "Level 1 builds missing-side calculations using SOH-CAH-TOA in right triangles.",
      "Level 2 focuses on sine, cosine, tangent, and mixed missing-side questions with varied units.",
      "Level 3 introduces inverse trigonometric ratios for missing angles."
    ]
  },
  {
    slug: "bearings",
    title: "Bearings",
    category: "Geometry",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate diagram-based bearings practice for three-figure bearings, reverse bearings, hidden compass-angle descriptions, and simple trigonometry in navigation contexts.",
    tags: ["geometry", "bearings", "navigation", "angles", "trigonometry", "clockwise from north", "three-figure bearings"],
    toolPath: "tools/bearings/index.html?v=bearings-hidden-fix-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers reading bearings from diagrams and finding reverse bearings.",
      "Level 2 converts hidden compass-angle descriptions into three-figure bearings.",
      "Level 3 links bearings with right-triangle trigonometry, distances, and components."
    ]
  },
  {
    slug: "earth-geometry",
    title: "Earth Geometry",
    category: "Geometry",
    level: "GCSE / IGCSE / CSEC",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate Earth geometry practice for latitude, longitude, distances along meridians and parallels, small circles, route lengths, inverse problems, and time differences.",
    tags: ["geometry", "earth geometry", "latitude", "longitude", "great circles", "small circles", "meridians", "parallels", "time zones", "GCSE", "IGCSE", "CSEC"],
    toolPath: "tools/earth-geometry/index.html?v=earth-geometry-5",
    imported: true,
    teacherNotes: [
      "Level 1 covers coordinates, latitude differences, meridian distances, and equator distances.",
      "Level 2 uses small-circle radii, distances along parallels, and combined meridian-parallel routes.",
      "Level 3 covers time differences, longitude differences, inverse distance problems, and mixed Earth geometry."
    ]
  },
  {
    slug: "free-vectors",
    title: "Column Vectors and Vector Geometry",
    category: "Geometry",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate column vector practice for addition, subtraction, scalar multiplication, vector length, and resultants.",
    tags: ["geometry", "vectors", "column vectors", "free vectors", "addition", "subtraction", "scalar multiples", "magnitude", "length"],
    toolPath: "tools/free-vectors/index.html?v=vectors-3",
    imported: true,
    teacherNotes: [
      "Level 1 practises adding and subtracting column vectors component by component.",
      "Level 2 practises scalar multiplication and combinations of scalar multiples.",
      "Level 3 uses Pythagoras to find vector length and length of resultants."
    ]
  },
  {
    slug: "missing-angles",
    title: "Missing Angles in Lines and Shapes",
    category: "Geometry",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate missing-angle practice for straight lines, triangles, quadrilaterals, mixed core facts, and algebraic angle equations.",
    tags: ["geometry", "angles", "straight line", "triangle", "quadrilateral", "angle facts", "algebra"],
    toolPath: "tools/missing-angles/index.html?v=missing-angles-5",
    imported: true,
    teacherNotes: [
      "Level 1 covers straight lines, triangles, and quadrilaterals.",
      "Level 2 uses mixed core angle facts for method selection.",
      "Level 3 introduces algebraic angle equations based on straight lines, triangles, and quadrilaterals."
    ]
  },
  {
    slug: "circle-theorems",
    title: "Circle Theorems",
    category: "Geometry",
    level: "KS3 / GCSE / IGCSE / CSEC",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate diagram-based circle theorem practice for angles at the centre and circumference, semicircles, same-segment angles, cyclic quadrilaterals, tangents, alternate segments, algebra, and proof-style reasoning.",
    tags: ["geometry", "circle theorems", "circles", "angles", "cyclic quadrilateral", "tangent", "alternate segment theorem", "semicircle", "same segment", "GCSE", "IGCSE", "CSEC"],
    toolPath: "tools/circle-theorems/index.html?v=circle-theorems-2",
    imported: true,
    teacherNotes: [
      "Level 1 isolates the core circle theorems one at a time.",
      "Level 2 connects circle theorems with triangle angle facts, radii, and tangents.",
      "Level 3 adds algebraic angle equations, theorem chains, and short proof-style reasoning."
    ]
  },
  {
    slug: "volume-surface-area-prisms",
    title: "Prisms: Volume and Surface Area",
    category: "Geometry",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate prism practice for volume, surface area, triangular prisms, cuboids, reverse dimensions, and mixed unit-aware questions.",
    tags: ["geometry", "volume", "surface area", "prisms", "cuboids", "triangular prisms", "3D shapes", "units"],
    toolPath: "tools/volume-surface-area-prisms/index.html?v=prisms-6",
    imported: true,
    teacherNotes: [
      "Level 1 covers volume of cuboids and triangular prisms using cross-section area times length.",
      "Level 2 covers surface area of cuboids and triangular prisms.",
      "Level 3 introduces reverse volume, reverse surface area, and mixed prism problems."
    ]
  },
  {
    slug: "cylinders-cones-volume-surface-area",
    title: "Cylinders and Cones: Volume and Surface Area",
    category: "Geometry",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate diagram-based practice for volume and surface area of cylinders and cones, including reverse and mixed questions.",
    tags: ["geometry", "volume", "surface area", "cylinders", "cones", "3D shapes", "pi", "units"],
    toolPath: "tools/cylinders-cones-volume-surface-area/index.html?v=cylinders-cones-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers volume of cylinders and cones, emphasising vertical height for cone volume.",
      "Level 2 covers curved and total surface area, including slant height for cone surface area.",
      "Level 3 introduces reverse volume, reverse surface area, and mixed solid problems."
    ]
  },
  {
    slug: "pyramids-spheres-volume-surface-area",
    title: "Spheres: Volume and Surface Area",
    category: "Geometry",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate diagram-based practice for volume and surface area of spheres, including reverse radius questions.",
    tags: ["geometry", "volume", "surface area", "spheres", "3D shapes", "pi", "units"],
    toolPath: "tools/pyramids-spheres-volume-surface-area/index.html?v=spheres-2",
    imported: true,
    teacherNotes: [
      "Level 1 covers volume of spheres from a given radius.",
      "Level 2 covers surface area of spheres from a given radius.",
      "Level 3 introduces reverse questions where surface area or volume is used to find the radius."
    ]
  },
  {
    slug: "exponents-index-notation",
    title: "Indices and Exponent Laws",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate indices and exponent-law practice covering repeated multiplication, evaluation, prime factorisation, zero and negative powers, and multi-step simplification.",
    tags: ["algebra", "indices", "exponents", "powers", "index laws", "prime factorisation", "negative indices"],
    toolPath: "tools/exponents-index-notation/index.html?v=exponents-worksheet-1",
    imported: true,
    teacherNotes: [
      "Level 1 builds meaning: products in index form, evaluating powers, prime factorisation, and zero or negative indices.",
      "Level 2 practises index laws for multiplication, division, powers of powers, and mixed same-base examples.",
      "Level 3 combines multiple laws in multi-step simplification questions.",
      "Worked steps highlight bases, indices, operations, and the rule being applied."
    ]
  },
  {
    slug: "absolute-values",
    title: "Modulus and Absolute Value",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate modulus and absolute value practice covering evaluation, distance, substitution, equations, applications, and inequalities.",
    tags: ["algebra", "absolute value", "modulus", "equations", "inequalities", "distance"],
    toolPath: "tools/absolute-values/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Level 1 develops absolute value as magnitude and distance from zero.",
      "Level 2 solves pure-term, linear, and contextual absolute value equations.",
      "Level 3 solves absolute value inequalities with compound or split solution sets.",
      "Worked steps separate isolating the absolute value, splitting cases, and interpreting the solution."
    ]
  },
  {
    slug: "surds-radicals",
    title: "Surds and Radicals",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate surd and radical practice covering simplification, operations, rationalising denominators, expanding brackets, and multi-step expressions.",
    tags: ["algebra", "surds", "radicals", "roots", "rationalising", "simplifying"],
    toolPath: "tools/surds-radicals/index.html?v=factorisation-steps-1",
    imported: true,
    teacherNotes: [
      "Level 1 develops simplification by finding perfect square factors.",
      "Level 2 practises multiplying, dividing, adding, subtracting, and combining surd terms.",
      "Level 3 covers rationalising denominators, binomial conjugates, bracket expansion, and complex expressions.",
      "Worked steps highlight square factors, coefficients, operations, and final simplified form."
    ]
  },
  {
    slug: "logarithms-practice",
    title: "Logarithms and Exponential Equations",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate logarithm practice covering log-index conversion, evaluation, logarithm laws, natural logs, change of base, and exponential or logarithmic equation solving.",
    tags: ["algebra", "logarithms", "logs", "indices", "exponentials", "natural log", "change of base"],
    toolPath: "tools/logarithms-practice/index.html?v=batch3-steps-1",
    imported: true,
    teacherNotes: [
      "Level 1 builds fluency converting between logarithmic and index form.",
      "Level 2 practises product, quotient, power, and natural logarithm rules.",
      "Level 3 solves exponential and logarithmic equations, including change of base and multi-step problems.",
      "Worked steps connect each logarithm move back to inverse exponential reasoning."
    ]
  },
  {
    slug: "sine-cosine-rule",
    title: "Sine Rule, Cosine Rule and Triangle Area",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate non-right triangle trigonometry practice covering the Sine Rule, Cosine Rule, sine area formula, and mixed multi-step problems.",
    tags: ["algebra", "trigonometry", "sine rule", "cosine rule", "triangle area", "non-right triangles"],
    toolPath: "tools/sine-cosine-rule/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers Sine Rule side and angle problems plus the sine area formula.",
      "Level 2 covers Cosine Rule side and angle problems plus mixed tasks.",
      "Generated examples use valid non-right triangles with rounded final answers and units.",
      "Worked steps model rule selection, substitution, calculator evaluation, and final rounding."
    ]
  },
  {
    slug: "conversions-teaching",
    title: "Unit Conversions and Compound Measures",
    category: "Numbers",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate conversion practice covering metric, imperial, time, area, volume, temperature, speed, compound units, radians, and chained conversions.",
    tags: ["numbers", "conversions", "units", "metric", "imperial", "compound measures", "speed", "density", "radians"],
    toolPath: "tools/conversions-teaching/index.html?v=conversion-small-decimals-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on one-step conversions with clear factors and units.",
      "Level 2 extends into temperature formulas, speed, density, compound units, radians, and chained conversions.",
      "Worked steps emphasise the conversion factor and whether to multiply or divide.",
      "Area and volume examples explicitly square or cube the linear scale factor."
    ]
  },
  {
    slug: "discrete-random-variables",
    title: "Discrete Random Variables and Probability Distributions",
    category: "Statistics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate statistics practice covering discrete probability distributions, expectation, variance, standard deviation, and binomial, geometric, and Poisson models.",
    tags: ["statistics", "probability", "random variables", "expectation", "variance", "binomial", "geometric", "poisson"],
    toolPath: "tools/discrete-random-variables/index.html?v=discrete-inequality-symbols-1",
    imported: true,
    teacherNotes: [
      "Level 1 checks probability tables, missing probabilities, and validity of discrete distributions.",
      "Level 2 practises expected value, variance, standard deviation, and linear expectation properties.",
      "Level 3 introduces binomial, geometric, Poisson, and distribution-identification questions.",
      "Worked steps emphasise summing probabilities to 1 and using weighted sums for expectation."
    ]
  },
  {
    slug: "histograms",
    title: "Histograms and Frequency Density",
    category: "Statistics",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate histogram practice focused on frequency density, completing grouped-frequency tables, interpreting histograms, partial intervals, percentages, and exam-style reverse problems.",
    tags: ["statistics", "histograms", "frequency density", "grouped data", "class width", "interpreting histograms", "frequency tables", "median", "quartiles"],
    toolPath: "tools/histograms/index.html?v=histograms-3",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on completing tables using class width, frequency, and frequency density.",
      "Level 2 separates histogram interpretation into one-skill practice: modal class, class frequency, total frequency, partial intervals, and percentages.",
      "Level 3 covers completing tables from histograms, estimating median and quartiles, and reverse exam-style problems.",
      "Worked steps emphasise that bar area represents frequency and that the vertical axis is frequency density."
    ]
  },
  {
    slug: "cumulative-frequency-curves",
    title: "Cumulative Frequency Curves and Ogives",
    category: "Statistics",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate cumulative frequency practice covering running totals, plotting coordinates, reading curves, median, quartiles, interquartile range, percentiles, and estimates above, below, or between values.",
    tags: ["statistics", "cumulative frequency", "cumulative frequency curves", "grouped data", "median", "quartiles", "interquartile range", "percentiles", "box plots"],
    toolPath: "tools/cumulative-frequency-curves/index.html?v=cumulative-frequency-ogive-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on cumulative frequency tables and plotting coordinates.",
      "Level 2 separates curve interpretation into one-skill practice: median, quartiles, IQR, percentiles, and counts above, below, or between values.",
      "Level 3 covers completing tables from curves, five-number summaries for box plots, reverse percentile questions, and mixed exam-style practice.",
      "Worked steps emphasise running totals, upper class boundaries, and reading from the curve as an estimate."
    ]
  },
  {
    slug: "sampling-methods-bias",
    title: "Sampling Methods and Bias",
    category: "Statistics",
    level: "GCSE / A-Level / CSEC / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate sampling practice covering random, systematic, stratified, quota, opportunity, volunteer and cluster sampling, sources of bias, questionnaire wording, representative samples, and sampling calculations.",
    tags: ["statistics", "sampling", "sampling methods", "sampling bias", "stratified sampling", "systematic sampling", "random sampling", "quota sampling", "opportunity sampling", "volunteer sampling", "cluster sampling", "questionnaire bias", "representative samples", "CSEC", "GCSE", "A-Level", "IB"],
    toolPath: "tools/sampling-methods-bias/index.html?v=sampling-methods-bias-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on identifying sampling methods, spotting bias, and improving weak questionnaire wording.",
      "Level 2 practises stratified sampling calculations, systematic sampling intervals, and valid simple random sampling processes.",
      "Level 3 asks students to critique sampling plans, design better methods, and justify improvements in context.",
      "Worked solutions explain why a method is suitable or biased, not just the name of the method."
    ]
  },
  {
    slug: "motion-graphs-constant-acceleration",
    title: "Motion Graphs and Constant Acceleration",
    category: "Mechanics",
    level: "GCSE / A-Level Foundation",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate mechanics practice on average speed, acceleration, deceleration, distance-time graphs, velocity-time graphs, distance travelled, and constant acceleration formulae.",
    tags: ["mechanics", "motion graphs", "constant acceleration", "distance-time graphs", "velocity-time graphs", "average speed", "acceleration", "deceleration", "distance travelled", "kinematics"],
    toolPath: "tools/motion-graphs-constant-acceleration/index.html?v=motion-graphs-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on average speed, acceleration, deceleration, and basic distance-time or velocity-time graph facts.",
      "Level 2 interprets motion graphs using gradient for speed or acceleration and area under velocity-time graphs for distance.",
      "Level 3 combines constant acceleration formulae with missing graph values and journey comparisons.",
      "Worked steps emphasise choosing between formula, gradient, and area methods before substituting values."
    ]
  },
  {
    slug: "equations-of-motion",
    title: "SUVAT and Equations of Motion",
    category: "Mechanics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate constant acceleration equations of motion practice covering SUVAT substitution, multi-step motion, braking distance, and vertical motion under gravity.",
    tags: ["mechanics", "kinematics", "equations of motion", "SUVAT", "constant acceleration", "vertical motion", "gravity", "braking distance", "stopping distance"],
    toolPath: "tools/equations-of-motion/index.html?v=equations-of-motion-2",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on direct use of one equation of motion after listing the known SUVAT values.",
      "Level 2 combines equations in braking distance, distance, average velocity, and two-stage motion problems.",
      "Level 3 covers vertical motion under gravity, including signs, greatest height, time to top, and speed at a height.",
      "Worked steps emphasise choosing a positive direction, substituting values, and keeping units clear."
    ]
  },
  {
    slug: "newtons-second-law",
    title: "Newton's Second Law: F = ma",
    category: "Mechanics",
    level: "GCSE / A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate mechanics practice on F = ma, resultant force, acceleration, weight, friction, tension, connected particles, lifts, and inclined planes.",
    tags: ["mechanics", "forces", "Newton's second law", "F = ma", "resultant force", "mass", "acceleration", "weight", "friction", "tension", "connected particles", "inclined planes"],
    toolPath: "tools/newtons-second-law/index.html?v=newtons-second-law-2",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on direct use of F = ma, including resultant force, acceleration, mass, and weight.",
      "Level 2 builds one-dimensional force equations with resistance, friction, driving force, and tension.",
      "Level 3 covers connected particles, lifts, and inclined planes with and without friction.",
      "Worked steps emphasise choosing a positive direction, writing the resultant force equation, substituting into F = ma, and keeping units clear."
    ]
  },
  {
    slug: "friction",
    title: "Friction and Rough Surfaces",
    category: "Mechanics",
    level: "GCSE / A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate mechanics practice on friction, normal reaction, coefficient of friction, limiting equilibrium, rough horizontal motion, pulling at an angle, and rough inclined planes.",
    tags: ["mechanics", "friction", "rough surfaces", "coefficient of friction", "limiting friction", "normal reaction", "inclined planes", "rough planes", "Newton's second law", "work-energy"],
    toolPath: "tools/friction/index.html?v=friction-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on normal reaction, limiting friction, coefficient of friction, static friction, and angle of friction.",
      "Level 2 uses friction in rough horizontal motion, acceleration, pulling force, stopping distance, and pulling at an angle.",
      "Level 3 resolves forces on rough inclined planes, including limiting equilibrium, sliding down a slope, pulling up a slope, and angle of repose.",
      "Worked steps emphasise finding the normal reaction first, deciding the direction of friction, and then applying F = ma, work-energy, or limiting equilibrium."
    ]
  },
  {
    slug: "work-energy-power",
    title: "Work, Energy and Power",
    category: "Mechanics",
    level: "GCSE / A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate mechanics practice on work done, kinetic energy, gravitational potential energy, power, efficiency, work-energy principle, slopes, resistance, motors, and modelling problems.",
    tags: ["mechanics", "work", "energy", "power", "kinetic energy", "gravitational potential energy", "work-energy principle", "efficiency", "resistance", "motors", "slopes"],
    toolPath: "tools/work-energy-power/index.html?v=work-energy-power-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on direct use of work done, kinetic energy, gravitational potential energy, and power formulae.",
      "Level 2 uses the work-energy principle, braking force, force-velocity power, lifting power, and efficiency.",
      "Level 3 applies energy modelling to smooth and rough slopes, vertical motion, motors, resistance, and combined force-energy problems.",
      "Worked steps emphasise identifying the energy transfer, writing the full energy equation, substituting values, and interpreting units."
    ]
  },
  {
    slug: "moments",
    title: "Moments and Equilibrium",
    category: "Mechanics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate mechanics practice on moments, turning effects, the principle of moments, balancing, and reaction forces on beams.",
    tags: ["mechanics", "moments", "turning effect", "principle of moments", "equilibrium", "reaction forces", "beams", "pivot"],
    toolPath: "tools/moments/index.html?v=moments-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on calculating moments and identifying clockwise or anticlockwise turning effects.",
      "Level 2 uses the principle of moments to find unknown forces, distances, and masses.",
      "Level 3 combines moments with vertical equilibrium to find support reactions on beams.",
      "Worked steps emphasise choosing the pivot, setting clockwise moment equal to anticlockwise moment, and using force balance."
    ]
  },
  {
    slug: "projectiles",
    title: "Projectile Motion",
    category: "Mechanics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate projectile motion practice covering resolving velocity, time of flight, maximum height, range, position, speed, and applied modelling questions.",
    tags: ["mechanics", "projectiles", "projectile motion", "kinematics", "components", "range", "maximum height", "modelling", "gravity"],
    toolPath: "tools/projectiles/index.html?v=projectiles-horizontal-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on resolving the initial velocity and using vertical motion for time and height.",
      "Level 2 combines horizontal and vertical motion to find range, position, height at a distance, and speed.",
      "Level 3 introduces modelling problems, including clearing a wall, finding launch speed, finding possible launch angles, and horizontal projection from a height.",
      "Worked steps emphasise separating horizontal and vertical motion before substituting."
    ]
  },
  {
    slug: "momentum",
    title: "Momentum and Impulse",
    category: "Mechanics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate mechanics practice on momentum, impulse, conservation of momentum, collisions, explosions, recoil, and coefficient of restitution.",
    tags: ["mechanics", "momentum", "impulse", "conservation of momentum", "collisions", "explosions", "recoil", "coefficient of restitution"],
    toolPath: "tools/momentum/index.html?v=momentum-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on momentum p = mv, impulse from force-time, and impulse as change in momentum.",
      "Level 2 uses conservation of momentum for particles that join, separate, explode, or recoil.",
      "Level 3 combines momentum with impulse and coefficient of restitution in direct collisions.",
      "Worked steps emphasise choosing a positive direction, writing momentum before and after, solving carefully, and interpreting negative velocity as direction."
    ]
  },
  {
    slug: "continuous-random-variables",
    title: "Continuous Random Variables and Density Functions",
    category: "Statistics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate continuous random variable practice covering probability density functions, cumulative distribution functions, expectation, variance, uniform distributions, exponential distributions, and parameter questions.",
    tags: ["statistics", "probability", "continuous random variables", "density function", "cdf", "expectation", "variance", "uniform distribution", "exponential distribution"],
    toolPath: "tools/continuous-random-variables/index.html?v=continuous-random-variables-5",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on valid density functions, normalising constants, interval probability, and cumulative distribution functions.",
      "Level 2 practises expected value, E(X²), variance, standard deviation, median, and quartiles.",
      "Level 3 introduces uniform and exponential models, including probability, summary measures, and parameter questions.",
      "Worked steps emphasise probabilities as areas, integration over the support, and correct use of Var(X) = E(X²) - [E(X)]²."
    ]
  },
  {
    slug: "normal-distribution",
    title: "Normal Distribution and Standardisation",
    category: "Statistics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate normal distribution practice covering standard normal probabilities, Phi notation, standardisation, inverse normal questions, and finding unknown means or standard deviations.",
    tags: ["statistics", "normal distribution", "standard normal", "z score", "phi", "inverse normal", "mean", "standard deviation", "probability"],
    toolPath: "tools/normal-distribution/index.html?v=normal-distribution-3",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on standard normal probabilities, complements, intervals, and inverse z-values.",
      "Level 2 applies standardisation to any normal distribution, including reverse cut-offs and absolute-value statements.",
      "Level 3 uses probability statements to find cut-offs, means, standard deviations, or both parameters.",
      "Worked steps show the relevant tail, interval, or cut-off, the standardisation, the table or calculator lookup, and the final interpretation."
    ]
  },
  {
    slug: "hypothesis-testing",
    title: "Hypothesis Testing and Inference",
    category: "Statistics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate hypothesis testing practice covering exact binomial tests, normal mean tests, critical regions, proportion z-tests, p-values, significance levels, and contextual inference.",
    tags: ["statistics", "hypothesis testing", "inference", "p-value", "significance level", "critical region", "binomial test", "normal test", "proportion test"],
    toolPath: "tools/hypothesis-testing/index.html?v=hypothesis-testing-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on exact binomial hypothesis tests, including one-tailed, two-tailed, and critical-region decisions.",
      "Level 2 focuses on normal tests for a population mean using standard error and z-values.",
      "Level 3 introduces proportion z-tests, model-choice questions, and mixed contextual tests.",
      "Worked solutions are deliberately detailed: parameter, hypotheses, model under H0, p-value or critical region, comparison with alpha, decision, and final inference in context."
    ]
  },
  {
    slug: "confidence-intervals",
    title: "Confidence Intervals",
    category: "Statistics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate confidence interval practice covering means, proportions, margin of error, sample size, interpretation, and t-intervals.",
    tags: ["statistics", "confidence intervals", "inference", "margin of error", "sample size", "proportion", "mean", "standard error", "t interval", "normal distribution", "A-Level", "IB"],
    toolPath: "tools/confidence-intervals/index.html?v=confidence-intervals-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers confidence intervals for a mean when the population standard deviation is known.",
      "Level 2 covers confidence intervals for population proportions from survey and sample data.",
      "Level 3 works backwards with margin of error, sample size, confidence level, midpoint, and interpretation.",
      "Level 4 introduces t-intervals when the population standard deviation is unknown."
    ]
  },
  {
    slug: "correlation-regression",
    title: "Correlation and Regression",
    category: "Statistics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate correlation and regression practice using bivariate data tables, PMCC, least-squares regression lines, interpolation, extrapolation, and residuals.",
    tags: ["statistics", "correlation", "regression", "linear regression", "PMCC", "interpolation", "extrapolation", "residuals", "data tables"],
    toolPath: "tools/correlation-regression/index.html?v=correlation-regression-6",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on interpreting and calculating product moment correlation coefficient from bivariate data.",
      "Level 2 finds the least-squares regression line of y on x from raw data or summary statistics.",
      "Level 3 uses regression lines for prediction, interpolation, extrapolation, reliability comments, and residuals.",
      "Worked steps show Sxx, Sxy, gradient, intercept, and context interpretation."
    ]
  },
  {
    slug: "binomial-geometric-distribution",
    title: "Binomial and Geometric Distributions",
    category: "Statistics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate binomial and geometric distribution practice covering exact probabilities, cumulative probabilities, complements, expected values, mixed modelling questions, and simple parameter work.",
    tags: ["statistics", "probability", "binomial distribution", "geometric distribution", "discrete distributions", "cumulative probability", "expectation", "variance"],
    toolPath: "tools/binomial-geometric-distribution/index.html?v=binomial-geometric-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on binomial exact probabilities, cumulative probabilities, complements, expectation, variance, and mixed binomial practice.",
      "Level 2 focuses on geometric first-success probabilities, cumulative probabilities, complements, expectation, variance, and mixed geometric practice.",
      "Level 3 mixes binomial and geometric modelling so students must choose the correct distribution before calculating.",
      "Worked steps show formula selection, substitution, and final interpretation without relying on diagrams."
    ]
  },
  {
    slug: "poisson-distribution",
    title: "Poisson Distribution",
    category: "Statistics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate Poisson distribution practice covering exact probabilities, cumulative probabilities, complements, rates, independent sums, conditional probabilities, parameter questions, and Poisson approximation to binomial.",
    tags: ["statistics", "probability", "poisson distribution", "discrete distributions", "cumulative probability", "rate", "lambda", "independent poisson variables", "poisson approximation", "binomial approximation", "A-Level", "IB"],
    toolPath: "tools/poisson-distribution/index.html?v=poisson-distribution-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on exact probabilities, cumulative probabilities, complements, mean, and variance.",
      "Level 2 uses contextual rate questions, adjusted intervals, at most, at least, and between statements.",
      "Level 3 covers independent Poisson sums, conditional probabilities, and finding lambda from probability information.",
      "Level 4 introduces Poisson approximation to binomial and model-choice reasoning."
    ]
  },
  {
    slug: "kaizen-large-data-set",
    title: "Large Data Set Practice",
    category: "Statistics",
    level: "A-Level",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate large-data-set practice using a Kaizen-owned training dataset for variables, units, summaries, comparisons, graphs, correlation, regression, and exam-style interpretation.",
    tags: ["statistics", "large data set", "A-Level", "summary statistics", "correlation", "regression", "graphs", "interpretation"],
    toolPath: "tools/kaizen-large-data-set/index.html?v=large-data-set-3",
    imported: true,
    teacherNotes: [
      "Uses an original Kaizen training dataset rather than copying any exam-board large data set.",
      "Level 1 focuses on context, variables, units, rows, missing values, and outliers.",
      "Level 2 uses summary statistics to compare groups and interpret spread.",
      "Level 3 covers graph choice, correlation, regression, prediction, and reliability.",
      "Level 4 asks for exam-style written interpretation, limitations, and contextual conclusions."
    ]
  },
  {
    slug: "tree-diagrams-conditional-probability",
    title: "Tree Diagrams and Conditional Probability",
    category: "Statistics",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate probability tree practice covering independent events, without-replacement contexts, total probability, and reverse conditional probability.",
    tags: ["statistics", "probability", "tree diagrams", "conditional probability", "independent events", "without replacement", "bayes"],
    toolPath: "tools/tree-diagrams-conditional-probability/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Uses four-problem 2x2 sets so compact tree diagrams fit comfortably in front-of-class projection.",
      "Level 1 builds independent two-stage tree fluency, including exactly one and at least one success.",
      "Level 2 focuses on changing probabilities in conditional and without-replacement contexts.",
      "Level 3 introduces total probability and reverse conditional probability using path totals.",
      "Worked steps reinforce multiplying along branches, adding separate paths, and dividing for conditional probabilities."
    ]
  },
  {
    slug: "venn-diagrams",
    title: "Venn Diagrams and Set Probability",
    category: "Statistics",
    level: "CSEC / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate Venn diagram practice for set notation, two-set regions, word problems, probability, probability with algebra, and three-set CSEC-style diagrams.",
    tags: ["statistics", "sets", "venn diagrams", "set notation", "union", "intersection", "complement", "probability", "probability algebra", "CSEC", "GCSE"],
    toolPath: "tools/venn-diagrams/index.html?v=venn-diagrams-3",
    imported: true,
    teacherNotes: [
      "Builds from reading two-set diagrams to CSEC-style word problems and three-set diagrams.",
      "Worked steps emphasise starting with the overlap, then working outwards region by region.",
      "Completed diagram questions place the calculated values back into the Venn diagram when steps are shown.",
      "Probability questions use counts from the diagram with simplified fractional answers."
    ]
  },
  {
    slug: "permutations-combinations",
    title: "Permutations and Combinations",
    category: "Statistics",
    level: "GCSE / A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate counting practice covering factorial notation, product rule counting, permutations, combinations, restrictions, repeated letters, circular arrangements, committees, binomial coefficients, and probability applications.",
    tags: ["statistics", "probability", "counting", "permutations", "combinations", "factorials", "product rule", "nPr", "nCr", "arrangements", "selections", "committees", "binomial coefficients", "GCSE", "A-Level", "IB", "CAPE"],
    toolPath: "tools/permutations-combinations/index.html?v=permutations-combinations-1",
    imported: true,
    teacherNotes: [
      "Level 1 builds factorial notation, product rule counting, basic arrangements, and simple selections.",
      "Level 2 focuses on permutations where order matters, including restrictions, repeated letters, and circular arrangements.",
      "Level 3 focuses on combinations where order does not matter, including committees, probability applications, and binomial coefficients.",
      "Worked steps deliberately begin by deciding whether order matters before selecting the formula or counting method."
    ]
  },
  {
    slug: "quadratic-factorisation",
    title: "Quadratic Factorisation Basics",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate foundation factorisation questions for common factors, special quadratic forms, trinomials, grouping, and mixed expressions.",
    tags: ["algebra", "quadratics", "factorisation", "factorising", "difference of squares", "trinomials", "common factor"],
    toolPath: "tools/quadratic-factorisation/index.html?v=factorisation-steps-1",
    imported: true,
    teacherNotes: [
      "Builds from common factor extraction into special products and trinomial factorisation.",
      "Advanced question sets return complete factorised answers rather than placeholders.",
      "Step-by-step highlighting supports board modelling and Classroom View projection."
    ]
  },
  {
    slug: "advanced-factorisation",
    title: "Advanced Factorisation: Grouping, Difference of Squares and Cubics",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate graduated factorisation practice covering multivariable HCF, difference of two squares, grouping, advanced quadratics, and complete cubic factorisation.",
    tags: ["algebra", "factorisation", "factorising", "highest common factor", "difference of squares", "grouping", "quadratics", "cubics", "complete factorisation"],
    toolPath: "tools/advanced-factorisation/index.html?v=advanced-factorisation-5",
    imported: true,
    teacherNotes: [
      "Extends beyond basic quadratic factorisation into multivariable HCF, hidden difference of squares, and complete factorisation.",
      "Each level includes focused question types and mixed sets for retrieval practice.",
      "Worked steps show the recognition, extracted factor or pattern, and final complete factorised form."
    ]
  },
  {
    slug: "binomial-expansion",
    title: "Binomial Expansion",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate binomial expansion questions covering Pascal coefficients, specific coefficients, terms, constant terms, and approximations.",
    tags: ["algebra", "binomial theorem", "binomial expansion", "combinations", "Pascal triangle", "coefficients", "KaTeX"],
    toolPath: "tools/binomial-expansion/index.html?v=batch3-steps-1",
    imported: true,
    teacherNotes: [
      "Moves from full expansions into coefficient and term-finding questions.",
      "Uses exact combination calculations and general-term notation for modelling.",
      "Long formula steps are scroll-safe inside the iframe and Classroom View."
    ]
  },
  {
    slug: "sequences",
    title: "Sequences and nth Terms",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate sequence questions for next terms, nth term formulas, linear sequences, and quadratic sequences.",
    tags: ["algebra", "sequences", "nth term", "linear sequences", "quadratic sequences", "arithmetic", "geometric"],
    toolPath: "tools/sequences/index.html?v=sequences-worksheet-1",
    imported: true,
    teacherNotes: [
      "Designed for board-led sequence practice with infinite regenerated examples.",
      "Two levels move from finding next terms into linear and quadratic nth term work.",
      "Useful for whole-class pattern spotting before showing worked derivations."
    ]
  },
  {
    slug: "inequalities",
    title: "Inequalities",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate linear inequality questions with worked algebraic steps, solution intervals, and number lines.",
    tags: ["algebra", "inequalities", "linear inequalities", "number lines", "interval notation", "KaTeX"],
    toolPath: "tools/inequalities/index.html?v=batch2-steps-1",
    imported: true,
    teacherNotes: [
      "Designed for modelling inequality solving and sign-flip cases on the board.",
      "Includes visual number lines, interval notation, and worked algebra steps.",
      "Good candidate for shared graph/number-line components later."
    ]
  },
  {
    slug: "simplification",
    title: "Algebraic Simplification",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate simplification questions for like terms, two-variable expressions, and advanced products or powers.",
    tags: ["algebra", "simplification", "like terms", "collecting terms", "expressions", "KaTeX"],
    toolPath: "tools/simplification/index.html?v=batch2-steps-1",
    imported: true,
    teacherNotes: [
      "Builds fluency from collecting like terms to advanced multi-variable simplification.",
      "Useful for modelling why variable patterns must match before coefficients combine.",
      "A natural candidate for later shared algebra-term rendering helpers."
    ]
  },
  {
    slug: "transposition-formulae",
    title: "Transposition of Formulae: Changing the Subject",
    category: "Algebra",
    level: "GCSE / A-Level / CSEC / CAPE",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate changing-the-subject practice from simple inverse operations to brackets, fractions, repeated subjects, powers, square roots, and multi-step formulae.",
    tags: ["algebra", "formulae", "transposition", "changing the subject", "rearranging formulae", "inverse operations", "square roots", "powers", "fractions", "GCSE", "A-Level", "CSEC", "CAPE"],
    toolPath: "tools/transposition-formulae/index.html?v=transposition-formulae-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers one-step and two-step rearrangements using addition, subtraction, multiplication, and division.",
      "Level 2 covers brackets and formulae where the subject appears in a numerator over a constant.",
      "Level 3 covers collecting subject terms, subject on both sides, and rational formulae with the subject in a denominator.",
      "Level 4 covers powers, square roots, and applied formulae such as v equals square root of u squared plus 2as."
    ]
  },
  {
    slug: "functions",
    title: "Function Notation, Composite and Inverse Functions",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate function notation practice for evaluating functions, substituting expression inputs, composite functions, and inverse linear functions.",
    tags: ["algebra", "functions", "function notation", "composite functions", "inverse functions", "linear functions", "quadratics"],
    toolPath: "tools/functions/index.html?v=batch2-steps-1",
    imported: true,
    teacherNotes: [
      "Level 1 builds fluency with evaluating linear and quadratic functions at numerical inputs.",
      "Level 2 practises substituting algebraic expressions into functions and forming composite functions.",
      "Level 3 covers inverse functions for linear functions, including evaluating inverse functions."
    ]
  },
  {
    slug: "graph-transformations-curve-sketching",
    title: "Graph Transformations and Curve Sketching",
    category: "Algebra",
    level: "GCSE / A-Level / IB / CAPE",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate diagram-led graph transformation and curve sketching practice covering parent graphs, translations, stretches, reflections, combined transformations, intercepts, asymptotes, turning points, domain, and range.",
    tags: ["algebra", "graphs", "functions", "graph transformations", "curve sketching", "translations", "stretches", "reflections", "domain", "range", "asymptotes", "intercepts", "turning points", "GCSE", "A-Level", "IB", "CAPE"],
    toolPath: "tools/graph-transformations-curve-sketching/index.html?v=graph-transformations-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers parent graph recognition, matching graphs to equations, and stating domain, range, and key features.",
      "Level 2 covers single transformations including vertical and horizontal translations, reflections, and stretches.",
      "Level 3 covers combined transformations, point mappings, and describing transformations from original and image graphs.",
      "Level 4 covers curve sketching from roots, turning points, asymptotes, end behaviour, and transformed exponential graphs."
    ]
  },
  {
    slug: "bracket-expansion",
    title: "Bracket Expansion",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate bracket expansion questions for single brackets, double brackets, special products, and advanced expressions.",
    tags: ["algebra", "brackets", "expansion", "expand and simplify", "double brackets", "FOIL", "KaTeX"],
    toolPath: "tools/bracket-expansion/index.html?v=factorisation-steps-1",
    imported: true,
    teacherNotes: [
      "Builds from distributive law to double brackets and special products.",
      "Useful for modelling expansion steps before revealing simplified answers.",
      "Good candidate for later shared polynomial formatting helpers."
    ]
  },
  {
    slug: "linear-equations",
    title: "Linear Equations",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate linear equation questions across one-step, two-step, distribution, both-sides, and nested-parentheses forms.",
    tags: ["algebra", "linear equations", "solving equations", "one-step equations", "two-step equations", "both sides", "KaTeX"],
    toolPath: "tools/linear-equations/index.html?v=batch2-steps-1",
    imported: true,
    teacherNotes: [
      "Covers one-step, two-step, and challenging linear equation forms.",
      "Mixed sets deliberately include coverage from each selected level's core types.",
      "Strong fit for board modelling because steps use balance-method language."
    ]
  },
  {
    slug: "simultaneous-equations",
    title: "Simultaneous Equations",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate simultaneous linear equation questions for substitution and elimination with exact fractional working.",
    tags: ["algebra", "simultaneous equations", "systems of equations", "substitution", "elimination", "fractions", "KaTeX"],
    toolPath: "tools/simultaneous-equations/index.html?v=simultaneous-worksheet-1",
    imported: true,
    teacherNotes: [
      "Covers substitution and elimination, including mixed retrieval sets.",
      "Worked steps model rearranging, substituting, scaling, eliminating, back-substituting, and checking.",
      "Display is tuned for projection with compact spacing and scroll-safe equation rows."
    ]
  },
  {
    slug: "simultaneous-applications",
    title: "Simultaneous Applications",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Context Practice",
    access: "Free",
    status: "Imported",
    description: "Generate contextual simultaneous-equation problems, from two-variable applications to three-variable and quadratic modelling.",
    tags: ["algebra", "simultaneous equations", "word problems", "applications", "modelling", "elimination", "quadratics", "KaTeX"],
    toolPath: "tools/simultaneous-applications/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Mixed sets focus on forming equations from context before solving.",
      "Level 1 uses two-variable application problems; Level 2 adds three-variable and quadratic contexts.",
      "Long scenarios and worked solutions are scroll-safe inside the iframe and Classroom View."
    ]
  },
  {
    slug: "remainder-theorem",
    title: "Remainder and Factor Theorem",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate synthetic division, remainder theorem, and factor theorem questions with worked steps.",
    tags: ["algebra", "polynomials", "remainder theorem", "factor theorem", "synthetic division", "division", "KaTeX"],
    toolPath: "tools/remainder-theorem/index.html?v=batch1-steps-1",
    imported: true,
    teacherNotes: [
      "Covers synthetic division, remainders, factors, and unknown-coefficient problems.",
      "Longer worked examples benefit from Classroom View scaling and horizontal equation containment.",
      "Good candidate for future shared polynomial and synthetic-division table components."
    ]
  },
  {
    slug: "fractions",
    title: "Fractions Basics",
    category: "Numbers",
    level: "KS2 / KS3",
    type: "Practice Generator",
    access: "Free",
    status: "Legacy",
    description: "Build fluency with fraction arithmetic and equivalent forms.",
    tags: ["numbers", "fractions", "fluency"],
    toolPath: "tools/fractions/index.html?v=step-structure-1",
    imported: false,
    hidden: true
  },
  {
    slug: "order-of-operations",
    title: "Order of Operations",
    category: "Numbers",
    level: "KS2 / KS3",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate PEMDAS questions with levels for precedence, brackets, exponents, division, and negatives.",
    tags: ["numbers", "PEMDAS", "BODMAS", "order of operations", "exponents", "negative numbers"],
    toolPath: "tools/order-of-operations/index.html?v=order-operations-math-render-1",
    imported: true,
    teacherNotes: [
      "Designed for repeated board practice on order of operations.",
      "Three levels move from positive-number precedence into brackets and negatives.",
      "Useful for quick retrieval practice before algebra or arithmetic lessons."
    ]
  },
  {
    slug: "percentages-real-world",
    title: "Percentage Applications: Finance and Contexts",
    category: "Numbers",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate contextual percentage problems for shopping, tax, commission, interest, investments, loans, science, statistics, and error analysis.",
    tags: ["numbers", "percentages", "applications", "finance", "tax", "science", "interest"],
    toolPath: "tools/percentages-real-world/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers daily applications such as discounts, tips, service charges, and tax.",
      "Level 2 develops commission, simple interest, markup, and profit margin contexts.",
      "Level 3 introduces compound interest, mortgage payments, and investment returns.",
      "Level 4 applies percentages to concentration, statistical intervals, and measurement error."
    ]
  },
  {
    slug: "averages-range",
    title: "Averages, Range and Missing Values",
    category: "Statistics",
    level: "KS3",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate statistics questions for mean, median, mode, range, comparing measures, and missing values.",
    tags: ["data", "averages", "statistics", "mean", "median", "mode", "range", "missing values"],
    toolPath: "tools/averages-range/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Covers individual measures, combined measures, comparing measures, and missing values.",
      "Useful as a live board tool for modelling calculation steps and data organisation.",
      "Strong fit for the virtual textbook idea because it has both procedure and interpretation."
    ]
  },
  {
    slug: "classroom-displays",
    title: "Board Displays and Blank Diagrams",
    category: "Classroom Tools",
    level: "All",
    type: "Board Display",
    access: "Free",
    status: "Imported",
    description: "Open board-ready graph grids, coordinate axes, 2D shapes, 3D solids, probability templates, statistics diagrams, mechanics setups, and Earth geometry diagrams for live classroom explanation.",
    tags: ["classroom", "display", "graph grid", "coordinate axes", "geometry", "shapes", "solids", "statistics", "mechanics", "earth geometry", "latitude", "longitude", "board"],
    toolPath: "tools/classroom-displays/index.html?v=classroom-displays-fit-1",
    imported: true,
    teacherNotes: [
      "Designed as a static board companion rather than a question generator.",
      "Teachers can quickly show blank grids, coordinate axes, common 2D shapes, 3D solids, statistics templates, mechanics setups, and Earth geometry diagrams.",
      "Use full-screen mode when projecting to the board for live explanation or annotation."
    ]
  },
  {
    slug: "elementary-manipulatives",
    title: "Primary and Elementary Maths Manipulatives",
    category: "Classroom Tools",
    level: "Primary / Elementary",
    type: "Interactive Display",
    access: "Free",
    status: "Imported",
    description: "A board-ready manipulative tray for primary and elementary maths, including base-ten blocks, ten frames, counters, arrays, fraction bars, number lines, place value charts, and clock faces.",
    tags: ["classroom", "primary", "elementary", "manipulatives", "base ten", "ten frames", "counters", "arrays", "fractions", "number line", "place value", "clock"],
    toolPath: "tools/elementary-manipulatives/index.html?v=elementary-manipulatives-2",
    imported: true,
    teacherNotes: [
      "Designed as a visual modelling tool for younger learners rather than a question generator.",
      "Use the mode selector to switch between concrete models such as base-ten blocks, ten frames, counters, arrays, fraction bars, number lines, place value charts, and clock faces.",
      "Use full-screen mode when projecting so the manipulative takes over the board and leaves space for teacher explanation and annotation."
    ]
  },
  {
    slug: "elementary-starter-board",
    title: "Primary and Elementary Starter Board",
    category: "Classroom Tools",
    level: "Primary / Elementary",
    type: "Classroom Routine",
    access: "Free",
    status: "Imported",
    description: "Generate quick visual starter questions for counting, number bonds, place value, comparing numbers, missing numbers, arrays, fractions, time, money, and shapes.",
    tags: ["classroom", "primary", "elementary", "starter", "bell work", "number sense", "place value", "fractions", "time", "money", "shapes"],
    toolPath: "tools/elementary-starter-board/index.html?v=elementary-starter-board-1",
    imported: true,
    teacherNotes: [
      "Designed for short start-of-lesson routines with answers hidden until the teacher is ready to reveal them.",
      "Teachers can generate one large starter question or a four-question board across mixed or focused elementary topics.",
      "Use the reveal buttons to support the ask, discuss, reveal classroom flow."
    ]
  },
  {
    slug: "elementary-maths-playground",
    title: "Elementary Maths Playground",
    category: "Classroom Tools",
    level: "Primary / Elementary",
    type: "Interactive Display",
    access: "Free",
    status: "Imported",
    description: "Open colourful teacher-led elementary maths tasks for number bonds, place value, arrays, fractions, clocks, money, shape sorting, and missing-sign puzzles, with large visuals and hidden answers for classroom discussion.",
    tags: ["classroom", "primary", "elementary", "number bonds", "place value", "arrays", "fractions", "clocks", "money", "shapes", "missing signs", "visual maths", "starter", "retrieval"],
    toolPath: "tools/elementary-maths-playground/index.html?v=elementary-playground-4",
    imported: true,
    teacherNotes: [
      "Designed as a colourful board-ready activity space for younger learners.",
      "Each task keeps the answer hidden until the teacher is ready to reveal it.",
      "Modes cover number bonds, base-ten place value, multiplication arrays, shaded fraction bars, clocks, money, shape sorting, and missing operation signs.",
      "Use the ask, discuss, explain, reveal flow to build mathematical language and confidence."
    ]
  },
  {
    slug: "bar-models",
    title: "Bar Models",
    category: "Classroom Tools",
    level: "Primary / Elementary / KS3",
    type: "Interactive Display",
    access: "Free",
    status: "Imported",
    description: "Show colourful teacher-led bar models for fractions, percentages of amounts, percentage change, reverse percentages, ratio sharing, reverse ratio, comparison problems, and simple equations, with printable conceptual practice sheets.",
    tags: ["classroom", "primary", "elementary", "bar models", "visual problem models", "visual maths", "fractions", "percentages", "ratio", "proportion", "comparison", "equations", "Singapore maths"],
    toolPath: "tools/bar-models/index.html?v=bar-models-6",
    imported: true,
    teacherNotes: [
      "Designed for live conceptual modelling with one example on screen at a time.",
      "Use Next Step to reveal the structure gradually before showing the answer.",
      "Modes include fractions of amounts, percentage of an amount, fractional change, percentage increase and decrease, reverse percentages, ratio sharing, reverse ratio, comparison models, and equations.",
      "Useful when pupils need to see how the calculation is represented before using a formal written method.",
      "Use Practice PDF to create student sheets focused on labelling and completing bar models before calculation."
    ]
  },
  {
    slug: "word-search-builder",
    title: "Word Search Builder",
    category: "Classroom Tools",
    level: "All",
    type: "Printable Puzzle Builder",
    access: "Free",
    status: "Imported",
    description: "Create printable maths vocabulary word searches from teacher-entered words, with selectable grid size, direction controls, student sheet, answer key, and print/save PDF options.",
    tags: ["classroom", "word search", "vocabulary", "maths vocabulary", "puzzle", "printable", "starter", "retrieval", "cover lesson"],
    toolPath: "tools/word-search-builder/index.html?v=word-search-builder-2",
    imported: true,
    teacherNotes: [
      "Teachers enter their own topic vocabulary or generate a random maths vocabulary list, then the tool places the words into a printable grid.",
      "Grid size and direction settings allow the task to be made easier or more challenging.",
      "The student puzzle and answer key can be printed separately or saved as PDF from the browser print dialog.",
      "This is the first phase of the classroom puzzle builder and is designed to support vocabulary retrieval, starters, and cover work."
    ]
  },
  {
    slug: "exit-ticket-game",
    title: "Maths Exit Ticket Choice Board",
    category: "Classroom Tools",
    level: "All",
    type: "Classroom Routine",
    access: "Free",
    status: "Imported",
    description: "A colour-choice exit ticket board with reflective mathematics prompts and a five-minute classroom timer.",
    tags: ["classroom", "exit ticket", "reflection", "assessment", "plenary", "routine"],
    toolPath: "tools/exit-ticket-game/index.html?v=exit-ticket-choice-board-1",
    imported: true,
    teacherNotes: [
      "Designed for end-of-lesson reflection, quick confidence checks, and formative assessment.",
      "Students choose a colour without seeing the prompt first, keeping the routine light and engaging.",
      "Prompts are deliberately topic-neutral so they can be used after almost any mathematics lesson."
    ]
  },
  {
    slug: "math-in-a-minute",
    title: "Maths in a Minute",
    category: "Classroom Tools",
    level: "All",
    type: "Number Game",
    access: "Free",
    status: "Imported",
    description: "A one-minute target-number challenge where students combine five numbers using operations to hit or get close to a target.",
    tags: ["classroom", "game", "number sense", "operations", "mental maths", "target number"],
    toolPath: "tools/math-in-a-minute/index.html?v=math-in-a-minute-1",
    imported: true,
    teacherNotes: [
      "Useful as a starter, plenary, or fast whole-class number fluency challenge.",
      "Students combine five numbers with addition, subtraction, multiplication, and exact division to hit the target.",
      "Built-in hints and solution steps help teachers model strategy after the attempt."
    ]
  },
  {
    slug: "interface-guide",
    title: "How to Use This Site",
    category: "Site Guide",
    level: "All",
    type: "Onboarding Guide",
    access: "Free",
    status: "Imported",
    description: "A clear hover-led walkthrough for navigating the site and using the shared tool controls: levels, question types, timers, answers, worked steps, and board-view design.",
    tags: ["site guide", "how to use", "navigation", "teacher guide", "interface", "onboarding", "workflow", "projection"],
    toolPath: "tools/interface-guide/index.html?v=how-to-use-site-4",
    imported: true,
    teacherNotes: [
      "Use this page to introduce teachers to site navigation and the common controls across generated tools.",
      "The mock interface uses Exponents as the example topic while explaining the universal workflow.",
      "Hover tooltips identify the purpose of each shared section and control.",
      "The workflow emphasises board-ready problem sets that avoid unnecessary scrolling."
    ]
  },
  {
    slug: "fractions-table",
    title: "Classroom Starter Tables",
    category: "Classroom Tools",
    level: "KS2 / KS3 / GCSE",
    type: "Starter Table Generator",
    access: "Free",
    status: "Imported",
    description: "A flexible classroom starter table with revealable cells for fractions, area, volume, surface area, algebra, sequences, ratio, standard form, probability, and right-triangle practice.",
    tags: ["classroom", "starter", "tables", "fractions", "area", "volume", "surface area", "algebra", "sequences", "ratio", "probability", "standard form", "pythagoras", "trigonometry"],
    toolPath: "tools/fractions-table/index.html?v=starter-tables-1",
    imported: true,
    teacherNotes: [
      "Use the table type dropdown to switch between starter tables for different topics.",
      "Each table keeps the same classroom interaction pattern: some cells are shown and missing cells can be revealed one at a time.",
      "Use New to refresh the current table type, Random Type for quick retrieval practice, or Show All for checking.",
      "The tool is designed for starters, mini-whiteboard questioning, and short whole-class review."
    ]
  },
  {
    slug: "twenty4",
    title: "Ninja Maths Challenge",
    category: "Classroom Tools",
    level: "All",
    type: "Number Game",
    access: "Free",
    status: "Imported",
    description: "A 24-style number challenge where students combine four numbers with operations to make 24 before the timer runs out.",
    tags: ["classroom", "game", "24 game", "number sense", "operations", "mental maths"],
    toolPath: "tools/twenty4/index.html?v=ninja-math-1",
    imported: true,
    teacherNotes: [
      "Students use each of the four numbers once and combine them with operations to make 24.",
      "The generated number sets are checked for an integer-only solution before they appear.",
      "Use it as a quick starter, plenary, or whole-class arithmetic reasoning challenge."
    ]
  }
];

const algebraToolGroups = {
  "substitution": "Algebra Foundations",
  "simplification": "Algebra Foundations",
  "bracket-expansion": "Algebra Foundations",
  "exponents-index-notation": "Algebra Foundations",
  "surds-radicals": "Algebra Foundations",
  "algebraic-fractions": "Algebra Foundations",
  "absolute-values": "Algebra Foundations",
  "linear-equations": "Equations and Inequalities",
  "transposition-formulae": "Equations and Inequalities",
  "inequalities": "Equations and Inequalities",
  "simultaneous-equations": "Equations and Inequalities",
  "simultaneous-applications": "Equations and Inequalities",
  "quadratic-equations": "Equations and Inequalities",
  "quadratic-factorisation": "Quadratics and Factorisation",
  "advanced-factorisation": "Quadratics and Factorisation",
  "binomial-expansion": "Quadratics and Factorisation",
  "functions": "Functions, Graphs and Coordinate Geometry",
  "graph-transformations-curve-sketching": "Functions, Graphs and Coordinate Geometry",
  "straight-lines": "Functions, Graphs and Coordinate Geometry",
  "linear-programming": "Functions, Graphs and Coordinate Geometry",
  "conic-intersections": "Functions, Graphs and Coordinate Geometry",
  "logarithms-practice": "Functions, Graphs and Coordinate Geometry",
  "sequences": "Sequences and Series",
  "sequences-series": "Sequences and Series",
  "series-expansions": "Sequences and Series",
  "sine-cosine-rule": "Trigonometry",
  "trig-equation-solver": "Trigonometry",
  "trig-graphs-transformations": "Trigonometry",
  "trigonometric-functions": "Trigonometry",
  "differentiation-polynomials": "Calculus",
  "differentiation-rules": "Calculus",
  "trig-differentiation-rules": "Calculus",
  "inverse-trig-differentiation": "Calculus",
  "advanced-differentiation": "Calculus",
  "integration": "Calculus",
  "advanced-integration": "Calculus",
  "volumes-of-revolution": "Calculus",
  "integration-algebraic-fractions": "Calculus",
  "differential-equations": "Calculus",
  "partial-fractions": "A-Level and Further Pure",
  "matrices": "A-Level and Further Pure",
  "advanced-matrices": "A-Level and Further Pure",
  "linear-algebra": "A-Level and Further Pure",
  "further-vectors": "A-Level and Further Pure",
  "proof-by-induction": "A-Level and Further Pure",
  "roots-of-equations": "A-Level and Further Pure",
  "numerical-methods": "A-Level and Further Pure",
  "complex-numbers": "A-Level and Further Pure",
  "polar-coordinates": "A-Level and Further Pure",
  "hyperbolic-functions": "A-Level and Further Pure",
  "remainder-theorem": "A-Level and Further Pure"
};

const algebraGroupOrder = [
  "Algebra Foundations",
  "Equations and Inequalities",
  "Quadratics and Factorisation",
  "Functions, Graphs and Coordinate Geometry",
  "Sequences and Series",
  "Trigonometry",
  "Calculus",
  "A-Level and Further Pure"
];

const subjectToolGroups = {
  Numbers: {
    "four-operations": "Number Fluency and Operations",
    "order-of-operations": "Number Fluency and Operations",
    "decimals-practice-lab": "Number Fluency and Operations",
    "hcf-lcm": "Number Fluency and Operations",
    "fractions-practice": "Fractions, Decimals and Percentages",
    "simple-percentage-tasks": "Fractions, Decimals and Percentages",
    "percentages-real-world": "Fractions, Decimals and Percentages",
    "ratio-proportion": "Ratio, Proportion and Units",
    "conversions-teaching": "Ratio, Proportion and Units",
    "upper-lower-bounds": "Ratio, Proportion and Units",
    "powers-of-10": "Powers, Standard Form and Bases",
    "number-bases-number-sets": "Powers, Standard Form and Bases"
  },
  Geometry: {
    "area-rectangles": "Area, Perimeter and Circles",
    "area-triangles": "Area, Perimeter and Circles",
    "circles-area-circumference": "Area, Perimeter and Circles",
    "sectors-arc-length": "Area, Perimeter and Circles",
    "volume-surface-area-prisms": "3D Measures",
    "cylinders-cones-volume-surface-area": "3D Measures",
    "pyramids-spheres-volume-surface-area": "3D Measures",
    "pythagoras-theorem": "Trigonometry and Bearings",
    "trigonometric-ratios": "Trigonometry and Bearings",
    "sine-cosine-rule": "Trigonometry and Bearings",
    "bearings": "Trigonometry and Bearings",
    "earth-geometry": "Trigonometry and Bearings",
    "equation-of-a-circle": "Coordinate Geometry",
    "transformations": "Coordinate Geometry",
    "loci-constructions": "Constructions and Loci",
    "free-vectors": "Vectors and Similarity",
    "scale-drawing-similar-shapes": "Vectors and Similarity",
    "missing-angles": "Angles and Shape Geometry",
    "circle-theorems": "Angles and Shape Geometry"
  },
  Statistics: {
    "averages-range": "Data Summary and Representation",
    "histograms": "Data Summary and Representation",
    "cumulative-frequency-curves": "Data Summary and Representation",
    "kaizen-large-data-set": "Data Summary and Representation",
    "sampling-methods-bias": "Data Collection and Sampling",
    "tree-diagrams-conditional-probability": "Probability and Set Diagrams",
    "venn-diagrams": "Probability and Set Diagrams",
    "permutations-combinations": "Probability and Set Diagrams",
    "discrete-random-variables": "Random Variables and Distributions",
    "continuous-random-variables": "Random Variables and Distributions",
    "normal-distribution": "Random Variables and Distributions",
    "binomial-geometric-distribution": "Random Variables and Distributions",
    "poisson-distribution": "Random Variables and Distributions",
    "correlation-regression": "Regression and Large Data",
    "hypothesis-testing": "Inference",
    "confidence-intervals": "Inference"
  },
  Mechanics: {
    "motion-graphs-constant-acceleration": "Motion and Kinematics",
    "equations-of-motion": "Motion and Kinematics",
    "newtons-second-law": "Forces and Equilibrium",
    "friction": "Forces and Equilibrium",
    "moments": "Forces and Equilibrium",
    "work-energy-power": "Work, Energy and Power",
    "momentum": "Momentum, Impulse and Projectiles",
    "projectiles": "Momentum, Impulse and Projectiles"
  },
  "Classroom Tools": {
    "classroom-displays": "Board Displays and Visuals",
    "elementary-manipulatives": "Board Displays and Visuals",
    "bar-models": "Board Displays and Visuals",
    "elementary-starter-board": "Starters and Retrieval",
    "elementary-maths-playground": "Starters and Retrieval",
    "fractions-table": "Starters and Retrieval",
    "word-search-builder": "Puzzle Builders",
    "exit-ticket-game": "Games and Routines",
    "math-in-a-minute": "Games and Routines",
    "twenty4": "Games and Routines"
  },
  "Site Guide": {
    "interface-guide": "Site Guidance"
  }
};

const subjectGroupOrder = {
  Algebra: algebraGroupOrder,
  Numbers: [
    "Number Fluency and Operations",
    "Fractions, Decimals and Percentages",
    "Ratio, Proportion and Units",
    "Powers, Standard Form and Bases"
  ],
  Geometry: [
    "Area, Perimeter and Circles",
    "3D Measures",
    "Trigonometry and Bearings",
    "Coordinate Geometry",
    "Constructions and Loci",
    "Vectors and Similarity",
    "Angles and Shape Geometry"
  ],
  Statistics: [
    "Data Collection and Sampling",
    "Data Summary and Representation",
    "Probability and Set Diagrams",
    "Random Variables and Distributions",
    "Regression and Large Data",
    "Inference"
  ],
  Mechanics: [
    "Motion and Kinematics",
    "Forces and Equilibrium",
    "Work, Energy and Power",
    "Momentum, Impulse and Projectiles"
  ],
  "Classroom Tools": [
    "Board Displays and Visuals",
    "Starters and Retrieval",
    "Puzzle Builders",
    "Games and Routines"
  ],
  "Site Guide": [
    "Site Guidance"
  ]
};

const subjectGroupNotes = {
  "Algebra Foundations": "Core manipulation, substitution, indices, surds, algebraic fractions, and modulus notation.",
  "Equations and Inequalities": "Solving linear, simultaneous, quadratic, contextual, and inequality problems.",
  "Quadratics and Factorisation": "Factorising expressions, quadratic forms, grouping, difference of squares, cubics, and binomial expansion.",
  "Functions, Graphs and Coordinate Geometry": "Function notation, logarithms, straight lines, gradients, and line-curve intersections.",
  "Sequences and Series": "Sequences, nth terms, arithmetic and geometric series, and Taylor or Maclaurin expansions.",
  "Trigonometry": "Triangle rules, trigonometric equations, identities, reciprocal functions, and proofs.",
  "Calculus": "Differentiation, integration, implicit and parametric methods, and differential equations.",
  "A-Level and Further Pure": "Partial fractions, matrices, vectors, roots, complex numbers, polar coordinates, hyperbolic functions, and theorem work.",
  "Number Fluency and Operations": "Arithmetic, place value, decimal calculation, order of operations, HCF, LCM, and prime factorisation.",
  "Fractions, Decimals and Percentages": "Fraction arithmetic, percentage fluency, finance contexts, and percentage applications.",
  "Ratio, Proportion and Units": "Ratio, proportion, unit conversion, compound measures, and bounds.",
  "Powers, Standard Form and Bases": "Powers of 10, standard form, number bases, and number sets.",
  "Area, Perimeter and Circles": "2D measure topics for rectangles, triangles, circles, sectors, arcs, and compound contexts.",
  "3D Measures": "Volume and surface area for prisms, cylinders, cones, and spheres.",
  "Trigonometry and Bearings": "Pythagoras, right-angled trigonometry, non-right triangle rules, bearings, and Earth geometry.",
  "Coordinate Geometry": "Circle equations, coordinate geometry, transformations, and links to algebraic graph work.",
  "Constructions and Loci": "Compass-and-straightedge constructions, perpendicular bisectors, angle bisectors, loci, and region problems.",
  "Vectors and Similarity": "Column vectors, geometric vectors, scale drawings, and similar shapes.",
  "Angles and Shape Geometry": "Missing angles in lines, triangles, quadrilaterals, circle theorems, and standard shape facts.",
  "Data Collection and Sampling": "Sampling methods, bias, questionnaire design, representative samples, and sampling calculations.",
  "Data Summary and Representation": "Averages, range, grouped data, histograms, cumulative frequency, and large-data-set practice.",
  "Probability and Set Diagrams": "Tree diagrams, conditional probability, Venn diagrams, and set notation.",
  "Random Variables and Distributions": "Discrete, continuous, normal, binomial, and geometric distributions.",
  "Regression and Large Data": "Correlation, regression, interpolation, extrapolation, and data interpretation.",
  "Inference": "Hypothesis testing, significance, critical regions, p-values, and contextual conclusions.",
  "Motion and Kinematics": "Average speed, acceleration, motion graphs, SUVAT, and constant acceleration modelling.",
  "Forces and Equilibrium": "Newton's second law, resultant force, moments, beams, and equilibrium.",
  "Momentum, Impulse and Projectiles": "Momentum, impulse, collisions, projectile motion, and physical modelling.",
  "Board Displays and Visuals": "Blank diagrams, graph grids, manipulatives, and board-ready teaching visuals.",
  "Starters and Retrieval": "Fast routines and revealable tables for lesson starters, retrieval, and mini-whiteboard work.",
  "Games and Routines": "Short classroom games, exit tickets, target-number challenges, and plenary routines.",
  "Site Guidance": "Guidance pages for learning the site and the shared tool workflow."
};

const state = {
  query: "",
  category: "All",
  level: "All",
  access: "All",
  toolAccess: {},
  toolMetadata: {},
  userProfiles: [],
  schools: [],
  schoolTeacherAccess: [],
  schoolsLoaded: false,
  usersLoaded: false,
  homepageContent: {},
  homepageScreenshots: [],
  homepageContentLoaded: false,
  homepageScreenshotsLoaded: false,
  bookingSettings: {},
  bookingSettingsLoaded: false,
  toolInfoOverrides: {},
  toolInfoOverridesLoaded: false,
  universityVideos: {},
  siteTestimonials: [],
  testimonialsLoaded: false,
  accessLoaded: false,
  tutorLearners: [],
  tutorSessions: [],
  tutorTopics: [],
  tutorHomework: [],
  tutorAssessments: [],
  tutorLoaded: false,
  tutorLoading: false,
  tutorError: "",
  tutorSelectedLearnerId: "",
  lastAuthAccessKey: ""
};

const defaultTestimonials = [
  {
    slot_id: "testimonial-1",
    quote: "Kaizen Maths has reduced the time I spend preparing worksheets.",
    person_name: "Maths teacher",
    role_label: "Beta tester",
    organisation: "",
    is_active: true,
    sort_order: 1
  },
  {
    slot_id: "testimonial-2",
    quote: "This is exactly the kind of tool a maths department needs.",
    person_name: "Head of Mathematics",
    role_label: "Department lead",
    organisation: "",
    is_active: true,
    sort_order: 2
  },
  {
    slot_id: "testimonial-3",
    quote: "The worksheet builder makes planning much more efficient.",
    person_name: "GCSE maths teacher",
    role_label: "Classroom user",
    organisation: "",
    is_active: true,
    sort_order: 3
  }
];

const launchReadinessSections = [
  {
    title: "Product And Content",
    items: [
      ["home-copy", "Homepage explains the value clearly", "Headline, workflow, teacher audiences, and calls to action are clear for teachers and schools."],
      ["tool-samples", "Core tool categories have been checked", "Algebra, number, geometry, statistics, mechanics, classroom tools, worksheet builder, and exam builder open correctly."],
      ["worked-steps", "Worked solutions are good enough for public testing", "High-priority tools show clear working and avoid obvious formatting issues."],
      ["worksheet-builder", "Worksheet builder flow is understandable", "Teachers can load question blocks, edit marks, generate the worksheet, and view the answer key."],
      ["kaizen-university", "Kaizen University has starter guidance", "At least one short walkthrough or placeholder explains how teachers should begin."]
    ]
  },
  {
    title: "Access And Accounts",
    items: [
      ["google-signin", "Google sign-in works on live site", "A new teacher can sign in, return to the site, and see their account state change."],
      ["admin-role", "Admin account is protected", "Only admin users can see and use the Admin area."],
      ["free-trial-rules", "Free, trial, pro, school, and admin roles behave correctly", "Free visitors see limited sample access, signed-in trial users can use the wider site for 30 days, and admin can update roles."],
      ["school-space", "School Space join flow is ready", "A school code, allowed domain, approved email, seat limit, and licence end date can be tested."],
      ["supabase-schema", "Supabase schema is current", "The latest schema has been run after any auth, school, Stripe, or admin changes."]
    ]
  },
  {
    title: "Payments And School Sales",
    items: [
      ["stripe-test", "Stripe test checkout has been checked", "Teacher monthly and annual price IDs exist and test mode works before live payments are enabled."],
      ["stripe-webhook", "Stripe webhook is configured", "Webhook endpoint and secret are saved in Vercel and subscription updates reach Supabase."],
      ["trial-message", "Trial/upgrade message is accurate", "Upgrade page explains the 30-day trial, early-adopter pricing, and what happens after trial access ends."],
      ["school-pricing", "School licence pricing/process is clear", "School enquiries, custom pricing, invoices, and admin-created school spaces are handled consistently."],
      ["support-process", "Support route is clear", "Teachers and schools know how to contact you for payment, school access, or account problems."]
    ]
  },
  {
    title: "Trust, Launch, And Operations",
    items: [
      ["domain-ssl", "Domain and SSL are working", "kaizenmaths.com and www.kaizenmaths.com resolve correctly without browser or antivirus warnings."],
      ["seo-branding", "SEO and branding basics are clean", "Titles, descriptions, favicon, site name, and Platform Shell references have been checked."],
      ["trust-pages", "Trust pages are simple and school-friendly", "Privacy and trust copy clearly states teacher-only accounts and no student personal data requirement."],
      ["backup-plan", "Backup and rollback plan is understood", "GitHub, Vercel deployments, and Supabase changes can be reviewed or reverted if needed."],
      ["launch-comms", "Launch message is ready", "WhatsApp/email copy, beta feedback instructions, and school demo message are ready to send."]
    ]
  }
];

function isCommonCoreCoverageTool(tool) {
  const level = normalise(tool.level);
  const categoryMatch = ["Algebra", "Numbers", "Geometry", "Statistics"].includes(tool.category);
  const schoolLevelMatch = level.includes("ks2") || level.includes("ks3") || level.includes("gcse") || level.includes("igcse") || level.includes("csec");
  const taggedMatch = curriculumTagMatches(tool, "Common Core");
  return !isFurtherMathsTool(tool) && (taggedMatch || (categoryMatch && schoolLevelMatch));
}

function isCsecCoverageTool(tool) {
  const level = normalise(tool.level);
  const taggedMatch = curriculumTagMatches(tool, "CSEC");
  const categoryMatch = ["Algebra", "Numbers", "Geometry", "Statistics"].includes(tool.category);
  const schoolLevelMatch = level.includes("csec") || level.includes("gcse") || level.includes("igcse") || level.includes("ks3");
  return !isFurtherMathsTool(tool) && (taggedMatch || (categoryMatch && schoolLevelMatch));
}

function isCapeCoverageTool(tool) {
  const level = normalise(tool.level);
  const taggedMatch = curriculumTagMatches(tool, "CAPE");
  const categoryMatch = ["Algebra", "Geometry", "Statistics", "Mechanics"].includes(tool.category);
  const advancedLevelMatch = level.includes("cape") || level.includes("a-level") || level.includes("ib") || isFurtherMathsTool(tool);
  return taggedMatch || (categoryMatch && advancedLevelMatch);
}

const curriculumMapAreas = [
  {
    id: "gcse",
    title: "GCSE",
    subtitle: "Core secondary mathematics coverage",
    description: "Topic generators and exam-style practice for GCSE, including KS3 bridge material where it supports GCSE readiness.",
    match: (tool) => {
      const level = normalise(tool.level);
      return ["Algebra", "Numbers", "Geometry", "Statistics"].includes(tool.category)
        && (level.includes("gcse") || level.includes("ks3") || level.includes("ks2"));
    }
  },
  {
    id: "csec",
    title: "CSEC",
    subtitle: "Caribbean secondary mathematics coverage",
    description: "Topic generators aligned with the secondary mathematics skills commonly needed for CSEC: number, algebra, geometry, measures, probability, statistics, and problem solving.",
    match: (tool) => isCsecCoverageTool(tool)
  },
  {
    id: "common-core",
    title: "Common Core",
    subtitle: "US middle school and high school mathematics links",
    description: "Tools that support Common Core-style number fluency, ratios, expressions, equations, functions, geometry, probability, statistics, and modelling. Admin-added Common Core tags are included automatically.",
    match: (tool) => isCommonCoreCoverageTool(tool)
  },
  {
    id: "alevel-pure",
    title: "A-Level Pure",
    subtitle: "Algebra, functions, calculus, coordinate geometry, and proof",
    description: "Pure mathematics generators covering algebraic manipulation, calculus, functions, matrices, trigonometry, and related higher-level topics.",
    match: (tool) => {
      const level = normalise(tool.level);
      return ["Algebra", "Geometry"].includes(tool.category) && level.includes("a-level") && !isFurtherMathsTool(tool);
    }
  },
  {
    id: "cape",
    title: "CAPE",
    subtitle: "Caribbean advanced mathematics coverage",
    description: "Advanced pure, statistics, and mechanics tools that support CAPE-style practice, including calculus, functions, proof, distributions, hypothesis testing, vectors, matrices, and mechanics.",
    match: (tool) => isCapeCoverageTool(tool)
  },
  {
    id: "further-maths",
    title: "Further Maths",
    subtitle: "Complex numbers, matrices, vectors, polar coordinates, hyperbolic functions, and differential equations",
    description: "Further Maths generators for advanced algebra, matrices, vectors, complex numbers, polar coordinates, hyperbolic functions, and differential equations.",
    match: (tool) => isFurtherMathsTool(tool)
  },
  {
    id: "alevel-statistics",
    title: "A-Level Statistics",
    subtitle: "Probability, distributions, data, and regression",
    description: "Statistics tools for probability models, random variables, normal, binomial and geometric distributions, large data set work, and regression.",
    match: (tool) => tool.category === "Statistics" && normalise(tool.level).includes("a-level") && !isFurtherMathsTool(tool)
  },
  {
    id: "alevel-mechanics",
    title: "A-Level Mechanics",
    subtitle: "Motion, momentum, moments, and projectiles",
    description: "Mechanics tools covering motion graphs, constant acceleration, equations of motion, momentum, moments, projectiles, and modelling with units.",
    match: (tool) => tool.category === "Mechanics" && !isFurtherMathsTool(tool)
  }
];

const futureCurriculumTags = [
  {
    label: "IGCSE",
    description: "Use Admin Tool Tags to mark tools that align closely with Cambridge, Edexcel International, or other IGCSE routes."
  },
  {
    label: "IB",
    description: "IB tags can identify tools useful for Analysis and Approaches, Applications and Interpretation, statistics, and mechanics-style modelling."
  }
];

let homeTestimonialTimer = null;
let homeScreenshotTimer = null;

const accessLevels = ["free", "trial", "pro", "school", "admin"];
const freeSampleTools = new Set([
  "substitution",
  "fractions-practice",
  "pythagoras-theorem",
  "averages-range",
  "classroom-displays",
  "bar-models",
  "elementary-starter-board",
  "elementary-maths-playground",
  "interface-guide"
]);

const worksheetState = {
  toolSlug: "",
  tool: null,
  metadata: null,
  worksheet: null,
  sections: [],
  lastAddedSignature: "",
  loadToken: 0
};

const app = document.getElementById("app");
const globalSearch = document.getElementById("globalSearch");
const mobileNav = document.getElementById("mobileNav");
let pendingFocusTarget = "";

function normalise(value) {
  return String(value || "").toLowerCase();
}

function isFurtherMathsTool(tool) {
  const text = normalise([tool.level, tool.title, ...(tool.tags || []), ...editableToolTags(tool)].join(" "));
  return text.includes("further maths") || text.includes("further math");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function titleCaseAccess(value) {
  const normalised = normalise(value || "trial");
  if (normalised === "free") return "Free";
  if (normalised === "trial") return "Trial";
  if (normalised === "pro") return "Pro";
  if (normalised === "school") return "School";
  if (normalised === "admin") return "Admin";
  return "Trial";
}

function formatDateForInput(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function formatDisplayDate(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function dateInputToIso(value, endOfDay = false) {
  if (!value) return null;
  const time = endOfDay ? "23:59:59.000Z" : "00:00:00.000Z";
  const date = new Date(`${value}T${time}`);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function normaliseEmailList(value) {
  return [...new Set(String(value || "")
    .split(/[\s,;]+/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean))];
}

function normaliseDomainList(value) {
  return [...new Set(String(value || "")
    .split(/[\s,;]+/)
    .map((item) => item.trim().toLowerCase().replace(/^@+/, ""))
    .filter(Boolean))];
}

function generateSchoolCode(length = 10) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const values = new Uint32Array(length);
  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(values);
  } else {
    for (let index = 0; index < length; index += 1) values[index] = Math.floor(Math.random() * 100000);
  }
  return Array.from(values, (value) => alphabet[value % alphabet.length]).join("");
}

function schoolById(id) {
  return state.schools.find((school) => school.id === id) || null;
}

function currentSchoolName() {
  const profile = authState().profile || {};
  return profile.school_name || schoolById(profile.school_id)?.name || "";
}

function schoolTeacherEmails(schoolId) {
  return state.schoolTeacherAccess
    .filter((row) => row.school_id === schoolId)
    .map((row) => row.email)
    .sort((a, b) => a.localeCompare(b));
}

function schoolSeatCount(schoolId) {
  return state.userProfiles.filter((profile) => profile.school_id === schoolId && normalise(profile.role) === "school").length;
}

function authState() {
  return window.KaizenAuth?.state || {};
}

function currentUserRole() {
  const auth = authState();
  if (!auth.session?.user) return "guest";
  const role = normalise(auth.profile?.role || window.KAIZEN_AUTH_CONFIG?.defaultRole || "trial");
  if (role === "trial" && auth.profile?.trial_ends_at) {
    const trialEnds = new Date(auth.profile.trial_ends_at);
    if (!Number.isNaN(trialEnds.getTime()) && trialEnds < new Date()) return "free";
  }
  if (role === "school") {
    if (auth.profile?.school_is_active === false) return "free";
    if (auth.profile?.school_licence_ends_at) {
      const licenceEnds = new Date(auth.profile.school_licence_ends_at);
      if (!Number.isNaN(licenceEnds.getTime()) && licenceEnds < new Date()) return "free";
    }
  }
  return role;
}

function isSignedIn() {
  return Boolean(authState().session?.user);
}

function isAuthChecking() {
  const auth = authState();
  return Boolean(auth.configured && !auth.ready);
}

function hasWorkspaceAccess() {
  return ["trial", "pro", "school", "admin"].includes(currentUserRole());
}

function hasTutorWorkspaceAccess() {
  return ["pro", "school", "admin"].includes(currentUserRole());
}

function isAdmin() {
  return currentUserRole() === "admin";
}

function toolCatalogDataShouldRerenderCurrentRoute() {
  const route = routeParts()[0] || "home";
  return ["home", "tools", "collections", "coverage-map", "admin"].includes(route);
}

function authSensitiveRouteShouldRerender() {
  const route = routeParts()[0] || "home";
  return ["worksheet-generator", "gcse-exam-style", "admin", "tutor-workspace", "school-space", "upgrade"].includes(route);
}

function currentAuthAccessKey() {
  const auth = authState();
  return [
    auth.session?.user?.id || "guest",
    currentUserRole()
  ].join("|");
}

function renderAuthSensitiveRouteIfNeeded() {
  const key = currentAuthAccessKey();
  const changed = key !== state.lastAuthAccessKey;
  state.lastAuthAccessKey = key;
  if (changed && authSensitiveRouteShouldRerender()) renderRoute();
}

function defaultRequiredAccess(tool) {
  return freeSampleTools.has(tool.slug) ? "free" : "trial";
}

function requiredAccess(tool) {
  const configured = normalise(state.toolAccess[tool.slug] || defaultRequiredAccess(tool));
  if (configured === "free" && !freeSampleTools.has(tool.slug)) return "trial";
  return configured;
}

function requiredAccessLabel(tool) {
  return titleCaseAccess(requiredAccess(tool));
}

function toolMetadata(tool) {
  return state.toolMetadata[tool.slug] || {};
}

function parseTagList(value) {
  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function editableToolTags(tool) {
  return parseTagList(toolMetadata(tool).curriculum_tags);
}

function allToolTags(tool) {
  return [...new Set([...(tool.tags || []), ...editableToolTags(tool)])];
}

function isVisibleTool(tool) {
  return !tool.hidden && tool.imported !== false;
}

function toolAlgebraGroup(tool) {
  return tool.category === "Algebra" ? algebraToolGroups[tool.slug] || "Other Algebra" : "";
}

function toolSubjectGroup(tool) {
  if (tool.category === "Algebra") return toolAlgebraGroup(tool);
  return subjectToolGroups[tool.category]?.[tool.slug] || "";
}

function canAccessTool(tool) {
  const required = requiredAccess(tool);
  if (required === "free") return true;
  const role = currentUserRole();
  if (role === "guest") return false;
  if (role === "admin") return true;
  if (role === "school") return ["free", "trial", "pro", "school"].includes(required);
  return accessLevels.indexOf(role) >= accessLevels.indexOf(required);
}

function signInCallout(title = "Sign in to continue") {
  const signedIn = isSignedIn();
  return `
    <section class="panel access-callout">
      <span class="eyebrow">${signedIn ? "Upgrade Required" : "Account Required"}</span>
      <h2>${title}</h2>
      <p>${signedIn ? "Your current account does not include this part of the virtual textbook. Upgrade for individual teacher access, or contact us for school access." : "Free visitors can try a small sample from the virtual textbook. Sign in with Google to start a 30-day trial and access the wider topic library, worksheet tools, and classroom question sets."}</p>
      ${signedIn ? `<a class="button primary" href="#/upgrade">View Upgrade Options</a>` : `<button class="button primary" type="button" data-auth-action="signin">Sign in with Google</button>`}
      <a class="button" href="#/tools">Back to Free Tools</a>
    </section>
  `;
}

function checkingAccessCallout(title = "Checking access") {
  return `
    <section class="panel access-callout">
      <span class="eyebrow">Account Check</span>
      <h2>${escapeHtml(title)}</h2>
      <p>Kaizen Maths is checking your signed-in session before opening this workspace.</p>
    </section>
  `;
}

function worksheetMathFragment(value) {
  const fragment = document.createDocumentFragment();
  const source = normaliseAlgebraUnitCoefficients(String(value ?? ""))
    .replace(/\\\(|\\\)|\\\[|\\\]|\$\$/g, "")
    .replace(/\$/g, "")
    .replace(/\\left|\\right/g, "")
    .replace(/\\displaystyle/g, "")
    .replace(/\\boxed\{([^{}]+)\}/g, "$1")
    .replace(/\\text\{([^{}]+)\}/g, "$1")
    .replace(/\\int/g, "∫")
    .replace(/\\sum/g, "∑")
    .replace(/\\big/g, "")
    .replace(/\\quad/g, " ")
    .replace(/\\;/g, " ")
    .replace(/\\,/g, " ")
    .replace(/\\\s+/g, " ")
    .replace(/\^\{?\\circ\}?/g, "°")
    .replace(/\\sqrt\{((?:[^{}]|\{[^{}]*\})+)\}/g, "√($1)")
    .replace(/\^\{(-?[A-Za-z0-9]+)\}/g, "^$1")
    .replace(/\\times/g, "×")
    .replace(/\\cdot/g, "·")
    .replace(/\\pm/g, "±")
    .replace(/\+\/-/g, "±")
    .replace(/\\approx/g, "≈")
    .replace(/\\neq/g, "≠")
    .replace(/\\Rightarrow/g, "⇒")
    .replace(/\\rightarrow/g, "→")
    .replace(/\\leq?/g, "≤")
    .replace(/\\geq?/g, "≥")
    .replace(/\\lt/g, "<")
    .replace(/\\gt/g, ">")
    .replace(/\\infty/g, "∞")
    .replace(/\\theta/g, "θ")
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\gamma/g, "γ")
    .replace(/\\Delta/g, "Δ")
    .replace(/\\pi/g, "π")
    .replace(/\\sin/g, "sin")
    .replace(/\\cos/g, "cos")
    .replace(/\\tan/g, "tan")
    .replace(/\\sec/g, "sec")
    .replace(/\\csc/g, "csc")
    .replace(/\\cot/g, "cot")
    .replace(/\b(sin|cos|tan|sec|csc|cot)-1(?=\s*\()/g, "$1^-1")
    .replace(/\\ln/g, "ln");
  const tokenPattern = /∑_\{(?<sumLowerBrace>[^{}]+)\}\^\{?(?<sumUpperBrace>[^{}\s]+)\}?|∑_(?<sumLowerSimple>-?[A-Za-z0-9]+)\^(?<sumUpperSimple>-?[A-Za-z0-9]+)|∫_\{(?<integralLowerBrace>[^{}]+)\}\^\{?(?<integralUpperBrace>[^{}\s]+)\}?|∫_(?<integralLowerSimple>-?[0-9]+)\^(?<integralUpperSimple>-?[0-9]+)|\^\{\\d?frac\{(?<supFracNumerator>[^{}]+)\}\{(?<supFracDenominator>[^{}]+)\}\}|\\d?frac\{(?<fracNumerator>[^{}]+)\}\{(?<fracDenominator>[^{}]+)\}|\^\{(?<supBrace>[^{}]+)\}|\^\((?<supParen>[^()]+)\)|\^(?<supSimple>-?[A-Za-z0-9])|_\{(?<subBrace>[^{}]+)\}|_(?<subSimple>-?[A-Za-z0-9∞]+)|(?<implicitBase>[A-Za-z])(?<implicitPower>[2-9])(?=\b)/g;
  let lastIndex = 0;
  let match;

  function appendText(text) {
    if (text) fragment.appendChild(document.createTextNode(formatWorksheetMathText(text)));
  }

  function createFraction(numeratorText, denominatorText) {
    const fraction = document.createElement("span");
    fraction.className = "worksheet-fraction";
    const numerator = document.createElement("span");
    numerator.appendChild(worksheetMathFragment(numeratorText));
    const denominator = document.createElement("span");
    denominator.appendChild(worksheetMathFragment(denominatorText));
    fraction.append(numerator, denominator);
    return fraction;
  }

  function createLimitedOperator(symbol, lowerText, upperText) {
    const operator = document.createElement("span");
    operator.className = "worksheet-limited-operator";
    const upper = document.createElement("span");
    upper.className = "worksheet-limited-upper";
    upper.textContent = upperText;
    const glyph = document.createElement("span");
    glyph.className = "worksheet-limited-symbol";
    glyph.textContent = symbol;
    const lower = document.createElement("span");
    lower.className = "worksheet-limited-lower";
    lower.textContent = lowerText;
    operator.append(upper, glyph, lower);
    return operator;
  }

  while ((match = tokenPattern.exec(source)) !== null) {
    appendText(source.slice(lastIndex, match.index));
    const groups = match.groups || {};

    if ((groups.sumLowerBrace !== undefined && groups.sumUpperBrace !== undefined) || (groups.sumLowerSimple !== undefined && groups.sumUpperSimple !== undefined)) {
      fragment.appendChild(createLimitedOperator("∑", groups.sumLowerBrace ?? groups.sumLowerSimple, groups.sumUpperBrace ?? groups.sumUpperSimple));
    } else if ((groups.integralLowerBrace !== undefined && groups.integralUpperBrace !== undefined) || (groups.integralLowerSimple !== undefined && groups.integralUpperSimple !== undefined)) {
      const integral = document.createElement("span");
      integral.className = "worksheet-integral";
      integral.appendChild(document.createTextNode("∫"));
      const limits = document.createElement("span");
      limits.className = "worksheet-integral-limits";
      const upper = document.createElement("span");
      upper.textContent = groups.integralUpperBrace ?? groups.integralUpperSimple;
      const lower = document.createElement("span");
      lower.textContent = groups.integralLowerBrace ?? groups.integralLowerSimple;
      limits.append(upper, lower);
      integral.appendChild(limits);
      fragment.appendChild(integral);
    } else if (groups.supFracNumerator !== undefined && groups.supFracDenominator !== undefined) {
      const sup = document.createElement("sup");
      sup.appendChild(createFraction(groups.supFracNumerator, groups.supFracDenominator));
      fragment.appendChild(sup);
    } else if (groups.fracNumerator !== undefined && groups.fracDenominator !== undefined) {
      fragment.appendChild(createFraction(groups.fracNumerator, groups.fracDenominator));
    } else if (groups.subBrace !== undefined || groups.subSimple !== undefined) {
      const sub = document.createElement("sub");
      sub.textContent = groups.subBrace ?? groups.subSimple ?? "";
      fragment.appendChild(sub);
    } else {
      if (groups.implicitBase !== undefined && groups.implicitPower !== undefined) {
        fragment.appendChild(document.createTextNode(groups.implicitBase));
      }
      const sup = document.createElement("sup");
      sup.textContent = groups.supBrace ?? groups.supParen ?? groups.supSimple ?? groups.implicitPower ?? "";
      fragment.appendChild(sup);
    }

    lastIndex = tokenPattern.lastIndex;
  }

  appendText(source.slice(lastIndex));
  const wrapper = document.createElement("span");
  wrapper.className = "worksheet-math-inline";
  wrapper.appendChild(fragment);
  return wrapper;
}

function normalisePowerAtSymbols(value) {
  return String(value ?? "")
    .replace(/([A-Za-z0-9)\]}])\s*@\s*\{([^{}]+)\}/g, "$1^{$2}")
    .replace(/([A-Za-z0-9)\]}])\s*@\s*\(([^()]+)\)/g, "$1^($2)")
    .replace(/([A-Za-z0-9)\]}])\s*@\s*(-?\d+)/g, "$1^$2");
}

function normaliseAlgebraUnitCoefficients(value) {
  return normalisePowerAtSymbols(value).replace(/(^|[^A-Za-z0-9])([+\-−]?\s*)1([A-Za-z])(?=(?:\^|[⁰¹²³⁴⁵⁶⁷⁸⁹]|\b))/g, "$1$2$3");
}

function textLooksWorksheetMathLike(text) {
  const source = String(text ?? "");
  return /(\$\$|\\\(|\\\[|[_^]|[A-Za-z0-9)\]}]\s*@\s*(?:\{[^{}]+\}|\([^()]+\)|-?\d+)|[A-Za-z][2-9]\b|\\d?frac|\\sqrt|\\displaystyle|\\boxed|\\text|\\left|\\right|\\big|\\quad|\\;|\\,|\\times|\\cdot|\\pm|\+\/-|\\approx|\\neq|\\Rightarrow|\\rightarrow|\\leq?|\\geq?|\\lt|\\gt|\\infty|\\theta|\\alpha|\\beta|\\gamma|\\Delta|\\pi|\\sin|\\cos|\\tan|\\sec|\\csc|\\cot|\\ln|[A-Za-z0-9)\]°]\s*[=<>≤≥]\s*-?[A-Za-z0-9(]|[A-Za-z]\s*[+\-]\s*\d|\d\s*[+\-×÷*/]\s*-?\d|\d+[A-Za-z]\s*[+\-]\s*\d|\d\s*[×÷*/]\s*\d)/.test(source);
}

function formatWorksheetMathText(text) {
  return normaliseAlgebraUnitCoefficients(text)
    .replace(/(?<=[A-Za-z0-9)\]°])\s*(=|≤|≥|<|>|≈|≠)\s*(?=-?[A-Za-z0-9(]|[πθ])/g, " $1 ")
    .replace(/(?<=[A-Za-z0-9)\]°])\s*(×|÷|·)\s*(?=-?[A-Za-z0-9(]|[πθ])/g, " $1 ")
    .replace(/(?<=[A-Za-z0-9)\]°])\s*([+−])\s*(?=-?[A-Za-z0-9(]|[πθ])/g, " $1 ")
    .replace(/(?<=[A-Za-z0-9)\]°])\s*-\s*(?=[A-Za-z0-9(]|[πθ])/g, " - ")
    .replace(/(?<=[A-Za-z])\s-\s(?=[A-Za-z]{2,})/g, "-")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function worksheetLatexArrayHtml(value) {
  return String(value ?? "").replace(/\$\$\s*\\begin\{array\}\{[^{}]*\}([\s\S]*?)\\end\{array\}\s*\$\$/g, (_, body) => {
    const rows = body
      .replace(/\\hline/g, "")
      .split(/\\\\/g)
      .map((row) => row.trim())
      .filter(Boolean)
      .map((row) => row.split("&").map((cell) => cell.trim()));

    if (!rows.length) return "";

    return `
      <table class="worksheet-math-table">
        <tbody>
          ${rows.map((row) => `
            <tr>${row.map((cell) => `<td>${worksheetContentHtml(cell)}</td>`).join("")}</tr>
          `).join("")}
        </tbody>
      </table>
    `;
  });
}

function worksheetContentHtml(value) {
  const source = worksheetLatexArrayHtml(value);
  const template = document.createElement("template");
  if (/<[a-z][\s\S]*>/i.test(source)) {
    template.innerHTML = source;
  } else {
    template.content.appendChild(document.createTextNode(source));
  }

  template.content.querySelectorAll("span.power").forEach((power) => {
    const sup = document.createElement("sup");
    sup.innerHTML = power.innerHTML;
    power.replaceWith(sup);
  });

  template.content.querySelectorAll("span.fraction, span.frac").forEach((fraction) => {
    const numerator = fraction.querySelector(".numerator, .num");
    const denominator = fraction.querySelector(".denominator, .den");
    if (!numerator || !denominator) return;

    const worksheetFraction = document.createElement("span");
    worksheetFraction.className = "worksheet-fraction";

    const worksheetNumerator = document.createElement("span");
    if (numerator.querySelector("sub, sup")) {
      worksheetNumerator.innerHTML = numerator.innerHTML;
    } else {
      worksheetNumerator.appendChild(worksheetMathFragment(numerator.textContent || numerator.innerHTML));
    }

    const worksheetDenominator = document.createElement("span");
    if (denominator.querySelector("sub, sup")) {
      worksheetDenominator.innerHTML = denominator.innerHTML;
    } else {
      worksheetDenominator.appendChild(worksheetMathFragment(denominator.textContent || denominator.innerHTML));
    }

    worksheetFraction.append(worksheetNumerator, worksheetDenominator);
    fraction.replaceWith(worksheetFraction);
  });

  const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (parent && ["SCRIPT", "STYLE", "TEXTAREA", "SELECT", "OPTION", "SUP", "SUB"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (parent?.closest?.("svg")) {
        return NodeFilter.FILTER_REJECT;
      }
      return textLooksWorksheetMathLike(node.nodeValue)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    }
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => node.replaceWith(worksheetMathFragment(node.nodeValue)));
  return template.innerHTML;
}

function worksheetStepHasExplicitLabel(step) {
  const text = String(step ?? "").replace(/<[^>]+>/g, " ");
  return /step\s*\d+/i.test(text) || /class=["'][^"']*step-indicator/.test(String(step ?? ""));
}

function worksheetStepIsMathLike(step) {
  const text = String(step ?? "");
  return /(\$\$|\\\(|\\\[|=|→|->|⇒|\\frac|dfrac|sqrt|∫|∑|[A-Za-z0-9)\]}]\s*@\s*(?:\{[^{}]+\}|\([^()]+\)|-?\d+)|[+\-*/×÷]\s*)/.test(text);
}

function worksheetStepsHtml(steps = []) {
  let stepNumber = 1;
  return steps.map((step) => {
    const content = worksheetContentHtml(step);
    if (worksheetStepHasExplicitLabel(step)) {
      return `<div class="worksheet-step-line explicit">${content}</div>`;
    }
    const className = worksheetStepIsMathLike(step) ? "worksheet-step-line math" : "worksheet-step-line";
    const html = `<div class="${className}"><span class="worksheet-step-index">Step ${stepNumber}</span><span class="worksheet-step-body">${content}</span></div>`;
    stepNumber += 1;
    return html;
  }).join("");
}

function worksheetMarksText(marks) {
  const value = Number(marks);
  if (!Number.isFinite(value) || value <= 0) return "";
  return `${value} mark${value === 1 ? "" : "s"}`;
}

function worksheetTotalMarks(worksheet) {
  return (worksheet?.problems || []).reduce((total, problem) => total + (Number(problem.marks) || 0), 0);
}

function worksheetQuestionMarksHtml(problem, options = {}) {
  if (!options.assessment) return "";
  const label = worksheetMarksText(problem.marks || options.marksPerQuestion);
  return label ? `<span class="worksheet-question-marks">[${label}]</span>` : "";
}

function renderWorksheetAnswerKey(worksheet, options = {}) {
  let answerNumber = 0;
  const renderAnswer = (problem) => {
    answerNumber += 1;
    return `
      <li class="worksheet-key-item">
        <span>${answerNumber}</span>
        <div>
          ${options.assessment ? `<div class="worksheet-key-marks">${worksheetMarksText(problem.marks || options.marksPerQuestion)}</div>` : ""}
          ${worksheetContentHtml(problem.answer || problem.answerText || "Answer not available")}
        </div>
      </li>
    `;
  };

  const totalMarks = worksheetTotalMarks(worksheet);
  return `
    <section class="worksheet-answer-key" aria-label="Answer key">
      <header class="worksheet-answer-key-header">
        <div>
          <span class="eyebrow">Teacher Copy</span>
          <h2>Answer Key</h2>
        </div>
        ${options.assessment ? `<strong class="worksheet-total-marks">Total: ${totalMarks} mark${totalMarks === 1 ? "" : "s"}</strong>` : ""}
      </header>
      ${worksheet.sections?.length ? worksheet.sections.map((section) => {
        const sectionProblems = worksheet.problems.filter((problem) => problem.sectionId === section.id);
        if (!sectionProblems.length) return "";
        return `
          <section class="worksheet-key-section">
            <h3>${escapeHtml(section.toolTitle)}</h3>
            <p>${escapeHtml(section.typeLabel)}</p>
            <ol class="worksheet-key-list">
              ${sectionProblems.map(renderAnswer).join("")}
            </ol>
          </section>
        `;
      }).join("") : `
        <ol class="worksheet-key-list">
          ${worksheet.problems.map(renderAnswer).join("")}
        </ol>
      `}
    </section>
  `;
}

function categorySlug(category) {
  return normalise(category).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function filteredTools(extraCategory) {
  return tools.filter((tool) => {
    if (!isVisibleTool(tool)) return false;
    const haystack = normalise([tool.title, tool.category, toolSubjectGroup(tool), tool.level, tool.type, tool.description, allToolTags(tool).join(" ")].join(" "));
    const matchesQuery = !state.query || haystack.includes(normalise(state.query));
    const matchesCategory = extraCategory ? categorySlug(tool.category) === extraCategory : true;
    return matchesQuery && matchesCategory;
  });
}

function setActiveNav() {
  const path = location.hash || "#/";
  const cleanPath = path.split("?")[0];
  const parts = cleanPath.replace(/^#\/?/, "").split("/");
  const toolRouteSlug = ["tools", "classroom"].includes(parts[0]) ? parts[1] || "" : "";
  const activeTool = toolRouteSlug ? tools.find((tool) => tool.slug === toolRouteSlug) : null;
  const activeCollectionHref = activeTool ? `#/collections/${categorySlug(activeTool.category)}` : "";
  document.querySelectorAll(".nav-list a, .sidebar-utility a").forEach((link) => {
    const href = link.getAttribute("href");
    const isCurrentRoute = href === cleanPath || (href !== "#/" && cleanPath.startsWith(href));
    const isToolParentCollection = Boolean(activeCollectionHref && href === activeCollectionHref);
    link.classList.toggle("active", isCurrentRoute || isToolParentCollection);
  });
}

function updateAdminNavVisibility() {
  document.querySelectorAll("[data-admin-link]").forEach((link) => {
    link.hidden = !isAdmin();
  });
}

function pageHeader(title, description, actions = "", className = "") {
  return `
    <section class="page-header${className ? ` ${className}` : ""}">
      <div>
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
      ${actions ? `<div class="button-row">${actions}</div>` : ""}
    </section>
  `;
}

function focusSearchInput(id) {
  const input = document.getElementById(id);
  if (!input) return;
  input.focus({ preventScroll: true });
  const end = input.value.length;
  input.setSelectionRange(end, end);
}

function restorePendingFocus() {
  if (!pendingFocusTarget) return false;
  const target = pendingFocusTarget;
  pendingFocusTarget = "";
  window.requestAnimationFrame(() => focusSearchInput(target));
  return true;
}

const universitySections = [
  {
    title: "Getting Started",
    intro: "For teachers opening Kaizen Maths for the first time.",
    videos: [
      { id: "what-kaizen-maths-is", title: "What Kaizen Maths Is", description: "A short introduction to Kaizen Maths as a virtual mathematics textbook for teachers." },
      { id: "finding-a-topic", title: "Finding A Topic", description: "How to use the dashboard, Tool Library, search, and subject collections." },
      { id: "using-a-topic-tool", title: "Using A Topic Tool", description: "How to choose levels, question types, generate new sets, show answers, and reveal worked steps." }
    ]
  },
  {
    title: "Classroom Workflow",
    intro: "How to use Kaizen Maths during live teaching, modelling, checking, and practice.",
    videos: [
      { id: "practice-set-mode", title: "Practice Set Mode", description: "How to project a compact set of questions and use it for retrieval, fluency, and checking misconceptions." },
      { id: "one-example-mode", title: "One Example Mode", description: "How to put one question on the board for teacher modelling and class discussion." },
      { id: "write-mode", title: "Writing On Classroom View", description: "How to use pen, highlighter, eraser, undo, and clear controls while modelling solutions live." },
      { id: "classroom-displays", title: "Classroom Displays", description: "How to use graph grids, shapes, solids, probability templates, statistics displays, and mechanics setups during live explanation." }
    ]
  },
  {
    title: "Worksheets And Assessment",
    intro: "How to turn topic generators into homework, quizzes, assessments, and intervention sheets.",
    videos: [
      { id: "building-a-worksheet", title: "Building A Worksheet", description: "How to choose topics, levels, and question types from across the site." },
      { id: "assessment-mode-and-marks", title: "Assessment Mode And Marks", description: "How to add marks and shape a worksheet into a quiz or test-style paper." },
      { id: "using-the-exam-paper-builder", title: "Using The Exam Paper Builder", description: "How to choose a GCSE-style format, generate a short set or 100-mark mock, add teacher copy when needed, and print the paper." },
      { id: "using-the-answer-key", title: "Using The Answer Key", description: "How the separate teacher copy can support marking, feedback, and review." }
    ]
  },
  {
    title: "School And Department Use",
    intro: "How a school or department can use Kaizen Maths consistently during a trial or school licence.",
    videos: [
      { id: "using-kaizen-in-a-department", title: "Using Kaizen In A Department", description: "How a department can use shared routines across lessons, homework, intervention, and revision." },
      { id: "supporting-less-confident-topics", title: "Supporting Less Confident Topics", description: "How worked examples, answers, and structured practice can support teacher confidence." },
      { id: "giving-useful-feedback", title: "Giving Useful Feedback", description: "What to test during a trial and how to report issues or suggestions clearly." }
    ]
  }
];

const homepageFeaturedVideo = {
  id: "homepage-featured-video",
  title: "How To Use Kaizen Maths",
  description: "A short walkthrough showing teachers how to choose topics, project questions, use Classroom View, and build teaching resources.",
  duration_label: "Start here"
};

const defaultHomepageHeroContent = {
  eyebrow: "Your Complete Mathematics Workspace",
  headline: "Create bespoke maths resources from a virtual textbook.",
  subheading: "Kaizen Maths gives teachers unlimited curriculum-aligned questions, worked examples, worksheets, assessments, and classroom tools for independent, national, and international curricula.",
  highlight_1: "Generate fresh practice from an infinite topic library",
  highlight_2: "Create differentiated tasks, individualised assessments, and bespoke worksheets",
  highlight_3: "Prepare teaching resources for different groups in minutes",
  gallery_label: "Inside Kaizen Maths",
  gallery_heading: "See the workspace in action"
};

const homepageContentStorageKey = "kaizen:homepage-content";
const homepageScreenshotsStorageKey = "kaizen:homepage-screenshots";
const bookingSettingsStorageKey = "kaizen:booking-settings";
const toolInfoOverrideStorageKey = "kaizen:tool-info-overrides";

const defaultBookingSettings = {
  provider: "calendly",
  booking_url: "",
  headline: "Book a Kaizen Maths demo",
  description: "Choose a short walkthrough for individual teacher access, tutor use, or a school licence. The session can focus on the tool library, Classroom View, worksheets, assessments, or department rollout.",
  primary_button_label: "Book Demo Session",
  contact_email: "info@kaizenmaths.com",
  show_embed: true
};

const defaultHomeInterfaceScreenshots = [
  {
    screenshot_id: "tool-library-algebra",
    title: "Organised Tool Library",
    description: "Browse mathematics tools by topic area with clear tags for curriculum level and access.",
    image_url: "assets/homepage-screenshots/tool-library-algebra.png",
    is_active: true,
    sort_order: 1
  },
  {
    screenshot_id: "classroom-linear-equations",
    title: "Classroom Practice View",
    description: "Project questions, reveal answers, show steps, use timers, and capture the board.",
    image_url: "assets/homepage-screenshots/classroom-linear-equations.png",
    is_active: true,
    sort_order: 2
  },
  {
    screenshot_id: "transformation-worked-example",
    title: "Worked Examples",
    description: "Use visual worked solutions to support explanation and classroom discussion.",
    image_url: "assets/homepage-screenshots/transformation-worked-example.png",
    is_active: true,
    sort_order: 3
  },
  {
    screenshot_id: "worksheet-builder-transformations",
    title: "Worksheet Builder",
    description: "Create printable worksheets and assessments from selected topic blocks.",
    image_url: "assets/homepage-screenshots/worksheet-builder-transformations.png",
    is_active: true,
    sort_order: 4
  }
];

const adminUniversitySections = [
  {
    title: "Homepage Feature",
    intro: "The video shown in the homepage hero area.",
    videos: [homepageFeaturedVideo]
  },
  ...universitySections
];

function allUniversityVideos() {
  return universitySections.flatMap((section) => section.videos.map((video) => ({ ...video, section: section.title })));
}

function youtubeIdFromUrl(url) {
  const value = String(url || "").trim();
  if (!value) return "";
  try {
    const parsed = new URL(value);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1).split("/")[0];
    if (parsed.searchParams.get("v")) return parsed.searchParams.get("v");
    const embedMatch = parsed.pathname.match(/\/embed\/([^/?#]+)/);
    if (embedMatch) return embedMatch[1];
    const shortsMatch = parsed.pathname.match(/\/shorts\/([^/?#]+)/);
    if (shortsMatch) return shortsMatch[1];
  } catch (error) {
    if (/^[a-zA-Z0-9_-]{8,}$/.test(value)) return value;
  }
  return "";
}

function bindAuthActions(root = document) {
  root.querySelectorAll("[data-auth-action='signin']").forEach((button) => {
    button.addEventListener("click", () => window.KaizenAuth?.signInWithGoogle?.());
  });
}

async function loadToolAccessSettings({ rerender = false } = {}) {
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (!client) return;
  try {
    const { data, error } = await client.from("tool_access").select("tool_slug, required_access");
    if (error) throw error;
    state.toolAccess = Object.fromEntries((data || []).map((row) => [row.tool_slug, row.required_access]));
    state.accessLoaded = true;
    if (rerender && toolCatalogDataShouldRerenderCurrentRoute()) renderRoute();
  } catch (error) {
    console.warn("Kaizen access settings unavailable:", error.message);
  }
}

async function saveToolAccess(slug, access) {
  const client = await window.KaizenAuth?.getClient?.();
  if (!client) throw new Error("Supabase is not available.");
  const { error } = await client
    .from("tool_access")
    .upsert({ tool_slug: slug, required_access: access }, { onConflict: "tool_slug" });
  if (error) throw error;
  state.toolAccess[slug] = access;
}

async function loadToolMetadata({ rerender = false } = {}) {
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (!client) return;
  try {
    const { data, error } = await client.from("tool_metadata").select("tool_slug, curriculum_tags, admin_notes");
    if (error) throw error;
    state.toolMetadata = Object.fromEntries((data || []).map((row) => [row.tool_slug, {
      curriculum_tags: row.curriculum_tags || "",
      admin_notes: row.admin_notes || ""
    }]));
    if (rerender && toolCatalogDataShouldRerenderCurrentRoute()) renderRoute();
  } catch (error) {
    console.warn("Kaizen tool metadata unavailable:", error.message);
  }
}

async function saveToolMetadata(slug, values) {
  const client = await window.KaizenAuth?.getClient?.();
  if (!client) throw new Error("Supabase is not available.");
  const next = {
    curriculum_tags: values.curriculum_tags.trim(),
    admin_notes: values.admin_notes.trim()
  };
  const { error } = await client
    .from("tool_metadata")
    .upsert({
      tool_slug: slug,
      ...next,
      updated_at: new Date().toISOString()
    }, { onConflict: "tool_slug" });
  if (error) throw error;
  state.toolMetadata[slug] = next;
}

async function loadUserProfiles({ rerender = false } = {}) {
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (!client || !isAdmin()) return;
  try {
    const { data, error } = await client
      .from("profiles")
      .select("id, email, full_name, role, school_id, trial_ends_at, subscription_status, plan_key, current_period_end, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    state.userProfiles = data || [];
    state.usersLoaded = true;
    if (rerender && routeParts()[0] === "admin") renderRoute();
  } catch (error) {
    console.warn("Kaizen user profiles unavailable:", error.message);
  }
}

async function saveUserProfileAccess(userId, values) {
  const client = await window.KaizenAuth?.getClient?.();
  if (!client) throw new Error("Supabase is not available.");
  const trialEnd = values.trial_ends_at
    ? new Date(`${values.trial_ends_at}T23:59:59.000Z`).toISOString()
    : null;
  const payload = {
    role: values.role,
    school_id: values.school_id || null,
    trial_ends_at: trialEnd,
    updated_at: new Date().toISOString()
  };
  const { error } = await client
    .from("profiles")
    .update(payload)
    .eq("id", userId);
  if (error) throw error;
  state.userProfiles = state.userProfiles.map((profile) => (
    profile.id === userId ? { ...profile, ...payload } : profile
  ));
}

async function loadSchools({ rerender = false } = {}) {
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (!client || !isAdmin()) return;
  try {
    const [{ data: schools, error: schoolsError }, { data: teacherAccess, error: teacherAccessError }] = await Promise.all([
      client
        .from("schools")
        .select("id, name, licence_type, allowed_domains, seat_limit, join_code, join_code_expires_at, is_active, notes, licence_starts_at, licence_ends_at, created_at, updated_at")
        .order("name", { ascending: true }),
      client
        .from("school_teacher_access")
        .select("id, school_id, email, created_at")
        .order("email", { ascending: true })
    ]);
    if (schoolsError) throw schoolsError;
    if (teacherAccessError) throw teacherAccessError;
    state.schools = schools || [];
    state.schoolTeacherAccess = teacherAccess || [];
    state.schoolsLoaded = true;
    if (rerender && routeParts()[0] === "admin") renderRoute();
  } catch (error) {
    console.warn("Kaizen school settings unavailable:", error.message);
  }
}

async function saveSchool(values) {
  const client = await window.KaizenAuth?.getClient?.();
  if (!client) throw new Error("Supabase is not available.");
  const payload = {
    name: values.name.trim(),
    licence_type: values.licence_type.trim() || "school",
    allowed_domains: normaliseDomainList(values.allowed_domains).join(", "),
    seat_limit: values.seat_limit ? Number(values.seat_limit) : null,
    join_code: values.join_code.trim().toUpperCase() || null,
    join_code_expires_at: dateInputToIso(values.join_code_expires_at, true),
    licence_starts_at: dateInputToIso(values.licence_starts_at),
    licence_ends_at: dateInputToIso(values.licence_ends_at, true),
    is_active: Boolean(values.is_active),
    notes: values.notes.trim(),
    updated_at: new Date().toISOString()
  };
  if (!payload.name) throw new Error("Every school needs a name.");
  if (payload.seat_limit !== null && payload.seat_limit < 1) payload.seat_limit = null;

  const request = values.id
    ? client.from("schools").update(payload).eq("id", values.id).select("id").single()
    : client.from("schools").insert(payload).select("id").single();
  const { data, error } = await request;
  if (error) throw error;
  return data.id;
}

async function saveSchoolTeacherAccess(schoolId, emails) {
  const client = await window.KaizenAuth?.getClient?.();
  if (!client) throw new Error("Supabase is not available.");
  const normalizedEmails = normaliseEmailList(emails);
  const { error: deleteError } = await client
    .from("school_teacher_access")
    .delete()
    .eq("school_id", schoolId);
  if (deleteError) throw deleteError;
  if (!normalizedEmails.length) return;
  const { error: insertError } = await client
    .from("school_teacher_access")
    .insert(normalizedEmails.map((email) => ({ school_id: schoolId, email })));
  if (insertError) throw insertError;
}

async function claimSchoolAccess(code) {
  const client = await window.KaizenAuth?.getClient?.();
  if (!client) throw new Error("Supabase is not available.");
  const { data, error } = await client.rpc("claim_school_access", { claim_code: code.trim() });
  if (error) throw error;
  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.ok) throw new Error(result?.message || "School access could not be added.");
  await window.KaizenAuth?.refreshProfile?.();
  return result;
}

async function loadUniversityVideos({ rerender = false } = {}) {
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (!client) return;
  try {
    const { data, error } = await client.from("university_videos").select("slot_id, youtube_url, title, description, duration_label");
    if (error) throw error;
    state.universityVideos = Object.fromEntries((data || []).map((row) => [row.slot_id, {
      youtube_url: row.youtube_url || "",
      title: row.title || "",
      description: row.description || "",
      duration_label: row.duration_label || ""
    }]));
    if (rerender && routeParts()[0] === "kaizen-university") renderRoute();
  } catch (error) {
    console.warn("Kaizen University video settings unavailable:", error.message);
  }
}

async function saveUniversityVideo(slotId, values) {
  const client = await window.KaizenAuth?.getClient?.();
  if (!client) throw new Error("Supabase is not available.");
  const next = {
    youtube_url: values.youtube_url.trim(),
    title: values.title.trim(),
    description: values.description.trim(),
    duration_label: values.duration_label.trim()
  };
  const payload = {
    slot_id: slotId,
    ...next,
    updated_at: new Date().toISOString()
  };
  const { error } = await client
    .from("university_videos")
    .upsert(payload, { onConflict: "slot_id" });
  if (error) throw error;
  state.universityVideos[slotId] = next;
}

function universityVideoOverrides(video) {
  const saved = state.universityVideos[video.id] || {};
  if (typeof saved === "string") {
    return {
      youtube_url: saved,
      title: video.title,
      description: video.description,
      duration_label: video.duration_label || "Video guide"
    };
  }
  return {
    youtube_url: saved.youtube_url || "",
    title: saved.title || video.title,
    description: saved.description || video.description,
    duration_label: saved.duration_label || video.duration_label || "Video guide"
  };
}

function readJsonStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage is a convenience fallback only; Supabase remains the live source when configured.
  }
}

function homepageHeroContent() {
  return {
    ...defaultHomepageHeroContent,
    ...readJsonStorage(homepageContentStorageKey, {}),
    ...state.homepageContent
  };
}

function normaliseHomepageScreenshot(row, index = 0) {
  const imageUrl = String(row.image_url || row.image || "").trim();
  return {
    screenshot_id: row.screenshot_id || `screenshot-${index + 1}`,
    title: String(row.title || "").trim(),
    description: String(row.description || "").trim(),
    image_url: imageUrl,
    is_active: row.is_active !== false,
    sort_order: Number.isFinite(Number(row.sort_order)) ? Number(row.sort_order) : index + 1
  };
}

function homepageScreenshotList({ includeInactive = false } = {}) {
  const localScreenshots = readJsonStorage(homepageScreenshotsStorageKey, []);
  const source = state.homepageScreenshots.length ? state.homepageScreenshots : localScreenshots.length ? localScreenshots : defaultHomeInterfaceScreenshots;
  const rows = source
    .map(normaliseHomepageScreenshot)
    .filter((item) => item.image_url && (includeInactive || item.is_active))
    .sort((a, b) => a.sort_order - b.sort_order);
  return rows.length ? rows : defaultHomeInterfaceScreenshots;
}

function homepageScreenshotAdminList() {
  const rows = homepageScreenshotList({ includeInactive: true });
  rows.push({
    screenshot_id: `screenshot-${Date.now()}`,
    title: "",
    description: "",
    image_url: "",
    is_active: false,
    sort_order: rows.length + 1
  });
  return rows;
}

function normaliseBookingSettings(values = {}) {
  return {
    provider: String(values.provider || defaultBookingSettings.provider).trim() || defaultBookingSettings.provider,
    booking_url: String(values.booking_url || "").trim(),
    headline: String(values.headline || defaultBookingSettings.headline).trim() || defaultBookingSettings.headline,
    description: String(values.description || defaultBookingSettings.description).trim() || defaultBookingSettings.description,
    primary_button_label: String(values.primary_button_label || defaultBookingSettings.primary_button_label).trim() || defaultBookingSettings.primary_button_label,
    contact_email: String(values.contact_email || defaultBookingSettings.contact_email).trim(),
    show_embed: values.show_embed !== false
  };
}

function safeExternalUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:") return "";
    return parsed.href;
  } catch {
    return "";
  }
}

function bookingSettings() {
  return normaliseBookingSettings({
    ...defaultBookingSettings,
    ...readJsonStorage(bookingSettingsStorageKey, {}),
    ...state.bookingSettings
  });
}

function bookingProviderName(provider) {
  const value = normalise(provider);
  if (value === "google") return "Google Calendar";
  if (value === "custom") return "Booking calendar";
  return "Calendly";
}

async function loadHomepageContent({ rerender = false } = {}) {
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (!client) return;
  try {
    const { data, error } = await client
      .from("homepage_content")
      .select("content_key, content_value")
      .eq("content_key", "hero")
      .maybeSingle();
    if (error) throw error;
    state.homepageContent = data?.content_value && typeof data.content_value === "object" ? data.content_value : {};
    state.homepageContentLoaded = true;
    if (rerender && (routeParts()[0] === "admin" || !routeParts()[0])) renderRoute();
  } catch (error) {
    state.homepageContentLoaded = false;
    console.warn("Kaizen homepage content unavailable:", error.message);
  }
}

async function saveHomepageContent(values) {
  const next = {
    eyebrow: values.eyebrow.trim(),
    headline: values.headline.trim(),
    subheading: values.subheading.trim(),
    highlight_1: values.highlight_1.trim(),
    highlight_2: values.highlight_2.trim(),
    highlight_3: values.highlight_3.trim(),
    gallery_label: values.gallery_label.trim(),
    gallery_heading: values.gallery_heading.trim()
  };
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (client) {
    try {
      const { error } = await client
        .from("homepage_content")
        .upsert({
          content_key: "hero",
          content_value: next,
          updated_at: new Date().toISOString()
        }, { onConflict: "content_key" });
      if (error) throw error;
      state.homepageContent = next;
      state.homepageContentLoaded = true;
      writeJsonStorage(homepageContentStorageKey, next);
      return "supabase";
    } catch (error) {
      console.warn("Saving homepage content to Supabase failed:", error.message);
    }
  }
  state.homepageContent = next;
  writeJsonStorage(homepageContentStorageKey, next);
  return "local";
}

async function loadHomepageScreenshots({ rerender = false } = {}) {
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (!client) return;
  try {
    const { data, error } = await client
      .from("homepage_screenshots")
      .select("screenshot_id, title, description, image_url, is_active, sort_order")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    state.homepageScreenshots = (data || []).map(normaliseHomepageScreenshot);
    state.homepageScreenshotsLoaded = true;
    if (rerender && (routeParts()[0] === "admin" || !routeParts()[0])) renderRoute();
  } catch (error) {
    state.homepageScreenshotsLoaded = false;
    console.warn("Kaizen homepage screenshots unavailable:", error.message);
  }
}

async function saveHomepageScreenshots(rows) {
  const next = rows
    .map(normaliseHomepageScreenshot)
    .filter((row) => row.title || row.description || row.image_url)
    .map((row, index) => ({ ...row, sort_order: Number.isFinite(Number(row.sort_order)) ? Number(row.sort_order) : index + 1 }));
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (client) {
    try {
      for (const row of next) {
        const { error } = await client
          .from("homepage_screenshots")
          .upsert({
            ...row,
            updated_at: new Date().toISOString()
          }, { onConflict: "screenshot_id" });
        if (error) throw error;
      }
      state.homepageScreenshots = next;
      state.homepageScreenshotsLoaded = true;
      writeJsonStorage(homepageScreenshotsStorageKey, next);
      return "supabase";
    } catch (error) {
      console.warn("Saving homepage screenshots to Supabase failed:", error.message);
    }
  }
  state.homepageScreenshots = next;
  writeJsonStorage(homepageScreenshotsStorageKey, next);
  return "local";
}

async function loadBookingSettings({ rerender = false } = {}) {
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (!client) return;
  try {
    const { data, error } = await client
      .from("homepage_content")
      .select("content_key, content_value")
      .eq("content_key", "booking")
      .maybeSingle();
    if (error) throw error;
    state.bookingSettings = normaliseBookingSettings(data?.content_value || {});
    state.bookingSettingsLoaded = true;
    if (rerender && ["admin", "book-demo", "schools", "upgrade", ""].includes(routeParts()[0] || "")) renderRoute();
  } catch (error) {
    state.bookingSettingsLoaded = false;
    console.warn("Kaizen booking settings unavailable:", error.message);
  }
}

async function saveBookingSettings(values) {
  const next = normaliseBookingSettings(values);
  if (next.booking_url && !safeExternalUrl(next.booking_url)) {
    throw new Error("Use a full secure booking URL starting with https://.");
  }
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (client) {
    try {
      const { error } = await client
        .from("homepage_content")
        .upsert({
          content_key: "booking",
          content_value: next,
          updated_at: new Date().toISOString()
        }, { onConflict: "content_key" });
      if (error) throw error;
      state.bookingSettings = next;
      state.bookingSettingsLoaded = true;
      writeJsonStorage(bookingSettingsStorageKey, next);
      return "supabase";
    } catch (error) {
      console.warn("Saving booking settings to Supabase failed:", error.message);
    }
  }
  state.bookingSettings = next;
  writeJsonStorage(bookingSettingsStorageKey, next);
  return "local";
}

function toolInfoOverridesFromStorage() {
  return readJsonStorage(toolInfoOverrideStorageKey, {});
}

function toolInfoOverride(tool) {
  const local = toolInfoOverridesFromStorage();
  return state.toolInfoOverrides[tool.slug] || local[tool.slug] || {};
}

function splitEditableLines(value) {
  return String(value || "")
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function listOverride(tool, key, defaults) {
  const override = toolInfoOverride(tool);
  const values = Array.isArray(override[key])
    ? override[key].map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  return values.length ? values : defaults;
}

function toolInfoDefaultContent(tool) {
  const notes = tool.teacherNotes?.length ? tool.teacherNotes : toolUseSuggestions(tool);
  const concepts = toolTopicConcepts(tool);
  const topics = concepts.length ? concepts.slice(0, 12) : [formatTopicLabel(tool.title)];
  return {
    topics,
    teacher_guidance: notes,
    standards: standardsForTool(tool),
    misconceptions: toolMisconceptions(tool),
    classroom_questions: toolClassroomQuestions(tool),
    related_tools: relatedTools(tool).map((item) => `${item.title} — ${toolSubjectGroup(item) || item.category}`),
    suggested_use: toolUseSuggestions(tool)
  };
}

function toolInfoContent(tool) {
  const defaults = toolInfoDefaultContent(tool);
  return Object.fromEntries(Object.entries(defaults).map(([key, values]) => [key, listOverride(tool, key, values)]));
}

async function loadToolInfoOverrides({ rerender = false } = {}) {
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (!client) return;
  try {
    const { data, error } = await client
      .from("tool_info_overrides")
      .select("tool_slug, content");
    if (error) throw error;
    state.toolInfoOverrides = Object.fromEntries((data || []).map((row) => [row.tool_slug, row.content || {}]));
    state.toolInfoOverridesLoaded = true;
    if (rerender && routeParts()[0] === "tools" && routeParts()[1]) renderRoute();
  } catch (error) {
    state.toolInfoOverridesLoaded = false;
    console.warn("Kaizen tool information overrides unavailable:", error.message);
  }
}

async function saveToolInfoOverride(slug, content) {
  const next = {
    topics: content.topics || [],
    teacher_guidance: content.teacher_guidance || [],
    standards: content.standards || [],
    misconceptions: content.misconceptions || [],
    classroom_questions: content.classroom_questions || [],
    related_tools: content.related_tools || [],
    suggested_use: content.suggested_use || []
  };
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (client) {
    try {
      const { error } = await client
        .from("tool_info_overrides")
        .upsert({
          tool_slug: slug,
          content: next,
          updated_at: new Date().toISOString()
        }, { onConflict: "tool_slug" });
      if (error) throw error;
      state.toolInfoOverrides[slug] = next;
      writeJsonStorage(toolInfoOverrideStorageKey, {
        ...toolInfoOverridesFromStorage(),
        [slug]: next
      });
      state.toolInfoOverridesLoaded = true;
      return "supabase";
    } catch (error) {
      console.warn("Saving tool information to Supabase failed:", error.message);
    }
  }
  state.toolInfoOverrides[slug] = next;
  writeJsonStorage(toolInfoOverrideStorageKey, {
    ...toolInfoOverridesFromStorage(),
    [slug]: next
  });
  return "local";
}

function normaliseTestimonial(row, index = 0) {
  return {
    slot_id: row.slot_id || `testimonial-${index + 1}`,
    quote: String(row.quote || "").trim(),
    person_name: String(row.person_name || "").trim(),
    role_label: String(row.role_label || "").trim(),
    organisation: String(row.organisation || "").trim(),
    is_active: row.is_active !== false,
    sort_order: Number.isFinite(Number(row.sort_order)) ? Number(row.sort_order) : index + 1
  };
}

function testimonialDisplayList() {
  const source = state.siteTestimonials.length ? state.siteTestimonials : defaultTestimonials;
  const visible = source
    .map(normaliseTestimonial)
    .filter((item) => item.is_active && item.quote)
    .sort((a, b) => a.sort_order - b.sort_order);
  return visible.length ? visible : defaultTestimonials;
}

function testimonialAdminList() {
  const loaded = state.siteTestimonials.length ? state.siteTestimonials : defaultTestimonials;
  const rows = loaded.map(normaliseTestimonial).sort((a, b) => a.sort_order - b.sort_order);
  rows.push({
    slot_id: `testimonial-${Date.now()}`,
    quote: "",
    person_name: "",
    role_label: "",
    organisation: "",
    is_active: false,
    sort_order: rows.length + 1
  });
  return rows;
}

async function loadSiteTestimonials({ rerender = false } = {}) {
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (!client) return;
  try {
    const { data, error } = await client
      .from("site_testimonials")
      .select("slot_id, quote, person_name, role_label, organisation, is_active, sort_order")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    state.siteTestimonials = (data || []).map(normaliseTestimonial);
    state.testimonialsLoaded = true;
    if (rerender && (routeParts()[0] === "admin" || !routeParts()[0])) renderRoute();
  } catch (error) {
    state.testimonialsLoaded = false;
    console.warn("Kaizen testimonials unavailable:", error.message);
  }
}

async function saveSiteTestimonial(values) {
  const client = await window.KaizenAuth?.getClient?.();
  if (!client) throw new Error("Supabase is not available.");
  const next = normaliseTestimonial(values);
  const payload = {
    ...next,
    updated_at: new Date().toISOString()
  };
  const { error } = await client
    .from("site_testimonials")
    .upsert(payload, { onConflict: "slot_id" });
  if (error) throw error;
  state.siteTestimonials = [
    ...state.siteTestimonials.filter((item) => item.slot_id !== next.slot_id),
    next
  ].sort((a, b) => a.sort_order - b.sort_order);
  state.testimonialsLoaded = true;
}

function tutorToolOptions(selectedSlug = "") {
  const options = tools
    .filter((tool) => tool.imported && tool.type === "Practice Generator")
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((tool) => `<option value="${escapeHtml(tool.slug)}"${tool.slug === selectedSlug ? " selected" : ""}>${escapeHtml(tool.title)}</option>`);
  return `<option value="">No specific tool</option>${options.join("")}`;
}

function tutorLearnerById(id) {
  return state.tutorLearners.find((learner) => learner.id === id) || null;
}

function tutorSessionsForLearner(learnerId) {
  return state.tutorSessions.filter((session) => session.learner_id === learnerId);
}

function tutorTopicsForLearner(learnerId) {
  return state.tutorTopics.filter((topic) => topic.learner_id === learnerId);
}

function tutorHomeworkForLearner(learnerId) {
  return state.tutorHomework.filter((item) => item.learner_id === learnerId);
}

function tutorAssessmentsForLearner(learnerId) {
  return state.tutorAssessments.filter((item) => item.learner_id === learnerId);
}

function tutorSelectedLearner() {
  return tutorLearnerById(state.tutorSelectedLearnerId) || state.tutorLearners[0] || null;
}

function tutorLearnerOptions(selectedId = "") {
  const selected = selectedId || tutorSelectedLearner()?.id || "";
  return state.tutorLearners
    .map((learner) => `<option value="${escapeHtml(learner.id)}"${learner.id === selected ? " selected" : ""}>${escapeHtml(learner.alias)}</option>`)
    .join("");
}

function tutorLatestSession(learnerId) {
  return tutorSessionsForLearner(learnerId)
    .slice()
    .sort((a, b) => String(b.session_date || "").localeCompare(String(a.session_date || "")))[0] || null;
}

function tutorTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function tutorConfidenceLabel(value) {
  const labels = {
    introduced: "Introduced",
    practising: "Practising",
    secure: "Secure",
    "needs-revisit": "Needs revisit"
  };
  return labels[normalise(value)] || "Not set";
}

function tutorTopicStatusLabel(value) {
  const labels = {
    secure: "Secure",
    developing: "Developing",
    "needs-revisit": "Needs revisit"
  };
  return labels[normalise(value)] || "Developing";
}

function tutorHomeworkStatusLabel(value) {
  const labels = {
    set: "Set",
    completed: "Completed",
    missed: "Missed",
    reviewed: "Reviewed"
  };
  return labels[normalise(value)] || "Set";
}

function tutorDueHomework() {
  const today = tutorTodayDate();
  return state.tutorHomework.filter((item) => {
    const status = normalise(item.status || "set");
    return item.due_date && item.due_date <= today && !["completed", "reviewed"].includes(status);
  });
}

function tutorLatestAssessment(learnerId) {
  return tutorAssessmentsForLearner(learnerId)
    .slice()
    .sort((a, b) => String(b.assessment_date || "").localeCompare(String(a.assessment_date || "")))[0] || null;
}

function tutorLearnerProgressStats(learnerId) {
  const topics = tutorTopicsForLearner(learnerId);
  return {
    secure: topics.filter((topic) => normalise(topic.status) === "secure").length,
    developing: topics.filter((topic) => normalise(topic.status || "developing") === "developing").length,
    needsRevisit: topics.filter((topic) => normalise(topic.status) === "needs-revisit").length
  };
}

function tutorSuggestedToolForLearner(learnerId) {
  const topicTool = tutorTopicsForLearner(learnerId).find((topic) => topic.tool_slug)?.tool_slug;
  const sessionTool = tutorSessionsForLearner(learnerId).find((session) => session.tool_slug)?.tool_slug;
  const favouriteTool = String(tutorLearnerById(learnerId)?.favourite_tools || "").split(",").map((item) => item.trim()).filter(Boolean)[0];
  const slug = topicTool || sessionTool || favouriteTool || "";
  return tools.find((tool) => tool.slug === slug) || null;
}

function tutorWeakTopicNames(learnerId, limit = 3) {
  return tutorTopicsForLearner(learnerId)
    .filter((topic) => normalise(topic.status) === "needs-revisit" || normalise(topic.status) === "developing")
    .sort((a, b) => {
      const statusScore = (value) => normalise(value) === "needs-revisit" ? 0 : 1;
      return statusScore(a.status) - statusScore(b.status) || String(a.last_practised_at || "").localeCompare(String(b.last_practised_at || ""));
    })
    .slice(0, limit)
    .map((topic) => topic.topic)
    .filter(Boolean);
}

function tutorNextSessionPlan(learnerId) {
  const learner = tutorLearnerById(learnerId);
  if (!learner) return "Choose a learner to generate a suggested next-session plan.";
  const latest = tutorLatestSession(learnerId);
  const weakTopics = tutorWeakTopicNames(learnerId);
  const outstandingHomework = tutorHomeworkForLearner(learnerId).find((item) => !["completed", "reviewed"].includes(normalise(item.status || "set")));
  const suggestedTool = tutorSuggestedToolForLearner(learnerId);
  const focus = weakTopics[0] || latest?.next_steps || learner.key_weaknesses || learner.focus_notes || "the next priority topic";

  return [
    `Suggested next session for ${learner.alias}`,
    `1. Start with retrieval practice on ${weakTopics.length ? weakTopics.join(", ") : focus}.`,
    `2. Review ${outstandingHomework ? `homework: ${outstandingHomework.task}` : "the previous session notes and any questions from independent practice"}.`,
    `3. Main focus: ${focus}.`,
    `4. Use Kaizen Maths ${suggestedTool ? `${suggestedTool.title}` : "topic questions"} for guided practice, then move to independent questions.`,
    `5. Finish by recording confidence and setting one clear homework task.`
  ].join("\n");
}

function tutorParentUpdateText(learnerId) {
  const learner = tutorLearnerById(learnerId);
  if (!learner) return "Choose a learner to create a parent update.";
  const latest = tutorLatestSession(learnerId);
  const weakTopics = tutorWeakTopicNames(learnerId, 2);
  const homework = tutorHomeworkForLearner(learnerId).find((item) => normalise(item.status || "set") === "set");
  const assessment = tutorLatestAssessment(learnerId);
  const assessmentText = assessment && Number.isFinite(Number(assessment.score)) && Number.isFinite(Number(assessment.max_score))
    ? ` Recent assessment: ${assessment.score}/${assessment.max_score}.`
    : "";
  return [
    `Today we worked on ${latest?.topic || weakTopics[0] || learner.focus_notes || "the agreed maths focus"}.`,
    `Confidence is currently ${latest ? tutorConfidenceLabel(latest.confidence).toLowerCase() : "being developed"}.${assessmentText}`,
    weakTopics.length ? `The next priority is to revisit ${weakTopics.join(" and ")}.` : `Next session we will build on today's work.`,
    homework ? `Homework: ${homework.task}${homework.due_date ? `, due ${formatDisplayDate(homework.due_date)}` : ""}.` : "No homework has been set yet."
  ].join(" ");
}

async function loadTutorWorkspace({ rerender = false } = {}) {
  if (!isSignedIn() || !hasTutorWorkspaceAccess()) return;
  if (state.tutorLoading) return;
  state.tutorLoading = true;
  state.tutorError = "";
  try {
    const client = await window.KaizenAuth?.getClient?.().catch(() => null);
    if (!client) throw new Error("Supabase is not available.");
    const [learnersResult, sessionsResult, topicsResult, homeworkResult, assessmentsResult] = await Promise.all([
      client
        .from("tutor_learners")
        .select("id, alias, level, exam_board, year_group, target_grade, key_weaknesses, learner_goals, favourite_tools, focus_notes, status, created_at, updated_at")
        .order("created_at", { ascending: false }),
      client
        .from("tutor_sessions")
        .select("id, learner_id, session_date, topic, tool_slug, confidence, session_notes, next_steps, homework, created_at, updated_at")
        .order("session_date", { ascending: false })
        .order("created_at", { ascending: false }),
      client
        .from("tutor_topic_progress")
        .select("id, learner_id, topic, status, last_practised_at, tool_slug, notes, created_at, updated_at")
        .order("updated_at", { ascending: false }),
      client
        .from("tutor_homework")
        .select("id, learner_id, task, due_date, status, topic, notes, created_at, updated_at")
        .order("due_date", { ascending: true })
        .order("created_at", { ascending: false }),
      client
        .from("tutor_assessments")
        .select("id, learner_id, assessment_date, title, topic, score, max_score, notes, created_at, updated_at")
        .order("assessment_date", { ascending: false })
        .order("created_at", { ascending: false })
    ]);
    if (learnersResult.error) throw learnersResult.error;
    if (sessionsResult.error) throw sessionsResult.error;
    if (topicsResult.error) throw topicsResult.error;
    if (homeworkResult.error) throw homeworkResult.error;
    if (assessmentsResult.error) throw assessmentsResult.error;
    state.tutorLearners = learnersResult.data || [];
    state.tutorSessions = sessionsResult.data || [];
    state.tutorTopics = topicsResult.data || [];
    state.tutorHomework = homeworkResult.data || [];
    state.tutorAssessments = assessmentsResult.data || [];
    if (!state.tutorSelectedLearnerId || !tutorLearnerById(state.tutorSelectedLearnerId)) {
      state.tutorSelectedLearnerId = state.tutorLearners[0]?.id || "";
    }
    state.tutorLoaded = true;
  } catch (error) {
    state.tutorError = error.message || "Tutor workspace could not load.";
    state.tutorLoaded = true;
  } finally {
    state.tutorLoading = false;
    if (rerender && routeParts()[0] === "tutor-workspace") renderRoute();
  }
}

function resetTutorWorkspaceState() {
  state.tutorLearners = [];
  state.tutorSessions = [];
  state.tutorTopics = [];
  state.tutorHomework = [];
  state.tutorAssessments = [];
  state.tutorLoaded = false;
  state.tutorLoading = false;
  state.tutorError = "";
  state.tutorSelectedLearnerId = "";
}

async function saveTutorLearner(values) {
  const client = await window.KaizenAuth?.getClient?.();
  const userId = authState().session?.user?.id;
  if (!client || !userId) throw new Error("Sign in is required.");
  if (!hasTutorWorkspaceAccess()) throw new Error("Tutor Workspace is available for Pro, School, and Admin accounts.");

  const alias = String(values.alias || "").trim();
  if (!alias) throw new Error("Add a learner alias or initials.");

  const payload = {
    tutor_id: userId,
    alias,
    level: String(values.level || "").trim(),
    exam_board: String(values.exam_board || "").trim(),
    year_group: String(values.year_group || "").trim(),
    target_grade: String(values.target_grade || "").trim(),
    key_weaknesses: String(values.key_weaknesses || "").trim(),
    learner_goals: String(values.learner_goals || "").trim(),
    favourite_tools: String(values.favourite_tools || "").trim(),
    focus_notes: String(values.focus_notes || "").trim(),
    status: String(values.status || "active").trim() || "active",
    updated_at: new Date().toISOString()
  };

  const request = values.id
    ? client.from("tutor_learners").update(payload).eq("id", values.id).eq("tutor_id", userId).select("id").single()
    : client.from("tutor_learners").insert(payload).select("id").single();
  const { error } = await request;
  if (error) throw error;
  await loadTutorWorkspace({ rerender: true });
}

async function saveTutorSession(values) {
  const client = await window.KaizenAuth?.getClient?.();
  const userId = authState().session?.user?.id;
  if (!client || !userId) throw new Error("Sign in is required.");
  if (!hasTutorWorkspaceAccess()) throw new Error("Tutor Workspace is available for Pro, School, and Admin accounts.");

  const learnerId = String(values.learner_id || "").trim();
  if (!learnerId || !tutorLearnerById(learnerId)) throw new Error("Choose a learner before saving the session.");

  const payload = {
    tutor_id: userId,
    learner_id: learnerId,
    session_date: String(values.session_date || tutorTodayDate()).trim(),
    topic: String(values.topic || "").trim(),
    tool_slug: String(values.tool_slug || "").trim() || null,
    confidence: String(values.confidence || "").trim(),
    session_notes: String(values.session_notes || "").trim(),
    next_steps: String(values.next_steps || "").trim(),
    homework: String(values.homework || "").trim(),
    updated_at: new Date().toISOString()
  };
  if (!payload.topic && !payload.tool_slug) throw new Error("Add a topic or choose a Kaizen tool.");

  const { error } = await client.from("tutor_sessions").insert(payload);
  if (error) throw error;
  await loadTutorWorkspace({ rerender: true });
}

async function saveTutorTopic(values) {
  const client = await window.KaizenAuth?.getClient?.();
  const userId = authState().session?.user?.id;
  if (!client || !userId) throw new Error("Sign in is required.");
  if (!hasTutorWorkspaceAccess()) throw new Error("Tutor Workflow is available for Pro, School, and Admin accounts.");
  const learnerId = String(values.learner_id || "").trim();
  if (!learnerId || !tutorLearnerById(learnerId)) throw new Error("Choose a learner first.");
  const topic = String(values.topic || "").trim();
  if (!topic) throw new Error("Add a topic to track.");

  const payload = {
    tutor_id: userId,
    learner_id: learnerId,
    topic,
    status: String(values.status || "developing").trim() || "developing",
    last_practised_at: String(values.last_practised_at || tutorTodayDate()).trim(),
    tool_slug: String(values.tool_slug || "").trim() || null,
    notes: String(values.notes || "").trim(),
    updated_at: new Date().toISOString()
  };
  const { error } = await client.from("tutor_topic_progress").insert(payload);
  if (error) throw error;
  state.tutorSelectedLearnerId = learnerId;
  await loadTutorWorkspace({ rerender: true });
}

async function saveTutorHomework(values) {
  const client = await window.KaizenAuth?.getClient?.();
  const userId = authState().session?.user?.id;
  if (!client || !userId) throw new Error("Sign in is required.");
  if (!hasTutorWorkspaceAccess()) throw new Error("Tutor Workflow is available for Pro, School, and Admin accounts.");
  const learnerId = String(values.learner_id || "").trim();
  if (!learnerId || !tutorLearnerById(learnerId)) throw new Error("Choose a learner first.");
  const task = String(values.task || "").trim();
  if (!task) throw new Error("Add the homework task.");

  const payload = {
    tutor_id: userId,
    learner_id: learnerId,
    task,
    due_date: String(values.due_date || "").trim() || null,
    status: String(values.status || "set").trim() || "set",
    topic: String(values.topic || "").trim(),
    notes: String(values.notes || "").trim(),
    updated_at: new Date().toISOString()
  };
  const { error } = await client.from("tutor_homework").insert(payload);
  if (error) throw error;
  state.tutorSelectedLearnerId = learnerId;
  await loadTutorWorkspace({ rerender: true });
}

async function saveTutorAssessment(values) {
  const client = await window.KaizenAuth?.getClient?.();
  const userId = authState().session?.user?.id;
  if (!client || !userId) throw new Error("Sign in is required.");
  if (!hasTutorWorkspaceAccess()) throw new Error("Tutor Workflow is available for Pro, School, and Admin accounts.");
  const learnerId = String(values.learner_id || "").trim();
  if (!learnerId || !tutorLearnerById(learnerId)) throw new Error("Choose a learner first.");
  const title = String(values.title || "").trim();
  const topic = String(values.topic || "").trim();
  if (!title && !topic) throw new Error("Add an assessment title or topic.");

  const payload = {
    tutor_id: userId,
    learner_id: learnerId,
    assessment_date: String(values.assessment_date || tutorTodayDate()).trim(),
    title,
    topic,
    score: values.score === "" ? null : Number(values.score),
    max_score: values.max_score === "" ? null : Number(values.max_score),
    notes: String(values.notes || "").trim(),
    updated_at: new Date().toISOString()
  };
  const { error } = await client.from("tutor_assessments").insert(payload);
  if (error) throw error;
  state.tutorSelectedLearnerId = learnerId;
  await loadTutorWorkspace({ rerender: true });
}

async function deleteTutorLearner(id) {
  const client = await window.KaizenAuth?.getClient?.();
  const userId = authState().session?.user?.id;
  if (!client || !userId) throw new Error("Sign in is required.");
  const { error } = await client
    .from("tutor_learners")
    .delete()
    .eq("id", id)
    .eq("tutor_id", userId);
  if (error) throw error;
  await loadTutorWorkspace({ rerender: true });
}

async function deleteTutorSession(id) {
  const client = await window.KaizenAuth?.getClient?.();
  const userId = authState().session?.user?.id;
  if (!client || !userId) throw new Error("Sign in is required.");
  const { error } = await client
    .from("tutor_sessions")
    .delete()
    .eq("id", id)
    .eq("tutor_id", userId);
  if (error) throw error;
  await loadTutorWorkspace({ rerender: true });
}

async function deleteTutorWorkflowRecord(table, id) {
  const client = await window.KaizenAuth?.getClient?.();
  const userId = authState().session?.user?.id;
  const allowedTables = new Set(["tutor_topic_progress", "tutor_homework", "tutor_assessments"]);
  if (!client || !userId) throw new Error("Sign in is required.");
  if (!allowedTables.has(table)) throw new Error("This record type cannot be deleted here.");
  const { error } = await client
    .from(table)
    .delete()
    .eq("id", id)
    .eq("tutor_id", userId);
  if (error) throw error;
  await loadTutorWorkspace({ rerender: true });
}

function statusLabel(tool) {
  if (tool.imported) return "Ready";
  if (tool.status === "Legacy") return "Queued";
  return tool.status || "Ready";
}

function metricGrid() {
  const visibleTools = tools.filter(isVisibleTool);
  const categories = new Set(visibleTools.map((tool) => tool.category));
  const topicGenerators = visibleTools.filter((tool) => tool.type === "Practice Generator").length;
  const worksheetReady = worksheetEligibleTools().length;
  return `
    <section class="metric-grid" aria-label="Site metrics">
      <div class="metric"><span>Topic tools</span><strong>${topicGenerators}</strong></div>
      <div class="metric"><span>Subject collections</span><strong>${categories.size}</strong></div>
      <div class="metric"><span>Worksheet-ready topics</span><strong>${worksheetReady}</strong></div>
      <div class="metric"><span>Question supply</span><strong>∞</strong></div>
    </section>
  `;
}

const gcseExamStyles = [
  { id: "general", label: "GCSE exam-style", note: "Balanced GCSE-style layout with marks and structured working." },
  { id: "aqa", label: "AQA-style", note: "Concise prompts with clear command words and mark allocation." },
  { id: "edexcel", label: "Edexcel-style", note: "Structured multi-part questions with clear progression." },
  { id: "ocr", label: "OCR-style", note: "Context-led questions with method and interpretation marks." }
];

const gcseExamTopics = [
  { id: "any", label: "Any topic" },
  { id: "number", label: "Number" },
  { id: "algebra", label: "Algebra" },
  { id: "ratio", label: "Ratio and proportion" },
  { id: "geometry", label: "Geometry and measures" },
  { id: "statistics", label: "Probability and statistics" }
];

const gcseGradeBands = [
  { id: "any", label: "Any grade band" },
  { id: "foundation", label: "Foundation grades 1-3" },
  { id: "crossover", label: "Crossover grades 4-5" },
  { id: "higher", label: "Higher grades 6-7" },
  { id: "stretch", label: "Higher grades 8-9" }
];

const gcsePaperModes = [
  {
    id: "one",
    label: "One question",
    count: 1,
    title: "GCSE Modelling Question",
    time: "5-8 minutes",
    description: "Use one focused question for modelling, discussion, or a quick check for understanding."
  },
  {
    id: "class",
    label: "Short class set",
    count: 4,
    title: "GCSE Class Practice Set",
    time: "15-20 minutes",
    description: "A compact set for board practice, pair work, or a short independent task."
  },
  {
    id: "revision",
    label: "Revision/homework set",
    count: 10,
    title: "GCSE Revision Practice Paper",
    time: "35-45 minutes",
    description: "A longer set for homework, revision, intervention, or a lesson-end assessment."
  },
  {
    id: "custom",
    label: "Custom paper",
    count: null,
    title: "GCSE Custom Practice Paper",
    time: "Teacher selected",
    description: "Choose the number of questions and use the filters to shape the paper."
  },
  {
    id: "mock",
    label: "One-click 100-mark mock paper",
    count: null,
    targetMarks: 100,
    targetQuestions: 28,
    title: "GCSE Mock Practice Paper",
    time: "1 hour 30 minutes",
    description: "Create a full 100-mark GCSE-style paper with short fluency questions and multi-step problem solving."
  }
];

function gcsePaperModeById(modeId) {
  return gcsePaperModes.find((mode) => mode.id === modeId) || gcsePaperModes[1];
}

function gcseOptionList(options, selected = "") {
  return options.map((option) => `<option value="${escapeHtml(option.id)}" ${option.id === selected ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("");
}

function gcseChoice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function gcseRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcseGcd(a, b) {
  return b === 0 ? Math.abs(a) : gcseGcd(b, a % b);
}

function gcseGcdMany(values) {
  const usable = values.map((value) => Math.abs(Number(value))).filter((value) => Number.isFinite(value) && value > 0);
  if (!usable.length) return 1;
  return usable.reduce((highestCommonFactor, value) => gcseGcd(highestCommonFactor, value));
}

function gcseAreCoprime(values) {
  return gcseGcdMany(values) === 1;
}

function gcseMoney(value) {
  const amount = Number(value);
  return `£${amount.toLocaleString("en-GB", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2
  })}`;
}

function gcseFormatDecimal(value, maximumFractionDigits = 2) {
  return Number(Number(value).toFixed(maximumFractionDigits)).toString();
}

function gcseLinearExpression(coefficient, constant, variable = "x") {
  const first = coefficient === 1 ? variable : coefficient === -1 ? `-${variable}` : `${coefficient}${variable}`;
  if (!constant) return first;
  return `${first} ${constant > 0 ? "+" : "-"} ${Math.abs(constant)}`;
}

function gcseSignedVariableTerm(coefficient, variable = "x") {
  const absoluteCoefficient = Math.abs(coefficient);
  if (absoluteCoefficient === 1) return variable;
  return `${absoluteCoefficient}${variable}`;
}

function gcseFormatQuadraticExpression(linearCoefficient, constant) {
  let expression = "x²";
  if (linearCoefficient) {
    expression += ` ${linearCoefficient > 0 ? "+" : "-"} ${gcseSignedVariableTerm(linearCoefficient)}`;
  }
  if (constant) {
    expression += ` ${constant > 0 ? "+" : "-"} ${Math.abs(constant)}`;
  }
  return expression;
}

function gcseFormatTwoVariableExpression(xCoefficient, yCoefficient) {
  const first = gcseLinearExpression(xCoefficient, 0, "x");
  const second = gcseSignedVariableTerm(yCoefficient, "y");
  return `${first} ${yCoefficient >= 0 ? "+" : "-"} ${second}`;
}

function gcseSvgLabel(label) {
  return escapeHtml(String(label));
}

function gcseTreeProbabilityLabel(numerator, denominator, format = "fraction") {
  if (format === "decimal") {
    return (numerator / denominator).toFixed(2);
  }
  return `${numerator}/${denominator}`;
}

function gcseSvgBackedText(x, y, label, width = 86) {
  return `
      <text class="probability-label" x="${x}" y="${y}">${gcseSvgLabel(label)}</text>
  `;
}

function gcseDiagramFrame(title, svg) {
  return `
    <div class="gcse-diagram">
      <span>${escapeHtml(title)}</span>
      ${svg}
    </div>
  `;
}

function gcseRightTriangleDiagram({ baseLabel, heightLabel, hypLabel }) {
  return gcseDiagramFrame("Diagram not drawn accurately", `
    <svg viewBox="0 0 300 190" role="img" aria-label="Right-angled triangle diagram">
      <polygon points="54,142 246,142 246,42" fill="#ffffff" stroke="#111111" stroke-width="3" />
      <path d="M226 142 L226 122 L246 122" fill="none" stroke="#111111" stroke-width="2.4" />
      <text x="138" y="166">${gcseSvgLabel(baseLabel)}</text>
      <text x="254" y="94">${gcseSvgLabel(heightLabel)}</text>
      <text x="130" y="78" transform="rotate(-28 130 78)">${gcseSvgLabel(hypLabel)}</text>
    </svg>
  `);
}

function gcseCircleDiagram(radiusLabel) {
  return gcseDiagramFrame("Circle diagram", `
    <svg viewBox="0 0 260 170" role="img" aria-label="Circle with radius">
      <circle cx="130" cy="84" r="58" fill="#ffffff" stroke="#111111" stroke-width="3" />
      <circle cx="130" cy="84" r="3.5" fill="#111111" />
      <line x1="130" y1="84" x2="188" y2="84" stroke="#111111" stroke-width="3" />
      <text x="146" y="75">${gcseSvgLabel(radiusLabel)}</text>
    </svg>
  `);
}

function gcseScaleDiagram(mapLabel) {
  return gcseDiagramFrame("Map sketch", `
    <svg viewBox="0 0 320 130" role="img" aria-label="Map scale line diagram">
      <circle cx="54" cy="68" r="8" fill="#ffffff" stroke="#111111" stroke-width="3" />
      <circle cx="266" cy="68" r="8" fill="#ffffff" stroke="#111111" stroke-width="3" />
      <line x1="62" y1="68" x2="258" y2="68" stroke="#111111" stroke-width="3" stroke-dasharray="8 6" />
      <text x="42" y="42">A</text>
      <text x="256" y="42">B</text>
      <text x="126" y="99">${gcseSvgLabel(mapLabel)}</text>
    </svg>
  `);
}

function gcseTreeDiagram({ red, blue, total, format = "fraction" }) {
  return gcseDiagramFrame("Probability tree", `
    <svg viewBox="0 0 360 190" role="img" aria-label="Two-stage probability tree">
      <circle cx="34" cy="94" r="4" fill="#111111" />
      <line x1="38" y1="94" x2="150" y2="42" stroke="#111111" stroke-width="2.4" />
      <line x1="38" y1="94" x2="150" y2="146" stroke="#111111" stroke-width="2.4" />
      <line x1="154" y1="42" x2="310" y2="22" stroke="#111111" stroke-width="2.4" />
      <line x1="154" y1="42" x2="310" y2="72" stroke="#111111" stroke-width="2.4" />
      <line x1="154" y1="146" x2="310" y2="118" stroke="#111111" stroke-width="2.4" />
      <line x1="154" y1="146" x2="310" y2="168" stroke="#111111" stroke-width="2.4" />
      <text class="branch-label" x="154" y="39">R</text>
      <text class="branch-label" x="154" y="151">B</text>
      <text class="branch-label" x="314" y="25">R</text>
      <text class="branch-label" x="314" y="76">B</text>
      <text class="branch-label" x="314" y="121">R</text>
      <text class="branch-label" x="314" y="173">B</text>
      ${gcseSvgBackedText(79, 60, gcseTreeProbabilityLabel(red, total, format))}
      ${gcseSvgBackedText(217, 34, gcseTreeProbabilityLabel(red - 1, total - 1, format))}
      ${gcseSvgBackedText(217, 126, gcseTreeProbabilityLabel(red, total - 1, format))}
    </svg>
  `);
}

function gcseAreaComparisonDiagram({ triangleBase, triangleHeight, shortSide, longSide, trapHeight }) {
  return gcseDiagramFrame("Shapes not drawn accurately", `
    <svg viewBox="0 0 440 190" role="img" aria-label="Triangle and trapezium area diagram">
      <polygon points="48,142 196,142 196,48" fill="#ffffff" stroke="#111111" stroke-width="3" />
      <line x1="196" y1="48" x2="196" y2="142" stroke="#111111" stroke-width="2.5" stroke-dasharray="6 5" />
      <text x="96" y="166">${gcseSvgLabel(`${triangleBase} cm`)}</text>
      <text x="204" y="96">${gcseSvgLabel(`${triangleHeight} cm`)}</text>
      <polygon points="270,142 400,142 372,60 300,60" fill="#ffffff" stroke="#111111" stroke-width="3" />
      <line x1="300" y1="60" x2="300" y2="142" stroke="#111111" stroke-width="2.5" stroke-dasharray="6 5" />
      <text x="312" y="51">${gcseSvgLabel(`${gcseFormatDecimal(shortSide)} cm`)}</text>
      <text x="312" y="166">${gcseSvgLabel(`${gcseFormatDecimal(longSide)} cm`)}</text>
      <text x="246" y="105">${gcseSvgLabel(`${trapHeight} cm`)}</text>
    </svg>
  `);
}

function gcsePieChartDiagram(angleA) {
  return gcseDiagramFrame("Pie chart information", `
    <svg viewBox="0 0 260 180" role="img" aria-label="Pie chart diagram">
      <circle cx="130" cy="90" r="62" fill="#ffffff" stroke="#111111" stroke-width="3" />
      <line x1="130" y1="90" x2="130" y2="28" stroke="#111111" stroke-width="2.5" />
      <line x1="130" y1="90" x2="190" y2="105" stroke="#111111" stroke-width="2.5" />
      <path d="M130 52 A38 38 0 0 1 167 100" fill="none" stroke="#111111" stroke-width="3" />
      <text x="151" y="77">A</text>
      <text x="164" y="95">${gcseSvgLabel(`${angleA}°`)}</text>
      <text x="95" y="94">B, C and D</text>
    </svg>
  `);
}

function gcseAnglesDiagram(labelA, labelB) {
  return gcseDiagramFrame("Angle diagram", `
    <svg viewBox="0 0 360 170" role="img" aria-label="Angles on a straight line">
      <line x1="36" y1="118" x2="324" y2="118" stroke="#111111" stroke-width="3" />
      <line x1="180" y1="118" x2="104" y2="42" stroke="#111111" stroke-width="3" />
      <line x1="180" y1="118" x2="256" y2="42" stroke="#111111" stroke-width="3" />
      <text x="88" y="108">${gcseSvgLabel(labelA)}</text>
      <text x="216" y="108">${gcseSvgLabel(labelB)}</text>
      <text x="182" y="148">y</text>
    </svg>
  `);
}

function gcseShuffle(items) {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = gcseRand(0, index);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function gcseBoardNote(boardId) {
  return gcseExamStyles.find((style) => style.id === boardId)?.note || gcseExamStyles[0].note;
}

function gcseGenerateQuadratic(filters) {
  const r1 = gcseChoice([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
  let r2 = gcseChoice([-7, -5, -3, -1, 2, 4, 6, 8]);
  if (r2 === r1) r2 += 1;
  const b = -(r1 + r2);
  const c = r1 * r2;
  const expr = gcseFormatQuadraticExpression(b, c);
  return {
    topic: "Algebra",
    subtopic: "Quadratic equations",
    difficulty: filters.difficulty === "stretch" ? "Higher grades 8-9" : "Crossover grades 4-5",
    marks: 3,
    calculator: "Non-calculator",
    commandWords: ["solve"],
    questionHtml: `<p>Solve ${expr} = 0.</p>`,
    answer: `x = ${r1} or x = ${r2}`,
    worked: [
      `Look for two numbers that multiply to ${c} and add to ${-b}.`,
      `${expr} = (x ${r1 < 0 ? "+" : "-"} ${Math.abs(r1)})(x ${r2 < 0 ? "+" : "-"} ${Math.abs(r2)})`,
      `Set each bracket equal to zero.`,
      `x = ${r1} or x = ${r2}`
    ],
    markScheme: [
      "1 mark for correct factorisation.",
      "1 mark for setting the factors equal to zero or using an equivalent method.",
      "1 mark for both correct solutions."
    ]
  };
}

function gcseGenerateLinearModel(filters) {
  const m = gcseRand(3, 8);
  const c = gcseRand(12, 35);
  const input = gcseRand(4, 12);
  const output = m * input + c;
  return {
    topic: "Algebra",
    subtopic: "Forming and solving equations",
    difficulty: "Crossover grades 4-5",
    marks: 4,
    calculator: "Non-calculator",
    commandWords: ["form", "solve"],
    questionHtml: `<p>A taxi company charges a fixed booking fee and then a cost per mile.</p><p>The cost for ${input} miles is £${output}. The cost per mile is £${m}.</p><p>Form an equation and find the booking fee.</p>`,
    answer: `£${c}`,
    worked: [
      "Let the booking fee be b.",
      `${m} × ${input} + b = ${output}`,
      `${m * input} + b = ${output}`,
      `b = ${output} - ${m * input}`,
      `b = ${c}`
    ],
    markScheme: [
      "1 mark for defining a variable or clear unknown.",
      "1 mark for a correct equation.",
      "1 mark for correct rearrangement.",
      "1 mark for the booking fee with units."
    ]
  };
}

function gcseGenerateLinearEquation(filters) {
  let a;
  let x;
  let b;
  let rhs;
  do {
    a = gcseRand(3, 9);
    x = gcseRand(2, 8);
    b = gcseRand(4, 15);
    rhs = a * x + b;
  } while (!gcseAreCoprime([a, b, rhs]));
  const lhs = gcseLinearExpression(a, b);
  return {
    topic: "Algebra",
    subtopic: "Solving linear equations",
    difficulty: "Foundation grades 1-3",
    marks: 3,
    calculator: "Non-calculator",
    commandWords: ["solve"],
    questionHtml: `<p>Solve ${lhs} = ${rhs}.</p>`,
    answer: `x = ${x}`,
    worked: [
      `Subtract ${b} from both sides.`,
      `${a}x = ${rhs - b}`,
      `Divide both sides by ${a}.`,
      `x = ${x}`
    ],
    markScheme: [
      "1 mark for subtracting the constant term.",
      "1 mark for dividing by the coefficient of x.",
      "1 mark for the correct final value."
    ]
  };
}

function gcseGenerateFractionAmount(filters) {
  const denominator = gcseChoice([4, 5, 8, 10]);
  const numerator = gcseChoice([2, 3, 4, 7].filter((value) => value < denominator));
  const onePart = gcseChoice([6, 8, 9, 12]);
  const amount = denominator * onePart;
  const answer = numerator * onePart;
  return {
    topic: "Number",
    subtopic: "Fractions of amounts",
    difficulty: "Foundation grades 1-3",
    marks: 2,
    calculator: "Non-calculator",
    commandWords: ["work out"],
    questionHtml: `<p>Work out ${numerator}/${denominator} of ${amount}.</p>`,
    answer: `${answer}`,
    worked: [
      `${amount} ÷ ${denominator} = ${onePart}.`,
      `${onePart} × ${numerator} = ${answer}.`
    ],
    markScheme: [
      "1 mark for finding one denominator part of the amount.",
      "1 mark for multiplying by the numerator."
    ]
  };
}

function gcseGenerateRatio(filters) {
  const a = gcseChoice([2, 3, 4, 5]);
  const b = gcseChoice([3, 5, 7, 8]);
  const scale = gcseChoice([6, 8, 10, 12]);
  const total = (a + b) * scale;
  const first = a * scale;
  const increase = gcseChoice([10, 15, 20, 25]);
  const increased = first * (1 + increase / 100);
  return {
    topic: "Ratio and proportion",
    subtopic: "Sharing in a ratio and percentage change",
    difficulty: "Crossover grades 4-5",
    marks: 5,
    calculator: "Calculator",
    commandWords: ["work out"],
    questionHtml: `<p>${total} counters are shared between A and B in the ratio ${a}:${b}.</p><p>A then increases their share by ${increase}%.</p><p>Work out A's new amount.</p>`,
    answer: `${increased} counters`,
    worked: [
      `Total ratio parts = ${a} + ${b} = ${a + b}.`,
      `One part = ${total} ÷ ${a + b} = ${scale}.`,
      `A's original share = ${a} × ${scale} = ${first}.`,
      `${increase}% of ${first} = ${first * increase / 100}.`,
      `New amount = ${first} + ${first * increase / 100} = ${increased}.`
    ],
    markScheme: [
      "1 mark for total ratio parts.",
      "1 mark for the value of one part.",
      "1 mark for A's original share.",
      "1 mark for calculating the percentage increase.",
      "1 mark for the final new amount."
    ]
  };
}

function gcseGenerateCompoundInterest(filters) {
  const principal = gcseChoice([1200, 1800, 2400, 3500, 5000]);
  const rate = gcseChoice([3, 4, 5, 6]);
  const years = gcseChoice([2, 3, 4]);
  const value = principal * Math.pow(1 + rate / 100, years);
  return {
    topic: "Number",
    subtopic: "Compound percentage change",
    difficulty: "Higher grades 6-7",
    marks: 4,
    calculator: "Calculator",
    commandWords: ["calculate"],
    questionHtml: `<p>${gcseMoney(principal)} is invested for ${years} years at ${rate}% compound interest per year.</p><p>Calculate the value of the investment at the end of ${years} years.</p>`,
    answer: gcseMoney(value.toFixed(2)),
    worked: [
      `Multiplier = 1 + ${rate} ÷ 100 = ${(1 + rate / 100).toFixed(2)}.`,
      `Value = ${principal} × ${(1 + rate / 100).toFixed(2)}^${years}.`,
      `Value = ${value.toFixed(2)}.`,
      `The investment is worth ${gcseMoney(value.toFixed(2))}.`
    ],
    markScheme: [
      "1 mark for the correct multiplier.",
      "1 mark for raising the multiplier to the correct power.",
      "1 mark for a correct calculation.",
      "1 mark for final answer to 2 decimal places with money units."
    ]
  };
}

function gcseGenerateTrig(filters) {
  const angle = gcseChoice([28, 34, 41, 52, 63]);
  const hyp = gcseChoice([8, 10, 12, 15, 18]);
  const height = hyp * Math.sin(angle * Math.PI / 180);
  return {
    topic: "Geometry and measures",
    subtopic: "Right-angled trigonometry",
    difficulty: "Higher grades 6-7",
    marks: 4,
    calculator: "Calculator",
    commandWords: ["calculate"],
    questionHtml: `<p>A ladder of length ${hyp} m rests against a vertical wall.</p><p>The ladder makes an angle of ${angle}° with the ground.</p><p>Calculate the height reached by the ladder on the wall. Give your answer to 1 decimal place.</p>`,
    answer: `${height.toFixed(1)} m`,
    worked: [
      "The height is opposite the given angle and the ladder is the hypotenuse.",
      `sin(${angle}°) = height ÷ ${hyp}.`,
      `height = ${hyp} × sin(${angle}°).`,
      `height = ${height.toFixed(1)} m.`
    ],
    markScheme: [
      "1 mark for identifying sine or a correct trigonometric ratio.",
      "1 mark for substituting the correct values.",
      "1 mark for rearranging/calculating.",
      "1 mark for the final answer to 1 decimal place."
    ]
  };
}

function gcseGenerateCircleArea(filters) {
  const radius = gcseChoice([4, 5, 6, 8, 10, 12]);
  const area = Math.PI * radius * radius;
  return {
    topic: "Geometry and measures",
    subtopic: "Area of a circle",
    difficulty: "Crossover grades 4-5",
    marks: 3,
    calculator: "Calculator",
    commandWords: ["calculate"],
    questionHtml: `<p>A circle has radius ${radius} cm.</p><p>Calculate the area of the circle. Give your answer to 1 decimal place.</p>`,
    diagramHtml: gcseCircleDiagram(`${radius} cm`),
    answer: `${area.toFixed(1)} cm²`,
    worked: [
      "Use A = πr².",
      `A = π × ${radius}².`,
      `A = ${area.toFixed(1)} cm².`
    ],
    markScheme: [
      "1 mark for using the area formula.",
      "1 mark for substituting the radius correctly.",
      "1 mark for the final rounded answer with square units."
    ]
  };
}

function gcseGeneratePythagorasExam(filters) {
  const triple = gcseChoice([
    [6, 8, 10],
    [5, 12, 13],
    [9, 12, 15],
    [8, 15, 17],
    [7, 24, 25]
  ]);
  const scale = gcseChoice([1, 2]);
  const base = triple[0] * scale;
  const height = triple[1] * scale;
  const hyp = triple[2] * scale;
  return {
    topic: "Geometry and measures",
    subtopic: "Pythagoras' theorem",
    difficulty: "Crossover grades 4-5",
    marks: 4,
    calculator: "Calculator",
    commandWords: ["calculate"],
    questionHtml: `<p>A right-angled triangle is shown.</p><p>Calculate the length x. Give your answer in centimetres.</p>`,
    diagramHtml: gcseRightTriangleDiagram({
      baseLabel: `${base} cm`,
      heightLabel: `${height} cm`,
      hypLabel: "x"
    }),
    answer: `${hyp} cm`,
    worked: [
      "Use Pythagoras' theorem because the triangle is right-angled.",
      `x² = ${base}² + ${height}².`,
      `x² = ${base * base} + ${height * height} = ${hyp * hyp}.`,
      `x = √${hyp * hyp} = ${hyp}.`,
      `The length x is ${hyp} cm.`
    ],
    markScheme: [
      "1 mark for choosing Pythagoras' theorem.",
      "1 mark for substituting the two shorter sides correctly.",
      "1 mark for finding x².",
      "1 mark for the correct length with units."
    ]
  };
}

function gcseGenerateProbability(filters) {
  const red = gcseChoice([3, 4, 5, 6]);
  const blue = gcseChoice([5, 6, 7, 8]);
  const total = red + blue;
  const labelFormat = gcseChoice(["fraction", "decimal"]);
  const probability = (red / total) * ((red - 1) / (total - 1));
  return {
    topic: "Probability and statistics",
    subtopic: "Probability without replacement",
    difficulty: "Higher grades 6-7",
    marks: 4,
    calculator: "Calculator",
    commandWords: ["find"],
    questionHtml: `<p>A bag contains ${red} red counters and ${blue} blue counters.</p><p>Two counters are taken at random without replacement.</p><p>Complete the probability tree diagram and find the probability that both counters are red.</p>`,
    diagramHtml: gcseTreeDiagram({ red, blue, total, format: labelFormat }),
    answer: `${red}/${total} × ${red - 1}/${total - 1} = ${probability.toFixed(3)}`,
    worked: [
      `P(first red) = ${red}/${total}.`,
      `After one red is taken, there are ${red - 1} red counters out of ${total - 1} counters.`,
      `P(second red) = ${red - 1}/${total - 1}.`,
      `P(both red) = ${red}/${total} × ${red - 1}/${total - 1} = ${probability.toFixed(3)}.`
    ],
    markScheme: [
      "1 mark for the first red probability.",
      "1 mark for adjusting the counters after the first draw.",
      "1 mark for multiplying the probabilities.",
      "1 mark for a correct final probability."
    ]
  };
}

function gcseGenerateFrequencyMean(filters) {
  const intervals = ["0 < x ≤ 10", "10 < x ≤ 20", "20 < x ≤ 30", "30 < x ≤ 40"];
  const frequencies = [gcseRand(4, 9), gcseRand(8, 14), gcseRand(6, 12), gcseRand(3, 8)];
  const midpoints = [5, 15, 25, 35];
  const fx = frequencies.map((f, i) => f * midpoints[i]);
  const totalF = frequencies.reduce((sum, value) => sum + value, 0);
  const totalFx = fx.reduce((sum, value) => sum + value, 0);
  const mean = totalFx / totalF;
  const rows = intervals.map((interval, index) => `<tr><td>${interval}</td><td>${frequencies[index]}</td></tr>`).join("");
  return {
    topic: "Probability and statistics",
    subtopic: "Estimated mean from grouped data",
    difficulty: "Higher grades 6-7",
    marks: 5,
    calculator: "Calculator",
    commandWords: ["estimate"],
    questionHtml: `<p>The table shows grouped data for the times, x minutes, taken by students to complete a task.</p><table class="exam-mini-table"><thead><tr><th>Time, x</th><th>Frequency</th></tr></thead><tbody>${rows}</tbody></table><p>Estimate the mean time.</p>`,
    answer: `${mean.toFixed(1)} minutes`,
    worked: [
      "Use the midpoint of each class interval.",
      `Midpoints: ${midpoints.join(", ")}.`,
      `Multiply each midpoint by its frequency: ${fx.join(", ")}.`,
      `Σfx = ${totalFx} and Σf = ${totalF}.`,
      `Estimated mean = ${totalFx} ÷ ${totalF} = ${mean.toFixed(1)} minutes.`
    ],
    markScheme: [
      "1 mark for using class midpoints.",
      "1 mark for multiplying midpoint by frequency.",
      "1 mark for correct totals.",
      "1 mark for dividing Σfx by Σf.",
      "1 mark for the final estimated mean."
    ]
  };
}

function gcseGenerateCompletingSquare(filters) {
  const p = gcseChoice([2, 3, 4, 5]);
  const q = gcseChoice([1, 2, 3, 5]);
  const constant = p * p - q;
  const middle = 2 * p;
  const constantText = constant >= 0 ? `+ ${constant}` : `- ${Math.abs(constant)}`;
  return {
    topic: "Algebra",
    subtopic: "Completing the square",
    difficulty: "Higher grades 8-9",
    marks: 5,
    calculator: "Non-calculator",
    commandWords: ["solve"],
    questionHtml: `<p>Solve x² + ${middle}x ${constantText} = 0, giving your answers in exact form.</p>`,
    answer: `x = -${p} ± √${q}`,
    worked: [
      `x² + ${middle}x ${constantText} = (x + ${p})² - ${q}.`,
      `(x + ${p})² - ${q} = 0`,
      `(x + ${p})² = ${q}`,
      `x + ${p} = ±√${q}`,
      `x = -${p} ± √${q}`
    ],
    markScheme: [
      "1 mark for starting the completing-square form.",
      "1 mark for the correct constant adjustment.",
      "1 mark for isolating the squared bracket.",
      "1 mark for taking both square roots.",
      "1 mark for the exact final solutions."
    ]
  };
}

function gcseGenerateNumberFacts(filters) {
  const even = gcseChoice([14, 26, 38, 52, 74]);
  const multiple = gcseChoice([21, 35, 49, 56, 63]);
  const square = gcseChoice([25, 36, 49, 64, 81]);
  const prime = gcseChoice([2, 3, 5, 7]);
  return {
    topic: "Number",
    subtopic: "Number properties",
    difficulty: "Foundation grades 1-3",
    marks: 4,
    calculator: "Non-calculator",
    commandWords: ["write down"],
    questionHtml: `<p>Write down an example of each of the following.</p><p>(a) An even number between 10 and 80.</p><p>(b) A multiple of 7.</p><p>(c) A square number between 20 and 100.</p><p>(d) A prime number less than 10.</p>`,
    answer: `(a) ${even}, (b) ${multiple}, (c) ${square}, (d) ${prime}`,
    worked: [
      "An even number is divisible by 2.",
      "A multiple of 7 appears in the 7 times table.",
      "A square number is made by multiplying an integer by itself.",
      "A prime number has exactly two factors."
    ],
    markScheme: [
      "1 mark for a valid even number.",
      "1 mark for a valid multiple of 7.",
      "1 mark for a valid square number in the range.",
      "1 mark for a valid prime number less than 10."
    ]
  };
}

function gcseGenerateMedianRange(filters) {
  const numbers = gcseChoice([
    [10, 12, 4, 3, 6],
    [7, 11, 5, 14, 9],
    [18, 6, 12, 15, 9],
    [21, 13, 17, 25, 19]
  ]);
  const ordered = numbers.slice().sort((a, b) => a - b);
  const median = ordered[2];
  const targetRange = gcseChoice([15, 18, 20, 24]);
  const possible = ordered[0] + targetRange;
  return {
    topic: "Probability and statistics",
    subtopic: "Median and range",
    difficulty: "Foundation grades 1-3",
    marks: 3,
    calculator: "Non-calculator",
    commandWords: ["write down", "work out"],
    questionHtml: `<p>Here is a list of five numbers.</p><p>${numbers.join("  ")}</p><p>(a) Write down the median.</p><p>(b) A sixth number is added to the list. The range of the six numbers is ${targetRange}. Work out a possible value for the sixth number.</p>`,
    answer: `(a) ${median}, (b) ${possible}`,
    worked: [
      `Put the numbers in order: ${ordered.join(", ")}.`,
      `The middle value is ${median}, so the median is ${median}.`,
      `For a range of ${targetRange}, use largest value - smallest value = ${targetRange}.`,
      `${possible} - ${ordered[0]} = ${targetRange}, so ${possible} is one possible sixth number.`
    ],
    markScheme: [
      "1 mark for ordering or identifying the median.",
      "1 mark for using the range relationship.",
      "1 mark for a possible sixth number that gives the required range."
    ]
  };
}

function gcseGenerateFormulaSubstitution(filters) {
  const b = gcseChoice([3, 4, 5]);
  const c = gcseChoice([6, 7, 8]);
  const d = gcseChoice([2, 4, 5]);
  const a = b * (c + d);
  const b2 = gcseChoice([4, 5, 6]);
  const d2 = gcseChoice([3, 4, 7]);
  const c2 = gcseChoice([5, 8, 9]);
  const a2 = b2 * (c2 + d2);
  return {
    topic: "Algebra",
    subtopic: "Formulae and substitution",
    difficulty: "Foundation grades 1-3",
    marks: 4,
    calculator: "Non-calculator",
    commandWords: ["find"],
    questionHtml: `<p>Here is a formula.</p><p>a = b(c + d)</p><p>(a) Find the value of a when b = ${b}, c = ${c} and d = ${d}.</p><p>(b) Find the value of c when a = ${a2}, b = ${b2} and d = ${d2}.</p>`,
    answer: `(a) ${a}, (b) ${c2}`,
    worked: [
      `For part (a), substitute: a = ${b}(${c} + ${d}).`,
      `${c} + ${d} = ${c + d}, so a = ${b} × ${c + d} = ${a}.`,
      `For part (b), substitute: ${a2} = ${b2}(c + ${d2}).`,
      `Divide by ${b2}: c + ${d2} = ${a2 / b2}.`,
      `Subtract ${d2}: c = ${c2}.`
    ],
    markScheme: [
      "1 mark for correct substitution in part (a).",
      "1 mark for the correct value of a.",
      "1 mark for dividing by b in part (b).",
      "1 mark for the correct value of c."
    ]
  };
}

function gcseGenerateScaleMap(filters) {
  const scale = gcseChoice([25000, 50000, 100000]);
  const mapCm = gcseChoice([8, 12, 15, 18]);
  const groundKm = mapCm * scale / 100000;
  return {
    topic: "Ratio and proportion",
    subtopic: "Map scales",
    difficulty: "Foundation grades 1-3",
    marks: 3,
    calculator: "Calculator",
    commandWords: ["work out"],
    questionHtml: `<p>The scale of a map is 1 : ${scale.toLocaleString("en-GB")}.</p><p>Two places are ${groundKm} km apart on the ground.</p><p>Work out how far apart the two places are on the map. Give your answer in centimetres.</p>`,
    diagramHtml: gcseScaleDiagram(`${groundKm} km`),
    answer: `${mapCm} cm`,
    worked: [
      `${groundKm} km = ${groundKm * 100000} cm.`,
      `Map distance = real distance ÷ scale.`,
      `${groundKm * 100000} ÷ ${scale} = ${mapCm}.`,
      `The map distance is ${mapCm} cm.`
    ],
    markScheme: [
      "1 mark for converting kilometres to centimetres.",
      "1 mark for using the scale correctly.",
      "1 mark for the correct map distance."
    ]
  };
}

function gcseGeneratePercentagePack(filters) {
  const originalPack = gcseChoice([500, 600, 800]);
  const percent = gcseChoice([20, 25, 30]);
  const newPack = gcseChoice([300, 400, 500]);
  const days = gcseChoice([6, 7, 8]);
  const daily = originalPack * percent / 100;
  const total = daily * days;
  const packs = Math.ceil(total / newPack);
  return {
    topic: "Ratio and proportion",
    subtopic: "Percentage problem solving",
    difficulty: "Crossover grades 4-5",
    marks: 5,
    calculator: "Calculator",
    commandWords: ["work out"],
    questionHtml: `<p>Sam eats ${percent}% of a ${originalPack} g pack of cereal every day.</p><p>The cereal is now sold in ${newPack} g packs.</p><p>Work out the minimum number of ${newPack} g packs Sam must buy to have enough for ${days} days.</p><p>You must show your working.</p>`,
    answer: `${packs} packs`,
    worked: [
      `${percent}% of ${originalPack} g = ${daily} g.`,
      `For ${days} days, Sam needs ${daily} × ${days} = ${total} g.`,
      `Each new pack contains ${newPack} g.`,
      `${total} ÷ ${newPack} = ${(total / newPack).toFixed(2)}.`,
      `Sam must buy whole packs, so the minimum is ${packs} packs.`
    ],
    markScheme: [
      "1 mark for finding the daily amount.",
      "1 mark for multiplying by the number of days.",
      "1 mark for dividing by the new pack size.",
      "1 mark for rounding up to whole packs.",
      "1 mark for a clear final answer."
    ]
  };
}

function gcseGenerateDirectRate(filters) {
  const made = gcseChoice([12, 15, 18, 24]);
  const minutes = gcseChoice([8, 12, 15]);
  const hours = gcseChoice([5, 6, 7]);
  const perMinute = made / minutes;
  const total = perMinute * hours * 60;
  return {
    topic: "Ratio and proportion",
    subtopic: "Direct proportion and rates",
    difficulty: "Crossover grades 4-5",
    marks: 4,
    calculator: "Calculator",
    commandWords: ["work out"],
    questionHtml: `<p>A machine makes ${made} boxes in ${minutes} minutes.</p><p>The machine works continuously at the same rate.</p><p>Work out how many boxes are made in ${hours} hours.</p>`,
    answer: `${total} boxes`,
    worked: [
      `${hours} hours = ${hours * 60} minutes.`,
      `Rate = ${made} ÷ ${minutes} = ${perMinute} boxes per minute.`,
      `Boxes made = ${perMinute} × ${hours * 60}.`,
      `Boxes made = ${total}.`
    ],
    markScheme: [
      "1 mark for converting hours to minutes.",
      "1 mark for finding the rate per minute or an equivalent scale factor.",
      "1 mark for scaling to the required time.",
      "1 mark for the correct number of boxes."
    ]
  };
}

function gcseGenerateDensity(filters) {
  const area = gcseChoice([400, 560, 750, 900]);
  const density = gcseChoice([75, 84, 120, 135]);
  const population = area * density;
  return {
    topic: "Number",
    subtopic: "Compound measures",
    difficulty: "Crossover grades 4-5",
    marks: 2,
    calculator: "Calculator",
    commandWords: ["calculate"],
    questionHtml: `<p>The population of an island is ${population.toLocaleString("en-GB")} people.</p><p>The area of the island is ${area} km².</p><p>Calculate the population density of the island in people per km².</p>`,
    answer: `${density} people per km²`,
    worked: [
      "Population density = population ÷ area.",
      `${population} ÷ ${area} = ${density}.`
    ],
    markScheme: [
      "1 mark for using population ÷ area.",
      "1 mark for the correct density with units."
    ]
  };
}

function gcseGenerateBestValue(filters) {
  const packs = gcseChoice([
    [
      { label: "700 g", grams: 700, price: 7.70 },
      { label: "3 kg", grams: 3000, price: 32.40 },
      { label: "5 kg", grams: 5000, price: 53.90 }
    ],
    [
      { label: "500 g", grams: 500, price: 4.60 },
      { label: "2 kg", grams: 2000, price: 17.40 },
      { label: "4 kg", grams: 4000, price: 35.60 }
    ],
    [
      { label: "750 g", grams: 750, price: 6.60 },
      { label: "2.5 kg", grams: 2500, price: 20.50 },
      { label: "6 kg", grams: 6000, price: 50.40 }
    ]
  ]);
  const unitCosts = packs.map((pack) => pack.price / pack.grams * 100);
  const bestIndex = unitCosts.indexOf(Math.min(...unitCosts));
  const rows = packs.map((pack) => `<tr><td>${pack.label}</td><td>${gcseMoney(pack.price)}</td></tr>`).join("");
  return {
    topic: "Ratio and proportion",
    subtopic: "Best value",
    difficulty: "Crossover grades 4-5",
    marks: 3,
    calculator: "Calculator",
    commandWords: ["decide"],
    questionHtml: `<p>The same product is sold in three different pack sizes.</p><table class="exam-mini-table"><thead><tr><th>Pack</th><th>Price</th></tr></thead><tbody>${rows}</tbody></table><p>Which pack is the best value for money? Show how you decide.</p>`,
    answer: `${packs[bestIndex].label} pack`,
    worked: [
      "Compare the cost per 100 g for each pack.",
      ...packs.map((pack) => `${pack.label}: ${gcseMoney(pack.price)} ÷ ${pack.grams} × 100 = ${gcseMoney(pack.price / pack.grams * 100)} per 100 g.`),
      `The lowest cost per 100 g is the ${packs[bestIndex].label} pack.`
    ],
    markScheme: [
      "1 mark for comparing equivalent unit costs.",
      "1 mark for correct calculations for at least two packs.",
      "1 mark for the correct decision with a reason."
    ]
  };
}

function gcseGenerateInequality(filters) {
  let a;
  let x;
  let b;
  let rhs;
  do {
    a = gcseChoice([2, 3, 4, 5]);
    x = gcseChoice([-2, -1, 2, 3, 4]);
    b = gcseChoice([5, 7, 9]);
    rhs = a * x + b;
  } while (!gcseAreCoprime([a, b, rhs]));
  const lhs = gcseLinearExpression(a, b);
  return {
    topic: "Algebra",
    subtopic: "Linear inequalities",
    difficulty: "Crossover grades 4-5",
    marks: 4,
    calculator: "Non-calculator",
    commandWords: ["solve"],
    questionHtml: `<p>Solve ${lhs} &lt; ${rhs}.</p><p>Show your solution using inequality notation.</p>`,
    answer: `x < ${x}`,
    worked: [
      `Subtract ${b} from both sides: ${a}x < ${rhs - b}.`,
      `Divide both sides by ${a}.`,
      `x < ${x}.`,
      "The inequality sign stays the same because we divided by a positive number."
    ],
    markScheme: [
      "1 mark for subtracting the constant term.",
      "1 mark for isolating the term in x.",
      "1 mark for dividing by the coefficient of x.",
      "1 mark for correct inequality notation."
    ]
  };
}

function gcseGenerateAreaComparison(filters) {
  const triangleBase = gcseChoice([12, 15, 18]);
  const triangleHeight = gcseChoice([8, 10, 12]);
  const area = triangleBase * triangleHeight / 2;
  const trapHeight = gcseChoice([6, 8, 10]);
  const sumParallel = area * 2 / trapHeight;
  const shortSide = Math.floor(sumParallel / 2) - 2;
  const longSide = sumParallel - shortSide;
  const shortSideText = gcseFormatDecimal(shortSide);
  const longSideText = gcseFormatDecimal(longSide);
  return {
    topic: "Geometry and measures",
    subtopic: "Area reasoning",
    difficulty: "Crossover grades 4-5",
    marks: 3,
    calculator: "Calculator",
    commandWords: ["show"],
    questionHtml: `<p>A triangle has base ${triangleBase} cm and height ${triangleHeight} cm.</p><p>A trapezium has parallel sides ${shortSideText} cm and ${longSideText} cm, and height ${trapHeight} cm.</p><p>Show that the triangle and the trapezium have the same area.</p>`,
    diagramHtml: gcseAreaComparisonDiagram({ triangleBase, triangleHeight, shortSide, longSide, trapHeight }),
    answer: `Both areas are ${area} cm²`,
    worked: [
      `Triangle area = 1/2 × ${triangleBase} × ${triangleHeight} = ${area} cm².`,
      `Trapezium area = 1/2 × (${shortSideText} + ${longSideText}) × ${trapHeight}.`,
      `Trapezium area = 1/2 × ${gcseFormatDecimal(shortSide + longSide)} × ${trapHeight} = ${area} cm².`,
      "The areas are equal."
    ],
    markScheme: [
      "1 mark for correct triangle area.",
      "1 mark for correct trapezium area method.",
      "1 mark for showing the two areas are equal."
    ]
  };
}

function gcseGeneratePieChartReasoning(filters) {
  const angleA = gcseChoice([48, 52, 60, 72]);
  const votesA = gcseChoice([24, 26, 30, 39]);
  const remaining = 360 - angleA;
  const ratioParts = 1 + 2 + 3;
  const angleB = remaining / ratioParts;
  const totalStudents = Math.round(votesA * 360 / angleA);
  return {
    topic: "Probability and statistics",
    subtopic: "Pie charts and proportion",
    difficulty: "Crossover grades 4-5",
    marks: 5,
    calculator: "Calculator",
    commandWords: ["show", "calculate"],
    questionHtml: `<p>A school asks students to vote for one of four charities, A, B, C or D.</p><p>The sector for charity A is ${angleA}°.</p><p>Charity C has twice as many votes as charity B. Charity D has three times as many votes as charity B.</p><p>(a) Show that the sector for charity B is ${angleB}°.</p><p>(b) ${votesA} students voted for charity A. Calculate the total number of students who voted.</p>`,
    answer: `(a) ${angleB}°, (b) ${totalStudents} students`,
    worked: [
      `Angle left after charity A = 360° - ${angleA}° = ${remaining}°.`,
      "The ratio B : C : D is 1 : 2 : 3, so there are 6 parts.",
      `Angle for B = ${remaining} ÷ 6 = ${angleB}°.`,
      `${angleA}° represents ${votesA} students.`,
      `Total students = ${votesA} × 360 ÷ ${angleA} = ${totalStudents}.`
    ],
    markScheme: [
      "1 mark for finding the remaining angle.",
      "1 mark for using the ratio parts correctly.",
      "1 mark for showing the sector for B.",
      "1 mark for setting up the proportion for total students.",
      "1 mark for the correct total."
    ]
  };
}

function gcseGenerateBoundsFit(filters) {
  const garage = gcseChoice([5, 6, 7]);
  const car = garage - 0.5;
  const garageLower = garage - 0.5;
  const carUpper = car + 0.05;
  return {
    topic: "Number",
    subtopic: "Bounds and accuracy",
    difficulty: "Higher grades 6-7",
    marks: 3,
    calculator: "Calculator",
    commandWords: ["show"],
    questionHtml: `<p>A garage is ${garage} metres long, correct to the nearest metre.</p><p>A car is ${car.toFixed(1)} metres long, correct to 1 decimal place.</p><p>Show that the car may not fit in the garage.</p>`,
    answer: `The garage could be ${garageLower} m and the car could be up to ${carUpper.toFixed(2)} m, so the car may not fit.`,
    worked: [
      `The shortest possible garage length is ${garageLower} m.`,
      `The longest possible car length is less than ${carUpper.toFixed(2)} m.`,
      `${carUpper.toFixed(2)} m is greater than ${garageLower} m.`,
      "Therefore there is a possible case where the car does not fit."
    ],
    markScheme: [
      "1 mark for the lower bound of the garage length.",
      "1 mark for the upper bound of the car length.",
      "1 mark for comparing the bounds and making the correct conclusion."
    ]
  };
}

function gcseGenerateAnglesAlgebra(filters) {
  const template = gcseChoice([
    { x: 12, firstCoefficient: 2, firstConstant: 31, secondCoefficient: 3, secondConstant: 13, thirdAngle: 76 },
    { x: 14, firstCoefficient: 3, firstConstant: 8, secondCoefficient: 2, secondConstant: 19, thirdAngle: 83 },
    { x: 15, firstCoefficient: 2, firstConstant: 27, secondCoefficient: 3, secondConstant: -2, thirdAngle: 80 },
    { x: 18, firstCoefficient: 2, firstConstant: 24, secondCoefficient: 3, secondConstant: -14, thirdAngle: 80 },
    { x: 20, firstCoefficient: 2, firstConstant: 18, secondCoefficient: 3, secondConstant: -8, thirdAngle: 70 }
  ]);
  const {
    x,
    firstCoefficient,
    firstConstant,
    secondCoefficient,
    secondConstant,
    thirdAngle
  } = template;
  const firstExpression = gcseLinearExpression(firstCoefficient, firstConstant);
  const secondExpression = gcseLinearExpression(secondCoefficient, secondConstant);
  const firstAngle = firstCoefficient * x + firstConstant;
  const secondAngle = secondCoefficient * x + secondConstant;
  const largestAngle = Math.max(firstAngle, secondAngle, thirdAngle);
  const totalCoefficient = firstCoefficient + secondCoefficient;
  const totalConstant = firstConstant + secondConstant + thirdAngle;
  const constantText = totalConstant >= 0 ? `+ ${totalConstant}` : `- ${Math.abs(totalConstant)}`;
  return {
    topic: "Geometry and measures",
    subtopic: "Angles with algebra",
    difficulty: "Higher grades 6-7",
    marks: 5,
    calculator: "Non-calculator",
    commandWords: ["find"],
    questionHtml: `<p>The angles in a triangle are (${firstExpression})°, (${secondExpression})° and ${thirdAngle}°.</p><p>Find the value of x and the size of the largest angle.</p>`,
    answer: `x = ${x}, largest angle = ${largestAngle}°`,
    worked: [
      "Angles in a triangle add to 180°.",
      `(${firstExpression}) + (${secondExpression}) + ${thirdAngle} = 180.`,
      `${totalCoefficient}x ${constantText} = 180.`,
      `${totalCoefficient}x = ${180 - totalConstant}.`,
      `x = ${x}.`,
      `The angles are ${firstAngle}°, ${secondAngle}° and ${thirdAngle}°.`,
      `The largest angle is ${largestAngle}°.`
    ],
    markScheme: [
      "1 mark for using the angle sum of a triangle.",
      "1 mark for forming a correct equation.",
      "1 mark for solving for x.",
      "1 mark for substituting x back into the angle expressions.",
      "1 mark for identifying the largest angle."
    ]
  };
}

function gcseGenerateSimultaneousEquations(filters) {
  const x = gcseChoice([2, 3, 4, 5]);
  const y = gcseChoice([3, 4, 6, 7]);
  let a;
  let b;
  let c;
  let d;
  let rhs1;
  let rhs2;
  do {
    a = gcseChoice([2, 3, 4, 5]);
    b = gcseChoice([2, 3, 5, 7]);
    c = gcseChoice([1, 2, 3, 4]);
    d = gcseChoice([4, 5, 6, 7]);
    rhs1 = a * x + b * y;
    rhs2 = c * x + d * y;
  } while (
    a * d - b * c === 0 ||
    !gcseAreCoprime([a, b, rhs1]) ||
    !gcseAreCoprime([c, d, rhs2])
  );
  const equation1 = gcseFormatTwoVariableExpression(a, b);
  const equation2 = gcseFormatTwoVariableExpression(c, d);
  return {
    topic: "Algebra",
    subtopic: "Simultaneous equations",
    difficulty: "Higher grades 6-7",
    marks: 3,
    calculator: "Non-calculator",
    commandWords: ["solve"],
    questionHtml: `<p>Solve the simultaneous equations.</p><p>${equation1} = ${rhs1}</p><p>${equation2} = ${rhs2}</p>`,
    answer: `x = ${x}, y = ${y}`,
    worked: [
      "Eliminate one variable by making the coefficients match.",
      `Solving the two equations gives y = ${y}.`,
      `Substitute y = ${y} into one equation.`,
      `${a}x + ${b} × ${y} = ${rhs1}, so ${a}x + ${b * y} = ${rhs1}.`,
      `Therefore x = ${x}.`
    ],
    markScheme: [
      "1 mark for a valid elimination or substitution step.",
      "1 mark for finding one variable.",
      "1 mark for finding both variables."
    ]
  };
}

function gcseGenerateOrderingNumbers(filters) {
  const fraction = gcseChoice([[1, 4], [2, 5], [3, 8], [5, 8]]);
  const decimal = gcseChoice([0.2, 0.35, 0.45, 0.7]);
  const percent = gcseChoice([30, 55, 65, 80]);
  const values = [
    { label: `${fraction[0]}/${fraction[1]}`, value: fraction[0] / fraction[1] },
    { label: `${decimal}`, value: decimal },
    { label: `${percent}%`, value: percent / 100 }
  ];
  const ordered = values.slice().sort((a, b) => a.value - b.value);
  return {
    topic: "Number",
    subtopic: "Ordering decimals, fractions and percentages",
    difficulty: "Crossover grades 4-5",
    marks: 3,
    calculator: "Calculator",
    commandWords: ["write"],
    questionHtml: `<p>Write these values in order of size, smallest first.</p><p>${values.map((item) => item.label).join(" &nbsp;&nbsp; ")}</p><p>Show how you decide.</p>`,
    answer: ordered.map((item) => item.label).join(", "),
    worked: [
      "Convert each value to a decimal.",
      `${fraction[0]}/${fraction[1]} = ${(fraction[0] / fraction[1]).toFixed(3)}, ${percent}% = ${(percent / 100).toFixed(2)}.`,
      `In ascending order: ${ordered.map((item) => item.label).join(", ")}.`
    ],
    markScheme: [
      "1 mark for converting at least two values to a common form.",
      "1 mark for comparing the values correctly.",
      "1 mark for the correct order."
    ]
  };
}

function gcseGenerateFunctionMachine(filters) {
  const multiply = gcseChoice([2, 3, 4, 5]);
  const add = gcseChoice([2, 3, 6, 8]);
  const input = gcseChoice([4, 5, 7, 9]);
  const output = input * multiply + add;
  return {
    topic: "Algebra",
    subtopic: "Function machines",
    difficulty: "Crossover grades 4-5",
    marks: 4,
    calculator: "Non-calculator",
    commandWords: ["complete", "write"],
    questionHtml: `<p>Function A multiplies the input by ${multiply} and then adds ${add}.</p><p>(a) Find the output when the input is ${input}.</p><p>(b) Write an expression for the output when the input is x.</p><p>(c) Write the inverse operation needed to recover x from the output y.</p>`,
    answer: `(a) ${output}, (b) ${multiply}x + ${add}, (c) x = (y - ${add})/${multiply}`,
    worked: [
      `For input ${input}: ${input} × ${multiply} + ${add} = ${output}.`,
      `For input x: output = ${multiply}x + ${add}.`,
      "To reverse the function, undo the operations in reverse order.",
      `Subtract ${add}, then divide by ${multiply}: x = (y - ${add})/${multiply}.`
    ],
    markScheme: [
      "1 mark for the numerical output.",
      "1 mark for the algebraic expression.",
      "1 mark for reversing the addition.",
      "1 mark for reversing the multiplication."
    ]
  };
}

function gcseGenerateStandardForm(filters) {
  const mantissaTenths = gcseChoice([23, 34, 47, 56, 68, 72, 85, 91]);
  const power = gcseChoice([4, 5, 6, 7]);
  const mantissa = mantissaTenths / 10;
  const number = mantissa * Math.pow(10, power);
  return {
    topic: "Number",
    subtopic: "Standard form",
    difficulty: "Crossover grades 4-5",
    marks: 3,
    calculator: "Non-calculator",
    commandWords: ["write"],
    questionHtml: `<p>Write ${number.toLocaleString("en-GB")} in standard form.</p>`,
    answer: `${mantissa} × 10^${power}`,
    worked: [
      "Standard form is written as a × 10^n where 1 ≤ a < 10.",
      `Move the decimal point until the first number is ${mantissa}.`,
      `The decimal point moves ${power} places, so ${number.toLocaleString("en-GB")} = ${mantissa} × 10^${power}.`
    ],
    markScheme: [
      "1 mark for a number between 1 and 10.",
      "1 mark for the correct power of 10.",
      "1 mark for the complete standard form answer."
    ]
  };
}

function gcseGenerateNthTerm(filters) {
  const difference = gcseChoice([3, 4, 5, 6, 7]);
  const constant = gcseChoice([-4, -2, 1, 3, 5]);
  const terms = [1, 2, 3, 4, 5].map((n) => difference * n + constant);
  const nthTerm = gcseLinearExpression(difference, constant, "n");
  return {
    topic: "Algebra",
    subtopic: "Nth term of a linear sequence",
    difficulty: "Crossover grades 4-5",
    marks: 3,
    calculator: "Non-calculator",
    commandWords: ["find"],
    questionHtml: `<p>Here are the first five terms of a sequence.</p><p>${terms.join(", ")}</p><p>Find an expression for the nth term.</p>`,
    answer: nthTerm,
    worked: [
      `The common difference is ${difference}.`,
      `Start with ${difference}n.`,
      `When n = 1, ${difference}n = ${difference}. The first term is ${terms[0]}, so adjust by ${constant}.`,
      `The nth term is ${nthTerm}.`
    ],
    markScheme: [
      "1 mark for identifying the common difference.",
      "1 mark for using the coefficient of n correctly.",
      "1 mark for the correct nth term."
    ]
  };
}

function gcseGenerateGradientLine(filters) {
  const x1 = gcseChoice([-4, -3, -2, 1]);
  const y1 = gcseChoice([-3, -1, 2, 4]);
  const dx = gcseChoice([2, 3, 4, 5]);
  const dy = gcseChoice([-6, -4, 3, 6, 8]);
  const x2 = x1 + dx;
  const y2 = y1 + dy;
  const divisor = gcseGcd(Math.abs(dy), Math.abs(dx));
  const numerator = dy / divisor;
  const denominator = dx / divisor;
  const gradient = denominator === 1 ? `${numerator}` : `${numerator}/${denominator}`;
  return {
    topic: "Algebra",
    subtopic: "Gradient between two points",
    difficulty: "Crossover grades 4-5",
    marks: 3,
    calculator: "Non-calculator",
    commandWords: ["find"],
    questionHtml: `<p>Find the gradient of the line joining the points (${x1}, ${y1}) and (${x2}, ${y2}).</p>`,
    answer: gradient,
    worked: [
      "Use gradient = change in y ÷ change in x.",
      `Change in y = ${y2} - (${y1}) = ${dy}.`,
      `Change in x = ${x2} - (${x1}) = ${dx}.`,
      `Gradient = ${dy}/${dx} = ${gradient}.`
    ],
    markScheme: [
      "1 mark for using change in y over change in x.",
      "1 mark for the correct differences.",
      "1 mark for the correct simplified gradient."
    ]
  };
}

function gcseGenerateVolumeCuboid(filters) {
  const length = gcseChoice([6, 8, 10, 12]);
  const width = gcseChoice([3, 4, 5, 7]);
  const height = gcseChoice([2, 3, 4, 5]);
  const volume = length * width * height;
  return {
    topic: "Geometry and measures",
    subtopic: "Volume of a cuboid",
    difficulty: "Foundation grades 1-3",
    marks: 3,
    calculator: "Calculator",
    commandWords: ["calculate"],
    questionHtml: `<p>A cuboid has length ${length} cm, width ${width} cm and height ${height} cm.</p><p>Calculate the volume of the cuboid.</p>`,
    answer: `${volume} cm³`,
    worked: [
      "Volume of a cuboid = length × width × height.",
      `Volume = ${length} × ${width} × ${height}.`,
      `Volume = ${volume} cm³.`
    ],
    markScheme: [
      "1 mark for the correct volume formula.",
      "1 mark for substituting the three dimensions.",
      "1 mark for the correct volume with cubic units."
    ]
  };
}

function gcseGenerateProbabilitySingleEvent(filters) {
  const red = gcseChoice([4, 5, 6, 7]);
  const blue = gcseChoice([3, 4, 5]);
  const green = gcseChoice([2, 3, 4]);
  const total = red + blue + green;
  const favourable = red + green;
  return {
    topic: "Probability and statistics",
    subtopic: "Single-event probability",
    difficulty: "Foundation grades 1-3",
    marks: 3,
    calculator: "Non-calculator",
    commandWords: ["find"],
    questionHtml: `<p>A bag contains ${red} red counters, ${blue} blue counters and ${green} green counters.</p><p>One counter is chosen at random.</p><p>Find the probability that the counter is not blue.</p>`,
    answer: `${favourable}/${total}`,
    worked: [
      `Total number of counters = ${red} + ${blue} + ${green} = ${total}.`,
      `Not blue means red or green, so favourable counters = ${red} + ${green} = ${favourable}.`,
      `P(not blue) = ${favourable}/${total}.`
    ],
    markScheme: [
      "1 mark for the total number of counters.",
      "1 mark for finding the number that are not blue.",
      "1 mark for the correct probability."
    ]
  };
}

const gcseExamGenerators = [
  { topic: "number", difficulty: "foundation", marks: 4, calculator: "non-calculator", create: gcseGenerateNumberFacts },
  { topic: "statistics", difficulty: "foundation", marks: 3, calculator: "non-calculator", create: gcseGenerateMedianRange },
  { topic: "statistics", difficulty: "foundation", marks: 3, calculator: "non-calculator", create: gcseGenerateProbabilitySingleEvent },
  { topic: "algebra", difficulty: "foundation", marks: 4, calculator: "non-calculator", create: gcseGenerateFormulaSubstitution },
  { topic: "number", difficulty: "foundation", marks: 2, calculator: "non-calculator", create: gcseGenerateFractionAmount },
  { topic: "algebra", difficulty: "foundation", marks: 3, calculator: "non-calculator", create: gcseGenerateLinearEquation },
  { topic: "geometry", difficulty: "foundation", marks: 3, calculator: "calculator", create: gcseGenerateVolumeCuboid },
  { topic: "ratio", difficulty: "foundation", marks: 3, calculator: "calculator", create: gcseGenerateScaleMap },
  { topic: "algebra", difficulty: "crossover", marks: 3, calculator: "non-calculator", create: gcseGenerateQuadratic },
  { topic: "algebra", difficulty: "crossover", marks: 3, calculator: "non-calculator", create: gcseGenerateNthTerm },
  { topic: "algebra", difficulty: "crossover", marks: 3, calculator: "non-calculator", create: gcseGenerateGradientLine },
  { topic: "algebra", difficulty: "crossover", marks: 4, calculator: "non-calculator", create: gcseGenerateLinearModel },
  { topic: "algebra", difficulty: "crossover", marks: 4, calculator: "non-calculator", create: gcseGenerateFunctionMachine },
  { topic: "algebra", difficulty: "crossover", marks: 4, calculator: "non-calculator", create: gcseGenerateInequality },
  { topic: "ratio", difficulty: "crossover", marks: 5, calculator: "calculator", create: gcseGenerateRatio },
  { topic: "ratio", difficulty: "crossover", marks: 5, calculator: "calculator", create: gcseGeneratePercentagePack },
  { topic: "ratio", difficulty: "crossover", marks: 4, calculator: "calculator", create: gcseGenerateDirectRate },
  { topic: "ratio", difficulty: "crossover", marks: 3, calculator: "calculator", create: gcseGenerateBestValue },
  { topic: "number", difficulty: "crossover", marks: 2, calculator: "calculator", create: gcseGenerateDensity },
  { topic: "number", difficulty: "crossover", marks: 3, calculator: "calculator", create: gcseGenerateOrderingNumbers },
  { topic: "number", difficulty: "crossover", marks: 3, calculator: "non-calculator", create: gcseGenerateStandardForm },
  { topic: "number", difficulty: "higher", marks: 4, calculator: "calculator", create: gcseGenerateCompoundInterest },
  { topic: "number", difficulty: "higher", marks: 3, calculator: "calculator", create: gcseGenerateBoundsFit },
  { topic: "geometry", difficulty: "higher", marks: 4, calculator: "calculator", create: gcseGenerateTrig },
  { topic: "geometry", difficulty: "crossover", marks: 3, calculator: "calculator", create: gcseGenerateCircleArea },
  { topic: "geometry", difficulty: "crossover", marks: 4, calculator: "calculator", create: gcseGeneratePythagorasExam },
  { topic: "geometry", difficulty: "crossover", marks: 3, calculator: "calculator", create: gcseGenerateAreaComparison },
  { topic: "geometry", difficulty: "higher", marks: 5, calculator: "non-calculator", create: gcseGenerateAnglesAlgebra },
  { topic: "statistics", difficulty: "higher", marks: 4, calculator: "calculator", create: gcseGenerateProbability },
  { topic: "statistics", difficulty: "higher", marks: 5, calculator: "calculator", create: gcseGenerateFrequencyMean },
  { topic: "statistics", difficulty: "crossover", marks: 5, calculator: "calculator", create: gcseGeneratePieChartReasoning },
  { topic: "algebra", difficulty: "higher", marks: 3, calculator: "non-calculator", create: gcseGenerateSimultaneousEquations },
  { topic: "algebra", difficulty: "stretch", marks: 5, calculator: "non-calculator", create: gcseGenerateCompletingSquare }
];

const gcseMockMarkPlan = [4, 3, 3, 4, 3, 3, 4, 3, 5, 3, 3, 4, 2, 5, 3, 4, 3, 3, 3, 3, 5, 4, 3, 3, 5, 5, 5, 2];

const gcseMockSlotBanks = {
  early: [
    { topic: "number", difficulty: "foundation" },
    { topic: "algebra", difficulty: "foundation" },
    { topic: "ratio", difficulty: "foundation" },
    { topic: "statistics", difficulty: "foundation" },
    { topic: "geometry", difficulty: "crossover" },
    { topic: "number", difficulty: "crossover" },
    { topic: "algebra", difficulty: "crossover" }
  ],
  middle: [
    { topic: "ratio", difficulty: "crossover" },
    { topic: "algebra", difficulty: "crossover" },
    { topic: "geometry", difficulty: "crossover" },
    { topic: "statistics", difficulty: "crossover" },
    { topic: "number", difficulty: "crossover" },
    { topic: "number", difficulty: "higher" },
    { topic: "algebra", difficulty: "higher" },
    { topic: "geometry", difficulty: "higher" },
    { topic: "statistics", difficulty: "higher" }
  ],
  late: [
    { topic: "geometry", difficulty: "higher" },
    { topic: "algebra", difficulty: "higher" },
    { topic: "statistics", difficulty: "higher" },
    { topic: "number", difficulty: "higher" },
    { topic: "ratio", difficulty: "crossover" },
    { topic: "algebra", difficulty: "stretch" },
    { topic: "geometry", difficulty: "crossover" }
  ]
};

function gcseMockSlotBank(index) {
  if (index < 8) return gcseMockSlotBanks.early;
  if (index < 20) return gcseMockSlotBanks.middle;
  return gcseMockSlotBanks.late;
}

function gcseBuildMockBlueprint() {
  let previousTopic = "";
  return gcseMockMarkPlan.map((marks, index) => {
    const options = gcseShuffle(gcseMockSlotBank(index));
    const choice = options.find((option) => option.topic !== previousTopic) || options[0];
    previousTopic = choice.topic;
    return { ...choice, marks };
  });
}

function gcseQuestionWithMetadata(template, question, filters) {
  return {
    ...question,
    examBoard: gcseExamStyles.find((style) => style.id === filters.board)?.label || gcseExamStyles[0].label,
    styleNote: gcseBoardNote(filters.board),
    paperType: question.calculator,
    marks: template.marks || question.marks
  };
}

function gcseCreateUniqueQuestion(pool, filters, usedKeys, usedSubtopics = null) {
  let fallback = null;
  const templates = gcseShuffle(pool);
  const attempts = Math.max(24, templates.length * 3);
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const template = templates[attempt % templates.length] || gcseChoice(pool);
    const question = template.create(filters);
    const questionWithMetadata = gcseQuestionWithMetadata(template, question, filters);
    const key = `${questionWithMetadata.subtopic}|${questionWithMetadata.questionHtml}|${questionWithMetadata.answer}`;
    if (!fallback) fallback = questionWithMetadata;
    if (usedKeys.has(key)) continue;
    if (usedSubtopics?.has(questionWithMetadata.subtopic)) {
      fallback = questionWithMetadata;
      continue;
    }
    usedKeys.add(key);
    usedSubtopics?.add(questionWithMetadata.subtopic);
    return questionWithMetadata;
  }
  if (fallback) {
    const key = `${fallback.subtopic}|${fallback.questionHtml}|${fallback.answer}`;
    if (!usedKeys.has(key)) {
      usedKeys.add(key);
    }
    usedSubtopics?.add(fallback.subtopic);
  }
  return fallback;
}

function gcseFilteredGenerators(filters) {
  const exact = gcseExamGenerators.filter((item) => (
    (filters.topic === "any" || item.topic === filters.topic) &&
    (filters.difficulty === "any" || item.difficulty === filters.difficulty) &&
    (filters.marks === "any" || String(item.marks) === String(filters.marks)) &&
    (filters.calculator === "any" || item.calculator === filters.calculator)
  ));
  if (exact.length) return exact;
  const relaxedTopic = gcseExamGenerators.filter((item) => (
    (filters.topic === "any" || item.topic === filters.topic) &&
    (filters.calculator === "any" || item.calculator === filters.calculator)
  ));
  return relaxedTopic.length ? relaxedTopic : gcseExamGenerators;
}

function gcseBuildQuestionSet(filters, count = 4) {
  const pool = gcseFilteredGenerators(filters);
  const set = [];
  const usedKeys = new Set();
  const usedSubtopics = new Set();
  for (let index = 0; index < count; index += 1) {
    const question = gcseCreateUniqueQuestion(pool, filters, usedKeys, usedSubtopics);
    if (question) set.push(question);
  }
  return set;
}

function gcseMockPool(criteria, filters) {
  const matchesPaper = (item) => filters.calculator === "any" || item.calculator === filters.calculator;
  const markPool = gcseExamGenerators.filter((item) => matchesPaper(item) && item.marks === criteria.marks);
  const exact = markPool.filter((item) => item.topic === criteria.topic && item.difficulty === criteria.difficulty);
  const nearby = markPool.filter((item) => item.topic === criteria.topic || item.difficulty === criteria.difficulty);
  const merged = [...exact, ...nearby, ...markPool].filter((item, index, list) => list.indexOf(item) === index);
  if (merged.length) return merged;
  return gcseExamGenerators.filter((item) => matchesPaper(item));
}

function gcseBuildMockPaper(filters) {
  const set = [];
  const usedKeys = new Set();
  const usedSubtopics = new Set();
  const targetMarks = gcsePaperModeById("mock").targetMarks || 100;
  let totalMarks = 0;

  gcseBuildMockBlueprint().forEach((criteria, index) => {
    const pool = gcseMockPool(criteria, filters);
    if (!pool.length) return;
    const question = gcseCreateUniqueQuestion(pool, filters, usedKeys, usedSubtopics);
    if (question) {
      set.push(question);
      totalMarks += question.marks;
    }
  });

  const fillPool = gcseFilteredGenerators({
    ...filters,
    topic: "any",
    difficulty: "any",
    marks: "any"
  });
  while (totalMarks < targetMarks && fillPool.length && set.length < 36) {
    const remaining = targetMarks - totalMarks;
    const adjustedPool = fillPool.filter((item) => item.marks <= remaining && remaining - item.marks !== 1);
    if (!adjustedPool.length) break;
    const question = gcseCreateUniqueQuestion(adjustedPool, filters, usedKeys, usedSubtopics);
    if (!question) break;
    set.push(question);
    totalMarks += question.marks;
  }
  return set;
}

function gcseClampQuestionCount(value) {
  const count = Number.parseInt(value, 10);
  if (!Number.isFinite(count)) return 4;
  return Math.max(1, Math.min(30, count));
}

function gcseBuildPaper(filters) {
  const mode = gcsePaperModeById(filters.mode);
  const count = mode.id === "custom" ? gcseClampQuestionCount(filters.count) : mode.count;
  const questions = mode.id === "mock" ? gcseBuildMockPaper(filters) : gcseBuildQuestionSet(filters, count || 4);
  const totalMarks = questions.reduce((sum, question) => sum + question.marks, 0);
  return {
    mode,
    questions,
    totalMarks,
    title: filters.paperTitle.trim() || mode.title,
    instructions: filters.instructions.trim() || "Answer all questions. Show clear working where required.",
    includeTeacherCopy: filters.includeTeacherCopy
  };
}

function gcseReadFilters() {
  return {
    mode: document.getElementById("gcseMode")?.value || "class",
    board: document.getElementById("gcseBoard")?.value || "general",
    topic: document.getElementById("gcseTopic")?.value || "any",
    difficulty: document.getElementById("gcseDifficulty")?.value || "any",
    marks: document.getElementById("gcseMarks")?.value || "any",
    calculator: document.getElementById("gcseCalculator")?.value || "any",
    count: gcseClampQuestionCount(document.getElementById("gcseCount")?.value || 4),
    paperTitle: document.getElementById("gcsePaperTitle")?.value || "",
    instructions: document.getElementById("gcseInstructions")?.value || "",
    includeTeacherCopy: Boolean(document.getElementById("gcseTeacherCopy")?.checked)
  };
}

function renderGcseQuestionCard(question, index, options = {}) {
  const includeTeacherCopy = options.includeTeacherCopy !== false;
  return `
    <article class="exam-question-card">
      <header>
        <div>
          <span class="eyebrow">Question ${index + 1}</span>
          ${includeTeacherCopy ? `<h2>${escapeHtml(question.topic)}</h2>` : ""}
        </div>
        <strong>${question.marks} mark${question.marks === 1 ? "" : "s"}</strong>
      </header>
      ${includeTeacherCopy ? `<div class="badge-row">
        <span class="badge">${escapeHtml(question.examBoard)}</span>
        <span class="badge">${escapeHtml(question.subtopic)}</span>
        <span class="badge">${escapeHtml(question.difficulty)}</span>
        <span class="badge">${escapeHtml(question.paperType)}</span>
      </div>` : ""}
      <div class="exam-question-stem">${question.questionHtml}</div>
      ${question.diagramHtml ? `<figure class="exam-question-figure">${question.diagramHtml}</figure>` : ""}
      ${includeTeacherCopy ? `<details class="exam-solution" open>
        <summary>Worked solution</summary>
        <ol>${question.worked.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
        <p><strong>Answer:</strong> ${escapeHtml(question.answer)}</p>
      </details>
      <details class="exam-mark-scheme" open>
        <summary>Mark scheme</summary>
        <ol>${question.markScheme.map((mark) => `<li>${escapeHtml(mark)}</li>`).join("")}</ol>
      </details>` : ""}
    </article>
  `;
}

function bindGcseExamStyle() {
  const form = document.getElementById("gcseExamForm");
  const output = document.getElementById("gcseExamOutput");
  const printButton = document.getElementById("printGcseExamSet");
  const modeSelect = document.getElementById("gcseMode");
  const countInput = document.getElementById("gcseCount");
  const countControl = document.getElementById("gcseCountControl");
  const titleInput = document.getElementById("gcsePaperTitle");
  const modeHint = document.getElementById("gcseModeHint");
  const mockButton = document.getElementById("gcseMockPaperButton");
  const teacherCopyToggle = document.getElementById("gcseTeacherCopy");
  if (!form || !output) return;

  function syncModeControls(overwriteTitle = false) {
    const mode = gcsePaperModeById(modeSelect?.value || "class");
    if (countInput) {
      countInput.disabled = mode.id !== "custom";
      if (mode.id === "custom") {
        countInput.value = String(gcseClampQuestionCount(countInput.value || 6));
      } else if (mode.count) {
        countInput.value = String(mode.count);
      }
    }
    if (countControl) {
      countControl.hidden = mode.id !== "custom";
    }
    if (titleInput && (overwriteTitle || !titleInput.value.trim())) {
      titleInput.value = mode.title;
    }
    if (modeHint) {
      const sizeText = mode.id === "mock" ? "Target: 100 marks across about 25-28 questions." : mode.count ? `Questions: ${mode.count}.` : "Questions: choose your own count.";
      const mockNote = mode.id === "mock" ? " Topic, difficulty, and mark filters are cleared so the paper follows a balanced GCSE-style mark spread; the paper type filter can still be used." : "";
      modeHint.innerHTML = `<strong>${escapeHtml(mode.label)}</strong><span> ${escapeHtml(mode.description)} ${escapeHtml(sizeText)} Suggested time: ${escapeHtml(mode.time)}.${escapeHtml(mockNote)}</span>`;
    }
  }

  function generate() {
    const filters = gcseReadFilters();
    const paper = gcseBuildPaper(filters);
    const { mode, questions } = paper;
    const boardLabel = gcseExamStyles.find((style) => style.id === filters.board)?.label || "GCSE exam-style";
    const questionLabel = questions.length === 1 ? "question" : "questions";
    output.innerHTML = `
      <section class="exam-paper">
        <section class="exam-set-header">
          <div>
            <span class="eyebrow">Original GCSE-style practice</span>
            <h2>${escapeHtml(paper.title)}</h2>
            <p>${escapeHtml(boardLabel)} · ${escapeHtml(mode.label)}. ${escapeHtml(gcseBoardNote(filters.board))}</p>
          </div>
          <strong>${paper.totalMarks} marks</strong>
        </section>
        <section class="exam-paper-meta" aria-label="Paper information">
          <div><span>Name</span></div>
          <div><span>Class</span></div>
          <div><span>Date</span></div>
          <div><span>Time</span><strong>${escapeHtml(mode.time)}</strong></div>
        </section>
        <section class="exam-paper-instructions">
          <h3>Instructions</h3>
          <p>${escapeHtml(paper.instructions)}</p>
          <p>Show your working clearly. Calculators should only be used where the paper type allows it.</p>
        </section>
        <div class="exam-question-grid">
          ${questions.map((question, index) => renderGcseQuestionCard(question, index, { includeTeacherCopy: paper.includeTeacherCopy })).join("")}
        </div>
        <footer class="exam-paper-footer">
          Developed in Kaizen Maths · Original practice questions for teacher-created assessment.
        </footer>
      </section>
      <section class="exam-set-header exam-paper-summary">
        <div>
          <span class="eyebrow">Paper summary</span>
          <h2>${questions.length} ${questionLabel} · ${paper.totalMarks} marks</h2>
          <p>${paper.includeTeacherCopy ? "Teacher copy is included below each question." : "Student paper only. Switch on Teacher copy to include worked solutions and mark-scheme guidance."}</p>
        </div>
        <strong>${escapeHtml(mode.label)}</strong>
      </section>
    `;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    generate();
  });

  modeSelect?.addEventListener("change", () => {
    syncModeControls(true);
  });

  mockButton?.addEventListener("click", () => {
    if (modeSelect) modeSelect.value = "mock";
    const topicSelect = document.getElementById("gcseTopic");
    const difficultySelect = document.getElementById("gcseDifficulty");
    const marksSelect = document.getElementById("gcseMarks");
    if (topicSelect) topicSelect.value = "any";
    if (difficultySelect) difficultySelect.value = "any";
    if (marksSelect) marksSelect.value = "any";
    syncModeControls(true);
    generate();
  });

  teacherCopyToggle?.addEventListener("change", generate);
  printButton?.addEventListener("click", () => window.print());
  syncModeControls(true);
  generate();
}

function renderGcseExamStyle() {
  app.innerHTML = `
    <section class="exam-style-page">
      <section class="exam-builder-compact panel">
        <form class="exam-controls" id="gcseExamForm">
          <div class="exam-builder-title">
            <span class="eyebrow">Assessment Practice</span>
            <h1>GCSE Exam Paper Builder</h1>
          </div>
          <div class="exam-filter-bank">
            <div class="worksheet-control">
              <label for="gcseMode">Mode</label>
              <select id="gcseMode">${gcseOptionList(gcsePaperModes, "class")}</select>
            </div>
            <div class="worksheet-control">
              <label for="gcseBoard">Style</label>
              <select id="gcseBoard">${gcseOptionList(gcseExamStyles, "general")}</select>
            </div>
            <div class="worksheet-control">
              <label for="gcseTopic">Topic</label>
              <select id="gcseTopic">${gcseOptionList(gcseExamTopics, "any")}</select>
            </div>
            <div class="worksheet-control">
              <label for="gcseDifficulty">Difficulty</label>
              <select id="gcseDifficulty">${gcseOptionList(gcseGradeBands, "any")}</select>
            </div>
            <div class="worksheet-control">
              <label for="gcseMarks">Marks</label>
              <select id="gcseMarks">
                <option value="any">Any marks</option>
                <option value="2">2 marks</option>
                <option value="3">3 marks</option>
                <option value="4">4 marks</option>
                <option value="5">5 marks</option>
              </select>
            </div>
            <div class="worksheet-control">
              <label for="gcseCalculator">Paper</label>
              <select id="gcseCalculator">
                <option value="any">Any</option>
                <option value="calculator">Calculator</option>
                <option value="non-calculator">Non-calculator</option>
              </select>
            </div>
            <div class="worksheet-control" id="gcseCountControl" hidden>
              <label for="gcseCount">Questions</label>
              <input id="gcseCount" type="number" min="1" max="30" value="4">
            </div>
          </div>
          <div class="exam-functions-box">
            <div class="exam-form-actions">
              <button class="button primary" type="submit">Generate</button>
              <button class="button" id="gcseMockPaperButton" type="button">100-mark mock</button>
              <button class="button" id="printGcseExamSet" type="button">Print / PDF</button>
              <a class="button" href="#/worksheet-generator">Worksheet</a>
            </div>
            <label class="exam-copy-toggle">
              <input id="gcseTeacherCopy" type="checkbox">
              <span>Teacher copy</span>
            </label>
            <details class="exam-advanced-options">
              <summary>Paper options</summary>
              <div class="exam-advanced-grid">
                <div class="worksheet-control">
                  <label for="gcsePaperTitle">Paper title</label>
                  <input id="gcsePaperTitle" type="text" value="GCSE Class Practice Set">
                </div>
                <div class="worksheet-control">
                  <label for="gcseInstructions">Student instruction</label>
                  <textarea id="gcseInstructions" rows="2">Answer all questions. Show clear working where required.</textarea>
                </div>
              </div>
            </details>
          </div>
          <div class="exam-mode-summary" id="gcseModeHint" aria-live="polite"></div>
        </form>
      </section>
      <section id="gcseExamOutput" class="exam-output" aria-live="polite"></section>
    </section>
  `;
  bindGcseExamStyle();
}

function renderHome() {
  const heroContent = homepageHeroContent();
  const heroScreenshots = homepageScreenshotList();
  const workflowSteps = [
    ["1", "Choose a topic", "Open the exact GCSE, A-level, Further Maths, Statistics, or Mechanics topic you need."],
    ["2", "Select questions", "Choose the level, question type, and amount of practice for the class in front of you."],
    ["3", "Generate a resource", "Create board practice, worked examples, worksheets, quizzes, or assessment-style sets."],
    ["4", "Teach, print, or share", "Project it, write over it, download it, print it, or use it for homework and intervention."]
  ];
  const benefitCards = [
    ["Teach from the board", "Project focused questions, reveal answers, show worked steps, and keep the pace of practice under teacher control."],
    ["Write over Classroom View", "Use pen, highlighter, eraser, undo, and clear tools while modelling solutions or marking up diagrams live."],
    ["Create resources quickly", "Move from topic choice to printable worksheets, quizzes, homework, and assessments in minutes."],
    ["Cover more curriculum", "Use one workspace across GCSE, A-level Pure, Further Maths, Statistics, Mechanics, and classroom display resources."],
    ["Support departments", "Give teams a shared structure for practice, intervention, assessment, and curriculum consistency."],
    ["Keep teachers in control", "Kaizen Maths supplies the questions and worked support; teachers decide what to use, when to reveal it, and how to teach it."]
  ];
  const audienceCards = [
    ["For Teachers", "Teach from a stronger question bank.", "Generate board practice, examples, worksheets, answer keys, and worked solutions whenever you need them."],
    ["For Heads of Department", "Build consistency across your maths department.", "Support shared routines for homework, intervention, assessment, and curriculum coverage."],
    ["For Tutors", "Create targeted practice for every learner.", "Select exactly the topic and level a learner needs, then regenerate fresh practice instantly."],
    ["For Schools", "A scalable workspace for mathematics teaching.", "Give teachers shared access to structured questions, worked examples, assessments, and classroom tools."]
  ];
  const comparisonRows = [
    ["Searching multiple free websites", "One structured workspace with searchable topic generators, classroom display tools, and printable outputs."],
    ["Manually building worksheets", "Generate clean worksheets and assessments from selected topics in minutes."],
    ["Unstructured question lists", "Teacher-focused, curriculum-aligned practice with clear levels, answers, and worked steps."],
    ["Static textbook resources", "Unlimited fresh questions, worked examples, board projection, annotation, and assessment support."]
  ];
  const testimonials = testimonialDisplayList();

  app.innerHTML = `
    <section class="home-hero">
      <div class="home-hero-actions">
        <a class="button primary" href="#/upgrade">Start Free Trial</a>
        <a class="button" href="#/book-demo">Book a Demo</a>
        <a class="button subtle" href="#/kaizen-university">See How It Works</a>
        <a class="button" href="#/coverage-map">Explore Topics</a>
      </div>
      <div class="hero-copy">
        <span class="eyebrow">${escapeHtml(heroContent.eyebrow)}</span>
        <h1>${escapeHtml(heroContent.headline)}</h1>
        <p class="hero-lede">${escapeHtml(heroContent.subheading)}</p>
        ${homepageVideoPanelHtml()}
      </div>
      <div class="home-hero-side">
        <div class="hero-media-stack">
          ${homeInterfaceGalleryHtml(heroScreenshots, heroContent)}
        </div>
      </div>
      <aside class="home-testimonial-panel home-testimonial-strip" aria-label="What teachers are saying">
        <div class="home-testimonial-head">
          <span class="eyebrow">What Teachers Are Saying</span>
          <span class="testimonial-count">${testimonials.length} quote${testimonials.length === 1 ? "" : "s"}</span>
        </div>
        <!-- Editable from the Admin testimonials tab once live testimonials are available. -->
        <div class="home-testimonial-carousel" id="homeTestimonialCarousel">
          ${testimonials.map((item, index) => `
            <article class="home-testimonial-slide ${index === 0 ? "active" : ""}" data-testimonial-slide>
              <p>&ldquo;${escapeHtml(item.quote)}&rdquo;</p>
              <footer>
                <strong>${escapeHtml(item.person_name || "Maths teacher")}</strong>
                <span>${escapeHtml([item.role_label, item.organisation].filter(Boolean).join(" · ") || "Teacher feedback")}</span>
              </footer>
            </article>
          `).join("")}
        </div>
        <div class="testimonial-dots" aria-hidden="true">
          ${testimonials.map((_, index) => `<span class="${index === 0 ? "active" : ""}" data-testimonial-dot></span>`).join("")}
        </div>
      </aside>
    </section>

    <section class="home-workflow section-block" aria-labelledby="workflowTitle">
      <div class="section-heading">
        <span class="eyebrow">Simple Workflow</span>
        <h2 id="workflowTitle">From topic to teaching resource in minutes</h2>
      </div>
      <div class="workflow-grid">
        ${workflowSteps.map(([number, title, copy]) => `
          <article class="workflow-step">
            <span>${number}</span>
            <h3>${title}</h3>
            <p>${copy}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="coverage-home-band" aria-labelledby="homeCoverageTitle">
      <div>
        <span class="eyebrow">Curriculum Coverage</span>
        <h2 id="homeCoverageTitle">Mapped across GCSE, CSEC, CAPE, Common Core, A-Level, and Further Maths</h2>
        <p>See current coverage for GCSE, CSEC, CAPE, Common Core, A-Level Pure, Further Maths, A-Level Statistics, and A-Level Mechanics, with future tagging routes for IGCSE and IB.</p>
      </div>
      <div class="coverage-home-counts" aria-label="Coverage counts">
        ${curriculumMapAreas.map((area) => `<span><strong>${coverageToolsFor(area).length}</strong>${escapeHtml(area.title)}</span>`).join("")}
      </div>
      <a class="button primary" href="#/coverage-map">View Coverage Map</a>
    </section>

    <section class="classroom-feature-band" aria-labelledby="classroomFeatureTitle">
      <div>
        <span class="eyebrow">Classroom View</span>
        <h2 id="classroomFeatureTitle">Project questions and write directly over them</h2>
        <p>Use Classroom View for live modelling, worked examples, checking misconceptions, and guided practice. Teachers can now annotate with pen, highlighter, eraser, undo, and clear controls while keeping the same question set on screen.</p>
      </div>
      <div class="classroom-feature-actions">
        <a class="button primary" href="#/collections/classroom-tools">Explore Classroom Tools</a>
        <a class="button" href="#/kaizen-university">Watch Guides</a>
      </div>
    </section>

    <section class="home-benefits section-block" aria-labelledby="benefitsTitle">
      <div class="section-heading">
        <span class="eyebrow">Teacher Benefits</span>
        <h2 id="benefitsTitle">Built for busy maths teachers</h2>
      </div>
      <div class="home-card-grid">
        ${benefitCards.map(([title, copy]) => `
          <article class="home-card">
            <h3>${title}</h3>
            <p>${copy}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="home-audiences section-block" aria-labelledby="audienceTitle">
      <div class="section-heading">
        <span class="eyebrow">Who It Supports</span>
        <h2 id="audienceTitle">Built for different mathematics teaching roles</h2>
      </div>
      <div class="audience-grid">
        ${audienceCards.map(([label, title, copy]) => `
          <article class="audience-card">
            <span class="eyebrow">${label}</span>
            <h3>${title}</h3>
            <p>${copy}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="comparison-section section-block" aria-labelledby="comparisonTitle">
      <div class="section-heading">
        <span class="eyebrow">Why Kaizen Maths?</span>
        <h2 id="comparisonTitle">A structured alternative to scattered resources</h2>
      </div>
      <div class="comparison-table" role="table" aria-label="Why Kaizen Maths comparison">
        <div class="comparison-row comparison-head" role="row">
          <div role="columnheader">Instead of...</div>
          <div role="columnheader">Kaizen Maths gives you...</div>
        </div>
        ${comparisonRows.map(([problem, solution]) => `
          <div class="comparison-row" role="row">
            <div role="cell">${problem}</div>
            <div role="cell">${solution}</div>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="school-licence-band" aria-labelledby="schoolLicenceTitle">
      <div>
        <span class="eyebrow">School Licence</span>
        <h2 id="schoolLicenceTitle">Designed for departments and schools</h2>
        <p>Give every maths teacher access to a shared resource workspace that supports classroom instruction, practice, homework, assessment, intervention, and curriculum consistency.</p>
      </div>
      <!-- Future pricing table or school licence enquiry form can be inserted here. -->
      <div class="button-row">
        <a class="button primary" href="#/book-demo">Book a School Demo</a>
        <a class="button" href="#/schools">Request a School Licence</a>
      </div>
    </section>
    <section class="final-cta" aria-labelledby="finalCtaTitle">
      <span class="eyebrow">Ready To Try It?</span>
      <h2 id="finalCtaTitle">Spend less time searching. Spend more time teaching.</h2>
      <div class="button-row">
        <a class="button primary" href="#/upgrade">Start Free Trial</a>
        <a class="button" href="#/book-demo">Book a Demo</a>
        <a class="button" href="#/tools">Browse Tool Library</a>
      </div>
    </section>
  `;
  bindHomeTestimonials();
  bindHomeScreenshotGallery();
}

function homeInterfaceGalleryHtml(screenshots = homepageScreenshotList(), heroContent = homepageHeroContent()) {
  return `
    <section class="hero-interface-gallery" aria-labelledby="heroGalleryTitle">
      <div class="hero-gallery-head">
        <div>
          <span class="eyebrow">${escapeHtml(heroContent.gallery_label || defaultHomepageHeroContent.gallery_label)}</span>
          <h2 id="heroGalleryTitle">${escapeHtml(heroContent.gallery_heading || defaultHomepageHeroContent.gallery_heading)}</h2>
        </div>
        <span class="hero-gallery-count">${screenshots.length} view${screenshots.length === 1 ? "" : "s"}</span>
      </div>
      <div class="hero-gallery-stage" id="homeScreenshotCarousel">
        ${screenshots.map((item, index) => `
          <figure class="hero-gallery-slide ${index === 0 ? "active" : ""}" data-screenshot-slide>
            <img src="${escapeHtml(item.image_url)}" alt="${escapeHtml(item.title)} interface screenshot" loading="${index === 0 ? "eager" : "lazy"}">
            <figcaption>
              <strong>${escapeHtml(item.title)}</strong>
              <span>${escapeHtml(item.description)}</span>
            </figcaption>
          </figure>
        `).join("")}
      </div>
      <div class="hero-gallery-dots" aria-hidden="true">
        ${screenshots.map((_, index) => `<span class="${index === 0 ? "active" : ""}" data-screenshot-dot></span>`).join("")}
      </div>
    </section>
  `;
}

function bindHomeTestimonials() {
  if (homeTestimonialTimer) {
    window.clearInterval(homeTestimonialTimer);
    homeTestimonialTimer = null;
  }
  const carousel = document.getElementById("homeTestimonialCarousel");
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll("[data-testimonial-slide]")];
  const dots = [...document.querySelectorAll("[data-testimonial-dot]")];
  if (slides.length <= 1) return;
  let activeIndex = 0;
  const showSlide = (nextIndex) => {
    activeIndex = nextIndex % slides.length;
    slides.forEach((slide, index) => slide.classList.toggle("active", index === activeIndex));
    dots.forEach((dot, index) => dot.classList.toggle("active", index === activeIndex));
  };
  homeTestimonialTimer = window.setInterval(() => showSlide(activeIndex + 1), 5200);
}

function bindHomeScreenshotGallery() {
  if (homeScreenshotTimer) {
    window.clearInterval(homeScreenshotTimer);
    homeScreenshotTimer = null;
  }
  const carousel = document.getElementById("homeScreenshotCarousel");
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll("[data-screenshot-slide]")];
  const dots = [...document.querySelectorAll("[data-screenshot-dot]")];
  if (!slides.length) return;
  let activeIndex = Math.floor(Math.random() * slides.length);
  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === activeIndex));
    dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === activeIndex));
  };
  showSlide(activeIndex);
  if (slides.length > 1) homeScreenshotTimer = window.setInterval(() => showSlide(activeIndex + 1), 6200);
}

function homepageVideoPanelHtml() {
  const display = universityVideoOverrides(homepageFeaturedVideo);
  const youtubeId = youtubeIdFromUrl(display.youtube_url);
  return `
    <section class="home-feature-video" aria-labelledby="homeFeatureVideoTitle">
      <div class="home-feature-video-media">
        ${youtubeId
          ? `<iframe src="https://www.youtube.com/embed/${escapeHtml(youtubeId)}" title="${escapeHtml(display.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
          : `<div class="home-feature-video-placeholder"><span>▶</span><strong>Video guide</strong></div>`}
      </div>
      <div class="home-feature-video-copy">
        <span class="eyebrow">${escapeHtml(display.duration_label || "Start here")}</span>
        <h2 id="homeFeatureVideoTitle">${escapeHtml(display.title)}</h2>
        <p>${escapeHtml(display.description)}</p>
        <div class="button-row">
          <a class="button primary" href="#/kaizen-university">More Videos</a>
          <a class="button" href="#/how-to-use-this-site">Open Site Guide</a>
        </div>
      </div>
    </section>
  `;
}

function curriculumTagMatches(tool, tag) {
  const target = normalise(tag);
  const haystack = normalise([tool.level, ...(tool.tags || []), ...editableToolTags(tool)].join(" "));
  return haystack.includes(target);
}

function coverageToolsFor(area) {
  return tools
    .filter(isVisibleTool)
    .filter((tool) => area.match(tool))
    .filter((tool) => !["Classroom Tools", "Site Guide"].includes(tool.category))
    .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
}

function coverageGroups(areaTools) {
  return areaTools.reduce((groups, tool) => {
    const label = tool.category === "Numbers" ? "Number" : tool.category;
    if (!groups[label]) groups[label] = [];
    groups[label].push(tool);
    return groups;
  }, {});
}

function renderCoverageMap() {
  const areaData = curriculumMapAreas.map((area) => ({
    ...area,
    tools: coverageToolsFor(area)
  }));
  const requestedSection = routeParts()[1] || "";
  const totalMappedTools = new Set(areaData.flatMap((area) => area.tools.map((tool) => tool.slug))).size;
  app.innerHTML = `
    ${pageHeader(
      "Curriculum Coverage Map",
      "A compact live view of the Kaizen Maths tool library across GCSE, CSEC, CAPE, Common Core, A-Level Pure, Further Maths, Statistics, and Mechanics.",
      `<a class="button" href="#/tools">Browse Tool Library</a>${isAdmin() ? `<a class="button" href="#/admin">Edit Tags In Admin</a>` : ""}`
    )}
    <section class="coverage-page">
      <nav class="coverage-jump-list" aria-label="Coverage sections">
        <span>Jump to:</span>
        <ul>
        ${areaData.map((area) => `
          <li><a href="#/coverage-map/${escapeHtml(area.id)}">${escapeHtml(area.title)}</a> <small>(${area.tools.length})</small></li>
        `).join("")}
        </ul>
      </nav>

      <section class="coverage-map-panel">
        <div class="coverage-panel-head">
          <div>
            <span class="eyebrow">Live Coverage Directory</span>
            <h2>${totalMappedTools} mapped topic tool${totalMappedTools === 1 ? "" : "s"}</h2>
            <p>This page is generated from the current tool library, so new tools and admin tag updates feed into the coverage view without rebuilding the page by hand.</p>
          </div>
          <a class="button" href="#/worksheet-generator">Build From Coverage</a>
        </div>
        <div class="coverage-area-grid">
          ${areaData.map((area) => {
            const groups = coverageGroups(area.tools);
            return `
              <section class="coverage-area-section" id="coverage-${escapeHtml(area.id)}">
                <header class="coverage-area-heading">
                  <h2>${escapeHtml(area.title)} <span>${area.tools.length}</span></h2>
                  <p>${escapeHtml(area.description)}</p>
                </header>
                <table class="coverage-topic-table">
                  <thead>
                    <tr>
                      <th scope="col">Strand</th>
                      <th scope="col">Topics</th>
                    </tr>
                  </thead>
                  <tbody>
                  ${Object.entries(groups).map(([group, groupTools]) => `
                    <tr>
                      <th scope="row">${escapeHtml(group)} <span>${groupTools.length}</span></th>
                      <td>
                        <ul class="coverage-link-list">
                        ${groupTools.map((tool) => `
                          <li><a href="#/tools/${escapeHtml(tool.slug)}">${escapeHtml(tool.title)}</a></li>
                        `).join("")}
                        </ul>
                      </td>
                    </tr>
                  `).join("")}
                  </tbody>
                </table>
              </section>
            `;
          }).join("")}
        </div>
      </section>

      <section class="coverage-future-panel">
        <div class="coverage-panel-head">
          <div>
            <span class="eyebrow">Additional Curriculum Tags</span>
            <h2>IGCSE and IB can sit on top of the same live library</h2>
            <p>Use admin tags to add extra curriculum routes as alignment becomes clearer.</p>
          </div>
          ${isAdmin() ? `<a class="button primary" href="#/admin">Open Tool Tags</a>` : `<a class="button" href="#/tools">Explore Tools</a>`}
        </div>
        <ul class="coverage-tag-list">
          ${futureCurriculumTags.map((tag) => {
            const matchingTools = tools.filter((tool) => isVisibleTool(tool) && curriculumTagMatches(tool, tag.label));
            return `
              <li>
                <strong>${escapeHtml(tag.label)}</strong>
                <span>${escapeHtml(tag.description)}</span>
                <small>${matchingTools.length} tagged</small>
              </li>
            `;
          }).join("")}
        </ul>
      </section>
    </section>
  `;
  scrollToCoverageSection(requestedSection, areaData);
}

function scrollToCoverageSection(sectionId, areaData = curriculumMapAreas) {
  if (!sectionId || !areaData.some((area) => area.id === sectionId)) return;
  window.requestAnimationFrame(() => {
    document.getElementById(`coverage-${sectionId}`)?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
}

function compactToolDescription(tool) {
  return String(tool.description || "")
    .replace(/^Generate\s+/i, "Generates ")
    .replace(/^A\s+/i, "A ")
    .replace(/\s+/g, " ")
    .trim();
}

function toolIndexRow(tool) {
  const access = requiredAccessLabel(tool);
  const locked = !canAccessTool(tool);
  return `
    <a class="tool-index-row ${locked ? "locked" : ""}" href="#/tools/${escapeHtml(tool.slug)}">
      <span class="tool-index-copy">
        <strong>${escapeHtml(tool.title)}</strong>
        <small>${escapeHtml(compactToolDescription(tool))}</small>
      </span>
      <span class="tool-index-meta">
        <span class="badge">${escapeHtml(tool.level)}</span>
        <span class="badge ${normalise(access)}">${access}</span>
        ${locked ? `<span class="badge locked-badge">Sign in</span>` : ""}
      </span>
    </a>
  `;
}

function renderGroupedToolIndex(visible, categoryName = "", options = {}) {
  const category = categoryName || visible[0]?.category || "";
  const groupByCategory = options.groupByCategory || category === "Tool Library";
  const grouped = new Map();
  visible.forEach((tool) => {
    const group = groupByCategory ? tool.category : toolSubjectGroup(tool) || `${tool.category} Topics`;
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(tool);
  });
  grouped.forEach((groupTools) => groupTools.sort((a, b) => a.title.localeCompare(b.title)));
  const preferredOrder = groupByCategory
    ? ["Algebra", "Numbers", "Geometry", "Statistics", "Mechanics", "Classroom Tools", "Site Guide"]
    : subjectGroupOrder[category] || [];
  const orderedGroups = [
    ...preferredOrder.filter((group) => grouped.has(group)),
    ...[...grouped.keys()].filter((group) => !preferredOrder.includes(group)).sort()
  ];
  return `
    <section class="tool-index-groups" aria-label="${escapeHtml(category || "Grouped")} tools">
      ${orderedGroups.map((group, index) => `
        <details class="tool-index-group" ${state.query && index === 0 ? "open" : ""}>
          <summary class="tool-index-group-heading">
            <span class="tool-index-heading-copy">
              <strong>${escapeHtml(group)} <em>${grouped.get(group).length}</em></strong>
              <small>${escapeHtml(subjectGroupNotes[group] || `Browse ${group.toLowerCase()} tools for classroom practice, worksheets, assessment, and projection.`)}</small>
            </span>
            <span class="tool-index-toggle" aria-hidden="true">Open</span>
          </summary>
          <div class="tool-index-list">
            ${grouped.get(group).map(toolIndexRow).join("")}
          </div>
        </details>
      `).join("")}
    </section>
  `;
}

function bindToolIndexAccordion() {
  document.querySelectorAll(".tool-index-groups").forEach((container) => {
    const groups = [...container.querySelectorAll("details.tool-index-group")];
    groups.forEach((opened) => {
      opened.addEventListener("toggle", () => {
        if (!opened.open) return;
        groups.forEach((group) => {
          if (group !== opened) group.open = false;
        });
      });
    });
  });
}

function renderToolLibrary(extraCategory = "") {
  const visible = filteredTools(extraCategory);
  const collectionTitle = extraCategory ? tools.find((tool) => isVisibleTool(tool) && categorySlug(tool.category) === extraCategory)?.category || "Collection" : "Tool Library";
  const collectionDescriptions = {
    algebra: "Algebra tools are grouped by teaching purpose: foundations, equations, factorisation, functions and graphs, sequences, trigonometry, calculus, and Further Pure. Use them for exposition, retrieval practice, differentiation, homework, and assessment.",
    numbers: "Number topics build fluency with fractions, decimals, percentages, HCF and LCM, order of operations, averages, and powers of 10.",
    geometry: "Geometry topics cover shape, measure, diagrams, area, perimeter, volume, and trigonometry. Use them for visual modelling, board practice, and method-focused discussion.",
    statistics: "Statistics topics cover data summaries, probability distributions, expectation, variance, and model selection. Use them to connect calculation fluency with interpretation and exam-style reasoning.",
    mechanics: "Mechanics topics cover motion graphs, constant acceleration, momentum, impulse, forces, moments, projectiles, and modelling with physical quantities. Use them for GCSE bridge, A-Level, and IB practice with clear diagrams, equations, and worked steps.",
    "site-guide": "Site guides help teachers navigate the virtual textbook and use the shared controls across the topic tools.",
    "classroom-tools": "Classroom tools support quick routines, reference displays, games, exit tickets, and retrieval moments around the main lesson content."
  };
  app.innerHTML = `
    ${pageHeader(
      collectionTitle,
      extraCategory ? collectionDescriptions[extraCategory] || "A focused set of maths topics for classroom practice, homework, assessment, and projection." : "Search the virtual textbook by topic. Choose a level, generate fresh questions, show answers or worked steps, use the timer, and project the set in Classroom View."
    )}
    ${visible.length
      ? renderGroupedToolIndex(visible, collectionTitle, { groupByCategory: !extraCategory })
      : `<div class="panel empty-state">No tools match the current filters.</div>`}
  `;
  bindToolIndexAccordion();
  restorePendingFocus();
}

function renderSiteGuide() {
  app.innerHTML = `
    <section class="site-guide-page" aria-label="How to use this site">
      <div class="site-guide-actions">
        <a class="button" href="#/">Back to Dashboard</a>
        <a class="button" href="#/tools">Browse Library</a>
      </div>
      <iframe class="site-guide-frame" src="tools/interface-guide/index.html?v=how-to-use-site-4" title="How to Use This Site" loading="eager"></iframe>
    </section>
  `;
}

function videoCard(video) {
  const display = universityVideoOverrides(video);
  const url = display.youtube_url || "";
  const youtubeId = youtubeIdFromUrl(url);
  return `
    <article class="video-card">
      ${youtubeId
        ? `<div class="video-embed"><iframe src="https://www.youtube.com/embed/${escapeHtml(youtubeId)}" title="${escapeHtml(display.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`
        : `<div class="video-placeholder"><span>▶</span><small>YouTube embed</small></div>`}
      <div class="video-card-copy">
        <span class="eyebrow">${escapeHtml(display.duration_label)}</span>
        <h3>${escapeHtml(display.title)}</h3>
        <p>${escapeHtml(display.description)}</p>
      </div>
    </article>
  `;
}

function renderKaizenUniversity() {
  const section = ({ title, intro, videos }) => `
    <section class="university-section">
      <div class="university-section-head">
        <h2>${title}</h2>
        <p>${intro}</p>
      </div>
      <div class="video-grid">
        ${videos.map((video) => videoCard(video)).join("")}
      </div>
    </section>
  `;

  app.innerHTML = `
    ${pageHeader(
      "Kaizen University",
      "Short practical video guides for teachers using Kaizen Maths in the classroom. Learn the site, the workflow, and the routines that make the question generators useful on the board and in worksheets.",
      `<a class="button" href="#/">Back to Dashboard</a><a class="button primary" href="#/how-to-use-this-site">Open Site Guide</a>`
    )}
    <section class="university-hero panel">
      <div>
        <span class="eyebrow">How To Kaizen</span>
        <h2>Teacher training that stays practical</h2>
        <p>Kaizen University is a home for short videos showing teachers how to use Kaizen Maths without changing the role of the teacher. The focus is simple: choose the right topic, generate the right questions, teach from the board, reveal support when needed, and repeat practice until students are ready to move forward.</p>
      </div>
      <div class="university-steps">
        <span>Find</span>
        <span>Project</span>
        <span>Discuss</span>
        <span>Practise</span>
        <span>Assess</span>
      </div>
    </section>
    ${universitySections.map(section).join("")}
  `;
}

function renderBetaFeedback() {
  app.innerHTML = `
    ${pageHeader(
      "Beta Testing Brief",
      "Thank you for helping test Kaizen Maths. This page explains which teacher workflows to try and how to send useful feedback after using the site.",
      `<a class="button" href="#/">Back to Dashboard</a><a class="button primary" href="#/tools">Start Testing</a>`
    )}
    <section class="beta-page">
      <article class="panel beta-intro">
        <span class="eyebrow">For Testers</span>
        <h2>What we are testing</h2>
        <p>Kaizen Maths is a virtual mathematics textbook for teachers. It is designed to help teachers quickly find a topic, choose a level, project board-ready questions, reveal answers or worked steps, and build printable worksheets from the same question bank.</p>
        <p>Please use it as you naturally would when teaching, tutoring, setting homework, checking misconceptions, or preparing assessment practice. Short feedback is useful, but specific examples and screenshots are even better.</p>
      </article>

      <article class="panel beta-how-it-works">
        <div>
          <span class="eyebrow">Quick Walkthrough</span>
          <h2>How the site works</h2>
          <p>Start from the dashboard, open the Tool Library, then choose a topic. Each topic page lets you generate fresh questions, switch levels or question types, show answers, reveal worked steps, and use Classroom View when projecting to students.</p>
        </div>
        <div class="beta-steps">
          <div><span>1</span><p><strong>Find a topic:</strong> use the Tool Library or search bar like a textbook index.</p></div>
          <div><span>2</span><p><strong>Choose the level:</strong> select the question type that matches the stage of learning.</p></div>
          <div><span>3</span><p><strong>Teach from the board:</strong> project questions, reveal answers or steps when you need them, and repeat practice until students are ready.</p></div>
          <div><span>4</span><p><strong>Create worksheets:</strong> mix topics and print a student sheet with a separate answer key.</p></div>
        </div>
        <a class="button primary" href="#/how-to-use-this-site">Open the Illustrated Site Guide</a>
      </article>

      <section class="beta-grid">
        <article class="panel">
          <h2>Try These First</h2>
          <ol class="beta-checklist">
            <li>Open the <a href="#/tools">Tool Library</a> and search for a topic you teach.</li>
            <li>Open at least two topic tools and generate a fresh question set.</li>
            <li>Try answers, worked steps, timer controls, and Classroom View.</li>
            <li>Open the <a href="#/worksheet-generator">Worksheet Builder</a> and create a short worksheet from more than one topic.</li>
            <li>Try one Classroom Tool, such as Math in a Minute or the Exit Ticket Choice Board.</li>
          </ol>
        </article>

        <article class="panel">
          <h2>Feedback We Need</h2>
          <ul class="beta-list">
            <li>Is it clear how to find and open a topic?</li>
            <li>Are questions readable when projected?</li>
            <li>Are the answers and steps mathematically accurate?</li>
            <li>Does the worksheet builder behave as expected?</li>
            <li>What feels confusing, unfinished, or too slow?</li>
            <li>Which topic should be added or improved next?</li>
          </ul>
        </article>
      </section>

      <section class="panel beta-survey" aria-label="Beta feedback survey">
        <div>
          <span class="eyebrow">Feedback Form</span>
          <h2>Send Feedback Privately</h2>
          <p>Fill this in after testing. Use the button to create a copyable message, then send it back by WhatsApp or private message.</p>
        </div>
        <form id="betaFeedbackForm" class="beta-feedback-form">
          <label>
            Your name
            <input id="betaName" type="text" placeholder="Name">
          </label>
          <label>
            Your role
            <select id="betaRole">
              <option>Teacher</option>
              <option>Tutor</option>
              <option>Department lead</option>
              <option>Parent / student support</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            What did you test?
            <textarea id="betaTested" rows="3" placeholder="Example: Algebra topics, worksheet builder, classroom routines"></textarea>
          </label>
          <label>
            What worked well?
            <textarea id="betaUseful" rows="4" placeholder="Tell us what felt useful, clear, or classroom-ready"></textarea>
          </label>
          <label>
            What needs fixing or improving?
            <textarea id="betaIssues" rows="4" placeholder="Mention bugs, confusing parts, formatting issues, or missing features"></textarea>
          </label>
          <label>
            What should be added next?
            <textarea id="betaNext" rows="3" placeholder="Topics, question types, assessments, or worksheet options you would like to see"></textarea>
          </label>
          <button class="button primary" type="submit">Create Feedback Message</button>
        </form>
        <div class="beta-output" id="betaOutput" hidden>
          <label for="betaFeedbackMessage">Copy this message and send it privately</label>
          <textarea id="betaFeedbackMessage" rows="10" readonly></textarea>
          <div class="button-row">
            <button class="button primary" id="copyBetaFeedback" type="button">Copy Feedback</button>
            <a class="button" href="#/tools">Continue Testing</a>
          </div>
          <p class="worksheet-status" id="betaCopyStatus"></p>
        </div>
      </section>

      <section class="panel beta-thanks">
        <h2>Thank You</h2>
        <p>Everyone who helps with beta testing will receive one year of access when the full version goes live. Your feedback will directly shape the topic coverage, worksheet tools, assessment options, and classroom routines that get improved next.</p>
      </section>
    </section>
  `;
  bindBetaFeedback();
}

function worksheetEligibleTools() {
  return tools.filter((tool) => isVisibleTool(tool) && tool.type === "Practice Generator" && tool.slug !== "interface-guide");
}

function worksheetToolOptions() {
  const eligible = worksheetEligibleTools();
  const grouped = new Map();
  eligible.forEach((tool) => {
    if (!grouped.has(tool.category)) grouped.set(tool.category, []);
    grouped.get(tool.category).push(tool);
  });

  return [...grouped.entries()].map(([category, items]) => `
    <optgroup label="${escapeHtml(category)}">
      ${items.map((tool) => `<option value="${escapeHtml(tool.slug)}">${escapeHtml(tool.title)}</option>`).join("")}
    </optgroup>
  `).join("");
}

function renderWorksheetGenerator() {
  if (location.protocol === "file:") {
    app.innerHTML = `
      ${pageHeader(
        "Worksheet Generator",
        "The worksheet builder needs the site to be opened through the local web server so it can safely read question data from the topic pages.",
        `<a class="button primary" href="http://127.0.0.1:4173/#/worksheet-generator">Open Local Server Version</a><a class="button" href="#/">Back to Dashboard</a>`
      )}
      <section class="panel">
        <span class="eyebrow">Local Server Needed</span>
        <h2>Open this page through localhost</h2>
        <p>You are currently viewing the site as a file on your computer. That is fine for simple pages, but the worksheet builder uses hidden topic pages to collect question data, and browsers restrict that when opened with <code>file://</code>.</p>
        <p>This does not require the internet. It just needs the local development server URL:</p>
        <p><code>http://127.0.0.1:4173/#/worksheet-generator</code></p>
      </section>
    `;
    return;
  }

  const firstTool = worksheetEligibleTools()[0];
  worksheetState.toolSlug = worksheetState.toolSlug || firstTool?.slug || "";
  worksheetState.tool = tools.find((tool) => tool.slug === worksheetState.toolSlug) || firstTool || null;

  app.innerHTML = `
    ${pageHeader(
      "Worksheet Builder",
      `<span class="worksheet-header-summary">Build printable worksheets and assessments from topic blocks.</span>
       <span class="worksheet-header-steps" aria-label="Worksheet builder workflow">
         <span><strong>1 Select questions</strong><small>Choose a topic, level, question type, and count.</small></span>
         <span><strong>2 Add selected questions</strong><small>Load that block so you can edit questions and marks.</small></span>
         <span><strong>3 Create worksheet</strong><small>Generate the sheet, then print or save as PDF.</small></span>
       </span>`,
      "",
      "worksheet-page-header"
    )}
    <section class="worksheet-builder">
      <form class="worksheet-controls panel" id="worksheetForm">
        <div class="worksheet-control">
          <label for="worksheetPaperTitle">Worksheet title</label>
          <input id="worksheetPaperTitle" type="text" value="Mixed Practice Worksheet" placeholder="Example: Trigonometry Practice">
        </div>
        <div class="worksheet-control">
          <label for="worksheetPaperInstruction">Student instruction</label>
          <textarea id="worksheetPaperInstruction" rows="3" placeholder="Complete the following questions. Show working where appropriate.">Complete the following questions. Show working where appropriate.</textarea>
        </div>
        <div class="worksheet-control">
          <label for="worksheetTool">Topic tool</label>
          <select id="worksheetTool">${worksheetToolOptions()}</select>
        </div>
        <div class="worksheet-control">
          <label for="worksheetLevel">Level</label>
          <select id="worksheetLevel" disabled><option>Loading levels...</option></select>
        </div>
        <div class="worksheet-control">
          <label for="worksheetType">Question type</label>
          <select id="worksheetType" disabled><option>Loading question types...</option></select>
        </div>
        <div class="worksheet-control compact">
          <label for="worksheetCount">Questions</label>
          <input id="worksheetCount" type="number" min="1" max="40" value="10">
          <div class="worksheet-count-presets" aria-label="Quick question counts">
            <button class="worksheet-count-preset" type="button" data-count="2">2</button>
            <button class="worksheet-count-preset" type="button" data-count="5">5</button>
          </div>
        </div>
        <div class="worksheet-options" aria-label="Worksheet options">
          <label><input id="worksheetAnswers" type="checkbox" checked> Include separate answer key</label>
          <label><input id="worksheetSteps" type="checkbox"> Include worked steps</label>
          <label><input id="worksheetAssessmentMode" type="checkbox"> Assessment mode</label>
          <div class="worksheet-assessment-panel" id="worksheetAssessmentPanel" hidden>
            <div class="worksheet-assessment-heading">
              <strong>Marks</strong>
              <span>Add mark values to questions and show a total on the paper.</span>
            </div>
            <div class="worksheet-mark-control">
              <label for="worksheetMarks">Marks per question</label>
              <input id="worksheetMarks" type="number" min="1" max="20" value="1">
              <div class="worksheet-mark-presets" aria-label="Quick mark values">
                <button class="worksheet-mark-preset" type="button" data-marks="1">1</button>
                <button class="worksheet-mark-preset" type="button" data-marks="2">2</button>
                <button class="worksheet-mark-preset" type="button" data-marks="3">3</button>
                <button class="worksheet-mark-preset" type="button" data-marks="4">4</button>
              </div>
            </div>
          </div>
        </div>
        <div class="button-row worksheet-action-panel">
          <div class="worksheet-primary-actions">
            <button class="button" id="addWorksheetSection" type="button">Add selected questions</button>
            <button class="button" id="generateWorksheet" type="submit">Create Worksheet</button>
          </div>
          <div class="worksheet-output-actions">
            <button class="button worksheet-print-button" id="printWorksheet" type="button" disabled>Print / Save PDF</button>
            <small>Available after creating the worksheet.</small>
          </div>
          <button class="button subtle worksheet-reset-button" id="resetWorksheet" type="button">Reset Worksheet</button>
        </div>
        <div class="worksheet-section-list" id="worksheetSectionList"></div>
        <p class="worksheet-status" id="worksheetStatus">Loading the selected tool...</p>
      </form>
      <section class="worksheet-preview panel" id="worksheetPreview">
        <div class="empty-state">Choose the questions, add the selected block, then create a printable worksheet.</div>
      </section>
      <iframe class="worksheet-loader" id="worksheetLoader" title="Worksheet tool loader" aria-hidden="true"></iframe>
    </section>
  `;

  bindWorksheetGenerator();
}

function bindBetaFeedback() {
  const form = document.getElementById("betaFeedbackForm");
  const output = document.getElementById("betaOutput");
  const message = document.getElementById("betaFeedbackMessage");
  const copyButton = document.getElementById("copyBetaFeedback");
  const copyStatus = document.getElementById("betaCopyStatus");

  if (!form || !output || !message) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("betaName")?.value.trim() || "Not provided";
    const role = document.getElementById("betaRole")?.value || "Not provided";
    const tested = document.getElementById("betaTested")?.value.trim() || "Not provided";
    const useful = document.getElementById("betaUseful")?.value.trim() || "Not provided";
    const issues = document.getElementById("betaIssues")?.value.trim() || "Not provided";
    const next = document.getElementById("betaNext")?.value.trim() || "Not provided";

    message.value = [
      "Kaizen Maths beta feedback",
      "",
      `Name: ${name}`,
      `Role: ${role}`,
      "",
      "What I tested:",
      tested,
      "",
      "What worked well:",
      useful,
      "",
      "What needs fixing or improving:",
      issues,
      "",
      "What should be added next:",
      next
    ].join("\n");

    output.hidden = false;
    copyStatus.textContent = "Feedback message created. Copy it and send it privately.";
    message.focus({ preventScroll: true });
    message.select();
  });

  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(message.value);
      copyStatus.textContent = "Copied. You can now paste it into WhatsApp or a private message.";
    } catch (error) {
      message.focus();
      message.select();
      copyStatus.textContent = "Select the message and copy it manually.";
    }
  });
}

function setWorksheetStatus(message, tone = "") {
  const status = document.getElementById("worksheetStatus");
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function selectedWorksheetTool() {
  const slug = document.getElementById("worksheetTool")?.value || worksheetState.toolSlug;
  return worksheetEligibleTools().find((tool) => tool.slug === slug) || worksheetEligibleTools()[0];
}

function getWorksheetFrameApi() {
  const frame = document.getElementById("worksheetLoader");
  return frame?.contentWindow?.KaizenWorksheet || null;
}

function selectedWorksheetLevelMeta() {
  const levelValue = document.getElementById("worksheetLevel")?.value;
  return worksheetState.metadata?.levels?.find((level) => String(level.id) === String(levelValue)) || worksheetState.metadata?.levels?.[0] || null;
}

function selectedWorksheetTypeMeta() {
  const typeValue = document.getElementById("worksheetType")?.value;
  const level = selectedWorksheetLevelMeta();
  return level?.types?.find((type) => type.id === typeValue) || level?.types?.[0] || null;
}

function worksheetAssessmentOptions() {
  const assessment = document.getElementById("worksheetAssessmentMode")?.checked || false;
  const marksPerQuestion = Math.max(1, Math.min(20, Number(document.getElementById("worksheetMarks")?.value || 1)));
  return { assessment, marksPerQuestion };
}

function worksheetSelectionSignature() {
  const tool = selectedWorksheetTool();
  const level = selectedWorksheetLevelMeta();
  const type = selectedWorksheetTypeMeta();
  if (!tool || !level || !type) return "";
  const count = Math.max(1, Math.min(40, Number(document.getElementById("worksheetCount")?.value || 10)));
  const { assessment, marksPerQuestion } = worksheetAssessmentOptions();
  return [tool.slug, level.id, type.id, count, assessment ? marksPerQuestion : 0].join("|");
}

function worksheetPresentationOptions(assessment = false) {
  const defaultTitle = assessment ? "Assessment Paper" : "Mixed Practice Worksheet";
  const title = document.getElementById("worksheetPaperTitle")?.value.trim() || defaultTitle;
  const instruction = document.getElementById("worksheetPaperInstruction")?.value.trim() || "Complete the following questions. Show working where appropriate.";
  return { title, instruction };
}

function setWorksheetAssessmentMode(active) {
  const assessmentMode = document.getElementById("worksheetAssessmentMode");
  const assessmentPanel = document.getElementById("worksheetAssessmentPanel");
  if (assessmentMode) assessmentMode.checked = active;
  if (assessmentPanel) assessmentPanel.hidden = !active;
}

function populateWorksheetControls(metadata) {
  const levelSelect = document.getElementById("worksheetLevel");
  const typeSelect = document.getElementById("worksheetType");
  if (!levelSelect || !typeSelect) return;

  const levels = metadata?.levels || [];
  levelSelect.disabled = levels.length === 0;
  levelSelect.innerHTML = levels.length
    ? levels.map((level) => `<option value="${escapeHtml(level.id)}">${escapeHtml(level.title)}</option>`).join("")
    : `<option value="">No levels found</option>`;

  function populateTypes() {
    const selectedLevel = levels.find((level) => String(level.id) === String(levelSelect.value)) || levels[0];
    const types = selectedLevel?.types || [];
    typeSelect.disabled = types.length === 0;
    typeSelect.innerHTML = types.length
      ? types.map((type) => `<option value="${escapeHtml(type.id)}">${escapeHtml(type.label)}</option>`).join("")
      : `<option value="">No question types found</option>`;
    updateWorksheetFlow();
  }

  if (levels.length) levelSelect.value = String(levels[0].id);
  levelSelect.onchange = populateTypes;
  typeSelect.onchange = updateWorksheetFlow;
  populateTypes();
}

function loadWorksheetToolForApi(tool, options = {}) {
  const frame = document.getElementById("worksheetLoader");
  if (!frame || !tool) return Promise.reject(new Error("Worksheet loader is not available."));

  return new Promise((resolve, reject) => {
    let settled = false;
    let pollTimer = null;
    const separator = tool.toolPath.includes("?") ? "&" : "?";
    const targetSrc = options.cacheBust === false ? tool.toolPath : `${tool.toolPath}${separator}worksheetLoad=${Date.now()}`;
    const targetUrl = new URL(targetSrc, window.location.href);

    function finishError(error) {
      if (settled) return;
      settled = true;
      window.clearInterval(pollTimer);
      reject(error);
    }

    function finishSuccess(api) {
      if (settled) return;
      settled = true;
      window.clearInterval(pollTimer);
      resolve({ api, metadata: api.getState() });
    }

    function checkReady() {
      try {
        if (frame.contentWindow?.location?.pathname !== targetUrl.pathname) return;
      } catch (_) {
        return;
      }
      const api = getWorksheetFrameApi();
      if (!api) return;
      if (!api.canGenerate()) {
        finishError(new Error(`${tool.title} is not worksheet-ready yet.`));
        return;
      }
      finishSuccess(api);
    }

    const timeout = window.setTimeout(() => finishError(new Error(`${tool.title} took too long to load. Try selecting it again.`)), 10000);
    const originalFinishSuccess = finishSuccess;
    finishSuccess = (api) => {
      window.clearTimeout(timeout);
      originalFinishSuccess(api);
    };
    const originalFinishError = finishError;
    finishError = (error) => {
      window.clearTimeout(timeout);
      originalFinishError(error);
    };

    frame.onload = () => {
      if (settled) return;
      window.clearInterval(pollTimer);
      pollTimer = window.setInterval(checkReady, 120);
      checkReady();
    };
    frame.src = targetSrc;
  });
}

function loadWorksheetTool(tool) {
  const levelSelect = document.getElementById("worksheetLevel");
  const typeSelect = document.getElementById("worksheetType");
  if (!tool) return;
  const loadToken = worksheetState.loadToken + 1;
  worksheetState.loadToken = loadToken;

  worksheetState.tool = tool;
  worksheetState.toolSlug = tool.slug;
  worksheetState.metadata = null;
  worksheetState.worksheet = null;
  if (levelSelect) {
    levelSelect.disabled = true;
    levelSelect.innerHTML = `<option>Loading levels...</option>`;
  }
  if (typeSelect) {
    typeSelect.disabled = true;
    typeSelect.innerHTML = `<option>Loading question types...</option>`;
  }
  updateWorksheetFlow();
  setWorksheetStatus(`Loading ${tool.title}...`);

  loadWorksheetToolForApi(tool)
    .then(({ metadata }) => {
      if (loadToken !== worksheetState.loadToken) return;
      worksheetState.metadata = metadata;
      populateWorksheetControls(metadata);
      updateWorksheetFlow();
      setWorksheetStatus(`${tool.title} is ready. Add selected questions when you are happy with this block.`);
    })
    .catch((error) => {
      if (loadToken !== worksheetState.loadToken) return;
      if (levelSelect) {
        levelSelect.disabled = true;
        levelSelect.innerHTML = `<option value="">Not available for worksheets yet</option>`;
      }
      if (typeSelect) {
        typeSelect.disabled = true;
        typeSelect.innerHTML = `<option value="">Not available for worksheets yet</option>`;
      }
      updateWorksheetFlow();
      setWorksheetStatus(error.message, "error");
    });
}

function currentWorksheetSection() {
  const tool = selectedWorksheetTool();
  const level = selectedWorksheetLevelMeta();
  const type = selectedWorksheetTypeMeta();
  const count = Math.max(1, Math.min(40, Number(document.getElementById("worksheetCount")?.value || 10)));
  const { assessment, marksPerQuestion } = worksheetAssessmentOptions();
  if (!tool || !level || !type) return null;
  return {
    id: `${tool.slug}-${level.id}-${type.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    toolSlug: tool.slug,
    toolTitle: tool.title,
    category: tool.category,
    level: level.id,
    levelLabel: level.title,
    type: type.id,
    typeLabel: type.label,
    count,
    marksPerQuestion: assessment ? marksPerQuestion : 0
  };
}

function worksheetCurrentSelectionReady() {
  const levelSelect = document.getElementById("worksheetLevel");
  const typeSelect = document.getElementById("worksheetType");
  return Boolean(
    worksheetState.metadata &&
    !levelSelect?.disabled &&
    !typeSelect?.disabled &&
    currentWorksheetSection()
  );
}

function updateWorksheetFlow() {
  const addButton = document.getElementById("addWorksheetSection");
  const generateButton = document.getElementById("generateWorksheet");
  const hasSections = worksheetState.sections.length > 0;
  const selectionReady = worksheetCurrentSelectionReady();
  const currentSignature = selectionReady ? worksheetSelectionSignature() : "";
  const hasUnaddedSelection = selectionReady && currentSignature !== worksheetState.lastAddedSignature;
  const prioritiseAdd = selectionReady && (!hasSections || hasUnaddedSelection);
  const loading = !worksheetState.metadata;
  const prioritiseGenerate = hasSections && !hasUnaddedSelection && !loading;

  if (addButton) {
    addButton.disabled = !selectionReady;
    addButton.classList.toggle("primary", prioritiseAdd);
    addButton.classList.toggle("worksheet-action-muted", !prioritiseAdd);
  }

  if (generateButton) {
    generateButton.disabled = !hasSections;
    generateButton.classList.toggle("primary", prioritiseGenerate);
    generateButton.classList.toggle("worksheet-action-muted", !prioritiseGenerate);
  }
}

function renderWorksheetSections() {
  const list = document.getElementById("worksheetSectionList");
  if (!list) return;
  const { assessment } = worksheetAssessmentOptions();

  if (!worksheetState.sections.length) {
    list.innerHTML = `<p class="worksheet-section-empty">No blocks added yet. Select the questions you want, then click <strong>Add selected questions</strong>.</p>`;
    updateWorksheetFlow();
    return;
  }

  list.innerHTML = `
    <h3>Worksheet Blocks</h3>
    ${worksheetState.sections.map((section, index) => `
      <article class="worksheet-section-item">
        <div class="worksheet-section-summary">
          <strong>${index + 1}. ${escapeHtml(section.toolTitle)}</strong>
          <span>${escapeHtml(section.levelLabel)} · ${escapeHtml(section.typeLabel)}</span>
        </div>
        <div class="worksheet-section-editors">
          <label>
            Questions
            <input class="worksheet-section-count" type="number" min="1" max="40" value="${section.count}" data-section-id="${escapeHtml(section.id)}">
          </label>
          <label ${assessment ? "" : "hidden"}>
            Marks each
            <input class="worksheet-section-marks" type="number" min="1" max="20" value="${section.marksPerQuestion || 1}" data-section-id="${escapeHtml(section.id)}">
          </label>
        </div>
        <button class="button worksheet-section-remove" type="button" data-section-id="${escapeHtml(section.id)}">Remove</button>
      </article>
    `).join("")}
  `;

  list.querySelectorAll(".worksheet-section-remove").forEach((button) => {
    button.addEventListener("click", () => {
      worksheetState.sections = worksheetState.sections.filter((section) => section.id !== button.dataset.sectionId);
      renderWorksheetSections();
      updateWorksheetFlow();
    });
  });

  list.querySelectorAll(".worksheet-section-count").forEach((input) => {
    input.addEventListener("change", () => {
      const section = worksheetState.sections.find((item) => item.id === input.dataset.sectionId);
      if (!section) return;
      section.count = Math.max(1, Math.min(40, Number(input.value || 1)));
      input.value = String(section.count);
      updateWorksheetFlow();
    });
  });

  list.querySelectorAll(".worksheet-section-marks").forEach((input) => {
    input.addEventListener("change", () => {
      const section = worksheetState.sections.find((item) => item.id === input.dataset.sectionId);
      if (!section) return;
      section.marksPerQuestion = Math.max(1, Math.min(20, Number(input.value || 1)));
      input.value = String(section.marksPerQuestion);
      updateWorksheetFlow();
    });
  });

  updateWorksheetFlow();
}

function addWorksheetSection() {
  const section = currentWorksheetSection();
  if (!section) {
    setWorksheetStatus("Choose a valid tool, level, and question type before adding a block.", "error");
    return;
  }
  worksheetState.lastAddedSignature = worksheetSelectionSignature();
  worksheetState.sections.push(section);
  renderWorksheetSections();
  updateWorksheetFlow();
  setWorksheetStatus(`Added ${section.count} ${section.toolTitle} questions. You can edit the block, add another block, or create the worksheet.`, "success");
}

async function generateWorksheetFromSections(sections, options = {}) {
  const generatedSections = [];
  const problems = [];

  for (const section of sections) {
    const tool = worksheetEligibleTools().find((candidate) => candidate.slug === section.toolSlug);
    if (!tool) continue;
    setWorksheetStatus(`Generating ${section.count} questions from ${tool.title}...`);
    const { api, metadata } = await loadWorksheetToolForApi(tool);
    const result = api.generate({
      level: Number.isNaN(Number(section.level)) ? section.level : Number(section.level),
      type: section.type,
      count: section.count
    });
    const levelLabel = metadata.levels?.find((level) => String(level.id) === String(section.level))?.title || section.levelLabel;
    const typeLabel = metadata.levels
      ?.find((level) => String(level.id) === String(section.level))
      ?.types?.find((type) => type.id === section.type)?.label || section.typeLabel;
    const resolvedMarks = options.assessment ? (Number(section.marksPerQuestion) || Number(options.marksPerQuestion) || 1) : 0;
    const sectionProblems = (result.problems || []).map((problem) => ({
      ...problem,
      sectionId: section.id,
      sectionTitle: tool.title,
      sectionLevel: levelLabel,
      sectionType: typeLabel,
      marks: resolvedMarks
    }));
    problems.push(...sectionProblems);
    const instruction = result.instruction || sectionProblems.find((problem) => problem.instructionText || problem.instruction)?.instructionText || sectionProblems.find((problem) => problem.instructionText || problem.instruction)?.instruction || "";
    generatedSections.push({ ...section, toolTitle: tool.title, levelLabel, typeLabel, count: sectionProblems.length, marksPerQuestion: resolvedMarks, instruction });
  }

  return { ok: problems.length > 0, count: problems.length, sections: generatedSections, problems, options };
}

function renderWorksheetPreview(worksheet, options = {}) {
  const preview = document.getElementById("worksheetPreview");
  const printButton = document.getElementById("printWorksheet");
  if (!preview) return;

  if (!worksheet?.ok || !worksheet.problems?.length) {
    preview.innerHTML = `<div class="empty-state">No worksheet questions were generated.</div>`;
    if (printButton) printButton.disabled = true;
    return;
  }

  const totalMarks = worksheetTotalMarks(worksheet);
  const presentation = worksheetPresentationOptions(options.assessment);
  const paperEyebrow = options.assessment ? "Kaizen Maths Assessment" : "Kaizen Maths Worksheet";
  let questionNumber = 0;

  preview.innerHTML = `
    <article class="worksheet-sheet" id="worksheetSheet">
      <header class="worksheet-sheet-header">
        <div>
          <span class="eyebrow">${paperEyebrow}</span>
          <h2>${escapeHtml(presentation.title)}</h2>
          <p>${escapeHtml(presentation.instruction)}</p>
        </div>
        <div class="worksheet-student-fields">
          <span>Name:</span>
          <span>Date:</span>
          <span>Class:</span>
        </div>
      </header>
      ${options.assessment ? `<div class="worksheet-assessment-summary"><strong>Total marks: ${totalMarks}</strong><span>Show working where appropriate.</span></div>` : ""}
      ${worksheet.sections?.length ? worksheet.sections.map((section) => {
        const sectionProblems = worksheet.problems.filter((problem) => problem.sectionId === section.id);
        return `
          <section class="worksheet-section">
            <h3>${escapeHtml(section.toolTitle)}</h3>
            <p>${escapeHtml(section.typeLabel)}${options.assessment && section.marksPerQuestion ? ` · ${worksheetMarksText(section.marksPerQuestion)} each` : ""}</p>
            ${section.instruction ? `<p class="worksheet-section-instruction">${escapeHtml(section.instruction)}</p>` : ""}
            <ol class="worksheet-question-list">
              ${sectionProblems.map((problem) => {
                questionNumber += 1;
                return `
                  <li class="worksheet-question">
                    <div class="worksheet-question-number">${questionNumber}</div>
                    <div class="worksheet-question-body">
                      <div class="worksheet-question-row">
                        <div class="worksheet-question-text">${worksheetContentHtml(problem.question || problem.questionText)}</div>
                        ${worksheetQuestionMarksHtml(problem, options)}
                      </div>
                      <div class="worksheet-working-lines" aria-hidden="true">
                        <span></span><span></span><span></span>
                      </div>
                      ${options.steps && problem.steps?.length ? `<div class="worksheet-steps"><strong>Worked steps:</strong>${worksheetStepsHtml(problem.steps)}</div>` : ""}
                    </div>
                  </li>
                `;
              }).join("")}
            </ol>
          </section>
        `;
      }).join("") : `<ol class="worksheet-question-list">${worksheet.problems.map((problem) => {
        questionNumber += 1;
        return `
          <li class="worksheet-question">
            <div class="worksheet-question-number">${questionNumber}</div>
            <div class="worksheet-question-body">
              <div class="worksheet-question-row">
                <div class="worksheet-question-text">${worksheetContentHtml(problem.question || problem.questionText)}</div>
                ${worksheetQuestionMarksHtml(problem, options)}
              </div>
              <div class="worksheet-working-lines" aria-hidden="true">
                <span></span><span></span><span></span>
              </div>
              ${options.steps && problem.steps?.length ? `<div class="worksheet-steps"><strong>Worked steps:</strong>${worksheetStepsHtml(problem.steps)}</div>` : ""}
            </div>
          </li>
        `;
      }).join("")}</ol>`}
      ${options.answers ? renderWorksheetAnswerKey(worksheet, options) : ""}
    </article>
  `;
  if (printButton) printButton.disabled = false;
}

function resetWorksheetBuilder() {
  const preview = document.getElementById("worksheetPreview");
  const printButton = document.getElementById("printWorksheet");
  const assessmentMode = document.getElementById("worksheetAssessmentMode");
  const assessmentPanel = document.getElementById("worksheetAssessmentPanel");
  const marksInput = document.getElementById("worksheetMarks");
  const paperTitleInput = document.getElementById("worksheetPaperTitle");
  const paperInstructionInput = document.getElementById("worksheetPaperInstruction");
  worksheetState.sections = [];
  worksheetState.worksheet = null;
  worksheetState.lastAddedSignature = "";
  if (assessmentMode) assessmentMode.checked = false;
  if (assessmentPanel) assessmentPanel.hidden = true;
  if (marksInput) marksInput.value = "1";
  if (paperTitleInput) paperTitleInput.value = "Mixed Practice Worksheet";
  if (paperInstructionInput) paperInstructionInput.value = "Complete the following questions. Show working where appropriate.";
  renderWorksheetSections();
  if (preview) {
    preview.innerHTML = `<div class="empty-state">Choose the questions, add the selected block, then create a printable worksheet.</div>`;
  }
  if (printButton) printButton.disabled = true;
  updateWorksheetFlow();
  setWorksheetStatus("Worksheet selections cleared. Choose options to start again.", "success");
}

function bindWorksheetGenerator() {
  const toolSelect = document.getElementById("worksheetTool");
  const form = document.getElementById("worksheetForm");
  const controlsPane = document.getElementById("worksheetForm");
  const previewPane = document.getElementById("worksheetPreview");
  const printButton = document.getElementById("printWorksheet");
  const addSectionButton = document.getElementById("addWorksheetSection");
  const resetButton = document.getElementById("resetWorksheet");
  const assessmentMode = document.getElementById("worksheetAssessmentMode");
  const assessmentPanel = document.getElementById("worksheetAssessmentPanel");
  const paperTitleInput = document.getElementById("worksheetPaperTitle");
  const paperInstructionInput = document.getElementById("worksheetPaperInstruction");
  const countInput = document.getElementById("worksheetCount");
  const marksInput = document.getElementById("worksheetMarks");
  if (!toolSelect || !form) return;

  if (controlsPane && previewPane) {
    previewPane.addEventListener("wheel", (event) => {
      const delta = event.deltaY;
      const canScrollControlsDown = delta > 0 && controlsPane.scrollTop + controlsPane.clientHeight < controlsPane.scrollHeight - 2;
      const canScrollControlsUp = delta < 0 && controlsPane.scrollTop > 0;
      if (canScrollControlsDown || canScrollControlsUp) {
        controlsPane.scrollTop += delta;
        event.preventDefault();
      }
    }, { passive: false });
  }

  toolSelect.value = worksheetState.toolSlug;
  loadWorksheetTool(selectedWorksheetTool());
  renderWorksheetSections();

  toolSelect.addEventListener("change", () => {
    loadWorksheetTool(selectedWorksheetTool());
  });

  addSectionButton?.addEventListener("click", addWorksheetSection);
  resetButton?.addEventListener("click", resetWorksheetBuilder);
  [paperTitleInput, paperInstructionInput].forEach((input) => {
    input?.addEventListener("input", () => {
      if (!worksheetState.worksheet?.ok) return;
      const answers = document.getElementById("worksheetAnswers")?.checked || false;
      const steps = document.getElementById("worksheetSteps")?.checked || false;
      renderWorksheetPreview(worksheetState.worksheet, { answers, steps, ...worksheetAssessmentOptions() });
    });
  });
  [countInput, marksInput].forEach((input) => {
    input?.addEventListener("input", updateWorksheetFlow);
    input?.addEventListener("change", updateWorksheetFlow);
  });
  assessmentMode?.addEventListener("change", () => {
    if (paperTitleInput && ["Mixed Practice Worksheet", "Assessment Paper"].includes(paperTitleInput.value.trim())) {
      paperTitleInput.value = assessmentMode.checked ? "Assessment Paper" : "Mixed Practice Worksheet";
    }
    if (assessmentPanel) assessmentPanel.hidden = !assessmentMode.checked;
    if (assessmentMode.checked) {
      const marksPerQuestion = worksheetAssessmentOptions().marksPerQuestion;
      worksheetState.sections.forEach((section) => {
        if (!section.marksPerQuestion) section.marksPerQuestion = marksPerQuestion;
      });
    }
    renderWorksheetSections();
    updateWorksheetFlow();
    setWorksheetStatus(assessmentMode.checked ? "Assessment mode on. Add blocks with the mark value you want for each question." : "Assessment mode off. Worksheets will generate without marks.", "success");
  });

  document.querySelectorAll(".worksheet-count-preset").forEach((button) => {
    button.addEventListener("click", () => {
      const countInput = document.getElementById("worksheetCount");
      if (!countInput) return;
      countInput.value = button.dataset.count || "5";
      countInput.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  document.querySelectorAll(".worksheet-mark-preset").forEach((button) => {
    button.addEventListener("click", () => {
      const marksInput = document.getElementById("worksheetMarks");
      if (!marksInput) return;
      marksInput.value = button.dataset.marks || "1";
      marksInput.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const answers = document.getElementById("worksheetAnswers")?.checked || false;
    const steps = document.getElementById("worksheetSteps")?.checked || false;
    const assessmentOptions = worksheetAssessmentOptions();
    const sections = [...worksheetState.sections];

    if (!sections.length) {
      setWorksheetStatus("First click Add selected questions. That adds the current topic, level, type, and question count to the worksheet.", "error");
      updateWorksheetFlow();
      return;
    }

    try {
      const worksheet = await generateWorksheetFromSections(sections, { answers, steps, ...assessmentOptions });
      worksheetState.worksheet = worksheet;
      renderWorksheetPreview(worksheet, { answers, steps, ...assessmentOptions });
      const marksMessage = assessmentOptions.assessment ? ` Total: ${worksheetTotalMarks(worksheet)} marks.` : "";
      setWorksheetStatus(`Generated ${worksheet.count || 0} questions across ${sections.length} block${sections.length === 1 ? "" : "s"}.${marksMessage} Use Print / Save PDF to download it.`, "success");
    } catch (error) {
      setWorksheetStatus(error.message, "error");
    }
  });

  printButton?.addEventListener("click", () => {
    window.print();
  });
}

function relatedToolTokens(tool) {
  const stopWords = new Set([
    "and", "the", "with", "from", "for", "into", "using", "tool", "practice", "generator",
    "level", "maths", "math", "questions", "question", "basic", "advanced", "mixed", "classroom",
    "generate", "generates", "covering", "including", "students", "teacher", "teachers",
    "algebra", "geometry", "statistics", "mechanics", "numbers", "tools",
    "gcse", "igcse", "csec", "cape", "level", "trial", "free", "pro", "ks2", "ks3", "ks4", "ks5"
  ]);
  return new Set(
    normalise([
      tool.title,
      tool.category,
      toolSubjectGroup(tool),
      tool.description,
      ...toolTopicConcepts(tool),
      ...allToolTags(tool)
    ].join(" "))
      .split(/[^a-z0-9]+/)
      .map((token) => token.trim())
      .filter((token) => token.length > 2 && !stopWords.has(token))
  );
}

const curatedRelatedToolSlugs = {
  "loci-constructions": ["transformations", "missing-angles", "circle-theorems", "scale-drawing-similar-shapes"],
  "sampling-methods-bias": ["kaizen-large-data-set", "averages-range", "histograms", "cumulative-frequency-curves"],
  "histograms": ["cumulative-frequency-curves", "averages-range", "kaizen-large-data-set", "sampling-methods-bias"],
  "cumulative-frequency-curves": ["histograms", "averages-range", "kaizen-large-data-set", "sampling-methods-bias"],
  "venn-diagrams": ["tree-diagrams-conditional-probability", "permutations-combinations", "binomial-geometric-distribution", "discrete-random-variables"],
  "tree-diagrams-conditional-probability": ["venn-diagrams", "permutations-combinations", "binomial-geometric-distribution", "discrete-random-variables"],
  "permutations-combinations": ["tree-diagrams-conditional-probability", "venn-diagrams", "binomial-geometric-distribution", "discrete-random-variables"],
  "discrete-random-variables": ["binomial-geometric-distribution", "poisson-distribution", "normal-distribution", "hypothesis-testing"],
  "binomial-geometric-distribution": ["poisson-distribution", "discrete-random-variables", "normal-distribution", "confidence-intervals"],
  "poisson-distribution": ["binomial-geometric-distribution", "discrete-random-variables", "normal-distribution", "hypothesis-testing"],
  "normal-distribution": ["confidence-intervals", "poisson-distribution", "binomial-geometric-distribution", "hypothesis-testing"],
  "continuous-random-variables": ["normal-distribution", "poisson-distribution", "discrete-random-variables", "integration"],
  "hypothesis-testing": ["confidence-intervals", "poisson-distribution", "binomial-geometric-distribution", "normal-distribution"],
  "confidence-intervals": ["hypothesis-testing", "normal-distribution", "sampling-methods-bias", "binomial-geometric-distribution"],
  "projectiles": ["equations-of-motion", "motion-graphs-constant-acceleration", "newtons-second-law", "momentum"],
  "momentum": ["projectiles", "equations-of-motion", "newtons-second-law", "motion-graphs-constant-acceleration"],
  "moments": ["newtons-second-law", "projectiles", "equations-of-motion", "motion-graphs-constant-acceleration"],
  "newtons-second-law": ["friction", "work-energy-power", "motion-graphs-constant-acceleration", "equations-of-motion"],
  "friction": ["newtons-second-law", "work-energy-power", "equations-of-motion", "moments"],
  "work-energy-power": ["friction", "newtons-second-law", "equations-of-motion", "motion-graphs-constant-acceleration"],
  "word-search-builder": ["fractions-table", "elementary-starter-board", "elementary-maths-playground", "classroom-displays"],
  "bar-models": ["elementary-manipulatives", "elementary-maths-playground", "fractions-table", "ratio-proportion"],
  "elementary-maths-playground": ["bar-models", "elementary-starter-board", "elementary-manipulatives", "fractions-table"],
  "transformations": ["free-vectors", "scale-drawing-similar-shapes", "straight-lines", "equation-of-a-circle"],
  "circle-theorems": ["missing-angles", "circles-area-circumference", "sectors-arc-length", "trigonometric-ratios"],
  "earth-geometry": ["bearings", "trigonometric-ratios", "circles-area-circumference", "sectors-arc-length"],
  "bearings": ["trigonometric-ratios", "earth-geometry", "missing-angles", "sine-cosine-rule"],
  "fractions-practice": ["fractions", "decimals-practice-lab", "simple-percentage-tasks", "ratio-proportion"],
  "algebraic-fractions": ["factorisation", "advanced-factorisation", "quadratic-factorisation", "linear-equations"],
  "transposition-formulae": ["linear-equations", "substitution", "functions", "algebraic-fractions"],
  "linear-programming": ["inequalities", "straight-lines", "graph-transformations-curve-sketching", "simultaneous-equations"],
  "graph-transformations-curve-sketching": ["functions", "straight-lines", "transformations", "quadratic-equations"],
  "matrices": ["linear-algebra", "advanced-matrices", "further-vectors", "simultaneous-equations"],
  "advanced-matrices": ["linear-algebra", "matrices", "further-vectors", "complex-numbers"],
  "linear-algebra": ["matrices", "advanced-matrices", "further-vectors", "simultaneous-equations"],
  "integration": ["advanced-integration", "volumes-of-revolution", "integration-algebraic-fractions", "differentiation-polynomials"],
  "advanced-integration": ["volumes-of-revolution", "integration-algebraic-fractions", "integration", "differential-equations"],
  "volumes-of-revolution": ["integration", "advanced-integration", "integration-algebraic-fractions", "differentiation-polynomials"],
  "integration-algebraic-fractions": ["partial-fractions", "advanced-integration", "integration", "numerical-methods"],
  "partial-fractions": ["integration-algebraic-fractions", "algebraic-fractions", "advanced-factorisation", "advanced-integration"],
  "complex-numbers": ["polar-coordinates", "roots-of-equations", "trigonometric-functions", "advanced-matrices"],
  "polar-coordinates": ["complex-numbers", "trigonometric-functions", "graph-transformations-curve-sketching", "hyperbolic-functions"],
  "trig-graphs-transformations": ["trig-equation-solver", "trigonometric-functions", "graph-transformations-curve-sketching", "sine-cosine-rule"],
  "roots-of-equations": ["numerical-methods", "complex-numbers", "functions", "graph-transformations-curve-sketching"],
  "numerical-methods": ["roots-of-equations", "integration", "advanced-integration", "differential-equations"],
  "series-expansions": ["differentiation-polynomials", "integration", "advanced-integration", "functions"],
  "differential-equations": ["numerical-methods", "advanced-integration", "differentiation-rules", "trig-differentiation-rules"]
};

function curatedRelatedTools(tool) {
  return (curatedRelatedToolSlugs[tool.slug] || [])
    .map((slug) => tools.find((candidate) => candidate.slug === slug && isVisibleTool(candidate)))
    .filter(Boolean);
}

function relatedToolScore(tool, candidate) {
  let score = 0;
  const group = toolSubjectGroup(tool);
  const candidateGroup = toolSubjectGroup(candidate);
  if (candidate.category === tool.category) score += 20;
  if (group && candidateGroup === group) score += 36;
  if (requiredAccess(candidate) === requiredAccess(tool)) score += 2;
  const sourceTokens = relatedToolTokens(tool);
  const candidateTokens = relatedToolTokens(candidate);
  const overlap = [...sourceTokens].filter((token) => candidateTokens.has(token));
  score += overlap.length * 9;
  const titleOverlap = normalise(candidate.title)
    .split(/[^a-z0-9]+/)
    .filter((token) => sourceTokens.has(token)).length;
  score += titleOverlap * 6;
  return score;
}

function relatedTools(tool) {
  const curated = curatedRelatedTools(tool);
  const candidates = tools
    .filter((candidate) => isVisibleTool(candidate) && candidate.slug !== tool.slug)
    .map((candidate) => ({
      tool: candidate,
      score: relatedToolScore(tool, candidate)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.tool.title.localeCompare(b.tool.title))
    .map((item) => item.tool);

  const fallback = tools
    .filter((candidate) => isVisibleTool(candidate) && candidate.slug !== tool.slug && candidate.category === tool.category)
    .sort((a, b) => a.title.localeCompare(b.title));

  return [...new Map([...curated, ...candidates, ...fallback].map((candidate) => [candidate.slug, candidate])).values()].slice(0, 4);
}

function standardsForTool(tool) {
  const haystack = normalise([tool.title, tool.category, toolSubjectGroup(tool), tool.level, allToolTags(tool).join(" "), tool.description].join(" "));
  const standards = [];

  if (haystack.includes("matrix") || haystack.includes("matrices") || haystack.includes("determinant") || haystack.includes("eigenvalue")) {
    standards.push("England: GCSE and A-Level matrix work where specified, including operations, transformations, determinants, inverses, singular matrices, and algebraic matrix equations.");
    standards.push("Further Mathematics / international routes: matrices, linear transformations, systems, eigenvalues, eigenvectors, and proof-based reasoning where relevant.");
  } else if (haystack.includes("mechanics") || haystack.includes("suvat") || haystack.includes("kinematics") || haystack.includes("equations of motion") || haystack.includes("motion graphs") || haystack.includes("constant acceleration") || haystack.includes("velocity-time") || haystack.includes("distance-time") || haystack.includes("momentum") || haystack.includes("impulse") || haystack.includes("moments") || haystack.includes("projectiles") || haystack.includes("newton") || haystack.includes("f = ma") || haystack.includes("resultant force") || haystack.includes("forces")) {
    standards.push("England: A-Level Mathematics mechanics, including constant acceleration, SUVAT equations, momentum, impulse, moments, forces, projectiles, modelling with units, and motion under gravity.");
    standards.push("IB / international: Applications and interpretation links to kinematics, mechanics modelling, rates of change, forces, and interpreting physical quantities.");
  } else if (haystack.includes("statistics") || haystack.includes("probability") || haystack.includes("tree diagram")) {
    standards.push("Common Core: 7.SP, S-ID, S-CP probability, distributions, and interpreting data.");
    standards.push("England: KS3 probability and data; GCSE Statistics and probability, including expected outcomes where relevant.");
  } else if (haystack.includes("pythagoras") || haystack.includes("hypotenuse")) {
    standards.push("Common Core: 8.G.B.6-8 and HSG-SRT for the Pythagorean theorem, right-triangle reasoning, and modelling with units.");
    standards.push("England: KS3 geometry and measures; GCSE Geometry and measure, including Pythagoras theorem, exact values, perimeter, and area applications.");
  } else if (haystack.includes("circle") || haystack.includes("circumference") || haystack.includes("radius") || haystack.includes("diameter")) {
    standards.push("Common Core: 7.G.B.4, HSG-C, HSG-MG, and HSN-Q for area and circumference of circles, radius, diameter, π, units, and modelling.");
    standards.push("England: KS3 geometry and measures; GCSE Geometry and measure, including circumference and area of circles, reverse problems, and use of π.");
  } else if (haystack.includes("volume") || haystack.includes("surface area") || haystack.includes("prism") || haystack.includes("3d shape")) {
    standards.push("Common Core: 6.G, 7.G, HSG-GMD, HSG-MG, and HSN-Q for volume, surface area, prisms, measurement, units, and modelling.");
    standards.push("England: KS3 geometry and measures; GCSE Geometry and measure, including volume and surface area of prisms, cuboids, triangular prisms, and reverse problems.");
  } else if (haystack.includes("area") || haystack.includes("perimeter") || haystack.includes("volume") || haystack.includes("compound shape")) {
    standards.push("Common Core: 6.G, 7.G, HSG-MG, and HSN-Q for area, composite figures, measurement, units, and modelling.");
    standards.push("England: KS2/KS3 geometry and measures; GCSE Geometry and measure, including perimeter, area of triangles and rectangles, compound shapes, and algebraic dimensions where relevant.");
  } else if (haystack.includes("geometry") || haystack.includes("sine") || haystack.includes("cosine") || haystack.includes("conic") || haystack.includes("straight line")) {
    standards.push("Common Core: HSG-SRT, HSG-GPE, and HSF-IF links to coordinate geometry, trigonometry, and modelling.");
    standards.push("England: KS3 geometry foundations; GCSE Geometry and measures; A-Level coordinate geometry where included.");
  } else if (haystack.includes("calculus") || haystack.includes("differentiation") || haystack.includes("integration")) {
    standards.push("England: A-Level Mathematics calculus, including differentiation, integration, rates of change, and area under curves.");
    standards.push("IB / international: Analysis and approaches links to functions, calculus techniques, and graphical interpretation.");
  } else if (/\b(fraction|decimal|percentage|ratio|hcf|lcm|conversion)\b/.test(haystack)) {
    standards.push("Common Core: 6.RP, 7.RP, 6.NS, 7.NS, and HSN-Q for ratio, number fluency, units, and quantitative reasoning.");
    standards.push("England: KS2/KS3 number fluency; GCSE Number, ratio, proportion, rates of change, and standard units.");
  } else {
    standards.push("Common Core: HSA-SSE, HSA-REI, HSF-IF, and HSF-BF for expressions, equations, functions, and algebraic reasoning.");
    standards.push("England: KS3 algebra foundations; GCSE Algebra; A-Level algebra/functions where the tool extends beyond GCSE.");
  }

  standards.push("Exam-route / regional alignment: supports retrieval practice, procedural fluency, method selection, worked-solution discussion, and independent worksheet practice.");
  return standards;
}

function fallbackTopicMap(tool) {
  return renderToolTopics(tool);
}

function isCurriculumOrMetaTopic(label, tool) {
  const value = normalise(label);
  const compact = value.replace(/[^a-z0-9]/g, "");
  const meta = new Set([
    "katex",
    "worked steps",
    "practice generator",
    "imported",
    "pilot",
    "free",
    "trial",
    "pro",
    "school",
    "admin",
    normalise(tool.category),
    normalise(tool.level),
    normalise(tool.type),
    "ks2",
    "ks3",
    "ks4",
    "ks5",
    "gcse",
    "igcse",
    "a-level",
    "a level",
    "a-level pure",
    "a level pure",
    "a-level statistics",
    "a level statistics",
    "a-level mechanics",
    "a level mechanics",
    "further maths",
    "further pure",
    "pure",
    "common core",
    "csec",
    "cape",
    "ib",
    "ap",
    "aqa",
    "edexcel",
    "ocr"
  ]);
  const compactMeta = new Set([
    "ks2",
    "ks3",
    "ks4",
    "ks5",
    "gcse",
    "igcse",
    "alevel",
    "alevelpure",
    "alevelstatistics",
    "alevelmechanics",
    "furthermaths",
    "furtherpure",
    "pure",
    "commoncore",
    "csec",
    "cape",
    "ib",
    "ap",
    "aqa",
    "edexcel",
    "ocr"
  ]);
  if (meta.has(value) || compactMeta.has(compact)) return true;
  return /\b(ks2|ks3|ks4|ks5|gcse|igcse|a[-\s]?level|aqa|edexcel|ocr|common\s*core|csec|cape|ib|ap)\b/.test(value);
}

function formatTopicLabel(label) {
  const clean = String(label || "")
    .replace(/\s+/g, " ")
    .replace(/\s*\/\s*/g, " / ")
    .trim();
  if (!clean) return "";
  if (/^[A-Z0-9\s/-]+$/.test(clean) && clean.length <= 8) return clean;
  return clean.replace(/[A-Za-z]/, (letter) => letter.toUpperCase());
}

function cleanTopicLabel(label) {
  return String(label || "")
    .replace(/\b(KS2|KS3|KS4|KS5|GCSE|IGCSE|A[-\s]?Level|AQA|Edexcel|OCR|Common\s*Core|CSEC|CAPE|IB|AP)\b/gi, "")
    .replace(/^\s*\b(and|or)\b\s*/gi, "")
    .replace(/\b(and|or)\b\s*$/gi, "")
    .replace(/^[\s:;,\-/]+|[\s:;,\-/]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function toolTopicConcepts(tool) {
  const concepts = [];
  const add = (label) => {
    const formatted = formatTopicLabel(cleanTopicLabel(label));
    if (!formatted || isCurriculumOrMetaTopic(formatted, tool)) return;
    if (!concepts.some((topic) => normalise(topic) === normalise(formatted))) concepts.push(formatted);
  };

  allToolTags(tool).forEach(add);
  if (concepts.length < 4) {
    const titleParts = String(tool.title || "")
      .split(/:|,| and | with /i)
      .map((part) => part.trim())
      .filter((part) => part.length > 2);
    titleParts.forEach(add);
  }

  return concepts.slice(0, 12);
}

function renderToolTopics(tool) {
  const concepts = toolTopicConcepts(tool);
  const visibleConcepts = concepts.length ? concepts.slice(0, 12) : [formatTopicLabel(tool.title)];
  return `
    <div class="topic-map-compact">
      ${renderTopicBulletList(visibleConcepts)}
    </div>
  `;
}

function renderTopicBulletList(topics) {
  return `
    <ul class="topic-bullet-list">
      ${topics.map((topic) => formatTopicLabel(topic)).filter(Boolean).map((topic) => `<li>${escapeHtml(topic)}</li>`).join("")}
    </ul>
  `;
}

function renderTopicMap(levels, tool) {
  if (!levels?.length) return fallbackTopicMap(tool);
  const topics = [];
  levels.forEach((level) => {
    (level.types || []).forEach((type) => {
      const label = String(type.label || type.id || "").trim();
      if (label && !topics.some((topic) => topic.toLowerCase() === label.toLowerCase())) {
        topics.push(label);
      }
    });
  });
  if (!topics.length) return fallbackTopicMap(tool);
  return `
    <div class="topic-map-compact">
      <p class="topic-map-summary">${topics.length} question type${topics.length === 1 ? "" : "s"} available in this tool.</p>
      ${renderTopicBulletList(topics)}
    </div>
  `;
}

function renderStandardsList(tool) {
  return `<ul class="standards-list">${standardsForTool(tool).map((standard) => `<li>${escapeHtml(standard)}</li>`).join("")}</ul>`;
}

function toolCurriculumLinks(tool) {
  const haystack = normalise([tool.title, tool.category, toolSubjectGroup(tool), tool.level, tool.type, tool.description, allToolTags(tool).join(" ")].join(" "));
  const links = [];
  const add = (label) => {
    if (!links.includes(label)) links.push(label);
  };
  const schoolRoute = /\b(ks2|ks3|ks4|gcse|igcse|csec)\b/.test(haystack);
  const advancedRoute = /\b(a[-\s]?level|cape|ib|ap)\b/.test(haystack) || haystack.includes("further maths") || haystack.includes("calculus") || haystack.includes("mechanics");

  if (schoolRoute) {
    add("GCSE");
    add("IGCSE");
    add("CSEC");
    add("CAPE");
    add("AQA");
    add("Edexcel");
    add("OCR");
  }
  if (advancedRoute) {
    add("A-Level");
    add("CAPE");
    add("AP");
    add("IB");
    add("AQA");
    add("Edexcel");
    add("OCR");
  }
  if (haystack.includes("further maths") || haystack.includes("complex") || haystack.includes("matrices") || haystack.includes("polar") || haystack.includes("hyperbolic") || haystack.includes("induction")) add("Further Maths");
  if (haystack.includes("csec")) add("CSEC");
  if (haystack.includes("cape")) add("CAPE");
  if (haystack.includes("common core")) add("Common Core");
  if (haystack.includes("ib") || haystack.includes("international")) add("IB");
  if (haystack.includes("igcse")) add("IGCSE");
  if (!links.length) add("Curriculum-aligned practice");
  return links.slice(0, 10);
}

function toolInfoText(tool) {
  return normalise([
    tool.slug,
    tool.title,
    tool.category,
    toolSubjectGroup(tool),
    tool.level,
    tool.description,
    allToolTags(tool).join(" "),
    toolTopicConcepts(tool).join(" ")
  ].join(" "));
}

function toolInsightProfile(tool) {
  const haystack = toolInfoText(tool);
  const has = (...needles) => needles.some((needle) => haystack.includes(needle));
  const matches = (pattern) => pattern.test(haystack);
  const profiles = [
    {
      match: () => tool.slug === "loci-constructions" || (haystack.includes("loci") && has("constructions", "perpendicular bisector", "angle bisector")),
      misconceptions: [
        "Drawing a single point instead of the complete locus of all points satisfying the condition.",
        "Changing the compass width during a perpendicular-bisector or angle-bisector construction.",
        "Shading the wrong side of a boundary because the inequality or distance condition has not been tested with a sample point."
      ],
      questions: [
        "How can we tell whether this condition creates a circle, a pair of parallel lines, a perpendicular bisector, or an angle bisector?",
        "Which construction marks prove that the line is genuinely a bisector rather than just a visually estimated line?",
        "How could we test one point in the region to confirm that it satisfies every locus condition?"
      ]
    },
    {
      match: () => has("sampling", "bias", "questionnaire", "representative sample"),
      misconceptions: [
        "Describing a sample as representative without checking how the sample was selected.",
        "Confusing random sampling with convenience sampling because both may feel informal in context.",
        "Identifying bias in a question but not explaining how it would affect the responses collected."
      ],
      questions: [
        "Which part of the sampling method could systematically exclude or over-represent a group?",
        "How would you redesign the sampling process so that the results are more likely to represent the target population?",
        "What wording in the question might push respondents toward a particular answer, and how could it be neutralised?"
      ]
    },
    {
      match: () => tool.slug === "cumulative-frequency-curves" || normalise(tool.title).includes("cumulative frequency") || normalise(tool.title).includes("ogive"),
      misconceptions: [
        "Plotting points at class midpoints instead of upper class boundaries for a cumulative frequency curve.",
        "Reading the median or quartiles from the frequency axis instead of projecting correctly from the cumulative frequency value.",
        "Treating an estimate from grouped data as exact without acknowledging that the graph or interpolation is being used."
      ],
      questions: [
        "Why are upper class boundaries used when plotting an ogive?",
        "How does the total frequency determine the median, lower quartile, and upper quartile positions?",
        "What features of the cumulative frequency curve suggest spread, skew, or possible comparison between two groups?"
      ]
    },
    {
      match: () => has("large data set", "data set practice"),
      misconceptions: [
        "Answering from general context knowledge rather than using the variables and coding conventions in the data set.",
        "Ignoring missing values, units, or category codes when interpreting a table or extract.",
        "Making a broad conclusion from a small extract without considering whether it represents the full data set."
      ],
      questions: [
        "Which variables in the data set are relevant to this question, and which are distractions?",
        "How do units, coding, missing values, or outliers affect the calculation or interpretation?",
        "What conclusion is justified by this extract, and what would require access to the wider data set?"
      ]
    },
    {
      match: () => has("discrete random variables", "probability distributions") && !has("binomial", "geometric"),
      misconceptions: [
        "Forgetting that the probabilities in a discrete distribution must add to 1.",
        "Using x values instead of probabilities when calculating an expected value.",
        "Calculating variance without subtracting the square of the mean."
      ],
      questions: [
        "How can the total probability check reveal an error before any expectation calculation begins?",
        "What does the expected value represent in the context of the random variable?",
        "Why does variance use E(X squared) minus the square of E(X), rather than just averaging deviations informally?"
      ]
    },
    {
      match: () => has("continuous random variables", "density functions", "cdf", "probability density"),
      misconceptions: [
        "Reading the height of a density function as a probability instead of using area under the curve.",
        "Forgetting to check that the total area under the density function is 1.",
        "Using the cumulative distribution function without matching the correct interval endpoints."
      ],
      questions: [
        "What area under the density curve corresponds to the probability being requested?",
        "How can integration confirm that this is a valid probability density function?",
        "When is it more efficient to use the density function directly, and when is the cumulative distribution function better?"
      ]
    },
    {
      match: () => tool.slug === "averages-range" || normalise(tool.title).includes("averages") || normalise(tool.title).includes("mean"),
      misconceptions: [
        "Choosing the mean automatically even when an outlier makes the median more representative.",
        "Forgetting to reorder values before finding the median or quartiles.",
        "Solving a missing-value mean problem without first multiplying the mean by the number of values."
      ],
      questions: [
        "Which average best represents this data set, and what feature of the data supports that choice?",
        "How does one extreme value affect the mean, median, mode, and range differently?",
        "What equation is implied when a mean and one missing value are given?"
      ]
    },
    {
      match: () => has("tree diagrams", "conditional probability"),
      misconceptions: [
        "Adding along branches where multiplication is needed for a complete pathway.",
        "Using replacement probabilities when the question says an item is not replaced.",
        "Treating reverse conditional probabilities as if P(A given B) and P(B given A) are the same."
      ],
      questions: [
        "What does each branch represent, and which complete pathways satisfy the event?",
        "How do the second-stage probabilities change when there is no replacement?",
        "How can the tree diagram help distinguish joint probability from conditional probability?"
      ]
    },
    {
      match: () => has("venn diagrams", "set probability"),
      misconceptions: [
        "Placing values in overlapping regions without subtracting the intersection first.",
        "Confusing union with intersection, especially when the word 'or' appears in the question.",
        "Forgetting that values outside both sets still belong to the universal set."
      ],
      questions: [
        "Which region must be filled first so that the rest of the Venn diagram remains consistent?",
        "How can set notation, words, and the shaded region be matched precisely?",
        "What changes when the question asks for a conditional probability from the completed Venn diagram?"
      ]
    },
    {
      match: () => has("circle theorems", "cyclic quadrilateral", "alternate segment theorem"),
      misconceptions: [
        "Naming a circle theorem without checking that the relevant chord, arc, tangent, or centre is actually involved.",
        "Using the cyclic quadrilateral rule on a quadrilateral that has not been shown to be cyclic.",
        "Applying the alternate segment theorem to the wrong angle between the tangent and chord."
      ],
      questions: [
        "Which chord, arc, tangent, or radius justifies the theorem being used here?",
        "How could we mark the diagram so that the theorem chain becomes visible before calculating?",
        "What additional reason would be needed to turn this angle calculation into a proof?"
      ]
    },
    {
      match: () => has("equation of a circle", "circle equations", "tangents") && !has("area", "circumference"),
      misconceptions: [
        "Reading the centre from (x - a) squared + (y - b) squared incorrectly by using the signs as written.",
        "Using the radius squared as the radius when moving between the equation and the diagram.",
        "Finding the gradient of a radius but not using the negative reciprocal for the tangent gradient."
      ],
      questions: [
        "How does the completed-square form reveal the centre and radius of the circle?",
        "What relationship links a tangent to the radius at the point of contact?",
        "How can substitution into the circle equation confirm whether a point lies on, inside, or outside the circle?"
      ]
    },
    {
      match: () => tool.slug === "scale-drawing-similar-shapes" || normalise(tool.title).includes("similar shapes") || normalise(tool.title).includes("scale drawing"),
      misconceptions: [
        "Using the length scale factor directly for area or volume ratio questions.",
        "Matching non-corresponding sides when comparing similar shapes or triangles.",
        "Converting map-scale units inconsistently between centimetres, metres, and kilometres."
      ],
      questions: [
        "Which lengths correspond, and how does that determine the scale factor?",
        "How do perimeter, area, and volume ratios change when the length scale factor changes?",
        "What unit conversion must happen before the scale drawing calculation is meaningful?"
      ]
    },
    {
      match: () => tool.slug === "earth-geometry" || normalise(tool.title).includes("earth geometry"),
      misconceptions: [
        "Treating distance along a parallel of latitude as if it were a great-circle distance.",
        "Using longitude difference without multiplying by cos(latitude) for small-circle distances.",
        "Confusing north-south latitude change with east-west longitude change."
      ],
      questions: [
        "Is this route along a meridian, the equator, or a parallel of latitude?",
        "How does the radius of a small circle depend on the latitude?",
        "What does the sign or direction of the latitude and longitude tell us about the route?"
      ]
    },
    {
      match: () => has("bearings", "clockwise from north", "navigation"),
      misconceptions: [
        "Measuring the angle from east or from the line of travel instead of clockwise from north.",
        "Writing a bearing with fewer than three digits.",
        "Assuming the reverse bearing is found by simply changing the direction word rather than adding or subtracting 180 degrees."
      ],
      questions: [
        "Where is north at the point from which the bearing is being measured?",
        "How can alternate, corresponding, or co-interior angles reveal a hidden bearing?",
        "How would the bearing change if the journey were described in the opposite direction?"
      ]
    },
    {
      match: () => has("upper and lower bounds", "bounds"),
      misconceptions: [
        "Using the rounded value itself as a bound instead of finding the half-unit interval around it.",
        "Choosing the wrong combination of bounds for a maximum or minimum calculation.",
        "Rounding an intermediate result before using it in a compound bound calculation."
      ],
      questions: [
        "What interval of possible values is created by this rounded measurement?",
        "Which combination of upper and lower bounds makes the expression as large or as small as possible?",
        "How does the accuracy of each measurement affect the reliability of the final answer?"
      ]
    },
    {
      match: () => has("hcf", "lcm", "prime factorisation"),
      misconceptions: [
        "Listing common factors but stopping before checking that the highest common factor has been found.",
        "Confusing HCF and LCM when interpreting a sharing or repeating-cycle context.",
        "Using prime factorisation but omitting repeated prime factors in the final product."
      ],
      questions: [
        "Does the context ask for the largest shared group size or the first common repeated amount?",
        "How does the prime factorisation show the difference between HCF and LCM?",
        "What check would confirm that the answer is both a factor or multiple of the required numbers?"
      ]
    },
    {
      match: () => tool.slug === "decimals-practice-lab" || normalise(tool.title).includes("decimal"),
      misconceptions: [
        "Aligning digits by the right edge rather than aligning decimal points.",
        "Treating trailing zeros as changing the value rather than clarifying place value.",
        "Multiplying or dividing by powers of ten by moving the decimal point in the wrong direction."
      ],
      questions: [
        "Which place-value column controls this calculation?",
        "How can adding placeholder zeros make the decimal operation clearer without changing the value?",
        "What estimate should the answer be close to before we calculate exactly?"
      ]
    },
    {
      match: () => tool.slug.includes("percentage") || normalise(tool.title).includes("percentage"),
      misconceptions: [
        "Calculating a percentage change from the new value instead of the original value.",
        "Treating successive percentage changes as if they can be added directly.",
        "Using the multiplier for an increase when the question describes a decrease, or vice versa."
      ],
      questions: [
        "What is the original whole in this percentage problem?",
        "Which multiplier represents the change, and how does it show increase or decrease?",
        "Why do repeated percentage changes need multiplicative reasoning rather than addition?"
      ]
    },
    {
      match: () => tool.slug === "ratio-proportion" || normalise(tool.title).includes("ratio") || normalise(tool.title).includes("proportion"),
      misconceptions: [
        "Adding ratio parts incorrectly when sharing a total amount.",
        "Scaling only one side of a ratio and breaking the proportional relationship.",
        "Confusing direct proportion with inverse proportion in contextual questions."
      ],
      questions: [
        "What does one part of the ratio represent in this context?",
        "How can we tell whether both quantities should increase together or one should decrease as the other increases?",
        "Which representation, table, equation, or diagram, makes the proportional relationship clearest?"
      ]
    },
    {
      match: () => has("powers of 10", "standard form", "scientific notation"),
      misconceptions: [
        "Writing a standard-form coefficient that is not between 1 and 10.",
        "Moving the decimal point but giving the power of ten the wrong sign.",
        "Combining numbers in standard form without applying index laws correctly."
      ],
      questions: [
        "How does the size of the original number determine the sign of the power of ten?",
        "What makes a number correctly written in standard form?",
        "How can estimation help check whether the standard-form calculation has the correct magnitude?"
      ]
    },
    {
      match: () => tool.slug === "number-bases-number-sets" || normalise(tool.title).includes("number bases"),
      misconceptions: [
        "Reading a number in another base as if each place value were a power of ten.",
        "Forgetting that digits must be smaller than the base being used.",
        "Placing a number in a set without checking all defining properties, such as integer, rational, prime, or square."
      ],
      questions: [
        "What are the place values in this base, and how do they differ from base ten?",
        "Which digits are allowed in this base, and why?",
        "What property determines whether the number belongs in this number set?"
      ]
    },
    {
      match: () => has("projectile"),
      misconceptions: [
        "Using the initial speed directly in vertical or horizontal equations without resolving into components.",
        "Applying vertical acceleration to horizontal motion when air resistance is ignored.",
        "Using total time of flight when the question asks for time to maximum height, or the reverse."
      ],
      questions: [
        "Which component of velocity controls the vertical motion, and which controls the horizontal motion?",
        "What assumption allows horizontal velocity to remain constant?",
        "How can the symmetry of the vertical motion help check the time or range?"
      ]
    },
    {
      match: () => tool.slug === "moments" || normalise(tool.title).includes("moments"),
      misconceptions: [
        "Using mass instead of weight when calculating a moment.",
        "Measuring distance from the wrong pivot or not using the perpendicular distance.",
        "Adding clockwise and anticlockwise moments without assigning a clear direction convention."
      ],
      questions: [
        "Where is the pivot, and what is the perpendicular distance from the line of action?",
        "Which moments are clockwise and which are anticlockwise?",
        "How does the principle of moments express rotational equilibrium in this problem?"
      ]
    },
    {
      match: () => has("momentum", "impulse"),
      misconceptions: [
        "Treating momentum as a scalar and losing the direction of motion.",
        "Using conservation of momentum when an external impulse is acting on the system.",
        "Confusing impulse with force by ignoring the time interval."
      ],
      questions: [
        "What sign convention will represent the direction of each velocity?",
        "Is the system isolated, or is there an external force changing the total momentum?",
        "How does the impulse connect the force-time information to the change in momentum?"
      ]
    },
    {
      match: () => has("newton", "f = ma", "resultant force"),
      misconceptions: [
        "Using F = ma with one force instead of the resultant force.",
        "Substituting weight for mass without using W = mg.",
        "Ignoring opposing forces such as friction or resistance when forming the resultant."
      ],
      questions: [
        "What is the resultant force in the chosen positive direction?",
        "Which quantity is mass, which is weight, and which is acceleration?",
        "How would the acceleration change if one opposing force were increased?"
      ]
    },
    {
      match: () => has("classroom displays", "blank diagrams", "board displays"),
      misconceptions: [
        "Using a display as a completed answer rather than as a prompt for annotation and discussion.",
        "Labelling a diagram before students have had time to interpret its structure.",
        "Choosing a diagram that does not match the mathematical relationship being explained."
      ],
      questions: [
        "What should students notice before any labels or measurements are added?",
        "Which features of this blank diagram are essential, and which are open for teacher annotation?",
        "How could the same display be adapted for a misconception, a proof, or a worked example?"
      ]
    },
    {
      match: () => tool.slug === "bar-models" || has("bar models", "singapore maths"),
      misconceptions: [
        "Treating every bar as the same whole when the problem involves a change, comparison, or reverse percentage.",
        "Dividing by the numerator instead of the denominator when finding one equal part in a fraction model.",
        "Using the final amount as 100% in a reverse percentage problem instead of recognising that it represents more or less than the original whole.",
        "Sharing a ratio by the number of people or categories rather than by the total number of ratio parts.",
        "Writing a calculation from the numbers in the question before deciding what each bar, part, or box represents."
      ],
      questions: [
        "Which quantity is the whole in this model, and how do we know?",
        "What does one equal part represent before we calculate the final answer?",
        "How does the bar change when the problem describes an increase, decrease, comparison, or reverse percentage?",
        "Where is the unknown shown in the model, and what operation will isolate it?",
        "How could a pupil use the same bar model to explain the calculation without relying on a memorised rule?"
      ]
    },
    {
      match: () => has("manipulatives", "starter board", "primary", "elementary"),
      misconceptions: [
        "Revealing the numerical answer before students have interpreted the visual model.",
        "Counting objects one by one when the model is designed to develop grouping or place-value reasoning.",
        "Treating the visual representation as decoration rather than as evidence for the mathematical claim."
      ],
      questions: [
        "What structure can students see before they calculate?",
        "How many different representations can show the same number or relationship?",
        "What would change in the model if the number, operation, or comparison changed?"
      ]
    },
    {
      match: () => has("surds", "radicals"),
      misconceptions: [
        "Simplifying a square root by splitting over addition, for example treating root(a + b) as root a + root b.",
        "Missing square factors inside the radical before rationalising or expanding.",
        "Using conjugates without checking that the middle surd terms cancel."
      ],
      questions: [
        "Which square factor can be extracted from the surd, and how do we know it is the largest useful one?",
        "How does the conjugate create a difference of two squares?",
        "What evidence shows that the final expression is fully simplified?"
      ]
    },
    {
      match: () => tool.slug === "absolute-values" || normalise(tool.title).includes("absolute value") || normalise(tool.title).includes("modulus"),
      misconceptions: [
        "Solving only the positive case and missing the negative case of an absolute-value equation.",
        "Treating |x - a| as x - a without considering the sign of x - a.",
        "Graphing a modulus function without reflecting the negative part above the x-axis."
      ],
      questions: [
        "What distance interpretation does this modulus expression have?",
        "Where does the expression inside the modulus change sign?",
        "How do the algebraic cases connect to the shape of the modulus graph?"
      ]
    },
    {
      match: () => has("roots of equations", "transformations of roots"),
      misconceptions: [
        "Changing roots without updating the polynomial coefficients consistently.",
        "Using sum and product of roots formulas with the wrong sign.",
        "Assuming transformed roots preserve the original equation rather than creating a new equation."
      ],
      questions: [
        "Which symmetric sums of the roots are needed to build the new equation?",
        "How does the transformation of each root affect the sum, product, or pairwise products?",
        "How can substituting a transformed root back into the new equation verify the result?"
      ]
    },
    {
      match: () => has("hyperbolic"),
      misconceptions: [
        "Treating hyperbolic identities as if every circular trigonometric identity has the same sign pattern.",
        "Forgetting the definitions of sinh, cosh, and tanh in terms of exponential functions.",
        "Using inverse hyperbolic forms without checking domain restrictions."
      ],
      questions: [
        "How do the exponential definitions explain the signs in the hyperbolic identities?",
        "Which hyperbolic identity is structurally similar to a trigonometric identity, and where does it differ?",
        "What domain or range condition is required for the inverse hyperbolic expression?"
      ]
    },
    {
      match: () => has("algebraic fractions"),
      misconceptions: [
        "Cancelling a factor that is only part of a sum, for example cancelling x in x + 3 over x.",
        "Finding a common denominator but failing to multiply every term in the numerator.",
        "Solving an algebraic-fraction equation without excluding values that make a denominator zero."
      ],
      questions: [
        "How can we decide whether a term is safe to cancel, or whether it must be factorised first?",
        "What changes in the structure of the expression when we move from simplifying to solving an equation?",
        "How would you convince someone that an excluded value cannot be accepted even if it satisfies the final line?"
      ]
    },
    {
      match: () => has("substitution") && !has("integration", "integral"),
      misconceptions: [
        "Substituting a negative value without brackets, so powers and signs are evaluated incorrectly.",
        "Treating 3x as 3 + x instead of 3 multiplied by x.",
        "Forgetting to substitute for every occurrence of the variable in an expression."
      ],
      questions: [
        "Where would brackets change the value of this substitution, and why?",
        "How can the structure of the expression tell us the correct order of calculation after substitution?",
        "What substitution would make this expression easiest to evaluate, and what would make it most error-prone?"
      ]
    },
    {
      match: () => has("quadratic") && !has("binomial expansion"),
      misconceptions: [
        "Using the quadratic formula before first writing the equation equal to zero.",
        "Losing the negative sign in -b or in the discriminant b squared minus 4ac.",
        "Assuming a quadratic has integer factors when the discriminant is not a square number."
      ],
      questions: [
        "What does the discriminant tell us before we attempt to solve the quadratic?",
        "How would you choose between factorising, completing the square, and using the formula for this equation?",
        "How can the graph of the quadratic help us evaluate whether the solutions are reasonable?"
      ]
    },
    {
      match: () => has("factorisation", "factorising", "factor theorem", "difference of squares", "grouping") && !has("binomial expansion"),
      misconceptions: [
        "Missing the highest common factor before trying a more advanced factorisation method.",
        "Recognising a difference of squares but writing the two brackets with the same sign.",
        "Factorising by grouping without checking that the repeated bracket is identical."
      ],
      questions: [
        "What feature of the expression tells us which factorisation method should come first?",
        "How can we verify a factorisation without relying on the answer key?",
        "When an expression has several possible first moves, which route gives the most complete factorisation?"
      ]
    },
    {
      match: () => has("matrices", "matrix"),
      misconceptions: [
        "Multiplying matrices entry-by-entry instead of using row-by-column products.",
        "Assuming AB and BA must be equal because ordinary multiplication is commutative.",
        "Treating two matrices as equal without checking every corresponding entry."
      ],
      questions: [
        "What information does the order of a matrix give us before we try to multiply it?",
        "How can a single entry in a product matrix reveal the row-by-column structure of the whole calculation?",
        "If two matrices are equal, how can we use corresponding entries to build a system of equations?"
      ]
    },
    {
      match: () => has("complex numbers", "polar form", "de moivre"),
      misconceptions: [
        "Mixing degrees and radians when working with arguments.",
        "Choosing the wrong quadrant for the argument after finding an inverse tangent value.",
        "Taking roots of a complex number but missing the full set of equally spaced arguments."
      ],
      questions: [
        "How does the position of the complex number on the Argand diagram control the argument we choose?",
        "Why do roots of a complex number form a regular pattern rather than a single answer?",
        "Which form, Cartesian or polar, gives the clearest route for this operation, and why?"
      ]
    },
    {
      match: () => has("polar coordinates", "polar curves"),
      misconceptions: [
        "Treating r as if it must always be positive and ignoring equivalent polar representations.",
        "Substituting theta values without considering symmetry or the interval being used.",
        "Sketching a polar curve from Cartesian habits instead of analysing how r changes with theta."
      ],
      questions: [
        "What does a negative value of r mean geometrically in this polar representation?",
        "How can symmetry reduce the amount of calculation needed to understand the curve?",
        "Which key theta values would best reveal the shape of the polar curve, and why?"
      ]
    },
    {
      match: () => has("proof by induction", "induction"),
      misconceptions: [
        "Checking the base case but not proving the inductive step from k to k + 1.",
        "Assuming the result for k + 1 instead of using the assumption for k.",
        "Writing a conclusion that does not explicitly connect the base case and inductive step."
      ],
      questions: [
        "Where exactly is the inductive hypothesis used in the proof?",
        "Why does proving the k to k + 1 step not prove the result unless the base case is also true?",
        "How would the proof fail if the algebraic rearrangement in the inductive step were not justified?"
      ]
    },
    {
      match: () => has("series expansions", "taylor", "maclaurin"),
      misconceptions: [
        "Substituting into a known expansion without checking the required form and interval of validity.",
        "Dropping powers or factorial denominators when building terms from derivatives.",
        "Confusing the degree of approximation with the number of non-zero terms used."
      ],
      questions: [
        "What substitution transforms this expression into a standard Taylor or Maclaurin expansion?",
        "How does the required accuracy or power determine where the expansion should stop?",
        "How can we evaluate whether the approximation is valid for the value being substituted?"
      ]
    },
    {
      match: () => has("differential equations"),
      misconceptions: [
        "Separating variables without moving all y terms to one side and all x terms to the other.",
        "Forgetting the integrating factor in a first-order linear differential equation.",
        "Solving the complementary equation but not adding the particular integral where one is required."
      ],
      questions: [
        "What feature tells us whether this differential equation is separable, linear, or second order?",
        "How does the arbitrary constant connect the family of solutions to a particular solution?",
        "What does the solution mean in the modelling context, and how could we test its reasonableness?"
      ]
    },
    {
      match: () => tool.slug === "free-vectors" || tool.slug === "further-vectors" || normalise(tool.title).includes("vector"),
      misconceptions: [
        "Writing a vector as a coordinate point and losing its direction-and-displacement meaning.",
        "Using a scalar parameter inconsistently across the x, y, and z components.",
        "Assuming two vectors are parallel because one component is proportional."
      ],
      questions: [
        "What is the difference between a point, a position vector, and a direction vector in this question?",
        "How can component equations help us test whether a point lies on a line or plane?",
        "What evidence would prove that two vector descriptions represent the same geometric object?"
      ]
    },
    {
      match: () => has("logarithm", "exponential") && !has("integration", "integral"),
      misconceptions: [
        "Applying a log law across addition, for example treating log(a + b) as log a + log b.",
        "Solving an exponential equation but leaving the answer as an unevaluated log expression when a numerical value is required.",
        "Forgetting that logarithmic arguments must be positive."
      ],
      questions: [
        "Which log law is justified by the structure of this expression, and which law would be invalid here?",
        "How can we check whether a solution is allowed in the original logarithmic equation?",
        "When is an exact logarithmic answer more useful, and when should it be evaluated?"
      ]
    },
    {
      match: () => has("function notation", "composite", "inverse function") || haystack.includes(" functions "),
      misconceptions: [
        "Reversing the order in a composite function, treating fg(x) as gf(x).",
        "Finding an inverse function without first replacing f(x) with y and swapping x and y.",
        "Ignoring domain restrictions that determine whether an inverse is valid."
      ],
      questions: [
        "How does the notation tell us which function acts first in a composite?",
        "What restriction would make this function one-to-one, and why does that matter?",
        "How can a graph help us evaluate whether the inverse function makes sense?"
      ]
    },
    {
      match: () => has("binomial expansion"),
      misconceptions: [
        "Using the row of Pascal's triangle for n but forgetting the powers must descend and ascend.",
        "Applying the binomial coefficient correctly but not raising the coefficient inside the bracket to the required power.",
        "Treating a negative term in the bracket as positive in every term of the expansion."
      ],
      questions: [
        "How does the structure of the bracket control the sign, coefficient, and power in each term?",
        "Which term can be found directly without expanding the whole expression, and why?",
        "How can we use symmetry or coefficient comparison to evaluate whether an expansion is plausible?"
      ]
    },
    {
      match: () => has("straight line", "gradient", "linear graph"),
      misconceptions: [
        "Using change in x over change in y instead of change in y over change in x for gradient.",
        "Confusing the y-intercept with a point where the line crosses the x-axis.",
        "Using the reciprocal rather than the negative reciprocal for perpendicular gradients."
      ],
      questions: [
        "What does the sign of the gradient tell us about the direction of the line?",
        "How can two different forms of the same line equation reveal different information?",
        "How would you prove that two lines are parallel or perpendicular without drawing them?"
      ]
    },
    {
      match: () => has("transformation", "translation", "reflection", "rotation", "enlargement"),
      misconceptions: [
        "Describing a transformation without giving the full information, such as omitting the mirror line, centre, direction, or scale factor.",
        "Rotating around the origin when the question gives a different centre of rotation.",
        "Using the length scale factor directly for an enlargement but not applying it from the centre to every vertex."
      ],
      questions: [
        "What information is required to describe this transformation so that another person could reproduce it exactly?",
        "How can the coordinates of one vertex predict where every other vertex should go under this transformation?",
        "What changes, and what stays invariant, when a shape is translated, reflected, rotated, or enlarged?"
      ]
    },
    {
      match: () => has("differentiation", "derivative", "tangent", "normal") && !has("integration", "integral"),
      misconceptions: [
        "Reducing the power but forgetting to multiply by the original power.",
        "Using the derivative value as a y-coordinate rather than as a gradient.",
        "Finding a tangent gradient but not substituting the original x value into the original function."
      ],
      questions: [
        "What does the derivative represent in this specific context?",
        "How can we move from a derivative to the equation of a tangent or normal?",
        "How would the graph behave at a point where the derivative is zero?"
      ]
    },
    {
      match: () => has("integration", "integral"),
      misconceptions: [
        "Increasing the power but forgetting to divide by the new power.",
        "Dropping the constant of integration in an indefinite integral.",
        "Evaluating a definite integral by substituting only the upper limit."
      ],
      questions: [
        "What feature of the integrand suggests the integration method to use?",
        "How does a definite integral connect symbolic working to an area or accumulated quantity?",
        "How can differentiation be used to evaluate whether the integration result is correct?"
      ]
    },
    {
      match: () => has("partial fractions"),
      misconceptions: [
        "Starting decomposition before checking whether the fraction is improper.",
        "Using a constant numerator over an irreducible quadratic factor when a linear numerator is needed.",
        "Equating coefficients before multiplying through by the full denominator."
      ],
      questions: [
        "What does the denominator structure tell us about the form of the decomposition?",
        "Why must an improper rational fraction be divided before partial fractions are used?",
        "How can substitution values and coefficient comparison support each other in the same solution?"
      ]
    },
    {
      match: () => has("trig", "sine", "cosine", "tangent"),
      misconceptions: [
        "Choosing a trigonometric ratio before identifying opposite, adjacent, and hypotenuse correctly.",
        "Using the sine rule in a triangle where the cosine rule is required.",
        "Solving a trigonometric equation but missing solutions in the required interval."
      ],
      questions: [
        "What information in the diagram determines whether this is a right-triangle or non-right-triangle method?",
        "How can symmetry in the trig graph help us find all valid solutions?",
        "Which representation, diagram, graph, or equation, gives the strongest justification for the method?"
      ]
    },
    {
      match: () => has("normal distribution", "standardisation", "z value"),
      misconceptions: [
        "Standardising with sigma squared instead of sigma.",
        "Using the wrong tail after converting from X to Z.",
        "Reading a table value as a right-tail probability when the table gives Phi(z)."
      ],
      questions: [
        "How does the inequality change, or stay the same, when we standardise X to Z?",
        "What does the area under the curve represent in this context?",
        "How can a sketch help us evaluate whether a probability should be less than or greater than 0.5?"
      ]
    },
    {
      match: () => has("binomial distribution", "geometric distribution"),
      misconceptions: [
        "Using a binomial model when the number of trials is not fixed.",
        "Confusing P(X = x) with P(X less than or equal to x).",
        "Forgetting that a geometric model counts trials up to and including the first success."
      ],
      questions: [
        "What assumptions must be true before this distribution is a valid model?",
        "How does the wording of the question determine whether we need exact or cumulative probability?",
        "What would change in the calculation if the random variable were redefined?"
      ]
    },
    {
      match: () => has("hypothesis testing", "inference"),
      misconceptions: [
        "Choosing a one-tailed test when the alternative hypothesis is two-tailed.",
        "Comparing a probability with the wrong significance level.",
        "Writing a conclusion about the sample instead of the population claim."
      ],
      questions: [
        "What wording in the context determines the alternative hypothesis?",
        "How strong is the evidence against the null hypothesis, and what does the test not prove?",
        "How would the conclusion change if the significance level were made more strict?"
      ]
    },
    {
      match: () => has("histogram", "frequency density"),
      misconceptions: [
        "Reading bar height as frequency when class widths are unequal.",
        "Calculating frequency density using class midpoint instead of class width.",
        "Comparing bars by height rather than by area when estimating frequency."
      ],
      questions: [
        "Why does area, not height alone, represent frequency in a histogram?",
        "How does changing class width affect the visual interpretation of the data?",
        "What can and cannot be concluded from the modal class of this histogram?"
      ]
    },
    {
      match: () => has("correlation", "regression"),
      misconceptions: [
        "Interpreting correlation as proof that one variable causes the other.",
        "Using the regression line outside the range of the data without considering extrapolation.",
        "Mixing up y on x and x on y regression lines."
      ],
      questions: [
        "What does the size and sign of r tell us, and what does it not tell us?",
        "When is interpolation reasonable, and when does prediction become unreliable?",
        "How would the interpretation change if the explanatory and response variables were swapped?"
      ]
    },
    {
      match: () => has("probability", "tree diagram", "venn", "set notation"),
      misconceptions: [
        "Adding probabilities for combined events when multiplication is required.",
        "Treating events as independent without checking the wording or diagram.",
        "Misreading union, intersection, and complement regions in a Venn diagram."
      ],
      questions: [
        "What does the structure of the diagram tell us about whether events are independent or conditional?",
        "How can we represent the same probability using words, notation, and a diagram?",
        "Which region or branch is being counted twice, and how should we adjust for it?"
      ]
    },
    {
      match: () => has("suvat", "equations of motion", "motion graphs", "constant acceleration"),
      misconceptions: [
        "Using SUVAT when acceleration is not constant.",
        "Confusing displacement with distance travelled.",
        "Reading the gradient and area of velocity-time graphs the wrong way round."
      ],
      questions: [
        "What modelling assumption allows us to use constant-acceleration formulae here?",
        "How do the graph, equation, and physical context each represent the same motion?",
        "How would the solution change if direction were treated explicitly with signs?"
      ]
    },
    {
      match: () => has("newton", "force", "f = ma", "moments", "momentum", "projectile"),
      misconceptions: [
        "Using mass as weight without multiplying by g where weight is needed.",
        "Combining forces without assigning a consistent positive direction.",
        "Resolving a force or velocity into components but using the wrong trigonometric component."
      ],
      questions: [
        "Which forces or components are acting in the direction we have chosen as positive?",
        "How does the model simplify the real situation, and what effect might that have on the answer?",
        "What conservation law or equilibrium condition is being used, and why is it valid here?"
      ]
    },
    {
      match: () => has("circle", "area", "volume", "surface area", "similar shapes", "pythagoras", "bearing", "angle", "geometry"),
      misconceptions: [
        "Using a length scale factor directly for area or volume problems.",
        "Selecting a formula that matches the shape name but not the measurement being asked for.",
        "Assuming a diagram is drawn to scale when the given information says otherwise."
      ],
      questions: [
        "Which measurements are lengths, areas, or volumes, and how does that affect the method?",
        "What hidden right triangle, angle relationship, or similarity relationship is driving the solution?",
        "How could we redraw or annotate the diagram to make the mathematical structure clearer?"
      ]
    },
    {
      match: () => has("fraction", "decimal", "percentage", "ratio", "hcf", "lcm", "bounds", "standard form", "number bases"),
      misconceptions: [
        "Changing the representation of a number without preserving its value.",
        "Cancelling or simplifying before checking that the operation allows it.",
        "Rounding during intermediate steps and carrying that inaccuracy into the final answer."
      ],
      questions: [
        "Which representation makes the calculation most efficient, and why?",
        "How can we estimate first so that we can evaluate whether the exact answer is sensible?",
        "What structure in the numbers reveals the factor, multiple, place-value, or proportional relationship?"
      ]
    },
    {
      match: () => tool.slug === "graph-transformations-curve-sketching" || has("graph transformations", "curve sketching", "parent graphs"),
      misconceptions: [
        "Interpreting f(x - a) as a movement left instead of recognising that the graph moves right by a units.",
        "Using a vertical stretch rule for f(ax) instead of applying the reciprocal horizontal scale factor to x-coordinates.",
        "Sketching curves from memory without first locating intercepts, asymptotes, turning points, or invariant points."
      ],
      questions: [
        "Which key points on the original graph are easiest to transform, and why are they enough to guide the sketch?",
        "What stays fixed under this transformation, and what changes in the equation, coordinates, and graph?",
        "Which features must be shown for this curve sketch to communicate the function accurately?"
      ]
    },
    {
      match: () => tool.slug === "trig-graphs-transformations" || has("trig graphs", "sine graph", "cosine graph", "tangent graph", "phase shift", "amplitude"),
      misconceptions: [
        "Multiplying the period by the coefficient inside the function instead of dividing 360 degrees or 180 degrees by that coefficient.",
        "Treating tangent graphs as if they have amplitude, rather than focusing on period, midline, intercepts, and asymptotes.",
        "Reading sin(x - a) or cos(x - a) as a shift left instead of recognising the shift right by a degrees."
      ],
      questions: [
        "Which graph feature is controlled by each part of the equation: amplitude, period, phase shift, and midline?",
        "Where should the key points or asymptotes be placed before drawing the curve?",
        "How can the same transformed trig graph be described using both equation language and geometric movement on the axes?"
      ]
    },
    {
      match: () => tool.slug === "transposition-formulae" || has("transposition", "changing the subject", "rearranging formulae"),
      misconceptions: [
        "Moving a term across the equals sign as a shortcut without preserving balance through an inverse operation on both sides.",
        "Dividing only the nearest term instead of dividing the whole side or whole bracket by the coefficient.",
        "Squaring or square-rooting too early before the square-root or squared term has been isolated."
      ],
      questions: [
        "Which operation is the outermost operation around the subject, and therefore the first one that should be undone?",
        "Where does the subject appear more than once, and how can we collect those terms before dividing?",
        "What restriction, plus-or-minus case, or denominator condition needs to be considered after the rearrangement?"
      ]
    },
    {
      match: () => matches(/equation|inequalit|simultaneous|linear/),
      misconceptions: [
        "Performing an operation on one side of an equation but not the other.",
        "Changing the direction of an inequality without recognising when multiplication or division by a negative has occurred.",
        "Eliminating a variable in simultaneous equations without first matching coefficients correctly."
      ],
      questions: [
        "What operation would undo the current structure while preserving equivalence?",
        "How can we prove that each transformation keeps the solution set unchanged?",
        "Which representation, symbolic, graphical, or contextual, gives the clearest meaning of the solution?"
      ]
    }
  ];

  return profiles.find((profile) => profile.match()) || topicFallbackInsightProfile(tool);
}

function topicFallbackInsightProfile(tool) {
  const concepts = toolTopicConcepts(tool);
  const primary = concepts[0] || formatTopicLabel(tool.title);
  const secondary = concepts[1] || toolSubjectGroup(tool) || tool.category;
  const topic = formatTopicLabel(primary);
  const supporting = formatTopicLabel(secondary);

  if (tool.category === "Geometry") {
    return {
      misconceptions: [
        `Assuming a ${topic} diagram is drawn to scale instead of relying on the given measurements and relationships.`,
        `Using a familiar geometry fact before checking that the required angle, length, or shape condition is actually present.`,
        `Not marking equal lengths, parallel lines, right angles, or known angle facts before starting the calculation.`
      ],
      questions: [
        `Which facts in the diagram prove that the ${topic} method is valid?`,
        `What extra line, label, or construction would make the ${supporting} relationship easier to see?`,
        `How could we check whether the final angle, length, or region is consistent with the original diagram?`
      ]
    };
  }

  if (tool.category === "Statistics") {
    return {
      misconceptions: [
        `Applying a ${topic} procedure without first identifying the variable, sample, event, or distribution being modelled.`,
        `Using a calculation correctly but interpreting it as a stronger conclusion than the data allows.`,
        `Ignoring whether the question asks for an exact probability, a cumulative probability, an estimate, or an interpretation.`
      ],
      questions: [
        `What does the ${topic} value represent in the context of this data or probability model?`,
        `Which assumption or condition must be checked before using this ${supporting} method?`,
        `What conclusion is justified by the calculation, and what would require more evidence?`
      ]
    };
  }

  if (tool.category === "Mechanics") {
    return {
      misconceptions: [
        `Using a ${topic} formula without defining the positive direction and units first.`,
        `Substituting values before deciding whether the situation involves equilibrium, constant acceleration, conservation, or resultant force.`,
        `Treating the mathematical answer as complete without interpreting its sign, direction, or physical meaning.`
      ],
      questions: [
        `What is the modelling assumption that makes the ${topic} method valid here?`,
        `Which forces, velocities, distances, or time intervals belong in the ${supporting} relationship?`,
        `How would the result change if the chosen positive direction or modelling assumption changed?`
      ]
    };
  }

  if (tool.category === "Numbers") {
    return {
      misconceptions: [
        `Changing the representation in a ${topic} question without preserving the value of the number.`,
        `Rounding or simplifying too early and carrying an avoidable error into the final answer.`,
        `Choosing an operation because it looks familiar rather than because the place-value, factor, or proportional structure requires it.`
      ],
      questions: [
        `Which representation makes this ${topic} calculation clearest, and why?`,
        `What estimate can we make before calculating so that the final answer can be checked?`,
        `What structure in the numbers shows whether this is a ${supporting} problem or a different number skill?`
      ]
    };
  }

  if (tool.category === "Classroom Tools") {
    return {
      misconceptions: [
        `Using the ${topic} display as a finished answer rather than as a prompt for teacher questioning and annotation.`,
        `Revealing labels or answers before students have interpreted the visual structure.`,
        `Choosing a display that does not match the mathematical relationship being discussed.`
      ],
      questions: [
        `What should students notice first in this ${topic} display?`,
        `What could the teacher add, hide, or annotate to expose the key ${supporting} idea?`,
        `How could this same display be reused for retrieval, modelling, or misconception checking?`
      ]
    };
  }

  return {
    misconceptions: [
      `Treating ${topic} as a memorised procedure instead of checking the algebraic structure first.`,
      `Dropping signs, brackets, powers, or restrictions while working through the ${supporting} step.`,
      `Giving a final answer without substituting back or checking it against the original conditions.`
    ],
    questions: [
      `What feature of the expression or equation tells us that the ${topic} method is appropriate?`,
      `Which step in the ${supporting} method most needs justification, and why?`,
      `How could we verify the final answer using substitution, expansion, a graph, or an alternative method?`
    ]
  };
}

function toolMisconceptions(tool) {
  return toolInsightProfile(tool).misconceptions;
}

function toolClassroomQuestions(tool) {
  return toolInsightProfile(tool).questions;
}

function toolUseSuggestions(tool) {
  return [
    "Use one example for teacher modelling before moving to a short practice set.",
    "Ask students to explain the first step before revealing the worked solution.",
    "Use the answers to check fluency, then use the worked steps to discuss misconceptions.",
    "Send a focused set to the worksheet builder when the class needs independent practice."
  ];
}

function renderToolInfoList(items, className = "") {
  return `<ul class="${className || "tool-info-list"}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderToolInfoBadges(items) {
  return `<div class="tool-info-badges">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`;
}

function renderRelatedTools(tool) {
  const related = relatedTools(tool);
  if (!related.length) return `<p class="tool-info-muted">Related tools will appear as the library grows.</p>`;
  return `
    <ul class="tool-info-related-list">
      ${related.map((item) => `<li><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(toolSubjectGroup(item) || item.category)}</span></li>`).join("")}
    </ul>
  `;
}

function renderRelatedToolTextList(items) {
  const values = (items || []).map((item) => String(item || "").trim()).filter(Boolean);
  if (!values.length) return `<p class="tool-info-muted">Related tools will appear as the library grows.</p>`;
  return `
    <ul class="tool-info-related-list">
      ${values.map((item) => {
        const parts = item.split(/\s+—\s+|\s+-\s+/);
        const title = parts[0] || item;
        const label = parts.slice(1).join(" — ");
        return `<li><strong>${escapeHtml(title)}</strong>${label ? `<span>${escapeHtml(label)}</span>` : ""}</li>`;
      }).join("")}
    </ul>
  `;
}

function renderToolInfoAdminEditor(tool, info) {
  if (!isAdmin()) return "";
  const fields = [
    ["topics", "Topics Covered"],
    ["teacher_guidance", "Teacher Guidance"],
    ["standards", "Mathematical Standards Covered"],
    ["misconceptions", "Common Misconceptions"],
    ["classroom_questions", "Inquiry Questions"],
    ["related_tools", "Related Tools"],
    ["suggested_use", "Suggested Use"]
  ];
  return `
    <section class="tool-info-admin-editor" aria-label="Admin edit tool information">
      <div class="tool-info-admin-head">
        <div>
          <span class="eyebrow">Admin Edit</span>
          <h2>Edit Tool Information Boxes</h2>
          <p>Each line becomes one bullet point. Leave a box blank to fall back to the generated default for this tool.</p>
        </div>
        <div class="button-row">
          <button class="button primary" type="button" id="saveToolInfoEdits">Save Tool Info</button>
        </div>
      </div>
      <p class="tool-info-admin-status" id="toolInfoAdminStatus">Edits affect this tool information page after saving.</p>
      <div class="tool-info-admin-grid">
        ${fields.map(([key, label]) => `
          <label>
            ${escapeHtml(label)}
            <textarea data-tool-info-field="${escapeHtml(key)}" rows="${key === "standards" ? 5 : 4}">${escapeHtml((info[key] || []).join("\n"))}</textarea>
          </label>
        `).join("")}
      </div>
    </section>
  `;
}

function bindToolInfoAdminEditor(tool) {
  const saveButton = document.getElementById("saveToolInfoEdits");
  if (!saveButton) return;
  const status = document.getElementById("toolInfoAdminStatus");
  saveButton.addEventListener("click", async () => {
    const fields = Object.fromEntries([...document.querySelectorAll("[data-tool-info-field]")]
      .map((field) => [field.dataset.toolInfoField, splitEditableLines(field.value)]));
    const blankFields = [...document.querySelectorAll("[data-tool-info-field]")]
      .filter((field) => !field.value.trim())
      .map((field) => field.closest("label")?.childNodes?.[0]?.textContent?.trim() || field.dataset.toolInfoField);
    const warning = [
      `Save public information edits for "${tool.title}"?`,
      "These edits will override the generated information boxes for this tool.",
      blankFields.length ? `Blank boxes will use generated defaults: ${blankFields.join(", ")}.` : "",
      "Check carefully before saving."
    ].filter(Boolean).join("\n\n");
    if (!window.confirm(warning)) return;
    saveButton.disabled = true;
    status.textContent = "Saving tool information...";
    try {
      const source = await saveToolInfoOverride(tool.slug, fields);
      status.textContent = source === "supabase"
        ? "Saved. This tool information page now uses your admin edits."
        : "Saved in this browser. Run the latest Supabase schema to make this live for everyone.";
      saveButton.disabled = false;
      renderRoute();
    } catch (error) {
      status.textContent = `Could not save: ${error.message}`;
      saveButton.disabled = false;
    }
  });
}

function renderToolInformationPage(tool) {
  const subjectGroup = toolSubjectGroup(tool);
  const classroomHref = tool.imported ? `#/classroom/${tool.slug}` : "#/tools";
  const curriculumLinks = toolCurriculumLinks(tool);
  const info = toolInfoContent(tool);
  app.innerHTML = `
    <section class="tool-info-page">
      <header class="tool-info-hero">
        <div class="tool-info-title">
          <div class="badge-row">
            <span class="badge">${escapeHtml(tool.category)}</span>
            ${subjectGroup ? `<span class="badge subject-group">${escapeHtml(subjectGroup)}</span>` : ""}
            <span class="badge">${escapeHtml(tool.level)}</span>
            <span class="badge ${normalise(requiredAccessLabel(tool))}">${escapeHtml(requiredAccessLabel(tool))}</span>
          </div>
          <h1>${escapeHtml(tool.title)}</h1>
          <p>${escapeHtml(tool.description)}</p>
          <div class="tool-info-hero-curriculum">
            <span>Exam boards / curriculum</span>
            ${renderToolInfoBadges(curriculumLinks)}
          </div>
        </div>
        <div class="tool-info-actions">
          <a class="button" href="#/tools">Back to Library</a>
          <a class="button primary tool-info-launch ${tool.imported ? "" : "disabled"}" href="${classroomHref}">Go to Classroom View</a>
        </div>
      </header>

      ${renderToolInfoAdminEditor(tool, info)}

      <section class="tool-info-grid tool-info-primary-grid">
        <article class="tool-info-card">
          <span class="eyebrow">Topics Covered</span>
          <div class="topic-map-compact">
            ${renderTopicBulletList(info.topics)}
          </div>
        </article>

        <article class="tool-info-card">
          <span class="eyebrow">Teacher Guidance</span>
          ${renderToolInfoList(info.teacher_guidance)}
        </article>

        <article class="tool-info-card">
          <span class="eyebrow">Mathematical Standards Covered</span>
          ${renderToolInfoList(info.standards, "standards-list")}
        </article>
      </section>

      <section class="tool-info-grid tool-info-secondary-grid">
        <article class="tool-info-card">
          <span class="eyebrow">Common Misconceptions</span>
          ${renderToolInfoList(info.misconceptions)}
        </article>

        <article class="tool-info-card">
          <span class="eyebrow">Inquiry Questions</span>
          ${renderToolInfoList(info.classroom_questions)}
        </article>

        <article class="tool-info-card">
          <span class="eyebrow">Related Tools</span>
          ${renderRelatedToolTextList(info.related_tools)}
        </article>

        <article class="tool-info-card">
          <span class="eyebrow">Suggested Use</span>
          ${renderToolInfoList(info.suggested_use)}
        </article>
      </section>
    </section>
  `;
  bindToolInfoAdminEditor(tool);
}

function renderToolFrame(tool, options = {}) {
  const subjectGroup = toolSubjectGroup(tool);
  const startClassroom = Boolean(options.startClassroom);
  const frame = tool.imported
    ? `<iframe class="legacy-frame" src="${classroomToolPath(tool.toolPath)}" title="${tool.title}" loading="eager"></iframe>`
    : `
      <div class="missing-tool">
        <span class="eyebrow">Coming Soon</span>
        <h2>This tool is on the roadmap</h2>
        <p>The virtual textbook already knows where this topic belongs, but the classroom question set has not been connected yet.</p>
        <p>Use the related topics and collections to find nearby practice while this one is being prepared.</p>
      </div>
    `;

  app.innerHTML = `
    ${startClassroom ? "" : pageHeader(
      tool.title,
      tool.description,
      `<a class="button" href="#/tools">Back to Library</a>${tool.legacyUrl ? `<a class="button" href="${tool.legacyUrl}" target="_blank" rel="noopener noreferrer">Original Page</a>` : ""}<button class="button primary" id="focusTool" type="button">Classroom View</button>`,
      "tool-sticky-header"
    )}
    <section class="legacy-layout">
      <div class="legacy-stage ${startClassroom ? "classroom" : ""}">
        <div class="legacy-toolbar">
          ${startClassroom ? `<div class="classroom-toolbar-title">Classroom View</div>` : `<div class="badge-row">
            <span class="badge">${tool.category}</span>
            ${subjectGroup ? `<span class="badge subject-group">${escapeHtml(subjectGroup)}</span>` : ""}
            <span class="badge">${tool.level}</span>
            <span class="badge">${tool.type}</span>
            <span class="badge ${normalise(requiredAccessLabel(tool))}">${requiredAccessLabel(tool)}</span>
          </div>`}
          <div class="legacy-toolbar-actions">
            ${startClassroom ? "" : `<span class="tool-path">${tool.toolPath}</span>`}
            ${startClassroom ? `<a class="button classroom-info-link" href="#/tools/${escapeHtml(tool.slug)}">Tool Info</a>` : ""}
            <button class="button primary" id="focusTool" type="button" ${startClassroom ? "hidden" : ""}>Classroom View</button>
            <button class="button classroom-fullscreen" id="classroomFullscreen" type="button">Full Screen</button>
            <button class="button classroom-draw-toggle" id="classroomDrawToggle" type="button" aria-pressed="false">Write</button>
            <button class="button classroom-annotation-control active" id="annotationPen" type="button" aria-pressed="true">Pen</button>
            <button class="button classroom-annotation-control" id="annotationHighlighter" type="button" aria-pressed="false">Highlighter</button>
            <button class="button classroom-annotation-control" id="annotationEraser" type="button" aria-pressed="false">Eraser</button>
            <button class="button classroom-annotation-control" id="annotationUndo" type="button">Undo</button>
            <button class="button classroom-annotation-control danger" id="annotationClear" type="button">Clear</button>
            <button class="button classroom-exit" id="exitClassroom" type="button">Exit</button>
          </div>
        </div>
        ${frame}
        <canvas class="classroom-annotation-layer" id="classroomAnnotationCanvas" aria-label="Classroom writing layer"></canvas>
      </div>
      <aside class="panel teacher-panel">
        <span class="eyebrow">Teacher Guidance</span>
        <h2>Topics Covered</h2>
        <div id="toolTopicMap">${fallbackTopicMap(tool)}</div>
        <h3>Mathematical Standards Covered</h3>
        ${renderStandardsList(tool)}
      </aside>
    </section>
  `;
  bindToolFrame(tool, options);
}

function renderToolDetail(slug) {
  const tool = tools.find((item) => item.slug === slug);
  if (!tool || !isVisibleTool(tool)) {
    app.innerHTML = `${pageHeader("Tool not found", "This route does not match a registered tool.", `<a class="button" href="#/tools">Back to Library</a>`)}`;
    return;
  }
  renderToolInformationPage(tool);
}

function renderClassroomTool(slug) {
  const tool = tools.find((item) => item.slug === slug);
  if (!tool || !isVisibleTool(tool)) {
    app.innerHTML = `${pageHeader("Tool not found", "This route does not match a registered tool.", `<a class="button" href="#/tools">Back to Library</a>`)}`;
    return;
  }
  if (!canAccessTool(tool)) {
    app.innerHTML = `
      ${pageHeader(tool.title, tool.description, `<a class="button" href="#/tools/${escapeHtml(tool.slug)}">Tool Info</a>`)}
      ${signInCallout(`${requiredAccessLabel(tool)} access required`)}
    `;
    bindAuthActions();
    return;
  }
  renderToolFrame(tool, { startClassroom: true, exitRoute: `#/tools/${tool.slug}` });
}

const trustPages = [
  {
    slug: "",
    title: "Overview",
    description: "The basic things schools need to know before using Kaizen Maths."
  },
  {
    slug: "privacy",
    title: "Privacy Basics",
    description: "What teacher account information is used and what is not collected."
  },
  {
    slug: "data-protection",
    title: "Data Protection",
    description: "How access, payments, and security are handled."
  },
  {
    slug: "teacher-only-use",
    title: "Teacher-Only Use",
    description: "Kaizen Maths is for adult teacher accounts, not student accounts."
  },
  {
    slug: "terms",
    title: "Use Terms",
    description: "Simple use expectations for teachers and schools."
  }
];

function trustLink(slug) {
  return slug ? `#/trust/${slug}` : "#/trust";
}

function trustNavHtml(activeSlug = "") {
  return `
    <nav class="trust-nav" aria-label="Trust pages">
      ${trustPages.map((page) => `
        <a class="${page.slug === activeSlug ? "active" : ""}" href="${trustLink(page.slug)}">
          <strong>${escapeHtml(page.title)}</strong>
        </a>
      `).join("")}
    </nav>
  `;
}

function trustList(items) {
  return `<ul class="trust-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function renderTrustHub() {
  app.innerHTML = `
    ${pageHeader(
      "Trust & Privacy",
      "The basic things schools need to know before using Kaizen Maths.",
      `<a class="button" href="#/schools">School Access</a><a class="button" href="#/upgrade">Pricing</a>`
    )}
    <section class="trust-page">
      ${trustNavHtml("")}
      <section class="trust-hero panel">
        <span class="eyebrow">What Schools Can Expect</span>
        <h2>Teacher accounts only. No student accounts required.</h2>
        <p>Kaizen Maths is a teaching workspace for adult teachers, tutors, and school staff. Teachers use it to generate maths questions, worked examples, worksheets, assessments, and classroom resources. Students do not need accounts, and teachers should not enter student personal data into the site.</p>
        <div class="badge-row">
          <span class="badge">Teacher accounts</span>
          <span class="badge">No student accounts</span>
          <span class="badge">Stripe payments</span>
          <span class="badge">Google sign-in</span>
          <span class="badge">Supabase access control</span>
        </div>
      </section>
      <section class="trust-card-grid">
        <article class="panel trust-card">
          <h2>The Basics</h2>
          ${trustList([
            "Kaizen Maths is for adult teacher use.",
            "Students do not need to sign in.",
            "Teachers should not upload student names, marks, class lists, or identifiers.",
            "Payments are handled by Stripe.",
            "Google sign-in is used for teacher accounts.",
            "Access can be managed by role: free, trial, pro, school, or admin."
          ])}
        </article>
        <article class="panel trust-card">
          <h2>For Schools</h2>
          ${trustList([
            "School licences are for authorised staff at the school.",
            "Kaizen Maths supports planning, teaching, practice, homework, assessment, intervention, and revision.",
            "Teachers remain in control of the lesson and the resources they use.",
            "Schools can ask for more detail before buying a licence."
          ])}
        </article>
      </section>
    </section>
  `;
}

function renderPrivacyNotice() {
  app.innerHTML = `
    ${pageHeader(
      "Privacy Basics",
      "Simple privacy information for teachers and schools.",
      `<a class="button" href="#/trust">Trust Overview</a>`
    )}
    <section class="trust-page">
      ${trustNavHtml("privacy")}
      <section class="trust-section-grid">
        <article class="panel">
          <h2>Who This Is For</h2>
          <p>This is for adult teachers, tutors, school leaders, and administrators. Kaizen Maths is not designed for student accounts.</p>
        </article>
        <article class="panel">
          <h2>Teacher Information Used</h2>
          ${trustList([
            "Email address and Google sign-in identity.",
            "Name, school, or organisation if provided.",
            "Account role, trial end date, and subscription status.",
            "Support messages, feedback, or testimonials if a teacher sends them.",
            "Basic technical information needed to run and protect the website."
          ])}
        </article>
        <article class="panel">
          <h2>Student Information</h2>
          ${trustList([
            "Students do not need accounts.",
            "Kaizen Maths does not ask for student names, marks, class lists, or identifiers.",
            "Teachers should not enter student personal data into worksheets, notes, feedback, or admin fields."
          ])}
        </article>
        <article class="panel">
          <h2>Payments</h2>
          ${trustList([
            "Payments are handled by Stripe.",
            "Kaizen Maths does not store payment card numbers.",
            "Stripe may send Kaizen Maths subscription status and billing period information so teacher access can be updated."
          ])}
        </article>
        <article class="panel">
          <h2>Services Used</h2>
          <p>Kaizen Maths may use Google sign-in, Supabase, Stripe, Vercel, and YouTube embeds to operate the service.</p>
        </article>
        <article class="panel">
          <h2>Questions</h2>
          <p>Teachers and schools can ask for account information to be corrected or deleted where appropriate. Schools can also ask for more detail before buying a licence.</p>
        </article>
      </section>
    </section>
  `;
}

function renderDataProtectionPage() {
  app.innerHTML = `
    ${pageHeader(
      "Data Protection",
      "Simple data protection and security basics for schools.",
      `<a class="button" href="#/trust">Trust Overview</a>`
    )}
    <section class="trust-page">
      ${trustNavHtml("data-protection")}
      <section class="trust-section-grid">
        <article class="panel">
          <h2>Main Position</h2>
          <p>Kaizen Maths is a teacher workspace, not a student record system. It is designed to avoid the need for student personal data.</p>
        </article>
        <article class="panel">
          <h2>Security Basics</h2>
          ${trustList([
            "Google sign-in for teacher authentication.",
            "Role-based access inside the app for free, trial, pro, school, and admin accounts.",
            "Supabase row-level security policies for access-controlled tables.",
            "Stripe Checkout for payments so card details are handled by Stripe, not stored by Kaizen Maths.",
            "HTTPS delivery on the live site."
          ])}
        </article>
        <article class="panel">
          <h2>Admin Access</h2>
          <p>Admin functions are intended for authorised Kaizen Maths administrators only. Admins can manage access roles, trial dates, school access, tags, videos, and homepage content.</p>
        </article>
        <article class="panel">
          <h2>Teacher Responsibilities</h2>
          ${trustList([
            "Use Kaizen Maths with adult teacher accounts only.",
            "Do not upload student personal data.",
            "Do not add student names or identifiers to worksheets, feedback, notes, or testimonials."
          ])}
        </article>
        <article class="panel">
          <h2>School Questions</h2>
          <p>Schools can ask for more information about retention, security, sub-processors, account deletion, or procurement documents before purchasing.</p>
        </article>
      </section>
    </section>
  `;
}

function renderTeacherOnlyUsePage() {
  app.innerHTML = `
    ${pageHeader(
      "Teacher-Only Use",
      "Kaizen Maths is for adult teachers, tutors, and school staff.",
      `<a class="button" href="#/trust">Trust Overview</a>`
    )}
    <section class="trust-page">
      ${trustNavHtml("teacher-only-use")}
      <section class="trust-hero panel">
        <span class="eyebrow">Teacher Accounts</span>
        <h2>No student accounts are required</h2>
        <p>Students can use printed resources or projected questions in class, but they do not need to sign in. Kaizen Maths accounts are for teachers and authorised school staff.</p>
      </section>
      <section class="trust-section-grid">
        <article class="panel">
          <h2>Teachers Can Use Kaizen Maths To</h2>
          ${trustList([
            "Project questions during lessons.",
            "Model worked examples and reveal solutions.",
            "Create differentiated practice.",
            "Generate homework worksheets and answer keys.",
            "Build quizzes, assessments, and revision practice."
          ])}
        </article>
        <article class="panel">
          <h2>Do Not Use It To</h2>
          ${trustList([
            "Create student accounts.",
            "Store student names, marks, classes, or identifiers.",
            "Record student progress or behaviour notes.",
            "Publish identifiable student work or personal information."
          ])}
        </article>
        <article class="panel">
          <h2>Classroom Use</h2>
          <p>Teachers remain in control of the lesson. They choose the topic, level, timing, questions, answers, worked examples, and whether resources are projected, printed, or used for homework.</p>
        </article>
        <article class="panel">
          <h2>School Licence Use</h2>
          <p>Where a school licence is agreed, named teacher accounts can be added or authorised for the school. School access should be limited to staff who need Kaizen Maths for teaching or department work.</p>
        </article>
      </section>
    </section>
  `;
}

function renderTermsPage() {
  app.innerHTML = `
    ${pageHeader(
      "Use Terms",
      "Simple use expectations for teachers and schools.",
      `<a class="button" href="#/trust">Trust Overview</a>`
    )}
    <section class="trust-page">
      ${trustNavHtml("terms")}
      <section class="trust-section-grid">
        <article class="panel">
          <h2>Use Of Kaizen Maths</h2>
          <p>Kaizen Maths provides maths teaching resources for adult teacher use. Teachers may generate questions, worked examples, worksheets, assessments, and classroom displays for teaching, homework, intervention, assessment, and revision.</p>
        </article>
        <article class="panel">
          <h2>Access</h2>
          <p>Access may be free, trial, pro, school, or admin. School licences are for authorised staff at the named school or organisation.</p>
        </article>
        <article class="panel">
          <h2>Acceptable Use</h2>
          ${trustList([
            "Use Kaizen Maths for legitimate teaching, tutoring, school, or department work.",
            "Do not attempt to bypass access controls or share admin access.",
            "Do not upload student personal data.",
            "Do not interfere with the security, reliability, or operation of the site."
          ])}
        </article>
        <article class="panel">
          <h2>Resource Checking</h2>
          <p>Kaizen Maths aims to provide accurate maths questions and worked solutions. Teachers should check resources before using them in high-stakes contexts.</p>
        </article>
        <article class="panel">
          <h2>School Licences</h2>
          <p>The teacher count, access period, price, and support arrangements should be confirmed before purchase.</p>
        </article>
      </section>
    </section>
  `;
}

function renderTrustPage(slug = "") {
  if (!slug) {
    renderTrustHub();
    return;
  }
  if (slug === "privacy") {
    renderPrivacyNotice();
    return;
  }
  if (slug === "data-protection") {
    renderDataProtectionPage();
    return;
  }
  if (slug === "teacher-only-use") {
    renderTeacherOnlyUsePage();
    return;
  }
  if (slug === "terms") {
    renderTermsPage();
    return;
  }
  renderTrustHub();
}

function renderTeacher() {
  app.innerHTML = `
    ${pageHeader(
      "Teacher Notes",
      "Guidance for using Kaizen Maths as a virtual mathematics textbook: choose suitable questions, project them clearly, reveal worked steps at the right moment, and adapt the pace of practice to your class."
    )}
    <section class="split-grid">
      <div class="panel">
        <h2>Use It Alongside Your Teaching</h2>
        <p>Kaizen Maths does not replace teacher planning or explanation. It supports the lesson by giving you instant access to topic-based questions, examples, answers, and worked solutions while you stay in control of what students see and when they see it.</p>
      </div>
      <div class="panel">
        <h2>Classroom Workflow</h2>
        <p>Start by selecting a topic, level, and question type. Project a practice set, give students thinking time, then reveal answers or worked steps when you want to check understanding, discuss misconceptions, or model a method.</p>
      </div>
      <div class="panel">
        <h2>Differentiation And Intervention</h2>
        <p>Use the levels and question types to adjust challenge quickly. You can stay with one skill for fluency, move to a harder level for extension, or return to a prerequisite topic when students need more support.</p>
        <div class="badge-row">
          <span class="badge">Retrieval practice</span>
          <span class="badge">Fluency</span>
          <span class="badge">Misconceptions</span>
          <span class="badge">Extension</span>
          <span class="badge">Intervention</span>
        </div>
      </div>
      <div class="panel">
        <h2>Worksheets And Assessment</h2>
        <div class="migration-list">
          <article class="migration-item"><span>1</span><div><h3>Homework</h3><p>Create printable practice from one topic or combine several topics into a mixed worksheet.</p></div></article>
          <article class="migration-item"><span>2</span><div><h3>Quizzes</h3><p>Select a focused question type and generate a short set for a starter, exit check, or low-stakes test.</p></div></article>
          <article class="migration-item"><span>3</span><div><h3>Assessments</h3><p>Build longer question sets with a separate answer key for marking, review, or revision lessons.</p></div></article>
          <article class="migration-item"><span>4</span><div><h3>Less Confident Topics</h3><p>Use the examples, answers, and worked steps as a structure when teaching a topic that needs extra support.</p></div></article>
        </div>
      </div>
    </section>
  `;
}

function renderSchoolSpace() {
  const profile = authState().profile || {};
  const role = currentUserRole();
  const schoolName = currentSchoolName();
  const isSchoolUser = role === "school" && schoolName;
  const licenceEnds = profile.school_licence_ends_at || schoolById(profile.school_id)?.licence_ends_at || "";

  if (!isSignedIn()) {
    app.innerHTML = `
      ${pageHeader(
        "School Space",
        "Join or view a Kaizen Maths school licence for your department.",
        `<a class="button" href="#/schools">School Licence Notes</a>`
      )}
      ${signInCallout("Sign in to join a school licence")}
    `;
    bindAuthActions();
    return;
  }

  app.innerHTML = `
    ${pageHeader(
      "School Space",
      isSchoolUser
        ? "Your account is linked to your school licence."
        : "Use the school code from your department to join a school licence.",
      `<a class="button" href="#/schools">School Licence Notes</a>`
    )}
    <section class="school-space-page">
      ${isSchoolUser ? `
        <article class="panel school-status-card">
          <span class="eyebrow">School Licence</span>
          <h2>${escapeHtml(schoolName)}</h2>
          <p>Your account has school access. You can use the full Kaizen Maths teaching workspace while this licence is active.</p>
          <div class="school-detail-grid">
            <div>
              <span>Email</span>
              <strong>${escapeHtml(authState().session?.user?.email || "Signed-in teacher")}</strong>
            </div>
            <div>
              <span>Access</span>
              <strong>School</strong>
            </div>
            <div>
              <span>Licence Ends</span>
              <strong>${escapeHtml(formatDisplayDate(licenceEnds))}</strong>
            </div>
          </div>
          <div class="button-row">
            <a class="button primary" href="#/tools">Open Tool Library</a>
            <a class="button" href="#/worksheet-generator">Open Worksheet Builder</a>
          </div>
        </article>
      ` : `
        <article class="panel school-join-card">
          <span class="eyebrow">Join Your School</span>
          <h2>Enter your school access code</h2>
          <p>Use the code shared by your school or department lead. If the licence is restricted, your signed-in email must match an approved school domain or an approved teacher email.</p>
          <label class="school-code-field">
            School code
            <input id="schoolJoinCode" type="text" autocomplete="off" spellcheck="false" placeholder="Example: KAIZEN2026">
          </label>
          <div class="button-row">
            <button class="button primary" id="joinSchoolButton" type="button">Join School Licence</button>
            <a class="button" href="#/schools">Read School Licence Notes</a>
          </div>
          <p class="school-join-status" id="schoolJoinStatus"></p>
        </article>
      `}
      <article class="panel school-help-card">
        <span class="eyebrow">How School Access Works</span>
        <h2>Admin controlled, teacher simple</h2>
        <p>A Kaizen Maths admin creates the school licence, sets the approved domains or teacher emails, chooses the seat limit, and shares a join code with the school.</p>
        <p>Teachers sign in with Google, enter the code once, and their account becomes part of the school licence.</p>
      </article>
    </section>
  `;
  bindAuthActions();
  bindSchoolSpace();
}

function bindSchoolSpace() {
  const button = document.getElementById("joinSchoolButton");
  const input = document.getElementById("schoolJoinCode");
  const status = document.getElementById("schoolJoinStatus");
  if (!button || !input || !status) return;

  button.addEventListener("click", async () => {
    const code = input.value.trim();
    if (!code) {
      status.textContent = "Enter the school code first.";
      status.dataset.tone = "error";
      input.focus();
      return;
    }
    button.disabled = true;
    status.textContent = "Checking school access...";
    status.dataset.tone = "loading";
    try {
      const result = await claimSchoolAccess(code);
      status.textContent = `${result.school_name} has been added to your account.`;
      status.dataset.tone = "success";
      window.setTimeout(renderRoute, 650);
    } catch (error) {
      status.textContent = error.message;
      status.dataset.tone = "error";
      button.disabled = false;
    }
  });
}

function tutorLearnerCardHtml(learner) {
  const latest = tutorLatestSession(learner.id);
  const sessionCount = tutorSessionsForLearner(learner.id).length;
  const progress = tutorLearnerProgressStats(learner.id);
  const latestAssessment = tutorLatestAssessment(learner.id);
  return `
    <article class="tutor-learner-card">
      <div class="tutor-card-head">
        <div>
          <h3>${escapeHtml(learner.alias)}</h3>
          <p>${escapeHtml([learner.level, learner.exam_board, learner.target_grade ? `Target ${learner.target_grade}` : ""].filter(Boolean).join(" • ") || "No level set")}</p>
        </div>
        <span class="badge">${sessionCount} session${sessionCount === 1 ? "" : "s"}</span>
      </div>
      ${learner.focus_notes ? `<p class="tutor-focus">${escapeHtml(learner.focus_notes)}</p>` : `<p class="tutor-focus muted">No focus notes yet.</p>`}
      ${learner.learner_goals ? `<p class="tutor-focus"><strong>Goal:</strong> ${escapeHtml(learner.learner_goals)}</p>` : ""}
      <div class="tutor-card-meta">
        <span>Latest</span>
        <strong>${latest ? escapeHtml(formatDisplayDate(latest.session_date)) : "No sessions yet"}</strong>
      </div>
      <div class="tutor-card-meta">
        <span>Confidence</span>
        <strong>${latest ? escapeHtml(tutorConfidenceLabel(latest.confidence)) : "Not set"}</strong>
      </div>
      <div class="tutor-progress-strip" aria-label="Topic progress summary">
        <span>${progress.secure} secure</span>
        <span>${progress.developing} developing</span>
        <span>${progress.needsRevisit} revisit</span>
      </div>
      ${latestAssessment ? `
        <div class="tutor-card-meta">
          <span>Last score</span>
          <strong>${escapeHtml(latestAssessment.score ?? "—")}/${escapeHtml(latestAssessment.max_score ?? "—")}</strong>
        </div>
      ` : ""}
      <div class="button-row">
        <button class="button subtle" type="button" data-tutor-select-learner="${escapeHtml(learner.id)}">Log Session</button>
        <button class="button subtle" type="button" data-tutor-plan-learner="${escapeHtml(learner.id)}">Plan Next</button>
        <button class="button subtle danger" type="button" data-tutor-delete-learner="${escapeHtml(learner.id)}">Delete</button>
      </div>
    </article>
  `;
}

function tutorSessionItemHtml(session) {
  const learner = tutorLearnerById(session.learner_id);
  const tool = tools.find((item) => item.slug === session.tool_slug);
  return `
    <article class="tutor-session-item">
      <div class="tutor-session-topline">
        <div>
          <h3>${escapeHtml(session.topic || tool?.title || "Session")}</h3>
          <p>${escapeHtml(learner?.alias || "Learner")} • ${escapeHtml(formatDisplayDate(session.session_date))}</p>
        </div>
        <span class="tutor-confidence" data-confidence="${escapeHtml(normalise(session.confidence))}">${escapeHtml(tutorConfidenceLabel(session.confidence))}</span>
      </div>
      <dl class="tutor-session-details">
        ${tool ? `<div><dt>Tool</dt><dd><a href="#/tools/${escapeHtml(tool.slug)}">${escapeHtml(tool.title)}</a></dd></div>` : ""}
        ${session.session_notes ? `<div><dt>Notes</dt><dd>${escapeHtml(session.session_notes)}</dd></div>` : ""}
        ${session.next_steps ? `<div><dt>Next</dt><dd>${escapeHtml(session.next_steps)}</dd></div>` : ""}
        ${session.homework ? `<div><dt>Homework</dt><dd>${escapeHtml(session.homework)}</dd></div>` : ""}
      </dl>
      <button class="button subtle danger tutor-delete-session" type="button" data-tutor-delete-session="${escapeHtml(session.id)}">Delete session</button>
    </article>
  `;
}

function tutorTopicItemHtml(topic) {
  const tool = tools.find((item) => item.slug === topic.tool_slug);
  return `
    <article class="tutor-workflow-item">
      <div>
        <strong>${escapeHtml(topic.topic)}</strong>
        <p>${escapeHtml(tutorTopicStatusLabel(topic.status))}${topic.last_practised_at ? ` • Last practised ${escapeHtml(formatDisplayDate(topic.last_practised_at))}` : ""}</p>
        ${tool ? `<p><a href="#/tools/${escapeHtml(tool.slug)}">${escapeHtml(tool.title)}</a></p>` : ""}
        ${topic.notes ? `<p>${escapeHtml(topic.notes)}</p>` : ""}
      </div>
      <button class="button subtle danger" type="button" data-tutor-delete-record="tutor_topic_progress" data-record-id="${escapeHtml(topic.id)}">Delete</button>
    </article>
  `;
}

function tutorHomeworkItemHtml(item) {
  return `
    <article class="tutor-workflow-item">
      <div>
        <strong>${escapeHtml(item.task)}</strong>
        <p>${escapeHtml(tutorHomeworkStatusLabel(item.status))}${item.due_date ? ` • Due ${escapeHtml(formatDisplayDate(item.due_date))}` : ""}${item.topic ? ` • ${escapeHtml(item.topic)}` : ""}</p>
        ${item.notes ? `<p>${escapeHtml(item.notes)}</p>` : ""}
      </div>
      <button class="button subtle danger" type="button" data-tutor-delete-record="tutor_homework" data-record-id="${escapeHtml(item.id)}">Delete</button>
    </article>
  `;
}

function tutorAssessmentItemHtml(item) {
  const percent = Number.isFinite(Number(item.score)) && Number.isFinite(Number(item.max_score)) && Number(item.max_score) > 0
    ? ` (${Math.round((Number(item.score) / Number(item.max_score)) * 100)}%)`
    : "";
  return `
    <article class="tutor-workflow-item">
      <div>
        <strong>${escapeHtml(item.title || item.topic || "Assessment")}</strong>
        <p>${escapeHtml(formatDisplayDate(item.assessment_date))}${item.topic ? ` • ${escapeHtml(item.topic)}` : ""}</p>
        <p>Score: ${escapeHtml(item.score ?? "—")}/${escapeHtml(item.max_score ?? "—")}${percent}</p>
        ${item.notes ? `<p>${escapeHtml(item.notes)}</p>` : ""}
      </div>
      <button class="button subtle danger" type="button" data-tutor-delete-record="tutor_assessments" data-record-id="${escapeHtml(item.id)}">Delete</button>
    </article>
  `;
}

function renderTutorWorkspace() {
  if (!isSignedIn()) {
    app.innerHTML = `
      ${pageHeader(
        "Tutor Workspace",
        "Track learner aliases, lesson focus, tools used, confidence, next steps, and homework notes.",
        `<a class="button" href="#/upgrade">View Pro Access</a>`
      )}
      ${signInCallout("Pro access required")}
    `;
    bindAuthActions();
    return;
  }

  if (!hasTutorWorkspaceAccess()) {
    app.innerHTML = `
      ${pageHeader(
        "Tutor Workspace",
        "A private teaching tracker for tutors using Kaizen Maths with individual learners.",
        `<a class="button primary" href="#/upgrade">Upgrade To Pro</a>`
      )}
      <section class="split-grid">
        <article class="panel access-callout">
          <span class="eyebrow">Pro Feature</span>
          <h2>Available for Pro, School, and Admin accounts</h2>
          <p>The Tutor Workspace is designed for paid tutor workflows: learner profiles, topic progress, session notes, Kaizen tools used, homework, assessments, next-session planning, and parent update copy.</p>
          <p>Use aliases or initials only. Kaizen Maths does not require student accounts or student personal data.</p>
          <a class="button primary" href="#/upgrade">View Pro Access</a>
        </article>
        <article class="panel">
          <h2>What Pro Tutors Will Be Able To Track</h2>
          <div class="badge-row">
            <span class="badge">Learner aliases</span>
            <span class="badge">Topic tracker</span>
            <span class="badge">Session notes</span>
            <span class="badge">Homework</span>
            <span class="badge">Assessments</span>
            <span class="badge">Plan next session</span>
            <span class="badge">Parent updates</span>
          </div>
        </article>
      </section>
    `;
    return;
  }

  if (!state.tutorLoaded && !state.tutorLoading) {
    loadTutorWorkspace({ rerender: true });
  }

  const selectedLearner = tutorSelectedLearner();
  const selectedLearnerId = selectedLearner?.id || "";
  const learnerOptions = state.tutorLearners.length ? tutorLearnerOptions(selectedLearnerId) : `<option value="">Add a learner first</option>`;
  const recentSessions = state.tutorSessions.slice(0, 12);
  const selectedTopics = selectedLearnerId ? tutorTopicsForLearner(selectedLearnerId) : [];
  const selectedHomework = selectedLearnerId ? tutorHomeworkForLearner(selectedLearnerId) : [];
  const selectedAssessments = selectedLearnerId ? tutorAssessmentsForLearner(selectedLearnerId) : [];
  const selectedProgress = selectedLearnerId ? tutorLearnerProgressStats(selectedLearnerId) : { secure: 0, developing: 0, needsRevisit: 0 };
  const nextPlan = tutorNextSessionPlan(selectedLearnerId);
  const parentUpdate = tutorParentUpdateText(selectedLearnerId);

  app.innerHTML = `
    ${pageHeader(
      "Tutor Workspace",
      "Use learner aliases to track tutoring sessions, tools used, confidence, homework, and next steps without creating student accounts.",
      `<a class="button" href="#/tools">Open Tools</a><a class="button" href="#/worksheet-generator">Build Worksheet</a>`
    )}
    <section class="tutor-workspace">
      <section class="metric-grid tutor-metrics" aria-label="Tutor workspace summary">
        <article class="metric"><span>Learners</span><strong>${state.tutorLearners.length}</strong></article>
        <article class="metric"><span>Logged Sessions</span><strong>${state.tutorSessions.length}</strong></article>
        <article class="metric"><span>Topics To Revisit</span><strong>${state.tutorTopics.filter((topic) => normalise(topic.status) === "needs-revisit").length}</strong></article>
        <article class="metric"><span>Homework Due</span><strong>${tutorDueHomework().length}</strong></article>
      </section>

      ${state.tutorError ? `
        <section class="panel tutor-setup-warning">
          <span class="eyebrow">Database Setup Needed</span>
          <h2>Tutor Workspace tables are not available yet</h2>
          <p>${escapeHtml(state.tutorError)}</p>
          <p>Run the latest <strong>supabase-schema.sql</strong> in Supabase, then refresh this page.</p>
        </section>
      ` : ""}

      ${state.tutorError ? "" : state.tutorLoading ? `<section class="panel"><p>Loading tutor workspace...</p></section>` : `
        <section class="tutor-main-grid">
          <article class="panel tutor-form-panel">
            <span class="eyebrow">Learners</span>
            <h2>Add learner alias</h2>
            <p>Use initials, a short alias, or your own code. Avoid full student names or sensitive personal details.</p>
            <form id="tutorLearnerForm" class="tutor-form">
              <input name="alias" type="text" maxlength="80" placeholder="Learner alias or initials" required>
              <div class="tutor-form-row">
                <input name="level" type="text" maxlength="80" placeholder="Level, e.g. GCSE Higher">
                <input name="exam_board" type="text" maxlength="80" placeholder="Board or route, e.g. Edexcel">
              </div>
              <div class="tutor-form-row">
                <input name="year_group" type="text" maxlength="80" placeholder="Year group, e.g. Year 10">
                <input name="target_grade" type="text" maxlength="80" placeholder="Target grade, e.g. Grade 7">
              </div>
              <select name="favourite_tools">
                ${tutorToolOptions()}
              </select>
              <textarea name="learner_goals" rows="3" maxlength="800" placeholder="Learner or parent goal, e.g. confident Grade 5 by November"></textarea>
              <textarea name="key_weaknesses" rows="3" maxlength="800" placeholder="Known weak areas, e.g. fractions, forming equations, graph interpretation"></textarea>
              <textarea name="focus_notes" rows="4" maxlength="800" placeholder="Focus notes, e.g. algebra fluency, ratio, exam technique"></textarea>
              <input name="status" type="hidden" value="active">
              <button class="button primary" type="submit">Save Learner</button>
              <p class="tutor-form-status" id="tutorLearnerStatus"></p>
            </form>
          </article>

          <article class="panel tutor-form-panel">
            <span class="eyebrow">Sessions</span>
            <h2>Log tutoring session</h2>
            <form id="tutorSessionForm" class="tutor-form">
              <div class="tutor-form-row">
                <select name="learner_id" id="tutorSessionLearner" required ${state.tutorLearners.length ? "" : "disabled"}>
                  ${state.tutorLearners.length ? learnerOptions : `<option value="">Add a learner first</option>`}
                </select>
                <input name="session_date" type="date" value="${tutorTodayDate()}">
              </div>
              <input name="topic" type="text" maxlength="120" placeholder="Topic focus, e.g. simultaneous equations">
              <select name="tool_slug">
                ${tutorToolOptions()}
              </select>
              <select name="confidence">
                <option value="">Confidence not set</option>
                <option value="introduced">Introduced</option>
                <option value="practising">Practising</option>
                <option value="secure">Secure</option>
                <option value="needs-revisit">Needs revisit</option>
              </select>
              <textarea name="session_notes" rows="3" maxlength="900" placeholder="What happened in the session?"></textarea>
              <textarea name="next_steps" rows="3" maxlength="900" placeholder="Next steps for the next session"></textarea>
              <textarea name="homework" rows="3" maxlength="900" placeholder="Homework or independent practice"></textarea>
              <button class="button primary" type="submit" ${state.tutorLearners.length ? "" : "disabled"}>Save Session</button>
              <p class="tutor-form-status" id="tutorSessionStatus"></p>
            </form>
          </article>
        </section>

        <section class="tutor-workflow-grid" aria-label="Tutor workflow tools">
          <article class="panel tutor-form-panel">
            <span class="eyebrow">Topic Tracker</span>
            <h2>Track progress by topic</h2>
            <form id="tutorTopicForm" class="tutor-form">
              <select name="learner_id" required ${state.tutorLearners.length ? "" : "disabled"}>${learnerOptions}</select>
              <input name="topic" type="text" maxlength="140" placeholder="Topic, e.g. factorising quadratics" required>
              <div class="tutor-form-row">
                <select name="status">
                  <option value="developing">Developing</option>
                  <option value="needs-revisit">Needs revisit</option>
                  <option value="secure">Secure</option>
                </select>
                <input name="last_practised_at" type="date" value="${tutorTodayDate()}">
              </div>
              <select name="tool_slug">${tutorToolOptions()}</select>
              <textarea name="notes" rows="3" maxlength="700" placeholder="Notes about errors, misconceptions, or what to practise next"></textarea>
              <button class="button primary" type="submit" ${state.tutorLearners.length ? "" : "disabled"}>Save Topic</button>
              <p class="tutor-form-status" id="tutorTopicStatus"></p>
            </form>
          </article>

          <article class="panel tutor-form-panel">
            <span class="eyebrow">Homework</span>
            <h2>Set and monitor homework</h2>
            <form id="tutorHomeworkForm" class="tutor-form">
              <select name="learner_id" required ${state.tutorLearners.length ? "" : "disabled"}>${learnerOptions}</select>
              <input name="task" type="text" maxlength="220" placeholder="Homework task" required>
              <div class="tutor-form-row">
                <input name="topic" type="text" maxlength="120" placeholder="Linked topic">
                <input name="due_date" type="date">
              </div>
              <select name="status">
                <option value="set">Set</option>
                <option value="completed">Completed</option>
                <option value="missed">Missed</option>
                <option value="reviewed">Reviewed</option>
              </select>
              <textarea name="notes" rows="3" maxlength="700" placeholder="Homework notes or follow-up"></textarea>
              <button class="button primary" type="submit" ${state.tutorLearners.length ? "" : "disabled"}>Save Homework</button>
              <p class="tutor-form-status" id="tutorHomeworkStatus"></p>
            </form>
          </article>

          <article class="panel tutor-form-panel">
            <span class="eyebrow">Assessment Log</span>
            <h2>Record quiz and test scores</h2>
            <form id="tutorAssessmentForm" class="tutor-form">
              <select name="learner_id" required ${state.tutorLearners.length ? "" : "disabled"}>${learnerOptions}</select>
              <div class="tutor-form-row">
                <input name="title" type="text" maxlength="140" placeholder="Assessment title">
                <input name="assessment_date" type="date" value="${tutorTodayDate()}">
              </div>
              <input name="topic" type="text" maxlength="140" placeholder="Topic or paper focus">
              <div class="tutor-form-row">
                <input name="score" type="number" min="0" step="0.5" placeholder="Score">
                <input name="max_score" type="number" min="1" step="0.5" placeholder="Out of">
              </div>
              <textarea name="notes" rows="3" maxlength="700" placeholder="What does this score show?"></textarea>
              <button class="button primary" type="submit" ${state.tutorLearners.length ? "" : "disabled"}>Save Assessment</button>
              <p class="tutor-form-status" id="tutorAssessmentStatus"></p>
            </form>
          </article>

          <article class="panel tutor-output-panel">
            <span class="eyebrow">Plan Next Session</span>
            <h2>${selectedLearner ? escapeHtml(selectedLearner.alias) : "Choose a learner"}</h2>
            <div class="tutor-progress-strip">
              <span>${selectedProgress.secure} secure</span>
              <span>${selectedProgress.developing} developing</span>
              <span>${selectedProgress.needsRevisit} revisit</span>
            </div>
            <textarea id="tutorNextPlanOutput" class="tutor-copy-box" readonly>${escapeHtml(nextPlan)}</textarea>
            <div class="button-row">
              <button class="button primary" type="button" id="copyTutorPlan" ${selectedLearner ? "" : "disabled"}>Copy Plan</button>
              ${selectedLearner ? `<a class="button" href="#/tools">Open Tools</a>` : ""}
            </div>
          </article>

          <article class="panel tutor-output-panel">
            <span class="eyebrow">Parent Update</span>
            <h2>Ready-to-send summary</h2>
            <textarea id="tutorParentUpdateOutput" class="tutor-copy-box" readonly>${escapeHtml(parentUpdate)}</textarea>
            <button class="button primary" type="button" id="copyTutorParentUpdate" ${selectedLearner ? "" : "disabled"}>Copy Parent Update</button>
          </article>
        </section>

        <section class="tutor-main-grid">
          <article class="panel">
            <div class="tutor-section-head">
              <div>
                <span class="eyebrow">Learner List</span>
                <h2>Current learners</h2>
              </div>
              <button class="button subtle" id="refreshTutorWorkspace" type="button">Refresh</button>
            </div>
            <div class="tutor-learner-list">
              ${state.tutorLearners.length ? state.tutorLearners.map(tutorLearnerCardHtml).join("") : `<div class="empty-state">Add your first learner alias to begin tracking tutoring sessions.</div>`}
            </div>
          </article>

          <article class="panel">
            <span class="eyebrow">Recent Sessions</span>
            <h2>Session log</h2>
            <div class="tutor-session-list">
              ${recentSessions.length ? recentSessions.map(tutorSessionItemHtml).join("") : `<div class="empty-state">No sessions logged yet.</div>`}
            </div>
          </article>
        </section>

        <section class="tutor-record-grid" aria-label="Selected learner records">
          <article class="panel">
            <span class="eyebrow">Selected Learner</span>
            <h2>${selectedLearner ? escapeHtml(selectedLearner.alias) : "No learner selected"}</h2>
            ${selectedLearner ? `
              <div class="tutor-profile-summary">
                <p><strong>Level:</strong> ${escapeHtml(selectedLearner.level || "Not set")}</p>
                <p><strong>Target:</strong> ${escapeHtml(selectedLearner.target_grade || "Not set")}</p>
                <p><strong>Goal:</strong> ${escapeHtml(selectedLearner.learner_goals || "Not set")}</p>
                <p><strong>Weak areas:</strong> ${escapeHtml(selectedLearner.key_weaknesses || "Not set")}</p>
              </div>
            ` : `<p>Add a learner to unlock the workflow view.</p>`}
          </article>

          <article class="panel">
            <span class="eyebrow">Topics</span>
            <h2>Progress tracker</h2>
            <div class="tutor-session-list">
              ${selectedTopics.length ? selectedTopics.map(tutorTopicItemHtml).join("") : `<div class="empty-state">No topics tracked for this learner yet.</div>`}
            </div>
          </article>

          <article class="panel">
            <span class="eyebrow">Homework</span>
            <h2>Tasks and follow-up</h2>
            <div class="tutor-session-list">
              ${selectedHomework.length ? selectedHomework.map(tutorHomeworkItemHtml).join("") : `<div class="empty-state">No homework recorded for this learner yet.</div>`}
            </div>
          </article>

          <article class="panel">
            <span class="eyebrow">Assessment</span>
            <h2>Scores over time</h2>
            <div class="tutor-session-list">
              ${selectedAssessments.length ? selectedAssessments.map(tutorAssessmentItemHtml).join("") : `<div class="empty-state">No assessment scores recorded yet.</div>`}
            </div>
          </article>
        </section>
      `}
    </section>
  `;
  bindTutorWorkspaceActions();
}

function bindTutorWorkspaceActions() {
  bindAuthActions();
  const learnerForm = document.getElementById("tutorLearnerForm");
  const learnerStatus = document.getElementById("tutorLearnerStatus");
  learnerForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = learnerForm.querySelector("button[type='submit']");
    button.disabled = true;
    learnerStatus.textContent = "Saving learner...";
    try {
      await saveTutorLearner(Object.fromEntries(new FormData(learnerForm).entries()));
      learnerForm.reset();
      learnerStatus.textContent = "Learner saved.";
    } catch (error) {
      learnerStatus.textContent = error.message;
      button.disabled = false;
    }
  });

  const sessionForm = document.getElementById("tutorSessionForm");
  const sessionStatus = document.getElementById("tutorSessionStatus");
  sessionForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = sessionForm.querySelector("button[type='submit']");
    button.disabled = true;
    sessionStatus.textContent = "Saving session...";
    try {
      await saveTutorSession(Object.fromEntries(new FormData(sessionForm).entries()));
      sessionForm.reset();
      const dateInput = sessionForm.querySelector("[name='session_date']");
      if (dateInput) dateInput.value = tutorTodayDate();
      sessionStatus.textContent = "Session saved.";
    } catch (error) {
      sessionStatus.textContent = error.message;
      button.disabled = false;
    }
  });

  const bindWorkflowForm = (formId, statusId, saveFn, savingText, savedText) => {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    form?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = form.querySelector("button[type='submit']");
      button.disabled = true;
      status.textContent = savingText;
      try {
        await saveFn(Object.fromEntries(new FormData(form).entries()));
        form.reset();
        const dateInput = form.querySelector("input[type='date']");
        if (dateInput && ["last_practised_at", "assessment_date"].includes(dateInput.name)) dateInput.value = tutorTodayDate();
        status.textContent = savedText;
      } catch (error) {
        status.textContent = error.message;
        button.disabled = false;
      }
    });
  };

  bindWorkflowForm("tutorTopicForm", "tutorTopicStatus", saveTutorTopic, "Saving topic...", "Topic saved.");
  bindWorkflowForm("tutorHomeworkForm", "tutorHomeworkStatus", saveTutorHomework, "Saving homework...", "Homework saved.");
  bindWorkflowForm("tutorAssessmentForm", "tutorAssessmentStatus", saveTutorAssessment, "Saving assessment...", "Assessment saved.");

  document.querySelectorAll("[data-tutor-select-learner]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tutorSelectedLearnerId = button.dataset.tutorSelectLearner;
      document.querySelectorAll('.tutor-form select[name="learner_id"]').forEach((select) => {
        select.value = button.dataset.tutorSelectLearner;
      });
      document.getElementById("tutorSessionForm")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  document.querySelectorAll("[data-tutor-plan-learner]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tutorSelectedLearnerId = button.dataset.tutorPlanLearner;
      renderRoute();
      window.requestAnimationFrame(() => document.getElementById("tutorNextPlanOutput")?.scrollIntoView({ behavior: "smooth", block: "center" }));
    });
  });

  document.querySelectorAll("[data-tutor-delete-learner]").forEach((button) => {
    button.addEventListener("click", async () => {
      const learner = tutorLearnerById(button.dataset.tutorDeleteLearner);
      if (!learner || !window.confirm(`Delete ${learner.alias} and their session log?`)) return;
      button.disabled = true;
      try {
        await deleteTutorLearner(learner.id);
      } catch (error) {
        window.alert(error.message);
        button.disabled = false;
      }
    });
  });

  document.querySelectorAll("[data-tutor-delete-session]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!window.confirm("Delete this session note?")) return;
      button.disabled = true;
      try {
        await deleteTutorSession(button.dataset.tutorDeleteSession);
      } catch (error) {
        window.alert(error.message);
        button.disabled = false;
      }
    });
  });

  document.querySelectorAll("[data-tutor-delete-record]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!window.confirm("Delete this tutor workflow record?")) return;
      button.disabled = true;
      try {
        await deleteTutorWorkflowRecord(button.dataset.tutorDeleteRecord, button.dataset.recordId);
      } catch (error) {
        window.alert(error.message);
        button.disabled = false;
      }
    });
  });

  const copyTutorText = async (targetId, button) => {
    const text = document.getElementById(targetId)?.value || "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => { button.textContent = original; }, 1200);
    } catch {
      document.getElementById(targetId)?.select();
      button.textContent = "Select and copy";
    }
  };

  document.getElementById("copyTutorPlan")?.addEventListener("click", (event) => copyTutorText("tutorNextPlanOutput", event.currentTarget));
  document.getElementById("copyTutorParentUpdate")?.addEventListener("click", (event) => copyTutorText("tutorParentUpdateOutput", event.currentTarget));

  document.getElementById("refreshTutorWorkspace")?.addEventListener("click", async () => {
    state.tutorLoaded = false;
    await loadTutorWorkspace({ rerender: true });
  });
}

function renderSchools() {
  app.innerHTML = `
    ${pageHeader(
      "School Access",
      "School licences give maths departments shared access to Kaizen Maths as a virtual mathematics textbook: unlimited topic questions, board-ready generators, worked solutions, worksheets, and assessment practice for classroom use.",
      `<a class="button primary" href="#/book-demo">Book School Demo</a><a class="button" href="#/school-space">Join School Licence</a><a class="button" href="#/upgrade">Back to Upgrade</a>`
    )}
    <section class="upgrade-page">
      <article class="panel trial-notice">
        <span class="eyebrow">School Licences</span>
        <h2>Shared access for mathematics departments</h2>
        <p>Schools can give named teachers access to the full Kaizen Maths workspace for classroom instruction, practice, homework, intervention, assessment, and revision.</p>
        <p>School prices shown below are early-adopter rates for the first schools that adopt Kaizen Maths. Standard pricing is expected to be higher after the launch period.</p>
      </article>

      <section class="pricing-grid" aria-label="School licence options">
        <article class="panel pricing-card">
          <span class="eyebrow">Early Adopter</span>
          <h2>Up to 5 Teachers</h2>
          <p class="pricing-price">£299/year</p>
          <p class="pricing-note">Expected standard price: £499/year</p>
          <p>Designed for a small maths department or pilot group. Each teacher can sign in, access the full tool library, generate classroom questions, and create worksheets from the same shared virtual textbook.</p>
        </article>
        <article class="panel pricing-card featured">
          <span class="eyebrow">Early Adopter</span>
          <h2>6-15 Teachers</h2>
          <p class="pricing-price">From £499/year</p>
          <p class="pricing-note">Expected standard price: from £899/year</p>
          <p>Suitable for larger departments that want consistent access across year groups, intervention groups, revision lessons, homework, and assessment preparation.</p>
        </article>
        <article class="panel pricing-card">
          <span class="eyebrow">Whole-School Access</span>
          <h2>16+ Teachers</h2>
          <p class="pricing-price">By quote</p>
          <p>For larger schools, trusts, or multi-site access. Pricing can be agreed around the number of teacher accounts, rollout needs, and whether the school wants a longer pilot period.</p>
          <a class="button" href="#/book-demo">Discuss School Access</a>
        </article>
      </section>

      <section class="split-grid">
        <div class="panel">
          <h2>What A School Licence Provides</h2>
          <p>A school licence allows multiple teachers in the same school to use Kaizen Maths for classroom instruction, practice, differentiation, homework, assessment, intervention, and revision. Teachers remain in control of the lesson and choose the topics, levels, timing, and worked examples they want students to see.</p>
        </div>
        <div class="panel">
          <h2>Useful For Departments</h2>
          <div class="badge-row">
            <span class="badge">Shared topic library</span>
            <span class="badge">Board-ready practice</span>
            <span class="badge">Worked solutions</span>
            <span class="badge">Homework worksheets</span>
            <span class="badge">Assessment practice</span>
            <span class="badge">Intervention</span>
          </div>
          <p>Kaizen Maths can support experienced teachers who want quick question access, and less confident teachers who benefit from structured examples, answers, and step-by-step working.</p>
        </div>
      </section>
    </section>
  `;
}

function renderBookDemo() {
  const settings = bookingSettings();
  const bookingUrl = safeExternalUrl(settings.booking_url);
  const providerName = bookingProviderName(settings.provider);
  const contactEmail = settings.contact_email || defaultBookingSettings.contact_email;
  const demoCards = [
    ["Teacher Demo", "See how to choose a topic, project questions, reveal answers and steps, and build a worksheet from the same question bank."],
    ["School Licence Demo", "Walk through department access, school spaces, teacher roles, curriculum coverage, and how Kaizen Maths can support consistency."],
    ["Tutor Demo", "Explore targeted practice, topic selection, worksheet creation, and tutor workflow tools for private tutoring or online lessons."]
  ];
  app.innerHTML = `
    ${pageHeader(
      "Book a Demo",
      "Arrange a short walkthrough of Kaizen Maths for individual teacher access, tutor use, or a school licence.",
      `<a class="button" href="#/schools">School Access</a><a class="button" href="#/kaizen-university">Watch Guides</a>`
    )}
    <section class="booking-page">
      <article class="panel booking-hero">
        <div>
          <span class="eyebrow">${escapeHtml(providerName)} Booking</span>
          <h2>${escapeHtml(settings.headline)}</h2>
          <p>${escapeHtml(settings.description)}</p>
          <div class="button-row">
            ${bookingUrl
              ? `<a class="button primary" href="${escapeHtml(bookingUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(settings.primary_button_label)}</a>`
              : `<span class="button disabled" aria-disabled="true">Booking Link Coming Soon</span>`}
            <a class="button" href="mailto:${escapeHtml(contactEmail)}?subject=Kaizen%20Maths%20demo%20request">Email Demo Request</a>
          </div>
        </div>
        <aside class="booking-quick-note">
          <strong>Useful for</strong>
          <span>Teachers</span>
          <span>Heads of Department</span>
          <span>School leaders</span>
          <span>Private tutors</span>
        </aside>
      </article>

      <section class="booking-demo-grid" aria-label="Demo session types">
        ${demoCards.map(([title, copy]) => `
          <article class="panel booking-card">
            <h3>${title}</h3>
            <p>${copy}</p>
          </article>
        `).join("")}
      </section>

      <section class="panel booking-calendar-panel">
        <div class="booking-calendar-head">
          <div>
            <span class="eyebrow">Choose A Time</span>
            <h2>Book directly from the calendar</h2>
          </div>
          ${bookingUrl ? `<a class="button" href="${escapeHtml(bookingUrl)}" target="_blank" rel="noopener noreferrer">Open In New Tab</a>` : ""}
        </div>
        ${bookingUrl && settings.show_embed
          ? `<iframe class="booking-calendar-frame" src="${escapeHtml(bookingUrl)}" title="Book a Kaizen Maths demo" loading="lazy"></iframe>`
          : `
            <div class="booking-empty">
              <h3>${bookingUrl ? "Calendar embed is switched off" : "Calendar link has not been added yet"}</h3>
              <p>${bookingUrl ? "Use the button above to open the booking calendar in a new tab." : "Once the Calendly link is added in Admin, this page will show the booking calendar and direct booking button."}</p>
              ${isAdmin() ? `<a class="button primary" href="#/admin">Open Admin Settings</a>` : ""}
            </div>
          `}
      </section>
    </section>
  `;
}

function renderUpgrade() {
  const role = currentUserRole();
  const profile = authState().profile || {};
  const trialEnds = profile.trial_ends_at ? formatDisplayDate(profile.trial_ends_at) : "";
  const trialEnded = isSignedIn() && normalise(profile.role) === "trial" && role === "free";
  const checkoutStatus = new URLSearchParams((location.hash.split("?")[1] || "").replace(/^\/?/, "")).get("checkout");
  const statusCopy = checkoutStatus === "success"
    ? "Payment complete. Your access will update as soon as Stripe confirms the subscription."
    : checkoutStatus === "cancelled"
      ? "Checkout was cancelled. You can restart whenever you are ready."
      : "";

  app.innerHTML = `
    ${pageHeader(
      "Upgrade Kaizen Maths",
      "Start a 30-day teacher trial or upgrade to keep full access to the Kaizen Maths teaching workspace.",
      `<a class="button primary" href="#/book-demo">Book a Demo</a><a class="button" href="#/tools">Browse Tools</a>`
    )}
    <section class="upgrade-page">
      <article class="panel trial-notice">
        <span class="eyebrow">Teacher Trial</span>
        <h2>Try the full workspace for 30 days</h2>
        <p>Free visitors can open a small sample of tools. Sign in with Google to start a 30-day teacher trial with access to the wider topic library, classroom generators, worked solutions, worksheet builder, and assessment tools.</p>
        <p>After the trial ends, continued access requires an individual teacher subscription or a school licence. The prices below are early-adopter rates; standard pricing is expected to be higher after launch.</p>
        <div class="button-row">
          ${hasWorkspaceAccess() ? `<a class="button primary" href="#/tools">Open Full Tool Library</a>` : isSignedIn() ? `<a class="button primary" href="#/upgrade">Choose A Plan</a>` : `<button class="button primary" type="button" data-auth-action="signin">Start Free Trial</button>`}
          <a class="button" href="#/book-demo">Book a Demo</a>
          ${hasWorkspaceAccess() ? `<a class="button" href="#/worksheet-generator">Open Worksheet Builder</a>` : `<a class="button" href="#/tools">Browse Free Samples</a>`}
        </div>
      </article>

      <article class="panel upgrade-summary">
        <span class="eyebrow">Current Access</span>
        <h2>${isSignedIn() ? titleCaseAccess(role) + " access" : "Not signed in"}</h2>
        <p>${isSignedIn() ? `Signed in as ${escapeHtml(authState().session?.user?.email || "teacher")}.` : "Sign in with Google to start a 30-day teacher trial."}</p>
        ${trialEnds ? `<p><strong>${trialEnded ? "Trial ended:" : "Trial until:"}</strong> ${escapeHtml(trialEnds)}</p>` : ""}
        ${profile.subscription_status ? `<p><strong>Subscription:</strong> ${escapeHtml(profile.subscription_status)}</p>` : ""}
        ${statusCopy ? `<p class="upgrade-status" data-tone="${checkoutStatus}">${statusCopy}</p>` : `<p class="upgrade-status" id="upgradeStatus"></p>`}
        <div class="button-row">
          ${isSignedIn() ? `<button class="button" type="button" id="manageBilling">Manage Billing</button>` : `<button class="button primary" type="button" data-auth-action="signin">Sign in with Google</button>`}
          ${isAdmin() ? `<button class="button subtle" type="button" id="runBillingDiagnostics">Run Billing Diagnostics</button>` : ""}
        </div>
      </article>

      <section class="pricing-grid" aria-label="Pricing options">
        <article class="panel pricing-card">
          <span class="eyebrow">Early Adopter</span>
          <h2>Monthly</h2>
          <p class="pricing-price">£9.99/month</p>
          <p class="pricing-note">Expected standard price: £14.99/month</p>
          <p>Flexible access for one teacher. Use the full topic library, board-ready generators, worked solutions, worksheet builder, and assessment practice.</p>
          <button class="button primary" type="button" data-checkout-plan="monthly">${isSignedIn() ? "Upgrade Monthly" : "Sign In To Upgrade"}</button>
        </article>
        <article class="panel pricing-card featured">
          <span class="eyebrow">Early Adopter</span>
          <h2>Annual</h2>
          <p class="pricing-price">£89/year</p>
          <p class="pricing-note">Expected standard price: £149/year</p>
          <p>Best for teachers who want full access across the year for planning, classroom practice, homework, revision, intervention, and assessment.</p>
          <button class="button primary" type="button" data-checkout-plan="annual">${isSignedIn() ? "Upgrade Annual" : "Sign In To Upgrade"}</button>
        </article>
        <article class="panel pricing-card">
          <span class="eyebrow">Early Adopter</span>
          <h2>Department Access</h2>
          <p class="pricing-price">From £299/year</p>
          <p class="pricing-note">Expected standard price: from £499/year</p>
          <p>For schools that want several teachers to use the full virtual mathematics textbook across lessons, homework, intervention, revision, and assessment.</p>
          <div class="button-row">
            <a class="button primary" href="#/book-demo">Book School Demo</a>
            <a class="button" href="#/schools">Notes For Schools</a>
          </div>
        </article>
      </section>

      <section class="panel upgrade-details">
        <h2>What Paid Access Unlocks</h2>
        <div class="badge-row">
          <span class="badge">Full tool library</span>
          <span class="badge">Unlimited questions</span>
          <span class="badge">Worked solutions</span>
          <span class="badge">Worksheet builder</span>
          <span class="badge">Answer keys</span>
          <span class="badge">Assessment practice</span>
          <span class="badge">Teacher-controlled lessons</span>
        </div>
        <p>Kaizen Maths remains a teaching support tool. Teachers choose the topic, level, pace, and how the questions are used in the lesson.</p>
      </section>
    </section>
  `;
  bindAuthActions();
  bindUpgradeActions();
}

async function currentAccessToken() {
  const client = await window.KaizenAuth?.getClient?.();
  const { data } = await client.auth.getSession();
  return data.session?.access_token || "";
}

function setUpgradeStatus(message, tone = "") {
  const status = document.getElementById("upgradeStatus") || document.querySelector(".upgrade-status");
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function formatBillingDiagnosticPrice(price) {
  const planLabel = price.plan === "annual" ? "Annual" : "Monthly";
  const idLabel = price.value?.present
    ? `${price.value.prefix}...${price.value.suffix || ""}`
    : "missing";
  if (price.ok) {
    return `${planLabel} price: found (${price.livemode ? "live" : "sandbox"}, ${price.currency || "currency unknown"}${price.interval ? `, ${price.interval}` : ""}, ${price.active ? "active" : "inactive"})`;
  }
  return `${planLabel} price: not found (${idLabel}). ${price.error || "Check this price ID."}`;
}

function formatBillingDiagnostics(report) {
  const keyMode = report.stripeSecretKey?.mode || "unknown";
  const webhook = report.webhookSecret?.value?.present ? "present" : "missing";
  const customer = report.currentUserCustomer?.status
    ? `Saved customer: ${report.currentUserCustomer.status}${report.currentUserCustomer.ok ? "" : ` (${report.currentUserCustomer.error || "not usable"})`}.`
    : "Saved customer: not checked.";
  const prices = Array.isArray(report.prices) ? report.prices.map(formatBillingDiagnosticPrice).join(" | ") : "No price report returned.";
  const issue = report.likelyIssue ? ` | ${report.likelyIssue}` : "";
  return `Stripe key mode: ${keyMode}. Webhook secret: ${webhook}. ${customer} ${prices}${issue}`;
}

async function postBillingEndpoint(path, body = {}) {
  const token = await currentAccessToken();
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Billing request failed.");
  return payload;
}

function bindUpgradeActions() {
  document.querySelectorAll("[data-checkout-plan]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!isSignedIn()) {
        window.KaizenAuth?.signInWithGoogle?.();
        return;
      }
      const plan = button.dataset.checkoutPlan;
      button.disabled = true;
      setUpgradeStatus("Opening secure Stripe checkout...", "loading");
      try {
        const { url } = await postBillingEndpoint("/api/create-checkout-session", { plan });
        window.location.href = url;
      } catch (error) {
        button.disabled = false;
        setUpgradeStatus(error.message.includes("Unexpected token") ? "Checkout is available after deployment to Vercel." : error.message, "error");
      }
    });
  });

  document.getElementById("manageBilling")?.addEventListener("click", async (event) => {
    event.currentTarget.disabled = true;
    setUpgradeStatus("Opening Stripe billing portal...", "loading");
    try {
      const { url } = await postBillingEndpoint("/api/create-billing-portal-session");
      window.location.href = url;
    } catch (error) {
      event.currentTarget.disabled = false;
      setUpgradeStatus(error.message, "error");
    }
  });

  document.getElementById("runBillingDiagnostics")?.addEventListener("click", async (event) => {
    event.currentTarget.disabled = true;
    setUpgradeStatus("Checking Stripe key and price IDs in Vercel...", "loading");
    try {
      const report = await postBillingEndpoint("/api/billing-diagnostics");
      setUpgradeStatus(formatBillingDiagnostics(report), report.ok ? "success" : "error");
    } catch (error) {
      setUpgradeStatus(error.message, "error");
    } finally {
      event.currentTarget.disabled = false;
    }
  });
}

function adminTestimonialRowHtml(testimonial, index) {
  const row = normaliseTestimonial(testimonial, index);
  return `
    <article class="admin-testimonial-row" data-testimonial-row data-slot-id="${escapeHtml(row.slot_id)}">
      <div class="admin-testimonial-default">
        <strong>Quote ${index + 1}</strong>
        <small>${row.quote ? escapeHtml(row.quote) : "Empty quote slot"}</small>
      </div>
      <div class="admin-testimonial-fields">
        <label>
          Quote
          <textarea data-testimonial-field="quote" rows="3" placeholder="Paste the teacher quote">${escapeHtml(row.quote)}</textarea>
        </label>
        <label>
          Person
          <input data-testimonial-field="person_name" type="text" value="${escapeHtml(row.person_name)}" placeholder="Name or role">
        </label>
        <label>
          Role / title
          <input data-testimonial-field="role_label" type="text" value="${escapeHtml(row.role_label)}" placeholder="Maths teacher, Head of Department, Tutor">
        </label>
        <label>
          School / organisation
          <input data-testimonial-field="organisation" type="text" value="${escapeHtml(row.organisation)}" placeholder="Optional">
        </label>
        <label>
          Display order
          <input data-testimonial-field="sort_order" type="number" min="1" max="99" value="${escapeHtml(row.sort_order)}">
        </label>
        <label class="admin-check-row">
          <input data-testimonial-field="is_active" type="checkbox" ${row.is_active ? "checked" : ""}>
          Show in homepage carousel
        </label>
      </div>
    </article>
  `;
}

function adminHomepageScreenshotRowHtml(screenshot, index) {
  const row = normaliseHomepageScreenshot(screenshot, index);
  return `
    <article class="admin-testimonial-row admin-screenshot-row" data-home-screenshot-row data-screenshot-id="${escapeHtml(row.screenshot_id)}">
      <div class="admin-testimonial-default">
        <strong>${escapeHtml(row.title || `Screenshot ${index + 1}`)}</strong>
        <small>${row.image_url ? escapeHtml(row.image_url) : "Add a public image URL or asset path"}</small>
      </div>
      <div class="admin-testimonial-fields">
        <label>
          Title
          <input data-home-screenshot-field="title" type="text" value="${escapeHtml(row.title)}" placeholder="Worksheet Builder">
        </label>
        <label>
          Description
          <textarea data-home-screenshot-field="description" rows="2" placeholder="Short caption for this screenshot">${escapeHtml(row.description)}</textarea>
        </label>
        <label>
          Image URL or asset path
          <input data-home-screenshot-field="image_url" type="text" value="${escapeHtml(row.image_url)}" placeholder="assets/guide-screenshots/worksheet-builder.png">
        </label>
        <label>
          Display order
          <input data-home-screenshot-field="sort_order" type="number" min="1" max="99" value="${escapeHtml(row.sort_order)}">
        </label>
        <label class="admin-check-row">
          <input data-home-screenshot-field="is_active" type="checkbox" ${row.is_active ? "checked" : ""}>
          Show in homepage screenshot carousel
        </label>
      </div>
    </article>
  `;
}

function adminSchoolRowHtml(school = {}, index = 0) {
  const id = school.id || "";
  const teacherEmails = id ? schoolTeacherEmails(id).join("\n") : "";
  const currentSeats = id ? schoolSeatCount(id) : 0;
  const seatLimit = school.seat_limit || "";
  const seatCopy = id
    ? `${currentSeats} of ${seatLimit || "unlimited"} teacher seats in use`
    : "New school licence";
  return `
    <article class="admin-school-row" data-school-row data-school-id="${escapeHtml(id)}">
      <div class="admin-school-default">
        <strong>${escapeHtml(school.name || `School ${index + 1}`)}</strong>
        <small>${escapeHtml(seatCopy)}</small>
        <small>${school.is_active === false ? "Inactive" : "Active"} · Code: ${escapeHtml(school.join_code || "Not set")}</small>
      </div>
      <div class="admin-school-fields">
        <label>
          School name
          <input data-school-field="name" type="text" value="${escapeHtml(school.name || "")}" placeholder="School or trust name">
        </label>
        <label>
          Licence type
          <input data-school-field="licence_type" type="text" value="${escapeHtml(school.licence_type || "school")}" placeholder="school, trust, pilot">
        </label>
        <label>
          Seat limit
          <input data-school-field="seat_limit" type="number" min="1" value="${escapeHtml(seatLimit)}" placeholder="Optional">
        </label>
        <label>
          Join code
          <span class="admin-code-row">
            <input data-school-field="join_code" type="text" value="${escapeHtml(school.join_code || "")}" placeholder="Generate or type a code">
            <button class="button subtle admin-generate-code" type="button">Generate</button>
          </span>
        </label>
        <label>
          Approved domains
          <input data-school-field="allowed_domains" type="text" value="${escapeHtml(school.allowed_domains || "")}" placeholder="school.org, trust.org">
        </label>
        <label>
          Code expires
          <input data-school-field="join_code_expires_at" type="date" value="${escapeHtml(formatDateForInput(school.join_code_expires_at))}">
        </label>
        <label>
          Licence starts
          <input data-school-field="licence_starts_at" type="date" value="${escapeHtml(formatDateForInput(school.licence_starts_at))}">
        </label>
        <label>
          Licence ends
          <input data-school-field="licence_ends_at" type="date" value="${escapeHtml(formatDateForInput(school.licence_ends_at))}">
        </label>
        <label class="admin-check-row">
          <input data-school-field="is_active" type="checkbox" ${school.is_active === false ? "" : "checked"}>
          Active school licence
        </label>
        <label>
          Approved teacher emails
          <textarea data-school-field="teacher_emails" rows="4" placeholder="One email per line, or separate with commas">${escapeHtml(teacherEmails)}</textarea>
        </label>
        <label>
          Admin notes
          <textarea data-school-field="notes" rows="4" placeholder="Internal notes only">${escapeHtml(school.notes || "")}</textarea>
        </label>
      </div>
    </article>
  `;
}

const launchReadinessStorageKey = "kaizen:launch-readiness-checks";

function launchReadinessState() {
  try {
    return JSON.parse(localStorage.getItem(launchReadinessStorageKey) || "{}");
  } catch (error) {
    return {};
  }
}

function saveLaunchReadinessState(values) {
  try {
    localStorage.setItem(launchReadinessStorageKey, JSON.stringify(values));
  } catch (error) {
    // The checklist still works as a visual note if local storage is unavailable.
  }
}

function launchReadinessChecklistHtml() {
  const saved = launchReadinessState();
  const allItems = launchReadinessSections.flatMap((section) => section.items);
  const completeCount = allItems.filter(([id]) => saved[id]).length;
  const totalCount = allItems.length;
  const percent = totalCount ? Math.round((completeCount / totalCount) * 100) : 0;
  return `
    <section class="launch-readiness">
      <article class="launch-readiness-summary">
        <div>
          <span class="eyebrow">Private Admin Note</span>
          <h3>Launch Readiness Checklist</h3>
          <p>Use this as a lightweight pre-launch board. It is stored locally in this browser, so it is for your working notes rather than a shared school-facing record.</p>
        </div>
        <div class="launch-progress" aria-label="${completeCount} of ${totalCount} launch checks complete">
          <strong id="launchProgressCount">${completeCount}/${totalCount}</strong>
          <span>complete</span>
          <div class="launch-progress-bar" aria-hidden="true">
            <span id="launchProgressFill" style="width: ${percent}%"></span>
          </div>
        </div>
      </article>
      <div class="launch-check-grid">
        ${launchReadinessSections.map((section) => `
          <article class="launch-check-section">
            <h3>${escapeHtml(section.title)}</h3>
            ${section.items.map(([id, label, note]) => `
              <label class="launch-check-item">
                <input type="checkbox" data-launch-check="${escapeHtml(id)}" ${saved[id] ? "checked" : ""}>
                <span>
                  <strong>${escapeHtml(label)}</strong>
                  <small>${escapeHtml(note)}</small>
                </span>
              </label>
            `).join("")}
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderAdmin() {
  if (!isSignedIn()) {
    app.innerHTML = `
      ${pageHeader("Admin", "Manage access levels for the virtual textbook: free samples, 30-day trials, individual teachers, and school licences.")}
      ${signInCallout("Admin sign-in required")}
    `;
    bindAuthActions();
    return;
  }

  if (!isAdmin()) {
    app.innerHTML = `
      ${pageHeader("Admin", "Your account is signed in, but it has not been marked as admin yet.")}
      <section class="panel access-callout">
        <span class="eyebrow">Admin Setup</span>
        <h2>Make your account admin in Supabase</h2>
        <p>In Supabase, open <strong>Table Editor → profiles</strong>, find your user row, and change <code>role</code> from <code>trial</code> to <code>admin</code>. Then refresh this page.</p>
        <p>Current role: <strong>${escapeHtml(currentUserRole())}</strong></p>
      </section>
    `;
    return;
  }

  if (!state.usersLoaded) {
    loadUserProfiles({ rerender: true });
  }

  if (!state.schoolsLoaded) {
    loadSchools({ rerender: true });
  }

  const adminTools = tools.filter(isVisibleTool);
  const rows = adminTools.map((tool) => {
    const current = requiredAccess(tool);
    return `
      <tr>
        <td>
          <strong>${escapeHtml(tool.title)}</strong>
          <small>${escapeHtml(tool.category)} · ${escapeHtml(tool.level)}</small>
        </td>
        <td>${escapeHtml(tool.slug)}</td>
        <td>
          <select class="admin-access-select" data-tool-slug="${escapeHtml(tool.slug)}">
            ${accessLevels.map((level) => `<option value="${level}" ${current === level ? "selected" : ""}>${titleCaseAccess(level)}</option>`).join("")}
          </select>
        </td>
      </tr>
    `;
  }).join("");

  const metadataCards = adminTools.map((tool) => {
    const metadata = toolMetadata(tool);
    return `
      <article class="admin-metadata-card">
        <div class="admin-metadata-card-head">
          <strong>${escapeHtml(tool.title)}</strong>
          <small>${escapeHtml(tool.category)} · ${escapeHtml(tool.level)}</small>
        </div>
        <label class="admin-metadata-field">
          Curriculum / exam tags
          <input class="admin-metadata-input" type="text" autocomplete="off" spellcheck="false" data-tool-slug="${escapeHtml(tool.slug)}" data-metadata-field="curriculum_tags" value="${escapeHtml(metadata.curriculum_tags || "")}" placeholder="CSEC, CAPE, Common Core, IGCSE, IB, AP">
        </label>
        <label class="admin-metadata-field">
          Admin notes
          <textarea class="admin-metadata-input" data-tool-slug="${escapeHtml(tool.slug)}" data-metadata-field="admin_notes" rows="2" placeholder="Internal note, exam-board fit, future edits">${escapeHtml(metadata.admin_notes || "")}</textarea>
        </label>
      </article>
    `;
  }).join("");

  const heroContent = homepageHeroContent();
  const booking = bookingSettings();
  const homepageScreenshotRows = homepageScreenshotAdminList()
    .map((screenshot, index) => adminHomepageScreenshotRowHtml(screenshot, index))
    .join("");

  const videoRows = adminUniversitySections.map((section) => `
    <section class="admin-video-section">
      <h3>${escapeHtml(section.title)}</h3>
      ${section.videos.map((video) => {
        const saved = state.universityVideos[video.id] || {};
        const url = typeof saved === "string" ? saved : saved.youtube_url || "";
        const title = typeof saved === "string" ? "" : saved.title || "";
        const description = typeof saved === "string" ? "" : saved.description || "";
        const duration = typeof saved === "string" ? "" : saved.duration_label || "";
        return `
          <div class="admin-video-row">
            <div class="admin-video-default">
              <strong>${escapeHtml(video.title)}</strong>
              <small>${escapeHtml(video.description)}</small>
            </div>
            <div class="admin-video-fields" data-video-slot="${escapeHtml(video.id)}">
              <label>
                YouTube link
                <input type="url" class="admin-video-input" data-video-field="youtube_url" value="${escapeHtml(url)}" placeholder="Paste YouTube link or video ID">
              </label>
              <label>
                Title override
                <input type="text" class="admin-video-input" data-video-field="title" value="${escapeHtml(title)}" placeholder="${escapeHtml(video.title)}">
              </label>
              <label>
                Description override
                <textarea class="admin-video-input admin-video-textarea" data-video-field="description" rows="3" placeholder="${escapeHtml(video.description)}">${escapeHtml(description)}</textarea>
              </label>
              <label>
                Label override
                <input type="text" class="admin-video-input" data-video-field="duration_label" value="${escapeHtml(duration)}" placeholder="Video guide">
              </label>
            </div>
          </div>
        `;
      }).join("")}
    </section>
  `).join("");

  const testimonialRows = testimonialAdminList()
    .map((testimonial, index) => adminTestimonialRowHtml(testimonial, index))
    .join("");

  const schoolRows = state.schools.length
    ? state.schools.map((school, index) => adminSchoolRowHtml(school, index)).join("")
    : adminSchoolRowHtml({}, 0);

  const schoolOptions = [
    `<option value="">No school</option>`,
    ...state.schools.map((school) => `<option value="${escapeHtml(school.id)}">${escapeHtml(school.name)}</option>`)
  ].join("");

  const userRows = state.userProfiles.length ? state.userProfiles.map((profile) => `
    <tr>
      <td>
        <strong>${escapeHtml(profile.full_name || profile.email || "Teacher")}</strong>
        <small>${escapeHtml(profile.email || "No email")} · Joined ${escapeHtml(formatDisplayDate(profile.created_at))}</small>
      </td>
      <td>
        <select class="admin-user-role" data-user-id="${escapeHtml(profile.id)}">
          ${accessLevels.map((level) => `<option value="${level}" ${normalise(profile.role) === level ? "selected" : ""}>${titleCaseAccess(level)}</option>`).join("")}
        </select>
      </td>
      <td>
        <select class="admin-user-school" data-user-id="${escapeHtml(profile.id)}">
          ${schoolOptions.replace(`value="${escapeHtml(profile.school_id || "")}"`, `value="${escapeHtml(profile.school_id || "")}" selected`)}
        </select>
        <small>${escapeHtml(schoolById(profile.school_id)?.name || "No linked school")}</small>
      </td>
      <td>
        <input class="admin-user-trial-date" type="date" data-user-id="${escapeHtml(profile.id)}" value="${escapeHtml(formatDateForInput(profile.trial_ends_at))}">
        <small>Current: ${escapeHtml(formatDisplayDate(profile.trial_ends_at))}</small>
      </td>
      <td>
        <small>${escapeHtml(profile.subscription_status || "No Stripe status")}</small>
        <small>${escapeHtml(profile.plan_key || "No plan")}</small>
      </td>
      <td>
        <button class="button subtle admin-save-user" type="button" data-user-id="${escapeHtml(profile.id)}">Save</button>
      </td>
    </tr>
  `).join("") : `
    <tr>
      <td colspan="6">
        <strong>No signed-up users loaded yet.</strong>
        <small>${state.usersLoaded ? "No profile rows were found." : "Open this tab after Supabase has loaded, or refresh while signed in as admin."}</small>
      </td>
    </tr>
  `;

  app.innerHTML = `
    ${pageHeader("Admin", "Manage simple site updates without editing code: homepage content, access rules, curriculum tags, videos, and testimonials.")}
    <section class="admin-tabs" aria-label="Admin sections">
      <button class="admin-tab active" type="button" data-admin-tab="users">Users</button>
      <button class="admin-tab" type="button" data-admin-tab="launch">Launch Checklist</button>
      <button class="admin-tab" type="button" data-admin-tab="homepage">Homepage</button>
      <button class="admin-tab" type="button" data-admin-tab="booking">Booking</button>
      <button class="admin-tab" type="button" data-admin-tab="schools">Schools</button>
      <button class="admin-tab" type="button" data-admin-tab="access">Tool Access</button>
      <button class="admin-tab" type="button" data-admin-tab="metadata">Tool Tags</button>
      <button class="admin-tab" type="button" data-admin-tab="university">Kaizen University</button>
      <button class="admin-tab" type="button" data-admin-tab="testimonials">Testimonials</button>
    </section>
    <section class="panel admin-panel admin-tab-panel active" data-admin-panel="users">
      <div class="admin-toolbar">
        <div>
          <span class="eyebrow">Accounts</span>
          <h2>Signed-Up Users</h2>
          <p>View teacher accounts, update roles, and set individual trial end dates. Pro and school roles can also be assigned manually while payment and school licences are being set up.</p>
        </div>
        <button class="button" id="refreshAdminUsers" type="button">Refresh Users</button>
      </div>
      <p class="admin-status" id="adminUsersStatus">${state.usersLoaded ? `Loaded ${state.userProfiles.length} user${state.userProfiles.length === 1 ? "" : "s"}.` : "Loading users from Supabase..."}</p>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr><th>User</th><th>Role</th><th>School</th><th>Trial Until</th><th>Billing</th><th>Action</th></tr>
          </thead>
          <tbody>${userRows}</tbody>
        </table>
      </div>
    </section>
    <section class="panel admin-panel admin-tab-panel" data-admin-panel="launch">
      ${launchReadinessChecklistHtml()}
    </section>
    <section class="panel admin-panel admin-tab-panel" data-admin-panel="homepage">
      <div class="admin-toolbar">
        <div>
          <span class="eyebrow">Landing Page</span>
          <h2>Homepage Hero</h2>
          <p>Edit the first screen teachers see: the short copy and the screenshot carousel beside the video.</p>
        </div>
        <div class="button-row">
          <button class="button" id="addHomepageScreenshot" type="button">Add Screenshot</button>
          <button class="button primary" id="saveHomepageContent" type="button">Save Homepage</button>
        </div>
      </div>
      <p class="admin-status" id="adminHomepageStatus">${state.homepageContentLoaded || state.homepageScreenshotsLoaded ? "Loaded homepage settings from Supabase." : "Using default homepage settings. Run the latest Supabase schema for live editing across devices."}</p>
      <div class="admin-homepage-grid">
        <article class="admin-homepage-copy">
          <h3>Hero Copy</h3>
          <label>
            Small heading
            <input data-homepage-field="eyebrow" type="text" value="${escapeHtml(heroContent.eyebrow)}">
          </label>
          <label>
            Main heading
            <input data-homepage-field="headline" type="text" value="${escapeHtml(heroContent.headline)}">
          </label>
          <label>
            Supporting line
            <textarea data-homepage-field="subheading" rows="4">${escapeHtml(heroContent.subheading)}</textarea>
          </label>
          <label>
            Screenshot label
            <input data-homepage-field="gallery_label" type="text" value="${escapeHtml(heroContent.gallery_label)}">
          </label>
          <label>
            Screenshot heading
            <input data-homepage-field="gallery_heading" type="text" value="${escapeHtml(heroContent.gallery_heading)}">
          </label>
        </article>
        <article class="admin-homepage-screenshots">
          <h3>Screenshot Carousel</h3>
          <p>Use a public image URL or an existing site asset path. Untick a screenshot to remove it from the homepage flow.</p>
          <div class="admin-testimonial-list" id="adminHomepageScreenshotList">
            ${homepageScreenshotRows}
          </div>
        </article>
      </div>
    </section>
    <section class="panel admin-panel admin-tab-panel" data-admin-panel="booking">
      <div class="admin-toolbar">
        <div>
          <span class="eyebrow">Demo Sessions</span>
          <h2>Booking Calendar</h2>
          <p>Paste your Calendly or Google Calendar booking link here. The public Book a Demo page and site buttons will use this setting.</p>
        </div>
        <button class="button primary" id="saveBookingSettings" type="button">Save Booking Settings</button>
      </div>
      <p class="admin-status" id="adminBookingStatus">${state.bookingSettingsLoaded ? "Loaded booking settings from Supabase." : "Using default booking settings. Add your Calendly link when ready."}</p>
      <div class="admin-homepage-grid admin-booking-grid">
        <article class="admin-homepage-copy">
          <h3>Calendar Link</h3>
          <label>
            Provider
            <select data-booking-field="provider">
              <option value="calendly" ${booking.provider === "calendly" ? "selected" : ""}>Calendly</option>
              <option value="google" ${booking.provider === "google" ? "selected" : ""}>Google Calendar</option>
              <option value="custom" ${booking.provider === "custom" ? "selected" : ""}>Other booking link</option>
            </select>
          </label>
          <label>
            Booking URL
            <input data-booking-field="booking_url" type="url" value="${escapeHtml(booking.booking_url)}" placeholder="https://calendly.com/your-name/kaizen-maths-demo">
          </label>
          <label class="admin-check-row">
            <input data-booking-field="show_embed" type="checkbox" ${booking.show_embed ? "checked" : ""}>
            Show calendar embed on the Book a Demo page
          </label>
        </article>
        <article class="admin-homepage-copy">
          <h3>Page Copy</h3>
          <label>
            Page heading
            <input data-booking-field="headline" type="text" value="${escapeHtml(booking.headline)}">
          </label>
          <label>
            Description
            <textarea data-booking-field="description" rows="4">${escapeHtml(booking.description)}</textarea>
          </label>
          <label>
            Button label
            <input data-booking-field="primary_button_label" type="text" value="${escapeHtml(booking.primary_button_label)}">
          </label>
          <label>
            Fallback contact email
            <input data-booking-field="contact_email" type="email" value="${escapeHtml(booking.contact_email)}">
          </label>
        </article>
      </div>
    </section>
    <section class="panel admin-panel admin-tab-panel" data-admin-panel="schools">
      <div class="admin-toolbar">
        <div>
          <span class="eyebrow">School Licences</span>
          <h2>Schools</h2>
          <p>Create school spaces, approve domains or teacher emails, set seat limits, and share join codes with departments.</p>
        </div>
        <div class="button-row">
          <button class="button" id="addSchoolRow" type="button">Add School</button>
          <button class="button primary" id="saveSchools" type="button">Save Schools</button>
        </div>
      </div>
      <p class="admin-status" id="adminSchoolsStatus">${state.schoolsLoaded ? `Loaded ${state.schools.length} school${state.schools.length === 1 ? "" : "s"}.` : "Loading schools from Supabase..."}</p>
      <div class="admin-school-list" id="adminSchoolList">
        ${schoolRows}
      </div>
    </section>
    <section class="panel admin-panel admin-tab-panel" data-admin-panel="access">
      <div class="admin-toolbar">
        <div>
          <span class="eyebrow">Access Rules</span>
          <h2>Tool Access</h2>
          <p>Signed-out visitors can open the approved Free sample topics only. Signed-in trial users can open Trial topics for 30 days. Keep most topic tools as Trial or Pro once paid access is live.</p>
        </div>
        <button class="button primary" id="saveAccessRules" type="button">Save Access Rules</button>
      </div>
      <p class="admin-status" id="adminAccessStatus">${state.accessLoaded ? "Loaded from Supabase." : "Using default access levels until Supabase settings load."}</p>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr><th>Tool</th><th>Slug</th><th>Required Access</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
    <section class="panel admin-panel admin-tab-panel" data-admin-panel="metadata">
      <div class="admin-toolbar">
        <div>
          <span class="eyebrow">Search And Alignment</span>
          <h2>Tool Tags</h2>
          <p>Add curriculum, exam-board, country, or route labels manually. Use commas between tags, for example: CSEC, CAPE, Common Core, IGCSE, IB, AP.</p>
        </div>
        <button class="button primary" id="saveToolMetadata" type="button">Save Tool Tags</button>
      </div>
      <p class="admin-status" id="adminMetadataStatus">Typed tags appear in library search and on tool cards. Notes are internal search/admin context.</p>
      <div class="admin-metadata-list">
        ${metadataCards}
      </div>
    </section>
    <section class="panel admin-panel admin-tab-panel" data-admin-panel="university">
      <div class="admin-toolbar">
        <div>
          <span class="eyebrow">Kaizen University</span>
          <h2>Video Embeds</h2>
          <p>Paste the correct YouTube link beside each training video slot. The first section controls the homepage video shown underneath the testimonials in the hero area.</p>
        </div>
        <button class="button primary" id="saveUniversityVideos" type="button">Save Video Content</button>
      </div>
      <p class="admin-status" id="adminVideoStatus">Use the Homepage Feature row to change the video on the landing page. Empty copy fields use the default text. Paste full YouTube links, unlisted links, embed links, or video IDs.</p>
      <div class="admin-video-list">
        ${videoRows}
      </div>
    </section>
    <section class="panel admin-panel admin-tab-panel" data-admin-panel="testimonials">
      <div class="admin-toolbar">
        <div>
          <span class="eyebrow">Homepage Quotes</span>
          <h2>Testimonials Carousel</h2>
          <p>Edit the quotes that rotate inside the first view of the homepage. Use active quotes only when you have permission to publish the person&apos;s name, role, or school.</p>
        </div>
        <div class="button-row">
          <button class="button" id="addTestimonialRow" type="button">Add Quote</button>
          <button class="button primary" id="saveTestimonials" type="button">Save Testimonials</button>
        </div>
      </div>
      <p class="admin-status" id="adminTestimonialsStatus">${state.testimonialsLoaded ? "Loaded testimonials from Supabase." : "Showing default quote slots. Create the site_testimonials table in Supabase for live editing."}</p>
      <div class="admin-testimonial-list" id="adminTestimonialList">
        ${testimonialRows}
      </div>
    </section>
  `;
  bindAdmin();
}

function bindAdmin() {
  document.querySelectorAll(".admin-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.adminTab;
      document.querySelectorAll(".admin-tab").forEach((item) => item.classList.toggle("active", item === tab));
      document.querySelectorAll(".admin-tab-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.adminPanel === target);
      });
    });
  });

  const status = document.getElementById("adminAccessStatus");
  const usersStatus = document.getElementById("adminUsersStatus");
  document.getElementById("refreshAdminUsers")?.addEventListener("click", async () => {
    const button = document.getElementById("refreshAdminUsers");
    button.disabled = true;
    usersStatus.textContent = "Refreshing users...";
    await loadUserProfiles({ rerender: true });
  });

  document.querySelectorAll(".admin-save-user").forEach((button) => {
    button.addEventListener("click", async () => {
      const userId = button.dataset.userId;
      const role = document.querySelector(`.admin-user-role[data-user-id="${CSS.escape(userId)}"]`)?.value || "trial";
      const schoolId = document.querySelector(`.admin-user-school[data-user-id="${CSS.escape(userId)}"]`)?.value || "";
      const trialDate = document.querySelector(`.admin-user-trial-date[data-user-id="${CSS.escape(userId)}"]`)?.value || "";
      button.disabled = true;
      usersStatus.textContent = "Saving user access...";
      try {
        await saveUserProfileAccess(userId, {
          role,
          school_id: schoolId,
          trial_ends_at: trialDate
        });
        usersStatus.textContent = "Saved. User access has been updated.";
        button.disabled = false;
      } catch (error) {
        usersStatus.textContent = `Could not save: ${error.message}`;
        button.disabled = false;
      }
    });
  });

  const schoolsStatus = document.getElementById("adminSchoolsStatus");
  const schoolList = document.getElementById("adminSchoolList");

  function updateLaunchProgress() {
    const checkboxes = [...document.querySelectorAll("[data-launch-check]")];
    const total = checkboxes.length;
    const checked = checkboxes.filter((checkbox) => checkbox.checked).length;
    const values = Object.fromEntries(checkboxes.map((checkbox) => [checkbox.dataset.launchCheck, checkbox.checked]));
    saveLaunchReadinessState(values);
    const count = document.getElementById("launchProgressCount");
    const fill = document.getElementById("launchProgressFill");
    if (count) count.textContent = `${checked}/${total}`;
    if (fill) fill.style.width = `${total ? Math.round((checked / total) * 100) : 0}%`;
  }

  document.querySelectorAll("[data-launch-check]").forEach((checkbox) => {
    checkbox.addEventListener("change", updateLaunchProgress);
  });

  const homepageStatus = document.getElementById("adminHomepageStatus");
  const homepageScreenshotList = document.getElementById("adminHomepageScreenshotList");

  document.getElementById("addHomepageScreenshot")?.addEventListener("click", () => {
    const rows = homepageScreenshotList?.querySelectorAll("[data-home-screenshot-row]").length || 0;
    homepageScreenshotList?.insertAdjacentHTML("beforeend", adminHomepageScreenshotRowHtml({
      screenshot_id: `screenshot-${Date.now()}`,
      title: "",
      description: "",
      image_url: "",
      is_active: false,
      sort_order: rows + 1
    }, rows));
  });

  document.getElementById("saveHomepageContent")?.addEventListener("click", async () => {
    const button = document.getElementById("saveHomepageContent");
    const field = (name) => document.querySelector(`[data-homepage-field="${name}"]`)?.value || "";
    const screenshotRows = [...document.querySelectorAll("[data-home-screenshot-row]")].map((row, index) => {
      const screenshotField = (name) => row.querySelector(`[data-home-screenshot-field="${name}"]`);
      return {
        screenshot_id: row.dataset.screenshotId || `screenshot-${index + 1}`,
        title: screenshotField("title")?.value.trim() || "",
        description: screenshotField("description")?.value.trim() || "",
        image_url: screenshotField("image_url")?.value.trim() || "",
        sort_order: Number(screenshotField("sort_order")?.value || index + 1),
        is_active: Boolean(screenshotField("is_active")?.checked)
      };
    });
    button.disabled = true;
    homepageStatus.textContent = "Saving homepage content...";
    try {
      const copySource = await saveHomepageContent({
        eyebrow: field("eyebrow"),
        headline: field("headline"),
        subheading: field("subheading"),
        highlight_1: field("highlight_1"),
        highlight_2: field("highlight_2"),
        highlight_3: field("highlight_3"),
        gallery_label: field("gallery_label"),
        gallery_heading: field("gallery_heading")
      });
      const screenshotSource = await saveHomepageScreenshots(screenshotRows);
      const sourceCopy = copySource === "supabase" && screenshotSource === "supabase"
        ? "Saved. Homepage content is now live."
        : "Saved in this browser. Run the latest Supabase schema to make homepage edits live for everyone.";
      homepageStatus.textContent = sourceCopy;
      button.disabled = false;
    } catch (error) {
      homepageStatus.textContent = `Could not save homepage content: ${error.message}`;
      button.disabled = false;
    }
  });

  const bookingStatus = document.getElementById("adminBookingStatus");
  document.getElementById("saveBookingSettings")?.addEventListener("click", async () => {
    const button = document.getElementById("saveBookingSettings");
    const field = (name) => document.querySelector(`[data-booking-field="${name}"]`);
    button.disabled = true;
    bookingStatus.textContent = "Saving booking settings...";
    try {
      const source = await saveBookingSettings({
        provider: field("provider")?.value || "calendly",
        booking_url: field("booking_url")?.value || "",
        headline: field("headline")?.value || "",
        description: field("description")?.value || "",
        primary_button_label: field("primary_button_label")?.value || "",
        contact_email: field("contact_email")?.value || "",
        show_embed: Boolean(field("show_embed")?.checked)
      });
      bookingStatus.textContent = source === "supabase"
        ? "Saved. The Book a Demo page is now using this calendar link."
        : "Saved in this browser only. Save again when Supabase is available to make booking settings live for everyone.";
      button.disabled = false;
    } catch (error) {
      bookingStatus.textContent = `Could not save booking settings: ${error.message}`;
      button.disabled = false;
    }
  });

  function bindSchoolCodeButtons(scope = document) {
    scope.querySelectorAll(".admin-generate-code").forEach((button) => {
      button.addEventListener("click", () => {
        const input = button.closest(".admin-code-row")?.querySelector('[data-school-field="join_code"]');
        if (input) input.value = generateSchoolCode();
      });
    });
  }

  bindSchoolCodeButtons();

  document.getElementById("addSchoolRow")?.addEventListener("click", () => {
    const rows = schoolList?.querySelectorAll("[data-school-row]").length || 0;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = adminSchoolRowHtml({ is_active: true, licence_type: "school" }, rows);
    const row = wrapper.firstElementChild;
    if (!row) return;
    schoolList?.appendChild(row);
    bindSchoolCodeButtons(row);
    row.querySelector('[data-school-field="name"]')?.focus();
  });

  document.getElementById("saveSchools")?.addEventListener("click", async () => {
    const button = document.getElementById("saveSchools");
    const rows = [...document.querySelectorAll("[data-school-row]")];
    button.disabled = true;
    schoolsStatus.textContent = "Saving school licences...";
    try {
      let savedCount = 0;
      for (const row of rows) {
        const field = (name) => row.querySelector(`[data-school-field="${name}"]`);
        const name = field("name")?.value.trim() || "";
        if (!row.dataset.schoolId && !name) continue;
        const schoolId = await saveSchool({
          id: row.dataset.schoolId || "",
          name,
          licence_type: field("licence_type")?.value || "school",
          allowed_domains: field("allowed_domains")?.value || "",
          seat_limit: field("seat_limit")?.value || "",
          join_code: field("join_code")?.value || "",
          join_code_expires_at: field("join_code_expires_at")?.value || "",
          licence_starts_at: field("licence_starts_at")?.value || "",
          licence_ends_at: field("licence_ends_at")?.value || "",
          is_active: Boolean(field("is_active")?.checked),
          notes: field("notes")?.value || ""
        });
        await saveSchoolTeacherAccess(schoolId, field("teacher_emails")?.value || "");
        savedCount += 1;
      }
      await loadSchools();
      await loadUserProfiles();
      schoolsStatus.textContent = `Saved ${savedCount} school licence${savedCount === 1 ? "" : "s"}.`;
      renderRoute();
    } catch (error) {
      schoolsStatus.textContent = `Could not save schools: ${error.message}`;
      button.disabled = false;
    }
  });

  document.getElementById("saveAccessRules")?.addEventListener("click", async () => {
    const button = document.getElementById("saveAccessRules");
    const selects = [...document.querySelectorAll(".admin-access-select")];
    button.disabled = true;
    status.textContent = "Saving access rules...";
    try {
      for (const select of selects) {
        await saveToolAccess(select.dataset.toolSlug, select.value);
      }
      status.textContent = "Saved. Access rules are now stored in Supabase.";
      renderRoute();
    } catch (error) {
      status.textContent = `Could not save: ${error.message}`;
      button.disabled = false;
    }
  });

  const metadataStatus = document.getElementById("adminMetadataStatus");
  document.querySelectorAll(".admin-metadata-input").forEach((input) => {
    input.removeAttribute("disabled");
    input.removeAttribute("readonly");
    input.addEventListener("click", (event) => event.stopPropagation());
    input.addEventListener("keydown", (event) => event.stopPropagation());
  });
  document.getElementById("saveToolMetadata")?.addEventListener("click", async () => {
    const button = document.getElementById("saveToolMetadata");
    const grouped = new Map();
    document.querySelectorAll(".admin-metadata-input").forEach((input) => {
      if (!grouped.has(input.dataset.toolSlug)) grouped.set(input.dataset.toolSlug, {});
      grouped.get(input.dataset.toolSlug)[input.dataset.metadataField] = input.value;
    });
    button.disabled = true;
    metadataStatus.textContent = "Saving tool tags...";
    try {
      for (const [slug, values] of grouped.entries()) {
        await saveToolMetadata(slug, {
          curriculum_tags: values.curriculum_tags || "",
          admin_notes: values.admin_notes || ""
        });
      }
      metadataStatus.textContent = "Saved. Tool tags are now searchable and visible in the library.";
      button.disabled = false;
    } catch (error) {
      metadataStatus.textContent = `Could not save: ${error.message}`;
      button.disabled = false;
    }
  });

  const videoStatus = document.getElementById("adminVideoStatus");
  document.getElementById("saveUniversityVideos")?.addEventListener("click", async () => {
    const button = document.getElementById("saveUniversityVideos");
    const rows = [...document.querySelectorAll(".admin-video-fields")];
    button.disabled = true;
    videoStatus.textContent = "Saving video content...";
    try {
      for (const row of rows) {
        const fields = Object.fromEntries([...row.querySelectorAll("[data-video-field]")].map((input) => [input.dataset.videoField, input.value.trim()]));
        const url = fields.youtube_url || "";
        if (url && !youtubeIdFromUrl(url)) {
          throw new Error(`"${row.closest(".admin-video-row")?.querySelector("strong")?.textContent || row.dataset.videoSlot}" does not look like a valid YouTube link or ID.`);
        }
        await saveUniversityVideo(row.dataset.videoSlot, {
          youtube_url: url,
          title: fields.title || "",
          description: fields.description || "",
          duration_label: fields.duration_label || ""
        });
      }
      videoStatus.textContent = "Saved. Kaizen University video content is now live.";
      button.disabled = false;
    } catch (error) {
      videoStatus.textContent = `Could not save: ${error.message}`;
      button.disabled = false;
    }
  });

  const testimonialStatus = document.getElementById("adminTestimonialsStatus");
  const testimonialList = document.getElementById("adminTestimonialList");
  document.getElementById("addTestimonialRow")?.addEventListener("click", () => {
    const rows = testimonialList?.querySelectorAll("[data-testimonial-row]").length || 0;
    testimonialList?.insertAdjacentHTML("beforeend", adminTestimonialRowHtml({
      slot_id: `testimonial-${Date.now()}`,
      quote: "",
      person_name: "",
      role_label: "",
      organisation: "",
      is_active: false,
      sort_order: rows + 1
    }, rows));
  });

  document.getElementById("saveTestimonials")?.addEventListener("click", async () => {
    const button = document.getElementById("saveTestimonials");
    const rows = [...document.querySelectorAll("[data-testimonial-row]")];
    button.disabled = true;
    testimonialStatus.textContent = "Saving testimonials...";
    try {
      let savedCount = 0;
      for (const row of rows) {
        const field = (name) => row.querySelector(`[data-testimonial-field="${name}"]`);
        const values = {
          slot_id: row.dataset.slotId,
          quote: field("quote")?.value.trim() || "",
          person_name: field("person_name")?.value.trim() || "",
          role_label: field("role_label")?.value.trim() || "",
          organisation: field("organisation")?.value.trim() || "",
          is_active: Boolean(field("is_active")?.checked),
          sort_order: Number(field("sort_order")?.value || savedCount + 1)
        };
        const hasContent = values.quote || values.person_name || values.role_label || values.organisation;
        if (!hasContent && !values.is_active) continue;
        if (values.is_active && !values.quote) throw new Error("Every active testimonial needs a quote.");
        await saveSiteTestimonial(values);
        savedCount += 1;
      }
      testimonialStatus.textContent = `Saved ${savedCount} testimonial${savedCount === 1 ? "" : "s"}. Homepage carousel will update on refresh.`;
      button.disabled = false;
    } catch (error) {
      testimonialStatus.textContent = `Could not save: ${error.message}`;
      button.disabled = false;
    }
  });
}

function bindToolFrame(tool, options = {}) {
  const button = document.getElementById("focusTool");
  const exitButton = document.getElementById("exitClassroom");
  const fullscreenButton = document.getElementById("classroomFullscreen");
  const drawToggle = document.getElementById("classroomDrawToggle");
  const annotationCanvas = document.getElementById("classroomAnnotationCanvas");
  const annotationPen = document.getElementById("annotationPen");
  const annotationHighlighter = document.getElementById("annotationHighlighter");
  const annotationEraser = document.getElementById("annotationEraser");
  const annotationUndo = document.getElementById("annotationUndo");
  const annotationClear = document.getElementById("annotationClear");
  const stage = document.querySelector(".legacy-stage");
  const frame = stage?.querySelector(".legacy-frame");
  if (!stage) return;
  const classroomStateKey = "kaizen:classroom-view";
  const annotationState = {
    active: false,
    tool: "pen",
    drawing: false,
    strokes: [],
    currentStroke: null,
    dpr: 1,
    width: 0,
    height: 0
  };

  function savedClassroomState() {
    return {};
  }

  function saveClassroomState(active) {
    try {
      localStorage.removeItem(classroomStateKey);
    } catch (error) {
      // Classroom mode still works if local storage is unavailable.
    }
  }

  function withFrameDocument(callback) {
    if (!frame?.contentDocument) return;
    try {
      callback(frame.contentDocument);
    } catch (error) {
      // Cross-origin legacy tools cannot be auto-fitted from the shell.
    }
  }

  function installClassroomStandardAssets(doc) {
    doc.documentElement.classList.add("kaizen-classroom-standard");

    if (!doc.getElementById("kaizen-classroom-standard-css")) {
      const link = doc.createElement("link");
      link.id = "kaizen-classroom-standard-css";
      link.rel = "stylesheet";
      link.href = classroomSharedAsset("classroom-standard.css");
      doc.head.appendChild(link);
    }

    if (!doc.getElementById("kaizen-classroom-standard-js")) {
      const script = doc.createElement("script");
      script.id = "kaizen-classroom-standard-js";
      script.src = classroomSharedAsset("classroom-standard.js");
      script.onload = scheduleClassroomFit;
      doc.head.appendChild(script);
    }
  }

  function installClassroomFitStyles(doc) {
    installClassroomStandardAssets(doc);
    if (doc.getElementById("kaizen-classroom-fit-style")) return;
    const style = doc.createElement("style");
    style.id = "kaizen-classroom-fit-style";
    style.textContent = `
      html.kaizen-classroom-fit,
      html.kaizen-classroom-fit body {
        overflow: auto !important;
      }

      html.kaizen-classroom-fit body {
        padding: 12px 18px !important;
      }

      html.kaizen-classroom-fit .container {
        max-width: 1180px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        border-radius: 8px !important;
        box-shadow: none !important;
      }

      html.kaizen-classroom-fit .header {
        padding: 10px 14px !important;
      }

      html.kaizen-classroom-fit .header h1 {
        font-size: 1.35rem !important;
        margin: 0 !important;
      }

      html.kaizen-classroom-fit .tabs {
        flex-wrap: nowrap !important;
      }

      html.kaizen-classroom-fit .tab {
        padding: 8px 10px !important;
        font-size: 0.86rem !important;
      }

      html.kaizen-classroom-fit .controls {
        padding: 8px 10px !important;
        gap: 8px !important;
      }

      html.kaizen-classroom-fit .level-info h3 {
        font-size: 1rem !important;
      }

      html.kaizen-classroom-fit .level-info p,
      html.kaizen-classroom-fit #type-preview {
        font-size: 0.82rem !important;
      }

      html.kaizen-classroom-fit .type-dropdown {
        min-width: min(300px, 100%) !important;
        padding: 5px 8px !important;
        font-size: 0.86rem !important;
      }

      html.kaizen-classroom-fit .timer-display {
        min-width: 78px !important;
        padding: 5px 8px !important;
        font-size: 1.1rem !important;
      }

      html.kaizen-classroom-fit .btn {
        min-width: 58px !important;
        padding: 7px 10px !important;
        font-size: 0.84rem !important;
      }

      html.kaizen-classroom-fit .problems-section {
        min-height: 0 !important;
        padding: 10px !important;
      }

      html.kaizen-classroom-fit .problem-set-header {
        margin-bottom: 8px !important;
        padding: 8px 12px !important;
      }

      html.kaizen-classroom-fit .problem-set-header h2,
      html.kaizen-classroom-fit .calculate-header {
        font-size: 1rem !important;
      }

      html.kaizen-classroom-fit .problem-item {
        margin: 6px 0 !important;
        padding: 9px 12px !important;
      }

      html.kaizen-classroom-fit .expression {
        font-size: 1.05rem !important;
      }

      html.kaizen-classroom-fit .steps-section,
      html.kaizen-classroom-fit .answer-section {
        margin-top: 10px !important;
        padding: 12px !important;
      }

      html.kaizen-classroom-fit .solution-steps,
      html.kaizen-classroom-fit .step,
      html.kaizen-classroom-fit .step-equation {
        font-size: 1rem !important;
        line-height: 1.45 !important;
      }

      html.kaizen-classroom-fit .teacher-tab {
        display: none !important;
      }
    `;
    doc.head.appendChild(style);
  }

  function resetFrameFit() {
    withFrameDocument((doc) => {
      doc.documentElement.classList.remove("kaizen-classroom-fit");
      doc.documentElement.style.overflow = "";
      doc.body.style.transform = "";
      doc.body.style.transformOrigin = "";
      doc.body.style.width = "";
      doc.body.style.height = "";
      doc.body.style.overflow = "";
    });
  }

  function fitFrameToClassroom() {
    if (!stage.classList.contains("classroom")) return;
    withFrameDocument((doc) => {
      installClassroomFitStyles(doc);
      doc.documentElement.classList.add("kaizen-classroom-fit");

      doc.body.style.transform = "";
      doc.body.style.width = "";
      doc.body.style.height = "";

      const availableHeight = Math.max(1, frame.clientHeight - 2);
      const availableWidth = Math.max(1, frame.clientWidth);
      const expandedPanels = Array.from(doc.querySelectorAll(".steps-section.visible, .answer-section.visible"));
      const previousDisplays = expandedPanels.map((panel) => panel.style.display);
      expandedPanels.forEach((panel) => {
        panel.style.display = "none";
      });
      const contentHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
      const contentWidth = Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth);
      expandedPanels.forEach((panel, index) => {
        panel.style.display = previousDisplays[index];
      });
      const scale = Math.min(1, availableHeight / contentHeight, availableWidth / contentWidth);

      doc.body.style.transformOrigin = "top left";
      doc.body.style.overflow = "auto";
      doc.documentElement.style.overflow = "auto";

      if (scale < 1) {
        doc.body.style.width = `${100 / scale}%`;
        doc.body.style.height = `${availableHeight / scale}px`;
        doc.body.style.transform = `scale(${scale})`;
      }
    });
  }

  function scheduleClassroomFit() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(fitFrameToClassroom);
    });
  }

  function bindFrameFitRefreshers() {
    withFrameDocument((doc) => {
      doc.addEventListener("click", scheduleClassroomFit, true);
      doc.addEventListener("change", scheduleClassroomFit, true);
      doc.addEventListener("input", scheduleClassroomFit, true);
      if ("ResizeObserver" in window) {
        const observer = new ResizeObserver(scheduleClassroomFit);
        observer.observe(doc.body);
      }
    });
  }

  function refreshTeacherTopicMap() {
    const target = document.getElementById("toolTopicMap");
    if (!target || !frame?.contentWindow) return;
    try {
      const metadata = frame.contentWindow.KaizenWorksheet?.getState?.();
      if (metadata?.levels?.length) {
        target.innerHTML = renderTopicMap(metadata.levels, tool);
      }
    } catch (error) {
      // Older or cross-origin tool pages keep the registry fallback topic map.
    }
  }

  function updateFullscreenButton() {
    if (!fullscreenButton) return;
    fullscreenButton.textContent = document.fullscreenElement === stage ? "Full Screen Active" : "Full Screen";
    fullscreenButton.disabled = document.fullscreenElement === stage;
  }

  function requestClassroomFullscreen() {
    if (stage.requestFullscreen && document.fullscreenElement !== stage) {
      stage.requestFullscreen().catch(() => {});
    }
  }

  function annotationContext() {
    if (!annotationCanvas) return null;
    const context = annotationCanvas.getContext("2d");
    if (!context) return null;
    context.setTransform(annotationState.dpr, 0, 0, annotationState.dpr, 0, 0);
    return context;
  }

  function annotationSettings(tool = annotationState.tool) {
    if (tool === "highlighter") {
      return { color: "#facc15", width: 18, alpha: 0.32, composite: "source-over" };
    }
    if (tool === "eraser") {
      return { color: "rgba(0,0,0,1)", width: 28, alpha: 1, composite: "destination-out" };
    }
    return { color: "#1f2937", width: 3.2, alpha: 1, composite: "source-over" };
  }

  function drawAnnotationStroke(stroke, context = annotationContext()) {
    if (!context || !stroke?.points?.length) return;
    const settings = annotationSettings(stroke.tool);
    context.save();
    context.globalAlpha = settings.alpha;
    context.globalCompositeOperation = settings.composite;
    context.strokeStyle = settings.color;
    context.fillStyle = settings.color;
    context.lineWidth = settings.width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    context.moveTo(stroke.points[0].x, stroke.points[0].y);
    stroke.points.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    context.stroke();
    if (stroke.points.length === 1) {
      context.beginPath();
      context.arc(stroke.points[0].x, stroke.points[0].y, settings.width / 2, 0, Math.PI * 2);
      context.fill();
    }
    context.restore();
  }

  function renderAnnotations() {
    const context = annotationContext();
    if (!context || !annotationCanvas) return;
    context.clearRect(0, 0, annotationState.width, annotationState.height);
    annotationState.strokes.forEach((stroke) => drawAnnotationStroke(stroke, context));
    if (annotationState.currentStroke) drawAnnotationStroke(annotationState.currentStroke, context);
  }

  function resizeAnnotationCanvas() {
    if (!annotationCanvas || !stage.classList.contains("classroom")) return;
    const rect = annotationCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);
    const changed = annotationCanvas.width !== pixelWidth || annotationCanvas.height !== pixelHeight || annotationState.dpr !== dpr;
    annotationState.dpr = dpr;
    annotationState.width = width;
    annotationState.height = height;
    if (changed) {
      annotationCanvas.width = pixelWidth;
      annotationCanvas.height = pixelHeight;
      renderAnnotations();
    }
  }

  function scheduleAnnotationResize() {
    window.requestAnimationFrame(() => {
      resizeAnnotationCanvas();
      window.requestAnimationFrame(resizeAnnotationCanvas);
    });
  }

  function setAnnotationTool(tool) {
    annotationState.tool = tool;
    [
      [annotationPen, "pen"],
      [annotationHighlighter, "highlighter"],
      [annotationEraser, "eraser"]
    ].forEach(([control, value]) => {
      control?.classList.toggle("active", tool === value);
      control?.setAttribute("aria-pressed", String(tool === value));
    });
  }

  function setAnnotationActive(active) {
    annotationState.active = active;
    annotationState.drawing = false;
    annotationState.currentStroke = null;
    stage.classList.toggle("annotation-active", active);
    drawToggle?.classList.toggle("active", active);
    drawToggle?.setAttribute("aria-pressed", String(active));
    if (drawToggle) drawToggle.textContent = active ? "Writing On" : "Write";
    if (active) {
      setAnnotationTool(annotationState.tool || "pen");
      scheduleAnnotationResize();
    }
    scheduleClassroomFit();
  }

  function annotationPoint(event) {
    const rect = annotationCanvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function startAnnotationStroke(event) {
    if (!annotationCanvas || !annotationState.active) return;
    event.preventDefault();
    resizeAnnotationCanvas();
    annotationCanvas.setPointerCapture?.(event.pointerId);
    annotationState.drawing = true;
    annotationState.currentStroke = {
      tool: annotationState.tool,
      points: [annotationPoint(event)]
    };
    renderAnnotations();
  }

  function continueAnnotationStroke(event) {
    if (!annotationCanvas || !annotationState.active || !annotationState.drawing || !annotationState.currentStroke) return;
    event.preventDefault();
    annotationState.currentStroke.points.push(annotationPoint(event));
    renderAnnotations();
  }

  function finishAnnotationStroke(event) {
    if (!annotationCanvas || !annotationState.drawing || !annotationState.currentStroke) return;
    event.preventDefault();
    annotationCanvas.releasePointerCapture?.(event.pointerId);
    annotationState.strokes.push(annotationState.currentStroke);
    annotationState.currentStroke = null;
    annotationState.drawing = false;
    renderAnnotations();
  }

  function clearAnnotations() {
    annotationState.strokes = [];
    annotationState.currentStroke = null;
    renderAnnotations();
  }

  function undoAnnotation() {
    annotationState.strokes.pop();
    annotationState.currentStroke = null;
    renderAnnotations();
  }

  if (annotationCanvas) {
    annotationCanvas.addEventListener("pointerdown", startAnnotationStroke);
    annotationCanvas.addEventListener("pointermove", continueAnnotationStroke);
    annotationCanvas.addEventListener("pointerup", finishAnnotationStroke);
    annotationCanvas.addEventListener("pointercancel", finishAnnotationStroke);
  }
  drawToggle?.addEventListener("click", () => setAnnotationActive(!annotationState.active));
  annotationPen?.addEventListener("click", () => setAnnotationTool("pen"));
  annotationHighlighter?.addEventListener("click", () => setAnnotationTool("highlighter"));
  annotationEraser?.addEventListener("click", () => setAnnotationTool("eraser"));
  annotationUndo?.addEventListener("click", undoAnnotation);
  annotationClear?.addEventListener("click", clearAnnotations);

  function setClassroomMode(active, options = {}) {
    stage.classList.toggle("classroom", active);
    document.body.classList.toggle("classroom-active", active);
    if (button) {
      button.textContent = active ? "Exit Classroom View" : "Classroom View";
      button.setAttribute("aria-pressed", String(active));
    }
    if (options.persist !== false) saveClassroomState(active);
    if (active) {
      scheduleClassroomFit();
      scheduleAnnotationResize();
    } else {
      setAnnotationActive(false);
      resetFrameFit();
    }

    if (active && options.requestFullscreen !== false) {
      requestClassroomFullscreen();
    } else if (!active && document.fullscreenElement === stage) {
      document.exitFullscreen().catch(() => {});
    }
    updateFullscreenButton();
  }

  button?.addEventListener("click", () => {
    if (stage.classList.contains("classroom")) {
      requestClassroomFullscreen();
      return;
    }
    setClassroomMode(true);
  });

  if (exitButton) {
    exitButton.addEventListener("click", () => {
      try {
        frame?.contentWindow?.KaizenQuestionPersistence?.clear?.();
      } catch (error) {
        // Older or cross-origin tools simply start fresh when they reload.
      }
      setClassroomMode(false);
      if (options.exitRoute) location.hash = options.exitRoute;
    });
  }

  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", requestClassroomFullscreen);
  }

  if (frame) {
    frame.addEventListener("load", () => {
      bindFrameFitRefreshers();
      refreshTeacherTopicMap();
      scheduleClassroomFit();
      scheduleAnnotationResize();
    });
    bindFrameFitRefreshers();
    refreshTeacherTopicMap();
  }

  window.addEventListener("resize", () => {
    scheduleClassroomFit();
    scheduleAnnotationResize();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && stage.classList.contains("classroom")) {
      scheduleClassroomFit();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    updateFullscreenButton();
    if (stage.classList.contains("classroom")) {
      scheduleClassroomFit();
      scheduleAnnotationResize();
    }
  });

  if (options.startClassroom) {
    window.requestAnimationFrame(() => setClassroomMode(true, { persist: false, requestFullscreen: false }));
  } else if (savedClassroomState().active && savedClassroomState().slug === tool.slug) {
    window.requestAnimationFrame(() => setClassroomMode(true, { persist: false }));
  }
}

function routeParts() {
  return (location.hash || "#/").split("?")[0].replace(/^#\/?/, "").split("/");
}

function routeTitle(text) {
  return titleWithSite(text);
}

function updateRouteSeo(parts) {
  const route = parts[0] || "home";
  const collectionSlug = route === "collections" ? parts[1] || "" : "";
  const collectionName = collectionSlug
    ? tools.find((tool) => isVisibleTool(tool) && categorySlug(tool.category) === collectionSlug)?.category
      || collectionSlug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")
    : "";
  const collectionPageTitle = collectionName
    ? (normalise(collectionName).endsWith("tools") ? collectionName : `${collectionName} Tools`)
    : "Maths Collections";
  const tool = route === "tools" && parts[1] ? tools.find((item) => item.slug === parts[1]) : null;
  const trustPage = route === "trust" ? trustPages.find((page) => page.slug === (parts[1] || "")) : null;

  if (tool) {
    setPageSeo(
      routeTitle(`${tool.title} Practice Tool`),
      `${tool.description} Use Kaizen Maths to project questions, reveal answers, show worked steps, and build worksheets for this topic.`
    );
    return;
  }

  const routeSeo = {
    home: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION
    },
    "tools": {
      title: routeTitle(parts[1] ? "Tool Information" : "Maths Tool Library"),
      description: parts[1]
        ? "Read teacher guidance, topics covered, curriculum links, misconceptions, and related tools before launching Classroom View."
        : "Browse Kaizen Maths topic generators, classroom display tools, worksheets, and assessment resources for maths teachers."
    },
    "classroom": {
      title: routeTitle("Classroom View"),
      description: "Project a Kaizen Maths tool for live teaching, modelling, questioning, annotation, and classroom practice."
    },
    "coverage-map": {
      title: routeTitle("Curriculum Coverage Map"),
      description: "View Kaizen Maths coverage across GCSE, CSEC, CAPE, Common Core, A-Level Pure, Further Maths, A-Level Statistics, A-Level Mechanics, and future curriculum tags."
    },
    "collections": {
      title: routeTitle(collectionPageTitle),
      description: collectionName
        ? `Browse ${collectionName.toLowerCase()} question generators, worked examples, and classroom practice tools in Kaizen Maths.`
        : "Browse curriculum collections inside Kaizen Maths."
    },
    "worksheet-generator": {
      title: routeTitle("Worksheet Builder"),
      description: "Create printable maths worksheets, homework, quizzes, assessments, and intervention sheets from Kaizen Maths topic question generators."
    },
    "gcse-exam-style": {
      title: routeTitle("GCSE Exam Paper Builder"),
      description: "Generate GCSE-style maths practice sets and mock papers with marks, teacher copy options, and print-ready layout."
    },
    "tutor-workspace": {
      title: routeTitle("Tutor Workspace"),
      description: "Track learner aliases, tutoring sessions, tools used, confidence, next steps, and homework notes inside Kaizen Maths."
    },
    "upgrade": {
      title: routeTitle("Teacher Access and Pricing"),
      description: "Start a 30-day Kaizen Maths teacher trial or upgrade with early-adopter monthly, annual, and school access options."
    },
    "book-demo": {
      title: routeTitle("Book a Demo"),
      description: "Book a Kaizen Maths walkthrough for teachers, tutors, Heads of Department, or school leaders."
    },
    "schools": {
      title: routeTitle("School Access"),
      description: "Learn how school licences give maths departments shared access to Kaizen Maths questions, worksheets, worked examples, and assessments."
    },
    "school-space": {
      title: routeTitle("School Space"),
      description: "Join or view a Kaizen Maths school licence for your department."
    },
    "trust": {
      title: routeTitle(trustPage?.title || "Trust & Privacy"),
      description: trustPage?.description || "School-ready information about Kaizen Maths privacy, teacher-only use, data protection, security, and terms."
    },
    "kaizen-university": {
      title: routeTitle("Kaizen University"),
      description: "Watch practical guides showing teachers how to use Kaizen Maths for classroom practice, worksheets, assessment, and live modelling."
    },
    "how-to-use-this-site": {
      title: routeTitle("How to Use Kaizen Maths"),
      description: "A teacher guide to using Kaizen Maths: choose topics, project practice questions, reveal solutions, and build worksheets."
    },
    "beta-feedback": {
      title: routeTitle("Beta Feedback"),
      description: "Share feedback on the Kaizen Maths beta site and help improve the teacher workflow, topic coverage, worksheets, and assessment tools."
    },
    "teacher": {
      title: routeTitle("Teacher Notes"),
      description: "Teacher-facing notes for using Kaizen Maths tools, examples, worksheets, and classroom routines."
    },
    "admin": {
      title: routeTitle("Admin"),
      description: "Kaizen Maths admin area for managing access, tags, users, and site content."
    }
  };

  const seo = routeSeo[route] || routeSeo.home;
  setPageSeo(seo.title, seo.description);
}

function renderRoute() {
  closeMobileNav();
  updateAdminNavVisibility();
  setActiveNav();
  const parts = routeParts();
  document.body.classList.toggle("classroom-active", parts[0] === "classroom");
  if (parts[0] && homeTestimonialTimer) {
    window.clearInterval(homeTestimonialTimer);
    homeTestimonialTimer = null;
  }
  if (parts[0] && homeScreenshotTimer) {
    window.clearInterval(homeScreenshotTimer);
    homeScreenshotTimer = null;
  }
  updateRouteSeo(parts);
  document.body.dataset.route = parts[0] || "home";
  if (!parts[0]) {
    renderHome();
  } else if (parts[0] === "beta-feedback") {
    renderBetaFeedback();
  } else if (parts[0] === "how-to-use-this-site") {
    renderSiteGuide();
  } else if (parts[0] === "worksheet-generator") {
    if (isAuthChecking()) {
      app.innerHTML = `
        ${pageHeader(
          "Worksheet Builder",
          "Build printable worksheets and assessments from topic blocks. Choose the questions, add the block, then create the sheet.",
          "",
          "worksheet-page-header"
        )}
        ${checkingAccessCallout("Checking worksheet access")}
      `;
      return;
    }
    if (!hasWorkspaceAccess()) {
      app.innerHTML = `
        ${pageHeader(
          "Worksheet Builder",
          "Build printable worksheets and assessments from topic blocks. Choose the questions, add the block, then create the sheet.",
          "",
          "worksheet-page-header"
        )}
        ${signInCallout("Trial access required")}
      `;
      bindAuthActions();
      return;
    }
    renderWorksheetGenerator();
  } else if (parts[0] === "gcse-exam-style") {
    if (isAuthChecking()) {
      app.innerHTML = `
        ${pageHeader(
          "GCSE Exam Paper Builder",
          "Generate GCSE-style maths practice sets and mock papers with marks, teacher copy options, and print-ready layout.",
          "",
          "worksheet-page-header"
        )}
        ${checkingAccessCallout("Checking exam-builder access")}
      `;
      return;
    }
    if (!hasWorkspaceAccess()) {
      app.innerHTML = `
        ${pageHeader(
          "GCSE Exam Paper Builder",
          "Generate GCSE-style maths practice sets and mock papers with marks, teacher copy options, and print-ready layout.",
          "",
          "worksheet-page-header"
        )}
        ${signInCallout("Trial access required")}
      `;
      bindAuthActions();
      return;
    }
    renderGcseExamStyle();
  } else if (parts[0] === "tutor-workspace") {
    renderTutorWorkspace();
  } else if (parts[0] === "tools" && parts[1] === "interface-guide") {
    location.hash = "#/how-to-use-this-site";
    return;
  } else if (parts[0] === "tools" && parts[1]) {
    renderToolDetail(parts[1]);
  } else if (parts[0] === "classroom" && parts[1]) {
    renderClassroomTool(parts[1]);
  } else if (parts[0] === "tools") {
    renderToolLibrary();
  } else if (parts[0] === "coverage-map") {
    renderCoverageMap();
  } else if (parts[0] === "collections" && parts[1]) {
    renderToolLibrary(parts[1]);
  } else if (parts[0] === "book-demo") {
    renderBookDemo();
  } else if (parts[0] === "schools") {
    renderSchools();
  } else if (parts[0] === "school-space") {
    renderSchoolSpace();
  } else if (parts[0] === "trust") {
    renderTrustPage(parts[1] || "");
  } else if (parts[0] === "kaizen-university") {
    renderKaizenUniversity();
  } else if (parts[0] === "teacher") {
    renderTeacher();
  } else if (parts[0] === "upgrade") {
    renderUpgrade();
  } else if (parts[0] === "admin") {
    if (!isAdmin()) {
      location.hash = "#/";
      return;
    }
    renderAdmin();
  } else {
    renderHome();
  }
  if (!restorePendingFocus()) {
    app.focus({ preventScroll: true });
  }
}

function closeMobileNav() {
  mobileNav.classList.remove("open");
  mobileNav.setAttribute("aria-hidden", "true");
}

globalSearch.addEventListener("input", (event) => {
  state.query = event.target.value;
  if (!location.hash.startsWith("#/tools") && !location.hash.startsWith("#/collections")) {
    pendingFocusTarget = "globalSearch";
    location.hash = "#/tools";
  } else {
    pendingFocusTarget = "globalSearch";
    renderRoute();
  }
});

document.getElementById("menuButton").addEventListener("click", () => {
  mobileNav.classList.add("open");
  mobileNav.setAttribute("aria-hidden", "false");
});

document.getElementById("mobileNavBackdrop").addEventListener("click", closeMobileNav);

window.addEventListener("hashchange", renderRoute);

window.addEventListener("kaizen-auth-change", () => {
  updateAdminNavVisibility();
  renderAuthSensitiveRouteIfNeeded();
  resetTutorWorkspaceState();
  loadToolAccessSettings({ rerender: true });
  loadToolMetadata({ rerender: true });
  loadUserProfiles({ rerender: true });
  loadSchools({ rerender: true });
  loadHomepageContent({ rerender: true });
  loadHomepageScreenshots({ rerender: true });
  loadBookingSettings({ rerender: true });
  loadToolInfoOverrides({ rerender: true });
  loadUniversityVideos({ rerender: true });
  loadSiteTestimonials({ rerender: true });
});

window.setTimeout(() => {
  updateAdminNavVisibility();
  loadToolAccessSettings({ rerender: true });
  loadToolMetadata({ rerender: true });
  loadUserProfiles({ rerender: true });
  loadSchools({ rerender: true });
  loadHomepageContent({ rerender: true });
  loadHomepageScreenshots({ rerender: true });
  loadBookingSettings({ rerender: true });
  loadToolInfoOverrides({ rerender: true });
  loadUniversityVideos({ rerender: true });
  loadSiteTestimonials({ rerender: true });
}, 1200);

renderRoute();
