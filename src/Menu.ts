import Phaser from "phaser";

export default class Menu extends Phaser.Scene 
{
	private buttons: Phaser.GameObjects.Image[] = []
	private buttonCursor!: Phaser.GameObjects.Image;
	private selectedButton = 0
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	keyboard!: any;

    constructor()
    {
        super('menu')
    }
	
	init()
	{
		// Declare cursors
		this.cursors = this.input.keyboard.createCursorKeys()

		// Declare keyboard WASD
        this.keyboard = this.input.keyboard.addKeys({
			'right': Phaser.Input.Keyboard.KeyCodes.D,
			'up': Phaser.Input.Keyboard.KeyCodes.W,
			'down': Phaser.Input.Keyboard.KeyCodes.S,
			'left': Phaser.Input.Keyboard.KeyCodes.A,
        })
	}
  
    create() 
	{
		// Add game width and height
		const { width, height } = this.scale

		// Add Menu Logo
		const menuLogo = this.add.image(width * 0.5, height * 0.30, 'menu_logo')
			.setScale(0.3)
			.setDepth(1);

			// Add Animation to Menu Logo
			this.tweens.add({
				targets: menuLogo,
				y: height * 0.30 + 15, 
				duration: 1400,
				ease: Phaser.Math.Easing.Quadratic.InOut,  
				yoyo: true,
				loop: -1, 
				delay: 0
			})

		// Add Menu Artwork
		this.add.image(width * 0.5, height * 0.5, 'menu_art')
			.setScale(0.366);

		// Create Custom Cursor/Mouse Pointer
		this.input.setDefaultCursor('url(/images/cursors/main_cursor.cur), pointer'); 



		// Play button
		const playButton = this.add.image(width * 0.5, height * 0.65, 'menu_button')
			.setScale(3)
			.setInteractive();
		
			this.add.text(playButton.x, playButton.y, 'Play') 
				.setOrigin(0.5)
				.setFontSize(8)
				.setFontFamily('PressStart2P')
				.setResolution(5); 

			playButton.on('pointerover', () => {playButton.setTint(0x66ff7f); this.selectedButton = 0}); 
			playButton.on('pointerout', () => {playButton.setTint(0xffffff)});
			playButton.on('pointerdown', () => {this.confirmSelection()});
			
		// Settings button
		const settingsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'menu_button')
			.setScale(3)
			.setInteractive(); 
	
			this.add.text(settingsButton.x, settingsButton.y, 'Settings')
				.setOrigin(0.5)
				.setFontSize(8)
				.setFontFamily('PressStart2P')
				.setResolution(5); 

			settingsButton.on('pointerover', () => {settingsButton.setTint(0x66ff7f); this.selectedButton = 1}); 
			settingsButton.on('pointerout', () => {settingsButton.setTint(0xffffff)});
			settingsButton.on('pointerdown', () => {this.confirmSelection()});
		
		// Credits button
		const creditsButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'menu_button')
			.setScale(3)
			.setInteractive(); 
	
			this.add.text(creditsButton.x, creditsButton.y, 'Credits')
				.setOrigin(0.5)
				.setFontSize(8)
				.setFontFamily('PressStart2P')
				.setResolution(5);

			creditsButton.on('pointerover', () => {creditsButton.setTint(0x66ff7f); this.selectedButton = 2}); 
			creditsButton.on('pointerout', () => {creditsButton.setTint(0xffffff)});
			creditsButton.on('pointerdown', () => {this.confirmSelection()});
	
		// Add buttons to array index
		this.buttons = [playButton, settingsButton, creditsButton]; // Should declare array with buttons already. Using .push to individually
																	// add buttons to the .buttons array will keep adding them up
																	// to the array when user comes back to this scene (because you're in create())
																	// Best to make it static like this.

	}

	selectButton(buttonNum: number)
	{
		// Get the currently selected button
		const currentButton = this.buttons[this.selectedButton]

		// Set currently selected button to white tint
		currentButton.setTint(0xffffff)

		// Get newly selected button from the passed index parameter
		const button = this.buttons[buttonNum]

		// Set newly selected button to green tint
		button.setTint(0x66ff7f)

		// Store the new selected button index
		this.selectedButton = buttonNum;
	}

	selectNextButton(change = 1)
	{
		// Sets up the up/down selection between buttons
		let index = this.selectedButton + change

		if (index >= this.buttons.length)
		{
			index = 0
		}
		else if (index < 0)
		{
			index = this.buttons.length - 1
		}
		this.selectButton(index)
	}

	confirmSelection()
	{
		// Get the currently selected button
		const currentButton = this.buttons[this.selectedButton]

		// Call different functions depending on what the current button is
		if (currentButton == this.buttons[0]) {this.scene.start('game');}
		else if (currentButton == this.buttons[1]) {window.open('https://i.natgeofe.com/n/de94c416-6d23-45f5-9708-e8d56289268e/naturepl_01132178_4x3.jpg');}
		else if (currentButton == this.buttons[2]) {this.scene.start('menu_credits');}
	}


	update() 
	{

	}
}
