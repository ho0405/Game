//setting Canvas

let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipsImage, enemyImage, bulletImage, gameoverImage;

//spaceshipslocation
let spaceshipX = canvas.width/2-30
let spaceshipY = canvas.height-60

let bulletList = [] //list of saved bullet
function Bullet() {
  this.x=0
  this.y=0
  this.init=function() {
    this.x = spaceshipX
    this.y = spaceshipY

    bulletList.push(this)
  }
}

function loadimage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.png";

  spaceshipsImage = new Image();
  spaceshipsImage.src = "images/spaceships.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  gameoverImage = new Image();
  gameoverImage.src = "images/gameover.png";

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
  }
}// update spaceship

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipsImage, spaceshipX, spaceshipY);

  for(let i=0; i<bulletList.length; i++) {
    ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
  }
}

function main() {
  update(); // update location
  render(); // draw
  requestAnimationFrame(main);
}

loadimage();
setupKeyboardListeners();
main();
//when clicked arrow keys are pressed
// spaceships xy values are updated
// render will updating again

//how to make bullet
//1. fire bullet when clicked spacebar
//2. when bullet is fired, = bullet Y value is --, what is x value of bullet? its spaceship's x value when spacebar is clicked
//3. all fire bullets are saved in bullet object
//4. all fire bullets are must have x,y values
//5. draw render with bullet object