import * as T from 'three';
// Continue the room beyond the camera frustum; scenery remains visible only
// through the real window, including short landscape canvases and chair pans.
export const ROOM_ENVELOPE=Object.freeze({halfWidth:48,height:48,front:48,back:-3.52,left:-5});
export function createRoomEnvelope(scene){
 const root=new T.Group();root.name='Continuous room envelope';scene.add(root);
 const geometry=new T.BoxGeometry(1,1,1),floorMaterial=new T.MeshStandardMaterial({color:'#dddcc8',roughness:.86}),wallMaterial=new T.MeshStandardMaterial({color:'#e0e6d1',roughness:.86});
 const floor=new T.Mesh(geometry,floorMaterial);floor.name='Room floor';floor.position.set(0,-.16,0);floor.scale.set(96,.3,96);root.add(floor);
 const wall=new T.Mesh(geometry,wallMaterial);wall.name='Room left wall';wall.position.set(ROOM_ENVELOPE.left,ROOM_ENVELOPE.height/2-.2,(ROOM_ENVELOPE.front+ROOM_ENVELOPE.back)/2);wall.scale.set(.15,ROOM_ENVELOPE.height,ROOM_ENVELOPE.front-ROOM_ENVELOPE.back);root.add(wall);
 return {root,dispose(){root.removeFromParent();geometry.dispose();floorMaterial.dispose();wallMaterial.dispose();}};
}
// Small reusable meshes, matte materials and a real opening into a layered grove.
export function createHomeArtKit(){
 const geometries=new Map(),materials=new Map();
 function material(color){if(!materials.has(color))materials.set(color,new T.MeshStandardMaterial({color,roughness:.88}));return materials.get(color);}
 function add(parent,key,make,p,s,color){if(!geometries.has(key))geometries.set(key,make());const m=new T.Mesh(geometries.get(key),material(color));m.position.set(...p);m.scale.set(...s);parent.add(m);return m;}
 function round(parent,p,size,color,r=.065){r=Math.min(r,...size.map(v=>v*.22));const key='r'+size.join(',')+','+r;return add(parent,key,()=>{const g=new T.BoxGeometry(...size,6,6,6),a=g.attributes.position,n=g.attributes.normal,v=new T.Vector3(),c=new T.Vector3();for(let i=0;i<a.count;i++){v.fromBufferAttribute(a,i);for(let axis=0;axis<3;axis++){const h=size[axis]/2,j=Math.round((v.getComponent(axis)/size[axis]+.5)*6);v.setComponent(axis,[-h,-h+r,-h+2*r,0,h-2*r,h-r,h][j]);}c.set(T.MathUtils.clamp(v.x,-size[0]/2+r,size[0]/2-r),T.MathUtils.clamp(v.y,-size[1]/2+r,size[1]/2-r),T.MathUtils.clamp(v.z,-size[2]/2+r,size[2]/2-r));v.sub(c).normalize();n.setXYZ(i,v.x,v.y,v.z);v.multiplyScalar(r).add(c);a.setXYZ(i,v.x,v.y,v.z);}return g;},p,[1,1,1],color);}
 const ball=(parent,p,s,color)=>add(parent,'ball',()=>new T.SphereGeometry(1,16,10),p,s,color);
 const cylinder=(parent,p,r,h,color)=>add(parent,'cylinder',()=>new T.CylinderGeometry(1,1,1,20),p,[r,h,r],color);
 const ring=(parent,p,r,t,color)=>add(parent,'ring'+r+','+t,()=>new T.TorusGeometry(r,t,6,32),p,[1,1,1],color);
 function dispose(){for(const g of geometries.values())g.dispose();for(const m of materials.values())m.dispose();geometries.clear();materials.clear();}
 return{round,ball,cylinder,ring,dispose};
}

export function createForestWindow(scene){
 const root=new T.Group();root.name='Open window and forest';scene.add(root);const art=createHomeArtKit(),{round,ball,cylinder}=art;
 // Wall pieces leave x=.40..3.20, y=2.40..5.0 genuinely open.
 const wallShape=new T.Shape(),{halfWidth,height}=ROOM_ENVELOPE;wallShape.moveTo(-halfWidth,-.2);wallShape.lineTo(halfWidth,-.2);wallShape.lineTo(halfWidth,height-.2);wallShape.lineTo(-halfWidth,height-.2);wallShape.closePath();const hole=new T.Path();hole.moveTo(.4,2.4);hole.lineTo(.4,5);hole.lineTo(3.2,5);hole.lineTo(3.2,2.4);hole.closePath();wallShape.holes.push(hole);
 const wallMesh=new T.Mesh(new T.ExtrudeGeometry(wallShape,{depth:.24,bevelEnabled:false}),new T.MeshStandardMaterial({color:'#eef0df',roughness:.9}));wallMesh.position.z=-3.52;root.add(wallMesh);
 for(const x of[.40,3.20])round(root,[x,3.70,-3.36],[.16,2.78,.42],'#bca480');
 for(const y of[2.4,5.0])round(root,[1.80,y,-3.36],[2.95,.16,.42],'#bca480');
 for(const x of[.52,3.08])round(root,[x,3.70,-3.08],[.07,2.42,.075],'#fff4de',.02);
 for(const y of[2.52,4.88])round(root,[1.8,y,-3.08],[2.56,.07,.075],'#fff4de',.02);
 round(root,[1.8,3.7,-3.08],[.07,2.42,.10],'#fff4de',.02);round(root,[1.8,3.62,-3.07],[2.57,.065,.10],'#fff4de',.02);
 round(root,[1.8,2.34,-2.97],[3.15,.17,.65],'#e9d4ae');round(root,[1.8,5.16,-3.0],[3.15,.08,.08],'#b2946f',.03);
 for(const x of[.16,3.44]){for(let i=0;i<3;i++)round(root,[x+(i-1)*.09,3.93,-2.98],[.13,2.24,.16],'#e1e4cd',.05);round(root,[x,3.32,-2.86],[.29,.10,.06],'#c4b88f',.02);}
 // Geometry behind the wall gives true parallax as the interaction camera moves.
 const sky=new T.Mesh(new T.PlaneGeometry(36,18),new T.MeshBasicMaterial({color:'#c2e0df',fog:false}));sky.position.set(1.8,5,-14);root.add(sky);
 ball(root,[4.8,6.7,-12],[.70,.70,.28],'#ffedbb');
 for(const [x,y,z,s,c]of[[-3,.65,-11,7,'#a3c5b2'],[5,.65,-10,6,'#b8ccb0'],[.8,-.15,-8.7,5,'#91b798']])ball(root,[x,y,z],[s,3.5,1.4],c);
 const trees=[];for(let i=0;i<9;i++){const x=-3+i*1.25,z=-8.8+(i%3)*.9,h=2.4+(i%4)*.40,g=new T.Group();g.position.set(x,.9,z);root.add(g);cylinder(g,[0,(h+.55)/2,0],.075,h+.55,'#a6946e');const crown=new T.Group();crown.position.y=h*.82+.65;g.add(crown);for(let j=0;j<3;j++){const a=j*2.1;ball(crown,[Math.cos(a)*.25,j*.32,Math.sin(a)*.18],[.63,.72,.52],['#8fac85','#a1bc91','#b2c69c'][(i+j)%3]);}trees.push(crown);}
 const clouds=[];for(let i=0;i<2;i++){const g=new T.Group();g.position.set(-1.1+i*4.8,5.4+i*.75,-11.7);root.add(g);for(let j=0;j<3;j++)ball(g,[j*.36,Math.sin(j)*.10,0],[.49,.18+j*.018,.12],'#ecf2de');clouds.push(g);}
 let time=0;return{root,tick(dt,reduced=false){time+=dt;trees.forEach((t,i)=>{t.rotation.z=reduced?0:Math.sin(time*.58+i*1.3)*.017;});clouds.forEach((c,i)=>{c.position.x=-1.1+i*4.8+(reduced?0:Math.sin(time*.12+i)*.24);});},dispose(){root.removeFromParent();sky.geometry.dispose();sky.material.dispose();wallMesh.geometry.dispose();wallMesh.material.dispose();art.dispose();}};
}
