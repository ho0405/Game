//setting Canvas

let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipsImage, enemyImage, bulletImage, gameoverImage;
let gameOver= false; // when its true, game is over, otherwise false is keep game on
let score = 0; // the score

//spaceshipslocation
let spaceshipX = canvas.width/2-30
let spaceshipY = canvas.height-60

let bulletList = [] //list of saved bullet
function Bullet() {
  this.x=0;
  this.y=0;
  this.init=function() {
    this.x = spaceshipX + 18;
    this.y = spaceshipY - 17;
    this.alive=true; // if its true, bullet is alive
    bulletList.push(this);
  };
  this.update=function(){
    this.y-= 3;
  };

  this.checkHit=function(){
    for(let i=0; i < enemyList.length; i++)
    {
      if(
        this.y <= enemyList[i].y &&
        this.x >= enemyList[i].x &&
        this.x <= enemyList[i].x+ 40
      ) {
        score++;
        this.alive = false;
        enemyList.splice(i, 1);
        
      }
    }
  };
}    

function generateRandomValues(min,max){
  let randomNum = Math.floor(Math.random()*(max-min+1)) + min
  return randomNum
}

let enemyList = []
function Enemy() {
  this.x=0;
  this.y=0;
  this.init=function(){
    this.y = 0;
    this.x = generateRandomValues(0,canvas.width-64)
    enemyList.push(this);
  };
  this.update=function(){
    this.y += 3 // enemy's speed

    if(this.y >= canvas.height - 64){
      gameOver = true;
    
    }
  }
}

function loadimage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.png";

  spaceshipsImage = new Image();
  spaceshipsImage.src = "images/spaceships.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameover.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemy.png";

}

let keysDown ={}

function setupKeyboardListeners() {
  document.addEventListener("keydown",function(event){
    keysDown[event.keyCode] = true;

    console.log("what is in the keydown event?", keysDown);
    
  })
  document.addEventListener("keyup",function(event){
    delete keysDown[event.keyCode];
    console.log("after keydown", keysDown);

    if(event.keyCode == 32){
      createBullet() // createbullet
    }
  });
}

function createBullet() {
  console.log("createBullet");
  let b = new Bullet();
  b.init();
  console.log("New bullet list", bulletList);

}

function createEnemy() {
  const interval = setInterval(function(){
    let e = new Enemy();
    e.init();
  },1000)
}

function update() {
  if( 39 in keysDown) {
    spaceshipX += 2;
  }//right
  if (37 in keysDown) {
    spaceshipX -= 2;
  }//left
  if ( 40 in keysDown) {
    spaceshipY += 2;
  }//bottom
  if ( 38 in keysDown) {
    spaceshipY -= 2;
  }//up

  if (spaceshipX <= 0) {
    spaceshipX  = 0;
  }

  if (spaceshipY <= 0) {
    spaceshipY = 0;}

  if (spaceshipX >= canvas.width-60) {
    spaceshipX = canvas.width-60;

  if (spaceshipY >= canvas.height-60) {
    spaceshipY = canvas.height-60;
  }  
  }// update spaceship

  // calling the function of the updating bullett's y value
  for (let i = 0; i <bulletList.length; i++) {
    if(bulletList[i].alive){
      bulletList[i].update();
      bulletList[i].checkHit();
    }
    
}

  for (let i = 0; i <enemyList.length; i++){
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipsImage, spaceshipX, spaceshipY);
  ctx.fillText(`Score: ${score}` ,20,20);
  ctx.fillStyle="white";
  ctx.font="20px Arial";

  for(let i=0; i<bulletList.length; i++) {
    if (bulletList[i].alive) {
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
    
  }

  for(let i=0; i<enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
}
}

function main() {
  if(!gameOver){
  update(); // update location
  render(); // draw
  requestAnimationFrame(main);
  }else{
    ctx.drawImage(gameOverImage, 10,100,380,380);
  }
}

loadimage();
setupKeyboardListeners();
createEnemy();
main();
//when clicked arrow keys are pressed
// spaceships xy values are updated
// render will updating again

//how to make bullet
//1. fire bullet when clicked spacebar
//2. when bullet is fired, = bullet Y value is --, what is x value of bullet? its spaceship's x value when spacebar is clicked
//3. all fire bullets are saved in bullet object
//4. all fire bullets are must have x,y values
//5. draw render with bullet objects

//enemy dies when bullet is clicked
//bullet.y <= enemy.y and bullet.x >= enemy.x and bullet x <= enemy.x + 40 -> hit enemy, bullet is disappeared enemy also disappeared

