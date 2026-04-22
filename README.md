# ⚡ FocusFlow

A minimalist, dark-themed productivity app with Focus Timer, Weekly Calendar, Task Management, Projects, and Analytics.

## Features
- 🕐 **Focus Timer** — Start/pause/reset with session logging
- 📅 **Weekly Calendar** — Click time slots to add time blocks
- ✅ **Task Manager** — Create, edit, complete tasks with tags & projects
- 📁 **Projects** — Group tasks, track progress
- 📊 **Analytics** — Weekly chart, today's stats
- ⌨️ **Keyboard shortcuts** — `Space`, `R`, `1-5`

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview  # test production build locally
```

## Deploy to GitHub Pages

1. In `vite.config.js`, set `base: '/YOUR_REPO_NAME/'`
2. Install gh-pages: `npm install -D gh-pages`
3. Add to `package.json` scripts:
```json
   "deploy": "gh-pages -d dist"
```
4. Run:
```bash
   npm run build
   npm run deploy
```
5. Enable GitHub Pages in repo Settings → Pages → `gh-pages` branch

## Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Space` | Start / Pause timer |
| `R` | Reset timer |
| `1` | Timer view |
| `2` | Calendar view |
| `3` | Tasks view |
| `4` | Projects view |
| `5` | Analytics view |