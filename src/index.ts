import Phaser from 'phaser'

import Preloader from './Preloader'
import MainMap from './MainMap'


export default new Phaser.Game({
	type: Phaser.AUTO,
	parent: 'app',
	width: 750,
	height: 325,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true
		},
	},
	scene: [Preloader, MainMap],
	scale: {zoom: 2}

	
})


// 750
// 325