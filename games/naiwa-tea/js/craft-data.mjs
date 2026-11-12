// All screens and equipment use this one normalized ice scale.
export const ICE={unitPercent:5,max:12,interval:.18,targets:[0,4,8]};
export const iceUnits=d=>Math.max(0,Math.min(ICE.max,Math.floor(Number(d?.iceUnits??ICE.targets[d?.ice]??0))));
export function iceAssessment(order,d){const target=ICE.targets[order.ice]??4,units=iceUnits(d),distance=Math.abs(units-target);const points=target===0?(units===0?15:units===1?8:0):distance<=1?15:distance===2?10:distance===3?5:0;return{target,units,points,correct:points===15,direction:units>target?'多':'少'};}
export const freshCraft=()=>({tutorialState:{version:4,iceGuideDone:false,guidedCupCount:0,referenceHintEnabled:false,seenIceOrders:[],legacy:false},craftStats:{manualCorrect:0,firstManual:false,corrections:0,acceptedIngredients:0},rewardLedger:{}});
export function guideStep(c){if(!c?.tutorial&&!c?.iceGuide)return null;if(!c.accepted)return 'order';if(c.iceGuide)return 'ice';const d=c.drink;if(!d.tea)return 'tea';if(!d.milk)return 'milk';if(d.sugar!==70)return 'sugar';if(c.guideStep!=='pearl'&&c.guideStep!=='done')return 'ice';if(!d.toppings.includes('pearl'))return 'pearl';return d.sealed?'shake':'seal';}
export const guideText={order:'学生点了珍珠奶茶 · 七分糖 · 少冰，点订单接下它',ice:'按住冰盒，加到杯身约两成后松手～',tea:'点茶桶，先倒茶～',milk:'再加牛奶，颜色慢慢变柔和',sugar:'糖浆泵，选七分糖～',pearl:'点珍珠盒，这一勺就进杯子了',seal:'封好它，然后左右摇起来！',shake:'左右来回，亲手摇匀这杯奶茶'};
