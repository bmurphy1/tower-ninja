var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', {preload: preload, create: create, update: update});


// ======================= PRELOAD ================================= //
function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('wall', 'assets/wall.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
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

    game.add.sprite(0,0,'sky');

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
    var rightWall = walls.create(game.world.width-64, 0, 'wall');
    leftWall.body.immovable = true;
    rightWall.body.immovable = true;
    leftWall.scale.setTo(1,2);
    rightWall.scale.setTo(1,2);

    // Ready Player One
    player = game.add.sprite(48, game.world.height - 150, 'dude');

    game.physics.arcade.enable(player);

    player.anchor.setTo(.5, .5);
    player.body.gravity.x = 20000;
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
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }

    // Jumping back and forth
    if (cursors.up.isDown && (player.body.touching.down || player.body.touching.up)) {
        if (player.body.gravity.y > 0) {
            player.body.velocity.y = -350;
            player.body.gravity.y = -500;
        } else {
            player.body.velocity.y = 350;
            player.body.gravity.y = 500;
        }
    }
}


// ========================= OTHER ================================ //
    } else {
    }
}


















