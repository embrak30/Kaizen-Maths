(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.KaizenMultiplicationMethods=api;})(typeof window!=='undefined'?window:null,function(){
'use strict';
const methods={
 partition:{label:'Partitioning',why:'The distributive law lets us multiply each place-value part, then add the partial products.',ask:'What does each part of the second factor represent?',watch:'Keep the value of the tens: 3 tens means 30, not 3.'},
 area:{label:'Area model',why:'Splitting both side lengths partitions one rectangle into smaller rectangles. Their areas add to the original product. This place-value grid organises those areas; box sizes are schematic.',ask:'Which two side lengths produce this box? How do the boxes connect to partitioning?',watch:'Multiply the place values on both edges. Do not add the labels to fill a box.'},
 column:{label:'Column multiplication',why:'The written algorithm records the same partial products in place-value columns. Regrouping exchanges ten units of one place for one unit of the next.',ask:'Where should the carried value go? Why does the tens row end in zero?',watch:'A carried digit belongs to the next place. The tens multiplier represents tens, so the next partial product is shifted one place.'},
 lattice:{label:'Lattice',why:'Each cell separates a digit product into tens and units. Diagonals collect digits with the same place value; carries move to the next diagonal.',ask:'Why do these digits belong to the same diagonal?',watch:'Write a two-digit product in every cell, including a zero in the tens triangle when needed. Add from the units diagonal.'},
 russian:{label:'Russian multiplication',why:'For an even left factor, halving it and doubling the right preserves the product. For an odd left factor, a × b = floor(a/2) × (2b) + b. Keeping the right value from every odd row recovers each remainder.',ask:'What is lost when an odd number is halved and rounded down? Where is that amount kept?',watch:'Halving is rounded down here. Keep the right-hand value when the LEFT entry is odd; do not select using the right-hand parity.'},
 doubling:{label:'Doubling & halving',why:'Halving one factor and doubling the other preserves the product: (a ÷ 2) × (2b) = a × b. Unlike Russian multiplication, this method does not discard remainders.',ask:'Will this change make the multiplication easier? Is there an even factor we could halve?',watch:'Halve one factor and double the other. Halving an odd factor creates a half; rounding down would change the product.'},
 compare:{label:'Compare methods',why:'Partitioning, the area grid and column multiplication record the same distributive structure. Each coloured group represents multiplication by the same place-value part of the second factor.',ask:'Find the same partial product in all three representations.',watch:'In the grid, add the boxes in one row to match one partial product in the other methods.'}
};
const presets=[[24,13],[32,24],[16,25],[18,12],[234,12],[342,57],[47,36],[39,18],[25,13]];
const parts=n=>String(n).split('').map((v,i,all)=>Number(v)*10**(all.length-i-1)).filter(Boolean);
const copy=v=>JSON.parse(JSON.stringify(v));
function build(a,b,method){
 if(!Number.isSafeInteger(a)||a<1||a>999||!Number.isSafeInteger(b)||b<1||b>99)throw Error('Use whole numbers: first factor 1–999, second factor 1–99.');
 if(!methods[method])throw Error('Choose a method.');
 const frames=[],base={a,b,product:a*b,ap:parts(a),bp:parts(b),method},push=(title,prompt,state={})=>frames.push({...base,title,prompt,...copy(state)});
 if(method==='partition'){
  push('Start with the factors','How could we split '+b+' into place-value parts?',{split:false,done:0});
  push('Partition the second factor',b+' = '+base.bp.join(' + '),{split:true,done:0});
  base.bp.forEach((part,i)=>push('Multiply by '+part,a+' × '+part+' = '+a*part,{split:true,done:i+1}));
  push('Combine the partial products',base.bp.map(p=>a*p).join(' + ')+' = '+a*b,{split:true,done:base.bp.length,final:true});
 }else if(method==='area'){
  push('Set out the place-value grid','Split both factors into their place-value parts.',{done:0});
  let done=0;for(let row=0;row<base.bp.length;row++)for(let col=0;col<base.ap.length;col++)push('Fill one box',base.ap[col]+' × '+base.bp[row]+' = '+base.ap[col]*base.bp[row],{done:++done,focus:[row,col]});
  const values=base.bp.flatMap(y=>base.ap.map(x=>x*y));let total=values[0];
  for(let i=1;i<values.length;i++){const before=total;total+=values[i];push('Add the areas',before+' + '+values[i]+' = '+total,{done,adding:i+1,total});}
  push('The whole product','The areas add to '+a*b+'.',{done,final:true});
 }else if(method==='column'){
  const ad=String(a).split('').reverse().map(Number),bd=String(b).split('').reverse().map(Number),state={rows:bd.map(()=>''),carry:0,carryPlace:0,sum:'',phase:'multiply',activeRow:0};
  push('Align the place values','Line up the units, tens and hundreds.',state);
  bd.forEach((digit,j)=>{
   state.activeRow=j;state.carry=0;state.rows[j]='0'.repeat(j);push('Multiply by '+digit*10**j,j?'This row multiplies by '+digit*10**j+'. Its final '+j+' place'+(j>1?'s are':' is')+' zero.':'Begin with the units digit of the multiplier.',state);
   let carry=0;
   ad.forEach((d,i)=>{const incoming=carry,value=d*digit+incoming;carry=Math.floor(value/10);state.rows[j]=String(value%10)+state.rows[j];state.carry=carry;state.carryPlace=i+1;
    push('Multiply and regroup',digit+' × '+d+(incoming?' + '+incoming:'')+' = '+value+'. Write '+value%10+(carry?'; carry '+carry+' to the next place.':'.'),state);
   });
   if(carry){state.rows[j]=String(carry)+state.rows[j];state.carry=0;push('Record the final carry','Write the remaining '+carry+' in the next place.',state);}
   state.rows[j]=String(a*digit*10**j);push('Partial product complete',a+' × '+digit*10**j+' = '+a*digit*10**j,state);
  });
  state.carry=0;
  if(bd.length>1){const values=bd.map((digit,j)=>a*digit*10**j);state.phase='add';push('Add the partial products','Add from the units column, keeping each place aligned.',state);let carry=0;const length=String(a*b).length;
   for(let i=0;i<length;i++){const digits=values.map(v=>Math.floor(v/10**i)%10),incoming=carry,value=digits.reduce((x,y)=>x+y,0)+incoming;carry=Math.floor(value/10);state.sum=String(value%10)+state.sum;state.carry=carry;state.carryPlace=i+1;push('Add the '+(['units','tens','hundreds','thousands','ten-thousands'][i]||'next')+' column',digits.join(' + ')+(incoming?' + '+incoming:'')+' = '+value+'. Write '+value%10+(carry?'; carry '+carry+'.':'.'),state);}
  }
  state.sum=String(a*b);state.phase='complete';push('Read the product',a+' × '+b+' = '+a*b,{...state,final:true});
 }else if(method==='lattice'){
  const ac=String(a).split('').map(Number),br=String(b).split('').map(Number),cells=br.flatMap((digit,row)=>ac.map((d,col)=>({row,col,value:d*digit}))),diagonals=Array(ac.length+br.length).fill(0),diagonalTerms=Array.from({length:ac.length+br.length},()=>[]);
  cells.forEach(c=>{const d=ac.length-1-c.col+br.length-1-c.row;diagonals[d]+=c.value%10;diagonals[d+1]+=Math.floor(c.value/10);diagonalTerms[d].push(c.value%10);diagonalTerms[d+1].push(Math.floor(c.value/10));});
  push('Set up the lattice','Write one factor across the top and the other down the right.',{ac,br,cells,done:0,digits:[]});
  cells.forEach((c,i)=>push('Fill one cell',ac[c.col]+' × '+br[c.row]+' = '+String(c.value).padStart(2,'0')+'. Tens go above the diagonal; units go below.',{ac,br,cells,done:i+1,focus:[c.row,c.col],digits:[]}));
  let carry=0;const digits=[];
  diagonals.forEach((value,d)=>{const incoming=carry,total=value+incoming;digits.push(total%10);carry=Math.floor(total/10);push('Add diagonal '+(d+1),diagonalTerms[d].join(' + ')+(incoming?' + carried '+incoming:'')+' = '+total+'. '+(d>=String(a*b).length?'Omit the leading zero.':'Write '+total%10+'.')+(carry?' Carry '+carry+' to the next diagonal.':''),{ac,br,cells,done:cells.length,digits:[...digits],diagonal:d,carry});});
  push('Read the outside digits',a+' × '+b+' = '+a*b,{ac,br,cells,done:cells.length,digits,final:true});
 }else if(method==='russian'){
  const rows=[];let left=a,right=b;while(left>=1){rows.push({left,right,keep:left%2===1});left=Math.floor(left/2);right*=2;}
  push('Begin the two columns','Put '+a+' on the left and '+b+' on the right.',{rows,visible:1,selected:0});
  for(let i=1;i<rows.length;i++)push('Halve and double','Halve '+rows[i-1].left+(rows[i-1].left%2?' and round down':'')+' to '+rows[i].left+'; double '+rows[i-1].right+' to '+rows[i].right+'.',{rows,visible:i+1,selected:0});
  rows.forEach((row,i)=>push(row.keep?'Keep this row':'Cross out this row',row.left+' is '+(row.keep?'odd, so keep '+row.right+'.':'even, so do not add '+row.right+'.'),{rows,visible:rows.length,selected:i+1,focusRow:i}));
  const kept=rows.filter(r=>r.keep);let total=0;
  kept.forEach((row,i)=>{const before=total;total+=row.right;push('Add the kept values',before+' + '+row.right+' = '+total,{rows,visible:rows.length,selected:rows.length,total,added:i+1});});
  push('The kept values make the product',kept.map(r=>r.right).join(' + ')+' = '+a*b,{rows,visible:rows.length,selected:rows.length,total,final:true});
 }else if(method==='doubling'){
  let left=a,right=b;const rows=[{left,right}];push('Keep the product unchanged','Which factor would be useful to halve?',{rows});
  if(left%2&&right%2===0){[left,right]=[right,left];rows.push({left,right});push('Swap the factors','Multiplication is commutative: '+a+' × '+b+' = '+left+' × '+right+'.',{rows});}
  if(left%2){left/=2;right*=2;rows.push({left,right});push('Halving an odd factor creates a half','Use '+left+' exactly; rounding it down would change the product.',{rows,half:true});}
  else while(left%2===0){left/=2;right*=2;rows.push({left,right});push('Halve one, double the other',left+' × '+right+' still equals the original product.',{rows});if(/^10*$/.test(String(right)))break;}
  push('Choose a useful equivalent product',left+' × '+right+' = '+a*b+'.'+(rows.some(r=>!Number.isInteger(r.left))?' This is valid, but another method may be easier.':''),{rows,final:true});
 }else{
  push('One calculation, three representations','Use the same factors in every method.',{done:0});
  base.bp.forEach((part,i)=>push('Connect multiplication by '+part,'Each matching colour shows '+a+' × '+part+' = '+a*part+'.',{done:i+1}));
  push('The same product in every method',base.bp.map(p=>a*p).join(' + ')+' = '+a*b,{done:base.bp.length,final:true});
 }
 if(method==='doubling')frames.forEach(f=>f.totalRows=frames.at(-1).rows.length);
 return frames;
}
return{methods,presets,parts,build};
});
