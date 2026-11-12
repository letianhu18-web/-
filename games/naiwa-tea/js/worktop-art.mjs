import * as T from 'three';
import {finishes} from './growth-data.mjs';
import {drinkRecipes} from './data.mjs';
import {windowStreet} from './prop-detail.mjs';

// Small, reusable scene props. No gameplay state or ingredient rules live here.
export function drinkBarrel(host,id,level=1){
 const g=new T.Group(),a=host.art,milk=id==='milk',accent=level===3?'#367e6d':'#388d6a';
 a.cylinder(g,[0,.045,0],.29,.085,'#97ac94');
 const shell=new T.Mesh(new T.CylinderGeometry(.27,.27,.63,24,1,true),new T.MeshStandardMaterial({color:'#d5ebe0',transparent:true,opacity:.19,roughness:.22,depthWrite:false}));shell.position.y=.39;shell.renderOrder=3;g.add(shell);
 a.cylinder(g,[0,.28,0],.252,.42,milk?'#fff4d8':'#945220');
 a.cylinder(g,[0,.72,0],.30,.055,accent);a.round(g,[0,.78,0],[.15,.055,.075],accent);
 a.round(g,[0,.22,.3],[.11,.085,.14],accent);a.round(g,[0,.16,.355],[.075,.10,.055],'#4f8273');
 for(let i=0;i<4;i++)a.round(g,[.14,.27+i*.085,.237],[.065,.012,.015],'#f6f9e9');
 const mark=host.label(milk?'MILK':'TEA',.24,.1,'#fff7de','#496b54');mark.position.set(0,.52,.28);g.add(mark);
 if(level>1)a.ring(g,[0,.095,0],.275,.013,'#c5ad75').rotation.x=Math.PI/2;
 for(const y of[.065,.70])a.ring(g,[0,y,0],.274,.014,'#d3e4d1').rotation.x=Math.PI/2;
 for(const x of[-.285,.285]){const handle=a.ring(g,[x,.50,0],.092,.014,accent);handle.rotation.y=Math.PI/2;a.round(g,[x,.57,0],[.045,.12,.08],accent);}
 const nozzle=a.cylinder(g,[0,.155,.36],.038,.11,'#c1d0bc');nozzle.rotation.x=Math.PI/2;a.cylinder(g,[0,.12,.41],.024,.07,accent);a.round(g,[0,.27,.31],[.045,.11,.03],accent);
 if(level===3){const logo=host.label('蛙',.18,.16,'#fff2c5','#246455');logo.position.set(0,.39,.275);g.add(logo);}g.userData={equipment:id,level};return g;
}
export function iceBin(host,level=1){
 const g=new T.Group(),a=host.art,color=level===3?'#89bdae':'#b4cec2';
 a.round(g,[0,.13,0],[.67,.25,.66],color);a.round(g,[0,.28,0],[.70,.04,.69],'#f6f8ed');a.round(g,[0,.295,0],[.59,.025,.56],'#749c98');
 for(let i=0;i<9;i++){const m=a.round(g,[(i%3-1)*.17,.32+(i%2)*.035,(Math.floor(i/3)-1)*.17],[.15,.13,.14],i%2?'#d0f2ed':'#e0f8f6');m.rotation.y=i*.48;}
 const lid=a.round(g,[0,.52,-.34],[.67,.44,.035],color);lid.rotation.x=-.18;
 a.round(g,[0,.07,.36],[.29,.06,.06],'#6a9b8c');for(const x of[-.26,.26])a.round(g,[x,.11,.34],[.03,.12,.02],'#7da797');for(let i=0;i<4;i++)a.round(g,[.351,.13+i*.025,0],[.01,.009,.27],'#6f9388');a.round(g,[0,.52,-.308],[.52,.32,.015],'#d8eeea');g.userData.level=level;return g;
}
export class WorktopArt{
 constructor(host){
  this.h=host;this.root=new T.Group();this.root.name='Tea shop service window';host.scene.add(this.root);
 }
 layout(craft){this.craft=craft;}
 text(text,w,h,background,ink){
  const canvas=document.createElement('canvas');canvas.width=Math.round(256*w/h);canvas.height=256;const ctx=canvas.getContext('2d');ctx.fillStyle=background;ctx.fillRect(0,0,canvas.width,256);ctx.fillStyle=ink;ctx.font='bold 190px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,canvas.width/2,137,canvas.width*.93);
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;const mesh=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:texture}));this.root.add(mesh);return mesh;
 }
 build(data){
  // Only rebuild on store/finish changes. The backdrop never participates in material hit tests.
  this.root.traverse(o=>{if(o.isMesh&&o.material?.map){o.material.map.dispose();o.material.dispose();o.geometry.dispose();}});this.root.clear();
  const a=this.h.art,L=data.storeLevel,indoor=L>=3,accent=indoor?'#39765e':L===2?'#348b72':'#40866b',wood=indoor?'#ae8057':'#b78b61';
  this.wall=a.round(this.root,[0,2.4,-4.3],[7,4.8,.12],indoor?finishes.wall[data.wallpaper].color:'#ecd7b1');
  a.round(this.root,[0,1.13,-4.15],[7,2.1,.15],L>=4?'#58846d':'#80a990');
  a.round(this.root,[0,2.14,-4.02],[7,.08,.16],wood);
  if(indoor&&data.wallpaper==='wood')for(let i=-5;i<=5;i++)a.round(this.root,[i*.5,3.2,-4.19],[.016,2,.025],'#c1a07d');
  // Continuous framing makes this a shop counter, rather than an isolated mixing tray.
  for(const x of[-2.08,2.08])a.round(this.root,[x,2.65,-3.92],[.12,3.05,.14],accent);
  a.round(this.root,[0,4.09,-3.86],[4.30,.13,.48],accent);
  if(!indoor){
   for(let i=0;i<14;i++)a.round(this.root,[-2.06+i*.316,3.97,-3.57],[.31,.22,.12],i%2?'#fff1cf':accent);
  }else{
   for(const x of[-1.82,1.82]){a.round(this.root,[x,3.78,-3.72],[.025,.38,.025],'#98754e');a.ball(this.root,[x,3.55,-3.70],[.14,.09,.10],'#ffe2a0');}
  }
  const signColor=finishes.sign[data.sign].color;
  this.signFrame=a.round(this.root,[0,3.54,-3.92],[3.00,.45,.10],data.sign==='wood'?accent:signColor);
  this.sign=this.text('奶蛙奶茶铺',2.83,.38,data.sign==='wood'?accent:signColor,'#fff3ca');this.sign.position.set(0,3.54,-3.855);
  this.tagline=this.text('来杯好茶，摇一摇',2.52,.26,indoor?finishes.wall[data.wallpaper].color:'#ecd7b1','#45674e');this.tagline.position.set(0,3.13,-4.015);
  this.shortTaglines=['来杯好茶','摇一摇'].map((text,i)=>{const m=this.text(text,.96,.18,indoor?finishes.wall[data.wallpaper].color:'#ecd7b1','#45674e');m.position.set(-1.45,2.70-i*.22,-4.015);return m;});
  // A real menu board and street window flank the staff; the centre stays quiet.
  const menuStart=this.root.children.length;
  a.round(this.root,[-1.48,2.59,-3.97],[1.04,1.20,.10],wood);
  a.round(this.root,[-1.48,2.60,-3.9],[.93,1.09,.04],'#315d4c');
  const menuTitle=this.text('今日好茶',.83,.18,'#315d4c','#fff0bd');menuTitle.position.set(-1.48,2.99,-3.865);
  ['pearlMilkTea','taroMilkTea','strawberryMilkTea'].forEach((id,i)=>{
   const x=-1.77+i*.29,y=2.61,z=-3.81,color=['#c28f54','#b592c5','#e79ba7'][i];
   a.cylinder(this.root,[x,y,z],.092,.25,color);a.cylinder(this.root,[x,y+.14,z],.10,.025,'#f7eac8');a.round(this.root,[x+.02,y+.23,z],[.018,.17,.018],'#ecd998');
   if(i===0)for(let j=0;j<3;j++)a.ball(this.root,[x+(j-1)*.042,y-.08,z+.08],[.025,.025,.025],'#443324');
   const price=this.text(String(drinkRecipes[id].price),.21,.14,'#315d4c','#fce7ad');price.position.set(x,2.27,-3.79);
  });
  this.menuParts=this.root.children.slice(menuStart);for(const m of this.menuParts)m.userData.backdropY=m.position.y;
  a.round(this.root,[1.48,2.65,-4.04],[1.10,1.32,.11],wood);
  windowStreet(this.h,this.root);
  for(const x of[.94,1.48,2.02])a.round(this.root,[x,2.65,-3.82],[.045,1.33,.075],'#f4e2bb');
  for(const y of[2.00,2.68,3.30])a.round(this.root,[1.48,y,-3.81],[1.14,.045,.075],'#f4e2bb');
  a.round(this.root,[1.48,1.96,-3.77],[1.21,.07,.26],wood);
  if(L>=2)for(const x of[-1.98,1.98])a.ball(this.root,[x,3.89,-3.47],[.038,.045,.04],'#ffe6ac');
  if(L>=4){for(const y of[3.46,4.21])a.round(this.root,[0,y,-3.80],[4.3,.035,.08],'#d6b365');}
  this.root.userData={storeLevel:L,wallpaper:data.wallpaper,sign:data.sign,tagline:'来杯好茶，摇一摇'};
 }
 fit(){
  // This is a scenic backdrop, not a wall through the customer lane. Moving it
  // along the orthographic camera ray preserves its screen composition while
  // putting every wall, window and sign behind the full five-person queue.
  this.root.position.copy(this.h.camera.getWorldDirection(new T.Vector3())).multiplyScalar(8.6);
  const r=this.h.canvas.getBoundingClientRect(),compact=r.height/r.width<1.3;
  this.tagline.visible=!compact;for(const m of this.shortTaglines)m.visible=compact;
  for(const m of this.menuParts)m.position.y=m.userData.backdropY-(compact?.82:0);
  let offset=0;if(compact){const p=new T.Vector3(0,3.54,-3.855).project(this.h.camera),q=new T.Vector3(0,4.54,-3.855).project(this.h.camera);offset=(14-(1-p.y)*r.height/2)/((p.y-q.y)*r.height/2);}
  this.sign.position.y=this.signFrame.position.y=3.54+offset;this.sign.scale.y=this.signFrame.scale.y=compact?.63:1;
 }
 tick(active){this.root.visible=active;if(!active)return;const d=this.h.storeData,key=[d.storeLevel,d.wallpaper,d.sign].join(':');if(key!==this.key){this.build(d);this.key=key;}this.fit();}
}
