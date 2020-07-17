//Global Variables
var bananaImage, obstacleImage;
var obstacleGroup, bananaGroup;
var backImage, backgroundi;
var count;
var playerRuning, player;
var ground;

function preload() {

  backImage = loadImage("jungle.jpg");

  playerRuning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");

}


function setup() {

  createCanvas(600, 300);
  
  backgroundi = createSprite(200, 1, 1, 1);
  backgroundi.addImage("backgroud", backImage);
  backgroundi.x = backgroundi.width / 2;
  backgroundi.velocityX = -4;  
  backgroundi.scale = 1.1;
  
  ground = createSprite(300, 270, 600, 10);
  ground.visible = false;
  
  player = createSprite(50, 230, 1, 1);
  player.addAnimation("monkey", playerRuning);
  player.scale = 0.1;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  count = 0;

}


function draw() {
  
  edges = createEdgeSprites();

  background(225);
  
  player.bounceOff(edges[2]);
  
  player.collide(ground);
  
  if (backgroundi.x < 90){
    backgroundi.x = backgroundi.width / 2;
  }
  
  if (keyDown("space")) {
            
      player.velocityY = -10;
            
  }
  
  player.velocityY = player.velocityY + 2;
  
  if (player.isTouching(bananaGroup)) {
    
   count = count + 2;
   bananaGroup.destroyEach();
    
  }
  
  food();
  
  obstacles();
  
  switch(count){
      
    case 10 : player.scale = 0.12;
      break;
      case 20 : player.scale = 0.14;
      break;
      case 30 : player.scale = 0.16;
      break;
      case 40 : player.scale = 0.18;
      break;
      case 50 : player.scale = 0.20;
      break;
      default : break;
      
  }
  
  if (obstacleGroup.isTouching(player)) {
   
    player.scale = 0.1;
    
  }
  
  drawSprites();
  
  stroke("white");
  fill("white");
  textSize(20);
  text("Score: " + count, 500, 50);

}

function food() {
      
      //printing banana after 80 frame count
      if (frameCount % 80 === 0) {
            
            //creating banana and printing at random position
            var banana = createSprite(600, 190, 1, 1);
            banana.y = random(90, 190);
             
            
            //add image of banana
            banana.addImage("banana", bananaImage);
            banana.scale = 0.05;
            
            //seting velocity and lifetime
            banana.velocityX = -5;
            banana.lifetime = 120;
            
            //adding to banana group
            bananaGroup.add(banana);
            
      }
  
}

function obstacles() {
      
      //printing obstacles after 300 frame count
      if (frameCount % 300 === 0) {
            
            //creating obstacle 
            var obstacle = createSprite(605, 240, 1, 1);
            
            //colliding with ground
            obstacle.collide(ground);
            
            //add image of obstacle
            obstacle.addImage("stone", obstacleImage);
            obstacle.scale = 0.15;
            
            //setting velocity and lifetime
            obstacle.velocityX = -4;
            obstacle.lifetime = 150;
            
            //adding to obstacles group
            obstacleGroup.add(obstacle);
            
      }
      
}