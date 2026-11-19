"""Build separate, measured AP question / teacher PDFs and a static route catalogue."""
from pathlib import Path
import sys,json,re,importlib.util,hashlib
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'scripts/pack-library'))
spec=importlib.util.spec_from_file_location('pack_print',ROOT/'scripts/pack-library/build.py');b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b)
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from pypdf import PdfReader,PdfWriter
# AP-only prose face: Georgia gives the questions a textbook feel; equations keep STIX/MathJax.
for name,file in [('APText','Georgia.ttf'),('APTextBold','Georgia Bold.ttf'),('APTextItalic','Georgia Italic.ttf'),('APTextBoldItalic','Georgia Bold Italic.ttf')]:
 pdfmetrics.registerFont(TTFont(name,'/System/Library/Fonts/Supplemental/'+file))
pdfmetrics.registerFontFamily('APText',normal='APText',bold='APTextBold',italic='APTextItalic',boldItalic='APTextBoldItalic')
_original_markup=b.markup
def ap_markup(source,width,size):
 content,font=_original_markup(source,width,size)
 font='APText' if font=='Sans' else font
 return b.glyphs(content,font),font
b.markup=ap_markup
W,H=b.W,b.H;L=43;WIDTH=W-86;OUT=ROOT/'assets/ap-calculus';OUT.mkdir(exist_ok=True);(OUT/'previews').mkdir(exist_ok=True)
DATA=ROOT/'data/ap-calculus';DATA.mkdir(exist_ok=True)
TEAL='#146d65';INK='#203b43';MUTED='#596b72';LINE='#d3e1db'

def label(c,s,x,y,size=10,font='Sans',color=INK):
 c.setFillColor(HexColor(color));c.setFont(font,size);c.drawString(x,y,s)
def header(c,pack,kind,page):
 c.setTitle(f"AP Calculus {pack['id']} - {pack['title']} - {kind}");c.setAuthor('Kaizen Maths');c.setFillColor(HexColor(TEAL));c.rect(0,H-8,W,8,fill=1,stroke=0)
 label(c,'KAIZEN MATHS',L,H-34,10,'SansBold',TEAL);c.drawRightString(W-L,H-34,'AP CALCULUS | '+pack['scope'])
 y=b.short_text(c,pack['id']+'  '+pack['title'],L,H-52,WIDTH,22,True,INK)
 y=b.short_text(c,kind,L,y-9,WIDTH,12,True,TEAL)
 c.setStrokeColor(HexColor(LINE));c.line(L,y-12,W-L,y-12)
 if kind.startswith('Kaizen Calculus One-Pagers'):
  label(c,'© Kaizen Mathematics. Permission granted to print and copy for classroom teaching and personal study.',L,38,7.8,color=MUTED)
  label(c,'Create additional practice using the Kaizen Worksheet Builder.',L,26,7.8,color=MUTED)
  label(c,'Original topic practice | Not an official College Board paper',L,14,7.2,color=MUTED)
  c.drawRightString(W-L,14,str(page))
 else:
  label(c,'Original topic practice | Not an official College Board paper',L,24,8,color=MUTED);c.drawRightString(W-L,24,str(page))
 return y-28

def draw_questions(pack,path):
 # A measured two-column sheet: readable type, variable row heights, no shrink-to-fit.
 assert len(pack['questions'])==8
 c=canvas.Canvas(str(path),pagesize=(W,H),invariant=1)
 y=header(c,pack,'Kaizen Calculus One-Pagers | Eight questions',1)
 label(c,'Name: ___________________________    Date: ______________',L,y-2,9.5,color=MUTED)
 y=b.short_text(c,'Answer on separate paper. Show your working and reasoning; include units where appropriate.',L,y-16,WIDTH,9.5,color=MUTED)-16
 gap=24;cw=(WIDTH-gap)/2;rows=[]
 for i in range(0,8,2):
  row=[]
  for q in pack['questions'][i:i+2]:
   items=b.flows(q['print']['question'],cw,11,diagram_max=85)
   row.append((q,items,b.height(items)+27))
  rows.append(row)
 heights=[max(110,max(v[2] for v in row)) for row in rows]
 available=y-52
 if sum(heights)>available:raise ValueError(f"One-page overflow {pack['id']}: {sum(heights):.1f} > {available:.1f}; edit the prompts, not the font")
 extra=(available-sum(heights))/4
 for row,h in zip(rows,heights):
  h+=extra
  for col,(q,items,_) in enumerate(row):
   x=L+col*(cw+gap);label(c,str(q['number']).zfill(2),x,y,11,'SansBold',TEAL)
   c.setFont('Sans',8.5);c.drawRightString(x+cw,y,str(q['marks'])+' marks')
   bottom=b.draw_flows(c,items,x,y-15,cw)
   if bottom<y-h+9:raise ValueError('Question overlaps next row '+pack['id'])
   c.setStrokeColor(HexColor(LINE));c.setLineWidth(.45);c.line(x,y-h+7,x+cw,y-h+7)
  y-=h
 c.showPage();c.save();return 1

def teacher_chunks(q):
 parts=[('Answer',q['print']['answer'])]
 # A step is not silently dropped when it is long; continuation pages repeat the question number.
 for block in q['print']['steps']:parts.append(('',[block]))
 parts.append(('Suggested award',[{'kind':'paragraph','html':s} for s in q['criteria']]))
 return parts

def draw_answers(pack,path):
 c=canvas.Canvas(str(path),pagesize=(W,H),invariant=1);page=1;y=header(c,pack,'Answers, worked solutions & suggested marks',page)
 y=b.short_text(c,f"{sum(q['marks'] for q in pack['questions'])} suggested marks. Accept equivalent methods; allow valid follow-through after arithmetic errors.",L,y,WIDTH,10,color=MUTED)-16
 def new_page():
  nonlocal page,y
  c.showPage();page+=1;y=header(c,pack,'Answers, worked solutions & suggested marks',page)
 for q in pack['questions']:
  lead=b.height(b.flows(q['print']['answer'],WIDTH,12,diagram_max=165))+19+14+65+3*len(q['print']['answer'])
  if y<max(240,lead):new_page()
  label(c,'Question '+str(q['number'])+'  |  '+str(q['marks'])+' marks',L,y,12,'SansBold',TEAL);y-=19
  for name,blocks in teacher_chunks(q):
   items=b.flows(blocks,WIDTH,12,diagram_max=165)
   if name:
    if y<100:new_page();label(c,'Question '+str(q['number'])+' continued',L,y,11,'SansBold',TEAL);y-=18
    label(c,name,L,y,9.5,'SansBold',MUTED);y-=14
   for item,h in items:
    if h>H-200:raise ValueError('Teacher block cannot fit '+pack['id'])
    if y-h<55:new_page();label(c,'Question '+str(q['number'])+' continued',L,y,11,'SansBold',TEAL);y-=18
    y=b.draw_flows(c,[(item,h)],L,y,WIDTH)-3
  y-=14;c.setStrokeColor(HexColor(LINE));c.line(L,y,W-L,y);y-=22
 c.showPage();c.save();return page

def subset(src,target,start,end):
 reader=PdfReader(src);w=PdfWriter()
 for page in reader.pages[start:end]:w.add_page(page)
 w.add_metadata({'/Title':'Kaizen AP Calculus - '+target.stem,'/Author':'Kaizen Maths'});w.write(target);return len(w.pages)

def validate(path):
 r=PdfReader(path)
 for page in r.pages:
  text=page.extract_text()
  if re.search(r'\\[A-Za-z]+|\$|\^|\[\[|\ufffd|=\s*undefined|\bNaN\b',text):raise ValueError('Unrendered notation: '+str(path))
 return len(r.pages)

if __name__=='__main__':
 source=json.loads((ROOT/'tmp/pdfs/ap-library-prepared.json').read_text());assert not source['renderErrors'];assert len(source['packs'])==111;published={};totalpages=0
 for old in OUT.glob('*-supported.pdf'):old.unlink()
 for pack in source['packs']:
  stem='ap-'+pack['id'].replace('.','-');qp=OUT/(stem+'-questions.pdf');ap=OUT/(stem+'-answers.pdf')
  qpages=draw_questions(pack,qp);apages=draw_answers(pack,ap);validate(qp);validate(ap);totalpages+=qpages+apages
  published[pack['id']]={'questions':qp.relative_to(ROOT).as_posix(),'answers':ap.relative_to(ROOT).as_posix(),'questionPages':qpages,'answerPages':apages,'marks':sum(q['marks'] for q in pack['questions']),'questionCount':8,'calculator':'Calculator optional','revision':'2026-11-18.5','preview':f'assets/ap-calculus/previews/{stem}.png'}
 mapping=json.loads((ROOT/'output/ap-calculus-pilot/topic-map.json').read_text());toolkeys=mapping['toolDirectory'];units=[]
 for unit in mapping['units']:
  topics=[]
  for t in unit['rows']:
   related=[]
   for key,(_,slug) in toolkeys.items():
    if re.search(r'\b'+key+r'\b',t['basis']):related.append(slug)
   topics.append({'id':t['code'],'title':t['title'],'scope':t['scope'],'objective':'Practise '+t['title'].lower()+' through calculation, interpretation and mathematical reasoning.','tools':related,'developmentNote':'A dedicated eight-question set and its worked marking scheme are being prepared for this topic.','pack':published.get(t['code'])})
  units.append({'number':unit['n'],'title':unit['title'],'topics':topics})
 data={'version':1,'revision':'2026-11-18.5','units':units};(DATA/'catalog.json').write_text(json.dumps(data,indent=2)+'\n');(ROOT/'assets/site/ap-calculus-data.js').write_text('window.KaizenAPCalculusData = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n')
 manifests={id:{**p,'questionHash':hashlib.sha256((ROOT/p['questions']).read_bytes()).hexdigest(),'answerHash':hashlib.sha256((ROOT/p['answers']).read_bytes()).hexdigest()} for id,p in published.items()};(DATA/'pdf-manifest.json').write_text(json.dumps(manifests,indent=2)+'\n');print(f'Built {len(published)} packs, {totalpages} PDF pages, {len(list(OUT.glob("*.pdf")))} PDF files.')
