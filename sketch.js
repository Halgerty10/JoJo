var jotaro,jotaro2,jotaroRunning,jotaroAttack,bGround,bGround2,bGround3,bGroundImg,bGround2Img,bGround3Img,tokens,
    tokensImg,enemy,enemyImg,enemy2Img,enemy3Img,invisibleGround,kakyoin,kakyoinImg,kakyoinAttack;
var bullet,bulletImg,token2,token2Img;
var standCry1,audio,audio2,audio3;
var gameState  = "play";
var obstaclesGroup,foodGroup;

var score = 0;

function preload(){
  jotaroRunning = loadAnimation("walk.gif");
  jotaroAttack = loadAnimation("jotaroGIF.gif")

  kakyoinImg = loadAnimation("kakyoinIdleGIF.gif");
  kakyoinAttack = loadAnimation("kakyoinGIF.gif");

  bGroundImg = loadImage("fbbackground.jpg");
  bGround2Img = loadImage("bg2.png");
  bGround3Img = loadImage("newbg.png");
  
  tokensImg = loadImage("jotaroTokens.png");
  token2Img = loadImage("Token2.png");
  
  enemyImg = loadAnimation("ezgif.com-gif-maker.gif");
  enemy2Img = loadAnimation("holHorseGIF.gif");
  enemy3Img = loadAnimation("vanillaGIF.gif");

  bulletImg = loadImage("art.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  bGround = createSprite(700,200);
  bGround.addImage("background",bGroundImg);
  bGround.x = bGround.width/2;
  bGround.velocityX = -5;
  bGround.scale = 5;

  bGround3 = createSprite(50,200);
  bGround3.addImage("background3",bGround3Img);
  //bGround3.x = bGround3.width/2;
  bGround3.velocityX = -1.5;
  bGround3.scale = 3.2;
  bGround3.visible = false;

  bGround2 = createSprite(700,200);
  bGround2.addImage("background2",bGround2Img);
  bGround2.x = bGround2.width/2;
  bGround2.scale = 1;
  bGround2.visible = false;
  
  jotaro = createSprite (50,490,40,40);
  jotaro.addAnimation("running",jotaroRunning);
  jotaro.scale = 1.3; 
  jotaro.velocityY = 10;
  jotaro.visible = true;

  jotaro2 = createSprite (120,490,40,40);
  jotaro2.addAnimation("attacking",jotaroAttack);
  jotaro2.scale = 1.3;
  jotaro2.visible = false; 

  kakyoin = createSprite(1080,490,10,10);
  kakyoin.visible = false;
  kakyoin.scale = 1.3;
  kakyoin.addAnimation("standing",kakyoinImg);

  kakyoin2 = createSprite (1080,490,40,40);
  kakyoin2.addAnimation("attacking",kakyoinAttack);
  kakyoin2.scale = 1.3;
  kakyoin2.visible = false; 

  bullet = createSprite(160,490,10,10);
  bullet.addImage(bulletImg);
  bullet.scale = 0.2
  //bullet.debug = true;
  bullet.setCollider("rectangle",0,0,150,150);
  bullet.visible = false;
  bullet.shapeColor = "green";
  
  invisibleGround = createSprite(19,575,1165,10);
  invisibleGround.visible = false; 

  audio = new Audio("stand_cry1.wav");
  //audio.loop = true;
  audio2 = new Audio("emeraldsplash.wav");
  audio3 = new Audio("dios_theme_jjba.wav");
  audio3.loop = true;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  if(gameState === "play"){
     game();
  }
  if(gameState === "play2"){
    game2();
  }

  if(gameState === "end" && keyDown("R")||gameState === "end2" && keyDown("R")){
    gameState = "play2";
  }

  audio3.play();
  
  invisibleGround.debug = true; 
  jotaro.collide(invisibleGround);
  jotaro2.collide(invisibleGround);

  kakyoin.collide(invisibleGround);
  kakyoin2.collide(invisibleGround);

  drawSprites();
  
  stroke("white");
  textSize(20);
  text("Score: " + score,1200,50);

  if(score <= 0 && gameState === "play" ||score <= 0 && gameState === "play2"){
    textSize(25);
    fill("green");
    stroke("blue");
    //text("Avoid the rocks!",300,50);
    text("Press Space to jump!",50,50);
    text("Hold DOWN_ARROW to attack enemy when it comes close to you",20,100);
    //text("avoid losing points",20,125);
    text("Collect the tokens!",20,200);
    text("Get your score to 40!",10,150)
  }
 if(gameState === "end"){
     kakyoin2.x = 1250;
    kakyoin2.visible = true;
    
    //background(rgb(171,220,255));
    textSize(70);
    text("The End",520,200);
    textSize(30);
    text("Press 'R' to restart game", 500, 250);
    bGround.visible = false;
    bGround2.visible = true;
    
    
    score = 0;
    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    //drawSprites();drawSprites();
  }
  if(gameState === "end2"){
   kakyoin2.visible = false;
   kakyoin.visible = true;
   
   //background(rgb(171,220,255));
   textSize(70);
   text("The End",520,200);
   textSize(30);
   text("Press 'R' to restart game", 500, 250);
   bGround.visible = false;
   bGround2.visible = true;
   
   
   score = 0;
   foodGroup.destroyEach();
   obstaclesGroup.destroyEach();
   //drawSprites();drawSprites();
 }
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 130 === 0) {
    tokens = createSprite(1500,250,40,10);
    tokens.y = random(220,260);    
    tokens.addImage(tokensImg);
    tokens.scale = 0.4;
    tokens.velocityX = -5;
     //assign lifetime to the variable
    tokens.lifetime = 700;
    jotaro.depth = tokens.depth + 1;
    
    //add each tokens to the group
    foodGroup.add(tokens);
  }
}

function spawnFood2() {
  //write code here to spawn the food
  if (frameCount % 130 === 0) {
    token2 = createSprite(1500,250,40,10);
    token2.y = random(220,260);    
    token2.addImage(token2Img);
    token2.scale = 0.15;
    token2.velocityX = -5;
     //assign lifetime to the variable
    token2.lifetime = 700;
    jotaro.depth = token2.depth + 1;
    
    //add each token2 to the group
    foodGroup.add(token2);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    enemy = createSprite(1500,490,5,40);
    enemy.velocityX = -5;
    var r = Math.round(random(1,3));
    if(r === 1){
      enemy.addAnimation("attack",enemyImg);
      enemy.scale = 1;
    }else if(r === 2){
      enemy.addAnimation("attack",enemy2Img);
      enemy.scale = 0.5;
    }else if(r === 3){
      enemy.addAnimation("attack",enemy3Img);
      enemy.scale = 1;
    }
    console.log(r);
    //enemy.debug = true;
    enemy.setCollider("rectangle",0,0,200,100);
    
    //assign scale and lifetime to the obstacle     
    enemy.lifetime = 700;
    
    //add each obstacle to the group
    obstaclesGroup.add(enemy);
  }
}
 



function game(){
  if(gameState === "play"){
    jotaro.visible = false;
    kakyoin.visible = false;
    bGround.visible = true;
  
  //console.log(jotaro.y);
  spawnFood();
  //run();
  spawnObstacles(); 
  //jotaro.debug = true;
  jotaro.setCollider("rectangle",0,0,50,100);
  //jotaro2.debug = true;
  jotaro2.setCollider("rectangle",0,0,150,100);
  //jotaro.debug = true;
 

  if(bGround.x < 100){
     bGround.x = bGround.width/2;
     }
  
  if(foodGroup.isTouching(jotaro)){
      foodGroup.destroyEach();
    score = score + 4;
  }
  
  if(keyDown("space") && jotaro.collide(invisibleGround)){
     jotaro.velocityY = -17;
     }

  if(jotaro2.visible === true && obstaclesGroup.isTouching(jotaro2)){ 
        obstaclesGroup.destroyEach();
        jotaro2.visible = false;
        jotaro.visible = true;
    }

  if(keyDown("DOWN_ARROW")){
    jotaro2.visible = true;
    jotaro.visible = false;
    jotaro.y = 500;
    audio.play();
  }else {
    jotaro2.visible = false;
    jotaro.visible = true;
    audio.pause();
  }

  if(obstaclesGroup.isTouching(jotaro) && keyIsDown(DOWN_ARROW) === false){ 
    obstaclesGroup.destroyEach();
    score = score - 5;
  }
  
  jotaro.velocityY = jotaro.velocityY + 0.8;

  if(score >= 40 || keyDown("E") && keyDown("F") && keyDown("G")){
    gameState = "end";
    jotaro.visible = true;
  } 
  
  
  }

   
}

function game2(){
  if(gameState === "play2"){
    bGround2.visible = false;
    jotaro.visible = false;
    //kakyoin.visible = false;
    kakyoin.x = 100;
    kakyoin2.x = 100;
    bGround.visible = false;
    bGround3.visible = true;
  
  //console.log(jotaro.y);
  spawnFood2();
  //run();
  spawnObstacles(); 
  //jotaro.debug = true;
  kakyoin.setCollider("rectangle",0,0,50,100);
  //kakyoin2.debug = true;
  kakyoin2.setCollider("rectangle",0,0,60,100);
  //kakyoin.debug = true;
   
  if(bGround3.x < 250){
     bGround3.x = bGround3.width/2;
     }
  
  if(foodGroup.isTouching(kakyoin)){
      foodGroup.destroyEach();
    score = score + 4;
  }
  
  if(keyDown("space") && kakyoin.collide(invisibleGround)){
     kakyoin.velocityY = -18;
     }

  if(kakyoin2.visible === true && obstaclesGroup.isTouching(kakyoin2)){ 
        obstaclesGroup.destroyEach();
        kakyoin2.visible = false;
        kakyoin.visible = true;
    }
  if(bullet.visible === true && obstaclesGroup.isTouching(bullet)){ 
      obstaclesGroup.destroyEach();
      kakyoin2.visible = false;
      kakyoin.visible = true;
      bullet.visible = false;
    }

  if(keyDown("DOWN_ARROW")){
    kakyoin2.visible = true;
    kakyoin.visible = false;
    kakyoin.y = 530;
    bullet.visible = true;
    bullet.velocityX = 5;
    audio2.play();
  }else {
    kakyoin2.visible = false;
    kakyoin.visible = true;
    bullet.visible = false;
    bullet.velocityX = 0;
    bullet.x = 160;
    audio2.pause();
  }

  if(obstaclesGroup.isTouching(kakyoin) && keyIsDown(DOWN_ARROW) === false){ 
    obstaclesGroup.destroyEach();
    score = score - 5;
  }

  kakyoin.velocityY = kakyoin.velocityY + 0.8;

  if(score >= 40 || keyDown("E") && keyDown("F") && keyDown("G")){
    gameState = "end2";
    kakyoin.visible = true;
  } 
  
  
  }  
}