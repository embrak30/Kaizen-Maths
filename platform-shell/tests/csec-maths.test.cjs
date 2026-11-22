const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {JSDOM,VirtualConsole}=require(path.join(process.env.KAIZEN_PACK_NODE_MODULES||'/tmp/kaizen-ap-runtime/node_modules','jsdom')),root=path.resolve(__dirname,'..');
const dom=new JSDOM(fs.readFileSync(root+'/index.html','utf8'),{url:'http://localhost/#/csec-maths',runScripts:'outside-only',virtualConsole:new VirtualConsole()}),w=dom.window,doc=w.document;w.setTimeout=w.setInterval=w.requestAnimationFrame=()=>0;
for(const f of ['assets/site/csec-maths-data.js','assets/site/csec-maths.js','app.js'])vm.runInContext(fs.readFileSync(root+'/'+f,'utf8'),dom.getInternalVMContext());
const sidebar=doc.querySelector('.sidebar'),data=w.KaizenCSECData,source=JSON.parse(fs.readFileSync(root+'/data/csec-maths/library.json'));
assert.equal(data.packs.length,110);assert.equal(doc.querySelector('h1').textContent,'CSEC Mathematics');assert(doc.querySelector('.sidebar [href="#/ready-made-resources"]').classList.contains('active'));assert(doc.querySelector('#app').textContent.includes('May–June 2027'));
const seen=new Set();for(const module of [1,2,3]){
 doc.querySelector(`[data-csec-module="${module}"]`).click();const areas=[...doc.querySelectorAll('[data-csec-area]')].map(b=>b.dataset.csecArea);
 for(const area of areas){
  doc.querySelector(`[data-csec-area="${area}"]`).click();let again=true;
  while(again){
   const rows=[...doc.querySelectorAll('.ap-topic-row')];assert(rows.length>0&&rows.length<=8);
   for(const row of rows){const id=row.querySelector('.ap-topic-number').textContent,p=data.packs.find(p=>p.id===id);assert.equal(p.module,module);assert.equal(p.area,area);seen.add(id);for(const a of row.querySelectorAll('a[href$=".pdf"]'))assert(fs.existsSync(root+'/'+a.getAttribute('href')));}
   assert.equal(sidebar,doc.querySelector('.sidebar'));const next=doc.querySelector('#csec-next');again=next&&!next.disabled;if(again)next.click();
  }
 }
}assert.equal(seen.size,110);
const search=doc.querySelector('#csec-search');search.value='wages';search.dispatchEvent(new w.Event('input'));assert(doc.querySelector('.ap-topic-name').textContent.includes('Wages'));assert(doc.querySelector('.ap-topic-name small').textContent.includes('Module 1'));
search.value='<img src=x onerror=alert(1)>';search.dispatchEvent(new w.Event('input'));assert(!doc.querySelector('#csec-results img'));assert(doc.querySelector('.ap-empty'));
w.location.hash='#/csec-maths?module=wrong&area=wrong';w.renderRoute();assert(doc.querySelector('[data-csec-module="1"][aria-pressed="true"]'));
const slugs=vm.runInContext('tools.map(t=>t.slug)',dom.getInternalVMContext());for(const p of data.packs){assert.equal(p.questions,8);assert.equal(p.studentPages,1);for(const slug of p.tools)assert(slugs.includes(slug),p.id+' '+slug);for(const role of ['student','teacher'])assert(fs.statSync(root+'/'+p[role]).size>1000);}
assert(!source.packs.some(p=>/eigenvalues|differentiation|binomial distribution|conditional probability|iteration/i.test(p.title)));
assert(source.packs.some(p=>p.title==='Linear programming'&&p.module===3));assert(source.packs.some(p=>p.title==='Matrix addition and scalar multiplication'&&p.module===2));assert(source.packs.find(p=>p.title==='Income tax and net pay').questions.every(q=>q.question.includes('illustrative')));
const empty=doc.createElement('div');w.KaizenCSECData=null;w.KaizenCSEC.mount(empty);assert(empty.textContent.includes('could not load'));w.KaizenCSECData=data;
w.location.hash='#/ready-made-resources';w.renderRoute();assert(doc.querySelector('[href="#/csec-maths"]'));assert.equal(doc.querySelectorAll('.resource-choice').length,8);
dom.window.close();console.log('PASS: 110 CSEC PDF pairs, all modules/subjects/pagination, cross-module search, safe escaping, invalid-route fallback, existing tool links, curriculum boundaries and persistent sidebar.');
