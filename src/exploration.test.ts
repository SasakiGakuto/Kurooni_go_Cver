import assert from 'node:assert/strict';
import test from 'node:test';
import {existsSync} from 'node:fs';
import {chooseExplorationIntro,explorationIntroOptions,explorationSpotIds,markSpotDiscovered,routeStopLabels} from './exploration';
import {routes,spots} from './data';

test('exploration start uses a single 50/50 choice from two fixed utterances',()=>{
 assert.equal(chooseExplorationIntro(0).id,explorationIntroOptions[0].id);
 assert.equal(chooseExplorationIntro(0.4999).id,explorationIntroOptions[0].id);
 assert.equal(chooseExplorationIntro(0.5).id,explorationIntroOptions[1].id);
 assert.equal(explorationIntroOptions.length,2);
});

test('a spot can be discovered once, in any order, and cannot be added twice',()=>{
 let discovered:string[]=[];
 for(const id of ['M03','M01','M04','M02']){
  const result=markSpotDiscovered(discovered,id);
  assert.equal(result.added,true);
  discovered=result.discoveredIds;
 }
 assert.deepEqual(discovered,['M03','M01','M04','M02']);
 assert.equal(markSpotDiscovered(discovered,'M03').added,false);
 assert.equal(markSpotDiscovered(discovered,'M05').added,false);
});

test('the four discovery cards refer to their own supplied photos',()=>{
 const expected:Record<string,string>={M01:'/images/spots/marukosugi.jpg',M02:'/images/spots/kuroki-torii.jpg',M03:'/images/spots/honden.jpg',M04:'/images/spots/ryuto-sugi.jpg'};
 for(const id of explorationSpotIds){
  const spot=spots.find(item=>item.id===id)!;
  assert.equal(spot.image,expected[id]);
  assert.equal(existsSync(new URL(`../public${spot.image}`,import.meta.url)),true,`${id} photo should exist`);
 }
});

test('course visit display comes from route spot IDs and app names',()=>{
 const names=Object.fromEntries(spots.map(spot=>[spot.id,spot.name]));
 assert.deepEqual(routeStopLabels(routes[0].spotIds,names),[
  '大江山口内宫站（出发）','麻吕子杉','黑木鸟居','元伊势内宫皇大神社·正殿','龙灯杉','日室岳遥拜所','天岩户神社','大江山口内宫站（返程）',
 ]);
});
