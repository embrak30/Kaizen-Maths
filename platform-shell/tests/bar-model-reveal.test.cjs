const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {JSDOM}=require(path.join(process.env.KAIZEN_PACK_NODE_MODULES||'/tmp/kaizen-review-runtime/node_modules','jsdom')),root=path.resolve(__dirname,'..'),dom=new JSDOM(fs.readFileSync(root+'/tools/bar-models/index.html','utf8'),{runScripts:'outside-only'}),w=dom.window,d=w.document;
w.setTimeout=()=>0;w.clearTimeout=()=>{};for(const s of d.querySelectorAll('script:not([src])'))vm.runInContext(s.textContent,dom.getInternalVMContext());
const choose=name=>Array.from(d.querySelectorAll('.mode-btn')).find(b=>b.textContent===name).click();
for(const mode of ['Fractions','Percentage','Fraction Change','Percentage Change','Ratio'])for(let i=0;i<8;i++){
 choose(mode);const values=()=>Array.from(d.querySelectorAll('#modelCard .model-row:not(.placeholder-row) .segment')).map(e=>e.textContent.trim());
 assert.equal(values().length,1,mode+' starts with the undivided whole');assert(/^\d+$/.test(values()[0]));
 d.querySelector('#nextBtn').click();const count=values().length;
 assert(count>1,mode+' must start divided');assert(values().every(v=>v===''),mode+' empty parts first');
 d.querySelector('#nextBtn').click();assert.equal(values().length,count);assert(values().every(v=>v==='?'),mode+' unknowns before numbers');assert.equal(d.querySelector('#calculation').textContent,'');
 d.querySelector('#nextBtn').click();assert.equal(values().length,count);assert(values().every(v=>/^\d+$/.test(v)),mode+' values fourth');
 while(!d.querySelector('#nextBtn').disabled)d.querySelector('#nextBtn').click();assert(!/NaN|undefined/.test(d.querySelector('#modelCard').textContent));assert(!d.querySelector('#answerText').textContent.includes('Hidden'));
 d.querySelector('#resetBtn').click();assert.equal(values().length,1);assert(/^\d+$/.test(values()[0]));assert(d.querySelector('#answerText').textContent.includes('Hidden'));
}
for(const mode of ['Reverse %','Reverse Ratio','Compare','Equations','Mixed']){choose(mode);while(!d.querySelector('#nextBtn').disabled)d.querySelector('#nextBtn').click();assert(!/NaN|undefined/.test(d.querySelector('#modelCard').textContent));}
// Pupil prompts predict the next reveal, remain optional, and never alter the model.
assert(d.querySelector('#sidebar').contains(d.querySelector('#teacherPrompt')));
for(const mode of ['Fractions','Percentage','Fraction Change','Percentage Change','Ratio','Reverse %','Reverse Ratio','Compare','Equations','Mixed'])for(let sample=0;sample<6;sample++){
 choose(mode);const toggle=d.querySelector('#stagePromptToggle'),question=d.querySelector('#stageQuestion');
 assert(question.hidden);assert.equal(toggle.getAttribute('aria-expanded'),'false');const model=d.querySelector('#modelCard').innerHTML;
 toggle.click();assert(!question.hidden);assert.equal(toggle.textContent,'Hide prompt');assert.equal(d.querySelector('#modelCard').innerHTML,model);
 let steps=0;do{assert(!question.hidden);assert(question.textContent.endsWith('?'));assert(question.textContent.length<115);assert(!/undefined|NaN|Ask:/.test(question.textContent));steps++;if(d.querySelector('#nextBtn').disabled)break;const before=question.textContent;d.querySelector('#nextBtn').click();assert.notEqual(question.textContent,before);}while(steps<10);
 assert(steps>=4);d.querySelector('#backBtn').click();assert(!question.hidden);toggle.click();assert(question.hidden);d.querySelector('#resetBtn').click();assert(question.hidden);toggle.click();d.querySelector('#newBtn').click();assert(question.hidden);
}
choose('Fractions');d.querySelector('#stagePromptToggle').click();assert(d.querySelector('#stageQuestion').textContent.includes('How many equal parts'));
d.querySelector('#nextBtn').click();assert(d.querySelector('#stageQuestion').textContent.includes('still missing'));
d.querySelector('#nextBtn').click();assert(d.querySelector('#stageQuestion').textContent.includes('what is one part worth'));assert.equal(d.querySelector('#calculation').textContent,'');
dom.window.close();console.log('PASS: unsplit whole → empty equal parts → question marks → values in all five forward models, final answers, reset and other-mode smoke checks.');
