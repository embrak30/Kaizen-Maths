"""Substitute source answers, validate PDF geometry and render every published page.
Symbolic checks verify algebraic assertions, derivatives, integrals and DE residuals;
proof wording, geometric descriptions and convergence arguments also require editorial review.
"""
from pathlib import Path
import sys,os,json,re,hashlib,subprocess,concurrent.futures,shutil
sys.path.insert(0,os.environ.get('KAIZEN_MATHS_PYTHON_MODULES','/tmp/kaizen-precalc-python'))
import sympy as S
ROOT=Path(__file__).resolve().parents[2];DATA=ROOT/'data/further-maths/edexcel-9fm0'
lib=json.loads((DATA/'library.json').read_text());x,t=S.symbols('x t',real=True);n,r=S.symbols('n r',integer=True,positive=True)
loc={'x':x,'t':t,'n':n,'r':r};parse=lambda v:S.sympify(v,locals=loc);checks=0;errors=[]
def zero(v):
 if isinstance(v,S.MatrixBase):return all(zero(e) for e in v)
 # sign(u)/Abs(u)=1/u away from excluded logarithmic singularities.
 v=v.replace(S.sign,lambda arg:arg/S.Abs(arg))
 v=S.simplify(S.cancel(v))
 if v==0:return True
 return S.simplify(S.expand_complex(v))==0
assert len(lib['packs'])==30
for p in lib['packs']:
 assert len(p['questions'])==8
 for q in p['questions']:
  assert q['marks']==sum(int(re.search(r'\[(\d+)\]',s)[1]) for s in q['criteria'])
  assert not any(ord(c)<32 and c not in '\n\r' for c in q['question']+q['answer']+''.join(q['steps']))
  for c in q['checks']:
   try:
    kind=c['type'];v=loc.get(c.get('variable','x'),x)
    if kind=='identity':res=parse(c['left'])-parse(c['right'])
    elif kind=='derivative':res=S.diff(parse(c['function']),v)-parse(c['result'])
    elif kind=='integral':
     actual=S.integrate(parse(c['function']),(x,parse(c['lower']),parse(c['upper'])));expected=parse(c['result']);res=0 if actual==expected else actual-expected
    elif kind=='series':res=S.series(parse(c['function']),x,0,c['degree']+1).removeO()-parse(c['result'])
    elif kind=='first':
     y=parse(c['solution']);res=S.diff(y,x)+parse(c['p'])*y-parse(c['rhs'])
    elif kind=='ode':
     y=parse(c['solution']);res=S.diff(y,v,2)+parse(c['a'])*S.diff(y,v)+parse(c['b'])*y-parse(c['rhs'])
    else:raise ValueError(kind)
    if p['id']=='CP26' and q['number']==7:res=S.sympify(res).subs(x,3+S.Symbol('positive_offset',positive=True))
    assert zero(S.sympify(res)),str(res)
    checks+=1
   except Exception as e:errors.append([p['id'],q['number'],str(e)])
print(json.dumps({'symbolicChecks':checks,'errors':errors},indent=2));assert not errors
if '--source-only' in sys.argv:raise SystemExit()
from pypdf import PdfReader
import pdfplumber
from PIL import Image,ImageDraw
catalog=json.loads((DATA/'catalog.json').read_text());OUT=ROOT/'tmp/pdfs/further-maths-qa';OUT.mkdir(parents=True,exist_ok=True);files=[];pages=0
for p in catalog['packs']:
 for role in ['student','teacher']:
  file=ROOT/p[role];reader=PdfReader(file);assert len(reader.pages)==p[role+'Pages'];assert hashlib.sha256(file.read_bytes()).hexdigest()==p[role+'Hash']
  if role=='student':assert len(reader.pages)==1
  with pdfplumber.open(file) as pdf:
   for page in pdf.pages:
    assert abs(page.width-595.276)<1 and abs(page.height-841.89)<1
    for ch in page.chars:
     assert -1<=ch['x0']<=ch['x1']<=page.width+1 and -1<=ch['top']<=ch['bottom']<=page.height+1,(file,ch)
    for im in page.images:assert im['x0']>=-1 and im['x1']<=page.width+1 and im['top']>=-1 and im['bottom']<=page.height+1,(file,im)
    text=page.extract_text() or '';assert not re.search(r'\\(?:frac|theta|begin|int|sqrt)\b|\u25a1|\ufffd',text),(file,text)
  files.append(file);pages+=len(reader.pages)
# The combined download must preserve all current topic PDFs in the declared order.
manifest=json.loads((ROOT/'assets/ready-made-complete/manifest.json').read_text())
bundle=next(b for b in manifest['collections'] if b['id']=='further-maths')
combined=ROOT/bundle['path'];reader=PdfReader(combined)
assert hashlib.sha256(combined.read_bytes()).hexdigest()==bundle['sha256']
assert bundle['topics']==30 and len(bundle['sources'])==60 and len(reader.pages)==pages
assert bundle['parts']['student']['pages']==30 and bundle['parts']['teacher']['startPage']==31
assert [item.title for item in reader.outline if not isinstance(item,list)]==['Topic Practice','Teacher Pack']
assert [len(item) for item in reader.outline if isinstance(item,list)]==[30,30]
position=0
for source in bundle['sources']:
 file=ROOT/source['path'];assert hashlib.sha256(file.read_bytes()).hexdigest()==source['sha256']
 assert source['startPage']==position+1
 for page in PdfReader(file).pages:
  assert page.mediabox==reader.pages[position].mediabox
  assert page.get_contents().get_data()==reader.pages[position].get_contents().get_data()
  position+=1
assert position==pages
def render(file):
 prefix=OUT/file.stem;poppler=shutil.which('pdftoppm') or str(Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/poppler/bin/pdftoppm');subprocess.run([poppler,'-scale-to','620','-png',str(file),str(prefix)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:list(pool.map(render,files))
for role in ['student','teacher']:
 images=sorted(OUT.glob('*-'+role+'-*.png'));thumbs=[]
 for path in images:
  im=Image.open(path).convert('RGB');im.thumbnail((200,285));thumbs.append((path,im.copy()))
 for batch in range(0,len(thumbs),20):
  group=thumbs[batch:batch+20];sheet=Image.new('RGB',(1050,315*((len(group)+4)//5)),'#dce2e0');draw=ImageDraw.Draw(sheet)
  for j,(path,im) in enumerate(group):xx=10+(j%5)*210;yy=10+(j//5)*315;sheet.paste(im,(xx,yy));draw.text((xx,yy+286),path.stem,fill='black')
  sheet.save(OUT/f'contact-{role}-{batch//20+1}.jpg')
report={'packs':30,'questions':240,'symbolicChecks':checks,'pdfs':len(files),'pagesRendered':pages,'scope':'Core Pure only','editorialReview':'Proofs, geometric descriptions and convergence arguments are not all covered by symbolic checks.'}
(DATA/'qa.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
