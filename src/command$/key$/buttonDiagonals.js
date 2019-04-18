import { combineLatest, merge } from "rxjs";
import { map, filter, share } from "rxjs/operators";

const hasCommand = command => E => {
  return E.command === command
}

const titleCase = string => string.charAt(0).toUpperCase()+ string.slice(1); 

const numberPressedFilter = number => A => {
  let pressed = A.filter(E => E.pressed);

  if(pressed.length === number) {
    return true;
  }

  return false;
};

const diagonalMap = (vertical, horizontal, pressed) => A => {
  let command = vertical + titleCase(horizontal);
  return { command, pressed }
};

const diagonalStream = (baseCommands$, vertical, horizontal) => {
  const vertical$ = baseCommands$.pipe(filter(hasCommand(vertical)));
  const horizontal$ = baseCommands$.pipe(filter(hasCommand(horizontal)));
  const cardinals$ = combineLatest(vertical$, horizontal$);

  const diagonalPressed$ = cardinals$.pipe(
    filter(numberPressedFilter(2)),
    map(diagonalMap(vertical,horizontal, true))
  );
  
  const diagonalUnpressed$ = cardinals$.pipe(
    filter(numberPressedFilter(1)),
    map(diagonalMap(vertical,horizontal, false))
  );
  
  return merge(diagonalPressed$, diagonalUnpressed$);
};

const addDiagonalCommands = baseCommands$ => {
  const  upLeft$ = diagonalStream(baseCommands$, "up", "left");
  const  upRight$ = diagonalStream(baseCommands$, "up", "right");
  const  downLeft$ = diagonalStream(baseCommands$, "down", "left");
  const  downRight$ = diagonalStream(baseCommands$, "down", "right");
  
  return merge(baseCommands$, upLeft$, upRight$, downLeft$, downRight$)
}

export default addDiagonalCommands;