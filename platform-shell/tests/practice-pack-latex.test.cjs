// Regression cases found in the published PDFs; use the actual TeX renderer.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module');
const file=path.resolve(__dirname,'../scripts/pack-library/prepare.cjs'),source=fs.readFileSync(file,'utf8'),mod=new Module(file,module);mod.filename=file;mod.paths=Module._nodeModulePaths(path.dirname(file));mod._compile(source.slice(0,source.indexOf('(async()=>{'))+'\nmodule.exports={textInline};',file);
(async()=>{const {textInline}=mod.exports;
for(const s of ['For $f(x)$ at $(3,4)$.','Factor $5x$ out of the numerator.',"Multiply by $u'$.",'The condition is $k>0$.','5\\big(x+(9-3)\\big)=32','3x+2\\left(-4x-6\\right)=-27']){const rendered=await textInline(s);assert(rendered.includes('<img'),s);assert(!/\\[A-Za-z]+|\$|mjx-error/.test(rendered),rendered);}
for(const s of ['e^-x','e^-lambda','e^(-λt)','(1-p)^(n-k)','(£20,966.92 ÷ £12,938.00)^(1 ÷ 5)']){const rendered=await textInline(s);assert(rendered.includes('<super '),s);assert(!rendered.includes('^'),rendered);assert(!rendered.includes('lambda'),rendered);}
for(const s of ['$727.04','£1 = $1.42. Convert £512 to US dollars.','Company salaries: $28,000 $42,000 $47,000 $51,000 $196,000']){const rendered=await textInline(s);assert(!rendered.includes('<img'),s);assert.equal(rendered,s);}
console.log('PASS: raw TeX commands, coordinate/function/prime delimiters and negative/compound powers render; dollar currencies stay intact.');})();
