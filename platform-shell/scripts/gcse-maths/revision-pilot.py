"""Author and print the Foundation Number / Calculations revision pilot.

source -> shared pack-library/prepare.cjs -> build. Existing topic PDFs are untouched.
"""
from pathlib import Path
from copy import deepcopy
from collections import Counter
import json,sys,importlib.util,hashlib,re
ROOT=Path(__file__).resolve().parents[2];DATA=ROOT/'data/gcse-maths'
SELECT={'N01':[1,8,2],'N02':[6,3,4],'N03':[2,3,4],'N04':[1,5,3],'N05':[1,7,8],'N06':[6,2,4],'N07':[5,7,8],'N08':[1,7,8]}
# Keep the established questions and answers; use concise, explicit review working.
WORK={
'N01:1':[r'\(16\div4=4\). Check: \(4\times4=16\).'],
'N01:8':['Multiply first.',r'\(5\times3=15\)',r'\(4+15-8=19-8=11\)'],
'N01:2':['Multiply first, then subtract the negative.',r'\(6\times(-3)=-18\)',r'\(-6+(-18)-(-8)=-24+8=-16\)'],
'N02:6':['The denominators are already equal.',r'\(\frac34-\frac14=\frac{3-1}{4}=\frac24=\frac12\)'],
'N02:3':['Multiply numerators and denominators, then simplify.',r'\(\frac26\times\frac37=\frac{2\times3}{6\times7}=\frac6{42}=\frac17\)'],
'N02:4':['Multiply by the reciprocal of the divisor.',r'\(\frac36\div\frac89=\frac36\times\frac98\)',r'\(\frac{3\times9}{6\times8}=\frac{27}{48}=\frac9{16}\)'],
'N03:2':['Multiplying by 0.01 is dividing by 100.',r'\(4.6\div100=0.046\)'],
'N03:3':[r'\(39.3\div6=(36+3.3)\div6\)',r'\(36\div6=6,\quad3.3\div6=0.55\)',r'\(6+0.55=6.55\)'],
'N03:4':['Align decimal place values and write the trailing zeros.',r'\(70.400-41.000=29.400\)',r'\(29.400-0.573=28.827\)'],
'N04:1':['Percentage means out of 100.',r'\(55\%=55\div100=0.55\)'],
'N04:5':[r'\(40\%=\frac{40}{100}\)',r'\(\frac{40\div20}{100\div20}=\frac25\)'],
'N04:3':['Multiply the decimal by 100 to express it as a percentage.',r'\(0.75\times100=75\), so the answer is 75%.'],
'N05:1':[r'One third: \(36\div3=12\) pupils.',r'Two thirds: \(12\times2=24\) pupils.'],
'N05:7':[r'Three parts total 24: \(24\div3=8\) per part.',r'The whole has five parts: \(8\times5=40\).'],
'N05:8':['The pupil multiplied by 4. A quarter requires division into four equal parts.',r'\(80\div4=20\)',r'Check: \(4\times20=80\).'],
'N06:6':[r'\(40\%=\frac{40}{100}=0.4\)',r'\(0.4\times278=111.2\)'],
'N06:2':[r'\(24\%=\frac{24}{100}=0.24\)',r'\(0.24\times352=84.48\)'],
'N06:4':[r'\(19\%=\frac{19}{100}=0.19\)',r'\(0.19\times719=136.61\)'],
'N07:5':['List the factors.',r'16: \(1,2,4,8,16\)',r'24: \(1,2,3,4,6,8,12,24\)','The greatest common factor is 8.'],
'N07:7':[r'\(72=2\times36=2\times2\times18\)',r'\(=2\times2\times2\times3\times3=2^3\times3^2\)'],
'N07:8':[r'Multiples of 12: \(12,24,36,\ldots\)',r'Multiples of 18: \(18,36,\ldots\)','The least positive common multiple is 36. The next simultaneous flash is 36 seconds after 12:00, at 12:00:36.'],
'N08:1':[r'\(2^5=2\times2\times2\times2\times2\)',r'\(=4\times2\times2\times2=8\times2\times2=32\)'],
'N08:7':[r'\(8^2=64,\quad9^2=81\)',r'\(64<70<81\), so \(8<\sqrt{70}<9\).','The consecutive integers are 8 and 9.'],
'N08:8':['Exchange numerator and denominator.',r'\(\frac23\times\frac32=1\)',r'The reciprocal is \(\frac32\).']
}
AWARD={
'N01:1':['B1: 4 [1].'],
'N01:8':['M1: Multiply 5 by 3 before addition and subtraction [1].','A1: 11 [1].'],
'N01:2':['M1: Multiply first and interpret subtracting a negative correctly [1].','A1: -16 [1].'],
'N02:6':['M1: Subtract the numerators over the common denominator [1].','A1: Correct simplified fraction [1].'],
'N02:3':['M1: Multiply numerators and denominators [1].','A1: Correct simplified fraction [1].'],
'N02:4':['M1: Multiply by the reciprocal of the divisor [1].','A1: Correct simplified fraction [1].'],
'N03:2':['M1: Divide 4.6 by 100 [1].','A1: 0.046 [1].'],
'N03:3':['M1: Valid decimal division method [1].','A1: 6.55 [1].'],
'N03:4':['M1: Subtract with decimal place values aligned [1].','A1: 28.827 [1].'],
'N04:1':['B1: 0.55 [1].'],'N04:5':['B1: Correct fraction in simplest form [1].'],'N04:3':['B1: 75% [1].'],
'N05:1':['M1: One third is 12 [1].','A1: 24 pupils [1].'],
'N05:7':['M1: One fifth is 8 [1].','A1: The whole is 40 [1].'],
'N05:8':['M1: Divide 80 by 4 [1].','A1: 20 and explain that division, not multiplication, is needed [1].'],
'N06:6':['M1: Multiply 278 by 0.4 [1].','A1: 111.2 [1].'],
'N06:2':['M1: Multiply 352 by 0.24 [1].','A1: 84.48 [1].'],
'N06:4':['M1: Multiply 719 by 0.19 [1].','A1: 136.61 [1].'],
'N07:5':['M1: Valid common-factor method [1].','A1: Highest common factor is 8 [1].'],
'N07:7':['M1: Correct breakdown into prime factors [1].','A1: Correct index form as shown above [1].'],
'N07:8':['M1: Find the least common multiple, 36 [1].','A1: Next simultaneous flash at 12:00:36 [1].'],
'N08:1':['B1: 32 [1].'],
'N08:7':['M1: Compare 70 with the squares 64 and 81 [1].','A1: Both consecutive integers, 8 and 9 [1].'],
'N08:8':['B1: Correct reciprocal [1].']
}
def source():
 library={p['id']:p for p in json.loads((DATA/'library.json').read_text())['packs']};questions=[]
 # Three interleaved rounds; both student pages include all eight topics.
 orders=[list(SELECT),['N04','N01','N07','N03','N08','N05','N02','N06'],['N05','N03','N08','N01','N06','N02','N04','N07']]
 for round_,order in enumerate(orders):
  for topic in order:
   old=SELECT[topic][round_];q=deepcopy(library[topic]['questions'][old-1]);q.pop('raw',None);q['sourceTopic']=topic;q['sourceTitle']=library[topic]['title'];q['sourceQuestion']=old;q['number']=len(questions)+1;q['steps']=WORK[f'{topic}:{old}'];q['criteria']=AWARD[f'{topic}:{old}'];q['origin']='selected-topic-question-with-reviewed-working'
   if topic=='N08' and old==8:q['question']=r'Find the reciprocal of \(\frac23\).'
   if topic=='N07' and old==5:q['question']='Find the highest common factor of 16 and 24.';q['instruction']=''
   q['questionText']=q['question'];questions.append(q)
 pack={'id':'FNR01','title':'Number Revision 1','area':'Number','group':'Calculations','tier':'Foundation','sourceTool':'integer-operations','tools':list(dict.fromkeys(t for topic in SELECT for t in library[topic]['tools'])),'instructions':'Answer all 24 questions on separate paper. Show your working. Give fractions in simplest form. A calculator may be used.','topicIds':list(SELECT),'questions':questions}
 assert Counter(q['sourceTopic'] for q in questions)==Counter({t:3 for t in SELECT})
 (DATA/'number-revision-pilot.json').write_text(json.dumps({'packs':[pack]},indent=2,ensure_ascii=False)+'\n');print('Authored FNR01: 24 questions, three per topic.')

def build():
 spec=importlib.util.spec_from_file_location('gcse_print',ROOT/'scripts/gcse-maths/build.py');g=importlib.util.module_from_spec(spec);spec.loader.exec_module(g)
 from reportlab.pdfgen import canvas
 from reportlab.lib.colors import HexColor
 from pypdf import PdfReader
 ap,b=g.ap,g.b;W,H,L,WIDTH=g.W,g.H,g.L,g.WIDTH
 prepared=json.loads((ROOT/'tmp/pdfs/gcse-revision-prepared.json').read_text());assert not prepared['renderErrors'];p=prepared['packs'][0];assert len(p['questions'])==24
 out=ROOT/'assets/gcse-maths';student=out/'foundation-number-revision-1-questions.pdf';teacher=out/'foundation-number-revision-1-solutions.pdf';marks=sum(q['marks'] for q in p['questions'])
 def header(c,role,page):
  c.setTitle('Kaizen GCSE Foundation - Number Revision 1 - '+role);c.setAuthor('Kaizen Mathematics');c.setFillColor(HexColor(ap.TEAL));c.rect(0,H-8,W,8,fill=1,stroke=0)
  ap.label(c,'KAIZEN MATHEMATICS',L,H-34,9.5,'SansBold',ap.TEAL);c.drawRightString(W-L,H-34,'GCSE | FOUNDATION')
  y=b.short_text(c,'Number Revision 1',L,H-53,WIDTH,22,True,ap.INK)
  y=b.short_text(c,'Calculations | '+('24 mixed questions' if role=='Questions' else 'Teacher solutions & suggested marks'),L,y-9,WIDTH,12,True,ap.TEAL)
  c.setStrokeColor(HexColor(ap.LINE));c.line(L,y-12,W-L,y-12)
  ap.label(c,'© Kaizen Mathematics. Permission granted to print and copy for classroom teaching and personal study.',L,38,7.8,color=ap.MUTED)
  ap.label(c,'Board-neutral topic revision | Not an official exam paper or mark scheme',L,26,7.8,color=ap.MUTED)
  ap.label(c,'FNR01 | '+role,L,14,7.2,color=ap.MUTED);c.drawRightString(W-L,14,str(page))
  return y-28
 gap=24;cw=(WIDTH-gap)/2;bottom_limit=58
 c=canvas.Canvas(str(student),pagesize=(W,H),invariant=1)
 for page,start in enumerate(range(0,24,12),1):
  y=header(c,'Questions',page)
  ap.label(c,'Name: ___________________________    Date: ______________',L,y-2,9.5,color=ap.MUTED)
  y=b.short_text(c,p['instructions'],L,y-16,WIDTH,9.5,color=ap.MUTED)-10
  ap.label(c,f'{marks} suggested marks in total | Questions {start+1}-{start+12} of 24',L,y,9,color=ap.MUTED);y-=19
  rows=[]
  for i in range(start,start+12,2):
   row=[]
   for q in p['questions'][i:i+2]:
    items=b.flows(q['print']['question'],cw,11,diagram_max=80);row.append((q,items,b.height(items)+34))
   rows.append(row)
  heights=[max(64,max(v[2] for v in row)) for row in rows];available=y-bottom_limit
  if sum(heights)>available:raise ValueError('Student page would overflow; do not shrink fonts.')
  extra=(available-sum(heights))/6
  for row,h in zip(rows,heights):
   h+=extra
   for col,(q,items,_) in enumerate(row):
    x=L+col*(cw+gap);ap.label(c,f'{q["number"]:02}',x,y,11,'SansBold',ap.TEAL);c.setFont('Sans',8.5);c.drawRightString(x+cw,y,str(q['marks'])+(' mark' if q['marks']==1 else ' marks'))
    low=b.draw_flows(c,items,x,y-17,cw);assert low>=y-h+9
    c.setStrokeColor(HexColor(ap.LINE));c.line(x,y-h+7,x+cw,y-h+7)
   y-=h
  c.showPage()
 c.save()
 c=canvas.Canvas(str(teacher),pagesize=(W,H),invariant=1);page=1;y=header(c,'Solutions',page)
 y=b.short_text(c,f'{marks} suggested marks. M1: method; A1: accuracy; B1: independent credit. Accept equivalent methods. Topic labels identify the area assessed.',L,y,WIDTH,9.5,color=ap.MUTED)-17
 for start in range(0,24,2):
  row=[]
  for q in p['questions'][start:start+2]:
   blocks=[{'kind':'paragraph','html':'<b>Answer:</b> '+v['html']} if v['kind']=='paragraph' else v for v in q['print']['answer']]
   blocks+=q['print']['steps']+[{'kind':'paragraph','html':'<b>Suggested award:</b> '+s} for s in q['criteria']]
   items=b.flows(blocks,cw,10.5,diagram_max=90);topic=b.flows([{'kind':'paragraph','html':q['sourceTopic']+' · '+q['sourceTitle']}],cw,8.5);row.append((q,items,topic,b.height(items)+b.height(topic)+32))
  h=max(v[3] for v in row)+14
  if y-h<bottom_limit:c.showPage();page+=1;y=header(c,'Solutions',page)
  if h>y-bottom_limit:raise ValueError('Teacher solution block too tall.')
  for col,(q,items,topic,_) in enumerate(row):
   x=L+col*(cw+gap);ap.label(c,'Question '+str(q['number']),x,y,11,'SansBold',ap.TEAL);c.setFont('Sans',8.5);c.drawRightString(x+cw,y,str(q['marks'])+(' mark' if q['marks']==1 else ' marks'))
   yy=b.draw_flows(c,topic,x,y-16,cw)-6;low=b.draw_flows(c,items,x,yy,cw);assert low>=y-h+6
   c.setStrokeColor(HexColor(ap.LINE));c.line(x,y-h+7,x+cw,y-h+7)
  y-=h
 c.showPage();c.save()
 for file in [student,teacher]:ap.validate(file)
 entry={k:p[k] for k in ['id','title','area','group','tier','topicIds']};entry.update({'questions':24,'marks':marks,'student':str(student.relative_to(ROOT)),'teacher':str(teacher.relative_to(ROOT)),'studentPages':len(PdfReader(student).pages),'teacherPages':len(PdfReader(teacher).pages),'studentHash':hashlib.sha256(student.read_bytes()).hexdigest(),'teacherHash':hashlib.sha256(teacher.read_bytes()).hexdigest()})
 (DATA/'revision-catalog.json').write_text(json.dumps([entry],indent=2)+'\n')
 catalog=json.loads((DATA/'catalog.json').read_text());catalog['reviews']=[entry];(DATA/'catalog.json').write_text(json.dumps(catalog,indent=2)+'\n');(ROOT/'assets/site/gcse-maths-data.js').write_text('window.KaizenGCSEData='+json.dumps(catalog,separators=(',',':'))+';\n')
 print(json.dumps(entry,indent=2))
if __name__=='__main__':
 if len(sys.argv)!=2 or sys.argv[1] not in ['source','build']:raise SystemExit('Usage: revision-pilot.py source|build')
 (source if sys.argv[1]=='source' else build)()
