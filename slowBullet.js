function SlowBullet(x,y,directionx,directiony,angle,damage,level){
  Bullet.call(this,x,y,directionx,directiony,angle,damage);
  this.x = x;
  this.y = y;
  this.level = level;
  this.loadTexture("smallbullet");
}
SlowBullet.prototype = Object.create(Bullet.prototype);
SlowBullet.prototype.update = function(){
  this.x += this.directionx;
  this.y += this.directiony;
  for (var i=0; i<game.enemyList.length; i++){
    if(collide(this,game.enemyList[i])){
      game.enemyList[i].HP -= this.bulletDamage;
      if(this.level == 1){
        game.enemyList[i].slow(20);
      }
      else if (this.level == 2) {
        game.enemyList[i].slow(25);
      }
      else if (this.level == 3) {
        game.enemyList[i].slow(30);
      }
      game.enemyList[i].blink();
      this.destroy();
    }
  }
  if(this.alive && !this.inWorld){
    this.destroy();
  }
};
