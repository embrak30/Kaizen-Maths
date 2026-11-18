"""Narrow SL banks and additional current-course applications; loaded by author.py."""
# Both courses share introductory exponent/logarithm ideas, without requiring log laws.
a=[]
for k in range(1,9):
 a.append(q('Solve '+m(f'2^x={2**k}')+' and express the result using a logarithm.',m(f'x={k}=\\log_2({2**k})'),['A logarithm gives the exponent needed for a given base.',m(f'2^{k}={2**k}')+'.','Thus '+m(f'x=\\log_2({2**k})={k}')+'.'],2))
add(N,'Exponents and introductory logarithms',ALL,a,'Sequences & number')
reuse(N,'Rounding and estimation',AI,'g','N11','Sequences & number')
a=[]
for actual,approx in [(48,50),(125,120),(64,60),(250,240),(18,20),(72,70),(350,360),(96,100)]:
 err=100*abs(approx-actual)/actual
 a.append(q(f'The exact value is {actual}; an approximation is {approx}. Find the percentage error (3 s.f.).',f'{err:.3g}%.',[f'The absolute error is |{approx} − {actual}| = {abs(approx-actual)}.',m(f'\\frac{{{abs(approx-actual)}}}{{{actual}}}\\times100')+'.',f'Divide by {actual}, not by the approximation, giving {err:.3g}%.']))
add(N,'Percentage error and accuracy',AI,a,'Sequences & number')
a=[]
for n,r in [(6,2),(7,3),(8,2),(9,4),(10,3),(8,4),(11,2),(12,3)]:
 a.append(q(f'From {n} distinct people, find the number of ways to choose a committee of {r}, and the number of ways to fill {r} distinct offices.',f'{math.comb(n,r)}; {math.perm(n,r)}.',['For a committee, order does not matter: '+m(f'\\binom{{{n}}}{{{r}}}={math.comb(n,r)}')+'.','For distinct offices, order matters: '+m(f'\\frac{{{n}!}}{{({n}-{r})!}}={math.perm(n,r)}')+'.','Do not use permutations for an unordered selection.']))
add(N,'Counting, permutations and combinations',['aa-hl'],a,'Algebra & proof')
# AI SL sinusoidal models use degrees; AA and AI HL keep the radian bank.
for p in packs:
 if p['title']=='Trigonometric models':p['courses']=AAI
 if p['title']=='Definite integrals':p['calculator']='required';p['instructions']='Answer on separate paper. Show your integral setup and use a graphing calculator. Give non-exact results to 3 significant figures.'
a=[]
for period,mid,amplitude in [(12,5,2),(8,4,3),(24,10,4),(6,7,2),(10,8,3),(20,6,1),(16,9,4),(30,12,5)]:
 a.append(q('A depth model is '+m(f'h(t)={mid}+{amplitude}\\cos\\left(\\frac{{360t}}{{{period}}}\\right)')+f' metres, with angles in degrees and t in hours. Find its range and first minimum time t > 0.',m(f'{mid-amplitude}\\leq h\\leq{mid+amplitude}')+f' m; t = {period/2:g} h.',['Cosine varies between −1 and 1.',f'The midpoint is {mid}, so the range is {mid-amplitude} to {mid+amplitude}.',f'The first minimum has angle 180°, giving t = {period/2:g} h.']))
add(F,'Sinusoidal models in degrees',AI,a,'Models',calculator='required')
a=[]
for k in range(1,9):
 a.append(q(f'A taxi fare is {k+2} currency units plus 2 per kilometre for the first 5 km; each further kilometre costs 1.5. Write a piecewise model and find the fare for 8 km.',m(f'C(d)=\\begin{{cases}}{k+2}+2d&0\\leq d\\leq5\\\\{k+12}+1.5(d-5)&d>5\\end{{cases}}')+f'; {k+16.5:g}.',['The first branch includes the fixed charge and the first 5 km.',f'At d = 5, the fare is {k+12}; add 1.5(d − 5) beyond that.',f'For 8 km, the fare is {k+12} + 1.5 × 3 = {k+16.5:g}.']))
add(F,'Piecewise linear models',AI,a,'Models')
reuse(G,'Circle sectors in degrees',AI,'g','G12','Geometry & measurement')
a=[]
for k in range(1,9):
 a.append(q(f'Find the perpendicular bisector of the segment from A = (0, 0) to B = (2, {2*k}).',m(f'y=-\\frac1{{{k}}}(x-1)+{k}'),[f'The midpoint is (1, {k}).',f'The segment gradient is {k}; the perpendicular gradient is −1/{k}.','Use the point-gradient form through the midpoint.']))
add(G,'Perpendicular bisectors',AI,a,'Voronoi & networks')
# Complete-route examples, separate from the smaller network above.
add(G,'Route inspection and travelling-salesperson bounds',['ai-hl'],[
 q('Which vertices have odd degree?','B and C.',['The degrees are 2, 3, 3 and 2.','Only B and C are odd.'],2),
 q('Find the shortest path between the odd vertices.','BC, of weight 1.',['The direct edge is 1.','All alternative paths have greater weight.'],2),
 q('Find a minimum closed route traversing every edge at least once.','B–A–C–D–B–C–B; weight 18.',['The edge total is 2 + 5 + 1 + 6 + 3 = 17.','Duplicate the shortest odd-vertex path BC, adding 1.','The displayed route traverses all original edges and returns to B.']),
 q('Why must a closed route repeat at least one edge?','B and C have odd degree.',['Every arrival in a closed route must be matched by a departure.','Duplicating BC makes both odd degrees even.'],2),
 q('Find the minimum Hamiltonian tour in this graph.','A–B–D–C–A, weight 16.',['A must use AB and AC; D must use DB and DC.','These force the tour A–B–D–C–A, up to direction.','Add 2 + 6 + 3 + 5 = 16.']),
 q('Use a minimum spanning tree to give a lower bound for any Hamiltonian tour.','6 (a valid but weak lower bound).',['The minimum spanning tree has weight 6.','Removing one edge from a tour leaves a spanning tree, so every tour exceeds this bound.'],2),
 q('Find an improved lower bound by deleting A.','11.',['On B,C,D the minimum tree uses BC and CD, total 4.','Add the two smallest edges incident with A: 2 + 5 = 7.','The resulting lower bound is 4 + 7 = 11.']),
 q('Explain the difference between route inspection and the travelling-salesperson problem.','Route inspection visits every edge; travelling salesperson visits every vertex and returns.',['Route inspection permits repeated edges to cover the network.','A Hamiltonian tour visits every vertex exactly once before returning.'],2)],'Voronoi & networks',stimulus='<p>Use the weighted undirected network below; routes use only its edges.</p>'+network)
# Calculus SL functions restricted to the documented elementary set.
a=[]
for k in range(1,9):
 expr=S.exp(k*x)+S.log(x);der=S.diff(expr,x);ck('elementary derivative',S.simplify(der-k*S.exp(k*x)-1/x),0)
 a.append(q('For x > 0, differentiate '+m(expr)+'.',m(der),['Use the chain rule for the exponential: differentiate the inner '+m(k*x)+'.',m(f'\\frac{{d}}{{dx}}e^{{{k}x}}={k}e^{{{k}x}}')+'.',m(r'\frac{d}{dx}\ln x=\frac1x')+'; add the two terms.']))
add(C,'Exponential and natural-log derivatives',AAI,a,'Differentiation',tool='differentiation-polynomials')
a=[]
for k in range(1,9):
 expr=S.sin(k*x)+S.cos(x);der=S.diff(expr,x);ck('sin cosine derivative',der,k*S.cos(k*x)-S.sin(x))
 a.append(q('Differentiate '+m(expr)+' with angles in radians.',m(der),[m(r'\frac{d}{dx}\sin u=\cos u\,u\prime')+'.','For '+m(k*x)+', the inner derivative is '+str(k)+'.',m(r'\frac{d}{dx}\cos x=-\sin x')+'; combine the terms.']))
add(C,'Sine and cosine derivatives',AAI,a,'Differentiation',tool='differentiation-polynomials')
a=[]
for k in range(1,9):
 expr=S.sin(k*x)+S.exp(x)+1/x;anti=-S.cos(k*x)/k+S.exp(x)+S.log(x);ck('elementary integral',S.diff(anti,x),expr)
 a.append(q('For x > 0, find '+m(r'\int('+S.latex(expr)+r')\,dx')+'.',m(anti)+' + C.',['Integrate each term separately.',m(f'\\int\\sin({k}x)\\,dx=-\\frac1{{{k}}}\\cos({k}x)')+'.','The other antiderivatives are eˣ and ln x; include one arbitrary constant.']))
add(C,'Sine, exponential and logarithmic integrals',AAI,a,'Integration',tool='integration')
a=[]
for k in range(1,9):
 expr=2*x*(x*x+k)**3;anti=(x*x+k)**4/4;ck('reverse chain rule',S.diff(anti,x),expr)
 a.append(q('Find '+m(r'\int 2x(x^2+'+str(k)+r')^3\,dx')+'.',m(anti)+' + C.',['Choose '+m(f'u=x^2+{k}')+', so '+m('du=2x\\,dx')+'.',m(r'\int u^3\,du=\frac{u^4}4+C')+'.','Substitute back for u to obtain '+m(anti)+' + C.']))
add(C,'Integration by inspection and reverse chain rule',AAI,a,'Integration',tool='integration')
a=[]
for k in range(1,9):
 a.append(q('Solve '+m(r'\frac{dy}{dx}=1+\frac yx')+f' for x > 0, with y(1) = {k}.',m(f'y=x(\\ln x+{k})'),['Set y = vx, giving '+m(r'\frac{dy}{dx}=v+x\frac{dv}{dx}')+'.','Substitute: '+m(r'v+x\frac{dv}{dx}=1+v\implies\frac{dv}{dx}=\frac1x')+'.','Integrate v = ln x + C; the initial condition gives C = '+str(k)+'. Multiply by x.'],4))
add(C,'Homogeneous differential equations',['aa-hl'],a,'Differential equations & series')
a=[]
for k in range(1,9):
 expr=S.sin(k*x);poly=S.series(expr,x,0,6).removeO();ck('Maclaurin coefficients',S.diff(poly,x,3).subs(x,0),S.diff(expr,x,3).subs(x,0))
 a.append(q('Find the Maclaurin polynomial through degree 5 for '+m(expr)+'.',m(poly),[m(r'\sin u=u-\frac{u^3}{3!}+\frac{u^5}{5!}+\cdots')+'.','Substitute '+m(f'u={k}x')+'.','Expand the powers of '+str(k)+' and simplify the factorials.']))
add(C,'Maclaurin series by substitution',['aa-hl'],a,'Differential equations & series')
# Keep exam-specific limits explicit; no AI SL kinematics or mixed-tail inference.
for p in packs:
 if p['title']=='Derivative meaning and gradient graphs':p['courses']=AAI
 if p['title']=='Complex arithmetic and polar form':p['title']='Complex arithmetic in Cartesian form'
 if p['title']=='Confidence intervals for a population mean':p['title']='Confidence intervals: known population variance'
 if p['title']=='One-tailed binomial hypothesis tests':
  questions=[]
  for n,prob,count in [(20,.1,5),(30,.2,10),(25,.3,12),(40,.15,10),(15,.5,12),(35,.2,11),(18,.25,9),(50,.1,10)]:
   pv=sum(math.comb(n,j)*prob**j*(1-prob)**(n-j) for j in range(count,n+1))
   questions.append(q(f'Under H₀, X ~ B({n}, {prob}). An observed count is {count}. Test at 5% against an increased success probability.',f'p-value = {pv:.4g}. '+('Reject H₀.' if pv<.05 else 'Do not reject H₀.'),[f'H₀: p = {prob}; H₁: p > {prob}.',m(f'P(X\\geq {count})=1-P(X\\leq{count-1})')+f' = {pv:.4g}.','Compare this one-sided p-value with 0.05. '+('There is evidence of an increase.' if pv<.05 else 'Evidence of an increase is insufficient.')]))
  for i,v in enumerate(questions,1):v['number']=i
  p['questions']=questions;p['provenance']={'kind':'original-ib'}
# Link only tools already present in the application. New question banks do not
# imply that a matching generator has been built.
for p in packs:
 if not p['tools']:
  title=p['title'].lower()
  slug=('complex-numbers' if 'complex' in title or 'de moivre' in title else 'advanced-matrices' if 'eigen' in title else 'matrices' if 'matri' in title and 'transition' not in title else 'financial-real-life-maths' if p['group']=='Finance' else 'further-vectors' if p['group']=='Vectors' else 'correlation-regression' if 'regression' in title else None)
  if slug:p['tools']=[slug]
# Vary the tasks within the key new banks, including the HL variants named.
for p in packs:
 if p['title']=='Complex arithmetic in Cartesian form':
  p['title']='Complex arithmetic and polar form'
  for i,(r1,a1,r2,a2) in enumerate([(2,S.pi/6,3,S.pi/3),(4,S.pi/4,2,-S.pi/4),(3,2*S.pi/3,2,-S.pi/6),(5,-S.pi/3,2,S.pi/2)],4):
   angle=S.simplify(a1+a2)
   p['questions'][i]=q('Given '+m(f'z={r1}\\operatorname{{cis}}({S.latex(a1)}),\\ w={r2}\\operatorname{{cis}}({S.latex(a2)})')+', find zw in polar and Cartesian forms.',m(f'{r1*r2}\\operatorname{{cis}}({S.latex(angle)})')+'; '+m(S.simplify(r1*r2*(S.cos(angle)+S.I*S.sin(angle)))),['Multiply the moduli: '+str(r1*r2)+'.','Add the arguments: '+m(angle)+'.','Use '+m(r'\operatorname{cis}\theta=\cos\theta+i\sin\theta')+' to convert to Cartesian form.'])
 if p['title']=='Sine, cosine and triangle area':
  for i,(a,A,B) in enumerate([(5,30,45),(8,40,70),(10,55,65),(12,50,60)],4):
   b=a*math.sin(math.radians(B))/math.sin(math.radians(A));cang=180-A-B
   p['questions'][i]=q(f'A triangle has A = {A}°, B = {B}° and side a = {a} cm opposite A. Find C and side b opposite B (3 s.f.).',f'C = {cang}°; b = {b:.3g} cm.',[f'C = 180° − {A}° − {B}° = {cang}°.',m(r'\frac b{\sin B}=\frac a{\sin A}')+'.',m(f'b=\\frac{{{a}\\sin {B}^\\circ}}{{\\sin {A}^\\circ}}')+f' = {b:.3g} cm.'])
 if p['title']=='Confidence intervals: known population variance':
  p['title']='Confidence intervals for a population mean'
  critical=float(mp.findroot(lambda z:tcdf(z,24)-.975,2))
  for i in range(4,8):
   mean=51+i;mar=critical*10/5
   p['questions'][i]=q(f'A normal population has unknown SD. A random sample of 25 has mean {mean} and sample SD 10. Find a 95% confidence interval for the population mean (2 d.p.).',f'({mean-mar:.2f}, {mean+mar:.2f}).',['Use a t interval because population σ is unknown; df = 25 − 1 = 24.',f'The 97.5th percentile is t = {critical:.6f}.',m(f'{mean}\\pm {critical:.6f}\\frac{{10}}{{\\sqrt{{25}}}}')+f' gives ({mean-mar:.2f}, {mean+mar:.2f}).'])
 if p['title']=='One-sample t-tests':
  p['title']='One-sample and paired-data t-tests'
  for i in range(4,8):
   mean=(i+1)/2;stat=mean/(2/4);pv=1-tcdf(stat,15)
   p['questions'][i]=q(f'For 16 paired observations, differences (after − before) have mean {mean:g} and sample SD 2. Assume independent, normally distributed differences. Test at 5% for an increase.',f't = {stat:g}, df = 15, p = {pv:.4g}. '+('Reject H₀.' if pv<.05 else 'Do not reject H₀.'),['H₀: μd = 0. H₁: μd > 0. Treat the differences as one sample.',m(f't=\\frac{{{mean:g}-0}}{{2/\\sqrt{{16}}}}={stat:g}')+'; df = 15.',f'Compare upper-tail p = {pv:.4g} with 0.05; '+('there is evidence of a positive mean change.' if pv<.05 else 'evidence is insufficient.')])
 if p['title']=='Voronoi boundaries and nearest sites':
  for i in range(4,8):
   k=i-2
   p['questions'][i]=q(f'Three sites are A = (0,0), B = ({2*k},0), C = (0,{2*k}). Find their common Voronoi vertex and its distance from each site.',m(f'({k},{k})')+'; '+m(k*S.sqrt(2))+'.',[f'The bisector of AB is x = {k}.',f'The bisector of AC is y = {k}; they meet at ({k}, {k}).',m(f'd=\\sqrt{{{k}^2+{k}^2}}={S.latex(k*S.sqrt(2))}')+'; checking B and C gives the same distance.'])
 for i,v in enumerate(p['questions'],1):v['number']=i
