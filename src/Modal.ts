import Phaser from "phaser";
import ChickenMan from "./components/npcs/chickenman";

export default class Modal{
  
    modal: Phaser.GameObjects.Image;
    closeButton: Phaser.GameObjects.Image;
    nextButton: Phaser.GameObjects.Image;
    name!: Phaser.GameObjects.Text;
    firstLineMsg!: Phaser.GameObjects.Text;
    secondLineMsg!: Phaser.GameObjects.Text;
    thirdLineMsg!: Phaser.GameObjects.Text;
    fourthLineMsg!: Phaser.GameObjects.Text;

    gameX: number;
    gameY: number;
    classOfObject: any;
 
    
    constructor(scene: Phaser.Scene, objectClass: any,gameX: number, gameY: number)
    {
        this.gameX = gameX; 
        this.gameY = gameY;
        this.classOfObject = new objectClass();

        this.modal = scene.add.image(gameX, gameY, 'dialogue_modal')
            .setDepth(2)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setInteractive();    // To disable interactions of objects behind the modal

        this.closeButton = scene.add.image(gameX + 106, gameY - 22, 'modal_close_btn')
            .setDepth(2)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setInteractive();

        this.nextButton = scene.add.image(gameX + 106, gameY + 33, 'modal_next_btn')
            .setDepth(2)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setInteractive();
           
    }

    setName(scene: Phaser.Scene, text: string)
    {
        this.name = scene.add.text(this.modal.x - 102, this.modal.y - 38, text)
        .setDepth(2)
        .setOrigin(0)
        .setScrollFactor(0)
        .setFontSize(7)
        .setFontFamily('PressStart2P')
        .setResolution(5); 
    }

    dialogueLines(scene: Phaser.Scene, firstLineMsg: string, secondLineMsg: string, thirdLineMsg: string, fourthLineMsg: string)
    {
        this.firstLineMsg = scene.add.text(this.modal.x - 105, this.modal.y - 17, firstLineMsg)
        .setDepth(2)
        .setOrigin(0)
        .setScrollFactor(0)
        .setFontSize(10)
        .setFontFamily('PressStart2P')
        .setResolution(5);

        this.secondLineMsg = scene.add.text(this.modal.x - 105, this.modal.y - 4, secondLineMsg)
        .setDepth(2)
        .setOrigin(0)
        .setScrollFactor(0)
        .setFontSize(10)
        .setFontFamily('PressStart2P')
        .setResolution(5);

        this.thirdLineMsg = scene.add.text(this.modal.x - 105, this.modal.y + 10, thirdLineMsg)
        .setDepth(2)
        .setOrigin(0)
        .setScrollFactor(0)
        .setFontSize(10)
        .setFontFamily('PressStart2P')
        .setResolution(5);
        
        this.fourthLineMsg = scene.add.text(this.modal.x - 105, this.modal.y + 23, fourthLineMsg)
        .setDepth(2)
        .setOrigin(0)
        .setScrollFactor(0)
        .setFontSize(10)
        .setFontFamily('PressStart2P')
        .setResolution(5);
    }

    closeModal()
    {
        this.closeButton.on('pointerdown', () => {
            this.modal.destroy(); 
            this.name.destroy(); 
            this.closeButton.destroy(); 
            this.nextButton.destroy(); 
            this.firstLineMsg.destroy(); 
            this.secondLineMsg.destroy();
            this.thirdLineMsg.destroy(); 
            this.fourthLineMsg.destroy(); 
        })
    }

    nextBtn(scene: Phaser.Scene, objectClass: any, firstLineNum: number, secondLineNum: number, thirdLineNum: number, fourthLineNum: number) // might be Phaser.Sprite
    {
        let firstNumAdd = firstLineNum + 4;
        let secondNumAdd = secondLineNum + 4;
        let thirdNumAdd = thirdLineNum + 4;
        let fourthNumAdd = fourthLineNum + 4;


        this.nextButton.on('pointerdown', () => {
            this.destroyAll();

            var objectHandler = this.classOfObject
                objectHandler.startDialogue(scene, firstNumAdd, secondNumAdd, thirdNumAdd, fourthNumAdd);
        })
    }

    destroyAll()
    {
        this.modal.destroy(); 
        this.name.destroy(); 
        this.closeButton.destroy(); 
        this.nextButton.destroy(); 
        this.firstLineMsg.destroy(); 
        this.secondLineMsg.destroy();
        this.thirdLineMsg.destroy(); 
        this.fourthLineMsg.destroy(); 
    }

    destroy()
    {
        
    }

}