# Conway's Game of Life

An interactive browser implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) built with React and Vite.

## Usage

Click or drag across the grid to draw live cells, then press **Simulate** to watch the colony evolve. Use **Stop** to pause, **Randomize** to seed a random state, or **Clear** to reset the board.

## Development

```bash
nvm use        # requires Node 20
npm install
npm run dev    # http://localhost:5173
```

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # ESLint
```

## Rules

Each cell lives or dies each generation based on its 8 neighbours:

- A live cell with 2 or 3 neighbours **survives**
- A dead cell with exactly 3 neighbours **becomes alive**
- All other cells die or stay dead
