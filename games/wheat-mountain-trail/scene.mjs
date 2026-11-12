import * as THREE from './assets/three.module.js';
import { roadX, roadY, roadHeading, clamp, ROAD_HALF_WIDTH, TOTAL_DISTANCE } from './physics.mjs';

const V = (x=0,y=0,z=0) => new THREE.Vector3(x,y,z);
function rng(seed) { let n=(seed|0)^0x5f3759df;return()=>{n^=n<<13;n^=n>>>17;n^=n<<5;return(n>>>0)/4294967296;}; }
const mat=(color,flat=false)=>new THREE.MeshStandardMaterial({color,roughness:.92,flatShading:flat});
const M={skin:mat('#ddb08a'),cheek:mat('#d5a07b'),hair:mat('#242626'),eye:mat('#302e27'),mouth:mat('#a56552'),white:mat('#efe4ce'),cloth:mat('#77816c'),seam:mat('#5b6857'),shoe:mat('#34372e'),wood:mat('#98703a'),wicker:mat('#ad7b3b'),weave:mat('#d1a352'),rope:mat('#dfc698'),wheat:mat('#ddb34c'),kernel:mat('#f3ce6e'),leaf:mat('#d6a83b')};
const sphere=new THREE.SphereGeometry(1,20,14);
const kernelGeometry=new THREE.SphereGeometry(1,7,5);
const box=new THREE.BoxGeometry(1,1,1);
const ball=(parent,material,pos,scale)=>mesh(parent,sphere,material,pos,scale);
function mesh(parent,geo,material,pos=[0,0,0],scale=[1,1,1]){const o=new THREE.Mesh(geo,material);o.position.set(...pos);o.scale.set(...scale);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
function rod(parent,a,b,r,material,sides=8){const p=V(...a),q=V(...b),d=q.clone().sub(p);const o=mesh(parent,new THREE.CylinderGeometry(r,r,d.length(),sides),material);o.position.copy(p.add(q).multiplyScalar(.5));o.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());return o;}
function curve(parent,points,r,material){return mesh(parent,new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>V(...p))),Math.max(8,points.length*4),r,6,false),material);}
function roundedBox(w,h,d,r=.05){const s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);const g=new THREE.ExtrudeGeometry(s,{depth:d-2*r,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:r*.5,bevelThickness:r,curveSegments:4});g.translate(0,0,-d/2+r);return g;}

// Merge static model parts per material to keep the hand-built 3D character light on phones.
function mergeStatic(root){
  root.updateMatrixWorld(true);const inv=root.matrixWorld.clone().invert(),sets=new Map(),old=[];
  root.traverse(o=>{if(o.isMesh&&!o.isInstancedMesh){const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(inv.clone().multiply(o.matrixWorld));if(!sets.has(o.material))sets.set(o.material,{p:[],n:[]});const set=sets.get(o.material);set.p.push(...g.attributes.position.array);set.n.push(...g.attributes.normal.array);g.dispose();old.push(o);}});
  old.forEach(o=>o.removeFromParent());
  for(const [material,set] of sets){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(set.p,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(set.n,3));mesh(root,g,material);}
}

// The original portrait is projected onto a closed, sculpted head, not a flat card.
// Pixel landmarks come from Xi_Jinping_2019.jpg, Adnilton Farias/VPR, CC BY 2.0.
const PORTRAIT_ROWS=[[46,271,287],[55,221,335],[75,183,363],[105,153,397],[140,132,423],[175,125,428],[215,132,424],[252,137,423],[286,135,426],[325,140,423],[351,146,404],[385,156,395],[420,176,376],[451,204,346],[476,231,311],[489,253,285],[493,270,271]];
export function makePortraitHead(texture){
  const positions=[],uv=[],indices=[],groups=[],rings=96,sides=112;
  const materials=[new THREE.MeshStandardMaterial({map:texture,color:'#dfdfdf',roughness:1,emissiveMap:texture,emissive:'#ffffff',emissiveIntensity:.15}),mat('#b98466'),mat('#30312e')];
  for(let j=0;j<=rings;j++){
    const py=46+j/rings*447;let k=0;while(k<PORTRAIT_ROWS.length-2&&py>PORTRAIT_ROWS[k+1][0])k++;
    const a=PORTRAIT_ROWS[k],b=PORTRAIT_ROWS[k+1],t=(py-a[0])/(b[0]-a[0]);const left=THREE.MathUtils.lerp(a[1],b[1],t),right=THREE.MathUtils.lerp(a[2],b[2],t),center=(left+right)/2,half=(right-left)/2;
    const y=(285-py)*.00227,depth=.155+.115*Math.sin(j/rings*Math.PI);
    for(let i=0;i<=sides;i++){
      const angle=i/sides*Math.PI*2,front=Math.max(0,Math.cos(angle)),px=center+Math.sin(angle)*half,x=(px-270)*.00248;
      const bump=(cx,cy,rx,ry,h)=>h*Math.exp(-(((px-cx)/rx)**2+((py-cy)/ry)**2));
      const nose=bump(253,345,23,22,.134)+bump(255,310,13,45,.055)+bump(230,352,15,12,.031)+bump(275,352,15,12,.026);
      const eyes=bump(201,283,25,13,-.022)+bump(308,283,25,13,-.022);
      const cheeks=bump(186,339,33,42,.026)+bump(337,337,35,45,.026);
      const mouth=bump(254,405,44,18,.024);
      positions.push(x,y,Math.cos(angle)*depth+(nose+eyes+cheeks+mouth)*front**3);
      uv.push(px/553,1-py/739);
    }
  }
  for(let j=0;j<rings;j++)for(let i=0;i<sides;i++){
    const a=j*(sides+1)+i,b=a+sides+1,start=indices.length;
    indices.push(a,b,a+1,b,b+1,a+1);
    const front=Math.cos((i+.5)/sides*Math.PI*2)>0;
    groups.push({start,count:6,materialIndex:front?0:(46+(j+.5)/rings*447<246?2:1)});
  }
  for(const [row,materialIndex]of [[0,2],[rings,1]]){
    const center=positions.length/3,py=46+row/rings*447;positions.push(((row===0?279:270.5)-270)*.00248,(285-py)*.00227,0);uv.push((row===0?279:270.5)/553,1-py/739);
    for(let i=0;i<sides;i++){const a=row*(sides+1)+i,b=a+1,start=indices.length;indices.push(center,...(row===0?[a,b]:[b,a]));groups.push({start,count:3,materialIndex});}
  }
  // Consolidate index groups to keep this textured model at three draw calls.
  const sorted=[],geo=new THREE.BufferGeometry();
  for(let m=0;m<3;m++){const start=sorted.length;for(const g of groups)if(g.materialIndex===m)for(let n=0;n<g.count;n++)sorted.push(indices[g.start+n]);geo.addGroup(start,sorted.length-start,m);}
  geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(sorted);geo.computeVertexNormals();
  const root=new THREE.Group();const face=new THREE.Mesh(geo,materials);face.castShadow=true;face.receiveShadow=true;root.add(face);return root;
}

function makeBasket(){
  const root=new THREE.Group(),weaving=new THREE.Group();root.add(weaving);
  mesh(weaving,new THREE.CylinderGeometry(.43,.315,.64,20,1,true),M.wicker,[0,-.31,0]);
  mesh(weaving,new THREE.CylinderGeometry(.317,.317,.045,20),M.wood,[0,-.63,0]);
  for(let i=0;i<11;i++){
    const y=-.61+i*.058,rad=.32+(y+.61)/.61*.11;
    const ring=mesh(weaving,new THREE.TorusGeometry(rad,.017,5,24),i%3?M.weave:M.wood,[0,y,0]);ring.rotation.x=Math.PI/2;
  }
  for(let i=0;i<22;i++){const a=i*Math.PI/11;rod(weaving,[Math.cos(a)*.318,-.61,Math.sin(a)*.318],[Math.cos(a)*.432,.01,Math.sin(a)*.432],.012,M.weave,5);}
  const rim=mesh(weaving,new THREE.TorusGeometry(.435,.035,6,28),M.weave);rim.rotation.x=Math.PI/2;
  mergeStatic(weaving);
  const grain=new THREE.Group();root.add(grain);ball(grain,M.wheat,[0,-.02,0],[.405,.18,.405]);
  const r=rng(1829);
  for(let i=0;i<31;i++){
    const a=i*2.39996,rad=Math.sqrt(r())*.36,x=Math.cos(a)*rad,z=Math.sin(a)*rad,h=.17+r()*.22,bend=(r()-.5)*.09;
    rod(grain,[x,-.035,z],[x+bend,h,z],.006,M.leaf,4);
    for(let j=0;j<4;j++)for(const side of [-1,1]){const k=mesh(grain,kernelGeometry,M.kernel,[x+bend+side*.014,h-.045+j*.029,z],[.018,.04,.018]);k.rotation.z=-side*.55;}
  }
  mergeStatic(grain);
  root.userData.grain=grain;return root;
}

export function makeCharacter(portraitTexture=null){
  const root=new THREE.Group(),lean=new THREE.Group();root.add(lean);
  const torso=new THREE.Group();lean.add(torso);
  mesh(torso,roundedBox(.67,.77,.4,.065),M.cloth,[0,1.31,0]);
  ball(torso,M.cloth,[0,1.63,-.005],[.375,.17,.215]);
  mesh(torso,box,M.seam,[0,1.3,.224],[.015,.64,.012]);
  for(let i=0;i<5;i++)ball(torso,M.shoe,[.018,1.56-i*.124,.24],[.014,.014,.008]);
  for(const s of [-1,1]){
    mesh(torso,roundedBox(.21,.17,.018,.014),M.seam,[s*.182,1.38,.229]);
    mesh(torso,box,M.cloth,[s*.182,1.436,.245],[.212,.044,.013]);
    ball(torso,M.shoe,[s*.182,1.431,.256],[.012,.009,.006]);
    mesh(torso,roundedBox(.24,.15,.018,.015),M.cloth,[s*.18,1.064,.225]);
    rod(torso,[s*.35,1.56,0],[s*.53,1.29,.07],.105,M.cloth,12);
    rod(torso,[s*.53,1.29,.07],[s*.68,1.68,.16],.091,M.cloth,12);
    ball(torso,M.skin,[s*.69,1.716,.147],[.079,.093,.079]);
    const collar=mesh(torso,box,M.cloth,[s*.111,1.704,.13],[.15,.12,.12]);collar.rotation.z=s*.17;
  }
  mesh(torso,new THREE.CylinderGeometry(.14,.15,.21,16),M.skin,[0,1.76,0]);
  mergeStatic(torso);
  const head=makePortraitHead(portraitTexture);head.position.set(0,2.12,.008);lean.add(head);
  const legs=[];
  for(const s of [-1,1]){
    const hip=new THREE.Group();hip.position.set(s*.175,.93,0);lean.add(hip);
    rod(hip,[0,-.015,0],[0,-.43,0],.135,M.seam,12);
    rod(hip,[0,-.4,0],[0,-.78,0],.106,M.seam,12);
    mesh(hip,roundedBox(.23,.14,.39,.06),M.shoe,[0,-.845,.09]);mergeStatic(hip);legs.push(hip);
  }
  const load=new THREE.Group();load.position.set(0,1.78,-.075);lean.add(load);
  const beam=new THREE.Group();load.add(beam);
  curve(beam,[[-1.64,.14,0],[-.92,.036,0],[0,0,0],[.92,.036,0],[1.64,.14,0]],.049,M.wood);
  for(const x of [-1.48,1.48])for(let i=0;i<3;i++){const ring=mesh(beam,new THREE.TorusGeometry(.051,.009,5,12),M.rope,[x+i*.018,.115,0]);ring.rotation.y=Math.PI/2;}
  mergeStatic(beam);
  const baskets=[];
  for(const side of [-1,1]){
    const hanger=new THREE.Group();hanger.position.set(side*1.48,.11,0);load.add(hanger);
    const ropes=new THREE.Group();hanger.add(ropes);
    for(const z of [-.3,.3])curve(ropes,[[0,0,0],[0,-.36,z*.55],[0,-.81,z]],.014,M.rope);
    mergeStatic(ropes);
    const basket=makeBasket();basket.position.y=-.8;hanger.add(basket);baskets.push({hanger,basket,side});
  }
  return {root,lean,head,load,legs,baskets};
}

const offsets=[-54,-34,-24,-16,-10,-6.2,-ROAD_HALF_WIDTH,ROAD_HALF_WIDTH,5.7,8.5,14,25,40,60];
const heights=[12,18,13,7.5,3.6,1.25,0,0,-2.9,-6.3,-10,-14,-12,-9];
function groundHeight(x,z){let i=0;while(i<offsets.length-2&&x>offsets[i+1])i++;const p=clamp((x-offsets[i])/(offsets[i+1]-offsets[i]),0,1);return roadY(z)+THREE.MathUtils.lerp(heights[i],heights[i+1],p)+Math.sin(z*.107+x*.37)*Math.min(Math.max(Math.abs(x)-ROAD_HALF_WIDTH,0),10)*.17;}

function surfaceGeometry(start,kind){
  const pos=[],cols=[],palette=kind==='road'?['#bbaa7c','#c6b58b','#b7a679','#cdbc94']:['#4a7048','#547b4a','#66834e','#456b46','#789158'];
  const xs=kind==='road'?[-ROAD_HALF_WIDTH,-1.36,1.36,ROAD_HALF_WIDTH]:offsets;
  const n=kind==='road'?12:6,step=18/n;
  const color=new THREE.Color();
  function vertex(i,j){const z=start+i*step,x=xs[j];return [roadX(z)+x,kind==='road'?roadY(z)+.032:groundHeight(x,z),z-start];}
  for(let i=0;i<n;i++)for(let j=0;j<xs.length-1;j++){
    const a=vertex(i,j),b=vertex(i+1,j),c=vertex(i,j+1),d=vertex(i+1,j+1);
    const hash=Math.abs(Math.floor(start/3)+i*13+j*7);
    for(const [k,tri]of [[0,[a,b,c]],[1,[b,d,c]]]){
      color.set(palette[(hash+k)%palette.length]);if(kind!=='road'&&j>=7&&j<11)color.lerp(new THREE.Color('#6e7764'),.5);
      for(const p of tri){pos.push(...p);cols.push(color.r,color.g,color.b);}
    }
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));geo.computeVertexNormals();return geo;
}

function makeChunk(){
  const root=new THREE.Group(),surface=new THREE.MeshStandardMaterial({vertexColors:true,flatShading:true,roughness:1});
  const ground=mesh(root,new THREE.BufferGeometry(),surface),road=mesh(root,new THREE.BufferGeometry(),surface);ground.castShadow=road.castShadow=false;
  const rocks=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,0),mat('#929180',true),22);rocks.castShadow=true;rocks.receiveShadow=true;root.add(rocks);
  const crowns=new THREE.InstancedMesh(new THREE.ConeGeometry(1,2,6),mat('#2f5a3f',true),16);crowns.castShadow=true;root.add(crowns);
  const trunks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.065,.10,1,5),mat('#736143'),8);trunks.castShadow=true;root.add(trunks);
  const grass=new THREE.InstancedMesh(new THREE.ConeGeometry(.1,.48,3),mat('#9eae63',true),28);root.add(grass);
  const o=new THREE.Object3D();
  function place(inst,i,x,y,z,sx,sy,sz,ry=0){o.position.set(x,y,z);o.rotation.set(0,ry,0);o.scale.set(sx,sy,sz);o.updateMatrix();inst.setMatrixAt(i,o.matrix);}
  const set=start=>{
    root.position.z=start;ground.geometry.dispose();road.geometry.dispose();ground.geometry=surfaceGeometry(start,'ground');road.geometry=surfaceGeometry(start,'road');
    const random=rng(start*31+553);
    for(let i=0;i<22;i++){const z=start+random()*18,side=i%2?1:-1,x=side*(ROAD_HALF_WIDTH+.12+random()*.6),s=.07+random()*.19;place(rocks,i,roadX(z)+x,groundHeight(x,z)+s*.25,z-start,s,s*.6,s*.8,random()*6.28);}
    for(let i=0;i<8;i++){
      const z=start+random()*18,x=-ROAD_HALF_WIDTH-1.2-random()*9,y=groundHeight(x,z),h=.85+random()*1.35;
      place(trunks,i,roadX(z)+x,y+h*.38,z-start,h,h,h);
      place(crowns,i*2,roadX(z)+x,y+h*.93,z-start,h*.63,h*.7,h*.63,random());
      place(crowns,i*2+1,roadX(z)+x,y+h*1.48,z-start,h*.44,h*.55,h*.44,random());
    }
    for(let i=0;i<28;i++){const z=start+random()*18,x=(i%3===0?1:-1)*(ROAD_HALF_WIDTH+.04+random()*.85);place(grass,i,roadX(z)+x,groundHeight(x,z)+.12,z-start,.8+random(),.45+random()*.55,.8+random(),random()*6.28);}
    for(const instance of [rocks,crowns,trunks,grass]){instance.instanceMatrix.needsUpdate=true;instance.computeBoundingSphere();}
  };
  return {root,set,index:null};
}

function makeSign(){
  const root=new THREE.Group();rod(root,[0,0,0],[0,1.25,0],.055,M.wood);
  mesh(root,roundedBox(.75,.44,.085,.015),M.wood,[0,1.12,0]);
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=128;const ctx=canvas.getContext('2d');
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  const face=mesh(root,new THREE.PlaneGeometry(.69,.37),new THREE.MeshBasicMaterial({map:texture,transparent:true,side:THREE.DoubleSide}),[0,1.12,.046]);face.castShadow=false;
  const set=mark=>{ctx.clearRect(0,0,256,128);ctx.fillStyle='#fff1c7';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 38px sans-serif';ctx.fillText(mark===0?'扛麦起点':`${mark/500} 里`,128,48);ctx.font='20px sans-serif';ctx.fillStyle='#edd5a5';ctx.fillText(mark===TOTAL_DISTANCE?'到达终点':'全程十里',128,93);texture.needsUpdate=true;const side=-ROAD_HALF_WIDTH-.45;root.position.set(roadX(mark)+side,groundHeight(side,mark),mark);root.rotation.y=.3;};
  return {root,set,mark:null};
}

function labelTexture(text,bg='#9a3730',color='#fff3cc',width=512,height=128){
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const c=canvas.getContext('2d');c.fillStyle=bg;c.fillRect(0,0,width,height);c.strokeStyle=color;c.lineWidth=5;c.strokeRect(9,9,width-18,height-18);c.textAlign='center';c.textBaseline='middle';c.fillStyle=color;c.font=`bold ${height*.48}px sans-serif`;c.fillText(text,width/2,height*.53,width-34);const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}

export function makeBunModel(){
  const root=new THREE.Group(),dough=mat('#fff0cd'),creases=mat('#dbcaa7');
  ball(root,dough,[0,.01,0],[.32,.237,.32]);
  ball(root,dough,[0,.183,0],[.112,.081,.112]);
  for(let i=0;i<10;i++){
    const a=i/10*Math.PI*2;
    curve(root,[[Math.cos(a)*.28,.08,Math.sin(a)*.28],[Math.cos(a+.1)*.19,.183,Math.sin(a+.1)*.19],[Math.cos(a+.22)*.075,.244,Math.sin(a+.22)*.075]],.009,creases);
  }
  mergeStatic(root);return root;
}

function makeCourseModels(){
  const log=new THREE.Group(),bark=mat('#825333'),cut=mat('#dbb174');
  rod(log,[-3.8,.25,0],[3.8,.25,0],.25,bark,14);
  for(const side of [-1,1]){
    const end=mesh(log,new THREE.CylinderGeometry(.22,.22,.014,16),cut,[side*3.809,.25,0]);end.rotation.z=Math.PI/2;
    const ring=mesh(log,new THREE.TorusGeometry(.118,.009,4,18),bark,[side*3.818,.25,0]);ring.rotation.y=Math.PI/2;
  }
  for(let i=0;i<6;i++)rod(log,[-3.5,.25+Math.sin(i)*.245,Math.cos(i)*.245],[3.5,.25+Math.sin(i)*.245,Math.cos(i)*.245],.012,M.wood,5);
  for(let i=0;i<12;i++)mesh(log,box,M.kernel,[-3.45+i*.63,.013,-.66],[.30,.019,.11]);
  mergeStatic(log);
  const rock=new THREE.Group();mesh(rock,new THREE.IcosahedronGeometry(1,0),mat('#73776b',true),[0,.31,0],[.61,.345,.48]);
  for(let i=0;i<3;i++)mesh(rock,box,M.kernel,[-.48+i*.48,.014,-.76],[.25,.02,.10]);mergeStatic(rock);
  const bun=new THREE.Group(),body=makeBunModel();body.name='bun-body';bun.add(body);
  const label=mesh(bun,new THREE.PlaneGeometry(.93,.24),new THREE.MeshBasicMaterial({map:labelTexture('庆丰包子'),side:THREE.DoubleSide}),[0,.57,0]);label.name='bun-label';label.castShadow=false;
  const halo=mesh(bun,new THREE.TorusGeometry(.43,.016,5,26),new THREE.MeshBasicMaterial({color:'#f6cd58'}),[0,-.28,0]);halo.rotation.x=Math.PI/2;halo.castShadow=false;
  return {log,rock,bun};
}

function makeFinish(){
  const root=new THREE.Group(),red=mat('#a34232'),gold=mat('#e7bd64');
  for(const side of [-1,1]){
    rod(root,[side*4.5,0,0],[side*4.5,4.7,0],.13,red,12);
    ball(root,gold,[side*4.5,4.78,0],[.18,.18,.18]);
  }
  mesh(root,box,red,[0,4.22,0],[9.1,.78,.13]);
  const text=mesh(root,new THREE.PlaneGeometry(8.7,.68),new THREE.MeshBasicMaterial({map:labelTexture('十里山路 · 终点','#9d3c30','#fff2be',1024,128)}),[0,4.22,-.073]);text.rotation.y=Math.PI;
  for(let row=0;row<2;row++)for(let i=0;i<20;i++)mesh(root,box,(i+row)%2?M.white:M.seam,[-3.9+i*.41,.046,row*.4-.2],[.41,.035,.4]);
  root.position.set(roadX(TOTAL_DISTANCE),roadY(TOTAL_DISTANCE),TOTAL_DISTANCE);root.rotation.y=roadHeading(TOTAL_DISTANCE);return root;
}

export async function makeWorld(canvas){
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.04;
  const scene=new THREE.Scene();scene.background=new THREE.Color('#bfceac');scene.fog=new THREE.FogExp2('#bfd0b1',.0125);
  const camera=new THREE.PerspectiveCamera(42,1,.1,320);
  scene.add(new THREE.HemisphereLight('#fff1cb','#466a49',2.2));
  const sun=new THREE.DirectionalLight('#ffe8b0',3.2);sun.position.set(-8,13,6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-8;sun.shadow.camera.right=8;sun.shadow.camera.top=8;sun.shadow.camera.bottom=-8;sun.shadow.camera.near=.5;sun.shadow.camera.far=42;sun.shadow.normalBias=.035;sun.shadow.bias=-.00025;scene.add(sun,sun.target);
  const portraitTexture=await new THREE.TextureLoader().loadAsync(new URL('./assets/xi-reference.jpg',import.meta.url).href);portraitTexture.colorSpace=THREE.SRGBColorSpace;portraitTexture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
  const char=makeCharacter(portraitTexture);scene.add(char.root);
  const courseModels=makeCourseModels(),courseVisuals=new Map(),finish=makeFinish();scene.add(finish);finish.visible=false;
  const sparkleMaterial=new THREE.MeshBasicMaterial({color:'#ffd365',transparent:true,opacity:1});
  const sparkle=mesh(scene,new THREE.TorusGeometry(.5,.025,5,32),sparkleMaterial);sparkle.visible=false;sparkle.castShadow=false;
  let sparkleLife=0;
  function pickup(event){sparkle.position.set(roadX(event.z)-event.x,roadY(event.z)+.75,event.z);sparkle.scale.setScalar(1);sparkleLife=.65;sparkle.visible=true;}
  const chunks=Array.from({length:11},()=>{const c=makeChunk();scene.add(c.root);return c;});
  const backdrop=new THREE.Group();scene.add(backdrop);
  const random=rng(836);
  for(let i=0;i<27;i++){
    const a=i/27*Math.PI*2,r=65+random()*42,h=20+random()*39;
    const mountain=mesh(backdrop,new THREE.ConeGeometry(1,1,5+Math.floor(random()*3)),mat(i%3===0?'#62866a':i%3===1?'#789777':'#50765c',true),[Math.cos(a)*r,-17+h*.5,Math.sin(a)*r],[15+random()*15,h,17+random()*19]);mountain.rotation.y=random()*5;mountain.castShadow=false;
  }
  const cloudMat=new THREE.MeshStandardMaterial({color:'#ebebcd',roughness:1,flatShading:true});
  for(let i=0;i<12;i++){const a=i/12*6.283;const cloud=mesh(backdrop,new THREE.IcosahedronGeometry(1,1),cloudMat,[Math.cos(a)*100,21+random()*20,Math.sin(a)*100],[12+random()*8,1.6+random()*2,4+random()*3]);cloud.castShadow=false;}
  const signs=[makeSign(),makeSign(),makeSign()];signs.forEach(s=>scene.add(s.root));
  const grainGeo=new THREE.SphereGeometry(1,6,4),particles=new THREE.InstancedMesh(grainGeo,M.kernel,110);particles.castShadow=true;particles.visible=false;scene.add(particles);
  const pstate=[],dummy=new THREE.Object3D(),target=new THREE.Vector3(),cameraGoal=new THREE.Vector3(),look=new THREE.Vector3();
  let width=1,height=1,mobile=false,lastMode='',cameraReady=false,fallAngle=0,spillStarted=false;
  function resize(){width=canvas.clientWidth;height=canvas.clientHeight;mobile=width<701;renderer.setSize(width,height,false);camera.aspect=width/height;camera.fov=mobile?54:44;camera.updateProjectionMatrix();}
  resize();
  function reset(){spillStarted=false;particles.visible=false;sparkle.visible=false;sparkleLife=0;char.baskets.forEach(b=>b.basket.userData.grain.visible=true);for(const v of courseVisuals.values())v.root.removeFromParent();courseVisuals.clear();}
  function startSpill(state){
    spillStarted=true;fallAngle=state.angle;particles.visible=true;char.root.updateMatrixWorld(true);pstate.length=0;
    const r=rng(Math.floor(state.distance*73)+18);
    char.baskets.forEach(b=>b.basket.userData.grain.visible=false);
    for(let i=0;i<110;i++){
      const b=char.baskets[i%2].basket,p=b.getWorldPosition(new THREE.Vector3());p.y+=.17;p.x+=(r()-.5)*.5;p.z+=(r()-.5)*.5;
      pstate.push({p,v:V((r()-.5)*2.7-state.fallDirection*2.5,1.3+r()*3.2,(r()-.5)*3),spin:r()*6,scale:.02+r()*.019});
    }
  }
  function render(state,mode,clock,dt,fallTime=0){
    const z=state.distance,y=roadY(z),x=roadX(z),ready=mode==='ready'||mode==='loading',falling=mode==='falling'||mode==='over',won=mode==='won',trip=falling&&state.fallCause==='obstacle';
    const startChunk=Math.floor(z/18)-3;
    for(let i=0;i<chunks.length;i++){const idx=startChunk+i,c=chunks[((idx%chunks.length)+chunks.length)%chunks.length];if(c.index!==idx){c.set(idx*18);c.index=idx;}}
    const baseMark=Math.max(0,Math.floor(z/500)*500);
    signs.forEach((s,i)=>{const mark=baseMark+i*500;s.root.visible=mark<=TOTAL_DISTANCE;if(mark!==s.mark){s.set(mark);s.mark=mark;}});
    finish.visible=TOTAL_DISTANCE-z<140;
    const visibleIds=new Set();
    for(let i=Math.max(0,state.courseCursor-6);i<state.course.length;i++){
      const item=state.course[i];if(item.z>z+105)break;if(item.z<z-14||item.collected)continue;visibleIds.add(item.id);
      let visual=courseVisuals.get(item.id);
      if(!visual){const root=courseModels[item.type].clone(true);scene.add(root);visual={root,label:root.getObjectByName('bun-label'),body:root.getObjectByName('bun-body')};courseVisuals.set(item.id,visual);}
      visual.root.position.set(roadX(item.z)-item.x,roadY(item.z)+.07+(item.type==='bun'?.65+Math.sin(clock*3+item.z)*.07:0),item.z);visual.root.rotation.y=roadHeading(item.z);
      if(visual.body)visual.body.rotation.y=clock*.9;
    }
    for(const [id,v]of courseVisuals){if(!visibleIds.has(id)){v.root.removeFromParent();courseVisuals.delete(id);}}
    backdrop.position.set(x,y,z);
    let angle=ready||won?Math.sin(clock*1.4)*.025:state.angle;
    if(falling){if(!spillStarted)startSpill(state);angle=THREE.MathUtils.lerp(fallAngle,state.fallDirection*(trip?.23:1.61),Math.min(fallTime/1.05,1));}
    const walkPhase=state.time*5.3+(state.distance*.36);
    const lift=falling?Math.max(0,state.jumpY-fallTime*2)-.12*Math.min(fallTime,1):state.jumpY;
    char.root.position.set(x-state.lateral-state.offset-(falling?state.fallDirection*Math.min(fallTime,.8)*.36:0),y+.08+lift+(ready?Math.sin(clock*2)*.01:falling||state.jumpY>0?0:Math.abs(Math.sin(walkPhase))*.048),z+(trip?Math.min(fallTime,1)*.8:0));
    char.root.rotation.y=roadHeading(z);
    char.lean.rotation.z=angle;
    char.lean.rotation.x=trip?Math.min(fallTime/1.05,1)*1.47:falling?Math.min(fallTime,.6)*.14:state.jumpY>0?-.1:.025;
    char.head.rotation.y=ready||won?.55:Math.sin(state.time*.65)*.07;
    const stride=ready?.035:mode==='playing'?.42:0;
    char.legs.forEach((leg,i)=>{leg.rotation.x=state.jumpY>.05&&!falling?-.30+i*.13:Math.sin((ready?clock*5.3:walkPhase)+i*Math.PI)*stride;});
    char.load.rotation.z=ready?Math.sin(clock*1.4+.6)*.025:-state.sway*.35;
    char.baskets.forEach(b=>{b.hanger.rotation.z=-angle*.55-state.sway*(b.side===1?1:.86);b.hanger.rotation.x=Math.sin((ready?clock:state.time)*5.3+b.side*.25)*(ready?.018:.07);});
    if(falling&&mode==='falling'){
      for(let i=0;i<pstate.length;i++){
        const p=pstate[i];p.v.y-=7.8*dt;p.p.addScaledVector(p.v,dt);const floor=groundHeight(p.p.x-roadX(p.p.z),p.p.z)+.05;
        if(p.p.y<floor){p.p.y=floor;p.v.y=Math.abs(p.v.y)*.28;p.v.x*=.85;p.v.z*=.85;}
        dummy.position.copy(p.p);dummy.rotation.set(p.spin+fallTime*6,p.spin,fallTime*4);dummy.scale.set(p.scale,p.scale*1.8,p.scale);dummy.updateMatrix();particles.setMatrixAt(i,dummy.matrix);
      }
      particles.instanceMatrix.needsUpdate=true;particles.computeBoundingSphere();
    }
    const transition=1-Math.exp(-dt*3.2);
    if(ready){cameraGoal.set(x+(mobile?5:5.7),y+(mobile?3.2:3.8),z+(mobile?8.4:7.3));target.set(x,y+1.16,z);}
    else if(won){cameraGoal.set(x+5.7,y+4.2,z+7.8);target.set(x-state.lateral,y+1.2,z);}
    else{cameraGoal.set(x-state.lateral*.7+(mobile?.7:2.3),y+(mobile?4.4:4.6),z-(mobile?8.3:8.8));target.set(x-state.lateral*.65,y+1.12+state.jumpY*.2,z+1.8);}
    if(['ready','won','over'].includes(lastMode)&&mode==='playing')cameraReady=false;
    if(!cameraReady){camera.position.copy(cameraGoal);look.copy(target);cameraReady=true;}else{camera.position.lerp(cameraGoal,transition);look.lerp(target,transition);}
    camera.lookAt(look);
    camera.setViewOffset(width,height,ready&&!mobile?-width*.17:0,ready&&mobile?height*.19:0,width,height);
    for(const v of courseVisuals.values())if(v.label){const parentQ=v.root.getWorldQuaternion(new THREE.Quaternion());v.label.quaternion.copy(parentQ.invert().multiply(camera.quaternion));}
    if(sparkleLife>0){if(mode==='playing')sparkleLife-=dt;sparkle.quaternion.copy(camera.quaternion);sparkle.scale.setScalar(1+(1-sparkleLife/.65)*2);sparkleMaterial.opacity=Math.max(0,sparkleLife/.65);sparkle.visible=sparkleLife>0;}
    if(lastMode!==mode){lastMode=mode;}
    sun.position.set(x-8,y+13,z+6);sun.target.position.set(x,y+1,z);sun.target.updateMatrixWorld();
    renderer.render(scene,camera);
  }
  return {render,resize,reset,pickup,renderer,scene,camera,char};
}
