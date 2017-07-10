function Cell(x, y, b) {
  this.x = x;
  this.y = y;
  this.bomb = b;
}

Cell.prototype.show = function() {
  rect(this.x, this.y, cellSize, cellSize);
}
