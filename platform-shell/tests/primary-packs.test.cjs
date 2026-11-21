const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),{JSDOM}=require(path.join(process.env.KAIZEN_PACK_NODE_MODULES||'/tmp/kaizen-ap-runtime/node_modules','jsdom'));
const source=JSON.parse(fs.readFileSync(path.join(root,'data/primary-packs/source.json'))),catalog=JSON.parse(fs.readFileSync(path.join(root,'data/primary-packs/catalog.json')));
if(fs.existsSync(path.join(root,'tmp/pdfs/primary-prepared.json'))){const prepared=JSON.parse(fs.readFileSync(path.join(root,'tmp/pdfs/primary-prepared.json')));for(const p of prepared.packs.filter(p=>p.topicId==='money'))for(const q of p.questions)assert(!q.print.question.some(b=>b.kind==='paragraph'&&b.html.includes('<img')),p.id+' currency must stay literal prose');}
assert.equal(source.packs.length,75);assert(source.packs.find(p=>p.id==='P4-fraction-comparison').questions[3].answer.includes('numerator">4</span>'));assert(source.packs.find(p=>p.id==='P6-fraction-decimal-percent').questions[0].steps.join('').includes('numerator">35</span>'));assert.equal(catalog.packs.length,75);const strands=['Number','Measurement','Geometry','Algebra','Statistics and Probability'];let equalities=0,checks=0;
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
for(const g of [4,5,6])assert.deepEqual([...new Set(source.packs.filter(p=>p.grade===g).map(p=>p.strand))].sort(),[...strands].sort());
for(const p of source.packs){assert.equal(p.questions.length,10);assert.equal(new Set(p.questions.map(q=>q.question)).size,10);for(const [i,q]of p.questions.entries()){
 assert.equal(q.number,i+1);assert(!/set of (?:pupils|passengers|members) priced/.test(q.question));assert(q.question&&q.answer&&q.steps.length&&q.marks>0);if(p.topicId==='money')assert(q.question.includes('class="currency"'));assert(!/J\$|undefined|NaN|\\(?:frac|left)/.test(q.question+q.answer+q.steps.join('')));
 const holder=new JSDOM('<body>'+q.steps.join(' <br> ')+'</body>');for(const f of holder.window.document.querySelectorAll('.fraction')){const a=f.querySelector('.numerator').textContent,b=f.querySelector('.denominator').textContent;f.replaceWith('('+a+'/'+b+')');}
 const text=holder.window.document.body.textContent.replace(/(?<=\d),(?=\d)/g,'').replace(/[−–]/g,'-').replace(/×/g,'*').replace(/÷/g,'/').replace(/(\d+(?:\.\d+)?)%/g,'($1/100)').replace(/\bhalf(?=\s*\*)/gi,'(1/2)');
 for(const match of text.matchAll(/(?:\(?-?\d+(?:\.\d+)?\)?\s*[+*/-]\s*)+\(?-?\d+(?:\.\d+)?\)?\s*=\s*((?:\(?-?\d+(?:\.\d+)?\)?\s*[+*/-]\s*)*\(?-?\d+(?:\.\d+)?\)?)/g)){
  if(/^\s*(?:hundredths|tenths|thousandths)\b/.test(text.slice(match.index+match[0].length)))continue;
  const expr=match[0].split('=')[0];if([expr,match[1]].some(x=>(x.match(/\(/g)||[]).length!==(x.match(/\)/g)||[]).length))continue;
  const actual=vm.runInNewContext(expr,{}, {timeout:50}),remainder=text.slice(match.index+match[0].length).match(/^\s+remainder\s+(\d+)/),expected=vm.runInNewContext(match[1],{}, {timeout:50})+(remainder?Number(remainder[1])/Number(expr.split('/').at(-1)):0);assert(Math.abs(actual-expected)<1e-7,p.id+' Q'+q.number+' '+match[0]);equalities++;
 }
 holder.window.close();
 if(q.options){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.answer,'ABCD'[q.correctOption]+'. '+q.options[q.correctOption]);assert(q.question.includes('<b>A.</b>'));}
 const v=q.check;if(v){let n;if(['+','-','*','/'].includes(v.op))n=vm.runInNewContext(v.a+v.op+v.b);else if(v.op==='union')n=v.a+v.b-v.both;else if(v.op==='neither')n=v.total-(v.a+v.b-v.both);else if(v.op==='two-step')n=v.a*v.b+v.c;else if(v.op.startsWith('fraction')){
  const [a,b]=v.a,[c,d]=v.b;let num,den;if(v.op==='fraction+'){num=a*d+c*b;den=b*d;}if(v.op==='fraction-'){num=a*d-c*b;den=b*d;}if(v.op==='fraction*'){num=a*c;den=b*d;}const k=gcd(num,den);assert.deepEqual(v.result,[num/k,den/k]);checks++;continue;
 }assert(Math.abs(n-v.result)<1e-7,p.id+' Q'+q.number);checks++;}
}}
assert(equalities>250);assert(checks>25);
for(const p of catalog.packs){assert.equal(p.questions,10);assert.equal(p.studentPages,2);for(const key of ['student','teacher','complete']){assert(!p[key].includes('..'));const bytes=fs.readFileSync(path.join(root,p[key]));assert(bytes.subarray(0,5).equals(Buffer.from('%PDF-')));}}
// Exercise grade/strand filtering and download links within the real application shell.
const dom=new JSDOM('<main id="app"></main>',{url:'https://kaizen.test/#/primary-topic-packs',runScripts:'outside-only'}),w=dom.window;
for(const f of ['assets/site/primary-packs-data.js','assets/site/primary-packs.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),dom.getInternalVMContext());w.KaizenPrimaryPacks.mount(w.document.querySelector('main'));
const doc=w.document;assert(doc.querySelector('.ap-topic-row'));assert(doc.querySelector('.primary-tool-menu'));assert(doc.querySelector('a[href="#/tools/fractions-practice"]')); doc.querySelector('[data-primary-grade="6"]').click();doc.querySelector('[data-primary-strand="Measurement"]').click();assert(doc.querySelector('a[href*="p6-volume-student.pdf"]'));assert(doc.querySelector('a[href*="p6-circles-complete.pdf"]'));assert.equal(doc.querySelector('#primary-grade-download').getAttribute('href'),'/'+catalog.downloads['6']);
const search=doc.querySelector('#primary-pack-search');search.value='stem-and-leaf';search.dispatchEvent(new w.Event('input'));assert.equal(doc.querySelectorAll('.ap-topic-row').length,1);assert(doc.querySelector('a[href*="p6-stem-leaf-teacher.pdf"]'));assert(doc.querySelector('a[href="#/tools/averages-range"]').textContent==='Related Tool');
search.value='<script>';search.dispatchEvent(new w.Event('input'));assert(!doc.querySelector('script'));assert(doc.querySelector('.ap-empty'));dom.window.close();
console.log(`PASS: 75 packs / 750 questions; all grades and strands; ${equalities} independently checked arithmetic equalities, ${checks} numerical records; PDF links, selected responses and collection filters.`);
