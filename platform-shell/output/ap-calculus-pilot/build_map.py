from build_pilots import *
# Concise topic labels follow the supplied College Board topic numbering.
UNITS=[]
def unit(n,title,rows):
 entries=[]
 for i,line in enumerate(rows.strip().split('\n'),1):
  title,status,basis,need,*bc=line.split('|');entries.append(dict(code=f'{n}.{i}',title=title,status=status,basis=basis,need=need,scope='BC only' if bc else 'AB + BC'))
 UNITS.append(dict(n=n,title=unit_titles[n],rows=entries))
unit_titles={1:'Limits and continuity',2:'Differentiation: definition and basic rules',3:'Composite, implicit and inverse differentiation',4:'Contextual applications of differentiation',5:'Analytical applications of differentiation',6:'Integration and accumulation of change',7:'Differential equations',8:'Applications of integration',9:'Parametric, polar and vector-valued functions',10:'Infinite sequences and series'}
unit(1,'', '''Change at an instant|New|LIM (background)|Graph, table and context bank; pilot 1.1 drafted.
Limit notation|Extend|LIM|Interpret notation; distinguish value from limit.
Limits from graphs|New|GRF (background)|Open/closed points; one-sided and two-sided limits.
Limits from tables|Core|LIM|Vary approach patterns; include misleading tables.
Algebraic properties of limits|Core|LIM|Add explanations of law applicability.
Algebraic manipulation of limits|Core|LIM|Balance factoring, conjugates and domain restrictions.
Selecting limit procedures|Extend|LIM|Require method choice, not a labelled procedure.
Squeeze Theorem|New|None identified|Build bounding graphs and theorem justification.
Multiple representations of limits|Extend|LIM + GRF|Link verbal, symbolic, numerical and graphical data.
Types of discontinuities|Extend|LIM|Add graphical classification and explanations.
Continuity at a point|Extend|LIM|Require all continuity conditions, not just substitution.
Continuity over an interval|Extend|LIM|Include endpoints, domains and interval reasoning.
Removing discontinuities|Core|LIM|Reuse parameters; add explanation of the repair.
Infinite limits and vertical asymptotes|Extend|LIM + GRF|Add signed one-sided unbounded behaviour.
Limits at infinity and horizontal asymptotes|Core|LIM|Add graph and end-behaviour interpretations.
Intermediate Value Theorem|New|LIM (background)|Verify hypotheses; distinguish existence from uniqueness.''')
unit(2,'', '''Average and instantaneous rates|Extend|LIM + POL|Context, secant/tangent and units bank.
Derivative definition and notation|Core|LIM|Use both derivative definitions and interpret notation.
Estimating derivatives at a point|New|LIM (background)|Tangent, secant and table estimates; uncertainty.
Differentiability and continuity|New|LIM (background)|Corners, cusps, vertical tangents and discontinuities.
Power rule|Core|POL|Select AP-relevant exponents; vary task demands.
Constant, sum and multiple rules|Core|POL|Add evaluation and representation questions.
Derivatives of sin, cos, exponential and log|Core|DER + TRIG|Check AP forms, domain and radians.
Product rule|Core|DER|Add table-based and contextual product questions.
Quotient rule|Core|DER|Add table-based questions; check simplified answers.
Other trigonometric derivatives|Core|TRIG|Include reciprocal trig functions with AP notation.''')
unit(3,'', '''Chain rule|Core|DER + TRIG|Add function tables and composite-function graphs.
Implicit differentiation|Core|ADV|Add interpretation; preserve derivative factors.
Derivatives of inverse functions|Extend|DER + INV|New general inverse-function and table questions.
Inverse trigonometric derivatives|Core|INV|Filter to required AP functions; exclude unrelated forms.
Selecting derivative procedures|Extend|DER + ADV|Mixed unlabelled rule choices and justifications.
Higher-order derivatives|Core|ADV|Add graphs, notation and context for second derivatives.''')
unit(4,'', '''Meaning of a derivative in context|New|DER (background)|Units, sign and instantaneous-rate interpretations.
Position, velocity and acceleration|Extend|POL + DER|Variable motion; direction, speed and total distance.
Rates in other applied contexts|New|DER (background)|Meaningful models, units and data representations.
Introduction to related rates|Extend|ADV|Identify quantities, constants and time dependencies.
Solving related rates|Extend|ADV|Varied geometry and sign reasoning; pilot 4.5 drafted.
Local linearity and linearization|Extend|POL + DER|Approximation; over/underestimation from concavity.
L'Hospital's Rule|New|LIM + DER (background)|Indeterminate forms; hypotheses; transformed expressions.''')
unit(5,'', '''Mean Value Theorem|New|LIM + DER (background)|Verify hypotheses and justify existence of c.
EVT, extrema and critical points|Extend|DER|Separate local/global extrema and endpoint reasoning.
Increasing and decreasing intervals|Extend|DER + GRF|Derivative sign charts and graphical evidence.
First Derivative Test|Extend|DER|Sign changes; non-extremal critical points.
Candidates Test for absolute extrema|Extend|DER|Closed intervals, endpoints and complete comparison.
Concavity over a domain|New|DER (background)|Second-derivative signs and inflection conditions.
Second Derivative Test|Extend|DER + ADV|Include inconclusive tests and valid conclusions.
Sketching functions and derivatives|New|GRF (background)|Match derivative behaviour to original graphs.
Connecting f, f' and f''|New|GRF + DER (background)|Graph/table reasoning across all three functions.
Introduction to optimization|New|DER (background)|Build objective, constraint and feasible domain.
Solving optimization problems|New|DER (background)|Varied contexts; justify optimum and endpoints.
Behaviour of implicit relations|Extend|ADV|Horizontal/vertical tangents; second-derivative analysis.''')
unit(6,'', '''Accumulations of change|New|INT (background)|Net accumulation with units and variable rates.
Riemann-sum area approximations|Extend|INT + NUM|Add left, right and midpoint sums, not only trapezoids.
Summation and definite-integral notation|New|INT (background)|Translate sums, limits and integrals.
FTC and accumulation functions|New|INT + DER (background)|Variable upper bounds and derivative interpretation.
Behaviour of accumulation functions|New|INT (background)|Read signed areas; extrema and concavity.
Properties of definite integrals|Extend|INT|Orientation, additivity, bounds and symmetry.
FTC and definite integrals|Core|INT|Link antiderivatives to evaluation and meaning.
Antiderivatives and indefinite integrals|Core|INT|Include constants, domains and initial conditions.
Integration by substitution|Core|AINT|Filter required forms; change bounds carefully.
Long division and completing the square|Core|FRAC|Reuse division and completed-square types; vary forms.
Integration by parts|Core|AINT|Add method selection and definite forms.|BC
Linear partial fractions|Core|FRAC|Restrict to AP-required decompositions; check forms.|BC
Improper integrals|New|INT + LIM (background)|Limits at singularities and infinity; convergence.|BC
Selecting antidifferentiation techniques|Extend|INT + AINT|Mixed unlabelled choices; respect AB/BC filters.''')
unit(7,'', '''Modelling with differential equations|Extend|DE|AP-relevant verbal models and units.
Verifying differential-equation solutions|Extend|DE + DER|Substitution checks, domains and initial conditions.
Sketching slope fields|New|DE (background)|Generate fields and solution-curve sketches.
Reasoning using slope fields|New|DE (background)|Equilibria, solution behaviour and curve matching.
Euler's Method|Core|NUM|Add AP tables, unequal steps and approximation reasoning.|BC
Separation of variables: general solutions|Core|DE|Keep singular/equilibrium solutions in view.
Particular solutions and initial conditions|Core|DE|Check intervals and initial-condition substitution.
Exponential differential-equation models|Core|DE|Add model interpretation and parameter recovery.
Logistic models|New|DE (background)|Carrying capacity, equilibria and inflection behaviour.|BC''')
unit(8,'', '''Average value of a function|Extend|INT|Distinguish average value from average rate.
Motion using integrals|New|INT + DER (background)|Displacement versus total distance; sign changes.
Accumulation in applied contexts|New|INT (background)|Initial amount, net change, inflow and outflow.
Area between curves: functions of x|Extend|INT + XSEC|Create full worksheet questions; select top/bottom.
Area between curves: functions of y|Extend|INT + XSEC|Horizontal strips and right/left boundaries.
Area across multiple intersections|Extend|INT + XSEC|Locate crossings and split intervals correctly.
Cross-sections: squares and rectangles|Extend|XSEC + INT|Explainer exists; build graded questions and solutions.
Cross-sections: triangles and semicircles|Extend|XSEC + INT|Shape factors; radius/diameter distinctions.
Discs around coordinate axes|Core|REV|Reuse x/y-axis disc families; add diagram interpretation.
Discs around other axes|Extend|REV + REVX|Shifted axes need new families, not just shifted functions.
Washers around coordinate axes|Core|REV|Reuse washer families; extend graphical interpretation.
Washers around other axes|Extend|REV + REVX|Shifted axes; subtract squared radii correctly.
Arc length and distance travelled|New|ADV + INT (background)|Generate arc-length integrals and motion contexts.|BC''')
unit(9,'', '''Parametric equations and first derivatives|Core|ADV|Add AP graphs and parameter interpretation.|BC
Parametric second derivatives|Core|ADV|Retain division by the parameter derivative.|BC
Parametric arc length|New|ADV + INT (background)|Arc-length setup, intervals and numerical integration.|BC
Differentiating vector-valued functions|New|DER (background)|Component derivatives; existing VEC is geometry only.|BC
Integrating vector-valued functions|New|INT (background)|Initial position and vector antiderivatives.|BC
Parametric and vector motion|New|ADV (background)|Velocity, acceleration, speed and distance.|BC
Polar coordinates and differentiation|Core|POLAR|Filter derivative forms; include tangent reasoning.|BC
Area bounded by one polar curve|Core|POLAR|Check full traversal and avoid double counting.|BC
Area bounded by two polar curves|Extend|POLAR|Add interval selection, intersections and shading.|BC''')
unit(10,'', '''Convergent and divergent infinite series|Extend|SEQ|Partial-sum limits; sequences versus series.|BC
Geometric series|Core|SEQ|Include convergence conditions and contextual sums.|BC
nth-term divergence test|New|SEQ (background)|Zero term limit is inconclusive, not proof of convergence.|BC
Integral Test|New|INT + SEQ (background)|Positivity, continuity and decreasing hypotheses.|BC
Harmonic and p-series|New|SEQ (background)|Classification and boundary cases.|BC
Comparison Tests|New|SEQ (background)|Direct and limit comparison; justify valid comparisons.|BC
Alternating Series Test|New|SEQ (background)|Monotonicity, term limits and convergence reasoning.|BC
Ratio Test|New|SEQ (background)|Limit cases and inconclusive outcomes.|BC
Absolute and conditional convergence|New|SEQ (background)|Test original and absolute-value series separately.|BC
Alternating Series Error Bound|New|SEQ (background)|Error tolerance and required term count.|BC
Taylor polynomial approximations|Core|SER|Use derivative data, centres and approximation meaning.|BC
Lagrange Error Bound|New|SER (background)|Derivative bounds, interval and remainder estimates.|BC
Radius and interval of convergence|Extend|SER|Ratio/root work and separate endpoint tests.|BC
Taylor and Maclaurin series|Core|SER|Match required expansions and validity intervals.|BC
Representing functions as power series|Core|SER|Termwise operations and convergence qualifications.|BC''')
TOOLS={
'LIM':('Limits and First Principles','limits-first-principles'), 'POL':('Basic Differentiation of Polynomials','differentiation-polynomials'),
'DER':('Product, Quotient and Chain Rule','differentiation-rules'),'TRIG':('Trigonometric Differentiation','trig-differentiation-rules'),
'INV':('Inverse Trig Differentiation','inverse-trig-differentiation'),'ADV':('Advanced Differentiation','advanced-differentiation'),
'INT':('Basic Integration and Definite Integrals','integration'),'AINT':('Integration by Substitution and Parts','advanced-integration'),
'FRAC':('Integration with Algebraic Fractions','integration-algebraic-fractions'),'NUM':('Numerical Methods','numerical-methods'),
'DE':('Differential Equations','differential-equations'),'GRF':('Graph Transformations and Curve Sketching','graph-transformations-curve-sketching'),
'XSEC':('Solids from Cross-sections (explainer)','cross-section-solids'),'REV':('Volumes of Revolution (practice generator)','volumes-of-revolution'),'REVX':('Volumes of Revolution 3D Explorer','revolution-explorer'),
'POLAR':('Polar Coordinates','polar-coordinates'),'SEQ':('Sequences and Series','sequences-series'), 'SER':('Taylor and Maclaurin Series','series-expansions'),
'VEC':('Further Vectors (geometry, not vector calculus)','further-vectors')}

def map_pdf():
 c=canvas.Canvas(str(OUT/'ap-calculus-topic-map.pdf'),pagesize=(W,H));c.setTitle('Kaizen AP Calculus - Topic map and pilot plan');c.setAuthor('Kaizen Maths');page=1
 y=header(c,'PLAN','AP Calculus topic map','Review draft | 17 November 2026',page)
 for title,txt in [
 ('Purpose','Create a dedicated AP area using Kaizen’s existing worksheet infrastructure. Teachers choose AB or BC, unit and topic, then generate ten deliberately varied main questions. This document is a planning map, not a completed resource bank or endorsement.'),
 ('What is ready to review','Two original pilot packs: Topic 1.1, Change at an instant; Topic 4.5, Solving related rates. Each contains ten questions, an independent version, the same questions with support, an answer key, worked solutions and suggested marks.'),
 ('How to read the map','Core = an existing question family can supply procedural practice. Extend = related content or an explainer exists, but an AP-specific bank is still needed. New = no dedicated matching family identified in the reviewed tools. None of these labels means a complete AP topic is already covered.'),
 ('Evidence and limits','The map uses the uploaded course outline and detailed course description, Kaizen’s tool catalogue and selected generator type configurations. It is not a mathematical audit of every existing generator. Topic titles are shortened for scanning. Tool codes are resolved in the directory at the end.'),
 ('AB and BC boundaries','AB content appears in Units 1-8; six BC-only topics also occur within those units. Units 9-10 are BC only. Some shared topics contain additional BC detail: the eventual bank must check learning objectives and essential knowledge, not rely only on the topic’s scope label.'),
 ('Current source check','College Board’s 2026-27 course page reports unchanged course content with clarifications. Use the current description and Fall 2026 corrections when implementing. The supplied at-a-glance file is older; its historical weights and pacing are not used here. These pilots are topic practice, not timed mock exams.'),
 ('What happens after review','Agree question demand, layout and support. Build the topic registry and question-data structure; validate numerical answers, domains, diagrams and marking guidance. Then connect the AP selection screen to Worksheet Builder. Start with AB; expand to BC in clearly labelled stages.')]:
  y=p(c,title,L,y,style='sub')-4;y=p(c,txt,L,y,CW,'body')-15
 y=p(c,'Current official reference: <link href="https://apcentral.collegeboard.org/courses/ap-calculus-ab" color="#146d65">AP Calculus AB course</link> and <link href="https://apcentral.collegeboard.org/media/pdf/ap-calculus-ab-bc-course-and-exam-description-clarifications.pdf" color="#146d65">Fall 2026 clarifications</link>.',L,y,style='small')
 if y<50:raise ValueError('Map intro overflow')
 c.showPage()
 for u in UNITS:
  page+=1;y=header(c,'UNIT '+str(u['n']),u['title'],'Topic-by-topic planning | Scope and resource fit',page)
  y=p(c,'Core: reuse procedural family. Extend: adapt related material. New: author a dedicated bank. All rows need AP-specific review and varied ten-question blueprints.',L,y,style='small')-12
  data=[[Paragraph(v,styles['cell']) for v in ['Topic (condensed title)','Scope','Existing basis','Required work']]]
  for r in u['rows']:
   data.append([Paragraph('<b>'+r['code']+'</b> '+escape(r['title']),styles['cell']),Paragraph(r['scope'],styles['cell']),Paragraph('<b>'+r['status']+'</b><br/>'+escape(r['basis']),styles['cell']),Paragraph(escape(r['need']),styles['cell'])])
  t=Table(data,colWidths=[156,42,102,CW-300],repeatRows=1);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),PALE),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,-1),.4,colors.HexColor('#d0dfda')),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6),('LEFTPADDING',(0,0),(-1,-1),5)]));_,hh=t.wrap(CW,1000)
  if y-hh<55:raise ValueError('Map table overflow unit '+str(u['n'])+' '+str(y-hh))
  t.drawOn(c,L,y-hh);c.showPage()
 page+=1;y=header(c,'TOOLS','Existing Kaizen resource directory','Codes used in the map | Links open the current tool information page',page)
 for code,(title,slug) in TOOLS.items():
  y=p(c,'<b>'+code+'</b>  <link href="https://www.kaizenmaths.com/#/tools/'+slug+'" color="#146d65">'+title+'</link>',L,y,style='hint')-12
 y=p(c,'Important filters',L,y-5,style='sub')-5
 y=p(c,'Keep integration by parts, AP linear partial fractions, improper integrals, Euler’s Method, logistic models and arc length out of AB-only sets. Do not include integrating factors, second-order differential equations, normal lines or other extras merely because an existing generator offers them. Inspect subtypes before reusing a general A-level tool.',L,y,style='body')-15
 y=p(c,'Geometry vectors are not vector calculus: the existing Further Vectors tool does not establish coverage of differentiating or integrating vector-valued functions. The convergence tests and error bounds in Unit 10 also need dedicated development.',L,y,style='body')
 if y<55:raise ValueError('Directory overflow')
 c.showPage();page+=1;y=header(c,'PILOTS','What to review first','Two contrasting topics | Original questions, not copied packets',page)
 for title,txt in [
 ('Pilot 1.1: Change at an instant','Ten main questions: a net volume rate; a piecewise journey graph; interpreting a quotient; heating data; tangent versus secant; decreasing reservoir volume; zero rate and non-constant behaviour; selecting a rate expression; limits of endpoint information; and narrowing time intervals. Graphs and tables are integral to the questions, not optional hints.'),
 ('Pilot 4.5: Solving related rates','Ten main questions: a changing product; expanding square; spherical volume; sliding ladder; perpendicular tracks with opposite rate signs; conical filling; an angle of elevation; moving shadow; a snapshot-substitution error; and constant area with changing perimeter. Support adds labelled sketches and modelling prompts without final answers.'),
 ('Print structure','Both packs: pages 1-5 independent questions; pages 6-10 supported questions; page 11 answer key. Worked solutions begin on page 12. Topic 1.1 has 16 pages total; Topic 4.5 has 18. Print the pupil version you want, rather than automatically distributing both or the solutions. All questions can be answered without a calculator; this is a pilot design choice, not a model for every AP topic.'),
 ('Content checks','Support must preserve each prompt, its values and its answer. Check that ten questions means ten main tasks, not ten full AP free-response problems. Suggested marks are Kaizen guidance, not official AP scoring. Accept equivalent methods and reasonable estimates; keep conceptual reasoning explicit.'),
 ('Presentation decisions for your review','Are the question sizes and working spaces right? Is the progression from interpretation or setup to connected reasoning appropriate? Are the worked steps slow enough? After these decisions, use the same component structure for on-screen display and PDF output.'),
 ('Source record','Syllabus references: your uploaded Course at a Glance (4 pages) and Course and Exam Description (256 pages), checked against the current AP Central course and clarification pages on 17 November 2026. Teaching-format references: your Topic 1.1 packet (3 pages) and Topic 4.5 CA1 (2 pages). Their question text and layouts have not been reproduced. This review does not use secure AP Classroom questions.')]:
  y=p(c,title,L,y,style='sub')-4;y=p(c,txt,L,y,CW,'body')-15
 if y<55:raise ValueError('Pilot review overflow')
 c.showPage();c.save();return page

if __name__=='__main__':
 rows=[r for u in UNITS for r in u['rows']];assert len(rows)==111;assert sum(r['scope']=='AB + BC' for r in rows)==81
 print('Map:',map_pdf(),'pages;',len(rows),'topics; 81 shared + 30 BC-only')
 (ROOT/'output/ap-calculus-pilot/topic-map.json').write_text(json.dumps({'units':UNITS,'toolDirectory':TOOLS,'reviewDate':'2026-11-17','statusMeaning':{'Core':'Procedural family candidate; not complete AP coverage','Extend':'Related content needs AP extension','New':'No dedicated matching family identified'}},indent=2))
 md=['# Kaizen AP Calculus topic map','Review draft, 17 November 2026. No application changes.','Core = procedural family candidate. Extend = adapt related content. New = dedicated bank needed. All topic mappings are provisional pending objective-level and mathematical review.','']
 for u in UNITS:
  md+=['## Unit '+str(u['n'])+': '+u['title'],'','| Code | Topic | Scope | Fit | Basis | Work needed |','|---|---|---|---|---|---|']
  md += ['| '+' | '.join(r[k] for k in ['code','title','scope','status','basis','need'])+' |' for r in u['rows']];md+=['']
 md+=['## Tool directory','']+[f'- {code}: [{title}](https://www.kaizenmaths.com/#/tools/{slug})' for code,(title,slug) in TOOLS.items()]
 (ROOT/'output/ap-calculus-pilot/topic-map.md').write_text('\n'.join(md)+'\n')
