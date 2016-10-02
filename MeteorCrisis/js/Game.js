MeteorCrisis.StateGame = function(game) {

	//Variables
	var stars1;
	var stars2;

    var player;
	var weapon;
	
	//var alien_flyby;
	//var alien_weapon;
	
	var meteors;
	var meteorDifficultly;
	
	var score;
	var scoreText;	

	var fireButton;
	var cursors;

	var KeyW;
	var KeyS;
	var KeyA;
	var KeyD;
	
	var KeyDebug;
	
	var showDebug;
};



MeteorCrisis.StateGame.prototype = {

    create: function() {

		this.physics.startSystem(Phaser.Physics.ARCADE);

		//Adds Simple Background
        background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
		stars1 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'stars1');
		stars2 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'stars2');

		//Player Laser Gun
		weapon = this.add.weapon(-1, 'laser');
		weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		weapon.bulletSpeed = 750;
		weapon.fireRate = 800;

		player = this.add.sprite(45, this.world.centerY, 'spacecraft');
		player.animations.add('enginesOn', [0, 1], 5, true);

		weapon.trackSprite(player, 82, 24, true);
		/*
		alien_weapon = this.add.weapon(-1, 'laser');
		alien_weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		alien_weapon.bulletSpeed = 750;
		alien_weapon.fireRate = 800;
		alien_weapon.bulletAngleOffset = 0;
		alien_weapon.autofire = true;
		
		alien_flyby = this.add.sprite(800, 300, 'alien_flyby');
		alien_weapon.trackSprite(alien_flyby, 0, 0, true);
		*/
		meteors = this.add.group();
		//meteors.enableBody = true;
		for (var i = 0; i < 20; i++)
		{
			var meteor = meteors.create(-85, 0, 'meteor');
			meteor.scale.setTo(2, 2);
		}
		meteorDifficultly = 1500;
		
		game.physics.arcade.enable([player, meteors, weapon]);
		
		player.body.setSize(56, 42, 13, 3);
		player.body.collideWorldBounds = true;
		
		this.time.events.loop(meteorDifficultly, this.createMeteor, this);
		
		score = 0;
		scoreText = game.add.text(16, 16, 'SCORE: 0', { fontSize: '32px', fill: '#FFF' });

		cursors = this.input.keyboard.createCursorKeys();
		fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		KeyW = this.input.keyboard.addKey(Phaser.Keyboard.W);
		KeyS = this.input.keyboard.addKey(Phaser.Keyboard.S);
		KeyA = this.input.keyboard.addKey(Phaser.Keyboard.A);
		KeyD = this.input.keyboard.addKey(Phaser.Keyboard.D);
		
		KeyDebug = this.input.keyboard.addKey(Phaser.Keyboard.TAB);
		KeyDebug.onDown.add(this.toggleDebug, this);
    },
	
	toggleDebug: function() {

		this.showDebug = (this.showDebug) ? false : true;
		
		if (!this.showDebug)
		{
			game.debug.reset();
		}
	},
	
	createMeteor: function() {
		dead_meteor = meteors.getFirstDead();
		if (dead_meteor) {
		var randomY = this.rnd.integerInRange(0, 520);
		dead_meteor.y = randomY;
		dead_meteor.x = 810;
		dead_meteor.revive();
		}
		meteorDifficultly -= 5;
	},
	
	update: function() {
		//Scrolls Background
		background.tilePosition.x += -1.5;
		stars1.tilePosition.x += -1.6;
		stars2.tilePosition.x += -1.85;
		
		this.physics.arcade.overlap(weapon.bullets, meteors, this.laserHitMeteor, null, this);
		this.physics.arcade.overlap(player, meteors, this.meteorHitPlayer, null, this);
		
		player.body.velocity.y = 0;
		player.body.velocity.x = 0;
		if (MeteorCrisis.deviceInput == 0) 
		{
		if (cursors.down.isDown || KeyS.isDown)
		{
			//Move player down
			player.body.velocity.y = 250;

		}

		if (cursors.up.isDown || KeyW.isDown)
		{
			//Move player up
			player.body.velocity.y = -250;

		}

		if (cursors.left.isDown || KeyA.isDown)
		{
			//Move player left
			player.body.velocity.x = -250;

		}

		if (cursors.right.isDown || KeyD.isDown)
		{
			//Move player right
			player.body.velocity.x = 250;

		}

		if (fireButton.isDown)
        {
			//Fire weapon
            weapon.fire();
        }
		}
		
		//alien_flyby.body.velocity.x = -50;

		//Moves the meteors
		meteors.setAll('x', -5, true, true, 1);
		//Kills each meteor when they hit the edge
		meteors.forEach(this.checkMeteor, this, true);
		
		//alien_weapon.bulletAngleOffset = this.physics.arcade.angleBetween(alien_weapon, player);
		
	},

	checkMeteor: function(meteor) {
        if (meteor.x < -85)
        {
            meteor.kill();
        }
	},
	
	render: function() {
		//The debug color: 0x33FF00
		if (this.showDebug)
		{
		//game.debug.body();
		game.debug.text( "Debug is ON", 16, 16 );
		game.debug.text( "Meteor difficultly: " + meteorDifficultly, 16, 100 );
		game.debug.text(game.device.pixelRatio,16 , 150);
		game.debug.bodyInfo(player, 16, 200);
		game.debug.body(player);
		}
	},
	
	laserHitMeteor: function(bullet, meteor) {
		var meteorBits = this.game.add.emitter(meteor.x + 40, meteor.y + 40, 100);
		meteorBits.makeParticles('meteor');
		meteorBits.minParticleScale = 0.5;
		meteorBits.maxParticleScale = 1;
		meteorBits.gravity = 0;
		meteorBits.start(true, 1000, null, 5);
		
		var explosionMeteor = this.add.sprite(meteor.x - 20, meteor.y - 20, 'explosion');
		explosionMeteor.scale.setTo(3, 3);
		explosionMeteor.animations.add('explode', [0, 1, 2], 3, false);
		explosionMeteor.animations.play('explode');
		
		bullet.kill();
		meteor.x = -100;
		
		this.add.tween(meteorBits).to( { alpha: 0 }, 250, "Linear", true, 1000);
		this.add.tween(explosionMeteor).to( { alpha: 0 }, 500, "Linear", true, 500);
				
		score += 10;
		scoreText.text = 'SCORE: ' + score;
		
		meteorDifficultly -= 10;
	},
	meteorHitPlayer: function(player, meteor) {
		//Makes a clone of the player
		var playerClone = this.add.sprite(player.x, player.y, 'spacecraft');
		//Makes little meteors
		var meteorBits = this.game.add.emitter(meteor.x + 40, meteor.y + 40, 100);
		meteorBits.makeParticles('meteor');
		meteorBits.minParticleScale = 0.5;
		meteorBits.maxParticleScale = 1;
		meteorBits.gravity = 0;
		meteorBits.start(true, 1000, null, 5);
		//Create the Explosion!!
		var explosion = this.add.sprite(player.x - 41, player.y - 48, 'explosion');
		explosion.scale.setTo(4, 4);
		explosion.animations.add('explode', [0, 1 , 1, 2, 2], 3, false);
		explosion.animations.play('explode');
		
		weapon.trackSprite(player, -810, 24, true);
		
		player.kill();
		meteor.kill();

		this.add.tween(playerClone).to( { alpha: 0 }, 250, "Linear", true, 500);
		this.add.tween(meteorBits).to( { alpha: 0 }, 250, "Linear", true, 1000);
		this.add.tween(explosion).to( { alpha: 0 }, 750, "Linear", true, 1000);

		this.camera.shake();

		this.time.events.add(3000, this.gameOver, this);
	},

	gameOver: function () {
		
		if (score > MeteorCrisis.highscore)
        {
            MeteorCrisis.highscore = score;
			setCookie("cookieScore", score, 365);
        }

        this.state.start('MainMenu');

    }
};