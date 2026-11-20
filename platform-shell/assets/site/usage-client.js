/* First-party, opt-in teacher usage. No anonymous events, pupil responses or third-party analytics. */
(() => {
 'use strict';
 if(window.self!==window.top)return;
 const INTERVAL=15000,IDLE=90000,EXPIRY=1800000;
 let userId=null,enabled=false,client=null,session=null,visit=null,lastInput=Date.now(),lastTick=Date.now(),lastWork=0,busy=0,queue=Promise.resolve(),generation=0,loadingUser=null;
 const uuid=()=>window.crypto.randomUUID();
 const configured=()=>window.KAIZEN_AUTH_CONFIG?.usageReportingEnabled===true;
 const auth=()=>window.KaizenAuth?.state;
 function stored(){try{return JSON.parse(sessionStorage.getItem('kaizen:usage-session')||'null');}catch(_){return null;}}
 function save(){try{sessionStorage.setItem('kaizen:usage-session',JSON.stringify({userId,id:session,lastWork}));}catch(_){}}
 function reset(){generation++;enabled=false;session=null;visit=null;client=null;userId=null;loadingUser=null;removeBanner();lastTick=Date.now();}
 function removeBanner(){document.getElementById('usage-choice')?.remove();}
 function banner(){
  if(document.getElementById('usage-choice'))return;
  const box=document.createElement('aside');box.id='usage-choice';box.className='usage-choice';box.setAttribute('aria-label','Teacher usage reporting');
  box.innerHTML='<strong>Help us understand teacher use</strong><p>Allow Kaizen administrators to see your visits, tools opened and estimated active time, linked to your teacher account. Optional; your access is unchanged. Records are kept for up to 180 days.</p><a href="#/trust/privacy">Privacy and choices</a> <button type="button" data-choice="yes">Allow usage reporting</button> <button type="button" data-choice="no">Not now</button><span role="status"></span>';
  box.addEventListener('click',async e=>{const b=e.target.closest('[data-choice]');if(!b)return;box.querySelectorAll('button').forEach(x=>x.disabled=true);try{await setPreference(b.dataset.choice==='yes');}catch(_){box.querySelector('[role=status]').textContent='Could not save. Please try again.';box.querySelectorAll('button').forEach(x=>x.disabled=false);}});
  document.body.append(box);
 }
 async function setPreference(value){
  if(!configured())throw Error('Reporting is not activated');
  const id=auth()?.session?.user?.id,c=client||await window.KaizenAuth?.getClient?.();if(!c||!id)throw Error('Sign in required');
  const {error}=await c.rpc('set_usage_reporting',{p_enabled:!!value});if(error)throw error;
  if(auth()?.session?.user?.id!==id)return;
  generation++;loadingUser=null;client=c;userId=id;enabled=!!value;removeBanner();if(!enabled){session=null;visit=null;}else{lastInput=Date.now();await ensureSession();routeChanged();}
  document.querySelectorAll('[data-usage-preference]').forEach(x=>x.checked=enabled);
 }
 async function init(){
  if(!configured()){reset();return;}
  const id=auth()?.session?.user?.id;
  if(!id){reset();return;}
  if(id===userId||id===loadingUser)return;
  reset();loadingUser=id;const turn=generation;
  try{
   const c=await window.KaizenAuth.getClient();const {data,error}=await c.from('usage_preferences').select('enabled').eq('user_id',id).maybeSingle();
   if(turn!==generation)return;loadingUser=null;if(error)return;
   userId=id;client=c;enabled=data?.enabled===true;
   if(!data)banner();if(enabled){await ensureSession();routeChanged();}
  }catch(_){if(turn===generation)loadingUser=null;}
 }
 async function ensureSession(){
  if(!enabled||!userId)return;
  const now=Date.now();if(!session){const old=stored();if(old?.userId===userId&&now-old.lastWork<EXPIRY){session=old.id;lastWork=old.lastWork;}}
  if(!session||now-lastWork>=EXPIRY){session=uuid();visit=null;lastWork=now;save();await send(0);}
 }
 function toolOnScreen(){
  const parts=location.hash.split('?')[0].replace(/^#\/?/,'').split('/');if(!['classroom','tools'].includes(parts[0]))return null;
  let slug;try{slug=decodeURIComponent(parts[1]||'');}catch(_){return null;}
  const tool=window.KaizenUsageTools?.find(x=>x.slug===slug),frame=document.querySelector('iframe.legacy-frame');if(!tool||!frame)return null;
  const expected=new URL(tool.toolPath,location.href),actual=new URL(frame.src,location.href);
  return expected.origin===actual.origin&&expected.pathname===actual.pathname?{slug,frame}:null;
 }
 function send(seconds,toolVisit=visit){
  if(!enabled||!client||!session||(seconds>0&&busy))return Promise.resolve();
  const turn=generation,c=client,sid=session,record=toolVisit?{...toolVisit}:null;busy++;
  queue=queue.then(async()=>{
   if(turn!==generation||!enabled)return;
   try{
    const {data,error}=await c.rpc('record_teacher_usage',{p_session:sid,p_visit:record?.id||null,p_tool:record?.slug||null,p_seconds:Math.min(30,Math.max(0,Math.floor(seconds)))});
    if(turn!==generation||error)return;
    if(data?.accepted===false){if(data.reason==='consent'){enabled=false;session=null;visit=null;}else if(data.reason==='expired'&&session===sid){session=null;visit=null;}}
   }catch(_){/* Reporting never blocks teaching. No offline queue. */}
  }).finally(()=>{busy--;});
  return queue;
 }
 function routeChanged(){
  if(!enabled)return;if(!session||Date.now()-lastWork>=EXPIRY){ensureSession().then(()=>{if(enabled&&session)routeChanged();});return;}const tool=toolOnScreen();
  if(visit?.slug===tool?.slug)return;
  visit=tool?{id:uuid(),slug:tool.slug}:null;lastTick=Date.now();if(tool){lastInput=Date.now();lastWork=Date.now();save();send(0);}
 }
 function input(){if(location.hash.startsWith('#/pupil'))return;lastInput=Date.now();}
 async function mountPreference(host){
  if(!host)return;
  if(!configured()){host.textContent='Usage reporting is not currently activated.';return;}
  const id=auth()?.session?.user?.id;if(!id){host.textContent='Sign in to manage your usage reporting choice.';return;}
  host.textContent='Loading your choice…';
  try{const c=await window.KaizenAuth.getClient();const {data,error}=await c.from('usage_preferences').select('enabled').eq('user_id',id).maybeSingle();if(error)throw error;if(!host.isConnected||auth()?.session?.user?.id!==id)return;
   host.innerHTML='<label><input type="checkbox" data-usage-preference> Allow account-level usage reporting</label><p role="status"></p>';const check=host.querySelector('input');check.checked=data?.enabled===true;check.onchange=async()=>{const value=check.checked;check.disabled=true;try{await setPreference(value);host.querySelector('[role=status]').textContent=value?'Usage reporting allowed.':'New usage collection stopped.';}catch(_){check.checked=!value;host.querySelector('[role=status]').textContent='Could not save. Please try again.';}finally{check.disabled=false;}};
  }catch(_){host.textContent='Your reporting choice could not be loaded. No reporting is enabled by this page. Please try again later.';}
 }
 async function tick(){
  const now=Date.now(),elapsed=Math.min(15,(now-lastTick)/1000);lastTick=now;
  if(!enabled||location.hash.startsWith('#/pupil')||document.visibilityState!=='visible'||now-lastInput>IDLE)return;
  await ensureSession();routeChanged();lastWork=now;save();await send(elapsed);
 }
 window.addEventListener('message',e=>{if(e.origin!==location.origin||e.data?.type!=='kaizen-tool-activity')return;const tool=toolOnScreen();if(tool&&e.source===tool.frame.contentWindow)input();});
 for(const event of ['pointerdown','keydown','wheel','touchstart'])document.addEventListener(event,input,{passive:true,capture:true});
 document.addEventListener('visibilitychange',()=>{lastTick=Date.now();if(document.visibilityState==='visible')input();});
 window.addEventListener('focus',()=>{lastTick=Date.now();input();});
 document.addEventListener('load',e=>{if(e.target?.matches?.('iframe.legacy-frame'))routeChanged();},true);
 window.addEventListener('hashchange',()=>{lastTick=Date.now();window.setTimeout(routeChanged,0);});
 window.addEventListener('kaizen-auth-change',()=>{init();const host=document.getElementById('usagePrivacyChoice');if(host)mountPreference(host);});
 window.setInterval(tick,INTERVAL);
 window.KaizenUsage={setPreference,mountPreference,routeChanged,init,isEnabled:()=>enabled};
 init();
})();
