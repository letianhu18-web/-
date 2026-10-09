const $=id=>document.getElementById(id);
export class SupportUI{
 constructor(g,audio){this.g=g;this.audio=audio;this.timer=null;this.returnTo=null;this.expanded=false;this.animation=null;this.bind();}
 cancelPending(){if(this.timer!==null)clearTimeout(this.timer);this.timer=null;}
 schedule(){
  this.cancelPending();const g=this.g,moment=g.support.candidate;
  if(!moment||!g.support.canPrompt()||document.hidden)return false;
  this.timer=setTimeout(()=>{this.timer=null;
   if(document.hidden||g.phase!=='summary'||g.day?.day!==moment.day||!$('summary').open)return;
   if([...document.querySelectorAll('dialog[open]')].some(d=>d.id!=='summary'))return;
   if(g.support.claim(moment))this.open(true,moment);
  },1400);
  return true;
 }
 setExpanded(open,animate=true){
  const panel=$('support-disclosure'),button=$('support-reveal'),height=panel.getBoundingClientRect().height;this.animation?.cancel();this.animation=null;this.expanded=open;
  panel.inert=!open;panel.setAttribute('aria-hidden',String(!open));button.setAttribute('aria-expanded',String(open));button.querySelector('span').textContent=open?'收起赞赏码':'看看赞赏码';
  const target=open?panel.scrollHeight:0;panel.style.height=target+'px';
  const finish=()=>{panel.style.height=open?'auto':'0px';if(open&&$('support-page').open)$('support-qr-image').scrollIntoView({block:'nearest',behavior:'instant'});};
  if(!animate||this.g.data.settings.lowEffects||matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}
  const animation=panel.animate([{height:height+'px'},{height:target+'px'}],{duration:220,easing:'cubic-bezier(.2,.75,.25,1)'});this.animation=animation;
  animation.onfinish=()=>{if(this.animation===animation){this.animation=null;finish();}};
 }
 open(automatic=false,moment=null){
  this.cancelPending();if($('support-page').open)return;
  this.returnTo=automatic?'summary':$('settings').open?'settings':this.g.phase==='summary'?'summary':null;
  if(this.returnTo==='settings')$('settings').close();
  if(!automatic)this.g.support.noteVisit();
  $('support-highlight').hidden=!moment;
  if(moment){const title={net:'单日净收益，记下新高！',combo:'连完美纪录刷新啦！',perfect:'今天，每一杯都是五星',great:'今天的好评攒满啦'}[moment.kind];
   $('support-achievement').textContent=title;
   $('support-achievement-value').textContent=moment.kind==='net'?`${moment.value} 🍪 · 比此前记录多 ${moment.value-moment.previous}`:moment.kind==='combo'?`连续 ${moment.value} 杯完美奶茶`:`${moment.value} 杯五星奶茶，都是你亲手做的`;
  }
  $('support-intro').textContent=automatic?'如果这一轮玩得开心，可以请奶娃喝杯奶茶，支持作者继续做下去。':'喜欢这家小店的话，可以请奶娃喝杯奶茶，支持作者继续做下去。';
  $('support-mute').checked=this.g.support.muted;
  $('support-close').textContent=this.returnTo==='settings'?'返回小店设置':this.returnTo==='summary'?'回到今日结算':'继续经营';
  this.setExpanded(false,false);$('support-page').classList.toggle('low-motion',this.g.data.settings.lowEffects===true);$('support-page').showModal();
  $('support-page').scrollTop=0;$('support-scroll').scrollTop=0;
  if(!automatic)this.setExpanded(true,false);
 }
 bind(){
  $('support-open').onclick=()=>{this.audio.play('click');this.open();};
  $('support-reveal').onclick=()=>{this.audio.play('click');this.setExpanded(!this.expanded);};
  $('support-mute').onchange=e=>this.g.support.setMuted(e.target.checked);
  $('support-page').addEventListener('close',()=>{
   if($('support-page').open)return;this.animation?.cancel();this.animation=null;const parent=this.returnTo;this.returnTo=null;
   if(parent==='settings'){$('settings').showModal();$('support-open').focus({preventScroll:true});}
   else if(parent==='summary'&&this.g.phase==='summary')$('continue').focus({preventScroll:true});
  });
  $('support-qr-image').addEventListener('error',()=>{$('support-qr-error').hidden=false;$('support-qr-image').hidden=true;$('support-download').hidden=true;});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)this.cancelPending();});
  this.g.on(e=>{if(e.type==='phase'&&e.phase!=='summary')this.cancelPending();});
 }
}
