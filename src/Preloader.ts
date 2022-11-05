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
            { frameWidth: 96, frameHeight: 64}
        );

        this.load.spritesheet('char_walking_right', 'images/sprites/character/char_walking_right.png', 
            { frameWidth: 96, frameHeight: 64 }
        );

        this.load.spritesheet('char_walking_left', 'images/sprites/character/char_walking_left.png', 
            { frameWidth: 96, frameHeight: 64 }
        );


        this.load.image('goblin', 'images/sprites/goblin_idle.png')
    }

    create()
    {
        this.scene.start('mainmap')

        // Sets camera bounds to map size to avoid black bars
        
        
    }
}