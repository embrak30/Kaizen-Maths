const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'tools/cross-section-solids/index.html'), 'utf8');
const nodes = new Map();
function element(id = '') {
  return { id, value: '', textContent: '', innerHTML: '', hidden: false, dataset: {}, attributes: {}, style: {}, listeners: {},
    classList: { toggle() {}, remove() {} }, setAttribute(k, v) { this.attributes[k] = String(v); },
    addEventListener(type, handler) { this.listeners[type] = handler; },
    getBoundingClientRect() { return { width: 900, height: 600 }; }, setPointerCapture() {} };
}
for (const match of html.matchAll(/id="([^"]+)"/g)) nodes.set(match[1], element(match[1]));
const buttons = [];
for (const match of html.matchAll(/data-(shape|stage|view)="([^"]+)"/g)) {
  const button = element(); button.dataset[match[1]] = match[2]; buttons.push(button);
}
let frames = [], clock = 0;
const context = vm.createContext({ console, Math, performance: { now: () => clock },
  matchMedia: () => ({ matches: false }), ResizeObserver: class { observe() {} },
  requestAnimationFrame(callback) { frames.push(callback); return frames.length; }, cancelAnimationFrame() {},
  window: { devicePixelRatio: 1, addEventListener() {} }, document: { hidden: false,
    createElement: () => ({getContext: () => new Proxy({}, {get: () => () => {}})}),
    getElementById: id => nodes.get(id), querySelectorAll: selector => buttons.filter(b => selector.includes(Object.keys(b.dataset)[0])) } });
nodes.get('scene').getContext = () => new Proxy({}, { get: () => () => {} });
context.window.CrossSectionFunctions = require('../tools/cross-section-solids/function-model.js');
vm.runInContext(fs.readFileSync(path.join(root, 'tools/cross-section-solids/explorer.js'), 'utf8'), context);
const explorer = context.window.crossSectionExplorer;
const near = (a, b, tolerance = 1e-10) => assert(Math.abs(a - b) <= tolerance, `${a} != ${b}`);
function polygonArea(points) {
  return Math.abs(points.reduce((sum, p, i) => { const q = points[(i + 1) % points.length]; return sum + p[1] * q[2] - q[1] * p[2]; }, 0)) / 2;
}
for (const shape of Object.keys(explorer.shapes)) {
  for (const x of [0, .1, .25, .5, .8, 1]) {
    const points = explorer.section(x, shape), s = Math.sqrt(x) - x * x;
    points.forEach(p => { near(p[0], x); p.forEach(value => assert(Number.isFinite(value))); });
    // Circle outlines use 64 points; their area converges to that of the exact circle.
    const expected = explorer.shapes[shape].factor * s * s;
    near(polygonArea(points), expected, shape === 'square' || shape === 'triangle' ? 1e-10 : .0012);
    if (shape === 'square') near(Math.hypot(...points[2].map((v, i) => v - points[1][i])), s);
    if (shape === 'triangle') {
      for (let i = 0; i < 3; i++) near(Math.hypot(...points[i].map((v, j) => v - points[(i + 1) % 3][j])), s);
    }
    if (shape === 'radius' || shape === 'diameter') {
      const center = shape === 'radius' ? x * x : x * x + s / 2;
      const radius = shape === 'radius' ? s : s / 2;
      points.forEach(p => near(Math.hypot(p[1] - center, p[2]), radius));
    }
  }
  let sum = 0; const n = 100000;
  for (let i = 0; i < n; i++) { const x = (i + .5) / n; sum += explorer.shapes[shape].factor * explorer.side(x) ** 2 / n; }
  near(sum, explorer.volume(shape), 1e-9);
}
function click(data, value) { buttons.find(b => b.dataset[data] === value).listeners.click(); }
click('shape', 'diameter'); assert.equal(explorer.state.stage, 2);
assert.equal(nodes.get('length-label').textContent, 'Diameter');
click('stage', '4'); assert.equal(nodes.get('volume-panel').dataset.revealed, 'true');
assert.equal(nodes.get('volume-exact').textContent, '9π / 280');
click('shape', 'radius'); assert.equal(nodes.get('volume-exact').textContent, '9π / 70');
nodes.get('position').listeners.input({ target: { value: '1000' } });
assert.equal(nodes.get('area-value').textContent, '0.0000');
click('view', 'section'); assert.equal(explorer.state.view, 'section');
nodes.get('scene').listeners.keydown({ key: 'ArrowLeft', preventDefault() {} });
assert.equal(explorer.state.view, 'custom');
nodes.get('play').listeners.click(); assert.equal(explorer.state.playing, true);
clock = 1000; frames.shift()(clock); // Exercise the renderer and animation loop.
assert(Number.isFinite(explorer.state.x));
for (const shape of Object.keys(explorer.shapes)) {
  click('shape', shape); click('stage', '3'); clock += 1800; frames.shift()(clock);
  near(explorer.state.fill, 1);
}
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
assert(app.includes('slug: "cross-section-solids"'));
for (const slug of ['integration', 'volumes-of-revolution']) {
  const page = fs.readFileSync(path.join(root, 'tools', slug, 'index.html'), 'utf8');
  assert(page.includes('index.html#/tools/cross-section-solids'));
}
console.log('PASS: all four geometries, independent volume integration, endpoint areas, shape/stage controls, camera keyboard controls, animation/rendering, and integration links.');

const Functions = context.window.CrossSectionFunctions;
near(Functions.evaluate(Functions.parse('-x^2').ast, 3), -9);
near(Functions.evaluate(Functions.parse('2x + sin(pi/2)').ast, 3), 7);
for(const input of ['alert(1)', 'x;process.exit()', 'window.x']) assert.throws(()=>Functions.parse(input));
for(const args of [['1/x','0','-1','1'],['sqrt(x)','0','-1','1'],['tan(x)','0','0','pi'],['x','x','0','1']]) assert.throws(()=>Functions.create(...args));
const crossing=Functions.create('x^3','x','-1','1');
assert.equal(crossing.pieces.length,2);assert.equal(crossing.pieces[0].upper,1);assert.equal(crossing.pieces[1].upper,2);near(crossing.baseVolume,16/105,1e-9);
assert.equal(Functions.create('sin(2x)','0','-pi','pi').pieces.length,4);
assert.equal(Functions.create('(x-.2)^2','0','0','1').pieces.length,2);
assert.equal(Functions.create('(x-.2)*(x-.201)*(x-.8)','0','0','1').roots.length,3);
function apply(f1,f2){nodes.get('function-one').value=f1;nodes.get('function-two').value=f2;nodes.get('function-one').listeners.change();}
apply('x^3','x');assert.equal(explorer.model.pieces.length,2);near(explorer.volume('square'),16/105);
assert.equal(explorer.model.a,-1);assert.equal(explorer.model.b,1);
click('shape','square');click('stage','4');assert(nodes.get('expanded-formula').innerHTML.includes('((x³) − (x))²'));assert(nodes.get('expanded-formula').innerHTML.includes('((x) − (x³))²'));
nodes.get('region-focus').value='0';nodes.get('region-focus').listeners.change();near(explorer.volume('square'),8/105);
apply('x','x');assert.equal(nodes.get('function-error').hidden,false);near(explorer.volume('square'),8/105);
apply('sin(2x)','0');assert.equal(explorer.model.pieces.length,4);near(explorer.volume('square'),Math.PI,1e-8);near(explorer.model.a,-Math.PI);
apply('sqrt(x)','cos(x)');assert.equal(explorer.model.a,0);assert.equal(explorer.model.b,1);
assert(!html.includes('id="bound-a"'));assert(html.includes('<select id="function-one">'));assert(html.includes('classroom.css'));
clock+=1000;frames.shift()(clock);
console.log('PASS: function dropdowns, automatic domains, duplicate rejection, explicit integrands, per-region volumes and rendering.');

const curated=[...html.split('<select id="function-one">')[1].split('</select>')[0].matchAll(/value="([^"]+)"/g)].map(m=>m[1]);
let pairCount=0;for(const f1 of curated)for(const f2 of curated){if(f1===f2)continue;apply(f1,f2);assert.equal(nodes.get('function-error').hidden,true,`${f1}, ${f2}`);assert(Number.isFinite(explorer.volume('square')));pairCount++;}
assert.equal(pairCount,110);console.log('PASS: all 110 curated function pairings.');

apply('x^2','x^3');
click('view','top');clock+=1000;frames.shift()(clock);
const origin=explorer.project([0,0,0]),positiveX=explorer.project([1,0,0]),positiveY=explorer.project([0,1,0]);
assert(positiveX[0]>origin[0],'Base plane: positive x must point right');
assert(positiveY[1]<origin[1],'Base plane: positive y must point up');
for(const x of [-1,-.5,.5,1]){const p=explorer.project([x,explorer.model.f1(x),0]);assert(p[1]<origin[1],'x² must lie above the x-axis on both sides');}
assert(explorer.project([-.5,explorer.model.f2(-.5),0])[1]>origin[1],'Negative x³ must be below the x-axis');
assert(explorer.project([.5,explorer.model.f2(.5),0])[1]<origin[1],'Positive x³ must be above the x-axis');
apply('x^3','x^2');clock+=1000;frames.shift()(clock);
assert(explorer.project([.5,explorer.model.f2(.5),0])[1]<explorer.project([.5,0,0])[1],'x² orientation is independent of function slot');
click('view','perspective');clock+=1000;frames.shift()(clock);
assert(explorer.project([0,1,0])[1]<explorer.project([0,0,0])[1],'Default perspective: positive y rises');
assert(explorer.project([0,0,1])[1]<explorer.project([0,0,0])[1],'Default perspective: positive z rises');
console.log('PASS: standard axis orientation, x² opens upwards in either slot, x³ signs, and positive z in perspective.');
