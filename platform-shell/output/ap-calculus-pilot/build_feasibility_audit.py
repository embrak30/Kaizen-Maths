"""Read-only application audit; writes review artifacts, never application code."""
from build_pilots import *
from collections import Counter
SOURCE=ROOT/'output/ap-calculus-pilot';data=json.loads((SOURCE/'topic-map.json').read_text())
capabilities=json.loads(Path('/tmp/ap-generator-capabilities.json').read_text());sampled=sum(len(t.get('types',[])) for t in capabilities);samples=sum(v.get('count',0) for t in capabilities for v in t.get('types',[]))
PILOTS={'1.1','4.5'}
VISUAL=set('1.1 1.3 1.9 1.10 1.14 1.15 2.1 2.3 2.4 3.3 4.2 4.4 4.5 4.6 5.3 5.4 5.6 5.7 5.8 5.9 5.10 5.11 5.12 6.1 6.2 6.3 6.4 6.5 7.3 7.4 7.5 7.9 8.2 8.3 8.4 8.5 8.6 8.7 8.8 8.9 8.10 8.11 8.12 9.1 9.3 9.6 9.7 9.8 9.9'.split())
CAREFUL=set('1.8 1.16 2.4 4.7 5.1 5.2 5.5 5.6 5.7 5.11 6.4 6.5 6.13 7.3 7.4 7.9 8.6 8.10 8.12 8.13 9.3 9.6 9.9 10.1 10.3 10.4 10.5 10.6 10.7 10.8 10.9 10.10 10.12 10.13'.split())
for unit in data['units']:
 for row in unit['rows']:
  row['delivery']='Pilot' if row['code'] in PILOTS else 'Reuse core' if row['status']=='Core' else 'Author pack'
  row['fixedPDF']='Feasible; draft exists' if row['delivery']=='Pilot' else 'Feasible; not authored'
  row['visualWork']=row['code'] in VISUAL;row['extraValidation']=row['code'] in CAREFUL
  row['publication']='Not published; content approval and separate-file QA required'
rows=[r for u in data['units'] for r in u['rows']];counts=Counter(r['delivery'] for r in rows)
assert counts=={'Pilot':2,'Reuse core':36,'Author pack':73}

def para(c,title,txt,y):
 y=p(c,title,L,y,style='sub')-4;return p(c,txt,L,y,CW,'body')-15

def make_pdf():
 c=canvas.Canvas(str(OUT/'ap-calculus-worksheet-feasibility-audit.pdf'),pagesize=(W,H));c.setTitle('Kaizen AP Calculus - Worksheet feasibility audit');c.setAuthor('Kaizen Maths');page=1
 y=header(c,'AUDIT','AP Calculus worksheet library','Review only | 17 November 2026',page)
 for title,txt in [
 ('Recommendation','Build an AP Calculus landing page organized by unit, then one page per topic. Each topic page should have two separate downloads: a pupil question PDF and a teacher PDF containing answers, complete worked solutions and suggested marks. Supported practice can be an optional third download.'),
 ('What this audit found','All 111 numbered topics in the supplied Course at a Glance are feasible candidates for fixed, original ten-question worksheets. This is an authoring assessment, not a claim that 111 packs exist. Two pilots exist for review; 36 topics have a directly related procedural question family to reuse; 73 need new AP-specific question writing or substantial adaptation.'),
 ('What does not need to wait','A fixed worksheet does not need an interactive generator first. We can author a carefully checked pack, including static graphs, tables or slope fields, and publish it once approved. A tool is needed later if you want fresh randomized versions on demand. Graph-heavy and proof-heavy topics require more development and validation, not automatic exclusion.'),
 ('What the counts mean','Pilot: draft questions and schemes already exist, combined in one review PDF per topic. Reuse core: existing generation can contribute calculations, but it does not supply a complete AP-balanced worksheet automatically. Author pack: develop a new fixed set; related tools may still help. No category means publication-ready.'),
 ('Evidence checked',f'The four-page uploaded Course at a Glance was reconciled with all 111 entries in the previous map. Reviewed relevant generator configurations and exercised {len(capabilities)} existing generators, {sampled} non-mixed question subtypes and {samples} sample questions through the worksheet adapter. Samples returned question, answer and worked-step fields without runtime errors. This is an integration smoke check, not proof of mathematical correctness or AP alignment.'),
 ('Scope and source limits','Topic labels are condensed from the uploaded outline. AB and BC share 81 numbered topics; 30 are BC only, including six inside Units 6-8. Shared topics can contain additional BC essential knowledge. AP Central reports no change to course content for 2026-27, but the current description and Fall 2026 clarifications must govern the eventual questions. Do not reuse historical exam weights or timings from the old outline.')]:
  y=para(c,title,txt,y)
 y=p(c,'Official checks: <link href="https://apcentral.collegeboard.org/courses/ap-calculus-ab" color="#146d65">AP Central course page</link> and <link href="https://apcentral.collegeboard.org/media/pdf/ap-calculus-ab-bc-course-and-exam-description-clarifications.pdf" color="#146d65">Fall 2026 clarifications</link>.',L,y,style='small')
 if y<50:raise ValueError('Intro overflow')
 c.showPage();page+=1;y=header(c,'SUMMARY','Unit-by-unit readiness','Fixed PDF production | Not an on-demand generation coverage claim',page)
 summary=[['Unit','Topics','Pilot','Reuse core','Author pack']]
 for u in data['units']:
  cc=Counter(r['delivery'] for r in u['rows']);summary.append([str(u['n'])+'  '+u['title'],str(len(u['rows'])),str(cc['Pilot']),str(cc['Reuse core']),str(cc['Author pack'])])
 summary.append(['TOTAL','111','2','36','73'])
 cells=[[Paragraph(escape(s),styles['cell']) for s in row] for row in summary];t=Table(cells,colWidths=[CW-205,45,40,60,60]);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),PALE),('BACKGROUND',(0,-1),(-1,-1),PALE),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,-1),.5,colors.HexColor('#d3e1dd')),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7)]));_,hh=t.wrap(CW,1000);t.drawOn(c,L,y-hh);y-=hh+20
 for title,txt in [
 ('First production batch','Split the two approved pilot packs into separate questions and teacher schemes. Next use topics with the clearest reusable core: 1.4-1.6, 1.13, 1.15; 2.2, 2.5-2.10; 3.1-3.2, 3.4, 3.6; 6.7-6.10; 7.6-7.8; 8.9 and 8.11. These still need varied AP tasks and complete review, rather than ten repeated calculations.'),
 ('Second production batch','Complete the rest of the shared AB topics, including graph interpretation, theorems, optimization, accumulation and slope fields. Use static authored diagrams where needed. Within each unit, show only downloads that exist and have passed review.'),
 ('BC production batch','Use reusable core topics 6.11-6.12, 7.5, 9.1-9.2, 9.7-9.8, 10.2, 10.11 and 10.14-10.15 as starting points. Convergence proofs, error bounds, improper integrals, logistic reasoning and vector motion require dedicated validation. Treat this as a content-production sequence, not a limit on what can eventually be supplied.')]:y=para(c,title,txt,y)
 if y<50:raise ValueError('Summary overflow '+str(y))
 c.showPage()
 for unit in data['units']:
  page+=1;y=header(c,'UNIT '+str(unit['n']),unit['title'],'Every numbered topic assessed for fixed questions + teacher scheme',page)
  y=p(c,'All rows are feasible for a fixed authored pack. Pilot = draft exists; Reuse core = procedural family available; Author pack = new AP set needed. V = visual/data work; R = additional theorem, domain or model validation. Every pack requires review.',L,y,style='small')-12
  tabledata=[[Paragraph(s,styles['cell']) for s in ['Topic','Scope','Delivery route / basis','Work before publication']]]
  for r in unit['rows']:
   flags=(' V' if r['visualWork'] else '')+(' R' if r['extraValidation'] else '')
   work=('Split the existing pilot into pupil and teacher PDFs; review content.' if r['delivery']=='Pilot' else r['need'])
   tabledata.append([Paragraph('<b>'+r['code']+'</b> '+escape(r['title']),styles['cell']),Paragraph(r['scope'],styles['cell']),Paragraph('<b>'+r['delivery']+'</b>'+flags+'<br/>'+escape(r['basis']),styles['cell']),Paragraph(escape(work),styles['cell'])])
  t=Table(tabledata,colWidths=[155,43,108,CW-306],repeatRows=1);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),PALE),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,-1),.4,colors.HexColor('#d0dfda')),('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),('LEFTPADDING',(0,0),(-1,-1),5)]));_,hh=t.wrap(CW,1000)
  if y-hh<50:raise ValueError('Unit overflow '+str(unit['n']))
  t.drawOn(c,L,y-hh);c.showPage()
 page+=1;y=header(c,'DELIVERY','Page structure and quality gates','Proposed implementation after the audit',page)
 for title,txt in [
 ('AP landing page','AB / BC filter; ten unit groups; topic numbers and names in syllabus order. Each topic shows Reviewed pack available, Draft in review, or Not yet available. Preserve Kaizen’s existing sidebar. Do not show broken or placeholder PDF download buttons.'),
 ('Each topic page','Topic title and learning objective; Download questions PDF; Download answers & suggested marks PDF; optional supported version; relevant existing teaching tools; calculator expectations and resource revision date. Preview the questions if helpful, but keep downloads prominent. Worked solutions must appear in the teacher PDF, not only the final answers.'),
 ('Question and marking standard','Ten main questions with deliberate progression and different demands. Use graphs, tables, algebra, context and justification where the objective needs them; do not impose one identical mix on every topic. Show prerequisite assumptions and units. Suggested marks must sum correctly and credit valid methods and sensible follow-through. Label schemes as Kaizen guidance, not official AP scoring.'),
 ('Checks before any pack goes live','Check every answer independently; verify domains, theorem hypotheses, endpoint cases, sign conventions and numerical tolerances. Confirm diagrams agree with the calculations. Check all PDF pages for notation, fraction layout, clipping and working space. Confirm the questions-only download contains no answer pages. Have you review the pilot style before scaling.'),
 ('What new tools would later add','Randomized graphs with consistent limits and derivatives; slope-field construction; related-rates scenario generators; accumulation and motion models; optimization constraints; vector-valued calculus; convergence-test selection and error-bound validation. These improve fresh-question generation. They are not prerequisites for publishing a checked static worksheet.'),
 ('What remains undecided','Whether supported versions are offered for every topic or selected topics; whether the AP library inherits existing subscription access; whether downloads require sign-in; and whether the first release contains AB only or also a first group of BC packs. These choices do not stop fixed-pack authoring. No application, payment, authentication or database changes were made during this audit.')]:y=para(c,title,txt,y)
 if y<50:raise ValueError('Delivery overflow')
 c.showPage();page+=1;y=header(c,'EVIDENCE','Tool directory and limitations','Existing material inspected | Codes used in the topic tables',page)
 for code,(title,slug) in data['toolDirectory'].items():
  y=p(c,'<b>'+code+'</b>  <link href="https://www.kaizenmaths.com/#/tools/'+slug+'" color="#146d65">'+escape(title)+'</link>',L,y,style='hint')-9
 y=para(c,'Important boundaries','Further Vectors currently supplies vector geometry, not vector calculus. Cross-section and revolution explainers can support teaching but do not by themselves produce a complete AP worksheet. Improper algebraic fractions are not improper integrals. Arithmetic/geometric series are not full coverage of convergence tests. Exclude integrating factors, second-order differential equations and unrelated A-level extensions from AB sets.',y-5)
 y=p(c,'Sources: supplied Course at a Glance (4 pages), detailed Course and Exam Description (256 pages), existing Kaizen topic map and generator source/configurations, and current AP Central references linked on page 1. The two supplied teaching packets informed the earlier pilots. Original questions will be authored; secure AP Classroom question banks are not available through this audit and are not required for the proposed library.',L,y,style='small')
 if y<50:raise ValueError('Evidence overflow')
 c.showPage();c.save();return page

if __name__=='__main__':
 print('Feasibility audit:',make_pdf(),'pages;',dict(counts),';',len(capabilities),'generators;',sampled,'subtypes;',samples,'samples')
 (SOURCE/'worksheet-feasibility-audit.json').write_text(json.dumps({'counts':dict(counts),'units':data['units'],'capabilitySmokeChecks':capabilities,'note':'All topics feasible for fixed authored packs; publication requires mathematical and PDF QA. No application changes.'},indent=2))
 md=['# AP Calculus worksheet feasibility audit','',f'111 topics: 2 pilots, 36 reusable procedural cores, 73 new or substantially adapted AP packs. {len(capabilities)} generators / {sampled} subtypes / {samples} sample outputs checked for adapter operation, not mathematical correctness.','', 'All topics are feasible candidates for fixed original PDFs. No claim that packs are already authored or ready to publish. Static packs do not require interactive generators first.','']
 for u in data['units']:
  md+=['## Unit '+str(u['n'])+': '+u['title'],'','| Topic | Scope | Delivery route | Reuse basis | Publication work |','|---|---|---|---|---|']
  md+=['| '+r['code']+' '+r['title']+' | '+r['scope']+' | '+r['delivery']+' | '+r['basis']+' | '+r['need']+' |' for r in u['rows']];md+=['']
 (SOURCE/'worksheet-feasibility-audit.md').write_text('\n'.join(md)+'\n')
