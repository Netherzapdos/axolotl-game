export default class Axolotl {

    axl: Phaser.Physics.Matter.Sprite;	

    constructor(scene: Phaser.Scene, x: number, y: number) 
    { 

        // Declare the use of Matter Bodies
        var Bodies = scene.matter.bodies;  

        // Declare this.axl in this class
        this.axl = scene.matter.add.sprite(x, y, 'axolotl', null, { label: 'axolotl', isStatic: true, circleRadius: 20 });  

          // Make it so that hovering over the axl will change the hitbox to pixel perfect & change cursor to chat_cursor
          this.axl.setInteractive(
            { 
            pixelPerfect: true, 
            cursor: 'url(/images/cursors/chat_cursor.cur), pointer', 
            }
          ); 

        

        // Call events when clicking down

            // Check first if player is within proximity of the Axolotl
            var proximityCheck = false;
            
            this.axl.on('pointerdown', () => {
              if (proximityCheck == false) {
                console.log('Get closer!')
                
                let tooFar = scene.add.text(this.axl.x - 25, this.axl.y - 15, 'Too far').setTint(0xff0000).setFontSize(8).setFontFamily('PressStart2P').setResolution(5);
                
                scene.time.delayedCall(1000, () => {
                  scene.add.tween({
                    targets: tooFar,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power2'
                  })
                })
                

                
              } else
                {
                  console.log('Now talking')
                }
              })



        // Create the Physics Logic for Sensor Checking
		    scene.matter.world.on('collisionstart',  (event: any) =>  // Use Arrow functions to use .this variables
		    {
            // Loop through all existing collision pairs
            var pairs = event.pairs;

            for (var i = 0; i < pairs.length; i++)
            {
              var bodyA = pairs[i].bodyA;
              var bodyB = pairs[i].bodyB;
			
              // We only want the sensors
              if (pairs[i].isSensor)
              
              {
                if (bodyA.label === 'playerSensor' && bodyB.label === 'axolotl' ) 
                {
                  console.log('axolotl true'); 
                  
                  let closeEnough = scene.add.text(this.axl.x - 25, this.axl.y - 15, "Yo whatup").setTint().setFontSize(8).setFontFamily('PressStart2P').setResolution(5);

                  scene.time.delayedCall(1000, () => {
                    scene.add.tween({
                      targets: closeEnough,
                      alpha: 0,
                      duration: 1000,
                      ease: 'Power2'
                    })
                  })
                  
                  proximityCheck = true;
					      } 
				      }
			      }
		    })
        // Makes proximityCheck to false after collision ends
        scene.matter.world.on('collisionend', (event: any) => 
        {
          // Loop through all existing collision pairs
          var pairs = event.pairs;

          for (var i = 0; i < pairs.length; i++)
          {
            var bodyA = pairs[i].bodyA;
            var bodyB = pairs[i].bodyB;
    
            // We only want the sensors
            if (pairs[i].isSensor)
            {
              if ( bodyA.label === 'playerSensor' && bodyB.label === 'axolotl') 
              {
                console.log('axolotl false'); 
                proximityCheck = false;
              } 
            }
          }
        })
        
          
    }

    // Animations for the Axolotl. ** Separate each animation to its respective function so you can call each animation individually **
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

    // Function that provides X position of Axolotl
    getPositionX()
    {
      return (
        this.axl.x
      )
    }
    // Function that provides Y position of Axolotl
    getPositionY()
    {
      return (
        this.axl.y
      )
    }
}