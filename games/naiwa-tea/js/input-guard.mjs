// A cancelled touch must never become a click on a newly opened page or stage.
const cancelled=new Set();let legacyUntil=0;
export function cancelPointerClick(id){if(id===null||id===undefined)return;cancelled.add(id);while(cancelled.size>8)cancelled.delete(cancelled.values().next().value);}
document.addEventListener('pointerdown',e=>{cancelled.delete(e.pointerId);legacyUntil=0;},true);
document.addEventListener('pointerup',e=>{if(!cancelled.has(e.pointerId))return;legacyUntil=performance.now()+400;setTimeout(()=>cancelled.delete(e.pointerId),500);},true);
document.addEventListener('pointercancel',e=>{setTimeout(()=>cancelled.delete(e.pointerId),500);},true);
document.addEventListener('click',e=>{if(e.isTrusted&&(cancelled.has(e.pointerId)||(e.pointerId===undefined&&performance.now()<legacyUntil))){e.preventDefault();e.stopImmediatePropagation();cancelled.delete(e.pointerId);}},true);
