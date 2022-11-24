import Phaser from "phaser";
import Character from "./components/character/Character";
import Axolotl from "./components/Axolotl";
import Map from "./components/map/Map"

export default class Game extends Phaser.Scene 
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys; 
	private char!: any; 
	map!: Map;
    

    constructor()
    {
        super('mainmap')
    }
    preload()
	{
     
    }
  
    create() {

	// Create Map
		this.map = new Map(this); 

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
