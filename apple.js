function Apple() {
this.x;
this.y;
  this.randomFruit = function() {
    this.x = (Math.floor(Math.random () * rows - 1) + 1) * scale;
    this.y = (Math.floor(Math.random () * columns - 1) + 1) * scale;
  }
  this.drawApple = function() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x, this.y, scale, scale);
  }
}
