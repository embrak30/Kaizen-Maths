const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {JSDOM,VirtualConsole}=require(path.join(process.env.KAIZEN_PACK_NODE_MODULES||'/tmp/kaizen-ap-runtime/node_modules','jsdom')),root=path.resolve(__dirname,'..');
const dom=new JSDOM(fs.readFileSync(root+'/index.html','utf8'),{url:'http://localhost/#/ib-maths',runScripts:'outside-only',virtualConsole:new VirtualConsole()}),w=dom.window,doc=w.document;w.setTimeout=w.setInterval=w.requestAnimationFrame=()=>0;
for(const f of ['assets/site/ib-maths-data.js','assets/site/ib-maths.js','assets/site/csec-maths-data.js','assets/site/csec-maths.js','app.js'])vm.runInContext(fs.readFileSync(root+'/'+f,'utf8'),dom.getInternalVMContext());
const sidebar=doc.querySelector('.sidebar'),data=w.KaizenIBData,source=JSON.parse(fs.readFileSync(root+'/data/ib-maths/library.json'));
assert.equal(data.packs.length,138);assert.equal(doc.querySelector('h1').textContent,'IB Mathematics');assert(doc.querySelector('.sidebar [href="#/ready-made-resources"]').classList.contains('active'));
for(const course of Object.keys(data.courses)){
 doc.querySelector(`[data-ib-course="${course}"]`).click();const seen=new Set();
 for(const area of ['Number & Algebra','Functions','Geometry & Trigonometry','Statistics & Probability','Calculus']){
  doc.querySelector(`[data-ib-area="${area}"]`).click();const groups=[...doc.querySelectorAll('[data-ib-group]')].map(b=>b.dataset.ibGroup);
  for(const group of groups){
   doc.querySelector(`[data-ib-group="${group}"]`).click();let again=true;
   while(again){
    const rows=[...doc.querySelectorAll('.ap-topic-row')];assert(rows.length>0&&rows.length<=8);
    for(const row of rows){const id=row.querySelector('.ap-topic-number').textContent,p=data.packs.find(p=>p.id===id);assert(p.courses.includes(course));assert.equal(p.area,area);assert.equal(p.group,group);seen.add(id);for(const a of row.querySelectorAll('a[href$=".pdf"]'))assert(fs.existsSync(root+'/'+a.getAttribute('href')));}
    assert.equal(sidebar,doc.querySelector('.sidebar'));const next=doc.querySelector('#ib-next');again=next&&!next.disabled;if(again)next.click();
   }
  }
 }
 assert.equal(seen.size,data.packs.filter(p=>p.courses.includes(course)).length);
}
function search(value){let e=doc.querySelector('#ib-search');e.value=value;e.dispatchEvent(new w.Event('input'));}
doc.querySelector('[data-ib-course="aa-sl"]').click();search('matrices');assert(doc.querySelector('.ap-empty'));doc.querySelector('[data-ib-course="ai-hl"]').click();assert(doc.querySelector('.ap-topic-row'));
search('<svg onload=alert(1)>');assert(!doc.querySelector('#ib-results svg'));assert(doc.querySelector('.ap-empty'));
w.location.hash='#/ib-maths?course=invalid&area=invalid&group=invalid';w.renderRoute();assert(doc.querySelector('[data-ib-course="aa-sl"][aria-pressed="true"]'));
const byTitle=t=>source.packs.find(p=>p.title===t);
assert(!byTitle('Connected rates of change').courses.includes('aa-sl'));assert.deepEqual(byTitle('Maclaurin expansions').courses,['aa-hl']);assert.deepEqual(byTitle('Transition matrices and Markov chains').courses,['ai-hl']);assert(!byTitle('Chi-squared tests of independence').courses.includes('aa-hl'));assert(byTitle('Chi-squared tests of independence').questions.every(q=>q.answer.includes('df = 2')));
const toolSlugs=vm.runInContext('tools.map(t=>t.slug)',dom.getInternalVMContext());
for(const p of data.packs){for(const slug of p.tools)assert(toolSlugs.includes(slug),p.id+' '+slug);assert.equal(p.questions,8);assert.equal(p.studentPages,1);for(const role of ['student','teacher'])assert(fs.statSync(root+'/'+p[role]).size>1000);for(const sl of ['aa-sl','ai-sl'])if(p.courses.includes(sl))assert(p.courses.includes(sl.replace('-sl','-hl')));}
const missing=doc.createElement('div'),saved=w.KaizenIBData;w.KaizenIBData=null;w.KaizenIB.mount(missing);assert(missing.textContent.includes('could not load'));w.KaizenIBData=saved;
w.location.hash='#/ready-made-resources';w.renderRoute();assert(doc.querySelector('[href="#/ib-maths"]'));assert.equal(doc.querySelectorAll('.resource-choice').length,6);
dom.window.close();console.log('PASS: 138 IB PDF pairs, all four course mappings, every topic group and pagination, course-aware search, safe escaping, fallback, persistent navigation and specific SL/HL boundaries.');
