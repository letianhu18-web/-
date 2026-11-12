// Prices are fictional in-game cookie costs, charged only when supplies are used.
export const materialCosts=Object.freeze({cup:{name:'杯子',price:1},tea:{name:'茶底',price:1},milk:{name:'牛奶',price:2},pearl:{name:'珍珠',price:1},coconut:{name:'椰果',price:1},pudding:{name:'布丁',price:2},redBean:{name:'红豆',price:2},taro:{name:'芋泥',price:3},cream:{name:'奶盖',price:3},strawberryJam:{name:'草莓酱',price:2},strawberry:{name:'草莓粒',price:2},seal:{name:'封口膜',price:1},condiments:{name:'糖冰用料',price:1}});
const n=(v,max=1e12)=>Number.isFinite(v)?Math.max(0,Math.min(max,Math.floor(v))):0;
export const freshCosts=()=>({version:1,debt:0,total:0,waste:0});
export const normalizeCosts=raw=>({version:1,debt:n(raw?.debt),total:n(raw?.total),waste:n(raw?.waste)});
export function normalizeBill(raw){return Object.fromEntries(Object.keys(materialCosts).filter(k=>n(raw?.[k],10000)>0).map(k=>[k,n(raw[k],10000)]));}
export function billTotal(bill){return Object.entries(normalizeBill(bill)).reduce((sum,[id,count])=>sum+materialCosts[id].price*count,0);}
export class OperatingCosts{
 constructor(game){this.g=game;game.costs=this;}
 credit(amount){const s=this.g.data;s.cookies+=amount;const paid=Math.min(s.cookies,s.operatingCosts.debt);s.cookies-=paid;s.operatingCosts.debt-=paid;return amount-paid;}
 use(id){
  const g=this.g,c=g.current,d=g.drink;if(!c||!d||!g.day||g.day.status!=='open'||!Object.hasOwn(materialCosts,id))return 0;
  d.costBill??={};if(id!=='cup'&&!d.costBill.cup)this.use('cup');
  if((id==='cup'||id==='condiments')&&d.costBill[id])return 0;
  const cost=materialCosts[id].price,s=g.data;d.costBill[id]=(d.costBill[id]||0)+1;c.orderCost=(c.orderCost||0)+cost;
  g.day.materialCost=(g.day.materialCost||0)+cost;g.day.income-=cost;s.operatingCosts.total+=cost;
  const paid=Math.min(s.cookies,cost);s.cookies-=paid;s.operatingCosts.debt+=cost-paid;
  g.emit('costChanged');return cost;
 }
 discard(){const cost=billTotal(this.g.drink?.costBill);this.g.data.operatingCosts.waste+=cost;this.g.day.wasteCost=(this.g.day.wasteCost||0)+cost;return cost;}
}
