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
        this.cursors = this.input.keyboard.createCursorKeys();
        this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // BACKGROUND
        this.bgTile = this.add.tileSprite(0,0, this.stage.bounds.width, this.cache.getImage('bg').height, 'bg');

        // PLATFORMS
        this.platforms = this.add.group();
        this.platforms.enableBody = true;

        // WALLS
        this.walls = this.add.group();
        this.walls.enableBody = true;
        var leftWall = this.walls.create(0, 0, 'wall');
        var rightWall = this.walls.create(this.world.width-32, 0, 'wall');
        leftWall.body.immovable = true;
        rightWall.body.immovable = true;
        leftWall.scale.setTo(1,2);
        rightWall.scale.setTo(1,2);

        // Ready Player One
        this.player = this.add.sprite(48, this.world.height - 250, 'ninjaClimbing');

        this.physics.arcade.enable(this.player);

        this.player.anchor.setTo(.5, .5);
        this.player.body.gravity.x = -40000;
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
        this.player.body.velocity.y = this.maxVelocity;

        this.camera.follow(this.player);

        this.jumpButton.onDown.add(this.jump, this);
    },


    // ==================== UPDATE ====================================//
    update: function() {

        this.physics.arcade.collide(this.player, this.platforms);
        this.physics.arcade.collide(this.player, this.walls);

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












