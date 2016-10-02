MeteorCrisis.StateSplashScreen = function (game) {
	
	var company_logo;
	var game_logo;
	var presents;
	
};

MeteorCrisis.StateSplashScreen.prototype = {
	
	create: function() {
		
		company_logo = this.add.sprite(0, 0, 'company_logo');
		company_logo.scale.setTo( 3, 3);
		company_logo.x = this.world.centerX - company_logo.width/2;
		company_logo.y = this.world.centerY - company_logo.height/2;
		company_logo.smoothed = false;
		company_logo.alpha = 1;
		
		presents = this.add.text(0, 0, "Presents", {font: "50px Courier New", fill: "#FFFFFF"});
		presents.alignTo(company_logo, Phaser.BOTTOM_CENTER, 0, 10);
		presents.alpha = 1;
		
		game_logo = this.add.sprite(0, 0, 'logo');
		game_logo.scale.setTo( 1.5, 1.5);
		game_logo.x = this.world.centerX - game_logo.width/2;
		game_logo.y = this.world.centerY - game_logo.height/2;
		game_logo.smoothed = false;
		game_logo.alpha = 0;
		
		this.add.tween(company_logo).to( { alpha: 0 }, 1000, "Linear", true, 2500);
		this.add.tween(presents).to( { alpha: 0 }, 1000, "Linear", true, 2500);
		this.add.tween(game_logo).to( {alpha: 1 }, 1000, "Linear",true, 3000);
		
		this.time.events.add(7500, this.nextState, this);
	},
	nextState: function() {
		this.state.start('MainMenu');
	}
	
};