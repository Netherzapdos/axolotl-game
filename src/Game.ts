import Phaser from "phaser";
import Character from "./components/character/Character";
import Axolotl from "./components/Axolotl";
import Map from "./components/map/Map"

export default class Game extends Phaser.Scene 
{
	char!: Character;
	map!: Map;
	axl!: Axolotl; 
	charSensors!: void; 
	hitman!: Phaser.GameObjects.Sprite;


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
		this.char = new Character(this, 440, 340);	// Classes should be declared with "this.x" first, 
		this.char.anims(); 							// then declare the variable at the top of this scene (sample for char above)
													// this allows the Class to be used in global scope.									
													
	// Create Axolotl
		this.axl = new Axolotl(this, 540, 450); 			// Declare axl in this scene and pass details to Axolotls Class
		this.axl.playAnim('wild_yellow', 'axl_idle', 0, 5);	// Play animation
		// ** Redo this setup to be similar to Character class **

	// Create Custom Cursor/Mouse Pointer
		this.input.setDefaultCursor('url(/images/cursors/main_cursor.cur), pointer'); 

	// NPC Test
		this.hitman = this.add.sprite(340, 340, 'chicken_hitman')
			this.hitman.anims.create({
				key: 'idle',
				frames: this.hitman.anims.generateFrameNumbers(
					'chicken_hitman', { 
						start: 0, 
						end: 8
					}),
					frameRate: 15,
					repeat: -1
			})
			this.hitman.anims.play('idle'); 

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
