
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
const canvas2 = document.querySelector(".currentscore");
const ctx2 = canvas2.getContext("2d");
const scale2 = 1;
const columns2 = canvas2.width/scale2;
const rows2 = canvas2.height/scale2;

var snake;
var apple;


(function setup() {
  snake = new Snake();
  apple = new Apple();
  snake.draw();
  apple.randomFruit();
  window.setInterval(() => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    snake.update();
    snake.draw();
    apple.drawApple();
    ctx2.clearRect(0,0,canvas2.width, canvas2.height);
    let score = snake.eatenTotal;
    ctx2.font="30px Ariel white";
    ctx2.fillText(score, 75,33);
    if(snake.x == apple.x && snake.y == apple.y)
    {

      ctx.clearRect(apple.x, apple.y, canvas.width, canvas.height);

      apple.randomFruit();


      snake.eatenTotal++;
      ctx2.clearRect(0,0,canvas2.width, canvas2.height);
      score +=1;
      ctx2.font="30px Ariel white";
      ctx2.fillText(score, 75,33);
    }
  }, 250);
}());


window.addEventListener('keydown', ((evt) => {
  const direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
}))

window.addEventListener('keydown', ((evt2) => {
  const userpause = evt2.key.replace('Key', '');
  snake.pauseGame(userpause);
}))
