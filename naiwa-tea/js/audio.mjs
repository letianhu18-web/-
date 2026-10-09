// Put replacement audio URLs here. Empty entries use quiet procedural sounds.
export const audioAssets = { click:null,tea:null,milk:null,pearl:null,seal:null,shake:null,perfect:null,happy:null,cookies:null,dayEnd:null,wrong:null,sugar:null,ice:null,iceRemove:null,coconut:null,pudding:null,redBean:null,taro:null,cream:null,strawberry:null,strawberryJam:null,unlock:null,combo:null,fiveStar:null,badReview:null,lucky:null,upgrade:null,build:null,sealPerfect:null,pourFinish:null,rain:null,tap:null };
export class AudioManager {
  constructor() {this.enabled=true;this.ctx=null;this.last=new Map();this.voices=0;this.maxVoices=10;this.sources=new Set();this.samples=new Map();this.buffers=new Map();}
  unlock() {
    if(!this.enabled)return;
    try {
      if(!this.ctx){const C=globalThis.AudioContext||globalThis.webkitAudioContext;if(!C)return;this.ctx=new C();this.master=this.ctx.createGain();this.master.gain.value=.22;const c=this.ctx.createDynamicsCompressor();c.threshold.value=-16;c.ratio.value=8;this.master.connect(c);c.connect(this.ctx.destination);}
      if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{});
    }catch{}
  }
  tone(freq,time=.12,type='sine',offset=0,volume=.3,end=null,priority=false) {
    if(!this.ctx||this.voices>=this.maxVoices-(priority?0:2))return;
    const t=this.ctx.currentTime+offset,o=this.ctx.createOscillator(),g=this.ctx.createGain();this.voices++;
    o.type=type;o.frequency.setValueAtTime(freq,t);if(end)o.frequency.exponentialRampToValueAtTime(end,t+time);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(volume,t+.008);g.gain.exponentialRampToValueAtTime(.001,t+time);
    o.connect(g);g.connect(this.master);this.sources.add(o);o.start(t);o.stop(t+time+.02);o.onended=()=>{this.sources.delete(o);this.voices--;o.disconnect();g.disconnect();};
  }
  noise(duration=.2,freq=900,volume=.1) {
    if(!this.ctx||this.voices>=this.maxVoices-2)return;
    const key=duration;let b=this.buffers.get(key);if(!b){b=this.ctx.createBuffer(1,Math.ceil(this.ctx.sampleRate*duration),this.ctx.sampleRate);const a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=(Math.random()*2-1);this.buffers.set(key,b);}
    const s=this.ctx.createBufferSource(),f=this.ctx.createBiquadFilter(),g=this.ctx.createGain(),t=this.ctx.currentTime;s.buffer=b;f.type='lowpass';f.frequency.value=freq;g.gain.setValueAtTime(volume,t);g.gain.exponentialRampToValueAtTime(.001,t+duration);s.connect(f);f.connect(g);g.connect(this.master);this.voices++;this.sources.add(s);s.start();s.onended=()=>{this.sources.delete(s);this.voices--;s.disconnect();f.disconnect();g.disconnect();};
  }
  tap(){if(!this.enabled)return;this.unlock();if(!this.ctx)return;const now=this.ctx.currentTime;if(now-(this.last.get('tap')??-10)<.03)return;this.last.set('tap',now);this.tone(760,.045,'sine',0,.24,490,true);}
  play(name) {
    if(!this.enabled)return;this.unlock();if(!this.ctx)return;
    const now=this.ctx.currentTime;if(name==='click'&&now-(this.last.get('tap')??-10)<.25)return;const interval=name==='shake'?.085:name==='click'?.075:.16;
    if(now-(this.last.get(name)??-10)<interval)return;this.last.set(name,now);
    const url=audioAssets[name];
    if(url){let a=this.samples.get(name);if(!a){a=new Audio(url);a.volume=.25;this.samples.set(name,a);}a.currentTime=0;a.play().catch(()=>{});return;}
    name=({upgrade:'perfect',build:'seal',sealPerfect:'happy',pourFinish:'click',sugar:'milk',coconut:'pearl',pudding:'pearl',redBean:'pearl',taro:'milk',cream:'milk',strawberry:'pearl',strawberryJam:'tea',unlock:'perfect',combo:'perfect',fiveStar:'happy',badReview:'wrong',lucky:'perfect'})[name]||name;
    switch(name){
      case 'rain':this.noise(.45,1800,.045);break;
      case 'iceRemove':this.tone(720,.045,'sine',.025);this.tone(410,.06,'sine',.025,.04);break;
      case 'ice':this.tone(1180,.075,'sine',0,.12,680);this.noise(.06,2100,.05);break;
      case 'click':this.tone(650,.065,'sine',0,.22,420);break;
      case 'tea':this.noise(.42,650,.32);this.tone(240,.32,'sine',0,.13,380);break;
      case 'milk':this.noise(.42,1400,.18);this.tone(420,.28,'sine',0,.09,280);break;
      case 'pearl':[0,.07,.13,.2,.27].forEach((t,i)=>this.tone(280+i*48,.085,'sine',t,.26,130));break;
      case 'seal':this.noise(.16,450,.45);this.tone(160,.12,'triangle',0,.28,90);this.tone(950,.05,'sine',.25,.14);break;
      case 'shake':this.noise(.1,1600,.22);this.tone(330+Math.random()*100,.055,'sine',0,.09,210);break;
      case 'perfect':[660,880,1100,1320].forEach((f,i)=>this.tone(f,.22,'sine',i*.065,.23));break;
      case 'happy':this.tone(530,.12,'sine',0,.2,710);this.tone(840,.2,'sine',.12,.18);break;
      case 'cookies':[880,1100,1320].forEach((f,i)=>this.tone(f,.11,'sine',i*.065,.17));break;
      case 'dayEnd':[523,659,784,1046].forEach((f,i)=>this.tone(f,.3,'sine',i*.11,.24));break;
      case 'wrong':this.tone(280,.1,'sine',0,.15,240);break;
    }
  }
  stopTransient(){for(const s of this.sources){try{s.stop();}catch{}}for(const a of this.samples.values())a.pause();}
  setEnabled(value){this.enabled=value;if(!value)this.stopTransient();if(this.master)this.master.gain.value=value?.22:0;for(const a of this.samples.values())a.pause();}
}
