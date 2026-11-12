import {ICE,iceUnits,iceAssessment,guideStep} from './craft-data.mjs';
export class HandcraftSystem{
 constructor(g){this.g=g;this.pointer=null;this.accumulator=0;this.limitNotified=false;}
 get held(){return this.pointer!==null;}
 get teaching(){return Boolean(this.g.current&&(this.g.current.tutorial||this.g.current.iceGuide));}
 allowed(type){const step=guideStep(this.g.current);return !step||step===type||(step==='ice'&&['ice','removeIce'].includes(type));}
 attach(c,restored=false){const t=this.g.data.tutorialState;if(c.tutorial){c.guideStep=c.guideStep||'tea';if(restored&&c.drink?.manualIce&&iceAssessment(c,c.drink).correct)c.guideStep='pearl';return;}if(!restored&&!t.iceGuideDone&&c.ice>0&&!c.drink.sealed){c.iceGuide=true;c.guideStep='ice';}if(!t.seenIceOrders.includes(c.ice)){t.seenIceOrders.push(c.ice);c.firstIceHint=true;} }
 start(pointer){const g=this.g;if(this.held||g.paused||g.phase!=='making'||g.drink?.sealed||!this.allowed('ice')||g.drink?.pendingIngredients?.includes('seal'))return false;this.pointer=pointer;this.accumulator=0;this.limitNotified=false;this.addIce();return true;}
 tick(dt){if(!this.held)return;if(this.g.paused||this.g.phase!=='making'||this.g.drink?.sealed){this.stop();return;}this.accumulator+=Math.min(Math.max(0,dt),ICE.interval);while(this.held&&this.accumulator+1e-8>=ICE.interval){this.accumulator-=ICE.interval;this.addIce();}}
 addIce(){const g=this.g,d=g.drink;if(!d||g.phase!=='making'||g.paused||d.sealed||!this.allowed('ice'))return false;if(iceUnits(d)>=ICE.max){if(!this.limitNotified){g.emit('notice',{message:'冰块已经够满啦，试试冰夹～'});this.limitNotified=true;}this.stop();return false;}d.iceUnits=iceUnits(d)+1;g.costs.use('condiments');d.manualIce=true;d.ice=d.iceUnits<=5?1:2;g.current.operated=true;g.emit('iceAdded',{index:d.iceUnits-1});g.persist();return true;}
 stop(pointer=null){if(pointer!==null&&pointer!==this.pointer)return false;const had=this.held;this.pointer=null;this.accumulator=0;if(had){this.checkGuide();this.g.persist();}return had;}
 removeIce(){const g=this.g,d=g.drink;if(g.paused||g.phase!=='making'||!d||d.sealed||d.pendingIngredients?.includes('seal')||!iceUnits(d)||!this.allowed('removeIce'))return false;this.stop();d.iceUnits=iceUnits(d)-1;d.ice=d.iceUnits===0?0:d.iceUnits<=5?1:2;d.manualIce=true;g.data.craftStats.corrections++;g.emit('iceRemoved');this.checkGuide();g.persist();return true;}
 checkGuide(){const g=this.g,c=g.current;if(!c||guideStep(c)!=='ice')return;const a=iceAssessment(c,c.drink);if(a.correct){c.guideStep=c.tutorial?'pearl':'tea';c.iceGuide=false;g.data.tutorialState.iceGuideDone=true;g.emit('guideChanged');}else g.emit('notice',{message:a.direction==='多'?'多了一点，试试冰夹。':'还可以加一点。'});}
}
