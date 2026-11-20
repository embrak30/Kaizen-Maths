const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {base}=require('../scripts/pack-library/runtime.cjs'),{JSDOM}=require(path.join(base,'jsdom'));
const code=fs.readFileSync(path.join(__dirname,'../assets/site/usage-client.js'),'utf8');
const settle=()=>new Promise(resolve=>setImmediate(resolve));
async function setup({consent=true,configured=true}={}){
 const dom=new JSDOM('<!doctype html><body><iframe class="legacy-frame" src="/tools/test-tool/index.html"></iframe><div id="privacy"></div></body>',{url:'https://kaizen.test/#/classroom/test-tool',runScripts:'outside-only'}),w=dom.window,calls=[];let timer,now=1000000;
 w.Date.now=()=>now;w.setInterval=fn=>{timer=fn;return 1;};w.KAIZEN_AUTH_CONFIG={usageReportingEnabled:configured};
 Object.defineProperty(w.document,'visibilityState',{value:'visible',configurable:true});
 const client={from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:consent==null?null:{enabled:consent},error:null})})})}),rpc:async(name,args)=>{calls.push({name,args});return {data:name==='set_usage_reporting'?args.p_enabled:{accepted:true},error:null};}};
 w.KaizenAuth={state:{session:{user:{id:'teacher-a'}}},getClient:async()=>client};w.KaizenUsageTools=[{slug:'test-tool',toolPath:'tools/test-tool/index.html'}];
 vm.runInContext(code,dom.getInternalVMContext());await settle();await settle();
 return {dom,w,calls,advance:async(ms)=>{now+=ms;await timer();await settle();},settle};
}
(async()=>{
 let x=await setup({configured:false});assert.equal(x.calls.length,0);await assert.rejects(x.w.KaizenUsage.setPreference(true),/not activated/);x.dom.window.close();
 x=await setup({consent:false});await x.advance(15000);assert.equal(x.calls.length,0);x.dom.window.close();
 x=await setup({consent:null});assert(x.w.document.getElementById('usage-choice'));await x.w.KaizenUsage.setPreference(true);await settle();assert(x.calls.some(c=>c.name==='record_teacher_usage'));assert(!x.w.document.getElementById('usage-choice'));x.dom.window.close();
 x=await setup();assert.equal(x.calls.filter(c=>c.args.p_tool==='test-tool').length,1);await x.advance(15000);assert.equal(x.calls.at(-1).args.p_seconds,15);
 let before=x.calls.length;Object.defineProperty(x.w.document,'visibilityState',{value:'hidden',configurable:true});await x.advance(15000);assert.equal(x.calls.length,before);
 Object.defineProperty(x.w.document,'visibilityState',{value:'visible',configurable:true});await x.advance(100000);assert.equal(x.calls.length,before,'idle time not sent');
 x.w.dispatchEvent(new x.w.MessageEvent('message',{origin:'https://evil.test',data:{type:'kaizen-tool-activity'},source:x.w.document.querySelector('iframe').contentWindow}));await x.advance(15000);assert.equal(x.calls.length,before,'untrusted activity rejected');
 x.w.dispatchEvent(new x.w.MessageEvent('message',{origin:'https://kaizen.test',data:{type:'kaizen-tool-activity'},source:x.w.document.querySelector('iframe').contentWindow}));await x.advance(15000);assert(x.calls.length>before,'trusted iframe activity counts');
 const oldSession=x.calls.at(-1).args.p_session;await x.advance(1800001);x.w.document.dispatchEvent(new x.w.Event('pointerdown'));await x.advance(15000);assert.notEqual(x.calls.at(-1).args.p_session,oldSession,'a new visit starts after 30 minutes idle');
 before=x.calls.length;x.w.location.hash='#/pupil';x.w.document.dispatchEvent(new x.w.Event('pointerdown'));await x.advance(15000);assert.equal(x.calls.length,before,'pupil route excluded');
 await x.w.KaizenUsage.setPreference(false);before=x.calls.length;await x.advance(15000);assert.equal(x.calls.length,before,'withdrawal stops future collection');
 x.w.KaizenAuth.state.session=null;x.w.dispatchEvent(new x.w.Event('kaizen-auth-change'));assert(!x.w.KaizenUsage.isEnabled());x.dom.window.close();
 console.log('PASS: activation/consent gates, foreground/idle timing, iframe source validation, pupil exclusion, withdrawal and sign-out.');
})().catch(e=>{console.error(e);process.exitCode=1;});
