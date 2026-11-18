"""Independent checks of selected numeric families, not a blanket accuracy claim."""
from pathlib import Path
from html.parser import HTMLParser
import json,re,sys,math
sys.path.insert(0,'/tmp/kaizen-ap-python')
import sympy as S
from sympy.parsing.sympy_parser import parse_expr,standard_transformations,implicit_multiplication_application,convert_xor
ROOT=Path(__file__).resolve().parents[2];D=ROOT/'data/gcse-maths';packs=json.loads((D/'library.json').read_text())['packs'];checks=[]
class Text(HTMLParser):
 def __init__(self,s):super().__init__();self.val=[];self.feed(s)
 def handle_data(self,v):self.val.append(v)
def txt(s):return ' '.join(Text(s).val).replace(r'\(', '').replace(r'\)','').strip()
def ok(p,q,kind,actual,expected,tol=0):
 assert abs(float(actual)-float(expected))<=tol,(p['id'],q['number'],actual,expected)
 checks.append({'pack':p['id'],'question':q['number'],'check':kind,'passed':True})
x=S.symbols('x');trans=standard_transformations+(implicit_multiplication_application,convert_xor)
for p in packs:
 for q in p['questions']:
  prompt=txt(q['question']);answer=txt(q['answer'])
  if p['id'] in ['A07','A16','A17']:
   source=q.get('raw',{}).get('equation',prompt);source=txt(source).replace('−','-');lhs,rhs=source.split('=');expr=parse_expr(lhs,transformations=trans)-parse_expr(rhs,transformations=trans);roots=S.solve(expr,x);expected=sorted(float(v) for v in roots if v.is_real)
   if not expected:
    assert re.search(r"no real",answer,re.I),(p["id"],q["number"],answer);checks.append({"pack":p["id"],"question":q["number"],"check":"negative discriminant and no real roots","passed":True});continue
   values=re.findall(r'(?:x\s*=|≈)\s*(-?\d+(?:\.\d+)?)',answer)
   if p['id']=='A16':values=re.findall(r'x\s*=\s*(-?\d+(?:\.\d+)?)',answer)
   assert len(values)==len(expected),(p['id'],q['number'],answer,expected)
   for actual,want in zip(sorted(map(float,values)),expected):ok(p,q,'equation root independently solved',actual,want,.0051 if p['id']=='A17' else 1e-8)
  elif p['id']=='N06':
   m=re.search(r'([.\d]+)%\s*of\s*([.\d]+)',prompt);ok(p,q,'percentage multiplication',float(answer),float(m[1])*float(m[2])/100,1e-7)
  elif p['id']=='R07':
   m=re.search(r'(Increase|Decrease)\s+([.\d]+)\s+by\s+([.\d]+)%',prompt);expected=float(m[2])*(1+(1 if m[1]=='Increase' else -1)*float(m[3])/100);ok(p,q,'percentage change',float(answer),expected,.000001)
  elif p['id']=='R08':
   m=re.search(r'([.\d]+)\s+is\s+([.\d]+)%',prompt);ok(p,q,'reverse percentage division',float(answer),float(m[1])*100/float(m[2]),.0051)
  elif p['id']=='R03' and 'exchange rate' in prompt:
   rate=float(re.search(r'£1\s*=\s*USD\s*([.\d]+)',prompt)[1]);m=re.search(r'Convert\s*(£|USD)\s*([.\d]+)',prompt);value=float(m[2]);expected=value*rate if m[1]=='£' else value/rate;actual=float(re.search(r'([.\d]+)',answer)[1]);ok(p,q,'currency direction and conversion',actual,expected,.0051)
# Check source topics and exclusions separately from mathematical equivalence.
for p in packs:
 assert p['tier'] in ['Foundation','Higher'];assert len(p['questions'])==8
 for q in p['questions']:assert not re.search(r'\b(integrate|differentiate|binomial distribution|Poisson|hypothesis test|confidence interval|matrix inverse)\b',txt(q['question']),re.I),(p['id'],q['number'])
(D/'maths-checks.json').write_text(json.dumps({'checks':checks,'count':len(checks),'limitations':'Independent numerical checks cover the explicitly named families. Other solutions have source checks and editorial review, not an independent proof of every answer.'},indent=2)+'\n')
print(f'PASS: {len(checks)} independent numerical checks; all packs have eight questions and exclude A level-only topics.')
