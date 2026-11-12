import * as T from 'three';
import {WorktopArt,iceBin} from './worktop-art.mjs';
import {ingredientModel,equipmentModel} from './shop-art.mjs';
import {equipmentDuration} from './growth-data.mjs';
import {iceUnits} from './craft-data.mjs';
import {liquidColor} from './cup.mjs';
import {syrupPump} from './prop-detail.mjs';

// One real work surface. HTML supplies accessible touch targets; all objects,
// drink contents, pours and contact shadows use the shop's camera and lighting.
export class CraftScene {
 constructor(host){
  this.h=host;this.root=new T.Group();this.root.name='Countertop preparation';host.scene.add(this.root);this.objects=new Map();this.targets=new Map();this.pulses=new Map();this.active=false;this.drink=null;this.pour=null;this.floaters=[];this.makeCup();this.dress=new WorktopArt(host);
  const a=host.art;this.syrup=syrupPump(host);this.root.add(this.syrup);this.objects.set('sugar',this.syrup);
  this.iceBox=iceBin(host,1);this.root.add(this.iceBox);this.objects.set('ice',this.iceBox);
  this.tongs=new T.Group();this.tongs.name='Visible ice tongs';
  for(const x of[-.095,.095]){a.round(this.tongs,[x,.085,0],[.065,.065,.73],'#325f70');a.round(this.tongs,[x,.09,-.19],[.088,.077,.23],'#e3b866');const tip=a.round(this.tongs,[x,.065,.32],[.10,.10,.12],'#c4dadb');tip.rotation.y=x>0?-.18:.18;}
  a.round(this.tongs,[0,.085,-.355],[.26,.065,.075],'#325f70');this.root.add(this.tongs);this.objects.set('iceRemove',this.tongs);
  this.stream=new T.Mesh(new T.CylinderGeometry(.035,.035,1,8),new T.MeshStandardMaterial({color:'#ad713f',transparent:true,opacity:.9}));this.stream.visible=false;this.root.add(this.stream);
 }
 shadow(parent,r=.33){const m=new T.Mesh(new T.CircleGeometry(r,20),new T.MeshBasicMaterial({color:'#486359',transparent:true,opacity:.14,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.y=.004;parent.add(m);return m;}
 makeCup(){
  const a=this.h.art,cup=this.cup=new T.Group();cup.name='Compositional drink';this.root.add(cup);this.cupShadow=this.shadow(this.root,.42);this.cupShadow.material.opacity=.19;
  const glass=new T.MeshStandardMaterial({color:'#ffedcc',transparent:true,opacity:.19,roughness:.16,metalness:.08,side:T.DoubleSide,depthWrite:false});
  this.shell=new T.Mesh(new T.CylinderGeometry(.41,.33,1.03,28,1,true),glass);this.shell.position.y=.525;this.shell.renderOrder=4;cup.add(this.shell);
  for(const angle of[.62,3.82]){const highlight=new T.Mesh(new T.CylinderGeometry(.414,.335,.86,7,1,true,angle,.12),new T.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.38,depthWrite:false,side:T.DoubleSide}));highlight.position.y=.56;highlight.renderOrder=5;cup.add(highlight);}
  const innerRim=a.ring(cup,[0,1.039,0],.388,.024,'#edf4e8');innerRim.rotation.x=Math.PI/2;
  const rim=a.ring(cup,[0,1.04,0],.41,.033,'#c9ded8');rim.rotation.x=Math.PI/2;const base=a.ring(cup,[0,.024,0],.33,.024,'#a9c8bb');base.rotation.x=Math.PI/2;
  this.liquid=new T.Mesh(new T.CylinderGeometry(.392,.319,1,28),new T.MeshStandardMaterial({color:'#d4ad7a',transparent:true,opacity:.96,roughness:.4,depthWrite:false}));this.liquid.renderOrder=1;cup.add(this.liquid);this.milkSwirl=new T.Mesh(new T.CylinderGeometry(.39,.387,.11,28),new T.MeshStandardMaterial({color:'#fff2cf',transparent:true,opacity:0,depthWrite:false}));this.milkSwirl.renderOrder=2;cup.add(this.milkSwirl);this.fill=0;this.color=new T.Color('#d4ad7a');
  this.lid=new T.Group();a.cylinder(this.lid,[0,1.075,0],.44,.08,'#428f79');a.cylinder(this.lid,[0,1.115,0],.40,.025,'#a9d8ba');cup.add(this.lid);
  this.toppings=new Map();const color={pearl:'#392d25',coconut:'#eef0de',pudding:'#e8be50',redBean:'#944a42',strawberry:'#d75170'};
  for(const[k,col]of Object.entries(color)){const g=new T.Group();for(let i=0;i<(k==='pudding'?5:14);i++){const ang=i*2.399,rad=Math.sqrt((i+.5)/14)*.27,p=[Math.sin(ang)*rad,.065+(i%4)*.023,Math.cos(ang)*rad];let m;if(k==='coconut'||k==='pudding')m=a.round(g,p,[k==='pudding'?.17:.12,k==='pudding'?.18:.13,.13],col);else m=a.ball(g,p,[k==='redBean'?.055:.072,.073,.068],col);m.material=m.material.clone();m.material.transparent=true;m.material.depthWrite=false;m.renderOrder=2;m.userData.baseY=p[1];}cup.add(g);this.toppings.set(k,g);}
  // Model the layer thickness in geometry, so drop progress cannot replace a
  // unit cylinder's .24/.15 height with a full-height column. The taro also fits
  // the tapered inner wall and keeps its lower face above the cup base.
  this.taro=new T.Mesh(new T.CylinderGeometry(.332,.312,.24,28),new T.MeshStandardMaterial({color:'#b795c9',roughness:.88,transparent:true,depthWrite:false}));this.taro.position.y=.16;cup.add(this.taro);this.taro.renderOrder=2;this.toppings.set('taro',this.taro);
  this.cream=new T.Mesh(new T.CylinderGeometry(1,1,.15,28),new T.MeshStandardMaterial({color:'#fff7e6',roughness:.88,transparent:true,depthWrite:false}));this.cream.scale.set(.386,1,.386);this.cream.position.y=.8;cup.add(this.cream);this.cream.renderOrder=2;this.toppings.set('cream',this.cream);
  this.jam=new T.Group();for(let i=0;i<5;i++){const ang=i*1.32;a.ball(this.jam,[Math.sin(ang)*.35,.12+i*.105,Math.cos(ang)*.27],[.035,.14,.045],'#e67f97');}cup.add(this.jam);
  this.ice=[];const im=new T.MeshStandardMaterial({color:'#c5f2f4',transparent:true,opacity:.67,roughness:.1,metalness:.06});for(let i=0;i<12;i++){const m=new T.Mesh(new T.BoxGeometry(.15,.15,.145),im);m.rotation.set(.1,i*.7,.12);m.renderOrder=2;cup.add(m);this.ice.push(m);}
  this.sugarRipples=[];for(let i=0;i<2;i++){const m=new T.Mesh(new T.TorusGeometry(.10,.012,6,32),new T.MeshBasicMaterial({color:'#f0ce83',transparent:true,opacity:0,depthWrite:false}));m.rotation.x=Math.PI/2;m.renderOrder=3;cup.add(m);this.sugarRipples.push(m);}
  this.sugarSwirl=new T.Mesh(new T.TorusGeometry(.15,.018,6,36,Math.PI*1.65),new T.MeshStandardMaterial({color:'#bd792b',transparent:true,opacity:0,roughness:.3,depthWrite:false}));this.sugarSwirl.rotation.x=Math.PI/2;this.sugarSwirl.renderOrder=3;cup.add(this.sugarSwirl);
  this.sugarDrops=[];for(let i=0;i<3;i++){const m=a.ball(cup,[0,1.15,0],[.025,.045,.025],'#e8b253');m.visible=false;m.renderOrder=3;this.sugarDrops.push(m);}
  const logo=this.h.label('蛙',.22,.23,'#fff4d6','#42816b');logo.position.set(0,.47,.389);cup.add(logo);
 }
 surface(nx,ny,y=1.45){const ray=new T.Raycaster();ray.setFromCamera(new T.Vector2(nx*2-1,1-ny*2),this.h.camera);return ray.ray.intersectPlane(new T.Plane(new T.Vector3(0,1,0),-y),new T.Vector3());}
 point(v){const p=v.clone().project(this.h.camera),r=this.h.canvas.getBoundingClientRect();return{x:(p.x+1)*r.width/2,y:(1-p.y)*r.height/2};}
 setControls(keys,equipment,tab='base',enabled=true){this.tab=tab;this.enabled=enabled;
  const key=keys.join(',')+tab+enabled+JSON.stringify(equipment);if(key===this.key)return;this.key=key;this.keys=keys;
  for(const[k,m]of this.objects)m.visible=false;
  for(const k of keys){const level=equipment[k]||equipment.toppings||1,old=this.objects.get(k);if(old&&old.userData.level!==level){old.removeFromParent();this.h.shopArt.clear(old);this.objects.delete(k);}if(!this.objects.has(k)){const m=ingredientModel(this.h,k,level);m.userData.level=level;this.shadow(m,k==='tea'||k==='milk'?.29:.38);this.root.add(m);this.objects.set(k,m);}this.objects.get(k).visible=true;}
  const level=equipment.iceMachine;if(this.iceLevel!==level){this.iceBox.removeFromParent();this.iceBox=iceBin(this.h,level);this.root.add(this.iceBox);this.objects.set('ice',this.iceBox);this.iceLevel=level;}
  for(const k of['sugar','ice','iceRemove'])this.objects.get(k).visible=enabled&&tab==='sugarIce';this.layout();
 }
 layout(){
  if(!this.active)return;
  const spots={tea:[-1.48,1.455,1.65],milk:[-1.48,1.455,4.75],strawberryJam:[-.56,1.455,4.75],sugar:[1.30,1.455,1.80],ice:[1.30,1.455,4.75],iceRemove:[-1.0,1.475,4.80]};
  const tops=this.keys?.filter(k=>!['tea','milk','strawberryJam'].includes(k))||[];tops.forEach((k,i)=>spots[k]=[-.98+i*.98,1.455,4.65]);this.targets.clear();
  for(const[k,m]of this.objects){if(!m.visible||!spots[k])continue;m.position.set(...spots[k]);const scale=['tea','milk'].includes(k)?.96:k==='ice'?.98:k==='sugar'?.98:k==='iceRemove'?.9:.92;m.scale.setScalar(scale);m.userData.scale=scale;m.userData.restPosition=m.position.clone();this.targets.set(k,m.position.clone().add(new T.Vector3(0,k==='iceRemove'?.025:k==='tea'||k==='milk'?.38:.27*scale,0)));}
  this.cupRest=new T.Vector3(0,1.47,3.2);this.restScale=1.08;this.cupShadow.position.copy(this.cupRest);this.cupShadow.position.y=1.448;this.cupShadow.scale.setScalar(1.08);this.dress.layout(this);if(!this.drink||!['shaking','perfect','ready','delivering','review','leaving'].includes(this.h.state))this.cup.position.copy(this.cupRest);this.projectTargets();
 }
 projectTargets(){if(!this.active)return;for(const[k,v]of this.targets){const selector=k==='sugar'?'[data-machine="sugar"]':k==='ice'?'#ice-add':k==='iceRemove'?'#ice-remove':`[data-ingredient="${k}"]`,el=document.querySelector('#craft-desktop '+selector);if(!el)continue;const p=this.point(v);
  if(k==='iceRemove'){const tabs=document.querySelector('#craft-desktop .category-tabs'),r=this.h.canvas.getBoundingClientRect();if(tabs&&!tabs.hidden){const bottom=tabs.getBoundingClientRect().top-r.top-8,limit=bottom-el.offsetHeight/2;if(p.y>limit){p.y=limit;const adjusted=this.surface(p.x/r.width,p.y/r.height,v.y),m=this.objects.get(k);if(adjusted&&m){v.copy(adjusted);m.position.copy(adjusted).add(new T.Vector3(0,-.025,0));m.userData.restPosition=m.position.clone();}}}}
  el.style.left=p.x+'px';el.style.top=p.y+'px';}
  const el=document.getElementById('sugar-options'),v=this.targets.get('sugar');if(el&&v){const p=this.point(v);el.style.left=Math.min(this.h.canvas.clientWidth-108,Math.max(0,p.x-70))+'px';el.style.top=Math.min(this.h.canvas.clientHeight-154,Math.max(34,p.y+36))+'px';}
 }
 setDrink(d){this.drink=d||null;this.targetFill=!d?0:Math.min(.9,(d.tea?.43:0)+(d.milk?.39:0)+(d.strawberryJam?.11:0)+(d.toppings?.length||0)*.04);this.color.set(d?.strawberryJam?'#ed7795':d?.toppings?.includes('taro')?'#a170bb':d?.milk?(d?.tea?'#c9904c':'#ffe6b0'):'#a55a25');this.lid.visible=!!d?.sealed;this.jam.visible=!!d?.strawberryJam;for(const[k,m]of this.toppings)m.visible=!!d?.toppings?.includes(k);this.iceCount=iceUnits(d);}
 feedback(type){if(type==='sugar')this.sugarStart=this.h.time;if(type==='milk')this.milkStart=this.h.time;const topping=this.toppings.get(type);if(topping)topping.userData.drop=this.h.time;const m=this.objects.get(type==='iceRemove'?'iceRemove':type);if(m)this.pulses.set(type,this.h.time);if(type==='seal'){this.pour=null;this.sugarStart=undefined;this.stream.visible=false;this.sealStart=this.h.time;this.sealDuration=equipmentDuration(this.h.storeData,'seal');return;}this.pour={type,start:this.h.time,duration:type==='sugar'?.22+(this.drink?.sugar||70)*.0028:.42};}
 handTarget(side){const p=this.cup.position.clone();p.y+=.57*this.cup.scale.x;p.x+=(side==='L'?-.26:.26)*this.cup.scale.x;return p;}
 tick(dt){
  const h=this.h;this.active=h.business;this.root.visible=this.active;this.dress.tick(this.active);if(!this.active)return;this.tongs.visible=this.enabled&&this.tab==='sugarIce'&&!document.getElementById('ice-remove').hidden;
  this.fill+=(this.targetFill-this.fill)*(1-Math.exp(-dt*9));this.liquid.visible=this.fill>.005;this.liquid.scale.y=Math.max(.001,this.fill);this.liquid.position.y=.04+this.fill/2;this.liquid.material.color.lerp(this.color,1-Math.exp(-dt*8));this.milkSwirl.visible=!!this.drink?.milk&&this.fill>.05;this.milkSwirl.position.y=.025+this.fill;const milkAge=h.time-(this.milkStart??-10);this.milkSwirl.material.opacity=.07+Math.max(0,1-milkAge/.7)*.5;
  for(let i=0;i<this.ice.length;i++){const m=this.ice[i],was=m.visible;m.visible=i<this.iceCount;if(m.visible&&!was)m.userData.drop=h.time;const age=h.time-(m.userData.drop??-10),offset=Math.max(0,1-age/.24)*.85;const surface=this.fill>.01?.06+this.fill-.07:.1;const x=(i%3-1)*.15,z=(Math.floor(i/3)%2-.5)*.16;m.position.set(x,surface-Math.floor(i/6)*.12+offset,z);}
  for(const[k,g]of this.toppings){if(g.visible&&['taro','cream'].includes(k)){g.scale.y=Math.min(1,Math.max(.03,(h.time-(g.userData.drop??-10))/.3));if(k==='taro'){g.position.y=.04+.12*g.scale.y;g.scale.x=g.scale.z=.94+.06*g.scale.y;}else{g.position.y=Math.min(.94,Math.max(.115,.04+this.fill));const radius=Math.min(.386,.33+(g.position.y-.075*g.scale.y-.01)*.08/1.03-.016);g.scale.x=g.scale.z=radius;}}if(g.visible&&g.children.length){for(const m of g.children){const age=h.time-(g.userData.drop??-10);m.position.y=m.userData.baseY+Math.max(0,1-age/.3)*.75;}}}
  const held=['shaking','perfect','ready'].includes(h.state),sealing=h.state==='making'&&this.sealStart!==undefined&&h.time-this.sealStart<this.sealDuration;let target=this.cupRest?.clone();if(sealing){const machine=h.shopArt.equipment.get('sealer');target=machine.localToWorld(new T.Vector3(0,.10,.44));target.y=Math.max(1.45,target.y);}
  const sealer=h.shopArt.equipment.get('sealer');sealer.visible=sealing;if(sealer.children[3])sealer.children[3].position.y=.63-(sealing?Math.sin(Math.min(1,(h.time-this.sealStart)/this.sealDuration)*Math.PI)*.065:0);
  if(held)target=h.staff.root.localToWorld(new T.Vector3(0,2.32,1.0));
  if(h.state==='delivering'){const t=Math.min(1,(h.time-h.deliveryStart)/.5),a=h.staff.root.localToWorld(new T.Vector3(0,2.32,1)),b=h.student.root.localToWorld(new T.Vector3(-.2,3.4,.8));b.y=Math.max(1.5,b.y);target=a.lerp(b,t);target.y+=Math.sin(t*Math.PI)*.15;}
  if(['review','leaving'].includes(h.state)){target=h.student.root.localToWorld(new T.Vector3(0,3.4,.75));target.y=Math.max(1.5,target.y);if(h.sipStart)target.y+=Math.sin(Math.min(1,(h.time-h.sipStart)/.55)*Math.PI)*.23;}
  const size=sealing?.55:held||['delivering','review','leaving'].includes(h.state)?.76:(this.restScale||1.08);this.cup.scale.lerp(new T.Vector3(size,size,size),1-Math.exp(-dt*18));
  this.cup.visible=!['dayIntro','arriving','between','summary','upgrading'].includes(h.state);this.cupShadow.visible=this.cup.visible;this.cupShadow.material.opacity=held||sealing||['delivering','review','leaving'].includes(h.state)?.02:.16;if(target){this.cup.position.lerp(target,1-Math.exp(-dt*18));this.cup.rotation.z=h.state==='shaking'?h.shakeDirection*h.shakeForce*.25:0;}
  const hint=document.getElementById('instruction');if(hint){const p=this.point(this.cup.position.clone().add(new T.Vector3(0,-.06,0)));hint.style.left=Math.max(85,Math.min(h.canvas.clientWidth-85,p.x))+'px';hint.style.top=(p.y+10)+'px';}
  if(held){const offset=h.canvas.clientHeight*.28,bottom=this.point(this.cup.position),top=this.point(this.cup.position.clone().add(new T.Vector3(0,1.13*this.cup.scale.x,0)));const shake=document.getElementById('shake-area');shake.querySelector('b').style.top=Math.max(8,top.y-34-offset)+'px';shake.querySelector('.swipe-track').style.top=((top.y+bottom.y)/2-offset-18)+'px';shake.querySelector('.shake-meter').style.top=(bottom.y+16-offset)+'px';shake.querySelector('.shake-grades').style.top=(bottom.y+27-offset)+'px';}
  for(const[k,start]of this.pulses){const m=this.objects.get(k);if(!m)continue;const t=(h.time-start)/.22;if(t>=1){m.scale.setScalar(m.userData.scale||1);this.pulses.delete(k);}else m.scale.setScalar((m.userData.scale||1)*(1+Math.sin(t*Math.PI)*.08));}
  const sugarAge=h.time-(this.sugarStart??-10),reaction=sugarAge>=0&&sugarAge<.95&&h.state==='making',surface=.052+this.fill;
  this.sugarSwirl.visible=reaction||Boolean(this.drink?.sugar&&this.fill<.01);this.sugarSwirl.position.y=surface+.012;this.sugarSwirl.rotation.z=sugarAge*2.4;this.sugarSwirl.material.opacity=reaction?Math.max(0,.68*(1-sugarAge/.95)):this.fill<.01?.45:0;
  for(let i=0;i<2;i++){const ripple=this.sugarRipples[i],age=sugarAge-i*.13;ripple.visible=reaction&&age>0;ripple.position.y=surface+.018;ripple.scale.setScalar(1+Math.min(.8,age)*2.1);ripple.material.opacity=Math.max(0,.65*(1-age/.8));}
  for(let i=0;i<3;i++){const age=sugarAge-.13-i*.07,m=this.sugarDrops[i];m.visible=reaction&&age>0&&age<.22;m.position.set(.05*Math.sin(i*2),surface+Math.max(0,1-age/.22)*.38,.05*Math.cos(i*2));}
  if(reaction){const bump=Math.sin(Math.min(1,sugarAge/.5)*Math.PI)*.008;this.cup.scale.multiplyScalar(1+bump);}
  if(this.syrup.userData.restPosition)this.syrup.position.copy(this.syrup.userData.restPosition);this.syrup.rotation.z=0;this.syrup.userData.pump.position.y=.65;
  this.stream.visible=false;if(this.pour){const t=(h.time-this.pour.start)/this.pour.duration;if(t>=1)this.pour=null;else{const type=this.pour.type;const top=this.cup.position.clone().add(new T.Vector3(0,1.4,0));if(['tea','milk','strawberryJam','sugar'].includes(type)){this.stream.material.color.set({tea:'#aa723e',milk:'#fff3db',strawberryJam:'#e782a0',sugar:'#e7b24c'}[type]);
     if(type==='sugar'){
      const lift=Math.min(1,t/.17,(1-t)/.20);this.syrup.position.add(new T.Vector3(-.50*lift,.70*lift,.58*lift));this.syrup.rotation.z=.10*lift;this.syrup.userData.pump.position.y=.65-.075*Math.sin(t*Math.PI);
      this.syrup.updateWorldMatrix(true,true);const from=this.syrup.userData.nozzle.getWorldPosition(new T.Vector3()),to=this.cup.localToWorld(new T.Vector3(0,.98,0)),delta=to.clone().sub(from);this.stream.visible=t>.18&&t<.80;this.stream.position.copy(from).lerp(to,.5);this.stream.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.clone().normalize());this.stream.scale.set(.65,delta.length(),.65);
     }else{this.stream.visible=true;this.stream.quaternion.identity();this.stream.position.copy(top).add(new T.Vector3(0,-.23,0));this.stream.scale.set(1,.45,1);}
    }
    const g=this.toppings.get(type);if(g)g.userData.drop=this.pour.start;
  }}

 }
}
