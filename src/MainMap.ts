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
		map.createLayer('Water', tileset);
		map.createLayer('Sand', tileset); 
		map.createLayer('Land', tileset);
		map.createLayer('Dirt', tileset);
		map.createLayer('Decor', tileset);
		map.createLayer('Plots', tileset);
		map.createLayer('House', tileset);

		// Set bounds
		this.cameras.main.setBounds(0, 0, 992, 800) 
		this.physics.world.setBounds(0, -5, 1005, 810)





		// Add collisions
		



		// Create character
		
		this.char = this.physics.add.sprite(50, 50, 'character')
		

		this.char.setCollideWorldBounds(true); 

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

		this.char.anims.play('idle')

		
		 
		
		
	
		
		

	}


update(time: number, delta: number): void 
{
	// If cursors is not existing OR char is not existing, do nothing

	const speed = 900;

	if (!this.cursors || !this.char)
	{
		return
	}

	if (this.cursors.right.isDown)
	{
		this.char.setVelocity(speed, 0)
		this.char.anims.play('right', true) //True makes it play onPress
	} 
	else if (this.cursors.left.isDown)
	{
		this.char.setVelocity(-speed, 0)
		this.char.anims.play('left', true)
	} 
	else if (this.cursors.up.isDown)
	{
		this.char.setVelocity(0, -speed)
		this.char.anims.play('right', true)
	} 
	else if (this.cursors.down.isDown)
	{
		this.char.setVelocity(0, speed)
		this.char.anims.play('right', true)
	} 
	else
	{
		this.char.setVelocity(0, 0)
		this.char.anims.play('idle', true)
	}

	this.cameras.main.startFollow(this.char, true)
	// this.cameras.main.setBounds(0, 0, 750, 325, false)
}

}