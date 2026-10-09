export const SUPPORT_POLICY_KEY='naiwa.teashop.supportPrompt.v1';
export const SUPPORT_COOLDOWN=7*24*60*60*1000;
const n=(v,max=1e12)=>Number.isFinite(v)?Math.max(0,Math.min(max,Math.floor(v))):0;
export const freshSupport=()=>({version:1,muted:false,initialized:false,bestNet:0,bestCombo:0,lastRecordedDay:0,lastShownCompleted:0,lastShownAt:0,autoShows:0});
export function normalizeSupport(raw,data){
 const s=freshSupport();s.muted=raw?.muted===true;s.initialized=raw?.initialized===true;s.bestNet=n(raw?.bestNet);s.bestCombo=raw? n(raw.bestCombo):n(data?.highestCombo);
 s.lastRecordedDay=n(raw?.lastRecordedDay,99999);s.lastShownCompleted=n(raw?.lastShownCompleted,99999);s.lastShownAt=n(raw?.lastShownAt,1e13);s.autoShows=n(raw?.autoShows,99999);return s;
}
// Timing is a local presentation preference. It never grants items or asserts payment.
export class SupportSystem{
 constructor(g){this.g=g;g.support=this;this.candidate=null;}
 get state(){return this.g.data.support;}
 policy(){try{const p=JSON.parse(this.g.save.storage?.getItem(SUPPORT_POLICY_KEY)||'{}');return{muted:p?.muted===true,lastShownAt:n(p?.lastShownAt,1e13)};}catch{return{muted:false,lastShownAt:0};}}
 get muted(){return this.state.muted||this.policy().muted;}
 storePolicy(p){try{this.g.save.storage?.setItem(SUPPORT_POLICY_KEY,JSON.stringify(p));}catch{}}
 setMuted(value){this.state.muted=value===true;this.storePolicy({...this.policy(),muted:this.state.muted});if(this.state.muted)this.clear();this.g.persist();}
 clear(){this.candidate=null;}
 canPrompt(now=Date.now()){
  const g=this.g,s=this.state,p=this.policy();
  if(g.save.readBlocked||s.muted||p.muted||g.data.stats.days<3||g.data.stats.cups<15)return false;
  const last=Math.max(s.lastShownAt,p.lastShownAt);
  if(last&&(now-last<SUPPORT_COOLDOWN||g.data.stats.days-s.lastShownCompleted<7))return false;
  return true;
 }
 recordDay(now=Date.now()){
  const g=this.g,a=g.day,s=this.state;this.clear();
  if(!a||a.status!=='summary'||a.served<a.goal||s.lastRecordedDay>=a.day)return null;
  const previousNet=s.bestNet,previousCombo=s.bestCombo,initialized=s.initialized;
  const delivered=g.journal.today().reduce((sum,[,count])=>sum+count,0),average=a.ratingSum/Math.max(1,a.served);
  let reason=null;
  if(delivered>=5&&a.income>0&&average>=4){
   if(initialized&&a.income>=previousNet+20)reason={kind:'net',value:a.income,previous:previousNet};
   else if(a.maxCombo>=5&&a.maxCombo>previousCombo)reason={kind:'combo',value:a.maxCombo,previous:previousCombo};
   else if(a.perfect===a.goal)reason={kind:'perfect',value:a.perfect};
   else if(a.perfect>=Math.ceil(a.goal*.8)&&average>=4.5)reason={kind:'great',value:a.perfect};
  }
  s.bestNet=Math.max(previousNet,n(a.income));s.bestCombo=Math.max(previousCombo,n(a.maxCombo));s.lastRecordedDay=a.day;s.initialized=true;
  if(reason&&this.canPrompt(now))this.candidate={day:a.day,completed:g.data.stats.days,...reason};
  return this.candidate;
 }
 claim(moment,now=Date.now()){
  const g=this.g;if(!moment||moment!==this.candidate||g.phase!=='summary'||g.day?.day!==moment.day||g.day.status!=='summary'||!this.canPrompt(now))return false;
  this.noteVisit(true,now);this.clear();return true;
 }
 noteVisit(automatic=false,now=Date.now()){
  const s=this.state,p=this.policy();s.lastShownAt=Math.max(n(now,1e13),s.lastShownAt,p.lastShownAt);s.lastShownCompleted=this.g.data.stats.days;if(automatic)s.autoShows++;
  this.storePolicy({...p,lastShownAt:s.lastShownAt});this.g.persist();
 }
}
