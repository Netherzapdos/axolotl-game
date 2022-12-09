import Phaser from "phaser";
import Modal from "../../Modal";

export default class Sensor{

    proximityCheck!: boolean

    constructor()
    {
        this.proximityCheck = false; // Don't delcare booleans in functions cause they get reset each time the function is called
    }

    // Disable interaction when too far & Create modal when inside
    // interactionRangeYesNoModal
    interactionRangeDialogueModal(scene: Phaser.Scene, object: any, name: string, firstLine: string, secondLine: string, thirdLine: string, fourthLine: string)
    {
        const { width, height } = scene.scale;

        object.on('pointerdown', () => 
        {
            if (this.proximityCheck == false) 
            {
            
            console.log(this.proximityCheck)
            let outsideRange = scene.add.text(object.x - 25, object.y - 15, 'Too far').setTint(0xff0000).setFontSize(8).setFontFamily('PressStart2P').setResolution(5);

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
                let dialogue = new Modal(scene, width * 0.5, height * 0.86)
                dialogue.setName(scene, name);
                dialogue.firstLine(scene, firstLine);
                dialogue.secondLine(scene, secondLine);
                dialogue.thirdLine(scene, thirdLine);
                dialogue.fourthLine(scene, fourthLine); 

            }
        })
    }

    // Play message when near
    withinRangeMsg(scene: Phaser.Scene, object: any, objectSensorLabel: string, message: string)
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
                        let withinRange = scene.add.text(object.x - 60, object.y - 15, message )
                        .setOrigin(0)
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
                        console.log('proximity true')
                        console.log(this.proximityCheck)
                    }
                }
            }
        })
    }

    // Play message when exits proximity
    exitRangeMsg(scene: any, objectSensorLabel: string)
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
                        this.proximityCheck = false;
                        console.log('proximity false')
                        console.log(this.proximityCheck)
                    }
                }
            }
        })
    }

    // Create separate sensors for item interactions (i.e. Planting, Mining, Interacting w/ Open World)
}