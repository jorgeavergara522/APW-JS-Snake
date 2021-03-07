
function Snake() {
  this.x = 0;
  this.y = 0;
  this.pauseX;
  this.pauseY;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.pauseXSpeed;
  this.pauseYSpeed;
  this.eatenTotal = 0;
  this.snakeLength = [];
  this.isPaused = false;

  this.draw = function() {
    ctx.fillStyle= "#00FF00";
    for(let i = 0; i <this.snakeLength.length; i++){
      ctx.fillRect(this.snakeLength[i].x, this.snakeLength[i].y, scale, scale)
    }

    ctx.fillRect(this.x, this.y, scale, scale);
    if(this.isPaused)
    ctx.fillRect(this.pauseX, this.pauseY, scale, scale);
  }




  this.update = function() {
    for(let i=0;i <this.snakeLength.length -1;i++){
      this.snakeLength[i] = this.snakeLength[i+1];
    }
    this.snakeLength[this.eatenTotal - 1]= {x: this.x, y: this.y};
    if(!this.isPaused)
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if(this.x > canvas.width || this.x < 0)
    {this.x = 0;
    this.y = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    ctx.font="30px Arial";
    ctx.fillText("Game Over!", 100, 200);
    this.eatenTotal = 0;

  }
    if(this.y > canvas.height || this.y < 0)
    {
      this.x = 0;
      this.y = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
      ctx.font="30px Arial";
      ctx.fillText("Game Over!", 100, 200);
      this.eatenTotal = 0;

    }
    
  }
  this.speedUp = function() {
    this.xSpeed = this.xSpeed +1 ;
  }

  this.pauseGame = function(userpause){
    switch(userpause) {
      case 'p':
      this.pauseXSpeed = this.xSpeed;
      this.pausedYSpeed = this.ySpeed;
      this.pauseX = this.x;
      this.pauseY = this.y;
      this.xspeed = 0;
      this.yspeed = 0;
      ctx.font = "30px Arial";
      ctx.fillText("Game Paused", 100, 200);
      this.isPaused = true;
      break;
      case 'u':

      this.x = this.pauseX;
      this.y = this.pauseY;
      this.xSpeed = this.pauseXSpeed;
      this.ySpeed = this.pauseYSpeed;
      this.isPaused = false;
      ctx.fillRect(this.x,this.y, scale, scale);
      break;
    }
  }

  this.changeDirection = function(direction){
    switch(direction) {
      case 'Up':
      this.xSpeed = 0;
      this.ySpeed = scale * -1;
      break;
      case 'Down':
      this.xSpeed = 0;
      this.ySpeed = scale * 1;
      break;
      case 'Left':
      this.xSpeed = scale * -1;
      this.ySpeed = 0;
      break;
      case 'Right':
      this.xSpeed = scale * 1;
      this.ySpeed = 0;
      break;
    }
  }
}
