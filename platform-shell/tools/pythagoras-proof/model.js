/* Perigal's dissection: all five pieces move by translation only. */
(function(root){
'use strict';
const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,v));
function validate(a,b){if(![a,b].every(x=>Number.isFinite(x)&&x>=1&&x<=24&&Math.abs(x*100-Math.round(x*100))<1e-8))throw new RangeError('Choose two leg lengths from 1 to 24, with up to two decimal places.');}
const add=(p,q)=>[p[0]+q[0],p[1]+q[1]];
const sub=(p,q)=>[p[0]-q[0],p[1]-q[1]];
const dot=(p,q)=>p[0]*q[0]+p[1]*q[1];
function area(poly){return Math.abs(poly.reduce((s,p,i)=>{const q=poly[(i+1)%poly.length];return s+p[0]*q[1]-p[1]*q[0];},0))/2;}
function clip(poly,axis,sign){const out=[];for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],dp=sign*p[axis],dq=sign*q[axis],inside=dp>=-1e-10,next=dq>=-1e-10;if(inside)out.push(p);if(inside!==next){const t=dp/(dp-dq);out.push([p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1])]);}}return out.filter((p,i)=>!i||Math.hypot(p[0]-out[i-1][0],p[1]-out[i-1][1])>1e-10);}
function build(a,b){
validate(a,b);const H=Math.max(a,b),V=Math.min(a,b),horizontal=a>=b?'a':'b',vertical=a>=b?'b':'a',c=Math.hypot(H,V),u=[H/c,-V/c],v=[V/c,H/c],S=[H/2,-H/2],C=[0,V];
const toWorld=p=>[S[0]+p[0]*u[0]+p[1]*v[0],S[1]+p[0]*u[1]+p[1]*v[1]];
const big=[[0,0],[H,0],[H,-H],[0,-H]],small=[[0,0],[0,V],[-V,V],[-V,0]],local=big.map(p=>[dot(sub(p,S),u),dot(sub(p,S),v)]);
const corners=[C,[H,0],[H+V,H],[V,H+V]],quadrants=[[1,1],[-1,1],[-1,-1],[1,-1]];
const pieces=quadrants.map(([sx,sy],i)=>({points:clip(clip(local,0,sx),1,sy).map(toWorld),delta:sub(corners[i],S),color:['#52b7ff','#b392ff','#ff80b8','#ffb74d'][i],id:i+1}));
const targetCenter=[(H+V)/2,(H+V)/2];pieces.push({points:small,delta:sub(targetCenter,[-V/2,V/2]),color:'#35dfc4',id:5});
return {a,b,H,V,c,horizontal,vertical,u,v,S,big,small,target:corners,triangle:[[0,0],[H,0],[0,V]],pieces};
}
function position(piece,t){return piece.points.map(p=>add(p,piece.delta.map(x=>x*clamp(t))));}
const api={clamp,validate,area,build,position};if(typeof module==='object'&&module.exports)module.exports=api;else root.KaizenPythagoras=api;
})(typeof window==='object'?window:globalThis);
