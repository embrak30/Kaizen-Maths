"""Original Kaizen U.S. precalculus collection; reuse our own topic banks, not source-book questions."""
from pathlib import Path
from copy import deepcopy
import json,re,sys,os
sys.path.insert(0,os.environ.get('KAIZEN_PRECALC_PYTHON_MODULES','/tmp/kaizen-precalc-python'))
import sympy as S
ROOT=Path(__file__).resolve().parents[2];D=ROOT/'data/precalculus';D.mkdir(parents=True,exist_ok=True)
A={p['id']:p for p in json.loads((ROOT/'data/alevel-maths/edexcel-9ma0/library.json').read_text())['packs']};I={p['id']:p for p in json.loads((ROOT/'data/ib-maths/library.json').read_text())['packs']};packs=[]
x,y=S.symbols('x y',real=True)
def m(v):return r'\('+(v if isinstance(v,str) else S.latex(v))+r'\)'
def point(a,b):return m(r'('+S.latex(S.sympify(a))+','+S.latex(S.sympify(b))+')')
def question(prompt,answer,steps,points=3,claims=()):
 checks=[{'left':str(a),'right':str(b)} for a,b in claims]
 for c in checks:assert S.simplify(S.sympify(c['left'])-S.sympify(c['right']))==0,c
 return {'question':prompt,'questionText':prompt,'answer':answer,'steps':steps,'marks':points,'criteria':(['Independent credit: Correct answer [1].'] if points==1 else ['Method: Correct setup or mathematical approach [1].']+(['Method: Correct intermediate work [1].'] if points==3 else [])+['Accuracy: Correct final results and requested interpretation [1].']),'origin':'authored-us-precalculus','checks':checks}
def american(v):
 if isinstance(v,str):
  v=re.sub(r'£([\d,.]+)',r'\1 dollars',v)
  for a,b in [('anticlockwise','counterclockwise'),('rationalisation','rationalization'),('rationalise','rationalize'),('Rationalise','Rationalize'),('sine rule','law of sines'),('cosine rule','law of cosines'),('factorised','factored'),('factorise','factor'),('Factorise','Factor'),('factorisation','factorization'),('modulus','absolute value'),('gradient','slope'),('centre','center'),('metres','meters'),('litres','liters'),('theatre','theater'),('nearest penny','nearest cent'),('modelling','modeling'),('modelled','modeled'),('\\operatorname{cosec}','\\csc ')]:v=v.replace(a,b)
  return v
 if isinstance(v,list):return [american(a) for a in v]
 if isinstance(v,dict):return {k:(a if k in ['tools','sourceTool','provenance'] else american(a)) for k,a in v.items()}
 return v
def add(id,area,title,questions,tools,provenance=None):
 assert len(questions)==8,(id,len(questions));qs=deepcopy(questions)
 for n,q in enumerate(qs,1):
  q.pop('raw',None);q.pop('print',None);q['number']=n;q.setdefault('questionText',q['question']);q['criteria']=[s.replace('M1:','Method:').replace('A1:','Accuracy:').replace('B1:','Independent credit:') for s in q['criteria']]
 packs.append(american({'id':id,'area':area,'title':title,'sourceTool':'limits-first-principles','tools':tools,'provenance':provenance or {'kind':'original-kaizen-precalculus'},'instructions':'Answer on separate paper. Show your reasoning. Give exact answers unless rounding is requested. Angles are in radians unless degrees are stated.','questions':qs}))
def reuse(id,area,title,key,bank=A,tools=None):
 p=bank[key];add(id,area,title,p['questions'],tools if tools is not None else p.get('tools',[]),{'kind':'adapted-kaizen-bank','library':'alevel-9ma0' if bank is A else 'ib-maths','topic':key});packs[-1]['sourceTool']=p['sourceTool']
def mix(id,area,title,sources,tools):
 qs=[];pro=[]
 for bank,key,indices in sources:
  for i in indices:
   q=deepcopy(bank[key]['questions'][i-1]);q['sourceTopic']=key;q['sourceQuestion']=i;qs.append(q)
  pro.append({'topic':key,'questions':indices})
 add(id,area,title,qs,tools,{'kind':'selected-kaizen-topics','sources':pro})
# Functions: domains, multiple representations and average rate of change.
area='Functions & Graphs';qs=[]
for k in [1,2,-3,0]:
 f=S.sqrt(x-k)+2;qs.append(question('For '+m('f(x)='+S.latex(f))+', state its real domain and range, and find '+m(f'f({k+9})')+'.','Domain: '+m(f'x\\ge {k}')+'; range: '+m('y\\ge2')+'; '+m(f'f({k+9})=5')+'.',['Require '+m(S.latex(x-k)+r'\ge0')+'.','A square root is nonnegative, so adding 2 gives '+m('y\\ge2')+'.',m(f'f({k+9})=\\sqrt9+2=5')],3,[(f.subs(x,k+9),5)]))
qs += [question('State the domain and range of '+m(r'f(x)=\frac3{x-2}')+'.','Domain: '+m(r'x\ne2')+'; range: '+m(r'y\ne0')+'.',['The denominator must not be zero.','The numerator is nonzero, so the output cannot be zero. For any nonzero y, '+m(r'x=2+\frac3y')+' gives that output.']),question('For '+m('f(x)=|x-3|+1')+', state its domain and range and find '+m('f(-1)')+'.','Domain: all real numbers; range: '+m('y\\ge1')+'; '+m('f(-1)=5')+'.',['The absolute value accepts every real input and is at least zero.',m('|-1-3|+1=4+1=5')],3,[(abs(-1-3)+1,5)]),question('State the real domain and range of '+m(r'f(x)=\sqrt{9-x^2}')+'.','Domain: '+m('-3\\le x\\le3')+'; range: '+m('0\\le y\\le3')+'.',[m('9-x^2\\ge0\\Longrightarrow x^2\\le9')+'.','The square root is at least 0 and at most 3.']),question('A ticket order costs '+m('C(n)=12+4n')+' dollars, where n is the number of tickets. State a suitable domain and find C(5).','Nonnegative integers '+m('n=0,1,2,\\ldots')+'; C(5) = 32 dollars.',['Tickets are counted in whole numbers.',m('12+4(5)=32')],2,[(12+4*5,32)])]
add('F01',area,'Function Notation, Domain and Range',qs,['functions'])
reuse('F02',area,'Linear Functions and Coordinates','P3.1')
mix('F03',area,'Quadratic Functions and Equations',[(A,'P2.3a',[1,2,3,4]),(A,'P2.3c',[5,6,7,8])],['quadratic-equations','graph-transformations-curve-sketching'])
qs=[
 question('Starting with '+m('f(x)=x^3')+', describe a transformation sequence giving '+m('g(x)=-(x+3)^3-2')+'. Sketch g.', 'Shift left 3, reflect in the x-axis, then shift down 2. The decreasing cubic passes through (-4,-1), (-3,-2) and (-2,-3).', ['Replace x by x + 3 for the horizontal shift.','The outside minus sign reflects outputs; subtracting 2 moves the result down.','Map the parent points (-1,-1), (0,0), (1,1) to the three transformed points and draw the cubic through them.'],3,[(-(-4+3)**3-2,-1),(-(-3+3)**3-2,-2),(-(-2+3)**3-2,-3)]),
 question('Describe how '+m('g(x)=2(x-1)^2+3')+' is obtained from '+m('f(x)=x^2')+'. State its vertex.', 'Right 1, vertical stretch by 2, then up 3; vertex (1,3).', ['The inside change gives the horizontal shift.','The factor 2 changes heights; adding 3 sets the minimum height.'],3,[(2*(1-1)**2+3,3)]),
 question('For '+m(r'g(x)=\sqrt{x+2}-1')+', describe the shifts from '+m(r'f(x)=\sqrt x')+' and give domain and range.', 'Left 2 and down 1; domain '+m(r'x\ge-2')+'; range '+m(r'y\ge-1')+'.', [m(r'x+2\ge0')+' gives the input restriction.','A square root is nonnegative before subtracting 1.'],3),
 question('Describe a transformation sequence from '+m('f(x)=x^3')+' to '+m('g(x)=-2(x+3)^3-3')+'.', 'Left 3, vertical stretch by 2, reflect in the x-axis, then down 3.', ['Transform the input first, then apply the output operations.'],3),
 question('Describe one transformation sequence from '+m('f(x)=|x|')+' to '+m('g(x)=|2(x-1)|+2')+'. State the vertex.', 'Compress horizontally by a factor of one half, shift right 1, then up 2; vertex (1,2).', ['Alternatively, use '+m('|2(x-1)|=2|x-1|')+' to describe a vertical stretch by 2.'],3),
 question('The point (2,3) lies on '+m('y=f(x)')+'. Find its image on '+m('y=f(-x)+4')+'.', point(-2,7), ['Reflect the x-coordinate in the y-axis, then add 4 to the y-coordinate.',m('(2,3)\\longmapsto(-2,3)\\longmapsto(-2,7)')],2,[(3+4,7)]),
 question('For '+m('g(x)=-(x-3)^2+3')+', describe its changes from '+m('f(x)=x^2')+' and state its maximum.', 'Right 3, reflect in the x-axis, then up 3; maximum 3 at x = 3.', ['The negative square is at most zero, so the largest output is 3.'],3,[(-(3-3)**2+3,3)]),
 question('Describe the shifts from '+m(r'f(x)=\frac1x')+' to '+m(r'g(x)=\frac1{x-2}+1')+'. Give both asymptotes.', 'Right 2 and up 1; vertical asymptote x = 2, horizontal asymptote y = 1.', ['The denominator vanishes at 2. The horizontal shift does not change the limiting reciprocal output of 0, and adding 1 moves the asymptote to y = 1.'],3)
]
add('F04',area,'Function Transformations',qs,['graph-transformations-curve-sketching','functions'])
reuse('F05',area,'Composition and Inverse Functions','P2.8')
qs=[]
for a,b,k in [(-2,1,3),(0,4,-2),(-3,-1,1),(1,5,0)]:
 f=x*x+k;rate=S.Rational(f.subs(x,b)-f.subs(x,a),b-a);qs.append(question('Find the average rate of change of '+m('f(x)='+S.latex(f))+' on '+m(f'[{a},{b}]')+'.',m(rate),[m(r'\text{Average rate}=\frac{f(b)-f(a)}{b-a}'),m(r'\frac{'+str(f.subs(x,b))+'-('+str(f.subs(x,a))+')}{'+str(b-a)+'}='+S.latex(rate))],2,[(rate,a+b)]))
qs.append(question('Let '+m(r'f(x)=\begin{cases}x+2&x<0\\2x-1&x\ge0\end{cases}')+'. Find f(-2), f(0) and f(3).',m('f(-2)=0,\\quad f(0)=-1,\\quad f(3)=5'),['Use the first rule for -2 and the second rule for 0 and 3.',m('-2+2=0,\\quad2(0)-1=-1,\\quad2(3)-1=5')],3,[(2*3-1,5)]))
qs.append(question('For the same piecewise rule '+m(r'f(x)=x+2\ (x<0),\quad f(x)=2x-1\ (x\ge0)')+', find the average rate on [-1,1]. Is f constant there?','Average rate 0; f is not constant.',[m(r'f(-1)=1,\quad f(1)=1,\quad\frac{1-1}{1-(-1)}=0'),m('f(0)=-1')+' differs from the endpoint values.'],3,[(S.Rational(1-1,2),0)]))
svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><rect width="320" height="180" fill="white"/><path d="M30 100H295M160 15V165" fill="none" stroke="#617687" stroke-width="1.5"/><polyline points="60,75 160,25 260,125" fill="none" stroke="#146d65" stroke-width="3"/>'+''.join(f'<circle cx="{px}" cy="{py}" r="3" fill="#146d65"/>' for px,py in [(60,75),(160,25),(260,125)])+''.join(f'<text x="{px}" y="116" font-size="13" font-family="Arial" text-anchor="middle" fill="#26344b">{t}</text>' for px,t in [(60,'-2'),(160,'0'),(260,'2')])+''.join(f'<text x="148" y="{py+4}" font-size="13" font-family="Arial" text-anchor="end" fill="#26344b">{t}</text>' for py,t in [(25,'3'),(75,'1'),(125,'-1')])+'<text x="296" y="94" font-size="13">x</text><text x="169" y="18" font-size="13">y</text></svg>'
qs.append(question('The graph joins (-2,1), (0,3) and (2,-1) with straight segments. Find f(0) and the average rate on [0,2].'+svg,'f(0) = 3; average rate = -2.',[m(r'\frac{f(2)-f(0)}{2-0}=\frac{-1-3}{2}=-2')],2,[(S.Rational(-1-3,2),-2)]))
qs.append(question('Use this table to find the average rate on [1,3]. Does a linear or an exponential model fit these data?<table><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>f(x)</th><td>2</td><td>4</td><td>8</td><td>16</td></tr></table>','Average rate = 6; an exponential model fits.',[m(r'\frac{16-4}{3-1}=6'),'Each output is twice the previous output; the differences are not constant.'],3,[(S.Rational(16-4,3-1),6)]))
add('F06',area,'Piecewise Functions and Average Rates',qs,['functions','straight-lines'])
reuse('F07',area,'Absolute Value Functions and Equations','P2.7b',tools=['absolute-values','functions'])
# Polynomial and rational functions.
area='Polynomial & Rational';reuse('P01',area,'Polynomial Division and Remainders','P2.6a');qs=[]
for a,r1,r2,mul in [(1,-2,1,2),(-1,-3,2,1),(2,0,3,3),(-2,-1,4,2),(3,-4,-1,1),(-3,1,2,3)]:
 f=a*(x-r1)*(x-r2)**mul;deg=mul+1;ends=('both ends up' if a>0 else 'both ends down') if deg%2==0 else ('left end down, right end up' if a>0 else 'left end up, right end down')
 qs.append(question('For '+m('f(x)='+S.latex(f))+', state each real zero and its multiplicity, and describe the end behavior.',f'{r1}: multiplicity 1; {r2}: multiplicity {mul}; {ends}.',[f'The factors give zeros {r1} and {r2}.',f'The degree is {deg} and the leading coefficient is {a}.'],3,[(f.subs(x,r1),0),(f.subs(x,r2),0)]))
qs += [question('Find a quadratic with zeros -1 and 2 and '+m('f(0)=-4')+'.',m('f(x)=2(x+1)(x-2)'),['Write '+m('f(x)=a(x+1)(x-2)')+'.',m('-4=-2a\\Longrightarrow a=2')],3,[(2*(0+1)*(0-2),-4)]),question('For '+m('f(x)=(x-1)^2(x+3)')+', identify where the graph crosses or touches the x-axis.','Touches at x = 1; crosses at x = -3.',['An even multiplicity gives no sign change at x = 1.','The simple zero at x = -3 changes the sign.'],2)]
add('P02',area,'Zeros, Multiplicity and End Behavior',qs,['roots-of-equations','graph-transformations-curve-sketching'])
reuse('P03',area,'Rational Expressions','P2.6b');qs=[]
for h,z,v in [(1,-2,3),(-1,2,4),(2,-3,-2),(-3,1,2),(4,-1,0),(0,2,-4)]:
 f=(x-h)*(x-z)/((x-h)*(x-v));hole=S.Rational(h-z,h-v);raw=r'\frac{'+S.latex((x-h)*(x-z))+'}{'+S.latex((x-h)*(x-v))+'}'
 qs.append(question('Find the excluded inputs, vertical and horizontal asymptotes, and hole of '+m('f(x)='+raw)+'.',f'Excluded: {h}, {v}; VA: x = {v}; HA: y = 1; hole '+point(h,hole)+'.',[m('f(x)='+S.latex((x-z)/(x-v)))+' on the original domain.','The canceled factor gives a hole; the remaining denominator gives the vertical asymptote.'],3,[(f.subs(x,h),hole)]))
qs += [question('Explain why '+m(r'f(x)=\frac{x^2-1}{x-1}')+' is not the whole line y = x + 1.','The original domain excludes x = 1, so the point (1,2) is missing.',[m(r'\frac{(x-1)(x+1)}{x-1}=x+1\quad(x\ne1)')],2),question('Find the horizontal asymptote of '+m(r'f(x)=\frac{2x^2+x}{x^2+1}')+' and determine whether the graph crosses it.','y = 2; it crosses at (2,2).',['The ratio of leading coefficients is 2.',m('2x^2+x=2(x^2+1)\\Longrightarrow x=2')],3,[(((2*x*x+x)/(x*x+1)).subs(x,2),2)])]
add('P04',area,'Rational Graphs, Holes and Asymptotes',qs,['graph-transformations-curve-sketching','functions']);reuse('P05',area,'Rational Inequalities and Regions','P2.5b')
qs=[]
for prompt,expr in [('Add '+m('(2+3i)+(4-5i)')+'.',(2+3*S.I)+(4-5*S.I)),('Multiply '+m('(3-2i)(1+4i)')+'.',(3-2*S.I)*(1+4*S.I)),('Write '+m(r'\frac{1+2i}{2-i}')+' in a + bi form.',(1+2*S.I)/(2-S.I))]:
 result=S.expand_complex(expr);qs.append(question(prompt,m(result),['Use '+m('i^2=-1')+' and combine real and imaginary parts.',m(S.latex(expr)+'='+S.latex(result))],2,[(expr,result)]))
qs += [question('Find the conjugate and absolute value of '+m('z=-3+4i')+'.',m(r'\overline z=-3-4i,\quad |z|=5'),['Reverse the sign of the imaginary part.',m(r'|z|=\sqrt{(-3)^2+4^2}=5')],2,[(S.sqrt(3**2+4**2),5)]),question('Solve '+m('z^2+4z+13=0')+' over the complex numbers.',m('z=-2\\pm3i'),[m('(z+2)^2=-9'),m('z+2=\\pm3i')],3,[((-2+3*S.I)**2+4*(-2+3*S.I)+13,0)]),question('Solve '+m('x^2+9=0')+' over the complex numbers.',m('x=\\pm3i'),[m('x^2=-9'),m('x=\\pm\\sqrt{-9}=\\pm3i')],2,[((3*S.I)**2+9,0)]),question('Write '+m(r'2(\cos\frac\pi3+i\sin\frac\pi3)')+' in a + bi form.',m('1+i\\sqrt3'),['Use the exact unit-circle values.',m(r'2(\frac12+i\frac{\sqrt3}2)=1+i\sqrt3')],2,[(2*(S.cos(S.pi/3)+S.I*S.sin(S.pi/3)),1+S.sqrt(3)*S.I)]),question('Let '+m(r'z=2(\cos\frac\pi6+i\sin\frac\pi6)')+' and '+m(r'w=3(\cos\frac\pi3+i\sin\frac\pi3)')+'. Find zw in rectangular form.',m('6i'),['Multiply the magnitudes and add the angles.',m(r'zw=6(\cos\frac\pi2+i\sin\frac\pi2)=6i')],3,[(2*3*(S.cos(S.pi/2)+S.I*S.sin(S.pi/2)),6*S.I)])]
add('P06',area,'Complex Numbers and Polynomial Roots',qs,['complex-numbers'])
mix('P07',area,'Rational Exponents and Radicals',[(A,'P2.1',[1,2,3,4]),(A,'P2.2',[5,6,7,8])],['exponents-index-notation','surds-radicals'])
reuse('P08',area,'Linear and Quadratic Inequalities','P2.5a',tools=['inequalities'])
area='Exponentials & Logarithms'
for id,title,key in [('E01','Exponential Graphs and Transformations','P6.1'),('E02','Logarithms as Inverse Functions','P6.3'),('E03','Logarithm Properties','P6.4'),('E04','Exponential and Logarithmic Equations','P6.5'),('E05','Growth, Decay and Half-Life','P6.7'),('E06','Logarithmic Plots and Models','P6.6')]:reuse(id,area,title,key,tools=['logarithms-practice','functions'])
area='Trigonometry'
for id,title,key in [('T01','Angles, Radians and Arc Length','P5.1c'),('T02','Unit Circle and Exact Values','P5.1a'),('T03','Trigonometric Graphs','P5.3'),('T04','Sinusoidal Models','P5.9'),('T05','Reciprocal and Inverse Trigonometry','P5.4'),('T06','Trigonometric Identities','P5.5')]:reuse(id,area,title,key,tools=['unit-circle-explainer','trigonometric-functions'] if id in ['T01','T02','T05'] else ['trig-graphs-transformations','trigonometric-functions'])
mix('T07',area,'Sum, Difference and Double-Angle Formulas',[(A,'P5.6a',[1,2,3,4]),(A,'P5.6b',[5,6,7,8])],['trigonometric-functions']);reuse('T08',area,'Trigonometric Equations','P5.7',tools=['trig-equation-solver','unit-circle-explainer']);reuse('T09',area,'Law of Sines and Cosines','P5.1b',tools=['sine-cosine-rule'])
area='Analytic Geometry';reuse('G01',area,'Circles in Coordinate Geometry','P3.2a');qs=[]
for h,k,p,horizontal in [(0,0,2,False),(1,-2,3,False),(-2,1,-2,False),(2,3,-1,False),(0,1,2,True),(-1,-2,-3,True)]:
 eq=(y-k)**2-4*p*(x-h) if horizontal else (x-h)**2-4*p*(y-k);focus=(h+p,k) if horizontal else (h,k+p);direct='x='+str(h-p) if horizontal else 'y='+str(k-p)
 qs.append(question('Find the vertex, focus and directrix of '+m(S.latex((y-k)**2 if horizontal else (x-h)**2)+'='+S.latex(4*p*(x-h) if horizontal else 4*p*(y-k)))+'.','Vertex '+point(h,k)+'; focus '+point(*focus)+'; directrix '+m(direct)+'.',[f'Compare with the standard form. The signed focus distance is p = {p}.','Move p units from the vertex along the axis for the focus, and the same distance oppositely for the directrix.'],3,[(eq.subs({x:h,y:k}),0)]))
qs += [question('A parabola has vertex (1,-2) and focus (1,1). Find its equation.',m('(x-1)^2=12(y+2)'),['The axis is vertical and '+m('p=1-(-2)=3')+'.',m('(x-h)^2=4p(y-k)')],3),question('A parabola has focus (-1,2) and directrix x = 3. Find its equation.',m('(y-2)^2=-8(x-1)'),['The vertex is halfway between focus and directrix: (1,2).','The horizontal signed focus distance is -2. Use '+m('(y-k)^2=4p(x-h)')+'.'],3)]
add('G02',area,'Parabolas: Focus and Directrix',qs,['conic-sections-explorer'])
qs=[]
for h,k,a,b,vertical in [(0,0,5,3,False),(1,-2,5,4,False),(-2,1,5,3,True),(2,3,5,4,True),(-1,-1,13,5,False),(0,2,13,12,True),(0,0,5,4,False),(2,-1,5,3,True)]:
 c=S.sqrt(a*a-b*b);eq=(x-h)**2/(b*b if vertical else a*a)+(y-k)**2/(a*a if vertical else b*b);verts=[(h,k-a),(h,k+a)] if vertical else [(h-a,k),(h+a,k)];foci=[(h,k-c),(h,k+c)] if vertical else [(h-c,k),(h+c,k)]
 prompt='Find the center, major-axis vertices and foci of '+m(S.latex(eq)+'=1')+'.' if len(qs)<6 else 'Find the ellipse equation with center '+point(h,k)+', major-axis vertices '+', '.join(point(*v) for v in verts)+' and foci '+', '.join(point(*v) for v in foci)+'.'
 ans='Center '+point(h,k)+'; vertices '+', '.join(point(*v) for v in verts)+'; foci '+', '.join(point(*v) for v in foci)+'.' if len(qs)<6 else m(S.latex(eq)+'=1')
 qs.append(question(prompt,ans,[f'The semi-major axis is {a}; the semi-minor axis is {b}.',m('c^2=a^2-b^2='+str(a*a-b*b))+', so '+m('c='+S.latex(c))+'.','Use the major-axis direction and the center.'],3,[(c*c,a*a-b*b)]+[(eq.subs({x:v[0],y:v[1]}),1) for v in verts]))
add('G03',area,'Ellipses and Their Features',qs,['conic-sections-explorer']);qs=[]
for h,k,a,b,vertical in [(0,0,3,4,False),(1,-2,4,3,False),(-2,1,3,4,True),(2,3,4,3,True),(-1,0,5,12,False),(0,-1,5,12,True),(1,1,3,4,False),(-1,2,4,3,True)]:
 eq=(y-k)**2/(a*a)-(x-h)**2/(b*b) if vertical else (x-h)**2/(a*a)-(y-k)**2/(b*b);slope=S.Rational(a,b) if vertical else S.Rational(b,a);verts=[(h,k-a),(h,k+a)] if vertical else [(h-a,k),(h+a,k)];c=S.sqrt(a*a+b*b)
 prompt='Find the center, vertices and asymptotes of '+m(S.latex(eq)+'=1')+'.' if len(qs)<6 else 'Find the hyperbola equation with center '+point(h,k)+', vertices '+', '.join(point(*v) for v in verts)+' and asymptotes '+m('y-('+str(k)+')=\\pm'+S.latex(slope)+'(x-('+str(h)+'))')+'.'
 ans='Center '+point(h,k)+'; vertices '+', '.join(point(*v) for v in verts)+'; asymptotes '+m('y-('+str(k)+')=\\pm'+S.latex(slope)+'(x-('+str(h)+'))')+'.' if len(qs)<6 else m(S.latex(eq)+'=1')
 qs.append(question(prompt,ans,['Read the transverse-axis direction from the positive squared term.',f'The semi-axis lengths are a = {a} and b = {b}.','The asymptote slope is '+m('\\pm'+S.latex(slope))+'.'],3,[(eq.subs({x:v[0],y:v[1]}),1) for v in verts]))
add('G04',area,'Hyperbolas and Asymptotes',qs,['conic-sections-explorer']);reuse('G05',area,'Parametric Equations and Curves','P3.3',tools=['functions','conic-sections-explorer']);qs=[]
for r,t in [(4,S.pi/6),(6,2*S.pi/3),(-2,S.pi/4),(3,-S.pi/2)]:
 xx=S.simplify(r*S.cos(t));yy=S.simplify(r*S.sin(t));qs.append(question('Convert the polar point '+point(r,t)+' to rectangular coordinates.',point(xx,yy),[m(r'x=r\cos\theta,\quad y=r\sin\theta'),m('x='+S.latex(xx)+',\\quad y='+S.latex(yy))],2,[(xx*xx+yy*yy,r*r)]))
qs += [question('Write (-3,3) in polar form with r > 0 and '+m('0\\le\\theta<2\\pi')+'.',point(3*S.sqrt(2),3*S.pi/4),[m(r'r=\sqrt{(-3)^2+3^2}=3\sqrt2'),'The point lies in quadrant II, with reference angle '+m(r'\frac\pi4')+'.'],3,[(3*S.sqrt(2)*S.cos(3*S.pi/4),-3)]),question('Convert '+m('r=4\\cos\\theta')+' to a rectangular equation and identify the curve.',m('(x-2)^2+y^2=4')+'; a circle centered at (2,0), radius 2.',[m('r^2=4r\\cos\\theta\\Longrightarrow x^2+y^2=4x'),'Complete the square in x.'],3,[(S.expand((x-2)**2+y*y-4),x*x+y*y-4*x)]),question('For '+m('r=2+2\\cos\\theta')+', find the largest and smallest r and an angle in [0,2π) for each.','Maximum r = 4 at θ = 0; minimum r = 0 at θ = π.',[m('-1\\le\\cos\\theta\\le1'),m('r(0)=4,\\quad r(\\pi)=0')],2,[(2+2*S.cos(0),4),(2+2*S.cos(S.pi),0)]),question('The rose curve '+m('r=3\\sin(2\\theta)')+' has how many petals? What is its greatest distance from the origin?','Four petals; greatest distance 3.', ['For an even integer n, '+m('r=a\\sin(n\\theta)')+' has 2n petals.','Distance is '+m('|r|')+' and cannot exceed 3.'],2)]
add('G06',area,'Polar Coordinates and Polar Curves',qs,['polar-coordinates','unit-circle-explainer']);mix('G07',area,'Vectors: Components, Length and Direction',[(A,'P10.1',[1,2,3,4]),(A,'P10.2',[5,6,7,8])],['free-vectors','further-vectors'])
area='Systems & Matrices';reuse('S01',area,'Systems of Three Linear Equations','N18',I,['simultaneous-equations']);reuse('S02',area,'Linear-Quadratic Systems','P2.4');reuse('S03',area,'Matrix Operations and Determinants','N19',I,['matrices']);reuse('S04',area,'Inverse Matrices and Systems','N20',I,['matrices','simultaneous-equations']);reuse('S05',area,'Matrix Transformations','G18',I,['matrices','transformations'])
area='Sequences & Counting';reuse('Q01',area,'Arithmetic Sequences and Series','P4.4');reuse('Q02',area,'Geometric Sequences and Series','P4.5');mix('Q03',area,'Recursion and Sigma Notation',[(A,'P4.2',[1,2,3,4]),(A,'P4.3',[5,6,7,8])],['sequences','sequences-series']);reuse('Q04',area,'Binomial Expansion','P4.1a');reuse('Q05',area,'Permutations and Combinations','N25',I,['permutations-combinations']);reuse('Q06',area,'Sequences and Financial Models','P4.6',tools=['sequences-series','financial-real-life-maths'])
assert len(packs)==48
sources=[{'title':'OpenStax Precalculus 2e: coverage and scope','url':'https://openstax.org/books/precalculus-2e/pages/preface','use':'Topic scope only; no questions or artwork copied.'},{'title':'College Board AP Precalculus framework','url':'https://apcentral.collegeboard.org/courses/ap-precalculus','use':'Context for function-focused precalculus; this collection is not an AP exam specification map.'}]
# Short, explicit givens keep the final diagram row within its print columns.
triangle=next(p for p in packs if p['id']=='T09')
for index,prompt in [(6,'A = 48°, a = 10 cm, b = 12.87 cm.<br>Find all possible values of B (1 d.p.).'),(7,'a = 9 cm, b = 8 cm, C = 91°.<br>Find the area (2 d.p.).')]:
 q=triangle['questions'][index]
 q['question']=re.sub(r'(<div class="rule-prompt">).*?(</div>)',lambda m:m[1]+prompt+m[2],q['question'])
(D/'library.json').write_text(json.dumps({'qualification':'U.S. Precalculus','sources':sources,'packs':packs},indent=2,ensure_ascii=False)+'\n');(D/'sources.json').write_text(json.dumps(sources,indent=2)+'\n');print(f'Authored/adapted {len(packs)} packs / {sum(len(p["questions"]) for p in packs)} questions; '+str(sum(bool(q.get('checks')) for p in packs for q in p['questions']))+' questions with symbolic claims.')
