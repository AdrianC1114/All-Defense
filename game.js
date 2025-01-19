var loaded = false;
game.currentlevel = 0;

function create() {

  //Scale the game to the device it's on
  game.scale.setUserScale(window.innerWidth/960, window.innerHeight/640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  game.enemyList = [];
  game.bumperlist = [];

  game.objectgroup = game.add.group();
  game.textgroup = game.add.group();
  game.levels =["Level1", "Level2"];
  game.map = game.add.tilemap(game.levels[game.currentlevel]);
  game.map.addTilesetImage("tilesheet","tilesheet");
  game.map.createLayer("Tile Layer 1");
  createMapObjects(game.map);
  //game.Base = new Base(900,50);
  game.money = 100;
  game.popupText = game.add.bitmapText(game.world.centerX,game.world.centerY,"font","You're Dead");
  game.popupText.visible = false;
  game.moneyText = game.add.bitmapText(25,25,"font","placeholder");
  game.textgroup.add(game.moneyText);
  game.textgroup.add(game.popupText);
  game.victory = false;
  game.defeat = false;
  game.gamewon = false;
  game.towermenu = new towerPicker((game.width/2)-315,game.height-70);
}

function update(){
  game.world.bringToTop(game.objectgroup);
  game.world.bringToTop(game.textgroup);
  if(game.input.activePointer.isDown){
    if(game.gamewon){
      game.state.start("ending");
    }
    else if(game.defeat || game.victory){
      game.state.restart();
    }
  }
  game.moneyText.text = "$" + game.money;
  console.log("test");
  if(loaded && game.Base.HP <= 0){
    game.popupText.visible = true;
    game.defeat = true;
  }
  if(game.enemyList.length <= 0 && !game.defeat && !game.victory){
    console.log("Winner");
    game.popupText = "Victory";
    game.popupText.visible = true;
    game.victory = true;
    if(game.currentlevel < game.levels.length-1){
      game.currentlevel ++;
    }
    else{
      game.currentlevel = 0;
      game.gamewon = true;
    }

    localStorage.setItem("level", game.currentlevel);
  }
}
function createMapObjects(map){
  for(var i = 0; i < map.objects["Object Layer 1"].length; i++){
    var object = map.objects["Object Layer 1"][i];
    if(object.type == "bumper"){
      var newbumper = game.add.sprite(object.x,object.y,null);
      newbumper.width = object.width;
      newbumper.height = object.height;
      newbumper.direction = object.properties.direction;
      game.bumperlist.push(newbumper);
    }
    if (object.gid === 94) {
      new Towerbase(object.x + 32, object.y - 32);
    }
    else if(object.gid === 44){
      new TankEnemy(object.x + 32, object.y - 32);
    }
    else if(object.gid === 55){
      new FastEnemy(object.x + 32, object.y - 32);
    }
    else if(object.gid === 76){
      new Enemy(object.x + 32, object.y -32);
    }
    else if (object.gid === 75) {
      console.log ("baseadded");
      game.Base = new Base(object.x +32, object.y - 32);
    }
  }
  loaded = true;
}
