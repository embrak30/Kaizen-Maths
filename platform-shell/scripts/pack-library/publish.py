"""Publish verified bounded builds and make compact first-student-page previews."""
import concurrent.futures,json,pathlib,shutil,subprocess
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parents[2]
POPPLER='/Users/barker/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdftoppm'
def publish(p):
 target=ROOT/p['pdf'];target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(ROOT/'output/pdf/library'/target.name,target)
 preview=ROOT/p['preview'];preview.parent.mkdir(parents=True,exist_ok=True)
 subprocess.run([POPPLER,'-f','1','-singlefile','-scale-to','700','-png',str(target),str(preview.with_suffix(''))],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 with Image.open(preview) as im:im.convert('RGB').save(preview,optimize=True)
 return target.stat().st_size+preview.stat().st_size
if __name__=='__main__':
 packs=[]
 for start in [0,100,200,300]:
  batch=json.loads((ROOT/f'tmp/pdfs/library-build-{start}.json').read_text());assert not batch['errors'],batch['errors'];packs+=batch['packs']
 assert len(packs)==362 and len({p['slug'] for p in packs})==362
 catalog_path=ROOT/'assets/practice-packs/catalog.json';catalog=json.loads(catalog_path.read_text());existing=[p for p in catalog['packs'] if p['pdf'].startswith('assets/practice-packs/substitution/')];assert len(existing)==11
 for p in existing:p.update(sourceTool='substitution',category='Algebra',stage='KS3 / GCSE',levelTitle=f"Level {p['level']}",studentPageCount=2,teacherPageCount=1)
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:size=sum(pool.map(publish,packs))
 allpacks=existing+sorted(packs,key=lambda p:(p['category'],p['topic'],str(p['level'])))
 assert len({p['id'] for p in allpacks})==373 and len({p['sourceTool'] for p in allpacks})==110
 catalog_path.write_text(json.dumps({'version':3,'collection':'Standard Practice Generators','branding':'Starter & Exit Ticket Packs','packs':allpacks},indent=2)+'\n')
 source=json.loads((ROOT/'data/practice-packs/library.json').read_text())
 report={'activeGeneratorCount':110,'packCount':373,'newPackCount':362,'newQuestionCount':sum(len(p['questions']) for p in source['packs']),'coveredQuestionTypes':sum(len(p['types']) for p in source['packs']),'newDownloadAndPreviewBytes':size,'coverage':source['coverage']}
 (ROOT/'data/practice-packs/library-coverage.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k!='coverage'},indent=2))
