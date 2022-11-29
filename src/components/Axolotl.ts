export default class Axolotl {

    axl: Phaser.Physics.Matter.Sprite;	

    constructor(scene: any, x: number, y: number) 
    { 

       
        this.axl = scene.matter.add.sprite(x, y)  // Declare this.axl in this class

          // Make it so that hovering over the axl will change the hitbox to pixel perfect & change cursor to chat_cursor
          this.axl.setInteractive(
            { 
            pixelPerfect: true, 
            cursor: 'url(/images/cursors/chat_cursor.cur), pointer', 
            }
          ); 

            this.axl.on('pointerdown', () => console.log('yo'))


        
    
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