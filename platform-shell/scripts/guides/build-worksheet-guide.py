"""Build the printable walkthrough from the same copy and live-site screenshots as the web guide."""
from pathlib import Path
import json,subprocess,shutil
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
from reportlab.lib.colors import HexColor,white
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from PIL import Image
from pypdf import PdfReader
ROOT=Path(__file__).resolve().parents[2]
NODE='/Users/barker/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node'
steps=json.loads(subprocess.check_output([NODE,'-e',"process.stdout.write(JSON.stringify(require('./assets/site/worksheet-walkthrough.js').steps))"],cwd=ROOT))
folder=ROOT/'assets/guides/worksheet-builder';out=ROOT/'output/pdf/kaizen-maths-worksheet-guide.pdf';out.parent.mkdir(parents=True,exist_ok=True)
W,H=landscape(A4);M=30
ink=HexColor('#203448');teal=HexColor('#0f766e');purple=HexColor('#65519d');muted=HexColor('#526477')
styles={
 'body':ParagraphStyle('body',fontName='Helvetica',fontSize=11,leading=15,textColor=ink),
 'tip':ParagraphStyle('tip',fontName='Helvetica',fontSize=10,leading=13,textColor=muted)
}
from xml.sax.saxutils import escape
def paragraph(text,x,top,width,kind='body'):
 p=Paragraph(escape(text),styles[kind]);_,h=p.wrap(width,1000);p.drawOn(c,x,top-h);return h
c=canvas.Canvas(str(out),pagesize=(W,H));c.setTitle('Make your first maths worksheet | Kaizen Maths');c.setAuthor('Kaizen Maths / Embark Education')
for i,step in enumerate(steps,1):
 c.setFillColor(HexColor('#f6f9fc'));c.rect(0,0,W,H,fill=1,stroke=0)
 c.setFillColor(purple);c.roundRect(M,H-52,27,27,5,fill=1,stroke=0);c.setFillColor(white);c.setFont('Helvetica-Bold',18);c.drawCentredString(M+13.5,H-45,'K')
 c.setFillColor(teal);c.setFont('Helvetica-Bold',9);c.drawString(M+39,H-35,'KAIZEN MATHS  /  WORKSHEET BUILDER')
 c.setFillColor(muted);c.setFont('Helvetica',8);c.drawRightString(W-M,H-35,f'SCREENSHOT WALKTHROUGH  |  {i} OF {len(steps)}')
 c.setFillColor(ink);c.setFont('Helvetica-Bold',22);c.drawString(M,H-82,f'{i}. {step["title"]}')
 h=paragraph(step['text'],M,H-99,W-2*M)
 picture=Image.open(folder/step['image']).convert('RGB')
 # Keep the entry screenshot's sidebar; later images focus on the real worksheet area,
 # cropping out the account bar and footer without changing any interface content.
 if i>1:picture=picture.crop((260,54,picture.width,623))
 maxw=W-2*M;maxh=H-218-h
 ratio=min(maxw/picture.width,maxh/picture.height)
 iw,ih=picture.width*ratio,picture.height*ratio
 x=(W-iw)/2;y=78+(maxh-ih)/2
 c.setFillColor(white);c.setStrokeColor(HexColor('#d6e1e9'));c.roundRect(x-1,y-1,iw+2,ih+2,5,fill=1,stroke=1)
 c.drawImage(ImageReader(picture),x,y,iw,ih)
 c.setFillColor(HexColor('#edf5f2'));c.roundRect(M,31,W-2*M,37,6,fill=1,stroke=0)
 paragraph(step['tip'],M+12,57,W-2*M-24,'tip')
 c.setFillColor(muted);c.setFont('Helvetica',7);c.drawString(M,18,'Actual live-site screenshots captured 1 November 2026. Layout may vary with window size.')
 c.drawRightString(W-M,18,f'kaizenmaths.com  |  {i}')
 c.linkURL('https://kaizenmaths.com/guides/make-a-worksheet',(W-200,10,W-M,27),relative=0)
 c.showPage()
c.save()
reader=PdfReader(str(out));assert len(reader.pages)==len(steps)
for i,page in enumerate(reader.pages):
 text=page.extract_text();assert steps[i]['title'] in text;assert '\ufffd' not in text
shutil.copyfile(out,folder/out.name)
(folder/'capture-notes.json').write_text(json.dumps({'source':'https://www.kaizenmaths.com/#/worksheet-generator','captured':'2026-11-01','images':[s['image'] for s in steps],'example':'Algebraic Substitution: five linear and three quadratic questions','notes':'Screenshots taken through normal signed-in UI. No pupil data. PDF crops retain actual worksheet content and remove the account bar.'},indent=2)+'\n')
print(f'Built and checked {len(reader.pages)} pages: {out}')
