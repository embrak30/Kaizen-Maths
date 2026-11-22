(function(root){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const areas=['Number & Algebra','Functions','Geometry & Trigonometry','Statistics & Probability','Calculus'];
function mount(container,{tools=[]}={}){
 const data=root.KaizenIBData;
 if(!data){container.innerHTML='<p>The IB library could not load. Please refresh the page.</p>';return;}
 const params=new URLSearchParams(location.hash.split('?')[1]||'');
 let course=Object.hasOwn(data.courses,params.get('course'))?params.get('course'):'aa-sl',area=areas.includes(params.get('area'))?params.get('area'):areas[0],group=params.get('group')||'',query=params.get('q')||'',page=0;
 const link=(href,label,extra='')=>`<a href="${esc(href)}" ${extra}>${esc(label)}</a>`;
 function save(){history.replaceState(null,'','#/ib-maths?course='+course+'&area='+encodeURIComponent(area)+(group?'&group='+encodeURIComponent(group):'')+(query?'&q='+encodeURIComponent(query):''));}
 function row(p){const related=(p.tools||[]).map(slug=>tools.find(t=>t.slug===slug)).filter(Boolean);
  return `<article class="ap-topic-row"><span class="ap-topic-number">${esc(p.id)}</span><div class="ap-topic-name"><strong>${esc(p.title)}</strong><small>${p.calculator==='required'?'Use a graphing calculator':(course.startsWith('ai-')?'Graphing calculator permitted':'Calculator optional')}${p.courses.some(c=>c.endsWith('-sl'))?'':' · HL'}</small></div><div class="ap-row-links">${link(p.student,'Topic Practice',`target="_blank" rel="noopener" aria-label="${esc(p.id)} Topic Practice PDF"`)}${link(p.teacher,'Teacher Pack',`target="_blank" rel="noopener" aria-label="${esc(p.id)} Teacher Pack PDF"`)}${related.length?link('#/tools/'+related[0].slug,'Teaching Tool',`aria-label="${esc(p.id)} Teaching Tool"`):''}</div></article>`;
 }
 function render(){
  const eligible=data.packs.filter(p=>p.courses.includes(course));
  const groups=[...new Set(eligible.filter(p=>p.area===area).map(p=>p.group))];if(!groups.includes(group))group=groups[0]||'';
  const search=query.trim().toLowerCase(),shown=eligible.filter(p=>search?`${p.id} ${p.title} ${p.area} ${p.group}`.toLowerCase().includes(search):p.area===area&&p.group===group);
  page=Math.min(page,Math.max(0,Math.ceil(shown.length/8)-1));
  container.querySelector('#ib-areas').innerHTML=areas.map(a=>`<button type="button" data-ib-area="${esc(a)}" aria-pressed="${!search&&area===a}">${esc(a)}</button>`).join('');
  container.querySelector('#ib-groups').innerHTML=search?'':groups.map(g=>`<button type="button" data-ib-group="${esc(g)}" aria-pressed="${group===g}">${esc(g)}</button>`).join('');
  container.querySelector('#ib-results').innerHTML=`<div class="ap-list-heading"><h2>${search?'Search results':esc(group)}</h2><span role="status">${shown.length} packs${shown.length>8?' · '+(page*8+1)+'–'+Math.min(shown.length,page*8+8):''}</span></div><div class="ap-topic-list">${shown.length?shown.slice(page*8,page*8+8).map(row).join(''):'<p class="ap-empty">No matching topics in '+esc(data.courses[course])+'. Try another search.</p>'}</div>${shown.length>8?`<nav class="ib-pages" aria-label="More topic packs"><button type="button" id="ib-prev" ${page===0?'disabled':''}>← Previous</button><span>Page ${page+1} of ${Math.ceil(shown.length/8)}</span><button type="button" id="ib-next" ${page*8+8>=shown.length?'disabled':''}>Next →</button></nav>`:''}`;
  container.querySelectorAll('[data-ib-area]').forEach(b=>b.onclick=()=>{area=b.dataset.ibArea;group='';query='';page=0;container.querySelector('#ib-search').value='';render();save();});
  container.querySelectorAll('[data-ib-group]').forEach(b=>b.onclick=()=>{group=b.dataset.ibGroup;page=0;render();save();});
  container.querySelectorAll('[data-ib-course]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.ibCourse===course)));
  const prev=container.querySelector('#ib-prev'),next=container.querySelector('#ib-next');if(prev)prev.onclick=()=>{page--;render();};if(next)next.onclick=()=>{page++;render();};
 }
 container.innerHTML=`<section class="ap-library ib-library"><header class="ap-compact-heading"><h1>IB Mathematics</h1><p>AA · Analysis and Approaches &nbsp; | &nbsp; AI · Applications and Interpretation<br>First assessment 2021 · exams through 2028 · Eight questions per A4 sheet, with separate worked solutions.</p></header><div class="resource-complete-download"><a href="/assets/ready-made-complete/ib-maths-complete.pdf" target="_blank" rel="noopener" aria-label="Complete collection PDF: all topics and teacher solutions">Complete PDF</a><span>All topics in this collection, with teacher solutions</span></div><section class="ap-filters" aria-label="Find IB worksheets"><div class="ap-course-switch" role="group" aria-label="IB course">${Object.entries(data.courses).map(([id,title])=>`<button type="button" data-ib-course="${id}">${esc(title)}</button>`).join('')}</div><label class="ap-search"><span class="ap-visually-hidden">Find an IB topic</span><input id="ib-search" type="search" value="${esc(query)}" placeholder="Find a topic in this course"></label></section><nav id="ib-areas" class="ap-unit-tabs" aria-label="Mathematical area"></nav><nav id="ib-groups" class="ap-unit-tabs gcse-group-tabs" aria-label="Topic group"></nav><div id="ib-results"></div><footer class="ap-library-footer">Original Kaizen topic practice; suggested marks are not official IB mark schemes. HL includes the relevant SL packs. This collection supports topic practice, not a complete mock exam or the mathematical exploration. ${link(data.contentSource,'IB course information','target="_blank" rel="noopener"')}. The 2029 syllabus revision is not included. Teaching tools may include activities beyond the selected course.</footer></section>`;
 container.querySelectorAll('[data-ib-course]').forEach(b=>b.onclick=()=>{course=b.dataset.ibCourse;page=0;render();save();});
 container.querySelector('#ib-search').oninput=e=>{query=e.target.value;page=0;render();save();};render();
}
root.KaizenIB={mount};
})(typeof window!=='undefined'?window:globalThis);
