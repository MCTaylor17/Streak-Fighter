const commandDisplay = commandStream$ => {
  commandStream$.subscribe(E => {
    const button = document.getElementById(E.command);

    if(E.pressed) {
      return button.classList.add("active");
    }
    
    return button.classList.remove("active");
  });
}

export default commandDisplay;