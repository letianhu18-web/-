import {outfitCatalog,outfitById,wardrobeTargets} from './wardrobe-data.mjs';
const $=id=>document.getElementById(id);
export class WardrobeUI {
 constructor(game,ui,audio,getScene){this.g=game;this.ui=ui;this.audio=audio;this.getScene=getScene;this.target='student';this.selected='cream_bakery';this.tab='ordinary';this.back=false;this.pending=null;this.previewCache=new Map();this.bind();}
 get item(){return outfitById[this.selected];}
 get targetName(){return wardrobeTargets.find(item=>item.id===this.target)?.name||'学生奶蛙';}
 open(){if(this.g.save.readBlocked||!this.g.growth.guard()||this.g.growth.decorating)return;$('more-menu').close();this.back=false;this.pending=null;this.render();$('clothes-page').showModal();this.audio.play('click');}
 render(){
  const w=this.g.data.wardrobe,item=this.item,owned=w.owned.includes(item.id),assigned=w.assignments[this.target]===item.id;
  $('clothes-balance').textContent=this.g.data.cookies.toLocaleString('zh-CN')+' 饼干';
  $('clothes-target').innerHTML=wardrobeTargets.map(({id,name})=>`<option value="${id}" ${id===this.target?'selected':''}>${name}</option>`).join('');
  $('clothes-name').textContent=item.name;$('clothes-description').textContent=item.description;
  $('clothes-wish').hidden=owned;$('clothes-wish').textContent=this.g.data.journal.wish===item.id?'✓ 已记为心愿 · 点击取消':'♡ 设为我的服装心愿';
  $('clothes-kind').textContent=(item.collectible?'典藏服装':'普通服装')+(owned?' · 已收藏':' · 永久收藏');
  $('clothes-preview').alt=item.name+'试穿预览';
  $('clothes-preview').src=this.back?(this.previewCache.get(item.id+'-back')||'./assets/outfits/'+item.id+'-back.png'):'./assets/outfits/'+item.id+'.png';
  $('clothes-preview').classList.remove('unavailable');$('clothes-turn').hidden=false;$('clothes-turn').textContent=this.back?'看看正面':'转身看看';
  for(const b of document.querySelectorAll('[data-clothes-tab]'))b.classList.toggle('active',b.dataset.clothesTab===this.tab);
  const cards=outfitCatalog.filter(item=>item.collectible===(this.tab==='collectible'));
  $('clothes-cards').innerHTML=cards.map(item=>`<button class="clothes-card ${item.id===this.selected?'selected':''} ${item.collectible?'collectible':''}" data-outfit="${item.id}" aria-pressed="${item.id===this.selected}"><img src="./assets/outfits/${item.id}.png" alt="" loading="lazy"><b>${item.name}</b><small>${w.owned.includes(item.id)?'✓ 已收藏':item.price.toLocaleString('zh-CN')+' 饼干'}</small></button>`).join('');
  $('clothes-count').textContent=cards.filter(v=>w.owned.includes(v.id)).length+' / '+cards.length+' 套'+(this.tab==='collectible'?'典藏服装':'普通服装');
  const missing=Math.max(0,item.price-this.g.data.cookies);
  $('clothes-price').textContent=owned?'已拥有 · 换装免费':item.price.toLocaleString('zh-CN')+' 饼干';
  $('clothes-cost-note').textContent=owned?'为'+this.targetName+'挑选今天的穿搭。':missing?'还差 '+missing.toLocaleString('zh-CN')+' 饼干，营业收入可以慢慢攒。':'买一次，之后可以给不同身份的顾客换装。';
  const action=$('clothes-action');action.disabled=assigned||(!owned&&missing>0)||this.g.save.readBlocked;action.textContent=assigned?this.targetName+'正在穿':owned?'给'+this.targetName+'换上':'购买并给'+this.targetName+'换上';
  $('clothes-reset').disabled=!w.assignments[this.target];$('clothes-reset').textContent=this.target==='staff'?'恢复店员的工作围裙':'恢复这类顾客的身份服装';
 }
 select(id){if(!Object.hasOwn(outfitById,id))return;this.selected=id;this.back=false;this.render();this.audio.play('click');}
 action(){const item=this.item;if(this.g.data.wardrobe.owned.includes(item.id)){this.g.wardrobe.equip(item.id,this.target);return;}if(this.g.data.cookies<item.price)return;this.pending={id:item.id,target:this.target};$('clothes-confirm-name').textContent=item.name;$('clothes-confirm-cost').textContent=item.price.toLocaleString('zh-CN')+' 饼干';$('clothes-confirm-target').textContent='购买后给'+this.targetName+'换上，之后可随时改搭。';$('clothes-buy-confirm').showModal();}
 bind(){
  $('clothes-open').onclick=() =>this.open();$('more-clothes').onclick=()=>this.open();
  $('clothes-target').onchange=e=>{this.target=e.target.value;this.render();};
  $('clothes-cards').onclick=e=>{const button=e.target.closest('[data-outfit]');if(button)this.select(button.dataset.outfit);};
  for(const b of document.querySelectorAll('[data-clothes-tab]'))b.onclick=()=>{this.tab=b.dataset.clothesTab;const item=outfitCatalog.find(item=>item.collectible===(this.tab==='collectible'));this.select(item.id);$('clothes-scroll').scrollTop=0;};
  $('clothes-action').onclick=()=>this.action();
  $('clothes-wish').onclick=()=>{if(this.g.journal.setWish(this.g.data.journal.wish===this.selected?null:this.selected)){this.render();this.audio.play('click');}};
  $('clothes-buy-do').onclick=()=>{const pending=this.pending;if(!pending)return;this.pending=null;if(this.g.wardrobe.buy(pending.id,pending.target)){$('clothes-buy-confirm').close();this.render();}};
  $('clothes-buy-confirm').addEventListener('close',()=>{this.pending=null;});
  $('clothes-reset').onclick=()=>this.g.wardrobe.equip(null,this.target);
  $('clothes-turn').onclick=()=>{this.back=!this.back;if(this.back&&!this.item.collectible&&!this.previewCache.has(this.selected+'-back')){const url=this.getScene()?.clothesPreview(this.selected,true);if(url)this.previewCache.set(this.selected+'-back',url);}this.render();};
 }
}
