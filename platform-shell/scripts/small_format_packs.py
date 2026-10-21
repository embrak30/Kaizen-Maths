"""Approved half-page starters, quarter-page exit tickets and matching teacher working."""
import re,math
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
import practice_pack_style as d
W,H=d.W,d.H

def rule(c,x1,y1,x2,y2,color=d.LINE,dash=None):
 d.stroke(c,color);c.setLineWidth(.55);c.setDash(dash or []);c.line(x1,y1,x2,y2);c.setDash([])
def plain(s):
 s=re.sub(r'\\(?:big|left|right)','',s).replace('\\;',' ').replace('\\,',' ').replace('\\cdot','×')
 return re.sub(r'\\[()[\]]','',s)
def paragraph(s,width,size=10,maths=False,color=None):
 return Paragraph(d.math_markup(s) if maths else plain(s),ParagraphStyle('text',fontName='STIX' if maths else 'Sans',fontSize=size,leading=size*1.3,textColor=d.HexColor(color or d.INK)))
def put(c,p,x,top,width):
 _,height=p.wrap(width,1000);p.drawOn(c,x,top-height);return top-height

def choose(pack):
 qs=pack['questions'];starter=qs[:4]
 if len(qs)==8:exits=[('E-A',qs[4:7]),('E-B',qs[5:8])]
 elif len(qs)>4:exits=[('E',qs[-3:])]
 else:exits=[('E',qs[-2:] if pack['level']>=3 else qs[-3:])]
 assert {q['number'] for q in starter+sum([v for _,v in exits],[])}=={q['number'] for q in qs}
 return starter,exits

def brand(c,x,y,w,title,pack,accent,small=False):
 d.fill(c,accent);c.rect(x+18,y-10,w-36,2,fill=1,stroke=0)
 d.fill(c,accent);c.roundRect(x+19,y-44,21,22,4,fill=1,stroke=0);d.text(c,x+24,y-39,'K','STIX',18,'#FFFFFF')
 d.text(c,x+48,y-29,'KAIZEN MATHS','SansBold',8,accent);d.text(c,x+48,y-48,title,'STIX',19 if small else 21)
 c.saveState();p=c.beginPath();p.rect(x+w-82,y-66,65,49);c.clipPath(p,stroke=0);d.stroke(c,'#C1E4DF' if small else '#D8D4F1');c.setLineWidth(.8)
 for r in [19,32,45]:c.circle(x+w-20,y-16,r,stroke=1,fill=0)
 c.restoreState();d.text(c,x+20,y-65,'Algebraic substitution','SansBold',10,d.INK)
 titlep=paragraph(pack['title'],w-40,8.5,color=d.MUTED);bottom=put(c,titlep,x+20,y-70,w-40)
 return bottom

def identity(c,x,y,w):
 d.text(c,x+20,y,'Name','Sans',9,d.MUTED);rule(c,x+46,y-2,x+w-20,y-2)
def footer(c,x,y,w,label):
 d.text(c,x+20,y,label,'Sans',7,d.MUTED);c.setFont('SansBold',7);d.fill(c,d.TEAL);c.drawRightString(x+w-20,y,'Show your working')

def starter(c,x,y,w,h,pack,questions):
 brand(c,x,y,w,'Lesson starter',pack,d.PURPLE)
 identity(c,x,y-103,w)
 instruction='Substitute, then expand and simplify.' if pack['level']>=3 else 'Evaluate each expression. Use brackets for negative values.'
 d.text(c,x+20,y-121,instruction,'Sans',10,d.INK)
 c.setFont('Sans',8);d.fill(c,d.MUTED);c.drawRightString(x+w-20,y-86,f"4 questions · about {8 if pack['level']>=3 else 5} minutes")
 gap=12;cw=(w-40-gap)/2;top=y-134;ch=(h-160-gap)/2
 for i,q in enumerate(questions):
  qx=x+20+i%2*(cw+gap);qy=top-i//2*(ch+gap)
  d.stroke(c,'#D9D4EF');c.setLineWidth(.6);c.roundRect(qx,qy-ch,cw,ch,6,fill=0,stroke=1)
  d.text(c,qx+10,qy-19,f'S{i+1}','SansBold',9,d.PURPLE)
  d.text(c,qx+33,qy-18,'Given','Sans',9,d.MUTED)
  yy=put(c,paragraph(q['given'],cw-72,13,True),qx+60,qy-6,cw-72)-5
  if q.get('task'):yy=put(c,paragraph(q['task'],cw-28,8),qx+14,yy,cw-28)-3
  yy=put(c,paragraph(q['expression'],cw-28,18 if pack['level']>=3 else 21,True),qx+14,yy,cw-28)
  assert yy>qy-ch+25,(pack['id'],'starter text overflow',i)
  for offset in [17,35]:
   liney=qy-ch+offset
   if liney<yy-8:rule(c,qx+13,liney,qx+cw-13,liney)
 footer(c,x,y-h+12,w,pack['id']+' · S · Starter')

def exit_ticket(c,x,y,w,h,pack,questions,variant):
 titlebottom=brand(c,x,y,w,'Exit ticket',pack,d.TEAL,True)
 namey=min(y-105,titlebottom-18);identity(c,x,namey,w)
 d.text(c,x+20,namey-18,'Simplify each expression.' if pack['level']>=3 else 'Evaluate each expression.','Sans',9.5,d.INK)
 top=namey-29;bottom=y-h+27;rh=(top-bottom)/len(questions)
 for i,q in enumerate(questions):
  qy=top-i*rh;d.text(c,x+20,qy-14,f'{variant}{i+1}','SansBold',9,d.TEAL)
  d.text(c,x+49,qy-13,'Given','Sans',9,d.MUTED)
  yy=put(c,paragraph(q['given'],w-98,12,True),x+75,qy-1,w-98)-4
  if q.get('task'):yy=put(c,paragraph(q['task'],w-57,8),x+37,yy,w-57)-4
  yy=put(c,paragraph(q['expression'],w-57,16 if pack['level']>=3 else 18,True),x+37,yy,w-57)
  liney=qy-rh+9;assert yy>liney+10,(pack['id'],'exit text overflow',variant,i)
  rule(c,x+37,liney,x+w-20,liney)
 footer(c,x,y-h+11,w,f"{pack['id']} · {variant} · {len(questions)} questions")

def teacher_blocks(pack,starter,exits):
 aliases={q['number']:[] for q in pack['questions']}
 for i,q in enumerate(starter):aliases[q['number']].append(f'S{i+1}')
 for name,qs in exits:
  for i,q in enumerate(qs):aliases[q['number']].append(f'{name}{i+1}')
 width=(W-76)/2;blocks=[]
 for q in pack['questions']:
  parts=[paragraph('Given '+plain(q['given']),width-20,10),paragraph(q['expression'],width-20,16,True)]
  if q.get('task'):parts.append(paragraph(q['task'],width-20,9))
  for step in q['steps']:
   if step.startswith('No numerical value'):continue
   parts.append(paragraph(step,width-20,13 if step.startswith('$$') else 9,step.startswith('$$')))
  height=25+sum(p.wrap(width-20,1000)[1]+4 for p in parts)+7
  assert height<H-175,(pack['id'],'solution too tall')
  blocks.append((' / '.join(aliases[q['number']]),parts,height))
 pages=[];page=[[],[]];col=0;used=0;capacity=H-179
 for block in blocks:
  if used+block[2]>capacity:
   if col==0:col=1;used=0
   else:pages.append(page);page=[[],[]];col=0;used=0
  page[col].append(block);used+=block[2]
 pages.append(page);return pages

def teacher(c,pack,page,index,total):
 d.fill(c,d.PURPLE);c.rect(0,H-8,W,8,fill=1,stroke=0)
 d.text(c,28,H-35,'KAIZEN MATHS','SansBold',10,d.PURPLE)
 d.text(c,28,H-65,'Teacher answers & working','STIX',24)
 d.text(c,28,H-84,pack['id']+' · '+pack['title'],'Sans',10,d.MUTED)
 d.text(c,28,H-101,'Page 1: two starters. Page 2: four exit tickets. Cut along the dashed lines.','Sans',9,d.MUTED)
 d.text(c,28,H-115,'Print student pages single-sided at 100%. Match S and E labels to the solutions below.','Sans',8,d.MUTED)
 cw=(W-76)/2
 for col,blocks in enumerate(page):
  x=28+col*(cw+20);y=H-137
  for label,parts,height in blocks:
   rule(c,x,y,x+cw,y);d.text(c,x,y-16,label,'SansBold',10,d.PURPLE if label.startswith('S') else d.TEAL)
   yy=y-25
   for p in parts:yy=put(c,p,x+10,yy,cw-20)-4
   assert yy>=42,(pack['id'],label,'teacher overflow')
   y-=height
 rule(c,28,35,W-28,35);d.text(c,28,21,'KAIZEN MATHS · STARTERS & EXIT TICKETS','SansBold',7,d.MUTED)
 c.setFont('Sans',8);c.drawRightString(W-28,21,f'Teacher copy · Page {index} of {total}')

def draw_students(c,pack,starter_questions,exits):
 for y in [H,H/2]:starter(c,0,y,W,H/2,pack,starter_questions)
 rule(c,9,H/2,W-9,H/2,'#8B98AA',[4,4]);c.showPage()
 # One variant is repeated four times; two variants each appear twice.
 slots=[exits[0]]*4 if len(exits)==1 else [exits[0],exits[1],exits[0],exits[1]]
 for (x,y),(variant,questions) in zip([(0,H),(W/2,H),(0,H/2),(W/2,H/2)],slots):exit_ticket(c,x,y,W/2,H/2,pack,questions,variant)
 rule(c,W/2,9,W/2,H-9,'#8B98AA',[4,4]);rule(c,9,H/2,W-9,H/2,'#8B98AA',[4,4]);c.showPage()
