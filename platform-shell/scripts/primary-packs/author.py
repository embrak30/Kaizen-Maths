"""Add original written practice across the five Grades 4-6 curriculum strands.
Question content is authored here, not copied from sample assessment papers.
"""
from pathlib import Path
from fractions import Fraction as F
from math import gcd,cos,sin,pi
import json,re,html
ROOT=Path(__file__).resolve().parents[2]
source=json.loads((ROOT/'data/primary-packs/source.json').read_text())
source['packs']=[p for p in source['packs'] if not(p['grade']==5 and p['topicId'] in ['percent','ratio'])]
for p in source['packs']:
 p['strand']='Measurement' if p['topicId']=='measurement' else 'Number'
 p['focus']={'fractions':'Known parts, remaining quantities, recovering a whole and comparing wholes.','money':'Purchases, change, unit price and value-for-money decisions.','measurement':'Rectangular area and perimeter, missing sides and counterexamples.','percent':'Percentage quantities, reverse percentages, discounts and comparisons.','ratio':'Sharing, equivalent ratios, known shares and differences.'}[p['topicId']]
 p['sourcePages']={4:[10,11],5:[14,15,16,17,18],6:[23,24]}[p['grade']]

def frac(n,d=1):
 if isinstance(n,str):return f'<span class="fraction"><span class="numerator">{html.escape(n)}</span><span class="denominator">{d}</span></span>'
 v=n if isinstance(n,F) and d==1 else None
 if v is None:return str(n) if d==1 else f'<span class="fraction"><span class="numerator">{n}</span><span class="denominator">{d}</span></span>'
 return str(v.numerator) if v.denominator==1 else f'<span class="fraction"><span class="numerator">{v.numerator}</span><span class="denominator">{v.denominator}</span></span>'
def svg(body,w=320,h=150,label='Question diagram'):
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{html.escape(label,quote=True)}" style="font-family:Arial;font-size:20px" font-family="Arial" font-size="20" fill="#203b43">{body}</svg>'
def line(x,y,a,b,extra=''):
 return f'<line x1="{x}" y1="{y}" x2="{a}" y2="{b}" stroke="#235d68" stroke-width="2" {extra}/>'
def rect(x,y,w,h,fill='#dcefeb'):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="#235d68" stroke-width="1.5"/>'
def txt(x,y,s,anchor='middle'):
 return f'<text x="{x}" y="{y}" text-anchor="{anchor}">{s}</text>'
def grid(points=None,shape=False):
 out=''.join(line(35+i*25,10,35+i*25,135,'opacity=".3"')+line(35,10+i*25,160,10+i*25,'opacity=".3"') for i in range(6))
 out+=''.join(txt(35+i*25,153,str(i))+txt(23,140-i*25,str(i)) for i in range(6))
 if points:
  if shape:out+=f'<polygon points="'+ ' '.join(f'{35+x*25},{135-y*25}' for x,y in points)+'" fill="#dcefeb" stroke="#087e82" stroke-width="2"/>'
  else:
   for name,x,y in points:out+=f'<circle cx="{35+x*25}" cy="{135-y*25}" r="4" fill="#087e82"/>'+txt(45+x*25,128-y*25,name)
 return svg(out,190,165,'First-quadrant grid; one square is one unit')
def clock(h,m):
 out='<circle cx="80" cy="80" r="65" fill="white" stroke="#235d68" stroke-width="2"/>'
 for n in range(1,13):a=n*pi/6;out+=txt(80+52*sin(a),85-52*cos(a),str(n))
 out+=line(80,80,80+33*sin((h+m/60)*pi/6),80-33*cos((h+m/60)*pi/6),'stroke-linecap="round"')+line(80,80,80+47*sin(m*pi/30),80-47*cos(m*pi/30))
 return svg(out,160,160,'Analogue clock')
def angle(deg,rotation=0):
 x,y=125,115;r=85;a=rotation*pi/180;b=(rotation+deg)*pi/180
 body=line(x,y,x+r*cos(a),y-r*sin(a))+line(x,y,x+r*cos(b),y-r*sin(b))+txt(125,145,'Measure the smaller angle')
 return svg(body,260,155,'Two rays forming an angle')
def bargraph(vals=(6,10,8),labels=('Mon','Tue','Wed')):
 maxv=max(vals);step=2 if maxv<=12 else 5;height=110;scale=height/(maxv+step)
 out=line(35,15,35,135)+line(35,135,285,135)
 for v in range(0,maxv+step+1,step):y=135-v*scale;out+=line(35,y,285,y,'opacity=".2"')+txt(23,y+5,str(v))
 for i,(v,l) in enumerate(zip(vals,labels)):out+=rect(62+i*75,135-v*scale,38,v*scale)+txt(81+i*75,155,l)
 return svg(out,310,170,'Bar graph with labelled values and categories')
def pictograph():
 body=txt(10,25,'Each circle = 2 books','start')
 for row,(label,n) in enumerate([('Red',3),('Blue',5),('Green',4)]):
  body+=txt(10,60+row*35,label,'start')
  body+=''.join(f'<circle cx="{100+i*28}" cy="{55+row*35}" r="9" fill="#58a99d" stroke="#235d68"/>' for i in range(n))
 return svg(body,290,155,'Pictograph of books; each circle means two books')
def piechart():
 return svg('<circle cx="85" cy="85" r="65" fill="#dcefeb" stroke="#235d68" stroke-width="2"/>'+'<path d="M85 85 L85 20 A65 65 0 0 1 85 150 Z" fill="#77b4db" stroke="#235d68"/>'+line(20,85,85,85)+txt(118,88,'Walk')+txt(52,60,'Bus')+txt(52,118,'Car'),180,170,'Pie chart: Walk one half, Bus one quarter, Car one quarter')
def linegraph():
 out=line(35,15,35,135)+line(35,135,290,135)
 for v in range(0,26,5):y=135-v*4;out+=line(35,y,290,y,'opacity=".2"')+txt(20,y+4,str(v))
 points=[]
 for i,(l,v) in enumerate(zip(['9am','10am','11am','12pm'],[10,15,15,20])):x=55+i*70;points.append((x,135-v*4));out+=txt(x,155,l)+f'<circle cx="{x}" cy="{135-v*4}" r="4" fill="#087e82"/>'
 out+='<polyline points="'+' '.join(f'{x},{y}' for x,y in points)+'" fill="none" stroke="#087e82" stroke-width="2"/>'
 return svg(out,300,170,'Temperature in degrees Celsius by time')
def cubenet():
 return svg(''.join(rect(x,y,35,35) for x,y in [(75,5),(40,40),(75,40),(110,40),(145,40),(75,75)]),195,120,'Net made from six equal squares')
def prismnet():
 return svg(''.join(rect(x,65,60,70) for x in [20,80,140])+'<polygon points="80,65 140,65 110,13" fill="#f9edcc" stroke="#235d68" stroke-width="1.5"/><polygon points="80,135 140,135 110,187" fill="#f9edcc" stroke="#235d68" stroke-width="1.5"/>',220,200,'Three rectangular faces and two triangular faces in a net')
def pyramidnet():
 return svg(rect(70,60,55,55)+'<path d="M70 60 L97.5 12 L125 60 M125 60 L173 87.5 L125 115 M125 115 L97.5 163 L70 115 M70 115 L22 87.5 L70 60" fill="#f9edcc" stroke="#235d68" stroke-width="1.5"/>',195,175,'A square with a triangle on each of its four edges')
def solid():
 return svg('<path d="M60 45 L175 45 L210 20 L95 20 Z M175 45 L210 20 L210 95 L175 120 Z M60 45 L175 45 L175 120 L60 120 Z" fill="#dcefeb" stroke="#235d68" stroke-width="2"/>'+line(60,120,95,95,'stroke-dasharray="4 3"')+line(95,95,210,95,'stroke-dasharray="4 3"')+line(95,20,95,95,'stroke-dasharray="4 3"'),270,145,'A cuboid drawn in perspective')
def thermometer():
 out=''
 for v in range(-10,21,5):y=140-(v+10)*4;out+=line(70,y,100,y)+txt(55,y+4,str(v))
 out+=''.join(line(77,140-(v+10)*4,84,140-(v+10)*4) for v in range(-10,21) if v%5)
 out+=rect(84,20,8,120,'white')+rect(85,92,6,48,'#db785d')+txt(125,35,'°C')
 return svg(out,155,155,'Thermometer marked every 5 degrees Celsius')
def q(text,answer,steps,marks=2,check=None):
 if isinstance(steps,str):steps=[steps]
 return {'question':text,'answer':str(answer),'steps':steps,'marks':marks,'responseFormat':'Constructed response','check':check}
def add(grade,key,title,strand,focus,questions,pages):
 assert len(questions)==10,(key,len(questions))
 for i,v in enumerate(questions):
  v['number']=i+1;v['type']=key;v['questionText']=re.sub('<[^>]+>',' ',v['question']);v['steps']=[re.sub(r'\s*\[\d+ marks?\]','',x) for x in v['steps']]
  # Marks describe observable response elements; the teacher pack includes these guidelines.
  if not any('mark' in x for x in v['steps']):v['steps'].append('Suggested credit: '+('1 mark for the correct response.' if v['marks']==1 else '1 mark for a valid method; '+str(v['marks']-1)+' '+('mark' if v['marks']==2 else 'marks')+' for correct results and the requested explanation or representation.'))
 source['packs'].append({'id':f'P{grade}-{key}','grade':grade,'topicId':key,'topic':title,'title':title,'strand':strand,'focus':focus,'sourcePages':pages,'sourceTool':'pep-practice','instructions':'Answer all ten questions. Show your working and explain your decisions. Use separate paper if needed.','questions':questions})

def place(g):
 n=4725836 if g==4 else 47258361
 return [q(f'Write {n:,} in words.', 'Four million, seven hundred and twenty-five thousand, eight hundred and thirty-six.' if g==4 else 'Forty-seven million, two hundred and fifty-eight thousand, three hundred and sixty-one.','Group the digits into millions, thousands and units.',1),
 q(f'What is the value of the digit 7 in {n:,}?',700000 if g==4 else 7000000,'Read the position of the 7: hundred thousands.' if g==4 else 'The 7 is in the millions column.',1),
 q('A town has 306,048 people. Write this in expanded form.','300,000 + 6,000 + 40 + 8','Zero place-value columns contribute no value.'),
 q('Arrange 59,408; 59,480; 59,048 in increasing order.','59,048; 59,408; 59,480','Compare digits from the highest place value down.'),
 q('A counter shows 699,999. What number appears after one more visitor?',700000,'699,999 + 1 = 700,000. Regroup through the nines.',1),
 q('Round 48,765 to the nearest hundred.',48800,'The tens digit is 6, so round the hundreds up.',1),
 q('A pupil says 4,090 is greater than 4,900 because 90 is greater than 9. Explain the error.','4,900 is greater.','Compare matching columns: 9 hundreds is greater than 0 hundreds.'),
 q('Write the number with 6 hundred thousands, 2 thousands, 5 tens and 9 ones.',602059,'600,000 + 2,000 + 50 + 9 = 602,059.'),
 q('A stadium rounds its attendance to 12,000 to the nearest thousand. Could the actual attendance be 12,499? Explain.','Yes.','12,499 is below the halfway point 12,500, so rounds to 12,000.'),
 q('Use the digits 2, 0, 8, 4, 1 once each. Make the greatest and least five-digit numbers.','Greatest: 84,210. Least: 10,248.','Put the largest digits first for the greatest. The least must begin with the smallest non-zero digit.')]

def sets(g):
 qs=[q('List the members of the set of even whole numbers greater than 2 and less than 12.','{4, 6, 8, 10}','Even numbers are divisible by 2; do not include the boundary values.'),
 q('A = {2, 3, 5, 7}. Is 1 a member of A? Explain.','No.','Only the listed numbers belong to A.',1),
 q('Write a rule for the set {5, 10, 15, 20}.','Multiples of 5 from 5 to 20 inclusive.','A rule must include both the pattern and its boundary.'),
 q('List the vowels in the word MATHEMATICS as a set.','{A, E, I}','A set lists each distinct member once.'),
 q('A pupil writes {2, 2, 4, 6} for the even numbers from 2 to 6. Correct the set.','{2, 4, 6}','Repeated entries do not create new members.'),
 q('Which numbers belong to both {1, 2, 3, 4} and {3, 4, 5, 6}?','{3, 4}','Check each member against both lists.'),
 q('The set contains all whole numbers between 3 and 7, not including 3 or 7. List its members.','{4, 5, 6}','Both boundary values are excluded.'),
 q('A box has cards A, A, B, C. A pupil says the set of letters has four members. Is this correct?','No: {A, B, C} has three members.','The two A cards represent one distinct set member.'),
 q('List the set of odd numbers greater than 0 and less than 10.','{1, 3, 5, 7, 9}','Add 2 each time, stopping before 10.'),
 q('A class group is described as “pupils who prefer football”. Explain what information is needed to list its members.','Ask which pupils in the class prefer football.','Membership must be decided by the given rule, not guessed.')]
 if g>=5:
  qs[2]=q('Classify each set: the days in a week; positive multiples of 3; months with 32 days.','Finite; infinite; empty.','A finite set ends; an infinite set continues without end; an empty set has no members.',3)
  qs[6]=q('Is the set of whole numbers less than 0 empty or infinite? Explain.','Empty.','Whole numbers are 0, 1, 2, …; none is below 0.')
 if g==6:
  qs[1]=q('A = {1, 2, 3, 4}; B = {3, 4, 5}. Find A ∩ B and A ∪ B.','A ∩ B = {3, 4}; A ∪ B = {1, 2, 3, 4, 5}.','Intersection contains common members. Union contains all distinct members.',3)
  qs[4]=q('12 pupils play chess, 9 play tennis and 4 play both. How many play at least one of these games?',17,['Add both counts: 12 + 9 = 21.','The 4 who play both were counted twice: 21 − 4 = 17.'],2,{'op':'union','a':12,'b':9,'both':4,'result':17})
  qs[7]=q('Draw a two-set Venn diagram for A = {2, 4, 6} and B = {4, 6, 8}.','A only: 2; intersection: 4, 6; B only: 8.','Draw overlapping circles, placing each number in exactly one region.',3)
  qs[9]=q('In a class of 30, 15 like drama, 12 like music and 5 like both. How many like neither?',8,['At least one: 15 + 12 − 5 = 22.','Neither: 30 − 22 = 8.'],2,{'op':'neither','a':15,'b':12,'both':5,'total':30,'result':8})
 return qs

def operations(g):
 a=2386 if g==4 else 12386;b=1478 if g==4 else 21478
 return [q(f'A library has {a:,} books and receives {b:,} more. How many books are there?',f'{a+b:,} books',[f'{a:,} + {b:,} = {a+b:,}.'],2,{'op':'+','a':a,'b':b,'result':a+b}),
 q('A store has 8,040 cups. It sells 2,675. How many remain?','5,365 cups',['8,040 − 2,675 = 5,365.'],2,{'op':'-','a':8040,'b':2675,'result':5365}),
 q('A printer makes 248 leaflets in one batch. How many in 24 batches?','5,952 leaflets',['248 × 20 = 4,960; 248 × 4 = 992.','4,960 + 992 = 5,952.'],2,{'op':'*','a':248,'b':24,'result':5952}),
 q('12,060 buttons are packed equally into 12 boxes. How many per box?',1005,['12,060 ÷ 12 = 1,005.','Check: 1,005 × 12 = 12,060.'],2,{'op':'/','a':12060,'b':12,'result':1005}),
 q('A trip has 137 pupils. Each minibus seats 12 pupils. How many minibuses are needed?',12,['137 ÷ 12 = 11 remainder 5.','The remaining five pupils require another minibus: 12 altogether.']),
 q('A pupil says 3,005 − 287 = 3,282. Identify the error and calculate correctly.',2718,['The pupil added rather than subtracted.','3,005 − 287 = 2,718.'],2,{'op':'-','a':3005,'b':287,'result':2718}),
 q('A shop sold 18 trays of 24 rolls and then 37 more rolls. How many rolls were sold?',469,['18 × 24 = 432.','432 + 37 = 469.'],2,{'op':'two-step','a':18,'b':24,'c':37,'result':469}),
 q('A farmer had some eggs. After selling 486 eggs, 729 remained. How many eggs were there at first?',1215,['Original = sold + remaining.','486 + 729 = 1,215.']),
 q('Is 72 ÷ 8 the same as 8 ÷ 72? Explain with a calculation.','No.',['72 ÷ 8 = 9, but 8 ÷ 72 = '+frac(1,9)+'.','Division does not have the commutative property.']),
 q('Three classes collect 248, 175 and 252 bottles. Show how regrouping can make the total easier to find.',675,['(248 + 252) + 175 = 500 + 175 = 675.','Reordering and regrouping addition does not change the total.'])]

def compare_fractions(g):
 return [q('Which is greater: '+frac(3,4)+' or '+frac(2,3)+'? Show equivalent fractions.',frac(3,4),[frac(3,4)+' = '+frac(9,12)+'; '+frac(2,3)+' = '+frac(8,12)+'.']),
 q('Arrange '+frac(1,2)+', '+frac(3,8)+', '+frac(5,6)+' in increasing order.',frac(3,8)+', '+frac(1,2)+', '+frac(5,6),'Compare using the same whole or a common denominator.'),
 q('Is '+frac(7,8)+' closer to 0, '+frac(1,2)+' or 1?',1,'It is only '+frac(1,8)+' below 1.',1),
 q('Write two fractions equivalent to '+frac(2,5)+'.',frac(4,10)+' and '+frac(6,15),'Multiply numerator and denominator by the same positive whole number.'),
 q('A pupil says '+frac(1,6)+' is greater than '+frac(1,4)+' because 6 is greater than 4. Explain the mistake.',frac(1,4)+' is greater.','For the same whole, more equal parts means each part is smaller.'),
 q('Complete: '+frac(3,5)+' = '+frac('?',20)+'.','12','5 × 4 = 20, so 3 × 4 = 12.'),
 q('Which fraction is less than one half: '+frac(5,8)+', '+frac(4,9)+' or '+frac(7,12)+'?',frac(4,9),'Double 4 is 8, which is less than the denominator 9.'),
 q('Two equal-sized pizzas are cut into 8 and 12 slices. Which is more pizza: 3 of the first slices or 4 of the second?',frac(3,8)+' of a pizza is greater.',[frac(3,8)+' = '+frac(9,24)+'; '+frac(4,12)+' = '+frac(8,24)+'.']),
 q('Give a fraction strictly between '+frac(1,4)+' and '+frac(1,2)+'.',frac(3,8)+' (one possible answer).',[frac(1,4)+' = '+frac(2,8)+'; '+frac(1,2)+' = '+frac(4,8)+'. Accept any valid fraction between them.']),
 q('A runner covers '+frac(5,4)+' km. Has the runner travelled more or less than 1 km? Explain.','More.','Four quarters make 1 km; five quarters is '+frac(1,4)+' km more.')]

def fraction_ops(g):
 vals=[(F(2,7),F(3,7),'+'),(F(7,9),F(2,9),'-'),(F(2),F(3,5),'-'),(F(7,4),F(3,4),'+'),(F(9,5),F(2,5),'-')]
 if g>=5:vals=[(F(2,3),F(1,4),'+'),(F(5,6),F(1,4),'-'),(F(3,2),F(2,3),'-'),(F(7,4),F(2,3),'+'),(F(3,5),F(2,3),'*')]
 qs=[]
 for i,(a,b,op) in enumerate(vals):
  result={'+':a+b,'-':a-b,'*':a*b}[op];symbol={'+':'+','-':'−','*':'×'}[op]
  contexts=['A jug contains','A ribbon measures','A baker has','A bottle contains','A gardener uses']
  prompt=f'Calculate {frac(a)} {symbol} {frac(b)}. Give your answer in simplest form.'
  if i==1:prompt='A ribbon is '+frac(a)+' m long. '+frac(b)+' m is cut off. How much remains?'
  if op!='*':
   common=a.denominator*b.denominator//gcd(a.denominator,b.denominator);na=a.numerator*(common//a.denominator);nb=b.numerator*(common//b.denominator);numerator=na+nb if op=='+' else na-nb
   steps=['Use denominator '+str(common)+': '+frac(a)+' = '+frac(na,common)+' and '+frac(b)+' = '+frac(nb,common)+'.',frac(na,common)+' '+symbol+' '+frac(nb,common)+' = '+frac(numerator,common)+'.','In simplest form: '+frac(result)+'.']
  else:steps=['Multiply numerators and denominators: '+frac(a)+' × '+frac(b)+' = '+frac(a.numerator*b.numerator,a.denominator*b.denominator)+'.','Simplify to '+frac(result)+'.']
  qs.append(q(prompt,frac(result),steps,2,{'op':'fraction'+op,'a':[a.numerator,a.denominator],'b':[b.numerator,b.denominator],'result':[result.numerator,result.denominator]}))
 qs += [q('A pupil writes '+frac(1,4)+' + '+frac(2,4)+' = '+frac(3,8)+'. Correct the answer and explain.',frac(3,4),'The equal parts remain quarters; add the numerators, not the denominators.'),
 q('Some juice is poured from a full 1-litre bottle. '+frac(3,8)+' litre remains. How much was poured out?',frac(5,8)+' litre',['1 − '+frac(3,8)+' = '+frac(5,8)+'.']),
 q('A recipe uses '+frac(3,5)+' kg of flour. You have '+frac(7,5)+' kg. How much remains after making it once?',frac(4,5)+' kg',[frac(7,5)+' − '+frac(3,5)+' = '+frac(4,5)+'.']),
 q('Find the missing fraction: ? + '+frac(2,9)+' = '+frac(7,9)+'.',frac(5,9),['Subtract '+frac(2,9)+' from '+frac(7,9)+'.']),
 q('Two pupils each walk '+frac(3,4)+' km. One pupil says their combined distance is less than 1 km. Is this true?','No: '+frac(3,2)+' km altogether.',[frac(3,4)+' + '+frac(3,4)+' = '+frac(6,4)+' = '+frac(3,2)+'.'])]
 if g==6:
  qs[5]=q('A pupil says 3 ÷ '+frac(1,2)+' = '+frac(3,2)+'. Correct the answer and explain.',6,'There are two halves in each whole, so six halves in three wholes.')
  qs[7]=q('Share '+frac(9,4)+' litres equally among 3 bottles. How much per bottle?',frac(3,4)+' litre',[frac(9,4)+' ÷ 3 = '+frac(9,12)+' = '+frac(3,4)+'.'])
  qs[9]=q('A roll has 4 m of ribbon. Each bow needs '+frac(2,3)+' m. How many complete bows can be made?',6,['4 ÷ '+frac(2,3)+' = 4 × '+frac(3,2)+' = 6.'])
 return qs

def decimals(g):
 qs=[q('Write '+frac(37,100)+' as a decimal.',0.37,'37 hundredths is 0.37.',1),
 q('What is the value of 6 in 4.628?',0.6,'The first place after the decimal point is tenths.',1),
 q('Arrange 0.8, 0.08, 0.808 and 0.88 in increasing order.','0.08, 0.8, 0.808, 0.88','Compare 0.080, 0.800, 0.808 and 0.880.'),
 q('A bottle contains 1.75 L and another contains 0.85 L. Find the total.','2.60 L',['1.75 + 0.85 = 2.60.'],2,{'op':'+','a':1.75,'b':0.85,'result':2.6}),
 q('A pupil writes 4.2 + 0.35 = 4.55. Is this correct? Explain.','Yes.','4.20 + 0.35 = 4.55. Align the decimal columns.'),
 q('Each bag has mass 0.375 kg. Find the mass of 8 bags.','3 kg',['0.375 × 8 = 3.000.'],2,{'op':'*','a':0.375,'b':8,'result':3}),
 q('Write the missing number: ? − 1.25 = 2.60.',3.85,'2.60 + 1.25 = 3.85.'),
 q('Round 6.748 to the nearest tenth and nearest hundredth.','6.7; 6.75','For tenths, inspect the hundredths digit. For hundredths, inspect the thousandths digit.'),
 q('A pupil says multiplying 0.46 by 100 gives 0.0046. Correct the error.',46,'Multiplication by 100 makes the value 100 times as large; each digit moves two places to the left.'),
 q('A 7.2 m rope is cut into 6 equal pieces. Find the length of each.','1.2 m','7.2 ÷ 6 = 1.2.')]
 if g==4:
  qs[2]=q('Arrange 0.8, 0.08, 0.85 and 0.88 in increasing order.','0.08, 0.8, 0.85, 0.88','Compare 0.08, 0.80, 0.85 and 0.88.')
  qs[1]=q('What is the value of 6 in 4.62?',0.6,'The 6 represents six tenths.',1)
  qs[5]=q('Each packet has mass 0.25 kg. What is the mass of 8 packets?','2 kg','0.25 × 8 = 2.')
  qs[7]=q('A ribbon is 6.75 m long. After using 2.30 m, how much remains?','4.45 m','6.75 − 2.30 = 4.45.')
 if g==6:
  qs[6]=q('6.3 L of juice is poured into 0.45 L bottles. How many full bottles can be filled?',14,['6.3 ÷ 0.45 = 630 ÷ 45 = 14.'])
  qs[9]=q('Find 48.6 ÷ 100. Explain the place-value change.',0.486,'Dividing by 100 gives a value one hundredth as large. Digits move two places right.')
 return qs

def factors(g):
 return [q('List all the factors of 24.','1, 2, 3, 4, 6, 8, 12, 24','Find factor pairs: 1×24, 2×12, 3×8 and 4×6.'),
 q('Which of 21, 23, 27 and 29 are prime?','23 and 29','A prime number has exactly two positive factors: 1 and itself.'),
 q('List the common factors of 18 and 30.','1, 2, 3, 6','List both sets of factors and keep the members they share.'),
 q('Two bells ring every 6 and 8 minutes. They ring together now. In how many minutes will they next ring together?',24,'The first common positive multiple of 6 and 8 is 24.'),
 q('A pupil says 1 is prime because it divides by 1. Explain why this is wrong.','1 is not prime.','It has only one positive factor; a prime must have exactly two.'),
 q('Write 60 as a product of prime factors.','2² × 3 × 5' if g==6 else '2 × 2 × 3 × 5','60 = 6 × 10 = 2 × 3 × 2 × 5.'),
 q('Find the greatest number of identical bags that can be made using 24 red and 36 blue beads, with no beads left over.',12,'The greatest common factor of 24 and 36 is 12. Each bag has 2 red and 3 blue beads.'),
 q('A pupil writes 4³ = 4 × 3 = 12. Correct the calculation.',64,'4³ means 4 × 4 × 4 = 64.') if g==6 else q('Find the first four positive multiples of 9.','9, 18, 27, 36','Multiply 9 by 1, 2, 3 and 4.'),
 q('Which number between 30 and 40 is a multiple of both 4 and 9?',36,'36 = 4 × 9; it lies strictly between 30 and 40.'),
 q('A number has prime factorisation 2² × 3². Find the number.',36,'2 × 2 × 3 × 3 = 36.') if g==6 else q('A pupil says every odd number is prime. Give a counterexample.','9 (or another odd composite).','9 = 3 × 3, so it has more than two positive factors.')]

def units(g):
 qs=[q('A path is 3 km 250 m long. Express this distance in metres.','3,250 m','3 × 1,000 + 250 = 3,250.'),
 q('A bottle contains 1.5 L. How many millilitres is this?','1,500 mL','1.5 × 1,000 = 1,500.'),
 q('A parcel weighs 2 kg 75 g. Express its mass in grams.','2,075 g','2 × 1,000 + 75 = 2,075.'),
 q('Which unit is most suitable for the mass of a pencil: grams or kilograms? Explain.','Grams.','A pencil has a small mass; grams give a practical measurement.'),
 q('A pupil says 4.2 m = 42 cm. Correct the conversion.','420 cm','There are 100 centimetres in 1 metre: 4.2 × 100 = 420.'),
 q('A 5 L container is filled using 250 mL cups. How many full cups are needed?',20,'5 L = 5,000 mL. Then 5,000 ÷ 250 = 20.'),
 q('A 750 g bag and a 1.25 kg bag are packed together. What is their combined mass in kilograms?','2 kg','750 g = 0.75 kg; 0.75 + 1.25 = 2.'),
 q('A ruler is marked in centimetres. How many millimetres are in 8.6 cm?','86 mm','There are 10 mm in each cm; 8.6 × 10 = 86.'),
 q('A tank holds 3 kL of water. Express this capacity in litres.','3,000 L','1 kL = 1,000 L.') if g>=5 else q('A bottle holds 2,500 mL. Express this in litres.','2.5 L','2,500 ÷ 1,000 = 2.5.'),
 q('A vehicle carries 2.4 tonnes. Express the mass in kilograms.','2,400 kg','1 tonne = 1,000 kg.') if g>=5 else q('Two ropes measure 150 cm and 2 m. Which is longer and by how much?','The 2 m rope is 50 cm longer.','2 m = 200 cm; 200 − 150 = 50.')]
 if g==6:
  qs=[q('A field covers 2 hectares. Express its area in square metres.','20,000 m²','1 hectare = 10,000 m²; multiply by 2.'),
   q('A square has side 1 m. Express its area in square centimetres.','10,000 cm²','1 m = 100 cm, so area = 100 × 100 = 10,000 cm².'),
   q('Which unit is suitable for the area of a country: cm², m² or km²? Explain.','km²','Square kilometres describe very large regions.'),
   q('A pupil says 3 m² = 300 cm². Correct the conversion.','30,000 cm²','Each square metre contains 100 × 100 = 10,000 square centimetres.'),
   q('A garden has area 25,000 m². Express this in hectares.','2.5 hectares','25,000 ÷ 10,000 = 2.5.'),
   q('A region has area 4 km². Express it in square metres.','4,000,000 m²','1 km² = 1,000 × 1,000 m² = 1,000,000 m².'),
   q('A floor covers 12 m². Each tile covers 0.25 m². How many tiles cover it with no gaps?',48,'12 ÷ 0.25 = 48.'),
   q('A plot measures 200 m by 50 m. Find its area in hectares.','1 hectare','200 × 50 = 10,000 m² = 1 hectare.'),
   q('Two farms cover 1.8 ha and 16,000 m². Which is larger, and by how much?','The 1.8 ha farm is larger by 2,000 m².','1.8 ha = 18,000 m²; subtract 16,000.'),
   q('Explain why metres and square metres cannot be used interchangeably.','Metres measure length; square metres measure area.','A boundary length and the region inside it are different quantities.')]
 return qs

def time(g):
 qs=[q('Write the time shown. It is in the morning.'+clock(8,25),'8:25 a.m.','The minute hand points to 5 (25 minutes); the hour hand is just after 8.'),
 q('A lesson starts at 9:35 a.m. and ends at 10:20 a.m. How long does it last?','45 minutes','25 minutes to 10:00, then 20 more minutes.'),
 q('A bus ride takes 1 hour 45 minutes. It starts at 10:30 a.m. When does it end?','12:15 p.m.','Add one hour to 11:30 a.m., then 45 minutes.'),
 q('Convert 3 hours 20 minutes to minutes.','200 minutes','3 × 60 + 20 = 200.'),
 q('A pupil says 2.5 hours is 2 hours 5 minutes. Correct the mistake.','2 hours 30 minutes','Half an hour is half of 60 minutes, not 5 minutes.'),
 q('A film ends at 4:10 p.m. after lasting 95 minutes. When did it start?','2:35 p.m.','Subtract 1 hour to 3:10 p.m., then 35 minutes.'),
 q('A runner completes 4 laps in 2 minutes 30 seconds each. Find the total time.','10 minutes','Each lap is 150 seconds; 4 × 150 = 600 seconds = 10 minutes.'),
 q('A timer shows 185 seconds. Write this in minutes and seconds.','3 minutes 5 seconds','185 = 3 × 60 + 5.'),
 q('A train leaves at 11:50 a.m. and arrives at 1:15 p.m. Find the journey time.','1 hour 25 minutes','10 minutes to noon, then 1 hour 15 minutes.'),
 q('One pupil practises for 35 minutes on each of 6 days. Another practises for 3 hours altogether. Who practises longer and by how much?','The first pupil, by 30 minutes.','35 × 6 = 210 minutes; 3 hours = 180 minutes.')]
 if g==6:
  qs[0]=q('Write 7:45 p.m. using the 24-hour clock.','19:45','Add 12 to the hour for a p.m. time other than noon.',1)
  qs[2]=q('A bus leaves at 22:40 and travels for 2 hours 35 minutes. Give its arrival time using the 24-hour clock.','01:15 the next day','1 hour 20 minutes reaches midnight; the remaining 1 hour 15 minutes reaches 01:15.')
  qs[5]=q('A train arrives at 16:05 after a 2 hour 40 minute journey. At what time did it leave?','13:25','Subtract 2 hours to 14:05, then 40 minutes to 13:25.')
  qs[8]=q('A ferry departs at 23:35 and arrives at 00:20. Find the journey time.','45 minutes','25 minutes to midnight plus 20 minutes after midnight.')
 return qs

def temperature(g):
 qs=[q('Read the temperature shown.'+thermometer(),'2°C','The liquid ends between 0°C and 5°C, at 2°C. The scale is linear.'),
 q('At noon the temperature is 28°C. It rises by 4°C. What is the new temperature?','32°C','28 + 4 = 32.'),
 q('Water cools from 65°C to 42°C. How many degrees has it cooled?','23°C','65 − 42 = 23.'),
 q('Which is warmer: 18°C or 8°C? By how much?','18°C, by 10°C','18 − 8 = 10.'),
 q('A pupil says 35°C is twice as warm as 17°C because 35 is about twice 17. Is 35 exactly double 17?','No.','2 × 17 = 34, not 35. Celsius readings also do not measure “twice as much heat”.'),
 q('A room warms by 7°C to reach 24°C. Find its starting temperature.','17°C','24 − 7 = 17.'),
 q('A fridge should be between 2°C and 5°C inclusive. Are 1°C and 4°C both suitable?','Only 4°C is suitable.','4 lies in the interval; 1 is below it.'),
 q('At 8 a.m. it is 22°C, at noon 29°C, and at 6 p.m. 25°C. Find the biggest rise between consecutive readings.','7°C','22 to 29 is a rise of 7; 29 to 25 is a fall of 4.'),
 q('An oven cools by 35°C from 180°C. What is its new temperature?','145°C','180 − 35 = 145.'),
 q('Choose a sensible unit for air temperature: kilograms, degrees Celsius or litres. Explain.','Degrees Celsius.','Kilograms measure mass; litres measure capacity.',1)]
 if g>=5:
  qs[1]=q('A freezer is at −6°C. The temperature rises by 9°C. Find the new temperature.','3°C','Six degrees reaches 0°C; three more reaches 3°C.')
  qs[2]=q('Find the temperature difference between −4°C and 7°C.','11°C','From −4 to 0 is 4 degrees; from 0 to 7 is 7 more.')
  qs[3]=q('Which is warmer: −3°C or −8°C? By how much?','−3°C, by 5°C','−3 lies 5 degrees above −8 on a number line.')
  qs[4]=q('A pupil says −9°C is warmer than −2°C because 9 is greater than 2. Correct the reasoning.','−2°C is warmer.','For negative temperatures, the value nearer zero is warmer.')
  qs[8]=q('A freezer falls from −2°C to −11°C. By how many degrees does it fall?','9°C','The distance between −2 and −11 is 9 degrees.')
 return qs

def angles_lines(g):
 qs=[q('Identify the smaller angle as acute, right or obtuse.'+angle(60,10),'Acute.','An acute angle is smaller than a right angle (90°).',1),
 q('A door turns through a quarter of a full turn. How many degrees is this?',90,'A full turn is 360°; 360 ÷ 4 = 90.',1),
 q('Draw two parallel line segments and two perpendicular line segments.','Parallel segments remain the same distance apart; perpendicular segments meet at 90°.','Use a ruler. Mark a right-angle corner for the perpendicular pair.'),
 q('A pupil says two lines that meet must be perpendicular. Give a counterexample.','Two lines can intersect at 60°, rather than 90°.','All perpendicular lines intersect, but not all intersecting lines are perpendicular.'),
 q('Identify the smaller angle as acute, right or obtuse.'+angle(120,0),'Obtuse.','It is greater than 90° and less than 180°.',1),
 q('How many right angles make a half turn?',2,'A half turn is 180°; 180 ÷ 90 = 2.',1),
 q('Sketch a triangle with one right angle. Mark that angle.','Any triangle with one angle of 90°.','Two of its sides must meet perpendicularly.'),
 q('A square is rotated on the page. Do its angles stop being right angles? Explain.','No.','Rotating a shape preserves the size of every angle.'),
 q('Which is larger: an angle of 45° or a right angle? By how many degrees?','A right angle, by 45°.','90 − 45 = 45.'),
 q('A compass turns clockwise from north to east. Describe the turn.','A quarter turn (90°).','North to east is one of four equal quarter turns around the compass.')]
 if g>=5:
  qs[0]=q('Use a protractor to measure the smaller angle to the nearest degree.'+angle(60,10),'60° (allow 1° measuring tolerance).','Place the protractor centre at the vertex and align its zero line with one ray.')
  qs[4]=q('An angle measures 230°. Classify it and find how much is needed to complete a full turn.','Reflex; 130° more.','230° is between 180° and 360°. Then 360 − 230 = 130.')
  qs[6]=q('Draw an angle of 45° using a ruler and protractor.','Two rays meeting at 45° (allow 1° measuring tolerance).','Draw a base ray. Mark 45° from its direction, then draw the second ray.')
  qs[9]=q('A pupil starts facing north and turns clockwise through three quarters of a full turn. Which direction is the pupil facing?','West.','Three clockwise quarter turns: east, south, west.')
 if g==6:
  qs[1]=q('Use a ruler and protractor to draw an angle of 125°.','An obtuse angle of 125° (allow 1° measuring tolerance).','Align the protractor with the base ray and mark 125° before drawing the second ray.')
  qs[5]=q('Two angles together form a straight angle. One is 68°. Find the other.',112,'180 − 68 = 112°.')
 return qs

def plane_shapes(g):
 diagram=svg('<polygon points="35,120 175,120 105,25" fill="#dcefeb" stroke="#235d68" stroke-width="2"/>'+txt(35,70,'5 cm')+txt(175,70,'5 cm')+txt(105,143,'6 cm'),220,155,'Triangle with sides 5 cm, 5 cm and 6 cm')
 return [q('Name the polygon with three sides and three vertices.','Triangle.','A triangle has exactly three straight sides.',1),
 q('Draw a rectangle that is not a square. Mark pairs of parallel sides.','Any non-square rectangle.','All four angles are right angles. Opposite sides are parallel and equal.'),
 q('A pupil draws a rounded rectangle to represent a mathematical rectangle. Explain what must be changed.','Replace the curved corners with four vertices and right angles.','A mathematical rectangle has four straight sides.'),
 q('Name this triangle by its side lengths.'+diagram,'Isosceles.','Two of its sides have the same length (5 cm).',1),
 q('Can a square also be called a rectangle? Explain.','Yes.','It has four right angles and opposite sides parallel; it meets the definition of rectangle.'),
 q('How many sides and vertices does a hexagon have?','Six sides and six vertices.','The prefix hex- indicates six.',1),
 q('Draw a quadrilateral with exactly one pair of parallel sides.','Any trapezium with exactly one parallel pair.','Make the other pair non-parallel.'),
 q('A triangle has sides 4 cm, 5 cm and 6 cm. Classify it by its side lengths.','Scalene.','All three side lengths are different.',1),
 q('In rectangle ABCD, the letters go around the boundary. Name the side opposite AB and the two sides adjacent to AB.','Opposite: CD. Adjacent: BC and AD.','Opposite sides do not share vertices; adjacent sides share one.',3),
 q('A pupil says every four-sided shape is a square. Give a counterexample.','A rectangle measuring 3 cm by 5 cm.','It has four sides but not four equal side lengths.')]

def position(g):
 diagram=grid([('A',1,2),('B',4,2),('C',4,4)])
 qs=[q('Read the column and row of point A. Columns run horizontally and rows vertically.'+diagram,'Column 1, row 2.','Move across to 1, then up to 2.'),
 q('Start at A in the grid above. Move 3 squares east. Which labelled point do you reach?'+diagram,'B.','East increases the column by 3: (1, 2) to (4, 2).'),
 q('Draw all the lines of symmetry of a non-square rectangle.','Two: one horizontal and one vertical through its centre.','Both fold the rectangle exactly onto itself. The diagonals do not.'),
 q('A pupil says every triangle has three lines of symmetry. Give a counterexample.','A scalene triangle has none.','Only an equilateral triangle has three lines of symmetry.'),
 q('A shape is slid to another position without turning it. Do its size and angles change?','No.','A slide (translation) preserves size, side lengths and angles.'),
 q('A pupil faces west and makes a half turn. Which direction does the pupil face now?','East.','A half turn reverses the direction.'),
 q('Draw a shape with exactly one line of symmetry. Mark the line.','For example, a non-equilateral isosceles triangle.','Its symmetry line joins the apex to the midpoint of the unequal side.'),
 q('On the grid, how far and in which direction is C from B?'+diagram,'2 squares north.','B is (4, 2), C is (4, 4). The column stays fixed.'),
 q('A square is turned through a quarter turn about its centre. Does it still fit its original outline?','Yes.','A square has quarter-turn rotational symmetry.'),
 q('Sketch a letter shape with a vertical line of symmetry and a letter shape without one.','For example: a block capital A has vertical symmetry; a block capital F does not.','Use straight, evenly formed block letters; accept other valid examples.')]
 if g==6:
  qs[0]=q('Write the coordinates of A, B and C.'+diagram,'A (1, 2), B (4, 2), C (4, 4).','Write horizontal coordinate first, then vertical coordinate.',3)
  qs[1]=q('Reflect point P (1, 3) in the vertical line x = 3. Give the image coordinates.','(5, 3)','P is 2 units left of the mirror, so its image is 2 units right.')
  qs[5]=q('A triangle has vertices (1, 1), (3, 1), (1, 3). Reflect it in the line y = 3. Give the image vertices.','(1, 5), (3, 5), (1, 3).','Keep x unchanged; each image lies the same vertical distance on the other side of y = 3.',3)
  qs[9]=q('Plot (1, 1), (4, 1), (4, 3) and (1, 3), then join them in order. Name the shape.'+grid(),'Rectangle.','Opposite sides are parallel and equal, with four right angles.')
 return qs

def similar(g):
 return [q('Two rectangles measure 3 cm by 5 cm and 6 cm by 10 cm. Are they similar?','Yes.','Both side lengths are multiplied by 2; corresponding angles are equal.'),
 q('Two triangles have matching side lengths 4, 5, 6 cm. One is turned on the page. Are they congruent?','Yes.','Orientation does not change their matching size and shape.'),
 q('A pupil says two shapes are congruent whenever their angles are equal. Give a counterexample.','Squares of side 2 cm and 4 cm.','Their angles match, but their sizes differ.'),
 q('A photograph is 8 cm wide and 12 cm high. An enlargement is 20 cm wide. Find its height.','30 cm','Scale factor = 20 ÷ 8 = 2.5; height = 12 × 2.5 = 30.'),
 q('Which is congruent to a 4 cm by 7 cm rectangle: a 7 cm by 4 cm rectangle or an 8 cm by 14 cm rectangle?','The 7 cm by 4 cm rectangle.','It has the same side lengths; it is simply turned.'),
 q('Are rectangles 2 cm by 3 cm and 4 cm by 5 cm similar? Explain.','No.','One side is doubled, but 3 × 2 is 6, not 5.'),
 q('A triangle with sides 3, 4, 5 cm is enlarged by scale factor 3. Find the new side lengths.','9 cm, 12 cm, 15 cm.','Multiply every length by 3.',3),
 q('A shape is reflected in a mirror line. Is the image congruent to the original? Explain.','Yes.','Reflection preserves all lengths and angles.'),
 q('Two similar shapes have corresponding sides of 6 cm and 18 cm. A second side of the smaller shape is 5 cm. Find the matching larger side.','15 cm','Scale factor = 18 ÷ 6 = 3; then 5 × 3 = 15.'),
 q('State one difference between similar shapes and congruent shapes.','Similar shapes may differ in size; congruent shapes have the same size and shape.','Congruent shapes have scale factor 1.')]

def solids(g):
 qs=[q('Name the solid in the diagram.'+solid(),'Cuboid (rectangular prism).','It has six rectangular faces.',1),
 q('How many faces, edges and vertices does a cube have?','6 faces, 12 edges, 8 vertices.','Count each feature once, including those hidden in a drawing.',3),
 q('Which solid can be made from this net?'+cubenet(),'Cube.','The six equal squares fold into its six faces.'),
 q('A pupil says a cuboid has eight faces because it has eight corners. Correct the statement.','It has 6 faces and 8 vertices.','A face is a flat surface; a vertex is a corner.'),
 q('Can a cube be called a prism? Explain.','Yes.','It has two parallel congruent square end faces, with square side faces.'),
 q('Name two shapes that can be faces of a cuboid.','Rectangles and squares.','Every face is a rectangle, and some may be squares depending on the dimensions.'),
 q('Sketch a different valid cube net from the one above.','Any arrangement of six equal squares that folds into a cube.','Check that all six faces close without overlapping. A row of six squares is not valid.',3),
 q('A cube is turned so a different face is on top. Do its numbers of faces, edges or vertices change?','No.','Turning a solid changes its view, not its properties.'),
 q('A box has six equal square faces. What solid is it?', 'Cube.','All faces of a cube are congruent squares.',1),
 q('Explain why a flat drawing of a box may not show all its edges.','Some edges are hidden behind faces.','Perspective drawings can use dashed lines for hidden edges.')]
 if g>=5:
  qs[2]=q('Name the solid made by folding this net.'+pyramidnet(),'Square-based pyramid.','A square base is joined to four triangular side faces.')
  qs[4]=q('How many faces, edges and vertices does a square-based pyramid have?','5 faces, 8 edges, 5 vertices.','There are 4 base edges, 4 sloping edges and 1 apex above the 4 base vertices.',3)
  qs[5]=q('How many triangular faces does a triangular-based pyramid have?',4,'Its base is a triangle, with three more triangular faces meeting at the apex.',1)
  qs[6]=q('Sketch a net of a triangular-based pyramid.','Four triangles: one central triangle with a triangle joined along each of its three edges.','Use matching side lengths so that the outer triangles can meet.',3)
  qs[8]=q('A pupil says all pyramids have square bases. Is this true? Give an example.','No. A triangular-based pyramid has a triangular base.','A pyramid has a polygonal base; the base need not be square.')
 if g==6:
  qs[0]=q('Name the solid made by this net.'+prismnet(),'Triangular prism.','It has two congruent triangular ends and three rectangular side faces.')
  qs[1]=q('State the faces, edges and vertices of a triangular prism.','5 faces, 9 edges, 6 vertices.','Each triangular end has three vertices; three edges join the matching vertices.',3)
  qs[3]=q('A pupil says a triangular prism and a triangular-based pyramid are the same solid. Explain the difference.','The prism has two triangular ends and three rectangular faces; the pyramid has four triangular faces.','Compare their faces and numbers of vertices.')
  qs[5]=q('Name the polyhedron with eight triangular faces, six vertices and twelve edges.','Octahedron.','Its eight faces are triangles.',1)
  qs[7]=q('Sketch a net of a triangular prism.','Three rectangles joined in a strip, with two matching triangles attached at suitable outer edges.','The triangle side lengths must match the rectangle widths; folding must close the solid without overlap.',3)
  qs[6]=q('Is a cylinder a polyhedron? Explain.','No.','A polyhedron has only flat polygonal faces; a cylinder has a curved surface.')
  qs[8]=q('A solid has four triangular faces and four vertices. Name it.','Tetrahedron (triangular-based pyramid).','The four triangles enclose the solid.',1)
 return qs

def areas(g):
 gridbody=''.join(rect(20+c*24,15+r*24,24,24,'#dcefeb' if not(r==0 and c>=3) else 'white') for r in range(3) for c in range(5))
 sq=svg(gridbody+txt(80,110,'1 square = 1 cm²'),180,125,'A 5 by 3 grid with 13 shaded unit squares')
 qs=[q('Find the shaded area by counting unit squares.'+sq,'13 cm²','There are 3 shaded squares in the top row and 5 in each of the other two rows: 3 + 5 + 5 = 13.'),
 q('A regular hexagon has side length 4 cm. Find its perimeter.','24 cm','Six equal sides: 6 × 4 = 24.'),
 q('A polygon has consecutive side lengths 4, 3, 5, 2 and 6 cm. Find its perimeter.','20 cm','Add every boundary side: 4 + 3 + 5 + 2 + 6 = 20.'),
 q('A regular polygon has perimeter 35 cm and side length 5 cm. How many sides does it have?',7,'35 ÷ 5 = 7 equal sides.'),
 q('A rectangular floor is 6 m by 4 m. Find its area and perimeter.','Area: 24 m². Perimeter: 20 m.','Area = 6 × 4. Perimeter = 2 × (6 + 4).',3),
 q('A pupil finds a garden perimeter by multiplying its length and width. Explain the error.','Multiplication finds rectangular area, not perimeter.','Perimeter is the sum of the boundary lengths.'),
 q('A rectangle has perimeter 30 cm. Its length is 9 cm. Find its width.','6 cm','One length plus one width = 30 ÷ 2 = 15; width = 15 − 9 = 6.'),
 q('Draw two different rectangles with whole-number side lengths and area 12 cm². Find their perimeters.','Examples: 3 by 4 cm has perimeter 14 cm; 2 by 6 cm has perimeter 16 cm.','Equal areas can have different perimeters. Accept other correct factor pairs.',3),
 q('A 4 m by 3 m mat is placed on a 6 m by 5 m floor. Find the uncovered area.','18 m²','Floor: 6 × 5 = 30 m². Mat: 4 × 3 = 12 m². Uncovered: 30 − 12 = 18 m².'),
 q('A 3 cm by 2 cm rectangle covers a surface with no gaps. Could equal circular discs cover a plane with no gaps? Explain.','No.','Equal circular discs leave gaps between them; rectangles can tessellate.')]
 if g==5:
  qs[7]=q('List all rectangles with whole-number side lengths and area 24 cm², ignoring turned copies. Which has the smallest perimeter?','1×24, 2×12, 3×8 and 4×6 cm. The 4×6 rectangle has smallest perimeter, 20 cm.','Their perimeters are 50, 28, 22 and 20 cm respectively.',3)
 if g==6:
  tri=svg('<polygon points="35,105 195,105 35,25" fill="#dcefeb" stroke="#235d68" stroke-width="2"/>'+txt(115,130,'8 cm')+'<text x="15" y="70" text-anchor="middle" transform="rotate(-90 15 70)">5 cm</text>'+'<path d="M35 92 H48 V105" fill="none" stroke="#235d68"/>',240,145,'A right triangle with perpendicular sides 8 cm and 5 cm')
  qs[0]=q('Find the area of the right-angled triangle.'+tri,'20 cm²','Area = half × base × perpendicular height = '+frac(1,2)+' × 8 × 5 = 20 cm².')
  qs[3]=q('A right triangle has area 30 cm² and base 10 cm. Find its perpendicular height.','6 cm','Base × height = 2 × 30 = 60; height = 60 ÷ 10 = 6 cm.')
  qs[5]=q('A pupil says a triangle with base 6 cm and height 4 cm has area 24 cm². Explain and correct the error.','12 cm²','The pupil omitted the factor of one half. Half × 6 × 4 = 12.')
  qs[7]=q('A cuboid measures 4 cm by 3 cm by 2 cm. Find the total area of its six faces.','52 cm²','Two faces of each size: 2 × (4×3 + 4×2 + 3×2) = 2 × 26 = 52.',3)
  qs[8]=q('A sign is made from a 6 cm by 4 cm rectangle and a right triangle with base 6 cm and height 3 cm. They share an edge and do not overlap. Find the total area.','33 cm²','Rectangle: 24 cm². Triangle: half × 6 × 3 = 9 cm². Total = 33 cm².')
 return qs

def volume(g):
 return [q('A box contains 12 unit cubes in each layer and has 4 complete layers. Find its volume.','48 cubic units','12 × 4 = 48.',2,{'op':'*','a':12,'b':4,'result':48}),
 q('A rectangular box measures 8 cm by 5 cm by 3 cm. Find its volume.','120 cm³','Volume = length × width × height = 8 × 5 × 3 = 120.'),
 q('A cube has side length 4 cm. Find its volume.','64 cm³','4 × 4 × 4 = 64.'),
 q('A cuboid has volume 180 cm³ and a base 6 cm by 5 cm. Find its height.','6 cm','Base area = 30 cm²; height = 180 ÷ 30 = 6 cm.'),
 q('A pupil says volume is measured in cm². Correct the unit and explain.','cm³','Volume counts cubic units in three dimensions; cm² measures area.'),
 q('A crate is 12 cm long, 8 cm wide and 6 cm high. How many cubes of side 2 cm fit exactly, with edges parallel to the crate?',72,'There are 6 × 4 × 3 = 72 cubes.'),
 q('Two boxes have volumes 5×4×3 cm³ and 6×5×2 cm³. Which holds more?','They have equal volume: 60 cm³.','Both products equal 60, even though the dimensions differ.'),
 q('A tank has base area 40 cm². Water is 7 cm deep. Find the volume of water.','280 cm³','Base area × depth = 40 × 7 = 280.'),
 q('A model has 36 unit cubes in 3 equal layers. How many cubes are in one layer?',12,'36 ÷ 3 = 12.'),
 q('A cube has side 3 cm. Another has side 6 cm. Is the second volume only twice the first? Explain.','No. It is eight times as large.','Volumes are 27 cm³ and 216 cm³. Then 216 ÷ 27 = 8.',3)]

def circles(g):
 diagram=svg('<circle cx="100" cy="80" r="58" fill="white" stroke="#235d68" stroke-width="2"/>'+line(42,80,158,80)+txt(100,73,'O')+txt(27,84,'A')+txt(173,84,'B'),205,160,'Circle with centre O and diameter AB')
 return [q('In the diagram, name a radius and a diameter.'+diagram,'Radius: OA or OB. Diameter: AB.','A radius joins the centre to the circle; a diameter crosses the centre from edge to edge.'),
 q('A circle has radius 7 cm. Find its diameter.','14 cm','Diameter = 2 × radius = 2 × 7.'),
 q('A circle has diameter 20 cm. Find its radius.','10 cm','Radius = diameter ÷ 2.'),
 q('Find the circumference of a circle of diameter 14 cm. Use π = '+frac(22,7)+'.','44 cm','Circumference = π × diameter = '+frac(22,7)+' × 14 = 44 cm.'),
 q('A pupil uses 2 × π × diameter for circumference. Explain the error.','The factor 2 belongs with the radius, not the diameter.','Use π × diameter, or 2 × π × radius.'),
 q('A wheel has radius 21 cm. How far does it travel in one complete rotation? Use π = '+frac(22,7)+'.','132 cm','One rotation travels one circumference: 2 × '+frac(22,7)+' × 21 = 132 cm.'),
 q('A circular track has circumference 62.8 m. Use π = 3.14 to find its diameter.','20 m','Diameter = circumference ÷ π = 62.8 ÷ 3.14 = 20.'),
 q('A circular plate is 10 cm across through its centre. Estimate its circumference using π ≈ 3.','About 30 cm','The given length is the diameter, so circumference ≈ 3 × 10.'),
 q('What is a sector of a circle? Sketch one.','A region bounded by two radii and the arc joining their ends.','A “slice” extending from the centre to the circumference.'),
 q('Two circles have radii 3 cm and 6 cm. How do their circumferences compare?','The second circumference is twice the first.','Circumference = 2πr, so doubling the radius doubles the circumference.')]

def scale(g):
 return [q('On a map, 1 cm represents 2 km. Two towns are 4.5 cm apart. Find the actual distance.','9 km','4.5 × 2 = 9.'),
 q('A plan uses 1 cm for 3 m. A room is 12 m long. How long is it on the plan?','4 cm','12 ÷ 3 = 4.'),
 q('A line on a map is 6 cm long and represents 30 km. Complete: 1 cm represents ___ km.','5 km','30 ÷ 6 = 5.'),
 q('A pupil adds the scale 4 km to a map distance of 3 cm and gets 7 km. Correct the method if 1 cm represents 4 km.','12 km','Multiply 3 × 4; do not add unlike units.'),
 q('A classroom plan uses 1 cm for 2 m. Its drawing is 4 cm by 3 cm. Find the real dimensions.','8 m by 6 m','Multiply both lengths by 2.'),
 q('A route has two map segments measuring 2.5 cm and 3.5 cm. If 1 cm represents 5 km, find the total route length.','30 km','Total on map = 6 cm; actual length = 6 × 5 = 30 km.'),
 q('A plan uses 1:100. What actual length does 7 cm represent?','7 m','7 × 100 = 700 cm = 7 m.'),
 q('A path is 18 km long. Draw a straight segment representing it at 1 cm to 3 km.','A segment 6 cm long.','18 ÷ 3 = 6. Use a ruler.'),
 q('Two maps use 1 cm to 2 km and 1 cm to 5 km. Which shows a 10 km road as a longer line?','The 1 cm to 2 km map.','It uses 5 cm; the other uses 2 cm.'),
 q('A square garden has side 5 cm on a plan where 1 cm represents 4 m. Find its actual perimeter.','80 m','Actual side = 5 × 4 = 20 m; perimeter = 4 × 20 = 80 m.')]

def speed(g):
 return [q('A bus travels 120 km in 3 hours. Find its average speed.','40 km/h','Speed = distance ÷ time = 120 ÷ 3.'),
 q('A bicycle travels at a steady 15 km/h for 2 hours. Find the distance.','30 km','Distance = speed × time = 15 × 2.'),
 q('A car travels 180 km at an average speed of 60 km/h. Find the time taken.','3 hours','Time = distance ÷ speed = 180 ÷ 60.'),
 q('A runner covers 600 m in 120 seconds. Find the average speed in m/s.','5 m/s','600 ÷ 120 = 5.'),
 q('A pupil says a 90 km journey at 30 km/h takes 0.33 hours. Correct the calculation.','3 hours','Divide distance by speed: 90 ÷ 30 = 3, not 30 ÷ 90.'),
 q('A walker covers 6 km in 1 hour 30 minutes. Find the average speed in km/h.','4 km/h','1 hour 30 minutes = 1.5 hours; 6 ÷ 1.5 = 4.'),
 q('Two cyclists cover 20 km. One takes 1 hour and the other takes 2 hours. Which has greater average speed?','The first cyclist: 20 km/h rather than 10 km/h.','For the same distance, less time means greater average speed.'),
 q('A train travels at 80 km/h for 45 minutes. Find the distance.','60 km','45 minutes = '+frac(3,4)+' hour. Then 80 × '+frac(3,4)+' = 60.'),
 q('A bus travels 40 km in the first hour and 60 km in the second hour. Find its average speed for the full journey.','50 km/h','Total distance = 100 km; total time = 2 hours; average = 100 ÷ 2.'),
 q('A vehicle travels 150 km in 2.5 hours. Is its average speed above a 50 km/h target? Explain.','Yes: 60 km/h','150 ÷ 2.5 = 60, which is above 50.')]

def patterns(g):
 return [q('Write the next two terms: 7, 12, 17, 22, …','27, 32','Add 5 each time.'),
 q('Find the missing term: 81, 72, ___, 54, 45.',63,'Subtract 9 each time.'),
 q('A pattern begins at 3 and multiplies by 2 each time. Write its first five terms.','3, 6, 12, 24, 48','Apply the same rule to each previous term.'),
 q('A pupil says the next term after 2, 4, 8, 16 is 18. Explain the likely mistake and give the next term.',32,'The pattern doubles each term; adding 2 does not continue that rule.'),
 q('A border uses 4 tiles for figure 1, 7 for figure 2 and 10 for figure 3. If this rule continues, how many for figure 6?',19,'Add 3 for each new figure: 13, 16, 19.'),
 q('Complete the rule: input 1, 2, 3, 4 gives output 5, 8, 11, 14.','Multiply the input by 3, then add 2.','Check: 1×3+2=5 and 4×3+2=14.'),
 q('Use that rule to find the output for input 10.',32,'3 × 10 + 2 = 32.'),
 q('A pattern follows “multiply by 4, then add 1”. Which input gives output 29?',7,'Work backwards: (29 − 1) ÷ 4 = 7.'),
 q('A row of joined squares uses 4 sticks for one square and adds 3 sticks for each new square. How many sticks for 8 squares?',25,'4 + 7×3 = 25, or 3×8 + 1 = 25.'),
 q('A pupil gives the rule “add 4” for the sequence 4, 8, 12. Could another rule fit just these three values? Explain.','Yes; three terms do not uniquely fix every possible continuation.','“Add 4 each time” is a simple consistent rule, but a stated rule or more information is needed to guarantee later terms.')]

def expressions(g):
 return [q('Write an expression for 5 more than a number n.','n + 5','“More than” indicates addition.',1),
 q('A notebook costs c dollars. Write an expression for the cost of 4 notebooks.','4c dollars','Four equal costs are multiplied by 4.',1),
 q('Find 3n + 2 when n = 6.',20,'3 × 6 + 2 = 18 + 2 = 20.'),
 q('A pupil replaces 2a with 2 + a. Explain the mistake.','2a means 2 × a, not 2 + a.','Juxtaposition of the coefficient and variable means multiplication.'),
 q('Use P = 2l + 2w to find P when l = 7 and w = 3.',20,'P = 2×7 + 2×3 = 14 + 6 = 20.'),
 q('Write an expression for a number p shared equally among 5 people.',frac('p',5),'Divide p by 5.'),
 q('Which is greater when x = 4: x + 8 or 3x?','They are equal: both are 12.','4 + 8 = 12 and 3 × 4 = 12.'),
 q('A taxi charges a fixed $100 plus $40 for each kilometre k. Write a cost formula.','C = 100 + 40k','Add the fixed charge to the distance charge.'),
 q('Use your formula to find the taxi cost for 3 km.','$220','100 + 40 × 3 = 220.'),
 q('Choose a whole number x to make x + 3 < 9 true. Give two possible values.','For example 0 and 5; any two distinct whole numbers from 0 to 5.','The inequality requires x < 6.')]

def equations(g):
 qs=[q('Find the missing number: n + 17 = 42.',25,'Subtract 17 from both sides: n = 42 − 17 = 25.'),
 q('Solve p − 9 = 26.',35,'Add 9 to both sides: p = 35.'),
 q('Three equal packs contain 24 cards altogether. Write an equation and solve it.','3x = 24; x = 8 cards','Divide 24 by the three equal packs.'),
 q('A pupil solves x + 8 = 20 by writing x = 28. Correct the error.',12,'Subtract 8 from 20 rather than adding it.'),
 q('A number multiplied by 4, then increased by 3, gives 31. Find the number.',7,'Reverse the steps: (31 − 3) ÷ 4 = 7.'),
 q('Solve '+frac('x',5)+' = 6.',30,'Multiply both sides by 5.'),
 q('Choose an operation sign to make 8 □ 4 = 32 true.','×','8 × 4 = 32.',1),
 q('A box and 7 extra pencils contain 25 pencils altogether. How many are in the box?',18,'x + 7 = 25, so x = 18.'),
 q('Check whether n = 5 solves 2n + 4 = 14.','Yes.','2 × 5 + 4 = 10 + 4 = 14.'),
 q('A total of $90 is shared equally among some pupils. Each receives $15. How many pupils are there?',6,'15n = 90, so n = 90 ÷ 15 = 6.')]
 if g==5:
  qs[5]=q('Solve x + '+frac(1,4)+' = '+frac(3,4)+'.',frac(1,2),'Subtract one quarter from both sides: '+frac(3,4)+' − '+frac(1,4)+' = '+frac(1,2)+'.')
  qs[8]=q('Solve x − '+frac(1,2)+' = '+frac(5,4)+'.',frac(7,4),'Add one half to both sides: '+frac(5,4)+' + '+frac(2,4)+' = '+frac(7,4)+'.')
 return qs

def graphs(g):
 qs=[q('The graph shows library visits. How many visits were made on Tuesday?'+bargraph(),'10 visits','Read the height of the Tuesday bar against the vertical scale.',1),
 q('Find the total visits shown for Monday, Tuesday and Wednesday.'+bargraph(),'24 visits','6 + 10 + 8 = 24.'),
 q('How many more books did Blue collect than Red?'+pictograph(),'4 books','Blue: 5×2 = 10. Red: 3×2 = 6. Difference = 4.'),
 q('A pupil counts the five circles in Blue’s row as five books. Explain the error.'+pictograph(),'The row represents 10 books.','The key says each circle represents 2 books.'),
 q('The pie chart represents 40 pupils. How many walk?'+piechart(),'20 pupils','Walk occupies one half of the circle, so half of 40 is 20.'),
 q('How many of these 40 pupils travel by bus?'+piechart(),'10 pupils','Bus occupies one quarter of the circle, so 40 ÷ 4 = 10.'),
 q('The line graph shows temperature in °C. Between which two readings did the temperature stay the same?'+linegraph(),'10 a.m. to 11 a.m.','Both readings are 15°C; the joining segment is horizontal.'),
 q('Draw a bar graph for these fruit choices: mango 8, orange 6, banana 10. Label the axes.','Three bars of heights 8, 6 and 10 with the given category labels.','Use equal bar widths and gaps, a consistent scale starting at 0, and labelled axes.',3),
 q('Make a pictograph for 12 red, 8 blue and 6 green counters. Use one symbol for two counters.','Red: 6 symbols; blue: 4; green: 3.','Include the key “one symbol represents 2 counters”.',3),
 q('A pupil draws bars for values 4 and 8 but begins the vertical axis at 3. Why might that make a comparison misleading?','The visible bar lengths exaggerate their ratio.','With a zero baseline, the bar for 8 is twice the height of the bar for 4.')]
 if g==5:
  out=line(35,25,35,135)+line(35,135,285,135)+rect(35,3,10,10,'#75b8a9')+txt(50,18,'Class A','start')+rect(150,3,10,10,'#d6b35f')+txt(165,18,'Class B','start')
  for v in range(0,13,2):out+=line(35,135-v*8,285,135-v*8,'opacity=".2"')+txt(22,139-v*8,str(v))
  for i,(name,a,b) in enumerate([('Mon',6,8),('Tue',10,4),('Wed',8,10)]):out+=rect(60+i*75,135-a*8,20,a*8,'#75b8a9')+rect(82+i*75,135-b*8,20,b*8,'#d6b35f')+txt(80+i*75,155,name)
  chart=svg(out,300,170,'Double bar graph of library visits for two classes')
  qs[1]=q('The graph compares library visits. How many visits did both classes make on Tuesday altogether?'+chart,14,'Class A: 10. Class B: 4. Total = 10 + 4 = 14.')
  qs[6]=q('On which day did Class B make four more visits than Class A?'+chart,'None of the three days.','Differences B minus A are 2, −6 and 2. Do not assume every question has a matching day.')
 return qs

def stemleaf(g):
 plot='<table><tr><th>Stem</th><th>Leaves</th></tr><tr><td>1</td><td>2 4 4 8</td></tr><tr><td>2</td><td>0 1 5</td></tr><tr><td>3</td><td>2 6</td></tr></table><p>Key: stem 1, leaf 2 means 12 minutes.</p>'
 return [q('How many times are recorded in the plot?'+plot,9,'Count every leaf: 4 + 3 + 2 = 9.'),
 q('Find the smallest and largest recorded times.'+plot,'12 minutes and 36 minutes.','Combine each stem with the smallest or largest leaf.'),
 q('Find the range of the times.'+plot,'24 minutes','36 − 12 = 24.'),
 q('How many times are less than 20 minutes?'+plot,4,'The four leaves on stem 1 represent 12, 14, 14 and 18.'),
 q('A pupil reads stem 2, leaf 5 as 2.5 minutes. Correct the reading.'+plot,'25 minutes','The key shows the stem is the tens digit and the leaf is the units digit.'),
 q('Find the mode of the times.'+plot,'14 minutes','14 occurs twice; every other time occurs once.'),
 q('Find the median of the times.'+plot,'20 minutes','With nine ordered values, the fifth value is the median.'),
 q('Draw a stem-and-leaf plot for 13, 15, 18, 21, 21, 27, 30. Include a key.','1: 3 5 8; 2: 1 1 7; 3: 0. Key 1|3 = 13.','Use tens as stems, order leaves and retain repeated values.',3),
 q('Add a time of 24 minutes to the original plot. In which row does it go, and where among the leaves?'+plot,'Stem 2: leaves become 0 1 4 5.','The new leaf 4 belongs between 1 and 5.'),
 q('Compare two days: day A times are 10, 15, 20; day B times are 15, 20, 25. Describe the change.','Every corresponding time on day B is 5 minutes longer.','The full pattern has shifted upward by 5 minutes.')]

def averages(g):
 return [q('Find the mean of 4, 6, 8, 10 and 12.',8,'Total = 40; mean = 40 ÷ 5 = 8.'),
 q('Find the median of 7, 2, 9, 4, 6.',6,'Order: 2, 4, 6, 7, 9; the middle value is 6.'),
 q('Find the mode of 3, 5, 5, 6, 8.',5,'5 occurs most often.',1),
 q('Find the range of 12, 18, 10, 25, 16.',15,'25 − 10 = 15.'),
 q('A pupil finds the mean of 2, 4, 6 by dividing the total by 2. Explain and correct the mistake.',4,'There are three values. Divide 12 by 3, not by 2.'),
 q('Four pupils score 6, 8, 10 and 12. Find the median.',9,'The middle two ordered values are 8 and 10. Their mean is 9.'),
 q('A set of three numbers has mean 7. Two numbers are 5 and 8. Find the third.',8,'The total is 3 × 7 = 21. The missing number is 21 − 5 − 8 = 8.'),
 q('Write a set of five whole numbers whose mode is 4 and whose range is 6.','For example: 1, 4, 4, 5, 7.','4 occurs more often than any other value; 7 − 1 = 6. Accept any valid set.',3),
 q('Set A is 4, 6, 8. Set B is 2, 6, 10. Do equal means imply equal ranges?','No. Both means are 6; ranges are 4 and 8.','Calculate each mean and range before comparing.'),
 q('Five pupils each read 8 pages. Find the mean, median and mode.','Mean = 8; median = 8; mode = 8.','All five values are the same.',3)]

def probability(g):
 qs=[q('A bag contains only red counters. Describe the chance of taking a blue counter without looking.','Impossible.','There are no blue counters in the bag.',1),
 q('A bag contains 8 yellow and 2 green counters. Which colour is more likely to be selected without looking?','Yellow.','There are more yellow counters than green counters.',1),
 q('A fair coin is tossed once. List all possible outcomes.','Heads and tails.','Both outcomes are equally likely.',1),
 q('A fair six-sided die is rolled. Is an even number or an odd number more likely?','They are equally likely.','Even: 2, 4, 6; odd: 1, 3, 5. Each has three outcomes.'),
 q('A pupil says that after three heads in a row, a fair coin must next show tails. Explain.','Tails is not guaranteed.','Each new toss still has equally likely heads and tails.'),
 q('Choose a word: getting a number less than 7 on a fair six-sided die is impossible, unlikely or certain.','Certain.','All possible results 1 to 6 are less than 7.',1),
 q('Design a bag of 10 counters where red is more likely than blue, and both colours are possible.','For example: 7 red and 3 blue.','Use more than 5 red counters but fewer than 10. Accept any valid design.'),
 q('A bag contains 5 red and 5 blue counters. A counter is selected and replaced before each new selection. Will exactly 5 of the next 10 selections have to be red?','No.','Equal chances do not guarantee exact counts in a short experiment.'),
 q('List the possible sums when a fair coin labelled 1 and 2 on its two sides is tossed and a counter labelled 3 is added.','4 and 5.','Possible totals are 1 + 3 and 2 + 3.'),
 q('Describe an experiment you could use to check whether a coin appears fair.','Toss it many times, recording heads and tails.','Compare counts over many trials; small differences alone do not prove unfairness.')]
 if g>=5:
  qs[0]=q('A bag has 3 red and 7 blue counters. One is taken at random. Find the probability of red.',frac(3,10),'There are 3 favourable outcomes out of 10 equally selectable counters.')
  qs[1]=q('Find the probability of a number greater than 4 on a fair six-sided die.',frac(1,3),'Favourable results: 5 and 6. Probability = '+frac(2,6)+' = '+frac(1,3)+'.')
  qs[2]=q('Two fair coins are tossed. List all ordered outcomes.','HH, HT, TH, TT.','The first and second positions distinguish the two coins.',2)
  qs[3]=q('Find the probability of exactly one head when two fair coins are tossed.',frac(1,2),'HT and TH are two of four equally likely ordered outcomes.')
  qs[5]=q('A pupil writes a probability of 1.4. Explain why this cannot be a valid probability.','Probabilities lie between 0 and 1 inclusive.','1 means certain; a probability cannot exceed certainty.')
  qs[6]=q('A bag has 12 counters. The probability of red is '+frac(1,4)+'. How many are red?',3,'One quarter of 12 = 3.')
  qs[8]=q('A fair die is rolled. Find the probability of getting neither 1 nor 6.',frac(2,3),'Results 2, 3, 4 and 5 qualify: '+frac(4,6)+' = '+frac(2,3)+'.')
 return qs

# Written topic coverage, grouped at a useful classroom-pack granularity.
common=[
 ('sets','Sets & membership','Number','Listing and describing sets; finite, infinite and empty sets; unions and intersections in Grade 6.',sets),
 ('whole-operations','Whole-number problem solving','Number','All four operations, remainder decisions, inverse reasoning and operation properties.',operations),
 ('fraction-operations','Calculating with fractions','Number','Like denominators in Grade 4; unlike denominators and products in Grade 5; division in Grade 6.',fraction_ops),
 ('decimals','Decimals & calculation','Number','Decimal place value, ordering, calculations, powers of ten and reverse problems.',decimals),
 ('units','Metric measures & conversions','Measurement','Length, mass and capacity in Grades 4-5; area units in Grade 6.',units),
 ('time','Time & timetables','Measurement','Clock reading, conversion, elapsed time, reverse time and 24-hour problems.',time),
 ('area-shapes','Area & polygon boundaries','Measurement','Grid areas, regular and irregular perimeters, missing sides and area investigations.',areas),
 ('angles-lines','Angles & lines','Geometry','Right-angle benchmarks, lines and orientation; protractor measurement and drawing from Grade 5.',angles_lines),
 ('position','Symmetry, position & movement','Geometry','Symmetry, grid locations, directions and turns; coordinates and reflection in Grade 6.',position),
 ('solids','Solids & nets','Geometry','Cubes and cuboids in Grade 4; pyramids in Grade 5; prisms and polyhedra in Grade 6.',solids),
 ('patterns','Patterns & rules','Algebra','Numerical and geometric patterns, tables, predictions and reverse rules.',patterns),
 ('expressions','Expressions & substitution','Algebra','Writing expressions, substituting one or two variables, formulae and inequalities.',expressions),
 ('equations','Equations & missing numbers','Algebra','Worded equations, inverse operations, checking solutions and operation choice.',equations),
 ('graphs','Graphs & data displays','Statistics and Probability','Read and construct bar graphs and pictographs; interpret pie and line graphs.',graphs),
 ('probability','Chance & probability','Statistics and Probability','Qualitative likelihood in Grade 4; sample spaces and numerical probability in Grades 5-6.',probability)
]
page_map={4:{'Number':[10],'Measurement':[10,11],'Geometry':[11,12],'Algebra':[12],'Statistics and Probability':[12]},5:{'Number':[14,15,16],'Measurement':[16,17,18],'Geometry':[18,19,20],'Algebra':[20],'Statistics and Probability':[21]},6:{'Number':[23,24],'Measurement':[24,25],'Geometry':[25],'Algebra':[25,26],'Statistics and Probability':[26]}}
for g in [4,5,6]:
 for key,title,strand,focus,fn in common:add(g,key,title,strand,focus,fn(g),page_map[g][strand])
 if g<6:
  for key,title,strand,focus,fn in [
   ('place-value','Place value & rounding','Number','Reading, writing, ordering and rounding large whole numbers.',place),
   ('fraction-comparison','Comparing fractions','Number','Equivalence, benchmarks, ordering and the importance of the reference whole.',compare_fractions),
   ('temperature','Temperature & change','Measurement','Reading a scale, differences and recovering temperatures; negative values in Grade 5.',temperature),
   ('plane-shapes','Polygons & shape properties','Geometry','Triangles, quadrilaterals, parallel sides, vertices and rotated shapes.',plane_shapes),
   ('averages','Averages & range','Statistics and Probability','Mean, median and mode; range and simple reverse data questions.',averages)]:add(g,key,title,strand,focus,fn(g),page_map[g][strand])
 if g>=5:add(g,'factors','Factors, multiples & powers','Number','Number types, factors and multiples; prime factorisation and powers in Grade 6.',factors(g),page_map[g]['Number'])
 if g==6:
  for key,title,strand,focus,fn in [
   ('volume','Volume & unit cubes','Measurement','Layers, cuboid formulae, missing dimensions and packing cubes.',volume),
   ('circles','Circles & circumference','Measurement','Circle parts, diameter-radius relationships, circumference and reverse calculations.',circles),
   ('scale','Scale drawings & maps','Measurement','Interpreting scales, actual lengths, plan lengths and consistent units.',scale),
   ('speed','Distance, time & speed','Measurement','Each of the three quantities, time conversion and average-speed reasoning.',speed),
   ('similar','Similarity & congruence','Geometry','Matching shape and size, corresponding sides, enlargement and counterexamples.',similar),
   ('stem-leaf','Stem-and-leaf & data reasoning','Statistics and Probability','Reading, constructing and interpreting ordered data displays.',stemleaf)]:add(g,key,title,strand,focus,fn(g),page_map[g][strand])
add(6,'fraction-decimal-percent','Fractions, decimals & percentages','Number','Convert among the three forms and compare values; percentages of sets and ratios.',[
 q('Write 35% as a fraction in simplest form and as a decimal.',frac(7,20)+'; 0.35','35% = 35 hundredths. Simplify '+frac(35,100)+' by dividing both parts by 5.',2),
 q('Write '+frac(3,8)+' as a decimal and a percentage.','0.375; 37.5%','3 ÷ 8 = 0.375; multiply the decimal by 100 for a percentage.',2),
 q('Complete: 0.6 = ___%.',60,'0.6 × 100 = 60.',1),
 q('Write 125% as a fraction in simplest form.',frac(5,4),'125% = '+frac(125,100)+' = '+frac(5,4)+'.'),
 q('A pupil writes 0.08 = 80%. Explain and correct the error.','0.08 = 8%','Eight hundredths is eight per hundred, not eighty per hundred.'),
 q('12 out of 40 pupils walk to school. What percentage is this?', '30%','12 ÷ 40 × 100 = 30.'),
 q('The ratio of red to blue counters is 1 : 3. What percentage of all counters is red?','25%','Red is one of four total parts: '+frac(1,4)+' = 25%.'),
 q('Order '+frac(1,2)+', 45% and 0.55 from least to greatest.','45%, '+frac(1,2)+', 0.55','Compare 45%, 50% and 55%.'),
 q('Which is greater: 0.075 or 7.5%? Explain.','They are equal.','7.5 ÷ 100 = 0.075.'),
 q('A pupil says a percentage can never exceed 100%. Give a numerical counterexample.','150% = '+frac(3,2)+' = 1.5','A percentage above 100 represents more than one reference whole.')
],[23,24])
source['sources'].insert(0,{'title':'NSC Grades 4-6 curriculum analysis and essential objectives, second edition (2021), mathematics pages 10-26','url':'https://educate.gov.jm/wp-content/uploads/2021/10/2nd-Edition_-Curriculum-Analysis-Essential-Objectives-Grades-4-6-_-Sept-2021.pdf#page=17'})
source['coverageNote']='Topic packs span all five mathematics strands in Grades 4-6, based on the published 2021 essential-objective guide. This is written topic practice, not a complete PEP mock, an Ability Test, or certification that every curriculum objective has been assessed. Practical estimating, real-object measurement, physical net construction and chance experiments still need classroom activity. Grade labels guide teaching selection; use current school and assessment requirements.'
assert len({p['id'] for p in source['packs']})==len(source['packs'])
# Isolate literal currency in text nodes so paired dollar amounts cannot be parsed as TeX.
def currency(value):return re.sub(r'\$\d[\d,]*(?:\.\d+)?',lambda m:'<span class="currency">'+m[0]+'</span>',value)
for p in source['packs']:
 for v in p['questions']:
  assert v['question'] and v['answer'] and v['steps']
  for field in ['question','answer']:v[field]=currency(v[field])
  v['steps']=[currency(x) for x in v['steps']]
  if 'options' in v:v['options']=[currency(x) for x in v['options']]

source['packs'].sort(key=lambda p:(p['grade'],['Number','Measurement','Geometry','Algebra','Statistics and Probability'].index(p['strand']),p['title']))
(ROOT/'data/primary-packs/source.json').write_text(json.dumps(source,indent=2,ensure_ascii=False)+'\n')
print(f"Authored {len(source['packs'])} packs and {sum(len(p['questions']) for p in source['packs'])} questions across all five strands.")
