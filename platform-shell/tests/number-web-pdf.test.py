from pathlib import Path
import json,math,subprocess,os
import pdfplumber
from pypdf import PdfReader
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[1]/'tmp/pdfs/number-web-review'
# The bundled Poppler needs an explicit local font config for the PDF base fonts on macOS.
env=os.environ.copy()
if Path('/System/Library/Fonts/Supplemental').is_dir() and not env.get('FONTCONFIG_FILE'):
 cache=root/'font-cache';cache.mkdir(exist_ok=True)
 config=root/'fonts.conf';config.write_text('<?xml version="1.0"?><fontconfig><dir>/System/Library/Fonts/Supplemental</dir><cachedir>'+str(cache)+'</cachedir></fontconfig>')
 env['FONTCONFIG_FILE']=str(config)

for datafile in root.glob('*.json'):
 p=json.loads(datafile.read_text());file=datafile.with_suffix('.pdf');r=PdfReader(file);assert len(r.pages)==2
 with pdfplumber.open(file) as pdf:
  for pageindex,page in enumerate(pdf.pages):
   assert abs(page.width-595.276)<.01 and abs(page.height-841.89)<.01
   for char in page.chars:assert 25<=char['x0']<=char['x1']<=page.width-25 and 12<=char['top']<=char['bottom']<=page.height-12,(p['level'],pageindex,char)
   for i,branch in enumerate(p['branches']):
    angle=(-90+i*360/len(p['branches']))*math.pi/180;positions=[(500+220*math.cos(angle),500+220*math.sin(angle)),(500+410*math.cos(angle-math.pi/15),500+410*math.sin(angle-math.pi/15)),(500+410*math.cos(angle+math.pi/15),500+410*math.sin(angle+math.pi/15))]
    for j,(x,y) in enumerate(positions):
     px=40+x*.515;py=160+y*.515
     text=page.within_bbox((px-23,py-25,px+23,py+25)).extract_text() or ''
     if pageindex==0 and j==branch['missing']:assert not text,(p['level'],i,j,text)
     else:
      value=branch['values'][j]/p['scale'];expected=str(int(value)) if value==int(value) else str(value)
      assert text.split('\n')[0]==expected,(p['level'],pageindex,i,j,expected,text)
 subprocess.run(['pdftoppm','-scale-to','900','-png',str(file),str(root/datafile.stem)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE,env=env,timeout=30)
 print('Verified PDF numbers and blanks:',p['level'])
for n in [1,2]:
 files=sorted(root.glob('*-'+str(n)+'.png'));sheet=Image.new('RGB',(1200,1160),'#dce7e4');draw=ImageDraw.Draw(sheet)
 for i,file in enumerate(files):
  im=Image.open(file);im.thumbnail((380,530));x=i%3*400;y=i//3*580;sheet.paste(im,(x+(400-im.width)//2,y+25));draw.text((x+8,y+5),file.stem,fill='black')
 sheet.save(root/('contact-'+str(n)+'.jpg'))
assert len(PdfReader(root/'puzzle-only.pdf').pages)==1
