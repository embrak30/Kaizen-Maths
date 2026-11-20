const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {base}=require('../scripts/pack-library/runtime.cjs'),{JSDOM}=require(path.join(base,'jsdom'));
const code=fs.readFileSync(path.join(__dirname,'../assets/site/admin-usage.js'),'utf8'),settle=()=>new Promise(resolve=>setImmediate(resolve));
const data={generated_at:'2026-11-20T12:00:00Z',accounts:2,opted_in:1,users:[{id:'teacher',full_name:'<img src=x onerror=alert(1)>',email:'teacher@example.test',school_name:'School A',visits:3,active_days:2,tools_used:1,tool_opens:4,active_seconds:90,last_activity:'2026-11-20T11:00:00Z',last_sign_in_at:'2026-11-19T09:00:00Z',reporting_enabled:true}],tools:[{tool_slug:'test-tool',opens:4,users:1,active_seconds:60}],user_tools:[{user_id:'teacher',tool_slug:'test-tool',opens:4,active_seconds:60,last_used:'2026-11-20T11:00:00Z'}],daily:[{day:'2026-11-20',visits:3,users:1,active_seconds:90}],recent_visits:[{user_id:'teacher',tool_slug:'test-tool',opened_at:'2026-11-20T11:00:00Z',active_seconds:60}]};
(async()=>{
 const dom=new JSDOM('<body><main></main>',{url:'https://kaizen.test',runScripts:'outside-only'}),w=dom.window,host=w.document.querySelector('main');let calls=[],failure=false;
 w.KAIZEN_AUTH_CONFIG={usageReportingEnabled:true};vm.runInContext(code,dom.getInternalVMContext());
 w.KaizenAdminUsage.mount(host,{tools:[{slug:'test-tool',title:'Test tool'}],schools:[{id:'school',name:'School A'}],getClient:async()=>({rpc:async(name,args)=>{calls.push({name,args});return failure?{error:Error('denied')}:{data,error:null};}})});
 await settle();assert(host.textContent.includes('Estimated active time'));assert(!host.querySelector('img'),'teacher names are escaped');assert(host.textContent.includes('Last sign-in (Google/account)'));host.querySelector('[data-user]').click();assert(host.querySelector('[data-detail]').textContent.includes('Test tool'));
 const days=host.querySelector('[data-days]');days.value='7';days.dispatchEvent(new w.Event('change'));await settle();assert.equal(calls.at(-1).args.p_days,7);
 const search=host.querySelector('[data-search]');search.value='nomatch';search.dispatchEvent(new w.Event('input'));assert(host.textContent.includes('No teachers match'));
 search.value='';search.dispatchEvent(new w.Event('input'));data.users[0].full_name=' =HYPERLINK("https://example.test")';host.querySelector('[data-refresh]').click();await settle();
 let csv='';w.Blob=class{constructor(parts){csv=parts.join('');}};w.URL.createObjectURL=()=> 'blob:test';w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){};
 host.querySelector('[data-csv]').click();assert(csv.includes(`"' =HYPERLINK`),'CSV formulas with leading whitespace are neutralised');
 failure=true;host.querySelector('[data-refresh]').click();await settle();assert(host.querySelector('[data-status]').textContent.includes('could not be loaded'));assert(host.querySelector('[data-csv]').disabled);assert(!host.querySelector('[data-user]'),'failed refresh clears stale data');
 w.KAIZEN_AUTH_CONFIG.usageReportingEnabled=false;w.KaizenAdminUsage.mount(host,{tools:[],schools:[],getClient:async()=>{throw Error('must not fetch');}});assert(host.textContent.includes('not activated'));
 dom.window.close();console.log('PASS: dashboard aggregation display, period filtering, teacher detail, escaping, activation state and stale-data clearing on failure.');
})().catch(e=>{console.error(e);process.exitCode=1;});
