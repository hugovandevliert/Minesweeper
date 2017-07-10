function Cell(x, y, b) {
  this.x = x;
  this.y = y;
  this.bomb = b;
  this.neighbombs;
  this.revealed = true;
}

Cell.prototype.show = function() {
  fill(255);
  rect(this.x, this.y, cSize, cSize);
  if (this.revealed) {
    if (this.bomb) {
      fill(0);
      ellipse(this.x + cSize / 2, this.y + cSize / 2, cSize / 2, cSize / 2);
    }
    else if (this.neighbombs != 0) {
      fill(0);
      textSize(20);
      textAlign(CENTER);
      text(this.neighbombs, this.x + cSize / 2, this.y + cSize / 1.5);
    }
  }
}

Cell.prototype.reveal = function () {
  this.revealed = true;
}
