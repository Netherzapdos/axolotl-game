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

            this.add.text(backButton.x, backButton.y, 'Back')
                .setOrigin(0.5)
                .setFontSize(8)
                .setFontFamily('PressStart2P')
                .setResolution(5); 

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


        

        // Add buttons to buttons[] array
        this.buttons = [backButton]; 



        // Set default button
        this.selectButton(0);
        
    }


    selectButton(buttonNum: number)
    {
        // Get currently selected number
        const currentButton = this.buttons[this.selectedButton]
            

        // Make currently selected button white after next button has been selected
        currentButton.setTint(0xffffff)

        // Get newly selected button through buttonNum
        const nextButton = this.buttons[buttonNum]

        // Make next selected button color green
        nextButton.setTint(0x66ff7f)

        this.selectedButton = buttonNum;
    }

    selectNextButton(num = 1)
    {
        let index = this.selectedButton + num

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
        // Get which button is currently selected
        const currentButton = this.buttons[this.selectedButton];
        
        // Call a function when a specific button is pressed
        if (currentButton == this.buttons[0]) {this.scene.start('menu');}
    }


    update()
    {
        const space = Phaser.Input.Keyboard.JustDown(this.cursors.space)

        if (space)
        {
            this.confirmSelection(); 
        }
    }

}