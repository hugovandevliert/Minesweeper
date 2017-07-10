var grid;
var cols;
var rows;
var cSize;
var gameOver;

function setup() {
  var easyButton = createButton("easy");
  easyButton.mousePressed(startGame);
  var mediumButton = createButton("medium");
  mediumButton.mousePressed(startGame);
  var hardButton = createButton("hard");
  hardButton.mousePressed(startGame);
  var extremeButton = createButton("extreme");
  extremeButton.mousePressed(startGame);
  startGame();
}

function draw() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
  if (gameOver) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].bomb) {
          grid[i][j].reveal(i, j);
          grid[i][j].show();
        }
      }
    }
    noLoop();
    fill(255, 0, 0);
    textSize(42);
    textAlign(CENTER);
    text("GAME OVER", width / 2, height / 2);
  }
}

function startGame(click) {
  var canvas = createCanvas(501, 501);
  if (click != null) {
    switch(click.srcElement.innerText) {
      case "easy":
        resizeCanvas(251, 251);
        break;
      case "medium":
        resizeCanvas(501, 501);
        break;
      case "hard":
        resizeCanvas(751, 751);
        break;
      case "extreme":
        resizeCanvas(1000, 1000);
        break;
    }
  }
  clear();
  canvas.position(10, 50);
  cSize = 50;
  cols = floor(width / cSize);
  rows = floor(height / cSize);
  gameOver = false;
  makeGrid();
  loop();
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (mouseX > grid[i][j].x && mouseX < grid[i][j].x + cSize
      && mouseY > grid[i][j].y && mouseY < grid[i][j].y + cSize) {
        if (mouseButton == LEFT) {
          grid[i][j].reveal(i, j);
        }
        if (mouseButton == RIGHT) {
          grid[i][j].mark();
        }
      }
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
