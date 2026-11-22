(function(root){
'use strict';
const prime=n=>Number.isInteger(n)&&n>1&&!Array.from({length:Math.max(0,Math.floor(Math.sqrt(n))-1)},(_,i)=>i+2).some(d=>n%d===0);
const square=n=>n>=0&&Number.isInteger(Math.sqrt(n));
const cube=n=>Number.isInteger(Math.round(Math.cbrt(n)))&&Math.round(Math.cbrt(n))**3===n;
const triangular=n=>n>0&&Number.isInteger((Math.sqrt(8*n+1)-1)/2);
const prop=(id,text,test)=>({id,text,test});
const numberProperties=[
 prop('odd','It is the only odd number.',n=>Math.abs(n%2)===1),prop('even','It is the only even number.',n=>n%2===0),
 prop('prime','It is the only prime number.',prime),prop('composite','It is the only composite number.',n=>n>1&&!prime(n)),
 prop('square','It is the only square number.',square),prop('cube','It is the only integer cube.',cube),prop('triangular','It is the only positive triangular number.',triangular),
 prop('negative','It is the only negative number.',n=>n<0),prop('zero','It is the only zero.',n=>n===0),prop('positive','It is the only positive number.',n=>n>0),
 prop('even-prime','It is the only even prime.',n=>prime(n)&&n%2===0),prop('odd-prime','It is the only odd prime.',n=>prime(n)&&n%2!==0),
 prop('even-composite','It is the only even composite number.',n=>n>1&&!prime(n)&&n%2===0),prop('odd-composite','It is the only odd composite number.',n=>n>1&&!prime(n)&&n%2!==0),
 prop('odd-square','It is the only odd square.',n=>square(n)&&n%2!==0),prop('even-square','It is the only even square.',n=>square(n)&&n%2===0),
 prop('power-two','It is the only power of 2 (including 2⁰ = 1).',n=>n>=1&&Number.isInteger(Math.log2(n))),
 prop('one-digit','It is the only positive one-digit number.',n=>n>=1&&n<=9),prop('two-digit','It is the only positive two-digit number.',n=>n>=10&&n<=99),prop('three-digit','It is the only positive three-digit number.',n=>n>=100&&n<=999),
 ...[3,4,5,6,7,8,9,10].map(d=>prop('multiple-'+d,`It is the only multiple of ${d}.`,n=>n%d===0)),
 prop('negative-square-magnitude','It is the only negative number whose absolute value is a square.',n=>n<0&&square(-n)),
 prop('unit','It is the only number with absolute value 1.',n=>Math.abs(n)===1)
];
const regular=(n,r=88)=>Array.from({length:n},(_,i)=>[r*Math.cos(-Math.PI/2+2*Math.PI*i/n),r*Math.sin(-Math.PI/2+2*Math.PI*i/n)]);
const polygon=(id,name,points,extra)=>({id,name,points,sides:points.length,curved:false,convex:true,regular:false,right:0,symmetry:0,parallel:0,equalSides:false,equalAngles:false,...extra});
const shapes={
 equilateral:polygon('equilateral','Equilateral triangle',[[0,-90],[45*Math.sqrt(3),45],[-45*Math.sqrt(3),45]],{regular:true,symmetry:3,equalSides:true,equalAngles:true,acute:true}),
 rightIso:polygon('rightIso','Isosceles right-angled triangle',[[-75,-75],[75,75],[-75,75]],{right:1,symmetry:1}),
 rightScalene:polygon('rightScalene','Scalene right-angled triangle',[[-95,70],[85,70],[-95,-50]],{right:1}),
 acuteScalene:polygon('acuteScalene','Scalene acute triangle',[[-90,65],[95,65],[-25,-80]],{acute:true}),
 obtuseIso:polygon('obtuseIso','Isosceles obtuse triangle',[[-95,35],[95,35],[0,-10]],{symmetry:1,obtuse:true}),
 square:polygon('square','Square',[[-70,-70],[70,-70],[70,70],[-70,70]],{right:4,symmetry:4,parallel:2,equalSides:true,equalAngles:true,regular:true}),
 rectangle:polygon('rectangle','Non-square rectangle',[[-100,-60],[100,-60],[100,60],[-100,60]],{right:4,symmetry:2,parallel:2,equalAngles:true}),
 rhombus:polygon('rhombus','Non-square rhombus',[[0,-55],[100,0],[0,55],[-100,0]],{symmetry:2,parallel:2,equalSides:true}),
 parallelogram:polygon('parallelogram','Non-rectangular parallelogram',[[-100,60],[60,60],[100,-60],[-60,-60]],{parallel:2}),
 trapezium:polygon('trapezium','Isosceles trapezium',[[-100,60],[100,60],[60,-60],[-60,-60]],{symmetry:1,parallel:1}),
 rightTrapezium:polygon('rightTrapezium','Right-angled trapezium',[[-100,60],[100,60],[40,-60],[-100,-60]],{right:2,parallel:1}),
 kite:polygon('kite','Convex kite',[[0,-95],[65,15],[0,85],[-65,15]],{symmetry:1}),
 pentagon:polygon('pentagon','Regular pentagon',regular(5),{regular:true,symmetry:5,equalSides:true,equalAngles:true}),
 hexagon:polygon('hexagon','Regular hexagon',regular(6),{regular:true,symmetry:6,parallel:3,equalSides:true,equalAngles:true}),
 dart:polygon('dart','Concave kite',[[0,-95],[80,70],[0,30],[-80,70]],{convex:false,symmetry:1}),
 circle:{id:'circle',name:'Circle',curved:true,sides:0,symmetry:Infinity,parallel:0,right:0,convex:true,regular:false,equalSides:false,equalAngles:false}
};
const shapeProperties=[
 prop('curved','It is the only shape with a curved boundary.',s=>s.curved),prop('concave','It is the only concave polygon: it has an interior angle greater than 180°.',s=>!s.curved&&!s.convex),
 ...[3,4,5,6].map(n=>prop('sides-'+n,`It is the only polygon with ${n} sides.`,s=>s.sides===n)),
 prop('regular','It is the only regular polygon: all its sides and all its angles are equal.',s=>s.regular),
 prop('equal-sides','It is the only polygon with all sides equal.',s=>!s.curved&&s.equalSides),
 prop('equal-angles','It is the only polygon with all interior angles equal.',s=>!s.curved&&s.equalAngles),
 ...[0,1,2,3,4,5,6].map(n=>prop('symmetry-'+n,`It is the only shape with ${n===0?'no lines':n===1?'exactly one line':`exactly ${n} lines`} of reflection symmetry.`,s=>s.symmetry===n)),
 ...[1,2,3].map(n=>prop('parallel-'+n,`It is the only polygon with exactly ${n===1?'one pair':n+' pairs'} of parallel sides.`,s=>!s.curved&&s.parallel===n)),
 ...[1,2,4].map(n=>prop('right-'+n,`It is the only polygon with exactly ${n===1?'one right angle':n+' right angles'}.`,s=>s.right===n)),
 prop('unequal-rectangle','It is the only quadrilateral with four right angles and unequal adjacent side lengths.',s=>s.sides===4&&s.right===4&&!s.equalSides),
 prop('oblique-rhombus','It is the only quadrilateral with all sides equal and no right angles.',s=>s.sides===4&&s.equalSides&&s.right===0),
 prop('scalene-acute','It is the only acute triangle with no equal sides.',s=>s.sides===3&&s.acute&&s.symmetry===0),
 prop('scalene-right','It is the only right-angled triangle with no equal sides.',s=>s.sides===3&&s.right===1&&s.symmetry===0),
 prop('obtuse-triangle','It is the only triangle with an obtuse angle.',s=>s.sides===3&&s.obtuse),
 prop('convex-no-parallels','It is the only convex polygon with no parallel sides.',s=>!s.curved&&s.convex&&s.parallel===0),
 prop('symmetric-trapezium','It is the only polygon with one pair of parallel sides and reflection symmetry.',s=>s.parallel===1&&s.symmetry>0)
];
const numberSets=[
 ['n01','starter',[9,16,25,36]],['n02','starter',[2,3,4,9]],['n03','starter',[4,6,9,10]],['n04','starter',[1,2,3,4]],
 ['n05','starter',[5,8,9,12]],['n06','starter',[7,10,16,27]],['n07','starter',[14,8,15,25]],['n08','starter',[3,4,5,8]],
 ['n09','challenge',[-9,0,8,25]],['n10','challenge',[-8,-4,9,10]],['n11','challenge',[16,27,49,100]],['n12','challenge',[25,64,81,121]],
 ['n13','challenge',[-1,2,9,27]],['n14','challenge',[0,1,27,36]],['n15','challenge',[12,25,27,64]],['n16','challenge',[10,16,21,125]]
].map(([id,level,values])=>({id,topic:'numbers',level,values}));
const shapeSets=[
 ['s01','starter',['square','rectangle','equilateral','circle']],['s02','starter',['square','equilateral','pentagon','hexagon']],
 ['s03','starter',['circle','square','trapezium','dart']],['s04','starter',['circle','equilateral','rightIso','rectangle']],
 ['s05','starter',['rectangle','rightTrapezium','kite','hexagon']],['s06','starter',['square','rhombus','trapezium','rightTrapezium']],
 ['s07','challenge',['square','rectangle','rhombus','parallelogram']],['s08','challenge',['equilateral','rightIso','rightScalene','acuteScalene']],
 ['s09','challenge',['equilateral','obtuseIso','rightScalene','acuteScalene']],['s10','challenge',['rhombus','trapezium','kite','parallelogram']],
 ['s11','challenge',['dart','kite','trapezium','rightTrapezium']],['s12','challenge',['pentagon','hexagon','rightIso','rightTrapezium']]
].map(([id,level,values])=>({id,topic:'shapes',level,values}));
const sets=[...numberSets,...shapeSets];
function reasons(set,index){const tests=set.topic==='numbers'?numberProperties:shapeProperties,values=set.topic==='numbers'?set.values:set.values.map(id=>shapes[id]);return tests.filter(p=>p.test(values[index])&&values.filter(v=>p.test(v)).length===1).map(p=>({id:p.id,text:p.text}));}
function available(topic='both',level='all'){return sets.filter(s=>(topic==='both'||s.topic===topic)&&(level==='all'||s.level===level));}
function shuffle(items,random=Math.random){const out=items.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
function deck(){const pools=new Map();let previous=null;return {next(topic,level,random=Math.random){const key=topic+':'+level;let pool=pools.get(key);if(!pool||!pool.length){pool=shuffle(available(topic,level),random);if(pool.length>1&&pool[pool.length-1].id===previous)[pool[0],pool[pool.length-1]]=[pool[pool.length-1],pool[0]];pools.set(key,pool);}if(!pool.length)throw new RangeError('No sets match these filters.');const result=pool.pop();previous=result.id;return result;}};}
const api={prime,square,cube,triangular,shapes,numberProperties,shapeProperties,sets,reasons,available,shuffle,deck};if(typeof module==='object'&&module.exports)module.exports=api;else root.KaizenOOO=api;
})(typeof window!=='undefined'?window:globalThis);
