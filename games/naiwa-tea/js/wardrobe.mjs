import {outfitById,wardrobeTargets,normalizeWardrobe} from './wardrobe-data.mjs';
export class WardrobeSystem {
 constructor(game){this.g=game;game.wardrobe=this;}
 validTarget(target){return wardrobeTargets.some(item=>item.id===target);}
 editable(){return !this.g.save.readBlocked&&this.g.growth.guard()&&!this.g.growth.decorating;}
 changed(kind,id,target){this.g.persist();this.g.emit('wardrobeChanged',{kind,id,target});}
 buy(id,target){
  const item=Object.hasOwn(outfitById,id)?outfitById[id]:null;
  if(!item||!this.validTarget(target)||!this.editable())return false;
  const w=this.g.data.wardrobe=normalizeWardrobe(this.g.data.wardrobe);
  if(w.owned.includes(id))return false;
  if(!this.g.growth.spend(item.price))return false;
  w.owned.push(id);w.assignments[target]=id;this.changed('purchase',id,target);return true;
 }
 equip(id,target){
  if(!this.validTarget(target)||!this.editable())return false;
  const item=id&&Object.hasOwn(outfitById,id)?outfitById[id]:null,w=this.g.data.wardrobe=normalizeWardrobe(this.g.data.wardrobe);
  if(id&&(!item||!w.owned.includes(id)))return false;
  if(w.assignments[target]===(id||null))return false;
  w.assignments[target]=id||null;this.changed('equip',id||null,target);return true;
 }
}
