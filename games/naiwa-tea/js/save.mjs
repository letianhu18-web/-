import {ResilientSave} from './save-resilience.mjs';

import {normalizeCosts,normalizeBill,billTotal} from './operating-costs.mjs';
import {normalizeJournal} from './journal.mjs';
import {normalizeTown} from './town.mjs';
import {normalizeWardrobe} from './wardrobe-data.mjs';
import {ICE,iceUnits} from './craft-data.mjs';
import {normalizeGrowth} from './growth.mjs';
import {businessGoal,furnitureEffects,storeLevels} from './growth-data.mjs';
import {SAVE_KEY,freshSave,newDrink,dayGoal,drinkRecipes,customers,ingredients,sugars,ices} from './data.mjs';
function keepUnknown(raw,s){for(const [key,value]of Object.entries(raw||{})){if(['__proto__','prototype','constructor'].includes(key))continue;if(!(key in s))s[key]=value;else if(value&&s[key]&&typeof value==='object'&&typeof s[key]==='object'&&!Array.isArray(value)&&!Array.isArray(s[key]))keepUnknown(value,s[key]);}return s;}
const num=(v,fallback=0,max=1e12)=>Number.isFinite(v)?Math.max(0,Math.min(max,Math.floor(v))):fallback;
export class SaveSystem extends ResilientSave {
 check(raw){
  if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('不是有效的小店存档');
  if(![1,2,3,4].includes(raw.version))throw Error('不支持这个存档版本');
  if(!Number.isInteger(raw.day)||raw.day<1||raw.day>99999||!Number.isFinite(raw.cookies)||raw.cookies<0||raw.cookies>1e12)throw Error('天数或饼干数据无效');
  for(const k of ['unlocked','seenUnlocks','recentOrders','placedFurniture','recoveredFurniture','milestones','seenCustomers'])if(raw[k]!==undefined&&!Array.isArray(raw[k]))throw Error(k+' 格式错误');
  for(const k of ['settings','stats','equipmentData','ownedFurniture','ownedFinishes','collections','customerProgress','rewardLedger','tutorialState'])if(raw[k]!==undefined&&(!raw[k]||typeof raw[k]!=='object'||Array.isArray(raw[k])))throw Error(k+' 格式错误');
  if(raw.active!==undefined&&raw.active!==null&&(typeof raw.active!=='object'||Array.isArray(raw.active)))throw Error('营业快照格式错误');
  return raw;
 }
 exportText(data){return JSON.stringify({format:'naiwa-teashop',formatVersion:1,exportedAt:new Date().toISOString(),data},null,2);}
 decodeImport(text){if(typeof text!=='string'||text.length>2*1024*1024)throw Error('存档文件过大');let file;try{file=JSON.parse(text);}catch{throw Error('文件不是完整的 JSON 存档');}if(file?.format&&file.format!=='naiwa-teashop')throw Error('这不是奶蛙奶茶铺的存档');if(file?.formatVersion&&file.formatVersion!==1)throw Error('不支持这个备份格式');const raw=this.check(file?.format==='naiwa-teashop'?file.data:file);return this.validate(raw);}
 validate(raw){
  this.check(raw);const s={...raw,...freshSave()},old=raw.version===1;delete s.support;delete s.authorFeedbackDay;delete s.authorFeedbackDate;delete s.settings.authorFeedbackDisabled;
  s.presentationVersion=5;
  s.day=Math.max(1,num(raw.day,1,99999));for(const k of ['cookies','highestCombo','totalCustomers','streak'])s[k]=num(raw[k]);
  s.tutorialComplete=raw.tutorialComplete===true;s.settings.sound=raw.settings?.sound!==false;s.settings.vibration=raw.settings?.vibration!==false;
  s.unlocked=[...new Set([...s.unlocked,...Object.keys(drinkRecipes).filter(k=>drinkRecipes[k].day<=s.day),...(raw.unlocked||[]).filter(k=>drinkRecipes[k])])];
  s.seenUnlocks=[...new Set([...s.seenUnlocks,...(raw.seenUnlocks||[]).filter(k=>drinkRecipes[k])])];s.recentOrders=Array.isArray(raw.recentOrders)?raw.recentOrders.filter(x=>typeof x==='string').slice(-2):[];
  for(const k of ['days','cups','fiveStars','income'])s.stats[k]=num(raw.stats?.[k],old?(k==='days'?s.day-1:k==='cups'?s.totalCustomers:0):0);
  for(const k of Object.keys(drinkRecipes))s.stats.recipes[k]=num(raw.stats?.recipes?.[k]);
  s.stats.favoriteRecipe=Object.keys(s.stats.recipes).filter(k=>s.stats.recipes[k]>0).sort((a,b)=>s.stats.recipes[b]-s.stats.recipes[a])[0]||null;
  normalizeGrowth(raw,s);s.wardrobe=normalizeWardrobe(raw.wardrobe);s.journal=normalizeJournal(raw.journal,s.day);s.operatingCosts=normalizeCosts(raw.operatingCosts);
  s.recoveredFurniture=Array.isArray(raw.recoveredFurniture)?raw.recoveredFurniture:[];const placedIds=new Set(s.placedFurniture.map(p=>p.uid));for(const p of Array.isArray(raw.placedFurniture)?raw.placedFurniture:[]){if(p.uid&&!placedIds.has(p.uid)&&!s.recoveredFurniture.some(q=>q.uid===p.uid)){s.recoveredFurniture.push({...p,recoveryReason:'旧位置不可用，家具归属已保留'});this.recoveryNotice='有旧位置暂时不能摆放，家具已保留在仓库，请重新选位置。';}}

  const t=raw.tutorialState;s.tutorialState={version:4,iceGuideDone:t?.iceGuideDone===true,guidedCupCount:num(t?.guidedCupCount),referenceHintEnabled:t?.referenceHintEnabled===true,seenIceOrders:Array.isArray(t?.seenIceOrders)?t.seenIceOrders.filter(x=>[0,1,2].includes(x)):[],legacy:raw.version<4||t?.legacy===true};
  if(raw.version<4)s.tutorialComplete=true;
  s.settings.lowEffects=raw.settings?.lowEffects===true;for(const k of ['manualCorrect','corrections','acceptedIngredients'])s.craftStats[k]=num(raw.craftStats?.[k]);s.craftStats.firstManual=raw.craftStats?.firstManual===true;
  s.rewardLedger=Object.fromEntries(Object.entries(raw.rewardLedger||{}).filter(([k,v])=>typeof k==='string'&&k.length<160&&v===true));

  normalizeTown(raw,s);const a=raw.active;if(a&&a.day===s.day){const goal=Math.max(1,num(a.goal,businessGoal(s),14)),served=num(a.served,0,goal);
   s.active={day:s.day,goal,served,waiting:[],spawned:num(a.spawned,served+(a.current?1:0),goal),queueClock:0,rushPlanned:a.rushPlanned===true,rushRemaining:num(a.rushRemaining,0,3),rushTriggered:a.rushTriggered===true,collectionReward:num(a.collectionReward),salesIncome:num(a.salesIncome,a.income),goalReward:num(a.goalReward),milestoneReward:num(a.milestoneReward),perfect:num(a.perfect,0,served),combo:s.streak,maxCombo:num(a.maxCombo),income:Number.isFinite(a.income)?Math.max(-1e12,Math.min(1e12,Math.floor(a.income))):0,materialCost:num(a.materialCost),wasteCost:num(a.wasteCost,0,num(a.materialCost)),tips:num(a.tips),ratingSum:num(a.ratingSum,old?num(a.perfect)*5:0),bonuses:num(a.bonuses,old&&a.bonusAwarded?20:0),unlocks:Array.isArray(a.unlocks)?a.unlocks.filter(k=>drinkRecipes[k]):[],status:a.status==='summary'||served>=goal?'summary':'open',current:null};
   if(served>=goal&&a.status!=='summary')s.stats.days++;
   const c=a.current;if(c&&served<goal&&s.active.status==='open'){
    const type=customers[c.type]?c.type:'student',recipe=drinkRecipes[c.recipe]?c.recipe:'pearlMilkTea',d=c.drink||{},drink=newDrink();
    drink.costBill=normalizeBill(d.costBill);for(const k of ['tea','milk','strawberryJam'])drink[k]=d[k]?1:0;
    drink.toppings=[...new Set((Array.isArray(d.toppings)?d.toppings:[]).filter(k=>ingredients[k]?.category==='topping'))];
    drink.sugar=sugars[d.sugar]?Number(d.sugar):old&&d.sealed?70:null;drink.ice=ices[d.ice]?Number(d.ice):old&&d.sealed?1:null;
    drink.iceUnits=raw.version<4?(ICE.targets[drink.ice]??0):iceUnits(d);drink.manualIce=d.manualIce===true;drink.pendingIngredients=[...new Set((Array.isArray(d.pendingIngredients)?d.pendingIngredients:[]).filter(k=>ingredients[k]&&!drink.toppings.includes(k)&&!drink[k]))];drink.sealed=d.sealed===true;if(drink.sealed)drink.pendingIngredients=[];drink.shakeScore=drink.sealed?num(d.shakeScore,0,100):0;drink.shakeTime=drink.sealed?num(d.shakeTime,0,10):0;drink.shakeTurns=drink.sealed?num(d.shakeTurns,0,100):0;drink.finished=drink.sealed&&(d.finished===true||drink.shakeScore===100);
    s.active.current={legacyStrawberry:recipe==='strawberryMilkTea'&&drink.sealed&&(c.legacyStrawberry===true||raw.recipeRevision!==2),orderCost:num(c.orderCost,billTotal(drink.costBill)),id:`${s.day}-${served+1}`,type,recipe,sugar:sugars[c.sugar]?Number(c.sugar):70,ice:ices[c.ice]?Number(c.ice):1,variantId:s.collections.unlockedVariants.includes(c.variantId)?c.variantId:null,storyNode:Math.min(3,num(c.storyNode)),storyIntroSeen:c.storyIntroSeen===true,limited:c.limited===true,waitElapsed:num(c.waitElapsed),frontTime:0,patience:customers[type].patience*(s.day<=3?1.2:1)*(1+furnitureEffects(s).patience),accepted:c.accepted===true,elapsed:num(c.elapsed,0,86400),operated:c.operated===true||Boolean(drink.tea||drink.milk||drink.toppings.length),expired:c.expired===true,drink,paid:false,guideStep:typeof c.guideStep==='string'?c.guideStep:'ice',iceGuide:raw.version===4&&c.iceGuide===true,tutorial:raw.version===4&&!s.tutorialComplete&&served===0};
   }
   if(s.active.status==='open'){for(const c of (Array.isArray(a.waiting)?a.waiting:[]).slice(0,Math.min(storeLevels[s.storeLevel].capacity-1,goal-served-(s.active.current?1:0)))){if(!customers[c.type]||!drinkRecipes[c.recipe])continue;s.active.waiting.push({id:String(c.id),type:c.type,recipe:c.recipe,sugar:sugars[c.sugar]?Number(c.sugar):70,ice:ices[c.ice]?Number(c.ice):1,variantId:s.collections.unlockedVariants.includes(c.variantId)?c.variantId:null,storyNode:Math.min(3,num(c.storyNode)),storyIntroSeen:c.storyIntroSeen===true,limited:c.limited===true,patience:customers[c.type].patience*(s.day<=3?1.2:1)*(1+furnitureEffects(s).patience),waitElapsed:num(c.waitElapsed),elapsed:0,frontTime:0,accepted:false,operated:false,expired:false,paid:false,tutorial:false,drink:newDrink()});}s.active.spawned=Math.max(s.active.spawned,served+(s.active.current?1:0)+s.active.waiting.length);}
  }const result=keepUnknown(raw,s);delete result.saveMeta;return result;
 }
}

