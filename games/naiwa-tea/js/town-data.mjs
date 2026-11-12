export const storyCustomers={
 granny:{name:'奶蛙奶奶',patience:45,weight:0,story:true,tipMultiplier:1,tipChance:.28,preferences:['redBeanMilkTea'],icon:'🧣'},
 adeng:{name:'晚班店员阿灯',patience:40,weight:0,story:true,tipMultiplier:1,tipChance:.28,preferences:['originalMilkTea'],icon:'🕯️'},
 painter:{name:'画画的小客人',patience:40,weight:0,story:true,tipMultiplier:1,tipChance:.28,preferences:['strawberryMilkTea'],icon:'🎨'}
};
export const variants={
 afternoonRedBean:{name:'午后红豆',recipe:'redBeanMilkTea',sugar:30,ice:0,customer:'granny'},
 afterWork:{name:'收工小憩',recipe:'originalMilkTea',sugar:30,ice:1,customer:'adeng'},
 berryMood:{name:'莓好心情',recipe:'strawberryMilkTea',sugar:100,ice:1,customer:'painter'}
};
export const storyLines={
 granny:{title:'留一张杯垫',recipe:'redBeanMilkTea',variant:'afternoonRedBean',furniture:'grannyCoaster',impression:'她裹着软围巾，闻着茶香走了过来。',preference:'喜欢清甜的红豆奶茶，不放冰也很好。',bio:'奶奶常沿着小镇慢慢散步。她把针线装在布包里，路过熟悉的店，总愿意留一点心意。',nodes:[
  {sugar:70,ice:1,hello:'路过闻到香味啦。来杯红豆奶茶，七分糖、少冰。',reply:'原来这儿也能坐一会儿呀。'},
  {sugar:30,ice:0,hello:'今天想清甜一点：还是红豆，三分糖，不放冰。',reply:'以后就照这个做吧，叫它“午后红豆”怎么样？'},
  {sugar:30,ice:0,hello:'奶蛙，还是那杯午后红豆。红豆、三分糖、去冰。',reply:'这是我织的小杯垫，放在店里吧。'}]},
 adeng:{title:'收工后的灯',recipe:'originalMilkTea',variant:'afterWork',furniture:'warmLamp',impression:'围裙还没解开，他刚结束晚班。',preference:'喜欢原味、三分糖、少冰，清甜一点。',bio:'阿灯在街角上晚班。收工时看到还亮着的小店，便觉得忙碌的一天也有个柔软的结尾。',nodes:[
  {sugar:70,ice:2,hello:'刚收工，来杯原味，七分糖、正常冰。',reply:'今天终于能慢慢喝一杯了。'},
  {sugar:30,ice:1,hello:'换个清甜点的吧：原味、三分糖、少冰。',reply:'这杯就叫“收工小憩”，下次我还点它。'},
  {sugar:30,ice:1,hello:'今天轮到我提早收工。来杯收工小憩：原味、三分糖、少冰。',reply:'这盏小灯送给店里，亮着的时候感觉挺安心。'}]},
 painter:{title:'画进明信片',recipe:'strawberryMilkTea',variant:'berryMood',furniture:'townPostcard',impression:'贝雷帽下是一双认真观察小店的眼睛。',preference:'喜欢全糖、少冰的草莓奶茶。',bio:'画画的小客人随身带着纸笔。小小的招牌、杯里的草莓、忙碌的奶蛙，都是值得留下的风景。',nodes:[
  {sugar:70,ice:1,hello:'我来画你的小店。要草莓奶茶，七分糖、少冰。',reply:'杯子里的草莓也画进去。'},
  {sugar:100,ice:1,hello:'今天画好了！庆祝一下，草莓奶茶、全糖、少冰。',reply:'粉粉的这杯，叫“莓好心情”吧。'},
  {sugar:100,ice:1,hello:'我带了画好的明信片，还是莓好心情：草莓、全糖、少冰。',reply:'不是大店才值得被画下来，你这家也很好看。'}]}
};
export const customerNotes={student:['书包里装着课本，也装着今天的小期待。','常点珍珠或椰果。'],child:['踮起脚尖，看杯子里的小料。','喜欢甜甜的布丁和草莓。'],officeWorker:['提着小包，趁休息来喝一杯。','常点七分糖、少冰。'],relaxed:['慢悠悠地等茶香飘过来。','喜欢慢慢享用，不着急。'],picky:['看一眼订单，再认真尝一口。','口味要准确，摇得均匀更好。'],lucky:['小星星配饰在门口闪了一下。','喜欢偶尔来点小惊喜。'],connoisseur:['端起茶杯前，先闻一闻茶香。','偏爱奶盖与芋泥。']};
export const achievementCatalog=[
 {id:'handmadeFirst',name:'手作第一杯',description:'首次亲手放出满分少冰，并正确交付',reward:0},
 {id:'handmade10',name:'越做越顺手',description:'累计 10 杯手动冰量满分且正确交付',reward:40},
 {id:'friends6',name:'小店有朋友',description:'累计遇见 6 种顾客',reward:50},
 {id:'oneStory',name:'一段故事落幕',description:'完成任意一位熟客的故事；纪念物只发一份',reward:0},
 {id:'threeVariants',name:'老样子，我记得',description:'学会 3 张熟客配方，获得手绘菜单',furniture:'handDrawnMenu'},
 {id:'events3',name:'窗外也有故事',description:'实际经历 3 类轻量事件',reward:0}
];
export const freshProgress=()=>({met:false,visits:0,goodServes:0,storyNode:0,lastStoryDay:0,lastVisitDay:0,heardNodes:[],failed:false,legacySeen:false});
export const freshTown=()=>({customerProgress:{},collections:{unlockedVariants:[],seenEventIds:[],readEntryIds:[],eventMessages:[]},dayPlan:null,storyMissDays:0,storyDialogue:null});
export const events={school:{name:'放学高峰',text:'放学了，门口热闹起来。',count:2},rain:{name:'雨声营业',text:'小雨落下，来店里歇一会儿吧。',count:2},friend:{name:'熟客带朋友',text:'“这就是我常来的小店，来尝一杯吧。”',count:1},postcard:{name:'明信片到店',text:'打烊后，门口多了一张小镇留言。',count:0}};
export const townMessages=['路过的时候闻到了茶香。明天也想来看看。——街角的邻居','今天的雨下得很轻，小店的灯看起来很暖。——路过的小客人','不用很大的招牌，我也记得这里有一杯好茶。——小镇来信'];
