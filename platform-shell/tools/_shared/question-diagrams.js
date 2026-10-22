/* Stable, portable question diagrams. Geometry and upright labels travel together. */
(() => {
 'use strict';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const rad=d=>d*Math.PI/180,fmt=n=>Number(n.toFixed(3));
 function hash(value){let h=2166136261;for(const c of JSON.stringify(value)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
 function viewFor(key,view){return view===undefined?hash(key)%6:((view%6)+6)%6;}
 function point(p){return p.map(fmt).join(',');}
 function textLabel(x,y,text,extra='',anchor='middle'){
  return `<text x="${fmt(x)}" y="${fmt(y)}" text-anchor="${anchor}" dominant-baseline="middle" font-family="Arial,sans-serif" font-size="20" font-weight="600" fill="#26344b" ${extra}>${esc(text)}</text>`;
 }
 function triangleGeometry(a,b,C,view=0){
  if(!(a>0&&b>0&&C>0&&C<180))throw Error('Invalid triangle dimensions');
  const raw={A:[b*Math.cos(rad(C)),-b*Math.sin(rad(C))],B:[a,0],C:[0,0]},center=[(raw.A[0]+a)/3,raw.A[1]/3],angle=rad([-14,12,0,166,192,180][view%6]),mirror=view>=3?-1:1;
  const rotated=Object.fromEntries(Object.entries(raw).map(([name,p])=>{const x=(p[0]-center[0])*mirror,y=p[1]-center[1];return[name,[x*Math.cos(angle)-y*Math.sin(angle),x*Math.sin(angle)+y*Math.cos(angle)]];}));
  const xs=Object.values(rotated).map(p=>p[0]),ys=Object.values(rotated).map(p=>p[1]),mid=[(Math.min(...xs)+Math.max(...xs))/2,(Math.min(...ys)+Math.max(...ys))/2],scale=Math.min(240/(Math.max(...xs)-Math.min(...xs)),165/(Math.max(...ys)-Math.min(...ys)));
  return Object.fromEntries(Object.entries(rotated).map(([name,p])=>[name,[210+(p[0]-mid[0])*scale,137+(p[1]-mid[1])*scale]]));
 }
 function triangle(spec){
  const view=viewFor(spec.key??[spec.a,spec.b,spec.C,spec.labels],spec.view),rawPoints=triangleGeometry(spec.a,spec.b,spec.C,view),fit=spec._fit||1,p=Object.fromEntries(Object.entries(rawPoints).map(([k,v])=>[k,[240+(v[0]-210)*fit,145+(v[1]-137)*fit]])),center=[(p.A[0]+p.B[0]+p.C[0])/3,(p.A[1]+p.B[1]+p.C[1])/3];let out='';const bounds=[];
  function putLabel(x,y,label,extra='',anchor='middle',backing=false){const width=String(label).length*11+8,left=anchor==='end'?x-width:anchor==='start'?x:x-width/2;bounds.push([left,y-12,left+width,y+12]);if(backing)out+=`<rect x="${fmt(left-2)}" y="${fmt(y-12)}" width="${fmt(width+4)}" height="24" rx="3" fill="white" fill-opacity=".95"/>`;out+=textLabel(x,y,label,extra,anchor);}
  const labels=spec.labels||{},vertices=['A','B','C'];
  out+=`<polygon points="${vertices.map(k=>point(p[k])).join(' ')}" fill="#e8f7f7" stroke="#187d84" stroke-width="2.5" stroke-linejoin="round"/>`;
  for(const [side,start,end] of [['a','B','C'],['b','A','C'],['c','A','B']]){
   const label=labels.sides?.[side];if(!label)continue;const a=p[start],b=p[end],mid=[(a[0]+b[0])/2,(a[1]+b[1])/2],length=Math.hypot(b[0]-a[0],b[1]-a[1]);let n=[-(b[1]-a[1])/length,(b[0]-a[0])/length];if(n[0]*(mid[0]-center[0])+n[1]*(mid[1]-center[1])<0)n=n.map(x=>-x);
   const anchor=Math.abs(n[0])>.6?(n[0]<0?'end':'start'):'middle',offset=anchor==='middle'?30:18,x=mid[0]+n[0]*offset,y=mid[1]+n[1]*offset;putLabel(x,y,label,`data-side="${side}" data-edge="${start}${end}"${String(label).includes('?')?' style="fill:#6751bc"':''}`,anchor,true);
  }
  for(let i=0;i<3;i++){
   const name=vertices[i],v=p[name],a=p[vertices[(i+1)%3]],b=p[vertices[(i+2)%3]],outward=[v[0]-center[0],v[1]-center[1]],distance=Math.hypot(...outward)||1;
   putLabel(v[0]+outward[0]/distance*23,v[1]+outward[1]/distance*23,name,`data-vertex="${name}" style="font-size:18px;font-weight:700"`);
   const label=labels.angles?.[name];if(!label)continue;
   const ua=[a[0]-v[0],a[1]-v[1]],ub=[b[0]-v[0],b[1]-v[1]],la=Math.hypot(...ua),lb=Math.hypot(...ub),r=Math.min(20,Math.min(la,lb)*.18);ua[0]/=la;ua[1]/=la;ub[0]/=lb;ub[1]/=lb;
   const from=[v[0]+ua[0]*r,v[1]+ua[1]*r],to=[v[0]+ub[0]*r,v[1]+ub[1]*r],sweep=ua[0]*ub[1]-ua[1]*ub[0]>0?1:0;
   out+=`<path d="M${point(from)} A${fmt(r)},${fmt(r)} 0 0 ${sweep} ${point(to)}" fill="none" stroke="#6751bc" stroke-width="1.7"/>`;
   const bis=[ua[0]+ub[0],ua[1]+ub[1]],bl=Math.hypot(...bis)||1;putLabel(v[0]+bis[0]/bl*(r+19),v[1]+bis[1]/bl*(r+19),label,`data-angle="${name}" style="font-size:18px;fill:#6751bc"`);
  }
  if(bounds.some(([l,t,r,b])=>l<10||r>470||t<10||b>290)&&fit>.5)return triangle({...spec,_fit:fit*.86});
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" role="img" aria-label="Labelled triangle ABC" data-diagram-kind="triangle" data-view="${view}">${out}</svg>`;
 }
 function orientSolid(source,key,options={}){
  const doc=new DOMParser().parseFromString(source,'image/svg+xml'),svg=doc.documentElement;
  if(svg.localName!=='svg'||doc.querySelector('parsererror'))throw Error('Invalid solid SVG');
  const view=viewFor(key,options.view),box=svg.getAttribute('viewBox').split(/[ ,]+/).map(Number),w=box[2],h=box[3],angle=rad([-12,10,0,-8,14,0][view]),mirror=view>=3?-1:1,scale=Math.min(326/(Math.abs(Math.cos(angle))*w+Math.abs(Math.sin(angle))*h),230/(Math.abs(Math.sin(angle))*w+Math.abs(Math.cos(angle))*h));
  const a=scale*mirror*Math.cos(angle),b=scale*mirror*Math.sin(angle),c=-scale*Math.sin(angle),d=scale*Math.cos(angle),e=210-a*w/2-c*h/2,f=150-b*w/2-d*h/2;
  const map=(x,y)=>[a*x+c*y+e,b*x+d*y+f],ns='http://www.w3.org/2000/svg',group=doc.createElementNS(ns,'g'),labels=[...svg.querySelectorAll('text')].map(n=>({x:+n.getAttribute('x'),y:+n.getAttribute('y'),text:n.textContent,unknown:n.classList.contains('unknown-label')}));
  svg.querySelectorAll('text').forEach(n=>n.remove());
  // Unique definitions stop one question's gradient/arrow markers affecting another.
  const prefix='qd-'+hash([key,view]).toString(16)+'-';
  for(const el of [...svg.querySelectorAll('[id]')]){const old=el.id;el.id=prefix+old;for(const node of [svg,...svg.querySelectorAll('*')])for(const attr of [...node.attributes])if(attr.value.includes('url(#'+old+')'))node.setAttribute(attr.name,attr.value.replaceAll('url(#'+old+')','url(#'+prefix+old+')'));}
  for(const el of svg.querySelectorAll('*')){
   const classes=el.getAttribute('class')||'';
   for(const attr of [...el.attributes])if(attr.value.includes('var('))el.setAttribute(attr.name,attr.value.replace(/var\(--shape-(?:fill|side|top),[^)]+\)/g,'#dff3f5').replace(/var\(--shape-stroke,[^)]+\)/g,'#187d84').replace(/var\(--shape-accent,[^)]+\)/g,'#6751bc'));
   if(/shape-(?:face|side|top|fill)/.test(classes)){el.setAttribute('style','fill:'+(/shape-top/.test(classes)?'#eeeaff':/shape-side/.test(classes)?'#cff0f3':'#e7f8f8')+';stroke:#187d84;stroke-width:2.5');}
   else if(/shape-(?:line|hidden|dim|guide)/.test(classes)){
    el.setAttribute('style','fill:none;stroke:'+(/shape-(?:dim|guide)/.test(classes)?'#6751bc':'#187d84')+';stroke-width:'+(/hidden/.test(classes)?'1.6':'2.2'));
    if(/hidden/.test(classes)){el.setAttribute('stroke-dasharray','5 4');el.setAttribute('opacity','.65');}
   }
  }
  for(const node of [...svg.childNodes])if(node.nodeType===1&&node.localName!=='defs')group.appendChild(node);
  group.setAttribute('transform',`matrix(${[a,b,c,d,e,f].map(fmt).join(' ')})`);svg.appendChild(group);
  const placed=[];
  for(const label of labels){
   const kind=svg.getAttribute('aria-label')||'';
   if(label.text.startsWith('r =')){if(/Cylinder/.test(kind))label.y=-1;else if(/Sphere/.test(kind))label.y=54;else if(/Cone/.test(kind))label.y=157;}
   if(/Cone/.test(kind)&&label.text.startsWith('l ='))label.x+=36;
   let [x,y]=map(label.x,label.y);const width=Math.min(190,label.text.length*10+12),half=width/2;x=Math.max(half+9,Math.min(411-half,x));y=Math.max(19,Math.min(281,y));
   for(let tries=0;tries<4&&placed.some(p=>Math.abs(p.x-x)<(p.width+width)/2+3&&Math.abs(p.y-y)<27);tries++)y=Math.max(19,Math.min(281,y+(y<150?-28:28)));
   const backing=doc.createElementNS(ns,'rect');for(const [k,v] of Object.entries({class:'qd-label-backing',x:fmt(x-half),y:fmt(y-13),width:fmt(width),height:26,rx:4,fill:'#ffffff','fill-opacity':'.94'}))backing.setAttribute(k,v);svg.appendChild(backing);
   const text=doc.createElementNS(ns,'text');for(const [k,v] of Object.entries({x:fmt(x),y:fmt(y),'text-anchor':'middle','dominant-baseline':'middle','font-family':'Arial,sans-serif','font-size':19,'font-weight':label.unknown?700:600,fill:label.unknown?'#6751bc':'#26344b',style:'stroke:none;paint-order:normal'}))text.setAttribute(k,v);text.textContent=label.text;svg.appendChild(text);placed.push({x,y,width});
  }
  svg.setAttribute('viewBox','0 0 420 300');svg.setAttribute('data-view',view);svg.setAttribute('data-diagram-kind','solid');svg.removeAttribute('width');svg.removeAttribute('height');return new XMLSerializer().serializeToString(svg);
 }
 window.KaizenQuestionDiagrams={triangle,triangleGeometry,orientSolid,viewFor};
})();
