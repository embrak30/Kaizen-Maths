(function(root){
'use strict';
const M=root.KaizenNumberWeb||(typeof require==='function'?require('./model.js'):null);
const ascii=s=>String(s).replace(/−/g,'-').replace(/[\\()]/g,'\\$&');
const n=x=>Number(x.toFixed(3));
function page(p,answers){
 const W=595.276,H=841.89,size=515,offset=40,top=H-160,k=size/1000,xy=(x,y)=>[n(offset+x*k),n(top-y*k)],ops=[];
 const line=(a,b,color='0.15 0.24 0.28',width=1.5)=>{ops.push(`${color} RG ${width} w ${a[0]} ${a[1]} m ${b[0]} ${b[1]} l S`);};
 const polygon=(points,fill,stroke,width=1.5)=>{ops.push(`${fill} rg ${stroke} RG ${width} w `+points.map((v,i)=>`${v[0]} ${v[1]} ${i?'l':'m'}`).join(' ')+' h B');};
 const text=(s,x,y,font=12,bold=false,center=false,color='0.15 0.24 0.28')=>{s=String(s).replace(/−/g,'-');const widths={'0':.556,'1':.556,'2':.556,'3':.556,'4':.556,'5':.556,'6':.556,'7':.556,'8':.556,'9':.556,'.':.278,'-':.333,' ': .278};let width=0;for(const c of s)width+=(widths[c]??.62)*font;ops.push(`${color} rg BT /${bold?'F2':'F1'} ${font} Tf 1 0 0 1 ${n(x-(center?width/2:0))} ${n(y)} Tm (${ascii(s)}) Tj ET`);};
 text('KAIZEN MATHEMATICS',40,H-35,10,true,false,'0.07 0.42 0.43');text('Number Web'+(answers?' - Answer key':''),40,H-68,25,true);text(M.levels[p.level].label.replace('·','-')+' | Target '+p.target,40,H-91,11);text('The three numbers on every branch add to the centre target.',40,H-112,12);text(answers?'Answers complete the same puzzle.':'Name: __________________________    Date: ______________',40,H-137,11);
 const diagram=M.geometry(p);
 for(const g of diagram)for(const [a,b]of g.lines)line(xy(...a),xy(...b));
 polygon(M.hex(500,500,123).map(a=>xy(...a)),'0.91 0.96 0.94','0.07 0.42 0.43',2.5);
 text('TARGET',...xy(500,477),12,true,true,'0.07 0.42 0.43');text(p.target,...xy(500,548),31,true,true);
 for(const g of diagram){
  polygon([[g.points[0][0]-21,g.points[0][1]-90],[g.points[0][0]+21,g.points[0][1]-90],[g.points[0][0]+21,g.points[0][1]-54],[g.points[0][0]-21,g.points[0][1]-54]].map(a=>xy(...a)),'1 1 1','1 1 1',0);
  text(g.branch.id,...xy(g.points[0][0],g.points[0][1]-65),10,true,true,'0.07 0.42 0.43');
  for(const [i,pos]of g.points.entries()){
   const blank=i===g.branch.missing,visible=!blank||answers,label=M.format(g.branch.values[i],p.scale),font=(label.length<=3?42:label.length===4?34:28)*k;
   polygon(M.hex(...pos,50).map(a=>xy(...a)),blank&&answers?'0.94 0.94 0.94':'1 1 1',blank&&answers?'0.07 0.42 0.43':'0.15 0.24 0.28',blank&&answers?2:1.5);
   if(visible)text(label,...xy(pos[0],pos[1]+(blank?4:14)),font,true,true);
   if(blank&&answers)text('answer',...xy(pos[0],pos[1]+29),6.5,false,true);
  }
 }
 text('Puzzle '+p.code,40,112,10);text(answers?'Check each branch by adding all three numbers.':'Find the missing number in each branch. Show working on separate paper.',40,91,11);
 line([40,52],[W-40,52],'0.75 0.82 0.80',.5);text('Kaizen Mathematics. Permission granted to print and copy for educational use.',40,36,8);text(answers?'Teacher answer key':'Student challenge',40,23,8);text(answers?'2':'1',W-48,23,9,true);
 return ops.join('\n');
}
function bytes(p,includeAnswers=false){
 const streams=[page(p,false),...(includeAnswers?[page(p,true)]:[])],objects=[null,'<< /Type /Catalog /Pages 2 0 R >>','', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>'],kids=[];
 for(const stream of streams){const id=objects.length,content=id+1;kids.push(`${id} 0 R`);objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.276 841.89] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${content} 0 R >>`);objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);}
 objects[2]=`<< /Type /Pages /Count ${streams.length} /Kids [${kids.join(' ')}] >>`;
 const info=objects.length;objects.push(`<< /Title (${ascii('Kaizen Number Web - '+p.code)}) /Author (Kaizen Mathematics) >>`);
 let pdf='%PDF-1.4\n',offsets=[0];for(let i=1;i<objects.length;i++){offsets.push(pdf.length);pdf+=`${i} 0 obj\n${objects[i]}\nendobj\n`;}
 const xref=pdf.length;pdf+=`xref\n0 ${objects.length}\n0000000000 65535 f \n`+offsets.slice(1).map(o=>String(o).padStart(10,'0')+' 00000 n \n').join('');pdf+=`trailer\n<< /Size ${objects.length} /Root 1 0 R /Info ${info} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
 if(/[^\x00-\x7f]/.test(pdf))throw Error('PDF requires ASCII text');return new TextEncoder().encode(pdf);
}
const api={bytes};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.KaizenNumberWebPDF=api;
})(typeof window!=='undefined'?window:globalThis);
