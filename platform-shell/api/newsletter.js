'use strict';
const {createService,config}=require('./_newsletter-service.js');
function createHandler(deps){return async function(req,res){
 const reply=(status,body)=>{res.statusCode=status;res.setHeader('Content-Type','application/json');res.setHeader('Cache-Control','no-store');res.end(JSON.stringify(body));};
 try{
  if(!['GET','POST'].includes(req.method)){res.setHeader('Allow','GET, POST');return reply(405,{error:'Method not allowed.'});}
  const query=new URL(req.url,'https://www.kaizenmaths.com').searchParams;
  if(req.method==='GET'&&query.get('action')==='signup')return reply(200,{signupUrl:config(deps.env).signupUrl});
  const db=deps.getDb(),auth=await deps.getUser(req,db);if(auth.error||!auth.user)return reply(401,{error:'Sign in to continue.'});
  const{data:profile,error}=await db.from('profiles').select('role').eq('id',auth.user.id).maybeSingle();if(error)return reply(503,{error:'Could not verify admin access.'});if(profile?.role!=='admin')return reply(403,{error:'Admin access required.'});
  const service=createService({db,fetcher:deps.fetcher,env:deps.env,now:deps.now,uuid:deps.uuid});
  if(req.method==='GET'){if(query.get('action')==='report')return reply(200,await service.report(query.get('id')));return reply(200,await service.status());}
  let body=req.body;if(typeof body==='string'){if(Buffer.byteLength(body)>32768)return reply(413,{error:'Newsletter is too large.'});try{body=JSON.parse(body);}catch(_){return reply(400,{error:'Invalid request.'});}}else if(!body)body=await deps.readBody(req);
  if(!body||Array.isArray(body)||typeof body!=='object'||Buffer.byteLength(JSON.stringify(body))>32768)return reply(400,{error:'Invalid newsletter request.'});
  if(!['save','prepare','test','send'].includes(body.action))return reply(400,{error:'Choose a newsletter action.'});
  const result=await service[body.action](body,auth.user);return reply(200,{draft:result});
 }catch(error){return reply(error.status||500,{error:error.status?error.message:'The newsletter request could not be completed. Check the newsletter setup.'});}
};}
module.exports=async(req,res)=>{const utils=require('./_billing-utils.js');return createHandler({getDb:utils.supabaseAdmin,getUser:utils.getSignedInUser,readBody:utils.readJsonBody,fetcher:fetch,env:process.env})(req,res);};
module.exports.createHandler=createHandler;
