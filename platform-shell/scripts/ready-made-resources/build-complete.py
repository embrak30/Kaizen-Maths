"""Merge existing, unchanged resource PDFs. Run after rebuilding any topic library."""
from pathlib import Path
import json, hashlib, sys
from pypdf import PdfReader, PdfWriter
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'assets/ready-made-complete';OUT.mkdir(exist_ok=True)

def read(path):return json.loads((ROOT/path).read_text())
def records(key):
 if key=='ap-calculus':
  return [dict(id=t['id'],title=t['title'],student=t['pack']['questions'],teacher=t['pack']['answers']) for u in read('data/ap-calculus/catalog.json')['units'] for t in u['topics'] if t.get('pack')]
 if key=='practice-packs':
  return [dict(id=p['id'],title=p['topic']+': '+p['title'],complete=p['pdf']) for p in read('assets/practice-packs/catalog.json')['packs']]
 if key=='further-maths':return read('data/further-maths/edexcel-9fm0/catalog.json')['packs']
 source='data/alevel-maths/edexcel-9ma0/catalog.json' if key=='alevel-maths' else 'data/'+key+'/catalog.json'
 data=read(source)
 return data['packs']+data.get('reviews',[])
TITLES={'primary-packs':'Primary Practice Packs','practice-packs':'Starters & Exit Tickets','gcse-maths':'GCSE Mathematics — Foundation & Higher','precalculus':'U.S. Precalculus','ap-calculus':'AP Calculus — AB & BC','csec-maths':'CSEC Mathematics','ib-maths':'IB Mathematics — AA & AI, SL & HL','alevel-maths':'A level Mathematics','further-maths':'Further Mathematics — Edexcel UK Core Pure'}
selected=set(sys.argv[1:]) or set(TITLES)
assert selected<=set(TITLES),selected
manifest=[b for b in read('assets/ready-made-complete/manifest.json')['collections'] if b['id'] not in selected] if (OUT/'manifest.json').exists() else []
for key,title in TITLES.items():
 if key not in selected:continue
 packs=records(key);writer=PdfWriter();sources=[];parts={}
 # Starter/exit-ticket originals already include their answers. Preserve these layouts.
 roles=['complete'] if key=='practice-packs' else ['student','teacher']
 for role in roles:
  parent=writer.add_outline_item({'student':'Topic Practice','teacher':'Teacher Pack','complete':'Complete topic packs'}[role],len(writer.pages))
  parts[role]={'startPage':len(writer.pages)+1,'pages':0}
  for pack in packs:
   file=ROOT/pack[role];reader=PdfReader(file);start=len(writer.pages)
   writer.append_pages_from_reader(reader);writer.add_outline_item(pack['id']+' — '+pack['title'],start,parent=parent)
   parts[role]['pages']+=len(reader.pages)
   sources.append({'id':pack['id'],'role':role,'path':pack[role],'pages':len(reader.pages),'startPage':start+1,'sha256':hashlib.sha256(file.read_bytes()).hexdigest()})
  print(key,role,parts[role]['pages'],'pages',flush=True)
 writer.add_metadata({'/Title':title+' — Complete','/Author':'Kaizen Mathematics','/Subject':'Topic Practice and Teacher Pack. All topics in this collection.'})
 if hasattr(writer,'compress_identical_objects'):writer.compress_identical_objects(remove_duplicates=True,remove_unreferenced=True)
 file=OUT/(key+'-complete.pdf');writer.write(file);del writer
 check=PdfReader(file);assert len(check.pages)==sum(s['pages'] for s in sources)
 manifest.append({'id':key,'title':title,'path':str(file.relative_to(ROOT)),'topics':len(packs),'pages':len(check.pages),'bytes':file.stat().st_size,'sha256':hashlib.sha256(file.read_bytes()).hexdigest(),'parts':parts,'sources':sources})
 print('Built',file.name,round(file.stat().st_size/1048576,1),'MB',flush=True)
manifest.sort(key=lambda b:list(TITLES).index(b['id']))
(OUT/'manifest.json').write_text(json.dumps({'collections':manifest},indent=2)+'\n')
