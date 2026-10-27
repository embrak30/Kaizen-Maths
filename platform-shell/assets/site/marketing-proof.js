/* Publish only permissioned, checked evidence. Blank entries are never rendered. */
(function(root){
  const proof={
    founder:{approved:false,name:'',photo:'',profileUrl:''},
    adoption:{approved:false,count:null,label:'teachers signed up',asOf:''},
    testimonials:[], // {approved:true, slot_id, person_name, organisation, photo, quote}
    externalMention:{approved:false,title:'',quote:'',url:'',date:''}
  };
  if(typeof module==='object'&&module.exports)module.exports=proof;
  else root.KaizenMarketingProof=proof;
})(typeof window==='undefined'?this:window);
