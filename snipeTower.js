function SnipeTower(x,y){
  Tower.call(this,x,y);
  this.x = x;
  this.y = y;
  this.loadTexture("percitower");
  this.bulletdamage = 2;
  this.shootTimerMax = 20;
  this.range = 800;
}
SnipeTower.prototype = Object.create(Tower.prototype);
SnipeTower.prototype.shoot = function(){
  var targetPostion = this.predict(this.target);
  var direction = Phaser.Point.subtract(targetPostion,this);
  direction.normalize();
  direction.multiply(this.bulletSpeed,this.bulletSpeed);
  var angle = Phaser.Math.angleBetweenPoints(this,targetPostion);
  angle = Phaser.Math.radToDeg(angle);
  this.angle = angle + 90;
  new SnipeBullet(this.x,this.y,direction.x,direction.y,this.angle,this.bulletdamage,this.level);}
SnipeTower.prototype.upgrade = function(){
  if(this.level == 1){
    if(game.money >= 25){
      game.money -= 25;
      new FloatingText(this.x, this.y, "-$25");
      this.level = 2;
      this.loadTexture("percitower2");
      this.bulletDamage = 10;
      this.shootTimerMax = 30;

    }
  }
  else if(this.level == 2){
    if(game.money >= 50){
      game.money -= 50;
      new FloatingText(this.x, this.y, "-$50");
      this.level = 3;
      this.loadTexture("percitower3");
      this.bulletDamage = 15;
      this.shootTimerMax = 20;

    }
  }
}
