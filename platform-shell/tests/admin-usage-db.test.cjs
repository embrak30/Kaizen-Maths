// Runs against disposable embedded PostgreSQL; never connects to Supabase.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {PGlite}=require(process.env.KAIZEN_PGLITE_MODULE||'/tmp/kaizen-usage-db/node_modules/@electric-sql/pglite');
(async()=>{
 const db=new PGlite();
 await db.exec(`create role anon;create role authenticated;create schema auth;
 create table auth.users(id uuid primary key,last_sign_in_at timestamptz);
 create table public.schools(id uuid primary key,name text);
 create table public.profiles(id uuid primary key references auth.users on delete cascade,full_name text,email text,role text,school_id uuid references public.schools);
 create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 grant usage on schema auth to authenticated,anon;grant execute on function auth.uid() to authenticated,anon;
 create function public.is_admin() returns boolean language sql security definer set search_path=public as $$select exists(select 1 from public.profiles where id=auth.uid() and role='admin')$$;`);
 const ids=['00000000-0000-4000-8000-000000000001','00000000-0000-4000-8000-000000000002','00000000-0000-4000-8000-000000000003'];
 const sid='10000000-0000-4000-8000-000000000001',s2='10000000-0000-4000-8000-000000000002',v='20000000-0000-4000-8000-000000000001',school='30000000-0000-4000-8000-000000000001';
 await db.query(`insert into public.schools values($1,'School A')`,[school]);
 for(let i=0;i<3;i++){await db.query(`insert into auth.users values($1,now())`,[ids[i]]);await db.query(`insert into public.profiles values($1,$2,$3,$4,$5)`,[ids[i],i===0?'Admin':`Teacher ${i}`,`test${i}@example.test`,i===0?'admin':'school',school]);}
 const sql=fs.readFileSync(path.join(__dirname,'../migrations/20261120_admin_usage.sql'),'utf8');await db.exec(sql);await db.exec(sql);
 async function actor(i){await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[i==null?'':ids[i]]);await db.exec('set role authenticated');}
 async function scalar(sql,args=[]){return (await db.query(sql,args)).rows[0].value;}
 async function record(session=sid,visit=null,tool=null,seconds=0){return scalar('select public.record_teacher_usage($1,$2,$3,$4) value',[session,visit,tool,seconds]);}
 await actor(1);assert.equal((await record()).accepted,false,'no consent means no rows');
 assert.equal(await scalar('select count(*)::int value from public.usage_sessions'),0);
 await assert.rejects(db.exec(`insert into public.usage_sessions(id,user_id) values('${sid}','${ids[2]}')`),/permission denied/);
 await scalar('select public.set_usage_reporting(true) value');assert((await record()).accepted);
 await record(sid,v,'build-add-take-away');await record(sid,v,'build-add-take-away');
 await db.exec('reset role');assert.equal(await scalar('select count(*)::int value from public.usage_tool_visits'),1,'retries do not duplicate opens');
 await db.exec("update public.usage_sessions set last_ping_at=clock_timestamp()-interval '20 seconds'");
 await actor(1);const credit=await record(sid,v,'build-add-take-away',15);assert.equal(credit.credited_seconds,15);
 await record(s2);const overlap=await record(s2,null,null,15);assert.equal(overlap.credited_seconds,0,'concurrent tabs cannot double-count time');
 await assert.rejects(record(sid,v,'<script>',0),/Invalid tool visit/);
 await assert.rejects(record(sid,v,'build-add-take-away',999),/Invalid usage request/);
 assert.equal(await scalar('select count(*)::int value from public.usage_sessions'),0,'teachers cannot read raw usage rows');
 await assert.rejects(db.query('select public.admin_usage_report()'),/Admin access required/);
 await assert.rejects(db.query('select public.purge_teacher_usage()'),/permission denied/);
 await actor(2);await scalar('select public.set_usage_reporting(true) value');await assert.rejects(record(),/Session belongs to another account/);
 await actor(0);const report=await scalar('select public.admin_usage_report(30,null,false) value');
 assert.equal(report.accounts,2);assert.equal(report.users.find(u=>u.id===ids[1]).visits,2);assert.equal(report.tools[0].opens,1);assert.equal(report.tools[0].active_seconds,15);assert(report.users[0].last_sign_in_at);assert.equal(report.recent_visits.length,1);
 await actor(1);await scalar('select public.set_usage_reporting(false) value');assert.equal((await record()).reason,'consent');
 await actor(null);await assert.rejects(record(),/Sign in required/);
 await db.exec('reset role');await db.exec("update public.usage_sessions set started_at=now()-interval '181 days'");await db.exec('select public.purge_teacher_usage()');
 assert.equal(await scalar('select count(*)::int value from public.usage_sessions'),0);assert.equal(await scalar('select count(*)::int value from public.usage_tool_visits'),0);
 await db.exec(`delete from auth.users where id='${ids[1]}'`);
 assert.equal(await scalar(`select count(*)::int value from public.usage_preferences where user_id='${ids[1]}'`),0);
 await db.close();console.log('PASS: real PostgreSQL migration/idempotence, consent, owner checks, RLS, admin-only reports, duration bounds, concurrent-tab cap, retry deduplication and retention.');
})().catch(e=>{console.error(e);process.exitCode=1;});
