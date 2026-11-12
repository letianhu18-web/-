
import {OperatingCosts} from './operating-costs.mjs';
import {JournalSystem} from './journal.mjs';
import {TownSystem} from './town.mjs';
import {WardrobeSystem} from './wardrobe.mjs';
import {HandcraftSystem} from './handcraft.mjs';
import {ICE,iceAssessment,guideStep} from './craft-data.mjs';
import {GrowthSystem} from './growth.mjs';
import {storeLevels,businessGoal,furnitureEffects,equipmentDuration} from './growth-data.mjs';
import { drinkRecipes, customers, ingredients, dayGoal, newDrink, nextIngredient, SHAKE, actualIngredients, sugars, ices } from './data.mjs';

export class GameState {
  constructor(save,random=Math.random) { this.random=random;this.dev={};this.save=save; this.data=save.load(); this.phase='idle'; this.busy=false; this.paused=false; this.clock=0; this.queue=[]; this.events=new Set(); this.lastDirection=0; this.lastShakeAt=-1; this.saveClock=0;this.growth=new GrowthSystem(this);this.wardrobe=new WardrobeSystem(this);this.craft=new HandcraftSystem(this);this.town=new TownSystem(this);this.journal=new JournalSystem(this);this.costs=new OperatingCosts(this); }
  on(fn) { this.events.add(fn); return ()=>this.events.delete(fn); }
  emit(type,detail={}) { for(const fn of this.events) fn({type,...detail}); }
  get day() { return this.data.active; }
  get current() { return this.day?.current; }
  get drink() { return this.current?.drink; }
  persist() { if(!this.save.save(this.data)) this.emit('saveError',{message:this.save.lastError}); }
  later(seconds,fn) { this.queue.push({at:this.clock+seconds,fn}); }
  setPhase(phase) { if(phase!=='making')this.craft.stop();this.phase=phase; this.emit('phase',{phase}); }
  restore() {
    if (!this.day) { this.emit('phase',{phase:'idle'}); return; }
    if (this.day.status==='summary') { this.setPhase('summary'); return; }
    if (this.current) {
      this.craft.attach(this.current,true);this.emit('customerRestored');
      this.setPhase(!this.current.accepted?'order':!this.drink.sealed?'making':this.drink.finished?'ready':'shaking');
    if(this.phase==='order')this.orderSystem.accept(true);if(this.phase==='making')this.drinkSystem.pump();this.town.ready();
    } else this.customerSystem.arrive();
  }
  start() {
    if(this.phase!=='idle'||this.paused||this.growth.decorating) return false;
    const plan=this.growth.prepareDay();
    this.unlock(); const pending=this.data.unlocked.filter(k=>!this.data.seenUnlocks.includes(k)); if(pending.length){this.emit('unlock',{recipes:pending});return false;}
    this.data.active={day:this.data.day,goal:Math.min(14,businessGoal(this.data)+plan.extra),waiting:[],spawned:0,queueClock:0,rushPlanned:plan.rush,rushRemaining:0,rushTriggered:false,materialCost:0,wasteCost:0,salesIncome:0,goalReward:0,milestoneReward:0,served:0,perfect:0,combo:this.data.streak,maxCombo:0,income:0,tips:0,ratingSum:0,bonuses:0,unlocks:this.newUnlocks||[],status:'open',current:null};this.newUnlocks=[];
    this.queue=[]; this.persist(); this.setPhase('dayIntro'); this.later(.9,()=>this.customerSystem.arrive()); return true;
  }
  unlock(){this.newUnlocks=this.newUnlocks||[];for(const [k,r] of Object.entries(drinkRecipes))if(r.day<=this.data.day&&!this.data.unlocked.includes(k)){this.data.unlocked.push(k);this.newUnlocks.push(k);}this.persist();}
  acknowledgeUnlock(keys){this.newUnlocks=[...new Set([...(this.newUnlocks||[]),...keys.filter(k=>!this.data.seenUnlocks.includes(k))])];this.data.seenUnlocks=[...new Set([...this.data.seenUnlocks,...keys])];this.persist();}
  nextDay() {
    if(this.phase!=='summary') return false;
    this.queue=[]; this.data.day++; this.data.active=null;this.data.dailyGoal=null; this.busy=false; this.persist(); this.setPhase('idle'); return true;
  }
  reset() { this.queue=[]; this.data=this.save.reset(); this.busy=false; this.paused=false; this.lastDirection=0;this.growth.locks.clear();this.growth.decorating=false; this.setPhase('idle'); }
  tick(dt) {
    if(this.paused){this.craft.stop();return;}
    const inputElapsed=Math.max(0,dt);dt=Math.max(0,Math.min(dt,.1)); this.clock+=dt;this.craft.tick(inputElapsed);if(!this.craft.teaching){this.town.tick(dt);this.customerSystem?.tickQueue(dt);}
    if(this.current&&!this.craft.teaching&&['order','making','shaking','ready'].includes(this.phase)) {this.current.elapsed+=dt;this.current.frontTime=(this.current.frontTime||0)+dt;const c=this.current;if(c.elapsed>=c.patience&&!c.expired&&(c.frontTime||0)>3){c.expired=true;this.emit('impatient');if(!c.operated){this.day.served++;this.day.ratingSum++;this.data.streak=0;this.day.combo=0;this.data.totalCustomers++;this.day.current=null;this.persist();this.customerSystem.leave();}}}
    const due=this.queue.filter(q=>q.at<=this.clock); this.queue=this.queue.filter(q=>q.at>this.clock);
    for(const q of due) q.fn();
    if(this.phase==='shaking'&&this.lastShakeAt>=0&&this.clock-this.lastShakeAt<.18) {
      this.drink.shakeTime=Math.min(10,this.drink.shakeTime+dt); this.drinkSystem.maybeFinishShake();
    }
    this.saveClock+=dt;
    if(this.current&&this.saveClock>=3) { this.saveClock=0; this.persist(); }
  }
}

export class CustomerSystem {
  constructor(game) { this.g=game; game.customerSystem=this; }
  arrive() {
    const g=this.g;
    if(!g.day||g.day.status!=='open'||g.current||!['idle','dayIntro','between'].includes(g.phase)) return false;
    if(g.day.served>=g.day.goal) { this.finishDay(); return false; }
    const queued=g.day.waiting?.shift();g.day.current=queued||this.generate(++g.day.spawned);
    if(queued){g.current.elapsed=g.current.waitElapsed||0;g.current.fromQueue=true;g.current.expired=false;}
    if(!g.data.seenCustomers.includes(g.current.type))g.data.seenCustomers.push(g.current.type);
    g.craft.attach(g.current);g.emit('queueChanged');
    if(g.data.storeReactions>0){g.data.storeReactions--;if(g.random()<.5)g.emit('notice',{message:'哇，奶蛙换新店啦！'});}
    g.busy=false; g.lastDirection=0; g.lastShakeAt=-1;
    g.setPhase('arriving'); g.emit('arrive'); g.persist();
    g.later(.8,()=>{if(g.phase==='arriving'){g.setPhase('order');g.orderSystem.accept(true);g.town.ready();}}); return true;
  }
  generate(serial){const g=this.g;
    const tutorial=!g.data.tutorialComplete&&serial===1;
    const effects=furnitureEffects(g.data);const pool=Object.entries(customers).filter(([id,c])=>(!c.story||g.data.customerProgress[id]?.storyNode===3)&&(c.day||1)<=g.data.day&&(c.store||1)<=g.data.storeLevel).map(([k,v])=>[k,{...v,weight:(v.story?4:v.weight)+(k==='lucky'?effects.luck*100:k==='child'?effects.child*100:0)}]);
    let pick=g.random()*pool.reduce((n,[,c])=>n+c.weight,0),type=pool.at(-1)[0];for(const [k,c] of pool){pick-=c.weight;if(pick<0){type=k;break;}}
    if(g.dev.customer&&customers[g.dev.customer])type=g.dev.customer;if(tutorial)type='student';
    let limited=type==='connoisseur'&&g.random()<.4;const profile=customers[type],allowed=g.data.unlocked,preferred=allowed.filter(k=>profile.preferences.includes(k));
    let recipe,sugar,ice,key;for(let attempt=0;attempt<8;attempt++){
      const choices=preferred.length&&g.random()<.6?preferred:allowed;recipe=g.dev.recipe||choices[Math.floor(g.random()*choices.length)];
      sugar=profile.sugar&&g.random()<.7?profile.sugar:[30,70,100][Math.floor(g.random()*3)];ice=profile.ice!==undefined&&g.random()<.7?profile.ice:Math.floor(g.random()*3);
      if(limited){recipe=allowed.includes('creamMilkTea')?'creamMilkTea':allowed.at(-1);sugar=30;ice=0;}if(tutorial){recipe='pearlMilkTea';sugar=70;ice=1;}key=`${recipe}:${sugar}:${ice}`;
      if(!g.data.recentOrders.every(x=>x===key)||g.data.recentOrders.length<2||tutorial)break;
      if(attempt===7){limited=false;ice=(ice+1)%3;key=`${recipe}:${sugar}:${ice}`;}
    }
    g.data.recentOrders=[...g.data.recentOrders,key].slice(-2);
    return g.town.assign({id:`${g.data.day}-${serial}`,type,recipe,sugar,ice,patience:profile.patience*(g.data.day<=3?1.2:1)*(1+effects.patience),limited,accepted:false,elapsed:0,waitElapsed:0,frontTime:0,drink:newDrink(),paid:false,operated:false,expired:false,tutorial},serial);
  }
  tickQueue(dt){const g=this.g,a=g.day;if(!a||a.status!=='open'||['summary','idle','upgrading'].includes(g.phase))return;a.waiting??=[];a.spawned??=a.served+(g.current?1:0)+a.waiting.length;
    for(const c of a.waiting)c.waitElapsed=(c.waitElapsed||0)+dt*.35;
    a.queueClock=(a.queueClock||0)+dt;
    const capacity=storeLevels[g.data.storeLevel].capacity;
    if(a.queueClock>=(g.data.dayPlan?.eventId==='school'&&g.data.dayPlan.eventRemaining>0?4:9)&&a.waiting.length<capacity-1&&a.spawned<a.goal){a.queueClock=0;const next=this.generate(++a.spawned);a.waiting.push(next);g.town.visit(next);g.emit('queueChanged');g.persist();}
  }
  finishDay() {
    const g=this.g;
    if(!g.day||g.day.status==='summary') return false;
    g.town.finishDay();g.data.stats.days++;g.day.status='summary';g.day.current=null;g.day.waiting=[];g.queue=[];g.emit('queueChanged');g.persist();g.setPhase('summary');g.emit('dayEnd');return true;
  }
  leave() {
    const g=this.g; g.setPhase('leaving');g.emit('leave');
    g.later(.75,()=>{
      if(g.phase!=='leaving')return;
      if(g.day.served>=g.day.goal)this.finishDay();
      else {g.setPhase('between');g.later(.6,()=>this.arrive());}
    });
  }
}

export class OrderSystem {
  constructor(game) { this.g=game;game.orderSystem=this; }
  accept(automatic=false) {
    const g=this.g;if(g.paused||g.phase!=='order'||!g.current||g.current.accepted)return false;
    g.current.accepted=true;if(!automatic)g.current.operated=true;g.setPhase('making');g.emit('accepted');g.persist();return true;
  }
  evaluate(c){
    const d=c.drink,wanted=drinkRecipes[c.recipe].ingredients.filter(k=>!(k==='tea'&&c.legacyStrawberry&&!d.tea)),actual=actualIngredients(d),missing=wanted.filter(k=>!actual.includes(k)),extra=actual.filter(k=>!wanted.includes(k));
    const recipe=Math.max(0,50-Math.ceil(50/wanted.length)*(missing.length+extra.length));
    const speed=c.tutorial?10:Math.max(0,Math.round(10*(1-c.elapsed/c.patience)));
    const shake=d.shakeScore>=100?10:d.shakeScore>=55?7:d.shakeScore>0?3:0;
    const ice=iceAssessment(c,d),recipeCorrect=!missing.length&&!extra.length,sugarCorrect=d.sugar===c.sugar;const score=recipe+(sugarCorrect?15:0)+ice.points+speed+shake;
    let rating=score>=90?5:score>=75?4:score>=60?3:score>=40?2:1;
    if(missing.length||extra.length||d.sugar!==c.sugar||!ice.correct||(c.type==='picky'&&shake<10))rating=Math.min(4,rating);
    const reasons=[];if(missing.length)reasons.push(`少了${missing.map(k=>ingredients[k].name).join('、')}`);if(extra.length)reasons.push(`多了${extra.map(k=>ingredients[k].name).join('、')}`);
    if(d.sugar!==c.sugar)reasons.push(`糖度应为${sugars[c.sugar]}`);if(!ice.correct)reasons.push(`冰量偏${ice.direction} · 应为${ices[c.ice]}`);if(!speed)reasons.push('等待有点久');if(shake<10)reasons.push('还可以再摇匀一些');
    const text=missing.length?`咦？我的${ingredients[missing[0]].name}呢？`:extra.length?'味道有一点不一样呢':d.sugar!==c.sugar?`我想要的是${sugars[c.sugar]}呀～`:!ice.correct?`我点的是${ices[c.ice]}，这杯冰稍微${ice.direction}了点。`:rating===5?'冰量正合适，好喝！':!speed?'等得有点久啦，不过谢谢你！':'再摇匀一点就更好喝啦';
    return {score,rating,reasons,text,recipeCorrect,sugarCorrect,iceCorrect:ice.correct,icePoints:ice.points,iceUnits:ice.units};
  }
  rating(c){return this.evaluate(c).rating;}
  deliver() {
    const g=this.g;if(g.paused||g.phase!=='ready'||g.busy||!g.drink?.sealed||!g.drink.finished)return false;
    g.busy=true;g.setPhase('delivering');g.emit('deliver');
    g.later(.55,()=>{g.emit('sip');});
    g.later(1.05,()=>this.settle());return true;
  }
  settle() {
    const g=this.g,c=g.current;
    if(g.phase!=='delivering'||!c||c.paid||g.data.dayPlan?.completedOrderIds.includes(c.id))return false;
    c.paid=true;
    const assessment=this.evaluate(c),{rating}=assessment,base=drinkRecipes[c.recipe].price+(c.limited?6:0);
    const earned=Math.round(base*[0,30,60,85,100,120][rating]/100)*(c.type==='lucky'?2:1);
    const profile=customers[c.type],tip=rating===5&&g.random()<Math.min(.85,profile.tipChance+furnitureEffects(g.data).tip)?Math.round((g.random()<.5?5:10)*profile.tipMultiplier):0;
    const a=g.day;a.served++;a.ratingSum+=rating;a.perfect+=rating===5?1:0;g.data.streak=rating===5?g.data.streak+1:0;a.combo=g.data.streak;a.maxCombo=Math.max(a.maxCombo,a.combo);
    const bonus=a.combo===5?20:a.combo===10?50:0;a.bonuses+=bonus;a.tips+=tip;
    a.income+=earned+tip+bonus;a.salesIncome=(a.salesIncome||0)+earned+tip+bonus;g.costs.credit(earned+tip+bonus);g.data.totalCustomers++;g.data.highestCombo=Math.max(g.data.highestCombo,a.maxCombo);g.data.tutorialComplete=true;
    g.data.tutorialState.guidedCupCount++;g.data.stats.cups++;g.data.stats.fiveStars+=rating===5?1:0;g.data.stats.income+=earned+tip+bonus;g.data.stats.recipes[c.recipe]=(g.data.stats.recipes[c.recipe]||0)+1;g.data.stats.favoriteRecipe=Object.keys(g.data.stats.recipes).sort((a,b)=>g.data.stats.recipes[b]-g.data.stats.recipes[a])[0];
    g.growth.onOrder(c,rating);g.town.served(c,assessment);g.journal.record(c);
    const detail={...assessment,orderCost:c.orderCost||0,earned,tip,bonus,combo:a.combo,total:g.data.cookies,lucky:c.type==='lucky',customer:c.type,limited:c.limited};
    a.current=null;g.persist();g.setPhase('review');g.emit('review',detail);
    g.later(2.1,()=>g.customerSystem.leave());return true;
  }
}

export class DrinkSystem {
  constructor(game) {this.g=game;game.drinkSystem=this;this.operation=0;}
  add(type) {
    const g=this.g,d=g.drink;if(g.paused||g.phase!=='making'||!d||!ingredients[type]||d.sealed)return false;
    if(!g.craft.allowed(type))return false;d.pendingIngredients??=[];
    if(type==='seal'){g.craft.stop();if(d.pendingIngredients.includes('seal'))return false;if(g.busy||d.pendingIngredients.length)g.emit('notice',{message:'等已加入的材料落杯，就封好它～'});}
    if(d.pendingIngredients.includes('seal'))return false;
    if(type!=='seal'&&(actualIngredients(d).includes(type)||d.pendingIngredients.includes(type))){g.emit('wrong',{message:'这份已经加过啦！'});return false;}
    g.current.operated=true;d.pendingIngredients.push(type);g.data.craftStats.acceptedIngredients++;g.emit('ingredientQueued',{ingredient:type});g.persist();this.pump();return true;
  }
  pump(){const g=this.g,d=g.drink;if(g.busy||g.phase!=='making'||!d?.pendingIngredients?.length)return;const type=d.pendingIngredients[0],operation=++this.operation;g.busy=true;g.emit('ingredientStart',{ingredient:type});
    g.later(equipmentDuration(g.data,type),()=>{if(this.operation!==operation||g.drink!==d||g.phase!=='making')return;
      if(ingredients[type].category==='base')d[type]=1;if(ingredients[type].category==='topping'&&!d.toppings.includes(type))d.toppings.push(type);if(type==='seal')d.sealed=true;
      g.costs.use(type);d.pendingIngredients.shift();g.busy=false;if(type==='seal'){g.lastDirection=0;g.lastShakeAt=-1;g.setPhase('shaking');}
      g.emit('ingredientDone',{ingredient:type});if(type==='seal'&&g.data.equipmentData.sealer===3&&g.random()<.22)g.emit('perfectSeal');g.persist();this.pump();});
  }
  undoTopping(){const g=this.g,d=g.drink;if(g.paused||g.phase!=='making'||!d||d.sealed||d.pendingIngredients?.includes('seal')||g.craft.teaching)return false;const pending=d.pendingIngredients||[];let index=-1;for(let i=pending.length-1;i>=0;i--)if(ingredients[pending[i]]?.category==='topping'){index=i;break;}let ingredient,cancelled=false;
    if(index>=0){ingredient=pending.splice(index,1)[0];cancelled=true;if(index===0){this.operation++;g.busy=false;}}else ingredient=d.toppings.pop();if(!ingredient)return false;g.data.craftStats.corrections++;g.emit('ingredientRemoved',{ingredient,cancelled});g.persist();this.pump();return true;}

  choose(kind,value){const g=this.g;if(kind!=='sugar'||g.paused||g.phase!=='making'||g.drink?.sealed||g.drink?.pendingIngredients?.includes('seal')||!sugars[value]||!g.craft.allowed('sugar')||(g.current.tutorial&&Number(value)!==70))return false;g.drink.sugar=Number(value);g.costs.use('condiments');g.current.operated=true;g.emit('choice',{kind,value:Number(value)});g.persist();return true;}
  reopen(){const g=this.g;if(g.paused||g.busy||!['shaking','ready'].includes(g.phase))return false;g.current.legacyStrawberry=false;g.drink.sealed=false;g.drink.finished=false;g.drink.shakeScore=0;g.drink.shakeTime=0;g.drink.shakeTurns=0;g.current.elapsed+=2;g.lastShakeAt=-1;g.setPhase('making');g.persist();return true;}
  canRemake(){const g=this.g,d=g.drink;return !!(d&&!g.busy&&['making','shaking','ready'].includes(g.phase)&&(d.sealed||d.sugar!==null||d.iceUnits>0||actualIngredients(d).length));}
  remake(){const g=this.g;if(g.paused||!this.canRemake())return false;this.operation++;g.craft.stop();g.costs.discard();g.current.legacyStrawberry=false;g.current.drink=newDrink();g.costs.use('cup');if(g.current.tutorial)g.current.guideStep='tea';if(g.current.iceGuide)g.current.guideStep='ice';g.lastShakeAt=-1;g.lastDirection=0;g.setPhase('making');g.emit('remade');g.persist();return true;}
  finishShake(){const g=this.g;if(g.paused||g.phase!=='shaking'||g.busy)return false;g.drink.finished=true;g.setPhase('ready');g.persist();return true;}
  shake(dx,dy,width) {
    const g=this.g;if(g.paused||g.phase!=='shaking'||Math.abs(dx)<1||Math.abs(dx)<Math.abs(dy)*.65)return false;
    const capped=Math.min(Math.abs(dx),width*.32),direction=Math.sign(dx);
    if(g.lastDirection&&g.lastDirection!==direction)g.drink.shakeTurns++;
    g.lastDirection=direction;g.lastShakeAt=g.clock;
    // Normalized by the interaction width: the same effort on small and large phones.
    g.drink.shakeScore=Math.min(99,g.drink.shakeScore+capped/Math.max(200,width)/SHAKE.distanceInWidths*100);
    g.emit('shake',{direction,force:Math.min(1,capped/40)});this.maybeFinishShake();return true;
  }
  maybeFinishShake() {
    const g=this.g,d=g.drink;if(g.phase!=='shaking'||!d)return false;
    if(d.shakeScore>=98&&d.shakeTime>=SHAKE.minDuration&&d.shakeTurns>=SHAKE.minTurns){
      d.shakeScore=100;d.finished=true;g.busy=true;g.setPhase('perfect');g.emit('perfect');g.persist();
      g.later(.55,()=>{g.busy=false;g.setPhase('ready');});return true;
    }return false;
  }
}

