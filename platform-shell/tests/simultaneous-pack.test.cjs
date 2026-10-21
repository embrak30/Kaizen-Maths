const path=require('node:path'),assert=require('node:assert/strict'),{inventory,openGenerator,base}=require('../scripts/pack-library/runtime.cjs'),math=require(path.join(base,'mathjs'));
const root=path.resolve(__dirname,'..'),tool=inventory(root).find(t=>t.slug==='simultaneous-equations'),runtime=openGenerator(root,tool),api=runtime.api;let checked=0,equalities=0;
function plain(s){let old;do{old=s;s=s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g,'(($1)/($2))')}while(old!==s);return s.replace(/\\(?:left|right)/g,'').replace(/\\times/g,'*').replace(/\\quad.*$/,'').replace(/\\[;, ]/g,'').replace(/[−]/g,'-');}
for(const [level,types] of [[1,['easy_substitution','harder_substitution']],[2,['easy_elimination','elimination_with_scaling','elimination_harder']]])for(const type of types)for(let i=0;i<100;i++){
 const q=api.generate({level,type,count:1}).problems[0].source;
 const x=+q.answerLatex.match(/x\s*=\s*(-?\d+)/)[1],y=+q.answerLatex.match(/y\s*=\s*(-?\d+)/)[1],scope={x,y};
 const coefficients=[];
 for(const eq of q.equationsLatex){const [l,r]=eq.split('=').map(plain);assert(Math.abs(math.evaluate(l,scope)-math.evaluate(r,scope))<1e-8);const f=(x,y)=>math.evaluate(`(${l})-(${r})`,{x,y});coefficients.push([f(1,0)-f(0,0),f(0,1)-f(0,0)]);}
 assert(Math.abs(coefficients[0][0]*coefficients[1][1]-coefficients[1][0]*coefficients[0][1])>1e-8,'System must have a unique solution');
 for(const step of q.steps){if(!step.latex||/\\begin|\\text/.test(step.latex))continue;let s=step.latex.split('\\Rightarrow').pop();let parts=s.split('=').map(plain);if(parts.length<2)continue;let values;try{values=parts.map(side=>math.evaluate(side,scope))}catch(e){continue;}assert(values.every(v=>typeof v==='number'&&Math.abs(v-values[0])<1e-8),step.latex);equalities++;}
 checked++;
}
runtime.dom.window.close();console.log(`PASS: ${checked} generated systems have unique solutions and satisfy ${equalities} worked equalities.`);
