"""Independent numerical checks on exported probability and vector questions."""
from pathlib import Path
import sys,json,re,math,html
from fractions import Fraction
from statistics import NormalDist
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[2];D=ROOT/'data/alevel-maths/edexcel-9ma0';packs=json.loads((D/'library.json').read_text())['packs'];checks=[]
class Text(HTMLParser):
 def __init__(self,s):super().__init__();self.values=[];self.feed(s)
 def handle_data(self,s):self.values.append(s)
def plain(s):return ' '.join(Text(html.unescape(s)).values).strip()
def ok(id,n,kind,actual,expected,tol=0):
 assert abs(float(actual)-float(expected))<=tol,(id,n,actual,expected)
 checks.append({'pack':id,'question':n,'check':kind,'passed':True})
N=NormalDist()
for p in packs:
 for q in p['questions']:
  text=plain(q['question']);ans=plain(q['answer']);id=p['id'];num=q['number']
  if id=='S4.1b':
   model=re.search(r'B\((\d+),\s*([.\d]+)\)',text);n=int(model[1]);prob=Fraction(model[2]);event=re.search(r'P\(X\s*([=<>≤≥]+)\s*(\d+)\)',text);op=event[1];k=int(event[2]);allowed={'=':lambda j:j==k,'≤':lambda j:j<=k,'≥':lambda j:j>=k,'<':lambda j:j<k,'>':lambda j:j>k}[op]
   result=sum(Fraction(math.comb(n,j))*prob**j*(1-prob)**(n-j) for j in range(n+1) if allowed(j));ok(id,num,'exact rational binomial sum',float(ans),result,.000051)
  if id=='S4.2a':
   model=re.search(r'([XZ])\s*~\s*N\(([-.\d]+),\s*([.\d]+)\)',text);mu=float(model[2]);sd=math.sqrt(float(model[3]));dist=NormalDist(mu,sd);event=re.search(r'P\(([^)]+)\)',text)[1];nums=[float(v) for v in re.findall(r'-?\d+(?:\.\d+)?',event)]
   value=dist.cdf(nums[1])-dist.cdf(nums[0]) if len(nums)==2 else dist.cdf(nums[0]) if '<' in event else 1-dist.cdf(nums[0]);ok(id,num,'independent normal CDF',float(ans),value,.0001)
  if id=='S4.2b':
   cleanans=re.sub(r'[^0-9. -]',' ',ans);av=[float(v) for v in re.findall(r'-?\d+(?:\.\d+)?',cleanans)]
   probs=[float(v) for v in re.findall(r'=\s*(0\.\d+)',text)]
   if 'Find a such' in text:
    model=re.search(r'N\(([-.\d]+),\s*([.\d]+)\)',text);dist=NormalDist(float(model[1]),math.sqrt(float(model[2])));ok(id,num,'inverse-normal probability recovery',dist.cdf(av[0]),probs[0],.0003)
   elif 'N(μ,' in text and 'σ²' not in text:
    variance=float(re.search(r'N\(μ,\s*([.\d]+)\)',text)[1]);cut=float(re.search(r'P\(X\s*<\s*([.\d]+)\)',text)[1]);ok(id,num,'unknown mean probability recovery',NormalDist(av[0],math.sqrt(variance)).cdf(cut),probs[0],.0003)
   elif 'N(μ, σ²)' not in text:
    mu=float(re.search(r'N\(([-.\d]+),',text)[1]);cut=float(re.search(r'P\(X\s*>\s*([.\d]+)\)',text)[1]);ok(id,num,'unknown SD probability recovery',1-NormalDist(mu,av[0]).cdf(cut),probs[0],.0003)
   else:
    cuts=[float(v) for v in re.findall(r'P\(X\s*[<>]\s*([.\d]+)\)',text)];dist=NormalDist(*av)
    ok(id,num,'two-parameter lower tail',dist.cdf(cuts[0]),probs[0],.0003);ok(id,num,'two-parameter upper tail',1-dist.cdf(cuts[1]),probs[1],.0003)
  if id in ['P10.1','P10.2','P10.4']:
   vectors=re.findall(r'aria-label="column vector ([^"]+)"',q['question']);v=[[float(x.strip()) for x in s.split(',')] for s in vectors]
   if 'Find |a|' in text:
    val=math.sqrt(sum(x*x for x in v[0]));match=re.search(r'≈\s*([.\d]+)',ans);ok(id,num,'Euclidean magnitude',float(match[1]),val,.00051)
   elif len(v)==2 and 'Find AB' in text:
    out=re.search(r'aria-label="column vector ([^"]+)"',q['answer']);actual=[float(x.strip()) for x in out[1].split(',')]
    for j in range(3):ok(id,num,'displacement component '+str(j),actual[j],v[1][j]-v[0][j])
   elif len(v)==1 and 'unit vector' in text:
    assert sum(x*x for x in v[0])>0
    checks.append({'pack':id,'question':num,'check':'unit-vector source has nonzero magnitude','passed':True})
# These checks accompany, rather than replace, the symbolic checks in author-library.py.
(D/'independent-maths-checks.json').write_text(json.dumps({'checks':checks,'count':len(checks),'limitations':'Checks cover the explicitly listed families; they are not a claim of independent verification of every answer.'},indent=2)+'\n')
print(f'PASS: {len(checks)} independent numerical checks')
