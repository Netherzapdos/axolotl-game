import Phaser from "phaser";
import Player from "./Player";

export default class MainMap extends Phaser.Scene
{
	// class cursors has ! to tell TS not to worry about it not having init
	// classes here will make them global scope

	// Enables use of keyboard keys
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	// Makes the char have physics and decalred as a sprite
	private char!: Phaser.Physics.Arcade.Sprite;

	constructor() 
	{
		super('mainmap')
	}

	preload()
	{
		this.cursors = this.input.keyboard.createCursorKeys();
	}

	create()
	{
		// Declare map and tileset
		const map = this.make.tilemap({ key: 'island' })
		const tileset = map.addTilesetImage('spr_tileset_sunnysideworld', 'tiles')
	
		// Add layers
		const water = map.createLayer('Water', tileset);
		map.createLayer('Sand', tileset); 
		map.createLayer('Land', tileset);
		map.createLayer('Dirt', tileset);
		map.createLayer('Decor', tileset);
		map.createLayer('Plots', tileset);
		map.createLayer('House', tileset);


		// Set Collisions
		water.setCollisionByProperty({ collision: true })
		
		

		// Collisions debug 
		const debugGraphics = this.add.graphics().setAlpha(0.75);
		water.renderDebug(debugGraphics, {
		tileColor: null, // Color of non-colliding tiles
		collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
		faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
		});



		// Set bounds
		// this.cameras.main.setPosition(0, 0)
		this.cameras.main.setBounds(0, 0, 992, 800) 
		this.physics.world.setBounds(0, -5, 1005, 810)



		// Create character
		this.char = this.physics.add.sprite(440, 340, 'character')
		this.char.body.setSize(14, 14) //Reduces hitbox size
		
		// Character world bounds collision
		this.char.setCollideWorldBounds(true); 
		
		// Character movement animations
		this.char.anims.create({
			key: 'idle',
			frames: this.char.anims.generateFrameNumbers(
				'char_idle', { 
					start: 0, 
					end: 8
				}),
				frameRate: 15,
				repeat: -1
		})

		this.char.anims.create({
			key: 'right',
			frames: this.char.anims.generateFrameNames(
				'char_walking_right', {
					start: 0,
					end: 7
				}),
				frameRate: 15,
				repeat: -1
		})
		
		this.char.anims.create({
			key: 'left',
			frames: this.char.anims.generateFrameNames(
				'char_walking_left', {
					start: 0,
					end: 7
				}),
				frameRate: 15,
				repeat: -1
		})
		// Plays idle animation by default
		this.char.anims.play('idle')

		// This collision needs to be added at the very bottom of everything
		// Character collides with water layer
		this.physics.add.collider(this.char, water)

		
		 	
		
	
		
		

	}


update(time: number, delta: number): void 
{
	// If cursors is not existing OR char is not existing, do nothing

	const speed = 75;
	const playerSpeed = new Phaser.Math.Vector2(); 

	if (!this.cursors || !this.char)
	{
		return
	}

	// Right
	if (this.cursors.right.isDown)
	{
		playerSpeed.x = 1;
		this.char.anims.play('right', true); //True makes it play onPress
	} 
	// Left
	else if (this.cursors.left.isDown)
	{
		playerSpeed.x = -1;
		this.char.anims.play('left', true);
	} 
	// Up
	else if (this.cursors.up.isDown)
	{
		playerSpeed.y = -1;
		this.char.anims.play('right', true);
	} 
	//Down
	else if (this.cursors.down.isDown)
	{
		playerSpeed.y = 1;
		this.char.anims.play('right', true);
	} 
	//No Movement
	else
	{
		playerSpeed.x = 0;
		playerSpeed.y = 0;
		this.char.anims.play('idle', true);
		this.char.body.offset.x = 1; // Set hitbox offset
	}

	// Up Right
	if (this.cursors.up.isDown && this.cursors.right.isDown)
	{
		playerSpeed.x = 1;
		playerSpeed.y = -1; 
	}
	// Up Left
	if (this.cursors.up.isDown && this.cursors.left.isDown)
	{
		playerSpeed.x = -1;
		playerSpeed.y = -1; 
	}
	// Down Left
	if (this.cursors.down.isDown && this.cursors.left.isDown)
	{
		playerSpeed.x = -1;
		playerSpeed.y = 1; 
	}
	// Down Right
	if (this.cursors.down.isDown && this.cursors.right.isDown)
	{
		playerSpeed.x = 1;
		playerSpeed.y = 1; 
	}
	
	playerSpeed.normalize();	// Had to be placed above scale to work
	playerSpeed.scale(speed); 	// Uses const speed as reference for value
	this.char.setVelocity(playerSpeed.x, playerSpeed.y);	// Velocity is tied to const playerSpeed.x & .y
	this.cameras.main.startFollow(this.char, true)	// Follow character in center of screen
	
}

}