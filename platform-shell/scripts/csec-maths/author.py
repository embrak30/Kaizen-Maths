"""Original Kaizen CSEC topic worksheets for examinations from May–June 2027."""
from pathlib import Path
import json,copy,math,re,sys,os
sys.path.insert(0,os.environ.get('KAIZEN_AP_PYTHON_MODULES','/tmp/kaizen-ap-python'))
import sympy as S
ROOT=Path(__file__).resolve().parents[2];D=ROOT/'data/csec-maths';D.mkdir(exist_ok=True,parents=True)
source={key:{p['id']:p for p in json.loads((ROOT/path).read_text())['packs']} for key,path in {'g':'data/gcse-maths/library.json','i':'data/ib-maths/library.json'}.items()};packs=[];checks=[]
def m(v):return r'\('+(S.latex(v) if not isinstance(v,str) else v)+r'\)'
def q(prompt,answer,steps,marks=3):return dict(question=prompt,questionText=prompt,answer=answer,steps=steps,marks=marks,criteria=['M1: Correct setup [1].']+['M1: Correct intermediate working [1].']*(marks-2)+['A1: Correct result and required interpretation [1].'],origin='authored-csec')
def add(module,area,title,questions,tool=None,stimulus='',provenance=None,sourceTool='limits-first-principles'):
 id='M'+str(module)+'-'+str(sum(p['module']==module for p in packs)+1).zfill(2);assert len(questions)==8,(title,len(questions));questions=copy.deepcopy(questions)
 for i,v in enumerate(questions,1):v['number']=i;v.setdefault('questionText',v['question']);assert v['steps'] and v['answer']
 packs.append(dict(id=id,module=module,area=area,title=title,questions=questions,tools=[tool] if tool else [],sourceTool=sourceTool,stimulus=stimulus,provenance=provenance or {'kind':'original-csec'},instructions='Answer on separate paper. Show your working. Use a calculator where appropriate. Give exact answers unless a rounding instruction is stated.'))
 return packs[-1]
def reuse(module,area,ids,key='g'):
 for id in ids.split():
  p=source[key][id];add(module,area,p['title'],p['questions'],(p.get('tools') or [None])[0],p.get('stimulus',''),{'kind':'kaizen-reuse','library':key,'id':id},p['sourceTool'])
reuse(1,'Number Theory & Computation','N01 N02 N03 N04 N05 N06 N07 N08 N10 N11 N15 A11 R01 R02 R04')
reuse(1,'Consumer Arithmetic','R07 R08 R09')
reuse(1,'Sets','P04')
reuse(1,'Measurement','R05 R06 G09 G10 G11 G12 G13 G14 G15 G16')
reuse(1,'Algebra 1','A01 A02 A03 A04 A07 A08 A09')
reuse(1,'Introduction to Graphs','A13')
reuse(2,'Relations, Functions & Graphs 1','A12')
reuse(2,'Algebra 2','N09 A05 A06 A16 A17 A19 A28 A29 R10 R11')
reuse(2,'Relations, Functions & Graphs 1','A14 A15 A18 A20')
reuse(2,'Geometry & Trigonometry 1','G01 G02 G03 G04 G05 G18 G19 G21 G22 G24 G29')
reuse(2,'Statistics 1','S01 S02 S04 S05 S11 P01 P03')
reuse(2,'Vectors & Matrices 1','G27')
reuse(3,'Statistics 2','S03 S06 S09 P02 P05')
reuse(3,'Relations, Functions & Graphs 2','A10 A30 A32')
reuse(3,'Geometry & Trigonometry 2','G06 G07 G08 G20 G25 G26')
reuse(3,'Vectors & Matrices 2','G28')
reuse(3,'Vectors & Matrices 2','N19 N20','i')
# Consumer arithmetic uses stated illustrative rates, never current tax or tariff claims.
a=[]
for item,cost,rate,kind in [('school bag',2400,15,'discount'),('desk',18000,10,'markup'),('calculator',4500,12,'sales tax'),('shoes',6500,20,'discount'),('bicycle',24000,25,'profit'),('printer',15000,8,'sales tax'),('phone',30000,15,'loss'),('table',12000,30,'markup')]:
 change=cost*rate/100;result=cost+change if kind in ['markup','sales tax','profit'] else cost-change
 a.append(q(f'A {item} has a price or cost of JMD {cost:,}. Apply a {rate}% {kind}. Find the final selling price or total payment.',f'JMD {result:,.2f}.',[f'The {kind} amount is {rate}/100 × {cost} = {change:g}.',('Add' if result>cost else 'Subtract')+f' this amount to/from the original JMD {cost:,}.',f'The resulting price is JMD {result:,.2f}.']))
add(1,'Consumer Arithmetic','Discount, markup, profit, loss and sales tax',a,'financial-real-life-maths')
a=[]
for cost,sell in [(800,1000),(2500,2200),(15000,18000),(6400,7200),(1200,900),(5000,5750),(18000,16200),(3200,4000)]:
 diff=sell-cost;rate=100*abs(diff)/cost
 a.append(q(f'An item costs JMD {cost:,} and sells for JMD {sell:,}. State the profit or loss and its percentage of cost (2 d.p.).',f'{"Profit" if diff>0 else "Loss"} JMD {abs(diff):,.2f}; {rate:.2f}%.',[f'Change = selling price − cost price = {diff}.','Use the cost price as the percentage base.',m(f'\\frac{{{abs(diff)}}}{{{cost}}}\\times100')+f' = {rate:.2f}%.']))
add(1,'Consumer Arithmetic','Percentage profit and loss',a,'financial-real-life-maths')
a=[]
for item,cash,deposit,months,payment in [('fridge',80000,12000,12,6500),('laptop',120000,20000,10,11500),('sofa',90000,15000,18,5000),('washer',70000,10000,12,5500),('stove',60000,15000,10,5000),('bed',100000,20000,16,6000),('phone',50000,10000,12,4000),('television',75000,15000,15,4500)]:
 total=deposit+months*payment;extra=total-cash
 a.append(q(f'A {item} costs JMD {cash:,} cash, or a JMD {deposit:,} deposit plus {months} monthly payments of JMD {payment:,}. Find the hire-purchase total and extra cost.',f'JMD {total:,}; extra JMD {extra:,}.',[f'Instalments total {months} × {payment} = {months*payment}.',f'Add the deposit: {deposit} + {months*payment} = {total}.',f'Compare with the cash price: {total} − {cash} = {extra}.']))
add(1,'Consumer Arithmetic','Hire purchase and instalments',a,'financial-real-life-maths')
a=[]
for principal,rate,years in [(10000,5,3),(25000,4,2),(60000,6,4),(8000,8,5),(15000,7,2),(40000,3,6),(5000,9,3),(120000,5.5,2)]:
 interest=principal*rate*years/100
 a.append(q(f'JMD {principal:,} earns {rate}% simple interest per year for {years} years. Find the interest and final amount.',f'Interest JMD {interest:,.2f}; amount JMD {principal+interest:,.2f}.',[m(r'I=\frac{Prt}{100}')+'.',f'I = {principal} × {rate} × {years} / 100 = {interest:g}.','Add the interest to the original principal.']))
add(1,'Consumer Arithmetic','Simple interest',a,'financial-real-life-maths')
a=[]
for hours,rate,extra,mult in [(40,800,5,1.5),(35,1000,4,2),(40,650,8,1.5),(36,900,6,1.5),(40,1200,3,2),(30,750,5,1.5),(40,850,7,1.5),(38,1100,4,2)]:
 basic=hours*rate;over=extra*rate*mult
 a.append(q(f'A worker earns JMD {rate:,}/hour for {hours} ordinary hours and works {extra} overtime hours at {mult:g} times that rate. Find the gross pay.',f'JMD {basic+over:,.2f}.',[f'Ordinary pay = {hours} × {rate} = {basic}.',f'Overtime pay = {extra} × {mult:g} × {rate} = {over:g}.',f'Add the two amounts: JMD {basic+over:,.2f}.']))
add(1,'Consumer Arithmetic','Wages and overtime',a,'financial-real-life-maths')
a=[]
for gross,allowance,rate,fixed in [(80000,20000,15,2500),(120000,30000,20,4000),(95000,25000,10,3000),(160000,40000,25,5000),(70000,20000,12,1500),(140000,35000,18,4500),(110000,30000,15,3500),(180000,50000,20,6000)]:
 tax=(gross-allowance)*rate/100;net=gross-tax-fixed
 a.append(q(f'In an illustrative monthly pay scheme, gross pay is JMD {gross:,}, allowance JMD {allowance:,}, tax {rate}% on the excess, and other deductions JMD {fixed:,}. Find net pay.',f'JMD {net:,.2f}.',[f'Taxable pay = {gross} − {allowance} = {gross-allowance}.',f'Tax = {rate}% of {gross-allowance} = {tax:g}.',f'Net pay = {gross} − {tax:g} − {fixed} = {net:g}.']))
add(1,'Consumer Arithmetic','Income tax and net pay',a,'financial-real-life-maths')
a=[]
for units,limit,rate1,rate2,fixed in [(180,100,25,30,800),(240,150,20,28,600),(320,200,22,32,900),(150,80,24,29,700),(280,180,21,31,850),(210,120,26,34,750),(350,250,23,30,1000),(170,90,27,35,650)]:
 total=limit*rate1+(units-limit)*rate2+fixed
 a.append(q(f'An illustrative electricity tariff charges JMD {fixed} fixed, JMD {rate1}/unit for the first {limit} units and JMD {rate2}/unit thereafter. Find the bill for {units} units.',f'JMD {total:,.2f}.',[f'The first block costs {limit} × {rate1} = {limit*rate1}.',f'The remaining {units-limit} units cost {(units-limit)*rate2}.',f'Add both blocks and the fixed charge: {total}.']))
add(1,'Consumer Arithmetic','Utility bills and tiered tariffs',a,'financial-real-life-maths')
a=[]
for local,fx,fee in [(32000,160,500),(48000,160,800),(75000,150,1000),(60000,150,750),(90000,150,1500),(25000,125,500),(100000,160,1200),(56000,140,600)]:
 foreign=(local-fee)/fx
 a.append(q(f'An illustrative exchange rate is JMD {fx} per USD. A traveller has JMD {local:,}; a JMD {fee} fee is deducted first. How many USD can be bought (2 d.p.)?',f'USD {foreign:,.2f}.',[f'Amount available = {local} − {fee} = {local-fee}.',f'Divide local currency by {fx} JMD per USD.',f'Result = USD {foreign:,.2f}; the stated rates are for this question only.']))
add(1,'Consumer Arithmetic','Currency conversion and fees',a,'ratio-proportion')
a=[]
for value,rate,excess in [(1500000,2,25000),(2400000,1.5,30000),(800000,3,20000),(3500000,2.5,50000),(1200000,1.8,15000),(2000000,2.2,40000),(600000,4,10000),(4000000,1.2,60000)]:
 premium=value*rate/100
 a.append(q(f'An illustrative policy charges an annual premium of {rate}% of an insured value JMD {value:,}. Find the premium. A covered claim of JMD {excess+50000:,} has excess JMD {excess:,}; find the payout.',f'Premium JMD {premium:,.2f}; payout JMD 50,000.',[f'Premium = {rate}/100 × {value} = {premium:g}.',f'The excess is the part of a covered claim paid by the policyholder.',f'Payout = {excess+50000} − {excess} = 50000.']))
add(1,'Consumer Arithmetic','Insurance premiums and excesses',a,'financial-real-life-maths')
# Set notation and relations.
a=[]
for k in range(1,9):
 a.append(q(f'Let U = {{1,2,…,{k+5}}}, A = {{1,2,{k+3}}} and B = {{2,{k+3},{k+4}}}. List A ∩ B, A ∪ B and A′.',m(r'\{2,'+str(k+3)+r'\}')+'; '+m(r'\{1,2,'+str(k+3)+','+str(k+4)+r'\}')+'; '+str([n for n in range(1,k+6) if n not in [1,2,k+3]])+'.',['Intersection contains the elements common to both sets.','Union contains every element in either set, once only.','The complement contains elements of U that are not in A.']))
add(1,'Sets','Set notation, unions and complements',a,'venn-diagrams')
a=[]
for n in range(2,10):
 a.append(q(f'A finite set has {n} elements. Find its number of subsets, proper subsets and singleton subsets.',f'{2**n}; {2**n-1}; {n}.',[f'Each element can be included or excluded: 2^{n} subsets.','Remove the whole set to count proper subsets.',f'A singleton contains exactly one element, giving {n} choices.']))
add(1,'Sets','Subsets and cardinality',a,'venn-diagrams')
a=[]
for k in range(1,9):
 a.append(q(f'A relation is {{(1,{k+1}), (2,{k+2}), (3,{k+3})}}. State its domain and range, give its rule, and decide whether it is a function.',f'Domain {{1,2,3}}; range {{{k+1},{k+2},{k+3}}}; y = x + {k}; yes.', ['The domain consists of all first coordinates.','The range consists of all second coordinates.',f'The second coordinate is {k} more than the first; each input has exactly one output.']))
add(2,'Relations, Functions & Graphs 1','Relations, domain, range and mappings',a,'functions')
# Matrices: no eigenvalues or advanced three-dimensional work.
a=[]
for k in range(1,9):
 A=S.Matrix([[k,1],[2,k+2]]);B=S.Matrix([[1,2],[3,1]])
 a.append(q('For A = '+m(A)+' and B = '+m(B)+', find A + B and 2A − B.',m(A+B)+'; '+m(2*A-B),['Add corresponding entries for A + B.','Multiply every entry of A by 2.','Subtract the corresponding entries of B to obtain '+m(2*A-B)+'.']))
add(2,'Vectors & Matrices 1','Matrix addition and scalar multiplication',a,'matrices')
a=[]
for k in range(1,9):
 A=S.Matrix([[k,1],[2,1]]);B=S.Matrix([[1,2],[0,1]])
 a.append(q('Given A = '+m(A)+' and B = '+m(B)+', calculate AB and BA. Are they equal?',m(A*B)+'; '+m(B*A)+'; no.', ['Multiply each row of the first matrix by each column of the second.','AB = '+m(A*B)+', while BA = '+m(B*A)+'.','The two products differ, so matrix multiplication is not commutative.']))
add(2,'Vectors & Matrices 1','Matrix multiplication and order',a,'matrices')
a=[]
for k in range(1,9):
 a.append(q('Find the matrix for reflection in the x-axis followed by an enlargement of factor '+str(k+1)+' about the origin. Find the image of (2,3).',m(S.Matrix([[k+1,0],[0,-k-1]]))+'; '+m(f'({2*(k+1)},{-3*(k+1)})'),['Reflection in the x-axis has matrix '+m(S.Matrix([[1,0],[0,-1]]))+'.',f'Enlargement multiplies both coordinates by {k+1}; multiply its matrix on the left.','Apply the combined matrix to the column vector (2,3).']))
add(3,'Vectors & Matrices 2','Matrices for transformations',a,'matrices')
# Linear programming has a well-defined feasible region and a worked vertex check.
a=[]
for k in range(1,9):
 n=k+4;vertices=[(0,0),(n,0),(n,2),(2,n),(0,n)];values=[3*u+2*v for u,v in vertices];best=max(values);point=vertices[values.index(best)]
 # For n=5 onwards, x+y <= n+2 gives the two cut corners (n,2),(2,n).
 a.append(q('Use a graph to maximise '+m('P=3x+2y')+' subject to '+m(f'x\\geq0,\\ y\\geq0,\\ x\\leq{n},\\ y\\leq{n},\\ x+y\\leq{n+2}')+'. State the optimal point and value.',m(f'(x,y)=({point[0]},{point[1]}),\\quad P={best}'),[f'Draw the boundary lines and shade their common feasible region.', 'Its vertices are '+str(vertices)+'.',f'Evaluate 3x + 2y at the vertices: {values}.',f'The greatest value is {best} at {point}.'],4))
add(3,'Relations, Functions & Graphs 2','Linear programming',a,'linear-programming')
a=[]
for k in range(1,9):
 r=k+3;angle=60;sector=S.pi*r*r/6;tri=S.sqrt(3)*r*r/4;area=sector-tri
 a.append(q(f'A circle of radius {r} cm has a chord subtending 60° at its centre. Find the area of the minor segment exactly.',m(area)+' cm².',[m(f'\\text{{Sector}}=\\frac{{60}}{{360}}\\pi({r})^2={S.latex(sector)}')+'.',m(f'\\text{{Triangle}}=\\tfrac12({r})^2\\sin60^\\circ={S.latex(tri)}')+'.','Subtract the triangle area from the sector area: '+m(area)+'.']))
add(3,'Geometry & Trigonometry 2','Areas of circle segments',a,'sine-cosine-rule')
# Additional banks cover the CSEC-specific graph and statistics boundaries.
a=[]
for k in range(1,9):
 a.append(q(f'Plot A = ({k}, 2), B = ({k}, -3) and C = (-{k}, 2). State which pair shares an x-coordinate and which pair shares a y-coordinate.', 'A and B share an x-coordinate; A and C share a y-coordinate.', ['Read each ordered pair as (horizontal position, vertical position).','Plot the three points on labelled axes with equal unit spacing.','Equal x-coordinates give a vertical line; equal y-coordinates give a horizontal line.']))
add(1,'Introduction to Graphs','Coordinates and the Cartesian plane',a,'straight-lines')
a=[]
for k in range(1,9):
 start=8*60+10*k;duration=95+5*k;arrival=start+duration
 a.append(q(f'A journey starts at {start//60:02}:{start%60:02} and lasts {duration} minutes. State its duration in hours and minutes and the arrival time.',f'{duration//60} h {duration%60} min; {arrival//60:02}:{arrival%60:02}.',['Divide the duration by 60 to find whole hours and remaining minutes.',f'Add {duration//60} hours, then {duration%60} minutes to the starting time.','Carry 60 minutes into an hour when necessary.']))
add(1,'Measurement','Time calculations and timetables',a,'conversions-teaching')
a=[]
for k in range(1,9):
 a.append(q(f'Two classes have mean score {60+k}. Class A has SD {8+k/2:g}; Class B has SD {4+k/2:g}. Compare their average performance and consistency. Can you identify the highest score?', 'The means are equal; B is more consistent. The highest score cannot be determined.', ['The equal means indicate the same average score.', 'The smaller standard deviation for B indicates less spread around its mean.','A mean and SD do not specify individual maximum values.']))
add(2,'Statistics 1','Interpreting standard deviation',a)
# One readable table serves a full eight-question histogram sheet.
rows=[(0,10,4),(10,20,8),(20,30,12),(30,40,6)];stim='<p>Journey times t, in minutes, are grouped as follows. All class widths are equal.</p><table><tr><th>Time</th><th>Frequency</th></tr>'+''.join(f'<tr><td>{a} ≤ t &lt; {b}</td><td>{f}</td></tr>' for a,b,f in rows)+'</table>'
add(3,'Statistics 2','Equal-width histograms and frequency polygons',[
 q('State the total frequency.','30.',['Add 4 + 8 + 12 + 6.','There are 30 journeys.'],2),
 q('State the class width and the four class midpoints.','10 minutes; 5, 15, 25, 35.',['Each interval spans 10 minutes.','A midpoint is the average of its lower and upper boundaries.'],2),
 q('Draw a frequency histogram.','Four adjoining bars with boundaries 0, 10, 20, 30, 40 and heights 4, 8, 12, 6.',['Label time on the horizontal axis and frequency on the vertical axis.','Use adjoining bars of equal width, with heights equal to frequencies.'],2),
 q('Draw a frequency polygon.','Join (5,4), (15,8), (25,12), (35,6).',['Plot frequency at each class midpoint.','Join consecutive points with straight segments.'],2),
 q('State the modal class.','20 ≤ t < 30.',['The greatest frequency is 12.','Its corresponding interval is 20 to below 30 minutes.'],2),
 q('Estimate the mean journey time (1 d.p.).','21.7 minutes.',['Use midpoints: total ft = 4×5 + 8×15 + 12×25 + 6×35 = 650.','Divide 650 by 30 and round to 1 decimal place.'],2),
 q('Find the percentage of journeys lasting at least 20 minutes.','60%.',['There are 12 + 6 = 18 such journeys.','18 / 30 × 100 = 60%.'],2),
 q('Explain why an exact mean cannot be recovered from this table.','The individual times within each interval are unknown.',['The mean calculation replaces every time with its class midpoint.','Different raw datasets can give the same grouped frequencies.'],2)],stimulus=stim)
a=[]
for k in range(1,9):
 a.append(q('For '+m(f'y=\\frac{{{k}}}{{x^2}}')+', complete a table for x = −2, −1, 1, 2, sketch the graph, and state its asymptotes.',m(S.Rational(k,4))+', '+str(k)+', '+str(k)+', '+m(S.Rational(k,4))+'; x = 0 and y = 0.', ['Square each x-value before dividing '+str(k)+' by it.','Plot two positive branches, symmetric about the y-axis; the function is undefined at x = 0.','The branches approach the coordinate axes without meeting them.']))
add(3,'Relations, Functions & Graphs 2','Cubic and reciprocal-square graphs',a,'graph-transformations-curve-sketching')
# Include cubic tasks in the same nonlinear bank, rather than a misleading title.
for i in range(4,8):
 k=i-3
 packs[-1]['questions'][i]=q('For '+m(f'y={k}x^3')+', complete a table for x = −2, −1, 0, 1, 2 and sketch the curve.',str([-8*k,-k,0,k,8*k])+'.',['Cube x, then multiply by '+str(k)+'.','Plot the five points and draw a smooth increasing S-shaped curve.','The graph passes through (0,0) and is symmetric under a half-turn about the origin.'])
for p in packs:
 for i,v in enumerate(p['questions'],1):v['number']=i
# Preserve authored TeX and originating diagram styles. Normalise only legacy data.
def clean(v,legacy=True):
 if isinstance(v,str):
  if legacy:v=re.sub(r'\\{2}(?=[A-Za-z])',lambda _:chr(92),v)
  v=v.replace(r'\cosec',r'\operatorname{cosec}')
  return re.sub(r'(?<!\$)\$([^$\n]+)\$(?!\$)',lambda z:r'\('+z[1]+r'\)',v)
 if isinstance(v,list):return [clean(z,legacy) for z in v]
 if isinstance(v,dict):return {k:clean(z,False if v.get('origin') in ['authored-csec','authored-ib'] else legacy) for k,z in v.items()}
 return v
library={'qualification':'CSEC Mathematics','syllabus':'For examinations from May–June 2027','revision':'2026-11-18','modules':{'1':'Fundamentals','2':'Intermediate','3':'Higher Concepts'},'packs':clean(packs)}
(D/'library.json').write_text(json.dumps(library,indent=2,ensure_ascii=False)+'\n')
print(json.dumps({'packs':len(packs),'questions':len(packs)*8,'modules':{m:sum(p['module']==m for p in packs) for m in [1,2,3]}}))
