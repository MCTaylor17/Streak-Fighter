import { from } from "rxjs";
import { bufferCount, mergeMap, sequenceEqual } from "rxjs/operators";
import command$ from "../command$";

// Need to look-up moves from from a character sheet
// Eg. W.character.specials.hadouken.commandSequence
const specials = {
  lightHadouken: [
    {command: "down", pressed: true},
    {command: "down", pressed: false},
    {command: "down", pressed: true},
    {command: "down", pressed: false},
    {command: "down", pressed: true},
    {command: "down", pressed: false} 
  ],
  mediumHadouken: [
    {command: "down", pressed: true},
    {command: "right", pressed: true},
    {command: "downRight", pressed: true},
    {command: "right", pressed: false},
    {command: "downRight", pressed: false},
    {command: "mediumPunch", pressed: true}
  ]
}

const specialMove = (buffer, move) => {
  let isMove$ = from(buffer).pipe(sequenceEqual(from(specials[move])));
  isMove$.subscribe(E=> {
    console.log("isMove", E);
  });
  return
}

const lightHadouken$ = command$.pipe(
  bufferCount(6, 1),
  mergeMap()
);

lightHadouken$.subscribe(E=> {});


const specialMoves$ = merge(
  lightHadouken$
);

export default