export default class Axolotl {

    axl: Phaser.Physics.Matter.Sprite;	

    constructor(scene: any, x: number, y: number) 
    { 
        this.axl = scene.matter.add.sprite(x, y)  // Declare this.axl in this class
    }

    playAnim(spriteSheetKey: string, animationKey: string, start: number, end: number) 
    {  
        this.axl.anims.create({
               key: animationKey,
               frames: this.axl.anims.generateFrameNames(
                 spriteSheetKey, {
                   start: start,
                   end: end
                 }),
                 frameRate: 5,
                 repeat: -1	// Loop
        })
        this.axl.anims.play(animationKey)
    }
}