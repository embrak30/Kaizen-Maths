(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.KaizenNumberTrails=api;})(typeof window!=='undefined'?window:null,function(){
'use strict';
const levels={first:{label:'First steps · + and −',max:30,start:12,ops:['+','−']},mixed:{label:'Mixed operations',max:200,start:24,ops:['+','−','×','÷']},challenge:{label:'Integer challenge',max:500,start:60,ops:['+','−','×','÷'],negative:true}};
const points=[[130,100],[350,100],[570,100],[790,100],[130,320],[350,320],[570,320],[790,320],[130,540],[350,540],[570,540],[790,540]];
// A directed tree: every destination has exactly one incoming calculation.
const topology=[[0,1],[0,4],[1,2],[1,5],[5,6],[5,9],[6,7],[7,3],[7,11],[9,8],[9,10]];
function rng(seed){let s=seed>>>0;return()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
function calculate(value,op,n){switch(op){case '+':return value+n;case '−':return value-n;case '×':return value*n;case '÷':return value/n;default:throw Error('Unknown operation');}}
function generate(level='mixed',seed=0,start){
 const config=levels[level];if(!config)throw Error('Unknown level');const random=rng(seed),pick=a=>a[Math.floor(random()*a.length)];
 if(start===undefined)start=pick(Array.from({length:config.start-1},(_,i)=>i+2));
 if(!Number.isSafeInteger(start)||Math.abs(start)>config.max||(!config.negative&&start<0))throw Error('Choose a whole number '+(config.negative?'from −'+config.max:'from 0')+' to '+config.max+'.');
 const values=[start],edges=[];
 for(const [from,to] of topology){
  const choices=config.ops.map(op=>({op,numbers:Array.from({length:op==='×'||op==='÷'?8:config===levels.first?10:25},(_,i)=>i+(op==='×'||op==='÷'?2:1)).filter(n=>{const v=calculate(values[from],op,n);return !edges.some(e=>e.from===from&&e.op===op&&e.operand===n)&&Number.isSafeInteger(v)&&Math.abs(v)<=config.max&&(config.negative||v>=0)&&v!==values[from];})})).filter(c=>c.numbers.length);
  const choice=pick(choices),operand=pick(choice.numbers);values[to]=calculate(values[from],choice.op,operand);edges.push({from,to,op:choice.op,operand});
 }
 return{level,seed:seed>>>0,start,values,edges,code:(seed>>>0).toString(16).padStart(8,'0').toUpperCase()};
}
return{levels,points,topology,generate,calculate};
});
