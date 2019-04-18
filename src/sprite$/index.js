import { of, interval, from } from "rxjs";
import { delayWhen, bufferCount, mergeMap, sequenceEqual, map } from "rxjs/operators";
import command$ from "../command$";

const frameCounter$ = () => interval(3000);

//frameCounter$.subscribe(E=>console.log(E));

const specials = {
  lightHadouken: [
    {command: "down", pressed: true},
    {command: "right", pressed: true},
    {command: "downRight", pressed: true},
    {command: "right", pressed: false},
    {command: "downRight", pressed: false},
    {command: "lightPunch", pressed: true}
  ],
  mediumHadouken: [
    {command: "down", pressed: true},
    {command: "down", pressed: false},
    {command: "down", pressed: true},
    {command: "down", pressed: false},
    {command: "down", pressed: true},
    {command: "down", pressed: false} 
  ]
}

const lightHadouken$ = command$.pipe(
  bufferCount(6, 1),
  mergeMap(buffer => {
    return from(buffer).pipe(
      sequenceEqual((()=> {
        console.log("Input", buffer)
        console.log("Lookup",specials.mediumHadouken)
        return from([specials.mediumHadouken])
      })()),
      map(E=>{
        console.log("sql",E);
        return {"hadooo": "ken"}
      })
    )
  }),
);

lightHadouken$.subscribe(E=> {
  console.warn("HADOOOOUKEN!!!", E)
  if(E) {
  }
});
  
  
//import command$ from "../command$";
const frameKata$ = of(
  { priority: 2},
  { priority: 1},
  { priority: 3}
).pipe(
  delayWhen(()=>interval(1000))
);


const lastKata$ = frameKata$.pipe(
  //delayWhen(interval(1000))
  delayWhen(frameCounter$)
);

lastKata$.subscribe(E => console.log("Last",E));
frameKata$.subscribe(E => console.log("New",E));

const sprite$ = frameKata$.pipe();

export default sprite$;

//const frameRules = W.player1.frameRules
