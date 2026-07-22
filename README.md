# ⏱️ Stopwatch

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

A precise, dark glassmorphism stopwatch built with **HTML5**, **Tailwind CSS**, and **vanilla JavaScript** — no frameworks, no build step, no dependencies to install.

It tracks elapsed time down to the centisecond, with full Start / Pause / Resume / Reset control and a running lap list that shows both the split and cumulative time for every lap.

---

## 📸 Screenshot / Preview

<!--
  Add a screenshot or short GIF of the stopwatch here, e.g.:
  ![Stopwatch preview](./screenshot.png)
-->

*(Screenshot coming soon — open `index.html` in your browser for a live look in the meantime.)*

---

## ✨ Key Features

- 🎨 **Dark glassmorphism design** — frosted-glass card, soft borders, and a subtle ambient glow over a dark gradient background, matching the rest of the portfolio's visual language.
- ⏱️ **Precise digital readout** — `HH:MM:SS.CS` display accurate to the centisecond, driven by `requestAnimationFrame` against a real timestamp rather than a naive one-second interval, so it never drifts.
- ▶️ **Start / Pause / Resume / Reset controls** — buttons enable and disable based on the current state (e.g. Reset is only available once the watch is stopped), and Start relabels itself to Resume after a pause.
- 🏁 **Lap timing** — record laps while running; each entry shows its split (time since the previous lap) alongside the cumulative total, in a scrollable list.
- 🎬 **Smooth UI** — a gentle glow pulse on the readout while running, buttons that lift and glow on hover, and new lap rows animate in.
- 📱 **Responsive design** — scales cleanly across desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|------------------------------------|
| Structure  | HTML5                              |
| Styling    | Tailwind CSS (via CDN)             |
| Behavior   | JavaScript (ES6+, vanilla)         |

---

## 🚀 How to Run

No installation, build tools, or dependencies are required.

1. Clone or download this repository.
2. Open `index.html` directly in any modern browser (Chrome, Firefox, Edge, Safari).

That's it — the stopwatch runs entirely client-side.

---

## 🔮 Future Enhancements

- 📤 Export lap times (CSV)
- 🔊 Sound cue on lap / reset
- ⌨️ Keyboard shortcuts (space to start/pause, L to lap)
- 🌗 Light/dark theme switcher
- 📴 Offline support via PWA

---

## 🙌 Credits

Built by **AS**.
