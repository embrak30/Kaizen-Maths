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
    toolPath: "tools/substitution/index.html?v=substitution-one-example-render-1",
    imported: true,
    legacyUrl: "https://www.kaizen-maths.com/substitution",
    teacherNotes: [
      "Designed for board-led infinite practice with levels and instant regeneration.",
      "Keep the original question tool intact; the shell only organises access, guidance, and navigation.",
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
    toolPath: "tools/quadratic-equations/index.html?v=batch3-steps-1",
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
    toolPath: "tools/matrices/index.html?v=batch1-steps-1",
    imported: true,
    teacherNotes: [
      "Level 1 focuses on matrix operations: addition, subtraction, and scalar multiplication.",
      "Level 2 develops determinant, inverse, and multiplication fluency for 2 by 2 and 3 by 3 matrices.",
      "Level 3 uses unknown entries and singular matrices to form equations involving x."
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
    toolPath: "tools/decimals-practice-lab/index.html?v=step-structure-1",
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
    toolPath: "tools/fractions-practice/index.html?v=fractions-worksheet-bars-1",
    imported: true,
    teacherNotes: [
      "Level 1 develops equivalent fraction reasoning using multiplication, division, and cross multiplication.",
      "Level 2 focuses on simplifying fractions by identifying common factors.",
      "Level 3 practises adding and subtracting fractions with the same denominator.",
      "Level 4 brings together all four operations with proper fractions and mixed numbers."
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
    toolPath: "tools/surds-radicals/index.html?v=step-structure-1",
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
    description: "Open board-ready graph grids, coordinate axes, 2D shapes, and 3D solids for live classroom explanation.",
    tags: ["classroom", "display", "graph grid", "coordinate axes", "geometry", "shapes", "solids", "board"],
    toolPath: "tools/classroom-displays/index.html?v=classroom-displays-2",
    imported: true,
    teacherNotes: [
      "Designed as a static board companion rather than a question generator.",
      "Teachers can quickly show blank grids, coordinate axes, common 2D shapes, and 3D solids.",
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
  usersLoaded: false,
  universityVideos: {},
  accessLoaded: false
};

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

  function formatMathText(text) {
    return String(text)
      .replace(/(?<=[A-Za-z0-9)\]])\s*([=<>≤≥])\s*(?=[A-Za-z0-9(+-])/g, " $1 ")
      .replace(/(?<=[A-Za-z0-9)\]])\s*([+-])\s*(?=[A-Za-z0-9(])/g, " $1 ")
      .replace(/\s{2,}/g, " ");
  }

  function appendText(text) {
    if (text) fragment.appendChild(document.createTextNode(formatMathText(text)));
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
      return /(∫_|\\int|[_^]|[A-Za-z][2-9]\b|\\d?frac|\\sqrt|\\displaystyle|\\boxed|\\text|\\left|\\right|\\big|\\quad|\\;|\\,|\\times|\\cdot|\\pm|\+\/-|\\approx|\\neq|\\Rightarrow|\\rightarrow|\\leq?|\\geq?|\\lt|\\gt|\\infty|\\theta|\\alpha|\\beta|\\gamma|\\Delta|\\pi|\\sin|\\cos|\\tan|\\sec|\\csc|\\cot|\\ln|\\\(|\\\[|\$)/.test(node.nodeValue)
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
            <p>${escapeHtml(section.levelLabel)} · ${escapeHtml(section.typeLabel)}</p>
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
      { id: "classroom-displays", title: "Classroom Displays", description: "How to use graph grids, shapes, solids, probability templates, and statistics displays during live explanation." }
    ]
  },
  {
    title: "Worksheets And Assessment",
    intro: "How to turn topic generators into homework, quizzes, assessments, and intervention sheets.",
    videos: [
      { id: "building-a-worksheet", title: "Building A Worksheet", description: "How to choose topics, levels, and question types from across the site." },
      { id: "assessment-mode-and-marks", title: "Assessment Mode And Marks", description: "How to add marks and shape a worksheet into a quiz or test-style paper." },
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
      duration_label: "Video guide"
    };
  }
  return {
    youtube_url: saved.youtube_url || "",
    title: saved.title || video.title,
    description: saved.description || video.description,
    duration_label: saved.duration_label || "Video guide"
  };
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
    <section class="metric-grid" aria-label="Platform metrics">
      <div class="metric"><span>Topic tools</span><strong>${topicGenerators}</strong></div>
      <div class="metric"><span>Subject collections</span><strong>${categories.size}</strong></div>
      <div class="metric"><span>Worksheet-ready topics</span><strong>${worksheetReady}</strong></div>
      <div class="metric"><span>Question supply</span><strong>∞</strong></div>
    </section>
  `;
}

function renderHome() {
  app.innerHTML = `
    <section class="home-hero">
      <div class="hero-copy">
        <span class="eyebrow">For Maths Teachers</span>
        <h1>Your Virtual Mathematics Textbook</h1>
        <p>Unlimited maths questions, examples, worksheets, and assessments for every topic you teach.</p>
        <p>Kaizen Maths helps teachers generate the right questions at the right level, whenever they need them, while keeping teachers fully in control of the lesson.</p>
      </div>
      <div class="hero-diagram" aria-hidden="true">
        <span class="diagram-card diagram-card-a">y = mx + c</span>
        <span class="diagram-card diagram-card-b">Σ</span>
        <span class="diagram-card diagram-card-c">x²</span>
        <span class="diagram-node node-a"></span>
        <span class="diagram-node node-b"></span>
        <span class="diagram-node node-c"></span>
        <span class="diagram-line line-a"></span>
        <span class="diagram-line line-b"></span>
      </div>
      <div class="home-hero-actions">
        <a class="button primary" href="#/beta-feedback">Beta Testing Brief</a>
        <a class="button primary" href="#/kaizen-university">Kaizen University</a>
        <a class="button primary" href="#/worksheet-generator">Create a Worksheet</a>
        <a class="button primary" href="#/how-to-use-this-site">How to Use This Site</a>
        <a class="button" href="#/tools">Open Tool Library</a>
        <a class="button" href="#/collections/statistics">Explore Statistics</a>
      </div>
    </section>
    <section class="beta-callout" aria-label="Beta testing feedback">
      <div class="beta-callout-icon" aria-hidden="true">B</div>
      <div>
        <span class="eyebrow">Beta Testing</span>
        <h2>Helping test Kaizen Maths?</h2>
        <p>Start with the beta brief. It explains which teacher workflows to try, what kind of feedback is most useful, and gives testers a simple feedback form they can copy and send back privately.</p>
      </div>
      <a class="button primary" href="#/beta-feedback">Open Beta Brief</a>
    </section>
    <section class="university-callout" aria-label="Kaizen University">
      <div class="beta-callout-icon" aria-hidden="true">KU</div>
      <div>
        <span class="eyebrow">Teacher Training</span>
        <h2>Kaizen University</h2>
        <p>Short practical video guides for teachers: learn how to navigate the site, use generators on the board, build worksheets, and make Kaizen Maths part of normal classroom practice.</p>
      </div>
      <a class="button primary" href="#/kaizen-university">Open Training Hub</a>
    </section>
    <section class="guide-callout" aria-label="How to use this site">
      <div class="guide-callout-copy">
        <span class="eyebrow">New Here?</span>
        <h2>Start with the illustrated site guide</h2>
        <p>See how to move from dashboard to library, choose a topic, switch between Practice Set and One Example mode, reveal answers and steps, and build worksheets from the same question types.</p>
        <a class="button primary" href="#/how-to-use-this-site">Read How to Use This Site</a>
      </div>
      <img src="assets/guide-screenshots/classroom-practice-set.png" alt="Classroom practice set screenshot">
    </section>
    <section class="worksheet-callout" aria-label="Worksheet builder">
      <div class="worksheet-callout-icon" aria-hidden="true">▦</div>
      <div>
        <h2>Need a worksheet from today&apos;s lesson?</h2>
        <p>Use the worksheet builder to select topics, levels, and question types from across the virtual textbook, then print a clean student sheet with a separate answer key.</p>
      </div>
      <a class="button primary" href="#/worksheet-generator">Create Worksheet</a>
    </section>
    ${metricGrid()}
    <section class="split-grid">
      <div class="panel">
        <h2>Start From The Topic You Teach</h2>
        <div class="migration-list">
          <article class="migration-item"><span>1</span><div><h3>New here?</h3><p>Open the site guide for a quick walkthrough of navigation, levels, question types, timers, answers, and worked steps.</p></div></article>
          <article class="migration-item"><span>2</span><div><h3>Need practice now?</h3><p>Open the Tool Library, choose a topic, select a level, and generate a compact question set for retrieval practice or a quick confidence check.</p></div></article>
          <article class="migration-item"><span>3</span><div><h3>Modelling a method?</h3><p>Use One Example mode or reveal worked steps when you want to discuss the method, check misconceptions, or adjust the pace.</p></div></article>
          <article class="migration-item"><span>4</span><div><h3>Setting independent work?</h3><p>Create worksheets, homework, quizzes, assessments, and intervention practice from the same topic library.</p></div></article>
        </div>
      </div>
      <div class="panel">
        <h2>Built For The Front Of The Room</h2>
        <p>Each topic tool follows a simple teaching rhythm: choose the level, project a board-friendly set, let students think, then reveal answers or the method. Teachers decide the pace, the questions, and when the class is ready to move on.</p>
        <div class="badge-row">
          <span class="badge">Board-ready sets</span>
          <span class="badge">Unlimited questions</span>
          <span class="badge">Worked steps</span>
          <span class="badge">Answer reveal</span>
          <span class="badge">Search</span>
          <span class="badge">Teacher notes</span>
          <span class="badge">Topic collections</span>
        </div>
      </div>
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
          <button class="button" id="addWorksheetSection" type="button">Add Question Block</button>
          <button class="button" id="buildTopicAssessment" type="button">Build Topic Assessment</button>
          <button class="button primary" id="generateWorksheet" type="submit">Create Worksheet</button>
          <button class="button" id="printWorksheet" type="button" disabled>Print / Save PDF</button>
          <button class="button subtle" id="resetWorksheet" type="button">Reset Worksheet</button>
        </div>
        <div class="worksheet-section-list" id="worksheetSectionList"></div>
        <p class="worksheet-status" id="worksheetStatus">Loading the selected tool...</p>
      </form>
      <section class="worksheet-preview panel" id="worksheetPreview">
        <div class="empty-state">Choose the worksheet options, then generate a printable question set.</div>
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
  }

  if (levels.length) levelSelect.value = String(levels[0].id);
  levelSelect.onchange = populateTypes;
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
  setWorksheetStatus(`Loading ${tool.title}...`);

  loadWorksheetToolForApi(tool)
    .then(({ metadata }) => {
      if (loadToken !== worksheetState.loadToken) return;
      worksheetState.metadata = metadata;
      populateWorksheetControls(metadata);
      setWorksheetStatus(`${tool.title} is ready. Add this block or choose another topic.`);
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

function renderWorksheetSections() {
  const list = document.getElementById("worksheetSectionList");
  if (!list) return;
  const { assessment } = worksheetAssessmentOptions();

  if (!worksheetState.sections.length) {
    list.innerHTML = `<p class="worksheet-section-empty">No blocks added yet. Generate will use the current selection, or add blocks to mix topics.</p>`;
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
    });
  });

  list.querySelectorAll(".worksheet-section-count").forEach((input) => {
    input.addEventListener("change", () => {
      const section = worksheetState.sections.find((item) => item.id === input.dataset.sectionId);
      if (!section) return;
      section.count = Math.max(1, Math.min(40, Number(input.value || 1)));
      input.value = String(section.count);
    });
  });

  list.querySelectorAll(".worksheet-section-marks").forEach((input) => {
    input.addEventListener("change", () => {
      const section = worksheetState.sections.find((item) => item.id === input.dataset.sectionId);
      if (!section) return;
      section.marksPerQuestion = Math.max(1, Math.min(20, Number(input.value || 1)));
      input.value = String(section.marksPerQuestion);
    });
  });
}

function addWorksheetSection() {
  const section = currentWorksheetSection();
  if (!section) {
    setWorksheetStatus("Choose a valid tool, level, and question type before adding a block.", "error");
    return;
  }
  worksheetState.sections.push(section);
  renderWorksheetSections();
  setWorksheetStatus(`Added ${section.count} ${section.toolTitle} questions to the worksheet.`, "success");
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

  const sectionSummary = worksheet.sections?.length
    ? worksheet.sections.map((section) => `${section.toolTitle}: ${section.count}`).join(" · ")
    : `${worksheet.problems.length} questions`;
  const totalMarks = worksheetTotalMarks(worksheet);
  const paperTitle = options.assessment ? "Mixed Assessment Paper" : "Mixed Practice Worksheet";
  const paperEyebrow = options.assessment ? "Kaizen Maths Assessment" : "Kaizen Maths Worksheet";
  let questionNumber = 0;

  preview.innerHTML = `
    <article class="worksheet-sheet" id="worksheetSheet">
      <header class="worksheet-sheet-header">
        <div>
          <span class="eyebrow">${paperEyebrow}</span>
          <h2>${paperTitle}</h2>
          <p>${escapeHtml(sectionSummary)} · ${worksheet.problems.length} total questions${options.assessment ? ` · ${totalMarks} total marks` : ""}</p>
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
            <p>${escapeHtml(section.levelLabel)} · ${escapeHtml(section.typeLabel)} · ${sectionProblems.length} questions${options.assessment && section.marksPerQuestion ? ` · ${worksheetMarksText(section.marksPerQuestion)} each` : ""}</p>
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
  worksheetState.sections = [];
  worksheetState.worksheet = null;
  if (assessmentMode) assessmentMode.checked = false;
  if (assessmentPanel) assessmentPanel.hidden = true;
  if (marksInput) marksInput.value = "1";
  renderWorksheetSections();
  if (preview) {
    preview.innerHTML = `<div class="empty-state">Choose the worksheet options, then generate a printable question set.</div>`;
  }
  if (printButton) printButton.disabled = true;
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
  assessmentMode?.addEventListener("change", () => {
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
    const sections = worksheetState.sections.length ? [...worksheetState.sections] : [currentWorksheetSection()].filter(Boolean);

    if (!sections.length) {
      setWorksheetStatus("Add at least one valid question block before generating.", "error");
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

  if (haystack.includes("statistics") || haystack.includes("probability") || haystack.includes("tree diagram")) {
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
    <div class="topic-map-grid">
      <article class="topic-map-card">
        <h4>Topic Focus</h4>
        <ul>${concepts.slice(0, 8).map((topic) => `<li>${escapeHtml(topic)}</li>`).join("")}</ul>
      </article>
    </div>
  `;
}

function renderTopicMap(levels, tool) {
  if (!levels?.length) return fallbackTopicMap(tool);
  return `
    <div class="topic-map-grid">
      ${levels.map((level) => `
        <article class="topic-map-card">
          <h4>${escapeHtml(level.title || `Level ${level.id}`)}</h4>
          <p>${escapeHtml(level.description || "Generated practice for this topic area.")}</p>
        </article>
      `).join("")}
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

function renderSchools() {
  app.innerHTML = `
    ${pageHeader(
      "School Access",
      "School licences give maths departments shared access to Kaizen Maths as a virtual mathematics textbook: unlimited topic questions, board-ready generators, worked solutions, worksheets, and assessment practice for classroom use.",
      `<a class="button" href="#/upgrade">Back to Upgrade</a>`
    )}
    <section class="upgrade-page">
      <article class="panel trial-notice">
        <span class="eyebrow">Testing Phase</span>
        <h2>Schools can explore the full site until 30 June 2026</h2>
        <p>During the testing phase, teachers can use the full library without payment. This gives departments time to check coverage, try the classroom tools, build worksheets, and decide whether Kaizen Maths would support regular teaching across the school.</p>
        <p>School prices shown below are early-adopter rates for the first schools that help shape the platform. Standard pricing is expected to be higher after the launch period.</p>
      </article>

      <section class="pricing-grid" aria-label="School licence options">
        <article class="panel pricing-card">
          <span class="eyebrow">Early Adopter</span>
          <h2>Up to 5 Teachers</h2>
          <p class="pricing-price">£299/year</p>
          <p class="pricing-note">Expected standard price: £499/year</p>
          <p>Designed for a small maths department or pilot group. Each teacher can sign in, access the full tool library, generate classroom questions, and create worksheets from the same shared platform.</p>
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
        <p>Paid teacher and school access will be introduced after the trial period. The prices shown below are early-adopter rates for the first teachers and schools who help shape the platform. Standard pricing is expected to be higher after launch.</p>
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

  const videoRows = universitySections.map((section) => `
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
      <td colspan="5">
        <strong>No signed-up users loaded yet.</strong>
        <small>${state.usersLoaded ? "No profile rows were found." : "Open this tab after Supabase has loaded, or refresh while signed in as admin."}</small>
      </td>
    </tr>
  `;

  app.innerHTML = `
    ${pageHeader("Admin", "Manage simple site updates without editing code: access rules, curriculum tags, and Kaizen University video content.")}
    <section class="admin-tabs" aria-label="Admin sections">
      <button class="admin-tab active" type="button" data-admin-tab="users">Users</button>
      <button class="admin-tab" type="button" data-admin-tab="access">Tool Access</button>
      <button class="admin-tab" type="button" data-admin-tab="metadata">Tool Tags</button>
      <button class="admin-tab" type="button" data-admin-tab="university">Kaizen University</button>
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
            <tr><th>User</th><th>Role</th><th>Trial Until</th><th>Billing</th><th>Action</th></tr>
          </thead>
          <tbody>${userRows}</tbody>
        </table>
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
          <p>Paste the correct YouTube link beside each training video slot. You can also override the public title, description, and label when a video changes.</p>
        </div>
        <button class="button primary" id="saveUniversityVideos" type="button">Save Video Content</button>
      </div>
      <p class="admin-status" id="adminVideoStatus">Empty copy fields use the default Kaizen University text. Paste full YouTube links, unlisted links, embed links, or video IDs.</p>
      <div class="admin-video-list">
        ${videoRows}
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
      const trialDate = document.querySelector(`.admin-user-trial-date[data-user-id="${CSS.escape(userId)}"]`)?.value || "";
      button.disabled = true;
      usersStatus.textContent = "Saving user access...";
      try {
        await saveUserProfileAccess(userId, {
          role,
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
  const stage = document.querySelector(".legacy-stage");
  const frame = stage?.querySelector(".legacy-frame");
  if (!button || !stage) return;

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

  function setClassroomMode(active) {
    stage.classList.toggle("classroom", active);
    document.body.classList.toggle("classroom-active", active);
    button.textContent = active ? "Exit Classroom View" : "Classroom View";
    button.setAttribute("aria-pressed", String(active));
    if (active) {
      scheduleClassroomFit();
    } else {
      resetFrameFit();
    }

    if (active && stage.requestFullscreen) {
      stage.requestFullscreen().catch(() => {});
    } else if (!active && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  button.addEventListener("click", () => {
    setClassroomMode(!stage.classList.contains("classroom"));
  });

  if (exitButton) {
    exitButton.addEventListener("click", () => setClassroomMode(false));
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
      setClassroomMode(false);
    }
  });

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && stage.classList.contains("classroom")) {
      setClassroomMode(false);
    }
  });
}

function routeParts() {
  return (location.hash || "#/").split("?")[0].replace(/^#\/?/, "").split("/");
}

function renderRoute() {
  closeMobileNav();
  updateAdminNavVisibility();
  setActiveNav();
  const parts = routeParts();
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
  } else if (parts[0] === "tools" && parts[1] === "interface-guide") {
    location.hash = "#/how-to-use-this-site";
    return;
  } else if (parts[0] === "tools" && parts[1]) {
    renderToolDetail(parts[1]);
  } else if (parts[0] === "tools") {
    renderToolLibrary();
  } else if (parts[0] === "collections" && parts[1]) {
    renderToolLibrary(parts[1]);
  } else if (parts[0] === "schools") {
    renderSchools();
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
  loadUniversityVideos({ rerender: true });
});

window.setTimeout(() => {
  updateAdminNavVisibility();
  loadToolAccessSettings({ rerender: true });
  loadToolMetadata({ rerender: true });
  loadUserProfiles({ rerender: true });
  loadUniversityVideos({ rerender: true });
}, 1200);

renderRoute();
