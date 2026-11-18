"""Shared authoring helpers for original fixed 9MA0 papers."""
from pathlib import Path
import sys,os,json,re,math
sys.path.insert(0,os.environ.get('KAIZEN_AP_PYTHON_MODULES','/tmp/kaizen-ap-python'))
import sympy as S
ROOT=Path(__file__).resolve().parents[2];DATA=ROOT/'data/gcse-maths'
x,t,n=S.symbols('x t n',real=True)
plans=json.loads((DATA/'plan.json').read_text())['packs'];byid={p['id']:p for p in plans}
banks={};checks=[]
def m(v):return '$'+(S.latex(v) if not isinstance(v,str) else v)+'$'
def l(v):return S.latex(S.simplify(v))
def q(prompt,answer,steps,criteria=None):
 criteria=criteria or ['M1: Correct mathematical setup [1].','M1: Correct intermediate working [1].','A1: Correct conclusion or value [1].']
 return {'question':prompt,'questionText':re.sub('<[^>]+>',' ',prompt),'answer':answer,'steps':[f'<p><b>{i}.</b> {v}</p>' for i,v in enumerate(steps,1)],'criteria':criteria,'marks':sum(int(re.search(r'\[(\d+)\]',v)[1]) for v in criteria),'origin':'authored-9ma0'}
def two(prompt,answer,steps):return q(prompt,answer,steps,['M1: Correct reasoning or method [1].','A1: Correct result and interpretation [1].'])
def add(id,questions,stimulus='',instructions='Answer on separate paper. Show your working. Give exact answers where appropriate.'):
 assert len(questions)==8,(id,len(questions));assert len({v['question'] for v in questions})==8,id
 for i,v in enumerate(questions,1):v['number']=i
 banks[id]={**byid[id],'plannedMode':byid[id]['mode'],'mode':'authored','sourceTool':'limits-first-principles','questions':questions,'stimulus':stimulus,'instructions':instructions}
def ck(name,a,b):
 assert S.simplify(a-b)==0,(name,a,b)
 checks.append({'name':name,'passed':True})
def table(headers,rows):return '<table>'+''.join('<tr>'+''.join('<td>'+str(c)+'</td>' for c in row)+'</tr>' for row in [headers]+rows)+'</table>'
def svg(body,w=360,h=150,label='Mathematical diagram'):return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" aria-label="{label}">'+body+'</svg>'
def tx(a,b,s,size=12):return f'<text x="{a}" y="{b}" font-family="Arial" font-size="{size}" fill="#203b43">{s}</text>'
def line(a,b,c,d,color='#146d65',dash=False):return f'<path d="M{a},{b}L{c},{d}" fill="none" stroke="{color}" stroke-width="1.7"'+(' stroke-dasharray="4 3"' if dash else '')+'/>'
def plot(f,x0=-2,x1=4,y0=-2,y1=6,label='y',points=()):
 def xy(a,b):return 35+280*(a-x0)/(x1-x0),125-105*(b-y0)/(y1-y0)
 ax,ay=xy(0,0);body=line(30,ay,325,ay,'#829b91')+line(ax,132,ax,12,'#829b91')+tx(331,ay+4,'x')+tx(ax+5,12,label)
 for v in range(math.ceil(x0),math.floor(x1)+1):
  xx,yy=xy(v,0);body+=tx(xx-3,ay+14,str(v),10)
 for v in range(math.ceil(y0),math.floor(y1)+1,max(1,math.ceil((y1-y0)/8))):
  if v:
   xx,yy=xy(0,v);body+=tx(ax-20,yy+3,str(v),10)
 path='';active=False;prev=None
 for i in range(401):
  xx=x0+(x1-x0)*i/400
  try:yy=float(f(xx));valid=math.isfinite(yy) and y0<=yy<=y1
  except:valid=False
  if valid:
   px,py=xy(xx,yy);path+=('L' if active and abs(yy-prev)<(y1-y0)*.2 else 'M')+f'{px:.2f},{py:.2f} ';active=True;prev=yy
  else:active=False
 body+=f'<path d="{path}" fill="none" stroke="#146d65" stroke-width="2"/>'
 for aa,bb in points:
  px,py=xy(aa,bb);body+=f'<circle cx="{px}" cy="{py}" r="3" fill="#146d65"/>'+tx(px+4,py-7,f'({aa}, {bb})',11)
 return svg(body,360,155,'Function graph')
def motion_graph(points,xmax,ymax):
 def xy(a,b):return 35+280*a/xmax,125-100*b/ymax
 body=line(35,20,35,125,'#829b91')+line(35,125,330,125,'#829b91')+tx(292,149,'t (s)')+tx(7,13,'v (m/s)')
 for j,(a,b) in enumerate(points):
  xx,yy=xy(a,b);body+=tx(xx-4,141,str(a),11)+tx(xx+3,yy-5,str(b),11)
  if j:
   px,py=xy(*points[j-1]);body+=line(px,py,xx,yy)
 return svg(body,360,155,'Piecewise motion graph')
