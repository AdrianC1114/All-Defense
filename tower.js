function Tower(x,y){
  Phaser.Sprite.call(this,game,x,y,"tower");
  game.add.existing(this);
  this.anchor.setTo(0.5,0.5);
  this.shootTimer = 0;
  this.shootTimerMax = 40;
  this.bulletSpeed = 10;
  this.angle = 0;
  this.bulletdamage = 3;
  this.level = 1;
  this.inputEnabled = true;
  this.events.onInputDown.add(this.upgrade,this);
  this.range = 400;
  this.target = null;
  game.objectgroup.add(this);
}
Tower.prototype = Object.create(Phaser.Sprite.prototype);
Tower.prototype.shoot = function(){
  var targetPostion = this.predict(this.target);
  var direction = Phaser.Point.subtract(targetPostion,this);
  var checkDistance = Phaser.Point.distance(this,this.target);
  direction.normalize();
  direction.multiply(this.bulletSpeed,this.bulletSpeed);
  var angle = Phaser.Math.angleBetweenPoints(this,targetPostion);
  angle = Phaser.Math.radToDeg(angle);
  this.angle = angle + 90;
  new Bullet(this.x,this.y,direction.x,direction.y,this.angle,this.bulletdamage);

}
Tower.prototype.update = function(){
  this.target = this.chooseTarget();
  if(this.shootTimer <= 0 && game.enemyList.length > 0 && this.target){
    this.shoot();
    this.shootTimer = this.shootTimerMax;
  }
  this.shootTimer -= 1;
}
Tower.prototype.predict = function(target){
  var targetPostion = new Phaser.Point(target.x,target.y);
  for(var i = 0; i < 200; i++){
    if(target.direction === "up"){
      targetPostion.y -= target.speed;
    }
    if(target.direction === "down"){
      targetPostion.y += target.speed;
    }
    if(target.direction === "left"){
      targetPostion.x -= target.speed;
    }
    if(target.direction === "right"){
      targetPostion.x += target.speed;
    }
    var distancetotarget = Phaser.Point.distance(this,targetPostion);
    if(distancetotarget <= i*this.bulletSpeed){
      return targetPostion;
    }
  }
  return targetPostion;
}
Tower.prototype.upgrade = function(){
  if(this.level == 1){
    if(game.money >= 100){
      game.money -= 100;
      new FloatingText(this.x, this.y, "-$100");
      this.level = 2;
      this.loadTexture("tower2");
      this.bulletDamage = 5;
      this.shootTimerMax = 35;

    }
  }
  else if(this.level == 2){
    if(game.money >= 150){
      game.money -= 150;
      new FloatingText(this.x, this.y, "-$150");
      this.level = 3;
      this.loadTexture("tower3");
      this.bulletDamage = 10;
      this.shootTimerMax = 35;

    }
  }
}
Tower.prototype.chooseTarget = function(){
  var targetEnemy = null;
  for(var i = 0; i < game.enemyList.length; i++){
    var checkEnemy = game.enemyList[i];
    var checkDistance =  Phaser.Point.distance(this,checkEnemy);
    if(checkDistance < this.range){
      if(targetEnemy){
        if(checkEnemy.distanceTravel > targetEnemy.distanceTravel){
          targetEnemy = checkEnemy;
        }
      }
      else{
        targetEnemy = checkEnemy;
      }
    }

  }
  return targetEnemy;
}
