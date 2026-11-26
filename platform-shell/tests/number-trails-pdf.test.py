"""Verify exported numbers, empty question circles, vector content and page bounds."""
from pathlib import Path
import json,os,subprocess,shutil
import pdfplumber
from pypdf import PdfReader
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'tmp/pdfs/number-trails-review';OUT.mkdir(parents=True,exist_ok=True)
node=os.environ.get('KAIZEN_NODE',str(Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node'))
subprocess.run([node,'-e',r"const fs=require('node:fs'),M=require('./tools/number-trails/model.js'),P=require('./tools/number-trails/pdf.js');for(const [level,start]of [['first',6],['mixed',24],['challenge',-450]]){const p=M.generate(level,7827,start),out='tmp/pdfs/number-trails-review/'+level;fs.writeFileSync(out+'.json',JSON.stringify(p));fs.writeFileSync(out+'.pdf',P.bytes(p,true));}fs.writeFileSync('tmp/pdfs/number-trails-review/question-only.pdf',P.bytes(M.generate('mixed',4432)));"],cwd=ROOT,check=True)
env=os.environ.copy();cache=OUT/'font-cache';cache.mkdir(exist_ok=True);conf=OUT/'fonts.conf';conf.write_text('<?xml version="1.0"?><fontconfig><dir>/System/Library/Fonts/Supplemental</dir><cachedir>'+str(cache)+'</cachedir></fontconfig>');env['FONTCONFIG_FILE']=str(conf)
poppler=shutil.which('pdftoppm') or str(Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/poppler/bin/pdftoppm')
points=[(130,100),(350,100),(570,100),(790,100),(130,320),(350,320),(570,320),(790,320),(130,540),(350,540),(570,540),(790,540)];k=(595.276-145)/645;ox=(841.89-920*k)/2
for file in sorted(OUT.glob('*.json')):
 data=json.loads(file.read_text());pdf=file.with_suffix('.pdf');reader=PdfReader(pdf);assert len(reader.pages)==2
 with pdfplumber.open(pdf) as doc:
  for pageindex,page in enumerate(doc.pages):
   assert abs(page.width-841.89)<.01 and abs(page.height-595.276)<.01
   assert not page.images,'Export must use vector geometry, not a screenshot'
   assert not page.annots,'No interactive controls should enter the PDF'
   for ch in page.chars:assert 30<=ch['x0']<=ch['x1']<=page.width-30 and 10<=ch['top']<=ch['bottom']<=page.height-10,(file,ch)
   for i,(x,y) in enumerate(points):
    cx=ox+x*k;cy=102+y*k;text=page.within_bbox((cx-34,cy-24,cx+34,cy+24)).extract_text() or ''
    assert text==(str(data['values'][i]) if i==0 or pageindex==1 else ''),(file,i,pageindex,text)
    for ch in page.within_bbox((cx-34,cy-24,cx+34,cy+24)).chars:assert ch['size']>=24
   assert len(page.curves)>=12
 subprocess.run([poppler,'-scale-to','1400','-png',str(pdf),str(OUT/file.stem)],check=True,env=env,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
assert len(PdfReader(OUT/'question-only.pdf').pages)==1
for page in [1,2]:
 images=sorted(OUT.glob('*-'+str(page)+'.png'));sheet=Image.new('RGB',(1200,900),'#dce7e4');draw=ImageDraw.Draw(sheet)
 for i,file in enumerate(images):
  image=Image.open(file);image.thumbnail((580,410));x=(i%2)*600;y=(i//2)*450;sheet.paste(image,(x+10,y+25));draw.text((x+10,y+5),file.stem,fill='black')
 sheet.save(OUT/f'contact-{page}.jpg')
print('PASS: three levels, six rendered A4 landscape pages, all numbers and blank circles, 24pt+ diagram numbers, vector-only content, page bounds and question-only download.')
