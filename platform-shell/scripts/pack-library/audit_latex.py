"""Scan every published PDF page and prepared print block for leaked math markup."""
import pathlib,json,re,hashlib,sys,html
from pypdf import PdfReader
ROOT=pathlib.Path(__file__).resolve().parents[2]
PATTERNS={'latex-command':r'\\[A-Za-z]+','latex-delimiter':r'\\[()\[\]]|\$\$','raw-exponent':r'\^','html-markup':r'</?(?:span|div|sup|sub|br|table)\b|&(?:nbsp|lt|gt|amp);','broken-glyph':r'\ufffd|\u25a0|\x00','unresolved-value':r'\bNaN\b|=\s*(?:undefined|null)\b','math-dollar':r'\$(?!\d[\d,.]*(?:\b|[.]))'}
def findings(text,where):
 out=[]
 for kind,pattern in PATTERNS.items():
  for m in re.finditer(pattern,text):out.append(where|{'kind':kind,'context':text[max(0,m.start()-55):m.end()+85]})
 return out
if __name__=='__main__':
 catalog=json.loads((ROOT/'assets/practice-packs/catalog.json').read_text());issues=[];pages=0;files=[]
 packs=list(catalog['packs']);known={p['pdf'] for p in packs};extra=[p for p in (ROOT/'assets').rglob('*.pdf') if str(p.relative_to(ROOT)) not in known]
 packs += [{'slug':'other-'+p.stem,'pdf':str(p.relative_to(ROOT))} for p in extra]
 for i,pack in enumerate(packs):
  path=ROOT/pack['pdf'];reader=PdfReader(path);pages+=len(reader.pages)
  for number,page in enumerate(reader.pages,1):issues+=findings(page.extract_text(),{'slug':pack['slug'],'page':number})
  files.append({'slug':pack['slug'],'pages':len(reader.pages),'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
  if (i+1)%100==0:print(f"Scanned {i+1}/{len(packs)} PDFs",flush=True)
 prepared=ROOT/'tmp/pdfs/library-prepared.json';blocks=0
 if prepared.exists():
  source=json.loads(prepared.read_text());assert not source['renderErrors']
  for pack in source['packs']:
   for q in pack['questions']:
    for section,items in q['print'].items():
     for item in items:
      strings=[item['html']] if item['kind']=='paragraph' else sum(item['rows'],[]) if item['kind']=='table' else [item.get('alt','')]
      for text in strings:
       text=re.sub(r'<img[^>]*>','',text);blocks+=1
       # ReportLab superscript/subscript tags are expected print markup.
       text=re.sub(r'<[^>]+>','',text)
       issues+=findings(html.unescape(text),{'slug':pack['slug'],'question':q['number'],'section':section})
 report={'practicePackCount':len(catalog['packs']),'otherPublicPdfCount':len(extra),'pdfCount':len(files),'pageCount':pages,'preparedBlocksChecked':blocks,'findings':issues,'files':files}
 target=ROOT/'data/practice-packs/latex-audit.json';target.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k!='files'},indent=2));sys.exit(bool(issues))
