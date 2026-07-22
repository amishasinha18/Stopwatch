const timeMainEl = document.getElementById('timeMain');
const timeMsEl = document.getElementById('timeMs');
const displayEl = document.getElementById('display');
const progressRingFill = document.getElementById('progressRingFill');
const progressRing = document.getElementById('progressRing');
const statusIndicator = document.getElementById('statusIndicator');
const lapCounter = document.getElementById('lapCounter');
const lapListEl = document.getElementById('lapList');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

const RING_CIRCUMFERENCE = 289;

let running = false;
let startTimestamp = 0;
let elapsedBeforePause = 0;
let rafId = null;
let laps = [];
let lastWholeSecond = -1;

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
  return {
    main: `${pad(hours)}:${pad(mins)}:${pad(secs)}`,
    ms: `.${pad(centis)}`,
  };
}

function getElapsed() {
  return elapsedBeforePause + (running ? Date.now() - startTimestamp : 0);
}

function render() {
  const elapsed = getElapsed();
  const { main, ms } = formatTime(elapsed);
  timeMainEl.textContent = main;
  timeMsEl.textContent = ms;

  const wholeSecond = Math.floor(elapsed / 1000);
  if (wholeSecond !== lastWholeSecond) {
    lastWholeSecond = wholeSecond;
    pulseTick();
  }

  const fraction = (elapsed % 1000) / 1000;
  progressRingFill.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - fraction));

  rafId = requestAnimationFrame(render);
}

function pulseTick() {
  timeMainEl.classList.remove('tick');
  void timeMainEl.offsetWidth;
  timeMainEl.classList.add('tick');
}

function start() {
  if (running) return;
  running = true;
  startTimestamp = Date.now();
  displayEl.classList.add('running');
  progressRing.classList.add('visible');
  render();
  setStatus('Running');
  updateButtonStates();
}

function pause() {
  if (!running) return;
  running = false;
  elapsedBeforePause += Date.now() - startTimestamp;
  cancelAnimationFrame(rafId);
  displayEl.classList.remove('running');
  setStatus('Paused');
  updateButtonStates();
}

function reset() {
  if (running) return;
  elapsedBeforePause = 0;
  laps = [];
  lastWholeSecond = -1;
  timeMainEl.textContent = '00:00:00';
  timeMsEl.textContent = '.00';
  progressRingFill.style.strokeDashoffset = String(RING_CIRCUMFERENCE);
  progressRing.classList.remove('visible');
  renderLaps();
  setStatus('Ready');
  updateButtonStates();
}

function lap() {
  if (!running) return;
  const total = getElapsed();
  const previousTotal = laps.length ? laps[laps.length - 1].total : 0;
  laps.push({ total, split: total - previousTotal });
  renderLaps();
}

function setStatus(state) {
  statusIndicator.textContent = state;
  statusIndicator.classList.remove('status-ready', 'status-running', 'status-paused');
  statusIndicator.classList.add(`status-${state.toLowerCase()}`);
}

function renderLaps() {
  lapCounter.textContent = `Laps (${laps.length})`;
  lapListEl.innerHTML = '';

  if (laps.length === 0) {
    lapListEl.innerHTML = '<div class="lap-empty">No laps recorded yet</div>';
    return;
  }

  laps.forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'lap-row' + (i === laps.length - 1 ? ' newest' : '');
    row.innerHTML = `
      <span class="lap-index">Lap ${i + 1}</span>
      <span class="lap-split">+${formatTime(entry.split).main}${formatTime(entry.split).ms}</span>
      <span class="lap-total">${formatTime(entry.total).main}${formatTime(entry.total).ms}</span>
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

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    running ? pause() : start();
  } else if (e.key.toLowerCase() === 'l') {
    lap();
  } else if (e.key.toLowerCase() === 'r') {
    reset();
  }
});

renderLaps();
updateButtonStates();
