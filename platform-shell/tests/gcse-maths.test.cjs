const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {JSDOM,VirtualConsole}=require(path.join(process.env.KAIZEN_PACK_NODE_MODULES||'/tmp/kaizen-ap-runtime/node_modules','jsdom')),root=path.resolve(__dirname,'..');
const dom=new JSDOM(fs.readFileSync(root+'/index.html','utf8'),{url:'http://localhost/#/gcse-maths',runScripts:'outside-only',virtualConsole:new VirtualConsole()}),w=dom.window,doc=w.document;w.setTimeout=w.setInterval=w.requestAnimationFrame=()=>0;
for(const f of ['assets/site/gcse-maths-data.js','assets/site/gcse-maths.js','assets/site/ib-maths-data.js','assets/site/ib-maths.js','app.js'])vm.runInContext(fs.readFileSync(root+'/'+f,'utf8'),dom.getInternalVMContext());
const sidebar=doc.querySelector('.sidebar'),data=w.KaizenGCSEData;const source=JSON.parse(fs.readFileSync(root+'/data/gcse-maths/library.json'));assert(!source.packs.find(p=>p.id==='G21').questions.some(q=>/exact form/i.test(q.question)));assert(source.packs.find(p=>p.id==='N04').questions.every(q=>q.marks===1));assert.equal(data.packs.length,106);assert.equal(data.packs.filter(p=>p.tier==='Foundation').length,75);assert.equal(doc.querySelector('h1').textContent,'GCSE Mathematics');assert(doc.querySelector('.sidebar [href="#/ready-made-resources"]').classList.contains('active'));assert(doc.querySelector('#app').textContent.includes('Board-neutral'));
for(const tier of ['foundation','higher']){
 doc.querySelector(`[data-gcse-tier="${tier}"]`).click();
 for(const area of ['Number','Algebra','Ratio & Proportion','Geometry & Measures','Probability','Statistics']){
  doc.querySelector(`[data-gcse-area="${area}"]`).click();
  const groups=[...doc.querySelectorAll('[data-gcse-group]')].map(b=>b.dataset.gcseGroup);
  for(const group of groups.length?groups:[null]){
   if(group)doc.querySelector(`[data-gcse-group="${group}"]`).click();
   assert(doc.querySelectorAll('.ap-topic-row').length>0);assert.equal(sidebar,doc.querySelector('.sidebar'));
   if(tier==='foundation')assert(!doc.querySelector('.ap-topic-name small'));
   for(const a of doc.querySelectorAll('.ap-row-links a[href$=".pdf"]'))assert(fs.existsSync(root+'/'+a.getAttribute('href')));
  }
 }
}
const search=doc.querySelector('#gcse-search');search.value='surds';search.dispatchEvent(new w.Event('input'));assert(doc.querySelector('.ap-topic-name').textContent.includes('Surds'));doc.querySelector('[data-gcse-tier="foundation"]').click();assert(doc.querySelector('.ap-empty'));doc.querySelector('[data-gcse-tier="higher"]').click();assert(doc.querySelector('.ap-topic-row'));
search.value='<svg onload=alert(1)>';search.dispatchEvent(new w.Event('input'));assert(!doc.querySelector('#gcse-results svg'));assert(doc.querySelector('.ap-empty'));
w.location.hash='#/gcse-maths?tier=invalid&area=invalid&group=invalid';w.renderRoute();assert(doc.querySelector('[data-gcse-tier="foundation"][aria-pressed="true"]'));assert.equal(doc.querySelectorAll('.ap-topic-row').length,8);
for(const p of data.packs){assert.equal(p.questions,8);assert.equal(p.studentPages,1);for(const role of ['student','teacher'])assert(fs.statSync(root+'/'+p[role]).size>1000);}
w.location.hash='#/ready-made-resources';w.renderRoute();assert(doc.querySelector('[href="#/gcse-maths"]'));assert.equal(doc.querySelectorAll('.resource-choice').length,5);
dom.window.close();console.log('PASS: 106 complete GCSE PDF pairs, 75 shared / 31 Higher-only packs, tier and subject/group filters, cross-subject search, escaping, fallback routes and persistent sidebar.');
