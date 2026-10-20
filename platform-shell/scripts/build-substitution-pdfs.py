"""Build the fixed pilot PDFs from the checked classroom-generator snapshot."""
from pathlib import Path
import json,re,html,math,shutil,os
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from pypdf import PdfReader
ROOT=Path(__file__).resolve().parents[1]
FONT=Path(os.environ.get('KAIZEN_PDF_FONT_DIR','/Users/barker/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/libreoffice-headless/libreoffice/LibreOfficeDev.app/Contents/Resources/fonts/truetype'))
for name,file in [('Body','DejaVuSans.ttf'),('BodyBold','DejaVuSans-Bold.ttf'),('Math','DejaVuSerif.ttf')]:pdfmetrics.registerFont(TTFont(name,str(FONT/file)))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='BodyBold',italic='Body',boldItalic='BodyBold')
W,H=595.276,841.89
INK='#24334A';MUTED='#617189';PURPLE='#5B5CE2';TEAL='#108F91';LINE='#DCE3ED'
styles={
 'small':ParagraphStyle('small',fontName='Body',fontSize=9,leading=14,textColor=HexColor(MUTED)),
 'body':ParagraphStyle('body',fontName='Body',fontSize=10,leading=15,textColor=HexColor(INK)),
 'math':ParagraphStyle('math',fontName='Math',fontSize=14,leading=23,textColor=HexColor(INK)),
 'step':ParagraphStyle('step',fontName='Body',fontSize=9,leading=14,textColor=HexColor(MUTED)),
 'answer':ParagraphStyle('answer',fontName='Math',fontSize=15,leading=25,textColor=HexColor(TEAL))}
def clean(s):
 s=re.sub(r'\\[()[\]]|\$\$','',s)
 s=re.sub(r'\\(?:big|left|right)','',s).replace('\\cdot','×').replace('\\;',' ').replace('\\,',' ')
 assert not re.search(r'\\[A-Za-z]',s),s
 return s.strip()
def markup(s):
 s=html.escape(clean(s))
 return re.sub(r'\^\{?(-?\d+)\}?',r'<super>\1</super>',s)
def para(c,s,x,y,width,kind='body',raw=False):
 p=Paragraph(s if raw else markup(s),styles[kind]);_,height=p.wrap(width,700)
 assert y-height>=42,(s,y,height)
 p.drawOn(c,x,y-height);return y-height

def header(c,pack,section,page,total):
 c.setFillColor(HexColor(PURPLE));c.roundRect(36,H-61,27,27,5,fill=1,stroke=0)
 c.setFillColor(HexColor('#FFFFFF'));c.setFont('BodyBold',17);c.drawString(42,H-54,'K')
 c.setFont('BodyBold',9);c.setFillColor(HexColor(INK));c.drawString(73,H-44,'KAIZEN MATHS')
 c.setFont('Body',8);c.setFillColor(HexColor(MUTED));c.drawString(73,H-58,'10-MINUTE PRACTICE  /  ALGEBRAIC SUBSTITUTION')
 c.setFont('BodyBold',9);c.setFillColor(HexColor(TEAL));c.drawRightString(W-36,H-44,pack['id'])
 c.setStrokeColor(HexColor(LINE));c.line(36,H-76,W-36,H-76)
 c.setFont('Body',8);c.setFillColor(HexColor(MUTED));c.drawString(36,26,f"{pack['id']}  ·  {section}  ·  Version {pack['version']}");c.drawRightString(W-36,26,f'{page} / {total}')

def title(c,text,subtitle):
 c.setFillColor(HexColor(INK));c.setFont('BodyBold',21);c.drawString(36,H-110,text)
 return para(c,subtitle,36,H-124,W-72,'small')
def box(c,x,y,w,h):
 c.setStrokeColor(HexColor(LINE));c.setLineWidth(.7);c.roundRect(x,y-h,w,h,6,fill=0,stroke=1)
def label(c,n,x,y):
 c.setFillColor(HexColor(TEAL));c.setFont('BodyBold',10);c.drawString(x,y,str(n).zfill(2))

def build(pack):
 out=ROOT/'output/pdf/substitution'/f"{pack['slug']}.pdf";out.parent.mkdir(parents=True,exist_ok=True)
 qs=pack['questions'];per_work=2 if pack['level']==4 else 4;total=2+math.ceil(len(qs)/per_work)
 c=canvas.Canvas(str(out),pagesize=(W,H),pageCompression=1,invariant=1)
 c.setTitle('Algebraic Substitution | '+pack['title']+' | '+pack['id']);c.setAuthor('Kaizen Maths');c.setSubject('Questions, answer sheet and worked solutions. Suggested time: 10 minutes.')
 header(c,pack,'Questions',1,total);title(c,pack['title'],pack['description'])
 c.setFillColor(HexColor(MUTED));c.setFont('Body',9);c.drawString(36,H-172,'Name: ______________________________');c.drawRightString(W-36,H-172,'Suggested time: 10 minutes')
 instruction='Show your working. Substitute carefully and simplify.' if pack['level']>=3 else 'Show your working. Use brackets when substituting negative values.'
 para(c,instruction,36,H-188,W-72,'body')
 cols=2;rows=math.ceil(len(qs)/cols);gap=14;cw=(W-72-gap)/2;top=H-221;cardh=(top-57-(rows-1)*gap)/rows
 for i,q in enumerate(qs):
  x=36+(i%2)*(cw+gap);y=top-(i//2)*(cardh+gap);box(c,x,y,cw,cardh);label(c,i+1,x+12,y-21)
  yy=para(c,'Given '+q['given'],x+38,y-10,cw-50,'body')-9
  if q.get('task'):yy=para(c,q['task'],x+12,yy,cw-24,'small')-5
  yy=para(c,('Simplify: ' if q.get('task') else 'Evaluate: ')+q['expression'],x+12,yy,cw-24,'math')
  bottom=y-cardh
  c.setStrokeColor(HexColor('#E9EDF3'));c.setLineWidth(.5)
  for liney in [bottom+22,bottom+43]:
   if liney<yy-12:c.line(x+12,liney,x+cw-12,liney)
 c.showPage()
 header(c,pack,'Answer sheet',2,total);title(c,'Answer sheet',f"{pack['title']}  |  {len(qs)} questions")
 para(c,'Keep this section separate from the question sheet. Full working follows on the next pages.',36,H-170,W-72,'body')
 for i,q in enumerate(qs):
  x=36+(i%2)*(cw+gap);y=H-219-(i//2)*91
  box(c,x,y,cw,75);label(c,i+1,x+12,y-24);para(c,q['answer'],x+42,y-12,cw-54,'answer')
 c.showPage()
 for batch,start in enumerate(range(0,len(qs),per_work)):
  header(c,pack,'Worked solutions',batch+3,total);title(c,'Worked solutions',pack['title'])
  subset=qs[start:start+per_work];cols=1 if per_work==2 else 2;rows=2;cw2=(W-72-(cols-1)*gap)/cols;top=H-179;ch=(top-57-gap)/2
  for local,q in enumerate(subset):
   x=36+(local%cols)*(cw2+gap);y=top-(local//cols)*(ch+gap);box(c,x,y,cw2,ch);label(c,q['number'],x+12,y-21)
   yy=para(c,'Given '+q['given'],x+38,y-9,cw2-50,'body')-6
   yy=para(c,q['expression'],x+12,yy,cw2-24,'math')-9
   # Keep the generator's actual order and calculations, omitting only redundant prose.
   for step in q['steps']:
    if step.startswith('No numerical value'):continue
    kind='math' if step.startswith('$$') else 'step'
    yy=para(c,step,x+12,yy,cw2-24,kind)-4
   assert yy>=y-ch+8,(pack['id'],q['number'],'solution card overflow',yy,y-ch)
  c.showPage()
 c.save();reader=PdfReader(out);assert len(reader.pages)==total
 for page in reader.pages:
  text=page.extract_text();assert '\\cdot' not in text and '$$' not in text
 public=ROOT/'assets/practice-packs/substitution'/out.name;shutil.copyfile(out,public)
 return {k:pack[k] for k in ['id','slug','title','topic','level','kind','estimatedMinutes','description','version','types']}|{'questionCount':len(qs),'pageCount':total,'pdf':str(public.relative_to(ROOT)),'preview':f"assets/practice-packs/substitution/previews/{pack['slug']}.png",'sections':['Questions','Answer sheet','Worked solutions']}
if __name__=='__main__':
 data=json.loads((ROOT/'data/practice-packs/substitution.json').read_text());catalog={'version':1,'collection':'Algebraic Substitution','packs':[build(p) for p in data['packs']]}
 (ROOT/'assets/practice-packs/catalog.json').write_text(json.dumps(catalog,indent=2)+'\n');print(f"Built {len(catalog['packs'])} branded PDFs ({sum(p['pageCount'] for p in catalog['packs'])} pages).")
