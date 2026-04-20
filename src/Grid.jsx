import { useCallback, useRef } from 'react';
import styles from './Grid.module.css';

export default function Grid({ grid, onToggle, rows, cols }) {
  const painting = useRef(false);
  const paintValue = useRef(null);

  const handleMouseDown = useCallback((r, c, current) => {
    painting.current = true;
    paintValue.current = current ? 0 : 1;
    onToggle(r, c);
  }, [onToggle]);

  const handleMouseEnter = useCallback((r, c, current) => {
    if (!painting.current) return;
    if (current !== paintValue.current) onToggle(r, c);
  }, [onToggle]);

  const handleMouseUp = useCallback(() => {
    painting.current = false;
  }, []);

  return (
    <div
      className={styles.grid}
      style={{ '--cols': cols, '--rows': rows }}
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
