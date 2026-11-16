import assert from 'node:assert/strict';
import test from 'node:test';
import {spots} from './data';
import {hasStableSharedEntry,isWithinSharedArea,updateSharedPresence,type SharedPresence} from './shared-area';

const point=(spotId:string)=>{const spot=spots.find(item=>item.id===spotId)!;return{lat:spot.lat,lon:spot.lon}};

test('the discovery area is the union of four separate spot circles',()=>{
 for(const id of ['M01','M02','M03','M04'])assert.equal(isWithinSharedArea(point(id)),true,id+' should be inside');
 const a=point('M01'),b=point('M02');
 assert.equal(isWithinSharedArea({lat:(a.lat+b.lat)/2,lon:(a.lon+b.lon)/2}),false,'the gap between circles stays outside');
});

test('entry requires at least three accurate samples spanning five seconds',()=>{
 const p=point('M02');
 assert.equal(hasStableSharedEntry([{...p,at:1000},{...p,at:3500},{...p,at:6000}]),true);
 assert.equal(hasStableSharedEntry([{...p,at:1000},{...p,at:3500}]),false);
 assert.equal(hasStableSharedEntry([{...p,at:1000},{...p,at:3000},{...p,at:5500}]),false);
});

test('exit uses stable outside fixes and a 15 meter re-entry margin',()=>{
 let state:SharedPresence={active:true,outsideCount:0};
 const far={lat:35.44,lon:135.17};
 state=updateSharedPresence(state,far,1000,true,false);
 state=updateSharedPresence(state,far,3500,true,false);
 state=updateSharedPresence(state,point('M02'),4500,true,false);
 assert.equal(state.outsideCount,0,'a jitter fix in the exit margin resets the streak');
 state=updateSharedPresence(state,far,5000,true,false);
 state=updateSharedPresence(state,far,7500,true,false);
 assert.equal(state.active,true);
 const exit=updateSharedPresence(state,far,10000,true,false);
 assert.equal(exit.exited,true);
});

test('a long gap resets consecutive outside measurements',()=>{
 let state:SharedPresence={active:true,outsideCount:0};
 const far={lat:35.44,lon:135.17};
 state=updateSharedPresence(state,far,1000,true,false);
 state=updateSharedPresence(state,far,30000,true,false);
 assert.equal(state.outsideCount,1);
 assert.equal(state.outsideSince,30000);
});
