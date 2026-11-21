const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {base}=require('../scripts/pack-library/runtime.cjs'),{JSDOM}=require(path.join(base,'jsdom'));
const code=fs.readFileSync(path.join(__dirname,'../assets/site/school-presentation.js'),'utf8'),root=path.join(__dirname,'..'),bus=[];
class Channel{constructor(){bus.push(this);}postMessage(data){for(const c of [...bus])if(c!==this&&!c.closed)c.onmessage?.({data});}close(){this.closed=true;}}
function open(url){const dom=new JSDOM('<body><main id="app"></main>',{url:'https://kaizen.test/'+url,runScripts:'outside-only'}),w=dom.window;w.BroadcastChannel=Channel;vm.runInContext(code,dom.getInternalVMContext());const host=w.document.querySelector('main');w.KaizenSchoolPresentation.mount(host);return {dom,w,host};}
function button(x,selector){return x.host.querySelector(selector);}function click(x,selector){assert(button(x,selector),selector);button(x,selector).click();}
(async()=>{
 const x=open('#/school-presentation'),deck=x.host.querySelector('.pitch-deck');assert(x.host.textContent.includes('Support teachers.'));assert(button(x,'[data-prev]').disabled);
 click(x,'[data-slide="2"]');assert.equal(x.host.querySelectorAll('.pitch-bar>span').length,4);assert(x.host.textContent.includes('18 pupils'));
 click(x,'[data-demo-step]');assert(x.host.textContent.includes('18 ÷ 3 = 6'));click(x,'[data-demo-step]');assert(x.host.textContent.includes('24 pupils'));click(x,'[data-audience="secondary"]');assert(x.host.textContent.includes('3x + 6 = 24'));click(x,'[data-demo-step]');assert(x.host.textContent.includes('3x = 24 − 6 = 18'));click(x,'[data-demo-step]');assert(x.host.textContent.includes('x = 18 ÷ 3 = 6'));
 for(const a of x.host.querySelectorAll('.pitch-demo-links a')){assert.equal(a.target,'_blank');assert(a.rel.includes('noopener'));}
 const app=fs.readFileSync(path.join(root,'app.js'),'utf8'),start=app.indexOf('const tools = ['),tools=vm.runInNewContext(app.slice(start,app.indexOf('\n];',start)+3)+';tools');
 for(const a of x.host.querySelectorAll('.pitch-demo-links a'))if(/#\/classroom\//.test(a.href))assert(tools.some(t=>t.slug===a.href.split('/').at(-1)),a.href);
 Object.defineProperty(x.w.document,'fullscreenElement',{value:null,writable:true});deck.requestFullscreen=async()=>{x.w.document.fullscreenElement=deck;};x.w.document.exitFullscreen=async()=>{x.w.document.fullscreenElement=null;};click(x,'[data-present]');await Promise.resolve();click(x,'[data-next]');assert.strictEqual(x.host.querySelector('.pitch-deck'),deck,'navigation preserves the fullscreen element');assert.strictEqual(x.w.document.fullscreenElement,deck);
 const n=open('#/school-presentation?view=notes');assert(n.host.textContent.includes('The pilot pathway'),'notes follow the active presentation');click(x,'[data-next]');assert(n.host.textContent.includes('Feedback and development'));click(n,'[data-next]');assert(x.host.textContent.includes('Start with your school'));assert(button(x,'[data-next]').disabled);
 assert(x.host.textContent.includes('fee'));assert(!x.host.textContent.includes('£'));assert(x.host.querySelector('a[href="#/school-interest"]'));
 click(x,'[data-slide="0"]');deck.dispatchEvent(new x.w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert(x.host.textContent.includes('Develop the teaching.'));
 const before=x.w.location.hash;x.w.KaizenSchoolPresentation.unmount();deck.dispatchEvent(new x.w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.equal(x.w.location.hash,before,'route cleanup removes keyboard listeners');n.w.KaizenSchoolPresentation.unmount();
 const invalid=open('#/school-presentation?slide=%3Cscript%3E&audience=bad');assert(invalid.host.textContent.includes('Support teachers.'));assert(!invalid.host.querySelector('script'));invalid.w.KaizenSchoolPresentation.unmount();
 x.dom.window.close();n.dom.window.close();invalid.dom.window.close();console.log('PASS: six-section navigation, primary/secondary worked demos, real tool links, fullscreen stability, separate synced notes, interest invitation, input validation and route cleanup.');
})().catch(e=>{console.error(e);process.exitCode=1;});
