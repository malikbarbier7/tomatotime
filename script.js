let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;

function updateTimerDisplay() {
  const timerDisplay = document.getElementById('timer');
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        isRunning = false;
        alert("Pomodoro terminé !");
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateTimerDisplay();
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  minutes = 25;
  seconds = 0;
  updateTimerDisplay();
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

updateTimerDisplay();
