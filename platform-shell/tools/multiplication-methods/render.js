(function(root){
'use strict';
const NS='http://www.w3.org/2000/svg',colours=['#087d80','#7953aa'],ink='#203e49',muted='#607781',gold='#b77712';
function render(svg,f){svg.replaceChildren();const rowHeight=f.rows&&f.method==='russian'?Math.min(43,365/f.rows.length):0,doublingGap=f.method==='doubling'?Math.min(65,370/f.totalRows):0,doublingEnd=f.method==='doubling'?95+(f.totalRows-1)*doublingGap+90:0;svg.setAttribute('viewBox',f.method==='compare'?'0 0 960 360':f.method==='column'?'200 0 640 480':f.method==='lattice'?'180 0 600 550':f.method==='russian'?'180 0 640 '+Math.max(330,230+(f.rows.length-1)*rowHeight):f.method==='doubling'?'150 0 660 '+(doublingEnd+50):'0 0 960 560');svg.setAttribute('aria-label',f.title+'. '+f.prompt);
 const node=(tag,attrs={},value)=>{const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);if(value!==undefined)e.textContent=value;svg.append(e);return e;};
 const text=(value,x,y,size=34,fill=ink,weight=650)=>node('text',{x,y,'font-size':size,fill,'font-weight':weight,'text-anchor':'middle','dominant-baseline':'central'},value);
 const rect=(x,y,w,h,fill='#fff',stroke='#b6d1ca',width=2)=>node('rect',{x,y,width:w,height:h,fill,stroke,'stroke-width':width});
 const line=(x1,y1,x2,y2,stroke=ink,width=2)=>node('line',{x1,y1,x2,y2,stroke,'stroke-width':width});
 const digits=(value,right,y,size=48,fill=ink,cell=60)=>String(value).split('').reverse().forEach((d,i)=>text(d,right-i*cell,y,size,fill));
 if(f.method==='partition'){
  text(f.a+' × '+f.b,480,70,54);if(f.split)text('= '+f.a+' × ('+f.bp.join(' + ')+')',480,145,40);
  for(let i=0;i<f.done;i++)text(f.a+' × '+f.bp[i]+' = '+f.a*f.bp[i],480,245+i*80,44,colours[i%2]);
  if(f.final){line(200,395,760,395,'#b6d1ca');text(f.bp.map(p=>f.a*p).join(' + ')+' = '+f.product,480,455,48);}
 }else if(f.method==='area'){
  const cw=600/f.ap.length,ch=125,x0=190,y0=145;
  text(f.a+' × '+f.b,480,45,46);f.ap.forEach((p,c)=>text(p,x0+(c+.5)*cw,y0-40,32));f.bp.forEach((p,r)=>text(p,x0-60,y0+(r+.5)*ch,32));
  f.bp.forEach((p,r)=>f.ap.forEach((q,c)=>{const i=r*f.ap.length+c,active=f.focus?.[0]===r&&f.focus?.[1]===c;rect(x0+c*cw,y0+r*ch,cw,ch,i<f.done?(r%2?'#eee6f7':'#e3f3ef'):'#fff',active?gold:'#4f8587',active?5:2);if(i<f.done)text(p*q,x0+(c+.5)*cw,y0+(r+.5)*ch,36,colours[r%2]);}));
  if(f.total!==undefined)text('Running total: '+f.total,480,470,34);if(f.final)text('Total area = '+f.product,480,480,44);
 }else if(f.method==='column'){
  const right=610;['O','T','H','Th','TTh'].forEach((v,i)=>text(v,right-i*60,28,18,muted));digits(f.a,right,105);digits(f.b,right,160);text('×',right-Math.max(String(f.a).length,String(f.b).length)*60-20,160,44);line(270,195,650,195);
  f.rows.forEach((value,j)=>{if(value!==''){digits(value,right,245+j*65,44,colours[j%2]);text('× '+Number(String(f.b).split('').reverse()[j])*10**j,760,245+j*65,26,colours[j%2]);}});
  if(f.carry&&f.phase==='multiply'){text(f.carry,right-f.carryPlace*60,65,28,gold);text('carry',760,65,20,gold);}
  if(f.phase==='add'||f.phase==='complete'){line(270,345,650,345);if(f.rows.length>1)text('+',250,305,38);if(f.sum)digits(f.sum,right,420,48);if(f.carry&&f.phase==='add')text(f.carry,right-f.carryPlace*60,375,26,gold);}
 }else if(f.method==='lattice'){
  const x0=260,y0=115,cw=110,ch=110;f.ac.forEach((d,c)=>text(d,x0+(c+.5)*cw,y0-40,40,colours[0]));f.br.forEach((d,r)=>text(d,x0+f.ac.length*cw+40,y0+(r+.5)*ch,40,colours[0]));
  f.cells.forEach((cell,i)=>{const x=x0+cell.col*cw,y=y0+cell.row*ch,d=f.ac.length-1-cell.col+f.br.length-1-cell.row;rect(x,y,cw,ch);
   if(f.diagonal===d+1)node('polygon',{points:`${x},${y} ${x+cw},${y} ${x},${y+ch}`,fill:'#ffedc8'});
   if(f.diagonal===d)node('polygon',{points:`${x+cw},${y} ${x+cw},${y+ch} ${x},${y+ch}`,fill:'#ffedc8'});
   line(x+cw,y,x,y+ch,'#6f8b90');if(i<f.done){text(Math.floor(cell.value/10),x+.28*cw,y+.28*ch,32,f.diagonal===d+1?gold:colours[1]);text(cell.value%10,x+.72*cw,y+.72*ch,32,f.diagonal===d?gold:colours[0]);}
   if(f.focus?.[0]===cell.row&&f.focus?.[1]===cell.col)rect(x+2,y+2,cw-4,ch-4,'none',gold,4);
  });
  (f.digits||[]).forEach((digit,d)=>{if(d>=String(f.product).length)return;const x=d<f.ac.length?x0+(f.ac.length-d-.5)*cw:x0-36,y=d<f.ac.length?y0+f.br.length*ch+40:y0+(f.br.length-1-(d-f.ac.length)+.5)*ch;text(digit,x,y,40,f.diagonal===d?gold:ink);});
  if(f.carry)text('Carry '+f.carry+' to the next diagonal',480,445,26,gold);if(f.final)text(f.a+' × '+f.b+' = '+f.product,480,490,44);
 }else if(f.method==='russian'){
  text('Halve',320,38,28,muted);text('Double',600,38,28,muted);
  f.rows.slice(0,f.visible).forEach((row,i)=>{const y=86+i*rowHeight,decided=i<f.selected,keep=decided&&row.keep,fill=decided&&!row.keep?'#8c999d':keep?colours[0]:ink;if(i===f.focusRow)rect(215,y-rowHeight*.46,545,rowHeight*.92,'#fff4d9','#fff4d9');text(row.left,320,y,32,fill);text(row.right,600,y,32,fill);if(decided){if(row.keep)text('Keep',735,y,22,colours[0]);else{line(265,y,375,y,'#7c8a8e');line(535,y,665,y,'#7c8a8e');}}});
  if(f.total!==undefined)text((f.final?'Product: ':'Running total: ')+f.total,480,180+(f.rows.length-1)*rowHeight,42,colours[0]);
 }else if(f.method==='doubling'){
  const gap=doublingGap;f.rows.forEach((r,i)=>text((i?'= ':'')+r.left+' × '+r.right,480,95+i*gap,40,i===f.rows.length-1?colours[0]:muted));if(f.final)text('= '+f.product,480,doublingEnd,48);
 }else{
  const xs=[20,335,650];xs.forEach((x,i)=>{const box=rect(x,10,290,340,'#fbfdfc');box.setAttribute('rx',10);text(['Area grid','Partitioning','Column method'][i],x+145,38,24);});
  const gx=xs[0]+55,gy=120,cw=210/f.ap.length,ch=55;f.ap.forEach((p,c)=>text(p,gx+(c+.5)*cw,gy-25,20));f.bp.forEach((p,r)=>{text(p,gx-28,gy+(r+.5)*ch,20);f.ap.forEach((q,c)=>{rect(gx+c*cw,gy+r*ch,cw,ch,r<f.done?(r?'#eee6f7':'#e3f3ef'):'#fff');if(r<f.done)text(p*q,gx+(c+.5)*cw,gy+(r+.5)*ch,22,colours[r%2]);});if(r<f.done)text('Row total = '+f.a*p,165,270+r*24,20,colours[r%2]);});
  text(f.a+' × '+f.b,480,80,32);f.bp.forEach((p,i)=>{if(i<f.done)text(f.a+' × '+p+' = '+f.a*p,480,155+i*80,27,colours[i%2]);});
  const right=870;digits(f.a,right,95,34,ink,43);digits(f.b,right,140,34,ink,43);text('×',715,140,30);line(700,170,905,170);f.bp.slice().reverse().forEach((p,j)=>{const i=f.bp.length-1-j;if(i<f.done)digits(f.a*p,right,215+j*55,32,colours[i%2],43);});
  if(f.final){for(const x of xs){line(x+25,310,x+265,310,'#b6d1ca');text(f.product,x+145,333,34);}}
 }
}
root.KaizenMultiplicationRender={render};
})(typeof window!=='undefined'?window:globalThis);
