(() => {
 'use strict';
 const $=id=>document.getElementById(id),MAX=30;
 let mode='add',items=[],other=[],initial=5,initialB=3,nextId=1,revealed=false,history=[],lastAdded=[],message='',drag=null,suppressClick=false;
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
  render();
 }
 function move(id,toRemoved){
  if(mode!=='subtract')return;const item=items.find(x=>x.id===id);if(!item||item.removed===toRemoved)return;
  snapshot();item.removed=toRemoved;revealed=false;lastAdded=[];message=toRemoved?'Take away 1. How many are left?':'Put 1 back. How many are there now?';render();
 }
 function object(item,zone,matched=false){
  const button=document.createElement('button');button.className='token'+(item.added?' new':'')+(item.removed?' removed':'')+(matched?' matched':'');
  if(item.removed&&$('remove-style').value==='cross')button.classList.add('crossed');
  if(lastAdded.includes(item.id)||($('count-method').value==='all'&&lastAdded.length&&!item.removed))button.classList.add('counting');
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
  list.forEach((item,i)=>grid.append(object(item,zone,mode==='compare'&&i<matchCount)));
  if(!list.length){const empty=document.createElement('span');empty.className='empty';empty.textContent=zone==='removed'?'Move objects here':mode==='compare'?'No objects yet':'An empty collection';grid.append(empty);}
  el.append(grid);return el;
 }
 function render(){
  const count=active().length,removed=items.length-count,show=$('show-count').checked,compare=mode==='compare',subtract=mode==='subtract',n=step();
  document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
  $('activity-label').textContent=subtract?'TAKE AWAY':compare?'COMPARE':'ADD MORE';
  $('prompt').textContent=subtract?'How many are left?':compare?'Which group has more?':'How many altogether?';
  $('total').textContent=show&&!compare?String(count):'';
  $('change').textContent=subtract?`Take away ${n}`:compare?`Add ${n} to group A`:`Add ${n}`;
  $('change').disabled=subtract?count===0:items.length===MAX;
  $('change-b').hidden=!compare;$('change-b').textContent=`Add ${n} to group B`;$('change-b').disabled=other.length===MAX;
  $('compare-options').hidden=!compare;$('subtract-options').hidden=!subtract;$('addition-options').hidden=mode!=='add';
  const largest=Math.max(items.length,other.length);
  $('scene').className='scene'+(subtract?' subtraction':compare?' comparison':'')+(largest>15?' dense':'')+(largest>25?' very-dense':'');
  const scene=$('scene');scene.replaceChildren();
  if(compare){const pairs=Math.min(items.length,other.length);scene.append(group('Group A','a',items,items.length,pairs),group('Group B','b',other,other.length,pairs));}
  else if(subtract){const cross=$('remove-style').value==='cross';scene.append(group('Our collection','a',cross?items:active(),count),group('Taken away','removed',cross?[]:items.filter(x=>x.removed),removed));if(cross)scene.lastChild.querySelector('.empty')?.replaceChildren(document.createTextNode('Crossed-out objects stay in the collection.'));}
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
  $('hint').textContent=subtract?'Tap to take away or return. Drag into the taken-away area.':compare?'Outlined objects make pairs. Look for the extras.':'Gold objects are new. Blue objects were there at the start.';
 }
 document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{if(mode===b.dataset.mode)return;mode=b.dataset.mode;start(initial);}));
 $('build').onclick=()=>{const value=$('start').value,n=Number(value);if(value.trim()===''||!Number.isInteger(n)||n<0||n>MAX){$('start').setCustomValidity('Choose a whole number from 0 to 30.');$('start').reportValidity();return;}$('start').setCustomValidity('');start(n);};
 $('build-b').onclick=()=>{const value=$('start-b').value,n=Number(value);if(value.trim()===''||!Number.isInteger(n)||n<0||n>MAX){$('start-b').setCustomValidity('Choose a whole number from 0 to 30.');$('start-b').reportValidity();return;}$('start-b').setCustomValidity('');snapshot();initialB=n;other=collection(n);revealed=false;lastAdded=[];message='Match the objects. Which group has more?';render();};
 $('start-b').oninput=()=>$('start-b').setCustomValidity('');
 $('start').oninput=()=>$('start').setCustomValidity('');$('start').onkeydown=e=>{if(e.key==='Enter')$('build').click();};
 $('change').onclick=()=>change();$('change-b').onclick=()=>change('b');
 for(const id of ['objects','step','show-count','show-equation','remove-style','count-method'])$(id).onchange=()=>{lastAdded=[];render();};
 $('answer').onclick=()=>{revealed=!revealed;lastAdded=[];render();};
 $('reset').onclick=()=>start(initial);
 $('undo').onclick=()=>{if(!history.length)return;const saved=JSON.parse(history.pop());({items,other,initial,initialB,revealed,message,lastAdded}=saved);$('start-b').value=initialB;render();};
 $('scene').onclick=e=>{if(suppressClick){suppressClick=false;return;}const token=e.target.closest('.token');if(token){const item=items.find(x=>x.id===Number(token.dataset.id));if(item)move(item.id,!item.removed);}};
 $('scene').onpointerdown=e=>{const token=e.target.closest('.token');if(mode!=='subtract'||!token)return;drag={id:Number(token.dataset.id),x:e.clientX,y:e.clientY,token};token.setPointerCapture(e.pointerId);};
 $('scene').onpointerup=e=>{if(!drag)return;const current=drag;drag=null;const distance=Math.hypot(e.clientX-current.x,e.clientY-current.y);if(distance<10)return;suppressClick=true;window.setTimeout(()=>{suppressClick=false;},0);const zone=document.elementFromPoint(e.clientX,e.clientY)?.closest('.group')?.dataset.zone;if(zone==='a'||zone==='removed')move(current.id,zone==='removed');};
 $('scene').onpointercancel=()=>{drag=null;};
 $('help').onclick=()=>$('guide').showModal();
 $('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch(_){$('narration').textContent='Use your browser’s full-screen option to enlarge the board.';}};
 document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen';});
 start(5);
})();
