import Phaser from "phaser";

export default class Sensor{

    proximityCheck!: boolean
    classOfObject: any;

    constructor(objectClass: any)
    {
        this.proximityCheck = false; // Don't delcare booleans in functions cause they get reset each time the function is called
        this.classOfObject = new objectClass
    }

    setChatCursor(objectVariable: any)
    {
        // Change on-hover to chat cursor
        objectVariable.setInteractive(
            { 
            pixelPerfect: true, 
            cursor: 'url(/images/cursors/chat_cursor.cur), pointer', 
            }
        ); 
    }

    // Disable interaction when too far & Create modal when inside
    // interactionRangeYesNoModal
    initDialogue(scene: Phaser.Scene, objectVariable: any)
    {
        objectVariable.on('pointerdown', () => 
        {
            if (this.proximityCheck == false) 
            {
            let outsideRange = scene.add.text(objectVariable.x - 25, objectVariable.y - 15, 'Too far')
                .setDepth(3)
                .setTint(0xff0000)
                .setFontSize(8)
                .setFontFamily('PressStart2P')
                .setResolution(5);
            
            // Add fade out
            scene.time.delayedCall(1000, () => {
                scene.add.tween({
                    targets: outsideRange,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power2'
                })
            })
            } else if (this.proximityCheck == true) 
            {
                console.log('huh')
                this.classOfObject.startDialogue(scene, 0, 1, 2, 3);
            }
        })
    }

    // Play message when near
    enterRange(scene: Phaser.Scene, objectVariable: any, objectSensorLabel: string, message: string)
    {
        scene.matter.world.on('collisionstart', (event: any) => 
        {

            var pairs = event.pairs;

            for (var i = 0; i < pairs.length; i++)
            {
                var bodyA = pairs[i].bodyA;
                var bodyB = pairs[i].bodyB;

                if (pairs[i].isSensor)
                {
                    if (bodyA.label === 'playerSensor' && bodyB.label === objectSensorLabel)
                    {
                        console.log(bodyA.label);
                        console.log(bodyB.label); 
                        let withinRange = scene.add.text(objectVariable.x, objectVariable.y - 15, message )
                        .setDepth(3)
                        .setOrigin(0.48)
                        .setTint()
                        .setFontSize(8)
                        .setFontFamily('PressStart2P')
                        .setResolution(5);

                        scene.time.delayedCall(1000, () => {
                            scene.add.tween({
                                targets: withinRange,
                                alpha: 0,
                                duration: 1000,
                                ease: 'Power2'
                            })
                        })
                        this.proximityCheck = true;
                    }
                }
            }
        })
    }

    // Play message when exits proximity
    exitRange(scene: Phaser.Scene, objectVariable: any, objectSensorLabel: string, message: string)
    {
        scene.matter.world.on('collisionend', (event: any) => 
        {
            var pairs = event.pairs;

            for (var i = 0; i < pairs.length; i++)
            {
                var bodyA = pairs[i].bodyA;
                var bodyB = pairs[i].bodyB;

                if (pairs[i].isSensor)
                {
                    if (bodyA.label === 'playerSensor' && bodyB.label === objectSensorLabel)
                    {
                        let exitRange = scene.add.text(objectVariable.x, objectVariable.y - 15, message )
                        .setDepth(3)
                        .setOrigin(0.48)
                        .setTint()
                        .setFontSize(8)
                        .setFontFamily('PressStart2P')
                        .setResolution(5);

                        scene.time.delayedCall(1000, () => {
                            scene.add.tween({
                                targets: exitRange,
                                alpha: 0,
                                duration: 1000,
                                ease: 'Power2'
                            })
                        })

                        this.proximityCheck = false;
                    }
                }
            }
        })
    }

    // Create separate sensors for item interactions (i.e. Planting, Mining, Interacting w/ Open World)
}