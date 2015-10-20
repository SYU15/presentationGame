var platforms;
var player;

var cursors;

var score = 0;
var scoreText;

var preload = function() {
  game.load.spritesheet('girl', 'assets/sprites/player/character_texture.png', 140, 180);
};

var create = function() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // game.add.sprite(0, 0, 'sky');

  // //can group together similar objects
  // platforms = game.add.group();
  // platforms.enableBody = true;

  // //create the ground
  // var ground = platforms.create(0, game.world.height - 64, 'ground');
  // ground.scale.setTo(2, 2);
  // //if not immovable, platform would fall when player collided on it
  // ground.body.immovable = true;

  // //creates ledges
  // var ledge1 = platforms.create(400, 400, 'ground');
  // ledge1.body.immovable = true;

  // ledge2 = platforms.create(-150, 250, 'ground');
  // ledge2.body.immovable = true;

  player = game.add.sprite(10, 120, 'girl');
  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  player.anchor.setTo(0.5, 1);

  //can add animations if sprite
  // player.animations.add('walk');
  player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11], 5, true);
  player.animations.add('run', [12, 13, 14, 15, 16, 17, 18, 19], 30, true);


  // corn = game.add.group();
  // corn.enableBody = true;
  // for (var i = 0; i < 12; i++) {
  //     //  Create a kernel inside of the 'corn' group
  //     var kernel = corn.create(i * 70, 0, 'kernel');

  //     //  Let gravity do its thing
  //     kernel.body.gravity.y = 6;

  //     //  This just gives each kernel a slightly random bounce value
  //     kernel.body.bounce.y = 0.7 + Math.random() * 0.2;
  // }

  // scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  //add input controls
  cursors = game.input.keyboard.createCursorKeys();
};


var update = function() {
  // game.physics.arcade.collide(player, platforms);
  // game.physics.arcade.collide(corn, platforms);
  // game.physics.arcade.overlap(player, corn, collectKernel, null, this);

  //clears velocity every frame
  player.body.velocity.x = 0;
  
  if (cursors.left.isDown) {
      //  Move to the left
      player.body.velocity.x = -150;
      player.scale.x = -1;
      player.animations.play('run');
  } else if (cursors.right.isDown) {
      //  Move to the right
      player.body.velocity.x = 150;
      player.scale.x = 1;
      player.animations.play('run');
  } else {
    player.animations.play('idle');
      // player.animations.stop();
  }
  
  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -350;
  }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update });
