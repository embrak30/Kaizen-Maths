"""Build the complete generator collection in measured, print-ready small formats."""
from pathlib import Path
import sys,json,re,html,math,shutil,subprocess,os
from copy import deepcopy
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import practice_pack_style as d
from small_format_packs import rule
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph,Image,Table,TableStyle
from reportlab.lib.styles import ParagraphStyle
from pypdf import PdfReader
from PIL import Image as PILImage
ROOT=Path(__file__).resolve().parents[2];W,H=d.W,d.H
pdfmetrics.registerFont(TTFont('MathSymbols',str(d.BUNDLE/'DejaVuSans.ttf')))
pdfmetrics.registerFontFamily('Sans',normal='Sans',bold='SansBold',italic='Sans',boldItalic='SansBold')
pdfmetrics.registerFontFamily('STIX',normal='STIX',bold='STIX',italic='STIXItalic',boldItalic='STIXItalic')
WARNINGS=[]
class DoesNotFit(Exception):pass

def glyphs(text,font):
 def part(s):
  out=''
  for char in s:
   if ord(char)<128 or ord(char) in pdfmetrics.getFont(font).face.charToGlyph:out+=char
   elif ord(char) in pdfmetrics.getFont('STIX').face.charToGlyph:out+=f'<font name="STIX">{char}</font>'
   elif ord(char) in pdfmetrics.getFont('MathSymbols').face.charToGlyph:out+=f'<font name="MathSymbols">{char}</font>'
   elif char=='\u200b':continue
   else:raise ValueError(f'Unsupported character U+{ord(char):04X}: {char}')
  return out
 return ''.join(p if p.startswith('<') else part(p) for p in re.split(r'(<[^>]+>)',text))

def markup(source,width,size):
 source=source.replace('\x00','').replace('\u00a0',' ')
 def image(m):
  tag=m[0];w=float(re.search(r'width="([\d.]+)"',tag)[1]);h=float(re.search(r'height="([\d.]+)"',tag)[1]);v=float(re.search(r'valign="(-?[\d.]+)"',tag)[1]);factor=size/12
  if w*factor>width:
   factor=width/w
   if factor*12<8.5:raise DoesNotFit('Equation would print too small')
  tag=re.sub(r'width="[^"]+"',f'width="{w*factor:.3f}"',tag);tag=re.sub(r'height="[^"]+"',f'height="{h*factor:.3f}"',tag);tag=re.sub(r'valign="[^"]+"',f'valign="{v*factor:.3f}"',tag)
  return tag
 source=re.sub(r'<img\s+[^>]+/>',image,source)
 # Prose remains a clean sans face; algebra uses the approved STIX typeface.
 plain=html.unescape(re.sub(r'<[^>]+>','',source));font='STIX' if not re.search(r'\b[A-Za-z]{4,}\b',plain) else 'Sans'
 return glyphs(source,font),font

def flows(blocks,width,size=12,diagram_max=200):
 result=[]
 for block in blocks:
  if block['kind']=='paragraph':
   content,font=markup(block['html'],width,size)
   p=Paragraph(content,ParagraphStyle('content',fontName=font,fontSize=size,leading=size*1.35,autoLeading='max',spaceAfter=0,splitLongWords=True,textColor=d.HexColor(d.INK)))
   try:_,height=p.wrap(width,2000)
   except Exception as e:raise ValueError('Paragraph: '+block['html'][:180]+' / '+str(e))
   if getattr(p,'minWidth',lambda:0)()>width+2:raise DoesNotFit('Unbreakable expression')
   result.append((p,height))
  elif block['kind']=='image':
   factor=min(width/block['w'],diagram_max/block['h'],1.25);w=block['w']*factor;h=block['h']*factor
   result.append((Image(block['file'],width=w,height=h,mask='auto'),h))
  elif block['kind']=='table':
   columns=max(map(len,block['rows']));cw=width/columns;rows=[]
   for row in block['rows']:
    cells=[]
    for cell in row:
     content,font=markup(cell,cw-8,min(size,9))
     cells.append(Paragraph(content,ParagraphStyle('cell',fontName=font,fontSize=min(size,9),leading=min(size,9)*1.3,autoLeading='max',textColor=d.HexColor(d.INK))))
    cells+=['']*(columns-len(cells));rows.append(cells)
   t=Table(rows,colWidths=[cw]*columns,hAlign='LEFT');t.setStyle(TableStyle([('GRID',(0,0),(-1,-1),.45,d.HexColor('#CCD8E6')),('BACKGROUND',(0,0),(-1,0),d.HexColor('#EDF4FA')),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),4),('RIGHTPADDING',(0,0),(-1,-1),4),('TOPPADDING',(0,0),(-1,-1),2.5),('BOTTOMPADDING',(0,0),(-1,-1),2.5)]));_,height=t.wrap(width,2000);result.append((t,height))
 return result

def height(items):return sum(h+4 for _,h in items)
def draw_flows(c,items,x,top,width):
 for item,h in items:
  if isinstance(item,Image):item.drawOn(c,x+(width-item.drawWidth)/2,top-h)
  else:item.drawOn(c,x,top-h)
  top-=h+4
 return top

def short_text(c,text,x,top,width,size=9,bold=False,color=None):
 p=Paragraph(html.escape(text),ParagraphStyle('label',fontName='SansBold' if bold else 'Sans',fontSize=size,leading=size*1.25,textColor=d.HexColor(color or d.MUTED)))
 _,h=p.wrap(width,1000);p.drawOn(c,x,top-h);return top-h

def heading_geometry(pack,width):
 compact=any(block['kind']=='image' for q in pack['questions'] for block in q['print']['question'])
 topic=Paragraph(html.escape(pack['topic']),ParagraphStyle('topic',fontName='SansBold',fontSize=9.5 if compact else 10,leading=12))
 title=Paragraph(html.escape(pack['title']),ParagraphStyle('title',fontName='Sans',fontSize=8.5,leading=10.625))
 th=topic.wrap(width-36,1000)[1];lh=title.wrap(width-36,1000)[1]
 offset=(46 if compact else 57)+th+3+lh+28
 return compact,offset

def header(c,pack,x,top,width,title,accent):
 compact,offset=heading_geometry(pack,width)
 d.fill(c,accent);c.rect(x+16,top-12,width-32,2,fill=1,stroke=0)
 d.fill(c,accent);c.roundRect(x+17,top-41 if compact else top-44,20,21,4,fill=1,stroke=0);d.text(c,x+22,top-36 if compact else top-39,'K','STIX',18,'#FFFFFF')
 d.text(c,x+45,top-25 if compact else top-28,'KAIZEN MATHS','SansBold',8,accent);d.text(c,x+45,top-40 if compact else top-47,title,'STIX',15 if compact else 20)
 yy=short_text(c,pack['topic'],x+18,top-(46 if compact else 57),width-36,9.5 if compact else 10,True,d.INK)
 yy=short_text(c,pack['title'],x+18,yy-3,width-36,8.5)
 d.text(c,x+18,yy-16,'Name','Sans',8.5,d.MUTED);rule(c,x+43,yy-18,x+width-18,yy-18)
 return yy-28

def student_blocks(q,pack):
 blocks=q['print']['question']
 # These optimisation questions supply every constraint. The plotted solution region
 # is a teacher aid; students can construct it from the unchanged inequalities.
 if pack['sourceTool']=='linear-programming' and pack['level']==3:
  return [{'kind':'paragraph','html':'Sketch the feasible region using the constraints.'}]+[b for b in blocks if b['kind']!='image']
 if pack['sourceTool'] in ['histograms','cumulative-frequency-curves'] and any(b['kind']=='table' for b in blocks):
  result=[]
  for b in blocks:
   if b['kind']=='image':continue
   b=deepcopy(b)
   if b['kind']=='paragraph':b['html']=b['html'].replace('Use the histogram to complete the frequency column in the table.','Complete the frequency column using class width × frequency density.').replace('The histogram and table show','The table shows').replace('Use the cumulative frequency curve to complete the cumulative frequency column.','Complete the cumulative frequency column by adding the frequencies.')
   result.append(b)
  return result
 return blocks

def plan_groups(questions,kind,pack):
 width=W if kind=='starter' else W/2;usable=H/2-heading_geometry(pack,width)[1]-28
 choices=[(4,2),(2,1),(1,1)] if kind=='starter' else [(3,1),(2,1),(1,1)]
 for size in [12,11]:
  for diagram_max in [200,170,150,130]:
   for count,cols in choices:
    rows=math.ceil(count/cols);cw=(width-36-(cols-1)*10)/cols;slot=(usable-(rows-1)*8)/rows
    try:
     if all(height(flows(student_blocks(q,pack),cw-14,size,diagram_max))+29<=slot for q in questions):return [questions[i:i+count] for i in range(0,len(questions),count)],cols,diagram_max,size
    except DoesNotFit:pass
 raise DoesNotFit('Question cannot fit on a readable student slip')

def student_slip(c,pack,questions,label,x,top,width,kind,cols,diagram_max,size):
 bottom=top-H/2;accent=d.PURPLE if kind=='starter' else d.TEAL
 content_top=header(c,pack,x,top,width,'Lesson starter' if kind=='starter' else 'Exit ticket',accent)
 # Short directions are carried by each source question; the slip adds only a working reminder.
 region_bottom=bottom+28;available=content_top-region_bottom;rows=math.ceil(len(questions)/cols);cw=(width-36-(cols-1)*10)/cols;ch=(available-(rows-1)*8)/rows
 for i,q in enumerate(questions):
  qx=x+18+i%cols*(cw+10);qy=content_top-i//cols*(ch+8)
  if kind=='starter':d.stroke(c,'#D9D4EF');c.setLineWidth(.55);c.roundRect(qx,qy-ch,cw,ch,5,fill=0,stroke=1)
  d.text(c,qx+7,qy-13,f'{label}{i+1}','SansBold',8,accent)
  items=flows(student_blocks(q,pack),cw-14,size,diagram_max)
  if height(items)+27>ch:raise DoesNotFit(f"{pack['id']} {label}{i+1} overflow: {height(items):.1f}/{ch:.1f}")
  yy=draw_flows(c,items,qx+7,qy-23,cw-14)
  rule(c,qx+7,qy-ch+12,qx+cw-7,qy-ch+12)
  if yy>qy-ch+44:rule(c,qx+7,qy-ch+29,qx+cw-7,qy-ch+29)
 d.text(c,x+18,bottom+12,pack['id']+' · '+label,'Sans',7,d.MUTED)
 c.setFont('Sans',7);c.drawRightString(x+width-18,bottom+12,'Show your working')

def teacher_pages(pack,aliases):
 # Full-width working keeps long equations, matrices and diagrams readable.
 blocks=[];width=W-56
 for q in pack['questions']:
  content=[]
  content.extend(q['print']['question']);content.append({'kind':'paragraph','html':'<b>Answer:</b>'})
  content.extend(q['print']['answer']);content.append({'kind':'paragraph','html':'<b>Working:</b>'})
  content.extend(q['print']['steps'] or q['print']['answer'])
  items=flows(content,width,11,175)
  chunks=[];current=[];used=0
  for item,h in items:
   if h>H-190:raise DoesNotFit('A teacher block cannot fit on A4')
   if used+h+4>H-190:chunks.append(current);current=[];used=0
   current.append((item,h));used+=h+4
  if current:chunks.append(current)
  for index,chunk in enumerate(chunks):blocks.append((' / '.join(aliases[q['number']])+(' (continued)' if index else ''),chunk))
 pages=[];page=[];used=0;capacity=H-161
 for label,items in blocks:
  h=height(items)+27
  if used+h>capacity and page:pages.append(page);page=[];used=0
  page.append((label,items));used+=h
 if page:pages.append(page)
 return pages

def build(pack,folder):
 out=folder/(pack['slug']+'.pdf');allq=pack['questions'];start=allq[:4];end=allq[4:] or allq[-min(2,len(allq)):]
 starters,cols,starter_diagram,starter_size=plan_groups(start,'starter',pack);exits,_,exit_diagram,exit_size=plan_groups(end,'exit',pack)
 aliases={q['number']:[] for q in allq}
 starter_ids=['S'] if len(starters)==1 else ['S'+chr(65+i) for i in range(len(starters))]
 exit_ids=['E'] if len(exits)==1 else ['E'+chr(65+i) for i in range(len(exits))]
 for name,group in zip(starter_ids,starters):
  for i,q in enumerate(group):aliases[q['number']].append(f'{name}{i+1}')
 for name,group in zip(exit_ids,exits):
  for i,q in enumerate(group):aliases[q['number']].append(f'{name}{i+1}')
 assert all(aliases.values())
 teachers=teacher_pages(pack,aliases);starter_sheets=math.ceil(len(starters)/2);exit_sheets=math.ceil(len(exits)/4);student_pages=starter_sheets+exit_sheets;total=student_pages+len(teachers)
 c=canvas.Canvas(str(out),pagesize=(W,H),invariant=1,pageCompression=1);c.setTitle('Kaizen Maths | Starter & Exit Ticket Packs | '+pack['topic']+' | '+pack['title']);c.setAuthor('Kaizen Maths')
 for start_index in range(0,len(starters),2):
  groups=list(zip(starter_ids,starters))[start_index:start_index+2]
  if len(groups)==1:groups*=2
  for (name,group),top in zip(groups,[H,H/2]):student_slip(c,pack,group,name,0,top,W,'starter',cols,starter_diagram,starter_size)
  rule(c,9,H/2,W-9,H/2,'#8B98AA',[4,4]);c.showPage()
 for start_index in range(0,len(exits),4):
  groups=list(zip(exit_ids,exits))[start_index:start_index+4];groups=[groups[i%len(groups)] for i in range(4)]
  for (name,group),(x,top) in zip(groups,[(0,H),(W/2,H),(0,H/2),(W/2,H/2)]):student_slip(c,pack,group,name,x,top,W/2,'exit',1,exit_diagram,exit_size)
  rule(c,W/2,9,W/2,H-9,'#8B98AA',[4,4]);rule(c,9,H/2,W-9,H/2,'#8B98AA',[4,4]);c.showPage()
 for index,page in enumerate(teachers):
  d.fill(c,d.PURPLE);c.rect(0,H-8,W,8,fill=1,stroke=0);d.text(c,28,H-34,'KAIZEN MATHS','SansBold',10,d.PURPLE);d.text(c,28,H-63,'Teacher answers & working','STIX',23)
  yy=short_text(c,pack['topic']+' · '+pack['title'],28,H-76,W-56,10,True,d.INK)
  short_text(c,f"{pack['id']} · Student pages 1-{student_pages}. Print at 100%, single-sided. Cut on dashed lines.",28,yy-6,W-56,8)
  top=H-124
  for label,items in page:
   rule(c,28,top,W-28,top);d.text(c,28,top-15,label,'SansBold',10,d.TEAL);top=draw_flows(c,items,28,top-23,W-56)-4
   if top<36:raise DoesNotFit('Teacher page overflow')
  rule(c,28,30,W-28,30);d.text(c,28,17,'KAIZEN MATHS · STARTERS & EXIT TICKETS','SansBold',7,d.MUTED);c.setFont('Sans',8);c.drawRightString(W-28,17,f'Teacher copy · Page {student_pages+index+1} of {total}');c.showPage()
 c.save();reader=PdfReader(out);assert len(reader.pages)==total
 for page in reader.pages:
  t=page.extract_text();assert not re.search(r'\bNaN\b|=\s*undefined\b|\\(?:frac|begin|sqrt|cdot)\b',t),(pack['id'],'unrendered maths')
 return {k:v for k,v in pack.items() if k!='questions'}|{'questionCount':len(allq),'starterQuestionCount':max(map(len,starters)),'exitQuestionCount':max(map(len,exits)),'starterVariantCount':len(starters),'exitVariantCount':len(exits),'estimatedMinutes':5,'pageCount':total,'studentPageCount':student_pages,'teacherPageCount':len(teachers),'format':'half-page starters / quarter-page exit tickets','sections':['Starters','Exit tickets','Teacher answers and worked solutions'],'pdf':f"assets/practice-packs/library/{out.name}",'preview':f"assets/practice-packs/library/previews/{pack['slug']}.png"}

if __name__=='__main__':
 source=json.loads((ROOT/'tmp/pdfs/library-prepared.json').read_text());assert not source['renderErrors'];folder=ROOT/'output/pdf/library';folder.mkdir(parents=True,exist_ok=True);results=[];errors=[]
 # Optional bounded range supports targeted repairs without rebuilding already checked packs.
 selected=source['packs'];filter_slug=os.environ.get('KAIZEN_PACK_TOOL')
 if filter_slug:selected=[p for p in selected if p['sourceTool']==filter_slug]
 start=int(os.environ.get('KAIZEN_PACK_START','0'));count=int(os.environ.get('KAIZEN_PACK_COUNT',str(len(selected))));selected=selected[start:start+count]
 for i,pack in enumerate(selected):
  try:results.append(build(pack,folder))
  except Exception as e:errors.append({'id':pack['id'],'slug':pack['slug'],'error':str(e)})
  if (i+1)%25==0:print(f"Built {i+1}/{len(selected)}",flush=True)
 result={'packs':results,'errors':errors};target=ROOT/f'tmp/pdfs/library-build-{start}.json';target.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'built':len(results),'pages':sum(p['pageCount'] for p in results),'errors':errors},indent=2))
 if errors:sys.exit(1)
