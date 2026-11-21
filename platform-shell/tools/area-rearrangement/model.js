(function(root){
'use strict';
const counts=[6,8,12,16,24,32,64,128,256];
function circle(n,r=180){
 if(!counts.includes(n)||!(r>0))throw new RangeError('Choose a supported even sector count and positive radius.');
 // Alternate the two semicircles. Adjacent sectors share an entire radial edge.
 const half=Math.PI/n,w=r*Math.sin(half),h=r*Math.cos(half),left=450-(n-1)*w/2;
 const pieces=Array.from({length:n},(_,i)=>({id:i,color:i<n/2?'teal':'gold',start:{x:450,y:250,rotation:i*360/n},end:{x:left+(i<n/2?2*i:2*(i-n/2)+1)*w,y:250-h/2+(i<n/2?0:h),rotation:i<n/2?0:180}}));
 return {n,r,w,h,width:n*w,area:Math.PI*r*r,halfArc:Math.PI*r,pieces};
}
function area(points){return Math.abs(points.reduce((s,p,i)=>{const q=points[(i+1)%points.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;}
function parallelogram(kind='gentle'){
 const b=320,h=180,s=kind==='steep'?150:80,A=[230,350],B=[230+b,350],D=[230+s,350-h],C=[230+b+s,350-h],E=[230+s,350];
 return {b,h,s,whole:[A,B,C,D],fixed:[E,B,C,D],piece:[A,E,D],shift:[b,0],heightX:D[0]};
}
function triangle(kind='acute'){
 const x={acute:420,right:280,obtuse:200}[kind];if(x===undefined)throw new RangeError('Unknown triangle.');
 const A=[280,350],B=[560,350],C=[x,190],D=[x+280,190],pivot=[(B[0]+C[0])/2,270];
 return {b:280,h:160,points:[A,B,C],destination:[D,C,B],pivot,foot:[x,350],whole:[A,B,D,C]};
}
function rotate(point,pivot,degrees){const a=degrees*Math.PI/180,c=Math.cos(a),s=Math.sin(a),x=point[0]-pivot[0],y=point[1]-pivot[1];return [pivot[0]+x*c-y*s,pivot[1]+x*s+y*c];}
// Interpolate only rigid translations and rotations; never scale a sector.
function interpolate(piece,t){t=Math.max(0,Math.min(1,t));const a=piece.start,b=piece.end,turn=((b.rotation-a.rotation+540)%360)-180;return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,rotation:a.rotation+turn*t};}
const api={counts,circle,area,parallelogram,triangle,rotate,interpolate};if(typeof module==='object'&&module.exports)module.exports=api;else root.KaizenAreaMath=api;
})(typeof window!=='undefined'?window:globalThis);
