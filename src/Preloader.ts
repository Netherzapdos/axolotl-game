import Phaser from "phaser";

export default class Preloader extends Phaser.Scene
{
    constructor() 
    {
        super('preloader')
    }

    preload()
    {
        // Main Menu
        this.load.image('menu_logo', '/images/menu/menu_logo.png')
        this.load.image('menu_art', 'images/menu/menu_art.jpg')
        this.load.image('menu_button', 'images/menu/button.png')
        this.load.image('menu_cursor', '/images/menu/menu_cursor.png')
        this.load.image('credits_modal', '/images/menu/credits_modal.png')

        // New Map
        this.load.image('pixel_kingdom_terrain', 'images/tiles/PixelKingdomTerrain.png')
        this.load.image('sunnyside_terrain', 'images/tiles/SunnysideTerrain.png');
        this.load.image('Plants', 'images/tiles/Plants.png')
        this.load.tilemapTiledJSON('axoltopia_main', 'images/maps/Axoltopia_Main.json')
        

        // Character 
        this.load.spritesheet('char_idle', 'images/sprites/character/char_idle.png', 
            { frameWidth: 16, frameHeight: 32}
        );
        this.load.spritesheet('char_idle_left', 'images/sprites/character/char_idle_left.png',
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
        this.load.spritesheet('wild_yellow_idle', 'images/sprites/axolotls/wild_yellow_idle.png', 
            { frameWidth: 20, frameHeight: 20});


        // NPCs
        this.load.spritesheet('tamed_pink_idle', 'images/sprites/axolotls/tamed_pink_idle.png',
            { frameWidth: 13, frameHeight: 10});

        this.load.spritesheet('chicken_man', 'images/sprites/npcs/chicken_hitman.png', 
            { frameWidth: 14, frameHeight: 17 }
        );
        
        // Modals
        this.load.image('dialogue_modal', '/images/modals/dialogue_modal.png')
        this.load.image('modal_close_btn', '/images/modals/modal_close_btn.png')
        this.load.image('modal_next_btn', '/images/modals/modal_next_btn.png')

        // Controls
        this.load.image('up_btn', '/images/controls/arrow_up.png');
        this.load.image('down_btn', '/images/controls/arrow_down.png');
        this.load.image('left_btn', '/images/controls/arrow_left.png');
        this.load.image('right_btn', '/images/controls/arrow_right.png');
        this.load.image('sprint_btn', '/images/controls/sprint.png')

    }

    create()
    {
        // Starts the scene
        this.scene.start('game')
    }
}