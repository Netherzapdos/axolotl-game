import Phaser from "phaser";

export default class Menu extends Phaser.Scene 
{
	private buttons: Phaser.GameObjects.Image[] = []
	private buttonCursor!: Phaser.GameObjects.Image;
	private selectedButtonIndex = 0
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

		// Add Menu Artwork
		this.add.image(width * 0.5, height * 0.5, 'menu_art')
			.setScale(0.366);

		// Add Menu Cursor
		this.buttonCursor = this.add.image(0, 0, 'menu_cursor')
			.setDepth(1)



		// Play button
		const playButton = this.add.image(width * 0.5, height * 0.65, 'menu_button')
			.setScale(3);
		
			this.add.text(playButton.x, playButton.y, 'Play') 
				.setOrigin(0.5)
				.setFontSize(8)
				.setFontFamily('PressStart2P')
				.setResolution(5); 
			
		// Settings button
		const settingsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'menu_button')
			.setDisplaySize(150, 50)
			.setScale(3); 
	
			this.add.text(settingsButton.x, settingsButton.y, 'Settings')
				.setOrigin(0.5)
				.setFontSize(8)
				.setFontFamily('PressStart2P')
				.setResolution(5); 
		
		// Credits button
		const creditsButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'menu_button')
			.setScale(3)
	
			this.add.text(creditsButton.x, creditsButton.y, 'Credits')
				.setOrigin(0.5)
				.setFontSize(8)
				.setFontFamily('PressStart2P')
				.setResolution(5);


	
		// Add buttons to array index
		this.buttons = [playButton, settingsButton, creditsButton]; // Should declare array with buttons already. Using .push to individually
																	// add buttons to the .buttons array will keep adding them up
																	// to the array when user comes back to this scene (because you're in create())
																	// Best to make it static like this.


		// Default selected button will be `Play` button
		this.selectButton(0); 

	}

	selectButton(buttonNum: number)
	{
		// Get the currently selected button
		const currentButton = this.buttons[this.selectedButtonIndex]

		// Set currently selected button to white tint
		currentButton.setTint(0xffffff)

		// Get newly selected button from the passed index parameter
		const button = this.buttons[buttonNum]

		// Set newly selected button to green tint
		button.setTint(0x66ff7f)

		// Set cursor image to right side of button image
		this.buttonCursor.x = button.x + button.displayWidth * 0.5;
		this.buttonCursor.y = button.y + 10

		// Store the new selected button index
		this.selectedButtonIndex = buttonNum;
	}

	selectNextButton(change = 1)
	{
		let index = this.selectedButtonIndex + change

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
		const button = this.buttons[this.selectedButtonIndex]

		// Call different functions depending on what the current button is
		if (button == this.buttons[0]) {this.scene.start('game');}
		else if (button == this.buttons[1]) {window.open('http://google.com');}
		else if (button == this.buttons[2]) {this.scene.start('menu_credits');}
	}


	update() 
		{
			
		const pressUp = Phaser.Input.Keyboard.JustDown(this.cursors.up);
		const pressUpW = Phaser.Input.Keyboard.JustDown(this.keyboard.up)
		const pressDown = Phaser.Input.Keyboard.JustDown(this.cursors.down);
		const pressDownS = Phaser.Input.Keyboard.JustDown(this.keyboard.down);
		const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
			
			if (pressUp || pressUpW)
			{
				this.selectNextButton(-1)
			}
			else if (pressDown || pressDownS)
			{
				this.selectNextButton(1)
			}
			else if (spaceJustPressed)
			{
				this.confirmSelection()
			}
		}
	}
