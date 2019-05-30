/*

Scrape Character Frame Data from Wiki.Shoryuken.com

*/

const stripNonsense = string => {
  return string.split("\n").join("").trim();
}


const getRowContaining = ($rows, string) => {
  return $rows.filter(":contains(" + string + ")");
}

const getVal = ($rows, string) => {
  return stripNonsense(getRowContaining($rows, string).find("td").eq(1).text());
}

const extractAnimations = ($rows) => {
  const animations = []

  const $animationFrames = getRowContaining($rows, "Count").find("td:not(:first)");
  $animationFrames.each(function() {
    let text = $(this).text();
    
    
    if(text.includes("+")) {
      text = text.split("+");
    }
    if(text.includes("∞")) {
      text = "-1";
    }
    
    animations.push({
      frames: parseInt(text.trim()),
      sprite: []
    })
  });

  const $phases = getRowContaining($rows, "Simplified").find("td:not(:first)");
  let animationIndex = 0;
  let currentPhase = 0;

  if($phases.length) {

    $phases.each(function() {
      let numOfAnimations = parseInt($(this).attr("colspan")) || 1;

      while (numOfAnimations-- && animations[animationIndex]) {
        animations[animationIndex++].phase = currentPhase;
      }

      currentPhase++;
    });

    return animations;
  }
}

const frameData = {};
frameData.idle = {
  standing: null,
  crouching: null,
  blocking: null,
  stunned: null
};
frameData.hit = {
  normal: null,
  face: null,
  crouch: null,
  recover: null,
  knockout: null
};
frameData.misc = {
  projectile: null,
  victory: null,
  timeout: null
}

const attackInterface = {  
  fierce: {
    standing: {
      closeRange: 0,
      close: {},
      far: {},
    },
    couching: {},
    air: {
      neutral: {},
      diagonal: {}
    }
  }
};




const $groundNormals = $("h4:contains(Ground Normals)").nextUntil("h4");
$groundNormals.filter("ul + table").each(function() {
  let data = {};
  const $rows = $(this).find("tr");
  const titleText = $(this).prev().find("li").text();
  
  if(titleText.includes("range: ")) {
    data.maxRange = titleText.split("range: ")[1].slice(0,-2).trim();
  }
  
  data.name = titleText.split(":")[0].trim();
  data.damage = getVal($rows, "Damage")
  data.stun = getVal($rows, "Stun")
  data.stunTimer = getVal($rows, "Timer")
  data.specialCancel = getVal($rows, "Special")
      .includes("Yes")
  data.chainCancel = getVal($rows, "Chain")
    .includes("Yes")
  data.frameAdvantage = getVal($rows, "Advantage")
  data.animations = extractAnimations($rows);

  
  const attackComponents = data.name.toLowerCase().split(" ");
  const key = attackComponents.pop();
  const position = attackComponents.pop();
  const subType = attackComponents.pop();
  
  if(!frameData[key]) {
    frameData[key] = {};
    frameData[key][position] = {};
  }
  
  if(subType) {
    frameData[key][position][subType] = data;
  } else {
    frameData[key][position] = data;
  }
});

const $aerialNormals = $("h4:contains(Aerial Normals)").nextUntil("h3");

$aerialNormals.filter("ul + table").each(function() {
  let data = {};
  const $rows = $(this).find("tr");
  const titleText = $(this).prev().find("li").text();
  
  data.name = titleText.split(":")[0].trim();
  data.damage = getVal($rows, "Damage")
  data.stun = getVal($rows, "Stun")
  data.stunTimer = getVal($rows, "Timer")
  data.specialCancel = getVal($rows, "Special")
    .includes("Yes");
  data.animations = extractAnimations($rows);
  
  const attackComponents = data.name.toLocaleLowerCase().split(" ");
  const key = attackComponents.pop();
  const position = attackComponents.pop();
  const subType = attackComponents.pop();

  // frameData[key] = {}; // set in ground moves
  if(!frameData[key][position]) {
    frameData[key][position] = {};
    frameData[key][position][subType] = {};
  }
  
  if(subType.includes("/")) {
    let both = subType.split("/");
    delete frameData[key][position][subType];
    frameData[key][position][both[0]] = data;
    frameData[key][position][both[1]] = data;
  } else {
    frameData[key][position][subType] = data;
  }
});


frameData.jumps = {};

const $jumpNeutral = $("ul:contains(Neutral Jump) + table");
const $jumpBack = $("ul:contains(Back Jump) + table");
const $jumpForward = $("ul:contains(Forward Jump) + table");

$jumpNeutral.each(function() {
  const data = {};
  const $rows = $(this).find("tr");
  
  data.name = "Neutral Jump";
  data.animations = extractAnimations($rows);
  
  frameData.jumps["neutral"] = data;
});

$jumpBack.each(function() {
  const data = {};
  const $rows = $(this).find("tr");
  
  data.name = "Back Jump";
  data.animations = extractAnimations($rows);
  
  frameData.jumps["neutral"] = data;
});

$jumpForward.each(function() {
  const data = {};
  const $rows = $(this).find("tr");
  
  data.name = "Forward Jump";
  data.animations = extractAnimations($rows);
  
  frameData.jumps["forward"] = data;
});

const $specialMoves = $("h3:contains(Special Moves)").nextUntil("h3");

console.log(JSON.stringify(frameData));
console.log(frameData);