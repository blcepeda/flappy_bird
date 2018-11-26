const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let p = document.querySelector('p');
const ww = canvas.width = 1024;
const hh = canvas.height = 600;
const obstacleAreaX = ww/2;
const obstacleAreaY = hh;
const obstacleWidth = 40;
const obstacleDistance = 150;
const gravity = -0.5;
const jumpSpeed = -7.5;
let vertSpeed = 0;
let obstacleSpeed = -3;
let gameOver = false;
let score = 0;



function Flappy(x,y,size,color){
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;
}

Flappy.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Flappy.prototype.update = function(){
  this.y += vertSpeed;
  vertSpeed -= gravity;
}

Flappy.prototype.collisionDetect = function(){
  if(this.y + this.size >= hh){
    this.y = hh - this.size;
  }
  if(this.y + this.size <= 0 - 2 * this.size){
    this.y = 0 - this.size;
  }
}

Flappy.prototype.setControls = function(){
  window.addEventListener('click', function(){
    vertSpeed = jumpSpeed;  
  });
}

function Obstacle(){
  this.x = ww;
  this.y;
  this.width = obstacleWidth;
  this.height = random(hh/8, hh/3);
  this.over = false;
  
}

Obstacle.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.rect(this.x, 0, this.width, this.height);
  ctx.rect(this.x, hh, this.width, -(hh - this.height - obstacleDistance))
  ctx.fill();
}

Obstacle.prototype.update = function(){
  this.x += obstacleSpeed;
}
// if(flappy.x > this.x && flappy.x < this.x + this.width){
Obstacle.prototype.collisionDetect = function(flappy){
  if((flappy.y < this.height || 
      flappy.y > (hh - this.height - obstacleDistance)) && 
      (flappy.x > this.x || flappy.x < this.x + this.width)){
        //endGame();
  } else if(flappy.x + flappy.size >= this.x &&
            flappy.x - flappy.size <= this.x + this.width){
              if(!this.over){
                score++;
                this.over = true;
              }
  }
}

Obstacle.prototype.isVisible = function(){
    if(this.x + this.width < 0){
      obstacles.shift();
    }
}

function random(offset, bound){
  return Math.floor(Math.random() * bound) + offset;
}

function startGame(){
  loop();
}

function endGame(){
  gameOver = true;
}

function showScore(){
  p.innerHTML = '' + score;
}
let test = new Flappy(ww/3, hh/2, 20, '#ffffff');
let obstacles = [];
let frameCount = 0;

function loop(){
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, ww, hh);

  test.setControls();
  test.draw();
  test.update();
  test.collisionDetect();

  if(frameCount % 60 === 0){
    obstacles.push(new Obstacle());
  }

  for(obstacle of obstacles){
    obstacle.draw();
    obstacle.update();
    obstacle.collisionDetect(test);
    obstacle.isVisible();
  }

  frameCount++;
  if(!gameOver){
    requestAnimationFrame(loop);
  } 
}




