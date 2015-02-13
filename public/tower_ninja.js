var TowerNinja = {};

TowerNinja.Game = function(game) {
    this.platforms;
    this.walls;
    this.player;
    this.cursors;
    this.jumpButton;
    this.maxVelocity = -500;
    this.bgTile;
};

TowerNinja.Game.prototype = {

    // ======================= PRELOAD ================================= //
    preload: function() {
        this.load.image('bg', 'images/bg.png');
        this.load.image('ground', 'images/platform.png');
        this.load.image('wall', 'images/wall.png');
        this.load.image('star', 'images/star.png');
        this.load.image('ninjaClimbing', 'images/ninjaClimbing.gif');
    },

    // ======================== CREATE ================================= //
    create: function() {

        this.physics.startSystem(Phaser.Physics.ARCADE);
        cursors = this.input.keyboard.createCursorKeys();
        jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        // this.physics.arcade.gravity.x = 300;
        this.bgTile = this.add.tileSprite(0,0, this.stage.bounds.width, this.cache.getImage('bg').height, 'bg');

        // sky = this.add.sprite(0,0,'sky');
        // sky.scale.setTo(1,2);

        // PLATFORMS
        platforms = this.add.group();
        platforms.enableBody = true;
        // var ground = platforms.create(0, this.world.height - 64, 'ground');
        // var ceiling = platforms.create(0, 0, 'ground');

        // ground.scale.setTo(2,2);
        // ceiling.scale.setTo(2,2);

        // ground.body.immovable = true;
        // ceiling.body.immovable = true;

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
        this.player = this.add.sprite(48, this.world.height - 250, 'ninjaClimbing');

        this.physics.arcade.enable(this.player);

        this.player.anchor.setTo(.5, .5);
        this.player.body.gravity.x = -40000;
        this.player.body.gravity.y = 1000;
        this.player.body.collideWorldBounds = true;
        this.player.body.velocity.y = this.maxVelocity;

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

        this.bgTile.tilePosition.y += 1;
    },


    // ========================= OTHER ================================ //
    jump: function() {
        console.log('jump pressed');
        this.player.body.velocity.y = this.maxVelocity;
        if (this.touchingWalls(this.player)) {
            if (this.player.body.gravity.x > 0) {
                this.player.scale.x = 1;
                this.player.body.velocity.x = -this.player.body.velocity.x;
                this.player.body.gravity.x = -this.player.body.gravity.x;
            } else {
                this.player.scale.x = -1;
                this.player.body.velocity.x = -this.player.body.velocity.x;
                this.player.body.gravity.x = -this.player.body.gravity.x;
            }
        }
    },

    touchingWalls: function(obj) {
        return obj.body.touching.right || obj.body.touching.left
    }
}












