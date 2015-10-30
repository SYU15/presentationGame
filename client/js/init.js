var platforms;
var player;

var cursors;

var dialogText;

var preload = function() {
  game.load.spritesheet('girl', 'assets/sprites/player/character_texture.png', 140, 178, 33);
  game.load.image('sky', 'assets/backgrounds/space2.jpg', 1024, 576);
  game.load.image('ground', 'assets/platforms/star_platform.jpg');

};

var create = function() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0, 0, 'sky');

  platforms = game.add.group();
  platforms.enableBody = true;

  var ground = platforms.create(0, game.world.height - 64, 'ground');
  ground.scale.setTo(4, 2);
  ground.body.immovable = true;

  var ledge1 = platforms.create(400, 400, 'ground');
  ledge1.body.immovable = true;

  ledge2 = platforms.create(-150, 250, 'ground');
  ledge2.body.immovable = true;

  player = game.add.sprite(10, 120, 'girl');
  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  player.anchor.setTo(0.5, 1);

  player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11], 5, true);
  player.animations.add('run', [12, 13, 14, 15, 16, 17, 18, 19], 30, true);
  player.animations.add('jumpUp', [32], 1, true);

  dialogText = game.add.text(16, 16, "Hi, I'm purple", { fontSize: '20px', fill: '#000', backgroundColor: 'white' });
  game.physics.arcade.enable(dialogText);

  cursors = game.input.keyboard.createCursorKeys();
};


var update = function() {
  game.physics.arcade.collide(player, platforms);

  game.physics.arcade.moveToObject(dialogText, player, 100);

  player.body.velocity.x = 0;
  
  if (cursors.left.isDown) {
      //  Move to the left
      player.body.velocity.x = -200;
      player.scale.x = -1;
      player.animations.play('run');
  } else if (cursors.right.isDown) {
      //  Move to the right
      player.body.velocity.x = 200;
      player.scale.x = 1;
      player.animations.play('run');
  } else if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -350;
  } else if(cursors.up.isDown && !player.body.touching.down){
    player.animations.play('jumpUp');
  } else {
    player.animations.play('idle');
  }
  
};

var game = new Phaser.Game(1024, 576, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update });
