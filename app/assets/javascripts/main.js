// Initialize Phase, create a 400x490px game
//   insert into element id 'gameDiv',
//   don't know what Phaser.AUTO is yet
var game = new Phaser.Game(400 ,490, Phaser.AUTO, 'gameDiv');

var mainState = {

  preload: function() {
    // This function will be executed at the beginning
    // That's where we load the game's assets
    // Set background color
    game.stage.backgroundColor = '#71c5cf';
    // Load bird sprite
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
  },
  create: function() {
    // This function is called after the preload function
    // Here we set up the game, display sprites, etc.
    // Set the physics system
    // TODO: read docs for other physics types
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Add score lable
    this.score = 0;
    this.labelScore = game.add.text(20, 20, '0', {font: '30px Arial', fill: '#ffffff'});

    // Display the bird on the screen
    this.bird = this.game.add.sprite(100, 245 ,'bird');

    // Add gravity to the bird to make it fall
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    // Call #jump when spacekey is hit
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    // Create pipes using 'group'
    this.pipes = game.add.group(); // Create a group
    this.pipes.enableBody = true;  // Add physics to the group
    this.pipes.createMultiple(20, 'pipe');  // Create 20 pipes

    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

  },
  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic
    if (this.bird.inWorld == false)
      this.restartGame();

    game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
  },
  jump: function() {
    this.bird.body.velocity.y = -350;
  },

  restartGame: function() {
    // Start the main state which restarts the game
    game.state.start('main');
  },

  addOnePipe: function(x, y) {
    var pipe = this.pipes.getFirstDead();
    pipe.reset(x,y);
    pipe.body.velocity.x = -200;
    pipe.checkWorldBounds = true; // Some event binding?
    pipe.outOfBoundsKill = true; // Needed for this event?
  },

  addRowOfPipes: function() {
    // Choose int for hole
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes
    // How do we know to add 6? Size of height of div / pipe.png?
    for (var i = 0; i < 8; i++)
      // why 8 here?
      if (i != hole && i != hole + 1)
        this.addOnePipe(400, i* 60 + 10)

    this.score += 1
    this.labelScore.text = this.score;
  }
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');
