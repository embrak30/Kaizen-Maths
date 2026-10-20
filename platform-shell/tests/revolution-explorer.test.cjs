const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),math=require('../tools/revolution-explorer/models.js');
const near=(a,b,tol=1e-10)=>assert(Math.abs(a-b)<tol,`${a} != ${b}`);
for(const key of Object.keys(math.examples)){
  const e=math.examples[key];
  for(const axis of ['x','y'])for(const t of [0,.1,.5,.8,1])for(const angle of [0,Math.PI/2,Math.PI,2*Math.PI]){
    const {outer,inner}=math.section(key,axis,t,angle);
    for(const [points,r] of [[outer,e.outer(t)],[inner,e.inner(t)]])for(const p of points){
      near(p[axis==='x'?0:1],t);near(Math.hypot(p[axis==='x'?1:0],p[2]),r);
      p.forEach(value=>assert(Number.isFinite(value)));
    }
    assert(e.outer(t)>=e.inner(t));assert(e.inner(t)>=0);
    const areaOf=points=>Math.abs(points.reduce((sum,p,i)=>{
      const q=points[(i+1)%points.length],r=axis==='x'?1:0;return sum+p[r]*q[2]-q[r]*p[2];
    },0))/2;
    const area=areaOf(outer.concat([...inner].reverse()));
    near(area,math.sectionArea(key,t)*angle/(2*Math.PI),.006);
  }
  // Independently integrate cross-sectional areas with Simpson's rule.
  const n=2000,h=1/n;let sum=math.sectionArea(key,0)+math.sectionArea(key,1);
  for(let i=1;i<n;i++)sum+=(i%2?4:2)*math.sectionArea(key,i*h);
  near(sum*h/3,math.volume(key),1e-10);
}
const html=fs.readFileSync(path.join(root,'tools/revolution-explorer/index.html'),'utf8');
const nodes=new Map(),buttons=[];
function element(){return {style:{},value:'',textContent:'',innerHTML:'',hidden:false,dataset:{},attributes:{},listeners:{},classList:{toggle(){},remove(){}},setAttribute(k,v){this.attributes[k]=String(v)},addEventListener(k,v){this.listeners[k]=v},getBoundingClientRect(){return {width:900,height:900}},setPointerCapture(){}}}
for(const m of html.matchAll(/id="([^"]+)"/g))nodes.set(m[1],element());
for(const m of html.matchAll(/data-(axis|stage|view)="([^"]+)"/g)){const b=element();b.dataset[m[1]]=m[2];buttons.push(b)}
const mockContext=()=>new Proxy({}, {get:()=>()=>{}});nodes.get('scene').getContext=mockContext;
let frames=[],clock=0;
const context=vm.createContext({console,Math,performance:{now:()=>clock},matchMedia:()=>({matches:false}),ResizeObserver:class{observe(){}},requestAnimationFrame:f=>(frames.push(f),frames.length),cancelAnimationFrame(){},window:{RevolutionMath:math,devicePixelRatio:1,addEventListener(){}},document:{hidden:false,createElement:()=>({getContext:mockContext}),getElementById:id=>nodes.get(id),querySelectorAll:s=>buttons.filter(b=>s.includes(Object.keys(b.dataset)[0]))}});
vm.runInContext(fs.readFileSync(path.join(root,'tools/revolution-explorer/revolution.js'),'utf8'),context);
const explorer=context.window.revolutionExplorer;
const click=(key,value)=>buttons.find(b=>b.dataset[key]===value).listeners.click();
function render(){clock+=50;frames.shift()(clock)}
for(const key of Object.keys(math.examples))for(const axis of ['x','y']){
  nodes.get('example').listeners.change({target:{value:key}});click('axis',axis);
  for(let stage=0;stage<5;stage++){
    click('stage',String(stage));render();
    assert.equal(explorer.state.stage,stage);
    assert(!/undefined|NaN|Infinity/.test(nodes.get('integral-formula').innerHTML));
    assert(nodes.get('expanded-formula').innerHTML.includes('d'+axis));
    assert.equal(nodes.get('volume-exact').textContent,math.examples[key].exact);
  }
  assert.equal(nodes.get('volume-panel').dataset.revealed,'true');
}
click('stage','2');nodes.get('angle').listeners.input({target:{value:'120'}});near(explorer.state.angle,120);assert.equal(explorer.state.playing,false);
nodes.get('position').listeners.input({target:{value:'800'}});near(explorer.state.t,.8);
nodes.get('play').listeners.click();assert.equal(explorer.state.playing,true);explorer.state.angle=359;render();near(explorer.state.angle,360);assert.equal(explorer.state.playing,false);
const angle=explorer.state.angle;nodes.get('spin').listeners.click();render();near(explorer.state.angle,angle);
click('axis','y');click('view','section');assert.equal(explorer.state.view,'section');
click('stage','4');nodes.get('angle').listeners.input({target:{value:'90'}});assert.equal(explorer.state.stage,3);
click('stage','0');click('view','section');assert.equal(explorer.state.stage,2);near(explorer.state.angle,360);
assert(fs.readFileSync(path.join(root,'app.js'),'utf8').includes('slug: "revolution-explorer"'));
console.log('PASS: five exact volumes, both axes, radial geometry, partial annular areas, all stage/example/axis combinations, playback completion, independent camera orbit and integral variable.');
