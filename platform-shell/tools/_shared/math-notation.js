/* Shared presentation-only notation. Numerical products and vector dot products stay explicit. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root){root.KaizenMathNotation=api;if(root.document)api.install(root);}})(typeof window!=='undefined'?window:null,function(){
 'use strict';
 function coefficientProducts(value){
  // Only literal scalar coefficients before a single variable, standard function,
  // pi or a variable group. Never join two numbers or remove a vector dot product.
  const right=String.raw`(?=(?:\{\s*[A-Za-z]\s*\}|[A-Za-z](?![A-Za-z])|\\(?:sin|cos|tan|sec|csc|cot|ln|log|exp|sqrt|pi)\b|(?:\\left\s*)?\(\s*[A-Za-z](?![A-Za-z])))`;
  const dot=String.raw`(?:\\cdot\b|[·⋅])`;
  const re=new RegExp(String.raw`(^|[^A-Za-z0-9_.^}\\])([+-]?\d+(?:\.\d+)?)\s*`+dot+String.raw`\s*`+right,'g');
  return String(value??'').replace(re,(_,prefix,coefficient)=>prefix+coefficient);
 }
 function tex(value){return coefficientProducts(value);}
 function printTex(value){
  // Under-stack the approach value even inside an inline sentence.
  return tex(value).replace(/(?:\\displaystyle\s*)?\\lim(?![A-Za-z])(?:\s*\\limits(?![A-Za-z]))?/g,String.raw`\displaystyle\lim\limits`);
 }
 function install(win){
  const doc=win.document;
  function hook(){const k=win.katex;if(!k||k.__kaizenNotation)return;for(const key of ['render','renderToString'])if(typeof k[key]==='function'){const original=k[key];k[key]=function(value,...args){return original.call(this,tex(value),...args);};}k.__kaizenNotation=true;}
  function scan(scope){
   hook();if(!scope?.querySelectorAll)return;
   const roots=[...(scope.matches?.('.katex')?[scope]:[]),...scope.querySelectorAll('.katex')];
   for(const item of roots){const source=item.querySelector('annotation[encoding="application/x-tex"]')?.textContent;if(!source||tex(source)===source||!win.katex?.render)continue;
    const display=item.parentElement?.classList.contains('katex-display'),target=display?item.parentElement:item,wrapper=doc.createElement('span');
    win.katex.render(source,wrapper,{displayMode:display,throwOnError:false});target.replaceWith(wrapper);
   }
  }
  if(doc.documentElement){new win.MutationObserver(changes=>{for(const change of changes)for(const node of change.addedNodes)if(node.nodeType===1)scan(node);}).observe(doc.documentElement,{childList:true,subtree:true});}
  doc.addEventListener('DOMContentLoaded',()=>scan(doc));scan(doc);
 }
 return {tex,printTex,coefficientProducts,install};
});
