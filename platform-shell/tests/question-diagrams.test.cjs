const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),{inventory,openGenerator}=require('../scripts/pack-library/runtime.cjs');
const root=path.resolve(__dirname,'..'),tools=inventory(root);let samples=0;const previews=[];
function near(a,b){assert(Math.abs(a-b)<1e-6*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);}
for(const slug of ['sine-cosine-rule','volume-surface-area-prisms','cylinders-cones-volume-surface-area','pyramids-spheres-volume-surface-area']){
 const r=openGenerator(root,tools.find(t=>t.slug===slug),22917),doc=r.window.document,diagrams=r.window.KaizenQuestionDiagrams;
 for(const level of r.api.getState().levels)for(const type of level.types.filter(t=>!/^mixed/.test(t.id)))for(let i=0;i<8;i++){
  const q=r.api.generate({level:level.id,type:type.id,count:1}).problems[0],el=doc.createElement('div');el.innerHTML=q.question;assert(el.querySelector('svg[data-diagram-kind]'),slug+'/'+type.id+' loses diagram in worksheet');assert(!/NaN|undefined/.test(q.question));samples++;
 }
 if(slug==='sine-cosine-rule'){
  for(let view=0;view<6;view++){
   const p=diagrams.triangleGeometry(9,12,110,view),dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);near(dist(p.B,p.C)/dist(p.A,p.C),9/12);near((dist(p.A,p.C)**2+dist(p.B,p.C)**2-dist(p.A,p.B)**2)/(2*dist(p.A,p.C)*dist(p.B,p.C)),Math.cos(110*Math.PI/180));
   const el=doc.createElement('div');el.innerHTML=diagrams.triangle({a:9,b:12,C:110,view,labels:{sides:{a:'a = 9 cm',b:'b = 12 cm',c:'c = ?'},angles:{C:'110°'}}});assert.equal(el.querySelector('[data-side=a]').getAttribute('data-edge'),'BC');assert.equal(el.querySelector('[data-side=b]').getAttribute('data-edge'),'AC');assert.equal(el.querySelector('[data-side=c]').getAttribute('data-edge'),'AB');
  }
  let single=0,double=0;
  for(let i=0;i<160;i++){
   const q=r.context.genSineFindAngleGeneral(),t=q.triangleData;t.solutions.length===2?double++:single++;
   assert([1,2].includes(t.solutions.length));for(const B of t.solutions){assert(t.A+B<180);near(Math.sin(B*Math.PI/180),t.b*Math.sin(t.A*Math.PI/180)/t.a);assert(q.answer.includes(B.toFixed(1)+'°'));}
   const el=doc.createElement('div');el.innerHTML=q.equation;assert.equal(el.querySelector('[data-angle=B]').textContent,'?');assert.equal(q.steps.filter(s=>s.includes('rule-solution-diagram')).length,t.solutions.length===2?2:0);
   if(i<2||(t.solutions.length===2&&!previews.some(p=>p.title==='Two possible triangles'))){previews.push({title:t.solutions.length===2?'Two possible triangles':'Sine rule — angle',html:q.equation});if(t.solutions.length===2)q.steps.filter(s=>s.includes('rule-solution-diagram')).forEach((html,i)=>previews.push({title:'Possible triangle '+(i+1),html}));}
  }
  assert(single>0&&double>0);
  for(const [name,label] of [['genSineFindSide','Sine rule — side'],['genCosineFindSide','Cosine rule — side'],['genCosineFindAngle','Cosine rule — angle'],['genAreaSine','Triangle area']])previews.push({title:label,html:r.context[name]().equation});
 }else{
  const definitions=slug==='volume-surface-area-prisms'?[['cuboidSvgBase',[9,5,7,'cm','h'],'Cuboid'],['triPrismSvgBase',[6,8,12,'cm',10],'Right triangular prism']]:slug==='cylinders-cones-volume-surface-area'?[['cylinderSvgBase',[4,12,'cm','h'],'Cylinder'],['coneSvgBase',[3,4,5,'cm','h'],'Cone']]:[['sphereSvgBase',[5,'cm','r'],'Sphere']];
  for(const [name,args,title] of definitions){
   const original=r.context[name](...args),seen=new Set();let originalLabels;
   for(let view=0;view<6;view++){
    const svg=diagrams.orientSolid(original,[title,args],{view});assert.equal(svg,diagrams.orientSolid(original,[title,args],{view}));const el=doc.createElement('div');el.innerHTML=svg;
    for(const hidden of el.querySelectorAll('.shape-hidden'))assert.equal(hidden.getAttribute('stroke-dasharray'),'5 4');
    const texts=[...el.querySelectorAll('text')].map(n=>n.textContent);if(!originalLabels)originalLabels=texts;assert.deepEqual(texts,originalLabels);assert([...el.querySelectorAll('text')].every(n=>!n.hasAttribute('transform')));
    const m=el.querySelector('g[transform]').getAttribute('transform').match(/[-\d.]+/g).map(Number);near(m[0]*m[2]+m[1]*m[3],0);near(m[0]**2+m[1]**2,m[2]**2+m[3]**2);seen.add(m.join(','));
    for(const rect of el.querySelectorAll('.qd-label-backing')){assert(+rect.getAttribute('x')>=0);assert(+rect.getAttribute('y')>=0);assert(+rect.getAttribute('x') + +rect.getAttribute('width')<=420);assert(+rect.getAttribute('y') + +rect.getAttribute('height')<=300);}
    if([0,2,4].includes(view))previews.push({title:title+' — view '+view,html:svg});
   }
   assert.equal(seen.size,6);
  }
  if(slug==='volume-surface-area-prisms'){const el=doc.createElement('div');el.innerHTML=r.context.triPrismSvgBase(6,8,12,'cm',10);const p=el.querySelector('.shape-face').getAttribute('points').split(' ').map(s=>s.split(',').map(Number));near((p[1][0]-p[0][0])*(p[2][0]-p[0][0])+(p[1][1]-p[0][1])*(p[2][1]-p[0][1]),0);}
  if(slug==='cylinders-cones-volume-surface-area')for(const [measure,missing,absent] of [['height','h','l ='],['slant','l','h =']]){const el=doc.createElement('div');el.innerHTML=r.context.coneSvg(3,4,5,'cm',missing,measure);assert(!el.textContent.includes(absent));assert(el.textContent.includes('x'));}
 }
 r.dom.window.close();
}
if(process.argv.includes('--preview')){
 const content=previews.map(p=>`<section><h2>${p.title}</h2>${p.html}</section>`).join('');fs.mkdirSync(path.join(root,'tmp/diagram-qa'),{recursive:true});fs.writeFileSync(path.join(root,'tmp/diagram-qa/gallery.html'),`<!doctype html><html><head><meta charset="utf-8"><title>Question diagrams</title><link rel="stylesheet" href="../../tools/_shared/question-diagrams.css"><style>body{margin:30px;font:17px Arial;color:#26344b;background:#f5f7fb}h1{font-size:27px}main{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}section{background:white;border:1px solid #d6deeb;border-radius:12px;padding:20px}h2{font-size:18px;color:#6751bc}svg{display:block;width:100%;max-width:440px;margin:auto}.rule-question{display:block}.rule-diagram{max-width:420px;margin:auto}.rule-prompt{margin:12px 0}.rule-solution-diagram{max-width:420px}</style></head><body><h1>Labelled triangles and varied solid orientations</h1><main>${content}</main></body></html>`);
}
console.log(`PASS: ${samples} real generated questions retain diagrams in the worksheet adapter; 160 SSA cases, triangle geometry/labels, 30 solid views, upright labels, stable renders and perpendicular markers.`);
