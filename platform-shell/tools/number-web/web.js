(function(){
'use strict';
const M=window.KaizenNumberWeb,$=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg',S={p:null,selected:null,all:false,revealed:new Set()};
function el(tag,attrs={},text){const e=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;return e;}
function polygon(x,y,r,attrs){return el('polygon',{points:M.hex(x,y,r).map(a=>a.join(',')).join(' '),...attrs});}
function draw(){const svg=$('web');svg.replaceChildren();svg.setAttribute('aria-label',`Target ${S.p.target}. ${S.p.branches.length} branches. Three numbers on each branch add to ${S.p.target}.`);const diagram=M.geometry(S.p);
 for(const g of diagram)for(const [a,b]of g.lines)svg.append(el('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:'#49656d','stroke-width':5}));
 svg.append(polygon(500,500,123,{fill:'#e8f4ef',stroke:'#146f73','stroke-width':6}),el('text',{x:500,y:474,'text-anchor':'middle','font-size':27,'font-weight':750,fill:'#146f73'},'TARGET'),el('text',{x:500,y:548,'text-anchor':'middle','font-size':66,'font-weight':800,fill:'#233b4b'},S.p.target));
 for(const g of diagram){svg.append(el('rect',{x:g.points[0][0]-21,y:g.points[0][1]-90,width:42,height:36,fill:'#ffffff'}),el('text',{x:g.points[0][0],y:g.points[0][1]-64,'text-anchor':'middle','font-size':23,'font-weight':750,fill:'#146f73'},g.branch.id));
  g.points.forEach(([x,y],i)=>{const blank=i===g.branch.missing,answer=blank&&(S.all||S.revealed.has(g.branch.id)),value=M.format(g.branch.values[i],S.p.scale),group=el('g',{class:(blank?'missing':'given')+(answer?' answer':'')+(S.selected===g.branch.id&&blank?' selected':'')});
   if(blank){group.setAttribute('role','button');group.setAttribute('tabindex','0');group.setAttribute('aria-pressed',String(S.selected===g.branch.id));group.setAttribute('aria-label',`Branch ${g.branch.id}: ${g.branch.values.filter((_,j)=>j!==g.branch.missing).map(v=>M.format(v,S.p.scale)).join(' plus ')} plus the missing number equals ${S.p.target}${answer?'. Answer '+value:'. Select blank'}`);group.onclick=()=>select(g.branch.id);group.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(g.branch.id);$('attempt').focus();}};}
   group.append(polygon(x,y,50,{fill:answer?'#e8f4ef':'#ffffff',stroke:blank?'#197c80':'#49656d','stroke-width':4}));
   if(!blank||answer)group.append(el('text',{x,y:y+(answer?4:14),'text-anchor':'middle','font-size':value.length<=3?42:value.length===4?34:28,'font-weight':750},value));
   else group.append(el('text',{x,y:y+13,'text-anchor':'middle','font-size':38,'font-weight':700},'?'));
   if(answer)group.append(el('text',{x,y:y+29,'text-anchor':'middle','font-size':14},'answer'));svg.append(group);
  });
 }
 const allVisible=S.all||S.revealed.size===S.p.branches.length;$('answers').textContent=allVisible?'Hide answers':'Show answers';$('answers').setAttribute('aria-pressed',String(allVisible));$('code').textContent='Puzzle '+S.p.code;
}
function select(id){S.selected=id;$('selection').textContent='Branch '+id;$('attempt').value='';$('attempt').disabled=false;$('check').disabled=false;$('reveal').disabled=false;$('feedback').textContent='';draw();}
function next(){const old=S.p?.seed;let seed;do{seed=Math.floor(Math.random()*4294967296)>>>0;}while(seed===old);S.p=M.generate($('level').value,Number($('target').value),seed);S.selected=null;S.all=false;S.revealed.clear();$('selection').textContent='Select a blank';$('attempt').value='';for(const id of ['attempt','check','reveal'])$(id).disabled=true;$('feedback').textContent='';draw();}
function targets(){const config=M.levels[$('level').value];$('target').replaceChildren(...config.targets.map(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;return o;}));$('target').value=config.target;next();}
for(const [key,v]of Object.entries(M.levels)){const o=document.createElement('option');o.value=key;o.textContent=v.label;$('level').append(o);}$('level').value='upper';$('level').onchange=targets;$('target').onchange=next;$('new').onclick=next;
$('answers').onclick=()=>{if(S.all||S.revealed.size===S.p.branches.length){S.all=false;S.revealed.clear();$('attempt').value='';}else S.all=true;$('feedback').textContent='';draw();};
$('answer-form').onsubmit=e=>{e.preventDefault();if(!S.selected)return;const branch=S.p.branches.find(b=>b.id===S.selected);if(!$('attempt').value.trim()){$('feedback').textContent='Enter a number first.';return;}if(M.correct(S.p,branch,$('attempt').value)){S.revealed.add(branch.id);$('feedback').textContent='Correct — all three make '+S.p.target+'.';draw();}else $('feedback').textContent='Try again. Check the two given numbers.';};
$('reveal').onclick=()=>{if(!S.selected)return;S.revealed.add(S.selected);$('feedback').textContent='Answer revealed for branch '+S.selected+'.';draw();};
$('download').onclick=()=>{try{const data=window.KaizenNumberWebPDF.bytes(S.p,$('pdf-choice').value==='paired'),url=URL.createObjectURL(new Blob([data],{type:'application/pdf'})),a=document.createElement('a');a.href=url;a.download=`kaizen-number-web-${S.p.level}-${S.p.code.toLowerCase()}.pdf`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);$('feedback').textContent='PDF saved for puzzle '+S.p.code+'.';}catch(error){$('feedback').textContent='PDF could not be created. Please try again.';}};
$('guide-open').onclick=()=>$('guide').showModal();$('guide-close').onclick=()=>$('guide').close();targets();
})();
