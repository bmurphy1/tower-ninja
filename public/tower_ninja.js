var game = new Phaser.Game(375, 667, Phaser.AUTO, 'gameContainer', {preload: preload, create: create, update: update});


// ======================= PRELOAD ================================= //
function preload() {
    game.load.image('sky', 'images/sky.png');
    game.load.image('ground', 'images/platform.png');
    game.load.image('wall', 'images/wall.png');
    game.load.image('star', 'images/star.png');
    game.load.spritesheet('dude', 'images/dude.png', 32, 48);
};

var platforms;
var walls;
var player;
var cursors;
var jumpButton;


// ======================== CREATE ================================= //
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

//    this.physics.arcade.gravity.x = 300;

    sky = game.add.sprite(0,0,'sky');
    sky.scale.setTo(1,2);

    // PLATFORMS
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    var ceiling = platforms.create(0, 0, 'ground');

    ground.scale.setTo(2,2);
    ceiling.scale.setTo(2,2);

    ground.body.immovable = true;
    ceiling.body.immovable = true;

    // LEDGES
//    var ledge = platforms.create(200, 400, 'ground');
//    game.physics.arcade.enable(ledge);
//    ledge.body.immovable = true;
//    ledge.body.velocity.x = -25;
//    var ledge = platforms.create(-150, 200, 'ground');
//    ledge.body.immovable = true;

    // WALLS
    walls = game.add.group();
    walls.enableBody = true;
    var leftWall = walls.create(0, 0, 'wall');
    var rightWall = walls.create(game.world.width-32, 0, 'wall');
    leftWall.body.immovable = true;
    rightWall.body.immovable = true;
    leftWall.scale.setTo(1,2);
    rightWall.scale.setTo(1,2);

    // Ready Player One
    player = game.add.sprite(48, game.world.height - 150, 'dude');

    game.physics.arcade.enable(player);

    player.anchor.setTo(.5, .5);
    player.body.gravity.x = 40000;
    player.body.collideWorldBounds = true;
    player.body.velocity.x = 50;

    player.animations.add('left', [0,1,2,3], 10, true);
    player.animations.add('right', [5,6,7,8], 10, true);

    game.camera.follow(player);

};


// ==================== UPDATE ====================================//
function update() {

    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, walls);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
//        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
//        player.animations.play('right');
    } else {
//        player.animations.stop();
        player.frame = 4;
    }

    // Jumping back and forth
    if (jumpButton.isDown && (player.body.touching.right || player.body.touching.left)) {
        jump(player);

    }
}


// ========================= OTHER ================================ //
function jump(player) {
    console.log('jump pressed');
    if (player.body.gravity.x > 0) {
        player.scale.x = -1;
        player.body.velocity.x = -player.body.velocity.x;
        player.body.gravity.x = -player.body.gravity.x;
    } else {
        player.scale.x = 1;
        player.body.velocity.x = -player.body.velocity.x;
        player.body.gravity.x = -player.body.gravity.x;
    }
}


















