import Phaser from "phaser";

export default class Sensor{

    proximityCheck!: boolean

    constructor()
    {
    }

    outsideRange(scene: any, object: any, )
    {
        var proximityCheck = false;

        object.on('pointerdown', () => {
            if (proximityCheck == false) {

            let outsideRange = scene.add.text(object.x - 25, object.y - 15, 'Too far').setTint(0xff0000).setFontSize(8).setFontFamily('PressStart2P').setResolution(5);

            scene.time.delayedCall(1000, () => {
                scene.add.tween({
                    targets: outsideRange,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power2'
                })
            })
            } 
        })
    }
}