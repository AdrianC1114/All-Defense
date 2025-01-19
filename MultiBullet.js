function MultiBullet(x,y,directionx,directiony,angle,damage){
  Bullet.call(this,x,y,directionx,directiony,angle,damage);
  this.loadTexture("modbullet2");
}
MultiBullet.prototype = Object.create(Bullet.prototype);
MultiBullet.prototype.update = function(){
  this.x += this.directionx;
  this.y += this.directiony;
  for (var i=0; i<game.enemyList.length; i++){
    if(collide(this,game.enemyList[i])){
      game.enemyList[i].HP -= this.bulletDamage;
      game.enemyList[i].blink();
      this.destroy();
    }
  }
  if(this.alive && !this.inWorld){
    this.destroy();
  }
};
