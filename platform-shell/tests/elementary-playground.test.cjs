const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {base}=require('../scripts/pack-library/runtime.cjs'),{JSDOM}=require(path.join(base,'jsdom'));
const html=fs.readFileSync(path.join(__dirname,'../tools/elementary-maths-playground/index.html'),'utf8');
const dom=new JSDOM(html,{url:'https://kaizen.test/tools/elementary-maths-playground/index.html',runScripts:'outside-only'}),w=dom.window,ctx=dom.getInternalVMContext();w.requestAnimationFrame=()=>0;
for(const script of w.document.querySelectorAll('script:not([src])'))vm.runInContext(script.textContent,ctx);
const $=id=>w.document.getElementById(id);let checks=0;
for(const code of ['JMD','USD','GBP'])for(const level of ['early','lower','upper'])for(const type of ['countmoney','makeamount','change']){
 $('currency').value=code;$('difficulty').value=level;ctx.setMode('money');$('activity-type').value=type;
 for(let i=0;i<35;i++){
  ctx.newTask();const task=vm.runInContext('currentTask',ctx);assert.equal(task.currency,code);assert.equal($('answer-pill').textContent,'Answer hidden');
  if(type==='countmoney')assert.equal(task.items.reduce((s,x)=>s+x.value,0),task.total);
  if(type==='makeamount'){assert.equal(task.items.reduce((s,x)=>s+x.value,0),task.target);assert(task.items.every(x=>x.className.includes('coin')));}
  if(type==='change'){assert(task.cost>0&&task.cost<task.paid);assert.equal(task.answer,ctx.formatMoney(task.paid-task.cost));assert(w.document.querySelector('.money-board .coin,.money-board .note'));}
  ctx.revealAnswer();assert.equal($('answer-pill').textContent,task.answer);if(code==='JMD')assert(!/[¢p]|\.\d/.test(task.answer));checks++;
 }
}
ctx.setMode('clock');assert($('currency-field').hidden);for(const level of ['early','lower','upper'])for(const type of ['readtime','quarterhours','fiveminutes']){
 $('difficulty').value=level;$('activity-type').value=type;ctx.newTask();const svg=w.document.querySelector('svg.clock-face');assert.equal(svg.getAttribute('viewBox'),'0 0 400 400');assert.equal(svg.querySelectorAll('text').length,12);assert.equal(svg.querySelectorAll('line').length,62);const [hour,minute]=vm.runInContext('currentTask.answer',ctx).split(':').map(Number),hands=svg.querySelectorAll('line');assert.equal(hands[60].getAttribute('transform'),`rotate(${hour%12*30+minute*.5} 200 200)`);assert.equal(hands[61].getAttribute('transform'),`rotate(${minute*6} 200 200)`);
}
ctx.toggleFullscreen();assert($('board').classList.contains('fullscreen'));assert(w.document.querySelector('.fullscreen-tools button'));ctx.toggleFullscreen();assert(!$('board').classList.contains('fullscreen'));
for(const mode of ['bonds','place','arrays','fractions','clock','money','shapes','signs'])for(const level of ['early','lower','upper']){$('difficulty').value=level;ctx.setMode(mode);for(const option of [...$('activity-type').options]){$('activity-type').value=option.value;ctx.newTask();assert(vm.runInContext('currentTask.answer',ctx));assert(!/NaN|undefined/.test($('activity-card').textContent));}}
dom.window.close();console.log(`PASS: ${checks} money tasks across all currencies/difficulties/foci, exact make-amount decompositions, change, answer reveal and 9 proportional clock variants.`);
