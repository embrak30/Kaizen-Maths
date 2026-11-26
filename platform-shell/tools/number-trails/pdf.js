/* Direct vector PDF export. Arithmetic signs are paths, never font-dependent glyphs. */
(function(root){
'use strict';
const M=root.KaizenNumberTrails||(typeof require==='function'?require('./model.js'):null),num=x=>String(Number(x.toFixed(3))),escape=s=>String(s).replace(/[\\()]/g,'\\$&');
const W=841.89,H=595.276,k=(H-145)/645,ox=(W-920*k)/2,top=H-102;
function page(p,answers){
 const ops=[],xy=(x,y)=>[ox+x*k,top-y*k];
 const line=(x1,y1,x2,y2,width=1.7)=>ops.push(`0 G ${num(width)} w ${num(x1)} ${num(y1)} m ${num(x2)} ${num(y2)} l S`);
 function circle(x,y,r,fill=false){const a=.5522847498*r;ops.push(`${fill?'0':'1'} g 0 G 1.7 w ${num(x+r)} ${num(y)} m ${num(x+r)} ${num(y+a)} ${num(x+a)} ${num(y+r)} ${num(x)} ${num(y+r)} c ${num(x-a)} ${num(y+r)} ${num(x-r)} ${num(y+a)} ${num(x-r)} ${num(y)} c ${num(x-r)} ${num(y-a)} ${num(x-a)} ${num(y-r)} ${num(x)} ${num(y-r)} c ${num(x+a)} ${num(y-r)} ${num(x+r)} ${num(y-a)} ${num(x+r)} ${num(y)} c B`);}
 function text(value,x,y,size=12,bold=false,center=false,white=false){const s=String(value),width=[...s].reduce((a,c)=>a+(c==='-'?.333:c===' '?.278:/\d/.test(c)?.556:.6)*size,0);ops.push(`${white?1:0} g BT /${bold?'F2':'F1'} ${num(size)} Tf 1 0 0 1 ${num(x-(center?width/2:0))} ${num(y)} Tm (${escape(s)}) Tj ET`);}
 text('KAIZEN MATHEMATICS',38,H-29,9,true);text('Number Trails'+(answers?' - Answer key':''),38,H-56,22,true);
 if(answers)text('Answers for the same challenge.',38,H-76,10);else{text('Name:',38,H-76,10);line(75,H-78,285,H-78,.5);text('Date:',320,H-76,10);line(350,H-78,480,H-78,.5);}
 text('Follow each arrow. Apply its operation to the number in the circle it leaves.',38,H-92,10);
 for(const e of p.edges){
  const a=M.points[e.from],b=M.points[e.to],dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d;
  const start=xy(a[0]+ux*53,a[1]+uy*53),end=xy(b[0]-ux*57,b[1]-uy*57),vx=ux,vy=-uy;
  line(...start,...end);const head=8,half=4;ops.push(`0 g ${num(end[0])} ${num(end[1])} m ${num(end[0]-vx*head-vy*half)} ${num(end[1]-vy*head+vx*half)} l ${num(end[0]-vx*head+vy*half)} ${num(end[1]-vy*head-vx*half)} l h f`);
  const horizontal=dy===0,[cx,cy]=xy((a[0]+b[0])/2+(horizontal?0:67),(a[1]+b[1])/2-(horizontal?34:0));
  const font=35*k,sign=20*k,gap=9*k,digitWidth=String(e.operand).length*.556*font,total=sign+gap+digitWidth,sx=cx-total/2+sign/2,sy=cy,arm=sign/2;
  if(e.op==='×'){line(sx-arm*.75,sy-arm*.75,sx+arm*.75,sy+arm*.75,2);line(sx-arm*.75,sy+arm*.75,sx+arm*.75,sy-arm*.75,2);}
  else{line(sx-arm,sy,sx+arm,sy,2);if(e.op==='+')line(sx,sy-arm,sx,sy+arm,2);if(e.op==='÷'){circle(sx,sy+arm*.9,1.8,true);circle(sx,sy-arm*.9,1.8,true);}}
  text(e.operand,cx-total/2+sign+gap+digitWidth/2,cy-font*.35,font,true,true);
 }
 for(let i=0;i<M.points.length;i++){const[x,y]=xy(...M.points[i]);circle(x,y,51*k,i===0);if(i===0||answers)text(p.values[i],x,y-36*k*.35,36*k,true,true,i===0);}
 line(38,34,W-38,34,.5);text('Kaizen Mathematics. Permission granted to print and copy for educational use.',38,20,8);text('Trail '+p.code+' | '+(answers?'Answer key':'Question sheet'),W-250,20,8);
 return ops.join('\n');
}
function bytes(p,includeAnswers=false){
 const streams=[page(p,false),...(includeAnswers?[page(p,true)]:[])],objects=[null,'<< /Type /Catalog /Pages 2 0 R >>','','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>'],kids=[];
 for(const stream of streams){const id=objects.length;kids.push(`${id} 0 R`);objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${id+1} 0 R >>`);objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);}
 objects[2]=`<< /Type /Pages /Count ${streams.length} /Kids [${kids.join(' ')}] >>`;const info=objects.length;objects.push(`<< /Title (${escape('Kaizen Number Trails - '+p.code)}) /Author (Kaizen Mathematics) >>`);
 let pdf='%PDF-1.4\n',offsets=[0];for(let i=1;i<objects.length;i++){offsets.push(pdf.length);pdf+=`${i} 0 obj\n${objects[i]}\nendobj\n`;}const xref=pdf.length;pdf+=`xref\n0 ${objects.length}\n0000000000 65535 f \n`+offsets.slice(1).map(o=>String(o).padStart(10,'0')+' 00000 n \n').join('')+`trailer\n<< /Size ${objects.length} /Root 1 0 R /Info ${info} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
 if(/[^\x00-\x7f]/.test(pdf))throw Error('Invalid PDF text');return new TextEncoder().encode(pdf);
}
const api={bytes};if(typeof module==='object'&&module.exports)module.exports=api;else root.KaizenNumberTrailsPDF=api;
})(typeof window!=='undefined'?window:globalThis);
