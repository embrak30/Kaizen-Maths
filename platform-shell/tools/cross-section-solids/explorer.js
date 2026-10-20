(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const canvas=$('scene'),ctx=canvas.getContext('2d');
  const background=document.createElement('canvas'),backgroundContext=background.getContext('2d');
  let backgroundKey='';
  const Functions=window.CrossSectionFunctions;
  let model=Functions.create('sqrt(x)','x^2','0','1'),revision=0,focus='all';
  const TAU=Math.PI*2, lower=x=>model.lower(x),upper=x=>model.upper(x),side=x=>model.side(x);
  const fmt=x=>{
    if(Math.abs(x)<1e-9)return '0';
    for(const d of [1,2,3,4,6,8,12]){const n=Math.round(x/Math.PI*d);if(n&&Math.abs(x-n*Math.PI/d)<1e-7)return `${n<0?'−':''}${Math.abs(n)===1?'':Math.abs(n)}π${d===1?'':'/'+d}`;}
    return Number(x.toPrecision(5)).toString();
  };
  const expression=s=>({'sqrt(x)':'√x','x^2':'x²','x^3':'x³','x^4':'x⁴','1-x^2':'1 − x²','sin(x)':'sin(x)','sin(2x)':'sin(2x)','cos(x)':'cos(x)'}[s]||s);
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pieces=()=>focus==='all'?model.pieces:[model.pieces[+focus]];
  const domain=()=>focus==='all'?[model.a,model.b]:[pieces()[0].a,pieces()[0].b];
  const colors=['83,125,198','34,160,143','165,102,194','213,151,54'];
  function fit(){
    const pts=[];for(let i=0;i<=120;i++)pts.push(...section(model.a+(model.b-model.a)*i/120));
    const mins=[0,1,2].map(k=>Math.min(...pts.map(p=>p[k]))),maxs=[0,1,2].map(k=>Math.max(...pts.map(p=>p[k])));
    return {extent:mins.map((v,k)=>maxs[k]-v),center:mins.map((v,k)=>(v+maxs[k])/2),span:Math.max(...mins.map((v,k)=>maxs[k]-v),.01)};
  }
  let bounds,projectionScale=1;
  const shapes={
    square:{name:'square',dimension:'Side length',factor:1,area:'s²',multiplier:'',exact:'9 / 70',note:'The square’s height equals its side length.'},
    triangle:{name:'equilateral triangle',dimension:'Side length',factor:Math.sqrt(3)/4,area:'(√3 / 4)s²',multiplier:'(√3 / 4)',exact:'9√3 / 280',note:'Height = (√3 / 2)s. Area = ½ × base × height.'},
    diameter:{name:'circle',dimension:'Diameter',factor:Math.PI/4,area:'π(s / 2)² = (π / 4)s²',multiplier:'(π / 4)',exact:'9π / 280',note:'Radius = s / 2. The centre is the segment’s midpoint; the circle extends above and below z = 0.'},
    radius:{name:'circle',dimension:'Radius',factor:Math.PI,area:'πs²',multiplier:'π',exact:'9π / 70',note:'Radius = s. The centre is on the lower curve; the full circle extends beyond the base region and both sides of z = 0.'}
  };
  const state={shape:'square',stage:0,x:.5,azimuth:-.85,elevation:.57,zoom:1,playing:false,spin:false,fill:1,sectionProgress:1,view:'perspective'};
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width=800,height=560,dpr=1,dirty=true,lastTime=0,frame=0,drag=null,animation=null,build=null,construction=null;
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const ease=t=>1-Math.pow(1-t,3);
  const lerp=(a,b,t)=>a+(b-a)*t;
  const palette={purple:'#7256d8',teal:'#15968d',orange:'#df783b',ink:'#536983'};
  function section(x,shape=state.shape){
    const y=lower(x),s=side(x);
    if(shape==='square')return [[x,y,0],[x,y+s,0],[x,y+s,s],[x,y,s]];
    if(shape==='triangle')return [[x,y,0],[x,y+s,0],[x,y+s/2,s*Math.sqrt(3)/2]];
    const r=shape==='diameter'?s/2:s,center=shape==='diameter'?y+s/2:y;
    return Array.from({length:64},(_,i)=>{const angle=TAU*i/64;return [x,center+r*Math.cos(angle),r*Math.sin(angle)];});
  }
  function cameraPoint(point){
    const s=side(state.x),y0=lower(state.x);
    const center=state.view==='section'?[state.x,state.shape==='radius'?y0:y0+s/2,state.shape==='square'?s/2:state.shape==='triangle'?s*Math.sqrt(3)/4:0]:bounds.center;
    const [x,y,z]=point.map((v,k)=>v-center[k]);
    const ca=Math.cos(state.azimuth),sa=Math.sin(state.azimuth),ce=Math.cos(state.elevation),se=Math.sin(state.elevation);
    const horizontal=ca*x-sa*y,depth=sa*x+ca*y;
    // Positive y points upwards in the base-plane view; positive z rises in perspective.
    return [horizontal,ce*z+se*depth,ce*depth-se*z];
  }
  function scaleForView(){
    if(state.view==='section')return Math.min(width*.76,height*.76)*state.zoom/Math.max(model.maxGap*(state.shape==='radius'?2:1),.01);
    const [dx,dy,dz]=bounds.extent,ca=Math.abs(Math.cos(state.azimuth)),sa=Math.abs(Math.sin(state.azimuth)),ce=Math.abs(Math.cos(state.elevation)),se=Math.abs(Math.sin(state.elevation));
    return Math.min(width*.82/Math.max(ca*dx+sa*dy,.01),height*.76/Math.max(ce*dz+se*(sa*dx+ca*dy),.01))*state.zoom;
  }
  function project(point){const p=cameraPoint(point);return [width/2+p[0]*projectionScale,height*.5-p[1]*projectionScale,p[2]];}
  function path(points,close=false){ctx.beginPath();points.forEach((p,i)=>{const q=project(p);if(i===0)ctx.moveTo(q[0],q[1]);else ctx.lineTo(q[0],q[1]);});if(close)ctx.closePath();}
  function line(points,color,width=1,dashed=false){path(points);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dashed?[5,5]:[]);ctx.stroke();ctx.setLineDash([]);}
  function polygon(points,fill,stroke=null,lineWidth=1){path(points,true);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lineWidth;ctx.stroke();}}
  function text(point,label,color=palette.ink,size=13,dx=0,dy=0){const p=project(point);ctx.font=`${size}px "Cambria Math", Georgia, serif`;ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,p[0]+dx,p[1]+dy);}
  function dot(point,color,r=4){const p=project(point);ctx.beginPath();ctx.arc(p[0],p[1],r,0,TAU);ctx.fillStyle=color;ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();}
  function grid(){
    const lo=model.a,hi=model.b,ylo=model.min,yhi=model.max;
    for(let i=0;i<=5;i++){const x=lerp(lo,hi,i/5),y=lerp(ylo,yhi,i/5);line([[x,ylo,0],[x,yhi,0]],'rgba(179,193,208,.24)');line([[lo,y,0],[hi,y,0]],'rgba(179,193,208,.24)');}
    const axisY=clamp(0,ylo,yhi),axisX=clamp(0,lo,hi);
    line([[lo,axisY,0],[hi,axisY,0]],'#a6b3c2');line([[axisX,ylo,0],[axisX,yhi,0]],'#a6b3c2');
    text([hi,axisY,0],'x',palette.ink,14,17,0);text([axisX,yhi,0],'y',palette.ink,14,-15,-12);
    text([lo,axisY,0],fmt(lo),palette.ink,11,0,17);text([hi,axisY,0],fmt(hi),palette.ink,11,0,17);
  }
  function drawRegion(){pieces().forEach(p=>{const pts=[];for(let i=0;i<=100;i++){const x=lerp(p.a,p.b,i/100);pts.push([x,upper(x),0]);}for(let i=100;i>=0;i--){const x=lerp(p.a,p.b,i/100);pts.push([x,lower(x),0]);}polygon(pts,`rgba(${colors[p.index%4]},.18)`);});}
  function drawCurves(){
    const one=[],two=[];for(let i=0;i<=320;i++){const x=lerp(model.a,model.b,i/320);one.push([x,model.f1(x),0]);two.push([x,model.f2(x),0]);}
    line(one,palette.purple,2.7);line(two,palette.teal,2.7);
    model.roots.forEach(x=>{dot([x,model.f1(x),0],'#7687a0',3);if(state.view!=='section')text([x,model.f1(x),0],`x = ${fmt(x)}`,palette.ink,12,0,19);});
  }
  function solidFaces(){
    const faces=[],[a,b]=domain(),end=lerp(a,b,state.fill);
    pieces().forEach(p=>{const stop=Math.min(p.b,end);if(stop<=p.a)return;
      for(let i=0;i<64;i++){const x1=lerp(p.a,stop,i/64),x2=lerp(p.a,stop,(i+1)/64),a=section(x1),b=section(x2);
        for(let j=0;j<a.length;j++){const next=(j+1)%a.length,points=[a[j],b[j],b[next],a[next]];faces.push({points,depth:points.reduce((v,q)=>v+cameraPoint(q)[2],0)/4,color:`rgba(${colors[p.index%4]},.22)`});}}
      [p.a,stop].forEach(x=>{const points=section(x);faces.push({points,depth:cameraPoint(points[0])[2],color:`rgba(${colors[p.index%4]},.2)`});});
    });return faces;
  }
  function drawSolid(){
    solidFaces().sort((a,b)=>a.depth-b.depth).forEach(f=>polygon(f.points,f.color));
    const [a,b]=domain(),end=lerp(a,b,state.fill);
    pieces().forEach(p=>{const stop=Math.min(p.b,end);if(stop<=p.a)return;for(let i=1;i<12;i++){const pts=section(lerp(p.a,stop,i/12));line([...pts,pts[0]],`rgba(${colors[p.index%4]},.3)`,.8);}});
  }
  function drawSlice(){
    const x=state.x,y=lower(x),s=side(x),points=section(x).map(p=>[p[0],p[1],p[2]*state.sectionProgress]);
    if(state.stage===4&&x<domain()[1]-(domain()[1]-domain()[0])*.025){
      const thickness=(domain()[1]-domain()[0])*.025,back=section(x+thickness);
      for(let j=0;j<points.length;j++){
        const next=(j+1)%points.length;
        polygon([points[j],back[j],back[next],points[next]],'rgba(224,136,61,.19)');
      }
      line([...back,back[0]],'rgba(208,124,58,.55)',1.2);
      line([[x,0,0],[x+thickness,0,0]],palette.orange,3);
      text([x+thickness/2,0,0],'Δx',palette.orange,14,5,43);
    }
    if(state.stage>=2){
      polygon(points,'rgba(237,157,89,.28)');line([...points,points[0]],palette.orange,2.3);
      if(state.shape==='square'){
        const k=Math.min(.035,s*.15);line([[x,y+s-k,0],[x,y+s-k,k],[x,y+s,k]],'rgba(184,101,48,.6)',1);
        if(s>.05)text([x,y+s,s/2],'s',palette.orange,17,13,0);
      }
      if(state.shape==='triangle'&&s>.05){line([[x,y+s/2,0],[x,y+s/2,s*Math.sqrt(3)/2]],'rgba(188,112,58,.5)',1,true);}
      if((state.shape==='radius'||state.shape==='diameter')&&s>.01)dot([x,state.shape==='radius'?y:y+s/2,0],palette.orange,3);
    }
    // The original segment always stays in the z = 0 base plane.
    line([[x,y,0],[x,y+s,0]],palette.orange,4);
    dot([x,y,0],palette.orange,4);dot([x,y+s,0],palette.orange,4);
    if(s>.04)text([x,y+s/2,0],state.shape==='diameter'?'d = s':state.shape==='radius'?'r = s':'s',palette.orange,16,-18,-10);
    if(state.view!=='section'){
      line([[x,0,0],[x,y,0]],'rgba(192,130,87,.45)',1,true);text([x,0,0],`x = ${x.toFixed(2)}`,'#9a795f',12,0,25);
    }
    if(s<.008){ctx.fillStyle='#7d8c9e';ctx.font='12px "Segoe UI", sans-serif';ctx.textAlign='center';ctx.fillText('At the intersection, the cross-section has zero area.',width/2,height-63);}
  }
  function render(){
    projectionScale=scaleForView();
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
    const key=[width,height,dpr,state.shape,state.stage>=2,state.stage>=3,state.fill,state.azimuth,state.elevation,state.zoom,state.view,state.view==='section'?state.x:0,revision,focus].join('|');
    if(key!==backgroundKey){
      grid();drawRegion();if(state.stage>=3)drawSolid();drawCurves();
      background.width=canvas.width;background.height=canvas.height;
      backgroundContext.clearRect(0,0,background.width,background.height);
      backgroundContext.drawImage(canvas,0,0);backgroundKey=key;
    }else ctx.drawImage(background,0,0,width,height);
    if(state.stage>=1)drawSlice();dirty=false;
  }
  const messages=[
    ['THE REGION','The curves meet at <strong>(0, 0)</strong> and <strong>(1, 1)</strong>. Between them, √x is above x². This shaded region is the base of our solid.'],
    ['THE SEGMENT','Fix a value of x. Draw a segment from the lower curve to the upper curve. Its length is <strong>upper − lower</strong>.<div class="math-line">s(x) = √x − x²</div>'],
    ['THE CROSS-SECTION',''],
    ['THE SOLID','Move the cross-section along the x-axis. Its size changes, but its shape stays the same. The blue surface joins these sections to reveal the solid.'],
    ['THE VOLUME','Each thin slice contributes <strong>A(x) Δx</strong>. Add the contributions from x = 0 to x = 1. As Δx tends to zero, the sum becomes a definite integral.']
  ];
  function updateMeasurements(){
    const def=shapes[state.shape],s=side(state.x);
    const [a,b]=domain();$('position').value=Math.round((state.x-a)/(b-a)*1000);$('position-value').textContent=`x = ${state.x.toFixed(2)}`;
    $('length-value').textContent=s.toFixed(4);$('area-value').textContent=(def.factor*s*s).toFixed(4);
    const first=model.f1(state.x)>=model.f2(state.x);$('curve-order').textContent=s<1e-8?'The curves meet here: s = 0.':`${first?'f₁':'f₂'} is above ${first?'f₂':'f₁'} here.`;
    $('segment-formula').textContent=`s = (${expression(first?model.f1Input:model.f2Input)}) − (${expression(first?model.f2Input:model.f1Input)})`;
  }
  function update(){
    bounds=fit();
    const def=shapes[state.shape],factor=def.multiplier?`${def.multiplier} `:'';
    $('length-label').textContent=def.dimension;$('shape-note').textContent=def.note;$('shape-note').setAttribute('title',def.note);
    $('construct-label').textContent='Section';
    const titles=['The base region','Measure the segment',`Build the ${def.name}`,'A solid made of cross-sections','From cross-sections to volume'];
    const subtitles=['Two curves, one enclosed region.','A length, before it becomes an area.','Turn the view to see the shape clearly.','Same shape. Changing size.','The integral adds the areas of the slices.'];
    $('scene-title').textContent=titles[state.stage];$('scene-subtitle').textContent=subtitles[state.stage];
    $('explanation-title').textContent=messages[state.stage][0];
    let message=messages[state.stage][1];
    if(state.stage===0)message=`${model.pieces.length} region${model.pieces.length===1?'':'s'} on the chosen interval. Each intersection separates pieces; compare the purple f₁ and teal f₂ curves in each piece.`;
    if(state.stage===1)message='At this x, identify the upper curve. Subtract the lower curve to obtain a positive segment length. When the curves cross, their order swaps.';
    if(state.stage===3)message='Stack the sections along x. Each coloured piece comes from one base region. At an intersection, the segment and section shrink to zero.';
    if(state.stage===4)message='Split the integral at each intersection. Write upper minus lower separately on each interval, square the length, then add the volumes.';
    if(state.stage===2){
      message=state.shape==='square'?'Build a square on the segment. Both its width and height are s.':state.shape==='triangle'?'Build an equilateral triangle on the segment. Its height is (√3 / 2)s.':state.shape==='diameter'?'Use the segment as the diameter. The centre is its midpoint, so the radius is s / 2. The circle extends on both sides of the base plane.':'Use the segment as a radius. The centre is its lower endpoint, and the other endpoint lies on the circumference. The full circle extends beyond the base region.';
      message+=`<div class="math-line">A(x) = ${def.area}</div>`;
    }
    $('explanation-content').innerHTML='<p>'+message.replace('<div','</p><div')+(message.includes('<div')?'':'</p>');
    $('volume-panel').dataset.revealed=String(state.stage===4);$('volume-working').setAttribute('aria-hidden',String(state.stage!==4));$('working-placeholder').setAttribute('aria-hidden',String(state.stage===4));$('solid-key').style.visibility=state.stage<3?'hidden':'visible';$('solid-key').hidden=false;
    $('area-formula').textContent=`A(x) = ${factor}(√x − x²)²`;
    const integral='<span class="bounded-integral" role="math" aria-label="integral from zero to one"><span class="integral-glyph" aria-hidden="true">∫</span><span class="upper-limit" aria-hidden="true">1</span><span class="lower-limit" aria-hidden="true">0</span></span>';
    $('integral-formula').innerHTML=`V = ${factor}${integral} (√x − x²)² dx`;
    $('expanded-formula').innerHTML=`= ${factor}${integral} (x − 2x<sup>5/2</sup> + x⁴) dx`;
    $('antiderivative-formula').innerHTML=`= ${factor}[x²/2 − 4x<sup>7/2</sup>/7 + x⁵/5]<span class="evaluation-limits" aria-label="evaluated from zero to one"><span>1</span><span>0</span></span>`;
    $('evaluation-formula').textContent=`= ${factor}(1/2 − 4/7 + 1/5) = ${factor}(9/70)`;
    $('volume-exact').textContent=def.exact;$('volume-decimal').textContent=`≈ ${(def.factor*9/70).toFixed(5)} cubic units`;
    $('legend-one').textContent=`f₁ = ${expression(model.f1Input)}`;$('legend-two').textContent=`f₂ = ${expression(model.f2Input)}`;
    $('setup').textContent=`Base: f₁(x) = ${model.f1Input}, f₂(x) = ${model.f2Input}; ${fmt(model.a)} ≤ x ≤ ${fmt(model.b)}. Sections are perpendicular to x.`;
    const [a,b]=domain();$('range-start').textContent=`x = ${fmt(a)}`;$('range-end').textContent=`x = ${fmt(b)}`;
    if(model.preset!=='original'){
      const selected=pieces(),base=selected.reduce((v,p)=>v+p.baseVolume,0),value=base*def.factor;
      $('area-formula').textContent=`A(x) = ${factor}|${expression(model.f1Input)} − (${expression(model.f2Input)})|²`;
      $('integral-formula').textContent='V = '+selected.map(p=>`V${p.index+1}`).join(' + ');
      $('expanded-formula').dataset.many=String(selected.length>4);
      $('expanded-formula').innerHTML=selected.map(p=>`<div class="piece-integral" style="border-color:rgb(${colors[p.index%4]})">V${p.index+1} = ${factor}<span class="bounded-integral"><span class="integral-glyph">∫</span><span class="upper-limit">${fmt(p.b)}</span><span class="lower-limit">${fmt(p.a)}</span></span> ((${escape(expression(p.upper===1?model.f1Input:model.f2Input))}) − (${escape(expression(p.lower===1?model.f1Input:model.f2Input))}))² dx<small>V${p.index+1} ≈ ${(p.baseVolume*def.factor).toFixed(5)}</small></div>`).join('');
      $('antiderivative-formula').textContent='V ≈ '+selected.map(p=>(p.baseVolume*def.factor).toFixed(5)).join(' + ');
      $('evaluation-formula').textContent=`= ${value.toFixed(5)} cubic units`;
      const exactBases={crossing:focus==='all'?'16/105':'8/105',sine:focus==='all'?'π':'π/2',waves:focus==='all'?'π':'π/4',touching:focus==='all'?'2/5':'1/5'};
      $('volume-answer-label').textContent=exactBases[model.preset]?'EXACT VOLUME':'NUMERICAL VOLUME';
      $('volume-exact').textContent=exactBases[model.preset]?`${factor}(${exactBases[model.preset]})`:`≈ ${value.toFixed(5)}`;
      $('volume-decimal').textContent=`≈ ${value.toFixed(5)} cubic units`;
    }else $('volume-answer-label').textContent='EXACT VOLUME';
    document.querySelectorAll('[data-shape]').forEach(b=>{const active=b.dataset.shape===state.shape;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',active);});
    document.querySelectorAll('[data-stage]').forEach(b=>{const active=+b.dataset.stage===state.stage;b.classList.toggle('current',active);b.setAttribute('aria-pressed',active);const help=['Identify intersections and the regions between the two curves.','At each x, measure upper curve minus lower curve. The order can change at an intersection.','Build the chosen shape on the segment. Use Face-on to see its dimensions.','Stack the cross-sections along x to build each coloured piece.','Split at intersections, integrate each area, and add the positive volumes.'][+b.dataset.stage];b.setAttribute('title',help);b.setAttribute('data-help',help);});
    const next=['Show the segment','Build the cross-section','Reveal the solid','Connect to the integral','Back to the region'];
    $('next').innerHTML=`${next[state.stage]} <span>→</span>`;
    updateMeasurements();dirty=true;
  }
  function stage(n){state.stage=n;build=null;construction=null;state.fill=1;state.sectionProgress=1;if(n===2&&!reduced){state.sectionProgress=0;construction={start:performance.now(),duration:850};}if(n===3&&!reduced){state.fill=.001;build={start:performance.now(),duration:1600};}if(n>=1&&side(state.x)<1e-8){const p=pieces()[0];state.x=(p.a+p.b)/2;}update();}
  function view(name){
    if(name==='section'&&state.stage<2)stage(2);
    const target=name==='top'?{azimuth:0,elevation:Math.PI/2,zoom:1.03}:name==='section'?{azimuth:Math.PI/2,elevation:0,zoom:1.08}:{azimuth:-.85,elevation:.57,zoom:1};
    state.view=name;state.spin=false;$('spin').setAttribute('aria-pressed','false');
    if(reduced)Object.assign(state,target);else animation={from:{azimuth:state.azimuth,elevation:state.elevation,zoom:state.zoom},target,start:performance.now(),duration:650};
    document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name));dirty=true;
  }
  function manualView(){animation=null;state.view='custom';state.spin=false;$('spin').setAttribute('aria-pressed','false');document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'));dirty=true;}
  document.querySelectorAll('[data-shape]').forEach(b=>b.addEventListener('click',()=>{state.shape=b.dataset.shape;state.fill=1;build=null;if(state.stage<2)state.stage=2;state.sectionProgress=1;construction=null;if(state.stage===2&&!reduced){state.sectionProgress=0;construction={start:performance.now(),duration:850};}update();}));
  document.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>stage(+b.dataset.stage)));
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>view(b.dataset.view)));
  function describeRegions(){
    $('intersection-list').textContent=model.roots.length?`Intersections: x ≈ ${model.roots.map(fmt).join(', ')} (approx. where needed)`:'No intersections inside the interval; endpoints bound the region.';
    $('region-focus').innerHTML='<option value="all">All regions · total volume</option>'+model.pieces.map(p=>`<option value="${p.index}">Region ${p.index+1}: ${fmt(p.a)} to ${fmt(p.b)}</option>`).join('');
    $('region-list').innerHTML=model.pieces.map(p=>`<p style="border-left:4px solid rgb(${colors[p.index%4]})"><strong>Region ${p.index+1}</strong> · ${fmt(p.a)} ≤ x ≤ ${fmt(p.b)}<br>Upper: f${p.upper===1?'₁':'₂'} · lower: f${p.lower===1?'₁':'₂'}<br><small>s = (${escape(expression(p.upper===1?model.f1Input:model.f2Input))}) − (${escape(expression(p.lower===1?model.f1Input:model.f2Input))})</small></p>`).join('');
  }
  function applyFunctions(f1,f2,a,b){try{
    const next=Functions.create(f1,f2,a,b);
    model=next;revision++;focus='all';state.x=(model.pieces[0].a+model.pieces[0].b)/2;state.fill=1;build=null;play(false);$('function-error').hidden=true;
    $('auto-range').textContent=`Automatic range: ${fmt(model.a)} ≤ x ≤ ${fmt(model.b)}`;
    describeRegions();update();
  }catch(error){$('function-error').textContent=error.message;$('function-error').hidden=false;}}
  function chooseFunctions(){
    const f1=$('function-one').value,f2=$('function-two').value;
    if(f1===f2){$('function-error').textContent='Choose two different functions to create a region.';$('function-error').hidden=false;$('function-one').value=model.f1Input;$('function-two').value=model.f2Input;return;}
    const squareRoot=[f1,f2].includes('sqrt(x)'),trig=[f1,f2].some(f=>/sin|cos/.test(f));
    $('example').value='chosen';applyFunctions(f1,f2,squareRoot?'0':trig?'-pi':'-1',squareRoot?'1':trig?'pi':'1');
  }
  $('function-form').addEventListener('submit',e=>e.preventDefault());
  ['function-one','function-two'].forEach(id=>$(id).addEventListener('change',chooseFunctions));
  $('example').addEventListener('change',()=>{const p=Functions.presets[$('example').value];if(!p)return;$('function-one').value=p.f1;$('function-two').value=p.f2;applyFunctions(p.f1,p.f2,p.a,p.b);});
  $('region-focus').addEventListener('change',()=>{focus=$('region-focus').value;const p=pieces()[0];state.x=(p.a+p.b)/2;state.fill=1;build=null;update();});
  describeRegions();
  $('next').addEventListener('click',()=>stage((state.stage+1)%5));
  $('position').addEventListener('input',e=>{state.x=lerp(...domain(),+e.target.value/1000);if(state.stage<1)stage(1);updateMeasurements();dirty=true;});
  function play(active){state.playing=active;$('play').textContent=active?'Ⅱ':'▶';$('play').setAttribute('aria-pressed',active);$('play').setAttribute('aria-label',active?'Pause cross-section animation':'Animate the cross-section');}
  $('play').addEventListener('click',()=>{if(state.stage<2)stage(2);play(!state.playing);});
  $('spin').addEventListener('click',()=>{state.spin=!state.spin;animation=null;$('spin').setAttribute('aria-pressed',state.spin);state.view='custom';document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'));dirty=true;});
  $('reset').addEventListener('click',()=>{play(false);view('perspective');});
  $('teacher-help').addEventListener('click',()=>{const open=$('teacher-notes').hidden;$('teacher-notes').hidden=!open;$('teacher-help').setAttribute('aria-expanded',open);});
  function hoverRegion(event){
    const rect=canvas.getBoundingClientRect(),px=event.clientX-rect.left,py=event.clientY-rect.top;
    let found=null;
    for(const piece of pieces()){
      const polygon=[];for(let i=0;i<=40;i++){const x=lerp(piece.a,piece.b,i/40);polygon.push(project([x,upper(x),0]));}for(let i=40;i>=0;i--){const x=lerp(piece.a,piece.b,i/40);polygon.push(project([x,lower(x),0]));}
      let inside=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const [xi,yi]=polygon[i],[xj,yj]=polygon[j];if(((yi>py)!==(yj>py))&&(px<(xj-xi)*(py-yi)/(yj-yi)+xi))inside=!inside;}
      if(inside){found=piece;break;}
    }
    const tip=$('scene-help');tip.hidden=!found;
    if(found)tip.textContent=`Region ${found.index+1}: ${fmt(found.a)} ≤ x ≤ ${fmt(found.b)}. Upper: ${expression(found.upper===1?model.f1Input:model.f2Input)}. Lower: ${expression(found.lower===1?model.f1Input:model.f2Input)}. Segment = upper − lower. ${state.stage>=2?shapes[state.shape].note:''}`;
  }
  canvas.addEventListener('pointerleave',()=>{$('scene-help').hidden=true;});
  canvas.addEventListener('pointerdown',e=>{$('scene-help').hidden=true;manualView();drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!drag){hoverRegion(e);return;}state.azimuth+=(e.clientX-drag.x)*.008;state.elevation=clamp(state.elevation+(e.clientY-drag.y)*.006,-1.45,1.55);drag={x:e.clientX,y:e.clientY};dirty=true;});
  const release=()=>{drag=null;};canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
  canvas.addEventListener('wheel',e=>{e.preventDefault();animation=null;state.zoom=clamp(state.zoom*Math.exp(-e.deltaY*.001),.55,2.5);dirty=true;},{passive:false});
  canvas.addEventListener('keydown',e=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home'].includes(e.key))return;e.preventDefault();
    if(e.key==='Home'){view('perspective');return;}manualView();
    if(e.key==='ArrowLeft')state.azimuth-=.1;if(e.key==='ArrowRight')state.azimuth+=.1;
    if(e.key==='ArrowUp')state.elevation=clamp(state.elevation+.08,-1.45,1.55);if(e.key==='ArrowDown')state.elevation=clamp(state.elevation-.08,-1.45,1.55);
    if(e.key==='+'||e.key==='=')state.zoom=clamp(state.zoom*1.1,.55,2.5);if(e.key==='-')state.zoom=clamp(state.zoom/1.1,.55,2.5);
  });
  function resize(){const rect=$('canvas-wrap').getBoundingClientRect();width=rect.width;height=rect.height;dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);dirty=true;}
  new ResizeObserver(resize).observe($('canvas-wrap'));
  function tick(now){
    const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;
    if(!document.hidden){
      if(animation){const t=clamp((now-animation.start)/animation.duration,0,1),v=ease(t);for(const k of ['azimuth','elevation','zoom'])state[k]=lerp(animation.from[k],animation.target[k],v);if(t===1)animation=null;dirty=true;}
      if(construction){const t=clamp((now-construction.start)/construction.duration,0,1);state.sectionProgress=ease(t);if(t===1)construction=null;dirty=true;}
      if(build){const t=clamp((now-build.start)/build.duration,0,1);state.fill=ease(t);if(t===1)build=null;dirty=true;}
      if(state.playing){const [a,b]=domain();state.x+=dt*.115*(b-a);if(state.x>b)state.x=a;updateMeasurements();dirty=true;}
      if(state.spin){state.azimuth+=dt*.17;dirty=true;}
      if(dirty)render();
    }
    frame=requestAnimationFrame(tick);
  }
  // Exposed geometry is useful for mathematical checks and future base-region examples.
  window.crossSectionExplorer={section,side,shapes,state,stage,view,project,volume:shape=>shapes[shape].factor*pieces().reduce((v,p)=>v+p.baseVolume,0),get model(){return model;}};
  update();resize();frame=requestAnimationFrame(tick);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(frame));
  window.addEventListener('pageshow',()=>{lastTime=performance.now();cancelAnimationFrame(frame);frame=requestAnimationFrame(tick);});
})();
