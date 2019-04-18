import { fromEvent, merge } from "rxjs";
import { map } from "rxjs/operators";
import diagonalsToCardinals from "./diagonalsToCardinals";
import W from "../../world";

const keyMap = E => {
  const type = E.type;
  const id = E.target.id;

  const bindingKeys = Object.keys(W.buttons.bindings)

  const key = bindingKeys.filter(bindingKey => {
     return id === W.buttons.bindings[bindingKey];
  })[0];
  
  return { type, key };
}

const typeMap = E => {
  const key = E.key;
  let type;
  
  if(E.type === "mousedown") {
    type = "keydown"
  } else {
    type = "keyup";
  }
  
  return { key, type }  
}

const clickStream$ = source$ => {
  return diagonalsToCardinals(source$).pipe(
    map(keyMap),
    map(typeMap)
  );
}

export default clickStream$;
