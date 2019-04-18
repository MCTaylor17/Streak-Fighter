export default {
  startTime: null,
  fps: 20,
  timestamp: 0,
  currentFrame: 0,
  dimensions: {
    viewportRatio: null,
    fullStageRatio: null,
    viewportWidth: null,
    viewportHeight: null,
    fullStageWidth: null,
    initialViewportX: null,
    maxX: null
  },
  buttons: {
    turbo: {
      active: false,
      rate: 5
    },
    bindings: {
      W: "up",
      A: "left",
      S: "down",
      D: "right",
      U: "lightPunch",
      I: "mediumPunch",
      O: "hardPunch",
      J: "lightKick",
      K: "mediumKick",
      L: "hardKick"
    },
    pressed: {
      up: false,
      down: false,
      left: false,
      right: false,
      lightPunch: false,
      mediumPunch: false,
      hardPunch: false,
      lightKick: false,
      mediumKick: false,
      hardKick: false
    },
    history: {
      0: {
        keydown: "up"
      },
      1: {
        keyup: "up",
        keydown: "up"
      },
      2: {
        keyup: "up",
        keydown: "down"
      },
      3: {
        keyup: "down",
        keydown: "down"
      },
      4: {
        keyup: "down",
        keydown: "left"
      },
      5: {
        keyup: "left",
        keydown: "right"
      },
      6: {
        keyup: "right",
        keydown: "left"
      },
      7: {
        keyup: "left",
        keydown: "right"
      },
      8: {
        keyup: "right",
        keydown: "mediumPunch"
      },
      9: {
        keyup: "mediumPunch",
        keydown: "lightPunch"
      },
      10: {
        keyup: "lightPunch"
      }
    }
  }
};