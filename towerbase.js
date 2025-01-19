function Towerbase(x,y){
    Phaser.Sprite.call(this,game,x,y,"towerbase");
    game.add.existing(this);
    this.anchor.set(0.5,0.5);
    this.height = 64;
    this.width = 64;
    this.inputEnabled = true;
    this.events.onInputDown.add(this.tap,this);
    this.cost = 10;
    game.objectgroup.add(this);
}
Towerbase.prototype = Object.create(Phaser.Sprite.prototype);
Towerbase.prototype.tap = function(){
  if(game.money >= this.cost){
    if(game.towersSelected === 0){
      new PerciTower(this.x,this.y);
    }
    else if (game.towersSelected === 1) {
      new ExplosionTower(this.x,this.y);
    }
    else if (game.towersSelected === 2) {
      new SpikeTower(this.x,this.y);
    }
    else if (game.towersSelected === 3) {
      new SlowTower(this.x,this.y);
    }
    else if (game.towersSelected === 4) {
      new RapidTower(this.x,this.y);
    }
    else if (game.towersSelected === 5) {
      new DoubleTower(this.x,this.y);
    }
    else if (game.towersSelected === 6) {
      new Tower(this.x,this.y);
    }
    else if (game.towersSelected === 7) {
      new ElectricTower(this.x,this.y);
    }
    else if (game.towersSelected === 8) {
      new MultiTower(this.x,this.y);
    }
    new FloatingText(this.x, this.y, "-$"+this.cost);
    this.destroy();
    game.money -= this.cost;
  }
}
