// Freeze checked samples from the actual classroom generator, not a second question bank.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'tools/substitution/index.html'),'utf8');
const source=html.slice(html.indexOf('    let currentLevel = 1;'),html.indexOf('    function toggleSidebar()'));
let seed=20261020;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const seededMath=Object.create(Math);seededMath.random=random;
const context=vm.createContext({window:{},Math:seededMath,Set,console});vm.runInContext(source,context);
function plain(s){return s.replace(/\\[()[\]]|\$\$/g,'').replace(/\\(?:big|left|right)/g,'').replace(/\\cdot/g,'*').replace(/\\[;,]/g,' ').trim();}
function evaluate(s,values){
 const expr=plain(s).replace(/\^\{([^}]+)\}/g,'^($1)').replace(/\^/g,'**').replace(/\s/g,'').replace(/([0-9a-z)])(?=[a-z(])/g,'$1*');
 assert(/^[0-9a-z+*/().\-]+$/.test(expr),expr);
 const names=Object.keys(values);assert([...expr.matchAll(/[a-z]/g)].every(m=>names.includes(m[0])),expr);
 return Function(...names,`"use strict";return (${expr});`)(...names.map(n=>values[n]));
}
function verify(problem){
 const relations=plain(problem.given).split(',').map(part=>part.split('=').map(s=>s.trim()));
 const dependencies=new Set(relations.map(([v])=>v));
 const free=[...new Set(relations.flatMap(([,rhs])=>[...rhs.matchAll(/[a-z]/g)].map(m=>m[0])))].filter(v=>!dependencies.has(v));
 for(const sample of [-3,-1,0,2,5]){
  const values=Object.fromEntries(free.map(v=>[v,sample]));
  for(const [v,rhs] of relations)values[v]=evaluate(rhs,values);
  const expected=evaluate(problem.expression,values);assert.equal(evaluate(problem.answer,values),expected,JSON.stringify(problem));
  for(const line of problem.steps.filter(s=>s.startsWith('$$')))for(const side of plain(line).split('='))assert.equal(evaluate(side,values),expected,JSON.stringify({line,problem}));
 }
}
const specs=[
 [1,'Linear expressions',['type1_single'],8,'Substitute positive and negative values into linear expressions.'],
 [1,'Quadratic expressions',['type2_single'],6,'Substitute into squared terms, then follow the order of operations.'],
 [2,'Two variables',['type1_multiple'],6,'Substitute two values and evaluate each term before combining.'],
 [2,'Three variables',['type2_multiple'],6,'Keep track of three values and the signs between terms.'],
 [2,'Powers and products',['type3_multiple'],5,'Evaluate squares and products involving positive and negative values.'],
 [3,'Substituting an expression',['type1_expression'],4,'Replace a variable with a linear expression, then expand and simplify.'],
 [3,'Combining expressions',['type2_expression'],4,'Substitute an expression and collect like terms.'],
 [4,'Quadratic and cubic expressions',['complex_substitution'],4,'Substitute a linear expression into quadratic, cubic and product terms.'],
 [1,'Single variable - mixed practice',['type1_single','type2_single'],8,'Mix linear and quadratic substitution in one short practice session.'],
 [2,'Multiple variables - mixed practice',['type1_multiple','type2_multiple','type3_multiple'],6,'Mix two variables, three variables, squares and products.'],
 [3,'Expression substitution - mixed practice',['type1_expression','type2_expression'],4,'Mix substitution into a single expression with collecting like terms.']
];
const seen=new Set(),packs=[];
specs.forEach(([level,title,types,count,description],index)=>{
 const questions=[];
 for(let i=0;i<count;i++){
  const type=types[i%types.length];let p;
  for(let tries=0;tries<500;tries++){
   p=vm.runInContext(`currentLevel=${level};currentType=${JSON.stringify(type)};generateProblem()`,context);
   const key=p.given+'|'+p.expression;
   // Numerical packs start with an easier non-negative example, then include negative values.
   if(i===0&&level<=2&&/=-/.test(p.given))continue;
   if(i===count-1&&level<=2&&!/=-/.test(p.given))continue;
   if(seen.has(key))continue;seen.add(key);break;
  }
  verify(p);questions.push({...p,type,number:i+1});
 }
 const id=`AS-${String(index+1).padStart(2,'0')}`,slug=id.toLowerCase()+'-'+title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');
 packs.push({id,slug,title,topic:'Algebraic Substitution',level,types,kind:types.length>1?'Mixed':'Focused',estimatedMinutes:10,description,questions,version:'1.0',sourceTool:'substitution'});
});
const output={collection:'Algebraic Substitution',version:'1.0',seed:20261020,generator:'tools/substitution/index.html',packs};
fs.writeFileSync(path.join(root,'data/practice-packs/substitution.json'),JSON.stringify(output,null,2)+'\n');
console.log(`Frozen ${packs.length} packs / ${packs.reduce((n,p)=>n+p.questions.length,0)} questions. Independently checked all answers and displayed mathematical steps.`);
