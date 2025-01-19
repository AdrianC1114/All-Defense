function Bullet(x,y,directionx,directiony,angle,damage){
  Phaser.Sprite.call(this,game,x,y,"bullet");
  game.add.existing(this);
  this.anchor.setTo(0.5,0.5);
  this.directionx = directionx;
  this.directiony = directiony;
  this.bulletDamage = 3;
  this.angle = angle;
  this.damage = damage;
  game.objectgroup.add(this);
}
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.update = function(){
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
}
