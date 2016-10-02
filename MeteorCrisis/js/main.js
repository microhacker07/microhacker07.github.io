game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-game');

game.state.add('Preloader', MeteorCrisis.StatePreloader);
game.state.add('SplashScreen', MeteorCrisis.StateSplashScreen);
game.state.add('MainMenu', MeteorCrisis.StateMainMenu);
game.state.add('HelpMenu', MeteorCrisis.StateHelpMenu);
game.state.add('ControlMenu', MeteorCrisis.StateHelpMenu);
game.state.add('Game', MeteorCrisis.StateGame);

game.state.start('Preloader');