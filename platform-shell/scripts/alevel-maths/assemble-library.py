"""Assemble reviewed fixed content in specification order; never publish placeholders."""
from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[2];D=ROOT/'data/alevel-maths/edexcel-9ma0'
plan=json.loads((D/'plan.json').read_text())['packs']
rows=json.loads((D/'selected-questions.json').read_text())['packs']+json.loads((D/'authored-questions.json').read_text())['packs']
by={p['id']:p for p in rows};assert len(by)==140
packs=[]
for item in plan:
 p=by[item['id']];p.setdefault('instructions','Answer on separate paper. Show your working. Give exact answers where appropriate.')
 if p['mode']=='pilot':
  original=next(x for x in json.loads((D/'pilots.json').read_text())['packs'] if x['id']==p['selection'])
  p['title']=original['title']
 for i,q in enumerate(p['questions'],1):
  q['number']=i;q.setdefault('questionText',re.sub('<[^>]+>',' ',q['question']))
  assert q['answer'] and q['steps'] and q['marks']>0,(p['id'],i)
  assert len(q['criteria'])>0
 # Uniform math delimiters remove ambiguity in the shared preparer's currency heuristic.
 def fix(v):
  if isinstance(v,str):
   v=v.replace(r'\cosec',r'\operatorname{cosec}').replace(r'\log{',r'\ln{')
   # Preserve TeX row breaks before a letter (for example the second vector component t + 2).
   if r'\begin{' not in v:v=re.sub(r'\\{2}(?=[A-Za-z])',lambda z:chr(92),v)
   return re.sub(r'(?<!\$)\$([^$\n]+)\$(?!\$)',lambda m:r'\('+m[1]+r'\)',v)
  if isinstance(v,list):return [fix(x) for x in v]
  if isinstance(v,dict):return {k:fix(x) for k,x in v.items()}
  return v
 p=fix(p);packs.append(p)
(D/'library.json').write_text(json.dumps({'version':1,'qualification':'Edexcel UK A level Mathematics 9MA0','packs':packs},ensure_ascii=False,indent=2)+'\n')
print(f'Assembled {len(packs)} packs / {sum(len(p["questions"]) for p in packs)} questions')
