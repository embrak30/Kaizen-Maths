// Typeset source HTML/TeX into portable ReportLab blocks, preserving diagrams and tables.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {base,inventory}=require('./runtime.cjs'),{JSDOM}=require(path.join(base,'jsdom'));
const {createCanvas,loadImage,GlobalFonts}=require('/Users/barker/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');
const {mathjax}=require(path.join(base,'mathjax-full/js/mathjax.js')),{TeX}=require(path.join(base,'mathjax-full/js/input/tex.js')),{SVG}=require(path.join(base,'mathjax-full/js/output/svg.js')),{liteAdaptor}=require(path.join(base,'mathjax-full/js/adaptors/liteAdaptor.js')),{RegisterHTMLHandler}=require(path.join(base,'mathjax-full/js/handlers/html.js')),{AllPackages}=require(path.join(base,'mathjax-full/js/input/tex/AllPackages.js'));
const adaptor=liteAdaptor();RegisterHTMLHandler(adaptor);const mj=mathjax.document('',{InputJax:new TeX({packages:AllPackages}),OutputJax:new SVG({fontCache:'none'})});
const root=path.resolve(__dirname,'../..'),folder=path.join(root,'tmp/pdfs/library-assets');fs.mkdirSync(folder,{recursive:true});
const toolPaths=Object.fromEntries(inventory(root).map(t=>[t.slug,t.toolPath.split('?')[0]]));
const source=JSON.parse(fs.readFileSync(path.join(root,'data/practice-packs/library.json'))),errors=[],cache=new Map();
GlobalFonts.registerFromPath('/System/Library/Fonts/Supplemental/STIXTwoText.ttf','Times New Roman');GlobalFonts.registerFromPath('/Users/barker/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/libreoffice-headless/libreoffice/LibreOfficeDev.app/Contents/Resources/fonts/truetype/Carlito-Regular.ttf','Arial');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const unicode={'−':'-','×':'\\times ','÷':'\\div ','π':'\\pi ','θ':'\\theta ','μ':'\\mu ','σ':'\\sigma ','α':'\\alpha ','β':'\\beta ','λ':'\\lambda ','∞':'\\infty ','±':'\\pm ','≤':'\\le ','≥':'\\ge ','ℝ':'\\mathbb{R}','ℕ':'\\mathbb{N}','ℤ':'\\mathbb{Z}','ℚ':'\\mathbb{Q}','ℂ':'\\mathbb{C}'};
function texText(s){return String(s).replace(/[−×÷πθμσαβλ∞±≤≥ℝℕℤℚℂ]/g,c=>unicode[c]).replace(/&/g,'\\&');}
function nodeTex(n){if(n.nodeType===3)return texText(n.textContent);if(n.nodeType===1&&n.matches('.fraction,.frac,.vfrac,.cancel-fraction')){const a=n.querySelector('.numerator,.num')||n.children[0],b=n.querySelector('.denominator,.den')||n.children[1];if(a&&b)return '\\frac{'+nodeTex(a)+'}{'+nodeTex(b)+'}';}if(n.nodeType===1&&n.matches('.root'))return '\\sqrt{'+nodeTex(n.querySelector('.radicand')||n.firstElementChild)+'}';const children=[...n.childNodes].map(nodeTex).join('');if((n.tagName==='SUP'||n.matches('.superscript')))return `^{${children}}`;if(n.tagName==='SUB')return `_{${children}}`;return children;}
async function raster(svg,key,w,h){
 const file=path.join(folder,key+'.png');if(!fs.existsSync(file)){
  const scale=3;svg=svg.replace(/width="[^"]*"/,'width="'+Math.ceil(w*scale)+'"').replace(/height="[^"]*"/,'height="'+Math.ceil(h*scale)+'"');
  const img=await loadImage(Buffer.from(svg));const c=createCanvas(Math.ceil(w*scale),Math.ceil(h*scale)),cx=c.getContext('2d');cx.clearRect(0,0,c.width,c.height);cx.drawImage(img,0,0,c.width,c.height);fs.writeFileSync(file,c.toBuffer('image/png'));
 }return file;
}
async function mathImage(tex,display=false){
 tex=tex.replace(/\\(?:bigg?|Bigg?)(?=[()\[\]|])/g,'').replace(/\\limits(?=\s*[_^])/g,'\\limits');const key=crypto.createHash('sha1').update(tex+'|'+display).digest('hex');if(cache.has(key))return cache.get(key);
 const markup=adaptor.outerHTML(mj.convert(tex,{display}));if(/data-mjx-error|mjx-merror/.test(markup))throw Error('TeX: '+tex);
 let svg=markup.match(/<svg[\s\S]*<\/svg>/)[0];const box=svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number),size=12,w=box[2]/1000*size,h=box[3]/1000*size,depth=Math.max(0,(box[1]+box[3])/1000*size);
 svg=svg.replace(/currentColor/g,'#26344b');const file=await raster(svg,key,Math.max(w,1),Math.max(h,1));const val={file,w,h,depth};cache.set(key,val);return val;
}
async function inlineMath(tex){
 if(/^\\(?:displaystyle\s*)?\\?text\{/.test(tex.trim())||/^\\text\{/.test(tex.trim())){
  let out='',last=0;for(const m of tex.matchAll(/\\text\{([^{}]*)\}/g)){const between=tex.slice(last,m.index).trim();if(between)out+=' '+await inlineMath(between)+' ';out+=simpleText(m[1]);last=m.index+m[0].length;}const rest=tex.slice(last).trim();if(rest)out+=' '+await inlineMath(rest);if(out)return out;
 }
 const im=await mathImage(tex);return `<img src="${im.file}" width="${im.w.toFixed(3)}" height="${im.h.toFixed(3)}" valign="${(-im.depth).toFixed(3)}"/>`;}
async function textInline(s){
 if(/\\(?:begin|frac|dfrac|sqrt|cdot|text|le|ge|gt|lt|times)\b/.test(s)&&!/[$]|\\[([]/.test(s)){return inlineMath(s);}
 const pattern=/\\\(([\s\S]*?)\\\)|\$\$([\s\S]*?)\$\$|\\\[([\s\S]*?)\\\]|\$([^$\n]+)\$/g;let out='',last=0;
 for(const m of String(s).matchAll(pattern)){
  out+=simpleText(s.slice(last,m.index));const tex=m[1]??m[2]??m[3]??m[4];
  if(m[4]&&!/[\\^_={}+*\/-]/.test(tex)&&!/^\s*(?:[a-z]{1,3}|[+-]?\d+(?:\.\d+)?)\s*$/i.test(tex))out+=simpleText(m[0]);else out+=await inlineMath(tex);last=m.index+m[0].length;
 }out+=simpleText(s.slice(last));return out;
}
function simpleText(s){
 return esc(String(s)).replace(/\^\{([^}]+)\}|\^(-?\d+|[a-z])/g,(_,a,b)=>`<super size="60%" rise="38%">${a||b}</super>`).replace(/_\{([^}]+)\}|_([0-9])/g,(_,a,b)=>`<sub size="60%">${a||b}</sub>`);
}
async function inline(n){
 if(n.nodeType===3)return textInline(n.textContent);if(n.nodeType!==1)return '';
 if(n.matches('.step-indicator,.step-arrow,.bracket,.kaizen-diagram-scale-note'))return '';
 if(n.matches('.fraction,.frac,.vfrac,.cancel-fraction')){const a=n.querySelector('.numerator,.num')||n.children[0],b=n.querySelector('.denominator,.den')||n.children[1];if(a&&b)return inlineMath('\\frac{'+nodeTex(a)+'}{'+nodeTex(b)+'}');}
 if(n.matches('.root'))return inlineMath('\\sqrt{'+nodeTex(n.querySelector('.radicand')||n.firstElementChild)+'}');
 if(n.matches('.matrix')){const entries=n.querySelector('.entries');if(entries){const cells=[...entries.children],cols=Math.round(Math.sqrt(cells.length)),rows=[];for(let i=0;i<cells.length;i+=cols)rows.push(cells.slice(i,i+cols).map(nodeTex).join('&'));return inlineMath('\\begin{bmatrix}'+rows.join('\\\\')+'\\end{bmatrix}');}}
 if(n.matches('.matrix-wrap')){const rows=[...n.querySelectorAll('.matrix-row')].map(row=>[...row.querySelectorAll('.matrix-cell')].map(nodeTex).join('&'));if(rows.length)return inlineMath('\\begin{bmatrix}'+rows.join('\\\\')+'\\end{bmatrix}');}
 if(n.matches('.cvec,.colvec,.mini-vector')){let entries=n.querySelector('.entries');const cells=entries?[...entries.children]:[...n.children].filter(c=>!c.matches('.bracket'));if(cells.length)return inlineMath('\\begin{pmatrix}'+cells.map(nodeTex).join('\\\\')+'\\end{pmatrix}');}
 if(n.tagName==='BR')return '<br/>';
 const body=(await Promise.all([...n.childNodes].map(inline))).join('');
 if(n.tagName==='SUP'||n.matches('.superscript'))return '<super size="60%" rise="38%">'+body+'</super>';
 if(n.tagName==='SUB'||n.matches('.subscript'))return '<sub size="60%">'+body+'</sub>';
 if(n.matches('b,strong'))return '<b>'+body+'</b>';if(n.matches('em,i'))return '<i>'+body+'</i>';return body;
}
async function svgBlock(n,css){
 const vars={};for(const m of css.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;}\n]+)/gi))vars[m[1]]=m[2];
 const clone=n.cloneNode(true),view=(n.getAttribute('viewBox')||`0 0 ${parseFloat(n.getAttribute('width'))||400} ${parseFloat(n.getAttribute('height'))||260}`).split(/[ ,]+/).map(Number),w=view[2],h=view[3];
 const originals=[n,...n.querySelectorAll('*')],copies=[clone,...clone.querySelectorAll('*')];
 const props=['fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','fill-opacity','stroke-opacity','opacity','font-size','font-family','font-weight','font-style','text-anchor','paint-order','stroke-dasharray'];
 for(let i=0;i<originals.length;i++){
  const computed=n.ownerDocument.defaultView.getComputedStyle(originals[i]);
  for(const prop of props){let value=computed.getPropertyValue(prop);if(!value)continue;value=value.replace(/var\((--[a-z0-9-]+)(?:,\s*([^)]*))?\)/gi,(_,name,fallback)=>vars[name]||fallback||'#26344b');copies[i].setAttribute(prop,value);}
 }
 if(n.getAttribute('aria-label')==='Cylinder diagram')for(const line of clone.querySelectorAll('.shape-line,.shape-dim'))line.setAttribute('fill','none');
 for(const label of clone.querySelectorAll('text,tspan')){label.setAttribute('stroke','none');if(h>250)label.setAttribute('font-size',Math.max(parseFloat(label.getAttribute('font-size'))||12,15));label.removeAttribute('paint-order');}
 clone.setAttribute('xmlns','http://www.w3.org/2000/svg');clone.setAttribute('viewBox',view.join(' '));clone.setAttribute('width',w);clone.setAttribute('height',h);clone.removeAttribute('style');
 let svg=clone.outerHTML;
 const key=crypto.createHash('sha1').update(svg).digest('hex');const file=await raster(svg,key,w,h);return {kind:'image',file,w,h,alt:n.getAttribute('aria-label')||'Diagram'};
}
async function blocks(value,doc,css){
 const host=doc.createElement('div');host.innerHTML=String(value??'');doc.body.appendChild(host);const out=[];let pending='';
 const flush=()=>{if(pending.replace(/<[^>]+>/g,'').trim()||/<img/.test(pending))out.push({kind:'paragraph',html:pending.replace(/\s+/g,' ').trim()});pending='';};
 async function walk(n){
  if(n.nodeType===1&&n.tagName.toLowerCase()==='svg'){flush();out.push(await svgBlock(n,css));return;}
  if(n.nodeType===1&&n.tagName==='TABLE'){flush();const rows=[];for(const row of n.querySelectorAll('tr')){const cells=[];for(const cell of row.querySelectorAll('th,td'))cells.push(await inline(cell));if(cells.length)rows.push(cells);}if(rows.length)out.push({kind:'table',rows});return;}
  if(n.nodeType===1&&n.matches('div,p,section,figure,li,ul,ol')&&!n.matches('.fraction,.frac,.vfrac,.matrix-wrap,.matrix,.root,.cvec,.colvec,.mini-vector')){
   flush();for(const child of n.childNodes)await walk(child);flush();return;
  }
  pending+=await inline(n);
 }
 for(const n of host.childNodes)await walk(n);flush();host.remove();return out;
}
(async()=>{
 let activeSlug='',dom,css,done=0;
 for(const pack of source.packs){
  if(pack.sourceTool!==activeSlug){dom?.window.close();activeSlug=pack.sourceTool;const html=fs.readFileSync(path.join(root,toolPaths[activeSlug]),'utf8');dom=new JSDOM(html);css=[...dom.window.document.querySelectorAll('style')].map(s=>s.textContent).join('\n');}
  for(const q of pack.questions)try{
   let instruction=q.instruction||'';
   if(!instruction&&['differentiation-polynomials','differentiation-rules','trig-differentiation-rules','inverse-trig-differentiation'].includes(pack.sourceTool)&&/^\s*\$/.test(q.question))instruction='Differentiate with respect to x.';
   const questionText=q.questionText.replace(/\s+/g,' ').trim().toLowerCase();
   const needsInstruction=pack.sourceTool!=='linear-programming'&&instruction&&!questionText.includes(instruction.replace(/\s+/g,' ').trim().toLowerCase());
   q.print={question:[...(needsInstruction?await blocks(esc(instruction),dom.window.document,css):[]),...(q.given?await blocks('Given '+q.given,dom.window.document,css):[]),...await blocks(q.question,dom.window.document,css)],answer:await blocks(q.answer,dom.window.document,css),steps:[]};
   for(const s of q.steps)q.print.steps.push(...await blocks(s,dom.window.document,css));
   if(!q.print.question.length||!q.print.answer.length)throw Error('Empty typeset content');
  }catch(e){errors.push({pack:pack.id,tool:pack.sourceTool,question:q.number,error:e.message});}
  if(++done%25===0)console.log('Prepared '+done+'/'+source.packs.length+' packs');
 }
 dom?.window.close();fs.writeFileSync(path.join(root,'tmp/pdfs/library-prepared.json'),JSON.stringify({...source,renderErrors:errors}));fs.writeFileSync(path.join(root,'tmp/pdfs/library-render-errors.json'),JSON.stringify(errors,null,2));console.log(JSON.stringify({prepared:done,assets:fs.readdirSync(folder).length,errors:errors.length}));if(errors.length)process.exitCode=1;
})();
