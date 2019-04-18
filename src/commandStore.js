import W from "./world";

const updateButtonState = E => {
  W.buttons.pressed[E.command] = E.pressed;
  return E;
}

const recordEvent = E => {
  //console.log(W.currentFrame, "History:", W.buttons.history);
  if(!W.buttons.history[W.currentFrame]) {
    W.buttons.history[W.currentFrame] = []
  }
  W.buttons.history[W.currentFrame].push(E);
}

const commandStore = commandStream$ => {
  commandStream$.subscribe(updateButtonState);
  commandStream$.subscribe(recordEvent);  
}

export default commandStore;