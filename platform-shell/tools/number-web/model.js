(function(root){
'use strict';
const levels={bonds:{label:'First steps · bonds to 10',targets:[10],target:10,branches:4,scale:1},lower:{label:'Lower primary · within 20',targets:[10,12,15,20],target:20,branches:4,scale:1},primary:{label:'Primary · within 50',targets:[20,30,40,50],target:50,branches:6,scale:1},upper:{label:'Upper primary · within 200',targets:[60,100,120,150,200],target:150,branches:8,scale:1},decimals:{label:'Decimal challenge · tenths',targets:[1,2,5,10],target:5,branches:8,scale:10},integers:{label:'Integer challenge · negatives',targets:[0,10,25,50],target:25,branches:8,scale:1}};
function random(seed){let s=seed>>>0;return()=>{s=(s+0x6D2B79F5)>>>0;let t=Math.imul(s^(s>>>15),1|s);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296;};}
function shuffle(a,r){for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function generate(level='upper',target,seed=Date.now()){
 if(!Object.hasOwn(levels,level))throw Error('Unknown level');const config=levels[level];target=target??config.target;if(!config.targets.includes(target))throw Error('Target is outside this level');
 seed=seed>>>0;const r=random(seed),units=target*config.scale,used=new Set(),blanks=shuffle(Array.from({length:config.branches},(_,i)=>i%3),r),branches=[];
 for(let i=0;i<config.branches;i++){
  let values,key;
  for(let tries=0;tries<1000;tries++){
   if(level==='integers'){const negative=-(1+Math.floor(r()*40)),positive=1+Math.floor(r()*(units+40));values=shuffle([negative,positive,units-negative-positive],r);}
   else{const a=1+Math.floor(r()*(units-2)),b=1+Math.floor(r()*(units-a-1));values=shuffle([a,b,units-a-b],r);}
   key=values.join(',');if(!used.has(key))break;
  }
  used.add(key);branches.push({id:String.fromCharCode(65+i),values,missing:blanks[i]});
 }
 return {level,target,units,scale:config.scale,seed,code:seed.toString(16).toUpperCase().padStart(8,'0'),branches};
}
function format(units,scale){return String(units/scale).replace('-','−');}
function hex(x,y,r){return Array.from({length:6},(_,i)=>{const a=(-90+60*i)*Math.PI/180;return[x+r*Math.cos(a),y+r*Math.sin(a)];});}
function geometry(p){return p.branches.map((branch,i)=>{const angle=(-90+i*360/p.branches.length)*Math.PI/180,polar=(r,a)=>[500+r*Math.cos(a),500+r*Math.sin(a)],mid=polar(220,angle),left=polar(410,angle-12*Math.PI/180),right=polar(410,angle+12*Math.PI/180);return {branch,points:[mid,left,right],lines:[[[500,500],mid],[mid,left],[mid,right]]};});}
function correct(p,branch,value){const text=String(value).trim().replace('−','-');if(!/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text))return false;return Math.abs(Number(text)*p.scale-branch.values[branch.missing])<1e-8;}
const api={levels,generate,format,hex,geometry,correct};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.KaizenNumberWeb=api;
})(typeof window!=='undefined'?window:globalThis);
