import Phaser from "phaser";
import Map from "./components/map/Map"

import Character from "./components/character/Character";
import Axolotl from "./components/axolotl/Axolotl";
import ChickenMan from "./components/npcs/chickenman";


import Modal from "./Modal";

export default class Game extends Phaser.Scene 
{
	char!: Character;
	map!: Map;
	axl!: Axolotl; 
	hitman!: Phaser.GameObjects.Sprite;
	test: any;
	chickenMan!: ChickenMan;

	
    constructor()
    {
        super('game')
    }
    preload()
	{
     
    }
  
    create() 
	{

	// Create Map
		this.map = new Map(this); 

	// Create character
		this.char = new Character(this);	// Classes should be declared with "this.x" first, 
		this.char.create(this, 440, 340);   // then declare the variable at the top of this scene (sample for char above)
		this.char.anims(); 					// this allows the Class to be used in global scope.		
																						
													
	// Create Axolotl
		this.axl = new Axolotl(); 			// Declare axl in this scene and pass details to Axolotls Class
		this.axl.create(this, 520, 450)
		this.axl.anims('wild_yellow', 'axl_idle', 0, 5);	// Play animation
		

	// Create Custom Cursor/Mouse Pointer
		this.input.setDefaultCursor('url(/images/cursors/main_cursor.cur), pointer'); 

	// Chicken NPC
		this.chickenMan = new ChickenMan();
		this.chickenMan.create(this); 
		this.chickenMan.anims(); 
	
	}
	

	update() 
	{
		this.char.move(); 

		// var dist = Phaser.Math.Distance.Between(this.char.getPositionX(), this.char.getPositionY(), this.axl.getPositionX(), this.axl.getPositionY());
		// console.log(dist); 

		// if (dist > 100) {
		// 	console.log('more than 100')
		// }
		// else {
		// 	console.log('less than 100')
		// }


		// It is finally working - now just need to only enable this whenever the character is moving, and not always updating
		// Detection of how much the distance is, is also working. 
		// i.e. in Axolotl Class. Maybe if you're about to click the axolotl, check first if the player sprite is near enough to
		// the axolotl itself? If not, do nothing. If it is, invoke. 

	
		
	}
}
