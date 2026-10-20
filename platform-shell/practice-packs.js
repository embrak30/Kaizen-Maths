(() => {
  'use strict';
  let catalogPromise;
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const searchText=s=>String(s).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
  const levelNames={1:'Single variable',2:'Multiple variables',3:'Expression substitution',4:'Quadratic and cubic expressions'};
  function matches(pack,query,level,kind){
    const text=searchText([pack.id,pack.title,pack.topic,pack.description,pack.kind,levelNames[pack.level],...(pack.types||[])].join(' '));
    return (!level||String(pack.level)===String(level))&&(!kind||pack.kind===kind)&&searchText(query).split(/\s+/).filter(Boolean).every(word=>text.includes(word));
  }
  async function mount(host){
    host.innerHTML='<p role="status">Loading practice packs…</p>';
    try{
      catalogPromise??=fetch('assets/practice-packs/catalog.json').then(r=>{if(!r.ok)throw Error('catalogue');return r.json()});
      const catalog=await catalogPromise;if(!host.isConnected)return;
      const packs=catalog.packs;
      if(!Array.isArray(packs)||packs.some(p=>!/^assets\/practice-packs\/substitution\/[a-z0-9-]+\.pdf$/.test(p.pdf)||!/^assets\/practice-packs\/substitution\/previews\/[a-z0-9-]+\.png$/.test(p.preview)))throw Error('Invalid pack catalogue');
      host.innerHTML=`<div class="pack-intro"><div><span class="pack-eyebrow">READY TO TEACH · PILOT COLLECTION</span><h2>Algebraic Substitution</h2><p>A short, focused practice session. Every PDF includes the questions, a separate answer sheet, and fully worked solutions.</p></div><div class="pack-intro-stat"><strong>${packs.length}</strong><span>ready-made packs</span></div></div>
        <form class="pack-filters" role="search" aria-label="Find a practice pack"><label class="pack-search">Search packs<input id="pack-search" type="search" placeholder="Try negative values, quadratic or mixed…" autocomplete="off"></label><label>Level<select id="pack-level"><option value="">All levels</option>${Object.entries(levelNames).map(([n,title])=>`<option value="${n}">Level ${n} · ${title}</option>`).join('')}</select></label><label>Practice type<select id="pack-kind"><option value="">Focused and mixed</option><option value="Focused">Focused</option><option value="Mixed">Mixed</option></select></label><button class="button secondary" type="reset">Clear filters</button></form>
        <div class="pack-results-meta"><p id="pack-results-count" role="status" aria-live="polite"></p><span>Suggested time: approximately 10 minutes per pack</span></div><div class="pack-grid" id="pack-grid"></div>
        <div class="pack-teacher-note"><strong>Ready-made, with room to adapt.</strong><p>Question sets are fixed and numbered, so the same pack always contains the same questions and solutions. Ten minutes is a guide; adjust it for your students. Print only the question section for students, keeping the answers and working for review.</p><a class="button secondary" href="#/worksheet-generator">Build your own worksheet</a><a class="button secondary" href="#/tools/substitution">Open the substitution tool</a></div>`;
      const query=host.querySelector('#pack-search'),level=host.querySelector('#pack-level'),kind=host.querySelector('#pack-kind');
      function render(){
        const filtered=packs.filter(p=>matches(p,query.value,level.value,kind.value));
        host.querySelector('#pack-results-count').textContent=`${filtered.length} of ${packs.length} packs`;
        host.querySelector('#pack-grid').innerHTML=filtered.length?filtered.map(p=>`<article class="pack-card"><a class="pack-preview-image" href="${p.pdf}" target="_blank" rel="noopener" aria-label="Preview ${escape(p.title)} PDF"><img src="${p.preview}" alt="Question page preview for ${escape(p.title)}" loading="lazy" width="420" height="594"><span>Preview PDF ↗</span></a><div class="pack-card-body"><div class="pack-card-tags"><span>${escape(p.id)}</span><span class="${p.kind==='Mixed'?'is-mixed':''}">${escape(p.kind)}</span></div><h3>${escape(p.title)}</h3><p>${escape(p.description)}</p><div class="pack-level">Level ${p.level} · ${escape(levelNames[p.level])}</div><div class="pack-card-facts"><span>${p.questionCount} questions</span><span>~${p.estimatedMinutes} min</span><span>${p.pageCount} pages</span></div><div class="pack-includes">Questions · Answer sheet · Worked solutions</div><div class="pack-card-actions"><a class="button" href="${p.pdf}" download="${p.slug}.pdf" aria-label="Download ${escape(p.title)} PDF">Download PDF <span aria-hidden="true">↓</span></a><a href="${p.pdf}" target="_blank" rel="noopener" aria-label="Preview ${escape(p.title)} PDF">Preview ↗</a></div></div></article>`).join(''):'<div class="pack-empty"><h3>No packs match those filters.</h3><p>Try another term or clear the filters to see the full substitution collection.</p></div>';
      }
      host.querySelector('form').addEventListener('submit',e=>e.preventDefault());
      query.addEventListener('input',render);level.addEventListener('change',render);kind.addEventListener('change',render);
      host.querySelector('form').addEventListener('reset',()=>{query.value='';level.value='';kind.value='';render()});render();
    }catch(error){catalogPromise=null;if(host.isConnected){host.innerHTML='<div class="pack-empty"><h3>The pack library could not load.</h3><p>Please try again. Your worksheet builder is still available.</p><button type="button" class="button">Try again</button></div>';host.querySelector('button').addEventListener('click',()=>mount(host));}}
  }
  window.KaizenPracticePacks={mount,matches};
})();
