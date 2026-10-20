(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const canvas=$('scene'),ctx=canvas.getContext('2d');
  const background=document.createElement('canvas'),backgroundContext=background.getContext('2d');
  let backgroundKey='';
  const TAU=Math.PI*2, lower=x=>x*x,upper=x=>Math.sqrt(x),side=x=>upper(x)-lower(x);
  const shapes={
    square:{name:'square',dimension:'Side length',factor:1,area:'s²',multiplier:'',exact:'9 / 70',note:'The square’s height equals its side length.'},
    triangle:{name:'equilateral triangle',dimension:'Side length',factor:Math.sqrt(3)/4,area:'(√3 / 4)s²',multiplier:'(√3 / 4)',exact:'9√3 / 280',note:'Height = (√3 / 2)s. Area = ½ × base × height.'},
    diameter:{name:'circle',dimension:'Diameter',factor:Math.PI/4,area:'π(s / 2)² = (π / 4)s²',multiplier:'(π / 4)',exact:'9π / 280',note:'Radius = s / 2. The centre is the segment’s midpoint; the circle extends above and below z = 0.'},
    radius:{name:'circle',dimension:'Radius',factor:Math.PI,area:'πs²',multiplier:'π',exact:'9π / 70',note:'Radius = s. The centre is on y = x²; the full circle extends beyond the base region and both sides of z = 0.'}
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
    const [x,y,z]=[point[0]-.5,point[1]-.48,point[2]-(state.shape==='square'?.14:state.shape==='triangle'?.10:0)];
    const ca=Math.cos(state.azimuth),sa=Math.sin(state.azimuth),ce=Math.cos(state.elevation),se=Math.sin(state.elevation);
    const horizontal=ca*x-sa*y,depth=sa*x+ca*y;
    return [horizontal,ce*z-se*depth,ce*depth+se*z];
  }
  function project(point){const p=cameraPoint(point),scale=Math.min(width*.69,height*.69)*state.zoom;return [width/2+p[0]*scale,height*.52-p[1]*scale,p[2]];}
  function path(points,close=false){ctx.beginPath();points.forEach((p,i)=>{const q=project(p);if(i===0)ctx.moveTo(q[0],q[1]);else ctx.lineTo(q[0],q[1]);});if(close)ctx.closePath();}
  function line(points,color,width=1,dashed=false){path(points);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dashed?[5,5]:[]);ctx.stroke();ctx.setLineDash([]);}
  function polygon(points,fill,stroke=null,lineWidth=1){path(points,true);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lineWidth;ctx.stroke();}}
  function text(point,label,color=palette.ink,size=13,dx=0,dy=0){const p=project(point);ctx.font=`${size}px "Cambria Math", Georgia, serif`;ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,p[0]+dx,p[1]+dy);}
  function dot(point,color,r=4){const p=project(point);ctx.beginPath();ctx.arc(p[0],p[1],r,0,TAU);ctx.fillStyle=color;ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();}
  function grid(){
    for(let t=0;t<1.201;t+=.2){line([[t,0,0],[t,1.2,0]],'rgba(179,193,208,.24)');line([[0,t,0],[1.2,t,0]],'rgba(179,193,208,.24)');}
    line([[-.1,0,0],[1.25,0,0]],'#a6b3c2',1.2);line([[0,-.1,0],[0,1.25,0]],'#a6b3c2',1.2);
    if(state.stage>=2)line([[0,0,state.shape==='diameter'||state.shape==='radius'?-.55:0],[0,0,.72]],'#b9c4d1',1,true);
    text([1.3,0,0],'x','#7c8b9e',15);text([0,1.3,0],'y','#7c8b9e',15);if(state.stage>=2)text([0,0,.79],'z','#8794a5',14);
    text([0,0,0],'0','#95a1b0',11,-12,11);text([1,0,0],'1','#95a1b0',11,0,15);text([0,1,0],'1','#95a1b0',11,-12,0);
  }
  function drawRegion(){
    const points=[];for(let i=0;i<=120;i++){const x=i/120;points.push([x,upper(x),0]);}for(let i=120;i>=0;i--){const x=i/120;points.push([x,lower(x),0]);}
    polygon(points,'rgba(121,144,178,.11)');
  }
  function drawCurves(){
    const high=[],low=[];for(let i=0;i<=160;i++){const x=i/160;high.push([x,upper(x),0]);low.push([x,lower(x),0]);}
    line(high,palette.purple,2.7);line(low,palette.teal,2.7);
    dot([0,0,0],'#7687a0',3);dot([1,1,0],'#7687a0',3);
    if(state.view!=='section'){
      text([.28,upper(.28),0],'y = √x',palette.purple,15,-18,-18);
      text([.75,lower(.75),0],'y = x²',palette.teal,15,24,19);
    }
  }
  function solidFaces(){
    const count=state.shape==='square'||state.shape==='triangle'?100:80,faces=[];
    for(let i=0;i<count;i++){
      const x1=i/count*state.fill,x2=(i+1)/count*state.fill,a=section(x1),b=section(x2);
      for(let j=0;j<a.length;j++){
        const next=(j+1)%a.length,points=[a[j],b[j],b[next],a[next]];
        const depth=points.reduce((sum,p)=>sum+cameraPoint(p)[2],0)/4;
        const normalShade=state.shape==='square'?[.75,.9,1,.8][j]:.8+.18*Math.sin(j/a.length*TAU);
        faces.push({points,depth,color:`rgba(${Math.round(94*normalShade)},${Math.round(137*normalShade)},${Math.round(186*normalShade)},.22)`});
      }
    }
    if(state.fill<.999)faces.push({points:section(state.fill),depth:cameraPoint([state.fill,.5,0])[2],color:'rgba(94,137,186,.19)'});
    return faces;
  }
  function drawSolid(){
    const faces=solidFaces().sort((a,b)=>a.depth-b.depth);faces.forEach(f=>polygon(f.points,f.color));
    // Section outlines make the direction of stacking readable without hiding the surface.
    for(let i=1;i<16;i++){
      const x=i/16*state.fill;line([...section(x),section(x)[0]],'rgba(73,112,161,.16)',.8);
    }
    if(state.shape==='square'||state.shape==='triangle'){
      for(let j=0;j<section(.5).length;j++){const edge=[];for(let i=0;i<=100;i++)edge.push(section(i/100*state.fill)[j]);line(edge,'rgba(75,111,155,.38)',1);}
    }
  }
  function drawSlice(){
    const x=state.x,y=lower(x),s=side(x),points=section(x).map(p=>[p[0],p[1],p[2]*state.sectionProgress]);
    if(state.stage===4&&x<.975){
      const thickness=.025,back=section(x+thickness);
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
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
    const key=[width,height,dpr,state.shape,state.stage>=2,state.stage>=3,state.fill,state.azimuth,state.elevation,state.zoom,state.view].join('|');
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
    $('position').value=Math.round(state.x*1000);$('position-value').textContent=`x = ${state.x.toFixed(2)}`;
    $('length-value').textContent=s.toFixed(4);$('area-value').textContent=(def.factor*s*s).toFixed(4);
  }
  function update(){
    const def=shapes[state.shape],factor=def.multiplier?`${def.multiplier} `:'';
    $('length-label').textContent=def.dimension;$('shape-note').textContent=def.note;
    $('construct-label').textContent='Section';
    const titles=['The base region','Measure the segment',`Build the ${def.name}`,'A solid made of cross-sections','From cross-sections to volume'];
    const subtitles=['Two curves, one enclosed region.','A length, before it becomes an area.','Turn the view to see the shape clearly.','Same shape. Changing size.','The integral adds the areas of the slices.'];
    $('scene-title').textContent=titles[state.stage];$('scene-subtitle').textContent=subtitles[state.stage];
    $('explanation-title').textContent=messages[state.stage][0];
    let message=messages[state.stage][1];
    if(state.stage===2){
      message=state.shape==='square'?'Build a square on the segment. Both its width and height are s.':state.shape==='triangle'?'Build an equilateral triangle on the segment. Its height is (√3 / 2)s.':state.shape==='diameter'?'Use the segment as the diameter. The centre is its midpoint, so the radius is s / 2. The circle extends on both sides of the base plane.':'Use the segment as a radius. The centre is its lower endpoint, and the other endpoint lies on the circumference. The full circle extends beyond the base region.';
      message+=`<div class="math-line">A(x) = ${def.area}</div>`;
    }
    $('explanation-content').innerHTML='<p>'+message.replace('<div','</p><div')+(message.includes('<div')?'':'</p>');
    $('volume-panel').dataset.revealed=String(state.stage===4);$('volume-working').setAttribute('aria-hidden',String(state.stage!==4));$('working-placeholder').setAttribute('aria-hidden',String(state.stage===4));$('solid-key').style.visibility=state.stage<3?'hidden':'visible';$('solid-key').hidden=false;
    $('area-formula').textContent=`A(x) = ${factor}(√x − x²)²`;
    $('integral-formula').textContent=`V = ${factor}∫₀¹ (√x − x²)² dx`;
    $('expanded-formula').innerHTML=`= ${factor}∫₀¹ (x − 2x<sup>5/2</sup> + x⁴) dx`;
    $('antiderivative-formula').innerHTML=`= ${factor}[x²/2 − 4x<sup>7/2</sup>/7 + x⁵/5]₀¹`;
    $('evaluation-formula').textContent=`= ${factor}(1/2 − 4/7 + 1/5) = ${factor}(9/70)`;
    $('volume-exact').textContent=def.exact;$('volume-decimal').textContent=`≈ ${(def.factor*9/70).toFixed(5)} cubic units`;
    document.querySelectorAll('[data-shape]').forEach(b=>{const active=b.dataset.shape===state.shape;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',active);});
    document.querySelectorAll('[data-stage]').forEach(b=>{const active=+b.dataset.stage===state.stage;b.classList.toggle('current',active);b.setAttribute('aria-pressed',active);});
    const next=['Show the segment','Build the cross-section','Reveal the solid','Connect to the integral','Back to the region'];
    $('next').innerHTML=`${next[state.stage]} <span>→</span>`;
    updateMeasurements();dirty=true;
  }
  function stage(n){state.stage=n;build=null;construction=null;state.fill=1;state.sectionProgress=1;if(n===2&&!reduced){state.sectionProgress=0;construction={start:performance.now(),duration:850};}if(n===3&&!reduced){state.fill=.001;build={start:performance.now(),duration:1600};}if(n>=1&&(state.x<.01||state.x>.99))state.x=.5;update();}
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
  $('next').addEventListener('click',()=>stage((state.stage+1)%5));
  $('position').addEventListener('input',e=>{state.x=+e.target.value/1000;if(state.stage<1)stage(1);updateMeasurements();dirty=true;});
  function play(active){state.playing=active;$('play').textContent=active?'Ⅱ':'▶';$('play').setAttribute('aria-pressed',active);$('play').setAttribute('aria-label',active?'Pause cross-section animation':'Animate the cross-section');}
  $('play').addEventListener('click',()=>{if(state.stage<2)stage(2);play(!state.playing);});
  $('spin').addEventListener('click',()=>{state.spin=!state.spin;animation=null;$('spin').setAttribute('aria-pressed',state.spin);state.view='custom';document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'));dirty=true;});
  $('reset').addEventListener('click',()=>{play(false);view('perspective');});
  $('teacher-help').addEventListener('click',()=>{const open=$('teacher-notes').hidden;$('teacher-notes').hidden=!open;$('teacher-help').setAttribute('aria-expanded',open);});
  canvas.addEventListener('pointerdown',e=>{manualView();drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!drag)return;state.azimuth+=(e.clientX-drag.x)*.008;state.elevation=clamp(state.elevation+(e.clientY-drag.y)*.006,-1.45,1.55);drag={x:e.clientX,y:e.clientY};dirty=true;});
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
      if(state.playing){state.x+=dt*.115;if(state.x>1)state.x=0;updateMeasurements();dirty=true;}
      if(state.spin){state.azimuth+=dt*.17;dirty=true;}
      if(dirty)render();
    }
    frame=requestAnimationFrame(tick);
  }
  // Exposed geometry is useful for mathematical checks and future base-region examples.
  window.crossSectionExplorer={section,side,shapes,state,stage,view,volume:shape=>shapes[shape].factor*9/70};
  update();resize();frame=requestAnimationFrame(tick);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(frame));
  window.addEventListener('pageshow',()=>{lastTime=performance.now();cancelAnimationFrame(frame);frame=requestAnimationFrame(tick);});
})();
