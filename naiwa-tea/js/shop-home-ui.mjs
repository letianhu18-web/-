import {storeLevels,milestones} from './growth-data.mjs';
const $=id=>document.getElementById(id),number=n=>n.toLocaleString('zh-CN');
const chapters=['','从一杯好茶开始','把茶香带到街角','为每位客人留一盏暖灯','一间让人想再来的小店','把喜欢，慢慢经营成日常'];
export class ShopHomeUI{
 constructor(growth){this.host=growth;this.g=growth.g;this.expanded=false;this.animation=null;
  $('store-details-toggle').onclick=()=>this.toggle();
  $('store-page').addEventListener('close',()=>{this.animation?.cancel();this.expanded=false;this.disclosure(false);});
 }
 render(){const s=this.g.data;
  $('home-caption').hidden=this.g.phase!=='idle'||this.g.growth.decorating;
  $('home-chapter').textContent=`小店成长 ${String(s.storeLevel).padStart(2,'0')} / 05`;
  $('home-heading').textContent=storeLevels[s.storeLevel].name;$('home-subtitle').textContent=chapters[s.storeLevel];
  if($('store-page').open)this.content();
 }
 content(){const s=this.g.data,current=storeLevels[s.storeLevel],next=storeLevels[s.storeLevel+1];
  $('store-title').textContent=current.name;$('store-level-tag').textContent='LV.'+s.storeLevel;
  $('store-journey').innerHTML=Object.entries(storeLevels).map(([level,v])=>`<li class="${Number(level)<s.storeLevel?'complete':Number(level)===s.storeLevel?'current':''}" ${Number(level)===s.storeLevel?'aria-current="step"':''}><span>${Number(level)<s.storeLevel?'✓':level}</span><small>${['','茶摊','茶车','茶铺','主题店','旗舰店'][level]}</small></li>`).join('');
  $('store-current').textContent=`目前每天接待 ${current.flow.join('–')} 位客人`;
  $('store-next').innerHTML=next?`<div class="store-next-heading"><small>下一间小店</small><h3>${next.name}</h3></div><dl class="store-comparison">${[['同时在店',current.capacity,next.capacity,'位'],['家具位置',current.slots,next.slots,'处'],['每日客流',current.flow.join('–'),next.flow.join('–'),'位']].map(([label,from,to,unit])=>`<div><dt>${label}</dt><dd><span>${from}</span><i aria-hidden="true">→</i><b>${to}<small>${unit}</small></b></dd></div>`).join('')}</dl>`:'<div class="store-complete"><b>已抵达旗舰店</b><p>换一套布置，或为喜欢的客人挑件新衣服。每一杯好茶，都让这里更像你的小店。</p></div>';
  $('store-unlocks').innerHTML=(next?.unlocks||current.unlocks).map(t=>`<p><span aria-hidden="true">✓</span>${t}</p>`).join('');
  $('store-details-toggle').hidden=!next;
  const missing=next?Math.max(0,next.cost-s.cookies):0,days=next?Math.max(0,next.day-s.day):0;
  $('store-readiness').innerHTML=next?`<div><span>升级预算</span><strong>${number(next.cost)} <small>饼干</small></strong></div><progress max="${next.cost}" value="${Math.min(next.cost,s.cookies)}" aria-label="升级预算已攒 ${number(Math.min(next.cost,s.cookies))}，需要 ${number(next.cost)} 饼干"></progress><p>${missing?'还差 '+number(missing)+' 饼干':'预算已备齐'}<span>${days?'DAY '+next.day+' 可升级':'营业天数已达到'}</span></p>`:'<p>五段成长，都被好好记住了。</p>';
  const button=$('store-confirm-open');button.hidden=!next;button.disabled=!!next&&(days>0||missing>0);button.textContent=missing?'继续营业 · 慢慢攒够':days?'DAY '+next.day+' 开放升级':'升级为'+next?.name;
  const milestone=milestones.find(m=>!s.milestones.includes(m.id));$('milestone-next').textContent=milestone?`下一份纪念 · ${milestone.kind==='income'?'累计营业收入':'累计制作'} ${number(milestone.target)}${milestone.kind==='income'?' 饼干':' 杯'}`:'每一步成长，都留在了这里';
 }
 open(){if(!this.g.growth.guard())return;this.content();this.expanded=false;this.disclosure(false);$('store-page').showModal();}
 disclosure(open){$('store-details-toggle').setAttribute('aria-expanded',String(open));$('store-details').setAttribute('aria-hidden',String(!open));$('store-details').inert=!open;$('store-details').style.height=open?'auto':'0px';}
 toggle(){const area=$('store-details'),height=area.getBoundingClientRect().height;this.expanded=!this.expanded;this.animation?.cancel();this.disclosure(this.expanded);const target=this.expanded?area.scrollHeight:0;
  if(this.g.data.settings.lowEffects||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const open=this.expanded,anim=area.animate([{height:height+'px'},{height:target+'px'}],{duration:210,easing:'cubic-bezier(.2,.75,.25,1)'});this.animation=anim;
  anim.onfinish=()=>{if(this.animation===anim){this.animation=null;area.style.height=open?'auto':'0px';}};
 }
}
