"""Author the remaining 73 AP topic sets. Original questions; not copied exam material."""
from pathlib import Path
import sys,json,re,math,html,os
sys.path.insert(0,os.environ.get('KAIZEN_AP_PYTHON_MODULES','/tmp/kaizen-ap-python'))
import sympy as S
ROOT=Path(__file__).resolve().parents[2]
cat=json.loads((ROOT/'data/ap-calculus/catalog.json').read_text());topics={t['id']:t for u in cat['units'] for t in u['topics']}
x,t,h=S.symbols('x t h',real=True);n=S.symbols('n',integer=True,positive=True)
banks={};checks=[]
def M(v):
 tex=S.latex(v) if not isinstance(v,str) else v
 if re.fullmatch(r'[+-]?\d+\s+[A-Za-z]',tex):tex=tex.replace(' ','')
 return '$'+tex+'$'
def L(v):return S.latex(S.simplify(v))
def Q(prompt,answer,steps,labels=None):
 assert 2<=len(steps)<=4
 if labels is None:labels=['Correct setup or interpretation','Correct mathematical process','Correct result and justification','Correct final interpretation'][:len(steps)]
 assert len(labels)==len(steps)
 return {'question':prompt,'questionText':re.sub('<[^>]+>',' ',prompt),'answer':answer,'steps':[f'<p><b>Step {i}.</b> {s}</p>' for i,s in enumerate(steps,1)],'criteria':[f'{s} [1].' for s in labels],'marks':len(steps),'origin':'authored-completion'}
def add(id,items):
 assert len(items)==8,(id,len(items));assert len({q['question'] for q in items})==8,id
 for i,q in enumerate(items,1):q['number']=i
 banks[id]={'id':id,'sourceTool':'limits-first-principles','title':topics[id]['title'],'scope':topics[id]['scope'],'questions':items}
def C(label,actual,expected):
 assert S.simplify(actual-expected)==0,(label,actual,expected)
 checks.append({'check':label,'passed':True})
def table(heads,rows):return '<table>'+''.join('<tr>'+''.join('<td>'+str(c)+'</td>' for c in row)+'</tr>' for row in [heads]+rows)+'</table>'
def plot(expr,xmin=-2,xmax=2,ymin=-2,ymax=4,holes=(),dots=(),name='f'):
 def xy(a,b):return 27+(a-xmin)/(xmax-xmin)*270,112-(b-ymin)/(ymax-ymin)*88
 svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 325 140">'
 a,b=xy(0,0);svg+=f'<path d="M27,{b}H300 M{a},20V112" fill="none" stroke="#8c9d99"/>'
 for v in range(math.ceil(xmin),math.floor(xmax)+1):
  xx,yy=xy(v,0);svg+=f'<text x="{xx}" y="{b+13}" text-anchor="middle" font-size="10">{v}</text>'
 for v in range(math.ceil(ymin),math.floor(ymax)+1):
  if v:
   xx,yy=xy(0,v);svg+=f'<text x="{a-5}" y="{yy+3}" text-anchor="end" font-size="10">{v}</text>'
 path='';active=False;previous=None
 for i in range(301):
  v=xmin+(xmax-xmin)*i/300
  try:w=float(expr(v));valid=math.isfinite(w) and ymin<=w<=ymax
  except Exception:valid=False
  if valid:
   xx,yy=xy(v,w);continuous=active and (previous is None or abs(w-previous)<(ymax-ymin)*.15);path+=('L' if continuous else 'M')+f'{xx:.2f},{yy:.2f} ';active=True;previous=w
  else:active=False
 svg+=f'<path d="{path}" fill="none" stroke="#146d65" stroke-width="2"/>'
 for pts,fill in [(holes,'white'),(dots,'#146d65')]:
  for aa,bb in pts:
   xx,yy=xy(aa,bb);svg+=f'<circle cx="{xx}" cy="{yy}" r="3.2" fill="{fill}" stroke="#146d65" stroke-width="1.5"/>'
 return svg+f'<text x="307" y="{b+3}" font-size="11">x</text><text x="{a+6}" y="13" font-size="11">{name}</text></svg>'
# UNIT 1: notation, graphical limits, selection, continuity and existence.
a=[]
for i,(point,value,side) in enumerate([(2,5,'-'),(-1,3,'+'),(0,-2,''),(4,1,'-'),(-3,0,'+'),(1,7,'')]):
 sym=f'\\lim_{{x\\to {point}{"^"+side if side else ""}}}f(x)={value}'
 a.append(Q('Write this in words: '+M(sym)+'. Does it specify '+M(f'f({point})')+'?',f'As x approaches {point}'+(' from the left' if side=='-' else ' from the right' if side else ' from either side')+f', f(x) approaches {value}. It does not specify the point value.', ['Identify the input being approached and the indicated side.','The statement describes nearby outputs, not necessarily the value at the point.'],['Correct reading of input, side and output','Distinguishes limit from point value']))
a += [Q('Write in notation: as t approaches 3 from below, the temperature T(t) approaches 18.',' $\\lim_{t\\to3^-}T(t)=18$.',['Use a left-hand approach because the inputs are below 3.','Place the approached output 18 on the right.']),Q('If $\\lim_{x\\to2}f(x)=6$ and $f(2)=9$, is there a contradiction? Explain.','No.',['The limit describes values near 2.','A function may have a separate value at 2; this would be a removable discontinuity.'])];add('1.2',a)
a=[]
for k in range(1,7):
 val=(k%3)+1;dot=val+1
 g=plot(lambda z,v=val:z+v,-2,2,-2,6,holes=[(0,val)],dots=[(0,dot)])
 a.append(Q('Use the graph to find $\\lim_{x\\to0}f(x)$ and $f(0)$. Is f continuous at 0?'+g,M(val)+', '+M(dot)+'; not continuous.',['Follow the line towards x = 0 from both sides: '+M(val)+'.','The filled point gives '+M(f'f(0)={dot}')+'.','The limit and point value differ.'],['Correct graphical limit','Correct filled-point value','Correct continuity conclusion']))
 # Vary holes' locations for the repeated y-intercepts.
 if k>3:
  c=1;g=plot(lambda z,v=val:z+v,-2,2,-2,6,holes=[(c,c+val)],dots=[(c,c+dot)])
  a[-1]=Q('From the graph, read both one-sided limits at x = 1 and compare them with f(1).'+g,M(c+val)+' on both sides; '+M(f'f(1)={c+dot}')+'.',['The line approaches '+M(c+val)+' from either side.','The filled point is at '+M(c+dot)+'.','The two-sided limit exists but differs from f(1).'])
a[2]=Q('Read both one-sided limits at x = 0 and the two-sided limit from this graph.'+plot(lambda z:z+1 if z<0 else z+3,-2,2,-2,6,holes=[(0,1)],dots=[(0,3)]),'Left limit 1; right limit 3; the two-sided limit does not exist.',['The left branch approaches the open point at (0, 1).','The right branch approaches (0, 3).','The two-sided limit fails because the one-sided limits disagree.'])
a[5]=Q('Use this graph to describe the one-sided limits at x = 0 and identify any vertical asymptote.'+plot(lambda z:1/z,-2,2,-4,4),'Left limit -∞; right limit +∞; vertical asymptote x = 0.',['The left branch decreases without bound near 0.','The right branch increases without bound near 0.','The unbounded behaviour identifies a vertical asymptote.'])
a += [Q('A graph approaches y = 2 from the left of x = 1 and y = 5 from the right. Can its value at x = 1 make the two-sided limit exist?','No.',['The one-sided limits are different.','Changing one point cannot change nearby behaviour.']),Q('An open point is drawn at (2, 4), and both branches approach it. What extra information is needed to decide continuity at 2?','The actual value f(2).',['The graph gives a common limit of 4.','Continuity also requires f(2) to exist and equal 4.'])];add('1.3',a)
a=[]
for expr,point,method in [(x*x+3,2,'Direct substitution'),((x*x-9)/(x-3),3,'Factor and cancel'),((S.sqrt(x+4)-2)/x,0,'Multiply by the conjugate'),(S.sin(3*x)/x,0,'Use the standard sine limit'),((2*x*x+1)/(x*x+4),S.oo,'Compare leading powers'),((1-S.cos(x))/x**2,0,'Use a trigonometric identity')]:
 val=S.limit(expr,x,point)
 a.append(Q('Choose a suitable method, then evaluate '+M(S.Limit(expr,x,point))+'.',M(val),[method+'.','A useful equivalent form or identity is '+M(({ 'Direct substitution':expr,'Factor and cancel':x+3,'Multiply by the conjugate':1/(S.sqrt(x+4)+2),'Use the standard sine limit':3*S.sin(3*x)/(3*x),'Compare leading powers':(2+1/x**2)/(1+4/x**2),'Use a trigonometric identity':2*S.sin(x/2)**2/x**2})[method])+'.','The resulting limit is '+M(val)+'.']))
a += [Q('A limit gives $0/0$ on substitution. Does this mean its value is zero? Explain the next step.','No. It is an indeterminate form.',['Zero divided by zero is undefined.','Use algebra, a known limit or another justified method to examine nearby values.']),Q('Evaluate $\\lim_{x\\to0}|x|/x$ by selecting a method that detects a possible failure.','The two-sided limit does not exist.',['For negative x the quotient is -1; for positive x it is 1.','The one-sided limits disagree.'])];add('1.7',a)
a=[]
for k in range(1,7):
 power=2 if k%2 else 4;arg=k+1
 a.append(Q('Evaluate '+M(f'\\lim_{{x\\to0}} {k}x^{power}\\cos\\left(\\frac{{{arg}}}x\\right)')+' using the Squeeze Theorem.',M(0),[M(f'-{k}x^{power}\\le {k}x^{power}\\cos({arg}/x)\\le {k}x^{power}')+'.','Both bounding functions tend to 0.','The Squeeze Theorem gives a limit of 0.'],['Valid two-sided bounds','Limits of bounds','Correct Squeeze Theorem conclusion']))
a += [Q('Near 0, $2-x^2\\le f(x)\\le2+x^2$. Find $\\lim_{x\\to0}f(x)$ and justify.','$2$.',['Both bounds have limit 2.','The function lies between them, so the Squeeze Theorem applies.']),Q('A pupil uses $-1\\le\\sin(1/x)\\le1$ to conclude its limit is 0. Explain the error.','The two bounding limits are different.',['The Squeeze Theorem needs bounds approaching the same value.','The oscillation persists; these bounds do not establish a limit.'])];add('1.8',a)
a=[]
for k in range(1,5):
 c=k-2;v=k+1;expr=x+v
 g=plot(lambda z,v=v:z+v,-2,2,-2,7,holes=[(0,v)],dots=[(0,v+1)])
 a.append(Q('The graph represents f. Estimate its limit at 0 and write a matching limit statement. Does a table of finitely many nearby values prove it?'+g,M(f'\\lim_{{x\\to0}}f(x)={v}')+'; a finite table alone is not a proof.',['Both graphical approaches lead to '+M(v)+'.','The limit statement uses x approaching 0, rather than f(0).','Finite samples can suggest, but cannot prove, behaviour at all nearby inputs.']))
a += [Q('For $f(x)=(x^2-4)/(x-2)$, give an equivalent expression for x ≠ 2 and use it to explain the graph near 2.','$f(x)=x+2$ for x ≠ 2; a line with a hole at (2, 4).',['Factor numerator as (x - 2)(x + 2).','Cancel the common factor only for x ≠ 2.','The line approaches 4, so the limit is 4.']),Q('A table samples f just left and right of 1, always near 3. A graph shows a jump at an unsampled input. Does the table prove continuity on the interval?','No.',['Continuity concerns every input in the interval.','A finite table can miss a jump between sampled inputs.']),Q('State a function with limit 5 at 0 but value 8 at 0. Describe its graph.','$f(x)=x+5$ for x ≠ 0 and f(0) = 8.',['The line x + 5 approaches 5 from both sides.','Draw a hole at (0, 5) and a filled point at (0, 8).']),Q('A verbal description says f(x) grows without bound as x approaches 2 from the right. Write this in notation and explain whether infinity is a real-valued limit.','$\\lim_{x\\to2^+}f(x)=+\\infty$; no finite real limit.',['The plus sign on 2 selects inputs greater than 2.','Infinity describes unbounded growth, not an attained real output.'])];add('1.9',a)
a=[]
for k,kind in enumerate(['hole','jump','pole','hole','jump','pole'],1):
 c=k-3
 if kind=='hole':expr=f'\\frac{{x^2-{k*k}}}{{x-{k}}}';at=k;ans='Removable';steps=[f'For x ≠ {k}, cancel the factor to get x + {k}.',f'The limit is {2*k}, but the original function is undefined there.','Defining the missing value to equal the limit repairs continuity.']
 elif kind=='jump':expr=f'\\begin{{cases}}{k},&x<{c}\\\\{k+2},&x\\ge{c}\\end{{cases}}';at=c;ans='Jump';steps=[f'The left limit is {k}.',f'The right limit is {k+2}.','Unequal finite one-sided limits produce a jump.']
 else:expr=f'\\frac1{{(x-{c})^2}}';at=c;ans='Infinite';steps=['The squared denominator approaches 0 through positive values.','Both sides tend to positive infinity.','There is a vertical asymptote, not a removable hole.']
 a.append(Q('Classify the discontinuity at '+M(at)+' of '+M('f(x)='+expr)+'. Justify.',ans+' discontinuity.',steps))
a += [Q('Can redefining a single function value repair a jump? Explain.','No.',['A jump has unequal one-sided limits.','A point value cannot make those limits equal.']),Q('For $f(x)=\\sin(1/x)$, x ≠ 0, classify the failure at 0.','Oscillatory discontinuity.',['Choose sequences tending to 0 on which sine equals 1 and -1.','The outputs have no single limit; no choice of f(0) repairs it.'])];add('1.10',a)
a=[]
for k in range(1,7):
 a.append(Q('Find c so that '+M(f'f(x)=\\begin{{cases}}x^2+{k},&x\\ne {k}\\\\c,&x={k}\\end{{cases}}')+' is continuous at '+M(k)+'.',M(f'c={k*k+k}'),['The polynomial has limit '+M(k*k+k)+' at the target.','Continuity requires the point value c to equal that limit.','Therefore '+M(f'c={k*k+k}')+'.']))
a += [Q('State the three conditions for continuity of f at a.','f(a) exists; the finite two-sided limit exists; they are equal.',['Check the point value and the nearby behaviour separately.','Finally compare the limit with f(a).']),Q('Let f(x) = 1 for x &lt; 0 and f(x) = 2 for x ≥ 0. Which continuity condition fails at 0?','The two-sided limit does not exist.',['f(0) = 2 is defined.','The left and right limits, 1 and 2, disagree.'])];add('1.11',a)
a=[]
exprs=[(1/(x-2),[2]),(S.sqrt(x+1),[-1]),(S.log(x-3),[3]),(1/(x*x-4),[-2,2]),(S.sqrt(9-x*x),[-3,3]),((x*x-1)/(x-1),[1])]
answers=['$(-\\infty,2)$ and $(2,\\infty)$','$[-1,\\infty)$, with right continuity at -1','$ (3,\\infty)$','$(-\\infty,-2)$, $(-2,2)$ and $(2,\\infty)$','$[-3,3]$, with one-sided continuity at endpoints','For the original quotient, $(-\\infty,1)$ and $(1,\\infty)$']
for (expr,_),ans in zip(exprs,answers):a.append(Q('Give the maximal intervals of continuity of '+M('f(x)='+S.latex(expr))+'. Include appropriate endpoints.',ans,['Determine where the expression is defined.','Standard polynomial, rational, root and logarithmic functions are continuous on their domains.','Keep excluded denominators/log boundaries out; use one-sided continuity at included endpoints.']))
a += [Q('What does continuity on [a, b] require at a and b?','Right continuity at a and left continuity at b.',['Inside the interval, use ordinary two-sided continuity.','At each endpoint, only the side inside the interval is required.']),Q('The function f(x) = 1/x is continuous at every point of its domain. Is it continuous on [-1, 1]?','No.',['Continuity on the interval requires definition at every point.','The function is undefined at 0.'])];add('1.12',a)
a=[]
for k in range(1,7):
 c=k-3;power=1 if k%2 else 2
 a.append(Q('Find both one-sided limits of '+M(f'f(x)=\\frac{{{k}}}{{(x-({c}))^{power}}}')+' at '+M(c)+', and state the vertical asymptote.',('Left: $-\\infty$; right: $+\\infty$.' if power==1 else 'Both: $+\\infty$.')+' Asymptote '+M(f'x={c}')+'.',['The numerator stays positive.','Inspect the denominator sign on each side; an even power stays positive.','The denominator tends to zero, giving the stated unbounded behaviour.']))
a += [Q('For $f(x)=(x-2)/(x^2-4)$, is x = 2 a vertical asymptote? Justify.','No; it is a hole.',['For x ≠ ±2 the quotient equals 1/(x + 2).','Its limit at 2 is 1/4, not infinite.']),Q('Can a vertical asymptote occur where a function value has been separately defined? Explain.','Yes.',['An asymptote concerns nearby unbounded outputs.','Changing the single point value does not change that behaviour.'])];add('1.14',a)
a=[]
for k in range(1,7):
 f=x**3+x-k;end=k+1
 a.append(Q('Use the Intermediate Value Theorem to prove '+M(f)+' has a zero in '+M(f'(0,{end})')+'.','At least one zero lies in the stated open interval.',['A polynomial is continuous on the closed interval.',M(f'f(0)={-k}<0,\\quad f({end})={end**3+end-k}>0')+'.','Zero lies between these outputs, so IVT guarantees an interior zero.'],['Continuity hypothesis','Opposite endpoint signs','Correct IVT conclusion']))
a += [Q('Does IVT guarantee exactly one root when endpoint values have opposite signs?','No; it guarantees at least one.',['The theorem is an existence result.','Uniqueness requires additional information, such as strict monotonicity.']),Q('Let f(x) = -1 for x &lt; 0 and f(x) = 1 for x ≥ 0. Why does the sign change on [-1, 1] not guarantee a zero?','The continuity hypothesis fails.',['The function jumps at 0.','It never takes the value zero, so the endpoint signs alone are insufficient.'])];add('1.16',a)
# UNITS 2–4: rates and derivative applications.
a=[]
for k in range(1,7):
 f=k*t*t+2*t;av=(f.subs(t,3)-f.subs(t,1))/2;inst=S.diff(f,t).subs(t,2);C(f'2.1 rate {k}',av,inst)
 a.append(Q('A particle has position '+M(f's(t)={L(f)}')+' metres. Find average velocity on [1, 3] and instantaneous velocity at t = 2 seconds.',M(av)+' m/s for both.',[M(f'\\bar v=\\frac{{s(3)-s(1)}}{{3-1}}={L(av)}')+'.',M(f'v(t)=s\'(t)={L(S.diff(f,t))}')+'.','Substitute t = 2 to obtain '+M(inst)+' m/s.']))
a += [Q('Can equal average and instantaneous velocities in one example be assumed for all motion?','No.',['The average uses two endpoints; the instantaneous velocity is a local derivative.','For s(t) = t³ on [0, 2], the average is 4 but v(1) = 3.']),Q('A position graph has a horizontal tangent at t = 4. What does that say about velocity and total distance already travelled?','Velocity is zero then; total distance cannot be inferred.',['Instantaneous velocity is tangent slope.','A local zero slope gives no information about the whole earlier path.'])];add('2.1',a)
a=[]
for k in range(1,7):
 base=k+2;delta=S.Rational(1,10);f=k*x*x+3*x;left=f.subs(x,base-delta);right=f.subs(x,base+delta);est=(right-left)/(2*delta);C(f'2.3 symmetric slope {k}',est,S.diff(f,x).subs(x,base))
 a.append(Q('Use the symmetric difference quotient to estimate '+M(f'f\'({base})')+'.'+table(['x',f'{float(base-delta):g}',f'{float(base+delta):g}'],[['f(x)',f'{float(left):g}',f'{float(right):g}']]),M(est),['Use the two inputs equally spaced around the target.',M(f'\\frac{{{float(right):g}-{float(left):g}}}{{{float(2*delta):g}}}={L(est)}')+'.','This is an estimate based on finite data, not proof of a derivative value.']))
a += [Q('For estimating f′(2), why is a centred interval often preferable to a one-sided interval of similar size?','It samples both sides of the target.',['Use [f(2 + h) - f(2 - h)]/(2h).','For smooth functions this often cancels leading one-sided bias; it is still an approximation.']),Q('Does a table of finite function values establish that f′(a) exists? Explain.','No.',['A derivative is a limit as the step tends to zero.','Finite data cannot rule out unsampled sharp or oscillatory behaviour.'])];add('2.3',a)
a=[]
for k in range(1,7):
 power=1 if k%2 else 2;f=abs(x-k) if power==1 else (x-k)**2
 a.append(Q('At '+M(k)+', is '+M('f(x)='+('\\lvert x-'+str(k)+'\\rvert' if power==1 else S.latex(f)))+' continuous and differentiable? Justify.', 'Continuous; '+('not differentiable.' if power==1 else 'differentiable with slope 0.'),['The function value and limit are both 0.','The one-sided slopes are '+('-1 and 1.' if power==1 else 'both 0.'),'Differentiability requires equal finite one-sided slopes.']))
a += [Q('If f is differentiable at a, must it be continuous there? Is the converse true?','Yes; the converse is false.',['Differentiability implies continuity.','The absolute-value function is continuous at 0 but not differentiable there.']),Q('A graph has a vertical tangent at a. Does it have a finite derivative there? Explain.','No finite derivative.',['A derivative must be a finite slope in the usual definition.','A vertical tangent gives unbounded slope, even if the graph is continuous.'])];add('2.4',a)
a=[]
for k in range(1,7):
 slope=k+1;at=k;out=k*k+2
 a.append(Q('A differentiable one-to-one f satisfies '+M(f'f({at})={out},\\ f\'({at})={slope}')+'. Find '+M(f'(f^{{-1}})\'({out})')+'.',M(S.Rational(1,slope)),['The input to the inverse corresponds to the given output of f.',M(f'(f^{{-1}})\'({out})=\\frac1{{f\'({at})}}')+'.','The given derivative is nonzero, so the reciprocal is '+M(S.Rational(1,slope))+'.']))
a += [Q('If f(2) = 5 and f′(2) = 0, can the inverse derivative formula establish a finite value at 5?','No.',['The formula requires a nonzero derivative of f.','Its reciprocal is undefined when f′(2) = 0.']),Q('For $f(x)=e^x$, use the inverse derivative rule to find the slope of $\\ln x$ at x = e.','$1/e$.',['f(1) = e and f′(1) = e.','The inverse slope at e is the reciprocal, 1/e.'])];add('3.3',a)
a=[]
for expr,method in [(x*x*S.sin(x),'Product rule'),(S.exp(x)/(x+1),'Quotient rule'),((3*x+1)**5,'Chain rule'),(S.log(x*x+1),'Chain rule'),((x*x+1)/(x-1),'Quotient rule'),(S.sin(x*x)*S.exp(x),'Product and chain rules')]:
 d=S.factor(S.diff(expr,x));C('3.5 '+str(expr),d,S.diff(expr,x))
 a.append(Q('Select and apply the derivative rules for '+M('y='+S.latex(expr))+'. Simplify your answer.',M('y\'='+S.latex(d)),[method+'.','Applying those rules gives '+M('y\\prime='+S.latex(S.diff(expr,x)))+'.',M('y\'='+S.latex(d))+'.'],['Appropriate rule selection','Correct differentiation','Correct simplification']))
a += [Q('Why does $d(x\\sin x)/dx$ need a product rule, while $d(\\sin(x^2))/dx$ needs a chain rule?','The first is a product; the second is a composition.',['In the product, x and sin x are multiplied.','In the composition, the output of x² is the input to sine.']),Q('Differentiate $y=(x^2+1)/x$ using a simpler equivalent expression, stating the domain.','$y\'=1-1/x^2$, x ≠ 0.',['Rewrite as x + x⁻¹ on its original domain.','Differentiate term by term and retain x ≠ 0.'])];add('3.5',a)
# Rate interpretation uses distinct measured quantities and units.
contexts=[('water volume','V','litres','minutes',-3),('temperature','T','°C','hours',2),('population','P','organisms','days',12),('cost','C','dollars','items',4),('height','H','metres','seconds',-2),('mass','M','grams','hours',-5)]
a=[]
for k,(name,v,units,time,rate) in enumerate(contexts,1):
 a.append(Q(f'The {name} is {v}(t), in {units}, after t {time}. Interpret '+M(f'{v}\'({k})={rate}')+' and estimate the change over the next 0.1 time unit.',f'At t = {k}, {name} is '+('increasing' if rate>0 else 'decreasing')+f' at {abs(rate)} {units} per {time[:-1]}. Change ≈ {rate/10:g} {units}.',['A derivative is an instantaneous rate, with output units divided by input units.','The sign indicates '+('increase.' if rate>0 else 'decrease.'),M(f'\\Delta {v}\\approx {rate}(0.1)={rate/10:g}')+'.']))
a += [Q('If C′(100) = 8 dollars per item, does it mean 100 items cost 8 dollars? Explain.','No.',['It describes marginal cost near 100 items.','It estimates the extra cost of a small increase in production, not total cost.']),Q('A tank has V′(5) = 0. Must it be empty at time 5?','No.',['The derivative gives the volume rate then.','The tank could hold any volume while its instantaneous net flow is zero.'])];add('4.1',a)
a=[]
for k in range(1,7):
 f=t**3-3*k*t*t;v=S.diff(f,t);acc=S.diff(v,t);at=k;C('4.2 acceleration '+str(k),acc.subs(t,at),0)
 a.append(Q('For position '+M(f's(t)={L(f)}')+' metres, find velocity, acceleration and speed at '+M(f't={k}')+' seconds.',M(f'v={-3*k*k},\\quad a=0,\\quad\\text{{speed}}={3*k*k}')+' (m/s, m/s², m/s).',[M('v(t)='+L(v))+'.',M('a(t)='+L(acc))+'.','Evaluate at the stated time; speed is the magnitude of velocity.']))
a += [Q('At one instant v = -4 m/s and a = -2 m/s². Is the particle speeding up?','Yes.',['Velocity and acceleration have the same sign.','The magnitude of the negative velocity is increasing.']),Q('Does zero velocity at a time imply a change of direction? Explain with a counterexample.','No.',['A direction change needs a sign change in velocity.','For v(t) = t² the velocity is zero at 0 but positive on both sides.'])];add('4.2',a)
a=[]
for k in range(1,7):
 f=k*t*t+5*t+100;d=S.diff(f,t)
 a.append(Q('A production cost is '+M(f'C(q)={k}q^2+5q+100')+' dollars. Find marginal cost at '+M(f'q={k}')+' and estimate the cost of 0.1 additional unit.',M(2*k*k+5)+' dollars/unit; estimated extra cost '+M(S.Rational(2*k*k+5,10))+' dollars.',[M(f'C\'(q)={2*k}q+5')+'.','At the target, marginal cost is '+M(2*k*k+5)+'.','Use marginal cost × 0.1 for a local estimate.']))
a += [Q('A concentration has C′(2) = -0.4 mg/L per minute. Interpret it.','At minute 2 the concentration is decreasing at 0.4 mg/L per minute.',['The negative sign indicates a decrease.','Units describe concentration change per minute, not total concentration.']),Q('If demand D(p) falls as price rises, what sign would you expect for D′(p)? Does this specify revenue growth?','Negative; it does not determine revenue growth by itself.',['A decreasing demand gives D′(p) &lt; 0.','Revenue is pD(p), whose derivative is D(p) + pD′(p).'])];add('4.3',a)
a=[]
for k in range(1,7):
 a.append(Q('A circle has changing radius r(t) and area A(t). Write the related-rate equation and find A′ when '+M(f'r={k},\\ r\\prime=2')+'. Use consistent length and time units.',M(f'A\\prime={4*k}\\pi')+' square units per time unit.',['Start with '+M('A=\\pi r^2')+'.','Differentiate with respect to time: '+M('A\\prime=2\\pi r r\\prime')+'.','Substitute the instantaneous values after differentiating.']))
a += [Q('Why should snapshot values generally be inserted after differentiating a related-rate equation?','They apply only at one instant.',['The variables change throughout the process.','Substitution too early can replace a changing quantity by a constant and erase its derivative.']),Q('A rectangle has area A = xy, with both sides changing. Express A′ in terms of x, y and their rates.','$A\\prime=x\\prime y+xy\\prime$.',['Treat both sides as functions of time.','Apply the product rule; neither side is assumed constant.'])];add('4.4',a)
a=[]
for expr,at,target in [(S.sqrt(x),4,S.Rational(41,10)),(S.log(x),1,S.Rational(11,10)),(S.exp(x),0,S.Rational(1,10)),(x**3,2,S.Rational(21,10)),(1/x,2,S.Rational(19,10)),(S.sin(x),0,S.Rational(1,20))]:
 f0=expr.subs(x,at);d=S.diff(expr,x).subs(x,at);lin=f0+d*(x-at);estimate=lin.subs(x,target)
 a.append(Q('Use linearization at '+M(at)+' to estimate '+M(S.latex(expr.subs(x,target)))+' for '+M('f(x)='+S.latex(expr))+'.',M(estimate),[M(f'f(a)={L(f0)},\\quad f\\prime(a)={L(d)}')+'.',M('L(x)='+S.latex(lin))+'.','Evaluate the tangent approximation at '+M(target)+': '+M(estimate)+'.']))
a += [Q('If f is concave up near a, does its tangent linearization overestimate or underestimate nearby f values?','Underestimate.',['A concave-up graph lies above its tangent locally.','The tangent-line value is therefore no greater than the nearby function value.']),Q('Linearize f(x) = x² at a = 0. Why is it a poor estimate of f(10)?','$L(x)=0$; 10 is far from the point of tangency.',['f(0) = 0 and f′(0) = 0.','Linearization is a local approximation; its error can grow away from a.'])];add('4.6',a)
a=[]
for expr,point in [(S.sin(2*x)/x,0),((S.exp(x)-1)/x,0),(S.log(x)/x,S.oo),((1-S.cos(x))/x**2,0),((S.exp(2*x)-1)/(S.exp(x)-1),0),(x/S.exp(x),S.oo)]:
 num,den=S.fraction(expr);val=S.limit(expr,x,point);ratio=S.diff(num,x)/S.diff(den,x)
 a.append(Q('Verify the indeterminate form and use L’Hospital’s Rule to evaluate '+M(S.Limit(expr,x,point))+'.',M(val),['The quotient has form '+('∞/∞.' if point==S.oo else '0/0.')+' The numerator and denominator are differentiable nearby.','Differentiate numerator and denominator separately to get '+M(ratio)+'.','Take its limit'+(' (apply the rule again if needed)' if num==1-S.cos(x) else '')+': '+M(val)+'.']))
a += [Q('Can L’Hospital’s Rule be used directly on $\\lim_{x\\to0}(1+x)/x$? Explain.','No. It is not an indeterminate quotient.',['The numerator tends to 1 while the denominator tends to 0.','The one-sided limits have opposite signs; differentiating would give a false finite answer.']),Q('A pupil differentiates x ln x as a quotient without rewriting it. Explain a valid way to find its limit as x → 0⁺.','Rewrite as ln x divided by 1/x; the limit is 0.',['The new quotient has form -∞/∞.','The derivative quotient is (1/x)/(-1/x²) = -x, whose right-hand limit is 0.'])];add('4.7',a)
# UNIT 5: hypotheses, sign analysis, sketches and optimization.
a=[]
for k in range(1,7):
 f=x*x+k*x;av=(f.subs(x,3)-f.subs(x,1))/2
 a.append(Q('Verify MVT applies to '+M('f(x)='+L(f))+' on [1, 3], and find every corresponding c in (1, 3).','$c=2$.',['The polynomial is continuous on [1, 3] and differentiable on (1, 3).','The secant slope is '+M(av)+'; set '+M(f'2c+{k}={L(av)}')+'.','Solving gives c = 2, which lies in the open interval.'],['Both MVT hypotheses','Correct secant/derivative equation','Valid interior c']))
a += [Q('Why does the MVT not apply to f(x) = |x| on [-1, 1], although the endpoint values agree?','It is not differentiable at 0.',['The function is continuous on the closed interval.','Its corner violates differentiability throughout the open interval.']),Q('If f′(x) = 0 for all x in (a, b), what does MVT imply about f there?','It is constant.',['For any two interior inputs, MVT equates their secant slope to a derivative value.','That value is zero, so the two outputs are equal.'])];add('5.1',a)
a=[]
for k in range(1,7):
 f=x**3-3*k*k*x
 a.append(Q('Find the critical numbers of '+M('f(x)='+L(f))+'. Does EVT guarantee extrema on [-'+str(k+1)+', '+str(k+1)+']?',M(f'x=\\pm{k}')+'; yes.',['Differentiate: '+M('f\\prime(x)='+L(S.diff(f,x)))+'.','Set the derivative to zero; it is defined everywhere, giving the two stated critical numbers.','The polynomial is continuous on the closed bounded interval, so EVT applies.']))
a += [Q('Does EVT guarantee an absolute maximum for f(x) = x on (0, 1)?','No; the interval is not closed.',['The function approaches 1 but never attains it.','EVT needs a continuous function on a closed bounded interval.']),Q('Is every critical number a local extremum? Give a counterexample.','No; f(x) = x³ has critical number 0 without an extremum.',['The derivative 3x² is zero at 0.','The function increases through 0, so no local maximum or minimum occurs.'])];add('5.2',a)
a=[]
for k in range(1,7):
 a.append(Q('A differentiable function satisfies '+M(f'f\\prime(x)=(x-{k})(x+1)')+'. Give its increasing and decreasing intervals, explaining signs.',f'Increasing on $(-\\infty,-1)$ and $({k},\\infty)$; decreasing on $(-1,{k})$.',['The derivative zeros split the line at -1 and '+str(k)+'.','Its signs are positive, negative, positive on the three intervals.','Positive derivative gives increasing behaviour; negative gives decreasing behaviour.'],['Correct breakpoints','Correct sign analysis','Correct monotonicity intervals']))
a += [Q('If f′(2) = 0, must f be constant on an interval around 2?','No.',['One zero derivative value is local information at a single point.','For f(x) = (x - 2)², the derivative is zero at 2 but the function changes nearby.']),Q('If f′(x) &lt; 0 on (a, b), compare f(u) and f(v) for a &lt; u &lt; v &lt; b.','$f(u)>f(v)$.',['MVT gives a secant slope equal to a negative derivative value.','Thus f(v) - f(u) is negative.'])];add('5.3',a)
a=[]
for k in range(1,7):
 a.append(Q('Use the First Derivative Test to classify critical numbers when '+M(f'f\\prime(x)=(x+{k})(x-{k})^2')+'.',f'Local minimum at x = -{k}; no extremum at x = {k}.',['The derivative is negative to the left of -'+str(k)+' and positive immediately to its right.','The squared factor does not change sign at '+str(k)+'.','A change from negative to positive gives a minimum; no sign change gives no extremum.']))
a += [Q('If f′ changes from positive to negative at c, what follows?','A local maximum at c, assuming f is continuous there.',['f increases into c.','It decreases after c, so nearby outputs are smaller.']),Q('Can a local extremum occur where f′ is undefined? Give an example.','Yes; f(x) = |x| has a local minimum at 0.',['The graph has a corner, so the derivative is undefined.','All nearby values are nonnegative and f(0) = 0.'])];add('5.4',a)
a=[]
for k in range(1,7):
 f=x*x-2*k*x;lo=0;hi=2*k+1;vals=[(v,f.subs(x,v)) for v in [lo,k,hi]];C('5.5 minimum '+str(k),f.subs(x,k),-k*k)
 a.append(Q('Use the Candidates Test to find absolute extrema of '+M('f(x)='+L(f))+' on '+M(f'[0,{hi}]')+'.',f'Minimum {M(-k*k)} at x = {k}; maximum {M(hi)} at x = {hi}.',['The continuous function has interior critical number '+str(k)+'.','Evaluate endpoints and critical number: '+', '.join(M(f'f({v})={L(w)}') for v,w in vals)+'.','Compare these values to choose the absolute minimum and maximum.'],['All candidate inputs','Correct candidate values','Both absolute extrema']))
a += [Q('Why must endpoints be checked when finding absolute extrema on [a, b]?','An absolute extremum can occur at an endpoint.',['The derivative-zero condition concerns interior extrema.','For f(x) = x on [0, 1], both absolute extrema are endpoints.']),Q('For f(x) = |x - 1| on [0, 3], list all candidates and identify the absolute extrema.','Candidates 0, 1, 3; minimum 0 at 1, maximum 2 at 3.',['Include the corner x = 1 and both endpoints.','The values are 1, 0 and 2, respectively.'])];add('5.5',a)
a=[]
for k in range(1,7):
 a.append(Q('Given '+M(f'f\\prime\\prime(x)=(x-{k})(x+1)')+', find concavity intervals and candidate inflection inputs. Assume f is twice differentiable.',f'Concave up outside [-1, {k}], concave down between; inflections at -1 and {k}.',['The second derivative zeros are -1 and '+str(k)+'.','Its signs on the resulting open intervals are positive, negative, positive.','Each zero has a sign change, so each is an inflection input.']))
a += [Q('Does f″(c) = 0 alone prove an inflection point?','No; concavity must change.',['For f(x) = x⁴, f″(0) = 0.','But f″(x) = 12x² is positive on both sides, so there is no inflection at 0.']),Q('If f′ is decreasing on an interval, what can be said about f’s concavity?','It is concave down.',['Concavity describes how tangent slopes change.','Decreasing slopes mean concave-down behaviour.'])];add('5.6',a)
a=[]
for k in range(1,7):
 f=x**3-3*k*k*x
 a.append(Q('Classify the stationary points of '+M('f(x)='+L(f))+' with the Second Derivative Test.',f'Local maximum at {M((-k,2*k**3))}; local minimum at {M((k,-2*k**3))}.',['Solve '+M('f\\prime(x)='+L(S.diff(f,x)))+' = 0 to get '+M(f'x=\\pm{k}')+'.',M('f\\prime\\prime(x)=6x')+' is negative at the negative critical number and positive at the positive one.','Insert both x-values into f to get the coordinates.']))
a += [Q('For f(x) = x⁴, what does the Second Derivative Test say at 0? Classify it another way.','The test is inconclusive; 0 is a local minimum.',['f′(0) = f″(0) = 0, so the test does not decide.','Since x⁴ ≥ 0 with equality at 0, it is a minimum.']),Q('Why must f′(c) = 0 be checked before applying the sign of f″(c) as an extremum test?','Concavity alone does not identify an extremum.',['Positive f″ means concave up, but the function could still be increasing.','A nonzero tangent slope rules out an interior differentiable extremum.'])];add('5.7',a)
a=[]
for k in range(1,7):
 f=(x-k%2)**2-k%3;d=S.diff(f,x);centre=k%2
 a.append(Q('Sketch f′ from the given quadratic graph '+M('f(x)='+L(f))+'. Label its zero and explain the signs.'+plot(S.lambdify(x,f,'math'),-2,3,-3,7),M('f\\prime(x)='+L(d))+'.'+plot(S.lambdify(x,d,'math'),-2,3,-5,6,name="f′"),['The tangent is horizontal at '+M(centre)+'.','To its left f decreases; to its right f increases.','The derivative is the increasing straight line '+M(d)+'.']))
a += [Q('A graph of f′ lies above the axis but slopes downward. Describe f and its concavity.','f is increasing and concave down.',['Positive f′ makes f increase.','Decreasing f′ means its tangent slopes fall, so f is concave down.']),Q('Can two functions with identical derivative graphs have different heights? Explain.','Yes; they can differ by a constant.',['Adding a constant shifts a graph vertically.','Differentiation removes that constant.'])];add('5.8',a)
a=[]
for k in range(1,7):
 signs=[(1,1),(1,-1),(-1,1),(-1,-1),(1,0),(-1,0)][k-1];u,v=signs
 a.append(Q('At x = '+str(k)+', '+M(f'f\\prime({k})={u*(k+1)},\\ f\\prime\\prime({k})={v*(k+2)}')+'. Describe the local direction and what this says about concavity. Assume derivatives are continuous nearby.',('Increasing' if u>0 else 'Decreasing')+'; '+('concave up nearby.' if v>0 else 'concave down nearby.' if v<0 else 'concavity is not determined by a zero second derivative alone.'),['Use the sign of the first derivative for direction.','Use a nonzero second-derivative sign for concavity.','A zero second derivative at one point alone does not determine nearby sign.']))
a += [Q('If f has a local minimum at c, must f″(c) be positive?','No.',['A positive second derivative is sufficient under the stationary-point test, not necessary.','For f(x) = x⁴ at 0, there is a minimum but f″(0) = 0.']),Q('A differentiable f has f′ = 0 throughout (1, 4). What can you infer about f and f″ there?','f is constant and f″ = 0 there.',['MVT implies constant f on that interval.','The derivative function is identically zero, whose derivative is zero.'])];add('5.9',a)
a=[]
for k in range(1,7):
 perimeter=20+4*k
 a.append(Q(f'A rectangle has perimeter {perimeter} m. Choose a variable and form a one-variable area function and its physical domain. Do not optimize yet.',M(f'A(x)=x({perimeter//2}-x),\\quad 0<x<{perimeter//2}'),['Let x be one side and y the other.','The constraint gives '+M(f'y={perimeter//2}-x')+'.','Substitute into A = xy; both side lengths must be positive.'],['Variables and objective','Correct use of constraint','One-variable model and domain']))
a += [Q('For an open-top box cut from a 20 cm by 30 cm sheet, express volume in terms of the corner-square side x and give its physical domain.','$V=x(20-2x)(30-2x)$, $0<x<10$.',['After folding, height is x and base sides are 20 - 2x and 30 - 2x.','Multiply the dimensions; require every dimension to be positive.']),Q('Why is the physical domain part of an optimization model?','It excludes impossible solutions and identifies relevant boundaries.',['A stationary point may lie outside feasible dimensions.','The objective must be compared only over physically allowed inputs.'])];add('5.10',a)
a=[]
for k in range(1,5):
 per=16+8*k;side=per//4
 a.append(Q(f'Find the largest possible area of a rectangle with perimeter {per} m. Justify the maximum.',f'A square of side {side} m; area {side*side} m².',['Set '+M(f'A=x({per//2}-x)')+' for positive dimensions.','Solve '+M(f'A\\prime={per//2}-2x=0')+' to get '+M(side)+'.','The second derivative is -2 and the area tends to 0 at the boundaries, so this is the absolute maximum.']))
a += [Q('A profit function is $P(q)=-q^2+12q-20$ for $0\\le q\\le10$. Find its maximum profit.','$16$ at q = 6.',['P′(q) = -2q + 12 vanishes at 6.','Compare P(0) = -20, P(6) = 16 and P(10) = 0.','The largest value is 16.']),Q('Find the point on y = x² closest to (0, 1/2).','(0, 0).',['Minimize squared distance D = x² + (x² - 1/2)² = x⁴ + 1/4.','This is at least 1/4 for every x.','Equality holds only at x = 0, so y = 0.']),Q('A stationary input gives a local minimum of an objective. Can it automatically solve a maximum problem?','No.',['The required extremum is a maximum, not a minimum.','Check other candidates and boundaries on the feasible domain.']),Q('Why may minimizing squared distance replace minimizing distance?','The square function preserves order for nonnegative distances.',['Distances are nonnegative.','Thus d₁ &lt; d₂ exactly when d₁² &lt; d₂², so the minimizing input is unchanged.'])];add('5.11',a)
a=[]
for k in range(1,7):
 R=k+1
 a.append(Q('For '+M(f'x^2+y^2={R*R}')+', find dy/dx and the horizontal and vertical tangent points.',M('y\\prime=-x/y')+f'; horizontal (0, ±{R}), vertical (±{R}, 0).',['Implicit differentiation gives 2x + 2y y′ = 0.','Horizontal tangents require x = 0 and y ≠ 0; substitute into the relation.','Vertical tangents occur at y = 0, x ≠ 0; check on the circle.']))
a += [Q('For $x^2+y^2=25$, show that the upper branch is concave down.',"$y''=-25/y^3<0$ when y > 0.",['Differentiate y′ = -x/y using the quotient rule.','Replace y′ and use x² + y² = 25 to obtain y″ = -25/y³.','Its sign is negative on the upper branch.']),Q('If an implicit derivative has numerator and denominator both zero at a point, may the tangent be classified just from that fraction?','No.',['The quotient is indeterminate there.','Examine the local branches or another parametrization before drawing a conclusion.'])];add('5.12',a)
# UNIT 6: numerical/graphical accumulation, FTC, properties and improper integrals.
a=[]
for k in range(1,7):
 rate=k*t+2;val=S.integrate(rate,(t,0,3));initial=20+k
 a.append(Q('A tank initially holds '+str(initial)+' L. Its net inflow is '+M(f'r(t)={k}t+2')+' L/min for 0 ≤ t ≤ 3. Find its volume at minute 3.',M(initial+val)+' L.',['Change in volume is the integral of net rate.',M(f'\\Delta V=\\int_0^3({k}t+2)\\,dt={L(val)}')+' L.','Add the initial amount: '+M(initial+val)+' L.'],['Integral model for change','Correct accumulated change','Initial amount included with units']))
a += [Q('A signed rate graph has area 12 above the axis and 5 below it on [0, 4]. Find net change and total accumulated magnitude.','Net change 7; total magnitude 17.',['Net change subtracts the negative region: 12 - 5.','Total magnitude adds both magnitudes: 12 + 5.']),Q('Why does an integral of a rate give change, rather than automatically giving a final amount?','The integral accumulates rate × time increments.',['Those increments sum to net change.','The initial amount must also be supplied to determine a final amount.'])];add('6.1',a)
a=[]
for k,method in enumerate(['left','right','midpoint','trapezoidal','left','right'],1):
 f=x*x+k;nn=2 if k<=4 else 4;dx=S.Rational(2,nn)
 if method=='left':pts=[i*dx for i in range(nn)];val=dx*sum(f.subs(x,p) for p in pts)
 elif method=='right':pts=[(i+1)*dx for i in range(nn)];val=dx*sum(f.subs(x,p) for p in pts)
 elif method=='midpoint':pts=[(i+S.Rational(1,2))*dx for i in range(nn)];val=dx*sum(f.subs(x,p) for p in pts)
 else:pts=[i*dx for i in range(nn+1)];val=dx*(f.subs(x,0)/2+sum(f.subs(x,p) for p in pts[1:-1])+f.subs(x,2)/2)
 a.append(Q('Approximate '+M(f'\\int_0^2({L(f)})\\,dx')+f' using a {method} sum with {nn} equal subintervals.',M(val),['The common width is '+M(dx)+'.','Use '+method+' sample points (half weights at the endpoints for trapezoids).','Sum weighted function values and multiply by the width to get '+M(val)+'.'],['Correct widths and sampling rule','Correct function values/weights','Correct approximation']))
a += [Q('For an increasing f, compare left and right Riemann sums with its exact integral.','Left is an underestimate; right is an overestimate.',['On each subinterval the left endpoint has the least function value.','The right endpoint has the greatest function value.']),Q('For a concave-up graph, explain the bias in the trapezoidal approximation.','It overestimates.',['Each secant segment lies above the graph on its subinterval.','The trapezoid areas therefore exceed the exact signed integral contributions.'])];add('6.2',a)
a=[]
for k in range(1,7):
 aa=k-2;bb=k+1;f=x*x+k;delta=bb-aa
 a.append(Q('Write '+M(f'\\int_{{{aa}}}^{{{bb}}}(x^2+{k})\\,dx')+' as a limit of right-endpoint Riemann sums. Define the width and sample points.',M(f'\\lim_{{n\\to\\infty}}\\sum_{{i=1}}^n\\left[\\left({aa}+\\frac{{{delta}i}}n\\right)^2+{k}\\right]\\frac{{{delta}}}n'),[M(f'\\Delta x=\\frac{{{delta}}}n')+'.',M(f'x_i={aa}+\\frac{{{delta}i}}n')+'.','Sum f(xᵢ)Δx and take the limit as the partition width tends to zero.']))
a += [Q('Express $\\lim_{n\\to\\infty}\\sum_{i=1}^n(1+2i/n)^3(2/n)$ as a definite integral.','$\\int_1^3x^3\\,dx$.',['The width 2/n gives an interval of length 2.','The sample points 1 + 2i/n identify [1, 3] and the integrand x³.']),Q('What is lost if the factor Δx is omitted from a Riemann sum?','It no longer sums the small signed areas.',['f(xᵢ) gives height; Δx gives width.','The product is needed to represent each area contribution and its units.'])];add('6.3',a)
a=[]
for k in range(1,7):
 upper=x if k%2 else x*x;integrand=t*t+k;d=(upper*upper+k)*S.diff(upper,x)
 a.append(Q('Differentiate '+M(f'F(x)=\\int_1^{{{S.latex(upper)}}}(t^2+{k})\\,dt')+' without first evaluating the integral.',M('F\\prime(x)='+L(d)),['The integrand is continuous.','FTC evaluates it at the upper limit: '+M(upper**2+k)+'.','Multiply by the derivative of the upper limit: '+M(S.diff(upper,x))+'.'],['FTC conditions and use','Correct substitution of upper limit','Correct chain-rule factor']))
a += [Q('Find $G\\prime(x)$ if $G(x)=\\int_x^3\\cos(t^2)\\,dt$.','$-\\cos(x^2)$.',['Reverse the limits to place x at the top, adding a minus sign.','Apply FTC to the resulting accumulation function.']),Q('If $F(x)=\\int_0^xf(t)\\,dt$ with continuous f, must F(0) equal f(0)?','No; F(0) = 0 regardless of f(0).',['An integral over a zero-length interval is zero.','FTC gives F′(0) = f(0), which is a derivative statement.'])];add('6.4',a)
a=[]
for k in range(1,7):
 a.append(Q('Let '+M(f'A(x)=\\int_0^x(t-{k})\\,dt')+'. Find where A increases, decreases and has a local extremum. State its concavity.',f'Decreases before {k}, increases after {k}; minimum at {k}; concave up everywhere.',['FTC gives '+M(f'A\\prime(x)=x-{k}')+'.','Its sign changes from negative to positive at '+str(k)+'.','Since A″ = 1, A is concave up everywhere.']))
a += [Q('If A(x) is an integral accumulation of f and f crosses the axis from positive to negative at c, classify A at c.','A has a local maximum at c.',['A′ = f by FTC.','The derivative changes from positive to negative.']),Q('If f is positive but decreasing, describe an accumulation function A with A′ = f.','A increases and is concave down.',['A′ is positive.','A″ = f′ is negative.'])];add('6.5',a)
a=[]
for k in range(1,7):
 a.append(Q('Given '+M(f'\\int_0^2 f(x)\\,dx={k},\\quad\\int_2^5 f(x)\\,dx={k+3}')+', find '+M('\\int_5^0 2f(x)\\,dx')+'.',M(-4*k-6),['Add adjacent integrals to get '+M(2*k+3)+'.','Reversing the limits changes the sign.','Multiplying the integrand by 2 gives '+M(-4*k-6)+'.'],['Interval additivity','Reversal of limits','Constant multiple']))
a += [Q('If $\\int_0^1f(x)\\,dx=2$ and $\\int_0^1g(x)\\,dx=3$, must $\\int_0^1fg\\,dx=6$?','No.',['The integral is linear for sums and scalar multiples, not products.','For constants f = 2 and g = 6x, it happens to be 6, but f = 4x and g = 6x have the same individual integrals and product integral 8.']),Q('If f is odd and integrable on [-a, a], what is its integral? Explain.','Zero.',['The two sides have equal and opposite signed areas.','The substitution x = -t pairs cancelling contributions.'])];add('6.6',a)
a=[]
for k,power in enumerate([2,3,S.Rational(1,2),1,4,S.Rational(3,2)],1):
 conv=power>1;val=1/(power-1) if conv else S.oo
 a.append(Q('Determine convergence of '+M(S.Integral(x**(-power),(x,1,S.oo)))+' and evaluate it when convergent.',M(val) if conv else 'Divergent.', ['Replace the infinite endpoint by b and take b → ∞.','Use '+('ln x for exponent -1.' if power==1 else M(x**(1-power)/(1-power))+' as an antiderivative.'),'The endpoint limit '+('is finite, giving '+M(val)+'.' if conv else 'is unbounded, so the integral diverges.')],['Correct improper limit','Correct finite-interval antiderivative','Convergence and value']))
a += [Q('Does $\\int_{-1}^1 1/x\\,dx=0$ by odd symmetry? Explain.','No; the improper integral diverges.',['Split at the interior singularity x = 0.','Each one-sided improper integral must converge separately; they do not. Symmetric cancellation is only a principal value.']),Q('Evaluate $\\int_0^1 x^{-1/2}\\,dx$ as an improper integral.','$2$.',['Use the limit of the integral from ε to 1 as ε → 0⁺.','The antiderivative 2√x gives 2 - 2√ε → 2.'])];add('6.13',a)
a=[]
integrals=[
 (2*x*S.exp(x*x),'$e^{x^2}+C$',['Set u = x², so du = 2x dx.','The integral becomes ∫eᵘdu = eᵘ + C.','Substitute u = x² to obtain the stated result.']),
 (x*S.exp(x),'$(x-1)e^x+C$',['Choose u = x and dv = eˣdx, so du = dx and v = eˣ.','Integration by parts gives xeˣ - ∫eˣdx.','Integrate and factor to get (x - 1)eˣ + C.']),
 (1/(x*x+1),'$\\arctan x+C$',['Recognize the standard inverse-tangent derivative.','The denominator is 1 + x² with numerator 1.','Thus arctan x + C is an antiderivative on all real inputs.']),
 (1/(x*(x+1)),'$\\ln|x|-\\ln|x+1|+C$',['Decompose as 1/x - 1/(x + 1).','Integrate each term logarithmically, using absolute values.','The result is valid on each interval excluding -1 and 0.']),
 ((x*x+1)/(x+1),'$x^2/2-x+2\\ln|x+1|+C$',['Polynomial division gives x - 1 + 2/(x + 1).','Integrate term by term: x²/2 - x + 2 ln|x + 1| + C.','Use intervals excluding x = -1, where the original quotient is undefined.']),
 (S.cos(3*x),'$\\sin(3x)/3+C$',['Set u = 3x, so dx = du/3.','The integral becomes ⅓∫cos u du = ⅓ sin u + C.','Replace u by 3x; differentiating confirms the result.'])]
for expr,answer,steps in integrals:
 F=S.integrate(expr,x);C('6.14 integral '+str(expr),S.diff(F,x),expr)
 a.append(Q('Select a technique and find '+M(S.Integral(expr,x))+'. State any domain restriction.',answer,steps,['Suitable integration technique','Correct antiderivative','Verification or domain condition']))
a += [Q('For $\\int x/(x^2+4)\\,dx$, why is substitution preferable to parts?','$u=x^2+4$ has differential $du=2x\\,dx$; the result is $\\tfrac12\\ln(x^2+4)+C$.',['The numerator is a constant multiple of the denominator’s derivative.','This changes the integral to ½∫du/u.']),Q('A rational integrand has numerator degree greater than denominator degree. What should usually be done before partial fractions?','Polynomial division.',['Rewrite as a polynomial plus a proper rational function.','Integrate the polynomial and decompose the remaining proper fraction.'])];add('6.14',a)
# UNIT 7: models, verification, slope fields and logistic interpretation.
a=[]
models=[('Population grows at 3% of its size per day.','P','0.03P','days'),('A substance decays at 8% of its mass per hour.','M','-0.08M','hours'),('Temperature T cools at a rate proportional to T - 20, with constant 0.2.','T','-0.2(T-20)','minutes'),('Water volume grows at a constant 5 L/min.','V','5','minutes'),('A population grows proportionally to P(1000 - P), with constant 0.001.','P','0.001P(1000-P)','days'),('A particle has acceleration 6t metres per second squared.','v','6t','seconds')]
for text,v,rhs,unit in models:
 a.append(Q(text+' Write a differential equation and identify the independent variable and a needed initial condition.',M(f'\\frac{{d{v}}}{{dt}}={rhs}')+f', with t in {unit}.',['Choose t as the time variable.','Translate the stated rate directly into the derivative equation.','A value of '+v+' at a specified time is needed to select one solution.']))
a += [Q('Why does “rate proportional to amount” lead to y′ = ky rather than y = kt?','The proportionality concerns the rate.',['Write derivative = constant × current amount.','The equation y = kt would instead impose a constant derivative k.']),Q('A model has P′ = kP(500 - P), k > 0. What equilibria follow without solving it?','$P=0$ and $P=500$.',['At equilibrium the derivative is zero.','Set each factor on the right to zero.'])];add('7.1',a)
a=[]
for k in range(1,7):
 f=k*S.exp(2*x);C('7.2 solution '+str(k),S.diff(f,x),2*f)
 a.append(Q('Verify that '+M('y='+L(f))+' solves y′ = 2y and state its initial value at x = 0.','It solves the equation, with '+M(f'y(0)={k}')+'.',['Differentiate to get '+M('y\\prime='+L(S.diff(f,x)))+'.','The right side 2y gives the same expression.','At x = 0 the exponential is 1, so the initial value is '+str(k)+'.']))
a += [Q('Does y = x² + 1 solve y′ = 2xy? Show a comparison.','No, not as an identity.',['The left side is 2x.','The right side is 2x(x² + 1), which differs except at isolated inputs.']),Q('Verify y = 0 for y′ = y(1 - y). Why might it be missed when separating variables?','It is an equilibrium solution.',['Both sides are identically zero.','Dividing by y excludes it, so it must be checked separately.'])];add('7.2',a)
def field(fn,blank=False):
 svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 145"><path d="M20 75H205 M110 15V133" fill="none" stroke="#adbdb6"/>'
 for aa in [-1,0,1]:
  for bb in [-1,0,1]:
   xx=110+aa*60;yy=75-bb*45
   if blank:svg+=f'<circle cx="{xx}" cy="{yy}" r="1.8" fill="#146d65"/>'
   else:
    m=fn(aa,bb);dx=12/math.sqrt(1+m*m);dy=m*dx*.75
    svg+=f'<path d="M{xx-dx:.2f},{yy+dy:.2f}L{xx+dx:.2f},{yy-dy:.2f}" stroke="#146d65" stroke-width="1.8"/>'
 svg+='<text x="198" y="89" font-size="11">x</text><text x="117" y="16" font-size="11">y</text>'
 for aa in [-1,1]:svg+=f'<text x="{110+aa*60}" y="91" font-size="10">{aa}</text><text x="91" y="{78-aa*45}" font-size="10">{aa}</text>'
 return svg+'</svg>'
a=[]
fields=[('x+y',lambda a,b:a+b),('x-y',lambda a,b:a-b),('y',lambda a,b:b),('1-y',lambda a,b:1-b)]
for eq,fn in fields:
 slopes=[fn(aa,bb) for bb in [1,0,-1] for aa in [-1,0,1]]
 a.append(Q('Sketch slope segments for '+M('y\\prime='+eq)+' at the nine marked inputs (x, y = -1, 0, 1).'+field(fn,True),'The completed slope field is shown.'+field(fn),['Substitute each grid point into the differential equation.','Use the resulting slope for a short segment centred on that point.','Rows y = 1, 0, -1 have slopes (left to right): '+str(slopes[0:3])+', '+str(slopes[3:6])+', '+str(slopes[6:9])+'.']))
a += [Q('In the field below, identify a differential equation from y′ = x or y′ = y. Explain.'+field(lambda a,b:a),'$y\\prime=x$.',['Slopes are identical along a vertical column.','They depend on x rather than on the row’s y-coordinate.']),Q('For y′ = x + y, give slopes at (0, 1), (1, 0) and (-1, 1). Where are segments horizontal?','Slopes 1, 1, 0; horizontal along y = -x.',['Substitute the coordinates in x + y.','Set the slope expression to zero to get y = -x.']),Q('Does a slope field give the height of one particular solution without an initial condition?','No.',['The field specifies local slopes at many points.','An initial point selects a particular solution curve, when uniqueness applies.']),Q('What distinguishes the segment at (1, 2) for y′ = x from that for y′ = y?','Their slopes are 1 and 2, respectively.',['The first equation uses the x-coordinate.','The second uses the y-coordinate.'])];add('7.3',a)
a=[]
for k in range(1,7):
 a.append(Q('For '+M(f'y\\prime={k}-y')+', describe solution behaviour above and below y = '+str(k)+'. Is the equilibrium stable?',f'Above {k}, solutions decrease; below {k}, they increase. The equilibrium is stable.',['At y = '+str(k)+' the derivative is zero.','Above that line the slope is negative; below it the slope is positive.','The slope arrows point towards equilibrium, indicating stability.']))
a += [Q('For y′ = y(1 - y), describe a solution starting at y = 2 without finding its formula.','It decreases towards y = 1 as time increases.',['For y > 1 the right side is negative.','The stable equilibrium y = 1 is approached; uniqueness prevents crossing it.']),Q('If y′ = x + y, derive a formula for y″ and use it at (0, 1) to determine local concavity.','$y\\prime\\prime=1+x+y$; concave up at (0, 1).',['Differentiate with respect to x: y″ = 1 + y′.','Substitute y′ = x + y, then (0, 1), giving 2 > 0.'])];add('7.4',a)
a=[]
for k in range(1,7):
 cap=100*k;r=S.Rational(k,10);maxrate=r*cap/4
 a.append(Q('A positive population follows '+M(f'P\\prime={L(r)}P(1-\\frac{{P}}{{{cap}}})')+'. State its carrying capacity, the population giving fastest growth, and the maximum growth rate.',f'Capacity {cap}; fastest at {cap//2}; maximum '+M(maxrate)+' population units per time unit.',['The positive equilibrium is '+str(cap)+'.','The rate is a concave-down quadratic in P, maximized at half the carrying capacity.','Substitute '+str(cap//2)+' into the rate to obtain '+M(maxrate)+'.']))
a += [Q('For P′ = 0.1P(1 - P/500), what happens if P(0) = 700?','P decreases towards 500.',['Above carrying capacity the factor 1 - P/500 is negative.','The positive equilibrium 500 is stable.']),Q('Does logistic growth keep increasing at its fastest rate as P approaches its carrying capacity?','No; its growth rate tends to zero.',['The limiting population is the carrying capacity.','The factor 1 - P/K tends to zero, so P′ tends to zero.'])];add('7.9',a)
# UNIT 8: applications and cross-sections.
a=[]
for k in range(1,7):
 f=x*x+k;val=S.integrate(f,(x,0,3))/3;C('8.1 average '+str(k),val,k+3)
 a.append(Q('Find the average value of '+M('f(x)='+L(f))+' on [0, 3], and an interior input where f takes that value.',M(val)+'; '+M('c=\\sqrt3')+'.',['Average value is '+M('\\frac1{3-0}\\int_0^3f(x)\\,dx')+'.','Evaluate the integral to get '+M(3*k+9)+' and divide by 3.','Solve '+M(f'c^2+{k}={k+3}')+'; the positive root lies in (0, 3).']))
a += [Q('Is average value the same as the average of the two endpoint values? Give a counterexample.','Not generally.',['For f(x) = x² on [0, 1], average value is 1/3.','The average of endpoint values is 1/2.']),Q('A continuous f has integral 12 on [2, 6]. Explain why f(c) = 3 for some c in (2, 6).','Its average value is 12/4 = 3, attained by the average-value theorem for integrals.',['Divide the integral by interval length.','Continuity guarantees an interior input with this average output.'])];add('8.1',a)
a=[]
for k in range(1,7):
 v=k*(t-1);dis=S.integrate(v,(t,0,3));dist=-S.integrate(v,(t,0,1))+S.integrate(v,(t,1,3));C('8.2 distance '+str(k),dist,S.Rational(5*k,2))
 a.append(Q('A particle starts at position '+str(k)+' m and has velocity '+M(f'v(t)={k}(t-1)')+' m/s on [0, 3]. Find its final position and total distance.',M(k+dis)+' m; '+M(dist)+' m.', ['Integrate v over [0, 3] to get displacement '+M(dis)+' m.','Add the starting position to get '+M(k+dis)+' m.','Velocity changes sign at 1; integrate |v| on the two pieces to get '+M(dist)+' m.']))
a += [Q('Can total distance equal the absolute displacement? State when.','Yes, when velocity does not change sign over the interval (apart from zeros).',['Displacement integrates signed velocity.','Without reversal, the absolute integral equals the integral of speed.']),Q('A particle has zero net displacement on [0, 5]. Must its total distance be zero?','No.',['Positive and negative displacements can cancel.','A trip away and back has zero net displacement but positive distance.'])];add('8.2',a)
a=[]
for k in range(1,7):
 initial=50+10*k;inrate=k*t+8;outrate=2*t+3;net=inrate-outrate;change=S.integrate(net,(t,0,4))
 a.append(Q('A tank starts with '+str(initial)+' L. Inflow is '+M(f'{k}t+8')+' L/min and outflow is '+M('2t+3')+' L/min for 0 ≤ t ≤ 4. Find the volume at t = 4.',M(initial+change)+' L.',['Use net rate = inflow minus outflow: '+M(net)+'.','The net change is '+M(S.Integral(net,(t,0,4)))+' = '+M(change)+' L.','Add the initial volume to obtain '+M(initial+change)+' L.']))
a += [Q('A rate is in kilograms per hour and time is in minutes in a table. What must be corrected before numerical integration?','Use consistent time units.',['Convert the minute widths to hours, or convert the rate to kg/min.','Then rate × time gives accumulated kilograms.']),Q('If A(2) = 15 and A′(t) = 3t², find A(4).','$71$.',['Net change is ∫₂⁴3t²dt = [t³]₂⁴ = 56.','Add A(2) = 15 to get 71.'])];add('8.3',a)
a=[]
for k in range(1,7):
 upper=k*x;lower=x*x;area=S.integrate(upper-lower,(x,0,k));C('8.4 area '+str(k),area,S.Rational(k**3,6))
 a.append(Q('Find the bounded area between '+M(f'y={k}x')+' and y = x². Determine the intersections first.',M(area)+' square units.',['Solve x² = '+str(k)+'x to get x = 0 and x = '+str(k)+'.','The line is above the parabola between these inputs.','Integrate '+M(f'\\int_0^{k}({k}x-x^2)\\,dx')+' to get '+M(area)+'.']))
a += [Q('Why must the upper curve be identified before integrating a vertical area strip?','Area uses upper output minus lower output.',['The difference is the strip’s nonnegative height.','Reversing that order produces a negative signed integral.']),Q('Find the area between y = x and y = -x on [0, 2].','$4$ square units.',['The upper-minus-lower difference is 2x.','Its integral from 0 to 2 is [x²]₀² = 4.'])];add('8.4',a)
a=[]
for k in range(1,7):
 area=S.Rational(k**3,6)
 a.append(Q('Find the bounded area between '+M(f'x={k}y')+' and x = y² using horizontal strips.',M(area)+' square units.',['The intersection y-values are 0 and '+str(k)+'.','On that interval the line is the right boundary and y² is the left boundary.','Integrate '+M(f'\\int_0^{k}({k}y-y^2)\\,dy={L(area)}')+'.']))
a += [Q('When integrating an area with respect to y, which curve difference is required?','Right x-coordinate minus left x-coordinate.',['A horizontal strip’s width is measured in the x-direction.','Multiply that width by dy and integrate over y-values.']),Q('Find the area between x = 4 and x = y² for -2 ≤ y ≤ 2.','$32/3$ square units.',['The horizontal width is 4 - y².','Integrate it over [-2, 2]: [4y - y³/3]₋₂² = 32/3.'])];add('8.5',a)
a=[]
for k in range(1,7):
 f=x**3-k*k*x;area=-S.integrate(f,(x,0,k))+S.integrate(f,(x,-k,0));C('8.6 split area '+str(k),area,S.Rational(k**4,2))
 a.append(Q('Find the total bounded area between '+M('y='+L(f))+' and the x-axis. Explain the split at intersections.',M(area)+' square units.',['The curve crosses at '+M(f'x=-{k},0,{k}')+'.','It is positive on the left bounded interval and negative on the right.','Add the integrals of the nonnegative strip heights; by symmetry the result is '+M(area)+'.']))
a += [Q('Why does integrating an odd curve across a symmetric interval not necessarily give its total enclosed area?','Signed contributions can cancel.',['The integral of an odd function on [-a, a] is zero.','Total area instead integrates its absolute value, splitting at sign changes.']),Q('Find total area between y = x and y = x³ on [-1, 1].','$1/2$ square unit.',['The order switches at x = 0.','Twice ∫₀¹(x - x³)dx = 2(1/2 - 1/4) = 1/2.'])];add('8.6',a)
a=[]
for k in range(1,7):
 rectangle=k%2==0;factor=2 if rectangle else 1;vol=S.Rational(factor*k*k,3)
 a.append(Q('A solid has base 0 ≤ y ≤ '+M(f'{k}x')+', 0 ≤ x ≤ 1. Sections perpendicular to the x-axis are '+('rectangles with height twice their base segment.' if rectangle else 'squares.')+' Find its volume.',M(vol)+' cubic units.',['The base segment length is '+M(f's={k}x')+'.','The section area is '+M(f'{factor}({k}x)^2')+'.','Integrate section area from x = 0 to 1 to obtain '+M(vol)+'.']))
a += [Q('For a base between y = x² and y = 2x on [0, 2], write the volume integral for square cross-sections perpendicular to x.','$V=\\int_0^2(2x-x^2)^2\\,dx=16/15$.',['The square side is upper minus lower: 2x - x².','Square it and integrate; expansion gives 4x² - 4x³ + x⁴ and the value 16/15.']),Q('Why is the base-region area not itself the solid’s volume?','It lacks the cross-sectional height information.',['The base segment determines a section dimension.','The section area, not just the segment length, must be integrated.'])];add('8.7',a)
a=[]
for k in range(1,7):
 tri=k%2==1;coef=S.sqrt(3)/4 if tri else S.pi/8;vol=coef*k*k/3
 a.append(Q('The base is 0 ≤ y ≤ '+M(f'{k}x')+', 0 ≤ x ≤ 1. Perpendicular sections are '+('equilateral triangles with that segment as side.' if tri else 'semicircles with that segment as diameter.')+' Find volume.',M(vol)+' cubic units.',['The segment length is '+M(f's={k}x')+'.','The section area is '+M(coef)+' times '+M('s^2')+'.','Integrate the area over [0, 1] to obtain '+M(vol)+'.']))
a += [Q('A segment of length s is a semicircle’s diameter. Explain why its area is πs²/8, not πs²/2.','Its radius is s/2.',['Semicircle area is ½πr².','Substitute r = s/2 to get πs²/8.']),Q('Compare equilateral-triangle and square cross-section volumes for the same side segments and integration interval.','Triangle volume is √3/4 times square volume.',['Their areas are √3s²/4 and s².','The constant area factor can be taken outside the integral.'])];add('8.8',a)
a=[]
for k in range(1,7):
 vol=S.pi*S.integrate((x+k)**2,(x,0,2))
 a.append(Q('The region between y = x and '+M(f'y=-{k}')+' for 0 ≤ x ≤ 2 is rotated about '+M(f'y=-{k}')+'. Find volume using discs.',M(vol)+' cubic units.',['The radius is the vertical distance to the axis: '+M(f'R=x+{k}')+'.','The cross-sectional area is '+M(f'\\pi(x+{k})^2')+'.','Integrate from 0 to 2 to get '+M(vol)+'.']))
a += [Q('The region between x = y² and x = -1, for 0 ≤ y ≤ 1, rotates about x = -1. Find its volume.','$28\\pi/15$ cubic units.',['Use horizontal discs with radius y² + 1.','Integrate π∫₀¹(y² + 1)²dy = π(1/5 + 2/3 + 1).']),Q('Why does rotating around y = -3 require a radius measured from -3 rather than from 0?','A radius is distance from the actual rotation axis.',['For an upper curve y = f(x), that distance is f(x) + 3.','Using f(x) would describe a different axis and a different solid.'])];add('8.10',a)
a=[]
for k in range(1,7):
 vol=S.pi*S.integrate((2+k)**2-(x+k)**2,(x,0,2));C('8.12 washer '+str(k),vol,S.pi*(S.Rational(16,3)+4*k))
 a.append(Q('Rotate the region between y = 2 and y = x, 0 ≤ x ≤ 2, about '+M(f'y=-{k}')+'. Find its volume.',M(vol)+' cubic units.',['Outer radius is '+M(k+2)+'; inner radius is '+M(f'x+{k}')+'.','Subtract squared radii: '+M(f'V=\\pi\\int_0^2[({k+2})^2-(x+{k})^2]\\,dx')+'.','Evaluate the integral to obtain '+M(vol)+'.']))
a += [Q('Rotate 1 ≤ x ≤ 2 and 0 ≤ y ≤ 1 about x = 0. Find volume with horizontal washers.','$3\\pi$ cubic units.',['For each y the radii are 2 and 1.','Integrate π(4 - 1) over y ∈ [0, 1].']),Q('A pupil uses R - r instead of R² - r² for a washer’s area. Explain the dimensional and geometric error.','R - r is a length, not an area.',['The washer removes one disc from another.','Its area is πR² - πr².'])];add('8.12',a)
a=[]
for k in range(1,5):
 length=2*S.sqrt(1+k*k)
 a.append(Q('Find the arc length of '+M(f'y={k}x+1')+' on [0, 2]. Confirm it by a distance calculation.',M(length),['The derivative is the constant '+str(k)+'.','Arc length is '+M(f'\\int_0^2\\sqrt{{1+{k*k}}}\\,dx={L(length)}')+'.','The endpoints differ horizontally by 2 and vertically by '+str(2*k)+', giving the same Pythagorean length.']))
a += [Q('Find the length of $y=\\tfrac23x^{3/2}$ on [0, 3].','$14/3$.',['The derivative is √x.','Integrate √(1 + x): [⅔(1 + x)³ᐟ²]₀³ = 14/3.']),Q('A particle moves along a curve with speed $\\sqrt{1+t^2}$ for 0 ≤ t ≤ 2. Write a definite integral for its distance; evaluation is not required.','$\\int_0^2\\sqrt{1+t^2}\\,dt$.',['Distance integrates nonnegative speed.','Use the given time endpoints without adding an initial position.']),Q('Why is $\\int_a^b f\\prime(x)\\,dx$ generally not a curve’s arc length?','It measures net vertical change.',['Arc length combines horizontal and vertical increments.','The correct graph-length integrand is √(1 + (f′)²).']),Q('Can a curve’s length be smaller than the straight-line distance between its endpoints? Explain.','No.',['A straight segment is the shortest connection.','Any bends add path length; equality holds for a straight path without reversal.'])];add('8.13',a)
# UNIT 9: vector and parametric processes; intersections of polar boundaries.
a=[]
for k in range(1,7):
 a.append(Q('Find the arc length of '+M(f'x={k}\\cos t,\\quad y={k}\\sin t')+' for 0 ≤ t ≤ π/2.',M(k*S.pi/2),['Differentiate both components: x′ = -'+str(k)+' sin t and y′ = '+str(k)+' cos t.','Speed is '+M(f'\\sqrt{{{k*k}\\sin^2t+{k*k}\\cos^2t}}={k}')+'.','Integrate speed over [0, π/2] to get '+M(k*S.pi/2)+'.']))
a += [Q('Why must parametric length use $\\sqrt{(x\\prime)^2+(y\\prime)^2}$ rather than dy/dx?','dy/dx is a slope, not a speed.',['Speed combines both coordinate rates by Pythagoras.','Integrating speed counts path length per parameter increment.']),Q('For x = t², y = 0 on [-1, 1], find travelled length and endpoint displacement magnitude.','Length 2; displacement magnitude 0.',['Speed is |2t|, so split the integral at 0 to obtain 2.','Both endpoints are (1, 0), giving zero net displacement.'])];add('9.3',a)
a=[]
for k in range(1,7):
 a.append(Q('For '+M(f'\\mathbf r(t)=\\langle {k}t^2,t^3-{k}\\rangle')+', find velocity, acceleration and speed at t = 1.',M(f'\\mathbf v(1)=\\langle {2*k},3\\rangle,\\quad\\mathbf a(1)=\\langle {2*k},6\\rangle')+'; speed '+M(S.sqrt(4*k*k+9))+'.',['Differentiate each component to form the velocity vector.','Differentiate again for acceleration, then evaluate both at 1.','Speed is the magnitude of velocity: '+M(S.sqrt(4*k*k+9))+'.']))
a += [Q('Can zero velocity in one coordinate alone mean a vector-valued particle is at rest?','No.',['Every velocity component must be zero at rest.','For v = ⟨0, 3⟩ the speed is 3, not zero.']),Q('For r(t) = ⟨cos t, sin t⟩, show speed is constant although velocity changes.','Speed is 1.',['Velocity is ⟨-sin t, cos t⟩.','Its magnitude is √(sin²t + cos²t) = 1; direction changes with t.'])];add('9.4',a)
a=[]
for k in range(1,7):
 a.append(Q('A particle has '+M(f'\\mathbf v(t)=\\langle {k}t,3t^2\\rangle')+' and '+M(f'\\mathbf r(0)=\\langle {k},-1\\rangle')+'. Find its position vector.',M(f'\\mathbf r(t)=\\langle {k}+\\frac{{{k}}}2t^2,t^3-1\\rangle'),['Integrate each velocity component.','Use r(0) to determine the two integration constants.','Differentiate the position to check the given velocity.']))
a += [Q('Why does integrating a two-component velocity require two constants?','Each component has its own antiderivative constant.',['The initial x-coordinate determines one.','The initial y-coordinate determines the other.']),Q('A vector displacement is ⟨3, -4⟩. Can total travelled distance be inferred as exactly 5?','No; 5 is the displacement magnitude and a lower bound on distance.',['The path may bend or reverse.','Integrate speed to find actual distance; a straight unidirectional path gives equality.'])];add('9.5',a)
a=[]
for k in range(1,7):
 a.append(Q('A particle follows '+M(f'\\mathbf r(t)=\\langle {k}t,t^2\\rangle')+' for 0 ≤ t ≤ 2. Find displacement, speed at t = 1, and a distance integral (do not evaluate it).',M(f'\\Delta\\mathbf r=\\langle {2*k},4\\rangle')+'; speed '+M(S.sqrt(k*k+4))+'; '+M(f'\\int_0^2\\sqrt{{{k*k}+4t^2}}\\,dt')+'.',['Subtract endpoint positions for displacement.','Velocity is '+M(f'\\langle {k},2t\\rangle')+'; its magnitude at 1 is '+M(S.sqrt(k*k+4))+'.','Integrate the nonnegative velocity magnitude over the time interval.']))
a += [Q('If v(t) · a(t) is positive and speed is nonzero, is the particle speeding up or slowing down?','Speeding up.',['The derivative of speed² is 2v · a.','A positive derivative of positive speed² means speed is increasing.']),Q('For r(t) = ⟨cos t, sin t⟩ on [0, 2π], find displacement and distance.','Displacement ⟨0, 0⟩; distance 2π.',['The endpoint positions agree.','Speed is 1, so its integral over the full period is 2π.'])];add('9.6',a)
a=[]
for k in range(1,7):
 # Common interior of the disk r<=k and the right half-disk r<=2k cos(theta).
 area=k*k*(2*S.pi/3-S.sqrt(3)/2)
 a.append(Q('Find the area inside both '+M(f'r={k}')+' and '+M(f'r={2*k}\\cos\\theta')+'. Use symmetry and determine which boundary is nearer the origin.',M(area),['The curves meet when cos θ = 1/2, so θ = ±π/3 in the right half-plane.','By symmetry use θ ≥ 0: the smaller radius is '+str(k)+' on [0, π/3] and '+str(2*k)+' cos θ on [π/3, π/2].','The area is '+M(f'\\int_0^{{\\pi/3}}{k*k}\\,d\\theta+\\int_{{\\pi/3}}^{{\\pi/2}}{4*k*k}\\cos^2\\theta\\,d\\theta={L(area)}')+'.'],['Correct intersections and angular region','Correct piecewise inner boundary','Correct area integral and value']))
a += [Q('Find the area between r = 2 and r = 1 over 0 ≤ θ ≤ π.','$3\\pi/2$.',['The outer radius is 2 and the inner radius is 1.','Use '+M('\\frac12\\int_0^\\pi(4-1)\\,d\\theta=3\\pi/2')+'.']),Q('Why must a polar overlap region sometimes be split at intersections?','The nearer or farther boundary can change there.',['Solve the radial equality and check the relevant traced regions.','Use the correct squared-radius difference or minimum radius on each angular piece.'])];add('9.9',a)
# UNIT 10: convergence arguments, tests, remainders and power-series endpoints.
a=[]
series_cases=[('\\sum_{n=1}^\\infty 2^{-n}','Converges to 1.',['It is geometric with first term 1/2 and ratio 1/2.','The partial sums are 1 - 2⁻ᴺ.','Their limit is 1.']),('\\sum_{n=1}^\\infty n/(n+1)','Diverges.',['Its nth term approaches 1.','Convergence of a series requires terms approaching zero.','Therefore the divergence test applies.']),('\\sum_{n=1}^\\infty 1/[n(n+1)]','Converges to 1.',['Write the summand as 1/n - 1/(n + 1).','The partial sum telescopes to 1 - 1/(N + 1).','As N grows the partial sum tends to 1.']),('\\sum_{n=1}^\\infty 1/n','Diverges.',['This is the harmonic series.','The integral of 1/x from 1 to b is ln b.','It is unbounded, so the Integral Test gives divergence.']),('\\sum_{n=1}^\\infty 1/n^2','Converges.',['It is a p-series.','Its exponent p = 2 is greater than 1.','Therefore its partial sums approach a finite value.']),('\\sum_{n=1}^\\infty (-1)^{n-1}/n','Converges.',['The positive magnitudes 1/n decrease.','They tend to zero.','The Alternating Series Test gives convergence.'])]
for expr,ans,steps in series_cases:a.append(Q('Determine whether '+M(expr)+' converges. Justify using partial sums or an appropriate test.',ans,steps))
a += [Q('Distinguish convergence of the sequence aₙ from convergence of the series Σaₙ.','They are different limits.',['Sequence convergence concerns individual terms.','Series convergence concerns partial sums; aₙ = 1/n tends to zero but its series diverges.']),Q('If partial sums are $S_N=3-2/(N+1)$, find the infinite sum.','$3$.',['A series sum is the limit of Sₙ.','The fraction tends to zero, so the limit is 3.'])];add('10.1',a)
a=[]
for expr in [n/(n+1),(2*n+1)/(3*n+4),(-1)**n,S.Rational(1,1)/n,1/n**2,n**2/(n*n+1)]:
 oscillatory=expr==(-1)**n;lim=None if oscillatory else S.limit(expr,n,S.oo);zero=lim==0
 ans='Inconclusive: the terms tend to zero.' if zero else 'Divergent: the terms do not tend to zero.'
 a.append(Q('Apply only the nth-term test to '+M(S.Sum(expr,(n,1,S.oo)))+'. State exactly what the test concludes.',ans,['Examine the limit of the summand, not of the partial sums.','The terms '+('oscillate between ±1.' if oscillatory else 'tend to '+M(lim)+'.'),'A nonzero or nonexistent term limit proves divergence; a zero term limit does not decide convergence.']))
a += [Q('A pupil says aₙ → 0 proves Σaₙ converges. Give a counterexample.','The harmonic series.',['Its terms 1/n tend to zero.','Its partial sums grow without bound.']),Q('If a series converges, what must be true of its nth term? Is it sufficient?','The term must tend to zero; this is necessary but not sufficient.',['Successive partial-sum differences are the individual terms.','Convergent partial sums force these differences to zero, but the converse fails.'])];add('10.3',a)
a=[]
for k in range(2,8):
 a.append(Q('Use the Integral Test to decide convergence of '+M(f'\\sum_{{n=1}}^\\infty\\frac1{{n^{k}}}')+'. Check its hypotheses.', 'Convergent.',['The function '+M(f'f(x)=x^{{-{k}}}')+' is positive, continuous and decreasing for x ≥ 1.','The improper integral is '+M(f'\\int_1^\\infty x^{{-{k}}}\\,dx=\\frac1{{{k-1}}}')+'.','The integral is finite, so the positive-term series converges.'],['All Integral Test hypotheses','Correct improper integral','Correct series conclusion']))
a += [Q('Does the Integral Test say the infinite series equals its comparison integral? Explain.','No; it relates their convergence.',['The test compares areas with a sum of rectangle heights.','A series and its integral usually have different numerical values.']),Q('For Σ from n = 2 to ∞ of 1/(n ln²n), justify the Integral Test and decide convergence.','Convergent.',['On [2, ∞), 1/(x ln²x) is positive, continuous and decreasing.','Its integral equals '+M('\\lim_{b\\to\\infty}[-1/\\ln x]_2^b=1/\\ln2')+', which is finite.'])];add('10.4',a)
a=[]
for p in [S.Rational(1,2),1,2,S.Rational(3,2),S.Rational(1,3),3]:
 conv=p>1
 a.append(Q('Classify '+M(S.Sum(n**(-p),(n,1,S.oo)))+' using the p-series rule. State p explicitly.','Convergent.' if conv else 'Divergent.',['The series has form Σ1/nᵖ with '+M('p='+L(p))+'.','A p-series converges exactly when p > 1.','Here that condition '+('holds.' if conv else 'fails.')]))
a += [Q('Does replacing the first ten terms of a convergent series change its convergence?','No.',['A finite prefix contributes only a finite amount.','Convergence depends on the tail.']),Q('Compare Σ1/n and Σ1/n¹·⁰¹. Why do they have different convergence behaviour despite similar terms?','The first diverges; the second converges.',['The threshold for a p-series is strictly p > 1.','At p = 1 the harmonic series diverges, while 1.01 is above the threshold.'])];add('10.5',a)
a=[]
comparison=[('1/(n^2+3)','Convergent.',['For n ≥ 1, 0 &lt; 1/(n² + 3) ≤ 1/n².','The comparison p-series has p = 2 > 1.','Direct comparison proves convergence.']),('(n+1)/(n^3+2)','Convergent.',['Compare with 1/n².','The ratio n²(n + 1)/(n³ + 2) tends to 1.','Limit Comparison gives the same convergence as Σ1/n².']),('1/(\\sqrt n+2)','Divergent.',['Compare with 1/√n.','The ratio √n/(√n + 2) tends to 1.','The p-series with p = 1/2 diverges, so Limit Comparison gives divergence.']),('n/(n^2+4)','Divergent.',['Compare with 1/n.','The ratio n²/(n² + 4) tends to 1.','The harmonic series diverges; so does this series.']),('(2+\\sin n)/n^2','Convergent.',['Its positive terms are at most 3/n².','The p-series Σ3/n² converges.','Direct comparison proves convergence.']),('(2+\\sin n)/n','Divergent.',['Its terms are at least 1/n and are positive.','The harmonic series diverges.','Direct comparison from below proves divergence.'])]
for expr,ans,steps in comparison:a.append(Q('Use Direct or Limit Comparison to classify '+M('\\sum_{n=1}^\\infty '+expr)+'.',ans,steps))
a += [Q('Why does 0 ≤ aₙ ≤ bₙ with divergent Σbₙ not decide convergence of Σaₙ?','An upper divergent bound is too weak.',['For example, 1/n² ≤ 1/n for n ≥ 1.','The smaller series converges even though the larger one diverges.']),Q('In Limit Comparison of positive terms, what does a finite strictly positive ratio limit imply?','Both series converge or both diverge.',['The tails have comparable sizes up to constant factors.','A limit of 0 or ∞ requires separate directional reasoning.'])];add('10.6',a)
a=[]
for p in [1,2,S.Rational(1,2),3,S.Rational(3,2),S.Rational(1,4)]:
 a.append(Q('Use the Alternating Series Test for '+M(S.Sum((-1)**(n-1)/n**p,(n,1,S.oo)))+'. Verify both conditions.','Convergent.',['The positive magnitudes '+M(n**(-p))+' decrease as n increases.','Because '+M('p='+L(p))+'> 0, they tend to zero.','The signs alternate, so the Alternating Series Test applies.'],['Decreasing magnitudes','Zero magnitude limit','Valid AST conclusion']))
a += [Q('Does alternation alone guarantee convergence? Give a counterexample.','No; Σ(-1)ⁿ diverges.',['Its signs alternate.','Its term magnitude stays 1, so terms do not approach zero.']),Q('If bₙ decreases to 0 only after n = 20, can AST still establish convergence of Σ(-1)ⁿbₙ?','Yes.',['Apply the test to the eventually decreasing tail.','A finite initial segment does not affect convergence.'])];add('10.7',a)
a=[]
ratio_cases=[('2^n/n!',S.Integer(0),'Convergent, absolutely.','The ratio is 2/(n + 1).'),('5^n/n!',S.Integer(0),'Convergent, absolutely.','The ratio is 5/(n + 1).'),('n!/3^n',S.oo,'Divergent.','The ratio is (n + 1)/3.'),('n^2/3^n',S.Rational(1,3),'Convergent, absolutely.','The ratio is (n + 1)²/(3n²).'),('1/n^2',S.Integer(1),'Inconclusive by the Ratio Test.','The ratio is n²/(n + 1)².'),('3^n/n',S.Integer(3),'Divergent.','The ratio is 3n/(n + 1).')]
for expr,lim,ans,work in ratio_cases:a.append(Q('Apply the Ratio Test to '+M('\\sum_{n=1}^\\infty '+expr)+'. State the ratio limit and the test’s conclusion.',ans,[work,'The absolute ratio limit is '+M(lim)+'.','A limit below 1 gives absolute convergence; above 1 gives divergence; 1 is inconclusive.']))
a += [Q('If the ratio limit is 1, may the series be declared divergent? Give examples.','No.',['Both Σ1/n and Σ1/n² have ratio limit 1.','The first diverges and the second converges.']),Q('Why is the Ratio Test often useful for factorial terms?','Successive factorials cancel.',['The relation (n + 1)! = (n + 1)n! simplifies aₙ₊₁/aₙ.','The resulting limit is often elementary.'])];add('10.8',a)
a=[]
for p in [1,2,S.Rational(1,2),3,S.Rational(3,2),S.Rational(1,4)]:
 absolute=p>1
 a.append(Q('Classify '+M(S.Sum((-1)**(n-1)/n**p,(n,1,S.oo)))+' as absolutely convergent, conditionally convergent or divergent.', 'Absolutely convergent.' if absolute else 'Conditionally convergent.',['AST gives convergence because the magnitudes decrease to zero.','The absolute-value series is a p-series with '+M('p='+L(p))+'.','It '+('converges because p > 1, giving absolute convergence.' if absolute else 'diverges because p ≤ 1, leaving conditional convergence.')]))
a += [Q('If Σ|aₙ| converges, what follows for Σaₙ?','It converges absolutely, and hence converges.',['Absolute convergence is the stronger condition.','It controls the sum of all term magnitudes.']),Q('Classify $\\sum_{n=1}^\\infty(-1)^n n/(n+1)$.','Divergent.',['The magnitudes tend to 1, not zero.','The nth-term test rules out convergence before any conditional/absolute classification.'])];add('10.9',a)
a=[]
for k in range(1,7):
 p=1 if k%2 else 2;N=k+1;sn=sum(S.Rational((-1)**(j-1),j**p) for j in range(1,N+1));bound=S.Rational(1,(N+1)**p)
 a.append(Q('For '+M(f'S=\\sum_{{n=1}}^\\infty\\frac{{(-1)^{{n-1}}}}{{n^{p}}}')+', use the first '+str(N)+' terms to give an approximation and an absolute error bound.',M(f'S_{N}={L(sn)},\\quad |R_{N}|\\le {L(bound)}'),['The positive magnitudes decrease to zero, so AST and its remainder bound apply.','Sum the first '+str(N)+' signed terms: '+M(sn)+'.','The error is at most the next magnitude, '+M(bound)+'.'],['Remainder theorem conditions','Correct partial sum','Correct next-term bound']))
a += [Q('How many terms ensure error at most 0.01 for Σ from n = 1 to ∞ of (-1)ⁿ⁻¹/n?','99 terms suffice.',['Require 1/(N + 1) ≤ 0.01.','Then N + 1 ≥ 100, so N ≥ 99.']),Q('Does the alternating remainder bound give the exact error?','No; it is an upper bound on its magnitude.',['The remainder has magnitude no greater than the first omitted term.','Its sign is the sign of that omitted term, but its exact size is generally smaller.'])];add('10.10',a)
a=[]
for k in range(1,7):
 degree=k+1;target=S.Rational(1,2);bound=S.Rational(3,1)*target**(degree+1)/S.factorial(degree+1)
 a.append(Q('For the degree-'+str(degree)+' Maclaurin approximation of eˣ at x = 1/2, use the given derivative bound '+M('|f^{('+str(degree+1)+')}(z)|\\le3')+' on [0, 1/2] to bound the error.',M(f'|R_{{{degree}}}|\\le {L(bound)}'),['Lagrange’s bound is '+M(f'|R_{{{degree}}}|\\le\\frac{{M|x-a|^{{{degree+1}}}}}{{({degree+1})!}}')+'.','Use M = 3, a = 0 and x = 1/2.','Substitute and simplify to get '+M(bound)+'.'],['Correct Lagrange formula','Valid bound and interval substitution','Correct numerical bound']))
a += [Q('Why must the derivative bound M hold throughout the interval between a and x?','The remainder uses an unknown intermediate point.',['Taylor’s theorem locates the derivative at some point between a and x.','A bound valid only at the centre may miss a larger intermediate derivative.']),Q('Use the standard bound |cos z| ≤ 1 to bound the error of the degree-2 Taylor polynomial of sin x about 0 at x = 0.1.','$|R_2|\\le1/6000$.',['The third derivative is -cos x and its magnitude is also at most 1 (the universal trig bound suffices).','The bound is 1·(0.1)³/3! = 1/6000.'])];add('10.12',a)
a=[]
for k in range(1,7):
 R=k+1;centre=k-2;left=centre-R;right=centre+R
 a.append(Q('Find the radius and full interval of convergence of '+M(f'\\sum_{{n=1}}^\\infty\\frac{{(x-({centre}))^n}}{{{R}^n n}}')+'. Check both endpoints.',f'Radius {R}; interval '+M(f'[{left},{right})')+'.',['The absolute ratio limit is '+M(f'\\frac{{|x-({centre})|}}{{{R}}}')+', requiring '+M(f'|x-({centre})|<{R}')+'.','At the left endpoint the series is Σ(-1)ⁿ/n, which converges conditionally.','At the right endpoint it is the harmonic series, which diverges.'],['Correct radius from ratio test','Left endpoint analysis','Right endpoint and full interval']))
a += [Q('Can the Ratio Test alone decide inclusion of a power series’ endpoints?','Usually not; its limit equals 1 there.',['The interior inequality gives the radius.','Substitute each endpoint into the original series and test separately.']),Q('Find radius and interval of convergence of $\\sum_{n=0}^\\infty x^n/n!$.','Radius ∞; interval all real numbers.',['The absolute ratio is |x|/(n + 1).','Its limit is zero for every fixed real x, so all inputs converge.'])];add('10.13',a)

# Keep all authored displayed fractions vertical, including series terms and bounds.
def prettytex(tex):
 replacements={
  r'd(x\sin x)/dx':r'\frac{d}{dx}(x\sin x)',r'd(\sin(x^2))/dx':r'\frac{d}{dx}\sin(x^2)',
  '(x^2-4)/(x-2)':r'\frac{x^2-4}{x-2}','(x-2)/(x^2-4)':r'\frac{x-2}{x^2-4}',
  '(x^2+1)/x':r'\frac{x^2+1}{x}',r'|x|/x':r'\frac{|x|}{x}',
  '(1+x)/x':r'\frac{1+x}{x}',r'x/(x^2+4)':r'\frac{x}{x^2+4}',
  r'\sin(3x)/3':r'\frac{\sin(3x)}3',r'3\pi/2':r'\frac{3\pi}2',r'28\pi/15':r'\frac{28\pi}{15}',
  '1/[n(n+1)]':r'\frac1{n(n+1)}','n/(n+1)':r'\frac n{n+1}','(-1)^{n-1}/n':r'\frac{(-1)^{n-1}}n',
  '2/(N+1)':r'\frac2{N+1}',r'1/\ln2':r'\frac1{\ln2}',r'1/\ln x':r'\frac1{\ln x}',
  '1/(n^2+3)':r'\frac1{n^2+3}','(n+1)/(n^3+2)':r'\frac{n+1}{n^3+2}',
  r'1/(\sqrt n+2)':r'\frac1{\sqrt n+2}','n/(n^2+4)':r'\frac n{n^2+4}',
  r'(2+\sin n)/n^2':r'\frac{2+\sin n}{n^2}',r'(2+\sin n)/n':r'\frac{2+\sin n}{n}',
  '2^n/n!':r'\frac{2^n}{n!}','5^n/n!':r'\frac{5^n}{n!}','n!/3^n':r'\frac{n!}{3^n}',
  'n^2/3^n':r'\frac{n^2}{3^n}','3^n/n':r'\frac{3^n}n','x^n/n!':r'\frac{x^n}{n!}',
  '1/x^2':r'\frac1{x^2}','1/n^2':r'\frac1{n^2}','1/n':r'\frac1n','1/x':r'\frac1x',
  '-25/y^3':r'-\frac{25}{y^3}','-x/y':r'-\frac xy','1/e':r'\frac1e','x^2/2':r'\frac{x^2}2',
  '2i/n':r'\frac{2i}n','2/n':r'\frac2n',r'\pi/3':r'\frac\pi3',r'\pi/2':r'\frac\pi2'
 }
 for old,new in replacements.items():tex=tex.replace(old,new)
 tex=re.sub(r'(?<![\w}])(\d+)/(\d+|x)',lambda m:r'\frac{'+m[1]+'}{'+m[2]+'}',tex)
 return tex
# Match the full syllabus exactly and keep a machine-readable arithmetic check log.
original=json.loads((ROOT/'data/ap-calculus/print-questions.json').read_text())
existing={p['id'] for p in original['packs'] if p['id'] not in banks}
expected=set(topics)-existing
assert set(banks)==expected,(sorted(expected-set(banks)),sorted(set(banks)-expected))
for p in banks.values():
 for q in p['questions']:
  # HTML must not interpret mathematical inequalities as tags.
  q['question']=re.sub(r'\$([^$]*)\$',lambda m:'$'+prettytex(m[1]).replace('<','&lt;').replace('>','&gt;')+'$',q['question'])
  q['answer']=re.sub(r'\$([^$]*)\$',lambda m:'$'+prettytex(m[1]).replace('<','&lt;').replace('>','&gt;')+'$',q['answer'])
  q['steps']=[re.sub(r'\$([^$]*)\$',lambda m:'$'+prettytex(m[1]).replace('<','&lt;').replace('>','&gt;')+'$',v) for v in q['steps']]
(ROOT/'data/ap-calculus/completion-questions.json').write_text(json.dumps({'version':1,'packs':list(banks.values())},indent=2))
(ROOT/'data/ap-calculus/completion-checks.json').write_text(json.dumps({'symbolicChecks':len(checks),'checks':checks,'note':'Symbolic identities cover selected arithmetic and calculus families. Conceptual arguments and diagrams require editorial review; this is not a formal proof of all answers.'},indent=2))
print(f'Authored {len(banks)} additional packs / {sum(len(p["questions"]) for p in banks.values())} questions; {len(checks)} symbolic identity checks passed.')
