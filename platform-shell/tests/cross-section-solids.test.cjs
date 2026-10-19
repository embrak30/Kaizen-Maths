const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'tools/cross-section-solids/index.html'), 'utf8');
const nodes = new Map();
function element(id = '') {
  return { id, value: '', textContent: '', innerHTML: '', hidden: false, dataset: {}, attributes: {}, listeners: {},
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
click('stage', '4'); assert.equal(nodes.get('volume-panel').hidden, false);
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
