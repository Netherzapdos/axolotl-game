
import Phaser, { Physics } from "phaser";

import Preloader from "./Preloader";
import Menu from "./Menu";
import MenuCredits from "./components/menu_options/Credits";
import Game from "./Game";



const game = new Phaser.Game({
	type: Phaser.AUTO,
	width: 700, // Used to be 750, change this back if size-issues occur
	height: 325,	// 325
	backgroundColor: "#000c1f",
	parent: "game",
	pixelArt: true,
	antialias: false,
  
	// Load our yet-to-be-created custom scene
	scene: [Preloader, Menu, MenuCredits, Game],
	scale: {zoom: 2, parent: 'game', autoCenter: Phaser.Scale.CENTER_BOTH}, 
  
	physics: {
	  default: "matter",
	  matter: {
		gravity: { y: 0 }, 
		debug: false
		// {
		// 	showAxes: false,
		// 	showAngleIndicator: false,
		// }
		
	  }
	}

  });