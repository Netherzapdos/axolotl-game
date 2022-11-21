import Phaser from "phaser";

export default class Preloader extends Phaser.Scene
{
    constructor() 
    {
        super('preloader')
    }

    preload()
    {
        // Map
        this.load.image('tiles', 'images/tiles/sunny_tiles.png')
        this.load.tilemapTiledJSON('island', 'images/maps/island.json')
    

        // Character 
        this.load.spritesheet('char_idle', 'images/sprites/character/char_idle.png', 
            { frameWidth: 16, frameHeight: 32}
        );
        this.load.spritesheet('char_idle2', 'images/sprites/character/char_idle2.png',
            { frameWidth: 16, frameHeight: 32 }
        );
        this.load.spritesheet('char_walking_right', 'images/sprites/character/char_walking_right.png', 
            { frameWidth: 16, frameHeight: 32 }
        );
        this.load.spritesheet('char_walking_left', 'images/sprites/character/char_walking_left.png', 
            { frameWidth: 16, frameHeight: 32 }
        );

        this.load.spritesheet('char_running_right', 'images/sprites/character/char_running_right.png',
            { frameWidth: 32, frameHeight: 32 }
        )
        this.load.spritesheet('char_running_left', 'images/sprites/character/char_running_left.png',
            { frameWidth: 32, frameHeight: 32 }
        )


        // Axolotls
        this.load.spritesheet('wild_yellow', 'images/sprites/axolotls/wild_yellow_idle.png', 
            { frameWidth: 20, frameHeight: 20})
    }

    create()
    {
        this.scene.start('mainmap')

        // Sets camera bounds to map size to avoid black bars
        
        
    }
}