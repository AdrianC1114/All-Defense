function SpikeBullet(x,y,directionx,directiony,angle,damage, lives){
  Bullet.call(this,x,y,directionx,directiony,angle,damage);
  this.x = x;
  this.y = y;
  this.damagedEnemies = [];
  this.lives = lives;
  this.loadTexture("fanbullet3");
}
SpikeBullet.prototype = Object.create(Bullet.prototype);
SpikeBullet.prototype.update = function(){
  this.x += this.directionx;
  this.y += this.directiony;
  for (var i=0; i<game.enemyList.length; i++){
    if(collide(this,game.enemyList[i])&& this.damagedEnemies[i]!= game.enemyList[i]){
      this.damagedEnemies[i] = game.enemyList[i];
      game.enemyList[i].HP -= this.bulletDamage;
      game.enemyList[i].blink();
      this.lives --;
      if(this.lives > 0){
          this.destroy();
      }
    }
  }
  if(this.alive && !this.inWorld){
    this.destroy();
  }
};
