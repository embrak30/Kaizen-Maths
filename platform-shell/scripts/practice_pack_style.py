"""Approved Kaizen practice-pack typography and reusable question-page design."""
from pathlib import Path
import re,json,io,html,math as mathlib
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from pypdf import PdfReader,PdfWriter
ROOT=Path(__file__).resolve().parents[1]
BUNDLE=Path('/Users/barker/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/libreoffice-headless/libreoffice/LibreOfficeDev.app/Contents/Resources/fonts/truetype')
for name,path in [('STIX','/System/Library/Fonts/Supplemental/STIXTwoText.ttf'),('STIXItalic','/System/Library/Fonts/Supplemental/STIXTwoText-Italic.ttf'),('Sans',str(BUNDLE/'Carlito-Regular.ttf')),('SansBold',str(BUNDLE/'Carlito-Bold.ttf'))]:pdfmetrics.registerFont(TTFont(name,path))
W,H=595.276,841.89
INK='#26344B';PURPLE='#5751C5';TEAL='#008F91';LIGHT='#F1EFFB';MUTED='#607089';LINE='#D9DEEB'
def fill(c,color):c.setFillColor(HexColor(color))
def stroke(c,color):c.setStrokeColor(HexColor(color))
def text(c,x,y,s,font,size,color=INK):fill(c,color);c.setFont(font,size);c.drawString(x,y,s)
def math_markup(s):
 s=re.sub(r'\\[()[\]]|\$\$', '', s)
 s=re.sub(r'\\(?:big|left|right)', '', s).replace('\\cdot','×').replace('\\;',' ').replace('\\,',' ')
 assert not re.search(r'\\[A-Za-z]',s),s
 s=re.sub(r'\s*([=+\-])\s*',lambda m:' '+('−' if m[1]=='-' else m[1])+' ',s).strip()
 s=re.sub(r'(^|[=(,+×])\s*−\s*(?=\d|[a-z])',lambda m:m[1]+'−',s)
 s=html.escape(s)
 s=re.sub(r'(?<![A-Za-z])([abcxy]{1,3})(?![A-Za-z])',r'<font name="STIXItalic">\1</font>',s)
 return re.sub(r'\^\{?(-?\d+)\}?',r'<super size="60%" rise="38%">\1</super>',s)

def math(c,s,x,y,width,size=21,color=INK):
 p=Paragraph(math_markup(s),ParagraphStyle('math',fontName='STIX',fontSize=size,leading=size*1.25,textColor=HexColor(color)))
 _,h=p.wrap(width,100);p.drawOn(c,x,y-h);return y-h

def question_page(pack,total):
 b=io.BytesIO();c=canvas.Canvas(b,pagesize=(W,H),invariant=1)
 # Brand ribbon and clipped abstract paths, confined to the header.
 fill(c,PURPLE);c.rect(0,H-12,W,12,fill=1,stroke=0)
 fill(c,LIGHT);p=c.beginPath();p.moveTo(353,H-12);p.lineTo(W,H-12);p.lineTo(W,H-157);p.lineTo(453,H-157);p.close();c.drawPath(p,fill=1,stroke=0)
 c.saveState();p=c.beginPath();p.rect(350,H-158,W-350,146);c.clipPath(p,stroke=0)
 stroke(c,'#C7C3F0');c.setLineWidth(1.1)
 for r in [37,62,87,112]:c.circle(W-17,H-40,r,stroke=1,fill=0)
 stroke(c,'#62BDB5');c.setLineWidth(7);c.arc(W-129,H-158,W+55,H+26,startAng=180,extent=90)
 stroke(c,'#A59DE6');c.setLineWidth(3);c.line(421,H-148,454,H-116);c.line(454,H-116,474,H-136)
 c.restoreState()
 fill(c,PURPLE);c.roundRect(32,H-64,29,29,6,fill=1,stroke=0);text(c,39,H-57,'K','STIX',23,'#FFFFFF')
 text(c,71,H-45,'KAIZEN MATHS','SansBold',11,PURPLE);text(c,71,H-59,'10-MINUTE PRACTICE','Sans',7.4,MUTED)
 text(c,32,H-102,'Algebraic substitution','STIX',29)
 text(c,33,H-126,pack['title'],'SansBold',14,INK)
 text(c,33,H-145,pack['description'],'Sans',10.5,MUTED)
 # Small metadata strip anchors the page without a large information block.
 fill(c,'#E8F6F3');c.roundRect(32,H-178,216,22,6,fill=1,stroke=0)
 text(c,43,H-171,f"10 MINUTES   /   {len(pack['questions'])} QUESTIONS   /   {pack['id']}",'SansBold',9,TEAL)
 text(c,32,H-203,'Name','Sans',10,MUTED);stroke(c,LINE);c.setLineWidth(.65);c.line(61,H-206,325,H-206)
 text(c,367,H-203,'Date','Sans',10,MUTED);c.line(394,H-206,W-32,H-206)
 text(c,32,H-225,'Show your working. Use brackets for negative values.','Sans',10.5,INK)
 left=32;gap=14;cw=(W-2*left-gap)/2;top=H-244;bottom=52;rowgap=11;rows=mathlib.ceil(len(pack['questions'])/2);ch=(top-bottom-(rows-1)*rowgap)/rows
 for i,q in enumerate(pack['questions']):
  x=left+(i%2)*(cw+gap);y=top-(i//2)*(ch+rowgap);accent=PURPLE if i%2==0 else TEAL
  fill(c,'#FFFFFF');stroke(c,'#D5D7EA' if i%2==0 else '#CBE2DF');c.setLineWidth(.7);c.roundRect(x,y-ch,cw,ch,8,fill=1,stroke=1)
  fill(c,LIGHT if i%2==0 else '#E8F6F3');c.circle(x+21,y-22,11,fill=1,stroke=0)
  text(c,x+17.5,y-25.5,str(i+1),'SansBold',11,accent)
  text(c,x+40,y-24,'Given','Sans',10.5,MUTED);yy=math(c,q['given'],x+70,y-10,cw-85,16)
  if q.get('task'):
   task=Paragraph(re.sub(r'\\[()[\]]','',q['task']),ParagraphStyle('task',fontName='Sans',fontSize=9,leading=12,textColor=HexColor(MUTED)))
   _,th=task.wrap(cw-28,100);task.drawOn(c,x+14,yy-8-th);yy-=th+13
  else:yy=min(yy-4,y-33)
  text(c,x+14,yy-15,'Simplify' if q.get('task') else 'Evaluate','Sans',9,MUTED);yy=math(c,q['expression'],x+63,yy,cw-77,21 if pack['level']>=2 else 23)
  assert yy>y-ch+48,(pack['id'],q['number'],'question overflow')
  stroke(c,'#E3E7EF');c.setLineWidth(.55)
  for offset in [17,36]:c.line(x+14,y-ch+offset,x+cw-14,y-ch+offset)
 # Restrained footer brand detail, outside writing areas.
 stroke(c,LINE);c.line(32,39,W-32,39)
 fill(c,PURPLE);c.rect(32,38,38,2,fill=1,stroke=0);fill(c,TEAL);c.rect(70,38,18,2,fill=1,stroke=0)
 text(c,32,24,'KAIZEN MATHS  /  PRACTICE PACKS','SansBold',7.5,MUTED)
 c.setFont('Sans',8);fill(c,MUTED);c.drawRightString(W-32,24,f"{pack['id']}  ·  Questions  ·  1 / {total}")
 c.showPage();c.save();b.seek(0);return PdfReader(b).pages[0]
