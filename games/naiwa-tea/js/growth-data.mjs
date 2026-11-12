// Shared, data-driven progression. No economic multipliers on drink prices.
export const storeLevels={
 1:{name:'路边奶茶摊',cost:0,day:1,capacity:2,flow:[5,6],slots:3,unlocks:['基础操作设备','柜台与门口装饰']},
 2:{name:'奶蛙奶茶车',cost:800,day:3,capacity:3,flow:[6,8],slots:6,unlocks:['3 位顾客同时在店','完整奶茶车与灯饰','更多家具位置']},
 3:{name:'奶蛙小茶铺',cost:2500,day:7,capacity:4,flow:[8,10],slots:10,unlocks:['室内茶铺与窗户','桌椅、墙面与吊灯','设备可升级至 LV3']},
 4:{name:'奶蛙主题奶茶店',cost:8000,day:15,capacity:5,flow:[9,12],slots:13,unlocks:['正式座位区','顾客偶尔坐下喝茶','更宽的店面']},
 5:{name:'奶蛙旗舰店',cost:20000,day:25,capacity:6,flow:[10,14],slots:16,unlocks:['高挑空间与大玻璃窗','茶艺鉴赏家与限定订单','旗舰装饰']}
};
export const equipmentCatalog={
 tea:{name:'茶桶',icon:'🫖',prices:[0,300,1000],labels:['旧茶桶','刻度茶桶','奶蛙保温桶'],feel:['轻轻倒茶','更顺畅地倒茶','利落收流，清脆提示'],times:[.5,.45,.36]},
 milk:{name:'奶桶',icon:'🥛',prices:[0,300,1000],labels:['基础奶桶','冷藏奶桶','奶蛙鲜奶桶'],feel:['慢慢加奶','出奶更流畅','细腻顺滑的奶流'],times:[.5,.45,.36]},
 pearl:{name:'珍珠锅',icon:'⚫',prices:[0,350,1200],labels:['普通珍珠锅','大容量珍珠锅','恒温珍珠锅'],feel:['颗颗落入杯底','更饱满的珍珠','轻点即落，恒温保鲜'],times:[.5,.4,.3]},
 iceMachine:{name:'冰块机',icon:'🧊',prices:[0,350,1200],labels:['基础冰箱','快速冰块机','晶透制冰机'],feel:['冰块轻轻落下','落冰更利落','晶莹冰块与清脆反馈'],times:[.45,.32,.22]},
 toppings:{name:'配料柜',icon:'🫙',prices:[0,400,1400],labels:['简单配料盒','透明配料柜','快捷配料柜'],feel:['分类寻找配料','切换更轻快','常用三种配料固定在基础栏'],times:[.45,.36,.28]},
 sealer:{name:'封口机',icon:'▣',prices:[0,400,1400],labels:['基础封口机','快速封口机','奶蛙自动封口机'],feel:['普通封口','快速封口','极速封口，偶有完美封口'],times:[.8,.55,.35]}
};
export const furnitureCatalog=Object.fromEntries([
 ['grannyCoaster','手织杯垫',0,'decoration','counter',0,1,'奶奶织的小杯垫，接住一杯暖暖的茶。',null,'story:granny:3'],
 ['warmLamp','暖光小灯',0,'decoration','counter',0,1,'阿灯送来的小灯，点一下可以开关。','lamp','story:adeng:3'],
 ['townPostcard','奶茶铺明信片',0,'wall','wall',0,3,'小客人画下的小店，点开可以看赠言。',null,'story:painter:3'],
 ['handDrawnMenu','手绘菜单',0,'wall','wall',0,3,'三张有来历的配方，画在同一张菜单上。',null,'achievement:threeVariants'],
 ['woodTable','木桌',350,'furniture','floor',8,3,'一张结实的小木桌。'],
 ['chair','舒服小椅子',280,'furniture','floor',5,3,'坐一会儿吧。耐心小幅提升。','patience'],
 ['doubleTable','双人桌',680,'furniture','floor',12,3,'把两杯好心情放在一起。'],
 ['smallPlant','小盆栽',100,'decoration','counter',3,1,'一盆看起来很好养的小植物。','plant'],
 ['largePlant','大盆栽',260,'decoration','floor',8,2,'一角绿意，陪小店慢慢长大。','plant'],
 ['rug','地毯',220,'furniture','rug',5,2,'脚下多一点柔软。'],
 ['menuBoard','菜单黑板',240,'decoration','door',4,1,'把今日好茶写得清清楚楚。小费概率 +2%。','tip'],
 ['mural','奶蛙壁画',650,'wall','wall',10,3,'墙上的奶蛙也在认真营业。'],
 ['lamp','小挂灯',300,'decoration','ceiling',6,3,'点一下，灯光就暖起来。','lamp'],
 ['stringLights','纸灯串',450,'decoration','ceiling',8,2,'把小小的夜晚串成光。','lamp'],
 ['bin','垃圾桶',120,'furniture','door',2,1,'收好杂物，小店干干净净。'],
 ['doll','奶蛙玩偶',180,'decoration','counter',5,1,'抱一下，小朋友也会喜欢。','child'],
 ['vase','桌面花瓶',140,'decoration','counter',4,1,'今天的花，也很好看。'],
 ['welcome','门口欢迎牌',200,'decoration','door',4,2,'欢迎光临，今天也要开心。'],
 ['frogSign','奶蛙店招',600,'sign','sign',8,2,'一眼就能认出奶蛙的小店。','traffic'],
 ['goldTrophy','奶蛙金色小奖杯',0,'decoration','counter',10,1,'累计制作 100 杯的纪念。',null,'cups100'],
 ['flagshipStatue','旗舰奶蛙雕像',1800,'decoration','floor',15,5,'一路经营到这里，值得纪念。']
].map(([id,name,price,category,zone,comfort,level,description,effect=null,reward=null])=>[id,{name,price,category,zone,comfort,level,description,effect,reward}]));
export const finishes={
 wall:{white:{name:'默认白墙',price:0,color:'#faf6eb'},cream:{name:'奶油色墙',price:500,color:'#f4dab3'},wood:{name:'浅木纹墙',price:900,color:'#d6b38d'}},
 floor:{default:{name:'默认地面',price:0,color:'#d4ded3'},wood:{name:'浅木地板',price:500,color:'#bc936d'},tile:{name:'奶油瓷砖',price:800,color:'#efe3cc'}},
 sign:{wood:{name:'简单木牌',price:0,color:'#977450'},round:{name:'奶蛙圆牌',price:600,color:'#3e9e84'},neon:{name:'霓虹奶茶牌',price:1200,color:'#7864b7'},luxury:{name:'豪华奶蛙招牌',price:2200,color:'#be943e'}}
};
// These slots exclude the frog, both main machines, order strip and customer passage.
export const decorSlots=[
 {id:'counterL',zone:'counter',level:1,pos:[-1.65,1.48,.45],label:'柜台左'},
 {id:'counterR',zone:'counter',level:1,pos:[.35,1.48,.45],label:'柜台右'},
 {id:'doorL',zone:'door',level:1,pos:[-3.1,0,.9],label:'门口左'},
 {id:'doorR',zone:'door',level:2,pos:[3.25,0,-1.3],label:'门口右'},
 {id:'rug',zone:'rug',level:2,pos:[-.9,.012,2.8],label:'地毯区'},
 {id:'ceilingL',zone:'ceiling',level:2,pos:[-2.2,3.5,-.9],label:'灯饰左'},
 {id:'floorL',zone:'floor',level:2,pos:[-2.6,0,2.6],label:'地面左'},
 {id:'floorM',zone:'floor',level:3,pos:[-1.15,0,3.1],label:'地面中'},
 {id:'wallL',zone:'wall',level:3,pos:[-2.45,2.8,-2],label:'墙面左'},
 {id:'wallR',zone:'wall',level:3,pos:[2.55,2.8,-2],label:'墙面右'},
 {id:'ceilingR',zone:'ceiling',level:4,pos:[1.65,3.5,-1.15],label:'灯饰右'},
 {id:'floorR',zone:'floor',level:4,pos:[.35,0,3.1],label:'地面右'},
 {id:'counterBack',zone:'counter',level:4,pos:[-.2,1.5,-1.6],label:'后柜'},
 {id:'wallHigh',zone:'wall',level:5,pos:[0,4.5,-2],label:'高墙'},
 {id:'floorWide',zone:'floor',level:5,pos:[-3.7,0,-.7],label:'地面外侧'},
 {id:'sign',zone:'sign',level:2,pos:[0,3.12,-1.7],label:'店招位'}
];
export const milestones=[{id:'income1000',kind:'income',target:1000,reward:250,name:'第一桶饼干'},{id:'income5000',kind:'income',target:5000,reward:500,name:'小店有起色'},{id:'income10000',kind:'income',target:10000,reward:800,name:'生意越来越好'},{id:'income30000',kind:'income',target:30000,reward:1500,name:'大家都认识奶蛙啦'},{id:'cups100',kind:'cups',target:100,reward:0,furniture:'goldTrophy',name:'一百杯好心情'}];
export const freshGrowth=()=>({storeLevel:1,equipmentData:Object.fromEntries(Object.keys(equipmentCatalog).map(k=>[k,1])),ownedFurniture:{},placedFurniture:[],nextFurnitureId:1,ownedFinishes:{wall:['white'],floor:['default'],sign:['wood']},wallpaper:'white',floor:'default',sign:'wood',comfort:0,dailyGoal:null,milestones:[],storeReactions:0,seenCustomers:[],goalPin:null});
export function furnitureEffects(data){let comfort=0,plant=0,patience=0,tip=0,child=0,traffic=0;for(const p of data.placedFurniture||[]){const f=furnitureCatalog[p.id];if(!f)continue;comfort+=f.comfort;const e=f.effect;if(e==='plant')plant+=.01;if(e==='patience')patience+=.02;if(e==='tip')tip+=.02;if(e==='child')child+=.03;if(e==='traffic')traffic+=.08;}return {comfort,luck:Math.min(.03,plant),patience:Math.min(.02,patience)+(comfort>100?.05:comfort>50?.04:comfort>20?.02:0),tip:Math.min(.02,tip),child:Math.min(.06,child),traffic:Math.min(.12,traffic+(data.sign!=='wood'?.05:0))};}
export function businessGoal(data){if((data.storeLevel||1)===1)return data.day===1?5:6;const r=storeLevels[data.storeLevel||1],progress=Math.floor(Math.max(0,data.day-r.day)/3);return Math.min(r.flow[1],r.flow[0]+progress+(data.day===2&&data.storeLevel===1?1:0));}
export function equipmentDuration(data,type){const key=type==='seal'?'sealer':type==='ice'?'iceMachine':['tea','milk','pearl'].includes(type)?type:'toppings';return equipmentCatalog[key].times[(data.equipmentData?.[key]||1)-1];}
