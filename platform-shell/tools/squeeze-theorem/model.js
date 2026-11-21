(function(root){
'use strict';
const examples=[
 {id:'oscillation',title:'Oscillation squeezed to zero',a:0,L:0,common:true,knownLimit:0,span:1.1,lower:'−x²',middle:'x² sin(1/x)',upper:'x²',near:'x ≠ 0',wave:'sin',lowerValue:x=>-x*x,upperValue:x=>x*x,value:x=>x===0?null:x*x*Math.sin(1/x)},
 {id:'shifted',title:'A non-zero limit',a:2,L:3,common:true,knownLimit:3,span:1.1,lower:'3 − (x − 2)²',middle:'3 + (x − 2)² cos(1/(x − 2))',upper:'3 + (x − 2)²',near:'x ≠ 2',wave:'cos',lowerValue:x=>3-(x-2)**2,upperValue:x=>3+(x-2)**2,value:x=>x===2?null:3+(x-2)**2*Math.cos(1/(x-2))},
 {id:'different',title:'Different bounds · a limit still exists',a:0,L:null,common:false,knownLimit:0,span:.9,lower:'−1',middle:'x',upper:'1',near:'|x| < 1',lowerValue:()=>-1,upperValue:()=>1,value:x=>x},
 {id:'unsqueezed',title:'Different bounds · persistent oscillation',a:0,L:null,common:false,knownLimit:null,span:.9,lower:'−1',middle:'sin(1/x)',upper:'1',near:'x ≠ 0',wave:'sin',lowerValue:()=>-1,upperValue:()=>1,value:x=>x===0?null:Math.sin(1/x)}
];
function sample(example,distance){return [-1,1].map(side=>{const x=example.a+side*distance;return {x,lower:example.lowerValue(x),middle:example.value(x),upper:example.upperValue(x)};});}
const api={examples,sample};if(typeof module==='object'&&module.exports)module.exports=api;else root.KaizenSqueezeMath=api;
})(typeof window!=='undefined'?window:globalThis);
