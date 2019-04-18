import sprite$ from "./sprite$";

sprite$.subscribe(E => {
  console.log(E);
});


import W from "./world";
const D = W.dimensions;

//TEST move BG
import { filter } from "rxjs/operators";
import command$ from "./command$";
command$.pipe(
  filter(E=>E.command === "right")
).subscribe(E => {
  D.initialcanvasX += 10;
  if(D.initialcanvasX > D.maxX) {
    D.initialcanvasX = D.maxX;
  }
});
command$.pipe(
  filter(E=>E.command === "left")
).subscribe(E => {
  D.initialcanvasX -= 10;
  if(D.initialcanvasX < 0) {
    D.initialcanvasX = 0;
  }
});
///TEST

const canvas = document.getElementById("stage");
const ctx = canvas.getContext('2d');

let bg = {};
bg.loaded = false;
bg.img = new Image();
bg.img.src = "./src/stage/pier1-sf2t-ratio.jpg";
bg.img.onload = () => {
  bg.loaded = true;
}

import resize$ from "./resize$";
resize$.subscribe(E => {
  console.log("RESIZE");
  canvas.width = D.canvasWidth;
  canvas.height = D.canvasHeight;
})


const draw = () => {
  ctx.clearRect(0, 0, D.canvasWidth, D.canvasHeight);
  
  if(bg.loaded) {
    ctx.drawImage(bg.img,-D.initialcanvasX,0,D.fullStageWidth,D.canvasHeight);
  }
};

export default draw;