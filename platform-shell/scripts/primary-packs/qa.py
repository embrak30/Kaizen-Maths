"""Validate every published PDF and render every complete-pack page for review."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import json,subprocess,re,hashlib,zipfile
from PIL import Image,ImageOps,ImageDraw
from pypdf import PdfReader
ROOT=Path(__file__).resolve().parents[2]
DATA=json.loads((ROOT/'data/primary-packs/catalog.json').read_text())
OUT=ROOT/'tmp/pdfs/primary-review';OUT.mkdir(parents=True,exist_ok=True)
POPPLER='/Users/barker/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdftoppm'

def check(p):
 pages=[]
 for key in ['student','teacher','complete']:
  file=ROOT/p[key];r=PdfReader(file)
  if key=='student':assert len(r.pages)==2,p['id']
  if key=='complete':assert hashlib.sha256(file.read_bytes()).hexdigest()==p['hash']
  for i,page in enumerate(r.pages):
   text=page.extract_text()
   assert not re.search(r'\\[A-Za-z]+|\^|\u25a0|\ufffd|\b(?:NaN|undefined|Infinity)\b|J\$',text),(file,i)
   if key=='student':
    for number in range(i*5+1,i*5+6):assert re.search(r'\b'+str(number).zfill(2)+r'\b',text),(file,i,number)
  pages.append(len(r.pages))
 prefix=OUT/p['id'];subprocess.run([POPPLER,'-scale-to','900','-png',str(ROOT/p['complete']),str(prefix)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 images=sorted(OUT.glob(p['id']+'-*.png'))
 assert len(images)==pages[-1],p['id']
 return {'id':p['id'],'pages':pages,'images':[str(f) for f in images]}

with ThreadPoolExecutor(max_workers=4) as pool:results=list(pool.map(check,DATA['packs']))
allimages=[(p['id'],f) for p in results for f in p['images']]
contacts=[]
for start in range(0,len(allimages),20):
 subset=allimages[start:start+20];sheet=Image.new('RGB',(1000,1490),'#dce7e6');draw=ImageDraw.Draw(sheet)
 for i,(ident,file) in enumerate(subset):
  im=Image.open(file).convert('RGB');im.thumbnail((230,270));x=(i%4)*250+(250-im.width)//2;y=(i//4)*298+20;sheet.paste(im,(x,y));draw.text(((i%4)*250+8,(i//4)*298+3),ident+' / '+Path(file).stem.split('-')[-1],fill='#183b40')
 target=OUT/f'contact-{start//20+1:02}.jpg';sheet.save(target,quality=85);contacts.append(str(target))
for g in [4,5,6]:
 with zipfile.ZipFile(ROOT/DATA['downloads'][str(g)]) as z:
  assert z.testzip() is None;assert len(z.namelist())==sum(p['grade']==g for p in DATA['packs'])
with zipfile.ZipFile(ROOT/DATA['allDownload']) as z:assert z.testzip() is None;assert len(z.namelist())==75
report={'packs':len(results),'questions':750,'pdfs':len(results)*3,'completePackPagesRendered':len(allimages),'contactSheets':contacts,'rendered':results,'notationErrors':0,'missingQuestionLabels':0}
(ROOT/'data/primary-packs/qa-report.json').write_text(json.dumps({k:v for k,v in report.items() if k not in ['rendered','contactSheets']},indent=2)+'\n')
(OUT/'review-index.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['rendered','contactSheets']},indent=2))
