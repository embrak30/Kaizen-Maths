"""Refresh companion-tool links without rebuilding or changing any PDF."""
from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[2]
def attach(packs):
 links=json.loads((ROOT/'data/primary-packs/tool-links.json').read_text())
 titles=dict(re.findall(r'slug:\s*"([^"]+)",\s*title:\s*"([^"]+)"',(ROOT/'app.js').read_text()))
 for p in packs:
  choices=links[p['topicId']]
  if p['topicId']=='area-shapes' and p['grade']==6:choices=choices+[['area-triangles','Choose right-triangle area and perpendicular height.','direct']]
  if p['topicId']=='temperature' and p['grade']==4:choices=[['elementary-manipulatives','Use Number Line to discuss temperature rises and falls; use the paper for thermometer reading and larger values.','related']]
  if p['topicId']=='sets' and p['grade']==6:choices=[['venn-diagrams','Use two-set union, intersection and neither regions; omit conditional-probability extensions.','direct']]
  p['tools']=[{'slug':slug,'title':titles[slug],'hint':hint,'match':kind} for slug,hint,kind in choices]
 return packs
if __name__=='__main__':
 path=ROOT/'data/primary-packs/catalog.json';data=json.loads(path.read_text());attach(data['packs'])
 path.write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n')
 (ROOT/'assets/site/primary-packs-data.js').write_text('window.KaizenPrimaryPacksData='+json.dumps(data,separators=(',',':'),ensure_ascii=False)+';\n')
 print(f"Linked existing teaching resources to {len(data['packs'])} primary packs; PDFs unchanged.")
