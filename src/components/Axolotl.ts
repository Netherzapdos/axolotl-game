export default class Axolotl {
    axl: any  // Declares it globally and avoid TS issues
    constructor(scene: any, x: number, y: number, spriteSheetKey: string, animationKey: string) 
    { 
        this.axl = scene.matter.add.sprite(x, y, spriteSheetKey)  // Declare this.axl here
    }

    playAnim(spriteSheetKey: string, animationKey: string)    // Run animation function
    {  
        this.axl.anims.create({
               key: animationKey,
               frames: this.axl.anims.generateFrameNames(
                 spriteSheetKey, {
                   start: 0,
                   end: 5
                 }),
                 frameRate: 5,
                 repeat: -1	// Loop
             })
             this.axl.anims.play(animationKey)
             this.axl.setFixedRotation(); 
    }
}