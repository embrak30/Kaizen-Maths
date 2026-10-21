import pathlib,json,concurrent.futures,subprocess
from PIL import Image,ImageDraw
root=pathlib.Path(__file__).resolve().parents[2];out=root/'tmp/pdfs/library-qa';out.mkdir(exist_ok=True)
pop='/Users/barker/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdftoppm'
packs=sum([json.loads((root/f'tmp/pdfs/library-build-{s}.json').read_text())['packs'] for s in [0,100,200,300]],[])
# Render every page to prove the embedded assets are valid. Save compact student+teacher contact sheets.
def render(p):
 prefix=out/p['slug'];subprocess.run([pop,'-scale-to','360','-png',str(root/'output/pdf/library'/(p['slug']+'.pdf')),str(prefix)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 files=sorted(out.glob(p['slug']+'-*.png'));assert len(files)==p['pageCount'];return p,files
results=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for i,result in enumerate(pool.map(render,packs)):
  results.append(result)
  if (i+1)%50==0:print('Rendered',i+1,flush=True)
for start in range(0,len(results),12):
 group=results[start:start+12];sheet=Image.new('RGB',(1200,6*390),'#dddddd');draw=ImageDraw.Draw(sheet)
 for i,(p,files) in enumerate(group):
  for j,index in enumerate([0,p['studentPageCount']]):
   x=(i%2)*600+j*300;y=(i//2)*390;im=Image.open(files[index]).convert('RGB');im.thumbnail((292,350));sheet.paste(im,(x,y+30));draw.text((x+4,y+3),p['slug'][:43],fill='black');draw.text((x+4,y+15),'Student' if j==0 else 'Teacher',fill='black')
 sheet.save(out/f'contact-{start:03}.jpg',quality=85)
print('PASS',len(results),'PDFs,',sum(len(f) for _,f in results),'pages rendered. Contact sheets:',out,flush=True)
