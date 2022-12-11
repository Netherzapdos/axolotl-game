import Sensor from "../sensors/sensors";

export default class Axolotl {

    axl!: Phaser.Physics.Matter.Sprite;	

    constructor() 
    {    
    }

    create(scene: Phaser.Scene, x: number, y: number)
    {
        // Declare the use of Matter Bodies
        var Bodies = scene.matter.bodies;  

        // Declare this.axl in this class
        //@ts-ignore
        this.axl = scene.matter.add.sprite(x, y, 'axolotl', null, { isStatic: true })
            .setDepth(1);  

            // Create custom sensors & hitboxes
            var axlHitbox = Bodies.circle(this.axl.x, this.axl.y, 30, { isSensor: true, label: 'axolotlHitbox' })
            var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
                parts: [axlHitbox],
                inertia: Infinity,
            });
            this.axl.setExistingBody(compoundBody); 

            // Create sensor interactions
            var axlSensor = new Sensor(Axolotl);
                axlSensor.setChatCursor(this.axl); 
                axlSensor.enterRange(scene, this.axl, 'axolotlHitbox', 'Heyo'); 
                axlSensor.exitRange(scene, this.axl, 'axolotlHitbox', 'Bye bye!'); 
    }


    // Animations for the Axolotl. ** Separate each animation to its respective function so you can call each animation individually **
    anims(spriteSheetKey: string, animationKey: string, start: number, end: number) 
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