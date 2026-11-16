export const sessionStorageVersion=2;
export const uuidPattern=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function japanDateKey(date:Date){
 return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
}

export function trainDepartureTimestamp(train:string,tourDate:string){
 const [year,month,day]=tourDate.split('-').map(Number),[hour,minute]=train.split(':').map(Number);
 if(![year,month,day,hour,minute].every(Number.isFinite)||hour<0||hour>23||minute<0||minute>59)return NaN;
 return Date.UTC(year,month-1,day,hour-9,minute);
}

export function canRestoreSession(input:{sessionId?:string;visitorId?:string;expectedVisitorId:string;status?:string;tourDate?:string;departureAt?:number;today:string;now:number;routeId?:string}){
 return Boolean(input.sessionId&&uuidPattern.test(input.sessionId)&&input.visitorId===input.expectedVisitorId&&input.status==='active'&&input.tourDate===input.today&&input.routeId&&Number.isFinite(input.departureAt)&&Number(input.departureAt)>input.now);
}
