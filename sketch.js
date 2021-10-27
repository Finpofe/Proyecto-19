var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  //cargamos nuestras imagenes y sonidos
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  //área del juego
  createCanvas(600,600);
  
  //sprite de la torre
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 3;
  //sprite del fantasma 
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  //grupos
  doorsGroup = new  Group();
  climbersGroup = new  Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);
  if(gameState === "play"){
  
  if(keyDown("left_arrow")){
  ghost.velocityX = -3;
  }
  
  if(keyDown("right_arrow")){
  ghost.velocityX = 3;
  }
  
  if(keyDown("space")){
  ghost.velocityY = -10;
  }
    
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(tower.y > 400){
  tower.y = 300;
  }
  spawnDoors();
    
  if(climbersGroup.isTouching(ghost)){
  ghost.velocityY = 0; 
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
  ghost.destroy();
  gameState = "end"
  }
  drawSprites();
  }
  
  if (gameState === "end"){
    stroke("Red");
    fill("Red");
    textSize(30);
    text("Game Over",230,250)
  }
}

function spawnDoors() {
  //escribe aquí el código para aparecer las puertas en la torre 
  if(frameCount % 240 === 0){
    
    var door = createSprite(200,-50);
    door.addImage(doorImg);
    
    var climber = createSprite(200,10);
    climber.addImage(climberImg);
    
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    
    
    invisibleBlock.x = door.x;
    climber.x = door.x;
    
    door.velocityY = 3;
    climber.velocityY = 3;
    invisibleBlock.velocityY = 3;
    
    ghost.depth = door.depth && climber.depth && invisibleBlock.depth;
    ghost.depth = ghost.depth + 1;
    
    door.lifetime = height;
    climber.lifetime = height;
    invisibleBlock.lifetime = height;
    
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
     }

}

