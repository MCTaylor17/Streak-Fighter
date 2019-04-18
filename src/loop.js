import update from "./update";
import draw from "./draw";
import W from "./world";

let thisFrame = 0;

const loop = timestamp => {
  requestAnimationFrame(loop);
  
  thisFrame = parseInt(timestamp/(1000/W.fps));
  W.timestamp = timestamp;
  
  update();

  if (W.currentFrame < thisFrame) {
    W.currentFrame = thisFrame;
    draw();
  }
}


export default () => {
  W.startTime = Date.now();
  requestAnimationFrame(loop);
}