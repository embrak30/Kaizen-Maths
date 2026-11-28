/* Rigid geometry for Perigal's dissection and whole-unit square counting. */
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
function tilePlan(g,mode='count') {
  const n=Math.round(g.c);
  if(!Number.isInteger(g.a)||!Number.isInteger(g.b)||Math.abs(g.c-n)>1e-9)throw new RangeError('Unit-square counting needs a whole-number Pythagorean triple. Use Dissection for other leg lengths.');
  const target=(i,j)=>[g.target[0][0]+(i+.5)*g.u[0]+(j+.5)*g.v[0],g.target[0][1]+(i+.5)*g.u[1]+(j+.5)*g.v[1]];
  const grid=(side,x,y)=>Array.from({length:side*side},(_,i)=>({center:[x+i%side+.5,y+Math.floor(i/side)+.5],side:1}));
  const small=grid(g.V,-g.V,0),big=grid(g.H,0,-g.H),cells=[];
  for(let j=0;j<n;j++)for(let i=0;i<n;i++)cells.push({i,j,center:target(i,j)});
  if(mode==='count'){
    small.forEach((tile,i)=>tile.target=cells[i].center);
    big.forEach((tile,i)=>tile.target=cells[i+small.length].center);
  }else{
    big.forEach((tile,i)=>tile.target=target(i%g.H,Math.floor(i/g.H)));
    const rim=cells.filter(cell=>cell.i>=g.H||cell.j>=g.H);
    small.forEach((tile,i)=>tile.target=rim[i].center);
  }
  return {n,small,big,cells,angle:Math.atan2(g.u[1],g.u[0]),block:{center:[g.H/2,-g.H/2],target:target((g.H-1)/2,(g.H-1)/2),side:g.H}};
}
function rigidSquare(tile,t,angle){
  t=clamp(t);const center=tile.center.map((x,i)=>x+(tile.target[i]-x)*t),r=tile.side/2,cos=Math.cos(angle*t),sin=Math.sin(angle*t);
  return [[-r,-r],[r,-r],[r,r],[-r,r]].map(([x,y])=>[center[0]+x*cos-y*sin,center[1]+x*sin+y*cos]);
}
function rigidBlockTile(tile,block,t,angle){
  t=clamp(t);const center=block.center.map((x,i)=>x+(block.target[i]-x)*t),cos=Math.cos(angle*t),sin=Math.sin(angle*t),offset=sub(tile.center,block.center),moved=[center[0]+offset[0]*cos-offset[1]*sin,center[1]+offset[0]*sin+offset[1]*cos];
  return rigidSquare({center:moved,target:moved,side:1},1,angle*t);
}
const api={clamp,validate,area,build,position,tilePlan,rigidSquare,rigidBlockTile};if(typeof module==='object'&&module.exports)module.exports=api;else root.KaizenPythagoras=api;
})(typeof window==='object'?window:globalThis);
