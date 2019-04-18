import { merge, fromEvent } from "rxjs";
import clickStream from "./clickStream";

const buttons = document.getElementById("controller").children;

const clickStream$ = merge(
  fromEvent(buttons, "mousedown"),
  fromEvent(buttons, "mouseup")
);

export default clickStream(clickStream$);