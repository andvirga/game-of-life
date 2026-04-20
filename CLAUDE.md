# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview production build
npm run lint      # ESLint
```

## Architecture

Single-page React + Vite app with no routing or external state libraries.

**`useGameOfLife.js`** — all simulation logic and state. Owns the grid (2D array of 0/1), `running` flag, and `generation` counter. Uses a `ref` (`runningRef`) to control the recursive `setTimeout` loop so closures always see the latest running state without needing to re-register the timer.

**`Grid.jsx`** — pure display component. Renders the grid as a CSS Grid of `div` cells. Supports click-and-drag painting: `mousedown` sets `paintValue` (flip of the clicked cell), `mouseenter` while dragging applies the same value to avoid toggling already-painted cells.

**`App.jsx`** — thin shell that connects the hook to the Grid and renders the control bar (Simulate/Stop, Randomize, Clear, generation counter).

**Grid dimensions** are constants in `useGameOfLife.js` (`ROWS = 40`, `COLS = 60`) and passed down as props so `Grid` stays dimension-agnostic.
