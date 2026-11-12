import {variants} from './town-data.mjs';
import {ICE,iceUnits,guideStep,guideText} from './craft-data.mjs';
import {businessGoal,equipmentDuration} from './growth-data.mjs';
import {toppingMarkup,iceMarkup,updateIce,creamMarkup,liquidColor,miniCup} from './cup.mjs';
import { ingredients, nextIngredient, dayGoal, customers, drinkRecipes, sugars, ices, actualIngredients, recipeText } from './data.mjs';
const $=s=>document.querySelector(s);
export class UIManager {
  constructor(game) {
    this.g=game;this.tab='base';this.labelUntil=0;this.labelTarget=null;this.trayPage=0;this.machine=null;this.shownMoney=game.data.cookies;this.moneyFrom=this.shownMoney;this.moneyTo=this.shownMoney;this.moneyAge=1;this.toastTimer=0;this.comboTimer=0;this.lastPatienceText='';this.ready=false;this.shakeVisual=0;
    this.els={};for(const id of ['game','day','cookies','day-plan','idle-order','order','order-line','customer-index','patience-fill','patience-label','scene-caption','day-intro','review','stars','review-text','review-money','combo','loading','load-percent','workbench','bench-label','cup','cup-label','pearls','liquid','liquid-color','pour-stream','cup-seal','seal-pop','shake-area','shake-title','shake-fill','instruction','main-action','footer-hint','toast','particles','summary','summary-title','sum-customers','sum-perfect','sum-combo','sum-income','sum-bonus','summary-message'])this.els[id]=document.getElementById(id);
    this.buttons=[];this.renderDrink(game.drink);this.render();
  }
  setReady(){this.ready=!this.g.save.readBlocked&&!this.g.save.conflict;this.els.loading.hidden=true;this.render();}
  setScene(scene){this.scene=scene;document.getElementById('scene-wrap').append(document.getElementById('craft-desktop'),document.getElementById('event-banner'));document.querySelector('.order-zone').append(document.getElementById('business-strip'));document.getElementById('order').append(document.getElementById('streak-badge'));$('#materials').dataset.keys='';this.renderControls();}
  render() {
    const g=this.g,e=this.els,p=g.phase,c=g.current,active=g.day,shaking=['shaking','perfect'].includes(p);
    if(c?.id!==this.lastOrderId){this.clearLabel();this.tab='base';this.machine=null;this.lastOrderId=c?.id;}const recipe=drinkRecipes[c?.recipe??'pearlMilkTea'];$('.price').textContent=`${recipe.name} · ${recipe.price+(c?.limited?6:0)} 🍪`;$('.order-drink small').textContent=recipe.name;
    e.game.dataset.phase=p;e.game.classList.toggle('is-shaking',p==='shaking');e.day.textContent=`DAY ${g.data.day}`;e.cookies.textContent=this.formatMoney(this.shownMoney);
    e['day-plan'].textContent=active?`今日已接待 ${active.served} / ${active.goal} 位`:`今天接待 ${businessGoal(g.data)} 位顾客`;$('#idle-order b').textContent=active?'营业进行中':'小店准备好啦';$('.open-tag').textContent=active?'谢谢光临':'开店啦';
    const orderVisible=Boolean(c)&&!['arriving','dayIntro'].includes(p);
    e.order.classList.toggle('compact',Boolean(c?.accepted));e.order.parentElement.classList.toggle('compact',Boolean(c?.accepted));e.order.hidden=!orderVisible;e['idle-order'].hidden=orderVisible;
    if(c){$('#customer-name').textContent=customers[c.type].icon+' '+customers[c.type].name;e['order-line'].textContent=c.variantId?`${variants[c.variantId].name} · ${recipe.name}`:(c.limited?'限定 · ':'')+recipe.name;$('#order-details').innerHTML=`<span>🍬 ${sugars[c.sugar]}</span><span>🧊 ${ices[c.ice]}</span><span>${recipe.ingredients.filter(k=>ingredients[k].category==='topping').map(k=>ingredients[k].name).join(' · ')||'无小料'}</span>`;e['customer-index'].textContent=`${active.served+1} / ${active.goal}`;}
    e['day-intro'].hidden=p!=='dayIntro';e['day-intro'].querySelector('b').textContent=`DAY ${g.data.day}`;
    if(p!=='review')e.review.hidden=true;
    e.workbench.classList.toggle('shaking',shaking);e['shake-area'].hidden=!shaking;
    const step=guideStep(c);if(step==='ice'||step==='sugar')this.tab='sugarIce';else if(step==='pearl')this.tab='topping';else if(step==='tea'||step==='milk')this.tab='base';
    this.renderControls();
    const own=g.drink?actualIngredients(g.drink):[];$('#recipe').innerHTML=own.length?own.map(k=>`<span class="done">✓ ${ingredients[k].name}</span>`).join(''):'';
    $('#own-sugar').textContent='糖：'+(sugars[g.drink?.sugar]||'未选');$('#own-ice').textContent=iceUnits(g.drink)?'冰：已手动加入':'冰：未加入';
    $('#reopen').hidden=!['shaking','ready'].includes(p);$('#reopen').disabled=g.busy;
    $('#recipe-help').disabled=!c;$('#workshop-tools').hidden=!c;
    $('#streak-badge').hidden=!g.data.streak;$('#streak-badge').textContent=`PERFECT ×${g.data.streak}`;
    e['main-action'].disabled=!this.ready||!['idle','order','making','ready','shaking'].includes(p)||(p==='making'&&(!g.craft.allowed('seal')||g.drink?.pendingIngredients?.includes('seal')));
    const action={idle:'开始营业',dayIntro:'营业开始！',arriving:'客人来啦…',order:'开始制作',making:g.drink?.pendingIngredients?.includes('seal')?'材料落杯后封好它…':'封口 · 摇一摇',shaking:'就这样，完成摇匀',perfect:'完美！',ready:'递给顾客',delivering:'给你，刚做好的～',review:'客人正在品尝',leaving:'慢走，欢迎再来',between:'下一位客人马上到',summary:'今天辛苦啦'};
    if(g.save.readBlocked||g.save.conflict)e['main-action'].disabled=false;e['main-action'].textContent=(g.save.readBlocked||g.save.conflict)?'存档需要恢复 · 打开设置':this.ready?action[p]:'奶蛙准备中…';e['main-action'].classList.toggle('guided',step==='seal');
    e['bench-label'].textContent=p==='idle'?'今天的招牌':shaking?'手作最后一步':p==='ready'?'新鲜出炉':'奶蛙的操作台';
    e['instruction'].classList.toggle('teaching',g.craft.teaching);
    let instruction='茶香刚刚好，等你来开张';
    if(p==='order')instruction=c.tutorial?'第一位客人来啦，先接下订单！':'新订单，准备好了吗？';
    if(p==='making')instruction=step==='ice'?(iceUnits(g.drink)>ICE.targets[c.ice]+1?'多了一点，点冰夹捞出一块～':c.ice===2?'正常冰更充足，按住加，松手停':guideText.ice):step?guideText[step]:g.busy?'正在加入，其他小料可以接着点～':c.firstIceHint&&c.ice===0?'这杯不加冰，直接做后面的步骤':'';
    if(p==='shaking')instruction='左右来回，不用拼命摇～';
    if(p==='perfect')instruction='完美！这杯一定很好喝！';
    if(p==='ready')instruction='可以递杯啦';
    if(p==='arriving')instruction='欢迎光临奶蛙奶茶铺';
    if(['delivering','review'].includes(p))instruction='一杯现做的好心情';
    if(['leaving','between'].includes(p))instruction='擦擦小桌子，准备下一杯';
    e.instruction.textContent=instruction;e.instruction.hidden=!(g.craft.teaching&&p==='making'||p==='ready');
    const captions={idle:'奶蛙在柜台上歇一会儿',dayIntro:'开店啦！',arriving:'有客人来买奶茶啦',order:'今天也要元气满满',making:'奶蛙认真调制中',shaking:'咕噜咕噜，香气摇匀',perfect:'奶蛙开心地跳了起来',ready:'好啦，来尝尝！',delivering:'这杯奶茶，给你',review:'一口就喜欢上了',leaving:'谢谢光临～',between:'稍微歇一歇',summary:'忙碌又开心的一天'};
    e['scene-caption'].textContent=captions[p];e['footer-hint'].textContent=active?`今日已接待 ${active.served} / ${active.goal} 位 · 完美 ${active.perfect} 杯`:'进度自动保存 · 想休息就休息';
    if(p==='idle'||p==='arriving'){this.activeIngredient=null;e['pour-stream'].setAttribute('opacity','0');e['seal-pop'].hidden=true;e.cup.className='cup';e.cup.style.transform='';e['cup-seal'].setAttribute('opacity','0');e.combo.hidden=true;}
    this.renderDrink(g.drink);
    if(p==='summary')this.summary();
  }
  renderControls(){
    const g=this.g,pending=g.drink?.pendingIngredients||[],active=this.ready&&['order','making'].includes(g.phase)&&!g.drink?.sealed&&!pending.includes('seal'),root=$('#materials'),step=guideStep(g.current),allowed=k=>active&&g.craft.allowed(k);
    const unlocked=new Set(g.data.unlocked.flatMap(k=>drinkRecipes[k].ingredients));
    const bases=[...unlocked].filter(k=>ingredients[k].category==='base'),tops=[...unlocked].filter(k=>ingredients[k].category==='topping'),pages=Math.max(1,Math.ceil(tops.length/3));this.trayPage%=pages;if(step==='pearl')this.trayPage=Math.floor(tops.indexOf('pearl')/3);
    const keys=active?(this.tab==='base'?bases:this.tab==='topping'?tops.slice(this.trayPage*3,this.trayPage*3+3):[]):[],key=keys.join(':');
    if(root.dataset.keys!==key){root.dataset.keys=key;root.innerHTML=keys.map(k=>`<button data-ingredient="${k}" class="scene-target"><span class="ingredient-name">${ingredients[k].name}</span><i class="ingredient-state" aria-hidden="true"></i></button>`).join('');}
    const own=g.drink?actualIngredients(g.drink):[];
    for(const b of root.querySelectorAll('[data-ingredient]')){const k=b.dataset.ingredient,done=own.includes(k),queued=pending.includes(k);b.disabled=!allowed(k);b.classList.toggle('done',done);b.classList.toggle('pending',queued);b.classList.toggle('guided',step===k);b.classList.toggle('show-label',step===k||this.labelTarget===b&&performance.now()<this.labelUntil);b.querySelector('.ingredient-state').textContent=done?'✓':queued?'•':'';b.setAttribute('aria-label',ingredients[k].name+(done?'，已加入':queued?'，等待落杯':'，点击加入'));}
    for(const b of document.querySelectorAll('#sugar-options [data-choice]')){const v=Number(b.dataset.value);b.disabled=!allowed('sugar')||g.current?.tutorial&&v!==70;b.classList.toggle('selected',g.drink?.sugar===v);b.classList.toggle('guided',step==='sugar'&&v===70);b.setAttribute('aria-pressed',String(g.drink?.sugar===v));}
    const sugar=$('[data-machine="sugar"]');sugar.hidden=!active||this.tab!=='sugarIce';sugar.disabled=!allowed('sugar');sugar.classList.toggle('guided',step==='sugar');sugar.querySelector('span').textContent=sugars[g.drink?.sugar]||'糖浆';
    $('#sugar-options').hidden=!(this.machine==='sugar'||step==='sugar')||!active||this.tab!=='sugarIce';
    $('#tray-next').hidden=pages<=1||this.tab!=='topping'||!active;$('#tray-next').disabled=!active||!!step;$('#tray-next').textContent=`换小料 ${this.trayPage+1}/${pages}`;
    $('#seal-button').disabled=!allowed('seal');$('#seal-button').classList.toggle('guided',step==='seal');
    $('#ice-tools').hidden=!active||this.tab!=='sugarIce';$('#ice-add').disabled=!allowed('ice');$('#ice-add').classList.toggle('guided',step==='ice');$('#ice-remove').disabled=!allowed('removeIce');$('#ice-remove').hidden=false;$('#ice-remove').classList.toggle('has-ice',iceUnits(g.drink)>0);$('#undo-topping').hidden=!(g.drink?.toppings.length||pending.some(k=>ingredients[k]?.category==='topping'));$('#undo-topping').disabled=!active||g.craft.teaching;
    this.buttons=[...document.querySelectorAll('[data-ingredient]')];
    for(const b of document.querySelectorAll('.category-tabs [data-tab]')){b.classList.toggle('selected',b.dataset.tab===this.tab);b.setAttribute('aria-selected',String(b.dataset.tab===this.tab));b.disabled=!active||g.craft.teaching&&b.dataset.tab!==this.tab;}document.querySelector('.category-tabs').hidden=!active;this.scene?.craftScene?.setControls(keys,g.data.equipmentData,this.tab,active);this.scene?.craftScene?.projectTargets();$('#ice-add b').textContent=iceUnits(g.drink)?`冰 ${iceUnits(g.drink)*5}%`:'按住加冰';
  }
  clearLabel(){this.labelTarget?.classList.remove('show-label');this.labelTarget=null;this.labelUntil=0;}
  flashLabel(el){this.labelTarget=el;this.labelUntil=performance.now()+1000;el?.classList.add('show-label');}
  tapIngredient(type){const b=document.querySelector(`[data-ingredient="${type}"]`);if(b)this.animate(b,'flash');}
  quickToppings(){const g=this.g,rank={};for(const[k,n]of Object.entries(g.data.stats.recipes)){for(const i of drinkRecipes[k]?.ingredients||[])if(ingredients[i].category==='topping')rank[i]=(rank[i]||0)+n;}return [...new Set([...Object.keys(rank).sort((a,b)=>rank[b]-rank[a]),'pearl','coconut','pudding'])].slice(0,3);}
  renderDrink(d,preview=null){preview=preview||this.activeIngredient;const e=this.els,p=d?structuredClone(d):{toppings:[]};if(preview&&ingredients[preview]?.category==='base')p[preview]=1;if(preview&&ingredients[preview]?.category==='topping'&&!p.toppings.includes(preview))p.toppings.push(preview);
    e.liquid.setAttribute('transform',`translate(0,${p.milk?-4:p.tea||p.strawberryJam?34:134})`);e['liquid-color'].setAttribute('fill',liquidColor(p));e['cup-seal'].setAttribute('opacity',p.sealed?'1':'0');
    e.pearls.innerHTML=toppingMarkup(p,Boolean(preview));updateIce($('#ice-cubes'),p);$('#cream-layer').innerHTML=creamMarkup(p);const c=this.g.current,t=this.g.data.tutorialState,reference=!!c&&(t.referenceHintEnabled||this.g.craft.teaching||t.guidedCupCount===1||c.firstIceHint&&c.ice===2);$('#ice-reference').innerHTML=reference&&!p.sealed?iceMarkup({...p,iceUnits:ICE.targets[c.ice]},-1,true):'';e.cup.classList.toggle('cold',iceUnits(p)>0);e.cup.classList.toggle('low-effects',this.g.data.settings.lowEffects===true);
    const label=p.finished?'完成品 · 新鲜出炉':p.sealed?'已封口，摇一摇':actualIngredients(p).length?'杯中材料，眼见为实':'空杯，等你调制';e['cup-label'].textContent=label;e.cup.setAttribute('aria-label',label);this.scene?.craftScene?.setDrink(p);
  }
  ingredientStart(type){this.activeIngredient=type;document.documentElement.style.setProperty('--seal-duration',equipmentDuration(this.g.data,'seal')+'s');document.documentElement.style.setProperty('--pour-duration',equipmentDuration(this.g.data,type)+'s');this.render();this.renderDrink(this.g.drink,type);const e=this.els,b=this.buttons.find(b=>b.dataset.ingredient===type);if(b)this.animate(b,'flash');
    if(ingredients[type]?.category==='base'){e['pour-stream'].setAttribute('opacity','1');e['pour-stream'].querySelector('path').setAttribute('stroke',type==='tea'?'#a96e32':type==='milk'?'#fffae7':'#e66c89');}
    if(type==='seal'){this.animate(e.cup,'sealing');e['seal-pop'].hidden=false;}
  }
  choice(kind,value){document.documentElement.style.setProperty('--ice-duration',equipmentDuration(this.g.data,'ice')+'s');this.els.cup.classList.toggle('premium-ice',this.g.data.equipmentData.iceMachine===3);this.render();this.scene?.scoop('sugar');this.machine=null;this.renderControls();this.animate(this.els.cup,'bump');if(kind==='sugar'){const stream=this.els['pour-stream'];stream.setAttribute('opacity','1');stream.querySelector('path').setAttribute('stroke','#e9bf65');clearTimeout(this.sugarTimer);this.sugarTimer=setTimeout(()=>stream.setAttribute('opacity','0'),200+value*3);}else{this.animate($('#ice-cubes'),'ice-drop');}}
  recipeBook(){ $('#recipe-cards').innerHTML=Object.entries(drinkRecipes).map(([k,r])=>`<article>${this.g.data.unlocked.includes(k)?`${miniCup(r)}<b>${r.name}</b><small>${r.price} 🍪 · ${'★'.repeat(r.difficulty)}</small><p>${recipeText(k)}</p>`:`<div class="locked-cup">🧋</div><b>？？？</b><p>DAY ${r.day} 解锁</p>`}</article>`).join('');$('#recipe-book').showModal();}
  recipeHint(){const k=this.g.current?.recipe;if(!k)return;$('#hint-title').textContent=drinkRecipes[k].name;$('#hint-parts').textContent=this.g.current.legacyStrawberry&&!this.g.drink.tea?drinkRecipes[k].ingredients.filter(id=>id!=='tea').map(id=>ingredients[id].name).join(' ＋ ')+'（更新前已封口，可按原配方交付）':recipeText(k);$('#hint-ice').innerHTML=iceMarkup({iceUnits:ICE.targets[this.g.current.ice],milk:1},-1,true);$('#hint-ice-label').textContent=ices[this.g.current.ice]+'的参考样子 · 不会自动加冰';$('#recipe-hint').showModal();}
  ingredientDone(){this.activeIngredient=null;this.els['pour-stream'].setAttribute('opacity','0');this.els['seal-pop'].hidden=true;this.animate(this.els.cup,'bump');this.render();}
  animate(el,cls){el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);const done=()=>{el.classList.remove(cls);el.removeEventListener('animationend',done);};el.addEventListener('animationend',done);}
  perfect(){this.els['shake-title'].textContent='完美！';this.els['shake-fill'].style.width='100%';this.els.cup.style.transform='';this.animate(this.els.cup,'perfect');this.particles(9,.49,.49);}
  review({rating,earned,tip,bonus,combo,total,text,reasons,lucky,orderCost=0}){const e=this.els;e.review.hidden=false;e.stars.textContent='★'.repeat(rating)+'☆'.repeat(5-rating);e['review-text'].textContent=text;e['review-money'].textContent=`本单盈余 ${earned+tip+bonus-orderCost} 🍪 · 耗材 ${orderCost}`;$('#review-reasons').textContent=reasons.join(' · ');$('#tip-pop').textContent=tip?`小费 +${tip} 🍪！`:'';if(tip)this.animate($('#tip-pop'),'tip-float');this.setMoney(total);if(combo&&combo%5===0){e.combo.hidden=false;e.combo.classList.add('big');e.combo.textContent=combo===5?'奶蛙进入状态啦！ +20 🍪':combo===10?'10 连完美！ +50 🍪':`${combo} 连完美！手感超棒！`;this.comboTimer=1.4;this.particles(14,.5,.39);}else if(rating===5)this.particles(5,.42,.37);}
  summary(){const a=this.g.day,e=this.els;e['summary-title'].textContent=`DAY ${this.g.data.day} 营业结束`;e['sum-customers'].textContent=String(a.served);e['sum-perfect'].textContent=String(a.perfect);e['sum-combo'].textContent=String(a.maxCombo);e['sum-income'].textContent=`${a.income} 🍪`;e['sum-bonus'].hidden=!a.bonuses;e['sum-bonus'].textContent=`含连击奖励 +${a.bonuses} 🍪`;
    const average=a.served?a.ratingSum/a.served:0;$('#sum-average').textContent=`${average.toFixed(1)} / 5`;$('#sum-tips').textContent=`${a.tips} 🍪`;$('#sum-unlocks').textContent=a.unlocks?.length?'新配方：'+a.unlocks.map(k=>drinkRecipes[k].name).join('、'):'';
    e['summary-message'].textContent='★'.repeat(Math.round(average))+'☆'.repeat(5-Math.round(average))+'\n'+(average>=4.5?'奶蛙今天状态绝佳！':average>=3.5?'不错的一天！':'每一杯，都是新进步！');if(!e.summary.open)e.summary.showModal();}
  setMoney(n,instant=false){this.moneyFrom=this.shownMoney;this.moneyTo=n;this.moneyAge=instant?1:0;if(instant){this.shownMoney=n;this.els.cookies.textContent=this.formatMoney(n);}else this.animate(document.querySelector('.wallet'),'pop');}
  formatMoney(n){return Math.round(n).toLocaleString('en-US');}
  toast(message,seconds=1.5){const host=[...document.querySelectorAll('dialog[open]')].sort((a,b)=>Number(a.dataset.openedAt||0)-Number(b.dataset.openedAt||0)).at(-1)||this.els.game;if(this.els.toast.parentElement!==host)host.append(this.els.toast);this.els.toast.textContent=message;this.els.toast.hidden=false;this.toastTimer=seconds;}
  particles(count,x,y){const root=this.els.particles;count=Math.min(count,Math.max(0,24-root.childElementCount));for(let i=0;i<count;i++){const p=document.createElement('span');p.className='particle';p.textContent=i%3?'✦':'●';p.style.left=`${x*100}%`;p.style.top=`${y*100}%`;p.style.setProperty('--dx',`${(Math.random()-.5)*220}px`);p.style.setProperty('--dy',`${-35-Math.random()*110}px`);p.style.setProperty('--spin',`${(Math.random()-.5)*180}deg`);root.append(p);p.addEventListener('animationend',()=>p.remove(),{once:true});}}
  tick(dt){const g=this.g,e=this.els;if(this.labelTarget&&performance.now()>this.labelUntil){this.labelTarget.classList.remove('show-label');this.labelTarget=null;}
    if(this.moneyAge<1){this.moneyAge=Math.min(1,this.moneyAge+dt/.6);const k=1-(1-this.moneyAge)**3;this.shownMoney=Math.round(this.moneyFrom+(this.moneyTo-this.moneyFrom)*k);e.cookies.textContent=this.formatMoney(this.shownMoney);}
    if(this.toastTimer>0){this.toastTimer-=dt;if(this.toastTimer<=0)e.toast.hidden=true;}
    if(this.comboTimer>0){this.comboTimer-=dt;if(this.comboTimer<=0)e.combo.hidden=true;}
    const c=g.current;if(c){const remaining=g.craft.teaching?c.patience:Math.max(0,c.patience-c.elapsed);e['patience-fill'].style.transform=`scaleX(${remaining/c.patience})`;e['patience-fill'].style.background=remaining<5?'#cf735f':remaining<c.patience*.45?'#dfb362':'#88b57e';$('#sweat').hidden=remaining>5;$('#patience-label').classList.toggle('urgent',remaining>0&&remaining<=5);const text=g.craft.teaching?'慢慢来，我等你～':remaining>0?`耐心 ${Math.ceil(remaining)} 秒`:'别着急，做好还可以交付';if(text!==this.lastPatienceText){e['patience-label'].textContent=text;this.lastPatienceText=text;}}
    if(!c)$('#sweat').hidden=true;
    if(g.phase==='shaking'){const score=g.drink.shakeScore;e['shake-fill'].style.width=`${score}%`;e['shake-title'].textContent=score<40?'摇起来！':score<74?'不错！再摇几下':'香气快摇匀啦！';this.shakeVisual*=Math.exp(-dt*9);e.cup.style.transform=`rotate(${this.shakeVisual*15}deg) translateX(${this.shakeVisual*6}px)`;}else if(!['perfect','delivering'].includes(g.phase))e.cup.style.transform='';
  }
}
