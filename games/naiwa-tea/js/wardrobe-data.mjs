// Cookie prices belong to the teashop economy; acquisition rules from the
// source wardrobe are deliberately not imported into this game.
export const wardrobeTargets=Object.freeze([
 ['staff','奶蛙店员'],['student','学生奶蛙'],['child','小朋友'],['officeWorker','上班族'],['relaxed','悠闲顾客'],['picky','挑剔顾客'],['lucky','幸运顾客'],['granny','奶奶'],['adeng','阿灯'],['painter','画画小客人'],['connoisseur','茶艺鉴赏家']
].map(([id,name])=>Object.freeze({id,name})));
const ordinary=[
 ['cream_bakery','奶油烘焙服',4800,'奶油色围裙、肩带和奶茶格纹短裤。','apron','#f2dfba'],
 ['caramel_overalls','焦糖背带短裤',5200,'焦糖背带、黄铜扣与翻边短裤。','overalls','#c98552'],
 ['mint_sport','薄荷运动套',5600,'薄荷上衣、侧条运动裤和清爽滚边。','sport','#a8d8c4'],
 ['berry_baseball','莓莓棒球衫',6400,'莓果色球衣、奶白袖口和棒球七分裤。','baseball','#d88985'],
 ['cloud_pajamas','云朵睡衣',7200,'云朵纹睡衣与柔软束口长裤。','pajamas','#d8e8df'],
 ['forest_ranger','森林巡游服',8800,'短披肩、交叉肩带与双侧工具袋。','ranger','#7c9766'],
 ['salt_sailor','海盐水手裙',9800,'方形水手领、红领结与细褶裙摆。','sailor','#467f9e'],
 ['sunset_street','落日街头套',10800,'落日橙连帽上衣、抽绳和深靛织带裤。','street','#e0985b'],
 ['steam_detective','蒸汽侦探装',11800,'咖啡色长外套、双排扣和怀表链。','detective','#886d54'],
 ['star_dress','星糖小礼服',12800,'星糖滚边礼服与灯笼短裤。','dress','#e5c985'],
 ['rose_garden','蔷薇花园裙',13800,'花瓣双层裙摆、交叉束腰与蔷薇胸针。','rose','#c97991'],
 ['midnight_maid','夜糖女仆裙',14800,'墨黑伞裙、奶油白围裙和波浪蕾丝。','maid','#303344'],
 ['snow_velvet','雪绒冬日装',15800,'雾紫大衣、绒毛翻领和雪花缝线。','winter','#a9a3cc'],
 ['porcelain_tea','青瓷茶师服',16800,'青瓷斜襟、立体盘扣和两侧袍片。','tea','#69a8a0']
].map(([id,name,price,description,style,color])=>Object.freeze({id,name,price,description,style,color,collectible:false}));
export const outfitCatalog=Object.freeze([...ordinary,
 Object.freeze({id:'star_river_couture',name:'典藏 · 星河巡礼',price:49888,description:'星河礼衣与分层披帛。',color:'#18233f',collectible:true}),
 Object.freeze({id:'birthday_crown_cape',name:'生日典藏 · 鎏金礼服',price:49888,description:'奶油白金绣礼服与孔雀蓝披风。',color:'#155457',collectible:true})
]);
export const outfitById=Object.freeze(Object.fromEntries(outfitCatalog.map(item=>[item.id,item])));
export const freshWardrobe=()=>({version:1,owned:[],assignments:Object.fromEntries(wardrobeTargets.map(({id})=>[id,null]))});
export function normalizeWardrobe(raw){
 const result=freshWardrobe();
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return result;
 result.owned=[...new Set((Array.isArray(raw.owned)?raw.owned:[]).filter(id=>typeof id==='string'&&Object.hasOwn(outfitById,id)))];
 for(const {id}of wardrobeTargets){const selected=raw.assignments?.[id];if(result.owned.includes(selected))result.assignments[id]=selected;}
 return result;
}
export function outfitFor(data,role){
 const w=data?.wardrobe,id=w?.assignments?.[role];
 return w?.owned?.includes(id)&&Object.hasOwn(outfitById,id)?id:'identity_'+role;
}
