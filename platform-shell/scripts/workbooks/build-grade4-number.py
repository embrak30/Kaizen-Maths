"""Grade 4 Number pilot: structured books assembled from reviewed Kaizen topic packs."""
from pathlib import Path
import sys,json,io,hashlib,shutil
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'))
import practice_pack_style as style
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from pypdf import PdfReader,PdfWriter
from pypdf.annotations import Link
from pypdf.generic import ContentStream,NameObject
W,H=style.W,style.H;L=43;WIDTH=W-2*L
OUT=ROOT/'assets/workbooks';OUT.mkdir(exist_ok=True)
DELIVERY=ROOT/'output/pdf/workbooks';DELIVERY.mkdir(parents=True,exist_ok=True)
TMP=ROOT/'tmp/pdfs/grade4-number-workbook';TMP.mkdir(parents=True,exist_ok=True)
TEAL='#147d77';INK='#233b4b';MUTED='#586e7b';LINE='#cadcda';PALE='#edf6f3';GOLD='#f0b748'
TOPICS=[
 ('place-value','Place value & rounding','Read, order and round whole numbers.'),
 ('whole-operations','Whole-number problem solving','Choose operations, check answers and interpret remainders.'),
 ('sets','Sets & membership','Describe groups and list each distinct member once.'),
 ('fraction-comparison','Comparing fractions','Use equivalent fractions and compare equal-sized wholes.'),
 ('fraction-operations','Calculating with fractions','Add and subtract fractions with the same denominator.'),
 ('fractions','Fractions of quantities','Find a part, find what remains and work back to a whole.'),
 ('decimals','Decimals & calculation','Use decimal place value to calculate and explain.'),
 ('money','Money & decisions','Find totals and change; compare prices and check a method.')]
CATALOG=json.loads((ROOT/'data/primary-packs/catalog.json').read_text());SOURCE=json.loads((ROOT/'data/primary-packs/source.json').read_text())
packs=[]
for slug,title,goal in TOPICS:
 p=next(p for p in CATALOG['packs'] if p['id']=='P4-'+slug);q=next(p for p in SOURCE['packs'] if p['id']==p['id']);assert p['grade']==4 and p['strand']=='Number' and len(q['questions'])==10
 packs.append({**p,'bookTitle':title,'goal':goal})

def text(c,s,x,y,size=11,bold=False,color=INK):
 c.setFillColor(HexColor(color));c.setFont('SansBold' if bold else 'Sans',size);c.drawString(x,y,s)
def para(c,s,x,y,width=WIDTH,size=12,color=INK,bold=False):
 p=Paragraph(s,ParagraphStyle('book',fontName='SansBold' if bold else 'Sans',fontSize=size,leading=size*1.35,textColor=HexColor(color)))
 _,h=p.wrap(width,1000);assert y-h>53,(s,y,h);p.drawOn(c,x,y-h);return y-h

def footer(c,page,teacher=False):
 c.setFillColor(HexColor('#ffffff'));c.rect(0,0,W,43,fill=1,stroke=0)
 c.setStrokeColor(HexColor(LINE));c.setLineWidth(.5);c.line(L,42,W-L,42)
 text(c,'Kaizen Mathematics | Grade 4 Number | '+('Teacher Edition' if teacher else 'Student Workbook'),L,28,8,color=MUTED)
 text(c,'Permission granted to print and copy for educational use. Pilot edition 1.',L,16,7.5,color=MUTED)
 c.setFont('SansBold',9);c.drawRightString(W-L,22,str(page))
def heading(c,title,kicker,page,teacher):
 c.setFillColor(HexColor(TEAL));c.rect(0,H-8,W,8,fill=1,stroke=0)
 text(c,'KAIZEN MATHEMATICS',L,H-34,10,True,TEAL);text(c,kicker.upper(),L,H-55,9,color=MUTED)
 para(c,title,L,H-73,size=25,bold=True);footer(c,page,teacher);return H-122

def cover(c,teacher):
 c.setFillColor(HexColor(TEAL));c.rect(0,H-12,W,12,fill=1,stroke=0)
 c.setFillColor(HexColor(PALE));c.rect(0,H-450,W,438,fill=1,stroke=0)
 text(c,'KAIZEN MATHEMATICS',L,H-55,12,True,TEAL)
 text(c,'GRADE 4',L,H-105,14,True,MUTED)
 text(c,'Number',L,H-165,49,True)
 text(c,'Teacher Edition' if teacher else 'Practice Workbook',L,H-205,27,True,TEAL)
 text(c,'PILOT EDITION 1',L,H-240,11,True,MUTED)
 para(c,'Eight topics. Eighty questions.<br/>Small sections, clear working and mathematical reasoning.',L,H-272,size=16)
 # Exact equal partitions, with straight edges: a mathematical motif, not decoration inside questions.
 x=L;y=H-415;cell=WIDTH/8
 for i in range(8):
  c.setFillColor(HexColor(TEAL if i<3 else '#ffffff'));c.setStrokeColor(HexColor('#163f42'));c.rect(x+i*cell,y,cell,38,fill=1,stroke=1)
 text(c,'Number skills  /  Fractions  /  Decimals and money',L,y-24,12,True,TEAL)
 y=H-492
 if teacher:
  y=para(c,'Includes the student questions, quick answers, worked solutions and suggested marks.',L,y,size=15)
  y=para(c,'Use this pilot to review the sequence, level of challenge and space for working before wider school use.',L,y-24,size=13)
 else:
  text(c,'Name',L,y,12,True);c.setStrokeColor(HexColor(LINE));c.line(L+58,y-3,W-L,y-3)
  text(c,'Class',L,y-44,12,True);c.line(L+58,y-47,W-L,y-47)
  para(c,'Work through one topic at a time. Show how you know, and ask for help when you need it.',L,y-82,size=15)
 para(c,'Selected Grade 4 Number practice. This is not a complete Grade 4 course or an official assessment paper.',L,112,size=11,color=MUTED)
 footer(c,1,teacher);c.showPage()

def contents(c,teacher,locations):
 y=heading(c,'Your route through Number' if not teacher else 'Contents & page guide','Eight topics | Ten questions per topic',2,teacher)
 if teacher:
  text(c,'Questions',W-171,y+3,10,True,TEAL);text(c,'Solutions',W-101,y+3,10,True,TEAL)
 for i,(p,loc) in enumerate(zip(packs,locations),1):
  text(c,f'{i:02}',L,y-22,13,True,TEAL)
  text(c,p['bookTitle'],L+32,y-22,14,True)
  para(c,p['goal'],L+32,y-31,WIDTH-165,10.5,color=MUTED)
  c.setFont('SansBold',12);c.setFillColor(HexColor(TEAL));c.drawRightString(W-L-(75 if teacher else 0),y-22,str(loc['questions']))
  if teacher:c.drawRightString(W-L,y-22,str(loc['solutions']))
  c.setStrokeColor(HexColor(LINE));c.line(L,y-63,W-L,y-63);y-=66
 if teacher:
  para(c,'Teaching and review notes: page 3. Question numbers restart in each topic; record a topic number as well as a question number.',L,y-15,size=11)
 else:
  y=para(c,'<b>How to use your workbook</b><br/>Read each question carefully. Show your working in the space provided. Continue in your exercise book if you need more room. For a choice question, select one answer.',L,y-10,size=11)
  para(c,'Use the review page at the back to choose what to practise next. Your teacher may ask you to start with a particular topic.',L,y-12,size=11)
 c.showPage()

def teaching_notes(c):
 y=heading(c,'Teaching & review notes','Teacher edition | Pilot guidance',3,True)
 notes=[('Choose a starting point','Use prior work or a short conversation to select a topic. The sequence moves from number skills into fractions, then decimals and money; pupils do not have to complete every topic in one sitting.'),('Keep the reasoning visible','Ask pupils to show working and explain decisions. The later questions often include a reverse problem, a comparison or an incorrect method. Accept valid alternative methods and diagrams.'),('Use the marks as guidance','Suggested marks and worked methods come from the existing topic packs. Use your professional judgement; they are not an official assessment mark scheme. A correct answer alone may not show the reasoning you need to see.'),('Review the paper work','The student questions are on pages 4-19. Solutions begin on page 20. Check the written work before deciding whether a pupil is ready to move on or needs another example.'),('Help us improve the pilot','Record the topic and question number when noting unclear wording, an unexpected difficulty or too little writing space. Review local curriculum expectations before assigning a topic.')]
 for title,body in notes:
  text(c,title,L,y,14,True,TEAL);y=para(c,body,L,y-12,size=12)-25
 text(c,'Pilot feedback',L,y,14,True,TEAL);y-=20
 for prompt in ['Topic / question:','What did pupils find clear or difficult?','What would you change?']:
  text(c,prompt,L,y,11);c.setStrokeColor(HexColor(LINE));c.line(L,y-25,W-L,y-25);y-=60
 c.showPage()

def reflection(c):
 y=heading(c,'What would you like to practise next?','Your review | Student workbook',19,False)
 y=para(c,'Think about the work you have done. Choose a response for each topic you tried. You can talk it through with your teacher.',L,y,size=13)-28
 text(c,'Topic',L,y,11,True);text(c,'On my own',W-245,y,10,True);text(c,'Another go',W-171,y,10,True);text(c,'With help',W-96,y,10,True);y-=20
 for i,p in enumerate(packs,1):
  text(c,f'{i:02}  '+p['bookTitle'],L,y-12,11)
  for x in [W-221,W-147,W-73]:c.setStrokeColor(HexColor(TEAL));c.rect(x,y-16,10,10,fill=0,stroke=1)
  c.setStrokeColor(HexColor(LINE));c.line(L,y-33,W-L,y-33);y-=53
 y-=16
 text(c,'One thing I can explain now:',L,y,13,True,TEAL)
 for j in [30,55]:c.line(L,y-j,W-L,y-j)
 y-=90;text(c,'One question I want to ask:',L,y,13,True,TEAL)
 for j in [30,55]:c.line(L,y-j,W-L,y-j)
 c.showPage()

def overlay(page,number,teacher,topic):
 # Remove the primary-pack footer text operators, rather than hiding text behind white.
 # The source builder places its footer baselines at 30pt and 18pt with absolute x positions.
 stream=ContentStream(page.get_contents(),page.pdf);kept=[];block=None
 for operands,op in stream.operations:
  if op==b'BT':block=[(operands,op)]
  elif block is not None:
   block.append((operands,op))
   if op==b'ET':
    is_footer=any(operator==b'Tm' and float(args[4])>=24 and float(args[5]) in (18,30) for args,operator in block)
    if not is_footer:kept.extend(block)
    block=None
  else:kept.append((operands,op))
 assert block is None
 stream.operations=kept;page[NameObject('/Contents')]=stream
 buf=io.BytesIO();c=canvas.Canvas(buf,pagesize=(W,H),invariant=1);footer(c,number,teacher)
 c.setFillColor(HexColor('#ffffff'));c.rect(W-154,H-55,105,30,fill=1,stroke=0)
 c.setFont('SansBold',9);c.setFillColor(HexColor(TEAL));c.drawRightString(W-L,H-41,f'TOPIC {topic:02}')
 c.save();buf.seek(0);page.merge_page(PdfReader(buf).pages[0]);return page

def build(teacher):
 front=TMP/('teacher-front.pdf' if teacher else 'student-front.pdf');c=canvas.Canvas(str(front),pagesize=(W,H),invariant=1)
 question_start=4 if teacher else 3;answer_start=20;locations=[]
 for i,p in enumerate(packs):
  locations.append({'id':p['id'],'title':p['bookTitle'],'questions':question_start+2*i,'solutions':answer_start if teacher else None})
  answer_start+=p['teacherPages']
 cover(c,teacher);contents(c,teacher,locations)
 if teacher:teaching_notes(c)
 c.save();writer=PdfWriter();writer.append_pages_from_reader(PdfReader(front));sources=[]
 writer.add_outline_item('Cover',0);writer.add_outline_item('Contents',1)
 if teacher:writer.add_outline_item('Teaching & review notes',2)
 for role in (['student','teacher'] if teacher else ['student']):
  parent=writer.add_outline_item('Topic Practice' if role=='student' else 'Answers & worked solutions',len(writer.pages))
  for i,p in enumerate(packs,1):
   file=ROOT/p[role];r=PdfReader(file);start=len(writer.pages)+1
   assert start==locations[i-1]['questions' if role=='student' else 'solutions']
   writer.add_outline_item(f'{i:02} '+p['bookTitle'],start-1,parent=parent)
   for page in r.pages:writer.add_page(overlay(page,len(writer.pages)+1,teacher,i))
   sources.append({'id':p['id'],'role':role,'path':p[role],'pages':len(r.pages),'startPage':start,'sha256':hashlib.sha256(file.read_bytes()).hexdigest()})
 if not teacher:
  end=TMP/'reflection.pdf';c=canvas.Canvas(str(end),pagesize=(W,H),invariant=1);reflection(c);c.save();writer.append_pages_from_reader(PdfReader(end));writer.add_outline_item('My review',18)
 for i,loc in enumerate(locations):
  y=H-122-i*66
  writer.add_annotation(1,Link(rect=(L,y-64,W-L-(75 if teacher else 0),y-4),target_page_index=loc['questions']-1))
  if teacher:writer.add_annotation(1,Link(rect=(W-L-65,y-64,W-L,y-4),target_page_index=loc['solutions']-1))
 writer.add_metadata({'/Title':'Kaizen Grade 4 Number - '+('Teacher Edition' if teacher else 'Student Workbook')+' - Pilot 1','/Author':'Kaizen Mathematics','/Subject':'Eight topics, 80 questions. Selected Number practice; not a complete Grade 4 course.'})
 writer.compress_identical_objects(remove_duplicates=True,remove_unreferenced=True)
 file=OUT/('grade-4-number-teacher-edition.pdf' if teacher else 'grade-4-number-student-workbook.pdf');writer.write(file);shutil.copyfile(file,DELIVERY/file.name)
 return {'path':str(file.relative_to(ROOT)),'pages':len(PdfReader(file).pages),'sha256':hashlib.sha256(file.read_bytes()).hexdigest(),'contents':locations,'sources':sources}
manifest={'title':'Grade 4 Number','edition':'Pilot 1','topics':8,'questions':80,'scope':'Eight existing Grade 4 Number topic packs. Not a complete Grade 4 course.','topicOrder':[{'id':p['id'],'title':p['bookTitle'],'goal':p['goal']} for p in packs],'student':build(False),'teacher':build(True)}
(OUT/'grade-4-number.json').write_text(json.dumps(manifest,indent=2)+'\n');print(json.dumps({k:manifest[k] for k in ['topics','questions']}|{'studentPages':manifest['student']['pages'],'teacherPages':manifest['teacher']['pages']},indent=2))
