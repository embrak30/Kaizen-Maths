"""Build original Kaizen topic practice for the current four IB maths courses.
No IB questions or guide text are copied. Reused banks retain their provenance.
"""
from pathlib import Path
import sys,os,json,re,math,copy,statistics
sys.path.insert(0,os.environ.get('KAIZEN_AP_PYTHON_MODULES','/tmp/kaizen-ap-python'))
import sympy as S
ROOT=Path(__file__).resolve().parents[2];D=ROOT/'data/ib-maths';D.mkdir(parents=True,exist_ok=True)
x,t=S.symbols('x t',real=True);packs=[];checks=[]
ALL=['aa-sl','aa-hl','ai-sl','ai-hl'];AA=['aa-sl','aa-hl'];HL=['aa-hl','ai-hl'];AAI=['aa-sl','aa-hl','ai-hl'];AI=['ai-sl','ai-hl']
N='Number & Algebra';F='Functions';G='Geometry & Trigonometry';P='Statistics & Probability';C='Calculus'
sources={k:{p['id']:p for p in json.loads((ROOT/v).read_text())['packs']} for k,v in {'a':'data/alevel-maths/edexcel-9ma0/library.json','g':'data/gcse-maths/library.json','p':'data/ap-calculus/print-questions.json'}.items()}
def m(v):return r'\('+(S.latex(v) if not isinstance(v,str) else v)+r'\)'
def q(prompt,answer,steps,marks=3):
 criteria=(["B1: Correct independent result [1]."] if marks==1 else ["M1: Correct method or setup [1]."]+["M1: Correct intermediate working [1]."]*(marks-2)+["A1: Correct final value, units or interpretation [1]."])
 return dict(question=prompt,questionText=prompt,answer=answer,steps=steps,marks=marks,criteria=criteria,origin='authored-ib')
def add(area,title,courses,questions,group='',tool=None,stimulus='',calculator='optional',provenance=None):
 prefix={N:'N',F:'F',G:'G',P:'S',C:'C'}[area];id=prefix+str(1+sum(p['area']==area for p in packs)).zfill(2)
 assert len(questions)==8,(title,len(questions));assert len({v['question'] for v in questions})==8,title
 questions=copy.deepcopy(questions)
 for i,v in enumerate(questions,1):v['number']=i;v.setdefault('questionText',v['question']);assert v['answer'] and v['steps']
 packs.append(dict(id=id,title=title,area=area,group=group or area,courses=courses,sourceTool='limits-first-principles',tools=[tool] if tool else [],questions=questions,stimulus=stimulus,calculator=calculator,provenance=provenance or {'kind':'original-ib'},instructions='Answer on separate paper. Show your working. '+('Use a graphing calculator. Give non-exact answers to 3 significant figures unless stated.' if calculator=='required' else 'Give exact answers unless a rounding instruction is stated.')))
 return id
def reuse(area,title,courses,source,id,group='',calculator='optional'):
 p=sources[source][id];result=add(area,title,courses,p['questions'],group,(p.get('tools') or [p.get('sourceTool')])[0],p.get('stimulus',''),calculator,{'kind':'kaizen-reuse','library':source,'id':id});packs[-1]['sourceTool']=p['sourceTool'];return result
def ck(name,left,right):
 assert S.simplify(left-right)==0,(name,left,right);checks.append({'name':name,'passed':True})
def matrix(v):return m(S.Matrix(v))
def svg(body,w=440,h=180):return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}">{body}</svg>'
def line(a,b,c,d):return f'<path d="M{a},{b}L{c},{d}" fill="none" stroke="#146d65" stroke-width="2"/>'
def tx(a,b,s):return f'<text x="{a}" y="{b}" font-family="Arial" font-size="14" fill="#203b43">{s}</text>'
# Number and algebra: explicit asymmetric SL/HL mappings.
reuse(N,'Standard form and calculation',ALL,'g','N10','Sequences & number')
reuse(N,'Arithmetic sequences and series',ALL,'a','P4.4','Sequences & number')
# Finite series only for AI SL: infinite series have their own HL allocation.
a=[]
for first,ratio,n in [(3,2,5),(5,3,4),(64,S.Rational(1,2),6),(2,S.Rational(3,2),7),(7,2,6),(81,S.Rational(1,3),5),(4,5,4),(10,S.Rational(4,5),8)]:
 first=S.Integer(first);ratio=S.Rational(ratio);term=first*ratio**(n-1);total=first*(1-ratio**n)/(1-ratio);ck('finite series',sum(first*ratio**k for k in range(n)),total)
 a.append(q(f'A geometric sequence has first term {m(first)} and ratio {m(ratio)}. Find {m("u_{"+str(n)+"}")} and {m("S_{"+str(n)+"}")}.',m(term)+'; '+m(total),[m(r'u_n=ar^{n-1}')+', so '+m(term)+'.',m(r'S_n=\frac{a(1-r^n)}{1-r}')+'.','Substitute a, r and n to obtain '+m(total)+'.']))
add(N,'Finite geometric sequences and series',ALL,a,'Sequences & number',tool='sequences-series')
reuse(N,'Convergent geometric series',AAI,'a','P4.5','Sequences & number')
reuse(N,'Rational indices',AAI,'a','P2.1','Algebra & proof')
reuse(N,'Logarithm laws',AAI,'a','P6.4','Algebra & proof')
reuse(N,'Deductive algebraic proof',AA,'a','P1.1a','Algebra & proof')
reuse(N,'Counterexamples and exhaustion', ['aa-hl'],'a','P1.1b','Algebra & proof')
reuse(N,'Proof by contradiction',['aa-hl'],'a','P1.1c','Algebra & proof')
reuse(N,'Positive-integer binomial expansions',AA,'a','P4.1a','Algebra & proof')
reuse(N,'Rational binomial expansions',['aa-hl'],'a','P4.1b','Algebra & proof')
a=[]
for principal,rate,years in [(1200,4,5),(3500,3,8),(800,6,4),(2400,5,6),(4500,2,10),(9000,7,3),(1500,8,4),(6000,4.5,7)]:
 value=principal*(1+rate/100)**years
 a.append(q(f'An investment of {principal} currency units earns {rate}% compound interest annually. Find its value after {years} years, to 2 decimal places.',f'{value:.2f} currency units.',[f'The annual multiplier is {1+rate/100:g}.',m(f'V={principal}(1+{rate}/100)^{{{years}}}')+'.',f'Keep full precision, then round: {value:.2f}.']))
add(N,'Compound interest and growth',ALL,a,'Finance',tool='financial-real-life-maths',calculator='required')
a=[]
for principal,rate,payment,n in [(10000,.005,300,12),(15000,.004,400,24),(8000,.006,250,18),(12000,.003,350,20),(6000,.005,200,12),(20000,.004,500,30),(5000,.007,180,16),(9000,.003,300,24)]:
 bal=principal*(1+rate)**n-payment*((1+rate)**n-1)/rate
 a.append(q(f'A loan starts at {principal}, earns {rate*100:g}% interest per month, then has {payment} repaid at each month-end. Find the balance after {n} payments (2 d.p.).',f'{bal:.2f} currency units.',[f'Apply interest before subtracting each payment: '+m(f'B_{{k+1}}={1+rate:g}B_k-{payment}')+'.',m(f'B_n={principal}(1+{rate})^n-{payment}\\frac{{(1+{rate})^n-1}}{{{rate}}}')+'.',f'Use n = {n}; the balance is {bal:.2f}.']))
add(N,'Loans, annuities and amortisation',AI,a,'Finance',calculator='required')
# Complex numbers: Cartesian and polar in both HL pathways; roots/De Moivre AA only.
a=[]
for real,imag in [(3,4),(5,12),(-3,4),(-5,-12),(8,-6),(1,1),(2,-2),(-1,3)]:
 z=real+S.I*imag;mod=S.sqrt(real**2+imag**2);ang=math.atan2(imag,real);ck('complex modulus',mod**2,real**2+imag**2)
 a.append(q('For '+m(f'z={S.latex(z)}')+', find the conjugate, modulus and principal argument (radians, 3 d.p.).',m(S.conjugate(z))+'; '+m(mod)+f'; {ang:.3f}.',[f'The conjugate reverses the sign of the imaginary part: '+m(S.conjugate(z))+'.',m(f'|z|=\\sqrt{{{real**2}+{imag**2}}}={S.latex(mod)}')+'.','Use the quadrant as well as the inverse tangent: '+f'{ang:.3f} radians.']))
add(N,'Complex numbers and the Argand plane',HL,a,'Complex numbers & matrices',calculator='required')
a=[]
for k in range(1,9):
 z=k+S.I*(k+1);w=2-S.I;value=S.expand(z/w);ck('complex quotient',S.expand(value*w),z)
 a.append(q('Express '+m(r'\frac{'+S.latex(z)+r'}{2-i}')+' in Cartesian form.',m(value),['Multiply numerator and denominator by '+m('2+i')+'.',m(r'(2-i)(2+i)=5')+'.','Expand and divide each part by 5: '+m(value)+'.']))
add(N,'Complex arithmetic and polar form',HL,a,'Complex numbers & matrices')
a=[]
for power in [2,3,4,5,6,7,8,9]:
 roots=[m(f'2\\operatorname{{cis}}\\left(\\frac{{2\\pi k}}{{{power}}}\\right),\\quad k=0,\\ldots,{power-1}')]
 a.append(q('Find all complex roots of '+m(f'z^{{{power}}}={2**power}')+' in polar form.',roots[0],[m(f'z^{{{power}}}={2**power}\\operatorname{{cis}}(2\\pi k)')+'.',f'The modulus of every root is 2; divide each argument by {power}.','Take k = 0 to '+str(power-1)+' for all distinct roots.']))
add(N,'De Moivre and roots of complex numbers',['aa-hl'],a,'Complex numbers & matrices')
a=[]
for power in range(1,9):
 base=power+1
 a.append(q(f'Use induction to prove {base}ⁿ ≥ 1 + {power}n for every integer n ≥ 1.',f'True for all integers n ≥ 1.', ['For n = 1, both sides equal '+str(base)+'.',f'Assume {base}ᵏ ≥ 1 + {power}k.',f'Then {base}ᵏ⁺¹ ≥ (1 + {power})(1 + {power}k) = 1 + {power}(k + 1) + {power**2}k.',f'The last term is nonnegative, so the required inequality holds at k + 1. Conclude by induction.'],4))
add(N,'Proof by mathematical induction',['aa-hl'],a,'Algebra & proof')
a=[]
for k in range(1,9):
 A=S.Matrix([[1,1,1],[1,2,3],[2,-1,1]]);v=S.Matrix([k,k+1,2]);b=A*v;ck('linear system',sum((A*v-b)),0)
 a.append(q('Solve the simultaneous system:<div>'+m(f'x+y+z={b[0]}')+'</div><div>'+m(f'x+2y+3z={b[1]}')+'</div><div>'+m(f'2x-y+z={b[2]}')+'</div>',m(f'(x,y,z)=({k},{k+1},2)'),['Subtract equation 1 from equation 2 to obtain '+m(f'y+2z={b[1]-b[0]}')+'.','Eliminate x from equation 3 using twice equation 1, then solve the two equations in y and z.','Obtain z = 2, y = '+str(k+1)+', then x = '+str(k)+'. Substitute in all three equations.'],4))
add(N,'Systems of three linear equations',['aa-hl','ai-sl','ai-hl'],a,'Complex numbers & matrices',calculator='required')
a=[]
for k in range(1,9):
 A=S.Matrix([[k,1],[2,k+2]]);B=S.Matrix([[1,2],[0,1]]);prod=A*B;[ck('matrix product entry',prod[i,j],sum(A[i,r]*B[r,j] for r in range(2))) for i in range(2) for j in range(2)]
 a.append(q('Given A = '+matrix(A)+' and B = '+matrix(B)+', find AB and det(A).',matrix(prod)+'; '+m(A.det()),['Each entry of AB is a row of A multiplied by a column of B.','The resulting matrix is '+matrix(prod)+'.',m(f'\\det A={k}({k+2})-2={A.det()}')+'.']))
add(N,'Matrix operations and determinants',['ai-hl'],a,'Complex numbers & matrices')
a=[]
for k in range(1,9):
 A=S.Matrix([[k+1,1],[k,1]]);inv=A.inv();b=A*S.Matrix([2,3]);[ck('matrix inverse entry',(A*inv)[i,j],int(i==j)) for i in range(2) for j in range(2)]
 a.append(q('Use an inverse matrix to solve '+m(f'{k+1}x+y={b[0]},\\quad {k}x+y={b[1]}')+'.',m('(x,y)=(2,3)'),['The coefficient matrix is '+matrix(A)+', with determinant 1.', 'Its inverse is '+matrix(inv)+'.','Multiply the inverse by '+matrix(b)+' to obtain '+matrix([2,3])+'.']))
add(N,'Inverse matrices and systems',['ai-hl'],a,'Complex numbers & matrices')
a=[]
for k in range(1,9):
 A=S.Matrix([[k,1],[0,k+2]])
 a.append(q('Find the eigenvalues and one eigenvector for each eigenvalue of A = '+matrix(A)+'.',m(f'\\lambda={k},\\ {k+2}')+'; '+matrix([1,0])+' and '+matrix([1,2])+'.',[m(f'\\det(A-\\lambda I)=({k}-\\lambda)({k+2}-\\lambda)=0')+'.','For λ = '+str(k)+', solving (A − λI)v = 0 gives v proportional to (1, 0).','For λ = '+str(k+2)+', solving gives y = 2x; use (1, 2).'],4))
add(N,'Eigenvalues and eigenvectors',['ai-hl'],a,'Complex numbers & matrices',calculator='required')
# Functions.
reuse(F,'Straight-line equations and models',ALL,'a','P3.1','Graphs & functions')
a=[]
for k in range(1,9):
 a.append(q('For '+m(f'f(x)=\\sqrt{{x-{k}}}+2')+', state the real domain and range, then find '+m(f'f({k+9})')+'.',m(f'x\\geq {k},\\quad y\\geq2')+'; 5.',['The radicand must be nonnegative: '+m(f'x-{k}\\geq0')+'.','The square root is nonnegative, so adding 2 gives range y ≥ 2.',m(f'f({k+9})=\\sqrt9+2=5')+'.']))
add(F,'Function notation, domain and range',ALL,a,'Graphs & functions')
reuse(F,'Quadratics, roots and discriminants',AA,'a','P2.3a','Graphs & functions')
reuse(F,'Completing the square and turning points',AA,'a','P2.3c','Graphs & functions')
reuse(F,'Composite and inverse functions',AAI,'a','P2.8','Graphs & functions')
reuse(F,'Combined graph transformations',AAI,'a','P2.9','Graphs & functions')
reuse(F,'Polynomial division and factor theorem',['aa-hl'],'a','P2.6a','Advanced functions')
reuse(F,'Modulus graphs and equations',['aa-hl'],'a','P2.7b','Advanced functions')
reuse(F,'Rational inequalities',['aa-hl'],'a','P2.5b','Advanced functions')
reuse(F,'Exponential equations',AAI,'a','P6.5','Models')
reuse(F,'Growth and decay models',ALL,'a','P6.7','Models','required')
reuse(F,'Trigonometric models',ALL,'a','P5.9','Models','required')
reuse(F,'Logarithmic scales and straight-line models',HL,'a','P6.6','Models','required')
reuse(F,'Choosing and critiquing models',ALL,'a','P2.11','Models','required')
a=[]
for k in range(1,9):
 a.append(q('A population is modelled by '+m(f'P(t)=\\frac{{{1000*k}}}{{1+9e^{{-0.2t}}}}')+'. Find P(0), the limiting population and the time to reach half the limit (2 d.p.).',f'{100*k}; {1000*k}; {math.log(9)/.2:.2f} time units.',['Substitute t = 0, so the denominator is 10.', 'As t increases, the exponential tends to zero; the limit is '+str(1000*k)+'.','Half the limit requires 9e⁻⁰·²ᵗ = 1, hence '+m(r't=\frac{\ln9}{0.2}')+'.'],4))
add(F,'Logistic models and limiting behaviour',['ai-hl'],a,'Models',calculator='required')
a=[]
for k in range(1,9):
 a.append(q('Use technology for '+m(f'f(x)=x^2-{2*k}x+{k*k-4}')+'. Find the roots, turning point and minimum on '+m(f'[{k-3},{k+3}]')+'.',m(f'x={k-2},\\ {k+2}')+'; '+m(f'({k},-4)')+'; minimum −4.',['Graph the function on the given interval and locate both x-axis intersections.',m(f'f(x)=(x-{k})^2-4')+' confirms the turning point.','The turning point is inside the interval and the parabola opens upwards.'],3))
add(F,'Using a graphing calculator to investigate functions',ALL,a,'Graphs & functions',calculator='required')
# Geometry and trigonometry.
reuse(G,'Coordinates, distance and midpoints',ALL,'g','A12','Geometry & measurement')
reuse(G,'Three-dimensional Pythagoras',ALL,'g','G24','Geometry & measurement')
reuse(G,'Areas and volumes of solids',ALL,'g','G15','Geometry & measurement')
reuse(G,'Right-triangle trigonometry',ALL,'g','G22','Geometry & measurement')
a=[]
for side,b,angle in [(5,7,40),(6,8,50),(7,10,60),(9,12,70),(4,6,35),(8,11,80),(10,13,45),(12,14,65)]:
 c=math.sqrt(side**2+b*b-2*side*b*math.cos(math.radians(angle)));area=.5*side*b*math.sin(math.radians(angle))
 a.append(q(f'A triangle has sides {side} cm and {b} cm enclosing {angle}°. Find the third side and area (3 s.f.).',f'{c:.3g} cm; {area:.3g} cm².',[m(f'c^2={side}^2+{b}^2-2({side})({b})\\cos {angle}^\\circ')+'.',f'Take the positive square root: c = {c:.3g} cm.',m(f'\\mathrm{{Area}}=\\tfrac12({side})({b})\\sin {angle}^\\circ')+f' = {area:.3g} cm².']))
add(G,'Sine, cosine and triangle area',ALL,a,'Geometry & measurement',calculator='required')
reuse(G,'Radians, arcs and sectors',AAI,'a','P5.1c','Trigonometry')
reuse(G,'Unit-circle trigonometry',AAI,'a','P5.1a','Trigonometry')
reuse(G,'Trigonometric equations in intervals',AA,'a','P5.7','Trigonometry')
reuse(G,'Fundamental and reciprocal identities',['aa-hl'],'a','P5.5','Trigonometry')
reuse(G,'Addition formulae',['aa-hl'],'a','P5.6a','Trigonometry')
reuse(G,'Double-angle applications',AA,'a','P5.6b','Trigonometry')
reuse(G,'Reciprocal and inverse trig functions',['aa-hl'],'a','P5.4','Trigonometry')
reuse(G,'Vectors, magnitudes and directions',HL,'a','P10.2','Vectors')
reuse(G,'Vector geometry in three dimensions',HL,'a','P10.5a','Vectors')
a=[]
for k in range(1,9):
 u=S.Matrix([k,1,2]);v=S.Matrix([1,2,-1]);dot=u.dot(v);cross=u.cross(v);ang=math.degrees(math.acos(float(dot/(u.norm()*v.norm()))));ck('cross orthogonality',cross.dot(u),0)
 a.append(q('For u = '+matrix(u)+' and v = '+matrix(v)+', find u · v, the angle between them (degrees, 3 s.f.) and u × v.',m(dot)+f'; {ang:.3g}°; '+matrix(cross),['Multiply corresponding components and add: '+m(f'u\\cdot v={dot}')+'.',m(r'\cos\theta=\frac{u\cdot v}{|u||v|}')+f', giving {ang:.3g}°.', 'Expand the cross product component by component to obtain '+matrix(cross)+'.'],4))
add(G,'Scalar and vector products',HL,a,'Vectors',calculator='required')
a=[]
for k in range(1,9):
 a.append(q('A line has '+m(r'\mathbf r=\begin{pmatrix}1\\2\\3\end{pmatrix}+t\begin{pmatrix}1\\-1\\2\end{pmatrix}')+'. Find its intersection with '+m(f'x+y+z={6+2*k}')+'.',m(f'({1+k},{2-k},{3+2*k})'),['Substitute x = 1 + t, y = 2 − t, z = 3 + 2t in the plane equation.',m(f'6+2t={6+2*k}\\implies t={k}')+'.','Substitute t into all three line components and check the plane.']))
add(G,'Vector lines and planes',['aa-hl'],a,'Vectors')
a=[]
for k in range(1,9):
 a.append(q(f'Sites A = (0, 0) and B = ({2*k}, 0) have equal service capacity. Find their Voronoi boundary. Which site serves P = ({k-1}, 2)?',f'x = {k}; site A.', ['Points on the boundary have equal distance from A and B.',m(f'x^2+y^2=(x-{2*k})^2+y^2')+f' simplifies to x = {k}.',f'P lies to the left of this boundary, so is closer to A.']))
add(G,'Voronoi boundaries and nearest sites',AI,a,'Voronoi & networks',stimulus='<p>A Voronoi boundary is the set of points equidistant from neighbouring sites. Use the coordinates in each question.</p>')
a=[]
for k in range(1,9):
 a.append(q('A point P = '+m(f'({k},2)')+' is rotated 90° anticlockwise about the origin, then stretched by factor 2 parallel to the x-axis. Find the combined matrix and image.',matrix([[0,-2],[1,0]])+'; '+m(f'(-4,{k})'),['The rotation matrix is '+matrix([[0,-1],[1,0]])+'.','Multiply stretch × rotation, since rotation acts first: '+matrix([[2,0],[0,1]])+matrix([[0,-1],[1,0]])+' = '+matrix([[0,-2],[1,0]])+'.','Apply this matrix to the column vector of P.']))
add(G,'Matrix transformations and composition',['ai-hl'],a,'Voronoi & networks')
a=[]
for n in range(1,9):
 a.append(q(f'A fractal starts with one segment of length 1. Each step replaces every segment with 4 segments of one third the length. After {n} steps, find the number of segments and total length.',m(4**n)+'; '+m(S.Rational(4,3)**n)+'.',[f'The segment count multiplies by 4 each step: '+m(f'4^{{{n}}}')+'.',f'Each segment has length '+m(f'3^{{-{n}}}')+'.','Multiply count by individual length: '+m(f'(4/3)^{{{n}}}')+'.']))
add(G,'Fractals and scaling',['ai-hl'],a,'Voronoi & networks')
# One shared graph is used for each network sheet to preserve readable labels.
network=svg(line(60,90,210,25)+line(60,90,210,150)+line(210,25,210,150)+line(210,25,370,90)+line(210,150,370,90)+tx(40,96,'A')+tx(205,18,'B')+tx(205,174,'C')+tx(380,96,'D')+tx(120,45,'2')+tx(120,135,'5')+tx(218,90,'1')+tx(295,45,'6')+tx(295,140,'3'))
add(G,'Graphs, adjacency matrices and walks',['ai-hl'],[
 q('State the degrees of A, B, C and D.','2, 3, 3, 2.',['Count the edges meeting each vertex.','Ignore edge weights when finding degree.'],2),
 q('Write the unweighted adjacency matrix in order A, B, C, D.',matrix([[0,1,1,0],[1,0,1,1],[1,1,0,1],[0,1,1,0]]),['Use a 1 where two vertices share an edge and 0 otherwise.','The diagonal is zero because there are no loops.'],2),
 q('How many walks of length 2 go from A to D?','2: A–B–D and A–C–D.',['A two-edge walk needs one intermediate vertex.','The common neighbours of A and D are B and C.'],2),
 q('Does the graph have an Euler circuit? Explain.','No.',['An Euler circuit requires all vertex degrees to be even.','B and C have odd degree.'],2),
 q('Give an Euler trail from B to C.','B–A–C–D–B–C.',['B and C are the two odd vertices.','The trail uses every edge exactly once.'],2),
 q('Give a Hamiltonian cycle starting at A.','A–B–D–C–A.',['Visit every vertex once before returning to A.','All four required edges exist.'],2),
 q('Why is the adjacency matrix symmetric?','The graph is undirected.',['Every edge from one vertex to another can be traversed either way.','Thus the entry at (i, j) equals that at (j, i).'],2),
 q('State the number of edges and verify the handshaking lemma.','5 edges; degree sum 10 = 2 × 5.',['Add the degrees: 2 + 3 + 3 + 2 = 10.','Every edge contributes to two vertex degrees.'],2)],'Voronoi & networks',stimulus='<p>Use this undirected network. The numbers on edges are weights.</p>'+network)
add(G,'Shortest paths and spanning trees',['ai-hl'],[
 q('Use Dijkstra’s algorithm to find the shortest distance from A to D.','6 via A–B–C–D.',['Start A = 0; tentative B = 2, C = 5.','Fix B = 2, update C = 3 and D = 8.','Fix C = 3, update D = 6; then fix D.']),
 q('Find the shortest distance from B to D.','4 via B–C–D.',['Direct edge BD has weight 6.','Via C gives 1 + 3 = 4.','No other path is shorter.']),
 q('Find a minimum spanning tree by Kruskal’s algorithm.','BC, AB, CD; total weight 6.',['Sort edges by weight: 1, 2, 3, 5, 6.','Accept BC, AB and CD; these connect all vertices without a cycle.','Sum 1 + 2 + 3 = 6.']),
 q('Find a minimum spanning tree by Prim’s algorithm starting at D.','DC, CB, BA; total weight 6.',['Choose DC = 3.','From {D,C}, choose CB = 1.','From {D,C,B}, choose BA = 2.']),
 q('Why does a spanning tree here have 3 edges?','A tree on 4 vertices has 4 − 1 = 3 edges.',['It must connect all four vertices.','Adding any further edge creates a cycle.'],2),
 q('If AB increases from 2 to 4, find the new shortest distance A to D.','8 via A–B–C–D or A–C–D.',['A–B–C–D now has weight 4 + 1 + 3 = 8.','A–C–D has weight 5 + 3 = 8.','The other route A–B–D has weight 10.']),
 q('If BD decreases to 1, find a minimum spanning tree and its weight.','AB, BC, BD; weight 4.',['Choose BC = 1 and BD = 1.','Connect A using AB = 2.','The three edges form a tree, total 4.']),
 q('Can Dijkstra’s algorithm be relied on with negative edge weights?','No.',['Its fixed-distance argument assumes nonnegative edge weights.','With negative weights an already fixed distance could later decrease.'],2)],'Voronoi & networks',stimulus='<p>Use this undirected network. All original edge weights are positive.</p>'+network)
# Statistics: sample analysis, probability and distributions across all courses.
reuse(P,'Sampling and study design',ALL,'a','S1.1b','Data & regression')
reuse(P,'Summary statistics',ALL,'a','S2.3a','Data & regression','required')
reuse(P,'Box plots and outliers',ALL,'a','S2.1b','Data & regression')
reuse(P,'Cumulative frequency diagrams',ALL,'a','S2.1c','Data & regression')
reuse(P,'Histograms and frequency polygons',ALL,'a','S2.1a','Data & regression')
reuse(P,'Linear correlation and regression interpretation',ALL,'a','S2.2','Data & regression','required')
a=[]
xs=[1,2,3,4,5,6];ys=[3,5,4,8,7,9];meanx=statistics.mean(xs);meany=statistics.mean(ys);slope=sum((u-meanx)*(v-meany) for u,v in zip(xs,ys))/sum((u-meanx)**2 for u in xs);intercept=meany-slope*meanx;r=sum((u-meanx)*(v-meany) for u,v in zip(xs,ys))/math.sqrt(sum((u-meanx)**2 for u in xs)*sum((v-meany)**2 for v in ys))
add(P,'Calculating a regression model',ALL,[
 q('Find the mean of x and the mean of y.',f'{meanx}; {meany}.',['Add each variable’s six values separately.','Divide each total by 6.'],2),
 q('Use technology to find Pearson’s r (3 d.p.).',f'{r:.3f}.',['Enter the paired observations in two lists.','Use the calculator’s linear correlation calculation.','The positive value indicates a strong positive linear association.']),
 q('Find the regression line of y on x (3 d.p.).',m(f'y={slope:.3f}x+{intercept:.3f}'),['Use paired-list linear regression, with x as explanatory variable.',f'The slope is {slope:.3f} and intercept {intercept:.3f}.','Retain unrounded coefficients for later predictions.']),
 q('Predict y when x = 3.5 (3 s.f.).',f'{slope*3.5+intercept:.3g}.',['Substitute x = 3.5 in the fitted line.','This prediction is interpolation.'],2),
 q('Interpret the slope in this context.',f'One extra hour of study is associated with about {slope:.3g} more test points.',['Read the units from the table.','Use association language; these data do not establish a causal effect.'],2),
 q('Explain a concern about predicting for x = 20.','This extrapolates far outside the observed 1–6 hour range.',['The same linear pattern may not continue.','A prediction at 20 hours is not well supported by these data.'],2),
 q('Find the residual for the observation (4, 8) (3 s.f.).',f'{8-(slope*4+intercept):.3g}.',['Residual = observed y − predicted y.',f'Use 8 − ({slope:.6f} × 4 + {intercept:.6f}).'],2),
 q('Does a positive correlation prove that study time causes higher scores? Explain.','No. Other variables may influence both.',['Correlation measures association.','Prior knowledge, attendance and other confounders could explain some of the pattern.'],2)],'Data & regression',stimulus='<p>Six pupils report study hours x and test points y: (1,3), (2,5), (3,4), (4,8), (5,7), (6,9). Treat these as paired data.</p>',calculator='required')
reuse(P,'Independent and mutually exclusive events',ALL,'a','S3.1','Probability')
reuse(P,'Venn diagrams and two-way tables',ALL,'a','S3.2b','Probability')
reuse(P,'Conditional probability and trees',AAI,'a','S3.2a','Probability')
a=[]
for p in [S.Rational(k,10) for k in range(1,9)]:
 ex=3*p+(-1)*(1-p)
 a.append(q('A game pays a net gain of 3 with probability '+m(p)+' and a net loss of 1 otherwise. Find the expected net gain. Is it fair?',m(ex)+'; '+('fair.' if ex==0 else 'not fair.'),[m(r'E(X)=\sum xP(X=x)')+'.',m(f'E(X)=3({S.latex(p)})-1(1-{S.latex(p)})={S.latex(ex)}')+'.','A fair game has expected net gain zero.']))
add(P,'Discrete random variables and expectation',ALL,a,'Distributions')
reuse(P,'Binomial probabilities',ALL,'a','S4.1b','Distributions','required')
reuse(P,'Normal probabilities',ALL,'a','S4.2a','Distributions','required')
reuse(P,'Inverse normal and unknown parameters',AAI,'a','S4.2b','Distributions','required')
a=[]
for k in range(1,9):
 a.append(q(f'For X taking values 0, {k}, {2*k} with probabilities 0.2, 0.5, 0.3, find E(X) and Var(X).',m(S.Rational(11,10)*k)+'; '+m(S.Rational(49,100)*k*k),[m(f'E(X)=0(0.2)+{k}(0.5)+{2*k}(0.3)={1.1*k:g}')+'.',m(f'E(X^2)={k*k}(0.5)+{4*k*k}(0.3)={1.7*k*k:g}')+'.',m(r'\mathrm{Var}(X)=E(X^2)-[E(X)]^2')+' = '+m(S.Rational(49,100)*k*k)+'.']))
add(P,'Discrete variance',HL,a,'Distributions')
a=[]
for k in range(1,9):
 prob=S.Rational(k,10);sensitivity=S.Rational(9,10);falsepos=S.Rational(1,10);post=prob*sensitivity/(prob*sensitivity+(1-prob)*falsepos)
 a.append(q(f'A condition affects {10*k}% of a population. A test is positive for 90% with the condition and 10% without it. Find P(condition | positive).',m(post),['Split positive results into true positives and false positives.',m(f'P(+)=({S.latex(prob)})(0.9)+(1-{S.latex(prob)})(0.1)')+'.',m(r'P(D\mid+)=\frac{P(D)P(+\mid D)}{P(+)}')+' = '+m(post)+'.']))
add(P,'Bayes’ theorem',HL,a,'Probability')
a=[]
for k in range(1,9):
 b=k+1;constant=S.Rational(2,b*b);mean=S.Rational(2*b,3);var=S.Rational(b*b,18);ck('pdf normalization',S.integrate(constant*x,(x,0,b)),1)
 a.append(q('A continuous variable has density '+m(f'f(x)=cx,\\quad 0\\leq x\\leq {b}')+' (zero otherwise). Find c, E(X) and Var(X).',m(constant)+'; '+m(mean)+'; '+m(var),[m(f'1=\\int_0^{b}cx\\,dx=c\\frac{{{b*b}}}2')+'.',m(f'E(X)=\\int_0^{b}x({S.latex(constant)}x)\\,dx={S.latex(mean)}')+'.',m(f'E(X^2)=\\frac{{{b*b}}}2')+'; subtract the square of E(X) to obtain '+m(var)+'.'],4))
add(P,'Continuous probability density functions',['aa-hl'],a,'Distributions')
a=[]
for k in range(1,9):
 ys=[2,1,4,3,6,5,8,7];n=8;d2=sum((i+1-v)**2 for i,v in enumerate(ys));rs=1-6*d2/(n*(n*n-1));ys=ys[k-1:]+ys[:k-1];d2=sum((i+1-v)**2 for i,v in enumerate(ys));rs=1-6*d2/(n*(n*n-1))
 a.append(q('The x-ranks are 1,2,3,4,5,6,7,8; corresponding y-ranks are '+','.join(map(str,ys))+'. Use technology to find Spearman’s rank correlation (3 d.p.).',f'{rs:.3f}.',['Enter the two rank lists in paired order.','Use Pearson correlation on these rank lists (equivalent to Spearman correlation here).',f'A hand check without ties gives Σd² = {d2} and '+m(r'r_s=1-\frac{6\sum d^2}{n(n^2-1)}')+f' = {rs:.3f}.']))
add(P,'Spearman’s rank correlation',AI,a,'Inference',calculator='required')
import mpmath as mp
# Test statistics and p-values are computed from the given observations.
a=[]
for k in range(1,9):
 obs=[[20+k,20-k,20],[20-k,20+k,20]];expected=20;chi=sum((v-expected)**2/expected for row in obs for v in row);pval=float(mp.gammainc(1,chi/2,mp.inf)/mp.gamma(1));reject=pval<.05
 a.append(q('A 2 × 3 table has rows '+str(obs[0])+' and '+str(obs[1])+'. Test independence at 5%, stating expected frequencies, degrees of freedom and conclusion.',f'Expected entries 20; df = 2; χ² = {chi:.4g}; p = {pval:.4g}. '+('Reject independence.' if reject else 'Do not reject independence.'),['H₀: the two categorical variables are independent. H₁: they are associated.', 'Row totals are 60; column totals are 40; N = 120. Each expected entry = 60 × 40 / 120 = 20.',m(r'\chi^2=\sum\frac{(O-E)^2}{E}')+f' = {chi:.4g}; df = (2 − 1)(3 − 1) = 2.',f'Use the upper-tail p-value {pval:.4g}; '+('it is below 0.05, so reject H₀.' if reject else 'it exceeds 0.05, so evidence is insufficient to reject H₀.')],4))
add(P,'Chi-squared tests of independence',AI,a,'Inference',calculator='required')
a=[]
for k in range(1,9):
 obs=[20+k,20-k,20,20];chi=sum((v-20)**2/20 for v in obs);pval=float(mp.gammainc(1.5,chi/2,mp.inf)/mp.gamma(1.5))
 a.append(q('A four-colour spinner gives counts '+str(obs)+'. Test at 5% whether its colours are equally likely.',f'χ² = {chi:.4g}; df = 3; p = {pval:.4g}. '+('Reject equal probabilities.' if pval<.05 else 'Do not reject equal probabilities.'),['H₀: each colour has probability 0.25. H₁: at least one probability differs.', 'Expected frequency = 80 / 4 = 20 for each colour; df = 4 − 1 = 3.',m(r'\chi^2=\sum (O-E)^2/E')+f' = {chi:.4g}.',f'Compare p = {pval:.4g} with 0.05 to reach the stated conclusion.'],4))
add(P,'Chi-squared goodness of fit',AI,a,'Inference',calculator='required')
def tcdf(v,df):
 z=mp.betainc(df/2,.5,0,df/(df+v*v),regularized=True)/2
 return float(1-z if v>=0 else z)
a=[]
for k in range(1,9):
 ma=20+k/2;mb=20;n1=12;n2=15;s1=3;s2=4;se=math.sqrt(s1*s1/n1+s2*s2/n2);stat=(ma-mb)/se;df=(s1*s1/n1+s2*s2/n2)**2/((s1*s1/n1)**2/(n1-1)+(s2*s2/n2)**2/(n2-1));pval=2*(1-tcdf(stat,df))
 a.append(q(f'Independent normal samples have (n, mean, sample SD) A = (12, {ma:g}, 3), B = (15, 20, 4). Use an unpooled two-sample t-test at 5% for a difference in means.',f't = {stat:.4g}; df ≈ {df:.4g}; p = {pval:.4g}. '+('Reject equal means.' if pval<.05 else 'Do not reject equal means.'),['H₀: μA = μB. H₁: μA ≠ μB. Assume independent random samples from normal populations.',m(r't=\frac{\bar x_A-\bar x_B}{\sqrt{s_A^2/n_A+s_B^2/n_B}}')+f' = {stat:.4g}.','Use the unpooled (Welch) calculator setting, with two-sided alternative.',f'p = {pval:.4g}; compare with 0.05. '+('There is evidence of different population means.' if pval<.05 else 'There is insufficient evidence of different population means.')],4))
add(P,'Two-sample t-tests',AI,a,'Inference',calculator='required')
a=[]
nd=statistics.NormalDist()
for k in range(1,9):
 mu=20+k;sd=6;n=36;low=mu-1;high=mu+1;prob=nd.cdf(1)-nd.cdf(-1)
 a.append(q(f'A population has mean {mu} and SD 6. For independent samples of size 36, give the approximate distribution of the sample mean and find P({low} < mean < {high}) (3 s.f.).',m(f'\\bar X\\approx N({mu},1)')+f'; {prob:.3g}.',['By the central limit theorem, the sample mean is approximately normal (provided the population is not extremely skewed).',m(r'\mathrm{SD}(\bar X)=\frac{6}{\sqrt{36}}=1')+'.','Standardise the bounds to −1 and 1; use the normal CDF.']))
add(P,'Sampling distributions and the central limit theorem',['ai-hl'],a,'Inference',calculator='required')
a=[]
for k in range(1,9):
 mean=50+k;n=25;sd=10;margin=nd.inv_cdf(.975)*sd/math.sqrt(n)
 a.append(q(f'A normal population has known SD 10. A random sample of 25 has mean {mean}. Find a 95% confidence interval for its population mean (2 d.p.) and interpret it.',f'({mean-margin:.2f}, {mean+margin:.2f}).',['Use a normal interval because population σ is known.',m(f'{mean}\\pm1.959963984\\frac{{10}}{{\\sqrt{{25}}}}')+'.',f'In repeated sampling, about 95% of intervals constructed this way contain the fixed population mean.']))
add(P,'Confidence intervals for a population mean',['ai-hl'],a,'Inference',calculator='required')
reuse(P,'Normal mean tests with known variance',['ai-hl'],'a','S5.3','Inference','required')
reuse(P,'One-tailed binomial hypothesis tests',['ai-hl'],'a','S5.2a','Inference','required')
a=[]
for k in range(1,9):
 mean=10+k/2;sdev=2;n=16;stat=(mean-10)/(sdev/math.sqrt(n));pval=1-tcdf(stat,15)
 a.append(q(f'A normal population has unknown variance. A random sample has n = 16, mean = {mean:g}, sample SD = 2. Test H₀: μ = 10 against H₁: μ > 10 at 5%.',f't = {stat:g}, df = 15, p = {pval:.4g}. '+('Reject H₀.' if pval<.05 else 'Do not reject H₀.'),['The population SD is unknown, so use a one-sample t-test.',m(f't=\\frac{{{mean:g}-10}}{{2/\\sqrt{{16}}}}={stat:g}')+'; df = 16 − 1 = 15.',f'Use the upper tail: p = {pval:.4g}. Compare with 0.05.'],3))
add(P,'One-sample t-tests',['ai-hl'],a,'Inference',calculator='required')
a=[]
for rate in range(1,9):
 exact=math.exp(-rate)*rate**2/2;tail=1-sum(math.exp(-rate)*rate**j/math.factorial(j) for j in range(3))
 a.append(q(f'Calls arrive independently at a constant mean rate of {rate} per hour. Find P(exactly 2 calls) and P(more than 2 calls) in an hour (3 s.f.).',f'{exact:.3g}; {tail:.3g}.',[f'Use X ~ Poisson({rate}); independent events and a constant average rate support the model.',m(f'P(X=2)=e^{{-{rate}}}\\frac{{{rate}^2}}{{2!}}')+f' = {exact:.3g}.',m(r'P(X>2)=1-P(X\leq2)')+f' = {tail:.3g}.']))
add(P,'Poisson models and probabilities',['ai-hl'],a,'Distributions',calculator='required')
a=[]
for rate in range(1,9):
 count=rate+5;pval=1-sum(math.exp(-rate)*rate**j/math.factorial(j) for j in range(count))
 a.append(q(f'Under H₀ a daily count is Poisson({rate}). The observed count is {count}. Test at 5% against an increased rate.',f'p = {pval:.4g}. '+('Reject H₀.' if pval<.05 else 'Do not reject H₀.'),[f'H₀: λ = {rate}; H₁: λ > {rate}.',m(f'p=P(X\\geq{count})=1-P(X\\leq{count-1})')+'.',f'Using the Poisson CDF gives {pval:.4g}; compare with 0.05.']))
add(P,'Poisson hypothesis tests',['ai-hl'],a,'Inference',calculator='required')
a=[]
for cutoff in range(1,9):
 alpha=1-nd.cdf(cutoff/2);beta=nd.cdf((cutoff-4)/2)
 a.append(q(f'A single observation X is normal with SD 2. Test H₀: μ = 0 against μ > 0, rejecting when X > {cutoff}. Find α and the Type II error probability when μ = 4 (3 s.f.).',f'α = {alpha:.3g}; β = {beta:.3g}.',['Type I error is rejecting H₀ when it is true.',m(f'\\alpha=P_{{\\mu=0}}(X>{cutoff})')+f' = {alpha:.3g}.','Type II error is not rejecting when μ = 4: '+m(f'\\beta=P_{{\\mu=4}}(X\\leq{cutoff})')+f' = {beta:.3g}.']))
add(P,'Type I and Type II errors',['ai-hl'],a,'Inference',calculator='required')
a=[]
T=S.Matrix([[S.Rational(4,5),S.Rational(3,10)],[S.Rational(1,5),S.Rational(7,10)]])
for k in range(1,9):
 state=S.Matrix([S.Rational(k,10),1-S.Rational(k,10)]);nextstate=T*state;ck('Markov normalization',sum(nextstate),1)
 a.append(q('A column-state Markov model has T = '+matrix(T)+' and initial state '+matrix(state)+'. Find the next state and the long-run state.',matrix(nextstate)+'; '+matrix([S.Rational(3,5),S.Rational(2,5)]),['Columns sum to 1; entry (i,j) is the probability of moving from j to i.', 'The next state is T times the initial column: '+matrix(nextstate)+'.','For steady state let p + q = 1 and p = 0.8p + 0.3q. Thus 0.2p = 0.3q, so p = 0.6 and q = 0.4.'],4))
add(P,'Transition matrices and Markov chains',['ai-hl'],a,'Inference')
# Calculus: AI SL integer-power techniques are separated from AA and HL.
reuse(C,'Limits from tables',ALL,'p','1.4','Differentiation')
reuse(C,'Derivative meaning and gradient graphs',ALL,'a','P7.1a','Differentiation')
a=[]
for k in range(1,9):
 expr=k*x**3-2*x**2+5*x-k;der=S.diff(expr,x);ck('polynomial derivative',S.integrate(der,x).diff(x),der)
 a.append(q('Differentiate '+m(f'f(x)={S.latex(expr)}')+' and find f′(2).',m(der)+'; '+m(der.subs(x,2)),['Apply '+m(r'\frac{d}{dx}(ax^n)=anx^{n-1}')+' to each term.',m(f"f'(x)={S.latex(der)}")+'.','Substitute x = 2 to obtain '+m(der.subs(x,2))+'.']))
add(C,'Integer-power differentiation',ALL,a,'Differentiation',tool='differentiation-polynomials')
reuse(C,'Rational-power differentiation',AAI,'a','P7.2a','Differentiation')
reuse(C,'Tangents and normals',ALL,'a','P7.3a','Differentiation')
reuse(C,'Stationary points and curve behaviour',ALL,'a','P7.3b','Differentiation')
reuse(C,'Optimization in context',ALL,'a','P7.3c','Differentiation','required')
reuse(C,'General-base exponential and logarithmic derivatives',['aa-hl'],'a','P7.2b','Differentiation')
reuse(C,'Reciprocal-trig derivatives',['aa-hl'],'a','P7.2c','Differentiation')
reuse(C,'Product, quotient and chain rules',AAI,'a','P7.4a','Differentiation')
reuse(C,'Second derivatives and concavity',AAI,'a','P7.1d','Differentiation')
reuse(C,'Connected rates of change',HL,'a','P7.4b','Differentiation')
reuse(C,'Implicit differentiation',['aa-hl'],'a','P7.5a','Differentiation')
reuse(C,'Inverse-trigonometric differentiation',['aa-hl'],'p','3.4','Differentiation')
reuse(C,'L’Hôpital’s rule',['aa-hl'],'p','4.7','Differentiation')
a=[]
for k in range(1,9):
 expr=k*x**2+2*x-1;anti=S.integrate(expr,x);ck('antiderivative',S.diff(anti,x),expr)
 a.append(q('Find '+m(r'\int('+S.latex(expr)+r')\,dx')+'.',m(anti)+' + C.',['Increase each exponent by 1 and divide by the new exponent.',m(r'\int ax^n\,dx=\frac{ax^{n+1}}{n+1}+C\quad(n\ne-1)')+'.','Combine the terms and include the constant: '+m(anti)+' + C.']))
add(C,'Integer-power antiderivatives',ALL,a,'Integration',tool='integration')
reuse(C,'Rational-power integration',AAI,'a','P8.2a','Integration')
reuse(C,'Further standard integrals',['aa-hl'],'a','P8.2b','Integration')
reuse(C,'Definite integrals',ALL,'a','P8.3a','Integration')
reuse(C,'Area between curves',AAI,'a','P8.3b','Integration')
reuse(C,'Integration by substitution',['aa-hl'],'a','P8.5a','Integration')
reuse(C,'Integration by parts',['aa-hl'],'a','P8.5b','Integration')
a=[]
for k in range(1,9):
 expr=S.Rational(k,1)/(x+1)+S.Rational(2,1)/(x+2);expanded=S.factor(expr);anti=k*S.log(x+1)+2*S.log(x+2);ck('partial fractions integral',S.diff(anti,x),expanded)
 a.append(q('Decompose '+m(expanded)+' into partial fractions and integrate on x > 0.',m(anti)+' + C.',['Write '+m(r'\frac{A}{x+1}+\frac{B}{x+2}')+' and compare numerators.',f'Substitute x = −1 and x = −2 to find A = {k}, B = 2.',m(r'\int\frac{1}{x+a}\,dx=\ln|x+a|+C')+'; x > 0 removes the absolute values.'],4))
add(C,'Distinct-linear partial fractions and integration',['aa-hl'],a,'Integration')
reuse(C,'Volumes of revolution about coordinate axes',HL,'p','8.9','Integration')
reuse(C,'Trapezoidal rule',AI,'a','P9.4','Integration','required')
reuse(C,'Kinematics with variable acceleration',AAI,'a','M7.4a','Integration')
reuse(C,'Separable differential equations',HL,'a','P8.7','Differential equations & series')
reuse(C,'Differential-equation modelling',HL,'a','P8.8','Differential equations & series')
reuse(C,'Slope fields',HL,'p','7.3','Differential equations & series')
reuse(C,'Euler’s method',HL,'p','7.5','Differential equations & series','required')
a=[]
for k in range(1,9):
 # Linear first-order integrating-factor family, with a simple exact solution.
 a.append(q('Solve '+m(f'\\frac{{dy}}{{dx}}+y={k}e^x')+' with y(0) = 1.',m(f'y=\\frac{{{k}}}2 e^x+\\left(1-\\frac{{{k}}}2\\right)e^{{-x}}'),['An integrating factor is '+m('e^{\\int1\\,dx}=e^x')+'.',m(f'\\frac{{d}}{{dx}}(ye^x)={k}e^{{2x}}')+'; integrate to give '+m(f'ye^x=\\frac{{{k}}}2e^{{2x}}+C')+'.','Use y(0) = 1, so C = 1 − '+str(k)+'/2. Divide by eˣ.'],4))
add(C,'Linear differential equations and integrating factors',['aa-hl'],a,'Differential equations & series')
a=[]
for k in range(1,9):
 a.append(q('Find the Maclaurin polynomial through degree 3 for '+m(f'e^{{{k}x}}')+'.',m(1+k*x+S.Rational(k*k,2)*x*x+S.Rational(k**3,6)*x**3),[m(r'f(x)=f(0)+f\prime(0)x+\frac{f\prime\prime(0)}{2!}x^2+\frac{f^{(3)}(0)}{3!}x^3+\cdots')+'.',f'The first four derivatives at 0 are 1, {k}, {k*k}, {k**3}.','Substitute and simplify the coefficients.']))
add(C,'Maclaurin expansions',['aa-hl'],a,'Differential equations & series')
a=[]
for k in range(1,9):
 a.append(q('For '+m(f'\\dot x={k}x,\\quad\\dot y=-y')+' with (x(0), y(0)) = (1, 2), find the exact solution and classify the equilibrium at (0,0).',m(f'x=e^{{{k}t}},\\quad y=2e^{{-t}}')+'; saddle.',['Each equation separates independently.',m(f'\\frac{{dx}}{{x}}={k}\\,dt,\\quad\\frac{{dy}}{{y}}=-dt')+'; integrate and use the initial conditions.',f'The eigenvalues are {k} and −1, with opposite signs. The origin is a saddle, unstable overall.'],4))
add(C,'Coupled systems and phase portraits',['ai-hl'],a,'Differential equations & series')
a=[]
for k in range(1,9):
 h=S.Rational(1,10);u=S.Rational(k);v=S.Rational(2);newu=u+h*(u-v);newv=v+h*(u+v)
 a.append(q('Use one simultaneous Euler step of h = 0.1 for '+m(r'\dot x=x-y,\quad\dot y=x+y')+f', starting at (x, y) = ({k}, 2).',m(f'(x_1,y_1)=({S.latex(newu)},{S.latex(newv)})'),[f'Evaluate both slopes at the old state ({k}, 2): '+m(f'\\dot x={k-2},\\quad\\dot y={k+2}')+'.',m(f'x_1={k}+0.1({k-2})={S.latex(newu)}')+'.',m(f'y_1=2+0.1({k+2})={S.latex(newv)}')+'. Do not use the updated x in the y update.']))
add(C,'Euler’s method for coupled systems',['ai-hl'],a,'Differential equations & series')
a=[]
for k in range(1,9):
 a.append(q('Solve '+m(f'\\ddot x+{k*k}x=0')+' with x(0) = 2 and '+m(r'\dot x(0)=0')+'.',m(f'x=2\\cos({k}t)'),['Write the general solution '+m(f'x=A\\cos({k}t)+B\\sin({k}t)')+'.','At t = 0, x = A = 2. Differentiate to obtain '+m(f'\\dot x=-{k}A\\sin({k}t)+{k}B\\cos({k}t)')+'.','The initial velocity is zero, so B = 0. Substitute to check the differential equation.'],4))
add(C,'Second-order differential equations',['ai-hl'],a,'Differential equations & series')
exec(compile((Path(__file__).parent/'additional.py').read_text(),'additional.py','exec'))
# Normalise reused notation without altering published source banks.
def fix(v,normalise=True):
 if isinstance(v,str):
  if normalise:v=re.sub(r'\\{2}(?=[A-Za-z])',lambda _:chr(92),v)
  v=v.replace(r'\cosec',r'\operatorname{cosec}')
  return re.sub(r'(?<!\$)\$([^$\n]+)\$(?!\$)',lambda z:r'\('+z[1]+r'\)',v)
 if isinstance(v,list):return [fix(z,normalise) for z in v]
 if isinstance(v,dict):return {k:fix(z,False if v.get('origin')=='authored-ib' else normalise) for k,z in v.items()}
 return v
library={'qualification':'IB Mathematics topic practice','syllabus':'First assessment 2021 · exams through 2028','revision':'2026-11-18','courses':{'aa-sl':'AA SL','aa-hl':'AA HL','ai-sl':'AI SL','ai-hl':'AI HL'},'packs':fix(packs)}
(D/'library.json').write_text(json.dumps(library,indent=2,ensure_ascii=False)+'\n')
(D/'maths-checks.json').write_text(json.dumps({'checks':checks,'limitations':'Selected algebraic families checked symbolically; not an independent verification of every answer.'},indent=2)+'\n')
print(json.dumps({'packs':len(packs),'questions':len(packs)*8,'courses':{c:sum(c in p['courses'] for p in packs) for c in ALL},'symbolicChecks':len(checks)}))
