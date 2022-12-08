import Phaser from "phaser";

export default class Modal{
  
    modal: Phaser.GameObjects.Image;
    
    constructor(scene: Phaser.Scene, gameX: number, gameY: number)
    {
        this.modal = scene.add.image(gameX, gameY, 'dialogue_modal')
            .setDepth(2)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setInteractive();    // To disable interactions of objects behind the modal
    }

    setName(scene: Phaser.Scene, text: string)
    {
        const name = scene.add.text(this.modal.x - 102, this.modal.y - 38, text)
        .setDepth(2)
        .setOrigin(0)
        .setScrollFactor(0)
        .setFontSize(7)
        .setFontFamily('PressStart2P')
        .setResolution(5); 
    }

    firstLine(scene: Phaser.Scene, text: string)
    {
        const firstLine = scene.add.text(this.modal.x - 105, this.modal.y - 17, text)
        .setDepth(2)
        .setOrigin(0)
        .setScrollFactor(0)
        .setFontSize(10)
        .setFontFamily('PressStart2P')
        .setResolution(5); 
    }

    secondLine(scene: Phaser.Scene, text: string)
    {
        const secondLine = scene.add.text(this.modal.x - 105, this.modal.y - 4, text)
        .setDepth(2)
        .setOrigin(0)
        .setScrollFactor(0)
        .setFontSize(10)
        .setFontFamily('PressStart2P')
        .setResolution(5); 
    }

    thirdLine(scene: Phaser.Scene, text: string)
    {
        const thirdtLine = scene.add.text(this.modal.x - 105, this.modal.y + 10, text)
        .setDepth(2)
        .setOrigin(0)
        .setScrollFactor(0)
        .setFontSize(10)
        .setFontFamily('PressStart2P')
        .setResolution(5); 
    }

    fourthLine(scene: Phaser.Scene, text: string)
    {
        const fourthLine = scene.add.text(this.modal.x - 105, this.modal.y + 23, text)
        .setDepth(2)
        .setOrigin(0)
        .setScrollFactor(0)
        .setFontSize(10)
        .setFontFamily('PressStart2P')
        .setResolution(5); 
    }
}