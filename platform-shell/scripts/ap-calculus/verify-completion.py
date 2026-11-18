"""Independent symbolic checks of authored families, with explicit expected values."""
import sys,os,json
from pathlib import Path
sys.path.insert(0,os.environ.get('KAIZEN_AP_PYTHON_MODULES','/tmp/kaizen-ap-python'))
import sympy as s
ROOT=Path(__file__).resolve().parents[2];x,t,z=s.symbols('x t z',real=True);n=s.symbols('n',positive=True,integer=True);checks=[]
def check(topic,case,actual,expected):
 assert s.simplify(actual-expected)==0,(topic,case,actual,expected)
 checks.append({'topic':topic,'case':case,'passed':True})
for k in range(1,7):
 check('2.1',k,((k*t*t+2*t).subs(t,3)-(k*t*t+2*t).subs(t,1))/2,4*k+2)
 check('2.3',k,s.diff(k*x*x+3*x,x).subs(x,k+2),2*k*(k+2)+3)
 check('4.2',k,s.diff(t**3-3*k*t*t,t).subs(t,k),-3*k*k)
 check('4.3',k,s.diff(k*x*x+5*x+100,x).subs(x,k),2*k*k+5)
 check('4.4',k,s.diff(s.pi*x*x,x).subs(x,k)*2,4*k*s.pi)
 check('5.1',k,((x*x+k*x).subs(x,3)-(x*x+k*x).subs(x,1))/2,4+k)
 check('5.5 minimum',k,(x*x-2*k*x).subs(x,k),-k*k)
 check('5.5 endpoint',k,(x*x-2*k*x).subs(x,2*k+1),2*k+1)
 check('5.7 maximum',k,(x**3-3*k*k*x).subs(x,-k),2*k**3)
 check('5.7 minimum',k,(x**3-3*k*k*x).subs(x,k),-2*k**3)
 check('6.1',k,s.integrate(k*t+2,(t,0,3)),s.Rational(9*k,2)+6)
 check('6.4',k,s.diff(s.integrate(t*t+k,(t,1,x if k%2 else x*x)),x),(x*x+k) if k%2 else 2*x*(x**4+k))
 check('6.5 minimum',k,s.integrate(t-k,(t,0,k)),-s.Rational(k*k,2))
 check('7.9',k,s.Rational(k,10)*(50*k)*(1-s.Rational(1,2)),s.Rational(5*k*k,2))
 check('8.1',k,s.integrate(x*x+k,(x,0,3))/3,k+3)
 check('8.2 distance',k,-s.integrate(k*(t-1),(t,0,1))+s.integrate(k*(t-1),(t,1,3)),s.Rational(5*k,2))
 check('8.3',k,50+10*k+s.integrate((k-2)*t+5,(t,0,4)),54+18*k)
 check('8.4',k,s.integrate(k*x-x*x,(x,0,k)),s.Rational(k**3,6))
 check('8.6',k,-2*s.integrate(x**3-k*k*x,(x,0,k)),s.Rational(k**4,2))
 check('8.7',k,s.integrate((2 if k%2==0 else 1)*(k*x)**2,(x,0,1)),s.Rational((2 if k%2==0 else 1)*k*k,3))
 check('8.8',k,s.integrate((s.pi/8 if k%2==0 else s.sqrt(3)/4)*(k*x)**2,(x,0,1)),k*k*(s.pi/24 if k%2==0 else s.sqrt(3)/12))
 check('8.10',k,s.pi*s.integrate((x+k)**2,(x,0,2)),s.pi*(2*k*k+4*k+s.Rational(8,3)))
 check('8.12',k,s.pi*s.integrate((2+k)**2-(x+k)**2,(x,0,2)),s.pi*(s.Rational(16,3)+4*k))
 check('9.9',k,k*k*s.pi/3+s.integrate(4*k*k*s.cos(t)**2,(t,s.pi/3,s.pi/2)),k*k*(2*s.pi/3-s.sqrt(3)/2))
for case,(expr,at,expected) in enumerate([(s.sin(2*x)/x,0,2),((s.exp(x)-1)/x,0,1),(s.log(x)/x,s.oo,0),((1-s.cos(x))/x**2,0,s.Rational(1,2)),((s.exp(2*x)-1)/(s.exp(x)-1),0,2),(x/s.exp(x),s.oo,0)],1):check('4.7',case,s.limit(expr,x,at),expected)
for case,(expr,at,target,expected) in enumerate([(s.sqrt(x),4,s.Rational(41,10),s.Rational(81,40)),(s.log(x),1,s.Rational(11,10),s.Rational(1,10)),(s.exp(x),0,s.Rational(1,10),s.Rational(11,10)),(x**3,2,s.Rational(21,10),s.Rational(46,5)),(1/x,2,s.Rational(19,10),s.Rational(21,40)),(s.sin(x),0,s.Rational(1,20),s.Rational(1,20))],1):check('4.6',case,expr.subs(x,at)+s.diff(expr,x).subs(x,at)*(target-at),expected)
check('8.7 extra',7,s.integrate((2*x-x*x)**2,(x,0,2)),s.Rational(16,15))
check('8.10 extra',7,s.pi*s.integrate((x*x+1)**2,(x,0,1)),s.pi*s.Rational(28,15))
check('8.13 extra',5,s.integrate(s.sqrt(1+x),(x,0,3)),s.Rational(14,3))
check('5.12 extra',7,s.simplify(-1/z-x*x/z**3).subs(x*x,25-z*z),-25/z**3)
report={'independentSymbolicChecks':len(checks),'checks':checks,'limits':'Checks independently validate selected authored formula families. They do not certify every conceptual answer or diagram.'}
(ROOT/'data/ap-calculus/completion-verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(f'PASS: {len(checks)} independent authored-family symbolic checks.')
