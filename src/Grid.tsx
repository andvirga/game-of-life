import { useCallback, useRef } from 'react';

interface GridProps {
  grid: number[][];
  onToggle: (r: number, c: number) => void;
  rows: number;
  cols: number;
}

export default function Grid({ grid, onToggle, rows, cols }: GridProps) {
  const painting = useRef(false);
  const paintValue = useRef<number | null>(null);

  const handleMouseDown = useCallback(
    (r: number, c: number, current: number) => {
      painting.current = true;
      paintValue.current = current ? 0 : 1;
      onToggle(r, c);
    },
    [onToggle]
  );

  const handleMouseEnter = useCallback(
    (r: number, c: number, current: number) => {
      if (!painting.current) return;
      if (current !== paintValue.current) onToggle(r, c);
    },
    [onToggle]
  );

  const handleMouseUp = useCallback(() => {
    painting.current = false;
  }, []);

  return (
    <div
      className="grid gap-px bg-[#1a1a2e] border border-[#16213e] rounded select-none cursor-crosshair"
      style={{
        gridTemplateColumns: `repeat(${cols}, 14px)`,
        gridTemplateRows: `repeat(${rows}, 14px)`,
      }}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      {grid.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            className={`w-3.5 h-3.5 rounded-sm transition-colors duration-[50ms] ${
              cell
                ? 'bg-[#e94560] shadow-[0_0_4px_#e94560aa]'
                : 'bg-[#0f3460]'
            }`}
            onMouseDown={() => handleMouseDown(r, c, cell)}
            onMouseEnter={() => handleMouseEnter(r, c, cell)}
          />
        ))
      )}
    </div>
  );
}
