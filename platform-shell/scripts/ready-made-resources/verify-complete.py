"""Ensure every complete download preserves every source page, in order."""
from pathlib import Path
import json, hashlib, subprocess
from pypdf import PdfReader
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'assets/ready-made-complete';review=ROOT/'tmp/pdfs/complete-review';review.mkdir(parents=True,exist_ok=True)
manifest=json.loads((OUT/'manifest.json').read_text());total=0;images=[]
for bundle in manifest['collections']:
 file=ROOT/bundle['path'];assert hashlib.sha256(file.read_bytes()).hexdigest()==bundle['sha256'];reader=PdfReader(file);assert len(reader.pages)==bundle['pages'];count=0
 for source in bundle['sources']:
  src=ROOT/source['path'];assert hashlib.sha256(src.read_bytes()).hexdigest()==source['sha256'];original=PdfReader(src);assert len(original.pages)==source['pages']
  assert source['startPage']==count+1
  for a in original.pages:
   b=reader.pages[count];assert a.mediabox==b.mediabox and a.cropbox==b.cropbox
   assert a.get_contents().get_data()==b.get_contents().get_data(),(bundle['id'],source['id'],count)
   count+=1
 assert count==bundle['pages'];total+=count
 for role,part in bundle['parts'].items():
  assert part['pages']>0;page=part['startPage'];prefix=review/(bundle['id']+'-'+role)
  subprocess.run(['pdftoppm','-f',str(page),'-l',str(page),'-singlefile','-scale-to','800','-png',str(file),str(prefix)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE);images.append(prefix.with_suffix('.png'))
 print('Verified',bundle['id'],count,'pages',flush=True)
for start in range(0,len(images),8):
 sheet=Image.new('RGB',(1200,850),'#dce7e4');draw=ImageDraw.Draw(sheet)
 for i,path in enumerate(images[start:start+8]):
  image=Image.open(path);image.thumbnail((280,395));x=(i%4)*300;y=(i//4)*425;draw.text((x+5,y+3),path.stem,fill='black');sheet.paste(image,(x+(300-image.width)//2,y+20))
 sheet.save(review/('contact-'+str(start//8+1)+'.jpg'))
(OUT/'qa.json').write_text(json.dumps({'collections':len(manifest['collections']),'pagesVerified':total,'checks':['Every source file hash','Every page content stream unchanged','Page order and section boundaries','Media and crop boxes','Collection file hashes','Section starts rendered for visual review'],'errors':[]},indent=2)+'\n')
