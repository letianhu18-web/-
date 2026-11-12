import * as T from 'three';

export function syrupPump(host){
 const root=new T.Group(),a=host.art;root.name='Amber syrup pump';
 a.cylinder(root,[0,.045,0],.23,.07,'#94794f');
 const glass=new T.Mesh(new T.CylinderGeometry(.205,.22,.49,32),new T.MeshStandardMaterial({color:'#ffdea0',transparent:true,opacity:.27,roughness:.18,depthWrite:false}));glass.position.y=.31;root.add(glass);
 a.cylinder(root,[0,.255,0],.185,.38,'#bf7d29');a.ball(root,[0,.52,0],[.205,.10,.205],'#d9b57a');a.cylinder(root,[0,.59,0],.12,.10,'#4c8873');
 for(const x of[-.14,.14])a.round(root,[x,.28,.175],[.023,.31,.012],'#ffe0a1');
 a.round(root,[0,.31,.205],[.19,.21,.015],'#f5ead0');const drop=a.ball(root,[0,.31,.22],[.038,.058,.012],'#b2772a');drop.rotation.z=.15;
 const pump=new T.Group();pump.position.y=.65;root.add(pump);a.cylinder(pump,[0,0,0],.035,.13,'#d7dfce');a.round(pump,[-.10,.09,0],[.34,.055,.11],'#367862');a.round(pump,[-.265,.025,0],[.05,.14,.065],'#367862');a.ring(root,[0,.075,0],.213,.010,'#dec394').rotation.x=Math.PI/2;
 const nozzle=new T.Object3D();nozzle.position.set(-.265,-.06,0);pump.add(nozzle);root.userData.pump=pump;root.userData.nozzle=nozzle;return root;
}

export function woodMaterial(host,color){
 host.woodMaterials??=new Map();if(host.woodMaterials.has(color))return host.woodMaterials.get(color);
 if(!host.woodTexture){
  const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');x.fillStyle='#f2e8d8';x.fillRect(0,0,512,512);
  for(let p=0;p<6;p++){x.fillStyle=p%2?'rgba(114,77,42,.045)':'rgba(255,247,216,.09)';x.fillRect(0,p*86,512,86);x.strokeStyle='rgba(107,72,38,.22)';x.lineWidth=1.4;x.beginPath();x.moveTo(0,p*86);x.lineTo(512,p*86);x.stroke();}
  for(let i=0;i<100;i++){const y=(i*57.731)%512;x.strokeStyle=`rgba(106,74,40,${.055+(i%5)*.016})`;x.lineWidth=i%7===0?1.2:.6;x.beginPath();for(let u=0;u<=512;u+=8){const v=y+Math.sin(u*.014+i*2.1)*(2+i%3)+Math.sin(u*.041+i)*.7;if(!u)x.moveTo(u,v);else x.lineTo(u,v);}x.stroke();}
  for(const [u,v]of[[86,126],[363,363]])for(let j=0;j<4;j++){x.strokeStyle='rgba(114,72,33,.09)';x.beginPath();x.ellipse(u,v,7+j*5,1.6+j*.8,.035,0,Math.PI*2);x.stroke();}
  const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;tx.wrapS=tx.wrapT=T.RepeatWrapping;tx.anisotropy=Math.min(4,host.renderer.capabilities.getMaxAnisotropy());host.woodTexture=tx;
 }
 const m=new T.MeshStandardMaterial({color,map:host.woodTexture,bumpMap:host.woodTexture,bumpScale:.008,roughness:.76});host.woodMaterials.set(color,m);return m;
}

export function windowStreet(host,parent){
 const a=host.art;
 // All parts stay inside the existing window aperture. Layered depth, rounded
 // trees, a pitched roof and a curving walk replace the three plain blocks.
 a.round(parent,[1.48,2.65,-3.96],[.96,1.17,.035],'#9bcbd1');
 a.ball(parent,[1.83,3.08,-3.93],[.065,.065,.013],'#ffe1a0');
 for(const [cx,cy]of[[1.24,3.07],[1.61,2.96]])for(let i=0;i<3;i++)a.ball(parent,[cx+(i-1)*.06,cy+(i%2)*.025,-3.92],[.075,.033,.015],'#f7f3df');
 const patch=(points,color,z)=>{const s=new T.Shape();points.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();const m=new T.Mesh(new T.ShapeGeometry(s),new T.MeshStandardMaterial({color,roughness:1,side:T.DoubleSide}));m.position.z=z;parent.add(m);return m;};
 patch([[1,2.08],[1,2.46],[1.10,2.54],[1.26,2.56],[1.47,2.51],[1.67,2.61],[1.86,2.62],[1.96,2.52],[1.96,2.08]],'#82a887',-3.915);
 patch([[1,2.08],[1,2.33],[1.21,2.4],[1.46,2.35],[1.74,2.43],[1.96,2.32],[1.96,2.08]],'#609879',-3.90);
 patch([[1.24,2.08],[1.55,2.08],[1.51,2.21],[1.58,2.30],[1.72,2.37],[1.79,2.44],[1.70,2.44],[1.62,2.37],[1.44,2.30],[1.38,2.20]],'#e0c69a',-3.87);
 a.round(parent,[1.76,2.56,-3.875],[.24,.24,.07],'#edd2a3');
 patch([[1.60,2.67],[1.76,2.82],[1.92,2.67]],'#b47b57',-3.825);
 a.round(parent,[1.76,2.5,-3.825],[.055,.10,.015],'#786b55');a.round(parent,[1.68,2.58,-3.823],[.044,.05,.012],'#80b6bb');a.round(parent,[1.84,2.58,-3.823],[.044,.05,.012],'#80b6bb');
 for(const [cx,cy,s]of[[1.15,2.61,1],[1.51,2.70,.66]]){
  a.cylinder(parent,[cx,cy-.15,-3.855],.017*s,.29*s,'#956f48');
  for(let i=0;i<4;i++)a.ball(parent,[cx+Math.sin(i*2.2)*.068*s,cy+(i%2)*.06*s,-3.845],[.085*s,.11*s,.035],i%2?'#4d9572':'#70ad79');
 }
 for(let i=0;i<6;i++)a.round(parent,[1.03+i*.064,2.23,-3.82],[.023,.13,.025],'#f2dfb8');a.round(parent,[1.20,2.25,-3.805],[.36,.022,.024],'#e6cc9c');
 for(let i=0;i<5;i++){a.ball(parent,[1.83+(i%3)*.046,2.15+Math.floor(i/3)*.025,-3.80],[.034,.024,.016],'#427d60');if(i%2)a.ball(parent,[1.83+(i%3)*.046,2.185,-3.78],[.011,.012,.010],'#f2bf7d');}
}
