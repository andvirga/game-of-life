import Grid from './Grid';
import { useGameOfLife } from './useGameOfLife';

const btnBase =
  'py-2 px-[22px] rounded-md text-[0.95rem] font-semibold cursor-pointer transition-all active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed';

export default function App() {
  const { grid, running, generation, toggleCell, start, stop, clear, randomize, ROWS, COLS } =
    useGameOfLife();

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 bg-[#0d0d1a] text-gray-200 font-sans">
      <h1 className="mb-1.5 text-[2rem] tracking-[0.04em] text-[#e94560]">
        Conway's Game of Life
      </h1>
      <p className="mb-5 text-[#aaa] text-[0.95rem]">
        Click (or drag) cells to draw, then hit <strong>Simulate</strong>.
      </p>
      <div className="flex items-center gap-2.5 mb-4 flex-wrap justify-center">
        <button
          onClick={running ? stop : start}
          className={`${btnBase} ${
            running
              ? 'bg-[#f0a500] text-gray-900 hover:bg-[#ffc03a]'
              : 'bg-[#e94560] text-white hover:bg-[#ff6080]'
          }`}
        >
          {running ? 'Stop' : 'Simulate'}
        </button>
        <button
          onClick={randomize}
          disabled={running}
          className={`${btnBase} bg-[#1e2a45] text-gray-300 border border-[#2e3f60] hover:bg-[#2a3a5c] hover:text-white`}
        >
          Randomize
        </button>
        <button
          onClick={clear}
          disabled={running}
          className={`${btnBase} bg-[#1e2a45] text-gray-300 border border-[#2e3f60] hover:bg-[#2a3a5c] hover:text-white`}
        >
          Clear
        </button>
        <span className="text-[#88aacc] text-sm ml-2 min-w-[130px]">
          Generation: {generation}
        </span>
      </div>
      <Grid grid={grid} onToggle={toggleCell} rows={ROWS} cols={COLS} />
    </div>
  );
}
