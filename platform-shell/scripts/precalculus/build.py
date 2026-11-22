"""Print the U.S. precalculus collection on measured US Letter topic sheets."""
from pathlib import Path
import importlib.util,json,re,hashlib,sys
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('ap_print',ROOT/'scripts/ap-calculus/build.py');ap=importlib.util.module_from_spec(spec);spec.loader.exec_module(ap)
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from pypdf import PdfReader,PdfWriter
b=ap.b;W,H=612,792;L=43;WIDTH=W-2*L;ap.W=W;ap.H=H;ap.L=L;ap.WIDTH=WIDTH
old_markup=b.markup
b.markup=lambda source,width,size:(lambda result:(b.glyphs(result[0],result[1]),result[1]))(old_markup(source,width,size))
old_label=ap.label
ap.label=lambda c,text,*args,**kwargs:old_label(c,re.sub(r'\b1 points\b','1 point',text.replace(' marks',' points').replace('Suggested award','Suggested credit')),*args,**kwargs)
old_short=b.short_text
b.short_text=lambda c,text,*args,**kwargs:old_short(c,text.replace('suggested marks','suggested points'),*args,**kwargs)
DATA=ROOT/'data/precalculus';OUT=ROOT/'assets/precalculus';OUT.mkdir(parents=True,exist_ok=True)
def header(c,p,kind,page):
 student=not kind.startswith('Answers');c.setTitle('Kaizen U.S. Precalculus - '+p['id']+' '+p['title']+' - '+('Home Learning Pack' if student else 'Teacher Solutions'));c.setAuthor('Kaizen Mathematics')
 c.setFillColor(HexColor(ap.TEAL));c.rect(0,H-8,W,8,fill=1,stroke=0);ap.label(c,'KAIZEN MATHEMATICS',L,H-32,9.5,'SansBold',ap.TEAL);c.drawRightString(W-L,H-32,'U.S. PRECALCULUS')
 y=b.short_text(c,p['id']+'  '+p['title'],L,H-50,WIDTH,20,True,ap.INK)
 y=b.short_text(c,'Home Learning Pack | Eight questions' if student else 'Teacher Solutions | Worked answers & suggested points',L,y-8,WIDTH,11,True,ap.TEAL)
 c.setStrokeColor(HexColor(ap.LINE));c.line(L,y-11,W-L,y-11)
 ap.label(c,'© Kaizen Mathematics. Permission granted to print and copy for classroom teaching and personal study.',L,36,7.8,color=ap.MUTED)
 ap.label(c,'Original topic practice | U.S. Letter | Not an official AP paper or scoring guide',L,24,7.8,color=ap.MUTED);c.drawRightString(W-L,13,str(page));return y-26
ap.header=header

def student(p,path):
 c=canvas.Canvas(str(path),pagesize=(W,H),invariant=1);y=header(c,p,'Home Learning',1);ap.label(c,'Name: ___________________________    Date: ______________',L,y-2,9.5,color=ap.MUTED)
 y=b.short_text(c,p['instructions'],L,y-16,WIDTH,9.5,color=ap.MUTED)-15
 if p.get('printStimulus'):y=b.draw_flows(c,b.flows(p['printStimulus'],WIDTH,10,diagram_max=85),L,y,WIDTH)-12
 gap=24;cw=(WIDTH-gap)/2;rows=[]
 for i in range(0,8,2):
  row=[]
  for q in p['questions'][i:i+2]:
   items=b.flows(q['print']['question'],cw,11,diagram_max=65);row.append((q,items,b.height(items)+29))
  rows.append(row)
 heights=[max(68,max(v[2] for v in row)) for row in rows];available=y-52
 if sum(heights)>available:raise ValueError(f'{p["id"]}: {sum(heights):.1f}pt > {available:.1f}pt; shorten content, do not shrink fonts.')
 extra=(available-sum(heights))/4
 for row,h in zip(rows,heights):
  h+=extra
  for col,(q,items,_) in enumerate(row):
   x=L+col*(cw+gap);ap.label(c,f'{q["number"]:02}',x,y,11,'SansBold',ap.TEAL);c.setFont('Sans',8.5);c.drawRightString(x+cw,y,str(q['marks'])+(' point' if q['marks']==1 else ' points'))
   bottom=b.draw_flows(c,items,x,y-16,cw);assert bottom>=y-h+9,(p['id'],q['number'],'overlap');c.setStrokeColor(HexColor(ap.LINE));c.line(x,y-h+7,x+cw,y-h+7)
  y-=h
 c.showPage();c.save()

if __name__=='__main__':
 source=json.loads((ROOT/'tmp/pdfs/precalculus-prepared.json').read_text());assert not source['renderErrors'];manifest=[];errors=[]
 for p in source['packs']:
  qp=OUT/(p['id'].lower()+'-questions.pdf');tp=OUT/(p['id'].lower()+'-solutions.pdf')
  try:
   student(p,qp);pages=ap.draw_answers(p,tp);ap.validate(qp);ap.validate(tp)
  except Exception as e:errors.append({'id':p['id'],'error':str(e)});continue
  manifest.append({**{k:p[k] for k in ['id','area','title','tools']},'student':str(qp.relative_to(ROOT)),'teacher':str(tp.relative_to(ROOT)),'studentPages':1,'teacherPages':pages,'questions':8,'points':sum(q['marks'] for q in p['questions']),'studentHash':hashlib.sha256(qp.read_bytes()).hexdigest(),'teacherHash':hashlib.sha256(tp.read_bytes()).hexdigest()})
 (ROOT/'tmp/pdfs/precalculus-layout-errors.json').write_text(json.dumps(errors,indent=2)+'\n');print(json.dumps({'built':len(manifest),'errors':errors},indent=2))
 if errors:raise SystemExit(1)
 # Complete collections are convenient optional downloads with topic bookmarks.
 bundles={};final=ROOT/'output/pdf';final.mkdir(parents=True,exist_ok=True)
 for role,name in [('student','home-learning'),('teacher','teacher-solutions')]:
  writer=PdfWriter();offset=0
  for p in manifest:
   reader=PdfReader(ROOT/p[role]);writer.append_pages_from_reader(reader);writer.add_outline_item(p['id']+' '+p['title'],offset);offset+=len(reader.pages)
  writer.add_metadata({'/Title':'Kaizen U.S. Precalculus - '+name.replace('-',' ').title()+' Collection','/Author':'Kaizen Mathematics'});file=final/f'kaizen-us-precalculus-{name}-collection.pdf';writer.write(file);bundles[role]={'path':str(file.relative_to(ROOT)),'pages':offset}
 catalog={'qualification':'U.S. Precalculus','paper':'US Letter','revision':'2026-11-22','sections':list(dict.fromkeys(p['area'] for p in manifest)),'sources':source['sources'],'packs':manifest,'collections':bundles}
 (DATA/'catalog.json').write_text(json.dumps(catalog,indent=2)+'\n');(ROOT/'assets/site/precalculus-data.js').write_text('window.KaizenPrecalculusData='+json.dumps(catalog,separators=(',',':'))+';\n')
