export default class Character {
	char: any;
	cam: any;
	speed!: number;
	playerSpeed!: Phaser.Math.Vector2;
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys;	// Declare cursors variable globally
	constructor(scene: any, x: number, y: number) {
		this.char = scene.matter.add.sprite(x, y, 'character')	// Declare char in this class
		this.cam = scene.cameras.main;	// Declare cam in this class
		this.cursors = scene.input.keyboard.createCursorKeys();	// Declare cursors in this class
		
	}
	anims() 
	{
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
				repeat: -1,
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
		this.char.anims.play('idle', true);		// Plays idle animations by default
		this.char.setCircle(2); 	// Sets hitbox to circle
		this.char.setFixedRotation();	// Disable rotation of sprite when colliding
		this.cam.startFollow(this.char, true); 
		
	}


	move() 

	{
		this.speed = 0.25; 
		this.playerSpeed = new Phaser.Math.Vector2; 


	// Declare cursors
		var rightCursor = this.cursors.right;
		var upCursor = this.cursors.up;
		var downCursor = this.cursors.down;
		var leftCursor = this.cursors.left; 

		var upRightCursor = upCursor.isDown && rightCursor.isDown; 
		var upLeftCursor = upCursor.isDown && leftCursor.isDown; 
		var downRightCursor = downCursor.isDown && rightCursor.isDown;
		var downLeftCursor = downCursor.isDown && leftCursor.isDown;

		// // If cursors is not existing OR char is not existing, do nothing
		// if (!this.cursors || !this.char)
		// {
		// 	return
		// }

		// Right
		if (rightCursor.isDown)
		{
			this.playerSpeed.x = 1;
			this.char.anims.play('right', true);	//True makes it play continuously when pressed
			rightCursor.on('up', () => {this.char.anims.play('idle', true)})	//Plays right-side idle when right cursor is released
		} 
		// Left
		else if (leftCursor.isDown)
		{
			this.playerSpeed.x = -1;
			this.char.anims.play('left', true);
			leftCursor.on('up', () => {this.char.anims.play('idle2', true)});
		} 
		// Up
		else if (upCursor.isDown)
		{
			this.playerSpeed.y = -1;
			this.char.anims.play('right', true);
			upCursor.on('up', () => {this.char.anims.play('idle', true)});
		} 
		//Down
		else if (downCursor.isDown)
		{
			this.playerSpeed.y = 1;
			this.char.anims.play('left', true);
			downCursor.on('up', () => {this.char.anims.play('idle2', true)});
		} 
		// Up Right
		if (upRightCursor)
		{
			this.playerSpeed.x = 1;
			this.playerSpeed.y = -1;
		}
		// Up Left
		if (upLeftCursor)
		{
			this.playerSpeed.x = -1;
			this.playerSpeed.y = -1; 
			
		}
		// Down Left
		if (downLeftCursor)
		{
			this.playerSpeed.x = -1;
			this.playerSpeed.y = 1; 
		}
		// Down Right
		if (downRightCursor)
		{
			this.playerSpeed.x = 1;
			this.playerSpeed.y = 1; 
		}
		this.playerSpeed.normalize();	// Had to be placed above scale to work
		this.playerSpeed.scale(this.speed); 	// Uses const speed as reference for value
		this.char.setVelocity(this.playerSpeed.x, this.playerSpeed.y);	// Velocity is tied to const playerSpeed.x & .y
	}



	// move(x, y) {
	// 	this.sprite.setPosition(x, y)
	// 	this.mask.setPosition(x, y)
	// 	this.healthBar.setPosition(x, y)
	// }

	// addToContainer(container){
	// 	container.add(this.sprite)
	// 	container.add(this.healthBar)
	// }
}


// export default class Player {
//     constructor(name){
//         this.sprites = []
//         this.animations = {}
//         this.walkingParticleEffects = []
//         this.name = name
//     }
    
//     walk(){
//         this.animations['walk'].play()
//     }
// }