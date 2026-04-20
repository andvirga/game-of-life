import { useCallback, useRef } from 'react';
import styles from './Grid.module.css';

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
      className={styles.grid}
      style={{ '--cols': cols, '--rows': rows } as React.CSSProperties}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      {grid.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            className={`${styles.cell} ${cell ? styles.alive : ''}`}
            onMouseDown={() => handleMouseDown(r, c, cell)}
            onMouseEnter={() => handleMouseEnter(r, c, cell)}
          />
        ))
      )}
    </div>
  );
}
