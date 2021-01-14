var tower,towerimg,ghost,ghostimg,door,doorimg,climber,climberimg,doorgroup,climbergroup,block,blockgroup
var gameState="play"
function preload(){
  towerimg=loadImage("tower.png")
  climberimg=loadImage("climber.png")
  doorimg=loadImage("door.png")
  ghostimg=loadImage("ghost-standing.png")
}
function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300)
  tower.addImage(towerimg)
  tower.velocityY=1
  ghost=createSprite(200,200)
  ghost.addImage(ghostimg)
  ghost.scale=0.4
  doorgroup=createGroup()
  climbergroup=createGroup()
  blockgroup=createGroup()
}
function draw(){
  background("black")
  if(gameState=="play"){
    
  
  if(tower.y>400){
    tower.y=300
  }
  if(keyDown("a")){
    ghost.x=ghost.x-3
  }
  if(keyDown("d")){
    ghost.x=ghost.x+3
  }
  if(keyDown("space")){
    ghost.velocityY=-10
  }
  ghost.velocityY=ghost.velocityY+0.8
  if(climbergroup.isTouching(ghost)){
    ghost.velocityY=0
  }
  if(blockgroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy()
    gameState="end"
  }
  spawndoors()
  drawSprites()
  }
  if(gameState=="end"){
    fill("white")
    textSize(30)
    text("Game Over",230,250)
  }
}
function spawndoors(){
  if(frameCount%240==0){
    door=createSprite(Math.round(random(120,400)),-50)
    door.addImage(doorimg)
    door.velocityY=1
    climber=createSprite(door.x,10)
    climber.addImage(climberimg)
    climber.velocityY=1
    block=createSprite(door.x,15,climber.width,2)
    block.velocityY=1
    block.lifetime=800
    door.lifetime=800
    climber.lifetime=800
    ghost.depth=door.depth
    ghost.depth+=1
    doorgroup.add(door)
    climbergroup.add(climber)
    blockgroup.add(block)
  }
}