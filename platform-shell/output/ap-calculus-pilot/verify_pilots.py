"""Independent numerical and artifact checks for the AP review packets."""
from fractions import Fraction as F
import math,json,re
from pathlib import Path
from pypdf import PdfReader
import pdfplumber
from build_pilots import ROOT,P11,P45
# Independent arithmetic for all twenty question answers.
assert F(100-180,7-3)==-20
assert F(300,8)==F(75,2) and F(120,2)==F(300-120,8-5)==60
assert F(602,100)-6==F(2,100) # 1.1/3: nonzero interval length
assert (F(70)-F('67.85'))/F('.1')==F('21.5')
assert (F('72.25')-70)/F('.1')==F('22.5')
assert F(80,2)==40 and F(40,2)==20
assert (500-F('500.99'))/F('.1')==F('-9.9')
assert (F('498.99')-500)/F('.1')==F('-10.1')
assert F(3-3,4-2)==0
assert F('5.01')-5==F('.01') # 1.1/8 selected interval
assert F(30-14,6-2)==4
f=lambda t:4*t+6;g=lambda t:4*t+6+(t-2)*(t-6)
assert g(2)==f(2)==14 and g(6)==f(6)==30
assert (g(F('3.01'))-g(F('2.99')))/F('.02')==2 # Different local rate with same endpoints.
assert (F('10.41')-10)/F('.1')==F('4.1')
assert (F('10.0401')-10)/F('.01')==F('4.01')
# 4.5: product, square, sphere coefficient, ladder, carts, cone, angle, shadow, cylinder, rectangle.
assert 3*(2*(-1)+5*4)==54
assert F(48,2*12)==2
assert 4*6**2*F(1,2)==72
assert math.isclose(math.sqrt(13**2-5**2),12)
assert -F(5,12)*F(3,5)==F(-1,4)
assert F(30*(-3)+40*4,50)==F(7,5)
assert F(5,10)==F(1,2) and F(3,6**2/F(4))==F(1,3) # Divide out pi from cone volume rate.
assert F(2,40)/(1+F(30,40)**2)==F(4,125)
shadow=F(3,2)/(6-F(3,2))*2
assert shadow==F(2,3) and 2+shadow==F(8,3)
assert F(200,2*10*5)==2
width_rate=-F(8,12)*F(1,2)
assert width_rate==F(-1,3) and 2*(F(1,2)+width_rate)==F(1,3)
assert sum(q['marks'] for q in P11)==28 and sum(q['marks'] for q in P45)==40
files={'ap-calculus-1-1-pilot.pdf':(16,P11),'ap-calculus-4-5-pilot.pdf':(18,P45)}
for filename,(pages,bank) in files.items():
 reader=PdfReader(ROOT/'output/pdf'/filename);assert len(reader.pages)==pages
 for i in range(5):
  independent=reader.pages[i].extract_text();supported=reader.pages[i+5].extract_text()
  assert 'Independent' in independent and 'Supported' in supported
  assert 'Support:' not in independent and 'Support:' in supported
  for q in bank[2*i:2*i+2]:
   assert q['title'] in independent and q['title'] in supported
   norm=lambda s: re.sub(r'\s+',' ',s).strip()
   for prompt in q['prompt']:
    assert norm(prompt) in norm(independent),(filename,q['n'],'independent prompt')
    assert norm(prompt) in norm(supported),(filename,q['n'],'supported prompt')
 # No glyph substitutions, LaTeX carryover, or math-rendering source tokens.
 text='\n'.join(pg.extract_text() for pg in reader.pages)
 assert not any(x in text for x in ['[[',']]', '\\frac','<super>', '\ufffd','\u25a0'])
 assert 'Teacher answer key' in reader.pages[10].extract_text()
 assert 'Worked solutions' in reader.pages[11].extract_text()
 with pdfplumber.open(ROOT/'output/pdf'/filename) as pdf:
  for pi,pg in enumerate(pdf.pages,1):
   for ch in pg.chars:
    assert ch['x0']>=30 and ch['x1']<=pg.width-30,(filename,pi,ch['text'],'horizontal overflow')
    assert ch['top']>=10 and ch['bottom']<=pg.height-15,(filename,pi,ch['text'],'vertical overflow')
# Full topic map, scope boundaries and real tool links.
m=json.loads((ROOT/'output/ap-calculus-pilot/topic-map.json').read_text());rows=[r for u in m['units'] for r in u['rows']]
assert len(rows)==len({r['code'] for r in rows})==111
assert sum(r['scope']=='AB + BC' for r in rows)==81
assert {r['code'] for r in rows if r['scope']=='BC only' and int(r['code'].split('.')[0])<9}=={'6.11','6.12','6.13','7.5','7.9','8.13'}
app=(ROOT/'app.js').read_text()
for _,slug in m['toolDirectory'].values():assert 'slug: "'+slug+'"' in app,slug
assert len(PdfReader(ROOT/'output/pdf/ap-calculus-topic-map.pdf').pages)==13
print('PASS: 20 numerical/problem checks, mark totals, matching-version titles, 34 pilot pages, glyphs, text bounds, 111 topic entries, AB/BC boundaries and real tool links.')
