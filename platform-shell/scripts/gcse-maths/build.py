"""Render the board-neutral GCSE library with measured one-page student layouts."""
from pathlib import Path
import importlib.util,json,hashlib,re,sys
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('ap_print',ROOT/'scripts/ap-calculus/build.py');ap=importlib.util.module_from_spec(spec);spec.loader.exec_module(ap)
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from pypdf import PdfReader
W,H=ap.W,ap.H;L=ap.L;WIDTH=ap.WIDTH;b=ap.b
# Recheck glyph coverage after the AP wrapper switches prose from Sans to Georgia.
_pilot_base_markup=b.markup
def pilot_markup(source,width,size):
 content,font=_pilot_base_markup(source,width,size)
 return b.glyphs(content,font),font
b.markup=pilot_markup
OUT=ROOT/'assets/gcse-maths';OUT.mkdir(parents=True,exist_ok=True)
DATA=ROOT/'data/gcse-maths'
def header(c,p,kind,page):
 student=not kind.startswith('Answers')
 c.setTitle(f"Kaizen GCSE One-Pagers - GCSE {p['id']} - {p['title']} - {'Student Pack' if student else 'Teacher Pack'}")
 c.setAuthor('Kaizen Mathematics');c.setFillColor(HexColor(ap.TEAL));c.rect(0,H-8,W,8,fill=1,stroke=0)
 ap.label(c,'KAIZEN MATHEMATICS',L,H-34,9.5,'SansBold',ap.TEAL);c.drawRightString(W-L,H-34,'GCSE | '+('Foundation & Higher' if p['tier']=='Foundation' else 'Higher'))
 y=b.short_text(c,p['id']+'  '+p['title'],L,H-52,WIDTH,22,True,ap.INK)
 y=b.short_text(c,'Kaizen GCSE One-Pagers | Eight questions' if student else 'Worked solutions & suggested marks',L,y-9,WIDTH,12,True,ap.TEAL)
 c.setStrokeColor(HexColor(ap.LINE));c.line(L,y-12,W-L,y-12)
 if student:
  ap.label(c,'© Kaizen Mathematics. Permission granted to print and copy for classroom teaching and personal study.',L,38,7.8,color=ap.MUTED)
  ap.label(c,'Create additional practice using the Kaizen Worksheet Builder.',L,26,7.8,color=ap.MUTED)
  ap.label(c,'GCSE (9–1), England | Board-neutral topic practice | Not an official exam paper',L,14,7.2,color=ap.MUTED)
  c.drawRightString(W-L,14,str(page))
 else:
  ap.label(c,'M1: method | A1: accuracy | B1: independent credit',L,36,7.8,color=ap.MUTED)
  ap.label(c,'Original Kaizen solutions | Suggested marks, not an official exam-board mark scheme',L,24,7.8,color=ap.MUTED)
  c.drawRightString(W-L,24,str(page))
 return y-28
ap.header=header
_original_label=ap.label
def gcse_label(c,text,*args,**kwargs):
 return _original_label(c,re.sub(r'\b1 marks\b','1 mark',text),*args,**kwargs)
ap.label=gcse_label


def student(p,path):
 assert len(p['questions'])==8
 c=canvas.Canvas(str(path),pagesize=(W,H),invariant=1);y=header(c,p,'Student',1)
 ap.label(c,'Name: ___________________________    Date: ______________',L,y-2,9.5,color=ap.MUTED)
 y=b.short_text(c,p['instructions'],L,y-16,WIDTH,9.5,color=ap.MUTED)-16
 if p.get('printStimulus'):
  items=b.flows(p['printStimulus'],WIDTH,10,diagram_max=105)
  y=b.draw_flows(c,items,L,y,WIDTH)-16
 gap=24;cw=(WIDTH-gap)/2;rows=[]
 for i in range(0,8,2):
  row=[]
  for q in p['questions'][i:i+2]:
   items=b.flows(q['print']['question'],cw,11,diagram_max=85 if p['id'].startswith('G') else 65)
   row.append((q,items,b.height(items)+27))
  rows.append(row)
 hs=[max(72,max(v[2] for v in row)) for row in rows];available=y-52
 if sum(hs)>available:raise ValueError(f'{p["id"]}: {sum(hs):.1f}pt exceeds {available:.1f}pt; shorten prompts rather than reducing font')
 extra=(available-sum(hs))/4
 for row,h in zip(rows,hs):
  h+=extra
  for col,(q,items,_) in enumerate(row):
   x=L+col*(cw+gap);ap.label(c,f'{q["number"]:02}',x,y,11,'SansBold',ap.TEAL);c.setFont('Sans',8.5);c.drawRightString(x+cw,y,str(q['marks'])+(' mark' if q['marks']==1 else ' marks'))
   bottom=b.draw_flows(c,items,x,y-15,cw)
   assert bottom>=y-h+9,(p['id'],q['number'],'overlap')
   c.setStrokeColor(HexColor(ap.LINE));c.setLineWidth(.45);c.line(x,y-h+7,x+cw,y-h+7)
  y-=h
 c.showPage();c.save();return 1

if __name__=='__main__':
 src=json.loads((ROOT/'tmp/pdfs/gcse-library-prepared.json').read_text());assert not src['renderErrors'];assert len(src['packs'])==106
 manifest=[];failures=[]
 for p in src['packs']:
  stem=p['id'].lower().replace('.','-');qp=OUT/(stem+'-student.pdf');tp=OUT/(stem+'-teacher.pdf')
  try:
   student(p,qp);pages=ap.draw_answers(p,tp)
   for f in [qp,tp]:ap.validate(f)
  except Exception as e:
   failures.append({'id':p['id'],'error':str(e)});continue
  manifest.append({'id':p['id'],'reference':p['reference'],'area':p['area'],'tier':p['tier'],'title':p['title'],'tools':p['tools'],'student':str(qp.relative_to(ROOT)),'teacher':str(tp.relative_to(ROOT)),'studentPages':1,'teacherPages':pages,'questions':8,'marks':sum(q['marks'] for q in p['questions']),'studentHash':hashlib.sha256(qp.read_bytes()).hexdigest(),'teacherHash':hashlib.sha256(tp.read_bytes()).hexdigest()})
 (DATA/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
 (ROOT/'tmp/pdfs/gcse-layout-errors.json').write_text(json.dumps(failures,indent=2)+'\n')
 print(json.dumps({'built':len(manifest),'failures':failures},indent=2))
 if failures:sys.exit(1)
 catalogue={'qualification':'Board-neutral GCSE (9–1), England','revision':'2026-11-18','packs':manifest,'contentSource':'https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives'}
 if (DATA/'revision-catalog.json').exists():catalogue['reviews']=json.loads((DATA/'revision-catalog.json').read_text())
 (DATA/'catalog.json').write_text(json.dumps(catalogue,indent=2)+'\n')
 (ROOT/'assets/site/gcse-maths-data.js').write_text('window.KaizenGCSEData='+json.dumps(catalogue,separators=(',',':'))+';\n')
