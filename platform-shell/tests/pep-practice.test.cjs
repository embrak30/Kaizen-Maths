const assert=require('node:assert/strict'),path=require('node:path');
process.env.KAIZEN_PACK_NODE_MODULES=process.env.KAIZEN_MARKETING_NODE_MODULES||'/tmp/kaizen-primary-map-tests/node_modules';
const {openGenerator,inventory}=require('../scripts/pack-library/runtime.cjs');
const root=path.resolve(__dirname,'..'),tool=inventory(root).find(t=>t.slug==='pep-practice');
assert(tool);const r=openGenerator(root,tool,8942),{window:w,api}=r,doc=w.document;
assert.equal(api.getState().levels.length,3);
let generated=0;
for(const level of api.getState().levels){
 assert(!level.types.some(t=>level.id===4&&['ratio','percent','reverse'].includes(t.id)));
 for(const type of level.types){
  const result=api.generate({level:level.id,type:type.id,count:50});assert(result.ok);assert.equal(result.problems.length,50);
  for(const q of result.problems){generated++;if(/mixed/.test(type.id))assert(!q.source.parts);assert(q.question&&q.answer&&q.steps.length);assert(!/undefined|NaN|Infinity|\\(?:frac|left|right)/.test(q.question+q.answer+q.steps.join('')));
   if(q.source.parts){const c=q.source.context;assert.equal(c.number*c.pack,c.remaining);assert.equal(c.income,c.number*c.price);assert.equal(c.profit,c.income-c.cost);assert.equal(c.total/c.d+c.remaining,c.total);assert.equal(c.remaining%c.pack,0);assert(c.cost>0);assert.equal(q.source.marks,q.source.parts.reduce((s,p)=>s+p[3],0));assert.equal(q.source.parts.length,level.id===4?4:5);}
   if(q.source.question.includes('seedlings')){const total=Number(q.question.match(/There are (\d+)/)[1]);const n=Number(q.question.match(/numerator">(\d+)/)[1]),d=Number(q.question.match(/denominator">(\d+)/)[1]);assert.equal(Number(q.answer.match(/\d+/)[0]),total*n/d);assert(!q.question.includes('<svg'));assert(q.source.modelHtml.includes('<svg'));}
  }
 }
}
assert.equal(doc.querySelectorAll('.card').length,4);assert(!doc.querySelector('.solution'));
assert.equal(doc.querySelector('#presentation').value,'test');assert(!doc.querySelector('.bar-support'));
const questionText=()=>Array.from(doc.querySelectorAll('.question-prompt'),e=>e.innerHTML);
const prompts=questionText(),snapshot=()=>JSON.stringify(w.eval('problems'));
const original=snapshot();
doc.querySelector('#presentation').value='supported';doc.querySelector('#presentation').dispatchEvent(new w.Event('change'));
assert.equal(doc.querySelectorAll('.bar-support').length,4);assert.deepEqual(questionText(),prompts);assert.equal(snapshot(),original);
doc.querySelector('#presentation').value='test';doc.querySelector('#presentation').dispatchEvent(new w.Event('change'));assert(!doc.querySelector('.bar-support'));assert.equal(snapshot(),original);
// Diagrams that belong to a question remain in assessment-style exports.
const shape=api.generate({level:4,type:'measurement',count:1}).problems[0];assert(shape.question.includes('data-diagram-kind="rectangle"'));assert(!shape.question.includes('bar-support'));
for(const type of ['fractions','money','ratio','percent','reverse','linked'])assert(!api.generate({level:6,type,count:1}).problems[0].question.includes('bar-support'));

doc.querySelector('[data-view=solutions]').click();assert(doc.querySelector('.solution'));
const before=doc.querySelector('#content').textContent;let printed=false;w.print=()=>{printed=true;assert.equal(doc.querySelectorAll('.print-section').length,4);const sections=doc.querySelectorAll('.print-section');assert(!sections[0].querySelector('.bar-support'));assert(sections[1].querySelector('.bar-support'));assert.deepEqual(Array.from(sections[0].querySelectorAll('.question-prompt'),e=>e.innerHTML),Array.from(sections[1].querySelectorAll('.question-prompt'),e=>e.innerHTML));assert.equal(snapshot(),original);assert.equal(doc.querySelectorAll('.print-section')[0].querySelectorAll('.solution').length,0);};doc.querySelector('#print-choice').value='all';doc.querySelector('#print').click();assert(printed);w.dispatchEvent(new w.Event('afterprint'));assert.equal(doc.querySelector('#content').textContent,before);
w.print=()=>{assert.equal(doc.querySelectorAll('.print-section').length,2);assert(!doc.querySelector('.solution'));assert.equal(doc.querySelectorAll('.bar-support').length,4);};doc.querySelector('#print-choice').value='paired';doc.querySelector('#print').click();w.dispatchEvent(new w.Event('afterprint'));
doc.querySelector('#mode').value='linked';doc.querySelector('#mode').dispatchEvent(new w.Event('change'));assert(doc.querySelector('#skill').disabled);assert.equal(doc.querySelectorAll('.card').length,1);
doc.querySelector('#grade').value='6';doc.querySelector('#grade').dispatchEvent(new w.Event('change'));assert.equal(doc.querySelectorAll('.card').length,1);assert(doc.querySelector('#content').textContent.includes('Reading'));
doc.querySelector('[data-view=questions]').click();assert(!doc.querySelector('.bar-support'));const linkedPrompts=questionText(),linkedSnapshot=snapshot();doc.querySelector('#presentation').value='supported';doc.querySelector('#presentation').dispatchEvent(new w.Event('change'));assert.equal(doc.querySelectorAll('.bar-support').length,2);assert.deepEqual(questionText(),linkedPrompts);assert.equal(snapshot(),linkedSnapshot);
// Ratio rows must use a common unit width; percent bars use at most ten units.
const ratio=api.generate({level:6,type:'ratio',count:1}).problems[0];const container=doc.createElement('div');container.innerHTML=ratio.source.modelHtml;const svgs=container.querySelectorAll('svg');assert.equal(svgs[0].querySelector('rect').getAttribute('width'),svgs[1].querySelector('rect').getAttribute('width'));
for(let i=0;i<30;i++){container.innerHTML=api.generate({level:6,type:'percent',count:1}).problems[0].source.modelHtml;assert(container.querySelectorAll('rect').length<=10);}

console.log(`PEP practice: ${generated} generated items, arithmetic invariants, grade gating, worksheet adapter, reveal and print isolation passed.`);r.dom.window.close();
