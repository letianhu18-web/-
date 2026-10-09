import {drinkRecipes} from './data.mjs';
import {stampTiers,recipeStamp} from './journal.mjs';
import {miniCup} from './cup.mjs';
const $=id=>document.getElementById(id);
const bar=(value,max,label)=>`<progress max="${max}" value="${Math.min(value,max)}" aria-label="${label}"></progress>`;
export class JournalUI{
 constructor(game,audio,wardrobeUI){this.g=game;this.audio=audio;this.wardrobeUI=wardrobeUI;this.bind();this.renderHome();}
 open(){this.render();$('more-menu').close();this.returnToSummary=$('summary').open;if(this.returnToSummary)$('summary').close();$('journal-page').showModal();this.audio.play('click');}
 renderHome(){
  const wish=this.g.journal.wish(),near=this.g.journal.nearestStamp(),el=$('journal-home');
  el.hidden=this.g.phase!=='idle'||this.g.growth.decorating;
  el.querySelector('b').textContent=wish?(wish.owned?'心愿已实现 · '+wish.name:wish.name):'奶蛙的营业手账';
  el.querySelector('small').textContent=wish?(wish.owned?'去挑下一个心愿':wish.missing?`还差 ${wish.missing.toLocaleString('zh-CN')} 🍪`:'饼干够啦，去试穿'):(near?`${drinkRecipes[near.id].name}再做 ${near.next.cups-near.count} 杯得新印章`:'32 枚印章已集齐 · 看看小店的成长');
  if(this.g.phase==='summary')this.summary();
 }
 wishMarkup(){
  const w=this.g.journal.wish();
  if(!w)return '<small>给下一次营业一个期待</small><h3>把喜欢的衣服记下来</h3><p>去服装商店挑一套，设为心愿。攒够后再决定购买。</p>';
  return `<div class="journal-wish-head"><img src="./assets/outfits/${w.id}.png" alt=""><div><small>${w.owned?'心愿已实现':'我的服装心愿'}</small><h3>${w.name}</h3><p>${w.owned?'它已经在你的衣橱里。':w.missing?`还差 ${w.missing.toLocaleString('zh-CN')} 🍪`:'已经攒够，可以去试穿啦。'}</p></div></div>${w.owned?'':bar(w.saved,w.price,'当前饼干余额与服装价格')+`<small>当前余额 ${this.g.data.cookies.toLocaleString('zh-CN')} / 价格 ${w.price.toLocaleString('zh-CN')} 🍪</small>`}`;
 }
 render(){
  const s=this.g.data,total=Object.keys(drinkRecipes).reduce((n,id)=>n+recipeStamp(s,id).earned.length,0);
  $('journal-total').textContent=`${total} / 32 枚制作印章`;
  $('journal-wish-content').innerHTML=this.wishMarkup();
  $('journal-shop').disabled=this.g.phase!=='idle';
  $('journal-shop').textContent=this.g.phase==='idle'?'去服装商店看看':'营业结束后可挑选服装';
  $('journal-clear-wish').hidden=!s.journal.wish;$('journal-clear-wish').disabled=this.g.phase!=='idle';
  $('journal-recipes').innerHTML=Object.entries(drinkRecipes).map(([id,r])=>{
   const p=recipeStamp(s,id),known=s.unlocked.includes(id),last=p.earned.at(-1);
   return `<article class="journal-recipe ${known?'':'journal-locked'}">${known?miniCup(r):'<div class="journal-unknown">？</div>'}<h3>${known?r.name:'新的茶香'}</h3><small>${known?`累计制作 ${p.count} 杯`:`DAY ${r.day} 解锁`}</small><div class="journal-stamps" aria-label="已获得${p.earned.length}枚印章">${stampTiers.map(t=>`<span title="${t.name} · ${t.cups} 杯" class="${p.count>=t.cups?'earned':''}">${t.mark}<small>${t.cups}</small></span>`).join('')}</div><b>${known?(last?.name||'第一枚印章等你来'): '茶香慢慢收集'}</b><p>${known?(p.next?`再做 ${p.next.cups-p.count} 杯 · ${p.next.name}`:'这一杯，已成为小店的经典'):'学会以后，每一杯都能留下记录'}</p>${known&&p.next?bar(p.count,p.next.cups,r.name+'制作进度'):''}</article>`;
  }).join('');
 }
 summary(){
  const rows=this.g.journal.today(),s=this.g.data,wish=this.g.journal.wish(),near=this.g.journal.nearestStamp();
  const stamps=rows.flatMap(([id,n])=>{const count=s.stats.recipes[id]||0;return stampTiers.filter(t=>count>=t.cups&&count-n<t.cups).map(t=>`${drinkRecipes[id].name} · ${t.name}`);});
  $('summary-journal').innerHTML=`<small>今天也留下了成长</small><span class="journal-note">${stamps.length?'新印章：'+stamps.join('、'):rows.length?rows.map(([id,n])=>`${drinkRecipes[id].name} +${n} 杯`).join(' · '):'今天的营业已经记进小店的故事。'}</span>${wish?`<b>${wish.owned?'心愿已实现':wish.missing?`心愿还差 ${wish.missing.toLocaleString('zh-CN')} 🍪`:'心愿已经攒够啦'}</b><small>${wish.name}</small>`:near?`<small>下一枚：${drinkRecipes[near.id].name}再做 ${near.next.cups-near.count} 杯</small>`:''}`;
 }
 bind(){
  $('journal-page').addEventListener('close',()=>{if(this.returnToSummary){this.returnToSummary=false;if(this.g.phase==='summary')$('summary').showModal();}});
  $('journal-home').onclick=()=>this.open();$('more-journal').onclick=()=>this.open();$('summary-journal-open').onclick=()=>this.open();
  $('journal-shop').onclick=()=>{if(this.g.phase!=='idle')return;const w=this.g.journal.wish();if(w){this.wardrobeUI.selected=w.id;this.wardrobeUI.tab=w.collectible?'collectible':'ordinary';}$('journal-page').close();this.wardrobeUI.open();};
  $('journal-clear-wish').onclick=()=>{if(this.g.journal.setWish(null)){this.render();this.renderHome();}};
 }
}
