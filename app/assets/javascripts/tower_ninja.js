var game = new Phaser.Game(800, 600, Phaser.AUOT, 'gameContainer', {preload: preload, create: create, update: update});

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
};

var platforms;
var player;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0,0,'sky');

    platforms = game.add.group();

    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'ground');
    var ceiling = platforms.create(0, 0, 'ground');

    ground.scale.setTo(2,2);
    ceiling.scale.setTo(2,2);

    ground.body.immovable = true;
    ceiling.body.immovable = true;

    var ledge = platforms.create(200, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 200, 'ground');
    ledge.body.immovable = true;

    // Ready Plater One
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    game.physics.arcade.enable(player);

//    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0,1,2,3], 10, true);
    player.animations.add('right', [5,6,7,8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
};

function update() {
    game.physics.arcade.collide(player, platforms);

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

function toggleGravity(g) {
    if (g > 0) {
        return -g;
    } else {
        return g;
    }
}





















