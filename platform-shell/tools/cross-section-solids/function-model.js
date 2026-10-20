(function(root){
  'use strict';
  const functions={sin:Math.sin,cos:Math.cos,tan:Math.tan,sqrt:Math.sqrt,abs:Math.abs,exp:Math.exp,ln:Math.log,log:Math.log};
  const presets={
    original:{title:'One region · √x and x²',f1:'sqrt(x)',f2:'x^2',a:'0',b:'1',exact:['9/70']},
    crossing:{title:'Two regions · x³ and x',f1:'x^3',f2:'x',a:'-1',b:'1',exact:['8/105','8/105']},
    sine:{title:'Two regions · sin(x) and 0',f1:'sin(x)',f2:'0',a:'-pi',b:'pi',exact:['π/2','π/2']},
    waves:{title:'Four regions · sin(2x) and 0',f1:'sin(2x)',f2:'0',a:'-pi',b:'pi',exact:['π/4','π/4','π/4','π/4']},
    touching:{title:'Touching curves · x² and 0',f1:'x^2',f2:'0',a:'-1',b:'1',exact:['1/5','1/5']}
  };
  function parse(input){
    const text=String(input).trim().toLowerCase().replace(/π/g,'pi').replace(/−/g,'-').replace(/×/g,'*').replace(/÷/g,'/');
    if(!text||text.length>120)throw Error('Enter a function using no more than 120 characters.');
    const tokens=[];let at=0;
    while(at<text.length){
      if(/\s/.test(text[at])){at++;continue;}
      const number=text.slice(at).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/);
      if(number){tokens.push({kind:'number',value:+number[0]});at+=number[0].length;continue;}
      const word=text.slice(at).match(/^[a-z]+/);
      if(word){tokens.push({kind:'word',value:word[0]});at+=word[0].length;continue;}
      if('+-*/^()'.includes(text[at])){tokens.push({kind:text[at],value:text[at]});at++;continue;}
      throw Error('Use x, numbers, + − × / ^, brackets, sin, cos, tan, sqrt, abs, exp or ln.');
    }
    let i=0,depth=0;const peek=()=>tokens[i]?.kind;
    const primaryStart=()=>['number','word','('].includes(peek());
    function primary(){
      if(++depth>32)throw Error('The expression has too many nested brackets.');
      let node;const token=tokens[i++];if(!token)throw Error('Complete the function expression.');
      if(token.kind==='number')node={op:'n',v:token.value};
      else if(token.kind==='word'){
        if(token.value==='x')node={op:'x'};
        else if(token.value==='pi'||token.value==='e')node={op:'n',v:token.value==='pi'?Math.PI:Math.E};
        else if(functions[token.value]){if(peek()!=='(')throw Error(`Use ${token.value}(...) with brackets.`);i++;const a=add();if(peek()!==')')throw Error('Close every opening bracket.');i++;node={op:token.value,a};}
        else throw Error(`“${token.value}” is not supported. Use x as the variable.`);
      }else if(token.kind==='('){node=add();if(peek()!==')')throw Error('Close every opening bracket.');i++;}
      else throw Error('Check the operators and brackets in the function.');
      depth--;return node;
    }
    function power(){let a=primary();if(peek()==='^'){i++;a={op:'^',a,b:unary()};}return a;}
    function unary(){if(peek()==='+'||peek()==='-'){const op=tokens[i++].kind;return {op:op==='-'?'neg':'pos',a:unary()};}return power();}
    function product(){let a=unary();while(peek()==='*'||peek()==='/'||primaryStart()){const op=peek()==='*'||peek()==='/'?tokens[i++].kind:'*';a={op,a,b:unary()};}return a;}
    function add(){let a=product();while(peek()==='+'||peek()==='-'){const op=tokens[i++].kind;a={op,a,b:product()};}return a;}
    const ast=add();if(i!==tokens.length)throw Error('Check the brackets in the function.');return {text,ast};
  }
  function evaluate(n,x){
    if(n.op==='n')return n.v;if(n.op==='x')return x;const a=evaluate(n.a,x);
    if(n.op==='neg')return -a;if(n.op==='pos')return a;if(functions[n.op])return functions[n.op](a);
    const b=evaluate(n.b,x);return n.op==='+'?a+b:n.op==='-'?a-b:n.op==='*'?a*b:n.op==='/'?a/b:a**b;
  }
  function derivative(n,x){
    if(n.op==='n')return 0;if(n.op==='x')return 1;
    const a=evaluate(n.a,x),da=derivative(n.a,x);
    if(n.op==='neg')return -da;if(n.op==='pos')return da;
    if(n.op==='sin')return Math.cos(a)*da;if(n.op==='cos')return -Math.sin(a)*da;if(n.op==='tan')return da/Math.cos(a)**2;
    if(n.op==='sqrt')return da/(2*Math.sqrt(a));if(n.op==='abs')return Math.sign(a)*da;if(n.op==='exp')return Math.exp(a)*da;if(n.op==='ln'||n.op==='log')return da/a;
    const b=evaluate(n.b,x),db=derivative(n.b,x);
    if(n.op==='+')return da+db;if(n.op==='-')return da-db;if(n.op==='*')return da*b+a*db;if(n.op==='/')return (da*b-a*db)/(b*b);
    return db===0?b*a**(b-1)*da:a**b*(db*Math.log(a)+b*da/a);
  }
  function interval(n,lo,hi){
    if(n.op==='n')return [n.v,n.v];if(n.op==='x')return [lo,hi];const a=interval(n.a,lo,hi);
    if(n.op==='neg')return [-a[1],-a[0]];if(n.op==='pos')return a;
    if(n.op==='sqrt'){if(a[0]<-1e-12)throw Error('sqrt needs non-negative inputs throughout the interval.');return [Math.sqrt(Math.max(0,a[0])),Math.sqrt(a[1])];}
    if(n.op==='ln'||n.op==='log'){if(a[0]<=0)throw Error('ln needs positive inputs throughout the interval.');return a.map(Math.log);}
    if(n.op==='abs')return [a[0]<=0&&a[1]>=0?0:Math.min(...a.map(Math.abs)),Math.max(...a.map(Math.abs))];
    if(n.op==='exp')return a.map(Math.exp);
    if(n.op==='sin'||n.op==='cos'){
      if(a[1]-a[0]>64*Math.PI)throw Error('Use a shorter interval or a lower-frequency trigonometric function.');return [-1,1];
    }
    if(n.op==='tan'){
      if(Math.ceil((a[0]-Math.PI/2)/Math.PI)<=Math.floor((a[1]-Math.PI/2)/Math.PI))throw Error('The interval crosses a tan asymptote. Choose a continuous interval.');
      return a.map(Math.tan);
    }
    const b=interval(n.b,lo,hi);
    if(n.op==='+')return [a[0]+b[0],a[1]+b[1]];if(n.op==='-')return [a[0]-b[1],a[1]-b[0]];
    if(n.op==='*'){const v=[a[0]*b[0],a[0]*b[1],a[1]*b[0],a[1]*b[1]];return [Math.min(...v),Math.max(...v)];}
    if(n.op==='/'){
      if(b[0]<=0&&b[1]>=0)throw Error('A denominator may be zero in this interval. Choose a continuous interval.');
      const v=[a[0]/b[0],a[0]/b[1],a[1]/b[0],a[1]/b[1]];return [Math.min(...v),Math.max(...v)];
    }
    if(b[0]!==b[1]){if(a[0]<=0)throw Error('A variable power needs a strictly positive base.');const v=[a[0]**b[0],a[0]**b[1],a[1]**b[0],a[1]**b[1]];return [Math.min(...v),Math.max(...v)];}
    const p=b[0];if(a[0]<0&&!Number.isInteger(p))throw Error('Fractional powers need non-negative bases on this interval.');if(p<0&&a[0]<=0&&a[1]>=0)throw Error('Negative powers cannot cross zero.');
    const v=[a[0]**p,a[1]**p];if(Number.isInteger(p)&&p>0&&p%2===0&&a[0]<=0&&a[1]>=0)v.push(0);return [Math.min(...v),Math.max(...v)];
  }
  function polynomial(n){
    if(n.op==='n')return [n.v];if(n.op==='x')return [0,1];const a=polynomial(n.a);if(!a)return null;
    if(n.op==='neg')return a.map(v=>-v);if(n.op==='pos')return a;
    if(functions[n.op])return null;const b=polynomial(n.b);if(!b)return null;
    if(n.op==='+'||n.op==='-')return Array.from({length:Math.max(a.length,b.length)},(_,i)=>(a[i]||0)+(n.op==='+'?1:-1)*(b[i]||0));
    const multiply=(u,v)=>{const out=Array(u.length+v.length-1).fill(0);u.forEach((x,i)=>v.forEach((y,j)=>out[i+j]+=x*y));return out;};
    if(n.op==='*')return a.length+b.length>16?null:multiply(a,b);if(n.op==='/')return b.length===1&&b[0]!==0?a.map(v=>v/b[0]):null;
    if(n.op==='^'&&b.length===1&&Number.isInteger(b[0])&&b[0]>=0&&b[0]<=12){let out=[1];for(let i=0;i<b[0];i++){out=multiply(out,a);if(out.length>16)return null;}return out;}return null;
  }
  function bisect(f,a,b){let fa=f(a);for(let i=0;i<65;i++){const m=(a+b)/2,fm=f(m);if(!Number.isFinite(fm))throw Error('A discontinuity was found. Use a continuous interval.');if(fm===0)return m;if(Math.sign(fa)!==Math.sign(fm))b=m;else {a=m;fa=fm;}}return (a+b)/2;}
  const polyValue=(c,x)=>c.reduceRight((sum,v)=>sum*x+v,0);
  function polyRoots(c,a,b){
    while(c.length>1&&Math.abs(c[c.length-1])<1e-14)c.pop();if(c.length===1)return [];
    if(c.length===2){const x=-c[0]/c[1];return x>=a-1e-10&&x<=b+1e-10?[Math.max(a,Math.min(b,x))]:[];}
    const critical=polyRoots(c.slice(1).map((v,i)=>v*(i+1)),a,b),breaks=[a,...critical,b].sort((x,y)=>x-y),roots=[];
    const eps=1e-10*Math.max(1,...c.map(Math.abs)),f=x=>polyValue(c,x);
    breaks.forEach(x=>{if(Math.abs(f(x))<eps)roots.push(x);});
    for(let i=0;i<breaks.length-1;i++)if(f(breaks[i])*f(breaks[i+1])<0)roots.push(bisect(f,breaks[i],breaks[i+1]));return roots;
  }
  function integrate(f,a,b,tol=1e-10){
    const s=(a,b,fa,fm,fb)=>(b-a)*(fa+4*fm+fb)/6;
    function recurse(a,b,fa,fm,fb,whole,tol,depth){const m=(a+b)/2,l=f((a+m)/2),r=f((m+b)/2),left=s(a,m,fa,l,fm),right=s(m,b,fm,r,fb),delta=left+right-whole;
      if(Math.abs(delta)<=15*tol)return {value:left+right+delta/15,error:Math.abs(delta)/15};
      if(!depth)throw Error('The numerical integral did not converge. Try a shorter or simpler interval.');
      const u=recurse(a,m,fa,l,fm,left,tol/2,depth-1),v=recurse(m,b,fm,r,fb,right,tol/2,depth-1);return {value:u.value+v.value,error:u.error+v.error};}
    const fa=f(a),fm=f((a+b)/2),fb=f(b);return recurse(a,b,fa,fm,fb,s(a,b,fa,fm,fb),tol,20);
  }
  function number(input){const p=parse(input);if(JSON.stringify(p.ast).includes('"op":"x"'))throw Error('The interval endpoints must be numbers, such as -1 or -pi.');const value=evaluate(p.ast,0);if(!Number.isFinite(value))throw Error('Enter finite interval endpoints.');return value;}
  function create(f1Input,f2Input,aInput,bInput){
    const a=number(aInput),b=number(bInput);if(!(a<b)||b-a<.0001||Math.max(Math.abs(a),Math.abs(b))>50)throw Error('Use increasing endpoints between -50 and 50, at least 0.0001 apart.');
    const p1=parse(f1Input),p2=parse(f2Input);interval(p1.ast,a,b);interval(p2.ast,a,b);
    const f1=x=>evaluate(p1.ast,x),f2=x=>evaluate(p2.ast,x),diff=x=>f1(x)-f2(x),dr=x=>derivative(p1.ast,x)-derivative(p2.ast,x);
    let min=Infinity,max=-Infinity,maxGap=0;const samples=8192,values=[];
    for(let i=0;i<=samples;i++){const x=a+(b-a)*i/samples,u=f1(x),v=f2(x);if(!Number.isFinite(u)||!Number.isFinite(v)||Math.max(Math.abs(u),Math.abs(v))>10000)throw Error('Both functions must stay finite and within ±10000 throughout the interval.');min=Math.min(min,u,v);max=Math.max(max,u,v);maxGap=Math.max(maxGap,Math.abs(u-v));values.push(u-v);}
    if(maxGap<1e-10)throw Error('These curves coincide on the interval, so there is no region between them.');
    const c1=polynomial(p1.ast),c2=polynomial(p2.ast);let roots=[];
    if(c1&&c2){const c=Array.from({length:Math.max(c1.length,c2.length)},(_,i)=>(c1[i]||0)-(c2[i]||0));roots=polyRoots(c,a,b);}
    else{
      const eps=1e-10*Math.max(1,maxGap);let previousDerivative=dr(a);
      for(let i=0;i<=samples;i++){
        const x=a+(b-a)*i/samples;if(Math.abs(values[i])<eps)roots.push(x);
        if(i&&values[i-1]*values[i]<0)roots.push(bisect(diff,a+(b-a)*(i-1)/samples,x));
        const d=dr(x);
        if(i&&Number.isFinite(d)&&Number.isFinite(previousDerivative)&&d*previousDerivative<0){const critical=bisect(dr,a+(b-a)*(i-1)/samples,x);if(Math.abs(diff(critical))<eps)roots.push(critical);}
        previousDerivative=d;
      }
    }
    const separation=(b-a)*1e-7;
    roots=roots.filter(x=>x>=a-separation&&x<=b+separation).map(x=>Math.abs(x-a)<separation?a:Math.abs(x-b)<separation?b:x).sort((u,v)=>u-v).filter((x,i,all)=>!i||x-all[i-1]>separation);
    if(roots.length>32)throw Error('There are more than 32 intersections. Use a shorter interval to keep the pieces clear.');
    const cuts=[a,...roots.filter(x=>x>a+separation&&x<b-separation),b];
    const pieces=[];
    for(let i=0;i<cuts.length-1;i++){
      const lo=cuts[i],hi=cuts[i+1],mid=(lo+hi)/2,upper=diff(mid)>=0?1:2;
      const tolerance=1e-10*Math.max(1,maxGap*maxGap*(hi-lo));
      // x = t² removes the square-root endpoint slope for the curated root functions.
      const result=lo===0&&(f1Input==='sqrt(x)'||f2Input==='sqrt(x)')?integrate(t=>diff(t*t)**2*2*t,0,Math.sqrt(hi),tolerance):integrate(x=>diff(x)**2,lo,hi,tolerance);
      if(result.value>1e-14)pieces.push({a:lo,b:hi,upper,lower:upper===1?2:1,baseVolume:result.value,error:result.error,index:pieces.length});
    }
    if(!pieces.length)throw Error('No non-zero region was found between these curves.');
    const normalize=s=>s.replace(/\s/g,'').replace(/π/g,'pi');
    const preset=Object.keys(presets).find(key=>{const p=presets[key];return normalize(p.f1)===normalize(f1Input)&&normalize(p.f2)===normalize(f2Input)&&Math.abs(number(p.a)-a)<1e-9&&Math.abs(number(p.b)-b)<1e-9;})||null;
    return {a,b,f1Input:p1.text,f2Input:p2.text,f1,f2,roots,pieces,preset,min,max,maxGap,upper:x=>Math.max(f1(x),f2(x)),lower:x=>Math.min(f1(x),f2(x)),side:x=>Math.abs(diff(x)),baseVolume:pieces.reduce((sum,p)=>sum+p.baseVolume,0),method:c1&&c2?'Polynomial intersections':'Numerical intersections'};
  }
  const api={parse,evaluate,number,create,integrate,presets};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CrossSectionFunctions=api;
})(typeof window!=='undefined'?window:globalThis);
