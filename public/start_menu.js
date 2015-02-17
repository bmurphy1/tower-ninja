var TowerNinja = {};

TowerNinja.StartMenu = function(game) {
  this.background;
}

TowerNinja.StartMenu.prototype = {

  preload: function() {
    this.load.bitmapFont('titlefont', 'fonts/title_font.png', 'fonts/title_font.fnt');
    this.load.image('titlescreen', 'images/titlescreen.png');
  },

  create: function() {
    this.background = this.add.image(0,0, 'titlescreen');
    this.background.inputEnabled = true;
    this.background.events.onInputDown.addOnce(this.startGame, this);

    this.add.bitmapText(this.world.centerX-130, this.world.centerY, 'titlefont', 'Tower Ninja', 48);
    this.add.bitmapText(this.world.centerX-110, this.world.centerY+90, 'titlefont', 'Press space to jump.', 24);
    this.add.bitmapText(this.world.centerX-122, this.world.centerY+120, 'titlefont', 'Click anywhere to start!', 24);

    // this.startGame();
  },

  startGame: function () {
    this.state.start('Game');
  }
};