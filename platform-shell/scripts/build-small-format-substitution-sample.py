"""Print-ready half-sheet starters and quarter-sheet exit tickets, plus teacher solutions."""
from pathlib import Path
import json,re
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from pypdf import PdfReader
import practice_pack_style as d
ROOT=Path(__file__).resolve().parents[1];W,H=d.W,d.H
source=json.loads((ROOT/'data/practice-packs/substitution.json').read_text())['packs'][0]['questions']
STARTER=[source[i] for i in [0,1,4,5]];EXIT=[source[i] for i in [2,6,7]]

def rule(c,x1,y1,x2,y2,color=d.LINE,dash=None):
 d.stroke(c,color);c.setLineWidth(.55);c.setDash(dash or []);c.line(x1,y1,x2,y2);c.setDash([])
def ornament(c,x,y,w,accent):
 c.saveState();p=c.beginPath();p.rect(x+w-82,y-66,65,49);c.clipPath(p,stroke=0)
 d.stroke(c,'#D8D4F1' if accent==d.PURPLE else '#C1E4DF');c.setLineWidth(.8)
 for r in [19,32,45]:c.circle(x+w-20,y-16,r,stroke=1,fill=0)
 c.restoreState()
def brand(c,x,y,w,title,accent,small=False):
 d.fill(c,accent);c.rect(x+18,y-10,w-36,2,fill=1,stroke=0)
 d.fill(c,accent);c.roundRect(x+19,y-44,21,22,4,fill=1,stroke=0);d.text(c,x+24,y-39,'K','STIX',18,'#FFFFFF')
 d.text(c,x+48,y-29,'KAIZEN MATHS','SansBold',8,accent)
 d.text(c,x+48,y-48,title,'STIX',21 if not small else 19)
 ornament(c,x,y,w,accent)
 d.text(c,x+20,y-65,'Algebraic substitution','SansBold',10,d.INK)
 d.text(c,x+20,y-79,'Linear expressions','Sans',9,d.MUTED)
def identity(c,x,y,w):
 d.text(c,x+20,y,'Name','Sans',9,d.MUTED);rule(c,x+46,y-2,x+w-20,y-2)
def footer(c,x,y,w,label):
 d.text(c,x+20,y,label,'Sans',7,d.MUTED)
 c.setFont('SansBold',7);d.fill(c,d.TEAL);c.drawRightString(x+w-20,y,'Show your working')

def starter(c,x,y,w,h):
 brand(c,x,y,w,'Lesson starter',d.PURPLE)
 d.text(c,x+w-125,y-79,'4 questions · 5 minutes','Sans',9,d.MUTED)
 identity(c,x,y-100,w)
 d.text(c,x+20,y-119,'Evaluate each expression. Use brackets for negative values.','Sans',10,d.INK)
 gap=12;cw=(w-40-gap)/2;top=y-133;ch=(h-159-gap)/2
 for i,q in enumerate(STARTER):
  qx=x+20+(i%2)*(cw+gap);qy=top-(i//2)*(ch+gap)
  d.stroke(c,'#D9D4EF');c.setLineWidth(.6);c.roundRect(qx,qy-ch,cw,ch,6,fill=0,stroke=1)
  d.text(c,qx+10,qy-19,str(i+1),'SansBold',10,d.PURPLE)
  d.text(c,qx+28,qy-18,'Given','Sans',9,d.MUTED);d.math(c,q['given'],qx+54,qy-6,cw-65,13)
  bottom=d.math(c,q['expression'],qx+14,qy-29,cw-28,21)
  for offset in [19,39]:
   liney=qy-ch+offset
   if liney<bottom-9:rule(c,qx+13,liney,qx+cw-13,liney)
 footer(c,x,y-h+12,w,'S-01 · Starter')

def exit_ticket(c,x,y,w,h):
 brand(c,x,y,w,'Exit ticket',d.TEAL,small=True)
 d.text(c,x+w-121,y-79,'3 questions · 3 minutes','Sans',8.5,d.MUTED)
 identity(c,x,y-101,w)
 d.text(c,x+20,y-118,'Evaluate each expression.','Sans',10,d.INK)
 top=y-131;rh=(h-158)/3
 for i,q in enumerate(EXIT):
  qy=top-i*rh
  d.text(c,x+20,qy-14,str(i+1),'SansBold',10,d.TEAL)
  d.text(c,x+37,qy-13,'Given','Sans',9,d.MUTED);d.math(c,q['given'],x+63,qy-1,w-86,13)
  d.math(c,q['expression'],x+37,qy-23,w-58,18)
  rule(c,x+37,qy-rh+8,x+w-20,qy-rh+8)
 footer(c,x,y-h+11,w,'E-01 · Exit ticket')

def teacher_page(c):
 d.fill(c,d.PURPLE);c.rect(0,H-8,W,8,fill=1,stroke=0)
 d.text(c,28,H-35,'KAIZEN MATHS','SansBold',10,d.PURPLE)
 d.text(c,28,H-68,'Teacher answers & working','STIX',24)
 d.text(c,28,H-89,'S-01 Starter / E-01 Exit ticket · Algebraic substitution','Sans',10,d.MUTED)
 d.text(c,28,H-107,'Print page 1 for two starters, page 2 for four exit tickets. Cut along the dashed lines.','Sans',9,d.MUTED)
 d.text(c,28,H-120,'Print student pages single-sided at actual size (100%). Keep this page for the teacher.','Sans',8,d.MUTED)
 gap=20;cw=(W-56-gap)/2;top=H-133;rh=157
 for col,(title,questions,accent) in enumerate([('Starter',STARTER,d.PURPLE),('Exit ticket',EXIT,d.TEAL)]):
  x=28+col*(cw+gap);d.text(c,x,top,title,'SansBold',13,accent)
  for i,q in enumerate(questions):
   y=top-18-i*rh
   rule(c,x,y,x+cw,y)
   d.text(c,x,y-21,str(i+1),'SansBold',10,accent)
   d.text(c,x+20,y-21,'Given','Sans',9,d.MUTED);d.math(c,q['given'],x+47,y-9,cw-50,12)
   yy=d.math(c,q['expression'],x+20,y-33,cw-24,16)-4
   steps=[s for s in q['steps'] if s.startswith('$$')]
   for step in steps:yy=d.math(c,step,x+20,yy,cw-24,14)-3
   assert yy>y-rh+8,(title,i,yy,y-rh)
  if col==1:
   y=top-18-3*rh
   d.text(c,x,y-20,'Use the exit ticket to spot:','SansBold',10,d.TEAL)
   for j,line in enumerate(['• correct substitution of negative values','• brackets around substituted negatives','• multiplication before addition/subtraction']):d.text(c,x,y-39-j*17,line,'Sans',9,d.INK)
 rule(c,28,35,W-28,35);d.text(c,28,21,'KAIZEN MATHS · STARTERS & EXIT TICKETS','SansBold',7,d.MUTED)
 c.setFont('Sans',8);c.drawRightString(W-28,21,'Teacher copy · Page 3 of 3')

def main():
 out=ROOT/'output/pdf/design-samples/substitution-starter-exit-ticket-small-format.pdf';out.parent.mkdir(parents=True,exist_ok=True)
 c=canvas.Canvas(str(out),pagesize=(W,H),invariant=1)
 c.setTitle('Kaizen Maths | Half-sheet starters and quarter-sheet exit tickets | Substitution');c.setAuthor('Kaizen Maths')
 for y in [H,H/2]:starter(c,0,y,W,H/2)
 rule(c,9,H/2,W-9,H/2,'#8B98AA',[4,4]);c.showPage()
 for x in [0,W/2]:
  for y in [H,H/2]:exit_ticket(c,x,y,W/2,H/2)
 rule(c,W/2,9,W/2,H-9,'#8B98AA',[4,4]);rule(c,9,H/2,W-9,H/2,'#8B98AA',[4,4]);c.showPage()
 teacher_page(c);c.showPage();c.save()
 reader=PdfReader(out);assert len(reader.pages)==3
 def norm(s):return re.sub(r'\\[()[\]]|\$\$|\s','',s).replace('−','-').replace('\\cdot','×')
 for page,questions,copies in [(reader.pages[0],STARTER,2),(reader.pages[1],EXIT,4)]:
  text=norm(page.extract_text())
  for q in questions:
   assert text.count(norm(q['given']))>=copies
   assert text.count(norm(q['expression']))>=copies
 teacher=norm(reader.pages[2].extract_text())
 for q in STARTER+EXIT:
  assert norm(q['answer']) in teacher
  for step in q['steps']:
   if step.startswith('$$'):assert norm(step) in teacher
 print(out);print('PASS: two identical starters, four identical exit tickets, and complete teacher working for all seven questions.')
if __name__=='__main__':main()
