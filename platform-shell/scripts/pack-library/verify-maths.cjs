const fs=require('node:fs'),path=require('node:path'),math=require('/tmp/kaizen-pack-runtime/node_modules/mathjs');
const root=path.resolve(__dirname,'../..'),data=JSON.parse(fs.readFileSync(path.join(root,'data/practice-packs/library.json'))),checks=[],failures=[];
function expr(s){
 s=String(s).replace(/&minus;/g,'-').replace(/&times;/g,'*').replace(/<sup>(.*?)<\/sup>/g,'^($1)').replace(/<span class=["']superscript["']>(.*?)<\/span>/g,'^($1)').replace(/<[^>]+>/g,'').replace(/[−–]/g,'-').replace(/[×·]/g,'*').replace(/÷/g,'/').replace(/\\(?:left|right|bigg?|Bigg?|displaystyle)/g,'').replace(/\\[()[\],;]/g,'').replace(/\$/g,'');
 let prior;do{prior=s;s=s.replace(/\\(?:dfrac|frac)\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g,'(($1)/($2))').replace(/\\sqrt\{([^{}]*)\}/g,'sqrt($1)').replace(/\^\{([^{}]*)\}/g,'^($1)')}while(s!==prior);
 s=s.replace(/\\text\{[^{}]*\}/g,'').replace(/\\ln/g,'log').replace(/\\(sin|cos|tan|exp|log)/g,'$1').replace(/\\pi|π/g,'pi').replace(/√\(([^)]*)\)/g,'sqrt($1)').replace(/\{([^{}]*)\}/g,'($1)').replace(/\|([^|]+)\|/g,'abs($1)').replace(/\b[abcxy]{2,}\b/g,s=>s.split('').join('*'));
 if(/\\|[<>≈±]|\+\//.test(s))throw Error('unsupported');
 for(const name of s.match(/[A-Za-z]+/g)||[])if(!['x','y','a','b','c','n','t','k','e','pi','sqrt','sin','cos','tan','exp','log','abs'].includes(name))throw Error('unsupported name '+name);
 return s.trim();
}
function val(s,scope){let v=math.evaluate(s,scope);if(typeof v!=='number'||!Number.isFinite(v))throw Error('not finite scalar');return v;}
function equal(a,b){return Math.abs(a-b)<1e-6*Math.max(1,Math.abs(a),Math.abs(b));}
for(const pack of data.packs)for(const q of pack.questions){
 let mode='',left,right;
 try{
  let qt=/<sup>|class=["']superscript/.test(q.question)?q.question:q.questionText,at=/<sup>|class=["']superscript/.test(q.answer)?q.answer:q.answerText;
  if(pack.sourceTool==='fractions-practice'){qt=qt.replace(/(\d)\s*\\frac/g,'$1+\\frac');at=at.replace(/(\d)\s*\\frac/g,'$1+\\frac');}
  if(pack.sourceTool==='exponents-index-notation'&&/class=["'][^"']*(?:fraction|frac)/.test(q.question))continue;
  if(['linear-equations','quadratic-equations'].includes(pack.sourceTool)){
   const equation=qt.replace(/^(?:Solve|Find x)\s*:?\s*/i,'');const sides=equation.split('=');if(sides.length!==2)continue;
   const lhs=expr(sides[0]),rhs=expr(sides[1]);let roots=[];const pm=at.match(/(?:\+\/-|±)\s*(\d+(?:\.\d+)?)/);if(pm)roots=[+pm[1],-pm[1]];
   else for(const m of at.replace(/[−]/g,'-').matchAll(/x(?:_?\{?[12]\}?)?\s*(?:=|≈)\s*([+-]?(?:\d*\.\d+|\d+)(?:\/\d+)?)/g))roots.push(math.evaluate(m[1]));
   if(!roots.length)continue;
   const valid=roots.every(x=>{const l=val(lhs,{x}),r=val(rhs,{x});let slope=1;try{slope=Math.max(1,Math.abs(val(math.derivative(`(${lhs})-(${rhs})`,'x').toString(),{x})))}catch(e){}return Math.abs(l-r)<.006*slope+1e-6});
   const item={pack:pack.id,slug:pack.sourceTool,question:q.number,mode:'equation-roots'};if(valid)checks.push(item);else failures.push({...item,equation,roots});continue;
  }
  if(['differentiation-polynomials','differentiation-rules','trig-differentiation-rules'].includes(pack.sourceTool)&&qt.includes('=')&&at.includes('=')){
   left=math.derivative(expr(qt.slice(qt.indexOf('=')+1)),'x').toString();right=expr(at.slice(at.indexOf('=')+1));mode='derivative';
  }else if(['integration','advanced-integration','integration-algebraic-fractions'].includes(pack.sourceTool)&&/\\int(?![_^])/.test(qt)&&!/\\int\s*[_^]/.test(qt)){
   left=expr(qt.slice(qt.indexOf('\\int')+4).replace(/d\s*x\$?\.?\s*$/,'').replace(/\.$/,''));right=math.derivative(expr(at.replace(/^\$?\s*=/,'').replace(/\+\s*C\$?\.?\s*$/,'')),'x').toString();mode='antiderivative';
  }else if(/^(?:Simplify|Expand|Factorise|Factorize)\s*:/i.test(qt)&&!/[=<>]/.test(qt)){
   left=expr(qt.replace(/^[^:]+:/,''));right=expr(at);mode='equivalence';
  }else{
   left=expr(qt.replace(/^(?:Calculate|Evaluate|Find)\s*:?\s*/i,'').replace(/\.$/,''));right=expr(at.replace(/^=\s*/,''));
   if(/[a-z]/i.test(left+right)||/[=]/.test(left+right))continue;mode='arithmetic';
  }
  let values=[];
  for(const x of [1.3,2.7,4.1,6.2])try{const scope={x,y:x+1,a:x+2,b:x+3,c:x+4,n:2,t:x,k:2};values.push([val(left,scope),val(right,scope)])}catch(e){}
  if(values.length<3)continue;
  const valid=values.every(([a,b])=>equal(a,b));const item={pack:pack.id,slug:pack.sourceTool,question:q.number,mode};if(valid)checks.push(item);else failures.push({...item,left,right,values});
 }catch(e){}
}
const report={checked:checks.length,byMode:Object.fromEntries([...new Set(checks.map(c=>c.mode))].map(mode=>[mode,checks.filter(c=>c.mode===mode).length])),failures};fs.writeFileSync(path.join(root,'tmp/pdfs/library-maths-checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
