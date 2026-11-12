// A separate browser database. A write counts only after its transaction commits.
export const VAULT_NAME='naiwa.teashop.saves.v1';
const conflict=()=>Object.assign(new Error('另一页已经更新了存档'),{code:'SAVE_CONFLICT'});
export async function openSaveVault(factory=globalThis.indexedDB){
 if(!factory)throw Error('本机备份不可用');
 const db=await new Promise((resolve,reject)=>{
  let done=false,request;const timer=setTimeout(()=>finish(Error('本机备份读取超时')),5000);
  const finish=(error,result)=>{if(done){result?.close();return;}done=true;clearTimeout(timer);error?reject(error):resolve(result);};
  try{request=factory.open(VAULT_NAME,1);}catch(error){finish(error);return;}
  request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('snapshots'))request.result.createObjectStore('snapshots');};
  request.onsuccess=()=>finish(null,request.result);request.onerror=()=>finish(request.error||Error('本机备份打不开'));
 });
 db.onversionchange=()=>db.close();
 const transaction=(mode,action)=>new Promise((resolve,reject)=>{
  let tx,result,error,timer;try{try{tx=db.transaction('snapshots',mode,{durability:'strict'});}catch{tx=db.transaction('snapshots',mode);}
   timer=setTimeout(()=>{error=Error('本机备份写入超时');try{tx.abort();}catch{}reject(error);},5000);
   tx.oncomplete=()=>{clearTimeout(timer);resolve(result);};tx.onabort=tx.onerror=()=>{clearTimeout(timer);reject(error||tx.error||Error('本机备份未完成'));};
   action(tx.objectStore('snapshots'),value=>{result=value;},reason=>{error=reason;tx.abort();});
  }catch(reason){clearTimeout(timer);try{tx?.abort();}catch{}reject(reason);}
 });
 return{
  read:()=>transaction('readonly',(store,done)=>{const values={};for(const key of ['current','previous']){const r=store.get(key);r.onsuccess=()=>{values[key]=r.result||null;if(Object.keys(values).length===2)done(values);};}}),
  commit:(record,expected,{replace=false,archiveText=null}={})=>transaction('readwrite',(store,done,abort)=>{const r=store.get('current');r.onsuccess=()=>{
   const current=r.result||null;if(current?.token===record.token){done(record);return;}
   if((current?.token||null)!==expected){abort(conflict());return;}
   if(current&&!replace)store.put(current,'previous');else if(replace){store.put(record,'previous');if(archiveText)store.put({text:archiveText},'before-replace');}
   store.put(record,'current');done(record);
  };}),
  close:()=>db.close()
 };
}
