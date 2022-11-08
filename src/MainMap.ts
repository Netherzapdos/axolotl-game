import Phaser from "phaser";

export default class MainMap extends Phaser.Scene 
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys; 
    private char!: Phaser.Physics.Matter.Sprite;
    private axl!: Phaser.Physics.Matter.Sprite; 

    constructor()
    {
        super('mainmap')
    }
    preload() {
      this.cursors = this.input.keyboard.createCursorKeys();
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
		// this.cameras.main.setPosition(0, 0)
		this.cameras.main.setBounds(0, 0, 992, 800) 
		this.matter.world.setBounds(0, -5, 1005, 810)



		// Create character
		this.char = this.matter.add.sprite(440, 340, 'character')
		this.char.setCircle(5);   // Set hitbox to circle
		this.char.setFixedRotation()  // Disable rotation/inertia
    
    
		
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
			key: 'idle2',
			frames: this.char.anims.generateFrameNumbers(
				'char_idle2', { 
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
		this.char.anims.play('idle', true) // Default idle animation if no key is pressed


    // Axolotl
    this.axl = this.matter.add.sprite(550, 450, 'wild_yellow')
    this.axl.anims.create({
      key: 'axl_idle',
      frames: this.axl.anims.generateFrameNames(
        'wild_yellow', {
          start: 0,
          end: 5
        }),
        frameRate: 5,
        repeat: -1	// Loop
    })
    this.axl.anims.play('axl_idle');
    this.axl.setFixedRotation();






	}


update() 
{
	const speed = 0.25;
	const playerSpeed = new Phaser.Math.Vector2(); 

	var rightCursor = this.cursors.right;
	var upCursor = this.cursors.up;
	var downCursor = this.cursors.down;
	var leftCursor = this.cursors.left; 
	
	// If cursors is not existing OR char is not existing, do nothing
	if (!this.cursors || !this.char)
	{
		return
	}

	
	// Right
	else if (this.cursors.right.isDown)
	{
		playerSpeed.x = 1;
		this.char.anims.play('right', true);	//True makes it play continuously when pressed
		rightCursor.on('up', () => {this.char.anims.play('idle', true)})	//Plays right-side idle when right cursor is released
	} 
	// Left
	else if (this.cursors.left.isDown)
	{
		playerSpeed.x = -1;
		this.char.anims.play('left', true);
		leftCursor.on('up', () => {this.char.anims.play('idle2', true)});
	} 
	// Up
	else if (this.cursors.up.isDown)
	{
		playerSpeed.y = -1;
		this.char.anims.play('right', true);
		upCursor.on('up', () => {this.char.anims.play('idle', true)});
	} 
	//Down
	else if (this.cursors.down.isDown)
	{
		playerSpeed.y = 1;
		this.char.anims.play('left', true);
		downCursor.on('up', () => {this.char.anims.play('idle2', true)});
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