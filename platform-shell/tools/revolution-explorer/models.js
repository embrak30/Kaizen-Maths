(function(root){
  'use strict';
  const examples={
    root:{title:'Square-root curve',outer:t=>Math.sqrt(t),inner:()=>0,radius:t=>`√${t}`,innerRadius:()=> '0',squared:t=>t,primitive:t=>`${t}²/2`,evaluation:'1/2',exact:'π / 2',coefficient:1/2},
    linear:{title:'Straight line',outer:t=>t,inner:()=>0,radius:t=>t,innerRadius:()=> '0',squared:t=>`${t}²`,primitive:t=>`${t}³/3`,evaluation:'1/3',exact:'π / 3',coefficient:1/3},
    quadratic:{title:'Quadratic curve',outer:t=>t*t,inner:()=>0,radius:t=>`${t}²`,innerRadius:()=> '0',squared:t=>`${t}⁴`,primitive:t=>`${t}⁵/5`,evaluation:'1/5',exact:'π / 5',coefficient:1/5},
    washer:{title:'Between two curves',outer:t=>Math.sqrt(t),inner:t=>t*t,radius:t=>`√${t}`,innerRadius:t=>`${t}²`,squared:t=>`${t} − ${t}⁴`,primitive:t=>`${t}²/2 − ${t}⁵/5`,evaluation:'1/2 − 1/5',exact:'3π / 10',coefficient:3/10},
    tube:{title:'Constant radii',outer:()=>1,inner:()=>.5,radius:()=> '1',innerRadius:()=> '1/2',squared:()=> '1 − 1/4',primitive:t=>`3${t}/4`,evaluation:'3/4',exact:'3π / 4',coefficient:3/4}
  };
  function point(axis,t,r,theta){return axis==='x'?[t,r*Math.cos(theta),r*Math.sin(theta)]:[r*Math.cos(theta),t,r*Math.sin(theta)];}
  function sectionArea(key,t){const e=examples[key];return Math.PI*(e.outer(t)**2-e.inner(t)**2);}
  function section(key,axis,t,angle=2*Math.PI,count=96){
    const e=examples[key],outer=[],inner=[];
    for(let i=0;i<=count;i++){const theta=angle*i/count;outer.push(point(axis,t,e.outer(t),theta));inner.push(point(axis,t,e.inner(t),theta));}
    return {outer,inner};
  }
  function volume(key){return Math.PI*examples[key].coefficient;}
  const api={examples,point,sectionArea,section,volume};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.RevolutionMath=api;
})(typeof window!=='undefined'?window:globalThis);
