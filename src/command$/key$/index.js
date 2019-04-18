import { merge, fromEvent } from "rxjs";
import processKeys from "./processKeys";
import controllerClick$ from "../controllerClick$";

const key$ = merge(
  fromEvent(document, "keydown"),
  fromEvent(document, "keyup"),
  controllerClick$ // stream of synthetic keypresses
)

const command$ = processKeys(key$);

export default command$;