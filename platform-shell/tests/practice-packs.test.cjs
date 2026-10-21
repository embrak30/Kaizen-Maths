const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),catalog=JSON.parse(fs.readFileSync(path.join(root,'assets/practice-packs/catalog.json'),'utf8'));
const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync(path.join(root,'practice-packs.js'),'utf8'),ctx);
const {matches}=ctx.window.KaizenPracticePacks,packs=catalog.packs,sub=packs.filter(p=>p.sourceTool==='substitution');
assert.equal(packs.length,373);assert.equal(new Set(packs.map(p=>p.id)).size,373);assert.equal(new Set(packs.map(p=>p.slug)).size,373);assert.equal(sub.length,11);
assert.equal(sub.filter(p=>matches(p,'','', 'Mixed')).length,3);assert.equal(sub.filter(p=>matches(p,'',2,'')).length,4);assert.equal(sub.filter(p=>matches(p,'quadratic','', '')).length,3);
assert.equal(packs.filter(p=>matches(p,'AS-09','','')).length,1);assert.equal(sub.filter(p=>matches(p,'algebraic substitution',1,'Mixed')).length,1);assert.equal(packs.filter(p=>matches(p,'no such pack','','')).length,0);
const {inventory,openGenerator}=require('../scripts/pack-library/runtime.cjs'),tools=inventory(root);assert.equal(tools.length,110);assert.deepEqual([...new Set(packs.map(p=>p.sourceTool))].sort(),Array.from(tools,t=>t.slug).sort());
for(const p of packs){
 assert(matches(p,'',p.level,p.kind,p.category,p.sourceTool));assert(!matches(p,'','','','nonexistent subject'));
 const pdf=fs.readFileSync(path.join(root,p.pdf));assert(pdf.subarray(0,5).equals(Buffer.from('%PDF-')));assert(fs.existsSync(path.join(root,p.preview)));
 const folder=p.sourceTool==='substitution'?'substitution':'library';assert(fs.readFileSync(path.join(root,'output/pdf',folder,p.slug+'.pdf')).equals(pdf));
 assert(p.sections.includes('Starters')&&p.sections.includes('Exit tickets')&&p.sections.includes('Teacher answers and worked solutions'));
 assert(p.starterQuestionCount>=1&&p.starterQuestionCount<=4);assert(p.exitQuestionCount>=1&&p.exitQuestionCount<=3);assert(p.pageCount===p.studentPageCount+p.teacherPageCount);
}
const source=JSON.parse(fs.readFileSync(path.join(root,'data/practice-packs/library.json'),'utf8'));assert.equal(source.packs.length,362);assert.equal(source.failures.length,0);
for(const tool of tools.filter(t=>t.slug!=='substitution')){
 const runtime=openGenerator(root,tool);for(const level of runtime.api.getState().levels){const pack=source.packs.find(p=>p.sourceTool===tool.slug&&p.level===level.id);assert(pack,tool.slug+' missing level '+level.id);let types=level.types.filter(t=>!/(mixed|__kaizen|^all$)/i.test(t.id));if(!types.length)types=level.types.filter(t=>!/__kaizen/.test(t.id));for(const type of types)assert(pack.questions.some(q=>q.type===type.id),tool.slug+' missing '+type.id);assert(new Set(pack.questions.map(q=>q.question+'|'+q.given)).size===pack.questions.length);}
 runtime.dom.window.close();
}
console.log('PASS: 373 packs, all 110 standard generators, every configured level/type, filters, unique IDs, published PDFs and previews.');
