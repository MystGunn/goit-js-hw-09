function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
  
  const startButton = document.querySelector('button[data-start]');
  const stopButton = document.querySelector('button[data-stop]');
  let colorInterval = null;
  
  startButton.addEventListener('click', () => {
    if (!colorInterval) {
      startButton.disabled = true;
      colorInterval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
    }
  });
  
  stopButton.addEventListener('click', () => {
    if (colorInterval) {
      clearInterval(colorInterval);
      colorInterval = null;
      startButton.disabled = false;
    }
  });
