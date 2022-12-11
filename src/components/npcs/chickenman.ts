import Phaser from "phaser";
import Modal from "../../Modal";
import Axolotl from "../axolotl/Axolotl";
import Sensor from "../sensors/sensors";

export default class ChickenMan{

    chickenMan: Phaser.Physics.Matter.Sprite;

    dialogueArray!: any;

    isDialogue1Done!: boolean; 
    isDialogue2Done!: boolean;
    dialogue: Modal;

    constructor()
    {
        // Dialogue progress checks
        this.isDialogue1Done = false; 
        this.isDialogue2Done = false; 

        // Create series of text for chickenMan
        this.dialogueArray = [
            '1 one',
            '2 two',
            '3 three',
            '4 four',

            '5 five',
            '6 six',
            '7 seven',
            '8 eight',

            '9 nine',
            '10 ten',
            '11 eleven',
            '12 twelve'
        ]; 
    }

    create(scene: Phaser.Scene)
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
            var chickenSensor = new Sensor(ChickenMan);
            
                chickenSensor.startDialogue(scene, this.chickenMan);   
                chickenSensor.enterRange(scene, this.chickenMan, 'chickenMan', 'Who are you?'); 
                chickenSensor.exitRange(scene, this.chickenMan, 'chickenMan', null); 
    }

    anims()
    {
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

    startDialogue(scene: Phaser.Scene, firstLineNum: number, secondLineNum: number, thirdLineNum: number, fourthLineNum: number)
    {  
        console.log(`Dialogue1 is ${this.isDialogue1Done}`); 
        console.log(this.dialogueArray.length - 1);
        if (this.isDialogue1Done == false) 
        {
            
            if (fourthLineNum >= this.dialogueArray.length) // Stops chat when there are no more strings in dialogueArray. Can call a func instead.
            {
                return;  
            }
            else 
            {
                this.dialogue = new Modal(scene, ChickenMan, 700 * 0.5, 325 * 0.86)
                this.dialogue.closeModal(); 
                this.dialogue.setName(scene, 'Chicken Man');
                this.dialogue.dialogueLines(scene, this.dialogueArray[firstLineNum], this.dialogueArray[secondLineNum], this.dialogueArray[thirdLineNum], this.dialogueArray[fourthLineNum]);
                // dialogue.firstLine(scene, this.dialogueArray[firstLineNum]); // 0
                // dialogue.secondLine(scene, this.dialogueArray[secondLineNum]); // 1
                // dialogue.thirdLine(scene, this.dialogueArray[thirdLineNum]); // 2
                // dialogue.fourthLine(scene, this.dialogueArray[fourthLineNum]); // 3
    
                this.dialogue.nextBtn(scene, ChickenMan, firstLineNum, secondLineNum, thirdLineNum, fourthLineNum); 
                this.isDialogue1Done = true; 
                console.log(`Dialogue1 is now ${this.isDialogue1Done}`); 
            }
            

            
        } 
        else if (this.isDialogue1Done == true)
        {
            return; 
        }; 
    }


        
        

    // For next page modal, make 
}