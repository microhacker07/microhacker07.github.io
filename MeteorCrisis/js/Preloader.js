var MeteorCrisis = {
	highscore: 0,
	deviceInput: 0
};

MeteorCrisis.StatePreloader = function (game) {
	
    this.text = null;

};

MeteorCrisis.StatePreloader.prototype = {
	
	init: function() {
		
		console.log("Starting Meteor Crisis 0.7.0");
	
		this.text = this.add.text(this.world.centerX, this.world.centerY, "Loading: 0%", { font: "32px Arial", fill: "#ffffff", align: "center" });
		this.text.anchor.x = 0.5;
		
	},

    preload: function() {
		console.log("Loading Assets");
		
		//Load all the images
		this.load.path = 'assets/images/';
        this.load.image('background', 'space.png');
		this.load.image('hexagonBackground', 'Blue_Hexagon-Black_Background.png');
		this.load.image('stars1', 'stars1.png');
		this.load.image('stars2', 'stars2.png');
        this.load.image('logo', 'MeteorCrisis_logo.png');
		this.load.image('company_logo', 'micro_games.png');
		this.load.spritesheet('button', 'button.png', 160, 80);
		this.load.image('joystick_background', 'joystick_background.png');
		this.load.image('joystick', 'joystick.png');
		this.load.image('laser', 'laser.png');
		this.load.image('meteor', 'meteor.png');
		this.load.image('alien_flyby', 'alien_flyby.png');
		this.load.spritesheet('meteorParticle', 'meteorParticle.png', 6, 4);
		this.load.image('laser', 'laser.png');
		this.load.spritesheet('explosion', 'explosion.png', 35, 35);
		this.load.spritesheet('spacecraft', 'spacecraft.png', 82, 48);
		
		this.load.onFileComplete.add(this.fileLoaded, this);
    },
	
	fileLoaded: function(progress) {
		
		console.log("Loading: " + progress + "%");
        this.text.text = "Loading: " + progress + "%";

    },

    create: function() {
		console.log("Loading Done");
		this.checkCookie();
		//Start the next state
        this.state.start('MainMenu');
		
    },
	
	checkCookie: function () {
		var highscore=getCookie("cookieScore");
		if (highscore != 0) {
			MeteorCrisis.highscore = highscore;
		} else {
		if (highscore != 0 && highscore != null) {
			MeteorCrisis.highscore = 0;
		}
		}
	}

};


