import assert from 'node:assert/strict';
import test from 'node:test';
import {canRestoreSession,japanDateKey,sessionStorageVersion,trainDepartureTimestamp,uuidPattern} from './session-state';

test('session storage is versioned and uses a stable Japanese calendar date',()=>{
 assert.equal(sessionStorageVersion,2);
 assert.equal(japanDateKey(new Date('2026-11-08T15:30:00.000Z')),'2026-11-09');
});

test('the selected train departure is interpreted as Japan local time on the tour date',()=>{
 assert.equal(new Date(trainDepartureTimestamp('15:51','2026-11-09')).toISOString(),'2026-11-09T06:51:00.000Z');
 assert.ok(Number.isNaN(trainDepartureTimestamp('25:99','2026-11-09')));
});

test('only the same visitor active same-day session before train departure can restore',()=>{
 const id='644865d0-4220-4214-bfb7-20f86f71b0a0';
 const base={sessionId:id,visitorId:id,expectedVisitorId:id,status:'active',tourDate:'2026-11-09',departureAt:1000,today:'2026-11-09',now:999,routeId:'course-1'};
 assert.equal(uuidPattern.test(id),true);
 assert.equal(canRestoreSession(base),true);
 assert.equal(canRestoreSession({...base,visitorId:'d8963db0-ef58-481f-8ca3-714e9f6f1cbf'}),false);
 assert.equal(canRestoreSession({...base,status:'ended'}),false);
 assert.equal(canRestoreSession({...base,today:'2026-11-10'}),false);
 assert.equal(canRestoreSession({...base,now:1000}),false);
});
