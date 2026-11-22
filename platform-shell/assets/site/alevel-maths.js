(function(root){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const groups={Pure:{1:'Proof',2:'Algebra & functions',3:'Coordinate geometry',4:'Sequences & series',5:'Trigonometry',6:'Exponentials & logarithms',7:'Differentiation',8:'Integration',9:'Numerical methods',10:'Vectors'},Statistics:{1:'Sampling',2:'Data presentation',3:'Probability',4:'Distributions',5:'Hypothesis testing',LDS:'Pearson large data set'},Mechanics:{6:'Quantities & units',7:'Kinematics',8:'Forces & Newton’s laws',9:'Moments'}};
function mount(container,{tools=[]}={}){
 const data=root.KaizenALevelData;if(!data){container.innerHTML='<p>The A level library could not load. Please refresh the page.</p>';return;}
 const params=new URLSearchParams(location.hash.split('?')[1]||'');let area=Object.hasOwn(groups,params.get('area'))?params.get('area'):'Pure',group=params.get('group')||Object.keys(groups[area])[0],query=params.get('q')||'';
 const link=(href,label,extra='')=>`<a href="${esc(href)}" ${extra}>${esc(label)}</a>`;
 function save(){history.replaceState(null,'','#/alevel-maths?area='+area+'&group='+group+(query?'&q='+encodeURIComponent(query):''));}
 function row(p){
  const related=[...new Set(p.tools)].map(slug=>tools.find(t=>t.slug===slug)).filter(Boolean);
  return `<article class="ap-topic-row"><span class="ap-topic-number">${esc(p.id)}</span><div class="ap-topic-name"><strong>${esc(p.title)}</strong></div><div class="ap-row-links">${link(p.student,'Topic Practice',`target="_blank" rel="noopener" aria-label="${esc(p.id)} Topic Practice PDF"`)}${link(p.teacher,'Teacher Pack',`target="_blank" rel="noopener" aria-label="${esc(p.id)} Teacher Pack PDF"`)}${related.length===1?link('#/tools/'+related[0].slug,'Teaching Tool',`aria-label="${esc(p.id)} Teaching Tool: ${esc(related[0].title)}"`):related.length>1?`<details class="ap-tool-menu"><summary>Teaching Tools</summary><div>${related.map(t=>link('#/tools/'+t.slug,t.title)).join('')}</div></details>`:''}</div></article>`;
 }
 function render(){
  if(!Object.hasOwn(groups[area],group))group=Object.keys(groups[area])[0];
  const search=query.trim().toLowerCase(),shown=data.packs.filter(p=>p.area===area&&(search?`${p.id} ${p.title} ${groups[area][p.group]}`.toLowerCase().includes(search):String(p.group)===group));
  container.querySelector('#alevel-groups').innerHTML=Object.entries(groups[area]).map(([key,title])=>`<button type="button" data-alevel-group="${esc(key)}" aria-pressed="${!search&&key===group}">${esc(title)}</button>`).join('');
  container.querySelector('#alevel-results').innerHTML=`<div class="ap-list-heading"><h2>${search?'Search results':esc(groups[area][group])}</h2><span role="status">${shown.length} packs</span></div><div class="ap-topic-list">${shown.length?shown.map(row).join(''):'<p class="ap-empty">No matching topics. Try another search.</p>'}</div>${group==='LDS'&&!search?`<p class="alevel-source">${link(data.officialDataSet,'Open Pearson’s official weather data workbook (XLS)','target="_blank" rel="noopener"')}. The site’s separate Kaizen training data tool uses fictional data.</p>`:''}`;
  container.querySelectorAll('[data-alevel-group]').forEach(b=>b.onclick=()=>{group=b.dataset.alevelGroup;query='';container.querySelector('#alevel-search').value='';save();render();});
  container.querySelectorAll('[data-alevel-area]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.alevelArea===area)));
 }
 container.innerHTML=`<section class="ap-library alevel-library"><header class="ap-compact-heading"><h1>A level Mathematics</h1><p>Edexcel UK 9MA0 · Eight questions. One A4 page. Separate worked solutions and suggested marks.</p></header><div class="resource-complete-download"><a href="/assets/ready-made-complete/alevel-maths-complete.pdf" target="_blank" rel="noopener" aria-label="Complete collection PDF: all topics and teacher solutions">Complete PDF</a><span>All topics in this collection, with teacher solutions</span></div><section class="ap-filters" aria-label="Find A level worksheets"><div class="ap-course-switch" role="group" aria-label="Subject area">${Object.keys(groups).map(a=>`<button type="button" data-alevel-area="${a}">${a}</button>`).join('')}</div><label class="ap-search"><span class="ap-visually-hidden">Find a topic</span><input id="alevel-search" type="search" value="${esc(query)}" placeholder="Find a topic or reference"></label></section><nav id="alevel-groups" class="ap-unit-tabs" aria-label="Choose a topic"></nav><div id="alevel-results"></div><footer class="ap-library-footer">Original Kaizen topic practice aligned to Edexcel UK 9MA0. These are not official Pearson papers or mark schemes. Teaching tools may contain additional activities beyond this specification. Both Pure papers can assess the full Pure content.</footer></section>`;
 container.querySelectorAll('[data-alevel-area]').forEach(b=>b.onclick=()=>{area=b.dataset.alevelArea;group=Object.keys(groups[area])[0];query='';container.querySelector('#alevel-search').value='';save();render();});
 container.querySelector('#alevel-search').oninput=e=>{query=e.target.value;save();render();};render();
}
root.KaizenALevel={mount};
})(typeof window!=='undefined'?window:globalThis);
