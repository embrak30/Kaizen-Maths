const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {base,inventory}=require('../scripts/pack-library/runtime.cjs'),{JSDOM}=require(path.join(base,'jsdom'));
const source=fs.readFileSync(path.join(__dirname,'../tools/_shared/tool-access-guard.js'),'utf8');
async function check(folder,parentRoute,expected,standalone=false){
 const dom=new JSDOM('<!doctype html><body></body>'),doc=dom.window.document;let redirected;
 const location={pathname:`/tools/${folder}/index.html`,origin:'https://kaizen.test',search:'',replace(url){redirected=url;}};
 const win={document:doc,location,KAIZEN_AUTH_CONFIG:{},setTimeout(){return 0;}};
 win.self=win;win.top=standalone?win:{location:{}};win.parent=standalone?win:{location:{origin:location.origin,hash:parentRoute}};
 vm.runInNewContext(source,{window:win,document:doc,URLSearchParams,Set,Date,console});
 await new Promise(resolve=>setImmediate(resolve));
 if(expected==='allowed')assert.equal(doc.documentElement.dataset.kaizenToolAccessChecked,'allowed',folder);
 else {assert.equal(doc.documentElement.dataset.kaizenToolAccessChecked,'blocked');assert.equal(standalone?redirected:win.top.location.href,`https://kaizen.test/#/tools/${expected}?signin=1`);}
 dom.window.close();
}
(async()=>{
 await check('area-rearrangement','#/classroom/area-rearrangement','allowed');
 await check('area-rearrangement','#/classroom/area-rearrangement','area-rearrangement',true);
 await check('unit-circle-explainer','#/classroom/unit-circle-explainer','allowed');
 await check('unit-circle-explainer','#/classroom/unit-circle-explainer','unit-circle-explainer',true);
 await check('squeeze-theorem','#/classroom/squeeze-theorem','allowed');
 await check('squeeze-theorem','#/classroom/squeeze-theorem','squeeze-theorem',true);
 const tools=inventory(path.join(__dirname,'..'));
 for(const tool of tools)await check(tool.toolPath.split('/')[1],`#/classroom/${tool.slug}`,'allowed');
 for(const [folder,slug] of [['differentiation-rules-general','differentiation-rules'],['differentiation-rules','trig-differentiation-rules']]){
  await check(folder,`#/classroom/${slug}`,slug,true);
  await check(folder,'#/classroom/unrelated-tool',slug);
 }
 console.log(`PASS: ${tools.length} classroom tool identities, differentiation redirects and unrelated-frame rejection.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
