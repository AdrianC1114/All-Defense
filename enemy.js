function Enemy(x,y){
  Phaser.Sprite.call(this,game,x,y,"enemy");
  game.add.existing(this);
  game.enemyList.push(this);
  this.anchor.setTo(0.5,0.5);
  this.animations.add("walk");
  this.animations.play("walk",4,true);
  this.speed = 1;
  this.HP = 200;
  this.direction = "right";
  this.value = 50;
  this.topSpeed = 1;
  this.distanceTravel = 0;
  this.stunTimer = 0;
  this.immuneTimer = 0;
  game.objectgroup.add(this);
}
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.update = function(){
  for(var i = 0; i < game.bumperlist.length; i++){
    var bumper = game.bumperlist[i];
    if(collide(this,bumper)){
      this.hitbumper(bumper);
    }
  }
  this.move();
  this.distanceTravel += this.speed;
  if(this.HP <= 0){
    this.kill(true);
  }
  if(collide(this,game.Base)){
    game.Base.HP -= 10;
    game.camera.shake(0.005, 50);
    this.kill(false);
  }
  if(this.stunTimer > 0){
    this.stunTimer -= 0.05;
  }
  else{
    this.immuneTimer -= 0.05;
    if(this.speed < this.topSpeed){
      this.speed += .05;
    }
  }
}
Enemy.prototype.kill = function(dropsMoney){
  if(dropsMoney){
    game.money += this.value;
    new FloatingText(this.x, this.y, "$"+this.value);
  }
  var index = game.enemyList.indexOf(this);
  game.enemyList.splice(index,1);
  this.destroy();
}

Enemy.prototype.move = function(){
  if(this.direction === "up"){
    this.y -= this.speed;
    this.angle = 0;
  }
  else if(this.direction === "down"){
    this.y += this.speed;
    this.angle = 180;
  }
  else if(this.direction === "left"){
    this.x -= this.speed;
    this.angle = 270;
  }
  else if(this.direction === "right"){
    this.x += this.speed;
    this.angle = 90;
  }
};
Enemy.prototype.hitbumper = function(bumper){
  if(bumper.direction == "up"){
    this.direction = "up";
  }
  else if (bumper.direction == "down") {
    this.direction = "down";
  }
  else if (bumper.direction == "right") {
    this.direction = "right";
  }
  else if (bumper.direction == "left") {
    this.direction = "left";
  }
}
Enemy.prototype.slow = function(strength){
  this.speed = this.topSpeed/strength;
}
Enemy.prototype.stun = function(duration){
  if(this.immuneTimer <= 0){
    this.speed = 0;
    this.stunTimer = duration;
    this.immuneTimer = 5;
  }
}
Enemy.prototype.blink = function(){
  this.alpha = 0.5;
  game.time.events.add(75, function(){this.alpha = 1;}, this);
}
function FastEnemy(x,y){
  Enemy.call(this,x,y);
  this.loadTexture("enemy2");
  this.HP = 100;
  this.speed = 4;
  this.topSpeed = 4;
}
FastEnemy.prototype = Object.create(Enemy.prototype);

function TankEnemy(x,y){
  Enemy.call(this,x,y);
  this.loadTexture("enemy3");
  this.HP = 400;
  this.speed = .5;
  this.topSpeed = .5;
}
TankEnemy.prototype = Object.create(Enemy.prototype);
