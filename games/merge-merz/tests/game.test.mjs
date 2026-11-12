import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

function fixture({ width = 390, height = 844 } = {}) {
  const events = new Map();
  const elements = new Map();
  const stored = new Map();
  let now = 0, sequence = 0;
  const frames = new Map();
  const context = new Proxy({}, { get: (_, name) => name === 'createLinearGradient'
    ? () => ({ addColorStop() {} }) : () => {} });
  function element(id) {
    if (!elements.has(id)) elements.set(id, {
      hidden: id === 'pause-overlay', disabled: false, textContent: '',
      width: 420, height: 700, style: {}, offsetHeight: id === 'top' ? 90 : 36,
      classList: { add() {}, remove() {} },
      setAttribute() {}, getContext: () => context,
      getBoundingClientRect: () => ({ left: 0, width: 420 }),
      setPointerCapture() {}, focus() {}, closest: () => null,
      showModal() { this.open = true; },
      addEventListener(name, cb) { events.set(`${id}:${name}`, cb); },
    });
    return elements.get(id);
  }
  let created = 0;
  const document = { hidden: false, getElementById: element,
    createElement: () => element(`created-${++created}`),
    addEventListener(name, cb) { events.set(`document:${name}`, cb); } };
  const sandbox = {
    document, performance: { now: () => now },
    localStorage: { getItem: key => stored.get(key), setItem: (key, value) => stored.set(key, String(value)) },
    innerWidth: width, innerHeight: height,
    getComputedStyle: () => ({ paddingTop: '8', paddingBottom: '8' }),
    requestAnimationFrame(cb) { frames.set(++sequence, cb); return sequence; },
    cancelAnimationFrame(id) { frames.delete(id); },
    fetch: async () => ({ ok: false }),
    window: { devicePixelRatio: 3,
      i18n: { t: key => key }, gamePalette: { get: () => ({}) },
      addEventListener(name, cb) { events.set(`window:${name}`, cb); },
    },
  };
  let code = readFileSync(new URL('../scripts/game.js', import.meta.url), 'utf8');
  // Test-only access to real physics/state. No debug API ships to the browser.
  code = code.replace('  window.mergeGame = {', `
    window.test = {
      seed: values => { balls = values.map(b => Object.assign(mk(b.lv, b.x, b.y), b)); },
      substep, update, drop, endGame, fit, draw, landingY, rnd,
      sprites: () => sprites,
      state: () => ({balls, score, heldLv, nextLv, cool, paused, over, aimX, popups}),
    };
    window.mergeGame = {`);
  vm.runInNewContext(code, sandbox);
  sandbox.window.mergeGame.start(Array.from({ length: 11 }, () => ({})));
  function fire(id, name, values = {}) {
    const handler = events.get(`${id}:${name}`);
    assert.ok(handler, `Missing ${id}:${name}`);
    handler({ target: element('c'), preventDefault() {}, button: 0, isPrimary: true,
      pointerId: 1, pointerType: 'touch', clientX: 210, ...values });
  }
  function advance(milliseconds, fps = 60) {
    const count = Math.round(milliseconds / 1000 * fps);
    for (let i = 0; i < count; i++) {
      now += 1000 / fps;
      const pending = [...frames.values()]; frames.clear();
      pending.forEach(cb => cb(now));
    }
  }
  return { ...sandbox.window, element, fire, advance, frames, stored, document };
}

test('three touching equal balls merge into one pair, without duplicate ball consumption', () => {
  const g = fixture();
  g.test.seed([{lv:0,x:180,y:500},{lv:0,x:190,y:500},{lv:0,x:200,y:500}]);
  g.test.substep(0);
  const { balls, score } = g.test.state();
  assert.equal(balls.length, 2);
  assert.equal(balls.filter(b => b.lv === 1).length, 1);
  assert.equal(balls.filter(b => b.lv === 0).length, 1);
  assert.equal(score, 3);
});

test('canceled gestures and unrelated/multitouch releases never drop a ball', () => {
  const g = fixture();
  g.fire('c','pointerup');
  assert.equal(g.test.state().balls.length, 0);
  g.fire('c','pointerdown'); g.fire('c','pointercancel'); g.fire('c','pointerup');
  assert.equal(g.test.state().balls.length, 0);
  g.fire('c','pointerdown'); g.fire('c','pointerup',{pointerId:2});
  assert.equal(g.test.state().balls.length, 0);
  g.fire('c','pointerup');
  assert.equal(g.test.state().balls.length, 1);
});

test('single-step undo restores the whole state before the most recent drop', () => {
  const g = fixture();
  const before = g.test.state();
  g.test.drop(); g.advance(700);
  g.fire('undo-drop','click');
  const after = g.test.state();
  assert.equal(after.balls.length, 0);
  assert.equal(after.score, before.score);
  assert.equal(after.heldLv, before.heldLv);
  assert.equal(after.nextLv, before.nextLv);
  assert.equal(g.element('undo-drop').disabled, true);
});

test('physics progression is identical at 30, 60 and 120 display frames per second', () => {
  const positions = [30,60,120].map(fps => {
    const g = fixture(); g.test.seed([{lv:0,x:200,y:200}]);
    g.advance(500, fps); return g.test.state().balls[0].y;
  });
  assert.ok(Math.max(...positions)-Math.min(...positions) < 1e-8);
});

test('pausing stops animation and drops; resuming schedules only one frame', () => {
  const g = fixture();
  assert.equal(g.frames.size, 1);
  g.fire('pause-game','click');
  assert.equal(g.frames.size, 0);
  g.test.drop(); assert.equal(g.test.state().balls.length, 0);
  g.fire('resume-game','click'); assert.equal(g.frames.size, 1);
});

test('backgrounding pauses the game until the player resumes', () => {
  const g = fixture();
  g.document.hidden = true; g.fire('document','visibilitychange');
  assert.equal(g.test.state().paused, true);
  assert.equal(g.frames.size, 0);
  assert.equal(g.element('pause-overlay').hidden, false);
});

test('restart requires confirmation and cancel preserves the board', () => {
  const g = fixture(); g.test.drop();
  g.fire('re','click');
  assert.equal(g.element('restart-dialog').open, true);
  g.element('restart-dialog').returnValue = 'cancel'; g.fire('restart-dialog','close');
  assert.equal(g.test.state().balls.length, 1);
  g.fire('re','click'); g.element('restart-dialog').returnValue = 'restart';
  g.fire('restart-dialog','close'); assert.equal(g.test.state().balls.length, 0);
});

test('portrait and landscape layouts preserve the board aspect ratio within the viewport', () => {
  for (const dimensions of [{width:320,height:568},{width:390,height:844},{width:844,height:390}]) {
    const g = fixture(dimensions), c = g.element('c');
    const w = parseFloat(c.style.width), h = parseFloat(c.style.height);
    assert.ok(Math.abs(w/h-420/700) < 1e-10);
    assert.ok(w <= dimensions.width-24);
    assert.ok(h+90+36+32 <= dimensions.height+0.01);
    assert.ok(c.width <= Math.round(w*2));
  }
});

test('best score survives restarting without having to lose first', () => {
  const g = fixture();
  g.test.seed([{lv:0,x:180,y:500},{lv:0,x:190,y:500}]); g.test.substep(0);
  assert.equal(g.stored.get('merz_heinz_best'), '3');
  g.fire('re','click'); g.element('restart-dialog').returnValue = 'restart';
  g.fire('restart-dialog','close'); assert.equal(g.element('best').textContent, 3);
});

test('invalid theme sizes fail before entering the physics loop', () => {
  const g = fixture();
  for (const count of [0,1,16]) assert.throws(() => g.mergeGame.start(Array(count).fill({})), /2–15/);
});


test('spawned levels scale with the theme size', () => {
  const g = fixture();
  for (const [count, pool] of [[2, 1], [8, 4], [11, 5], [15, 5]]) {
    g.mergeGame.start(Array.from({ length: count }, () => ({})));
    const seen = new Set(Array.from({ length: 400 }, () => g.test.rnd()));
    assert.equal(Math.max(...seen), pool - 1);
  }
});

test('ball sprites are cached between frames and rebuilt after a resize', () => {
  const g = fixture();
  g.test.seed([{lv:2,x:200,y:500},{lv:2,x:300,y:500}]);
  g.test.draw(0);
  const first = g.test.sprites()[2];
  assert.ok(first);
  g.test.draw(16);
  assert.equal(g.test.sprites()[2], first);
  g.test.fit(); g.test.draw(32);
  assert.notEqual(g.test.sprites()[2], first);
});

test('landing preview rests on the highest ball below the aim', () => {
  const g = fixture();
  assert.equal(g.test.landingY(100, 20), 700 - 20);
  g.test.seed([{lv:0,x:100,y:600}]);
  const r0 = g.test.state().balls[0].r;
  assert.equal(g.test.landingY(100, 20), 600 - r0 - 20);
  assert.equal(g.test.landingY(300, 20), 700 - 20);
});

test('merges show a score popup that fades out', () => {
  const g = fixture();
  g.test.seed([{lv:0,x:180,y:500},{lv:0,x:190,y:500}]); g.test.substep(0);
  assert.equal(g.test.state().popups[0].text, '+3');
  for (let i = 0; i < 60; i++) g.test.update(1 / 60);
  assert.equal(g.test.state().popups.length, 0);
});

test('canceling a later restart dialog never reuses a previous confirmation', () => {
  const g = fixture(); g.test.drop(); g.fire('re','click');
  g.element('restart-dialog').returnValue = 'restart'; g.fire('restart-dialog','close');
  g.test.drop(); g.fire('re','click');
  assert.equal(g.element('restart-dialog').returnValue, 'cancel');
  g.fire('restart-dialog','close'); assert.equal(g.test.state().balls.length, 1);
});
