function ExplosionBullet(x,y,directionx,directiony,angle,damage,level){
  Bullet.call(this,x,y,directionx,directiony,angle,damage);
  this.x = x;
  this.y = y;
  this.level = level;
  this.loadTexture("missil");
}
ExplosionBullet.prototype = Object.create(Bullet.prototype);
ExplosionBullet.prototype.update = function(){
  this.x += this.directionx;
  this.y += this.directiony;
  for (var i=0; i<game.enemyList.length; i++){
    if(collide(this,game.enemyList[i])){
      this.explode();
      this.destroy();
    }
  }
  if(this.alive && !this.inWorld){
    this.destroy();
  }
}
ExplosionBullet.prototype.explode = function(){
  var explosion = game.add.sprite(this.x,this.y,"explosion");
  explosion.anchor.set(0.5,0.5);
  for(i=0; i < game.enemyList.length; i++){
    if(collide(explosion,game.enemyList[i])){
      game.enemyList[i].HP -= this.damage;
      game.enemyList[i].blink();
    }
  }
  game.time.events.add(100,function(){explosion.destroy();})
}
