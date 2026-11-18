"""Recalculate selected new banks from printed question inputs, independently of author.py."""
from pathlib import Path
import json,re,math
ROOT=Path(__file__).resolve().parents[2];D=ROOT/'data/csec-maths';packs=json.loads((D/'library.json').read_text())['packs'];checks=[]
def numbers(text):return [float(v.replace(',','')) for v in re.findall(r'\d[\d,]*(?:\.\d+)?',text)]
def record(p,q,expected):
 actual=numbers(q['answer']);assert len(actual)>=len(expected),(p['id'],q['number'],actual,expected)
 for a,e in zip(actual,expected):assert abs(a-e)<.011,(p['id'],q['number'],a,e)
 checks.append({'pack':p['id'],'question':q['number'],'passed':True})
for p in packs:
 for q in p['questions']:
  v=numbers(q['question']);title=p['title']
  if title=='Discount, markup, profit, loss and sales tax':
   price,rate=v[:2];direction=-1 if any(s in q['question'] for s in ['discount','loss']) else 1;record(p,q,[price*(1+direction*rate/100)])
  elif title=='Percentage profit and loss':
   cost,sell=v[:2];record(p,q,[abs(sell-cost),100*abs(sell-cost)/cost])
  elif title=='Hire purchase and instalments':
   cash,deposit,months,pay=v[:4];record(p,q,[deposit+months*pay,deposit+months*pay-cash])
  elif title=='Simple interest':
   principal,rate,years=v[:3];record(p,q,[principal*rate*years/100,principal*(1+rate*years/100)])
  elif title=='Wages and overtime':
   rate,hours,extra,mult=v[:4];record(p,q,[(hours+extra*mult)*rate])
  elif title=='Income tax and net pay':
   gross,allowance,rate,fixed=v[:4];record(p,q,[gross-fixed-(gross-allowance)*rate/100])
  elif title=='Utility bills and tiered tariffs':
   fixed,rate1,limit,rate2,units=v[:5];record(p,q,[fixed+min(units,limit)*rate1+max(0,units-limit)*rate2])
  elif title=='Currency conversion and fees':
   rate,local,fee=v[:3];record(p,q,[(local-fee)/rate])
  elif title=='Insurance premiums and excesses':
   rate,value,claim,excess=v[:4];record(p,q,[rate*value/100,claim-excess])
  elif title=='Linear programming':
   n=int(re.search(r'x\\leq(\d+)',q['question'])[1]);bound=int(re.search(r'x\+y\\leq(\d+)',q['question'])[1]);best=max(3*x+2*y for x in range(n+1) for y in range(n+1) if x+y<=bound)
   actual=int(re.search(r'P=(\d+)',q['answer'])[1]);assert actual==best;checks.append({'pack':p['id'],'question':q['number'],'passed':True,'method':'Enumerated every feasible integer point; all polygon vertices are integral.'})
  elif title=='Subsets and cardinality':
   n=int(v[0]);record(p,q,[2**n,2**n-1,n])
  elif title=='Time calculations and timetables':
   hour,minute,duration=map(int,v[:3]);total=hour*60+minute+duration;record(p,q,[duration//60,duration%60,total//60,total%60])
report={'checks':checks,'total':len(checks),'limitations':'Independent recalculations cover selected new banks, not every answer in the reused libraries.'};(D/'maths-checks.json').write_text(json.dumps(report,indent=2)+'\n');print(f'{len(checks)} selected independent numerical checks passed.')
