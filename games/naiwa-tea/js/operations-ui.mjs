import {materialCosts,billTotal} from './operating-costs.mjs';
const $=id=>document.getElementById(id);
export class OperationsUI{
 constructor(g,ui,audio){this.g=g;this.ui=ui;this.audio=audio;this.expanded=false;this.animation=null;this.bind();this.render();}
 render(){
  const g=this.g,c=g.current,active=!!g.day&&!['idle','summary','upgrading'].includes(g.phase);
  $('game').classList.toggle('has-cup-tools',active);
  $('cup-tools').hidden=!active;$('cup-cost-open').disabled=!c;$('cup-cost-open').textContent=`${c?'耗材':'今日耗材'} ${c?.orderCost||(!c?g.day?.materialCost:0)||0} 🍪 · 明细`;
  $('quick-remake').disabled=!g.drinkSystem.canRemake();
  if($('material-page').open)this.renderBill();
 }
 renderBill(){
  const g=this.g,bill=g.drink?.costBill||{},rows=Object.entries(bill).filter(([id,count])=>materialCosts[id]&&count>0);
  $('material-current').textContent=`本杯 ${billTotal(bill)} 🍪`;
  $('material-order').textContent=`本单累计 ${g.current?.orderCost||0} 🍪 · 含重做消耗`;
  $('material-today').textContent=`今天已用 ${g.day?.materialCost||0} 🍪${g.day?.wasteCost?' · 重做消耗 '+g.day.wasteCost+' 🍪':''}`;
  $('material-debt').textContent=g.data.operatingCosts.debt?`待结材料 ${g.data.operatingCosts.debt} 🍪，之后的收入会自动结清。`:'材料费用已计入余额。';
  $('material-rows').innerHTML=rows.length?rows.map(([id,count])=>`<div><span>${materialCosts[id].name}${count>1?' × '+count:''}</span><b>${materialCosts[id].price*count} 🍪</b></div>`).join(''):'<p>还没有使用材料。</p>';
  $('material-prices').textContent='每份：'+Object.values(materialCosts).map(v=>`${v.name} ${v.price}`).join(' · ')+' 🍪';
 }
 toggle(){
  const area=$('material-disclosure'),button=$('material-expand'),height=area.getBoundingClientRect().height;this.expanded=!this.expanded;
  button.setAttribute('aria-expanded',String(this.expanded));area.inert=!this.expanded;area.setAttribute('aria-hidden',String(!this.expanded));
  this.animation?.cancel();const target=this.expanded?area.scrollHeight:0;
  area.style.height=target+'px';
  if(this.g.data.settings.lowEffects||matchMedia('(prefers-reduced-motion: reduce)').matches){area.style.height=this.expanded?'auto':'0px';return;}
  const opened=this.expanded,anim=area.animate([{height:height+'px'},{height:target+'px'}],{duration:190,easing:'cubic-bezier(.2,.75,.25,1)'});this.animation=anim;
  anim.onfinish=()=>{if(this.animation===anim){area.style.height=opened?'auto':'0px';this.animation=null;}};
 }
 bind(){
  $('cup-cost-open').onclick=()=>{this.renderBill();$('material-page').showModal();this.audio.play('click');};
  $('material-expand').onclick=()=>this.toggle();
 }
}
