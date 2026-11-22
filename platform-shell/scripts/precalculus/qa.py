"""Check U.S. precalculus source maths, all published PDF bounds, and render every page."""
from pathlib import Path
import json,re,sys,os,hashlib,subprocess,concurrent.futures
sys.path.insert(0,os.environ.get('KAIZEN_PRECALC_PYTHON_MODULES','/tmp/kaizen-precalc-python'))
import sympy as S
from pypdf import PdfReader
import pdfplumber
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[2];D=ROOT/'data/precalculus';lib=json.loads((D/'library.json').read_text());catalog=json.loads((D/'catalog.json').read_text());packs={p['id']:p for p in lib['packs']};checks=0
assert len(packs)==len(catalog['packs'])==48;assert len(catalog['sections'])==7
for p in packs.values():
 assert len(p['questions'])==8;assert [q['number'] for q in p['questions']]==list(range(1,9))
 for q in p['questions']:
  assert q['marks']==sum(int(re.search(r'\[(\d+)\]',c)[1]) for c in q['criteria']);assert q['answer'] and q['steps']
  assert not re.search(r'\b(?:differentiate|integrate|derivative|antiderivative)\b|dy/dx',q['question'],re.I),(p['id'],q['number'])
  assert '£' not in json.dumps(q,ensure_ascii=False)
  for c in q.get('checks',[]):assert S.simplify(S.sympify(c['left'])-S.sympify(c['right']))==0,(p['id'],q['number'],c);checks+=1
# Independently solve the adapted systems, matrix products/transforms, and counting questions.
x,y,z=S.symbols('x y z')
for i,q in enumerate(packs['S01']['questions'],1):
 sol=S.solve([x+y+z-(2*i+3),x+2*y+3*z-(3*i+8),2*x-y+z-(i+1)],[x,y,z]);values=tuple(sol[t] for t in (x,y,z));expected=','.join(str(v) for v in values);assert expected in q['answer'].replace(' ','');checks+=1
for i,q in enumerate(packs['S03']['questions'],1):
 A=S.Matrix([[i,1],[2,i+2]]);B=S.Matrix([[1,2],[0,1]]);AB=A*B;matrix=re.search(r'\\begin\{matrix\}(.*?)\\end\{matrix\}',q['answer'])[1];actual=S.Matrix([[int(v.strip()) for v in row.split('&')] for row in matrix.split('\\\\')]);assert AB==actual;assert r'\('+str(A.det())+r'\)' in q['answer'];checks+=2
for i,q in enumerate(packs['S04']['questions'],2):
 assert S.Matrix([[i,1],[i-1,1]])*S.Matrix([2,3])==S.Matrix([2*i+3,2*(i-1)+3]);assert '(2,3)' in q['answer'];checks+=1
for i,q in enumerate(packs['S05']['questions'],1):
 rotation=S.Matrix([[0,-1],[1,0]]);stretch=S.diag(2,1);image=stretch*rotation*S.Matrix([i,2]);assert f'({image[0]},{image[1]})' in q['answer'];checks+=1
for q in packs['Q05']['questions']:
 n,r=map(int,re.search(r'From (\d+) distinct people.*committee of (\d+)',q['question']).groups());numbers=list(map(int,re.findall(r'\d+',q['answer'])));assert numbers==[S.binomial(n,r),S.factorial(n)/S.factorial(n-r)];checks+=1
review=ROOT/'tmp/pdfs/precalculus-review';review.mkdir(parents=True,exist_ok=True)
for old in review.iterdir():
 if old.suffix in ['.png','.jpg']:old.unlink()
def verify(job):
 p,role=job;file=ROOT/p[role];reader=PdfReader(file);assert len(reader.pages)==p[role+'Pages'];assert hashlib.sha256(file.read_bytes()).hexdigest()==p[role+'Hash'];alltext=''
 with pdfplumber.open(file) as pdf:
  for i,page in enumerate(pdf.pages):
   assert abs(page.width-612)<.1 and abs(page.height-792)<.1;content=page.extract_text() or '';alltext+=content+'\n';assert content.strip()
   assert not re.search(r'\\[A-Za-z]+|\$|\^|\ufffd|\bNaN\b|\u25a0',content),(p['id'],role,i,'notation')
   for c in page.chars:assert 24<=c['x0']<=c['x1']<=page.width-24 and 7<=c['top']<=c['bottom']<=page.height-10,(p['id'],role,i,'text bounds',c)
   for im in page.images:assert im['x0']>=25 and im['x1']<=page.width-25 and im['top']>=40 and im['bottom']<=page.height-40,(p['id'],role,i,'image bounds',im)
 if role=='student':assert len(reader.pages)==1 and 'Suggested credit' not in alltext;assert all(re.search(r'\b0'+str(i)+r'\b',alltext) for i in range(1,9))
 else:assert set(re.findall(r'Question ([1-8])\s+\|',alltext))==set('12345678')
 assert 'Permission granted to print and copy for classroom teaching and personal study.' in alltext
 subprocess.run(['pdftoppm','-scale-to','800','-png',str(file),str(review/(p['id']+'-'+role))],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 return len(reader.pages)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:pages=sum(pool.map(verify,[(p,r) for p in catalog['packs'] for r in ['student','teacher']]))
for role in ['student','teacher']:
 files=sorted(review.glob('*-'+role+'-*.png'));per=12 if role=='student' else 20;cols=4 if role=='student' else 5;tw=360 if role=='student' else 250;th=490 if role=='student' else 340
 for start in range(0,len(files),per):
  sheet=Image.new('RGB',(cols*tw,((per+cols-1)//cols)*th),'#e0e9e5');draw=ImageDraw.Draw(sheet)
  for j,file in enumerate(files[start:start+per]):
   im=Image.open(file);im.thumbnail((tw-12,th-25));xx=j%cols*tw+(tw-im.width)//2;yy=j//cols*th+20;sheet.paste(im,(xx,yy));draw.text((j%cols*tw+5,j//cols*th+4),file.stem,fill='black')
  sheet.save(review/f'{role}-contact-{start//per+1:02}.jpg')
for role,bundle in catalog['collections'].items():
 r=PdfReader(ROOT/bundle['path']);assert len(r.pages)==sum(p[role+'Pages'] for p in catalog['packs']);assert len(r.outline)==48
report={'packs':48,'questions':384,'topicPDFs':96,'pages':pages,'studentPages':48,'teacherPages':sum(p['teacherPages'] for p in catalog['packs']),'symbolicAndIndependentChecks':checks,'checks':['New symbolic claims','Adapted systems, matrix operations and counting checks','All source questions and marking totals','All PDF text and image bounds','US Letter size','Every topic PDF page rendered','Student/teacher separation','Collection page counts and bookmarks','No unrendered notation'],'errors':[]};(D/'qa.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
