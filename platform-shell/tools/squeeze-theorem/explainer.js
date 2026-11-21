(() => {
'use strict';
const {examples,sample}=window.KaizenSqueezeMath,$=id=>document.getElementById(id);
const practice={id:'practice',a:1,L:2,common:true,span:.9,lower:'2 − (x − 1)²',middle:'g(x)',upper:'2 + (x − 1)²',near:'0 < |x − 1| < 1',lowerValue:x=>2-(x-1)**2,upperValue:x=>2+(x-1)**2,value:()=>null};
let chosen=examples[0],stage=0,zoom=0,playing=false,frame=0,last=0,revealed=false;
const names=['Inspect the curves','Establish the bounds','Approach from both sides','Draw the conclusion','Apply the theorem'];
const fmt=n=>n===null?'?':Math.abs(n)<1e-12?'0':Math.abs(n)<.0001?Number(n).toExponential(2):String(Number(n.toPrecision(6)));
const tableFmt=n=>n===null?'?':Math.abs(n)<1e-12?'0':Math.abs(n)<.0001?n.toExponential(3):String(Number(n.toPrecision(10)));
const limit=(a,f)=>'<span class="sq-limit">lim<small>x → '+a+'</small></span> '+f;
const fhtml=s=>s.replace(/²/g,'<sup>2</sup>').replace(/1\/\(x − 2\)/g,'<span class="sq-frac"><span>1</span><span>x − 2</span></span>').replace(/1\/x/g,'<span class="sq-frac"><span>1</span><span>x</span></span>');
$('example').innerHTML=examples.map(e=>'<option value="'+e.id+'">'+e.title+'</option>').join('')+'<option value="practice" hidden>AP-style question · unknown g(x)</option>';
function current(){return stage===4?practice:chosen;}
function plot(){
 const e=current(),span=e.span*2**(-zoom),h=.8*span*10**(-Number($('distance').value)/50),yc=e.common?e.L:0,ys=e.common?span*span*1.18:1.25;
 const x0=78,y0=28,w=780,height=424,px=x=>x0+(x-e.a+span)/(2*span)*w,py=y=>y0+(yc+ys-y)/(2*ys)*height;
 const line=(x,y,a,b,color='#dce7ea',extra='')=>`<line x1="${x}" y1="${y}" x2="${a}" y2="${b}" stroke="${color}" ${extra}/>`;
 const text=(x,y,t,anchor='middle',color='#486574')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="Arial" font-size="18">${t}</text>`;
 let svg='<defs><clipPath id="sq-clip"><rect x="78" y="28" width="780" height="424"/></clipPath></defs>';
 for(let i=0;i<5;i++){
  const xx=e.a-span+i*span/2,yy=yc-ys+i*ys/2;
  svg+=line(px(xx),y0,px(xx),y0+height)+text(px(xx),480,fmt(xx));
  svg+=line(x0,py(yy),x0+w,py(yy))+text(66,py(yy)+6,fmt(yy),'end');
 }
 svg+=text(858,508,'x','end')+text(35,22,'y');
 const samples=[];for(let i=0;i<=400;i++)samples.push(e.a-span+2*span*i/400);
 const path=(xs,fn)=>xs.map((x,i)=>{const y=fn(x);return (i?'L':'M')+px(x).toFixed(2)+','+py(y).toFixed(2);}).join('');
 svg+='<g clip-path="url(#sq-clip)">';
 if(stage>=1)svg+='<path d="'+path(samples,e.upperValue)+path([...samples].reverse(),e.lowerValue).replace(/^M/,'L')+'Z" fill="#539dbb" opacity=".09"/>';
 if(stage>=2&&e.common)svg+=line(x0,py(e.L),x0+w,py(e.L),'#be8a27','stroke-dasharray="7 5" stroke-width="2"');
 svg+='<path d="'+path(samples,e.lowerValue)+'" fill="none" stroke="#b74863" stroke-width="3"/><path d="'+path(samples,e.upperValue)+'" fill="none" stroke="#087f78" stroke-width="3"/>';
 // Resolve oscillations by phase, independently on either side of the missing point.
 if(e.wave){
  for(const side of [-1,1]){
   const xs=[e.a+side*span],start=1/span,step=Math.PI/14;
   for(let t=start;t<=Math.max(650,start+500);t+=step)xs.push(e.a+side/t);
   svg+='<path d="'+path(xs,e.value)+'" fill="none" stroke="#1766b0" stroke-width="2.4"/>';
  }
 }else if(e.id!=='practice')svg+='<path d="'+path(samples,e.value)+'" fill="none" stroke="#1766b0" stroke-width="3"/>';
 if(stage>=2){
  for(const p of sample(e,h)){
   svg+=line(px(p.x),y0+height,px(p.x),y0,'#d9a034','stroke-dasharray="4 5"');
   svg+=line(px(p.x),py(p.lower),px(p.x),py(p.upper),'#d9a034','stroke-width="5"');
   for(const [key,color]of [['lower','#b74863'],['upper','#087f78'],['middle','#1766b0']])if(p[key]!==null)svg+=`<circle cx="${px(p.x)}" cy="${py(p[key])}" r="5" fill="${color}" stroke="white" stroke-width="1.5"/>`;
  }
 }
 if(e.common&&e.id!=='practice')svg+=`<circle cx="${px(e.a)}" cy="${py(e.L)}" r="5" fill="white" stroke="#1766b0" stroke-width="2.5"/>`;
 svg+='</g>'+text(470,20,'Target: x → '+e.a);
 if(stage>=2&&e.common)svg+=text(850,Math.max(48,py(e.L)-10),'L = '+e.L,'end','#996d19');
 $('graph').innerHTML=svg;$('graph').setAttribute('aria-label',e.title||'Unknown function between two bounds, both approaching 2');
 document.querySelector('.sq-legend .sq-middle').textContent=stage===4?'— g(x): unknown':'━ Middle f(x)';
 $('distance-value').textContent='h = '+fmt(h);$('distance').setAttribute('aria-valuetext','Distance '+fmt(h)+' from '+e.a);
 $('sample-caption').textContent='Probe x = '+e.a+' − h and x = '+e.a+' + h'+(stage===4?' · g(x) is unknown':'')+' · values rounded';
 $('samples').innerHTML=sample(e,h).map(p=>'<tr>'+['x','lower','middle','upper'].map(k=>'<td>'+tableFmt(p[k])+'</td>').join('')+'</tr>').join('');
 $('zoom').disabled=zoom>=4;
 if(stage===2)$('observation').textContent=e.common?'The bounding gap at either probe is '+fmt(2*h*h)+'. Move closer: the gap tends to zero.':'The bounding gap stays at 2. Getting closer does not make these bounds meet.';
}
function lesson(){
 const e=current();$('example').disabled=stage===4;$('example').value=stage===4?'practice':chosen.id;document.querySelector('.sq-lesson').classList.toggle('sq-practice',stage===4);$('stage-label').textContent=stage===4?'AP-STYLE PRACTICE':stage===1?'BOUNDS · '+e.near:'SQUEEZE THEOREM';$('stage-title').textContent=names[stage];$('stage-count').textContent=(stage+1)+' of 5';
 $('previous').disabled=stage===0;$('next').disabled=stage===4;$('reveal').hidden=stage!==4;$('reveal').textContent=revealed?'Hide reasoning':'Reveal reasoning';
 document.querySelectorAll('[data-stage]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.stage)===stage)));
 const inequality=fhtml(e.lower)+' ≤ '+(stage===4?'g(x)':'f(x)')+' ≤ '+fhtml(e.upper);
 const limitBounds=limit(e.a,'ℓ(x)')+' = '+(e.common?e.L:'−1')+'<br>'+limit(e.a,'u(x)')+' = '+(e.common?e.L:'1');
 const prompts=[
  'What can the outer curves tell us about the middle function?',
  'What keeps f(x) between these bounds?',
  'As x approaches the target, what happens to both bounding functions?',
  e.common?'Which theorem hypothesis now fixes the middle limit?':'Can these bounds establish the middle limit?',
  'For 0 < |x − 1| < 1, these bounds hold. Find the limit of g(x) as x approaches 1.'
 ];
 $('prompt').textContent=prompts[stage];
 const contents=[
  '<p class="sq-lower">ℓ(x) = '+fhtml(e.lower)+'</p><p class="sq-middle">f(x) = '+fhtml(e.middle)+'</p><p class="sq-upper">u(x) = '+fhtml(e.upper)+'</p>',
  '<span class="sq-formula">'+inequality+'</span><p>Use −1 ≤ '+(e.wave==='cos'?'cos':'sin')+'(t) ≤ 1.</p>',
  '<span class="sq-formula">'+limitBounds+'</span>',
  e.common?'<span class="sq-formula">'+limit(e.a,'f(x)')+' = '+e.L+'</span><p class="sq-reason">The bounds approach the same L, and f stays between them.</p>':'<p class="sq-reason"><strong>The squeeze theorem gives no conclusion with these bounds.</strong></p><p class="sq-reason">'+(e.id==='different'?'Here f(x) = x still has limit 0. Different bounding limits do not prove that the middle limit fails to exist.':'Here sin(1/x) keeps oscillating. Its lack of a limit needs a separate argument.')+'</p>',
  '<span class="sq-formula">'+inequality+'</span><div style="min-height:85px;visibility:'+(revealed?'visible':'hidden')+'"><p class="sq-reason">Both bounding limits are 2.</p><p>'+limit(1,'g(x)')+' = 2</p></div>'
 ];
 if(stage===1&&!e.common)contents[1]='<span class="sq-formula">'+inequality+'</span><p>These bounds hold '+(e.id==='different'?'for |x| < 1.':'for x ≠ 0, since −1 ≤ sin(t) ≤ 1.')+'</p>';
 $('working').innerHTML=contents[stage];
 $('observation').textContent=stage===0?'Choose a teaching stage to reveal the argument.':stage===1?'The bounds must hold near the target, not only at the probe points.':stage===3&&e.common?'Here f('+e.a+') is undefined; nearby values determine the limit.':'';
}
function stop(){playing=false;cancelAnimationFrame(frame);$('play').textContent='Animate approach';$('play').setAttribute('aria-pressed','false');}
function update(){lesson();plot();}
function setStage(n){stop();stage=n;revealed=false;update();document.querySelector('.sq-lesson-body').scrollTop=0;}
function animate(time){if(!playing)return;if(!last)last=time;const value=Math.min(100,Number($('distance').value)+(time-last)/65);last=time;$('distance').value=value;plot();if(value>=100){stop();return;}frame=requestAnimationFrame(animate);}
$('example').onchange=()=>{stop();chosen=examples.find(e=>e.id===$('example').value)||examples[0];stage=0;zoom=0;revealed=false;$('distance').value=15;update();};
$('distance').oninput=()=>{stop();plot();};
$('play').onclick=()=>{if(playing){stop();return;}if(Number($('distance').value)>=100)$('distance').value=0;if(stage<2){stage=2;lesson();}playing=true;last=0;$('play').textContent='Pause approach';$('play').setAttribute('aria-pressed','true');frame=requestAnimationFrame(animate);};
$('zoom').onclick=()=>{zoom=Math.min(4,zoom+1);plot();};$('reset').onclick=()=>{stop();zoom=0;$('distance').value=15;update();};
$('previous').onclick=()=>setStage(Math.max(0,stage-1));$('next').onclick=()=>setStage(Math.min(4,stage+1));
$('reveal').onclick=()=>{revealed=!revealed;lesson();};
 document.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>setStage(Number(b.dataset.stage)));
$('teacher-guide-open').onclick=()=>{stop();$('teacher-guide').showModal();};$('teacher-guide-close').onclick=()=>$('teacher-guide').close();
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('pagehide',stop);update();
})();
