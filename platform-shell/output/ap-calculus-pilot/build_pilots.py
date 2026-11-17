"""Original AP-aligned review artifacts only; no application or database changes."""
from pathlib import Path
import json, math, re
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
ROOT=Path(__file__).resolve().parents[2]; OUT=ROOT/'output/pdf'; OUT.mkdir(exist_ok=True)
for n,f in [('Body','Georgia.ttf'),('Bold','Georgia Bold.ttf'),('Italic','Georgia Italic.ttf'),('UI','Arial.ttf'),('UIB','Arial Bold.ttf')]:
 pdfmetrics.registerFont(TTFont(n,'/System/Library/Fonts/Supplemental/'+f))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='Bold',italic='Italic',boldItalic='Bold')
pdfmetrics.registerFontFamily('UI',normal='UI',bold='UIB',italic='UI',boldItalic='UIB')
W,H=595.276,841.89; L=43; R=W-43; CW=R-L
TEAL=colors.HexColor('#146d65'); INK=colors.HexColor('#203b43'); MUTED=colors.HexColor('#596b72'); PALE=colors.HexColor('#eaf4f1'); GOLD=colors.HexColor('#dca953')
styles={
 'body':ParagraphStyle('body',fontName='Body',fontSize=11.4,leading=16,textColor=INK),
 'small':ParagraphStyle('small',fontName='UI',fontSize=9.2,leading=12.5,textColor=MUTED),
 'hint':ParagraphStyle('hint',fontName='UI',fontSize=10,leading=14,textColor=INK),
 'title':ParagraphStyle('title',fontName='UIB',fontSize=21,leading=25,textColor=INK),
 'sub':ParagraphStyle('sub',fontName='UIB',fontSize=12,leading=17,textColor=TEAL),
 'cell':ParagraphStyle('cell',fontName='UI',fontSize=9,leading=12,textColor=INK),
 'math':ParagraphStyle('math',fontName='Body',fontSize=11.5,leading=17,textColor=INK),
}

def p(c,text,x,y,width=CW,style='body'):
 obj=Paragraph(text,styles[style]);_,h=obj.wrap(width,1000);obj.drawOn(c,x,y-h);return y-h

def mathline(c,text,x,y,width=CW):
 """Render [[numerator|denominator]] as stacked fractions, never raw LaTeX."""
 parts=re.split(r'(\[\[.*?\|.*?\]\])',text);items=[];height=23
 for part in parts:
  if not part:continue
  if part.startswith('[['):
   a,b=part[2:-2].split('|');pa,pb=Paragraph(a.replace(' ','&#160;'),styles['math']),Paragraph(b.replace(' ','&#160;'),styles['math']);wa=pa.minWidth();wb=pb.minWidth();ww=max(wa,wb)+10;ha=pa.wrap(ww,1000)[1];hb=pb.wrap(ww,1000)[1];height=max(height,ha+hb+8);items.append(('f',pa,pb,ww,ha,hb))
  else:
   q=Paragraph(part.replace(' ','&#160;'),styles['math']);ww=q.minWidth()+2;hh=q.wrap(ww,1000)[1];items.append(('t',q,ww,hh))
 total=sum(z[3] if z[0]=='f' else z[2] for z in items)
 if total>width:raise ValueError('Equation too wide: '+text)
 for z in items:
  if z[0]=='f':
   _,a,b,ww,ha,hb=z;mid=y-height/2;c.setStrokeColor(INK);c.setLineWidth(.65);c.line(x+2,mid,x+ww-2,mid);a.drawOn(c,x,y-ha);b.drawOn(c,x,mid-hb-4);x+=ww
  else:
   _,q,ww,hh=z;q.drawOn(c,x,y-(height+hh)/2);x+=ww
 return y-height-5

def header(c,topic,title,section,page,version=''):
 c.setFillColor(TEAL);c.rect(0,H-8,W,8,fill=1,stroke=0)
 c.setFont('UIB',10);c.drawString(L,H-35,'KAIZEN MATHS');c.setFont('UI',9);c.drawRightString(R,H-35,'AP CALCULUS | AB + BC')
 y=p(c,topic+'  '+title,L,H-53,style='title');y=p(c,section+(' | '+version if version else ''),L,y-8,style='sub')
 c.setStrokeColor(colors.HexColor('#cddfdb'));c.line(L,y-10,R,y-10)
 c.setFillColor(MUTED);c.setFont('UI',8);c.drawString(L,25,'Original Kaizen practice | Not an official College Board paper');c.drawRightString(R,25,str(page))
 return y-24

def table(c,headers,rows,x,y,width=CW):
 data=[[Paragraph(escape(str(v)),styles['cell']) for v in row] for row in [headers]+rows];t=Table(data,colWidths=[width/len(headers)]*len(headers));t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),PALE),('GRID',(0,0),(-1,-1),.5,colors.HexColor('#bfd5cf')),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6)]));_,h=t.wrap(width,1000);t.drawOn(c,x,y-h);return y-h-8

def graph(c,kind,x,y,width=400,height=125):
 # Plot axes carry quantities and units; all tangent points and tables match the data.
 configs={
 'journey':(8,320,[0,2,4,6,8],[0,100,200,300],'Time t (min)','Distance D (m)'),
 'robot':(4,170,[0,1,2,3,4],[0,40,80,120,160],'Time t (s)','Position s (m)'),
 'concentration':(6,12,[0,1,2,3,4,5,6],[0,2,4,6,8,10,12],'Time t (min)','Concentration C (mg/L)')}
 xmax,ymax,xt,yt,xlabel,ylabel=configs[kind];left=x+43;bottom=y-height+26;pw=width-65;ph=height-47
 def xy(a,b):return left+a/xmax*pw,bottom+b/ymax*ph
 c.setFont('UI',7);c.setLineWidth(.35)
 for a in xt:
  xx,_=xy(a,0);c.setStrokeColor(colors.HexColor('#dfebe7'));c.line(xx,bottom,xx,bottom+ph);c.setFillColor(MUTED);c.drawCentredString(xx,bottom-10,str(a))
 for b in yt:
  _,yy=xy(0,b);c.setStrokeColor(colors.HexColor('#dfebe7'));c.line(left,yy,left+pw,yy);c.setFillColor(MUTED);c.drawRightString(left-5,yy-2,str(b))
 c.setStrokeColor(INK);c.setLineWidth(.8);c.line(left,bottom,left+pw,bottom);c.line(left,bottom,left,bottom+ph)
 c.setFont('UI',8);c.setFillColor(INK);c.drawCentredString(left+pw/2,bottom-23,xlabel);c.drawString(left,y-6,ylabel)
 pts=[(0,0),(2,120),(5,120),(8,300)] if kind=='journey' else [(i*xmax/140,10*(i*xmax/140)**2 if kind=='robot' else (i*xmax/140-3)**2+2) for i in range(141)]
 path=c.beginPath();path.moveTo(*xy(*pts[0]));[path.lineTo(*xy(*v)) for v in pts[1:]];c.setStrokeColor(TEAL);c.setLineWidth(1.8);c.drawPath(path)
 if kind=='robot':
  c.setStrokeColor(colors.HexColor('#b17720'));c.setDash(4,2);c.line(*xy(1,0),*xy(4,120));c.setDash()
  for a,b in [(1,0),(2,40),(3,80)]:
   xx,yy=xy(a,b);c.setFillColor(INK);c.circle(xx,yy,2,fill=1,stroke=0);c.setFont('UI',8);c.drawString(xx+4,yy+4,f'({a}, {b})')
 if kind=='concentration':
  c.setStrokeColor(colors.HexColor('#b17720'));c.setDash(4,2);c.line(*xy(.6,2),*xy(5.4,2));c.setDash();c.setFillColor(INK);c.circle(*xy(3,2),2,fill=1,stroke=0)
 return y-height-4

def sketch(c,kind,x,y,width=440,height=96):
 c.setStrokeColor(TEAL);c.setFillColor(INK);c.setLineWidth(1.3);c.setFont('UI',9);xx=x+110;yy=y-height+17
 if kind in ['ladder','carts','angle']:
  a,b=120,65;c.line(xx,yy,xx+a,yy);c.line(xx,yy,xx,yy+b);c.line(xx,yy+b,xx+a,yy);c.line(xx+8,yy,xx+8,yy+8);c.line(xx,yy+8,xx+8,yy+8)
  labels={'ladder':('x = 5 m','y = ?','13 m'),'carts':('x = 30 m','y = 40 m','z = ?'),'angle':('40 m','h = 30 m','line of sight')}
  a1,b1,c1=labels[kind];c.drawCentredString(xx+60,yy-12,a1);c.drawRightString(xx-7,yy+30,b1);c.drawString(xx+61,yy+44,c1)
  if kind=='angle':c.drawString(xx+94,yy+7,'θ')
 elif kind in ['square','rectangle']:
  side=55 if kind=='square' else 150;c.rect(xx,yy,side,55);c.drawCentredString(xx+side/2,yy-12,'s = 12 cm' if kind=='square' else 'L = 12 m');c.drawRightString(xx-8,yy+25,'s' if kind=='square' else 'w = 8 m')
 elif kind in ['sphere','cylinder']:
  if kind=='sphere':c.circle(xx+90,yy+32,31);c.line(xx+90,yy+32,xx+121,yy+32);c.drawString(xx+100,yy+39,'r = 6 cm')
  else:c.ellipse(xx+40,yy+45,xx+140,yy+65);c.line(xx+40,yy+10,xx+40,yy+55);c.line(xx+140,yy+10,xx+140,yy+55);c.ellipse(xx+40,yy,xx+140,yy+20);c.drawString(xx+150,yy+30,'h = 10 cm');c.drawString(xx+70,yy-12,'r = 5 cm')
 elif kind=='cone':
  c.line(xx+20,yy+66,xx+90,yy);c.line(xx+160,yy+66,xx+90,yy);c.ellipse(xx+20,yy+55,xx+160,yy+77);c.setDash(3,2);c.line(xx+48,yy+39,xx+132,yy+39);c.line(xx+90,yy,xx+90,yy+66);c.setDash();c.drawString(xx+165,yy+40,'Full height 10 m');c.drawString(xx+95,yy+16,'h = 6 m');c.drawString(xx+76,yy+45,'r');c.drawString(xx+65,yy+82,'Full radius 5 m')
 elif kind=='shadow':
  c.line(xx,yy,xx+210,yy);c.line(xx,yy,xx,yy+65);c.line(xx+150,yy,xx+150,yy+16.25);c.line(xx,yy+65,xx+200,yy);c.drawString(xx-30,yy+32,'6 m');c.drawString(xx+115,yy+24,'1.5 m');c.drawCentredString(xx+75,yy-12,'x');c.drawCentredString(xx+175,yy-12,'s')
 else:
  c.drawString(xx,y-30,'A = 3xy');c.drawString(xx,y-48,'Both x and y change with time.')
 c.setFont('UI',7);c.setFillColor(MUTED);c.drawRightString(x+width,y-height+2,'Sketch not to scale')
 return y-height-4

P11=[];P45=[]
def add(bank,n,title,prompt,answer,steps,marks,hints,visual=None,tabledata=None,diagram=None):
 bank.append(dict(n=n,title=title,prompt=prompt,answer=answer,steps=steps,marks=marks,hints=hints,visual=visual,table=tabledata,diagram=diagram))
add(P11,1,'A net change in a tank',
 ['A tank contains V(t) litres of water t minutes after a valve is opened. V(3) = 180 and V(7) = 100.', '(a) Find the average rate of change of volume from t = 3 to t = 7.', '(b) Interpret the sign and units of your answer.'],
 '-20 L/min; the volume decreases by an average of 20 litres per minute.',
 [('Change in volume [1]', '180 and 100 are volumes; subtract final minus initial.', 'ΔV = 100 - 180 = -80 L'),('Divide by elapsed time [1]', 'Elapsed time is 7 - 3 = 4 minutes. A negative rate means a decrease.', 'Average rate = [[-80|4]] = -20 L/min')],2,
 ['Write final volume minus initial volume over elapsed time.','Explain the sign as well as naming the units.'])
add(P11,2,'Reading a journey graph',
 ['The graph shows a robot’s distance D from a station. The graph is made of straight segments.', '(a) Find its average rate of change over 0 ≤ t ≤ 8.', '(b) State an interval on which its distance is constant.', '(c) Compare the instantaneous rates at t = 1 and t = 6. Explain using the graph.'],
 '37.5 m/min; [2, 5]; both instantaneous rates are 60 m/min.',
 [('Whole interval [1]', 'Use the endpoint values, even though the journey has several stages.', 'Average rate = [[300 - 0|8 - 0]] = 37.5 m/min'),('Constant interval [1]','The horizontal segment is from t = 2 to t = 5.',''),('Compare local slopes [2]','Both times lie inside straight segments. Their slopes are equal.', 'At 1: [[120 - 0|2 - 0]] = 60; at 6: [[300 - 120|8 - 5]] = 60 m/min')],4,
 ['For (a), use the first and last points.','For (c), use the slope of the straight segment containing each time.'],visual='journey')
add(P11,3,'What does the expression mean?',
 ['H(t) models the water depth in a pond, in centimetres, t days after monitoring begins. Assume H is smooth near t = 6.', 'Interpret the following expression, including its interval and units. Explain how it relates to the rate at t = 6.'],
 'Average depth change on [6, 6.02], in cm/day; an estimate of the instantaneous rate at day 6, not necessarily its exact value.',
 [('Interpret the quotient [1]','The numerator is a change in depth; the denominator is the elapsed time.','[[H(6.02) - H(6)|0.02]]'),('Connect to an instant [1]','It is the average rate over [6, 6.02], measured in cm/day. For a smooth model, a short interval can estimate the rate at t = 6. A finite interval does not by itself give an exact instantaneous rate.','')],2,
 ['Identify what the numerator measures and what the denominator measures.','Distinguish an average over an interval from a rate at one instant.'])
P11[-1]['equation']='[[H(6.02) - H(6)|0.02]]'
add(P11,4,'Estimating a heating rate',
 ['T(t) is a smooth temperature model in degrees Celsius; t is in minutes.', '(a) Calculate the average rates on [3.9, 4] and [4, 4.1].', '(b) Use these rates to estimate the instantaneous heating rate at t = 4.'],
 '21.5 °C/min and 22.5 °C/min; approximately 22 °C/min at t = 4.',
 [('Left interval [1]','Use a change in temperature divided by a change in time.','[[70 - 67.85|4 - 3.9]] = [[2.15|0.1]] = 21.5 °C/min'),('Right interval [1]','Use the values just after the target time.','[[72.25 - 70|4.1 - 4]] = [[2.25|0.1]] = 22.5 °C/min'),('Estimate [1]','A reasonable estimate from the neighbouring rates is 22 °C/min. It is an estimate, not an exact conclusion from the table.','[[21.5 + 22.5|2]] = 22 °C/min')],3,
 ['Work from times immediately before and after 4.','Compare the two slopes before selecting an estimate.'],tabledata=(['t (min)','3.8','3.9','4','4.1','4.2'],[['T(t) (°C)','65.8','67.85','70','72.25','74.6']]))
add(P11,5,'A tangent and a secant',
 ['The solid curve is a robot’s position s(t). The dashed line is tangent at (2, 40) and passes through (1, 0) and (3, 80).', '(a) Find its instantaneous velocity at t = 2 using the tangent.', '(b) Find its average velocity over [0, 2]. Why do the answers differ?'],
 '40 m/s instantaneous; 20 m/s average. One is a local tangent slope, the other an interval secant slope.',
 [('Tangent slope [1]','Use two labelled points on the tangent, not two arbitrary points on the curve.','Instantaneous velocity = [[80 - 0|3 - 1]] = 40 m/s'),('Secant slope [1]','The curve starts at (0, 0) and passes through (2, 40).','Average velocity = [[40 - 0|2 - 0]] = 20 m/s'),('Compare [1]','The first describes the rate at t = 2. The second describes the net position change per second over [0, 2]. The curve’s slope is changing.','')],3,
 ['The dashed tangent describes the instant.','The straight line joining two curve points describes an interval.'],visual='robot')
add(P11,6,'A decreasing reservoir volume',
 ['V(t) is a smooth reservoir-volume model in cubic metres; t is in hours.', '(a) Find average rates on [9.9, 10] and [10, 10.1].', '(b) Estimate the instantaneous rate at t = 10 and interpret its sign.'],
 '-9.9 m³/h and -10.1 m³/h; approximately -10 m³/h, so volume is decreasing.',
 [('Before 10 [1]','Subtract the earlier volume from the later volume.','[[500 - 500.99|10 - 9.9]] = -9.9 m³/h'),('After 10 [1]','The time interval remains positive; volume change is negative.','[[498.99 - 500|10.1 - 10]] = -10.1 m³/h'),('Estimate and interpret [1]','The neighbouring rates suggest about -10 m³/h at t = 10: a loss of about 10 cubic metres per hour.','')],3,
 ['Keep final minus initial in both numerator and denominator.','A decreasing quantity has a negative rate.'],tabledata=(['t (h)','9.9','10','10.1'],[['V(t) (m³)','500.99','500','498.99']]))
add(P11,7,'Zero rate does not mean no change',
 ['The curve shows a smooth concentration model C(t). The dashed tangent at t = 3 is horizontal. C(2) = C(4) = 3.', '(a) State the instantaneous rate at t = 3.', '(b) Find the average rate over [2, 4].', '(c) Does your answer to (b) mean concentration is constant throughout that interval? Explain.'],
 '0 mg/L per min at t = 3; average rate 0 mg/L per min; not constant on [2, 4].',
 [('Instantaneous rate [1]','A horizontal tangent has slope zero.','Rate at t = 3 is 0 mg/L per min.'),('Average rate [1]','The endpoint concentrations are equal.','[[3 - 3|4 - 2]] = 0 mg/L per min'),('Reasoning [1]','No. The concentration decreases then increases. Zero net change across an interval does not mean no change within it.','')],3,
 ['Read the slope of the tangent for (a).','Equal endpoint values tell you about net change, not all intermediate values.'],visual='concentration')
add(P11,8,'Choosing the correct rate expression',
 ['W(t) is the total volume, in litres, that has passed a sensor after t seconds. Assume W is smooth near t = 5.', 'Which expression is the average rate over [5, 5.01] and can be used to estimate the instantaneous flow rate at t = 5? Choose one and explain.'],
 'C; change in volume divided by 0.01 seconds.',
 [('Choice [1]','The required change is W(5.01) - W(5), and the elapsed time is 0.01 seconds.','C: [[W(5.01) - W(5)|0.01]]'),('Explanation [1]','This is an interval average in L/s. A nearby short interval can estimate the instantaneous rate for a smooth model; it does not guarantee an exact value.','')],2,
 ['Check that both the numerator and denominator describe the stated interval.','A difference alone is a volume, not a flow rate.'])
P11[-1]['choices']=['A: [[W(5)|5]]','B: [[W(6) - W(4)|2]]','C: [[W(5.01) - W(5)|0.01]]','D: W(5.01) - W(5)']
add(P11,9,'What two measurements cannot tell us',
 ['A smooth position function f satisfies f(2) = 14 m and f(6) = 30 m; time is in seconds.', '(a) Find its average velocity over [2, 6].', '(b) A pupil says its instantaneous velocity at t = 3 must therefore equal this average. Is the conclusion justified? Explain.'],
 '4 m/s; no. Two endpoint values do not determine the local slope at t = 3.',
 [('Average [1]','Use the endpoints.','[[30 - 14|6 - 2]] = 4 m/s'),('Insufficient information [1]','The same endpoints can lie on different smooth curves, whose slopes at t = 3 differ.',''),('Example or clear reasoning [1]','A straight line has constant rate 4. Adding a curved term that is zero at both endpoints preserves the average but can change the local slope. A sketch of two such curves is also acceptable.','f(t) = 4t + 6; g(t) = 4t + 6 + (t - 2)(t - 6)')],3,
 ['Imagine more than one smooth curve joining the same two points.','Does fixing the endpoints fix a tangent at an interior point?'])
add(P11,10,'Closing in on an instant',
 ['h(t) models a plant’s height, in centimetres, t weeks after observation begins. Assume the model is smooth near t = 3.', '(a) Calculate the average rates on [3, 3.1] and [3, 3.01].', '(b) Estimate the rate at t = 3.', '(c) Why can we not calculate this rate simply by using the interval [3, 3]?'],
 '4.1 cm/week; 4.01 cm/week; approximately 4 cm/week; [3, 3] would require division by zero.',
 [('First average [1]','The elapsed time is 0.1 week.','[[10.41 - 10|3.1 - 3]] = 4.1 cm/week'),('Closer average [1]','The elapsed time is 0.01 week. The slopes suggest about 4 cm/week at t = 3.','[[10.0401 - 10|3.01 - 3]] = 4.01 cm/week'),('Why an interval is needed [1]','Using [3, 3] gives 0 divided by 0, which is undefined. An instantaneous rate is approached through rates over shrinking nonzero intervals.','')],3,
 ['Keep the time difference nonzero when forming each quotient.','Compare how the averages change as the interval narrows.'],tabledata=(['t (weeks)','3','3.01','3.1'],[['h(t) (cm)','10','10.0401','10.41']]))

add(P45,1,'Two changing dimensions',
 ['An area quantity A is related to lengths x and y by A = 3xy. All quantities vary smoothly with time t in seconds.', 'At one instant x = 2 cm and y = 5 cm. Their rates are given below. Find the rate of change of A.'],
 '54 cm²/s.',
 [('Differentiate first [1]','Both lengths change, so apply the product rule with respect to time.','[[dA|dt]] = 3(x [[dy|dt]] + y [[dx|dt]])'),('Substitute [1]','Use the values at the stated instant only after differentiating.','[[dA|dt]] = 3(2(-1) + 5(4)) = 3(-2 + 20)'),('Simplify and interpret [1]','The area quantity is increasing.','[[dA|dt]] = 54 cm²/s')],3,
 ['Treat x and y as functions of time.','Differentiate the product before inserting the snapshot values.'],diagram='equation')
P45[-1]['equation']='[[dx|dt]] = 4 cm/s; [[dy|dt]] = -1 cm/s'
add(P45,2,'A growing square',
 ['A square metal plate expands while remaining square. When its side length is 12 cm, its area is increasing at 48 cm²/s.', 'How fast is its side length increasing at that instant?'],
 '2 cm/s.',
 [('Model [1]','Let s(t) be the side length.','A = s²'),('Differentiate and substitute [1]','Differentiate with respect to t before setting s = 12.','[[dA|dt]] = 2s [[ds|dt]]; 48 = 24 [[ds|dt]]'),('Solve [1]','The positive value indicates expansion.','[[ds|dt]] = [[48|24]] = 2 cm/s')],3,
 ['Let s be a changing side length.','Relate area to s, then differentiate with respect to time.'],diagram='square')
add(P45,3,'Inflating a sphere',
 ['A spherical balloon has radius 6 cm at an instant when its radius increases at 0.5 cm/s.', 'Find the rate at which its volume increases. Give an exact answer. Use the sphere-volume formula below.'],
 '72π cm³/s.',
 [('Model [1]','Use the sphere-volume relationship.','V = [[4|3]]πr³'),('Differentiate [1]','The chain rule introduces the radius rate.','[[dV|dt]] = 4πr² [[dr|dt]]'),('Substitute [1]','Insert the instantaneous radius and radius rate.','[[dV|dt]] = 4π(6²)(0.5)'),('Evaluate [1]','Keep π for an exact answer; volume rate uses cubic units per second.','[[dV|dt]] = 72π cm³/s')],4,
 ['The radius is a function of time.','Include dr/dt when differentiating r³.'],diagram='sphere')
P45[-1]['equation']='V = [[4|3]]πr³'
add(P45,4,'A sliding ladder',
 ['A rigid 13 m ladder leans against a vertical wall on level ground. Its foot moves away from the wall at 0.6 m/s.', 'When its foot is 5 m from the wall, how fast is the top moving? State both a signed rate and the direction of motion.'],
 '[[dy|dt]] = -0.25 m/s; the top moves down at 0.25 m/s.',
 [('Model and snapshot [1]','Let x be the foot’s distance from the wall and y the top’s height.','x² + y² = 13²; y² = 169 - 25 = 144; y = 12'),('Differentiate [1]','The ladder length is constant.','2x [[dx|dt]] + 2y [[dy|dt]] = 0'),('Substitute and solve [1]','The foot moves away, so its distance rate is positive.','10(0.6) + 24 [[dy|dt]] = 0; [[dy|dt]] = [[-6|24]] = -0.25'),('Interpret [1]','Height is decreasing: the top moves down at 0.25 m/s.','')],4,
 ['Label the horizontal distance x and vertical height y.','Find the missing height at the instant, then use the differentiated relationship.'],diagram='ladder')
add(P45,5,'Approaching and leaving a crossing',
 ['Two carts move on perpendicular straight tracks meeting at a crossing. Cart A is 30 m from the crossing and moving towards it at 3 m/s. Cart B is 40 m from the crossing and moving away at 4 m/s.', 'Find the rate of change of the distance between the carts at that instant. Are they getting closer or farther apart?'],
 '1.4 m/s; they are moving farther apart.',
 [('Model and signs [1]','Let x and y be distances from the crossing, and z the separation. The x-rate is -3 m/s; the y-rate is 4 m/s.','z² = x² + y²; z = 50 m'),('Differentiate [1]','All three distances may change.','2z [[dz|dt]] = 2x [[dx|dt]] + 2y [[dy|dt]]'),('Substitute [1]','Keep the approach rate negative.','50 [[dz|dt]] = 30(-3) + 40(4) = 70'),('Solve and interpret [1]','Positive separation rate means farther apart.','[[dz|dt]] = [[70|50]] = 1.4 m/s')],4,
 ['Distances from the crossing are nonnegative, but their rates can have different signs.','Use Pythagoras to connect the two track distances and the separation.'],diagram='carts')
add(P45,6,'Filling a conical tank',
 ['A cone-shaped tank stands with its vertex down. Its full height is 10 m and its top radius is 5 m. Water enters at 3π m³/min.', 'When the water is 6 m deep, how fast is its depth increasing? Use the cone-volume formula below.'],
 '1/3 m/min.',
 [('Similar triangles [1]','The water surface radius changes with depth.','[[r|h]] = [[5|10]] = [[1|2]]; r = [[h|2]]'),('One-variable model [1]','Substitute the radius-depth relationship before differentiating.','V = [[1|3]]π [[h²|4]] h = [[πh³|12]]'),('Differentiate [1]','Use the chain rule.','[[dV|dt]] = [[πh²|4]] [[dh|dt]]'),('Substitute and solve [1]','At h = 6, the coefficient is 9π.','3π = 9π [[dh|dt]]; [[dh|dt]] = [[1|3]] m/min')],4,
 ['Compare the small water cone with the full tank using similar triangles.','Eliminate r so that volume is expressed in terms of depth alone.'],diagram='cone')
P45[-1]['equation']='V = [[1|3]]πr²h'
add(P45,7,'Watching a rising balloon',
 ['An observer stands 40 m horizontally from a balloon’s launch point. The balloon rises vertically at 2 m/s. Let θ be its angle of elevation in radians.', 'Find the rate of change of θ when the balloon is 30 m above the ground. Give an exact answer.'],
 '4/125 rad/s.',
 [('Model [1]','Let h be height. The horizontal distance remains fixed.','tan θ = [[h|40]]'),('Differentiate [1]','Differentiate both sides with respect to time.','sec² θ [[dθ|dt]] = [[1|40]] [[dh|dt]]'),('Snapshot values [1]','Use the height and fixed distance to find tan θ, then use sec² θ = 1 + tan² θ.','sec² θ = 1 + [[9|16]] = [[25|16]]'),('Solve [1]','Use radians for the angular rate.','[[25|16]] [[dθ|dt]] = [[2|40]]; [[dθ|dt]] = [[4|125]] rad/s')],4,
 ['Connect the angle and height with a trigonometric ratio.','Differentiate the angle as a function of time; work in radians.'],diagram='angle')
add(P45,8,'A moving shadow',
 ['A 1.5 m tall person walks at 2 m/s directly away from a 6 m tall streetlight on level ground.', 'Let x be the person’s distance from the pole and s the shadow’s length. Find (a) the rate at which the shadow length increases, and (b) the speed of the tip of the shadow away from the pole.'],
 'Shadow length: 2/3 m/s; shadow-tip speed: 8/3 m/s.',
 [('Similar triangles [1]','The large triangle’s base is x + s, not x.','[[6|x + s]] = [[1.5|s]]'),('Simplify [1]','Cross-multiply and collect the s terms.','6s = 1.5(x + s); 4.5s = 1.5x; s = [[x|3]]'),('Shadow rate [1]','Differentiate with respect to time.','[[ds|dt]] = [[1|3]] [[dx|dt]] = [[2|3]] m/s'),('Tip position [1]','The tip is x + s metres from the pole.','Tip rate = [[dx|dt]] + [[ds|dt]]'),('Tip speed [1]','Both terms are positive.','Tip speed = 2 + [[2|3]] = [[8|3]] m/s')],5,
 ['Draw the two similar triangles. The large base reaches the shadow’s tip.','Distinguish shadow length s from the tip’s position x + s.'],diagram='shadow')
add(P45,9,'A cylinder and a tempting error',
 ['A cylinder has fixed height 10 cm and an expanding radius r(t). Its volume increases at 200π cm³/min. At the instant considered, r = 5 cm.', '(a) Find the rate at which the radius increases.', '(b) A pupil substitutes r = 5 in V = 10πr² before differentiating, then concludes that the volume rate is zero. Explain the error.'],
 '[[dr|dt]] = 2 cm/min. A snapshot radius cannot replace the changing radius before differentiation.',
 [('Model [1]','The height is fixed but the radius is not.','V = 10πr²'),('Differentiate and substitute [1]','Differentiate the changing relationship first.','[[dV|dt]] = 20πr [[dr|dt]]; 200π = 100π [[dr|dt]]'),('Solve [1]','Cancel 100π.','[[dr|dt]] = 2 cm/min'),('Explain [1]','The value 5 cm applies only at one instant. Substitution first erases the time dependence and produces a constant snapshot, not a volume function valid over time.','')],4,
 ['Ask which quantity is constant throughout the process and which is a snapshot.','Retain r(t) until after differentiation.'],diagram='cylinder')
add(P45,10,'Fixed area, changing perimeter',
 ['A rectangular display has constant area 96 m². At an instant its length is 12 m and its width is 8 m. The length increases at 0.5 m/min.', '(a) Find the rate of change of its width.', '(b) Find the rate of change of its perimeter. Explain how the area can stay constant while the perimeter changes.'],
 'Width: -1/3 m/min; perimeter: 1/3 m/min. The width decreases as the length increases; constant area does not require constant perimeter.',
 [('Area relationship [1]','Let L and w vary while their product remains fixed.','Lw = 96; L [[dw|dt]] + w [[dL|dt]] = 0'),('Width rate [1]','Insert the snapshot dimensions.','12 [[dw|dt]] + 8(0.5) = 0; [[dw|dt]] = [[-1|3]] m/min'),('Perimeter model [1]','Both dimensions change.','P = 2L + 2w; [[dP|dt]] = 2 [[dL|dt]] + 2 [[dw|dt]]'),('Perimeter rate [1]','Add the signed length and width contributions.','[[dP|dt]] = 2(0.5) + 2(-[[1|3]]) = [[1|3]] m/min'),('Interpret [1]','The width shrinks enough to hold the product Lw fixed. At these dimensions the sum L + w still increases, so the perimeter increases.','')],5,
 ['Differentiate the constant-area relationship to find the unknown width rate.','Then use a separate relationship for perimeter.'],diagram='rectangle')

# Render ten main questions on five pages per version. Same prompts and values in both versions.
def question_page(c,topic,title,qs,version,page):
 y=header(c,topic,title,'Pupil questions',page,version)
 y=p(c,'Name: __________________________  Date: ______________',L,y,style='small')
 y=p(c,'Show your reasoning and units. No calculator required; leave exact answers where requested.',L,y-7,style='small')
 for j,q in enumerate(qs):
  top=H-172-j*310;bottom=top-299
  c.setFillColor(TEAL);c.setFont('UIB',12);c.drawString(L,top,str(q['n']).zfill(2));
  yy=p(c,q['title'],L+29,top+2,CW-88,'sub');c.setFont('UI',8);c.setFillColor(MUTED);c.drawRightString(R,top,str(q['marks'])+' marks')
  for txt in q['prompt']:yy=p(c,txt,L,yy-6)-1
  if q.get('equation'):yy=mathline(c,q['equation'],L+10,yy-4)
  for ci in range(0,len(q.get('choices',[])),2):
   row=q['choices'][ci:ci+2];yy=min(mathline(c,choice,L+10+col*CW/2,yy-2,CW/2-15) for col,choice in enumerate(row))
  if q['table']:yy=table(c,*q['table'],L,yy-6)
  if q['visual']:yy=graph(c,q['visual'],L+25,yy-5,width=CW-35,height=117)
  if version=='Supported':
   if q['diagram']:yy=sketch(c,q['diagram'],L+5,yy-4,width=CW-10,height=91)
   hint=' <b>Support:</b> '+' '.join(q['hints']);yy=p(c,hint,L+9,yy-6,CW-18,'hint')-5
  if yy<bottom+8:raise ValueError(f'Question overflow {topic}/{version}/{q["n"]}: {yy} < {bottom}')
  c.setStrokeColor(colors.HexColor('#e2e9e6'));c.setLineWidth(.4)
  for liney in range(int(bottom+14),int(yy-8),20):c.line(L,liney,R,liney)
  if j==0:c.setStrokeColor(colors.HexColor('#c3d7d0'));c.line(L,bottom-5,R,bottom-5)
 c.showPage()

def render_packet(topic,title,bank,filename):
 c=canvas.Canvas(str(OUT/filename),pagesize=(W,H));c.setTitle('Kaizen AP Calculus '+topic+' - '+title);c.setAuthor('Kaizen Maths');page=0
 for version in ['Independent','Supported']:
  for i in range(0,10,2):page+=1;question_page(c,topic,title,bank[i:i+2],version,page)
 page+=1;y=header(c,topic,title,'Teacher answer key',page)
 y=p(c,'Same answers for both question versions. Suggested marks reward the mathematics, not independent attainment after hints have been supplied.',L,y,style='small')-15
 for q in bank:
  y=p(c,f'<b>{q["n"]:02d}. {q["title"]}</b>  [{q["marks"]} marks]',L,y,style='hint')-3
  # Answer-key fraction text is converted to stacked fractions when needed.
  ans=q['answer'];ans=re.sub(r'(?<!\w)(-?\d+)/(\d+)',r'[[\1|\2]]',ans)
  if '[[' in ans:
   chunks=ans.split('. ');y=mathline(c,chunks[0],L+12,y,CW-12)
   if len(chunks)>1:y=p(c,'. '.join(chunks[1:]),L+12,y,CW-12,'body')-7
  else:y=p(c,ans,L+12,y,CW-12,'body')-7
 if y<65:raise ValueError('Answer key overflow '+topic)
 y=p(c,'Total: '+str(sum(q['marks'] for q in bank))+' suggested marks. Accept equivalent valid methods and appropriate estimates from graphs. Carry an earlier arithmetic error forward when the subsequent method is correct.',L,y-8,style='small');c.showPage()
 solution_groups=[];pending=[]
 for q in bank:
  if len(q['steps'])>=5:
   if pending:solution_groups.append(pending);pending=[]
   solution_groups.append([q])
  else:
   pending.append(q)
   if len(pending)==2:solution_groups.append(pending);pending=[]
 if pending:solution_groups.append(pending)
 for group in solution_groups:
  page+=1;y=header(c,topic,title,'Worked solutions & suggested marks',page)
  for j,q in enumerate(group):
   yy=H-140-j*324
   yy=p(c,str(q['n']).zfill(2)+'. '+q['title'],L,yy,style='sub')-6
   for k,(label,note,eq) in enumerate(q['steps'],1):
    yy=p(c,f'<b>{k}. {label}</b> '+note,L,yy,CW,'hint')-3
    if eq:yy=mathline(c,eq,L+8,yy,CW-8)
    yy-=4
   if yy < (H-140-(j+1)*324+6 if len(group)==2 else 65):raise ValueError(f'Solution overflow {topic}/{q["n"]}: {yy}')
   if j==0 and len(group)==2:c.setStrokeColor(colors.HexColor('#d4e1dc'));c.line(L,H-140-312,R,H-140-312)
  c.showPage()
 c.save();return page

if __name__=='__main__':
 print('1.1',render_packet('1.1','Change at an instant',P11,'ap-calculus-1-1-pilot.pdf'),'pages')
 print('4.5',render_packet('4.5','Solving related rates',P45,'ap-calculus-4-5-pilot.pdf'),'pages')
 (ROOT/'output/ap-calculus-pilot/pilot-questions.json').write_text(json.dumps({'1.1':P11,'4.5':P45},indent=2,ensure_ascii=False))
