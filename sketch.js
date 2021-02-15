var ball
var speed = 8
var dash = false
var dashC = [0, 0]
var dashT = 10
var dashT2 = 20
var dashR = false
var ballP = [[], []]
var health = 100
var gameState = 0
var lvl = 0


function setup() {
  createCanvas(800,800);
  ball = createSprite(400, 400, 25, 25)
  enemyG = createGroup()
  
  edges = createEdgeSprites()
  laser = createSprite(400, 0, 800, 50)

  bar = createSprite(400, 750, 600, 50)
  bar.shapeColor = "crimson"
  bar.visible = 0

  barD = createSprite(400, 700, 200, 10)
  barD.shapeColor = "blue"
  barD.destroy()

  spin = createSprite(400, 400, 800, 50)
  spin.visible = 0

  spin2 = createSprite(400, 400, 50, 800)
  spin2.visible = 0

  play = createButton("Play")

  
}

function draw() {
  background("grey"); 

  fill("lightblue")
  noStroke()
  rectMode(CENTER)
  


  if(gameState === 0){

    textAlign(CENTER)
    textSize(70)
    text("Game Name", 400, 100)

    
    
    play.position(335, 300)
    play.style("width", "150px")
    play.style("height", "70px")
    play.style("font-size", "30px")
    play.mousePressed(()=>{
        gameState = 1
        lvl = 0
        play.hide()
    })








  }
  if(gameState === 1){

  addEnemy()

  lvl += 1

  bar.visible = 1

  rect(400, 750, 620, 70)

  

  ball.velocityY = 0
  ball.velocityX = 0
if(dash === false){

if(keyDown("a")){
  ball.velocityX = -speed
  dashC[0] = -speed
}

if(keyDown("d")){
  ball.velocityX = speed
  dashC[0] = speed
}

if(keyDown("w")){
  ball.velocityY = -speed 
  dashC[1] = -speed
}

if(keyDown("s")){
  ball.velocityY = speed 
  dashC[1] = speed
}




if(keyWentUp("s")){
  dashC[1] = 0
}
if(keyWentUp("w")){
  dashC[1] = 0
}
if(keyWentUp("a")){
  dashC[0] = 0
}
if(keyWentUp("d")){
  dashC[0] = 0
}

dashT2 += 1
barD.width = dashT2*3

barD.x = ball.x
barD.y = ball.y + 40

ball.shapeColor = rgb(0, 0, dashT2*20)

}
if(dash === true){
  ball.velocityX = dashC[0] * 2
  ball.velocityY = dashC[1] * 2
  dashT -= 1

  if(dashC[0] === 0 && dashC[1] === 0){
    dashC[1] = speed
}
  
  if(dashT <= 0){
    dash = false
    dashT = 10
  }
}

if(keyDown(" ") && dashT2 >= 20){
  dash = true
  dashT2 = 0
  ball.shapeColor = "lightblue"
}

ball.collide(edges)

ballP[1].push(ball.y)
ballP[0].push(ball.x)




    if(enemyG.isTouching(ball) && dash === false){
      ball.shapeColor = "red"
      health -= 5
      push()
      translate(100, 750)
      bar.width = health*6
      pop()
    }

    if(health <= 0){
      health = 0
    }
  }

  console.log(lvl)

  if(health > 100){
    health = 100
  }
  
  drawSprites();
}

function addEnemy(){
  if(lvl % 60 == 0 && lvl < 500){

    rand = Math.round(random(1,2))
    switch(rand){

    case 1: for(var i = 50; i < height; i += 150){
      enemy = createSprite(820, i, 50, 10)
      enemyG.add(enemy)
      enemy.velocityX = -15
      enemy.shapeColor = "red"
      enemy.lifetime = 50
    }
    break

    case 2: for(var i = 70; i < height; i += 150){
      enemy = createSprite(820, i, 50, 10)
      enemyG.add(enemy)
      enemy.velocityX = -15
      enemy.shapeColor = "red"
      enemy.lifetime = 50
    }
    break
    
    }

    rand2 = Math.round(random(1,2))

    switch(rand2){

    case 1: for(var i = 50; i < height; i += 150){
      enemy = createSprite(i, -20, 10, 50)
      enemyG.add(enemy)
      enemy.velocityY = 15
      enemy.shapeColor = "red"
      enemy.lifetime = 50
    }
    break

    case 2: for(var i = 70; i < height; i += 150){
      enemy = createSprite(i, -20, 10, 50)
      enemyG.add(enemy)
      enemy.velocityY = 15
      enemy.shapeColor = "red"
      enemy.lifetime = 50
    }
    break
    
    }
    
    
  }

  if(lvl > 0 && lvl < 500){


    laser.shapeColor = rgb(lvl*2, 0, 0)

    if(lvl === 133){
      enemyG.add(laser)
    }
  
    if(lvl < 50){
    laser.visible = 0
    }else{
      laser.visible = 1
    }
    for(i = 0; i < ballP[1].length; i++){
    laser.y = ballP[1][i - 20]
    }
  }

  if(lvl > 500){
    laser.lifetime = 0
  }

  if(lvl > 500 && lvl < 600){
    push()
    fill("green")
      rect(200, 200, 200, 200)
      rect(200, 600, 200, 200)
      rect(600, 600, 200, 200)
      rect(600, 200, 200, 200)
      pop()
  }

  if(lvl > 600 && lvl < 1100){

    if(lvl === 601){
    health += 35
    }
    
    spin.rotation += 2
    enemyG.add(spin)
    spin.visible = 1
    spin.shapeColor = "red"

    spin2.rotation += 2
    enemyG.add(spin2)
    spin2.visible = 1
    spin2.shapeColor = "red"

 if(lvl % 4 === 0){
    tap = createSprite(400, 400, 30, 30)
    tap.shapeColor = "red"
    enemyG.add(tap)

    tap.lifetime = 50

    var rand = Math.round(random(1,2))
    switch(rand){
    case 1: tap.velocityY = random(10,13)
    break

    case 2: tap.velocityY = random(-10,-13)
    break

    }

    var rand2 = Math.round(random(1,2))
    switch(rand2){
    case 1: tap.velocityX = random(10,13)
    break

    case 2: tap.velocityX = random(-10,-13)
    break

    }

  }

  }
  } 

  function keyPressed(){
    if(keyCode === 49){
      lvl = 0
    }
    if(keyCode === 50){
      lvl = 500
    }
    if(keyCode === 51){
      lvl = 1200
    }
    
  }


