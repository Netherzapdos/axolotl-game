import Phaser from "phaser";
import Modal from "../../Modal";
import Sensor from "../sensors/sensors";

export default class ChickenMan{

    chickenMan: Phaser.Physics.Matter.Sprite;

    constructor(scene: Phaser.Scene)
    {
        var Bodies = scene.matter.bodies; 

        const { width, height } = scene.scale; 

        this.chickenMan = scene.matter.add.sprite(340, 340, 'chicken_hitman', null, { label: 'chickenMan', isStatic: true, circleRadius: 20 })


            // Change on-hover to chat cursor
            this.chickenMan.setInteractive(
                { 
                pixelPerfect: true, 
                cursor: 'url(/images/cursors/chat_cursor.cur), pointer', 
                }
            ); 

            // Enable proximity-sensitive chat
            var proximityCheck = false;

            var outsideRange = new Sensor();
            outsideRange.outsideRange(scene, this.chickenMan)

            // this.chickenMan.on('pointerdown', () => {
            //     if (proximityCheck == false) {
                    
            //         let outsideRange = scene.add.text(this.chickenMan.x - 25, this.chickenMan.y - 15, 'Too far').setTint(0xff0000).setFontSize(8).setFontFamily('PressStart2P').setResolution(5);
                
            //         scene.time.delayedCall(1000, () => {
            //             scene.add.tween({
            //                 targets: outsideRange,
            //                 alpha: 0,
            //                 duration: 1000,
            //                 ease: 'Power2'
            //             })
            //         })
            //     } else if (proximityCheck == true) {

            //         let dialogue = new Modal(scene, width * 0.5, height * 0.86)
            //         dialogue.setName(scene, 'Chicken Man');
            //         dialogue.firstLine(scene, 'Who are you?');
            //         dialogue.secondLine(scene, 'Where am i?');
            //         dialogue.thirdLine(scene, 'How the heck did I');
            //         dialogue.fourthLine(scene, 'get here...')

            //         // ** continue building **
            //     }
            // })

        // Create sensors
        scene.matter.world.on('collisionstart', (event: any) => {

            var pairs = event.pairs;

            for (var i = 0; i < pairs.length; i++)
            {
                var bodyA = pairs[i].bodyA;
                var bodyB = pairs[i].bodyB;

                if (pairs[i].isSensor)

                {
                    if (bodyA.label === 'playerSensor' && bodyB.label === 'chickenMan')
                    {
                        let withinRange = scene.add.text(this.chickenMan.x - 45, this.chickenMan.y - 15, "My head hurts...").setTint().setFontSize(8).setFontFamily('PressStart2P').setResolution(5);
                    
                        scene.time.delayedCall(1000, () => {
                            scene.add.tween({
                                targets: withinRange,
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
        scene.matter.world.on('collisionend', (event: any) => 
        {
            var pairs = event.pairs;

            for (var i = 0; i < pairs.length; i++)
            {
                var bodyA = pairs[i].bodyA;
                var bodyB = pairs[i].bodyB;

                if (pairs[i].isSensor)
                {
                    if (bodyA.label === 'playerSensor' && bodyB.label === 'chickenMan')
                    {
                        proximityCheck = false;
                    }
                }
            }
        })


        // Create Idle Anim
			this.chickenMan.anims.create({
				key: 'idle',
				frames: this.chickenMan.anims.generateFrameNumbers(
					'chicken_hitman', { 
						start: 0, 
						end: 8
					}),
					frameRate: 15,
					repeat: -1
			})
			this.chickenMan.anims.play('idle'); 
    }
}