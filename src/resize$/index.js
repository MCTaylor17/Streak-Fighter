import { merge, fromEvent } from "rxjs";
import { map, throttleTime, share } from "rxjs/operators";

const resizeEvent = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  
  console.log("Resize");

  return { height, width }
}

const resize$ = merge(
  fromEvent(window, "load"),
  fromEvent(window, "resize")
).pipe(
  throttleTime(12),
  map(resizeEvent),
  share()
);

export default resize$;

// Did you know '#' is called an 'Octothorpe'?