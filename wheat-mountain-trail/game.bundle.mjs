var Gu=Object.defineProperty;var ir=(i,e)=>()=>(i&&(e=i(i=0)),e);var Vu=(i,e)=>{for(var t in e)Gu(i,t,{get:e[t],enumerable:!0})};function wc(){let i=[],e=[-1.85,0,1.85],t=0,n=()=>e[Math.floor(Math.random()*e.length)],r=(o,l=n())=>{i.push({id:`bun-${t++}`,type:"bun",z:o,x:l,collected:!1})};r(10+Math.random()*10);let s=38,a=0;for(;s<4935;){let o=a%3===0,l=[0,-1.85,1.85,0,1.85,-1.85][a%6];i.push({id:`obstacle-${a}`,type:o?"log":"rock",z:s,x:o?0:l,width:o?7.6:1.15,depth:o?.5:.85,height:o?.5:.62}),r(s+8+Math.random()*7),Math.random()<.5&&r(s+17+Math.random()*5),s+=31+a*7%14,a++}return i.sort((o,l)=>o.z-l.z)}function jr(i,e,t,n){if(Math.abs(e-i)<1e-10)return i>=t&&i<=n?[0,1]:null;let r=(t-i)/(e-i),s=(n-i)/(e-i),a=Math.max(0,Math.min(r,s)),o=Math.min(1,Math.max(r,s));return a<=o?[a,o]:null}function Ec(i,e,t){let n=jr(i.distance,e.distance,t.z-t.depth/2-.23,t.z+t.depth/2+.23);if(!n)return!1;let r=jr(i.x,e.x,t.x-t.width/2-.24,t.x+t.width/2+.24);if(!r)return!1;let s=Math.max(n[0],r[0]),a=Math.min(n[1],r[1]);if(s>a)return!1;let o=i.jumpY+(e.jumpY-i.jumpY)*s,l=i.jumpY+(e.jumpY-i.jumpY)*a;return Math.min(o,l)<t.height+.06}function Tc(i,e,t){let n=jr(i.distance,e.distance,t.z-.7,t.z+.7),r=jr(i.x,e.x,t.x-.72,t.x+.72);if(!n||!r)return!1;let s=Math.max(n[0],r[0]),a=Math.min(n[1],r[1]);return s>a?!1:i.jumpY+(e.jumpY-i.jumpY)*s<1.15}var ba=ir(()=>{});function Xr(i){let e=Math.floor(i.distance*10),t=i.buns*qu,n=Ta(i).reduce((r,s)=>r+(s.points||0),0);return{distance:e,buns:t,achievements:n,total:e+t+n}}function Ac(i=0){return{unlocked:[],maxAbsAngle:Math.abs(i),recoveryArmed:!1,bunsEncountered:0,bunStreak:0,bestBunStreak:0,boostedDistance:0}}function jn(i,e){i.achievements.unlocked.includes(e)||(i.achievements.unlocked.push(e),i.events.push({type:"achievement",id:e}))}function Rc(i){let e=i.achievements;e.bunStreak++,e.bestBunStreak=Math.max(e.bestBunStreak,e.bunStreak),e.bunStreak>=10&&jn(i,"meticulous")}function Cc(i){let e=i.achievements;return{pickupRate:e.bunsEncountered>0?i.buns/e.bunsEncountered:0,boostRatio:i.distance>0?e.boostedDistance/i.distance:0,maxDegrees:e.maxAbsAngle*180/Math.PI,bestBunStreak:e.bestBunStreak}}function qr(i,e=0){let t=i.achievements,n=Math.abs(i.angle);if(t.maxAbsAngle=Math.max(t.maxAbsAngle,n),t.boostedDistance+=e,i.fallen||(n>Wu&&(t.recoveryArmed=!0),t.recoveryArmed&&n<=ju&&(jn(i,"comeback"),t.recoveryArmed=!1)),!i.fallen&&!i.won){i.score=Xr(i).total;return}if(i.buns>=15&&t.bunsEncountered>0&&i.buns*5>t.bunsEncountered*4&&jn(i,"bun-fan"),i.distance>0&&t.boostedDistance>i.distance*.9&&jn(i,"accelerator"),i.won)jn(i,"supreme"),t.maxAbsAngle<=Xu&&jn(i,"helmsman");else{let s=[[200,"under-200"],[500,"under-500"],[1e3,"under-1000"],[2e3,"under-2000"],[3e3,"under-3000"],[4500,"under-4500"],[5e3,"unfinished"]].find(([a])=>i.distance<a);s&&jn(i,s[1])}i.score=Xr(i).total}function Ta(i){return Ea.filter(e=>i.achievements.unlocked.includes(e.id))}var wa,Wu,ju,Xu,Ea,qu,Aa=ir(()=>{wa=i=>i*Math.PI/180,Wu=wa(45),ju=wa(10),Xu=wa(25),Ea=Object.freeze([{id:"comeback",points:1e3,name:"\u529B\u633D\u72C2\u6F9C",kind:"\u6280\u5DE7\u6210\u5C31",rule:"\u503E\u659C\u8D85\u8FC7 45\xB0\uFF0C\u518D\u56DE\u5230 \xB110\xB0\u4EE5\u5185\u3002"},{id:"bun-fan",points:1e3,name:"\u5305\u871C",kind:"\u79F0\u53F7",rule:"\u672C\u5C40\u62FE\u53D6\u81F3\u5C11 15 \u4E2A\u5E86\u4E30\u5305\u5B50\uFF0C\u4E14\u62FE\u53D6\u7387\u8D85\u8FC7 80%\u3002"},{id:"accelerator",points:1e3,name:"\u603B\u52A0\u901F\u5E08",kind:"\u79F0\u53F7",rule:"\u672C\u5C40\u52A0\u901F\u8DEF\u7A0B\u5360\u5DF2\u8D70\u8DEF\u7A0B\u7684\u6BD4\u4F8B\u8D85\u8FC7 90%\u3002"},{id:"supreme",name:"\u5B9A\u4E8E\u4E00\u5C0A",kind:"\u901A\u5173\u6210\u5C31",rule:"\u8D70\u5B8C 5,000 \u7C73\uFF0C\u5B8C\u6210\u5341\u91CC\u5C71\u8DEF\u6311\u6218\u3002"},{id:"helmsman",points:1e3,name:"\u9886\u822A\u638C\u8235\uFF0C\u6307\u660E\u65B9\u5411",kind:"\u901A\u5173\u6210\u5C31",rule:"\u8D70\u5B8C 5,000 \u7C73\uFF0C\u5168\u7A0B\u503E\u659C\u672A\u8D85\u8FC7 \xB125\xB0\u3002"},{id:"meticulous",points:1e3,name:"\u7CBE\u751A\u7EC6\u817B",kind:"\u6280\u5DE7\u6210\u5C31",rule:"\u8FDE\u7EED\u62FE\u53D6 10 \u4E2A\u5E86\u4E30\u5305\u5B50\uFF0C\u4E2D\u95F4\u6CA1\u6709\u6F0F\u6389\u3002"},{id:"under-200",name:"\u5475\uFF0C\u5C0F\u5B66\u535A\u58EB",kind:"\u672C\u5C40\u8BC4\u4EF7",rule:"\u4E0D\u8DB3 200 \u7C73\u65F6\u6311\u6218\u5931\u8D25\u3002"},{id:"under-500",name:"\u5927\u8748\u6485\u8D77",kind:"\u672C\u5C40\u8BC4\u4EF7",rule:"\u8FBE\u5230 200 \u7C73\uFF0C\u4F46\u4E0D\u8DB3 500 \u7C73\u65F6\u5931\u8D25\u3002"},{id:"under-1000",name:"\u4E0D\u5F3A\u81EA\u81EA",kind:"\u672C\u5C40\u8BC4\u4EF7",rule:"\u8FBE\u5230 500 \u7C73\uFF0C\u4F46\u4E0D\u8DB3 1,000 \u7C73\u65F6\u5931\u8D25\u3002"},{id:"under-2000",name:"\u6211\u5E74\u8F7B\u65F6\u8D70\u8FC7",kind:"\u672C\u5C40\u8BC4\u4EF7",rule:"\u8FBE\u5230 1,000 \u7C73\uFF0C\u4F46\u4E0D\u8DB3 2,000 \u7C73\u65F6\u5931\u8D25\u3002"},{id:"under-3000",name:"\u9999\u8549\u76AE\u5927\u5DF4",kind:"\u672C\u5C40\u8BC4\u4EF7",rule:"\u8FBE\u5230 2,000 \u7C73\uFF0C\u4F46\u4E0D\u8DB3 3,000 \u7C73\u65F6\u5931\u8D25\u3002"},{id:"under-4500",name:"\u8428\u683C\u5C14\u738B",kind:"\u672C\u5C40\u8BC4\u4EF7",rule:"\u8FBE\u5230 3,000 \u7C73\uFF0C\u4F46\u4E0D\u8DB3 4,500 \u7C73\u65F6\u5931\u8D25\u3002"},{id:"unfinished",name:"\u70C2\u5C3E\u5E1D",kind:"\u672C\u5C40\u8BC4\u4EF7",rule:"\u8FBE\u5230 4,500 \u7C73\uFF0C\u4F46\u8FD8\u6CA1\u8D70\u5B8C 5,000 \u7C73\u5C31\u5931\u8D25\u3002"}]),qu=100});function Jr(){return{time:0,distance:0,score:0,angle:.045,velocity:0,offset:0,wind:0,sway:0,swayVelocity:0,dangerTime:0,fallen:!1,fallDirection:1,fallCause:"",lateral:0,moveVelocity:0,jumpY:0,jumpVelocity:0,jumpBuffer:0,speed:5,boostLevel:0,boostRemaining:0,buns:0,won:!1,events:[],course:wc(),courseCursor:0,achievements:Ac(.045)}}function Ca(i,e=0,t=rr){if(i.fallen||i.won)return i;let n=typeof e=="number"?{balance:e,move:0,jump:!1}:e;i.events=[];let r={distance:i.distance,x:i.lateral+i.offset,jumpY:i.jumpY};i.time+=t,n.jump?i.jumpBuffer=.12:i.jumpBuffer=Math.max(0,i.jumpBuffer-t),i.jumpBuffer>0&&i.jumpY<=0&&i.jumpVelocity<=0&&(i.jumpVelocity=6.8,i.jumpBuffer=0,i.events.push({type:"jump"})),(i.jumpY>0||i.jumpVelocity>0)&&(i.jumpVelocity-=15*t,i.jumpY+=i.jumpVelocity*t,i.jumpY<=0&&(i.jumpY=0,i.jumpVelocity=0,i.events.push({type:"land"})));let s=Sn(n.move||0,-1,1)*2.5;i.moveVelocity+=(s-i.moveVelocity)*Math.min(1,t*12),i.lateral=Sn(i.lateral+i.moveVelocity*t,-2,2),Math.abs(i.lateral)>=2&&(i.moveVelocity=0);let a=1+Math.min(i.distance/1800,.9),o=Math.min(i.time/7,1);i.wind=o*(Math.sin(i.time*.63+.3)*.33+Math.sin(i.time*1.41)*.2+Math.sin(i.time*.17+1.5)*.15)*a;let l=Math.sin(i.time*5.3)*.19*a,c=.45+.55*o,h=1.35+.85*Math.min(i.distance/80,1),d=i.jumpY>.05,u=(h*Math.sin(i.angle)+i.wind*.8+l*.65)*c*(d?.45:1)+Sn(n.balance||0,-1,1)*2.85-i.velocity*1.9;i.velocity+=u*t,i.angle+=i.velocity*t,i.offset+=(i.angle*.78-i.offset)*t*3,i.swayVelocity+=(-8.8*i.sway-1.8*i.swayVelocity-i.velocity*1.5+l*.4)*t,i.sway+=i.swayVelocity*t,i.boostRemaining=Math.max(0,i.boostRemaining-t),i.boostRemaining===0&&(i.boostLevel=0),i.speed=(5+Math.min(i.distance/1400,1.6))*(1+i.boostLevel*.2),i.distance=Math.min(5e3,i.distance+i.speed*t);let p=i.boostLevel>0?i.distance-r.distance:0;if(i.score=Math.floor(i.distance*10),i.dangerTime=Math.abs(i.angle)>Ra?i.dangerTime+t:Math.max(0,i.dangerTime-t*2),i.dangerTime>.2||Math.abs(i.angle)>1.2)return i.fallen=!0,i.fallCause="balance",i.fallDirection=Math.sign(i.angle)||1,qr(i,p),i;let m={distance:i.distance,x:i.lateral+i.offset,jumpY:i.jumpY};for(;i.courseCursor<i.course.length&&i.course[i.courseCursor].z<r.distance-2;)i.courseCursor++;for(let v=i.courseCursor;v<i.course.length&&i.course[v].z<i.distance+2;v++){let g=i.course[v];if(g.type==="bun")!g.encountered&&i.distance>=g.z-.7&&(g.encountered=!0,i.achievements.bunsEncountered++),!g.collected&&Tc(r,m,g)&&(g.collected=!0,i.buns++,i.boostLevel=Math.min(3,i.boostLevel+1),i.boostRemaining=9,i.speed=(5+Math.min(i.distance/1400,1.6))*(1+i.boostLevel*.2),i.events.push({type:"bun",id:g.id,x:g.x,z:g.z,level:i.boostLevel}),Rc(i)),!g.collected&&!g.missed&&i.distance>g.z+.7&&(g.missed=!0,i.achievements.bunStreak=0);else if(Ec(r,m,g))return i.fallen=!0,i.fallCause="obstacle",i.fallDirection=Math.sign(i.angle)||1,i.events.push({type:"trip",obstacle:g.type}),qr(i,p),i}return i.distance>=5e3&&(i.won=!0,i.events.push({type:"win"})),qr(i,p),i}var Ra,rr,Sn,yt,Xn,Zr,Kr=ir(()=>{ba();Aa();ba();Ra=.94,rr=1/120,Sn=(i,e,t)=>Math.max(e,Math.min(t,i)),yt=i=>1.8*Math.sin(i*.029)+.72*Math.sin(i*.081),Xn=i=>i*.016+.25*Math.sin(i*.048)+.065*Math.sin(i*.24),Zr=i=>Math.atan((yt(i+.1)-yt(i-.1))/.2)});function ui(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(_t[255&i]+_t[i>>8&255]+_t[i>>16&255]+_t[i>>24&255]+"-"+_t[255&e]+_t[e>>8&255]+"-"+_t[e>>16&15|64]+_t[e>>24&255]+"-"+_t[63&t|128]+_t[t>>8&255]+"-"+_t[t>>16&255]+_t[t>>24&255]+_t[255&n]+_t[n>>8&255]+_t[n>>16&255]+_t[n>>24&255]).toLowerCase()}function mt(i,e,t){return Math.max(e,Math.min(t,i))}function Yo(i,e){return(i%e+e)%e}function mr(i,e,t){return(1-t)*i+t*e}function Pi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Mt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("Invalid component type.")}}function au(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Sr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function rd(){let i=Sr("canvas");return i.style.display="block",i}function Ds(i){i in Jc||(Jc[i]=!0,console.warn(i))}function Di(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Oa(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}function Fa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Zo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function za(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Yn.fromArray(i,s);let o=r.x*Math.abs(Yn.x)+r.y*Math.abs(Yn.y)+r.z*Math.abs(Yn.z),l=e.dot(Yn),c=t.dot(Yn),h=n.dot(Yn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}function $a(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}function gd(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,r[l]=24,r[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,r[l]=-c-1,r[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,r[l]=13,r[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,r[l]=24,r[256|l]=24):(n[l]=31744,n[256|l]=64512,r[l]=13,r[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(8388608&c)==0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}function gs(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,us),i.getVertexPosition(l,ds),i.getVertexPosition(c,ps);let h=(function(d,u,p,m,v,g,f,x){let _;if(_=u.side===Tt?m.intersectTriangle(f,g,v,!0,x):m.intersectTriangle(v,g,f,u.side===Ln,x),_===null)return null;fs.copy(x),fs.applyMatrix4(d.matrixWorld);let y=p.ray.origin.distanceTo(fs);return y<p.near||y>p.far?null:{distance:y,point:fs.clone(),object:d}})(i,e,t,n,us,ds,ps,hh);if(h){let d=new E;Cn.getBarycoord(hh,us,ds,ps,d),r&&(h.uv=Cn.getInterpolatedAttribute(r,o,l,c,d,new se)),s&&(h.uv1=Cn.getInterpolatedAttribute(s,o,l,c,d,new se)),a&&(h.normal=Cn.getInterpolatedAttribute(a,o,l,c,d,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new E,materialIndex:0};Cn.getNormal(us,ds,ps,u.normal),h.face=u,h.barycoord=d}return h}function Gi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function St(i){let e={};for(let t=0;t<i.length;t++){let n=Gi(i[t]);for(let r in n)e[r]=n[r]}return e}function lu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ve.workingColorSpace}function cu(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Md(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(s,a){let o=s.array,l=s.usage,c=o.byteLength,h=i.createBuffer(),d;if(i.bindBuffer(a,h),i.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)d=i.FLOAT;else if(o instanceof Uint16Array)d=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)d=i.SHORT;else if(o instanceof Uint32Array)d=i.UNSIGNED_INT;else if(o instanceof Int32Array)d=i.INT;else if(o instanceof Int8Array)d=i.BYTE;else if(o instanceof Uint8Array)d=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);d=i.UNSIGNED_BYTE}return{buffer:h,type:d,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let l=a.array,c=a.updateRanges;if(i.bindBuffer(o,s),c.length===0)i.bufferSubData(o,0,l);else{c.sort(((d,u)=>d.start-u.start));let h=0;for(let d=1;d<c.length;d++){let u=c[h],p=c[d];p.start<=u.start+u.count+1?u.count=Math.max(u.count,p.start+p.count-u.start):(++h,c[h]=p)}c.length=h+1;for(let d=0,u=c.length;d<u;d++){let p=c[d];i.bufferSubData(o,p.start*l.BYTES_PER_ELEMENT,l,p.start,p.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}function bd(i,e,t,n,r,s,a){let o=new Pe(0),l,c,h=s===!0?0:1,d=null,u=0,p=null;function m(g){let f=g.isScene===!0?g.background:null;return f&&f.isTexture&&(f=(g.backgroundBlurriness>0?t:e).get(f)),f}function v(g,f){g.getRGB(_s,lu(i)),n.buffers.color.setClear(_s.r,_s.g,_s.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(g,f=1){o.set(g),h=f,v(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(g){h=g,v(o,h)},render:function(g){let f=!1,x=m(g);x===null?v(o,h):x&&x.isColor&&(v(x,1),f=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||f)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(g,f){let x=m(f);x&&(x.isCubeTexture||x.mapping===ua)?(c===void 0&&(c=new vt(new Dn(1,1,1),new tn({name:"BackgroundCubeMaterial",uniforms:Gi(Jt.backgroundCube.uniforms),vertexShader:Jt.backgroundCube.vertexShader,fragmentShader:Jt.backgroundCube.fragmentShader,side:Tt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,y,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),Kn.copy(f.backgroundRotation),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),c.material.uniforms.envMap.value=x,c.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Sd.makeRotationFromEuler(Kn)),c.material.toneMapped=Ve.getTransfer(x.colorSpace)!==Ke,d===x&&u===x.version&&p===i.toneMapping||(c.material.needsUpdate=!0,d=x,u=x.version,p=i.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new vt(new gn(2,2),new tn({name:"BackgroundMaterial",uniforms:Gi(Jt.background.uniforms),vertexShader:Jt.background.vertexShader,fragmentShader:Jt.background.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=Ve.getTransfer(x.colorSpace)!==Ke,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),d===x&&u===x.version&&p===i.toneMapping||(l.material.needsUpdate=!0,d=x,u=x.version,p=i.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null))}}}function wd(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null),s=r,a=!1;function o(f){return i.bindVertexArray(f)}function l(f){return i.deleteVertexArray(f)}function c(f){let x=[],_=[],y=[];for(let R=0;R<t;R++)x[R]=0,_[R]=0,y[R]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:x,enabledAttributes:_,attributeDivisors:y,object:f,attributes:{},index:null}}function h(){let f=s.newAttributes;for(let x=0,_=f.length;x<_;x++)f[x]=0}function d(f){u(f,0)}function u(f,x){let _=s.newAttributes,y=s.enabledAttributes,R=s.attributeDivisors;_[f]=1,y[f]===0&&(i.enableVertexAttribArray(f),y[f]=1),R[f]!==x&&(i.vertexAttribDivisor(f,x),R[f]=x)}function p(){let f=s.newAttributes,x=s.enabledAttributes;for(let _=0,y=x.length;_<y;_++)x[_]!==f[_]&&(i.disableVertexAttribArray(_),x[_]=0)}function m(f,x,_,y,R,A,C){C===!0?i.vertexAttribIPointer(f,x,_,R,A):i.vertexAttribPointer(f,x,_,y,R,A)}function v(){g(),a=!0,s!==r&&(s=r,o(s.object))}function g(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(f,x,_,y,R){let A=!1,C=(function(F,D,z){let V=z.wireframe===!0,B=n[F.id];B===void 0&&(B={},n[F.id]=B);let j=B[D.id];j===void 0&&(j={},B[D.id]=j);let W=j[V];return W===void 0&&(W=c(i.createVertexArray()),j[V]=W),W})(y,_,x);s!==C&&(s=C,o(s.object)),A=(function(F,D,z,V){let B=s.attributes,j=D.attributes,W=0,Y=z.getAttributes();for(let J in Y)if(Y[J].location>=0){let ne=B[J],ae=j[J];if(ae===void 0&&(J==="instanceMatrix"&&F.instanceMatrix&&(ae=F.instanceMatrix),J==="instanceColor"&&F.instanceColor&&(ae=F.instanceColor)),ne===void 0||ne.attribute!==ae||ae&&ne.data!==ae.data)return!0;W++}return s.attributesNum!==W||s.index!==V})(f,y,_,R),A&&(function(F,D,z,V){let B={},j=D.attributes,W=0,Y=z.getAttributes();for(let J in Y)if(Y[J].location>=0){let ne=j[J];ne===void 0&&(J==="instanceMatrix"&&F.instanceMatrix&&(ne=F.instanceMatrix),J==="instanceColor"&&F.instanceColor&&(ne=F.instanceColor));let ae={};ae.attribute=ne,ne&&ne.data&&(ae.data=ne.data),B[J]=ae,W++}s.attributes=B,s.attributesNum=W,s.index=V})(f,y,_,R),R!==null&&e.update(R,i.ELEMENT_ARRAY_BUFFER),(A||a)&&(a=!1,(function(F,D,z,V){h();let B=V.attributes,j=z.getAttributes(),W=D.defaultAttributeValues;for(let Y in j){let J=j[Y];if(J.location>=0){let ne=B[Y];if(ne===void 0&&(Y==="instanceMatrix"&&F.instanceMatrix&&(ne=F.instanceMatrix),Y==="instanceColor"&&F.instanceColor&&(ne=F.instanceColor)),ne!==void 0){let ae=ne.normalized,ue=ne.itemSize,fe=e.get(ne);if(fe===void 0)continue;let k=fe.buffer,Z=fe.type,le=fe.bytesPerElement,he=Z===i.INT||Z===i.UNSIGNED_INT||ne.gpuType===Vl;if(ne.isInterleavedBufferAttribute){let w=ne.data,M=w.stride,U=ne.offset;if(w.isInstancedInterleavedBuffer){for(let G=0;G<J.locationSize;G++)u(J.location+G,w.meshPerAttribute);F.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=w.meshPerAttribute*w.count)}else for(let G=0;G<J.locationSize;G++)d(J.location+G);i.bindBuffer(i.ARRAY_BUFFER,k);for(let G=0;G<J.locationSize;G++)m(J.location+G,ue/J.locationSize,Z,ae,M*le,(U+ue/J.locationSize*G)*le,he)}else{if(ne.isInstancedBufferAttribute){for(let w=0;w<J.locationSize;w++)u(J.location+w,ne.meshPerAttribute);F.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let w=0;w<J.locationSize;w++)d(J.location+w);i.bindBuffer(i.ARRAY_BUFFER,k);for(let w=0;w<J.locationSize;w++)m(J.location+w,ue/J.locationSize,Z,ae,ue*le,ue/J.locationSize*w*le,he)}}else if(W!==void 0){let ae=W[Y];if(ae!==void 0)switch(ae.length){case 2:i.vertexAttrib2fv(J.location,ae);break;case 3:i.vertexAttrib3fv(J.location,ae);break;case 4:i.vertexAttrib4fv(J.location,ae);break;default:i.vertexAttrib1fv(J.location,ae)}}}}p()})(f,x,_,y),R!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(R).buffer))},reset:v,resetDefaultState:g,dispose:function(){v();for(let f in n){let x=n[f];for(let _ in x){let y=x[_];for(let R in y)l(y[R].object),delete y[R];delete x[_]}delete n[f]}},releaseStatesOfGeometry:function(f){if(n[f.id]===void 0)return;let x=n[f.id];for(let _ in x){let y=x[_];for(let R in y)l(y[R].object),delete y[R];delete x[_]}delete n[f.id]},releaseStatesOfProgram:function(f){for(let x in n){let _=n[x];if(_[f.id]===void 0)continue;let y=_[f.id];for(let R in y)l(y[R].object),delete y[R];delete _[f.id]}},initAttributes:h,enableAttribute:d,disableUnusedAttributes:p}}function Ed(i,e,t){let n;function r(s,a,o){o!==0&&(i.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){i.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=r,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let l=0;for(let c=0;c<o;c++)l+=a[c];t.update(l,n,1)},this.renderMultiDrawInstances=function(s,a,o,l){if(o===0)return;let c=e.get("WEBGL_multi_draw");if(c===null)for(let h=0;h<s.length;h++)r(s[h],a[h],l[h]);else{c.multiDrawArraysInstancedWEBGL(n,s,0,a,0,l,0,o);let h=0;for(let d=0;d<o;d++)h+=a[d];for(let d=0;d<l.length;d++)t.update(h,n,l[d])}}}function Td(i,e,t,n){let r;function s(u){if(u==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";u="mediump"}return u==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=t.logarithmicDepthBuffer===!0,c=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(c===!0){let u=e.get("EXT_clip_control");u.clipControlEXT(u.LOWER_LEFT_EXT,u.ZERO_TO_ONE_EXT)}let h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let u=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(u.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(u){return u===Vt||n.convert(u)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(u){let p=u===Dr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(u!==mn&&n.convert(u)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&u!==$t&&!p)},precision:a,logarithmicDepthBuffer:l,reverseDepthBuffer:c,maxTextures:h,maxVertexTextures:d,maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:d>0,maxSamples:i.getParameter(i.MAX_SAMPLES)}}function Ad(i){let e=this,t=null,n=0,r=!1,s=!1,a=new pn,o=new Le,l={value:null,needsUpdate:!1};function c(h,d,u,p){let m=h!==null?h.length:0,v=null;if(m!==0){if(v=l.value,p!==!0||v===null){let g=u+4*m,f=d.matrixWorldInverse;o.getNormalMatrix(f),(v===null||v.length<g)&&(v=new Float32Array(g));for(let x=0,_=u;x!==m;++x,_+=4)a.copy(h[x]).applyMatrix4(f,o),a.normal.toArray(v,_),v[_+3]=a.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,v}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let u=h.length!==0||d||n!==0||r;return r=d,n=h.length,u},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=c(h,d,0)},this.setState=function(h,d,u){let p=h.clippingPlanes,m=h.clipIntersection,v=h.clipShadows,g=i.get(h);if(!r||p===null||p.length===0||s&&!v)s?c(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let f=s?0:n,x=4*f,_=g.clippingState||null;l.value=_,_=c(p,d,x,u);for(let y=0;y!==x;++y)_[y]=t[y];g.clippingState=_,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=f}}}function Rd(i){let e=new WeakMap;function t(r,s){return s===vo?r.mapping=Oi:s===_o&&(r.mapping=Fi),r}function n(r){let s=r.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(r){if(r&&r.isTexture){let s=r.mapping;if(s===vo||s===_o){if(e.has(r))return t(e.get(r).texture,r.mapping);{let a=r.image;if(a&&a.height>0){let o=new Qo(a.height);return o.fromEquirectangularTexture(i,r),e.set(r,o),r.addEventListener("dispose",n),t(o.texture,r.mapping)}return null}}}return r},dispose:function(){e=new WeakMap}}}function gh(i,e,t){let n=new fn(i,e,t);return n.texture.mapping=ua,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xs(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function vh(){return new tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function _h(){return new tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Kl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Cd(i){let e=new WeakMap,t=null;function n(r){let s=r.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(r){if(r&&r.isTexture){let s=r.mapping,a=s===vo||s===_o,o=s===Oi||s===Fi;if(a||o){let l=e.get(r),c=l!==void 0?l.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==c)return t===null&&(t=new qs(i)),l=a?t.fromEquirectangular(r,l):t.fromCubemap(r,l),l.texture.pmremVersion=r.pmremVersion,e.set(r,l),l.texture;if(l!==void 0)return l.texture;{let h=r.image;return a&&h&&h.height>0||o&&h&&(function(d){let u=0,p=6;for(let m=0;m<p;m++)d[m]!==void 0&&u++;return u===p})(h)?(t===null&&(t=new qs(i)),l=a?t.fromEquirectangular(r):t.fromCubemap(r),l.texture.pmremVersion=r.pmremVersion,e.set(r,l),r.addEventListener("dispose",n),l.texture):null}}}return r},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Pd(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Ds("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Id(i,e,t,n){let r={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let d in c.attributes)e.remove(c.attributes[d]);for(let d in c.morphAttributes){let u=c.morphAttributes[d];for(let p=0,m=u.length;p<m;p++)e.remove(u[p])}c.removeEventListener("dispose",a),delete r[c.id];let h=s.get(c);h&&(e.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,d=l.attributes.position,u=0;if(h!==null){let v=h.array;u=h.version;for(let g=0,f=v.length;g<f;g+=3){let x=v[g+0],_=v[g+1],y=v[g+2];c.push(x,_,_,y,y,x)}}else{if(d===void 0)return;{let v=d.array;u=d.version;for(let g=0,f=v.length/3-1;g<f;g+=3){let x=g+0,_=g+1,y=g+2;c.push(x,_,_,y,y,x)}}}let p=new(au(c)?Ws:Vs)(c,1);p.version=u;let m=s.get(l);m&&e.remove(m),s.set(l,p)}return{get:function(l,c){return r[c.id]===!0||(c.addEventListener("dispose",a),r[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let d in c)e.update(c[d],i.ARRAY_BUFFER);let h=l.morphAttributes;for(let d in h){let u=h[d];for(let p=0,m=u.length;p<m;p++)e.update(u[p],i.ARRAY_BUFFER)}},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function Ld(i,e,t){let n,r,s;function a(o,l,c){c!==0&&(i.drawElementsInstanced(n,l,r,o*s,c),t.update(l,n,c))}this.setMode=function(o){n=o},this.setIndex=function(o){r=o.type,s=o.bytesPerElement},this.render=function(o,l){i.drawElements(n,l,r,o*s),t.update(l,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,l,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,l,0,r,o,0,c);let h=0;for(let d=0;d<c;d++)h+=l[d];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,l,c,h){if(c===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let u=0;u<o.length;u++)a(o[u]/s,l[u],h[u]);else{d.multiDrawElementsInstancedWEBGL(n,l,0,r,o,0,h,0,c);let u=0;for(let p=0;p<c;p++)u+=l[p];for(let p=0;p<h.length;p++)t.update(u,n,h[p])}}}function Ud(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Dd(i,e,t){let n=new WeakMap,r=new et;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,d=n.get(a);if(d===void 0||d.count!==h){let F=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",F)};d!==void 0&&d.texture.dispose();let u=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,v=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],f=a.morphAttributes.color||[],x=0;u===!0&&(x=1),p===!0&&(x=2),m===!0&&(x=3);let _=a.attributes.position.count*x,y=1;_>e.maxTextureSize&&(y=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let R=new Float32Array(_*y*4*h),A=new Hs(R,_,y,h);A.type=$t,A.needsUpdate=!0;let C=4*x;for(let D=0;D<h;D++){let z=v[D],V=g[D],B=f[D],j=_*y*4*D;for(let W=0;W<z.count;W++){let Y=W*C;u===!0&&(r.fromBufferAttribute(z,W),R[j+Y+0]=r.x,R[j+Y+1]=r.y,R[j+Y+2]=r.z,R[j+Y+3]=0),p===!0&&(r.fromBufferAttribute(V,W),R[j+Y+4]=r.x,R[j+Y+5]=r.y,R[j+Y+6]=r.z,R[j+Y+7]=0),m===!0&&(r.fromBufferAttribute(B,W),R[j+Y+8]=r.x,R[j+Y+9]=r.y,R[j+Y+10]=r.z,R[j+Y+11]=B.itemSize===4?r.w:1)}}d={count:h,texture:A,size:new se(_,y)},n.set(a,d),a.addEventListener("dispose",F)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let u=0;for(let m=0;m<l.length;m++)u+=l[m];let p=a.morphTargetsRelative?1:1-u;o.getUniforms().setValue(i,"morphTargetBaseInfluence",p),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}}}function Nd(i,e,t,n){let r=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,l=a.geometry,c=e.get(a,l);if(r.get(c)!==o&&(e.update(c),r.set(c,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),r.get(a)!==o&&(t.update(a.instanceMatrix,i.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,i.ARRAY_BUFFER),r.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;r.get(h)!==o&&(h.update(),r.set(h,o))}return c},dispose:function(){r=new WeakMap}}}function Xi(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=yh[r];if(s===void 0&&(s=new Float32Array(r),yh[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function lt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ct(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function pa(i,e){let t=Mh[e];t===void 0&&(t=new Int32Array(e),Mh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Od(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Fd(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;i.uniform2fv(this.addr,e),ct(t,e)}}function Bd(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(lt(t,e))return;i.uniform3fv(this.addr,e),ct(t,e)}}function zd(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;i.uniform4fv(this.addr,e),ct(t,e)}}function kd(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(lt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,n))return;wh.set(n),i.uniformMatrix2fv(this.addr,!1,wh),ct(t,n)}}function Hd(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(lt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,n))return;bh.set(n),i.uniformMatrix3fv(this.addr,!1,bh),ct(t,n)}}function Gd(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(lt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,n))return;Sh.set(n),i.uniformMatrix4fv(this.addr,!1,Sh),ct(t,n)}}function Vd(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Wd(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;i.uniform2iv(this.addr,e),ct(t,e)}}function jd(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(lt(t,e))return;i.uniform3iv(this.addr,e),ct(t,e)}}function Xd(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;i.uniform4iv(this.addr,e),ct(t,e)}}function qd(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Yd(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;i.uniform2uiv(this.addr,e),ct(t,e)}}function Zd(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(lt(t,e))return;i.uniform3uiv(this.addr,e),ct(t,e)}}function Jd(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;i.uniform4uiv(this.addr,e),ct(t,e)}}function Kd(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(xh.compareFunction=su,s=xh):s=hu,t.setTexture2D(e||s,r)}function $d(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||du,r)}function Qd(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||pu,r)}function ep(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||uu,r)}function tp(i,e){i.uniform1fv(this.addr,e)}function np(i,e){let t=Xi(e,this.size,2);i.uniform2fv(this.addr,t)}function ip(i,e){let t=Xi(e,this.size,3);i.uniform3fv(this.addr,t)}function rp(i,e){let t=Xi(e,this.size,4);i.uniform4fv(this.addr,t)}function sp(i,e){let t=Xi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ap(i,e){let t=Xi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function op(i,e){let t=Xi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function lp(i,e){i.uniform1iv(this.addr,e)}function cp(i,e){i.uniform2iv(this.addr,e)}function hp(i,e){i.uniform3iv(this.addr,e)}function up(i,e){i.uniform4iv(this.addr,e)}function dp(i,e){i.uniform1uiv(this.addr,e)}function pp(i,e){i.uniform2uiv(this.addr,e)}function mp(i,e){i.uniform3uiv(this.addr,e)}function fp(i,e){i.uniform4uiv(this.addr,e)}function gp(i,e,t){let n=this.cache,r=e.length,s=pa(t,r);lt(n,s)||(i.uniform1iv(this.addr,s),ct(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||hu,s[a])}function vp(i,e,t){let n=this.cache,r=e.length,s=pa(t,r);lt(n,s)||(i.uniform1iv(this.addr,s),ct(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||du,s[a])}function _p(i,e,t){let n=this.cache,r=e.length,s=pa(t,r);lt(n,s)||(i.uniform1iv(this.addr,s),ct(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||pu,s[a])}function xp(i,e,t){let n=this.cache,r=e.length,s=pa(t,r);lt(n,s)||(i.uniform1iv(this.addr,s),ct(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||uu,s[a])}function Eh(i,e){i.seq.push(e),i.map[e.id]=e}function yp(i,e,t){let n=i.name,r=n.length;for(oo.lastIndex=0;;){let s=oo.exec(n),a=oo.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===r){Eh(t,c===void 0?new el(o,i,e):new tl(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new nl(o),Eh(t,h)),t=h}}}function Th(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}function Ah(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+(function(o,l){let c=o.split(`
`),h=[],d=Math.max(l-6,0),u=Math.min(l+6,c.length);for(let p=d;p<u;p++){let m=p+1;h.push(`${m===l?">":" "} ${m}: ${c[p]}`)}return h.join(`
`)})(i.getShaderSource(e),a)}return r}function bp(i,e){let t=(function(n){let r=Ve.getPrimaries(Ve.workingColorSpace),s=Ve.getPrimaries(n),a;switch(r===s?a="":r===Bs&&s===Fs?a="LinearDisplayP3ToLinearSRGB":r===Fs&&s===Bs&&(a="LinearSRGBToLinearDisplayP3"),n){case On:case da:return[a,"LinearTransferOETF"];case bt:case Jl:return[a,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[a,"LinearTransferOETF"]}})(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function wp(i,e){let t;switch(e){case Ku:t="Linear";break;case $u:t="Reinhard";break;case Qu:t="Cineon";break;case Gl:t="ACESFilmic";break;case td:t="AgX";break;case nd:t="Neutral";break;case ed:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Ep(){return Ve.getLuminanceCoefficients(ys),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${ys.x.toFixed(4)}, ${ys.y.toFixed(4)}, ${ys.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ur(i){return i!==""}function Rh(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ch(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function il(i){return i.replace(Tp,Rp)}function Rp(i,e){let t=Ie[e];if(t===void 0){let n=Ap.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=Ie[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return il(t)}function Ph(i){return i.replace(Cp,Pp)}function Pp(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ih(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ip(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=(function(V){let B="SHADOWMAP_TYPE_BASIC";return V.shadowMapType===qh?B="SHADOWMAP_TYPE_PCF":V.shadowMapType===kl?B="SHADOWMAP_TYPE_PCF_SOFT":V.shadowMapType===dn&&(B="SHADOWMAP_TYPE_VSM"),B})(t),c=(function(V){let B="ENVMAP_TYPE_CUBE";if(V.envMap)switch(V.envMapMode){case Oi:case Fi:B="ENVMAP_TYPE_CUBE";break;case ua:B="ENVMAP_TYPE_CUBE_UV"}return B})(t),h=(function(V){let B="ENVMAP_MODE_REFLECTION";return V.envMap&&V.envMapMode===Fi&&(B="ENVMAP_MODE_REFRACTION"),B})(t),d=(function(V){let B="ENVMAP_BLENDING_NONE";if(V.envMap)switch(V.combine){case Yh:B="ENVMAP_BLENDING_MULTIPLY";break;case Zu:B="ENVMAP_BLENDING_MIX";break;case Ju:B="ENVMAP_BLENDING_ADD"}return B})(t),u=(function(V){let B=V.envMapCubeUVHeight;if(B===null)return null;let j=Math.log2(B)-2,W=1/B;return{texelWidth:1/(3*Math.max(Math.pow(2,j),112)),texelHeight:W,maxMip:j}})(t),p=(function(V){return[V.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",V.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ur).join(`
`)})(t),m=(function(V){let B=[];for(let j in V){let W=V[j];W!==!1&&B.push("#define "+j+" "+W)}return B.join(`
`)})(s),v=r.createProgram(),g,f,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ur).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ur).join(`
`),f.length>0&&(f+=`
`)):(g=[Ih(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ur).join(`
`),f=[Ih(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?Ie.tonemapping_pars_fragment:"",t.toneMapping!==Pn?wp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,bp("linearToOutputTexel",t.outputColorSpace),Ep(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ur).join(`
`)),a=il(a),a=Rh(a,t),a=Ch(a,t),o=il(o),o=Rh(o,t),o=Ch(o,t),a=Ph(a),o=Ph(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===Yc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let _=x+g+a,y=x+f+o,R=Th(r,r.VERTEX_SHADER,_),A=Th(r,r.FRAGMENT_SHADER,y);function C(V){if(i.debug.checkShaderErrors){let B=r.getProgramInfoLog(v).trim(),j=r.getShaderInfoLog(R).trim(),W=r.getShaderInfoLog(A).trim(),Y=!0,J=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,R,A);else{let ne=Ah(r,R,"vertex"),ae=Ah(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+B+`
`+ne+`
`+ae)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):j!==""&&W!==""||(J=!1);J&&(V.diagnostics={runnable:Y,programLog:B,vertexShader:{log:j,prefix:g},fragmentShader:{log:W,prefix:f}})}r.deleteShader(R),r.deleteShader(A),F=new Ni(r,v),D=(function(B,j){let W={},Y=B.getProgramParameter(j,B.ACTIVE_ATTRIBUTES);for(let J=0;J<Y;J++){let ne=B.getActiveAttrib(j,J),ae=ne.name,ue=1;ne.type===B.FLOAT_MAT2&&(ue=2),ne.type===B.FLOAT_MAT3&&(ue=3),ne.type===B.FLOAT_MAT4&&(ue=4),W[ae]={type:ne.type,location:B.getAttribLocation(j,ae),locationSize:ue}}return W})(r,v)}let F,D;r.attachShader(v,R),r.attachShader(v,A),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v),this.getUniforms=function(){return F===void 0&&C(this),F},this.getAttributes=function(){return D===void 0&&C(this),D};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=r.getProgramParameter(v,Mp)),z},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Sp++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=A,this}function Up(i,e,t,n,r,s,a){let o=new Gs,l=new rl,c=new Set,h=[],d=r.logarithmicDepthBuffer,u=r.reverseDepthBuffer,p=r.vertexTextures,m=r.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,x,_,y,R){let A=y.fog,C=R.geometry,F=f.isMeshStandardMaterial?y.environment:null,D=(f.isMeshStandardMaterial?t:e).get(f.envMap||F),z=D&&D.mapping===ua?D.image.height:null,V=v[f.type];f.precision!==null&&(m=r.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));let B=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,j=B!==void 0?B.length:0,W,Y,J,ne,ae=0;if(C.morphAttributes.position!==void 0&&(ae=1),C.morphAttributes.normal!==void 0&&(ae=2),C.morphAttributes.color!==void 0&&(ae=3),V){let tr=Jt[V];W=tr.vertexShader,Y=tr.fragmentShader}else W=f.vertexShader,Y=f.fragmentShader,l.update(f),J=l.getVertexShaderID(f),ne=l.getFragmentShaderID(f);let ue=i.getRenderTarget(),fe=R.isInstancedMesh===!0,k=R.isBatchedMesh===!0,Z=!!f.map,le=!!f.matcap,he=!!D,w=!!f.aoMap,M=!!f.lightMap,U=!!f.bumpMap,G=!!f.normalMap,T=!!f.displacementMap,P=!!f.emissiveMap,S=!!f.metalnessMap,L=!!f.roughnessMap,I=f.anisotropy>0,$=f.clearcoat>0,O=f.dispersion>0,K=f.iridescence>0,te=f.sheen>0,Q=f.transmission>0,de=I&&!!f.anisotropyMap,pe=$&&!!f.clearcoatMap,ie=$&&!!f.clearcoatNormalMap,re=$&&!!f.clearcoatRoughnessMap,xe=K&&!!f.iridescenceMap,Ce=K&&!!f.iridescenceThicknessMap,ye=te&&!!f.sheenColorMap,ze=te&&!!f.sheenRoughnessMap,je=!!f.specularMap,tt=!!f.specularColorMap,ve=!!f.specularIntensityMap,De=Q&&!!f.transmissionMap,Xe=Q&&!!f.thicknessMap,Hr=!!f.gradientMap,pi=!!f.alphaMap,At=f.alphaTest>0,sn=!!f.alphaHash,kn=!!f.extensions,N=Pn;f.toneMapped&&(ue!==null&&ue.isXRRenderTarget!==!0||(N=i.toneMapping));let Hn={shaderID:V,shaderType:f.type,shaderName:f.name,vertexShader:W,fragmentShader:Y,defines:f.defines,customVertexShaderID:J,customFragmentShaderID:ne,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:k,batchingColor:k&&R._colorsTexture!==null,instancing:fe,instancingColor:fe&&R.instanceColor!==null,instancingMorph:fe&&R.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ue===null?i.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:On,alphaToCoverage:!!f.alphaToCoverage,map:Z,matcap:le,envMap:he,envMapMode:he&&D.mapping,envMapCubeUVHeight:z,aoMap:w,lightMap:M,bumpMap:U,normalMap:G,displacementMap:p&&T,emissiveMap:P,normalMapObjectSpace:G&&f.normalMapType===1,normalMapTangentSpace:G&&f.normalMapType===0,metalnessMap:S,roughnessMap:L,anisotropy:I,anisotropyMap:de,clearcoat:$,clearcoatMap:pe,clearcoatNormalMap:ie,clearcoatRoughnessMap:re,dispersion:O,iridescence:K,iridescenceMap:xe,iridescenceThicknessMap:Ce,sheen:te,sheenColorMap:ye,sheenRoughnessMap:ze,specularMap:je,specularColorMap:tt,specularIntensityMap:ve,transmission:Q,transmissionMap:De,thicknessMap:Xe,gradientMap:Hr,opaque:f.transparent===!1&&f.blending===1&&f.alphaToCoverage===!1,alphaMap:pi,alphaTest:At,alphaHash:sn,combine:f.combine,mapUv:Z&&g(f.map.channel),aoMapUv:w&&g(f.aoMap.channel),lightMapUv:M&&g(f.lightMap.channel),bumpMapUv:U&&g(f.bumpMap.channel),normalMapUv:G&&g(f.normalMap.channel),displacementMapUv:T&&g(f.displacementMap.channel),emissiveMapUv:P&&g(f.emissiveMap.channel),metalnessMapUv:S&&g(f.metalnessMap.channel),roughnessMapUv:L&&g(f.roughnessMap.channel),anisotropyMapUv:de&&g(f.anisotropyMap.channel),clearcoatMapUv:pe&&g(f.clearcoatMap.channel),clearcoatNormalMapUv:ie&&g(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&g(f.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&g(f.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&g(f.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&g(f.sheenColorMap.channel),sheenRoughnessMapUv:ze&&g(f.sheenRoughnessMap.channel),specularMapUv:je&&g(f.specularMap.channel),specularColorMapUv:tt&&g(f.specularColorMap.channel),specularIntensityMapUv:ve&&g(f.specularIntensityMap.channel),transmissionMapUv:De&&g(f.transmissionMap.channel),thicknessMapUv:Xe&&g(f.thicknessMap.channel),alphaMapUv:pi&&g(f.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(G||I),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!C.attributes.uv&&(Z||pi),fog:!!A,useFog:f.fog===!0,fogExp2:!!A&&A.isFogExp2,flatShading:f.flatShading===!0,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:u,skinning:R.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:ae,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&_.length>0,shadowMapType:i.shadowMap.type,toneMapping:N,decodeVideoTexture:Z&&f.map.isVideoTexture===!0&&Ve.getTransfer(f.map.colorSpace)===Ke,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===2,flipSided:f.side===Tt,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:kn&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(kn&&f.extensions.multiDraw===!0||k)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return Hn.vertexUv1s=c.has(1),Hn.vertexUv2s=c.has(2),Hn.vertexUv3s=c.has(3),c.clear(),Hn},getProgramCacheKey:function(f){let x=[];if(f.shaderID?x.push(f.shaderID):(x.push(f.customVertexShaderID),x.push(f.customFragmentShaderID)),f.defines!==void 0)for(let _ in f.defines)x.push(_),x.push(f.defines[_]);return f.isRawShaderMaterial===!1&&((function(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)})(x,f),(function(_,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),_.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.alphaToCoverage&&o.enable(20),_.push(o.mask)})(x,f),x.push(i.outputColorSpace)),x.push(f.customProgramCacheKey),x.join()},getUniforms:function(f){let x=v[f.type],_;if(x){let y=Jt[x];_=_d.clone(y.uniforms)}else _=f.uniforms;return _},acquireProgram:function(f,x){let _;for(let y=0,R=h.length;y<R;y++){let A=h[y];if(A.cacheKey===x){_=A,++_.usedTimes;break}}return _===void 0&&(_=new Ip(i,x,f,s),h.push(_)),_},releaseProgram:function(f){if(--f.usedTimes==0){let x=h.indexOf(f);h[x]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){l.remove(f)},programs:h,dispose:function(){l.dispose()}}}function Dp(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function Np(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Lh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Uh(){let i=[],e=0,t=[],n=[],r=[];function s(a,o,l,c,h,d){let u=i[e];return u===void 0?(u={id:a.id,object:a,geometry:o,material:l,groupOrder:c,renderOrder:a.renderOrder,z:h,group:d},i[e]=u):(u.id=a.id,u.object=a,u.geometry=o,u.material=l,u.groupOrder=c,u.renderOrder=a.renderOrder,u.z=h,u.group=d),e++,u}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(a,o,l,c,h,d){let u=s(a,o,l,c,h,d);l.transmission>0?n.push(u):l.transparent===!0?r.push(u):t.push(u)},unshift:function(a,o,l,c,h,d){let u=s(a,o,l,c,h,d);l.transmission>0?n.unshift(u):l.transparent===!0?r.unshift(u):t.unshift(u)},finish:function(){for(let a=e,o=i.length;a<o;a++){let l=i[a];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(a,o){t.length>1&&t.sort(a||Np),n.length>1&&n.sort(o||Lh),r.length>1&&r.sort(o||Lh)}}}function Op(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new Uh,i.set(e,[r])):t>=n.length?(r=new Uh,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function Fp(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new Pe};break;case"SpotLight":t={position:new E,direction:new E,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new E,halfWidth:new E,halfHeight:new E}}return i[e.id]=t,t}}}function zp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function kp(i){let e=new Fp,t=(function(){let o={};return{get:function(l){if(o[l.id]!==void 0)return o[l.id];let c;switch(l.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3}}return o[l.id]=c,c}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new E);let r=new E,s=new Re,a=new Re;return{setup:function(o){let l=0,c=0,h=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let d=0,u=0,p=0,m=0,v=0,g=0,f=0,x=0,_=0,y=0,R=0;o.sort(zp);for(let C=0,F=o.length;C<F;C++){let D=o[C],z=D.color,V=D.intensity,B=D.distance,j=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)l+=z.r*V,c+=z.g*V,h+=z.b*V;else if(D.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(D.sh.coefficients[W],V);R++}else if(D.isDirectionalLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let Y=D.shadow,J=t.get(D);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,n.directionalShadow[d]=J,n.directionalShadowMap[d]=j,n.directionalShadowMatrix[d]=D.shadow.matrix,g++}n.directional[d]=W,d++}else if(D.isSpotLight){let W=e.get(D);W.position.setFromMatrixPosition(D.matrixWorld),W.color.copy(z).multiplyScalar(V),W.distance=B,W.coneCos=Math.cos(D.angle),W.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),W.decay=D.decay,n.spot[p]=W;let Y=D.shadow;if(D.map&&(n.spotLightMap[_]=D.map,_++,Y.updateMatrices(D),D.castShadow&&y++),n.spotLightMatrix[p]=Y.matrix,D.castShadow){let J=t.get(D);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,n.spotShadow[p]=J,n.spotShadowMap[p]=j,x++}p++}else if(D.isRectAreaLight){let W=e.get(D);W.color.copy(z).multiplyScalar(V),W.halfWidth.set(.5*D.width,0,0),W.halfHeight.set(0,.5*D.height,0),n.rectArea[m]=W,m++}else if(D.isPointLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),W.distance=D.distance,W.decay=D.decay,D.castShadow){let Y=D.shadow,J=t.get(D);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,J.shadowCameraNear=Y.camera.near,J.shadowCameraFar=Y.camera.far,n.pointShadow[u]=J,n.pointShadowMap[u]=j,n.pointShadowMatrix[u]=D.shadow.matrix,f++}n.point[u]=W,u++}else if(D.isHemisphereLight){let W=e.get(D);W.skyColor.copy(D.color).multiplyScalar(V),W.groundColor.copy(D.groundColor).multiplyScalar(V),n.hemi[v]=W,v++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let A=n.hash;A.directionalLength===d&&A.pointLength===u&&A.spotLength===p&&A.rectAreaLength===m&&A.hemiLength===v&&A.numDirectionalShadows===g&&A.numPointShadows===f&&A.numSpotShadows===x&&A.numSpotMaps===_&&A.numLightProbes===R||(n.directional.length=d,n.spot.length=p,n.rectArea.length=m,n.point.length=u,n.hemi.length=v,n.directionalShadow.length=g,n.directionalShadowMap.length=g,n.pointShadow.length=f,n.pointShadowMap.length=f,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=g,n.pointShadowMatrix.length=f,n.spotLightMatrix.length=x+_-y,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=R,A.directionalLength=d,A.pointLength=u,A.spotLength=p,A.rectAreaLength=m,A.hemiLength=v,A.numDirectionalShadows=g,A.numPointShadows=f,A.numSpotShadows=x,A.numSpotMaps=_,A.numLightProbes=R,n.version=Bp++)},setupView:function(o,l){let c=0,h=0,d=0,u=0,p=0,m=l.matrixWorldInverse;for(let v=0,g=o.length;v<g;v++){let f=o[v];if(f.isDirectionalLight){let x=n.directional[c];x.direction.setFromMatrixPosition(f.matrixWorld),r.setFromMatrixPosition(f.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),c++}else if(f.isSpotLight){let x=n.spot[d];x.position.setFromMatrixPosition(f.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(f.matrixWorld),r.setFromMatrixPosition(f.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),d++}else if(f.isRectAreaLight){let x=n.rectArea[u];x.position.setFromMatrixPosition(f.matrixWorld),x.position.applyMatrix4(m),a.identity(),s.copy(f.matrixWorld),s.premultiply(m),a.extractRotation(s),x.halfWidth.set(.5*f.width,0,0),x.halfHeight.set(0,.5*f.height,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),u++}else if(f.isPointLight){let x=n.point[h];x.position.setFromMatrixPosition(f.matrixWorld),x.position.applyMatrix4(m),h++}else if(f.isHemisphereLight){let x=n.hemi[p];x.direction.setFromMatrixPosition(f.matrixWorld),x.direction.transformDirection(m),p++}}},state:n}}function Dh(i){let e=new kp(i),t=[],n=[],r={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){r.camera=s,t.length=0,n.length=0},state:r,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function Hp(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),s;return r===void 0?(s=new Dh(i),e.set(t,[s])):n>=r.length?(s=new Dh(i),r.push(s)):s=r[n],s},dispose:function(){e=new WeakMap}}}function Gp(i,e,t){let n=new Vi,r=new se,s=new se,a=new et,o=new al({depthPacking:3201}),l=new ol,c={},h=t.maxTextureSize,d={[Ln]:Tt,[Tt]:Ln,2:2},u=new tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let m=new Ye;m.setAttribute("position",new It(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new vt(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qh;let f=this.type;function x(A,C){let F=e.update(v);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new fn(r.x,r.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(C,null,F,u,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(C,null,F,p,v,null)}function _(A,C,F,D){let z=null,V=F.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(V!==void 0)z=V;else if(z=F.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let B=z.uuid,j=C.uuid,W=c[B];W===void 0&&(W={},c[B]=W);let Y=W[j];Y===void 0&&(Y=z.clone(),W[j]=Y,C.addEventListener("dispose",R)),z=Y}return z.visible=C.visible,z.wireframe=C.wireframe,z.side=D===dn?C.shadowSide!==null?C.shadowSide:C.side:C.shadowSide!==null?C.shadowSide:d[C.side],z.alphaMap=C.alphaMap,z.alphaTest=C.alphaTest,z.map=C.map,z.clipShadows=C.clipShadows,z.clippingPlanes=C.clippingPlanes,z.clipIntersection=C.clipIntersection,z.displacementMap=C.displacementMap,z.displacementScale=C.displacementScale,z.displacementBias=C.displacementBias,z.wireframeLinewidth=C.wireframeLinewidth,z.linewidth=C.linewidth,F.isPointLight===!0&&z.isMeshDistanceMaterial===!0&&(i.properties.get(z).light=F),z}function y(A,C,F,D,z){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&z===dn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,A.matrixWorld);let B=e.update(A),j=A.material;if(Array.isArray(j)){let W=B.groups;for(let Y=0,J=W.length;Y<J;Y++){let ne=W[Y],ae=j[ne.materialIndex];if(ae&&ae.visible){let ue=_(A,ae,D,z);A.onBeforeShadow(i,A,C,F,B,ue,ne),i.renderBufferDirect(F,null,B,ue,A,ne),A.onAfterShadow(i,A,C,F,B,ue,ne)}}}else if(j.visible){let W=_(A,j,D,z);A.onBeforeShadow(i,A,C,F,B,W,null),i.renderBufferDirect(F,null,B,W,A,null),A.onAfterShadow(i,A,C,F,B,W,null)}}let V=A.children;for(let B=0,j=V.length;B<j;B++)y(V[B],C,F,D,z)}function R(A){A.target.removeEventListener("dispose",R);for(let C in c){let F=c[C],D=A.target.uuid;D in F&&(F[D].dispose(),delete F[D])}}this.render=function(A,C,F){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;let D=i.getRenderTarget(),z=i.getActiveCubeFace(),V=i.getActiveMipmapLevel(),B=i.state;B.setBlending(0),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let j=f!==dn&&this.type===dn,W=f===dn&&this.type!==dn;for(let Y=0,J=A.length;Y<J;Y++){let ne=A[Y],ae=ne.shadow;if(ae===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(ae.autoUpdate===!1&&ae.needsUpdate===!1)continue;r.copy(ae.mapSize);let ue=ae.getFrameExtents();if(r.multiply(ue),s.copy(ae.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ue.x),r.x=s.x*ue.x,ae.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ue.y),r.y=s.y*ue.y,ae.mapSize.y=s.y)),ae.map===null||j===!0||W===!0){let k=this.type!==dn?{minFilter:Dt,magFilter:Dt}:{};ae.map!==null&&ae.map.dispose(),ae.map=new fn(r.x,r.y,k),ae.map.texture.name=ne.name+".shadowMap",ae.camera.updateProjectionMatrix()}i.setRenderTarget(ae.map),i.clear();let fe=ae.getViewportCount();for(let k=0;k<fe;k++){let Z=ae.getViewport(k);a.set(s.x*Z.x,s.y*Z.y,s.x*Z.z,s.y*Z.w),B.viewport(a),ae.updateMatrices(ne,k),n=ae.getFrustum(),y(C,F,ae.camera,ne,this.type)}ae.isPointLightShadow!==!0&&this.type===dn&&x(ae,F),ae.needsUpdate=!1}f=this.type,g.needsUpdate=!1,i.setRenderTarget(D,z,V)}}function Wp(i){let e=new function(){let S=!1,L=new et,I=null,$=new et(0,0,0,0);return{setMask:function(O){I===O||S||(i.colorMask(O,O,O,O),I=O)},setLocked:function(O){S=O},setClear:function(O,K,te,Q,de){de===!0&&(O*=Q,K*=Q,te*=Q),L.set(O,K,te,Q),$.equals(L)===!1&&(i.clearColor(O,K,te,Q),$.copy(L))},reset:function(){S=!1,I=null,$.set(-1,0,0,0)}}},t=new function(){let S=!1,L=!1,I=null,$=null,O=null;return{setReversed:function(K){L=K},setTest:function(K){K?le(i.DEPTH_TEST):he(i.DEPTH_TEST)},setMask:function(K){I===K||S||(i.depthMask(K),I=K)},setFunc:function(K){if(L&&(K=Vp[K]),$!==K){switch(K){case 0:i.depthFunc(i.NEVER);break;case 1:i.depthFunc(i.ALWAYS);break;case 2:i.depthFunc(i.LESS);break;case 3:default:i.depthFunc(i.LEQUAL);break;case 4:i.depthFunc(i.EQUAL);break;case 5:i.depthFunc(i.GEQUAL);break;case 6:i.depthFunc(i.GREATER);break;case 7:i.depthFunc(i.NOTEQUAL)}$=K}},setLocked:function(K){S=K},setClear:function(K){O!==K&&(i.clearDepth(K),O=K)},reset:function(){S=!1,I=null,$=null,O=null}}},n=new function(){let S=!1,L=null,I=null,$=null,O=null,K=null,te=null,Q=null,de=null;return{setTest:function(pe){S||(pe?le(i.STENCIL_TEST):he(i.STENCIL_TEST))},setMask:function(pe){L===pe||S||(i.stencilMask(pe),L=pe)},setFunc:function(pe,ie,re){I===pe&&$===ie&&O===re||(i.stencilFunc(pe,ie,re),I=pe,$=ie,O=re)},setOp:function(pe,ie,re){K===pe&&te===ie&&Q===re||(i.stencilOp(pe,ie,re),K=pe,te=ie,Q=re)},setLocked:function(pe){S=pe},setClear:function(pe){de!==pe&&(i.clearStencil(pe),de=pe)},reset:function(){S=!1,L=null,I=null,$=null,O=null,K=null,te=null,Q=null,de=null}}},r=new WeakMap,s=new WeakMap,a={},o={},l=new WeakMap,c=[],h=null,d=!1,u=null,p=null,m=null,v=null,g=null,f=null,x=null,_=new Pe(0,0,0),y=0,R=!1,A=null,C=null,F=null,D=null,z=null,V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,j=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(W)[1]),B=j>=1):W.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),B=j>=2);let Y=null,J={},ne=i.getParameter(i.SCISSOR_BOX),ae=i.getParameter(i.VIEWPORT),ue=new et().fromArray(ne),fe=new et().fromArray(ae);function k(S,L,I,$){let O=new Uint8Array(4),K=i.createTexture();i.bindTexture(S,K),i.texParameteri(S,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(S,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let te=0;te<I;te++)S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY?i.texImage3D(L,0,i.RGBA,1,1,$,0,i.RGBA,i.UNSIGNED_BYTE,O):i.texImage2D(L+te,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,O);return K}let Z={};function le(S){a[S]!==!0&&(i.enable(S),a[S]=!0)}function he(S){a[S]!==!1&&(i.disable(S),a[S]=!1)}Z[i.TEXTURE_2D]=k(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=k(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=k(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=k(i.TEXTURE_3D,i.TEXTURE_3D,1,1),e.setClear(0,0,0,1),t.setClear(1),n.setClear(0),le(i.DEPTH_TEST),t.setFunc(3),G(!1),T(1),le(i.CULL_FACE),U(0);let w={[ei]:i.FUNC_ADD,101:i.FUNC_SUBTRACT,102:i.FUNC_REVERSE_SUBTRACT};w[103]=i.MIN,w[104]=i.MAX;let M={200:i.ZERO,201:i.ONE,202:i.SRC_COLOR,[fo]:i.SRC_ALPHA,210:i.SRC_ALPHA_SATURATE,208:i.DST_COLOR,206:i.DST_ALPHA,203:i.ONE_MINUS_SRC_COLOR,[go]:i.ONE_MINUS_SRC_ALPHA,209:i.ONE_MINUS_DST_COLOR,207:i.ONE_MINUS_DST_ALPHA,211:i.CONSTANT_COLOR,212:i.ONE_MINUS_CONSTANT_COLOR,213:i.CONSTANT_ALPHA,214:i.ONE_MINUS_CONSTANT_ALPHA};function U(S,L,I,$,O,K,te,Q,de,pe){if(S!==0){if(d===!1&&(le(i.BLEND),d=!0),S===5)O=O||L,K=K||I,te=te||$,L===p&&O===g||(i.blendEquationSeparate(w[L],w[O]),p=L,g=O),I===m&&$===v&&K===f&&te===x||(i.blendFuncSeparate(M[I],M[$],M[K],M[te]),m=I,v=$,f=K,x=te),Q.equals(_)!==!1&&de===y||(i.blendColor(Q.r,Q.g,Q.b,de),_.copy(Q),y=de),u=S,R=!1;else if(S!==u||pe!==R){if(p===ei&&g===ei||(i.blendEquation(i.FUNC_ADD),p=ei,g=ei),pe)switch(S){case 1:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.ONE,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}else switch(S){case 1:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}m=null,v=null,f=null,x=null,_.set(0,0,0),y=0,u=S,R=pe}}else d===!0&&(he(i.BLEND),d=!1)}function G(S){A!==S&&(S?i.frontFace(i.CW):i.frontFace(i.CCW),A=S)}function T(S){S!==0?(le(i.CULL_FACE),S!==C&&(S===1?i.cullFace(i.BACK):S===2?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):he(i.CULL_FACE),C=S}function P(S,L,I){S?(le(i.POLYGON_OFFSET_FILL),D===L&&z===I||(i.polygonOffset(L,I),D=L,z=I)):he(i.POLYGON_OFFSET_FILL)}return{buffers:{color:e,depth:t,stencil:n},enable:le,disable:he,bindFramebuffer:function(S,L){return o[S]!==L&&(i.bindFramebuffer(S,L),o[S]=L,S===i.DRAW_FRAMEBUFFER&&(o[i.FRAMEBUFFER]=L),S===i.FRAMEBUFFER&&(o[i.DRAW_FRAMEBUFFER]=L),!0)},drawBuffers:function(S,L){let I=c,$=!1;if(S){I=l.get(L),I===void 0&&(I=[],l.set(L,I));let O=S.textures;if(I.length!==O.length||I[0]!==i.COLOR_ATTACHMENT0){for(let K=0,te=O.length;K<te;K++)I[K]=i.COLOR_ATTACHMENT0+K;I.length=O.length,$=!0}}else I[0]!==i.BACK&&(I[0]=i.BACK,$=!0);$&&i.drawBuffers(I)},useProgram:function(S){return h!==S&&(i.useProgram(S),h=S,!0)},setBlending:U,setMaterial:function(S,L){S.side===2?he(i.CULL_FACE):le(i.CULL_FACE);let I=S.side===Tt;L&&(I=!I),G(I),S.blending===1&&S.transparent===!1?U(0):U(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),t.setFunc(S.depthFunc),t.setTest(S.depthTest),t.setMask(S.depthWrite),e.setMask(S.colorWrite);let $=S.stencilWrite;n.setTest($),$&&(n.setMask(S.stencilWriteMask),n.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),n.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),P(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?le(i.SAMPLE_ALPHA_TO_COVERAGE):he(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:G,setCullFace:T,setLineWidth:function(S){S!==F&&(B&&i.lineWidth(S),F=S)},setPolygonOffset:P,setScissorTest:function(S){S?le(i.SCISSOR_TEST):he(i.SCISSOR_TEST)},activeTexture:function(S){S===void 0&&(S=i.TEXTURE0+V-1),Y!==S&&(i.activeTexture(S),Y=S)},bindTexture:function(S,L,I){I===void 0&&(I=Y===null?i.TEXTURE0+V-1:Y);let $=J[I];$===void 0&&($={type:void 0,texture:void 0},J[I]=$),$.type===S&&$.texture===L||(Y!==I&&(i.activeTexture(I),Y=I),i.bindTexture(S,L||Z[S]),$.type=S,$.texture=L)},unbindTexture:function(){let S=J[Y];S!==void 0&&S.type!==void 0&&(i.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexImage3D:function(){try{i.compressedTexImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage2D:function(){try{i.texImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage3D:function(){try{i.texImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},updateUBOMapping:function(S,L){let I=s.get(L);I===void 0&&(I=new WeakMap,s.set(L,I));let $=I.get(S);$===void 0&&($=i.getUniformBlockIndex(L,S.name),I.set(S,$))},uniformBlockBinding:function(S,L){let I=s.get(L).get(S);r.get(L)!==I&&(i.uniformBlockBinding(L,I,S.__bindingPointIndex),r.set(L,I))},texStorage2D:function(){try{i.texStorage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texStorage3D:function(){try{i.texStorage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage2D:function(){try{i.texSubImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage3D:function(){try{i.texSubImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},scissor:function(S){ue.equals(S)===!1&&(i.scissor(S.x,S.y,S.z,S.w),ue.copy(S))},viewport:function(S){fe.equals(S)===!1&&(i.viewport(S.x,S.y,S.z,S.w),fe.copy(S))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),a={},Y=null,J={},o={},l=new WeakMap,c=[],h=null,d=!1,u=null,p=null,m=null,v=null,g=null,f=null,x=null,_=new Pe(0,0,0),y=0,R=!1,A=null,C=null,F=null,D=null,z=null,ue.set(0,0,i.canvas.width,i.canvas.height),fe.set(0,0,i.canvas.width,i.canvas.height),e.reset(),t.reset(),n.reset()}}}function Nh(i,e,t,n){let r=(function(s){switch(s){case mn:case Jh:return{byteLength:1,components:1};case xr:case Kh:case Dr:return{byteLength:2,components:1};case Wl:case jl:return{byteLength:2,components:4};case ii:case Vl:case $t:return{byteLength:4,components:1};case $h:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case Qh:case tu:return i*e;case nu:return i*e*2;case Xl:case ql:return i*e/r.components*r.byteLength;case iu:case Yl:return i*e*2/r.components*r.byteLength;case eu:return i*e*3/r.components*r.byteLength;case Vt:case Zl:return i*e*4/r.components*r.byteLength;case Cs:case Ps:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Is:case Ls:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case So:case wo:return Math.max(i,16)*Math.max(e,8)/4;case Mo:case bo:return Math.max(i,8)*Math.max(e,8)/2;case Eo:case To:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ao:case Ro:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Co:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Po:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Io:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Lo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Uo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Do:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case No:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Oo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Fo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Bo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case zo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ko:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ho:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Us:case Go:case Vo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ru:case Wo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case jo:case Xo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function jp(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new se,h=new WeakMap,d,u=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(w,M){return p?new OffscreenCanvas(w,M):Sr("canvas")}function v(w,M,U){let G=1,T=he(w);if((T.width>U||T.height>U)&&(G=U/Math.max(T.width,T.height)),G<1){if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let P=Math.floor(G*T.width),S=Math.floor(G*T.height);d===void 0&&(d=m(P,S));let L=M?m(P,S):d;return L.width=P,L.height=S,L.getContext("2d").drawImage(w,0,0,P,S),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+P+"x"+S+")."),L}return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),w}return w}function g(w){return w.generateMipmaps&&w.minFilter!==Dt&&w.minFilter!==Kt}function f(w){i.generateMipmap(w)}function x(w,M,U,G,T=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let P=M;if(M===i.RED&&(U===i.FLOAT&&(P=i.R32F),U===i.HALF_FLOAT&&(P=i.R16F),U===i.UNSIGNED_BYTE&&(P=i.R8)),M===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(P=i.R8UI),U===i.UNSIGNED_SHORT&&(P=i.R16UI),U===i.UNSIGNED_INT&&(P=i.R32UI),U===i.BYTE&&(P=i.R8I),U===i.SHORT&&(P=i.R16I),U===i.INT&&(P=i.R32I)),M===i.RG&&(U===i.FLOAT&&(P=i.RG32F),U===i.HALF_FLOAT&&(P=i.RG16F),U===i.UNSIGNED_BYTE&&(P=i.RG8)),M===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(P=i.RG8UI),U===i.UNSIGNED_SHORT&&(P=i.RG16UI),U===i.UNSIGNED_INT&&(P=i.RG32UI),U===i.BYTE&&(P=i.RG8I),U===i.SHORT&&(P=i.RG16I),U===i.INT&&(P=i.RG32I)),M===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(P=i.RGB8UI),U===i.UNSIGNED_SHORT&&(P=i.RGB16UI),U===i.UNSIGNED_INT&&(P=i.RGB32UI),U===i.BYTE&&(P=i.RGB8I),U===i.SHORT&&(P=i.RGB16I),U===i.INT&&(P=i.RGB32I)),M===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(P=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(P=i.RGBA16UI),U===i.UNSIGNED_INT&&(P=i.RGBA32UI),U===i.BYTE&&(P=i.RGBA8I),U===i.SHORT&&(P=i.RGBA16I),U===i.INT&&(P=i.RGBA32I)),M===i.RGB&&U===i.UNSIGNED_INT_5_9_9_9_REV&&(P=i.RGB9_E5),M===i.RGBA){let S=T?Os:Ve.getTransfer(G);U===i.FLOAT&&(P=i.RGBA32F),U===i.HALF_FLOAT&&(P=i.RGBA16F),U===i.UNSIGNED_BYTE&&(P=S===Ke?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT_4_4_4_4&&(P=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(P=i.RGB5_A1)}return P!==i.R16F&&P!==i.R32F&&P!==i.RG16F&&P!==i.RG32F&&P!==i.RGBA16F&&P!==i.RGBA32F||e.get("EXT_color_buffer_float"),P}function _(w,M){let U;return w?M===null||M===ii||M===Bi?U=i.DEPTH24_STENCIL8:M===$t?U=i.DEPTH32F_STENCIL8:M===xr&&(U=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ii||M===Bi?U=i.DEPTH_COMPONENT24:M===$t?U=i.DEPTH_COMPONENT32F:M===xr&&(U=i.DEPTH_COMPONENT16),U}function y(w,M){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Dt&&w.minFilter!==Kt?Math.log2(Math.max(M.width,M.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?M.mipmaps.length:1}function R(w){let M=w.target;M.removeEventListener("dispose",R),(function(U){let G=n.get(U);if(G.__webglInit===void 0)return;let T=U.source,P=u.get(T);if(P){let S=P[G.__cacheKey];S.usedTimes--,S.usedTimes===0&&C(U),Object.keys(P).length===0&&u.delete(T)}n.remove(U)})(M),M.isVideoTexture&&h.delete(M)}function A(w){let M=w.target;M.removeEventListener("dispose",A),(function(U){let G=n.get(U);if(U.depthTexture&&U.depthTexture.dispose(),U.isWebGLCubeRenderTarget)for(let P=0;P<6;P++){if(Array.isArray(G.__webglFramebuffer[P]))for(let S=0;S<G.__webglFramebuffer[P].length;S++)i.deleteFramebuffer(G.__webglFramebuffer[P][S]);else i.deleteFramebuffer(G.__webglFramebuffer[P]);G.__webglDepthbuffer&&i.deleteRenderbuffer(G.__webglDepthbuffer[P])}else{if(Array.isArray(G.__webglFramebuffer))for(let P=0;P<G.__webglFramebuffer.length;P++)i.deleteFramebuffer(G.__webglFramebuffer[P]);else i.deleteFramebuffer(G.__webglFramebuffer);if(G.__webglDepthbuffer&&i.deleteRenderbuffer(G.__webglDepthbuffer),G.__webglMultisampledFramebuffer&&i.deleteFramebuffer(G.__webglMultisampledFramebuffer),G.__webglColorRenderbuffer)for(let P=0;P<G.__webglColorRenderbuffer.length;P++)G.__webglColorRenderbuffer[P]&&i.deleteRenderbuffer(G.__webglColorRenderbuffer[P]);G.__webglDepthRenderbuffer&&i.deleteRenderbuffer(G.__webglDepthRenderbuffer)}let T=U.textures;for(let P=0,S=T.length;P<S;P++){let L=n.get(T[P]);L.__webglTexture&&(i.deleteTexture(L.__webglTexture),a.memory.textures--),n.remove(T[P])}n.remove(U)})(M)}function C(w){let M=n.get(w);i.deleteTexture(M.__webglTexture);let U=w.source;delete u.get(U)[M.__cacheKey],a.memory.textures--}let F=0;function D(w,M){let U=n.get(w);if(w.isVideoTexture&&(function(G){let T=a.render.frame;h.get(G)!==T&&(h.set(G,T),G.update())})(w),w.isRenderTargetTexture===!1&&w.version>0&&U.__version!==w.version){let G=w.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(G.complete!==!1)return void Y(U,w,M);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}t.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+M)}let z={[xo]:i.REPEAT,[_r]:i.CLAMP_TO_EDGE,[yo]:i.MIRRORED_REPEAT},V={[Dt]:i.NEAREST,[id]:i.NEAREST_MIPMAP_NEAREST,[es]:i.NEAREST_MIPMAP_LINEAR,[Kt]:i.LINEAR,[Ua]:i.LINEAR_MIPMAP_NEAREST,[Ii]:i.LINEAR_MIPMAP_LINEAR},B={512:i.NEVER,519:i.ALWAYS,513:i.LESS,[su]:i.LEQUAL,514:i.EQUAL,518:i.GEQUAL,516:i.GREATER,517:i.NOTEQUAL};function j(w,M){if(M.type!==$t||e.has("OES_texture_float_linear")!==!1||M.magFilter!==Kt&&M.magFilter!==Ua&&M.magFilter!==es&&M.magFilter!==Ii&&M.minFilter!==Kt&&M.minFilter!==Ua&&M.minFilter!==es&&M.minFilter!==Ii||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,z[M.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,z[M.wrapT]),w!==i.TEXTURE_3D&&w!==i.TEXTURE_2D_ARRAY||i.texParameteri(w,i.TEXTURE_WRAP_R,z[M.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,V[M.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,V[M.minFilter]),M.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,B[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Dt||M.minFilter!==es&&M.minFilter!==Ii||M.type===$t&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let U=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function W(w,M){let U=!1;w.__webglInit===void 0&&(w.__webglInit=!0,M.addEventListener("dispose",R));let G=M.source,T=u.get(G);T===void 0&&(T={},u.set(G,T));let P=(function(S){let L=[];return L.push(S.wrapS),L.push(S.wrapT),L.push(S.wrapR||0),L.push(S.magFilter),L.push(S.minFilter),L.push(S.anisotropy),L.push(S.internalFormat),L.push(S.format),L.push(S.type),L.push(S.generateMipmaps),L.push(S.premultiplyAlpha),L.push(S.flipY),L.push(S.unpackAlignment),L.push(S.colorSpace),L.join()})(M);if(P!==w.__cacheKey){T[P]===void 0&&(T[P]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,U=!0),T[P].usedTimes++;let S=T[w.__cacheKey];S!==void 0&&(T[w.__cacheKey].usedTimes--,S.usedTimes===0&&C(M)),w.__cacheKey=P,w.__webglTexture=T[P].texture}return U}function Y(w,M,U){let G=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(G=i.TEXTURE_3D);let T=W(w,M),P=M.source;t.bindTexture(G,w.__webglTexture,i.TEXTURE0+U);let S=n.get(P);if(P.version!==S.__version||T===!0){t.activeTexture(i.TEXTURE0+U);let L=Ve.getPrimaries(Ve.workingColorSpace),I=M.colorSpace===Ci?null:Ve.getPrimaries(M.colorSpace),$=M.colorSpace===Ci||L===I?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let O=v(M.image,!1,r.maxTextureSize);O=le(M,O);let K=s.convert(M.format,M.colorSpace),te=s.convert(M.type),Q,de=x(M.internalFormat,K,te,M.colorSpace,M.isVideoTexture);j(G,M);let pe=M.mipmaps,ie=M.isVideoTexture!==!0,re=S.__version===void 0||T===!0,xe=P.dataReady,Ce=y(M,O);if(M.isDepthTexture)de=_(M.format===zi,M.type),re&&(ie?t.texStorage2D(i.TEXTURE_2D,1,de,O.width,O.height):t.texImage2D(i.TEXTURE_2D,0,de,O.width,O.height,0,K,te,null));else if(M.isDataTexture)if(pe.length>0){ie&&re&&t.texStorage2D(i.TEXTURE_2D,Ce,de,pe[0].width,pe[0].height);for(let ye=0,ze=pe.length;ye<ze;ye++)Q=pe[ye],ie?xe&&t.texSubImage2D(i.TEXTURE_2D,ye,0,0,Q.width,Q.height,K,te,Q.data):t.texImage2D(i.TEXTURE_2D,ye,de,Q.width,Q.height,0,K,te,Q.data);M.generateMipmaps=!1}else ie?(re&&t.texStorage2D(i.TEXTURE_2D,Ce,de,O.width,O.height),xe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,O.width,O.height,K,te,O.data)):t.texImage2D(i.TEXTURE_2D,0,de,O.width,O.height,0,K,te,O.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){ie&&re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ce,de,pe[0].width,pe[0].height,O.depth);for(let ye=0,ze=pe.length;ye<ze;ye++)if(Q=pe[ye],M.format!==Vt)if(K!==null)if(ie){if(xe)if(M.layerUpdates.size>0){let je=Nh(Q.width,Q.height,M.format,M.type);for(let tt of M.layerUpdates){let ve=Q.data.subarray(tt*je/Q.data.BYTES_PER_ELEMENT,(tt+1)*je/Q.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ye,0,0,tt,Q.width,Q.height,1,K,ve,0,0)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ye,0,0,0,Q.width,Q.height,O.depth,K,Q.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ye,de,Q.width,Q.height,O.depth,0,Q.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ie?xe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ye,0,0,0,Q.width,Q.height,O.depth,K,te,Q.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ye,de,Q.width,Q.height,O.depth,0,K,te,Q.data)}else{ie&&re&&t.texStorage2D(i.TEXTURE_2D,Ce,de,pe[0].width,pe[0].height);for(let ye=0,ze=pe.length;ye<ze;ye++)Q=pe[ye],M.format!==Vt?K!==null?ie?xe&&t.compressedTexSubImage2D(i.TEXTURE_2D,ye,0,0,Q.width,Q.height,K,Q.data):t.compressedTexImage2D(i.TEXTURE_2D,ye,de,Q.width,Q.height,0,Q.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ie?xe&&t.texSubImage2D(i.TEXTURE_2D,ye,0,0,Q.width,Q.height,K,te,Q.data):t.texImage2D(i.TEXTURE_2D,ye,de,Q.width,Q.height,0,K,te,Q.data)}else if(M.isDataArrayTexture)if(ie){if(re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ce,de,O.width,O.height,O.depth),xe)if(M.layerUpdates.size>0){let ye=Nh(O.width,O.height,M.format,M.type);for(let ze of M.layerUpdates){let je=O.data.subarray(ze*ye/O.data.BYTES_PER_ELEMENT,(ze+1)*ye/O.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ze,O.width,O.height,1,K,te,je)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,O.width,O.height,O.depth,K,te,O.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,de,O.width,O.height,O.depth,0,K,te,O.data);else if(M.isData3DTexture)ie?(re&&t.texStorage3D(i.TEXTURE_3D,Ce,de,O.width,O.height,O.depth),xe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,O.width,O.height,O.depth,K,te,O.data)):t.texImage3D(i.TEXTURE_3D,0,de,O.width,O.height,O.depth,0,K,te,O.data);else if(M.isFramebufferTexture){if(re)if(ie)t.texStorage2D(i.TEXTURE_2D,Ce,de,O.width,O.height);else{let ye=O.width,ze=O.height;for(let je=0;je<Ce;je++)t.texImage2D(i.TEXTURE_2D,je,de,ye,ze,0,K,te,null),ye>>=1,ze>>=1}}else if(pe.length>0){if(ie&&re){let ye=he(pe[0]);t.texStorage2D(i.TEXTURE_2D,Ce,de,ye.width,ye.height)}for(let ye=0,ze=pe.length;ye<ze;ye++)Q=pe[ye],ie?xe&&t.texSubImage2D(i.TEXTURE_2D,ye,0,0,K,te,Q):t.texImage2D(i.TEXTURE_2D,ye,de,K,te,Q);M.generateMipmaps=!1}else if(ie){if(re){let ye=he(O);t.texStorage2D(i.TEXTURE_2D,Ce,de,ye.width,ye.height)}xe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,K,te,O)}else t.texImage2D(i.TEXTURE_2D,0,de,K,te,O);g(M)&&f(G),S.__version=P.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function J(w,M,U,G,T,P){let S=s.convert(U.format,U.colorSpace),L=s.convert(U.type),I=x(U.internalFormat,S,L,U.colorSpace);if(!n.get(M).__hasExternalTextures){let $=Math.max(1,M.width>>P),O=Math.max(1,M.height>>P);T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY?t.texImage3D(T,P,I,$,O,M.depth,0,S,L,null):t.texImage2D(T,P,I,$,O,0,S,L,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),Z(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,T,n.get(U).__webglTexture,0,k(M)):(T===i.TEXTURE_2D||T>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&T<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,T,n.get(U).__webglTexture,P),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ne(w,M,U){if(i.bindRenderbuffer(i.RENDERBUFFER,w),M.depthBuffer){let G=M.depthTexture,T=G&&G.isDepthTexture?G.type:null,P=_(M.stencilBuffer,T),S=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,L=k(M);Z(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,L,P,M.width,M.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,L,P,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,P,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,S,i.RENDERBUFFER,w)}else{let G=M.textures;for(let T=0;T<G.length;T++){let P=G[T],S=s.convert(P.format,P.colorSpace),L=s.convert(P.type),I=x(P.internalFormat,S,L,P.colorSpace),$=k(M);U&&Z(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$,I,M.width,M.height):Z(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$,I,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,I,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ae(w){let M=n.get(w),U=w.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==w.depthTexture){let G=w.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),G){let T=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,G.removeEventListener("dispose",T)};G.addEventListener("dispose",T),M.__depthDisposeCallback=T}M.__boundDepthTexture=G}if(w.depthTexture&&!M.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");(function(G,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,G),!T.depthTexture||!T.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");n.get(T.depthTexture).__webglTexture&&T.depthTexture.image.width===T.width&&T.depthTexture.image.height===T.height||(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),D(T.depthTexture,0);let P=n.get(T.depthTexture).__webglTexture,S=k(T);if(T.depthTexture.format===yr)Z(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,P,0,S):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,P,0);else{if(T.depthTexture.format!==zi)throw new Error("Unknown depthTexture format");Z(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,P,0,S):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,P,0)}})(M.__webglFramebuffer,w)}else if(U){M.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[G]),M.__webglDepthbuffer[G]===void 0)M.__webglDepthbuffer[G]=i.createRenderbuffer(),ne(M.__webglDepthbuffer[G],w,!1);else{let T=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,P=M.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,P),i.framebufferRenderbuffer(i.FRAMEBUFFER,T,i.RENDERBUFFER,P)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),ne(M.__webglDepthbuffer,w,!1);else{let G=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,T=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,T),i.framebufferRenderbuffer(i.FRAMEBUFFER,G,i.RENDERBUFFER,T)}t.bindFramebuffer(i.FRAMEBUFFER,null)}let ue=[],fe=[];function k(w){return Math.min(r.maxSamples,w.samples)}function Z(w){let M=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function le(w,M){let U=w.colorSpace,G=w.format,T=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||U!==On&&U!==Ci&&(Ve.getTransfer(U)===Ke?G===Vt&&T===mn||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),M}function he(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=function(){let w=F;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),F+=1,w},this.resetTextureUnits=function(){F=0},this.setTexture2D=D,this.setTexture2DArray=function(w,M){let U=n.get(w);w.version>0&&U.__version!==w.version?Y(U,w,M):t.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+M)},this.setTexture3D=function(w,M){let U=n.get(w);w.version>0&&U.__version!==w.version?Y(U,w,M):t.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+M)},this.setTextureCube=function(w,M){let U=n.get(w);w.version>0&&U.__version!==w.version?(function(G,T,P){if(T.image.length!==6)return;let S=W(G,T),L=T.source;t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+P);let I=n.get(L);if(L.version!==I.__version||S===!0){t.activeTexture(i.TEXTURE0+P);let $=Ve.getPrimaries(Ve.workingColorSpace),O=T.colorSpace===Ci?null:Ve.getPrimaries(T.colorSpace),K=T.colorSpace===Ci||$===O?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let te=T.isCompressedTexture||T.image[0].isCompressedTexture,Q=T.image[0]&&T.image[0].isDataTexture,de=[];for(let ve=0;ve<6;ve++)de[ve]=te||Q?Q?T.image[ve].image:T.image[ve]:v(T.image[ve],!0,r.maxCubemapSize),de[ve]=le(T,de[ve]);let pe=de[0],ie=s.convert(T.format,T.colorSpace),re=s.convert(T.type),xe=x(T.internalFormat,ie,re,T.colorSpace),Ce=T.isVideoTexture!==!0,ye=I.__version===void 0||S===!0,ze=L.dataReady,je,tt=y(T,pe);if(j(i.TEXTURE_CUBE_MAP,T),te){Ce&&ye&&t.texStorage2D(i.TEXTURE_CUBE_MAP,tt,xe,pe.width,pe.height);for(let ve=0;ve<6;ve++){je=de[ve].mipmaps;for(let De=0;De<je.length;De++){let Xe=je[De];T.format!==Vt?ie!==null?Ce?ze&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De,0,0,Xe.width,Xe.height,ie,Xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De,xe,Xe.width,Xe.height,0,Xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ce?ze&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De,0,0,Xe.width,Xe.height,ie,re,Xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De,xe,Xe.width,Xe.height,0,ie,re,Xe.data)}}}else{if(je=T.mipmaps,Ce&&ye){je.length>0&&tt++;let ve=he(de[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,tt,xe,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(Q){Ce?ze&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,de[ve].width,de[ve].height,ie,re,de[ve].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,xe,de[ve].width,de[ve].height,0,ie,re,de[ve].data);for(let De=0;De<je.length;De++){let Xe=je[De].image[ve].image;Ce?ze&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De+1,0,0,Xe.width,Xe.height,ie,re,Xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De+1,xe,Xe.width,Xe.height,0,ie,re,Xe.data)}}else{Ce?ze&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,ie,re,de[ve]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,xe,ie,re,de[ve]);for(let De=0;De<je.length;De++){let Xe=je[De];Ce?ze&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De+1,0,0,ie,re,Xe.image[ve]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De+1,xe,ie,re,Xe.image[ve])}}}g(T)&&f(i.TEXTURE_CUBE_MAP),I.__version=L.version,T.onUpdate&&T.onUpdate(T)}G.__version=T.version})(U,w,M):t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+M)},this.rebindTextures=function(w,M,U){let G=n.get(w);M!==void 0&&J(G.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&ae(w)},this.setupRenderTarget=function(w){let M=w.texture,U=n.get(w),G=n.get(M);w.addEventListener("dispose",A);let T=w.textures,P=w.isWebGLCubeRenderTarget===!0,S=T.length>1;if(S||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=M.version,a.memory.textures++),P){U.__webglFramebuffer=[];for(let L=0;L<6;L++)if(M.mipmaps&&M.mipmaps.length>0){U.__webglFramebuffer[L]=[];for(let I=0;I<M.mipmaps.length;I++)U.__webglFramebuffer[L][I]=i.createFramebuffer()}else U.__webglFramebuffer[L]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){U.__webglFramebuffer=[];for(let L=0;L<M.mipmaps.length;L++)U.__webglFramebuffer[L]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(S)for(let L=0,I=T.length;L<I;L++){let $=n.get(T[L]);$.__webglTexture===void 0&&($.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&Z(w)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let L=0;L<T.length;L++){let I=T[L];U.__webglColorRenderbuffer[L]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[L]);let $=s.convert(I.format,I.colorSpace),O=s.convert(I.type),K=x(I.internalFormat,$,O,I.colorSpace,w.isXRRenderTarget===!0),te=k(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,te,K,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+L,i.RENDERBUFFER,U.__webglColorRenderbuffer[L])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),ne(U.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(P){t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),j(i.TEXTURE_CUBE_MAP,M);for(let L=0;L<6;L++)if(M.mipmaps&&M.mipmaps.length>0)for(let I=0;I<M.mipmaps.length;I++)J(U.__webglFramebuffer[L][I],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+L,I);else J(U.__webglFramebuffer[L],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+L,0);g(M)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(S){for(let L=0,I=T.length;L<I;L++){let $=T[L],O=n.get($);t.bindTexture(i.TEXTURE_2D,O.__webglTexture),j(i.TEXTURE_2D,$),J(U.__webglFramebuffer,w,$,i.COLOR_ATTACHMENT0+L,i.TEXTURE_2D,0),g($)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let L=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(L=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(L,G.__webglTexture),j(L,M),M.mipmaps&&M.mipmaps.length>0)for(let I=0;I<M.mipmaps.length;I++)J(U.__webglFramebuffer[I],w,M,i.COLOR_ATTACHMENT0,L,I);else J(U.__webglFramebuffer,w,M,i.COLOR_ATTACHMENT0,L,0);g(M)&&f(L),t.unbindTexture()}w.depthBuffer&&ae(w)},this.updateRenderTargetMipmap=function(w){let M=w.textures;for(let U=0,G=M.length;U<G;U++){let T=M[U];if(g(T)){let P=w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,S=n.get(T).__webglTexture;t.bindTexture(P,S),f(P),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(w){if(w.samples>0){if(Z(w)===!1){let M=w.textures,U=w.width,G=w.height,T=i.COLOR_BUFFER_BIT,P=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,S=n.get(w),L=M.length>1;if(L)for(let I=0;I<M.length;I++)t.bindFramebuffer(i.FRAMEBUFFER,S.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+I,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+I,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,S.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,S.__webglFramebuffer);for(let I=0;I<M.length;I++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(T|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(T|=i.STENCIL_BUFFER_BIT)),L){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,S.__webglColorRenderbuffer[I]);let $=n.get(M[I]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$,0)}i.blitFramebuffer(0,0,U,G,0,0,U,G,T,i.NEAREST),l===!0&&(ue.length=0,fe.length=0,ue.push(i.COLOR_ATTACHMENT0+I),w.depthBuffer&&w.resolveDepthBuffer===!1&&(ue.push(P),fe.push(P),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,fe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),L)for(let I=0;I<M.length;I++){t.bindFramebuffer(i.FRAMEBUFFER,S.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+I,i.RENDERBUFFER,S.__webglColorRenderbuffer[I]);let $=n.get(M[I]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+I,i.TEXTURE_2D,$,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,S.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let M=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}},this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Z}function Xp(i,e){return{convert:function(t,n=""){let r,s=Ve.getTransfer(n);if(t===mn)return i.UNSIGNED_BYTE;if(t===Wl)return i.UNSIGNED_SHORT_4_4_4_4;if(t===jl)return i.UNSIGNED_SHORT_5_5_5_1;if(t===$h)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===Jh)return i.BYTE;if(t===Kh)return i.SHORT;if(t===xr)return i.UNSIGNED_SHORT;if(t===Vl)return i.INT;if(t===ii)return i.UNSIGNED_INT;if(t===$t)return i.FLOAT;if(t===Dr)return i.HALF_FLOAT;if(t===Qh)return i.ALPHA;if(t===eu)return i.RGB;if(t===Vt)return i.RGBA;if(t===tu)return i.LUMINANCE;if(t===nu)return i.LUMINANCE_ALPHA;if(t===yr)return i.DEPTH_COMPONENT;if(t===zi)return i.DEPTH_STENCIL;if(t===Xl)return i.RED;if(t===ql)return i.RED_INTEGER;if(t===iu)return i.RG;if(t===Yl)return i.RG_INTEGER;if(t===Zl)return i.RGBA_INTEGER;if(t===Cs||t===Ps||t===Is||t===Ls)if(s===Ke){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===Cs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Is)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===Cs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Ps)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Is)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Ls)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Mo||t===So||t===bo||t===wo){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===Mo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===So)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===bo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===wo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===Eo||t===To||t===Ao){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===Eo||t===To)return s===Ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===Ao)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}if(t===Ro||t===Co||t===Po||t===Io||t===Lo||t===Uo||t===Do||t===No||t===Oo||t===Fo||t===Bo||t===zo||t===ko||t===Ho){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===Ro)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===Co)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Po)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Io)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Lo)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Uo)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Do)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===No)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Oo)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Fo)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Bo)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===zo)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===ko)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Ho)return s===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Us||t===Go||t===Vo){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===Us)return s===Ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Go)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Vo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===ru||t===Wo||t===jo||t===Xo){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===Us)return r.COMPRESSED_RED_RGTC1_EXT;if(t===Wo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===jo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Xo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Bi?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}function Zp(i,e){function t(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,t(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,t(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,t(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===Tt&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,t(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===Tt&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,t(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,t(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,l=a.envMapRotation;o&&(r.envMap.value=o,$n.copy(l),$n.x*=-1,$n.y*=-1,$n.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&($n.y*=-1,$n.z*=-1),r.envMapRotation.value.setFromMatrix4(Yp.makeRotationFromEuler($n)),r.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,lu(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,l){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(r,s):s.isMeshToonMaterial?(n(r,s),(function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)})(r,s)):s.isMeshStandardMaterial?(n(r,s),(function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(c,h,d){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Tt&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=d.texture,c.transmissionSamplerSize.value.set(d.width,d.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))})(r,s,l)):s.isMeshMatcapMaterial?(n(r,s),(function(c,h){h.matcap&&(c.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(c,h){let d=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(d.matrixWorld),c.nearDistance.value=d.shadow.camera.near,c.farDistance.value=d.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(c,h,d,u){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*d,c.scale.value=.5*u,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s,a,o):s.isSpriteMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function Jp(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(d,u,p,m){let v=d.value,g=u+"_"+p;if(m[g]===void 0)return m[g]=typeof v=="number"||typeof v=="boolean"?v:v.clone(),!0;{let f=m[g];if(typeof v=="number"||typeof v=="boolean"){if(f!==v)return m[g]=v,!0}else if(f.equals(v)===!1)return f.copy(v),!0}return!1}function c(d){let u={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(u.boundary=4,u.storage=4):d.isVector2?(u.boundary=8,u.storage=8):d.isVector3||d.isColor?(u.boundary=16,u.storage=12):d.isVector4?(u.boundary=16,u.storage=16):d.isMatrix3?(u.boundary=48,u.storage=48):d.isMatrix4?(u.boundary=64,u.storage=64):d.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",d),u}function h(d){let u=d.target;u.removeEventListener("dispose",h);let p=a.indexOf(u.__bindingPointIndex);a.splice(p,1),i.deleteBuffer(r[u.id]),delete r[u.id],delete s[u.id]}return{bind:function(d,u){let p=u.program;n.uniformBlockBinding(d,p)},update:function(d,u){let p=r[d.id];p===void 0&&((function(g){let f=g.uniforms,x=0,_=16;for(let R=0,A=f.length;R<A;R++){let C=Array.isArray(f[R])?f[R]:[f[R]];for(let F=0,D=C.length;F<D;F++){let z=C[F],V=Array.isArray(z.value)?z.value:[z.value];for(let B=0,j=V.length;B<j;B++){let W=c(V[B]),Y=x%_,J=Y%W.boundary,ne=Y+J;x+=J,ne!==0&&_-ne<W.storage&&(x+=_-ne),z.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=x,x+=W.storage}}}let y=x%_;y>0&&(x+=_-y),g.__size=x,g.__cache={}})(d),p=(function(g){let f=(function(){for(let R=0;R<o;R++)if(a.indexOf(R)===-1)return a.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();g.__bindingPointIndex=f;let x=i.createBuffer(),_=g.__size,y=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,_,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,f,x),x})(d),r[d.id]=p,d.addEventListener("dispose",h));let m=u.program;n.updateUBOMapping(d,m);let v=e.render.frame;s[d.id]!==v&&((function(g){let f=r[g.id],x=g.uniforms,_=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,f);for(let y=0,R=x.length;y<R;y++){let A=Array.isArray(x[y])?x[y]:[x[y]];for(let C=0,F=A.length;C<F;C++){let D=A[C];if(l(D,y,C,_)===!0){let z=D.__offset,V=Array.isArray(D.value)?D.value:[D.value],B=0;for(let j=0;j<V.length;j++){let W=V[j],Y=c(W);typeof W=="number"||typeof W=="boolean"?(D.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,z+B,D.__data)):W.isMatrix3?(D.__data[0]=W.elements[0],D.__data[1]=W.elements[1],D.__data[2]=W.elements[2],D.__data[3]=0,D.__data[4]=W.elements[3],D.__data[5]=W.elements[4],D.__data[6]=W.elements[5],D.__data[7]=0,D.__data[8]=W.elements[6],D.__data[9]=W.elements[7],D.__data[10]=W.elements[8],D.__data[11]=0):(W.toArray(D.__data,B),B+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)})(d),s[d.id]=v)},dispose:function(){for(let d in r)i.deleteBuffer(r[d]);a=[],r={},s={}}}}function $l(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,d){let u=(a-s)/c-(o-s)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,p*=h,r(a,o,u,p)},calc:function(s){let a=s*s;return i+e*s+t*a+n*(a*s)}}}function Bh(i,e,t,n,r){let s=.5*(n-e),a=.5*(r-t),o=i*i;return(2*t-2*n+s+a)*(i*o)+(-3*t+3*n-2*s-a)*o+s*i+t}function gr(i,e,t,n){return(function(r,s){let a=1-r;return a*a*s})(i,e)+(function(r,s){return 2*(1-r)*r*s})(i,t)+(function(r,s){return r*r*s})(i,n)}function vr(i,e,t,n,r){return(function(s,a){let o=1-s;return o*o*o*a})(i,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(i,t)+(function(s,a){return 3*(1-s)*s*s*a})(i,n)+(function(s,a){return s*s*s*a})(i,r)}function zh(i,e,t,n,r){let s,a;if(r===(function(o,l,c,h){let d=0;for(let u=l,p=c-h;u<c;u+=h)d+=(o[p]-o[u])*(o[u+1]+o[p+1]),p=u;return d})(i,e,t,n)>0)for(s=e;s<t;s+=n)a=kh(s,i[s],i[s+1],a);else for(s=t-n;s>=e;s-=n)a=kh(s,i[s],i[s+1],a);return a&&ma(a,a.next)&&(Pr(a),a=a.next),a}function oi(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!ma(n,n.next)&&rt(n.prev,n,n.next)!==0)n=n.next;else{if(Pr(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function Rr(i,e,t,n,r,s,a){if(!i)return;!a&&s&&(function(h,d,u,p){let m=h;do m.z===0&&(m.z=Ml(m.x,m.y,d,u,p)),m.prevZ=m.prev,m.nextZ=m.next,m=m.next;while(m!==h);m.prevZ.nextZ=null,m.prevZ=null,(function(v){let g,f,x,_,y,R,A,C,F=1;do{for(f=v,v=null,y=null,R=0;f;){for(R++,x=f,A=0,g=0;g<F&&(A++,x=x.nextZ,x);g++);for(C=F;A>0||C>0&&x;)A!==0&&(C===0||!x||f.z<=x.z)?(_=f,f=f.nextZ,A--):(_=x,x=x.nextZ,C--),y?y.nextZ=_:v=_,_.prevZ=y,y=_;f=x}y.nextZ=null,F*=2}while(R>1)})(m)})(i,n,r,s);let o,l,c=i;for(;i.prev!==i.next;)if(o=i.prev,l=i.next,s?em(i,n,r,s):Qp(i))e.push(o.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),Pr(i),i=l.next,c=l.next;else if((i=l)===c){a?a===1?Rr(i=tm(oi(i),e,t),e,t,n,r,s,2):a===2&&nm(i,e,t,n,r,s):Rr(oi(i),e,t,n,r,s,1);break}}function Qp(i){let e=i.prev,t=i,n=i.next;if(rt(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=r<s?r<a?r:a:s<a?s:a,d=o<l?o<c?o:c:l<c?l:c,u=r>s?r>a?r:a:s>a?s:a,p=o>l?o>c?o:c:l>c?l:c,m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=p&&Li(r,o,s,l,a,c,m.x,m.y)&&rt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function em(i,e,t,n){let r=i.prev,s=i,a=i.next;if(rt(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,h=r.y,d=s.y,u=a.y,p=o<l?o<c?o:c:l<c?l:c,m=h<d?h<u?h:u:d<u?d:u,v=o>l?o>c?o:c:l>c?l:c,g=h>d?h>u?h:u:d>u?d:u,f=Ml(p,m,e,t,n),x=Ml(v,g,e,t,n),_=i.prevZ,y=i.nextZ;for(;_&&_.z>=f&&y&&y.z<=x;){if(_.x>=p&&_.x<=v&&_.y>=m&&_.y<=g&&_!==r&&_!==a&&Li(o,h,l,d,c,u,_.x,_.y)&&rt(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=p&&y.x<=v&&y.y>=m&&y.y<=g&&y!==r&&y!==a&&Li(o,h,l,d,c,u,y.x,y.y)&&rt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=f;){if(_.x>=p&&_.x<=v&&_.y>=m&&_.y<=g&&_!==r&&_!==a&&Li(o,h,l,d,c,u,_.x,_.y)&&rt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=x;){if(y.x>=p&&y.x<=v&&y.y>=m&&y.y<=g&&y!==r&&y!==a&&Li(o,h,l,d,c,u,y.x,y.y)&&rt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function tm(i,e,t){let n=i;do{let r=n.prev,s=n.next.next;!ma(r,s)&&mu(r,n,n.next,s)&&Cr(r,s)&&Cr(s,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Pr(n),Pr(n.next),n=i=s),n=n.next}while(n!==i);return oi(n)}function nm(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&om(a,o)){let l=fu(a,o);return a=oi(a,a.next),l=oi(l,l.next),Rr(a,e,t,n,r,s,0),void Rr(l,e,t,n,r,s,0)}o=o.next}a=a.next}while(a!==i)}function im(i,e){return i.x-e.x}function rm(i,e){let t=(function(r,s){let a,o=s,l=-1/0,c=r.x,h=r.y;do{if(h<=o.y&&h>=o.next.y&&o.next.y!==o.y){let g=o.x+(h-o.y)*(o.next.x-o.x)/(o.next.y-o.y);if(g<=c&&g>l&&(l=g,a=o.x<o.next.x?o:o.next,g===c))return a}o=o.next}while(o!==s);if(!a)return null;let d=a,u=a.x,p=a.y,m,v=1/0;o=a;do c>=o.x&&o.x>=u&&c!==o.x&&Li(h<p?c:l,h,u,p,h<p?l:c,h,o.x,o.y)&&(m=Math.abs(h-o.y)/(c-o.x),Cr(o,r)&&(m<v||m===v&&(o.x>a.x||o.x===a.x&&sm(a,o)))&&(a=o,v=m)),o=o.next;while(o!==d);return a})(i,e);if(!t)return e;let n=fu(t,i);return oi(n,n.next),oi(t,t.next)}function sm(i,e){return rt(i.prev,i,e.prev)<0&&rt(e.next,i,i.next)<0}function Ml(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function am(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Li(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function om(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!(function(t,n){let r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==n.i&&r.next.i!==n.i&&mu(r,r.next,t,n))return!0;r=r.next}while(r!==t);return!1})(i,e)&&(Cr(i,e)&&Cr(e,i)&&(function(t,n){let r=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do r.y>o!=r.next.y>o&&r.next.y!==r.y&&a<(r.next.x-r.x)*(o-r.y)/(r.next.y-r.y)+r.x&&(s=!s),r=r.next;while(r!==t);return s})(i,e)&&(rt(i.prev,i,e.prev)||rt(i,e.prev,e))||ma(i,e)&&rt(i.prev,i,i.next)>0&&rt(e.prev,e,e.next)>0)}function rt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function ma(i,e){return i.x===e.x&&i.y===e.y}function mu(i,e,t,n){let r=As(rt(i,e,t)),s=As(rt(i,e,n)),a=As(rt(t,n,i)),o=As(rt(t,n,e));return r!==s&&a!==o||!(r!==0||!Ts(i,t,e))||!(s!==0||!Ts(i,n,e))||!(a!==0||!Ts(t,i,n))||!(o!==0||!Ts(t,e,n))}function Ts(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function As(i){return i>0?1:i<0?-1:0}function Cr(i,e){return rt(i.prev,i,i.next)<0?rt(i,e,i.next)>=0&&rt(i,i.prev,e)>=0:rt(i,e,i.prev)<0||rt(i,i.next,e)<0}function fu(i,e){let t=new Sl(i.i,i.x,i.y),n=new Sl(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function kh(i,e,t,n){let r=new Sl(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Pr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Sl(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Hh(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Gh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}function Vh(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}function Rs(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function cm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var qh,kl,dn,Ln,Tt,Hl,ei,fo,go,Yh,Zu,Ju,Pn,Ku,$u,Qu,Gl,ed,td,nd,Zh,Oi,Fi,vo,_o,ua,xo,_r,yo,Dt,id,es,Kt,Ua,Ii,mn,Jh,Kh,xr,Vl,ii,$t,Dr,Wl,jl,Bi,$h,Qh,eu,Vt,tu,nu,yr,zi,Xl,ql,iu,Yl,Zl,Cs,Ps,Is,Ls,Mo,So,bo,wo,Eo,To,Ao,Ro,Co,Po,Io,Lo,Uo,Do,No,Oo,Fo,Bo,zo,ko,Ho,Us,Go,Vo,ru,Wo,jo,Xo,Ns,qo,Da,Wc,jc,Xc,Ci,bt,On,Jl,da,Os,Ke,Fs,Bs,fi,su,qc,Yc,ki,zs,Un,_t,Zc,Ui,Mr,Nr,se,Le,Na,Jc,Kc,$c,sr,sd,Ve,gi,Zo,ad,ks,od,Et,et,Jo,fn,Hs,Ko,Nt,E,Ba,Qc,jt,on,kt,ts,vi,_i,xi,bn,wn,qn,ar,ns,is,Yn,ld,or,ka,Xt,ln,Ha,rs,En,Ga,ss,Va,Hi,Re,yi,Ht,cd,hd,Tn,as,Ct,eh,th,Qt,Gs,ud,nh,Mi,cn,os,lr,dd,pd,ih,rh,sh,ah,md,Si,Wa,ft,Gt,hn,ja,un,bi,wi,oh,Xa,qa,Ya,Za,Ja,Ka,Cn,ou,An,ls,Pe,xt,fd,ri,en,Hm,ot,cs,It,Vs,Ws,Se,vd,Ut,Qa,Ei,Pt,cr,pt,Ye,lh,Zn,hs,ch,us,ds,ps,eo,ms,hh,fs,vt,Dn,_d,tn,br,Rn,uh,dh,wt,Ti,$o,js,Qo,to,xd,yd,pn,Jn,vs,Vi,gn,Ie,ce,Jt,_s,Kn,Sd,Xs,ph,hr,no,mh,io,ro,so,ao,Qn,Ai,fh,qs,Ys,hu,xh,uu,du,pu,yh,Mh,Sh,bh,wh,el,tl,nl,oo,Ni,Mp,Sp,ys,Tp,Ap,Cp,Lp,rl,sl,Bp,al,ol,Vp,ll,qe,qp,fr,cl,hl,$n,Yp,Zs,Js,Ks,Gm,Vm,Wm,jm,Xm,qm,Ym,Zm,Jm,Km,$m,Qm,ef,tf,nf,rf,sf,af,of,lf,cf,hf,uf,df,ul,pf,mf,$s,Ri,Oh,Ms,Fh,Kp,dr,pr,Nn,dl,ff,gf,vf,_f,xf,yf,Mf,Sf,bf,wf,Ef,Tf,Af,Rf,Cf,Pf,If,Lf,Uf,Df,Nf,Of,Ff,Bf,zf,kf,wr,Ot,Er,pl,Ss,lo,co,ho,Tr,Qs,ml,ea,fl,ta,na,ia,ra,gl,Ar,sa,vl,_l,qt,si,ai,xl,bs,ws,uo,Es,yl,Wi,$p,In,Ir,lm,li,bl,wl,El,ci,Tl,nn,Al,Lr,Rl,Hf,hi,ji,Cl,Pl,Il,Wt,ti,Ll,Ul,Dl,aa,ni,Nl,Wh,Ol,hm,Ur,Fl,oa,la,ca,po,jh,Xh,Bl,Gf,Vf,Wf,zl,ha,jf,Xf,qf,Yf,Zf,Jf,Kf,$f,Qf,eg,tg,Ql,um,mo,dm,pm,mm,Qe,ng,ig,rg,sg,ag,og,lg,cg,hg,ug,dg,pg,mg,fg,gg,vg,_g,xg,yg,gu=ir(()=>{qh=1,kl=2,dn=3,Ln=0,Tt=1,Hl=2,ei=100,fo=204,go=205,Yh=0,Zu=1,Ju=2,Pn=0,Ku=1,$u=2,Qu=3,Gl=4,ed=5,td=6,nd=7,Zh=300,Oi=301,Fi=302,vo=303,_o=304,ua=306,xo=1e3,_r=1001,yo=1002,Dt=1003,id=1004,es=1005,Kt=1006,Ua=1007,Ii=1008,mn=1009,Jh=1010,Kh=1011,xr=1012,Vl=1013,ii=1014,$t=1015,Dr=1016,Wl=1017,jl=1018,Bi=1020,$h=35902,Qh=1021,eu=1022,Vt=1023,tu=1024,nu=1025,yr=1026,zi=1027,Xl=1028,ql=1029,iu=1030,Yl=1031,Zl=1033,Cs=33776,Ps=33777,Is=33778,Ls=33779,Mo=35840,So=35841,bo=35842,wo=35843,Eo=36196,To=37492,Ao=37496,Ro=37808,Co=37809,Po=37810,Io=37811,Lo=37812,Uo=37813,Do=37814,No=37815,Oo=37816,Fo=37817,Bo=37818,zo=37819,ko=37820,Ho=37821,Us=36492,Go=36494,Vo=36495,ru=36283,Wo=36284,jo=36285,Xo=36286,Ns=2300,qo=2301,Da=2302,Wc=2400,jc=2401,Xc=2402,Ci="",bt="srgb",On="srgb-linear",Jl="display-p3",da="display-p3-linear",Os="linear",Ke="srgb",Fs="rec709",Bs="p3",fi=7680,su=515,qc=35044,Yc="300 es",ki=2e3,zs=2001,Un=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let n=this._listeners[e];if(n!==void 0){let r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let t=this._listeners[e.type];if(t!==void 0){e.target=this;let n=t.slice(0);for(let r=0,s=n.length;r<s;r++)n[r].call(this,e);e.target=null}}},_t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Zc=1234567,Ui=Math.PI/180,Mr=180/Math.PI;Nr={DEG2RAD:Ui,RAD2DEG:Mr,generateUUID:ui,clamp:mt,euclideanModulo:Yo,mapLinear:function(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)},inverseLerp:function(i,e,t){return i!==e?(t-i)/(e-i):0},lerp:mr,damp:function(i,e,t,n){return mr(i,e,1-Math.exp(-t*n))},pingpong:function(i,e=1){return e-Math.abs(Yo(i,2*e)-e)},smoothstep:function(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e))*i*(3-2*i)},smootherstep:function(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e))*i*i*(i*(6*i-15)+10)},randInt:function(i,e){return i+Math.floor(Math.random()*(e-i+1))},randFloat:function(i,e){return i+Math.random()*(e-i)},randFloatSpread:function(i){return i*(.5-Math.random())},seededRandom:function(i){i!==void 0&&(Zc=i);let e=Zc+=1831565813;return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},degToRad:function(i){return i*Ui},radToDeg:function(i){return i*Mr},isPowerOfTwo:function(i){return(i&i-1)==0&&i!==0},ceilPowerOfTwo:function(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))},floorPowerOfTwo:function(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))},setQuaternionFromProperEuler:function(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),d=s((e-n)/2),u=a((e-n)/2),p=s((n-e)/2),m=a((n-e)/2);switch(r){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*m,l*p,o*c);break;case"YXY":i.set(l*p,o*h,l*m,o*c);break;case"ZYZ":i.set(l*m,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}},normalize:Mt,denormalize:Pi},se=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Le=class i{constructor(e,t,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],m=n[8],v=r[0],g=r[3],f=r[6],x=r[1],_=r[4],y=r[7],R=r[2],A=r[5],C=r[8];return s[0]=a*v+o*x+l*R,s[3]=a*g+o*_+l*A,s[6]=a*f+o*y+l*C,s[1]=c*v+h*x+d*R,s[4]=c*g+h*_+d*A,s[7]=c*f+h*y+d*C,s[2]=u*v+p*x+m*R,s[5]=u*g+p*_+m*A,s[8]=u*f+p*y+m*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*s,p=c*s-a*l,m=t*d+n*u+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/m;return e[0]=d*v,e[1]=(r*c-h*n)*v,e[2]=(o*n-r*a)*v,e[3]=u*v,e[4]=(h*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Na.makeScale(e,t)),this}rotate(e){return this.premultiply(Na.makeRotation(-e)),this}translate(e,t){return this.premultiply(Na.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Na=new Le;Jc={};Kc=new Le().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),$c=new Le().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),sr={[On]:{transfer:Os,primaries:Fs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[bt]:{transfer:Ke,primaries:Fs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[da]:{transfer:Os,primaries:Bs,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3($c),fromReference:i=>i.applyMatrix3(Kc)},[Jl]:{transfer:Ke,primaries:Bs,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3($c),fromReference:i=>i.applyMatrix3(Kc).convertLinearToSRGB()}},sd=new Set([On,da]),Ve={enabled:!0,_workingColorSpace:On,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!sd.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=sr[e].toReference;return(0,sr[t].fromReference)(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return sr[i].primaries},getTransfer:function(i){return i===Ci?Os:sr[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(sr[e].luminanceCoefficients)}};Zo=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{gi===void 0&&(gi=Sr("canvas")),gi.width=e.width,gi.height=e.height;let n=gi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=gi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Sr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=255*Di(s[a]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*Di(t[n]/255)):t[n]=Di(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ad=0,ks=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=ui(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Fa(r[a].image)):s.push(Fa(r[a]))}else s=Fa(r);n.url=s}return t||(e.images[this.uuid]=n),n}};od=0,Et=class i extends Un{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=Vt,l=mn,c=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=ui(),this.name="",this.source=new ks(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xo:e.x=e.x-Math.floor(e.x);break;case _r:e.x=e.x<0?0:1;break;case yo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case xo:e.y=e.y-Math.floor(e.y);break;case _r:e.y=e.y<0?0:1;break;case yo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Et.DEFAULT_IMAGE=null,Et.DEFAULT_MAPPING=Zh,Et.DEFAULT_ANISOTROPY=1;et=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],m=l[9],v=l[2],g=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,y=(p+1)/2,R=(f+1)/2,A=(h+u)/4,C=(d+v)/4,F=(m+g)/4;return _>y&&_>R?_<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(_),r=A/n,s=C/n):y>R?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=A/r,s=F/r):R<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),n=C/s,r=F/s),this.set(n,r,s,t),this}let x=Math.sqrt((g-m)*(g-m)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(g-m)/x,this.y=(d-v)/x,this.z=(u-h)/x,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Jo=class extends Un{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t);let r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new Et(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new ks(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},fn=class extends Jo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Hs=class extends Et{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=_r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Ko=class extends Et{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=_r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Nt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],d=n[r+3],u=s[a+0],p=s[a+1],m=s[a+2],v=s[a+3];if(o===0)return e[t+0]=l,e[t+1]=c,e[t+2]=h,void(e[t+3]=d);if(o===1)return e[t+0]=u,e[t+1]=p,e[t+2]=m,void(e[t+3]=v);if(d!==v||l!==u||c!==p||h!==m){let g=1-o,f=l*u+c*p+h*m+d*v,x=f>=0?1:-1,_=1-f*f;if(_>Number.EPSILON){let R=Math.sqrt(_),A=Math.atan2(R,f*x);g=Math.sin(g*A)/R,o=Math.sin(o*A)/R}let y=o*x;if(l=l*g+u*y,c=c*g+p*y,h=h*g+m*y,d=d*g+v*y,g===1-o){let R=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=R,c*=R,h*=R,d*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],d=s[a],u=s[a+1],p=s[a+2],m=s[a+3];return e[t]=o*m+h*d+l*p-c*u,e[t+1]=l*m+h*u+c*d-o*p,e[t+2]=c*m+h*p+o*u-l*d,e[t+3]=h*m-o*d-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),d=o(s/2),u=l(n/2),p=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*p*m,this._y=c*p*d-u*h*m,this._z=c*h*m+u*p*d,this._w=c*h*d-u*p*m;break;case"YXZ":this._x=u*h*d+c*p*m,this._y=c*p*d-u*h*m,this._z=c*h*m-u*p*d,this._w=c*h*d+u*p*m;break;case"ZXY":this._x=u*h*d-c*p*m,this._y=c*p*d+u*h*m,this._z=c*h*m+u*p*d,this._w=c*h*d-u*p*m;break;case"ZYX":this._x=u*h*d-c*p*m,this._y=c*p*d+u*h*m,this._z=c*h*m-u*p*d,this._w=c*h*d+u*p*m;break;case"YZX":this._x=u*h*d+c*p*m,this._y=c*p*d+u*h*m,this._z=c*h*m-u*p*d,this._w=c*h*d-u*p*m;break;case"XZY":this._x=u*h*d-c*p*m,this._y=c*p*d-u*h*m,this._z=c*h*m+u*p*d,this._w=c*h*d+u*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>d){let p=2*Math.sqrt(1+n-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-n-d);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+d-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=r*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},E=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-s*d,this.z=r+l*d+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ba.copy(this).projectOnVector(e),this.sub(Ba)}reflect(e){return this.sub(Ba.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ba=new E,Qc=new Nt,jt=class{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,kt):kt.fromBufferAttribute(s,a),kt.applyMatrix4(e.matrixWorld),this.expandByPoint(kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ts.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ts.copy(n.boundingBox)),ts.applyMatrix4(e.matrixWorld),this.union(ts)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,kt),kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ar),ns.subVectors(this.max,ar),vi.subVectors(e.a,ar),_i.subVectors(e.b,ar),xi.subVectors(e.c,ar),bn.subVectors(_i,vi),wn.subVectors(xi,_i),qn.subVectors(vi,xi);let t=[0,-bn.z,bn.y,0,-wn.z,wn.y,0,-qn.z,qn.y,bn.z,0,-bn.x,wn.z,0,-wn.x,qn.z,0,-qn.x,-bn.y,bn.x,0,-wn.y,wn.x,0,-qn.y,qn.x,0];return!!za(t,vi,_i,xi,ns)&&(t=[1,0,0,0,1,0,0,0,1],!!za(t,vi,_i,xi,ns)&&(is.crossVectors(bn,wn),t=[is.x,is.y,is.z],za(t,vi,_i,xi,ns)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(kt).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(on[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),on[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),on[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),on[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),on[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),on[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),on[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),on[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(on)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},on=[new E,new E,new E,new E,new E,new E,new E,new E],kt=new E,ts=new jt,vi=new E,_i=new E,xi=new E,bn=new E,wn=new E,qn=new E,ar=new E,ns=new E,is=new E,Yn=new E;ld=new jt,or=new E,ka=new E,Xt=class{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ld.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;or.subVectors(e,this.center);let t=or.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(or,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ka.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(or.copy(e.center).add(ka)),this.expandByPoint(or.copy(e.center).sub(ka))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},ln=new E,Ha=new E,rs=new E,En=new E,Ga=new E,ss=new E,Va=new E,Hi=class{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ln.copy(this.origin).addScaledVector(this.direction,t),ln.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ha.copy(e).add(t).multiplyScalar(.5),rs.copy(t).sub(e).normalize(),En.copy(this.origin).sub(Ha);let s=.5*e.distanceTo(t),a=-this.direction.dot(rs),o=En.dot(this.direction),l=-En.dot(rs),c=En.lengthSq(),h=Math.abs(1-a*a),d,u,p,m;if(h>0)if(d=a*l-o,u=a*o-l,m=s*h,d>=0)if(u>=-m)if(u<=m){let v=1/h;d*=v,u*=v,p=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ha).addScaledVector(rs,u),p}intersectSphere(e,t){ln.subVectors(e.center,this.origin);let n=ln.dot(this.direction),r=ln.dot(ln)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>r?null:((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>r?null:((o>n||n!=n)&&(n=o),(l<r||r!=r)&&(r=l),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,ln)!==null}intersectTriangle(e,t,n,r,s){Ga.subVectors(t,e),ss.subVectors(n,e),Va.crossVectors(Ga,ss);let a,o=this.direction.dot(Va);if(o>0){if(r)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}En.subVectors(this.origin,e);let l=a*this.direction.dot(ss.crossVectors(En,ss));if(l<0)return null;let c=a*this.direction.dot(Ga.cross(En));if(c<0||l+c>o)return null;let h=-a*En.dot(Va);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Re=class i{constructor(e,t,n,r,s,a,o,l,c,h,d,u,p,m,v,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,d,u,p,m,v,g)}set(e,t,n,r,s,a,o,l,c,h,d,u,p,m,v,g){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=m,f[11]=v,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/yi.setFromMatrixColumn(e,0).length(),s=1/yi.setFromMatrixColumn(e,1).length(),a=1/yi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let u=a*h,p=a*d,m=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+m*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=m+p*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,p=l*d,m=c*h,v=c*d;t[0]=u+v*o,t[4]=m*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-m,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,p=l*d,m=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,p=a*d,m=o*h,v=o*d;t[0]=l*h,t[4]=m*c-p,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=p*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,p=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=m*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*d+m,t[10]=u-v*d}else if(e.order==="XZY"){let u=a*l,p=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=p*d-m,t[2]=m*d-p,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cd,e,hd)}lookAt(e,t,n){let r=this.elements;return Ct.subVectors(e,t),Ct.lengthSq()===0&&(Ct.z=1),Ct.normalize(),Tn.crossVectors(n,Ct),Tn.lengthSq()===0&&(Math.abs(n.z)===1?Ct.x+=1e-4:Ct.z+=1e-4,Ct.normalize(),Tn.crossVectors(n,Ct)),Tn.normalize(),as.crossVectors(Ct,Tn),r[0]=Tn.x,r[4]=as.x,r[8]=Ct.x,r[1]=Tn.y,r[5]=as.y,r[9]=Ct.y,r[2]=Tn.z,r[6]=as.z,r[10]=Ct.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],m=n[2],v=n[6],g=n[10],f=n[14],x=n[3],_=n[7],y=n[11],R=n[15],A=r[0],C=r[4],F=r[8],D=r[12],z=r[1],V=r[5],B=r[9],j=r[13],W=r[2],Y=r[6],J=r[10],ne=r[14],ae=r[3],ue=r[7],fe=r[11],k=r[15];return s[0]=a*A+o*z+l*W+c*ae,s[4]=a*C+o*V+l*Y+c*ue,s[8]=a*F+o*B+l*J+c*fe,s[12]=a*D+o*j+l*ne+c*k,s[1]=h*A+d*z+u*W+p*ae,s[5]=h*C+d*V+u*Y+p*ue,s[9]=h*F+d*B+u*J+p*fe,s[13]=h*D+d*j+u*ne+p*k,s[2]=m*A+v*z+g*W+f*ae,s[6]=m*C+v*V+g*Y+f*ue,s[10]=m*F+v*B+g*J+f*fe,s[14]=m*D+v*j+g*ne+f*k,s[3]=x*A+_*z+y*W+R*ae,s[7]=x*C+_*V+y*Y+R*ue,s[11]=x*F+_*B+y*J+R*fe,s[15]=x*D+_*j+y*ne+R*k,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],p=e[14];return e[3]*(+s*l*d-r*c*d-s*o*u+n*c*u+r*o*p-n*l*p)+e[7]*(+t*l*p-t*c*u+s*a*u-r*a*p+r*c*h-s*l*h)+e[11]*(+t*c*d-t*o*p-s*a*d+n*a*p+s*o*h-n*c*h)+e[15]*(-r*o*h-t*l*d+t*o*u+r*a*d-n*a*u+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],p=e[11],m=e[12],v=e[13],g=e[14],f=e[15],x=d*g*c-v*u*c+v*l*p-o*g*p-d*l*f+o*u*f,_=m*u*c-h*g*c-m*l*p+a*g*p+h*l*f-a*u*f,y=h*v*c-m*d*c+m*o*p-a*v*p-h*o*f+a*d*f,R=m*d*l-h*v*l-m*o*u+a*v*u+h*o*g-a*d*g,A=t*x+n*_+r*y+s*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/A;return e[0]=x*C,e[1]=(v*u*s-d*g*s-v*r*p+n*g*p+d*r*f-n*u*f)*C,e[2]=(o*g*s-v*l*s+v*r*c-n*g*c-o*r*f+n*l*f)*C,e[3]=(d*l*s-o*u*s-d*r*c+n*u*c+o*r*p-n*l*p)*C,e[4]=_*C,e[5]=(h*g*s-m*u*s+m*r*p-t*g*p-h*r*f+t*u*f)*C,e[6]=(m*l*s-a*g*s-m*r*c+t*g*c+a*r*f-t*l*f)*C,e[7]=(a*u*s-h*l*s+h*r*c-t*u*c-a*r*p+t*l*p)*C,e[8]=y*C,e[9]=(m*d*s-h*v*s-m*n*p+t*v*p+h*n*f-t*d*f)*C,e[10]=(a*v*s-m*o*s+m*n*c-t*v*c-a*n*f+t*o*f)*C,e[11]=(h*o*s-a*d*s-h*n*c+t*d*c+a*n*p-t*o*p)*C,e[12]=R*C,e[13]=(h*v*r-m*d*r+m*n*u-t*v*u-h*n*g+t*d*g)*C,e[14]=(m*o*r-a*v*r-m*n*l+t*v*l+a*n*g-t*o*g)*C,e[15]=(a*d*r-h*o*r+h*n*l-t*d*l-a*n*u+t*o*u)*C,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,d=o+o,u=s*c,p=s*h,m=s*d,v=a*h,g=a*d,f=o*d,x=l*c,_=l*h,y=l*d,R=n.x,A=n.y,C=n.z;return r[0]=(1-(v+f))*R,r[1]=(p+y)*R,r[2]=(m-_)*R,r[3]=0,r[4]=(p-y)*A,r[5]=(1-(u+f))*A,r[6]=(g+x)*A,r[7]=0,r[8]=(m+_)*C,r[9]=(g-x)*C,r[10]=(1-(u+v))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=yi.set(r[0],r[1],r[2]).length(),a=yi.set(r[4],r[5],r[6]).length(),o=yi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Ht.copy(this);let l=1/s,c=1/a,h=1/o;return Ht.elements[0]*=l,Ht.elements[1]*=l,Ht.elements[2]*=l,Ht.elements[4]*=c,Ht.elements[5]*=c,Ht.elements[6]*=c,Ht.elements[8]*=h,Ht.elements[9]*=h,Ht.elements[10]*=h,t.setFromRotationMatrix(Ht),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=2e3){let l=this.elements,c=2*s/(t-e),h=2*s/(n-r),d=(t+e)/(t-e),u=(n+r)/(n-r),p,m;if(o===ki)p=-(a+s)/(a-s),m=-2*a*s/(a-s);else{if(o!==zs)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);p=-a/(a-s),m=-a*s/(a-s)}return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=2e3){let l=this.elements,c=1/(t-e),h=1/(n-r),d=1/(a-s),u=(t+e)*c,p=(n+r)*h,m,v;if(o===ki)m=(a+s)*d,v=-2*d;else{if(o!==zs)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=s*d,v=-1*d}return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},yi=new E,Ht=new Re,cd=new E(0,0,0),hd=new E(1,1,1),Tn=new E,as=new E,Ct=new E,eh=new Re,th=new Nt,Qt=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-mt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return eh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(eh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return th.setFromEuler(this),this.setFromQuaternion(th,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qt.DEFAULT_ORDER="XYZ";Gs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!=0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},ud=0,nh=new E,Mi=new Nt,cn=new Re,os=new E,lr=new E,dd=new E,pd=new Nt,ih=new E(1,0,0),rh=new E(0,1,0),sh=new E(0,0,1),ah={type:"added"},md={type:"removed"},Si={type:"childadded",child:null},Wa={type:"childremoved",child:null},ft=class i extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new E,t=new Qt,n=new Nt,r=new E(1,1,1);t._onChange((function(){n.setFromEuler(t,!1)})),n._onChange((function(){t.setFromQuaternion(n,void 0,!1)})),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Re},normalMatrix:{value:new Le}}),this.matrix=new Re,this.matrixWorld=new Re,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.premultiply(Mi),this}rotateX(e){return this.rotateOnAxis(ih,e)}rotateY(e){return this.rotateOnAxis(rh,e)}rotateZ(e){return this.rotateOnAxis(sh,e)}translateOnAxis(e,t){return nh.copy(e).applyQuaternion(this.quaternion),this.position.add(nh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ih,e)}translateY(e){return this.translateOnAxis(rh,e)}translateZ(e){return this.translateOnAxis(sh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(cn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?os.copy(e):os.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cn.lookAt(lr,os,this.up):cn.lookAt(os,lr,this.up),this.quaternion.setFromRotationMatrix(cn),r&&(cn.extractRotation(r.matrixWorld),Mi.setFromRotationMatrix(cn),this.quaternion.premultiply(Mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ah),Si.child=e,this.dispatchEvent(Si),Si.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(md),Wa.child=e,this.dispatchEvent(Wa),Wa.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),cn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),cn.multiply(e.parent.matrixWorld)),e.applyMatrix4(cn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ah),Si.child=e,this.dispatchEvent(Si),Si.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,e,dd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,pd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map((o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()}))),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()})),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};ft.DEFAULT_UP=new E(0,1,0),ft.DEFAULT_MATRIX_AUTO_UPDATE=!0,ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Gt=new E,hn=new E,ja=new E,un=new E,bi=new E,wi=new E,oh=new E,Xa=new E,qa=new E,Ya=new E,Za=new et,Ja=new et,Ka=new et,Cn=class i{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Gt.subVectors(e,t),r.cross(Gt);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Gt.subVectors(r,t),hn.subVectors(n,t),ja.subVectors(e,t);let a=Gt.dot(Gt),o=Gt.dot(hn),l=Gt.dot(ja),c=hn.dot(hn),h=hn.dot(ja),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let u=1/d,p=(c*l-o*h)*u,m=(a*h-o*l)*u;return s.set(1-p-m,m,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,un)!==null&&un.x>=0&&un.y>=0&&un.x+un.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,un.x),l.addScaledVector(a,un.y),l.addScaledVector(o,un.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Za.setScalar(0),Ja.setScalar(0),Ka.setScalar(0),Za.fromBufferAttribute(e,t),Ja.fromBufferAttribute(e,n),Ka.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Za,s.x),a.addScaledVector(Ja,s.y),a.addScaledVector(Ka,s.z),a}static isFrontFacing(e,t,n,r){return Gt.subVectors(n,t),hn.subVectors(e,t),Gt.cross(hn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gt.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),.5*Gt.cross(hn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;bi.subVectors(r,n),wi.subVectors(s,n),Xa.subVectors(e,n);let l=bi.dot(Xa),c=wi.dot(Xa);if(l<=0&&c<=0)return t.copy(n);qa.subVectors(e,r);let h=bi.dot(qa),d=wi.dot(qa);if(h>=0&&d<=h)return t.copy(r);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(bi,a);Ya.subVectors(e,s);let p=bi.dot(Ya),m=wi.dot(Ya);if(m>=0&&p<=m)return t.copy(s);let v=p*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(wi,o);let g=h*m-p*d;if(g<=0&&d-h>=0&&p-m>=0)return oh.subVectors(s,r),o=(d-h)/(d-h+(p-m)),t.copy(r).addScaledVector(oh,o);let f=1/(g+v+u);return a=v*f,o=u*f,t.copy(n).addScaledVector(bi,a).addScaledVector(wi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ou={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},ls={h:0,s:0,l:0};Pe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Ve.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Ve.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ve.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Ve.workingColorSpace){if(e=Yo(e,1),t=mt(t,0,1),n=mt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=$a(a,s,e+1/3),this.g=$a(a,s,e),this.b=$a(a,s,e-1/3)}return Ve.toWorkingColorSpace(this,r),this}setStyle(e,t=bt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){let n=ou[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}copyLinearToSRGB(e){return this.r=Oa(e.r),this.g=Oa(e.g),this.b=Oa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return Ve.fromWorkingColorSpace(xt.copy(this),e),65536*Math.round(mt(255*xt.r,0,255))+256*Math.round(mt(255*xt.g,0,255))+Math.round(mt(255*xt.b,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ve.workingColorSpace){Ve.fromWorkingColorSpace(xt.copy(this),t);let n=xt.r,r=xt.g,s=xt.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ve.workingColorSpace){return Ve.fromWorkingColorSpace(xt.copy(this),t),e.r=xt.r,e.g=xt.g,e.b=xt.b,e}getStyle(e=bt){Ve.fromWorkingColorSpace(xt.copy(this),e);let t=xt.r,n=xt.g,r=xt.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(An),this.setHSL(An.h+e,An.s+t,An.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(An),e.getHSL(ls);let n=mr(An.h,ls.h,t),r=mr(An.s,ls.s,t),s=mr(An.l,ls.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},xt=new Pe;Pe.NAMES=ou;fd=0,ri=class extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=1,this.side=Ln,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fo,this.blendDst=go,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fi,this.stencilZFail=fi,this.stencilZPass=fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==Ln&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==fo&&(n.blendSrc=this.blendSrc),this.blendDst!==go&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},en=class extends ri{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.combine=Yh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Hm=gd();ot=new E,cs=new se,It=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qc,this.updateRanges=[],this.gpuType=$t,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)cs.fromBufferAttribute(this,t),cs.applyMatrix3(e),this.setXY(t,cs.x,cs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.applyMatrix3(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.applyMatrix4(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.applyNormalMatrix(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.transformDirection(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array),s=Mt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qc&&(e.usage=this.usage),e}},Vs=class extends It{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Ws=class extends It{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Se=class extends It{constructor(e,t,n){super(new Float32Array(e),t,n)}},vd=0,Ut=new Re,Qa=new ft,Ei=new E,Pt=new jt,cr=new jt,pt=new E,Ye=class i extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(au(e)?Ws:Vs)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Le().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ut.makeRotationFromQuaternion(e),this.applyMatrix4(Ut),this}rotateX(e){return Ut.makeRotationX(e),this.applyMatrix4(Ut),this}rotateY(e){return Ut.makeRotationY(e),this.applyMatrix4(Ut),this}rotateZ(e){return Ut.makeRotationZ(e),this.applyMatrix4(Ut),this}translate(e,t,n){return Ut.makeTranslation(e,t,n),this.applyMatrix4(Ut),this}scale(e,t,n){return Ut.makeScale(e,t,n),this.applyMatrix4(Ut),this}lookAt(e){return Qa.lookAt(e),Qa.updateMatrix(),this.applyMatrix4(Qa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(e){let t=[];for(let n=0,r=e.length;n<r;n++){let s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Se(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new jt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Pt.setFromBufferAttribute(s),this.morphTargetsRelative?(pt.addVectors(this.boundingBox.min,Pt.min),this.boundingBox.expandByPoint(pt),pt.addVectors(this.boundingBox.max,Pt.max),this.boundingBox.expandByPoint(pt)):(this.boundingBox.expandByPoint(Pt.min),this.boundingBox.expandByPoint(Pt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new E,1/0);if(e){let n=this.boundingSphere.center;if(Pt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];cr.setFromBufferAttribute(o),this.morphTargetsRelative?(pt.addVectors(Pt.min,cr.min),Pt.expandByPoint(pt),pt.addVectors(Pt.max,cr.max),Pt.expandByPoint(pt)):(Pt.expandByPoint(cr.min),Pt.expandByPoint(cr.max))}Pt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)pt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(pt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)pt.fromBufferAttribute(o,c),l&&(Ei.fromBufferAttribute(e,c),pt.add(Ei)),r=Math.max(r,n.distanceToSquared(pt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new It(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let F=0;F<n.count;F++)o[F]=new E,l[F]=new E;let c=new E,h=new E,d=new E,u=new se,p=new se,m=new se,v=new E,g=new E;function f(F,D,z){c.fromBufferAttribute(n,F),h.fromBufferAttribute(n,D),d.fromBufferAttribute(n,z),u.fromBufferAttribute(s,F),p.fromBufferAttribute(s,D),m.fromBufferAttribute(s,z),h.sub(c),d.sub(c),p.sub(u),m.sub(u);let V=1/(p.x*m.y-m.x*p.y);isFinite(V)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(V),g.copy(d).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(V),o[F].add(v),o[D].add(v),o[z].add(v),l[F].add(g),l[D].add(g),l[z].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let F=0,D=x.length;F<D;++F){let z=x[F],V=z.start;for(let B=V,j=V+z.count;B<j;B+=3)f(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let _=new E,y=new E,R=new E,A=new E;function C(F){R.fromBufferAttribute(r,F),A.copy(R);let D=o[F];_.copy(D),_.sub(R.multiplyScalar(R.dot(D))).normalize(),y.crossVectors(A,D);let z=y.dot(l[F])<0?-1:1;a.setXYZW(F,_.x,_.y,_.z,z)}for(let F=0,D=x.length;F<D;++F){let z=x[F],V=z.start;for(let B=V,j=V+z.count;B<j;B+=3)C(e.getX(B+0)),C(e.getX(B+1)),C(e.getX(B+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new It(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let r=new E,s=new E,a=new E,o=new E,l=new E,c=new E,h=new E,d=new E;if(e)for(let u=0,p=e.count;u<p;u+=3){let m=e.getX(u+0),v=e.getX(u+1),g=e.getX(u+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)pt.fromBufferAttribute(e,t),pt.normalize(),e.setXYZ(t,pt.x,pt.y,pt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),p=0,m=0;for(let v=0,g=l.length;v<g;v++){p=o.isInterleavedBufferAttribute?l[v]*o.data.stride+o.offset:l[v]*h;for(let f=0;f<h;f++)u[m++]=c[p++]}return new It(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=e(r[o],n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){let u=e(c[h],n);l.push(u)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],d=s[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},lh=new Re,Zn=new Hi,hs=new Xt,ch=new E,us=new E,ds=new E,ps=new E,eo=new E,ms=new E,hh=new E,fs=new E,vt=class extends ft{constructor(e=new Ye,t=new en){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){ms.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],d=s[l];h!==0&&(eo.fromBufferAttribute(d,e),a?ms.addScaledVector(eo,h):ms.addScaledVector(eo.sub(t),h))}t.add(ms)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),hs.copy(n.boundingSphere),hs.applyMatrix4(s),Zn.copy(e.ray).recast(e.near),hs.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(hs,ch)===null||Zn.origin.distanceToSquared(ch)>(e.far-e.near)**2))return;lh.copy(s).invert(),Zn.copy(e.ray).applyMatrix4(lh),n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Zn)}}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){let g=u[m],f=a[g.materialIndex];for(let x=Math.max(g.start,p.start),_=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));x<_;x+=3)r=gs(this,f,e,n,c,h,d,o.getX(x),o.getX(x+1),o.getX(x+2)),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}else for(let m=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);m<v;m+=3)r=gs(this,a,e,n,c,h,d,o.getX(m),o.getX(m+1),o.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){let g=u[m],f=a[g.materialIndex];for(let x=Math.max(g.start,p.start),_=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));x<_;x+=3)r=gs(this,f,e,n,c,h,d,x,x+1,x+2),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}else for(let m=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);m<v;m+=3)r=gs(this,a,e,n,c,h,d,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}};Dn=class i extends Ye{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,p=0;function m(v,g,f,x,_,y,R,A,C,F,D){let z=y/C,V=R/F,B=y/2,j=R/2,W=A/2,Y=C+1,J=F+1,ne=0,ae=0,ue=new E;for(let fe=0;fe<J;fe++){let k=fe*V-j;for(let Z=0;Z<Y;Z++){let le=Z*z-B;ue[v]=le*x,ue[g]=k*_,ue[f]=W,c.push(ue.x,ue.y,ue.z),ue[v]=0,ue[g]=0,ue[f]=A>0?1:-1,h.push(ue.x,ue.y,ue.z),d.push(Z/C),d.push(1-fe/F),ne+=1}}for(let fe=0;fe<F;fe++)for(let k=0;k<C;k++){let Z=u+k+Y*fe,le=u+k+Y*(fe+1),he=u+(k+1)+Y*(fe+1),w=u+(k+1)+Y*fe;l.push(Z,le,w),l.push(le,he,w),ae+=6}o.addGroup(p,ae,D),p+=ae,u+=ne}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Se(c,3)),this.setAttribute("normal",new Se(h,3)),this.setAttribute("uv",new Se(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};_d={clone:Gi,merge:St},tn=class extends ri{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gi(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let r=0;r<t.length;r++)n.push(t[r].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},br=class extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Re,this.projectionMatrix=new Re,this.projectionMatrixInverse=new Re,this.coordinateSystem=ki}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Rn=new E,uh=new se,dh=new se,wt=class extends br{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Mr*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Ui*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Mr*Math.atan(Math.tan(.5*Ui*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Rn.x,Rn.y).multiplyScalar(-e/Rn.z),Rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rn.x,Rn.y).multiplyScalar(-e/Rn.z)}getViewSize(e,t){return this.getViewBounds(e,uh,dh),t.subVectors(dh,uh)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Ui*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ti=-90,$o=class extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new wt(Ti,1,e,t);r.layers=this.layers,this.add(r);let s=new wt(Ti,1,e,t);s.layers=this.layers,this.add(s);let a=new wt(Ti,1,e,t);a.layers=this.layers,this.add(a);let o=new wt(Ti,1,e,t);o.layers=this.layers,this.add(o);let l=new wt(Ti,1,e,t);l.layers=this.layers,this.add(l);let c=new wt(Ti,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===ki)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==zs)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},js=class extends Et{constructor(e,t,n,r,s,a,o,l,c,h){super(e=e!==void 0?e:[],t=t!==void 0?t:Oi,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Qo=class extends fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new js(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Kt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Dn(5,5,5),s=new tn({name:"CubemapFromEquirect",uniforms:Gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Tt,blending:0});s.uniforms.tEquirect.value=t;let a=new vt(r,s),o=t.minFilter;return t.minFilter===Ii&&(t.minFilter=Kt),new $o(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}},to=new E,xd=new E,yd=new Le,pn=class{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=to.subVectors(n,t).cross(xd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(to),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||yd.getNormalMatrix(e),r=this.coplanarPoint(to).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Jn=new Xt,vs=new E,Vi=class{constructor(e=new pn,t=new pn,n=new pn,r=new pn,s=new pn,a=new pn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){let n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],h=r[5],d=r[6],u=r[7],p=r[8],m=r[9],v=r[10],g=r[11],f=r[12],x=r[13],_=r[14],y=r[15];if(n[0].setComponents(l-s,u-c,g-p,y-f).normalize(),n[1].setComponents(l+s,u+c,g+p,y+f).normalize(),n[2].setComponents(l+a,u+h,g+m,y+x).normalize(),n[3].setComponents(l-a,u-h,g-m,y-x).normalize(),n[4].setComponents(l-o,u-d,g-v,y-_).normalize(),t===ki)n[5].setComponents(l+o,u+d,g+v,y+_).normalize();else{if(t!==zs)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);n[5].setComponents(o,d,v,_).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(e){return Jn.center.set(0,0,0),Jn.radius=.7071067811865476,Jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(vs.x=r.normal.x>0?e.max.x:e.min.x,vs.y=r.normal.y>0?e.max.y:e.min.y,vs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(vs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};gn=class i extends Ye{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,d=e/o,u=t/l,p=[],m=[],v=[],g=[];for(let f=0;f<h;f++){let x=f*u-a;for(let _=0;_<c;_++){let y=_*d-s;m.push(y,-x,0),v.push(0,0,1),g.push(_/o),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let x=0;x<o;x++){let _=x+c*f,y=x+c*(f+1),R=x+1+c*(f+1),A=x+1+c*f;p.push(_,y,A),p.push(y,R,A)}this.setIndex(p),this.setAttribute("position",new Se(m,3)),this.setAttribute("normal",new Se(v,3)),this.setAttribute("uv",new Se(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Ie={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},ce={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Le}},envmap:{envMap:{value:null},envMapRotation:{value:new Le},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Le},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0},uvTransform:{value:new Le}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}}},Jt={basic:{uniforms:St([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:St([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:St([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:St([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:St([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:St([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:St([ce.points,ce.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:St([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:St([ce.common,ce.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:St([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:St([ce.sprite,ce.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Le}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:St([ce.common,ce.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:St([ce.lights,ce.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};Jt.physical={uniforms:St([Jt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Le},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Le},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Le},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Le},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Le},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Le},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Le}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};_s={r:0,b:0,g:0},Kn=new Qt,Sd=new Re;Xs=class extends br{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ph=[.125,.215,.35,.446,.526,.582],hr=20,no=new Xs,mh=new Pe,io=null,ro=0,so=0,ao=!1,Qn=(1+Math.sqrt(5))/2,Ai=1/Qn,fh=[new E(-Qn,Ai,0),new E(Qn,Ai,0),new E(-Ai,0,Qn),new E(Ai,0,Qn),new E(0,Qn,-Ai),new E(0,Qn,Ai),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)],qs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){io=this._renderer.getRenderTarget(),ro=this._renderer.getActiveCubeFace(),so=this._renderer.getActiveMipmapLevel(),ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_h(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(io,ro,so),this._renderer.xr.enabled=ao,e.scissorTest=!1,xs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Oi||e.mapping===Fi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),io=this._renderer.getRenderTarget(),ro=this._renderer.getActiveCubeFace(),so=this._renderer.getActiveMipmapLevel(),ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:Dr,format:Vt,colorSpace:On,depthBuffer:!1},r=gh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gh(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],l=[],c=[],h=a,d=a-4+1+ph.length;for(let u=0;u<d;u++){let p=Math.pow(2,h);l.push(p);let m=1/p;u>a-4?m=ph[u-a+4-1]:u===0&&(m=0),c.push(m);let v=1/(p-2),g=-v,f=1+v,x=[g,g,f,g,f,f,g,g,f,f,g,f],_=6,y=6,R=3,A=2,C=1,F=new Float32Array(R*y*_),D=new Float32Array(A*y*_),z=new Float32Array(C*y*_);for(let B=0;B<_;B++){let j=B%3*2/3-1,W=B>2?0:-1,Y=[j,W,0,j+2/3,W,0,j+2/3,W+1,0,j,W,0,j+2/3,W+1,0,j,W+1,0];F.set(Y,R*y*B),D.set(x,A*y*B);let J=[B,B,B,B,B,B];z.set(J,C*y*B)}let V=new Ye;V.setAttribute("position",new It(F,R)),V.setAttribute("uv",new It(D,A)),V.setAttribute("faceIndex",new It(z,C)),o.push(V),h>4&&h--}return{lodPlanes:o,sizeLods:l,sigmas:c}})(s)),this._blurMaterial=(function(a,o,l){let c=new Float32Array(hr),h=new E(0,1,0);return new tn({name:"SphericalGaussianBlur",defines:{n:hr,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/l,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:Kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})})(s,e,t)}return r}_compileMaterial(e){let t=new vt(this._lodPlanes[0],e);this._renderer.compile(t,no)}_sceneToCubeUV(e,t,n,r){let s=new wt(90,1,t,n),a=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,h=l.toneMapping;l.getClearColor(mh),l.toneMapping=Pn,l.autoClear=!1;let d=new en({name:"PMREM.Background",side:Tt,depthWrite:!1,depthTest:!1}),u=new vt(new Dn,d),p=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,p=!0):(d.color.copy(mh),p=!0);for(let v=0;v<6;v++){let g=v%3;g===0?(s.up.set(0,a[v],0),s.lookAt(o[v],0,0)):g===1?(s.up.set(0,0,a[v]),s.lookAt(0,o[v],0)):(s.up.set(0,a[v],0),s.lookAt(0,0,o[v]));let f=this._cubeSize;xs(r,g*f,v>2?f:0,f,f),l.setRenderTarget(r),p&&l.render(u,s),l.render(e,s)}u.geometry.dispose(),u.material.dispose(),l.toneMapping=h,l.autoClear=c,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Oi||e.mapping===Fi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=_h()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vh());let s=r?this._cubemapMaterial:this._equirectMaterial,a=new vt(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;xs(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,no)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=fh[(r-s-1)%fh.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new vt(this._lodPlanes[r],c),d=c.uniforms,u=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*u):2*Math.PI/39,m=s/p,v=isFinite(s)?1+Math.floor(3*m):hr;v>hr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to 20`);let g=[],f=0;for(let y=0;y<hr;++y){let R=y/m,A=Math.exp(-R*R/2);g.push(A),y===0?f+=A:y<v&&(f+=2*A)}for(let y=0;y<g.length;y++)g[y]=g[y]/f;d.envMap.value=e.texture,d.samples.value=v,d.weights.value=g,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:x}=this;d.dTheta.value=p,d.mipInt.value=x-n;let _=this._sizeLods[r];xs(t,3*_*(r>x-4?r-x+4:0),4*(this._cubeSize-_),3*_,2*_),l.setRenderTarget(t),l.render(h,no)}};Ys=class extends Et{constructor(e,t,n,r,s,a,o,l,c,h=1026){if(h!==yr&&h!==zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===yr&&(n=ii),n===void 0&&h===zi&&(n=Bi),super(null,r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Dt,this.minFilter=l!==void 0?l:Dt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},hu=new Et,xh=new Ys(1,1),uu=new Hs,du=new Ko,pu=new js,yh=[],Mh=[],Sh=new Float32Array(16),bh=new Float32Array(9),wh=new Float32Array(4);el=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(r){switch(r){case 5126:return Od;case 35664:return Fd;case 35665:return Bd;case 35666:return zd;case 35674:return kd;case 35675:return Hd;case 35676:return Gd;case 5124:case 35670:return Vd;case 35667:case 35671:return Wd;case 35668:case 35672:return jd;case 35669:case 35673:return Xd;case 5125:return qd;case 36294:return Yd;case 36295:return Zd;case 36296:return Jd;case 35678:case 36198:case 36298:case 36306:case 35682:return Kd;case 35679:case 36299:case 36307:return $d;case 35680:case 36300:case 36308:case 36293:return Qd;case 36289:case 36303:case 36311:case 36292:return ep}})(t.type)}},tl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(r){switch(r){case 5126:return tp;case 35664:return np;case 35665:return ip;case 35666:return rp;case 35674:return sp;case 35675:return ap;case 35676:return op;case 5124:case 35670:return lp;case 35667:case 35671:return cp;case 35668:case 35672:return hp;case 35669:case 35673:return up;case 5125:return dp;case 36294:return pp;case 36295:return mp;case 36296:return fp;case 35678:case 36198:case 36298:case 36306:case 35682:return gp;case 35679:case 36299:case 36307:return vp;case 35680:case 36300:case 36308:case 36293:return _p;case 36289:case 36303:case 36311:case 36292:return xp}})(t.type)}},nl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},oo=/(\w+)(\])?(\[|\.)?/g;Ni=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r);yp(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};Mp=37297,Sp=0;ys=new E;Tp=/^[ \t]*#include +<([\w\d./]+)>/gm;Ap=new Map;Cp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;Lp=0,rl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new sl(e),t.set(e,n)),n}},sl=class{constructor(e){this.id=Lp++,this.code=e,this.usedTimes=0}};Bp=0;al=class extends ri{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ol=class extends ri{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};Vp={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};ll=class extends wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},qe=class extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}},qp={type:"move"},fr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,n),f=this._getHandJoint(c,v);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,m=.005;c.inputState.pinching&&u>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qp)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new qe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},cl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let r=new Et;e.properties.get(r).__webglTexture=t.texture,t.depthNear==n.depthNear&&t.depthFar==n.depthFar||(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new tn({vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new vt(new gn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},hl=class extends Un{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,m=null,v=new cl,g=t.getContextAttributes(),f=null,x=null,_=[],y=[],R=new se,A=null,C=new wt;C.layers.enable(1),C.viewport=new et;let F=new wt;F.layers.enable(2),F.viewport=new et;let D=[C,F],z=new ll;z.layers.enable(1),z.layers.enable(2);let V=null,B=null;function j(k){let Z=y.indexOf(k.inputSource);if(Z===-1)return;let le=_[Z];le!==void 0&&(le.update(k.inputSource,k.frame,c||a),le.dispatchEvent({type:k.type,data:k.inputSource}))}function W(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",Y);for(let k=0;k<_.length;k++){let Z=y[k];Z!==null&&(y[k]=null,_[k].disconnect(Z))}V=null,B=null,v.reset(),e.setRenderTarget(f),p=null,u=null,d=null,r=null,x=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}function Y(k){for(let Z=0;Z<k.removed.length;Z++){let le=k.removed[Z],he=y.indexOf(le);he>=0&&(y[he]=null,_[he].disconnect(le))}for(let Z=0;Z<k.added.length;Z++){let le=k.added[Z],he=y.indexOf(le);if(he===-1){for(let M=0;M<_.length;M++){if(M>=y.length){y.push(le),he=M;break}if(y[M]===null){y[M]=le,he=M;break}}if(he===-1)break}let w=_[he];w&&w.connect(le)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let Z=_[k];return Z===void 0&&(Z=new fr,_[k]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(k){let Z=_[k];return Z===void 0&&(Z=new fr,_[k]=Z),Z.getGripSpace()},this.getHand=function(k){let Z=_[k];return Z===void 0&&(Z=new fr,_[k]=Z),Z.getHandSpace()},this.setFramebufferScaleFactor=function(k){s=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(k){if(r=k,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",W),r.addEventListener("inputsourceschange",Y),g.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0){let Z={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,Z),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new fn(p.framebufferWidth,p.framebufferHeight,{format:Vt,type:mn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let Z=null,le=null,he=null;g.depth&&(he=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=g.stencil?zi:yr,le=g.stencil?Bi:ii);let w={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:s};d=new XRWebGLBinding(r,t),u=d.createProjectionLayer(w),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new fn(u.textureWidth,u.textureHeight,{format:Vt,type:mn,depthTexture:new Ys(u.textureWidth,u.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),fe.setContext(r),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};let J=new E,ne=new E;function ae(k,Z){Z===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(Z.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(r===null)return;let Z=k.near,le=k.far;v.texture!==null&&(v.depthNear>0&&(Z=v.depthNear),v.depthFar>0&&(le=v.depthFar)),z.near=F.near=C.near=Z,z.far=F.far=C.far=le,V===z.near&&B===z.far||(r.updateRenderState({depthNear:z.near,depthFar:z.far}),V=z.near,B=z.far);let he=k.parent,w=z.cameras;ae(z,he);for(let M=0;M<w.length;M++)ae(w[M],he);w.length===2?(function(M,U,G){J.setFromMatrixPosition(U.matrixWorld),ne.setFromMatrixPosition(G.matrixWorld);let T=J.distanceTo(ne),P=U.projectionMatrix.elements,S=G.projectionMatrix.elements,L=P[14]/(P[10]-1),I=P[14]/(P[10]+1),$=(P[9]+1)/P[5],O=(P[9]-1)/P[5],K=(P[8]-1)/P[0],te=(S[8]+1)/S[0],Q=L*K,de=L*te,pe=T/(-K+te),ie=pe*-K;if(U.matrixWorld.decompose(M.position,M.quaternion,M.scale),M.translateX(ie),M.translateZ(pe),M.matrixWorld.compose(M.position,M.quaternion,M.scale),M.matrixWorldInverse.copy(M.matrixWorld).invert(),P[10]===-1)M.projectionMatrix.copy(U.projectionMatrix),M.projectionMatrixInverse.copy(U.projectionMatrixInverse);else{let re=L+pe,xe=I+pe,Ce=Q-ie,ye=de+(T-ie),ze=$*I/xe*re,je=O*I/xe*re;M.projectionMatrix.makePerspective(Ce,ye,ze,je,re,xe),M.projectionMatrixInverse.copy(M.projectionMatrix).invert()}})(z,C,F):z.projectionMatrix.copy(C.projectionMatrix),(function(M,U,G){G===null?M.matrix.copy(U.matrixWorld):(M.matrix.copy(G.matrixWorld),M.matrix.invert(),M.matrix.multiply(U.matrixWorld)),M.matrix.decompose(M.position,M.quaternion,M.scale),M.updateMatrixWorld(!0),M.projectionMatrix.copy(U.projectionMatrix),M.projectionMatrixInverse.copy(U.projectionMatrixInverse),M.isPerspectiveCamera&&(M.fov=2*Mr*Math.atan(1/M.projectionMatrix.elements[5]),M.zoom=1)})(k,z,he)},this.getCamera=function(){return z},this.getFoveation=function(){if(u!==null||p!==null)return l},this.setFoveation=function(k){l=k,u!==null&&(u.fixedFoveation=k),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=k)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(z)};let ue=null,fe=new cu;fe.setAnimationLoop((function(k,Z){if(h=Z.getViewerPose(c||a),m=Z,h!==null){let le=h.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let he=!1;le.length!==z.cameras.length&&(z.cameras.length=0,he=!0);for(let M=0;M<le.length;M++){let U=le[M],G=null;if(p!==null)G=p.getViewport(U);else{let P=d.getViewSubImage(u,U);G=P.viewport,M===0&&(e.setRenderTargetTextures(x,P.colorTexture,u.ignoreDepthValues?void 0:P.depthStencilTexture),e.setRenderTarget(x))}let T=D[M];T===void 0&&(T=new wt,T.layers.enable(M),T.viewport=new et,D[M]=T),T.matrix.fromArray(U.transform.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale),T.projectionMatrix.fromArray(U.projectionMatrix),T.projectionMatrixInverse.copy(T.projectionMatrix).invert(),T.viewport.set(G.x,G.y,G.width,G.height),M===0&&(z.matrix.copy(T.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),he===!0&&z.cameras.push(T)}let w=r.enabledFeatures;if(w&&w.includes("depth-sensing")){let M=d.getDepthInformation(le[0]);M&&M.isValid&&M.texture&&v.init(e,M,r.renderState)}}for(let le=0;le<_.length;le++){let he=y[le],w=_[le];he!==null&&w!==void 0&&w.update(he,Z,c||a)}ue&&ue(k,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),m=null})),this.setAnimationLoop=function(k){ue=k},this.dispose=function(){}}},$n=new Qt,Yp=new Re;Zs=class{constructor(e={}){let{canvas:t=rd(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e,u;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=a;let p=new Uint32Array(4),m=new Int32Array(4),v=null,g=null,f=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=bt,this.toneMapping=Pn,this.toneMappingExposure=1;let _=this,y=!1,R=0,A=0,C=null,F=-1,D=null,z=new et,V=new et,B=null,j=new Pe(0),W=0,Y=t.width,J=t.height,ne=1,ae=null,ue=null,fe=new et(0,0,Y,J),k=new et(0,0,Y,J),Z=!1,le=new Vi,he=!1,w=!1,M=new Re,U=new Re,G=new E,T=new et,P={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},S=!1;function L(){return C===null?ne:1}let I,$,O,K,te,Q,de,pe,ie,re,xe,Ce,ye,ze,je,tt,ve,De,Xe,Hr,pi,At,sn,kn,N=n;function Hn(b,H){return t.getContext(b,H)}try{let b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r169"),t.addEventListener("webglcontextlost",lc,!1),t.addEventListener("webglcontextrestored",cc,!1),t.addEventListener("webglcontextcreationerror",hc,!1),N===null){let H="webgl2";if(N=Hn(H,b),N===null)throw Hn(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}function tr(){I=new Pd(N),I.init(),At=new Xp(N,I),$=new Td(N,I,e,At),O=new Wp(N),$.reverseDepthBuffer&&O.buffers.depth.setReversed(!0),K=new Ud(N),te=new Dp,Q=new jp(N,I,O,te,$,At,K),de=new Rd(_),pe=new Cd(_),ie=new Md(N),sn=new wd(N,ie),re=new Id(N,ie,K,sn),xe=new Nd(N,re,ie,K),Xe=new Dd(N,$,Q),tt=new Ad(te),Ce=new Up(_,de,pe,I,$,sn,tt),ye=new Zp(_,te),ze=new Op,je=new Hp(I),De=new bd(_,de,pe,O,xe,u,l),ve=new Gp(_,xe,$),kn=new Jp(N,K,$,O),Hr=new Ed(N,I,K),pi=new Ld(N,I,K),K.programs=Ce.programs,_.capabilities=$,_.extensions=I,_.properties=te,_.renderLists=ze,_.shadowMap=ve,_.state=O,_.info=K}tr();let ut=new hl(_,N);function lc(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function cc(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;let b=K.autoReset,H=ve.enabled,q=ve.autoUpdate,ee=ve.needsUpdate,X=ve.type;tr(),K.autoReset=b,ve.enabled=H,ve.autoUpdate=q,ve.needsUpdate=ee,ve.type=X}function hc(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function uc(b){let H=b.target;H.removeEventListener("dispose",uc),(function(q){(function(ee){let X=te.get(ee).programs;X!==void 0&&(X.forEach((function(oe){Ce.releaseProgram(oe)})),ee.isShaderMaterial&&Ce.releaseShaderCache(ee))})(q),te.remove(q)})(H)}function dc(b,H,q){b.transparent===!0&&b.side===2&&b.forceSinglePass===!1?(b.side=Tt,b.needsUpdate=!0,Vr(b,H,q),b.side=Ln,b.needsUpdate=!0,Vr(b,H,q),b.side=2):Vr(b,H,q)}this.xr=ut,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let b=I.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=I.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(b){b!==void 0&&(ne=b,this.setSize(Y,J,!1))},this.getSize=function(b){return b.set(Y,J)},this.setSize=function(b,H,q=!0){ut.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(Y=b,J=H,t.width=Math.floor(b*ne),t.height=Math.floor(H*ne),q===!0&&(t.style.width=b+"px",t.style.height=H+"px"),this.setViewport(0,0,b,H))},this.getDrawingBufferSize=function(b){return b.set(Y*ne,J*ne).floor()},this.setDrawingBufferSize=function(b,H,q){Y=b,J=H,ne=q,t.width=Math.floor(b*q),t.height=Math.floor(H*q),this.setViewport(0,0,b,H)},this.getCurrentViewport=function(b){return b.copy(z)},this.getViewport=function(b){return b.copy(fe)},this.setViewport=function(b,H,q,ee){b.isVector4?fe.set(b.x,b.y,b.z,b.w):fe.set(b,H,q,ee),O.viewport(z.copy(fe).multiplyScalar(ne).round())},this.getScissor=function(b){return b.copy(k)},this.setScissor=function(b,H,q,ee){b.isVector4?k.set(b.x,b.y,b.z,b.w):k.set(b,H,q,ee),O.scissor(V.copy(k).multiplyScalar(ne).round())},this.getScissorTest=function(){return Z},this.setScissorTest=function(b){O.setScissorTest(Z=b)},this.setOpaqueSort=function(b){ae=b},this.setTransparentSort=function(b){ue=b},this.getClearColor=function(b){return b.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor.apply(De,arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha.apply(De,arguments)},this.clear=function(b=!0,H=!0,q=!0){let ee=0;if(b){let X=!1;if(C!==null){let oe=C.texture.format;X=oe===Zl||oe===Yl||oe===ql}if(X){let oe=C.texture.type,me=oe===mn||oe===ii||oe===xr||oe===Bi||oe===Wl||oe===jl,ge=De.getClearColor(),Me=De.getClearAlpha(),Te=ge.r,Ee=ge.g,we=ge.b;me?(p[0]=Te,p[1]=Ee,p[2]=we,p[3]=Me,N.clearBufferuiv(N.COLOR,0,p)):(m[0]=Te,m[1]=Ee,m[2]=we,m[3]=Me,N.clearBufferiv(N.COLOR,0,m))}else ee|=N.COLOR_BUFFER_BIT}H&&(ee|=N.DEPTH_BUFFER_BIT,N.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),q&&(ee|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",lc,!1),t.removeEventListener("webglcontextrestored",cc,!1),t.removeEventListener("webglcontextcreationerror",hc,!1),ze.dispose(),je.dispose(),te.dispose(),de.dispose(),pe.dispose(),xe.dispose(),sn.dispose(),kn.dispose(),Ce.dispose(),ut.dispose(),ut.removeEventListener("sessionstart",pc),ut.removeEventListener("sessionend",mc),Gn.stop()},this.renderBufferDirect=function(b,H,q,ee,X,oe){H===null&&(H=P);let me=X.isMesh&&X.matrixWorld.determinant()<0,ge=(function(He,it,gt,Ue,Ae){it.isScene!==!0&&(it=P),Q.resetTextureUnits();let Ft=it.fog,Uu=Ue.isMeshStandardMaterial?it.environment:null,Du=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:On,Wr=(Ue.isMeshStandardMaterial?pe:de).get(Ue.envMap||Uu),Nu=Ue.vertexColors===!0&&!!gt.attributes.color&&gt.attributes.color.itemSize===4,Ou=!!gt.attributes.tangent&&(!!Ue.normalMap||Ue.anisotropy>0),Fu=!!gt.morphAttributes.position,Bu=!!gt.morphAttributes.normal,zu=!!gt.morphAttributes.color,yc=Pn;Ue.toneMapped&&(C!==null&&C.isXRRenderTarget!==!0||(yc=_.toneMapping));let Mc=gt.morphAttributes.position||gt.morphAttributes.normal||gt.morphAttributes.color,ku=Mc!==void 0?Mc.length:0,Ne=te.get(Ue),Hu=g.state.lights;if(he===!0&&(w===!0||He!==D)){let Lt=He===D&&Ue.id===F;tt.setState(Ue,He,Lt)}let Bt=!1;Ue.version===Ne.__version?Ne.needsLights&&Ne.lightsStateVersion!==Hu.state.version||Ne.outputColorSpace!==Du||Ae.isBatchedMesh&&Ne.batching===!1?Bt=!0:Ae.isBatchedMesh||Ne.batching!==!0?Ae.isBatchedMesh&&Ne.batchingColor===!0&&Ae.colorTexture===null||Ae.isBatchedMesh&&Ne.batchingColor===!1&&Ae.colorTexture!==null||Ae.isInstancedMesh&&Ne.instancing===!1?Bt=!0:Ae.isInstancedMesh||Ne.instancing!==!0?Ae.isSkinnedMesh&&Ne.skinning===!1?Bt=!0:Ae.isSkinnedMesh||Ne.skinning!==!0?Ae.isInstancedMesh&&Ne.instancingColor===!0&&Ae.instanceColor===null||Ae.isInstancedMesh&&Ne.instancingColor===!1&&Ae.instanceColor!==null||Ae.isInstancedMesh&&Ne.instancingMorph===!0&&Ae.morphTexture===null||Ae.isInstancedMesh&&Ne.instancingMorph===!1&&Ae.morphTexture!==null||Ne.envMap!==Wr||Ue.fog===!0&&Ne.fog!==Ft?Bt=!0:Ne.numClippingPlanes===void 0||Ne.numClippingPlanes===tt.numPlanes&&Ne.numIntersection===tt.numIntersection?(Ne.vertexAlphas!==Nu||Ne.vertexTangents!==Ou||Ne.morphTargets!==Fu||Ne.morphNormals!==Bu||Ne.morphColors!==zu||Ne.toneMapping!==yc||Ne.morphTargetsCount!==ku)&&(Bt=!0):Bt=!0:Bt=!0:Bt=!0:Bt=!0:(Bt=!0,Ne.__version=Ue.version);let Vn=Ne.currentProgram;Bt===!0&&(Vn=Vr(Ue,it,Ae));let Sc=!1,nr=!1,Ma=!1,at=Vn.getUniforms(),Mn=Ne.uniforms;if(O.useProgram(Vn.program)&&(Sc=!0,nr=!0,Ma=!0),Ue.id!==F&&(F=Ue.id,nr=!0),Sc||D!==He){$.reverseDepthBuffer?(M.copy(He.projectionMatrix),(function(Wn){let $e=Wn.elements;$e[2]=.5*$e[2]+.5*$e[3],$e[6]=.5*$e[6]+.5*$e[7],$e[10]=.5*$e[10]+.5*$e[11],$e[14]=.5*$e[14]+.5*$e[15]})(M),(function(Wn){let $e=Wn.elements;$e[11]===-1?($e[10]=-$e[10]-1,$e[14]=-$e[14]):($e[10]=-$e[10],$e[14]=1-$e[14])})(M),at.setValue(N,"projectionMatrix",M)):at.setValue(N,"projectionMatrix",He.projectionMatrix),at.setValue(N,"viewMatrix",He.matrixWorldInverse);let Lt=at.map.cameraPosition;Lt!==void 0&&Lt.setValue(N,G.setFromMatrixPosition(He.matrixWorld)),$.logarithmicDepthBuffer&&at.setValue(N,"logDepthBufFC",2/(Math.log(He.far+1)/Math.LN2)),(Ue.isMeshPhongMaterial||Ue.isMeshToonMaterial||Ue.isMeshLambertMaterial||Ue.isMeshBasicMaterial||Ue.isMeshStandardMaterial||Ue.isShaderMaterial)&&at.setValue(N,"isOrthographic",He.isOrthographicCamera===!0),D!==He&&(D=He,nr=!0,Ma=!0)}if(Ae.isSkinnedMesh){at.setOptional(N,Ae,"bindMatrix"),at.setOptional(N,Ae,"bindMatrixInverse");let Lt=Ae.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),at.setValue(N,"boneTexture",Lt.boneTexture,Q))}Ae.isBatchedMesh&&(at.setOptional(N,Ae,"batchingTexture"),at.setValue(N,"batchingTexture",Ae._matricesTexture,Q),at.setOptional(N,Ae,"batchingIdTexture"),at.setValue(N,"batchingIdTexture",Ae._indirectTexture,Q),at.setOptional(N,Ae,"batchingColorTexture"),Ae._colorsTexture!==null&&at.setValue(N,"batchingColorTexture",Ae._colorsTexture,Q));let Sa=gt.morphAttributes;Sa.position===void 0&&Sa.normal===void 0&&Sa.color===void 0||Xe.update(Ae,gt,Vn),(nr||Ne.receiveShadow!==Ae.receiveShadow)&&(Ne.receiveShadow=Ae.receiveShadow,at.setValue(N,"receiveShadow",Ae.receiveShadow)),Ue.isMeshGouraudMaterial&&Ue.envMap!==null&&(Mn.envMap.value=Wr,Mn.flipEnvMap.value=Wr.isCubeTexture&&Wr.isRenderTargetTexture===!1?-1:1),Ue.isMeshStandardMaterial&&Ue.envMap===null&&it.environment!==null&&(Mn.envMapIntensity.value=it.environmentIntensity),nr&&(at.setValue(N,"toneMappingExposure",_.toneMappingExposure),Ne.needsLights&&(zt=Ma,(Yt=Mn).ambientLightColor.needsUpdate=zt,Yt.lightProbe.needsUpdate=zt,Yt.directionalLights.needsUpdate=zt,Yt.directionalLightShadows.needsUpdate=zt,Yt.pointLights.needsUpdate=zt,Yt.pointLightShadows.needsUpdate=zt,Yt.spotLights.needsUpdate=zt,Yt.spotLightShadows.needsUpdate=zt,Yt.rectAreaLights.needsUpdate=zt,Yt.hemisphereLights.needsUpdate=zt),Ft&&Ue.fog===!0&&ye.refreshFogUniforms(Mn,Ft),ye.refreshMaterialUniforms(Mn,Ue,ne,J,g.state.transmissionRenderTarget[He.id]),Ni.upload(N,_c(Ne),Mn,Q));var Yt,zt;if(Ue.isShaderMaterial&&Ue.uniformsNeedUpdate===!0&&(Ni.upload(N,_c(Ne),Mn,Q),Ue.uniformsNeedUpdate=!1),Ue.isSpriteMaterial&&at.setValue(N,"center",Ae.center),at.setValue(N,"modelViewMatrix",Ae.modelViewMatrix),at.setValue(N,"normalMatrix",Ae.normalMatrix),at.setValue(N,"modelMatrix",Ae.matrixWorld),Ue.isShaderMaterial||Ue.isRawShaderMaterial){let Lt=Ue.uniformsGroups;for(let Wn=0,$e=Lt.length;Wn<$e;Wn++){let bc=Lt[Wn];kn.update(bc,Vn),kn.bind(bc,Vn)}}return Vn})(b,H,q,ee,X);O.setMaterial(ee,me);let Me=q.index,Te=1;if(ee.wireframe===!0){if(Me=re.getWireframeAttribute(q),Me===void 0)return;Te=2}let Ee=q.drawRange,we=q.attributes.position,ke=Ee.start*Te,st=(Ee.start+Ee.count)*Te;oe!==null&&(ke=Math.max(ke,oe.start*Te),st=Math.min(st,(oe.start+oe.count)*Te)),Me!==null?(ke=Math.max(ke,0),st=Math.min(st,Me.count)):we!=null&&(ke=Math.max(ke,0),st=Math.min(st,we.count));let nt=st-ke;if(nt<0||nt===1/0)return;let dt;sn.setup(X,ee,ge,q,Me);let Ze=Hr;if(Me!==null&&(dt=ie.get(Me),Ze=pi,Ze.setIndex(dt)),X.isMesh)ee.wireframe===!0?(O.setLineWidth(ee.wireframeLinewidth*L()),Ze.setMode(N.LINES)):Ze.setMode(N.TRIANGLES);else if(X.isLine){let He=ee.linewidth;He===void 0&&(He=1),O.setLineWidth(He*L()),X.isLineSegments?Ze.setMode(N.LINES):X.isLineLoop?Ze.setMode(N.LINE_LOOP):Ze.setMode(N.LINE_STRIP)}else X.isPoints?Ze.setMode(N.POINTS):X.isSprite&&Ze.setMode(N.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)Ze.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(I.get("WEBGL_multi_draw"))Ze.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let He=X._multiDrawStarts,it=X._multiDrawCounts,gt=X._multiDrawCount,Ue=Me?ie.get(Me).bytesPerElement:1,Ae=te.get(ee).currentProgram.getUniforms();for(let Ft=0;Ft<gt;Ft++)Ae.setValue(N,"_gl_DrawID",Ft),Ze.render(He[Ft]/Ue,it[Ft])}else if(X.isInstancedMesh)Ze.renderInstances(ke,nt,X.count);else if(q.isInstancedBufferGeometry){let He=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,it=Math.min(q.instanceCount,He);Ze.renderInstances(ke,nt,it)}else Ze.render(ke,nt)},this.compile=function(b,H,q=null){q===null&&(q=b),g=je.get(q),g.init(H),x.push(g),q.traverseVisible((function(X){X.isLight&&X.layers.test(H.layers)&&(g.pushLight(X),X.castShadow&&g.pushShadow(X))})),b!==q&&b.traverseVisible((function(X){X.isLight&&X.layers.test(H.layers)&&(g.pushLight(X),X.castShadow&&g.pushShadow(X))})),g.setupLights();let ee=new Set;return b.traverse((function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let oe=X.material;if(oe)if(Array.isArray(oe))for(let me=0;me<oe.length;me++){let ge=oe[me];dc(ge,q,X),ee.add(ge)}else dc(oe,q,X),ee.add(oe)})),x.pop(),g=null,ee},this.compileAsync=function(b,H,q=null){let ee=this.compile(b,H,q);return new Promise((X=>{function oe(){ee.forEach((function(me){te.get(me).currentProgram.isReady()&&ee.delete(me)})),ee.size!==0?setTimeout(oe,10):X(b)}I.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)}))};let xa=null;function pc(){Gn.stop()}function mc(){Gn.start()}let Gn=new cu;function ya(b,H,q,ee){if(b.visible===!1)return;if(b.layers.test(H.layers)){if(b.isGroup)q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(H);else if(b.isLight)g.pushLight(b),b.castShadow&&g.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||le.intersectsSprite(b)){ee&&T.setFromMatrixPosition(b.matrixWorld).applyMatrix4(U);let oe=xe.update(b),me=b.material;me.visible&&v.push(b,oe,me,q,T.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||le.intersectsObject(b))){let oe=xe.update(b),me=b.material;if(ee&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),T.copy(b.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),T.copy(oe.boundingSphere.center)),T.applyMatrix4(b.matrixWorld).applyMatrix4(U)),Array.isArray(me)){let ge=oe.groups;for(let Me=0,Te=ge.length;Me<Te;Me++){let Ee=ge[Me],we=me[Ee.materialIndex];we&&we.visible&&v.push(b,oe,we,q,T.z,Ee)}}else me.visible&&v.push(b,oe,me,q,T.z,null)}}let X=b.children;for(let oe=0,me=X.length;oe<me;oe++)ya(X[oe],H,q,ee)}function fc(b,H,q,ee){let X=b.opaque,oe=b.transmissive,me=b.transparent;g.setupLightsView(q),he===!0&&tt.setGlobalState(_.clippingPlanes,q),ee&&O.viewport(z.copy(ee)),X.length>0&&Gr(X,H,q),oe.length>0&&Gr(oe,H,q),me.length>0&&Gr(me,H,q),O.buffers.depth.setTest(!0),O.buffers.depth.setMask(!0),O.buffers.color.setMask(!0),O.setPolygonOffset(!1)}function gc(b,H,q,ee){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[ee.id]===void 0&&(g.state.transmissionRenderTarget[ee.id]=new fn(1,1,{generateMipmaps:!0,type:I.has("EXT_color_buffer_half_float")||I.has("EXT_color_buffer_float")?Dr:mn,minFilter:Ii,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ve.workingColorSpace}));let X=g.state.transmissionRenderTarget[ee.id],oe=ee.viewport||z;X.setSize(oe.z,oe.w);let me=_.getRenderTarget();_.setRenderTarget(X),_.getClearColor(j),W=_.getClearAlpha(),W<1&&_.setClearColor(16777215,.5),_.clear(),S&&De.render(q);let ge=_.toneMapping;_.toneMapping=Pn;let Me=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),g.setupLightsView(ee),he===!0&&tt.setGlobalState(_.clippingPlanes,ee),Gr(b,q,ee),Q.updateMultisampleRenderTarget(X),Q.updateRenderTargetMipmap(X),I.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let Ee=0,we=H.length;Ee<we;Ee++){let ke=H[Ee],st=ke.object,nt=ke.geometry,dt=ke.material,Ze=ke.group;if(dt.side===2&&st.layers.test(ee.layers)){let He=dt.side;dt.side=Tt,dt.needsUpdate=!0,vc(st,q,ee,nt,dt,Ze),dt.side=He,dt.needsUpdate=!0,Te=!0}}Te===!0&&(Q.updateMultisampleRenderTarget(X),Q.updateRenderTargetMipmap(X))}_.setRenderTarget(me),_.setClearColor(j,W),Me!==void 0&&(ee.viewport=Me),_.toneMapping=ge}function Gr(b,H,q){let ee=H.isScene===!0?H.overrideMaterial:null;for(let X=0,oe=b.length;X<oe;X++){let me=b[X],ge=me.object,Me=me.geometry,Te=ee===null?me.material:ee,Ee=me.group;ge.layers.test(q.layers)&&vc(ge,H,q,Me,Te,Ee)}}function vc(b,H,q,ee,X,oe){b.onBeforeRender(_,H,q,ee,X,oe),b.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),X.onBeforeRender(_,H,q,ee,b,oe),X.transparent===!0&&X.side===2&&X.forceSinglePass===!1?(X.side=Tt,X.needsUpdate=!0,_.renderBufferDirect(q,H,ee,X,b,oe),X.side=Ln,X.needsUpdate=!0,_.renderBufferDirect(q,H,ee,X,b,oe),X.side=2):_.renderBufferDirect(q,H,ee,X,b,oe),b.onAfterRender(_,H,q,ee,X,oe)}function Vr(b,H,q){H.isScene!==!0&&(H=P);let ee=te.get(b),X=g.state.lights,oe=g.state.shadowsArray,me=X.state.version,ge=Ce.getParameters(b,X.state,oe,H,q),Me=Ce.getProgramCacheKey(ge),Te=ee.programs;ee.environment=b.isMeshStandardMaterial?H.environment:null,ee.fog=H.fog,ee.envMap=(b.isMeshStandardMaterial?pe:de).get(b.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&b.envMap===null?H.environmentRotation:b.envMapRotation,Te===void 0&&(b.addEventListener("dispose",uc),Te=new Map,ee.programs=Te);let Ee=Te.get(Me);if(Ee!==void 0){if(ee.currentProgram===Ee&&ee.lightsStateVersion===me)return xc(b,ge),Ee}else ge.uniforms=Ce.getUniforms(b),b.onBeforeCompile(ge,_),Ee=Ce.acquireProgram(ge,Me),Te.set(Me,Ee),ee.uniforms=ge.uniforms;let we=ee.uniforms;return(b.isShaderMaterial||b.isRawShaderMaterial)&&b.clipping!==!0||(we.clippingPlanes=tt.uniform),xc(b,ge),ee.needsLights=(function(ke){return ke.isMeshLambertMaterial||ke.isMeshToonMaterial||ke.isMeshPhongMaterial||ke.isMeshStandardMaterial||ke.isShadowMaterial||ke.isShaderMaterial&&ke.lights===!0})(b),ee.lightsStateVersion=me,ee.needsLights&&(we.ambientLightColor.value=X.state.ambient,we.lightProbe.value=X.state.probe,we.directionalLights.value=X.state.directional,we.directionalLightShadows.value=X.state.directionalShadow,we.spotLights.value=X.state.spot,we.spotLightShadows.value=X.state.spotShadow,we.rectAreaLights.value=X.state.rectArea,we.ltc_1.value=X.state.rectAreaLTC1,we.ltc_2.value=X.state.rectAreaLTC2,we.pointLights.value=X.state.point,we.pointLightShadows.value=X.state.pointShadow,we.hemisphereLights.value=X.state.hemi,we.directionalShadowMap.value=X.state.directionalShadowMap,we.directionalShadowMatrix.value=X.state.directionalShadowMatrix,we.spotShadowMap.value=X.state.spotShadowMap,we.spotLightMatrix.value=X.state.spotLightMatrix,we.spotLightMap.value=X.state.spotLightMap,we.pointShadowMap.value=X.state.pointShadowMap,we.pointShadowMatrix.value=X.state.pointShadowMatrix),ee.currentProgram=Ee,ee.uniformsList=null,Ee}function _c(b){if(b.uniformsList===null){let H=b.currentProgram.getUniforms();b.uniformsList=Ni.seqWithValue(H.seq,b.uniforms)}return b.uniformsList}function xc(b,H){let q=te.get(b);q.outputColorSpace=H.outputColorSpace,q.batching=H.batching,q.batchingColor=H.batchingColor,q.instancing=H.instancing,q.instancingColor=H.instancingColor,q.instancingMorph=H.instancingMorph,q.skinning=H.skinning,q.morphTargets=H.morphTargets,q.morphNormals=H.morphNormals,q.morphColors=H.morphColors,q.morphTargetsCount=H.morphTargetsCount,q.numClippingPlanes=H.numClippingPlanes,q.numIntersection=H.numClipIntersection,q.vertexAlphas=H.vertexAlphas,q.vertexTangents=H.vertexTangents,q.toneMapping=H.toneMapping}Gn.setAnimationLoop((function(b){xa&&xa(b)})),typeof self<"u"&&Gn.setContext(self),this.setAnimationLoop=function(b){xa=b,ut.setAnimationLoop(b),b===null?Gn.stop():Gn.start()},ut.addEventListener("sessionstart",pc),ut.addEventListener("sessionend",mc),this.render=function(b,H){if(H!==void 0&&H.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(y===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ut.enabled===!0&&ut.isPresenting===!0&&(ut.cameraAutoUpdate===!0&&ut.updateCamera(H),H=ut.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,H,C),g=je.get(b,x.length),g.init(H),x.push(g),U.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),le.setFromProjectionMatrix(U),w=this.localClippingEnabled,he=tt.init(this.clippingPlanes,w),v=ze.get(b,f.length),v.init(),f.push(v),ut.enabled===!0&&ut.isPresenting===!0){let oe=_.xr.getDepthSensingMesh();oe!==null&&ya(oe,H,-1/0,_.sortObjects)}ya(b,H,0,_.sortObjects),v.finish(),_.sortObjects===!0&&v.sort(ae,ue),S=ut.enabled===!1||ut.isPresenting===!1||ut.hasDepthSensing()===!1,S&&De.addToRenderList(v,b),this.info.render.frame++,he===!0&&tt.beginShadows();let q=g.state.shadowsArray;ve.render(q,b,H),he===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();let ee=v.opaque,X=v.transmissive;if(g.setupLights(),H.isArrayCamera){let oe=H.cameras;if(X.length>0)for(let me=0,ge=oe.length;me<ge;me++)gc(ee,X,b,oe[me]);S&&De.render(b);for(let me=0,ge=oe.length;me<ge;me++){let Me=oe[me];fc(v,b,Me,Me.viewport)}}else X.length>0&&gc(ee,X,b,H),S&&De.render(b),fc(v,b,H);C!==null&&(Q.updateMultisampleRenderTarget(C),Q.updateRenderTargetMipmap(C)),b.isScene===!0&&b.onAfterRender(_,b,H),sn.resetDefaultState(),F=-1,D=null,x.pop(),x.length>0?(g=x[x.length-1],he===!0&&tt.setGlobalState(_.clippingPlanes,g.state.camera)):g=null,f.pop(),v=f.length>0?f[f.length-1]:null},this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(b,H,q){te.get(b.texture).__webglTexture=H,te.get(b.depthTexture).__webglTexture=q;let ee=te.get(b);ee.__hasExternalTextures=!0,ee.__autoAllocateDepthBuffer=q===void 0,ee.__autoAllocateDepthBuffer||I.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ee.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,H){let q=te.get(b);q.__webglFramebuffer=H,q.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(b,H=0,q=0){C=b,R=H,A=q;let ee=!0,X=null,oe=!1,me=!1;if(b){let ge=te.get(b);if(ge.__useDefaultFramebuffer!==void 0)O.bindFramebuffer(N.FRAMEBUFFER,null),ee=!1;else if(ge.__webglFramebuffer===void 0)Q.setupRenderTarget(b);else if(ge.__hasExternalTextures)Q.rebindTextures(b,te.get(b.texture).__webglTexture,te.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Ee=b.depthTexture;if(ge.__boundDepthTexture!==Ee){if(Ee!==null&&te.has(Ee)&&(b.width!==Ee.image.width||b.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(b)}}let Me=b.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(me=!0);let Te=te.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(X=Array.isArray(Te[H])?Te[H][q]:Te[H],oe=!0):X=b.samples>0&&Q.useMultisampledRTT(b)===!1?te.get(b).__webglMultisampledFramebuffer:Array.isArray(Te)?Te[q]:Te,z.copy(b.viewport),V.copy(b.scissor),B=b.scissorTest}else z.copy(fe).multiplyScalar(ne).floor(),V.copy(k).multiplyScalar(ne).floor(),B=Z;if(O.bindFramebuffer(N.FRAMEBUFFER,X)&&ee&&O.drawBuffers(b,X),O.viewport(z),O.scissor(V),O.setScissorTest(B),oe){let ge=te.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+H,ge.__webglTexture,q)}else if(me){let ge=te.get(b.texture),Me=H||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,ge.__webglTexture,q||0,Me)}F=-1},this.readRenderTargetPixels=function(b,H,q,ee,X,oe,me){if(!b||!b.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ge=te.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&me!==void 0&&(ge=ge[me]),ge){O.bindFramebuffer(N.FRAMEBUFFER,ge);try{let Me=b.texture,Te=Me.format,Ee=Me.type;if(!$.textureFormatReadable(Te))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!$.textureTypeReadable(Ee))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");H>=0&&H<=b.width-ee&&q>=0&&q<=b.height-X&&N.readPixels(H,q,ee,X,At.convert(Te),At.convert(Ee),oe)}finally{let Me=C!==null?te.get(C).__webglFramebuffer:null;O.bindFramebuffer(N.FRAMEBUFFER,Me)}}},this.readRenderTargetPixelsAsync=async function(b,H,q,ee,X,oe,me){if(!b||!b.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ge=te.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&me!==void 0&&(ge=ge[me]),ge){let Me=b.texture,Te=Me.format,Ee=Me.type;if(!$.textureFormatReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$.textureTypeReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=b.width-ee&&q>=0&&q<=b.height-X){O.bindFramebuffer(N.FRAMEBUFFER,ge);let we=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,we),N.bufferData(N.PIXEL_PACK_BUFFER,oe.byteLength,N.STREAM_READ),N.readPixels(H,q,ee,X,At.convert(Te),At.convert(Ee),0);let ke=C!==null?te.get(C).__webglFramebuffer:null;O.bindFramebuffer(N.FRAMEBUFFER,ke);let st=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await(function(nt,dt,Ze){return new Promise((function(He,it){setTimeout((function gt(){switch(nt.clientWaitSync(dt,nt.SYNC_FLUSH_COMMANDS_BIT,0)){case nt.WAIT_FAILED:it();break;case nt.TIMEOUT_EXPIRED:setTimeout(gt,Ze);break;default:He()}}),Ze)}))})(N,st,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,we),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,oe),N.deleteBuffer(we),N.deleteSync(st),oe}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,H=null,q=0){b.isTexture!==!0&&(Ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,b=arguments[1]);let ee=Math.pow(2,-q),X=Math.floor(b.image.width*ee),oe=Math.floor(b.image.height*ee),me=H!==null?H.x:0,ge=H!==null?H.y:0;Q.setTexture2D(b,0),N.copyTexSubImage2D(N.TEXTURE_2D,q,0,0,me,ge,X,oe),O.unbindTexture()},this.copyTextureToTexture=function(b,H,q=null,ee=null,X=0){let oe,me,ge,Me,Te,Ee;b.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture function signature has changed."),ee=arguments[0]||null,b=arguments[1],H=arguments[2],X=arguments[3]||0,q=null),q!==null?(oe=q.max.x-q.min.x,me=q.max.y-q.min.y,ge=q.min.x,Me=q.min.y):(oe=b.image.width,me=b.image.height,ge=0,Me=0),ee!==null?(Te=ee.x,Ee=ee.y):(Te=0,Ee=0);let we=At.convert(H.format),ke=At.convert(H.type);Q.setTexture2D(H,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,H.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,H.unpackAlignment);let st=N.getParameter(N.UNPACK_ROW_LENGTH),nt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),dt=N.getParameter(N.UNPACK_SKIP_PIXELS),Ze=N.getParameter(N.UNPACK_SKIP_ROWS),He=N.getParameter(N.UNPACK_SKIP_IMAGES),it=b.isCompressedTexture?b.mipmaps[X]:b.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,it.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,it.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ge),N.pixelStorei(N.UNPACK_SKIP_ROWS,Me),b.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,X,Te,Ee,oe,me,we,ke,it.data):b.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,X,Te,Ee,it.width,it.height,we,it.data):N.texSubImage2D(N.TEXTURE_2D,X,Te,Ee,oe,me,we,ke,it),N.pixelStorei(N.UNPACK_ROW_LENGTH,st),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,nt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,dt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ze),N.pixelStorei(N.UNPACK_SKIP_IMAGES,He),X===0&&H.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),O.unbindTexture()},this.copyTextureToTexture3D=function(b,H,q=null,ee=null,X=0){let oe,me,ge,Me,Te,Ee,we,ke,st;b.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,ee=arguments[1]||null,b=arguments[2],H=arguments[3],X=arguments[4]||0);let nt=b.isCompressedTexture?b.mipmaps[X]:b.image;q!==null?(oe=q.max.x-q.min.x,me=q.max.y-q.min.y,ge=q.max.z-q.min.z,Me=q.min.x,Te=q.min.y,Ee=q.min.z):(oe=nt.width,me=nt.height,ge=nt.depth,Me=0,Te=0,Ee=0),ee!==null?(we=ee.x,ke=ee.y,st=ee.z):(we=0,ke=0,st=0);let dt=At.convert(H.format),Ze=At.convert(H.type),He;if(H.isData3DTexture)Q.setTexture3D(H,0),He=N.TEXTURE_3D;else{if(!H.isDataArrayTexture&&!H.isCompressedArrayTexture)return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");Q.setTexture2DArray(H,0),He=N.TEXTURE_2D_ARRAY}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,H.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,H.unpackAlignment);let it=N.getParameter(N.UNPACK_ROW_LENGTH),gt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ue=N.getParameter(N.UNPACK_SKIP_PIXELS),Ae=N.getParameter(N.UNPACK_SKIP_ROWS),Ft=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,nt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,nt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Me),N.pixelStorei(N.UNPACK_SKIP_ROWS,Te),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ee),b.isDataTexture||b.isData3DTexture?N.texSubImage3D(He,X,we,ke,st,oe,me,ge,dt,Ze,nt.data):H.isCompressedArrayTexture?N.compressedTexSubImage3D(He,X,we,ke,st,oe,me,ge,dt,nt.data):N.texSubImage3D(He,X,we,ke,st,oe,me,ge,dt,Ze,nt),N.pixelStorei(N.UNPACK_ROW_LENGTH,it),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,gt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ue),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ae),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ft),X===0&&H.generateMipmaps&&N.generateMipmap(He),O.unbindTexture()},this.initRenderTarget=function(b){te.get(b).__webglFramebuffer===void 0&&Q.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Q.setTextureCube(b,0):b.isData3DTexture?Q.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Q.setTexture2DArray(b,0):Q.setTexture2D(b,0),O.unbindTexture()},this.resetState=function(){R=0,A=0,C=null,O.reset(),sn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===Jl?"display-p3":"srgb",t.unpackColorSpace=Ve.workingColorSpace===da?"display-p3":"srgb"}},Js=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Pe(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},Ks=class extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qt,this.environmentIntensity=1,this.environmentRotation=new Qt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Gm=new E,Vm=new E,Wm=new E,jm=new E,Xm=new se,qm=new se,Ym=new Re,Zm=new E,Jm=new E,Km=new E,$m=new se,Qm=new se,ef=new se,tf=new E,nf=new E,rf=new E,sf=new et,af=new et,of=new E,lf=new Re,cf=new E,hf=new Xt,uf=new Re,df=new Hi,ul=class extends Et{constructor(e=null,t=1,n=1,r,s,a,o,l,c=1003,h=1003,d,u){super(null,a,o,l,c,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},pf=new Re,mf=new Re,$s=class extends It{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ri=new Re,Oh=new Re,Ms=[],Fh=new jt,Kp=new Re,dr=new vt,pr=new Xt,Nn=class extends vt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new $s(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Kp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new jt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ri),Fh.copy(e.boundingBox).applyMatrix4(Ri),this.boundingBox.union(Fh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Xt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ri),pr.copy(e.boundingSphere).applyMatrix4(Ri),this.boundingSphere.union(pr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=r[s+a]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(dr.geometry=this.geometry,dr.material=this.material,dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),pr.copy(this.boundingSphere),pr.applyMatrix4(n),e.ray.intersectsSphere(pr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ri),Oh.multiplyMatrices(n,Ri),dr.matrixWorld=Oh,dr.raycast(e,Ms);for(let a=0,o=Ms.length;a<o;a++){let l=Ms[a];l.instanceId=s,l.object=this,t.push(l)}Ms.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new $s(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ul(new Float32Array(r*this.count),r,this.count,Xl,$t));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}},dl=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n){let r=this.pool,s=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let a=r[this.index];s.push(a),this.index++,a.start=e.start,a.count=e.count,a.z=t,a.index=n}reset(){this.list.length=0,this.index=0}},ff=new Re,gf=new Re,vf=new Re,_f=new Pe(1,1,1),xf=new Re,yf=new Vi,Mf=new jt,Sf=new Xt,bf=new E,wf=new E,Ef=new E,Tf=new dl,Af=new vt,Rf=new E,Cf=new E,Pf=new Re,If=new Hi,Lf=new Xt,Uf=new E,Df=new E,Nf=new E,Of=new E,Ff=new Re,Bf=new Hi,zf=new Xt,kf=new E,wr=class extends Et{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ot=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),r=0,s=n.length,a;a=t||e*n[s-1];let o,l=0,c=s-1;for(;l<=c;)if(r=Math.floor(l+(c-l)/2),o=n[r]-a,o<0)l=r+1;else{if(!(o>0)){c=r;break}c=r-1}if(r=c,n[r]===a)return r/(s-1);let h=n[r];return(r+(a-h)/(n[r+1]-h))/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new se:new E);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new E,r=[],s=[],a=[],o=new E,l=new Re;for(let p=0;p<=e;p++){let m=p/e;r[p]=this.getTangentAt(m,new E)}s[0]=new E,a[0]=new E;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),d=Math.abs(r[0].y),u=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(mt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,m))}a[p].crossVectors(r[p],s[p])}if(t===!0){let p=Math.acos(mt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],p*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Er=class extends Ot{constructor(e=0,t=0,n=1,r=1,s=0,a=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new se){let n=t,r=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(s=a?0:r),this.aClockwise!==!0||a||(s===r?s=-r:s-=r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*h-p*d+this.aX,c=u*d+p*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},pl=class extends Er{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};Ss=new E,lo=new $l,co=new $l,ho=new $l,Tr=class extends Ot{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new E){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o,l,c=Math.floor(a),h=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:h===0&&c===s-1&&(c=s-2,h=1),this.closed||c>0?o=r[(c-1)%s]:(Ss.subVectors(r[0],r[1]).add(r[0]),o=Ss);let d=r[c%s],u=r[(c+1)%s];if(this.closed||c+2<s?l=r[(c+2)%s]:(Ss.subVectors(r[s-1],r[s-2]).add(r[s-1]),l=Ss),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(d),p),v=Math.pow(d.distanceToSquared(u),p),g=Math.pow(u.distanceToSquared(l),p);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),lo.initNonuniformCatmullRom(o.x,d.x,u.x,l.x,m,v,g),co.initNonuniformCatmullRom(o.y,d.y,u.y,l.y,m,v,g),ho.initNonuniformCatmullRom(o.z,d.z,u.z,l.z,m,v,g)}else this.curveType==="catmullrom"&&(lo.initCatmullRom(o.x,d.x,u.x,l.x,this.tension),co.initCatmullRom(o.y,d.y,u.y,l.y,this.tension),ho.initCatmullRom(o.z,d.z,u.z,l.z,this.tension));return n.set(lo.calc(h),co.calc(h),ho.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new E().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};Qs=class extends Ot{constructor(e=new se,t=new se,n=new se,r=new se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new se){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(vr(e,r.x,s.x,a.x,o.x),vr(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ml=class extends Ot{constructor(e=new E,t=new E,n=new E,r=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new E){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(vr(e,r.x,s.x,a.x,o.x),vr(e,r.y,s.y,a.y,o.y),vr(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ea=class extends Ot{constructor(e=new se,t=new se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new se){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fl=class extends Ot{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ta=class extends Ot{constructor(e=new se,t=new se,n=new se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new se){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(gr(e,r.x,s.x,a.x),gr(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},na=class extends Ot{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(gr(e,r.x,s.x,a.x),gr(e,r.y,s.y,a.y),gr(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ia=class extends Ot{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new se){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return n.set(Bh(o,l.x,c.x,h.x,d.x),Bh(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new se().fromArray(r))}return this}},ra=Object.freeze({__proto__:null,ArcCurve:pl,CatmullRomCurve3:Tr,CubicBezierCurve:Qs,CubicBezierCurve3:ml,EllipseCurve:Er,LineCurve:ea,LineCurve3:fl,QuadraticBezierCurve:ta,QuadraticBezierCurve3:na,SplineCurve:ia}),gl=class extends Ot{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ra[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new ra[r.type]().fromJSON(r))}return this}},Ar=class extends gl{constructor(e){super(),this.type="Path",this.currentPoint=new se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ea(this.currentPoint.clone(),new se(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new ta(this.currentPoint.clone(),new se(e,t),new se(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new Qs(this.currentPoint.clone(),new se(e,t),new se(n,r),new se(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ia(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){let c=new Er(e,t,n,r,s,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},sa=class i extends Ye{constructor(e=[new se(0,-.5),new se(.5,0),new se(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=mt(r,0,2*Math.PI);let s=[],a=[],o=[],l=[],c=[],h=1/t,d=new E,u=new se,p=new E,m=new E,v=new E,g=0,f=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:g=e[x+1].x-e[x].x,f=e[x+1].y-e[x].y,p.x=1*f,p.y=-g,p.z=0*f,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:g=e[x+1].x-e[x].x,f=e[x+1].y-e[x].y,p.x=1*f,p.y=-g,p.z=0*f,m.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(m)}for(let x=0;x<=t;x++){let _=n+x*h*r,y=Math.sin(_),R=Math.cos(_);for(let A=0;A<=e.length-1;A++){d.x=e[A].x*y,d.y=e[A].y,d.z=e[A].x*R,a.push(d.x,d.y,d.z),u.x=x/t,u.y=A/(e.length-1),o.push(u.x,u.y);let C=l[3*A+0]*y,F=l[3*A+1],D=l[3*A+0]*R;c.push(C,F,D)}}for(let x=0;x<t;x++)for(let _=0;_<e.length-1;_++){let y=_+x*e.length,R=y,A=y+e.length,C=y+e.length+1,F=y+1;s.push(R,A,F),s.push(C,F,A)}this.setIndex(s),this.setAttribute("position",new Se(a,3)),this.setAttribute("uv",new Se(o,2)),this.setAttribute("normal",new Se(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},vl=class i extends sa{constructor(e=1,t=1,n=4,r=8){let s=new Ar;s.absarc(0,-t/2,e,1.5*Math.PI,0),s.absarc(0,t/2,e,0,.5*Math.PI),super(s.getPoints(n),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:r}}static fromJSON(e){return new i(e.radius,e.length,e.capSegments,e.radialSegments)}},_l=class i extends Ye{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new E,h=new se;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let p=n+d/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Se(a,3)),this.setAttribute("normal",new Se(o,3)),this.setAttribute("uv",new Se(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},qt=class i extends Ye{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],d=[],u=[],p=[],m=0,v=[],g=n/2,f=0;function x(_){let y=m,R=new se,A=new E,C=0,F=_===!0?e:t,D=_===!0?1:-1;for(let V=1;V<=r;V++)d.push(0,g*D,0),u.push(0,D,0),p.push(.5,.5),m++;let z=m;for(let V=0;V<=r;V++){let B=V/r*l+o,j=Math.cos(B),W=Math.sin(B);A.x=F*W,A.y=g*D,A.z=F*j,d.push(A.x,A.y,A.z),u.push(0,D,0),R.x=.5*j+.5,R.y=.5*W*D+.5,p.push(R.x,R.y),m++}for(let V=0;V<r;V++){let B=y+V,j=z+V;_===!0?h.push(j,j+1,B):h.push(j+1,j,B),C+=3}c.addGroup(f,C,_===!0?1:2),f+=C}(function(){let _=new E,y=new E,R=0,A=(t-e)/n;for(let C=0;C<=s;C++){let F=[],D=C/s,z=D*(t-e)+e;for(let V=0;V<=r;V++){let B=V/r,j=B*l+o,W=Math.sin(j),Y=Math.cos(j);y.x=z*W,y.y=-D*n+g,y.z=z*Y,d.push(y.x,y.y,y.z),_.set(W,A,Y).normalize(),u.push(_.x,_.y,_.z),p.push(B,1-D),F.push(m++)}v.push(F)}for(let C=0;C<r;C++)for(let F=0;F<s;F++){let D=v[F][C],z=v[F+1][C],V=v[F+1][C+1],B=v[F][C+1];e>0&&(h.push(D,z,B),R+=3),t>0&&(h.push(z,V,B),R+=3)}c.addGroup(f,R,0),f+=R})(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Se(d,3)),this.setAttribute("normal",new Se(u,3)),this.setAttribute("uv",new Se(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},si=class i extends qt{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ai=class i extends Ye{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];function o(u,p,m,v){let g=v+1,f=[];for(let x=0;x<=g;x++){f[x]=[];let _=u.clone().lerp(m,x/g),y=p.clone().lerp(m,x/g),R=g-x;for(let A=0;A<=R;A++)f[x][A]=A===0&&x===g?_:_.clone().lerp(y,A/R)}for(let x=0;x<g;x++)for(let _=0;_<2*(g-x)-1;_++){let y=Math.floor(_/2);_%2==0?(l(f[x][y+1]),l(f[x+1][y]),l(f[x][y])):(l(f[x][y+1]),l(f[x+1][y+1]),l(f[x+1][y]))}}function l(u){s.push(u.x,u.y,u.z)}function c(u,p){let m=3*u;p.x=e[m+0],p.y=e[m+1],p.z=e[m+2]}function h(u,p,m,v){v<0&&u.x===1&&(a[p]=u.x-1),m.x===0&&m.z===0&&(a[p]=v/2/Math.PI+.5)}function d(u){return Math.atan2(u.z,-u.x)}(function(u){let p=new E,m=new E,v=new E;for(let g=0;g<t.length;g+=3)c(t[g+0],p),c(t[g+1],m),c(t[g+2],v),o(p,m,v,u)})(r),(function(u){let p=new E;for(let m=0;m<s.length;m+=3)p.x=s[m+0],p.y=s[m+1],p.z=s[m+2],p.normalize().multiplyScalar(u),s[m+0]=p.x,s[m+1]=p.y,s[m+2]=p.z})(n),(function(){let u=new E;for(let m=0;m<s.length;m+=3){u.x=s[m+0],u.y=s[m+1],u.z=s[m+2];let v=d(u)/2/Math.PI+.5,g=(p=u,Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))/Math.PI+.5);a.push(v,1-g)}var p;(function(){let m=new E,v=new E,g=new E,f=new E,x=new se,_=new se,y=new se;for(let R=0,A=0;R<s.length;R+=9,A+=6){m.set(s[R+0],s[R+1],s[R+2]),v.set(s[R+3],s[R+4],s[R+5]),g.set(s[R+6],s[R+7],s[R+8]),x.set(a[A+0],a[A+1]),_.set(a[A+2],a[A+3]),y.set(a[A+4],a[A+5]),f.copy(m).add(v).add(g).divideScalar(3);let C=d(f);h(x,A+0,m,C),h(_,A+2,v,C),h(y,A+4,g,C)}})(),(function(){for(let m=0;m<a.length;m+=6){let v=a[m+0],g=a[m+2],f=a[m+4],x=Math.max(v,g,f),_=Math.min(v,g,f);x>.9&&_<.1&&(v<.2&&(a[m+0]+=1),g<.2&&(a[m+2]+=1),f<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new Se(s,3)),this.setAttribute("normal",new Se(s.slice(),3)),this.setAttribute("uv",new Se(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}},xl=class i extends ai{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},bs=new E,ws=new E,uo=new E,Es=new Cn,yl=class extends Ye{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(Ui*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},p=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:v,b:g,c:f}=Es;if(v.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),f.fromBufferAttribute(o,c[2]),Es.getNormal(uo),d[0]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,d[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,d[2]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,d[0]!==d[1]&&d[1]!==d[2]&&d[2]!==d[0])for(let x=0;x<3;x++){let _=(x+1)%3,y=d[x],R=d[_],A=Es[h[x]],C=Es[h[_]],F=`${y}_${R}`,D=`${R}_${y}`;D in u&&u[D]?(uo.dot(u[D].normal)<=s&&(p.push(A.x,A.y,A.z),p.push(C.x,C.y,C.z)),u[D]=null):F in u||(u[F]={index0:c[x],index1:c[_],normal:uo.clone()})}}for(let m in u)if(u[m]){let{index0:v,index1:g}=u[m];bs.fromBufferAttribute(o,v),ws.fromBufferAttribute(o,g),p.push(bs.x,bs.y,bs.z),p.push(ws.x,ws.y,ws.z)}this.setAttribute("position",new Se(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Wi=class extends Ar{constructor(e){super(e),this.uuid=ui(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new Ar().fromJSON(r))}return this}},$p=function(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=zh(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c,h,d,u,p;if(n&&(s=(function(m,v,g,f){let x=[],_,y,R,A,C;for(_=0,y=v.length;_<y;_++)R=v[_]*f,A=_<y-1?v[_+1]*f:m.length,C=zh(m,R,A,f,!1),C===C.next&&(C.steiner=!0),x.push(am(C));for(x.sort(im),_=0;_<x.length;_++)g=rm(x[_],g);return g})(i,e,s,t)),i.length>80*t){o=c=i[0],l=h=i[1];for(let m=t;m<r;m+=t)d=i[m],u=i[m+1],d<o&&(o=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);p=Math.max(c-o,h-l),p=p!==0?32767/p:0}return Rr(s,a,t,o,l,p,0),a};In=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];Hh(e),Gh(n,e);let a=e.length;t.forEach(Hh);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Gh(n,t[l]);let o=$p(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};Ir=class i extends Ye{constructor(e=new Wi([new se(.5,.5),new se(-.5,.5),new se(-.5,-.5),new se(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++)a(e[o]);function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled===void 0||t.bevelEnabled,p=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:p-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,f=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:lm,_,y,R,A,C,F=!1;f&&(_=f.getSpacedPoints(h),F=!0,u=!1,y=f.computeFrenetFrames(h,!1),R=new E,A=new E,C=new E),u||(g=0,p=0,m=0,v=0);let D=o.extractPoints(c),z=D.shape,V=D.holes;if(!In.isClockWise(z)){z=z.reverse();for(let T=0,P=V.length;T<P;T++){let S=V[T];In.isClockWise(S)&&(V[T]=S.reverse())}}let B=In.triangulateShape(z,V),j=z;for(let T=0,P=V.length;T<P;T++){let S=V[T];z=z.concat(S)}function W(T,P,S){return P||console.error("THREE.ExtrudeGeometry: vec does not exist"),T.clone().addScaledVector(P,S)}let Y=z.length,J=B.length;function ne(T,P,S){let L,I,$,O=T.x-P.x,K=T.y-P.y,te=S.x-T.x,Q=S.y-T.y,de=O*O+K*K,pe=O*Q-K*te;if(Math.abs(pe)>Number.EPSILON){let ie=Math.sqrt(de),re=Math.sqrt(te*te+Q*Q),xe=P.x-K/ie,Ce=P.y+O/ie,ye=((S.x-Q/re-xe)*Q-(S.y+te/re-Ce)*te)/(O*Q-K*te);L=xe+O*ye-T.x,I=Ce+K*ye-T.y;let ze=L*L+I*I;if(ze<=2)return new se(L,I);$=Math.sqrt(ze/2)}else{let ie=!1;O>Number.EPSILON?te>Number.EPSILON&&(ie=!0):O<-Number.EPSILON?te<-Number.EPSILON&&(ie=!0):Math.sign(K)===Math.sign(Q)&&(ie=!0),ie?(L=-K,I=O,$=Math.sqrt(de)):(L=O,I=K,$=Math.sqrt(de/2))}return new se(L/$,I/$)}let ae=[];for(let T=0,P=j.length,S=P-1,L=T+1;T<P;T++,S++,L++)S===P&&(S=0),L===P&&(L=0),ae[T]=ne(j[T],j[S],j[L]);let ue=[],fe,k=ae.concat();for(let T=0,P=V.length;T<P;T++){let S=V[T];fe=[];for(let L=0,I=S.length,$=I-1,O=L+1;L<I;L++,$++,O++)$===I&&($=0),O===I&&(O=0),fe[L]=ne(S[L],S[$],S[O]);ue.push(fe),k=k.concat(fe)}for(let T=0;T<g;T++){let P=T/g,S=p*Math.cos(P*Math.PI/2),L=m*Math.sin(P*Math.PI/2)+v;for(let I=0,$=j.length;I<$;I++){let O=W(j[I],ae[I],L);he(O.x,O.y,-S)}for(let I=0,$=V.length;I<$;I++){let O=V[I];fe=ue[I];for(let K=0,te=O.length;K<te;K++){let Q=W(O[K],fe[K],L);he(Q.x,Q.y,-S)}}}let Z=m+v;for(let T=0;T<Y;T++){let P=u?W(z[T],k[T],Z):z[T];F?(A.copy(y.normals[0]).multiplyScalar(P.x),R.copy(y.binormals[0]).multiplyScalar(P.y),C.copy(_[0]).add(A).add(R),he(C.x,C.y,C.z)):he(P.x,P.y,0)}for(let T=1;T<=h;T++)for(let P=0;P<Y;P++){let S=u?W(z[P],k[P],Z):z[P];F?(A.copy(y.normals[T]).multiplyScalar(S.x),R.copy(y.binormals[T]).multiplyScalar(S.y),C.copy(_[T]).add(A).add(R),he(C.x,C.y,C.z)):he(S.x,S.y,d/h*T)}for(let T=g-1;T>=0;T--){let P=T/g,S=p*Math.cos(P*Math.PI/2),L=m*Math.sin(P*Math.PI/2)+v;for(let I=0,$=j.length;I<$;I++){let O=W(j[I],ae[I],L);he(O.x,O.y,d+S)}for(let I=0,$=V.length;I<$;I++){let O=V[I];fe=ue[I];for(let K=0,te=O.length;K<te;K++){let Q=W(O[K],fe[K],L);F?he(Q.x,Q.y+_[h-1].y,_[h-1].x+S):he(Q.x,Q.y,d+S)}}}function le(T,P){let S=T.length;for(;--S>=0;){let L=S,I=S-1;I<0&&(I=T.length-1);for(let $=0,O=h+2*g;$<O;$++){let K=Y*$,te=Y*($+1);M(P+L+K,P+I+K,P+I+te,P+L+te)}}}function he(T,P,S){l.push(T),l.push(P),l.push(S)}function w(T,P,S){U(T),U(P),U(S);let L=r.length/3,I=x.generateTopUV(n,r,L-3,L-2,L-1);G(I[0]),G(I[1]),G(I[2])}function M(T,P,S,L){U(T),U(P),U(L),U(P),U(S),U(L);let I=r.length/3,$=x.generateSideWallUV(n,r,I-6,I-3,I-2,I-1);G($[0]),G($[1]),G($[3]),G($[1]),G($[2]),G($[3])}function U(T){r.push(l[3*T+0]),r.push(l[3*T+1]),r.push(l[3*T+2])}function G(T){s.push(T.x),s.push(T.y)}(function(){let T=r.length/3;if(u){let P=0,S=Y*P;for(let L=0;L<J;L++){let I=B[L];w(I[2]+S,I[1]+S,I[0]+S)}P=h+2*g,S=Y*P;for(let L=0;L<J;L++){let I=B[L];w(I[0]+S,I[1]+S,I[2]+S)}}else{for(let P=0;P<J;P++){let S=B[P];w(S[2],S[1],S[0])}for(let P=0;P<J;P++){let S=B[P];w(S[0]+Y*h,S[1]+Y*h,S[2]+Y*h)}}n.addGroup(T,r.length/3-T,0)})(),(function(){let T=r.length/3,P=0;le(j,P),P+=j.length;for(let S=0,L=V.length;S<L;S++){let I=V[S];le(I,P),P+=I.length}n.addGroup(T,r.length/3-T,1)})()}this.setAttribute("position",new Se(r,3)),this.setAttribute("uv",new Se(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,r){if(r.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];r.shapes.push(o.uuid)}else r.shapes.push(t.uuid);return r.options=Object.assign({},n),n.extrudePath!==void 0&&(r.options.extrudePath=n.extrudePath.toJSON()),r})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new ra[r.type]().fromJSON(r)),new i(n,e.options)}},lm={generateTopUV:function(i,e,t,n,r){let s=e[3*t],a=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*r],h=e[3*r+1];return[new se(s,a),new se(o,l),new se(c,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],d=e[3*n+2],u=e[3*r],p=e[3*r+1],m=e[3*r+2],v=e[3*s],g=e[3*s+1],f=e[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new se(a,1-l),new se(c,1-d),new se(u,1-m),new se(v,1-f)]:[new se(o,1-l),new se(h,1-d),new se(p,1-m),new se(g,1-f)]}},li=class i extends ai{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},bl=class i extends ai{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},wl=class i extends Ye{constructor(e=.5,t=1,n=32,r=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],l=[],c=[],h=[],d=e,u=(t-e)/(r=Math.max(1,r)),p=new E,m=new se;for(let v=0;v<=r;v++){for(let g=0;g<=n;g++){let f=s+g/n*a;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),m.x=(p.x/t+1)/2,m.y=(p.y/t+1)/2,h.push(m.x,m.y)}d+=u}for(let v=0;v<r;v++){let g=v*(n+1);for(let f=0;f<n;f++){let x=f+g,_=x,y=x+n+1,R=x+n+2,A=x+1;o.push(_,y,A),o.push(y,R,A)}}this.setIndex(o),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(c,3)),this.setAttribute("uv",new Se(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},El=class i extends Ye{constructor(e=new Wi([new se(0,.5),new se(-.5,-.5),new se(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let d=r.length/3,u=h.extractPoints(t),p=u.shape,m=u.holes;In.isClockWise(p)===!1&&(p=p.reverse());for(let g=0,f=m.length;g<f;g++){let x=m[g];In.isClockWise(x)===!0&&(m[g]=x.reverse())}let v=In.triangulateShape(p,m);for(let g=0,f=m.length;g<f;g++){let x=m[g];p=p.concat(x)}for(let g=0,f=p.length;g<f;g++){let x=p[g];r.push(x.x,x.y,0),s.push(0,0,1),a.push(x.x,x.y)}for(let g=0,f=v.length;g<f;g++){let x=v[g],_=x[0]+d,y=x[1]+d,R=x[2]+d;n.push(_,y,R),l+=3}}this.setIndex(n),this.setAttribute("position",new Se(r,3)),this.setAttribute("normal",new Se(s,3)),this.setAttribute("uv",new Se(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let r=0,s=t.length;r<s;r++){let a=t[r];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}},ci=class i extends Ye{constructor(e=1,t=32,n=16,r=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new E,u=new E,p=[],m=[],v=[],g=[];for(let f=0;f<=n;f++){let x=[],_=f/n,y=0;f===0&&a===0?y=.5/t:f===n&&l===Math.PI&&(y=-.5/t);for(let R=0;R<=t;R++){let A=R/t;d.x=-e*Math.cos(r+A*s)*Math.sin(a+_*o),d.y=e*Math.cos(a+_*o),d.z=e*Math.sin(r+A*s)*Math.sin(a+_*o),m.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),g.push(A+y,1-_),x.push(c++)}h.push(x)}for(let f=0;f<n;f++)for(let x=0;x<t;x++){let _=h[f][x+1],y=h[f][x],R=h[f+1][x],A=h[f+1][x+1];(f!==0||a>0)&&p.push(_,y,A),(f!==n-1||l<Math.PI)&&p.push(y,R,A)}this.setIndex(p),this.setAttribute("position",new Se(m,3)),this.setAttribute("normal",new Se(v,3)),this.setAttribute("uv",new Se(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Tl=class i extends ai{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},nn=class i extends Ye{constructor(e=1,t=.4,n=12,r=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],l=[],c=[],h=new E,d=new E,u=new E;for(let p=0;p<=n;p++)for(let m=0;m<=r;m++){let v=m/r*s,g=p/n*Math.PI*2;d.x=(e+t*Math.cos(g))*Math.cos(v),d.y=(e+t*Math.cos(g))*Math.sin(v),d.z=t*Math.sin(g),o.push(d.x,d.y,d.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(m/r),c.push(p/n)}for(let p=1;p<=n;p++)for(let m=1;m<=r;m++){let v=(r+1)*p+m-1,g=(r+1)*(p-1)+m-1,f=(r+1)*(p-1)+m,x=(r+1)*p+m;a.push(v,g,x),a.push(g,f,x)}this.setIndex(a),this.setAttribute("position",new Se(o,3)),this.setAttribute("normal",new Se(l,3)),this.setAttribute("uv",new Se(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Al=class i extends Ye{constructor(e=1,t=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],l=[],c=[],h=[],d=new E,u=new E,p=new E,m=new E,v=new E,g=new E,f=new E;for(let _=0;_<=n;++_){let y=_/n*s*Math.PI*2;x(y,s,a,e,p),x(y+.01,s,a,e,m),g.subVectors(m,p),f.addVectors(m,p),v.crossVectors(g,f),f.crossVectors(v,g),v.normalize(),f.normalize();for(let R=0;R<=r;++R){let A=R/r*Math.PI*2,C=-t*Math.cos(A),F=t*Math.sin(A);d.x=p.x+(C*f.x+F*v.x),d.y=p.y+(C*f.y+F*v.y),d.z=p.z+(C*f.z+F*v.z),l.push(d.x,d.y,d.z),u.subVectors(d,p).normalize(),c.push(u.x,u.y,u.z),h.push(_/n),h.push(R/r)}}for(let _=1;_<=n;_++)for(let y=1;y<=r;y++){let R=(r+1)*(_-1)+(y-1),A=(r+1)*_+(y-1),C=(r+1)*_+y,F=(r+1)*(_-1)+y;o.push(R,A,F),o.push(A,C,F)}function x(_,y,R,A,C){let F=Math.cos(_),D=Math.sin(_),z=R/y*_,V=Math.cos(z);C.x=A*(2+V)*.5*F,C.y=A*(2+V)*D*.5,C.z=A*Math.sin(z)*.5}this.setIndex(o),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(c,3)),this.setAttribute("uv",new Se(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Lr=class i extends Ye{constructor(e=new na(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new E,l=new E,c=new se,h=new E,d=[],u=[],p=[],m=[];function v(g){h=e.getPointAt(g/t,h);let f=a.normals[g],x=a.binormals[g];for(let _=0;_<=r;_++){let y=_/r*Math.PI*2,R=Math.sin(y),A=-Math.cos(y);l.x=A*f.x+R*x.x,l.y=A*f.y+R*x.y,l.z=A*f.z+R*x.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}(function(){for(let g=0;g<t;g++)v(g);v(s===!1?t:0),(function(){for(let g=0;g<=t;g++)for(let f=0;f<=r;f++)c.x=g/t,c.y=f/r,p.push(c.x,c.y)})(),(function(){for(let g=1;g<=t;g++)for(let f=1;f<=r;f++){let x=(r+1)*(g-1)+(f-1),_=(r+1)*g+(f-1),y=(r+1)*g+f,R=(r+1)*(g-1)+f;m.push(x,_,R),m.push(_,y,R)}})()})(),this.setIndex(m),this.setAttribute("position",new Se(d,3)),this.setAttribute("normal",new Se(u,3)),this.setAttribute("uv",new Se(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new ra[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Rl=class extends Ye{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new E,s=new E;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let d=l[c],u=d.start;for(let p=u,m=u+d.count;p<m;p+=3)for(let v=0;v<3;v++){let g=o.getX(p+v),f=o.getX(p+(v+1)%3);r.fromBufferAttribute(a,g),s.fromBufferAttribute(a,f),Vh(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,d=3*o+(c+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,d),Vh(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Se(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};Hf=Object.freeze({__proto__:null,BoxGeometry:Dn,CapsuleGeometry:vl,CircleGeometry:_l,ConeGeometry:si,CylinderGeometry:qt,DodecahedronGeometry:xl,EdgesGeometry:yl,ExtrudeGeometry:Ir,IcosahedronGeometry:li,LatheGeometry:sa,OctahedronGeometry:bl,PlaneGeometry:gn,PolyhedronGeometry:ai,RingGeometry:wl,ShapeGeometry:El,SphereGeometry:ci,TetrahedronGeometry:Tl,TorusGeometry:nn,TorusKnotGeometry:Al,TubeGeometry:Lr,WireframeGeometry:Rl}),hi=class extends ri{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};ji=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];t:{e:{let a;n:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break n}if(e>=s)break t;{let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0}}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Cl=class extends ji{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wc,endingEnd:Wc}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case jc:s=e,o=2*t-n;break;case Xc:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case jc:a=e,l=2*n-t;break;case Xc:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,m=(n-t)/(r-t),v=m*m,g=v*m,f=-u*g+2*u*v-u*m,x=(1+u)*g+(-1.5-2*u)*v+(-.5+u)*m+1,_=(-1-p)*g+(1.5+p)*v+.5*m,y=p*g-p*v;for(let R=0;R!==o;++R)s[R]=f*a[h+R]+x*a[c+R]+_*a[l+R]+y*a[d+R];return s}},Pl=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),d=1-h;for(let u=0;u!==o;++u)s[u]=a[c+u]*d+a[l+u]*h;return s}},Il=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Wt=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Rs(t,this.TimeBufferType),this.values=Rs(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Rs(e.times,Array),values:Rs(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Il(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Pl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Cl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ns:t=this.InterpolantFactoryMethodDiscrete;break;case qo:t=this.InterpolantFactoryMethodLinear;break;case Da:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ns;case this.InterpolantFactoryMethodLinear:return qo;case this.InterpolantFactoryMethodSmooth:return Da}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!=0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&cm(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Da,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(r)l=!0;else{let h=o*n,d=h-n,u=h+n;for(let p=0;p!==n;++p){let m=t[h+p];if(m!==t[d+p]||m!==t[u+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,d=a*n;for(let u=0;u!==n;++u)t[d+u]=t[h+u]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Wt.prototype.TimeBufferType=Float32Array,Wt.prototype.ValueBufferType=Float32Array,Wt.prototype.DefaultInterpolation=qo;ti=class extends Wt{constructor(e,t,n){super(e,t,n)}};ti.prototype.ValueTypeName="bool",ti.prototype.ValueBufferType=Array,ti.prototype.DefaultInterpolation=Ns,ti.prototype.InterpolantFactoryMethodLinear=void 0,ti.prototype.InterpolantFactoryMethodSmooth=void 0;Ll=class extends Wt{};Ll.prototype.ValueTypeName="color";Ul=class extends Wt{};Ul.prototype.ValueTypeName="number";Dl=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)Nt.slerpFlat(s,0,a,c-o,a,c,l);return s}},aa=class extends Wt{InterpolantFactoryMethodLinear(e){return new Dl(this.times,this.values,this.getValueSize(),e)}};aa.prototype.ValueTypeName="quaternion",aa.prototype.InterpolantFactoryMethodSmooth=void 0;ni=class extends Wt{constructor(e,t,n){super(e,t,n)}};ni.prototype.ValueTypeName="string",ni.prototype.ValueBufferType=Array,ni.prototype.DefaultInterpolation=Ns,ni.prototype.InterpolantFactoryMethodLinear=void 0,ni.prototype.InterpolantFactoryMethodSmooth=void 0;Nl=class extends Wt{};Nl.prototype.ValueTypeName="vector";Wh={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Ol=class{constructor(e,t,n){let r=this,s,a=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){l++,a===!1&&r.onStart!==void 0&&r.onStart(h,o,l),a=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,l),o===l&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let p=c[d],m=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return m}return null}}},hm=new Ol,Ur=class{constructor(e){this.manager=e!==void 0?e:hm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise((function(r,s){n.load(e,r,t,s)}))}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ur.DEFAULT_MATERIAL_NAME="__DEFAULT";Fl=class extends Ur{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Wh.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout((function(){t&&t(a),s.manager.itemEnd(e)}),0),a;let o=Sr("img");function l(){h(),Wh.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){h(),r&&r(d),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}},oa=class extends Ur{constructor(e){super(e)}load(e,t,n,r){let s=new Et,a=new Fl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,(function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)}),n,r),s}},la=class extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},ca=class extends la{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},po=new Re,jh=new E,Xh=new E,Bl=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new se(512,512),this.map=null,this.mapPass=null,this.matrix=new Re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vi,this._frameExtents=new se(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;jh.setFromMatrixPosition(e.matrixWorld),t.position.copy(jh),Xh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Xh),t.updateMatrixWorld(),po.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(po),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(po)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Gf=new Re,Vf=new E,Wf=new E,zl=class extends Bl{constructor(){super(new Xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ha=class extends la{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new zl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},jf=new Re,Xf=new Re,qf=new Re,Yf=new E,Zf=new Nt,Jf=new E,Kf=new E,$f=new E,Qf=new Nt,eg=new E,tg=new E,Ql="\\[\\]\\.:\\/",um=new RegExp("["+Ql+"]","g"),mo="[^"+Ql+"]",dm="[^"+Ql.replace("\\.","")+"]",pm=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",mo)+/(WCOD+)?/.source.replace("WCOD",dm)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",mo)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",mo)+"$"),mm=["material","materials","bones","map"],Qe=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(um,"")}static parseTrackName(e){let t=pm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);mm.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Qe.Composite=class{constructor(i,e,t){let n=t||Qe.parseTrackName(e);this._targetGroup=i,this._bindings=i.subscribe_(e,n)}getValue(i,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(i,e)}setValue(i,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=t.length;n!==r;++n)t[n].setValue(i,e)}bind(){let i=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=i.length;e!==t;++e)i[e].bind()}unbind(){let i=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=i.length;e!==t;++e)i[e].unbind()}},Qe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Qe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Qe.prototype.GetterByBindingType=[Qe.prototype._getValue_direct,Qe.prototype._getValue_array,Qe.prototype._getValue_arrayElement,Qe.prototype._getValue_toArray],Qe.prototype.SetterByBindingTypeAndVersioning=[[Qe.prototype._setValue_direct,Qe.prototype._setValue_direct_setNeedsUpdate,Qe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_array,Qe.prototype._setValue_array_setNeedsUpdate,Qe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_arrayElement,Qe.prototype._setValue_arrayElement_setNeedsUpdate,Qe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_fromArray,Qe.prototype._setValue_fromArray_setNeedsUpdate,Qe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];ng=new Float32Array(1),ig=new Re,rg=new se,sg=new E,ag=new E,og=new E,lg=new E,cg=new Re,hg=new Re,ug=new E,dg=new Pe,pg=new Pe,mg=new E,fg=new E,gg=new E,vg=new E,_g=new br,xg=new jt,yg=new E;typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"169"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="169")});var bu={};Vu(bu,{makeBunModel:()=>Su,makeCharacter:()=>yu,makePortraitHead:()=>xu,makeWorld:()=>Sm});function ga(i){let e=(i|0)^1597463007;return()=>(e^=e<<13,e^=e>>>17,e^=e<<5,(e>>>0)/4294967296)}function Fe(i,e,t,n=[0,0,0],r=[1,1,1]){let s=new vt(e,t);return s.position.set(...n),s.scale.set(...r),s.castShadow=!0,s.receiveShadow=!0,i.add(s),s}function rn(i,e,t,n,r,s=8){let a=Fr(...e),o=Fr(...t),l=o.clone().sub(a),c=Fe(i,new qt(n,n,l.length(),s),r);return c.position.copy(a.add(o).multiplyScalar(.5)),c.quaternion.setFromUnitVectors(Fr(0,1,0),l.normalize()),c}function tc(i,e,t,n){return Fe(i,new Lr(new Tr(e.map(r=>Fr(...r))),Math.max(8,e.length*4),t,6,!1),n)}function Or(i,e,t,n=.05){let r=new Wi;r.moveTo(-i/2+n,-e/2),r.lineTo(i/2-n,-e/2),r.quadraticCurveTo(i/2,-e/2,i/2,-e/2+n),r.lineTo(i/2,e/2-n),r.quadraticCurveTo(i/2,e/2,i/2-n,e/2),r.lineTo(-i/2+n,e/2),r.quadraticCurveTo(-i/2,e/2,-i/2,e/2-n),r.lineTo(-i/2,-e/2+n),r.quadraticCurveTo(-i/2,-e/2,-i/2+n,-e/2);let s=new Ir(r,{depth:t-2*n,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:n*.5,bevelThickness:n,curveSegments:4});return s.translate(0,0,-t/2+n),s}function vn(i){i.updateMatrixWorld(!0);let e=i.matrixWorld.clone().invert(),t=new Map,n=[];i.traverse(r=>{if(r.isMesh&&!r.isInstancedMesh){let s=r.geometry.index?r.geometry.toNonIndexed():r.geometry.clone();s.applyMatrix4(e.clone().multiply(r.matrixWorld)),t.has(r.material)||t.set(r.material,{p:[],n:[]});let a=t.get(r.material);a.p.push(...s.attributes.position.array),a.n.push(...s.attributes.normal.array),s.dispose(),n.push(r)}}),n.forEach(r=>r.removeFromParent());for(let[r,s]of t){let a=new Ye;a.setAttribute("position",new Se(s.p,3)),a.setAttribute("normal",new Se(s.n,3)),Fe(i,a,r)}}function xu(i){let e=[],t=[],n=[],r=[],o=[new hi({map:i,color:"#dfdfdf",roughness:1,emissiveMap:i,emissive:"#ffffff",emissiveIntensity:.15}),We("#b98466"),We("#30312e")];for(let u=0;u<=96;u++){let p=46+u/96*447,m=0;for(;m<fa.length-2&&p>fa[m+1][0];)m++;let v=fa[m],g=fa[m+1],f=(p-v[0])/(g[0]-v[0]),x=Nr.lerp(v[1],g[1],f),_=Nr.lerp(v[2],g[2],f),y=(x+_)/2,R=(_-x)/2,A=(285-p)*.00227,C=.155+.115*Math.sin(u/96*Math.PI);for(let F=0;F<=112;F++){let D=F/112*Math.PI*2,z=Math.max(0,Math.cos(D)),V=y+Math.sin(D)*R,B=(V-270)*.00248,j=(ae,ue,fe,k,Z)=>Z*Math.exp(-(((V-ae)/fe)**2+((p-ue)/k)**2)),W=j(253,345,23,22,.134)+j(255,310,13,45,.055)+j(230,352,15,12,.031)+j(275,352,15,12,.026),Y=j(201,283,25,13,-.022)+j(308,283,25,13,-.022),J=j(186,339,33,42,.026)+j(337,337,35,45,.026),ne=j(254,405,44,18,.024);e.push(B,A,Math.cos(D)*C+(W+Y+J+ne)*z**3),t.push(V/553,1-p/739)}}for(let u=0;u<96;u++)for(let p=0;p<112;p++){let m=u*113+p,v=m+112+1,g=n.length;n.push(m,v,m+1,v,v+1,m+1);let f=Math.cos((p+.5)/112*Math.PI*2)>0;r.push({start:g,count:6,materialIndex:f?0:46+(u+.5)/96*447<246?2:1})}for(let[u,p]of[[0,2],[96,1]]){let m=e.length/3,v=46+u/96*447;e.push(((u===0?279:270.5)-270)*.00248,(285-v)*.00227,0),t.push((u===0?279:270.5)/553,1-v/739);for(let g=0;g<112;g++){let f=u*113+g,x=f+1,_=n.length;n.push(m,...u===0?[f,x]:[x,f]),r.push({start:_,count:3,materialIndex:p})}}let l=[],c=new Ye;for(let u=0;u<3;u++){let p=l.length;for(let m of r)if(m.materialIndex===u)for(let v=0;v<m.count;v++)l.push(n[m.start+v]);c.addGroup(p,l.length-p,u)}c.setAttribute("position",new Se(e,3)),c.setAttribute("uv",new Se(t,2)),c.setIndex(l),c.computeVertexNormals();let h=new qe,d=new vt(c,o);return d.castShadow=!0,d.receiveShadow=!0,h.add(d),h}function _m(){let i=new qe,e=new qe;i.add(e),Fe(e,new qt(.43,.315,.64,20,1,!0),Oe.wicker,[0,-.31,0]),Fe(e,new qt(.317,.317,.045,20),Oe.wood,[0,-.63,0]);for(let s=0;s<11;s++){let a=-.61+s*.058,o=.32+(a+.61)/.61*.11,l=Fe(e,new nn(o,.017,5,24),s%3?Oe.weave:Oe.wood,[0,a,0]);l.rotation.x=Math.PI/2}for(let s=0;s<22;s++){let a=s*Math.PI/11;rn(e,[Math.cos(a)*.318,-.61,Math.sin(a)*.318],[Math.cos(a)*.432,.01,Math.sin(a)*.432],.012,Oe.weave,5)}let t=Fe(e,new nn(.435,.035,6,28),Oe.weave);t.rotation.x=Math.PI/2,vn(e);let n=new qe;i.add(n),Fn(n,Oe.wheat,[0,-.02,0],[.405,.18,.405]);let r=ga(1829);for(let s=0;s<31;s++){let a=s*2.39996,o=Math.sqrt(r())*.36,l=Math.cos(a)*o,c=Math.sin(a)*o,h=.17+r()*.22,d=(r()-.5)*.09;rn(n,[l,-.035,c],[l+d,h,c],.006,Oe.leaf,4);for(let u=0;u<4;u++)for(let p of[-1,1]){let m=Fe(n,vm,Oe.kernel,[l+d+p*.014,h-.045+u*.029,c],[.018,.04,.018]);m.rotation.z=-p*.55}}return vn(n),i.userData.grain=n,i}function yu(i=null){let e=new qe,t=new qe;e.add(t);let n=new qe;t.add(n),Fe(n,Or(.67,.77,.4,.065),Oe.cloth,[0,1.31,0]),Fn(n,Oe.cloth,[0,1.63,-.005],[.375,.17,.215]),Fe(n,di,Oe.seam,[0,1.3,.224],[.015,.64,.012]);for(let c=0;c<5;c++)Fn(n,Oe.shoe,[.018,1.56-c*.124,.24],[.014,.014,.008]);for(let c of[-1,1]){Fe(n,Or(.21,.17,.018,.014),Oe.seam,[c*.182,1.38,.229]),Fe(n,di,Oe.cloth,[c*.182,1.436,.245],[.212,.044,.013]),Fn(n,Oe.shoe,[c*.182,1.431,.256],[.012,.009,.006]),Fe(n,Or(.24,.15,.018,.015),Oe.cloth,[c*.18,1.064,.225]),rn(n,[c*.35,1.56,0],[c*.53,1.29,.07],.105,Oe.cloth,12),rn(n,[c*.53,1.29,.07],[c*.68,1.68,.16],.091,Oe.cloth,12),Fn(n,Oe.skin,[c*.69,1.716,.147],[.079,.093,.079]);let h=Fe(n,di,Oe.cloth,[c*.111,1.704,.13],[.15,.12,.12]);h.rotation.z=c*.17}Fe(n,new qt(.14,.15,.21,16),Oe.skin,[0,1.76,0]),vn(n);let r=xu(i);r.position.set(0,2.12,.008),t.add(r);let s=[];for(let c of[-1,1]){let h=new qe;h.position.set(c*.175,.93,0),t.add(h),rn(h,[0,-.015,0],[0,-.43,0],.135,Oe.seam,12),rn(h,[0,-.4,0],[0,-.78,0],.106,Oe.seam,12),Fe(h,Or(.23,.14,.39,.06),Oe.shoe,[0,-.845,.09]),vn(h),s.push(h)}let a=new qe;a.position.set(0,1.78,-.075),t.add(a);let o=new qe;a.add(o),tc(o,[[-1.64,.14,0],[-.92,.036,0],[0,0,0],[.92,.036,0],[1.64,.14,0]],.049,Oe.wood);for(let c of[-1.48,1.48])for(let h=0;h<3;h++){let d=Fe(o,new nn(.051,.009,5,12),Oe.rope,[c+h*.018,.115,0]);d.rotation.y=Math.PI/2}vn(o);let l=[];for(let c of[-1,1]){let h=new qe;h.position.set(c*1.48,.11,0),a.add(h);let d=new qe;h.add(d);for(let p of[-.3,.3])tc(d,[[0,0,0],[0,-.36,p*.55],[0,-.81,p]],.014,Oe.rope);vn(d);let u=_m();u.position.y=-.8,h.add(u),l.push({hanger:h,basket:u,side:c})}return{root:e,lean:t,head:r,load:a,legs:s,baskets:l}}function Yi(i,e){let t=0;for(;t<qi.length-2&&i>qi[t+1];)t++;let n=Sn((i-qi[t])/(qi[t+1]-qi[t]),0,1);return Xn(e)+Nr.lerp(vu[t],vu[t+1],n)+Math.sin(e*.107+i*.37)*Math.min(Math.max(Math.abs(i)-4.1,0),10)*.17}function _u(i,e){let t=[],n=[],r=e==="road"?["#bbaa7c","#c6b58b","#b7a679","#cdbc94"]:["#4a7048","#547b4a","#66834e","#456b46","#789158"],s=e==="road"?[-4.1,-1.36,1.36,4.1]:qi,a=e==="road"?12:6,o=18/a,l=new Pe;function c(d,u){let p=i+d*o,m=s[u];return[yt(p)+m,e==="road"?Xn(p)+.032:Yi(m,p),p-i]}for(let d=0;d<a;d++)for(let u=0;u<s.length-1;u++){let p=c(d,u),m=c(d+1,u),v=c(d,u+1),g=c(d+1,u+1),f=Math.abs(Math.floor(i/3)+d*13+u*7);for(let[x,_]of[[0,[p,m,v]],[1,[m,g,v]]]){l.set(r[(f+x)%r.length]),e!=="road"&&u>=7&&u<11&&l.lerp(new Pe("#6e7764"),.5);for(let y of _)t.push(...y),n.push(l.r,l.g,l.b)}}let h=new Ye;return h.setAttribute("position",new Se(t,3)),h.setAttribute("color",new Se(n,3)),h.computeVertexNormals(),h}function xm(){let i=new qe,e=new hi({vertexColors:!0,flatShading:!0,roughness:1}),t=Fe(i,new Ye,e),n=Fe(i,new Ye,e);t.castShadow=n.castShadow=!1;let r=new Nn(new li(1,0),We("#929180",!0),22);r.castShadow=!0,r.receiveShadow=!0,i.add(r);let s=new Nn(new si(1,2,6),We("#2f5a3f",!0),16);s.castShadow=!0,i.add(s);let a=new Nn(new qt(.065,.1,1,5),We("#736143"),8);a.castShadow=!0,i.add(a);let o=new Nn(new si(.1,.48,3),We("#9eae63",!0),28);i.add(o);let l=new ft;function c(d,u,p,m,v,g,f,x,_=0){l.position.set(p,m,v),l.rotation.set(0,_,0),l.scale.set(g,f,x),l.updateMatrix(),d.setMatrixAt(u,l.matrix)}return{root:i,set:d=>{i.position.z=d,t.geometry.dispose(),n.geometry.dispose(),t.geometry=_u(d,"ground"),n.geometry=_u(d,"road");let u=ga(d*31+553);for(let p=0;p<22;p++){let m=d+u()*18,v=p%2?1:-1,g=v*(4.1+.12+u()*.6),f=.07+u()*.19;c(r,p,yt(m)+g,Yi(g,m)+f*.25,m-d,f,f*.6,f*.8,u()*6.28)}for(let p=0;p<8;p++){let m=d+u()*18,v=-4.1-1.2-u()*9,g=Yi(v,m),f=.85+u()*1.35;c(a,p,yt(m)+v,g+f*.38,m-d,f,f,f),c(s,p*2,yt(m)+v,g+f*.93,m-d,f*.63,f*.7,f*.63,u()),c(s,p*2+1,yt(m)+v,g+f*1.48,m-d,f*.44,f*.55,f*.44,u())}for(let p=0;p<28;p++){let m=d+u()*18,v=(p%3===0?1:-1)*(4.1+.04+u()*.85);c(o,p,yt(m)+v,Yi(v,m)+.12,m-d,.8+u(),.45+u()*.55,.8+u(),u()*6.28)}for(let p of[r,s,a,o])p.instanceMatrix.needsUpdate=!0,p.computeBoundingSphere()},index:null}}function ec(){let i=new qe;rn(i,[0,0,0],[0,1.25,0],.055,Oe.wood),Fe(i,Or(.75,.44,.085,.015),Oe.wood,[0,1.12,0]);let e=document.createElement("canvas");e.width=256,e.height=128;let t=e.getContext("2d"),n=new wr(e);n.colorSpace=bt;let r=Fe(i,new gn(.69,.37),new en({map:n,transparent:!0,side:Hl}),[0,1.12,.046]);return r.castShadow=!1,{root:i,set:a=>{t.clearRect(0,0,256,128),t.fillStyle="#fff1c7",t.textAlign="center",t.textBaseline="middle",t.font="bold 38px sans-serif",t.fillText(a===0?"\u625B\u9EA6\u8D77\u70B9":`${a/500} \u91CC`,128,48),t.font="20px sans-serif",t.fillStyle="#edd5a5",t.fillText(a===5e3?"\u5230\u8FBE\u7EC8\u70B9":"\u5168\u7A0B\u5341\u91CC",128,93),n.needsUpdate=!0;let o=-4.1-.45;i.position.set(yt(a)+o,Yi(o,a),a),i.rotation.y=.3},mark:null}}function Mu(i,e="#9a3730",t="#fff3cc",n=512,r=128){let s=document.createElement("canvas");s.width=n,s.height=r;let a=s.getContext("2d");a.fillStyle=e,a.fillRect(0,0,n,r),a.strokeStyle=t,a.lineWidth=5,a.strokeRect(9,9,n-18,r-18),a.textAlign="center",a.textBaseline="middle",a.fillStyle=t,a.font=`bold ${r*.48}px sans-serif`,a.fillText(i,n/2,r*.53,n-34);let o=new wr(s);return o.colorSpace=bt,o}function Su(){let i=new qe,e=We("#fff0cd"),t=We("#dbcaa7");Fn(i,e,[0,.01,0],[.32,.237,.32]),Fn(i,e,[0,.183,0],[.112,.081,.112]);for(let n=0;n<10;n++){let r=n/10*Math.PI*2;tc(i,[[Math.cos(r)*.28,.08,Math.sin(r)*.28],[Math.cos(r+.1)*.19,.183,Math.sin(r+.1)*.19],[Math.cos(r+.22)*.075,.244,Math.sin(r+.22)*.075]],.009,t)}return vn(i),i}function ym(){let i=new qe,e=We("#825333"),t=We("#dbb174");rn(i,[-3.8,.25,0],[3.8,.25,0],.25,e,14);for(let l of[-1,1]){let c=Fe(i,new qt(.22,.22,.014,16),t,[l*3.809,.25,0]);c.rotation.z=Math.PI/2;let h=Fe(i,new nn(.118,.009,4,18),e,[l*3.818,.25,0]);h.rotation.y=Math.PI/2}for(let l=0;l<6;l++)rn(i,[-3.5,.25+Math.sin(l)*.245,Math.cos(l)*.245],[3.5,.25+Math.sin(l)*.245,Math.cos(l)*.245],.012,Oe.wood,5);for(let l=0;l<12;l++)Fe(i,di,Oe.kernel,[-3.45+l*.63,.013,-.66],[.3,.019,.11]);vn(i);let n=new qe;Fe(n,new li(1,0),We("#73776b",!0),[0,.31,0],[.61,.345,.48]);for(let l=0;l<3;l++)Fe(n,di,Oe.kernel,[-.48+l*.48,.014,-.76],[.25,.02,.1]);vn(n);let r=new qe,s=Su();s.name="bun-body",r.add(s);let a=Fe(r,new gn(.93,.24),new en({map:Mu("\u5E86\u4E30\u5305\u5B50"),side:Hl}),[0,.57,0]);a.name="bun-label",a.castShadow=!1;let o=Fe(r,new nn(.43,.016,5,26),new en({color:"#f6cd58"}),[0,-.28,0]);return o.rotation.x=Math.PI/2,o.castShadow=!1,{log:i,rock:n,bun:r}}function Mm(){let i=new qe,e=We("#a34232"),t=We("#e7bd64");for(let r of[-1,1])rn(i,[r*4.5,0,0],[r*4.5,4.7,0],.13,e,12),Fn(i,t,[r*4.5,4.78,0],[.18,.18,.18]);Fe(i,di,e,[0,4.22,0],[9.1,.78,.13]);let n=Fe(i,new gn(8.7,.68),new en({map:Mu("\u5341\u91CC\u5C71\u8DEF \xB7 \u7EC8\u70B9","#9d3c30","#fff2be",1024,128)}),[0,4.22,-.073]);n.rotation.y=Math.PI;for(let r=0;r<2;r++)for(let s=0;s<20;s++)Fe(i,di,(s+r)%2?Oe.white:Oe.seam,[-3.9+s*.41,.046,r*.4-.2],[.41,.035,.4]);return i.position.set(yt(5e3),Xn(5e3),5e3),i.rotation.y=Zr(5e3),i}async function Sm(i){let e=new Zs({canvas:i,antialias:!0,alpha:!1,powerPreference:"high-performance"});e.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),e.shadowMap.enabled=!0,e.shadowMap.type=kl,e.outputColorSpace=bt,e.toneMapping=Gl,e.toneMappingExposure=1.04;let t=new Ks;t.background=new Pe("#bfceac"),t.fog=new Js("#bfd0b1",.0125);let n=new wt(42,1,.1,320);t.add(new ca("#fff1cb","#466a49",2.2));let r=new ha("#ffe8b0",3.2);r.position.set(-8,13,6),r.castShadow=!0,r.shadow.mapSize.set(1024,1024),r.shadow.camera.left=-8,r.shadow.camera.right=8,r.shadow.camera.top=8,r.shadow.camera.bottom=-8,r.shadow.camera.near=.5,r.shadow.camera.far=42,r.shadow.normalBias=.035,r.shadow.bias=-25e-5,t.add(r,r.target);let s=await new oa().loadAsync(new URL("./assets/xi-reference.jpg",import.meta.url).href);s.colorSpace=bt,s.anisotropy=Math.min(4,e.capabilities.getMaxAnisotropy());let a=yu(s);t.add(a.root);let o=ym(),l=new Map,c=Mm();t.add(c),c.visible=!1;let h=new en({color:"#ffd365",transparent:!0,opacity:1}),d=Fe(t,new nn(.5,.025,5,32),h);d.visible=!1,d.castShadow=!1;let u=0;function p(k){d.position.set(yt(k.z)-k.x,Xn(k.z)+.75,k.z),d.scale.setScalar(1),u=.65,d.visible=!0}let m=Array.from({length:11},()=>{let k=xm();return t.add(k.root),k}),v=new qe;t.add(v);let g=ga(836);for(let k=0;k<27;k++){let Z=k/27*Math.PI*2,le=65+g()*42,he=20+g()*39,w=Fe(v,new si(1,1,5+Math.floor(g()*3)),We(k%3===0?"#62866a":k%3===1?"#789777":"#50765c",!0),[Math.cos(Z)*le,-17+he*.5,Math.sin(Z)*le],[15+g()*15,he,17+g()*19]);w.rotation.y=g()*5,w.castShadow=!1}let f=new hi({color:"#ebebcd",roughness:1,flatShading:!0});for(let k=0;k<12;k++){let Z=k/12*6.283,le=Fe(v,new li(1,1),f,[Math.cos(Z)*100,21+g()*20,Math.sin(Z)*100],[12+g()*8,1.6+g()*2,4+g()*3]);le.castShadow=!1}let x=[ec(),ec(),ec()];x.forEach(k=>t.add(k.root));let _=new ci(1,6,4),y=new Nn(_,Oe.kernel,110);y.castShadow=!0,y.visible=!1,t.add(y);let R=[],A=new ft,C=new E,F=new E,D=new E,z=1,V=1,B=!1,j="",W=!1,Y=0,J=!1;function ne(){z=i.clientWidth,V=i.clientHeight,B=z<701,e.setSize(z,V,!1),n.aspect=z/V,n.fov=B?54:44,n.updateProjectionMatrix()}ne();function ae(){J=!1,y.visible=!1,d.visible=!1,u=0,a.baskets.forEach(k=>k.basket.userData.grain.visible=!0);for(let k of l.values())k.root.removeFromParent();l.clear()}function ue(k){J=!0,Y=k.angle,y.visible=!0,a.root.updateMatrixWorld(!0),R.length=0;let Z=ga(Math.floor(k.distance*73)+18);a.baskets.forEach(le=>le.basket.userData.grain.visible=!1);for(let le=0;le<110;le++){let he=a.baskets[le%2].basket,w=he.getWorldPosition(new E);w.y+=.17,w.x+=(Z()-.5)*.5,w.z+=(Z()-.5)*.5,R.push({p:w,v:Fr((Z()-.5)*2.7-k.fallDirection*2.5,1.3+Z()*3.2,(Z()-.5)*3),spin:Z()*6,scale:.02+Z()*.019})}}function fe(k,Z,le,he,w=0){let M=k.distance,U=Xn(M),G=yt(M),T=Z==="ready"||Z==="loading",P=Z==="falling"||Z==="over",S=Z==="won",L=P&&k.fallCause==="obstacle",I=Math.floor(M/18)-3;for(let ie=0;ie<m.length;ie++){let re=I+ie,xe=m[(re%m.length+m.length)%m.length];xe.index!==re&&(xe.set(re*18),xe.index=re)}let $=Math.max(0,Math.floor(M/500)*500);x.forEach((ie,re)=>{let xe=$+re*500;ie.root.visible=xe<=5e3,xe!==ie.mark&&(ie.set(xe),ie.mark=xe)}),c.visible=5e3-M<140;let O=new Set;for(let ie=Math.max(0,k.courseCursor-6);ie<k.course.length;ie++){let re=k.course[ie];if(re.z>M+105)break;if(re.z<M-14||re.collected)continue;O.add(re.id);let xe=l.get(re.id);if(!xe){let Ce=o[re.type].clone(!0);t.add(Ce),xe={root:Ce,label:Ce.getObjectByName("bun-label"),body:Ce.getObjectByName("bun-body")},l.set(re.id,xe)}xe.root.position.set(yt(re.z)-re.x,Xn(re.z)+.07+(re.type==="bun"?.65+Math.sin(le*3+re.z)*.07:0),re.z),xe.root.rotation.y=Zr(re.z),xe.body&&(xe.body.rotation.y=le*.9)}for(let[ie,re]of l)O.has(ie)||(re.root.removeFromParent(),l.delete(ie));v.position.set(G,U,M);let K=T||S?Math.sin(le*1.4)*.025:k.angle;P&&(J||ue(k),K=Nr.lerp(Y,k.fallDirection*(L?.23:1.61),Math.min(w/1.05,1)));let te=k.time*5.3+k.distance*.36,Q=P?Math.max(0,k.jumpY-w*2)-.12*Math.min(w,1):k.jumpY;a.root.position.set(G-k.lateral-k.offset-(P?k.fallDirection*Math.min(w,.8)*.36:0),U+.08+Q+(T?Math.sin(le*2)*.01:P||k.jumpY>0?0:Math.abs(Math.sin(te))*.048),M+(L?Math.min(w,1)*.8:0)),a.root.rotation.y=Zr(M),a.lean.rotation.z=K,a.lean.rotation.x=L?Math.min(w/1.05,1)*1.47:P?Math.min(w,.6)*.14:k.jumpY>0?-.1:.025,a.head.rotation.y=T||S?.55:Math.sin(k.time*.65)*.07;let de=T?.035:Z==="playing"?.42:0;if(a.legs.forEach((ie,re)=>{ie.rotation.x=k.jumpY>.05&&!P?-.3+re*.13:Math.sin((T?le*5.3:te)+re*Math.PI)*de}),a.load.rotation.z=T?Math.sin(le*1.4+.6)*.025:-k.sway*.35,a.baskets.forEach(ie=>{ie.hanger.rotation.z=-K*.55-k.sway*(ie.side===1?1:.86),ie.hanger.rotation.x=Math.sin((T?le:k.time)*5.3+ie.side*.25)*(T?.018:.07)}),P&&Z==="falling"){for(let ie=0;ie<R.length;ie++){let re=R[ie];re.v.y-=7.8*he,re.p.addScaledVector(re.v,he);let xe=Yi(re.p.x-yt(re.p.z),re.p.z)+.05;re.p.y<xe&&(re.p.y=xe,re.v.y=Math.abs(re.v.y)*.28,re.v.x*=.85,re.v.z*=.85),A.position.copy(re.p),A.rotation.set(re.spin+w*6,re.spin,w*4),A.scale.set(re.scale,re.scale*1.8,re.scale),A.updateMatrix(),y.setMatrixAt(ie,A.matrix)}y.instanceMatrix.needsUpdate=!0,y.computeBoundingSphere()}let pe=1-Math.exp(-he*3.2);T?(F.set(G+(B?5:5.7),U+(B?3.2:3.8),M+(B?8.4:7.3)),C.set(G,U+1.16,M)):S?(F.set(G+5.7,U+4.2,M+7.8),C.set(G-k.lateral,U+1.2,M)):(F.set(G-k.lateral*.7+(B?.7:2.3),U+(B?4.4:4.6),M-(B?8.3:8.8)),C.set(G-k.lateral*.65,U+1.12+k.jumpY*.2,M+1.8)),["ready","won","over"].includes(j)&&Z==="playing"&&(W=!1),W?(n.position.lerp(F,pe),D.lerp(C,pe)):(n.position.copy(F),D.copy(C),W=!0),n.lookAt(D),n.setViewOffset(z,V,T&&!B?-z*.17:0,T&&B?V*.19:0,z,V);for(let ie of l.values())if(ie.label){let re=ie.root.getWorldQuaternion(new Nt);ie.label.quaternion.copy(re.invert().multiply(n.quaternion))}u>0&&(Z==="playing"&&(u-=he),d.quaternion.copy(n.quaternion),d.scale.setScalar(1+(1-u/.65)*2),h.opacity=Math.max(0,u/.65),d.visible=u>0),j!==Z&&(j=Z),r.position.set(G-8,U+13,M+6),r.target.position.set(G,U+1,M),r.target.updateMatrixWorld(),e.render(t,n)}return{render:fe,resize:ne,reset:ae,pickup:p,renderer:e,scene:t,camera:n,char:a}}var Fr,We,Oe,gm,vm,di,Fn,fa,qi,vu,wu=ir(()=>{gu();Kr();Fr=(i=0,e=0,t=0)=>new E(i,e,t);We=(i,e=!1)=>new hi({color:i,roughness:.92,flatShading:e}),Oe={skin:We("#ddb08a"),cheek:We("#d5a07b"),hair:We("#242626"),eye:We("#302e27"),mouth:We("#a56552"),white:We("#efe4ce"),cloth:We("#77816c"),seam:We("#5b6857"),shoe:We("#34372e"),wood:We("#98703a"),wicker:We("#ad7b3b"),weave:We("#d1a352"),rope:We("#dfc698"),wheat:We("#ddb34c"),kernel:We("#f3ce6e"),leaf:We("#d6a83b")},gm=new ci(1,20,14),vm=new ci(1,7,5),di=new Dn(1,1,1),Fn=(i,e,t,n)=>Fe(i,gm,e,t,n);fa=[[46,271,287],[55,221,335],[75,183,363],[105,153,397],[140,132,423],[175,125,428],[215,132,424],[252,137,423],[286,135,426],[325,140,423],[351,146,404],[385,156,395],[420,176,376],[451,204,346],[476,231,311],[489,253,285],[493,270,271]];qi=[-54,-34,-24,-16,-10,-6.2,-4.1,4.1,5.7,8.5,14,25,40,60],vu=[12,18,13,7.5,3.6,1.25,0,0,-2.9,-6.3,-10,-14,-12,-9]});Kr();function Lc(i,e=[]){let t=i.has("ArrowLeft")||i.has("KeyA"),n=i.has("ArrowRight")||i.has("KeyD"),r=i.has("ArrowUp")||i.has("KeyW"),s=new Set(e),a=Number(n)-Number(t),o=Math.max(-1,Math.min(1,(r?0:a)+Number(s.has("balance-right"))-Number(s.has("balance-left")))),l=Math.max(-1,Math.min(1,(r?a:0)+Number(s.has("move-right"))-Number(s.has("move-left"))));return{balance:o,move:l}}Aa();Kr();var Uc="score-v1",Dc=15e4,Nc=24e3;function Oc(i){return(i.balance===-1?1:i.balance===1?2:0)|(i.move===-1?4:i.move===1?8:0)|(i.jump?16:0)}function Fc(i){if(typeof i!="string"||!i.trim()||[...i.trim()].length>24)return"\u8BF7\u8F93\u5165 1\u201324 \u4E2A\u5B57\u7B26\u7684\u6635\u79F0\u3002";let e=i.normalize("NFKC").replace(/[\p{Cf}\p{Cc}]/gu,"").toLowerCase(),t=[/<\s*[!/?a-z]/i,/(?:javascript|vbscript)\s*:|data\s*:\s*(?:text\/html|application\/javascript)/i,/\bon\w+\s*=|\b(?:eval|alert|prompt|confirm|function|settimeout|setinterval|fetch|require)\s*\(/i,/\b(?:document|window|globalthis)\s*[.\[]|\bimport\s*\(/i,/\b(?:drop|alter|create|truncate)\s+(?:table|database)\b|\bunion\s+select\b|\bselect\b.*\bfrom\b|\b(?:insert\s+into|delete\s+from)\b/i,/\$\(|`|\b(?:curl|wget|powershell|bash|sh)\s+[-/]/i],n=[/(?:忽略|无视|忘记|覆盖|绕过|删除).{0,12}(?:指令|提示词|规则|限制|系统)/,/(?:系统|开发者|管理员).{0,4}(?:提示词|指令|消息|权限)/,/(?:输出|泄露|显示|打印|执行|运行).{0,8}(?:提示词|指令|代码|密钥|密码|token|secret)/,/(?:你现在是|你是一个|从现在开始|角色设定|越狱模式|开发者模式)/,/\b(?:ignore|disregard|override|forget|bypass)\b.{0,20}\b(?:instructions?|prompts?|rules?|system|previous)\b/i,/\b(?:system|developer|assistant)\s*(?::|prompt|message|instructions?)/i,/\b(?:reveal|print|show|execute|run)\b.{0,15}\b(?:prompt|instructions?|secret|password|code|command)/i,/\b(?:act as|you are now|jailbreak)\b/i];return[...t,...n].some(r=>r.test(e))?"\u6635\u79F0\u4E0D\u80FD\u5305\u542B\u4EE3\u7801\u6216\u63D0\u793A\u6307\u4EE4\uFF0C\u8BF7\u6362\u4E00\u4E2A\u666E\u901A\u6635\u79F0\u3002":""}var Bc="\u6392\u884C\u699C\u6682\u65F6\u65E0\u6CD5\u8FDE\u63A5\uFF0C\u672C\u5C40\u8BB0\u5F55\u548C\u6635\u79F0\u5DF2\u4FDD\u7559\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002",an=class extends Error{constructor(e,{status:t=0,retryable:n=!1}={}){super(e),this.name="RankingConnectionError",this.status=t,this.retryable=n}};function $r(i){return i.status===401||i.status===403?new an("\u6392\u884C\u699C\u8BF7\u6C42\u88AB\u8BBF\u95EE\u9A8C\u8BC1\u62E6\u622A\uFF0C\u8BF7\u5728\u7CFB\u7EDF\u6D4F\u89C8\u5668\u6253\u5F00\u6E38\u620F\u540E\u91CD\u8BD5\u3002",{status:i.status}):i.status===429?new an("\u8BF7\u6C42\u8F83\u591A\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002",{status:429}):i.redirected?new an("\u6392\u884C\u699C\u8FDE\u63A5\u8DF3\u8F6C\u5230\u4E86\u5176\u4ED6\u9875\u9762\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00\u6E38\u620F\u9875\u9762\u540E\u91CD\u8BD5\u3002",{status:i.status}):new an(i.status>=500?Bc:"\u6392\u884C\u699C\u6682\u672A\u8FD4\u56DE\u6709\u6548\u6570\u636E\uFF0C\u672C\u5C40\u8BB0\u5F55\u548C\u6635\u79F0\u5DF2\u4FDD\u7559\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002",{status:i.status,retryable:i.status>=500||i.ok})}async function zc(i,e={},{fetchImpl:t=globalThis.fetch,baseURL:n=import.meta.url,validate:r=()=>!0}={}){let s=new URL(i,n),a=(e.method||"GET").toUpperCase(),o=a==="GET"?2:1;for(let l=0;l<o;l++){let c=new AbortController,h=setTimeout(()=>c.abort(),2e4);try{let d=new Headers(e.headers);d.set("Accept","application/json");let u=await t(s,{...e,method:a,headers:d,credentials:"same-origin",cache:"no-store",signal:c.signal}),p=u.headers.get("content-type")||"";if(!/^application\/(?:[\w.-]+\+)?json(?:\s*;|$)/i.test(p))throw $r(u);let m;try{m=await u.json()}catch{throw $r(u)}if(!u.ok){let v=typeof m?.error=="string"&&m.error.length<=200&&!/<(?:!doctype|html|body)\b/i.test(m.error)?m.error:null;throw v?new an(v,{status:u.status,retryable:u.status>=500}):$r(u)}if(!m||typeof m!="object"||Array.isArray(m)||!r(m))throw $r(u);return m}catch(d){let u=d instanceof an?d:new an(d.name==="AbortError"?"\u6392\u884C\u699C\u8FDE\u63A5\u8D85\u65F6\uFF0C\u672C\u5C40\u8BB0\u5F55\u548C\u6635\u79F0\u5DF2\u4FDD\u7559\uFF0C\u8BF7\u91CD\u8BD5\u3002":Bc,{retryable:!0});if(l+1>=o||!u.retryable)throw u}finally{clearTimeout(h)}}}var Je=i=>document.getElementById(i),mi=null,Pa=!1,Ia=i=>i&&typeof i.name=="string"&&Number.isInteger(i.score)&&i.score>=0&&Number.isFinite(i.seconds)&&i.seconds>=0,La=(i,e={},t=()=>!0)=>zc(i,e,{validate:t});function kc(){let i={steps:0,commands:[],finished:!1,submitted:!1,submitting:!1,tooLong:!1};return i.ticket=La("/api/runs",{method:"POST"},e=>typeof e.id=="string"&&/^[a-f0-9-]{36}$/.test(e.id)&&typeof e.version=="string").catch(e=>({error:e.message})),mi=i,i}function Hc(i,e){let t=Oc(e);(!i.commands.length||i.commands.at(-1)[1]!==t)&&(i.commands.length<Nc?i.commands.push([i.steps,t]):i.tooLong=!0),i.steps++,i.steps>Dc&&(i.tooLong=!0)}function Gc(i){i.finished=!0,mi=i,Je("submit-score").disabled=!1,Je("submit-score").textContent="\u63D0\u4EA4\u6210\u7EE9",Je("submission-status").textContent="",Je("leaderboard-panel").open&&Qr()}async function Qr(){if(!Pa){Pa=!0,Je("refresh-ranking").disabled=!0,Je("ranking-status").textContent="\u6B63\u5728\u52A0\u8F7D\u6392\u884C\u699C\u2026";try{let{entries:i}=await La("/api/leaderboard",{},e=>Array.isArray(e.entries)&&e.entries.length<=50&&e.entries.every(t=>Ia(t)&&Number.isInteger(t.rank)&&t.rank>0&&Number.isInteger(t.distance)&&t.distance>=0));Je("ranking-rows").replaceChildren(...i.map(e=>{let t=document.createElement("tr");return[e.rank,e.name,e.score.toLocaleString("zh-CN"),`${e.distance.toLocaleString("zh-CN")} \u7C73`,`${Math.floor(e.seconds/60)}:${Math.floor(e.seconds%60).toString().padStart(2,"0")}`].forEach((r,s)=>{let a=document.createElement("td");if(s===1){let o=document.createElement("bdi");o.textContent=r,a.append(o)}else a.textContent=r;t.append(a)}),t})),Je("ranking-status").textContent=i.length?"\u540C\u540D\u4EC5\u663E\u793A\u6700\u9AD8\u5206 \xB7 \u540C\u5206\u7528\u65F6\u77ED\u8005\u4F18\u5148 \xB7 \u524D 50 \u540D":"\u8FD8\u6CA1\u6709\u6210\u7EE9\uFF0C\u6765\u62FF\u4E0B\u7B2C\u4E00\u4E2A\u540D\u6B21\u3002"}catch(i){Je("ranking-status").textContent=i.message}finally{Pa=!1,Je("refresh-ranking").disabled=!1}}}function Vc(){Je("leaderboard-panel").addEventListener("toggle",()=>{Je("leaderboard-panel").open&&Qr()}),Je("refresh-ranking").addEventListener("click",Qr),Je("score-submission").addEventListener("submit",async i=>{i.preventDefault();let e=mi,t=Je("player-name").value.trim();if(!e?.finished||e.submitting||e.submitted)return;let n=Fc(t);if(n){Je("submission-status").textContent=n;return}if(e.tooLong){Je("submission-status").textContent="\u672C\u5C40\u64CD\u4F5C\u8BB0\u5F55\u8FC7\u957F\uFF0C\u65E0\u6CD5\u63D0\u4EA4\u6392\u884C\u699C\uFF1B\u53EF\u4EE5\u7EE7\u7EED\u6E38\u73A9\u3002";return}e.submitting=!0,Je("submit-score").disabled=!0,Je("submission-status").textContent="\u6B63\u5728\u8BB0\u5F55\u672C\u5C40\u6210\u7EE9\u2026";try{let r=await e.ticket;if(r.error)throw new Error("\u672C\u5C40\u5F00\u59CB\u65F6\u672A\u80FD\u8FDE\u63A5\u6392\u884C\u699C\uFF0C\u65E0\u6CD5\u63D0\u4EA4\u672C\u5C40\u6210\u7EE9\u3002\u8BF7\u5728\u7F51\u7EDC\u6062\u590D\u540E\u91CD\u65B0\u6311\u6218\uFF1B\u82E5\u6301\u7EED\u5931\u8D25\uFF0C\u8BF7\u5728\u7CFB\u7EDF\u6D4F\u89C8\u5668\u6253\u5F00\u6E38\u620F\u3002");let s=await La("/api/leaderboard",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({runId:r.id,version:Uc,name:t,steps:e.steps,commands:e.commands})},a=>Ia(a.entry)&&Ia(a.best)&&Number.isInteger(a.rank)&&a.rank>0);e.submitted=!0,e===mi&&(Je("submission-status").textContent=`\u672C\u5C40 ${s.entry.score.toLocaleString("zh-CN")} \u5206\u5DF2\u8BB0\u5F55 \xB7 \u540C\u540D\u6700\u9AD8 ${s.best.score.toLocaleString("zh-CN")} \u5206 \xB7 \u5F53\u524D\u7B2C ${s.rank} \u540D`,Je("submit-score").textContent="\u672C\u5C40\u5DF2\u63D0\u4EA4",Je("leaderboard-panel").open?Qr():Je("leaderboard-panel").open=!0)}catch(r){e===mi&&(Je("submission-status").textContent=r.message||"\u63D0\u4EA4\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002")}finally{e.submitting=!1,e===mi&&(Je("submit-score").disabled=e.submitted)}})}var be=i=>document.getElementById(i),Be=Object.fromEntries(["game","intro","scene-caption","hud","pause","balance-ui","game-controls","pause-overlay","result-overlay","distance","score","balance-status","balance-deg","balance-meter","balance-needle","wind","left","right","move-left","move-right","jump","route-progress","hazard-hint"].map(i=>[i,be(i)])),yn,_e=Jr(),Ge="loading",Ki=performance.now(),Zi=0,Eu=0,Br=0,nc=0,ic=0,Tu=0,_a=!1,kr=new Set,$i=new Map,sc,xn=!1,ht,zr,Bn,rc=-1;function er(){kr.clear(),$i.clear(),_a=!1,Qi()}function Ru(){return Lc(kr,$i.values())}function Qi(){let i=Ru();Be.left.classList.toggle("pressed",i.balance===-1),Be.right.classList.toggle("pressed",i.balance===1),Be["move-left"].classList.toggle("pressed",i.move===-1),Be["move-right"].classList.toggle("pressed",i.move===1),Be.jump.classList.toggle("pressed",[...$i.values()].includes("jump"))}function ac(){Ge==="playing"&&(_a=!0)}function zn(i){Ge=i,Be.game.dataset.mode=Ge,yn?.resize();let e=["playing","falling","paused","over","won"].includes(Ge);Be.intro.hidden=Ge!=="ready"&&Ge!=="loading",Be["scene-caption"].hidden=e,Be.hud.hidden=!e,Be.pause.hidden=Ge!=="playing",Be["balance-ui"].hidden=!["playing","falling"].includes(Ge),Be["game-controls"].hidden=Ge!=="playing",Be["route-progress"].hidden=!e,Be["pause-overlay"].hidden=Ge!=="paused",Be["result-overlay"].hidden=!["over","won"].includes(Ge),Ge!=="playing"&&(Be["hazard-hint"].hidden=!0),Ge!=="playing"&&er(),Bn&&ht&&Bn.gain.setTargetAtTime(Ge==="playing"&&xn?.019:0,ht.currentTime,.2)}function va(i){clearTimeout(Tu),be("toast").textContent=i,be("toast").classList.add("visible"),Tu=setTimeout(()=>be("toast").classList.remove("visible"),2600)}function Ji(){yn&&(er(),_e=Jr(),sc=kc(),Zi=0,Br=0,rc=-1,ic=0,yn.reset(),zn("playing"),Ki=performance.now(),va("\u5DE6\u53F3\u6276\u6B63 \xB7 \u7A7A\u683C\u8DF3\u8DC3 \xB7 \u2191\uFF0B\u5DE6\u53F3\u952E\u79FB\u52A8"),oc())}function Cu(){Ge==="playing"&&(zn("paused"),be("resume").focus({preventScroll:!0}))}function Pu(){Ge==="paused"&&(er(),Zi=0,Ki=performance.now(),zn("playing"),Be.pause.focus({preventScroll:!0}))}function Au(i=!1){nc=Math.max(nc,_e.distance),be("final-distance").replaceChildren(document.createTextNode(Math.floor(_e.distance).toString()),Object.assign(document.createElement("small"),{textContent:"\u7C73"})),be("final-score").textContent=_e.score.toLocaleString("zh-CN"),be("best-line").textContent=`\u672C\u6B21\u6253\u5F00\u6E38\u620F\u7684\u6700\u4F73\u8DDD\u79BB\uFF1A${Math.floor(nc)} \u7C73`,be("result-kicker").textContent=i?"5,000 \u7C73 \xB7 \u5341\u91CC\u6311\u6218\u5B8C\u6210":_e.fallCause==="obstacle"?"\u811A\u4E0B\u6CA1\u8FC8\u8FC7\u53BB":"\u8FD9\u62C5\u9EA6\u5B50\uFF0C\u6709\u70B9\u6643",be("result-message").textContent=i?"\u4E24\u7B50\u9EA6\u5B50\u625B\u5230\u4E86\u7EC8\u70B9\u3002\u4F60\u8D62\u4E86\uFF01":_e.fallCause==="obstacle"?"\u63A5\u8FD1\u8DEF\u969C\u65F6\u6309\u7A7A\u683C\uFF0C\u7B49\u811A\u8D8A\u8FC7\u969C\u788D\u518D\u843D\u5730\uFF1B\u5C71\u77F3\u4E5F\u80FD\u6A2A\u5411\u7ED5\u5F00\u3002":_e.distance<30?"\u8F7B\u70B9\u3001\u677E\u5F00\uFF0C\u518D\u7EA0\u6B63\uFF1B\u4E00\u76F4\u6309\u4F1A\u5012\u5411\u53E6\u4E00\u8FB9\u3002":"\u5DE6\u53F3\u952E\u6276\u6B63\uFF1B\u6309\u4F4F \u2191 \u518D\u6309\u5DE6\u53F3\u952E\uFF0C\u624D\u662F\u6A2A\u5411\u79FB\u52A8\u3002",be("run-summary").textContent=`\u7528\u65F6 ${Math.floor(_e.time/60)} \u5206 ${Math.floor(_e.time%60)} \u79D2 \xB7 \u5403\u5230 ${_e.buns} \u4E2A\u5E86\u4E30\u5305\u5B50`;let e=_e.achievements,t=Cc(_e),n=Ta(_e);be("result-title").textContent=i?"\u5B9A\u4E8E\u4E00\u5C0A":n.find(s=>s.kind==="\u672C\u5C40\u8BC4\u4EF7")?.name||"\u6311\u6218\u7ED3\u675F",be("final-pickup-rate").textContent=e.bunsEncountered?`${(t.pickupRate*100).toFixed(1)}%`:"\u2014",be("final-bun-count").textContent=`\u62FE\u53D6 ${_e.buns} / \u7ECF\u8FC7 ${e.bunsEncountered} \u4E2A`,be("final-boost-ratio").textContent=`${(t.boostRatio*100).toFixed(1)}%`,be("final-boost-distance").textContent=`\u52A0\u901F\u8D70\u8FC7 ${Math.floor(e.boostedDistance).toLocaleString("zh-CN")} \u7C73`,be("final-max-angle").textContent=`${t.maxDegrees.toFixed(1)}\xB0`,be("final-bun-streak").textContent=`${t.bestBunStreak} \u4E2A`;let r=Xr(_e);be("score-breakdown").textContent=`\u8DEF\u7A0B ${r.distance.toLocaleString("zh-CN")} \uFF0B \u5305\u5B50 ${r.buns.toLocaleString("zh-CN")} \uFF0B \u6210\u5C31 ${r.achievements.toLocaleString("zh-CN")}`,be("achievement-count").textContent=`${n.length} \u9879`,be("achievement-list").replaceChildren(...n.map(s=>{let a=document.createElement("li");a.className="achievement-badge";let o=document.createElement("span");o.className="achievement-kind",o.textContent=s.kind+(s.points?` \xB7 +${s.points} \u5206`:"");let l=document.createElement("strong");l.textContent=s.name;let c=document.createElement("p");return c.textContent=s.rule,a.append(o,l,c),a})),Gc(sc),zn(i?"won":"over"),oc(),be("result-body").scrollTop=0,be("result-title").focus({preventScroll:!0})}function oc(){Be.distance.textContent=Math.floor(_e.distance).toString(),Be.score.textContent=_e.score.toLocaleString("zh-CN"),be("route-meter").value=_e.distance,be("li-progress").textContent=`${(_e.distance/500).toFixed(2)} / 10 \u91CC`,be("route-remaining").textContent=_e.won?"\u5DF2\u5230\u8FBE\u7EC8\u70B9":`\u8FD8\u5269 ${Math.ceil(5e3-_e.distance).toLocaleString("zh-CN")} \u7C73`,be("speed").textContent=`${_e.speed.toFixed(1)} \u7C73/\u79D2`,be("buns").textContent=String(_e.buns),be("boost").hidden=_e.boostRemaining<=0,be("boost").textContent=`\u52A0\u901F +${_e.boostLevel*20}% \xB7 ${Math.ceil(_e.boostRemaining)}\u79D2`,Be.jump.classList.toggle("airborne",_e.jumpY>.05),be("jump-label").textContent=_e.jumpY>.05?"\u817E\u7A7A\u4E2D":"\u7A7A\u683C";let i=Math.round(_e.angle*180/Math.PI),e=Math.abs(_e.angle);Be["balance-deg"].textContent=`${Math.abs(i)}\xB0`,Be["balance-needle"].style.left=`${50+Sn(_e.angle/Ra,-1,1)*47}%`,Be["balance-meter"].setAttribute("aria-valuenow",String(Sn(i,-55,55))),Be["balance-meter"].setAttribute("aria-valuetext",`${i<0?"\u5411\u5DE6":"\u5411\u53F3"}\u503E\u659C ${Math.abs(i)} \u5EA6`),Be["balance-ui"].classList.toggle("danger",e>.58),Be["balance-status"].textContent=e>.6?_e.angle>0?"\u5FEB\u5411\u5DE6\u6276\u6B63\uFF01 \u2190":"\u5FEB\u5411\u53F3\u6276\u6B63\uFF01 \u2192":e>.28?_e.angle>0?"\u5411\u53F3\u504F\u4E86\uFF0C\u8F7B\u6309 \u2190":"\u5411\u5DE6\u504F\u4E86\uFF0C\u8F7B\u6309 \u2192":"\u7A33\u4F4F\uFF0C\u6162\u6162\u8D70",Be.wind.textContent=Math.abs(_e.wind)<.19?"\u5FAE\u98CE":`${_e.wind>0?"\u5411\u53F3\u5439":"\u5411\u5DE6\u5439"}${Math.abs(_e.wind)>.58?" \xB7 \u5F3A\u98CE":" \xB7 \u5C71\u98CE"}`;let t=_e.course.slice(_e.courseCursor,_e.courseCursor+12).find(r=>r.type!=="bun"&&r.z>_e.distance-1&&r.z-_e.distance<23),n=t&&Math.abs(t.x-_e.lateral-_e.offset)<t.width/2+.3;if(Be["hazard-hint"].hidden=Ge!=="playing"||!t,t){let r=Math.max(0,Math.ceil(t.z-_e.distance));Be["hazard-hint"].textContent=`${t.type==="log"?"\u6A2A\u6728":"\u5C71\u77F3"} \xB7 ${r} \u7C73\u540E \xB7 ${n?"\u6309\u7A7A\u683C\u8DF3\u8FC7":"\u53EF\u6A2A\u5411\u7ED5\u884C"}`,Be["hazard-hint"].classList.toggle("urgent",n&&r<8),Be.jump.classList.toggle("urgent",Ge==="playing"&&n&&r<8&&_e.jumpY===0)}else Be.jump.classList.remove("urgent")}function bm(){if(ht){ht.resume().catch(()=>{});return}let i=window.AudioContext||window.webkitAudioContext;if(!i)return;ht=new i,zr=ht.createGain(),zr.gain.value=.42,zr.connect(ht.destination);let e=ht.createBuffer(1,ht.sampleRate*3,ht.sampleRate),t=e.getChannelData(0),n=0;for(let a=0;a<t.length;a++)n=(n+(Math.random()*2-1)*.04)/1.04,t[a]=n*3;let r=ht.createBufferSource();r.buffer=e,r.loop=!0;let s=ht.createBiquadFilter();s.type="lowpass",s.frequency.value=600,Bn=ht.createGain(),Bn.gain.value=0,r.connect(s),s.connect(Bn),Bn.connect(zr),r.start()}function _n(i,e=.06,t=.08){if(!ht||!xn||ht.state!=="running")return;let n=ht.createOscillator(),r=ht.createGain(),s=ht.currentTime;n.type="sine",n.frequency.setValueAtTime(i,s),n.frequency.exponentialRampToValueAtTime(Math.max(25,i*.5),s+e),r.gain.setValueAtTime(t,s),r.gain.exponentialRampToValueAtTime(.001,s+e),n.connect(r),r.connect(zr),n.start(s),n.stop(s+e)}function wm(){try{bm(),xn=!xn,be("sound").setAttribute("aria-pressed",String(xn)),be("sound").setAttribute("aria-label",xn?"\u5173\u95ED\u58F0\u97F3":"\u5F00\u542F\u58F0\u97F3"),Bn&&Bn.gain.setTargetAtTime(xn&&Ge==="playing"?.019:0,ht.currentTime,.2),xn&&_n(520,.1,.04)}catch{xn=!1}}function Iu(i){console.error(i),zn("error"),Be.intro.hidden=!0,be("error-panel").hidden=!1}be("start").addEventListener("click",Ji);be("restart").addEventListener("click",Ji);be("restart-paused").addEventListener("click",Ji);Be.pause.addEventListener("click",Cu);be("resume").addEventListener("click",Pu);be("sound").addEventListener("click",wm);for(let[i,e]of[["left","balance-left"],["right","balance-right"],["move-left","move-left"],["move-right","move-right"],["jump","jump"]]){let t=be(i);t.addEventListener("pointerdown",n=>{if(n.preventDefault(),Ge==="playing"){$i.set(n.pointerId,e),e==="jump"&&ac();try{t.setPointerCapture(n.pointerId)}catch{}Qi()}});for(let n of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(n,r=>{$i.delete(r.pointerId),Qi()});t.addEventListener("contextmenu",n=>n.preventDefault())}Be.jump.addEventListener("click",i=>{i.detail===0&&ac()});window.addEventListener("pointerup",i=>{$i.delete(i.pointerId),Qi()});window.addEventListener("keydown",i=>{if(!(i.target instanceof Element&&i.target.closest("input,textarea,form"))){if(["ArrowLeft","ArrowRight","ArrowUp","KeyA","KeyD","KeyW"].includes(i.code)){Ge==="playing"&&(i.preventDefault(),kr.add(i.code),Qi());return}if(i.code==="Space"){if(i.preventDefault(),i.repeat)return;["ready","over","won"].includes(Ge)?Ji():Ge==="playing"&&ac()}["Escape","KeyP"].includes(i.code)&&!i.repeat&&(i.preventDefault(),Ge==="playing"?Cu():Ge==="paused"&&Pu()),i.code==="Enter"&&!i.repeat&&["ready","over","won"].includes(Ge)&&(i.preventDefault(),Ji()),i.code==="KeyR"&&!i.repeat&&["playing","over","paused","won"].includes(Ge)&&Ji()}});window.addEventListener("keyup",i=>{kr.has(i.code)&&(kr.delete(i.code),Qi())});window.addEventListener("blur",er);document.addEventListener("visibilitychange",()=>{document.hidden&&er(),Ki=performance.now(),Zi=0});window.addEventListener("resize",()=>yn?.resize());be("world").addEventListener("webglcontextlost",i=>{i.preventDefault(),er(),zn("error"),be("error-text").textContent="3D \u753B\u9762\u6682\u65F6\u4E2D\u65AD\u4E86\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6E38\u620F\u3002",be("error-panel").hidden=!1});function Lu(i){let e=Math.min(Math.max((i-Ki)/1e3,0),.075);if(Ki=i,Eu+=e,Ge==="playing"){for(Zi+=e;Zi>=rr;){let r={...Ru(),jump:_a};Hc(sc,r),Ca(_e,r),_a=!1,Zi-=rr;for(let s of _e.events)if(s.type==="bun"&&(yn.pickup(s),va(`\u5E86\u4E30\u5305\u5B50 +1 \xB7 \u52A0\u901F ${s.level*20}%\uFF01`),_n(700,.15,.1)),s.type==="jump"&&_n(250,.12,.06),s.type==="land"&&_n(72,.08,.07),s.type==="achievement"&&!_e.fallen&&!_e.won){let a=Ea.find(o=>o.id===s.id);va(`\u6210\u5C31\u8FBE\u6210 \xB7 ${a.name}`),_n(940,.24,.12)}if(_e.fallen){zn("falling"),Br=0,_n(90,.28,.25),be("toast").classList.remove("visible");break}if(_e.won){Au(!0),_n(880,.4,.14),be("toast").classList.remove("visible");break}}let t=Math.floor((_e.time*5.3+_e.distance*.36)/Math.PI);t!==rc&&(rc=t,_e.jumpY===0&&Ge==="playing"&&_n(85+t%2*15,.045,.06));let n=Math.floor(_e.distance/500);n>ic&&Ge==="playing"&&(ic=n,va(`\u8D70\u8FC7 ${n} \u91CC \xB7 \u8FD8\u5269 ${10-n} \u91CC\uFF01`),_n(620,.14,.09)),oc()}else Ge==="falling"&&(Br+=e,Br>2.1&&Au());if(yn)try{yn.render(_e,Ge,Eu,e,Br)}catch(t){Iu(t);return}requestAnimationFrame(Lu)}try{Vc();let{makeWorld:i}=await Promise.resolve().then(()=>(wu(),bu));yn=await i(be("world")),zn("ready"),yn.render(_e,Ge,0,1/60),be("start-label").textContent="\u6311\u8D77\u9EA6\u5B50\uFF0C\u51FA\u53D1",be("start").disabled=!1,Ki=performance.now(),requestAnimationFrame(Lu)}catch(i){Iu(i)}
