export type Emotion='好奇心'|'疑问'|'兴趣'|'闹别扭'|'平常';
export type Spot={id:string;name:string;lat:number;lon:number;image:string;description:string;lines:Record<Emotion,string>; shared?:boolean};
export type ExternalLink={spot_id:string;site_name:string;url:string;description:string};
export type Route={id:string;name:string;description:string;spotIds:string[]};
export const routes:Route[]=[{id:'motoise-myth',name:'元伊势神话巡游路线',description:'这条路线从元伊势内宫前往天岩户神社，带您领略历史与自然。',spotIds:['M01','M02','M03','M04','M05','M06']}];
export const route=routes[0];
export const spots:Spot[]=[
{id:'M01',name:'麻吕子杉',lat:35.427187218221526,lon:135.15280315472265,image:'/images/spots/marukosugi.jpg',shared:true,description:"这棵麻吕子杉位于元伊势内宫皇大神社的参道旁。\n\n据说树龄已有一千多年，真是经历了漫长岁月呢。\n\n相传，圣德太子的弟弟麻吕子亲王前往丹后地区讨伐鬼怪途中，曾在这座神社祈祷胜利，并种下三棵杉树。\n\n后来其中两棵因雷击等原因枯死，据说如今只剩下一棵。\n\n这棵神木与大江山讨鬼传说有着深厚渊源。\n\n我也是鬼，所以总会对这样的传说有点在意呢。",lines:{好奇心:'原来它叫麻吕子杉呀。我喜欢听传说，很想知道这个名字的来历。',疑问:'“麻吕子”是某个人的名字吗？越想越觉得不可思议呢。',兴趣:'这么高大的杉树，从很久以前就伫立在这里了。它见过的风景一定比我多得多吧。',闹别扭:'我觉得这棵树的名字挺有意思的……不过可能只是我自己在意啦。',平常:'这里有一棵大杉树，名叫麻吕子杉。看到高大的树，我总会忍不住抬头看呢。'}},
{id:'M02',name:'黑木鸟居',lat:35.43008582544981,lon:135.15443661998623,image:'/images/spots/kuroki-torii.jpg',shared:true,description:"这座鸟居名叫“黑木鸟居”。\n\n它与普通鸟居略有不同，建造时没有剥去树皮，保留了木材原本的自然模样。\n\n它的特色是使用仍带有树皮的杉木。\n\n据说这种样式保留了鸟居最初形态的特点。\n\n这种鸟居在日本各地也很少见，是元伊势内宫皇大神社的一大特色。\n\n如今这座鸟居因旧有鸟居老化，于2022年重建。\n\n保留木头自然模样的感觉，我很喜欢呢。",lines:{好奇心:'咦，鸟居上还留着树皮呢！这种样子我好像是第一次见！',疑问:'为什么这座鸟居要保留树皮呢？有什么特别的原因吗？',兴趣:'木头保留着自然的样子，感觉真不错。我很喜欢这种氛围。',闹别扭:'仔细看这座鸟居还挺有意思的……我有点被吸引住了。',平常:'这就是黑木鸟居。建造时保留了树皮呢。'}},
{id:'M03',name:'元伊势内宫皇大神社·正殿',lat:35.430451,lon:135.154311,image:'/images/spots/honden.jpg',description:"这里是元伊势内宫皇大神社的正殿。\n\n神社供奉着太阳之神天照大神。\n\n相传，在天照大神被供奉于如今位于三重县的伊势神宫之前，曾在此地供奉四年。\n\n因此，这里被称为“元伊势”，意为伊势的起源之地。\n\n正殿采用茅草屋顶的神明造建筑样式。\n\n周围还排列着许多小神社。\n\n古老的信仰至今仍在这里传承，真是特别的地方。\n\n我总会对这样长久以来受到珍视的地方感到好奇呢。",shared:true,lines:{好奇心:'听说这里和伊势神宫渊源深厚。听到这样的古老故事，我就会兴奋起来呢。',疑问:'为什么这里叫“元伊势”呢？古时候的事真有好多谜团呀。',兴趣:'正殿静静地坐落在树林里，让人感觉很平静。我喜欢这样的氛围。',闹别扭:'我本来还想聊聊“元伊势”这个名字的由来呢……',平常:'这里是元伊势内宫皇大神社的正殿。据说这里曾供奉过天照大神。'}},
 {id:'M04',name:'龙灯杉',lat:35.430451,lon:135.154311,image:'/images/spots/ryuto-sugi.jpg',description:"这棵高大的杉树被称为“龙灯杉”。\n\n它位于元伊势内宫皇大神社正殿附近，据说树龄约有两千年，是一棵神木。\n\n关于这棵杉树还流传着奇妙的传说。\n\n传说每逢节分夜，龙王会从龙宫现身，向天照大神献上神圣的灯火。\n\n据说灯火会从杉树低处的树枝一路升向高枝，最终直达天空。\n\n真是不可思议的故事呢。\n\n这棵杉树曾遭雷击和台风等损伤，人们采取了措施帮助它恢复生长。\n\n据说人们还培育了继承这棵杉树生命的幼树。\n\n我既喜欢大树也喜欢传说，听到这样的故事就会很兴奋呢。",shared:true,lines:{好奇心:'龙灯杉这个名字听起来就很帅气！它有什么传说呢？',疑问:'龙灯是龙的灯火吗？我的想象都开始丰富起来了。',兴趣:'这棵大杉树一直受到人们珍视呢。我都看入迷了。',闹别扭:'我特别在意这棵杉树的名字呢……以后再想想吧。',平常:'这里有一棵名为龙灯杉的神木。大树总有一种不可思议的魅力呢。'}},
{id:'M05',name:'日室岳遥拜所',lat:35.43060181662787,lon:135.15282662062512,image:'/images/spots/himurogatake.jpg',description:"这里是日室岳遥拜所。\n\n自古以来，人们就将日室岳本身视为神圣之物并加以敬奉。\n\n“遥拜所”是指在远处向神圣之物参拜的场所。\n\n在这里可以一边眺望日室岳一边参拜。\n\n这里还流传着“一愿成就”的说法。\n\n据说面向山峰许愿，愿望便能实现一个。\n\n夏至当天，还能看到夕阳落在山顶附近的神秘景象。\n\n敬奉整座山的信仰真美好呀。\n\n我也喜欢大自然，所以对这样的地方很感兴趣呢。",lines:{好奇心:'原来可以从这里遥拜山峰呀。那座山有什么传说呢？我很好奇。',疑问:'为什么不登上山，而要从这里参拜呢？有什么特别的缘由吗？',兴趣:'珍视整座山的信仰真美好呀。我很喜欢大自然呢。',闹别扭:'我本来想听听这座山的故事……不过只是我自己好奇啦。',平常:'这里是遥拜日室岳的场所。山里也流传着各种传说呢。'}},
{id:'M06',name:'天岩户神社',lat:35.431054,lon:135.150393,image:'/images/spots/amanoiwato.jpg',description:"这里是天岩户神社。\n\n神社位于宫川峡谷中，正殿建在巨大的岩壁上，是一处十分特别的地方。\n\n周围有巨石和清澈的河流，还流传着众神从天而降的传说。\n\n境内还有一块名为“御座石”的岩石。\n\n相传众神曾坐在这块岩石上。\n\n天岩户神社与元伊势内宫皇大神社、元伊势外宫丰受大神社并称“元伊势三社”。\n\n前往岩壁上的正殿参拜时，有一段路需要借助铁链攀登。\n\n所以参拜时请务必留意脚下安全。\n\n被岩石和河流环绕的地方，总让我觉得很兴奋呢。",lines:{好奇心:'咦，神社竟然建在岩壁上！到底是怎么建成的呢？我太好奇了。',疑问:'为什么要在这样的岩壁上建神社呢？我有点想象不出来。',兴趣:'四周都是岩石和河流，景色真壮观。我喜欢这样的自然环境。',闹别扭:'岩壁上的神社真的很厉害呢……下次再聊吧。',平常:'这里是天岩户神社。正殿建在河边的岩壁上呢。'}}
];
export const trainDirections=[{id:'fukuchiyama',name:'福知山方向'},{id:'amanohashidate',name:'天桥立·宫津方向'}] as const;
export type TrainDirection=typeof trainDirections[number]['id'];
export type TrainOption={time:string;rapid?:boolean};
export const trains:Record<TrainDirection,TrainOption[]>={
 fukuchiyama:[{time:'06:13'},{time:'07:03'},{time:'07:44',rapid:true},{time:'08:02'},{time:'08:53',rapid:true},{time:'09:43'},{time:'10:50'},{time:'11:50'},{time:'12:49'},{time:'13:44',rapid:true},{time:'14:48',rapid:true},{time:'15:51'},{time:'16:49'},{time:'17:48'},{time:'18:45',rapid:true},{time:'19:58'},{time:'20:39',rapid:true},{time:'21:31',rapid:true},{time:'22:21',rapid:true}],
 amanohashidate:[{time:'07:03'},{time:'08:02',rapid:true},{time:'08:24'},{time:'09:43'},{time:'10:50',rapid:true},{time:'11:50'},{time:'12:49'},{time:'13:44',rapid:true},{time:'14:48'},{time:'15:51',rapid:true},{time:'16:49'},{time:'17:48'},{time:'18:46'},{time:'19:58'},{time:'20:39',rapid:true},{time:'21:44',rapid:true},{time:'23:10',rapid:true}]
};
export const emotionWeights:Record<Exclude<Emotion,'闹别扭'>,number>={好奇心:25,疑问:25,兴趣:25,平常:25};
export const externalLinks:ExternalLink[]=[
{spot_id:'M01',site_name:'元伊势内宫皇大神社｜境内介绍·麻吕子杉',url:'https://www.motoisenaiku.com/shrine-information',description:'皇大神社官方境内介绍，讲述麻吕子杉的传说及复壮情况。'},
{spot_id:'M02',site_name:'元伊势内宫皇大神社｜境内介绍·黑木鸟居',url:'https://www.motoisenaiku.com/shrine-information',description:'皇大神社官方境内介绍，说明黑木鸟居的特色与建造方式。'},
{spot_id:'M03',site_name:'元伊势内宫皇大神社｜境内介绍·正殿',url:'https://www.motoisenaiku.com/shrine-information',description:'皇大神社官方境内介绍，介绍正殿的建筑样式与历史。'},
{spot_id:'M04',site_name:'元伊势内宫皇大神社｜境内介绍·龙灯杉',url:'https://www.motoisenaiku.com/shrine-information',description:'皇大神社官方境内介绍，介绍龙灯杉的传说及复壮情况。'},
{spot_id:'M05',site_name:'元伊势内宫皇大神社｜境内介绍·日室岳遥拜所',url:'https://www.motoisenaiku.com/shrine-information',description:'皇大神社官方境内介绍，介绍日室岳、遥拜所及一愿成就信仰。'},
{spot_id:'M06',site_name:'天岩户神社（元伊势三社之一）｜福知山观光协会',url:'https://dokkoise.com/spot/amanoiwato_shrine/',description:'福知山观光协会官方导览，介绍正殿、御座石及攀链参拜方式。'}
];
export const config={radiusMeters:30,holdSeconds:10,minNoticeMs:120_000,returnBeforeMinutes:25,returnReminderMinutes:5,accuracyLimitMeters:100,sulkyDelayMs:60_000,sulkyProbability:0.5,sharedRadiusMeters:40,sharedExitMarginMeters:15,gpsSamples:5,gpsSamplesRequired:3,gpsMaxAgeMs:15_000,individualRadii:{M01:50,M05:30,M06:30} as Record<string,number>,dailyFirstDelayMs:180_000,dailyStationaryMs:300_000,dailyMinIntervalMs:900_000,dailyMaxPerSession:3,dailyStayRadiusMeters:30};
