"""Select eight balanced questions; keep the ten-question bank unchanged."""
from pathlib import Path
import json,re,html,copy
ROOT=Path(__file__).resolve().parents[2]
def tex(s):
 s=re.sub(r'\[\[([^|]+)\|([^\]]+)\]\]',lambda m:'$\\frac{'+m[1]+'}{'+m[2]+'}$',s)
 return s.replace('≤','&le;').replace('≥','&ge;')
def graph(kind):
 conf={'journey':(8,320,[(0,0),(2,120),(5,120),(8,300)],'t (min)','D (m)'), 'robot':(4,170,[(i/20,10*(i/20)**2) for i in range(81)],'t (s)','s (m)')}
 xm,ym,pts,xl,yl=conf[kind]
 def xy(x,y):return (35+x/xm*240,110-y/ym*85)
 path=' '.join(('M' if i==0 else 'L')+f'{xy(x,y)[0]:.2f},{xy(x,y)[1]:.2f}' for i,(x,y) in enumerate(pts))
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 142"><path d="M35 20V110H280" fill="none" stroke="#203b43"/><path d="{path}" fill="none" stroke="#146d65" stroke-width="2"/>'
 for x,y in ([(0,0),(2,120),(5,120),(8,300)] if kind=='journey' else [(0,0),(2,40),(4,160)]):
  a,b=xy(x,y);anchor='end' if x==xm else 'start';tx=a-3 if x==xm else a+3;svg+=f'<circle cx="{a}" cy="{b}" r="2" fill="#203b43"/><text x="{tx}" y="{b-5}" text-anchor="{anchor}" font-size="11">({x}, {y})</text>'
 if kind=='robot':
  a,b=xy(1,0);d,e=xy(4,120);svg+=f'<path d="M{a},{b}L{d},{e}" fill="none" stroke="#af7820" stroke-dasharray="4 2"/>'
 return svg+f'<text x="240" y="138" font-size="11">{xl}</text><text x="5" y="12" font-size="11">{yl}</text></svg>'
src=json.loads((ROOT/'data/ap-calculus/questions.json').read_text())
for p in src['packs']:
 p['questions']=[copy.deepcopy(q) for q in p['questions'][:6]+p['questions'][-2:]]
 for i,q in enumerate(p['questions'],1):q['number']=i
 p['description']='Eight-question one-page topic practice'
pilots=json.loads((ROOT/'output/ap-calculus-pilot/pilot-questions.json').read_text())
# Shorter statements retain the numerical data, tasks and answer requirements.
prompts={
'1.1':[
(1,'A tank contains V(t) litres after t minutes. V(3) = 180 and V(7) = 100. Find the average rate on [3, 7]. Interpret its sign and units.'),
(2,'The graph gives distance D from a station. Find the average rate on [0, 8], a constant-distance interval, and the instantaneous rates at t = 1 and t = 6.'),
(3,'H(t) is a smooth pond-depth model (cm), with t in days. Interpret $\\frac{H(6.02)-H(6)}{0.02}$, including units. How does it relate to the rate at day 6?'),
(4,'T(t) is smooth; t is in minutes and T in °C. Find average rates on [3.9, 4] and [4, 4.1]. Estimate the instantaneous rate at t = 4.'),
(5,'The solid curve is position s(t). Its dashed tangent at (2, 40) passes through (1, 0) and (3, 80). Find velocity at t = 2 and average velocity on [0, 2]. Explain the difference.'),
(6,'V(t) is smooth, in m³, with t in hours. Find average rates on [9.9, 10] and [10, 10.1]. Estimate and interpret the rate at t = 10.'),
(9,'A smooth position f(t), in metres, satisfies f(2) = 14 and f(6) = 30; t is in seconds. Find average velocity on [2, 6]. Must the velocity at t = 3 equal it? Explain.'),
(10,'A smooth plant-height model h(t) uses cm and weeks. Find average rates on [3, 3.1] and [3, 3.01]. Estimate the rate at week 3. Why cannot [3, 3] be used?')],
'4.5':[
(1,'Lengths x and y vary with time t (s), with A = 3xy. At x = 2 cm, y = 5 cm, dx/dt = 4 cm/s and dy/dt = −1 cm/s, find dA/dt.'),
(2,'A square plate expands. When its side is 12 cm, its area increases at 48 cm²/s. Find the rate of increase of its side length.'),
(3,'A spherical balloon has radius 6 cm increasing at 0.5 cm/s. Find its exact volume rate. Use $V=\\frac43\\pi r^3$.'),
(4,'A 13 m ladder rests against a vertical wall. Its foot moves away at 0.6 m/s. When the foot is 5 m from the wall, find the signed rate and direction of the top.'),
(6,'A vertex-down conical tank has height 10 m and top radius 5 m. Water enters at 3π m³/min. Find the depth rate at depth 6 m. Use $V=\\frac13\\pi r^2h$.'),
(7,'A balloon rises vertically at 2 m/s. An observer is 40 m from its launch point. Find the exact rate of its angle of elevation (radians) when its height is 30 m.'),
(9,'A cylinder has fixed height 10 cm. Volume increases at 200π cm³/min. At r = 5 cm, find dr/dt. Explain why inserting r = 5 before differentiating gives an incorrect zero rate.'),
(10,'A rectangle has constant area 96 m². At length 12 m and width 8 m, its length increases at 0.5 m/min. Find width and perimeter rates. Explain how perimeter changes while area stays fixed.')]
}
for id,choices in prompts.items():
 p={'id':id,'sourceTool':'limits-first-principles','title':'Change at an instant' if id=='1.1' else 'Solving related rates','scope':'AB + BC','questions':[]}
 for n,(old,text) in enumerate(choices,1):
  q=pilots[id][old-1];question=tex(text)
  for rate in ['dx','dy','dA','dr']:question=question.replace(rate+'/dt', '$\\frac{'+rate+'}{dt}$')
  if q['table']:
   headers,rows=q['table'];question+='<table>'+''.join('<tr>'+''.join('<td>'+html.escape(str(c))+'</td>' for c in row)+'</tr>' for row in [headers]+rows)+'</table>'
  if q.get('visual'):question+=graph(q['visual'])
  steps=[];criteria=[]
  for title,note,eq in q['steps']:
   steps.append(tex('<p><b>'+title+'</b> '+note+'</p>')+(tex('<p>'+eq+'</p>') if eq else ''));criteria.append(title+'.')
  p['questions'].append({'number':n,'question':question,'questionText':re.sub('<[^>]+>',' ',question),'answer':tex(q['answer']),'steps':steps,'criteria':criteria,'marks':q['marks'],'origin':'authored-pilot'})
 src['packs'].append(p)
completion=ROOT/'data/ap-calculus/completion-questions.json'
if completion.exists():src['packs'].extend(json.loads(completion.read_text())['packs'])
assert len({p['id'] for p in src['packs']})==len(src['packs'])
(ROOT/'data/ap-calculus/print-questions.json').write_text(json.dumps(src,indent=2))
print(f"Selected eight questions for each of {len(src['packs'])} packs.")
