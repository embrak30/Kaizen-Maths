(function(root){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const areas=['Number','Algebra','Ratio & Proportion','Geometry & Measures','Probability','Statistics'];
const groups={
 'Number':{'Calculations':['N01','N02','N03','N04','N05','N06','N07','N08'],'Indices & exact numbers':['N09','N10','N14','N15'],'Accuracy':['N11','N12','N13']},
 'Algebra':{'Expressions & formulae':['A01','A02','A03','A04','A05','A06','A08','A09','A19','A20','A25'],'Equations & inequalities':['A07','A10','A16','A17','A18','A21','A26','A28','A29','A32'],'Graphs & coordinates':['A12','A13','A14','A15','A23','A24','A27','A30','A31'],'Sequences':['A11','A22']},
 'Ratio & Proportion':{'Ratios & scales':['R01','R02','R03','R04'],'Units & proportion':['R05','R06','R10','R11'],'Percentages & growth':['R07','R08','R09','R12']},
 'Geometry & Measures':{'Angles & reasoning':['G01','G02','G03','G04','G05','G26'],'Transformations & vectors':['G06','G07','G08','G27','G28'],'Area & solids':['G09','G10','G11','G12','G13','G14','G15','G16','G17'],'Constructions & loci':['G18','G19'],'Triangles & similarity':['G20','G21','G22','G23','G24','G25','G29']}
};
function mount(container,{tools=[]}={}){
 const data=root.KaizenGCSEData;if(!data){container.innerHTML='<p>The GCSE library could not load. Please refresh the page.</p>';return;}
 const params=new URLSearchParams(location.hash.split('?')[1]||'');let tier=params.get('tier')==='higher'?'higher':'foundation',area=areas.includes(params.get('area'))?params.get('area'):'Number',query=params.get('q')||'',group=params.get('group')||'';
 const link=(href,label,extra='')=>`<a href="${esc(href)}" ${extra}>${esc(label)}</a>`;
 function save(){history.replaceState(null,'','#/gcse-maths?tier='+tier+'&area='+encodeURIComponent(area)+(group?'&group='+encodeURIComponent(group):'')+(query?'&q='+encodeURIComponent(query):''));}
 function row(p){const related=[...new Set(p.tools||[])].map(slug=>tools.find(t=>t.slug===slug)).filter(Boolean);
  return `<article class="ap-topic-row"><span class="ap-topic-number">${esc(p.id)}</span><div class="ap-topic-name"><strong>${esc(p.title)}</strong>${p.tier==='Higher'?'<small>Higher only</small>':''}</div><div class="ap-row-links">${link(p.student,'Student Pack',`target="_blank" rel="noopener" aria-label="${esc(p.id)} Student Pack PDF"`)}${link(p.teacher,'Teacher Pack',`target="_blank" rel="noopener" aria-label="${esc(p.id)} Teacher Pack PDF"`)}${related.length===1?link('#/tools/'+related[0].slug,'Teaching Tool',`aria-label="${esc(p.id)} Teaching Tool: ${esc(related[0].title)}"`):related.length>1?`<details class="ap-tool-menu"><summary>Teaching Tools</summary><div>${related.map(t=>link('#/tools/'+t.slug,t.title)).join('')}</div></details>`:''}</div></article>`;
 }
 function render(){const localGroups=groups[area]||{},names=Object.keys(localGroups);if(!names.includes(group))group=names[0]||'';const search=query.trim().toLowerCase(),shown=data.packs.filter(p=>(tier==='higher'||p.tier==='Foundation')&&(search?`${p.id} ${p.title} ${p.area}`.toLowerCase().includes(search):p.area===area&&(!group||localGroups[group].includes(p.id))));
  container.querySelector('#gcse-areas').innerHTML=areas.map(a=>`<button type="button" data-gcse-area="${esc(a)}" aria-pressed="${!search&&area===a}">${esc(a)}</button>`).join('');
  container.querySelector('#gcse-results').innerHTML=`<div class="ap-list-heading"><h2>${search?'Search results':esc(area)+(group?' · '+esc(group):'')}</h2><span role="status">${shown.length} packs</span></div><div class="ap-topic-list">${shown.length?shown.map(row).join(''):'<p class="ap-empty">No matching topics in this tier. Try another search or select Higher.</p>'}</div>`;
  container.querySelector('#gcse-groups').innerHTML=search?'':names.map(g=>`<button type="button" data-gcse-group="${esc(g)}" aria-pressed="${group===g}">${esc(g)}</button>`).join('');
  container.querySelectorAll('[data-gcse-group]').forEach(b=>b.onclick=()=>{group=b.dataset.gcseGroup;save();render();});
  container.querySelectorAll('[data-gcse-area]').forEach(b=>b.onclick=()=>{area=b.dataset.gcseArea;group='';query='';container.querySelector('#gcse-search').value='';save();render();});
  container.querySelectorAll('[data-gcse-tier]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gcseTier===tier)));
 }
 container.innerHTML=`<section class="ap-library gcse-library"><header class="ap-compact-heading"><h1>GCSE Mathematics</h1><p>Board-neutral · GCSE (9–1), England · Eight questions per A4 sheet, with separate worked solutions.</p></header><section class="ap-filters" aria-label="Find GCSE worksheets"><div class="ap-course-switch" role="group" aria-label="Tier"><button type="button" data-gcse-tier="foundation">Foundation</button><button type="button" data-gcse-tier="higher">Higher <small>includes Foundation</small></button></div><label class="ap-search"><span class="ap-visually-hidden">Find a GCSE topic</span><input id="gcse-search" type="search" value="${esc(query)}" placeholder="Find a topic across all subjects"></label></section><nav id="gcse-areas" class="ap-unit-tabs" aria-label="Choose a GCSE subject"></nav><nav id="gcse-groups" class="ap-unit-tabs gcse-group-tabs" aria-label="Choose a topic group"></nav><div id="gcse-results"></div><footer class="ap-library-footer">Original Kaizen topic practice based on the ${link(data.contentSource,'common GCSE subject content','target="_blank" rel="noopener"')}. Foundation sheets also support Higher fluency; additional content is labelled Higher only. These are not official exam papers or mark schemes. Check your exam board’s specification and calculator requirements. Teaching tools may contain additional activities beyond GCSE.</footer></section>`;
 container.querySelectorAll('[data-gcse-tier]').forEach(b=>b.onclick=()=>{tier=b.dataset.gcseTier;save();render();});container.querySelector('#gcse-search').oninput=e=>{query=e.target.value;save();render();};render();
}
root.KaizenGCSE={mount};
})(typeof window!=='undefined'?window:globalThis);
