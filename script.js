const displayEl = document.getElementById('display');
const lapListEl = document.getElementById('lapList');
const lapEmptyHint = document.getElementById('lapEmptyHint');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

let running = false;
let startTimestamp = 0;
let elapsedBeforePause = 0;
let rafId = null;
let laps = [];

function pad(n, width = 2) {
  return String(n).padStart(width, '0');
}

function formatTime(ms) {
  const totalCentis = Math.floor(ms / 10);
  const centis = totalCentis % 100;
  const totalSeconds = Math.floor(totalCentis / 100);
  const secs = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const mins = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  return `${pad(hours)}:${pad(mins)}:${pad(secs)}.${pad(centis)}`;
}

function getElapsed() {
  return elapsedBeforePause + (running ? Date.now() - startTimestamp : 0);
}

function render() {
  displayEl.textContent = formatTime(getElapsed());
  rafId = requestAnimationFrame(render);
}

function start() {
  if (running) return;
  running = true;
  startTimestamp = Date.now();
  displayEl.classList.add('running');
  render();
  updateButtonStates();
}

function pause() {
  if (!running) return;
  running = false;
  elapsedBeforePause += Date.now() - startTimestamp;
  cancelAnimationFrame(rafId);
  displayEl.classList.remove('running');
  updateButtonStates();
}

function reset() {
  if (running) return;
  elapsedBeforePause = 0;
  laps = [];
  displayEl.textContent = formatTime(0);
  renderLaps();
  updateButtonStates();
}

function lap() {
  if (!running) return;
  const total = getElapsed();
  const previousTotal = laps.length ? laps[laps.length - 1].total : 0;
  laps.push({ total, split: total - previousTotal });
  renderLaps();
}

function renderLaps() {
  lapListEl.innerHTML = '';
  lapEmptyHint.classList.toggle('hidden', laps.length > 0);
  laps.forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'lap-row';
    row.innerHTML = `
      <span class="lap-index">Lap ${i + 1}</span>
      <span class="lap-split">+${formatTime(entry.split)}</span>
      <span class="lap-total">${formatTime(entry.total)}</span>
    `;
    lapListEl.appendChild(row);
  });
  lapListEl.scrollTop = lapListEl.scrollHeight;
}

function updateButtonStates() {
  startBtn.disabled = running;
  pauseBtn.disabled = !running;
  lapBtn.disabled = !running;
  resetBtn.disabled = running || getElapsed() === 0;
  startBtn.textContent = elapsedBeforePause > 0 && !running ? 'Resume' : 'Start';
}

renderLaps();
updateButtonStates();
