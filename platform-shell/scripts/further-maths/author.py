"""Original fixed Core Pure practice. Pearson scope only; no assessment questions copied."""
from pathlib import Path
import sys,json,re,math,html,os
sys.path.insert(0,os.environ.get('KAIZEN_MATHS_PYTHON_MODULES','/tmp/kaizen-precalc-python'))
import sympy as S
ROOT=Path(__file__).resolve().parents[2];D=ROOT/'data/further-maths/edexcel-9fm0';D.mkdir(parents=True,exist_ok=True)
x,t=S.symbols('x t',real=True);n,r=S.symbols('n r',integer=True,positive=True);I=S.I;pi=S.pi
packs=[]
def l(v):return S.latex(v)
def m(v):
 tex=(v if isinstance(v,str) else l(v)).replace('--','+')
 tex=re.sub(r"\+\(0\)(?:y'|y|m)",'',tex)
 tex=re.sub(r'\+\((-?\d+)\)',lambda a:('+' if int(a[1])>=0 else '')+a[1],tex)
 return r'\('+html.escape(tex,quote=False)+r'\)'

def identity(a,b):return {'type':'identity','left':S.sstr(a),'right':S.sstr(b)}
def derivative(f,result,var=x):return {'type':'derivative','function':S.sstr(f),'result':S.sstr(result),'variable':str(var)}
def ode(y,a,b,f=0,var=x):return {'type':'ode','solution':S.sstr(y),'a':S.sstr(S.sympify(a)),'b':S.sstr(S.sympify(b)),'rhs':S.sstr(S.sympify(f)),'variable':str(var)}
def q(prompt,answer,steps,checks=(),marks=3):
 criteria=['M1: Correct setup or mathematical method [1].','M1: Correct intermediate working or justification [1].','A1: Correct conclusion with any stated conditions [1].'] if marks==3 else ['B1: Valid base case or initial setup [1].','M1: Correct assumption or method [1].','M1: Valid development and justification [1].','A1: Complete conclusion with stated scope [1].']
 return {'question':prompt,'questionText':re.sub('<[^>]+>',' ',prompt),'answer':answer,'steps':[s if s.startswith('<') else '<p>'+s+'</p>' for s in steps],'marks':marks,'criteria':criteria,'checks':list(checks),'origin':'original-kaizen-9fm0'}
def add(group,title,reference,tools,qs):
 assert len(qs)==8,(title,len(qs));assert len({v['question'] for v in qs})==8,title
 for i,v in enumerate(qs,1):v['number']=i
 packs.append({'id':f'CP{len(packs)+1:02}','title':title,'area':'Core Pure','group':group,'reference':reference,'tools':tools,'sourceTool':tools[0] if tools else 'limits-first-principles','instructions':'Answer on separate paper. Show your working and reasoning. Give exact answers unless stated. Angles are in radians.','questions':qs})
def graph(f,xmin=-3,xmax=3,ymin=-3,ymax=5,label='Function sketch'):
 def pos(a,b):return 35+280*(a-xmin)/(xmax-xmin),130-110*(b-ymin)/(ymax-ymin)
 ox,oy=pos(0,0);body=f'<path d="M30,{oy:.2f}H325 M{ox:.2f},15V135" stroke="#849b94" fill="none"/>'
 path='';active=False;prev=None
 for i in range(401):
  a=xmin+(xmax-xmin)*i/400
  try:b=float(f(a));valid=math.isfinite(b) and ymin<=b<=ymax
  except:valid=False
  if valid:
   px,py=pos(a,b);path+=('L' if active and abs(b-prev)<(ymax-ymin)*.2 else 'M')+f'{px:.2f},{py:.2f} ';active=True;prev=b
  else:active=False
 body+=f'<path d="{path}" fill="none" stroke="#147d77" stroke-width="2"/><text x="329" y="{oy+3}" font-size="10">x</text><text x="{ox+3}" y="12" font-size="10">y</text>'
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 155" aria-label="{label}">{body}</svg>'
def argand_circle(a,b,radius):
 xmin=min(0,a-radius)-.8;xmax=max(0,a+radius)+.8;ymin=min(0,b-radius)-.8;ymax=max(0,b+radius)+.8
 scale=min(260/(xmax-xmin),135/(ymax-ymin))
 def px(v):return 35+(v-xmin)*scale
 def py(v):return 155-(v-ymin)*scale
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" aria-label="Argand circle"><path d="M15,{py(0):.2f}H305 M{px(0):.2f},165V12" stroke="#849b94"/><circle cx="{px(a):.2f}" cy="{py(b):.2f}" r="{scale*radius:.2f}" fill="none" stroke="#147d77" stroke-width="2"/><text x="{px(a)+3:.2f}" y="{py(b)-4:.2f}" font-size="12">({a},{b})</text><text x="285" y="175" font-size="12">Re z</text><text x="5" y="15" font-size="12">Im z</text></svg>'
# 1. Induction: sums, divisibility and matrix powers, plus a proof critique.
a=[]
for term,F in [(r,n*(n+1)/2),(2*r-1,n**2),(r**2,n*(n+1)*(2*n+1)/6),(2**(r-1),2**n-1)]:
 nextterm=term.subs(r,n+1);total=S.factor(F+nextterm)
 a.append(q('Prove by induction, for integers '+m(r'n\geq1')+': '+m(r'\sum_{r=1}^{n}'+l(term)+'='+l(F))+'.','The formula holds for every integer '+m(r'n\geq1')+'.',[
  'Base case '+m('n=1')+': both sides equal '+m(term.subs(r,1))+'.','Assume the stated formula holds for '+m('n=k')+'.',
  'Add the next term. In the following algebra, replace n by k: '+m(F)+' + '+m(nextterm)+' = '+m(total)+'.','This equals the proposed expression with '+m('n=k+1')+'. The base case and inductive implication prove the claim.'],[identity(F.subs(n,1),term.subs(r,1)),identity(total,F.subs(n,n+1))],4))
a.append(q('Prove by induction that '+m('5^n-1')+' is divisible by 4 for integers '+m(r'n\geq1')+'.','Divisible by 4 for all integers '+m(r'n\geq1')+'.',['Base: '+m('5^1-1=4')+'.','Assume '+m('5^k-1=4j')+' for an integer j.','Then '+m('5^{k+1}-1=5(5^k-1)+4=4(5j+1)')+'.','The new factor is an integer; conclude by induction.'],[identity(5**(n+1)-1,5*(5**n-1)+4)],4))
a.append(q('Prove by induction that '+m('n^3-n')+' is divisible by 3 for integers '+m(r'n\geq1')+'.','Divisible by 3 for all integers '+m(r'n\geq1')+'.',['Base: '+m('1^3-1=0')+'.','Assume '+m('k^3-k=3j')+'.','Expand '+m('(k+1)^3-(k+1)=(k^3-k)+3k(k+1)')+'.','The result is '+m('3(j+k(k+1))')+'. Conclude by induction.'],[identity((n+1)**3-(n+1),(n**3-n)+3*n*(n+1))],4))
A=S.Matrix([[1,2],[0,1]]);F=S.Matrix([[1,2*n],[0,1]])
a.append(q('For '+m('A='+l(A))+', prove by induction that '+m('A^n='+l(F))+' for integers '+m(r'n\geq1')+'.','The matrix formula holds for all '+m(r'n\geq1')+'.',['At n = 1 the right side is A.','Assume the formula for k. Multiply by A on the right.','The top-right entry becomes '+m('2+2k=2(k+1)')+'; the other entries stay 1, 0, 1.','This gives the formula for k + 1; conclude by induction.'],[identity(F.subs(n,1),A),identity(F*A,F.subs(n,n+1))],4))
a.append(q('A proof checks n = 1 and assumes the formula for k. It then states the formula for k + 1 without linking the two. Explain what is missing.','A justified inductive implication is missing.',['The base case starts the argument.','The inductive step must use the assumption at k to establish the statement at k + 1.','Writing the desired conclusion is not a deduction from the hypothesis.']))
add(1,'Proof by induction','1.1',['proof-by-induction'],a)
# 2. Complex numbers.
a=[]
for u,v,op in [(2+3*I,-1+4*I,'+'),(5-2*I,3+I,'-'),(1+2*I,3-I,'*'),(-2+I,4+3*I,'*'),(3+I,1-2*I,'/'),(2-3*I,2+I,'/')]:
 result=S.simplify({'+':lambda:u+v,'-':lambda:u-v,'*':lambda:u*v,'/':lambda:u/v}[op]());tex={'*':r'\times','/':r'\div'}.get(op,op)
 a.append(q('Write '+m('('+l(u)+')'+tex+'('+l(v)+')')+' in the form '+m('a+bi')+'.',m(S.expand_complex(result)),['Use '+m('i^2=-1')+'. For division, multiply numerator and denominator by the denominator’s conjugate.','Collect real and imaginary terms separately.','The simplified result is '+m(S.expand_complex(result))+'.'],[identity(result,S.expand_complex(result))]))
a.append(q('For '+m('z=-3+4i')+', find '+m(r'\overline z')+' and '+m(r'z\overline z')+'.',m(r'\overline z=-3-4i,\quad z\overline z=25'),['Change the sign of the imaginary part.','Multiply: '+m('(-3+4i)(-3-4i)=9+16')+'.','The product is real and equals '+m('|z|^2')+'.'],[identity((-3+4*I)*(-3-4*I),25)]))
a.append(q('Solve '+m('z+(2-i)=3+4i')+' for z, and state its real and imaginary parts.',m('z=1+5i')+'; real part 1, imaginary part 5.',['Subtract '+m('2-i')+' from both sides.','The real part is '+m('3-2=1')+' and the imaginary coefficient is '+m('4+1=5')+'.','Remember that the imaginary part is the real number 5, not 5i.'],[identity((1+5*I)+(2-I),3+4*I)]))
add(2,'Complex arithmetic & conjugates','2.2-2.4',['complex-numbers'],a)
a=[]
for real,b in [(1,2),(-2,3),(3,1)]:
 f=S.expand((x-real)**2+b*b);roots=[real+b*I,real-b*I]
 a.append(q('Solve '+m(l(f)+'=0')+' over the complex numbers.',m('x='+l(roots[0])+r'\quad\text{or}\quad x='+l(roots[1])),['Complete the square: '+m(l((x-real)**2)+'='+str(-b*b))+'.','Take both square roots: '+m('x-'+str(real)+r'=\pm '+str(b)+'i')+'.','The roots occur as a conjugate pair.'],[identity(f.subs(x,z),0) for z in roots]))
for roots,known in [([2,1+I,1-I],2),([-1,2+3*I,2-3*I],-1),([I,-I,2+I,2-I],I)]:
 f=S.expand(S.prod(x-z for z in roots));given='A root is '+m(known)+'. '
 a.append(q(given+'Solve '+m(l(f)+'=0')+' completely.',m(r'x\in\{'+','.join(l(z) for z in roots)+r'\}'),['Use conjugate pairs because the coefficients are real.','Divide by the known linear factor, or the quadratic factor from a conjugate pair.','Factor the remaining polynomial and obtain the listed roots.'],[identity(f.subs(x,z),0) for z in roots]))
a.append(q('A real monic quartic has roots '+m('2+i')+' and '+m('-1+2i')+'. Find the polynomial.',m('x^4-2x^3+2x^2-10x+25'),['The other roots are '+m('2-i')+' and '+m('-1-2i')+'.','The quadratic factors are '+m('(x-2)^2+1')+' and '+m('(x+1)^2+4')+'.','Expand '+m('(x^2-4x+5)(x^2+2x+5)')+'.'],[identity(((x-2)**2+1)*((x+1)**2+4),x**4-2*x**3+2*x**2-10*x+25)]))
a.append(q('Explain why '+m('1+2i')+' cannot be the only non-real root of a polynomial with real coefficients.','Its conjugate '+m('1-2i')+' must also be a root.',['Conjugating the polynomial equation preserves its real coefficients.','Thus '+m(r'f(\overline z)=\overline{f(z)}=0')+' whenever '+m('f(z)=0')+'.','The two roots are distinct because the imaginary part is non-zero.']))
add(2,'Complex roots of polynomials','2.1, 2.3',['complex-numbers','roots-of-equations'],a)
a=[]
for z,angle in [(1+I,pi/4),(-1+I,3*pi/4),(-S.sqrt(3)-I,-5*pi/6),(3-S.sqrt(3)*I,-pi/6)]:
 mod=S.sqrt(S.re(z)**2+S.im(z)**2)
 a.append(q('Write '+m('z='+l(z))+' as '+m(r're^{i\theta}')+' with '+m(r'-\pi<\theta\leq\pi')+'.',m('z='+l(mod)+'e^{i('+l(angle)+')}'),['Find the modulus: '+m('r='+l(mod))+'.','Choose the argument in the correct quadrant: '+m(r'\theta='+l(angle))+'.','Combine the modulus and principal argument.'],[identity(mod*S.cos(angle)+I*mod*S.sin(angle),z)]))
for rad,ang in [(2,pi/3),(4,-pi/6)]:
 z=S.expand_complex(rad*(S.cos(ang)+I*S.sin(ang)))
 a.append(q('Write '+m(l(rad)+'e^{i('+l(ang)+')}')+' in Cartesian form.',m(z),['Use '+m(r'e^{i\theta}=\cos\theta+i\sin\theta')+'.','Evaluate the exact sine and cosine values.','Multiply both coordinates by '+m(rad)+'.'],[identity(rad*S.exp(I*ang),z)]))
a.append(q('Given '+m(r'z=2e^{i\pi/3},\ w=3e^{i\pi/6}')+', find zw in exponential and Cartesian forms.',m(r'zw=6e^{i\pi/2}=6i'),['Multiply moduli: '+m(r'2\times3=6')+'.','Add arguments: '+m(r'\pi/3+\pi/6=\pi/2')+'.','Use '+m(r'e^{i\pi/2}=i')+'.'],[identity(2*S.exp(I*pi/3)*3*S.exp(I*pi/6),6*I)]))
a.append(q('Given '+m(r'z=6e^{i\pi/4},\ w=2e^{-i\pi/4}')+', find '+m('z/w')+' and its principal argument.',m('z/w=3i')+'; principal argument '+m(pi/2)+'.',['Divide the moduli: '+m('6/2=3')+'.','Subtract the arguments: '+m(r'\pi/4-(-\pi/4)=\pi/2')+'.','Convert '+m(r'3e^{i\pi/2}')+' to '+m('3i')+'.'],[identity(6*S.exp(I*pi/4)/(2*S.exp(-I*pi/4)),3*I)]))
add(2,'Modulus, argument & exponential form','2.4-2.6, 2.9',['complex-numbers'],a)
a=[]
for centre,radius in [(1+I,2),(-1+2*I,1),(2-I,3)]:
 aa,bb=int(S.re(centre)),int(S.im(centre));eq=(x-aa)**2+(t-bb)**2-radius**2
 a.append(q('Describe and sketch the locus '+m('|z-('+l(centre)+')|='+str(radius))+'.',f'A circle, centre ({aa}, {bb}), radius {radius}.',['Modulus is distance in the Argand plane.','Write '+m('z=x+iy')+' to obtain '+m(l(eq)+'=0')+'.',argand_circle(aa,bb,radius)],[]))
for aa,bb in [(1,5),(-3,1)]:
 mid=S.Rational(aa+bb,2)
 a.append(q('Describe the locus '+m('|z-('+str(aa)+')|=|z-('+str(bb)+')|')+'.',m('x='+l(mid))+'; a perpendicular bisector.',['The distances to the two real-axis points are equal.','Square: '+m(f'(x-({aa}))^2+y^2=(x-({bb}))^2+y^2')+'.','Simplify to '+m('x='+l(mid))+'.'],[identity((mid-aa)**2,(mid-bb)**2)]))
a.append(q('Describe '+m(r'\arg(z-(1+i))=\pi/4')+'. State whether its endpoint is included.','The ray '+m(r'y=x,\ x>1')+', beginning at (1, 1); endpoint excluded.',['Translate the origin to (1, 1).','The direction is '+m(pi/4)+' from the positive real direction.','The argument of zero is undefined, so the starting point is excluded.']))
a.append(q('Describe the region '+m(r'|z-2i|\leq2')+' and say whether its boundary is included.','The closed disc centred at (0, 2) with radius 2.',['The modulus is distance from 2i.','All distances at most 2 lie in the disc.','The non-strict inequality includes the circular boundary.']))
a.append(q('Describe '+m('|z-1|<|z+3|')+' in terms of '+m(r'x=\operatorname{Re}z')+'.',m('x>-1'),['Square both sides; both distances are non-negative.','Cancel '+m('y^2')+' and expand to get '+m('-2x+1<6x+9')+'.','Rearrange; the boundary '+m('x=-1')+' is excluded.'],[identity((x-1)**2-(x+3)**2,-8*x-8)]))
add(2,'Argand loci & regions','2.7',['complex-numbers'],a)
a=[]
for z,k,theta,rad in [(1+I,4,pi/4,S.sqrt(2)),(S.sqrt(3)+I,3,pi/6,2),(1-S.sqrt(3)*I,3,-pi/3,2),(-1+I,6,3*pi/4,S.sqrt(2))]:
 result=S.expand_complex(z**k)
 a.append(q('Use de Moivre’s theorem to evaluate '+m('('+l(z)+')^{'+str(k)+'}')+' exactly.',m(result),['Write the base as '+m(l(rad)+r'(\cos('+l(theta)+r')+i\sin('+l(theta)+'))')+'.','Raise the modulus to the power and multiply the argument by '+str(k)+'.','Evaluate the exact sine and cosine, then simplify.'],[identity(result,rad**k*(S.cos(k*theta)+I*S.sin(k*theta)))]))
a.append(q('Use de Moivre’s theorem to derive a formula for '+m(r'\cos3\theta')+' in powers of '+m(r'\cos\theta')+'.',m(r'\cos3\theta=4\cos^3\theta-3\cos\theta'),['Expand '+m(r'(\cos\theta+i\sin\theta)^3')+'.','Equate real parts: '+m(r'\cos3\theta=\cos^3\theta-3\cos\theta\sin^2\theta')+'.','Use '+m(r'\sin^2\theta=1-\cos^2\theta')+'.'],[identity(S.cos(3*x),4*S.cos(x)**3-3*S.cos(x))],4))
a.append(q('Use de Moivre’s theorem to derive a formula for '+m(r'\sin3\theta')+' in powers of '+m(r'\sin\theta')+'.',m(r'\sin3\theta=3\sin\theta-4\sin^3\theta'),['Expand the cube of '+m(r'\cos\theta+i\sin\theta')+'.','Equate imaginary parts.','Replace '+m(r'\cos^2\theta')+' by '+m(r'1-\sin^2\theta')+'.'],[identity(S.sin(3*x),3*S.sin(x)-4*S.sin(x)**3)],4))
a.append(q('Use a multiple-angle identity to express '+m(r'\cos^3\theta')+' in terms of '+m(r'\cos\theta')+' and '+m(r'\cos3\theta')+'.',m(r'\cos^3\theta=\frac{\cos3\theta+3\cos\theta}{4}'),['Start with '+m(r'\cos3\theta=4\cos^3\theta-3\cos\theta')+'.','Add '+m(r'3\cos\theta')+' to both sides.','Divide by 4.'],[identity(S.cos(x)**3,(S.cos(3*x)+3*S.cos(x))/4)]))
a.append(q('Let '+m(r'z=e^{i\pi/3}')+'. Evaluate '+m('1+z+z^2')+' using a geometric sum.',m(r'1+i\sqrt{3}'),['Use '+m('1+z+z^2=(1-z^3)/(1-z)')+', since '+m(r'z\ne1')+'.','Here '+m('z^3=-1')+'.','Simplify, or verify from the exact Cartesian values of z and '+m('z^2')+'.'],[identity(1+S.exp(I*pi/3)+S.exp(2*I*pi/3),1+I*S.sqrt(3))]))
add(2,'De Moivre, identities & complex sums','2.8-2.9',['complex-numbers'],a)
a=[]
for power,rad,theta in [(3,2,0),(4,1,pi),(3,1,pi/2),(4,2,0),(5,1,0)]:
 rootlist=[rad*S.exp(I*(theta+2*pi*j)/power) for j in range(power)]
 a.append(q('Find all roots of '+m('z^{'+str(power)+'}='+l(rad**power*S.exp(I*theta)))+' in exponential form.',m('z='+str(rad)+'e^{i('+l(theta)+r'+2k\pi)/'+str(power)+r'},\quad k=0,\ldots,'+str(power-1)),['Take the '+str(power)+'th root of the modulus.','Divide each argument '+m(r'\theta+2k\pi')+' by '+str(power)+'.','Use '+str(power)+' consecutive values of k; the roots are equally spaced on a circle.'],[identity(S.expand_complex(v**power),S.expand_complex(rad**power*S.exp(I*theta))) for v in rootlist]))
a.append(q('The cube roots of unity are '+m(r'1,\omega,\omega^2')+'. Show that their sum is zero.',m(r'1+\omega+\omega^2=0'),['Factor '+m('z^3-1=(z-1)(z^2+z+1)')+'.','The non-real roots satisfy '+m('z^2+z+1=0')+'.','Substitute '+m(r'z=\omega')+'.'],[identity((x-1)*(x*x+x+1),x**3-1)]))
a.append(q('Find the side length and area of the regular hexagon whose vertices are the sixth roots of unity.','Side length 1; area '+m(3*S.sqrt(3)/2)+'.',['Adjacent vertices subtend '+m(pi/3)+' at the origin; each radius is 1.','The six triangles are equilateral with side 1.','Each triangle has area '+m(S.sqrt(3)/4)+'. Multiply by six.'],[identity(6*S.sqrt(3)/4,3*S.sqrt(3)/2)]))
a.append(q('Explain why the four roots of '+m('z^4=16')+' form a square, and find its area.','They are equally spaced on radius 2; area 8.',['The roots are '+m('2,2i,-2,-2i')+'.','Adjacent arguments differ by '+m(pi/2)+'.','The diagonals each have length 4, so area '+m(r'\frac12(4)(4)=8')+'.'],[identity(S.Rational(1,2)*4*4,8)]))
add(2,'Complex roots & roots of unity','2.10-2.11',['complex-numbers'],a)
# 3. Matrices.
a=[]
for A,B,op in [(S.Matrix([[1,2],[3,4]]),S.Matrix([[2,-1],[0,3]]),'sum'),(S.Matrix([[1,2],[0,1]]),S.Matrix([[0,-1],[1,0]]),'product'),(S.Matrix([[2,1],[3,2]]),S.Matrix([[1,0],[2,1]]),'both')]:
 result=A+B if op=='sum' else A*B
 prompt='Find A + B.' if op=='sum' else 'Find AB.' if op=='product' else 'Find AB and BA. Are they equal?'
 ans=m(result) if op!='both' else 'AB = '+m(A*B)+', BA = '+m(B*A)+'. They are not equal.'
 a.append(q('For A = '+m(A)+' and B = '+m(B)+', '+prompt,ans,['Check that the matrix dimensions permit the operation.','For a product, take each row of the first matrix with each column of the second.','Carry out the entry-by-entry calculation; order matters.'],[identity(result,A+B if op=='sum' else A*B)]))
for A in [S.Matrix([[3,1],[2,4]]),S.Matrix([[1,2,0],[0,3,1],[2,0,1]])]:
 a.append(q('Calculate the determinant of '+m(A)+'.',m(A.det()),['For 2 by 2, use ad - bc; for 3 by 3, expand along a row.','Compute the signed products or minors.','Combine the terms to get '+m(A.det())+'.'],[identity(A.det(),A.det())]))
a.append(q('A 2-D transformation has matrix '+m(S.Matrix([[2,0],[0,-3]]))+'. Describe its area scale factor and orientation.','Area scale factor 6; orientation reversed.',['The determinant is '+m('-6')+'.','The absolute determinant gives the area scale factor.','A negative determinant reverses orientation.'],[identity(S.Matrix([[2,0],[0,-3]]).det(),-6)]))
a.append(q('For '+m('A='+l(S.Matrix([[1,2],[2,4]])))+', decide whether A has an inverse.','No; A is singular.',['Compute '+m(r'\det A=1(4)-2(2)=0')+'.','A zero determinant means the transformation collapses dimension.','A singular matrix has no inverse.'],[identity(S.Matrix([[1,2],[2,4]]).det(),0)]))
a.append(q('For a square matrix A, simplify '+m('AI+0A')+' and state the role of I.','A; I is the identity matrix of the same size.',['Multiplication by I leaves A unchanged.','Multiplication by the zero scalar gives the zero matrix.','Adding the zero matrix also leaves A unchanged.']))
add(3,'Matrix operations & determinants','3.1-3.2, 3.5-3.6',['matrices','advanced-matrices'],a)
a=[]
for A in [S.Matrix([[2,1],[1,1]]),S.Matrix([[1,2,0],[0,1,1],[0,0,1]])]:
 inv=A.inv();a.append(q('Find the inverse of '+m('A='+l(A))+'. Check your result.',m('A^{-1}='+l(inv)),['The determinant is '+m(A.det())+', so the inverse exists.','Use the 2 by 2 inverse formula or row-reduce '+m(r'[A\mid I]')+'.','Multiply your answer by A and obtain I.'],[identity(A*inv,S.eye(A.rows))]))
for A,sol in [(S.Matrix([[1,1,1],[2,-1,1],[1,2,-1]]),S.Matrix([1,2,3])),(S.Matrix([[2,1,0],[1,2,1],[0,1,2]]),S.Matrix([2,-1,3]))]:
 rhs=A*sol;a.append(q('Use an inverse matrix to solve '+m(l(A)+r'\begin{pmatrix}x\\y\\z\end{pmatrix}='+l(rhs))+'.',m('(x,y,z)=('+','.join(l(v) for v in sol)+')'),['Write the system as '+m(r'A\mathbf{x}=\mathbf{b}')+'.','Since '+m(r'\det A='+l(A.det()))+', multiply by '+m('A^{-1}')+'.','The solution vector is '+m(sol)+'.'],[identity(A*sol,rhs)]))
a.append(q('Describe the common intersection of the planes '+m(r'x+y+z=2,\ x-y+z=0,\ z=1')+'.','One point: (0, 1, 1).',['Substitute z = 1.','Then '+m('x+y=1')+' and '+m('x-y=-1')+'.','Solving gives x = 0 and y = 1. The coefficient matrix is non-singular.'],[identity(S.Matrix([[1,1,1],[1,-1,1],[0,0,1]])*S.Matrix([0,1,1]),S.Matrix([2,0,1]))]))
a.append(q('Describe the solution set of '+m(r'x+y+z=1,\ 2x+2y+2z=2,\ x-y=0')+' geometrically.','A common line: '+m('(x,y,z)=(u,u,1-2u)')+'.',['The second equation repeats the first plane.','The third gives x = y. Set x = y = u.','Substitute to get z = 1 - 2u; there are infinitely many solutions.'],[identity(x+x+(1-2*x),1)]))
a.append(q('Explain why '+m(r'x+y+z=1,\ x+y+z=2,\ z=0')+' has no solution.','The first two planes are parallel and distinct, so no common intersection exists.',['Their normal vectors are equal.','A single sum x + y + z cannot equal both 1 and 2.','The third plane cannot restore a common intersection.']))
a.append(q('If A and B are invertible, write '+m('(AB)^{-1}')+' and justify the order.',m('(AB)^{-1}=B^{-1}A^{-1}'),['Multiply '+m('(AB)(B^{-1}A^{-1})')+'.','Associativity gives '+m('A(BB^{-1})A^{-1}=I')+'.','The reverse product is also I; factors reverse order.']))
add(3,'Inverse matrices, systems & planes','3.6-3.8',['matrices','advanced-matrices','linear-algebra'],a)
a=[]
for A,point,desc in [(S.Matrix([[0,-1],[1,0]]),S.Matrix([2,3]),'a quarter-turn anticlockwise'),(S.diag(-1,1),S.Matrix([3,-2]),'reflection in the y-axis')]:
 a.append(q('For '+m('A='+l(A))+', describe the transformation and find the image of '+m(point)+'.',desc+'; image '+m(A*point)+'.',['Read the images of the coordinate basis vectors from the columns.','Multiply A by the point vector.','State the transformation about the origin or specified axis.'],[identity(A*point,A*point)]))
A=S.Matrix([[0,-1],[1,0]]);B=S.diag(2,1)
a.append(q('Rotate 90° anticlockwise, then stretch by factor 2 parallel to the x-axis. Find the combined matrix.',m(B*A),['The rotation matrix is '+m(A)+'. The stretch matrix is '+m(B)+'.','The first operation acts on the point first, so the product is BA.','Multiply to obtain '+m(B*A)+'.'],[identity(B*A,S.Matrix([[0,-2],[1,0]]))]))
a.append(q('For '+m('A='+l(S.diag(2,1)))+', find all invariant points and give two invariant lines.','Invariant points: '+m('x=0')+'. Two invariant lines: '+m('x=0')+' and '+m('y=0')+'.',['Solve '+m('(2x,y)=(x,y)')+' to get x = 0.','The y-axis is fixed pointwise.','The x-axis maps to itself but its non-zero points are not fixed.']))
a.append(q('For the reflection '+m(r'(x,y)\mapsto(y,x)')+', find the invariant points and the image of '+m('y=2x+1')+'.','Invariant points: '+m('y=x')+'. Image line: '+m('y=(x-1)/2')+'.',['Fixed points satisfy x = y.','For the image coordinates X = y and Y = x, substitute into the original equation.','This gives '+m('X=2Y+1')+' and hence '+m('Y=(X-1)/2')+'.']))
for A,point,desc in [(S.diag(1,1,-1),S.Matrix([2,-1,3]),'reflection in z = 0'),(S.Matrix([[0,-1,0],[1,0,0],[0,0,1]]),S.Matrix([1,2,3]),'rotation 90° about the z-axis, taking the positive x-axis to the positive y-axis')]:
 a.append(q('Describe the 3-D transformation '+m('A='+l(A))+' and find the image of '+m(point)+'.',desc+'; image '+m(A*point)+'.',['Apply the matrix to each coordinate basis vector.','Multiply A by the given position vector.','Interpret the coordinate changes as the stated reflection or rotation.'],[identity(A*point,A*point)]))
a.append(q('A pupil says an invariant line consists entirely of invariant points. Give a counterexample.','Under '+m(r'(x,y)\mapsto(2x,y)')+', the x-axis is invariant but (1, 0) moves to (2, 0).',['An invariant line maps onto itself as a set.','A fixed point must keep its own coordinates.','These are different requirements, as the example shows.']))
add(3,'Transformations & invariance','3.3-3.4',['advanced-matrices','matrices'],a)
# 4. Further algebra.
a=[]
f=x**3-6*x**2+11*x-6
for prompt,result,steps in [
 ('Find the sum of the roots.',6,['Compare the coefficient of x squared with the monic cubic formula.']),
 ('Find the sum of the pairwise products of roots.',11,['Read the coefficient of x.']),
 ('Find the product of the roots.',6,['Negate the constant term.']),
 ('Find the sum of the squares of the roots.',14,['Use '+m('s_1^2-2s_2=36-22')+'.']),
 ('Find the sum of the reciprocals of the roots.',S.Rational(11,6),['No root is zero. Use '+m('s_2/s_3')+'.']),
 ('Find the sum of the cubes of the roots.',36,['Use '+m('s_1^3-3s_1s_2+3s_3=216-198+18')+'.'])]:
 a.append(q('The roots of '+m(l(f)+'=0')+' are '+m(r'\alpha,\beta,\gamma')+'. '+prompt,m(result),['Use Vieta’s relations '+m(r's_1=6,\ s_2=11,\ s_3=6')+'.']+steps+['Simplify to '+m(result)+'.'],[identity(result,result)]))
a.append(q('A monic quartic has roots 1, -1, 2 and 3. Find the polynomial and the sum of the squares of its roots.',m('x^4-5x^3+5x^2+5x-6')+'; sum of squares 15.',['Multiply '+m('(x^2-1)(x-2)(x-3)')+'.','The sum is 5 and the pairwise-product sum is 5.','Thus the square sum is '+m('5^2-2(5)=15')+'.'],[identity((x*x-1)*(x-2)*(x-3),x**4-5*x**3+5*x**2+5*x-6)]))
a.append(q('A monic cubic has root sum 4, pairwise-product sum -2 and root product 3. Form its equation.',m('x^3-4x^2-2x-3=0'),['Use '+m('x^3-s_1x^2+s_2x-s_3=0')+'.','Insert '+m('s_1=4,s_2=-2,s_3=3')+'.','Retain the alternating signs correctly.']))
add(4,'Roots & coefficients','4.1',['roots-of-equations'],a)
a=[]
for roots,scale,shift in [([1,2,4],1,2),([-1,2,3],1,-1),([1,2,3],2,0),([-2,1,3],-1,0),([1,3,4],2,-1),([-1,1,2,4],1,3),([1,2,3,5],3,0),([-3,-1,2],-2,1)]:
 f=S.expand(S.prod(x-z for z in roots));new=[scale*z+shift for z in roots];g=S.expand(S.prod(x-z for z in new))
 a.append(q('The roots of '+m(l(f)+'=0')+' are '+m(r'\alpha_j')+'. Form a monic equation with roots '+m(str(scale)+r'\alpha_j'+('+'+str(shift) if shift>=0 else str(shift)))+'.',m(l(g)+'=0'),['Set '+m('y='+str(scale)+'x'+('+'+str(shift) if shift>=0 else str(shift)))+'.','Substitute '+m('x=(y-('+str(shift)+'))/('+str(scale)+')')+' into the original equation.','Clear denominators and make the leading coefficient 1, then rename y as x.'],[identity(g.subs(x,z),0) for z in new]))
add(4,'Transformations of polynomial roots','4.2',['roots-of-equations'],a)
a=[]
for expr,lo,hi in [(r,1,n),(r**2,1,n),(r**3,1,n),(3*r+2,1,n),(r*(r+1),1,n),((2*r-1)**2,1,n),(r**2,5,20),(r**3-r,1,10)]:
 result=S.factor(S.summation(expr,(r,lo,hi)))
 a.append(q('Find a simplified expression for '+m(r'\sum_{r='+str(lo)+'}^{'+l(hi)+'}('+l(expr)+')')+'.',m(result),['Expand the summand into powers of r.','Apply the standard sums of integers, squares and cubes; subtract initial terms if the sum starts above 1.','Collect terms and factor to obtain '+m(result)+'.'],[identity(S.summation(expr,(r,lo,hi)),result)]))
add(4,'Finite sums of powers','4.3',['sequences-series'],a)
a=[]
for offset,start in [(1,1),(2,1),(3,1),(1,3),(2,2),(4,1)]:
 term=1/(r*(r+offset));result=S.simplify(S.summation(term,(r,start,n)))
 # Keep a finite harmonic-free expression through the boundary terms.
 result=S.simplify(sum(1/S.Rational(j) for j in range(start,start+offset))/offset-sum(1/(n+j) for j in range(1,offset+1))/offset)
 a.append(q('Use partial fractions and differences to sum '+m(r'\sum_{r='+str(start)+r'}^{n}\frac{1}{r(r+'+str(offset)+')}')+', where '+m(r'n\geq'+str(start))+'.',m(result),['Decompose '+m(r'\frac{1}{r(r+'+str(offset)+r')}=\frac{1}{'+str(offset)+r'}\left(\frac1r-\frac1{r+'+str(offset)+r'}\right)')+'.','Write out the first and last few terms; interior terms cancel.','Only boundary terms remain, giving '+m(result)+'.'],[identity(term,(1/r-1/(r+offset))/offset)]+[identity(result.subs(n,j),sum(term.subs(r,k) for k in range(start,j+1))) for j in [start,start+2,10]]))
a.append(q('Use differences to evaluate '+m(r'\sum_{r=1}^{\infty}\frac1{r(r+1)}')+'.',m(1),['The finite sum telescopes to '+m('1-1/(n+1)')+'.','Take the limit as '+m(r'n\to\infty')+'.','The remainder tends to zero, so the series sums to 1.'],[identity(S.limit(1-1/(n+1),n,S.oo),1)]))
a.append(q('Show by differences that '+m(r'\sum_{r=1}^{n}(3r^2+3r+1)=(n+1)^3-1')+'.','The identity holds for every integer '+m(r'n\geq1')+'.',['Use '+m('(r+1)^3-r^3=3r^2+3r+1')+'.','Write the sum of these consecutive differences.','Every intermediate cube cancels, leaving '+m('(n+1)^3-1')+'.'],[identity((r+1)**3-r**3,3*r*r+3*r+1)],4))
add(4,'Method of differences','4.4',['sequences-series'],a)
a=[]
for f,degree,valid in [(S.exp(2*x),3,'all real x'),(S.sin(3*x),5,'all real x'),(S.cos(2*x),4,'all real x'),(S.log(1+2*x),4,m(r'-\tfrac12<x\leq\tfrac12')),(1/S.sqrt(1+x),3,m(r'-1<x\leq1')),(S.exp(x)*S.cos(x),4,'all real x'),(S.sin(x)/x,4,'all real x after continuous extension at x = 0'),(1/(1-x)**2,4,m('|x|<1'))]:
 series=S.series(f,x,0,degree+1).removeO();general=''
 a.append(q('Expand '+m(f)+' through the '+m('x^{'+str(degree)+'}')+' term. State the interval of validity of its Maclaurin series.',m(series)+'. Valid for '+valid+'.',['Use known Maclaurin series, or '+m(r'f(x)=\sum_{r=0}^{\infty}\frac{f^{(r)}(0)}{r!}x^r')+'.','Substitute, multiply or differentiate series as needed, keeping terms only to the requested degree.','The polynomial is '+m(series)+'. Apply the convergence restriction before any substitution.'],[{'type':'series','function':S.sstr(f),'result':S.sstr(series),'degree':degree}]))
add(4,'Maclaurin series & validity','4.5-4.6',['series-expansions'],a)
# Remaining calculus, vectors, polar, hyperbolic and ODE packs are authored below.
# 5. Further calculus: rotations about either axis, parametric forms and derivation.
a=[]
for f,lo,hi in [(x,0,2),(x**2,0,1),(S.sqrt(x),0,4)]:
 V=S.simplify(pi*S.integrate(f*f,(x,lo,hi)))
 a.append(q('The region between '+m('y='+l(f))+' and the x-axis, for '+m(str(lo)+r'\leq x\leq'+str(hi))+', is revolved about the x-axis. Find its volume.',m('V='+l(V)),['A thin disc has radius y and area '+m(r'\pi y^2')+'.','Set up '+m(r'V=\pi\int_{'+str(lo)+'}^{'+str(hi)+'}('+l(f)+r')^2\,dx')+'.','Integrate and evaluate both limits to get '+m(V)+'.'],[identity(V,pi*S.integrate(f*f,(x,lo,hi)))]))
for f,lo,hi in [(t/2,0,4),(S.sqrt(t),0,3)]:
 V=pi*S.integrate(f*f,(t,lo,hi));a.append(q('The region '+m(r'0\leq x\leq'+l(f.subs(t,S.Symbol('y'))))+', '+m(str(lo)+r'\leq y\leq'+str(hi))+' is revolved about the y-axis. Find its volume.',m('V='+l(V)),['Use horizontal discs; their radius is x.','Set up '+m(r'V=\pi\int x^2\,dy')+' with the given y-limits.','Substitute x as a function of y, integrate and evaluate.'],[identity(V,pi*S.integrate(f*f,(t,lo,hi)))]))
for X,Y in [(t**2,t),(t,t**2+1)]:
 integrand=Y**2*S.diff(X,t);V=pi*S.integrate(integrand,(t,0,1))
 a.append(q('The curve '+m('x='+l(X)+r',\ y='+l(Y))+', '+m(r'0\leq t\leq1')+', bounds a region above the x-axis. Find the volume when this region is revolved about the x-axis.',m('V='+l(V)),['Use '+m(r'V=\pi\int y^2\,dx')+'.','Replace '+m('dx')+' by '+m(r'\frac{dx}{dt}\,dt')+' to obtain '+m(r'\pi\int_0^1 '+l(integrand)+r'\,dt')+'.','Evaluate the polynomial integral.'],[identity(V,pi*S.integrate(integrand,(t,0,1)))]))
a.append(q('Use discs to derive the volume of a cone of height h and base radius R. Take its vertex at x = 0.',m(r'V=\frac13\pi R^2h'),['Similar triangles give '+m('y=Rx/h')+'.','Integrate '+m(r'V=\pi\int_0^h R^2x^2/h^2\,dx')+'.','The result is '+m(r'\pi R^2[h^3/3]/h^2')+'.'],[],4))
add(5,'Volumes of revolution','5.1',['volumes-of-revolution','revolution-explorer'],a)
a=[]
for f,lo,hi in [(S.exp(-2*x),0,S.oo),(1/x**2,1,S.oo),(1/x,1,S.oo),(1/S.sqrt(x),0,4),(1/x**2,0,1),(1/(1+x*x),0,S.oo)]:
 val=S.integrate(f,(x,lo,hi));converges=val not in [S.oo,-S.oo,S.zoo];answer=m(val) if converges else 'Diverges; no finite value.'
 a.append(q('Evaluate '+m(r'\int_{'+l(S.sympify(lo))+'}^{'+l(S.sympify(hi))+'}'+l(f)+r'\,dx')+' or show that it diverges.',answer,['Replace each improper endpoint by a finite limit variable.','An antiderivative is '+m(S.integrate(f,x))+'. Evaluate it on the proper interval before taking the limit.','The limit '+('is '+m(val)+'.' if converges else 'is infinite, so the improper integral diverges.')],[{'type':'integral','function':S.sstr(f),'lower':str(lo),'upper':str(hi),'result':S.sstr(val)}]))
a.append(q('For which real p does '+m(r'\int_1^{\infty}x^{-p}\,dx')+' converge? Find its value when it converges.',m(r'p>1,\quad \frac1{p-1}'),['For p not equal to 1, the antiderivative is '+m('x^{1-p}/(1-p)')+'.','The upper-limit term tends to zero exactly when p > 1.','For p = 1 the logarithm diverges; for p < 1 the power grows.']))
a.append(q('A pupil writes '+m(r'\int_{-1}^{1}x^{-2}\,dx=[-1/x]_{-1}^1=-2')+'. Explain the error.','The integrand is singular at 0; the improper integral diverges.',['Split the interval at 0.','Both one-sided improper integrals must converge separately.','The antiderivative cannot be evaluated across the singularity as one proper interval.']))
add(5,'Improper integrals & convergence','5.2',['integration'],a)
a=[]
for f,lo,hi in [(x**2,0,3),(2*x+1,-1,2),(S.exp(x),0,S.log(2)),(S.sin(x),0,pi),(1/x,1,S.E),(x**3,-1,1)]:
 val=S.simplify(S.integrate(f,(x,lo,hi))/(hi-lo));a.append(q('Find the mean value of '+m('f(x)='+l(f))+' on '+m('['+l(S.sympify(lo))+','+l(S.sympify(hi))+']')+'.',m(val),['The mean value is '+m(r'\frac1{b-a}\int_a^b f(x)\,dx')+'.','The interval length is '+m(S.sympify(hi)-lo)+'.','The integral is '+m(S.integrate(f,(x,lo,hi)))+'. Divide this by '+m(S.sympify(hi)-lo)+' to obtain the stated mean.'],[identity(val*(hi-lo),S.integrate(f,(x,lo,hi)))]))
a.append(q('Find a positive c in [0, 2] such that '+m('c^2')+' equals the mean value of '+m('x^2')+' on that interval.',m(r'c=2/\sqrt3'),['The mean is '+m(r'\frac12\int_0^2x^2\,dx=4/3')+'.','Solve '+m('c^2=4/3')+'.','Choose the positive root in the given interval.'],[identity((2/S.sqrt(3))**2,S.Rational(4,3))]))
a.append(q('A pupil calculates the mean of '+m('x^2')+' on [0, 2] by averaging its endpoint values. Explain why this is incorrect.','The endpoint average is 2, but the function’s mean value is '+m(S.Rational(4,3))+'.',['The endpoint average is exact for an affine function, not for every curve.','Use the area under the graph divided by the interval length.','Here '+m(r'\frac12\int_0^2x^2\,dx=4/3')+'.']))
add(5,'Mean value of a function','5.3',['integration'],a)
a=[]
for f in [(2*x+3)/((x+1)*(x+2)),1/(x*(x+1)),(3*x+1)/((x-1)*(x+2)),1/(x*(x*x+1)),(x+2)/((x+1)*(x*x+1)),1/((x-1)**2*(x+1)),x/(x*x+4),(2*x+1)/(x*x+1)]:
 apart=S.apart(f,x);F=S.integrate(f,x)
 # Express real logarithmic primitives explicitly to avoid complex branch choices.
 F=F.replace(S.log,lambda arg:S.log(S.Abs(arg)))
 a.append(q('Integrate '+m(f)+', using partial fractions where helpful. Work on an interval avoiding singularities.',m(F)+' + C.',[
  'Divide first if needed, then decompose: '+m(f)+' = '+m(apart)+'.','Integrate each term; linear denominators give logarithms and irreducible quadratic terms may give inverse tangents.','An antiderivative is '+m(F)+'. Add an arbitrary constant.'],[derivative(F,f)]))
add(5,'Further integration of rational functions','5.4',['integration-algebraic-fractions','partial-fractions'],a)
a=[]
for f in [S.asin(x/2),S.atan(3*x),x*S.asin(x),S.acos(x/3)]:
 result=S.simplify(S.diff(f,x));a.append(q('Differentiate '+m('y='+l(f))+'.',m(r'\frac{dy}{dx}='+l(result)),['Use the inverse-trigonometric derivative and the chain rule.','If the expression is a product, apply the product rule before simplifying.','The simplified derivative is '+m(result)+'.'],[derivative(f,result)]))
for f,F,sub in [(1/S.sqrt(9-x*x),S.asin(x/3),r'x=3\sin u'),(1/(x*x+4),S.atan(x/2)/2,r'x=2\tan u'),(S.sqrt(4-x*x),x*S.sqrt(4-x*x)/2+2*S.asin(x/2),r'x=2\sin u'),(x*x/S.sqrt(1-x*x),(S.asin(x)-x*S.sqrt(1-x*x))/2,r'x=\sin u')]:
 a.append(q('Find '+m(r'\int '+l(f)+r'\,dx')+', using a trigonometric substitution if needed. Use the interior of the real domain.',m(F)+' + C.',['Use '+m(sub)+' and differentiate the substitution.','Simplify the integral in u, taking the positive square root on a suitable interval.','Integrate and substitute back to obtain '+m(F)+'.'],[derivative(F,f)]))
add(5,'Inverse trigonometry & substitutions','5.5-5.6',['integration-algebraic-fractions','advanced-integration'],a)
# 6. Vectors. Cartesian triples are compact and each plane/line is explicit.
a=[]
a.append(q('Find vector and Cartesian equations for the line through A(1, 2, 3) and B(3, 1, 5).',m(r'\mathbf r=(1,2,3)+\lambda(2,-1,2)')+'; '+m(r'\frac{x-1}{2}=\frac{y-2}{-1}=\frac{z-3}{2}'),['The direction is B - A = (2, -1, 2).','Use the point-plus-direction form.','Equate the three expressions for the parameter.'],[identity(S.Matrix([1,2,3])+S.Matrix([2,-1,2]),S.Matrix([3,1,5]))]))
a.append(q('Decide whether P(5, 0, 7) lies on '+m(r'\mathbf r=(1,2,3)+\lambda(2,-1,2)')+'.','Yes; '+m(r'\lambda=2')+'.',['Use the x-coordinate to find the candidate parameter.','The y-coordinate then gives 0 and the z-coordinate gives 7.','The same parameter works in all coordinates.'],[identity(S.Matrix([1,2,3])+2*S.Matrix([2,-1,2]),S.Matrix([5,0,7]))]))
a.append(q('Find the intersection of '+m(r'\mathbf r=(1,0,1)+\lambda(1,1,0)')+' and '+m(r'\mathbf r=(1,2,0)+\mu(2,0,1)')+'.','(3, 2, 1), with '+m(r'\lambda=2,\mu=1')+'.',['Equate z to obtain '+m(r'\mu=1')+'.','Equate y to obtain '+m(r'\lambda=2')+'.','Both lines then give x = 3.'],[identity(S.Matrix([1,0,1])+2*S.Matrix([1,1,0]),S.Matrix([1,2,0])+S.Matrix([2,0,1]))]))
a.append(q('Classify '+m(r'\mathbf r=(0,0,0)+\lambda(1,1,0)')+' and '+m(r'\mathbf r=(0,0,1)+\mu(1,-1,0)')+'.','Skew lines.',['The directions are not parallel.','Their z-coordinates are always 0 and 1 respectively, so they do not meet.','Non-parallel, non-intersecting lines in 3-D are skew.']))
a.append(q('Find a Cartesian equation of the plane through (1, 2, -1) with normal (2, -1, 3).',m('2x-y+3z=-3'),['Use '+m(r'\mathbf n\cdot(\mathbf r-\mathbf a)=0')+'.','Expand '+m('2(x-1)-(y-2)+3(z+1)=0')+'.','Collect constants.'],[identity(S.Matrix([2,-1,3]).dot(S.Matrix([1,2,-1])),-3)]))
a.append(q('Give a vector form of the plane '+m('x+y+z=3')+'.',m(r'\mathbf r=(3,0,0)+\lambda(-1,1,0)+\mu(-1,0,1)'),['Choose one point on the plane.','Choose two independent direction vectors whose coordinate sums are zero.','Every resulting point satisfies the plane equation.'],[identity((3-x-t)+x+t,3)]))
a.append(q('Find the intersection of '+m(r'\mathbf r=(1,1,0)+\lambda(1,2,1)')+' with '+m('x+y+z=10')+'.','(3, 5, 2).',['Substitute the line into the plane.','Solve '+m(r'2+4\lambda=10')+' to get '+m(r'\lambda=2')+'.','Substitute the parameter into all three coordinates.'],[identity(sum(S.Matrix([1,1,0])+2*S.Matrix([1,2,1])),10)]))
a.append(q('Show that '+m(r'\mathbf r=(1,0,0)+\lambda(1,-1,0)')+' lies entirely in '+m('x+y+z=1')+'.','Every point of the line is in the plane.',['Its starting point satisfies the plane equation.','Its direction has dot product zero with the normal (1, 1, 1).','Direct substitution gives '+m(r'(1+\lambda)-\lambda=1')+' for every parameter.'],[identity((1+x)-x,1)]))
add(6,'Lines, planes & intersections','6.1-6.2, 6.5',['further-vectors'],a)
a=[]
for u,v in [(S.Matrix([1,1,0]),S.Matrix([1,0,1])),(S.Matrix([1,2,2]),S.Matrix([2,-1,0]))]:
 cosine=S.simplify(S.Abs(u.dot(v))/(u.norm()*v.norm()));ans=S.acos(cosine)
 a.append(q('Find the acute or right angle between lines with directions '+m(u)+' and '+m(v)+'.',m(r'\theta='+l(ans))+' radians.',['Calculate the scalar product '+m(u.dot(v))+'.','The product of the lengths is '+m(S.simplify(u.norm()*v.norm()))+'.','Use the absolute dot product to obtain the smaller angle between the lines.'],[identity(u.dot(v)**2,cosine**2*u.dot(u)*v.dot(v))]))
a.append(q('Find the acute angle between the planes '+m('x+y=1')+' and '+m('x+z=2')+'.',m(pi/3),['Normals are (1, 1, 0) and (1, 0, 1).','Their dot product is 1 and both lengths are '+m(S.sqrt(2))+'.','The cosine of the smaller angle is '+m(S.Rational(1,2))+'.'],[identity(S.cos(pi/3),S.Rational(1,2))]))
a.append(q('Find the angle between a line of direction (1, 0, 1) and the plane z = 0.',m(pi/4),['A normal is (0, 0, 1).','The sine of the line-plane angle is '+m(r'1/\sqrt2')+'.','Use the complement of the angle between line and normal.'],[identity(S.sin(pi/4),1/S.sqrt(2))]))
a.append(q('Find k so that (1, k, 2) is perpendicular to (2, 1, -1).',m('k=0'),['Perpendicular vectors have scalar product zero.','Thus '+m('2+k-2=0')+'.','Solve to obtain k = 0.'],[identity(S.Matrix([1,0,2]).dot(S.Matrix([2,1,-1])),0)]))
a.append(q('Find the perpendicular distance from P(1, 2, 3) to the plane '+m('2x-y+2z=1')+'.',m(S.Rational(5,3)),['The normal is (2, -1, 2), of length 3.','The signed numerator is '+m('2(1)-2+2(3)-1=5')+'.','Take its absolute value and divide by 3.'],[identity(S.Abs(S.Matrix([2,-1,2]).dot(S.Matrix([1,2,3]))-1)/3,S.Rational(5,3))]))
a.append(q('Find the distance from P(1, 2, 2) to the line '+m(r'\mathbf r=\lambda(1,0,0)')+'.',m(2*S.sqrt(2)),['The line is the x-axis.','The closest point is (1, 0, 0).','The perpendicular displacement is (0, 2, 2), whose length is '+m(S.sqrt(8))+'.'],[identity(S.Matrix([0,2,2]).norm(),2*S.sqrt(2))]))
a.append(q('Find the shortest distance between '+m(r'\mathbf r=\lambda(1,0,0)')+' and '+m(r'\mathbf r=(0,0,3)+\mu(0,1,0)')+'.',m(3),['Both directions lie in horizontal planes, at z = 0 and z = 3.','The displacement from (0, 0, 0) to (0, 0, 3) is perpendicular to both directions.','Its length is 3, attaining the lower bound set by the vertical separation.'],[identity(S.Matrix([0,0,3]).norm(),3)]))
add(6,'Angles & shortest distances','6.3-6.5',['further-vectors'],a)
# 7. Polar coordinates and calculus.
a=[]
for xx,yy,rr,ang in [(1,1,S.sqrt(2),pi/4),(-S.sqrt(3),1,2,5*pi/6),(-2,-2,2*S.sqrt(2),-3*pi/4)]:
 a.append(q('Convert the Cartesian point '+m('('+l(xx)+','+l(yy)+')')+' to polar coordinates, with '+m(r'r>0,-\pi<\theta\leq\pi')+'.',m(r'(r,\theta)=('+l(rr)+','+l(ang)+')'),['Calculate '+m(r'r=\sqrt{x^2+y^2}')+'.','Use the quadrant to choose the principal argument.','Check with '+m(r'x=r\cos\theta,\ y=r\sin\theta')+'.'],[identity(rr*S.cos(ang),xx),identity(rr*S.sin(ang),yy)]))
for rr,ang in [(3,pi/6),(2,2*pi/3)]:
 a.append(q('Convert the polar point '+m('('+str(rr)+','+l(ang)+')')+' to Cartesian coordinates.',m('('+l(rr*S.cos(ang))+','+l(rr*S.sin(ang))+')'),['Use '+m(r'x=r\cos\theta')+'.','Use '+m(r'y=r\sin\theta')+'.','Evaluate the exact trigonometric values.']))
a.append(q('Show that '+m(r'r=4\cos\theta')+' is a circle. State its centre and radius.',m('(x-2)^2+y^2=4')+'; centre (2, 0), radius 2.',['Multiply by r: '+m(r'r^2=4r\cos\theta')+'.','Substitute '+m(r'r^2=x^2+y^2,\ r\cos\theta=x')+'.','Complete the square.'],[identity((x-2)**2+t*t-4,x*x+t*t-4*x)]))
a.append(q('Convert '+m(r'r\sin\theta=3')+' to Cartesian form and describe the curve.',m('y=3')+'; a horizontal straight line.',['Use '+m(r'y=r\sin\theta')+'.','The y-coordinate is fixed at 3.','The line is parallel to the x-axis.']))
a.append(q('For '+m(r'r=2(1+\cos\theta)')+', find r at '+m(r'\theta=0,\pi/2,\pi')+' and describe the symmetry.',m('r=4,2,0')+' respectively; symmetric about the initial line.',['Substitute the three cosine values 1, 0, -1.','Since cosine is even, replacing '+m(r'\theta')+' by '+m(r'-\theta')+' leaves r unchanged.','The curve is a cardioid with its cusp at the pole.']))
add(7,'Polar coordinates & curves','7.1-7.2',['polar-coordinates'],a)
a=[]
for fn,lo,hi,desc in [(S.Integer(3),0,2*pi,'the circle r = 3'),(4*S.cos(t),-pi/2,pi/2,'the circle '+m(r'r=4\cos\theta')),(2*(1+S.cos(t)),0,2*pi,'the cardioid '+m(r'r=2(1+\cos\theta)')),(3*S.cos(2*t),-pi/4,pi/4,'one petal of '+m(r'r=3\cos2\theta'))]:
 val=S.integrate(fn**2/2,(t,lo,hi))
 a.append(q('Find the area enclosed by '+desc+'. Use '+m(l(lo)+r'\leq\theta\leq'+l(hi))+'.',m(val),['Use '+m(r'A=\frac12\int_{\alpha}^{\beta}r^2\,d\theta')+'.','Square the radius and integrate over the stated interval.','The exact area is '+m(val)+' square units.'],[identity(S.integrate(fn**2/2,(t,lo,hi)),val)]))
a.append(q('For '+m(r'r=2\cos\theta')+', show that the tangent at '+m(r'\theta=\pi/4')+' is parallel to the initial line.',m(r'\frac{dy}{d\theta}=0,\quad \frac{dx}{d\theta}=-2')+'; a horizontal tangent.',['Write '+m(r'x=1+\cos2\theta,\ y=\sin2\theta')+'.','Differentiate: '+m(r'dx/d\theta=-2\sin2\theta,\ dy/d\theta=2\cos2\theta')+'.','At the stated angle the y derivative is zero and the x derivative is non-zero.'],[identity(S.diff(S.sin(2*t),t).subs(t,pi/4),0),identity(S.diff(1+S.cos(2*t),t).subs(t,pi/4),-2)]))
a.append(q('For '+m(r'r=2\cos\theta')+', show that the tangent at '+m(r'\theta=0')+' is perpendicular to the initial line.',m(r'\frac{dx}{d\theta}=0,\quad \frac{dy}{d\theta}=2')+'; a vertical tangent at (2, 0).',['Use '+m(r'x=1+\cos2\theta,\ y=\sin2\theta')+'.','Differentiate with respect to '+m(r'\theta')+'.','Only the x derivative vanishes at zero.'],[identity(S.diff(1+S.cos(2*t),t).subs(t,0),0),identity(S.diff(S.sin(2*t),t).subs(t,0),2)]))
a.append(q('Find the area between the rays '+m(r'\theta=0,\pi/2')+' and the spiral '+m(r'r=\theta')+'.',m(pi**3/48),['Use '+m(r'A=\frac12\int_0^{\pi/2}\theta^2\,d\theta')+'.','An antiderivative is '+m(r'\theta^3/6')+'.','Evaluate at the two bounds.'],[identity(S.integrate(t*t/2,(t,0,pi/2)),pi**3/48)]))
a.append(q('A student uses '+m(r'\int_0^{2\pi}3\,d\theta=6\pi')+' for the area of r = 3. Identify and correct the error.',m(r'A=\frac12\int_0^{2\pi}9\,d\theta=9\pi'),['Polar area uses half the integral of the squared radius.','The student omitted both the square and the factor '+m('1/2')+'.','The result agrees with the circle formula.'],[identity(S.integrate(S.Rational(9,2),(t,0,2*pi)),9*pi)]))
add(7,'Polar areas & tangents','7.2-7.3',['polar-coordinates'],a)
# 8. Hyperbolic functions.
a=[]
for fn,arg in [(S.sinh,S.log(2)),(S.cosh,S.log(3)),(S.tanh,S.log(2))]:
 value=S.simplify(S.expand_func(fn(arg)))
 a.append(q('Find the exact value of '+m(fn(arg))+'.',m(value),['Use the exponential definition of the hyperbolic function.','Substitute '+m(r'e^{\ln a}=a,\ e^{-\ln a}=1/a')+'.','Simplify the resulting fraction.'],[identity(fn(arg).rewrite(S.exp),value)]))
a.append(q('Prove '+m(r'\cosh^2x-\sinh^2x=1')+' using exponential definitions.',m(r'\cosh^2x-\sinh^2x=1'),['Substitute '+m(r'\cosh x=(e^x+e^{-x})/2')+' and '+m(r'\sinh x=(e^x-e^{-x})/2')+'.','Subtract the expanded squares.','The numerator is 4, so the result is 1.'],[identity((S.cosh(x)**2-S.sinh(x)**2).rewrite(S.exp),1)]))
a.append(q('Solve '+m(r'\sinh x=3/4')+' for real x.',m(r'x=\ln2'),['Set '+m('u=e^x>0')+'.','Then '+m('u-u^{-1}=3/2')+', giving '+m('2u^2-3u-2=0')+'.','Only u = 2 is positive, so take its logarithm.'],[identity(S.sinh(S.log(2)).rewrite(S.exp),S.Rational(3,4))]))
a.append(q('Solve '+m(r'\cosh x=5/4')+' for all real x.',m(r'x=\pm\ln2'),['Set '+m('u=e^x>0')+'.','Solve '+m('2u^2-5u+2=0')+' to obtain u = 2 or 1/2.','Take logarithms of both positive roots.'],[identity(S.cosh(S.log(2)).rewrite(S.exp),S.Rational(5,4)),identity(S.cosh(-S.log(2)).rewrite(S.exp),S.Rational(5,4))]))
a.append(q('State the domain and range of '+m(r'\sinh^{-1}x')+' and of '+m(r'\cosh^{-1}x')+' (principal real branches).','arsinh: domain and range all real numbers. arcosh: domain '+m(r'x\geq1')+', range '+m(r'y\geq0')+'.',['sinh is strictly increasing on the real line.','Restrict cosh to non-negative inputs before inverting.','Its minimum value is 1.']))
a.append(q('Derive a logarithmic expression for '+m(r'\sinh^{-1}x')+'.',m(r'\sinh^{-1}x=\ln(x+\sqrt{x^2+1})'),['Set '+m(r'y=\sinh^{-1}x')+' and u = '+m('e^y>0')+'.','The equation '+m('u^2-2xu-1=0')+' has positive root '+m(r'x+\sqrt{x^2+1}')+'.','Take logarithms; the argument is positive for every real x.'],[identity((x+S.sqrt(x*x+1))**2-2*x*(x+S.sqrt(x*x+1))-1,0)]))
add(8,'Hyperbolic definitions & identities','8.1, 8.3-8.4',['hyperbolic-functions'],a)
a=[]
for f in [S.sinh(3*x),S.cosh(x*x),S.tanh(2*x)]:
 result=S.diff(f,x)
 a.append(q('Differentiate '+m(f)+' with respect to x.',m(result),['Apply the chain rule.','Differentiate the outer hyperbolic function.','Multiply by the derivative of the inner expression.'],[derivative(f,result)]))
for f in [S.cosh(2*x),S.sinh(3*x),1/S.sqrt(x*x+4),1/S.sqrt(x*x-9),1/(1-x*x)]:
 if f==1/S.sqrt(x*x+4):ans=S.asinh(x/2);domain=' Use a hyperbolic substitution.';steps=['Put '+m(r'x=2\sinh u')+' so '+m(r'dx=2\cosh u\,du')+'.','The square root becomes '+m(r'2\cosh u')+'.','Integrate 1 and return to x.']
 elif f==1/S.sqrt(x*x-9):ans=S.acosh(x/3);domain=' Assume x > 3 and use a hyperbolic substitution.';steps=['Put '+m(r'x=3\cosh u')+', u > 0.','Then '+m(r'dx=3\sinh u\,du')+' and the square root is '+m(r'3\sinh u')+'.','Integrate 1 and return to x.']
 elif f==1/(1-x*x):ans=S.atanh(x);domain=' Assume '+m('|x|<1')+'.';steps=['Use the derivative of '+m(r'\tanh^{-1}x')+'.','Alternatively split into two partial fractions.','Add a constant of integration.']
 else:ans=S.integrate(f,x);domain='';steps=['Use the reverse chain rule.','Divide by the coefficient of x.','Add a constant of integration.']
 a.append(q('Find '+m(r'\int '+l(f)+r'\,dx')+'.'+domain,m(l(ans)+'+C'),steps,[derivative(ans,f)]))
add(8,'Hyperbolic calculus & substitutions','8.2-8.5',['hyperbolic-functions','advanced-integration'],a)
# 9. Differential equations. Checks substitute exact solutions into the stated equations.
C1,C2=S.symbols('C_1 C_2')
def first(y,P,Q):return {'type':'first','solution':S.sstr(y),'p':S.sstr(P),'rhs':S.sstr(Q)}
a=[]
for P,Q,initial,value in [(1,x,0,2),(2,4,0,1),(-1,S.exp(2*x),0,3),(1,2*x+1,1,0),(1/x,x,1,2),(2/x,x*x,1,1),(1/x,S.Integer(1),2,3)]:
 factor=S.exp(S.integrate(P,x));general=S.simplify((S.integrate(factor*Q,x)+C1)/factor);constant=S.solve(general.subs(x,initial)-value,C1)[0];sol=S.simplify(general.subs(C1,constant));domain=' Work on x > 0.' if S.sympify(P).has(1/x) else ''
 a.append(q('Solve '+m("y'+("+l(P)+')y='+l(Q))+', with '+m('y('+str(initial)+')='+str(value))+'.'+domain,m('y='+l(sol)),['The integrating factor is '+m(factor)+'.','Multiply through and integrate: '+m(l(factor)+'y='+l(S.integrate(factor*Q,x))+'+C')+'.','Use the initial condition to find '+m('C='+l(constant))+'.'],[first(sol,P,Q),identity(sol.subs(x,initial),value)]))
a.append(q('A liquid is at 80°C in a 20°C room. Its model is '+m(r"T'=-\frac1{10}(T-20),\ T(0)=80")+'. Find T(t), with t in minutes.',m('T=20+60e^{-t/10}'),['Set u = T - 20, so '+m("u'=-u/10")+'.','Hence '+m('u=Ae^{-t/10}')+'.','At t = 0, u = 60. The model approaches room temperature.'],[identity(S.diff(20+60*S.exp(-t/10),t),-(60*S.exp(-t/10))/10)]))
add(9,'First-order linear differential equations','9.1-9.3',['differential-equations'],a)
a=[]
for aa,bb in [(-3,2),(5,6),(-4,4),(2,1),(0,4),(2,5),(-2,5)]:
 aux=S.Symbol('m');roots=S.solve(aux*aux+aa*aux+bb,aux)
 if len(roots)==1:sol=(C1+C2*x)*S.exp(roots[0]*x);form='A repeated root needs the extra factor x.'
 elif any(S.im(z)!=0 for z in roots):real=S.re(roots[0]);imag=S.Abs(S.im(roots[0]));sol=S.exp(real*x)*(C1*S.cos(imag*x)+C2*S.sin(imag*x));form='A complex conjugate pair gives an exponential times sine and cosine.'
 else:sol=C1*S.exp(roots[0]*x)+C2*S.exp(roots[1]*x);form='Distinct real roots give two independent exponentials.'
 a.append(q('Find the general solution of '+m("y''+("+str(aa)+")y'+("+str(bb)+')y=0')+'.',m('y='+l(sol)),['The auxiliary equation is '+m('m^2+('+str(aa)+')m+('+str(bb)+')=0')+'.','Its roots are '+m(','.join(l(z) for z in roots))+'.',form],[ode(sol,aa,bb)]))
sol=2*S.cos(3*x)+S.sin(3*x)
a.append(q('Solve '+m("y''+9y=0")+' with '+m(r"y(0)=2,\ y'(0)=3")+'.',m('y='+l(sol)),['Use '+m(r'y=A\cos3x+B\sin3x')+'.','At zero, y = A = 2.','Differentiate; at zero '+m("y'=3B=3")+', so B = 1.'],[ode(sol,0,9),identity(sol.subs(x,0),2),identity(S.diff(sol,x).subs(x,0),3)]))
add(9,'Homogeneous second-order equations','9.4, 9.6',['differential-equations'],a)
a=[]
for aa,bb,cf,part in [(0,-1,C1*S.exp(x)+C2*S.exp(-x),-x*x-2),(3,2,C1*S.exp(-x)+C2*S.exp(-2*x),x/2-S.Rational(3,4)),(0,-4,C1*S.exp(2*x)+C2*S.exp(-2*x),S.exp(x)),(0,1,C1*S.cos(x)+C2*S.sin(x),S.exp(2*x)/5),(0,4,C1*S.cos(2*x)+C2*S.sin(2*x),S.sin(x)/3),(0,1,C1*S.cos(x)+C2*S.sin(x),-x*S.cos(x)/2),(-2,1,(C1+C2*x)*S.exp(x),x*x*S.exp(x)/2),(2,2,S.exp(-x)*(C1*S.cos(x)+C2*S.sin(x)),x*x/2-x+S.Rational(1,2))]:
 rhs=S.expand(S.diff(part,x,2)+aa*S.diff(part,x)+bb*part);sol=cf+part
 A0,B0,D0=S.symbols('A B D')
 trials=[A0*x*x+B0*x+D0,A0*x+B0,A0*S.exp(x),A0*S.exp(2*x),A0*S.sin(x)+B0*S.cos(x),x*(A0*S.sin(x)+B0*S.cos(x)),A0*x*x*S.exp(x),A0*x*x+B0*x+D0]
 trial=trials[len(a)];unknowns=[v for v in [A0,B0,D0] if trial.has(v)]
 equations=S.expand(S.diff(trial,x,2)+aa*S.diff(trial,x)+bb*trial-rhs)
 coefficients=S.solve_undetermined_coeffs(equations,unknowns,x)
 assert S.simplify(trial.subs(coefficients)-part)==0
 coefficient_tex=r',\quad '.join(l(v)+'='+l(coefficients[v]) for v in unknowns)

 a.append(q('Find the general solution of '+m("y''+("+str(aa)+")y'+("+str(bb)+')y='+l(rhs))+'.',m('y='+l(sol)),['The complementary function is '+m(cf)+'.','Choose '+m('y_p='+l(trial))+'. Any extra factor of x prevents duplication of the complementary function.','Substitute this trial and its first two derivatives into the equation. Equate coefficients to obtain '+m(coefficient_tex)+'.','Thus '+m('y_p='+l(part))+'. Add this to the complementary function.'],[ode(sol,aa,bb,rhs)]))
add(9,'Non-homogeneous second-order equations','9.5',['differential-equations'],a)
a=[]
a.append(q('An oscillator obeys '+m("x''+4x=0")+' with '+m(r"x(0)=3,\ x'(0)=0")+'. Find x(t), its amplitude and period.',m(r'x=3\cos2t')+'; amplitude 3, period '+m(pi)+'.',['Write '+m(r'x=A\cos2t+B\sin2t')+'.','The initial conditions give A = 3 and B = 0.','The angular frequency is 2; the period is '+m(r'2\pi/2')+'.'],[ode(3*S.cos(2*t),0,4,var=t)]))
for aa,bb,kind in [(2,5,'underdamped'),(4,4,'critically damped'),(5,4,'overdamped')]:
 a.append(q('Classify the free motion '+m("y''+"+str(aa)+"y'+"+str(bb)+'y=0')+' as underdamped, critically damped or overdamped. Justify.','The motion is '+kind+'.',['Use the auxiliary equation '+m('m^2+'+str(aa)+'m+'+str(bb)+'=0')+'.','Its discriminant is '+m(aa*aa-4*bb)+'.','A negative discriminant gives oscillatory decay; zero gives a repeated negative root; positive gives distinct negative roots.']))
a.append(q('Find a particular response of '+m(r"y''+2y'+2y=5\cos t")+'.',m(r'y=\cos t+2\sin t'),['Try '+m(r'y=A\cos t+B\sin t')+'.','Equating coefficients gives '+m(r'A+2B=5,\ B-2A=0')+'.','Solve A = 1, B = 2. The complementary part decays.'],[ode(S.cos(x)+2*S.sin(x),2,2,5*S.cos(x))]))
for solx,soly,aa,bb,cc,dd,force in [(S.exp(3*t),S.exp(3*t),2,1,1,2,0),(S.cos(t),-S.sin(t),0,1,-1,0,0),(t+1,t,1,-1,0,0,1)]:
 fx=S.simplify(S.diff(solx,t)-aa*solx-bb*soly);fy=S.simplify(S.diff(soly,t)-cc*solx-dd*soly)
 a.append(q('Solve '+m("u'="+l(aa*S.Symbol('u')+bb*S.Symbol('v')+fx)+r",\ v'="+l(cc*S.Symbol('u')+dd*S.Symbol('v')+fy))+' with '+m('u(0)='+l(solx.subs(t,0))+r',\ v(0)='+l(soly.subs(t,0)))+'. Derivatives are with respect to t.',m('u='+l(solx)+r',\quad v='+l(soly)),['Differentiate one equation and eliminate the other variable, or use a suitable substitution.','Use both initial conditions to determine constants.','Check both original equations by differentiating the stated solution.'],[identity(S.diff(solx,t),aa*solx+bb*soly+fx),identity(S.diff(soly,t),cc*solx+dd*soly+fy)]))
add(9,'Oscillations, modelling & coupled equations','9.3, 9.7-9.9',['differential-equations'],a)
assert len(packs)==30
source={'title':'Pearson Edexcel A level Further Mathematics 9FM0 specification, Issue 4','url':'https://qualifications.pearson.com/content/dam/pdf/A%20Level/Mathematics/2017/specification-and-sample-assesment/a-level-l3-further-mathematics-specification.pdf','scope':'Core Pure sections 1-9 only. Optional papers excluded. Original questions; not official Pearson assessment material.'}
(D/'library.json').write_text(json.dumps({'qualification':'Edexcel UK A level Further Mathematics 9FM0','scope':'Core Pure only','sources':[source],'packs':packs},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'packs':len(packs),'questions':sum(len(p['questions']) for p in packs),'checks':sum(len(q['checks']) for p in packs for q in p['questions'])}))
