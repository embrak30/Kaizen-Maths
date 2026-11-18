from pathlib import Path
import json,re,hashlib,subprocess
from pypdf import PdfReader
import pdfplumber
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[2];DATA=ROOT/'data/alevel-maths/edexcel-9ma0';QA=ROOT/'tmp/pdfs/9ma0-pilot-review';QA.mkdir(parents=True,exist_ok=True)
source=json.loads((DATA/'pilots.json').read_text());manifest=json.loads((DATA/'pilot-manifest.json').read_text());pagecount=0
for p in source['packs']:
 assert len(p['questions'])==8
 assert [q['number'] for q in p['questions']]==list(range(1,9))
 assert len({q['question'] for q in p['questions']})==8
 for q in p['questions']:assert q['marks']==sum(int(re.search(r'\[(\d+)\]',c)[1]) for c in q['criteria'])
for p in manifest:
 for role in ['student','teacher']:
  f=ROOT/p[role];reader=PdfReader(f);assert len(reader.pages)==p[role+'Pages'];assert hashlib.sha256(f.read_bytes()).hexdigest()==p[role+'Hash']
  if role=='student':assert len(reader.pages)==1
  alltext=''
  with pdfplumber.open(f) as pdf:
   for i,page in enumerate(pdf.pages):
    pagecount+=1;text=page.extract_text() or '';alltext+=text+'\n';assert text.strip()
    assert not re.search(r'\\[A-Za-z]+|\$|\^|\ufffd|\bNaN\b',text),(f,i,'notation')
    for c in page.chars:assert 24<=c['x0']<=c['x1']<=page.width-24 and 8<=c['top']<=c['bottom']<=page.height-12,(f,i,'text bounds')
    for im in page.images:assert im['x0']>=25 and im['x1']<=page.width-25 and im['top']>=45 and im['bottom']<=page.height-40,(f,i,'image bounds')
  if role=='student':
   assert 'Permission granted to print and copy for classroom teaching and personal study.' in alltext
   assert 'Kaizen A Level One-Pagers' in alltext
   assert not any(v in alltext for v in ['Suggested award','Worked solutions','Step 1.'])
  else:
   assert set(re.findall(r'Question ([1-8])\s+\|',alltext))==set('12345678')
   assert 'Suggested award' in alltext
  subprocess.run(['pdftoppm','-scale-to','1000','-png',str(f),str(QA/f.stem)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
for p in manifest:
 stem=Path(p['teacher']).stem;files=sorted(QA.glob(stem+'-*.png'));sheet=Image.new('RGB',(1400,2000),'#dfe8e4');d=ImageDraw.Draw(sheet)
 for i,f in enumerate(files):
  im=Image.open(f);im.thumbnail((690,970));xx=i%2*700+(700-im.width)//2;yy=i//2*1000+22;sheet.paste(im,(xx,yy));d.text((i%2*700+8,i//2*1000+4),f.stem,fill='black')
 sheet.save(QA/(stem+'-contact.jpg'))
(DATA/'pilot-qa.json').write_text(json.dumps({'pdfs':6,'pages':pagecount,'studentSheets':3,'questions':24,'checks':'All pages rendered; one-page student sets, notation, bounds, hashes, permissions, question numbering, mark totals and student/teacher separation passed. Visual review required.','errors':[]},indent=2)+'\n')
print(f'PASS: six PDFs / {pagecount} pages; all three student sets are one page.')
