import {SAVE_KEY,freshSave} from './data.mjs';
export const SAVE_BACKUP=SAVE_KEY+'.backup',SAVE_PREVIOUS=SAVE_KEY+'.previous';
const keys=[SAVE_KEY,SAVE_BACKUP,SAVE_PREVIOUS];
const revision=raw=>Number.isSafeInteger(raw?.saveMeta?.revision)&&raw.saveMeta.revision>0?raw.saveMeta.revision:0;
const fingerprint=text=>{let n=2166136261;for(let i=0;i<text.length;i++)n=Math.imul(n^text.charCodeAt(i),16777619);return(text.length+':'+(n>>>0).toString(16));};
const uid=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
const bodyOf=data=>JSON.stringify({...data,saveMeta:undefined});
export class ResilientSave{
 constructor(storage,{openVault,now=()=>Date.now()}={}){this.storage=storage;this.openVault=openVault;this.now=now;this.writer=uid();this.revision=0;this.available=true;this.lastError='';this.listeners=new Set();this.vaultRecords={};this.vaultHead=null;this.localOk=false;this.mirrorOk=false;this.loaded=false;}
 onChange(fn){this.listeners.add(fn);return()=>this.listeners.delete(fn);}
 notify(){this.available=!this.readBlocked&&!this.conflict&&(this.localOk||this.mirrorOk);for(const fn of this.listeners)fn(this);}
 async prepare(){
  if(!this.openVault)return;
  try{this.vault=await this.openVault();this.vaultRecords=await this.vault.read();this.vaultHead=this.vaultRecords.current?.token||null;this.vaultRead=true;}catch{this.vault?.close();this.vault=null;this.mirrorFailed=true;}
 }
 localEntries(){const entries=[],errors=[];for(const key of keys){try{if(!this.storage)throw Error('本机存储不可用');const text=this.storage.getItem(key);if(text)entries.push({key,text});}catch{errors.push(key);}}return{entries,errors};}
 parse(entry,validate=false){try{const raw=JSON.parse(entry.text);this.check(raw);const data=validate?this.validate(raw):raw;return{...entry,raw,data,revision:revision(raw),signature:fingerprint(entry.text)};}catch{return null;}}
 newest(entries){return entries.filter(Boolean).sort((a,b)=>b.revision-a.revision||(b.key==='vault:current'&&b.revision?1:0)-(a.key==='vault:current'&&a.revision?1:0))[0]||null;}
 localHead(entries=this.localEntries().entries){return this.newest(entries.map(e=>this.parse(e)));}
 future(entries){return entries.some(e=>{if([SAVE_PREVIOUS,'vault:previous'].includes(e.key))return false;try{const r=JSON.parse(e.text);return Number.isFinite(r?.version)&&r.version>4;}catch{return false;}});}
 preserve(key,text){try{if(text&&!this.storage.getItem(key))this.storage.setItem(key,text);}catch{}}
 load(){
  const local=this.localEntries(),all=[...local.entries,...['current','previous'].flatMap(k=>this.vaultRecords[k]?.text?[{key:'vault:'+k,text:this.vaultRecords[k].text}]:[])];
  this.loaded=true;this.localObserved=this.localHead(local.entries)?.signature||null;this.originalText=local.entries.find(e=>e.key===SAVE_KEY)?.text||all[0]?.text;
  if(this.future(all)){this.readBlocked=true;this.lastError='这份存档来自较新版本，已保留原文件。请更新页面后重新读取。';this.notify();return freshSave();}
  let found=this.newest(all.map(e=>this.parse(e,true)));
  if(!found){for(const key of [SAVE_KEY+'.before-v5',SAVE_KEY+'.before-v4',SAVE_KEY+'.before-import']){try{const text=this.storage?.getItem(key),entry=text&&this.parse({key,text},true);if(entry){found=entry;break;}}catch{}}}
  if(!found&&(all.length||local.errors.length&&!this.vaultRead)){
   this.readBlocked=true;this.lastError='本机存档暂时无法读取，原文件已保留。请重试读取，或导入备份。';this.notify();return freshSave();
  }
  if(!found){this.localOk=local.errors.length===0;this.mirrorOk=this.vaultRead===true;this.notify();return freshSave();}
  this.revision=found.revision;this.lastSnapshot=found.text;this.originalText=found.text;this.lastBody=bodyOf(found.data);this.lastSavedAt=found.raw.saveMeta?.savedAt||0;
  this.localOk=local.entries.some(e=>e.text===found.text);this.mirrorOk=this.vaultRecords.current?.text===found.text;
  if(found.key!==SAVE_KEY&&local.entries.find(e=>e.key===SAVE_KEY)?.text!==found.text){
   this.recoveryNotice='已从本机备份找回 DAY '+found.data.day+' 的进度。';const bad=local.entries.find(e=>e.key===SAVE_KEY);if(bad&&!this.parse(bad,true))this.preserve(SAVE_KEY+'.damaged',bad.text);
  }
  if(found.raw.version<4||found.raw.presentationVersion!==5)this.preserve(SAVE_KEY+'.before-v5',found.text);
  this.notify();return found.data;
 }
 markConflict(){this.conflict=true;this.lastError='另一页已保存更新的进度。本页已暂停，请重新载入后继续。';this.notify();return false;}
 inspectExternal(replacing=false){
  if(!this.loaded||this.readBlocked||this.conflict)return !this.conflict;
  const local=this.localEntries();if(!replacing&&this.future(local.entries))return this.markConflict();const head=this.localHead(local.entries);
  if(head&&head.signature!==this.localObserved)return this.markConflict();return true;
 }
 write(key,text){try{if(!this.storage)throw Error();this.storage.setItem(key,text);return this.storage.getItem(key)===text;}catch{return false;}}
 save(data,{replace=false,archiveText=null}={}){
  if(!this.loaded)this.load();if(this.readBlocked||this.conflict||!this.inspectExternal(replace))return false;
  let body;try{this.check(data);body=bodyOf(data);}catch{this.lastError='本次进度没有写入，上一份存档仍保留。请先导出备份。';this.localOk=this.mirrorOk=false;this.notify();return false;}
  if(!replace&&body===this.lastBody&&this.localOk&&(!this.vault||this.mirrorOk)&&this.revision>0)return true;
  const meta={revision:++this.revision,savedAt:this.now(),writer:this.writer,id:uid()},text=JSON.stringify({...data,saveMeta:meta}),record={text,revision:meta.revision,token:meta.id};
  if(replace)this.write(SAVE_PREVIOUS,text);else if(this.lastSnapshot)this.write(SAVE_PREVIOUS,this.lastSnapshot);
  const backup=this.write(SAVE_BACKUP,text),primary=this.write(SAVE_KEY,text);this.localOk=backup||primary;this.mirrorOk=false;
  this.localObserved=this.localHead()?.signature||null;this.lastBody=body;this.lastSnapshot=text;this.originalText=text;this.pendingSnapshot=this.localOk?null:text;
  if(this.localOk){this.lastSavedAt=meta.savedAt;this.lastError='';}else this.lastError=this.vault?'正在保存本机备份，请稍等。':'暂时无法保存，请保留页面并导出存档备份。';
  if(this.vault){this.pendingMirror={record,replace,archiveText};this.startMirror();}this.notify();return this.localOk||!!this.vault;
 }
 startMirror(){
  if(this.mirrorWork)return;this.mirrorWork=this.drainMirror().finally(()=>{this.mirrorWork=null;this.notify();});
 }
 async drainMirror(){
  while(this.pendingMirror&&!this.conflict){const {record,replace,archiveText}=this.pendingMirror;this.pendingMirror=null;
   try{await this.vault.commit(record,this.vaultHead,{replace,archiveText});this.vaultHead=record.token;this.mirrorFailed=false;
    if(record.text===this.lastSnapshot){this.mirrorOk=true;this.lastSavedAt=JSON.parse(record.text).saveMeta.savedAt;this.pendingSnapshot=null;this.lastError='';}
   }catch(error){this.mirrorFailed=true;if(error.code==='SAVE_CONFLICT'){this.pendingMirror=null;this.markConflict();break;}if(record.text===this.lastSnapshot&&!this.localOk)this.lastError='暂时无法保存，请保留页面并导出存档备份。';}
   this.notify();
  }
 }
 async flush(){while(this.mirrorWork)await this.mirrorWork;return this.available;}
 async retry(data){
  if(this.readBlocked||this.conflict)return false;
  if(this.openVault&&(!this.vault||this.mirrorFailed)){
   try{this.vault?.close();const vault=await this.openVault(),records=await vault.read();if(records.current&&records.current.token!==this.vaultHead&&records.current.text!==this.lastSnapshot&&records.current.revision>=this.revision){vault.close();return this.markConflict();}this.vault=vault;this.vaultHead=records.current?.token||null;this.mirrorFailed=false;}catch{this.vault=null;}
  }
  this.save(data);return this.flush();
 }
 importData(data,current){
  this.check(data);if(this.conflict)throw Error('请先重新载入最新进度');
  const previous=this.readBlocked&&this.originalText?this.originalText:JSON.stringify(current);if(!this.write(SAVE_KEY+'.before-import',previous)&&!this.vault)throw Error('原进度暂时无法备份');
  this.readBlocked=false;this.loaded=true;this.localObserved=this.localHead()?.signature||null;
  this.revision=Math.max(this.revision,this.localHead()?.revision||0,this.vaultRecords.current?.revision||0);this.lastBody=null;
  if(!this.save(data,{replace:true,archiveText:previous}))throw Error(this.lastError);return true;
 }
 reset(){
  if(this.conflict)throw Error('请先重新载入最新进度');const data=freshSave();if(this.originalText)this.preserve(SAVE_KEY+'.before-reset',this.originalText);
  this.readBlocked=false;this.loaded=true;this.localObserved=this.localHead()?.signature||null;this.revision=Math.max(this.revision,this.localHead()?.revision||0,this.vaultRecords.current?.revision||0);this.lastBody=null;
  if(!this.save(data,{replace:true,archiveText:this.originalText}))throw Error(this.lastError);return data;
 }
}
