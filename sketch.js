var grid;
var cols;
var rows;
var cellSize;

function setup() {
  createCanvas(501, 501);
  cellSize = 50;
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  grid = makeGrid();
}

function draw() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

function makeGrid() {
  var arr = [cols];
  for (var i = 0; i < cols; i++) {
    arr[i] = [rows];
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      arr[i][j] = new Cell(i * cellSize, j * cellSize, true);
    }
  }
  return arr;
}
