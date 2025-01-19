var game = new Phaser.Game(960, 640, Phaser.AUTO, 'game', { preload: preload, create: menuCreate, update: null }, false, false);


function preload() {
game.load.image("percitower","assets/towers/FantasyTower01.png");
game.load.image("percitower2","assets/towers/FantasyTower01L2.png");
game.load.image("percitower3","assets/towers/FantasyTower01L3.png");
game.load.image("explotower","assets/towers/FantasyTower02.png");
game.load.image("explotower2","assets/towers/FantasyTower02L2.png");
game.load.image("explotower3","assets/towers/FantasyTower02L3.png");
game.load.image("spiktower","assets/towers/FantasyTower03.png");
game.load.image("spiktower2","assets/towers/FantasyTower03L2.png");
game.load.image("spiktower3","assets/towers/FantasyTower03L3.png");
game.load.image("slowtower","assets/towers/ModernTower01.png");
game.load.image("slowtower2","assets/towers/ModernTower01L2.png");
game.load.image("slowtower3","assets/towers/ModernTower01L3.png");
game.load.image("rapidtower","assets/towers/ModernTower02.png");
game.load.image("rapidtower2","assets/towers/ModernTower02L2.png");
game.load.image("rapidtower3","assets/towers/ModernTower02L3.png");
game.load.image("doubletower","assets/towers/ModernTower03.png");
game.load.image("doubletower2","assets/towers/ModernTower03L2.png");
game.load.image("doubletower3","assets/towers/ModernTower03L3.png");
game.load.image("tower","assets/towers/SciFiTower01.png");
game.load.image("tower2","assets/towers/SciFiTower01L2.png");
game.load.image("tower3","assets/towers/SciFiTower01L3.png");
game.load.image("Eletrictower","assets/towers/SciFiTower02.png");
game.load.image("Eletrictower2","assets/towers/SciFiTower02L2.png");
game.load.image("Eletrictower3","assets/towers/SciFiTower02L3.png");
game.load.image("multitower","assets/towers/SciFiTower03.png");
game.load.image("multitower2","assets/towers/SciFiTower03L2.png");
game.load.image("multitower3","assets/towers/SciFiTower03L3.png");
game.load.image("fanbullet","assets/bullets/FantasyProjectile01.png");
game.load.image("fanbullet2","assets/bullets/FantasyProjectile02.png");
game.load.image("fanbullet3","assets/bullets/FantasyProjectile03.png");
game.load.image("modbullet","assets/bullets/ModernProjectile01.png");
game.load.image("modbullet2","assets/bullets/ModernProjectile02.png");
game.load.image("modbullet3","assets/bullets/ModernProjectile03.png");
game.load.image("bullet","assets/bullets/SciFiProjectile01.png");
game.load.image("bullet2","assets/bullets/SciFiProjectile02.png");
game.load.image("bullet3","assets/bullets/SciFiProjectile03.png");
game.load.image("smallbullet","assets/bullets/bullet_3.png");
game.load.image("missil","assets/bullets/bullet_6.png");
game.load.image("explosion","assets/bullets/explosion.png");
game.load.image("menu","assets/towers/towerMenuBackground.png");
game.load.image("menu2","assets/towers/towerMenuSelection.png");
game.load.spritesheet("enemy","assets/enemies/SciFiEnemy01.png",64,64,2);
game.load.spritesheet("enemy2","assets/enemies/ModernEnemy04.png",64,64,2);
game.load.spritesheet("enemy3","assets/enemies/ModernEnemy02.png",64,64,2);
game.load.image("base","assets/tiles/Antenna.png");
game.load.image("tilesheet","assets/tilesheet.png");
game.load.tilemap("Level1","levels/Level1.json",null,Phaser.Tilemap.TILED_JSON);
game.load.tilemap("Level2","levels/Level2.json",null,Phaser.Tilemap.TILED_JSON);
game.load.bitmapFont("font","assets/fonts/font3.png","assets/fonts/font3.fnt");
game.load.image("towerbase","assets/tiles/BuildPoint.png");
game.load.image("snipe","assets/bullets/bullet_4.png");
game.load.image("mainmenubackground", "assets/menu/mainmenu.png");
game.load.image("newgamebutton", "assets/menu/BtnNewGame.png");
game.load.image("continuebutton", "assets/menu/BtnContinue.png");
game.load.image("winningbackground", "assets/menu/winscreen.png");
game.load.image("mainmenubutton", "assets/menu/BtnMainMenu.png");
}

function menuCreate(){
  game.scale.setUserScale(window.innerWidth/960, window.innerHeight/640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  var background = game.add.sprite(0,0,"mainmenubackground");

  var newgamebutton = game.add.button(game.world.centerX, game.world.centerY + 200, "newgamebutton", newgame);
  newgamebutton.anchor.set(.5,.5);

  var continuebutton = game.add.button(game.world.centerX, game.world.centerY + 100, "continuebutton", continuegame);
  continuebutton.anchor.set(.5,.5);
  game.state.add("game", {preload:null, create:create, update:update});
  game.state.add("ending", {preload:null, create:endingcreate, update:null});
  game.state.add("mainmenu", {preload:null, create:menuCreate, update:null});
}

function newgame(){
  game.state.start("game");
}

function continuegame(){
  if(localStorage.getItem("level")){
    game.currentlevel = localStorage.getItem("level");
  }
  game.state.start("game");
}

function endingcreate(){
  game.scale.setUserScale(window.innerWidth/960, window.innerHeight/640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  var background = game.add.sprite(0,0,"winningbackground");

  var mainmenubutton = game.add.button(game.world.centerX, game.world.centerY + 200, "mainmenubutton", restartgame);
  mainmenubutton.anchor.set(.5,.5);
}

function restartgame(){
  game.state.start("mainmenu");
}
