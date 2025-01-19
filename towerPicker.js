function towerPicker(x,y){
  game.towers = ["percitower","explotower","spiktower","slowtower","rapidtower","doubletower","tower","Eletrictower","multitower"];
  game.towersSelected = 0;
  game.towerButtons = [];
  var buttonx = x;
  var buttony = y;
  for(var i = 0; i < game.towers.length; i++){
    game.towerButtons[i] = game.add.button(buttonx,buttony,"menu",this.pickTower,{towernum:i});
    game.towerButtons[i].anchor.set(1,0);
    var towerSprite = game.add.sprite(game.towerButtons[i].centerX,game.towerButtons[i].centerY,game.towers[i]);
    towerSprite.anchor.set(0.5,0.5);
    buttonx += 70;

  }
  game.towerSelection = game.add.sprite(x,y,"menu2");
  game.towerSelection.anchor.set(1,0);
}
towerPicker.prototype.pickTower = function(towernum){
  game.towerSelection.x = game.towerButtons[this.towernum].x;
  game.towersSelected = this.towernum;
}
