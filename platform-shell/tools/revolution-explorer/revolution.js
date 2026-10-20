(() => {
  'use strict';
  const $=id=>document.getElementById(id),math=window.RevolutionMath;
  const canvas=$('scene'),ctx=canvas.getContext('2d'),background=document.createElement('canvas'),backgroundContext=background.getContext('2d');
  const TAU=Math.PI*2,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),ease=t=>1-(1-t)**3;
  const state={example:'root',axis:'x',stage:0,t:.6,angle:0,playing:false,spin:false,azimuth:-.85,elevation:.48,zoom:1,view:'perspective'};
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const palette={purple:'#7256d8',teal:'#15968d',orange:'#df783b',ink:'#536983'};
  let width=800,height=800,dpr=1,dirty=true,frame=0,lastTime=0,drag=null,animation=null,backgroundKey='';
  const example=()=>math.examples[state.example],theta=()=>state.angle/360*TAU;
  const point=(t,r,angle=0)=>math.point(state.axis,t,r,angle);
  const washer=()=>state.example==='washer'||state.example==='tube';
  function cameraPoint(p){
    const x=p[0]-(state.axis==='x'?.5:0),y=p[1]-(state.axis==='y'?.5:0),z=p[2];
    const ca=Math.cos(state.azimuth),sa=Math.sin(state.azimuth),ce=Math.cos(state.elevation),se=Math.sin(state.elevation),depth=sa*x+ca*y;
    return [ca*x-sa*y,ce*z-se*depth,ce*depth+se*z];
  }
  function project(p){const q=cameraPoint(p),scale=Math.min(width,height)*.365*state.zoom;return [width/2+q[0]*scale,height*.52-q[1]*scale,q[2]];}
  function path(points,close=false){ctx.beginPath();points.forEach((p,i)=>{const q=project(p);if(i===0)ctx.moveTo(q[0],q[1]);else ctx.lineTo(q[0],q[1]);});if(close)ctx.closePath();}
  function line(points,color,width=1,dashed=false){path(points);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dashed?[5,5]:[]);ctx.stroke();ctx.setLineDash([]);}
  function polygon(points,fill,stroke=null,lineWidth=1){path(points,true);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lineWidth;ctx.stroke();}}
  function text(point,label,color=palette.ink,size=13,dx=0,dy=0){const p=project(point);ctx.font=`${size}px "Cambria Math", Georgia, serif`;ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,p[0]+dx,p[1]+dy);}
  function dot(point,color,r=4){const p=project(point);ctx.beginPath();ctx.arc(p[0],p[1],r,0,TAU);ctx.fillStyle=color;ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();}
  function grid(){
    for(let v=-1;v<=1.21;v+=.2){
      if(state.axis==='x')line([[0,v,0],[1.16,v,0]],'rgba(179,193,208,.19)');
      else line([[v,0,0],[v,1.16,0]],'rgba(179,193,208,.19)');
    }
    line([[-1.18,0,0],[state.axis==='x'?1.3:1.18,0,0]],state.axis==='x'?'#3277bf':'#a6b3c2',state.axis==='x'?2.2:1);
    line([[0,-1.18,0],[0,state.axis==='y'?1.3:1.18,0]],state.axis==='y'?'#3277bf':'#a6b3c2',state.axis==='y'?2.2:1);
    if(state.stage>=2)line([[0,0,-1.13],[0,0,1.13]],'#b8c7d8',1,true);
    if(state.view!=='section'||state.axis!=='x')text([state.axis==='x'?1.4:1.28,0,0],state.axis==='x'?'x · rotation axis':'x',state.axis==='x'?'#3277bf':'#7c8b9e',13);
    if(state.view!=='section'||state.axis!=='y')text([0,state.axis==='y'?1.4:1.28,0],state.axis==='y'?'y · rotation axis':'y',state.axis==='y'?'#3277bf':'#7c8b9e',13);
    text([0,0,0],'0','#8b9cad',11,-10,12);
  }
  function regionPolygon(angle){
    const e=example(),points=[];for(let i=0;i<=80;i++)points.push(point(i/80,e.outer(i/80),angle));
    for(let i=80;i>=0;i--)points.push(point(i/80,e.inner(i/80),angle));return points;
  }
  function drawRegion(){polygon(regionPolygon(0),'rgba(125,102,193,.11)');}
  function curves(angle=0,moving=false){
    const e=example(),outer=[],inner=[];for(let i=0;i<=120;i++){outer.push(point(i/120,e.outer(i/120),angle));inner.push(point(i/120,e.inner(i/120),angle));}
    line(outer,moving?'rgba(114,86,216,.55)':palette.purple,moving?1.4:2.6);
    if(washer())line(inner,moving?'rgba(21,150,141,.55)':palette.teal,moving?1.4:2.5);
    if(!moving&&state.view!=='section'){
      const dep=state.axis==='x'?'y':'x',t=state.axis;
      text(point(.72,e.outer(.72),0),`${dep} = ${e.radius(t)}`,palette.purple,14,12,-18);
      if(washer())text(point(.57,e.inner(.57),0),`${dep} = ${e.innerRadius(t)}`,palette.teal,13,-12,18);
    }
  }
  function solidFaces(){
    const e=example(),faces=[],angle=theta();if(angle<.00001)return faces;
    const slices=36,segments=Math.max(1,Math.ceil(64*angle/TAU));
    function face(points,color){faces.push({points,color,depth:points.reduce((sum,p)=>sum+cameraPoint(p)[2],0)/points.length});}
    for(let i=0;i<slices;i++){
      const a=i/slices,b=(i+1)/slices;
      for(let j=0;j<segments;j++){
        const u=angle*j/segments,v=angle*(j+1)/segments,shade=.83+.14*Math.cos((u+v)/2);
        face([point(a,e.outer(a),u),point(b,e.outer(b),u),point(b,e.outer(b),v),point(a,e.outer(a),v)],`rgba(${Math.round(91*shade)},${Math.round(137*shade)},${Math.round(192*shade)},.19)`);
        if(washer())face([point(a,e.inner(a),u),point(a,e.inner(a),v),point(b,e.inner(b),v),point(b,e.inner(b),u)],'rgba(35,143,139,.14)');
      }
    }
    // Annular caps are tiled radially; filling a single polygon would incorrectly cover the hole.
    for(const t of [0,1])for(let j=0;j<segments;j++){
      const a=angle*j/segments,b=angle*(j+1)/segments;
      face([point(t,e.inner(t),a),point(t,e.outer(t),a),point(t,e.outer(t),b),point(t,e.inner(t),b)],'rgba(91,137,192,.15)');
    }
    if(state.angle<359.999){face(regionPolygon(0),'rgba(105,131,176,.12)');face(regionPolygon(angle),'rgba(138,111,190,.19)');}
    return faces.sort((a,b)=>a.depth-b.depth);
  }
  function drawSolid(){
    solidFaces().forEach(f=>polygon(f.points,f.color));
    for(const t of [0,.2,.4,.6,.8,1]){
      const arcs=math.section(state.example,state.axis,t,theta(),72);
      line(arcs.outer,'rgba(65,103,151,.29)',.9);if(washer())line(arcs.inner,'rgba(21,132,128,.24)',.8);
    }
    if(state.angle>0&&state.angle<359.99){polygon(regionPolygon(theta()),'rgba(152,108,196,.08)');curves(theta(),true);}
  }
  function drawSelected(){
    const e=example(),t=state.t,R=e.outer(t),r=e.inner(t),angle=state.stage>=2?theta():0;
    const section=math.section(state.example,state.axis,t,angle,96);
    if(state.stage>=2&&angle>0){
      for(let i=0;i<section.outer.length-1;i++)polygon([section.inner[i],section.outer[i],section.outer[i+1],section.inner[i+1]],'rgba(239,151,65,.32)');
      line(section.outer,palette.orange,2.6);if(r>0)line(section.inner,'#ba642d',2.3);
      if(state.stage===4){
        const back=math.section(state.example,state.axis,Math.min(1,t+.025),angle,96);
        for(let i=0;i<section.outer.length-1;i++){
          polygon([section.outer[i],back.outer[i],back.outer[i+1],section.outer[i+1]],'rgba(225,132,49,.18)');
          if(r>0)polygon([section.inner[i],back.inner[i],back.inner[i+1],section.inner[i+1]],'rgba(225,132,49,.14)');
        }
        line(back.outer,'rgba(204,115,44,.55)',1);
        if(state.view!=='section')text(point(Math.min(1,t+.0125),0),`Δ${state.axis}`,palette.orange,13,12,32);
      }
    }
    // Keep the starting strip distinct from the moving strip during a partial sweep.
    if(angle>0&&angle<TAU-.001)line([point(t,r,0),point(t,R,0)],'rgba(223,120,59,.48)',2,true);
    line([point(t,r,angle),point(t,R,angle)],palette.orange,4);
    line([point(t,0,angle),point(t,r,angle)],'#ba642d',1.5,true);
    dot(point(t,R,angle),palette.orange,3.5);if(r>0)dot(point(t,r,angle),'#ba642d',3.5);
    if(R>.035){
      // Separate dimension rays both start at the rotation axis: the orange strip itself has length R - r.
      const radiusAngle=angle>0?(angle<TAU-.001?angle*.55:.7):0;
      const innerAngle=angle>0?(angle<TAU-.001?angle*.28:1.2):0;
      line([point(t,0,radiusAngle),point(t,R,radiusAngle)],'rgba(208,108,43,.82)',1.3);
      text(point(t,R*.63,radiusAngle),'R',palette.orange,16,12,-10);
      if(r>.04){line([point(t,0,innerAngle),point(t,r,innerAngle)],'#a05d33',1.3);text(point(t,r*.6,innerAngle),'r','#a05d33',14,-12,4);}
    }
    if(state.view!=='section')text(point(t,0,0),`${state.axis} = ${t.toFixed(2)}`,'#9a795f',12,-10,19);
    if(R-r<.004){ctx.font='13px "Segoe UI", sans-serif';ctx.fillStyle='#60758d';ctx.textAlign='center';ctx.fillText('At this endpoint the strip and cross-sectional area are zero.',width/2,height-50);}
  }
  function render(){
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
    const key=[width,height,dpr,state.example,state.axis,state.stage>=2,state.stage>=3,state.angle,state.azimuth,state.elevation,state.zoom,state.view].join('|');
    if(key!==backgroundKey){
      grid();drawRegion();if(state.stage>=3)drawSolid();curves();
      background.width=canvas.width;background.height=canvas.height;backgroundContext.clearRect(0,0,background.width,background.height);backgroundContext.drawImage(canvas,0,0);backgroundKey=key;
    }else ctx.drawImage(background,0,0,width,height);
    if(state.stage>=1)drawSelected();dirty=false;
  }
  const integral='<span class="bounded-integral" role="math" aria-label="integral from zero to one"><span class="integral-glyph" aria-hidden="true">∫</span><span class="upper-limit" aria-hidden="true">1</span><span class="lower-limit" aria-hidden="true">0</span></span>';
  const limits='<span class="evaluation-limits" aria-label="evaluated from zero to one"><span>1</span><span>0</span></span>';
  function measurements(){
    const e=example();$('position').value=Math.round(state.t*1000);$('position-value').textContent=`${state.axis} = ${state.t.toFixed(2)}`;
    $('angle').value=Math.round(state.angle);$('angle-value').textContent=`${Math.round(state.angle)}°`;
    $('outer-value').textContent=e.outer(state.t).toFixed(4);$('inner-value').textContent=e.inner(state.t).toFixed(4);$('area-value').textContent=math.sectionArea(state.example,state.t).toFixed(4);
  }
  function update(){
    const e=example(),t=state.axis,dep=t==='x'?'y':'x',isWasher=washer(),d=`d${t}`;
    const titles=['The region','Select a perpendicular strip',isWasher?'A strip becomes a washer':'A strip becomes a disc','Revolve the whole region','The volume integral'];
    $('scene-title').textContent=titles[state.stage];
    $('region-description').textContent=`${e.innerRadius(t)} ≤ ${dep} ≤ ${e.radius(t)}, for 0 ≤ ${t} ≤ 1. Rotate about the ${t}-axis.`;
    $('position-label').textContent=`Strip position (${t})`;
    $('radii-formula').textContent=`R = ${e.radius(t)},    r = ${e.innerRadius(t)}`;
    $('radius-note').textContent=isWasher?'Measure both radii from the axis. Subtract the inner disc’s area from the outer disc’s area.':'The strip reaches the axis, so r = 0. One full turn produces a filled disc.';
    $('method-title').textContent=isWasher?'Washer method':'Disc method';
    $('method-note').textContent=`A thin slice has volume approximately A(${t}) Δ${t}. Add all slices from ${t} = 0 to 1.`;
    const labels=['THE REGION','THE STRIP','THE REVOLUTION','THE SOLID','THE VOLUME'];
    const descriptions=[
      `The purple curve is the outer boundary. ${isWasher?'The teal curve is the inner boundary.':'The other boundary is the axis itself.'} View the region in Base plane before rotating.`,
      `Choose a strip perpendicular to the ${t}-axis. ${t==='x'?'A vertical strip has thickness Δx.':'A horizontal strip has thickness Δy.'} Its endpoints set the radii, measured from the axis.`,
      `Turn the strip about the ${t}-axis. ${isWasher?'Its nearer endpoint traces the hole; its farther endpoint traces the outer circle.':'Because the strip reaches the axis, it sweeps out a filled disc.'} Pause or drag Revolve to inspect any angle.`,
      `Now rotate the whole region. Each strip sweeps out its own ${isWasher?'washer':'disc'}. Together these slices fill the solid. Orbit camera changes the viewpoint without changing the revolution.`,
      `For a full turn, A(${t}) = ${isWasher?'π(R² − r²)':'πR²'}. A thin slice contributes A(${t}) Δ${t}. The integral adds all slices. The formulas below are for 360°, rather than a partial sweep.`
    ];
    $('explanation-title').textContent=labels[state.stage];$('explanation-content').innerHTML=`<p>${descriptions[state.stage]}</p>`;
    $('volume-panel').dataset.revealed=String(state.stage===4);$('volume-working').setAttribute('aria-hidden',String(state.stage!==4));$('working-placeholder').setAttribute('aria-hidden',String(state.stage===4));
    $('area-formula').textContent=`A(${t}) = ${isWasher?'π(R² − r²)':'πR²'}`;
    $('integral-formula').innerHTML=`V = π ${integral} (${e.radius(t)})²${isWasher?` − (${e.innerRadius(t)})²`:''} ${d}`;
    // Brackets enclose the complete outer-minus-inner expression.
    if(isWasher)$('integral-formula').innerHTML=`V = π ${integral} [(${e.radius(t)})² − (${e.innerRadius(t)})²] ${d}`;
    $('expanded-formula').innerHTML=`= π ${integral} (${e.squared(t)}) ${d}`;
    $('antiderivative-formula').innerHTML=`= π [${e.primitive(t)}]${limits}`;
    $('evaluation-formula').textContent=`= π (${e.evaluation})`;
    $('volume-exact').textContent=e.exact;$('volume-decimal').textContent=`≈ ${math.volume(state.example).toFixed(5)} cubic units`;
    document.querySelectorAll('[data-stage]').forEach(b=>{const active=+b.dataset.stage===state.stage;b.classList.toggle('current',active);b.setAttribute('aria-pressed',active);});
    document.querySelectorAll('[data-axis]').forEach(b=>{const active=b.dataset.axis===state.axis;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',active);});
    const next=['Show the strip','Revolve the strip','Revolve the region','Connect to the integral','Back to the region'];$('next').innerHTML=`${next[state.stage]} <span>→</span>`;
    measurements();dirty=true;
  }
  function play(active){state.playing=active;$('play').textContent=active?'Ⅱ':'▶';$('play').setAttribute('aria-pressed',active);$('play').setAttribute('aria-label',active?'Pause revolution':'Animate revolution');}
  function stage(n){state.stage=n;play(false);if(n<2)state.angle=0;else if(n===4)state.angle=360;else {state.angle=reduced?360:0;if(!reduced)play(true);}update();}
  function view(name){
    if(name==='section'&&state.stage<2){state.stage=2;state.angle=360;play(false);update();}
    state.view=name;state.spin=false;$('spin').setAttribute('aria-pressed','false');
    const target=name==='top'?{azimuth:0,elevation:Math.PI/2,zoom:1}:name==='section'?{azimuth:state.axis==='x'?Math.PI/2:0,elevation:0,zoom:1.05}:{azimuth:-.85,elevation:.48,zoom:1};
    if(reduced)Object.assign(state,target);else animation={from:{azimuth:state.azimuth,elevation:state.elevation,zoom:state.zoom},target,start:performance.now(),duration:600};
    document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name));dirty=true;
  }
  function manualView(){animation=null;state.view='custom';state.spin=false;$('spin').setAttribute('aria-pressed','false');document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'));dirty=true;}
  document.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>stage(+b.dataset.stage)));
  document.querySelectorAll('[data-axis]').forEach(b=>b.addEventListener('click',()=>{state.axis=b.dataset.axis;play(false);if(state.view==='section')view('section');update();}));
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>view(b.dataset.view)));
  $('example').addEventListener('change',e=>{state.example=e.target.value;play(false);update();});
  $('next').addEventListener('click',()=>stage((state.stage+1)%5));
  $('position').addEventListener('input',e=>{state.t=+e.target.value/1000;if(state.stage===0){state.stage=1;update();}else measurements();dirty=true;});
  $('angle').addEventListener('input',e=>{play(false);state.angle=+e.target.value;if(state.stage<2)state.stage=2;if(state.stage===4)state.stage=3;update();});
  $('play').addEventListener('click',()=>{if(state.stage<2)state.stage=2;if(state.stage===4)state.stage=3;if(!state.playing&&state.angle>=360)state.angle=0;play(!state.playing);update();});
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
      if(animation){const t=clamp((now-animation.start)/animation.duration,0,1),v=ease(t);for(const k of ['azimuth','elevation','zoom'])state[k]=animation.from[k]+(animation.target[k]-animation.from[k])*v;if(t===1)animation=null;dirty=true;}
      if(state.playing){state.angle=Math.min(360,state.angle+dt*65);if(state.angle>=360)play(false);measurements();dirty=true;}
      if(state.spin){state.azimuth+=dt*.17;dirty=true;}
      if(dirty)render();
    }
    frame=requestAnimationFrame(tick);
  }
  window.revolutionExplorer={state,stage,view,math};
  update();resize();frame=requestAnimationFrame(tick);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(frame));
  window.addEventListener('pageshow',()=>{lastTime=performance.now();cancelAnimationFrame(frame);frame=requestAnimationFrame(tick);});
})();
