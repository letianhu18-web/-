import test from 'node:test';
import assert from 'node:assert/strict';
import {RenderClock,renderPolicy} from '../js/render-policy.mjs';
test('mobile and saver policies reduce pixel work while keeping a clear mode',()=>{
  assert.deepEqual(renderPolicy('auto',{mobile:true,pixelRatio:3,business:true}),{pixelRatio:1.25,fps:30});
  assert.deepEqual(renderPolicy('sharp',{mobile:true,pixelRatio:3,business:true}),{pixelRatio:2,fps:60});
  assert.deepEqual(renderPolicy('saver',{pixelRatio:3,business:true}),{pixelRatio:1,fps:30});
  assert.equal(renderPolicy('invalid',{pixelRatio:2}).pixelRatio,1.5);
});
test('render throttling preserves elapsed animation time',()=>{
  const clock=new RenderClock();let elapsed=0,frames=0;
  for(let i=0;i<60;i++){const dt=clock.advance(i*1000/60,1/60,{fps:30});if(dt!==null){frames++;elapsed+=dt;}}
  assert.equal(frames,30);assert.ok(Math.abs(elapsed-59/60)<1e-8);
});
test('paused dialogs perform no render unless the picture needs refreshing',()=>{
  const clock=new RenderClock();assert.equal(clock.advance(0,0,{force:true}),0);
  for(let i=1;i<=60;i++)assert.equal(clock.advance(i*16.7,.0167,{paused:true}),null);
  assert.equal(clock.advance(1200,.0167,{paused:true,force:true}),0);
  assert.equal(clock.advance(1250,.02),.02);
});
test('resume resets time so background minutes never advance the picture',()=>{
  const clock=new RenderClock();clock.advance(0,.016);clock.reset();
  assert.equal(clock.advance(300000,.016),.016);
});
