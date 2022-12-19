import Phaser from "phaser";
import Modal from "../../Modal";
import Sensor from "../sensors/sensors";
import GameStates from "../../GameStates";

export default class ChickenMan{
    
    chickenMan!: Phaser.Physics.Matter.Sprite;

    dialogueArray!: any;

    dialogue!: Modal;
    
    gameStates!: GameStates;
    checkDialogueState!: {};

    constructor()
    {

        // Try not declaring anything here in constructor 
localStorage.clear()
        // Create series of text for chickenMan
        this.dialogueArray = [
            '1 one',
            '2 two',
            '3 huhhhh',
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

    create(scene: Phaser.Scene, x: number, y: number, sensorRadius: number, label: string)
    {
        var Bodies = scene.matter.bodies; 

        //@ts-ignore You can definitely use null here
        this.chickenMan = scene.matter.add.sprite(x, y, 'chicken_man', null)
            .setDepth(1)

            // Create custom sensors & hitboxes
            var chickenManCollisionHitbox = Bodies.rectangle(this.chickenMan.x, this.chickenMan.y, 10, 15)
            var chickenManHitbox = Bodies.circle(this.chickenMan.x, this.chickenMan.y, sensorRadius, { isSensor: true, label: label })
            //@ts-ignore
            var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
                parts: [ chickenManCollisionHitbox, chickenManHitbox],
                isStatic: true
            });
            this.chickenMan.setExistingBody(compoundBody); 

            // Create proximity interactions
            var chickenSensor = new Sensor(ChickenMan);

                chickenSensor.setChatCursor(this.chickenMan); 
                chickenSensor.initDialogue(scene, this.chickenMan);   
                chickenSensor.enterRange(scene, this.chickenMan, label, 'Who are you?'); 
                //@ts-ignore
                chickenSensor.exitRange(scene, this.chickenMan, label, null); 
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

    gameState() // Had to move here instead in constructor because ChickenMan Class keeps getting called and resetting checkDialogueState to false
    {
        // Declare a new instance of Game States
        this.gameStates = new GameStates(); 

            const getUpdated = localStorage.getItem('dialogueFinished'); 
            //@ts-ignore
            this.checkDialogueState = JSON.parse(getUpdated);   
            console.log(`checkDialogueState is ${this.checkDialogueState}`); 

                if (this.checkDialogueState == null) 
                {
                    this.checkDialogueState = false;
                } 
                console.log(`checkDialogueState is ${this.checkDialogueState}`); 

    }

    startDialogue(scene: Phaser.Scene, firstLineNum: number, secondLineNum: number, thirdLineNum: number, fourthLineNum: number)
    {   
        this.gameState(); 
        console.log(this.checkDialogueState); 
        if (this.checkDialogueState == false) 
        {
            if (fourthLineNum >= this.dialogueArray.length)
            {
                // Placing update state here means players will only finish the dialogue after reading through all strings
                this.checkDialogueState = true
                console.log(`if fourthLine >= dialogueArray.length is ${this.checkDialogueState}`); 

                var convert = JSON.stringify(this.checkDialogueState); 
                localStorage.setItem('dialogueFinished', convert); 
            }
             
            else 
            {
                this.dialogue = new Modal(scene, ChickenMan, 700 * 0.5, 325 * 0.86)
                
                this.dialogue.closeModal(); 
                this.dialogue.setName(scene, 'Chicken Man');
                this.dialogue.setDialogueLines(scene, this.dialogueArray[firstLineNum], this.dialogueArray[secondLineNum], this.dialogueArray[thirdLineNum], this.dialogueArray[fourthLineNum]);
    
                this.dialogue.nextBtn(scene, firstLineNum, secondLineNum, thirdLineNum, fourthLineNum); 
            }
        } 
        else if (this.checkDialogueState == true)
        {
            console.log('dis shud appear')
        }; 
    }
}