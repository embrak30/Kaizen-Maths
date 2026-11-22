"""Independent arithmetic, provenance, print bounds and all-page rendering for FNR01."""
from pathlib import Path
from collections import Counter
from fractions import Fraction
from decimal import Decimal
from math import gcd,isqrt
import json,re,hashlib,subprocess
import pdfplumber
from pypdf import PdfReader
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[2];D=ROOT/'data/gcse-maths';p=json.loads((D/'number-revision-pilot.json').read_text())['packs'][0];r=json.loads((D/'revision-catalog.json').read_text())[0]
source={p['id']:p for p in json.loads((D/'library.json').read_text())['packs']}
assert Counter(q['sourceTopic'] for q in p['questions'])==Counter({f'N{i:02}':3 for i in range(1,9)})
assert [q['number'] for q in p['questions']]==list(range(1,25));assert len({(q['sourceTopic'],q['sourceQuestion']) for q in p['questions']})==24
expected={
'N01:1':Fraction(16,4),'N01:8':4+5*3-8,'N01:2':-6+6*(-3)-(-8),
'N02:6':Fraction(3,4)-Fraction(1,4),'N02:3':Fraction(2,6)*Fraction(3,7),'N02:4':Fraction(3,6)/Fraction(8,9),
'N03:2':Decimal('4.6')*Decimal('.01'),'N03:3':Decimal('39.3')/6,'N03:4':Decimal('70.4')-Decimal('41.573'),
'N04:1':Decimal(55)/100,'N04:5':Fraction(40,100),'N04:3':Decimal('.75')*100,
'N05:1':Fraction(2,3)*36,'N05:7':24/Fraction(3,5),'N05:8':Fraction(80,4),
'N06:6':Decimal(40)/100*278,'N06:2':Decimal(24)/100*352,'N06:4':Decimal(19)/100*719,
'N07:5':gcd(16,24),'N08:1':2**5,'N08:8':1/Fraction(2,3)}
def number(s):
 m=re.search(r'class="numerator">(\d+)</span>.*?class="denominator">(\d+)</span>',s)
 if not m:m=re.search(r'\\frac\{(\d+)\}\{(\d+)\}',s)
 if m:return Fraction(int(m[1]),int(m[2]))
 s=re.sub('<[^>]+>','',s);m=re.search(r'-?\d+(?:\.\d+)?',s);assert m,s;return Fraction(m[0])
for q in p['questions']:
 old=source[q['sourceTopic']]['questions'][q['sourceQuestion']-1];assert q['answer']==old['answer'];assert q['marks']==old['marks'];assert q['marks']==sum(int(re.search(r'\[(\d+)\]',s)[1]) for s in q['criteria']);key=q['sourceTopic']+':'+str(q['sourceQuestion'])
 if key in expected:assert number(q['answer'])==Fraction(expected[key]),(key,q['answer'])
 elif key=='N07:7':assert q['answer']==r'\(2^3\times3^2\)' and 2**3*3**2==72
 elif key=='N07:8':assert q['answer']=='12:00:36.' and 12*18//gcd(12,18)==36
 elif key=='N08:7':assert q['answer']=='8 and 9.' and isqrt(70)==8 and 8**2<70<9**2
 else:raise AssertionError('Missing independent check '+key)
assert sum(q['marks'] for q in p['questions'])==r['marks']==42
out=ROOT/'tmp/pdfs/gcse-revision-review';out.mkdir(parents=True,exist_ok=True)
for role,expected_pages in [('student',2),('teacher',4)]:
 f=ROOT/r[role];assert len(PdfReader(f).pages)==r[role+'Pages']==expected_pages;assert hashlib.sha256(f.read_bytes()).hexdigest()==r[role+'Hash'];alltext=''
 with pdfplumber.open(f) as pdf:
  for n,page in enumerate(pdf.pages,1):
   text=page.extract_text() or '';alltext+='\n'+text;assert not re.search(r'\\[A-Za-z]+|\$|\^|\ufffd|\bNaN\b|\u25a0',text)
   for c in page.chars:assert 24<=c['x0']<=c['x1']<=page.width-24 and 8<=c['top']<=c['bottom']<=page.height-12,(role,n,'text',c)
   for im in page.images:assert im['x0']>=25 and im['x1']<=page.width-25 and im['top']>=45 and im['bottom']<=page.height-40,(role,n,'image',im)
  assert 'Permission granted to print and copy for classroom teaching and personal study.' in alltext
  if role=='teacher':assert set(map(int,re.findall(r'Question (\d+)\b',alltext)))==set(range(1,25));assert all(t in alltext for t in r['topicIds'])
  else:assert 'Suggested award' not in alltext
 for old in out.glob(role+'-*.png'):old.unlink()
 subprocess.run(['pdftoppm','-scale-to','1200','-png',str(f),str(out/role)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 files=sorted(out.glob(role+'-*.png'));sheet=Image.new('RGB',(1600,1180 if role=='student' else 2360),'#e3ebe8');draw=ImageDraw.Draw(sheet)
 # Three student pages across; four teacher pages in a 2x2 contact sheet.
 if role=='student':sheet=Image.new('RGB',(800*len(files),1180),'#e3ebe8');draw=ImageDraw.Draw(sheet)
 for i,file in enumerate(files):
  im=Image.open(file);im.thumbnail((780,1120));x=(i if role=='student' else i%2)*800+(800-im.width)//2;y=(0 if role=='student' else i//2)*1180+30;sheet.paste(im,(x,y));draw.text((x,y-20),role+' page '+str(i+1),fill='black')
 sheet.save(out/(role+'-contact.jpg'))
report={'id':r['id'],'questions':24,'topics':8,'questionsPerTopic':3,'marks':42,'studentPages':2,'teacherPages':4,'checks':['24 independently checked answers','Source question and answer provenance','Mark totals','Every page rendered','Text and equation bounds','No unrendered notation','Student/teacher separation','Content hashes'],'errors':[]};(D/'revision-qa.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
