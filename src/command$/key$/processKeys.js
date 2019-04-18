/* BUG: Delayed press of opposite direction 
The implementation of oppositeDirectionFilter was done early in the rxjs learning curve. Rather than a filter it's probably better to separate the commands into individual button streams and send them through a comparator of some sort.  I should start using git...
*/

import { fromEvent, merge, combineLatest } from "rxjs";
import { map, filter, share } from "rxjs/operators";
import buttonDiagonals from "./buttonDiagonals";
import W from "../../world";

const B = W.buttons;

// Converts an event into a command
const inputCommandMap = E => {
  const key = E.key.toUpperCase();
  const command = B.bindings[key];
  const pressed = E.type === "keydown";
  
  return {command, pressed};
}

const turboFilter = E => {  
  // Allow if turbo is active
  if(B.turbo.active) {
    // Need to rate limit with B.turbo.rate
    return true;
  }
  
  // Allow opposite
  if(E.pressed !== B.pressed[E.command]) {
    return true;
  }
  // Filter everything else
  return false;
}

const oppositeDirectionFilter = E => {
  // Allow un-press events
  if(!E.pressed) {
    return true;
  }
  
  switch(E.command) {
    case "up":
      return !B.pressed.down;
    case "down":
      return !B.pressed.up;
    case "left":
      return !B.pressed.right;
    case "right":
      return !B.pressed.left;
    default:
      return true;
  }
}

const unknownButtonFilter = E => E.command !== undefined; 

const commandStream$ = (source$) => {
  const basicCommands$ = source$.pipe(
    map(inputCommandMap),
    filter(unknownButtonFilter),
    filter(oppositeDirectionFilter),
    share()
  );

  const allCommands$ = buttonDiagonals(basicCommands$);
  const rateLimited$ = allCommands$.pipe(filter(turboFilter),share());
  
  return rateLimited$;
}

export default commandStream$;