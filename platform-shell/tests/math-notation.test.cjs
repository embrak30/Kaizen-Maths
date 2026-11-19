const assert=require('node:assert/strict'),n=require('../tools/_shared/math-notation.js');
for(const [input,expected] of [[String.raw`2\cdot x^2`,String.raw`2x^2`],[String.raw`y=3\cdot{ x}^{4}`,String.raw`y=3{ x}^{4}`],[String.raw`-2.5\cdot\sin x`,String.raw`-2.5\sin x`],['2 · x²','2x²'],[String.raw`2\cdot 3`,String.raw`2\cdot 3`],[String.raw`u\cdot v`,String.raw`u\cdot v`],[String.raw`\vec u\cdot\vec v`,String.raw`\vec u\cdot\vec v`],[String.raw`x_2\cdot x`,String.raw`x_2\cdot x`],[String.raw`2\cdot 10^3`,String.raw`2\cdot 10^3`]])assert.equal(n.tex(input).replace(/\s+(?=\\)/g,''),expected.replace(/\s+(?=\\)/g,''),input);
assert.equal(n.printTex(String.raw`\lim_{x\to0^+}x`),String.raw`\displaystyle\lim\limits_{x\to0^+}x`);assert.equal(n.printTex(n.printTex(String.raw`\lim_{x\to0}x`)),n.printTex(String.raw`\lim_{x\to0}x`));console.log('PASS: scalar coefficients, numeric products, vectors, subscripts and print-limit placement.');
// Exercise real KaTeX before and after the shared hook, including first-render repair.
(async()=>{
 const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
 const {base}=require('../scripts/pack-library/runtime.cjs'),{JSDOM}=require(path.join(base,'jsdom'));
 const dom=new JSDOM('<!doctype html><div id="initial"></div><div id="later"></div>',{runScripts:'outside-only'}),w=dom.window,ctx=dom.getInternalVMContext();
 vm.runInContext(fs.readFileSync(require.resolve('../assets/vendor/katex/katex.min.js'),'utf8'),ctx);
 w.katex.render(String.raw`2\cdot x^2`,w.document.querySelector('#initial'));
 vm.runInContext(fs.readFileSync(require.resolve('../tools/_shared/math-notation.js'),'utf8'),ctx);
 w.katex.render(String.raw`3\cdot x^3`,w.document.querySelector('#later'));
 await new Promise(resolve=>setTimeout(resolve,0));
 for(const id of ['initial','later'])assert(!w.document.querySelector('#'+id+' annotation').textContent.includes('cdot'),id);
 assert(w.katex.renderToString(String.raw`2\cdot 3`).includes('⋅'));
 dom.window.close();console.log('PASS: real KaTeX initial and subsequent renders, with numeric multiplication preserved.');
})().catch(e=>{console.error(e);process.exitCode=1;});
const library=require('../data/alevel-maths/edexcel-9ma0/library.json');
assert(library.packs.find(p=>p.id==='M7.4b').questions[0].steps[1].includes(String.raw`1\\t + 2`),'vector row break before a variable');
assert(library.packs.find(p=>p.id==='M7.3b').questions[0].answer.includes(String.raw`12\\\frac{3}{2}`),'vector row break before a fraction');
