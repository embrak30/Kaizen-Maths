/* Generate crawlable marketing pages from the same offer and FAQ used by the app. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');const M=require(root+'/assets/site/marketing.js'),proof=require(root+'/assets/site/marketing-proof.js');
const schemaTags=url=>M.schemas(url,proof).map(x=>'<script type="application/ld+json">'+JSON.stringify(x).replace(/</g,'\\u003c')+'</script>').join('\n');
function page(url,title,description,body){
  let html=fs.readFileSync(root+'/index.html','utf8');
  html=html.replace(/<base[^>]*>/g,'').replace('<head>','<head>\n<base href="/">');
  html=html.replace(/<title>[\s\S]*?<\/title>/,'<title>'+M.esc(title)+' | Kaizen Maths</title>');
  html=html.replace(/(<meta name="description" content=")[^"]*/,(_,open)=>open+M.esc(description));
  html=html.replace(/(<link rel="canonical" href=")[^"]*/,(_,open)=>open+'https://kaizenmaths.com'+url);
  for(const [name,value] of [['og:title',title+' | Kaizen Maths'],['og:description',description],['og:url','https://kaizenmaths.com'+url],['twitter:title',title+' | Kaizen Maths'],['twitter:description',description]]){
    html=html.replace(new RegExp('(<meta (?:property|name)="'+name+'" content=")[^"]*'),(_,open)=>open+M.esc(value));
  }
  html=html.replace(/(<main id="app" tabindex="-1">)[\s\S]*?<\/main>/,(_,open)=>open+'<div class="marketing-content">'+body+'</div></main>');
  html=html.replace(/\s*<script type="application\/ld\+json" data-marketing-schema>[\s\S]*?<\/script>/g,'');
  html=html.replace('</head>',schemaTags(url)+'</head>');
  const file=path.join(root,url,'index.html');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,html.split("\n").map(line=>line.trimEnd()).join("\n"));
}
for(const entry of require(root+'/assets/site/public-pages.js'))page(entry.path,entry.title,entry.description,entry.body);
// Prerender the actual homepage for crawlers, with no network, session, or customer data.
const {JSDOM,VirtualConsole}=require(process.env.KAIZEN_MARKETING_NODE_MODULES ? path.join(process.env.KAIZEN_MARKETING_NODE_MODULES,'jsdom') : 'jsdom');
const indexPath=root+'/index.html';let html=fs.readFileSync(indexPath,'utf8');const dom=new JSDOM(html,{url:'https://kaizenmaths.com/',runScripts:'outside-only',virtualConsole:new VirtualConsole()});const w=dom.window;
w.setTimeout=w.setInterval=w.requestAnimationFrame=()=>0;w.Math.random=()=>0;
w.KaizenMarketing=M;w.KaizenMarketingProof=proof;w.KaizenPublicPages=require(root+'/assets/site/public-pages.js');
vm.runInContext(fs.readFileSync(root+'/app.js','utf8'),dom.getInternalVMContext(),{timeout:10000});
const content=w.document.getElementById('app').innerHTML;
html=html.replace(/(<main id="app" tabindex="-1">)[\s\S]*?<\/main>/,(_,open)=>open+content+'</main>');
html=html.replace(/\s*<script type="application\/ld\+json" data-marketing-schema>[\s\S]*?<\/script>/g,'');
html=html.replace('</head>',M.schemas('/').map(x=>'<script type="application/ld+json" data-marketing-schema>'+JSON.stringify(x).replace(/</g,'\\u003c')+'</script>').join('\n')+'\n</head>');
html=html.replace(/Kaizen Maths \| Practical Maths Resources and Make It Count/g,'Maths Questions & Worksheets for Teachers | Kaizen Maths').replace(/Kaizen Maths provides practical mathematics resources for teachers\. Make It Count brings those resources together with online teacher development, coaching, and sustained implementation support\./g,'Exam-style maths questions, worksheets, starters and worked solutions for busy maths teachers. Explore free samples or try the teacher workspace for 30 days.');
fs.writeFileSync(indexPath,html.split('\n').map(line=>line.trimEnd()).join('\n'));dom.window.close();
const routes=['/','/pricing','/our-story','/vs/drfrostmaths','/vs/mathletics'];
fs.writeFileSync(root+'/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(url=>'<url><loc>https://kaizenmaths.com'+url+'</loc></url>').join('')+'</urlset>\n');
fs.writeFileSync(root+'/robots.txt',['User-agent: *','Allow: /','',...['GPTBot','ClaudeBot','PerplexityBot','OAI-SearchBot'].flatMap(bot=>['User-agent: '+bot,'Allow: /','']),'Sitemap: https://kaizenmaths.com/sitemap.xml',''].join('\n'));
fs.writeFileSync(root+'/llms.txt','# Kaizen Maths\n\nTeacher-led maths questions, worksheets, starters and worked solutions.\n\n- [Pricing and trial limits](https://kaizenmaths.com/pricing)\n- [Our story](https://kaizenmaths.com/our-story)\n- [Compare with Dr Frost Maths](https://kaizenmaths.com/vs/drfrostmaths)\n- [Compare with Mathletics](https://kaizenmaths.com/vs/mathletics)\n\nMake It Count is a proposed programme, subject to funding and agreement. See public pages for current details.\n');
console.log('Built four public pages, prerendered homepage, schemas and crawler files.');
