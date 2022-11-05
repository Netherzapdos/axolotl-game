import Phaser from "phaser";

export default class Player {
    constructor(scene: any, x: number, y: number) {
        this.sprite = scene.add.sprite('blah')
        this.inventory = [{ item: 1, item: 2 }]
        this.healthBar = scene.add.sprite('healthbar')
    }
    move(x, y) {
        this.sprite.setPosition(x, y)
        this.mask.setPosition(x, y)
        this.healthBar.setPosition(x, y)
    }

    // addToContainer(container){
    //     container.add(this.sprite)
    //     container.add(this.healthBar)
    // }
}