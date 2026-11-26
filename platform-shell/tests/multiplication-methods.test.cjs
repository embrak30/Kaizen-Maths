const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),M=require('../tools/multiplication-methods/model.js');
let cases=0;const pairs=[...M.presets,[1,1],[999,99],[100,10],[109,90],[512,64],[99,99],[7,5],[80,4]];
for(const[a,b]of pairs)for(const method of Object.keys(M.methods)){
 const frames=M.build(a,b,method),last=frames.at(-1);assert(last.final);assert.equal(last.product,a*b);assert(frames.every(f=>f.a===a&&f.b===b));assert.deepEqual(M.build(a,b,method),frames);assert(frames.every(f=>f.title&&f.prompt));
 if(method==='column'){assert.equal(last.sum,String(a*b));assert.deepEqual(last.rows.map(Number),String(b).split('').reverse().map((d,j)=>a*Number(d)*10**j));}
 if(method==='lattice'){assert.equal(last.digits.reduce((s,d,i)=>s+d*10**i,0),a*b);for(const c of last.cells)assert.equal(c.value,last.ac[c.col]*last.br[c.row]);}
 if(method==='area')assert.equal(last.ap.flatMap(x=>last.bp.map(y=>x*y)).reduce((s,v)=>s+v,0),a*b);
 if(method==='russian'){assert.equal(last.total,a*b);assert.equal(last.rows.filter(r=>r.keep).reduce((s,r)=>s+r.right,0),a*b);for(let i=1;i<last.rows.length;i++){assert.equal(last.rows[i].left,Math.floor(last.rows[i-1].left/2));assert.equal(last.rows[i].right,last.rows[i-1].right*2);}}
 if(method==='doubling')for(const r of last.rows)assert.equal(r.left*r.right,a*b);
 cases++;
}
assert.deepEqual(M.build(16,25,'doubling').at(-1).rows.at(-1),{left:4,right:100});
// Independently check digit algorithms across factors that force zero rows and repeated carries.
for(let a=1;a<=999;a+=7)for(let b=1;b<=99;b+=7){for(const method of ['column','lattice']){const f=M.build(a,b,method).at(-1);assert.equal(method==='column'?Number(f.sum):f.digits.reduce((s,d,i)=>s+d*10**i,0),a*b);}}
for(const values of [[0,5],[1.5,2],[1000,2],[20,100],[NaN,4]])assert.throws(()=>M.build(...values,'area'));
const{JSDOM}=require(path.join(process.env.KAIZEN_PACK_NODE_MODULES||'/tmp/kaizen-review-runtime/node_modules','jsdom')),dir=path.resolve(__dirname,'../tools/multiplication-methods'),dom=new JSDOM(fs.readFileSync(dir+'/index.html','utf8'),{runScripts:'outside-only'}),w=dom.window,d=w.document;w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');};
for(const f of ['model.js','render.js','explorer.js'])vm.runInContext(fs.readFileSync(dir+'/'+f,'utf8'),dom.getInternalVMContext());
assert.equal(d.querySelectorAll('[data-method]').length,7);assert(d.querySelector('#back').disabled);assert.equal(d.querySelector('#calculation').textContent,'24 × 13');
for(const method of Object.keys(M.methods)){
 d.querySelector(`[data-method="${method}"]`).click();let steps=0;while(!d.querySelector('#next').disabled){d.querySelector('#next').click();assert(++steps<80);assert(!/NaN|undefined/.test(d.querySelector('#diagram').outerHTML));}
 assert.equal(d.querySelector('#next').textContent,'Complete');assert(d.querySelector('#diagram').getAttribute('aria-label').includes('312'));d.querySelector('#back').click();assert(!d.querySelector('#next').disabled);d.querySelector('#reset').click();assert(d.querySelector('#back').disabled);
 d.querySelector('#teacher-open').click();assert(d.querySelector('#teacher').open);assert(d.querySelector('#why').textContent.length>50);d.querySelector('#teacher-close').click();assert(!d.querySelector('#teacher').open);
}
d.querySelector('#factor-a').value='342';d.querySelector('#factor-b').value='57';d.querySelector('#factors').dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal(d.querySelector('#calculation').textContent,'342 × 57');d.querySelector('[data-method="lattice"]').click();assert.equal(d.querySelector('#calculation').textContent,'342 × 57');assert(d.querySelector('#back').disabled);d.querySelector('#factor-a').value='1.5';d.querySelector('#factors').dispatchEvent(new w.Event('submit',{cancelable:true}));assert(d.querySelector('#error').textContent.includes('whole'));assert.equal(d.querySelector('#calculation').textContent,'342 × 57');
const app=fs.readFileSync(path.resolve(dir,'../../app.js'),'utf8'),start=app.indexOf('const tools = ['),tool=vm.runInNewContext(app.slice(start,app.indexOf('\n];',start)+3)+';tools').find(t=>t.slug==='multiplication-methods');assert(tool);assert.equal(tool.type,'Interactive Explainer');assert(fs.existsSync(path.resolve(dir,'../../',tool.toolPath.split('?')[0])));dom.window.close();console.log(`PASS: ${cases} complete method examples; 4,290 independent column/lattice cases; carries, zero digits, diagonal sums, odd-row sums, exact halving, navigation, same factors, teacher panel and registration.`);
