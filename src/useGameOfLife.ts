import { useState, useRef, useCallback } from 'react';

const ROWS = 40;
const COLS = 60;

type Grid = number[][];

function emptyGrid(): Grid {
  return Array.from({ length: ROWS }, () => new Array<number>(COLS).fill(0));
}

function nextGeneration(grid: Grid): Grid {
  return grid.map((row, r) =>
    row.map((cell, c) => {
      let neighbors = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
            neighbors += grid[nr][nc];
          }
        }
      }
      if (cell === 1) return neighbors === 2 || neighbors === 3 ? 1 : 0;
      return neighbors === 3 ? 1 : 0;
    })
  );
}

export interface GameOfLifeState {
  grid: Grid;
  running: boolean;
  generation: number;
  ROWS: number;
  COLS: number;
  toggleCell: (r: number, c: number) => void;
  start: () => void;
  stop: () => void;
  clear: () => void;
  randomize: () => void;
}

export function useGameOfLife(): GameOfLifeState {
  const [grid, setGrid] = useState<Grid>(emptyGrid);
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const runningRef = useRef(false);

  const toggleCell = useCallback((r: number, c: number) => {
    if (runningRef.current) return;
    setGrid(g => {
      const next = g.map(row => [...row]);
      next[r][c] = next[r][c] ? 0 : 1;
      return next;
    });
  }, []);

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;
    setGrid(g => nextGeneration(g));
    setGeneration(n => n + 1);
    setTimeout(runSimulation, 100);
  }, []);

  const start = useCallback(() => {
    runningRef.current = true;
    setRunning(true);
    runSimulation();
  }, [runSimulation]);

  const stop = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
  }, []);

  const clear = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
    setGrid(emptyGrid());
    setGeneration(0);
  }, []);

  const randomize = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
    setGrid(
      Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => (Math.random() > 0.75 ? 1 : 0))
      )
    );
    setGeneration(0);
  }, []);

  return { grid, running, generation, toggleCell, start, stop, clear, randomize, ROWS, COLS };
}
