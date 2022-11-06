
import Phaser from "phaser";

import MainMap from "./MainMap";
import Preloader from "./Preloader";

const game = new Phaser.Game({
	type: Phaser.AUTO,
	width: 750,
	height: 325,
	backgroundColor: "#000c1f",
	parent: "game-container",
	pixelArt: true,
  
	// Load our yet-to-be-created custom scene
	scene: [Preloader, MainMap],
	scale: {zoom: 2}, 
  
	// Load up Matter and optionally configure it
	physics: {
	  default: "matter",
	  matter: {
		gravity: { y: 0 }, // This is the default value, so we could omit this
		
		// Enable debug graphics, so we can see the bounds of each physics 
		// object in our scene. Note: this can slow things down, so be sure 
		// to turn it off when you aren't debugging
		debug: true
	  }
	}
  });