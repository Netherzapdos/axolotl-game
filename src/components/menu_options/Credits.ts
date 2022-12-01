import Phaser from "phaser";

export default class MenuCredits extends Phaser.Scene
{

    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    private buttons: Phaser.GameObjects.Image[] = []
    backButton!: Phaser.GameObjects.Image
    selectedButton = 0
    

    constructor() {
        super('menu_credits')
    }

    init() 
    {
        // Declare arrow keys
        this.cursors = this.input.keyboard.createCursorKeys()

    }
    
    create() 
    {
        // Add game width and height
		const { width, height } = this.scale

        // Add Menu Artwork
		this.add.image(width * 0.5, height * 0.5, 'menu_art')
        .setScale(0.366);

        const backButton = this.add.image(width * 0.10, height * 0.90, 'menu_button')
            .setScale(2, 3)
            .setInteractive();

            this.add.text(backButton.x, backButton.y, 'Back')
                .setOrigin(0.5)
                .setFontSize(8)
                .setFontFamily('PressStart2P')
                .setResolution(5); 

            backButton.on('pointerover', () => {backButton.setTint(0x66ff7f); this.selectedButton = 0}); 
			backButton.on('pointerout', () => {backButton.setTint(0xffffff)});
			backButton.on('pointerdown', () => {this.confirmSelection()});

        const creditMsg = this.add.image(width * 0.5, height * 0.5, 'credits_modal')
            .setScale(2)

            this.add.text(creditMsg.x, creditMsg.y, 'Nothing to see here')
                .setOrigin(0.5)
                .setFontSize(8)
                .setFontFamily('PressStart2P')
                .setResolution(5); 
                this.add.text(creditMsg.x, creditMsg.y + 10, 'o.o')
                .setOrigin(0.5)
                .setFontSize(8)
                .setFontFamily('PressStart2P')
                .setResolution(5); 

    }

    confirmSelection()
    {
        // Get which button is currently selected
        const currentButton = this.buttons[this.selectedButton];
        
        // Call a function when a specific button is pressed
        if (currentButton == this.buttons[0]) {this.scene.start('menu');}
    }

}