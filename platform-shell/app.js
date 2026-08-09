const SITE_NAME = "Kaizen Maths";
const SITE_TITLE = "Kaizen Maths | Complete Mathematics Workspace for Teachers";
const SITE_DESCRIPTION = "Kaizen Maths is a complete mathematics workspace and virtual textbook for teachers. Generate unlimited curriculum-aligned questions, worked examples, bespoke worksheets, assessments, and classroom practice in minutes.";
const CLASSROOM_STANDARD_VERSION = "classroom-standard-3";

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
    slug: "limits-first-principles",
    title: "Limits and First Principles",
    category: "Algebra",
    level: "A-Level / Further Maths",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate calculus practice for limits of functions, one-sided limits, continuity, parameter limits, and differentiation from first principles.",
    tags: ["algebra", "calculus", "limits", "first principles", "differentiation", "continuity", "one-sided limits", "A-Level Pure", "Further Maths", "CAPE"],
    toolPath: "tools/limits-first-principles/index.html?v=limits-first-principles-1",
    imported: true,
    teacherNotes: [
      "Level 1 evaluates direct, factorised, rationalised, and quotient-law limits while keeping limit notation in place until evaluation.",
      "Level 2 develops one-sided limits, piecewise functions, numerical table interpretation, and limits as x tends to infinity.",
      "Level 3 uses the first-principles derivative definition, expanding f(x+h), subtracting f(x), factorising h, cancelling, and then taking the limit.",
      "Level 4 connects limits to continuity, unknown parameters, and tangent equations found from first principles."
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
    slug: "integer-operations",
    title: "Integer Operations",
    category: "Numbers",
    level: "KS2 / KS3 / Grade 6",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate integer practice covering comparing, ordering, opposites, addition, subtraction, multiplication, division, BIDMAS, and real-life directed-number contexts.",
    tags: ["numbers", "integers", "directed numbers", "negative numbers", "number line", "integer operations", "Common Core", "Grade 6", "KS3"],
    toolPath: "tools/integer-operations/index.html?v=integer-operations-1",
    imported: true,
    teacherNotes: [
      "Level 1 builds integer meaning through comparing, ordering, and opposites.",
      "Level 2 focuses on adding and subtracting integers, including subtracting negative numbers by adding the opposite.",
      "Level 3 covers multiplication, division, and order of operations with integers.",
      "Level 4 applies integer operations to temperature, money, elevation, and depth contexts."
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
    slug: "polygons-angles",
    title: "Polygons and Interior/Exterior Angles",
    category: "Geometry",
    level: "KS3 / GCSE / IGCSE / CSEC",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate diagram-based polygon angle practice covering interior angle sums, exterior angles, regular polygons, sides from angles, and algebraic polygon problems.",
    tags: ["geometry", "polygons", "interior angles", "exterior angles", "regular polygons", "irregular polygons", "angle sum", "algebra", "GCSE", "IGCSE", "CSEC"],
    toolPath: "tools/polygons-angles/index.html?v=polygons-angles-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on interior angle sums, exterior angle sums, and missing interior angles in irregular polygons.",
      "Level 2 develops regular polygon fluency, including interior angles, exterior angles, and finding the number of sides from a given angle.",
      "Level 3 uses polygon angle facts to form and solve algebraic equations, including irregular polygons and linked interior/exterior angle problems."
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
    slug: "formal-geometric-proof",
    title: "Formal Geometric Proof",
    category: "Geometry",
    level: "GCSE / IGCSE / CSEC / Geometry",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate formal geometry proof practice using statement-reason tables, theorem chains, parallel-line reasoning, triangle congruence, similarity, circle theorems, and proof-style justification.",
    tags: ["geometry", "proof", "formal proof", "statement reason", "theorem chains", "parallel lines", "congruence", "similarity", "circle theorems", "angle facts", "GCSE", "IGCSE", "CSEC", "Common Core", "Geometry"],
    toolPath: "tools/formal-geometric-proof/index.html?v=formal-proof-1",
    imported: true,
    teacherNotes: [
      "Level 1 asks students to identify the correct theorem or reason from a diagram.",
      "Level 2 builds angle proof chains using parallel lines, triangles, isosceles reasoning, and circle theorems.",
      "Level 3 develops congruence and similarity proofs, including corresponding parts after congruence.",
      "Level 4 uses two-column and paragraph-style formal proofs so every conclusion has a reason."
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
    toolPath: "tools/conversions-teaching/index.html?v=conversion-unit-symbols-1",
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
    slug: "financial-real-life-maths",
    title: "Financial Real-Life Maths",
    category: "Numbers",
    level: "KS3 / GCSE / IGCSE / CSEC",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate practical finance questions for best buys, discounts, VAT, exchange rates, wages, commission, profit, interest, depreciation, loans, hire purchase, budgeting, and comparison decisions.",
    tags: ["numbers", "financial maths", "money", "best buys", "VAT", "discounts", "exchange rates", "wages", "commission", "profit", "interest", "depreciation", "loans", "hire purchase", "budgeting", "GCSE", "IGCSE", "CSEC"],
    toolPath: "tools/financial-real-life-maths/index.html?v=financial-real-life-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers everyday money decisions including best buys, discounts, VAT, and exchange rates.",
      "Level 2 develops income and business contexts such as wages, overtime, commission, markup, profit, and margin.",
      "Level 3 focuses on savings and borrowing through simple interest, compound interest, depreciation, loans, and hire purchase.",
      "Level 4 brings ideas together in budgeting, reverse finance, and comparison problems."
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
    toolPath: "tools/classroom-displays/index.html?v=classroom-displays-grid-snap-1",
    imported: true,
    teacherNotes: [
      "Designed as a static board companion rather than a question generator.",
      "Teachers can quickly show blank grids, coordinate axes, common 2D shapes, 3D solids, statistics templates, mechanics setups, and Earth geometry diagrams.",
      "Use full-screen mode when projecting to the board for live explanation or annotation."
    ]
  },
  {
    slug: "dynamic-classroom-displays",
    title: "Dynamic Classroom Displays",
    category: "Classroom Tools",
    level: "GCSE / A-Level",
    type: "Interactive Display",
    access: "Free",
    status: "Imported",
    description: "Open dynamic board-ready displays for animated graph transformations, animated shape transformations, equations of circles, circle theorems, trigonometric graphs, complex numbers, and calculus visualisations.",
    tags: ["classroom", "dynamic displays", "interactive graphs", "graph transformations", "animated transformations", "rotation", "translation", "reflection", "enlargement", "shear", "equation of a circle", "circle theorems", "trigonometric graphs", "complex numbers", "calculus", "visual maths", "board"],
    toolPath: "tools/dynamic-classroom-displays/index.html?v=dynamic-classroom-displays-6",
    imported: true,
    teacherNotes: [
      "Designed as a selective dynamic layer for topics where movement and live adjustment strengthen understanding.",
      "Graph transformation displays let teachers vary stretch, reflection, translation, and scale, or enter common target equations, then animate from the base graph to the transformed graph.",
      "Animated transformation displays let teachers set a centre, angle, direction, vector, reflection line, scale factor, or shear factor, then show the object moving to its image.",
      "The circle equation display lets teachers move the centre and radius while the equation updates cleanly, then animate from the unit circle to the target circle.",
      "Circle theorem displays show angle relationships dynamically, including angle at the centre, angles in the same segment, cyclic quadrilaterals, and tangent-radius relationships.",
      "Trigonometric graph displays use sliders for amplitude, horizontal scale, phase shift, and vertical shift, then animate from the parent graph to the transformed graph.",
      "Complex-plane and calculus displays introduce visual demonstrations that can be expanded as further maths coverage grows.",
      "Use full-screen mode and the write function for live explanation and annotation."
    ]
  },
  {
    slug: "concept-explainer",
    title: "Concept Explainer",
    category: "Classroom Tools",
    level: "KS2 / KS3 / GCSE",
    type: "Interactive Display",
    access: "Free",
    status: "Imported",
    description: "Open teacher-led explanation boards for revealing properties, labels, and notation on shapes, circle parts, 3D solids, and algebra language.",
    tags: ["classroom", "explanation", "concept explainer", "visual maths", "properties", "quadrilaterals", "circle parts", "3D solids", "algebra language", "vocabulary", "notation"],
    toolPath: "tools/concept-explainer/index.html?v=concept-explainer-1",
    imported: true,
    teacherNotes: [
      "Designed for the beginning of a topic when teachers need to introduce vocabulary, notation, and key properties clearly.",
      "Teachers choose a concept, then reveal properties, labels, and markings one at a time.",
      "Modes cover quadrilaterals, circle parts, 3D solids, algebraic expressions, and equation language.",
      "Use full-screen mode and the write function to annotate the display during live explanation."
    ]
  },
  {
    slug: "anchor-charts",
    title: "Elementary Maths Anchor Charts",
    category: "Classroom Tools",
    level: "Primary / Elementary",
    type: "Interactive Display",
    access: "Free",
    status: "Imported",
    description: "Open teacher-led elementary maths anchor charts for number bonds, place value, operation language, fractions, arrays, time, money, shape properties, measurement, and bar-model reasoning.",
    tags: ["classroom", "primary", "elementary", "anchor charts", "visual maths", "number bonds", "place value", "operation language", "fractions", "arrays", "time", "money", "shape properties", "measurement", "bar models", "reference charts"],
    toolPath: "tools/anchor-charts/index.html?v=anchor-charts-3",
    imported: true,
    teacherNotes: [
      "Designed as a teacher-led reference board for building key elementary maths ideas gradually.",
      "Teachers choose a chart, start with the visual model, then use Reveal Next to add the key idea, teacher model, vocabulary, and inquiry questions.",
      "Modes cover number bonds, place value, operation language, fractions, arrays, telling time, money, 2D shape properties, perimeter and area, and bar-model reasoning.",
      "Use full-screen mode and the write function to annotate examples while keeping the anchor chart visible."
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
    toolPath: "tools/bar-models/index.html?v=bar-models-12",
    imported: true,
    teacherNotes: [
      "Designed for live conceptual modelling with one example on screen at a time.",
      "Use Next Step to reveal the structure gradually with a short animation before showing the answer.",
      "Modes include fractions of amounts, percentage of an amount, fractional change, percentage increase and decrease, reverse percentages, ratio sharing, reverse ratio, comparison models, and equations.",
      "Useful when pupils need to see how the calculation is represented before using a formal written method.",
      "Use Practice PDF to create student sheets focused on labelling and completing bar models before calculation."
    ]
  },
  {
    slug: "area-models",
    title: "Area Models",
    category: "Classroom Tools",
    level: "Primary / Elementary / KS3 / GCSE",
    type: "Interactive Display",
    access: "Free",
    status: "Imported",
    description: "Use teacher-led rectangular area models for arrays, partitioned multiplication, fractions, percentages, expanding brackets, and factorising.",
    tags: ["classroom", "primary", "elementary", "area models", "arrays", "multiplication", "partitioning", "fractions", "percentages", "expanding brackets", "factorising", "algebra"],
    toolPath: "tools/area-models/index.html?v=area-models-3",
    imported: true,
    teacherNotes: [
      "Designed for live conceptual modelling with one example on screen at a time.",
      "Use Next Step to reveal the rectangle, partitions, cell products, and final calculation gradually with a short animation inside the model.",
      "Modes cover arrays, partitioned multiplication, fractions of a whole, percentages of amounts, expanding brackets, factorising, and mixed practice.",
      "Useful when pupils need to see why multiplication, expansion, or factorisation works before using a formal written method.",
      "Use Practice PDF to create simple student sheets focused on completing area models before calculating."
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
  "limits-first-principles": "Calculus",
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
    "integer-operations": "Number Fluency and Operations",
    "hcf-lcm": "Number Fluency and Operations",
    "fractions-practice": "Fractions, Decimals and Percentages",
    "simple-percentage-tasks": "Fractions, Decimals and Percentages",
    "percentages-real-world": "Financial and Real-Life Maths",
    "financial-real-life-maths": "Financial and Real-Life Maths",
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
    "polygons-angles": "Angles and Shape Geometry",
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
    "dynamic-classroom-displays": "Board Displays and Visuals",
    "concept-explainer": "Board Displays and Visuals",
    "anchor-charts": "Board Displays and Visuals",
    "elementary-manipulatives": "Board Displays and Visuals",
    "bar-models": "Board Displays and Visuals",
    "area-models": "Board Displays and Visuals",
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
    "Financial and Real-Life Maths",
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
  "Fractions, Decimals and Percentages": "Fraction arithmetic, percentage fluency, decimal links, and percentage change.",
  "Financial and Real-Life Maths": "Money calculations, best buys, tax, wages, interest, borrowing, budgeting, and financial decisions.",
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
  schoolDefaultCurriculumSchemaMissing: false,
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
  universityProgress: null,
  universityProgressLoaded: false,
  universityProgressSource: "local",
  universityCertificationRecords: {},
  universityCertificationRecordsLoaded: false,
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
      ["kaizen-university", "Kaizen University certification is ready", "Training modules, video slots, quiz, practical tasks, and certificate generation can be tested."]
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

function isOmanGedCoverageTool(tool) {
  const level = normalise(tool.level);
  const taggedMatch = curriculumTagMatches(tool, "Oman GED") || curriculumTagMatches(tool, "Oman");
  const categoryMatch = ["Algebra", "Numbers", "Geometry", "Statistics", "Mechanics"].includes(tool.category);
  const secondaryOrAdvancedMatch = level.includes("gcse") || level.includes("igcse") || level.includes("csec") || level.includes("a-level") || level.includes("cape");
  return taggedMatch || (categoryMatch && secondaryOrAdvancedMatch && !isFurtherMathsTool(tool));
}

const curriculumMapAreas = [
  {
    id: "uk-ks2",
    title: "UK KS2",
    subtitle: "Key Stage 2 mathematics coverage",
    description: "Primary mathematics tools for Key Stage 2 number fluency, fractions, decimals, percentages, measurement, geometry, statistics, ratio, algebra readiness, and SATs preparation.",
    match: (tool) => {
      const level = normalise(tool.level);
      const taggedMatch = curriculumTagMatches(tool, "UK KS2") || curriculumTagMatches(tool, "KS2") || curriculumTagMatches(tool, "Key Stage 2");
      const categoryMatch = ["Algebra", "Numbers", "Geometry", "Statistics", "Classroom Tools"].includes(tool.category);
      return !isFurtherMathsTool(tool) && (taggedMatch || (categoryMatch && (level.includes("ks2") || level.includes("ks3"))));
    }
  },
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
    id: "uk-ks3",
    title: "UK KS3",
    subtitle: "Key Stage 3 mathematics coverage",
    description: "Lower-secondary mathematics tools for Key Stage 3 number, algebra, ratio and proportion, geometry and measures, probability, statistics, reasoning, and GCSE readiness.",
    match: (tool) => {
      const level = normalise(tool.level);
      const taggedMatch = curriculumTagMatches(tool, "UK KS3") || curriculumTagMatches(tool, "KS3") || curriculumTagMatches(tool, "Key Stage 3");
      const categoryMatch = ["Algebra", "Numbers", "Geometry", "Statistics"].includes(tool.category);
      return !isFurtherMathsTool(tool) && (taggedMatch || (categoryMatch && (level.includes("ks3") || level.includes("gcse"))));
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
    id: "oman-ged",
    title: "Oman GED",
    subtitle: "General Education Diploma mathematics coverage",
    description: "Basic and advanced mathematics links for Oman General Education Diploma classes, including algebra, functions, trigonometry, calculus, statistics, probability, and applied modelling.",
    match: (tool) => isOmanGedCoverageTool(tool)
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
  "dynamic-classroom-displays",
  "concept-explainer",
  "anchor-charts",
  "bar-models",
  "area-models",
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

const schoolContextStorageKey = "kaizen:school-context";
const schoolCurriculumFallbackStorageKey = "kaizen:school-default-curriculum";

function schoolCurriculumFallbacks() {
  try {
    return JSON.parse(localStorage.getItem(schoolCurriculumFallbackStorageKey) || "{}") || {};
  } catch (error) {
    return {};
  }
}

function storedDefaultCurriculumForSchool(schoolId) {
  if (!schoolId) return "";
  return schoolCurriculumFallbacks()[schoolId] || "";
}

function saveStoredDefaultCurriculumForSchool(schoolId, curriculumId) {
  if (!schoolId) return;
  try {
    const saved = schoolCurriculumFallbacks();
    if (curriculumId) {
      saved[schoolId] = curriculumId;
    } else {
      delete saved[schoolId];
    }
    localStorage.setItem(schoolCurriculumFallbackStorageKey, JSON.stringify(saved));
  } catch (error) {
    console.warn("Kaizen school curriculum fallback unavailable:", error.message);
  }
}

function schoolContextFromRecord(record = {}) {
  if (!record || typeof record !== "object") return null;
  const schoolId = record.school_id || record.id || "";
  if (!schoolId) return null;
  const storedCurriculumId = storedDefaultCurriculumForSchool(schoolId);
  return {
    school_id: schoolId,
    school_name: record.school_name || record.name || "",
    organisation_name: record.school_organisation_name || record.organisation_name || "",
    pilot_name: record.school_pilot_name || record.pilot_name || "",
    country: record.school_country || record.country || "",
    currency_code: record.school_currency_code || record.currency_code || "GBP",
    currency_symbol: record.school_currency_symbol || record.currency_symbol || "£",
    locale: record.school_locale || record.locale || "en-GB",
    curriculum_focus: record.school_curriculum_focus || record.curriculum_focus || "",
    default_curriculum_id: record.school_default_curriculum_id || record.default_curriculum_id || storedCurriculumId,
    standards_label: record.school_standards_label || record.standards_label || "",
    logo_url: record.school_logo_url || record.logo_url || "",
    contact_person: record.school_contact_person || record.contact_person || "",
    school_synopsis: record.school_synopsis || record.synopsis || ""
  };
}

function storedSchoolContext() {
  try {
    return JSON.parse(localStorage.getItem(schoolContextStorageKey) || "null");
  } catch (error) {
    return null;
  }
}

function currentSchoolContext() {
  const profile = authState().profile || {};
  if (profile.school_context) return schoolContextFromRecord(profile.school_context) || profile.school_context;
  const school = schoolById(profile.school_id);
  return profile.school_id
    ? schoolContextFromRecord({ ...(school || {}), ...profile, id: profile.school_id })
    : schoolContextFromRecord(window.KaizenSchoolContext || storedSchoolContext());
}

function schoolContextBadges(context = currentSchoolContext()) {
  if (!context) return [];
  return [
    context.pilot_name,
    context.organisation_name,
    context.country,
    context.currency_code ? `${context.currency_code} ${context.currency_symbol || ""}`.trim() : "",
    context.curriculum_focus,
    curriculumAlignmentLabelById(context.default_curriculum_id),
    context.standards_label
  ].filter(Boolean);
}

function schoolContextReportLine() {
  const context = currentSchoolContext();
  const schoolName = context?.school_name || currentSchoolName();
  const schoolDetail = context?.pilot_name || context?.organisation_name || "";
  if (!schoolName) return "Generated with Kaizen Maths";
  return `Generated with Kaizen Maths for ${[schoolName, schoolDetail].filter(Boolean).join(" · ")}`;
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
  return ["home", "tools", "collections", "coverage-map", "curriculum-alignments", "textbook-alignments", "admin"].includes(route);
}

function authSensitiveRouteShouldRerender() {
  const route = routeParts()[0] || "home";
  return ["tools", "curriculum-alignments", "worksheet-generator", "gcse-exam-style", "admin", "tutor-workspace", "school-space", "upgrade", "kaizen-university"].includes(route);
}

function currentAuthAccessKey() {
  const auth = authState();
  const schoolContext = currentSchoolContext();
  return [
    auth.session?.user?.id || "guest",
    currentUserRole(),
    schoolContext?.school_id || "",
    schoolContext?.currency_code || "",
    schoolContext?.curriculum_focus || "",
    schoolContext?.default_curriculum_id || "",
    schoolContext?.standards_label || ""
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

function worksheetBrandingText() {
  return schoolContextReportLine();
}

function worksheetBrandingFooterHtml(extraClass = "") {
  return `<footer class="worksheet-branding-footer${extraClass ? ` ${extraClass}` : ""}">${escapeHtml(worksheetBrandingText())}</footer>`;
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
      ${worksheetBrandingFooterHtml("teacher-copy")}
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
    id: "workspace-foundations",
    title: "Module 1: Understanding The Kaizen Workspace",
    intro: "Build a clear picture of Kaizen Maths as a virtual mathematics textbook and professional teaching workspace.",
    videos: [
      {
        id: "what-kaizen-maths-is",
        title: "What Kaizen Maths Is",
        description: "A short introduction to Kaizen Maths as a virtual mathematics textbook for teachers.",
        checks: [
          {
            id: "identity",
            question: "Which statement best describes Kaizen Maths?",
            answer: "workspace",
            options: [
              ["workspace", "A virtual mathematics textbook and teaching workspace for teachers."],
              ["replacement", "A replacement for teacher planning and classroom decision-making."],
              ["student-app", "A student account platform for collecting student personal data."]
            ]
          }
        ]
      },
      {
        id: "finding-a-topic",
        title: "Finding A Topic",
        description: "How to use the dashboard, Tool Library, search, and subject collections.",
        checks: [
          {
            id: "route",
            question: "What is the quickest way to reach a specific topic?",
            answer: "search",
            options: [
              ["search", "Use the search box or subject collection, then open the matching tool."],
              ["scroll", "Scroll through every page until the topic appears."],
              ["admin", "Open the admin console before every lesson."]
            ]
          }
        ]
      },
      {
        id: "classroom-tools-overview",
        title: "Classroom Tools And Displays",
        description: "How display tools, manipulatives, blank diagrams, and explanation tools support live teaching.",
        checks: [
          {
            id: "display-purpose",
            question: "When should Classroom Displays be used?",
            answer: "explain",
            options: [
              ["explain", "When a teacher wants a board-ready visual, model, diagram, or teaching prompt."],
              ["replace", "When the class should work without teacher explanation."],
              ["store", "Only when saving worksheets."]
            ]
          }
        ]
      },
      {
        id: "worksheet-assessment-overview",
        title: "Worksheets, Assessments, And Exam Builders",
        description: "How Kaizen Maths turns topic questions into printable worksheets, assessments, and exam-style practice.",
        checks: [
          {
            id: "resource-flow",
            question: "What is the correct resource-building flow?",
            answer: "select-build-print",
            options: [
              ["select-build-print", "Select questions, add the block, create the worksheet, then print or save."],
              ["print-select", "Print first, then choose the questions afterwards."],
              ["random-only", "Only use the first random set that appears."]
            ]
          }
        ]
      }
    ]
  },
  {
    id: "alignment-and-coverage",
    title: "Module 2: Curriculum, Textbook, And Coverage Tools",
    intro: "Use curriculum alignment, textbook alignment, and coverage maps to plan with confidence.",
    videos: [
      {
        id: "coverage-map",
        title: "Using The Coverage Map",
        description: "How to read the live subject coverage across GCSE, A-Level, Further Maths, statistics, mechanics, and international routes.",
        checks: [
          {
            id: "coverage-use",
            question: "What does the coverage map help teachers check?",
            answer: "coverage",
            options: [
              ["coverage", "Which mathematical areas are supported and where matching tools can be found."],
              ["billing", "Which Stripe plan a teacher has bought."],
              ["attendance", "Which students were present in class."]
            ]
          }
        ]
      },
      {
        id: "curriculum-alignment",
        title: "Using Curriculum Alignment",
        description: "How to choose a curriculum and see which Kaizen tools support the standards.",
        checks: [
          {
            id: "standards",
            question: "What should a teacher do first on the Curriculum Alignment page?",
            answer: "choose",
            options: [
              ["choose", "Choose the curriculum or exam route they want to inspect."],
              ["certificate", "Download a certificate."],
              ["erase", "Clear all topic tools."]
            ]
          }
        ]
      },
      {
        id: "textbook-alignment",
        title: "Using Textbook Alignment",
        description: "How textbook chapters can be matched to the most useful Kaizen Maths tools.",
        checks: [
          {
            id: "chapter-match",
            question: "What is the purpose of textbook alignment?",
            answer: "chapter-tools",
            options: [
              ["chapter-tools", "To connect textbook chapters with relevant Kaizen topic tools."],
              ["rewrite-book", "To replace a school's textbook completely."],
              ["mark-homework", "To mark every student response automatically."]
            ]
          }
        ]
      },
      {
        id: "school-defaults",
        title: "School-Specific Defaults",
        description: "How school access can show a default curriculum, school name, and school-facing context.",
        checks: [
          {
            id: "school-lens",
            question: "Why are school defaults useful?",
            answer: "context",
            options: [
              ["context", "They help teachers see Kaizen Maths through their school's curriculum and licence context."],
              ["hide", "They hide every other tool from the site."],
              ["student-data", "They require students to enter personal data."]
            ]
          }
        ]
      }
    ]
  },
  {
    id: "live-teaching-workflow",
    title: "Module 3: Using Topic Tools In Lessons",
    intro: "Practise the core teacher workflow for selecting questions, projecting them, revealing answers, and modelling methods.",
    videos: [
      {
        id: "using-a-topic-tool",
        title: "Choosing Topic, Level, And Question Type",
        description: "How to choose levels, question types, generate new sets, show answers, and reveal worked steps.",
        checks: [
          {
            id: "teacher-control",
            question: "Who controls the topic, level, and pace?",
            answer: "teacher",
            options: [
              ["teacher", "The teacher."],
              ["software", "The software chooses automatically."],
              ["students", "Students choose the sequence without teacher input."]
            ]
          }
        ]
      },
      {
        id: "practice-set-mode",
        title: "Practice Set Mode",
        description: "How to project a compact set of questions and use it for retrieval, fluency, and checking misconceptions.",
        checks: [
          {
            id: "practice-purpose",
            question: "What is Practice Set mode best for?",
            answer: "fluency",
            options: [
              ["fluency", "Board practice, retrieval, checking misconceptions, and repeated fluency."],
              ["profile", "Editing a teacher profile."],
              ["payment", "Changing a payment method."]
            ]
          }
        ]
      },
      {
        id: "one-example-mode",
        title: "One Example Mode",
        description: "How to put one question on the board for teacher modelling and class discussion.",
        checks: [
          {
            id: "model",
            question: "Why use One Example mode?",
            answer: "model",
            options: [
              ["model", "To focus the class on one worked example and the reasoning behind it."],
              ["quantity", "To fit as many questions as possible on screen."],
              ["admin-only", "To change access roles."]
            ]
          }
        ]
      },
      {
        id: "write-mode",
        title: "Writing, Capture, Timer, And Fullscreen",
        description: "How to use pen, highlighter, eraser, capture, timers, and fullscreen tools while teaching live.",
        checks: [
          {
            id: "write-capture",
            question: "What does the write and capture workflow support?",
            answer: "live-modelling",
            options: [
              ["live-modelling", "Teacher annotation, live explanation, and saving what was shown on the board."],
              ["billing", "Creating invoices."],
              ["student-login", "Collecting student usernames."]
            ]
          }
        ]
      }
    ]
  },
  {
    id: "worksheets-and-assessment",
    title: "Module 4: Worksheets, Assessment, And Implementation",
    intro: "Turn the virtual textbook into printable resources, intervention tasks, and school-ready routines.",
    videos: [
      {
        id: "building-a-worksheet",
        title: "Building A Worksheet",
        description: "How to choose topics, levels, and question types from across the site.",
        checks: [
          {
            id: "builder-step",
            question: "What must happen before creating the worksheet?",
            answer: "add-block",
            options: [
              ["add-block", "Add the selected question block so it can be edited."],
              ["close-page", "Close the page."],
              ["skip", "Skip the question selection."]
            ]
          }
        ]
      },
      {
        id: "assessment-mode-and-marks",
        title: "Assessment Mode And Marks",
        description: "How to add marks and shape a worksheet into a quiz or test-style paper.",
        checks: [
          {
            id: "marks",
            question: "Why edit marks before printing?",
            answer: "assessment",
            options: [
              ["assessment", "To shape the resource as a quiz, assessment, homework, or intervention sheet."],
              ["decoration", "Only to change the page colour."],
              ["unrelated", "It has no effect on assessment use."]
            ]
          }
        ]
      },
      {
        id: "using-the-exam-paper-builder",
        title: "Using The Exam Paper Builder",
        description: "How to generate GCSE-style practice, short sets, revision papers, and mock-style papers.",
        checks: [
          {
            id: "exam-style",
            question: "What is the exam builder intended to create?",
            answer: "exam-practice",
            options: [
              ["exam-practice", "Exam-style practice resources and mock-style papers."],
              ["student-chat", "A student messaging system."],
              ["calendar", "A demo booking calendar."]
            ]
          }
        ]
      },
      {
        id: "using-kaizen-in-a-department",
        title: "Using Kaizen In A Department Or Trial",
        description: "How a department can use shared routines across lessons, homework, intervention, feedback, and revision.",
        checks: [
          {
            id: "implementation",
            question: "What makes a school trial more useful?",
            answer: "routine",
            options: [
              ["routine", "Agreeing a clear topic, routine, teacher commitment, and feedback process."],
              ["unplanned", "Letting every teacher use it randomly without any shared focus."],
              ["students-data", "Asking students to enter personal details."]
            ]
          }
        ]
      }
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

const certificationProgressStorageKey = "kaizen:certification-progress-v1";
const certificationActiveLessonStorageKey = "kaizen:certification-active-lesson";

const certificationPracticalTasks = [
  {
    id: "classroom-routine",
    title: "Plan one classroom routine",
    description: "Choose one topic, one level, and one question type you would use for live board practice."
  },
  {
    id: "worked-example",
    title: "Model one worked example",
    description: "Use One Example mode, reveal the steps, and identify one misconception you would discuss."
  },
  {
    id: "worksheet",
    title: "Create one worksheet",
    description: "Build a short worksheet with selected questions and a separate answer key."
  },
  {
    id: "assessment",
    title: "Create one assessment resource",
    description: "Use marks or an assessment-style set to produce a short quiz, intervention task, or review sheet."
  },
  {
    id: "teacher-only",
    title: "Confirm teacher-only use",
    description: "Confirm that Kaizen Maths is used by adult teachers and that student personal data should not be entered."
  }
];

const certificationQuiz = [
  {
    id: "identity",
    question: "What is the best description of Kaizen Maths?",
    answer: "workspace",
    options: [
      ["workspace", "A virtual mathematics textbook and teaching workspace for teachers."],
      ["replacement", "A replacement for teacher planning and teaching."],
      ["student-app", "A student account platform for collecting student work."]
    ]
  },
  {
    id: "control",
    question: "Who remains in control of the lesson when using Kaizen Maths?",
    answer: "teacher",
    options: [
      ["teacher", "The teacher selects the topic, pace, examples, questions, and next step."],
      ["software", "The software decides the sequence of teaching."],
      ["students", "Students choose the whole learning route independently."]
    ]
  },
  {
    id: "classroom-view",
    question: "What is Classroom View mainly for?",
    answer: "projection",
    options: [
      ["projection", "Projecting questions, examples, diagrams, answers, steps, and annotations during teaching."],
      ["billing", "Managing school subscriptions and payments."],
      ["database", "Storing student names and assessment histories."]
    ]
  },
  {
    id: "worksheet-builder",
    question: "What is the key workflow in the Worksheet Builder?",
    answer: "select-build",
    options: [
      ["select-build", "Select questions, add them to the block, edit if needed, then create and print or save."],
      ["auto-only", "Press one button and never review the questions."],
      ["manual-copy", "Copy every question manually into a separate document."]
    ]
  },
  {
    id: "privacy",
    question: "What should teachers avoid entering into Kaizen Maths?",
    answer: "student-data",
    options: [
      ["student-data", "Student names, class lists, marks, or other student identifiers."],
      ["topics", "Mathematics topics and question choices."],
      ["school-context", "School licence or curriculum context set by an administrator."]
    ]
  }
];

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
    const schoolSelect = "id, name, organisation_name, pilot_name, country, currency_code, currency_symbol, locale, curriculum_focus, default_curriculum_id, standards_label, logo_url, contact_person, school_synopsis, licence_type, allowed_domains, seat_limit, join_code, join_code_expires_at, is_active, notes, licence_starts_at, licence_ends_at, created_at, updated_at";
    const fallbackSchoolSelect = "id, name, organisation_name, pilot_name, country, currency_code, currency_symbol, locale, curriculum_focus, standards_label, licence_type, allowed_domains, seat_limit, join_code, join_code_expires_at, is_active, notes, licence_starts_at, licence_ends_at, created_at, updated_at";
    let [schoolsResponse, { data: teacherAccess, error: teacherAccessError }] = await Promise.all([
      client.from("schools").select(schoolSelect).order("name", { ascending: true }),
      client
        .from("school_teacher_access")
        .select("id, school_id, email, created_at")
        .order("email", { ascending: true })
    ]);
    if (schoolsResponse.error && /column|schema cache/i.test(schoolsResponse.error.message || "")) {
      schoolsResponse = await client.from("schools").select(fallbackSchoolSelect).order("name", { ascending: true });
    }
    const { data: schools, error: schoolsError } = schoolsResponse;
    if (schoolsError) throw schoolsError;
    if (teacherAccessError) throw teacherAccessError;
    state.schools = (schools || []).map((school) => ({
      ...school,
      default_curriculum_id: school.default_curriculum_id || storedDefaultCurriculumForSchool(school.id)
    }));
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
    organisation_name: String(values.organisation_name || "").trim(),
    pilot_name: String(values.pilot_name || "").trim(),
    country: String(values.country || "").trim(),
    currency_code: String(values.currency_code || "").trim().toUpperCase() || "GBP",
    currency_symbol: String(values.currency_symbol || "").trim() || "£",
    locale: String(values.locale || "").trim() || "en-GB",
    curriculum_focus: String(values.curriculum_focus || "").trim(),
    default_curriculum_id: String(values.default_curriculum_id || "").trim(),
    standards_label: String(values.standards_label || "").trim(),
    logo_url: String(values.logo_url || "").trim(),
    contact_person: String(values.contact_person || "").trim(),
    school_synopsis: String(values.school_synopsis || "").trim(),
    licence_type: String(values.licence_type || "").trim() || "school",
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

  const request = (nextPayload) => values.id
    ? client.from("schools").update(nextPayload).eq("id", values.id).select("id").single()
    : client.from("schools").insert(nextPayload).select("id").single();
  let { data, error } = await request(payload);
  if (error && /default_curriculum_id|column|schema cache/i.test(error.message || "")) {
    const { default_curriculum_id, ...fallbackPayload } = payload;
    state.schoolDefaultCurriculumSchemaMissing = true;
    ({ data, error } = await request(fallbackPayload));
  }
  if (error) throw error;
  saveStoredDefaultCurriculumForSchool(data.id, payload.default_curriculum_id);
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

function certificationModules() {
  return universitySections.flatMap((section, sectionIndex) => section.videos.map((video, lessonIndex) => ({
    ...video,
    section: section.title,
    sectionId: section.id,
    moduleTitle: section.title,
    moduleNumber: sectionIndex + 1,
    lessonNumber: lessonIndex + 1,
    required: true
  })));
}

function certificationLessonById(lessonId) {
  return certificationModules().find((lesson) => lesson.id === lessonId) || null;
}

function certificationLessonUnlocked(lessonId, progress = certificationProgress()) {
  const lessons = certificationModules();
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  if (index <= 0) return index === 0;
  return lessons.slice(0, index).every((lesson) => progress.completed_modules?.[lesson.id]);
}

function certificationActiveLessonId(progress = certificationProgress()) {
  const lessons = certificationModules();
  let saved = "";
  try {
    saved = sessionStorage.getItem(certificationActiveLessonStorageKey) || "";
  } catch {
    saved = "";
  }
  if (saved && lessons.some((lesson) => lesson.id === saved) && certificationLessonUnlocked(saved, progress)) {
    return saved;
  }
  const nextLesson = lessons.find((lesson) => certificationLessonUnlocked(lesson.id, progress) && !progress.completed_modules?.[lesson.id]);
  return nextLesson?.id || lessons[lessons.length - 1]?.id || "";
}

function setCertificationActiveLesson(lessonId) {
  if (!lessonId) return;
  try {
    sessionStorage.setItem(certificationActiveLessonStorageKey, lessonId);
  } catch {
    // If session storage is unavailable, the pathway falls back to the next incomplete lesson.
  }
}

function nextCertificationLessonId(currentLessonId, progress = certificationProgress()) {
  const lessons = certificationModules();
  const currentIndex = lessons.findIndex((lesson) => lesson.id === currentLessonId);
  if (currentIndex < 0) return certificationActiveLessonId(progress);
  return lessons[currentIndex + 1]?.id || currentLessonId;
}

function certificationSectionProgress(section, progress = certificationProgress()) {
  const lessons = section.videos || [];
  const completed = lessons.filter((lesson) => progress.completed_modules?.[lesson.id]).length;
  return { completed, total: lessons.length };
}

function defaultCertificationProgress() {
  return {
    completed_modules: {},
    watched_lessons: {},
    lesson_answers: {},
    quiz_answers: {},
    quiz_score: 0,
    quiz_passed: false,
    practical_tasks: {},
    certified_at: "",
    updated_at: ""
  };
}

function certificationProgressKey() {
  return `${certificationProgressStorageKey}:${authState().session?.user?.id || "guest"}`;
}

function normaliseCertificationProgress(row = {}) {
  return {
    ...defaultCertificationProgress(),
    completed_modules: row.completed_modules || row.module_progress || {},
    watched_lessons: row.watched_lessons || {},
    lesson_answers: row.lesson_answers || {},
    quiz_answers: row.quiz_answers || {},
    quiz_score: Number(row.quiz_score || 0),
    quiz_passed: Boolean(row.quiz_passed),
    practical_tasks: row.practical_tasks || {},
    certified_at: row.certified_at || "",
    updated_at: row.updated_at || ""
  };
}

function certificationProgress() {
  if (state.universityProgress) return state.universityProgress;
  return normaliseCertificationProgress(readJsonStorage(certificationProgressKey(), defaultCertificationProgress()));
}

function certificationTotals(progress = certificationProgress()) {
  const modules = certificationModules();
  const completedModules = modules.filter((module) => progress.completed_modules?.[module.id]).length;
  const completedTasks = certificationPracticalTasks.filter((task) => progress.practical_tasks?.[task.id]).length;
  const totalItems = modules.length + certificationPracticalTasks.length;
  const completeItems = completedModules + completedTasks;
  return {
    modules,
    completedModules,
    totalModules: modules.length,
    completedTasks,
    totalTasks: certificationPracticalTasks.length,
    totalItems,
    completeItems,
    percent: totalItems ? Math.round((completeItems / totalItems) * 100) : 0
  };
}

function certificationIsComplete(progress = certificationProgress()) {
  const totals = certificationTotals(progress);
  return totals.completedModules === totals.totalModules
    && totals.completedTasks === totals.totalTasks;
}

function maybeAwardCertification(progress) {
  const next = normaliseCertificationProgress(progress);
  if (certificationIsComplete(next) && !next.certified_at) {
    next.certified_at = new Date().toISOString();
  }
  if (!certificationIsComplete(next)) {
    next.certified_at = "";
  }
  next.updated_at = new Date().toISOString();
  return next;
}

async function loadCertificationProgress({ rerender = false } = {}) {
  state.universityProgress = normaliseCertificationProgress(readJsonStorage(certificationProgressKey(), defaultCertificationProgress()));
  state.universityProgressLoaded = false;
  state.universityProgressSource = "local";

  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  const userId = authState().session?.user?.id;
  if (!client || !userId) {
    if (rerender && routeParts()[0] === "kaizen-university") renderRoute();
    return;
  }

  try {
    let { data, error } = await client
      .from("university_certification_progress")
      .select("completed_modules, watched_lessons, lesson_answers, quiz_answers, quiz_score, quiz_passed, practical_tasks, certified_at, updated_at")
      .eq("user_id", userId)
      .maybeSingle();
    if (error && /watched_lessons|lesson_answers|column|schema cache/i.test(error.message || "")) {
      ({ data, error } = await client
        .from("university_certification_progress")
        .select("completed_modules, quiz_answers, quiz_score, quiz_passed, practical_tasks, certified_at, updated_at")
        .eq("user_id", userId)
        .maybeSingle());
    }
    if (error) throw error;
    if (data) {
      state.universityProgress = normaliseCertificationProgress(data);
      localStorage.setItem(certificationProgressKey(), JSON.stringify(state.universityProgress));
    }
    state.universityProgressLoaded = true;
    state.universityProgressSource = "supabase";
    if (rerender && routeParts()[0] === "kaizen-university") renderRoute();
  } catch (error) {
    console.warn("Kaizen certification progress unavailable:", error.message);
    if (rerender && routeParts()[0] === "kaizen-university") renderRoute();
  }
}

async function saveCertificationProgress(progress, { rerender = true } = {}) {
  const next = maybeAwardCertification(progress);
  state.universityProgress = next;
  localStorage.setItem(certificationProgressKey(), JSON.stringify(next));

  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  const userId = authState().session?.user?.id;
  if (userId) {
    state.universityCertificationRecords[userId] = next;
  }
  if (client && userId) {
    try {
      let { error } = await client
        .from("university_certification_progress")
        .upsert({
          user_id: userId,
          completed_modules: next.completed_modules,
          watched_lessons: next.watched_lessons,
          lesson_answers: next.lesson_answers,
          quiz_answers: next.quiz_answers,
          quiz_score: next.quiz_score,
          quiz_passed: next.quiz_passed,
          practical_tasks: next.practical_tasks,
          certified_at: next.certified_at || null,
          updated_at: next.updated_at
        }, { onConflict: "user_id" });
      if (error && /watched_lessons|lesson_answers|column|schema cache/i.test(error.message || "")) {
        ({ error } = await client
          .from("university_certification_progress")
          .upsert({
            user_id: userId,
            completed_modules: next.completed_modules,
            quiz_answers: next.quiz_answers,
            quiz_score: next.quiz_score,
            quiz_passed: next.quiz_passed,
            practical_tasks: next.practical_tasks,
            certified_at: next.certified_at || null,
            updated_at: next.updated_at
          }, { onConflict: "user_id" }));
      }
      if (error) throw error;
      state.universityProgressLoaded = true;
      state.universityProgressSource = "supabase";
    } catch (error) {
      state.universityProgressSource = "local";
      console.warn("Kaizen certification progress saved locally only:", error.message);
    }
  }

  if (rerender && routeParts()[0] === "kaizen-university") renderRoute();
}

async function loadCertificationRecords({ rerender = false } = {}) {
  const client = await window.KaizenAuth?.getClient?.().catch(() => null);
  if (!client || !isAdmin()) return;
  try {
    let { data, error } = await client
      .from("university_certification_progress")
      .select("user_id, completed_modules, watched_lessons, lesson_answers, practical_tasks, certified_at, updated_at");
    if (error && /watched_lessons|lesson_answers|column|schema cache/i.test(error.message || "")) {
      ({ data, error } = await client
        .from("university_certification_progress")
        .select("user_id, completed_modules, practical_tasks, certified_at, updated_at"));
    }
    if (error) throw error;
    state.universityCertificationRecords = Object.fromEntries((data || []).map((row) => [row.user_id, normaliseCertificationProgress(row)]));
    state.universityCertificationRecordsLoaded = true;
    if (rerender && routeParts()[0] === "admin") renderRoute();
  } catch (error) {
    state.universityCertificationRecords = {};
    state.universityCertificationRecordsLoaded = true;
    console.warn("Kaizen certification records unavailable:", error.message);
    if (rerender && routeParts()[0] === "admin") renderRoute();
  }
}

function adminCertificationStatusHtml(profile) {
  const row = state.universityCertificationRecords[profile.id];
  if (!row) {
    return `
      <span class="admin-certification-status not-started">Not started</span>
      <small>No pathway progress yet</small>
    `;
  }
  const progress = normaliseCertificationProgress(row);
  const totals = certificationTotals(progress);
  if (certificationIsComplete(progress)) {
    return `
      <span class="admin-certification-status certified">&#10003; Kaizen Certified Teacher</span>
      <small>Completed ${escapeHtml(formatDisplayDate(progress.certified_at || progress.updated_at))}</small>
    `;
  }
  return `
    <span class="admin-certification-status in-progress">${totals.percent}% in progress</span>
    <small>${totals.completedModules}/${totals.totalModules} lessons · ${totals.completedTasks}/${totals.totalTasks} practical tasks</small>
  `;
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

function safeImageSource(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^data:image\/(png|jpe?g|webp|gif|svg\+xml);base64,/i.test(raw)) return raw;
  if (/^(assets\/|\/assets\/|favicon\.svg)/i.test(raw)) return raw;
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "https:" ? parsed.href : "";
  } catch {
    return "";
  }
}

function schoolLogoFileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    if (!String(file.type || "").startsWith("image/")) {
      reject(new Error("Choose an image file for the school logo."));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The logo file could not be read."));
    reader.onload = () => {
      const originalDataUrl = String(reader.result || "");
      if (!originalDataUrl || file.type === "image/svg+xml") {
        resolve(originalDataUrl);
        return;
      }
      const image = new Image();
      image.onerror = () => resolve(originalDataUrl);
      image.onload = () => {
        const maxDimension = 420;
        const scale = Math.min(1, maxDimension / Math.max(image.width || maxDimension, image.height || maxDimension));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round((image.width || maxDimension) * scale));
        canvas.height = Math.max(1, Math.round((image.height || maxDimension) * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          resolve(originalDataUrl);
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      };
      image.src = originalDataUrl;
    };
    reader.readAsDataURL(file);
  });
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
  return gcseDiagramFrame("Not drawn to scale", `
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
  return gcseDiagramFrame("Not drawn to scale", `
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
      `Shift the digits ${power} places right through the fixed decimal point to make the coefficient ${mantissa}.`,
      `The decimal point marks the fixed boundary between ones and tenths; the digit shift gives ${number.toLocaleString("en-GB")} = ${mantissa} × 10^${power}.`
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
        <h2 id="homeCoverageTitle">Mapped across UK KS2, UK KS3, GCSE, CSEC, CAPE, Oman GED, Common Core, A-Level, and Further Maths</h2>
        <p>See current coverage for UK KS2, UK KS3, GCSE, CSEC, CAPE, Oman GED, Common Core, A-Level Pure, Further Maths, A-Level Statistics, and A-Level Mechanics, with future tagging routes for IGCSE and IB.</p>
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
        <a class="button" href="#/kaizen-university">Complete Certification</a>
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
          <a class="button primary" href="#/kaizen-university">Certification Pathway</a>
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
        "A compact live view of the Kaizen Maths tool library across UK KS2, UK KS3, GCSE, CSEC, CAPE, Oman GED, Common Core, A-Level Pure, Further Maths, Statistics, and Mechanics.",
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

const textbookAlignmentCourses = [
  {
    id: "holt-mcdougal-g6",
    seriesId: "holt-mcdougal",
    publisher: "Holt McDougal",
    course: "Mathematics Grade 6",
    label: "Holt McDougal Mathematics Grade 6",
    status: "Pilot",
    basis: "Pilot map based on the common public Grade 6 / Course 1 scope. Schools can refine this with their exact edition, ISBN, and chapter titles.",
    chapters: [
      {
        code: "G6.1",
        title: "Whole Numbers, Operations and Properties",
        focus: "Place value, operation fluency, factors, multiples, order of operations, and properties of arithmetic.",
        coverage: "Strong",
        tools: [
          ["four-operations", "daily calculation fluency and word problems"],
          ["order-of-operations", "BIDMAS / order of operations practice"],
          ["hcf-lcm", "factors, multiples, HCF, LCM and prime factorisation"],
          ["powers-of-10", "place value links and powers of ten"]
        ],
        teacherMove: "Use as starter practice, retrieval, and intervention before moving into algebraic notation."
      },
      {
        code: "G6.2",
        title: "Introduction to Algebra",
        focus: "Variables, expressions, substitution, simple equations, and translating between words and symbols.",
        coverage: "Strong",
        tools: [
          ["substitution", "substituting values into expressions"],
          ["simplification", "collecting like terms and simplifying expressions"],
          ["linear-equations", "one-step and two-step equation solving"],
          ["transposition-formulae", "rearranging simple formulae for extension"]
        ],
        teacherMove: "Use one-example mode to model the meaning of a variable, then generate five-question practice sets."
      },
      {
        code: "G6.3",
        title: "Decimals and Powers of Ten",
        focus: "Decimal place value, comparing, rounding, decimal operations, and multiplying or dividing by powers of ten.",
        coverage: "Strong",
        tools: [
          ["decimals-practice-lab", "decimal place value, operations and rounding"],
          ["powers-of-10", "multiplying and dividing by powers of ten"],
          ["four-operations", "column methods and operation choice"],
          ["conversions-teaching", "decimal, fraction and percentage conversions"]
        ],
        teacherMove: "Use the decimal lab for direct chapter practice and the conversion table as a quick board starter."
      },
      {
        code: "G6.4",
        title: "Number Theory, Fractions and Mixed Numbers",
        focus: "Equivalent fractions, simplifying, mixed numbers, common denominators, and fraction operations.",
        coverage: "Strong",
        tools: [
          ["fractions-practice", "equivalent fractions, simplifying and operations"],
          ["hcf-lcm", "common factors and common multiples for simplifying and denominators"],
          ["bar-models", "conceptual fraction and proportion models"],
          ["area-models", "visual fraction and array reasoning"]
        ],
        teacherMove: "Pair the fraction practice tool with bar models when students need a visual route before calculation."
      },
      {
        code: "G6.5",
        title: "Ratios, Rates, Proportions and Percents",
        focus: "Ratio language, rates, unit rates, proportional reasoning, percentage of amounts, and simple percentage change.",
        coverage: "Strong",
        tools: [
          ["ratio-proportion", "ratio, sharing, scale, recipes and proportion"],
          ["simple-percentage-tasks", "percentage conversions and percentage of amounts"],
          ["percentages-real-world", "discounts, VAT, tips, interest and real-life contexts"],
          ["bar-models", "ratio, reverse ratio and percentage models"]
        ],
        teacherMove: "Use ratio-proportion for structured practice, then move to real-world percentages for application."
      },
      {
        code: "G6.6",
        title: "Integers and the Coordinate Plane",
        focus: "Positive and negative numbers, absolute value, coordinate plotting, quadrants and simple graph interpretation.",
        coverage: "Strong",
        tools: [
          ["integer-operations", "integer comparison, ordering, all four operations, and directed-number contexts"],
          ["absolute-values", "absolute value and distance from zero"],
          ["straight-lines", "coordinate plane, gradient and line graphs for extension"],
          ["transformations", "coordinate movement on grids"]
        ],
        teacherMove: "Use integer operations first for directed-number fluency, then move into absolute value and coordinate-plane work."
      },
      {
        code: "G6.7",
        title: "Data, Averages and Probability",
        focus: "Mean, median, mode, range, simple data displays, interpretation, and introductory probability.",
        coverage: "Strong",
        tools: [
          ["averages-range", "mean, median, mode, range and choosing suitable averages"],
          ["discrete-random-variables", "probability tables for extension"],
          ["tree-diagrams-conditional-probability", "structured probability for later extension"],
          ["venn-diagrams", "set diagrams and probability language"]
        ],
        teacherMove: "Start with Averages and Range for the Grade 6 core; use probability tools selectively as extension or enrichment."
      },
      {
        code: "G6.8",
        title: "Geometry: Angles, Polygons and Transformations",
        focus: "Angle facts, polygons, symmetry, transformations, coordinate movement and geometric vocabulary.",
        coverage: "Strong",
        tools: [
          ["missing-angles", "angle facts and missing-angle reasoning"],
          ["polygons-angles", "interior and exterior angle problems"],
          ["transformations", "translation, reflection, rotation and enlargement"],
          ["concept-explainer", "properties of shapes and classroom explanations"]
        ],
        teacherMove: "Use the explainer for vocabulary, then transformations or angle tools for practice and board discussion."
      },
      {
        code: "G6.9",
        title: "Measurement, Area, Surface Area and Volume",
        focus: "Perimeter, area, surface area, volume, units, and problem-solving with rectangles, triangles and prisms.",
        coverage: "Strong",
        tools: [
          ["area-rectangles", "area and perimeter of rectangles"],
          ["area-triangles", "triangle area and related calculations"],
          ["volume-surface-area-prisms", "volume and surface area of prisms"],
          ["conversions-teaching", "unit conversion support"]
        ],
        teacherMove: "Build fluency with area tools, then use prism questions for multi-step measurement practice."
      },
      {
        code: "G6.10",
        title: "Patterns, Functions and Graphs",
        focus: "Number patterns, input-output rules, simple functions, tables and graphing relationships.",
        coverage: "Partial",
        tools: [
          ["sequences", "number patterns and nth-term thinking"],
          ["functions", "function notation and mappings for extension"],
          ["straight-lines", "tables, coordinates and linear relationships"],
          ["graph-transformations-curve-sketching", "graph behaviour for enrichment"]
        ],
        teacherMove: "Use sequences and straight lines for Grade 6; functions and graph transformations are better for extension."
      }
    ]
  },
  {
    id: "holt-mcdougal-g7",
    seriesId: "holt-mcdougal",
    publisher: "Holt McDougal",
    course: "Mathematics Grade 7 / Course 2",
    label: "Holt McDougal Mathematics Grade 7 / Course 2",
    status: "Pilot",
    basis: "Pilot map based on the public Holt McDougal Mathematics Course 2 chapter sequence. Schools can refine this with their exact edition, ISBN, and local pacing guide.",
    chapters: [
      {
        code: "G7.1",
        title: "Algebraic Reasoning",
        focus: "Variables, expressions, equations, patterns, operation properties, and translating between words and algebra.",
        coverage: "Strong",
        tools: [
          ["simplification", "collecting like terms and simplifying expressions"],
          ["substitution", "substituting values into expressions"],
          ["linear-equations", "one-step and two-step equation solving"],
          ["sequences", "patterns and term-to-term reasoning"]
        ],
        teacherMove: "Use simplification and substitution for algebra foundations, then move into equations and sequences for reasoning practice."
      },
      {
        code: "G7.2",
        title: "Integers and Rational Numbers",
        focus: "Integer comparison, rational numbers, absolute value, fractions, decimals, and movement on the number line.",
        coverage: "Strong",
        tools: [
          ["integer-operations", "integer meaning and directed-number fluency"],
          ["absolute-values", "absolute value and distance from zero"],
          ["fractions-practice", "fraction arithmetic and mixed numbers"],
          ["decimals-practice-lab", "decimal place value and operations"]
        ],
        teacherMove: "Start with integer operations for directed-number confidence, then connect rational numbers through fraction and decimal practice."
      },
      {
        code: "G7.3",
        title: "Applying Rational Numbers",
        focus: "Operations with fractions, decimals, integers, and multi-step numerical expressions.",
        coverage: "Strong",
        tools: [
          ["fractions-practice", "fraction operations and mixed numbers"],
          ["decimals-practice-lab", "decimal operations"],
          ["integer-operations", "mixed integer calculations"],
          ["order-of-operations", "BIDMAS with multi-step expressions"]
        ],
        teacherMove: "Use focused fraction, decimal, and integer sets before combining skills through order-of-operations practice."
      },
      {
        code: "G7.4",
        title: "Proportional Relationships",
        focus: "Ratios, rates, unit rates, proportional reasoning, graphs, and scale factors.",
        coverage: "Strong",
        tools: [
          ["ratio-proportion", "ratio, rates, sharing, and proportion"],
          ["bar-models", "visual ratio and proportion models"],
          ["straight-lines", "linear relationships and graphs"],
          ["scale-drawing-similar-shapes", "scale factors and similar shapes"]
        ],
        teacherMove: "Use bar models for conceptual setup, then ratio-proportion and graphing tools for fluency and application."
      },
      {
        code: "G7.5",
        title: "Percent and Proportional Reasoning",
        focus: "Percent of amounts, percent change, discounts, tax, tips, simple interest, and real-life percentage contexts.",
        coverage: "Strong",
        tools: [
          ["simple-percentage-tasks", "percentage of amounts and conversions"],
          ["percentages-real-world", "discounts, VAT, tips, interest, and applications"],
          ["financial-real-life-maths", "financial percentage contexts"],
          ["bar-models", "percentage and reverse-percentage models"]
        ],
        teacherMove: "Build from percentage basics into real-world applications, using bar models when students need to identify the original whole."
      },
      {
        code: "G7.6",
        title: "Functions, Graphs and Linear Relationships",
        focus: "Input-output rules, tables, coordinate graphs, linear relationships, and interpreting graphs.",
        coverage: "Strong",
        tools: [
          ["functions", "function notation, mappings, and values"],
          ["straight-lines", "coordinate tables, gradients, and linear graphs"],
          ["sequences", "patterns and rules"],
          ["graph-transformations-curve-sketching", "extension graph behaviour"]
        ],
        teacherMove: "Use straight-line tools for Grade 7 graphing and functions/sequences for rule-based reasoning."
      },
      {
        code: "G7.7",
        title: "Collecting, Displaying and Analysing Data",
        focus: "Data displays, averages, spread, sampling, scatter plots, and interpreting data sets.",
        coverage: "Strong",
        tools: [
          ["averages-range", "mean, median, mode, range, and choosing averages"],
          ["histograms", "frequency tables and histogram interpretation"],
          ["sampling-methods-bias", "sampling methods and bias"],
          ["correlation-regression", "scatter diagrams and correlation for extension"]
        ],
        teacherMove: "Use averages and histograms for core data handling, then sampling and correlation as enrichment or extension."
      },
      {
        code: "G7.8",
        title: "Geometric Figures",
        focus: "Angles, polygons, transformations, symmetry, circles, and geometric properties.",
        coverage: "Strong",
        tools: [
          ["missing-angles", "angle facts and missing-angle reasoning"],
          ["polygons-angles", "interior and exterior angles"],
          ["transformations", "translation, reflection, rotation, and enlargement"],
          ["concept-explainer", "shape properties and vocabulary"]
        ],
        teacherMove: "Use the explainer for properties and vocabulary, then generate focused angle or transformation practice."
      },
      {
        code: "G7.9",
        title: "Measurement: Two-Dimensional Figures",
        focus: "Area, perimeter, circumference, circles, composite shapes, scale drawings, and similar figures.",
        coverage: "Strong",
        tools: [
          ["area-rectangles", "area and perimeter of rectangles"],
          ["area-triangles", "triangle area"],
          ["circles-area-circumference", "circle area and circumference"],
          ["sectors-arc-length", "circle sectors for extension"]
        ],
        teacherMove: "Use area tools for core practice, then circle tools and sectors when the course moves into curved shapes."
      },
      {
        code: "G7.10",
        title: "Measurement: Three-Dimensional Figures",
        focus: "Volume, surface area, prisms, cylinders, cones, pyramids, spheres, and compound measures.",
        coverage: "Strong",
        tools: [
          ["volume-surface-area-prisms", "volume and surface area of prisms"],
          ["cylinders-cones-volume-surface-area", "cylinders and cones"],
          ["pyramids-spheres-volume-surface-area", "pyramids and spheres"],
          ["conversions-teaching", "unit conversion support"]
        ],
        teacherMove: "Use prism questions first, then extend to cylinders, cones, pyramids, and spheres where needed."
      },
      {
        code: "G7.11",
        title: "Probability",
        focus: "Theoretical probability, experimental probability, sample spaces, compound events, and simple probability diagrams.",
        coverage: "Strong",
        tools: [
          ["venn-diagrams", "set diagrams and probability language"],
          ["tree-diagrams-conditional-probability", "tree diagrams and compound events"],
          ["permutations-combinations", "counting methods for extension"],
          ["discrete-random-variables", "probability tables for extension"]
        ],
        teacherMove: "Begin with probability language and diagrams, then use tree diagrams when students need structured compound-event practice."
      },
      {
        code: "G7.12",
        title: "Multi-Step Equations and Inequalities",
        focus: "Solving multi-step equations, inequalities, formulae, and algebraic problem-solving.",
        coverage: "Strong",
        tools: [
          ["linear-equations", "multi-step linear equations"],
          ["inequalities", "solving and representing inequalities"],
          ["transposition-formulae", "rearranging formulae"],
          ["simplification", "simplifying expressions before solving"]
        ],
        teacherMove: "Use simplification to prepare equations, then move into equations, inequalities, and formula rearrangement."
      }
    ]
  },
  {
    id: "holt-mcdougal-pre-algebra",
    seriesId: "holt-mcdougal",
    publisher: "Holt McDougal",
    course: "Pre-Algebra",
    label: "Holt McDougal Pre-Algebra",
    status: "Pilot",
    basis: "Pilot map based on the public Holt McDougal Pre-Algebra table of contents. Schools can refine this with their exact edition, ISBN, and local pacing guide.",
    chapters: [
      {
        code: "PA.1",
        title: "Variables, Expressions and Integers",
        focus: "Variables, expressions, order of operations, integer meaning, comparing integers, and evaluating expressions.",
        coverage: "Strong",
        tools: [
          ["integer-operations", "integer meaning, ordering, and directed-number fluency"],
          ["substitution", "evaluating expressions by substitution"],
          ["order-of-operations", "BIDMAS and expression evaluation"],
          ["simplification", "simplifying algebraic expressions"]
        ],
        teacherMove: "Use integers and order of operations first, then move into substitution and simplification for algebra readiness."
      },
      {
        code: "PA.2",
        title: "Solving Equations",
        focus: "One-step and two-step equations, inverse operations, checking solutions, and equation contexts.",
        coverage: "Strong",
        tools: [
          ["linear-equations", "one-step, two-step, and bracketed linear equations"],
          ["substitution", "checking solutions by substitution"],
          ["transposition-formulae", "rearranging simple formulae"],
          ["bar-models", "visual equation models for conceptual support"]
        ],
        teacherMove: "Model inverse operations with one example, then generate equation sets for fluency and checking."
      },
      {
        code: "PA.3",
        title: "Multi-Step Equations and Inequalities",
        focus: "Multi-step equations, equations with variables on both sides, inequalities, and solution checking.",
        coverage: "Strong",
        tools: [
          ["linear-equations", "multi-step equations and variables on both sides"],
          ["inequalities", "solving and representing inequalities"],
          ["simplification", "collecting like terms before solving"],
          ["transposition-formulae", "formula rearrangement for extension"]
        ],
        teacherMove: "Use simplification as the bridge into multi-step solving, then practise inequalities separately."
      },
      {
        code: "PA.4",
        title: "Factors, Fractions and Exponents",
        focus: "Factors, multiples, prime factorisation, fraction operations, powers, exponents, and scientific notation foundations.",
        coverage: "Strong",
        tools: [
          ["hcf-lcm", "factors, multiples, HCF, LCM, and prime factorisation"],
          ["fractions-practice", "fraction arithmetic and mixed numbers"],
          ["powers-of-10", "powers of ten, standard form, and index-law foundations"],
          ["number-bases-number-sets", "number-set classification for extension"]
        ],
        teacherMove: "Use HCF/LCM to strengthen factor reasoning before fraction operations and exponent work."
      },
      {
        code: "PA.5",
        title: "Rational Numbers and Equations",
        focus: "Fractions, decimals, negative rational numbers, rational-number operations, and equations involving rational values.",
        coverage: "Strong",
        tools: [
          ["fractions-practice", "fraction operations and mixed numbers"],
          ["decimals-practice-lab", "decimal operations and place value"],
          ["integer-operations", "negative-number operations"],
          ["linear-equations", "equations involving rational values"]
        ],
        teacherMove: "Keep rational-number calculation separate at first, then use linear equations to apply the same operations in algebraic form."
      },
      {
        code: "PA.6",
        title: "Ratio, Proportion and Probability",
        focus: "Ratios, rates, proportions, scale, probability language, simple events, and compound-event foundations.",
        coverage: "Strong",
        tools: [
          ["ratio-proportion", "ratio, rates, sharing, scale, and proportion"],
          ["bar-models", "ratio and reverse-ratio models"],
          ["venn-diagrams", "set diagrams and probability language"],
          ["tree-diagrams-conditional-probability", "compound events for extension"]
        ],
        teacherMove: "Use ratio-proportion for calculation fluency, then introduce probability diagrams when moving into event reasoning."
      },
      {
        code: "PA.7",
        title: "Percents",
        focus: "Percent of amounts, percent change, discounts, tax, simple interest, error, and real-life percentage applications.",
        coverage: "Strong",
        tools: [
          ["simple-percentage-tasks", "percentage of amounts and conversions"],
          ["percentages-real-world", "discounts, VAT, tips, interest, and applications"],
          ["financial-real-life-maths", "financial percentage contexts"],
          ["bar-models", "percentage and reverse-percentage models"]
        ],
        teacherMove: "Use percentage tasks for core skills, then move into real-life maths for application and word-problem practice."
      },
      {
        code: "PA.8",
        title: "Linear Functions",
        focus: "Coordinate graphs, linear rules, tables, slope, intercepts, equations of lines, and interpreting linear relationships.",
        coverage: "Strong",
        tools: [
          ["straight-lines", "gradient, intercepts, coordinate tables, and line equations"],
          ["functions", "function rules, values, mappings, and notation"],
          ["sequences", "linear patterns and rules"],
          ["graph-transformations-curve-sketching", "graph behaviour for extension"]
        ],
        teacherMove: "Use straight-lines for the main chapter work and functions/sequences to connect tables, rules, and graphs."
      },
      {
        code: "PA.9",
        title: "Real Numbers and Right Triangles",
        focus: "Square roots, real numbers, Pythagoras, right-triangle calculations, and irrational-number links.",
        coverage: "Strong",
        tools: [
          ["surds-radicals", "square roots, radicals, and irrational-number simplification"],
          ["pythagoras-theorem", "right-triangle side calculations"],
          ["trigonometric-ratios", "right-triangle trigonometry for extension"],
          ["number-bases-number-sets", "real, rational, and irrational number classification"]
        ],
        teacherMove: "Use number-set language and surds to prepare for Pythagoras, then extend to trigonometric ratios where appropriate."
      },
      {
        code: "PA.10",
        title: "Measurement: Area and Volume",
        focus: "Perimeter, area, circles, surface area, volume, units, prisms, cylinders, cones, pyramids, and spheres.",
        coverage: "Strong",
        tools: [
          ["area-rectangles", "area and perimeter of rectangles"],
          ["area-triangles", "triangle area"],
          ["circles-area-circumference", "circle area and circumference"],
          ["volume-surface-area-prisms", "volume and surface area of prisms"]
        ],
        teacherMove: "Use area tools for two-dimensional fluency, then move into prism volume and surface area for three-dimensional measurement."
      },
      {
        code: "PA.11",
        title: "Data Analysis and Probability",
        focus: "Averages, spread, data displays, histograms, cumulative frequency, samples, probability, and data interpretation.",
        coverage: "Strong",
        tools: [
          ["averages-range", "mean, median, mode, range, and choosing averages"],
          ["histograms", "frequency tables and histogram interpretation"],
          ["cumulative-frequency-curves", "cumulative frequency for extension"],
          ["sampling-methods-bias", "sampling methods and bias"]
        ],
        teacherMove: "Use averages and histograms for core data analysis, then sampling and cumulative frequency as extension or enrichment."
      }
    ]
  },
  {
    id: "holt-mcdougal-algebra-1",
    seriesId: "holt-mcdougal",
    publisher: "Holt McDougal",
    course: "Algebra 1",
    label: "Holt McDougal Algebra 1",
    status: "Pilot",
    basis: "Pilot map based on the public Holt McDougal Algebra I chapter sequence. Schools can refine this with their exact edition, ISBN, and local pacing guide.",
    chapters: [
      {
        code: "A1.1",
        title: "Foundations for Algebra",
        focus: "Variables, expressions, order of operations, real numbers, properties, and evaluating algebraic expressions.",
        coverage: "Strong",
        tools: [
          ["simplification", "collecting like terms and simplifying algebraic expressions"],
          ["substitution", "evaluating expressions by substitution"],
          ["order-of-operations", "BIDMAS and multi-step numerical expressions"],
          ["integer-operations", "integer fluency and directed-number operations"]
        ],
        teacherMove: "Use order of operations and integer operations for number fluency, then move into substitution and simplification."
      },
      {
        code: "A1.2",
        title: "Solving Equations",
        focus: "One-step, two-step, multi-step, and bracketed linear equations, including checking solutions.",
        coverage: "Strong",
        tools: [
          ["linear-equations", "one-step, two-step, brackets, and variables on both sides"],
          ["transposition-formulae", "rearranging formulae and isolating variables"],
          ["substitution", "checking solutions by substitution"],
          ["bar-models", "conceptual equation models for support"]
        ],
        teacherMove: "Model inverse operations clearly, then use equation sets for fluency, checking, and intervention."
      },
      {
        code: "A1.3",
        title: "Solving Inequalities",
        focus: "Solving, graphing, and interpreting linear inequalities, including compound inequalities and solution sets.",
        coverage: "Strong",
        tools: [
          ["inequalities", "solving and representing inequalities"],
          ["linear-equations", "equation fluency before inequality solving"],
          ["straight-lines", "graphical interpretation of inequalities"],
          ["integer-operations", "negative-number operations when rearranging"]
        ],
        teacherMove: "Use equations to secure the solving process, then highlight the inequality-specific decisions and representations."
      },
      {
        code: "A1.4",
        title: "An Introduction to Functions",
        focus: "Function rules, input-output tables, mappings, notation, substitution, domain ideas, and interpreting relationships.",
        coverage: "Strong",
        tools: [
          ["functions", "function notation, mappings, values, and inverse ideas"],
          ["substitution", "evaluating expressions and functions"],
          ["sequences", "rules, patterns, and nth-term thinking"],
          ["straight-lines", "tables and coordinate graph links"]
        ],
        teacherMove: "Connect function notation to substitution first, then use tables and graphs to show the same relationship visually."
      },
      {
        code: "A1.5",
        title: "Linear Functions",
        focus: "Gradient, intercepts, equations of lines, graphing from tables, rate of change, and linear modelling.",
        coverage: "Strong",
        tools: [
          ["straight-lines", "gradient, intercepts, coordinate tables, and line equations"],
          ["functions", "linear functions and function notation"],
          ["graph-transformations-curve-sketching", "graph behaviour and transformations for extension"],
          ["correlation-regression", "linear modelling and scatter diagrams for application"]
        ],
        teacherMove: "Use straight-line tools for the main skill sequence, then connect to functions and modelling contexts."
      },
      {
        code: "A1.6",
        title: "Systems of Equations and Inequalities",
        focus: "Simultaneous linear equations, graphical solutions, systems of inequalities, and feasible regions.",
        coverage: "Strong",
        tools: [
          ["simultaneous-equations", "solving linear systems algebraically"],
          ["straight-lines", "graphical meaning of simultaneous equations"],
          ["inequalities", "inequality notation and regions"],
          ["linear-programming", "systems of inequalities and feasible-region extension"]
        ],
        teacherMove: "Start with algebraic simultaneous equations, then use graphs to make the solution point and inequality regions visible."
      },
      {
        code: "A1.7",
        title: "Exponents and Polynomials",
        focus: "Index laws, powers, standard form, polynomial expressions, multiplying terms, and simplifying products.",
        coverage: "Strong",
        tools: [
          ["powers-of-10", "powers, standard form, and exponent foundations"],
          ["simplification", "simplifying algebraic terms and expressions"],
          ["advanced-factorisation", "multivariable factors and polynomial structure"],
          ["quadratic-factorisation", "polynomial structure leading into factorising"]
        ],
        teacherMove: "Use exponent fluency before expanding or simplifying polynomial expressions, then connect structure to factorisation."
      },
      {
        code: "A1.8",
        title: "Factoring Polynomials",
        focus: "Common factors, grouping, difference of two squares, quadratic factorisation, and complete factorisation.",
        coverage: "Strong",
        tools: [
          ["quadratic-factorisation", "factorising quadratic expressions"],
          ["advanced-factorisation", "HCF, grouping, difference of two squares, and cubics"],
          ["simplification", "collecting and preparing expressions before factorising"],
          ["algebraic-fractions", "using factorisation to simplify rational expressions"]
        ],
        teacherMove: "Separate common-factor work, grouping, and quadratic factorisation before mixing methods."
      },
      {
        code: "A1.9",
        title: "Quadratic Functions and Equations",
        focus: "Quadratic graphs, solving quadratics, factorising, the quadratic formula, completing the square, and interpreting roots.",
        coverage: "Strong",
        tools: [
          ["quadratic-equations", "solving quadratics by factorising, formula, and graph links"],
          ["quadratic-factorisation", "factorising quadratic expressions"],
          ["graph-transformations-curve-sketching", "quadratic graphs and transformations"],
          ["functions", "function notation and evaluating quadratic functions"]
        ],
        teacherMove: "Use factorisation first where appropriate, then compare formula and graph methods so students see why roots matter."
      },
      {
        code: "A1.10",
        title: "Exponential Functions",
        focus: "Exponential growth and decay, powers, percentage change, graphs, and introductory logarithmic links.",
        coverage: "Strong",
        tools: [
          ["functions", "exponential function notation and evaluation"],
          ["sequences", "geometric sequences and repeated multiplication"],
          ["powers-of-10", "powers and standard form fluency"],
          ["logarithms-practice", "logarithmic equations as extension"]
        ],
        teacherMove: "Build from powers and geometric sequences into exponential functions, then use logarithms only as an extension bridge."
      },
      {
        code: "A1.11",
        title: "Data Analysis and Probability",
        focus: "Averages, data displays, scatter diagrams, correlation, lines of best fit, probability, and interpreting data.",
        coverage: "Strong",
        tools: [
          ["averages-range", "mean, median, mode, range, and choosing averages"],
          ["histograms", "frequency tables and histogram interpretation"],
          ["correlation-regression", "scatter diagrams, correlation, and regression lines"],
          ["tree-diagrams-conditional-probability", "structured probability and compound events"]
        ],
        teacherMove: "Use averages and displays for core statistics, then bring in correlation and probability tools for applied practice."
      }
    ]
  },
  {
    id: "holt-mcdougal-precalculus",
    seriesId: "holt-mcdougal",
    publisher: "Holt McDougal",
    course: "Precalculus",
    label: "Holt McDougal Precalculus",
    status: "Pilot",
    basis: "Pilot map based on the public Larson Precalculus chapter structure. Schools can refine this with their exact edition, ISBN, and local pacing guide.",
    chapters: [
      {
        code: "PC.P",
        title: "Prerequisites and Algebra Review",
        focus: "Real numbers, expressions, equations, inequalities, graphing basics, and algebraic fluency needed before precalculus.",
        coverage: "Strong",
        tools: [
          ["linear-equations", "equation solving and algebraic fluency"],
          ["inequalities", "linear inequalities and solution sets"],
          ["simplification", "simplifying algebraic expressions"],
          ["advanced-factorisation", "factorisation and algebraic structure"]
        ],
        teacherMove: "Use this as a diagnostic route before starting functions, especially for students who need algebra repair."
      },
      {
        code: "PC.1",
        title: "Functions and Their Graphs",
        focus: "Function notation, domain and range, transformations, composite functions, inverse functions, and graph interpretation.",
        coverage: "Strong",
        tools: [
          ["functions", "function notation, composite functions, inverse functions, and values"],
          ["graph-transformations-curve-sketching", "graph transformations and curve sketching"],
          ["straight-lines", "linear graph foundations"],
          ["dynamic-classroom-displays", "interactive graph transformation demonstrations"]
        ],
        teacherMove: "Start with function notation and mapping, then use graph transformations to connect algebraic changes to visual effects."
      },
      {
        code: "PC.2",
        title: "Polynomial and Rational Functions",
        focus: "Polynomial graphs, roots, factorisation, rational functions, asymptotes, and solving polynomial equations.",
        coverage: "Strong",
        tools: [
          ["roots-of-equations", "roots, factors, and graph links"],
          ["quadratic-equations", "quadratic solving and graph interpretation"],
          ["advanced-factorisation", "polynomial factorisation including grouping and cubics"],
          ["algebraic-fractions", "rational expressions and simplification"]
        ],
        teacherMove: "Build the factor-root connection explicitly before moving into rational expressions and graph behaviour."
      },
      {
        code: "PC.3",
        title: "Exponential and Logarithmic Functions",
        focus: "Exponential models, logarithmic equations, laws of logarithms, growth and decay, and graph behaviour.",
        coverage: "Strong",
        tools: [
          ["logarithms-practice", "logarithmic equations and laws"],
          ["functions", "exponential and logarithmic function notation"],
          ["sequences-series", "geometric sequences and repeated growth"],
          ["powers-of-10", "powers and index-law foundations"]
        ],
        teacherMove: "Link exponential growth to repeated multiplication, then use logarithms as the inverse process."
      },
      {
        code: "PC.4",
        title: "Trigonometric Functions",
        focus: "Radians, unit circle values, trigonometric ratios, exact values, trigonometric graphs, and periodic behaviour.",
        coverage: "Strong",
        tools: [
          ["trigonometric-functions", "exact trig values, identities, and proof-style practice"],
          ["trig-graphs-transformations", "trig graphs and transformations"],
          ["trigonometric-ratios", "right-triangle trigonometry foundations"],
          ["dynamic-classroom-displays", "interactive trig graph and circle demonstrations"]
        ],
        teacherMove: "Use exact values and the unit-circle idea before moving into graph shape, period, amplitude, and transformations."
      },
      {
        code: "PC.5",
        title: "Analytic Trigonometry",
        focus: "Trigonometric identities, equations, transformations, proofs, and simplifying trigonometric expressions.",
        coverage: "Strong",
        tools: [
          ["trigonometric-functions", "identity proofs and exact simplification"],
          ["trig-equation-solver", "solving trigonometric equations"],
          ["trig-graphs-transformations", "graphical support for trig equations"],
          ["inverse-trig-differentiation", "inverse trigonometric notation for extension"]
        ],
        teacherMove: "Keep identity proof steps explicit, then connect equation solutions to the graph and period."
      },
      {
        code: "PC.6",
        title: "Additional Topics in Trigonometry",
        focus: "Sine rule, cosine rule, bearings, vectors, polar coordinates, and trigonometric applications.",
        coverage: "Strong",
        tools: [
          ["trigonometric-ratios", "triangle trigonometry foundations"],
          ["bearings", "bearing diagrams and trigonometric applications"],
          ["further-vectors", "vector notation and geometric applications"],
          ["polar-coordinates", "polar coordinate representation and graph links"]
        ],
        teacherMove: "Use diagrams first, then move into triangle or vector calculation once the geometry is clear."
      },
      {
        code: "PC.7",
        title: "Systems of Equations and Inequalities",
        focus: "Linear and nonlinear systems, simultaneous equations, inequalities, graphing regions, and modelling constraints.",
        coverage: "Strong",
        tools: [
          ["simultaneous-equations", "algebraic solution of systems"],
          ["linear-programming", "inequality regions and feasible-region problems"],
          ["straight-lines", "graphing linear equations and intersections"],
          ["inequalities", "inequality notation and representation"]
        ],
        teacherMove: "Use simultaneous equations for exact solving, then graph regions to support systems of inequalities."
      },
      {
        code: "PC.8",
        title: "Matrices and Determinants",
        focus: "Matrix operations, determinants, inverses, systems, transformations, eigenvalue extension, and matrix applications.",
        coverage: "Strong",
        tools: [
          ["matrices", "matrix operations, determinants, and inverses"],
          ["advanced-matrices", "transformations, eigenvalues, diagonalisation, and extension topics"],
          ["linear-algebra", "linear algebra structures and systems"],
          ["simultaneous-equations", "systems solved by algebraic methods"]
        ],
        teacherMove: "Use basic matrix operations first, then connect determinants and inverses to solving systems."
      },
      {
        code: "PC.9",
        title: "Sequences, Probability and Counting Theory",
        focus: "Arithmetic and geometric sequences, series notation, binomial ideas, permutations, combinations, and probability.",
        coverage: "Strong",
        tools: [
          ["sequences-series", "arithmetic and geometric sequences and series"],
          ["series-expansions", "series extension and notation links"],
          ["permutations-combinations", "counting arrangements and selections"],
          ["tree-diagrams-conditional-probability", "structured probability and compound events"]
        ],
        teacherMove: "Separate sequence formula work from counting methods before using probability questions that combine both ideas."
      },
      {
        code: "PC.10",
        title: "Topics in Analytic Geometry",
        focus: "Conics, circles, parabolas, coordinate geometry, polar form, and relationships between equations and graphs.",
        coverage: "Strong",
        tools: [
          ["equation-of-a-circle", "circle equations, centres, radii, tangents, and intersections"],
          ["straight-lines", "coordinate geometry and gradients"],
          ["polar-coordinates", "polar representation and graph links"],
          ["complex-numbers", "complex-plane and polar-form extension"]
        ],
        teacherMove: "Use coordinate geometry to anchor the algebra, then extend into circle equations, polar form, and complex-plane links."
      },
      {
        code: "PC.11",
        title: "Limits and an Introduction to Calculus",
        focus: "Limits, continuity, first principles, derivative meaning, introductory differentiation, and series links.",
        coverage: "Strong",
        tools: [
          ["limits-first-principles", "limit notation and first-principles reasoning"],
          ["differentiation-polynomials", "introductory polynomial differentiation"],
          ["differentiation-rules", "differentiation rules for extension"],
          ["series-expansions", "Taylor and Maclaurin series as further extension"]
        ],
        teacherMove: "Keep the limit notation precise, then show how the derivative emerges from the first-principles process."
      }
    ]
  },
  {
    id: "holt-mcdougal-geometry",
    seriesId: "holt-mcdougal",
    publisher: "Holt McDougal",
    course: "Geometry",
    label: "Holt McDougal Geometry",
    status: "Pilot",
    basis: "Pilot map based on the public Holt McDougal Geometry chapter sequence. Schools can refine this with their exact edition, ISBN, and local pacing guide.",
    chapters: [
      {
        code: "GEO.1",
        title: "Essentials of Geometry",
        focus: "Points, lines, planes, segments, rays, angles, basic constructions, geometric notation, and measurement language.",
        coverage: "Strong",
        tools: [
          ["concept-explainer", "shape, angle, line, and geometric vocabulary displays"],
          ["classroom-displays", "blank diagrams, grids, and geometry templates for live explanation"],
          ["loci-constructions", "construction and geometric-locus practice"],
          ["missing-angles", "angle notation and basic angle relationships"]
        ],
        teacherMove: "Use the explainer and blank displays for vocabulary first, then generate short angle or construction tasks."
      },
      {
        code: "GEO.2",
        title: "Reasoning and Proof",
        focus: "Conjectures, counterexamples, conditional statements, deductive reasoning, geometric arguments, and proof structure.",
        coverage: "Strong",
        tools: [
          ["formal-geometric-proof", "statement-reason proof, theorem chains, and formal proof structure"],
          ["concept-explainer", "visual prompts for discussing properties and definitions"],
          ["circle-theorems", "structured theorem-based reasoning"],
          ["polygons-angles", "angle-sum arguments and algebraic reasoning"]
        ],
        teacherMove: "Use the formal proof tool to model statement-reason chains, then connect those chains to theorem and angle tools for practice."
      },
      {
        code: "GEO.3",
        title: "Parallel and Perpendicular Lines",
        focus: "Parallel lines, transversals, corresponding angles, alternate angles, perpendicular lines, gradients, and coordinate-line links.",
        coverage: "Strong",
        tools: [
          ["missing-angles", "parallel-line and angle relationship practice"],
          ["straight-lines", "gradient, perpendicular gradients, and coordinate lines"],
          ["loci-constructions", "perpendicular and parallel construction links"],
          ["classroom-displays", "blank angle and line diagrams for board modelling"]
        ],
        teacherMove: "Start with visual angle relationships, then connect parallel and perpendicular ideas to gradients on coordinate axes."
      },
      {
        code: "GEO.4",
        title: "Congruent Triangles",
        focus: "Congruence, rigid transformations, SSS, SAS, ASA, AAS, RHS/HL reasoning, and identifying matching sides and angles.",
        coverage: "Strong",
        tools: [
          ["formal-geometric-proof", "SAS, ASA, similarity, and corresponding-part proof structure"],
          ["transformations", "rigid transformations and congruent-image reasoning"],
          ["concept-explainer", "triangle and quadrilateral property displays"],
          ["missing-angles", "angle facts inside triangle reasoning"]
        ],
        teacherMove: "Use transformations to make congruence visual, then use the formal proof tool to practise matching corresponding vertices and writing justified conclusions."
      },
      {
        code: "GEO.5",
        title: "Relationships Within Triangles",
        focus: "Triangle angle sums, exterior angles, isosceles triangles, triangle inequality, medians, altitudes, perpendicular bisectors, and angle bisectors.",
        coverage: "Strong",
        tools: [
          ["missing-angles", "triangle angle facts and algebraic missing-angle problems"],
          ["polygons-angles", "angle-sum reasoning extended from triangles"],
          ["loci-constructions", "bisectors, perpendicular bisectors, and loci"],
          ["concept-explainer", "triangle properties and labelled diagrams"]
        ],
        teacherMove: "Use triangle angle work for fluency, then move into construction displays for bisectors and special triangle lines."
      },
      {
        code: "GEO.6",
        title: "Similarity",
        focus: "Similar figures, similar triangles, scale factors, proportional sides, enlargement, and area/volume scale links.",
        coverage: "Strong",
        tools: [
          ["scale-drawing-similar-shapes", "scale drawings, similar shapes, similar triangles, and area ratios"],
          ["transformations", "enlargements and scale factors"],
          ["trigonometric-ratios", "similar right triangles leading to trig ratios"],
          ["bar-models", "proportional reasoning support"]
        ],
        teacherMove: "Use enlargement and scale-factor tasks first, then move into similar-triangle applications and proportional reasoning."
      },
      {
        code: "GEO.7",
        title: "Right Triangles and Trigonometry",
        focus: "Pythagoras, special right triangles, sine, cosine, tangent, solving right triangles, elevation, depression, bearings, and vectors.",
        coverage: "Strong",
        tools: [
          ["pythagoras-theorem", "right-triangle side calculations"],
          ["trigonometric-ratios", "sine, cosine, tangent, and solving right triangles"],
          ["bearings", "bearing and trigonometry applications"],
          ["further-vectors", "vector extension and geometric direction"]
        ],
        teacherMove: "Secure Pythagoras first, then use trig ratio questions with clear diagrams before applying to bearings and vectors."
      },
      {
        code: "GEO.8",
        title: "Quadrilaterals",
        focus: "Properties of parallelograms, rectangles, rhombi, squares, trapezia/trapezoids, kites, diagonals, and polygon angle sums.",
        coverage: "Strong",
        tools: [
          ["concept-explainer", "quadrilateral property displays"],
          ["polygons-angles", "interior and exterior angle problems"],
          ["area-rectangles", "area and perimeter links"],
          ["transformations", "symmetry and transformation links"]
        ],
        teacherMove: "Use the explainer for properties and notation, then generate polygon-angle tasks and area connections."
      },
      {
        code: "GEO.9",
        title: "Properties of Transformations",
        focus: "Reflections, translations, rotations, enlargements/dilations, symmetry, compositions, congruence, and coordinate transformations.",
        coverage: "Strong",
        tools: [
          ["transformations", "translation, reflection, rotation, and enlargement practice"],
          ["dynamic-classroom-displays", "animated transformation demonstrations"],
          ["matrices", "matrix transformations for extension"],
          ["graph-transformations-curve-sketching", "graph transformation links"]
        ],
        teacherMove: "Use dynamic displays to show motion first, then generate coordinate transformation questions for practice."
      },
      {
        code: "GEO.10",
        title: "Properties of Circles",
        focus: "Circle vocabulary, chords, tangents, arcs, sectors, angles in circles, cyclic quadrilaterals, and circle theorems.",
        coverage: "Strong",
        tools: [
          ["circle-theorems", "angle theorems, cyclic quadrilaterals, tangents, and chord reasoning"],
          ["circles-area-circumference", "circle vocabulary, circumference, and area"],
          ["sectors-arc-length", "sectors and arc length"],
          ["equation-of-a-circle", "coordinate circle links for extension"]
        ],
        teacherMove: "Use circle vocabulary and theorem diagrams before moving to mixed theorem questions and coordinate-circle extensions."
      },
      {
        code: "GEO.11",
        title: "Measuring Length and Area",
        focus: "Perimeter, circumference, area of polygons, area of triangles, circle area, sectors, compound shapes, and unit links.",
        coverage: "Strong",
        tools: [
          ["area-rectangles", "area and perimeter of rectangles"],
          ["area-triangles", "triangle area and related calculations"],
          ["circles-area-circumference", "circle area and circumference"],
          ["sectors-arc-length", "sector area and arc length"]
        ],
        teacherMove: "Use focused area tools first, then move into compound and circular measurements when students are secure."
      },
      {
        code: "GEO.12",
        title: "Surface Area and Volume of Solids",
        focus: "Prisms, cylinders, cones, pyramids, spheres, surface area, volume, nets, and three-dimensional measurement.",
        coverage: "Strong",
        tools: [
          ["volume-surface-area-prisms", "volume and surface area of prisms"],
          ["cylinders-cones-volume-surface-area", "cylinders and cones"],
          ["pyramids-spheres-volume-surface-area", "pyramids and spheres"],
          ["concept-explainer", "solids, faces, edges, vertices, and labelled diagrams"]
        ],
        teacherMove: "Begin with prisms and nets, then extend to curved solids and mixed surface-area or volume tasks."
      }
    ]
  },
  {
    id: "holt-mcdougal-algebra-trigonometry",
    seriesId: "holt-mcdougal",
    publisher: "Holt McDougal / Larson",
    course: "Algebra and Trigonometry",
    label: "Holt McDougal / Larson Algebra and Trigonometry",
    status: "Pilot",
    basis: "Pilot map based on the public Larson Algebra and Trigonometry chapter structure. Schools can refine this with their exact edition, ISBN, and local pacing guide.",
    chapters: [
      {
        code: "AT.P",
        title: "Prerequisites",
        focus: "Real numbers, exponents, radicals, algebraic expressions, factoring, rational expressions, and coordinate-plane foundations.",
        coverage: "Strong",
        tools: [
          ["powers-of-10", "powers, exponent foundations, and standard form"],
          ["surds-radicals", "radicals, surds, and simplification"],
          ["advanced-factorisation", "factorisation including HCF, grouping, and difference of squares"],
          ["algebraic-fractions", "rational expressions and algebraic fractions"]
        ],
        teacherMove: "Use this as a readiness route before functions, especially when students need repair in algebraic manipulation."
      },
      {
        code: "AT.1",
        title: "Equations, Inequalities and Mathematical Models",
        focus: "Linear equations, quadratic equations, inequalities, absolute value, formula rearrangement, and modelling contexts.",
        coverage: "Strong",
        tools: [
          ["linear-equations", "linear equation fluency and multi-step solving"],
          ["quadratic-equations", "quadratic solving by factorising, formula, and graph links"],
          ["inequalities", "solving and representing inequalities"],
          ["transposition-formulae", "rearranging formulae and modelling relationships"]
        ],
        teacherMove: "Keep solving methods separate at first, then use mixed equation and modelling questions once fluency is secure."
      },
      {
        code: "AT.2",
        title: "Functions and Their Graphs",
        focus: "Function notation, domain and range, transformations, inverse functions, graph interpretation, and modelling with functions.",
        coverage: "Strong",
        tools: [
          ["functions", "function notation, mappings, inverse functions, and values"],
          ["graph-transformations-curve-sketching", "graph transformations and curve sketching"],
          ["straight-lines", "linear graphs, gradients, and coordinate foundations"],
          ["dynamic-classroom-displays", "interactive graph transformation demonstrations"]
        ],
        teacherMove: "Use function notation and substitution first, then make graph transformations visual through the dynamic display tools."
      },
      {
        code: "AT.3",
        title: "Polynomial Functions",
        focus: "Polynomial graphs, zeros, factors, roots, end behaviour, division ideas, and solving polynomial equations.",
        coverage: "Strong",
        tools: [
          ["roots-of-equations", "roots, factors, and graph links"],
          ["advanced-factorisation", "complete factorisation including cubics and grouping"],
          ["quadratic-factorisation", "quadratic factorisation as a foundation"],
          ["graph-transformations-curve-sketching", "curve sketching and graph behaviour"]
        ],
        teacherMove: "Build the factor-root connection explicitly, then use graphing to discuss turning points, intercepts, and behaviour."
      },
      {
        code: "AT.4",
        title: "Rational Functions and Conics",
        focus: "Rational expressions, asymptotes, reciprocal behaviour, conic sections, circle equations, and coordinate geometry.",
        coverage: "Strong",
        tools: [
          ["algebraic-fractions", "simplifying and solving with rational expressions"],
          ["partial-fractions", "decomposing rational expressions for extension"],
          ["equation-of-a-circle", "circle equations, centres, radii, tangents, and intersections"],
          ["graph-transformations-curve-sketching", "reciprocal and rational graph behaviour"]
        ],
        teacherMove: "Use algebraic fractions to secure manipulation, then connect rational functions and conics through graph behaviour."
      },
      {
        code: "AT.5",
        title: "Exponential and Logarithmic Functions",
        focus: "Exponential functions, logarithmic functions, laws of logarithms, equations, growth, decay, and modelling.",
        coverage: "Strong",
        tools: [
          ["logarithms-practice", "logarithmic equations, laws, and evaluated solutions"],
          ["functions", "exponential and logarithmic function notation"],
          ["sequences-series", "geometric growth and repeated multiplication"],
          ["powers-of-10", "powers and index-law foundations"]
        ],
        teacherMove: "Connect exponentials to repeated growth first, then use logarithms as the inverse operation and solving tool."
      },
      {
        code: "AT.6",
        title: "Trigonometric Functions",
        focus: "Angles, radians, unit circle values, exact trigonometric values, periodic functions, and right-triangle links.",
        coverage: "Strong",
        tools: [
          ["trigonometric-functions", "exact values, identities, and proof-style practice"],
          ["trigonometric-ratios", "right-triangle sine, cosine, and tangent"],
          ["trig-graphs-transformations", "trigonometric graphs and transformations"],
          ["dynamic-classroom-displays", "interactive unit-circle and trig graph demonstrations"]
        ],
        teacherMove: "Use exact values and unit-circle reasoning before moving into graphs, period, amplitude, and transformations."
      },
      {
        code: "AT.7",
        title: "Analytic Trigonometry",
        focus: "Trigonometric identities, simplifying trigonometric expressions, proving identities, inverse trigonometric functions, and trig equations.",
        coverage: "Strong",
        tools: [
          ["trigonometric-functions", "identity proof and exact trigonometric manipulation"],
          ["trig-equation-solver", "solving trigonometric equations"],
          ["trig-graphs-transformations", "graphical support for equation solutions"],
          ["inverse-trig-differentiation", "inverse trigonometric notation for extension"]
        ],
        teacherMove: "Make the identity transformations explicit, then connect equation solutions to the graph and the period."
      },
      {
        code: "AT.8",
        title: "Additional Topics in Trigonometry",
        focus: "Sine rule, cosine rule, bearings, vectors, polar coordinates, complex numbers in polar form, and trigonometric applications.",
        coverage: "Strong",
        tools: [
          ["trigonometric-ratios", "triangle trigonometry foundations"],
          ["bearings", "bearing diagrams and trigonometric applications"],
          ["polar-coordinates", "polar coordinates and graph links"],
          ["complex-numbers", "complex numbers and polar form extension"]
        ],
        teacherMove: "Use diagrams and geometric interpretation first, then move into polar and complex-number representations as extension."
      },
      {
        code: "AT.9",
        title: "Systems of Equations and Inequalities",
        focus: "Linear systems, nonlinear systems, systems of inequalities, graphical solutions, applications, and feasible regions.",
        coverage: "Strong",
        tools: [
          ["simultaneous-equations", "algebraic solution of systems"],
          ["simultaneous-applications", "contextual simultaneous-equation problems"],
          ["linear-programming", "systems of inequalities and feasible regions"],
          ["straight-lines", "graphical interpretation of intersections"]
        ],
        teacherMove: "Use algebraic solving to establish precision, then use graphs to show intersections, regions, and constraints."
      },
      {
        code: "AT.10",
        title: "Matrices and Determinants",
        focus: "Matrix operations, determinants, inverses, systems of equations, transformations, and matrix applications.",
        coverage: "Strong",
        tools: [
          ["matrices", "matrix operations, determinants, inverses, and algebraic entries"],
          ["advanced-matrices", "matrix transformations, eigenvalues, and extension topics"],
          ["linear-algebra", "linear algebra structures and systems"],
          ["simultaneous-equations", "systems connected to matrix methods"]
        ],
        teacherMove: "Start with matrix arithmetic and determinants, then connect inverses and systems when the operations are secure."
      },
      {
        code: "AT.11",
        title: "Sequences, Series and Probability",
        focus: "Arithmetic sequences, geometric sequences, series, sigma notation, binomial expansion, permutations, combinations, and probability.",
        coverage: "Strong",
        tools: [
          ["sequences-series", "arithmetic and geometric sequences and series"],
          ["series-expansions", "series notation and expansion extension"],
          ["binomial-expansion", "binomial coefficients and expansion practice"],
          ["permutations-combinations", "counting arrangements and selections"]
        ],
        teacherMove: "Separate sequence and series formulae from counting methods before building mixed probability or expansion questions."
      },
      {
        code: "AT.12",
        title: "Statistics and Data Analysis",
        focus: "Data summaries, correlation, regression, distributions, sampling, inference ideas, and statistical modelling.",
        coverage: "Strong",
        tools: [
          ["averages-range", "mean, median, mode, range, and choosing averages"],
          ["correlation-regression", "scatter diagrams, correlation, and regression lines"],
          ["sampling-methods-bias", "sampling methods and bias"],
          ["hypothesis-testing", "introductory inference and hypothesis testing extension"]
        ],
        teacherMove: "Use data summaries and regression first, then add sampling and inference tools where the course goes deeper."
      }
    ]
  },
  {
    id: "holt-mcdougal-calculus",
    seriesId: "holt-mcdougal",
    publisher: "Holt McDougal / Larson",
    course: "Calculus",
    label: "Holt McDougal / Larson Calculus",
    status: "Pilot",
    basis: "Pilot map based on the public Larson Calculus for AP chapter sequence. Schools can refine this with their exact edition, ISBN, AP route, or local pacing guide.",
    chapters: [
      {
        code: "CALC.P",
        title: "Preparation for Calculus",
        focus: "Functions, graphs, algebraic manipulation, trigonometric functions, logarithms, coordinate geometry, and precalculus readiness.",
        coverage: "Strong",
        tools: [
          ["functions", "function notation, values, composites, and inverses"],
          ["graph-transformations-curve-sketching", "graph transformations and curve sketching"],
          ["trigonometric-functions", "exact trig values and identities"],
          ["logarithms-practice", "logarithmic equations and laws"]
        ],
        teacherMove: "Use this as a readiness check before limits, especially where students need fluency with functions, graphs, trig, and logarithms."
      },
      {
        code: "CALC.1",
        title: "Limits and Their Properties",
        focus: "Limit notation, evaluating limits, one-sided limits, continuity, asymptotic behaviour, and first-principles reasoning.",
        coverage: "Strong",
        tools: [
          ["limits-first-principles", "limit notation, evaluating limits, and first-principles reasoning"],
          ["functions", "function notation and values around a point"],
          ["graph-transformations-curve-sketching", "graphical behaviour near key points"],
          ["dynamic-classroom-displays", "interactive graph demonstrations for limit behaviour"]
        ],
        teacherMove: "Keep notation precise, then use graph behaviour to support the difference between value, approach, and continuity."
      },
      {
        code: "CALC.2",
        title: "Differentiation",
        focus: "Derivative notation, first principles, polynomial differentiation, product, quotient, chain rule, trigonometric derivatives, and implicit differentiation.",
        coverage: "Strong",
        tools: [
          ["differentiation-polynomials", "introductory polynomial differentiation"],
          ["differentiation-rules", "product, quotient, and chain rule practice"],
          ["trig-differentiation-rules", "trigonometric differentiation"],
          ["advanced-differentiation", "implicit and parametric differentiation, tangents, normals, and related rates"]
        ],
        teacherMove: "Begin with the derivative as a limit, then move through rule-based fluency while keeping notation and substitutions explicit."
      },
      {
        code: "CALC.3",
        title: "Applications of Differentiation",
        focus: "Tangents, normals, gradients, increasing and decreasing functions, stationary points, optimisation, related rates, and curve interpretation.",
        coverage: "Strong",
        tools: [
          ["advanced-differentiation", "tangents, normals, related rates, and implicit applications"],
          ["differentiation-rules", "rule-based differentiation for application problems"],
          ["graph-transformations-curve-sketching", "curve behaviour and graphical interpretation"],
          ["roots-of-equations", "solving equations connected to stationary points and intersections"]
        ],
        teacherMove: "Use derivative calculations first, then connect the sign and value of the derivative to graph behaviour and context."
      },
      {
        code: "CALC.4",
        title: "Integration",
        focus: "Antiderivatives, indefinite integrals, definite integrals, area under curves, integration notation, and fundamental theorem links.",
        coverage: "Strong",
        tools: [
          ["integration", "basic integration and definite integrals"],
          ["advanced-integration", "integration by substitution and integration by parts"],
          ["integration-algebraic-fractions", "integrating algebraic fractions"],
          ["graph-transformations-curve-sketching", "graphical interpretation of area and accumulation"]
        ],
        teacherMove: "Make the reverse-differentiation link explicit, then show how definite integrals connect to area and accumulation."
      },
      {
        code: "CALC.5",
        title: "Differential Equations",
        focus: "Separable differential equations, first-order linear differential equations, modelling, initial conditions, and solution interpretation.",
        coverage: "Strong",
        tools: [
          ["differential-equations", "separable, first-order linear, second-order, and modelling problems"],
          ["advanced-integration", "integration methods used in solving differential equations"],
          ["integration", "core antiderivative fluency"],
          ["equations-of-motion", "mechanics contexts where rates of change are interpreted"]
        ],
        teacherMove: "Show the separation or integrating-factor setup carefully, then substitute initial conditions only after the general solution is clear."
      },
      {
        code: "CALC.6",
        title: "Applications of Integration",
        focus: "Area between curves, volume, volume of revolution, accumulation, average value, and contextual integral applications.",
        coverage: "Strong",
        tools: [
          ["volumes-of-revolution", "volumes of revolution using integration"],
          ["integration", "definite integrals and area under curves"],
          ["advanced-integration", "integration methods for applied integrals"],
          ["continuous-random-variables", "integration as accumulation in probability contexts"]
        ],
        teacherMove: "Start with what the integral represents in the diagram or context, then choose the correct bounds and method."
      },
      {
        code: "CALC.7",
        title: "Integration Techniques, L'Hopital's Rule and Improper Integrals",
        focus: "Substitution, integration by parts, partial fractions, algebraic fractions, improper integrals, and L'Hopital-style limit reasoning.",
        coverage: "Partial",
        tools: [
          ["advanced-integration", "substitution and integration by parts"],
          ["partial-fractions", "partial fraction decomposition before integration"],
          ["integration-algebraic-fractions", "integrating rational algebraic expressions"],
          ["limits-first-principles", "limit notation and limit reasoning for extension"]
        ],
        teacherMove: "Use the available tools for substitution, parts, and partial fractions; add teacher-led work for L'Hopital's Rule and improper-integral convergence."
      },
      {
        code: "CALC.8",
        title: "Infinite Series",
        focus: "Sequences, series, convergence ideas, power series, Taylor series, Maclaurin series, and binomial expansion links.",
        coverage: "Strong",
        tools: [
          ["series-expansions", "Taylor and Maclaurin series"],
          ["sequences-series", "arithmetic and geometric sequences and series"],
          ["binomial-expansion", "binomial coefficients and expansion links"],
          ["proof-by-induction", "proof structure for sequence and series identities"]
        ],
        teacherMove: "Use familiar sequence and binomial structures first, then build into Taylor and Maclaurin expansions with every substitution shown."
      },
      {
        code: "CALC.9",
        title: "Parametric Equations, Polar Coordinates and Vectors",
        focus: "Parametric curves, polar coordinates, polar graphs, vectors, vector motion, and geometric interpretation of changing coordinates.",
        coverage: "Partial",
        tools: [
          ["polar-coordinates", "polar coordinate representation and graphs"],
          ["further-vectors", "column vectors, vector geometry, and applications"],
          ["advanced-differentiation", "parametric differentiation"],
          ["complex-numbers", "complex-plane and polar-form links"]
        ],
        teacherMove: "Use polar and vector tools for representation, then supplement with teacher-led parametric curve sketching and vector-valued function applications."
      },
      {
        code: "CALC.A",
        title: "Appendices: Proofs, Integration Tables, Precalculus and Algebra Review",
        focus: "Selected proofs, integration tables, algebra review, precalculus review, complex numbers, and additional modelling applications.",
        coverage: "Strong",
        tools: [
          ["proof-by-induction", "formal proof structure and proof language"],
          ["integration", "core integration review"],
          ["functions", "precalculus function review"],
          ["complex-numbers", "complex-number extension and polar form"]
        ],
        teacherMove: "Use this as a support bank when students need prerequisite repair or when a lesson depends on proof or algebraic recall."
      }
    ]
  }
];

const textbookAlignmentSeries = [
  {
    id: "holt-mcdougal",
    publisher: "Holt McDougal",
    title: "Holt McDougal Mathematics",
    description: "Middle-school and high-school textbook alignments can be selected here. Grade 6, Grade 7, Pre-Algebra, Algebra 1, Geometry, Algebra & Trigonometry, Precalculus, and Calculus are mapped now; later courses can be added using the same structure.",
    levels: [
      { id: "holt-mcdougal-g6", label: "Grade 6 / Course 1", status: "Pilot" },
      { id: "holt-mcdougal-g7", label: "Grade 7 / Course 2", status: "Pilot" },
      { id: "holt-mcdougal-g8", label: "Grade 8 / Course 3", status: "Planned" },
      { id: "holt-mcdougal-pre-algebra", label: "Pre-Algebra", status: "Pilot" },
      { id: "holt-mcdougal-algebra-1", label: "Algebra 1", status: "Pilot" },
      { id: "holt-mcdougal-geometry", label: "Geometry", status: "Pilot" },
      { id: "holt-mcdougal-algebra-2", label: "Algebra 2", status: "Planned" },
      { id: "holt-mcdougal-algebra-trigonometry", label: "Algebra & Trigonometry", status: "Pilot" },
      { id: "holt-mcdougal-precalculus", label: "Precalculus", status: "Pilot" },
      { id: "holt-mcdougal-calculus", label: "Calculus", status: "Pilot" },
      { id: "holt-mcdougal-advanced", label: "Advanced Mathematics", status: "Planned" }
    ]
  }
];

const curriculumAlignmentFrameworks = [
  {
    id: "common-core",
    label: "Common Core",
    country: "United States",
    status: "Mapped",
    title: "Common Core State Standards for Mathematics",
    description: "A grade-by-grade map from Common Core Mathematics domains and high-school conceptual categories to Kaizen Maths teaching tools, classroom displays, worked examples, and worksheet generators.",
    basis: "Pilot alignment based on the Common Core grade domains for K-8 and the high-school conceptual categories: Number and Quantity, Algebra, Functions, Geometry, Statistics and Probability, and Modeling.",
    standards: [
      {
        code: "K.CC / K.OA / K.NBT / K.MD / K.G",
        title: "Kindergarten: Counting, Operations, Measurement and Geometry",
        focus: "Counting objects, comparing quantities, simple addition and subtraction situations, base-ten foundations, describing measurable attributes, and naming shapes.",
        coverage: "Partial",
        tools: [
          ["elementary-manipulatives", "use counters, ten frames, base-ten blocks, clock faces, and fraction bars for early number sense"],
          ["anchor-charts", "project bright concept summaries for number bonds, shapes, time, money, and operation language"],
          ["elementary-starter-board", "run short teacher-led retrieval prompts"],
          ["classroom-displays", "show blank shapes, grids, and simple visual templates for live explanation"]
        ],
        teacherMove: "Use these as display and discussion tools rather than independent worksheets; the emphasis is oral reasoning, counting, comparing, and teacher modelling."
      },
      {
        code: "1.OA / 1.NBT / 1.MD / 1.G",
        title: "Grade 1: Addition, Subtraction, Place Value, Measurement and Shapes",
        focus: "Representing and solving addition/subtraction problems, understanding tens and ones, measuring lengths, telling time, and composing or partitioning shapes.",
        coverage: "Partial",
        tools: [
          ["elementary-manipulatives", "model place value, number bonds, and early addition/subtraction"],
          ["bar-models", "represent comparison and part-whole situations visually"],
          ["anchor-charts", "support operation language, shape properties, and early measurement"],
          ["elementary-maths-playground", "use colourful short tasks for whole-class number fluency"]
        ],
        teacherMove: "Start with concrete or visual representations, then connect the picture to the number sentence."
      },
      {
        code: "2.OA / 2.NBT / 2.MD / 2.G",
        title: "Grade 2: Base Ten, Fluency, Measurement, Arrays and Data",
        focus: "Adding and subtracting within 1000, skip counting, equal groups and arrays, length and money contexts, and simple picture or bar-graph interpretation.",
        coverage: "Partial",
        tools: [
          ["elementary-manipulatives", "represent base-ten structure and regrouping"],
          ["area-models", "introduce arrays as equal rows and columns"],
          ["bar-models", "model one-step and two-step word problems"],
          ["anchor-charts", "project vocabulary and structure for operations, time, money, arrays, and measurement"]
        ],
        teacherMove: "Make the structure visible: tens and ones for calculation, equal groups for multiplication readiness, and labelled bars for word problems."
      },
      {
        code: "3.OA / 3.NBT / 3.NF / 3.MD / 3.G",
        title: "Grade 3: Multiplication, Division, Fractions, Area and Data",
        focus: "Multiplication/division facts, properties of operations, fractions as parts of a whole, area and perimeter, and interpreting simple data displays.",
        coverage: "Partial",
        tools: [
          ["area-models", "model multiplication with arrays and partitioned rectangles"],
          ["fractions-practice", "generate fraction comparison and arithmetic readiness practice"],
          ["bar-models", "use fraction and comparison models before formal calculation"],
          ["area-rectangles", "connect multiplication to area and perimeter"]
        ],
        teacherMove: "Use arrays and bar models first, then move towards symbolic equations once the representation is secure."
      },
      {
        code: "4.OA / 4.NBT / 4.NF / 4.MD / 4.G",
        title: "Grade 4: Multi-Digit Operations, Fractions, Decimals and Angles",
        focus: "Factors and multiples, multi-digit calculation, fraction equivalence and operations, decimal notation, measurement conversion, angles, lines, and symmetry.",
        coverage: "Strong",
        tools: [
          ["four-operations", "build calculation fluency across the four operations"],
          ["fractions-practice", "practice equivalent fractions, mixed numbers, and fraction operations"],
          ["decimals-practice-lab", "support decimal place value and operations"],
          ["missing-angles", "introduce line and angle reasoning"],
          ["area-models", "use rectangular models for multiplication and fractions"]
        ],
        teacherMove: "Keep calculation steps explicit, especially regrouping, equivalent fractions, and why decimal points remain fixed in place-value shifts."
      },
      {
        code: "5.OA / 5.NBT / 5.NF / 5.MD / 5.G",
        title: "Grade 5: Expressions, Decimals, Fraction Operations, Volume and Coordinates",
        focus: "Writing and interpreting expressions, decimal operations, multiplying and dividing fractions, volume, unit conversion, coordinate-plane work, and classifying shapes.",
        coverage: "Strong",
        tools: [
          ["decimals-practice-lab", "generate decimal arithmetic and place-value practice"],
          ["fractions-practice", "develop fraction multiplication, division, and mixed-number fluency"],
          ["volume-surface-area-prisms", "connect volume to layers and rectangular prisms"],
          ["straight-lines", "support coordinate-plane plotting and gradient readiness"],
          ["classroom-displays", "project coordinate grids, nets, solids, and blank diagrams"]
        ],
        teacherMove: "Use the worksheet builder for practice sets, but keep classroom modelling visual when moving between fractions, decimals, and volume."
      },
      {
        code: "6.RP / 6.NS / 6.EE / 6.G / 6.SP",
        title: "Grade 6: Ratios, The Number System, Expressions, Geometry and Statistics",
        focus: "Ratios and unit rates, rational-number operations, expressions and one-variable equations, area/surface area/volume, and statistical variability.",
        coverage: "Strong",
        tools: [
          ["ratio-proportion", "generate ratio, rate, and proportion practice"],
          ["integer-operations", "build rational-number and directed-number fluency"],
          ["linear-equations", "solve one-step and multi-step equations"],
          ["area-rectangles", "support area, perimeter, and composite-shape readiness"],
          ["averages-range", "practice measures of centre and spread"]
        ],
        teacherMove: "Move from visual models and contexts into equations, especially for ratios, negative numbers, and statistical summaries."
      },
      {
        code: "7.RP / 7.NS / 7.EE / 7.G / 7.SP",
        title: "Grade 7: Proportional Relationships, Rational Numbers, Geometry and Probability",
        focus: "Proportional relationships, operations with rational numbers, linear expressions and equations, scale drawings, angle facts, area/volume, sampling, and probability.",
        coverage: "Strong",
        tools: [
          ["ratio-proportion", "build proportional reasoning and unit-rate practice"],
          ["percentages-real-world", "connect percent problems to real contexts"],
          ["integer-operations", "secure rational-number operations"],
          ["linear-equations", "solve equations arising from contexts"],
          ["scale-drawing-similar-shapes", "support scale drawings and similar shapes"],
          ["tree-diagrams-conditional-probability", "develop probability structures from diagrams"]
        ],
        teacherMove: "Use proportional reasoning across number, geometry, and probability rather than treating it as one isolated topic."
      },
      {
        code: "8.NS / 8.EE / 8.F / 8.G / 8.SP",
        title: "Grade 8: Expressions, Equations, Functions, Transformations and Bivariate Data",
        focus: "Integer exponents, irrational numbers, linear equations, functions, transformations, congruence, similarity, Pythagoras, and scatter-plot association.",
        coverage: "Strong",
        tools: [
          ["exponents-index-notation", "practice exponent laws and standard form readiness"],
          ["surds-radicals", "introduce radicals and irrational-number simplification"],
          ["straight-lines", "generate linear graph and gradient practice"],
          ["functions", "develop function notation and input-output reasoning"],
          ["transformations", "show coordinate transformations"],
          ["pythagoras-theorem", "build right-triangle reasoning"],
          ["correlation-regression", "support bivariate data and trend-line interpretation"]
        ],
        teacherMove: "Connect equations, graphs, tables, and transformations so students see functions as multiple linked representations."
      },
      {
        code: "HSN",
        title: "High School: Number and Quantity",
        focus: "The real number system, quantities, vectors, matrices where used, and complex-number extension for advanced pathways.",
        coverage: "Strong",
        tools: [
          ["surds-radicals", "simplify radicals and rationalise denominators"],
          ["complex-numbers", "support complex-number extension routes"],
          ["free-vectors", "use column vectors and geometric vector operations"],
          ["matrices", "introduce matrix operations where they support transformations or systems"]
        ],
        teacherMove: "Keep representation clean: radicals as exact values, vectors as column vectors, and matrices in correct rectangular form."
      },
      {
        code: "HSA",
        title: "High School: Algebra",
        focus: "Seeing structure in expressions, arithmetic with polynomials and rational expressions, equations, inequalities, systems, quadratics, and modelling with algebra.",
        coverage: "Strong",
        tools: [
          ["simplification", "simplify and collect algebraic terms"],
          ["linear-equations", "solve linear equations with clear inverse-operation steps"],
          ["simultaneous-equations", "solve systems algebraically"],
          ["quadratic-equations", "solve quadratics by factorising, completing the square, and formula methods"],
          ["advanced-factorisation", "develop grouping, difference of squares, cubics, and harder factorisation"],
          ["algebraic-fractions", "simplify and solve with rational expressions"]
        ],
        teacherMove: "Use graduated practice to show structure first, then move towards more efficient methods once the structure is visible."
      },
      {
        code: "HSF",
        title: "High School: Functions",
        focus: "Interpreting functions, building functions, linear, quadratic, exponential, logarithmic, trigonometric, and transformed functions.",
        coverage: "Strong",
        tools: [
          ["functions", "practice function notation, composition, and inverse functions"],
          ["graph-transformations-curve-sketching", "connect algebraic transformations to graph behaviour"],
          ["trig-graphs-transformations", "model transformed sine, cosine, and tangent graphs"],
          ["logarithms-practice", "solve exponential and logarithmic equations"],
          ["sequences-series", "link recursive and explicit sequence structures"]
        ],
        teacherMove: "Use the dynamic classroom displays to show what changes in the equation do to the graph before formal practice."
      },
      {
        code: "HSG",
        title: "High School: Geometry",
        focus: "Congruence, similarity, transformations, right-triangle trigonometry, circles, coordinate geometry, geometric measurement, and proof.",
        coverage: "Strong",
        tools: [
          ["formal-geometric-proof", "build statement-reason proof chains"],
          ["circle-theorems", "develop circle angle and tangent reasoning"],
          ["equation-of-a-circle", "connect coordinate geometry with circle equations"],
          ["transformations", "practice translations, reflections, rotations, enlargements, and descriptions"],
          ["trigonometric-ratios", "solve right-triangle problems"],
          ["sine-cosine-rule", "extend trigonometry to non-right triangles"]
        ],
        teacherMove: "Use diagrams for reasoning, then require students to name the theorem, state the relationship, and calculate from it."
      },
      {
        code: "HSS",
        title: "High School: Statistics and Probability",
        focus: "Interpreting categorical and quantitative data, probability, conditional probability, distributions, inference, correlation, and regression.",
        coverage: "Strong",
        tools: [
          ["histograms", "interpret frequency density and grouped data"],
          ["cumulative-frequency-curves", "work with ogives, percentiles, quartiles, and medians"],
          ["venn-diagrams", "connect set notation, regions, and probability"],
          ["normal-distribution", "standardise and use normal probabilities"],
          ["hypothesis-testing", "develop inference decisions with clear wording"],
          ["correlation-regression", "analyse bivariate data, correlation, regression, interpolation, and extrapolation"]
        ],
        teacherMove: "Ask students to justify what the statistic or probability represents in context, not only calculate it."
      },
      {
        code: "Modeling",
        title: "High School: Mathematical Modeling",
        focus: "Using mathematics to represent real situations, make assumptions, compare models, interpret outputs, and communicate conclusions.",
        coverage: "Strong",
        tools: [
          ["financial-real-life-maths", "model money, best buys, interest, depreciation, wages, and exchange rates"],
          ["linear-programming", "optimise contextual problems with constraints"],
          ["graph-transformations-curve-sketching", "interpret graphical models and behaviour"],
          ["normal-distribution", "model continuous variation"],
          ["correlation-regression", "build, use, and critique linear regression models"]
        ],
        teacherMove: "Emphasise assumptions, units, constraints, and whether the answer makes sense in the real situation."
      }
    ]
  },
  {
    id: "uk-ks2-mathematics",
    label: "UK KS2",
    country: "United Kingdom",
    status: "Mapped",
    title: "UK Key Stage 2 Mathematics Curriculum Alignment",
    description: "A Key Stage 2 map from the National Curriculum mathematics programme of study to Kaizen Maths teaching tools, classroom displays, worked examples, worksheet generators, visual models, and SATs preparation.",
    basis: "Pilot alignment based on the National Curriculum in England mathematics programme of study for Key Stage 2, covering Years 3 to 6 across number and place value, calculation, fractions and decimals, measurement, geometry, statistics, and the Year 6 introduction to ratio, proportion and algebra.",
    standards: [
      {
        code: "KS2 Fluency",
        title: "Mathematical Fluency, Reasoning and Problem Solving",
        focus: "Developing secure recall, written methods, mental strategies, visual representations, reasoning, multi-step problem solving, checking answers, and explaining methods clearly.",
        coverage: "Strong",
        tools: [
          ["elementary-starter-board", "run short whole-class retrieval starters"],
          ["elementary-manipulatives", "model number sense with counters, ten frames, base-ten blocks, clocks and fraction bars"],
          ["anchor-charts", "project bright concept summaries for pupils"],
          ["bar-models", "represent comparison, part-whole, fraction, percentage and ratio structures"],
          ["area-models", "use arrays and area models for multiplication and partitioning"],
          ["classroom-displays", "project blank grids, shapes, tables and number templates"]
        ],
        teacherMove: "Use visual models before formal methods, then ask pupils to explain the calculation, the representation and why the answer is reasonable."
      },
      {
        code: "Years 3-4 Number",
        title: "Lower KS2: Number, Place Value and Calculation",
        focus: "Counting, place value, comparing and ordering numbers, rounding, addition and subtraction, multiplication tables, written multiplication and division, estimating, checking and solving number problems.",
        coverage: "Strong",
        tools: [
          ["four-operations", "build addition, subtraction, multiplication and division fluency"],
          ["order-of-operations", "introduce operation order and bracket structure where appropriate"],
          ["integer-operations", "support early directed-number extension for stronger groups"],
          ["decimals-practice-lab", "develop place value and decimal readiness"],
          ["elementary-manipulatives", "model place value and regrouping visually"],
          ["elementary-maths-playground", "use colourful number tasks for younger pupils"]
        ],
        teacherMove: "Keep place value visible. Pupils should see what is regrouped, exchanged or partitioned before the written method becomes compact."
      },
      {
        code: "Years 3-4 Fractions",
        title: "Lower KS2: Fractions and Decimal Readiness",
        focus: "Recognising, finding, naming and writing fractions, equivalent fractions, comparing simple fractions, adding and subtracting fractions with the same denominator, tenths, hundredths and early decimal connections.",
        coverage: "Strong",
        tools: [
          ["fractions-practice", "generate equivalent fraction and same-denominator practice"],
          ["bar-models", "show fractions as parts of a whole and parts of a quantity"],
          ["area-models", "use rectangular models to support fractional parts"],
          ["fractions-table", "use starter tables for quick fraction-decimal-percentage readiness"],
          ["elementary-manipulatives", "model fractions with bars and visual partitions"]
        ],
        teacherMove: "Start with the whole, then partition it. Pupils should know what the denominator counts and what the numerator selects."
      },
      {
        code: "Years 5-6 Number",
        title: "Upper KS2: Number, Calculation, Fractions, Decimals and Percentages",
        focus: "Large numbers, negative numbers in context, formal written methods, factors, multiples, primes, common factors, common multiples, fraction operations, decimals, percentages, rounding and problem solving.",
        coverage: "Strong",
        tools: [
          ["four-operations", "secure efficient written calculation methods"],
          ["hcf-lcm", "practise factors, multiples, primes, HCF and LCM"],
          ["fractions-practice", "extend to mixed numbers, unlike denominators and multi-step fraction calculations"],
          ["decimals-practice-lab", "generate decimal operation and place-value practice"],
          ["simple-percentage-tasks", "connect percentages with fractions, decimals, quantities and change"],
          ["bar-models", "model fraction and percentage questions visually before calculation"]
        ],
        teacherMove: "Move between fractions, decimals and percentages often so pupils recognise equivalent representations rather than isolated procedures."
      },
      {
        code: "KS2 Measurement",
        title: "Measurement",
        focus: "Length, mass, capacity, time, money, metric conversions, perimeter, area, volume, estimating measures, reading scales, formula use and solving practical measurement problems.",
        coverage: "Strong",
        tools: [
          ["conversions-teaching", "practise metric units, time and compound measure readiness"],
          ["area-rectangles", "support area, perimeter and composite rectangle problems"],
          ["area-triangles", "introduce triangle area extension where appropriate"],
          ["volume-surface-area-prisms", "connect volume to layers, cubes and rectangular prisms"],
          ["financial-real-life-maths", "apply money, discounts and everyday arithmetic contexts"],
          ["classroom-displays", "project blank measurement diagrams and grids for modelling"]
        ],
        teacherMove: "Make the unit part of every line of working. Pupils should state what is being measured before choosing a formula or conversion."
      },
      {
        code: "KS2 Geometry",
        title: "Geometry: Properties of Shapes, Position and Direction",
        focus: "2D and 3D shape properties, angles, right angles, parallel and perpendicular lines, symmetry, coordinates, translation, reflection, position, direction and simple scale reasoning.",
        coverage: "Strong",
        tools: [
          ["concept-explainer", "show shape properties, sides, vertices, faces, edges and notation one feature at a time"],
          ["anchor-charts", "support geometry vocabulary and shape-property recall"],
          ["missing-angles", "develop basic angle facts and reasoning"],
          ["polygons-angles", "extend into polygon angle patterns for stronger groups"],
          ["transformations", "generate translation and reflection practice"],
          ["straight-lines", "support coordinate grids and plotting readiness"],
          ["scale-drawing-similar-shapes", "connect scale drawings and similar-shape reasoning for upper KS2 extension"]
        ],
        teacherMove: "Use accurate diagrams and ask pupils to describe the property before calculating or naming the shape."
      },
      {
        code: "KS2 Statistics",
        title: "Statistics",
        focus: "Interpreting and presenting data using tables, pictograms, bar charts, line graphs, timetables, two-way tables, pie-chart readiness, averages and solving comparison problems from data.",
        coverage: "Strong",
        tools: [
          ["averages-range", "generate mean, median, mode and range practice for upper KS2 readiness"],
          ["histograms", "use selectively for grouped-data extension and transition work"],
          ["fractions-table", "use starter tables for quick comparison and conversion tasks"],
          ["classroom-displays", "project blank tables and display templates"],
          ["elementary-starter-board", "run short data interpretation starters"]
        ],
        teacherMove: "Ask pupils what the data shows before calculating. The key habit is reading the graph or table in context."
      },
      {
        code: "Year 6 Ratio and Algebra",
        title: "Upper KS2: Ratio, Proportion and Algebra Readiness",
        focus: "Ratio language, proportional reasoning, scaling, missing values, simple formulae, one-step and two-step equations, sequences, substitution-style reasoning and preparing for Key Stage 3 algebra.",
        coverage: "Strong",
        tools: [
          ["ratio-proportion", "generate ratio, sharing, scale and proportion practice"],
          ["bar-models", "model ratio, reverse ratio and comparison structures"],
          ["substitution", "introduce values in expressions and simple formulae"],
          ["linear-equations", "support missing-number and equation readiness"],
          ["sequences-series", "generate pattern and sequence work"],
          ["simplification", "introduce collecting like terms for stronger Year 6 groups"]
        ],
        teacherMove: "Keep algebra connected to structure: boxes, bars, tables and sequences should lead into symbols rather than symbols appearing first."
      },
      {
        code: "KS2 SATs",
        title: "SATs Readiness and Intervention",
        focus: "Arithmetic fluency, reasoning questions, multi-step word problems, fractions, decimals, percentages, ratio, measures, geometry, statistics and targeted intervention before Year 6 assessment.",
        coverage: "Strong",
        tools: [
          ["four-operations", "build arithmetic paper fluency"],
          ["fractions-practice", "target fraction arithmetic and mixed-number gaps"],
          ["simple-percentage-tasks", "prepare percentage and comparison reasoning"],
          ["ratio-proportion", "support proportional reasoning and scaling"],
          ["bar-models", "represent multi-step reasoning questions"],
          ["elementary-starter-board", "run targeted SATs-style retrieval and intervention starters"]
        ],
        teacherMove: "Use the worksheet builder for short intervention sets. Keep each set focused so teachers can identify the exact gap being addressed."
      }
    ]
  },
  {
    id: "uk-ks3-mathematics",
    label: "UK KS3",
    country: "United Kingdom",
    status: "Mapped",
    title: "UK Key Stage 3 Mathematics Curriculum Alignment",
    description: "A Key Stage 3 map from the National Curriculum mathematics strands to Kaizen Maths teaching tools, classroom displays, worked examples, worksheet generators, and intervention practice.",
    basis: "Pilot alignment based on the National Curriculum in England mathematics programme of study for Key Stage 3: working mathematically; number; algebra; ratio, proportion and rates of change; geometry and measures; probability; and statistics.",
    standards: [
      {
        code: "KS3 WM",
        title: "Working Mathematically",
        focus: "Fluency, reasoning, problem solving, selecting methods, representing situations, developing arguments, interpreting answers, and communicating mathematical thinking clearly.",
        coverage: "Strong",
        tools: [
          ["classroom-displays", "project grids, diagrams, shapes, tables and templates for teacher modelling"],
          ["dynamic-classroom-displays", "animate graphs, transformations and geometric relationships for discussion"],
          ["formal-geometric-proof", "build statement-and-reason chains for early proof habits"],
          ["bar-models", "represent comparison, ratio, percentage and equation structures visually"],
          ["area-models", "support multiplicative reasoning before formal algebraic methods"]
        ],
        teacherMove: "Use this strand across all KS3 lessons: ask students to explain the representation, choose a method, justify each step, and check whether the answer makes sense."
      },
      {
        code: "KS3 Number",
        title: "Number",
        focus: "Integers, place value, directed numbers, fractions, decimals, percentages, ratio links, factors, multiples, primes, powers, roots, standard form readiness, rounding, estimation, units, and calculation fluency.",
        coverage: "Strong",
        tools: [
          ["four-operations", "build fluent written and mental methods across the four operations"],
          ["order-of-operations", "practise BIDMAS, brackets and directed-number calculations"],
          ["integer-operations", "secure negative-number operations and number-line reasoning"],
          ["fractions-practice", "develop equivalent fractions, simplifying, mixed numbers and fraction operations"],
          ["decimals-practice-lab", "support decimal place value, rounding and decimal operations"],
          ["simple-percentage-tasks", "connect percentages with fractions, decimals, quantities and change"],
          ["hcf-lcm", "practise factors, multiples, prime factors, HCF and LCM"],
          ["exponents-index-notation", "introduce powers, roots and index notation"]
        ],
        teacherMove: "Treat number as the foundation for later algebra and ratio work. Keep place value, sign, equivalence and units visible in the working."
      },
      {
        code: "KS3 Algebra",
        title: "Algebra",
        focus: "Using algebraic notation, substituting values, simplifying expressions, expanding brackets, factorising, solving linear equations, inequalities, sequences, coordinates, straight-line graphs, and beginning function language.",
        coverage: "Strong",
        tools: [
          ["substitution", "practise substituting values into expressions and formulae"],
          ["simplification", "collect like terms and simplify algebraic expressions"],
          ["bracket-expansion", "expand single and double brackets with clear steps"],
          ["linear-equations", "solve one-step, two-step and bracketed linear equations"],
          ["simultaneous-equations", "introduce paired linear relationships for stronger KS3 groups"],
          ["sequences-series", "generate arithmetic and geometric sequence practice"],
          ["straight-lines", "connect coordinates, gradients, intercepts and equations of lines"],
          ["functions", "introduce input-output rules, mappings and function notation where appropriate"]
        ],
        teacherMove: "Move between words, expressions, equations, tables and graphs. Students should know what the letter represents before manipulating it."
      },
      {
        code: "KS3 Ratio",
        title: "Ratio, Proportion and Rates of Change",
        focus: "Ratio notation, simplifying and sharing in a ratio, scale factors, proportional reasoning, percentages, direct and inverse proportion readiness, compound measures, speed, density, rates and multiplicative comparison.",
        coverage: "Strong",
        tools: [
          ["ratio-proportion", "generate simplifying, sharing, scale, recipes, exchange rates and proportion practice"],
          ["simple-percentage-tasks", "build percentage of amounts, change and reverse percentage readiness"],
          ["bar-models", "represent ratio, reverse ratio and percentage structures visually"],
          ["scale-drawing-similar-shapes", "connect scale factors, similar shapes and proportional reasoning"],
          ["conversions-teaching", "support units, compound measures and conversion fluency"],
          ["financial-real-life-maths", "apply percentages, rates and proportional reasoning to real contexts"]
        ],
        teacherMove: "Keep the multiplicative relationship explicit. Ask whether the situation is additive or proportional before students choose a method."
      },
      {
        code: "KS3 Geometry",
        title: "Geometry and Measures",
        focus: "Properties of 2D and 3D shapes, angles, parallel lines, polygons, transformations, constructions, perimeter, area, surface area, volume, units, Pythagoras, scale drawings and geometric reasoning.",
        coverage: "Strong",
        tools: [
          ["missing-angles", "develop angle facts, parallel lines and multi-step angle reasoning"],
          ["polygons-angles", "practise interior and exterior angles of polygons"],
          ["transformations", "generate translation, reflection, rotation and enlargement practice"],
          ["loci-constructions", "support compass-and-straightedge construction and loci reasoning"],
          ["area-rectangles", "practise area, perimeter and composite plane figures"],
          ["area-triangles", "extend area work to triangles and related shapes"],
          ["volume-surface-area-prisms", "generate volume and surface-area practice for prisms"],
          ["pythagoras-theorem", "introduce right-triangle reasoning and missing lengths"]
        ],
        teacherMove: "Use diagrams for reasoning, not decoration. Students should name the angle fact, shape property, transformation or measure relationship before calculating."
      },
      {
        code: "KS3 Probability",
        title: "Probability",
        focus: "Probability language, probability scales, equally likely outcomes, sample spaces, theoretical and experimental probability, mutually exclusive outcomes, simple combined events, Venn diagrams and tree diagrams.",
        coverage: "Strong",
        tools: [
          ["venn-diagrams", "connect regions, set language, probability and simple algebraic probability"],
          ["tree-diagrams-conditional-probability", "build structured probability trees for independent and dependent events"],
          ["fractions-practice", "repair fraction arithmetic needed for probability"],
          ["ratio-proportion", "connect probability to proportional reasoning and expected frequency"],
          ["classroom-displays", "project blank Venn diagrams and probability templates for modelling"]
        ],
        teacherMove: "Ask students to describe the event in words before writing a fraction, region or tree-path calculation."
      },
      {
        code: "KS3 Statistics",
        title: "Statistics",
        focus: "Collecting and representing data, averages and range, frequency tables, grouped data readiness, charts and diagrams, comparing distributions, scatter graphs, correlation and interpreting data in context.",
        coverage: "Strong",
        tools: [
          ["averages-range", "generate mean, median, mode, range and representative-measure practice"],
          ["histograms", "introduce grouped-data thinking and frequency-density extension where appropriate"],
          ["correlation-regression", "support scatter graphs, correlation and lines of best fit for stronger KS3 groups"],
          ["sampling-methods-bias", "teach sampling choices, bias and reliability of conclusions"],
          ["kaizen-large-data-set", "provide data-context prompts for interpretation and discussion"],
          ["classroom-displays", "project blank tables and statistical display templates"]
        ],
        teacherMove: "Keep interpretation central: students should explain what the statistic, chart or trend tells them about the context."
      },
      {
        code: "KS3 GCSE Bridge",
        title: "GCSE Readiness and Intervention",
        focus: "Consolidating KS3 foundations before GCSE: algebra fluency, proportional reasoning, angle facts, transformations, area and volume, probability, statistics, and multi-step problem solving.",
        coverage: "Strong",
        tools: [
          ["quadratic-factorisation", "prepare stronger KS3 students for GCSE algebraic structure"],
          ["quadratic-equations", "introduce factorising and solving quadratics where appropriate"],
          ["straight-lines", "bridge coordinate work into GCSE graph interpretation"],
          ["scale-drawing-similar-shapes", "connect KS3 scale work to GCSE similarity"],
          ["upper-lower-bounds", "extend rounding and accuracy into GCSE bounds"],
          ["formal-geometric-proof", "strengthen reasoning chains before GCSE proof-style questions"]
        ],
        teacherMove: "Use this row for Year 9 transition and intervention. Select only the GCSE bridge content students are ready to meet."
      }
    ]
  },
  {
    id: "gcse",
    label: "GCSE",
    country: "United Kingdom",
    status: "Mapped",
    title: "GCSE Mathematics Curriculum Alignment",
    description: "A strand-by-strand map from GCSE Mathematics subject content to Kaizen Maths teaching tools, classroom displays, worked examples, worksheet generators, and assessment practice.",
    basis: "Pilot alignment based on the GCSE Mathematics subject-content areas used across awarding organisations: Number, Algebra, Ratio, Proportion and Rates of Change, Geometry and Measures, Probability, and Statistics.",
    standards: [
      {
        code: "N1-N4",
        title: "Number: Structure, Operations, Factors, Powers and Roots",
        focus: "Place value, four operations, order of operations, factors, multiples, primes, roots, powers, index notation, and exact numerical fluency.",
        coverage: "Strong",
        tools: [
          ["four-operations", "secure written and mental calculation across the four operations"],
          ["order-of-operations", "build BIDMAS fluency with integers and brackets"],
          ["hcf-lcm", "develop prime factorisation, HCF, and LCM methods"],
          ["exponents-index-notation", "practise powers, roots, and index laws"],
          ["integer-operations", "repair directed-number fluency before algebraic work"]
        ],
        teacherMove: "Use these tools for fast diagnostic work: calculation errors here usually explain later difficulties in algebra, ratio, and geometry."
      },
      {
        code: "N5-N8",
        title: "Number: Fractions, Decimals, Percentages and Reciprocals",
        focus: "Equivalent forms, ordering, converting between fractions/decimals/percentages, fraction arithmetic, mixed numbers, percentages of quantities, and reciprocal thinking.",
        coverage: "Strong",
        tools: [
          ["fractions-practice", "generate fraction arithmetic, mixed-number, and multi-operation practice"],
          ["decimals-practice-lab", "support decimal place value and decimal operations"],
          ["simple-percentage-tasks", "build percentage fluency before contextual applications"],
          ["fractions-table", "use classroom starter tables for quick conversion practice"],
          ["bar-models", "show fraction and percentage relationships visually"]
        ],
        teacherMove: "Move between representations frequently so students do not treat fractions, decimals, and percentages as separate topics."
      },
      {
        code: "N9-N15",
        title: "Number: Units, Accuracy, Bounds, Standard Form, Surds and Exact Values",
        focus: "Estimation, units, rounding, significant figures, error intervals, upper and lower bounds, standard form, surds, rationalising, and exact answers.",
        coverage: "Strong",
        tools: [
          ["conversions-teaching", "practise units, compound measures, and conversions"],
          ["upper-lower-bounds", "generate upper/lower-bound and error-interval practice"],
          ["powers-of-10", "support powers of ten and standard-form thinking"],
          ["surds-radicals", "simplify surds and rationalise denominators"],
          ["financial-real-life-maths", "apply rounding, estimation, units, and money contexts"]
        ],
        teacherMove: "Keep units and degree of accuracy visible in the working, especially when students move from calculation to interpretation."
      },
      {
        code: "A1-A6",
        title: "Algebra: Notation, Substitution, Simplifying, Expanding and Factorising",
        focus: "Algebraic notation, substitution, collecting like terms, expanding brackets, factorising, manipulating powers, and recognising structure in expressions.",
        coverage: "Strong",
        tools: [
          ["substitution", "practise substituting values into expressions and formulae"],
          ["simplification", "collect like terms and simplify expressions"],
          ["bracket-expansion", "expand single and double brackets"],
          ["quadratic-factorisation", "factorise simple quadratics"],
          ["advanced-factorisation", "develop HCF, grouping, difference of squares, cubics, and harder factorisation"]
        ],
        teacherMove: "Show the algebra vertically and make the structure explicit before expecting students to shortcut the manipulation."
      },
      {
        code: "A7-A11",
        title: "Algebra: Equations, Inequalities, Formulae and Simultaneous Equations",
        focus: "Solving linear equations, inequalities, equations with brackets or fractions, changing the subject, simultaneous equations, and algebraic problem solving.",
        coverage: "Strong",
        tools: [
          ["linear-equations", "solve one-step, two-step, bracketed, and fractional linear equations"],
          ["inequalities", "practise inequality solving and representation"],
          ["simultaneous-equations", "solve simultaneous equations by elimination and substitution"],
          ["transposition-formulae", "change the subject of formulae from simple to complex forms"],
          ["algebraic-fractions", "solve equations involving algebraic fractions"]
        ],
        teacherMove: "Make inverse operations and balance explicit, then connect the algebraic solution to checking by substitution."
      },
      {
        code: "A12-A14",
        title: "Algebra: Sequences and Pattern Generalisation",
        focus: "Generating terms, finding nth terms, recognising arithmetic and geometric structure, using recursive descriptions, and linking sequences to graphs.",
        coverage: "Strong",
        tools: [
          ["sequences", "generate GCSE nth-term and pattern questions"],
          ["sequences-series", "extend into arithmetic and geometric sequence notation"],
          ["functions", "connect input-output thinking to sequence rules"],
          ["straight-lines", "link linear sequences to straight-line graphs"]
        ],
        teacherMove: "Use tables, diagrams, and nth-term notation together so students see the same structure in several forms."
      },
      {
        code: "A15-A21",
        title: "Algebra: Graphs, Functions and Coordinate Geometry",
        focus: "Coordinates, gradients, straight-line graphs, quadratic graphs, graph interpretation, function notation, transformations of graphs, and graphical solutions.",
        coverage: "Strong",
        tools: [
          ["straight-lines", "generate coordinate, gradient, and line-equation practice"],
          ["functions", "develop function notation, composite functions, and inverses"],
          ["graph-transformations-curve-sketching", "support graph transformations and curve sketching"],
          ["quadratic-equations", "connect quadratic equations and graphs"],
          ["dynamic-classroom-displays", "animate graph transformations for live modelling"]
        ],
        teacherMove: "Keep equation, table, graph, and verbal description connected; students should know what each representation is telling them."
      },
      {
        code: "A22-A25",
        title: "Algebra: Higher Algebra, Iteration and Advanced Problem Solving",
        focus: "Quadratic formula, completing the square, algebraic fractions, functions, proof-style algebra, iteration, and more demanding manipulation.",
        coverage: "Strong",
        tools: [
          ["quadratic-equations", "solve quadratics by factorising, completing the square, and formula methods"],
          ["algebraic-fractions", "simplify and solve with rational algebraic expressions"],
          ["roots-of-equations", "support roots and transformations of equations"],
          ["numerical-methods", "practise iteration, approximation, and numerical methods"],
          ["functions", "develop higher function notation and inverse-function reasoning"]
        ],
        teacherMove: "Use this strand for Higher-tier extension and revision where students need complete working, not only final answers."
      },
      {
        code: "R1-R7",
        title: "Ratio, Proportion and Rates of Change: Ratio, Scale, Units and Direct Proportion",
        focus: "Ratio notation, simplifying ratios, sharing in a ratio, unit rates, scale drawings, similar shapes, recipes, maps, and proportional relationships.",
        coverage: "Strong",
        tools: [
          ["ratio-proportion", "generate ratio, sharing, unit-rate, and proportion practice"],
          ["scale-drawing-similar-shapes", "connect scale factor, similar shapes, and length ratios"],
          ["conversions-teaching", "practise units and compound measures"],
          ["bar-models", "represent ratio and reverse-ratio reasoning visually"],
          ["area-models", "support multiplicative structure and proportional reasoning"]
        ],
        teacherMove: "Use diagrams and tables before equations, especially where students confuse additive and multiplicative comparison."
      },
      {
        code: "R8-R16",
        title: "Ratio, Proportion and Rates of Change: Percentages, Growth, Compound Measures and Graphs",
        focus: "Percentage increase/decrease, reverse percentage, interest, speed, density, pressure, rates of change, gradients, and proportional graphs.",
        coverage: "Strong",
        tools: [
          ["percentages-real-world", "generate percentage change, reverse percentage, and contextual questions"],
          ["financial-real-life-maths", "apply percentages to money, interest, discounts, wages, and depreciation"],
          ["straight-lines", "connect rate of change to gradient"],
          ["conversions-teaching", "support speed, density, pressure, and compound units"],
          ["graph-transformations-curve-sketching", "interpret proportional and non-linear graph behaviour"]
        ],
        teacherMove: "Keep the original amount, multiplier, and final amount distinct; reverse percentage work is strongest when the model is visible."
      },
      {
        code: "G1-G6",
        title: "Geometry and Measures: Properties, Constructions, Angles and Polygons",
        focus: "Angle facts, parallel lines, polygons, bearings, constructions, loci, symmetry, congruence language, and geometric reasoning.",
        coverage: "Strong",
        tools: [
          ["missing-angles", "practise line, triangle, quadrilateral, and parallel-line angle facts"],
          ["polygons-angles", "generate interior and exterior angle problems"],
          ["bearings", "develop three-figure bearings and hidden bearing reasoning"],
          ["loci-constructions", "support construction and loci diagrams"],
          ["classroom-displays", "project blank grids, shape outlines, and geometry templates"]
        ],
        teacherMove: "Require students to name the rule before calculating; this builds a reasoning chain rather than isolated angle chasing."
      },
      {
        code: "G7-G13",
        title: "Geometry and Measures: Transformations, Congruence and Similarity",
        focus: "Translations, reflections, rotations, enlargements, combined transformations, scale factors, congruent shapes, similar figures, and area/volume scale factors.",
        coverage: "Strong",
        tools: [
          ["transformations", "generate coordinate-grid transformation practice"],
          ["dynamic-classroom-displays", "animate transformations for live teaching"],
          ["scale-drawing-similar-shapes", "practise similar triangles, similar shapes, and ratio links"],
          ["free-vectors", "connect translation vectors and column-vector notation"],
          ["formal-geometric-proof", "support congruence, similarity, and theorem reasoning"]
        ],
        teacherMove: "Use diagrams large enough for students to see the object, image, invariant points, and full transformation description."
      },
      {
        code: "G14-G17",
        title: "Geometry and Measures: Length, Area, Circles, Surface Area and Volume",
        focus: "Perimeter, area, circumference, circle sectors, arc length, surface area, volume, prisms, cylinders, cones, pyramids, spheres, and units.",
        coverage: "Strong",
        tools: [
          ["area-rectangles", "support area, perimeter, and compound rectangles"],
          ["circles-area-circumference", "generate area and circumference questions"],
          ["sectors-arc-length", "practise sectors, arc length, and sector area"],
          ["volume-surface-area-prisms", "develop volume and surface area of prisms"],
          ["cylinders-cones-volume-surface-area", "extend to cylinders and cones"],
          ["pyramids-spheres-volume-surface-area", "extend to pyramids and spheres"]
        ],
        teacherMove: "Keep formula choice, substitution, units, and final rounding visible; many GCSE errors are unit or formula-selection errors."
      },
      {
        code: "G18-G23",
        title: "Geometry and Measures: Pythagoras, Trigonometry, Circles, Vectors and Coordinate Geometry",
        focus: "Pythagoras, right-angled trigonometry, sine rule, cosine rule, circle theorems, equation of a circle, vector geometry, and geometric proof.",
        coverage: "Strong",
        tools: [
          ["pythagoras-theorem", "generate right-triangle side problems with clear working"],
          ["trigonometric-ratios", "practise SOHCAHTOA and right-triangle contexts"],
          ["sine-cosine-rule", "extend to non-right triangles and triangle area"],
          ["circle-theorems", "develop theorem-based circle angle reasoning"],
          ["equation-of-a-circle", "connect centre, radius, tangents, and intersections"],
          ["free-vectors", "practise column vectors and vector geometry"]
        ],
        teacherMove: "Use the diagram to decide the theorem or formula first; then show the substitution and rearrangement without skipping steps."
      },
      {
        code: "P1-P9",
        title: "Probability: Events, Diagrams, Sets, Relative Frequency and Conditional Probability",
        focus: "Probability scales, mutually exclusive and independent events, expected frequency, tree diagrams, Venn diagrams, set notation, and conditional probability.",
        coverage: "Strong",
        tools: [
          ["tree-diagrams-conditional-probability", "generate independent, dependent, and conditional probability tree problems"],
          ["venn-diagrams", "connect set notation, regions, complements, and probabilities"],
          ["permutations-combinations", "support counting methods where needed for probability"],
          ["fractions-practice", "repair fraction arithmetic needed for probability"],
          ["classroom-displays", "project blank Venn diagrams and probability templates"]
        ],
        teacherMove: "Ask students to describe the region or path in words before writing probability notation."
      },
      {
        code: "S1-S6",
        title: "Statistics: Data, Averages, Graphs, Scatter Diagrams and Interpretation",
        focus: "Collecting data, sampling, averages, range, grouped data, frequency tables, charts, histograms, cumulative frequency, scatter diagrams, correlation, and interpretation.",
        coverage: "Strong",
        tools: [
          ["averages-range", "practise mean, median, mode, range, and missing values"],
          ["histograms", "develop frequency density and grouped-data interpretation"],
          ["cumulative-frequency-curves", "work with ogives, quartiles, medians, and percentiles"],
          ["correlation-regression", "support scatter diagrams, correlation, regression, interpolation, and extrapolation"],
          ["sampling-methods-bias", "teach sampling choices and bias"],
          ["kaizen-large-data-set", "use data interpretation practice with larger datasets"]
        ],
        teacherMove: "Require context in the final answer: students should say what the statistic, graph, or trend means, not only calculate it."
      }
    ]
  },
  {
    id: "pearson-edexcel",
    label: "Pearson Edexcel",
    country: "United Kingdom / International",
    status: "Mapped",
    title: "Pearson Edexcel Mathematics Curriculum Alignment",
    description: "A Pearson Edexcel route map linking GCSE, International GCSE, A-level, International A-level, and Further Mathematics content to Kaizen Maths tools for classroom teaching, practice, worksheets, assessment and intervention.",
    basis: "Pilot alignment based on Pearson Edexcel GCSE Mathematics, Pearson Edexcel International GCSE Mathematics A, Pearson Edexcel International GCSE Further Pure Mathematics, Pearson Edexcel AS/A-level Mathematics and Further Mathematics, and Pearson Edexcel International AS/A Level Mathematics routes.",
    standards: [
      {
        code: "GCSE / IGCSE Number",
        title: "GCSE and International GCSE: Number, Ratio and Accuracy",
        focus: "Number operations, factors and multiples, fractions, decimals, percentages, ratio, proportion, standard form, estimation, bounds, indices, surds, money and real-life number contexts.",
        coverage: "Strong",
        tools: [
          ["four-operations", "secure arithmetic across integers, decimals and negatives"],
          ["fractions-practice", "develop fraction and mixed-number operations"],
          ["decimals-practice-lab", "support decimal calculations and place value"],
          ["hcf-lcm", "practise factors, multiples, HCF, LCM and prime factorisation"],
          ["powers-of-10", "support standard form and powers of ten"],
          ["upper-lower-bounds", "generate error interval and bounds questions"],
          ["surds-radicals", "extend exact-number work with surds"],
          ["percentages-real-world", "develop percentage change, reverse percentage and contextual percentage work"],
          ["ratio-proportion", "support ratio, proportion and sharing"],
          ["financial-real-life-maths", "generate money, wages, interest, bills and consumer arithmetic practice"]
        ],
        teacherMove: "Use this as the fluency and intervention strand before algebra, graphs and applied problem solving."
      },
      {
        code: "GCSE / IGCSE Algebra",
        title: "GCSE and International GCSE: Algebra, Formulae and Graphs",
        focus: "Algebraic notation, substitution, simplification, expanding, factorising, equations, inequalities, formula rearrangement, simultaneous equations, quadratics, sequences, functions and graph interpretation.",
        coverage: "Strong",
        tools: [
          ["substitution", "practise substitution into expressions and formulae"],
          ["simplification", "collect like terms and simplify expressions"],
          ["bracket-expansion", "expand single and double brackets"],
          ["advanced-factorisation", "develop common-factor, grouping and quadratic factorisation"],
          ["linear-equations", "solve linear equations from simple to complex forms"],
          ["inequalities", "solve and represent inequalities"],
          ["transposition-formulae", "change the subject of formulae"],
          ["simultaneous-equations", "solve simultaneous equations by elimination and substitution"],
          ["quadratic-equations", "solve quadratics by factorising, completing the square and formula methods"],
          ["sequences", "generate nth-term and pattern questions"],
          ["functions", "support functions, mappings, domain, range and inverse/composite ideas"],
          ["straight-lines", "connect equations to gradients, intercepts and coordinate graphs"]
        ],
        teacherMove: "Keep the algebra vertical and equivalent line by line, then connect symbolic work to graph or table representations."
      },
      {
        code: "GCSE / IGCSE Geometry",
        title: "GCSE and International GCSE: Geometry, Measures and Trigonometry",
        focus: "Angles, polygons, constructions, loci, similarity, congruence, transformations, bearings, Pythagoras, trigonometry, circles, compound measures, area, volume and surface area.",
        coverage: "Strong",
        tools: [
          ["missing-angles", "practise line, triangle, quadrilateral and parallel-line angle facts"],
          ["polygons-angles", "generate interior and exterior angle problems"],
          ["transformations", "support translations, reflections, rotations and enlargements"],
          ["loci-constructions", "cover construction and loci reasoning"],
          ["scale-drawing-similar-shapes", "connect scale factor, similarity and area or volume ratios"],
          ["pythagoras-theorem", "generate right-triangle side problems"],
          ["trigonometric-ratios", "practise right-angled trigonometry"],
          ["sine-cosine-rule", "extend to non-right-triangle trigonometry"],
          ["bearings", "develop bearings and hidden-bearing reasoning"],
          ["circles-area-circumference", "generate circle area and circumference practice"],
          ["sectors-arc-length", "support arc length, sector area and segment contexts"],
          ["volume-surface-area-prisms", "develop volume and surface area of prisms"],
          ["cylinders-cones-volume-surface-area", "extend measurement to cylinders and cones"]
        ],
        teacherMove: "Start with the diagram and named rule, then show formula choice, substitution, units and final interpretation."
      },
      {
        code: "GCSE / IGCSE Data",
        title: "GCSE and International GCSE: Probability, Statistics and Data Handling",
        focus: "Probability, Venn diagrams, tree diagrams, frequency tables, averages, range, charts, histograms, cumulative frequency, scatter diagrams, correlation and interpretation.",
        coverage: "Strong",
        tools: [
          ["tree-diagrams-conditional-probability", "generate independent, dependent and conditional probability tree questions"],
          ["venn-diagrams", "connect set notation, regions, complements and probabilities"],
          ["averages-range", "practise mean, median, mode, range and missing values"],
          ["histograms", "develop frequency density and grouped-data interpretation"],
          ["cumulative-frequency-curves", "work with ogives, medians, quartiles and percentiles"],
          ["correlation-regression", "support scatter diagrams, correlation and regression lines"],
          ["sampling-methods-bias", "teach sampling choices and bias where required"]
        ],
        teacherMove: "Require students to interpret the statistic, probability or graph in context, not only calculate it."
      },
      {
        code: "IGCSE FPM",
        title: "International GCSE Further Pure Mathematics",
        focus: "Higher-tier extension into functions, quadratics, inequalities, polynomial factors, logarithmic and exponential functions, trigonometry, matrices, calculus, vectors, binomial expansion and proof-style algebra.",
        coverage: "Strong",
        tools: [
          ["functions", "develop function notation, inverse and composite functions"],
          ["quadratic-equations", "support advanced quadratic methods and graphs"],
          ["advanced-factorisation", "develop polynomial factor structure"],
          ["logarithms-practice", "generate logarithmic and exponential equation practice"],
          ["trigonometric-functions", "support exact values, identities and proof-style trig"],
          ["matrices", "introduce matrix operations and transformations"],
          ["free-vectors", "secure column-vector notation and vector geometry"],
          ["binomial-expansion", "support binomial coefficients and expansions"],
          ["differentiation-polynomials", "secure introductory differentiation"],
          ["integration", "cover basic integration and definite integrals"]
        ],
        teacherMove: "Use this row as the IGCSE-to-A-level bridge; keep advanced notation and calculus rules very explicit."
      },
      {
        code: "A-Level Maths Pure",
        title: "AS/A-Level Mathematics: Pure Mathematics",
        focus: "Proof, algebra and functions, coordinate geometry, sequences and series, trigonometry, exponentials and logarithms, differentiation, integration, numerical methods and vectors.",
        coverage: "Strong",
        tools: [
          ["proof-by-induction", "support proof language and structure"],
          ["advanced-factorisation", "develop advanced algebraic manipulation"],
          ["partial-fractions", "prepare rational expressions for integration"],
          ["functions", "develop function notation, composition and inverses"],
          ["straight-lines", "support coordinate geometry and gradients"],
          ["equation-of-a-circle", "connect centre, radius, tangents and intersections"],
          ["sequences-series", "generate sequence and series practice"],
          ["trigonometric-functions", "support trig identities and exact values"],
          ["logarithms-practice", "generate exponential and logarithmic equation practice"],
          ["advanced-differentiation", "develop implicit, parametric, tangents and normals"],
          ["advanced-integration", "practise substitution and integration by parts"],
          ["numerical-methods", "support iteration, Newton-Raphson and trapezium rule"],
          ["free-vectors", "practise column vectors and vector geometry"]
        ],
        teacherMove: "Show the rule, substitution into the rule, and simplified result; A-level students still need complete algebraic working."
      },
      {
        code: "A-Level Maths Applied",
        title: "AS/A-Level Mathematics: Statistics, Mechanics and Large Data Set",
        focus: "Sampling, data presentation, probability, statistical distributions, hypothesis testing, correlation, regression, quantities and units, kinematics, forces and Newton's laws.",
        coverage: "Strong",
        tools: [
          ["sampling-methods-bias", "teach sampling methods, bias and limitations"],
          ["kaizen-large-data-set", "support large-data-set familiarisation and contextual questions"],
          ["histograms", "develop grouped-data and frequency-density reasoning"],
          ["cumulative-frequency-curves", "support medians, quartiles and percentiles"],
          ["correlation-regression", "support regression, correlation and interpolation"],
          ["tree-diagrams-conditional-probability", "generate probability tree questions"],
          ["discrete-random-variables", "support probability distributions and expectation"],
          ["binomial-geometric-distribution", "generate binomial and geometric distribution practice"],
          ["normal-distribution", "standardise and use normal distribution probabilities"],
          ["hypothesis-testing", "develop inference decisions and conclusion wording"],
          ["motion-graphs-constant-acceleration", "interpret distance-time and velocity-time graphs"],
          ["equations-of-motion", "generate SUVAT and constant-acceleration practice"],
          ["newtons-second-law", "model resultant force and F = ma questions"]
        ],
        teacherMove: "For statistics, state the model and conclusion in context; for mechanics, draw the diagram and choose a positive direction first."
      },
      {
        code: "Further Maths",
        title: "AS/A-Level Further Mathematics",
        focus: "Core pure mathematics, complex numbers, matrices, linear algebra, further calculus, differential equations, polar coordinates, hyperbolic functions, further statistics, further mechanics and decision mathematics.",
        coverage: "Strong",
        tools: [
          ["complex-numbers", "generate complex-number arithmetic, polar form, roots and loci practice"],
          ["advanced-matrices", "develop transformations, eigenvalues and diagonalisation"],
          ["linear-algebra", "support systems, subspaces and linear transformations"],
          ["series-expansions", "generate Taylor and Maclaurin series practice"],
          ["differential-equations", "cover separable, first-order linear, second-order and modelling problems"],
          ["polar-coordinates", "generate polar coordinate and polar curve practice"],
          ["hyperbolic-functions", "support hyperbolic identities and calculus links"],
          ["poisson-distribution", "support further statistics distribution work"],
          ["continuous-random-variables", "extend probability into density functions and integration"],
          ["momentum", "generate momentum and impulse questions"],
          ["work-energy-power", "support work, energy and power modelling"],
          ["linear-programming", "support decision mathematics and optimisation contexts"]
        ],
        teacherMove: "Separate core pure from optional applied pathways so teachers can align practice to the exact Edexcel route being taught."
      },
      {
        code: "IAL",
        title: "International AS/A Level Mathematics Modular Route",
        focus: "Pearson Edexcel IAL modular combinations across Pure Mathematics, Further Pure Mathematics, Statistics, Mechanics and Decision Mathematics.",
        coverage: "Strong",
        tools: [
          ["functions", "support Pure Mathematics units"],
          ["advanced-differentiation", "support calculus and coordinate-geometry units"],
          ["advanced-integration", "support integration methods and applications"],
          ["complex-numbers", "support Further Pure routes"],
          ["matrices", "support matrix and transformation routes"],
          ["normal-distribution", "support Statistics units"],
          ["hypothesis-testing", "support inference and testing units"],
          ["equations-of-motion", "support Mechanics units"],
          ["newtons-second-law", "support force and acceleration modelling"],
          ["linear-programming", "support Decision Mathematics optimisation routes"]
        ],
        teacherMove: "Use this row for international schools choosing modular Pearson routes; map practice to the exact unit combination a class is taking."
      }
    ]
  },
  {
    id: "ib-mathematics",
    label: "IB Maths",
    country: "International",
    status: "Mapped",
    title: "IB Mathematics Curriculum Alignment",
    description: "A programme-level map from IB MYP Mathematics and IB Diploma Programme Mathematics to Kaizen Maths teaching tools, classroom displays, worked examples, worksheet practice, modelling tasks and inquiry support.",
    basis: "Pilot alignment based on the IB Middle Years Programme mathematics framework and the IB Diploma Programme mathematics courses: Mathematics: analysis and approaches SL/HL and Mathematics: applications and interpretation SL/HL.",
    standards: [
      {
        code: "MYP Number and Algebra",
        title: "MYP Mathematics: Number, Algebra and Pattern",
        focus: "Number fluency, proportional reasoning, percentages, indices, algebraic notation, substitution, simplifying, equations, inequalities, sequences, functions and modelling familiar or unfamiliar situations.",
        coverage: "Strong",
        tools: [
          ["four-operations", "secure arithmetic and calculation fluency"],
          ["fractions-practice", "develop fraction and mixed-number reasoning"],
          ["percentages-real-world", "connect percentages to applied contexts"],
          ["ratio-proportion", "support proportional reasoning and sharing"],
          ["exponents-index-notation", "practise powers and index laws"],
          ["simplification", "collect like terms and simplify expressions"],
          ["linear-equations", "solve linear equations with clear inverse operations"],
          ["inequalities", "solve and represent inequalities"],
          ["sequences", "generate pattern and nth-term practice"],
          ["functions", "connect mappings, rules, domain, range and representations"]
        ],
        teacherMove: "Use MYP tasks to move from representation and pattern noticing into formal algebra, while keeping the real or inquiry context visible."
      },
      {
        code: "MYP Geometry",
        title: "MYP Mathematics: Geometry, Trigonometry and Measurement",
        focus: "Shape properties, angle reasoning, transformations, similarity, scale, coordinate geometry, Pythagoras, trigonometry, perimeter, area, surface area, volume and measurement contexts.",
        coverage: "Strong",
        tools: [
          ["missing-angles", "develop angle facts and geometric reasoning"],
          ["polygons-angles", "generate interior and exterior angle problems"],
          ["transformations", "support translations, reflections, rotations and enlargements"],
          ["dynamic-classroom-displays", "animate transformations and graph changes for teacher modelling"],
          ["scale-drawing-similar-shapes", "connect similarity, scale and ratio"],
          ["pythagoras-theorem", "generate right-triangle side questions"],
          ["trigonometric-ratios", "practise right-angled trigonometry"],
          ["area-rectangles", "support area, perimeter and compound shapes"],
          ["volume-surface-area-prisms", "develop volume and surface area practice"],
          ["classroom-displays", "project blank grids, shapes and geometry templates"]
        ],
        teacherMove: "Make diagrams central: MYP geometry works best when students explain relationships before applying a formula."
      },
      {
        code: "MYP Data",
        title: "MYP Mathematics: Statistics, Probability and Modelling",
        focus: "Data representation, averages, spread, probability, Venn diagrams, tree diagrams, scatter diagrams, correlation, sampling, bias and interpreting results in context.",
        coverage: "Strong",
        tools: [
          ["averages-range", "generate averages, spread and missing-value questions"],
          ["histograms", "develop grouped-data and frequency-density reasoning"],
          ["cumulative-frequency-curves", "support cumulative data interpretation"],
          ["correlation-regression", "support scatter diagrams, correlation and trend lines"],
          ["sampling-methods-bias", "teach sampling methods and limitations"],
          ["tree-diagrams-conditional-probability", "generate tree diagrams and conditional probability practice"],
          ["venn-diagrams", "connect set notation, regions and probability"],
          ["kaizen-large-data-set", "support contextual data interpretation and inquiry prompts"]
        ],
        teacherMove: "Require students to interpret every statistic or probability statement in context and comment on whether it answers the original question."
      },
      {
        code: "DP AA 1-3",
        title: "DP Mathematics: Analysis and Approaches - Number, Algebra, Functions and Trigonometry",
        focus: "Algebraic structure, proof, sequences and series, binomial expansion, functions, inverse and composite functions, graph transformations, trigonometric functions, identities and equations.",
        coverage: "Strong",
        tools: [
          ["proof-by-induction", "support proof structure and mathematical argument"],
          ["advanced-factorisation", "develop higher algebraic manipulation"],
          ["sequences-series", "generate arithmetic and geometric sequence and series practice"],
          ["binomial-expansion", "support binomial coefficients and expansion questions"],
          ["functions", "develop function notation, composition, inverses, domain and range"],
          ["graph-transformations-curve-sketching", "connect equations to graph behaviour"],
          ["trigonometric-functions", "support exact values, identities and proof-style trig"],
          ["trig-equation-solver", "solve trigonometric equations"],
          ["trig-graphs-transformations", "show and practise transformed trig graphs"],
          ["logarithms-practice", "generate exponential and logarithmic equation practice"]
        ],
        teacherMove: "AA students need symbolic fluency and justification; show structure before asking them to generalise or prove."
      },
      {
        code: "DP AA 4-5",
        title: "DP Mathematics: Analysis and Approaches - Geometry, Vectors and Calculus",
        focus: "Coordinate geometry, vectors, trigonometry, differentiation, integration, optimisation, area, kinematics links, differential equations and extended calculus for HL routes.",
        coverage: "Strong",
        tools: [
          ["straight-lines", "support coordinate geometry and gradients"],
          ["equation-of-a-circle", "connect centre, radius, tangents and intersections"],
          ["free-vectors", "practise column vectors and vector geometry"],
          ["further-vectors", "extend vector work for HL classes where needed"],
          ["differentiation-polynomials", "secure introductory differentiation"],
          ["differentiation-rules", "practise product, quotient and chain rule"],
          ["advanced-differentiation", "develop implicit, parametric, tangents and normals"],
          ["integration", "cover basic and definite integration"],
          ["advanced-integration", "practise substitution and integration by parts"],
          ["differential-equations", "support differential-equation modelling"],
          ["volumes-of-revolution", "extend integration for HL-style practice where appropriate"]
        ],
        teacherMove: "Link symbolic calculus to graphical meaning: gradient, rate of change, area, accumulation and model interpretation should stay connected."
      },
      {
        code: "DP AI Modelling",
        title: "DP Mathematics: Applications and Interpretation - Modelling, Functions and Technology",
        focus: "Mathematical modelling, functions, graph interpretation, technology-supported methods, numerical approaches, matrices where required, networks or optimisation where used, and interpretation of results.",
        coverage: "Strong",
        tools: [
          ["functions", "support function notation and modelling relationships"],
          ["graph-transformations-curve-sketching", "interpret graphical behaviour and transformed models"],
          ["dynamic-classroom-displays", "model graph changes and transformations dynamically"],
          ["numerical-methods", "support iteration, approximation and algorithmic thinking"],
          ["matrices", "support matrix operations and transformations where used"],
          ["linear-programming", "model optimisation with constraints"],
          ["correlation-regression", "build and interpret regression models"],
          ["financial-real-life-maths", "support applied percentage, money and growth contexts"]
        ],
        teacherMove: "AI work should start with the context and assumptions, then move into the mathematical model and back out to interpretation."
      },
      {
        code: "DP AI Statistics",
        title: "DP Mathematics: Applications and Interpretation - Statistics, Probability and Inference",
        focus: "Data displays, sampling, correlation, regression, probability, discrete and continuous distributions, normal models, hypothesis testing, confidence intervals where applicable, and statistical communication.",
        coverage: "Strong",
        tools: [
          ["sampling-methods-bias", "teach sampling choices, bias and limitations"],
          ["kaizen-large-data-set", "support data familiarisation and contextual questions"],
          ["histograms", "develop grouped-data and frequency-density reasoning"],
          ["cumulative-frequency-curves", "support medians, quartiles and percentiles"],
          ["correlation-regression", "support scatter diagrams, regression and interpretation"],
          ["tree-diagrams-conditional-probability", "generate conditional probability practice"],
          ["discrete-random-variables", "support probability distributions and expectation"],
          ["normal-distribution", "standardise and use normal distribution probabilities"],
          ["hypothesis-testing", "develop inference decisions and conclusion wording"],
          ["confidence-intervals", "support interval estimates and interpretation"]
        ],
        teacherMove: "Make the final sentence do statistical work: students should state the conclusion in context and acknowledge limitations."
      },
      {
        code: "DP HL Extension",
        title: "DP Higher Level Extension Support",
        focus: "HL extension support across complex numbers, matrices, advanced functions, further calculus, distributions, differential equations, vectors and advanced modelling where schools require it.",
        coverage: "Partial",
        tools: [
          ["complex-numbers", "support complex-number arithmetic, polar form and roots where used"],
          ["advanced-matrices", "extend matrix and transformation practice"],
          ["linear-algebra", "support advanced matrix and vector structure"],
          ["series-expansions", "generate Taylor and Maclaurin series practice"],
          ["polar-coordinates", "support polar representation and graphs where used"],
          ["hyperbolic-functions", "support extension calculus and identities where required"],
          ["continuous-random-variables", "extend probability into density functions and integration"],
          ["poisson-distribution", "support additional distribution practice where relevant"],
          ["differential-equations", "support HL differential-equation modelling"],
          ["work-energy-power", "support applied modelling for mathematically stronger mechanics contexts"]
        ],
        teacherMove: "This row is intentionally marked partial because IB HL route choices and updates vary; use it as an extension bank rather than a complete course claim."
      },
      {
        code: "IA",
        title: "Internal Assessment and Mathematical Inquiry",
        focus: "Problem specification, assumptions, abstraction, computation, interpretation, evaluation, refinement, communication and mathematically valid exploration.",
        coverage: "Strong",
        tools: [
          ["kaizen-large-data-set", "support data-led exploration and question generation"],
          ["correlation-regression", "provide regression and model interpretation examples"],
          ["normal-distribution", "support distribution modelling"],
          ["hypothesis-testing", "support inference and conclusion wording"],
          ["dynamic-classroom-displays", "help teachers demonstrate concepts dynamically"],
          ["classroom-displays", "project blank diagrams, grids and templates for modelling discussions"],
          ["interface-guide", "support teacher workflow for examples, questions and practice routines"]
        ],
        teacherMove: "Use Kaizen to model the mathematics, but keep IA authorship with the student: the teacher role is to question assumptions, method choice and interpretation."
      }
    ]
  },
  {
    id: "ap-mathematics",
    label: "AP Mathematics",
    country: "United States / International",
    status: "Mapped",
    title: "AP Mathematics Curriculum Alignment",
    description: "A course-level map from AP Precalculus, AP Calculus AB, AP Calculus BC and AP Statistics to Kaizen Maths teaching tools, classroom displays, worked examples, worksheet practice and assessment support.",
    basis: "Pilot alignment based on current College Board AP Central course frameworks for AP Precalculus, AP Calculus AB and BC, and AP Statistics.",
    standards: [
      {
        code: "AP Precalculus 1",
        title: "AP Precalculus: Polynomial and Rational Functions",
        focus: "Polynomial and rational functions, rates of change, end behaviour, zeros, multiplicity, asymptotes, equivalent forms, transformations, modelling and interpretation.",
        coverage: "Strong",
        tools: [
          ["functions", "connect function notation, domain, range, composition and inverse functions"],
          ["graph-transformations-curve-sketching", "support transformations, key features and curve sketching"],
          ["quadratic-equations", "secure quadratic structure, roots and graph links"],
          ["advanced-factorisation", "develop polynomial factor structure and algebraic manipulation"],
          ["roots-of-equations", "connect roots, factors and graphs"],
          ["numerical-methods", "support approximation and iteration where graphing is not enough"],
          ["dynamic-classroom-displays", "model graph changes and transformations dynamically"]
        ],
        teacherMove: "Ask students to move between equation, graph, table and context, then justify which representation best explains the behaviour."
      },
      {
        code: "AP Precalculus 2",
        title: "AP Precalculus: Exponential and Logarithmic Functions",
        focus: "Exponential and logarithmic models, inverse relationships, transformations, equations, parameters, growth and decay, semi-log reasoning and contextual interpretation.",
        coverage: "Strong",
        tools: [
          ["logarithms-practice", "generate exponential and logarithmic equation practice"],
          ["functions", "connect inverse functions and function notation"],
          ["graph-transformations-curve-sketching", "show transformed exponential and logarithmic graphs"],
          ["transposition-formulae", "support rearranging exponential and logarithmic formulae"],
          ["financial-real-life-maths", "connect percentage change, growth, interest and applied models"],
          ["dynamic-classroom-displays", "animate graph and parameter changes for teacher modelling"]
        ],
        teacherMove: "Keep the inverse relationship visible: every logarithmic statement should be translated back to an equivalent exponential statement."
      },
      {
        code: "AP Precalculus 3",
        title: "AP Precalculus: Trigonometric and Polar Functions",
        focus: "Trigonometric functions, unit-circle structure, periodicity, transformations, identities, equations, inverse trigonometric ideas, polar coordinates and graphical interpretation.",
        coverage: "Strong",
        tools: [
          ["trigonometric-functions", "support exact values, identities and proof-style trig"],
          ["trig-graphs-transformations", "show transformed trig graphs and equations"],
          ["trig-equation-solver", "generate trigonometric equation practice"],
          ["polar-coordinates", "support polar coordinates and polar curve interpretation"],
          ["graph-transformations-curve-sketching", "connect equation changes to graph features"],
          ["dynamic-classroom-displays", "animate trig graph transformations and circle representations"]
        ],
        teacherMove: "Use periodicity and symmetry before procedures; students should explain why multiple solutions occur."
      },
      {
        code: "AP Precalculus 4",
        title: "AP Precalculus: Parameters, Vectors and Matrices",
        focus: "Functions involving parameters, vector-valued relationships, matrix notation, transformations and multiple representations used as optional extension content.",
        coverage: "Strong",
        tools: [
          ["free-vectors", "secure column-vector notation and vector geometry"],
          ["further-vectors", "extend vector reasoning for stronger classes"],
          ["matrices", "support matrix operations and transformations"],
          ["advanced-matrices", "extend matrices into transformations and eigenvalue ideas where appropriate"],
          ["functions", "connect parameters to changing function behaviour"],
          ["dynamic-classroom-displays", "support visual modelling of transformations and parameter changes"]
        ],
        teacherMove: "Treat this as an extension bank: show how parameters change a family of objects rather than teaching each example as an isolated procedure."
      },
      {
        code: "AP Calculus AB",
        title: "AP Calculus AB: Limits, Differentiation, Integration and Applications",
        focus: "Limits and continuity, derivative definitions and rules, composite, implicit and inverse differentiation, applications of derivatives, integration, accumulation, differential equations and applications of integration.",
        coverage: "Strong",
        tools: [
          ["limits-first-principles", "support limit notation, first-principles reasoning and continuity"],
          ["differentiation-polynomials", "secure introductory differentiation and gradient functions"],
          ["differentiation-rules", "practise product, quotient and chain rule"],
          ["advanced-differentiation", "develop implicit, parametric, tangents, normals and optimisation"],
          ["integration", "cover basic integration, definite integrals and area under curves"],
          ["advanced-integration", "practise substitution and integration by parts where extension is needed"],
          ["differential-equations", "support separable models and solution interpretation"],
          ["volumes-of-revolution", "support applications of integration where required"],
          ["dynamic-classroom-displays", "show gradient, area and transformation ideas dynamically"]
        ],
        teacherMove: "Require notation and meaning together: students should say what a derivative, integral or limit represents in the problem context."
      },
      {
        code: "AP Calculus BC",
        title: "AP Calculus BC: Parametric, Polar, Vector-Valued Functions and Series",
        focus: "AP Calculus AB content plus parametric equations, polar coordinates, vector-valued functions, infinite sequences, infinite series, Taylor series and Maclaurin series.",
        coverage: "Strong",
        tools: [
          ["advanced-differentiation", "support parametric differentiation and higher-level curve analysis"],
          ["polar-coordinates", "support polar coordinates and polar curve work"],
          ["further-vectors", "support vector-valued function and vector interpretation practice"],
          ["sequences-series", "generate sequence and series foundations"],
          ["series-expansions", "generate Taylor and Maclaurin series practice"],
          ["advanced-integration", "support integration methods needed for BC extension work"],
          ["differential-equations", "support modelling and solution methods"],
          ["graph-transformations-curve-sketching", "connect symbolic forms to graphical behaviour"]
        ],
        teacherMove: "Use BC extension tools after AB foundations are secure; make convergence, approximation and representation choices explicit."
      },
      {
        code: "AP Statistics 1",
        title: "AP Statistics: Exploring Data and Collecting Data",
        focus: "One-variable data, data displays, summary statistics, variation, sampling methods, experimental design, bias, data collection and interpretation.",
        coverage: "Strong",
        tools: [
          ["averages-range", "practise summary statistics and missing values"],
          ["histograms", "develop grouped-data and distribution-shape reasoning"],
          ["cumulative-frequency-curves", "support medians, quartiles, percentiles and cumulative interpretation"],
          ["sampling-methods-bias", "teach sampling methods, bias and limitations"],
          ["kaizen-large-data-set", "support contextual data familiarisation and investigation prompts"],
          ["correlation-regression", "introduce scatterplots and early association language"]
        ],
        teacherMove: "Make students describe the distribution before calculating; shape, centre, spread, context and limitations should be part of the answer."
      },
      {
        code: "AP Statistics 2",
        title: "AP Statistics: Probability, Random Variables and Distributions",
        focus: "Probability rules, conditional probability, random variables, expected value, discrete distributions, binomial models, normal models and distribution interpretation.",
        coverage: "Strong",
        tools: [
          ["tree-diagrams-conditional-probability", "generate conditional probability and tree diagram practice"],
          ["venn-diagrams", "connect set notation, regions and probability"],
          ["discrete-random-variables", "support probability distributions and expectation"],
          ["binomial-geometric-distribution", "generate binomial and geometric distribution practice"],
          ["normal-distribution", "standardise and use normal distribution probabilities"],
          ["continuous-random-variables", "extend probability into density functions where helpful"]
        ],
        teacherMove: "Before calculation, require students to identify the random variable and state the model or probability rule being used."
      },
      {
        code: "AP Statistics 3",
        title: "AP Statistics: Inference, Confidence Intervals and Regression",
        focus: "Inference for proportions and means, hypotheses, confidence intervals, regression analysis, conditions, conclusion writing, interpreting results and justifying claims.",
        coverage: "Strong",
        tools: [
          ["hypothesis-testing", "develop inference decisions and conclusion wording"],
          ["confidence-intervals", "support interval estimates and interpretation"],
          ["normal-distribution", "support normal approximations and standardisation"],
          ["correlation-regression", "support regression lines, residual reasoning and interpretation"],
          ["sampling-methods-bias", "revisit method choice, conditions and limitations"],
          ["kaizen-large-data-set", "support contextual statistical questions and investigation practice"]
        ],
        teacherMove: "The final sentence matters: students should connect the statistical result back to the claim, population and context."
      }
    ]
  },
  {
    id: "singapore-mathematics",
    label: "Singapore Mathematics",
    country: "Singapore / International",
    status: "Mapped",
    title: "Singapore Mathematics Curriculum Alignment",
    description: "A pathway map linking Singapore Primary and Secondary Mathematics, O-Level Mathematics, O-Level Additional Mathematics, A-Level H2 Mathematics and H2 Further Mathematics to Kaizen Maths teaching tools, classroom displays, worked examples, worksheets and assessment practice.",
    basis: "Pilot alignment based on Singapore Ministry of Education mathematics curriculum principles and SEAB GCE O-Level and A-Level Mathematics syllabus routes, including Mathematics, Additional Mathematics, H2 Mathematics and H2 Further Mathematics.",
    standards: [
      {
        code: "Primary / Lower Secondary",
        title: "Primary and Lower Secondary: Number, Algebra, Geometry, Measurement, Statistics and Probability",
        focus: "Number sense, fractions, decimals, percentages, ratio, rate, algebraic thinking, equations, geometry, measurement, graphs, data handling, probability and problem solving through representation and reasoning.",
        coverage: "Strong",
        tools: [
          ["four-operations", "secure arithmetic and multi-step calculations"],
          ["integer-operations", "develop directed-number operations"],
          ["fractions-practice", "build fraction and mixed-number fluency"],
          ["decimals-practice-lab", "support decimal place value and calculation"],
          ["percentages-real-world", "connect percentages to applied contexts"],
          ["ratio-proportion", "develop proportional reasoning and sharing"],
          ["bar-models", "support visual problem solving and comparison reasoning"],
          ["area-models", "support multiplication, fractions and visual structure"],
          ["linear-equations", "solve equations with clear inverse operations"],
          ["classroom-displays", "project blank grids, shapes and display templates"]
        ],
        teacherMove: "Use representations deliberately: Singapore-style teaching works best when students move from concrete or pictorial models into abstract notation."
      },
      {
        code: "O-Level Mathematics 1",
        title: "O-Level Mathematics: Number, Algebra and Graphs",
        focus: "Indices, standard form, percentages, ratio, rate, algebraic manipulation, formulae, equations, inequalities, functions, graphs, coordinate geometry, approximation and numerical reasoning.",
        coverage: "Strong",
        tools: [
          ["upper-lower-bounds", "develop accuracy, estimation and bounds"],
          ["advanced-factorisation", "support factorising, expanding and algebraic structure"],
          ["algebraic-fractions", "simplify and solve rational expressions"],
          ["linear-equations", "solve linear equations cleanly"],
          ["simultaneous-equations", "solve systems by elimination and substitution"],
          ["quadratic-factorisation", "factorise and solve quadratic equations"],
          ["functions", "connect functions, notation, domain and range"],
          ["straight-lines", "support gradient, intercepts and coordinate geometry"],
          ["graph-transformations-curve-sketching", "connect equations to graph behaviour"],
          ["numerical-methods", "support approximation and iterative thinking"]
        ],
        teacherMove: "Keep equivalent algebraic lines vertical and connect algebra to graphs so students see structure, not just procedures."
      },
      {
        code: "O-Level Mathematics 2",
        title: "O-Level Mathematics: Geometry, Trigonometry, Vectors and Measurement",
        focus: "Angles, polygons, circles, similarity, congruence, transformations, Pythagoras, trigonometry, bearings, mensuration, vectors, scale drawing and spatial reasoning.",
        coverage: "Strong",
        tools: [
          ["polygons-angles", "generate interior and exterior angle problems"],
          ["circle-theorems", "support theorem-based circle reasoning"],
          ["scale-drawing-similar-shapes", "connect similarity, scale factor and ratios"],
          ["pythagoras-theorem", "generate right-triangle side questions"],
          ["trigonometric-ratios", "practise right-angled trigonometry"],
          ["sine-cosine-rule", "extend to non-right-triangle trigonometry"],
          ["bearings", "develop bearing and hidden-bearing reasoning"],
          ["free-vectors", "secure column-vector notation and vector geometry"],
          ["circles-area-circumference", "generate circle area and circumference practice"],
          ["volume-surface-area-prisms", "support volume and surface area practice"]
        ],
        teacherMove: "Start from the diagram and the named rule; students should know whether they are using a theorem, similarity, trigonometry or vector reasoning."
      },
      {
        code: "O-Level Mathematics 3",
        title: "O-Level Mathematics: Statistics, Probability and Data Interpretation",
        focus: "Data representation, averages, spread, cumulative frequency, histograms, probability, set notation, Venn diagrams, conditional probability, scatter diagrams and interpretation.",
        coverage: "Strong",
        tools: [
          ["averages-range", "generate mean, median, mode, range and missing-value practice"],
          ["histograms", "develop frequency-density and grouped-data interpretation"],
          ["cumulative-frequency-curves", "support medians, quartiles and percentiles"],
          ["tree-diagrams-conditional-probability", "generate probability tree questions"],
          ["venn-diagrams", "connect set notation, regions and probability"],
          ["correlation-regression", "support scatter diagrams and correlation"],
          ["sampling-methods-bias", "teach sampling choices and limitations"],
          ["kaizen-large-data-set", "support contextual data interpretation"]
        ],
        teacherMove: "Require interpretation in context: the graph, statistic or probability statement should answer the question being asked."
      },
      {
        code: "Additional Mathematics 1",
        title: "O-Level Additional Mathematics: Algebra, Functions and Graphs",
        focus: "Quadratic functions, polynomial and rational expressions, equations, inequalities, surds, logarithms, exponential functions, modulus, graph transformations, coordinate geometry and advanced algebraic manipulation.",
        coverage: "Strong",
        tools: [
          ["advanced-factorisation", "develop algebraic factor structure and manipulation"],
          ["quadratic-equations", "solve quadratics by several methods"],
          ["functions", "support function notation, inverses and composition"],
          ["graph-transformations-curve-sketching", "connect equations to transformed graphs"],
          ["roots-of-equations", "link roots, factors and graph intersections"],
          ["logarithms-practice", "generate logarithmic and exponential equation practice"],
          ["surds-radicals", "support exact surd simplification and rationalising"],
          ["straight-lines", "support coordinate geometry and gradients"],
          ["transposition-formulae", "build confidence rearranging formulae"],
          ["dynamic-classroom-displays", "animate graph changes for teacher modelling"]
        ],
        teacherMove: "Ask students to explain why a chosen algebraic form is useful: factorised, expanded, completed-square, logarithmic or graphical."
      },
      {
        code: "Additional Mathematics 2",
        title: "O-Level Additional Mathematics: Trigonometry and Calculus",
        focus: "Trigonometric functions, identities, equations, graph transformations, differentiation, rates of change, tangents and normals, stationary points, integration and area under a curve.",
        coverage: "Strong",
        tools: [
          ["trigonometric-functions", "support exact values, identities and proof-style trig"],
          ["trig-equation-solver", "generate trigonometric equation practice"],
          ["trig-graphs-transformations", "show transformed trigonometric graphs"],
          ["limits-first-principles", "support introductory limit and first-principles reasoning"],
          ["differentiation-polynomials", "secure introductory differentiation"],
          ["differentiation-rules", "practise product, quotient and chain rule where needed"],
          ["advanced-differentiation", "develop tangents, normals, stationary points and implicit extension"],
          ["integration", "cover basic and definite integration"],
          ["advanced-integration", "support substitution and integration by parts as extension"]
        ],
        teacherMove: "Make the rule visible before the result; calculus and trigonometry should be shown through clear mathematical lines, not only described in words."
      },
      {
        code: "A-Level H2 Mathematics Pure",
        title: "A-Level H2 Mathematics: Pure Mathematics",
        focus: "Functions, graphs, sequences and series, vectors, complex numbers, calculus, differential equations, numerical methods and proof-oriented algebraic reasoning.",
        coverage: "Strong",
        tools: [
          ["functions", "support function notation, composite and inverse functions"],
          ["graph-transformations-curve-sketching", "connect function behaviour to graphs"],
          ["sequences-series", "generate sequence and series practice"],
          ["series-expansions", "support Taylor and Maclaurin series where needed"],
          ["free-vectors", "secure vector notation and geometry"],
          ["further-vectors", "extend vector reasoning for H2 classes"],
          ["complex-numbers", "support complex arithmetic, polar form and roots"],
          ["advanced-differentiation", "develop implicit, parametric and applied differentiation"],
          ["advanced-integration", "support substitution, parts and algebraic integration"],
          ["differential-equations", "cover differential-equation modelling"],
          ["numerical-methods", "support approximation and iteration"]
        ],
        teacherMove: "Link symbolic methods to graphical and modelling meaning, especially in calculus, vectors and complex numbers."
      },
      {
        code: "A-Level H2 Mathematics Statistics",
        title: "A-Level H2 Mathematics: Probability and Statistics",
        focus: "Permutations, combinations, probability, random variables, binomial and normal distributions, sampling, correlation, regression, hypothesis testing and statistical interpretation.",
        coverage: "Strong",
        tools: [
          ["permutations-combinations", "develop counting, nPr and nCr reasoning"],
          ["tree-diagrams-conditional-probability", "generate conditional probability practice"],
          ["discrete-random-variables", "support probability distributions and expectation"],
          ["binomial-geometric-distribution", "generate binomial and geometric distribution questions"],
          ["normal-distribution", "standardise and use normal distribution probabilities"],
          ["sampling-methods-bias", "support sampling and statistical limitations"],
          ["correlation-regression", "support regression lines and interpretation"],
          ["hypothesis-testing", "develop inference decisions and conclusion wording"],
          ["confidence-intervals", "support interval estimates and interpretation where used"]
        ],
        teacherMove: "State the model and conditions before calculation, then write the conclusion in the context of the problem."
      },
      {
        code: "H2 Further Mathematics",
        title: "A-Level H2 Further Mathematics: Advanced Pure, Statistics and Mechanics Support",
        focus: "Advanced algebra, matrices, linear algebra, complex numbers, polar coordinates, further calculus, differential equations, numerical methods, probability distributions, statistics and mechanics-style modelling.",
        coverage: "Strong",
        tools: [
          ["advanced-matrices", "extend matrix transformations and advanced matrix structure"],
          ["linear-algebra", "support systems, subspaces and linear transformations"],
          ["complex-numbers", "support polar form, roots and loci"],
          ["polar-coordinates", "support polar representation and curve interpretation"],
          ["series-expansions", "generate Taylor and Maclaurin series practice"],
          ["advanced-integration", "support extended integration methods"],
          ["differential-equations", "support separable, first-order linear, second-order and modelling problems"],
          ["continuous-random-variables", "extend probability into density functions and integration"],
          ["poisson-distribution", "support additional distribution practice"],
          ["motion-graphs-constant-acceleration", "support mechanics-style motion modelling"],
          ["newtons-second-law", "model force and acceleration questions"],
          ["work-energy-power", "support work, energy and power modelling"]
        ],
        teacherMove: "Use this as an extension and enrichment route; keep each advanced method anchored to why that method is being used."
      }
    ]
  },
  {
    id: "ontario-mathematics",
    label: "Ontario Mathematics",
    country: "Canada",
    status: "Mapped",
    title: "Ontario Mathematics Curriculum Alignment",
    description: "A curriculum pathway map linking Ontario elementary mathematics, Grade 9 de-streamed mathematics, and senior secondary mathematics courses to Kaizen Maths teaching tools, classroom displays, worked examples, worksheets and assessment practice.",
    basis: "Pilot alignment based on Ontario Mathematics Grades 1-8, Grade 9 de-streamed Mathematics, and senior secondary mathematics course pathways including Principles of Mathematics, Functions, Advanced Functions, Calculus and Vectors, and Mathematics of Data Management.",
    standards: [
      {
        code: "Grades 1-8 Number",
        title: "Elementary Mathematics: Number, Financial Literacy and Problem Solving",
        focus: "Whole numbers, operations, fractions, decimals, percentages, ratio, rate, proportional reasoning, money, financial literacy, estimation, mental strategies and multi-step problem solving.",
        coverage: "Strong",
        tools: [
          ["four-operations", "secure arithmetic and multi-step calculations"],
          ["integer-operations", "develop directed-number operations where needed"],
          ["fractions-practice", "build fraction and mixed-number fluency"],
          ["decimals-practice-lab", "support decimal place value and calculation"],
          ["simple-percentage-tasks", "develop percentage foundations"],
          ["percentages-real-world", "connect percentages to applied and financial contexts"],
          ["ratio-proportion", "support proportional reasoning and sharing"],
          ["financial-real-life-maths", "generate money, wages, discounts, tax and interest contexts"],
          ["bar-models", "support visual comparison and part-whole reasoning"],
          ["area-models", "support arrays, multiplication and fractional reasoning"]
        ],
        teacherMove: "Use visual models first, then move students into number sentences and abstract notation once the structure is clear."
      },
      {
        code: "Grades 1-8 Algebra Data Spatial",
        title: "Elementary Mathematics: Algebra, Data and Spatial Sense",
        focus: "Patterns, variables, equations, coding-style thinking, data collection and displays, probability, measurement, geometry, location, movement, transformations and spatial reasoning.",
        coverage: "Strong",
        tools: [
          ["sequences", "generate pattern and rule practice"],
          ["linear-equations", "solve simple equations with inverse operations"],
          ["functions", "connect mappings, rules and inputs or outputs"],
          ["averages-range", "support data summaries"],
          ["histograms", "extend grouped-data thinking where appropriate"],
          ["tree-diagrams-conditional-probability", "support probability structure"],
          ["venn-diagrams", "connect classification, sets and probability"],
          ["conversions-teaching", "practise measurement conversions"],
          ["area-rectangles", "support area, perimeter and composite figures"],
          ["transformations", "generate translations, reflections, rotations and enlargements"],
          ["classroom-displays", "project grids, shapes, clocks, manipulatives and display templates"]
        ],
        teacherMove: "Keep the representation visible: tables, graphs, diagrams and concrete models should support the written mathematics."
      },
      {
        code: "Grade 9 MTH1W",
        title: "Grade 9 Mathematics: De-Streamed Mathematics",
        focus: "Number, algebra, linear and non-linear relationships, coding and modelling ideas, data, geometry, measurement, financial literacy and mathematical processes.",
        coverage: "Strong",
        tools: [
          ["integer-operations", "repair directed-number fluency"],
          ["fractions-practice", "strengthen rational-number operations"],
          ["ratio-proportion", "support proportional relationships"],
          ["simplification", "collect like terms and simplify expressions"],
          ["bracket-expansion", "expand expressions"],
          ["linear-equations", "solve linear equations"],
          ["inequalities", "solve and represent inequalities"],
          ["straight-lines", "support slope, intercepts and linear relations"],
          ["functions", "connect rules, tables, graphs and notation"],
          ["quadratic-equations", "introduce non-linear relationships where appropriate"],
          ["averages-range", "support data analysis"],
          ["financial-real-life-maths", "connect mathematics to personal finance contexts"]
        ],
        teacherMove: "Use Grade 9 as a bridge year: students should connect numerical, algebraic, graphical and contextual representations of the same idea."
      },
      {
        code: "Grade 10 Mathematics",
        title: "Grade 10 Mathematics: Academic, Applied and Workplace Pathways",
        focus: "Linear systems, analytic geometry, quadratic relationships, measurement, trigonometry, financial applications, proportional reasoning and applied problem solving across pathway levels.",
        coverage: "Strong",
        tools: [
          ["straight-lines", "generate slope, intercept and coordinate-geometry practice"],
          ["simultaneous-equations", "solve systems by substitution and elimination"],
          ["quadratic-factorisation", "factorise and solve quadratic equations"],
          ["quadratic-equations", "extend quadratic methods and graph links"],
          ["graph-transformations-curve-sketching", "connect equations to graph behaviour"],
          ["pythagoras-theorem", "generate right-triangle side questions"],
          ["trigonometric-ratios", "practise right-angled trigonometry"],
          ["area-rectangles", "support area and composite figures"],
          ["volume-surface-area-prisms", "generate volume and surface area practice"],
          ["financial-real-life-maths", "support applied finance and workplace contexts"]
        ],
        teacherMove: "Make pathway differences about support and context, not vague standards: keep core concepts visible and adjust scaffolding."
      },
      {
        code: "Grade 11 Functions",
        title: "Grade 11 Functions and Applications",
        focus: "Functions, transformations, quadratic, polynomial, rational, exponential, logarithmic and trigonometric relationships, rates of change, modelling and applied contexts.",
        coverage: "Strong",
        tools: [
          ["functions", "support function notation, domain, range, inverses and composition"],
          ["graph-transformations-curve-sketching", "connect algebraic changes to graph behaviour"],
          ["advanced-factorisation", "develop polynomial factor structure"],
          ["roots-of-equations", "connect roots, factors and graphs"],
          ["logarithms-practice", "generate exponential and logarithmic equation practice"],
          ["trig-graphs-transformations", "show transformed trigonometric graphs"],
          ["trigonometric-functions", "support exact values, identities and equations"],
          ["straight-lines", "support rates of change and analytic geometry"],
          ["numerical-methods", "support approximation and iterative reasoning"],
          ["dynamic-classroom-displays", "animate graph and parameter changes for teacher modelling"]
        ],
        teacherMove: "Ask students to justify which representation best answers the question: equation, graph, table or context."
      },
      {
        code: "Grade 12 Advanced Functions",
        title: "Grade 12 Advanced Functions",
        focus: "Polynomial, rational, logarithmic, exponential and trigonometric functions; transformations; rates of change; combinations of functions; equations and modelling.",
        coverage: "Strong",
        tools: [
          ["functions", "develop advanced function notation and operations"],
          ["advanced-factorisation", "support polynomial and rational manipulation"],
          ["algebraic-fractions", "simplify rational expressions and equations"],
          ["graph-transformations-curve-sketching", "connect functions to key graph features"],
          ["roots-of-equations", "link factors, roots and intersections"],
          ["logarithms-practice", "support logarithmic and exponential equations"],
          ["trigonometric-functions", "support identities, exact values and proof-style trigonometry"],
          ["trig-equation-solver", "generate trigonometric equation practice"],
          ["trig-graphs-transformations", "show transformed trigonometric graphs"],
          ["sequences-series", "support sequence and series links where needed"]
        ],
        teacherMove: "Keep equivalent forms purposeful: students should know why they are factoring, expanding, transforming or applying logarithms."
      },
      {
        code: "Grade 12 Calculus Vectors",
        title: "Grade 12 Calculus and Vectors",
        focus: "Limits, derivatives, curve sketching, optimisation, related rates, integration connections, vectors, lines and planes, geometric applications and modelling with rates of change.",
        coverage: "Strong",
        tools: [
          ["limits-first-principles", "support limit notation, continuity and first-principles reasoning"],
          ["differentiation-polynomials", "secure introductory differentiation"],
          ["differentiation-rules", "practise product, quotient and chain rule"],
          ["advanced-differentiation", "develop implicit, parametric, tangents, normals, optimisation and related rates"],
          ["integration", "connect antiderivatives, area and accumulation"],
          ["advanced-integration", "extend integration methods where useful"],
          ["graph-transformations-curve-sketching", "support curve sketching with derivative information"],
          ["free-vectors", "secure column-vector notation and vector geometry"],
          ["further-vectors", "extend vector reasoning for senior classes"],
          ["dynamic-classroom-displays", "show gradients, areas and vector movement dynamically"]
        ],
        teacherMove: "Connect every calculation to meaning: gradient, rate of change, area, direction, magnitude or geometric relationship."
      },
      {
        code: "Grade 12 Data Management",
        title: "Grade 12 Mathematics of Data Management",
        focus: "Counting methods, probability, probability distributions, statistics, data analysis, correlation, regression, normal models, sampling, simulations, inference and communication of results.",
        coverage: "Strong",
        tools: [
          ["permutations-combinations", "develop counting, factorial, nPr and nCr reasoning"],
          ["tree-diagrams-conditional-probability", "generate conditional probability practice"],
          ["venn-diagrams", "connect set notation, regions and probability"],
          ["discrete-random-variables", "support probability distributions and expectation"],
          ["binomial-geometric-distribution", "generate binomial and geometric distribution questions"],
          ["normal-distribution", "standardise and use normal distribution probabilities"],
          ["averages-range", "support descriptive statistics"],
          ["histograms", "develop distribution-shape and grouped-data reasoning"],
          ["correlation-regression", "support scatterplots, regression and interpretation"],
          ["sampling-methods-bias", "teach sampling choices, bias and limitations"],
          ["hypothesis-testing", "develop inference decisions and conclusion wording"],
          ["confidence-intervals", "support interval estimates and interpretation"]
        ],
        teacherMove: "Make students state the population, variable, model and conclusion; data management is about communication as much as calculation."
      }
    ]
  },
  {
    id: "australian-curriculum",
    label: "Australian Curriculum",
    country: "Australia",
    status: "Mapped",
    title: "Australian Curriculum Mathematics Alignment",
    description: "A pathway map linking Australian Curriculum Mathematics F-10 and senior secondary Mathematics subjects to Kaizen Maths teaching tools, classroom displays, worked examples, worksheet practice and assessment support.",
    basis: "Pilot alignment based on Australian Curriculum Mathematics Version 9.0 for Foundation to Year 10, organised through Number, Algebra, Measurement, Space, Statistics and Probability, and the senior secondary Mathematics subjects: Essential Mathematics, General Mathematics, Mathematical Methods and Specialist Mathematics.",
    standards: [
      {
        code: "F-6 Number Algebra",
        title: "Foundation to Year 6: Number and Algebra",
        focus: "Counting, place value, operations, fractions, decimals, percentages, patterns, equivalence, simple equations, proportional reasoning and mathematical modelling through concrete, pictorial and abstract representations.",
        coverage: "Strong",
        tools: [
          ["four-operations", "secure whole-number and multi-step calculations"],
          ["fractions-practice", "build fraction and mixed-number fluency"],
          ["decimals-practice-lab", "support decimal place value and calculation"],
          ["simple-percentage-tasks", "introduce percentages and benchmark percentages"],
          ["ratio-proportion", "develop proportional reasoning and sharing"],
          ["bar-models", "support part-whole, comparison and proportional reasoning"],
          ["area-models", "support arrays, multiplication and fraction structure"],
          ["sequences", "generate pattern and rule practice"],
          ["linear-equations", "model simple equations with inverse operations"],
          ["classroom-displays", "project manipulatives, number lines, grids and visual templates"]
        ],
        teacherMove: "Move deliberately from representation to notation; students should explain the model before recording the calculation."
      },
      {
        code: "F-6 Measurement Space Data",
        title: "Foundation to Year 6: Measurement, Space, Statistics and Probability",
        focus: "Length, area, volume, time, money, location, shape, symmetry, transformations, data displays, chance language, simple probability and interpretation of results.",
        coverage: "Strong",
        tools: [
          ["conversions-teaching", "support measurement units and conversion readiness"],
          ["area-rectangles", "develop area, perimeter and composite rectangle reasoning"],
          ["volume-surface-area-prisms", "introduce volume and spatial reasoning where appropriate"],
          ["transformations", "generate translations, reflections, rotations and enlargements"],
          ["missing-angles", "support early angle reasoning"],
          ["averages-range", "introduce data summaries and comparison"],
          ["histograms", "extend grouped-data display thinking where useful"],
          ["tree-diagrams-conditional-probability", "support chance structures"],
          ["venn-diagrams", "connect classification, sets and probability"],
          ["classroom-displays", "project blank grids, shapes, clocks, probability templates and diagrams"]
        ],
        teacherMove: "Keep measurement and data grounded in context: students should say what is being measured, counted or compared."
      },
      {
        code: "Years 7-10 Number Algebra",
        title: "Years 7-10: Number, Algebra, Functions and Modelling",
        focus: "Directed numbers, rational numbers, percentages, ratio, rates, indices, standard form, algebraic manipulation, equations, inequalities, functions, relations, graphs, linear and non-linear modelling.",
        coverage: "Strong",
        tools: [
          ["integer-operations", "repair directed-number fluency"],
          ["fractions-practice", "strengthen rational-number operations"],
          ["percentages-real-world", "connect percentages to real contexts"],
          ["ratio-proportion", "generate ratio, rate and proportion practice"],
          ["exponents-index-notation", "practise powers and index laws"],
          ["powers-of-10", "support standard form and powers of ten"],
          ["simplification", "collect like terms and simplify expressions"],
          ["bracket-expansion", "expand algebraic expressions"],
          ["linear-equations", "solve linear equations cleanly"],
          ["inequalities", "solve and represent inequalities"],
          ["functions", "connect rules, tables, graphs and notation"],
          ["graph-transformations-curve-sketching", "connect equations to graph behaviour"]
        ],
        teacherMove: "Use multiple representations: table, graph, equation and context should describe the same relationship."
      },
      {
        code: "Years 7-10 Measurement Space",
        title: "Years 7-10: Measurement, Space, Geometry and Trigonometry",
        focus: "Metric measurement, area, surface area, volume, similarity, scale, transformations, angle reasoning, circles, Pythagoras, trigonometry, coordinates and geometric modelling.",
        coverage: "Strong",
        tools: [
          ["area-rectangles", "support area, perimeter and composite figures"],
          ["circles-area-circumference", "generate circle area and circumference practice"],
          ["sectors-arc-length", "extend to sectors and arc length"],
          ["volume-surface-area-prisms", "generate volume and surface area practice"],
          ["scale-drawing-similar-shapes", "connect scale factor, similarity and ratio"],
          ["transformations", "generate transformation practice on grids"],
          ["polygons-angles", "support interior and exterior angle reasoning"],
          ["circle-theorems", "support theorem-based circle reasoning where needed"],
          ["pythagoras-theorem", "generate right-triangle side questions"],
          ["trigonometric-ratios", "practise right-angled trigonometry"],
          ["straight-lines", "connect geometry to coordinate graphs"],
          ["dynamic-classroom-displays", "animate transformations and graph changes"]
        ],
        teacherMove: "Start from the diagram and named relationship, then show formula choice, substitution, units and final interpretation."
      },
      {
        code: "Years 7-10 Statistics Probability",
        title: "Years 7-10: Statistics and Probability",
        focus: "Statistical investigation, data displays, summary statistics, variation, sampling, probability experiments, simulations, compound events, two-way tables, Venn diagrams and interpretation.",
        coverage: "Strong",
        tools: [
          ["averages-range", "generate mean, median, mode, range and missing-value practice"],
          ["histograms", "develop grouped-data and distribution-shape reasoning"],
          ["cumulative-frequency-curves", "support medians, quartiles and percentiles"],
          ["sampling-methods-bias", "teach sampling choices, bias and limitations"],
          ["tree-diagrams-conditional-probability", "generate conditional probability and tree diagram practice"],
          ["venn-diagrams", "connect set notation, regions and probability"],
          ["correlation-regression", "support scatter diagrams, trend and interpretation"],
          ["kaizen-large-data-set", "support contextual data interpretation and investigation prompts"]
        ],
        teacherMove: "Ask students to describe variation and context before calculation; the statistic is only useful if it answers the question."
      },
      {
        code: "Senior Essential General",
        title: "Senior Secondary: Essential Mathematics and General Mathematics",
        focus: "Practical numeracy, financial mathematics, measurement, statistics, networks, linear modelling, discrete mathematics, growth and decay, decision making and applied modelling contexts.",
        coverage: "Strong",
        tools: [
          ["financial-real-life-maths", "generate financial, consumer and workplace contexts"],
          ["percentages-real-world", "support percentage change and reverse percentage"],
          ["ratio-proportion", "support rates and proportional modelling"],
          ["conversions-teaching", "support unit and compound-measure contexts"],
          ["straight-lines", "generate linear modelling and graph interpretation"],
          ["functions", "connect rules, inputs and outputs"],
          ["linear-programming", "support optimisation with constraints"],
          ["averages-range", "support summary statistics and interpretation"],
          ["histograms", "develop grouped-data reasoning"],
          ["correlation-regression", "support association, regression and interpolation"],
          ["sampling-methods-bias", "teach sampling, bias and limitations"],
          ["tree-diagrams-conditional-probability", "support applied probability"]
        ],
        teacherMove: "Keep the applied context visible all the way through: calculation, interpretation and decision should sit together."
      },
      {
        code: "Senior Methods",
        title: "Senior Secondary: Mathematical Methods",
        focus: "Functions, graphs, calculus, exponential and logarithmic functions, trigonometry, probability, random variables, binomial and normal distributions, statistical inference and mathematical modelling.",
        coverage: "Strong",
        tools: [
          ["functions", "support function notation, inverses and composition"],
          ["graph-transformations-curve-sketching", "connect functions to key graph features"],
          ["logarithms-practice", "support logarithmic and exponential equations"],
          ["trigonometric-functions", "support identities, exact values and proof-style trig"],
          ["trig-graphs-transformations", "show transformed trigonometric graphs"],
          ["limits-first-principles", "support limits and first-principles reasoning"],
          ["differentiation-polynomials", "secure introductory differentiation"],
          ["differentiation-rules", "practise product, quotient and chain rule"],
          ["advanced-differentiation", "develop implicit, parametric and applications of differentiation"],
          ["integration", "cover basic and definite integration"],
          ["binomial-geometric-distribution", "generate binomial and geometric distribution questions"],
          ["normal-distribution", "standardise and use normal distribution probabilities"],
          ["hypothesis-testing", "develop inference decisions and conclusion wording"]
        ],
        teacherMove: "Link symbolic manipulation to meaning: graph behaviour, rate of change, accumulation, probability model or inference conclusion."
      },
      {
        code: "Senior Specialist",
        title: "Senior Secondary: Specialist Mathematics",
        focus: "Advanced algebra, proof, vectors, complex numbers, matrices, polar coordinates, advanced calculus, differential equations, mechanics-style modelling, probability distributions and deeper mathematical reasoning.",
        coverage: "Strong",
        tools: [
          ["proof-by-induction", "support proof language and induction structure"],
          ["advanced-factorisation", "develop higher algebraic manipulation"],
          ["free-vectors", "secure vector notation and geometry"],
          ["further-vectors", "extend vector reasoning for senior classes"],
          ["matrices", "support matrix operations and transformations"],
          ["advanced-matrices", "extend matrix transformations and advanced structure"],
          ["complex-numbers", "support complex arithmetic, polar form and roots"],
          ["polar-coordinates", "support polar representation and curve interpretation"],
          ["series-expansions", "generate Taylor and Maclaurin series practice"],
          ["advanced-integration", "support extended integration methods"],
          ["differential-equations", "support differential-equation modelling"],
          ["continuous-random-variables", "extend probability into density functions and integration"],
          ["poisson-distribution", "support additional distribution practice"]
        ],
        teacherMove: "Make method choice explicit: students should know why a proof, vector, complex-number, matrix or calculus method is the right tool."
      }
    ]
  },
  {
    id: "finland-mathematics",
    label: "Finland Curriculum",
    country: "Finland",
    status: "Mapped",
    title: "Finland Mathematics Curriculum Alignment",
    description: "A curriculum pathway map linking Finnish basic education mathematics and general upper secondary short and long mathematics to Kaizen Maths teaching tools, classroom displays, worked examples, worksheets and assessment practice.",
    basis: "Pilot alignment based on the Finnish National Core Curriculum for Basic Education and the Finnish general upper secondary mathematics routes, including short mathematics and long mathematics. The map uses broad curriculum areas rather than local school-specific module decisions.",
    standards: [
      {
        code: "Basic Education Number",
        title: "Basic Education: Numbers, Operations and Mathematical Thinking",
        focus: "Number sense, arithmetic fluency, integers, fractions, decimals, percentages, ratio, proportional reasoning, estimation, problem solving, reasoning, patterns and mathematical communication.",
        coverage: "Strong",
        tools: [
          ["four-operations", "secure arithmetic and multi-step calculations"],
          ["integer-operations", "develop directed-number fluency"],
          ["fractions-practice", "build fraction and mixed-number operations"],
          ["decimals-practice-lab", "support decimal place value and calculation"],
          ["simple-percentage-tasks", "introduce percentages and benchmark percentages"],
          ["percentages-real-world", "connect percentages to practical contexts"],
          ["ratio-proportion", "develop proportional reasoning and sharing"],
          ["bar-models", "support visual problem solving and comparison reasoning"],
          ["area-models", "support multiplication, fractions and visual structure"],
          ["classroom-displays", "project manipulatives, number lines, grids and visual templates"]
        ],
        teacherMove: "Keep reasoning visible: students should explain the method and representation, not only produce the answer."
      },
      {
        code: "Basic Education Algebra",
        title: "Basic Education: Algebra, Functions and Modelling",
        focus: "Patterns, variables, expressions, equations, inequalities, coordinate systems, functions, graphs, direct proportion, modelling situations and interpreting mathematical relationships.",
        coverage: "Strong",
        tools: [
          ["sequences", "generate pattern and rule practice"],
          ["simplification", "collect like terms and simplify expressions"],
          ["bracket-expansion", "expand algebraic expressions"],
          ["linear-equations", "solve equations with inverse operations"],
          ["inequalities", "solve and represent inequalities"],
          ["straight-lines", "support coordinate geometry, gradients and linear graphs"],
          ["functions", "connect mappings, rules, domain, range and representations"],
          ["graph-transformations-curve-sketching", "connect equations to graph behaviour"],
          ["ratio-proportion", "support proportional models"],
          ["dynamic-classroom-displays", "animate graph and parameter changes for teacher modelling"]
        ],
        teacherMove: "Move between table, graph, equation and real context so modelling feels connected rather than procedural."
      },
      {
        code: "Basic Education Geometry",
        title: "Basic Education: Geometry, Measurement and Space",
        focus: "Geometric shapes, angle reasoning, transformations, similarity, scale, perimeter, area, surface area, volume, units, coordinates, Pythagoras and introductory trigonometric reasoning where appropriate.",
        coverage: "Strong",
        tools: [
          ["missing-angles", "support angle facts and geometric reasoning"],
          ["polygons-angles", "generate polygon angle questions"],
          ["transformations", "generate translations, reflections, rotations and enlargements"],
          ["scale-drawing-similar-shapes", "connect similarity, scale and ratio"],
          ["conversions-teaching", "practise measurement conversions"],
          ["area-rectangles", "develop area, perimeter and composite figures"],
          ["volume-surface-area-prisms", "support volume and surface area practice"],
          ["circles-area-circumference", "generate circle area and circumference practice"],
          ["pythagoras-theorem", "generate right-triangle side questions"],
          ["trigonometric-ratios", "practise right-angled trigonometry"],
          ["classroom-displays", "project blank grids, shapes and geometry templates"]
        ],
        teacherMove: "Start with the diagram and named relationship, then show the formula, substitution, unit and final interpretation."
      },
      {
        code: "Basic Education Data",
        title: "Basic Education: Data, Statistics and Probability",
        focus: "Collecting, organising and interpreting data, averages, spread, charts, grouped data, probability, chance, simulation, critical interpretation and using evidence to justify conclusions.",
        coverage: "Strong",
        tools: [
          ["averages-range", "generate mean, median, mode, range and missing-value practice"],
          ["histograms", "develop grouped-data and distribution-shape reasoning"],
          ["cumulative-frequency-curves", "support medians, quartiles and percentiles"],
          ["sampling-methods-bias", "teach sampling choices, bias and limitations"],
          ["tree-diagrams-conditional-probability", "generate probability tree questions"],
          ["venn-diagrams", "connect set notation, regions and probability"],
          ["correlation-regression", "support scatter diagrams, trend and interpretation"],
          ["kaizen-large-data-set", "support contextual data interpretation and investigation prompts"]
        ],
        teacherMove: "Ask students to describe what the data shows and what it does not show; interpretation matters as much as calculation."
      },
      {
        code: "Upper Secondary Short",
        title: "General Upper Secondary: Short Mathematics",
        focus: "Everyday mathematical modelling, equations, functions, geometry, financial mathematics, statistics, probability, data interpretation, applied calculus ideas and mathematical reasoning for practical contexts.",
        coverage: "Strong",
        tools: [
          ["functions", "support foundational function notation and modelling"],
          ["linear-equations", "solve equations cleanly"],
          ["simultaneous-equations", "solve systems by elimination and substitution"],
          ["quadratic-equations", "support quadratic methods and graph links"],
          ["graph-transformations-curve-sketching", "connect functions to graph behaviour"],
          ["financial-real-life-maths", "generate money, interest, tax and consumer contexts"],
          ["percentages-real-world", "support percentage change and reverse percentage"],
          ["averages-range", "support descriptive statistics"],
          ["histograms", "develop grouped-data reasoning"],
          ["correlation-regression", "support regression and interpretation"],
          ["normal-distribution", "support normal model calculations"],
          ["hypothesis-testing", "develop inference decisions and conclusion wording"]
        ],
        teacherMove: "Keep the applied context at the centre: students should calculate, interpret and make a decision or conclusion."
      },
      {
        code: "Upper Secondary Long 1",
        title: "General Upper Secondary Long Mathematics: Algebra, Functions, Geometry and Vectors",
        focus: "Advanced algebra, equations, inequalities, functions, graphs, logarithms, exponential models, trigonometry, analytic geometry, vectors, matrices where useful and mathematical modelling.",
        coverage: "Strong",
        tools: [
          ["advanced-factorisation", "develop higher algebraic manipulation"],
          ["algebraic-fractions", "simplify rational expressions and equations"],
          ["functions", "support function notation, inverses and composition"],
          ["graph-transformations-curve-sketching", "connect functions to graph features"],
          ["roots-of-equations", "link roots, factors and graphs"],
          ["logarithms-practice", "generate logarithmic and exponential equation practice"],
          ["trigonometric-functions", "support identities, exact values and proof-style trigonometry"],
          ["trig-graphs-transformations", "show transformed trigonometric graphs"],
          ["free-vectors", "secure vector notation and geometry"],
          ["further-vectors", "extend vector reasoning for advanced classes"],
          ["matrices", "support matrix operations and transformations where useful"],
          ["dynamic-classroom-displays", "animate graph and transformation ideas"]
        ],
        teacherMove: "Ask students why a particular representation or algebraic form is useful before they begin the calculation."
      },
      {
        code: "Upper Secondary Long 2",
        title: "General Upper Secondary Long Mathematics: Calculus and Numerical Methods",
        focus: "Limits, continuity, derivatives, applications of differentiation, integral calculus, area, accumulation, differential equations, approximation, numerical methods and modelling with rates of change.",
        coverage: "Strong",
        tools: [
          ["limits-first-principles", "support limit notation, continuity and first-principles reasoning"],
          ["differentiation-polynomials", "secure introductory differentiation"],
          ["differentiation-rules", "practise product, quotient and chain rule"],
          ["advanced-differentiation", "develop implicit, parametric, tangents, normals and optimisation"],
          ["integration", "cover basic and definite integration"],
          ["advanced-integration", "support substitution and integration by parts"],
          ["differential-equations", "support differential-equation modelling"],
          ["numerical-methods", "support approximation and iterative methods"],
          ["sequences-series", "support sequence and series links"],
          ["dynamic-classroom-displays", "show gradients, areas and graph behaviour dynamically"]
        ],
        teacherMove: "Pair symbolic work with meaning: gradient, rate of change, area, accumulation, approximation or model behaviour."
      },
      {
        code: "Upper Secondary Long 3",
        title: "General Upper Secondary Long Mathematics: Statistics, Probability and Advanced Modelling",
        focus: "Counting, probability, random variables, probability distributions, normal models, statistical inference, correlation, regression, financial mathematics and modelling with uncertainty.",
        coverage: "Strong",
        tools: [
          ["permutations-combinations", "develop counting, factorial, nPr and nCr reasoning"],
          ["tree-diagrams-conditional-probability", "generate conditional probability practice"],
          ["venn-diagrams", "connect set notation, regions and probability"],
          ["discrete-random-variables", "support probability distributions and expectation"],
          ["normal-distribution", "standardise and use normal distribution probabilities"],
          ["poisson-distribution", "support additional distribution practice where useful"],
          ["continuous-random-variables", "extend probability into density functions and integration"],
          ["hypothesis-testing", "develop inference decisions and conclusion wording"],
          ["confidence-intervals", "support interval estimates and interpretation"],
          ["correlation-regression", "support scatterplots, regression and interpretation"],
          ["financial-real-life-maths", "connect modelling to financial decisions"]
        ],
        teacherMove: "Make students state the model, assumptions and conclusion in context, especially when uncertainty is involved."
      }
    ]
  },
  {
    id: "cambridge-igcse",
    label: "Cambridge IGCSE",
    country: "International",
    status: "Mapped",
    title: "Cambridge IGCSE Mathematics Curriculum Alignment",
    description: "A syllabus-area map from Cambridge IGCSE Mathematics to Kaizen Maths topic generators, classroom displays, worked examples, worksheet tools, and assessment practice.",
    basis: "Pilot alignment based on Cambridge IGCSE Mathematics 0580 topic areas, with extension links for Cambridge IGCSE International Mathematics 0607 and Cambridge IGCSE Additional Mathematics 0606 where the Kaizen tool library already supports the content.",
    standards: [
      {
        code: "0580-1",
        title: "Number",
        focus: "Number operations, directed numbers, fractions, decimals, percentages, ratio, proportion, standard form, estimation, bounds, indices, surds and calculator accuracy.",
        coverage: "Strong",
        tools: [
          ["four-operations", "secure arithmetic with integers, decimals and negatives"],
          ["fractions-practice", "develop fraction and mixed-number operations"],
          ["decimals-practice-lab", "support decimal place value and decimal calculations"],
          ["percentages-real-world", "generate percentage increase, decrease and reverse percentage practice"],
          ["ratio-proportion", "practise ratio, proportion and sharing"],
          ["powers-of-10", "support standard form and powers of ten"],
          ["upper-lower-bounds", "develop rounding, error intervals and bounds"],
          ["surds-radicals", "extend exact-number work with surds where needed"]
        ],
        teacherMove: "Use this strand diagnostically; number weaknesses usually reappear later in algebra, mensuration and probability."
      },
      {
        code: "0580-2",
        title: "Algebra and Graphs",
        focus: "Algebraic notation, substitution, simplifying, expanding, factorising, equations, inequalities, sequences, formulae, graphs, functions and quadratic relationships.",
        coverage: "Strong",
        tools: [
          ["substitution", "practise substitution into expressions and formulae"],
          ["simplification", "collect like terms and simplify expressions"],
          ["bracket-expansion", "expand single and double brackets"],
          ["advanced-factorisation", "develop common-factor, grouping and quadratic factorisation"],
          ["linear-equations", "solve linear equations from simple to complex forms"],
          ["inequalities", "solve and represent inequalities"],
          ["quadratic-equations", "solve quadratics by factorising, completing the square and formula methods"],
          ["sequences", "generate sequence and nth-term practice"],
          ["functions", "support function notation, mappings and inverse/composite work"],
          ["graph-transformations-curve-sketching", "connect equations to graph shapes and transformations"]
        ],
        teacherMove: "Keep each algebraic line equivalent to the previous one and connect the graph, table and equation where possible."
      },
      {
        code: "0580-3",
        title: "Coordinate Geometry",
        focus: "Coordinates, gradients, equations of straight lines, parallel and perpendicular lines, intersections, distance, midpoint and coordinate problem solving.",
        coverage: "Strong",
        tools: [
          ["straight-lines", "generate gradient, line equation, intercept and coordinate practice"],
          ["functions", "connect input-output rules to coordinate pairs"],
          ["graph-transformations-curve-sketching", "support coordinate graph interpretation"],
          ["equation-of-a-circle", "extend coordinate work for stronger IGCSE groups"],
          ["classroom-displays", "project blank grids, axes and coordinate templates"]
        ],
        teacherMove: "Ask students to identify whether the question needs gradient, equation, distance, midpoint or intersection before calculating."
      },
      {
        code: "0580-4",
        title: "Geometry",
        focus: "Angle facts, triangles, quadrilaterals, polygons, symmetry, similarity, congruence, circle theorems, constructions, loci and geometric reasoning.",
        coverage: "Strong",
        tools: [
          ["missing-angles", "practise line, triangle, quadrilateral and parallel-line angle facts"],
          ["polygons-angles", "generate interior and exterior angle problems"],
          ["circle-theorems", "develop circle angle and tangent reasoning"],
          ["loci-constructions", "support construction and loci diagrams"],
          ["scale-drawing-similar-shapes", "connect similarity, scale factor and shape reasoning"],
          ["formal-geometric-proof", "support theorem and reasoning chains"],
          ["concept-explainer", "project shape-property explanations one feature at a time"]
        ],
        teacherMove: "Require students to name the geometric fact or theorem before they calculate; this builds exam-style reasoning."
      },
      {
        code: "0580-5",
        title: "Mensuration",
        focus: "Perimeter, area, compound shapes, circumference, circle area, arc length, sector area, surface area, volume, prisms, cylinders, cones, spheres and units.",
        coverage: "Strong",
        tools: [
          ["area-rectangles", "support area, perimeter and compound-shape practice"],
          ["area-triangles", "develop triangle and related plane-area questions"],
          ["circles-area-circumference", "generate circumference and circle-area practice"],
          ["sectors-arc-length", "extend to arcs, sectors and segment contexts"],
          ["volume-surface-area-prisms", "develop volume and surface area of prisms"],
          ["cylinders-cones-volume-surface-area", "support cylinder and cone problems"],
          ["pyramids-spheres-volume-surface-area", "extend to pyramids and spheres"],
          ["conversions-teaching", "practise unit conversion and compound units"]
        ],
        teacherMove: "Keep formula choice, substitution, units and final rounding visible; most errors come from using the wrong measure or unit."
      },
      {
        code: "0580-6",
        title: "Trigonometry",
        focus: "Right-angled trigonometry, Pythagoras' theorem, bearings, sine rule, cosine rule, area of a triangle and three-dimensional applications where required.",
        coverage: "Strong",
        tools: [
          ["pythagoras-theorem", "generate right-triangle side problems"],
          ["trigonometric-ratios", "practise SOHCAHTOA and right-triangle contexts"],
          ["sine-cosine-rule", "extend to non-right triangles and triangle area"],
          ["bearings", "develop three-figure bearings and hidden-bearing reasoning"],
          ["classroom-displays", "project blank triangle and bearing diagrams"],
          ["dynamic-classroom-displays", "use dynamic visuals for graph and transformation support"]
        ],
        teacherMove: "Use the diagram to decide the trigonometric model first, then show substitution and rearrangement without skipping steps."
      },
      {
        code: "0580-7",
        title: "Vectors and Transformations",
        focus: "Translations, reflections, rotations, enlargements, combined transformations, column vectors, vector arithmetic and geometric vector interpretation.",
        coverage: "Strong",
        tools: [
          ["transformations", "generate coordinate transformation questions"],
          ["dynamic-classroom-displays", "animate transformations for teacher modelling"],
          ["free-vectors", "practise column vectors, scalar multiples and vector geometry"],
          ["scale-drawing-similar-shapes", "connect enlargement to scale factor and similarity"],
          ["classroom-displays", "project blank coordinate grids and transformation templates"]
        ],
        teacherMove: "Keep vectors in column form and make students describe the transformation fully: type, direction, centre, mirror line or scale factor."
      },
      {
        code: "0580-8",
        title: "Probability",
        focus: "Probability scale, mutually exclusive events, relative frequency, Venn diagrams, tree diagrams, independent and dependent events, and conditional reasoning where appropriate.",
        coverage: "Strong",
        tools: [
          ["tree-diagrams-conditional-probability", "generate tree diagrams and conditional probability practice"],
          ["venn-diagrams", "connect set notation, regions and probabilities"],
          ["fractions-practice", "repair fraction arithmetic needed for probability"],
          ["simple-percentage-tasks", "connect probability written as fractions, decimals and percentages"],
          ["classroom-displays", "project blank Venn and probability templates"]
        ],
        teacherMove: "Ask students to describe the event in words before writing the fraction, decimal or probability notation."
      },
      {
        code: "0580-9",
        title: "Statistics",
        focus: "Data collection, tables, charts, averages, range, grouped data, histograms, cumulative frequency, scatter diagrams, correlation and interpretation.",
        coverage: "Strong",
        tools: [
          ["averages-range", "generate mean, median, mode, range and missing-value questions"],
          ["histograms", "develop frequency-density and grouped-data reasoning"],
          ["cumulative-frequency-curves", "work with ogives, medians, quartiles and percentiles"],
          ["correlation-regression", "support scatter diagrams, correlation and regression lines"],
          ["sampling-methods-bias", "teach sampling choices and bias where required"],
          ["kaizen-large-data-set", "support contextual data interpretation"]
        ],
        teacherMove: "Require interpretation in context: students should say what the graph, average, spread or trend tells them."
      },
      {
        code: "0607",
        title: "Cambridge IGCSE International Mathematics Extension",
        focus: "Extended modelling, functions, sets, transformations, vectors, graphical interpretation, statistics and problem solving in international IGCSE-style contexts.",
        coverage: "Strong",
        tools: [
          ["functions", "develop functions, mappings, domains, ranges and inverse/composite ideas"],
          ["venn-diagrams", "support set notation, subsets and regions"],
          ["dynamic-classroom-displays", "model graph and transformation ideas dynamically"],
          ["graph-transformations-curve-sketching", "support graphical interpretation and transformed curves"],
          ["correlation-regression", "support scatter diagrams and trend interpretation"],
          ["interface-guide", "support teacher workflow for classroom practice, worked examples and printable resources"]
        ],
        teacherMove: "Use this row for international IGCSE classes that need stronger modelling, graph interpretation and function language."
      },
      {
        code: "0606",
        title: "Cambridge IGCSE Additional Mathematics",
        focus: "Functions, quadratics, inequalities, indices and surds, factors of polynomials, logarithmic and exponential functions, circular measure, trigonometry, permutations, combinations, binomial expansion, vectors, matrices, differentiation and integration.",
        coverage: "Strong",
        tools: [
          ["functions", "develop advanced function notation and transformations"],
          ["quadratic-equations", "support quadratics, equations and graphs"],
          ["advanced-factorisation", "develop polynomial factor structure"],
          ["logarithms-practice", "generate logarithmic and exponential equation practice"],
          ["trigonometric-functions", "support exact trig values, identities and proof"],
          ["permutations-combinations", "generate counting practice"],
          ["binomial-expansion", "support binomial coefficients and expansions"],
          ["matrices", "introduce matrix operations and transformations"],
          ["differentiation-polynomials", "secure introductory differentiation"],
          ["integration", "cover basic integration and definite integrals"]
        ],
        teacherMove: "Treat this as the bridge between IGCSE and A-level: make notation, algebraic steps and calculus rules explicit."
      }
    ]
  },
  {
    id: "uk-a-level-mathematics",
    label: "UK A-Level Maths",
    country: "United Kingdom",
    status: "Mapped",
    title: "UK A-Level Mathematics Curriculum Alignment",
    description: "A content-area map from UK AS and A-level Mathematics to Kaizen Maths pure mathematics, statistics, mechanics, classroom-display, worked-example, worksheet, and assessment tools.",
    basis: "Pilot alignment based on the UK AS and A-level Mathematics subject-content structure used across awarding organisations: overarching mathematical themes, pure mathematics, statistics, and mechanics.",
    standards: [
      {
        code: "OT1-OT3",
        title: "Overarching Themes: Argument, Problem Solving and Modelling",
        focus: "Mathematical argument, language and proof; mathematical problem solving; modelling assumptions, interpretation, units, accuracy and limitations.",
        coverage: "Strong",
        tools: [
          ["proof-by-induction", "develop formal argument and proof language"],
          ["formal-geometric-proof", "support statement-reason proof chains"],
          ["dynamic-classroom-displays", "model concepts dynamically before formalising"],
          ["classroom-displays", "project diagrams, blank templates and modelling spaces for explanation"],
          ["interface-guide", "support teacher workflow for classroom routines, worked examples and printable practice"]
        ],
        teacherMove: "Make students state assumptions, justify each mathematical step, and interpret the result in the original context."
      },
      {
        code: "A: Proof",
        title: "Pure Mathematics: Proof",
        focus: "Mathematical proof by deduction, exhaustion and contradiction, including proof language and clear chains of reasoning.",
        coverage: "Strong",
        tools: [
          ["proof-by-induction", "model proof structure, assumptions, inductive steps, and conclusions"],
          ["formal-geometric-proof", "develop statement-reason proof habits"],
          ["advanced-factorisation", "support algebraic structure used in proof"],
          ["sequences-series", "connect sequence identities to proof and generalisation"]
        ],
        teacherMove: "Separate the claim, the assumption, the algebraic step, and the conclusion so students see why the proof is complete."
      },
      {
        code: "B-C",
        title: "Pure Mathematics: Algebra and Functions",
        focus: "Algebraic manipulation, indices and surds, quadratics, simultaneous equations, inequalities, algebraic fractions, partial fractions, functions, composite functions, inverse functions and graph transformations.",
        coverage: "Strong",
        tools: [
          ["advanced-factorisation", "develop advanced factorising and algebraic structure"],
          ["algebraic-fractions", "simplify and solve with algebraic fractions"],
          ["partial-fractions", "decompose rational expressions before integration"],
          ["quadratic-equations", "solve quadratics by multiple methods"],
          ["simultaneous-equations", "solve systems algebraically"],
          ["functions", "develop function notation, composition, inverses, domain and range"],
          ["graph-transformations-curve-sketching", "connect algebraic changes to graph behaviour"]
        ],
        teacherMove: "Keep notation precise and show equivalent algebraic lines vertically; this is the repair strand for many A-level errors."
      },
      {
        code: "D",
        title: "Pure Mathematics: Coordinate Geometry in the x-y Plane",
        focus: "Straight-line graphs, gradients, equations of lines, circles, intersections, tangents, parametric ideas and coordinate geometry problem solving.",
        coverage: "Strong",
        tools: [
          ["straight-lines", "generate gradient, line equation and coordinate-geometry practice"],
          ["equation-of-a-circle", "connect centre, radius, tangents and intersections"],
          ["graph-transformations-curve-sketching", "support curve sketching and coordinate reasoning"],
          ["advanced-differentiation", "link tangents, normals and gradients to calculus"],
          ["dynamic-classroom-displays", "show graph changes and coordinate behaviour dynamically"]
        ],
        teacherMove: "Use diagrams to identify the geometric relationship, then write the algebraic condition or equation."
      },
      {
        code: "E-F",
        title: "Pure Mathematics: Sequences, Series, Trigonometry, Exponentials and Logarithms",
        focus: "Arithmetic and geometric sequences and series, sigma notation, binomial expansion, trigonometric ratios and identities, trigonometric equations, radians, exponentials, logarithms and transformed graphs.",
        coverage: "Strong",
        tools: [
          ["sequences-series", "generate arithmetic and geometric sequence and series practice"],
          ["binomial-expansion", "support binomial coefficients, selected terms and approximations"],
          ["trigonometric-functions", "develop exact values, identities and proof-style trig"],
          ["trig-equation-solver", "solve trigonometric equations"],
          ["trig-graphs-transformations", "show and practise transformed trig graphs"],
          ["logarithms-practice", "solve exponential and logarithmic equations"]
        ],
        teacherMove: "Connect the symbolic rule to the graph or sequence structure before asking students to generalise."
      },
      {
        code: "G-H",
        title: "Pure Mathematics: Differentiation and Integration",
        focus: "Derivative notation, gradients, stationary points, tangents and normals, differentiation rules, integration as reverse differentiation, definite integrals, area under curves, substitution, parts and applications.",
        coverage: "Strong",
        tools: [
          ["differentiation-polynomials", "secure introductory polynomial differentiation"],
          ["differentiation-rules", "practise product, quotient and chain rule"],
          ["advanced-differentiation", "develop implicit, parametric, tangents, normals and related rates"],
          ["integration", "cover basic integration, definite integrals and trapezium rule readiness"],
          ["advanced-integration", "practise integration by substitution and by parts"],
          ["integration-algebraic-fractions", "integrate algebraic fractions"],
          ["volumes-of-revolution", "extend integration into generated volume practice"]
        ],
        teacherMove: "Show the rule, the substitution into the rule, and the simplified result; do not rely on verbal shortcuts."
      },
      {
        code: "I-J",
        title: "Pure Mathematics: Numerical Methods and Vectors",
        focus: "Solving equations numerically, iteration, sign change, Newton-Raphson, trapezium rule, vector notation, vector equations, geometric vector reasoning and modelling.",
        coverage: "Strong",
        tools: [
          ["numerical-methods", "generate bisection, fixed-point iteration, Newton-Raphson and trapezium-rule practice"],
          ["roots-of-equations", "support roots and equation transformations"],
          ["free-vectors", "use column vectors, scalar multiples and geometric vector reasoning"],
          ["further-vectors", "extend vector work for stronger A-level and Further Maths classes"],
          ["dynamic-classroom-displays", "provide visual support for vector and graph behaviour"]
        ],
        teacherMove: "Keep iteration tables, approximation statements and column-vector notation clean so students can follow the method."
      },
      {
        code: "K-L",
        title: "Statistics: Statistical Sampling and Data Presentation",
        focus: "Sampling methods, bias, large data set awareness, diagrams, measures of location and spread, coding, outliers, histograms and cumulative frequency.",
        coverage: "Strong",
        tools: [
          ["sampling-methods-bias", "teach sampling choices, bias and limitations"],
          ["kaizen-large-data-set", "support large-data-set familiarisation and contextual questions"],
          ["averages-range", "practise averages, spread and choosing appropriate measures"],
          ["histograms", "develop frequency density and grouped-data interpretation"],
          ["cumulative-frequency-curves", "work with ogives, medians, quartiles and percentiles"],
          ["correlation-regression", "support scatter diagrams, correlation and regression"]
        ],
        teacherMove: "Require students to interpret data in context and comment on reliability, outliers and suitability of the method."
      },
      {
        code: "M-N",
        title: "Statistics: Probability and Statistical Distributions",
        focus: "Probability laws, mutually exclusive and independent events, conditional probability, discrete random variables, binomial distribution, normal distribution, hypothesis testing and inference.",
        coverage: "Strong",
        tools: [
          ["tree-diagrams-conditional-probability", "generate tree diagrams and conditional probability practice"],
          ["venn-diagrams", "connect probability to sets, intersections and complements"],
          ["discrete-random-variables", "support probability distributions and expectation"],
          ["binomial-geometric-distribution", "generate binomial and geometric distribution practice"],
          ["normal-distribution", "standardise and use normal distribution probabilities"],
          ["hypothesis-testing", "develop hypothesis-test decisions and inference wording"],
          ["poisson-distribution", "extend distribution work where required"]
        ],
        teacherMove: "Make the distribution, parameter values, tail direction and final inference explicit in every worked solution."
      },
      {
        code: "O-R",
        title: "Mechanics: Quantities, Kinematics, Forces, Newton's Laws and Moments",
        focus: "Modelling assumptions, units, constant acceleration, SUVAT, motion graphs, forces, resultant force, F = ma, connected particles, friction, equilibrium, moments and projectiles.",
        coverage: "Strong",
        tools: [
          ["motion-graphs-constant-acceleration", "interpret distance-time and velocity-time graphs"],
          ["equations-of-motion", "generate SUVAT and constant-acceleration problems"],
          ["newtons-second-law", "model resultant force and F = ma problems"],
          ["friction", "develop rough-surface and inclined-plane mechanics"],
          ["moments", "practise turning effects, beams and equilibrium"],
          ["projectiles", "generate projectile-motion questions"],
          ["work-energy-power", "extend mechanics into energy and power contexts"],
          ["momentum", "support impulse and momentum modelling"]
        ],
        teacherMove: "Start with a diagram and a positive direction, then write the model equation before substituting values."
      }
    ]
  },
  {
    id: "uk-further-mathematics",
    label: "UK Further Maths",
    country: "United Kingdom",
    status: "Mapped",
    title: "UK Further Mathematics Curriculum Alignment",
    description: "A content-area map from UK AS and A-level Further Mathematics to Kaizen Maths advanced pure, further statistics, further mechanics, discrete mathematics, worked-example, worksheet, and classroom-display tools.",
    basis: "Pilot alignment based on the UK AS and A-level Further Mathematics subject-content structure used across awarding organisations: overarching mathematical themes, core pure content, optional further pure, further statistics, further mechanics, and discrete or decision mathematics routes.",
    standards: [
      {
        code: "OT1-OT3",
        title: "Overarching Themes: Proof, Problem Solving and Modelling",
        focus: "Constructing rigorous arguments, using precise mathematical language, selecting methods, modelling assumptions, interpreting results and evaluating limitations.",
        coverage: "Strong",
        tools: [
          ["proof-by-induction", "model formal proof language and inductive reasoning"],
          ["formal-geometric-proof", "support structured statement-reason proof"],
          ["dynamic-classroom-displays", "visualise advanced concepts before formal work"],
          ["classroom-displays", "project clean diagrams and blank modelling spaces"],
          ["interface-guide", "support the classroom workflow for examples, steps and practice"]
        ],
        teacherMove: "Make proof structure and modelling decisions visible: students should know what is assumed, what is proved and why the conclusion follows."
      },
      {
        code: "CP1",
        title: "Core Pure: Complex Numbers and Roots of Polynomials",
        focus: "Complex arithmetic, Argand diagrams, modulus-argument form, conjugates, roots of equations, polynomial roots, De Moivre links and geometric interpretation.",
        coverage: "Strong",
        tools: [
          ["complex-numbers", "generate complex-number arithmetic, polar form, roots and loci practice"],
          ["roots-of-equations", "support roots, transformations and equation structure"],
          ["polar-coordinates", "connect polar representation to complex-number geometry"],
          ["graph-transformations-curve-sketching", "support polynomial and curve interpretation"],
          ["advanced-factorisation", "develop algebraic factor structure used with polynomial roots"]
        ],
        teacherMove: "Keep rectangular form, modulus-argument form and the geometric interpretation connected, especially when moving to roots and loci."
      },
      {
        code: "CP2",
        title: "Core Pure: Matrices and Linear Algebra",
        focus: "Matrix operations, inverses, determinants, transformations, systems of equations, eigenvalues, eigenvectors, diagonalisation and linear algebra structure.",
        coverage: "Strong",
        tools: [
          ["matrices", "secure matrix arithmetic, determinants, inverses and algebraic entries"],
          ["advanced-matrices", "develop transformations, eigenvalues, eigenvectors and diagonalisation"],
          ["linear-algebra", "support systems, subspaces, independence and linear transformations"],
          ["simultaneous-equations", "connect matrix methods to systems of equations"],
          ["dynamic-classroom-displays", "visualise transformations where helpful"]
        ],
        teacherMove: "Insist that matrix equality, transformations and eigenvalue equations are written explicitly before calculation shortcuts."
      },
      {
        code: "CP3",
        title: "Core Pure: Further Algebra, Series and Methods",
        focus: "Advanced algebraic manipulation, partial fractions, summations, method of differences, Maclaurin and Taylor series, inequalities and structured exact work.",
        coverage: "Strong",
        tools: [
          ["partial-fractions", "decompose rational expressions with detailed steps"],
          ["series-expansions", "generate Taylor, Maclaurin and series expansion practice"],
          ["sequences-series", "support sigma notation, sums and sequence structure"],
          ["advanced-factorisation", "develop harder algebraic manipulation and factorising"],
          ["numerical-methods", "support approximation and iterative methods where courses include them"]
        ],
        teacherMove: "Show the substitution or decomposition line before simplifying; advanced algebra still needs visible structure."
      },
      {
        code: "CP4",
        title: "Core Pure: Further Calculus and Differential Equations",
        focus: "Advanced differentiation, integration techniques, volumes of revolution, improper or extended integrals where required, first-order and second-order differential equations and modelling.",
        coverage: "Strong",
        tools: [
          ["advanced-differentiation", "develop implicit, parametric, tangent, normal and related-rate questions"],
          ["advanced-integration", "practise integration by substitution and by parts"],
          ["integration-algebraic-fractions", "integrate rational algebraic expressions"],
          ["volumes-of-revolution", "generate volumes of revolution practice"],
          ["differential-equations", "cover separable, first-order linear, second-order and modelling problems"]
        ],
        teacherMove: "Make the method choice explicit: identify the form first, then carry out the substitution, integration by parts or differential-equation setup."
      },
      {
        code: "CP5",
        title: "Core Pure: Polar Coordinates, Hyperbolic Functions and Vectors",
        focus: "Polar curves, area in polar coordinates, hyperbolic functions and identities, inverse hyperbolic functions, three-dimensional vectors and vector equations.",
        coverage: "Strong",
        tools: [
          ["polar-coordinates", "generate polar coordinate conversion, curve and graph practice"],
          ["hyperbolic-functions", "support hyperbolic identities, equations and calculus links"],
          ["further-vectors", "develop 3D vectors, lines, planes and vector geometry"],
          ["free-vectors", "secure column-vector notation and vector operations"],
          ["dynamic-classroom-displays", "visualise graphs, polar curves and vector behaviour"]
        ],
        teacherMove: "Use diagrams and notation together: polar and vector topics are much clearer when the geometry and algebra are shown side by side."
      },
      {
        code: "FP",
        title: "Optional Further Pure: Extended Algebra, Calculus, Geometry and Number",
        focus: "Optional further pure topics such as extended complex numbers, conics, groups, number theory, additional differential equations, further matrices and advanced geometry.",
        coverage: "Partial",
        tools: [
          ["complex-numbers", "extend complex-number practice and geometric interpretation"],
          ["linear-algebra", "support additional matrix and vector-space ideas"],
          ["advanced-matrices", "extend matrix transformation and eigenvalue work"],
          ["differential-equations", "support higher-level differential-equation practice"],
          ["polar-coordinates", "support conic and polar-style representation where useful"]
        ],
        teacherMove: "Use this as a support map for optional pure routes; specialist topics such as groups or full conics may need teacher-led examples until dedicated tools are added."
      },
      {
        code: "FS",
        title: "Further Statistics: Distributions, Inference, Regression and Modelling",
        focus: "Discrete random variables, probability generating ideas where required, Poisson and normal models, hypothesis tests, confidence intervals, correlation, regression and interpretation.",
        coverage: "Strong",
        tools: [
          ["discrete-random-variables", "support distributions, expectation and variance"],
          ["poisson-distribution", "generate Poisson distribution practice"],
          ["normal-distribution", "standardise and use normal distribution probabilities"],
          ["hypothesis-testing", "develop inference decisions with clear wording"],
          ["correlation-regression", "support regression lines, interpolation and correlation strength"],
          ["continuous-random-variables", "extend probability work into density functions and integration"]
        ],
        teacherMove: "Require students to state the model, parameter values, tail or test direction and final conclusion in context."
      },
      {
        code: "FM",
        title: "Further Mechanics: Momentum, Energy, Forces and Extended Motion",
        focus: "Momentum and impulse, work, energy and power, projectiles, variable or extended forces where required, friction, moments, connected particles and mechanics modelling.",
        coverage: "Strong",
        tools: [
          ["momentum", "generate momentum and impulse modelling questions"],
          ["work-energy-power", "support work, energy, power and efficiency"],
          ["newtons-second-law", "model resultant force and F = ma"],
          ["friction", "develop rough-surface and inclined-plane questions"],
          ["moments", "practise equilibrium and turning effects"],
          ["projectiles", "generate projectile-motion problems"],
          ["equations-of-motion", "repair SUVAT and constant-acceleration fluency"]
        ],
        teacherMove: "Start with a clear diagram and a chosen positive direction, then decide whether the model is force, energy, momentum or equilibrium."
      },
      {
        code: "D1-D2",
        title: "Discrete or Decision Mathematics: Algorithms, Networks and Optimisation",
        focus: "Algorithms, networks, graph theory, route inspection, critical path analysis, linear programming, allocation, matching and optimisation.",
        coverage: "Partial",
        tools: [
          ["linear-programming", "support optimisation with constraints and feasible regions"],
          ["permutations-combinations", "develop counting structures useful in discrete reasoning"],
          ["numerical-methods", "support iterative and algorithmic thinking"],
          ["proof-by-induction", "develop formal reasoning about repeated or recursive processes"],
          ["classroom-displays", "project blank graph, grid and network-style diagrams for teacher-led modelling"]
        ],
        teacherMove: "This is a partial alignment: use the existing tools for optimisation and algorithmic reasoning, then add dedicated network and graph-theory tools when needed."
      }
    ]
  },
  {
    id: "csec",
    label: "CSEC",
    country: "Caribbean",
    status: "Mapped",
    title: "CSEC Mathematics Curriculum Alignment",
    description: "A syllabus-section map from CSEC Mathematics to Kaizen Maths working tools, classroom displays, worked examples, worksheet generators, and exam-preparation practice.",
    basis: "Pilot alignment based on the CXC CSEC Mathematics syllabus sections: Computation, Number Theory, Consumer Arithmetic, Sets, Measurement, Statistics, Algebra, Relations, Functions and Graphs, Geometry and Trigonometry, and Vectors and Matrices.",
    standards: [
      {
        code: "Section 1",
        title: "Computation",
        focus: "Whole-number operations, integers, decimals, fractions, percentages, approximations, order of operations, mental calculation, and numerical accuracy.",
        coverage: "Strong",
        tools: [
          ["four-operations", "secure addition, subtraction, multiplication, and division"],
          ["order-of-operations", "build order-of-operations fluency with brackets and directed numbers"],
          ["integer-operations", "practise negative-number operations and directed-number contexts"],
          ["fractions-practice", "develop fraction and mixed-number arithmetic"],
          ["decimals-practice-lab", "support decimal place value, multiplication, and division"]
        ],
        teacherMove: "Use this section diagnostically before algebra or measurement; computation weakness will usually surface later as method errors."
      },
      {
        code: "Section 2",
        title: "Number Theory",
        focus: "Factors, multiples, primes, HCF, LCM, powers, roots, number bases, number sets, rational and irrational numbers, and exact notation.",
        coverage: "Strong",
        tools: [
          ["hcf-lcm", "generate HCF, LCM, prime-factorisation, and algebraic factor practice"],
          ["number-bases-number-sets", "support number bases and classification of number sets"],
          ["exponents-index-notation", "practise powers, roots, and index laws"],
          ["surds-radicals", "extend exact-value work with surds and radicals"],
          ["fractions-practice", "repair rational-number fluency when needed"]
        ],
        teacherMove: "Make students justify the number set or factor structure rather than only giving a numerical answer."
      },
      {
        code: "Section 3",
        title: "Consumer Arithmetic",
        focus: "Money, wages, bills, profit and loss, discounts, tax, simple and compound interest, hire purchase, depreciation, exchange rates, and real-life financial decisions.",
        coverage: "Strong",
        tools: [
          ["financial-real-life-maths", "generate finance, money, wage, tax, profit, interest, and depreciation problems"],
          ["percentages-real-world", "practise contextual percentage increase, decrease, and reverse percentage"],
          ["simple-percentage-tasks", "build percentage fluency before financial contexts"],
          ["ratio-proportion", "support unit rates and proportional comparisons"],
          ["conversions-teaching", "connect currency, units, and compound measures"]
        ],
        teacherMove: "Keep the real decision visible: students should know whether they are comparing cost, saving, profit, rate, or final amount."
      },
      {
        code: "Section 4",
        title: "Sets",
        focus: "Set notation, subsets, union, intersection, complement, Venn diagrams, regions, cardinality, and probability links.",
        coverage: "Strong",
        tools: [
          ["venn-diagrams", "generate two-set and three-set Venn diagram practice with notation and probability"],
          ["classroom-displays", "project blank Venn diagrams and set templates"],
          ["number-bases-number-sets", "connect number-set classification to set language"],
          ["tree-diagrams-conditional-probability", "extend from set regions to conditional probability structures"]
        ],
        teacherMove: "Translate every notation statement into words first, then locate the exact Venn region."
      },
      {
        code: "Section 5",
        title: "Measurement",
        focus: "Units, perimeter, area, circumference, sectors, volume, surface area, scale drawings, bearings, compound measures, accuracy, and bounds.",
        coverage: "Strong",
        tools: [
          ["conversions-teaching", "practise unit conversions and compound measures"],
          ["area-rectangles", "support area, perimeter, and composite rectangles"],
          ["circles-area-circumference", "generate circle area and circumference questions"],
          ["sectors-arc-length", "extend to sectors and arc length"],
          ["volume-surface-area-prisms", "develop prism volume and surface area"],
          ["cylinders-cones-volume-surface-area", "extend measurement work to cylinders and cones"],
          ["upper-lower-bounds", "support accuracy, error intervals, and bounds"]
        ],
        teacherMove: "Make formula choice, substitution, units, and rounding decisions explicit in each worked solution."
      },
      {
        code: "Section 6",
        title: "Statistics",
        focus: "Data collection, sampling, tables, charts, averages, range, grouped data, histograms, cumulative frequency, scatter diagrams, correlation, and interpretation.",
        coverage: "Strong",
        tools: [
          ["averages-range", "practise mean, median, mode, range, and missing values"],
          ["histograms", "develop grouped data and frequency-density reasoning"],
          ["cumulative-frequency-curves", "work with ogives, quartiles, medians, and percentiles"],
          ["correlation-regression", "support scatter diagrams, correlation, regression, and interpretation"],
          ["sampling-methods-bias", "teach sampling methods and bias"],
          ["kaizen-large-data-set", "provide larger-data interpretation practice"]
        ],
        teacherMove: "Require students to interpret the statistic or graph in context, especially where data reliability or sampling is involved."
      },
      {
        code: "Section 7",
        title: "Algebra",
        focus: "Algebraic notation, substitution, simplifying, expanding, factorising, equations, inequalities, formulae, algebraic fractions, simultaneous equations, and quadratic methods.",
        coverage: "Strong",
        tools: [
          ["substitution", "practise substitution into expressions and formulae"],
          ["simplification", "collect like terms and simplify expressions"],
          ["bracket-expansion", "expand single and double brackets"],
          ["linear-equations", "solve linear equations from simple to complex forms"],
          ["inequalities", "solve and represent inequalities"],
          ["simultaneous-equations", "solve systems of equations"],
          ["quadratic-factorisation", "factorise and solve simple quadratics"],
          ["quadratic-equations", "extend to completing the square and formula methods"],
          ["algebraic-fractions", "simplify and solve with rational expressions"],
          ["transposition-formulae", "change the subject of formulae"]
        ],
        teacherMove: "Keep each algebraic line equivalent to the previous one; this is especially important for students who need to see why a step is allowed."
      },
      {
        code: "Section 8",
        title: "Relations, Functions and Graphs",
        focus: "Coordinate geometry, straight-line graphs, gradients, intercepts, quadratic graphs, relations, functions, sequences, inequalities on graphs, and modelling from graphs.",
        coverage: "Strong",
        tools: [
          ["straight-lines", "generate gradient, coordinate, intercept, and line-equation practice"],
          ["functions", "develop function notation, evaluation, composite functions, and inverses"],
          ["graph-transformations-curve-sketching", "support graph shape, transformations, and curve sketching"],
          ["sequences", "connect patterns and nth terms to functions"],
          ["linear-programming", "extend graphical inequalities into feasible-region problems"],
          ["dynamic-classroom-displays", "animate graph transformations and equation changes"]
        ],
        teacherMove: "Connect table, graph, equation, and context so students can move between representations rather than memorise isolated procedures."
      },
      {
        code: "Section 9",
        title: "Geometry and Trigonometry",
        focus: "Angles, polygons, congruence, similarity, transformations, constructions, circle theorems, Pythagoras, trigonometric ratios, bearings, sine rule, cosine rule, and Earth geometry links.",
        coverage: "Strong",
        tools: [
          ["missing-angles", "practise angle facts and geometric reasoning"],
          ["polygons-angles", "generate interior and exterior angle problems"],
          ["transformations", "support translations, rotations, reflections, and enlargements"],
          ["loci-constructions", "cover construction and loci reasoning"],
          ["pythagoras-theorem", "develop right-triangle side calculations"],
          ["trigonometric-ratios", "practise SOHCAHTOA and right-triangle contexts"],
          ["sine-cosine-rule", "extend to non-right-triangle trigonometry"],
          ["bearings", "generate bearings and trigonometry-with-bearings problems"],
          ["circle-theorems", "build theorem-based circle reasoning"],
          ["earth-geometry", "support latitude, longitude, and surface-distance contexts"]
        ],
        teacherMove: "Use diagrams to choose the rule first, then calculate; students should be able to name the geometric fact they are using."
      },
      {
        code: "Section 10",
        title: "Vectors and Matrices",
        focus: "Column vectors, vector operations, magnitude and direction, matrix operations, determinants, inverses, singular matrices, transformations, and simultaneous equations links.",
        coverage: "Strong",
        tools: [
          ["free-vectors", "practise column vectors, addition, subtraction, scalar multiples, and geometry"],
          ["matrices", "generate matrix addition, subtraction, multiplication, determinants, inverses, and algebraic matrix questions"],
          ["advanced-matrices", "extend into matrix transformations and eigenvalue-style enrichment where needed"],
          ["simultaneous-equations", "connect matrices to systems of equations"],
          ["transformations", "link vectors and matrices to coordinate transformations"]
        ],
        teacherMove: "Keep vectors in column form and matrices in rectangular form, and insist that matrix equality means corresponding entries are equal."
      }
    ]
  },
  {
    id: "cape-mathematics",
    label: "CAPE Mathematics",
    country: "Caribbean",
    status: "Mapped",
    title: "CAPE Mathematics Curriculum Alignment",
    description: "A CAPE route map linking Pure Mathematics, Applied Mathematics and Integrated Mathematics to Kaizen Maths teaching tools, classroom displays, worked examples, worksheet practice and assessment preparation.",
    basis: "Pilot alignment based on CXC CAPE Pure Mathematics, CAPE Applied Mathematics and CAPE Integrated Mathematics subject structures. Pure Mathematics is mapped by its two units; Applied Mathematics is mapped by statistical analysis and mathematical applications; Integrated Mathematics is mapped by its foundations, statistics and calculus modules.",
    standards: [
      {
        code: "Pure Unit 1 M1",
        title: "Pure Mathematics Unit 1: Basic Algebra and Functions",
        focus: "Algebraic manipulation, equations, inequalities, functions, graphs, transformations, inverse and composite functions, polynomial and rational expressions, exponential and logarithmic relationships, and modelling with functions.",
        coverage: "Strong",
        tools: [
          ["advanced-factorisation", "develop higher algebraic manipulation and factor structure"],
          ["functions", "support function notation, domain, range, inverses and composition"],
          ["graph-transformations-curve-sketching", "connect algebraic changes to graph behaviour"],
          ["roots-of-equations", "link roots, factors, equations and graphs"],
          ["logarithms-practice", "generate exponential and logarithmic equation practice"],
          ["transposition-formulae", "support formula rearrangement and symbolic control"],
          ["numerical-methods", "support approximation and iterative methods"],
          ["dynamic-classroom-displays", "animate graph and parameter changes for teacher modelling"]
        ],
        teacherMove: "Require students to move between symbolic form, graph features and interpretation, especially when a function has several equivalent forms."
      },
      {
        code: "Pure Unit 1 M2",
        title: "Pure Mathematics Unit 1: Trigonometry, Geometry and Vectors",
        focus: "Trigonometric identities, equations and graphs; coordinate geometry; geometric reasoning; vectors, vector notation, vector operations and applications to geometry.",
        coverage: "Strong",
        tools: [
          ["trigonometric-functions", "support exact values, identities and proof-style trigonometry"],
          ["trig-equation-solver", "generate trigonometric equation practice"],
          ["trig-graphs-transformations", "show transformed trigonometric graphs and equations"],
          ["graph-transformations-curve-sketching", "support curve sketching and graph interpretation"],
          ["equation-of-a-circle", "connect centre, radius, tangent and intersection work"],
          ["free-vectors", "secure column-vector notation and vector geometry"],
          ["further-vectors", "extend vector reasoning for CAPE Pure classes"],
          ["dynamic-classroom-displays", "model trig graphs, vector movement and geometric changes dynamically"]
        ],
        teacherMove: "Keep diagrams and notation precise: students should name the trig identity, geometric fact or vector relationship before calculating."
      },
      {
        code: "Pure Unit 1 M3",
        title: "Pure Mathematics Unit 1: Calculus I",
        focus: "Limits, first principles, differentiation rules, tangents and normals, stationary points, optimisation, introductory integration, definite integrals and area under curves.",
        coverage: "Strong",
        tools: [
          ["limits-first-principles", "support limit notation, first-principles reasoning and continuity"],
          ["differentiation-polynomials", "secure introductory differentiation and gradient functions"],
          ["differentiation-rules", "practise product, quotient and chain rule"],
          ["advanced-differentiation", "develop implicit, parametric, tangents, normals and optimisation"],
          ["integration", "cover basic integration, definite integrals and area"],
          ["advanced-integration", "support substitution and integration by parts where needed"],
          ["graph-transformations-curve-sketching", "connect derivative information to curve sketching"],
          ["dynamic-classroom-displays", "show gradient and accumulation ideas dynamically"]
        ],
        teacherMove: "Show the rule, substitution into the rule and simplified result; do not let calculus become only a verbal instruction."
      },
      {
        code: "Pure Unit 2 M1",
        title: "Pure Mathematics Unit 2: Complex Numbers and Calculus II",
        focus: "Complex-number arithmetic, polar form, roots, loci and representation, together with extended differentiation and integration methods.",
        coverage: "Strong",
        tools: [
          ["complex-numbers", "support complex arithmetic, modulus-argument form, roots and loci"],
          ["polar-coordinates", "connect polar representation and curve interpretation"],
          ["advanced-differentiation", "extend implicit, parametric and higher-level differentiation"],
          ["advanced-integration", "practise substitution and integration by parts"],
          ["volumes-of-revolution", "support extended applications of integration"],
          ["differential-equations", "connect calculus to equation-based modelling"],
          ["dynamic-classroom-displays", "support visual modelling of complex, polar and calculus ideas"]
        ],
        teacherMove: "Use the Argand diagram or graph alongside algebra so students see both the representation and the calculation."
      },
      {
        code: "Pure Unit 2 M2",
        title: "Pure Mathematics Unit 2: Sequences, Series and Approximations",
        focus: "Sequences, arithmetic and geometric series, convergence ideas, binomial expansion, Taylor and Maclaurin series, approximation and numerical methods.",
        coverage: "Strong",
        tools: [
          ["sequences-series", "generate sequence and series foundations"],
          ["binomial-expansion", "support binomial coefficients, terms and approximations"],
          ["series-expansions", "generate Taylor and Maclaurin series practice"],
          ["numerical-methods", "support approximation, iteration and numerical reasoning"],
          ["roots-of-equations", "connect numerical methods to equation roots"],
          ["limits-first-principles", "support limiting behaviour and convergence language"],
          ["graph-transformations-curve-sketching", "connect approximations to graphical behaviour"]
        ],
        teacherMove: "Make the approximation target explicit: students should know what is being approximated, the order used and why the approximation is reasonable."
      },
      {
        code: "Pure Unit 2 M3",
        title: "Pure Mathematics Unit 2: Counting, Matrices and Differential Equations",
        focus: "Counting principles, permutations and combinations, matrices, matrix transformations, systems, differential equations and modelling with rates of change.",
        coverage: "Strong",
        tools: [
          ["permutations-combinations", "develop counting, factorial, nPr and nCr reasoning"],
          ["matrices", "support matrix operations, determinants, inverses and transformations"],
          ["advanced-matrices", "extend matrix transformations and advanced matrix structure"],
          ["linear-algebra", "support systems, linear transformations and vector spaces where needed"],
          ["differential-equations", "cover separable, first-order linear, second-order and modelling problems"],
          ["advanced-integration", "support integration methods needed in differential equations"],
          ["functions", "connect solution families and model behaviour"]
        ],
        teacherMove: "Separate the structure from the calculation: identify the counting case, matrix operation or differential equation type before solving."
      },
      {
        code: "Applied Unit 1",
        title: "Applied Mathematics Unit 1: Statistical Analysis",
        focus: "Collecting and describing data, sampling, uncertainty, probability, correlation, regression, statistical distributions, estimation, hypothesis testing and interpretation of statistical results.",
        coverage: "Strong",
        tools: [
          ["sampling-methods-bias", "teach sampling choices, experimental design, bias and limitations"],
          ["averages-range", "support summary statistics and spread"],
          ["histograms", "develop grouped-data and frequency-density reasoning"],
          ["cumulative-frequency-curves", "support medians, quartiles and percentiles"],
          ["correlation-regression", "support regression lines, correlation and interpretation"],
          ["tree-diagrams-conditional-probability", "generate conditional probability practice"],
          ["discrete-random-variables", "support probability distributions and expectation"],
          ["normal-distribution", "standardise and use normal distribution probabilities"],
          ["hypothesis-testing", "develop inference decisions and conclusion wording"],
          ["confidence-intervals", "support interval estimates and interpretation"]
        ],
        teacherMove: "Make the final statistical sentence do real work: it should refer to the data, context, uncertainty and conclusion."
      },
      {
        code: "Applied Unit 2",
        title: "Applied Mathematics Unit 2: Mathematical Applications",
        focus: "Discrete mathematics, probability and distributions, optimisation, modelling, algorithms, counting, linear programming, mechanics, forces, motion, energy, momentum and interpretation of applied models.",
        coverage: "Strong",
        tools: [
          ["linear-programming", "support optimisation with constraints and feasible regions"],
          ["permutations-combinations", "develop counting structures for discrete mathematics"],
          ["poisson-distribution", "support probability distribution practice"],
          ["binomial-geometric-distribution", "generate binomial and geometric distribution questions"],
          ["continuous-random-variables", "extend probability into density functions and integration"],
          ["motion-graphs-constant-acceleration", "interpret distance-time and velocity-time graphs"],
          ["equations-of-motion", "generate constant-acceleration practice"],
          ["newtons-second-law", "model resultant force and F = ma questions"],
          ["friction", "support limiting equilibrium and friction models"],
          ["moments", "generate turning-effect and equilibrium questions"],
          ["projectiles", "support projectile-motion modelling"],
          ["momentum", "generate momentum and impulse questions"],
          ["work-energy-power", "support work, energy and power modelling"]
        ],
        teacherMove: "Start from the real situation, draw the model, state assumptions, then solve and interpret the result in context."
      },
      {
        code: "Integrated Mathematics",
        title: "Integrated Mathematics: Foundations, Statistics and Calculus",
        focus: "Foundational algebra and functions, mathematical modelling, statistics, probability, data interpretation, calculus ideas and reasoning across practical contexts.",
        coverage: "Strong",
        tools: [
          ["functions", "support foundational function notation and modelling"],
          ["advanced-factorisation", "repair algebraic manipulation needed for modelling"],
          ["graph-transformations-curve-sketching", "connect equations to graph behaviour"],
          ["sampling-methods-bias", "support data collection and interpretation"],
          ["correlation-regression", "build regression models and interpret results"],
          ["normal-distribution", "support normal model calculations"],
          ["hypothesis-testing", "develop inference and conclusion wording"],
          ["limits-first-principles", "support calculus foundations"],
          ["differentiation-polynomials", "secure introductory differentiation"],
          ["integration", "cover introductory integration and accumulation"],
          ["dynamic-classroom-displays", "support modelling and explanation in live lessons"]
        ],
        teacherMove: "Use this route for mixed applied teaching: keep the model, calculation and interpretation visible in every task."
      }
    ]
  },
  {
    id: "oman-ged",
    label: "Oman GED",
    country: "Oman",
    status: "Mapped",
    title: "Oman General Education Diploma Mathematics Alignment",
    description: "A pilot alignment linking Oman General Education Diploma mathematics routes to Kaizen Maths tools for classroom teaching, revision, worked examples, worksheets, and assessment preparation.",
    basis: "Pilot alignment based on public Oman Ministry of Education references to Grade 12 General Education Diploma mathematics, including basic and advanced mathematics routes, and the Ministry's 2022 announcement of refreshed Grade 12 mathematics and science curricula for 2023/2024.",
    standards: [
      {
        code: "GED Basic Mathematics",
        title: "Number, Algebra and Everyday Mathematics",
        focus: "Number fluency, percentage change, ratio and proportion, formula substitution, rearranging formulae, linear equations, quadratic equations, sequences, financial contexts and real-life problem solving.",
        coverage: "Strong",
        tools: [
          ["fractions-practice", "repair fraction fluency and mixed-operation number work"],
          ["simple-percentage-tasks", "build percentage increase, decrease, reverse percentage and comparison practice"],
          ["ratio-proportion", "support ratio, proportion, sharing and scaling"],
          ["linear-equations", "generate equation-solving practice with clear working"],
          ["quadratic-equations", "practise factorising, completing the square and formula methods"],
          ["transposition-formulae", "strengthen rearranging formulae before applied contexts"],
          ["financial-real-life-maths", "support money, interest, discounts, profit, loss and practical calculation"]
        ],
        teacherMove: "Use this route for intervention and GED readiness: keep the method visible, require correct notation, and connect each calculation back to the context."
      },
      {
        code: "GED Advanced Mathematics",
        title: "Functions, Graphs and Coordinate Geometry",
        focus: "Function notation, mappings, domains, ranges, transformations of graphs, polynomial and rational relationships, coordinate geometry, straight lines, circles and modelling with graphs.",
        coverage: "Strong",
        tools: [
          ["functions", "practise notation, mappings, domains, ranges, composites and inverses"],
          ["graph-transformations-curve-sketching", "connect algebraic changes to graph movement and curve features"],
          ["straight-lines", "practise gradients, equations of lines and coordinate geometry"],
          ["equation-of-a-circle", "connect centre, radius, tangents and intersections"],
          ["roots-of-equations", "link roots, factors, equations and graphical interpretation"],
          ["dynamic-classroom-displays", "animate graph and parameter changes during teacher modelling"]
        ],
        teacherMove: "Move between equation, graph and interpretation. Students should describe what a parameter changes before they calculate."
      },
      {
        code: "GED Advanced Mathematics",
        title: "Trigonometry and Geometric Reasoning",
        focus: "Trigonometric ratios, exact trigonometric values, trig graphs, identities, equations, bearings, circle geometry, vectors, transformations and multi-step geometric reasoning.",
        coverage: "Strong",
        tools: [
          ["trigonometric-functions", "develop exact values, identities, equations and proof-style trig questions"],
          ["trig-graphs-transformations", "show sine, cosine and tangent graphs with transformations"],
          ["bearings", "support bearing notation, hidden bearings and trigonometry contexts"],
          ["circle-theorems", "build circle-theorem reasoning chains"],
          ["formal-geometric-proof", "support statement-and-reason proof structure"],
          ["transformations", "practise translation, reflection, rotation and enlargement"]
        ],
        teacherMove: "Ask students to name the relationship first, then calculate. Diagrams should support reasoning rather than become the whole solution."
      },
      {
        code: "GED Advanced Mathematics",
        title: "Calculus and Rates of Change",
        focus: "Limits, first principles, differentiation, tangents and normals, stationary points, optimisation, integration, area under curves and connected applications.",
        coverage: "Strong",
        tools: [
          ["limits-first-principles", "support limit notation, first-principles reasoning and continuity"],
          ["differentiation-polynomials", "secure polynomial differentiation and gradient functions"],
          ["advanced-differentiation", "extend to product, quotient, chain, implicit and parametric differentiation"],
          ["integration", "cover basic integration, definite integrals and area"],
          ["advanced-integration", "introduce integration by substitution and by parts where needed"],
          ["volumes-of-revolution", "extend integration into volume applications"],
          ["dynamic-classroom-displays", "show gradients, accumulation and transformation ideas dynamically"]
        ],
        teacherMove: "Show the rule, the substitution into the rule and the simplified result. Avoid leaving calculus steps as verbal instructions only."
      },
      {
        code: "GED Data and Probability",
        title: "Statistics, Probability and Data Handling",
        focus: "Averages and spread, grouped data, histograms, cumulative frequency, probability, distributions, sampling, correlation, regression and interpretation of statistical results.",
        coverage: "Strong",
        tools: [
          ["averages-range", "generate mean, median, mode, range and representative-measure practice"],
          ["histograms", "develop grouped-data and frequency-density reasoning"],
          ["cumulative-frequency-curves", "support medians, quartiles and percentiles from ogives"],
          ["tree-diagrams-conditional-probability", "generate conditional probability practice"],
          ["sampling-methods-bias", "teach sampling choices, bias and limitations"],
          ["correlation-regression", "find and interpret regression lines from tables"],
          ["normal-distribution", "standardise normal variables and interpret probabilities"]
        ],
        teacherMove: "Make the final sentence interpret the result in context. Students should not stop at a calculation when the question asks for a decision or comparison."
      },
      {
        code: "GED Applied Modelling",
        title: "Mechanics and Applied Mathematics Links",
        focus: "Constant acceleration, motion graphs, forces, momentum, work, energy, power, projectiles, modelling assumptions, units and interpretation of results.",
        coverage: "Developing",
        tools: [
          ["motion-graphs-constant-acceleration", "interpret distance-time and velocity-time graphs"],
          ["equations-of-motion", "generate constant-acceleration practice"],
          ["newtons-second-law", "connect resultant force, mass and acceleration"],
          ["momentum", "generate momentum and impulse questions"],
          ["projectiles", "separate horizontal and vertical motion in projectile problems"],
          ["work-energy-power", "link work done, energy changes and power"],
          ["friction", "support limiting equilibrium and friction models"]
        ],
        teacherMove: "Start from the model: draw the situation, state the known quantities, choose the equation, substitute clearly, then interpret the answer with units."
      },
      {
        code: "GED Revision",
        title: "Mixed Practice, Worksheets and Assessment Preparation",
        focus: "Combining basic and advanced mathematics topics into classroom practice, intervention tasks, revision sheets, mock-style sets and worked-solution resources.",
        coverage: "Strong",
        tools: [
          ["functions", "combine algebra and function topic blocks into printable practice"],
          ["trigonometric-functions", "include higher-level trigonometry revision sets"],
          ["normal-distribution", "add statistics and distribution practice where needed"],
          ["classroom-displays", "project grids, diagrams and reference displays during revision"],
          ["dynamic-classroom-displays", "animate graphs, transformations and circle relationships for whole-class teaching"],
          ["motion-graphs-constant-acceleration", "include applied modelling and mechanics revision where relevant"]
        ],
        teacherMove: "Use the alignment as a planning guide: select the topic, generate practice at the right level, then build a worksheet or assessment when students are ready."
      }
    ]
  },
  {
    id: "jamaica-nsc-7-9",
    label: "Jamaica NSC 7-9",
    country: "Jamaica",
    status: "Mapped",
    title: "MOE Jamaica NSC Grades 7-9 Mathematics Curriculum Alignment",
    description: "A grade-and-strand map from the Jamaica NSC Grades 7-9 essential mathematics objectives to Kaizen Maths teaching tools, classroom displays, worked examples, worksheet generators, and intervention practice.",
    basis: "Pilot alignment based on the Ministry of Education Curriculum Analysis: Essential Objectives and Content Focus for NSC Grades 7-9, 2nd Edition, updated October 2025. The map follows the mathematics strands used in the document: Number, Measurement, Geometry, Algebra, and Statistics and Probability.",
    standards: [
      {
        code: "Grade 7 Number",
        title: "Grade 7: Number",
        focus: "Real number types, ordering numbers, four operations with real numbers, rounding, arithmetic properties, identity and inverse, ratio, proportion, two-set Venn diagrams, unit price, best buys, profit and loss, and currency conversion.",
        coverage: "Strong",
        tools: [
          ["number-bases-number-sets", "classify real numbers and connect number sets to set language"],
          ["four-operations", "practise the four operations and multiple operations"],
          ["order-of-operations", "build multi-operation fluency"],
          ["ratio-proportion", "support ratio, proportion, and sharing"],
          ["venn-diagrams", "represent two-set Venn diagrams and interpret regions"],
          ["financial-real-life-maths", "generate unit price, best buys, profit, loss, and currency-context practice"]
        ],
        teacherMove: "Use this strand for diagnostic number repair before students move into algebra, measurement, and consumer arithmetic."
      },
      {
        code: "Grade 7 Measurement",
        title: "Grade 7: Measurement",
        focus: "Measuring length, mass, time, temperature, volume and capacity; converting within and across related units; perimeter and area of composite plane figures.",
        coverage: "Strong",
        tools: [
          ["conversions-teaching", "practise unit conversions and compound measure readiness"],
          ["area-rectangles", "support area, perimeter, and composite-shape reasoning"],
          ["area-triangles", "extend area work to triangular regions"],
          ["classroom-displays", "project blank measurement and shape diagrams for live modelling"],
          ["bar-models", "support proportional unit and quantity reasoning where needed"]
        ],
        teacherMove: "Make the chosen unit visible throughout the working so students connect measurement, conversion, and final interpretation."
      },
      {
        code: "Grade 7 Geometry",
        title: "Grade 7: Geometry",
        focus: "Nets of solids, translations, reflections, rotations, and angle, side and symmetry properties of triangles and quadrilaterals.",
        coverage: "Strong",
        tools: [
          ["classroom-displays", "project nets, solids, quadrilaterals, triangles, and blank geometry templates"],
          ["concept-explainer", "show shape properties, sides, angles, diagonals, and notation one feature at a time"],
          ["transformations", "generate translation, reflection, and rotation practice"],
          ["dynamic-classroom-displays", "animate transformations for teacher modelling"],
          ["missing-angles", "support angle and shape-property reasoning"]
        ],
        teacherMove: "Use diagrams first, then ask students to describe the relationship between object and image using correct transformation language."
      },
      {
        code: "Grade 7 Algebra",
        title: "Grade 7: Algebra",
        focus: "Like and unlike terms, writing equations from word problems, solving simple linear equations by flow diagrams and balancing, simplifying by grouping like terms, Cartesian coordinates, mappings, ordered pairs, and mapping types.",
        coverage: "Strong",
        tools: [
          ["simplification", "collect like terms and simplify expressions"],
          ["linear-equations", "solve simple and multi-step linear equations"],
          ["substitution", "connect expressions, variables, and values"],
          ["straight-lines", "support Cartesian-plane plotting and coordinate reading"],
          ["functions", "connect mappings, ordered pairs, rules, and function language"]
        ],
        teacherMove: "Keep the link between words, equation, diagram, and coordinate representation visible for students who are new to formal algebra."
      },
      {
        code: "Grade 7 Statistics and Probability",
        title: "Grade 7: Statistics and Probability",
        focus: "Mode, median, mean, range, simple frequency tables, and interpreting data from raw lists or frequency tables.",
        coverage: "Strong",
        tools: [
          ["averages-range", "generate mean, median, mode, range, and missing-value practice"],
          ["histograms", "extend frequency-table thinking where useful"],
          ["kaizen-large-data-set", "provide simple data interpretation contexts"],
          ["classroom-displays", "project blank tables and data displays for modelling"],
          ["fractions-table", "use starter tables for quick data and conversion warm-ups"]
        ],
        teacherMove: "Ask students to explain what each average tells them about the data, not only calculate it."
      },
      {
        code: "Grade 8 Number",
        title: "Grade 8: Number",
        focus: "Index laws, standard form, decimal places and significant figures, place value in different bases, operations in base n, conversion between base n and base 10, properties of relations, ratio and proportion, simple and compound interest, hire purchase, discounts and taxes, subsets, and simple propositions.",
        coverage: "Strong",
        tools: [
          ["exponents-index-notation", "practise powers and index laws"],
          ["powers-of-10", "develop powers of ten and standard-form fluency"],
          ["number-bases-number-sets", "support number bases, set language, and number classification"],
          ["ratio-proportion", "generate ratio and proportion practice"],
          ["financial-real-life-maths", "apply interest, hire purchase, discounts, taxes, and cost comparison"],
          ["venn-diagrams", "connect subsets and set notation to diagrams"]
        ],
        teacherMove: "Separate notation, calculation, and interpretation; Grade 8 number work spans both abstract structure and consumer arithmetic."
      },
      {
        code: "Grade 8 Measurement",
        title: "Grade 8: Measurement",
        focus: "Area of parallelograms, triangles and trapezia; total surface area of cubes, cuboids, cylinders and triangular prisms; conversion up to cubed units; volume and capacity of cubes, cuboids, prisms, cylinders and composite objects.",
        coverage: "Strong",
        tools: [
          ["area-rectangles", "support composite area and formula substitution"],
          ["area-triangles", "develop triangle area and related plane figures"],
          ["volume-surface-area-prisms", "generate cube, cuboid, prism, volume and surface-area practice"],
          ["cylinders-cones-volume-surface-area", "support cylinder surface-area and volume work"],
          ["conversions-teaching", "practise squared and cubed unit conversions"]
        ],
        teacherMove: "Use one diagram, one formula, one substitution line, and one unit line so the method remains clean."
      },
      {
        code: "Grade 8 Geometry",
        title: "Grade 8: Geometry",
        focus: "Angles formed by transversals and parallel lines, intersecting lines, translations by vectors, reflections in the x- or y-axis, n-sided polygons for 3 <= n <= 10, and interior angle sums.",
        coverage: "Strong",
        tools: [
          ["missing-angles", "practise parallel-line, intersecting-line, and polygon angle facts"],
          ["transformations", "generate vector translations and axis reflections"],
          ["dynamic-classroom-displays", "animate transformations for live teaching"],
          ["polygons-angles", "support interior and exterior angle work for polygons"],
          ["classroom-displays", "project blank grids, axes, and polygon diagrams"]
        ],
        teacherMove: "Ask students to identify the angle relationship or transformation rule before calculating or drawing."
      },
      {
        code: "Grade 8 Algebra",
        title: "Grade 8: Algebra",
        focus: "Changing the subject of simple formulae, writing inequalities from word problems, representing inequalities on number lines, solving simple linear inequalities, straight-line graphs by plotting points and by gradient/intercept, and finding gradients and intercepts.",
        coverage: "Strong",
        tools: [
          ["transposition-formulae", "change the subject of simple and multi-step formulae"],
          ["inequalities", "solve and represent inequalities on number lines"],
          ["linear-equations", "repair equation-solving fluency where needed"],
          ["straight-lines", "generate straight-line graph, gradient, and intercept practice"],
          ["functions", "connect equations, mappings, and graph representations"]
        ],
        teacherMove: "Use the same language of balance and inverse operations in equations, formula rearrangement, and inequalities."
      },
      {
        code: "Grade 8 Statistics and Probability",
        title: "Grade 8: Statistics and Probability",
        focus: "Mean, median and mode from frequency tables, and reading, interpreting and constructing pictographs, bar charts, pie charts and line graphs.",
        coverage: "Strong",
        tools: [
          ["averages-range", "generate averages from lists and tables"],
          ["histograms", "extend grouped-table reasoning where appropriate"],
          ["cumulative-frequency-curves", "prepare for later cumulative data displays"],
          ["kaizen-large-data-set", "support data interpretation and graph choice"],
          ["classroom-displays", "project blank data tables and display templates"]
        ],
        teacherMove: "Keep the table visible while calculating averages so students see frequency as repeated data."
      },
      {
        code: "Grade 9 Number",
        title: "Grade 9: Number",
        focus: "Index laws, standard form for numbers less than, greater than or equal to 10, more complex ratio and proportion, consumer arithmetic including bills and wages, three-subset Venn problems, and introductory matrix order, scalar multiplication, commutativity and distributivity under addition.",
        coverage: "Strong",
        tools: [
          ["exponents-index-notation", "practise index laws"],
          ["powers-of-10", "support standard-form notation and powers of ten"],
          ["ratio-proportion", "generate more complex ratio and proportion practice"],
          ["financial-real-life-maths", "apply bills, wages, salary, and consumer-arithmetic contexts"],
          ["venn-diagrams", "support three-set and subset problems"],
          ["matrices", "introduce matrix order, scalar multiplication, and matrix addition properties"]
        ],
        teacherMove: "Use this strand to connect exam-style number fluency with real-life consumer contexts and introductory matrix structure."
      },
      {
        code: "Grade 9 Measurement",
        title: "Grade 9: Measurement",
        focus: "Area and circumference of a circle, identifying arc, sector and segment, arc length, sector area, segment area, and parts of circles using angles.",
        coverage: "Strong",
        tools: [
          ["circles-area-circumference", "generate area and circumference practice"],
          ["sectors-arc-length", "support arc length, sector area, and segment questions"],
          ["classroom-displays", "project circle diagrams, sectors, and blank templates"],
          ["concept-explainer", "show circle parts such as radius, chord, tangent, sector, segment, and arc"],
          ["upper-lower-bounds", "support rounding and accuracy where measurements are involved"]
        ],
        teacherMove: "Name the circle part first, then select the formula; this prevents sector, arc, and segment confusion."
      },
      {
        code: "Grade 9 Geometry",
        title: "Grade 9: Geometry",
        focus: "Pythagoras' theorem, trigonometric ratios in right-angled triangles, enlargements with centre at the origin and natural-number scale factors, and reflections in any given line in the plane.",
        coverage: "Strong",
        tools: [
          ["pythagoras-theorem", "generate right-triangle side and context problems"],
          ["trigonometric-ratios", "practise right-angled trigonometry"],
          ["transformations", "generate enlargements and reflections on coordinate grids"],
          ["dynamic-classroom-displays", "animate transformations and geometric changes"],
          ["scale-drawing-similar-shapes", "connect enlargement to scale factor and similarity"]
        ],
        teacherMove: "Use accurate-looking diagrams and insist that students choose Pythagoras, trigonometry, or transformation language for a reason."
      },
      {
        code: "Grade 9 Algebra",
        title: "Grade 9: Algebra",
        focus: "Expanding two binomials, algebraic fractions, factorising by a common factor, simultaneous linear equations by substitution and elimination, functions as one-to-one or many-to-one relations, domain and range, and column vectors including position and relative position vectors.",
        coverage: "Strong",
        tools: [
          ["bracket-expansion", "expand double brackets cleanly"],
          ["algebraic-fractions", "simplify, add, subtract, multiply, and divide algebraic fractions"],
          ["advanced-factorisation", "factorise using common factors and structured methods"],
          ["simultaneous-equations", "solve simultaneous equations by substitution and elimination"],
          ["functions", "develop function language, domain, range, and relations"],
          ["free-vectors", "write and use column vectors and position vectors"]
        ],
        teacherMove: "Keep notation precise: algebraic fractions need vertical fraction bars, and vectors should be written as column vectors."
      },
      {
        code: "Grade 9 Statistics and Probability",
        title: "Grade 9: Statistics and Probability",
        focus: "Simple probabilities, drawing conclusions from probability, and interpreting probability as fractions or percentages.",
        coverage: "Strong",
        tools: [
          ["tree-diagrams-conditional-probability", "model probability with structured diagrams"],
          ["venn-diagrams", "connect probability to sets and regions"],
          ["fractions-practice", "repair fraction arithmetic needed for probability"],
          ["simple-percentage-tasks", "connect fractions and percentages in probability statements"],
          ["classroom-displays", "project blank probability templates for explanation"]
        ],
        teacherMove: "Require probability answers to be interpreted in words, especially when students move between fractions and percentages."
      }
    ]
  }
];

function textbookAlignmentById(id) {
  return textbookAlignmentCourses.find((course) => course.id === id) || textbookAlignmentCourses[0];
}

function textbookAlignmentSeriesForCourse(course) {
  return textbookAlignmentSeries.find((series) => series.id === course.seriesId) || textbookAlignmentSeries[0];
}

function textbookAlignmentLevelLink(level, course) {
  const available = textbookAlignmentCourses.some((item) => item.id === level.id);
  if (!available) {
    return `
      <span class="textbook-level-disabled">
        <strong>${escapeHtml(level.label)}</strong>
        <small>${escapeHtml(level.status)}</small>
      </span>
    `;
  }
  return `
    <a class="${level.id === course.id ? "active" : ""}" href="#/textbook-alignments/${escapeHtml(level.id)}">
      <strong>${escapeHtml(level.label)}</strong>
      <small>${escapeHtml(level.status)}</small>
    </a>
  `;
}

function alignmentToolChip([slug, use]) {
  const tool = tools.find((item) => item.slug === slug);
  if (!tool || !isVisibleTool(tool)) {
    return `<span class="textbook-tool-chip missing" title="${escapeHtml(use)}">${escapeHtml(slug)}</span>`;
  }
  return `<a class="textbook-tool-chip" href="#/tools/${escapeHtml(tool.slug)}" title="${escapeHtml(use)}" aria-label="${escapeHtml(`${tool.title}: ${use}`)}">${escapeHtml(tool.title)}</a>`;
}

function curriculumAlignmentById(id) {
  return curriculumAlignmentFrameworks.find((framework) => framework.id === id) || null;
}

function curriculumAlignmentLabelById(id) {
  return curriculumAlignmentById(id)?.label || "";
}

function curriculumAlignmentOptionMarkup(activeId = "", placeholder = "Choose a curriculum map...") {
  return `
    ${placeholder ? `<option value="" disabled ${activeId ? "" : "selected"}>${escapeHtml(placeholder)}</option>` : ""}
    ${curriculumAlignmentFrameworks.map((item) => `
      <option value="${escapeHtml(item.id)}" ${item.id === activeId ? "selected" : ""}>
        ${escapeHtml(item.label)}${item.status === "Mapped" ? "" : ` - ${escapeHtml(item.status)}`}
      </option>
    `).join("")}
  `;
}

function curriculumAlignmentSelect(framework) {
  const activeId = framework?.id || "";
  return `
    <label class="curriculum-selector" for="curriculumAlignmentSelect">
      <span>Select curriculum</span>
      <select id="curriculumAlignmentSelect" data-curriculum-alignment-select>
        ${curriculumAlignmentOptionMarkup(activeId)}
      </select>
    </label>
  `;
}

function inferCurriculumIdFromSchoolContext(context = currentSchoolContext()) {
  const direct = String(context?.default_curriculum_id || "").trim();
  if (direct && curriculumAlignmentById(direct)) return direct;
  const text = normalise([
    context?.curriculum_focus,
    context?.standards_label,
    context?.country,
    context?.organisation_name,
    context?.pilot_name
  ].join(" "));
  if (!text) return "";
  if (text.includes("jamaica") || text.includes("nsc")) return "jamaica-nsc-7-9";
  if (text.includes("cape")) return "cape-mathematics";
  if (text.includes("csec")) return "csec";
  if (text.includes("common core")) return "common-core";
  if (text.includes("myp") || text.includes("ib")) return "ib-mathematics";
  if (text.includes("key stage 2") || /\bks2\b/.test(text)) return "uk-ks2-mathematics";
  if (text.includes("key stage 3") || /\bks3\b/.test(text)) return "uk-ks3-mathematics";
  if (text.includes("gcse")) return "gcse";
  if (text.includes("igcse") || text.includes("cambridge")) return "cambridge-igcse";
  if (text.includes("edexcel") || text.includes("pearson")) return "pearson-edexcel";
  if (text.includes("further")) return "uk-further-mathematics";
  if (text.includes("a level") || text.includes("alevel")) return "uk-a-level-mathematics";
  if (text.includes("singapore")) return "singapore-mathematics";
  if (text.includes("ontario")) return "ontario-mathematics";
  if (text.includes("australia")) return "australian-curriculum";
  if (text.includes("finland")) return "finland-mathematics";
  if (text.includes("oman") || text.includes("general education diploma")) return "oman-ged";
  return "";
}

function currentSchoolCurriculumId() {
  const context = currentSchoolContext();
  return context ? inferCurriculumIdFromSchoolContext(context) : "";
}

function curriculumStandardDomId(framework, standard, index) {
  const base = normalise(`${framework.id}-${standard.code}-${index}`)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `curriculum-${base}`;
}

function curriculumFrameworkCards(activeFramework) {
  return curriculumAlignmentFrameworks.map((item) => `
    <a class="curriculum-framework-chip${item.id === activeFramework.id ? " active" : ""}" href="#/curriculum-alignments/${escapeHtml(item.id)}">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.country)}</span>
    </a>
  `).join("");
}

function curriculumStrandNav(framework) {
  return framework.standards.map((standard, index) => {
    const targetId = curriculumStandardDomId(framework, standard, index);
    return `
    <a href="#/curriculum-alignments/${escapeHtml(framework.id)}" class="curriculum-strand-chip" onclick="event.preventDefault(); document.getElementById('${escapeHtml(targetId)}')?.scrollIntoView({ behavior: 'smooth', block: 'start' });">
      <span>${escapeHtml(standard.code)}</span>
      <strong>${escapeHtml(standard.title)}</strong>
    </a>
  `;
  }).join("");
}

function curriculumReverseToolIndex(framework) {
  const index = new Map();
  framework.standards.forEach((standard) => {
    standard.tools.forEach(([slug]) => {
      const tool = tools.find((item) => item.slug === slug);
      if (!tool || !isVisibleTool(tool)) return;
      if (!index.has(slug)) index.set(slug, { tool, standards: [] });
      index.get(slug).standards.push(`${standard.code} ${standard.title}`);
    });
  });
  return [...index.values()].sort((a, b) => a.tool.title.localeCompare(b.tool.title));
}

function textbookReverseToolIndex(course) {
  const index = new Map();
  course.chapters.forEach((chapter) => {
    chapter.tools.forEach(([slug]) => {
      const tool = tools.find((item) => item.slug === slug);
      if (!tool || !isVisibleTool(tool)) return;
      if (!index.has(slug)) index.set(slug, { tool, chapters: [] });
      index.get(slug).chapters.push(`${chapter.code} ${chapter.title}`);
    });
  });
  return [...index.values()].sort((a, b) => a.tool.title.localeCompare(b.tool.title));
}

function renderCurriculumAlignments() {
  const explicitFramework = routeParts()[1] || "";
  const targetStandardId = routeParts()[2] || "";
  const schoolDefaultFramework = currentSchoolCurriculumId();
  const requestedFramework = explicitFramework || schoolDefaultFramework;
  const framework = requestedFramework ? curriculumAlignmentById(requestedFramework) : null;
  const reverseIndex = framework ? curriculumReverseToolIndex(framework) : [];
  const hasStandards = Boolean(framework?.standards?.length);
  if (!framework) {
    app.innerHTML = `
      ${pageHeader(
        "Curriculum Alignments",
        "Select a curriculum map to see how Kaizen Maths tools connect with the standards, strands, and classroom priorities teachers are working from.",
        `<a class="button primary" href="#/coverage-map">Coverage Map</a><a class="button" href="#/textbook-alignments">Textbook Alignments</a>`
      )}
      <section class="textbook-page curriculum-page">
        <section class="textbook-hero-panel curriculum-hero-panel curriculum-chooser-hero">
          <div class="curriculum-hero-copy">
            <span class="eyebrow">Curriculum Alignment Hub</span>
            <h2>Choose the curriculum you want to review.</h2>
            <p>Schools describe mathematics through different standards, exam bodies, grade levels, and strands. This page helps teachers and leaders connect that curriculum language to the Kaizen Maths tools available for teaching, practice, worksheets, assessment, and intervention.</p>
          </div>
          ${curriculumAlignmentSelect(null)}
        </section>

        <section class="textbook-map-panel curriculum-intro-panel">
          <div class="coverage-panel-head">
            <div>
              <span class="eyebrow">How To Use This Page</span>
              <h2>Start by selecting a curriculum</h2>
              <p>Once selected, the alignment map loads as a vertical standards-style table so the connection between curriculum areas and Kaizen tools is easy to scan.</p>
            </div>
          </div>
          <table class="textbook-alignment-table curriculum-guide-table">
            <thead>
              <tr>
                <th scope="col">Step</th>
                <th scope="col">What To Check</th>
                <th scope="col">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"><span>1</span>Select</th>
                <td><p class="textbook-focus-line">Choose the national, exam-board, or programme curriculum that best matches your school context.</p></td>
                <td><small class="textbook-use-line">Loads the relevant standards map only when needed.</small></td>
              </tr>
              <tr>
                <th scope="row"><span>2</span>Review</th>
                <td><p class="textbook-focus-line">Scan the strand, topic focus, and teacher use notes in the table.</p></td>
                <td><small class="textbook-use-line">Supports curriculum planning, intervention, and departmental consistency.</small></td>
              </tr>
              <tr>
                <th scope="row"><span>3</span>Open Tools</th>
                <td><p class="textbook-focus-line">Use the related Kaizen tools for classroom examples, worksheets, and assessment practice.</p></td>
                <td><small class="textbook-use-line">Moves from curriculum intent to usable teaching resources.</small></td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    `;
    bindCurriculumAlignmentActions(null);
    return;
  }
  app.innerHTML = `
    ${pageHeader(
      "Curriculum Alignments",
      "Choose a curriculum, scan the strand map, and open the Kaizen tools that support classroom teaching, practice, worksheets, and intervention.",
      `<button class="button primary" id="exportCurriculumPdf" type="button">Export PDF</button><a class="button" href="#/coverage-map">Coverage Map</a><a class="button" href="#/textbook-alignments">Textbook Alignments</a>`
    )}
    <section class="textbook-page curriculum-page">
      <div class="curriculum-print-title">
        <h1>${escapeHtml(framework.label)} alignment map</h1>
        <p>${escapeHtml(schoolContextReportLine() || "Generated with Kaizen Maths")}</p>
      </div>
      <section class="textbook-hero-panel curriculum-hero-panel curriculum-chooser-hero">
        <div class="curriculum-hero-copy">
          <span class="eyebrow">${explicitFramework ? "Curriculum Alignment Hub" : "School Default Curriculum"}</span>
          <h2>${escapeHtml(framework.label)} alignment map</h2>
          <p>${escapeHtml(framework.description)}</p>
        </div>
        ${curriculumAlignmentSelect(framework)}
      </section>

      ${hasStandards ? `
        <section class="textbook-map-panel">
          <div class="coverage-panel-head">
            <div>
              <span class="eyebrow">Curriculum To Tool Map</span>
              <h2>${escapeHtml(framework.label)} pilot map</h2>
              <p>A compact standards-style table showing the curriculum area, teaching focus, and related Kaizen tools.</p>
            </div>
            <a class="button" href="#/tools">Open Tool Library</a>
          </div>
          <table class="textbook-alignment-table">
            <thead>
              <tr>
                <th scope="col">Curriculum Area</th>
                <th scope="col">Focus and Use</th>
                <th scope="col">Kaizen Tools</th>
              </tr>
            </thead>
            <tbody>
              ${framework.standards.map((standard, index) => `
                <tr>
                  <th scope="row" id="${escapeHtml(curriculumStandardDomId(framework, standard, index))}">
                    <span>${escapeHtml(standard.code)}</span>
                    ${escapeHtml(standard.title)}
                  </th>
                  <td>
                    <p class="textbook-focus-line">${escapeHtml(standard.focus)}</p>
                    <small class="textbook-use-line">${escapeHtml(standard.teacherMove)}</small>
                  </td>
                  <td>
                    <div class="textbook-tool-list">
                      ${standard.tools.map(alignmentToolChip).join("")}
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </section>

        <section class="textbook-map-panel curriculum-print-hide">
          <div class="coverage-panel-head">
            <div>
              <span class="eyebrow">Reverse Lookup</span>
              <h2>Kaizen tools used in this ${escapeHtml(framework.label)} map</h2>
              <p>Start from a Kaizen tool and see where it supports the curriculum alignment.</p>
            </div>
          </div>
          <ul class="textbook-reverse-list curriculum-reverse-list">
            ${reverseIndex.map(({ tool, standards }) => `
              <li>
                <a href="#/tools/${escapeHtml(tool.slug)}">${escapeHtml(tool.title)}</a>
                <span>${standards.map((standard) => escapeHtml(standard)).join(" · ")}</span>
              </li>
            `).join("")}
          </ul>
        </section>
      ` : `
        <section class="textbook-map-panel curriculum-empty-panel">
          <div>
            <span class="eyebrow">Alignment Pending</span>
            <h2>${escapeHtml(framework.label)} will use this same structure</h2>
            <p>${escapeHtml(framework.description)}</p>
          </div>
          <a class="button primary" href="#/curriculum-alignments/common-core">View Common Core Map</a>
        </section>
      `}
    </section>
  `;
  bindCurriculumAlignmentActions(framework);
  if (targetStandardId) {
    window.requestAnimationFrame(() => {
      document.getElementById(targetStandardId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function bindCurriculumAlignmentActions(framework) {
  document.querySelectorAll("[data-curriculum-alignment-select]").forEach((select) => {
    const openSelectedCurriculum = () => {
      const selectedFramework = select.value;
      if (!selectedFramework) {
        location.hash = "#/curriculum-alignments";
        return;
      }
      location.hash = `#/curriculum-alignments/${selectedFramework}`;
    };
    select.addEventListener("change", openSelectedCurriculum);
    select.addEventListener("input", openSelectedCurriculum);
  });

  if (!framework) return;

  document.getElementById("exportCurriculumPdf")?.addEventListener("click", () => {
    const originalTitle = document.title;
    document.title = `${framework.label} - Kaizen Maths Curriculum Alignment`;
    document.body.classList.add("printing-curriculum-alignment");
    const cleanup = () => {
      document.body.classList.remove("printing-curriculum-alignment");
      document.title = originalTitle;
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
    window.setTimeout(cleanup, 1000);
  });
}

function renderTextbookAlignments() {
  const requestedCourse = routeParts()[1] || "holt-mcdougal-g6";
  const course = textbookAlignmentById(requestedCourse);
  const series = textbookAlignmentSeriesForCourse(course);
  const reverseIndex = textbookReverseToolIndex(course);
  const strongCount = course.chapters.filter((chapter) => chapter.coverage === "Strong").length;
  const partialCount = course.chapters.filter((chapter) => chapter.coverage === "Partial").length;
  app.innerHTML = `
    ${pageHeader(
      "Textbook Alignments",
      "Connect a school textbook sequence to Kaizen Maths tools, worksheets, worked examples, and classroom practice.",
      `<a class="button primary" href="#/worksheet-generator">Build Worksheet</a><a class="button" href="#/coverage-map">Coverage Map</a>`
    )}
    <section class="textbook-page">
      <section class="textbook-hero-panel">
        <div>
          <span class="eyebrow">Textbook Alignment Hub</span>
          <h2>${escapeHtml(series.title)}</h2>
          <p>${escapeHtml(series.description)}</p>
        </div>
        <div class="textbook-metrics" aria-label="Textbook alignment summary">
          <span><strong>${course.chapters.length}</strong> units mapped</span>
          <span><strong>${strongCount}</strong> strong matches</span>
          <span><strong>${partialCount}</strong> partial matches</span>
        </div>
      </section>

      <section class="textbook-series-panel">
        <div class="coverage-panel-head">
          <div>
            <span class="eyebrow">${escapeHtml(series.publisher)} Series</span>
            <h2>${escapeHtml(course.course)}</h2>
            <p>${escapeHtml(course.basis)}</p>
          </div>
        </div>
        <div class="textbook-course-tabs" aria-label="Available textbook levels">
          ${series.levels.map((level) => textbookAlignmentLevelLink(level, course)).join("")}
        </div>
      </section>

      <section class="textbook-map-panel">
        <div class="coverage-panel-head">
          <div>
            <span class="eyebrow">Chapter To Tool Map</span>
            <h2>${escapeHtml(course.course)} pilot map</h2>
            <p>A compact map from the likely textbook sequence to the best Kaizen tools for teaching, practice, worksheets, and intervention.</p>
          </div>
          <a class="button" href="#/tools">Open Tool Library</a>
        </div>
        <table class="textbook-alignment-table">
          <thead>
            <tr>
              <th scope="col">Textbook Unit</th>
              <th scope="col">Focus and Use</th>
              <th scope="col">Kaizen Tools</th>
            </tr>
          </thead>
          <tbody>
            ${course.chapters.map((chapter) => `
              <tr>
                <th scope="row">
                  <span>${escapeHtml(chapter.code)}</span>
                  ${escapeHtml(chapter.title)}
                  <small data-coverage="${escapeHtml(chapter.coverage.toLowerCase())}">${escapeHtml(chapter.coverage)} match</small>
                </th>
                <td>
                  <p class="textbook-focus-line">${escapeHtml(chapter.focus)}</p>
                  <small class="textbook-use-line">${escapeHtml(chapter.teacherMove)}</small>
                </td>
                <td>
                  <div class="textbook-tool-list">
                    ${chapter.tools.map(alignmentToolChip).join("")}
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>

      <section class="textbook-map-panel">
        <div class="coverage-panel-head">
          <div>
            <span class="eyebrow">Reverse Lookup</span>
            <h2>Kaizen tools used in this ${escapeHtml(course.course)} map</h2>
            <p>This lets a teacher start from a Kaizen tool and see where it fits into the textbook sequence.</p>
          </div>
        </div>
        <ul class="textbook-reverse-list">
          ${reverseIndex.map(({ tool, chapters }) => `
            <li>
              <a href="#/tools/${escapeHtml(tool.slug)}">${escapeHtml(tool.title)}</a>
              <span>${chapters.map((chapter) => escapeHtml(chapter)).join(" · ")}</span>
            </li>
          `).join("")}
        </ul>
      </section>
    </section>
  `;
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

function videoCard(video, options = {}) {
  const display = universityVideoOverrides(video);
  const url = display.youtube_url || "";
  const youtubeId = youtubeIdFromUrl(url);
  const completed = Boolean(options.progress?.completed_modules?.[video.id]);
  return `
    <article class="video-card ${options.certification ? "certification-module-card" : ""} ${completed ? "complete" : ""}">
      ${youtubeId
        ? `<div class="video-embed"><iframe src="https://www.youtube.com/embed/${escapeHtml(youtubeId)}" title="${escapeHtml(display.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`
        : `<div class="video-placeholder"><span>▶</span><small>YouTube embed</small></div>`}
      <div class="video-card-copy">
        <span class="eyebrow">${options.moduleNumber ? `Module ${options.moduleNumber}` : escapeHtml(display.duration_label)}</span>
        <h3>${escapeHtml(display.title)}</h3>
        <p>${escapeHtml(display.description)}</p>
        ${options.certification ? `
          <button class="button ${completed ? "subtle" : "primary"} certification-module-toggle" type="button" data-certification-module="${escapeHtml(video.id)}">
            ${completed ? "Completed" : "Mark Complete"}
          </button>
        ` : ""}
      </div>
    </article>
  `;
}

function renderKaizenUniversity() {
  const progress = certificationProgress();
  const totals = certificationTotals(progress);
  const certified = certificationIsComplete(progress);
  const signedIn = isSignedIn();
  const activeLesson = certificationLessonById(certificationActiveLessonId(progress)) || totals.modules[0];
  const activeDisplay = activeLesson ? universityVideoOverrides(activeLesson) : null;
  const activeYoutubeId = activeDisplay?.youtube_url ? youtubeIdFromUrl(activeDisplay.youtube_url) : "";
  const watched = Boolean(activeLesson && (progress.watched_lessons?.[activeLesson.id] || progress.completed_modules?.[activeLesson.id]));
  const lessonComplete = Boolean(activeLesson && progress.completed_modules?.[activeLesson.id]);
  const lessonsComplete = totals.completedModules === totals.totalModules;
  const activeAnswers = activeLesson ? progress.lesson_answers?.[activeLesson.id] || {} : {};

  app.innerHTML = `
    ${pageHeader(
      "Kaizen University",
      "Complete the Kaizen Certified Teacher pathway through short videos, quick checks, and practical implementation commitments.",
      `<a class="button" href="#/">Back to Dashboard</a><a class="button primary" href="#/how-to-use-this-site">Open Site Guide</a>`
    )}
    <section class="university-hero panel certification-hero">
      <div>
        <span class="eyebrow">Kaizen Certified Teacher</span>
        <h2>${certified ? "Certification Complete" : "Complete Your Certification"}</h2>
        <p>This pathway helps teachers move beyond a demo and commit to using Kaizen Maths confidently: finding topics, teaching from Classroom View, using curriculum alignment, creating worksheets, and building assessment resources.</p>
        ${signedIn ? `
          <p class="certification-save-note">${state.universityProgressSource === "supabase" ? "Progress is saved to your teacher account." : "Progress is saved in this browser until the certification progress table is added in Supabase."}</p>
        ` : `
          <p class="certification-save-note">Sign in to save certification progress to your teacher account.</p>
          <button class="button primary" type="button" data-auth-action="signin">Sign In To Track Certification</button>
        `}
      </div>
      <div class="certification-progress-card">
        <strong>${totals.percent}%</strong>
        <span>${totals.completeItems} of ${totals.totalItems} certification requirements complete</span>
        <div class="certification-progress-bar"><i style="width:${totals.percent}%"></i></div>
        <ul>
          <li>${totals.completedModules}/${totals.totalModules} locked lessons complete</li>
          <li>${totals.completedTasks}/${totals.totalTasks} practical tasks</li>
          <li>${certified ? "Profile title: Kaizen Certified Teacher" : "Certificate unlocks after completion"}</li>
        </ul>
      </div>
    </section>
    <section class="certification-overview panel">
      <article>
        <span class="eyebrow">1</span>
        <h3>Follow The Pathway</h3>
        <p>Lessons unlock in order so every teacher completes the same core training route.</p>
      </article>
      <article>
        <span class="eyebrow">2</span>
        <h3>Watch And Check</h3>
        <p>Confirm each video, then answer a short check before the next lesson opens.</p>
      </article>
      <article>
        <span class="eyebrow">3</span>
        <h3>Commit To Practice</h3>
        <p>Complete practical tasks that show readiness to use Kaizen Maths in real teaching.</p>
      </article>
      <article>
        <span class="eyebrow">4</span>
        <h3>Unlock Recognition</h3>
        <p>The certificate and admin status update when the pathway is complete.</p>
      </article>
    </section>
    <section class="certification-pathway">
      <aside class="certification-module-list" aria-label="Certification modules">
        ${universitySections.map((section) => {
          const sectionProgress = certificationSectionProgress(section, progress);
          return `
            <section class="certification-module-panel ${sectionProgress.completed === sectionProgress.total ? "complete" : ""}">
              <div class="certification-module-head">
                <span class="eyebrow">Module ${escapeHtml(String(universitySections.indexOf(section) + 1))}</span>
                <h3>${escapeHtml(section.title.replace(/^Module \d+:\s*/, ""))}</h3>
                <small>${sectionProgress.completed}/${sectionProgress.total} lessons</small>
              </div>
              <p>${escapeHtml(section.intro)}</p>
              <div class="certification-lesson-list">
                ${section.videos.map((lesson) => {
                  const unlocked = certificationLessonUnlocked(lesson.id, progress);
                  const complete = Boolean(progress.completed_modules?.[lesson.id]);
                  const current = activeLesson?.id === lesson.id;
                  return `
                    <button class="certification-lesson-row ${current ? "current" : ""} ${complete ? "complete" : ""}" type="button" data-certification-select="${escapeHtml(lesson.id)}" ${unlocked ? "" : "disabled"}>
                      <span>Lesson ${escapeHtml(String(lesson.lessonNumber || section.videos.indexOf(lesson) + 1))}</span>
                      <strong>${escapeHtml(lesson.title)}</strong>
                      <small>${complete ? "Complete" : unlocked ? current ? "Current" : "Open" : "Locked"}</small>
                    </button>
                  `;
                }).join("")}
              </div>
            </section>
          `;
        }).join("")}
      </aside>
      <article class="panel certification-active-lesson" data-active-certification-lesson="${escapeHtml(activeLesson?.id || "")}">
        <div class="university-section-head">
          <span class="eyebrow">${activeLesson ? `Module ${activeLesson.moduleNumber} · Lesson ${activeLesson.lessonNumber}` : "Certification lesson"}</span>
          <h2>${escapeHtml(activeDisplay?.title || "Certification Lesson")}</h2>
          <p>${escapeHtml(activeDisplay?.description || "Choose a lesson from the pathway to begin.")}</p>
        </div>
        ${activeYoutubeId
          ? `<div class="video-embed certification-video"><iframe src="https://www.youtube.com/embed/${escapeHtml(activeYoutubeId)}" title="${escapeHtml(activeDisplay.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`
          : `<div class="video-placeholder certification-video"><span>▶</span><small>Add this YouTube link in Admin</small></div>`}
        <div class="certification-lesson-gate">
          <div>
            <strong>${watched ? "Video confirmed" : "Start with the video"}</strong>
            <p>${watched ? "The quick check is available. Complete it to unlock the next lesson." : "After watching the video, confirm completion to open the quick check."}</p>
          </div>
          <button class="button ${watched ? "subtle" : "primary"}" id="confirmCertificationVideo" type="button" ${lessonComplete ? "disabled" : ""}>
            ${watched ? "Watched" : "Confirm I Watched This Video"}
          </button>
        </div>
        <div class="certification-checks ${watched ? "" : "locked"}">
          <h3>Quick Check</h3>
          ${(activeLesson?.checks || []).map((item, index) => `
            <fieldset class="certification-question">
              <legend>${index + 1}. ${escapeHtml(item.question)}</legend>
              ${item.options.map(([value, label]) => `
                <label>
                  <input type="radio" data-certification-check="${escapeHtml(item.id)}" name="certification-check-${escapeHtml(activeLesson.id)}-${escapeHtml(item.id)}" value="${escapeHtml(value)}" ${activeAnswers[item.id] === value ? "checked" : ""} ${watched && !lessonComplete ? "" : "disabled"}>
                  <span>${escapeHtml(label)}</span>
                </label>
              `).join("")}
            </fieldset>
          `).join("")}
          <div class="certification-actions">
            <button class="button primary" id="submitCertificationLesson" type="button" ${watched && !lessonComplete ? "" : "disabled"}>${lessonComplete ? "Lesson Complete" : "Check And Continue"}</button>
            <span id="certificationLessonStatus">${lessonComplete ? "This lesson is complete." : watched ? "Choose an answer, then continue." : "Confirm the video first."}</span>
          </div>
        </div>
      </article>
    </section>
    <section class="certification-checkout-grid">
      <article class="panel certification-practical ${lessonsComplete ? "" : "locked"}">
        <div class="university-section-head">
          <h2>Practical Commitment</h2>
          <p>${lessonsComplete ? "Complete these implementation commitments before certification is awarded." : "This opens after all pathway lessons are complete."}</p>
        </div>
        <div class="certification-task-list">
          ${certificationPracticalTasks.map((task) => `
            <label class="certification-task">
              <input type="checkbox" data-certification-task="${escapeHtml(task.id)}" ${progress.practical_tasks?.[task.id] ? "checked" : ""} ${lessonsComplete ? "" : "disabled"}>
              <span>
                <strong>${escapeHtml(task.title)}</strong>
                <small>${escapeHtml(task.description)}</small>
              </span>
            </label>
          `).join("")}
        </div>
      </article>
      <article class="panel certification-practical">
        <div class="certification-certificate-box ${certified ? "ready" : ""}">
          <span class="eyebrow">Certificate</span>
          <h3>${certified ? "Ready To Download" : "Locked Until Complete"}</h3>
          <p>${certified ? `Certified on ${escapeHtml(formatDisplayDate(progress.certified_at))}. Your admin status also shows Kaizen Certified Teacher.` : "Complete the lessons and confirm the practical tasks to unlock the certificate and profile title."}</p>
          <button class="button primary" id="downloadCertificationCertificate" type="button" ${certified ? "" : "disabled"}>Print / Save Certificate</button>
        </div>
        <div class="certification-next-pathway">
          <span class="eyebrow">Coming Next</span>
          <h3>Advanced Certification Pathways</h3>
          <p>Later pathways can cover department rollout, intervention leadership, tutor workflows, and school pilot implementation.</p>
        </div>
      </article>
    </section>
  `;
  bindAuthActions();
  bindKaizenUniversityCertification();
}

function teacherDisplayName() {
  const auth = authState();
  return auth.profile?.full_name
    || auth.session?.user?.user_metadata?.full_name
    || auth.session?.user?.email
    || "Kaizen Maths Teacher";
}

function openCertificationCertificate() {
  const progress = certificationProgress();
  if (!certificationIsComplete(progress)) {
    window.alert("Complete the lessons and practical tasks before generating the certificate.");
    return;
  }
  const name = teacherDisplayName();
  const certifiedDate = formatDisplayDate(progress.certified_at || new Date().toISOString());
  const certificate = window.open("", "_blank");
  if (!certificate) {
    window.alert("The browser blocked the certificate window. Allow pop-ups for this site and try again.");
    return;
  }
  certificate.document.write(`<!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Kaizen Certified Teacher Certificate</title>
      <style>
        body{margin:0;background:#eef3f8;font-family:Arial,sans-serif;color:#172033;}
        .certificate{min-height:100vh;display:grid;place-items:center;padding:32px;}
        .page{width:min(980px,100%);border:12px solid #17b8b3;border-radius:18px;background:#fff;padding:54px;text-align:center;box-shadow:0 24px 70px rgba(23,32,51,.18);}
        .eyebrow{text-transform:uppercase;letter-spacing:.12em;color:#6f4cc3;font-weight:800;font-size:.82rem;}
        h1{margin:14px 0 8px;font-size:clamp(2.2rem,5vw,4rem);line-height:1.05;color:#282450;}
        h2{margin:28px 0 8px;font-size:clamp(1.6rem,3vw,2.5rem);color:#0f766e;}
        p{font-size:1.05rem;line-height:1.6;color:#4a5570;}
        .seal{width:104px;height:104px;margin:24px auto;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#6f4cc3,#17b8b3);color:#fff;font-weight:900;font-size:2rem;}
        .footer{display:flex;justify-content:space-between;gap:24px;margin-top:42px;border-top:1px solid #dfe6ef;padding-top:18px;text-align:left;color:#4a5570;font-weight:700;}
        button{margin:18px auto 0;display:block;border:0;border-radius:10px;padding:12px 18px;background:#0f766e;color:#fff;font-weight:800;cursor:pointer;}
        @media print{body{background:#fff}.certificate{padding:0}.page{box-shadow:none;border-radius:0;min-height:calc(100vh - 24px)}button{display:none}}
      </style>
    </head>
    <body>
      <main class="certificate">
        <section class="page">
          <span class="eyebrow">Kaizen Maths</span>
          <h1>Certificate of Completion</h1>
          <p>This certifies that</p>
          <h2>${escapeHtml(name)}</h2>
          <p>has completed the <strong>Kaizen Certified Teacher</strong> pathway and demonstrated readiness to use Kaizen Maths for classroom practice, worked examples, worksheets, assessment, differentiation, and teacher-led instruction.</p>
          <div class="seal">K</div>
          <div class="footer">
            <span>Certified on ${escapeHtml(certifiedDate)}</span>
            <span>Generated by Kaizen Maths</span>
          </div>
          <button onclick="window.print()">Print / Save PDF</button>
        </section>
      </main>
    </body>
    </html>`);
  certificate.document.close();
  certificate.focus();
}

function bindKaizenUniversityCertification() {
  document.querySelectorAll("[data-certification-select]").forEach((button) => {
    button.addEventListener("click", async () => {
      const lessonId = button.dataset.certificationSelect;
      const progress = certificationProgress();
      if (!certificationLessonUnlocked(lessonId, progress)) return;
      setCertificationActiveLesson(lessonId);
      renderRoute();
    });
  });

  document.getElementById("confirmCertificationVideo")?.addEventListener("click", async () => {
    const lessonId = document.querySelector("[data-active-certification-lesson]")?.dataset.activeCertificationLesson || "";
    if (!lessonId) return;
    const progress = certificationProgress();
    await saveCertificationProgress({
      ...progress,
      watched_lessons: {
        ...progress.watched_lessons,
        [lessonId]: true
      }
    });
  });

  document.getElementById("submitCertificationLesson")?.addEventListener("click", async () => {
    const lessonId = document.querySelector("[data-active-certification-lesson]")?.dataset.activeCertificationLesson || "";
    const lesson = certificationLessonById(lessonId);
    if (!lesson) return;
    const answers = {};
    let allCorrect = true;
    (lesson.checks || []).forEach((item) => {
      const selected = document.querySelector(`input[data-certification-check="${CSS.escape(item.id)}"]:checked`)?.value || "";
      answers[item.id] = selected;
      if (selected !== item.answer) allCorrect = false;
    });
    const status = document.getElementById("certificationLessonStatus");
    if (!allCorrect) {
      if (status) status.textContent = "Not quite. Review the video, adjust your answer, and try again.";
      return;
    }
    const progress = certificationProgress();
    const next = {
      ...progress,
      watched_lessons: {
        ...progress.watched_lessons,
        [lessonId]: true
      },
      lesson_answers: {
        ...progress.lesson_answers,
        [lessonId]: answers
      },
      completed_modules: {
        ...progress.completed_modules,
        [lessonId]: true
      }
    };
    setCertificationActiveLesson(nextCertificationLessonId(lessonId, next));
    await saveCertificationProgress(next);
  });

  document.querySelectorAll("[data-certification-task]").forEach((input) => {
    input.addEventListener("change", async () => {
      const progress = certificationProgress();
      await saveCertificationProgress({
        ...progress,
        practical_tasks: {
          ...progress.practical_tasks,
          [input.dataset.certificationTask]: input.checked
        }
      });
    });
  });

  document.getElementById("downloadCertificationCertificate")?.addEventListener("click", openCertificationCertificate);
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
      ${worksheetBrandingFooterHtml()}
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
  "classroom-displays": ["concept-explainer", "dynamic-classroom-displays", "bar-models", "area-models"],
  "dynamic-classroom-displays": ["concept-explainer", "classroom-displays", "graph-transformations-curve-sketching", "circle-theorems"],
  "concept-explainer": ["anchor-charts", "classroom-displays", "dynamic-classroom-displays", "bar-models"],
  "anchor-charts": ["elementary-manipulatives", "elementary-maths-playground", "bar-models", "area-models"],
  "word-search-builder": ["fractions-table", "elementary-starter-board", "elementary-maths-playground", "classroom-displays"],
  "bar-models": ["anchor-charts", "area-models", "elementary-manipulatives", "elementary-maths-playground"],
  "area-models": ["anchor-charts", "bar-models", "elementary-manipulatives", "fractions-practice"],
  "elementary-maths-playground": ["anchor-charts", "bar-models", "area-models", "elementary-starter-board"],
  "transformations": ["free-vectors", "scale-drawing-similar-shapes", "straight-lines", "equation-of-a-circle"],
  "formal-geometric-proof": ["missing-angles", "polygons-angles", "circle-theorems", "transformations"],
  "polygons-angles": ["formal-geometric-proof", "missing-angles", "circle-theorems", "loci-constructions"],
  "circle-theorems": ["formal-geometric-proof", "missing-angles", "polygons-angles", "circles-area-circumference"],
  "earth-geometry": ["bearings", "trigonometric-ratios", "circles-area-circumference", "sectors-arc-length"],
  "bearings": ["trigonometric-ratios", "earth-geometry", "missing-angles", "sine-cosine-rule"],
  "integer-operations": ["four-operations", "order-of-operations", "absolute-values", "number-bases-number-sets"],
  "fractions-practice": ["fractions", "decimals-practice-lab", "simple-percentage-tasks", "ratio-proportion"],
  "financial-real-life-maths": ["percentages-real-world", "simple-percentage-tasks", "ratio-proportion", "decimals-practice-lab"],
  "percentages-real-world": ["financial-real-life-maths", "simple-percentage-tasks", "ratio-proportion", "upper-lower-bounds"],
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
  "limits-first-principles": ["differentiation-polynomials", "advanced-differentiation", "series-expansions", "numerical-methods"],
  "series-expansions": ["limits-first-principles", "differentiation-polynomials", "integration", "advanced-integration"],
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

  if (haystack.includes("primary") || haystack.includes("elementary") || haystack.includes("anchor chart") || haystack.includes("manipulative")) {
    standards.push("Common Core: elementary number sense, operations, place value, fractions, measurement, geometry, and mathematical reasoning standards where relevant.");
    standards.push("England: KS1/KS2 number, fractions, measurement, geometry, and mathematical vocabulary, with links into KS3 intervention.");
    standards.push("International primary curricula: supports visual modelling, mathematical language, concrete-pictorial-abstract progression, and teacher-led explanation.");
  } else if (haystack.includes("matrix") || haystack.includes("matrices") || haystack.includes("determinant") || haystack.includes("eigenvalue")) {
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
  } else if (haystack.includes("proof") || haystack.includes("congruence") || haystack.includes("similarity")) {
    standards.push("Common Core: HSG-CO and HSG-SRT for geometric proof, congruence, similarity, transformations, and theorem-based reasoning.");
    standards.push("England / international: GCSE geometry reasoning, proof, angle facts, circle theorems, congruence, and similarity.");
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
    "uk ks2",
    "uk ks3",
    "key stage 2",
    "key stage 3",
    "uk",
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
    "oman ged",
    "oman",
    "ged",
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
    "ukks2",
    "ukks3",
    "keystage2",
    "keystage3",
    "uk",
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
    "omanged",
    "oman",
    "ged",
    "ib",
    "ap",
    "aqa",
    "edexcel",
    "ocr"
  ]);
  if (meta.has(value) || compactMeta.has(compact)) return true;
  return /\b(ks2|ks3|ks4|ks5|gcse|igcse|uk\s*ks2|uk\s*ks3|key\s*stage\s*2|key\s*stage\s*3|a[-\s]?level|aqa|edexcel|ocr|common\s*core|csec|cape|oman\s*ged|oman|ged|ib|ap)\b/.test(value);
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
    .replace(/\b(UK\s*KS2|UK\s*KS3|Key\s*Stage\s*2|Key\s*Stage\s*3|KS2|KS3|KS4|KS5|GCSE|IGCSE|A[-\s]?Level|AQA|Edexcel|OCR|Common\s*Core|CSEC|CAPE|Oman\s*GED|Oman|GED|IB|AP)\b/gi, "")
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
  return renderToolCurriculumStandards(tool);
}

function toolCurriculumLinks(tool) {
  const haystack = normalise([tool.title, tool.category, toolSubjectGroup(tool), tool.level, tool.type, tool.description, allToolTags(tool).join(" ")].join(" "));
  const links = [];
  const add = (label) => {
    if (!links.includes(label)) links.push(label);
  };
  const schoolRoute = /\b(ks2|ks3|ks4|gcse|igcse|csec)\b/.test(haystack);
  const omanRoute = /\boman\b|\bged\b/.test(haystack) || haystack.includes("general education diploma");
  const advancedRoute = /\b(a[-\s]?level|cape|ib|ap)\b/.test(haystack) || haystack.includes("further maths") || haystack.includes("calculus") || haystack.includes("mechanics");

  if (/\bks2\b/.test(haystack) || haystack.includes("key stage 2")) add("UK KS2");
  if (/\bks3\b/.test(haystack) || haystack.includes("key stage 3")) add("UK KS3");
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
  if (omanRoute) add("Oman GED");
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
      match: () => tool.slug === "formal-geometric-proof" || has("formal proof", "statement reason", "theorem chains", "geometric proof"),
      misconceptions: [
        "Writing a true geometric statement without giving the theorem, definition, or given fact that justifies it.",
        "Using a diagram as if it is drawn to scale instead of proving the relationship from marked information.",
        "Writing congruence or similarity statements with corresponding vertices in the wrong order."
      ],
      questions: [
        "Which statement is known from the diagram, and which statement still needs to be proved?",
        "What theorem, definition, or given fact justifies this exact step in the proof chain?",
        "How does the order of the vertices show which sides and angles correspond?"
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
      match: () => tool.slug === "polygons-angles" || has("polygons", "interior angles", "exterior angles", "regular polygons"),
      misconceptions: [
        "Dividing the interior angle sum by the number of sides when the polygon is not regular.",
        "Using 180 degrees as the exterior angle sum instead of recognising that exterior angles make one full turn of 360 degrees.",
        "Finding the number of sides from an interior angle without first converting it to the corresponding exterior angle."
      ],
      questions: [
        "How do we know whether this question needs the interior angle sum, the exterior angle sum, or both?",
        "Why does the exterior angle method often give the number of sides more directly for regular polygons?",
        "What changes in the algebra when the polygon is irregular rather than regular?"
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
        "Thinking the decimal point itself moves when multiplying or dividing by powers of ten, rather than shifting digits through fixed place-value columns."
      ],
      questions: [
        "Which place-value column controls this calculation?",
        "How can adding placeholder zeros make the decimal operation clearer without changing the value?",
        "How do the digits shift through the fixed decimal point, and what estimate should the answer be close to?"
      ]
    },
    {
      match: () => tool.slug === "integer-operations" || has("integer operations", "directed numbers", "negative numbers"),
      misconceptions: [
        "Thinking -12 is greater than -5 because 12 is the larger digit, instead of using position on the number line.",
        "Forgetting that subtracting a negative number means adding its opposite, for example 4 - (-7) = 4 + 7.",
        "Using multiplication sign rules for addition, even though adding integers depends on direction and distance."
      ],
      questions: [
        "Where would each integer sit on a number line, and how does that decide which one is greater?",
        "How does changing subtraction into adding the opposite make the direction of movement clearer?",
        "Why do multiplication and division of integers use same-sign and different-sign rules, but addition and subtraction do not?"
      ]
    },
    {
      match: () => tool.slug === "financial-real-life-maths" || has("financial maths", "best buys", "hire purchase", "commission", "depreciation", "exchange rates"),
      misconceptions: [
        "Comparing total prices rather than unit prices in best-buy questions.",
        "Confusing markup with profit margin, even though markup uses cost price and margin uses selling price.",
        "Applying a percentage change to the wrong amount in multi-step finance questions, especially discount followed by VAT or compound change over time."
      ],
      questions: [
        "What quantity is the financial decision actually comparing: total cost, unit cost, profit, interest, or amount left?",
        "Which amount is the original whole for this percentage or money calculation?",
        "How can we check whether the final answer is sensible in the context of money, borrowing, saving, or exchange?"
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
        "Shifting digits the wrong way when deciding the power of ten in standard form.",
        "Combining numbers in standard form without applying index laws correctly."
      ],
      questions: [
        "How does the digit shift needed to make the coefficient determine the sign of the power of ten?",
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
      match: () => tool.slug === "anchor-charts" || has("anchor charts", "reference charts", "visual reference"),
      misconceptions: [
        "Showing the completed chart too early, so pupils copy the rule without first connecting it to the visual model.",
        "Treating vocabulary such as numerator, denominator, product, perimeter, or place value as labels to memorise rather than meanings linked to the diagram.",
        "Using a chart that looks tidy but does not preserve the key mathematical structure, such as unequal fraction parts or unequal bar-model parts.",
        "Moving from the visual straight to the answer without asking pupils what each part of the model represents."
      ],
      questions: [
        "What should pupils notice in the visual before the written rule is revealed?",
        "Which part of the chart shows the mathematical structure, not just the vocabulary?",
        "How could a pupil use this chart to explain the method to someone else?",
        "What example, non-example, or misconception would make this anchor chart stronger?"
      ]
    },
    {
      match: () => tool.slug === "concept-explainer" || has("concept explainer", "explanation board", "shape properties", "circle parts", "algebra language"),
      misconceptions: [
        "Naming a property without connecting it to the marking, label, or notation on the display.",
        "Assuming a property of one quadrilateral applies to every quadrilateral.",
        "Confusing vertices, edges, faces, sides, arcs, chords, radii, and diameters because the vocabulary is not tied to a visible part.",
        "Using algebra vocabulary such as coefficient, term, variable, power, equation, and expression without identifying the exact part it describes."
      ],
      questions: [
        "Which marking or label on the display proves this property, and what does that notation mean?",
        "Which properties stay true if the shape is moved, rotated, or resized?",
        "How would you explain this property without relying on the label?",
        "Which examples and non-examples would help students avoid overgeneralising this idea?"
      ]
    },
    {
      match: () => tool.slug === "dynamic-classroom-displays" || has("dynamic displays", "interactive graphs", "animated transformations", "circle equation", "circle theorems", "trigonometric graphs", "complex numbers", "calculus"),
      misconceptions: [
        "Treating a slider movement as decoration rather than using it to describe the mathematical invariant that stays true.",
        "Reading transformed graphs by memorising a movement rule without checking how key points have changed.",
        "Assuming a circle theorem is true from one drawing only, instead of noticing that the relationship remains true as the points move.",
        "For equations of circles, confusing movement of the centre with movement of the radius.",
        "In transformations, focusing only on the final image without explaining how the object moves from the original to the image."
      ],
      questions: [
        "What stays the same as the diagram changes, and what changes?",
        "Which key point, angle, or graph feature gives the strongest evidence for the transformation or theorem?",
        "How does the equation change when the centre moves, and how does it change when only the radius changes?",
        "How does the animation help explain the transformation rule, not just the final position?",
        "How could a student use the dynamic display to explain the result before writing the formal solution?"
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
      match: () => tool.slug === "area-models" || has("area models", "arrays", "partitioned multiplication"),
      misconceptions: [
        "Counting the squares one by one when the structure is intended to show multiplication as rows multiplied by columns.",
        "Partitioning one side of a rectangle but forgetting that every part on one side must multiply every part on the other side.",
        "Treating the area model as a drawing only, rather than using each cell to justify a partial product or algebraic term.",
        "Expanding brackets without collecting like terms after all cell products have been found.",
        "Factorising from an area model without checking that the middle terms add to the original coefficient."
      ],
      questions: [
        "What does each side length or side label represent in this model?",
        "How does the total area prove the multiplication, expansion, or factorisation step?",
        "Which cell would be missing if we only multiplied the first terms in two brackets?",
        "How can the same rectangle show both the expanded expression and the factorised expression?",
        "What changes in the model when we move from numerical area to algebraic area?"
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

function curriculumStandardMatchesTool(standard, tool) {
  return (standard.tools || []).some(([slug]) => slug === tool.slug);
}

function curriculumStandardsForTool(framework, tool, filter = null) {
  if (!framework) return [];
  return framework.standards
    .filter((standard) => !filter || filter(standard))
    .filter((standard) => curriculumStandardMatchesTool(standard, tool));
}

function curriculumStandardLine(framework, standard, routeLabel = framework.label) {
  const standardIndex = framework.standards.indexOf(standard);
  const targetId = curriculumStandardDomId(framework, standard, Math.max(0, standardIndex));
  return `
    <li class="curriculum-standard-link">
      <a href="#/curriculum-alignments/${escapeHtml(framework.id)}/${escapeHtml(targetId)}">
        <span>${escapeHtml(routeLabel)}</span>
        <strong>${escapeHtml(standard.code)}: ${escapeHtml(standard.title)}</strong>
      </a>
      <small>${escapeHtml(standard.focus)}</small>
    </li>
  `;
}

function renderToolCurriculumStandards(tool) {
  const schoolContext = currentSchoolContext();
  const schoolCurriculumId = currentSchoolCurriculumId();
  const schoolFramework = schoolCurriculumId ? curriculumAlignmentById(schoolCurriculumId) : null;

  if (schoolContext && schoolFramework) {
    const matches = curriculumStandardsForTool(schoolFramework, tool);
    const schoolLabel = schoolContext.standards_label || schoolFramework.label;
    return `
      <ul class="standards-list curriculum-standards-list">
        ${matches.length
          ? matches.slice(0, 4).map((standard) => curriculumStandardLine(schoolFramework, standard, schoolLabel)).join("")
          : `<li class="curriculum-standard-link">
              <a href="#/curriculum-alignments/${escapeHtml(schoolFramework.id)}">
                <span>${escapeHtml(schoolLabel)}</span>
                <strong>View the school curriculum alignment map</strong>
              </a>
              <small>This tool does not yet have a direct row in the school map, but the full alignment can be reviewed from here.</small>
            </li>`}
      </ul>
    `;
  }

  const defaultRoutes = [
    { id: "common-core", label: "Common Core" },
    { id: "ib-mathematics", label: "IB MYP", filter: (standard) => /^MYP\b/i.test(standard.code) },
    { id: "gcse", label: "UK GCSE" }
  ];
  const rows = defaultRoutes.map((route) => {
    const framework = curriculumAlignmentById(route.id);
    const matches = curriculumStandardsForTool(framework, tool, route.filter);
    if (framework && matches.length) {
      return matches.slice(0, 2).map((standard) => curriculumStandardLine(framework, standard, route.label)).join("");
    }
    return `
      <li class="curriculum-standard-link">
        <a href="#/curriculum-alignments/${escapeHtml(route.id)}">
          <span>${escapeHtml(route.label)}</span>
          <strong>View the full ${escapeHtml(route.label)} alignment map</strong>
        </a>
        <small>Use the curriculum map to review the closest strand for this tool.</small>
      </li>
    `;
  }).join("");
  return `<ul class="standards-list curriculum-standards-list">${rows}</ul>`;
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
          <span class="eyebrow">${currentSchoolCurriculumId() ? "School Standards Link" : "Default Standards Links"}</span>
          ${renderToolCurriculumStandards(tool)}
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
  const classroomSchoolName = currentSchoolContext()?.school_name || currentSchoolName();
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
          ${startClassroom ? `<div class="classroom-toolbar-title" title="${escapeHtml(classroomSchoolName || "Classroom View")}">${classroomSchoolName ? `<span class="classroom-school-name">${escapeHtml(classroomSchoolName)}</span>` : "Classroom View"}</div>` : `<div class="badge-row">
            <span class="badge">${tool.category}</span>
            ${subjectGroup ? `<span class="badge subject-group">${escapeHtml(subjectGroup)}</span>` : ""}
            <span class="badge">${tool.level}</span>
            <span class="badge">${tool.type}</span>
            <span class="badge ${normalise(requiredAccessLabel(tool))}">${requiredAccessLabel(tool)}</span>
          </div>`}
          <div class="legacy-toolbar-actions">
            ${startClassroom ? "" : `<span class="tool-path">${tool.toolPath}</span>`}
            ${startClassroom ? "" : `<button class="button primary" id="focusTool" type="button">Classroom View</button>`}
            <button class="button classroom-fullscreen" id="classroomFullscreen" type="button">Full Screen</button>
            <button class="button classroom-capture" id="classroomCapture" type="button">Capture</button>
            <div class="classroom-write-tools">
              <button class="button classroom-draw-toggle" id="classroomDrawToggle" type="button" aria-pressed="false">Write</button>
              <div class="classroom-write-palette" aria-label="Writing tools">
                <button class="button classroom-annotation-control active" id="annotationPen" type="button" aria-pressed="true">Pen</button>
                <button class="button classroom-annotation-control" id="annotationHighlighter" type="button" aria-pressed="false">Highlighter</button>
                <button class="button classroom-annotation-control" id="annotationEraser" type="button" aria-pressed="false">Eraser</button>
                <button class="button classroom-annotation-control" id="annotationUndo" type="button">Undo</button>
                <button class="button classroom-annotation-control danger" id="annotationClear" type="button">Clear</button>
              </div>
            </div>
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
  const schoolContext = currentSchoolContext();
  const schoolContextItems = schoolContextBadges(schoolContext);
  const isSchoolUser = role === "school" && schoolName;
  const licenceEnds = profile.school_licence_ends_at || schoolById(profile.school_id)?.licence_ends_at || "";
  const schoolLogo = safeImageSource(schoolContext?.logo_url);
  const schoolInitial = (schoolName || "K").trim().charAt(0).toUpperCase() || "K";
  const contactPerson = String(schoolContext?.contact_person || "").trim();
  const schoolSynopsis = String(schoolContext?.school_synopsis || "").trim();

  if (!isSignedIn()) {
    app.innerHTML = `
      ${pageHeader(
        "School Space",
        "Sign in first, then connect your teacher account to a school licence or pilot.",
        `<a class="button primary" href="#/book-demo">Book a Demo Session</a><a class="button" href="#/schools">School Licence Notes</a>`
      )}
      <section class="school-space-page school-space-intro">
        <article class="panel school-join-card">
          <span class="eyebrow">Join Your School</span>
          <h2>Enter your school access code</h2>
          <p>Teachers must sign in with Google before a school code can be used. This lets Kaizen Maths attach the school licence to the correct teacher profile.</p>
          <label class="school-code-field">
            School code
            <input type="text" autocomplete="off" spellcheck="false" placeholder="Sign in first" disabled>
          </label>
          <div class="button-row">
            <button class="button primary" type="button" data-auth-action="signin">Sign in with Google to enter code</button>
            <a class="button" href="#/schools">Read School Access Notes</a>
          </div>
          <p class="school-join-status">After signing in, this same page will unlock the code box for school or pilot access.</p>
        </article>
        <article class="panel school-help-card">
          <span class="eyebrow">Different From School Access</span>
          <h2>Access notes are separate</h2>
          <p>The School Access page explains licences and pricing. This page is where signed-in teachers connect to an existing school licence, pilot, or department space.</p>
          <a class="button" href="#/schools">Read School Access Notes</a>
        </article>
      </section>
    `;
    bindAuthActions();
    return;
  }

  app.innerHTML = `
    ${pageHeader(
      "School Space",
      isSchoolUser
        ? `Welcome to ${escapeHtml(schoolName)} on Kaizen Maths.`
        : "Use the school code from your department to join a school licence.",
      `<a class="button primary" href="#/book-demo">Book a Demo Session</a><a class="button" href="#/schools">School Licence Notes</a>`
    )}
    <section class="school-space-page">
      ${isSchoolUser ? `
        <article class="panel school-status-card school-identity-card">
          <div class="school-identity-head">
            <div class="school-logo-frame">
              ${schoolLogo
                ? `<img src="${escapeHtml(schoolLogo)}" alt="${escapeHtml(schoolName)} logo">`
                : `<span>${escapeHtml(schoolInitial)}</span>`}
            </div>
            <div>
              <span class="eyebrow">${escapeHtml(schoolContext?.pilot_name || schoolContext?.organisation_name || "School Workspace")}</span>
              <h2>${escapeHtml(schoolName)}</h2>
              <p>${escapeHtml(schoolSynopsis || "Your school has access to Kaizen Maths for classroom practice, worksheets, assessments, worked examples, and teaching displays.")}</p>
            </div>
          </div>
          ${schoolContextItems.length ? `
            <div class="badge-row">
              ${schoolContextItems.map((item) => `<span class="badge">${escapeHtml(item)}</span>`).join("")}
            </div>
          ` : ""}
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
            <div>
              <span>Curriculum</span>
              <strong>${escapeHtml(schoolContext?.curriculum_focus || "Default")}</strong>
            </div>
            <div>
              <span>Standards</span>
              <strong>${escapeHtml(schoolContext?.standards_label || "Default")}</strong>
            </div>
            <div>
              <span>Country</span>
              <strong>${escapeHtml(schoolContext?.country || "Not set")}</strong>
            </div>
          </div>
          <div class="button-row">
            <a class="button primary" href="#/tools">Open Tool Library</a>
            <a class="button" href="#/worksheet-generator">Open Worksheet Builder</a>
          </div>
        </article>
        ${contactPerson ? `
          <article class="panel school-contact-card">
            <span class="eyebrow">School Contact</span>
            <h2>${escapeHtml(contactPerson)}</h2>
            <p>Your school lead for Kaizen Maths access, pilot updates, and local rollout questions.</p>
          </article>
        ` : ""}
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
            <a class="button" href="#/schools">Read School Access Notes</a>
          </div>
          <p class="school-join-status" id="schoolJoinStatus"></p>
        </article>
      `}
      ${isSchoolUser ? `
        <article class="panel school-help-card">
          <span class="eyebrow">Ready For Lessons</span>
          <h2>Use your school workspace</h2>
          <p>Open a topic, project questions in classroom view, build worksheets, or prepare assessment practice for your classes.</p>
          <div class="school-action-list">
            <a href="#/tools">Browse curriculum tools</a>
            <a href="#/coverage-map">View coverage map</a>
            <a href="#/kaizen-university">Complete Kaizen University certification</a>
          </div>
        </article>
      ` : `
        <article class="panel school-help-card">
          <span class="eyebrow">School Access</span>
          <h2>Sign in, then enter your code</h2>
          <p>Your school code connects your teacher account to the correct school or pilot space.</p>
        </article>
      `}
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
      `<a class="button primary" href="#/book-demo">Book School Demo</a><a class="button" href="#/school-space">Sign In to Join School Licence</a><a class="button" href="#/upgrade">Back to Upgrade</a>`
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
      "Book a Demo Session",
      "Arrange a short walkthrough of Kaizen Maths for individual teacher access, tutor use, or a school licence.",
      `<a class="button" href="#/schools">School Access</a><a class="button" href="#/kaizen-university">Complete Certification</a>`
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
  const defaultCurriculumId = school.default_curriculum_id || storedDefaultCurriculumForSchool(id);
  const teacherEmails = id ? schoolTeacherEmails(id).join("\n") : "";
  const currentSeats = id ? schoolSeatCount(id) : 0;
  const seatLimit = school.seat_limit || "";
  const seatCopy = id
    ? `${currentSeats} of ${seatLimit || "unlimited"} teacher seats in use`
    : "New school licence";
  const logo = safeImageSource(school.logo_url);
  const schoolInitial = (school.name || `School ${index + 1}`).trim().charAt(0).toUpperCase() || "K";
  const contextSummary = [
    school.pilot_name,
    school.organisation_name,
    school.country,
    school.currency_code,
    school.curriculum_focus,
    curriculumAlignmentLabelById(defaultCurriculumId),
    school.standards_label
  ].filter(Boolean).join(" · ");
  return `
    <article class="admin-school-row" data-school-row data-school-id="${escapeHtml(id)}">
      <div class="admin-school-default">
        <div class="admin-school-logo-preview" data-school-logo-preview>
          ${logo ? `<img src="${escapeHtml(logo)}" alt="${escapeHtml(school.name || "School")} logo preview">` : `<span>${escapeHtml(schoolInitial)}</span>`}
        </div>
        <strong>${escapeHtml(school.name || `School ${index + 1}`)}</strong>
        <small>${escapeHtml(seatCopy)}</small>
        <small>${school.is_active === false ? "Inactive" : "Active"} · Code: ${escapeHtml(school.join_code || "Not set")}</small>
        ${contextSummary ? `<small>${escapeHtml(contextSummary)}</small>` : `<small>No pilot/localisation settings yet</small>`}
      </div>
      <div class="admin-school-fields">
        <label>
          School name
          <input data-school-field="name" type="text" value="${escapeHtml(school.name || "")}" placeholder="School or trust name">
        </label>
        <label>
          Organisation / group
          <input data-school-field="organisation_name" type="text" value="${escapeHtml(school.organisation_name || "")}" placeholder="Jamaica Ministry Pilot">
        </label>
        <label>
          Pilot name
          <input data-school-field="pilot_name" type="text" value="${escapeHtml(school.pilot_name || "")}" placeholder="Region 6 Pilot">
        </label>
        <label>
          Country
          <input data-school-field="country" type="text" value="${escapeHtml(school.country || "")}" placeholder="Jamaica">
        </label>
        <label>
          Currency code
          <input data-school-field="currency_code" type="text" value="${escapeHtml(school.currency_code || "GBP")}" placeholder="JMD">
        </label>
        <label>
          Currency symbol
          <input data-school-field="currency_symbol" type="text" value="${escapeHtml(school.currency_symbol || "£")}" placeholder="J$">
        </label>
        <label>
          Locale
          <input data-school-field="locale" type="text" value="${escapeHtml(school.locale || "en-GB")}" placeholder="en-JM">
        </label>
        <label>
          Curriculum focus
          <input data-school-field="curriculum_focus" type="text" value="${escapeHtml(school.curriculum_focus || "")}" placeholder="UK KS2, UK KS3, CSEC, CAPE, Oman GED, MOE Jamaica">
        </label>
        <label>
          Default curriculum map
          <select data-school-field="default_curriculum_id">
            <option value="">Use text focus / ask teacher to select</option>
            ${curriculumAlignmentOptionMarkup(defaultCurriculumId, "")}
          </select>
          <small>Run the latest Supabase schema to save this across devices. Until then, this browser will remember the selected map.</small>
        </label>
        <label>
          Standards label
          <input data-school-field="standards_label" type="text" value="${escapeHtml(school.standards_label || "")}" placeholder="MOE Jamaica Mathematics Standards">
        </label>
        <label>
          School logo URL
          <input data-school-field="logo_url" type="text" value="${escapeHtml(school.logo_url || "")}" placeholder="Paste logo URL or upload a logo below">
        </label>
        <label>
          Upload school logo
          <input data-school-logo-upload type="file" accept="image/*">
        </label>
        <label>
          Contact person
          <input data-school-field="contact_person" type="text" value="${escapeHtml(school.contact_person || "")}" placeholder="Maths lead, HOD, pilot contact">
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
          School page synopsis
          <textarea data-school-field="school_synopsis" rows="4" placeholder="Short school-facing message shown on the School Space page">${escapeHtml(school.school_synopsis || "")}</textarea>
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

  if (!state.universityCertificationRecordsLoaded) {
    loadCertificationRecords({ rerender: true });
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
          <input class="admin-metadata-input" type="text" autocomplete="off" spellcheck="false" data-tool-slug="${escapeHtml(tool.slug)}" data-metadata-field="curriculum_tags" value="${escapeHtml(metadata.curriculum_tags || "")}" placeholder="UK KS2, UK KS3, CSEC, CAPE, Oman GED, Common Core, IGCSE, IB, AP">
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
        ${adminCertificationStatusHtml(profile)}
      </td>
      <td>
        <button class="button subtle admin-save-user" type="button" data-user-id="${escapeHtml(profile.id)}">Save</button>
      </td>
    </tr>
  `).join("") : `
    <tr>
      <td colspan="7">
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
      <button class="admin-tab" type="button" data-admin-tab="schools">Schools / Pilots</button>
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
            <tr><th>User</th><th>Role</th><th>School</th><th>Trial Until</th><th>Billing</th><th>Certification</th><th>Action</th></tr>
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
          <span class="eyebrow">School And Pilot Access</span>
          <h2>Schools / Pilots</h2>
          <p>Create school spaces, approve domains or teacher emails, set seat limits, select pilot settings, and personalise the school-facing page with a logo, contact person, and school synopsis.</p>
        </div>
        <div class="button-row">
          <button class="button" id="addSchoolRow" type="button">Add School</button>
          <button class="button primary" id="saveSchools" type="button">Save Schools</button>
        </div>
      </div>
      <p class="admin-status" id="adminSchoolsStatus">${
        state.schoolDefaultCurriculumSchemaMissing
          ? "Schools loaded. The selected default curriculum is being remembered in this browser until Supabase returns the default_curriculum_id column."
          : state.schoolsLoaded
            ? `Loaded ${state.schools.length} school${state.schools.length === 1 ? "" : "s"}.`
            : "Loading schools from Supabase..."
      }</p>
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
          <p>Add curriculum, exam-board, country, or route labels manually. Use commas between tags, for example: UK KS2, UK KS3, CSEC, CAPE, Oman GED, Common Core, IGCSE, IB, AP.</p>
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
          <h2>Certification Video Content</h2>
          <p>Paste the correct YouTube link beside each certification lesson. The first section controls the homepage video shown underneath the testimonials in the hero area.</p>
        </div>
        <button class="button primary" id="saveUniversityVideos" type="button">Save Video Content</button>
      </div>
      <p class="admin-status" id="adminVideoStatus">Use the lesson rows to update the videos teachers complete for certification. Empty copy fields use the default text. Paste full YouTube links, unlisted links, embed links, or video IDs.</p>
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
    await Promise.all([
      loadUserProfiles(),
      loadCertificationRecords()
    ]);
    button.disabled = false;
    renderRoute();
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

  function updateSchoolLogoPreview(row, value) {
    const preview = row?.querySelector("[data-school-logo-preview]");
    if (!preview) return;
    const logo = safeImageSource(value);
    const name = row.querySelector('[data-school-field="name"]')?.value.trim() || "School";
    const initial = name.charAt(0).toUpperCase() || "K";
    preview.innerHTML = logo
      ? `<img src="${escapeHtml(logo)}" alt="${escapeHtml(name)} logo preview">`
      : `<span>${escapeHtml(initial)}</span>`;
  }

  function bindSchoolLogoInputs(scope = document) {
    scope.querySelectorAll('[data-school-field="logo_url"]').forEach((input) => {
      input.addEventListener("input", () => updateSchoolLogoPreview(input.closest("[data-school-row]"), input.value));
    });
    scope.querySelectorAll('[data-school-field="name"]').forEach((input) => {
      input.addEventListener("input", () => updateSchoolLogoPreview(input.closest("[data-school-row]"), input.closest("[data-school-row]")?.querySelector('[data-school-field="logo_url"]')?.value || ""));
    });
    scope.querySelectorAll("[data-school-logo-upload]").forEach((input) => {
      input.addEventListener("change", async () => {
        const row = input.closest("[data-school-row]");
        const logoField = row?.querySelector('[data-school-field="logo_url"]');
        if (!row || !logoField || !input.files?.[0]) return;
        try {
          const dataUrl = await schoolLogoFileToDataUrl(input.files[0]);
          logoField.value = dataUrl;
          updateSchoolLogoPreview(row, dataUrl);
          if (schoolsStatus) schoolsStatus.textContent = "Logo ready. Click Save Schools to publish it.";
        } catch (error) {
          if (schoolsStatus) schoolsStatus.textContent = error.message;
        }
      });
    });
  }

  bindSchoolCodeButtons();
  bindSchoolLogoInputs();

  document.getElementById("addSchoolRow")?.addEventListener("click", () => {
    const rows = schoolList?.querySelectorAll("[data-school-row]").length || 0;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = adminSchoolRowHtml({ is_active: true, licence_type: "school" }, rows);
    const row = wrapper.firstElementChild;
    if (!row) return;
    schoolList?.appendChild(row);
    bindSchoolCodeButtons(row);
    bindSchoolLogoInputs(row);
    row.querySelector('[data-school-field="name"]')?.focus();
  });

  document.getElementById("saveSchools")?.addEventListener("click", async () => {
    const button = document.getElementById("saveSchools");
    const rows = [...document.querySelectorAll("[data-school-row]")];
    button.disabled = true;
    schoolsStatus.textContent = "Saving school licences...";
    try {
      state.schoolDefaultCurriculumSchemaMissing = false;
      let savedCount = 0;
      for (const row of rows) {
        const field = (name) => row.querySelector(`[data-school-field="${name}"]`);
        const name = field("name")?.value.trim() || "";
        if (!row.dataset.schoolId && !name) continue;
        const schoolId = await saveSchool({
          id: row.dataset.schoolId || "",
          name,
          organisation_name: field("organisation_name")?.value || "",
          pilot_name: field("pilot_name")?.value || "",
          country: field("country")?.value || "",
          currency_code: field("currency_code")?.value || "",
          currency_symbol: field("currency_symbol")?.value || "",
          locale: field("locale")?.value || "",
          curriculum_focus: field("curriculum_focus")?.value || "",
          default_curriculum_id: field("default_curriculum_id")?.value || "",
          standards_label: field("standards_label")?.value || "",
          logo_url: field("logo_url")?.value || "",
          contact_person: field("contact_person")?.value || "",
          school_synopsis: field("school_synopsis")?.value || "",
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
      const schemaNote = state.schoolDefaultCurriculumSchemaMissing
        ? " Default curriculum is saved in this browser until the Supabase school schema is updated."
        : "";
      schoolsStatus.textContent = `Saved ${savedCount} school licence${savedCount === 1 ? "" : "s"}.${schemaNote}`;
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
  const captureButton = document.getElementById("classroomCapture");
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

      html.kaizen-classroom-fit .kaizen-capture-board {
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
    const fullscreenElement = document.fullscreenElement;
    const active = fullscreenElement === stage || Boolean(fullscreenElement && stage.contains(fullscreenElement));
    stage.classList.toggle("classroom-fullscreen-active", active);
    withFrameDocument((doc) => {
      doc.documentElement.classList.toggle("kaizen-shell-fullscreen", active);
      doc.body?.classList.toggle("kaizen-shell-fullscreen", active);
    });
    fullscreenButton.textContent = active ? "Exit Full Screen" : "Full Screen";
    fullscreenButton.setAttribute("aria-pressed", String(active));
    fullscreenButton.setAttribute(
      "aria-label",
      active ? "Exit full screen classroom view" : "Open classroom view full screen"
    );
    fullscreenButton.disabled = false;
  }

  function isClassroomFullscreenActive() {
    const fullscreenElement = document.fullscreenElement;
    return fullscreenElement === stage || Boolean(fullscreenElement && stage.contains(fullscreenElement));
  }

  async function requestClassroomFullscreen() {
    if (!stage.requestFullscreen) return;
    if (document.fullscreenElement === stage) {
      updateFullscreenButton();
      return;
    }
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        // Keep trying to place the classroom shell in charge of full screen.
      }
    }
    try {
      await stage.requestFullscreen();
    } catch (error) {
      // Some browser/device combinations block fullscreen requests.
    }
    updateFullscreenButton();
    scheduleClassroomFit();
    scheduleAnnotationResize();
  }

  async function exitClassroomFullscreen() {
    if (isClassroomFullscreenActive()) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        // The browser may already be leaving fullscreen.
      }
    }
    updateFullscreenButton();
    scheduleClassroomFit();
    scheduleAnnotationResize();
  }

  async function toggleClassroomFullscreen() {
    if (isClassroomFullscreenActive()) {
      await exitClassroomFullscreen();
      return;
    }
    await requestClassroomFullscreen();
  }

  window.kaizenToggleClassroomFullscreen = toggleClassroomFullscreen;
  window.kaizenRequestClassroomFullscreen = requestClassroomFullscreen;
  window.kaizenExitClassroomFullscreen = exitClassroomFullscreen;

  function safeCaptureFileName(value) {
    return String(value || "kaizen-classroom")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 64) || "kaizen-classroom";
  }

  function collectDocumentCss(doc) {
    return Array.from(doc.styleSheets).map((sheet) => {
      try {
        return Array.from(sheet.cssRules || []).map((rule) => rule.cssText).join("\n");
      } catch (error) {
        return "";
      }
    }).join("\n");
  }

  function frameScrollPosition(doc) {
    return {
      left: doc.defaultView?.scrollX || doc.documentElement.scrollLeft || doc.body?.scrollLeft || 0,
      top: doc.defaultView?.scrollY || doc.documentElement.scrollTop || doc.body?.scrollTop || 0
    };
  }

  function cloneFrameBodyForCapture(doc) {
    const source = doc.body || doc.documentElement;
    const clone = source.cloneNode(true);
    const sourceCanvases = Array.from(source.querySelectorAll("canvas"));
    const cloneCanvases = Array.from(clone.querySelectorAll("canvas"));

    sourceCanvases.forEach((sourceCanvas, index) => {
      const clonedCanvas = cloneCanvases[index];
      if (!clonedCanvas) return;
      try {
        const rect = sourceCanvas.getBoundingClientRect();
        const image = doc.createElement("img");
        image.src = sourceCanvas.toDataURL("image/png");
        image.alt = "";
        image.width = Math.max(1, Math.round(rect.width || sourceCanvas.width || 1));
        image.height = Math.max(1, Math.round(rect.height || sourceCanvas.height || 1));
        image.className = clonedCanvas.className || "";
        image.style.cssText = clonedCanvas.getAttribute("style") || "";
        image.style.width = `${image.width}px`;
        image.style.height = `${image.height}px`;
        clonedCanvas.replaceWith(image);
      } catch (error) {
        // If a canvas cannot be converted, keep the cloned element in place.
      }
    });

    clone.querySelectorAll("script,.teacher-tab,.sidebar,.sidebar-overlay,.timer-modal").forEach((element) => {
      element.remove();
    });
    return clone;
  }

  async function imageFromSvg(svg) {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    try {
      const image = new Image();
      image.decoding = "sync";
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = url;
      });
      return image;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  function classroomCaptureMarkup(doc, width, height) {
    const frameCss = collectDocumentCss(doc) + `
      html,body{margin:0!important;background:#fff!important;}
      .teacher-tab,.sidebar,.sidebar-overlay,.timer-modal{display:none!important;}
      .container{box-shadow:none!important;}
    `;
    const clone = cloneFrameBodyForCapture(doc);
    const scroll = frameScrollPosition(doc);
    const baseHref = doc.location?.href || frame?.src || window.location.href;
    const htmlClass = escapeHtml(doc.documentElement.className || "");
    const htmlStyle = escapeHtml(doc.documentElement.getAttribute("style") || "");
    const bodyClass = escapeHtml(clone.className || "");
    const bodyStyle = escapeHtml(clone.getAttribute("style") || "");
    const bodyMarkup = clone.innerHTML || clone.outerHTML;
    return `
      <html xmlns="http://www.w3.org/1999/xhtml" class="${htmlClass}" style="${htmlStyle}">
        <head>
          <base href="${escapeHtml(baseHref)}" />
          <style>${frameCss}</style>
        </head>
        <body style="margin:0;background:#fff;">
          <div xmlns="http://www.w3.org/1999/xhtml" style="position:relative;width:${width}px;height:${height}px;overflow:hidden;background:#fff;">
            <div style="position:absolute;left:${-scroll.left}px;top:${-scroll.top}px;width:${Math.max(width, doc.documentElement.scrollWidth || width)}px;">
              <div class="${bodyClass}" style="${bodyStyle}">${bodyMarkup}</div>
            </div>
          </div>
        </body>
      </html>`;
  }

  function classroomCaptureSvg(doc, width, height, annotationUrl = "") {
    const annotationLayer = annotationUrl
      ? `<image href="${escapeHtml(annotationUrl)}" xlink:href="${escapeHtml(annotationUrl)}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="none" />`
      : "";
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <foreignObject width="100%" height="100%">${classroomCaptureMarkup(doc, width, height)}</foreignObject>
      ${annotationLayer}
    </svg>`;
  }

  async function renderFrameViewportImage() {
    if (!frame?.contentDocument) throw new Error("The classroom tool is not ready to capture.");
    const doc = frame.contentDocument;
    const rect = frame.getBoundingClientRect();
    const width = Math.ceil(Math.max(rect.width, frame.clientWidth, 1));
    const height = Math.ceil(Math.max(rect.height, frame.clientHeight, 1));
    const svg = classroomCaptureSvg(doc, width, height);
    return { image: await imageFromSvg(svg), width, height };
  }

  function openClassroomCaptureFallback() {
    if (!frame?.contentDocument) {
      window.alert("The classroom board is still loading. Try Capture again in a moment.");
      return;
    }
    const doc = frame.contentDocument;
    const rect = frame.getBoundingClientRect();
    const width = Math.ceil(Math.max(rect.width, frame.clientWidth, 1));
    const height = Math.ceil(Math.max(rect.height, frame.clientHeight, 1));
    let annotationUrl = "";
    try {
      annotationUrl = annotationCanvas?.toDataURL("image/png") || "";
    } catch (error) {
      annotationUrl = "";
    }
    const svg = classroomCaptureSvg(doc, width, height, annotationUrl);
    const svgUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    const snapshot = window.open("", "_blank");
    if (!snapshot) {
      URL.revokeObjectURL(svgUrl);
      window.alert("The browser blocked the snapshot window. Allow pop-ups for this site or use your browser screenshot tool.");
      return;
    }
    snapshot.document.write(`<!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(tool.title)} classroom capture</title>
        <style>
          body{margin:0;background:#fff;padding:18px;font-family:Arial,sans-serif;}
          .capture-stage{width:${width}px;max-width:100%;background:#fff;border:1px solid #d1d5db;}
          .capture-stage img{display:block;width:100%;height:auto;}
          button{margin-top:14px;padding:10px 14px;border:0;border-radius:8px;background:#0f766e;color:#fff;font-weight:700;}
          @media print{button{display:none}.capture-stage{border:0}}
        </style>
      </head>
      <body>
        <div class="capture-stage">
          <img src="${escapeHtml(svgUrl)}" alt="${escapeHtml(tool.title)} classroom capture">
        </div>
        <button onclick="window.print()">Print / Save PDF</button>
      </body>
      </html>`);
    snapshot.document.close();
    snapshot.focus();
    window.setTimeout(() => URL.revokeObjectURL(svgUrl), 300000);
  }

  async function captureClassroomBoard() {
    if (!stage.classList.contains("classroom")) return;
    const originalText = captureButton?.textContent || "Capture";
    if (captureButton) {
      captureButton.disabled = true;
      captureButton.textContent = "Capturing...";
    }
    try {
      resizeAnnotationCanvas();
      renderAnnotations();
      const { image, width, height } = await renderFrameViewportImage();
      const outputScale = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width * outputScale);
      canvas.height = Math.round(height * outputScale);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Capture canvas unavailable.");
      context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      if (annotationCanvas) {
        context.drawImage(annotationCanvas, 0, 0, width, height);
      }
      const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.95));
      if (!pngBlob) throw new Error("Capture image could not be created.");
      const downloadUrl = URL.createObjectURL(pngBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${safeCaptureFileName(tool.title)}-classroom-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    } catch (error) {
      openClassroomCaptureFallback();
    } finally {
      if (captureButton) {
        captureButton.disabled = false;
        captureButton.textContent = originalText;
      }
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
  captureButton?.addEventListener("click", captureClassroomBoard);

  function setClassroomMode(active, options = {}) {
    stage.classList.toggle("classroom", active);
    document.body.classList.toggle("classroom-active", active);
    if (button) {
      button.textContent = "Classroom View";
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
    } else if (!active && isClassroomFullscreenActive()) {
      exitClassroomFullscreen();
    }
    updateFullscreenButton();
  }

  button?.addEventListener("click", () => {
    if (stage.classList.contains("classroom")) {
      toggleClassroomFullscreen();
      return;
    }
    setClassroomMode(true);
  });

  if (exitButton) {
    exitButton.addEventListener("click", () => {
      setClassroomMode(false);
      if (options.exitRoute) location.hash = options.exitRoute;
    });
  }

  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", toggleClassroomFullscreen);
  }

  if (frame) {
    frame.addEventListener("load", () => {
      bindFrameFitRefreshers();
      refreshTeacherTopicMap();
      updateFullscreenButton();
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
      description: "View Kaizen Maths coverage across UK KS2, UK KS3, GCSE, CSEC, CAPE, Oman GED, Common Core, A-Level Pure, Further Maths, A-Level Statistics, A-Level Mechanics, and future curriculum tags."
    },
    "curriculum-alignments": {
      title: routeTitle("Curriculum Alignments"),
      description: "Map curriculum standards to Kaizen Maths tools, classroom displays, worked examples, and worksheet generators. Current pilot alignments include Common Core Mathematics, Ontario Mathematics, Australian Curriculum Mathematics, Finland Mathematics, UK KS2 Mathematics, UK KS3 Mathematics, GCSE Mathematics, Pearson Edexcel Mathematics, Cambridge IGCSE Mathematics, Singapore Mathematics, IB Mathematics, AP Mathematics, UK A-Level Mathematics, UK Further Mathematics, CSEC Mathematics, CAPE Mathematics, Oman GED Mathematics, and Jamaica NSC Grades 7-9 Mathematics."
    },
    "textbook-alignments": {
      title: routeTitle("Textbook Alignments"),
      description: "Map school textbook chapters to Kaizen Maths tools, worksheets, worked examples, and classroom practice. Includes Holt McDougal Mathematics Grade 6, Grade 7, Pre-Algebra, Algebra 1, Geometry, Algebra & Trigonometry, Precalculus, and Calculus pilot alignments."
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
      title: routeTitle("Book a Demo Session"),
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
      description: "Complete the Kaizen Certified Teacher pathway with training videos, a short quiz, practical tasks, and a printable certificate."
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
  } else if (parts[0] === "curriculum-alignments") {
    renderCurriculumAlignments();
  } else if (parts[0] === "textbook-alignments") {
    renderTextbookAlignments();
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
  loadCertificationProgress({ rerender: true });
  loadCertificationRecords({ rerender: true });
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
  loadCertificationProgress({ rerender: true });
  loadCertificationRecords({ rerender: true });
  loadSiteTestimonials({ rerender: true });
}, 1200);

renderRoute();
