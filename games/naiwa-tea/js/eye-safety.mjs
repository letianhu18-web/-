import * as T from 'three';

// The supplied staged eyelids slightly intersect the eyeball at closure.
// Project their front vertices outside the globe; preserve the original rig.
export function repairEyelids(model){
 for(const side of ['L','R']){
  const iris=model.getObjectByName('Iris_'+side);if(!iris?.geometry)continue;
  iris.geometry.computeBoundingBox();const box=iris.geometry.boundingBox,centre=box.getCenter(new T.Vector3()),size=box.getSize(new T.Vector3()),radius=Math.max(size.x,size.y,size.z)/2+.014;
  for(const name of ['UpperLid_','LowerLid_','LidCrease_']){
   const mesh=model.getObjectByName(name+side);if(!mesh?.geometry)continue;
   const old=mesh.geometry,g=old.clone(),source=old.attributes.position,position=g.attributes.position,relative=g.morphTargetsRelative;
   // Distinct nested surfaces avoid coplanar upper/lower lids and crease
   // flickering when both halves cover the middle of the eyeball.
   const surfaceRadius=radius+(name==='UpperLid_'?.003:name==='LidCrease_'?.007:0);
   const project=(x,y,z)=>{const r2=surfaceRadius*surfaceRadius-(x-centre.x)**2-(y-centre.y)**2;return r2>0&&z>centre.z-.025?Math.max(z,centre.z+Math.sqrt(r2)):z;};
   for(let i=0;i<position.count;i++)position.setZ(i,project(source.getX(i),source.getY(i),source.getZ(i)));
   for(let t=0;t<(g.morphAttributes.position?.length||0);t++){
    const dest=g.morphAttributes.position[t],original=old.morphAttributes.position[t];
    for(let i=0;i<dest.count;i++){const x=original.getX(i)+(relative?source.getX(i):0),y=original.getY(i)+(relative?source.getY(i):0),z=original.getZ(i)+(relative?source.getZ(i):0);dest.setXYZ(i,x-(relative?position.getX(i):0),y-(relative?position.getY(i):0),project(x,y,z)-(relative?position.getZ(i):0));}
   }
   g.computeVertexNormals();g.morphAttributes.normal=[];
   for(const target of g.morphAttributes.position||[]){
    const temp=new T.BufferGeometry();temp.setIndex(g.index.clone());const p=target.clone();if(relative)for(let i=0;i<p.count;i++)p.setXYZ(i,p.getX(i)+position.getX(i),p.getY(i)+position.getY(i),p.getZ(i)+position.getZ(i));temp.setAttribute('position',p);temp.computeVertexNormals();const normal=temp.attributes.normal.clone();if(relative)for(let i=0;i<normal.count;i++)normal.setXYZ(i,normal.getX(i)-g.attributes.normal.getX(i),normal.getY(i)-g.attributes.normal.getY(i),normal.getZ(i)-g.attributes.normal.getZ(i));g.morphAttributes.normal.push(normal);temp.dispose();
   }
   g.computeBoundingBox();g.computeBoundingSphere();mesh.geometry=g;mesh.userData.safeEyelidRadius=radius;
  }
  const lid=model.getObjectByName('UpperLid_'+side);
  if(lid?.isSkinnedMesh){
   const points=[];for(let i=0;i<=12;i++){const x=(i/12-.5)*.19,y=-.018+.014*(Math.abs(x)/.095)**2,z=Math.sqrt((radius+.008)**2-x*x-y*y);points.push(new T.Vector3(centre.x+x,centre.y+y,centre.z+z));}
   const geometry=new T.TubeGeometry(new T.CatmullRomCurve3(points),20,.0045,6,false),count=geometry.attributes.position.count,indices=new Uint16Array(count*4),weights=new Float32Array(count*4),head=lid.skeleton.bones.findIndex(b=>b.name==='Head');
   for(let i=0;i<count;i++){indices[i*4]=Math.max(0,head);weights[i*4]=1;}
   geometry.setAttribute('skinIndex',new T.Uint16BufferAttribute(indices,4));geometry.setAttribute('skinWeight',new T.Float32BufferAttribute(weights,4));const crease=new T.SkinnedMesh(geometry,new T.MeshStandardMaterial({color:'#9f7f35',roughness:.85}));crease.name='ClosedCrease_'+side;crease.bind(lid.skeleton,lid.bindMatrix);crease.visible=false;crease.frustumCulled=false;lid.parent.add(crease);
  }
 }
}
export function syncClosedEyes(model){
 for(const side of ['L','R']){const lid=model.getObjectByName('UpperLid_'+side),w=lid?.morphTargetInfluences||[],levels=[.12,.25,.37,.50,.62,.75,.87,1],closed=w.reduce((s,v,i)=>s+v*(levels[i]||0),0)>=.97;
  for(const name of ['Iris_','Pupil_']){const eye=model.getObjectByName(name+side);if(eye)eye.visible=!closed;}
  const original=model.getObjectByName('LidCrease_'+side),crease=model.getObjectByName('ClosedCrease_'+side);if(original)original.visible=!closed;if(crease)crease.visible=closed;
 }
}
