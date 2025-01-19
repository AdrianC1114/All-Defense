function Base(x,y){
  Phaser.Sprite.call(this,game,x,y,"base");
  game.add.existing(this);
  this.anchor.setTo(0.5,0.5);
  this.HP = 100;
  this.healthbar = game.add.graphics(this.x,this.y);
  game.objectgroup.add(this);
}
Base.prototype = Object.create(Phaser.Sprite.prototype);
Base.prototype.update = function(){
  this.healthbar.beginFill(0xFF0000);
  this.healthbar.drawRect(-40,-50,80,10);
  this.barWith = (this.HP / 100) * 80;
  this.healthbar.beginFill(0x66ff33);
  if(this.HP > 0){
    this.healthbar.drawRect(-40,-50,this.barWith,10);
  }
  if(this.HP < 0){
    this.HP = 0;
  }
}
