function ExplosionTower(x,y){
  Tower.call(this,x,y);
  this.x = x;
  this.y = y;
  this.loadTexture("explotower");
  this.bulletdamage = 2;
  this.shootTimerMax = 20;
  this.inputEnabled = true;
  this.events.onInputDown.add(this.upgrade,this);
}
ExplosionTower.prototype = Object.create(Tower.prototype);
ExplosionTower.prototype.shoot = function(){
  var targetPostion = this.predict(this.target);
  var direction = Phaser.Point.subtract(targetPostion,this);
  var checkDistance = Phaser.Point.distance(this,this.target);
  if(checkDistance < this.range){
  direction.normalize();
  direction.multiply(this.bulletSpeed,this.bulletSpeed);
  var angle = Phaser.Math.angleBetweenPoints(this,targetPostion);
  angle = Phaser.Math.radToDeg(angle);
  this.angle = angle + 90;
  new ExplosionBullet(this.x,this.y,direction.x,direction.y,this.angle,this.bulletdamage,this.level);
}}
ExplosionTower.prototype.upgrade = function(){
  if(this.level == 1){
    if(game.money >= 25){
      game.money -= 25;
      this.level = 2;
      this.loadTexture("explotower2");
      this.bulletDamage = 10;
      this.shootTimerMax = 30;

    }
  }
  else if(this.level == 2){
    if(game.money >= 50){
      game.money -= 50;
      this.level = 3;
      this.loadTexture("explotower3");
      this.bulletDamage = 15;
      this.shootTimerMax = 20;

    }
  }
}
