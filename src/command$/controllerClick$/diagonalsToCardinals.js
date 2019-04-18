import { merge } from "rxjs";
import { map, filter, partition, distinctUntilChanged } from "rxjs/operators";
import W from "../../world";

const hasCommand = commands => E => {
  const command = E.target.id;
  const hasCommand = commands.includes(command);

  return hasCommand;
}

const hasDirection = direction => E => {
  const command = E.target.id.toLowerCase();
  const hasDirection = command.includes(direction);

  return hasDirection; 
}

const updateID = command => E => {
  const target = {
    id: command
  }
  const type = E.type;

  return { target, type };
}

const splitDirections = allCommands$ => {
  const cardinals = [
    "up",
    "down",
    "left",
    "right"    
  ];
  
  const diagonals = [
    "upLeft",
    "upRight",
    "downLeft",
    "downRight"
  ];
  
  const anyDirection = cardinals.concat(diagonals);
  
  const [directions$, rest$] = allCommands$.pipe(
    partition(hasCommand(anyDirection))
  );

  const [diagonals$, cardinals$] = directions$.pipe(
    partition(hasCommand(diagonals))
  );

  return [diagonals$, cardinals$, rest$];
}

const normalizeDiagonals = allCommands$ => {
  const [diagonals$, cardinals$, rest$] = splitDirections(allCommands$);
  
  const up$ = merge(
    cardinals$.pipe(filter(hasDirection("up"))),
    diagonals$.pipe(
      filter(hasDirection("up")),
      map(updateID("up"))
    )
  ).pipe(
    distinctUntilChanged()
  );

  const down$ = merge(
    cardinals$.pipe(filter(hasDirection("down"))),
    diagonals$.pipe(
      filter(hasDirection("down")),
      map(updateID("down"))
    )
  ).pipe(
    distinctUntilChanged()
  );

  const left$ = merge(
    cardinals$.pipe(filter(hasDirection("left"))),
    diagonals$.pipe(
      filter(hasDirection("left")),
      map(updateID("left"))
    )
  ).pipe(
    distinctUntilChanged()
  );

  const right$ = merge(
    cardinals$.pipe(filter(hasDirection("right"))),
    diagonals$.pipe(
      filter(hasDirection("right")),
      map(updateID("right"))
    )
  ).pipe(
    distinctUntilChanged()
  );
  
  const allNormalized$ = merge(
    up$,
    down$,
    left$,
    right$,
    rest$
  );
    
  return allNormalized$;
}

export default normalizeDiagonals;