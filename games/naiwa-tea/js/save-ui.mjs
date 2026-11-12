const $=id=>document.getElementById(id);
export class SaveUI{
 constructor(save,game,ui,onStateChange){this.save=save;this.game=game;this.ui=ui;this.onStateChange=onStateChange;this.wasBlocked=false;
  save.onChange(()=>this.render());$('save-retry').onclick=()=>this.retry();$('save-alert-retry').onclick=()=>this.retry();$('save-alert-export').onclick=()=>$('save-export').click();this.render();
 }
 render(){
  const s=this.save,blocked=!!(s.conflict||s.readBlocked),pending=!!s.mirrorWork&&!s.localOk&&!s.mirrorOk,failed=!s.available&&!pending;
  let message=blocked?s.lastError:pending?'正在保存本机备份…':failed?s.lastError||'暂时无法保存，请先导出存档。':s.localOk&&s.mirrorOk?'进度已保存 · 本机备份已同步':s.localOk?'进度已保存 · 浏览器本地存档':'进度已保存 · 本机备份';
  if(s.available&&s.lastSavedAt)message+=' · '+new Date(s.lastSavedAt).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'});
  $('save-note').textContent=message;$('save-retry').hidden=!blocked&&!failed&&!s.mirrorFailed;$('save-retry').textContent=blocked?'重新读取存档':'重试保存进度';
  $('save-alert').hidden=!blocked&&!failed;$('save-alert-text').textContent=blocked?s.lastError:'保存还没有成功，请保留页面或先导出备份。';$('save-alert-retry').textContent=blocked?'重新载入':'重试保存';
  if(blocked!==this.wasBlocked){this.wasBlocked=blocked;this.onStateChange();if(blocked){this.ui.toastTimer=0;this.ui.els.toast.hidden=true;this.ui.ready=false;this.ui.render();}}
 }
 async retry(){if(this.save.conflict||this.save.readBlocked){location.reload();return;}
  $('save-retry').disabled=$('save-alert-retry').disabled=true;
  try{const ok=await this.save.retry(this.game.data);this.ui.toast(ok?'进度已保存':'暂时还没保存成功，可以先导出备份',3);}finally{$('save-retry').disabled=$('save-alert-retry').disabled=false;this.render();}
 }
}
