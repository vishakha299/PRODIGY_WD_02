let startTime, running, laps = 1;

function start() {
  if (!running) {
    startTime = Date.now() - (laps === 1 ? 0 : laps * 1000);
    running = setInterval(updateDisplay, 10);
  }
}

function stop() {
  if (running) {
    clearInterval(running);
    running = false;
  }
}

function reset() {
  stop();
  startTime = Date.now();
  laps = 1;
  updateDisplay();
  clearLaps();
}

function lap() {
  if (running) {
    const lapTime = Date.now() - startTime;
    displayLap(lapTime);
    laps++;
  }
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById('display').innerHTML = formattedTime;
}

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const millisecondsFormatted = date.getUTCMilliseconds().toString().padStart(3, '0');
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millisecondsFormatted}`;
}

function displayLap(lapTime) {
  const lapList = document.getElementById('lap-list');
  const lapItem = document.createElement('li');
  lapItem.className = 'lap-item';
  lapItem.textContent = `Lap ${laps}: ${formatTime(lapTime)}`;
  lapList.appendChild(lapItem);
}

function clearLaps() {
  const lapList = document.getElementById('lap-list');
  lapList.innerHTML = '';
}