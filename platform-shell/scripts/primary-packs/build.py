"""Build measured, readable ten-question student / teacher / complete PDFs."""
from pathlib import Path
import importlib.util,json,re,hashlib,zipfile,sys
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('print_blocks',ROOT/'scripts/pack-library/build.py');b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b)
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from pypdf import PdfReader,PdfWriter
W,H=b.W,b.H;L=40;WIDTH=W-2*L
OUT=ROOT/'assets/primary-packs';OUT.mkdir(parents=True,exist_ok=True)
REVIEW=ROOT/'output/pdf/primary-packs';REVIEW.mkdir(parents=True,exist_ok=True)
DATA=ROOT/'data/primary-packs'
TEAL='#147d77';INK='#233b4b';MUTED='#586e7b';LINE='#cadcda'

def label(c,text,x,y,size=10,bold=False,color=INK):
 c.setFillColor(HexColor(color));c.setFont('SansBold' if bold else 'Sans',size);c.drawString(x,y,text)
def header(c,p,kind,page):
 c.setTitle(f"Kaizen Primary Topic Practice - Grade {p['grade']} - {p['title']} - {kind}");c.setAuthor('Kaizen Mathematics')
 c.setFillColor(HexColor(TEAL));c.rect(0,H-8,W,8,fill=1,stroke=0)
 c.setFillColor(HexColor('#f0b748'));path=c.beginPath();path.moveTo(W-80,H-8);path.lineTo(W,H-8);path.lineTo(W,H-70);path.close();c.drawPath(path,fill=1,stroke=0)
 label(c,'KAIZEN MATHEMATICS',L,H-33,10,True,TEAL);label(c,f"GRADE {p['grade']}  |  {p['strand'].upper()}",L,H-51,9,False,MUTED)
 y=b.short_text(c,p['title'],L,H-65,WIDTH,23,True,INK)
 y=b.short_text(c,('Ten-question topic practice | '+str(sum(q['marks'] for q in p['questions']))+' suggested marks') if kind=='Student questions' else kind,L,y-7,WIDTH,12,True,TEAL)
 c.setStrokeColor(HexColor(LINE));c.line(L,y-9,W-L,y-9)
 label(c,'© Kaizen Mathematics. Permission granted to print and copy for educational use.',L,30,8,color=MUTED)
 label(c,'Original classroom practice. Suggested marks are not an official assessment mark scheme.',L,18,7.8,color=MUTED)
 c.drawRightString(W-L,18,str(page));return y-23

def flows(blocks,width,size=12.5,max_diagram=110):return b.flows(blocks,width,size,diagram_max=max_diagram)
def student_layout(q):
 blocks=q['print']['question'];visuals=[x for x in blocks if x['kind'] in ['image','table']];prose=[x for x in blocks if x['kind']=='paragraph']
 if visuals:
  gap=16;vw=155;tw=WIDTH-vw-gap
  left=flows(prose,tw,12.5);right=flows(visuals,vw,10,105)
  return left,right,max(b.height(left),b.height(right))+25,tw,vw
 left=flows(blocks,WIDTH,12.5)
 return left,[],b.height(left)+25,WIDTH,0

def students(p,path):
 c=canvas.Canvas(str(path),pagesize=(W,H),invariant=1)
 for page in [1,2]:
  top=header(c,p,'Student questions',page)
  if page==1:
   label(c,'Name: __________________________    Date: ______________',L,top,10,color=MUTED);top-=22
   top=b.short_text(c,'Answer all ten questions. Show working and explain your decisions. Use separate paper if needed.',L,top,WIDTH,10.5,color=MUTED)-15
  else:top=b.short_text(c,'Questions 6–10. Continue to show your working and reasoning.',L,top,WIDTH,10.5,color=MUTED)-15
  questions=p['questions'][(page-1)*5:page*5];layouts=[student_layout(q) for q in questions]
  required=[max(70,x[2]) for x in layouts];available=top-53
  if sum(required)>available:raise ValueError(f"{p['id']} page {page}: {sum(required):.1f}pt required, {available:.1f} available")
  extra=(available-sum(required))/5;y=top
  for q,(left,right,h,tw,vw),need in zip(questions,layouts,required):
   row=need+extra;label(c,f"{q['number']:02}",L,y,12,True,TEAL)
   c.setFont('Sans',9);c.setFillColor(HexColor(MUTED));c.drawRightString(W-L,y,f"{q['marks']} "+('mark' if q['marks']==1 else 'marks'))
   bottom=b.draw_flows(c,left,L,y-18,tw)
   if right:bottom=min(bottom,b.draw_flows(c,right,W-L-vw,y-18,vw))
   if bottom<y-row+7:raise ValueError(f"{p['id']} question {q['number']}: overlap")
   c.setStrokeColor(HexColor(LINE));c.setLineWidth(.45);c.line(L,y-row+6,W-L,y-row+6);y-=row
  c.showPage()
 c.save()

def quick_answers(c,p):
 y=header(c,p,'Answer sheet',1)
 y=b.short_text(c,'Accept equivalent correct responses. Worked methods and suggested marking guidance follow.',L,y,WIDTH,10.5,color=MUTED)-20
 for q in p['questions']:
  items=flows(q['print']['answer'],WIDTH-30,12)
  h=max(35,b.height(items)+13)
  if y-h<55:raise ValueError(p['id']+': answer sheet overflow')
  label(c,str(q['number']).zfill(2),L,y,11,True,TEAL);b.draw_flows(c,items,L+30,y,WIDTH-30);y-=h
 c.showPage()

def teachers(p,path):
 c=canvas.Canvas(str(path),pagesize=(W,H),invariant=1);quick_answers(c,p);page=2;y=header(c,p,'Worked solutions & suggested marks',page)
 y=b.short_text(c,'Award credit for valid alternative methods and sensible diagrams. For drawing tasks, check the stated properties. Allow follow-through when a later method is correct.',L,y,WIDTH,10.5,color=MUTED)-18
 for q in p['questions']:
  items=flows(q['print']['answer']+[{'kind':'paragraph','html':'<b>Method and reasoning</b>'}]+q['print']['steps'],WIDTH,12)
  need=b.height(items)+42
  if need>H-195:raise ValueError(p['id']+': solution too large')
  if y-need<55:
   c.showPage();page+=1;y=header(c,p,'Worked solutions & suggested marks',page)
  label(c,f"Question {q['number']}  |  {q['marks']} "+('mark' if q['marks']==1 else 'marks'),L,y,12,True,TEAL)
  y=b.draw_flows(c,items,L,y-20,WIDTH)-14;c.setStrokeColor(HexColor(LINE));c.line(L,y,W-L,y);y-=18
 c.showPage();c.save();return page

def validate(path):
 r=PdfReader(path)
 for page in r.pages:
  text=page.extract_text()
  if re.search(r'\\[A-Za-z]+|\^|\[\[|\ufffd|\u25a0|\b(?:undefined|NaN|Infinity)\b|J\$',text):raise ValueError('Notation failure in '+str(path))
  assert len(text)>80,path
 return len(r.pages)

if __name__=='__main__':
 src=json.loads((ROOT/'tmp/pdfs/primary-prepared.json').read_text());assert not src['renderErrors'];catalog=[];failures=[]
 for p in src['packs']:
  stem=p['id'].lower();student=OUT/(stem+'-student.pdf');teacher=OUT/(stem+'-teacher.pdf');complete=OUT/(stem+'-complete.pdf')
  try:
   students(p,student);tp=teachers(p,teacher)
   writer=PdfWriter()
   for f in [student,teacher]:writer.append(f)
   writer.add_metadata({'/Title':f"Kaizen Primary Topic Practice - Grade {p['grade']} - {p['title']}",'/Author':'Kaizen Mathematics'});writer.write(complete)
   for f in [student,teacher,complete]:validate(f)
   catalog.append({k:p[k] for k in ['id','grade','topicId','title','strand','focus','sourcePages']}|{'questions':10,'marks':sum(q['marks'] for q in p['questions']),'student':str(student.relative_to(ROOT)),'teacher':str(teacher.relative_to(ROOT)),'complete':str(complete.relative_to(ROOT)),'studentPages':2,'teacherPages':tp,'pageCount':2+tp,'hash':hashlib.sha256(complete.read_bytes()).hexdigest()})
  except Exception as e:failures.append({'id':p['id'],'error':str(e)})
 (ROOT/'tmp/pdfs/primary-layout-errors.json').write_text(json.dumps(failures,indent=2)+'\n')
 print(json.dumps({'built':len(catalog),'errors':failures},indent=2))
 if failures:sys.exit(1)
 for grade in [4,5,6]:
  with zipfile.ZipFile(OUT/f'grade-{grade}-topic-packs.zip','w',zipfile.ZIP_DEFLATED) as bundle:
   for p in catalog:
    if p['grade']==grade:bundle.write(ROOT/p['complete'],Path(p['complete']).name)
 with zipfile.ZipFile(OUT/'all-primary-topic-packs.zip','w',zipfile.ZIP_DEFLATED) as bundle:
  for p in catalog:bundle.write(ROOT/p['complete'],f"grade-{p['grade']}/"+Path(p['complete']).name)
 data={'version':1,'title':'Primary Topic Practice','coverageNote':src['coverageNote'],'sources':src['sources'],'packs':catalog,'downloads':{str(g):f'assets/primary-packs/grade-{g}-topic-packs.zip' for g in [4,5,6]},'allDownload':'assets/primary-packs/all-primary-topic-packs.zip'}
 (DATA/'catalog.json').write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n')
 (ROOT/'assets/site/primary-packs-data.js').write_text('window.KaizenPrimaryPacksData='+json.dumps(data,separators=(',',':'),ensure_ascii=False)+';\n')
 print(f"Published {len(catalog)} complete packs plus student/teacher PDFs and four download bundles.")
