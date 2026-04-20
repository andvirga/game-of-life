import Grid from './Grid';
import { useGameOfLife } from './useGameOfLife';
import './App.css';

export default function App() {
  const { grid, running, generation, toggleCell, start, stop, clear, randomize, ROWS, COLS } =
    useGameOfLife();

  return (
    <div className="app">
      <h1>Conway's Game of Life</h1>
      <p className="subtitle">
        Click (or drag) cells to draw, then hit <strong>Simulate</strong>.
      </p>
      <div className="controls">
        <button onClick={running ? stop : start} className={running ? 'btn-stop' : 'btn-start'}>
          {running ? 'Stop' : 'Simulate'}
        </button>
        <button onClick={randomize} disabled={running} className="btn-secondary">
          Randomize
        </button>
        <button onClick={clear} disabled={running} className="btn-secondary">
          Clear
        </button>
        <span className="generation">Generation: {generation}</span>
      </div>
      <Grid grid={grid} onToggle={toggleCell} rows={ROWS} cols={COLS} />
    </div>
  );
}
