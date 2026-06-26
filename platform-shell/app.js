const SITE_NAME = "Kaizen Maths";
const SITE_TITLE = "Kaizen Maths | Complete Mathematics Teaching Workspace";
const SITE_DESCRIPTION = "Kaizen Maths helps teachers create high-quality maths worksheets, assessments, worked examples, and classroom resources in minutes.";

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
    toolPath: "tools/algebraic-fractions/index.html?v=batch2-steps-1",
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
    title: "Straight Lines",
    category: "Algebra",
    level: "GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate straight-line questions covering gradients, intercepts, equations, intersections, and parallel or perpendicular lines.",
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
    slug: "conic-intersections",
    title: "Conic Intersections",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate two-problem challenge sets for intersections of lines with circles, parabolas, hyperbolas, and mixed conics.",
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
    title: "Differentiation of Polynomials",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate polynomial differentiation questions from the power rule through gradients, tangent lines, and normal lines.",
    tags: ["algebra", "calculus", "differentiation", "derivatives", "polynomials", "tangents", "normals"],
    toolPath: "tools/differentiation-polynomials/index.html?v=batch3-steps-1",
    imported: true,
    teacherNotes: [
      "Builds from single-term power rule fluency into multi-term polynomials.",
      "Applications connect derivative functions to gradients, tangent lines, and normal lines.",
      "Step highlighting isolates current terms, coefficient multiplication, and power reduction."
    ]
  },
  {
    slug: "integration",
    title: "Integration",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate integration practice covering indefinite integrals, definite integrals, and the trapezium rule.",
    tags: ["algebra", "calculus", "integration", "integrals", "trapezium rule", "area under curve"],
    toolPath: "tools/integration/index.html?v=batch3-steps-1",
    imported: true,
    teacherNotes: [
      "Starts with integration as reverse differentiation and the constant of integration.",
      "Definite integral sets emphasise antiderivatives, bounds, and careful substitution.",
      "Trapezium rule sets include table setup, equal strips, and final rounded approximations."
    ]
  },
  {
    slug: "partial-fractions",
    title: "Partial Fractions",
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
    title: "Matrices",
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
    slug: "differentiation-rules",
    title: "Differentiation Rules",
    category: "Algebra",
    level: "A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate differentiation practice for power, product, quotient, chain, trigonometric, logarithmic, tangent, normal, and turning-point problems.",
    tags: ["algebra", "calculus", "differentiation", "power rule", "product rule", "quotient rule", "chain rule", "trigonometry", "logarithms"],
    toolPath: "tools/differentiation-rules-general/index.html?v=batch1-steps-1",
    imported: true,
    teacherNotes: [
      "Extends polynomial differentiation into product, quotient, chain, trigonometric, and logarithmic rules.",
      "Application sets connect derivatives with tangents, normals, and turning-point classification.",
      "Worked steps focus on rule recognition, substitution into formulas, and algebraic simplification."
    ]
  },
  {
    slug: "trig-differentiation-rules",
    title: "Trig Differentiation Rules",
    category: "Algebra",
    level: "A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate trigonometric differentiation practice with chain, product, quotient, and mixed-rule challenges.",
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
    title: "Trig Equation Solver",
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
    slug: "trigonometric-functions",
    title: "Trigonometric Functions",
    category: "Algebra",
    level: "A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate A-level trigonometric functions practice covering reciprocal graphs, sec, cosec, cot equations, identities, proofs, and hence-solve questions.",
    tags: ["algebra", "trigonometry", "trigonometric functions", "sec", "cosec", "cot", "identities", "proof", "A-Level"],
    toolPath: "tools/trigonometric-functions/index.html?v=graph-axis-grid-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers reciprocal graph sketching, definitions, and simple reciprocal equations.",
      "Level 2 develops equations involving sec, cosec, cot, identities, quadratics, and transformed angles.",
      "Level 3 includes reciprocal quotient proofs, factorised identity proofs, linked hence-solve problems, and no-real-solution arguments."
    ]
  },
  {
    slug: "sequences-series",
    title: "Sequences & Series",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate arithmetic and geometric sequences and series practice, including nth terms, sums, inverse problems, sigma notation, and sums to infinity.",
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
    toolPath: "tools/advanced-differentiation/index.html?v=batch1-steps-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers implicit dy/dx, slopes at points, second derivatives, tangent lines, and related rates.",
      "Level 2 covers parametric dy/dx, second derivatives, tangents and normals, and horizontal or vertical tangent conditions.",
      "Worked examples reinforce when to differentiate before substituting and how to convert parameter derivatives into Cartesian slopes."
    ]
  },
  {
    slug: "hcf-lcm",
    title: "HCF & LCM",
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
    title: "Decimals Practice Lab",
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
    title: "Powers of 10",
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
    slug: "four-operations",
    title: "Four Operations",
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
    title: "Fractions Practice",
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
    title: "Simple Percentage Tasks",
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
    title: "Area of Rectangles",
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
    title: "Pythagoras Theorem",
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
    slug: "area-triangles",
    title: "Area of Triangles",
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
    slug: "sectors-arc-length",
    title: "Sectors and Arc Length",
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
    title: "Trigonometric Ratios",
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
    toolPath: "tools/bearings/index.html?v=bearings-1",
    imported: true,
    teacherNotes: [
      "Level 1 covers reading bearings from diagrams and finding reverse bearings.",
      "Level 2 converts hidden compass-angle descriptions into three-figure bearings.",
      "Level 3 links bearings with right-triangle trigonometry, distances, and components."
    ]
  },
  {
    slug: "free-vectors",
    title: "Free Vectors",
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
    title: "Missing Angles",
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
    slug: "volume-surface-area-prisms",
    title: "Volume and Surface Area of Prisms",
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
    title: "Volume and Surface Area of Cylinders and Cones",
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
    title: "Volume and Surface Area of Spheres",
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
    title: "Exponents and Index Notation",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate exponent and index notation practice covering repeated multiplication, evaluation, prime factorisation, zero and negative powers, index laws, and multi-step simplification.",
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
    title: "Absolute Values",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate absolute value practice covering evaluation, distance, substitution, absolute value equations, applications, and inequalities.",
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
    toolPath: "tools/surds-radicals/index.html?v=surds-arrow-1",
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
    title: "Logarithms Practice",
    category: "Algebra",
    level: "GCSE / A-Level",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate logarithm practice covering log-index conversion, evaluation, logarithm laws, natural logs, change of base, and equation solving.",
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
    title: "Sine & Cosine Rule",
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
    title: "Conversions Teaching Tool",
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
    title: "Discrete Random Variables",
    category: "Statistics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate statistics practice covering discrete probability distributions, expectation, variance, standard deviation, and binomial, geometric, and Poisson models.",
    tags: ["statistics", "probability", "random variables", "expectation", "variance", "binomial", "geometric", "poisson"],
    toolPath: "tools/discrete-random-variables/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Level 1 checks probability tables, missing probabilities, and validity of discrete distributions.",
      "Level 2 practises expected value, variance, standard deviation, and linear expectation properties.",
      "Level 3 introduces binomial, geometric, Poisson, and distribution-identification questions.",
      "Worked steps emphasise summing probabilities to 1 and using weighted sums for expectation."
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
    title: "Equations of Motion",
    category: "Mechanics",
    level: "A-Level / IB",
    type: "Practice Generator",
    access: "Trial",
    status: "Imported",
    description: "Generate constant acceleration equations of motion practice covering SUVAT substitution, multi-step motion, stopping distance, and vertical motion under gravity.",
    tags: ["mechanics", "kinematics", "equations of motion", "SUVAT", "constant acceleration", "vertical motion", "gravity", "stopping distance"],
    toolPath: "tools/equations-of-motion/index.html?v=equations-of-motion-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on direct use of one equation of motion after listing the known SUVAT values.",
      "Level 2 combines equations in stopping, distance, average velocity, and two-stage motion problems.",
      "Level 3 covers vertical motion under gravity, including signs, greatest height, time to top, and speed at a height.",
      "Worked steps emphasise choosing a positive direction, substituting values, and keeping units clear."
    ]
  },
  {
    slug: "moments",
    title: "Moments",
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
    title: "Projectiles",
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
    slug: "continuous-random-variables",
    title: "Continuous Random Variables",
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
    title: "Normal Distribution",
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
    title: "Binomial & Geometric Distribution",
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
    slug: "kaizen-large-data-set",
    title: "Kaizen Large Data Set",
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
    title: "Tree Diagrams & Conditional Probability",
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
    slug: "quadratic-factorisation",
    title: "Quadratic Factorisation",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate factorisation questions for common factors, special quadratic forms, trinomials, grouping, and mixed expressions.",
    tags: ["algebra", "quadratics", "factorisation", "factorising", "difference of squares", "trinomials", "common factor"],
    toolPath: "tools/quadratic-factorisation/index.html?v=batch3-steps-1",
    imported: true,
    teacherNotes: [
      "Builds from common factor extraction into special products and trinomial factorisation.",
      "Advanced question sets return complete factorised answers rather than placeholders.",
      "Step-by-step highlighting supports board modelling and Classroom View projection."
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
    slug: "functions",
    title: "Functions",
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
    slug: "bracket-expansion",
    title: "Bracket Expansion",
    category: "Algebra",
    level: "KS3 / GCSE",
    type: "Practice Generator",
    access: "Free",
    status: "Imported",
    description: "Generate bracket expansion questions for single brackets, double brackets, special products, and advanced expressions.",
    tags: ["algebra", "brackets", "expansion", "expand and simplify", "double brackets", "FOIL", "KaTeX"],
    toolPath: "tools/bracket-expansion/index.html?v=batch2-steps-1",
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
    title: "Remainder Theorem",
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
    title: "Fractions",
    category: "Numbers",
    level: "KS2 / KS3",
    type: "Practice Generator",
    access: "Free",
    status: "Legacy",
    description: "Build fluency with fraction arithmetic and equivalent forms.",
    tags: ["numbers", "fractions", "fluency"],
    toolPath: "tools/fractions/index.html?v=step-structure-1",
    imported: false
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
    toolPath: "tools/order-of-operations/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Designed for repeated board practice on order of operations.",
      "Three levels move from positive-number precedence into brackets and negatives.",
      "Useful for quick retrieval practice before algebra or arithmetic lessons."
    ]
  },
  {
    slug: "percentages-real-world",
    title: "Real-World Percentage Applications",
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
    title: "Averages and Range",
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
    title: "Classroom Displays",
    category: "Classroom Tools",
    level: "All",
    type: "Board Display",
    access: "Free",
    status: "Imported",
    description: "Open board-ready graph grids, coordinate axes, 2D shapes, 3D solids, probability templates, statistics diagrams, and mechanics setups for live classroom explanation.",
    tags: ["classroom", "display", "graph grid", "coordinate axes", "geometry", "shapes", "solids", "statistics", "mechanics", "board"],
    toolPath: "tools/classroom-displays/index.html?v=classroom-displays-mechanics-1",
    imported: true,
    teacherNotes: [
      "Designed as a static board companion rather than a question generator.",
      "Teachers can quickly show blank grids, coordinate axes, common 2D shapes, 3D solids, statistics templates, and mechanics setups.",
      "Use full-screen mode when projecting to the board for live explanation or annotation."
    ]
  },
  {
    slug: "exit-ticket-game",
    title: "Math Exit Ticket Choice Board",
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
    title: "Math in a Minute",
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
    title: "Fraction Decimal Percentage Table",
    category: "Classroom Tools",
    level: "KS2 / KS3",
    type: "Conversion Tool",
    access: "Free",
    status: "Imported",
    description: "An interactive classroom table for converting between fractions, decimals, and percentages with revealable answers.",
    tags: ["classroom", "fractions", "decimals", "percentages", "conversion", "equivalence"],
    toolPath: "tools/fractions-table/index.html?v=step-structure-1",
    imported: true,
    teacherNotes: [
      "Students are given one representation and calculate the missing fraction, decimal, and percentage equivalents.",
      "Basic, intermediate, and advanced levels move from common equivalences to recurring decimals and less familiar fractions.",
      "Reveal individual cells for questioning, or show all answers for quick checking."
    ]
  },
  {
    slug: "twenty4",
    title: "Ninja Math Challenge",
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
  universityVideos: {},
  siteTestimonials: [],
  testimonialsLoaded: false,
  accessLoaded: false
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
      ["free-trial-rules", "Free, trial, pro, school, and admin roles behave correctly", "Free visitors see limited access, signed-in trial users can test the wider site, and admin can update roles."],
      ["school-space", "School Space join flow is ready", "A school code, allowed domain, approved email, seat limit, and licence end date can be tested."],
      ["supabase-schema", "Supabase schema is current", "The latest schema has been run after any auth, school, Stripe, or admin changes."]
    ]
  },
  {
    title: "Payments And School Sales",
    items: [
      ["stripe-test", "Stripe test checkout has been checked", "Teacher monthly and annual price IDs exist and test mode works before live payments are enabled."],
      ["stripe-webhook", "Stripe webhook is configured", "Webhook endpoint and secret are saved in Vercel and subscription updates reach Supabase."],
      ["trial-message", "Trial/upgrade message is accurate", "Upgrade page states the current testing period and what happens after trial access ends."],
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
    id: "alevel-pure",
    title: "A-Level Pure",
    subtitle: "Algebra, functions, calculus, coordinate geometry, and proof",
    description: "Pure mathematics generators covering algebraic manipulation, calculus, functions, matrices, trigonometry, and related higher-level topics.",
    match: (tool) => {
      const level = normalise(tool.level);
      return ["Algebra", "Geometry"].includes(tool.category) && level.includes("a-level");
    }
  },
  {
    id: "alevel-statistics",
    title: "A-Level Statistics",
    subtitle: "Probability, distributions, data, and regression",
    description: "Statistics tools for probability models, random variables, normal, binomial and geometric distributions, large data set work, and regression.",
    match: (tool) => tool.category === "Statistics" && normalise(tool.level).includes("a-level")
  },
  {
    id: "alevel-mechanics",
    title: "A-Level Mechanics",
    subtitle: "Motion, forces, moments, and projectiles",
    description: "Mechanics tools covering motion graphs, constant acceleration, equations of motion, moments, projectiles, and modelling with units.",
    match: (tool) => tool.category === "Mechanics"
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
  },
  {
    label: "Common Core",
    description: "Common Core tags can be added as the US alignment becomes clearer, without changing the underlying tools."
  }
];

let homeTestimonialTimer = null;

const accessLevels = ["free", "trial", "pro", "school", "admin"];
const freeSampleTools = new Set([
  "substitution",
  "fractions-practice",
  "pythagoras-theorem",
  "averages-range",
  "discrete-random-variables",
  "twenty4",
  "classroom-displays",
  "fractions-table",
  "math-in-a-minute",
  "interface-guide"
]);

const worksheetState = {
  toolSlug: "",
  tool: null,
  metadata: null,
  worksheet: null,
  sections: [],
  loadToken: 0
};

const app = document.getElementById("app");
const globalSearch = document.getElementById("globalSearch");
const mobileNav = document.getElementById("mobileNav");
let pendingFocusTarget = "";

function normalise(value) {
  return String(value || "").toLowerCase();
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

function isAdmin() {
  return currentUserRole() === "admin";
}

function defaultRequiredAccess(tool) {
  return freeSampleTools.has(tool.slug) ? "free" : "trial";
}

function requiredAccess(tool) {
  return normalise(state.toolAccess[tool.slug] || defaultRequiredAccess(tool));
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
      <p>${signedIn ? "Your current account does not include this part of the virtual textbook. Upgrade for individual teacher access, or contact us for school access." : "Free visitors can try a small sample from the virtual textbook. Sign in with Google to access the wider topic library, worksheet tools, and classroom question sets during the trial period."}</p>
      ${signedIn ? `<a class="button primary" href="#/upgrade">View Upgrade Options</a>` : `<button class="button primary" type="button" data-auth-action="signin">Sign in with Google</button>`}
      <a class="button" href="#/tools">Back to Free Tools</a>
    </section>
  `;
}

function worksheetMathFragment(value) {
  const fragment = document.createDocumentFragment();
  const source = String(value ?? "")
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
  return fragment;
}

function textLooksWorksheetMathLike(text) {
  const source = String(text ?? "");
  return /(\$\$|\\\(|\\\[|[_^]|[A-Za-z][2-9]\b|\\d?frac|\\sqrt|\\displaystyle|\\boxed|\\text|\\left|\\right|\\big|\\quad|\\;|\\,|\\times|\\cdot|\\pm|\+\/-|\\approx|\\neq|\\Rightarrow|\\rightarrow|\\leq?|\\geq?|\\lt|\\gt|\\infty|\\theta|\\alpha|\\beta|\\gamma|\\Delta|\\pi|\\sin|\\cos|\\tan|\\sec|\\csc|\\cot|\\ln|[A-Za-z0-9)\]°]\s*[=<>≤≥]\s*-?[A-Za-z0-9(]|[A-Za-z]\s*[+\-]\s*\d|\d\s*[+\-×÷*/]\s*-?\d|\d+[A-Za-z]\s*[+\-]\s*\d|\d\s*[×÷*/]\s*\d)/.test(source);
}

function formatWorksheetMathText(text) {
  return String(text ?? "")
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

  template.content.querySelectorAll("span.fraction").forEach((fraction) => {
    const numerator = fraction.querySelector(".numerator");
    const denominator = fraction.querySelector(".denominator");
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
  return /(\$\$|\\\(|\\\[|=|→|->|⇒|\\frac|dfrac|sqrt|∫|∑|[+\-*/×÷]\s*)/.test(text);
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
    const haystack = normalise([tool.title, tool.category, tool.level, tool.type, tool.description, allToolTags(tool).join(" ")].join(" "));
    const matchesQuery = !state.query || haystack.includes(normalise(state.query));
    const matchesCategory = (extraCategory && categorySlug(tool.category) === extraCategory) || (!extraCategory && (state.category === "All" || tool.category === state.category));
    const matchesLevel = state.level === "All" || tool.level.includes(state.level) || tool.level === "All";
    const matchesAccess = state.access === "All" || requiredAccessLabel(tool) === state.access;
    return matchesQuery && matchesCategory && matchesLevel && matchesAccess;
  });
}

function setActiveNav() {
  const path = location.hash || "#/";
  document.querySelectorAll(".nav-list a").forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === path || (href !== "#/" && path.startsWith(href)));
  });
}

function updateAdminNavVisibility() {
  document.querySelectorAll("[data-admin-link]").forEach((link) => {
    link.hidden = !isAdmin();
  });
}

function pageHeader(title, description, actions = "") {
  return `
    <section class="page-header">
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
    intro: "How a school or department can use Kaizen Maths consistently during the trial period.",
    videos: [
      { id: "using-kaizen-in-a-department", title: "Using Kaizen In A Department", description: "How a department can use shared routines across lessons, homework, intervention, and revision." },
      { id: "supporting-less-confident-topics", title: "Supporting Less Confident Topics", description: "How worked examples, answers, and structured practice can support teacher confidence." },
      { id: "giving-useful-feedback", title: "Giving Useful Feedback", description: "What to test during the trial period and how to report issues or suggestions clearly." }
    ]
  }
];

const homepageFeaturedVideo = {
  id: "homepage-featured-video",
  title: "How To Use Kaizen Maths",
  description: "A short walkthrough showing teachers how to find a topic, generate questions, use classroom tools, and build resources.",
  duration_label: "Start here"
};

const adminUniversitySections = [
  {
    title: "Homepage Feature",
    intro: "The video shown near the top of the homepage, just below the first hero area.",
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
    if (rerender) renderRoute();
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
    if (rerender) renderRoute();
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

function statusLabel(tool) {
  if (tool.imported) return "Ready";
  if (tool.status === "Legacy") return "Queued";
  return tool.status || "Ready";
}

function metricGrid() {
  const categories = new Set(tools.map((tool) => tool.category));
  const topicGenerators = tools.filter((tool) => tool.imported && tool.type === "Practice Generator").length;
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
  const workflowSteps = [
    ["1", "Choose a topic", "Search the virtual textbook and open the exact maths topic you need."],
    ["2", "Select questions", "Choose a level, question type, and the number of questions."],
    ["3", "Generate a worksheet or assessment", "Create focused practice, mixed worksheets, quizzes, or exam-style sets."],
    ["4", "Download, print, or share", "Use the resource in lessons, homework, intervention, or revision."]
  ];
  const benefitCards = [
    ["Save planning time", "Move from topic choice to classroom-ready questions without rebuilding resources from scratch."],
    ["Improve curriculum consistency", "Use structured levels and question types so practice is easier to align across classes."],
    ["Create differentiated resources", "Select easier, core, or more challenging questions for different learners."],
    ["Support assessment and intervention", "Build quizzes, assessments, homework, and targeted follow-up practice."],
    ["Reduce reliance on scattered websites", "Keep questions, worked examples, worksheets, and classroom tools in one place."],
    ["Keep everything in one place", "Use one professional workspace for teaching, practice, assessment, and revision."]
  ];
  const audienceCards = [
    ["For Teachers", "Plan faster and teach with confidence.", "Generate board practice, examples, worksheets, and answer keys whenever you need them."],
    ["For Heads of Department", "Build consistency across your maths department.", "Support shared routines for homework, intervention, assessment, and curriculum coverage."],
    ["For Tutors", "Create targeted practice for every learner.", "Select exactly the topic and level a learner needs, then regenerate fresh practice instantly."],
    ["For Schools", "A scalable resource platform for mathematics teaching.", "Give teachers shared access to a structured workspace for maths teaching and assessment."]
  ];
  const comparisonRows = [
    ["Searching multiple free websites", "One structured workspace with searchable topic generators and printable outputs."],
    ["Manually building worksheets", "Generate clean worksheets and assessments from selected topics in minutes."],
    ["Generic AI-generated questions", "Teacher-focused, structured, curriculum-aligned practice with predictable classroom workflows."],
    ["Static textbook resources", "Unlimited fresh questions, answers, worked examples, and classroom display tools."]
  ];
  const testimonials = testimonialDisplayList();

  app.innerHTML = `
    <section class="home-hero">
      <div class="hero-copy">
        <span class="eyebrow">The Complete Mathematics Teaching Workspace</span>
        <h1>Create high-quality maths worksheets, assessments, and teaching resources in minutes.</h1>
        <p>Kaizen Maths gives teachers instant access to unlimited questions, worked examples, assessments, and classroom tools, all in one professional teaching workspace.</p>
        <div class="home-hero-actions">
          <a class="button primary" href="#/upgrade">Start Free Trial</a>
          <a class="button" href="#/kaizen-university">See How It Works</a>
        </div>
      </div>
      <div class="home-hero-side">
        <aside class="home-testimonial-panel" aria-label="What teachers are saying">
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
        ${homepageVideoPanelHtml()}
      </div>
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
        <h2 id="homeCoverageTitle">Mapped across GCSE and A-Level mathematics</h2>
        <p>See current coverage for GCSE, A-Level Pure, A-Level Statistics, and A-Level Mechanics, with future tagging routes for IGCSE, IB, and Common Core.</p>
      </div>
      <div class="coverage-home-counts" aria-label="Coverage counts">
        ${curriculumMapAreas.map((area) => `<span><strong>${coverageToolsFor(area).length}</strong>${escapeHtml(area.title)}</span>`).join("")}
      </div>
      <a class="button primary" href="#/coverage-map">View Coverage Map</a>
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
        <p>Give every maths teacher access to a shared resource workspace that supports planning, assessment, intervention, and curriculum consistency.</p>
      </div>
      <!-- Future pricing table or school licence enquiry form can be inserted here. -->
      <a class="button primary" href="#/schools">Request a School Licence</a>
    </section>
    <section class="final-cta" aria-labelledby="finalCtaTitle">
      <span class="eyebrow">Ready To Try It?</span>
      <h2 id="finalCtaTitle">Spend less time searching. Spend more time teaching.</h2>
      <div class="button-row">
        <a class="button primary" href="#/upgrade">Start Free Trial</a>
        <a class="button" href="#/tools">Browse Tool Library</a>
      </div>
      <!-- Future demo video link can be added beside the trial button. -->
    </section>
  `;
  bindHomeTestimonials();
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
  const totalMappedTools = new Set(areaData.flatMap((area) => area.tools.map((tool) => tool.slug))).size;
  app.innerHTML = `
    ${pageHeader(
      "Curriculum Coverage Map",
      "A visible overview of where Kaizen Maths currently has tool coverage across GCSE and A-Level mathematics, with tagging routes for IGCSE, IB, and Common Core alignment.",
      `<a class="button" href="#/tools">Browse Tool Library</a>${isAdmin() ? `<a class="button" href="#/admin">Edit Tags In Admin</a>` : ""}`
    )}
    <section class="coverage-page">
      <section class="coverage-summary-grid" aria-label="Coverage summary">
        ${areaData.map((area) => `
          <article class="coverage-summary-card">
            <span class="eyebrow">${escapeHtml(area.subtitle)}</span>
            <strong>${area.tools.length}</strong>
            <h2>${escapeHtml(area.title)}</h2>
            <p>${escapeHtml(area.description)}</p>
          </article>
        `).join("")}
      </section>

      <section class="coverage-map-panel panel">
        <div class="coverage-panel-head">
          <div>
            <span class="eyebrow">Current Coverage</span>
            <h2>${totalMappedTools} mapped topic tool${totalMappedTools === 1 ? "" : "s"}</h2>
            <p>Each tool can still be searched by topic, category, level, and admin tags. This map is a quick curriculum-facing view for teachers, tutors, departments, and school leaders.</p>
          </div>
          <a class="button" href="#/worksheet-generator">Build From Coverage</a>
        </div>
        <div class="coverage-area-grid">
          ${areaData.map((area) => {
            const groups = coverageGroups(area.tools);
            return `
              <article class="coverage-area-card" id="coverage-${escapeHtml(area.id)}">
                <header>
                  <span class="eyebrow">${escapeHtml(area.subtitle)}</span>
                  <h2>${escapeHtml(area.title)}</h2>
                  <p>${escapeHtml(area.description)}</p>
                </header>
                <div class="coverage-group-list">
                  ${Object.entries(groups).map(([group, groupTools]) => `
                    <section class="coverage-group">
                      <h3>${escapeHtml(group)} <span>${groupTools.length}</span></h3>
                      <div class="coverage-tool-list">
                        ${groupTools.map((tool) => `
                          <a href="#/tools/${escapeHtml(tool.slug)}">
                            <strong>${escapeHtml(tool.title)}</strong>
                            <small>${escapeHtml(tool.level)}</small>
                          </a>
                        `).join("")}
                      </div>
                    </section>
                  `).join("")}
                </div>
              </article>
            `;
          }).join("")}
        </div>
      </section>

      <section class="coverage-future-panel panel">
        <div class="coverage-panel-head">
          <div>
            <span class="eyebrow">Future Tagging Layer</span>
            <h2>IGCSE, IB, and Common Core can sit on top of the same tool library</h2>
            <p>Rather than duplicating tools, Kaizen Maths can tag existing resources against different curriculum routes as alignment becomes clearer.</p>
          </div>
          ${isAdmin() ? `<a class="button primary" href="#/admin">Open Tool Tags</a>` : `<a class="button" href="#/tools">Explore Tools</a>`}
        </div>
        <div class="future-tag-grid">
          ${futureCurriculumTags.map((tag) => {
            const matchingTools = tools.filter((tool) => curriculumTagMatches(tool, tag.label));
            return `
              <article class="future-tag-card">
                <span class="eyebrow">Tag Route</span>
                <h3>${escapeHtml(tag.label)}</h3>
                <p>${escapeHtml(tag.description)}</p>
                <strong>${matchingTools.length} currently tagged or level-matched</strong>
              </article>
            `;
          }).join("")}
        </div>
      </section>
    </section>
  `;
}

function renderFilters() {
  const categories = ["All", ...new Set(tools.map((tool) => tool.category))];
  const levels = ["All", "KS2", "KS3", "GCSE", "A-Level"];
  return `
    <section class="filter-row" aria-label="Tool filters">
      <input id="librarySearch" type="search" value="${state.query}" placeholder="Search topics, tools, or skills">
      <select id="categoryFilter" aria-label="Category">${categories.map((category) => `<option ${state.category === category ? "selected" : ""}>${category}</option>`).join("")}</select>
      <select id="levelFilter" aria-label="Level">${[...new Set(levels)].map((level) => `<option ${state.level === level ? "selected" : ""}>${level}</option>`).join("")}</select>
      <select id="accessFilter" aria-label="Access">${["All", "Free", "Trial", "Pro", "School", "Admin"].map((access) => `<option ${state.access === access ? "selected" : ""}>${access}</option>`).join("")}</select>
      <button class="button filter-reset" id="resetFilters" type="button">Reset</button>
    </section>
  `;
}

function toolCard(tool) {
  const access = requiredAccessLabel(tool);
  const locked = !canAccessTool(tool);
  const extraTags = editableToolTags(tool).slice(0, 4);
  return `
    <a class="tool-card ${locked ? "locked" : ""}" href="#/tools/${tool.slug}">
      <div class="tool-card-header">
        <h2>${escapeHtml(tool.title)}</h2>
        <span class="badge ${normalise(access)}">${access}</span>
      </div>
      <p>${escapeHtml(tool.description)}</p>
      <div class="badge-row">
        <span class="badge">${escapeHtml(tool.category)}</span>
        <span class="badge">${escapeHtml(tool.level)}</span>
        ${extraTags.map((tag) => `<span class="badge">${escapeHtml(tag)}</span>`).join("")}
        ${locked ? `<span class="badge locked-badge">Sign in</span>` : ""}
      </div>
    </a>
  `;
}

function renderToolLibrary(extraCategory = "") {
  const visible = filteredTools(extraCategory);
  const collectionTitle = extraCategory ? tools.find((tool) => categorySlug(tool.category) === extraCategory)?.category || "Collection" : "Tool Library";
  const collectionDescriptions = {
    algebra: "Algebra topics cover substitution, equations, factorisation, graphs, sequences, calculus, and trigonometry. Use them for exposition, retrieval practice, differentiation, homework, and assessment.",
    numbers: "Number topics build fluency with fractions, decimals, percentages, HCF and LCM, order of operations, averages, and powers of 10.",
    geometry: "Geometry topics cover shape, measure, diagrams, area, perimeter, volume, and trigonometry. Use them for visual modelling, board practice, and method-focused discussion.",
    statistics: "Statistics topics cover data summaries, probability distributions, expectation, variance, and model selection. Use them to connect calculation fluency with interpretation and exam-style reasoning.",
    mechanics: "Mechanics topics cover motion graphs, constant acceleration, forces, moments, projectiles, and modelling with physical quantities. Use them for GCSE bridge, A-Level, and IB practice with clear diagrams, equations, and worked steps.",
    "site-guide": "Site guides help teachers navigate the virtual textbook and use the shared controls across the topic tools.",
    "classroom-tools": "Classroom tools support quick routines, reference displays, games, exit tickets, and retrieval moments around the main lesson content."
  };
  app.innerHTML = `
    ${pageHeader(
      collectionTitle,
      extraCategory ? collectionDescriptions[extraCategory] || "A focused set of maths topics for classroom practice, homework, assessment, and projection." : "Search the virtual textbook by topic. Choose a level, generate fresh questions, show answers or worked steps, use the timer, and project the set in Classroom View."
    )}
    ${renderFilters()}
    <section class="tool-grid" aria-label="Tools">
      ${visible.length ? visible.map(toolCard).join("") : `<div class="panel empty-state">No tools match the current filters.</div>`}
    </section>
  `;
  bindFilters();
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
  return tools.filter((tool) => tool.imported && tool.type === "Practice Generator" && tool.slug !== "interface-guide");
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
      "Create homework, quizzes, assessments, and intervention sheets from several topic areas. Add question blocks from different topics, levels, and question types, then generate a print-ready student sheet with a separate answer key.",
      `<a class="button" href="#/tools">Browse Tools</a>`
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
        <div class="button-row">
          <div class="worksheet-workflow-cue" id="worksheetWorkflowCue" aria-live="polite"></div>
          <button class="button" id="addWorksheetSection" type="button">Add selected questions</button>
          <button class="button" id="buildTopicAssessment" type="button">Build Topic Assessment</button>
          <button class="button" id="generateWorksheet" type="submit">Create Worksheet</button>
          <button class="button" id="printWorksheet" type="button" disabled>Print / Save PDF</button>
          <button class="button subtle" id="resetWorksheet" type="button">Reset Worksheet</button>
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

function preferredWorksheetType(types = []) {
  return types.find((type) => /mixed/i.test(type.label || "") || /mixed/i.test(type.id || "")) || types[0] || null;
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
  const cue = document.getElementById("worksheetWorkflowCue");
  const addButton = document.getElementById("addWorksheetSection");
  const generateButton = document.getElementById("generateWorksheet");
  const hasSections = worksheetState.sections.length > 0;
  const selectionReady = worksheetCurrentSelectionReady();
  const loading = !worksheetState.metadata;

  if (addButton) {
    addButton.disabled = !selectionReady;
    addButton.classList.toggle("primary", selectionReady && !hasSections);
    addButton.classList.toggle("worksheet-action-muted", !selectionReady || hasSections);
  }

  if (generateButton) {
    generateButton.disabled = !hasSections;
    generateButton.classList.toggle("primary", hasSections);
    generateButton.classList.toggle("worksheet-action-muted", !hasSections);
  }

  if (!cue) return;

  const steps = [
    {
      label: "1 Choose questions",
      detail: loading ? "Loading topic options..." : selectionReady ? "Topic, level and type selected" : "Select a topic, level and type",
      state: selectionReady ? "done" : "active"
    },
    {
      label: "2 Add selected questions",
      detail: hasSections ? `${worksheetState.sections.length} block${worksheetState.sections.length === 1 ? "" : "s"} added` : "Click this before creating the worksheet",
      state: hasSections ? "done" : selectionReady ? "active" : "waiting"
    },
    {
      label: "3 Create worksheet",
      detail: hasSections ? "Ready to generate" : "Available after a block is added",
      state: hasSections ? "active" : "waiting"
    }
  ];

  cue.innerHTML = steps.map((step) => `
    <span class="worksheet-flow-step" data-state="${step.state}">
      <strong>${step.label}</strong>
      <small>${step.detail}</small>
    </span>
  `).join("");
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
  worksheetState.sections.push(section);
  renderWorksheetSections();
  updateWorksheetFlow();
  setWorksheetStatus(`Added ${section.count} ${section.toolTitle} questions. You can edit the block, add another block, or create the worksheet.`, "success");
}

function buildTopicAssessment() {
  const tool = selectedWorksheetTool();
  const levels = worksheetState.metadata?.levels || [];
  if (!tool || !levels.length) {
    setWorksheetStatus("Wait for the selected topic to finish loading before building an assessment.", "error");
    return;
  }

  setWorksheetAssessmentMode(true);
  const marksPerQuestion = worksheetAssessmentOptions().marksPerQuestion;
  const count = 2;
  const sections = levels
    .map((level) => {
      const type = preferredWorksheetType(level.types || []);
      if (!type) return null;
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
        marksPerQuestion
      };
    })
    .filter(Boolean);

  if (!sections.length) {
    setWorksheetStatus("No worksheet-ready levels were found for this topic.", "error");
    return;
  }

  worksheetState.sections = sections;
  renderWorksheetSections();
  updateWorksheetFlow();
  setWorksheetStatus(`Built a draft ${tool.title} assessment with ${sections.length} block${sections.length === 1 ? "" : "s"}. Remove blocks or edit counts and marks before generating.`, "success");
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
  const buildAssessmentButton = document.getElementById("buildTopicAssessment");
  const resetButton = document.getElementById("resetWorksheet");
  const assessmentMode = document.getElementById("worksheetAssessmentMode");
  const assessmentPanel = document.getElementById("worksheetAssessmentPanel");
  const paperTitleInput = document.getElementById("worksheetPaperTitle");
  const paperInstructionInput = document.getElementById("worksheetPaperInstruction");
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
  buildAssessmentButton?.addEventListener("click", buildTopicAssessment);
  resetButton?.addEventListener("click", resetWorksheetBuilder);
  [paperTitleInput, paperInstructionInput].forEach((input) => {
    input?.addEventListener("input", () => {
      if (!worksheetState.worksheet?.ok) return;
      const answers = document.getElementById("worksheetAnswers")?.checked || false;
      const steps = document.getElementById("worksheetSteps")?.checked || false;
      renderWorksheetPreview(worksheetState.worksheet, { answers, steps, ...worksheetAssessmentOptions() });
    });
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

function relatedTools(tool) {
  return tools
    .filter((candidate) => candidate.slug !== tool.slug && candidate.category === tool.category)
    .slice(0, 4);
}

function standardsForTool(tool) {
  const haystack = normalise([tool.title, tool.category, tool.level, allToolTags(tool).join(" "), tool.description].join(" "));
  const standards = [];

  if (haystack.includes("mechanics") || haystack.includes("suvat") || haystack.includes("kinematics") || haystack.includes("equations of motion") || haystack.includes("motion graphs") || haystack.includes("constant acceleration") || haystack.includes("velocity-time") || haystack.includes("distance-time") || haystack.includes("moments") || haystack.includes("projectiles")) {
    standards.push("England: A-Level Mathematics mechanics, including constant acceleration, SUVAT equations, moments, forces, projectiles, modelling with units, and motion under gravity.");
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
  } else if (haystack.includes("fraction") || haystack.includes("decimal") || haystack.includes("percentage") || haystack.includes("ratio") || haystack.includes("hcf") || haystack.includes("lcm") || haystack.includes("conversion")) {
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
  const concepts = [...new Set([
    ...allToolTags(tool).filter((tag) => !["KaTeX", "worked steps"].includes(tag)),
    tool.category,
    tool.level
  ].filter(Boolean))];
  return `
    <div class="topic-map-compact">
      <p class="topic-map-summary">This tool covers these topic areas.</p>
      <div class="topic-chip-list">
        ${concepts.slice(0, 12).map((topic) => `<span class="topic-chip">${escapeHtml(topic)}</span>`).join("")}
      </div>
    </div>
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
      <div class="topic-chip-list">
        ${topics.map((topic) => `<span class="topic-chip">${escapeHtml(topic)}</span>`).join("")}
      </div>
    </div>
  `;
}

function renderStandardsList(tool) {
  return `<ul class="standards-list">${standardsForTool(tool).map((standard) => `<li>${escapeHtml(standard)}</li>`).join("")}</ul>`;
}

function renderToolFrame(tool) {
  const frame = tool.imported
    ? `<iframe class="legacy-frame" src="${tool.toolPath}" title="${tool.title}" loading="eager"></iframe>`
    : `
      <div class="missing-tool">
        <span class="eyebrow">Coming Soon</span>
        <h2>This tool is on the roadmap</h2>
        <p>The virtual textbook already knows where this topic belongs, but the classroom question set has not been connected yet.</p>
        <p>Use the related topics and collections to find nearby practice while this one is being prepared.</p>
      </div>
    `;

  app.innerHTML = `
    ${pageHeader(
      tool.title,
      tool.description,
      `<a class="button" href="#/tools">Back to Library</a>${tool.legacyUrl ? `<a class="button" href="${tool.legacyUrl}" target="_blank" rel="noopener noreferrer">Original Page</a>` : ""}<button class="button primary" id="focusTool" type="button">Classroom View</button>`
    )}
    <section class="legacy-layout">
      <div class="legacy-stage">
        <div class="legacy-toolbar">
          <div class="badge-row">
            <span class="badge">${tool.category}</span>
            <span class="badge">${tool.level}</span>
            <span class="badge">${tool.type}</span>
            <span class="badge ${normalise(requiredAccessLabel(tool))}">${requiredAccessLabel(tool)}</span>
          </div>
          <div class="legacy-toolbar-actions">
            <span class="tool-path">${tool.toolPath}</span>
            <button class="button classroom-fullscreen" id="classroomFullscreen" type="button">Full Screen</button>
            <button class="button classroom-exit" id="exitClassroom" type="button">Exit</button>
          </div>
        </div>
        ${frame}
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
  bindToolFrame(tool);
}

function renderToolDetail(slug) {
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) {
    app.innerHTML = `${pageHeader("Tool not found", "This route does not match a registered tool.", `<a class="button" href="#/tools">Back to Library</a>`)}`;
    return;
  }
  if (!canAccessTool(tool)) {
    app.innerHTML = `
      ${pageHeader(tool.title, tool.description, `<a class="button" href="#/tools">Back to Library</a>`)}
      ${signInCallout(`${requiredAccessLabel(tool)} access required`)}
    `;
    bindAuthActions();
    return;
  }
  renderToolFrame(tool);
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

function renderSchools() {
  app.innerHTML = `
    ${pageHeader(
      "School Access",
      "School licences give maths departments shared access to Kaizen Maths as a virtual mathematics textbook: unlimited topic questions, board-ready generators, worked solutions, worksheets, and assessment practice for classroom use.",
      `<a class="button" href="#/school-space">Join School Licence</a><a class="button" href="#/upgrade">Back to Upgrade</a>`
    )}
    <section class="upgrade-page">
      <article class="panel trial-notice">
        <span class="eyebrow">Testing Phase</span>
        <h2>Schools can explore the full site until 30 June 2026</h2>
        <p>During the testing phase, teachers can use the full library without payment. This gives departments time to check coverage, try the classroom tools, build worksheets, and decide whether Kaizen Maths would support regular teaching across the school.</p>
        <p>School prices shown below are early-adopter rates for the first schools that help shape Kaizen Maths. Standard pricing is expected to be higher after the launch period.</p>
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

function renderUpgrade() {
  const role = currentUserRole();
  const profile = authState().profile || {};
  const checkoutStatus = new URLSearchParams((location.hash.split("?")[1] || "").replace(/^\/?/, "")).get("checkout");
  const statusCopy = checkoutStatus === "success"
    ? "Payment complete. Your access will update as soon as Stripe confirms the subscription."
    : checkoutStatus === "cancelled"
      ? "Checkout was cancelled. You can restart whenever you are ready."
      : "";

  app.innerHTML = `
    ${pageHeader(
      "Upgrade Kaizen Maths",
      "Kaizen Maths is currently in its testing phase. Full access is available during the trial period, so teachers can explore the virtual mathematics textbook before paid plans begin.",
      `<a class="button" href="#/tools">Browse Tools</a>`
    )}
    <section class="upgrade-page">
      <article class="panel trial-notice">
        <span class="eyebrow">Testing Phase</span>
        <h2>All tools are available until 30 June 2026</h2>
        <p>There is no need to upgrade while Kaizen Maths is being tested. Teachers can use the full tool library, classroom generators, worked solutions, worksheet builder, and assessment tools during this trial period.</p>
        <p>Paid teacher and school access will be introduced after the trial period. The prices shown below are early-adopter rates for the first teachers and schools who help shape Kaizen Maths. Standard pricing is expected to be higher after launch.</p>
        <div class="button-row">
          <a class="button primary" href="#/tools">Explore the Tool Library</a>
          <a class="button" href="#/worksheet-generator">Open Worksheet Builder</a>
        </div>
      </article>

      <article class="panel upgrade-summary">
        <span class="eyebrow">Current Access</span>
        <h2>${isSignedIn() ? titleCaseAccess(role) + " access" : "Not signed in"}</h2>
        <p>${isSignedIn() ? `Signed in as ${escapeHtml(authState().session?.user?.email || "teacher")}.` : "Sign in with Google to help test the full site during the trial period."}</p>
        ${profile.subscription_status ? `<p><strong>Subscription:</strong> ${escapeHtml(profile.subscription_status)}</p>` : ""}
        ${statusCopy ? `<p class="upgrade-status" data-tone="${checkoutStatus}">${statusCopy}</p>` : `<p class="upgrade-status" id="upgradeStatus"></p>`}
        <div class="button-row">
          ${isSignedIn() ? `<button class="button" type="button" id="manageBilling">Manage Billing</button>` : `<button class="button primary" type="button" data-auth-action="signin">Sign in with Google</button>`}
        </div>
      </article>

      <section class="pricing-grid" aria-label="Pricing options">
        <article class="panel pricing-card">
          <span class="eyebrow">Early Adopter</span>
          <h2>Monthly</h2>
          <p class="pricing-price">£7.99/month</p>
          <p class="pricing-note">Expected standard price: £12.99/month</p>
          <p>Flexible access for one teacher. Use the full topic library, board-ready generators, worked solutions, worksheet builder, and assessment practice.</p>
          <button class="button primary" type="button" disabled>Available after trial</button>
        </article>
        <article class="panel pricing-card featured">
          <span class="eyebrow">Early Adopter</span>
          <h2>Annual</h2>
          <p class="pricing-price">£69/year</p>
          <p class="pricing-note">Expected standard price: £119/year</p>
          <p>Best for teachers who want full access across the year for planning, classroom practice, homework, revision, intervention, and assessment.</p>
          <button class="button primary" type="button" disabled>Available after trial</button>
        </article>
        <article class="panel pricing-card">
          <span class="eyebrow">Early Adopter</span>
          <h2>Department Access</h2>
          <p class="pricing-price">From £299/year</p>
          <p class="pricing-note">Expected standard price: from £499/year</p>
          <p>For schools that want several teachers to use the full virtual mathematics textbook across lessons, homework, intervention, revision, and assessment.</p>
          <a class="button" href="#/schools">Notes For Schools</a>
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
      ${pageHeader("Admin", "Manage access levels for the virtual textbook and prepare the site for trial users, free samples, individual teachers, and school licences.")}
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

  const rows = tools.map((tool) => {
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

  const metadataCards = tools.map((tool) => {
    const metadata = toolMetadata(tool);
    return `
      <article class="admin-metadata-card">
        <div class="admin-metadata-card-head">
          <strong>${escapeHtml(tool.title)}</strong>
          <small>${escapeHtml(tool.category)} · ${escapeHtml(tool.level)}</small>
        </div>
        <label class="admin-metadata-field">
          Curriculum / exam tags
          <input class="admin-metadata-input" type="text" autocomplete="off" spellcheck="false" data-tool-slug="${escapeHtml(tool.slug)}" data-metadata-field="curriculum_tags" value="${escapeHtml(metadata.curriculum_tags || "")}" placeholder="Common Core, IGCSE, IB, AP">
        </label>
        <label class="admin-metadata-field">
          Admin notes
          <textarea class="admin-metadata-input" data-tool-slug="${escapeHtml(tool.slug)}" data-metadata-field="admin_notes" rows="2" placeholder="Internal note, exam-board fit, future edits">${escapeHtml(metadata.admin_notes || "")}</textarea>
        </label>
      </article>
    `;
  }).join("");

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
    ${pageHeader("Admin", "Manage simple site updates without editing code: access rules, curriculum tags, and Kaizen University video content.")}
    <section class="admin-tabs" aria-label="Admin sections">
      <button class="admin-tab active" type="button" data-admin-tab="users">Users</button>
      <button class="admin-tab" type="button" data-admin-tab="launch">Launch Checklist</button>
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
          <p>Signed-out visitors can open Free topics. Signed-in trial users can open Trial topics. For now, keep most topic tools as Trial while testing.</p>
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
          <p>Add curriculum, exam-board, country, or route labels manually. Use commas between tags, for example: Common Core, IGCSE, IB, AP.</p>
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

function bindFilters() {
  const librarySearch = document.getElementById("librarySearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const levelFilter = document.getElementById("levelFilter");
  const accessFilter = document.getElementById("accessFilter");
  const resetFilters = document.getElementById("resetFilters");
  if (!librarySearch) return;

  librarySearch.addEventListener("input", (event) => {
    state.query = event.target.value;
    globalSearch.value = state.query;
    pendingFocusTarget = "librarySearch";
    renderToolLibrary(routeParts()[1] === "collections" ? routeParts()[2] : "");
  });
  categoryFilter.addEventListener("change", (event) => {
    state.category = event.target.value;
    renderToolLibrary();
  });
  levelFilter.addEventListener("change", (event) => {
    state.level = event.target.value;
    renderToolLibrary(routeParts()[1] === "collections" ? routeParts()[2] : "");
  });
  accessFilter.addEventListener("change", (event) => {
    state.access = event.target.value;
    renderToolLibrary(routeParts()[1] === "collections" ? routeParts()[2] : "");
  });
  resetFilters.addEventListener("click", () => {
    state.query = "";
    state.category = "All";
    state.level = "All";
    state.access = "All";
    globalSearch.value = "";
    renderToolLibrary(routeParts()[1] === "collections" ? routeParts()[2] : "");
  });
}

function bindToolFrame(tool) {
  const button = document.getElementById("focusTool");
  const exitButton = document.getElementById("exitClassroom");
  const fullscreenButton = document.getElementById("classroomFullscreen");
  const stage = document.querySelector(".legacy-stage");
  const frame = stage?.querySelector(".legacy-frame");
  if (!button || !stage) return;
  const classroomStateKey = "kaizen:classroom-view";

  function savedClassroomState() {
    try {
      return JSON.parse(localStorage.getItem(classroomStateKey) || "{}");
    } catch (error) {
      return {};
    }
  }

  function saveClassroomState(active) {
    try {
      if (active) {
        localStorage.setItem(classroomStateKey, JSON.stringify({ active: true, slug: tool.slug, path: tool.toolPath }));
      } else {
        localStorage.removeItem(classroomStateKey);
      }
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

  function installClassroomFitStyles(doc) {
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

  function setClassroomMode(active, options = {}) {
    stage.classList.toggle("classroom", active);
    document.body.classList.toggle("classroom-active", active);
    button.textContent = active ? "Exit Classroom View" : "Classroom View";
    button.setAttribute("aria-pressed", String(active));
    if (options.persist !== false) saveClassroomState(active);
    if (active) {
      scheduleClassroomFit();
    } else {
      resetFrameFit();
    }

    if (active) {
      requestClassroomFullscreen();
    } else if (!active && document.fullscreenElement === stage) {
      document.exitFullscreen().catch(() => {});
    }
    updateFullscreenButton();
  }

  button.addEventListener("click", () => {
    if (stage.classList.contains("classroom")) {
      requestClassroomFullscreen();
      return;
    }
    setClassroomMode(true);
  });

  if (exitButton) {
    exitButton.addEventListener("click", () => setClassroomMode(false));
  }

  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", requestClassroomFullscreen);
  }

  if (frame) {
    frame.addEventListener("load", () => {
      bindFrameFitRefreshers();
      refreshTeacherTopicMap();
      scheduleClassroomFit();
    });
    bindFrameFitRefreshers();
    refreshTeacherTopicMap();
  }

  window.addEventListener("resize", scheduleClassroomFit);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && stage.classList.contains("classroom")) {
      scheduleClassroomFit();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    updateFullscreenButton();
    if (stage.classList.contains("classroom")) {
      scheduleClassroomFit();
    }
  });

  if (savedClassroomState().active && savedClassroomState().slug === tool.slug) {
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
  const collectionName = parts[1]
    ? parts[1].split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")
    : "";
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
      title: routeTitle("Maths Tool Library"),
      description: "Browse Kaizen Maths topic generators, classroom display tools, worksheets, and assessment resources for maths teachers."
    },
    "coverage-map": {
      title: routeTitle("Curriculum Coverage Map"),
      description: "View Kaizen Maths coverage across GCSE, A-Level Pure, A-Level Statistics, A-Level Mechanics, and future curriculum tags."
    },
    "collections": {
      title: routeTitle(collectionName ? `${collectionName} Tools` : "Maths Collections"),
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
    "upgrade": {
      title: routeTitle("Teacher Access and Pricing"),
      description: "View Kaizen Maths teacher access, early-adopter pricing, and trial information for individual teachers and schools."
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
  if (parts[0] && homeTestimonialTimer) {
    window.clearInterval(homeTestimonialTimer);
    homeTestimonialTimer = null;
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
    if (!isSignedIn()) {
      app.innerHTML = `
        ${pageHeader("Worksheet Builder", "Create printable homework, quizzes, assessments, and intervention sheets from topic levels and question types.")}
        ${signInCallout("Trial access required")}
      `;
      bindAuthActions();
      return;
    }
    renderWorksheetGenerator();
  } else if (parts[0] === "gcse-exam-style") {
    renderGcseExamStyle();
  } else if (parts[0] === "tools" && parts[1] === "interface-guide") {
    location.hash = "#/how-to-use-this-site";
    return;
  } else if (parts[0] === "tools" && parts[1]) {
    renderToolDetail(parts[1]);
  } else if (parts[0] === "tools") {
    renderToolLibrary();
  } else if (parts[0] === "coverage-map") {
    renderCoverageMap();
  } else if (parts[0] === "collections" && parts[1]) {
    renderToolLibrary(parts[1]);
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
  loadToolAccessSettings({ rerender: true });
  loadToolMetadata({ rerender: true });
  loadUserProfiles({ rerender: true });
  loadSchools({ rerender: true });
  loadUniversityVideos({ rerender: true });
  loadSiteTestimonials({ rerender: true });
});

window.setTimeout(() => {
  updateAdminNavVisibility();
  loadToolAccessSettings({ rerender: true });
  loadToolMetadata({ rerender: true });
  loadUserProfiles({ rerender: true });
  loadSchools({ rerender: true });
  loadUniversityVideos({ rerender: true });
  loadSiteTestimonials({ rerender: true });
}, 1200);

renderRoute();
