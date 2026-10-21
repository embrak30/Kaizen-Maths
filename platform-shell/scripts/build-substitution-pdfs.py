"""Build all current packs in the approved printable small-sheet format."""
from pathlib import Path
import json,re,shutil,subprocess
from reportlab.pdfgen import canvas
from pypdf import PdfReader
from PIL import Image
import small_format_packs as layout
ROOT=Path(__file__).resolve().parents[1]
def normalize(s):
 s=re.sub(r'\\(?:big|left|right)','',s).replace('\\cdot','×').replace('−','-')
 return re.sub(r'\\[()[\];,]|\$\$|[\s^{}]','',s)
def build(pack):
 starter,exits=layout.choose(pack);teacher_pages=layout.teacher_blocks(pack,starter,exits);total=2+len(teacher_pages)
 out=ROOT/'output/pdf/substitution'/f"{pack['slug']}.pdf";out.parent.mkdir(parents=True,exist_ok=True)
 c=canvas.Canvas(str(out),pagesize=(layout.W,layout.H),invariant=1)
 c.setTitle('Starter & Exit Ticket Packs | Algebraic Substitution | '+pack['title']+' | '+pack['id']);c.setAuthor('Kaizen Maths')
 layout.draw_students(c,pack,starter,exits)
 for i,page in enumerate(teacher_pages):layout.teacher(c,pack,page,i+3,total);c.showPage()
 c.save();reader=PdfReader(out);assert len(reader.pages)==total
 texts=[normalize(p.extract_text()) for p in reader.pages]
 for q in pack['questions']:
  for field in ['given','expression']:assert normalize(q[field]) in texts[0]+texts[1],(pack['id'],q['number'],field)
  assert normalize(q['answer']) in ''.join(texts[2:]),(pack['id'],q['number'],'answer')
  for step in q['steps']:
   if not step.startswith('No numerical value'):assert normalize(step) in ''.join(texts[2:]),(pack['id'],q['number'],step)
 for q in starter:assert texts[0].count(normalize(q['expression']))>=2
 for _,qs in exits:
  for q in qs:assert texts[1].count(normalize(q['expression']))>=(4 if len(exits)==1 else 2)
 public=ROOT/'assets/practice-packs/substitution'/out.name;shutil.copyfile(out,public)
 preview=ROOT/'assets/practice-packs/substitution/previews'/f"{pack['slug']}.png"
 scratch=ROOT/'tmp/pdfs/preview-build';scratch.mkdir(parents=True,exist_ok=True)
 poppler=shutil.which('pdftoppm') or '/Users/barker/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdftoppm'
 subprocess.run([poppler,'-f','1','-singlefile','-scale-to','1400','-png',str(out),str(scratch/pack['slug'])],check=True,capture_output=True)
 with Image.open(scratch/f"{pack['slug']}.png") as image:image.thumbnail((620,878));image.save(preview)
 return {k:pack[k] for k in ['id','slug','title','topic','level','kind','description','version','types']}|{'estimatedMinutes':8 if pack['level']>=3 else 5,'questionCount':len(pack['questions']),'starterQuestionCount':4,'exitQuestionCount':len(exits[0][1]),'exitVariantCount':len(exits),'format':'half-page starters / quarter-page exit tickets','pageCount':total,'pdf':str(public.relative_to(ROOT)),'preview':str(preview.relative_to(ROOT)),'sections':['Starters','Exit tickets','Teacher answers and worked solutions']}
if __name__=='__main__':
 data=json.loads((ROOT/'data/practice-packs/substitution.json').read_text());catalog={'version':2,'collection':'Algebraic Substitution','branding':'Starter & Exit Ticket Packs','packs':[build(p) for p in data['packs']]}
 (ROOT/'assets/practice-packs/catalog.json').write_text(json.dumps(catalog,indent=2)+'\n');print(f"Built {len(catalog['packs'])} small-format PDFs ({sum(p['pageCount'] for p in catalog['packs'])} pages). All source questions, answers and worked steps retained.")
