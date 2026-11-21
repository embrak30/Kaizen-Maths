(function(root){
'use strict';
const special=[0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330];
// Each exact value is n√r/d; r=1 represents a rational value.
const specs={
 0:[[1,1,1],[0,1,1],[0,1,1]],30:[[1,2,3],[1,2,1],[1,3,3]],45:[[1,2,2],[1,2,2],[1,1,1]],60:[[1,2,1],[1,2,3],[1,1,3]],90:[[0,1,1],[1,1,1],null],
 120:[[-1,2,1],[1,2,3],[-1,1,3]],135:[[-1,2,2],[1,2,2],[-1,1,1]],150:[[-1,2,3],[1,2,1],[-1,3,3]],180:[[-1,1,1],[0,1,1],[0,1,1]],
 210:[[-1,2,3],[-1,2,1],[1,3,3]],225:[[-1,2,2],[-1,2,2],[1,1,1]],240:[[-1,2,1],[-1,2,3],[1,1,3]],270:[[0,1,1],[-1,1,1],null],
 300:[[1,2,1],[-1,2,3],[-1,1,3]],315:[[1,2,2],[-1,2,2],[-1,1,1]],330:[[1,2,3],[-1,2,1],[-1,3,3]]
};
function normalize(a){if(!Number.isFinite(a))throw new TypeError('Angle must be finite');const n=((a%360)+360)%360;return n===0?0:n;}
function value(s){return s===null?null:s[0]*Math.sqrt(s[2])/s[1];}
function point(angle){
 const n=normalize(angle),key=special.find(a=>Math.abs(n-a)<1e-9),exact=key===undefined?null:specs[key];
 const cos=exact?value(exact[0]):Math.cos(n*Math.PI/180),sin=exact?value(exact[1]):Math.sin(n*Math.PI/180),tan=exact?value(exact[2]):sin/cos;
 const axis=exact&&[0,90,180,270].includes(key)?['Positive x-axis','Positive y-axis','Negative x-axis','Negative y-axis'][key/90]:null;
 const quadrant=axis?null:Math.floor(n/90)+1,reference=axis?null:n<90?n:n<180?180-n:n<270?n-180:360-n;
 return {angle,n,radians:angle*Math.PI/180,cos,sin,tan,exact,axis,quadrant,reference};
}
function gcd(a,b){return b?gcd(b,a%b):Math.abs(a);}
function piMultiple(angle){if(!Number.isInteger(angle))return null;const d=gcd(angle,180);return {n:angle/d,d:180/d};}
function fromXY(x,y,previous,snap=false){
 if(Math.hypot(x,y)<.03)return previous;
 const raw=normalize(Math.atan2(y,x)*180/Math.PI);let a=raw+360*Math.round((previous-raw)/360);
 if(snap){let best=a,dist=5;for(const s of special){const candidate=s+360*Math.round((a-s)/360),delta=Math.abs(a-candidate);if(delta<=dist){best=candidate;dist=delta;}}a=best;}
 return Math.max(-360,Math.min(720,Math.round(a*10)/10));
}
const api={special,specs,point,normalize,value,piMultiple,fromXY};if(typeof module==='object'&&module.exports)module.exports=api;else root.KaizenUnitCircleMath=api;
})(typeof window!=='undefined'?window:globalThis);
