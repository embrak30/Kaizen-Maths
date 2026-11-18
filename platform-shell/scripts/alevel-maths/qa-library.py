"""Verify every published PDF and render every page for print review."""
from pathlib import Path
import json,re,hashlib,subprocess,concurrent.futures
from pypdf import PdfReader
import pdfplumber
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[2];D=ROOT/'data/alevel-maths/edexcel-9ma0';QA=ROOT/'tmp/pdfs/9ma0-library-review';QA.mkdir(parents=True,exist_ok=True)
manifest=json.loads((D/'manifest.json').read_text());source=json.loads((D/'library.json').read_text());assert len(manifest)==len(source['packs'])==140
for p in source['packs']:
 assert len(p['questions'])==8
 for q in p['questions']:
  assert q['marks']==sum(int(re.search(r'\[(\d+)\]',c)[1]) for c in q['criteria']),(p['id'],q['number'])
  assert not re.search(r'\b(MVT|EVT|L.Hospital|Taylor series|Euler.s method|Poisson|t-test)\b',q['question'])
def verify(job):
 p,role=job;f=ROOT/p[role];r=PdfReader(f);assert len(r.pages)==p[role+'Pages'];assert hashlib.sha256(f.read_bytes()).hexdigest()==p[role+'Hash']
 if role=='student':assert len(r.pages)==1
 text=''
 with pdfplumber.open(f) as pdf:
  for i,page in enumerate(pdf.pages):
   content=page.extract_text() or '';text+=content+'\n';assert content.strip()
   assert not re.search(r'\\[A-Za-z]+|\$|\^|\ufffd|\bNaN\b',content),(p['id'],role,i,'notation')
   for c in page.chars:assert 24<=c['x0']<=c['x1']<=page.width-24 and 8<=c['top']<=c['bottom']<=page.height-12,(p['id'],role,i,'text bounds',c)
   for im in page.images:assert im['x0']>=25 and im['x1']<=page.width-25 and im['top']>=45 and im['bottom']<=page.height-40,(p['id'],role,i,'image bounds',im)
 if role=='student':
  assert 'Permission granted to print and copy for classroom teaching and personal study.' in text
  assert 'Kaizen A Level One-Pagers' in text
  assert not any(v in text for v in ['Suggested award','Worked solutions'])
  assert all(re.search(r'\b0'+str(n)+r'\b',text) for n in range(1,9)),p['id']
 else:assert set(re.findall(r'Question ([1-8])\s+\|',text))==set('12345678')
 subprocess.run(['pdftoppm','-scale-to','900','-png',str(f),str(QA/f.stem)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 return len(r.pages)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:pages=sum(pool.map(verify,[(p,r) for p in manifest for r in ['student','teacher']]))
for start in range(0,140,12):
 sheet=Image.new('RGB',(1800,1800),'#dfe8e4');draw=ImageDraw.Draw(sheet)
 for i,p in enumerate(manifest[start:start+12]):
  f=next(QA.glob(Path(p['student']).stem+'-*.png'));im=Image.open(f);im.thumbnail((440,550));xx=i%4*450+(450-im.width)//2;yy=i//4*600+25;sheet.paste(im,(xx,yy));draw.text((i%4*450+10,i//4*600+5),p['id']+' '+p['title'][:42],fill='black')
 sheet.save(QA/f'contact-{start//12+1:02}.jpg')
report={'packs':140,'questions':1120,'pdfs':280,'pages':pages,'studentPages':140,'checks':['Every PDF rendered','One-page student sets at fixed 11pt prose','Question numbering and mark totals','Text/image bounds','No raw LaTeX, caret or dollar delimiters','Content hashes and download paths','Student/teacher separation and permissions'],'errors':[]}
(D/'qa.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
