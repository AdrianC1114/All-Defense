function SpikeTower(x,y){
  Tower.call(this,x,y);
  this.shootTimerMax = 40;
  this.bulletSpeed = 10;
  this.bulletdamage = 3;
  this.range = 400;
  this.bulletlives = 3;
  this.loadTexture("spiktower");
}
SpikeTower.prototype = Object.create(Tower.prototype);
SpikeTower.prototype.shoot = function(){
  var targetPostion = this.predict(this.target);
  var direction = Phaser.Point.subtract(targetPostion,this);
  var checkDistance = Phaser.Point.distance(this,this.target);
  direction.normalize();
  direction.multiply(this.bulletSpeed,this.bulletSpeed);
  var angle = Phaser.Math.angleBetweenPoints(this,targetPostion);
  angle = Phaser.Math.radToDeg(angle);
  this.angle = angle + 90;
  new SpikeBullet(this.x,this.y,direction.x,direction.y,this.angle,this.bulletdamage,this.bulletlives);

};

SpikeTower.prototype.upgrade = function(){
  if(this.level == 1){
    if(game.money >= 100){
      game.money -= 100;
      new FloatingText(this.x, this.y, "-$100");
      this.level = 2;
      this.loadTexture("spiktower2");
      this.bulletDamage = 5;
      this.shootTimerMax = 35;
      this.bulletlives = 5;
    }
  }
  else if(this.level == 2){
    if(game.money >= 150){
      game.money -= 150;
      new FloatingText(this.x, this.y, "-$150");
      this.level = 3;
      this.loadTexture("spiktower3");
      this.bulletDamage = 10;
      this.shootTimerMax = 35;
      this.bulletlives = 10;
    }
  }
};
