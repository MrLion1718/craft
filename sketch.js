var ghost, ghostImg
var door, doorImg, doorsGroup
var tower, towerImg
var climber, climberImg, climbersGroup
var ib, ibGroup
var gamestate="play"


function preload(){
ghostImg=loadImage("ghost-standing.png")
doorImg=loadImage("door.png")
towerImg=loadImage("tower.png")
climberImg=loadImage("climber.png")
}
function setup(){
createCanvas(600,600)
tower=createSprite(300,300)
tower.addImage(towerImg)
tower.velocityY=1

doorsGroup=new Group();
climbersGroup=new Group(); 
ibGroup=new Group();

ghost=createSprite(300,300)
ghost.addImage(ghostImg)
ghost.scale=0.3;

}
function draw(){
background("black")
if(gamestate==="play"){
if(keyDown("left")){
  ghost.x=ghost.x-3
}

if(keyDown("right")){
  ghost.x=ghost.x+3
}

if(keyDown("space")){
  ghost.velocityY=-10
}
ghost.velocityY=ghost.velocityY +0.8
if(tower.y>400){
  tower.y=300
}
spawnDoors();
if(climbersGroup.isTouching(ghost)){
  ghost.velocityY=0
}
if(ibGroup.isTouching(ghost)||ghost.y>600){
  gamestate="end"
  ghost.destroy();
}
drawSprites();
}
if(gamestate==="end"){
  stroke("yellow")
  fill ("yellow")
  textSize (30)
  text("Game Over",230,250)
}


}
function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var ib = createSprite(200,15);
    ib.width = climber.width;
    ib.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    ib.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    ib.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    ib.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    ib.debug = true;
    climbersGroup.add(climber);
    ibGroup.add(ib);
  }
}