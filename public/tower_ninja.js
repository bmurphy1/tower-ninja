var TowerNinja = {};

TowerNinja.Game = function(game) {
    this.platforms;
    this.walls;
    this.player;
    this.cursors;
    this.jumpButton;
};

TowerNinja.Game.prototype = {

    // ======================= PRELOAD ================================= //
    preload: function() {
        this.load.image('sky', 'images/sky.png');
        this.load.image('ground', 'images/platform.png');
        this.load.image('wall', 'images/wall.png');
        this.load.image('star', 'images/star.png');
        this.load.spritesheet('dude', 'images/dude.png', 32, 48);
    },

    // ======================== CREATE ================================= //
    create: function() {

        this.physics.startSystem(Phaser.Physics.ARCADE);
        cursors = this.input.keyboard.createCursorKeys();
        jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        // this.physics.arcade.gravity.x = 300;

        sky = this.add.sprite(0,0,'sky');
        sky.scale.setTo(1,2);

        // PLATFORMS
        platforms = this.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, this.world.height - 64, 'ground');
        var ceiling = platforms.create(0, 0, 'ground');

        ground.scale.setTo(2,2);
        ceiling.scale.setTo(2,2);

        ground.body.immovable = true;
        ceiling.body.immovable = true;

        // LEDGES
    //    var ledge = platforms.create(200, 400, 'ground');
    //    this.physics.arcade.enable(ledge);
    //    ledge.body.immovable = true;
    //    ledge.body.velocity.x = -25;
    //    var ledge = platforms.create(-150, 200, 'ground');
    //    ledge.body.immovable = true;

        // WALLS
        walls = this.add.group();
        walls.enableBody = true;
        var leftWall = walls.create(0, 0, 'wall');
        var rightWall = walls.create(this.world.width-32, 0, 'wall');
        leftWall.body.immovable = true;
        rightWall.body.immovable = true;
        leftWall.scale.setTo(1,2);
        rightWall.scale.setTo(1,2);

        // Ready Player One
        this.player = this.add.sprite(48, this.world.height - 150, 'dude');

        this.physics.arcade.enable(this.player);

        this.player.anchor.setTo(.5, .5);
        this.player.body.gravity.x = 40000;
        this.player.body.collideWorldBounds = true;
        this.player.body.velocity.x = 50;

        this.player.animations.add('left', [0,1,2,3], 10, true);
        this.player.animations.add('right', [5,6,7,8], 10, true);

        this.camera.follow(this.player);

        jumpButton.onDown.add(this.jump, this);
    },


    // ==================== UPDATE ====================================//
    update: function() {

        this.physics.arcade.collide(this.player, platforms);
        this.physics.arcade.collide(this.player, walls);

        this.player.body.velocity.x = 0;

        // jumpButton.onDown.add(jump(player), this);

    //     if (cursors.left.isDown) {
    //         player.body.velocity.x = -150;
    // //        player.animations.play('left');
    //     } else if (cursors.right.isDown) {
    //         player.body.velocity.x = 150;
    // //        player.animations.play('right');
    //     } else {
    // //        player.animations.stop();
    //         player.frame = 4;
    //     }

        // Jumping back and forth
    //     if (jumpButton.onDown {
    //         jump(player);

    //     }
    },


    // ========================= OTHER ================================ //
    jump: function() {
        console.log('jump pressed');
        if (this.player.body.touching.right || this.player.body.touching.left) {
            if (this.player.body.gravity.x > 0) {
                this.player.scale.x = -1;
                this.player.body.velocity.x = -this.player.body.velocity.x;
                this.player.body.gravity.x = -this.player.body.gravity.x;
            } else {
                this.player.scale.x = 1;
                this.player.body.velocity.x = -this.player.body.velocity.x;
                this.player.body.gravity.x = -this.player.body.gravity.x;
            }
        }
    }
}












