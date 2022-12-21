import Phaser from "phaser";
 

export default class Character {
	char!: Phaser.Physics.Matter.Sprite;		// Global declarations and types
	cam: any;
	speed!: number;
	runSpeed!: number;
	playerSpeed!: Phaser.Math.Vector2;
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys;	
	keyboard: any;
	rightStatus!: boolean; 
	leftStatus!: boolean; 
	
	upBtn!: Phaser.GameObjects.Image;
	downBtn!: Phaser.GameObjects.Image;
	leftBtn!: Phaser.GameObjects.Image;
	rightBtn!: Phaser.GameObjects.Image;
	sprintBtn!: Phaser.GameObjects.Image;
	rightBtnDown!: boolean;
	leftBtnDown!: boolean;
	upBtnDown!: boolean;
	downBtnDown!: boolean;
	sprintBtnDown!: boolean;

	upCursor!: Phaser.Input.Keyboard.Key;
	leftCursor!: Phaser.Input.Keyboard.Key;
	downCursor!: Phaser.Input.Keyboard.Key;
	rightCursor!: Phaser.Input.Keyboard.Key;
	W: any;
	A: any;
	S: any;
	D: any;
	WD: any;
	WA: any;
	SD: any;
	SA: any;
	shift: any;
	upRightCursor: any;
	upLeftCursor: any;
	downRightCursor: any;
	downLeftCursor: any;
	



	constructor(scene: Phaser.Scene) 
	{	
		// Declare cam in this class
		this.cam = scene.cameras.main;	

		// Declare cursors in this class
		this.cursors = scene.input.keyboard.createCursorKeys();	
		this.keyboard = scene.input.keyboard.addKeys({
			'right': Phaser.Input.Keyboard.KeyCodes.D,
			'up': Phaser.Input.Keyboard.KeyCodes.W,
			'down': Phaser.Input.Keyboard.KeyCodes.S,
			'left': Phaser.Input.Keyboard.KeyCodes.A,
			'shift': Phaser.Input.Keyboard.KeyCodes.SHIFT
		})
		
	}

	create(scene: Phaser.Scene, x: number, y: number)
	{
		// Declare char in this class
		//@ts-ignore
		this.char = scene.matter.add.sprite(x, y, 'character', null, { label: 'character' })
			.setDepth(2); 	

		// Setup Sensors for the Character
		var Bodies = scene.matter.bodies

		// Set hitboxes for the character
		var circlePhysics = Bodies.circle(this.char.x, this.char.y, 5);
		var playerSensor = Bodies.circle(this.char.x, this.char.y, 20, { isSensor: true, label: 'playerSensor' });
		//@ts-ignore
		var farSensor = Bodies.circle(this.char.x, this.char.y, 100, { isSensor: true, label: 'farSensor' });

		// Create a sort of group of hitboxes
		//@ts-ignore
		var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
			parts: [ circlePhysics, playerSensor ],
			inertia: Infinity
		});
	
		// Make the character use the new group of hitboxes
		this.char.setExistingBody(compoundBody); 
		this.char.setOrigin(0.5, 0.6)	// Change main hitbox location
		this.char.setFixedRotation();	// Disable rotation of sprite when colliding
		this.cam.startFollow(this.char, true); 


		// **In the future if you wish to dynamically change the sensor settings, move this to a separate function, and
		// whenver you call that function, pass a new number for the sensor distance setting. That way it can change depending on passed param
	}

	// Collection of player animations
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
				'char_idle_left', { 
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

	}

	mobileControls(scene: Phaser.Scene)
	{
		const { width, height } = scene.scale; 

		// Add extra pointer so mobile players can use two fingers
		scene.input.addPointer(1)

		// Create and Add buttons to scene
		this.upBtn = scene.add.image(width * 0.45, height * 0.7, 'up_btn')
		.setDepth(3)
		.setScrollFactor(0)
		.setInteractive();

		this.downBtn = scene.add.image(this.upBtn.x, this.upBtn.y + 50, 'down_btn')
		.setDepth(1)
		.setScrollFactor(0)
		.setInteractive();

		this.leftBtn = scene.add.image(width * 0.40, height * 0.775, 'left_btn')
		.setDepth(1)
		.setScrollFactor(0)
		.setInteractive();

		this.rightBtn = scene.add.image(this.leftBtn.x + 70, this.leftBtn.y, 'right_btn')
		.setDepth(1)
		.setScrollFactor(0)
		.setInteractive();

		this.sprintBtn = scene.add.image(this.rightBtn.x + 70, this.rightBtn.y, 'sprint_btn')
		.setDepth(1)
		.setScrollFactor(0)
		.setInteractive();

		// Set states for the buttons
		this.rightBtnDown = false;
		this.leftBtnDown = false; 
		this.upBtnDown = false;
		this.downBtnDown = false; 
		this.sprintBtnDown = false; 

		// Create functions for whenever the buttons are pressed
		this.rightBtn.on('pointerover', () => this.rightBtnDown = true);
		this.rightBtn.on('pointerout', () => this.rightBtnDown = false); 
		this.leftBtn.on('pointerover', () => this.leftBtnDown = true);
		this.leftBtn.on('pointerout', () => this.leftBtnDown = false); 
		this.upBtn.on('pointerover', () => this.upBtnDown = true);
		this.upBtn.on('pointerout', () => this.upBtnDown = false);
		this.downBtn.on('pointerover', () => this.downBtnDown = true);
		this.downBtn.on('pointerout', () => this.downBtnDown = false);
		this.sprintBtn.on('pointerover', () => this.sprintBtnDown = true); 
		this.sprintBtn.on('pointerout', () => this.sprintBtnDown = false); 
	}

	
	
	
	// Function that handles player movement
	move() 
	{
		this.speed = 0.40;	// 15 - adjusted in compensation of Firebase server lag // 0.40 live game
		this.runSpeed = 3; // 30 - same as above // 0.80 live game
		this.playerSpeed = new Phaser.Math.Vector2; 

		// Declare cursors
		this.upCursor = this.cursors.up; 
		this.leftCursor = this.cursors.left; 
		this.downCursor = this.cursors.down;
		this.rightCursor = this.cursors.right;

		this.W = this.keyboard.up;
		this.A = this.keyboard.left;
		this.S = this.keyboard.down;
		this.D = this.keyboard.right;
		this.shift = this.keyboard.shift;

		this.WD = this.W.isDown && this.D.isDown
		this.WA = this.W.isDown && this.A.isDown
		this.SD = this.S.isDown && this.D.isDown
		this.SA = this.S.isDown && this.A.isDown
		
		this.upRightCursor = this.upCursor.isDown && this.rightCursor.isDown; 
		this.upLeftCursor = this.upCursor.isDown && this.leftCursor.isDown; 
		this.downRightCursor = this.downCursor.isDown && this.rightCursor.isDown;
		this.downLeftCursor = this.downCursor.isDown && this.leftCursor.isDown;


		// Prevents players from abruptly moving the opposite direction when holding the other direction
		if (this.rightCursor.isDown && this.leftCursor.isDown) {return}
		else if (this.D.isDown && this.A.isDown) {return}
		else if (this.upCursor.isDown && this.downCursor.isDown) {return}
		else if (this.W.isDown && this.S.isDown) {return}; 

		// Right
		if (this.rightCursor.isDown || this.D.isDown || this.rightBtnDown == true)
		{
			let anim = 'right';

			if (this.shift.isDown || this.sprintBtnDown == true) 
			{
				this.speed = this.runSpeed;
				anim = 'run_right';

				if (this.sprintBtnDown == true) // If Mobile Controls is enabled
				{this.sprintBtn.on('pointerout', () => this.sprintBtnDown = false);}
			}
			this.playerSpeed.x = 1
			this.char.anims.play(anim, true);	//True makes it play continuously when pressed
			this.rightCursor.on('up', () => {this.char.anims.play('idle', true)})	//Plays right-side idle when right cursor is released
			this.D.on('up', () => {this.char.anims.play('idle', true)});

				if (this.rightBtn == undefined)
				{
					// Do nothing 
				} else {
					this.rightBtn.on('pointerout', () => {this.char.anims.play('idle', true); this.rightBtnDown = false});
				}

			this.rightStatus = true; 
			this.leftStatus = false; 
		} 

		// Left
		else if (this.leftCursor.isDown || this.A.isDown || this.leftBtnDown == true)
		{	 
			let anim = 'left';

			if (this.shift.isDown || this.sprintBtnDown == true) 
			{
				this.speed = this.runSpeed;
				anim = 'run_left';

				if (this.sprintBtnDown == true)
				{this.sprintBtn.on('pointerout', () => this.sprintBtnDown = false);}
			}
			this.playerSpeed.x = -1
			this.char.anims.play(anim, true);	//True makes it play continuously when pressed
			this.leftCursor.on('up', () => {this.char.anims.play('idle2', true)})	//Plays right-side idle when right cursor is released
			this.A.on('up', () => {this.char.anims.play('idle2', true)});

				if (this.leftBtn == undefined)
				{
					// Do nothing 
				} else {
					this.leftBtn.on('pointerout', () => {this.char.anims.play('idle2', true); this.leftBtnDown = false});
				}

			this.rightStatus = false; 
			this.leftStatus = true; 
		} 

		// Up
		// If right & left status is not defined yet
		else if (this.rightStatus == undefined || this.leftStatus == undefined) {
			// If pressing Up w/ right & left status not defined yet
			if (this.upCursor.isDown || this.W.isDown || this.upBtnDown == true)		
			{

				let anim = 'right';

				if (this.shift.isDown || this.sprintBtnDown == true) 
				{
					this.speed = this.runSpeed;
					anim = 'run_right';

					if (this.sprintBtnDown == true)
					{this.sprintBtn.on('pointerout', () => this.sprintBtnDown = false);}
				}
				this.playerSpeed.y = -1;
				this.char.anims.play(anim, true);
				this.upCursor.on('up', () => {this.char.anims.play('idle', true)});
				this.W.on('up', () => {this.char.anims.play('idle', true)});

				if (this.upBtn == undefined)
				{
					// Do nothing 
				} else {
					this.upBtn.on('pointerout', () => {this.char.anims.play('idle', true); this.upBtnDown = false});
				}
			}
			// If pressing Down w/ right & left status not defined yet
			else if (this.downCursor.isDown || this.S.isDown || this.downBtnDown == true)
			{
				let anim = 'right';

				if (this.shift.isDown || this.sprintBtnDown == true) 
				{
					this.speed = this.runSpeed;
					anim = 'run_right';

					if (this.sprintBtnDown == true)
					{this.sprintBtn.on('pointerout', () => this.sprintBtnDown = false);}
				}
				this.playerSpeed.y = 1;
				this.char.anims.play(anim, true);
				this.downCursor.on('up', () => {this.char.anims.play('idle', true)});
				this.S.on('up', () => {this.char.anims.play('idle', true)});

				if (this.downBtn == undefined)
				{
					// Do nothing 
				} else {
					this.downBtn.on('pointerout', () => {this.char.anims.play('idle', true); this.downBtnDown = false});
				}
			}
		}
		// If right status is defined
		else if (this.rightStatus == true)
		{
			// If pressing Up with right status defined
			if (this.upCursor.isDown || this.W.isDown || this.upBtnDown == true)
			{
				let anim = 'right';

				if (this.shift.isDown || this.sprintBtnDown == true) 
				{
					this.speed = this.runSpeed;
					anim = 'run_right';

					if (this.sprintBtnDown == true)
					{this.sprintBtn.on('pointerout', () => this.sprintBtnDown = false);}
				}
				this.playerSpeed.y = -1;
				this.char.anims.play(anim, true);
				this.upCursor.on('up', () => {this.char.anims.play('idle', true)});
				this.W.on('up', () => {this.char.anims.play('idle', true)}); 

				if (this.upBtn == undefined)
				{
					// Do nothing 
				} else {
					this.upBtn.on('pointerout', () => {this.char.anims.play('idle', true); this.upBtnDown = false});
				}
			}
			// If pressing Down with right status defined
			else if (this.downCursor.isDown || this.S.isDown || this.downBtnDown == true)
			{
				let anim = 'right';

				if (this.shift.isDown || this.sprintBtnDown == true) 
				{
					this.speed = this.runSpeed;
					anim = 'run_right';

					if (this.sprintBtnDown == true)
					{this.sprintBtn.on('pointerout', () => this.sprintBtnDown = false);}
				}
				this.playerSpeed.y = 1;
				this.char.anims.play(anim, true);
				this.downCursor.on('up', () => {this.char.anims.play('idle', true)});
				this.S.on('up', () => {this.char.anims.play('idle', true)});

				if (this.downBtn == undefined)
				{
					// Do nothing 
				} else {
					this.downBtn.on('pointerout', () => {this.char.anims.play('idle', true); this.downBtnDown = false});
				}
			}
			
		}
		// If left status is defined
		else if (this.leftStatus == true)
		{
			// If pressing Up with left status defined
			if (this.upCursor.isDown || this.W.isDown || this.upBtnDown == true)
			{
				let anim = 'left';

				if (this.shift.isDown || this.sprintBtnDown == true) 
				{
					this.speed = this.runSpeed;
					anim = 'run_left';

					if (this.sprintBtnDown == true)
					{this.sprintBtn.on('pointerout', () => this.sprintBtnDown = false);} 
				}
				this.playerSpeed.y = -1;
				this.char.anims.play(anim, true);
				this.upCursor.on('up', () => {this.char.anims.play('idle2', true)});
				this.W.on('up', () => {this.char.anims.play('idle2', true)}); 

				if (this.upBtn == undefined)
				{
					// Do nothing 
				} else {
					this.upBtn.on('pointerout', () => {this.char.anims.play('idle2', true); this.upBtnDown = false});
				}
			}
			// If pressing Down with left staus defined
			else if (this.downCursor.isDown || this.S.isDown || this.downBtnDown == true)
			{
				let anim = 'left';

				if (this.shift.isDown || this.sprintBtnDown == true) 
				{
					this.speed = this.runSpeed;
					anim = 'run_left';

					if (this.sprintBtnDown == true)
					{this.sprintBtn.on('pointerout', () => this.sprintBtnDown = false);} 
				}
				this.playerSpeed.y = 1;
				this.char.anims.play(anim, true);
				this.downCursor.on('up', () => {this.char.anims.play('idle2', true)});
				this.S.on('up', () => {this.char.anims.play('idle2', true)});

				if (this.downBtn == undefined)
				{
					// Do nothing 
				} else {
					this.downBtn.on('pointerout', () => {this.char.anims.play('idle2', true); this.downBtnDown = false});
				}
			}
			
		}
		

		// Up Right
		if (this.upRightCursor || this.WD)
		{
			this.playerSpeed.x = 1;
			this.playerSpeed.y = -1;
		}
		// Up Left
		if (this.upLeftCursor || this.WA)
		{
			this.playerSpeed.x = -1;
			this.playerSpeed.y = -1; 
		}
		// Down Left
		if (this.downLeftCursor || this.SA)
		{
			this.playerSpeed.x = -1;
			this.playerSpeed.y = 1; 
		}
		// Down Right
		if (this.downRightCursor || this.SD)
		{
			this.playerSpeed.x = 1;
			this.playerSpeed.y = 1; 
		}

		this.playerSpeed.normalize();	// Had to be placed above scale to work
		this.playerSpeed.scale(this.speed); 	// Uses const speed as reference for value
		this.char.setVelocity(this.playerSpeed.x, this.playerSpeed.y);	// Velocity is tied to const playerSpeed.x & .y
		
	}

	// Function that provides X position of Character
	getPositionX()
	{
		return (
			this.char.x
		)
	}
	// Function that provides Y position of Character
	getPositionY()
	{
		return (
			this.char.y
		)
	}

	getCamPositionX()
	{
		return (
			this.cam.x
		)
	}
	getCamPositionY()
	{
		return (
			this.cam.y
		)
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