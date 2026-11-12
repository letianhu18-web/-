import {decorSlots,furnitureCatalog} from './growth-data.mjs';
// Conservative furniture extents. A small clearance prevents surfaces from fighting.
const sizes={woodTable:[.84,.76,.70],doubleTable:[1.19,.76,.70],chair:[.60,1.10,.58],smallPlant:[.50,.55,.46],largePlant:[.90,1.08,.82],rug:[1.24,.06,.82],menuBoard:[.73,1.07,.25],welcome:[.73,1.07,.25],mural:[1.16,.80,.12],lamp:[.42,.51,.24],stringLights:[1.17,.51,.24],bin:[.54,.60,.54],doll:[.50,.83,.48],vase:[.34,.76,.32],frogSign:[.94,.94,.20],goldTrophy:[.51,.68,.50],flagshipStatue:[.95,1.68,.95],grannyCoaster:[.58,.07,.58],warmLamp:[.53,.67,.53],townPostcard:[1.10,.83,.24],handDrawnMenu:[1.10,.83,.24]};
export function decorSlot(id,level){const source=decorSlots.find(s=>s.id===id);if(!source)return null;const slot={...source,pos:[...source.pos]};if(id==='doorL')slot.pos=level>=4?[-2.45,0,1.65]:[-3.20,0,2.0];if(id==='counterBack'){slot.pos=[-.65,1.48,.65];slot.label='柜台中';}return slot;}
export function furnitureBox(id,slot,direction=1){const [w,h,d]=sizes[id]||[1,1,1],f=furnitureCatalog[id],p=slot.pos;const hanging=f.zone==='ceiling',wall=['wall','sign'].includes(f.zone);return {min:[p[0]-w/2,p[1]-(hanging?h:wall?h/2:0),p[2]-d/2],max:[p[0]+w/2,p[1]+(hanging?0:wall?h/2:h),p[2]+d/2]};}
export const overlaps=(a,b,pad=.035)=>a.min.every((v,i)=>v<b.max[i]+pad&&a.max[i]>b.min[i]-pad);
export function fixedObstacles(level){
 const width=level===1?4.65:level===2?5.7:6,center=level===1?-.6:level===2?-.55:-.5;
 const list=[{name:level===2?'奶茶车':'柜台',min:[center-width/2,0,-.19],max:[center+width/2,1.445,1.22]},
  {name:'顾客通道',min:[1.30,0,1.45],max:[2.68,2.6,3.85]}];
 const eq=[['茶桶',[-2.48,1.44,.22],[.66,1.05,.90]],['封口机',[1.28,1.44,.16],[.74,.88,1.48]],['奶桶',[-2.05,1.4,-1.45],[.42,.65,.60]],['珍珠锅',[-1.1,1.4,-1.45],[.58,.36,.58]],['冰块机',[.05,1.4,-1.45],[.40,.46,.70]],['配料柜',[1.08,1.4,-1.45],[.79,.48,.41]]];
 for(let i=0;i<eq.length;i++){const [name,source,size]=eq[i],p=[...source];if(level<=2&&i>=2){p[2]=-.42;p[0]=[-2.82,-1.95,.15,.65][i-2];}list.push({name,min:[p[0]-size[0]/2,p[1],p[2]-size[2]/2],max:[p[0]+size[0]/2,p[1]+size[1],p[2]+size[2]/2]});}
 if(level>=3){const half=level===3?3.9:level===4?4.4:5;list.push({name:'左墙',min:[-half-.1,0,-2.3],max:[-half+.1,4,.8]});}
 if(level>=4)list.push({name:'店内固定座位',min:[-4.22,0,1.23],max:[-3.28,1.1,2.66]});
 return list;
}
export function placementReason(data,id,slotId,uid=null,direction=1){
 const f=furnitureCatalog[id],slot=decorSlot(slotId,data.storeLevel);if(!f||!slot)return '先选一个摆放位置';if(f.level>data.storeLevel||slot.level>data.storeLevel)return '升级店铺后开放这个位置';if(slot.zone!==f.zone)return '这件家具不适合这个位置';
 const box=furnitureBox(id,slot,direction);
 for(const o of fixedObstacles(data.storeLevel))if(overlaps(box,o,.015))return '会碰到'+o.name+'，换个位置吧';
 for(const item of data.placedFurniture){if(item.uid===uid)continue;const other=decorSlot(item.slot,data.storeLevel);if(item.slot===slotId)return '这个位置已经有家具';const softLayer=(f.zone==='rug'&&other?.zone==='floor')||(f.zone==='floor'&&other?.zone==='rug');if(other&&!softLayer&&overlaps(box,furnitureBox(item.id,other,item.direction)))return '和旁边的家具太近了';}
 return '';
}
export function reconcilePlacements(data){
 const before=data.placedFurniture;data.placedFurniture=[];data.recoveredFurniture??=[];
 for(const item of before){let slot=decorSlot(item.slot,data.storeLevel);if(!slot||placementReason(data,item.id,item.slot,item.uid,item.direction)){slot=decorSlots.map(s=>decorSlot(s.id,data.storeLevel)).find(s=>!placementReason(data,item.id,s.id,item.uid,item.direction));}
  if(slot)data.placedFurniture.push({...item,slot:slot.id,x:slot.pos[0],y:slot.pos[2]});
  else if(!data.recoveredFurniture.some(p=>p.uid===item.uid))data.recoveredFurniture.push({...item,recoveryReason:'原位置拥挤，已收回仓库'});
 }
 return before.filter(p=>!data.placedFurniture.some(n=>n.uid===p.uid&&n.slot===p.slot)).length;
}
