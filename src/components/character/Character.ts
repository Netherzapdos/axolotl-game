import Phaser from "phaser";

export default class Character {
	char: Phaser.Physics.Matter.Sprite;		// Global declarations and types
	cam: any;
	speed!: number;
	playerSpeed!: Phaser.Math.Vector2;
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys;	
	keyboard: any;
	rightStatus!: boolean; 
	leftStatus!: boolean; 

	constructor(scene: Phaser.Scene, x: number, y: number) 
	{
		this.char = scene.matter.add.sprite(x, y, 'character')	// Declare char in this class
		this.cam = scene.cameras.main;	// Declare cam in this class
		this.cursors = scene.input.keyboard.createCursorKeys();	// Declare cursors in this class
		this.keyboard = scene.input.keyboard.addKeys({
			'right': Phaser.Input.Keyboard.KeyCodes.D,
			'up': Phaser.Input.Keyboard.KeyCodes.W,
			'down': Phaser.Input.Keyboard.KeyCodes.S,
			'left': Phaser.Input.Keyboard.KeyCodes.A,
			'shift': Phaser.Input.Keyboard.KeyCodes.SHIFT
		})
		var rightStatus: boolean = false; // Has to be placed in here and not in move() below because move() is placed
		var leftStatus: boolean = false;  // in update() in MainMap, which means right/leftStatus will always be refreshed as false,
										  // so booleans won't work because it will stay as false each time move() is called.
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

		this.char.anims.create({
			key: 'run_right',
			frames: this.char.anims.generateFrameNames(
				'char_running_right', {
					start: 0,
					end: 7
				}),
				frameRate: 15,
				repeat: -1
		})
		this.char.anims.create({
			key: 'run_left',
			frames: this.char.anims.generateFrameNames(
				'char_running_left', {
					start: 0,
					end: 7
				}),
				frameRate: 15,
				repeat: -1
		})
		this.char.anims.play('idle', true);		// Plays idle animations by default
		this.char.setCircle(4); 	// Sets hitbox to circle
		this.char.setFixedRotation();	// Disable rotation of sprite when colliding
		this.cam.startFollow(this.char, true); 

		
		
	}


	move() 
	{
		this.speed = 0.20;	
		var runSpeed = 0.45;	
		this.playerSpeed = new Phaser.Math.Vector2; 
		
	// Declare cursors
		var upCursor = this.cursors.up; 
		var leftCursor = this.cursors.left; 
		var downCursor = this.cursors.down;
		var rightCursor = this.cursors.right;

		var W = this.keyboard.up;
		var A = this.keyboard.left;
		var S = this.keyboard.down;
		var D = this.keyboard.right;
		var shift = this.keyboard.shift;

		var WD = W.isDown && D.isDown
		var WA = W.isDown && A.isDown
		var SD = S.isDown && D.isDown
		var SA = S.isDown && A.isDown
		
		var upRightCursor = upCursor.isDown && rightCursor.isDown; 
		var upLeftCursor = upCursor.isDown && leftCursor.isDown; 
		var downRightCursor = downCursor.isDown && rightCursor.isDown;
		var downLeftCursor = downCursor.isDown && leftCursor.isDown;

		// // If cursors is not existing OR char is not existing, do nothing
		// if (!this.cursors || !this.char)
		// {
		// 	return
		// }

		// Prevents players from abruptly moving the opposite direction when holding the other direction
		if (rightCursor.isDown && leftCursor.isDown) {return}
		else if (D.isDown && A.isDown) {return}
		else if (upCursor.isDown && downCursor.isDown) {return}
		else if (W.isDown && S.isDown) {return}; 

		// Right
		if (rightCursor.isDown || D.isDown)
		{
			let anim = 'right'
			if (shift.isDown) {
				this.speed = runSpeed;
				anim = 'run_right';
			}
			this.playerSpeed.x = 1;
			this.char.anims.play(anim, true);	//True makes it play continuously when pressed
			rightCursor.on('up', () => {this.char.anims.play('idle', true)})	//Plays right-side idle when right cursor is released
			D.on('up', () => {this.char.anims.play('idle', true)});
			this.rightStatus = true; 
			this.leftStatus = false; 
			 
		} 
		
		// Left
		else if (leftCursor.isDown || A.isDown)
		{	 
			let anim = 'left'
			if (shift.isDown) {
				this.speed = runSpeed;
				anim = 'run_left';
			}
			this.playerSpeed.x = -1;
			this.char.anims.play(anim, true);
			leftCursor.on('up', () => {this.char.anims.play('idle2', true)});
			A.on('up', () => {this.char.anims.play('idle2', true)});
			this.rightStatus = false;
			this.leftStatus = true; 
			
		} 
		// Up
		else if (this.rightStatus == undefined || this.leftStatus == undefined) {	
			if (upCursor.isDown || W.isDown)		
			{
				let anim = 'right';
				if (shift.isDown) 
				{
					this.speed = runSpeed;
					anim = 'run_right';
				}
				this.playerSpeed.y = -1;
				this.char.anims.play(anim, true);
				upCursor.on('up', () => {this.char.anims.play('idle', true)});
				W.on('up', () => {this.char.anims.play('idle', true)});
			}
			else if (downCursor.isDown || S.isDown)
			{
				let anim = 'right'
				if (shift.isDown) 
				{
					this.speed = runSpeed;
					anim = 'run_right';
				}
				this.playerSpeed.y = 1;
				this.char.anims.play(anim, true);
				downCursor.on('up', () => {this.char.anims.play('idle', true)});
				S.on('up', () => {this.char.anims.play('idle', true)});
			}
		}
		else if (this.rightStatus == true)
		{
			if (upCursor.isDown || W.isDown)
			{
				let anim = 'right';
				if (shift.isDown) 
				{
					this.speed = runSpeed;
					anim = 'run_right';
				}
				this.playerSpeed.y = -1;
				this.char.anims.play(anim, true);
				upCursor.on('up', () => {this.char.anims.play('idle', true)});
				W.on('up', () => {this.char.anims.play('idle', true)}); 
			}
			else if (downCursor.isDown || S.isDown)
			{
				let anim = 'right'
				if (shift.isDown) {
					this.speed = runSpeed;
					anim = 'run_right';
				}
				this.playerSpeed.y = 1;
				this.char.anims.play(anim, true);
				downCursor.on('up', () => {this.char.anims.play('idle', true)});
				S.on('up', () => {this.char.anims.play('idle', true)});
			}
			
		}
		else if (this.leftStatus == true)
		{
			if (upCursor.isDown || W.isDown)
			{
				let anim = 'left';
				if (shift.isDown) 
				{
					this.speed = runSpeed;
					anim = 'run_left';
				}
				this.playerSpeed.y = -1;
				this.char.anims.play(anim, true);
				upCursor.on('up', () => {this.char.anims.play('idle2', true)});
				W.on('up', () => {this.char.anims.play('idle2', true)}); 
			}
			else if (downCursor.isDown || S.isDown)
			{
				let anim = 'left'
				if (shift.isDown) {
					this.speed = runSpeed;
					anim = 'run_left';
				}
				this.playerSpeed.y = 1;
				this.char.anims.play(anim, true);
				downCursor.on('up', () => {this.char.anims.play('idle2', true)});
				S.on('up', () => {this.char.anims.play('idle2', true)});
			}
			
		}
		

		// Up Right
		if (upRightCursor || WD)
		{
			this.playerSpeed.x = 1;
			this.playerSpeed.y = -1;
		}
		// Up Left
		if (upLeftCursor || WA)
		{
			this.playerSpeed.x = -1;
			this.playerSpeed.y = -1; 
		}
		// Down Left
		if (downLeftCursor || SA)
		{
			this.playerSpeed.x = -1;
			this.playerSpeed.y = 1; 
		}
		// Down Right
		if (downRightCursor || SD)
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