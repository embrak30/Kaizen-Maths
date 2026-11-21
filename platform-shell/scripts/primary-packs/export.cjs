// Freeze varied original questions from the existing Primary Problem Solving tool.
const fs=require('node:fs'),path=require('node:path');
const {openGenerator,inventory}=require('../pack-library/runtime.cjs');
const root=path.resolve(__dirname,'../..'),tool=inventory(root).find(t=>t.slug==='pep-practice');
const r=openGenerator(root,tool,20261121),w=r.window;
const topics={fractions:'Fractions of quantities',money:'Money & decisions',measurement:'Area & perimeter',percent:'Percentages',ratio:'Ratio & sharing'};
const kinds=['forward','forward','reverse','forward','reverse','error','error','decision','reverse','decision'];
const packs=[];
function selected(q,number){
 const match=q.answer.match(/\d[\d,]*(?:\.\d+)?/);if(!match)throw Error('No numerical answer');
 const a=Number(match[0].replaceAll(',','')),delta=Math.max(1,Math.round(a/4)),values=[a,a+delta,a+2*delta,Math.max(0,a-delta)];
 if(new Set(values).size!==4)throw Error('Duplicate options');
 const choices=values.map(n=>q.answer.replace(match[0],n.toLocaleString('en-US',{maximumFractionDigits:2})));
 const offset=(number+q.audit.values.total||number)%4;
 const options=choices.map((_,i)=>choices[(i+offset)%4]),index=options.indexOf(q.answer),letter='ABCD'[index];
 if(q.audit.topic==='measurement')q.question=q.question.replace(/<svg[\s\S]*?<\/svg>/g,'');
 q.question+='<p>Choose one answer.</p><ol type="A" class="answer-options">'+options.map((x,i)=>'<li><b>'+ 'ABCD'[i]+'.</b> '+x+'</li>').join('')+'</ol>';
 q.answer=letter+'. '+q.answer;q.steps=q.steps.map(s=>s.replace(/\s*\[\d+ marks?\]/g,''));q.steps.push('Select option '+letter+'. [1 mark]');q.marks=1;q.responseFormat='Selected response';q.options=options;q.correctOption=index;
}
for(const grade of [4,5,6])for(const topic of (grade===4?['fractions','money','measurement']:Object.keys(topics))){
 w.eval('setPlan={contexts:new Set(),topics:new Set(),styles:[]}');
 const questions=kinds.map((kind,i)=>{
  const q=w.eval(`topicQuestion(${grade},${JSON.stringify(topic)},${JSON.stringify(kind)})`);
  q.number=i+1;q.responseFormat='Constructed response';
  if(i===0||i===3)selected(q,i+1);
  const host=w.document.createElement('div');host.innerHTML=q.question;q.questionText=host.textContent;q.type=topic;
  // Export assessment questions only; optional teaching models remain in the live tool.
  delete q.modelHtml;return q;
 });w.eval('setPlan=null');
 packs.push({id:`P${grade}-${topic}`,grade,topic:topics[topic],topicId:topic,title:topics[topic],sourceTool:'pep-practice',instructions:'Answer all ten questions. Show your working and explain your decisions. Use separate paper if needed.',questions});
}
const result={version:1,collection:'Primary Topic Practice',style:'Original assessment-style topic practice informed by published PEP sample formats; not official PEP papers.',sources:[{title:'Grade 4 performance-task sample (2022)',url:'https://pep.moey.gov.jm/wp-content/uploads/2022/06/GENERAL-BULLETIN-82-2022-PEP-GRADE-4-SAMPLE-ITEMS-MATHEMATICS-PERFORMANCE-TASK.pdf'},{title:'Grade 6 mathematics practice items (2018)',url:'https://moey.gov.jm/wp-content/uploads/2018/08/Mathematics-CBT-Practice-Items-June-25-2018.pdf'}],packs};
fs.writeFileSync(path.join(root,'data/primary-packs/source.json'),JSON.stringify(result,null,2)+'\n');r.dom.window.close();console.log(`Frozen ${packs.length} topic packs, ${packs.length*10} questions.`);
