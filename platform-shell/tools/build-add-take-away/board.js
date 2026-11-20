(() => {
 'use strict';
 const $=id=>document.getElementById(id),MAX=30;
 let mode='add',items=[],other=[],initial=5,initialB=3,nextId=1,revealed=false,history=[],lastAdded=[],message='',drag=null,suppressClick=false,animateCount=false;
 const nouns={sweet:['sweet','sweets'],star:['star','stars'],apple:['apple','apples'],counter:['counter','counters']};
 function collection(n){return Array.from({length:n},()=>({id:nextId++,removed:false,added:false}));}
 function active(){return items.filter(x=>!x.removed);}
 function snapshot(){history.push(JSON.stringify({items,other,initial,initialB,revealed,message,lastAdded}));if(history.length>80)history.shift();}
 function start(n){initial=n;items=collection(n);other=collection(mode==='compare'?initialB:0);$('start-b').value=initialB;history=[];revealed=false;lastAdded=[];message=mode==='subtract'?`Start with ${n}. Take some away.`:mode==='compare'?'Match the objects. Which group has more?':`Start with ${n}. Add some more.`;render();}
 function step(){return Number($('step').value);}
 function change(group='a'){
  if(mode==='subtract'){
   const candidates=active().slice(-step());if(!candidates.length)return;
   snapshot();candidates.forEach(x=>x.removed=true);lastAdded=[];revealed=false;
   message=`Take away ${candidates.length}. How many are left?`;
  }else{
   const list=group==='b'?other:items,n=Math.min(step(),MAX-list.length);if(!n)return;
   snapshot();const before=list.length,added=collection(n);added.forEach(x=>x.added=true);list.push(...added);lastAdded=added.map(x=>x.id);revealed=false;
   message=mode==='compare'?`Added ${n} to group ${group.toUpperCase()}. Which group has more?`:$('count-method').value==='on'?`${before}… ${added.map((_,i)=>before+i+1).join(', ')}.`:`Count all ${list.length} objects.`;
  }
  animateCount=mode==='add';render();
 }
 function move(id,toRemoved){
  if(mode!=='subtract')return;const item=items.find(x=>x.id===id);if(!item||item.removed===toRemoved)return;
  snapshot();item.removed=toRemoved;revealed=false;lastAdded=[];message=toRemoved?'Take away 1. How many are left?':'Put 1 back. How many are there now?';render();$('scene').querySelector(`[data-id="${id}"]`)?.focus({preventScroll:true});
 }
 function object(item,zone,matched=false){
  const button=document.createElement('button');button.className='token'+(lastAdded.includes(item.id)?' new':'')+(item.removed?' removed':'')+(matched?' matched':'');
  if(item.removed&&$('remove-style').value==='cross')button.classList.add('crossed');
  if(animateCount&&(lastAdded.includes(item.id)||($('count-method').value==='all'&&lastAdded.length&&!item.removed))){button.classList.add('counting');const order=$('count-method').value==='all'?items.indexOf(item):lastAdded.indexOf(item.id);button.style.setProperty('--count-delay',`${Math.max(0,order)*120}ms`);}
  button.dataset.id=item.id;button.dataset.zone=zone;
  const name=nouns[$('objects').value][0];button.setAttribute('aria-label',mode==='subtract'?`${item.removed?'Return':'Take away'} ${name} ${items.indexOf(item)+1}`:`${zone==='b'?'Group B':'Group A'} ${name} ${(zone==='b'?other:items).indexOf(item)+1}`);
  if(mode!=='subtract'){button.tabIndex=-1;button.setAttribute('aria-disabled','true');}
  button.innerHTML=`<svg aria-hidden="true"><use href="#${$('objects').value}"></use></svg>`;
  return button;
 }
 function group(title,zone,list,count,matchCount=0){
  const el=document.createElement('div');el.className='group';el.dataset.zone=zone;
  const label=document.createElement('div');label.className='group-label';label.textContent=title;
  const num=document.createElement('span');num.textContent=$('show-count').checked?String(count):'';label.append(num);el.append(label);
  const grid=document.createElement('div');grid.className='object-grid';
  list.forEach((item,i)=>{if(item.removed&&zone==='a'&&$('remove-style').value==='move'){const slot=document.createElement('span');slot.className='object-slot';slot.setAttribute('aria-hidden','true');grid.append(slot);}else grid.append(object(item,zone,mode==='compare'&&i<matchCount));});
  if(!list.length){const empty=document.createElement('span');empty.className='empty';empty.textContent=zone==='removed'?'Move objects here':mode==='compare'?'No objects yet':'An empty collection';grid.append(empty);}
  el.append(grid);return el;
 }
 function render(){
  const count=active().length,removed=items.length-count,show=$('show-count').checked,compare=mode==='compare',subtract=mode==='subtract',n=step();
  document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
  $('activity-label').textContent=subtract?'TAKE AWAY':compare?'COMPARE':'ADD MORE';
  $('prompt').textContent=subtract?'How many are left?':compare?'Which group has more?':'How many altogether?';
  $('total').textContent=show&&!compare?String(count):'';
  const changeA=subtract?Math.min(n,count):Math.min(n,MAX-items.length),changeB=Math.min(n,MAX-other.length);
  $('change').textContent=subtract?`Take away ${changeA||n}`:compare?`Add ${changeA||n} to group A`:`Add ${changeA||n}`;
  $('change').disabled=subtract?count===0:items.length===MAX;
  $('change-b').hidden=!compare;$('change-b').textContent=`Add ${changeB||n} to group B`;$('change-b').disabled=other.length===MAX;
  $('compare-options').hidden=!compare;$('subtract-options').hidden=!subtract;$('addition-options').hidden=mode!=='add';
  const largest=Math.max(items.length,other.length);
  $('scene').className='scene'+(subtract?' subtraction':compare?' comparison':'')+(largest>15?' dense':'')+(largest>25?' very-dense':'');
  const scene=$('scene');scene.replaceChildren();
  if(compare){const pairs=Math.min(items.length,other.length);scene.append(group('Group A','a',items,items.length,pairs),group('Group B','b',other,other.length,pairs));}
  else if(subtract){const cross=$('remove-style').value==='cross';scene.append(group('Our collection','a',items,count),group('Taken away','removed',cross?[]:items.filter(x=>x.removed),removed));if(cross)scene.lastChild.querySelector('.empty')?.replaceChildren(document.createTextNode('Crossed-out objects stay in the collection.'));}
  else scene.append(group('Our collection','a',items,count));
  let narration=message;
  if(!show)narration=mode==='add'?'Look at our collection. How many altogether?':subtract?'Look at the objects. How many are left?':'Match the objects. Which group has more?';
  $('narration').textContent=narration;
  const result=compare?Math.abs(items.length-other.length):count;
  $('math-line').replaceChildren();
  if($('show-equation').checked){
   const text=document.createElement('span');text.textContent=compare?`${Math.max(items.length,other.length)} − ${Math.min(items.length,other.length)} = `:subtract?`${initial} − ${removed} = `:`${initial} + ${items.length-initial} = `;
   const answer=document.createElement('span');answer.textContent=revealed?String(result):'?';answer.className=revealed?'':'unknown';$('math-line').append(text,answer);
  }else if(revealed){$('math-line').textContent=compare?(result===0?'Both groups have the same number.':`Group ${items.length>other.length?'A':'B'} has ${result} more.`):`${result} ${nouns[$('objects').value][result===1?0:1]} ${subtract?'left':'altogether'}`;}
  $('answer').textContent=revealed?'Hide answer':'Reveal answer';$('undo').disabled=!history.length;
  $('hint').textContent=subtract?'Tap to take away or return. Drag into the taken-away area.':compare?'Outlined objects make pairs. Look for the extras.':items.length===MAX?'Collection full. Undo or Reset to make space.':'Gold shows the latest addition. Blue objects were already there.';
  animateCount=false;fitObjects();window.requestAnimationFrame?.(fitObjects);
 }
 function fitObjects(){
  const grids=[...$('scene').querySelectorAll('.object-grid')];if(!grids.length)return;
  const measurements=grids.map(g=>({width:g.clientWidth-12,height:g.clientHeight-12}));
  if(measurements.some(m=>m.width<=0||m.height<=0))return;
  // Wide boards use two groups of five per row; narrower / paired boards use five.
  const columns=Math.min(...measurements.map(m=>m.width))>=600?10:5;
  const rows=Math.max(1,...grids.map(g=>Math.ceil(g.children.length/columns)));
  const gap=Math.min(8,Math.max(2,Math.floor(Math.min(...measurements.map(m=>m.height))/rows/5)));
  const divider=columns===10?16:0;
  const size=Math.max(1,Math.floor(Math.min(100,...measurements.flatMap(m=>[(m.width-(columns-1)*gap-divider)/columns,(m.height-(rows-1)*gap)/rows]))));
  for(const grid of grids){
   grid.style.gridTemplateColumns=columns===10?`repeat(5, ${size}px) ${16-gap}px repeat(5, ${size}px)`:`repeat(5, ${size}px)`;
   grid.style.gridAutoRows=`${size}px`;grid.style.gap=`${gap}px`;
   [...grid.children].forEach((child,i)=>{if(child.classList.contains('empty'))return;const col=i%columns;child.style.gridColumn=String(col+1+(columns===10&&col>=5?1:0));child.style.gridRow=String(Math.floor(i/columns)+1);});
  }
 }
 if(window.ResizeObserver)new window.ResizeObserver(fitObjects).observe($('scene'));
 window.addEventListener('resize',fitObjects);document.addEventListener('fullscreenchange',fitObjects);
 document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{if(mode===b.dataset.mode)return;mode=b.dataset.mode;start(initial);}));
 $('build').onclick=()=>{const value=$('start').value,n=Number(value);if(value.trim()===''||!Number.isInteger(n)||n<0||n>MAX){$('start').setCustomValidity('Choose a whole number from 0 to 30.');$('start').reportValidity();return;}$('start').setCustomValidity('');start(n);};
 $('build-b').onclick=()=>{const value=$('start-b').value,n=Number(value);if(value.trim()===''||!Number.isInteger(n)||n<0||n>MAX){$('start-b').setCustomValidity('Choose a whole number from 0 to 30.');$('start-b').reportValidity();return;}$('start-b').setCustomValidity('');snapshot();initialB=n;other=collection(n);revealed=false;lastAdded=[];message='Match the objects. Which group has more?';render();};
 $('start-b').oninput=()=>$('start-b').setCustomValidity('');
 $('start').oninput=()=>$('start').setCustomValidity('');$('start').onkeydown=e=>{if(e.key==='Enter')$('build').click();};
 $('change').onclick=()=>change();$('change-b').onclick=()=>change('b');
 for(const id of ['objects','step','show-count','show-equation','remove-style','count-method'])$(id).onchange=()=>{render();};
 $('answer').onclick=()=>{revealed=!revealed;render();};
 $('reset').onclick=()=>start(initial);
 $('undo').onclick=()=>{if(!history.length)return;const saved=JSON.parse(history.pop());({items,other,initial,initialB,revealed,message,lastAdded}=saved);$('start-b').value=initialB;render();};
 $('scene').onclick=e=>{if(suppressClick){suppressClick=false;return;}const token=e.target.closest('.token');if(token){const item=items.find(x=>x.id===Number(token.dataset.id));if(item)move(item.id,!item.removed);}};
 $('scene').onpointerdown=e=>{const token=e.target.closest('.token');if(mode!=='subtract'||!token)return;drag={id:Number(token.dataset.id),x:e.clientX,y:e.clientY,token};token.setPointerCapture(e.pointerId);};
 $('scene').onpointermove=e=>{if(!drag||Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<10)return;drag.token.classList.add('drag-source');document.querySelectorAll('.drop-target').forEach(x=>x.classList.remove('drop-target'));document.elementFromPoint(e.clientX,e.clientY)?.closest('.group')?.classList.add('drop-target');};
 $('scene').onpointerup=e=>{if(!drag)return;const current=drag;drag=null;current.token.classList.remove('drag-source');document.querySelectorAll('.drop-target').forEach(x=>x.classList.remove('drop-target'));const distance=Math.hypot(e.clientX-current.x,e.clientY-current.y);if(distance<10)return;suppressClick=true;window.setTimeout(()=>{suppressClick=false;},0);const zone=document.elementFromPoint(e.clientX,e.clientY)?.closest('.group')?.dataset.zone;if(zone==='a'||zone==='removed')move(current.id,zone==='removed');};
 $('scene').onpointercancel=()=>{drag?.token.classList.remove('drag-source');drag=null;document.querySelectorAll('.drop-target').forEach(x=>x.classList.remove('drop-target'));};
 $('help').onclick=()=>$('guide').showModal();
 $('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch(_){$('narration').textContent='Use your browser’s full-screen option to enlarge the board.';}};
 document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen';});
 start(5);
})();
