function SnipeBullet(x,y,directionx,directiony,angle,damage,level){
  Bullet.call(this,x,y,directionx,directiony,angle,damage);
  this.x = x;
  this.y = y;
  this.level = level;
  this.loadTexture("snipe");
}
SnipeBullet.prototype = Object.create(Bullet.prototype);
