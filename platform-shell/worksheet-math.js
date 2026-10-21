// Shared worksheet TeX boundary handling. Keep currency and surrounding prose intact.
(() => {
 'use strict';
 const delimiters=/\\\(([\s\S]*?)\\\)|\$\$([\s\S]*?)\$\$|\\\[([\s\S]*?)\\\]|\$([^$\n]+)\$/g;
 function currency(tex){
  return /[£$]/.test(tex)||/^\s*\d[\d,.]*\s+$/.test(tex)
   ||/^\s*\d[\d,.]*(?:\.\s*|\s+)(?:[A-Za-z]{3,}\b|[£$])/.test(tex)
   ||/^\s*\?\s*$/.test(tex);
 }
 function typeset(tex,display=false){
  if(!window.katex)return null;
  const decoder=document.createElement('textarea');decoder.innerHTML=tex;tex=decoder.value;
  try{return '<span class="worksheet-tex">'+window.katex.renderToString(tex,{displayMode:display,output:'htmlAndMathml',throwOnError:true,strict:'ignore',trust:false,maxExpand:1000})+'</span>';}catch(error){return null;}
 }
 function render(value){
  const input=String(value??'');let changed=false;
  const html=input.replace(delimiters,(match,round,dollars,square,single)=>{
   const tex=round??dollars??square??single;
   if(single!==undefined&&currency(tex))return match;
   const result=typeset(tex,dollars!==undefined||square!==undefined);
   if(result===null)return match;changed=true;return result;
  });
  // A legacy math-object step can contain TeX without delimiters.
  if(!changed&&!/<[a-z][\s\S]*>/i.test(input)&&/\\[A-Za-z]+/.test(input)){
   const result=typeset(input);if(result!==null)return {html:result,changed:true};
  }
  return {html,changed};
 }
 window.KaizenWorksheetMath={render,typeset};
})();
