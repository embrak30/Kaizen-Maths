const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),{JSDOM,VirtualConsole}=require(path.join(process.env.KAIZEN_PACK_NODE_MODULES||'/tmp/kaizen-ap-runtime/node_modules','jsdom'));
const d=new JSDOM(fs.readFileSync(root+'/index.html','utf8'),{url:'http://localhost/#/alevel-maths',runScripts:'outside-only',virtualConsole:new VirtualConsole()});const w=d.window;w.setTimeout=w.setInterval=w.requestAnimationFrame=()=>0;
for(const name of ['assets/site/alevel-maths-data.js','assets/site/alevel-maths.js','app.js'])vm.runInContext(fs.readFileSync(root+'/'+name,'utf8'),d.getInternalVMContext());
const doc=w.document,sidebar=doc.querySelector('.sidebar');assert.equal(doc.querySelector('h1').textContent,'A level Mathematics');assert.equal(w.KaizenALevelData.packs.length,140);
assert.equal(doc.querySelectorAll('.ap-topic-row').length,3);assert(doc.querySelector('.sidebar a[href="#/tools"]').classList.contains('active'));
for(const area of ['Pure','Statistics','Mechanics']){
 doc.querySelector(`[data-alevel-area="${area}"]`).click();assert(w.location.hash.includes('area='+area));assert.equal(doc.querySelectorAll('[data-alevel-area][aria-pressed="true"]').length,1);
 for(const button of [...doc.querySelectorAll('[data-alevel-group]')]){const id=button.dataset.alevelGroup;doc.querySelector(`[data-alevel-group="${id}"]`).click();assert(doc.querySelectorAll('.ap-topic-row').length>0);for(const a of doc.querySelectorAll('.ap-row-links a[href$=".pdf"]'))assert(fs.existsSync(root+'/'+a.getAttribute('href')));}
 assert.equal(sidebar,doc.querySelector('.sidebar'));
}
doc.querySelector('[data-alevel-area="Statistics"]').click();doc.querySelector('[data-alevel-group="LDS"]').click();assert.equal(doc.querySelectorAll('.ap-topic-row').length,2);assert(doc.querySelector('.alevel-source a').href.includes('pearson.com'));
const input=doc.querySelector('#alevel-search');input.value='normal';input.dispatchEvent(new w.Event('input'));assert(doc.querySelectorAll('.ap-topic-row').length>=3);input.value='<img src=x onerror=alert(1)>';input.dispatchEvent(new w.Event('input'));assert(!doc.querySelector('#alevel-results img'));assert(doc.querySelector('.ap-empty'));
w.location.hash='#/alevel-maths?area=invalid&group=invalid';w.renderRoute();assert(doc.querySelectorAll('.ap-topic-row').length>0);
w.location.hash='#/curriculum-alignments';w.renderRoute();assert(doc.querySelector('.curriculum-chooser-hero'));assert.equal(sidebar,doc.querySelector('.sidebar'));
w.location.hash='#/curriculum-alignments/pearson-edexcel';w.renderRoute();assert(doc.querySelector('.ap-curriculum-link [href="#/alevel-maths"]'));
w.location.hash='#/tools';w.renderRoute();assert(doc.querySelector('.explore-action[href="#/alevel-maths"]'));
for(const p of w.KaizenALevelData.packs){assert.equal(p.questions,8);assert.equal(p.studentPages,1);for(const role of ['student','teacher'])assert(fs.statSync(root+'/'+p[role]).size>1000);}
d.window.close();console.log('PASS: 140 download pairs, subject/topic filters, search, hostile input escaping, fallback routes, persistent sidebar and curriculum chooser.');
