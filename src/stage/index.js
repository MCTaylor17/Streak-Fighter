import resize$ from "../resize$";
import W from "../world";

const D = W.dimensions;

D.canvasRatio = 1.25;
D.fullStageRatio = 2.77;

resize$.subscribe(E => {
  // Visibile area of stage
  D.canvasWidth = E.width;
  D.canvasHeight = (E.width / D.canvasRatio);
  
  // Total area of stage
  D.fullStageWidth = D.canvasHeight * D.fullStageRatio;
  
  // The maximum value of canvasX
  // The invisible area of the stage
  D.maxX = D.fullStageWidth - D.canvasWidth;
  D.initialcanvasX = D.maxX / 2;
});


/*

What if: "Full Screen"

Change D.canvasRatio to match window.screen ratio

@see: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

*/
