function DoubleTower(x,y){
  Tower.call(this,x,y);
  this.shootTimerMax = 40;
  this.bulletSpeed = 10;
  this.bulletdamage = 6;
  this.range = 400;
  this.loadTexture("doubletower");
}
DoubleTower.prototype = Object.create(Tower.prototype);
DoubleTower.prototype.shoot = function(){
  var targetPostion = this.predict(this.target);
  var direction = Phaser.Point.subtract(targetPostion,this);
  var checkDistance = Phaser.Point.distance(this,this.target);
  direction.normalize();
  direction.multiply(this.bulletSpeed,this.bulletSpeed);
  var angle = Phaser.Math.angleBetweenPoints(this,targetPostion);
  angle = Phaser.Math.radToDeg(angle);
  this.angle = angle + 90;
  new DoubleBullet(this.x,this.y,direction.x,direction.y,this.angle,this.bulletdamage);

};

DoubleTower.prototype.upgrade = function(){
  if(this.level == 1){
    if(game.money >= 100){
      game.money -= 100;
      new FloatingText(this.x, this.y, "-$100");
      this.level = 2;
      this.loadTexture("doubletower2");
      this.bulletDamage = 8;
      this.shootTimerMax = 35;

    }
  }
  else if(this.level == 2){
    if(game.money >= 150){
      game.money -= 150;
      new FloatingText(this.x, this.y, "-$150");
      this.level = 3;
      this.loadTexture("doubletower3");
      this.bulletDamage = 10;
      this.shootTimerMax = 30;

    }
  }
};
