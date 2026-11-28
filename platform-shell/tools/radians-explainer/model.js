(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.KaizenRadians=api;})(typeof window!=='undefined'?window:null,function(){
'use strict';
const TAU=2*Math.PI,clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function validateRadius(r){if(!Number.isInteger(r)||r<1||r>5)throw Error('Choose a radius from 1 to 5.');return r;}
function radians(degrees){if(!Number.isFinite(degrees)||degrees<0||degrees>360)throw Error('Choose an angle from 0° to 360°.');return degrees*Math.PI/180;}
const gcd=(a,b)=>b?gcd(b,a%b):a;
function exact(degrees,r=1){validateRadius(r);radians(degrees);if(Math.abs(degrees-180/Math.PI)<1e-10)return{kind:'number',value:r};if(Number.isInteger(degrees)){let num=degrees*r,den=180,g=gcd(num,den);num/=g;den/=g;return{kind:'pi',num,den};}return{kind:'approx',value:r*radians(degrees)};}
function arcPath(cx,cy,r,start,end){const span=end-start;if(Math.abs(span)<1e-12)return'';let result='';const pieces=Math.ceil(Math.abs(span)/Math.PI);for(let i=0;i<=pieces;i++){const angle=start+span*i/pieces,x=cx+r*Math.cos(angle),y=cy-r*Math.sin(angle);result+=(i?' A '+r+' '+r+' 0 0 '+(span>0?0:1)+' ':'M ')+x+' '+y;}return result;}
// A radius-length copy is first moved/rotated to the tangent, then bent.
// The curved phase has radius R/t and angle t, so its length stays R.
function wrappedPoints(cx,cy,R,progress,count=180){progress=clamp(progress,0,1);const points=[];if(progress<.3){const u=progress/.3,angle=-Math.PI/2*u,sx=cx+R*u;for(let i=0;i<=count;i++){const t=i/count;points.push([sx+R*t*Math.cos(angle),cy+R*t*Math.sin(angle)]);}}
 else{const bend=(progress-.3)/.7;for(let i=0;i<=count;i++){const t=i/count;if(bend<1e-8)points.push([cx+R,cy-R*t]);else points.push([cx+R+R/bend*(Math.cos(bend*t)-1),cy-R/bend*Math.sin(bend*t)]);}}return points;}
function chunks(theta){theta=clamp(theta,0,TAU);const result=[];for(let i=0;i<Math.ceil(theta);i++){const end=Math.min(i+1,theta);if(end>i)result.push({start:i,end,length:end-i});}return result;}
const stages=[
 {title:'Start with a radius',prompt:'This length is one radius, r. We can use the same length to measure an arc.',kind:'radius'},
 {title:'Wrap one radius',prompt:'An arc of length r makes an angle of 1 radian at the centre.',kind:'wrap'},
 {title:'Measure the semicircle',prompt:'Three radius-length arcs do not quite reach the other end. A little more is needed.',kind:'count'},
 {title:'Half the circumference',prompt:'The whole circumference is 2πr. Half of it is πr.',kind:'half'},
 {title:'Connect radians and degrees',prompt:'Divide the semicircle’s arc length by its radius. The angle is π radians — the same half-turn as 180°.',kind:'proof'},
 {title:'Explore other angles',prompt:'Change the angle or radius. The radian measure is always arc length divided by radius.',kind:'explore'}
];
return{TAU,clamp,validateRadius,radians,exact,arcPath,wrappedPoints,chunks,stages};
});
