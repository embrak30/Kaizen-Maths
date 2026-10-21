// Freeze the real generators. No explainer or separately invented question bank is included.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {inventory,openGenerator}=require('./runtime.cjs'),root=path.resolve(__dirname,'../..'),tools=inventory(root),packs=[],coverage=[],failures=[];
for(const tool of tools){
 if(tool.slug==='substitution'){coverage.push({slug:tool.slug,status:'Existing 11 focused and mixed packs'});continue;}
 let runtime;try{
  runtime=openGenerator(root,tool);const {api}=runtime;const state=api.getState();assert(state.levels.length,tool.slug+' has no configured levels');let toolPacks=0;
  for(const level of state.levels){
   let types=level.types.filter(t=>!/(mixed|__kaizen|^all$)/i.test(t.id));if(!types.length)types=level.types.filter(t=>!/__kaizen/.test(t.id));assert(types.length,tool.slug+' has no question types');const questions=[],seen=new Set();
   for(let i=0;i<7;i++){
    const type=types[i%types.length];let question=null,lastError;
    for(let attempt=0;attempt<80;attempt++)try{
     const raw=api.generate({level:level.id,type:type.id,count:1}).problems?.[0];assert(raw,'No generated question');
     assert(raw.questionText?.trim()||/<svg/.test(raw.question),'Question is empty');assert(raw.answerText?.trim(),'Answer is empty');
     assert(!/\bNaN\b|=\s*(?:undefined|null)\b/.test([raw.questionText,raw.answerText,...raw.stepText].join(' ')),'Non-finite or unresolved answer');
     const richCandidate=[raw.source.question,raw.source.prompt,raw.source.equation,raw.source.text].find(s=>typeof s==='string'&&/<(?:svg|table)|class=["'][^"']*(?:cvec|colvec|matrix-wrap)/i.test(s));
     if(!/<(?:svg|table)|class=["'][^"']*(?:cvec|colvec|matrix-wrap)/i.test(raw.question)&&richCandidate)raw.question=richCandidate;
     const extraGiven=raw.source.given&&!String(raw.question).includes(String(raw.source.given))?raw.source.given:'';
     const key=String(raw.question).replace(/\s+/g,' ').trim()+'|'+extraGiven;if(seen.has(key))continue;
     seen.add(key);question={number:questions.length+1,type:type.id,typeLabel:type.label,question:raw.question,questionText:raw.questionText,given:extraGiven,instruction:raw.instructionText||'',answer:raw.answer,answerText:raw.answerText,steps:raw.steps,stepText:raw.stepText,raw:raw.source};break;
    }catch(error){lastError=error.message;}
    if(question)questions.push(question);else if(i<types.length)throw Error(`${level.id}/${type.id}: ${lastError||'No distinct valid question'}`);
   }
   assert(questions.length>=2,`Only ${questions.length} distinct questions`);assert(types.every(t=>questions.some(q=>q.type===t.id)),'Incomplete type coverage');
   const short=String(level.title).replace(/^Level\s*\d+\s*[:–-]\s*/i,'').trim(),id=(tool.category.slice(0,3)+'-'+crypto.createHash('sha1').update(tool.slug).digest('hex').slice(0,4)+'-L'+level.id).toUpperCase();
   packs.push({id,slug:`${tool.slug}-level-${String(level.id).toLowerCase().replace(/[^a-z0-9-]/g,'-')}`,title:short,topic:tool.title,category:tool.category,stage:tool.level,sourceTool:tool.slug,level:level.id,levelTitle:level.title,types:types.map(t=>t.id),typeLabels:types.map(t=>t.label),kind:types.length>1||/mixed/.test(types[0].id)?'Mixed':'Focused',description:level.description||tool.description,version:'1.0',questions});toolPacks++;
  }
  coverage.push({slug:tool.slug,title:tool.title,status:'Exported',packCount:toolPacks});
 }catch(error){failures.push({slug:tool.slug,error:error.message});}finally{runtime?.dom.window.close();}
}
fs.mkdirSync(path.join(root,'data/practice-packs'),{recursive:true});fs.writeFileSync(path.join(root,'data/practice-packs/library.json'),JSON.stringify({version:1,seed:20261021,tools:tools.length,packs,coverage,failures},null,2)+'\n');
console.log(JSON.stringify({tools:tools.length,packs:packs.length,questions:packs.reduce((n,p)=>n+p.questions.length,0),types:packs.reduce((n,p)=>n+p.types.length,0),failures},null,2));if(failures.length)process.exitCode=1;
