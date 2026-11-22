"""Verify workbook contents, printed pagination, live contents links, and source preservation."""
from pathlib import Path
import json,hashlib,re,subprocess,concurrent.futures
from pypdf import PdfReader
import pdfplumber
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'assets/workbooks';review=ROOT/'tmp/pdfs/grade4-number-workbook/review';review.mkdir(parents=True,exist_ok=True)
m=json.loads((OUT/'grade-4-number.json').read_text());assert m['topics']==8 and m['questions']==80
assert len(set(p['id'] for p in m['topicOrder']))==8
for role,expected in [('student',19),('teacher',52)]:
 b=m[role];file=ROOT/b['path'];r=PdfReader(file);assert len(r.pages)==b['pages']==expected;assert hashlib.sha256(file.read_bytes()).hexdigest()==b['sha256']
 assert (ROOT/'output/pdf/workbooks'/file.name).read_bytes()==file.read_bytes()
 with pdfplumber.open(file) as book:
  for index,page in enumerate(book.pages,1):
   text=page.extract_text() or '';assert text and not re.search(r'\\(?:frac|begin|lim)|\ufffd|\u25a0|\bNaN\b',text)
   assert str(index) in page.within_bbox((page.width-80,page.height-43,page.width-20,page.height)).extract_text()
   assert 'Teacher Edition' in text if role=='teacher' else 'Student Workbook' in text
   for c in page.chars:assert 24<=c['x0']<=c['x1']<=page.width-24 and 8<=c['top']<=c['bottom']<=page.height-8,(role,index,c)
  for source in b['sources']:
   original=ROOT/source['path'];assert hashlib.sha256(original.read_bytes()).hexdigest()==source['sha256']
   with pdfplumber.open(original) as src:
    assert len(src.pages)==source['pages']
    for i,p in enumerate(src.pages):
     q=book.pages[source['startPage']-1+i];bbox=(25,65,float(p.width)-25,float(p.height)-45)
     assert p.within_bbox(bbox).extract_text()==q.within_bbox(bbox).extract_text(),(role,source['id'],i,'source body changed')
  assert len([s for s in b['sources'] if s['role']=='student'])==8
  if role=='student':assert not any(s['role']=='teacher' for s in b['sources'])
  else:assert len([s for s in b['sources'] if s['role']=='teacher'])==8
 links=r.pages[1]['/Annots'];expected_destinations=[]
 for entry in b['contents']:
  expected_destinations.append(entry['questions']-1)
  if role=='teacher':expected_destinations.append(entry['solutions']-1)
 assert len(links)==len(expected_destinations)
 for link,dest in zip(links,expected_destinations):assert link.get_object()['/Dest'][0]==r.pages[dest].indirect_reference
 subprocess.run(['pdftoppm','-scale-to','800','-png',str(file),str(review/role)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 print('Verified',role,expected,'pages',flush=True)
files=sorted(review.glob('*.png'))
for start in range(0,len(files),12):
 sheet=Image.new('RGB',(1200,1290),'#dce7e4');draw=ImageDraw.Draw(sheet)
 for i,f in enumerate(files[start:start+12]):
  image=Image.open(f);image.thumbnail((280,400));x=i%4*300;y=i//4*430;sheet.paste(image,(x+(300-image.width)//2,y+24));draw.text((x+5,y+4),f.stem,fill='black')
 sheet.save(review/f'contact-{start//12+1}.jpg')
(OUT/'grade-4-number-qa.json').write_text(json.dumps({'studentPages':19,'teacherPages':52,'questions':80,'checks':['All source question and solution body text unchanged','Printed continuous page numbers','Contents links point to correct chapters','Separate student and teacher editions','Every page rendered','Text bounds and notation','Source and delivery hashes'],'errors':[]},indent=2)+'\n')
