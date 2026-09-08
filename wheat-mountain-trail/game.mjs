import { newRun, stepRun, FIXED_STEP, LIMIT, clamp, TOTAL_DISTANCE } from './physics.mjs';
import { readControls } from './controls.mjs';
import { ACHIEVEMENTS, achievementMetrics, earnedAchievements, scoreBreakdown } from './achievements.mjs';
import { initLeaderboard, newRankingRun, recordRankingInput, showRankingResult } from './leaderboard.mjs';

const $=id=>document.getElementById(id);
const elements=Object.fromEntries(['game','intro','scene-caption','hud','pause','balance-ui','game-controls','pause-overlay','result-overlay','distance','score','balance-status','balance-deg','balance-meter','balance-needle','wind','left','right','move-left','move-right','jump','route-progress','hazard-hint'].map(id=>[id,$(id)]));
let world,run=newRun(),mode='loading',last=performance.now(),accumulator=0,clock=0,fallTime=0,best=0,milestone=0,toastTimer=0,jumpQueued=false;
const keys=new Set(),pointers=new Map();
let rankingRun;
let soundEnabled=false,audioCtx,master,windGain,lastStep=-1;
function clearInput(){keys.clear();pointers.clear();jumpQueued=false;updateButtons();}
function input(){return readControls(keys,pointers.values());}
function updateButtons(){const controls=input();elements.left.classList.toggle('pressed',controls.balance===-1);elements.right.classList.toggle('pressed',controls.balance===1);elements['move-left'].classList.toggle('pressed',controls.move===-1);elements['move-right'].classList.toggle('pressed',controls.move===1);elements.jump.classList.toggle('pressed',[...pointers.values()].includes('jump'));}
function queueJump(){if(mode==='playing')jumpQueued=true;}
function setMode(next){
  mode=next;elements.game.dataset.mode=mode;
  world?.resize();
  const active=['playing','falling','paused','over','won'].includes(mode);
  elements.intro.hidden=mode!=='ready'&&mode!=='loading';elements['scene-caption'].hidden=active;
  elements.hud.hidden=!active;elements.pause.hidden=mode!=='playing';elements['balance-ui'].hidden=!['playing','falling'].includes(mode);elements['game-controls'].hidden=mode!=='playing';
  elements['route-progress'].hidden=!active;elements['pause-overlay'].hidden=mode!=='paused';elements['result-overlay'].hidden=!['over','won'].includes(mode);
  if(mode!=='playing')elements['hazard-hint'].hidden=true;
  if(mode!=='playing')clearInput();
  if(windGain&&audioCtx)windGain.gain.setTargetAtTime(mode==='playing'&&soundEnabled?.019:0,audioCtx.currentTime,.2);
}
function toast(message){clearTimeout(toastTimer);$('toast').textContent=message;$('toast').classList.add('visible');toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2600);}
function start(){if(!world)return;clearInput();run=newRun();rankingRun=newRankingRun();accumulator=0;fallTime=0;lastStep=-1;milestone=0;world.reset();setMode('playing');last=performance.now();toast('左右扶正 · 空格跳跃 · ↑＋左右键移动');updateHUD();}
function pause(){if(mode!=='playing')return;setMode('paused');$('resume').focus({preventScroll:true});}
function resume(){if(mode!=='paused')return;clearInput();accumulator=0;last=performance.now();setMode('playing');elements.pause.focus({preventScroll:true});}
function finish(won=false){
  best=Math.max(best,run.distance);$('final-distance').replaceChildren(document.createTextNode(Math.floor(run.distance).toString()),Object.assign(document.createElement('small'),{textContent:'米'}));$('final-score').textContent=run.score.toLocaleString('zh-CN');
  $('best-line').textContent=`本次打开游戏的最佳距离：${Math.floor(best)} 米`;
  $('result-kicker').textContent=won?'5,000 米 · 十里挑战完成':run.fallCause==='obstacle'?'脚下没迈过去':'这担麦子，有点晃';
  $('result-message').textContent=won?'两筐麦子扛到了终点。你赢了！':run.fallCause==='obstacle'?'接近路障时按空格，等脚越过障碍再落地；山石也能横向绕开。':run.distance<30?'轻点、松开，再纠正；一直按会倒向另一边。':'左右键扶正；按住 ↑ 再按左右键，才是横向移动。';
  $('run-summary').textContent=`用时 ${Math.floor(run.time/60)} 分 ${Math.floor(run.time%60)} 秒 · 吃到 ${run.buns} 个庆丰包子`;
  const stats=run.achievements,metrics=achievementMetrics(run),earned=earnedAchievements(run);
  $('result-title').textContent=won?'定于一尊':earned.find(achievement=>achievement.kind==='本局评价')?.name||'挑战结束';
  $('final-pickup-rate').textContent=stats.bunsEncountered?`${(metrics.pickupRate*100).toFixed(1)}%`:'—';
  $('final-bun-count').textContent=`拾取 ${run.buns} / 经过 ${stats.bunsEncountered} 个`;
  $('final-boost-ratio').textContent=`${(metrics.boostRatio*100).toFixed(1)}%`;
  $('final-boost-distance').textContent=`加速走过 ${Math.floor(stats.boostedDistance).toLocaleString('zh-CN')} 米`;
  $('final-max-angle').textContent=`${metrics.maxDegrees.toFixed(1)}°`;
  $('final-bun-streak').textContent=`${metrics.bestBunStreak} 个`;
  const points=scoreBreakdown(run);
  $('score-breakdown').textContent=`路程 ${points.distance.toLocaleString('zh-CN')} ＋ 包子 ${points.buns.toLocaleString('zh-CN')} ＋ 成就 ${points.achievements.toLocaleString('zh-CN')}`;
  $('achievement-count').textContent=`${earned.length} 项`;
  $('achievement-list').replaceChildren(...earned.map(achievement=>{
    const item=document.createElement('li');item.className='achievement-badge';
    const kind=document.createElement('span');kind.className='achievement-kind';kind.textContent=achievement.kind+(achievement.points?` · +${achievement.points} 分`:'');
    const name=document.createElement('strong');name.textContent=achievement.name;
    const rule=document.createElement('p');rule.textContent=achievement.rule;
    item.append(kind,name,rule);return item;
  }));
  showRankingResult(rankingRun);setMode(won?'won':'over');updateHUD();$('result-body').scrollTop=0;$('result-title').focus({preventScroll:true});
}
function updateHUD(){
  elements.distance.textContent=Math.floor(run.distance).toString();elements.score.textContent=run.score.toLocaleString('zh-CN');
  $('route-meter').value=run.distance;$('li-progress').textContent=`${(run.distance/500).toFixed(2)} / 10 里`;$('route-remaining').textContent=run.won?'已到达终点':`还剩 ${Math.ceil(TOTAL_DISTANCE-run.distance).toLocaleString('zh-CN')} 米`;
  $('speed').textContent=`${run.speed.toFixed(1)} 米/秒`;$('buns').textContent=String(run.buns);$('boost').hidden=run.boostRemaining<=0;$('boost').textContent=`加速 +${run.boostLevel*20}% · ${Math.ceil(run.boostRemaining)}秒`;
  elements.jump.classList.toggle('airborne',run.jumpY>.05);$('jump-label').textContent=run.jumpY>.05?'腾空中':'空格';
  const degrees=Math.round(run.angle*180/Math.PI),a=Math.abs(run.angle);
  elements['balance-deg'].textContent=`${Math.abs(degrees)}°`;
  elements['balance-needle'].style.left=`${50+clamp(run.angle/LIMIT,-1,1)*47}%`;
  elements['balance-meter'].setAttribute('aria-valuenow',String(clamp(degrees,-55,55)));
  elements['balance-meter'].setAttribute('aria-valuetext',`${degrees<0?'向左':'向右'}倾斜 ${Math.abs(degrees)} 度`);
  elements['balance-ui'].classList.toggle('danger',a>.58);
  elements['balance-status'].textContent=a>.6?(run.angle>0?'快向左扶正！ ←':'快向右扶正！ →'):a>.28?(run.angle>0?'向右偏了，轻按 ←':'向左偏了，轻按 →'):'稳住，慢慢走';
  elements.wind.textContent=Math.abs(run.wind)<.19?'微风':`${run.wind>0?'向右吹':'向左吹'}${Math.abs(run.wind)>.58?' · 强风':' · 山风'}`;
  const next=run.course.slice(run.courseCursor,run.courseCursor+12).find(item=>item.type!=='bun'&&item.z>run.distance-1&&item.z-run.distance<23);
  const onPath=next&&Math.abs(next.x-run.lateral-run.offset)<next.width/2+.3;
  elements['hazard-hint'].hidden=mode!=='playing'||!next;
  if(next){const remaining=Math.max(0,Math.ceil(next.z-run.distance));elements['hazard-hint'].textContent=`${next.type==='log'?'横木':'山石'} · ${remaining} 米后 · ${onPath?'按空格跳过':'可横向绕行'}`;elements['hazard-hint'].classList.toggle('urgent',onPath&&remaining<8);elements.jump.classList.toggle('urgent',mode==='playing'&&onPath&&remaining<8&&run.jumpY===0);}else elements.jump.classList.remove('urgent');
}
function initAudio(){
  if(audioCtx){audioCtx.resume().catch(()=>{});return;}
  const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return;
  audioCtx=new AudioContext();master=audioCtx.createGain();master.gain.value=.42;master.connect(audioCtx.destination);
  const buffer=audioCtx.createBuffer(1,audioCtx.sampleRate*3,audioCtx.sampleRate),data=buffer.getChannelData(0);let smooth=0;
  for(let i=0;i<data.length;i++){smooth=(smooth+(Math.random()*2-1)*.04)/1.04;data[i]=smooth*3;}
  const noise=audioCtx.createBufferSource();noise.buffer=buffer;noise.loop=true;
  const filter=audioCtx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=600;windGain=audioCtx.createGain();windGain.gain.value=0;noise.connect(filter);filter.connect(windGain);windGain.connect(master);noise.start();
}
function tone(freq,duration=.06,volume=.08){if(!audioCtx||!soundEnabled||audioCtx.state!=='running')return;const osc=audioCtx.createOscillator(),g=audioCtx.createGain(),t=audioCtx.currentTime;osc.type='sine';osc.frequency.setValueAtTime(freq,t);osc.frequency.exponentialRampToValueAtTime(Math.max(25,freq*.5),t+duration);g.gain.setValueAtTime(volume,t);g.gain.exponentialRampToValueAtTime(.001,t+duration);osc.connect(g);g.connect(master);osc.start(t);osc.stop(t+duration);}
function toggleSound(){try{initAudio();soundEnabled=!soundEnabled;$('sound').setAttribute('aria-pressed',String(soundEnabled));$('sound').setAttribute('aria-label',soundEnabled?'关闭声音':'开启声音');if(windGain)windGain.gain.setTargetAtTime(soundEnabled&&mode==='playing'?.019:0,audioCtx.currentTime,.2);if(soundEnabled)tone(520,.1,.04);}catch{soundEnabled=false;}}
function fatal(error){console.error(error);setMode('error');elements.intro.hidden=true;$('error-panel').hidden=false;}

$('start').addEventListener('click',start);$('restart').addEventListener('click',start);$('restart-paused').addEventListener('click',start);elements.pause.addEventListener('click',pause);$('resume').addEventListener('click',resume);$('sound').addEventListener('click',toggleSound);
for(const [id,action]of [['left','balance-left'],['right','balance-right'],['move-left','move-left'],['move-right','move-right'],['jump','jump']]){
  const button=$(id);
  button.addEventListener('pointerdown',e=>{e.preventDefault();if(mode!=='playing')return;pointers.set(e.pointerId,action);if(action==='jump')queueJump();try{button.setPointerCapture(e.pointerId);}catch{}updateButtons();});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,e=>{pointers.delete(e.pointerId);updateButtons();});
  button.addEventListener('contextmenu',e=>e.preventDefault());
}
elements.jump.addEventListener('click',e=>{if(e.detail===0)queueJump();});
window.addEventListener('pointerup',e=>{pointers.delete(e.pointerId);updateButtons();});
window.addEventListener('keydown',e=>{
  if(e.target instanceof Element&&e.target.closest('input,textarea,form'))return;
  if(['ArrowLeft','ArrowRight','ArrowUp','KeyA','KeyD','KeyW'].includes(e.code)){if(mode==='playing'){e.preventDefault();keys.add(e.code);updateButtons();}return;}
  if(e.code==='Space'){e.preventDefault();if(e.repeat)return;if(['ready','over','won'].includes(mode))start();else if(mode==='playing')queueJump();}
  if(['Escape','KeyP'].includes(e.code)&&!e.repeat){e.preventDefault();if(mode==='playing')pause();else if(mode==='paused')resume();}
  if(e.code==='Enter'&&!e.repeat&&['ready','over','won'].includes(mode)){e.preventDefault();start();}
  if(e.code==='KeyR'&&!e.repeat&&['playing','over','paused','won'].includes(mode))start();
});
window.addEventListener('keyup',e=>{if(keys.has(e.code)){keys.delete(e.code);updateButtons();}});
window.addEventListener('blur',()=>{clearInput();if(mode==='playing')pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInput();if(mode==='playing')pause();}last=performance.now();accumulator=0;});
window.addEventListener('resize',()=>world?.resize());
$('world').addEventListener('webglcontextlost',e=>{e.preventDefault();if(mode==='playing')pause();$('error-text').textContent='3D 画面暂时中断了，请重新加载游戏。';$('error-panel').hidden=false;});

function frame(now){
  const dt=Math.min(Math.max((now-last)/1000,0),.075);last=now;clock+=dt;
  if(mode==='playing'){
    accumulator+=dt;
    while(accumulator>=FIXED_STEP){
      const control={...input(),jump:jumpQueued};recordRankingInput(rankingRun,control);stepRun(run,control);jumpQueued=false;accumulator-=FIXED_STEP;
      for(const event of run.events){
        if(event.type==='bun'){world.pickup(event);toast(`庆丰包子 +1 · 加速 ${event.level*20}%！`);tone(700,.15,.1);}
        if(event.type==='jump')tone(250,.12,.06);
        if(event.type==='land')tone(72,.08,.07);
        if(event.type==='achievement'&&!run.fallen&&!run.won){const achievement=ACHIEVEMENTS.find(item=>item.id===event.id);toast(`成就达成 · ${achievement.name}`);tone(940,.24,.12);}
      }
      if(run.fallen){setMode('falling');fallTime=0;tone(90,.28,.25);$('toast').classList.remove('visible');break;}
      if(run.won){finish(true);tone(880,.4,.14);$('toast').classList.remove('visible');break;}
    }
    const step=Math.floor((run.time*5.3+run.distance*.36)/Math.PI);if(step!==lastStep){lastStep=step;if(run.jumpY===0&&mode==='playing')tone(85+step%2*15,.045,.06);}
    const mark=Math.floor(run.distance/500);if(mark>milestone&&mode==='playing'){milestone=mark;toast(`走过 ${mark} 里 · 还剩 ${10-mark} 里！`);tone(620,.14,.09);}
    updateHUD();
  }else if(mode==='falling'){fallTime+=dt;if(fallTime>2.1)finish();}
  if(world){try{world.render(run,mode,clock,dt,fallTime);}catch(error){fatal(error);return;}}
  requestAnimationFrame(frame);
}

try{
  initLeaderboard();
  const {makeWorld}=await import('./scene.mjs');world=await makeWorld($('world'));setMode('ready');world.render(run,mode,0,1/60);$('start-label').textContent='挑起麦子，出发';$('start').disabled=false;last=performance.now();requestAnimationFrame(frame);
}catch(error){fatal(error);}
