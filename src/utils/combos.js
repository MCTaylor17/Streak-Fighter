// Copy-pasta from original prototype

const comboCounter = (callback) => {
  let timeout;
  let hits = 0;
  const cooldown = 500;

  const complete = () => {
    if (callback) {
      callback(hits);
      hits = 0;
    }
  }

  const hitCounter = () => {
    clearTimeout(timeout);
    hits++;
    timeout = setTimeout(complete, cooldown)
  }

  return hitCounter;
}

const displayCombo = hits => {
  alert(hits);
}
const hit = comboCounter(displayCombo);