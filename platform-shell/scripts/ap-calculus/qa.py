from pathlib import Path
import json,subprocess,concurrent.futures,re,hashlib
from PIL import Image,ImageDraw
from pypdf import PdfReader
import pdfplumber
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'assets/ap-calculus';QA=Path('/tmp/kaizen-ap-pdf-qa');QA.mkdir(exist_ok=True)
for old in list(QA.glob('*.png'))+list(QA.glob('contact-*.jpg')):old.unlink()
manifest=json.loads((ROOT/'data/ap-calculus/pdf-manifest.json').read_text());errors=[];pages=[];files=sorted(OUT.glob('*.pdf'))
def check(path):
 info=[];reader=PdfReader(path)
 with pdfplumber.open(path) as pdf:
  for i,p in enumerate(pdf.pages,1):
   text=p.extract_text() or '';assert text.strip(),(path.name,i,'empty text')
   assert not re.search(r'\\[A-Za-z]+|\$|\^|\ufffd|=\s*undefined|\bNaN\b',text),(path.name,i,'notation')
   if path.stem.endswith('-questions'):
    assert not any(s in text for s in ['Teacher answer key','Worked solutions','Suggested award']),(path.name,i,'teacher content')
    for required in ['Kaizen Calculus One-Pagers','© Kaizen Mathematics. Permission granted to print and copy for classroom teaching and personal study.','Create additional practice using the Kaizen Worksheet Builder.']:
     assert required in text,(path.name,i,'missing branding or permission',required)
   if 'The completed slope field is shown.' in text:
    assert any(im['x1']-im['x0']>150 and im['bottom']-im['top']>100 for im in p.images),(path.name,i,'slope field separated from answer')
   for ch in p.chars:assert 24<=ch['x0']<=ch['x1']<=p.width-24 and 8<=ch['top']<=ch['bottom']<=p.height-12,(path.name,i,'text bounds',ch['text'])
   for im in p.images:assert im['x0']>=25 and im['x1']<=p.width-25 and im['top']>=45 and im['bottom']<=p.height-40,(path.name,i,'image bounds',im)
   info.append({'pdf':path.name,'page':i,'characters':len(p.chars),'images':len(p.images)})
 prefix=QA/path.stem;subprocess.run(['pdftoppm','-scale-to','380','-png',str(path),str(prefix)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 return info
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for path,result in zip(files,pool.map(check,files)):pages+=result
for id,p in manifest.items():
 stem='ap-'+id.replace('.','-');subprocess.run(['pdftoppm','-f','1','-l','1','-singlefile','-scale-to','850','-png',str(ROOT/p['questions']),str(OUT/'previews'/stem)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 assert p['questionCount']==8 and p['questionPages']==1;assert len(PdfReader(ROOT/p['questions']).pages)==1;assert len(PdfReader(ROOT/p['answers']).pages)==p['answerPages']
 assert hashlib.sha256((ROOT/p['questions']).read_bytes()).hexdigest()==p['questionHash']
 assert hashlib.sha256((ROOT/p['answers']).read_bytes()).hexdigest()==p['answerHash']
thumbs=sorted(QA.glob('*.png'))
for start in range(0,len(thumbs),24):
 sheet=Image.new('RGB',(1200,6*330),'#dfe8e4');draw=ImageDraw.Draw(sheet)
 for i,f in enumerate(thumbs[start:start+24]):
  im=Image.open(f);im.thumbnail((287,305));x=i%4*300+(300-im.width)//2;y=i//4*330+22;sheet.paste(im,(x,y));draw.text((i%4*300+4,i//4*330+3),f.stem[:38],fill='black')
 sheet.save(QA/f'contact-{start//24+1:02d}.jpg')
(ROOT/'data/ap-calculus/pdf-qa.json').write_text(json.dumps({'pdfs':len(files),'pages':len(pages),'checks':'All pages rendered; bounds, notation, pupil/teacher isolation, page counts and hashes checked. Visual contact sheets require review.','errors':errors,'pageDetails':pages},indent=2)+'\n')
print(f'PASS: {len(files)} PDFs / {len(pages)} pages rendered and checked; {len(manifest)} first-page previews.')
