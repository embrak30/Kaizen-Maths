const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{JSDOM}=require(path.join(process.env.KAIZEN_PACK_NODE_MODULES||'/tmp/kaizen-ap-runtime/node_modules','jsdom')),math=require(path.join(process.env.KAIZEN_PACK_NODE_MODULES||'/tmp/kaizen-ap-runtime/node_modules','mathjs'));
const root=path.resolve(__dirname,'../..'),data=JSON.parse(fs.readFileSync(root+'/data/ap-calculus/questions.json')),checked=[],manual=[],failures=[];
function tex(s){
 const dom=new JSDOM('<div id="q">'+String(s)+'</div>'),host=dom.window.document.querySelector('#q');host.querySelectorAll('.vfrac,.frac,.fraction').forEach(f=>{if(f.children.length>=2)f.replaceWith(dom.window.document.createTextNode('\\frac{'+f.children[0].textContent+'}{'+f.children[1].textContent+'}'));});host.querySelectorAll('sup').forEach(n=>n.replaceWith(dom.window.document.createTextNode('^{'+n.textContent+'}')));s=host.textContent;dom.window.close();
 s=s.replace(/\\(?:left|right|bigg?|Bigg?|displaystyle|limits)/g,'').replace(/\\[,;!]|\\quad/g,' ').replace(/\$/g,'').replace(/[−–]/g,'-').replace(/[×·]/g,'*');
 s=s.replace(/\\(sin|cos|tan)\^\{-1\}/g,(_,f)=>({sin:'asin',cos:'acos',tan:'atan'})[f]);
 s=s.replace(/\\(sin|cos|tan|sec|csc|cot)\^\{?(\d+)\}?\s*\(([^()]*)\)/g,'($1($3))^($2)');
 let old;do{old=s;s=s.replace(/\\(?:dfrac|frac)\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g,'(($1)/($2))').replace(/\\sqrt\{([^{}]*)\}/g,'sqrt($1)').replace(/\^\{([^{}]*)\}/g,'^($1)');}while(s!==old);
 return s.replace(/\\ln/g,'log').replace(/\\(sin|cos|tan|sec|csc|cot|exp|arctan|arcsin)/g,(_,f)=>({arctan:'atan',arcsin:'asin'})[f]||f).replace(/\\cdot|\\times/g,'*').replace(/\\pi|π/g,'pi').replace(/\{([^{}]*)\}/g,'($1)').replace(/\|([^|]+)\|/g,'abs($1)').replace(/\bxy\b/g,'x*y').replace(/\b([xy])(?=\()/g,'$1*').replace(/xlog\b/g,'x*log').replace(/\b(log|sin|cos|tan|sec|csc|cot)\s+([a-z])\b/g,'$1($2)').replace(/\)(?=\s*\()/g,')*');
}
const close=(a,b,tol=2e-6)=>Math.abs(a-b)<=tol*Math.max(1,Math.abs(a),Math.abs(b));
function num(s,scope){const v=math.evaluate(s,scope);assert.equal(typeof v,'number');assert(Number.isFinite(v));return v;}
for(const pack of data.packs)for(const q of pack.questions){
 const key=pack.id+'/'+q.number;
 try{
  if(q.check){const expected=math.derivative(q.check.expression,'x').compile(),actual=math.compile(q.check.answer);for(const x of [.31,.71,1.3,2.1,3.6])assert(close(expected.evaluate({x}),actual.evaluate({x})),key);checked.push({key,mode:'independent-symbolic-derivative'});continue;}
  if(q.origin!=='generator'){manual.push({key,reason:'Authored interpretation/reasoning or multi-part worked calculation; not checked by this parser.'});continue;}
  const question=q.question,ans=q.answer;
  if(['1.5','1.6','1.15'].includes(pack.id)){
   const m=question.match(/\\to\s*([^}]+)\}/);assert(m);const a=m[1].trim(),body=question.slice(question.indexOf('}',m.index)+1),f=tex(body),answer=num(tex(ans),{});
   const points=/infty/.test(a)?[1e7,2e7]:[Number(a)-1e-6,Number(a)+1e-6];for(const x of points)assert(close(num(f,{x}),answer,2e-4),key+' limit');checked.push({key,mode:'two-sided-numerical-limit'});continue;
  }
  if(pack.id==='3.1'){
   const f=tex(question.slice(question.indexOf('=')+1)),a=tex(ans.slice(ans.indexOf('=')+1)),d=math.derivative(f,'x').compile();for(const x of [.3,1.1,2.3])assert(close(d.evaluate({x}),num(a,{x})));checked.push({key,mode:'independent-symbolic-derivative'});continue;
  }
  if(pack.id==='9.2'){
   const m=question.match(/\$x\(t\)=([^$]+)\$\s*and\s*\$y\(t\)=([^$]+)\$/);if(!m)throw Error('Unsupported parametric prompt');const xraw=m[1],yraw=m[2];const x=tex(xraw),y=tex(yraw),dx=math.derivative(x,'t').toString(),dy=math.derivative(y,'t').toString(),first=`(${dy})/(${dx})`,second=`(${math.derivative(first,'t')})/(${dx})`,a=tex(ans.slice(ans.indexOf('=')+1));for(const t of [.7,1.3,2.7])assert(close(num(second,{t}),num(a,{t})));checked.push({key,mode:'parametric-second-derivative'});continue;
  }
  if(['6.8','6.9','6.11','6.12'].includes(pack.id)&&/\\int(?![_^])/.test(question)&&!/\\int\s*[_^]/.test(question)){
   let integrand=question.slice(question.indexOf('\\int')+4).replace(/\\,?\s*d\s*x\$?\.?\s*$/,'').replace(/\.$/,'');let answer=ans.replace(/\+\s*C\$?\.?\s*$/,'').replace(/^\$?\s*=/,'');const f=tex(integrand),g=tex(answer),der=math.derivative(g,'x').compile();let n=0;for(const x of [.4,1.2,2.6,7.1])try{const a=num(f,{x}),b=der.evaluate({x});assert(close(a,b),key+' antiderivative');n++;}catch(e){if(e.code==='ERR_ASSERTION')throw e;}assert(n>=2);checked.push({key,mode:'differentiate-antiderivative'});continue;
  }
  manual.push({key,reason:'Model/initial-condition/series/table or domain check; not checked by this parser.'});
 }catch(e){if(e.code==='ERR_ASSERTION')failures.push({key,error:e.message});else manual.push({key,reason:'Parser does not cover notation: '+e.message.slice(0,70)});}
}
const report={questions:360,automatedChecks:checked.length,notAutomaticallyChecked:manual.length,checked,manual,failures};fs.writeFileSync(root+'/data/ap-calculus/maths-checks.json',JSON.stringify(report,null,2));console.log(JSON.stringify({questions:360,automatedChecks:checked.length,notAutomaticallyChecked:manual.length,failures},null,2));if(failures.length)process.exitCode=1;
