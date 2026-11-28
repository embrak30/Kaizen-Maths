(function(){
'use strict';
const M=window.KaizenRadians,$=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg',colours=['#48d2d2','#66a6ff','#cba2ff','#f5ce54'];let stage=0,radius=2,progress=1,degrees=180,running=false,frame=null,started=null,from=0;
const fraction=(a,b)=>'<span class="fraction"><span>'+a+'</span><span>'+b+'</span></span>';
function symbol(v){if(v.kind==='number')return String(v.value);if(v.kind==='approx')return '≈ '+v.value.toFixed(3);if(v.num===0)return'0';const top=(v.num===1?'':v.num)+'π';return v.den===1?top:fraction(top,v.den);}
function textSymbol(v){if(v.kind==='number')return String(v.value);if(v.kind==='approx')return'≈ '+v.value.toFixed(3);if(!v.num)return'0';const top=(v.num===1?'':v.num)+'π';return v.den===1?top:top+'/'+v.den;}
function el(tag,attrs={},value){const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(value!==undefined)n.textContent=value;return n;}
function draw(){const svg=$('circle');svg.replaceChildren();const R=125+radius*16,cx=440,cy=330,kind=M.stages[stage].kind,theta=kind==='wrap'?1:kind==='count'?Math.PI*progress:kind==='explore'?M.radians(degrees):kind==='radius'?0:Math.PI;
 svg.setAttribute('aria-label',kind==='wrap'?'A radius-length copy is moved and bent into a one-radian arc.':kind==='count'?'Radius-length arcs fill a semicircle, with a final remainder of π minus 3 radii.':'Circle of radius '+radius+' with an angle of '+(theta*180/Math.PI).toFixed(2)+' degrees.');
 const defs=el('defs'),grid=el('pattern',{id:'radian-grid',width:45,height:45,patternUnits:'userSpaceOnUse'});grid.append(el('path',{d:'M45 0H0V45',fill:'none',stroke:'#afcadd','stroke-opacity':'.055','stroke-width':1}));defs.append(grid);svg.append(defs,el('rect',{width:900,height:620,fill:'url(#radian-grid)'}));
 const add=n=>svg.append(n),line=(x1,y1,x2,y2,color,width=3,dash='')=>add(el('line',{x1,y1,x2,y2,stroke:color,'stroke-width':width,...(dash?{'stroke-dasharray':dash}:{})})),label=(v,x,y,size=28,color='#e8f1f6')=>add(el('text',{x,y,'font-size':size,fill:color,'font-weight':650},v));
 const arc=(rad,a,b,color,width=7)=>{const d=M.arcPath(cx,cy,rad,a,b);if(d)add(el('path',{d,fill:'none',stroke:color,'stroke-width':width,'stroke-linecap':'round'}));};
 add(el('circle',{cx,cy,r:R,fill:'#152538',stroke:'#bac9d7','stroke-width':3}));line(cx-R,cy,cx+R,cy,'#667d8a',2);line(cx,cy,cx+R,cy,colours[0],5);label('r',cx+R*.5,cy+29,33,colours[0]);label('O',cx-19,cy+21,22,'#b6c8d5');add(el('circle',{cx,cy,r:5,fill:colours[0]}));
 if(kind==='radius'){label('One radius',cx,70,38,colours[0]);label('Change r. The circle changes size.',cx,565,23,'#b6c9d7');}
 if(kind==='wrap'){
  arc(R,0,1,'#425867',4);const points=M.wrappedPoints(cx,cy,R,progress);add(el('path',{d:points.map(([x,y],i)=>(i?'L':'M')+x+' '+y).join(' '),fill:'none',stroke:colours[3],'stroke-width':8,'stroke-linecap':'round'}));
  label('Same length: r',cx,72,35,colours[3]);if(progress>=1-1e-9){line(cx,cy,cx+R*Math.cos(1),cy-R*Math.sin(1),'#d3e1eb',3);arc(65,0,1,colours[0],3);label('1 rad',cx+102,cy-56,29,colours[0]);label('Arc length = radius',cx,565,27,colours[3]);}else label('Move it, then bend it — keep its length.',cx,565,23,'#b6c9d7');
 }
 if(kind==='count'){
  for(const [i,chunk]of M.chunks(theta).entries())arc(R,chunk.start+.008,Math.max(chunk.start+.008,chunk.end-.008),colours[i%4],8);
  for(const t of [1,2,3])line(cx+(R-9)*Math.cos(t),cy-(R-9)*Math.sin(t),cx+(R+10)*Math.cos(t),cy-(R+10)*Math.sin(t),'#e6eef7',2);
  for(let i=0;i<3;i++)if(theta>=i+1)label('r',cx+(R+28)*Math.cos(i+.5),cy-(R+28)*Math.sin(i+.5),29,colours[i]);
  if(progress>=1-1e-9){arc(R+21,3,Math.PI,colours[3],5);label('(π − 3)r',cx-R-55,cy-37,23,colours[3]);label('3r + (π − 3)r = πr',cx,72,35,colours[3]);}else label('How many radius lengths fit?',cx,72,34,colours[3]);
 }
 if(['half','proof','explore'].includes(kind)){
  if(theta>0){const d=M.arcPath(cx,cy,70,0,theta);if(theta<M.TAU-1e-10)add(el('path',{d:'M '+cx+' '+cy+' L '+(cx+70)+' '+cy+d.slice(d.indexOf(' A'))+' L '+cx+' '+cy+' Z',fill:'#f5ce54','fill-opacity':'.10'}));arc(R,0,theta,colours[3],8);line(cx,cy,cx+R*Math.cos(theta),cy-R*Math.sin(theta),'#d0dce7',3);}
  arc(65,0,Math.min(theta,M.TAU),colours[3],3);
  if(kind==='half'||kind==='proof'){arc(R+23,0,Math.PI,'#b39435',2);label('πr',cx,72,43,colours[3]);label('180°',cx,cy+79,48,colours[3]);if(kind==='proof')label('π radians',cx,cy-98,36,colours[0]);}
  else{const degreeText=Math.abs(degrees-180/Math.PI)<1e-9?'≈ 57.3°':Number(degrees.toFixed(1))+'°';label(degreeText,cx,cy+75,43,colours[3]);label('Arc length s',cx,72,35,colours[3]);label('r = '+radius+'     s '+(M.exact(degrees,radius).kind==='approx'?'':'= ')+textSymbol(M.exact(degrees,radius)),cx,566,25,'#c3d8e2');}
 }
 $('title').textContent=M.stages[stage].title;$('prompt').textContent=M.stages[stage].prompt;$('step-label').textContent='Step '+(stage+1)+' of '+M.stages.length;$('explore').hidden=kind!=='explore';$('position').disabled=!['wrap','count'].includes(kind);$('position').value=progress;$('play').disabled=!['wrap','count','explore'].includes(kind);$('play').textContent=running?'Pause animation':progress>=1&&kind!=='explore'?'Replay animation':'Play animation';$('play').setAttribute('aria-pressed',String(running));$('back').disabled=stage===0;$('next').disabled=stage===M.stages.length-1;document.querySelectorAll('[data-stage]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.stage)===stage)));
 let html='';if(kind==='radius')html='<p>radius = r</p><small>A radian compares an arc with this length.</small>';
 if(kind==='wrap')html=progress>=1-1e-9?'<p>s = r</p><p>θ = '+fraction('s','r')+' = '+fraction('r','r')+' = 1 rad</p><small>1 rad ≈ 57.3°</small>':'<p>copy length = r</p><small>The copy keeps its length while it bends.</small>';
 if(kind==='count')html=progress>=1-1e-9?'<p>πr ≈ 3.1416r</p><small>The gold remainder is (π − 3)r, not zero.</small>':'<p>'+((theta).toFixed(2))+' radius lengths</p><small>Keep going to reach the other end of the semicircle.</small>';
 if(kind==='half')html='<p>C = 2πr</p><p>half of C = '+fraction('2πr','2')+' = πr</p>';
 if(kind==='proof')html='<p>θ = '+fraction('s','r')+' = '+fraction('πr','r')+' = π rad</p><p class="conclusion">π radians = 180°</p>';
 if(kind==='explore')html='<p>s = '+symbol(M.exact(degrees,radius))+'</p><p>θ = '+fraction('s','r')+' = '+symbol(M.exact(degrees))+' rad</p>';
 $('working').innerHTML=html;
}
function stop(){if(frame!==null)cancelAnimationFrame(frame);frame=null;running=false;started=null;}
function animate(){if(running){stop();draw();return;}if(![1,2,5].includes(stage))return;running=true;from=stage===5?degrees/360:progress;if(from>=.999)from=0;started=null;const duration=stage===1?5000:stage===2?6500:9000;
 function tick(timestamp){if(!running)return;if(started===null)started=timestamp;const value=Math.min(1,from+(timestamp-started)/duration);if(stage===5){degrees=value*360;$('angle').value=degrees.toFixed(1);$('angle-slider').value=degrees;}else progress=value;if(value>=1){running=false;frame=null;}else frame=requestAnimationFrame(tick);draw();}frame=requestAnimationFrame(tick);draw();}
function go(index){const forward=index>stage;stop();stage=M.clamp(index,0,M.stages.length-1);progress=1;if(stage===5){degrees=180;$('angle').value=180;$('angle-slider').value=180;}if(forward&&[1,2].includes(stage)&&!matchMedia('(prefers-reduced-motion: reduce)').matches){progress=0;draw();animate();}else draw();$('status').textContent='';}
M.stages.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.dataset.stage=i;b.textContent=['Radius','One radian','Count the arcs','Half the circle','π rad = 180°','Explore'][i];b.onclick=()=>go(i);$('stages').append(b);});
$('play').onclick=animate;$('position').oninput=()=>{stop();progress=Number($('position').value);draw();};$('radius').onchange=()=>{stop();radius=M.validateRadius(Number($('radius').value));draw();};$('back').onclick=()=>go(stage-1);$('next').onclick=()=>go(stage+1);$('reset').onclick=()=>go(0);
function setAngle(value){try{M.radians(value);stop();degrees=value;$('angle').value=Number(value.toFixed(8));$('angle-slider').value=value;$('status').textContent='';draw();}catch(e){$('status').textContent=e.message;}}
$('angle').onchange=()=>setAngle($('angle').value.trim()===''?NaN:Number($('angle').value));$('angle-slider').oninput=()=>setAngle(Number($('angle-slider').value));document.querySelectorAll('[data-angle]').forEach(b=>b.onclick=()=>setAngle(Number(b.dataset.angle)));document.querySelector('[data-radian]').onclick=()=>setAngle(180/Math.PI);$('guide-open').onclick=()=>{stop();draw();$('guide').showModal();};$('guide-close').onclick=()=>$('guide').close();document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();draw();}});window.addEventListener('pagehide',stop);draw();
})();
