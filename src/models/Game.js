// Constants
export const Cell = {
  EMPTY: "EMPTY",
  GRASS: "GRASS",
  TENT: "TENT",
  TREE: "TREE"
};

const Side = {
  TOP: "TOP",
  BOTTOM: "BOTTOM",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
};

// Game
export default class Game {
  size: null;
  rows: null;
  rowCounts: null;
  colCounts: null;

  static generate(size) {
    const game = new Game();

    // Init rows and cols
    game.size = size;
    game.rows = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Cell.EMPTY)
    );

    // Fill with tents and trees
    let remaining = Math.floor((size * size) / 5);
    let tries = 0;
    while (remaining && tries++ < 1000) {
      const tree = randomCell(size);
      const tent = randomAdjacentCell(tree);
      if (!game.isEmpty(tree) || !game.isInRange(tent) || !game.isEmpty(tent)) {
        // Cells are not empty
        continue;
      }

      const surroundingCells = game.getSurroundingCells(tent);
      if (surroundingCells.some(game.isTent)) {
        // Tent is adjacent to another tent
        continue;
      }

      // Set cells
      game.rows[tree[0]][tree[1]] = Cell.TREE;
      game.rows[tent[0]][tent[1]] = Cell.TENT;
      remaining--;
    }

    // Calculate counts
    game.colCounts = Array.from({ length: size }, (_, x) =>
      game.getColCount(x)
    );
    game.rowCounts = Array.from({ length: size }, (_, y) =>
      game.getRowCount(y)
    );

    // Remove tents
    game.rows = game.rows.map(row =>
      row.map(cell => (cell === Cell.TENT ? Cell.EMPTY : cell))
    );

    return game;
  }

  constructor(size, rows, rowCounts, colCounts) {
    this.size = size;
    this.rows = rows;
    this.rowCounts = rowCounts;
    this.colCounts = colCounts;
  }

  cycleCell = ([x, y]) => {
    const cycle = Object.values(Cell).filter(c => c !== Cell.TREE);
    const i = cycle.indexOf(this.rows[x][y]);
    if (i === -1) {
      return this;
    }

    return this.setCell([x, y], cycle[(i + 1) % cycle.length]);
  };

  setCell = ([x, y], value) => {
    if (this.rows[x][y] === value) {
      return this;
    }

    const rows = this.rows.map(row => [...row]);
    rows[x][y] = value;

    return new Game(this.size, rows, this.rowCounts, this.colCounts);
  };

  getCol = x => {
    return this.rows.map(r => r[x]);
  };

  getRow = y => {
    return this.rows[y];
  };

  getColCount = x => {
    return this.getCol(x).reduce((acc, cell) => acc + (cell === Cell.TENT), 0);
  };

  getRowCount = y => {
    return this.getRow(y).reduce((acc, cell) => acc + (cell === Cell.TENT), 0);
  };

  getCell = ([x, y]) => {
    return this.rows[x][y];
  };

  getSurroundingCells = ([x, y]) => {
    return [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
      [x, y + 1],
      [x - 1, y + 1],
      [x - 1, y]
    ].filter(this.isInRange);
  };

  isComplete = () => {
    const a = Array.from({ length: this.size }, (_, i) => i);

    // Invalid rows
    if (a.some(i => !this.isRowValid(i))) {
      return false;
    }

    // Invalid cols
    if (a.some(i => !this.isColValid(i))) {
      return false;
    }

    // Adjacent tents
    if (
      this.rows.some((row, x) =>
        row.some((cell, y) =>
          cell === Cell.TENT
            ? this.getSurroundingCells([x, y]).some(
                sCell => this.getCell(sCell) === Cell.TENT
              )
            : false
        )
      )
    ) {
      return false;
    }

    // TODO: Matching trees and tents

    return true;
  };

  isColFull = x => {
    return this.getCol(x).every(cell => cell !== Cell.EMPTY);
  };

  isColValid = x => {
    return this.isColFull(x) && this.colCounts[x] === this.getColCount(x);
  };

  isRowFull = y => {
    return this.getRow(y).every(cell => cell !== Cell.EMPTY);
  };

  isRowValid = y => {
    return this.isRowFull(y) && this.rowCounts[y] === this.getRowCount(y);
  };

  isEmpty = cell => {
    return this.getCell(cell) === Cell.EMPTY;
  };

  isTent = cell => {
    return this.getCell(cell) === Cell.TENT;
  };

  isInRange = ([x, y]) => {
    return x >= 0 && y >= 0 && x < this.size && y < this.size;
  };
}

// Helpers
function randomCell(size) {
  const x = Math.floor(Math.random() * size);
  const y = Math.floor(Math.random() * size);
  return [x, y];
}

function randomAdjacentCell([x, y]) {
  const side = randomSide();
  switch (side) {
    case Side.TOP:
      return [x, y - 1];
    case Side.BOTTOM:
      return [x, y + 1];
    case Side.LEFT:
      return [x - 1, y];
    case Side.RIGHT:
      return [x + 1, y];
    default:
      throw new Error("Impossible!");
  }
}

function randomSide() {
  const sides = Object.values(Side);
  return sides[Math.floor(Math.random() * sides.length)];
}
