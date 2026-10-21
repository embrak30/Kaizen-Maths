const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const base=process.env.KAIZEN_PACK_NODE_MODULES||'/tmp/kaizen-pack-runtime/node_modules';
const {JSDOM,VirtualConsole}=require(path.join(base,'jsdom'));
function inventory(root){const source=fs.readFileSync(path.join(root,'app.js'),'utf8'),start=source.indexOf('const tools = [');return vm.runInNewContext(source.slice(start,source.indexOf('\n];',start)+3)+';tools').filter(t=>t.type==='Practice Generator'&&!t.hidden&&t.imported!==false);}
function openGenerator(root,tool,seed=20261021){
 const html=fs.readFileSync(path.join(root,tool.toolPath.split('?')[0]),'utf8');
 const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://kaizen.test/'+tool.toolPath.split('?')[0],virtualConsole:new VirtualConsole(),pretendToBeVisual:true}),w=dom.window,context=dom.getInternalVMContext();
 w.Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};w.setTimeout=()=>0;w.setInterval=()=>0;w.requestAnimationFrame=()=>0;w.renderMathInElement=()=>{};w.ResizeObserver=class{observe(){}};w.MutationObserver=class{observe(){}};w.katex={renderToString:s=>'\\('+s+'\\)',render(){}};
 for(const script of w.document.querySelectorAll('script:not([src])'))vm.runInContext(script.textContent,context,{timeout:3000});
 vm.runInContext("if(typeof generateProblem==='undefined'&&typeof generateProblemFor==='function')window.generateProblem=()=>generateProblemFor(currentType)",context);
 vm.runInContext(fs.readFileSync(path.join(root,'tools/_shared/worksheet-standard.js'),'utf8'),context,{timeout:3000});
 return {dom,window:w,context,api:w.KaizenWorksheet};
}
module.exports={inventory,openGenerator,base};
