(function(){
'use strict';
const M=window.KaizenPythagoras,smooth=t=>{t=M.clamp(t);return t*t*(3-2*t);};
const localProgress=(p,index,count)=>smooth((p*(count+.8)-index)/1.8);
function draw({g,mode,stage,p,poly,line,text,scale}){
  const plan=M.tilePlan(g,mode),n=plan.n,smallCount=g.V*g.V,bigCount=g.H*g.H,total=n*n,frame=mode==='frame';
  const cell=(i,j)=>{const center=plan.cells[j*n+i].center;return M.rigidSquare({center,target:center,side:1},1,plan.angle);};
  const outline={fill:'none',stroke:'#ffe17c','stroke-width':1.4,opacity:.35};
  if(stage>=1){
    poly(g.target,{fill:'#ffe17c','fill-opacity':.025,stroke:'#ffe17c','stroke-width':2.5});
    const t=stage===1?p:1;
    // Empty outlines are measuring spaces, not additional filled tiles.
    if(t>.55)for(let j=0;j<n;j++)for(let i=0;i<n;i++)poly(cell(i,j),{...outline,opacity:.35*M.clamp((t-.55)/.45)});
    for(let i=0;i<n;i++){const visible=M.clamp(t*n/.6-i);if(visible>0)poly(cell(i,0),{...outline,stroke:'#ffe17c','stroke-width':2.5,opacity:visible});}
  }
  const smallerP=stage<2?0:stage===2?(frame?0:p):stage===3?(frame?p:1):1;
  const largerP=stage<2?0:stage===2?(frame?p:0):stage===3?(frame?1:p):1;
  const movedSmall=plan.small.filter((_,i)=>localProgress(smallerP,i,smallCount)>=1-1e-9).length;
  const movedBig=frame?(largerP>=1-1e-9?bigCount:0):plan.big.filter((_,i)=>localProgress(largerP,i,bigCount)>=1-1e-9).length;
  // Ghosts retain the original grids, so the origin of every unit of area stays clear.
  for(const [tiles,color]of[[plan.small,'#35dfc4'],[plan.big,'#52b7ff']])for(const tile of tiles)poly(M.rigidSquare({...tile,target:tile.center},0,0),{fill:'none',stroke:color,'stroke-width':.8,opacity:.17});
  const moving=[];
  function tileDraw(points,color,t){const attrs={fill:color,stroke:'#102a3e','stroke-width':1.15,'stroke-linejoin':'miter'};if(t>0&&t<1)moving.push([points,attrs]);else poly(points,attrs);}
  plan.big.forEach((tile,i)=>{const t=frame?smooth(largerP):localProgress(largerP,i,bigCount);tileDraw(frame?M.rigidBlockTile(tile,plan.block,t,plan.angle):M.rigidSquare(tile,t,plan.angle),'#52b7ff',t);});
  plan.small.forEach((tile,i)=>{const t=localProgress(smallerP,i,smallCount);tileDraw(M.rigidSquare(tile,t,plan.angle),'#35dfc4',t);});
  moving.forEach(([points,attrs])=>poly(points,{...attrs,stroke:'#fff','stroke-width':1.7}));
  if(frame&&largerP>0){poly(M.rigidSquare(plan.block,smooth(largerP),plan.angle),{fill:'none',stroke:'#c9edff','stroke-width':2.5});}
  if(stage>=1)poly(g.target,{fill:'none',stroke:'#ffe17c','stroke-width':2.5});
  poly(g.triangle,{fill:'#f4fbff','fill-opacity':.045,stroke:'#f1f6ff','stroke-width':2.3});
  const r=Math.min(g.H,g.V)*.13;line([r,0],[r,r],{stroke:'#f1f6ff','stroke-width':2});line([r,r],[0,r],{stroke:'#f1f6ff','stroke-width':2});
  text([g.H/2,g.V/2],`c = ${n}`,'#ffe17c',21,[-g.v[0]*30,g.v[1]*30]);
  // Captions sit outside the three grids; no area label obscures a unit square.
  text([-g.V/2,g.V],`${g.V} × ${g.V}`,'#72f2dc',26,[0,-24]);
  text([g.H/2,-g.H],`${g.H} × ${g.H}`,'#91d6ff',26,[0,25]);
  if(stage>=1){const mid=[(g.H+g.V)/2+g.V/2,(g.H+g.V)/2+g.H/2];text(mid,`${n} × ${n}`,'#ffe17c',26,[g.v[0]*32,-g.v[1]*32]);}
  const heading=frame?['Count the unit squares',`${n} unit lengths along the hypotenuse`,`Move the ${g.H} × ${g.H} block`,`Fit the remaining ${smallCount} squares`,'Count the completed square'][stage]:['Count the unit squares',`${n} unit lengths along the hypotenuse`,`Move the ${smallCount} squares first`,`Now move the ${bigCount} squares`,'Count the completed square'][stage];
  const prompt=stage===0?`The ${g.V} × ${g.V} grid has ${smallCount} unit squares. The ${g.H} × ${g.H} grid has ${bigCount}.`:stage===1?`Mark ${n} one-unit spaces along c. The square on c has ${n} rows of ${n} spaces.`:stage===2?(frame?`Keep all ${bigCount} squares joined. Turn and slide the whole block into one corner.`:`Turn and slide each of the ${smallCount} teal unit squares into the new grid.`):stage===3?(frame?`The ${smallCount} teal unit squares fill the L-shaped space around the blue block.`:`Add all ${bigCount} blue unit squares. Each one stays the same size.`):`The same ${smallCount} + ${bigCount} unit squares fill the ${n} × ${n} square exactly.`;
  const count=movedSmall+movedBig;
  const work=stage===0?`<p><span class="b">${g.V}² = ${smallCount}</span></p><p><span class="a">${g.H}² = ${bigCount}</span></p><p class="note">Each little square has area 1.</p>`:stage===1?`<p class="equation">${n} × ${n} = ${total}</p><p class="note">Empty outlines show where the unit squares will fit.</p>`:stage<4?`<p class="tile-count"><strong>${count}</strong> <span>of ${total} placed</span></p><p><span class="b">${movedSmall} teal</span> + <span class="a">${movedBig} blue</span></p><p class="note">${frame?'The blue block stays joined.':'Same unit squares. No stretching.'}</p>`:`<p class="equation"><span class="b">${smallCount}</span> + <span class="a">${bigCount}</span> = <span class="c">${total}</span></p><p>${g.V}² + ${g.H}² = ${n}²</p><p class="note">No gaps. No overlaps.</p>`;
  return {heading,prompt,work,smallCount,bigCount,total};
}
window.KaizenPythagorasSquares={draw};
})();
