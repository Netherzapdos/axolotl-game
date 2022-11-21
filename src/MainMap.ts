import Phaser from "phaser";
import Character from "./components/character/Character";
import Axolotl from "./components/Axolotl";

export default class MainMap extends Phaser.Scene 
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys; 
	private char!: any; 
    

    constructor()
    {
        super('mainmap')
    }
    preload()
	{
     
    }
  
    create() {

		

     // Declare map and tileset
		const map = this.make.tilemap({ key: 'island' });
		const tileset = map.addTilesetImage('spr_tileset_sunnysideworld', 'tiles');
	
		// Add layers
		const water = map.createLayer('Water', tileset);
			water.setCollisionByProperty({ collision: true }) //Set collisions
		const sand = map.createLayer('Sand', tileset); 
      		sand.setCollisionByProperty({ collision: true })
		const land = map.createLayer('Land', tileset);
      		land.setCollisionByProperty({ collision: true })
		map.createLayer('Dirt', tileset);
		map.createLayer('Decor', tileset);
		map.createLayer('Plots', tileset);
		map.createLayer('House', tileset);

		// Convert Tiled tiles into Matter tiles (to apply new physics)
		this.matter.world.convertTilemapLayer(water);
		this.matter.world.convertTilemapLayer(sand);
		this.matter.world.convertTilemapLayer(land);
		

	// Set bounds
		this.cameras.main.setBounds(0, 0, 992, 800) 
		this.matter.world.setBounds(0, -5, 1005, 810)



	// Create character
		this.char = new Character(this, 440, 340);	// Classes should be declared with "this.x" first, 
		this.char.anims(); 							// then declare the variable at the top of this scene (sample for char above)
													// this allows the Class to be then used anywhere here. 
	
	


	// Create Axolotl
		var yellowAxl = new Axolotl(this, 540, 450); // Declare axl in this scene and pass details to Axolotls Class
		yellowAxl.playAnim('wild_yellow', 'axl_idle', 0, 5);	// Play animation
		

}


update() 
	{
	this.char.move(); 
  	}
}
