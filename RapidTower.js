function RapidTower(x,y){
  Tower.call(this,x,y);
  this.shootTimerMax = 5;
  this.bulletSpeed = 20;
  this.bulletdamage = 1;
  this.range = 400;
  this.loadTexture("rapidtower");
}
RapidTower.prototype = Object.create(Tower.prototype);
RapidTower.prototype.shoot = function(){
  var targetPostion = this.predict(this.target);
  var direction = Phaser.Point.subtract(targetPostion,this);
  var checkDistance = Phaser.Point.distance(this,this.target);
  direction.normalize();
  direction.multiply(this.bulletSpeed,this.bulletSpeed);
  var angle = Phaser.Math.angleBetweenPoints(this,targetPostion);
  angle = Phaser.Math.radToDeg(angle);
  this.angle = angle + 90;
  new RapidBullet(this.x,this.y,direction.x,direction.y,this.angle,this.bulletdamage);

};

RapidTower.prototype.upgrade = function(){
  if(this.level == 1){
    if(game.money >= 100){
      game.money -= 100;
      new FloatingText(this.x, this.y, "-$100");
      this.level = 2;
      this.loadTexture("rapidtower2");
      this.bulletDamage = 2;
      this.shootTimerMax = 4;

    }
  }
  else if(this.level == 2){
    if(game.money >= 150){
      game.money -= 150;
      new FloatingText(this.x, this.y, "-$150");
      this.level = 3;
      this.loadTexture("rapidtower3");
      this.bulletDamage = 3;
      this.shootTimerMax = 3;

    }
  }
};
