import {drinkRecipes} from './data.mjs';
import {outfitById} from './wardrobe-data.mjs';

export const stampTiers=Object.freeze([
 {cups:3,name:'初试茶香',mark:'芽'},
 {cups:12,name:'渐渐拿手',mark:'叶'},
 {cups:30,name:'小店招牌',mark:'花'},
 {cups:60,name:'岁月茶匠',mark:'冠'}
]);
const number=(v,max=1e12)=>Number.isFinite(v)?Math.max(0,Math.min(max,Math.floor(v))):0;
const availableOutfit=id=>typeof id==='string'&&Object.hasOwn(outfitById,id);
export function normalizeJournal(raw={},day=1){
 const j=raw&&typeof raw==='object'?raw:{};
 return {wish:availableOutfit(j.wish)?j.wish:null,day:number(j.day,day),
  counts:Object.fromEntries(Object.keys(drinkRecipes).map(id=>[id,number(j.counts?.[id],14)])),
  orderIds:[...new Set((Array.isArray(j.orderIds)?j.orderIds:[]).filter(id=>typeof id==='string'&&/^\d+-\d+$/.test(id)))].slice(-14)};
}
export function recipeStamp(data,id){
 const count=number(data.stats.recipes[id]);
 const earned=stampTiers.filter(t=>count>=t.cups);
 return {id,count,earned,next:stampTiers.find(t=>count<t.cups)||null};
}
export class JournalSystem{
 constructor(game){this.g=game;game.journal=this;}
 get state(){return this.g.data.journal;}
 setWish(id){
  const g=this.g;if(g.save.readBlocked||g.phase!=='idle'||g.busy||g.growth.decorating)return false;
  if(id!==null&&(!availableOutfit(id)||g.data.wardrobe.owned.includes(id)))return false;
  if(this.state.wish===id)return false;
  this.state.wish=id;g.persist();g.emit('journalChanged');return true;
 }
 wish(){
  const id=this.state.wish;if(!availableOutfit(id))return null;
  const item=outfitById[id],owned=this.g.data.wardrobe.owned.includes(id),balance=this.g.data.cookies;
  return {...item,owned,missing:owned?0:Math.max(0,item.price-balance),saved:Math.min(item.price,balance)};
 }
 nearestStamp(){
  return this.g.data.unlocked.map(id=>recipeStamp(this.g.data,id)).filter(p=>p.next)
   .sort((a,b)=>(a.next.cups-a.count)-(b.next.cups-b.count))[0]||null;
 }
 record(c){
  const g=this.g,j=this.state;if(j.day!==g.data.day){j.day=g.data.day;j.counts={};j.orderIds=[];}
  if(j.orderIds.includes(c.id))return null;
  j.orderIds.push(c.id);j.counts[c.recipe]=(j.counts[c.recipe]||0)+1;
  const p=recipeStamp(g.data,c.recipe),earned=stampTiers.find(t=>t.cups===p.count);
  return earned?{recipe:c.recipe,name:earned.name,mark:earned.mark}:null;
 }
 today(){return this.state.day===this.g.data.day?Object.entries(this.state.counts).filter(([,n])=>n>0):[];}
}
