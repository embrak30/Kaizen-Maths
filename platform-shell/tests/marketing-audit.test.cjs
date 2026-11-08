const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');const {JSDOM,VirtualConsole}=require(process.env.KAIZEN_MARKETING_NODE_MODULES?path.join(process.env.KAIZEN_MARKETING_NODE_MODULES,'jsdom'):'jsdom');
const M=require(root+'/assets/site/marketing.js'),proof=require(root+'/assets/site/marketing-proof.js');
function app(hash='') {const dom=new JSDOM(fs.readFileSync(root+'/index.html','utf8'),{url:'https://kaizenmaths.com/'+hash,runScripts:'outside-only',virtualConsole:new VirtualConsole()});const w=dom.window;w.setTimeout=w.setInterval=w.requestAnimationFrame=()=>0;w.KaizenMarketing=M;w.KaizenMarketingProof=proof;w.KaizenPublicPages=require(root+'/assets/site/public-pages.js');for(const file of ['bar-modelling-data.js','bar-modelling.js'])vm.runInContext(fs.readFileSync(root+'/assets/courses/'+file,'utf8'),dom.getInternalVMContext());vm.runInContext(fs.readFileSync(root+'/app.js','utf8'),dom.getInternalVMContext());return dom;}
const home=app(),doc=home.window.document;
assert.equal(doc.querySelectorAll('#app h1').length,1);assert.match(doc.querySelector('h1').textContent,/Maths teachers/);
assert.equal(doc.querySelectorAll('.home-hero-actions .button.primary').length,1);assert.equal(doc.querySelectorAll('.home-hero-actions .button').length,1);assert(!doc.querySelector('.home-hero-actions [href="#/partners"]'));
assert.equal(doc.querySelectorAll('.sidebar .nav-list > a,.sidebar .nav-list > button').length,7);
assert.equal(doc.querySelectorAll('.mobile-nav .nav-list > a,.mobile-nav .nav-list > button').length,7);
const section=[...doc.querySelector('#app').children];assert(section.indexOf(doc.querySelector('.home-benefits'))<section.indexOf(doc.querySelector('.mission-programme-band')));
assert.equal(doc.querySelectorAll('.marketing-faq details').length,6);assert(doc.querySelector('.marketing-founder').textContent.includes('Dr Megel Barker'));assert(!doc.querySelector('.marketing-adoption,.marketing-mention'));assert(!doc.querySelector('.marketing-founder img'));assert(M.proofHtml(proof).includes('Dr Megel Barker'));
assert(doc.querySelector('.marketing-output a').href.endsWith('.pdf'));
// Test actual legacy routes, their handlers and the relocated workspace directory.
home.window.location.hash='#/tools';home.window.renderRoute();assert(doc.querySelector('.explore-actions [href="#/worksheet-generator"]'));assert(!doc.querySelector('.workspace-directory'));assert.equal(doc.querySelectorAll('.tool-index-group').length,7);
home.window.location.hash='#/upgrade';home.window.renderRoute();assert.equal(doc.querySelectorAll('[data-checkout-plan]').length,2);assert(doc.querySelector('#manageBilling')===null);assert(doc.querySelector('.marketing-table-wrap'));assert(doc.querySelector('.upgrade-page').textContent.includes('£9.99/month'));
home.window.KaizenAuth={state:{session:{user:{id:'test-user',email:'test@example.invalid'}},profile:{role:'pro'}}};home.window.renderRoute();assert(doc.querySelector('#manageBilling'));assert.equal(doc.querySelectorAll('[data-checkout-plan]').length,2);
home.window.KaizenAuth.state.profile={role:'trial',trial_ends_at:'2000-01-01T00:00:00Z'};assert.equal(home.window.currentUserRole(),'free');
// No session is needed for public pricing and comparisons; markup contains its own useful content.
for(const url of ['/pricing','/our-story','/vs/drfrostmaths','/vs/mathletics','/guides/make-a-worksheet']){
 const file=path.join(root,url,'index.html'),page=new JSDOM(fs.readFileSync(file,'utf8')).window.document;assert.equal(page.querySelectorAll('h1').length,1);assert.equal(page.querySelector('link[rel=canonical]').href,'https://kaizenmaths.com'+url);
 assert(!/\b(undefined|NaN)\b/.test(page.body.textContent));
 for(const script of page.querySelectorAll('script[type="application/ld+json"]'))assert(JSON.parse(script.textContent));
 for(const link of page.querySelectorAll('a[href^="/"],img[src^="/"],link[href^="/"]')){
  const href=link.getAttribute('href')||link.getAttribute('src'),pathname=href.split(/[?#]/)[0];if(!pathname||pathname==='/')continue;
  assert(fs.existsSync(root+pathname)||fs.existsSync(root+pathname+'/index.html'),pathname+' missing');
 }
}
const pricing=new JSDOM(fs.readFileSync(root+'/pricing/index.html','utf8')).window.document;
assert(pricing.body.textContent.includes(M.money(M.pricing.annual)));const FAQ=JSON.parse([...pricing.querySelectorAll('script[type="application/ld+json"]')].find(x=>JSON.parse(x.textContent)['@type']==='FAQPage').textContent);
assert.deepEqual(FAQ.mainEntity.map(x=>[x.name,x.acceptedAnswer.text]),M.faqs);
assert.equal(pricing.querySelectorAll('.marketing-faq details').length,FAQ.mainEntity.length);
const schema=[...doc.querySelectorAll('script[data-marketing-schema]')].map(x=>JSON.parse(x.textContent));assert(schema.some(x=>x['@type']==='Organization'));assert(schema.some(x=>x['@type']==='SoftwareApplication'));assert(schema.every(x=>!x.aggregateRating));
// Proof never publishes until approved, and doesn't render guessed counts or identities.
assert.equal(M.proofHtml({adoption:{approved:true,count:null,asOf:'2026-10-27'}}),'');assert(M.proofHtml({adoption:{approved:true,count:12,label:'teachers signed up',asOf:'2026-10-27'}}).includes('12'));
assert(M.proofHtml({founder:{approved:true,name:'<Test>'}}).includes('&lt;Test&gt;'));
const robots=fs.readFileSync(root+'/robots.txt','utf8');for(const bot of ['GPTBot','ClaudeBot','PerplexityBot','OAI-SearchBot'])assert(robots.includes('User-agent: '+bot));
const sitemap=fs.readFileSync(root+'/sitemap.xml','utf8');assert(!sitemap.includes('#'));assert.equal((sitemap.match(/<loc>/g)||[]).length,6);
// Navigation must preserve the exact sidebar DOM node, not replace the application shell.
const sidebar=doc.querySelector('.sidebar');
doc.querySelector('.sidebar a[href="/pricing"]').click();assert(doc.querySelector('.marketing-content .marketing-cards'));assert.equal(doc.querySelector('.sidebar'),sidebar);assert(doc.querySelector('.sidebar a[href="/pricing"]').classList.contains('active'));
doc.querySelector('.sidebar a[href="/our-story"]').click();assert.match(doc.querySelector('#app h1').textContent,/shaped by/);assert.equal(doc.querySelector('.sidebar'),sidebar);assert(doc.querySelector('#app').textContent.includes('Embark Education'));assert(doc.querySelector('#app').textContent.includes('conceptual teaching tools'));
doc.querySelector('.sidebar a[href="#/tools"]').click();assert(doc.querySelector('.explore-actions'));assert.equal(doc.querySelector('.sidebar'),sidebar);
assert.equal(doc.querySelectorAll('.explore-action').length,3);assert.equal(doc.querySelectorAll('.directory-group').length,0);doc.querySelector('.sidebar a[href="#/teacher-reference"]').click();assert.equal(doc.querySelectorAll('.directory-group').length,3);assert(doc.querySelector('[href="#/coverage-map"]'));assert.equal(doc.querySelector('.sidebar'),sidebar);
for(const route of ['/pricing','/our-story','/vs/drfrostmaths','/vs/mathletics','/guides/make-a-worksheet']){const deep=app();deep.window.history.replaceState({},'',route);deep.window.renderRoute();assert(deep.window.document.querySelector('.marketing-content'));assert(deep.window.document.querySelector('.sidebar'));assert.equal(new URL('tools/substitution/index.html',deep.window.document.baseURI).pathname,'/tools/substitution/index.html');deep.window.close();}
doc.querySelector('[href="/guides/make-a-worksheet"]').click();
assert.equal(doc.querySelector('.sidebar'),sidebar);
assert.equal(doc.querySelectorAll('.walkthrough-step').length,6);
let scrolled=false;const target=doc.querySelector('.walkthrough-step');target.scrollIntoView=()=>{scrolled=true;};
doc.querySelector('[data-guide-target]').click();assert(scrolled);assert.equal(home.window.location.pathname,'/guides/make-a-worksheet');
assert.deepEqual(fs.readFileSync(root+'/assets/guides/worksheet-builder/kaizen-maths-worksheet-guide.pdf'),fs.readFileSync(root+'/output/pdf/kaizen-maths-worksheet-guide.pdf'));
home.window.history.replaceState({},'','/pricing');home.window.dispatchEvent(new home.window.PopStateEvent('popstate'));assert(doc.querySelector('.marketing-content .marketing-cards'));assert.equal(doc.querySelector('.sidebar'),sidebar);
const course=app('#/bar-modelling-course');
assert(course.window.document.querySelector('#bm-sign-in'));
course.window.KaizenAuth={state:{session:{user:{id:'course-test'}},profile:{role:'pro'}}};course.window.renderRoute();
assert(course.window.document.querySelector('.bm-course'));
assert(course.window.document.querySelector('.sidebar'));
assert.equal(course.window.document.querySelectorAll('.bm-nav [data-view]').length,12);
assert(course.window.authSensitiveRouteShouldRerender());
course.window.location.hash='#/bar-modelling-course/preview';course.window.renderRoute();
assert(!course.window.document.querySelector('[data-save-status]').textContent.includes('Admin preview'));
course.window.KaizenAuth.state.profile.role='admin';course.window.renderRoute();
assert(course.window.document.querySelector('[data-save-status]').textContent.includes('Admin preview'));
assert(course.window.document.querySelector('[href="#/bar-modelling-course"]').textContent.includes('Exit admin preview'));
course.window.location.hash='#/kaizen-university';course.window.renderRoute();
assert(course.window.document.querySelector('[href="#/bar-modelling-course/preview"]'));
course.window.close();
home.window.close();console.log('PASS: public pricing, FAQ/schema parity, existing checkout actions, real output links, 7-item desktop/mobile nav, workspace destinations, honest proof gating and crawl map.');
