function Cell(x, y, b) {
  this.x = x;
  this.y = y;
  this.bomb = b;
  this.neighbombs;
  this.revealed = false;
  this.marked = false;
}

Cell.prototype.show = function() {
  strokeWeight(2);
  if (this.revealed) {
    fill(200);
  }
  else {
    fill(175);
  }
  rect(this.x, this.y, cSize, cSize);
  if (this.revealed) {
    if (this.bomb) {
      fill(0);
      ellipse(this.x + cSize / 2, this.y + cSize / 2, cSize / 2, cSize / 2);
    }
    else if (this.neighbombs != 0) {
      fill(0);
      textSize(28);
      textAlign(CENTER);
      text(this.neighbombs, this.x + cSize / 2, this.y + cSize / 1.5);
    }
  }
  else if (this.marked) {
    fill(255, 0 ,0);
    triangle(this.x + cSize / 2, this.y + cSize / 1.5,
             this.x + cSize / 1.5, this.y + cSize / 2,
             this.x + cSize / 2, this.y + cSize / 3.5);
    strokeWeight(3);
    line(this.x + cSize / 2, this.y + cSize / 1.5,
         this.x + cSize / 2, this.y + cSize / 1.25);
  }
}

Cell.prototype.reveal = function(i, j) {
  if (!this.revealed) {
    this.revealed = true;
    this.marked = false;
    if (this.bomb) {
      gameOver = true;
    }
    else if (this.neighbombs == 0) {
      if (i > 0 && j > 0) {
        grid[i - 1][j - 1].reveal(i - 1, j - 1);
      }
      if (j > 0) {
        grid[i][j - 1].reveal(i, j - 1);
      }
      if (j > 0 && i < cols - 1) {
        grid[i + 1][j - 1].reveal(i + 1, j - 1);
      }
      if (i > 0) {
        grid[i - 1][j].reveal(i - 1, j);
      }
      if (i < cols - 1) {
        grid[i + 1][j].reveal(i + 1, j);
      }
      if (i > 0 && j < rows - 1) {
        grid[i - 1][j + 1].reveal(i - 1, j + 1);
      }
      if (j < rows - 1) {
        grid[i][j + 1].reveal(i, j + 1);
      }
      if (i < cols - 1 && j < rows - 1) {
        grid[i + 1][j + 1].reveal(i + 1, j + 1);
      }
    }
  }
}

Cell.prototype.mark = function() {
  if (!this.marked) {
    this.marked = true;
  }
  else {
    this.marked = false;
  }
}
