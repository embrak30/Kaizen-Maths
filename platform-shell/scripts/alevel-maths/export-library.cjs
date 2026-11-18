const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..'),{inventory,openGenerator}=require('../pack-library/runtime.cjs');
const base=process.env.KAIZEN_PACK_NODE_MODULES||'/tmp/kaizen-ap-runtime/node_modules',math=require(path.join(base,'mathjs')),{JSDOM}=require(path.join(base,'jsdom'));
const folder=path.join(root,'data/alevel-maths/edexcel-9ma0'),plan=JSON.parse(fs.readFileSync(folder+'/plan.json')).packs;
const ap=JSON.parse(fs.readFileSync(root+'/data/ap-calculus/print-questions.json')).packs,pilots=JSON.parse(fs.readFileSync(folder+'/pilots.json')).packs,tools=inventory(root);
const packs=[];
function tidy(s){
 s=String(s??'');if(!s.trim())return '';
 if(!/[<$]/.test(s)&&!/\\[A-Za-z]+/.test(s)){
  const bare=s.replace(/\+\/-/g,'').replace(/sqrt|sin|cos|tan|ln|log|abs|exp|pi/g,'').replace(/\b[A-Za-z]\b/g,'');
  if(!/[A-Za-z]{2,}/.test(bare)&&/[=^]|sqrt\(/.test(s)){
   try{
    if(s.includes('+/-')){const [l,r]=s.split('=');return '$'+(l?.trim()||'x')+'=\\pm '+math.parse(r.replace('+/-','').trim()).toTex({parenthesis:'auto',implicit:'hide'})+'$';}
    return '$'+math.parse(s).toTex({parenthesis:'auto',implicit:'hide'})+'$';
   }catch{}
  }
 }
 return s.replace(/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g,m=>m.replace(/</g,'\\lt ').replace(/>/g,'\\gt '));
}
for(const p of plan){
 if(p.mode==='authored')continue;
 let qs;
 if(p.mode==='pilot'){qs=structuredClone(pilots.find(x=>x.id===p.selection).questions);}
 else if(p.mode==='ap-adaptation'){
  const banks=p.selection.map(id=>ap.find(x=>x.id===id).questions.filter(q=>!/\b(MVT|EVT|Mean Value Theorem|L.Hospital|Taylor|Euler|Ratio Test)\b/i.test(q.question+' '+q.steps.join(' '))));
  qs=[];for(let i=0;i<banks.length;i++){
   const n=Math.floor(8/banks.length)+(i<8%banks.length?1:0),bank=banks[i];
   qs.push(...structuredClone(n===8?bank:bank.slice(0,n-1).concat(bank.slice(-1))));
  }
 }else{
  const cfg=p.selection,tool=tools.find(t=>t.slug===cfg.tool),runtime=openGenerator(root,tool,20261118+p.id.split('').reduce((s,c)=>s+c.charCodeAt(0),0));qs=[];const seen=new Set();
  try{
   for(let i=0;i<8;i++){
    const [level,type]=cfg.activities[i%cfg.activities.length];let raw;
    for(let j=0;j<120;j++){
     const [activeLevel,activeType]=cfg.activities[(i+Math.floor(j/30))%cfg.activities.length];const candidate=runtime.api.generate({level:activeLevel,type:activeType,count:1}).problems[0];if(!candidate)continue;
     const key=(candidate.question+' '+(candidate.source?.given||'')+' '+(candidate.source?.equation||'')).replace(/\s+/g,' ').trim();if(seen.has(key)||/undefined|NaN|Infinity/.test(candidate.answer))continue;
     seen.add(key);raw=candidate;break;
    }
    assert(raw,`${p.id} no unique source for ${type}`);
    const source=raw.source||{},rich=[source.prompt,source.equation,raw.question].find(v=>typeof v==='string'&&/<svg|<table|<sup|class=["'][^"']*(?:vfrac|fraction|frac|cvec|colvec|mini-vector)/.test(v));
    const steps=(source.steps||raw.steps).map(s=>typeof s==='string'?tidy(s):tidy(s.html||s.text||'')+(s.equation?'<p>$$'+s.equation.replace(/^\$\$?|\$\$?$/g,'')+'$$</p>':''));
    let question=tidy(rich||raw.question);if(source.given&&!question.includes(source.given))question='Given '+source.given+'. '+question;
    let instruction=/\b(find|solve|prove|calculate|determine|evaluate|write|state|sketch|expand|simplify|estimate|explain|interpret|describe|complete|show|identify|critique|design|use)\b/i.test(raw.questionText)?'':raw.instructionText||'';
    if(!instruction&&!/\b(find|solve|prove|calculate|determine|evaluate|write|state|sketch|expand|simplify|estimate|explain|interpret|describe|complete|show|identify|critique|design|use)\b/i.test(raw.questionText))instruction=({ 'surds-radicals':'Simplify, rationalising the denominator where needed.','algebraic-fractions':'Simplify the expression, stating excluded denominator values.','remainder-theorem':'Answer the stated polynomial question.','partial-fractions':'Decompose into partial fractions.','binomial-expansion':'Expand or find the requested coefficient.','logarithms-practice':'Evaluate, simplify or solve as indicated.','trig-equation-solver':'Solve in the stated interval.','trigonometric-functions':'Prove the stated identity or answer the indicated question.','differentiation-polynomials':'Find the stated gradient, tangent or normal.','advanced-integration':'Find the integral.','integration-algebraic-fractions':'Find the integral on an interval avoiding singularities.'})[cfg.tool]||'Answer the question, showing your working.';
    qs.push({number:i+1,question,questionText:raw.questionText,instruction,answer:tidy(raw.answer),steps,marks:3,criteria:[`M1: Correct ${p.title.toLowerCase()} setup [1].`,'M1: Correct intermediate working [1].','A1: Correct result with required units or interpretation [1].'],origin:'selected-generator',sourceTool:cfg.tool,type:raw.type||type,raw:source});
   }
  }finally{runtime.dom.window.close();}
 }
 assert.equal(qs.length,8,p.id);qs.forEach((q,i)=>{q.number=i+1;q.question=tidy(q.question);q.answer=tidy(q.answer);q.steps=q.steps.map(tidy);});
 packs.push({...p,sourceTool:p.mode==='generator'?p.selection.tool:'limits-first-principles',questions:qs});
}
fs.writeFileSync(folder+'/selected-questions.json',JSON.stringify({version:1,packs},null,2)+'\n');console.log(`Selected ${packs.length} packs / ${packs.length*8} questions.`);
