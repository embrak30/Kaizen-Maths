const assert=require('node:assert/strict'),path=require('node:path'),{inventory,openGenerator,base}=require('../scripts/pack-library/runtime.cjs'),math=require(path.join(base,'mathjs')),katex=require('../assets/vendor/katex/katex.min.js');
function expression(text){
 let s=text.replace(/\$/g,'').replace(/\\(?:left|right|bigg?|Bigg?|displaystyle)/g,'').replace(/\\[,;]|\\quad/g,' ');
 s=s.replace(/\\(sin|cos|tan|sec|csc|cot)\^\{(\d+)\}\(([^()]*)\)/g,'($1($3))^($2)');
 let old;do{old=s;s=s.replace(/\\(?:dfrac|frac)\{([^{}]*)\}\{([^{}]*)\}/g,'(($1)/($2))').replace(/\^\{([^{}]*)\}/g,'^($1)')}while(old!==s);
 return s.replace(/\\ln/g,'log').replace(/\\(sin|cos|tan|sec|csc|cot)/g,'$1').replace(/\\cdot|\\times/g,'*').replace(/\[/g,'(').replace(/\]/g,')').replace(/\{([^{}]*)\}/g,'($1)').replace(/x(?=\()/g,'x*').replace(/(?<=[x0-9])(?=(?:sin|cos|tan|sec|csc|cot|log)\()/g,'*').replace(/\)(?=\s*(?:\(|sin|cos|tan|sec|csc|cot|log))/g,')*');
}
let questions=0,values=0,steps=0;
for(const slug of ['differentiation-rules','trig-differentiation-rules']){
 const r=openGenerator(path.resolve(__dirname,'..'),inventory(path.resolve(__dirname,'..')).find(t=>t.slug===slug),1847);
 const cases=slug==='differentiation-rules'?[[2,'product_rule'],[2,'quotient_rule'],[2,'combination'],[3,'trig_functions'],[3,'log_functions'],[3,'mixed_advanced']]:[[2,'product_rule'],[2,'quotient_rule'],[2,'combination'],[3,'mixed_advanced']];
 for(const [level,type] of cases)for(let i=0;i<60;i++){
  const p=r.api.generate({level,type,count:1}).problems[0].source,raw=p.equation.slice(p.equation.indexOf('=')+1),answer=p.answer.slice(p.answer.indexOf('=')+1),f=expression(raw),d=expression(answer),expected=math.derivative(f,'x').compile(),actual=math.compile(d);
  assert(p.steps.some(s=>/factor|common factor|cancel/i.test(s.text||'')),slug+' '+type+' missing final factorisation explanation');
  for(const x of [.23,.71,1.13,2.17,3.41]){const a=expected.evaluate({x}),b=actual.evaluate({x});assert(Number.isFinite(a)&&Number.isFinite(b));assert(Math.abs(a-b)<1e-7*Math.max(1,Math.abs(a),Math.abs(b)),`${slug}/${type}: ${p.equation} -> ${p.answer} at ${x}: ${a} != ${b}`);values++;}
  for(const step of p.steps){const text=step.text||'';for(const m of text.matchAll(/\$([^$]*)\$/g))katex.renderToString(m[1],{throwOnError:true,strict:'ignore'});
   const match=text.match(/^\$y'=(.*)\$$/);if(!match||/[uvfghw]/.test(match[1].replace(/\\[a-z]+/g,'')))continue;
   const compiled=math.compile(expression(match[1]));for(const x of [.71,1.13]){const a=actual.evaluate({x}),b=compiled.evaluate({x});assert(Math.abs(a-b)<1e-7*Math.max(1,Math.abs(a),Math.abs(b)),text);steps++;}
  }
  questions++;
 }
 if(slug==='differentiation-rules'){
  const original=r.context.random;let sequence=[2,4,2,2];r.context.random=()=>sequence.shift();assert.equal(r.context.productRule().answer,String.raw`$\dfrac{dy}{dx}=16x(x + 2)(x-2)$`);
  sequence=[4,2,4,4];assert.equal(r.context.quotientRule().answer,String.raw`$\dfrac{dy}{dx}=\dfrac{x(x + 2)}{(x + 1)^2}$`);r.context.random=original;
 }
 // Explicitly exercise cancellation, repeated factors and zero derivatives.
 if(slug==='trig-differentiation-rules'){
  const fn=r.context.factorTrigSum;
  assert.equal(fn([{coefficient:2,factors:[['s',1]]},{coefficient:-2,factors:[['s',1]]}]).latex,'0');
  const cancelled=fn([{coefficient:2,factors:[['s',2],['t',1]]},{coefficient:4,factors:[['s',1],['t',1]]}],[['s',2]]);assert(cancelled.cancelled);assert(cancelled.latex.includes('dfrac'));
 }
 r.dom.window.close();
}
console.log(`PASS: ${questions} generated derivatives, ${values} independent derivative comparisons, ${steps} intermediate-step comparisons, and TeX rendering.`);
