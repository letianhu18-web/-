import {freshSupport} from './support.mjs';
import {freshCosts} from './operating-costs.mjs';
import {freshTown,storyCustomers} from './town-data.mjs';
import {freshCraft} from './craft-data.mjs';
import {freshGrowth} from './growth-data.mjs';
import {freshWardrobe} from './wardrobe-data.mjs';
export const VERSION='0.7.6', SAVE_KEY='naiwa.teashop.v1';
export const ingredients=Object.fromEntries([
 ['tea','茶底','🫖','base',.4],['milk','牛奶','🥛','base',.4],
 ['pearl','珍珠','⚫','topping',.4],['coconut','椰果','🥥','topping',.4],['pudding','布丁','🍮','topping',.4],['redBean','红豆','🫘','topping',.4],['taro','芋泥','🟣','topping',.4],['cream','奶盖','☁️','topping',.4],['strawberryJam','草莓酱','🍓','base',.4],['strawberry','草莓粒','🍓','topping',.4],['seal','封口','▣','seal',.45]
].map(([id,name,icon,category,duration])=>[id,{name,short:name,icon,category,duration,hint:`加入${name}～`} ]));
export const drinkRecipes=Object.fromEntries([
 ['originalMilkTea','原味奶茶',20,1,1,['tea','milk']],['pearlMilkTea','珍珠奶茶',28,1,1,['tea','milk','pearl']],['coconutMilkTea','椰果奶茶',28,2,2,['tea','milk','coconut']],['puddingMilkTea','布丁奶茶',32,2,3,['tea','milk','pudding']],['redBeanMilkTea','红豆奶茶',32,2,4,['tea','milk','redBean']],['taroMilkTea','芋泥奶茶',38,3,5,['tea','milk','taro']],['creamMilkTea','奶盖奶茶',40,3,7,['tea','milk','cream']],['strawberryMilkTea','草莓奶茶',45,3,9,['tea','milk','strawberryJam','strawberry']]
].map(([id,name,price,difficulty,day,parts])=>[id,{name,price,difficulty,day,ingredients:parts}]));
export const sugars={30:'三分糖',70:'七分糖',100:'全糖'}, ices={0:'去冰',1:'少冰',2:'正常冰'};
export const customers={...storyCustomers,
 connoisseur:{name:'茶艺鉴赏家',patience:40,weight:5,store:5,tipMultiplier:1.3,tipChance:.65,preferences:['creamMilkTea','taroMilkTea'],icon:'🎖️'},
 student:{name:'学生奶蛙',patience:30,weight:35,tipMultiplier:1,tipChance:.28,preferences:['pearlMilkTea','coconutMilkTea'],icon:'🎒'},
 child:{name:'小朋友',patience:35,weight:20,tipMultiplier:1,tipChance:.28,preferences:['puddingMilkTea','strawberryMilkTea'],sugar:100,icon:'🎈'},
 officeWorker:{name:'上班族',patience:24,weight:20,tipMultiplier:1.2,tipChance:.5,preferences:[],sugar:70,ice:1,icon:'👔'},
 relaxed:{name:'悠闲顾客',patience:45,weight:15,tipMultiplier:1,tipChance:.28,preferences:[],icon:'🌿'},
 picky:{name:'挑剔顾客',patience:30,weight:7,tipMultiplier:1,tipChance:.28,preferences:[],day:5,icon:'👓'},
 lucky:{name:'幸运顾客',patience:30,weight:3,tipMultiplier:1,tipChance:.28,preferences:[],icon:'🌟'}
};
export const dayGoal=day=>day===1?5:day<5?6:day<10?7:day<15?8:9;
export const SHAKE={distanceInWidths:2.65,minDuration:.8,minTurns:3};
export const newDrink=()=>({costBill:{},tea:0,milk:0,strawberryJam:0,sugar:null,ice:0,iceUnits:0,manualIce:false,pendingIngredients:[],toppings:[],sealed:false,shakeScore:0,shakeTime:0,shakeTurns:0,finished:false});
export const actualIngredients=d=>Object.keys(ingredients).filter(k=>ingredients[k].category==='base'?Boolean(d[k]):ingredients[k].category==='topping'&&d.toppings.includes(k));
export const nextIngredient=d=>!d.tea?'tea':!d.milk?'milk':!d.toppings.includes('pearl')?'pearl':!d.sealed?'seal':null;
export const recipeText=id=>drinkRecipes[id].ingredients.map(k=>ingredients[k].name).join(' + ');
export const freshSave=()=>({...freshGrowth(),...freshCraft(),support:freshSupport(),operatingCosts:freshCosts(),wardrobe:freshWardrobe(),journal:{wish:null,day:0,counts:{},orderIds:[]},authorFeedbackDay:0,authorFeedbackDate:'',presentationVersion:5,recipeRevision:2,...freshTown(),version:4,day:1,cookies:0,highestCombo:0,totalCustomers:0,tutorialComplete:false,streak:0,unlocked:['originalMilkTea','pearlMilkTea'],seenUnlocks:['originalMilkTea','pearlMilkTea'],recentOrders:[],stats:{days:0,cups:0,fiveStars:0,income:0,recipes:{},favoriteRecipe:null},settings:{sound:true,vibration:true,authorFeedbackDisabled:false},active:null});
