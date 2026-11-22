(function(root){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function mount(container,{topicId='',tools=[]}={}){
 const data=root.KaizenAPCalculusData;if(!data){container.innerHTML='<p>The topic library could not load. Please refresh the page.</p>';return;}
 const all=data.units.flatMap(u=>u.topics.map(t=>({...t,unit:u.number}))),params=new URLSearchParams(location.hash.split('?')[1]||'');
 const requested=all.find(t=>t.id===topicId);
 let course=params.get('course')==='bc'||requested?.scope==='BC only'?'bc':'ab',query=params.get('q')||'',available=params.get('available')==='1',unit=Number(params.get('unit'))||requested?.unit||1;
 const hasPack=t=>Boolean(t.pack?.questions&&t.pack?.answers);
 function save(){history.replaceState(null,'','#/ap-calculus?course='+course+'&unit='+unit+(query?'&q='+encodeURIComponent(query):'')+(available?'&available=1':''));}
 function link(url,label,extra=''){return `<a href="${esc(url)}" ${extra}>${label}</a>`;}
 function row(t){
  const p=t.pack,related=[...new Set(t.tools||[])].map(slug=>tools.find(x=>x.slug===slug)).filter(Boolean);
  return `<article class="ap-topic-row${t.id===topicId?' ap-current-topic':''}" id="ap-topic-${esc(t.id)}"><span class="ap-topic-number">${esc(t.id)}</span><div class="ap-topic-name"><strong>${esc(t.title)}</strong>${t.scope==='BC only'?'<small>BC only</small>':''}</div><div class="ap-row-links">${hasPack(t)?link(p.questions,'Topic Practice',`target="_blank" rel="noopener" aria-label="${esc(t.id)} Topic Practice PDF"`)+link(p.answers,'Teacher Pack',`target="_blank" rel="noopener" aria-label="${esc(t.id)} Teacher Pack PDF"`):'<span class="ap-unavailable">Not yet available</span>'}${related.length===1?link('#/tools/'+related[0].slug,related[0].slug==='squeeze-theorem'?'Squeeze Explainer':'Teaching Tool',`aria-label="${esc(t.id)} Teaching Tool: ${esc(related[0].title)}"`):related.length>1?`<details class="ap-tool-menu"><summary>Teaching Tools</summary><div>${related.map(x=>link('#/tools/'+x.slug,esc(x.title))).join('')}</div></details>`:''}</div></article>`;
 }
 function render(){
  const eligible=data.units.filter(u=>course==='bc'||u.topics.some(t=>t.scope!=='BC only'));
  if(!eligible.some(u=>u.number===unit))unit=eligible[0].number;
  const search=query.trim().toLowerCase();
  const shown=all.filter(t=>(course==='bc'||t.scope!=='BC only')&&(!available||hasPack(t))&&(search?`${t.id} ${t.title} ${data.units.find(u=>u.number===t.unit).title}`.toLowerCase().includes(search):t.unit===unit));
  container.querySelector('#ap-unit-tabs').innerHTML=eligible.map(u=>`<button type="button" data-ap-unit="${u.number}" aria-pressed="${!search&&unit===u.number}" title="${esc(u.title)}">Unit ${u.number}</button>`).join('');
  const selected=data.units.find(u=>u.number===unit);
  container.querySelector('#ap-results').innerHTML=`<div class="ap-list-heading"><h2>${search?'Search results':esc(selected.title)}</h2><span role="status">${shown.length} ${shown.length===1?'topic':'topics'} · ${shown.filter(hasPack).length} packs</span></div><div class="ap-topic-list">${shown.length?shown.map(row).join(''):'<p class="ap-empty">No matching topics. Try another unit or search.</p>'}</div>`;
  container.querySelectorAll('[data-ap-unit]').forEach(b=>b.onclick=()=>{unit=Number(b.dataset.apUnit);query='';container.querySelector('#ap-search').value='';save();render();});
  container.querySelectorAll('[data-ap-course]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.apCourse===course)));
 }
 container.innerHTML=`<section class="ap-library"><header class="ap-compact-heading"><h1>AP Calculus</h1><p>Eight questions. One A4 page. Separate worked solutions.</p></header><div class="resource-complete-download"><a href="/assets/ready-made-complete/ap-calculus-complete.pdf" target="_blank" rel="noopener" aria-label="Complete collection PDF: all topics and teacher solutions">Complete PDF</a><span>All topics in this collection, with teacher solutions</span></div><section class="ap-filters" aria-label="Find AP Calculus worksheets"><div class="ap-course-switch" role="group" aria-label="Course"><button type="button" data-ap-course="ab">AB</button><button type="button" data-ap-course="bc">BC <small>includes AB</small></button></div><label class="ap-search"><span class="ap-visually-hidden">Find a topic</span><input id="ap-search" type="search" value="${esc(query)}" placeholder="Find a topic or number"></label><label class="ap-available-filter"><input id="ap-available" type="checkbox" ${available?'checked':''}> Available packs only</label></section><nav id="ap-unit-tabs" class="ap-unit-tabs" aria-label="Choose a unit"></nav><div id="ap-results"></div><footer class="ap-library-footer">Original Kaizen topic practice. Suggested marks are not an official College Board scoring rubric. Select a teaching tool activity appropriate for your class.</footer></section>`;
 container.querySelectorAll('[data-ap-course]').forEach(b=>b.onclick=()=>{course=b.dataset.apCourse;if(course==='ab'&&unit>8)unit=1;save();render();});
 container.querySelector('#ap-search').oninput=e=>{query=e.target.value;save();render();};container.querySelector('#ap-available').onchange=e=>{available=e.target.checked;save();render();};render();
}
root.KaizenAPCalculus={mount};
})(typeof window!=='undefined'?window:globalThis);
