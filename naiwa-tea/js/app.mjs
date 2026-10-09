import {RenderClock,renderPolicy,QUALITY_MODES} from './render-policy.mjs';
import {openSaveVault} from './save-vault.mjs';
import {SaveUI} from './save-ui.mjs';
import {SupportUI} from './support-ui.mjs';
import {OperationsUI} from './operations-ui.mjs';
import {billTotal} from './operating-costs.mjs';
import {JournalUI} from './journal-ui.mjs';
import {cancelPointerClick} from './input-guard.mjs';
import {TownUI} from './town-ui.mjs';
import {PracticeSession} from './practice.mjs';
import {WardrobeUI} from './wardrobe-ui.mjs';
import {CraftUI} from './craft-ui.mjs';
import {GrowthUI} from './growth-ui.mjs';
import { GameState, CustomerSystem, OrderSystem, DrinkSystem } from './game.mjs';
import { SaveSystem } from './save.mjs';
import { AudioManager } from './audio.mjs';
import { ShopScene } from './scene.mjs';
import { UIManager } from './ui.mjs';
import { ingredients,drinkRecipes,customers as customerProfiles,recipeText } from './data.mjs';

let storage;try{storage=window.localStorage;}catch{}
let quality='auto';try{const stored=storage?.getItem('naiwa.teashop.graphics');if(QUALITY_MODES.includes(stored))quality=stored;}catch{}
const renderClock=new RenderClock();let animationFrame=0;
const save=new SaveSystem(storage,{openVault:()=>openSaveVault()});
document.getElementById('load-percent').textContent='正在读取本机存档';
await save.prepare();
const game=new GameState(save),customers=new CustomerSystem(game),orders=new OrderSystem(game),drinks=new DrinkSystem(game),audio=new AudioManager(),ui=new UIManager(game);
audio.setEnabled(game.data.settings.sound);
let scene,loaded=false,pointer=null,suppressClickUntil=0,lastFrame=performance.now(),lastKeyDirection=0;
const $=id=>document.getElementById(id),settings=$('settings'),reset=$('reset-confirm');
const vibration=ms=>{try{if(game.data.settings.vibration&&navigator.vibrate)navigator.vibrate(ms);}catch{}};
let craftUI;const pauseReasons=new Set();
const updatePause=()=>{pauseReasons.clear();if(save.conflict||save.readBlocked)pauseReasons.add('save-protection');if(document.hidden)pauseReasons.add('background');if(scene?.contextLost)pauseReasons.add('graphics');for(const d of document.querySelectorAll('dialog[open]'))if(!['preparation','unlock'].includes(d.id))pauseReasons.add('dialog:'+d.id);game.paused=pauseReasons.size>0;cancelShake();document.documentElement.classList.toggle('business-paused',game.paused);if(game.paused){craftUI?.stop();audio.stopTransient();}};

const clickSound=()=>audio.play('click');
const growthUI=new GrowthUI(game,ui,audio,()=>scene);

craftUI=new CraftUI(game,ui,audio,()=>scene);const practice=new PracticeSession(audio);const townUI=new TownUI(game,ui,audio,()=>scene);
const wardrobeUI=new WardrobeUI(game,ui,audio,()=>scene);
const journalUI=new JournalUI(game,audio,wardrobeUI);
const operationsUI=new OperationsUI(game,ui,audio);
const supportUI=new SupportUI(game,audio);
for(const dialog of document.querySelectorAll('dialog')){const show=dialog.showModal.bind(dialog),close=dialog.close.bind(dialog);dialog.showModal=(...args)=>{craftUI.stop();dialog.dataset.openedAt=String(performance.now());show(...args);updatePause();};dialog.close=(...args)=>{close(...args);updatePause();};dialog.addEventListener('close',updatePause);}
const saveUI=new SaveUI(save,game,ui,updatePause);
game.on(e=>{
  switch(e.type){
    case 'phase': ui.render();growthUI.render();journalUI.renderHome();operationsUI.render();scene?.setState(e.phase);break;
    case 'arrive':scene?.setCustomer(game.current.type);scene?.arrive(false,game.current.fromQueue);growthUI.render();break;
    case 'customerRestored':scene?.setCustomer(game.current.type);scene?.arrive(true);scene?.setQueue(game.day?.waiting);break;
    case 'accepted':clickSound();break;
    case 'ingredientStart':operationsUI.render();ui.ingredientStart(e.ingredient);audio.play(e.ingredient);craftUI.fly(e.ingredient);break;
    case 'ingredientQueued':ui.render();ui.tapIngredient(e.ingredient);break;
    case 'ingredientRemoved':operationsUI.render();if(ui.activeIngredient===e.ingredient){ui.activeIngredient=null;$('pour-stream').setAttribute('opacity','0');}if(e.cancelled)$('ingredient-flight').replaceChildren();ui.render();break;
    case 'iceAdded':craftUI.ice();break;
    case 'iceRemoved':operationsUI.render();ui.render();break;
    case 'guideChanged':ui.render();break;
    case 'costChanged':ui.setMoney(game.data.cookies);operationsUI.render();break;
    case 'remade':ui.render();scene?.setDrink(game.drink);operationsUI.render();break;
    case 'ingredientDone':operationsUI.render();ui.ingredientDone();scene?.setDrink(game.drink);if(e.ingredient==='seal')vibration(10);if(['tea','milk','pearl'].includes(e.ingredient)&&game.data.equipmentData[e.ingredient]===3)audio.play('pourFinish');break;
    case 'wrong':ui.toast(e.message||'已经加过啦！',.95);scene?.moodFor('confused',.65);audio.play('wrong');break;
    case 'choice':ui.choice(e.kind,e.value);audio.play(e.kind);if(e.kind==='ice'&&e.value)vibration(8);break;
    case 'impatient':ui.toast('等得有点久啦……做好仍然可以交付',2);scene?.moodFor('nervous',1);break;
    case 'unlock':showUnlock(e.recipes);break;
    case 'shake':ui.shakeVisual=e.direction*Math.max(.4,e.force);scene?.shake(e.direction,e.force);audio.play('shake');break;
    case 'perfect':ui.perfect();audio.play('perfect');scene?.moodFor('happy',.8);vibration(18);suppressClickUntil=performance.now()+400;break;
    case 'deliver':ui.animate($('cup'),'delivering');scene?.deliver();clickSound();break;
    case 'sip':scene?.sip();break;
    case 'review':ui.review(e);growthUI.render();if(game.data.storeLevel>=4&&game.random()<.3)game.later(1.1,()=>scene?.sitCustomer());if(e.rating===5){scene?.celebrate();audio.play('fiveStar');}else{scene?.moodFor('confused',.8);audio.play('badReview');}game.later(.22,()=>audio.play('cookies'));if(e.bonus){audio.play('combo');vibration(18);}if(e.lucky){audio.play('lucky');game.later(1.65,()=>ui.toast('今天运气不错！',1.2));}break;
    case 'leave':scene?.leave();$('remake-confirm').close();$('recipe-hint').close();break;
    case 'dayEnd':audio.play('dayEnd');growthUI.render();townUI.summary();if(supportUI.schedule()){claimAuthorFeedbackToday();game.persist();}else if(claimAuthorFeedbackToday()){game.persist();openAuthor(true);}break;
    case 'notice':ui.toast(e.message,2);break;
    case 'shortMoney':ui.toast(`饼干还差${e.missing}个～`,1.8);ui.animate(document.querySelector('.wallet'),'short');break;
    case 'growth':growthUI.onGrowth(e);journalUI.renderHome();audio.play('upgrade');break;
    case 'journalChanged':journalUI.renderHome();break;
    case 'wardrobeChanged':ui.setMoney(game.data.cookies);scene?.applyWardrobe(game.data);wardrobeUI.render();journalUI.renderHome();audio.play(e.kind==='purchase'?'unlock':'click');ui.toast(e.id?'新穿搭已经换上啦':'已恢复身份服装');break;
    case 'storeUpgrade':$('construction').hidden=false;ui.setMoney(game.data.cookies);audio.play('build');break;
    case 'storeOpened':$('construction').hidden=true;ui.toast(`${e.name}开张啦！`,2);scene?.moodFor('happy',1);audio.play('unlock');ui.particles(14,.5,.4);break;
    case 'queueChanged':scene?.setQueue(game.day?.waiting);growthUI.render();break;
    case 'rush':ui.toast('放学高峰来了！',1.8);audio.play('happy');break;
    case 'growthReward':game.later(.9,()=>ui.toast(e.messages.join(' · '),2.5));break;
    case 'perfectSeal':ui.toast('完美封口！',.8);audio.play('sealPerfect');break;
    case 'furnitureInteraction':scene?.shopArt.interact(e.item);audio.play('happy');townUI.souvenir(e.item);break;
    case 'townFriend':scene?.showGreeter(e.customer);break;
    case 'townEvent':townUI.event(e);break;
    case 'storyDialogue':townUI.dialogue(e.dialogue);break;
    case 'collectionChanged':townUI.badge();break;
    case 'collectionReward':ui.toast(`${e.name}${e.cookies?' +'+e.cookies+' 🍪':''}`,1.5);ui.setMoney(game.data.cookies);townUI.badge();break;
    case 'saveError':saveUI.render();break;
  }
});

// A small, consistent sound for every enabled control, including dynamic cards.
document.addEventListener('pointerdown',e=>{const b=e.target.closest('button,[role=button],input,select');if(b&&!b.disabled)audio.tap();},true);
document.addEventListener('click',e=>{const b=e.target.closest('button,[role=button]');if(b&&!b.disabled&&e.detail===0)audio.tap();},true);
let actionGesture=null;
$('main-action').addEventListener('pointerdown',()=>{actionGesture={phase:game.phase,order:game.current?.id};});
$('main-action').addEventListener('pointercancel',()=>{actionGesture=null;});
$('main-action').addEventListener('click',e=>{
  if(e.detail!==0&&actionGesture&&(actionGesture.phase!==game.phase||actionGesture.order!==game.current?.id)){actionGesture=null;return;}actionGesture=null;
  if(!loaded||performance.now()<suppressClickUntil)return;if(save.readBlocked||save.conflict){$('settings-open').click();return;}audio.unlock();
  if(game.phase==='idle'){growthUI.prepare();}
  else if(game.phase==='order')orders.accept();
  else if(game.phase==='making')drinks.add('seal');
  else if(game.phase==='ready')orders.deliver();
  else if(game.phase==='shaking')drinks.finishShake();
});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled||performance.now()<suppressClickUntil)return;
 if(b.dataset.ingredient){ui.flashLabel(b);audio.unlock();if(game.phase==='order')orders.accept();drinks.add(b.dataset.ingredient);}
 if(b.dataset.tab){craftUI.stop();ui.clearLabel();ui.tab=b.dataset.tab;ui.machine=null;ui.renderControls();clickSound();}
 if(b.dataset.trayNext){ui.trayPage++;ui.renderControls();clickSound();}
 if(b.dataset.machine){ui.machine=ui.machine===b.dataset.machine?null:b.dataset.machine;ui.renderControls();clickSound();}
 if(b.dataset.choice){audio.unlock();if(game.phase==='order')orders.accept();drinks.choose(b.dataset.choice,Number(b.dataset.value));}
 if(b.dataset.close){$(b.dataset.close).close();clickSound();updatePause();}
});
const returnToCup=()=>{$('material-page').close();$('cup-cost-open').focus({preventScroll:true});};
$('reopen').addEventListener('click',()=>{returnToCup();if(drinks.reopen()){ui.toast('打开啦，花了 2 秒～');clickSound();}});
$('undo-topping').addEventListener('click',()=>{returnToCup();if(drinks.undoTopping()){ui.render();clickSound();ui.toast('已取出上一勺，已用材料不退回成本',1.6);}});
let remakeRequest=null;
$('quick-remake').addEventListener('click',()=>{if(!drinks.canRemake())return;remakeRequest={id:game.current.id,drink:game.drink};$('remake-loss').textContent=`这杯已用 ${billTotal(game.drink.costBill)} 🍪，重做不返还；新杯再用 1 🍪。`;$('remake-confirm').showModal();clickSound();});
$('remake-confirm').addEventListener('close',()=>{if(!$('remake-confirm').open)remakeRequest=null;});
$('remake-do').addEventListener('click',()=>{const request=remakeRequest;if(!request||request.id!==game.current?.id||request.drink!==game.drink)return;remakeRequest=null;$('remake-confirm').close();updatePause();if(drinks.remake())clickSound();});
$('recipes-open').addEventListener('click',()=>{game.unlock();ui.recipeBook();clickSound();});
$('recipe-help').addEventListener('click',()=>{returnToCup();ui.recipeHint();clickSound();});
let unlockKeys=[];
function showUnlock(keys){unlockKeys=keys;$('unlock-list').innerHTML=keys.map(k=>`<h3>🧋 ${drinkRecipes[k].name}</h3><p>${recipeText(k)}</p>`).join('');if(!$('unlock').open)$('unlock').showModal();audio.play('unlock');}
$('unlock').addEventListener('cancel',e=>e.preventDefault());
$('unlock-ok').addEventListener('click',()=>{game.acknowledgeUnlock(unlockKeys);$('unlock').close();game.start();});
const devMode=new URLSearchParams(location.search).get('dev')==='1';
if(devMode){
 $('dev-open').hidden=false;$('dev-story').onchange=e=>game.dev.story=e.target.value;$('dev-event').onchange=e=>game.dev.event=e.target.value;
 for(const [id,data] of [['dev-recipe',drinkRecipes],['dev-customer',customerProfiles]])$(id).innerHTML='<option value="">随机</option>'+Object.entries(data).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join('');
 $('dev-open').onclick=()=>{$('dev-panel').showModal();updatePause();};$('dev-panel').addEventListener('close',updatePause);
 $('dev-recipe').onchange=e=>{game.dev.recipe=e.target.value;if(e.target.value&&!game.data.unlocked.includes(e.target.value))game.data.unlocked.push(e.target.value);game.persist();};$('dev-customer').onchange=e=>game.dev.customer=e.target.value;
 for(const b of document.querySelectorAll('[data-dev]'))b.onclick=()=>{
  const action=b.dataset.dev;if(action==='money'){game.data.cookies+=100;ui.setMoney(game.data.cookies);}
  if(action==='unlock'){game.data.unlocked=Object.keys(drinkRecipes);ui.toast('全部配方已解锁');}
  if(action==='resetDay'){craftUI.stop();game.queue=[];game.data.active=null;game.busy=false;game.setPhase('idle');$('summary').close();}
  if(action==='finish'&&game.day){game.queue=[];game.busy=false;game.day.current=null;customers.finishDay();$('dev-panel').close();settings.close();updatePause();}
  game.persist();ui.render();
 };
 // Only exposed in the explicitly requested development mode.
 window.__naiwa={game,orders,drinks,customers,audio,ui,growthUI,craftUI,practice,townUI,wardrobeUI,journalUI,supportUI,saveUI,pauseReasons,get scene(){return scene;}};
}
$('continue').addEventListener('click',()=>{clickSound();if(game.nextDay())$('summary').close();});
$('summary').addEventListener('cancel',e=>e.preventDefault());
$('settings-open').addEventListener('click',()=>{clickSound();settings.showModal();saveUI.render();$('sound-toggle').checked=game.data.settings.sound;$('vibration-toggle').checked=game.data.settings.vibration;$('reference-toggle').checked=game.data.tutorialState.referenceHintEnabled;$('effects-toggle').checked=game.data.settings.lowEffects===true;$('quality-select').value=quality;updatePause();});
$('settings-back').addEventListener('click',()=>{clickSound();settings.close();updatePause();});
settings.addEventListener('close',updatePause);
const authorFeedbackDateKey='naiwa.teashop.authorFeedbackDate';
function claimAuthorFeedbackToday(){
 if(game.data.settings.authorFeedbackDisabled)return false;
 const now=new Date(),today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
 let stored='';try{stored=storage?.getItem(authorFeedbackDateKey)||'';}catch{}
 if(game.data.authorFeedbackDate===today||stored===today)return false;
 game.data.authorFeedbackDate=today;
 try{storage?.setItem(authorFeedbackDateKey,today);}catch{}
 return true;
}
let authorReturnToSettings=false;
$('author-page').addEventListener('close',()=>{
 if(authorReturnToSettings){authorReturnToSettings=false;settings.showModal();$('author-open').focus({preventScroll:true});}
});
$('author-disable-auto').addEventListener('change',e=>{game.data.settings.authorFeedbackDisabled=e.target.checked;game.persist();$('author-auto-status').textContent=e.target.checked?'已关闭，仍可在设置里查看':'已开启，营业结束后每天最多一次';});
function openAuthor(afterDay=false){
 $('author-disable-auto').checked=game.data.settings.authorFeedbackDisabled===true;
 $('author-auto-status').textContent=game.data.settings.authorFeedbackDisabled?'已关闭，仍可在设置里查看':'仍可在设置里查看二维码';
 authorReturnToSettings=!afterDay&&settings.open;
 if(authorReturnToSettings)settings.close();
 $('author-feedback-note').textContent=afterDay?'今天辛苦啦！有建议或遇到问题，可以扫码给作者反馈。':'有建议或遇到问题，可以扫码给作者反馈。';
 for(const b of $('author-page').querySelectorAll('[data-close]')){b.setAttribute('aria-label',afterDay?'返回今日收益':'返回小店设置');if(!b.classList.contains('back'))b.textContent=afterDay?'先休息一下 · 查看今日收益':'返回小店设置';}
 if(!$('author-page').open)$('author-page').showModal();
 $('author-page').scrollTop=0;
}
$('author-open').addEventListener('click',()=>{clickSound();openAuthor();});
$('reset-open').addEventListener('click',()=>{clickSound();reset.showModal();updatePause();});
for(const id of['reset-back','reset-cancel'])$(id).addEventListener('click',()=>{clickSound();reset.close();updatePause();});
reset.addEventListener('close',updatePause);
$('reset-do').addEventListener('click',async()=>{clickSound();try{game.reset();await save.flush();if(save.conflict||!save.available)throw Error(save.lastError);}catch(error){ui.toast(error.message,4);return;}ui.setReady();scene?.applyGrowth(game.data);scene?.setQueue([]);growthUI.render();ui.setMoney(0,true);ui.render();audio.setEnabled(game.data.settings.sound);reset.close();settings.close();$('summary').close();updatePause();});
$('sound-toggle').addEventListener('change',e=>{game.data.settings.sound=e.target.checked;audio.setEnabled(e.target.checked);audio.unlock();clickSound();game.persist();});
$('quality-select').addEventListener('change',e=>{quality=QUALITY_MODES.includes(e.target.value)?e.target.value:'auto';try{storage?.setItem('naiwa.teashop.graphics',quality);}catch{}scene?.setQuality(quality);renderClock.reset();});
$('vibration-toggle').addEventListener('change',e=>{game.data.settings.vibration=e.target.checked;clickSound();vibration(15);game.persist();});

// Keep held input safe when the available browser height changes. No direction gate.
let resizeFrame=0;const resizeInput=()=>{craftUI.stop();practice.stop();cancelShake();if(growthUI.pointer!==null){const map=$('placement-map');if(map.hasPointerCapture(growthUI.pointer))map.releasePointerCapture(growthUI.pointer);growthUI.pointer=null;}if(resizeFrame)return;resizeFrame=requestAnimationFrame(()=>{resizeFrame=0;document.getElementById('ingredient-flight').replaceChildren();growthUI.g.growth.decorating&&growthUI.renderMarkers();lastFrame=performance.now();});};window.addEventListener('resize',resizeInput);window.visualViewport?.addEventListener('resize',resizeInput);

// Portable local backups. Validate completely before offering a replacement.
let pendingImport=null,importing=false;
$('save-export').onclick=()=>{craftUI.stop();game.persist();const text=save.readBlocked&&save.originalText?save.originalText:save.exportText(game.data),blob=new Blob([text],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`naiwa-teashop-day-${game.data.day}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);ui.toast('存档已准备好下载');};
$('save-import').onclick=()=>$('save-file').click();
$('save-file').onchange=async e=>{const file=e.target.files?.[0];e.target.value='';if(!file)return;try{if(file.size>2*1024*1024)throw Error('文件过大，请选择小店存档');pendingImport=save.decodeImport(await file.text());$('import-info').textContent=`DAY ${pendingImport.day} · ${pendingImport.cookies} 饼干 · 店铺 LV${pendingImport.storeLevel}`;$('import-confirm').showModal();}catch(error){pendingImport=null;ui.toast('没有导入：'+error.message,5);}};
$('import-do').onclick=async()=>{if(importing||!pendingImport)return;importing=true;$('import-do').disabled=true;try{save.importData(pendingImport,game.data);game.data=pendingImport;game.queue=[];await save.flush();if(save.conflict||!save.available)throw Error(save.lastError);location.reload();}catch(error){ui.toast('导入未完成，原进度保留：'+error.message,5);importing=false;$('import-do').disabled=false;}};

// One captured pointer, horizontal distance only. No click can leak through a swipe.
const surface=$('shake-area');
function cancelShake(){if(pointer){cancelPointerClick(pointer.id);suppressClickUntil=performance.now()+350;const surface=$('shake-area');if(surface.hasPointerCapture(pointer.id))surface.releasePointerCapture(pointer.id);}pointer=null;lastKeyDirection=0;game.lastShakeAt=-1;}
const shakeWidth=()=>Math.min(390,Math.max(240,$('cup').getBoundingClientRect().width*2.2));
$('craft-desktop').addEventListener('pointerdown',e=>{const b=e.target.closest('.scene-target,#ice-add,#ice-remove');if(b&&!b.disabled)ui.flashLabel(b);},{capture:true});
$('game').addEventListener('pointerdown',e=>{if(e.target.closest('button')&&game.phase!=='shaking')suppressClickUntil=0;});
surface.addEventListener('pointerdown',e=>{
  if(!pointer&&e.target.closest('button')&&game.phase!=='shaking')suppressClickUntil=0;
  if(game.phase!=='shaking'||game.paused||pointer||e.target.closest('button,dialog,input'))return;
  e.preventDefault();audio.unlock();pointer={id:e.pointerId,x:e.clientX,y:e.clientY};surface.setPointerCapture(e.pointerId);
});
surface.addEventListener('pointermove',e=>{
  if(!pointer||e.pointerId!==pointer.id||game.phase!=='shaking')return;e.preventDefault();
  const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;drinks.shake(dx,dy,shakeWidth());pointer.x=e.clientX;pointer.y=e.clientY;
});
function endPointer(e){if(!pointer||e.pointerId!==pointer.id)return;pointer=null;suppressClickUntil=performance.now()+320;if(surface.hasPointerCapture(e.pointerId))surface.releasePointerCapture(e.pointerId);}
surface.addEventListener('pointerup',endPointer);surface.addEventListener('pointercancel',endPointer);surface.addEventListener('lostpointercapture',()=>{pointer=null;});
$('game').addEventListener('click',e=>{if(performance.now()<suppressClickUntil&&!e.target.closest('dialog')){e.preventDefault();e.stopImmediatePropagation();}},true);
$('shake-area').addEventListener('keydown',e=>{
  if(game.phase!=='shaking'||game.paused||e.repeat||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const direction=e.key==='ArrowLeft'?-1:1;if(direction===lastKeyDirection)return;lastKeyDirection=direction;audio.unlock();drinks.shake(direction*shakeWidth()*.22,0,shakeWidth());
});
document.addEventListener('visibilitychange',()=>{craftUI.stop();cancelShake();game.persist();updatePause();lastFrame=performance.now();});window.addEventListener('pagehide',()=>{game.persist();void save.flush();});
document.addEventListener('freeze',()=>{craftUI.stop();game.persist();void save.flush();});
window.addEventListener('storage',e=>{if(!e.key||e.key.startsWith('naiwa.teashop.v1'))save.inspectExternal();});
window.addEventListener('pageshow',()=>{save.inspectExternal();updatePause();lastFrame=performance.now();});
$('shop-canvas').addEventListener('webglcontextlost',e=>{e.preventDefault();game.persist();if(scene)scene.contextLost=true;updatePause();ui.toast('画面暂时休息了，刷新即可继续营业。',30);});

async function init(){
  try{
    scene=new ShopScene($('shop-canvas'),n=>{$('load-percent').textContent=n?`${Math.round(n*100)}%`:'准备小店';},quality);await scene.ready;
    loaded=true;window.dispatchEvent(new Event('naiwa:ready'));scene.applyGrowth(game.data);ui.setScene(scene);ui.setReady();game.restore();if(game.data.storyDialogue)townUI.dialogue(game.data.storyDialogue);townUI.summary();growthUI.render();townUI.weather();scene.setState(game.phase);game.persist();saveUI.render();if(save.lastError)ui.toast(save.lastError,4);else if(save.recoveryNotice)ui.toast(save.recoveryNotice,5);
  }catch(error){console.error('Shop initialization failed',error);$('loading').innerHTML='<b>奶蛙还没准备好</b><small>请检查网络，或换一个支持 3D 的浏览器</small><button class="secondary" id="retry">重新准备</button>';$('retry').addEventListener('click',()=>location.reload());$('main-action').textContent='等待小店准备';}
}
function frame(now){animationFrame=0;if(document.hidden)return;const inputElapsed=Math.max(0,(now-lastFrame)/1000),dt=Math.min(.1,inputElapsed);lastFrame=now;game.tick(inputElapsed);practice.tick(dt);townUI.tick(game.paused||game.craft.teaching?0:dt);ui.tick(dt);if(scene&&!scene.contextLost){const policy=renderPolicy(quality,{mobile:scene.mobile,business:scene.business,lowEffects:game.data.settings.lowEffects});const elapsed=renderClock.advance(now,dt,{fps:policy.fps,paused:game.paused,force:scene.needsRender});if(elapsed!==null)scene.tick(elapsed);}if(game.current&&game.current.patience-game.current.elapsed<5&&game.phase==='making'&&scene&&['idle','nervous'].includes(scene.mood))scene.moodFor('nervous',1.2);animationFrame=requestAnimationFrame(frame);}
function resumeFrames(){if(animationFrame||document.hidden)return;lastFrame=performance.now();renderClock.reset();if(scene)scene.needsRender=true;animationFrame=requestAnimationFrame(frame);}
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(animationFrame);animationFrame=0;renderClock.reset();}else resumeFrames();});
window.addEventListener('pageshow',resumeFrames);
$('shop-canvas').addEventListener('webglcontextrestored',()=>{if(scene){scene.contextLost=false;scene.needsRender=true;scene.resize();renderClock.reset();updatePause();ui.toast('画面恢复啦，继续营业～',3);}});
resumeFrames();init();

// Read-only state for compatible in-page agents; gameplay still uses the visible controls.
if(document.modelContext?.registerTool){const lifecycle=new AbortController();try{Promise.resolve(document.modelContext.registerTool({name:'get_teashop_state',title:'查看奶茶铺营业状态',description:'Read the current day, cookies, order, and next preparation step without changing the game.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute(input){if(!input||Object.keys(input).length)throw new Error('Expected an empty object');return{day:game.data.day,cookies:game.data.cookies,phase:game.phase,served:game.day?.served??0,goal:game.day?.goal??0,drink:game.drink?structuredClone(game.drink):null};}},{signal:lifecycle.signal})).catch(()=>{});}catch{}window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});}
