const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),catalog=JSON.parse(fs.readFileSync(path.join(root,'assets/practice-packs/catalog.json'),'utf8'));
const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync(path.join(root,'practice-packs.js'),'utf8'),ctx);
const {matches}=ctx.window.KaizenPracticePacks,packs=catalog.packs;
assert.equal(packs.length,11);assert.equal(new Set(packs.map(p=>p.id)).size,11);
assert.equal(packs.filter(p=>matches(p,'','', 'Mixed')).length,3);
assert.equal(packs.filter(p=>matches(p,'',2,'')).length,4);
assert.equal(packs.filter(p=>matches(p,'quadratic','', '')).length,3);
assert.equal(packs.filter(p=>matches(p,'AS-09','','')).length,1);
assert.equal(packs.filter(p=>matches(p,'algebraic substitution',1,'Mixed')).length,1);
assert.equal(packs.filter(p=>matches(p,'no such pack','','')).length,0);
for(const p of packs){
 const pdf=fs.readFileSync(path.join(root,p.pdf));assert(pdf.subarray(0,5).equals(Buffer.from('%PDF-')));assert(fs.existsSync(path.join(root,p.preview)));
 const original=fs.readFileSync(path.join(root,'output/pdf/substitution',p.slug+'.pdf'));assert(original.equals(pdf));
 assert(p.sections.includes('Questions')&&p.sections.includes('Answer sheet')&&p.sections.includes('Worked solutions'));
}
const source=JSON.parse(fs.readFileSync(path.join(root,'data/practice-packs/substitution.json'),'utf8'));
assert.equal(source.packs.reduce((n,p)=>n+p.questions.length,0),61);
assert.equal(new Set(source.packs.flatMap(p=>p.questions.map(q=>q.given+'|'+q.expression))).size,61);
console.log('PASS: catalogue filters, all 11 PDF and preview paths, fixed publication copies, pack sections, question counts and collection-wide uniqueness.');
