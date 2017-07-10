var grid;
var cols;
var rows;
var cSize;

function setup() {
  createCanvas(501, 501);
  cSize = 50;
  cols = floor(width / cSize);
  rows = floor(height / cSize);
  makeGrid();
}

function draw() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

function makeGrid() {
  grid = [cols];
  for (var i = 0; i < cols; i++) {
    grid[i] = [rows];
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var bomb = false;
      if (random() < 0.25) {
        bomb = true;
      }
      grid[i][j] = new Cell(i * cSize, j * cSize, bomb);
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      calculateBombs(i, j);
    }
  }
}

function calculateBombs(i, j) {
  var nbombs = 0;

  if (i > 0 && j > 0 && grid[i - 1][j - 1].bomb) {
    nbombs++;
  }
  if (j > 0 && grid[i][j - 1].bomb) {
    nbombs++;
  }
  if (j > 0 && i < cols - 1 && grid[i + 1][j - 1].bomb) {
    nbombs++;
  }
  if (i > 0 && grid[i - 1][j].bomb) {
    nbombs++;
  }
  if (i < cols - 1 && grid[i + 1][j].bomb) {
    nbombs++;
  }
  if (i > 0 && j < rows - 1 && grid[i - 1][j + 1].bomb) {
    nbombs++;
  }
  if (j < rows - 1 && grid[i][j + 1].bomb) {
    nbombs++;
  }
  if (i < cols - 1 && j < rows - 1 && grid[i + 1][j + 1].bomb) {
    nbombs++;
  }

  grid[i][j].neighbombs = nbombs;
}
