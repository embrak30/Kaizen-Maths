const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {JSDOM}=require(process.env.KAIZEN_MARKETING_NODE_MODULES?path.join(process.env.KAIZEN_MARKETING_NODE_MODULES,'jsdom'):'jsdom');
const base=path.resolve(__dirname,'..');
const D=require(base+'/assets/courses/bar-modelling-data.js');
assert.equal(D.lessons.length,8);
assert.deepEqual(D.lessons.map(l=>l.practice.answer),[65-27,42/7*4,360*.15,18/(5-3)*(5+3),45/(1-2/7),138*100/115,200*.7*(1-2/7),90/(3/5)/.75/(2/3)]);
assert.equal(D.lessons.at(-1).example.answer,108/(3/5)/.8/.75);
const dom=new JSDOM('<main id="host"></main>',{url:'https://example.invalid/#/bar-modelling-course',runScripts:'outside-only'}),w=dom.window;
w.HTMLElement.prototype.scrollIntoView=()=>{};
for(const file of ['bar-modelling-data.js','bar-modelling.js'])vm.runInContext(fs.readFileSync(base+'/assets/courses/'+file,'utf8'),dom.getInternalVMContext());
const host=w.document.querySelector('#host'),mount=userId=>w.KaizenBarCourse.mount(host,{userId});
const click=selector=>host.querySelector(selector).click();
const submit=form=>form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
mount();assert(host.textContent.includes('Sign in to start'));
mount('teacher-a');click('[data-view="challenge"]');assert(host.textContent.includes('Record your starting point first'));
click('[data-view="pre"]');let form=host.querySelector('form');form.elements.confidence.value='2';D.assessment.forEach((q,i)=>{form.elements['answer-'+i].value=q.pre[1];form.elements['reason-'+i].value='The bar shows the whole, equal units and the known group.';});submit(form);
assert(host.textContent.includes('7/7'));assert(!host.querySelector('[data-assessment="pre"]'));
click('[data-view="post"]');assert(host.textContent.includes('Finish the eight lessons first'));
for(const l of D.lessons){
 click(`[data-view="${l.id}"]`);assert.equal(host.querySelectorAll('.bm-steps li').length,0);
 for(let i=0;i<l.example.steps.length;i++){click('[data-reveal]');assert.equal(host.querySelectorAll('.bm-steps li').length,i+1);if(l.id==='challenge'&&i===0){assert(!host.querySelector('.bm-diagram').textContent.includes('225'));assert(host.querySelector('.bm-diagram path'));}}
 assert(host.querySelector('[data-reveal]').disabled);
 form=host.querySelector('[data-practice]');form.elements.answer.value='-123';form.elements.reasoning.value='Compare the known group and the whole.';submit(form);assert(host.textContent.includes('Not yet.'));
 form=host.querySelector('[data-practice]');form.elements.answer.value=l.practice.answer;form.elements.reasoning.value='Label the whole, divide the known group to find one unit, then combine the required parts.';submit(form);assert(host.textContent.includes('Lesson completed'));
}
click('[data-view="post"]');form=host.querySelector('[data-assessment]');form.elements.confidence.value='4';D.assessment.forEach((q,i)=>{form.elements['answer-'+i].value=q.post[1];form.elements['reason-'+i].value='Identify the whole and equal parts before calculating.';});submit(form);assert(host.textContent.includes('Knowledge check threshold met'));assert(host.textContent.includes('Starting score: 7/7'));
const saved=JSON.parse(w.localStorage.getItem('kaizen:bar-modelling:v1:teacher-a'));assert.equal(saved.assessments.pre.length,1);assert.equal(saved.assessments.post[0].score,7);assert.equal(Object.values(saved.lessons).filter(r=>r.complete).length,8);
mount('teacher-b');assert(host.textContent.includes('0/8 lessons complete'));
mount('teacher-a');assert(host.textContent.includes('8/8 lessons complete'));
assert.equal(w.KaizenBarCourse.score('pre',Array(7).fill('')),0);
assert.equal(w.KaizenBarCourse.score('post',D.assessment.map(q=>q.post[1])),7);
click('[data-view="reflection"]');form=host.querySelector('[data-reflection]');assert(!form.elements.followup.required);form.elements.plan.value='<script>unsafe()</script>';form.dispatchEvent(new w.Event('input',{bubbles:true}));mount('teacher-a');click('[data-view="reflection"]');assert.equal(host.querySelector('textarea').value,'<script>unsafe()</script>');assert.equal(host.querySelectorAll('script').length,0);
dom.window.close();console.log('PASS: course mathematics, baseline lock, incremental steps, incorrect/correct challenges, final assessment, per-account persistence, reflection and escaped text.');
