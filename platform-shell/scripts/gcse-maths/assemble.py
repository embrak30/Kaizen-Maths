from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[2];D=ROOT/'data/gcse-maths'
plan=json.loads((D/'plan.json').read_text());rows=json.loads((D/'selected-questions.json').read_text())['packs']+json.loads((D/'authored.json').read_text())['packs'];by={p['id']:p for p in rows};assert len(by)==len(plan['packs'])
def fix(v):
 if isinstance(v,str):
  v=re.sub(r'\\{2}(?=[A-Za-z])',lambda m:chr(92),v).replace(r'\cosec',r'\operatorname{cosec}')
  return re.sub(r'(?<!\$)\$([^$\n]+)\$(?!\$)',lambda m:r'\('+m[1]+r'\)',v)
 if isinstance(v,list):return [fix(x) for x in v]
 if isinstance(v,dict):return {k:fix(x) for k,x in v.items()}
 return v
# Advisory GCSE awards: one-mark recall/readings, method marks for multi-step work.
awards={
'N01':2,'N02':2,'N03':2,'N04':1,'N05':2,'N06':2,'N07':2,'N08':[1,1,1,1,1,1,2,1],'N09':2,'N10':2,'N11':[1,1,1,1,2,2,1,2],'N12':2,'N13':3,'N14':3,'N15':[3,3,3,3,2,2,2,2],
'A01':2,'A02':2,'A03':2,'A04':3,'A05':2,'A06':2,'A07':3,'A08':3,'A09':2,'A10':2,'A11':[2,2,2,2,2,2,2,3],'A12':[2,2,2,2,2,2,2,1],'A13':2,'A14':3,'A15':[1,2,1,1,2,2,1,2],'A16':3,'A17':3,'A19':3,'A21':3,'A22':3,'A23':2,'A24':2,'A27':3,'A28':3,'A29':4,'A30':[2,1,2,1,2,1,1,1],'A31':[2,1,2,2,2,3,2,2],'A32':[2,1,3,1,1,2,2,3],
'R01':2,'R02':2,'R03':2,'R04':2,'R05':1,'R06':3,'R07':2,'R08':2,'R09':3,'R10':2,'R11':3,'R12':3,
'G01':2,'G02':3,'G03':2,'G04':[1,1,1,2,1,2,2,2],'G05':[1,1,1,1,2,2,3,2],'G06':3,'G07':3,'G08':3,'G09':2,'G10':3,'G11':[2,2,2,2,3,3,3,2],'G12':3,'G13':2,'G14':3,'G15':[2,3,2,3,2,3,2,3],'G16':3,'G17':[1,1,1,2,2,2,2,1],'G18':3,'G19':2,'G20':2,'G21':3,'G22':3,'G23':1,'G24':4,'G25':[3,4,3,3,2,2,4,3],'G26':2,'G27':2,'G29':3,
'P01':[1,1,1,1,1,2,1,1],'P02':[1,1,2,2,2,2,1,2],'P03':2,'P04':[1,3,1,3,1,3,1,3],'P05':2,'P06':3,'P07':[1,1,2,2,1,2,2,2],
'S01':[2,1,1,1,2,1,2,2],'S02':[1,2,2,1,1,1,1,1],'S03':[1,2,2,3,1,2,2,1],'S04':[1,2,2,2,2,2,2,2],'S05':[1,1,1,1,2,1,2,2],'S06':[1,1,1,2,1,2,2,2],'S07':[1,1,2,2,1,2,1,2],'S11':[1,2,2,2,2,2,2,2]
}
packs=[]
for item in plan['packs']:
 p=by[item['id']];p['area']=item['area'];p['tier']=item['tier'];p['reference']=item['reference'];p['title']=item['title'];p.setdefault('instructions','Answer on separate paper. Show your working. Give exact answers unless a rounding instruction is stated.')
 for i,q in enumerate(p['questions'],1):
  award=awards.get(p['id'],q['marks']);mark=award[i-1] if isinstance(award,list) else award
  if p['id']=='N01' and len(re.findall(r'[+×÷-]',q['question']))<=1:mark=1
  q['marks']=mark
  q['criteria']=(['B1: Correct independent result or fact [1].'] if mark==1 else ['M1: Correct mathematical method [1].','A1: Correct result and required units or interpretation [1].'] if mark==2 else ['M1: Correct mathematical setup [1].','M1: Correct intermediate working [1].','A1: Correct final result or conclusion [1].'] if mark==3 else ['M1: Correct initial setup [1].','M1: Correct multi-step method [1].','A1: Correct intermediate result [1].','A1: Correct final result or conclusion [1].'])
  q['number']=i;assert q['question'] and q['answer'] and q['steps'];q.setdefault('questionText',q['question'])
 assert len(p['questions'])==8,p['id'];packs.append(fix(p))
(D/'library.json').write_text(json.dumps({**plan,'packs':packs},indent=2,ensure_ascii=False)+'\n')
print(f'Assembled {len(packs)} packs / {len(packs)*8} questions.')
