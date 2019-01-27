export default class Game {
  _grid: null;

  constructor(size) {
    this._grid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
  }
}
