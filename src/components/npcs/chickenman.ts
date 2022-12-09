import Phaser from "phaser";
import Modal from "../../Modal";
import Sensor from "../sensors/sensors";

export default class ChickenMan{

    chickenMan: Phaser.Physics.Matter.Sprite;

    constructor(scene: Phaser.Scene)
    {
        var Bodies = scene.matter.bodies; 

        this.chickenMan = scene.matter.add.sprite(340, 340, 'chicken_man', null, { label: 'chickenMan', isStatic: true, circleRadius: 20 })


            // Change on-hover to chat cursor
            this.chickenMan.setInteractive(
                { 
                pixelPerfect: true, 
                cursor: 'url(/images/cursors/chat_cursor.cur), pointer', 
                }
            ); 

            // Create proximity interactions
            var chickenSensor = new Sensor();
            chickenSensor.interactionRangeDialogueModal(scene, this.chickenMan, 'Chicken Man', 'Who are you?', 'Where am I?', 'How the heck did I', 'get here...');
            chickenSensor.withinRangeMsg(scene, this.chickenMan, 'chickenMan', 'My head hurts...'); 
            chickenSensor.exitRangeMsg(scene, 'chickenMan'); 

            
        // Create Idle Anim
			this.chickenMan.anims.create({
				key: 'idle',
				frames: this.chickenMan.anims.generateFrameNumbers(
					'chicken_man', { 
						start: 0, 
						end: 8
					}),
					frameRate: 15,
					repeat: -1
			})
			this.chickenMan.anims.play('idle'); 
    }
}