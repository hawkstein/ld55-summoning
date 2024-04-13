export const levels = [
  {
    gridSize: { rows: 4, columns: 4, density: 0.7 },
    waves: [{ enemies: 0 }],
  },
  {
    gridSize: { rows: 5, columns: 5, density: 0.6 },
    waves: [{ enemies: 1 }],
  },
  {
    gridSize: { rows: 6, columns: 6, density: 0.6 },
    waves: [{ enemies: 2 }],
  },
  {
    gridSize: { rows: 6, columns: 6, density: 0.5 },
    waves: [{ enemies: 5 }],
  },
  {
    gridSize: { rows: 7, columns: 7, density: 0.5 },
    waves: [{ enemies: 5 }],
  },
  {
    gridSize: { rows: 8, columns: 8, density: 0.4 },
    waves: [{ enemies: 5 }],
  },
  {
    gridSize: { rows: 8, columns: 9, density: 0.4 },
    waves: [{ enemies: 5 }],
  },
  {
    gridSize: { rows: 9, columns: 9, density: 0.3 },
    waves: [{ enemies: 5 }],
  },
  {
    gridSize: { rows: 10, columns: 10, density: 0.2 },
    waves: [{ enemies: 5 }],
  },
] as const
