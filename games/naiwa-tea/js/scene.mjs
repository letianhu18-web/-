import {renderPolicy} from './render-policy.mjs';
import {ShopArt} from './shop-art.mjs';
import {CraftScene} from './craft-scene.mjs';
import {repairEyelids,syncClosedEyes} from './eye-safety.mjs';
import {freshGrowth,storeLevels} from './growth-data.mjs';
import {createClothes} from './clothes-model.mjs';
import {outfitFor} from './wardrobe-data.mjs';

// Keep the service lane behind the slab, including the largest customer's idle arms.
const STAFF_Z=-1.18, BUSINESS_STAFF_Z=-1.42, SERVICE={x:1.60,z:-1.20};
const customerSize=type=>type==='child'||type==='painter'?.56:type==='relaxed'?.63:.60;
import * as T from 'three';
import { GLTFLoader } from '../assets/vendor/GLTFLoader.js';
import { createHomeArtKit } from './art-kit.mjs';

function skeletonClone(source) {
  const clone=source.clone(true),map=new Map();
  const parallel=(a,b)=>{map.set(a,b);for(let i=0;i<a.children.length;i++)parallel(a.children[i],b.children[i]);};parallel(source,clone);
  source.traverse(o=>{if(o.isSkinnedMesh){const c=map.get(o);c.skeleton=o.skeleton.clone();c.skeleton.bones=o.skeleton.bones.map(b=>map.get(b));c.bind(c.skeleton,c.bindMatrix);}});
  return clone;
}

export class ShopScene {
  constructor(canvas,onProgress=()=>{},quality='auto') {
    this.canvas=canvas;this.quality=quality;this.mobile=matchMedia('(pointer: coarse)').matches;this.needsRender=true;this.reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');this.time=0;this.state='idle';this.mood='idle';this.moodUntil=0;this.shakeForce=0;this.shakeDirection=1;this.customerMotion=null;
    this.renderer=new T.WebGLRenderer({canvas,alpha:false,antialias:true,powerPreference:'default'});
    this.renderer.setPixelRatio(renderPolicy(this.quality,{mobile:this.mobile,pixelRatio:devicePixelRatio}).pixelRatio);this.renderer.outputColorSpace=T.SRGBColorSpace;this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.04;this.renderer.localClippingEnabled=true;
    this.scene=new T.Scene();this.scene.background=new T.Color('#dcf0ec');
    this.camera=new T.OrthographicCamera(-3.4,3.4,2.8,-2.8,.1,60);
    this.homeCamera=this.camera;this.craftCamera=new T.OrthographicCamera(-2.1,2.1,3.5,-3.5,.1,60);this.camera.position.set(0,4.4,11);this.camera.lookAt(0,1.7,0);
    this.scene.add(new T.HemisphereLight(0xfff9e8,0x729487,1.9));const light=new T.DirectionalLight(0xffecd2,2.1);light.position.set(-4,7,7);this.scene.add(light);
    this.art=createHomeArtKit();this.shopArt=new ShopArt(this);this.storeData=freshGrowth();this.createShop();this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(canvas);this.resize();
    this.ready=new Promise((resolve,reject)=>new GLTFLoader().load('./assets/character.glb',g=>{
      repairEyelids(g.scene);this.clips=g.animations;this.staff=this.createActor(g.scene,false);this.student=this.createActor(skeletonClone(g.scene),true);
      this.staff.root.position.set(-.58,0,STAFF_Z);this.student.root.position.set(5.6,0,1.25);this.student.root.visible=false;
      this.staff.root.scale.setScalar(.61);this.student.root.scale.setScalar(.45);
      this.staff.root.rotation.y=.08;this.student.root.rotation.y=-.4;
      this.addStudentBag();this.staffCup=this.createCup();this.customerCup=this.createCup();this.staff.root.add(this.staffCup);this.student.root.add(this.customerCup);
      this.staffCup.position.set(0,3.0,1.15);this.staffCup.scale.setScalar(1.3);this.customerCup.position.set(0,2.05,1.1);this.customerCup.scale.setScalar(1.05);
      this.staffCup.visible=false;this.customerCup.visible=false;
      this.customerNotes={welcome:this.label('这杯是我的～',1.35,.36),ready:this.label('闻起来好香！',1.35,.36),review:this.label('谢谢奶蛙～',1.35,.36)};for(const note of Object.values(this.customerNotes)){note.position.set(0,5.3,0);note.visible=false;this.student.root.add(note);}
      this.changeClip(this.staff,'Idle');this.changeClip(this.student,'Idle');this.loaded=true;this.createQueueModels();this.craftScene=new CraftScene(this);this.resize();resolve();
    },e=>onProgress(e.total?e.loaded/e.total:0),reject));
  }
  createActor(model,student) {
    const root=new T.Group();root.add(model);this.scene.add(root);
    model.traverse(o=>{if(o.isMesh){o.frustumCulled=false;o.castShadow=false;}});
    const mixer=new T.AnimationMixer(model),actions={};for(const clip of this.clips)actions[clip.name]=mixer.clipAction(clip);
    const bones={};for(const name of ['Head','Neck','UpperArm_L','UpperArm_R','Forearm_L','Forearm_R','Hand_L','Hand_R','Thigh_L','Thigh_R','Shin_L','Shin_R']){const b=model.getObjectByName(name);if(b)bones[name]={bone:b,base:b.quaternion.clone()};}
    const actor={root,model,mixer,actions,current:null,bones,overlaid:false,student};return actor;
  }
  changeClip(actor,name) { if(!actor||actor.current===name)return;const next=actor.actions[name];if(!next)return;for(const a of Object.values(actor.actions))a.fadeOut(.14);next.reset().fadeIn(.14).play();actor.current=name; }
  label(text,width=2.4,height=.65,bg='#fff8e9',ink='#155d55') {
    const c=document.createElement('canvas');c.width=512;c.height=160;const x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,512,160);x.fillStyle=ink;x.textAlign='center';x.textBaseline='middle';x.font='bold 64px sans-serif';x.fillText(text,256,83);
    const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;
    const m=new T.Mesh(new T.PlaneGeometry(width,height),new T.MeshBasicMaterial({map:tx}));return m;
  }
  createShop(){this.shopArt.build(this.storeData);}
  applyGrowth(data){this.storeData=data;this.shopArt.build(data);this.applyWardrobe(data);}
  cloneCharacter(){const model=skeletonClone(this.staff.model),garments=[];model.traverse(o=>{if(o.userData.garmentPart||o.userData.isGarment)garments.push(o);});for(const o of garments)o.removeFromParent();return model;}
  applyWardrobe(data=this.storeData){
    if(!this.loaded||!this.waitingActors)return;this.wardrobeData=data;
    this.staff.clothes??=createClothes(this.staff.model);this.student.clothes??=createClothes(this.student.model);
    this.staff.clothes.set(outfitFor(data,'staff'));this.student.clothes.set(outfitFor(data,this.customerType||'student'));
    for(const m of this.waitingActors){m.userData.clothes??=createClothes(m.children[0],{cacheLimit:1});if(m.visible)m.userData.clothes.set(outfitFor(data,m.userData.type||'student'));}
    if(this.seated?.visible){this.seated.userData.clothes??=createClothes(this.seated.children[0],{cacheLimit:1});this.seated.userData.clothes.set(outfitFor(data,this.seated.userData.type||this.customerType||'student'));}
    if(this.greeter?.visible){this.greeter.userData.clothes??=createClothes(this.greeter.children[0],{cacheLimit:1});this.greeter.userData.clothes.set(outfitFor(data,this.greeter.userData.type||'adeng'));}
  }
  clothesPreview(id,back=false){
    if(!this.loaded)return null;
    if(!this.clothesRenderer){this.clothesRenderer=new T.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true});this.clothesRenderer.setPixelRatio(1);this.clothesRenderer.setSize(256,280);this.clothesRenderer.outputColorSpace=T.SRGBColorSpace;this.clothesRenderer.toneMapping=T.ACESFilmicToneMapping;this.clothesRenderer.toneMappingExposure=1.04;}
    const sc=new T.Scene();sc.background=new T.Color('#f4ead8');sc.add(new T.HemisphereLight(0xfff9e8,0x729487,1.9));const light=new T.DirectionalLight(0xffecd2,2.1);light.position.set(-4,7,7);sc.add(light);
    const model=this.cloneCharacter();sc.add(model);const mixer=new T.AnimationMixer(model);mixer.clipAction(this.clips.find(c=>c.name==='Idle')).play();mixer.update(.12);const clothes=createClothes(model,{cacheLimit:1});clothes.set(id);clothes.tick(0,{reducedMotion:true});
    const special=['star_river_couture','birthday_crown_cape'].includes(id),half=special?3.05:2.52;
    const cam=new T.OrthographicCamera(-half*256/280,half*256/280,half,-half,.1,30);cam.position.set(back?-3:3,special?3.9:3.6,back?-9:9);cam.lookAt(0,special?2.65:2.35,0);sc.updateMatrixWorld(true);this.clothesRenderer.render(sc,cam);const url=this.clothesRenderer.domElement.toDataURL('image/png');clothes.dispose();mixer.stopAllAction();mixer.uncacheRoot(model);return url;
  }
  createQueueModels(){this.waitingActors=[];for(let i=0;i<5;i++){const root=new T.Group();const model=this.cloneCharacter();model.traverse(o=>{if(o.isMesh){const src=Array.isArray(o.material)?o.material:[o.material];o.material=src.map(m=>{const clone=m.clone();clone.clippingPlanes=[];return clone;});if(o.material.length===1)o.material=o.material[0];}});root.add(model);root.scale.setScalar(.54);const mark=this.label('等候',.8,.34,'#fff7d9','#387b64');mark.position.set(0,5.0,0);root.add(mark);const mixer=new T.AnimationMixer(model);mixer.clipAction(this.clips.find(c=>c.name==='Idle')).play();const note=this.label(i%2?'想喝奶茶～':'快好了吗～',1.2,.34,'#fff7d9','#387b64');note.position.copy(mark.position);note.visible=false;root.add(note);root.userData={mixer,mark,note,customerId:null};root.visible=false;this.scene.add(root);this.waitingActors.push(root);}
    this.seated=new T.Group();const model=this.cloneCharacter();for(const side of ['L','R']){for(const [part,angle]of [['Thigh',-.8],['Shin',.8],['UpperArm',-.6],['Forearm',-.45]]){const bone=model.getObjectByName(part+'_'+side);if(bone)bone.rotation.x+=angle;}}this.seated.add(model);this.seated.scale.setScalar(.28);this.seated.visible=false;this.scene.add(this.seated);const cup=this.createCup();cup.position.set(0,2.1,1.1);this.seated.add(cup);
    this.hardHat=new T.Group();this.art.cylinder(this.hardHat,[0,5.1,0],.88,.15,'#eabc4a');this.art.ball(this.hardHat,[0,5.25,0],[.68,.35,.59],'#f8d46b');this.staff.root.add(this.hardHat);this.hardHat.visible=false;
  }
  // Leave room for the complete body and clothes, rather than packing heads
  // into the backdrop. The service backdrop sits beyond the last queue slot.
  queuePoint(index=0){return new T.Vector3(1.75,0,-3.1-index*1.8);}
  queueFirstX(){return this.queuePoint().x;}
  setQueue(waiting=[]){
    if(!this.loaded)return;const assigned=new Set();
    for(let i=0;i<waiting.length&&i<this.waitingActors.length;i++){
      const c=waiting[i],id=c.id??('waiting-'+i),m=this.waitingActors.find(m=>m.visible&&m.userData.customerId===id)||this.waitingActors.find(m=>!assigned.has(m)&&!waiting.some(c=>c.id===m.userData.customerId));if(!m)continue;
      assigned.add(m);const target=this.queuePoint(i),entering=!m.visible||m.userData.customerId!==id;
      if(entering)m.position.copy(target).add(new T.Vector3(1.0,0,0));
      if(entering||m.position.distanceTo(target)>.015){const moving=m.userData.motion;if(!moving||moving.to.distanceTo(target)>.001)m.userData.motion={from:m.position.clone(),to:target,start:this.time,duration:entering?.65:.8};}
      m.userData.customerId=id;m.userData.type=c.type;m.userData.baseX=target.x;m.userData.baseZ=target.z;m.scale.setScalar(customerSize(c.type)*(.91-i*.035));const ahead=i?this.queuePoint(i-1):new T.Vector3(SERVICE.x,0,SERVICE.z);m.rotation.y=-.85;m.visible=true;m.userData.clothes?.set(outfitFor(this.wardrobeData||this.storeData,c.type));
    }
    for(const m of this.waitingActors)if(!assigned.has(m)){m.visible=false;m.userData.customerId=null;m.userData.motion=null;}
  }
  sitCustomer(){if(!this.loaded||this.storeData.storeLevel<4||this.seated.visible)return;this.seated.visible=true;this.seated.position.set(-3.75,.23,2.35);this.seated.rotation.y=.4;this.seated.userData.type=this.customerType;this.applyWardrobe();this.seatedUntil=this.time+3.4;}
  rayFurniture(clientX,clientY){const box=this.canvas.getBoundingClientRect(),ray=new T.Raycaster();ray.setFromCamera(new T.Vector2((clientX-box.left)/box.width*2-1,1-(clientY-box.top)/box.height*2),this.camera);const hits=ray.intersectObjects([...this.shopArt.objects.values()],true);for(const hit of hits){let o=hit.object;while(o&&o!==this.shopArt.furniture){if(o.userData.uid)return o.userData.uid;o=o.parent;}}return null;}
  addStudentBag(){const a=this.art,g=new T.Group();this.student.root.add(g);this.bag=g;a.round(g,[1.05,2.15,-.18],[.65,1.15,.66],'#407f9b',.16);a.round(g,[1.08,2.0,.18],[.47,.58,.13],'#78acbc',.08);const strap=a.round(g,[.81,2.57,.23],[.11,1.25,.1],'#395b61');strap.rotation.z=.18;}
  setCustomer(type){
    if(!this.loaded)return;this.customerType=type;this.bag.visible=type==='student';
    if(!this.accessories){this.accessories={};const a=this.art;
      for(const k of ['child','officeWorker','relaxed','picky','lucky','granny','adeng','painter']){const group=new T.Group();this.student.root.add(group);this.accessories[k]=group;}
      a.ball(this.accessories.child,[1.2,4.45,0],[.44,.53,.35],'#ee99b3');a.cylinder(this.accessories.child,[1.2,3.25,0],.015,2,'#bcae8a');
      a.round(this.accessories.officeWorker,[0,2.3,1.05],[.19,.75,.1],'#6b6baa');a.round(this.accessories.officeWorker,[1.2,1.4,.2],[.66,.55,.35],'#8d674e');
      a.cylinder(this.accessories.relaxed,[0,4.95,.02],1.12,.09,'#d6c790');a.cylinder(this.accessories.relaxed,[0,5.1,.02],.68,.25,'#e6d9aa');
      for(const x of [-.54,.54]){const ring=new T.Mesh(new T.TorusGeometry(.42,.055,8,20),new T.MeshStandardMaterial({color:'#4c5145'}));ring.position.set(x,4.4,1.06);this.accessories.picky.add(ring);}a.round(this.accessories.picky,[0,4.4,1.06],[.3,.07,.08],'#4c5145');
      a.round(this.accessories.granny,[0,2.95,.8],[2.05,.32,.4],'#bf93ad');a.round(this.accessories.granny,[.68,2.55,1],[.32,.75,.1],'#bf93ad');a.round(this.accessories.granny,[-1.24,1.4,.2],[.08,2.5,.1],'#97744e');
      a.round(this.accessories.adeng,[0,1.85,1.07],[1.05,1.5,.1],'#738aaa');a.round(this.accessories.adeng,[0,2,1.14],[.58,.33,.045],'#afc2d3');a.cylinder(this.accessories.adeng,[0,5.03,0],.77,.14,'#687c98');
      a.ball(this.accessories.painter,[0,5.12,0],[.96,.22,.75],'#cf8c78');a.round(this.accessories.painter,[1.13,2.1,.42],[.61,.79,.12],'#f3e2b9');for(let i=0;i<3;i++)a.ball(this.accessories.painter,[.97+i*.14,2.3, .5],[.045,.045,.025],['#d67a8e','#e2bf5b','#75a697'][i]);
      const star=this.label('★',.9,.9,'#fff1b9','#e8ab39');star.position.set(1.06,5.15,.45);this.accessories.lucky.add(star);
    }
    for(const [k,group] of Object.entries(this.accessories))group.visible=k===type;
    this.customerScale=customerSize(type);this.student.root.scale.setScalar(this.customerScale);this.student.clothes?.set(outfitFor(this.wardrobeData||this.storeData,type));
  }
  setDrink(d){if(!this.loaded||!d)return;const color=d.strawberryJam?'#efadba':d.toppings.includes('taro')?'#baa0c8':d.milk?'#d3ac7c':'#aa703b';for(const cup of [this.staffCup,this.customerCup]){cup.children[0].material.color.set(color);for(let i=1;i<=9;i++){cup.children[i].visible=d.toppings.length>0;cup.children[i].material.color.set(d.toppings.includes('strawberry')?'#d85870':d.toppings.includes('coconut')?'#f3efd6':d.toppings.includes('pudding')?'#e7c148':d.toppings.includes('redBean')?'#935149':'#392819');}}}
  createCup(){const root=new T.Group(),m=new T.MeshStandardMaterial({color:'#d3a976',roughness:.6});const cup=new T.Mesh(new T.CylinderGeometry(.27,.2,.68,24),m);root.add(cup);for(let i=0;i<9;i++){const a=i*2.4;this.art.ball(root,[Math.sin(a)*.19,-.23+(i%2)*.05,Math.cos(a)*.19],[.042,.042,.042],'#392819');}this.art.cylinder(root,[0,.37,0],.29,.05,'#2b9c87');const logo=this.label('蛙',.18,.18,'#f8eacb','#297263');logo.position.set(0,.07,.258);root.add(logo);return root;}
  setQuality(quality){this.quality=quality;this.resize();}
  resize(){this.needsRender=true;const pixelRatio=renderPolicy(this.quality,{mobile:this.mobile,pixelRatio:devicePixelRatio}).pixelRatio;if(this.renderer.getPixelRatio()!==pixelRatio)this.renderer.setPixelRatio(pixelRatio);const r=this.canvas.getBoundingClientRect();if(!r.width||!r.height)return;this.renderer.setSize(r.width,r.height,false);this.business=this.canvas.closest('#game')?.dataset.mode==='business';const aspect=r.width/r.height;
    this.camera=this.business?this.craftCamera:this.homeCamera;
    if(this.business){const w=4.2;this.camera.left=-w/2;this.camera.right=w/2;this.camera.top=w/aspect/2;this.camera.bottom=-w/aspect/2;this.camera.position.set(.2,5.6,13);this.camera.lookAt(0,1.9,.5);this.camera.zoom=this.camera.zoom||1;this.scene.background.set('#83b7a5');}else this.scene.background.set('#dcf0ec');
    if(!this.business){const w=this.storeData?.storeLevel===5?10.6:this.storeData?.storeLevel>=3?9.1:7.7;this.camera.position.set(0,this.storeData?.storeLevel===5?5.2:4.4,11);this.camera.lookAt(0,this.storeData?.storeLevel===5?2.2:1.65,0);this.camera.left=-w/2;this.camera.right=w/2;this.camera.top=w/aspect/2;this.camera.bottom=-w/aspect/2;}
    if(this.staff)this.staff.root.scale.setScalar(this.business?.76:.61);this.camera.updateProjectionMatrix();this.camera.updateMatrixWorld(true);this.shopArt.setBusiness(this.business);if(this.craftScene){this.craftScene.active=this.business;this.craftScene.root.visible=this.business;this.craftScene.dress.tick(this.business);this.craftScene.layout();}
  }
  setState(state){this.needsRender=true;this.state=state;if(!this.loaded)return;this.hardHat.visible=state==='upgrading';this.staffCup.visible=['shaking','perfect','ready','delivering'].includes(state);if(state==='idle'){this.student.root.visible=false;this.studentShadow.visible=false;this.customerCup.visible=false;}}
  moodFor(mood,seconds=.85){this.mood=mood;this.moodUntil=this.time+seconds;if(mood==='happy')this.changeClip(this.staff,'Happy');}
  arrive(restored=false,fromQueue=false){if(!this.loaded)return;this.student.root.visible=true;this.studentShadow.visible=true;this.customerCup.visible=false;const from=fromQueue?this.queuePoint():new T.Vector3(5.5,0,SERVICE.z);this.student.root.position.set(restored?SERVICE.x:from.x,0,restored?SERVICE.z:from.z);this.student.root.rotation.y=-1.05;this.student.root.scale.setScalar(this.customerScale||.60);this.customerMotion=restored?null:{from:from.x,to:SERVICE.x,fromZ:from.z,toZ:SERVICE.z,start:this.time,duration:.8};this.changeClip(this.student,restored?'Idle':'Run');this.moodFor('welcome',.8);}
  leave(){if(!this.loaded)return;this.customerMotion={from:SERVICE.x,to:5.5,fromZ:SERVICE.z,toZ:SERVICE.z,start:this.time,duration:.75};this.student.root.rotation.y=1.42;this.changeClip(this.student,'Run');}
  deliver(){this.deliveryStart=this.time;}
  sip(){if(!this.loaded)return;this.staffCup.visible=false;this.customerCup.visible=true;this.changeClip(this.student,'Eat');this.sipStart=this.time;}
  celebrate(){this.moodFor('happy',.85);this.changeClip(this.student,this.customerType==='child'?'Jump':'Happy');}
  showGreeter(type){if(!this.loaded)return;if(!this.greeter){this.greeter=new T.Group();this.greeter.add(this.cloneCharacter());this.greeter.scale.setScalar(.26);this.greeter.position.set(3.45,0,-.7);const scarf=this.art.round(this.greeter,[0,2.95,.8],[1.9,.25,.35],'#b394b4');this.scene.add(this.greeter);}this.greeter.visible=true;this.greeter.userData.type=type;this.applyWardrobe();this.greeterUntil=this.time+4;}
  scoop(type){if(!this.loaded)return;this.craftScene?.feedback(type);if(!this.scoopProp){this.scoopProp=new T.Group();this.art.round(this.scoopProp,[.1,0,0],[.65,.08,.08],'#a5bbb3');this.art.ball(this.scoopProp,[.48,0,0],[.21,.09,.18],'#e2e9d7');this.staff.root.add(this.scoopProp);}this.scoopType=type;this.scoopStart=this.time;this.scoopUntil=this.time+.42;this.scoopProp.visible=true;}
  aimJoint(joint,end,target){joint.updateWorldMatrix(true,true);const origin=joint.getWorldPosition(new T.Vector3()),from=end.getWorldPosition(new T.Vector3()).sub(origin).normalize(),to=target.clone().sub(origin).normalize();if(from.lengthSq()<.5||to.lengthSq()<.5)return;const world=new T.Quaternion().setFromUnitVectors(from,to),parent=joint.parent.getWorldQuaternion(new T.Quaternion()),local=parent.clone().invert().multiply(world).multiply(parent);joint.quaternion.premultiply(local);joint.updateWorldMatrix(true,true);}
  reachHand(side,target,actor=this.staff){const end=actor.bones['Hand_'+side]?.bone,upper=actor.bones['UpperArm_'+side]?.bone,forearm=actor.bones['Forearm_'+side]?.bone;if(!end||!upper||!forearm)return;for(let i=0;i<5;i++){this.aimJoint(forearm,end,target);this.aimJoint(upper,end,target);}}
  protectCounter(a=this.staff){
    const b=this.business?{left:-3.5,right:2.4,back:-.12,front:5.13,top:1.44}:this.storeData.storeLevel===1?{left:-2.93,right:1.73,back:-.12,front:1.12,top:1.425}:this.storeData.storeLevel===2?{left:-3.4,right:2.3,back:-.16,front:1.12,top:1.44}:{left:-3.5,right:2.5,back:-.15,front:1.15,top:1.44};
    a.root.updateWorldMatrix(true,true);
    for(const side of ['L','R']){const hand=a.bones['Hand_'+side]?.bone;if(!hand)continue;const target=hand.getWorldPosition(new T.Vector3());let lift=0;for(const name of ['Hand','Thumb_Tip','Finger1_Tip','Finger2_Tip','Finger3_Tip']){const n=name.endsWith('_Tip')?name.replace('_Tip','_'+side+'_Tip'):name+'_'+side,p=a.model.getObjectByName(n)?.getWorldPosition(new T.Vector3());if(p&&p.x>b.left-.1&&p.x<b.right+.1&&p.z>b.back-.13&&p.z<b.front+.13)lift=Math.max(lift,b.top+.14-p.y);}if(lift>0){target.y+=lift;this.reachHand(side,target,a);}}
  }
  shake(direction,force){this.shakeDirection=direction;this.shakeForce=Math.max(this.shakeForce,force);}
  restoreBones(actor){if(!actor.overlaid)return;for(const {bone,base}of Object.values(actor.bones))bone.quaternion.copy(base);actor.overlaid=false;}
  pose(actor,name,x=0,y=0,z=0){const v=actor.bones[name];if(v)v.bone.quaternion.multiply(new T.Quaternion().setFromEuler(new T.Euler(x,y,z)));}
  smoothHead(actor,dt){
    actor.headMotion??=new Map();
    // Base animation and expression overlays remain separate from the final
    // displayed pose: smoothing must never accumulate back into the rig base.
    for(const name of ['Neck','Head']){const bone=actor.bones[name]?.bone;if(!bone)continue;let last=actor.headMotion.get(name);if(!last){last=bone.quaternion.clone();actor.headMotion.set(name,last);continue;}
      const angle=last.angleTo(bone.quaternion),elapsed=Math.max(0,Math.min(.1,dt)),rate=name==='Head'?.95:.65,alpha=Math.min(1-Math.exp(-elapsed*10),angle>1e-7?rate*elapsed/angle:1);last.slerp(bone.quaternion,alpha);bone.quaternion.copy(last);
    }
  }
  tick(dt) {
    this.needsRender=false;
    if(this.business!==(this.canvas.closest('#game')?.dataset.mode==='business'))this.resize();
    this.time+=dt;if(this.business&&this.loaded){const target=['making','shaking','perfect','ready'].includes(this.state)?1.025:1,next=this.camera.zoom+(target-this.camera.zoom)*(1-Math.exp(-dt*7));if(Math.abs(next-this.camera.zoom)>.00001){this.camera.zoom=next;this.camera.updateProjectionMatrix();this.craftScene?.projectTargets();}}if(!this.loaded){this.renderer.render(this.scene,this.camera);return;}
    for(const a of[this.staff,this.student]){this.restoreBones(a);a.mixer.update(dt);for(const v of Object.values(a.bones))v.base.copy(v.bone.quaternion);a.overlaid=true;}
    if(this.time>this.moodUntil&&this.mood!=='idle'){this.mood='idle';this.changeClip(this.staff,'Idle');}
    const a=this.staff,shake=this.state==='shaking',rest=this.state==='idle'||this.state==='between';
    a.root.position.y=rest?-.035+Math.sin(this.time*2)*.015:Math.sin(this.time*2.6)*.02;
    const bodyTilt=shake?this.shakeDirection*this.shakeForce*.14:Math.sin(this.time*1.5)*.014,tiltChange=(bodyTilt-a.root.rotation.z)*(1-Math.exp(-Math.max(0,dt)*18)),tiltLimit=1.2*Math.max(0,Math.min(.1,dt));a.root.rotation.z+=T.MathUtils.clamp(tiltChange,-tiltLimit,tiltLimit);
    a.root.position.x=(this.business?0:-.58)+(shake?this.shakeDirection*this.shakeForce*.08:0);
    a.root.rotation.x=rest?.025:0;a.root.position.z=this.business?BUSINESS_STAFF_Z:STAFF_Z;
    if(rest){this.pose(a,'Neck',.15);this.pose(a,'Head',.16,0,.08);this.pose(a,'UpperArm_L',-.12,0,-.04);this.pose(a,'UpperArm_R',-.12,0,.04);}
    if(['shaking','perfect','ready','delivering'].includes(this.state)){this.pose(a,'UpperArm_L',-.6,-.15,-.15);this.pose(a,'UpperArm_R',-.6,.15,.15);this.pose(a,'Forearm_L',-.45);this.pose(a,'Forearm_R',-.45);this.pose(a,'Head',-.06,0,-a.root.rotation.z*.5);}
    if(this.scoopProp){this.scoopProp.visible=this.time<this.scoopUntil;if(this.scoopProp.visible){const t=(this.scoopUntil-this.time)/.35;this.pose(a,'UpperArm_L',-.2,0,-.1);this.pose(a,'Forearm_L',-.12);this.scoopProp.rotation.z=Math.sin(t*Math.PI)*.25;}}
    if(this.mood==='confused'){this.pose(a,'Head',0,.05,.2);}
    if(this.customerType==='granny'){this.pose(this.student,'Head',.08,0,.08);}
    if(this.customerType==='connoisseur'){this.pose(this.student,'Head',.03,0,.05);}
    if(this.mood==='nervous'){this.pose(a,'Head',.025,Math.sin(this.time*2)*.012,0);}
    if(this.mood==='welcome'){this.pose(a,'UpperArm_L',-.5,0,-.2);this.pose(a,'Forearm_L',-.5,Math.sin(this.time*15)*.2,0);}
    this.shakeForce*=Math.exp(-dt*7);
    this.staffCup.rotation.z=shake?this.shakeDirection*this.shakeForce*.35:0;
    this.staffCup.position.z=this.state==='delivering'?1.15+Math.min(.3,(this.time-this.deliveryStart)*.6):1.15;
    if(['shaking','perfect','ready','delivering'].includes(this.state)){for(const side of ['L','R'])this.reachHand(side,a.root.localToWorld(new T.Vector3(side==='L'?-.27:.27,2.94,this.staffCup.position.z-.12)));}
    if(this.business&&this.craftScene){
      this.staffCup.visible=false;this.customerCup.visible=false;this.craftScene.tick(dt);
      if(['shaking','perfect','ready','delivering'].includes(this.state)){for(const side of ['L','R'])this.reachHand(side,this.craftScene.handTarget(side));}
      if(this.scoopProp?.visible&&this.state==='making'){
        const cup=this.craftScene.cup.position,t=Math.min(1,(this.time-this.scoopStart)/.42),source=this.craftScene.targets.get(this.scoopType)||cup;
        // Reach above the slab first, then travel from the container to the cup.
        const target=source.clone().lerp(cup.clone().add(new T.Vector3(0,1.08,0)),Math.max(0,(t-.18)/.82));target.y=Math.max(1.72,target.y)+Math.sin(t*Math.PI)*.2;
        this.reachHand('L',target);
      }
      if(['delivering','review'].includes(this.state))this.reachHand('L',this.craftScene.handTarget('R'),this.student);
    }
    this.protectCounter();if(this.student.root.visible)this.protectCounter(this.student);syncClosedEyes(this.staff.model);syncClosedEyes(this.student.model);
    if(this.scoopProp?.visible){const hand=a.bones.Hand_L.bone.getWorldPosition(new T.Vector3());this.scoopProp.position.copy(a.root.worldToLocal(hand)).add(new T.Vector3(.02,.04,.04));}
    if(this.customerMotion){const m=this.customerMotion,p=Math.min(1,(this.time-m.start)/m.duration),e=p*p*(3-2*p);this.student.root.position.x=m.from+(m.to-m.from)*e;this.student.root.position.z=(m.fromZ??SERVICE.z)+((m.toZ??SERVICE.z)-(m.fromZ??SERVICE.z))*e;this.student.root.position.y=Math.sin(p*Math.PI*8)*.035;this.studentShadow.position.set(this.student.root.position.x,.015,this.student.root.position.z);if(p>=1){this.customerMotion=null;this.changeClip(this.student,'Idle');if(m.to>5){this.student.root.visible=false;this.studentShadow.visible=false;}}}
    if(this.customerCup.visible){this.pose(this.student,'UpperArm_L',-.65);this.pose(this.student,'UpperArm_R',-.65);this.customerCup.position.y=2.05+Math.max(0,Math.sin(Math.min(1,(this.time-this.sipStart)/.55)*Math.PI))*.7;}
    for(const note of Object.values(this.customerNotes))note.visible=false;
    this.waitingActors.forEach(m=>{if(m.visible){const move=m.userData.motion;if(move){const p=Math.min(1,(this.time-move.start)/move.duration),e=p*p*(3-2*p);m.position.lerpVectors(move.from,move.to,e);if(p===1)m.userData.motion=null;}m.userData.mixer.update(dt);syncClosedEyes(m.children[0]);m.position.y=Math.sin(this.time*1.8)*.008;const talking=false;m.userData.mark.visible=false;m.userData.note.visible=talking;for(const label of[m.userData.mark,m.userData.note])label.quaternion.copy(m.quaternion).invert().multiply(this.camera.quaternion);}});if(this.seated.visible&&this.time>this.seatedUntil)this.seated.visible=false;this.shopArt.tick();
    this.smoothHead(this.staff,dt);this.smoothHead(this.student,dt);
    const garmentOptions={quality:this.quality==='saver'?'battery':'balanced',reducedMotion:this.storeData?.settings?.lowEffects===true||this.reducedMotion.matches};
    for(const actor of [this.staff,this.student])if(actor.root.visible)actor.clothes?.tick(dt,garmentOptions);
    for(const actor of [...this.waitingActors,this.seated,this.greeter])if(actor?.visible)actor.userData.clothes?.tick(dt,garmentOptions);
    if(this.greeter?.visible){this.greeter.rotation.z=Math.sin(this.time*4)*.025;if(this.time>this.greeterUntil)this.greeter.visible=false;}this.renderer.render(this.scene,this.camera);
  }
}
